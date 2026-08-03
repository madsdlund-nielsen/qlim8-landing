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
} from "./copy/integrationer-copy";

export const INTEGRATIONER_HUB: MarketingHub = {
  collection: "integrationer",
  route: "/integrationer",
  pageKey: "page.integrationer",
  title: "Integrationer",
  seoTitle: "Integrationer: vi henter data fra dine systemer | qlim8",
  seoDescription:
    "Forbind e-conomic, Dinero, Billy og Eloverblik. Dine posteringer og dit elforbrug bliver til klimaregnskab automatisk. Plus REST API og MCP server.",
  defaults: INTEGRATIONER_HUB_COPY,
};

export const INTEGRATIONER_NODES: MarketingNode[] = [
  {
    collection: "integrationer", slug: "e-conomic", pageKey: "page.integrationer.e-conomic",
    title: "e-conomic", navLabel: "e-conomic",
    blurb: "Forbind e-conomic: posteringer bliver til klimaregnskab automatisk.",
    seoTitle: "e-conomic klimaregnskab-integration | qlim8",
    seoDescription: "Forbind e-conomic til qlim8, og få dine posteringer kategoriseret og omregnet til klimaregnskab automatisk, uden manuel indtastning.",
    navGroup: "Regnskab", featured: true, related: ["dinero", "billy", "eloverblik"],
    defaults: IN_ECONOMIC,
  },
  {
    collection: "integrationer", slug: "dinero", pageKey: "page.integrationer.dinero",
    title: "Dinero", navLabel: "Dinero",
    blurb: "Forbind Dinero med ét klik: regnskabsdata bliver til klimaregnskab.",
    seoTitle: "Dinero klimaregnskab-integration | qlim8",
    seoDescription: "Forbind Dinero til qlim8 via sikker adgang, og lad dine regnskabsdata blive til et klimaregnskab automatisk. Perfekt til mindre virksomheder.",
    navGroup: "Regnskab", featured: true, related: ["e-conomic", "billy", "eloverblik"],
    defaults: IN_DINERO,
  },
  {
    collection: "integrationer", slug: "billy", pageKey: "page.integrationer.billy",
    title: "Billy by Shine", navLabel: "Billy by Shine",
    blurb: "Forbind Billy: dit regnskab bliver til klimaregnskab automatisk.",
    seoTitle: "Billy klimaregnskab-integration | qlim8",
    seoDescription: "Forbind Billy by Shine til qlim8, og få dine regnskabsdata omregnet til klimaregnskab automatisk, uden regneark.",
    navGroup: "Regnskab", featured: true, related: ["dinero", "e-conomic", "eloverblik"],
    defaults: IN_BILLY,
  },
  {
    collection: "integrationer", slug: "appelsin", pageKey: "page.integrationer.appelsin",
    title: "Appelsin", navLabel: "Appelsin",
    blurb: "Appelsin-integration på vej: kommer snart.",
    seoTitle: "Appelsin-integration (kommer snart) | qlim8",
    seoDescription: "En Appelsin-integration til qlim8 er under udvikling. Se hvad du kan forvente, når den lander.",
    navGroup: "Regnskab", featured: true, status: "coming-soon", related: ["dinero", "e-conomic", "billy"],
    defaults: IN_APPELSIN,
  },
  {
    collection: "integrationer", slug: "eloverblik", pageKey: "page.integrationer.eloverblik",
    title: "Eloverblik", navLabel: "Eloverblik",
    blurb: "Hent faktisk elforbrug (Scope 2) automatisk fra Eloverblik.",
    seoTitle: "Eloverblik-integration til Scope 2 | qlim8",
    seoDescription: "Hent dit faktiske elforbrug automatisk fra Eloverblik og Energinet, så dit Scope 2 bygger på præcise tal i stedet for skøn.",
    navGroup: "Data & API", featured: true, related: ["e-conomic", "dinero", "rest-api"],
    defaults: IN_ELOVERBLIK,
  },
  {
    collection: "integrationer", slug: "rest-api", pageKey: "page.integrationer.rest-api",
    title: "REST API", navLabel: "REST API",
    blurb: "Byg oven på qlim8: hent emissioner og rapporter programmatisk.",
    seoTitle: "qlim8 REST API | qlim8",
    seoDescription: "Byg oven på qlim8 med REST API'et: hent emissioner og rapporter programmatisk og modtag webhooks. Se API-referencen i vores docs.",
    navGroup: "Data & API", featured: true, related: ["mcp-server", "eloverblik", "e-conomic"],
    defaults: IN_REST_API,
  },
  {
    collection: "integrationer", slug: "mcp-server", pageKey: "page.integrationer.mcp-server",
    title: "MCP server", navLabel: "MCP server",
    blurb: "Forbind dit klimaregnskab til AI-assistenter via MCP.",
    seoTitle: "qlim8 MCP server til AI-assistenter | qlim8",
    seoDescription: "Forbind qlim8 til Claude og andre AI-assistenter via MCP, og spørg dit klimaregnskab i naturligt sprog. Se MCP-værktøjerne i vores docs.",
    navGroup: "Data & API", featured: true, related: ["rest-api", "eloverblik", "dinero"],
    defaults: IN_MCP,
  },
];
