#!/usr/bin/env node
/**
 * Fails the build if an em-dash (U+2014) or a stray en-dash (U+2013) has crept
 * into visitor-facing copy.
 *
 * Why a standalone script rather than an ESLint rule: the copy that reaches a
 * reader is not only string literals. It is also JSX text, Markdown, and the
 * section banners in comments that authors copy when they add a new block. A
 * rule bound to the AST would cover the first two and miss the rest, so this
 * bans the character outright inside COVERED — a check with no false negatives
 * beats one with a clever scope.
 *
 * The en-dash is only wrong when it is doing an em-dash's job. Between two
 * numbers or two weekdays it is the correct Danish range sign, so RANGE_OK
 * exempts exactly that shape and nothing else.
 *
 * Run directly (`node scripts/check-dashes.mjs`) or via `npm run lint`.
 */
import { readFileSync, statSync, readdirSync, existsSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Paths whose text a site visitor can end up reading. */
const COVERED = [
  "src/content",
  "src/page-components",
  "src/components",
  "src/index.css",
  "app",
];

/**
 * src/lib/i18n.tsx is a dead 8-language translation table: I18nProvider is
 * mounted but nothing calls t() or useI18n(). It is excluded rather than
 * cleaned so this check never becomes the reason someone keeps it alive.
 */
const EXCLUDED = ["src/lib/i18n.tsx"];

const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".mdx", ".css", ".html"]);

const EM_DASH = "—";
const EN_DASH = "–";

/** `9:00–17:00`, `2024–2026`, `Mandag–fredag`: a range, and correct Danish. */
const RANGE_OK = /(?:\d|\p{L})–(?:\d|\p{L})/u;

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

const files = COVERED.flatMap((p) => walk(join(ROOT, p))).filter((f) => {
  const rel = relative(ROOT, f);
  return !EXCLUDED.includes(rel);
});

const findings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (let col = 0; col < line.length; col++) {
        const ch = line[col];
        if (ch !== EM_DASH && ch !== EN_DASH) continue;
        // An en-dash sitting between two word/number characters is a range.
        if (ch === EN_DASH && RANGE_OK.test(line.slice(Math.max(0, col - 1), col + 2))) continue;
        findings.push({
          rel,
          line: i + 1,
          col: col + 1,
          char: ch === EM_DASH ? "em-dash" : "en-dash",
          text: line.trim().slice(0, 120),
        });
      }
    });
}

if (findings.length === 0) {
  console.log(`✓ check-dashes: ingen em-dash i ${files.length} filer under ${COVERED.join(", ")}`);
  process.exit(0);
}

console.error(`✗ check-dashes: ${findings.length} fund i visitor-facing copy.\n`);
for (const f of findings) {
  console.error(`  ${f.rel}:${f.line}:${f.col}  ${f.char}`);
  console.error(`    ${f.text}`);
}
console.error(`
Brug det tegn dansk grammatik kræver i stedet:
  ", "  forklarende tilføjelse, modstilling, foran ledsætning
  ": "  overskrift eller punktliste af formen "Label — uddybning"
  ". "  hvor komma ville være kommasplejsning
  "-"   sammensætninger; "–" kun mellem tal eller ord i et interval
`);
process.exit(1);
