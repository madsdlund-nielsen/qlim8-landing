// The design-token rule (scripts/lib/designTokens.mjs): what it flags and what
// it must leave alone. The guard itself (empty tree, allow-list) is tested in
// guards.test.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenFindings } from "./designTokens.mjs";

const matches = (line) => tokenFindings(line).map((f) => f.match);

test("flags the neutral palette with any utility, variant and step", () => {
  assert.deepEqual(matches('<p className="text-gray-900 mb-2">'), ["text-gray-900"]);
  assert.deepEqual(matches('className="border-slate-200 hover:border-zinc-300"'), ["border-slate-200", "border-zinc-300"]);
  assert.deepEqual(matches('className="bg-neutral-50/50 divide-stone-100"'), ["bg-neutral-50", "divide-stone-100"]);
  for (const u of ["ring", "from", "to", "via", "fill", "stroke", "outline", "decoration", "placeholder"]) {
    assert.equal(tokenFindings(`className="${u}-gray-400"`).length, 1, u);
  }
  assert.deepEqual(matches('"md:group-hover:text-gray-500"'), ["text-gray-500"]);
});

test("flags the coloured palette (the sweep sends it to sage)", () => {
  assert.deepEqual(matches('className="text-emerald-600 bg-teal-50"'), ["text-emerald-600", "bg-teal-50"]);
  assert.deepEqual(matches('"group-[.destructive]:text-red-300"'), ["text-red-300"]);
});

test("flags white, black, and the radii the design does not have", () => {
  assert.deepEqual(matches('className="bg-white text-black"'), ["bg-white", "text-black"]);
  assert.deepEqual(matches('className="bg-black/40 text-white"'), ["bg-black", "text-white"]);
  assert.deepEqual(matches('className="rounded-2xl rounded-t-3xl"'), ["rounded-2xl", "rounded-t-3xl"]);
});

test("flags arbitrary colours, and a hex on a className line", () => {
  assert.deepEqual(matches('className="bg-[#fff] text-[rgb(0,0,0)] border-[hsl(1,2%,3%)]"'), ["bg-[#", "text-[rgb", "border-[hsl"]);
  assert.deepEqual(matches('<div className="p-4" style={{ color: "#1f3a2b" }}>'), ["#1f3a2b"]);
  assert.deepEqual(matches('const c = cva("p-4 text-[#abc]")'), ["text-[#"]);
});

test("leaves the tokens, other radii, anchors and plain words alone", () => {
  const ok = [
    'className="text-foreground text-muted-foreground bg-card bg-band bg-sand border-border border-border-strong"',
    'className="bg-primary text-primary-foreground hover:bg-primary-hover text-sage text-warm-ink"',
    'className="rounded-md rounded-lg rounded-full rounded-xl"',
    'className="shadow-soft ring-ring ring-offset-background accent-primary"',
    '<a className="x" href="#software">',
    '<a className="x" href="#fee">',
    'const colour = "#1f3a2b"; // a plain constant',
    'className="whitegray-50 text-white-ish"',
    'className="border-gray"',
    'className="from-primary to-band"',
  ];
  for (const line of ok) assert.deepEqual(tokenFindings(line), [], line);
});

test("reports the column of each finding", () => {
  const [f] = tokenFindings('x className="a text-gray-900"');
  assert.equal(f.col, 'x className="a '.length);
  assert.equal(f.rule, "palette");
});
