// Kundetyper (customer types) collection: four industry pages. The hub is the
// "find your industry" page. Copy bodies live in ./copy/kundetyper-branche.ts,
// metadata (routing, SEO, hierarchy, block order) lives here. The 12 earlier
// industry pages redirect here (redirects.json).

import type { MarketingNode, MarketingHub } from "./types";
import {
  KUNDETYPER_HUB_COPY,
  KT_BYGGERI,
  KT_TRANSPORT,
  KT_PRODUKTION,
  KT_REVISORER,
} from "./copy/kundetyper-branche";

export const KUNDETYPER_HUB: MarketingHub = {
  collection: "kundetyper",
  route: "/kundetyper",
  pageKey: "page.kundetyper",
  title: "Kundetyper",
  seoTitle: "Klimaregnskab og ESG til din branche",
  seoDescription:
    "Håndværk, transport, produktion eller rådgivning: qlim8 bygger klimaregnskabet oven på din bogføring. Find din branche, og se hvad der fylder.",
  // The hub's copy carries its own questions.
  genericFaq: false,
  defaults: KUNDETYPER_HUB_COPY,
};

export const KUNDETYPER_NODES: MarketingNode[] = [
  {
    collection: "kundetyper",
    slug: "byggeri-og-haandvaerk",
    pageKey: "page.kundetyper.byggeri-og-haandvaerk",
    title: "Byggeri og håndværk",
    navLabel: "Byggeri og håndværk",
    blurb: "Klimaregnskab og ESG til tømrer, VVS, el, maler, murer og entreprenør, hentet fra din bogføring.",
    seoTitle: "Klimaregnskab og ESG til byggeri og håndværk",
    seoDescription:
      "Spørger hovedentreprenøren, bygherren eller banken efter CO2-tal? Få klimaregnskab og ESG til byggebranchen, hentet direkte fra din bogføring.",
    navGroup: "Brancher",
    featured: true,
    highlight: true,
    genericFaq: false,
    related: ["produkt/vsme-rapport", "produkt/leverandoerkaede", "produkt/audit-trail-og-revisor"],
    sectionOrder: ["hero", "reasons", "table", "howItWorks", "checks", "integrations", "contact", "faq", "related", "closingCta"],
    defaults: KT_BYGGERI,
  },
  {
    collection: "kundetyper",
    slug: "transport-og-vognmaend",
    pageKey: "page.kundetyper.transport-og-vognmaend",
    title: "Transport og vognmænd",
    navLabel: "Transport",
    blurb: "Klimaregnskab for vognmænd, kurerer og speditører, regnet ud fra fakturaerne i din bogføring.",
    seoTitle: "Klimaregnskab og CO2-rapport for vognmænd",
    seoDescription:
      "Beder speditøren eller kunden om jeres CO2-tal? qlim8 laver klimaregnskab og ESG-rapport for vognmænd ud fra fakturaerne i din bogføring.",
    navGroup: "Brancher",
    featured: true,
    genericFaq: false,
    related: ["produkt/vsme-rapport", "integrationer/eloverblik", "produkt/leverandoerkaede"],
    sectionOrder: ["hero", "reasons", "table", "howItWorks", "checks", "integrations", "contact", "faq", "related", "closingCta"],
    defaults: KT_TRANSPORT,
  },
  {
    collection: "kundetyper",
    slug: "produktion-og-industri",
    pageKey: "page.kundetyper.produktion-og-industri",
    title: "Produktion og industri",
    navLabel: "Produktion og industri",
    blurb: "Ét klimaregnskab til kundernes skemaer og banken, bygget på bogføringen og elmåleren i hallen.",
    seoTitle: "ESG og klimaregnskab til produktionsvirksomheder",
    seoDescription:
      "Klimaregnskab og VSME-rapport til dansk produktion og industri, bygget på bogføringen og elmåleren. Få styr på Scope 1, 2 og 3 uden konsulenttimer.",
    navGroup: "Brancher",
    featured: true,
    genericFaq: false,
    related: ["produkt/vsme-rapport", "integrationer/eloverblik", "produkt/leverandoerkaede"],
    sectionOrder: ["hero", "reasons", "table", "howItWorks", "checks", "integrations", "contact", "faq", "related", "closingCta"],
    defaults: KT_PRODUKTION,
  },
  {
    collection: "kundetyper",
    slug: "revisorer-og-raadgivere",
    pageKey: "page.kundetyper.revisorer-og-raadgivere",
    title: "Revisorer og rådgivere",
    navLabel: "Revisorer og rådgivere",
    blurb: "Klimaregnskab med faktor og kilde på hver linje, et revisionsspor og en gratis konto til revisor.",
    seoTitle: "Klimaregnskab og VSME for revisorer og rådgivere",
    seoDescription:
      "Klimaregnskab og VSME til dine SMV-kunder: hver linje kan spores tilbage til bilaget, med faktor og kilde. Revisorens egen konto er gratis.",
    navGroup: "Rådgivere",
    featured: true,
    genericFaq: false,
    related: ["produkt/audit-trail-og-revisor", "/metodologi", "produkt/vsme-rapport"],
    sectionOrder: ["hero", "reasons", "table", "features", "integrations", "options", "contact", "depth", "faq", "related", "closingCta"],
    defaults: KT_REVISORER,
  },
];
