export const HOMEPAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "Hvad er qlim8?",
    a: "qlim8 er en dansk SaaS-platform der laver automatisk klimaregnskab og VSME-rapportering for små og mellemstore virksomheder. Platformen henter data direkte fra danske regnskabssystemer (Dinero, e-conomic, Billy) og fra Eloverblik som officiel tredjepart hos Energinet, og leverer revisionsklare Scope 1-3 beregninger. Du kan oprette en gratis konto og komme i gang med det samme, eller booke en demo, hvis du vil se platformen først.",
  },
  {
    q: "Hvem er qlim8 til?",
    a: "qlim8 er designet til danske SMV'er der har behov for klimaregnskab og ESG-rapportering, typisk fordi banken, en større kunde eller en leverandørkæde kræver det. Platformen kan også bruges af revisorer og bogholdere der laver klimaregnskab på vegne af deres kunder.",
  },
  {
    q: "Hvad er VSME, og skal min virksomhed lave en VSME-rapport?",
    a: "VSME (Voluntary SME standard) er en frivillig bæredygtighedsrapportering udarbejdet af EFRAG specifikt til små og mellemstore virksomheder. Den er ikke lovpligtig, men bliver i stigende grad krævet af banker, større kunder og virksomheder underlagt CSRD. VSME findes i to versioner, Basis og Comprehensive, og qlim8 understøtter begge med indbygget rapport-wizard.",
  },
  {
    q: "Hvad koster qlim8?",
    a: "qlim8 findes i fem pakker: Free, Starter, Premium, Business og Enterprise. Free er gratis for altid. Starter og Premium har faste priser, som står på /priser, og som I køber direkte i appen: pr. måned, faktureret årligt, ekskl. moms. Business og Enterprise tilpasser vi jeres behov, så book en demo eller ring på +45 93 90 13 84.",
  },
  {
    q: "Hvor lang tid tager det at lave et klimaregnskab i qlim8?",
    a: "Når dit regnskabssystem er tilkoblet, har du et grundlæggende klimaregnskab samme dag. qlim8 henter tre måneders historisk data ved første tilkobling og opdaterer derefter automatisk via natlige kørsler. En komplet VSME-rapport kan typisk genereres på cirka 10 minutter, når du har 12 måneders data.",
  },
  {
    q: "Hvilke regnskabssystemer understøtter qlim8?",
    a: "qlim8 har direkte integrationer til Dinero, e-conomic og Billy. Data hentes automatisk via natlige API-kørsler, og AI-kategorisering placerer hver post i det rigtige scope. qlim8 tilbyder også et fuldt REST API og MCP-integration for skræddersyede setups.",
  },
  {
    q: "Kan jeg spørge min egen AI om klimaregnskabet og VSME-rapporten?",
    a: "Ja. qlim8 er en dansk ESG-platform med en indbygget MCP-server (Model Context Protocol), den standard Claude og ChatGPT bruger, når de skal hente data fra et system. Du forbinder din assistent via OAuth uden en API-nøgle at kopiere, og kan derefter spørge til Scope 1-3, få Scope 3 delt op på GHG-protokollens 15 kategorier eller bede assistenten starte VSME-rapporten. Overfladen er 32 tools, read-only som default, og hvert write havner i audit-loggen. MCP-adgang kræver Premium.",
  },
  {
    q: "Hvor kommer qlim8's emissionsfaktorer fra?",
    a: "qlim8 bruger omkring 50.000 validerede emissionsfaktorer fra Klimakompasset (Erhvervsstyrelsen og Energistyrelsen), Energinets eldeklarationer via Eloverblik, EXIOBASE 3.11 og førende EPD-databaser. Hver post i klimaregnskabet kan spores tilbage til den specifikke faktor og dens kilde.",
  },
  {
    q: "Er qlim8's beregninger revisionsklare?",
    a: "Ja. Hver beregning får et unikt ID, og du kan klikke fra dashboardet ned til den faktura eller måling den stammer fra: input, emissionsfaktor og kilde er sporbart fra dag ét. Fra Starter kan din revisor få direkte adgang til platformen med rettigheder til at kommentere og attestere rapporter.",
  },
  {
    q: "Hvad er forskellen på Scope 1, 2 og 3?",
    a: "Scope 1 er direkte udledninger fra kilder din virksomhed ejer eller kontrollerer, eksempelvis egne køretøjer og gasfyr. Scope 2 er indirekte udledninger fra købt energi som elektricitet og fjernvarme. Scope 3 dækker alle øvrige indirekte udledninger i værdikæden (indkøb, transport, affald, forretningsrejser) og udgør typisk 70-90% af en SMV's samlede klimaaftryk. qlim8 beregner alle tre scopes automatisk.",
  },
  {
    q: "Kan jeg se qlim8, før vi beslutter os?",
    a: "Ja. Opret en gratis konto og forbind jeres regnskabssystem, så henter qlim8 tre måneders historiske data med det samme, og I ser jeres egne tal fra første dag. Vil I hellere have en gennemgang først, så book en demo, så viser vi platformen og gennemgår, hvad din bank, dine kunder eller din revisor efterspørger.",
  },
];

export type HomepageFaq = { q: string; a: string };

// Build the FAQPage JSON-LD from any FAQ list (bundled defaults or a
// CMS-published override), so the structured data stays in sync with what's
// rendered.
export function buildFaqSchema(faqs: HomepageFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
