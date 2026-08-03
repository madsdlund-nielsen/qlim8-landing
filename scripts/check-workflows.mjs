#!/usr/bin/env node
/**
 * Fails the build if a file in .github/workflows is not valid YAML, or is
 * missing the keys GitHub needs to schedule it.
 *
 * Why this exists: on 2026-08-03 the em-dash cleanup rewrote
 * `name: Prod — diagnose landing host` to `name: Prod: diagnose landing host`.
 * The second colon makes YAML read `Prod` as a nested mapping key, so GitHub
 * could not parse the file. Every push to main then produced a failing run with
 * zero jobs, and it kept firing even though the workflow's `push` filter named a
 * branch that no longer existed: an unparseable file has no filter to evaluate.
 *
 * Nothing caught it. `npm run lint` is eslint plus check-dashes.mjs, and neither
 * looks at .github. The PR that introduced the break was green, and the failure
 * only showed up on main after the merge, in a workflow unrelated to the change.
 *
 * Scope is deliberately narrow: parse, plus the two keys whose absence makes a
 * workflow silently do nothing. Validating step semantics, action versions and
 * expression syntax is actionlint's job, and this is not an attempt to
 * reimplement it. The point is that a file GitHub cannot read should fail here,
 * on the branch, rather than on main.
 *
 * Run directly (`node scripts/check-workflows.mjs`) or via `npm run lint`.
 */
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WORKFLOW_DIR = join(ROOT, ".github", "workflows");
const EXTENSIONS = new Set([".yml", ".yaml"]);

/**
 * GitHub reads `on` as a plain string key. A YAML 1.1 parser would fold it into
 * the boolean `true` instead, so accept both spellings rather than reporting a
 * missing trigger that GitHub itself would have honoured.
 */
const TRIGGER_KEYS = ["on", "true"];

if (!existsSync(WORKFLOW_DIR)) {
  console.log("✓ check-workflows: ingen .github/workflows, intet at tjekke");
  process.exit(0);
}

const files = readdirSync(WORKFLOW_DIR)
  .sort()
  .filter((entry) => EXTENSIONS.has(extname(entry)))
  .map((entry) => join(WORKFLOW_DIR, entry));

const findings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const source = readFileSync(file, "utf8");

  let doc;
  try {
    doc = yaml.load(source, { filename: rel });
  } catch (err) {
    // js-yaml marks are 0-indexed; editors and GitHub both count from 1.
    const line = err.mark ? err.mark.line + 1 : null;
    const col = err.mark ? err.mark.column + 1 : null;
    findings.push({
      rel,
      where: line ? `${line}:${col}` : "",
      problem: err.reason || err.message,
      text: line ? (source.split("\n")[line - 1] ?? "").trim().slice(0, 120) : "",
    });
    continue;
  }

  if (doc === null || typeof doc !== "object" || Array.isArray(doc)) {
    findings.push({
      rel,
      where: "",
      problem: "filen er ikke et YAML-object, GitHub kan ikke bruge den som workflow",
      text: "",
    });
    continue;
  }

  const keys = Object.keys(doc);
  if (!TRIGGER_KEYS.some((k) => keys.includes(k))) {
    findings.push({ rel, where: "", problem: "mangler `on:`, workflowet vil aldrig blive udløst", text: "" });
  }
  if (!keys.includes("jobs")) {
    findings.push({ rel, where: "", problem: "mangler `jobs:`, der er intet at køre", text: "" });
  }
  if ("name" in doc && typeof doc.name !== "string") {
    // The exact shape of the bug this script was written for: `name:` parsed
    // into something other than a string means the value swallowed a colon.
    findings.push({
      rel,
      where: "",
      problem: `\`name:\` er ikke en streng (${JSON.stringify(doc.name)}), sæt værdien i anførselstegn`,
      text: "",
    });
  }
}

if (findings.length === 0) {
  console.log(`✓ check-workflows: ${files.length} workflow-filer parser og har on: og jobs:`);
  process.exit(0);
}

console.error(`✗ check-workflows: ${findings.length} fund i .github/workflows.\n`);
for (const f of findings) {
  console.error(`  ${f.rel}${f.where ? `:${f.where}` : ""}  ${f.problem}`);
  if (f.text) console.error(`    ${f.text}`);
}
console.error(`
GitHub afviser hele filen ved en parse-fejl. Symptomet er et fejlende run uden
jobs ved hvert push, uanset workflowets triggers, og workflowet vises med sin
sti i stedet for sit navn. Hyppigste årsag er et kolon i en værdi der ikke er sat
i anførselstegn: skriv name: "Label: uddybning".
`);
process.exit(1);
