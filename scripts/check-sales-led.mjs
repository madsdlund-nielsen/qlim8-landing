#!/usr/bin/env node
/**
 * Fails the build if the bundled copy lets a visitor sign up or pay by
 * themselves, or names a package price.
 *
 * qlim8 is sold after a demo. The ways in are the demo booking, the contact
 * form, the phone number and the newsletter (src/content/cta.ts), and no
 * package price is published anywhere. The change touched some fifty files of
 * copy, so a stray "Opret gratis konto" or "fra 300 kr/md" is the likely way
 * it comes undone; this is the guard against that. The rules themselves live
 * in scripts/lib/salesLed.mjs, shared with the live CMS check.
 *
 * Existing customers still log in (app.qlim8.com/auth without ?tab=register),
 * and that is not flagged.
 *
 * Run directly (`node scripts/check-sales-led.mjs`) or via `npm run lint`.
 */
import { readFileSync, statSync, readdirSync, existsSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";
import { salesLedViolations } from "./lib/salesLed.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Paths whose text a visitor, a crawler or an AI agent can end up reading. */
const COVERED = ["src/content", "src/page-components", "src/components", "src/lib", "app"];

/**
 * Tests exercise the merge with made-up copy. The legal documents are exempt
 * on purpose: the terms still provide for a trial the supplier *may* offer
 * (§3.3), which gives a visitor no way in by themselves, and wording in a
 * contract is changed deliberately, with whoever drafted it, not to satisfy a
 * lint rule. The CMS check skips the same page keys.
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
      for (const { kind, match } of salesLedViolations(line)) {
        console.error(`  ✗ ${rel}:${i + 1}: ${kind}: "${match}"`);
        failures++;
      }
    });
  }
}

if (failures > 0) {
  console.error(
    `✗ check-sales-led: ${failures} sted(er) lader en besøgende oprette sig/betale selv eller nævner en pakkepris. ` +
      `qlim8 sælges efter en demo; brug DEMO_CTA/PHONE_CTA fra src/content/cta.ts og skriv uden pris.`,
  );
  process.exit(1);
}
console.log(`✓ check-sales-led: ingen selvbetjening eller pakkepriser i ${scanned} filer`);
