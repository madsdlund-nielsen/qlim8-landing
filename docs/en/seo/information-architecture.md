# SEO: information architecture, voice per page and the redirect table

> Last updated: 2026-10-15 · Owner: qlim8 team · Danish twin: [`docs/da/seo/informationsarkitektur.md`](../../da/seo/informationsarkitektur.md)

What pages qlim8.com has, which voice each one is written in, where the 30
retired addresses go, and which search terms each merged page took over. The
sitemap side of this (how many URLs, how `lastmod` works, the guard on the
redirects) is in [`structured-data-and-sitemap.md`](./structured-data-and-sitemap.md);
how to retire a page next time is in `CLAUDE.md`, under "Site structure and
redirects".

## Why the structure changed

In October 2026 the site went from 12 industry pages and 21 product pages to 4
and 6. The old pages were thin and overlapped: an industry page per trade
(carpenter, painter, electrician, plumber, contractor) and a product page per
feature, with too little on any one of them to rank or to convince. A buyer who
is deciding whether to trust a supplier reads one good page about their trade
and one about the product, not thirty short ones. The merged pages each carry
their own FAQ (the shared ESG questions are not appended), and the old addresses
redirect to them (301) so links and search history are kept.

## The page tree

URLs are flat: `/<collection>/<slug>`, never nested. The hierarchy is in
`parentSlug`, `navGroup` and the menu, not in the path.

```
/                                   home
/priser                             packages and prices (from the packages API)
/om-os   /kontakt   /metodologi   /karriere   /nyhedsbrev   /api
/docs  /docs/mcp-quickstart  /docs/mcp-tools  /docs/api-reference
/blog  /blog/<article>              6 bundled articles, plus any published only in the CMS
/cookies  /privatlivspolitik  /handelsbetingelser  /databehandleraftale

/kundetyper                         industries hub
  /byggeri-og-haandvaerk            group "Brancher"
  /transport-og-vognmaend           group "Brancher"
  /produktion-og-industri           group "Brancher"
  /revisorer-og-raadgivere          group "Rådgivere"

/produkt                            product hub
  /platform-og-overblik             group "Overblik"
  /rapportering                     group "Rapportering"
  /vsme-rapport                     group "Rapportering"
  /audit-trail-og-revisor           group "Dokumentation"
  /reduktionsmaal-og-scenarier      group "Handling"
  /leverandoerkaede                 group "Samarbejde"

/integrationer                      integrations hub
  /e-conomic  /dinero  /billy  /appelsin (coming soon, noindex, not in the sitemap)
                                    group "Regnskab"
  /eloverblik  /rest-api  /mcp-server  /vsme-rapport-med-ai-agent
                                    group "Data & API"
```

The sources are `src/content/marketing/kundetyper.ts`, `produkt.ts` and
`integrationer.ts` (the nodes: route, SEO title, group, `related`, block order)
and `src/content/navigation.ts` (`MENU_SLUGS`, the footer). The footer has three
columns: the industries, the product themes, and resources (integrations,
packages, methodology, API, blog, newsletter, docs).

## Green and blue: one voice per page type

The pages are written for two kinds of reader, and the split follows the
decision funnel. **Green** is the entrance: the owner of a small company who
wants to feel that it is under control, with a person to call. Warm, close, low
risk, plain words, a photo of a person in front of the screen. **Blue** is
documentation: the adviser, the auditor, the technical reader, or the owner at
the point of checking. Structured, precise, every claim traceable, a technical
FAQ. Both are written in the same visual design system; the split is about voice
and which blocks a page uses, not about a colour filter (the photo brief says
the same: blue never means cold light).

| Page type | Voice | Notes |
|---|---|---|
| Home | green | |
| `/priser` | green | The annual agreement is "a full year of fixed partnership without surprises". No price is typed in copy; the figures come from the packages API, through the price token |
| `/om-os`, `/kontakt` | green | |
| `/kundetyper` hub, `/produkt` hub | green | Short new copy; the hubs bring their own FAQ (`genericFaq: false`) |
| `byggeri-og-haandvaerk`, `transport-og-vognmaend`, `produktion-og-industri` | green | Block order: hero, reasons, scope table, how it works, S and G checks, integrations, contact, FAQ |
| `platform-og-overblik`, `rapportering` | about 60 percent green, 40 percent blue | The first reader here is still the owner, but the page also has to hold up when a bank or an auditor reads it |
| `revisorer-og-raadgivere` | blue | Block order: hero, reasons, table, features, integrations, collaboration models, contact, depth (fold-outs), FAQ |
| `audit-trail-og-revisor`, `vsme-rapport`, `reduktionsmaal-og-scenarier`, `leverandoerkaede` | blue | Block order: hero, intro, trust, features, table, how it works, depth, contact, FAQ |
| `/metodologi` | blue | |
| Integration pages | technical, with a short green intro | The `reassurance` block sits right after the hero; the rest keeps the technical content |
| Blog, legal, docs, API, careers, newsletter | not assigned in the plan | Keep the voice they have |

The block order for each page is `sectionOrder` on its node
(`src/content/marketing/*.ts`); the blocks themselves are described in
`src/content/marketing/types.ts`.

## The redirect table

The 30 rows of `src/content/marketing/redirects.json`. Each also redirects the
`.md` twin (`/produkt/bankrapport.md` goes to `/produkt/rapportering.md`). All
are 301. Measured against a built site (`next start`, `curl -sI`) when the table
was made: all 60 rules answered 301 with the `Location` shown, and every
`Location` answered 200. `redirects.test.mjs` holds the table itself from then on.

| # | Old address | New address |
|---|---|---|
| 1 | `/kundetyper/tomrer` | `/kundetyper/byggeri-og-haandvaerk` |
| 2 | `/kundetyper/maler` | `/kundetyper/byggeri-og-haandvaerk` |
| 3 | `/kundetyper/elektriker` | `/kundetyper/byggeri-og-haandvaerk` |
| 4 | `/kundetyper/vvs` | `/kundetyper/byggeri-og-haandvaerk` |
| 5 | `/kundetyper/entreprenoer` | `/kundetyper/byggeri-og-haandvaerk` |
| 6 | `/kundetyper/vognmand` | `/kundetyper/transport-og-vognmaend` |
| 7 | `/kundetyper/plastfabrikant` | `/kundetyper/produktion-og-industri` |
| 8 | `/kundetyper/revisor` | `/kundetyper/revisorer-og-raadgivere` |
| 9 | `/kundetyper/raadgiver` | `/kundetyper/revisorer-og-raadgivere` |
| 10 | `/kundetyper/konsulent` | `/kundetyper/revisorer-og-raadgivere` |
| 11 | `/kundetyper/frisoer` | `/kundetyper` |
| 12 | `/kundetyper/store-virksomheder` | `/priser` |
| 13 | `/produkt/dashboard` | `/produkt/platform-og-overblik` |
| 14 | `/produkt/udforskning` | `/produkt/platform-og-overblik` |
| 15 | `/produkt/data-udtraek` | `/produkt/platform-og-overblik` |
| 16 | `/produkt/excel-rapport` | `/produkt/rapportering` |
| 17 | `/produkt/pdf-rapport` | `/produkt/rapportering` |
| 18 | `/produkt/modtagere` | `/produkt/rapportering` |
| 19 | `/produkt/bestyrelsesrapport` | `/produkt/rapportering` |
| 20 | `/produkt/investorrapport` | `/produkt/rapportering` |
| 21 | `/produkt/bankrapport` | `/produkt/rapportering` |
| 22 | `/produkt/samarbejdspartnere` | `/produkt/rapportering` |
| 23 | `/produkt/temaer` | `/produkt/rapportering` |
| 24 | `/produkt/brag-board` | `/produkt/rapportering` |
| 25 | `/produkt/vsme-basis` | `/produkt/vsme-rapport` |
| 26 | `/produkt/vsme-comprehensive` | `/produkt/vsme-rapport` |
| 27 | `/produkt/audit-trail` | `/produkt/audit-trail-og-revisor` |
| 28 | `/produkt/revisor-adgang` | `/produkt/audit-trail-og-revisor` |
| 29 | `/produkt/tiltag` | `/produkt/reduktionsmaal-og-scenarier` |
| 30 | `/produkt/scenarier` | `/produkt/reduktionsmaal-og-scenarier` |

Three of the old product pages kept their address and are not in the table:
`/produkt/rapportering`, `/produkt/vsme-rapport` and `/produkt/leverandoerkaede`
(they were rewritten and absorbed the others). 12 industry pages plus 21 product
pages make the 33 "historic" pages the test is frozen on; 30 are redirected and
3 are still live.

Older redirects, unchanged in substance and now also 301, are written out in
`next.config.ts`: `/pricing` to `/priser`, `/about` to `/om-os`, `/viden` and
`/viden/<slug>` to `/blog` and `/blog/<slug>`, `/blog/bankens-nye-krav-esg-smv-finansiering`
to `/blog/l193-bankens-esg-krav-smv`, and `/blog/csrd-leverandoer-rapportering`
to `/blog`.

Two rows do not go to a page of the same kind, on purpose. `/kundetyper/frisoer`
goes to the industries hub, whose FAQ says the method is the same for a hair
salon, a shop or an office; there is no page for a trade qlim8 does not target.
`/kundetyper/store-virksomheder` goes to `/priser`: the site is for small and
medium companies, and the large customers appear in the copy as the ones who ask
for numbers (CSRD, supplier forms); a company that is large itself reads the
packages and talks to sales.

## What each merged page took over

The search terms are those the old pages carried in their SEO titles, and for
each the place the new page covers it. The old titles are from the last commit
before the restructure (`f813686^`); the new places were checked in the copy.

| New page | Took over | Old search intent (old SEO title) | Where it is on the new page |
|---|---|---|---|
| `byggeri-og-haandvaerk` | `tomrer`, `maler`, `elektriker`, `vvs`, `entreprenoer` | "klimaregnskab for tømrer / malerfirma / elektriker / VVS-firma / entreprenør" | The trades are named in the hero's trust line and in the hub card ("tømrer, VVS, el, maler, murer og entreprenør"). "Murer" is new |
| `transport-og-vognmaend` | `vognmand` | "klimaregnskab for vognmand" | Title and SEO title ("Klimaregnskab og CO2-rapport for vognmænd"); couriers and forwarders in the hub card |
| `produktion-og-industri` | `plastfabrikant` | "klimaregnskab for plastproduktion" | Production in general, with plastics, metal, wood and food named among the examples |
| `revisorer-og-raadgivere` | `revisor`, `raadgiver`, `konsulent` | "klimaregnskab for revisorer", "klima- og ESG-rådgivning på data", "klimaregnskab for konsulenter" | Title and SEO title; the hub card names the free auditor account, factor and source on every line and the audit trail; "consultant login" is in the how-it-works copy |
| `platform-og-overblik` | `dashboard`, `udforskning`, `data-udtraek` | "klimaregnskab-dashboard", "udforsk dit klimaregnskab", "data udtræk og eksport" | A section on the dashboard, the drill-down from month to category to the single calculation (Scope 3 by the 15 GHG categories), and a fold-out "Dataudtræk: tag tallene med ud" |
| `rapportering` | `excel-rapport`, `pdf-rapport`, `modtagere`, `bestyrelsesrapport`, `investorrapport`, `bankrapport`, `samarbejdspartnere`, `temaer`, `brag-board` | "klimaregnskab som Excel- / PDF-rapport", "klimarapport til bestyrelse, bank og investorer", "ESG-rapport til investorer", "klimadata til banken", "del klimadata med samarbejdspartnere", "rapport-temaer", "Brag Board: offentlig ESG-profil" | One report for the board, the bank and investors, as PDF or Excel; the three report styles Light, Dark and Consulting are named on the page; a fold-out ("Kunder, samarbejdspartnere og Bragboard") and an FAQ answer cover the public profile with the Brag Board badge |
| `vsme-rapport` | `vsme-basis`, `vsme-comprehensive` | "VSME Basic", "VSME Comprehensive" | The Basic and Comprehensive modules, the difference between them and who asks for which (as the SEO description puts it) |
| `audit-trail-og-revisor` | `audit-trail`, `revisor-adgang` | "audit trail til klimaregnskab", "revisor-adgang til klimaregnskab" | Line ID, trace to the voucher, hash chain, read access and attestation for the auditor (the SEO description) |
| `reduktionsmaal-og-scenarier` | `tiltag`, `scenarier` | "reduktionstiltag og ROI", "scenarie-planlægger for klima" | Targets on the company's own climate accounts with a goal curve, actions the company enters itself and a projection with no new actions (the SEO description). The page was called "Reduktionsmål og scenarier" and promised a diesel-to-electric test for vans. Scenarios no longer exist in the product (the reduction goals were rebuilt in October 2026), so the title is now "Reduktionsmål og klimaplan". The address keeps "scenarier" on purpose: a new name is a page retirement (redirect, `HISTORIC` and the counts in `redirects.test.mjs`). **The new page does not use the word "ROI"** (checked in the copy), so a search for that exact term lost its landing page, and no page offers a scenario planner any more |
| `/kundetyper` (hub) | `frisoer` | "klimaregnskab for frisørsalon" | An FAQ answer that the method is the same for a salon, a shop or an office |
| `/priser` | `store-virksomheder` | "klimaregnskab og CSRD for store virksomheder" | The packages, with Business and Enterprise sold after a conversation |

A merged page whose old titles named a specific noun (a trade, a report type) is
the one to watch in Search Console: the exact-match phrase now lives in body
text and a fold-out rather than in a title of its own. If a query clearly
outgrows its fold-out, that is the time for a new page and a new row of the
reverse kind (a destination that gets its own address again), which the redirect
test will ask you to resolve.
