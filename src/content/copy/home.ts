// Bundled default copy for the homepage (/). CMS pageKey: "page.home".
// The admin CMS in qlim8-app reads these defaults via /api/cms/defaults and
// stores per-field overrides; src/page-components/landing.tsx renders the
// merged result. Keep this file as the single source of truth for the
// bundled text: the JSX must not carry copy of its own.
//
// Version 2 (the green design): the text is the owner's, from the mockup
// "qlim8 Grøn Landingside", in the design's order: hero, integrations, (a
// section for the people who read the report), trust, steps, themes, the
// package teaser from the packages API, the human contact, the FAQ and the
// closing. Every passage the mockup marks "Forslag" awaits a fact-check and is
// left out: the three "recipients" cards (`recipients`, optional and absent
// here), the "Vi slipper dig ikke" paragraph, the data-hosting FAQ answer, and
// the bio "Mød personen bag". The shapes follow the rules in
// src/content/marketing/types.ts (homogeneous arrays, no optional keys in
// items); `recipients` is a whole optional block, which a CMS can add.
//
// FAQ items and marketing images intentionally live under their original
// pageKeys ("homepage.faqs", "landing.images") and are not part of this map.
// Keys of the earlier version that are no longer rendered (features,
// builtDifferent, steps.intro, steps.ctaNote, hero.ctaNote, finalCta.body's
// old wording) are simply unused: an override of them does nothing.

import { DEMO_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";
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
  /** Optional whole block: who reads the report. Absent until its text is fact-checked. */
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
    title: string;
    plans: HomePlan[];
    linkLabel: string;
  };
  human: {
    title: string;
    quote: string;
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
  };
}

export const HOME_COPY: HomeCopy = {
  hero: {
    title: "Enkel ESG-rapportering og klimaregnskab: Få ro i maven og styr på kravene",
    subtitle:
      "Du behøver ikke være ekspert i regler og udledninger for at levere et troværdigt klimaregnskab. qlim8 samler automatisk tallene fra de systemer, du allerede bruger i hverdagen, og guider dig sikkert igennem resten. Vi hjælper dig personligt i mål, så du altid kan stå inde for resultatet.",
    primaryCta: { label: "Kom gratis i gang, helt uden binding", href: "/priser" },
    secondaryCta: { label: "Tag en uformel snak (Book 15 min)", href: DEMO_HREF },
    trustLine: ["Ingen binding", "Tager 2 minutter", "Vi hjælper dig i gang"],
    microLine: `Ingen kreditkort påkrævet · Personlig support på ${PHONE_DISPLAY}`,
    imageAlt: "En rolig arbejdsplads i dagslys med bærbar, notesblok, kaffekop og plante",
  },
  integrations: {
    title: "Vi bygger på det, du allerede har: slip for unødigt tastearbejde",
    paragraphs: [
      "Størstedelen af de oplysninger, du skal bruge til dit klimaregnskab, findes allerede i din virksomhed. qlim8 forbinder direkte til dine vante programmer som e-conomic, Dinero, Billy og dit elforbrug via Energinet.",
      "Det betyder, at du slipper for at kæmpe med uoverskuelige regneark og manuelle indtastninger. Platformen finder selv tallene frem og sikrer, at alt er dokumenteret korrekt, så du kan bruge din tid på at drive din forretning i fred og ro.",
    ],
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere",
  },
  trust: {
    title: "Danske data du kan stå inde for, når samarbejdspartnere spørger",
    paragraphs: [
      "Når større kunder, samarbejdspartnere eller rådgivere efterspørger dokumentation på din virksomheds klimaaftryk, handler det om tillid. qlim8 anvender udelukkende officielle danske emissionsfaktorer fra Klimakompasset og Energinet.",
      "Hvert eneste tal er fuldt sporbart tilbage til den konkrete faktura eller måling. Det giver både dig og modtageren vished om, at tallene stemmer, helt uden kreative formler eller usikre gæt.",
    ],
    items: [
      { icon: "ShieldCheck", title: "Officielle danske standarder", body: "Ingen gætværk baseret på udenlandske gennemsnit." },
      { icon: "Eye", title: "Fuld gennemsigtighed", body: "Du kan altid vise præcis, hvor et tal kommer fra." },
      { icon: "Download", title: "Klar til deling", body: "Færdige rapporter, der er lige til at sende videre som overskuelig PDF eller Excel." },
    ],
  },
  steps: {
    title: "Sådan kommer I trygt igennem processen: skridt for skridt",
    items: [
      {
        title: "Opret en gratis profil i ro og mag",
        body: "Tag et kig rundt i platformen i dit eget tempo. Det koster ingenting, og du binder dig ikke til et abonnement.",
      },
      {
        title: "Hent data automatisk med få klik",
        body: "qlim8 henter automatisk oplysningerne fra dit regnskabsprogram og elforbrug, så grundlaget er på plads uden besvær.",
      },
      {
        title: "Vi hjælper dig trygt over målstregen",
        body: "Når rapporten er dannet, kan du dele den direkte. Er du i tvivl om det mindste, kigger vi det igennem sammen med dig.",
      },
    ],
  },
  themes: {
    title: "Det får du, når du er i gang",
    intro: "",
    items: [
      {
        title: "Sat op én gang, kører i baggrunden",
        body: "Forbind dit regnskabssystem og dit Eloverblik én gang. Derefter holder qlim8 klimaregnskabet opdateret af sig selv.",
        href: "/integrationer",
        linkLabel: "Se, hvordan data hentes",
      },
      {
        title: "Hver beregning kan spores til kilden",
        body: "Du kan klikke fra dashboardet ned i den konkrete beregning: input, emissionsfaktor og kilde. Når revisor spørger, har du svaret.",
        href: "/produkt/audit-trail",
        linkLabel: "Se sporbarheden",
      },
      {
        title: "Ikke bare et tal: en plan",
        body: "Når du har målt, kan du sætte reduktionsmål ud fra dine egne tal og se effekten af et tiltag, før du beslutter dig.",
        href: "/produkt/scenarier",
        linkLabel: "Se, hvordan du planlægger",
      },
    ],
  },
  pricingTeaser: {
    title: "Fem pakker. Find den der passer.",
    plans: [
      {
        name: "Free",
        tag: "Gratis for altid. Til virksomheder der vil have styr på deres klimaregnskab og et overblik over deres udledning.",
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
    linkLabel: "Se fuld sammenligning →",
  },
  human: {
    title: "Du står aldrig alene: vi hjælper dig personligt i gang",
    quote:
      "Vi ved godt, at ESG, klimaregnskaber og nye dokumentationskrav kan føles som en uvelkommen ekstraopgave i en travl hverdag. Derfor har vi bygget qlim8 så jordnært som muligt, og vi sidder klar til at tage dig i hånden, hvis du har brug for en hjælpende hånd.",
    contact: {
      title: "Vil du have en uforpligtende snak?",
      body: "Du taler direkte med os, der kender platformen ud og ind, og vi forklarer altid tingene i øjenhøjde uden indviklet fagsprog.",
      personName: "Mads",
      personRole: "Grundlægger",
      phoneLine: `Ring direkte til mig på ${PHONE_DISPLAY}`,
      emailLine: "Eller send en mail på kontakt@qlim8.com",
      cta: { label: "Book en uformel gennemgang (15 min)", href: DEMO_HREF },
    },
  },
  faq: {
    title: "Det spørger andre også om",
    linkLabel: "Flere spørgsmål? Kontakt os →",
  },
  finalCta: {
    title: "Få overblik over virksomhedens tal uden bekymringer",
    body: "Opret en gratis konto i dag, og se hvor langt du allerede er med dine eksisterende tal. Det er uforpligtende, gratis for altid i basisversionen, og vi står klar til at hjælpe.",
    primary: { label: "Opret gratis profil nu", href: "/priser" },
    secondary: { label: `Ring til os på ${PHONE_DISPLAY}`, href: PHONE_HREF },
  },
};
