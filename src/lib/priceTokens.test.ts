// The price token (src/lib/priceTokens.ts) against the app's own API answers in
// scripts/fixtures: catalog v1 (nothing sold by itself), v2, v3 and v4.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  applyPriceTokens,
  applyPriceTokensToArticle,
  applyPriceTokensToSections,
  applyPriceTokensToString,
  formatPrice,
  resolvePriceToken,
  tidyRichtext,
} from "./priceTokens.ts";
import type { PublicPackages } from "./packageView.ts";

const fixture = (v: number) =>
  JSON.parse(readFileSync(new URL(`../../scripts/fixtures/public-packages.v${v}.json`, import.meta.url), "utf8")) as PublicPackages;
const v1 = fixture(1);
const v2 = fixture(2);
const v3 = fixture(3);
const v4 = fixture(4);

test("Danish formatting: thousands with a dot, kr. after", () => {
  assert.equal(formatPrice(79500), "795 kr.");
  assert.equal(formatPrice(954000), "9.540 kr.");
  assert.equal(formatPrice(4794000), "47.940 kr.");
  assert.equal(formatPrice(12345), "123,45 kr.");
});

test("v3: monthly and yearly tokens fill from the API", () => {
  assert.equal(resolvePriceToken(v3, "starter", false), "795 kr.");
  assert.equal(resolvePriceToken(v3, "starter", true), "9.540 kr.");
  assert.equal(resolvePriceToken(v3, "business", false), "3.995 kr.");
  assert.equal(
    applyPriceTokensToString("Før. [[Basis koster {pris:starter} om måneden, {pris:starter:aar} om året.]] Efter.", v3),
    "Før. Basis koster 795 kr. om måneden, 9.540 kr. om året. Efter.",
  );
});

test("the same copy follows the catalog when it changes", () => {
  assert.equal(applyPriceTokensToString("[[{pris:starter}]]", v2), "695 kr.");
  assert.equal(applyPriceTokensToString("[[{pris:starter}]]", v3), "795 kr.");
});

test("no price to show: the whole segment goes, and the text around it reads on", () => {
  const text = "Det er enkelt. [[Basis koster {pris:starter} om måneden.]] Du kan starte gratis.";
  for (const data of [v1, null, undefined]) {
    assert.equal(applyPriceTokensToString(text, data), "Det er enkelt. Du kan starte gratis.");
  }
  // enterprise has no public price in v3, "from" in v2; free and advisor packages have none to show
  for (const key of ["enterprise", "free", "revisor", "konsulent", "findes-ikke"]) {
    assert.equal(resolvePriceToken(v3, key, false), null, key);
  }
  assert.equal(resolvePriceToken(v2, "enterprise", false), null);
});

test("one unresolvable token removes the whole segment, not just the token", () => {
  assert.equal(
    applyPriceTokensToString("A. [[Basis {pris:starter}, Koncern {pris:enterprise}.]] B.", v3),
    "A. B.",
  );
});

test("two segments in one string are decided one by one", () => {
  assert.equal(
    applyPriceTokensToString("[[Basis {pris:starter}.]] [[Koncern {pris:enterprise}.]]", v3),
    "Basis 795 kr.",
  );
});

test("the markers are never printed, and neither are stray braces", () => {
  assert.equal(applyPriceTokensToString("Pris: {pris:starter}", v1), "Pris:");
  const unclosed = applyPriceTokensToString("Uafsluttet [[ {pris:starter}", v3);
  assert.ok(!unclosed.includes("[[") && !unclosed.includes("{pris"), unclosed);
  assert.ok(!applyPriceTokensToString("[[x {pris:starter}]]", v1).includes("["));
});

test("a string without markers is returned as it is", () => {
  const s = "Kom gratis i gang: 5 pakker, 12 måneder.";
  assert.equal(applyPriceTokensToString(s, v3), s);
});

test("deep transform: nested strings, string arrays and items that were only the removed sentence", () => {
  const copy = {
    hero: { title: "Titel", subtitle: "[[Fra {pris:starter}.]] Resten." },
    items: [
      { q: "Pris?", a: "[[{pris:starter}]]" },
      { q: "Andet?", a: "Svar" },
    ],
    bullets: ["[[Basis {pris:starter}]]", "Altid med"],
    n: 3,
    flag: true,
  };
  assert.deepEqual(applyPriceTokens(copy, v1), {
    hero: { title: "Titel", subtitle: "Resten." },
    items: [{ q: "Andet?", a: "Svar" }],
    bullets: ["Altid med"],
    n: 3,
    flag: true,
  });
  const filled = applyPriceTokens(copy, v3);
  assert.equal(filled.hero.subtitle, "Fra 795 kr. Resten.");
  assert.equal(filled.items[0].a, "795 kr.");
  assert.equal(filled.bullets[0], "Basis 795 kr.");
});

test("v4: Komplet is bought by itself and its price token fills as before; Koncern still has none", () => {
  assert.equal(resolvePriceToken(v4, "business", false), "3.995 kr.");
  assert.equal(resolvePriceToken(v4, "business", true), "47.940 kr.");
  assert.equal(resolvePriceToken(v4, "starter", false), resolvePriceToken(v3, "starter", false));
  assert.equal(resolvePriceToken(v4, "enterprise", false), null);
});

// --- Blog articles: sections, richtext, title and description ---------------

type Sec = { type: string; [key: string]: unknown };

test("article: a token in a paragraph and in a richtext <td> is filled from the v4 fixture", () => {
  const sections: Sec[] = [
    { type: "paragraph", text: "Intro. [[Basis koster {pris:starter} om måneden.]]" },
    {
      type: "richtext",
      html: "<table><thead><tr><th>Funktion</th><th>qlim8</th></tr></thead><tbody><tr><td>Pris</td><td>[[{pris:starter} pr. måned, {pris:starter:aar} om året]]</td></tr></tbody></table>",
    },
  ];
  const out = applyPriceTokensToSections(sections, v4);
  assert.equal(out[0].text, "Intro. Basis koster 795 kr. om måneden.");
  assert.equal(
    out[1].html,
    "<table><thead><tr><th>Funktion</th><th>qlim8</th></tr></thead><tbody><tr><td>Pris</td><td>795 kr. pr. måned, 9.540 kr. om året</td></tr></tbody></table>",
  );
});

test("article: no price in the catalog (v1 or null) removes the segment and keeps the table's cell", () => {
  const html = "<table><tbody><tr><td>Pris</td><td>[[{pris:starter} pr. måned]]</td></tr></tbody></table>";
  for (const data of [v1, null]) {
    const [out] = applyPriceTokensToSections([{ type: "richtext", html }], data);
    assert.equal(out.html, "<table><tbody><tr><td>Pris</td><td></td></tr></tbody></table>");
  }
});

test("article: a section that was only the removed sentence is dropped, not rendered empty", () => {
  const sections: Sec[] = [
    { type: "h2", text: "Pris" },
    { type: "paragraph", text: "[[Basis koster {pris:starter} om måneden.]]" },
    { type: "list", items: ["[[Basis {pris:starter}]]", "[[Udvidet {pris:premium}]]"] },
    { type: "ordered-list", items: ["[[Basis {pris:starter}]]"] },
    { type: "callout", text: "[[{pris:starter}]]" },
    { type: "richtext", html: "<p>[[Basis koster {pris:starter}.]]</p>" },
    { type: "richtext", html: "<ul><li>[[A {pris:starter}]]</li></ul>" },
    { type: "paragraph", text: "Resten." },
  ];
  assert.deepEqual(applyPriceTokensToSections(sections, v1), [
    { type: "h2", text: "Pris" },
    { type: "paragraph", text: "Resten." },
  ]);
  assert.equal(applyPriceTokensToSections(sections, v4).length, sections.length);
});

test("article: a richtext block keeps its other paragraphs, and loses only the empty ones", () => {
  const [out] = applyPriceTokensToSections(
    [{ type: "richtext", html: "<p>Først.</p><p>[[Basis koster {pris:starter}.]]</p><ul><li>[[X {pris:starter}]]</li><li>Bliver</li></ul><p>Sidst.</p>" }],
    v1,
  );
  assert.equal(out.html, "<p>Først.</p><ul><li>Bliver</li></ul><p>Sidst.</p>");
  assert.equal(tidyRichtext("<p> </p><p><br></p><ol></ol><p>x</p>"), "<p>x</p>");
});

test("article: a section that was empty on purpose, or has no token, is left alone", () => {
  const same: Sec[] = [{ type: "paragraph", text: "" }, { type: "richtext", html: "<p></p>" }, { type: "list", items: [] }];
  const out = applyPriceTokensToSections(same, v1);
  assert.deepEqual(out, same);
  assert.equal(out[0], same[0]);
});

test("article: title, seoTitle and description resolve too, and the sections come back resolved", () => {
  const article = {
    slug: "x",
    title: "Hvad koster det? [[Fra {pris:starter}.]]",
    seoTitle: "Titel",
    description: "Beskrivelse [[{pris:starter}]]",
    sections: [{ type: "paragraph", text: "[[{pris:starter}]]" }] as Sec[],
  };
  const filled = applyPriceTokensToArticle(article, v4);
  assert.equal(filled.title, "Hvad koster det? Fra 795 kr.");
  assert.equal(filled.seoTitle, "Titel");
  assert.equal(filled.description, "Beskrivelse 795 kr.");
  assert.equal(filled.slug, "x");
  const stripped = applyPriceTokensToArticle(article, null);
  assert.equal(stripped.title, "Hvad koster det?");
  assert.equal(stripped.description, "Beskrivelse");
  assert.deepEqual(stripped.sections, []);
});
