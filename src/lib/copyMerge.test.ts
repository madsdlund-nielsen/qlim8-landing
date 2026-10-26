// Tests for the defensive CMS-override merge. Run with:
//   npm test   (node --experimental-strip-types --test)
// The merge must never let malformed CMS data break a page, anything that
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

test("surfaces a CMS-authored top-level section the default omits (howItWorks)", () => {
  const howItWorks = {
    title: "Sådan kan du komme i gang",
    steps: [
      { title: "Opret konto", body: "Det koster ingenting." },
      { title: "Demo tal", body: "Start i sandkassen." },
    ],
  };
  const merged = mergeCopy(DEFAULTS, { howItWorks }) as typeof DEFAULTS & {
    howItWorks?: typeof howItWorks;
  };
  assert.deepEqual(merged.howItWorks, howItWorks);
  // Existing keys are untouched.
  assert.equal(merged.hero.title, "Standard titel");
});

test("ignores a malformed override-only top-level key", () => {
  const merged = mergeCopy(DEFAULTS, {
    howItWorks: { title: "x", steps: null },
  }) as typeof DEFAULTS & { howItWorks?: unknown };
  assert.ok(!("howItWorks" in merged));
});

test("does NOT surface unknown keys nested below the page root", () => {
  const merged = mergeCopy(DEFAULTS, {
    hero: { title: "Ny", extra: { deep: "junk" } },
  });
  assert.equal(merged.hero.title, "Ny");
  assert.ok(!("extra" in merged.hero));
});

test("keeps optional extra keys on array items (e.g. plan badge)", () => {
  const defaults = { plans: [{ name: "Basis", cta: "Køb" }] };
  const merged = mergeCopy(defaults, {
    plans: [
      { name: "Basis", cta: "Køb" },
      { name: "Udvidet", cta: "Køb", badge: "Anbefalet" },
    ],
  });
  assert.equal(merged.plans.length, 2);
  assert.equal((merged.plans[1] as { badge?: string }).badge, "Anbefalet");
});

// Identity keys: the home plans carry the package `key`, the /admin editor has
// no field for it, so a published plan list without it must still merge, and
// must not inherit the first plan's key.
test("an override item may omit an identity key: the list merges and the key is not inherited", () => {
  const defaults = {
    plans: [
      { key: "free", name: "Gratis", tag: "t0", features: ["a"], highlighted: false },
      { key: "starter", name: "Basis", tag: "t1", features: ["b"], highlighted: false },
    ],
  };
  const merged = mergeCopy(defaults, {
    plans: [
      { name: "Gratis", tag: "Ny tagline", features: ["a"], highlighted: false },
      { name: "Basis", tag: "t1", features: ["b", "c"], highlighted: true, badge: "Anbefalet" },
    ],
  });
  assert.equal(merged.plans[0].tag, "Ny tagline");
  assert.deepEqual(merged.plans[1].features, ["b", "c"]);
  assert.ok(merged.plans.every((p) => !("key" in p)), "no plan inherits the template's key");
  assert.equal((merged.plans[1] as { badge?: string }).badge, "Anbefalet");
});

test("an override item that does carry the identity key keeps it, and other keys stay required", () => {
  const defaults = { plans: [{ key: "free", name: "Gratis", tag: "t0" }] };
  const merged = mergeCopy(defaults, { plans: [{ key: "starter", name: "Basis", tag: "t1" }] });
  assert.equal((merged.plans[0] as { key?: string }).key, "starter");
  // `tag` is missing: the whole list falls back to the bundled one
  assert.deepEqual(mergeCopy(defaults, { plans: [{ name: "Basis" }] }), defaults);
});
