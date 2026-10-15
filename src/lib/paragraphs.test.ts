// A blank line in a copy text is a paragraph break, in the HTML and in the .md twin.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { paragraphs } from "./paragraphs.ts";

test("paragraphs splits on blank lines and drops empty parts", () => {
  assert.deepEqual(paragraphs("Én.\n\nTo.\n\n\nTre."), ["Én.", "To.", "Tre."]);
  assert.deepEqual(paragraphs("Ingen skift, kun\nen linjeskift."), ["Ingen skift, kun\nen linjeskift."]);
  assert.deepEqual(paragraphs("  \n\n "), []);
  assert.deepEqual(paragraphs(""), []);
});

test("the new pages carry their paragraph breaks as blank lines, never the copy marker", async () => {
  await import("../../scripts/lib/register-ts.mjs");
  const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../content/marketing/index.ts");
  const text = JSON.stringify([...ALL_MARKETING_NODES.map((n: { defaults: unknown }) => n.defaults), ...MARKETING_HUBS.map((h: { defaults: unknown }) => h.defaults)]);
  assert.ok(!text.includes("¶"), "a ¶ marker reached the bundled copy");
  const kt = ALL_MARKETING_NODES.find((n: { slug: string }) => n.slug === "vsme-rapport") as { defaults: { depth: { items: { body: string }[] } } };
  assert.ok(kt.defaults.depth.items.some((d) => paragraphs(d.body).length > 1), "vsme-rapport has no multi-paragraph depth item");
});
