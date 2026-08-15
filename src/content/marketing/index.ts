// Central access to the three marketing collections. Routes, nav, sitemap and
// breadcrumbs all read from here so the page set has one source of truth.

import type { MarketingCollection, MarketingNode, MarketingHub } from "./types";
import { KUNDETYPER_HUB, KUNDETYPER_NODES } from "./kundetyper";
import { PRODUKT_HUB, PRODUKT_NODES } from "./produkt";
import { INTEGRATIONER_HUB, INTEGRATIONER_NODES } from "./integrationer";
import { GENERIC_ESG_FAQ, HUB_FAQ_SEED, GENERIC_FAQ_TITLE, mergeFaqItems } from "./genericFaq";

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

// Every page gets the generic qlim8/ESG questions appended to its own FAQ (with
// de-dup), and every hub gets a FAQ built from a per-section seed + the generic
// set. This flows into the rendered FAQ, the FAQPage JSON-LD, and the CMS copy
// defaults, so each page carries a page-specific + general mix for answer
// engines and search ranking. Runs once at module load; de-dup makes it safe.
for (const node of ALL_MARKETING_NODES) {
  node.defaults.faq.items = mergeFaqItems(node.defaults.faq.items, GENERIC_ESG_FAQ);
}
for (const hub of MARKETING_HUBS) {
  const seeded = mergeFaqItems(hub.defaults.faq?.items ?? [], HUB_FAQ_SEED[hub.collection] ?? []);
  hub.defaults.faq = {
    title: hub.defaults.faq?.title ?? GENERIC_FAQ_TITLE,
    items: mergeFaqItems(seeded, GENERIC_ESG_FAQ),
  };
}

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

/**
 * Resolve a node's `related` entries to nodes.
 *
 * A bare `"slug"` resolves inside the node's own collection, which is what
 * every entry was when this only linked siblings. A qualified
 * `"collection/slug"` crosses collections, so a Produkt page can point at an
 * Integrationer page and vice versa. Without that, a cross-collection entry
 * resolved to undefined and was dropped by the filter below: a silently
 * missing link rather than an error, which is the failure mode worth avoiding
 * here.
 */
export function getRelated(node: MarketingNode): MarketingNode[] {
  if (!node.related) return [];
  return node.related
    .map((entry) => {
      const slash = entry.indexOf("/");
      if (slash === -1) return getNode(node.collection, entry);
      const collection = entry.slice(0, slash) as MarketingCollection;
      if (!(collection in NODES_BY_COLLECTION)) return undefined;
      return getNode(collection, entry.slice(slash + 1));
    })
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
