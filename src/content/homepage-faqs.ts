export const HOMEPAGE_FAQS: { q: string; a: string }[] = [
  {
    q: "Hvad er qlim8?",
    a: "qlim8 er en dansk SaaS-platform der laver automatisk klimaregnskab og VSME-rapportering for små og mellemstore virksomheder. Platformen henter data direkte fra danske regnskabssystemer (Dinero, e-conomic, Billy) og fra Eloverblik som officiel tredjepart hos Energinet, og leverer revisionsklare Scope 1-3 beregninger. Priserne starter ved 250 kr/md.",
  },
  {
    q: "Hvem er qlim8 til?",
    a: "qlim8 er designet til danske SMV'er der har behov for klimaregnskab og ESG-rapportering — typisk fordi banken, en større kunde eller en leverandørkæde kræver det. Platformen kan også bruges af revisorer og bogholdere der laver klimaregnskab på vegne af deres kunder.",
  },
  {
    q: "Hvad er VSME, og skal min virksomhed lave en VSME-rapport?",
    a: "VSME (Voluntary SME standard) er en frivillig bæredygtighedsrapportering udarbejdet af EFRAG specifikt til små og mellemstore virksomheder. Den er ikke lovpligtig, men bliver i stigende grad krævet af banker, større kunder og virksomheder underlagt CSRD. VSME findes i to versioner — Basis og Comprehensive — og qlim8 understøtter begge med indbygget rapport-wizard.",
  },
  {
    q: "Hvad koster qlim8?",
    a: "qlim8 koster fra 250 kr/md (Starter), 625 kr/md (Premium), eller skræddersyet pris for større organisationer (Enterprise). Alle planer faktureres årligt og kan opsiges når som helst. Du kan oprette en gratis konto og prøve hele platformen med eksempeldata uden kreditkort.",
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
    q: "Hvor kommer qlim8's emissionsfaktorer fra?",
    a: "qlim8 bruger omkring 50.000 validerede emissionsfaktorer fra Klimakompasset (Erhvervsstyrelsen og Energistyrelsen), Energinets eldeklarationer via Eloverblik, EXIOBASE 3.11 og førende EPD-databaser. Hver post i klimaregnskabet kan spores tilbage til den specifikke faktor og dens kilde.",
  },
  {
    q: "Er qlim8's beregninger revisionsklare?",
    a: "Ja. Hver beregning får et unikt ID, og du kan klikke fra dashboardet ned til den faktura eller måling den stammer fra — input, emissionsfaktor og kilde er sporbart fra dag ét. På Premium kan din revisor få direkte adgang til platformen med rettigheder til at kommentere og signere beregninger.",
  },
  {
    q: "Hvad er forskellen på Scope 1, 2 og 3?",
    a: "Scope 1 er direkte udledninger fra kilder din virksomhed ejer eller kontrollerer, eksempelvis egne køretøjer og gasfyr. Scope 2 er indirekte udledninger fra købt energi som elektricitet og fjernvarme. Scope 3 dækker alle øvrige indirekte udledninger i værdikæden — indkøb, transport, affald, forretningsrejser — og udgør typisk 70-90% af en SMV's samlede klimaaftryk. qlim8 beregner alle tre scopes automatisk.",
  },
  {
    q: "Kan jeg prøve qlim8 gratis?",
    a: "Ja. Du kan oprette en gratis konto uden kreditkort og afprøve hele Premium-versionen af platformen med eksempeldata. Når du tilkobler dit regnskabssystem starter en 14-dages prøveperiode, og dine egne data overtager dashboardet med det samme.",
  },
];

export const HOMEPAGE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
