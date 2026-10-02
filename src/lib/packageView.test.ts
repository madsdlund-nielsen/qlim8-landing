// How qlim8.com shows the app's packages (src/lib/packageView.ts). The inputs
// are the app's own answers, committed in scripts/fixtures/: catalog version
// 1 (every package behind a demo) and the proposed self-serve lineup.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  ctaLabel,
  formatKr,
  groupPackages,
  isSelfServe,
  offersFromPackages,
  priceLines,
  type PublicPackages,
} from "./packageView.ts";

const fixture = (name: string): PublicPackages =>
  JSON.parse(readFileSync(new URL(`../../scripts/fixtures/${name}`, import.meta.url), "utf8"));
const v1 = fixture("public-packages.v1.json");
const v2 = fixture("public-packages.v2.json");
const pkg = (data: PublicPackages, key: string) => data.packages.find((p) => p.key === key)!;

test("catalog v1 keeps the sales-led page: nothing self-serve, no price, no offer", () => {
  assert.equal(isSelfServe(v1), false);
  assert.equal(isSelfServe(null), false);
  for (const p of v1.packages) assert.equal(priceLines(p), null);
  assert.deepEqual(offersFromPackages(v1), []);
});

test("the self-serve lineup groups packages into start free, buy and contact", () => {
  assert.equal(isSelfServe(v2), true);
  const groups = groupPackages(v2);
  assert.deepEqual(groups.free.map((p) => p.key), ["free", "revisor", "konsulent"]);
  assert.deepEqual(groups.selfServe.map((p) => p.key), ["starter", "premium"]);
  assert.deepEqual(groups.contact.map((p) => p.key), ["business", "enterprise"]);
});

test("prices are quoted per month, billed yearly, ex. VAT", () => {
  assert.deepEqual(priceLines(pkg(v2, "starter")), {
    main: "695 kr/md",
    note: "faktureres årligt (8.340 kr), ekskl. moms",
  });
  assert.deepEqual(priceLines(pkg(v2, "enterprise")), { main: "fra 6.500 kr/md", note: "faktureres årligt, ekskl. moms" });
  assert.deepEqual(priceLines(pkg(v2, "free")), { main: "Gratis", note: null });
  // Hidden in the catalog: no price at all.
  assert.equal(priceLines(pkg(v2, "business")), null);
});

test("a konsulent is free until the first client, then per active client", () => {
  assert.deepEqual(priceLines(pkg(v2, "konsulent")), {
    main: "Gratis",
    note: "indtil første aktive klient, derefter 1.000 kr/md minus 100 kr pr. aktiv klient (op til 10 klienter), ekskl. moms",
  });
});

test("buttons say what they do", () => {
  assert.equal(ctaLabel(pkg(v2, "starter")), "Køb Starter");
  assert.equal(ctaLabel(pkg(v2, "free")), "Kom gratis i gang");
  assert.equal(ctaLabel(pkg(v2, "revisor")), "Kom i gang som revisor");
  assert.equal(ctaLabel(pkg(v2, "enterprise")), "Book demo");
});

test("structured data offers only the public yearly company prices", () => {
  const offers = offersFromPackages(v2);
  assert.deepEqual(
    offers.map((o) => [o.name, o.price]),
    [
      ["Free", "0.00"],
      ["Starter", "8340.00"],
      ["Premium", "23940.00"],
    ],
  );
  assert.equal(offers[1].priceSpecification.valueAddedTaxIncluded, false);
});

test("kroner are written the Danish way", () => {
  assert.equal(formatKr(834000), "8.340 kr");
  assert.equal(formatKr(69550), "695,50 kr");
});
