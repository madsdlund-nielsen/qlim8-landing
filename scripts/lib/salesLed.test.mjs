/**
 * The copy rules in salesLed.mjs against strings known to break them and
 * strings known not to. Every rule must catch at least one of the strings
 * below, so a pattern that silently stops matching fails here, not in
 * production copy.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { SALES_LED_RULES, salesLedViolations } from "./salesLed.mjs";

const BREAKS = [
  ["Starter fra 695 kr/md", "package price"],
  ["faktureret årligt (8.340 kr)", "package price"],
  ["Premium koster 23 940 kr om året", "package price"],
  ["Starter koster 795 kr/md", "package price"],
  ["Business 3.995 kr om måneden", "package price"],
  ["faktureret årligt (9.540 kr)", "package price"],
  ["Business 47 940 kr om året", "package price"],
  ["Enterprise starter fra 6.500 kr. pr. måned", "package price"],
  ["Priserne starter ved 1.234 kroner", "package price"],
  ["Se premium-pris", "package price"],
  ["Spar 20 % rabat ved årlig betaling", "package price"],
  ["Start med 14 dages prøveperiode", "trial claim"],
  ["Prøv qlim8 gratis", "trial claim"],
  ["Få en gratis demo-konto", "trial claim"],
  ["14 dages gratis prøve", "trial claim"],
  ["De første 30 dage med alt fra Starter", "intro offer claim"],
  ["Opgrader til Premium inden for det første år", "intro offer claim"],
  ["https://app.qlim8.com/auth?tab=register", "signup link"],
  ["https://app.qlim8.com/signup?package=starter", "signup link"],
  ["fetch('/api/stripe/checkout')", "checkout"],
  ["POST /api/billing/checkout", "checkout"],
];

const FINE = [
  "Opret en gratis konto",
  "Kom gratis i gang",
  "Start gratis, og opgradér når I har brug for mere.",
  "Intet kreditkort, ingen udløbsdato.",
  "Vælg din plan på /priser",
  "Free koster ingenting.",
  "Opret dig på et par minutter.",
  "Priserne står på /priser, pr. måned, faktureret årligt, ekskl. moms.",
  "En førstegangs-VSME-konsulent koster 75.000-200.000 kr.",
  "En faktura på 12.500 kr fra din elleverandør",
  "Log ind på https://app.qlim8.com/auth",
  "Mandag–fredag: 9:00–17:00",
];

test("each known breach is caught, by the rule kind it belongs to", () => {
  for (const [text, kind] of BREAKS) {
    const found = salesLedViolations(text).map((v) => v.kind);
    assert.ok(found.includes(kind), `"${text}" should break a "${kind}" rule, got [${found.join(", ")}]`);
  }
});

test("self-serve copy, other money and a login link pass", () => {
  for (const text of FINE) {
    assert.deepEqual(salesLedViolations(text), [], `"${text}" should pass`);
  }
});

test("every rule catches at least one known breach", () => {
  for (const { kind, re } of SALES_LED_RULES) {
    assert.ok(
      BREAKS.some(([text]) => re.test(text)),
      `the ${kind} rule ${re} matches none of the known breaches: add one, or the rule is dead`,
    );
  }
});

test("trial wording is allowed where the catalog's trial is turned into a sentence, and never in copy or CMS", () => {
  const text = "7 dages gratis prøveperiode. Kortet trækkes først bagefter.";
  assert.deepEqual(salesLedViolations(text, { file: "src/lib/packageView.ts" }), []);
  assert.equal(salesLedViolations(text, { file: "src/content/copy/pricing.ts" })[0]?.kind, "trial claim");
  assert.equal(salesLedViolations(text)[0]?.kind, "trial claim");
});

test("trial and intro-offer wording from the packages API is allowed in packageView.ts only", () => {
  const lines = [
    "14 dages gratis prøve. Kortet registreres ved start.",
    "De første 30 dage med alt fra Premium.",
    "Opgrader til Premium inden for det første år: første år 19.950 kr ekskl. moms.",
  ];
  for (const text of lines.slice(0, 2)) {
    assert.deepEqual(salesLedViolations(text, { file: "src/lib/packageView.ts" }), [], text);
    assert.ok(salesLedViolations(text, { file: "src/content/copy/pricing.ts" }).length > 0, text);
    assert.ok(salesLedViolations(text, { file: "src/components/public/PackageGroups.tsx" }).length > 0, text);
    assert.ok(salesLedViolations(text).length > 0, `${text} (CMS)`);
  }
  // The upgrade line carries a computed figure that is not a plan figure, so
  // only the wording rule applies to it.
  assert.deepEqual(salesLedViolations(lines[2], { file: "src/lib/packageView.ts" }), []);
  assert.equal(salesLedViolations(lines[2], { file: "src/content/copy/home.ts" })[0]?.kind, "intro offer claim");
});

test("a signup URL is allowed in the CTA module only, and never in CMS copy", () => {
  const url = "https://app.qlim8.com/signup?package=free";
  assert.deepEqual(salesLedViolations(url, { file: "src/content/cta.ts" }), []);
  assert.equal(salesLedViolations(url, { file: "src/content/copy/home.ts" })[0]?.kind, "signup link");
  assert.equal(salesLedViolations(url)[0]?.kind, "signup link");
});

// ---------------------------------------------------------------------------
// The price token: {pris:<package>} inside [[ ... ]]
// ---------------------------------------------------------------------------
import { priceTokenViolations, PRICE_PACKAGE_KEYS } from "./salesLed.mjs";

test("the token keys are the packages of the v3 fixture", () => {
  for (const k of ["free", "starter", "premium", "business", "enterprise"]) assert.ok(PRICE_PACKAGE_KEYS.has(k), k);
});

test("a token inside [[ ]] passes, monthly and yearly, across lines", () => {
  assert.deepEqual(salesLedViolations("[[Starter koster {pris:starter} om måneden.]]"), []);
  assert.deepEqual(salesLedViolations("[[Det er {pris:business:aar} om året.]]"), []);
  assert.deepEqual(priceTokenViolations('"[[Starter koster {pris:starter}" +\n" om måneden.]]"'), []);
});

test("a token outside [[ ]], a malformed token, an unknown package and an unbalanced marker are errors", () => {
  const kinds = (t) => priceTokenViolations(t).map((v) => v.match);
  assert.match(kinds("Starter koster {pris:starter}")[0], /outside \[\[ \]\]/);
  assert.match(kinds("[[Pris {pris:starter:maaned}]]")[0], /malformed/);
  assert.match(kinds("[[Pris {pris:}]]")[0], /malformed/);
  assert.match(kinds("[[Pris {pris:starter:aar:x}]]")[0], /malformed/);
  assert.match(kinds("[[Pris {pris:platin}]]")[0], /unknown package/);
  assert.match(kinds("[[Pris {pris:starter}")[0], /unbalanced/);
  assert.equal(salesLedViolations("Starter {pris:starter}")[0]?.kind, "price token");
});

test("a hand-typed figure stays an error, token or not", () => {
  assert.equal(salesLedViolations("[[Starter koster 795 kr om måneden, {pris:starter}]]")[0]?.kind, "package price");
  assert.equal(salesLedViolations("[[Starter koster 9.540 kr om året]]")[0]?.kind, "package price");
});
