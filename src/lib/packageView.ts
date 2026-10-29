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
  free: boolean;
  cta: { kind: CtaKind; url: string | null };
  highlights: string[];
  /**
   * The same list with the roadmap lines in their place, each with its
   * status. Absent from an API that predates it, which sends built lines only.
   */
  highlightItems?: PublicHighlight[];
  /**
   * Days of free trial on a package bought by card (Basis and Udvidet, keys starter and premium), as
   * the catalog in qlim8-app sets it. Absent from an API that predates it.
   */
  trialDays?: number;
  /**
   * Days of the next package's features a new customer gets on this one
   * (Gratis: Basis, Basis: Udvidet). Absent from an API that predates it,
   * and null when the package has none.
   */
  introBoost?: PublicIntroBoost | null;
  /**
   * A discount on the first year of the package above, for a customer who
   * upgrades inside the window. Absent from an API that predates it.
   */
  upgradeOffer?: PublicUpgradeOffer | null;
}

export interface PublicIntroBoost {
  packageKey: string;
  packageName: string;
  days: number;
}

export interface PublicUpgradeOffer {
  toPackageKey: string;
  toPackageName: string;
  freeMonths: number;
  windowDays: number;
  /** Øre, ex. VAT: the target's yearly price minus the free months. */
  firstYearMinor: number;
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

/**
 * The curated plan (badge, tagline, list in the page copy) for an API package.
 * A plan is matched on its `key` (the package key, which survives a rename of
 * the display name). A plan without a key, such as one published in /admin,
 * is matched on its name: the package key (the old display names were the keys
 * with a capital) or the package's current display name.
 */
export function curatedPlanFor<P extends { key?: string; name: string }>(
  plans: P[],
  pkg: { key: string; name: string },
): P | undefined {
  const norm = (s: string) => s.trim().toLowerCase();
  const keyed = plans.find((p) => p.key === pkg.key);
  if (keyed) return keyed;
  return plans.find((p) => !p.key && (norm(p.name) === pkg.key || norm(p.name) === norm(pkg.name)));
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
 * actually sells; a curated list in the CMS once promised Udvidet a scenario
 * builder that only Komplet has. Curated copy is used only for a package the
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
 * package has one: the catalog gives none to Gratis, Komplet or Koncern.
 */
export function trialDaysOf(pkg: PublicPackage): number {
  if (pkg.cta.kind !== "buy") return 0;
  const days = pkg.trialDays ?? 0;
  return Number.isInteger(days) && days > 0 ? days : 0;
}

/**
 * The one line on qlim8.com that names the trial. It comes from the catalog,
 * never from copy: scripts/lib/salesLed.mjs allows trial and intro wording in
 * this file only, so an offer the app does not give cannot be promised
 * anywhere else. The card is registered at the start, and the first payment
 * comes after the trial.
 */
export function trialLine(pkg: PublicPackage): string | null {
  const days = trialDaysOf(pkg);
  return days > 0 ? `${days} dages gratis prøve. Kortet registreres ved start.` : null;
}

function wholeDays(n: unknown): number {
  return typeof n === "number" && Number.isInteger(n) && n > 0 ? n : 0;
}

/**
 * The line about the days of the next package a new customer gets, built from
 * `introBoost`. Only on a package with a signup or buy button (the same rule
 * the API applies); Gratis adds that no card is asked for. Null when the field
 * is absent, so an older API changes nothing.
 */
export function introBoostLine(pkg: PublicPackage): string | null {
  const boost = pkg.introBoost;
  const days = wholeDays(boost?.days);
  if (!boost || days === 0 || !boost.packageName || (pkg.cta.kind !== "signup" && pkg.cta.kind !== "buy")) return null;
  const base = `De første ${days} dage med alt fra ${boost.packageName}.`;
  return pkg.free && pkg.cta.kind === "signup" ? `${base} Intet kreditkort.` : base;
}

/**
 * The upgrade offer on a package bought by card: the first year of the next
 * package, priced from `firstYearMinor` in the API. Null when absent.
 */
export function upgradeOfferLine(pkg: PublicPackage): string | null {
  const offer = pkg.upgradeOffer;
  if (!offer || pkg.cta.kind !== "buy" || !offer.toPackageName) return null;
  if (!Number.isFinite(offer.firstYearMinor) || offer.firstYearMinor <= 0) return null;
  return `Opgrader til ${offer.toPackageName} inden for det første år: første år ${formatKr(offer.firstYearMinor)} ekskl. moms.`;
}

/** The short intro lines of a package card, in order; empty for an older API. */
export function introLines(pkg: PublicPackage): string[] {
  return [introBoostLine(pkg), upgradeOfferLine(pkg)].filter((l): l is string => Boolean(l));
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
