# SEO: sitemap dates, structured data and what crawlers see

> Last updated: 2026-09-18 · Owner: qlim8 team · Danish twin: [`docs/da/seo/structured-data-and-sitemap.md`](../../da/seo/structured-data-and-sitemap.md)

Three rules, each with the script that enforces it. They came out of an audit
of qlim8.com in September 2026 against the three failure modes that get
AI-built sites dropped from an index: every sitemap URL carrying the same
`lastmod`, schema markup that contradicts the site's own hierarchy, and pages
whose content only exists after JavaScript runs.

## 1. `lastmod` is a real date, per URL

`app/sitemap.ts` dates every URL from the newer of two sources:

- **The git date of the route's content files.** `scripts/content-dates.mjs`
  runs `git log -1` over each route's page file, page component and copy file
  and writes `src/generated/content-dates.json`. CI runs it before every build
  with `fetch-depth: 0` (`ci.yml`, `deploy.yml`), so the image ships current
  dates. The Docker build context has no `.git`, so the committed JSON is the
  fallback; the script leaves it alone when it cannot see history.
- **The CMS `updatedAt`** of the page's published override, from
  `fetchMarketingCopyEnvelope` in `src/lib/cms.ts`. An edit in `/admin` moves
  the date without a deploy. Blog posts use the article's own `updatedAt`.

What does not move a date: the layout, header, footer, the shared marketing
template and the generic FAQ appended to every marketing page. A header tweak
is not a reason to tell Google that 60 pages changed. Granularity is per file,
so an edit to one page in `src/content/marketing/copy/produkt-a.ts` also dates
its file-mates; that is a small overstatement in the honest direction.

Never `new Date()` (every URL changes on every deploy) and never one shared
constant (nobody bumps it; the previous `SITE_UPDATED` sat two months stale on
59 of 66 URLs).

**Guard:** `src/lib/contentDates.test.ts` (in `npm test`) fails when a route
has no date, a date is in the future, or all dates are identical.

## 2. One graph, linked by `@id`

Every page hangs off three site-wide entities defined once in
`src/lib/schema.ts` and emitted on the homepage:

| `@id` | Entity |
|---|---|
| `https://qlim8.com/#organization` | the company |
| `https://qlim8.com/#website` | the site |
| `https://qlim8.com/#software` | the product, with its offers |

Other pages reference them (`publisher: ORG_REF`, `isPartOf: { "@id": WEBSITE_ID }`)
and never restate them. A crawler merges entities by `@id`, not by name; an
anonymous `{ "@type": "Organization", "name": "qlim8" }` is a second company.
That is what the 44 marketing pages and every blog post used to emit.

Page-level entities get an `@id` of their own canonical URL plus a fragment
(`pageId()` in `src/lib/schema.ts`): `…/produkt/bankrapport#webpage`,
`#breadcrumb`, `#service`, `#article`. The page's `breadcrumb` property points
at its `BreadcrumbList` by that id.

Breadcrumbs follow the content hierarchy (`parentSlug` in
`src/content/marketing/*.ts`), which is also what the visible breadcrumb and
the mega-menu show. URLs stay flat; that is allowed, as long as the three
agree. The mega-menu lists every live page, children indented under parents.

The product's offers are built once (`src/lib/pricingSchema.ts`) from the
resolved pricing copy and emitted identically on `/` and `/priser`.

**Guard:** `scripts/check-schema.mjs` (in `npm run lint`) builds the JSON-LD
for every route with the same builders the pages use and fails on an
`Organization`, `WebSite`, page or `Service` without an `@id`, a reference to
an `@id` nothing defines, two differing definitions of one `@id`, a breadcrumb
naming a non-route, or an `offerCount` that does not match.

## 3. Content is in the HTML

The site is server-rendered (ISR, 300 s). Everything a crawler should read has
to be in the HTML response, not produced after hydration:

- FAQs use native `<details>/<summary>`, so every answer is in the markup and
  the `FAQPage` schema describes text that is on the page.
- No `initial={{ opacity: 0 }}` on content. framer-motion serialises `initial`
  into the SSR markup, which is how the two headline prices on `/priser`
  shipped as `opacity:0`. Use `initial={false}`.
- `"use client"` only where a hook or handler needs it. A page component with
  no state is a server component; put the interactive piece in its own client
  component. The homepage, `/karriere`, `/kontakt` and `/om-os` are server
  components for that reason.
- No app-wide client providers. The former `I18nProvider` shipped a 300 KB
  eight-language dictionary to every visitor and nothing consumed it.

## The copy that is not in this repo

CMS-published copy overrides the bundled defaults at render time, so none of
the file-based guards can see it. `scripts/check-cms-copy.mjs` (in
`npm run test:contract`, scheduled by `cms-contract.yml`) fetches every page
key the site reads and fails on an internal link to a non-route or an
advertised entry price ("fra N kr/md") that is not a plan price in
`src/content/copy/pricing.ts`. A failure there is fixed in the app's `/admin`
editor, not with a commit.

## Checking a deployed page

```bash
curl -s https://qlim8.com/sitemap.xml | grep -oE '<lastmod>[0-9-]{10}' | sort | uniq -c
curl -s https://qlim8.com/produkt/bankrapport | grep -o '<script type="application/ld+json">[^<]*' | head
```

Then paste the URL into Google's Rich Results Test or the schema.org validator.
Search Console → Sitemaps should keep reporting "Success" with no drop in
indexed pages after a deploy that changes dates.
