// The JSON-LD a page emits, kept out of the page file so that
// scripts/check-schema.mjs can import exactly what ships: a page.tsx holds JSX
// and may only export Next route fields, and the check used to rebuild these
// pages from the builders with placeholder arguments instead, so an entity
// written straight into a page's schema was never checked. Each page imports
// its constant from here and passes it to <JsonLd>.
import {
  BASE_URL,
  ORG_REF,
  SOFTWARE_ID,
  WEBSITE_ID,
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildFaqPageSchema,
  buildTechArticleSchema,
  pageId,
} from "@/lib/schema";
import { contentDate } from "@/lib/contentDates";

// app/metodologi/page.tsx
// Priority 0.8 in the sitemap and, until now, the only high-priority page
// with no structured data at all.
export const METHODOLOGY_PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "Metodologi: sådan beregner qlim8 dit klimaregnskab",
    description:
      "Alle emissionsfaktorer, datakilder og beregningsmetoder bag et scope 1-3 klimaregnskab i qlim8: DEFRA, BEIS, Klimakompasset og GHG Protocol.",
    path: "/metodologi",
    dateModified: contentDate("/metodologi"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Metodologi", href: "/metodologi" },
  ]),
];

// app/kontakt/page.tsx
export const CONTACT_PAGE_SCHEMA = [
  buildContactPageSchema({
    name: "Kontakt qlim8",
    description:
      "Book en demo af qlim8, eller stil et spørgsmål om klimaregnskab og ESG via formularen, på email eller telefon.",
    dateModified: contentDate("/kontakt"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Kontakt", href: "/kontakt" },
  ]),
];

// app/docs/page.tsx
export const DOCS_PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "Sådan kommer du i gang med qlim8",
    description:
      "Vejledninger til opsætning, integrationer, REST API og AI-assistenter via MCP.",
    path: "/docs",
    dateModified: contentDate("/docs"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Docs", href: "/docs" },
  ]),
];

// app/docs/mcp-quickstart/page.tsx
// The page is already written as six numbered steps, so a HowTo describes it
// accurately rather than being retro-fitted onto prose. Step names mirror the
// <Section number title> headings on that page; keep them in step if those change.
const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Forbind din AI-assistent til dine qlim8-klimadata",
  description:
    "Forbind Claude eller ChatGPT til qlim8 via MCP (Model Context Protocol) og spørg til dit klimaregnskab i naturligt sprog. Ingen API-nøgle og ingen kode.",
  inLanguage: "da-DK",
  totalTime: "PT5M",
  tool: [{ "@type": "HowToTool", name: "En qlim8-konto med Premium" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Før du starter", url: `${BASE_URL}/docs/mcp-quickstart#1` },
    { "@type": "HowToStep", position: 2, name: "Claude (claude.ai, desktop og mobil)", url: `${BASE_URL}/docs/mcp-quickstart#2` },
    { "@type": "HowToStep", position: 3, name: "ChatGPT", url: `${BASE_URL}/docs/mcp-quickstart#3` },
    { "@type": "HowToStep", position: 4, name: "Gemini", url: `${BASE_URL}/docs/mcp-quickstart#4` },
    { "@type": "HowToStep", position: 5, name: "Hvad kan du spørge om?", url: `${BASE_URL}/docs/mcp-quickstart#5` },
    { "@type": "HowToStep", position: 6, name: "Sikkerhed og adgang", url: `${BASE_URL}/docs/mcp-quickstart#6` },
  ],
};
export const MCP_QUICKSTART_PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "Forbind din AI-assistent til dine klimadata",
    description:
      "Forbind Claude eller ChatGPT til dine qlim8-klimadata på få minutter via MCP. Log ind med din qlim8-konto: ingen API-nøgle, ingen kode.",
    path: "/docs/mcp-quickstart",
    dateModified: contentDate("/docs/mcp-quickstart"),
  }),
  HOWTO_SCHEMA,
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Docs", href: "/docs" },
    { name: "MCP quickstart", href: "/docs/mcp-quickstart" },
  ]),
];

// app/docs/mcp-tools/page.tsx
export const MCP_TOOLS_PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "qlim8 MCP tool-reference",
    description:
      "qlim8's MCP-server (Model Context Protocol) eksponerer 32 tools, 3 resources og 3 prompts til AI-assistenter som Claude og ChatGPT.",
    path: "/docs/mcp-tools",
    dateModified: contentDate("/docs/mcp-tools"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Docs", href: "/docs" },
    { name: "MCP tools", href: "/docs/mcp-tools" },
  ]),
];

// app/docs/api-reference/page.tsx
export const API_REFERENCE_PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "qlim8 REST API v1 reference",
    description:
      "Versioneret REST API med OpenAPI 3.1-spec, Bearer-auth med scopes, cursor-paginering og signerede webhooks. Plus OAuth 2.1 til MCP-connectors.",
    path: "/docs/api-reference",
    dateModified: contentDate("/docs/api-reference"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Docs", href: "/docs" },
    { name: "API reference", href: "/docs/api-reference" },
  ]),
];

// app/api/page.tsx
// /api is a marketing page about the programmatic surface, not a route handler.
// It carried the heaviest MCP copy on the site and no structured data at all.
const API_FAQ = [
  {
    q: "Hvad er qlim8's MCP-server?",
    a: "Det er en live server, der taler Model Context Protocol, den standard AI-assistenter bruger til at hente data fra et system. Claude, ChatGPT, Claude Code, Cursor og egne agenter kan kalde 32 kuraterede tools og hente emissioner, generere rapporter, oprette mål og planlægge reduktioner. Endpointet er https://app.qlim8.com/api/mcp.",
  },
  {
    q: "Hvordan forbinder jeg uden en API-nøgle?",
    a: "Claude og ChatGPT forbinder via OAuth 2.1 med dynamisk klient-registrering, så der er ingen nøgle at kopiere. Consent gives af en tenant-admin og er read-only som default. Udviklere kan i stedet bruge samme Bearer-nøgle som REST-API'et.",
  },
  {
    q: "Kan jeg læse tool-kataloget programmatisk?",
    a: "Ja. https://app.qlim8.com/api/mcp/schema er et uautentificeret discovery-dokument med alle 32 tools, deres scopes, annotationer og konventioner for paginering, datoer og fejl.",
  },
  {
    q: "Kan en AI-agent lave en VSME-rapport?",
    a: "Ja. generate_report sætter en VSME Basis eller Comprehensive-rapport i gang for et rapportår, og get_report_status følger jobbet. Kaldet er idempotent pr. år og standard. MCP-adgang kræver Premium.",
  },
];
export const API_PAGE_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageId("/api"),
    name: "API og MCP: programmatisk adgang til klimaregnskabsdata",
    description:
      "qlim8's REST API v1 og MCP-server giver programmatisk adgang til Scope 1-3 emissioner, VSME-rapporter, leverandørdata og webhooks.",
    url: `${BASE_URL}/api`,
    inLanguage: "da-DK",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": SOFTWARE_ID },
    publisher: ORG_REF,
  },
  buildFaqPageSchema(API_FAQ),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "API og MCP", href: "/api" },
  ]),
];
