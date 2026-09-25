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
// schema on every page. Produkt used to list 12 of its 21 pages, which left
// nine (the report-recipient and VSME sub-pages) three clicks from the
// header, reachable only from a parent's in-page grid. The order is the
// hierarchy: a child follows its parent, and `depth` indents it.
const MENU_SLUGS: Record<MarketingCollection, string[]> = {
  kundetyper: [
    "tomrer", "maler", "elektriker", "vvs", "entreprenoer", "vognmand", "plastfabrikant", "frisoer", "store-virksomheder",
    "revisor", "raadgiver", "konsulent",
  ],
  produkt: [
    "dashboard", "udforskning", "data-udtraek",
    "rapportering", "excel-rapport", "pdf-rapport", "modtagere",
    "bestyrelsesrapport", "investorrapport", "bankrapport", "samarbejdspartnere", "temaer",
    "vsme-rapport", "vsme-basis", "vsme-comprehensive", "audit-trail",
    "tiltag", "scenarier",
    "revisor-adgang", "leverandoerkaede", "brag-board",
  ],
  integrationer: [
    "e-conomic", "dinero", "billy", "appelsin", "eloverblik", "rest-api", "mcp-server",
    "vsme-rapport-med-ai-agent",
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
