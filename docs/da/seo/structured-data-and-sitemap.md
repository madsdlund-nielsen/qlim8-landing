# SEO: sitemap-datoer, struktureret data og hvad crawlere ser

> Sidst opdateret: 2026-09-18 · Ejer: qlim8-team · Engelsk udgave: [`docs/en/seo/structured-data-and-sitemap.md`](../../en/seo/structured-data-and-sitemap.md)

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
| `https://qlim8.com/#software` | produktet, med dets offers |

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

Produktets offers bygges ét sted (`src/lib/pricingSchema.ts`) fra den
resolvede pris-copy og udgives identisk på `/` og `/priser`.

**Guard:** `scripts/check-schema.mjs` (i `npm run lint`) bygger JSON-LD for
alle ruter med de samme builders som siderne og fejler på en `Organization`,
`WebSite`, side eller `Service` uden `@id`, en reference til et `@id` ingen
definerer, to forskellige definitioner af samme `@id`, en brødkrumme der
nævner en ikke-rute, eller et `offerCount` der ikke passer.

## 3. Indholdet er i HTML'en

Sitet er server-renderet (ISR, 300 s). Alt en crawler skal læse skal ligge i
HTML-svaret, ikke opstå efter hydrering:

- FAQ'er bruger native `<details>/<summary>`, så hvert svar er i markup'en og
  `FAQPage`-schemaet beskriver tekst der faktisk står på siden.
- Ingen `initial={{ opacity: 0 }}` på indhold. framer-motion serialiserer
  `initial` ind i SSR-markup'en; sådan endte de to prisbeløb på `/priser` med
  `opacity:0`. Brug `initial={false}`.
- `"use client"` kun hvor en hook eller handler kræver det. En page-component
  uden state er en server component; læg det interaktive i sin egen client
  component. Forsiden, `/karriere`, `/kontakt` og `/om-os` er server
  components af den grund.
- Ingen site-dækkende client providers. Den tidligere `I18nProvider` sendte
  en 300 KB ordbog på otte sprog til hver besøgende, og intet brugte den.

## Den copy der ikke ligger i dette repo

CMS-publiceret copy overskriver de bundlede defaults ved rendering, så ingen
af de filbaserede guards kan se den. `scripts/check-cms-copy.mjs` (i
`npm run test:contract`, planlagt af `cms-contract.yml`) henter hver page-key
sitet læser og fejler på et internt link til en ikke-rute eller en annonceret
startpris ("fra N kr/md") der ikke er en planpris i
`src/content/copy/pricing.ts`. En fejl dér rettes i app'ens `/admin`-editor,
ikke med et commit.

## Tjek af en deployet side

```bash
curl -s https://qlim8.com/sitemap.xml | grep -oE '<lastmod>[0-9-]{10}' | sort | uniq -c
curl -s https://qlim8.com/produkt/bankrapport | grep -o '<script type="application/ld+json">[^<]*' | head
```

Sæt derefter URL'en i Googles Rich Results Test eller schema.org-validatoren.
Search Console → Sitemaps skal blive ved med at vise "Success" uden fald i
indekserede sider efter et deploy der ændrer datoer.
