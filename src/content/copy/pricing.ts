// Bundled default copy for /priser. CMS pageKey: "page.pricing".
//
// The page describes the packages and what is in them, never what they cost:
// qlim8 is sold after a demo, and no package price appears anywhere on the
// site (src/content/cta.ts). Every card's button books a demo; the label and
// link are fixed in the component, not copy, so a stale CMS value cannot put
// a checkout or a free-signup button back on the page.

export const PRICING_PAGE_KEY = "page.pricing";

export interface PricingFeatureRow {
  label: string;
  starter: boolean | string;
  premium: boolean | string;
  enterprise: boolean | string;
}

export interface PricingFaqItem {
  q: string;
  a: string;
}

export interface EnterpriseFeature {
  label: string;
  note?: string;
}

export interface PricingCopy {
  header: {
    title: string;
    subtitle: string;
  };
  trustBar: string[];
  starter: {
    name: string;
    tagline: string;
    includedLabel: string;
    features: string[];
  };
  premium: {
    name: string;
    tagline: string;
    includedLabel: string;
    features: string[];
  };
  enterprise: {
    name: string;
    tagline: string;
    includedLabel: string;
    features: EnterpriseFeature[];
  };
  comparison: {
    title: string;
    rows: PricingFeatureRow[];
  };
  faq: {
    title: string;
    items: PricingFaqItem[];
  };
  closing: {
    title: string;
    body: string;
  };
}

export const PRICING_COPY: PricingCopy = {
  header: {
    title: "Start gratis, og vælg en årsaftale, når du er klar",
    subtitle: "Gratis-pakken koster ingenting, har ingen binding og kræver ikke kreditkort. De betalte pakker er et helt års fast partnerskab uden overraskelser: prisen ligger fast hele året og vises pr. måned ekskl. moms, og ekstra betaler du kun for det, du selv vælger til, fx flere PCF-pladser eller historisk import. Er du i tvivl, så ring til Mads på +45 93 90 13 84.",
  },
  trustBar: [
    "Gratis-pakken uden binding og uden kreditkort",
    "Årspris, vist pr. måned ekskl. moms",
    "Servere og database i EU (Tyskland)",
    "Ingen telefonsælgere, et direkte nummer",
  ],
  starter: {
    name: "Basis",
    tagline: "Til dig, der vil have klimaregnskabet på plads, når banken eller en kunde spørger.",
    includedLabel: "Det får du blandt andet",
    features: [
      "Direkte forbindelse til dit regnskabsprogram og Eloverblik",
      "Klimaregnskab for Scope 1, 2 og 3",
      "Udledningsoversigt, hvor hver linje kan spores tilbage til bilaget",
      "Support på mail på hverdage",
      "Det præcise indhold gennemgår vi med dig i en kort snak",
    ],
  },
  premium: {
    name: "Udvidet",
    tagline: "Til dig, der får flere spørgsmål fra banken og kunderne og vil arbejde videre med tallene.",
    includedLabel: "Alt i Basis, og desuden",
    features: ["Det præcise indhold gennemgår vi med dig i en kort snak"],
  },
  enterprise: {
    name: "Koncern",
    tagline: "Til større organisationer med flere led og særlige krav til rapporteringen.",
    includedLabel: "Alt i Udvidet, og desuden",
    features: [
      {
        label: "Indhold og vilkår, som vi aftaler sammen med jer",
        note: "vi tager udgangspunkt i det, I skal bruge",
      },
    ],
  },
  comparison: {
    title: "Sammenlign pakkerne",
    rows: [
      {
        label: "Klimaregnskab for Scope 1, 2 og 3",
        starter: true,
        premium: true,
        enterprise: true,
      },
      {
        label: "Automatisk kategorisering af fakturalinjer",
        starter: true,
        premium: true,
        enterprise: true,
      },
      {
        label: "Direkte forbindelse til regnskabsprogram og Eloverblik",
        starter: true,
        premium: true,
        enterprise: true,
      },
      {
        label: "Upload af Excel-filer og manuel indtastning",
        starter: true,
        premium: true,
        enterprise: true,
      },
      {
        label: "Excel-rapport med faktor og kilde på hver linje",
        starter: true,
        premium: true,
        enterprise: true,
      },
      {
        label: "Support på mail på hverdage",
        starter: true,
        premium: true,
        enterprise: true,
      },
    ],
  },
  faq: {
    title: "Spørgsmål om pris, betaling og tryghed",
    items: [
      {
        q: "Hvad koster det at komme i gang med qlim8?",
        a: "Ingenting. Gratis-pakken har ingen udløbsdato og ingen binding, og du behøver ikke et kreditkort for at oprette en konto. Det tager et par minutter. Med Gratis-pakken forbinder du Eloverblik og ét regnskabsprogram (e-conomic, Dinero eller Billy) og ser dit eget klimaregnskab, før du beslutter dig.",
      },
      {
        q: "Hvordan og hvornår betaler jeg for en pakke hos qlim8?",
        a: "De betalte pakker er årsaftaler: du betaler forud for et år ad gangen, og prisen vises pr. måned ekskl. moms. Basis og Udvidet køber du selv i appen med betalingskort. Komplet og Koncern aftaler vi efter en samtale, og de betales mod faktura. [[Basis koster {pris:starter} og Udvidet {pris:premium} om måneden ekskl. moms, betalt for et år ad gangen.]]",
      },
      {
        q: "Hvorfor er de betalte pakker en årsaftale, og kan prisen stige?",
        a: "Et klimaregnskab følger hele regnskabsåret, fra de første bilag til den færdige rapport. Derfor er de betalte pakker et helt års fast partnerskab uden overraskelser: prisen ligger fast i alle 12 måneder, og ud over årsprisen og momsen betaler du kun for det, du selv vælger til, fx flere PCF-pladser eller historisk import. Ændrer qlim8 priserne, får du 60 dages varsel, og den nye pris gælder først fra din næste periode.",
      },
      {
        q: "Hvordan opsiger jeg, og hvad sker der med mine data?",
        a: "En betalt pakke fornyes automatisk for et år ad gangen. Basis og Udvidet kan du opsige når som helst i appen under Konto eller på kontakt@qlim8.com. Opsigelsen gælder fra udløbet af det år, du har betalt for, og du får ikke penge tilbage for resten af året. Bagefter fortsætter du på Gratis-pakken, og dine data bliver liggende, så du stadig kan se og eksportere dem. Komplet og Koncern har tre måneders varsel før årets udløb.",
      },
      {
        q: "Kan jeg skifte pakke undervejs?",
        a: "Ja. Fra Gratis-pakken køber du Basis eller Udvidet i appen. Går du fra Basis til Udvidet, gælder det med det samme, og du betaler kun forskellen for resten af året. Skifter du til en mindre pakke, sker det ved årets udløb. Komplet og Koncern aftaler vi sammen med dig.",
      },
      {
        q: "Skal min revisor betale for at få adgang?",
        a: "Nej. Revisorens egen konto i qlim8 er gratis. Du inviterer selv din revisor, som får læseadgang til udledningslinjer, revisionsspor, bilag og rapporter. Revisoren kan ikke ændre tal, men kan attestere rapporten. Hvilke pakker der giver revisoradgang, står i pakkeoversigten.",
      },
      {
        q: "Hvor ligger mine data hos qlim8?",
        a: "Servere, database og fillager står i EU, i Tyskland (Hetzner i Nürnberg), og AI-leverandøren Ordbogen.ai er dansk. Data behandles efter GDPR med en databehandleraftale, al trafik går over HTTPS, og hver kundes data er adskilt fra de andres. Persondata deles kun med de underdatabehandlere, der står i databehandleraftalen.",
      },
      {
        q: "Hvilken pakke skal jeg vælge, hvis jeg er i tvivl?",
        a: "Start på Gratis-pakken, og se dine egne tal, før du beslutter noget. Eller ring direkte til qlim8's stifter, Mads, på +45 93 90 13 84. Der sidder ingen telefonsælger i den anden ende. Vi kigger på dit behov sammen, og passer Gratis-pakken fint til dig, så siger vi det.",
      },
    ],
  },
  closing: {
    title: "Se dine egne tal, før du beslutter dig",
    body: "Opret en gratis konto, og se dit eget klimaregnskab tage form, uden binding og uden kreditkort. Vil du hellere tale sammen først, så ring til Mads eller skriv til os. Du taler med den, der har bygget platformen.",
  },
};
