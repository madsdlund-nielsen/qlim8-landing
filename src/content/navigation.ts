// Single source of truth for the primary navigation, derived from the marketing
// collections. Consumed by SiteHeader (desktop mega-menu + mobile accordion),
// SiteFooter, and app/sitemap.ts, so the three never drift.

import type { MarketingCollection } from "./marketing/types";
import { getCollection, getHub, getNode } from "./marketing";

export interface NavLeaf {
  href: string;
  label: string;
  blurb?: string;
  comingSoon?: boolean;
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

// Which leaves appear in each collection's mega-menu, in order. Produkt is
// curated to the primary areas (deep leaves are reached via in-page sub-nav);
// the other two show their full set.
const MENU_SLUGS: Record<MarketingCollection, string[]> = {
  kundetyper: [
    "tomrer", "maler", "elektriker", "vvs", "entreprenoer", "vognmand", "plastfabrikant", "frisoer", "store-virksomheder",
    "revisor", "raadgiver", "konsulent",
  ],
  produkt: [
    "dashboard", "udforskning", "data-udtraek",
    "rapportering", "pdf-rapport", "vsme-rapport", "audit-trail",
    "tiltag", "scenarier",
    "revisor-adgang", "leverandoerkaede", "brag-board",
  ],
  integrationer: [
    "e-conomic", "dinero", "billy", "appelsin", "eloverblik", "rest-api", "mcp-server",
  ],
};

function buildGroups(collection: MarketingCollection): NavGroup[] {
  const order = MENU_SLUGS[collection];
  const groups: NavGroup[] = [];
  for (const slug of order) {
    const node = getNode(collection, slug);
    if (!node) continue;
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
  { label: "Priser", href: "/priser" },
  { label: "Metodologi", href: "/metodologi" },
  { label: "Blog", href: "/blog" },
];

// Footer "Løsninger" column, derived so header + footer stay in sync.
export const FOOTER_SOLUTIONS: NavLeaf[] = [
  { href: "/kundetyper", label: "Kundetyper" },
  { href: "/produkt", label: "Produkt" },
  { href: "/integrationer", label: "Integrationer" },
];

// Featured leaves per collection, for hub card grids (server-side).
export function hubCards(collection: MarketingCollection): NavLeaf[] {
  return getCollection(collection)
    .filter((n) => n.featured === true)
    .map((n) => ({
      href: `/${collection}/${n.slug}`,
      label: n.navLabel,
      blurb: n.blurb,
      comingSoon: n.status === "coming-soon",
    }));
}
