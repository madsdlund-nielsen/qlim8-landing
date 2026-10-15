// How qlim8.com shows the app's packages (src/lib/packageView.ts). The inputs
// are the app's own answers, committed in scripts/fixtures/: catalog version
// 1 (every package behind a demo) and the proposed self-serve lineup.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DEMO_CTA } from "../content/cta.ts";
import {
  comparisonSections,
  ctaLabel,
  formatKr,
  freeStartHref,
  groupPackages,
  packageFeatures,
  isSelfServe,
  offersFromPackages,
  priceLines,
  resolveCta,
  salesLine,
  trialLine,
  type PublicPackages,
} from "./packageView.ts";

const fixture = (name: string): PublicPackages =>
  JSON.parse(readFileSync(new URL(`../../scripts/fixtures/${name}`, import.meta.url), "utf8"));
const v1 = fixture("public-packages.v1.json");
const v2 = fixture("public-packages.v2.json");
const v3 = fixture("public-packages.v3.json");
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

test("both advisor packages are free", () => {
  for (const key of ["revisor", "konsulent"]) {
    assert.equal(pkg(v2, key).free, true);
    assert.deepEqual(priceLines(pkg(v2, key)), { main: "Gratis", note: null });
  }
});

test("an advisor package priced per client says so, should the catalog ever set one", () => {
  const perClient = {
    ...pkg(v2, "konsulent"),
    price: null,
    free: false,
    advisorPrice: { baseMinor: 100000, discountPerClientMinor: 10000, maxDiscountedClients: 10, freeWithoutClients: true },
  };
  assert.deepEqual(priceLines(perClient), {
    main: "Gratis",
    note: "indtil første aktive klient, derefter 1.000 kr/md minus 100 kr pr. aktiv klient (op til 10 klienter), ekskl. moms",
  });
});

test("'Kom gratis i gang' goes to the free company package's signup URL, from the API", () => {
  assert.equal(freeStartHref(v2), "https://app.qlim8.com/signup?package=free");
  assert.equal(freeStartHref(v1), null);
  assert.equal(freeStartHref(null), null);
});

test("buttons say what they do", () => {
  assert.equal(ctaLabel(pkg(v2, "starter")), "Køb Starter");
  assert.equal(ctaLabel(pkg(v2, "free")), "Opret gratis konto");
  assert.equal(ctaLabel(pkg(v2, "revisor")), "Kom i gang som revisor");
  assert.equal(ctaLabel(pkg(v2, "enterprise")), "Book demo");
});

test("a trial is shown only where the catalog gives one, on a package bought by card", () => {
  // The API before trialDays, and a catalog without a trial: no trial anywhere.
  for (const p of v2.packages) assert.equal(trialLine(p), null, p.key);
  const withTrial = (key: string, trialDays: number) => ({ ...pkg(v2, key), trialDays });
  assert.equal(
    trialLine(withTrial("starter", 7)),
    "7 dages gratis prøveperiode, når du har booket en kort introsamtale med os i den første uge. Kortet trækkes først bagefter, og du kan opsige før.",
  );
  // The call unlocks the trial, so the button does not promise it.
  assert.equal(ctaLabel(withTrial("premium", 7)), "Køb Premium");
  // Never on a free or a demo package, whatever the field says.
  assert.equal(trialLine(withTrial("free", 7)), null);
  assert.equal(trialLine(withTrial("enterprise", 7)), null);
  assert.equal(ctaLabel(withTrial("enterprise", 7)), "Book demo");
  assert.equal(trialLine(withTrial("starter", 0)), null);
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

test("a card lists what the catalog sells, never a curated list that disagrees with it", () => {
  const premium = packageFeatures(v2, pkg(v2, "premium"), ["Avancerede reduktionsmål + Scenario Builder"]);
  assert.equal(premium.label, "Alt i Starter, plus");
  assert.deepEqual(premium.items, pkg(v2, "premium").highlights);
  assert.ok(!premium.items.some((f) => /Scenario Builder/.test(f)), "Scenario Builder is Business's in catalog v2");
  assert.equal(packageFeatures(v2, pkg(v2, "free")).label, null);
  assert.ok(packageFeatures(v2, pkg(v2, "business")).items.includes("Scenario Builder"));
});

test("an advisor package, which lists no capabilities, keeps its curated list", () => {
  const card = packageFeatures(v2, pkg(v2, "revisor"), ["Dedikeret overblik over kunder", " "]);
  assert.equal(card.label, null);
  assert.deepEqual(card.items, ["Dedikeret overblik over kunder"]);
  assert.deepEqual(card.entries, [{ text: "Dedikeret overblik over kunder", planned: false }]);
});

// Catalog version 3 (October 2026): Starter 795 kr and Business 3.995 kr, no
// public price for Enterprise, cards with roadmap lines, the comparison by
// category. v3 is the app's own answer, committed in scripts/fixtures/.

test("v3: Starter and Business are priced, Enterprise has no price and says to contact sales", () => {
  assert.deepEqual(priceLines(pkg(v3, "starter")), { main: "795 kr/md", note: "faktureres årligt (9.540 kr), ekskl. moms" });
  assert.deepEqual(priceLines(pkg(v3, "business")), { main: "3.995 kr/md", note: "faktureres årligt (47.940 kr), ekskl. moms" });
  assert.equal(priceLines(pkg(v3, "enterprise")), null);
  assert.equal(salesLine(pkg(v3, "enterprise")), "Kontakt salg");
  // A package with a price, an advisor package and a free one say nothing in a price's place.
  for (const key of ["free", "starter", "business", "revisor"]) assert.equal(salesLine(pkg(v3, key)), null);
  // Business is still sold after a conversation: its button books a demo.
  assert.equal(pkg(v3, "business").cta.kind, "demo");
  assert.equal(ctaLabel(pkg(v3, "business")), "Book demo");
  assert.equal(ctaLabel(pkg(v3, "free")), "Opret gratis konto");
});

test("v3: the offers are one per public price: Free, Starter, Premium and Business; Enterprise has none", () => {
  assert.deepEqual(offersFromPackages(v3).map((o) => [o.name, o.price]), [
    ["Free", "0.00"],
    ["Starter", "9540.00"],
    ["Premium", "23940.00"],
    ["Business", "47940.00"],
  ]);
});

test("v3: a card lists its lines in order, the roadmap ones marked planned", () => {
  const business = packageFeatures(v3, pkg(v3, "business"));
  assert.equal(business.label, "Alt i Premium, plus");
  assert.deepEqual(
    business.entries.map((e) => `${e.planned ? "planlagt" : "bygget"}: ${e.text}`),
    [
      "planlagt: Dobbelt væsentlighedsanalyse (DMA)",
      "planlagt: Rollebaseret adgangskontrol (RBAC)",
      "bygget: Scenario Builder",
      "bygget: Synk til Notion og Airtable",
      "bygget: Chat & telefon-support",
      "planlagt: Koncern (flere CVR-numre)",
    ],
  );
  assert.deepEqual(business.items, business.entries.map((e) => e.text));
  // The flat list a reader without highlightItems would use holds built lines only.
  assert.deepEqual(pkg(v3, "business").highlights, ["Scenario Builder", "Synk til Notion og Airtable", "Chat & telefon-support"]);
});

test("a card from an API without highlightItems lists its built lines, none planned", () => {
  const card = packageFeatures(v2, pkg(v2, "premium"));
  assert.deepEqual(card.items, pkg(v2, "premium").highlights);
  assert.ok(card.entries.every((e) => !e.planned));
});

test("v3: the comparison comes by category, roadmap rows marked; v2 has none and lists its flat rows", () => {
  const sections = comparisonSections(v3)!;
  assert.deepEqual(sections.map((s) => s.label), ["Views", "Analyser", "Funktioner", "Integrationer", "Rapporter", "Admin"]);
  const rows = sections.flatMap((s) => s.rows);
  assert.equal(rows.length, 43);
  assert.deepEqual(rows.filter((r) => r.status === "planned").map((r) => r.label).sort(), [
    "Dobbelt væsentlighedsanalyse (DMA)",
    "Koncern (flere CVR-numre)",
    "Kryds-mapping til alle store standarder (CSRD, IFRS, CDP m.fl.)",
    "Leverandørportal",
    "Oppetids-SLA",
    "Politikker",
    "Rollebaseret adgangskontrol (RBAC)",
    "SSO / SAML",
    "Scope 3",
  ]);
  // The flat rows, which a page without sections lists, hold built capabilities only.
  assert.ok(v3.comparison.rows.every((r) => r.status === "live"));
  assert.equal(comparisonSections(v2), null);
  assert.equal(comparisonSections(v1), null);
});

test("resolveCta: under catalog v1 or with no API, a /priser button books a demo", () => {
  const priser = { label: "Se pakker", href: "/priser" };
  const raadgiver = { label: "Opret gratis rådgiver-konto", href: "/priser#raadgivere" };
  const other = { label: "Se rapporten", href: "/produkt/rapportering" };
  for (const selfServe of [isSelfServe(v1), isSelfServe(null)]) {
    assert.equal(selfServe, false);
    assert.deepEqual(resolveCta(priser, selfServe), DEMO_CTA);
    assert.deepEqual(resolveCta(raadgiver, selfServe), DEMO_CTA);
    assert.deepEqual(resolveCta(other, selfServe), other);
  }
  assert.deepEqual(resolveCta(priser, isSelfServe(v3)), priser);
  assert.deepEqual(resolveCta(raadgiver, isSelfServe(v3)), raadgiver);
  // /priser-lookalikes are not the package page
  assert.deepEqual(resolveCta({ label: "x", href: "/priserne" }, false), { label: "x", href: "/priserne" });
});
