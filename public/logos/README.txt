Logoer til integrationsbåndet på forsiden (src/components/public/IntegrationsBand.tsx).
Listen over hvilke der vises, og hvorfor nogle er udeladt, står i
src/content/integration-logos.ts.

Filerne er leverandørernes egne logoer i deres egne farver (pressekit, sitets
header eller deres asset-CDN), som SVG hvor leverandøren har en, og uændrede
bortset fra en tæt beskåret viewBox. Intega findes kun som PNG.
Farverne må ikke ændres: de brand-regler vi har fundet tillader et logo som
leveret, i farve, sort eller hvid, aldrig omfarvet. Båndet gør logoerne
ensartede med ens fliser og afstande, ikke med farve.

Nyt logo: tjek først leverandørens vilkår for brug af deres logo (varemærke-,
presse- og partnersider). Kræver de licens eller godkendelse, hører logoet ikke
hjemme her, men systemet kan stadig nævnes i tekst. Brug derefter
leverandørens officielle fil, og tilføj en linje i integration-logos.ts med
viewBox-bredde og -højde.

Logoer er beskyttet af varemærkeret. Vi viser dem blot som integration
("henter data fra"), ikke som partnerskab, certificering eller endorsement.
Footer-disclaimeren "Logoer for tredjepartsintegrationer tilhører deres
respektive ejere" står i SiteFooter.tsx.
