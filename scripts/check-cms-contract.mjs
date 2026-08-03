#!/usr/bin/env node
/**
 * Contract check for the qlim8-app public CMS API.
 *
 * Why this exists, and why a passing `next build` is not enough:
 *
 * src/lib/cms.ts is deliberately fail-soft: every fetch falls back to bundled
 * defaults so a CMS outage degrades the marketing site instead of breaking it.
 * That is the right runtime behaviour, but it means the build succeeds whether
 * or not the CMS contract still holds. Rename a route in qlim8-app and this
 * site keeps building, keeps deploying, and quietly serves stale copy.
 *
 * Worse, the app answers an unknown `/api/public/cms/*` path with HTTP 200 and
 * the SPA's HTML shell rather than a 404, so a status-only check would pass
 * too. Every assertion below therefore checks content-type and payload shape,
 * not just the status code.
 *
 * This is also why the check runs on a schedule rather than only on pull
 * requests: qlim8-app can break this contract with no commit in this repo, so
 * a PR-triggered gate would never fire for the most likely failure.
 *
 * Usage:
 *   node scripts/check-cms-contract.mjs
 *   CMS_API_BASE=https://staging.example.com node scripts/check-cms-contract.mjs
 *
 * Exit 0 = contract holds. Exit 1 = it does not.
 */

const BASE = process.env.CMS_API_BASE || process.env.NEXT_PUBLIC_API_URL || "https://app.qlim8.com";
const TIMEOUT_MS = Number(process.env.CMS_CONTRACT_TIMEOUT_MS || 20000);

let failures = 0;
const fail = (msg) => {
  console.error(`  ✗ ${msg}`);
  failures++;
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

/** GET a path and assert it is a JSON response, returning the parsed body. */
async function getJson(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    fail(`${path} → HTTP ${res.status} (expected 200)`);
    return null;
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    // The specific failure this whole script exists to catch.
    fail(
      `${path} → HTTP 200 but content-type is "${contentType || "none"}", not JSON. ` +
        `This is what a moved/renamed endpoint looks like: the app serves its SPA ` +
        `shell for unknown /api paths, so the status code alone looks healthy.`,
    );
    return null;
  }

  try {
    return await res.json();
  } catch (err) {
    fail(`${path} → body is not parseable JSON: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log(`CMS contract check against ${BASE}\n`);

  // ── 1. Article list ────────────────────────────────────────────────────────
  console.log("GET /api/public/cms/articles");
  const articles = await getJson("/api/public/cms/articles?language=da");
  let sampleSlug = null;

  if (articles !== null) {
    if (!Array.isArray(articles)) {
      fail(`expected an array, got ${typeof articles}`);
    } else {
      pass(`returned an array (${articles.length} article(s))`);
      // An empty list is legitimate (nothing published), so only shape-check
      // when there is something to check.
      if (articles.length > 0) {
        const a = articles[0];
        for (const field of ["slug", "title", "description", "publishedAt"]) {
          if (typeof a?.[field] !== "string") {
            fail(`article[0].${field} is ${typeof a?.[field]}, expected string`);
          }
        }
        if (typeof a?.slug === "string") {
          sampleSlug = a.slug;
          pass(`article shape matches CmsArticleSummary (sample slug: "${sampleSlug}")`);
        }
      } else {
        console.log("  - list is empty; skipping item shape check");
      }
    }
  }

  // ── 2. Single article ──────────────────────────────────────────────────────
  if (sampleSlug) {
    const path = `/api/public/cms/articles/${encodeURIComponent(sampleSlug)}?language=da`;
    console.log(`\nGET /api/public/cms/articles/{slug}`);
    const article = await getJson(path);
    if (article !== null) {
      if (typeof article?.slug !== "string") {
        fail(`article.slug is ${typeof article?.slug}, expected string`);
      } else if (!Array.isArray(article?.sections)) {
        // `sections` is what distinguishes the detail payload from the summary;
        // losing it would render blank article bodies.
        fail(`article.sections is ${typeof article?.sections}, expected array`);
      } else {
        pass(`detail payload has slug + sections (${article.sections.length} section(s))`);
      }
    }
  } else {
    console.log("\n- no published article available; skipping detail check");
  }

  // ── 3. Marketing copy ──────────────────────────────────────────────────────
  console.log(`\nGET /api/public/cms/marketing/{pageKey}`);
  const copy = await getJson("/api/public/cms/marketing/home?language=da");
  if (copy !== null) {
    // `copy` may legitimately be empty ({}), meaning nothing is published for
    // this page and the site uses its bundled defaults. What must hold is that
    // the envelope exists and is an object: src/lib/cms.ts reads `data.copy`.
    if (typeof copy !== "object" || copy === null || Array.isArray(copy)) {
      fail(`expected an object envelope, got ${Array.isArray(copy) ? "array" : typeof copy}`);
    } else if (!("copy" in copy)) {
      fail(`response is missing the "copy" key that fetchMarketingCopy reads`);
    } else if (typeof copy.copy !== "object" || copy.copy === null) {
      fail(`"copy" is ${typeof copy.copy}, expected an object`);
    } else {
      const n = Object.keys(copy.copy).length;
      pass(`envelope has a "copy" object (${n} key(s)${n === 0 ? ", nothing published, defaults apply" : ""})`);
    }
  }

  console.log("");
  if (failures > 0) {
    console.error(`CMS contract FAILED, ${failures} problem(s).`);
    console.error(
      `The marketing site will keep building and deploying regardless; it will ` +
        `just silently serve bundled defaults for the affected content.`,
    );
    process.exit(1);
  }
  console.log("CMS contract OK.");
}

main().catch((err) => {
  console.error(`\nCMS contract check could not run: ${err?.message ?? err}`);
  process.exit(1);
});
