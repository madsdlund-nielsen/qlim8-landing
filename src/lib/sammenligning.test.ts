// The comparison table builder (src/content/sammenligning/byg.ts) and the way
// its output passes through the price tokens and the .md twin.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { celleTekst, danskDato, opdateretLinje, sammenligningstabel } from "../content/sammenligning/byg.ts";
import type { Funktion, Leverandoer } from "../content/sammenligning/typer.ts";
import { CONTACT_EMAIL } from "../content/cta.ts";
import { applyPriceTokensToSections } from "./priceTokens.ts";
import { richtextToMarkdown } from "./richtextMarkdown.ts";
import type { PublicPackages } from "./packageView.ts";

const fixture = (v: number) =>
  JSON.parse(readFileSync(new URL(`../../scripts/fixtures/public-packages.v${v}.json`, import.meta.url), "utf8")) as PublicPackages;
const v1 = fixture(1);
const v4 = fixture(4);

const funktioner: Funktion[] = [
  { key: "scope12", label: "Scope 1 og 2" },
  { key: "scope3", label: "Scope 3" },
  { key: "vsme", label: "VSME-rapport" },
];

const qlim8: Leverandoer = {
  key: "qlim8",
  navn: "qlim8",
  website: "https://qlim8.com",
  pris: { tekst: "[[Fra {pris:starter} pr. måned, betalt årligt.]]", kilde: "https://qlim8.com/priser" },
  celler: {
    scope12: { svar: "Ja" },
    scope3: { svar: "Ja", note: "med udgifter som grundlag", kilde: "https://qlim8.com/produkt/hemmelig-kilde" },
    vsme: { svar: "Ja" },
  },
};
const andre: Leverandoer = {
  key: "andre",
  navn: "Tom & Jerry <ESG>",
  website: "https://example.com",
  pris: { tekst: "Pris på forespørgsel" },
  celler: {
    scope12: { svar: "Ja" },
    scope3: { svar: "Delvist", note: "kun scope 1 og 2 for <10 ansatte", kilde: "https://example.com/hemmelig-kilde" },
    // vsme: missing on purpose
  },
};

const html = sammenligningstabel([qlim8, andre], funktioner);

const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;

test("one table: header 'Funktion' then each vendor in the order given", () => {
  assert.equal(count(html, /<table>/g), 1);
  assert.ok(html.startsWith("<table><thead><tr><th>Funktion</th><th>qlim8</th><th>Tom &amp; Jerry &lt;ESG&gt;</th></tr></thead><tbody>"));
  assert.ok(html.endsWith("</tbody></table>"));
  const reversed = sammenligningstabel([andre, qlim8], funktioner);
  assert.ok(reversed.indexOf("Tom &amp; Jerry") < reversed.indexOf("<th>qlim8</th>"));
});

test("the first body row is Pris, then one row per function in order", () => {
  const body = html.slice(html.indexOf("<tbody>"));
  const rows: string[] = body.match(/<tr>.*?<\/tr>/g) ?? [];
  assert.equal(rows.length, 1 + funktioner.length);
  assert.ok(rows[0].startsWith("<tr><td>Pris</td>"));
  assert.ok(rows[1].startsWith("<tr><td>Scope 1 og 2</td>"));
  assert.ok(rows[3].startsWith("<tr><td>VSME-rapport</td>"));
  for (const r of rows) assert.equal(count(r, /<td>/g), 1 + 2, r);
});

test("a note follows the answer; a missing cell reads Ikke oplyst", () => {
  assert.equal(celleTekst({ svar: "Delvist", note: "kun scope 1 og 2" }), "Delvist: kun scope 1 og 2");
  assert.equal(celleTekst({ svar: "Nej", note: "  " }), "Nej");
  assert.equal(celleTekst(undefined), "Ikke oplyst");
  assert.ok(html.includes("<td>Ja: med udgifter som grundlag</td>"));
  assert.ok(html.includes("<td>Delvist: kun scope 1 og 2 for &lt;10 ansatte</td>"));
  assert.ok(html.includes("<tr><td>VSME-rapport</td><td>Ja</td><td>Ikke oplyst</td></tr>"));
});

test("everything is escaped, and the source URLs are never rendered", () => {
  assert.ok(!html.includes("<ESG>"));
  assert.ok(!html.includes("hemmelig-kilde"));
  assert.ok(!html.includes("https://"));
  assert.ok(!html.includes("example.com"));
  assert.equal(sammenligningstabel([{ ...andre, navn: `A"B'C` }], []).includes("<th>A&quot;B&#39;C</th>"), true);
});

test("the price token markup passes through untouched, in the price and in a note", () => {
  assert.ok(html.includes("<td>[[Fra {pris:starter} pr. måned, betalt årligt.]]</td>"));
  const withNote = sammenligningstabel(
    [{ ...qlim8, celler: { scope12: { svar: "Delvist", note: "[[fra {pris:premium:aar} om året]]" } } }],
    funktioner.slice(0, 1),
  );
  assert.ok(withNote.includes("<td>Delvist: [[fra {pris:premium:aar} om året]]</td>"));
});

test("only tags the app sanitizer allows are produced", () => {
  const allowed = new Set(["table", "thead", "tbody", "tr", "th", "td", "strong", "a", "p", "ul", "ol", "li", "br", "em"]);
  for (const out of [html, opdateretLinje("2026-11-23")]) {
    for (const m of out.matchAll(/<\/?([a-z0-9]+)/gi)) assert.ok(allowed.has(m[1].toLowerCase()), `unexpected <${m[1]}>`);
  }
});

test("the table through the price tokens: filled from v4, the cell kept (empty) when the catalog has no price", () => {
  const filled = applyPriceTokensToSections([{ type: "richtext", html }], v4)[0].html as string;
  assert.ok(filled.includes("<td>Fra 795 kr. pr. måned, betalt årligt.</td>"));
  assert.ok(!filled.includes("[[") && !filled.includes("{pris"));
  for (const data of [v1, null]) {
    const stripped = applyPriceTokensToSections([{ type: "richtext", html }], data)[0].html as string;
    assert.ok(stripped.includes("<tr><td>Pris</td><td></td><td>Pris på forespørgsel</td></tr>"), stripped);
  }
});

test("richtextToMarkdown turns the table into a markdown table with one column per vendor plus the feature", () => {
  const md = richtextToMarkdown(html, "https://qlim8.com").split("\n");
  assert.equal(md.length, 2 + 1 + funktioner.length);
  const columns = (line: string) => line.replace(/\\\|/g, "").split("|").length - 2;
  for (const line of md) assert.equal(columns(line), 3, line);
  assert.equal(md[0], "| Funktion | qlim8 | Tom & Jerry <ESG> |");
  assert.equal(md[1], "| --- | --- | --- |");
  assert.equal(md[2], "| Pris | [[Fra {pris:starter} pr. måned, betalt årligt.]] | Pris på forespørgsel |");
  assert.equal(md[5], "| VSME-rapport | Ja | Ikke oplyst |");
});

test("a wide table keeps its column count in markdown (8 vendors)", () => {
  const many = Array.from({ length: 8 }, (_, i) => ({ ...andre, key: `v${i}`, navn: `Leverandør ${i + 1}` }));
  const md = richtextToMarkdown(sammenligningstabel(many, funktioner), "https://qlim8.com").split("\n");
  assert.equal(md[0].split("|").length - 2, 9);
  assert.equal(md[1], `| ${Array(9).fill("---").join(" | ")} |`);
});

test("danskDato: an ISO date as '23. november 2026'; anything else as it came", () => {
  assert.equal(danskDato("2026-11-23"), "23. november 2026");
  assert.equal(danskDato("2026-03-05"), "5. marts 2026");
  assert.equal(danskDato("december 2026"), "december 2026");
  assert.equal(danskDato("2026-13-01"), "2026-13-01");
});

test("opdateretLinje: the Danish paragraph with the contact address from cta.ts", () => {
  assert.equal(
    opdateretLinje("2026-11-23"),
    `<p>Sidst opdateret 23. november 2026. Oplysningerne om de andre leverandører er hentet fra deres egne hjemmesider. ` +
      `Er noget forkert eller forældet, så skriv til <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>, så retter vi det.</p>`,
  );
  assert.equal(CONTACT_EMAIL, "kontakt@qlim8.com");
});
