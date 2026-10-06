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
 *   - any entity carries `offers` or a price in the pages as bundled (qlim8
 *     publishes no package price in its copy, see src/content/cta.ts);
 *   - the offers the packages API would give #software (src/lib/packageView.ts,
 *     against committed answers of the app's API in scripts/fixtures/) are
 *     anything but one Offer per public yearly company price, ex. VAT, or are
 *     not empty while the catalog sells nothing by itself.
 *
 * Runs in `npm run lint`. Usage:
 *   node --experimental-strip-types scripts/check-schema.mjs
 */
import { readFileSync } from "node:fs";
import "./lib/register-ts.mjs";
import { pageRoutes } from "./lib/routes.mjs";

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
  const pageSchemas = await import("../src/lib/pageSchemas.ts");
  const marketing = await import("../src/lib/marketingPage.ts");
  const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../src/content/marketing/index.ts");
  const { hubCards } = await import("../src/content/navigation.ts");
  const { articles } = await import("../src/content/articles.ts");
  const { PRICING_COPY } = await import("../src/content/copy/pricing.ts");
  const { HOMEPAGE_FAQS, buildFaqSchema } = await import("../src/content/homepage-faqs.ts");

  // Every rule below passes on an empty graph.
  if (!ALL_MARKETING_NODES.length || !MARKETING_HUBS.length || !articles.length) {
    console.error(
      `✗ check-schema: ${MARKETING_HUBS.length} hubs, ${ALL_MARKETING_NODES.length} sider og ${articles.length} artikler fundet, intet at tjekke`,
    );
    process.exit(1);
  }

  const routes = new Set([
    ...pageRoutes(),
    ...MARKETING_HUBS.map((h) => h.route),
    ...ALL_MARKETING_NODES.map((n) => `/${n.collection}/${n.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ]);

  // Route → JSON-LD blocks. Pages whose schema lives in src/lib/pageSchemas.ts
  // are read from there; the rest are built with the builders they use.
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
  // The pages that keep their JSON-LD in src/lib/pageSchemas.ts are checked
  // as they ship, not rebuilt here from the builders.
  pages.set("/metodologi", pageSchemas.METHODOLOGY_PAGE_SCHEMA);
  pages.set("/kontakt", pageSchemas.CONTACT_PAGE_SCHEMA);
  pages.set("/api", pageSchemas.API_PAGE_SCHEMA);
  pages.set("/docs", pageSchemas.DOCS_PAGE_SCHEMA);
  pages.set("/docs/mcp-quickstart", pageSchemas.MCP_QUICKSTART_PAGE_SCHEMA);
  pages.set("/docs/mcp-tools", pageSchemas.MCP_TOOLS_PAGE_SCHEMA);
  pages.set("/docs/api-reference", pageSchemas.API_REFERENCE_PAGE_SCHEMA);
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

  // Offers come only from the app's packages API, only on #software.
  const { offersFromPackages } = await import("../src/lib/packageView.ts");
  const fixture = (name) => JSON.parse(readFileSync(new URL(`./fixtures/${name}`, import.meta.url), "utf8"));
  const salesLed = fixture("public-packages.v1.json");
  const selfServe = fixture("public-packages.v2.json");
  if (offersFromPackages(salesLed).length !== 0) {
    fail("catalog v1 (every package behind a demo) must give #software no offers");
  }
  const expected = selfServe.packages.filter((p) => p.accountType === "company" && p.price?.visibility === "public");
  const offers = offersFromPackages(selfServe);
  const software = schema.buildSoftwareSchema(offers);
  if (software["@id"] !== `${BASE_URL}/#software`) fail("offers must sit on #software");
  if (offers.length !== expected.length || expected.length === 0) {
    fail(`#software has ${offers.length} offers, the API shows ${expected.length} public prices`);
  }
  for (const pkg of expected) {
    const offer = offers.find((o) => o.name === pkg.name);
    const price = (pkg.price.yearlyMinor / 100).toFixed(2);
    if (!offer) {
      fail(`no offer for ${pkg.name}`);
    } else if (
      offer.price !== price ||
      offer.priceCurrency !== "DKK" ||
      offer.priceSpecification?.billingDuration !== "P1Y" ||
      offer.priceSpecification?.valueAddedTaxIncluded !== false
    ) {
      fail(`offer for ${pkg.name} is not its yearly price ex. VAT (${price} DKK)`);
    }
  }
  for (const hidden of selfServe.packages.filter((p) => p.price === null || p.price.visibility !== "public")) {
    if (offers.some((o) => o.name === hidden.name)) fail(`${hidden.name} has no public price but got an offer`);
  }

  const summary = `${pages.size} routes, ${entities} typed entities, ${siteWide.size} site-wide @ids, ${offers.length} offers from the API fixture`;
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
