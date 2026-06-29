# Architecture diagrams — source & exports

This folder holds the **source of truth** for every diagram in
[`../en/architecture/system-architecture.md`](../en/architecture/system-architecture.md)
(and its Danish twin). Each diagram exists in four forms so it can be read on GitHub,
embedded in slides, and edited in a visual tool:

| Folder | Format | Use |
|---|---|---|
| `mmd/` | Mermaid source (`.mmd`) | **Canonical, editable.** Edit here, then re-render. Also editable in any [mermaid.live](https://mermaid.live) editor. |
| `svg/` | Vector (`.svg`) | Crisp embeds; **editable** in Figma / Inkscape / Illustrator / draw.io (draw.io → *Import → SVG*). |
| `png/` | Raster (`.png`) | Slides, docs, previews. |
| `excalidraw/` | Excalidraw (`.excalidraw`) | Hand-editable on [excalidraw.com](https://excalidraw.com) (best-effort export — see below). |

The `.md` docs embed the Mermaid **inline** (so GitHub renders them live) and link to the
`svg`/`png`/`excalidraw` exports beneath each one.

## Diagram index

| # | File stem | Diagram |
|---|---|---|
| 1 | `01-system-context` | System context / landscape (also the single-page overview) |
| 2 | `02-app-runtime` | App runtime / container architecture |
| 3 | `03-api-agent-surface` | Public API + AI-agent (v1 · MCP · OAuth) |
| 4a | `04a-data-model-domains` | Domain data model — bounded contexts |
| 4b | `04b-data-model-carbon-core` | Carbon core (detailed ER) |
| 4c | `04c-data-model-public-api` | Public API & OAuth storage (detailed ER) |
| 5 | `05-deployment` | Deployment & CI/CD topology |
| 6 | `06-landing-bridges` | Landing architecture & app bridges |
| 7 | `07-seq-invoice` | Sequence — invoice ingest → AI → 3-tier calc |
| 8 | `08-seq-checkout` | Sequence — pricing checkout bridge |
| 9 | `09-seq-oauth-mcp` | Sequence — OAuth 2.1 / MCP connector auth |
| 10 | `10-seq-report-job` | Sequence — async v1 report job (pg-boss) |

## Regenerating the exports

```bash
# from the repo root, in a scratch workspace (the renderer is intentionally NOT a
# dependency of the app — it pulls puppeteer, which we keep out of the app build):
npm i -D @mermaid-js/mermaid-cli
node docs/diagrams/render.mjs        # → svg/ and png/
node docs/diagrams/excalidraw.mjs    # → excalidraw/ (pure Node, no extra deps)
```

`render.mjs` uses [`puppeteer-config.json`](./puppeteer-config.json) (`--no-sandbox`).
Chromium resolution:

- **Local:** mermaid-cli's bundled Chromium is used automatically — nothing to set.
- **Containers / Claude Code on the web:** point at the pre-installed binary:
  ```bash
  PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium node docs/diagrams/render.mjs
  ```
  (Do **not** run `playwright install` in that environment.)

## Editable `.excalidraw` files

Each `.excalidraw` scene **embeds the rendered SVG as an image element**, so it opens directly
on [excalidraw.com](https://excalidraw.com) as an editable canvas (annotate, extend, rearrange).
They are generated with `excalidraw.mjs` (pure Node, no browser) from `svg/`.

For **native, shape-level** editing (every box/arrow as a separate Excalidraw element), import
the matching `.mmd` instead: excalidraw.com → *menu* → *Insert → Mermaid* → paste the `.mmd`.
draw.io users: *Import → SVG*, or *Arrange → Insert → Advanced → Mermaid* with the `.mmd`.

The `.mmd` and `.svg` are always the current source of truth.
