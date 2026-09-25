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
 * Build the SoftwareApplication entity. It carries no `offers`: qlim8 is sold
 * after a demo and publishes no package prices (src/content/cta.ts), so there
 * is no price for structured data to state. The homepage and /priser emit this
 * same #software entity.
 */
export function buildSoftwareSchema() {
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
    provider: ORG_REF,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** BreadcrumbList from a { name, href } trail. Mirrors buildBreadcrumbTrail.
 *  Its @id is the current page's URL + #breadcrumb, so the page entity can
 *  reference it via `breadcrumb: { "@id": ... }`. */
export function buildBreadcrumbSchema(trail: { name: string; href: string }[]) {
  const current = trail[trail.length - 1]?.href ?? "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": pageId(current, "breadcrumb"),
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.href === "/" ? "/" : c.href}`,
    })),
  };
}

/** A page's own @id: the canonical URL plus a fragment, so entities on the
 *  page (breadcrumb, main entity) can point at each other without restating. */
export function pageId(path: string, fragment = "webpage") {
  return `${BASE_URL}${path === "/" ? "/" : path}#${fragment}`;
}

/** YYYY-MM-DD from a Date or ISO string, for datePublished / dateModified. */
export function isoDate(d: Date | string | undefined): string | undefined {
  if (!d) return undefined;
  const date = d instanceof Date ? d : new Date(d);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

/**
 * TechArticle for the /docs pages and /metodologi. `dateModified` comes from
 * the route's git content date (src/lib/contentDates.ts) so it moves when the
 * page's copy does and matches the sitemap <lastmod> for the same URL.
 */
export function buildTechArticleSchema(input: {
  headline: string;
  description: string;
  path: string;
  dateModified?: Date | string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": pageId(input.path, "article"),
    headline: input.headline,
    description: input.description,
    url: `${BASE_URL}${input.path}`,
    inLanguage: "da-DK",
    ...(isoDate(input.dateModified) ? { dateModified: isoDate(input.dateModified) } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    author: ORG_REF,
    publisher: ORG_REF,
    about: { "@id": SOFTWARE_ID },
  };
}

/**
 * Article for a blog post. Author and publisher are ORG_REF: the post used to
 * inline its own `Organization` without an @id, which read as a third company
 * next to the homepage's and the marketing pages'. `dateModified` is the CMS
 * edit date when there is one, never silently equal to datePublished.
 */
export function buildArticleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  articleSection?: string;
}) {
  const url = `${BASE_URL}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": pageId(input.path, "article"),
    headline: input.headline,
    description: input.description,
    image: [`${BASE_URL}/opengraph.jpg`],
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: ORG_REF,
    publisher: ORG_REF,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": WEBSITE_ID },
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
    inLanguage: "da-DK",
  };
}

/** ContactPage for /kontakt, pointing at the Organization's contactPoint. */
export function buildContactPageSchema(input: { name: string; description: string; dateModified?: Date | string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": pageId("/kontakt"),
    name: input.name,
    description: input.description,
    url: `${BASE_URL}/kontakt`,
    inLanguage: "da-DK",
    ...(isoDate(input.dateModified) ? { dateModified: isoDate(input.dateModified) } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    about: ORG_REF,
    mainEntity: ORG_REF,
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
