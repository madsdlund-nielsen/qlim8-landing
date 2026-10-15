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
 *
 * The second is now stricter. A package price on this site comes only from
 * the app's packages API, so a price written into published copy is wrong
 * whatever the figure: it goes stale the day the catalog changes.
 *
 * So, for every CMS page key this site reads:
 *   - every internal path in the copy must be a route this site serves. A path
 *     that is a redirect source (next.config.ts, redirects.json) still works,
 *     one hop later, so it is a warning ("link via redirect"), not a dead link;
 *     and
 *   - no string may break the sales-led rules in scripts/lib/salesLed.mjs
 *     (a package price, a hard-coded signup or checkout link, a trial).
 *     The same rules hold the bundled copy in `npm run lint`. The legal
 *     documents are exempt there and here: contract wording is changed with
 *     whoever drafted it.
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
import { salesLedViolations } from "./lib/salesLed.mjs";
import { pageRoutes } from "./lib/routes.mjs";
import { dashFindings } from "./lib/dashes.mjs";

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


async function main() {
  console.log(`CMS copy check against ${BASE}\n`);

  const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../src/content/marketing/index.ts");
  const { articles } = await import("../src/content/articles.ts");
  const { PRICING_PAGE_KEY } = await import("../src/content/copy/pricing.ts");
  const { HOME_PAGE_KEY } = await import("../src/content/copy/home.ts");
  const { ABOUT_PAGE_KEY } = await import("../src/content/copy/about.ts");
  const { CONTACT_PAGE_KEY } = await import("../src/content/copy/contact.ts");
  const { CAREERS_PAGE_KEY } = await import("../src/content/copy/careers.ts");
  const { METHODOLOGY_PAGE_KEY } = await import("../src/content/copy/methodology.ts");
  const { LEGAL_COOKIES_PAGE_KEY, LEGAL_PRIVACY_PAGE_KEY, LEGAL_TERMS_PAGE_KEY, LEGAL_DPA_PAGE_KEY } = await import("../src/content/copy/legal.ts");

  // ── Routes this site serves ────────────────────────────────────────────────
  const routes = new Set([
    ...pageRoutes(),
    "/llms.txt", "/llms-full.txt", "/sitemap.xml", "/robots.txt",
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

  // ── Redirect sources ───────────────────────────────────────────────────────
  // Read from next.config.ts, the one place they are set (the merged industry
  // and product pages come from src/content/marketing/redirects.json). A link
  // to one still works, one hop later, so it is a warning to update, not a
  // dead link. A source with a parameter ("/viden/:slug*") matches by prefix.
  const nextConfig = (await import("../next.config.ts")).default;
  const redirectRules = await nextConfig.redirects();
  const redirectSources = new Set(redirectRules.map((r) => r.source).filter((x) => !x.includes(":")));
  const redirectPrefixes = redirectRules.map((r) => r.source).filter((x) => x.includes(":")).map((x) => x.slice(0, x.indexOf(":")));
  const viaRedirect = (p) => redirectSources.has(p) || redirectPrefixes.some((pre) => p.startsWith(pre));
  const redirectTarget = (p) => redirectRules.find((r) => r.source === p)?.destination;

  const LEGAL_KEYS = new Set([LEGAL_COOKIES_PAGE_KEY, LEGAL_PRIVACY_PAGE_KEY, LEGAL_TERMS_PAGE_KEY, LEGAL_DPA_PAGE_KEY]);

  // ── Page keys the site reads (see app/**/page.tsx and app/sitemap.ts) ─────
  const pageKeys = [
    HOME_PAGE_KEY, "homepage.faqs", "landing.images",
    PRICING_PAGE_KEY, METHODOLOGY_PAGE_KEY, ABOUT_PAGE_KEY, "about.images",
    CONTACT_PAGE_KEY, CAREERS_PAGE_KEY,
    LEGAL_COOKIES_PAGE_KEY, LEGAL_PRIVACY_PAGE_KEY, LEGAL_TERMS_PAGE_KEY, LEGAL_DPA_PAGE_KEY,
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
  const warned = new Set();
  const warn = (problem, key, where) => {
    if (warned.has(problem)) return;
    warned.add(problem);
    console.warn(`  ! ${key} · ${where}: ${problem}`);
  };
  /** A path in published copy: a route is fine, a redirect source is a warning, anything else is dead. */
  const checkPath = (p, key, where) => {
    if (isRoute(p)) return;
    if (viaRedirect(p)) {
      const to = redirectTarget(p);
      warn(`link via redirect: ${p}${to ? ` (now ${to})` : ""}, link to the new address`, key, where);
      return;
    }
    report(`links to ${p}, which is not a route on qlim8.com`, key, where);
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
      for (const p of internalPaths(text)) checkPath(p, key, where);
      for (const { char } of dashFindings(text)) report(`${char} in published copy`, key, where);
      if (LEGAL_KEYS.has(key)) continue;
      for (const { kind, match } of salesLedViolations(text)) {
        report(`${kind}: "${match}" (qlim8 is sold after a demo and names no package price)`, key, where);
      }
    }
  }

  // Article bodies: CTA hrefs and richtext links
  for (const a of published) {
    try {
      const art = await getJson(`/api/public/cms/articles/${encodeURIComponent(a.slug)}?language=da`);
      for (const [where, text] of strings(art?.sections ?? [])) {
        checkedStrings++;
        for (const p of internalPaths(text)) checkPath(p, `article ${a.slug}`, where);
        for (const { char } of dashFindings(text)) report(`${char} in published copy`, `article ${a.slug}`, where);
        for (const { kind, match } of salesLedViolations(text)) {
          report(`${kind}: "${match}" (qlim8 is sold after a demo and names no package price)`, `article ${a.slug}`, where);
        }
      }
    } catch (err) {
      fail(`article ${a.slug}: ${err.message}`);
    }
  }

  // Reading nothing passes every rule above: an API answering {copy:{}} for
  // every key, or a listing that comes back empty, would look like clean copy.
  if (publishedKeys === 0 || checkedStrings === 0) {
    fail(`read ${publishedKeys} published page key(s) and ${checkedStrings} strings: nothing was checked`);
  } else {
    pass(`${publishedKeys} published page key(s), ${published.length} article(s), ${checkedStrings} strings checked`);
  }

  console.log("");
  if (warned.size > 0) console.warn(`${warned.size} link(s) go through a redirect (warnings, not failures).\n`);
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
