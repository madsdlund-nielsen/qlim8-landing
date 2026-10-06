// The file guards in `npm run lint` fail on what they exist to catch, and on
// having nothing to read: a guard that scans zero files passes anything, which
// is how a moved directory or a wrong root would quietly turn it green.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPTS = fileURLToPath(new URL("..", import.meta.url));

/** Run a guard against a throwaway tree holding `files` (path → content). */
function run(script, files) {
  const root = mkdtempSync(join(tmpdir(), "guard-"));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  const res = spawnSync(process.execPath, [join(SCRIPTS, script)], {
    env: { ...process.env, CHECK_ROOT: root },
    encoding: "utf8",
  });
  return { status: res.status, out: res.stdout + res.stderr };
}

const WORKFLOW = 'name: "CI"\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: "true"\n';

test("check-dashes fails on an empty tree", () => {
  const r = run("check-dashes.mjs", {});
  assert.equal(r.status, 1);
  assert.match(r.out, /0 filer fundet/);
});

test("check-dashes passes clean copy and a range, fails an em-dash", () => {
  assert.equal(run("check-dashes.mjs", { "src/content/a.ts": 'export const a = "9:00–17:00, Mandag–fredag";\n' }).status, 0);
  assert.equal(run("check-dashes.mjs", { "src/content/a.ts": 'export const a = "qlim8 — klimaregnskab";\n' }).status, 1);
});

test("check-dashes reads src/lib, where the .md twins and price lines are written", () => {
  // A clean file elsewhere, so the tree is not empty and only the src/lib hit can fail it.
  const r = run("check-dashes.mjs", {
    "src/content/a.ts": 'export const a = "klimaregnskab";\n',
    "src/lib/markdown.ts": 'export const a = "qlim8 — klimaregnskab";\n',
  });
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /src\/lib\/markdown\.ts:1/);
});

test("check-sales-led fails on an empty tree, passes clean copy, fails a trial", () => {
  const empty = run("check-sales-led.mjs", {});
  assert.equal(empty.status, 1);
  assert.match(empty.out, /0 filer fundet/);
  assert.equal(run("check-sales-led.mjs", { "src/content/a.ts": 'export const a = "Kom gratis i gang";\n' }).status, 0);
  assert.equal(run("check-sales-led.mjs", { "src/content/a.ts": 'export const a = "14 dages prøveperiode";\n' }).status, 1);
});

test("check-workflows fails with no directory and with no workflow in it", () => {
  const missing = run("check-workflows.mjs", {});
  assert.equal(missing.status, 1);
  assert.match(missing.out, /findes ikke/);
  const none = run("check-workflows.mjs", { ".github/workflows/README.md": "notes\n" });
  assert.equal(none.status, 1);
  assert.match(none.out, /ingen \.yml/);
});

test("check-workflows passes a workflow, fails one with no trigger, no jobs or empty jobs", () => {
  assert.equal(run("check-workflows.mjs", { ".github/workflows/ci.yml": WORKFLOW }).status, 0);
  for (const [body, problem] of [
    ['name: "CI"\njobs:\n  t:\n    runs-on: x\n', /mangler `on:`/],
    ['name: "CI"\non: push\n', /mangler `jobs:`/],
    ['name: "CI"\non: push\njobs: {}\n', /mangler `jobs:`/],
  ]) {
    const r = run("check-workflows.mjs", { ".github/workflows/ci.yml": body });
    assert.equal(r.status, 1, r.out);
    assert.match(r.out, problem);
  }
});

test("check-workflows fails the unquoted colon that broke a workflow on 2026-08-03", () => {
  const broken = "name: Prod: diagnose landing host\non: push\njobs:\n  t:\n    runs-on: x\n";
  const r = run("check-workflows.mjs", { ".github/workflows/ci.yml": WORKFLOW, ".github/workflows/diag.yml": broken });
  assert.equal(r.status, 1);
  assert.match(r.out, /diag\.yml/);
});
