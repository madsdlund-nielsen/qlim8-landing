// Generate the qlim8 marketing-site favicons from the brand SVGs.
//
// Source of truth: public/brand/qlim8-ordmaerke-{primaer,invers}.svg (the
// wordmark, cropped to its 496x182 box). Per the design manual the logo is set
// in #2b303b on light and #f8fafc on dark, and the emerald accent is never used
// in the logo. The vector favicon (public/favicon.svg) carries the same wordmark
// and flips colour with prefers-color-scheme; these PNGs are the raster
// fallbacks referenced from app/layout.tsx (light vs dark scheme).
//
// Run: npm i -D sharp && node scripts/generate-brand-icons.mjs
// sharp is intentionally NOT in package.json: it would be pulled into the Docker
// build of record (and Next's image pipeline) for a script that only ever runs
// by hand. Install it ad hoc to regenerate, then commit the PNGs it emits.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

const primaer = path.join(pub, "brand", "qlim8-ordmaerke-primaer.svg"); // #2b303b
const invers = path.join(pub, "brand", "qlim8-ordmaerke-invers.svg"); // #f8fafc

async function favicon(svg, size, widthFraction) {
  const mark = await sharp(svg, { density: 384 })
    .resize({ width: Math.round(size * widthFraction) })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: TRANSPARENT },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

async function write(buf, rel) {
  const out = path.join(pub, rel);
  await sharp(buf).toFile(out);
  const m = await sharp(out).metadata();
  console.log(`  ${rel}  ${m.width}x${m.height}`);
}

async function main() {
  console.log("Generating qlim8 marketing favicons:");
  // Light OS theme shows the charcoal mark, dark OS theme the off-white mark.
  await write(await favicon(primaer, 512, 0.9), "favicon-light.png");
  await write(await favicon(invers, 512, 0.9), "favicon-dark.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
