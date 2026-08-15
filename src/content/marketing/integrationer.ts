// Integrationer collection. Accounting systems + energy + developer surfaces.
// Appelsin is status "coming-soon" (still statically generated, noindex, shown
// as a non-linked "Kommer snart" card on the hub).

import type { MarketingNode, MarketingHub } from "./types";
import {
  INTEGRATIONER_HUB_COPY,
  IN_ECONOMIC,
  IN_DINERO,
  IN_BILLY,
  IN_APPELSIN,
  IN_ELOVERBLIK,
  IN_REST_API,
  IN_MCP,
  IN_VSME_MCP,
} from "./copy/integrationer-copy";

export const INTEGRATIONER_HUB: MarketingHub = {
  collection: "integrationer",
  route: "/integrationer",
  pageKey: "page.integrationer",
  title: "Integrationer",
  seoTitle: "Integrationer: vi henter data fra dine systemer",
  seoDescription:
    "Forbind e-conomic, Dinero, Billy og Eloverblik. Dine posteringer og dit elforbrug bliver til klimaregnskab automatisk. Plus REST API og MCP server.",
  defaults: INTEGRATIONER_HUB_COPY,
};

export const INTEGRATIONER_NODES: MarketingNode[] = [
  {
    collection: "integrationer", slug: "e-conomic", pageKey: "page.integrationer.e-conomic",
    title: "e-conomic", navLabel: "e-conomic",
    blurb: "Forbind e-conomic: posteringer bliver til klimaregnskab automatisk.",
    seoTitle: "e-conomic klimaregnskab-integration",
    seoDescription: "Forbind e-conomic til qlim8, og få dine posteringer kategoriseret og omregnet til klimaregnskab automatisk, uden manuel indtastning.",
    navGroup: "Regnskab", featured: true, related: ["dinero", "billy", "eloverblik"],
    defaults: IN_ECONOMIC,
  },
  {
    collection: "integrationer", slug: "dinero", pageKey: "page.integrationer.dinero",
    title: "Dinero", navLabel: "Dinero",
    blurb: "Forbind Dinero med ét klik: regnskabsdata bliver til klimaregnskab.",
    seoTitle: "Dinero klimaregnskab-integration",
    seoDescription: "Forbind Dinero til qlim8 via sikker adgang, og lad dine regnskabsdata blive til et klimaregnskab automatisk. Perfekt til mindre virksomheder.",
    navGroup: "Regnskab", featured: true, related: ["e-conomic", "billy", "eloverblik"],
    defaults: IN_DINERO,
  },
  {
    collection: "integrationer", slug: "billy", pageKey: "page.integrationer.billy",
    title: "Billy by Shine", navLabel: "Billy by Shine",
    blurb: "Forbind Billy: dit regnskab bliver til klimaregnskab automatisk.",
    seoTitle: "Billy klimaregnskab-integration",
    seoDescription: "Forbind Billy by Shine til qlim8, og få dine regnskabsdata omregnet til klimaregnskab automatisk, uden regneark.",
    navGroup: "Regnskab", featured: true, related: ["dinero", "e-conomic", "eloverblik"],
    defaults: IN_BILLY,
  },
  {
    collection: "integrationer", slug: "appelsin", pageKey: "page.integrationer.appelsin",
    title: "Appelsin", navLabel: "Appelsin",
    blurb: "Appelsin-integration på vej: kommer snart.",
    seoTitle: "Appelsin-integration (kommer snart)",
    seoDescription: "En Appelsin-integration til qlim8 er under udvikling. Se hvad du kan forvente, når den lander.",
    navGroup: "Regnskab", featured: true, status: "coming-soon", related: ["dinero", "e-conomic", "billy"],
    defaults: IN_APPELSIN,
  },
  {
    collection: "integrationer", slug: "eloverblik", pageKey: "page.integrationer.eloverblik",
    title: "Eloverblik", navLabel: "Eloverblik",
    blurb: "Hent faktisk elforbrug (Scope 2) automatisk fra Eloverblik.",
    seoTitle: "Eloverblik-integration til Scope 2",
    seoDescription: "Hent dit faktiske elforbrug automatisk fra Eloverblik og Energinet, så dit Scope 2 bygger på præcise tal i stedet for skøn.",
    navGroup: "Data & API", featured: true, related: ["e-conomic", "dinero", "rest-api"],
    defaults: IN_ELOVERBLIK,
  },
  {
    collection: "integrationer", slug: "rest-api", pageKey: "page.integrationer.rest-api",
    title: "REST API", navLabel: "REST API",
    blurb: "Byg oven på qlim8: hent emissioner og rapporter programmatisk.",
    seoTitle: "qlim8 REST API",
    seoDescription: "Byg oven på qlim8 med REST API'et: hent emissioner og rapporter programmatisk og modtag webhooks. Se API-referencen i vores docs.",
    navGroup: "Data & API", featured: true, related: ["mcp-server", "eloverblik", "e-conomic"],
    defaults: IN_REST_API,
  },
  {
    collection: "integrationer", slug: "mcp-server", pageKey: "page.integrationer.mcp-server",
    title: "AI-integration (MCP)", navLabel: "AI-assistenter",
    blurb: "Snak med dit klimaregnskab i Claude eller ChatGPT.",
    seoTitle: "AI-integration til klimaregnskab via MCP-server",
    seoDescription: "Forbind qlim8 til Claude og ChatGPT via vores MCP-server, og spørg dit klimaregnskab i naturligt sprog. 31 tools, OAuth uden API-nøgle.",
    navGroup: "Data & API", featured: true, related: ["vsme-rapport-med-ai-agent", "rest-api", "eloverblik"],
    defaults: IN_MCP,
  },
  {
    collection: "integrationer", slug: "vsme-rapport-med-ai-agent",
    pageKey: "page.integrationer.vsme-rapport-med-ai-agent",
    title: "VSME-rapport med AI-agent", navLabel: "VSME med AI-agent",
    blurb: "Lad din assistent hente VSME-tallene og sætte rapporten i gang.",
    seoTitle: "VSME-rapport via AI-agent og MCP-server",
    seoDescription: "qlim8 er en dansk ESG-platform til VSME-rapportering med indbygget MCP-server. Lad Claude eller ChatGPT hente dine Scope 1-3 tal og starte VSME-rapporten.",
    parentSlug: "mcp-server",
    navGroup: "Data & API", featured: true, related: ["mcp-server", "rest-api", "produkt/vsme-rapport"],
    defaults: IN_VSME_MCP,
  },
];
