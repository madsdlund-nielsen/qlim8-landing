// The stored cookie choice (src/lib/consent.ts): what holds, what makes the
// banner ask again, and the Consent Mode signals sent to Google.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CONSENT_MAX_AGE_MS, consentModeFor, parseConsent, serializeConsent } from "./consent.ts";

const NOW = Date.parse("2026-10-03T12:00:00Z");

test("a choice made with categories holds for 12 months", () => {
  const raw = serializeConsent({ statistics: true, marketing: false }, NOW);
  assert.deepEqual(parseConsent(raw, NOW), { statistics: true, marketing: false, at: "2026-10-03T12:00:00.000Z" });
  assert.notEqual(parseConsent(raw, NOW + CONSENT_MAX_AGE_MS), null);
  assert.equal(parseConsent(raw, NOW + CONSENT_MAX_AGE_MS + 1), null);
});

test("the banner asks again for nothing, rubbish, a choice from before categories, or one from the future", () => {
  for (const raw of [null, "", "{", "accepted", "rejected", '{"statistics":true}', '{"statistics":"yes","marketing":false,"at":"2026-10-03T12:00:00Z"}']) {
    assert.equal(parseConsent(raw, NOW), null, `${raw} should not hold`);
  }
  assert.equal(parseConsent(serializeConsent({ statistics: true, marketing: true }, NOW + 60_000), NOW), null);
});

test("Consent Mode grants exactly what was chosen", () => {
  assert.deepEqual(consentModeFor({ statistics: true, marketing: false }), {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  assert.deepEqual(consentModeFor({ statistics: false, marketing: true }), {
    analytics_storage: "denied",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
});
