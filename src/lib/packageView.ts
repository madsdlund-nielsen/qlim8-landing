// How qlim8.com shows the packages it reads from the app
// (GET /api/public/packages, qlim8-app shared/publicPackages.ts).
//
// Pure: no fetch, no alias imports, so `npm test` runs it directly. The fetch is in
// src/lib/packages.ts, the rendering in src/page-components/pricing.tsx.
//
// Every price on the page comes from the API. A package whose price is hidden
// has none here, and when the API cannot be reached the page shows no price
// at all and offers a demo for everything: a stale price is worse than none.

import { DEMO_CTA } from "../content/cta.ts";

export type CtaKind = "signup" | "buy" | "demo";

export interface PublicPrice {
  visibility: "public" | "from";
  currency: "DKK";
  /** Øre per year, ex. VAT. */
  yearlyMinor: number;
  /** Øre per month: yearly / 12. */
  monthlyMinor: number;
}

export interface PublicAdvisorPrice {
  baseMinor: number;
  discountPerClientMinor: number;
  maxDiscountedClients: number;
  freeWithoutClients: boolean;
}

/** One line on a package card: `planned` is on the roadmap, not built. */
export interface PublicHighlight {
  label: string;
  status: "live" | "planned";
}

export interface PublicPackage {
  key: string;
  name: string;
  tagline: string | null;
  audience: string | null;
  accountType: "company" | "advisor";
  displayRank: number;
  salesMotion: "plg" | "slg";
  price: PublicPrice | null;
  advisorPrice: PublicAdvisorPrice | null;
  free: boolean;
  cta: { kind: CtaKind; url: string | null };
  highlights: string[];
  /**
   * The same list with the roadmap lines in their place, each with its
   * status. Absent from an API that predates it, which sends built lines only.
   */
  highlightItems?: PublicHighlight[];
  /**
   * Days of free trial on a package bought by card (Starter and Premium), as
   * the catalog in qlim8-app sets it. Absent from an API that predates it.
   */
  trialDays?: number;
}

export type ComparisonCell = boolean | string;

export interface ComparisonRow {
  key: string;
  label: string;
  /** "planned": on the roadmap, not built. */
  status: string;
  group?: string | null;
  cells: Record<string, ComparisonCell>;
}

/** The comparison rows of one category (Views, Analyser, ...). */
export interface ComparisonSection {
  key: string;
  label: string;
  rows: ComparisonRow[];
}

export interface PublicPackages {
  language: "da" | "en";
  catalogVersion: number | null;
  currency: "DKK";
  vat: "exclusive";
  packages: PublicPackage[];
  comparison: {
    packages: { key: string; name: string }[];
    /** Built capabilities only. */
    rows: ComparisonRow[];
    /**
     * Every row by category, roadmap rows included with their status. Absent
     * from an API that predates it, and empty when the catalog sorts no row
     * into a category; the page then lists `rows`.
     */
    sections?: ComparisonSection[];
  };
}

/**
 * Whether the catalog sells anything by itself yet. Until it does (catalog
 * version 1, or the API cannot be reached) the site keeps its sales-led page:
 * every package behind "Book demo", no price, no "Kom gratis i gang".
 */
export function isSelfServe(data: PublicPackages | null | undefined): boolean {
  return Boolean(data?.packages.some((p) => p.cta.kind !== "demo" && p.cta.url));
}

/**
 * A CTA from page copy, as the visitor may follow it. While the catalog sells
 * nothing by itself (catalog version 1, or the packages API cannot be reached)
 * a button that leads to the package page (/priser, /priser#raadgivere, ...)
 * books a demo instead: there is no price and no signup to lead to. Every
 * other href is left as it is.
 */
export function resolveCta<T extends { label: string; href: string }>(
  cta: T,
  selfServe: boolean,
  demo: { label: string; href: string } = DEMO_CTA,
): T | { label: string; href: string } {
  if (selfServe) return cta;
  return /^\/priser(?:[/?#]|$)/.test(cta.href) ? demo : cta;
}

/**
 * Where "Kom gratis i gang" goes on the package page: the signup URL the API
 * names for the free company package, or null while nothing is self-serve.
 * Never a URL written here: the app decides it.
 */
export function freeStartHref(data: PublicPackages | null | undefined): string | null {
  if (!isSelfServe(data)) return null;
  const free = [...data!.packages]
    .sort((a, b) => a.displayRank - b.displayRank)
    .find((p) => p.accountType === "company" && p.cta.kind === "signup" && p.cta.url);
  return free?.cta.url ?? null;
}

/** One line of a package card, and whether it is a capability not built yet. */
export interface FeatureEntry {
  text: string;
  planned: boolean;
}

/**
 * What a package card lists, once the catalog sells something by itself: the
 * lines the API gives the package, in its order (built ones, and the roadmap
 * ones marked as such when the API sends them), headed "Alt i <previous>,
 * plus". That keeps every list on the site in step with what the app
 * actually sells; a curated list in the CMS once promised Premium a scenario
 * builder that only Business has. Curated copy is used only for a package the
 * API lists nothing for (the advisor packages, which carry no capabilities of
 * their own). `items` holds the lines' texts; `entries` also says which are
 * planned, for a reader that marks them "Planlagt".
 */
export function packageFeatures(
  data: PublicPackages,
  pkg: PublicPackage,
  curated: string[] = [],
): { label: string | null; items: string[]; entries: FeatureEntry[] } {
  const lines: FeatureEntry[] =
    pkg.highlightItems && pkg.highlightItems.length > 0
      ? pkg.highlightItems.map((h) => ({ text: h.label, planned: h.status === "planned" }))
      : pkg.highlights.map((text) => ({ text, planned: false }));
  if (lines.length === 0) {
    const items = curated.filter((f) => f.trim());
    return { label: null, items, entries: items.map((text) => ({ text, planned: false })) };
  }
  const sameKind = [...data.packages]
    .filter((p) => p.accountType === pkg.accountType)
    .sort((a, b) => a.displayRank - b.displayRank);
  const previous = sameKind[sameKind.findIndex((p) => p.key === pkg.key) - 1];
  return { label: previous ? `Alt i ${previous.name}, plus` : null, items: lines.map((l) => l.text), entries: lines };
}

/**
 * The comparison by category, or null when the API sends none (it predates
 * them, or the catalog sorts no row into one): the page then lists
 * `comparison.rows`, built capabilities only.
 */
export function comparisonSections(data: PublicPackages): ComparisonSection[] | null {
  const sections = data.comparison.sections;
  return sections && sections.some((s) => s.rows.length > 0) ? sections : null;
}

/** Danish kroner: thousands with ".", whole kroner without decimals. */
export function formatKr(minor: number): string {
  const kroner = minor / 100;
  const whole = Number.isInteger(kroner);
  return `${new Intl.NumberFormat("da-DK", { minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }).format(kroner)} kr`;
}

export interface PriceLines {
  /** The monthly price ("<n> kr/md"), "fra <n> kr/md" or "Gratis". */
  main: string;
  /** How it is billed: yearly, with the yearly amount, ex. VAT. */
  note: string | null;
}

export function priceLines(pkg: PublicPackage): PriceLines | null {
  if (pkg.advisorPrice) {
    const a = pkg.advisorPrice;
    const model =
      `${formatKr(a.baseMinor)}/md minus ${formatKr(a.discountPerClientMinor)} pr. aktiv klient` +
      (a.maxDiscountedClients > 0 ? ` (op til ${a.maxDiscountedClients} klienter)` : "") +
      ", ekskl. moms";
    return a.freeWithoutClients
      ? { main: "Gratis", note: `indtil første aktive klient, derefter ${model}` }
      : { main: `${formatKr(a.baseMinor)}/md`, note: model };
  }
  if (pkg.free && pkg.price) return { main: "Gratis", note: null };
  if (!pkg.price) return null;
  const monthly = `${formatKr(pkg.price.monthlyMinor)}/md`;
  if (pkg.price.visibility === "from") {
    return { main: `fra ${monthly}`, note: "faktureres årligt, ekskl. moms" };
  }
  return { main: monthly, note: `faktureres årligt (${formatKr(pkg.price.yearlyMinor)}), ekskl. moms` };
}

/**
 * What a company package with no price says in its price's place: the
 * conversation decides it. Null for a package with a price, an advisor
 * package, or one bought without a conversation.
 */
export function salesLine(pkg: PublicPackage): string | null {
  return pkg.accountType === "company" && pkg.cta.kind === "demo" && !pkg.price ? "Kontakt salg" : null;
}

export type PackageGroup = "free" | "selfServe" | "contact";

/** Start for free, buy it yourself, or talk to us. */
export function packageGroup(pkg: PublicPackage): PackageGroup {
  if (pkg.cta.kind === "signup") return "free";
  if (pkg.cta.kind === "buy") return "selfServe";
  return "contact";
}

export function groupPackages(data: PublicPackages): Record<PackageGroup, PublicPackage[]> {
  const out: Record<PackageGroup, PublicPackage[]> = { free: [], selfServe: [], contact: [] };
  for (const pkg of [...data.packages].sort((a, b) => a.displayRank - b.displayRank)) out[packageGroup(pkg)].push(pkg);
  return out;
}

/**
 * Days of free trial a package bought by card starts with, or 0. Only a "buy"
 * package has one: the catalog gives none to Free, Business or Enterprise.
 */
export function trialDaysOf(pkg: PublicPackage): number {
  if (pkg.cta.kind !== "buy") return 0;
  const days = pkg.trialDays ?? 0;
  return Number.isInteger(days) && days > 0 ? days : 0;
}

/**
 * The one line on qlim8.com that names the trial. It comes from the catalog,
 * never from copy: scripts/lib/salesLed.mjs allows trial wording in this file
 * only, so a trial the app does not give cannot be promised anywhere else.
 *
 * The trial is unlocked by an intro call booked in the first week (qlim8-app,
 * shared/entitlements/trialBooking.ts), so the line says so, and the button
 * does not promise it.
 */
export function trialLine(pkg: PublicPackage): string | null {
  const days = trialDaysOf(pkg);
  return days > 0
    ? `${days} dages gratis prøveperiode, når du har booket en kort introsamtale med os i den første uge. Kortet trækkes først bagefter, og du kan opsige før.`
    : null;
}

/** The label on a package's button. Demo uses the site's own "Book demo". */
export function ctaLabel(pkg: PublicPackage): string {
  if (pkg.cta.kind === "buy") return `Køb ${pkg.name}`;
  if (pkg.cta.kind === "signup") return pkg.accountType === "advisor" ? `Kom i gang som ${pkg.name.toLowerCase()}` : "Opret gratis konto";
  return "Book demo";
}

/**
 * schema.org offers for #software: one per package whose yearly price is
 * public, ex. VAT. Hidden and "fra" prices get none; scripts/check-schema.mjs
 * holds the result against a committed fixture.
 */
export function offersFromPackages(data: PublicPackages | null | undefined) {
  if (!isSelfServe(data)) return [];
  return data!.packages
    .filter((p) => p.accountType === "company" && p.price?.visibility === "public")
    .map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: (p.price!.yearlyMinor / 100).toFixed(2),
      priceCurrency: "DKK",
      url: "https://qlim8.com/priser",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: (p.price!.yearlyMinor / 100).toFixed(2),
        priceCurrency: "DKK",
        billingDuration: "P1Y",
        valueAddedTaxIncluded: false,
      },
    }));
}
