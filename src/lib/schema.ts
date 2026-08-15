// Site-wide schema.org entities.
//
// Two things drove pulling these out of the page files. First, `Organization`
// existed twice, in app/page.tsx and app/om-os/page.tsx, copy-pasted and
// already drifted: the two blocks carried different `description` values and
// neither had an `@id`, so a crawler saw two unlinked companies rather than one
// with two descriptions. Second, nothing tied the entities together: the
// SoftwareApplication named a `provider` by name only, and no page declared the
// WebSite at all.
//
// Everything here is `@id`-addressable, so a page can reference an entity it
// does not restate. `ORG_REF` is that reference.
//
// Language note: the `featureList` strings are deliberately English while the
// site is Danish. They are read by crawlers and answer engines, not rendered to
// a visitor, and the English entity names ("Model Context Protocol (MCP)
// server", "VSME") are the strings a model matches an English query against.
// See "Terminology" in CLAUDE.md.

export const BASE_URL = "https://qlim8.com";

export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const SOFTWARE_ID = `${BASE_URL}/#software`;

/** Point at the Organization without restating it. */
export const ORG_REF = { "@id": ORG_ID } as const;

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "qlim8",
  legalName: "qlim8 ApS",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/favicon.svg`,
  },
  description:
    "qlim8 er en dansk ESG-platform, der automatiserer klimaregnskab (Scope 1-3) og VSME-rapportering for små og mellemstore virksomheder.",
  address: { "@type": "PostalAddress", addressCountry: "DK" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "kontakt@qlim8.com",
    telephone: "+45 93 90 13 84",
    areaServed: "DK",
    availableLanguage: ["da", "en"],
  },
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "DK" },
  },
  // The app, the developer portal and the machine-readable MCP surfaces are all
  // the same entity as far as a crawler is concerned. Naming them here is what
  // links a listing on an external MCP registry back to this company.
  sameAs: [
    "https://app.qlim8.com",
    "https://developers.qlim8.com",
    "https://www.npmjs.com/package/@qlim8/api-client",
    "https://pypi.org/project/qlim8/",
  ],
  taxID: "DK46033736",
};

export const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "qlim8",
  url: BASE_URL,
  inLanguage: "da-DK",
  publisher: ORG_REF,
};

/**
 * What the product actually does, in the terms a model matches a query against.
 *
 * Every entry is traceable: the tool count to qlim8-app
 * `server/mcp/lib/catalog.ts`, the VSME split to `server/reports/vsme.ts`, the
 * tiers to `shared/subscriptionFeatures.ts`.
 */
export const SOFTWARE_FEATURE_LIST = [
  "Model Context Protocol (MCP) server with 31 tools for AI agents",
  "VSME Basic and VSME Comprehensive sustainability reporting (EFRAG)",
  "Scope 1, 2 and 3 greenhouse gas accounting",
  "Scope 3 split across the 15 GHG Protocol categories",
  "Automatic data import from Danish accounting systems (Dinero, e-conomic, Billy)",
  "Metered electricity consumption from Eloverblik and Energinet",
  "REST API v1 with OpenAPI 3.1 specification and signed webhooks",
  "Tamper-evident audit trail with per-entry source citation",
  "Reduction targets and scenario planning",
  "Auditor access with version-locked report attestations",
  "EU hosting",
];

/**
 * Build the SoftwareApplication entity. Offers come from the caller so the
 * prices stay sourced from PRICING_COPY rather than being restated here.
 */
export function buildSoftwareSchema(offers: object[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: "qlim8",
    description:
      "qlim8 er en dansk platform til automatisering af klimaregnskab og ESG-rapportering, der dækker alle 3 scopes og udstiller data til AI-agenter via en indbygget MCP-server.",
    applicationCategory: "BusinessApplication",
    // applicationCategory is consumed as a known value, so the specific framing
    // goes in the subcategory rather than replacing it.
    applicationSubCategory: "ESG, sustainability and carbon accounting software",
    operatingSystem: "Web",
    inLanguage: "da-DK",
    areaServed: { "@type": "Country", name: "Denmark" },
    countriesSupported: "DK",
    featureList: SOFTWARE_FEATURE_LIST,
    softwareHelp: { "@type": "CreativeWork", url: `${BASE_URL}/docs` },
    offers,
    provider: ORG_REF,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** BreadcrumbList from a { name, href } trail. Mirrors buildBreadcrumbTrail. */
export function buildBreadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.href === "/" ? "/" : c.href}`,
    })),
  };
}

/** TechArticle for the /docs pages, which carried no structured data at all. */
export function buildTechArticleSchema(input: {
  headline: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.headline,
    description: input.description,
    url: `${BASE_URL}${input.path}`,
    inLanguage: "da-DK",
    isPartOf: { "@id": WEBSITE_ID },
    author: ORG_REF,
    publisher: ORG_REF,
    about: { "@id": SOFTWARE_ID },
  };
}

export function buildFaqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
