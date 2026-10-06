// The static pages this site serves, read from app/ rather than kept by hand.
//
// check-cms-copy.mjs and check-schema.mjs both test links and breadcrumbs
// against a route list. Each kept its own copy, and both lacked
// /databehandleraftale, a real page (app/databehandleraftale/page.tsx, linked
// from the footer and in the sitemap): a CMS link to it would have been
// reported as dead. A page added to app/ is now a route here the same day.
//
// Dynamic segments ([slug], [...slug]) are left out: the callers add those
// routes from the content they are built from. Route groups, "(name)", do not
// appear in a URL and are dropped.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));

/** Every app/**\/page.tsx without a dynamic segment, as a URL path. */
export function pageRoutes(root = ROOT) {
  const out = [];
  const walk = (dir, segments) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (e.name.includes("[")) continue;
        walk(join(dir, e.name), /^\(.*\)$/.test(e.name) ? segments : [...segments, e.name]);
      } else if (e.name === "page.tsx") {
        out.push("/" + segments.join("/"));
      }
    }
  };
  walk(join(root, "app"), []);
  return out.sort();
}
