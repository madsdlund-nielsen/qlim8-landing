#!/usr/bin/env node
/**
 * Fails the build if the bundled copy names a package price, spells out a
 * signup or checkout link, or promises a trial.
 *
 * Package prices come only from the app's packages API (src/lib/packages.ts),
 * and so do the signup URLs; Free is free for good, so there is no trial to
 * offer. A stray "fra 695 kr/md" or "14 dages prøveperiode" in copy is the
 * likely way that comes undone; this is the guard against it. The rules
 * themselves live in scripts/lib/salesLed.mjs, shared with the live CMS check
 * and tested in scripts/lib/salesLed.test.mjs.
 *
 * Existing customers still log in (app.qlim8.com/auth without ?tab=register),
 * and that is not flagged.
 *
 * Run directly (`node scripts/check-sales-led.mjs`) or via `npm run lint`.
 */
import { readFileSync, statSync, readdirSync, existsSync } from "fs";
import { join, extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { salesLedViolations } from "./lib/salesLed.mjs";

/** CHECK_ROOT points the check at another tree; scripts/lib/guards.test.mjs uses it. */
const ROOT = process.env.CHECK_ROOT ? resolve(process.env.CHECK_ROOT) : fileURLToPath(new URL("..", import.meta.url));

/** Paths whose text a visitor, a crawler or an AI agent can end up reading. */
const COVERED = ["src/content", "src/page-components", "src/components", "src/lib", "app"];

/**
 * Tests exercise the merge with made-up copy. The legal documents are exempt
 * on purpose: the terms still provide for a trial the supplier *may* offer
 * (§3.3), and wording in a contract is changed deliberately, with whoever
 * drafted it, not to satisfy a lint rule. The CMS check skips the same page
 * keys.
 */
const EXCLUDED = [/\.test\.tsx?$/, /^src\/generated\//, /^src\/content\/copy\/legal\.ts$/];

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".mdx"]);

function walk(path, out = []) {
  if (!existsSync(path)) return out;
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path)) walk(join(path, entry), out);
  } else if (EXTENSIONS.has(extname(path))) {
    out.push(path);
  }
  return out;
}

let failures = 0;
let scanned = 0;
for (const dir of COVERED) {
  for (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file);
    if (EXCLUDED.some((re) => re.test(rel))) continue;
    scanned++;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const { kind, match } of salesLedViolations(line, { file: rel })) {
        console.error(`  ✗ ${rel}:${i + 1}: ${kind}: "${match}"`);
        failures++;
      }
    });
  }
}

// A check that reads nothing passes anything.
if (scanned === 0) {
  console.error(`✗ check-sales-led: 0 filer fundet under ${COVERED.join(", ")} i ${ROOT}`);
  process.exit(1);
}

if (failures > 0) {
  console.error(
    `✗ check-sales-led: ${failures} sted(er) nævner en pakkepris, et signup- eller checkout-link eller en prøveperiode. ` +
      `Priser og signup-links kommer kun fra pakke-API'et (src/lib/packages.ts); CTA'er fra src/content/cta.ts.`,
  );
  process.exit(1);
}
console.log(`✓ check-sales-led: ingen pakkepriser, signup-links eller prøveperioder i ${scanned} filer`);
