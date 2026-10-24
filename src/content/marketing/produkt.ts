// Produkt (features) collection: six theme pages. Flat URLs; navGroup is the
// mega-menu column. Copy bodies live in ./copy/produkt-temaer.ts, metadata
// (routing, SEO, related, block order) lives here. The 21 earlier product pages
// redirect to these (redirects.json).

import type { MarketingNode, MarketingHub } from "./types";
import {
  PRODUKT_HUB_COPY,
  PR_PLATFORM,
  PR_RAPPORTERING,
  PR_VSME,
  PR_AUDIT,
  PR_REDUKTION,
  PR_LEVERANDOER,
} from "./copy/produkt-temaer";

export const PRODUKT_HUB: MarketingHub = {
  collection: "produkt",
  route: "/produkt",
  pageKey: "page.produkt",
  title: "Produkt",
  seoTitle: "Produkt: klimaregnskab fra faktura til rapport",
  seoDescription:
    "Se hele qlim8: overblik, rapporter, VSME, revisionsspor, reduktionsmål og leverandørkæde, bygget oven på den bogføring, du allerede har.",
  // The hub's copy carries its own questions.
  genericFaq: false,
  defaults: PRODUKT_HUB_COPY,
};

export const PRODUKT_NODES: MarketingNode[] = [
  {
    collection: "produkt",
    slug: "platform-og-overblik",
    pageKey: "page.produkt.platform-og-overblik",
    title: "Platform og overblik",
    navLabel: "Platform og overblik",
    blurb: "Se hele dit klimaregnskab ét sted, find ud af hvor udledningen kommer fra, og tag tallene med ud.",
    seoTitle: "Dashboard og overblik over dit klimaregnskab",
    seoDescription:
      "Se dit klimaregnskab på ét dashboard, fordelt på Scope 1, 2 og 3. Find de største kilder, spor hvert tal til bilaget, og hent dine data i Excel.",
    navGroup: "Overblik",
    featured: true,
    genericFaq: false,
    related: ["rapportering", "audit-trail-og-revisor", "/metodologi"],
    sectionOrder: ["hero", "integrations", "intro", "trust", "features", "howItWorks", "table", "depth", "contact", "faq", "related", "closingCta"],
    defaults: PR_PLATFORM,
  },
  {
    collection: "produkt",
    slug: "rapportering",
    pageKey: "page.produkt.rapportering",
    title: "Rapportering",
    navLabel: "Rapportering",
    blurb: "Færdige klimarapporter i PDF og Excel, som banken, kunden og bestyrelsen forstår med det samme.",
    seoTitle: "Klimarapport i PDF og Excel til bank og bestyrelse",
    seoDescription:
      "Lav en færdig klimarapport i PDF eller Excel fra din bogføring. Del den samme rapport med bestyrelse, bank og investorer, og spor hvert tal til bilaget.",
    navGroup: "Rapportering",
    featured: true,
    genericFaq: false,
    related: ["vsme-rapport", "audit-trail-og-revisor", "platform-og-overblik"],
    sectionOrder: ["hero", "intro", "trust", "features", "howItWorks", "table", "depth", "contact", "faq", "related", "closingCta"],
    defaults: PR_RAPPORTERING,
  },
  {
    collection: "produkt",
    slug: "vsme-rapport",
    pageKey: "page.produkt.vsme-rapport",
    title: "VSME-rapport",
    navLabel: "VSME-rapport",
    blurb: "VSME-rapporten i Basic- og Comprehensive-modulet, dannet fra det klimaregnskab, der bygger på bogføringen.",
    seoTitle: "VSME-rapport: Basic og Comprehensive fra bogføringen",
    seoDescription:
      "Dan VSME-rapporten i Basic- eller Comprehensive-modulet fra dit klimaregnskab. Se forskellen på modulerne, og hvem der beder om hvad.",
    navGroup: "Rapportering",
    featured: true,
    highlight: true,
    genericFaq: false,
    related: ["audit-trail-og-revisor", "leverandoerkaede", "rapportering"],
    sectionOrder: ["hero", "intro", "trust", "features", "table", "howItWorks", "depth", "contact", "faq", "related", "closingCta"],
    defaults: PR_VSME,
  },
  {
    collection: "produkt",
    slug: "audit-trail-og-revisor",
    pageKey: "page.produkt.audit-trail-og-revisor",
    title: "Audit trail og revisor",
    navLabel: "Audit trail og revisor",
    blurb: "Hver udledningslinje har sit eget ID og kan spores til bilaget. Revisoren får læseadgang og en gratis konto.",
    seoTitle: "Audit trail og revisoradgang til klimaregnskabet",
    seoDescription:
      "Hver udledningslinje har sit eget ID og spores til bilaget. Revisionsspor med hash-kæde, og revisoren får læseadgang og kan attestere rapporten.",
    navGroup: "Dokumentation",
    featured: true,
    genericFaq: false,
    related: ["kundetyper/revisorer-og-raadgivere", "vsme-rapport", "/metodologi"],
    sectionOrder: ["hero", "intro", "trust", "features", "table", "howItWorks", "depth", "contact", "faq", "related", "closingCta"],
    defaults: PR_AUDIT,
  },
  {
    collection: "produkt",
    slug: "reduktionsmaal-og-scenarier",
    pageKey: "page.produkt.reduktionsmaal-og-scenarier",
    title: "Reduktionsmål og klimaplan",
    navLabel: "Mål og klimaplan",
    blurb: "Sæt reduktionsmål på dine egne tal, følg dem mod en målkurve, og saml dine egne tiltag i en plan.",
    seoTitle: "Reduktionsmål og klimaplan med målkurve og tiltag",
    seoDescription:
      "Sæt et reduktionsmål på dit eget klimaregnskab, følg det år for år mod en målkurve, og planlæg dine egne tiltag, gerne med en rådgivers hjælp.",
    navGroup: "Handling",
    featured: true,
    genericFaq: false,
    related: ["platform-og-overblik", "vsme-rapport", "/metodologi"],
    sectionOrder: ["hero", "intro", "trust", "features", "table", "howItWorks", "depth", "contact", "faq", "related", "closingCta"],
    defaults: PR_REDUKTION,
  },
  {
    collection: "produkt",
    slug: "leverandoerkaede",
    pageKey: "page.produkt.leverandoerkaede",
    title: "Leverandørkæde",
    navLabel: "Leverandørkæde",
    blurb: "Invitér leverandørerne, få deres VSME Comprehensive-rapport og PCF/EPD ind, og eksportér oversigten.",
    seoTitle: "Leverandørkæde og Scope 3: data fra leverandørerne",
    seoDescription:
      "Invitér leverandører enkeltvis eller fra en CSV- eller Excel-fil. De kan dele deres VSME Comprehensive-rapport, og I kan eksportere oversigten.",
    navGroup: "Samarbejde",
    featured: true,
    genericFaq: false,
    related: ["vsme-rapport", "kundetyper/produktion-og-industri", "/metodologi"],
    sectionOrder: ["hero", "intro", "trust", "features", "table", "howItWorks", "depth", "contact", "faq", "related", "closingCta"],
    defaults: PR_LEVERANDOER,
  },
];
