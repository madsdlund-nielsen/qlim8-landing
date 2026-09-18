#!/usr/bin/env node
/**
 * Checks the copy that is actually live: the CMS-published overrides that
 * replace this repo's bundled defaults at render time.
 *
 * Every other guard here reads files in this repo, and none of them can see
 * text authored in the app's /admin editor, which wins over the file whenever
 * a field has been published. Two kinds of drift slipped through that gap and
 * were live on qlim8.com when this was written:
 *
 *   1. A dead internal link: a CTA on /kundetyper/tomrer pointed at
 *      /funktioner, a route that does not exist (404).
 *   2. A contradicting price: the homepage FAQ said "starter ved 250 kr/md"
 *      and a feature bullet said "fra 625 kr/md", while the hero, the meta
 *      description and the structured data all said 300 (and Premium 1195).
 *      Two prices for one product on one page is exactly the conflicting
 *      signal search engines punish.
 *
 * So, for every CMS page key this site reads:
 *   - every internal path in the copy must be a route this site serves, and
 *   - every advertised entry price ("fra N kr/md", "starter ved N kr") must be
 *     one of the plan prices in src/content/copy/pricing.ts.
 *
 * Runs with `npm run test:contract` (live, scheduled in cms-contract.yml),
 * not in `npm run lint`: the failure can appear with no commit in this repo.
 *
 * Usage:
 *   node --experimental-strip-types scripts/check-cms-copy.mjs
 *   CMS_API_BASE=https://staging.example.com node --experimental-strip-types scripts/check-cms-copy.mjs
 *
 * Exit 0 = live copy is consistent with the site. Exit 1 = it is not, and the
 * fix is in /admin, not in this repo.
 */
import "./lib/register-ts.mjs";

const BASE = process.env.CMS_API_BASE || process.env.NEXT_PUBLIC_API_URL || "https://app.qlim8.com";
const TIMEOUT_MS = Number(process.env.CMS_CONTRACT_TIMEOUT_MS || 20000);

let failures = 0;
const fail = (msg) => {
  console.error(`  ✗ ${msg}`);
  failures++;
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) throw new Error(`${path} → not JSON (${ct || "no content-type"})`);
  return res.json();
}

/** Every string value in a copy tree, with its dotted path. */
function* strings(value, path = "") {
  if (typeof value === "string") yield [path, value];
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${path}[${i}]`);
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) yield* strings(v, path ? `${path}.${k}` : k);
}

/** Internal paths mentioned in a string: bare "/priser", href="/x", (/x). */
function internalPaths(text) {
  const out = new Set();
  for (const m of text.matchAll(/(?:^|[\s"'(=])(\/[a-z0-9][a-z0-9\-/]*)(?:[?#][^\s"')]*)?(?=$|[\s"')<,.])/gi)) {
    out.add(m[1].replace(/\/$/, "") || "/");
  }
  return out;
}

/** "fra 625 kr/md", "starter ved 250 kr", "priser fra 300 kr" → [625, 250, 300] */
function advertisedEntryPrices(text) {
  const out = [];
  for (const m of text.matchAll(/(?:fra|starter ved|starter fra|allerede fra)\s+(\d{1,3}(?:[.\s]\d{3})*)\s*kr\b/gi)) {
    out.push({ phrase: m[0], price: Number(m[1].replace(/[.\s]/g, "")) });
  }
  return out;
}

async function main() {
  console.log(`CMS copy check against ${BASE}\n`);

  const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../src/content/marketing/index.ts");
  const { articles } = await import("../src/content/articles.ts");
  const { PRICING_COPY, PRICING_PAGE_KEY } = await import("../src/content/copy/pricing.ts");
  const { HOME_PAGE_KEY } = await import("../src/content/copy/home.ts");
  const { ABOUT_PAGE_KEY } = await import("../src/content/copy/about.ts");
  const { CONTACT_PAGE_KEY } = await import("../src/content/copy/contact.ts");
  const { CAREERS_PAGE_KEY } = await import("../src/content/copy/careers.ts");
  const { METHODOLOGY_PAGE_KEY } = await import("../src/content/copy/methodology.ts");
  const { LEGAL_COOKIES_PAGE_KEY, LEGAL_PRIVACY_PAGE_KEY, LEGAL_TERMS_PAGE_KEY } = await import("../src/content/copy/legal.ts");

  // ── Routes this site serves ────────────────────────────────────────────────
  const routes = new Set([
    "/", "/priser", "/metodologi", "/blog", "/api", "/om-os", "/docs", "/docs/mcp-quickstart",
    "/docs/mcp-tools", "/docs/api-reference", "/kontakt", "/nyhedsbrev", "/nyhedsbrev/afmeld",
    "/karriere", "/cookies", "/privatlivspolitik", "/handelsbetingelser",
    "/llms.txt", "/llms-full.txt", "/sitemap.xml", "/robots.txt",
    // permanent redirects in next.config.ts still resolve
    "/pricing", "/about", "/viden",
    ...MARKETING_HUBS.map((h) => h.route),
    ...ALL_MARKETING_NODES.map((n) => `/${n.collection}/${n.slug}`),
    ...articles.map((a) => `/blog/${a.slug}`),
  ]);
  let published = [];
  try {
    published = await getJson("/api/public/cms/articles?language=da");
    for (const a of published) routes.add(`/blog/${a.slug}`);
  } catch (err) {
    fail(`could not list published articles: ${err.message}`);
  }
  const isRoute = (p) => routes.has(p) || routes.has(p.replace(/\.md$/, ""));

  // ── Plan prices the copy may advertise as an entry price ──────────────────
  const { starter, premium } = PRICING_COPY.prices;
  const planPrices = new Set([starter.yearlyDkk, starter.monthlyDkk, premium.yearlyDkk, premium.monthlyDkk]);

  // ── Page keys the site reads (see app/**/page.tsx and app/sitemap.ts) ─────
  const pageKeys = [
    HOME_PAGE_KEY, "homepage.faqs", "landing.images",
    PRICING_PAGE_KEY, METHODOLOGY_PAGE_KEY, ABOUT_PAGE_KEY, "about.images",
    CONTACT_PAGE_KEY, CAREERS_PAGE_KEY,
    LEGAL_COOKIES_PAGE_KEY, LEGAL_PRIVACY_PAGE_KEY, LEGAL_TERMS_PAGE_KEY,
    ...MARKETING_HUBS.map((h) => h.pageKey),
    ...ALL_MARKETING_NODES.map((n) => n.pageKey),
  ];

  let publishedKeys = 0;
  let checkedStrings = 0;
  const seen = new Map(); // problem → first page key, to keep output short
  const report = (problem, key, where) => {
    if (seen.has(problem)) return;
    seen.set(problem, key);
    fail(`${key} · ${where}: ${problem}`);
  };

  const results = await Promise.all(
    pageKeys.map(async (key) => {
      try {
        const data = await getJson(`/api/public/cms/marketing/${encodeURIComponent(key)}?language=da`);
        return [key, data?.copy && typeof data.copy === "object" ? data.copy : {}];
      } catch (err) {
        fail(`${key}: ${err.message}`);
        return [key, {}];
      }
    }),
  );

  for (const [key, copy] of results) {
    if (Object.keys(copy).length === 0) continue;
    publishedKeys++;
    for (const [where, text] of strings(copy)) {
      checkedStrings++;
      for (const p of internalPaths(text)) {
        if (!isRoute(p)) report(`links to ${p}, which is not a route on qlim8.com`, key, where);
      }
      for (const { phrase, price } of advertisedEntryPrices(text)) {
        if (!planPrices.has(price)) {
          report(
            `says "${phrase}" but the plans cost ${[...planPrices].join("/")} kr/md (src/content/copy/pricing.ts)`,
            key,
            where,
          );
        }
      }
    }
  }

  // Article bodies: CTA hrefs and richtext links
  for (const a of published) {
    try {
      const art = await getJson(`/api/public/cms/articles/${encodeURIComponent(a.slug)}?language=da`);
      for (const [where, text] of strings(art?.sections ?? [])) {
        checkedStrings++;
        for (const p of internalPaths(text)) {
          if (!isRoute(p)) report(`links to ${p}, which is not a route on qlim8.com`, `article ${a.slug}`, where);
        }
      }
    } catch (err) {
      fail(`article ${a.slug}: ${err.message}`);
    }
  }

  pass(`${publishedKeys} published page key(s), ${published.length} article(s), ${checkedStrings} strings checked`);

  console.log("");
  if (failures > 0) {
    console.error(`CMS copy check FAILED, ${failures} problem(s). These are fixed in the app's /admin editor, not in this repo.`);
    process.exit(1);
  }
  console.log("CMS copy OK.");
}

main().catch((err) => {
  console.error(`\nCMS copy check could not run: ${err?.message ?? err}`);
  process.exit(1);
});
