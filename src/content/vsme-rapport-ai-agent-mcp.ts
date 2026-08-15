import type { Article } from './article'

export const artikel: Article = {
  slug: 'vsme-rapport-ai-agent-mcp',
  title: 'Derfor byggede vi en MCP-server til VSME-rapportering',
  description:
    'Vi har givet qlim8 en indbygget MCP-server, så Claude og ChatGPT kan hente dit klimaregnskab og starte VSME-rapporten. Her er hvorfor, hvad den kan, og hvad vi bevidst ikke lod den gøre.',
  category: 'Integration',
  publishedAt: '2026-08-15',
  readingTime: 9,
  sections: [
    {
      type: 'lead',
      text: 'De fleste, der skal lave en VSME-rapport, har ikke lyst til at lære et dashboard at kende. De vil vide, hvad tallet er, og om banken kan få det på fredag.',
    },
    {
      type: 'paragraph',
      text: 'Derfor har vi bygget en MCP-server ind i qlim8. Den gør, at du kan spørge din egen AI-assistent, altså Claude eller ChatGPT, om dit klimaregnskab, og få svar hentet direkte fra dine egne tal. Ikke et gæt, ikke et gennemsnit for branchen: dine posteringer, dine emissionsfaktorer, dit regnskabsår.',
    },
    {
      type: 'paragraph',
      text: 'Det her er en teknisk artikel om et valg, vi har truffet. Hvis du bare vil i gang, er vejledningen på /docs/mcp-quickstart kortere end den her tekst.',
    },

    { type: 'h2', text: 'Hvad MCP er, uden fagsprog' },
    {
      type: 'paragraph',
      text: 'MCP står for Model Context Protocol. Det er en åben standard for, hvordan en AI-assistent henter data fra et system, den ikke selv ejer. Før den fandtes, havde du to muligheder, hvis du ville have en assistent til at svare på noget om dine egne data: enten kopierede du tallene ind i chatten manuelt, eller også fik du en udvikler til at bygge en integration.',
    },
    {
      type: 'paragraph',
      text: 'Den første mulighed er langsom og fejlbehæftet. Den anden koster penge og tid, og den skal vedligeholdes hver gang enten API\'et eller assistenten ændrer sig. MCP fjerner begge problemer ved at standardisere formatet: qlim8 beskriver, hvilke opslag der findes, og assistenten finder selv ud af, hvilket den skal bruge.',
    },
    {
      type: 'callout',
      text: 'I praksis: du skriver "hvor stor en del af vores Scope 3 kommer fra de fem største leverandører?" i Claude, og den henter svaret fra qlim8, mens du venter.',
    },

    { type: 'h2', text: 'Hvorfor det giver særlig mening for VSME' },
    {
      type: 'paragraph',
      text: 'En VSME-rapport er ikke ét tal. Den er et opslagsværk. Basis-modulet dækker afsnittene B1 til B11: stamdata, energiforbrug, drivhusgasser, reduktionsmål og klimapolitikker. Comprehensive lægger C1 til C9 oveni med strategi, risici, governance og en langt bredere social del.',
    },
    {
      type: 'paragraph',
      text: 'Det betyder, at arbejdet med rapporten består af mange små opslag. Hvad var vores samlede energiforbrug? Hvordan fordeler Scope 3 sig på GHG-protokollens 15 kategorier? Hvilken faktor ligger bag den her post? Hver gang nogen spørger, skal nogen ind i systemet og finde det.',
    },
    {
      type: 'paragraph',
      text: 'Det er præcis den type arbejde, en assistent er god til at fjerne. Ikke fordi den er klogere end dig, men fordi den kan slå tredive ting op, mens du skriver én sætning.',
    },

    { type: 'h2', text: 'Hvad serveren faktisk kan' },
    {
      type: 'paragraph',
      text: 'Overfladen er 31 tools, 3 resources og 3 prompts. De vigtigste for VSME-arbejdet er:',
    },
    {
      type: 'list',
      items: [
        'get_emissions_summary: samlet CO2e fordelt på Scope 1, 2 og 3, eller måned for måned.',
        'get_emissions_by_scope3_category: Scope 3 delt op på GHG-protokollens 15 kategorier, den samme opdeling EFRAG-arket udfyldes med.',
        'get_emission_lineage: hele sporet for en enkelt postering, fra kildeaktivitet over emissionsfaktor til audit-hashes.',
        'get_factor_citations: hvilke posteringer der har brugt en bestemt faktor, så revisoren kan tjekke efter uden at bede om et udtræk.',
        'generate_report: starter en VSME Basis, VSME BP eller VSME Comprehensive-rapport for et rapportår, som PDF eller Excel.',
        'get_report_status: følger render-jobbet, til filen er klar.',
        'get_report_attestations: tredjeparts-underskrifter, låst til den præcise version revisoren skrev under på.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Comprehensive-rapporten er værd at fremhæve, fordi den ikke er en PDF, vi selv har designet. Vi udfylder EFRAG\'s eget regneark celle for celle, så arkets indbyggede valideringsfane kvitterer for hver påkrævet række. Scope 3 lander i cellerne for de 15 kategorier, ikke som ét samlet tal.',
    },

    { type: 'h2', text: 'Det vi bevidst ikke lod den gøre' },
    {
      type: 'paragraph',
      text: 'Da vi begyndte, var det fristende at lade assistenten skrive hele rapporten. Det gør den ikke, og det er et valg, ikke en mangel.',
    },
    {
      type: 'paragraph',
      text: 'De narrative afsnit i VSME, altså politikker, risikovurderinger og governance, handler om, hvad jeres virksomhed faktisk gør. De kan ikke udledes af et regnskab. En sprogmodel, der bliver bedt om at udfylde dem, vil skrive noget plausibelt, og plausibelt er præcis det forkerte i et dokument, banken læser som en erklæring. Så assistenten henter tallene og starter rapporten. Teksten om jeres politikker skriver I selv, i rapport-guiden.',
    },
    {
      type: 'paragraph',
      text: 'Det andet, vi holdt igen på, er skriveadgang. Hvert tool bærer en markering af, om det kun læser eller ændrer data, og kræver et bestemt scope. Forbinder du Claude eller ChatGPT via OAuth, er adgangen read-only som udgangspunkt, og consent kan kun gives af en administrator. Alt, der ændrer noget, skrives i den samme tamper-evidente audit-kæde som resten af platformen, markeret "via mcp", så det kan spores bagefter.',
    },
    {
      type: 'callout',
      text: 'Et system, der laver klimaregnskab, skal kunne bevise hvor hvert tal kommer fra. Det bliver ikke mindre vigtigt, fordi det er en agent, der har rørt ved det.',
    },

    { type: 'h2', text: 'Sådan kommer du i gang' },
    {
      type: 'ordered-list',
      items: [
        'Opret eller log ind på din qlim8-konto. MCP-adgang kræver Premium.',
        'I Claude: Indstillinger, Connectors, Tilføj custom connector, og indsæt https://app.qlim8.com/api/mcp. Der er ingen nøgle at kopiere: OAuth klarer resten.',
        'I ChatGPT: aktivér udviklertilstand under Apps og tilføj samme adresse.',
        'Bruger du Claude Code eller Cursor, peger du klienten på samme adresse med en Bearer-nøgle fra Collectors, API Keys.',
        'Spørg om noget: "hvad var vores samlede CO2e i 2025 fordelt på scope?"',
      ],
    },
    {
      type: 'paragraph',
      text: 'Vil du læse overfladen igennem, før du forbinder noget, ligger hele tool-kataloget offentligt og uden login på https://app.qlim8.com/api/mcp/schema.',
    },

    { type: 'h2', text: 'Hvorfor vi skriver det her ned' },
    {
      type: 'paragraph',
      text: 'Der er en praktisk grund til, at denne artikel findes. Vi opdagede, at en AI-søgning efter dansk VSME-software med MCP-server skulle bruge tre forsøg på at finde os. Ikke fordi funktionen ikke fandtes, men fordi vi aldrig havde skrevet de to ting i samme sætning noget sted, en model kunne læse.',
    },
    {
      type: 'paragraph',
      text: 'Det er værd at holde fast i, hvis du selv bygger noget: en funktion, der ikke er beskrevet der, hvor nogen leder, er svær at skelne fra en funktion, der ikke findes.',
    },
    {
      type: 'cta',
      heading: 'Prøv det med dine egne tal',
      text: 'Opret en gratis konto, forbind dit regnskabssystem, og spørg din assistent om dit Scope 3.',
      buttonText: 'Opret gratis konto',
      buttonHref: 'https://app.qlim8.com/auth?tab=register',
    },
  ],
}
