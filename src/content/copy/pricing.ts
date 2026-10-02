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
    title: "Fem pakker. Én platform.",
    subtitle:
      "Free, Starter, Premium, Business og Enterprise bygger på den samme platform. Start gratis, køb Starter eller Premium direkte, eller tal med os om Business og Enterprise.",
  },
  trustBar: [
    "✓ Dinero, e-conomic og Billy",
    "✓ Officiel tredjepart til Eloverblik",
    "✓ Hosting i EU",
  ],
  starter: {
    name: "Starter",
    tagline: "Til SMV'er der starter ESG-arbejdet: banken har spurgt, og I skal have en VSME-rapport.",
    includedLabel: "Alt i Free, plus",
    features: [
      "VSME Basis-rapport",
      "Ubegrænsede brugere og teamadministration",
      "Revisoradgang (1 ekstern rådgiver)",
      "Op til 5 forbindelser",
      "Lønsystem-integrationer",
      "Eksport til Drive/OneDrive",
      "3 PCF/EPD-dokumenter",
      "Mailsupport",
    ],
  },
  premium: {
    name: "Premium",
    tagline:
      "Til SMV'er med kunde- og bankrapportering: VSME Comprehensive, leverandøranalyse, offentlig profil.",
    includedLabel: "Alt i Starter, plus",
    features: [
      "VSME Comprehensive-rapport",
      "Analyse: kategorier, leverandører og udvikling",
      "Reduction Hub med avancerede reduktionsmål",
      "Offentlig profil og badge",
      "MCP-adgang",
      "Slack/Teams-notifikationer og Zapier",
      "Ubegrænsede forbindelser og rådgivere",
      "5 PCF/EPD-dokumenter (+5 pr. tilkøbt plads)",
    ],
  },
  enterprise: {
    name: "Enterprise",
    tagline: "Til større organisationer med komplet værdikæde, CSRD-rapport og API-integration.",
    includedLabel: "Alt i Business, plus",
    features: [
      { label: "CSRD-rapport" },
      {
        label: "Komplet værdikæde via CVR",
        note: "kræver at leverandørerne i værdikæden har Premium; vilkårene for jeres leverandører aftaler vi med jer",
      },
      { label: "Fuld API-adgang" },
      { label: "Dedikeret PCF/EPD-oversigt (ubegrænsede dokumenter)" },
      { label: "Dedikeret Customer Success Manager" },
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
      { label: "Posteringer", starter: "Ubegrænsede", premium: "Ubegrænsede", enterprise: "Ubegrænsede" },
      { label: "Excel- og PDF-eksport", starter: true, premium: true, enterprise: true },
      { label: "VSME Basis-rapport", starter: true, premium: true, enterprise: true },
      { label: "Brugere", starter: "Ubegrænsede", premium: "Ubegrænsede", enterprise: "Ubegrænsede" },
      { label: "Forbindelser (regnskab, forsyning, løn m.fl.)", starter: "Op til 5", premium: "Ubegrænsede", enterprise: "Ubegrænsede" },
      { label: "Revisor- og rådgiveradgang", starter: "1 rådgiver", premium: "Ubegrænsede", enterprise: "Ubegrænsede" },
      { label: "PCF/EPD-dokumenter", starter: "3", premium: "5", enterprise: "Ubegrænsede" },
      { label: "Email-support", starter: true, premium: true, enterprise: true },
      { label: "VSME Comprehensive-rapport", starter: false, premium: true, enterprise: true },
      { label: "Analyse: kategorier, leverandører og udvikling", starter: false, premium: true, enterprise: true },
      { label: "Reduction Hub med avancerede reduktionsmål", starter: false, premium: true, enterprise: true },
      { label: "Offentlig profil og badge", starter: false, premium: true, enterprise: true },
      { label: "MCP-adgang", starter: false, premium: true, enterprise: true },
      { label: "Scenario Builder", starter: false, premium: false, enterprise: true },
      { label: "Chat & telefon-support", starter: false, premium: false, enterprise: true },
      { label: "CSRD-rapport", starter: false, premium: false, enterprise: true },
      { label: "Komplet værdikæde via CVR", starter: false, premium: false, enterprise: true },
      { label: "Fuld API-adgang", starter: false, premium: false, enterprise: true },
      { label: "Dedikeret Customer Success Manager", starter: false, premium: false, enterprise: true },
    ],
  },
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad koster qlim8?",
        a: "Free er gratis for altid. Starter og Premium har faste priser, som står her på siden, og som I køber direkte i appen: pr. måned, faktureret årligt, ekskl. moms. Business og Enterprise tilpasser vi jeres behov, så book en demo eller ring på +45 93 90 13 84.",
      },
      {
        q: "Hvordan kommer vi i gang?",
        a: "I opretter selv kontoen: I bekræfter jeres e-mail med en kode og slår virksomheden op på CVR (i andre EU-lande på momsnummer). Når I forbinder regnskabssystemet, henter qlim8 tre måneders historiske data med det samme, så I har et reelt billede fra første dag.",
      },
      {
        q: "Kan vi skifte pakke senere?",
        a: "Ja. I kan opgradere fra Free til Starter eller Premium direkte i appen, når behovet vokser. Skal I bruge Business eller Enterprise, så kontakt os, så sørger vi for det.",
      },
      {
        q: "Hvad er VSME, og er det obligatorisk?",
        a: "VSME (Voluntary SME Standard) er en frivillig ESG-rapporteringsstandard målrettet SMV'er, udviklet af EFRAG. Den er frivillig, men efterspørges i stigende grad af banker og større kunder som dokumentation for dit klimaarbejde.",
      },
      {
        q: "Har jeg brug for en revisor?",
        a: "Ikke for at komme i gang. qlim8 genererer revisionsklare beregninger med kildehenvisninger, som din revisor nemt kan efterprøve. Fra Starter kan I desuden give jeres revisor direkte adgang til platformen.",
      },
      {
        q: "Kan vi få mere historik med?",
        a: "Ja. Historisk Import er et tilkøb, der henter op til ét års historiske regnskabsdata fra Dinero med automatisk AI-klassificering, så I hurtigt har en baseline. I køber det direkte i appen.",
      },
    ],
  },
  closing: {
    title: "Se qlim8 på jeres egne tal",
    body: "Opret en gratis konto og se jeres egne tal, eller book en demo, så viser vi platformen og finder den pakke der passer. Du kan også ringe direkte eller skrive til os.",
  },
};
