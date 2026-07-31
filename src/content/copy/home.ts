// Bundled default copy for the homepage (/). CMS pageKey: "page.home".
// The admin CMS in qlim8-app reads these defaults via /api/cms/defaults and
// stores per-field overrides; src/page-components/landing.tsx renders the
// merged result. Keep this file as the single source of truth for the
// bundled text — the JSX must not carry copy of its own.
//
// FAQ items and marketing images intentionally live under their original
// pageKeys ("homepage.faqs", "landing.images") and are not part of this map.

export const HOME_PAGE_KEY = "page.home";

export interface HomeFeature {
  title: string;
  body: string;
  bullets: string[];
}

export interface HomeCommitment {
  title: string;
  body: string;
}

export interface HomeStep {
  title: string;
  body: string;
}

export interface HomePlan {
  name: string;
  price: string;
  badge?: string;
  tag: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
}

export interface HomeCopy {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaNote: string;
  };
  integrations: {
    title: string;
    systems: string[];
    note1: string;
    note2: string;
    body: string;
  };
  features: HomeFeature[];
  builtDifferent: {
    title: string;
    intro: string;
    commitments: HomeCommitment[];
    sourcesNote: string;
  };
  steps: {
    title: string;
    intro: string;
    items: HomeStep[];
    ctaLabel: string;
    ctaNote: string;
  };
  pricingTeaser: {
    title: string;
    plans: HomePlan[];
    linkLabel: string;
  };
  faq: {
    title: string;
    linkLabel: string;
  };
  finalCta: {
    title: string;
    body: string;
    ctaLabel: string;
  };
}

const SIGNUP_URL = "https://app.qlim8.com/auth?tab=register";

export const HOME_COPY: HomeCopy = {
  hero: {
    title: "ESG er nemt",
    subtitle:
      "Automatisk klimaregnskab og VSME-rapport for danske SMV'er — hentet direkte fra dit regnskabssystem og elforbrug. 10 minutter om måneden, ikke 10 dage.",
    ctaPrimary: "Prøv platformen gratis",
    ctaNote: "Eksempeldata · Ingen kreditkort · Forpligt dig først ved tilkobling",
  },
  integrations: {
    title: "Vi henter data direkte fra dine systemer",
    systems: ["Dinero", "e-conomic", "Billy", "Eloverblik"],
    note1: "Eloverblik: officiel tredjepart hos Energinet",
    note2: "Fuldt REST API · MCP-ready",
    body: "Sæt integrationerne op én gang. qlim8 henter regnskabsdata og elforbrug i baggrunden.",
  },
  features: [
    {
      title: "Sat op én gang. Kører i baggrunden.",
      body: "Forbind dit regnskabssystem og dit Eloverblik én gang. Derefter henter qlim8 data automatisk — hver nat fra Dinero, e-conomic eller Billy, og ugentligt fra Eloverblik. AI-kategorisering placerer hver post i det rigtige scope, så dit klimaregnskab er opdateret når du har brug for det — ikke når du husker det. Når du tilkobler dit regnskab, henter qlim8 også tre måneders historisk data med det samme, så du har et reelt billede fra dag ét.",
      bullets: [
        "Natlig kørsel fra regnskab",
        'Ugentlig kørsel fra Eloverblik med "Hent nu"-knap',
        "AI-kategorisering til Scope 1, 2 og 3",
      ],
    },
    {
      title: "Hver beregning kan spores tilbage til kilden",
      body: 'Hver post i klimaregnskabet får et unikt ID, og du kan klikke fra dashboardet ned i den konkrete beregning — input, emissionsfaktor og kilde, sporbart fra dag ét. Når revisor spørger "hvor kommer det tal fra?", har du svaret.',
      bullets: [
        "Validerede emissionsfaktorer fra Klimakompasset, Energinet, EXIOBASE og EPD-databaser",
        "Unikt beregnings-ID på hver post, eksporterbart til Excel",
        "Direkte revisor-portal med kommentering og signering (fra Premium)",
      ],
    },
    {
      title: "Ikke bare et tal — en plan",
      body: "Når du har målt, vil du have en plan. qlim8 sætter reduktionsmål baseret på dine egne tal og lader dig teste konkrete tiltag i Scenario Builder — se effekten af en elbil-flåde, ny leverandør eller halverede forretningsrejser før du beslutter dig. Når du er klar, deler du via en custom PDF-rapport eller dit offentlige Brag Board, så bank, kunder og samarbejdspartnere kan se hvor I er på vej hen.",
      bullets: [
        "Reduktionsmål baseret på dine egne tal",
        "Scenario Builder — test tiltag før du beslutter",
        "Deling via custom PDF eller offentligt Brag Board",
        "Premium-features fra 1.195 kr/md",
      ],
    },
  ],
  builtDifferent: {
    title: "Bygget anderledes",
    intro:
      "De fleste ESG-platforme er bygget til store virksomheder med dedikerede bæredygtighedsteams og store budgetter. qlim8 er bygget til danske SMV'er. Det former hvert valg vi har truffet.",
    commitments: [
      {
        title: "1. Vi viser kilden til hvert tal.",
        body: "Hver beregning har et unikt ID, og du kan klikke fra dashboardet ned til den faktura eller måling, den stammer fra. Ingen blackbox — fordi din revisor skal kunne validere arbejdet uden at ringe til vores support.",
      },
      {
        title: "2. Vi bruger danske data, ikke approximationer.",
        body: "Eloverblik henter dit reelle elforbrug direkte fra Energinet. Klimakompassets danske emissionsfaktorer ligger nederst i datahierarkiet. Internationale platforme estimerer dansk data ud fra europæiske gennemsnit — vi gør det ikke.",
      },
      {
        title: "3. Vi tæller ikke faktorer kreativt.",
        body: "Vi har ca. 50.000 validerede emissionsfaktorer fra Klimakompasset, Energinet, EXIOBASE og førende EPD-databaser. Vi multiplicerer dem ikke kreativt med regioner og år for at få større tal. Vi vælger den rigtige faktor til den rigtige post.",
      },
      {
        title: "4. Vi behøver ikke en salgssamtale.",
        body: "Du behøver ikke booke en demo eller tale med en sælger. Opret en konto, klik rundt med eksempeldata, og forbind dit regnskab når du er klar. Det er det.",
      },
    ],
    sourcesNote: "Datakilder: Klimakompasset · Energinet · EXIOBASE · EPD International",
  },
  steps: {
    title: "Sådan kommer du i gang",
    intro: "Du behøver ikke vide noget om ESG før du opretter dig — det viser sig selv.",
    items: [
      {
        title: "Opret en gratis konto",
        body: "Du lander i platformen med eksempeldata. Ingen kreditkort, intet salgsmøde.",
      },
      {
        title: "Klik dig rundt",
        body: "En kort guided tur viser dig dashboard, klimahovedbog, rapporter og reduktionsmål — alt sammen med realistiske data, så du kan se præcis hvad du får.",
      },
      {
        title: "Forbind dit regnskab",
        body: "Når du er klar, henter qlim8 tre måneders historisk data fra dit regnskabssystem. Din egen data overtager dashboardet — og din 14-dages prøveperiode starter her.",
      },
    ],
    ctaLabel: "Opret gratis konto",
    ctaNote: "Ingen kreditkort · Eksempeldata · Forpligt dig først ved tilkobling",
  },
  pricingTeaser: {
    title: "Tre planer. Find den der passer.",
    plans: [
      {
        name: "Starter",
        price: "300 kr/md",
        tag: "Til SMV'er der skal levere VSME-rapport til banken og vil have det overstået ordentligt.",
        features: [
          "Komplet Scope 1-3 klimaregnskab",
          "VSME Basis-rapport med wizard",
          "Fuld audit trail på hver beregning",
          "Alle danske integrationer",
        ],
        cta: "Start gratis",
        href: SIGNUP_URL,
        highlighted: false,
      },
      {
        name: "Premium",
        price: "1.195 kr/md",
        badge: "Anbefalet til de fleste",
        tag: "Til virksomheder der vil bruge ESG aktivt — reducere udledninger og dele resultater.",
        features: [
          "Alt i Starter",
          "VSME Comprehensive med wizard",
          "Reduktionsmål + Scenario Builder",
          "Custom PDF-rapport + offentligt Brag Board",
          "Fuldt REST API + MCP",
        ],
        cta: "Start gratis",
        href: SIGNUP_URL,
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Kontakt",
        tag: "Til organisationer der skal indsamle VSME-rapporter fra deres supply chain.",
        features: [
          "Alt i Premium",
          "Dedikeret supply chain portal",
          "Rollebaseret adgang og rettighedsstyring",
        ],
        cta: "Kontakt os",
        href: "/kontakt?subject=Enterprise",
        highlighted: false,
      },
    ],
    linkLabel: "Se fuld sammenligning →",
  },
  faq: {
    title: "Spørgsmål og svar",
    linkLabel: "Flere spørgsmål? Kontakt os →",
  },
  finalCta: {
    title: "ESG er nemt — kom selv og se",
    body: "Du behøver hverken kreditkort eller salgsmøde. Opret en konto, klik dig rundt med eksempeldata, og tilkobl dit regnskab når du er klar.",
    ctaLabel: "Opret gratis konto",
  },
};
