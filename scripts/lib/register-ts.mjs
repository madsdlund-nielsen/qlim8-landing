// Lets a plain Node script import this repo's TypeScript content modules.
//
// `node --experimental-strip-types` handles the syntax, but Node still will not
// resolve extension-less relative imports or the `@/` alias on its own, so this
// registers a resolver that does. Import this module first, then dynamically
// import the `.ts` file you need. Same hook as scripts/check-seo-titles.mjs;
// shared here so the other content-reading scripts do not each carry a copy.
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const ROOT = new URL("../../", import.meta.url);
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
    const resolved = nextResolve(absolute ?? spec, context);
    // Node requires `with { type: "json" }` on a JSON import; the bundler does
    // not, and src/lib/contentDates.ts is written for the bundler. Supply the
    // attribute here so the same module loads under node too.
    if (resolved.url.endsWith(".json")) {
      return { ...resolved, importAttributes: { type: "json" } };
    }
    return resolved;
  },
});
