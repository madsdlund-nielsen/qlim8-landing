## Indhold og tone

- Skriv på dansk, i du-form, i øjenhøjde og uden indviklet fagsprog. Afsenderen er et menneske, der har god tid: "Du står aldrig alene", "Vi hjælper dig trygt over målstregen", "Få ro i maven og styr på kravene".
- Tal til tryghed, stabilitet og lav risiko. Fortæl hvad kunden får (ro, overblik, hjælp), ikke hvad systemet kan.
- Skriv knapper som en venlig invitation: "Kom gratis i gang, helt uden binding", "Tag en uformel snak (Book 15 min)", "Ring direkte på +45 93 90 13 84". Undgå "Prøv nu!", "Køb i dag" og "Optimer din ROI".
- Sæt altid en tryghedslinje direkte under hoved-CTA'en (komponenten `TrustLine`): "Ingen binding · Tager 2 minutter · Vi hjælper dig i gang".
- Brug normal brug af store og små bogstaver. Ingen versaler på hele sætninger, ingen udråbstegn, ingen emoji.
- Brug aldrig lang tankestreg (em-dash, —). Kort tankestreg med mellemrum (–) må bruges, hvor dansk grammatik kalder på den, men brug komma, kolon eller punktum, hvor de passer ("Kom gratis i gang, helt uden binding"). Tankestreg som fast pynt læser som maskinskrevet tekst.
- Nævn tredjepartssystemer ved navn ("e-conomic", "Dinero", "Billy", "Energinet"). Vis logoer kun som integration, aldrig som partnerskab.
- Skriv tal på dansk: punktum som tusindtalsmærke, komma som decimal, mellemrum før procenttegn.

## Visuelle grundprincipper

- Paletten er rolig, naturlig og tillidsvækkende. Undgå kold virksomhedsblå, skarpe neonfarver og mørke tech-baggrunde. Kun lyst tema.
- Stable flader i denne rækkefølge: `color-background` til siden, `color-card` til kort og paneler, `color-band` til alternative sektioner og tillidsbokse, `color-sand` til citater og sekundære knapper.
- Skriv overskrifter i `color-primary` (skovgrøn) og brødtekst i `color-foreground`. Sekundær tekst og forklaringer bruger `color-muted-foreground`. Brug aldrig ren sort.
- `color-accent` (salvie) er til ikoner, flueben, badges og links. `color-warm` (terracotta) bruges sparsomt og aldrig som tekst: den består ikke 4,5:1. Den rigtige farve til varm tekst er `color-warm-ink`.
- Kanter: `color-border` er kun pynt (1,2:1). Hvor en kant markerer en knap eller et felt, bruges `color-border-strong`. Fokus vises med en massiv 2px `color-focus-ring` med 2px afstand.
- Skriv H1 til H3 i Fraunces (`type-h1`, `type-h2`, `type-h3`, vægt 500, aldrig ultra-bold) og alt andet i Source Sans 3 (`type-body`, `type-lead`, `type-body-sm`, `type-trust`, `type-button`). Brug linjehøjde 1,6 til 1,75 og hold brødtekst mellem 55 og 75 anslag (`measure-body`).
- Runde hjørner: `radius-md` (8px) på knapper og felter, `radius-lg` (12px) på kort og paneler. Aldrig spidse 90-graders hjørner og aldrig 50px-piller på store flader.
- Eneste skygge er `shadow-soft`, meget blød og diffus. Brug hellere luft end linjer.
- Luft: `space-section` (80px) eller `space-section-lg` (100px) lodret mellem sektioner på desktop, `space-6` i kort, `space-8` mellem kort. Siden må ikke føles tætpakket med dashboard-widgets, grafer og datafelter.
- Ingen bevægelse ud over rolige overgange på knapper (0,2 sekunder).

## Billeder

- Vælg autenticitet frem for perfektion. Ingen stockfotos af jakkesæt og håndtryk foran glasskyskrabere. Brug ægte fotografier med naturligt dagslys, træoverflader, planter og afslappet arbejdstøj.
- Sæt mennesker foran software. Vis et skærmbillede af qlim8 i en situation (en person ved et skrivebord med en kaffekop, der kigger roligt på skærmen), aldrig som et isoleret, tæt dashboard.
- Kontaktportræt: lyst træbord, kroppen let lænet frem, direkte øjenkontakt og et roligt smil, uformel dæmpet mørkegrøn eller marineblå striktrøje, blød baggrund med plante eller træ.

## Ikoner

- Brug tynde til mellemtykke linjeikoner med afrundede ender (stroke round), 1,75 til 2px streg, fra Lucide eller Phosphor, i `color-accent`. Intet ikonsæt ligger i dette system: forhåndsvisningerne bruger egne enkle linjeikoner af samme type. Ingen emoji.

## Logo

- Brug `assets/logo/qlim8-laas-primaer.svg` på lyse flader og `qlim8-laas-invers.svg` på `color-primary`. Brug ordmærkerne `qlim8-ordmaerke-primaer.svg` og `qlim8-ordmaerke-invers.svg`, når pladsen er lille.
- Genfarv, stræk og omform aldrig logoet, og sæt det ikke i grønt. Ink for hver variant står i `assets/logo/README.md`.

## Sektioner

Siden bygges af komponenterne i denne rækkefølge: `Hero`, `IntegrationCard`, `TrustCard`, `StepCard`, `Quote` med `ContactBox`, `ClosingCta`. Hver sektion har én overskrift (H2), ét budskab og højst to knapper.
