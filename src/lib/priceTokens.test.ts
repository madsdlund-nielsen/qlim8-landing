// The price token (src/lib/priceTokens.ts) against the app's own API answers in
// scripts/fixtures: catalog v1 (nothing sold by itself), v2 and v3.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { applyPriceTokens, applyPriceTokensToString, formatPrice, resolvePriceToken } from "./priceTokens.ts";
import type { PublicPackages } from "./packageView.ts";

const fixture = (v: number) =>
  JSON.parse(readFileSync(new URL(`../../scripts/fixtures/public-packages.v${v}.json`, import.meta.url), "utf8")) as PublicPackages;
const v1 = fixture(1);
const v2 = fixture(2);
const v3 = fixture(3);

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
