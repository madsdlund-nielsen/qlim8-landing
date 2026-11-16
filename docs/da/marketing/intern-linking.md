# Intern linking: regler og sådan skriver du et link

> Sidst opdateret: 2026-11-16 · Ejer: qlim8-teamet · Engelsk udgave: [`docs/en/marketing/internal-linking.md`](../../en/marketing/internal-linking.md)

Interne links fortæller læsere og søgemaskiner, hvilken side der svarer på næste spørgsmål. De sættes
ind i hånden, få ad gangen, på sider og artikler, der allerede læser godt. Her står ejerens regler og
fremgangsmåden for hvert sted, et link kan bo.

## Reglerne

1. **Højst 3 til 5 nye interne links pr. indlæg eller side.** Færre er fint. Et indlæg, der allerede
   har links, beholder dem. Grænsen gælder det, der kommer til.
2. **Spred dem ud over brødteksten.** Aldrig i en overskrift, aldrig i indledningssætningen (leadet)
   og aldrig inde i et link, der allerede findes.
3. **Link aldrig et indlæg til sig selv.**
4. **Link hvert mål én gang pr. indlæg.** Et mål, indlægget allerede når, tæller som til stede: en
   knap (en `cta`-blok, hero- eller afslutningsknappen på en side) eller en chip i "Relateret".
   Læg ikke endnu et link til det i teksten.
5. **Ankerteksten skal læse naturligt.** Link ord, der allerede står i sætningen. Omskriv ikke en
   sætning for at få et søgeord ind. Findes der intet naturligt anker, så lad linket udgå.
6. **Prioritér mål, der ligger 4 til 15 i Search Console.** En side, der allerede er tæt på første
   side, får mest ud af ét link mere. Sider uden for det interval linkes kun, hvor ankerordene nævner
   siden præcist.
7. **Vis ejeren en tabel først, og vent på OK.** Før nogen fil eller tekst i `/admin` ændres, sendes
   tabellen herunder. Intet redigeres, før ejeren har svaret.

### Tabellen, der vises først

| Kildeindlæg | Anker (præcis tekst) | Mål-URL | Målets søgeord og position |
|---|---|---|---|
| `/blog/scope-3-smv-guide` | spend-baserede faktorer | `/produkt/platform-og-overblik` | hvad er vsme (udledt), 15,4 |

Hvor søgeordet kommer fra: eksporten fra **Effektivitet** (Performance) i Search Console
(Søgeresultater, mindst 3 måneders periode, Eksportér til CSV eller Sheets). Den indeholder én fil
med forespørgsler og én med sider, og **de er ikke parret**: eksporten siger ikke, hvilket søgeord der
bragte en besøgende til hvilken side. Søgeordet i tabellen er derfor **udledt** af sidens emne, og
kolonnen skal sige det ("udledt"). Passer intet søgeord, står der "intet passende søgeord". Positionen er
sidens egen position fra sidefilen, sammen med visninger: en position på 2 visninger er tynd, og det
skal stå der.

## Hvor et link bor, og hvordan det skrives

Find først ud af, **hvilken tekst der er i luften**. Tekst udgivet i appens `/admin` vinder over dette
repository (se "Where the copy lives" i `CLAUDE.md`), og en rettelse i repoet ses så ikke.

```bash
curl -s "https://app.qlim8.com/api/public/cms/marketing/page.home?language=da"
curl -s "https://app.qlim8.com/api/public/cms/articles?language=da"
```

Et tomt `"copy":{}` betyder, at filen i repoet er det, besøgende ser.

### Marketingsider (brancher, produkttemaer, integrationer, hubs, /priser, /metodologi)

Skriv linket inde i den almindelige streng i copy-filen:

```ts
a: "Hvad hver pakke indeholder, står på [priserne](/priser).",
```

- Syntaksen er `[ankertekst](/sti)`. Stien starter med ét `/` og er en side på dette site.
  `/priser#raadgivere` og `/kontakt?emne=demo` virker. Alt andet (`https://...`, `priser`, `//host`,
  en manglende `)`) vises som almindelig tekst, og lint fejler på det.
- Det virker i de felter, der viser links: FAQ-svar, dybdeudfoldninger, introafsnittene, brødteksten i
  kort for funktioner, trin, grunde, tillid og valg, linjerne for udfordring og løsning, tabelnoten,
  hubbens forskelle, FAQ på /priser og afsnittene på /metodologi. Titler, resuméer, spørgsmål, hero,
  afslutning og CTA-felter viser ikke links, og lint siger det, hvis et bruges.
- En tom linje er stadig et afsnitsskift (`src/lib/paragraphs.ts`). Et link står inde i ét afsnit og
  krydser aldrig et skift.
- Linket vises som det samme salvie-grønne, understregede link som i en artikel. Sidens `.md`-udgave
  får `[anker](https://qlim8.com/sti)`. JSON-LD (FAQPage) og metatekst får kun ankerordene, uden
  markup.
- En prissætning i `[[ ... ]]` må rumme et link. Kendes prisen ikke, udgår hele sætningen, link
  med.

### Bundlede artikler (`src/content/<slug>.ts`)

En `paragraph`-blok viser tekst som tekst, så et link kræver en `richtext`-blok med rigtig HTML:

```ts
{ type: "richtext", html: '<p>Se hvad <a href="/priser">pakkerne</a> koster.</p>' },
```

Del de omkringliggende afsnit i `paragraph`, `richtext`, `paragraph` efter behov. Brug en relativ sti,
der starter med `/`. `.md`-udgaven beholder linket som `[tekst](https://qlim8.com/sti)`. Lint
fejler, hvis `[..](..)` eller `<a href>` står i en anden blok, fordi det ville blive vist som tekst.

### Artikler udgivet i `/admin`

Åbn **Blogindlæg**, åbn artiklen, markér ankerordene i editoren, tryk på knappen **Link**, og skriv
stien (`/priser`, en relativ sti virker). Gem (en kladde), og **udgiv**. Editoren gør selv et afsnit
med et link til en `richtext`-blok. Rettelsen er i luften inden for fem minutter. En bundlet
artikelfil, hvis slug også er udgivet i `/admin`, er død: ret den i `/admin`.

## Hvad vagterne tjekker

`npm run lint` kører `scripts/check-inline-links.mjs` over `src/content` og de indlæste sider og
artikler (reglen: `scripts/lib/inlineLinks.mjs`, tests: `scripts/lib/inlineLinks.test.mjs` og
`src/lib/inlineLinks.test.ts`). Den fejler, når et mål:

- ikke er en side, der findes (statisk side, hub, marketingside, bundlet artikel);
- er en udfaset adresse fra `src/content/marketing/redirects.json` eller `next.config.ts` (den virker,
  ét 301-hop senere, og hoppet koster linket vægt);
- er `/integrationer/appelsin`;
- er en adresse til tilmelding, registrering eller checkout (dem navngiver pakke-API'et, aldrig tekst);
- er `.md`-udgaven eller ender på skråstreg;
- er siden selv, eller det samme mål to gange på én side;
- står i et felt, der ikke viser links, eller er forkert skrevet (`[tekst](` uden gyldig sti).

Den advarer kun, når en side har over 5 indlejrede links, eller linker et mål, siden allerede når fra
en knap eller en chip i "Relateret", for regel 1 og 4 er ejerens at vurdere.

`npm run test:contract` (`scripts/check-cms-copy.mjs`) holder tekst udgivet i `/admin` til de samme
regler og fejler på et link til en sti, der ikke er en side.

En artikel, der kun findes i CMS'et (ingen fil i `src/content`), kan lint ikke se: læg dens slug i
`CMS_ONLY_ARTICLES` i `scripts/check-inline-links.mjs`, før der linkes til den.
