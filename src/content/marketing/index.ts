// Central access to the three marketing collections. Routes, nav, sitemap and
// breadcrumbs all read from here so the page set has one source of truth.

import type { MarketingCollection, MarketingNode, MarketingHub } from "./types";
import { KUNDETYPER_HUB, KUNDETYPER_NODES } from "./kundetyper";
import { PRODUKT_HUB, PRODUKT_NODES } from "./produkt";
import { INTEGRATIONER_HUB, INTEGRATIONER_NODES } from "./integrationer";

export const MARKETING_HUBS: MarketingHub[] = [
  KUNDETYPER_HUB,
  PRODUKT_HUB,
  INTEGRATIONER_HUB,
];

const NODES_BY_COLLECTION: Record<MarketingCollection, MarketingNode[]> = {
  kundetyper: KUNDETYPER_NODES,
  produkt: PRODUKT_NODES,
  integrationer: INTEGRATIONER_NODES,
};

export const ALL_MARKETING_NODES: MarketingNode[] = [
  ...KUNDETYPER_NODES,
  ...PRODUKT_NODES,
  ...INTEGRATIONER_NODES,
];

export function getCollection(collection: MarketingCollection): MarketingNode[] {
  return NODES_BY_COLLECTION[collection];
}

export function getHub(collection: MarketingCollection): MarketingHub {
  return MARKETING_HUBS.find((h) => h.collection === collection)!;
}

export function getNode(
  collection: MarketingCollection,
  slug: string,
): MarketingNode | undefined {
  return NODES_BY_COLLECTION[collection].find((n) => n.slug === slug);
}

/** Direct children of a node (used for in-page sub-nav and modtagere/vsme hubs). */
export function getChildren(
  collection: MarketingCollection,
  parentSlug: string,
): MarketingNode[] {
  return NODES_BY_COLLECTION[collection].filter((n) => n.parentSlug === parentSlug);
}

/** Resolve a node's `related` slugs to nodes (same collection). */
export function getRelated(node: MarketingNode): MarketingNode[] {
  if (!node.related) return [];
  return node.related
    .map((slug) => getNode(node.collection, slug))
    .filter((n): n is MarketingNode => Boolean(n));
}

/**
 * Breadcrumb chain from the collection hub down to (and excluding) the node,
 * walking parentSlug. Returns { title, href } for each ancestor incl. the hub.
 */
export function getAncestors(node: MarketingNode): { title: string; href: string }[] {
  const hub = getHub(node.collection);
  const chain: { title: string; href: string }[] = [
    { title: hub.title, href: hub.route },
  ];
  const ancestors: MarketingNode[] = [];
  let current = node.parentSlug
    ? getNode(node.collection, node.parentSlug)
    : undefined;
  while (current) {
    ancestors.unshift(current);
    current = current.parentSlug
      ? getNode(node.collection, current.parentSlug)
      : undefined;
  }
  for (const a of ancestors) {
    chain.push({ title: a.title, href: `/${a.collection}/${a.slug}` });
  }
  return chain;
}
