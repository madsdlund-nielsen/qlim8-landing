export const HOMEPAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "Hvad er qlim8?",
    a: "qlim8 er en dansk SaaS-platform der laver automatisk klimaregnskab og VSME-rapportering for små og mellemstore virksomheder. Platformen henter data direkte fra danske regnskabssystemer (Dinero, e-conomic, Billy) og fra Eloverblik som officiel tredjepart hos Energinet, og leverer revisionsklare Scope 1-3 beregninger. qlim8 sælges efter en demo, hvor vi viser platformen og finder den pakke, der passer.",
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
    a: "Prisen afhænger af pakke og behov. qlim8 findes i tre pakker: Starter, Premium og Enterprise. Book en demo eller ring på +45 93 90 13 84, så gennemgår vi pakkerne med jer, og I får et konkret tilbud.",
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
    a: "Ja. qlim8 er en dansk ESG-platform med en indbygget MCP-server (Model Context Protocol), den standard Claude og ChatGPT bruger, når de skal hente data fra et system. Du forbinder din assistent via OAuth uden en API-nøgle at kopiere, og kan derefter spørge til Scope 1-3, få Scope 3 delt op på GHG-protokollens 15 kategorier eller bede assistenten starte VSME-rapporten. Overfladen er 31 tools, read-only som default, og hvert write havner i audit-loggen. MCP-adgang kræver Premium.",
  },
  {
    q: "Hvor kommer qlim8's emissionsfaktorer fra?",
    a: "qlim8 bruger omkring 50.000 validerede emissionsfaktorer fra Klimakompasset (Erhvervsstyrelsen og Energistyrelsen), Energinets eldeklarationer via Eloverblik, EXIOBASE 3.11 og førende EPD-databaser. Hver post i klimaregnskabet kan spores tilbage til den specifikke faktor og dens kilde.",
  },
  {
    q: "Er qlim8's beregninger revisionsklare?",
    a: "Ja. Hver beregning får et unikt ID, og du kan klikke fra dashboardet ned til den faktura eller måling den stammer fra: input, emissionsfaktor og kilde er sporbart fra dag ét. På Premium kan din revisor få direkte adgang til platformen med rettigheder til at kommentere og signere beregninger.",
  },
  {
    q: "Hvad er forskellen på Scope 1, 2 og 3?",
    a: "Scope 1 er direkte udledninger fra kilder din virksomhed ejer eller kontrollerer, eksempelvis egne køretøjer og gasfyr. Scope 2 er indirekte udledninger fra købt energi som elektricitet og fjernvarme. Scope 3 dækker alle øvrige indirekte udledninger i værdikæden (indkøb, transport, affald, forretningsrejser) og udgør typisk 70-90% af en SMV's samlede klimaaftryk. qlim8 beregner alle tre scopes automatisk.",
  },
  {
    q: "Kan jeg se qlim8, før vi beslutter os?",
    a: "Ja. Book en demo, så viser vi platformen og gennemgår, hvad din bank, dine kunder eller din revisor efterspørger. Passer qlim8 til jer, opretter vi jeres konto og hjælper med at forbinde regnskabssystemet. qlim8 henter tre måneders historiske data med det samme, så jeres egne tal overtager dashboardet fra første dag.",
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

export const HOMEPAGE_FAQ_SCHEMA = buildFaqSchema(HOMEPAGE_FAQS);
