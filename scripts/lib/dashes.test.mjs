/**
 * The dash rule (scripts/lib/dashes.mjs) against strings known to break it and
 * strings known not to: the em-dash is rejected everywhere, a spaced en-dash
 * between words is a tankestreg and passes, an unspaced en-dash between
 * ordinary words is still an em-dash in disguise, and a range passes.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { dashFindings } from "./dashes.mjs";

const kinds = (text) => dashFindings(text).map((f) => f.char);

test("the long em-dash is rejected, spaced or not", () => {
  assert.deepEqual(kinds("qlim8 — klimaregnskab"), ["em-dash"]);
  assert.deepEqual(kinds("qlim8—klimaregnskab"), ["em-dash"]);
  assert.deepEqual(kinds("Label —"), ["em-dash"]);
});

test("a short en-dash with spaces between words is a tankestreg and passes", () => {
  assert.deepEqual(dashFindings("Det er rigtigt – men ikke nok"), []);
  assert.deepEqual(dashFindings("qlim8 – klimaregnskab for SMV'er"), []);
  assert.deepEqual(dashFindings("Åbent 9:00 – 17:00"), []);
  assert.deepEqual(dashFindings("Ord – 17 – ord"), []);
});

test("an en-dash with no spaces between ordinary words is rejected", () => {
  assert.deepEqual(kinds("klima–regnskab"), ["en-dash"]);
  assert.deepEqual(kinds("ord–ord"), ["en-dash"]);
  assert.deepEqual(kinds("Scope 3–beregning"), ["en-dash"]);
});

test("an en-dash with a space on one side only, or with nothing to join, is rejected", () => {
  assert.deepEqual(kinds("ord –ord"), ["en-dash"]);
  assert.deepEqual(kinds("ord– ord"), ["en-dash"]);
  assert.deepEqual(kinds("– ord"), ["en-dash"]);
  assert.deepEqual(kinds("ord –"), ["en-dash"]);
  assert.deepEqual(kinds("ord – "), ["en-dash"]);
});

test("ranges pass: numbers, weekdays and months", () => {
  assert.deepEqual(dashFindings("9:00–17:00"), []);
  assert.deepEqual(dashFindings("2024–2026"), []);
  assert.deepEqual(dashFindings("80–94%"), []);
  assert.deepEqual(dashFindings("Mandag–fredag: 9:00–17:00"), []);
  assert.deepEqual(dashFindings("januar–marts"), []);
});

test("each finding reports the column of the dash", () => {
  assert.deepEqual(dashFindings("ab—cd"), [{ col: 2, char: "em-dash" }]);
});
