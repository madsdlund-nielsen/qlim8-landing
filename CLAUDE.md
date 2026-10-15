# qlim8-landing: Claude Code Reference

Ved UI og tekst: følg skillen `qlim8-groen-design` (`.claude/skills/qlim8-groen-design/`) og tokens i `design-system/tokens.json` (navneoversættelse står under 'The palette comes from the app').

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
npm run lint                # eslint + dash guard + design-token guard + copy guard + workflow guard + SEO titles + schema graph
npm run typecheck           # tsc --noEmit
npm test                    # copyMerge + content-dates + packageView + design tokens + price tokens + copy blocks + redirects + the guards' own rules (pretest regenerates the dates)
npm run build               # next build (standalone output; prebuild regenerates the dates)
npm run test:contract       # live: the app's public CMS API shape + its MCP catalog + the published copy itself
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

The files: `src/content/copy/*.ts` hold the single pages (home, pricing, about,
contact, methodology, careers, legal). The three collections live in
`src/content/marketing/`: the nodes (route, SEO, hierarchy, block order) in
`kundetyper.ts`, `produkt.ts` and `integrationer.ts`, and the copy in
`copy/kundetyper-branche.ts` (the industry hub and pages), `copy/produkt-temaer.ts`
(the product hub and theme pages) and `copy/integrationer-copy.ts`.

**The block model.** A marketing page is a set of optional, named blocks (`hero`,
`reassurance`, `reasons`, `table`, `features`, `howItWorks`, `checks`, `trust`,
`integrations`, `options`, `depth`, `testimonial`, `contact`, `faq`, `closingCta`
and so on) and renders only the ones that have content. The node, not the CMS,
carries `sectionOrder` (the order), `highlight` (a featured hub card) and
`genericFaq` (`false` keeps the shared ESG questions off a page, or a hub, that
brings its own). List items share one shape with no optional keys, or
`copyMerge` falls back to the bundled item without a word. The shapes, the rules
and the allowed icon names are in `src/content/marketing/types.ts`, and
`src/lib/marketingCopy.test.ts` holds every page to them. A paragraph break inside
a field is a blank line (`src/lib/paragraphs.ts`), so a body stays one editable value.

The MCP tool count ("32 tools", written in about thirty places) and the tool
list in `/.well-known/mcp.json` are hand-kept summaries of the app's catalog.
`scripts/check-mcp-surface.mjs` (in `npm run test:contract`, scheduled) holds
both to the live `app.qlim8.com/api/mcp/schema`. When the app adds or removes a
tool, change them here, and in `/admin` for any page that has published its own
count (`page.integrationer.mcp-server` has).

## Site structure and redirects

The marketing collections are kept small: a page has its own address only when
it has its own search intent and enough to say. The nodes are in
`src/content/marketing/`:

- `/kundetyper` (industries): `byggeri-og-haandvaerk`, `transport-og-vognmaend`,
  `produktion-og-industri`, `revisorer-og-raadgivere`.
- `/produkt` (themes): `platform-og-overblik`, `rapportering`, `vsme-rapport`,
  `audit-trail-og-revisor`, `reduktionsmaal-og-scenarier`, `leverandoerkaede`.
- `/integrationer`: one page per system, plus the REST API, the MCP server and the
  VSME agent page.

Until October 2026 there were 12 industry pages and 21 product pages, many of
them thin and overlapping; they were merged into the pages above. URLs stay flat
(`/produkt/<slug>`); the hierarchy lives in `parentSlug`, the menu and the
breadcrumbs. The page tree, which pages are written green (the entrance, the
owner) and which blue (documentation, the adviser), and what each merged page
absorbed are in `docs/da/seo/informationsarkitektur.md`
(English: `docs/en/seo/information-architecture.md`).

**Redirects.** `src/content/marketing/redirects.json` has one `{from, to}` row per
retired page. `next.config.ts` turns each row into two rules, the page and its
`.md` twin, both with an explicit `statusCode: 301` (`permanent: true` would
answer 308). The older redirects (`/pricing`, `/about`, `/viden`, two blog
posts) are written out in `next.config.ts`. `src/content/marketing/redirects.ts`
is the typed accessor. `scripts/check-cms-copy.mjs` reads the sources, so a link
in published copy to a retired address is a warning ("link via redirect"), fixed
in `/admin`.

`scripts/lib/redirects.test.mjs` (in `npm test`) holds the table to the site:
every one of the 33 historic pages is live or redirected, a source is always a
historic page and never a live one, a destination is always live, no chain, a
`.md` twin with a markdown document at the destination, every rule a 301, and
every `MENU_SLUGS` entry and every `related` entry resolves (`getRelated` and
`buildGroups` throw outside production instead of dropping a dead entry; that
is how `store-virksomheder` once went missing).

**Retiring a page later.** (1) Add a row to `redirects.json` pointing at the page
that took over the subject (a live page, never another source). (2) Add the old
path to `HISTORIC` in `scripts/lib/redirects.test.mjs` and move the counts there
(33 and 30, and the `6 + 60` rules): a row on its own fails three tests, which
is the test making you say the page was retired on purpose. (3) Remove the node
from its list, from `MENU_SLUGS` and from every `related`; the test names each
one left behind. (4) In qlim8-app drop the page key from the CMS manifest
(`shared/marketingCopySchema.ts`; the 2026 migration there was a one-off).
The sitemap follows from the nodes. After a deploy, submit it in Search Console
and watch the 404s for a week.

## The palette comes from the app

The palette is the green design system "Roligt" (calm): `design-system/tokens.json`
is the source, `design-system/BRAND.md` and the skill `qlim8-groen-design` say how
to use it. `src/index.css` holds the same values in the shadcn HSL-triple form
(one decimal, so each round-trips to its hex; the hex is in a comment) plus the
design-only names in `@theme inline`. The values equal `design-system/tokens.json`
**and** the Roligt block of qlim8-app (`client/src/index.css`,
`:root[data-theme="calm"]`). This repo has no import path into that one, so they
are kept in step **by hand**, and each side is held to `tokens.json` by a test:
`src/lib/designTokens.test.ts` here (in `npm test`), `tests/unit/components/themeTokens.test.ts`
in qlim8-app. Change one, change the other, and `tokens.json` in both repos.

`design-system/tailwind-theme.css` is deliberately **not** imported: its
`--color-accent` is the sage green, and shadcn's `accent` here is a hover
surface, so importing it would turn every hover state green.

Name translation, design token to the utility in this repo (same name unless
listed):

| Design token (`tokens.json`) | Utility here | Note |
|---|---|---|
| `color-accent` (sage) | `sage` | `accent` here is the hover surface (band) |
| `color-border-strong` | `border-strong` | the edge of a control (5.6:1); `border` is decorative sand |
| `color-focus-ring` | `ring` | solid 2px, 2px offset, set in the base layer |
| `color-background`, `-card`, `-band`, `-sand`, `-primary`, `-primary-hover`, `-primary-foreground`, `-foreground`, `-muted-foreground`, `-secondary-hover`, `-warm`, `-warm-ink` | `background`, `card`, `band`, `sand`, `primary`, `primary-hover`, `primary-foreground`, `foreground`, `muted-foreground`, `secondary-hover`, `warm`, `warm-ink` | `warm` is never text |
| `shadow-soft` | `shadow-soft` | the only shadow; `shadow-sm` to `shadow-2xl` resolve to it |
| `space-section`, `space-section-lg` | `py-section`, `py-section-lg` | 80px and 100px |
| `radius-md`, `radius-lg` | `rounded-md`, `rounded-lg` | 8px controls, 12px cards; `rounded-xl` to `3xl` are 12px too |
| `container-max` | `max-w-(--container-max)` | 1120px. A plain variable in `:root`, not a theme key: as a theme key it would make Tailwind read `w-max` and `max-w-max` as 1120px |
| `measure-body` | `max-w-(--measure-body)` | 68ch |
| `type-h1` to `type-trust` | `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-body-sm`, `text-trust`, `text-button` | bare `h1` to `h3` are Fraunces 500 from the base layer (h1 44/52, 32/40 on mobile; h2 32/40, 27/35; h3 22/30) |

Light only, deliberately: there is no `.dark` block and no dark variant, and the
design is light only too. Fonts are loaded in `app/layout.tsx` with
`next/font/local` from `design-system/fonts` (Source Sans 3 as `font-sans`,
Fraunces as `font-display`).

Tokens only, everywhere in `src/` and `app/`: no `gray-*` (or any other
Tailwind palette step), `bg-white`/`text-black`/`text-white`, hex or arbitrary
colour in a className, and no `rounded-2xl/3xl`. `npm run lint` fails on them
via `scripts/check-design-tokens.mjs` (rule in `scripts/lib/designTokens.mjs`,
tests in `designTokens.test.mjs` and `guards.test.mjs`). A justified exception
goes in `scripts/design-tokens-allowlist.json` (file, exact text, reason); a
stale or reasonless entry fails too, and the list is empty today. The sweep map:
`text-gray-900` is `text-primary` on headings and `text-foreground` elsewhere,
`-500/-600` is `text-muted-foreground`, `bg-white` is `bg-card`, `bg-gray-50/100`
is `bg-band` (`bg-sand` for quotes), `border-gray-200` is `border-border`
(`border-border-strong` on controls), a dark section is `bg-primary` with
`text-primary-foreground` and the `inverted` ds Button, buttons are `rounded-md`
and cards `rounded-lg` (`rounded-full` stays on dots, avatars and small status pills).

## Screenshots and photos

**Product screenshots** are captured from the running app in the Roligt theme,
with demo data, by `scripts/marketing-screenshots.mjs` in **qlim8-app** (Playwright;
the header of the script has the command and the views). They are not rendered
from the design board, which is hard-coded hex and is no longer the source.
The rule stands: they show views that have **shipped**. Putting a view that has
not on the marketing site would promise something the product does not do yet,
and a screenshot is only as true as its demo data (the header of the script
says what it hides from the page), so look at one before it goes on a page. `attached_assets/` still
holds four older JPEGs, but nothing imports them any more (the `@assets` alias
and the lint ignore are what is left); a page that needs a product image takes it
from the CMS, as a photo does.

**Photos are never in this repo.** They are uploaded in the app's `/admin` and
carried by image fields: `landing.images` (`hero`, `feature1` to `feature3`) and
`about.images` (`founder`, the portrait in every ContactBox, with
`public/branding/founder-mugshot.png` as the fallback) as their own page keys, and `hero.imageUrl` (with `imageAlt` in the
copy) on every marketing page and hub. A page without a photo renders without
one: the `Photo` component (`src/components/ds/Photo.tsx`) makes no placeholder
box, so a missing photo is never a hole in the layout. The order list, the style
rules, the formats and the file names are in `docs/da/marketing/fotoliste.md`
(English: `docs/en/marketing/photo-list.md`); a new page that wants a photo gets a
row there.

The Open Graph card is `public/opengraph.jpg` (1200x630, the logo and the home
headline on the green card). Every page declares that size, so a new card keeps it.

## No em-dashes in copy

The long em-dash (`—`) is banned in everything a visitor can read. It is not a
character anyone here types on purpose, and its presence reads as machine-written
text. `npm run lint` fails on it via `scripts/check-dashes.mjs`, which covers
`src/content`, `src/page-components`, `src/components`, `src/lib`, `src/index.css`
and `app`. The rule is `scripts/lib/dashes.mjs`, tested in
`scripts/lib/dashes.test.mjs`, and shared with the live CMS check.

A **short en-dash with a space on each side** (` – `) is allowed between words,
as the Danish tankestreg: "Det er rigtigt – men ikke nok". It is for where
Danish grammar calls for it. A comma, colon or full stop is preferred wherever
one fits, and a dash used as a fixed ornament reads as machine-written too.
The owner's rule, October 2026 (it replaces the earlier blanket ban on the
en-dash outside ranges).

The en-dash **without** spaces is a range sign and nothing else: between two
numbers (`9:00–17:00`, `2024–2026`, `80–94%`) or between two weekdays or months
(`Mandag–fredag`, `januar–marts`). An unspaced en-dash between ordinary words
(`klima–regnskab`) is rejected, and so is a dash with a space on one side only.

Use the punctuation Danish grammar actually calls for, not a blanket
substitution:

| Instead of `—` | Use | Example |
|---|---|---|
| Explanatory addition, contrast, before a subordinate clause | `, ` | `for danske SMV'er, hentet direkte fra dit regnskabssystem` |
| Heading or list item of the form "Label" + gloss | `: ` | `Metodologi: sådan beregner qlim8 dit klimaregnskab` |
| Before an enumeration | `: ` | `ned i den konkrete beregning: input, emissionsfaktor og kilde` |
| Two main clauses (a comma would splice) | `. ` | `Du kan opgradere når som helst. Adgangen er øjeblikkelig.` |
| An aside that itself contains commas | `( )` | `Fra dit regnskabssystem (Dinero, e-conomic eller Billy) hentes …` |
| A pause or turn that only a dash gives | ` – ` | `Det er rigtigt – men ikke nok` |

This applies to CMS-authored copy too, which the guard cannot see. Text written
in the app's `/admin` editor is held to the same rule.

Note the interaction with `.github/`, which the dash guard does not cover.
Substituting `: ` for `—` inside an unquoted YAML value produces a file GitHub
cannot parse, and the symptom is a failing run with no jobs on every push,
regardless of the workflow's triggers. `scripts/check-workflows.mjs` now parses
every workflow during `npm run lint` so this fails on the branch instead.

## Self-serve: prices and signup come from the app

A company can start on Free (free, with no end date), buy Starter or Premium by
itself, and talk to us about Business and Enterprise; auditors and
consultants have free packages of their own. All of that is data in
qlim8-app (Admin → Pakker), and this site only shows it.

`src/lib/packages.ts` reads the app's `GET /api/public/packages` (ISR, tag
`packages`; a publish in the app revalidates `/priser` and `/`), and
`src/lib/packageView.ts` decides everything shown from it:

- `/priser` groups the packages (`src/components/public/PackageGroups.tsx`):
  start for free, buy it yourself, talk to us. Prices are quoted per month,
  billed yearly, ex. VAT, and only where the catalog shows them; the buttons
  go to the app's `/signup?package=` URL the API names, or to Book demo. The
  buttons above and below the groups lead with "Kom gratis i gang" to the
  free package's signup URL (`freeStartHref`), fixed in the component, not
  CMS-editable.
- The homepage teaser shows the company packages with their prices and
  buttons from the API; a curated plan in the page copy with the same name
  keeps its badge, tagline and list. The hero, steps and closing buttons lead
  with "Kom gratis i gang" (to `/priser`).
- The header (a client component) gets "Kom gratis i gang" from a boolean the
  root layout reads on the server (`src/components/public/SelfServeContext.tsx`).
- `#software` carries one `Offer` per public yearly price, on the homepage and
  `/priser` alike (`offersFromPackages`).
- The page metadata of `/` and `/priser`, `/llms.txt` and the `.md` twins of
  both pages follow the same switch.

**The switch is the app's catalog.** While it sells nothing by itself (catalog
version 1, or the API cannot be reached) every one of those falls back to the
sales-led site: no price, every main button books a demo. That is also the
emergency stop: publishing a version with Free, Starter and Premium as
sales-led in the app turns this site back within the ISR window. What switches
is the buttons (`resolveCta`), the trust and micro lines (`SALES_LED_TRUST`,
`SALES_LED_MICRO`), the price tokens (a sentence with a price is dropped, see
below), the metadata and `llms.txt`. The prose in `src/content/**` does not
switch and speaks of starting for free; after an emergency stop that lasts,
change it here and in `/admin`.

The other ways in stay: **Book demo** (`DEMO_HREF`, `/kontakt?emne=demo`, the
contact form with "Book en demo" preselected), **the contact form** on
`/kontakt` (`src/components/public/ContactForm.tsx`, posted to the
same-origin proxy `app/api/contact/route.ts`, which forwards to qlim8-app's
`POST /api/public/contact`; a sent form fires GA4 `generate_lead`), **the
phone number** +45 93 90 13 84, and **the newsletter**. `src/content/cta.ts`
is the single source for their links (`DEMO_CTA`, `PHONE_CTA`,
`CONTACT_HREF`, `LOGIN_URL`, `FREE_START_CTA`). A CTA imports its target from
there rather than spelling out an href. "Log ind" stays in the header for
existing customers (`app.qlim8.com/auth`).

**The whitepaper slide-in** (`src/components/public/SlideIn.tsx`, mounted once in
`app/layout.tsx`) offers the whitepaper "Din første VSME-rapport" in five steps
(welcome, name and email, two questions, phone, topics) and then the VSME
template as a follow-up. It opens on the first of 8 seconds, 50% scroll or exit
intent, waits while the cookie banner is unanswered (`CONSENT_CHANGED` in
`src/lib/consent.ts`, dispatched by `CookieConsent`) and minimises to a pill when
closed. It never shows on `/kontakt`, `/priser`, `/nyhedsbrev`, the legal pages,
`/docs`, `/api` or a `.md` route (`isHiddenRoute` in `src/lib/slideIn.ts`).
Session state is in sessionStorage; `signedUp`, `dismissCount` and
`lastDismissAt` go to localStorage **only with marketing consent**, and after 3
closed visits it starts as the pill for 30 days. The logic is in
`src/lib/slideIn.ts` (tested in `slideIn.test.ts`), the copy in
`src/content/slideIn.ts`. It posts through the same-origin proxies
`app/api/whitepaper-lead/route.ts` and `.../[id]/vsme/route.ts` to qlim8-app's
`/api/public/whitepaper-lead[/<id>/vsme]`, and reports GA4 `generate_lead` with
`lead_topic: "whitepaper"` (`trackWhitepaperLead`, statistics consent). Details:
`docs/en/marketing/slide-in.md` (Danish: `docs/da/marketing/slide-in.md`).

### What copy may not say

A package price is never typed in copy: it goes stale the day the catalog
changes. (A price may still be *said*, through the price token below.)
`scripts/check-sales-led.mjs` (rules in `scripts/lib/salesLed.mjs`,
tested in `scripts/lib/salesLed.test.mjs` under `npm test`) fails
`npm run lint` on:

- a figure a qlim8 package has been sold or is sold at, and entry-price
  phrasing ("fra N kr", "% rabat");
- a hard-coded signup link (`?tab=register`, or `app.qlim8.com/signup`
  anywhere but `cta.ts`; the API names the signup URLs) or a checkout call;
- a trial or intro-offer claim ("prøveperiode", "prøv gratis", "gratis prøve",
  "de første N dage med alt fra", "opgrader til X inden for det første år").
  This wording comes only from the packages API: `trialDays`, `introBoost` and
  `upgradeOffer` are turned into the card lines by `trialLine`, `introBoostLine`
  and `upgradeOfferLine` in `src/lib/packageView.ts`, which is the single file
  the rule exempts (`allowedIn` in `scripts/lib/salesLed.mjs`, tested in
  `salesLed.test.mjs`). Copy in `src/content` and CMS fields still may not say
  it, so an offer the app does not give cannot be promised, and a field absent
  from the API (or a sales-led catalog) renders no line.

It covers `src/content`, `src/page-components`, `src/components`, `src/lib`
and `app`. The rules are deliberately narrow: money that is not a qlim8
package (a consultant's fee, an example invoice) is fine, and so are "Opret
en gratis konto", "Kom gratis i gang" and "kreditkort", which the sales-led
rules used to forbid. The legal documents are exempt, since contract wording
is changed with whoever drafted it; `src/content/copy/legal.ts` §3.3 still
provides for a 14-day trial, which is the owner's to change.

**The price token (owner's decision, October 2026): prices may appear in copy,
but the figure is never typed.** A sentence that names a package price is
wrapped in `[[ ... ]]` and holds `{pris:<packageKey>}` (the monthly amount,
"795 kr." style) or `{pris:<packageKey>:aar}` (the yearly amount, "9.540 kr."),
with Danish formatting (thousands with ".", then "kr."). `src/lib/priceTokens.ts`
(`applyPriceTokens`, run by `resolvePageCopy` in `src/lib/pageCopy.ts`, so on
every rendered page, every `.md` twin and every CMS override) fills each token
from the packages API and strips the markers. **If any token inside a `[[ ]]`
segment cannot be resolved** (catalog v1, API down, a package with no public
price, the free and advisor packages, an unknown key) **the whole segment is
removed**, so write the sentence to read with and without it:

```
Det er enkelt at starte. [[Starter koster {pris:starter} om måneden, betalt årligt.]] Free er gratis og har ingen udløbsdato.
```

`scripts/lib/salesLed.mjs` allows a token inside `[[ ]]` and fails a token
outside it, a malformed token, an unbalanced `[[ ]]` and an unknown package key
(validated against `scripts/fixtures/public-packages.v3.json`, so a package added
to the catalog is added to that fixture first). A hand-typed figure stays an
error everywhere, inside `[[ ]]` too. A string in an array that is only a removed
sentence is dropped, and so is an object whose field was.

Copy also does not say which package holds a feature ("fra Premium"): what is in
a package changes with the catalog, and `/priser` shows it from the API. This is
a rule from the fact base, not a guard.

While the catalog sells nothing by itself, buttons that lead to `/priser` become
Book demo (`resolveCta` in `src/lib/packageView.ts`) and the trust and micro
lines under a main button become `SALES_LED_TRUST` (`src/content/cta.ts`),
because "Ingen kreditkort" and "Ingen binding" are true of Free only.
"Opret gratis rådgiver-konto" links to `/priser#raadgivere`, an anchor on the
first advisor package.

Structured data is guarded separately: `check-schema.mjs` fails on any
`offers` or price in the pages as bundled, and holds the offers the API would
give `#software` (one per public yearly company price, ex. VAT, none under
catalog v1) to `scripts/fixtures/public-packages.*.json`, which are the app's
own API answers for catalog v1, v2 and v3 (regenerate them
from qlim8-app's `buildPublicPackages(buildLineupV2(...))`, and for v3
`buildCatalogV3(buildLineupV2(...))` from `server/services/catalogV3.ts`, when
its shape or the lineup changes; Stripe ids never appear in them). v3 adds
`highlightItems` and `comparison.sections`, which carry the capabilities the
app has not built marked `planned`; the page shows them as "Planlagt", and
v1 and v2 stay to prove the site still reads an API without them.

CMS-published copy is held to the same rules by `npm run test:contract`
(`scripts/check-cms-copy.mjs`, legal page keys exempt), because the lint cannot
see it. Publishing catalog v2 in the app rewrites the copy that was published
while qlim8 was sales-led (`server/services/selfServeCmsEdits.ts` in
qlim8-app, also run by its `deploy.sh`); a new failure is fixed in `/admin`.

## SEO rules and their guards

Three rules, from the September 2026 audit, each with a script that fails the
build or the scheduled contract check when broken. Full write-up in
`docs/{da,en}/seo/structured-data-and-sitemap.md`; the redirects behind the
sitemap are under "Site structure and redirects" above.

1. **`lastmod` is real, per URL.** `app/sitemap.ts` dates each URL from the
   git history of its content files (`scripts/content-dates.mjs` →
   `src/generated/content-dates.json`, regenerated in CI before every build)
   combined with the CMS `updatedAt`. Never `new Date()`, never one shared
   constant. The JSON is committed as the Docker fallback; do not hand-edit it.
2. **One schema graph.** `src/lib/schema.ts` defines `#organization`,
   `#website` and `#software` once; every other page references them by `@id`
   (`ORG_REF`, `WEBSITE_ID`) and never restates an `Organization`. New page
   types get a builder there, not an inline object. Pages emit it through
   `<JsonLd>` (`src/components/JsonLd.tsx`), never a bare `JSON.stringify` in
   `dangerouslySetInnerHTML`: the entities carry CMS text, and only
   `serializeJsonLd` stops a `</script>` in it from closing the tag
   (`src/lib/jsonLd.test.ts` fails on an inline one). `scripts/check-schema.mjs`
   fails `npm run lint` on an anonymous entity, a dangling reference, or an
   offer or price in the bundled pages; `#software`'s offers come only from
   the packages API and are held to the fixtures (see Self-serve).
3. **Content is in the HTML.** FAQs are `<details>`, not state-gated; no
   `initial={{ opacity: 0 }}` on content (framer-motion serialises it into the
   SSR markup); `"use client"` only on the component that needs a hook, never
   on a whole page; menus are rendered and CSS-hidden, not conditionally
   mounted, so their links exist for crawlers.

CMS-published copy is outside all of that. `scripts/check-cms-copy.mjs`
(`npm run test:contract`) checks the live overrides and CMS articles for dead
internal links and for anything the copy rules forbid (a package price, a
hard-coded signup or checkout link, a trial); the fix is in `/admin`.

## Deployment

Push to `main` → `.github/workflows/ci.yml` (lint, typecheck, test, build) →
`deploy.yml` builds a Docker image and ships it. `docker-compose.yml` +
`nginx.conf` + certbot run on the marketing host (91.107.239.106), which shares
nothing with the app host.

`docs/da/` and `docs/en/` are internal engineering documentation, never served
to visitors (`docs/README.md` is the index). Keep the two language trees in
step; the English twin of `marketing/fotoliste.md` is `marketing/photo-list.md`,
and of `seo/informationsarkitektur.md` it is `seo/information-architecture.md`.

`docs/diagrams/svg/*.svg` (and `png/`) are generated from
`docs/diagrams/mmd/*.mmd` by `docs/diagrams/render.mjs` (mermaid-cli), and
`docs/diagrams/excalidraw.mjs` then builds `excalidraw/` from the SVGs. Edit
the `.mmd` source, then regenerate; `docs/diagrams/README.md` has the steps.
