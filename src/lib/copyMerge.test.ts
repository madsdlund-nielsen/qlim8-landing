// Tests for the defensive CMS-override merge. Run with:
//   npm test   (node --experimental-strip-types --test)
// The merge must never let malformed CMS data break a page — anything that
// doesn't match the bundled default's shape falls back to the default.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeCopy } from "./copyMerge.ts";

const DEFAULTS = {
  hero: { title: "Standard titel", subtitle: "Standard undertekst" },
  features: [
    { title: "F1", body: "B1", bullets: ["a", "b"] },
    { title: "F2", body: "B2", bullets: ["c"] },
  ],
  prices: { starter: { monthlyDkk: 300 } },
  comparison: [{ label: "Row", starter: true, premium: "1 stk", enterprise: false }],
  openPositions: [] as { title: string }[],
};

test("returns defaults untouched for empty/undefined overrides", () => {
  assert.deepEqual(mergeCopy(DEFAULTS, undefined), DEFAULTS);
  assert.deepEqual(mergeCopy(DEFAULTS, {}), DEFAULTS);
  assert.deepEqual(mergeCopy(DEFAULTS, null), DEFAULTS);
});

test("merges scalar overrides per key, ignoring unknown keys", () => {
  const merged = mergeCopy(DEFAULTS, { hero: { title: "Ny titel", unknown: "x" } });
  assert.equal(merged.hero.title, "Ny titel");
  assert.equal(merged.hero.subtitle, "Standard undertekst");
  assert.ok(!("unknown" in merged.hero));
});

test("rejects scalar overrides of the wrong type", () => {
  const merged = mergeCopy(DEFAULTS, { hero: { title: 42 } });
  assert.equal(merged.hero.title, "Standard titel");
});

test("replaces arrays wholesale when items match the template shape", () => {
  const merged = mergeCopy(DEFAULTS, {
    features: [{ title: "Kun én", body: "Ny", bullets: ["x"] }],
  });
  assert.equal(merged.features.length, 1);
  assert.equal(merged.features[0].title, "Kun én");
});

test("falls back to the default array when an item is missing required keys", () => {
  const merged = mergeCopy(DEFAULTS, { features: [{ title: "mangler body" }] });
  assert.deepEqual(merged.features, DEFAULTS.features);
});

test("allows boolean<->string crossover for comparison cells", () => {
  const merged = mergeCopy(DEFAULTS, {
    comparison: [{ label: "Row", starter: "2 stk", premium: true, enterprise: true }],
  });
  assert.equal(merged.comparison[0].starter, "2 stk");
  assert.equal(merged.comparison[0].premium, true);
});

test("number overrides apply for prices", () => {
  const merged = mergeCopy(DEFAULTS, { prices: { starter: { monthlyDkk: 349 } } });
  assert.equal(merged.prices.starter.monthlyDkk, 349);
});

test("accepts any object array when the bundled default is empty (open positions)", () => {
  const merged = mergeCopy(DEFAULTS, {
    openPositions: [{ title: "Ingeniør", department: "Produkt" }],
  });
  assert.equal(merged.openPositions.length, 1);
});

test("keeps optional extra keys on array items (e.g. plan badge)", () => {
  const defaults = { plans: [{ name: "Starter", cta: "Køb" }] };
  const merged = mergeCopy(defaults, {
    plans: [
      { name: "Starter", cta: "Køb" },
      { name: "Premium", cta: "Køb", badge: "Anbefalet" },
    ],
  });
  assert.equal(merged.plans.length, 2);
  assert.equal((merged.plans[1] as { badge?: string }).badge, "Anbefalet");
});
