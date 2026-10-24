# SEO: informationsarkitektur, tone pr. side og redirect-tabellen

> Sidst opdateret: 2026-10-15 · Ejer: qlim8-team · Engelsk udgave: [`docs/en/seo/information-architecture.md`](../../en/seo/information-architecture.md)

Hvilke sider qlim8.com har, i hvilken tone hver af dem er skrevet, hvor de 30
udgåede adresser går hen, og hvilke søgetermer hver sammenlagt side overtog.
Sitemap-siden af det (hvor mange URL'er, hvordan `lastmod` virker, guarden på
redirects) står i [`structured-data-and-sitemap.md`](./structured-data-and-sitemap.md).
Hvordan en side udgår næste gang, står i `CLAUDE.md` under "Site structure and
redirects".

## Hvorfor strukturen er ændret

I oktober 2026 gik sitet fra 12 branchesider og 21 produktsider til 4 og 6. De
gamle sider var tynde og overlappede hinanden: en brancheside pr. fag (tømrer,
maler, elektriker, VVS, entreprenør) og en produktside pr. funktion, med for lidt
på hver til at ranke eller overbevise. En køber, der afgør, om en leverandør er
til at stole på, læser én god side om sit fag og én om produktet, ikke tredive
korte. De sammenlagte sider har hver deres egen FAQ (de fælles ESG-spørgsmål
bliver ikke lagt oveni), og de gamle adresser sender videre til dem med 301, så
links og søgehistorik bevares.

## Sidetræet

URL'erne er flade: `/<samling>/<slug>`, aldrig indlejrede. Hierarkiet ligger i
`parentSlug`, `navGroup` og menuen, ikke i stien.

```
/                                   forside
/priser                             pakker og priser (fra pakke-API'et)
/om-os   /kontakt   /metodologi   /karriere   /nyhedsbrev   /api
/docs  /docs/mcp-quickstart  /docs/mcp-tools  /docs/api-reference
/blog  /blog/<artikel>              6 bundlede artikler, plus dem der kun er udgivet i CMS'et
/cookies  /privatlivspolitik  /handelsbetingelser  /databehandleraftale

/kundetyper                         hub for brancher
  /byggeri-og-haandvaerk            gruppe "Brancher"
  /transport-og-vognmaend           gruppe "Brancher"
  /produktion-og-industri           gruppe "Brancher"
  /revisorer-og-raadgivere          gruppe "Rådgivere"

/produkt                            hub for produktet
  /platform-og-overblik             gruppe "Overblik"
  /rapportering                     gruppe "Rapportering"
  /vsme-rapport                     gruppe "Rapportering"
  /audit-trail-og-revisor           gruppe "Dokumentation"
  /reduktionsmaal-og-scenarier      gruppe "Handling"
  /leverandoerkaede                 gruppe "Samarbejde"

/integrationer                      hub for integrationer
  /e-conomic  /dinero  /billy  /appelsin (kommer snart, noindex, ikke i sitemappet)
                                    gruppe "Regnskab"
  /eloverblik  /rest-api  /mcp-server  /vsme-rapport-med-ai-agent
                                    gruppe "Data & API"
```

Kilderne er `src/content/marketing/kundetyper.ts`, `produkt.ts` og
`integrationer.ts` (noderne: rute, SEO-titel, gruppe, `related`, blokrækkefølge)
og `src/content/navigation.ts` (`MENU_SLUGS`, footeren). Footeren har tre
kolonner: brancherne, produkttemaerne og ressourcer (integrationer, pakker,
metodologi, API, blog, nyhedsbrev, docs).

## Grøn og blå: én tone pr. sidetype

Siderne er skrevet til to slags læsere, og fordelingen følger beslutningstragten.
**Grøn** er indgangen: ejeren af en lille virksomhed, der vil føle, at det er
under kontrol, og at der er et menneske at ringe til. Varmt, tæt på, lav risiko,
almindelige ord, et foto af en person foran skærmen. **Blå** er dokumentationen:
rådgiveren, revisoren, den tekniske læser eller ejeren, når der skal tjekkes efter.
Struktureret, præcist, hver påstand kan spores, teknisk FAQ. Begge er skrevet i
det samme visuelle designsystem; fordelingen handler om tone og om, hvilke blokke
en side bruger, ikke om et farvefilter (fotolisten siger det samme: blå betyder
aldrig koldt lys).

| Sidetype | Tone | Bemærkninger |
|---|---|---|
| Forside | grøn | |
| `/priser` | grøn | Årsaftalen er "et helt års fast partnerskab uden overraskelser". Der skrives ingen pris i copy; tallene kommer fra pakke-API'et via pristegnet |
| `/om-os`, `/kontakt` | grøn | |
| Hub `/kundetyper`, hub `/produkt` | grøn | Ny, kort copy; hubbene har deres egen FAQ (`genericFaq: false`) |
| `byggeri-og-haandvaerk`, `transport-og-vognmaend`, `produktion-og-industri` | grøn | Blokrækkefølge: hero, årsager, Scope-tabel, sådan virker det, S og G, integrationer, kontakt, FAQ |
| `platform-og-overblik`, `rapportering` | cirka 60 procent grøn, 40 procent blå | Den første læser er stadig ejeren, men siden skal også holde, når en bank eller en revisor læser den |
| `revisorer-og-raadgivere` | blå | Blokrækkefølge: hero, årsager, tabel, funktioner, integrationer, samarbejdsmodeller, kontakt, dybde (fold-ud), FAQ |
| `audit-trail-og-revisor`, `vsme-rapport`, `reduktionsmaal-og-scenarier`, `leverandoerkaede` | blå | Blokrækkefølge: hero, intro, tryghed, funktioner, tabel, sådan virker det, dybde, kontakt, FAQ |
| `/metodologi` | blå | |
| Integrationssider | teknisk, med en kort grøn intro | Blokken `reassurance` står lige efter hero; resten beholder det tekniske indhold |
| Blog, juridisk, docs, API, karriere, nyhedsbrev | ikke fordelt i planen | Beholder den tone, de har |

Rækkefølgen af blokke på hver side er `sectionOrder` på dens node
(`src/content/marketing/*.ts`); selve blokkene er beskrevet i
`src/content/marketing/types.ts`.

## Redirect-tabellen

De 30 rækker i `src/content/marketing/redirects.json`. Hver række omdirigerer
også `.md`-tvillingen (`/produkt/bankrapport.md` går til
`/produkt/rapportering.md`). Alle er 301. Målt mod et bygget site (`next start`,
`curl -sI`), da tabellen blev lavet: alle 60 regler svarede 301 med den viste
`Location`, og hver `Location` svarede 200. Derefter holder `redirects.test.mjs`
selve tabellen.

| # | Gammel adresse | Ny adresse |
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

Tre af de gamle produktsider beholdt deres adresse og står ikke i tabellen:
`/produkt/rapportering`, `/produkt/vsme-rapport` og `/produkt/leverandoerkaede`
(de er skrevet om og har overtaget de andre). 12 branchesider og 21 produktsider
giver de 33 "historiske" sider, testen er frosset på; 30 er omdirigeret, og 3
er stadig live.

De ældre redirects, uændrede i indholdet og nu også 301, står direkte i
`next.config.ts`: `/pricing` til `/priser`, `/about` til `/om-os`, `/viden` og
`/viden/<slug>` til `/blog` og `/blog/<slug>`,
`/blog/bankens-nye-krav-esg-smv-finansiering` til `/blog/l193-bankens-esg-krav-smv`
og `/blog/csrd-leverandoer-rapportering` til `/blog`.

To rækker går med vilje ikke til en side af samme slags. `/kundetyper/frisoer`
går til branchehubben, hvis FAQ siger, at metoden er den samme for en
frisørsalon, en butik eller et kontor; der er ingen side for et fag, qlim8 ikke
retter sig mod. `/kundetyper/store-virksomheder` går til `/priser`: sitet er til
små og mellemstore virksomheder, og de store kunder optræder i copyen som dem,
der beder om tal (CSRD, leverandørskemaer); en virksomhed, der selv er stor,
læser pakkerne og taler med salg.

## Hvad hver sammenlagt side overtog

Søgetermerne er dem, de gamle sider havde i deres SEO-titler, og for hver er
angivet, hvor den nye side dækker dem. De gamle titler er fra det sidste commit
før omlægningen (`f813686^`); de nye steder er kontrolleret i copyen.

| Ny side | Overtog | Gammel søgeintention (gammel SEO-titel) | Hvor den står på den nye side |
|---|---|---|---|
| `byggeri-og-haandvaerk` | `tomrer`, `maler`, `elektriker`, `vvs`, `entreprenoer` | "klimaregnskab for tømrer / malerfirma / elektriker / VVS-firma / entreprenør" | Fagene står i herolinjens tryghedslinje og på hubkortet ("tømrer, VVS, el, maler, murer og entreprenør"). "Murer" er nyt |
| `transport-og-vognmaend` | `vognmand` | "klimaregnskab for vognmand" | Titel og SEO-titel ("Klimaregnskab og CO2-rapport for vognmænd"); kurerer og speditører på hubkortet |
| `produktion-og-industri` | `plastfabrikant` | "klimaregnskab for plastproduktion" | Produktion i det hele taget, med plast, metal, træ og fødevarer nævnt som eksempler |
| `revisorer-og-raadgivere` | `revisor`, `raadgiver`, `konsulent` | "klimaregnskab for revisorer", "klima- og ESG-rådgivning på data", "klimaregnskab for konsulenter" | Titel og SEO-titel; hubkortet nævner den gratis revisorkonto, faktor og kilde på hver linje og revisionssporet; "konsulent-login" står i teksten om sådan virker det |
| `platform-og-overblik` | `dashboard`, `udforskning`, `data-udtraek` | "klimaregnskab-dashboard", "udforsk dit klimaregnskab", "data udtræk og eksport" | Et afsnit om dashboardet, udforskningen fra måned til kategori til den enkelte beregning (Scope 3 fordelt på de 15 GHG-kategorier) og et fold-ud "Dataudtræk: tag tallene med ud" |
| `rapportering` | `excel-rapport`, `pdf-rapport`, `modtagere`, `bestyrelsesrapport`, `investorrapport`, `bankrapport`, `samarbejdspartnere`, `temaer`, `brag-board` | "klimaregnskab som Excel- / PDF-rapport", "klimarapport til bestyrelse, bank og investorer", "ESG-rapport til investorer", "klimadata til banken", "del klimadata med samarbejdspartnere", "rapport-temaer", "Brag Board: offentlig ESG-profil" | Én rapport til bestyrelse, bank og investorer, som PDF eller Excel; de tre rapportstile Light, Dark og Consulting er nævnt på siden; et fold-ud ("Kunder, samarbejdspartnere og Bragboard") og et FAQ-svar dækker den offentlige profil med Brag Board-badge |
| `vsme-rapport` | `vsme-basis`, `vsme-comprehensive` | "VSME Basic", "VSME Comprehensive" | Basic- og Comprehensive-modulet, forskellen på dem og hvem der beder om hvad (som SEO-beskrivelsen siger det) |
| `audit-trail-og-revisor` | `audit-trail`, `revisor-adgang` | "audit trail til klimaregnskab", "revisor-adgang til klimaregnskab" | Linje-ID, spor til bilaget, hash-kæde, læseadgang og attestering for revisoren (SEO-beskrivelsen) |
| `reduktionsmaal-og-scenarier` | `tiltag`, `scenarier` | "reduktionstiltag og ROI", "scenarie-planlægger for klima" | Mål på det egne klimaregnskab med målkurve, tiltag som virksomheden selv skriver ind og en fremskrivning uden nye tiltag (SEO-beskrivelsen). Siden hed "Reduktionsmål og scenarier" og lovede en test af diesel mod el for varevogne. Scenarier findes ikke længere i produktet (reduktionsmålene blev bygget om i oktober 2026), så titlen er nu "Reduktionsmål og klimaplan". Adressen beholder "scenarier" bevidst: et nyt navn er en sidepensionering (redirect, `HISTORIC` og tællerne i `redirects.test.mjs`). **Den nye side bruger ikke ordet "ROI"** (kontrolleret i copyen), så en søgning på netop det udtryk har mistet sin landingsside, og ingen side tilbyder længere en scenarie-planlægger |
| `/kundetyper` (hub) | `frisoer` | "klimaregnskab for frisørsalon" | Et FAQ-svar om, at metoden er den samme for en salon, en butik eller et kontor |
| `/priser` | `store-virksomheder` | "klimaregnskab og CSRD for store virksomheder" | Pakkerne, hvor Business og Enterprise sælges efter en samtale |

En sammenlagt side, hvis gamle titler nævnte et bestemt navneord (et fag, en
rapporttype), er den, man skal holde øje med i Search Console: den præcise
søgefrase står nu i brødteksten og i et fold-ud i stedet for i en titel for sig.
Hvis en søgning tydeligt vokser ud af sit fold-ud, er det tid til en ny side og en
række af den omvendte slags (en destination, der får sin egen adresse igen), som
redirect-testen vil bede dig afklare.
