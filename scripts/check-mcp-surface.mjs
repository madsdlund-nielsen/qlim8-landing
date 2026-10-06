#!/usr/bin/env node
/**
 * Holds what this site says about the MCP server to the server itself.
 *
 * The tool count is written into the copy in about thirty places ("32 tools",
 * "alle 32 MCP-tools"), and /.well-known/mcp.json lists the tools by name.
 * Both are hand-kept summaries of the app's catalog (server/mcp/lib/catalog.ts
 * in qlim8-app), and the app changes it with no commit here: October 2026 removed
 * submit_scenario_for_review and added reactivate_webhook and
 * redeliver_webhook_delivery, and the site went on saying 31 and listing the
 * removed tool.
 *
 * So, against the live, unauthenticated discovery document:
 *   - the TOOLS list in app/well-known/mcp.json/route.ts names exactly the
 *     tools the server has, and
 *   - every "N tools" in src/ and app/ says the server's number.
 *
 * CMS-published copy is not read here; a stale count there is fixed in /admin.
 *
 * Usage:
 *   node scripts/check-mcp-surface.mjs
 *   CMS_API_BASE=https://staging.example.com node scripts/check-mcp-surface.mjs
 *
 * Exit 0 = the site matches the server. Exit 1 = it does not.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.CMS_API_BASE || process.env.NEXT_PUBLIC_API_URL || "https://app.qlim8.com";
const TIMEOUT_MS = Number(process.env.CMS_CONTRACT_TIMEOUT_MS || 20000);
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const MANIFEST = join(ROOT, "app/well-known/mcp.json/route.ts");

/** "32 tools", "32 MCP-tools", "32 kuraterede tools": the count as the copy writes it. */
export const COUNT = /\b(\d+) (?:kuraterede )?(?:MCP-)?tools\b/gi;

/** Tool names in the manifest's `const TOOLS = [...]` block. */
export function manifestTools(source) {
  const block = source.match(/^const TOOLS = \[([\s\S]*?)^\];/m);
  if (!block) return null;
  return [...block[1].matchAll(/name: "([a-z0-9_]+)"/g)].map((m) => m[1]);
}

/** Every count the copy states, with where it stands. */
export function statedCounts(files) {
  const out = [];
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const m of line.matchAll(COUNT)) out.push({ file, line: i + 1, n: Number(m[1]), text: m[0] });
    });
  }
  return out;
}

function sources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    if (e.isDirectory()) return e.name === "node_modules" || e.name === "generated" ? [] : sources(full);
    return /\.(ts|tsx|mjs)$/.test(e.name) && !/\.test\./.test(e.name) ? [full] : [];
  });
}

async function main() {
  let failures = 0;
  const fail = (msg) => {
    console.error(`  ✗ ${msg}`);
    failures++;
  };
  const pass = (msg) => console.log(`  ✓ ${msg}`);

  console.log(`GET ${BASE}/api/mcp/schema`);
  const res = await fetch(`${BASE}/api/mcp/schema`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { accept: "application/json" },
  });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.includes("application/json")) {
    console.error(`  ✗ HTTP ${res.status}, content-type "${type}": no discovery document to compare with`);
    process.exit(1);
  }
  const live = (await res.json())?.tools?.map((t) => t.name);
  if (!Array.isArray(live) || live.length === 0) {
    console.error("  ✗ the discovery document has no tools array");
    process.exit(1);
  }
  pass(`the server has ${live.length} tools`);

  console.log("\napp/well-known/mcp.json/route.ts");
  const listed = manifestTools(readFileSync(MANIFEST, "utf8"));
  if (!listed || listed.length === 0) {
    fail("no `const TOOLS = [...]` block with names found; the parse no longer matches the file");
  } else {
    const missing = live.filter((n) => !listed.includes(n));
    const extra = listed.filter((n) => !live.includes(n));
    if (missing.length) fail(`not listed, but on the server: ${missing.join(", ")}`);
    if (extra.length) fail(`listed, but not on the server: ${extra.join(", ")}`);
    if (!missing.length && !extra.length) pass(`TOOLS names the same ${listed.length} tools`);
  }

  console.log("\nTool counts in src/ and app/");
  const counts = statedCounts([...sources(join(ROOT, "src")), ...sources(join(ROOT, "app"))]);
  // A scan that finds nothing would pass anything.
  if (counts.length < 10) fail(`found only ${counts.length} stated counts; the pattern no longer matches the copy`);
  const wrong = counts.filter((c) => c.n !== live.length);
  for (const c of wrong) fail(`${relative(ROOT, c.file)}:${c.line} says "${c.text}"`);
  if (!wrong.length) pass(`all ${counts.length} say ${live.length}`);

  if (failures) {
    console.error(`\n${failures} mismatch(es) with ${BASE}/api/mcp/schema`);
    process.exit(1);
  }
  console.log("\nThe site matches the server.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
