// Server helpers shared by every marketing route: page metadata, breadcrumb
// trail, and JSON-LD (primary entity + BreadcrumbList + FAQPage). Keeps the
// ~40 route adapters to a few lines each and guarantees the visual breadcrumb
// and the structured-data breadcrumb come from one source.

import type { Metadata } from "next";
import type { MarketingNode, MarketingHub, MarketingPageCopy } from "@/content/marketing/types";
import type { NavLeaf } from "@/content/navigation";
import { getAncestors } from "@/content/marketing";

const BASE_URL = "https://qlim8.com";

const ORG = {
  "@type": "Organization",
  name: "qlim8 ApS",
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.svg` },
};

export function nodeUrl(node: MarketingNode): string {
  return `${BASE_URL}/${node.collection}/${node.slug}`;
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
    { name: node.title, href: `/${node.collection}/${node.slug}` },
  ];
}

export function buildMarketingJsonLd(node: MarketingNode, copy: MarketingPageCopy): object[] {
  const url = nodeUrl(node);
  const primaryType = node.collection === "kundetyper" ? "WebPage" : "Service";

  const primary: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": primaryType,
    name: node.title,
    description: node.seoDescription,
    url,
    inLanguage: "da-DK",
    provider: ORG,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: buildBreadcrumbTrail(node).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.href === "/" ? "/" : c.href}`,
    })),
  };

  const schemas: object[] = [primary, breadcrumb];

  if (copy.faq?.items?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return schemas;
}

/** Structured data for a section hub: CollectionPage (with an ItemList of its
 *  cards) + BreadcrumbList. Lets crawlers/LLMs see the hub as a section index. */
export function buildHubJsonLd(hub: MarketingHub, cards: NavLeaf[]): object[] {
  const url = `${BASE_URL}${hub.route}`;

  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.seoDescription,
    url,
    inLanguage: "da-DK",
    isPartOf: { "@type": "WebSite", name: "qlim8", url: BASE_URL },
    provider: ORG,
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

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "qlim8", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: hub.title, item: url },
    ],
  };

  return [collectionPage, breadcrumb];
}
