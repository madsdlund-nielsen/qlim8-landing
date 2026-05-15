import type { Article } from './article'

export const artikel: Article = {
  slug: 'scope-3-smv-guide',
  title: 'Scope 3 for SMV\'er — en pragmatisk guide til den svære del',
  description: 'Scope 3 er det der får alle til at give op. Men du behøver ikke at dække alle 15 kategorier — for de fleste SMV\'er er 3-4 kategorier nok til at få banken og kunderne med. Sådan starter du uden at drukne.',
  category: 'Scope 3',
  publishedAt: '2026-04-22',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'Scope 1 er nemt — det er det du brænder selv. Scope 2 er overkommeligt — det er det el-måleren viser. Scope 3 er der hvor det går galt. Det er alt det andet: dine leverandører, dine kunders brug af dine produkter, transporten, affaldet, forretningsrejserne. 15 kategorier ifølge GHG Protocol.',
    },
    {
      type: 'paragraph',
      text: 'Den gode nyhed: ingen SMV behøver at dække alle 15. Den dårlige nyhed: bankerne og dine CSRD-kunder spørger snart efter scope 3. I denne artikel ser vi præcist hvilke kategorier du SKAL dække, hvilke der er nice-to-have, og hvordan du bygger en pragmatisk scope 3-tilgang der virker for en virksomhed med 15-50 ansatte.',
    },

    { type: 'h2', text: 'De 15 scope 3-kategorier (kort)' },
    {
      type: 'paragraph',
      text: 'GHG Protocol definerer 15 scope 3-kategorier. Her er hele listen — du skal IKKE rapportere på alle:',
    },
    {
      type: 'ordered-list',
      items: [
        'Indkøbte varer og services (oftest den største)',
        'Kapitalgoder (maskiner, IT, bygninger)',
        'Brændstof- og energirelaterede aktiviteter (upstream af scope 1+2)',
        'Upstream transport (varer ind til dig)',
        'Affald genereret i drift',
        'Forretningsrejser',
        'Ansattes pendling',
        'Upstream leasede aktiver',
        'Downstream transport (varer ud til kunder)',
        'Forarbejdning af solgte produkter',
        'Brug af solgte produkter (typisk størst for B2C)',
        'End-of-life af solgte produkter',
        'Downstream leasede aktiver',
        'Franchises',
        'Investeringer',
      ],
    },

    { type: 'h2', text: 'De 3-4 kategorier du SKAL have for SMV-rapportering' },
    {
      type: 'paragraph',
      text: 'For en typisk dansk SMV (ikke transportvirksomhed, ikke producent) er disse de minimale kategorier banken og CSRD-kunder forventer:',
    },
    { type: 'h3', text: '1. Indkøbte varer og services (kategori 1)' },
    {
      type: 'paragraph',
      text: 'Dette er næsten altid den største post i scope 3 for SMV\'er. Det dækker alt du køber: kontorartikler, IT-services, materialer, underleverandører. Den mest pragmatiske metode er spend-baseret beregning: tag dit indkøbsbeløb per kategori og gang med en gennemsnitlig kg CO2/kr-faktor.',
    },
    { type: 'h3', text: '2. Forretningsrejser (kategori 6)' },
    {
      type: 'paragraph',
      text: 'Fly, tog, taxa, hotelovernatninger. Næsten altid små samlede tal, men nemt at rapportere og fortæller en historie om virksomhedens prioriteringer. Hent fra rejseafregningsbilag.',
    },
    { type: 'h3', text: '3. Ansattes pendling (kategori 7)' },
    {
      type: 'paragraph',
      text: 'Hvor langt og hvordan pendler dine ansatte? Lav en kort survey én gang om året (10 spørgsmål, anonym). Brug DEFRA-faktorer per pendlertype (bil, tog, cykel, kollektiv). Det giver et rimeligt tal uden komplet sporbarhed.',
    },
    { type: 'h3', text: '4. Affald (kategori 5) hvis du producerer noget' },
    {
      type: 'paragraph',
      text: 'Hvis du har produktion, lager eller bare meget kontoraffald, skal du have denne. Hent tal fra affaldsfaktura (ofte i kg) eller estimer på antal medarbejdere × dansk gennemsnit.',
    },
    {
      type: 'callout',
      text: 'Vores anbefaling: Start med kategori 1, 6 og 7. Det dækker 80-90% af din reelle scope 3, og er det banken og CSRD-kunder ser efter først. Tilføj de andre når du har tid.',
    },

    { type: 'h2', text: 'Tier 1-5 datakvalitet — det stille vigtige' },
    {
      type: 'paragraph',
      text: 'Når du rapporterer scope 3, så fortæl læseren hvor præcis hver kategori er. GHG Protocol bruger en kvalitets-skala:',
    },
    {
      type: 'list',
      items: [
        'Tier 1: Målte data fra leverandøren (mest præcis)',
        'Tier 2: Specifik faktor × specifik aktivitetsdata',
        'Tier 3: Generisk faktor × specifik aktivitetsdata',
        'Tier 4: Spend-baseret × generel branchefaktor',
        'Tier 5: Estimat baseret på industri-gennemsnit (mindst præcis)',
      ],
    },
    {
      type: 'paragraph',
      text: 'For en SMV der starter med scope 3 vil de fleste tal være Tier 4 eller 5. Det er OK. Hvad der IKKE er OK, er at præsentere et Tier 4-tal som om det var præcis målt. Vær eksplicit om kvaliteten.',
    },

    { type: 'h2', text: 'Værktøjer — hvad bruger man?' },
    { type: 'h3', text: 'Spend-baseret beregning (start her)' },
    {
      type: 'paragraph',
      text: 'EXIOBASE og DEFRA Indirect har gennemsnitlige faktorer i kg CO2/EUR per branche. Tag dit indkøb fra Dinero/Billy, kategoriser leverandørerne på branche, og gang. Hurtigt og rimelig præcist for en first-pass.',
    },
    { type: 'h3', text: 'Aktivitetsbaseret beregning (når du er klar)' },
    {
      type: 'paragraph',
      text: 'Når du ved nok om dit indkøb til at sige "vi køber 2 ton aluminium om året fra leverandør X", så kan du bruge specifikke aluminium-faktorer i stedet for spend-gennemsnit. Det er en betydeligt mere præcis metode, men kræver mere setup.',
    },

    { type: 'h2', text: 'Realistisk roadmap for første år' },
    {
      type: 'ordered-list',
      items: [
        'Måned 1: Forbind regnskab og el-data. Få scope 1+2 op at køre.',
        'Måned 2: Kategoriser leverandører (du har sandsynligvis 50-200 unikke leverandører — det tager 2-4 timer).',
        'Måned 3: Spend-baseret beregning på indkøb (kategori 1). Tier 4-5 data.',
        'Måned 4: Tilføj forretningsrejser (kategori 6). Hentes fra rejseafregninger.',
        'Måned 5: Pendler-survey (kategori 7). 1 e-mail til alle ansatte, samle data.',
        'Måned 6: Første komplette scope 1-3-rapport. Tier-mærk alle kategorier.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Næste år: forbedrede de kategorier hvor data var dårligst, tilføj eventuelt en eller to nye kategorier. Det er et 3-årigt projekt — ikke et 3-måneders panik-løb.',
    },

    {
      type: 'cta',
      heading: 'qlim8 dækker scope 1, 2 og 3',
      text: 'Vores motor kategoriserer dine leverandører automatisk og tilbyder spend-baseret scope 3 fra dag ét. Tier-mærkning indbygget. Premium-planen inkluderer fuld VSME Comprehensive-rapportering.',
      buttonText: 'Start gratis konto',
      buttonHref: 'https://app.qlim8.com/auth?tab=register',
    },
  ],
}
