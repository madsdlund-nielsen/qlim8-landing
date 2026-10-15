// The slide-in's logic (src/lib/slideIn.ts): when it starts, what is valid,
// what is sent, what is stored and where it never shows.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildLeadPayload,
  COOLDOWN_DAYS,
  decideStart,
  emptyData,
  emptyPersistent,
  emptySession,
  formatPhone,
  isExitIntent,
  isHiddenRoute,
  isKnownChoice,
  parsePersistent,
  parseSession,
  phoneDigits,
  recordDismiss,
  recordSignup,
  scrollReached,
  serializeSession,
  validateStep,
} from "./slideIn.ts";
import { COPY, DRIVERS, SIZES, TOPICS } from "../content/slideIn.ts";

const NOW = Date.parse("2026-10-15T10:00:00Z");
const DAY = 86_400_000;
const fresh = { signedUp: false, touched: false, counted: false };

test("it waits for the cookie banner, then arms", () => {
  assert.equal(decideStart({ persistent: emptyPersistent(), session: fresh, consentDecided: false, now: NOW }).view, "waiting");
  assert.equal(decideStart({ persistent: emptyPersistent(), session: fresh, consentDecided: true, now: NOW }).view, "hidden");
});

test("a signed-up visitor never sees it again, even before the banner is answered", () => {
  assert.equal(decideStart({ persistent: { ...emptyPersistent(), signedUp: true }, session: fresh, consentDecided: false, now: NOW }).view, "gone");
  assert.equal(decideStart({ persistent: emptyPersistent(), session: { ...fresh, signedUp: true }, consentDecided: true, now: NOW }).view, "gone");
});

test("closed earlier in the session: starts as the pill", () => {
  assert.equal(decideStart({ persistent: emptyPersistent(), session: { ...fresh, touched: true }, consentDecided: true, now: NOW }).view, "minimized");
});

test("closed in 3 visits: the pill for 30 days, then it opens itself again", () => {
  const p = { signedUp: false, dismissCount: 3, lastDismissAt: NOW - 10 * DAY };
  const d = decideStart({ persistent: p, session: fresh, consentDecided: true, now: NOW });
  assert.deepEqual([d.view, d.touched, d.counted], ["minimized", true, true]);
  const later = decideStart({ persistent: p, session: fresh, consentDecided: true, now: NOW + (COOLDOWN_DAYS - 10) * DAY });
  assert.equal(later.view, "hidden");
  assert.equal(decideStart({ persistent: { ...p, dismissCount: 2 }, session: fresh, consentDecided: true, now: NOW }).view, "hidden");
});

test("dismissals count up, and start over after the pause", () => {
  const one = recordDismiss(emptyPersistent(), NOW);
  assert.deepEqual([one.dismissCount, one.lastDismissAt], [1, NOW]);
  assert.equal(recordDismiss(one, NOW + DAY).dismissCount, 2);
  assert.equal(recordDismiss({ ...one, dismissCount: 3 }, NOW + (COOLDOWN_DAYS + 1) * DAY).dismissCount, 1);
  assert.deepEqual(recordSignup(one, "2026-10-15T10:00:00.000Z").signedUp, true);
});

test("triggers: half way down, and out through the top", () => {
  assert.equal(scrollReached(499, 2000, 1000), false);
  assert.equal(scrollReached(500, 2000, 1000), true);
  assert.equal(scrollReached(0, 800, 1000), false);
  assert.equal(isExitIntent(0), true);
  assert.equal(isExitIntent(-3), true);
  assert.equal(isExitIntent(12), false);
});

test("phone: 8 digits, +45 and spaces allowed, formatted 12 34 56 78", () => {
  for (const ok of ["12345678", "12 34 56 78", "+45 12 34 56 78", "0045 12345678", "12-34-56-78"]) assert.equal(phoneDigits(ok), "12345678", ok);
  for (const bad of ["", "1234567", "123456789", "abcdefgh", "+46 12345678"]) assert.equal(phoneDigits(bad), null, bad);
  assert.equal(formatPhone("12345678"), "12 34 56 78");
});

test("validation per step", () => {
  const d = emptyData();
  assert.deepEqual(Object.keys(validateStep(1, d)).sort(), ["email", "name"]);
  assert.deepEqual(validateStep(1, { ...d, name: "Mette", email: "mette@firma.dk" }), {});
  assert.ok(validateStep(1, { ...d, name: "Mette", email: "mette@firma" }).email);
  assert.deepEqual(Object.keys(validateStep(2, d)).sort(), ["driver", "size"]);
  assert.ok(validateStep(3, d).phone);
  assert.deepEqual(validateStep(3, { ...d, phoneSkipped: true }), {});
  assert.deepEqual(validateStep(3, { ...d, phone: "12 34 56 78" }), {});
  assert.ok(validateStep(4, d).interests);
  assert.deepEqual(validateStep(4, { ...d, interests: [TOPICS[0]] }), {});
});

test("the lead payload follows the app's contract", () => {
  const data = { ...emptyData(), name: " Mette Hansen ", email: " mette@hansen-byg.dk ", size: SIZES[1], driver: DRIVERS[0], phone: "12 34 56 78", interests: [TOPICS[0], TOPICS[4]] };
  assert.deepEqual(buildLeadPayload(data, "scroll", "slidein"), {
    name: "Mette Hansen",
    email: "mette@hansen-byg.dk",
    companySize: "10-49",
    driver: "Banken eller en investor har spurgt",
    phone: "12345678",
    interests: ["ESG rapporter", "Guides & whitebooks"],
    triggeredBy: "scroll",
    source: "slidein",
  });
  assert.equal(buildLeadPayload({ ...data, phoneSkipped: true, phone: "" }, null, "x").phone, null);
  assert.equal(buildLeadPayload(data, null, "x").triggeredBy, null);
  assert.equal(isKnownChoice(data), true);
  assert.equal(isKnownChoice({ ...data, size: "5" }), false);
});

test("stored shapes survive a round trip and rubbish gives a fresh state", () => {
  const s = { ...emptySession(), step: 5, signedUp: true, triggeredBy: "tid" as const, leadId: "abc-1", data: { ...emptyData(), name: "A", interests: ["x"] } };
  assert.deepEqual(parseSession(serializeSession(s)), s);
  for (const raw of [null, "", "{", "[]", "42"]) assert.deepEqual(parseSession(raw), emptySession(), String(raw));
  assert.equal(parseSession('{"step":99,"triggeredBy":"bogus"}').step, 0);
  assert.equal(parseSession('{"triggeredBy":"bogus"}').triggeredBy, null);
  assert.deepEqual(parsePersistent("nope"), emptyPersistent());
  assert.equal(parsePersistent('{"signedUp":true,"dismissCount":2,"lastDismissAt":5}').dismissCount, 2);
});

test("pages without the slide-in", () => {
  for (const p of ["/kontakt", "/priser", "/nyhedsbrev", "/nyhedsbrev/afmeld", "/privatlivspolitik", "/cookies", "/handelsbetingelser", "/databehandleraftale", "/docs", "/docs/api", "/api", "/api/mcp", "/priser.md", "/blog/x.md", "/md/priser", "/kontakt/"]) {
    assert.equal(isHiddenRoute(p), true, p);
  }
  for (const p of ["/", "/blog", "/blog/scope-3-smv-guide", "/produkt/rapportering", "/kundetyper", "/om-os", "/priserne", "/kontaktformular", "/integrationer/dinero"]) {
    assert.equal(isHiddenRoute(p), false, p);
  }
});

test("the copy: the approved welcome text, with and without a book", () => {
  assert.equal(
    COPY.welcomeLead("ESG er nemt"),
    "Få vores gratis whitepaper på tre sider om at lave jeres første VSME-rapport i syv trin, efter metoden fra bogen »ESG er nemt«.",
  );
  assert.match(COPY.welcomeLead(""), /efter vores metode\.$/);
  assert.equal(COPY.thanks("Mette"), "Tak, Mette");
  assert.equal(COPY.thanks(""), "Tak");
});
