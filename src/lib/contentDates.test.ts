// Guards the generated content-dates file and the helpers app/sitemap.ts
// builds <lastmod> from. Run with: npm test (pretest regenerates the JSON).
//
// The failure this exists to catch is the one the file replaced: every URL
// reporting the same date, or a date that is not a date at all.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { latestOf } from "./dates.ts";

// Read, not imported: src/lib/contentDates.ts reaches the file through the
// `@/` alias, which node --test cannot resolve without the hook below.
const dates = JSON.parse(
  readFileSync(new URL("../generated/content-dates.json", import.meta.url), "utf8"),
) as Record<string, string>;
const entries = Object.entries(dates);

test("covers every indexable static route, hub and marketing leaf", async () => {
  // Registering the resolver here (not at the top) keeps the JSON/relative
  // imports above plain; the marketing content uses the `@/` alias.
  await import("../../scripts/lib/register-ts.mjs");
  const { MARKETING_HUBS, ALL_MARKETING_NODES } = await import("../content/marketing/index.ts");
  const { articles } = await import("../content/articles.ts");

  const expected = new Set<string>([
    "/", "/priser", "/metodologi", "/blog", "/api", "/om-os",
    "/docs", "/docs/mcp-quickstart", "/docs/mcp-tools", "/docs/api-reference",
    "/kontakt", "/nyhedsbrev", "/karriere", "/cookies", "/privatlivspolitik", "/handelsbetingelser",
    ...articles.map((a: { slug: string }) => `/blog/${a.slug}`),
    ...MARKETING_HUBS.map((h: { route: string }) => h.route),
    ...ALL_MARKETING_NODES.map((n: { collection: string; slug: string }) => `/${n.collection}/${n.slug}`),
  ]);
  const have = new Set(entries.map(([route]) => route));
  const missing = [...expected].filter((r) => !have.has(r));
  const extra = [...have].filter((r) => !expected.has(r));
  assert.deepEqual(missing, [], `routes with no content date: ${missing.join(", ")}`);
  assert.deepEqual(extra, [], `dates for routes that no longer exist: ${extra.join(", ")}`);
});

test("every date is a valid ISO timestamp in the past", () => {
  const now = Date.now();
  for (const [route, iso] of entries) {
    const t = new Date(iso).getTime();
    assert.ok(!Number.isNaN(t), `${route}: "${iso}" is not a date`);
    assert.ok(t <= now, `${route}: ${iso} is in the future`);
  }
});

test("dates are not all identical (the failure mode this file replaced)", () => {
  const days = new Set(entries.map(([, iso]) => iso.slice(0, 10)));
  assert.ok(days.size >= 2, `all ${entries.length} routes share one date: ${[...days][0]}`);
});

test("latestOf picks the newest usable date and ignores junk", () => {
  assert.equal(latestOf(), undefined);
  assert.equal(latestOf(null, undefined, "not a date"), undefined);
  assert.equal(latestOf("2026-05-13", "2026-08-20")?.toISOString().slice(0, 10), "2026-08-20");
  assert.equal(
    latestOf(new Date("2026-09-01T00:00:00Z"), "2026-08-20", null)?.toISOString().slice(0, 10),
    "2026-09-01",
  );
});
