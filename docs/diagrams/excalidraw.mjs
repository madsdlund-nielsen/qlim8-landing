#!/usr/bin/env node
// Generate openable .excalidraw scenes from the rendered SVGs (run render.mjs first).
// Each scene embeds the SVG as an image element, so it opens on excalidraw.com as an
// editable canvas. For native shape-level editing, import the matching .mmd instead
// (Insert -> Mermaid). Pure Node — no browser required.
//
//   node docs/diagrams/render.mjs       # produces svg/
//   node docs/diagrams/excalidraw.mjs   # produces excalidraw/
import { readdir, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const svgDir = join(here, "svg");
const outDir = join(here, "excalidraw");
await mkdir(outDir, { recursive: true });

const hex = (s, n = 40) => createHash("sha1").update(s).digest("hex").slice(0, n);
const intFrom = (s) => parseInt(createHash("sha1").update(s).digest("hex").slice(0, 8), 16);

const files = (await readdir(svgDir)).filter((f) => f.endsWith(".svg")).sort();
for (const f of files) {
  const name = basename(f, ".svg");
  const svg = await readFile(join(svgDir, f), "utf8");
  const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const width = vb ? Math.round(parseFloat(vb[1])) : 1200;
  const height = vb ? Math.round(parseFloat(vb[2])) : 800;
  const dataURL = "data:image/svg+xml;base64," + Buffer.from(svg, "utf8").toString("base64");
  const fileId = hex(name);
  const scene = {
    type: "excalidraw",
    version: 2,
    source: "https://qlim8.com",
    elements: [{
      type: "image", id: hex("el-" + name, 16), x: 0, y: 0, width, height, angle: 0,
      strokeColor: "transparent", backgroundColor: "transparent", fillStyle: "solid",
      strokeWidth: 1, strokeStyle: "solid", roughness: 1, opacity: 100, groupIds: [],
      frameId: null, roundness: null, seed: intFrom(name), version: 1,
      versionNonce: intFrom("nonce-" + name), isDeleted: false, boundElements: [],
      updated: 1, link: null, locked: false, status: "saved", fileId, scale: [1, 1],
    }],
    appState: { gridSize: null, viewBackgroundColor: "#ffffff" },
    files: { [fileId]: { mimeType: "image/svg+xml", id: fileId, dataURL, created: 1, lastRetrieved: 1 } },
  };
  await writeFile(join(outDir, name + ".excalidraw"), JSON.stringify(scene));
  console.log(`wrote ${name}.excalidraw (${width}x${height})`);
}
console.log(`\nDone: ${files.length} excalidraw scenes.`);
