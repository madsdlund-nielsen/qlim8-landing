import type { Article } from './article'

export const artikel: Article = {
  slug: 'csrd-leverandoer-rapportering',
  title: 'Din store kunde er nu CSRD-pligtig — hvad det betyder for dig',
  description: 'CSRD trådte i kraft i 2024 for de største selskaber. De er nu i gang med at indsamle scope 3-leverandørdata, og deres spørgsmål er kommet til din indbakke. Sådan svarer du uden at sige nej til ordren.',
  category: 'Compliance',
  publishedAt: '2026-04-15',
  readingTime: 6,
  sections: [
    {
      type: 'lead',
      text: 'Du har sandsynligvis allerede modtaget e-mailen: en stor kunde — typisk en børsnoteret eller en kommune — beder om ESG-data, scope 3-tal eller udfyldelse af et spørgeskema. Forklaringen er CSRD: EU\'s Corporate Sustainability Reporting Directive trådte i kraft i 2024, og din kunde har nu indsamlingspligt opad mod sine leverandører.',
    },
    {
      type: 'paragraph',
      text: 'Det er ikke et valg længere. Hvis du leverer til CSRD-virksomheder og ikke kan svare på deres scope 3-spørgsmål, ryger du af leverandørlisten næste år. Her er præcis hvad der bliver spurgt om, hvorfor, og hvordan du svarer effektivt.',
    },

    { type: 'h2', text: 'Hvem er CSRD-pligtig?' },
    {
      type: 'paragraph',
      text: 'CSRD gælder i tre bølger:',
    },
    {
      type: 'list',
      items: [
        'Bølge 1 (rapportering for 2024): Børsnoterede selskaber med >500 ansatte. ~150 danske selskaber.',
        'Bølge 2 (rapportering for 2025): Større ikke-børsnoterede med >250 ansatte og >50 mio. EUR omsætning. Hundrede flere.',
        'Bølge 3 (rapportering for 2026): SMV\'er børsnoteret på et reguleret marked. Få danske selskaber.',
        'Frivilligt bagudvirkende: Ikke-børsnoterede SMV\'er kan rapportere via VSME hvis kunder kræver det.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Hvis du leverer til nogen i de første to bølger, så er du indirekte berørt. Din kunde rapporterer på scope 3, og scope 3 inkluderer dig.',
    },

    { type: 'h2', text: 'Hvad spørger CSRD-kunder typisk om?' },
    {
      type: 'paragraph',
      text: 'Der er normalt 4-6 tilbagevendende spørgsmål, du får serveret i et spørgeskema eller en leverandør-portal:',
    },
    { type: 'h3', text: '1. Scope 1 og 2-emissioner' },
    {
      type: 'paragraph',
      text: 'Hvad er dit samlede CO2-aftryk fra direkte emissioner (brændstof, gas) og indirekte energi (el, fjernvarme), opgjort i ton CO2e for sidste regnskabsår? De spørger om enten samlede tal eller intensitet (kg CO2/produceret enhed eller kg CO2/omsætning).',
    },
    { type: 'h3', text: '2. Datakvalitet og metode' },
    {
      type: 'paragraph',
      text: 'Hvilke emissionsfaktorer har du brugt? DEFRA, BEIS, Klimakompasset? Hvilken metode (GHG Protocol, ISO 14064)? Er tallene tredjepartsvalideret?',
    },
    { type: 'h3', text: '3. Reduktionsmål' },
    {
      type: 'paragraph',
      text: 'Har I et reduktionsmål? Hvor stort? Hvornår skal det nås? Validation under Science-Based Targets initiative (SBTi)?',
    },
    { type: 'h3', text: '4. Produkt-niveau-data (hvis relevant)' },
    {
      type: 'paragraph',
      text: 'For specifikke produkter eller services du leverer: er der et estimat på CO2-aftrykket per enhed? Dette er den sværeste — det kræver normalt en LCA (life cycle assessment).',
    },

    { type: 'h2', text: 'Hvad sker der hvis du IKKE svarer?' },
    {
      type: 'paragraph',
      text: 'CSRD-virksomheder skal rapportere scope 3 i deres bæredygtighedsrapport. Hvis de ikke får data fra dig, bruger de spend-baserede estimater (typisk Tier 4-5, dyre i CO2-tal). For dig som leverandør betyder det:',
    },
    {
      type: 'list',
      items: [
        'Du fremstår som "højrisiko-leverandør" i deres scope 3-fordeling',
        'Du ryger lavt på leverandør-evalueringer der vægter ESG-data',
        'I udbud taber du point sammenlignet med konkurrenter der svarer',
        'Hvis kontrakten fornys, kan ESG-rapportering blive en krav-betingelse',
      ],
    },

    { type: 'h2', text: 'Det smarte svar: standardiseret VSME-rapport' },
    {
      type: 'paragraph',
      text: 'I stedet for at udfylde fem forskellige leverandør-spørgeskemaer (hver med eget format), så lever én VSME-rapport. EFRAG har designet VSME specifikt så den kan bruges som standardsvar fra SMV\'er til CSRD-kunder.',
    },
    { type: 'h3', text: 'Sådan virker det' },
    {
      type: 'ordered-list',
      items: [
        'Du producerer en VSME-rapport (Basis eller Comprehensive)',
        'Når en CSRD-kunde sender et spørgeskema, sender du VSME-rapporten som svar',
        'CSRD-kunden mapper dine data ind i deres ESRS-rapport',
        'Du behøver kun at udfylde ét sæt data per år',
      ],
    },
    {
      type: 'callout',
      text: 'Pro tip: Lav rapporten offentlig på din hjemmeside. Så slipper alle kunder for at spørge — de kan downloade den selv. Det er præcis sådan store leverandører gør i dag.',
    },

    { type: 'h2', text: 'Hvor stort er problemet egentlig?' },
    {
      type: 'paragraph',
      text: 'Vi har set i kundefeedback at SMV\'er, der leverer til CSRD-kunder, gennemsnitligt modtager 3-7 forskellige ESG-spørgeskemaer per år. Hvert spørgeskema tager 2-5 timer at udfylde — det er 15-35 timer årligt brugt på at gentage de samme svar i forskellige formater.',
    },
    {
      type: 'paragraph',
      text: 'Med en standardiseret VSME-rapport reduceres det til 2-3 timer årligt på selve rapporten, plus 15 minutter per forespørgsel (forwarde dokumentet). Det er en realt time-saver, ikke marginal.',
    },

    { type: 'h2', text: 'Hvad gør du nu?' },
    {
      type: 'ordered-list',
      items: [
        'Lav en VSME Basis-rapport for sidste regnskabsår (gør det i en platform — Excel er smerten ikke værd)',
        'Læg den på din hjemmeside som PDF + maskinlæsbar XBRL',
        'Send linket næste gang en kunde spørger',
        'Opdater årligt med samme metode',
      ],
    },
    {
      type: 'paragraph',
      text: 'CSRD ramte din indbakke i 2025. Senest 2027 vil det være standard for alle SMV\'er der leverer til større danske virksomheder. Du kan vælge at være forberedt eller blive overrasket.',
    },

    {
      type: 'cta',
      heading: 'qlim8 producerer VSME-rapporter du kan dele',
      text: 'VSME Basis er inkluderet i Starter-planen. Premium-planen tilføjer Comprehensive med scope 3 og offentlig profil-deling — så dine CSRD-kunder kan downloade rapporten direkte.',
      buttonText: 'Se priser',
      buttonHref: '/priser',
    },
  ],
}
