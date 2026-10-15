// Single source of truth for the primary navigation, derived from the marketing
// collections. Consumed by SiteHeader (desktop mega-menu + mobile accordion),
// SiteFooter, and app/sitemap.ts, so the three never drift.

import type { MarketingCollection } from "./marketing/types";
import { getAncestors, getCollection, getHub, getNode } from "./marketing";

export interface NavLeaf {
  href: string;
  label: string;
  blurb?: string;
  comingSoon?: boolean;
  /** A featured hub card (MarketingNode.highlight). */
  highlight?: boolean;
  /** Levels below the collection hub (0 = top-level area). Menus indent by it. */
  depth?: number;
}

export interface NavGroup {
  heading: string;
  items: NavLeaf[];
}

export interface NavTop {
  label: string;
  href: string;
  groups?: NavGroup[];
}

// Which leaves appear in each collection's mega-menu, in order. Every live
// page is here: the menu is the one place the whole site hierarchy is visible
// to a visitor and a crawler at once, and it has to agree with the breadcrumb
// schema on every page. The order is the hierarchy: a child follows its
// parent, and `depth` indents it (none of the current pages has a parent).
// An entry that names no node throws outside production (buildGroups), and
// scripts/lib/redirects.test.mjs holds every entry to a live page.
export const MENU_SLUGS: Record<MarketingCollection, string[]> = {
  kundetyper: ["byggeri-og-haandvaerk", "transport-og-vognmaend", "produktion-og-industri", "revisorer-og-raadgivere"],
  produkt: [
    "platform-og-overblik",
    "rapportering",
    "vsme-rapport",
    "audit-trail-og-revisor",
    "reduktionsmaal-og-scenarier",
    "leverandoerkaede",
  ],
  integrationer: [
    "e-conomic", "dinero", "billy", "appelsin", "eloverblik", "rest-api", "mcp-server",
    "vsme-rapport-med-ai-agent",
  ],
};

export function buildGroups(collection: MarketingCollection): NavGroup[] {
  const order = MENU_SLUGS[collection];
  const groups: NavGroup[] = [];
  for (const slug of order) {
    const node = getNode(collection, slug);
    if (!node) {
      // Dropping it here is how a page vanished from the menu unseen. In
      // production a dead entry is still skipped rather than failing the site.
      if (process.env.NODE_ENV !== "production") {
        throw new Error(`MENU_SLUGS.${collection}: "${slug}" is not a ${collection} page`);
      }
      continue;
    }
    const heading = node.navGroup ?? "";
    let group = groups.find((g) => g.heading === heading);
    if (!group) {
      group = { heading, items: [] };
      groups.push(group);
    }
    group.items.push({
      href: `/${collection}/${node.slug}`,
      label: node.navLabel,
      blurb: node.blurb,
      comingSoon: node.status === "coming-soon",
      depth: getAncestors(node).length - 1,
    });
  }
  return groups;
}

function topFor(collection: MarketingCollection): NavTop {
  const hub = getHub(collection);
  return { label: hub.title, href: hub.route, groups: buildGroups(collection) };
}

export const PRIMARY_NAV: NavTop[] = [
  topFor("kundetyper"),
  topFor("produkt"),
  topFor("integrationer"),
  { label: "Pakker", href: "/priser" },
  { label: "Metodologi", href: "/metodologi" },
  { label: "Blog", href: "/blog" },
];

// Footer columns "Løsninger" (the industry pages) and "Produkt" (the theme
// pages), derived from the same menu lists so header and footer stay in sync.
function footerLeaves(collection: MarketingCollection): NavLeaf[] {
  return buildGroups(collection).flatMap((g) => g.items.map(({ href, label }) => ({ href, label })));
}

export const FOOTER_SOLUTIONS: NavLeaf[] = footerLeaves("kundetyper");
export const FOOTER_PRODUCT: NavLeaf[] = footerLeaves("produkt");

// Featured leaves per collection, for hub card grids (server-side).
export function hubCards(collection: MarketingCollection): NavLeaf[] {
  return getCollection(collection)
    .filter((n) => n.featured === true)
    .map((n) => ({
      href: `/${collection}/${n.slug}`,
      label: n.navLabel,
      blurb: n.blurb,
      comingSoon: n.status === "coming-soon",
      highlight: n.highlight === true,
    }));
}
