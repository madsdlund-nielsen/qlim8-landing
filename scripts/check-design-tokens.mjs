#!/usr/bin/env node
/**
 * Fails the build when a raw palette class, white or black, a hex colour in a
 * className or rounded-2xl/3xl has crept back into src/ or app/. The colours,
 * radii and edges of this site are the design tokens in src/index.css
 * (design-system/tokens.json); the rule is scripts/lib/designTokens.mjs and
 * its cases are tested in scripts/lib/designTokens.test.mjs and guards.test.mjs.
 *
 * Justified exceptions go in scripts/design-tokens-allowlist.json, one entry
 * per place, each with the reason it is allowed:
 *   { "file": "src/components/Foo.tsx", "match": "bg-[#2b303b]", "reason": "..." }
 * An entry allows that exact text on lines of that file. An entry with no
 * reason, a file that does not exist, or text that no longer occurs fails the
 * check, so the list cannot go stale and stays small.
 *
 * Run directly (`node scripts/check-design-tokens.mjs`) or via `npm run lint`.
 * CHECK_ROOT points it at another tree (scripts/lib/guards.test.mjs uses it).
 */
import { readFileSync, statSync, readdirSync, existsSync } from "fs";
import { join, extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { tokenFindings, WHY } from "./lib/designTokens.mjs";

const ROOT = process.env.CHECK_ROOT ? resolve(process.env.CHECK_ROOT) : fileURLToPath(new URL("..", import.meta.url));
const COVERED = ["src", "app"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);
const ALLOWLIST = "scripts/design-tokens-allowlist.json";

function walk(path, out = []) {
  if (!existsSync(path)) return out;
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path).sort()) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
      walk(join(path, entry), out);
    }
  } else if (EXTENSIONS.has(extname(path))) {
    out.push(path);
  }
  return out;
}

const files = COVERED.flatMap((p) => walk(join(ROOT, p)));
// A check that reads nothing passes anything: a moved directory or a wrong
// ROOT would otherwise turn it green.
if (files.length === 0) {
  console.error(`✗ check-design-tokens: 0 filer fundet under ${COVERED.join(", ")} i ${ROOT}`);
  process.exit(1);
}

const problems = [];
let allow = [];
const allowPath = join(ROOT, ALLOWLIST);
if (existsSync(allowPath)) {
  try {
    allow = JSON.parse(readFileSync(allowPath, "utf8")).allow ?? [];
  } catch (e) {
    problems.push(`${ALLOWLIST}: kan ikke læses som JSON (${e.message})`);
  }
}
const used = new Set();
allow.forEach((entry, i) => {
  if (!entry.file || !entry.match || !String(entry.reason ?? "").trim()) {
    problems.push(`${ALLOWLIST}: post ${i + 1} mangler file, match eller reason`);
  } else if (!existsSync(join(ROOT, entry.file))) {
    problems.push(`${ALLOWLIST}: ${entry.file} findes ikke`);
  }
});

const findings = [];
for (const file of files) {
  const rel = relative(ROOT, file);
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (const f of tokenFindings(line)) {
        const idx = allow.findIndex((a) => a.file === rel && a.match === f.match && line.includes(a.match));
        if (idx >= 0) {
          used.add(idx);
          continue;
        }
        findings.push({ rel, line: i + 1, col: f.col + 1, ...f, text: line.trim().slice(0, 120) });
      }
    });
}
allow.forEach((entry, i) => {
  if (entry.file && entry.match && existsSync(join(ROOT, entry.file)) && !used.has(i)) {
    problems.push(`${ALLOWLIST}: "${entry.match}" i ${entry.file} forekommer ikke længere, fjern posten`);
  }
});

if (findings.length === 0 && problems.length === 0) {
  console.log(`✓ check-design-tokens: kun tokens i ${files.length} filer under ${COVERED.join(", ")} (${allow.length} undtagelser)`);
  process.exit(0);
}

if (findings.length > 0) {
  console.error(`✗ check-design-tokens: ${findings.length} fund uden for tokens.\n`);
  for (const f of findings) {
    console.error(`  ${f.rel}:${f.line}:${f.col}  ${f.match}  (${f.rule})`);
    console.error(`    ${f.text}`);
  }
  console.error(`\n${[...new Set(findings.map((f) => f.rule))].map((r) => `  ${r}: ${WHY[r]}`).join("\n")}`);
  console.error(`\nNavneoversættelsen står i CLAUDE.md under "The palette". En begrundet undtagelse hører til i ${ALLOWLIST}.`);
}
for (const p of problems) console.error(`✗ ${p}`);
process.exit(1);
