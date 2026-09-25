#!/usr/bin/env node
/**
 * Writes src/generated/content-dates.json: for every indexable route, the
 * commit date of the last change to the files that hold that page's content.
 * app/sitemap.ts reads it for <lastmod>, and the /docs TechArticle schema for
 * dateModified.
 *
 * Why: the sitemap used to carry one hand-bumped constant for ~60 URLs, so
 * every static page reported the same lastmod, and nobody bumped it. A
 * crawler reads "everything changed on the same day" (or "nothing has changed
 * in months") as noise and stops trusting the field. `new Date()` at build
 * time is the same problem in the other direction. A per-route git date is
 * what actually happened.
 *
 * What counts as content: the route's page file, its page component, and the
 * copy file(s) it renders. Shared chrome (layout, header, footer), the shared
 * marketing template, and the generic FAQ appended to every marketing page
 * are deliberately excluded: a header tweak is not a reason to tell Google
 * that 60 pages changed.
 *
 * Granularity is per file. A marketing copy file holds several pages, so an
 * edit to one page's copy moves the date of its file-mates too. That is a
 * small overstatement in the honest direction and far better than one date
 * for all.
 *
 * Runs in CI before `next build` (fetch-depth: 0 so the log is complete) and
 * as `pretest`/`prebuild`. Without a usable git history (the Docker build
 * context has no .git) it leaves the committed file alone, which is the
 * baseline CI last wrote.
 *
 * Usage: node --experimental-strip-types scripts/content-dates.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { ROOT } from "./lib/register-ts.mjs";

const OUT = fileURLToPath(new URL("src/generated/content-dates.json", ROOT));
const rootDir = fileURLToPath(ROOT);

/** Static routes and the files whose history dates them. */
const STATIC_ROUTES = {
  "/": ["app/page.tsx", "src/page-components/landing.tsx", "src/content/copy/home.ts", "src/content/homepage-faqs.ts", "src/content/integration-logos.ts"],
  "/priser": ["app/priser/page.tsx", "src/page-components/pricing.tsx", "src/content/copy/pricing.ts"],
  "/metodologi": ["app/metodologi/page.tsx", "src/page-components/metodologi.tsx", "src/content/copy/methodology.ts"],
  "/blog": ["app/blog/page.tsx", "src/page-components/viden.tsx"],
  "/api": ["app/api/page.tsx"],
  "/om-os": ["app/om-os/page.tsx", "src/page-components/about.tsx", "src/content/copy/about.ts"],
  "/docs": ["app/docs/page.tsx"],
  "/docs/mcp-quickstart": ["app/docs/mcp-quickstart/page.tsx"],
  "/docs/mcp-tools": ["app/docs/mcp-tools/page.tsx"],
  "/docs/api-reference": ["app/docs/api-reference/page.tsx"],
  "/kontakt": ["app/kontakt/page.tsx", "src/page-components/kontakt.tsx", "src/content/copy/contact.ts"],
  "/nyhedsbrev": ["app/nyhedsbrev/page.tsx", "src/page-components/nyhedsbrev.tsx"],
  "/karriere": ["app/karriere/page.tsx", "src/page-components/karriere.tsx", "src/content/copy/careers.ts"],
  "/cookies": ["app/cookies/page.tsx", "src/page-components/cookies.tsx", "src/content/copy/legal.ts"],
  "/privatlivspolitik": ["app/privatlivspolitik/page.tsx", "src/page-components/privatlivspolitik.tsx", "src/content/copy/legal.ts"],
  "/handelsbetingelser": ["app/handelsbetingelser/page.tsx", "src/page-components/handelsbetingelser.tsx", "src/content/copy/legal.ts"],
};

function gitAvailable() {
  try {
    execFileSync("git", ["rev-parse", "--is-inside-work-tree"], { cwd: rootDir, stdio: "pipe" });
    // A shallow clone has history for HEAD only; every file would date to the
    // same commit, which is exactly the signal this script exists to avoid.
    const shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: rootDir, stdio: "pipe" })
      .toString().trim();
    return shallow !== "true";
  } catch {
    return false;
  }
}

function lastCommitDate(files) {
  const present = files.filter((f) => existsSync(fileURLToPath(new URL(f, ROOT))));
  if (present.length === 0) return null;
  const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...present], { cwd: rootDir, stdio: "pipe" })
    .toString().trim();
  return out || null;
}

/** Which copy file defines a marketing node's bundled copy (by its hero title). */
function copyFileFor(node, copyFiles) {
  const needle = JSON.stringify(node.defaults.hero.title);
  for (const [file, text] of copyFiles) if (text.includes(needle)) return file;
  return null;
}

async function main() {
  if (!gitAvailable()) {
    console.log("content-dates: no full git history here (Docker or shallow clone); keeping the committed file.");
    return;
  }

  const { MARKETING_HUBS, ALL_MARKETING_NODES } = await import("../src/content/marketing/index.ts");
  const { articles } = await import("../src/content/articles.ts");

  const copyDir = "src/content/marketing/copy/";
  const copyFiles = execFileSync("git", ["ls-files", copyDir], { cwd: rootDir, stdio: "pipe" })
    .toString().trim().split("\n").filter(Boolean)
    .map((f) => [f, readFileSync(fileURLToPath(new URL(f, ROOT)), "utf8")]);

  const dates = {};
  const missing = [];
  const put = (route, files) => {
    const d = lastCommitDate(files);
    if (d) dates[route] = d;
    else missing.push(route);
  };

  for (const [route, files] of Object.entries(STATIC_ROUTES)) put(route, files);

  for (const a of articles) put(`/blog/${a.slug}`, [`src/content/${a.slug}.ts`]);

  for (const hub of MARKETING_HUBS) {
    const hubCopy = copyFileFor({ defaults: hub.defaults }, copyFiles);
    put(hub.route, [
      `app${hub.route}/page.tsx`,
      `src/content/marketing/${hub.collection}.ts`,
      ...(hubCopy ? [hubCopy] : []),
    ]);
  }

  for (const node of ALL_MARKETING_NODES) {
    const copy = copyFileFor(node, copyFiles);
    put(`/${node.collection}/${node.slug}`, [
      `src/content/marketing/${node.collection}.ts`,
      ...(copy ? [copy] : copyFiles.map(([f]) => f).filter((f) => f.includes(`/${node.collection}-`))),
    ]);
  }

  if (missing.length) {
    console.error(`content-dates: no git history for ${missing.join(", ")}`);
    process.exit(1);
  }

  const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)));
  const json = JSON.stringify(sorted, null, 2) + "\n";
  const before = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (before !== json) writeFileSync(OUT, json);

  const distinct = new Set(Object.values(sorted).map((d) => d.slice(0, 10))).size;
  console.log(
    `content-dates: ${Object.keys(sorted).length} routes, ${distinct} distinct days` +
      (before === json ? " (unchanged)" : ` → ${OUT.replace(rootDir, "")}`),
  );
}

main().catch((err) => {
  console.error(`content-dates failed: ${err?.stack ?? err}`);
  process.exit(1);
});
