// Which files date a blog article's lastmod (scripts/lib/contentFiles.mjs).
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { articleContentFiles } from "./contentFiles.mjs";

test("an ordinary article is dated by its own file only", () => {
  assert.deepEqual(articleContentFiles({ slug: "scope-3-smv-guide", category: "Scope 3" }), ["src/content/scope-3-smv-guide.ts"]);
});

test("a comparison article is also dated by the shared comparison module", () => {
  assert.deepEqual(articleContentFiles({ slug: "enerfy-alternativ", category: "Sammenligning" }), [
    "src/content/enerfy-alternativ.ts",
    "src/content/sammenligning",
  ]);
});
