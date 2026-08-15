#!/usr/bin/env node
/**
 * Guards the three title/terminology rules that a reader only sees once the
 * page is rendered, and that nothing else in the toolchain checks.
 *
 * 1. No `| qlim8` inside a seoTitle or seoDescription. `app/layout.tsx` sets
 *    `title.template = "%s | qlim8"`, so a suffix written into the content
 *    field is appended a second time. This shipped: every marketing page was
 *    live with `VSME-rapport for SMV'er | qlim8 | qlim8` in its title tag.
 *
 * 2. A title stays short enough to survive the template. Google truncates
 *    around 60 characters and the template costs 8, so the field itself gets
 *    MAX_TITLE. Over that is a warning, not a failure: a long title is a
 *    judgement call, a doubled brand is a bug.
 *
 * 3. No bare "MCP" in a hero title. The acronym is meaningless to an SMV owner
 *    reading an H1, and the entity belongs in the title tag, the body and the
 *    structured data instead, where the crawler reads it and the buyer does
 *    not have to. See "Terminology" in CLAUDE.md.
 *
 * Why import the content instead of grepping it: these are properties of the
 * merged object tree, not of the source text. `src/content/marketing/index.ts`
 * appends the generic FAQ at module load, and a node's copy is assembled from
 * a different file than its metadata, so reading the tree is the only way to
 * check what a page actually ships. The resolver hook below is what that
 * costs: type-stripping handles the syntax, but Node still will not resolve
 * extension-less relative imports or the `@/` alias on its own.
 *
 * Run directly (`node --experimental-strip-types scripts/check-seo-titles.mjs`)
 * or via `npm run lint`.
 */
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = new URL("..", import.meta.url);
const SRC = new URL("src/", ROOT);

registerHooks({
  resolve(specifier, context, nextResolve) {
    let spec = specifier;
    if (spec.startsWith("@/")) spec = new URL(spec.slice(2), SRC).href;

    const absolute = spec.startsWith("file:")
      ? spec
      : context.parentURL && (spec.startsWith("./") || spec.startsWith("../"))
        ? new URL(spec, context.parentURL).href
        : null;

    if (absolute && !/\.[a-z]+$/i.test(absolute)) {
      for (const ext of [".ts", ".tsx", "/index.ts"]) {
        if (existsSync(fileURLToPath(absolute + ext))) {
          return nextResolve(absolute + ext, context);
        }
      }
    }
    return nextResolve(absolute ?? spec, context);
  },
});

const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import(
  new URL("src/content/marketing/index.ts", ROOT).href
);

/** `%s | qlim8` costs 8 characters, and Google truncates around 60. */
const MAX_TITLE = 52;
const BRAND_SUFFIX = /\|\s*qlim8\s*$/i;

const errors = [];
const warnings = [];

/** Both hubs and nodes carry seoTitle/seoDescription; only nodes carry copy. */
const entries = [
  ...MARKETING_HUBS.map((h) => ({ id: h.route, seo: h, copy: undefined })),
  ...ALL_MARKETING_NODES.map((n) => ({
    id: `/${n.collection}/${n.slug}`,
    seo: n,
    copy: n.defaults,
  })),
];

for (const { id, seo, copy } of entries) {
  if (BRAND_SUFFIX.test(seo.seoTitle)) {
    errors.push(
      `${id}\n    seoTitle ender på "| qlim8", og app/layout.tsx tilføjer det igen.\n    ${JSON.stringify(seo.seoTitle)}`,
    );
  }
  if (BRAND_SUFFIX.test(seo.seoDescription)) {
    errors.push(
      `${id}\n    seoDescription ender på "| qlim8".\n    ${JSON.stringify(seo.seoDescription)}`,
    );
  }
  if (seo.seoTitle.length > MAX_TITLE) {
    warnings.push(
      `${id}  (${seo.seoTitle.length} tegn + 8 fra skabelonen)\n    ${JSON.stringify(seo.seoTitle)}`,
    );
  }

  const heroTitle = copy?.hero?.title;
  if (heroTitle && /\bMCP\b/.test(heroTitle)) {
    errors.push(
      `${id}\n    hero.title bruger "MCP" uden forklaring. Skriv udbyttet i overskriften,\n    og lad forkortelsen bo i seoTitle, brødteksten og strukturerede data.\n    ${JSON.stringify(heroTitle)}`,
    );
  }
}

for (const w of warnings) console.warn(`  ! check-seo-titles: lang titel: ${w}`);

if (errors.length === 0) {
  console.log(
    `✓ check-seo-titles: ${entries.length} sider, ingen dobbelt brand-suffiks og ingen bar forkortelse i en hero-overskrift`,
  );
  process.exit(0);
}

console.error(`✗ check-seo-titles: ${errors.length} fund.\n`);
for (const e of errors) console.error(`  ${e}\n`);
console.error(`
Rettelser:
  seoTitle   skriv titlen uden "| qlim8". Skabelonen i app/layout.tsx sætter den på.
  hero.title skriv hvad brugeren får ud af det. Første gang en forkortelse
             optræder i brødteksten, skal den forklares i samme sætning.
`);
process.exit(1);
