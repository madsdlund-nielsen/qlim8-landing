// scripts/lib/routes.mjs reads the static pages from app/.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pageRoutes } from "./routes.mjs";

test("the real app/ yields the pages the hand-kept lists had, and /databehandleraftale", () => {
  const routes = pageRoutes();
  for (const r of [
    "/", "/priser", "/metodologi", "/blog", "/api", "/om-os", "/docs", "/docs/mcp-quickstart",
    "/docs/mcp-tools", "/docs/api-reference", "/kontakt", "/nyhedsbrev", "/nyhedsbrev/afmeld",
    "/karriere", "/cookies", "/privatlivspolitik", "/handelsbetingelser", "/databehandleraftale",
  ]) {
    assert.ok(routes.includes(r), `${r} missing from ${routes.join(" ")}`);
  }
  assert.ok(!routes.some((r) => r.includes("[")), "a dynamic segment leaked in");
});

test("dynamic segments are skipped and route groups do not reach the URL", () => {
  const root = mkdtempSync(join(tmpdir(), "routes-"));
  for (const dir of ["app", "app/om", "app/blog/[slug]", "app/(marketing)/pris", "app/api/contact"]) {
    mkdirSync(join(root, dir), { recursive: true });
  }
  writeFileSync(join(root, "app/page.tsx"), "");
  writeFileSync(join(root, "app/om/page.tsx"), "");
  writeFileSync(join(root, "app/blog/[slug]/page.tsx"), "");
  writeFileSync(join(root, "app/(marketing)/pris/page.tsx"), "");
  writeFileSync(join(root, "app/api/contact/route.ts"), "");
  assert.deepEqual(pageRoutes(root), ["/", "/om", "/pris"]);
});
