// Bundled default copy for the homepage (/). CMS pageKey: "page.home".
// The admin CMS in qlim8-app reads these defaults via /api/cms/defaults and
// stores per-field overrides; src/page-components/landing.tsx renders the
// merged result. Keep this file as the single source of truth for the
// bundled text: the JSX must not carry copy of its own.
//
// Version 2 (the green design), in the design's order: hero, integrations, the
// people who read the report (`recipients`), trust, steps, themes, the package
// teaser from the packages API, the human contact, the FAQ and the closing.
// The text is the copywriter's, fact-checked against the fact base: the
// mockup's "Forslag" passages are there in the fact-checked wording (the three
// recipient cards, the contact bio) or left out ("Vi slipper dig ikke").
// The shapes follow the rules in src/content/marketing/types.ts (homogeneous
// arrays, no optional keys in items).
//
// FAQ items and marketing images intentionally live under their original
// pageKeys ("homepage.faqs", "landing.images") and are not part of this map.
// Keys of the earlier version that are no longer rendered (features,
// builtDifferent, steps.intro, steps.ctaNote, hero.ctaNote, finalCta.body's
// old wording) are simply unused: an override of them does nothing.

import { DEMO_HREF, PHONE_DISPLAY, PHONE_HREF, STANDARD_MICRO, STANDARD_TRUST } from "@/content/cta";
import type { CtaLink, TrustItem } from "@/content/marketing/types";

export const HOME_PAGE_KEY = "page.home";

export interface HomeStep {
  title: string;
  body: string;
}

/** A teaser for one of the three themes, with the image from landing.images.feature1 to feature3. */
export interface HomeTheme {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}

// No price, CTA label or link: every package card books a demo, and the button
// is fixed in the component so a stale CMS value cannot put a price or a free
// signup back on it (src/content/cta.ts).
export interface HomePoint {
  title: string;
  body: string;
}

export interface HomePlan {
  name: string;
  badge?: string;
  tag: string;
  features: string[];
  highlighted: boolean;
}

export interface HomeCopy {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    trustLine: string[];
    microLine: string;
    imageAlt: string;
  };
  // The logos under the text are the connectors qlim8 ships
  // (src/content/integration-logos.ts), not something to edit in /admin.
  integrations: {
    title: string;
    paragraphs: string[];
    footnote: string;
  };
  /** Optional whole block: who reads the report (bank, auditor, customers). */
  recipients?: {
    title: string;
    intro: string;
    items: TrustItem[];
  };
  trust: {
    title: string;
    paragraphs: string[];
    items: TrustItem[];
  };
  steps: {
    title: string;
    items: HomeStep[];
  };
  themes: {
    title: string;
    intro: string;
    items: HomeTheme[];
  };
  pricingTeaser: {
    /** Over the package cards once the catalog sells something by itself. */
    title: string;
    /** The same section while the catalog does not (catalog v1, API down): no free start is promised. */
    salesLedTitle: string;
    /** A short lead and two points about starting free and the yearly agreement; shown only when the catalog sells by itself. */
    lead: string;
    points: HomePoint[];
    plans: HomePlan[];
    linkLabel: string;
  };
  human: {
    title: string;
    quote: string;
    quoteName: string;
    quoteRole: string;
    contact: {
      title: string;
      body: string;
      personName: string;
      personRole: string;
      phoneLine: string;
      emailLine: string;
      cta: CtaLink;
    };
  };
  faq: {
    title: string;
    linkLabel: string;
  };
  finalCta: {
    title: string;
    body: string;
    primary: CtaLink;
    secondary: CtaLink;
    trustLine: string[];
  };
}

export const HOME_COPY: HomeCopy = {
  hero: {
    title: "Enkel ESG-rapportering og klimaregnskab: Få ro i maven og styr på kravene",
    subtitle:
      "Du behøver ikke være ekspert i regler og udledninger for at levere et troværdigt klimaregnskab. qlim8 samler automatisk tallene fra de systemer, du allerede bruger i hverdagen, og guider dig sikkert igennem resten. Vi hjælper dig personligt i mål, så du kan stå inde for resultatet.",
    primaryCta: { label: "Kom gratis i gang, helt uden binding", href: "/priser" },
    secondaryCta: { label: "Tag en uformel snak (Book 15 min)", href: DEMO_HREF },
    trustLine: STANDARD_TRUST,
    microLine: STANDARD_MICRO,
    imageAlt: "Lys kontorplads i dagslys med bærbar, notesblok, kaffekop og plante",
  },
  integrations: {
    title: "Vi bygger på det, du allerede har: slip for unødigt tastearbejde",
    paragraphs: [
      "En stor del af det, du skal bruge til dit klimaregnskab, findes allerede i din virksomhed. qlim8 forbindes direkte med dine vante programmer som e-conomic, Dinero og Billy og henter dit elforbrug fra Eloverblik, så det kan regnes om med Energinets data.",
      "Så slipper du for uoverskuelige regneark og for at taste bilag ind og kan bruge din tid på at drive din forretning i fred og ro. Linjer, systemet er i tvivl om, lægges til side, så du kan kigge på dem først.",
    ],
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.",
  },
  recipients: {
    title: "Klar til dem, der skal læse dit klimaregnskab",
    intro:
      "Bliver din bankrådgiver, revisor eller storkunde tilfreds, når du afleverer det her? Det spørgsmål har vi bygget qlim8 omkring.",
    items: [
      {
        icon: "Landmark",
        title: "Til banken",
        body: "Spørger banken til jeres klimatal, deler du den samme rapport som alle andre steder. Den bygger på VSME og GHG-protokollen.",
      },
      {
        icon: "Calculator",
        title: "Til revisoren",
        body: "Hver udledningslinje har sit eget ID og kan spores tilbage til bilaget. Du inviterer selv revisoren, som kan læse med og attestere rapporten på en gratis konto.",
      },
      {
        icon: "Users",
        title: "Til dine kunder",
        body: "Spørger en større kunde, sender du rapporten som PDF eller Excel. Inviterer kunden dig i qlim8, deler du din udvidede VSME-rapport direkte.",
      },
    ],
  },
  trust: {
    title: "Tal, du kan stå inde for, når samarbejdspartnere spørger",
    paragraphs: [],
    items: [
      {
        icon: "Leaf",
        title: "Danske kilder først",
        body: "Primært Klimakompasset og Energinet, suppleret med det internationale datasæt EXIOBASE, hvor der kun findes et indkøbsbeløb.",
      },
      {
        icon: "Eye",
        title: "Du kan vise, hvor tallet kommer fra",
        body: "Hver udledningslinje kan spores tilbage til den faktura eller måling, den bygger på.",
      },
      {
        icon: "FileCheck",
        title: "Klar til at sende videre",
        body: "Færdige rapporter som overskuelig PDF eller Excel, lige til at sende til dem, der spørger.",
      },
    ],
  },
  steps: {
    title: "Sådan kommer du trygt igennem: skridt for skridt",
    items: [
      {
        title: "Opret en gratis profil i ro og mag",
        body: "Tag et kig rundt i dit eget tempo. Det koster ingenting, og du binder dig ikke til et abonnement.",
      },
      {
        title: "Forbind dit regnskab og dit elforbrug",
        body: "qlim8 henter tallene fra din bogføring og fra Eloverblik, så grundlaget er på plads uden tastearbejde.",
      },
      {
        title: "Vi hjælper dig trygt over målstregen",
        body: "Når rapporten er dannet, kan du dele den direkte. Er du i tvivl om det mindste, kigger vi det igennem sammen med dig.",
      },
    ],
  },
  themes: {
    title: "Fra dine tal til den færdige rapport",
    intro: "Se, hvad qlim8 gør med tallene, når de først er hentet ind.",
    items: [
      {
        title: "Overblik over hele året",
        body: "Dit klimaregnskab samlet ét sted, fordelt på Scope 1, 2 og 3.",
        href: "/produkt/platform-og-overblik",
        linkLabel: "Se platform og overblik",
      },
      {
        title: "Rapporter til dem, der spørger",
        body: "Excel med kilde og emissionsfaktor på hver linje, og en PDF-rapport i tre udgaver.",
        href: "/produkt/rapportering",
        linkLabel: "Se rapportering",
      },
      {
        title: "VSME-rapporten uden hovedbrud",
        body: "Både Basic- og Comprehensive-modulet, med de tal, der allerede ligger i platformen, som udgangspunkt.",
        href: "/produkt/vsme-rapport",
        linkLabel: "Se VSME-rapporten",
      },
    ],
  },
  pricingTeaser: {
    title: "Start i dit eget tempo, helt uden risiko",
    salesLedTitle: "Fem pakker. Find den der passer.",
    lead: "Du behøver ikke træffe store beslutninger i dag. Start gratis, og vælg en fast årsaftale, når du og din virksomhed føler jer trygge. Hvad pakkerne indeholder, ser du på prissiden.",
    points: [
      {
        title: "Gratis basisprofil, helt uden binding",
        body: "Med Free forbinder du Eloverblik og ét regnskabsprogram og ser dit eget klimaregnskab tage form. Free er gratis uden udløbsdato og kræver intet kreditkort.",
      },
      {
        title: "Et helt års fast partnerskab uden overraskelser",
        body: "Et klimaregnskab lever hele året. Derfor faktureres de betalte pakker årligt, og prisen vises pr. måned ekskl. moms. [[Den mindste faste aftale, Starter, koster {pris:starter:aar} ekskl. moms for hele året.]] Der er ingen skjulte gebyrer. Tilkøb, du selv vælger, fx import af historiske data, koster ekstra.",
      },
    ],
    plans: [
      {
        name: "Free",
        tag: "Gratis uden udløbsdato. Til virksomheder der vil have styr på deres klimaregnskab og et overblik over deres udledning.",
        features: [
          "Komplet Scope 1-3 klimaregnskab",
          "Ubegrænsede posteringer",
          "Én regnskabs- og én forsyningsforbindelse",
          "AI-kategorisering og fuld audit trail",
          "Excel- og PDF-eksport",
        ],
        highlighted: false,
      },
      {
        name: "Starter",
        tag: "Til SMV'er der skal levere VSME-rapport til banken og vil have det overstået ordentligt.",
        features: [
          "Alt i Free",
          "VSME Basis-rapport med wizard",
          "Ubegrænsede brugere og revisoradgang",
          "Op til 5 forbindelser, også lønsystemer",
        ],
        highlighted: false,
      },
      {
        name: "Premium",
        badge: "Anbefalet til de fleste",
        tag: "Til virksomheder der vil bruge ESG aktivt, reducere udledninger og dele resultater.",
        features: [
          "Alt i Starter",
          "VSME Comprehensive med wizard",
          "Reduction Hub med avancerede reduktionsmål",
          "Analyse af kategorier, leverandører og udvikling",
          "Offentlig profil og badge",
          "AI-assistenter via MCP-server",
        ],
        highlighted: true,
      },
      {
        name: "Business",
        tag: "Til virksomheder der vil planlægge reduktioner strategisk og have support tæt på.",
        features: [
          "Alt i Premium",
          "Scenario Builder: test tiltag før du beslutter",
          "Synk til Notion og Airtable",
          "Chat- og telefonsupport",
        ],
        highlighted: false,
      },
      {
        name: "Enterprise",
        tag: "Til organisationer der skal indsamle VSME-rapporter fra deres supply chain.",
        features: [
          "Alt i Business",
          "Komplet værdikæde via CVR",
          "CSRD-rapport",
          "Fuld API-adgang",
          "Dedikeret Customer Success Manager",
        ],
        highlighted: false,
      },
    ],
    linkLabel: "Se alle pakker",
  },
  human: {
    title: "Du står aldrig alene: vi hjælper dig personligt i gang",
    quote:
      "Vi ved godt, at ESG, klimaregnskaber og nye dokumentationskrav kan føles som en uvelkommen ekstraopgave i en travl hverdag. Derfor har vi bygget qlim8 så jordnært som muligt, og vi sidder klar til at tage dig i hånden, hvis du har brug for en hjælpende hånd.",
    quoteName: "Mads Dahlén Lund-Nielsen",
    quoteRole: "Stifter",
    contact: {
      title: "Vil du have en uforpligtende snak?",
      body: "Jeg har bygget qlim8 og har før arbejdet med klimatiltag som rådgiver for virksomheder og som klimakoordinator i en kommune. Du taler direkte med mig, og jeg forklarer tingene i øjenhøjde uden indviklet fagsprog.",
      personName: "Mads Dahlén Lund-Nielsen",
      personRole: "Stifter og civilingeniør i energiteknologi",
      phoneLine: `Ring direkte til mig på ${PHONE_DISPLAY}`,
      emailLine: "Eller skriv til kontakt@qlim8.com",
      cta: { label: "Book en uformel gennemgang (15 min)", href: DEMO_HREF },
    },
  },
  faq: {
    title: "Det spørger andre også om",
    linkLabel: "Flere spørgsmål? Kontakt os →",
  },
  finalCta: {
    title: "Få overblik over virksomhedens tal uden bekymringer",
    body: "Opret en gratis profil, og se hvor langt du allerede er med de tal, du har. Det er uforpligtende, gratis uden udløbsdato, og vi står klar til at hjælpe.",
    primary: { label: "Opret en gratis profil", href: "/priser" },
    secondary: { label: `Ring til os på ${PHONE_DISPLAY}`, href: PHONE_HREF },
    trustLine: ["Ingen binding", "Ingen kreditkort", "Personlig hjælp"],
  },
};
