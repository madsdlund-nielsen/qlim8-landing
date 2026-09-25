Logoer til integrationsbåndet på forsiden (src/components/public/IntegrationsBand.tsx).
Listen over hvilke der vises, og hvorfor, står i src/content/integration-logos.ts.

Filerne er leverandørernes egne SVG'er (pressekit, sitets header eller deres
asset-CDN), uændrede bortset fra quickbooks.svg, hvor det hvide "qb" er gjort
til et hul med et filter. Båndet maler hver fil gennem en CSS-mask i én farve
fra paletten, så kun formen i filen tæller, ikke dens farver.

Nyt logo: brug leverandørens officielle fil, og tjek at intet i den er en hvid
flade tegnet oven på en farvet (den ville blive fyldt ud af masken). Tilføj
filen her og en linje i integration-logos.ts med viewBox-bredde og -højde.

Logoer er beskyttet af varemærkeret. Vi viser dem blot som integration
("henter data fra"), ikke som partnerskab, certificering eller endorsement.
Footer-disclaimeren "Logoer for tredjepartsintegrationer tilhører deres
respektive ejere" står i SiteFooter.tsx.
