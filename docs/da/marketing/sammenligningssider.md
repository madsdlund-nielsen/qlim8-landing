# Sammenligningssider

## Hvad det er

Otte artikler af typen "[navn] alternativ" (Verarca, Grønlog, EcoMetrics, Wardn, Valified, Climaider, esgBRICKS og E-SG.cloud), to guider uden leverandørtabellen (Klimakompasset, som er et offentligt værktøj, og klimaregnskab i Excel, som er en metode), én side om de store klimaplatforme og ét hub, alle i kategorien `Sammenligning`. esgBRICKS og E-SG.cloud følger samme opskrift som de andre leverandørsider, mens Klimakompasset- og Excel-siden er guider med en bro til qlim8 og hverken står i tabellen eller har en post i `KORT_OM` og `VAELG`. Artiklerne er skrevet som almindelige udsagn. Der står ingen kildehenvisninger i teksten, fordi ejeren vil have sider, der læses som ren tekst.

## Hvor fakta bor

Alt, hvad der står om en konkurrent, ligger i `src/content/sammenligning/data.ts`:

- `FUNKTIONER` og `DANSKE`: tabellen med qlim8 og de syv danske leverandører (Verarca, Grønlog, EcoMetrics, Wardn, Valified, esgBRICKS og E-SG.cloud; 19 rækker).
- `STORE_FUNKTIONER` og `STORE`: tabellen på siden om de store platforme (16 rækker).
- `KORT_OM`: ét kort afsnit pr. leverandør (15), skrevet til at blive citeret ordret.
- `OPDATERET`: datoen, hvor cellerne sidst blev tjekket mod leverandørens egen hjemmeside. Verarca, Grønlog, EcoMetrics, Wardn og Valified blev læst den 23. november 2026, esgBRICKS og E-SG.cloud den 24. november 2026, og datoen under tabellen er den 24. november 2026.

Hver celle har et `svar` (`Ja`, `Nej`, `Delvist` eller `Ikke oplyst`), en kort `note` og en `kilde`. `kilde` er den adresse, svaret er læst fra. Den bliver aldrig vist, hverken i tabellen, i `.md`-tvillingen eller i JSON-LD. Den er der, så et udsagn kan dokumenteres, hvis en leverandør spørger. Tabellen bygges af `src/content/sammenligning/byg.ts`.

qlim8's egen kolonne kommer fra appens katalog og kode (`scripts/fixtures/public-packages.v4.json` og integrationskataloget), ikke fra en hjemmeside. En qlim8-pris står kun som pristoken i `[[ ... ]]`, så sætningen kan fjernes uden at resten går i stykker.

## Priserne på siden om de store platforme

Priserne er af tre slags, og tabellen og afsnittet "Sådan har vi fundet priserne" viser, hvilken der gælder for hver platform. Listepriser står offentligt (Persefoni og Terrascope på AWS Marketplace). Leverandørens eget prisniveau er et tal, leverandøren selv oplyser (Coolset og Greenly). Estimater er vores egne: Watershed ud fra købspriser, som Vendr har registreret, Position Green ud fra selskabets årsrapport for 2025 (abonnementsomsætning på 220 mio. norske kroner fordelt på over 1.000 kunder) og Plan A ved sammenligning med, hvad sammenlignelige europæiske platforme selv oplyser, hvilket er det svageste grundlag af de tre. Et estimat står altid som "estimeret" på siden. `VAELG` giver hver leverandør en linje om, hvornår den er det bedste valg, og står lige efter `KORT_OM`-afsnittet (hubben har sine egne). Der er 15 `VAELG`-tekster, lige så mange som `KORT_OM`.

## Reglen om Nej

En konkurrent er aldrig `Nej` uden leverandørens eget udsagn (en sprogliste, en planoversigt der kun har "Kontakt os"). Har leverandøren ikke sagt noget, er cellen `Ikke oplyst`. Tallet hentes ikke fra tredjepart. En `Nej` om en konkurrent skal have en `note`, og testen fejler uden.

## Sådan genverificerer du en celle

1. Åbn adressen i cellens `kilde`.
2. Sammenlign med cellen. Står udsagnet der stadig, så ret ikke noget.
3. Er det ændret, så ret `svar`, `note` og `kilde` i `data.ts`. Hold noten under 60 tegn.
4. Flyt `OPDATERET`, når du har gennemgået kilderne.
5. Kør `npm run lint`, `npm run typecheck` og `npm test`. `src/lib/sammenligning.test.ts` holder dataene til deres form (alle fire svarværdier, `Nej` kun med note, https-kilde på hvert svar undtagen `Ikke oplyst`, qlim8 først, ingen adresse i den viste tabel).

Skriver en leverandør til kontakt@qlim8.com, får cellen en rettelse efter samme fremgangsmåde.

## Kendte opfølgninger

- Valified relancerer sin platform den 3. december 2026. Tjek alle Valified-celler og priser før og efter.
- Climaider ApS er ifølge CVR-spejle under konkurs (konkurs erklæret 20. oktober 2026). Ejeren har bekræftet det, og siden er udgivet med qlim8's tilbud til Climaider-kunder. Der står ingen påstande om Climaiders produkt, og Climaider er ikke en kolonne i tabellen.
- qlim8's egen kolonne skal læses igen mod pakke-fixturen, når kataloget ændres (pakker, priser, hvad der er live eller planlagt).
- esgBRICKS og E-SG.cloud blev læst den 24. november 2026. Tjek pris og ordlyd igen ved næste gennemgang. esgBRICKS oplyser ingen pris for adgang til platformen alene, og siden skriver aldrig, at platformen ikke kan købes.
- Siderne nævner aldrig et versionsnummer på EFRAG's skabelon: qlim8 bruger som udgangspunkt den nyeste, og et nummer i teksten forældes ved næste udgave (ejerens regel, november 2026). Ingen side påstår, at qlim8 udfylder EFRAG's skabelon, før appens eksport følger den nyeste udgave. Siderne skriver "qlim8 laver VS-rapporten" og "en Excel-rapport med hver linje (dato, kategori, mængde, emissionsfaktor og kilde)". Excel-siden må fortælle, at EFRAG's egen skabelon hedder VS Digital Template, findes som XLSX-fil hos EFRAG og har dansk som sprogvalg.
- Siderne skriver ikke, hvor mange kunder en anden leverandør har, heller ikke når leverandøren selv oplyser tallet, som Valified gør (ejerens regel, november 2026). Den ene undtagelse er Position Greens kundetal fra årsrapporten, som står i afsnittet "Sådan har vi fundet priserne", fordi prisestimatet er regnet ud fra det.
