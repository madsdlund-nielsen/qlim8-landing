#!/usr/bin/env node
// Render every Mermaid source in ./mmd to SVG + PNG in ./svg and ./png.
//
//   npm i -D @mermaid-js/mermaid-cli      # one-time, in a scratch workspace
//   node docs/diagrams/render.mjs
//
// Chromium: by default mermaid-cli uses its own bundled Chromium. In sandboxed
// or pre-provisioned environments set PUPPETEER_EXECUTABLE_PATH to an existing
// binary (e.g. Claude Code on the web: /opt/pw-browsers/chromium). See README.md.
import { run } from "@mermaid-js/mermaid-cli";
import { readdir, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const mmdDir = join(here, "mmd");
const svgDir = join(here, "svg");
const pngDir = join(here, "png");

await mkdir(svgDir, { recursive: true });
await mkdir(pngDir, { recursive: true });

const puppeteerConfig = { args: ["--no-sandbox", "--disable-gpu"] };
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  puppeteerConfig.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

const common = {
  puppeteerConfig,
  quiet: true,
  parseMMDOptions: { backgroundColor: "white" },
};

const files = (await readdir(mmdDir)).filter((f) => f.endsWith(".mmd")).sort();
let ok = 0;
for (const f of files) {
  const name = basename(f, ".mmd");
  const input = join(mmdDir, f);
  process.stdout.write(`rendering ${f} ... `);
  await run(input, join(svgDir, `${name}.svg`), common);
  await run(input, join(pngDir, `${name}.png`), { ...common, parseMMDOptions: { backgroundColor: "white", mermaidConfig: {} } });
  console.log("ok");
  ok++;
}
console.log(`\nDone: ${ok}/${files.length} diagrams rendered to svg/ and png/.`);
