// JSON-LD on the page (src/lib/jsonLd.ts, src/components/JsonLd.tsx): CMS text
// cannot close the script tag, and no page writes a bare JSON.stringify into
// the HTML beside the component.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { serializeJsonLd } from "./jsonLd.ts";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));

test("a heading published as </script><script>… stays inside the JSON", () => {
  const entity = {
    "@type": "FAQPage",
    name: "Spørgsmål</script><script>alert(document.cookie)</script>",
    text: "CO₂ & energi <b>",
  };
  const out = serializeJsonLd(entity);
  assert.doesNotMatch(out, /[<>&]/);
  assert.doesNotMatch(out.toLowerCase(), /<\/script/);
  assert.deepEqual(JSON.parse(out), entity);
});

test("an entity without those characters is plain JSON.stringify", () => {
  const entity = { "@id": "https://qlim8.com/#organization", name: "qlim8 ApS" };
  assert.equal(serializeJsonLd(entity), JSON.stringify(entity));
});

/** A bare JSON.stringify written into the HTML, in source text. */
const BARE = /dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(/;

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    if (e.isDirectory()) return e.name === "node_modules" ? [] : sources(full);
    return /\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name) ? [full] : [];
  });
}

test("no page or component inlines JSON-LD without the escape", () => {
  const files = [...sources(join(ROOT, "app")), ...sources(join(ROOT, "src"))];
  // An empty scan would pass anything.
  assert.ok(files.length > 50, `scanned ${files.length} files`);
  const bare = files.filter((f) => BARE.test(readFileSync(f, "utf8")));
  assert.deepEqual(bare, []);
});

test("the scan would flag the old inline form", () => {
  assert.match('dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}', BARE);
  assert.doesNotMatch('dangerouslySetInnerHTML={{ __html: serializeJsonLd(block) }}', BARE);
});
