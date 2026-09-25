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
    title: "Tre pakker. Én platform.",
    subtitle:
      "Starter, Premium og Enterprise bygger på den samme platform. Book en demo, så finder vi sammen den pakke der passer til jeres behov, og I får et konkret tilbud.",
  },
  trustBar: [
    "✓ Dinero, e-conomic og Billy",
    "✓ Officiel tredjepart til Eloverblik",
    "✓ Hosting i EU",
  ],
  starter: {
    name: "Starter",
    tagline: "Til SMV'er der starter ESG-arbejdet: banken har spurgt, og I skal have et tal.",
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
      "Til SMV'er med kunde- og bankrapportering: VSME Comprehensive, leverandørdata, offentlig profil.",
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
    includedLabel: "Alt i Premium, plus",
    features: [
      {
        label: "Komplet værdikæde via CVR",
        note: "kræver at leverandørerne i værdikæden har Premium; vilkårene for jeres leverandører aftaler vi med jer",
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
        q: "Hvad koster qlim8?",
        a: "Det afhænger af pakken og af jeres behov. Book en demo eller ring på +45 93 90 13 84, så gennemgår vi pakkerne med jer og giver jer et konkret tilbud.",
      },
      {
        q: "Hvad sker der efter demoen?",
        a: "Passer qlim8 til jer, opretter vi jeres konto og hjælper jer med at forbinde regnskabssystemet. qlim8 henter tre måneders historiske data med det samme, så I har et reelt billede fra første dag.",
      },
      {
        q: "Kan vi skifte pakke senere?",
        a: "Ja. I kan skifte fra Starter til Premium eller Enterprise, når behovet vokser. Kontakt os, så sørger vi for det.",
      },
      {
        q: "Hvad er VSME, og er det obligatorisk?",
        a: "VSME (Voluntary SME Standard) er en frivillig ESG-rapporteringsstandard målrettet SMV'er, udviklet af EFRAG. Den er frivillig, men efterspørges i stigende grad af banker og større kunder som dokumentation for dit klimaarbejde.",
      },
      {
        q: "Har jeg brug for en revisor?",
        a: "Ikke for at komme i gang. qlim8 genererer revisionsklare beregninger med kildehenvisninger, som din revisor nemt kan efterprøve. Premium-pakken giver desuden direkte revisoradgang til platformen.",
      },
      {
        q: "Kan vi få mere historik med?",
        a: "Ja. Historisk Import er et tilkøb til Premium, der henter op til ét års historiske regnskabsdata fra Dinero med automatisk AI-klassificering, så I hurtigt har en baseline. Vi gennemgår det gerne på demoen.",
      },
    ],
  },
  closing: {
    title: "Se qlim8 på jeres egne tal",
    body: "Book en demo, så viser vi platformen og finder den pakke der passer. Du kan også ringe direkte eller skrive til os.",
  },
};
