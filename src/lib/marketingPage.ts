// Server helpers shared by every marketing route: page metadata, breadcrumb
// trail, and JSON-LD (page entity + BreadcrumbList + FAQPage). Keeps the
// ~40 route adapters to a few lines each and guarantees the visual breadcrumb
// and the structured-data breadcrumb come from one source.
//
// Every entity here hangs off the site-wide graph in src/lib/schema.ts:
// `publisher`/`provider` is ORG_REF and `isPartOf` is the WebSite @id. This
// file used to carry its own anonymous `Organization` and `WebSite` stubs, so
// the 44 marketing pages described a second, unlinked company next to the
// one the homepage, /om-os, /blog and /docs share. A crawler merges entities
// by @id, never by name, so that was two companies called qlim8.

import type { Metadata } from "next";
import type { MarketingNode, MarketingHub, MarketingPageCopy, FaqItem } from "@/content/marketing/types";
import type { NavLeaf } from "@/content/navigation";
import { getAncestors } from "@/content/marketing";
import {
  BASE_URL,
  ORG_REF,
  SOFTWARE_ID,
  WEBSITE_ID,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  isoDate,
  pageId,
} from "@/lib/schema";
import { contentDate } from "@/lib/contentDates";

export function nodePath(node: MarketingNode): string {
  return `/${node.collection}/${node.slug}`;
}

export function nodeUrl(node: MarketingNode): string {
  return `${BASE_URL}${nodePath(node)}`;
}

export function buildMarketingMetadata(node: MarketingNode): Metadata {
  const url = nodeUrl(node);
  const comingSoon = node.status === "coming-soon";
  return {
    title: node.seoTitle,
    description: node.seoDescription,
    alternates: { canonical: url },
    robots: comingSoon ? { index: false, follow: true } : undefined,
    openGraph: {
      title: node.seoTitle,
      description: node.seoDescription,
      url,
      type: "website",
      images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: node.title }],
    },
  };
}

export function buildHubMetadata(hub: MarketingHub): Metadata {
  const url = `${BASE_URL}${hub.route}`;
  return {
    title: hub.seoTitle,
    description: hub.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: hub.seoTitle,
      description: hub.seoDescription,
      url,
      type: "website",
      images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: hub.title }],
    },
  };
}

/** { name, href } trail: qlim8 → hub → ancestors → current (current last). */
export function buildBreadcrumbTrail(node: MarketingNode): { name: string; href: string }[] {
  const ancestors = getAncestors(node); // hub + intermediate nodes
  return [
    { name: "qlim8", href: "/" },
    ...ancestors.map((a) => ({ name: a.title, href: a.href })),
    { name: node.title, href: nodePath(node) },
  ];
}

/**
 * Leaf page: a WebPage that is part of the WebSite, published by the
 * Organization, about the product, with its breadcrumb linked by @id. Produkt
 * and integration pages additionally carry the feature/integration as the
 * page's main entity (a Service provided by the Organization); kundetyper
 * pages are plain WebPages about the product for that trade.
 *
 * `dateModified` is the route's git content date, the same value the sitemap
 * serves as <lastmod>, so the two never disagree.
 */
export function buildMarketingJsonLd(node: MarketingNode, copy: MarketingPageCopy): object[] {
  const path = nodePath(node);
  const url = nodeUrl(node);
  const dateModified = isoDate(contentDate(path));

  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageId(path),
    name: node.title,
    description: node.seoDescription,
    url,
    inLanguage: "da-DK",
    ...(dateModified ? { dateModified } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: ORG_REF,
    about: { "@id": SOFTWARE_ID },
    breadcrumb: { "@id": pageId(path, "breadcrumb") },
  };

  if (node.collection !== "kundetyper") {
    page.mainEntity = {
      "@type": "Service",
      "@id": pageId(path, "service"),
      name: node.title,
      description: node.seoDescription,
      url,
      serviceType: node.collection === "produkt" ? "Klimaregnskab" : "Integration",
      provider: ORG_REF,
      isRelatedTo: { "@id": SOFTWARE_ID },
    };
  }

  const schemas: object[] = [page, buildBreadcrumbSchema(buildBreadcrumbTrail(node))];
  if (copy.faq?.items?.length) schemas.push(buildFaqPageSchema(copy.faq.items));
  return schemas;
}

/** Structured data for a section hub: CollectionPage (with an ItemList of its
 *  cards) + BreadcrumbList + FAQPage. Lets crawlers/LLMs see the hub as a
 *  section index and read its FAQ. */
export function buildHubJsonLd(hub: MarketingHub, cards: NavLeaf[], faqItems?: FaqItem[]): object[] {
  const url = `${BASE_URL}${hub.route}`;
  const dateModified = isoDate(contentDate(hub.route));

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": pageId(hub.route),
    name: hub.title,
    description: hub.seoDescription,
    url,
    inLanguage: "da-DK",
    ...(dateModified ? { dateModified } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: ORG_REF,
    about: { "@id": SOFTWARE_ID },
    breadcrumb: { "@id": pageId(hub.route, "breadcrumb") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cards.length,
      itemListElement: cards.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        url: `${BASE_URL}${c.href}`,
      })),
    },
  };

  const schemas: object[] = [
    collectionPage,
    buildBreadcrumbSchema([
      { name: "qlim8", href: "/" },
      { name: hub.title, href: hub.route },
    ]),
  ];
  if (faqItems?.length) schemas.push(buildFaqPageSchema(faqItems));
  return schemas;
}
