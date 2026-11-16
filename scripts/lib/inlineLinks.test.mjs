// The inline-link rule (scripts/lib/inlineLinks.mjs) and the guard that applies
// it (scripts/check-inline-links.mjs), including a deliberately broken tree.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { hasHtmlAnchor, hrefsIn, splitTarget, syntaxProblems, targetProblems } from "./inlineLinks.mjs";

const LIVE = new Set(["/", "/priser", "/metodologi", "/blog/scope-3-smv-guide", "/produkt/rapportering", "/integrationer/appelsin"]);
const RETIRED = new Map([["/kundetyper/tomrer", "/kundetyper/byggeri-og-haandvaerk"]]);
const ctx = (selfPath) => ({ isRoute: (p) => LIVE.has(p), redirectTarget: (p) => RETIRED.get(p), selfPath });

test("a live route passes, with a fragment or a query", () => {
  assert.deepEqual(targetProblems("/priser", ctx()), []);
  assert.deepEqual(targetProblems("/priser#raadgivere", ctx()), []);
  assert.deepEqual(targetProblems("/produkt/rapportering?x=1", ctx()), []);
  assert.deepEqual(targetProblems("/", ctx()), []);
});

test("a path that is not a page fails", () => {
  const [p] = targetProblems("/produkt/findes-ikke", ctx());
  assert.match(p, /not a live route/);
});

test("a retired address fails and names where it goes now", () => {
  const [p] = targetProblems("/kundetyper/tomrer", ctx());
  assert.match(p, /retired address.*\/kundetyper\/byggeri-og-haandvaerk/);
});

test("/integrationer/appelsin fails even though it is a route", () => {
  assert.match(targetProblems("/integrationer/appelsin", ctx())[0], /not allowed as a link target/);
});

test("a signup, register or checkout address fails", () => {
  for (const h of ["/signup", "/signup?package=starter", "/priser?tab=register", "/checkout", "/register/x"]) {
    assert.match(targetProblems(h, ctx())[0] ?? "", /signup, register or checkout/, h);
  }
});

test("the .md twin and a trailing slash fail", () => {
  assert.match(targetProblems("/priser.md", ctx())[0], /\.md twin/);
  assert.match(targetProblems("/priser/", ctx())[0], /ends in a slash/);
});

test("a link to the page itself fails, to another page does not", () => {
  assert.match(targetProblems("/priser", ctx("/priser"))[0], /links the page to itself/);
  assert.match(targetProblems("/priser#x", ctx("/priser"))[0], /links the page to itself/);
  assert.deepEqual(targetProblems("/priser", ctx("/metodologi")), []);
});

test("an external or non-path href is not this rule's business", () => {
  assert.deepEqual(targetProblems("https://eur-lex.europa.eu/x", ctx()), []);
  assert.deepEqual(targetProblems("mailto:a@b.dk", ctx()), []);
  assert.deepEqual(targetProblems("//example.com/x", ctx()), []);
});

test("splitTarget separates path, query and fragment", () => {
  assert.deepEqual(splitTarget("/a/b?x=1#h"), { path: "/a/b", query: "?x=1", hash: "#h" });
  assert.deepEqual(splitTarget("/a"), { path: "/a", query: "", hash: "" });
});

test("valid syntax raises nothing", () => {
  assert.deepEqual(syntaxProblems("Se [priserne](/priser) og [metoden](/metodologi#x)."), []);
  assert.deepEqual(syntaxProblems("[[Basis koster {pris:starter}.]] Ingen link."), []);
});

test("malformed syntax is reported, each with what to change", () => {
  const cases = [
    ["Se [priserne](/priser og videre", /not closed/],
    ["Se [priserne](priser).", /starting with \//],
    ["Se [priserne](https://qlim8.com/priser).", /internal only/],
    ["Se [x](mailto:a@b.dk).", /internal only/],
    ["Se [priserne](/pri ser).", /space/],
    ["Se [](/priser).", /not a valid/],
    ["Se [a [b]](/x).", /not a valid|not closed|space/],
  ];
  for (const [text, why] of cases) {
    const found = syntaxProblems(text);
    assert.equal(found.length, 1, text);
    assert.match(found[0].why, why, text);
  }
});

test("hrefsIn reads href attributes, buttonHref and object href fields", () => {
  const src = `html: '<p><a href="/priser">p</a> <a href=\\"/metodologi\\">m</a></p>', buttonHref: '/kontakt?emne=demo', href: "https://x.dk"`;
  assert.deepEqual(hrefsIn(src).map((h) => h.href), ["/priser", "/metodologi", "/kontakt?emne=demo", "https://x.dk"]);
  assert.equal(hasHtmlAnchor('Se <a href="/priser">her</a>'), true);
  assert.equal(hasHtmlAnchor("Se [her](/priser)"), false);
});

// ── The guard, run on a throwaway src/content tree (CHECK_ROOT) ─────────────
const SCRIPT = fileURLToPath(new URL("../check-inline-links.mjs", import.meta.url));
function runGuard(files) {
  const root = mkdtempSync(join(tmpdir(), "inline-links-"));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  const res = spawnSync(process.execPath, ["--experimental-strip-types", SCRIPT], {
    env: { ...process.env, CHECK_ROOT: root },
    encoding: "utf8",
  });
  return { status: res.status, out: res.stdout + res.stderr };
}

test("the guard fails on an empty tree", () => {
  const r = runGuard({});
  assert.equal(r.status, 1);
  assert.match(r.out, /0 filer fundet/);
});

test("the guard passes live inline links and richtext hrefs", () => {
  const r = runGuard({
    "src/content/a.ts": 'export const a = "Se [priserne](/priser) og [metoden](/metodologi). Kilde: <a href=\\"https://eur-lex.europa.eu/x\\">x</a>";\n' +
      "export const b = { type: 'richtext', html: '<p><a href=\"/blog/scope-3-smv-guide\">guiden</a></p>' };\n",
  });
  assert.equal(r.status, 0, r.out);
});

test("a deliberately broken tree fails on every kind of break, naming file and line", () => {
  const r = runGuard({
    "src/content/broken.ts": [
      'export const dead = "Se [siden](/findes-ikke).";',
      'export const retired = "Se [tømrer](/kundetyper/tomrer).";',
      'export const appelsin = "Se [appelsin](/integrationer/appelsin).";',
      'export const signup = "Prøv [her](/signup?package=starter).";',
      'export const external = "Se [kilden](https://eur-lex.europa.eu/x).";',
      'export const open = "Se [priserne](/priser og videre";',
      "export const html = { type: 'richtext', html: '<a href=\"/pricing\">p</a>' };",
      "export const cta = { buttonHref: '/findes-heller-ikke' };",
    ].join("\n") + "\n",
  });
  assert.equal(r.status, 1, r.out);
  assert.match(r.out, /src\/content\/broken\.ts:1 .*\/findes-ikke is not a live route/);
  assert.match(r.out, /broken\.ts:2 .*retired address/);
  assert.match(r.out, /broken\.ts:3 .*not allowed as a link target/);
  assert.match(r.out, /broken\.ts:4 .*signup, register or checkout/);
  assert.match(r.out, /broken\.ts:5 .*internal only/);
  assert.match(r.out, /broken\.ts:6 .*not closed/);
  assert.match(r.out, /broken\.ts:7 .*\/pricing is a retired address/);
  assert.match(r.out, /broken\.ts:8 .*\/findes-heller-ikke is not a live route/);
});
