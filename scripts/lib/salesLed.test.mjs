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
  ["Enterprise starter fra 6.500 kr. pr. måned", "package price"],
  ["Priserne starter ved 1.234 kroner", "package price"],
  ["Se premium-pris", "package price"],
  ["Spar 20 % rabat ved årlig betaling", "package price"],
  ["Start med 14 dages prøveperiode", "trial claim"],
  ["Prøv qlim8 gratis", "trial claim"],
  ["Få en gratis demo-konto", "trial claim"],
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

test("a signup URL is allowed in the CTA module only, and never in CMS copy", () => {
  const url = "https://app.qlim8.com/signup?package=free";
  assert.deepEqual(salesLedViolations(url, { file: "src/content/cta.ts" }), []);
  assert.equal(salesLedViolations(url, { file: "src/content/copy/home.ts" })[0]?.kind, "signup link");
  assert.equal(salesLedViolations(url)[0]?.kind, "signup link");
});
