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

// ---------------------------------------------------------------------------
// The data itself (src/content/sammenligning/data.ts), held to its shape.
// ---------------------------------------------------------------------------
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, STORE, STORE_FUNKTIONER, VAELG } from "../content/sammenligning/data.ts";

const SVAR = new Set(["Ja", "Nej", "Delvist", "Ikke oplyst"]);
const TABELLER = [
  { navn: "DANSKE", funktioner: FUNKTIONER, leverandoerer: DANSKE },
  { navn: "STORE", funktioner: STORE_FUNKTIONER, leverandoerer: STORE },
];

test("data: OPDATERET is an ISO date", () => {
  assert.match(OPDATERET, /^\d{4}-\d{2}-\d{2}$/);
  assert.notEqual(danskDato(OPDATERET), OPDATERET);
});

test("data: qlim8 is first in both lists, and each vendor key is unique", () => {
  for (const t of TABELLER) {
    assert.equal(t.leverandoerer[0].key, "qlim8", t.navn);
    const keys = t.leverandoerer.map((l) => l.key);
    assert.equal(new Set(keys).size, keys.length, t.navn);
    const fkeys = t.funktioner.map((f) => f.key);
    assert.equal(new Set(fkeys).size, fkeys.length, t.navn);
  }
  assert.deepEqual(DANSKE.map((l) => l.key), ["qlim8", "verarca", "gronlog", "ecometrics", "wardn", "valified"]);
  assert.deepEqual(STORE.map((l) => l.key), ["qlim8", "watershed", "positiongreen", "greenly", "persefoni", "coolset", "terrascope", "plana"]);
  assert.equal(FUNKTIONER.length, 19);
});

test("data: every vendor has a cell for every function, and no cell for an unknown key", () => {
  for (const t of TABELLER) {
    const keys = new Set(t.funktioner.map((f) => f.key));
    for (const l of t.leverandoerer) {
      for (const k of keys) assert.ok(l.celler[k], `${t.navn}/${l.key} has no cell for ${k}`);
      for (const k of Object.keys(l.celler)) assert.ok(keys.has(k), `${t.navn}/${l.key} has a cell for unknown key ${k}`);
    }
  }
});

test("data: every svar is one of the four values; a note is at most 60 characters", () => {
  for (const t of TABELLER) {
    for (const l of t.leverandoerer) {
      for (const [k, c] of Object.entries(l.celler)) {
        assert.ok(SVAR.has(c.svar), `${l.key}/${k}: ${c.svar}`);
        if (c.note !== undefined) {
          assert.ok(c.note.trim().length > 0, `${l.key}/${k}: empty note`);
          assert.ok(c.note.length <= 60, `${l.key}/${k}: note is ${c.note.length} characters`);
        }
      }
    }
  }
});

test("data: a competitor is never a bare Nej, and a cell with an answer has an https source", () => {
  for (const t of TABELLER) {
    for (const l of t.leverandoerer.filter((v) => v.key !== "qlim8")) {
      for (const [k, c] of Object.entries(l.celler)) {
        if (c.svar === "Nej") assert.ok(c.note && c.note.trim(), `${l.key}/${k}: a bare Nej about a competitor`);
        if (c.svar !== "Ikke oplyst") assert.ok(c.kilde?.startsWith("https://"), `${l.key}/${k} has no https kilde`);
        if (c.kilde !== undefined) assert.ok(c.kilde.startsWith("https://"), `${l.key}/${k}: kilde ${c.kilde}`);
      }
      assert.ok(l.website.startsWith("https://"), l.key);
      if (l.pris.kilde !== undefined) assert.ok(l.pris.kilde.startsWith("https://"), `${l.key} pris.kilde`);
    }
  }
});

test("data: KORT_OM has all 13 vendors, each text names its vendor and stands alone", () => {
  const alle = new Map([...DANSKE, ...STORE].map((l) => [l.key, l.navn]));
  assert.equal(alle.size, 13);
  assert.deepEqual(Object.keys(KORT_OM).sort(), [...alle.keys()].sort());
  for (const [key, text] of Object.entries(KORT_OM)) {
    assert.ok(text.includes(alle.get(key) as string), `${key} does not name itself`);
    assert.ok(!/https?:|<a |\]\(/.test(text), `${key} has a link`);
    assert.ok(text.length < 420, `${key} is too long`);
  }
});

test("data: VAELG has the same 13 keys as KORT_OM, and each line starts 'Vælg <navn>' without link or em dash", () => {
  const alle = new Map([...DANSKE, ...STORE].map((l) => [l.key, l.navn]));
  assert.equal(Object.keys(VAELG).length, 13);
  assert.deepEqual(Object.keys(VAELG).sort(), Object.keys(KORT_OM).sort());
  for (const [key, text] of Object.entries(VAELG)) {
    assert.ok(text.startsWith(`Vælg ${alle.get(key)}`), `${key} does not start with Vælg and its name`);
    assert.ok(!text.includes("http"), `${key} has a link`);
    assert.ok(!text.includes("\u2014"), `${key} has an em dash`);
  }
});

test("data: the rendered tables contain no source URL", () => {
  for (const t of TABELLER) {
    const out = sammenligningstabel(t.leverandoerer, t.funktioner);
    assert.ok(!out.includes("http"), t.navn);
    assert.ok(!out.includes("kilde"), t.navn);
  }
  for (const text of Object.values(KORT_OM)) assert.ok(!text.includes("http"));
});

test("data: the qlim8 price cells resolve with v4 and still read as a sentence without a price", () => {
  for (const l of [DANSKE[0], STORE[0]]) {
    const filled = applyPriceTokensToSections([{ type: "richtext", html: `<p>${l.pris.tekst}</p>` }], v4)[0].html as string;
    assert.ok(!filled.includes("[[") && !filled.includes("{pris"), filled);
    assert.match(filled, /Basis \d[\d.]* kr\. og Udvidet \d[\d.]* kr\./, filled);
    assert.match(filled, /Komplet \d[\d.]* kr\./, filled);
    for (const data of [null, v1]) {
      const stripped = applyPriceTokensToSections([{ type: "richtext", html: `<p>${l.pris.tekst}</p>` }], data)[0].html as string;
      assert.equal(stripped, "<p>Gratis-pakke uden udløbsdato. Koncern efter samtale.</p>");
    }
  }
  // The text is also correct as plain data: the token markup is only ever in the qlim8 price.
  for (const t of TABELLER) for (const l of t.leverandoerer.filter((v) => v.key !== "qlim8")) assert.ok(!/\[\[|\{pris/.test(l.pris.tekst), l.key);
});

test("data: no figure a qlim8 package is sold at stands before kr in a competitor text", () => {
  const forbidden = [250, 300, 395, 625, 695, 750, 795, 1195, 1595, 1995, 3000, 3495, 3600, 3995, 6500, 7500, 8340, 9000, 9540, 14340, 23940, 41940, 47940, 78000];
  const texts = [...Object.values(KORT_OM), ...Object.values(VAELG), ...[...DANSKE, ...STORE].filter((l) => l.key !== "qlim8").flatMap((l) => [l.pris.tekst, ...Object.values(l.celler).map((c) => c.note ?? "")])];
  for (const t of texts) {
    for (const n of forbidden) {
      const formatted = n >= 1000 ? new Intl.NumberFormat("da-DK").format(n) : String(n);
      assert.ok(!new RegExp(`(?<![\\d.])(${n}|${formatted})\\s*(kr|kroner)`, "i").test(t), `${n} before kr in: ${t}`);
    }
    assert.ok(!t.includes("\u2014"), t);
  }
});
