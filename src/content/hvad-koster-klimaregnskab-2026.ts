import type { Article } from './article'

export const artikel: Article = {
  slug: 'hvad-koster-klimaregnskab-2026',
  title: 'Hvad koster et klimaregnskab i 2026? Konsulent vs. platform vs. gør-det-selv',
  description: 'En sammenligning af de tre måder en dansk SMV kan komme i mål med klimaregnskab — konsulenter, software-platform eller manuelle regneark. Konkrete priser, tidsforbrug og hvor du sandsynligvis ender med at fortryde.',
  category: 'Økonomi',
  publishedAt: '2026-05-10',
  readingTime: 6,
  sections: [
    {
      type: 'lead',
      text: 'Klimaregnskab er gået fra "noget de store laver" til "noget banken kræver". Med L193 i kraft og CSRD-leverandørkrav væltende ind, står de fleste SMV-ejere med samme spørgsmål: Hvad koster det her egentligt at få lavet?',
    },
    {
      type: 'paragraph',
      text: 'Det korte svar: et sted mellem 0 kr og 250.000 kr. Det lange svar afhænger af hvilken løsning du vælger, hvor præcis rapporten skal være, og hvor meget af det manuelle arbejde du selv vil lave. I denne artikel giver vi de reelle 2026-priser på tre approaches og fortæller, hvor du sandsynligvis ender med at fortryde.',
    },

    { type: 'h2', text: 'Option 1: ESG-konsulent' },
    {
      type: 'paragraph',
      text: 'Den klassiske tilgang. Du hyrer en konsulent (eller et konsulenthus), som indsamler data fra dit regnskab, fra dine leverandører og fra dig selv, kategoriserer det, og leverer en PDF-rapport.',
    },
    { type: 'h3', text: 'Pris i 2026' },
    {
      type: 'list',
      items: [
        'SMV med <5 mio. omsætning: 40.000-80.000 kr for en VSME-rapport',
        'Mellemstor virksomhed med <50 mio. omsætning: 80.000-200.000 kr',
        'Større med scope 3-fokus: 200.000+ kr',
        'Halvårlige/kvartalsvise opdateringer: typisk 50-70% af first-time-prisen',
      ],
    },
    { type: 'h3', text: 'Hvor du fortryder' },
    {
      type: 'paragraph',
      text: 'Konsulenter leverer en PDF. Det de IKKE leverer er kontinuerlig data, opdaterede tal når bankrådgiveren ringer i februar, eller mulighed for at give kunder (CSRD-virksomheder) maskinlæsbar leverandørdata. Du betaler igen næste år.',
    },

    { type: 'h2', text: 'Option 2: Gør-det-selv i Excel' },
    {
      type: 'paragraph',
      text: 'Den gratis tilgang. Du downloader Klimakompasset eller en GHG Protocol-skabelon, henter emissionsfaktorer fra DEFRA/BEIS, klipper data fra Dinero, og kategoriserer manuelt.',
    },
    { type: 'h3', text: 'Pris i 2026' },
    {
      type: 'list',
      items: [
        'Software: 0 kr (Excel/Google Sheets)',
        'Emissionsfaktorer: 0 kr (offentligt tilgængelige)',
        'Eget tidsforbrug: 40-80 timer for første rapport, 20-30 timer pr. årlig opdatering',
        'Effektiv timepris for en CFO/ejer: ~15.000-30.000 kr i first-year-arbejde',
      ],
    },
    { type: 'h3', text: 'Hvor du fortryder' },
    {
      type: 'paragraph',
      text: 'Det starter fint. Så bliver det 1.247 posteringer, du skal kategorisere manuelt. Du laver fejl. Banken spørger ind til en specifik post, og du kan ikke finde din egen formel. Næste år starter du forfra fordi du ikke kan huske, hvordan du gjorde sidst. Audit-trail eksisterer ikke.',
    },

    { type: 'h2', text: 'Option 3: Software-platform (som qlim8)' },
    {
      type: 'paragraph',
      text: 'Den moderne tilgang. Du forbinder dit regnskabssystem (Dinero/Billy/e-conomic) og Eloverblik. Platformen henter data, kategoriserer automatisk, og leverer en VSME-rapport når du vil have den.',
    },
    { type: 'h3', text: 'Pris i 2026' },
    {
      type: 'list',
      items: [
        'qlim8 Starter: 250 kr/md ved årligt (3.000 kr/år)',
        'qlim8 Premium: 625 kr/md ved årligt (7.500 kr/år)',
        'qlim8 Enterprise: Kontakt salg',
        'Andre platforme: 800-3.000 kr/md afhængigt af modulvalg',
        'Tidsforbrug: 2-4 timer onboarding, 1-2 timer/måned vedligehold',
      ],
    },
    { type: 'h3', text: 'Hvor du fortryder' },
    {
      type: 'paragraph',
      text: 'Hvis du vælger en platform der "også" laver ESG (uden specialfokus), ender du med kludeløsninger. Hvis du vælger en specialiseret platform, er der typisk lock-in via custom dataformater. Vælg en der eksporterer i åbne formater (VSME, CSV, JSON).',
    },

    {
      type: 'callout',
      text: 'Tommelfingerregel: Konsulent giver mest mening hvis ESG er en éngangsting. Platform giver mest mening hvis din bank, dine kunder eller din bestyrelse forventer tal hvert kvartal — som de gør efter L193.',
    },

    { type: 'h2', text: 'Total cost of ownership over 3 år' },
    {
      type: 'paragraph',
      text: 'Lad os regne. En typisk dansk SMV med 15-25 ansatte og ~20 mio. i omsætning over 3 år, der har behov for årlig rapportering plus halvårlige bankmøder:',
    },
    {
      type: 'list',
      items: [
        'Konsulent (rapport + halvårlige opdateringer): 60.000 + 30.000 + 30.000 = 120.000 kr × 3 = 360.000 kr',
        'Gør-det-selv: 25.000 kr i eget tidsforbrug × 3 år = 75.000 kr (plus risikoen)',
        'qlim8 Premium: 7.500 kr/år × 3 = 22.500 kr',
      ],
    },
    {
      type: 'paragraph',
      text: 'Forskellen er ikke marginal. Forskellen er 95% reduktion i omkostninger sammenlignet med konsulenter, og fuld kontrol over data sammenlignet med Excel-løsningen.',
    },

    {
      type: 'cta',
      heading: 'Se hvad qlim8 koster for jeres setup',
      text: 'Tre planer, alle på under 1.000 kr/md. Ingen onboarding-gebyr, ingen lock-in. Opsig hvornår som helst.',
      buttonText: 'Se priser',
      buttonHref: '/priser',
    },
  ],
}
