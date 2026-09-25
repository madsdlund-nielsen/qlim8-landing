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
npm run lint                # eslint + dash guard + sales-led guard + workflow guard + SEO titles + schema graph
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

## The palette comes from the app

`src/index.css` holds the same colours as `qlim8-app/client/src/index.css`, in
the same HSL-triple form. They are kept in step **by hand**: this repo has no
import path into that one, and a marketing site showing a green the product
does not use is worse than a duplicated table. Change one, change the other.

Light only. The `.dark` block and `@custom-variant dark` exist but nothing sets
the class and there are no `dark:` utilities anywhere. That is deliberate, not
an oversight: the app has light and dark, this site does not.

The product screenshots in `attached_assets/` are **rendered from the design
board**, not screen-captured, so they carry the product's own palette and can be
regenerated when it changes:

```bash
# in qlim8-app
CHROMIUM_PATH=/opt/pw-browsers/chromium node docs/design/redesign-2026/render-frames.mjs
```

They show views that have shipped. The board also holds frames for views that
have not, and putting one of those on the marketing site would promise
something the product does not do yet.

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

## Sales-led: no signup, no prices

qlim8 is sold after a demo. A visitor cannot sign up, start a trial or pay on
this site, and no package price is published anywhere. There are four ways in:

1. **Book demo**: `DEMO_HREF` (`/kontakt?emne=demo`), the contact form with
   "Book en demo" preselected. It is the header button and every main CTA.
2. **The contact form** on `/kontakt` (`src/components/public/ContactForm.tsx`),
   posted to the same-origin proxy `app/api/contact/route.ts`, which forwards
   to qlim8-app's `POST /api/public/contact`. The app stores the request and
   emails the owner. A sent form fires GA4 `generate_lead`.
3. **The phone number**, +45 93 90 13 84.
4. **The newsletter.**

`src/content/cta.ts` is the single source for their links (`DEMO_CTA`,
`PHONE_CTA`, `CONTACT_HREF`, `LOGIN_URL`). A CTA imports its target from there
rather than spelling out an href, so moving the demo booking (to a calendar
tool, say) stays a one-line change. "Log ind" stays in the header for existing
customers (`app.qlim8.com/auth`, never `?tab=register`). `/priser` keeps its
URL but is a package page without prices ("Pakker" in the nav), and its "Book
demo" buttons are fixed in the component, not CMS-editable.

`scripts/check-sales-led.mjs` (rules in `scripts/lib/salesLed.mjs`) fails
`npm run lint` on a signup link, a checkout call, a figure a qlim8 package has
been sold at, entry-price phrasing ("fra N kr"), or a free-account, free-trial
or credit-card claim, across `src/content`, `src/page-components`,
`src/components`, `src/lib` and `app`. The rules are deliberately narrow:
money that is not a qlim8 package (a consultant's fee, an example invoice) is
fine. The legal documents are exempt, since contract wording is changed with
whoever drafted it. Structured data is guarded separately: `check-schema.mjs`
fails on any entity carrying `offers`, `price` or `lowPrice`.

CMS-published copy is held to the same rules by `npm run test:contract`
(`scripts/check-cms-copy.mjs`, legal page keys exempt), because the lint cannot
see it. The copy that was already published when the site went sales-led is
rewritten by a backfill in qlim8-app (`scripts/backfill-sales-led-cms-copy.ts`,
run by its `deploy.sh`). A new failure is fixed in `/admin`.

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
   fails `npm run lint` on an anonymous entity, a dangling reference, or any
   entity carrying `offers` or a price (`#software` has none; see Sales-led).
3. **Content is in the HTML.** FAQs are `<details>`, not state-gated; no
   `initial={{ opacity: 0 }}` on content (framer-motion serialises it into the
   SSR markup); `"use client"` only on the component that needs a hook, never
   on a whole page; menus are rendered and CSS-hidden, not conditionally
   mounted, so their links exist for crawlers.

CMS-published copy is outside all of that. `scripts/check-cms-copy.mjs`
(`npm run test:contract`) checks the live overrides and CMS articles for dead
internal links and for anything the sales-led rules forbid (a package price, a
signup link, a free-account or free-trial claim); the fix is in `/admin`.

## Deployment

Push to `main` → `.github/workflows/ci.yml` (lint, typecheck, test, build) →
`deploy.yml` builds a Docker image and ships it. `docker-compose.yml` +
`nginx.conf` + certbot run on the marketing host (91.107.239.106), which shares
nothing with the app host.

`docs/da/` and `docs/en/` are internal engineering documentation, never served
to visitors. Keep the two language trees in step.

`docs/diagrams/svg/*.svg` (and `png/`) are generated from
`docs/diagrams/mmd/*.mmd` by `docs/diagrams/render.mjs` (mermaid-cli), and
`docs/diagrams/excalidraw.mjs` then builds `excalidraw/` from the SVGs. Edit
the `.mmd` source, then regenerate; `docs/diagrams/README.md` has the steps.
