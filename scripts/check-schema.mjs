#!/usr/bin/env node
/**
 * Guards the structured-data graph: one site, one Organization, one WebSite,
 * one product, and every page hanging off them by @id.
 *
 * What went wrong before this existed: two parallel JSON-LD builders. The
 * pages that used src/lib/schema.ts referenced `https://qlim8.com/#organization`;
 * the 44 marketing pages restated an anonymous `{ "@type": "Organization",
 * name: "qlim8" }` with no @id, and blog posts a third one. A crawler merges
 * entities by @id, never by name, so that was three companies called qlim8,
 * plus a `Product` on /priser and a `SoftwareApplication` on / that each
 * carried their own prices for the same thing.
 *
 * This builds the JSON-LD for every route the way the pages do (same
 * builders, same content) and fails when:
 *   - an Organization, WebSite, SoftwareApplication, WebPage, CollectionPage,
 *     Article, TechArticle or Service appears without an @id, or with an @id
 *     that is not on qlim8.com;
 *   - a `{ "@id": … }` reference points at an entity nothing defines (site-wide
 *     ids are defined on the homepage; page-local ids on the same page);
 *   - two definitions of the same @id disagree (copy-paste drift);
 *   - a BreadcrumbList names a URL that is not a route on this site, or does
 *     not end with the page it is on;
 *   - a FAQPage answer is empty;
 *   - any entity carries `offers` or a price (qlim8 is sold after a demo and
 *     publishes no package prices, see src/content/cta.ts).
 *
 * Runs in `npm run lint`. Usage:
 *   node --experimental-strip-types scripts/check-schema.mjs
 */
import "./lib/register-ts.mjs";

const BASE_URL = "https://qlim8.com";
const NEEDS_ID = new Set([
  "Organization", "WebSite", "SoftwareApplication", "WebPage", "CollectionPage",
  "ContactPage", "Article", "TechArticle", "Service", "BreadcrumbList",
]);

let failures = 0;
const fail = (msg) => {
  console.error(`  ✗ ${msg}`);
  failures++;
};

/** Depth-first over every object in a JSON-LD tree. */
function* objects(value, path = "$") {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) yield* objects(value[i], `${path}[${i}]`);
  } else if (value && typeof value === "object") {
    yield [path, value];
    for (const [k, v] of Object.entries(value)) yield* objects(v, `${path}.${k}`);
  }
}

const isRef = (o) => Object.keys(o).length === 1 && typeof o["@id"] === "string";

async function main() {
  const schema = await import("../src/lib/schema.ts");
  const marketing = await import("../src/lib/marketingPage.ts");
  const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../src/content/marketing/index.ts");
  const { hubCards } = await import("../src/content/navigation.ts");
  const { articles } = await import("../src/content/articles.ts");
  const { PRICING_COPY } = await import("../src/content/copy/pricing.ts");
  const { HOMEPAGE_FAQS, buildFaqSchema } = await import("../src/content/homepage-faqs.ts");

  const routes = new Set([
    "/", "/priser", "/metodologi", "/blog", "/api", "/om-os", "/docs", "/docs/mcp-quickstart",
    "/docs/mcp-tools", "/docs/api-reference", "/kontakt", "/nyhedsbrev", "/karriere",
    "/cookies", "/privatlivspolitik", "/handelsbetingelser",
    ...MARKETING_HUBS.map((h) => h.route),
    ...ALL_MARKETING_NODES.map((n) => `/${n.collection}/${n.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ]);

  // Route → JSON-LD blocks, built with the builders the pages use. Pages that
  // hand-roll a small block (e.g. /api's WebPage) are not modelled here; the
  // shared builders are where drift would recur.
  const pages = new Map();
  pages.set("/", [
    schema.ORGANIZATION,
    schema.WEBSITE,
    schema.buildSoftwareSchema(),
    buildFaqSchema(HOMEPAGE_FAQS),
  ]);
  pages.set("/om-os", [schema.ORGANIZATION]);
  pages.set("/priser", [
    schema.buildSoftwareSchema(),
    schema.buildFaqPageSchema(PRICING_COPY.faq.items),
  ]);
  pages.set("/metodologi", [
    schema.buildTechArticleSchema({ headline: "Metodologi", description: "x", path: "/metodologi" }),
    schema.buildBreadcrumbSchema([{ name: "qlim8", href: "/" }, { name: "Metodologi", href: "/metodologi" }]),
  ]);
  pages.set("/kontakt", [
    schema.buildContactPageSchema({ name: "Kontakt", description: "x" }),
    schema.buildBreadcrumbSchema([{ name: "qlim8", href: "/" }, { name: "Kontakt", href: "/kontakt" }]),
  ]);
  for (const path of ["/docs", "/docs/mcp-quickstart", "/docs/mcp-tools", "/docs/api-reference"]) {
    const trail = [{ name: "qlim8", href: "/" }, { name: "Docs", href: "/docs" }];
    if (path !== "/docs") trail.push({ name: path, href: path });
    pages.set(path, [
      schema.buildTechArticleSchema({ headline: path, description: "x", path }),
      schema.buildBreadcrumbSchema(trail),
    ]);
  }
  for (const a of articles) {
    const path = `/blog/${a.slug}`;
    pages.set(path, [
      schema.buildArticleSchema({
        headline: a.title, description: a.description, path,
        datePublished: a.publishedAt, dateModified: a.updatedAt ?? a.publishedAt, articleSection: a.category,
      }),
      schema.buildBreadcrumbSchema([{ name: "qlim8", href: "/" }, { name: "Blog", href: "/blog" }, { name: a.title, href: path }]),
    ]);
  }
  for (const hub of MARKETING_HUBS) {
    pages.set(hub.route, marketing.buildHubJsonLd(hub, hubCards(hub.collection), hub.defaults.faq?.items));
  }
  for (const node of ALL_MARKETING_NODES) {
    pages.set(`/${node.collection}/${node.slug}`, marketing.buildMarketingJsonLd(node, node.defaults));
  }

  // ── Pass 1: collect definitions ───────────────────────────────────────────
  const siteWide = new Map(); // @id → JSON of its definition (from "/")
  const defined = new Map(); // page → Set of @ids defined on that page
  for (const [route, blocks] of pages) {
    const ids = new Set();
    for (const [, o] of objects(blocks)) {
      if (isRef(o) || typeof o["@id"] !== "string") continue;
      ids.add(o["@id"]);
      if (route === "/") siteWide.set(o["@id"], JSON.stringify(o));
    }
    defined.set(route, ids);
  }

  // ── Pass 2: check every page ──────────────────────────────────────────────
  let entities = 0;
  for (const [route, blocks] of pages) {
    const local = defined.get(route);
    for (const [where, o] of objects(blocks)) {
      if (isRef(o)) {
        const id = o["@id"];
        if (!siteWide.has(id) && !local.has(id)) fail(`${route} ${where}: references ${id}, which nothing defines`);
        continue;
      }
      const type = o["@type"];
      if (typeof type !== "string") continue;
      entities++;
      if (NEEDS_ID.has(type)) {
        const id = o["@id"];
        if (typeof id !== "string") fail(`${route} ${where}: ${type} has no @id (an anonymous ${type} is a second, unlinked one)`);
        else if (!id.startsWith(BASE_URL)) fail(`${route} ${where}: ${type} @id ${id} is not on ${BASE_URL}`);
        else if (siteWide.has(id) && route !== "/" && siteWide.get(id) !== JSON.stringify(o)) {
          fail(`${route} ${where}: redefines ${id} differently from the homepage (share the constant instead)`);
        }
      }
      if (type === "BreadcrumbList") {
        const items = o.itemListElement ?? [];
        for (const item of items) {
          const url = typeof item.item === "string" ? item.item : item.item?.["@id"];
          const path = url?.replace(BASE_URL, "") || "/";
          if (!routes.has(path)) fail(`${route}: breadcrumb names ${url}, which is not a route`);
        }
        const last = items[items.length - 1];
        const lastPath = (typeof last?.item === "string" ? last.item : last?.item?.["@id"])?.replace(BASE_URL, "") || "/";
        if (lastPath !== route) fail(`${route}: breadcrumb ends at ${lastPath}, not at the page it is on`);
      }
      if (type === "FAQPage") {
        for (const q of o.mainEntity ?? []) {
          if (!q?.name?.trim() || !q?.acceptedAnswer?.text?.trim()) fail(`${route}: FAQPage has an empty question or answer`);
        }
      }
      // qlim8 publishes no package prices (src/content/cta.ts), and structured
      // data is where a stale one would outlive the copy: a crawler shows it.
      if ("offers" in o || "price" in o || "lowPrice" in o) {
        fail(`${route} ${where}: ${type} states an offer or a price, and qlim8 publishes none`);
      }
    }
  }

  const summary = `${pages.size} routes, ${entities} typed entities, ${siteWide.size} site-wide @ids`;
  if (failures > 0) {
    console.error(`✗ check-schema: ${failures} problem(s) (${summary})`);
    process.exit(1);
  }
  console.log(`✓ check-schema: ${summary}, every Organization/WebSite/page entity linked by @id`);
}

main().catch((err) => {
  console.error(`check-schema could not run: ${err?.stack ?? err}`);
  process.exit(1);
});
