import { test } from "node:test";
import assert from "node:assert/strict";
import { isDemoHref, isEmployeeBand, looksLikeEmail, routeForBand, safeBookingUrl } from "./demoDialog.ts";
import { DEMO_HREF, EMPLOYEE_BANDS } from "../content/cta.ts";

const BASE = "https://qlim8.com/produkt/rapportering";

test("isDemoHref: the demo CTA in every spelling a link can have", () => {
  assert.ok(isDemoHref(DEMO_HREF, BASE));
  assert.ok(isDemoHref("/kontakt?emne=demo", BASE));
  assert.ok(isDemoHref("/kontakt/?emne=demo", BASE));
  assert.ok(isDemoHref("https://qlim8.com/kontakt?emne=demo", BASE));
  assert.ok(isDemoHref("/kontakt?ref=linkedin&emne=demo", BASE));
  assert.ok(isDemoHref("/kontakt?emne=demo#form", BASE));
  assert.ok(isDemoHref("kontakt?emne=demo", "https://qlim8.com/"));
});

test("isDemoHref: contact links, other pages and other origins are left alone", () => {
  assert.ok(!isDemoHref("/kontakt", BASE));
  assert.ok(!isDemoHref("/kontakt?emne=question", BASE));
  assert.ok(!isDemoHref("/kontakt?emne=demo2", BASE));
  assert.ok(!isDemoHref("/kontakt/andet?emne=demo", BASE));
  assert.ok(!isDemoHref("/demo", BASE));
  assert.ok(!isDemoHref("/priser", BASE));
  assert.ok(!isDemoHref("https://app.qlim8.com/kontakt?emne=demo", BASE));
  assert.ok(!isDemoHref("https://evil.example/kontakt?emne=demo", BASE));
  assert.ok(!isDemoHref("mailto:kontakt@qlim8.com", BASE));
  assert.ok(!isDemoHref("tel:+4593901384", BASE));
  assert.ok(!isDemoHref("", BASE));
  assert.ok(!isDemoHref(null, BASE));
  assert.ok(!isDemoHref("/kontakt?emne=demo", "not a url"));
});

test("routeForBand: 1-9 sees the film, every other band books a time", () => {
  assert.equal(routeForBand("1-9"), "video");
  for (const band of ["10-49", "50-249", "250+"]) assert.equal(routeForBand(band), "booking");
});

test("the bands are the slide-in's four", () => {
  assert.deepEqual(EMPLOYEE_BANDS.map((b) => b.value), ["1-9", "10-49", "50-249", "250+"]);
  assert.ok(isEmployeeBand("250+"));
  assert.ok(!isEmployeeBand("5"));
});

test("safeBookingUrl accepts only https", () => {
  assert.equal(safeBookingUrl("https://calendar.app.google/abc"), "https://calendar.app.google/abc");
  assert.equal(safeBookingUrl("  https://calendar.google.com/x "), "https://calendar.google.com/x");
  assert.equal(safeBookingUrl("http://calendar.app.google/abc"), null);
  assert.equal(safeBookingUrl("javascript:alert(1)"), null);
  assert.equal(safeBookingUrl("//calendar.app.google/abc"), null);
  assert.equal(safeBookingUrl(""), null);
  assert.equal(safeBookingUrl(undefined), null);
  assert.equal(safeBookingUrl(42), null);
});

test("looksLikeEmail", () => {
  assert.ok(looksLikeEmail("mads@viridis-ramosa.com"));
  assert.ok(!looksLikeEmail("mads@"));
  assert.ok(!looksLikeEmail("mads@x"));
  assert.ok(!looksLikeEmail("mads viridis@x.dk"));
});
