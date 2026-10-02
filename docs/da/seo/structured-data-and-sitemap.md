# SEO: sitemap-datoer, struktureret data og hvad crawlere ser

> Sidst opdateret: 2026-09-25 · Ejer: qlim8-team · Engelsk udgave: [`docs/en/seo/structured-data-and-sitemap.md`](../../en/seo/structured-data-and-sitemap.md)

Tre regler, hver med det script der håndhæver den. De kommer fra en
gennemgang af qlim8.com i september 2026 mod de tre fejl der får AI-byggede
sites til at falde ud af indekset: alle URLs i sitemappet med samme `lastmod`,
schema markup der modsiger sitets eget hierarki, og sider hvis indhold først
findes når JavaScript har kørt.

## 1. `lastmod` er en rigtig dato, per URL

`app/sitemap.ts` daterer hver URL fra den nyeste af to kilder:

- **Git-datoen for rutens indholdsfiler.** `scripts/content-dates.mjs` kører
  `git log -1` over hver rutes page-fil, page-component og copy-fil og skriver
  `src/generated/content-dates.json`. CI kører det før hvert build med
  `fetch-depth: 0` (`ci.yml`, `deploy.yml`), så imaget indeholder aktuelle
  datoer. Docker-contexten har ingen `.git`, så den committede JSON er
  fallback; scriptet rører den ikke når det ikke kan se historikken.
- **CMS'ets `updatedAt`** for sidens publicerede override, via
  `fetchMarketingCopyEnvelope` i `src/lib/cms.ts`. En rettelse i `/admin`
  flytter datoen uden deploy. Blogindlæg bruger artiklens egen `updatedAt`.

Det der ikke flytter en dato: layout, header, footer, den fælles
marketing-skabelon og den generiske FAQ der sættes på alle marketing-sider. En
header-rettelse er ikke en grund til at fortælle Google at 60 sider er ændret.
Granulariteten er per fil, så en rettelse af én side i
`src/content/marketing/copy/produkt-a.ts` daterer også de andre sider i filen.
Det er en lille overdrivelse i den ærlige retning.

Aldrig `new Date()` (alle URLs ændres ved hvert deploy) og aldrig én fælles
konstant (ingen husker at bumpe den; den tidligere `SITE_UPDATED` var to
måneder gammel på 59 af 66 URLs).

**Guard:** `src/lib/contentDates.test.ts` (i `npm test`) fejler når en rute
mangler dato, en dato ligger i fremtiden, eller alle datoer er ens.

## 2. Én graf, linket med `@id`

Hver side hænger på tre site-dækkende entiteter, defineret ét sted i
`src/lib/schema.ts` og udgivet på forsiden:

| `@id` | Entitet |
|---|---|
| `https://qlim8.com/#organization` | virksomheden |
| `https://qlim8.com/#website` | sitet |
| `https://qlim8.com/#software` | produktet (offers kun fra pakke-API'et, se nedenfor) |

Andre sider refererer til dem (`publisher: ORG_REF`, `isPartOf: { "@id": WEBSITE_ID }`)
og gentager dem aldrig. En crawler fletter entiteter på `@id`, ikke på navn; en
anonym `{ "@type": "Organization", "name": "qlim8" }` er en virksomhed nummer
to. Det var hvad de 44 marketing-sider og hvert blogindlæg udgav.

Side-entiteter får et `@id` af deres egen kanoniske URL plus et fragment
(`pageId()` i `src/lib/schema.ts`): `…/produkt/bankrapport#webpage`,
`#breadcrumb`, `#service`, `#article`. Sidens `breadcrumb`-felt peger på dens
`BreadcrumbList` via det id.

Brødkrummer følger indholdshierarkiet (`parentSlug` i
`src/content/marketing/*.ts`), som også er det den synlige brødkrumme og
megamenuen viser. URL'erne er flade; det er tilladt, så længe de tre er enige.
Megamenuen viser alle live sider, børn indrykket under forældre.

`#software`'s offers kommer kun fra app'ens pakke-API, aldrig fra copy.
`buildSoftwareSchema(offers)` får dem fra `offersFromPackages()`
(`src/lib/packageView.ts`): ét `Offer` pr. offentlig årspris for en
virksomhedspakke, `billingDuration: P1Y`, `valueAddedTaxIncluded: false`. En
skjult pris (Business) og en "fra"-pris (Enterprise) får intet. Så længe
kataloget ikke sælger noget af sig selv (katalog version 1, eller API'et kan
ikke nås), er der slet ingen offers. `/` og `/priser` udgiver samme entitet
med samme offers. `src/lib/pricingSchema.ts` (som byggede offers fra
pris-copyen) er slettet: struktureret data er dér, hvor en forældet pris ville
overleve copyen, fordi en crawler kan blive ved med at vise den, efter siden er
holdt op med at sige den.

**Guard:** `scripts/check-schema.mjs` (i `npm run lint`) bygger JSON-LD for
alle ruter med de samme builders som siderne og fejler på en `Organization`,
`WebSite`, side eller `Service` uden `@id`, en reference til et `@id` ingen
definerer, to forskellige definitioner af samme `@id`, en brødkrumme der
nævner en ikke-rute, et tomt FAQ-svar, eller en entitet med `offers`, `price`
eller `lowPrice` i siderne, som de er bundlet. Derefter holder den de offers,
API'et ville give `#software`, op mod app'ens egne svar, committet i
`scripts/fixtures/public-packages.v1.json` (ingen offers) og `.v2.json` (ét pr.
offentlig årspris for en virksomhedspakke, ekskl. moms, og intet for en skjult
eller "fra"-pris).

## 3. Indholdet er i HTML'en

Sitet er server-renderet (ISR, 300 s). Alt en crawler skal læse skal ligge i
HTML-svaret, ikke opstå efter hydrering:

- FAQ'er bruger native `<details>/<summary>`, så hvert svar er i markup'en og
  `FAQPage`-schemaet beskriver tekst der faktisk står på siden.
- Ingen `initial={{ opacity: 0 }}` på indhold. framer-motion serialiserer
  `initial` ind i SSR-markup'en; sådan endte de to prisbeløb på `/priser` med
  `opacity:0`, dengang siden viste priser. Brug `initial={false}`.
- `"use client"` kun hvor en hook eller handler kræver det. En page-component
  uden state er en server component; læg det interaktive i sin egen client
  component. Forsiden, `/karriere`, `/kontakt`, `/om-os` og `/priser` er
  server components af den grund. På `/kontakt` er kun `ContactForm` en client
  component, og `/priser` mistede sit `"use client"` sammen med
  skifteren mellem månedlig og årlig betaling og checkout'en.
- Ingen site-dækkende client providers. Den tidligere `I18nProvider` sendte
  en 300 KB ordbog på otte sprog til hver besøgende, og intet brugte den.

## Den copy der ikke ligger i dette repo

CMS-publiceret copy overskriver de bundlede defaults ved rendering, så ingen
af de filbaserede guards kan se den. `scripts/check-cms-copy.mjs` (i
`npm run test:contract`, planlagt af `cms-contract.yml`) henter hver page-key
sitet læser, plus alle CMS-artikler, og fejler på et internt link til en
ikke-rute eller på alt hvad copy-reglerne i `scripts/lib/salesLed.mjs`
forbyder: en pakkepris eller en startpris-formulering ("fra N kr"), et
hardkodet signup- eller checkout-link, en prøveperiode.
`scripts/check-sales-led.mjs` anvender de samme regler på den bundlede copy i
`npm run lint`, begge undtager de juridiske dokumenter, og
`scripts/lib/salesLed.test.mjs` holder reglerne op mod kendte strenge i
`npm test`. Det erstatter det
tidligere tjek af at en annonceret startpris var en planpris i
`src/content/copy/pricing.ts`; der er ingen planpriser tilbage at sammenligne
med. En fejl dér rettes i app'ens `/admin`-editor, ikke med et commit.

## Tjek af en deployet side

```bash
curl -s https://qlim8.com/sitemap.xml | grep -oE '<lastmod>[0-9-]{10}' | sort | uniq -c
curl -s https://qlim8.com/produkt/bankrapport | grep -o '<script type="application/ld+json">[^<]*' | head
```

Sæt derefter URL'en i Googles Rich Results Test eller schema.org-validatoren.
Search Console → Sitemaps skal blive ved med at vise "Success" uden fald i
indekserede sider efter et deploy der ændrer datoer.
