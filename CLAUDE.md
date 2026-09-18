# qlim8-landing: Claude Code Reference

## Project Overview
The public marketing site at **qlim8.com**. Next.js 15 App Router, React 19,
Tailwind 4, TypeScript. Danish only (`<html lang="da">`, `locale: "da_DK"`).

Separate from `qlim8-app` in every way that matters: different server,
different nginx, different certbot. `qlim8-app` serves the product at
app.qlim8.com and also hosts the CMS this site reads from.

## Stack and commands
```bash
npm ci --legacy-peer-deps   # matches the Dockerfile, which is the build of record
npm run dev                 # next dev
npm run lint                # eslint + dash guard + workflow guard + SEO titles + schema graph
npm run typecheck           # tsc --noEmit
npm test                    # copyMerge + content-dates (pretest regenerates the dates)
npm run build               # next build (standalone output; prebuild regenerates the dates)
npm run test:contract       # live: the app's public CMS API shape + the published copy itself
npm run content-dates       # rewrite src/generated/content-dates.json from git history
```

## Where the copy lives

`src/content/**` holds the **bundled default** copy, not the final text.
`src/lib/cms.ts` fetches CMS-published overrides from `app.qlim8.com`, and
`src/lib/copyMerge.ts` deep-merges them *over* the defaults.

**A change here does not necessarily change the live page.** If a field has
been published in the app's `/admin` CMS, the override wins and this repo's
value is never rendered. When copy on qlim8.com looks wrong and the file looks
right, check the CMS first:

```bash
curl -s "https://app.qlim8.com/api/public/cms/marketing/page.home?language=da"
curl -s "https://app.qlim8.com/api/public/cms/articles?language=da"
```

Blog articles work the same way: `app/blog/[slug]` prefers a CMS article over
the bundled one in `src/content/*.ts`, and at least one published article has
no file in this repo at all.

## No em-dashes in copy

The em-dash (`—`) is banned in everything a visitor can read. It is not a
character anyone here types on purpose, and its presence reads as machine-written
text. `npm run lint` fails on it via `scripts/check-dashes.mjs`, which covers
`src/content`, `src/page-components`, `src/components`, `src/index.css` and `app`.

Use the punctuation Danish grammar actually calls for, not a blanket
substitution:

| Instead of `—` | Use | Example |
|---|---|---|
| Explanatory addition, contrast, before a subordinate clause | `, ` | `for danske SMV'er, hentet direkte fra dit regnskabssystem` |
| Heading or list item of the form "Label" + gloss | `: ` | `Metodologi: sådan beregner qlim8 dit klimaregnskab` |
| Before an enumeration | `: ` | `ned i den konkrete beregning: input, emissionsfaktor og kilde` |
| Two main clauses (a comma would splice) | `. ` | `Du kan opgradere når som helst. Adgangen er øjeblikkelig.` |
| An aside that itself contains commas | `( )` | `Fra dit regnskabssystem (Dinero, e-conomic eller Billy) hentes …` |

The en-dash (`–`) is fine **only** as a range between two numbers or two words
(`Mandag–fredag: 9:00–17:00`). Anywhere else it is an em-dash in disguise and
the guard rejects it.

This applies to CMS-authored copy too, which the guard cannot see. Text written
in the app's `/admin` editor is held to the same rule.

Note the interaction with `.github/`, which the dash guard does not cover.
Substituting `: ` for `—` inside an unquoted YAML value produces a file GitHub
cannot parse, and the symptom is a failing run with no jobs on every push,
regardless of the workflow's triggers. `scripts/check-workflows.mjs` now parses
every workflow during `npm run lint` so this fails on the branch instead.

## SEO rules and their guards

Three rules, from the September 2026 audit, each with a script that fails the
build or the scheduled contract check when broken. Full write-up in
`docs/{da,en}/seo/structured-data-and-sitemap.md`.

1. **`lastmod` is real, per URL.** `app/sitemap.ts` dates each URL from the
   git history of its content files (`scripts/content-dates.mjs` →
   `src/generated/content-dates.json`, regenerated in CI before every build)
   combined with the CMS `updatedAt`. Never `new Date()`, never one shared
   constant. The JSON is committed as the Docker fallback; do not hand-edit it.
2. **One schema graph.** `src/lib/schema.ts` defines `#organization`,
   `#website` and `#software` once; every other page references them by `@id`
   (`ORG_REF`, `WEBSITE_ID`) and never restates an `Organization`. New page
   types get a builder there, not an inline object. `scripts/check-schema.mjs`
   fails `npm run lint` on an anonymous entity or a dangling reference.
3. **Content is in the HTML.** FAQs are `<details>`, not state-gated; no
   `initial={{ opacity: 0 }}` on content (framer-motion serialises it into the
   SSR markup); `"use client"` only on the component that needs a hook, never
   on a whole page; menus are rendered and CSS-hidden, not conditionally
   mounted, so their links exist for crawlers.

CMS-published copy is outside all of that. `scripts/check-cms-copy.mjs`
(`npm run test:contract`) checks the live overrides for dead internal links and
entry prices that contradict `src/content/copy/pricing.ts`; the fix is in
`/admin`.

## Deployment

Push to `main` → `.github/workflows/ci.yml` (lint, typecheck, test, build) →
`deploy.yml` builds a Docker image and ships it. `docker-compose.yml` +
`nginx.conf` + certbot run on the marketing host (91.107.239.106), which shares
nothing with the app host.

`docs/da/` and `docs/en/` are internal engineering documentation, never served
to visitors. Keep the two language trees in step.

`docs/diagrams/svg/*.svg` are generated from `docs/diagrams/mmd/*.mmd` via
`docs/diagrams/excalidraw.mjs`. Edit the `.mmd` source, then regenerate.
