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

test("check-design-tokens fails on an empty tree and passes the tokens", () => {
  const empty = run("check-design-tokens.mjs", {});
  assert.equal(empty.status, 1);
  assert.match(empty.out, /0 filer fundet/);
  const ok = run("check-design-tokens.mjs", { "src/a.tsx": 'export const A = () => <p className="text-foreground bg-card rounded-lg border-border-strong" />;\n' });
  assert.equal(ok.status, 0, ok.out);
});

test("check-design-tokens fails gray, white, a hex in a className and rounded-2xl, in src and in app", () => {
  const bad = {
    "src/a.tsx": 'export const A = () => <p className="text-gray-900" />;\n',
    "app/b.tsx": 'export const B = () => <p className="bg-white rounded-2xl" />;\n',
    "app/c.tsx": 'export const C = () => <p className="p-2 text-[#123456]" style={{ color: "#fff" }} />;\n',
  };
  const r = run("check-design-tokens.mjs", bad);
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /src\/a\.tsx:1.*text-gray-900/);
  assert.match(r.out, /app\/b\.tsx:1.*bg-white/);
  assert.match(r.out, /app\/b\.tsx:1.*rounded-2xl/);
  assert.match(r.out, /app\/c\.tsx:1.*text-\[#/);
  for (const [path, content] of Object.entries(bad)) {
    assert.equal(run("check-design-tokens.mjs", { "src/ok.tsx": "export const O = 1;\n", [path]: content }).status, 1, path);
  }
});

test("check-design-tokens: an allow-list entry lets that text through, and goes stale loudly", () => {
  const file = { "src/logo.tsx": 'export const L = () => <i className="text-gray-900" />;\n' };
  const entry = { file: "src/logo.tsx", match: "text-gray-900", reason: "brand ink" };
  const allowed = run("check-design-tokens.mjs", { ...file, "scripts/design-tokens-allowlist.json": JSON.stringify({ allow: [entry] }) });
  assert.equal(allowed.status, 0, allowed.out);
  // The same entry for text that is not in the file: stale.
  const stale = run("check-design-tokens.mjs", { "src/logo.tsx": "export const L = 1;\n", "scripts/design-tokens-allowlist.json": JSON.stringify({ allow: [entry] }) });
  assert.equal(stale.status, 1);
  assert.match(stale.out, /forekommer ikke længere/);
  // No reason, or a file that does not exist.
  const noReason = run("check-design-tokens.mjs", { ...file, "scripts/design-tokens-allowlist.json": JSON.stringify({ allow: [{ ...entry, reason: "" }] }) });
  assert.equal(noReason.status, 1);
  assert.match(noReason.out, /mangler/);
  const missing = run("check-design-tokens.mjs", { ...file, "scripts/design-tokens-allowlist.json": JSON.stringify({ allow: [{ ...entry, file: "src/gone.tsx" }] }) });
  assert.equal(missing.status, 1);
  assert.match(missing.out, /findes ikke/);
  // An allow-list entry does not cover other text in the same file.
  const other = run("check-design-tokens.mjs", { "src/logo.tsx": 'export const L = () => <i className="text-gray-900 bg-white" />;\n', "scripts/design-tokens-allowlist.json": JSON.stringify({ allow: [entry] }) });
  assert.equal(other.status, 1);
  assert.match(other.out, /bg-white/);
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

test("the shared dash rule finds an em-dash and a stray en-dash, not a range or a spaced tankestreg", async () => {
  const { dashFindings } = await import("./dashes.mjs");
  assert.deepEqual(dashFindings("qlim8 — klimaregnskab").map((f) => f.char), ["em-dash"]);
  assert.deepEqual(dashFindings("klima–regnskab").map((f) => f.char), ["en-dash"]);
  assert.deepEqual(dashFindings("qlim8 – klimaregnskab"), []);
  assert.deepEqual(dashFindings("Mandag–fredag 9:00–17:00, 2024–2026"), []);
});

test("check-sales-led reads a [[ ]] sentence over several lines, fails a token outside it and an unknown package", () => {
  const ok = 'export const a = "[[Basis koster {pris:starter}" +\n  " om måneden.]]";\n';
  assert.equal(run("check-sales-led.mjs", { "src/content/a.ts": ok }).status, 0);
  assert.equal(run("check-sales-led.mjs", { "src/content/a.ts": 'export const a = "Basis koster {pris:starter}";\n' }).status, 1);
  assert.equal(run("check-sales-led.mjs", { "src/content/a.ts": 'export const a = "[[Pris {pris:platin}]]";\n' }).status, 1);
});
