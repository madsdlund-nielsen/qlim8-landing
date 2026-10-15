// Holds the redirect table (src/content/marketing/redirects.json) to the live
// site, and the menu and the related lists with it. The 2026 restructuring
// merged 12 industry pages into 4 and 21 product pages into 6; this is what
// stops an old address from turning into a 404, a chain, or a redirect that
// points at a page that is gone, and what stops a menu or "related" entry from
// naming a page that is not there (getRelated and buildGroups used to drop
// such an entry without a word, which is how `store-virksomheder` went
// missing).
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import "./register-ts.mjs";
import { pageRoutes } from "./routes.mjs";

const { MARKETING_HUBS, ALL_MARKETING_NODES, getRelated } = await import("../../src/content/marketing/index.ts");
const { MENU_SLUGS, buildGroups } = await import("../../src/content/navigation.ts");
const { articles } = await import("../../src/content/articles.ts");
const { markdownPaths } = await import("../../src/lib/markdown.ts");
const { REDIRECTS } = await import("../../src/content/marketing/redirects.ts");
const nextConfig = (await import("../../next.config.ts")).default;

const rows = JSON.parse(readFileSync(new URL("../../src/content/marketing/redirects.json", import.meta.url), "utf8"));

/** Every page the site serves (the same routes the sitemap and check-cms-copy build). */
const live = new Set([
  ...pageRoutes(),
  ...MARKETING_HUBS.map((h) => h.route),
  ...ALL_MARKETING_NODES.map((n) => `/${n.collection}/${n.slug}`),
  ...articles.map((a) => `/blog/${a.slug}`),
]);
const sources = new Map(rows.map((r) => [r.from, r.to]));

// Frozen on purpose: the 33 pages the site had before the restructuring. A page
// that is removed later is added to the table, not dropped from this list.
const HISTORIC = [
  ...["tomrer", "maler", "elektriker", "vvs", "entreprenoer", "revisor", "plastfabrikant", "raadgiver", "konsulent", "vognmand", "frisoer", "store-virksomheder"].map((s) => `/kundetyper/${s}`),
  ...[
    "dashboard", "udforskning", "data-udtraek", "rapportering", "excel-rapport", "pdf-rapport", "modtagere",
    "bestyrelsesrapport", "investorrapport", "bankrapport", "samarbejdspartnere", "temaer", "vsme-rapport",
    "vsme-basis", "vsme-comprehensive", "audit-trail", "tiltag", "scenarier", "revisor-adgang", "leverandoerkaede", "brag-board",
  ].map((s) => `/produkt/${s}`),
];

test("the frozen list holds 33 pages, and the table has 30 rows (the other three kept their address)", () => {
  assert.equal(HISTORIC.length, 33);
  assert.equal(new Set(HISTORIC).size, 33);
  assert.equal(rows.length, 30);
  assert.equal(new Set(rows.map((r) => r.from)).size, 30, "a source appears twice");
  assert.deepEqual(REDIRECTS, rows, "the typed accessor and the JSON disagree");
});

test("every historic page is either live or redirected", () => {
  for (const path of HISTORIC) {
    assert.ok(live.has(path) || sources.has(path), `${path} is neither a live page nor a redirect source: it is a 404`);
  }
});

test("every redirect source is a historic page, so the table holds nothing else", () => {
  for (const { from } of rows) assert.ok(HISTORIC.includes(from), `${from} is not one of the 33 historic pages`);
});

test("every destination is a live route", () => {
  for (const { from, to } of rows) assert.ok(live.has(to), `${from} redirects to ${to}, which is not a page`);
});

test("no source is a live route", () => {
  for (const { from } of rows) assert.ok(!live.has(from), `${from} is a redirect source and a live page at once`);
});

test("no chains: a destination is never itself a source", () => {
  for (const { from, to } of rows) assert.ok(!sources.has(to), `${from} -> ${to} -> ${sources.get(to)} is a chain`);
});

test("every row has a .md twin: both rules exist, both are 301, and the twin's destination has a markdown document", async () => {
  const rules = await nextConfig.redirects();
  const byRule = new Map(rules.map((r) => [r.source, r]));
  const md = new Set(markdownPaths());
  for (const { from, to } of rows) {
    const page = byRule.get(from);
    const twin = byRule.get(`${from}.md`);
    assert.ok(page, `no redirect rule for ${from}`);
    assert.ok(twin, `no redirect rule for ${from}.md`);
    assert.equal(page.destination, to);
    assert.equal(twin.destination, `${to}.md`);
    assert.equal(page.statusCode, 301, `${from}: ${JSON.stringify(page)}`);
    assert.equal(twin.statusCode, 301, `${from}.md: ${JSON.stringify(twin)}`);
    assert.ok(md.has(to), `${to} has no markdown twin, so ${from}.md would end in a 404`);
  }
});

test("every redirect in next.config.ts is a 301 (permanent: true would answer 308)", async () => {
  const rules = await nextConfig.redirects();
  assert.equal(rules.length, 6 + 60);
  for (const r of rules) {
    assert.equal(r.statusCode, 301, `${r.source}`);
    assert.ok(!("permanent" in r), `${r.source} sets permanent`);
  }
});

test("every MENU_SLUGS entry is a node of its collection, once", () => {
  for (const [collection, slugs] of Object.entries(MENU_SLUGS)) {
    const nodes = new Set(ALL_MARKETING_NODES.filter((n) => n.collection === collection).map((n) => n.slug));
    assert.equal(new Set(slugs).size, slugs.length, `${collection}: a slug is listed twice`);
    for (const slug of slugs) assert.ok(nodes.has(slug), `MENU_SLUGS.${collection}: "${slug}" is not a page`);
    for (const slug of nodes) assert.ok(slugs.includes(slug), `${collection}/${slug} is a page the menu does not list`);
  }
});

test("every node's related entry resolves, across collections", () => {
  for (const node of ALL_MARKETING_NODES) {
    // getRelated throws outside production on an entry that names nothing.
    const links = getRelated(node);
    assert.equal(links.length, (node.related ?? []).length, `${node.pageKey}: a related entry was dropped`);
    for (const link of links) assert.ok(live.has(link.href), `${node.pageKey}: related ${link.href} is not a page`);
  }
});

test("getRelated and the menu fail loudly on a dead entry outside production", () => {
  const node = { ...ALL_MARKETING_NODES[0], related: ["kundetyper/store-virksomheder"] };
  assert.throws(() => getRelated(node), /does not resolve/);
  assert.throws(() => getRelated({ ...node, related: ["/finder-ikke"] }), /does not resolve/);

  const before = MENU_SLUGS.kundetyper;
  try {
    MENU_SLUGS.kundetyper = [...before, "frisoer"];
    assert.throws(() => buildGroups("kundetyper"), /"frisoer" is not a kundetyper page/);
  } finally {
    MENU_SLUGS.kundetyper = before;
  }
});
