// Bundled default copy for /priser. CMS pageKey: "page.pricing".
// Prices are numbers so the CMS can edit them and the JSON-LD product schema
// in app/priser/page.tsx stays in sync with what the page renders.

export const PRICING_PAGE_KEY = "page.pricing";

/**
 * DKK only — the Stripe Starter and Premium products carry no EUR prices, so
 * there is nothing for the page to offer in EUR. `monthlyDkk` and `yearlyDkk`
 * are both per-month figures; `yearlyTotalDkk` is what is actually charged
 * once up front on the yearly cycle.
 */
export interface PriceSet {
  monthlyDkk: number;
  yearlyDkk: number;
  yearlyTotalDkk: number;
}

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
    yearlySavingsNote: string;
  };
  trustBar: string[];
  prices: {
    starter: PriceSet;
    premium: PriceSet;
  };
  starter: {
    name: string;
    tagline: string;
    cta: string;
    includedLabel: string;
    features: string[];
  };
  premium: {
    name: string;
    tagline: string;
    cta: string;
    includedLabel: string;
    features: string[];
  };
  enterprise: {
    name: string;
    tagline: string;
    priceLabel: string;
    priceNote: string;
    cta: string;
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
  footerNote: string;
}

export const PRICING_COPY: PricingCopy = {
  header: {
    title: "Fra 300 kr/md. Alt inkluderet.",
    subtitle:
      "Ingen onboarding-gebyr, ingen lock-in. Opsig hvornår som helst. Alle priser er ekskl. moms.",
    yearlySavingsNote: "— spar op til 24%",
  },
  trustBar: [
    "✓ Annuller til enhver tid",
    "✓ Ingen opsætningsgebyr",
    "✓ Alle priser ekskl. moms",
  ],
  // Mirrors the live Stripe prices on prod_Uy1uuoULKPwZGG (Starter) and
  // prod_Uy1yQOC4sUWFAB (Premium). Keep in step with `PRICES` in the app's
  // client/src/features/account/pages/pricing.tsx.
  prices: {
    starter: {
      monthlyDkk: 395,
      yearlyDkk: 300,
      yearlyTotalDkk: 3600,
    },
    premium: {
      monthlyDkk: 1495,
      yearlyDkk: 1195,
      yearlyTotalDkk: 14340,
    },
  },
  starter: {
    name: "Starter",
    tagline: "Til SMV'er der starter ESG-arbejdet — banken har spurgt, og I skal have et tal.",
    cta: "Vælg Starter",
    includedLabel: "Inkluderet",
    features: [
      "Scope 1/2/3 beregning",
      "AI fakturaupload",
      "VSME Basis-rapport",
      "1 API-integration",
      "Excel-eksport",
      "Email-support",
    ],
  },
  premium: {
    name: "Premium",
    tagline:
      "Til SMV'er med kunde- og bankrapportering — VSME Comprehensive, leverandørdata, offentlig profil.",
    cta: "Vælg Premium",
    includedLabel: "Alt i Starter, plus",
    features: [
      "PDF-eksport",
      "VSME Comprehensive-rapport",
      "Reduction Hub & Scenario Builder",
      "Ubegrænsede integrationer",
      "Offentlig profil & Brag Board",
      "Direkte revisor-adgang",
      "Chat & telefon-support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    tagline: "Til større organisationer med flere CVR, komplet værdikæde og API-integration.",
    priceLabel: "Kontakt salg",
    priceNote: "Tilpasset pris for din organisation",
    cta: "Kontakt os",
    includedLabel: "Alt i Premium, plus",
    features: [
      {
        label: "Komplet værdikæde via CVR",
        note: "kræver premium abonnement fra værdikæden – dog får I som Enterprise kunde en rabatkode til jeres leverandører",
      },
      { label: "Fuld API-adgang" },
      { label: "SAML/SSO adgangskontrol" },
      { label: "Dedikeret Customer Success Manager" },
      { label: "White-label PDF-eksport" },
    ],
  },
  comparison: {
    title: "Komplet sammenligning",
    rows: [
      { label: "Scope 1, 2 & 3 udledningsberegning", starter: true, premium: true, enterprise: true },
      { label: "Automatisk kategorisering (AI-faktura)", starter: true, premium: true, enterprise: true },
      { label: "Manuel dataregistrering", starter: true, premium: true, enterprise: true },
      { label: "Excel/CSV-upload", starter: true, premium: true, enterprise: true },
      { label: "Carbon Ledger (auditbar oversigt)", starter: true, premium: true, enterprise: true },
      { label: "VSME Basis-rapport", starter: true, premium: true, enterprise: true },
      { label: "Excel-eksport", starter: true, premium: true, enterprise: true },
      { label: "API-integrationer", starter: "1 integration", premium: "Ubegrænsede", enterprise: "Ubegrænsede" },
      { label: "Email-support", starter: true, premium: true, enterprise: true },
      { label: "PDF-eksport", starter: false, premium: true, enterprise: true },
      { label: "VSME Comprehensive-rapport", starter: false, premium: true, enterprise: true },
      { label: "Reduction Hub & Scenario Builder", starter: false, premium: true, enterprise: true },
      { label: "Offentlig profil & Brag Board badge", starter: false, premium: true, enterprise: true },
      { label: "Direkte revisor-adgang", starter: false, premium: true, enterprise: true },
      { label: "Chat & telefon-support", starter: false, premium: true, enterprise: true },
      { label: "Komplet værdikæde via CVR", starter: false, premium: false, enterprise: true },
      { label: "Fuld API-adgang", starter: false, premium: false, enterprise: true },
      { label: "SAML/SSO adgangskontrol", starter: false, premium: false, enterprise: true },
      { label: "Dedikeret Customer Success Manager", starter: false, premium: false, enterprise: true },
    ],
  },
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Binder jeg mig til en aftale?",
        a: "Nej. Du kan annullere dit abonnement til enhver tid — månedlige planer stopper ved slutningen af den betalte periode, årlige planer refunderes ikke, men du bevarer adgangen til udløb. Ingen opsigelsesgebyr.",
      },
      {
        q: "Hvad sker der lige efter tilmelding?",
        a: "Straks efter betaling oprettes din konto og du guides igennem en kort onboarding. Du kan begynde at registrere data og oprette dit første klimaregnskab samme dag.",
      },
      {
        q: "Kan jeg skifte plan senere?",
        a: "Ja. Du kan opgradere fra Starter til Premium når som helst — adgangen er øjeblikkelig. Prisen justeres forholdsmæssigt for resten af perioden.",
      },
      {
        q: "Hvad er VSME, og er det obligatorisk?",
        a: "VSME (Voluntary SME Standard) er en frivillig ESG-rapporteringsstandard målrettet SMV'er, udviklet af EFRAG. Den er frivillig, men efterspørges i stigende grad af banker og større kunder som dokumentation for dit klimaarbejde.",
      },
      {
        q: "Har jeg brug for en revisor?",
        a: "Ikke for at komme i gang. qlim8 genererer revisionsklare beregninger med kildehenvisninger, som din revisor nemt kan efterprøve. Premium-planen giver desuden direkte revisoradgang til platformen.",
      },
      {
        q: "Hvad koster Historisk Import?",
        a: "Historisk Import er et éngangsprodukt til Premium-kunder på 9.000 kr. Det giver dig mulighed for at importere op til ét år historiske regnskabsdata fra Dinero med automatisk AI-klassificering, så du hurtigt etablerer en baseline.",
      },
    ],
  },
  footerNote: "Alle priser er ekskl. moms  ·  Annuller når som helst",
};
