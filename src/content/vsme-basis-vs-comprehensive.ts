import type { Article } from './article'

export const artikel: Article = {
  slug: 'vsme-basis-vs-comprehensive',
  title: 'VSME Basis vs Comprehensive: Hvilken version skal din SMV bruge?',
  description: 'EFRAG har defineret to versioner af VSME-standarden: Basis og Comprehensive. De fleste SMV\'er kan nøjes med Basis, men kunder under CSRD efterspørger Comprehensive. Sådan vurderer du hvilken version din virksomhed har brug for.',
  category: 'Compliance',
  publishedAt: '2026-05-05',
  readingTime: 7,
  sections: [
    {
      type: 'lead',
      text: 'VSME — Voluntary SME standard — er EFRAG\'s svar på "hvad gør de små virksomheder?". Den findes i to versioner: Basis og Comprehensive. Forskellen handler ikke om kvalitet, men om hvor mange datafelter du udfylder og hvor langt du går ned i scope 3.',
    },
    {
      type: 'paragraph',
      text: 'Hvis du sidder med et bankmøde i kalenderen eller en CSRD-kunde der har sendt dig et leverandør-spørgeskema, så er VSME den ramme du sandsynligvis ender med at bruge. I denne artikel ser vi præcis hvad der ligger i hver version, hvornår du har brug for hvilken, og hvad det betyder for jer.',
    },

    { type: 'h2', text: 'Hvad er VSME overhovedet?' },
    {
      type: 'paragraph',
      text: 'VSME blev godkendt af EFRAG i 2024 som en frivillig ESG-rapporteringsstandard målrettet SMV\'er. Den er designet til at være "ledig fra konsulentlås" — du kan udfylde den selv hvis du har data fra dit regnskab og dit el-forbrug. Den dækker både miljø (E), social (S) og governance (G), med fokus på det miljømæssige.',
    },
    {
      type: 'paragraph',
      text: 'Pointe: VSME er frivillig på papiret. I praksis er den hurtigt blevet de facto-standarden for SMV-ESG i Danmark, fordi banker og CSRD-kunder anerkender den.',
    },

    { type: 'h2', text: 'VSME Basis: 11 metrikker, intet drama' },
    {
      type: 'paragraph',
      text: 'Basis er minimum. Den dækker de essentielle ESG-tal, banken og kunderne typisk efterspørger.',
    },
    { type: 'h3', text: 'Det skal du rapportere' },
    {
      type: 'ordered-list',
      items: [
        'Energiforbrug (kWh) opdelt på elektricitet, fjernvarme, gas, brændstof',
        'Andel vedvarende energi i forbruget',
        'Scope 1-emissioner (direkte: brændstof, gas, køretøjer)',
        'Scope 2-emissioner (indirekte: el, fjernvarme)',
        'Vandforbrug',
        'Affaldsmængde opdelt på kategorier',
        'Antal ansatte (FTE)',
        'Lønspænd (CEO-ratio)',
        'Personskader på arbejdspladsen',
        'Brud på arbejdsmiljølovgivning (hvis nogen)',
        'Whistleblower-ordning (ja/nej)',
      ],
    },
    {
      type: 'callout',
      text: 'Vigtigt: VSME Basis kræver ikke scope 3. Det er den primære grund til at de fleste SMV\'er starter her — scope 3 er det dyre, langsomme arbejde.',
    },

    { type: 'h2', text: 'VSME Comprehensive: Tilføj scope 3 og strategi' },
    {
      type: 'paragraph',
      text: 'Comprehensive bygger ovenpå Basis. Den tilføjer scope 3, strategiske indikatorer, og dybere governance-dokumentation.',
    },
    { type: 'h3', text: 'Det skal du rapportere udover Basis' },
    {
      type: 'list',
      items: [
        'Scope 3-emissioner (typisk de 3-5 vigtigste kategorier: indkøbte varer/services, transport, affald)',
        'Klimarisikovurdering (hvilke risici har klimaforandringer for jeres forretning?)',
        'Reduktionsmål og handlingsplan (kvantificerbart, med deadline)',
        'Biodiversitet og naturpåvirkning',
        'Cirkularitet og ressourceforbrug',
        'Detaljeret governance: bestyrelsesdiversitet, anti-korruption, leverandørkrav',
        'Skattepolitik og offentliggørelse',
      ],
    },

    { type: 'h2', text: 'Hvornår har du brug for Comprehensive?' },
    { type: 'h3', text: 'Du har brug for Comprehensive hvis...' },
    {
      type: 'list',
      items: [
        'Du leverer til en CSRD-virksomhed der efterspørger scope 3-leverandørdata',
        'Din bestyrelse eller investor kræver reduktionsmål med tidshorisont',
        'Du går efter offentlige udbud hvor ESG-pointgivning indgår',
        'Du er ved at træde ind i en CSRD-kæde inden 2028 og vil være forberedt',
      ],
    },
    { type: 'h3', text: 'Du kan nøjes med Basis hvis...' },
    {
      type: 'list',
      items: [
        'Banken kun beder om "et klimaregnskab" uden specifikke scope 3-felter',
        'Dine kunder ikke er CSRD-pligtige (typisk under 50 mio. EUR omsætning)',
        'Det er din første ESG-rapport og du vil etablere baseline før du går dybere',
      ],
    },

    { type: 'h2', text: 'Realistisk tidsforbrug' },
    {
      type: 'paragraph',
      text: 'Det største praktiske spørgsmål: hvor lang tid tager det? Med en moderne platform der trækker data automatisk fra regnskab og Eloverblik:',
    },
    {
      type: 'list',
      items: [
        'VSME Basis første gang: 4-8 timer (kategorisering + manuel review)',
        'VSME Basis vedligehold per kvartal: 1-2 timer',
        'VSME Comprehensive første gang: 12-20 timer (scope 3 + strategi)',
        'VSME Comprehensive vedligehold: 3-4 timer/kvartal',
      ],
    },
    {
      type: 'paragraph',
      text: 'Til sammenligning: en konsulent bruger 40-80 timer på første rapport, og du betaler for hver eneste.',
    },

    {
      type: 'cta',
      heading: 'qlim8 dækker både Basis og Comprehensive',
      text: 'Starter-planen leverer VSME Basis. Premium tilføjer Comprehensive med scope 3 og strategiske moduler. Skift mellem dem når dine behov ændrer sig.',
      buttonText: 'Se hvad der er inkluderet',
      buttonHref: '/priser',
    },
  ],
}
