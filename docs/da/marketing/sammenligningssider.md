# Sammenligningssider

## Hvad det er

Seks artikler af typen "[navn] alternativ" (Verarca, Grønlog, EcoMetrics, Wardn, Valified og Climaider), én side om de store klimaplatforme og ét hub, alle i kategorien `Sammenligning`. Artiklerne er skrevet som almindelige udsagn. Der står ingen kildehenvisninger i teksten, fordi ejeren vil have sider, der læses som ren tekst.

## Hvor fakta bor

Alt, hvad der står om en konkurrent, ligger i `src/content/sammenligning/data.ts`:

- `FUNKTIONER` og `DANSKE`: tabellen med de fem danske leverandører (19 rækker).
- `STORE_FUNKTIONER` og `STORE`: tabellen på siden om de store platforme (16 rækker).
- `KORT_OM`: ét kort afsnit pr. leverandør (13), skrevet til at blive citeret ordret.
- `OPDATERET`: datoen, hvor cellerne sidst blev tjekket mod leverandørens egen hjemmeside.

Hver celle har et `svar` (`Ja`, `Nej`, `Delvist` eller `Ikke oplyst`), en kort `note` og en `kilde`. `kilde` er den adresse, svaret er læst fra. Den bliver aldrig vist, hverken i tabellen, i `.md`-tvillingen eller i JSON-LD. Den er der, så et udsagn kan dokumenteres, hvis en leverandør spørger. Tabellen bygges af `src/content/sammenligning/byg.ts`.

qlim8's egen kolonne kommer fra appens katalog og kode (`scripts/fixtures/public-packages.v4.json` og integrationskataloget), ikke fra en hjemmeside. En qlim8-pris står kun som pristoken i `[[ ... ]]`, så sætningen kan fjernes uden at resten går i stykker.

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
- Climaider ApS er ifølge CVR-spejle under konkurs (konkurs erklæret 20. oktober 2026). Det er ikke bekræftet på virk.dk eller i Statstidende, så siden udgives først, når ejeren har bekræftet det. Der står ingen påstande om Climaiders produkt.
- qlim8's egen kolonne skal læses igen mod pakke-fixturen, når kataloget ændres (pakker, priser, hvad der er live eller planlagt).
