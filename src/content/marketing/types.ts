// Shared content model for the three long-form marketing sections:
// Kundetyper (industries), Produkt (features), Integrationer (integrations).
//
// One schema drives ~40 pages. Two typed objects per page:
//   - MarketingPageCopy: the CMS-editable copy body.
//   - MarketingNode: static routing/SEO/hierarchy metadata, NOT CMS-merged.
//     Carries an optional bundled-only `body` (ArticleSection[]) escape hatch
//     for editorial long-form prose, rendered by the existing article Section
//     switch: bundled-only, so it sidesteps the array-merge constraint.
//
// RULES FOR COPY SHAPES (enforced by src/lib/marketingCopy.test.ts)
// resolvePageCopy runs the copy through mergeCopy (src/lib/copyMerge.ts):
//   1. Arrays are homogeneous. mergeArray validates every override item
//      against defaults[0] as a template and silently falls back to the
//      bundled default if one item lacks a key the template has. So an item
//      type has NO optional keys, and defaults[0] has every key (an empty
//      string is a value). A discriminated-union array would break CMS editing.
//   2. No arrays of arrays. An item may hold a `string[]` (bullets), nothing
//      deeper, and the table is `{a,b,c}` rows, never `string[][]`.
//   3. An optional key inside an object is only editable from /admin when the
//      bundled default object has that key too: mergeCopy ignores unknown keys
//      below the page root. Give it "" or [] in the defaults if it must be
//      editable; the renderers treat "" and [] as absent.
//      A whole optional BLOCK (reasons, table, contact ...) may be left out of
//      the defaults: top-level keys the default lacks are accepted from the
//      CMS as long as the value is well-formed.
//   4. Icon names (trust.items[].icon) come from the allow-list ICON_NAMES in
//      src/components/ds/iconNames.ts, re-exported by the Icon component.
//   5. CTA hrefs come from src/content/cta.ts, or start with /priser. Under
//      catalog v1 (or with the packages API down) resolveCta turns a /priser
//      href into the demo CTA (src/lib/packageView.ts).
//   6. A price in copy is never typed. A sentence that names one is wrapped in
//      double square brackets and holds a pris token for the package, monthly
//      or yearly (syntax and rules: src/lib/priceTokens.ts, CLAUDE.md under
//      "What copy may not say"); it disappears when the price is unknown.
//
// MarketingNode carries what the CMS must not touch: `sectionOrder` (the order
// the blocks render in), `highlight` (a featured hub card), `genericFaq`
// (whether the shared ESG questions are appended to the page's own FAQ).

import type { ArticleSection } from "@/content/article";

export type MarketingCollection = "kundetyper" | "produkt" | "integrationer";

export interface CtaLink {
  label: string;
  href: string;
}

/** Problem → solution → quantified outcome. The core rhetoric block. */
export interface PainSolutionBlock {
  pain: string;
  solution: string;
  outcome?: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

export interface HowItWorksStep {
  title: string;
  body: string;
}

/** A quantified proof tile, e.g. { value: "3-4 uger", label: "sparet i Q1" }. */
export interface ValueStat {
  value: string;
  label: string;
  note?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  imageUrl?: string;
}

/** A titled block of items with title and body, the shape most blocks share. */
export interface TitledItem {
  title: string;
  body: string;
}

/** TrustCard: an icon from ICON_NAMES, a title, one sentence. */
export interface TrustItem {
  icon: string;
  title: string;
  body: string;
}

/** One row of the scope or method table: three cells, always all three. */
export interface TableRow {
  a: string;
  b: string;
  c: string;
}

export interface OptionItem {
  title: string;
  body: string;
  bullets: string[];
}

export interface DepthItem {
  summary: string;
  body: string;
}

/** The block keys a page can render, in the order `sectionOrder` lists them. */
export type SectionKey =
  | "hero"
  | "reassurance"
  | "intro"
  | "reasons"
  | "painPoints"
  | "table"
  | "features"
  | "howItWorks"
  | "checks"
  | "trust"
  | "integrations"
  | "options"
  | "valueStats"
  | "body"
  | "depth"
  | "children"
  | "testimonial"
  | "contact"
  | "faq"
  | "related"
  | "closingCta";

// ---------------------------------------------------------------------------
// Leaf page copy (industry / feature / integration)
// ---------------------------------------------------------------------------

export interface MarketingPageCopy {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    /** A CMS asset URL (https://app.qlim8.com/api/cms/assets/...). No image: single column, no placeholder. */
    imageUrl?: string;
    imageAlt?: string;
    /** Up to three short reassurances under the main button (TrustLine). */
    trustLine?: string[];
    /** One line under the trust line (MicroLine). */
    microLine?: string;
  };
  /** Differentiation / "why this matters for you" intro. */
  intro?: {
    heading: string;
    body: string;
    bullets?: string[];
  };
  /** The calm one-paragraph reassurance on top of an integration page. */
  reassurance?: { title: string; body: string };
  /** "Why the requirement hits now" and the problem, as a numbered list. */
  reasons?: { title: string; intro?: string; items: TitledItem[] };
  painPoints?: PainSolutionBlock[];
  features?: FeatureItem[];
  howItWorks?: {
    title: string;
    steps: HowItWorksStep[];
  };
  /** Three trust cards (TrustCard x 3). */
  trust?: { title: string; items: TrustItem[] };
  /** The scope table or method table: <table> from md up, stacked below. */
  table?: {
    title: string;
    intro?: string;
    headers: { a: string; b: string; c: string };
    rows: TableRow[];
    note?: string;
  };
  /** "S og G i ESG": a short checklist. */
  checks?: { title: string; intro?: string; items: TitledItem[] };
  /** Collaboration models, as cards with bullets. */
  options?: { title: string; intro?: string; items: OptionItem[] };
  /** Fold-outs (<details>) that keep the depth in the HTML. */
  depth?: { title: string; items: DepthItem[] };
  /** The integration row; the logos come from src/content/integration-logos.ts. */
  integrations?: { title: string; footnote: string };
  valueStats?: ValueStat[];
  /** Rendered as the design's Quote. */
  testimonial?: Testimonial;
  /** ContactBox: the person, the phone, the mail and the one button. */
  contact?: {
    title: string;
    body: string;
    personName: string;
    personRole: string;
    phoneLine: string;
    emailLine: string;
    cta: CtaLink;
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  closingCta: {
    title: string;
    description: string;
    primary: CtaLink;
    secondary?: CtaLink;
    trustLine?: string[];
  };
}

// ---------------------------------------------------------------------------
// Hub page copy (the three section landing pages)
// ---------------------------------------------------------------------------

export interface MarketingHubCopy {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    imageUrl?: string;
    imageAlt?: string;
    trustLine?: string[];
  };
  /** "Why we exist" / differentiation. */
  intro: {
    heading: string;
    body: string;
    bullets?: string[];
  };
  cardsHeading: string;
  cardsSubheading?: string;
  /** Optional differentiation columns shown under the cards. */
  differentiators: FeatureItem[];
  trust?: { title: string; items: TrustItem[] };
  contact?: {
    title: string;
    body: string;
    personName: string;
    personRole: string;
    phoneLine: string;
    emailLine: string;
    cta: CtaLink;
  };
  /** Filled in for every hub by the FAQ augmentation in ./index. */
  faq?: {
    title: string;
    items: FaqItem[];
  };
  closingCta: {
    title: string;
    description: string;
    primary: CtaLink;
    secondary?: CtaLink;
    trustLine?: string[];
  };
}

// ---------------------------------------------------------------------------
// Node metadata (routing / SEO / hierarchy), not CMS-merged
// ---------------------------------------------------------------------------

export interface MarketingNode {
  collection: MarketingCollection;
  slug: string; // single URL segment, e.g. "vvs"
  pageKey: string; // CMS key, e.g. "page.kundetyper.vvs"
  title: string; // breadcrumb / nav / <title> base
  navLabel: string; // short label for menus and cards
  /** One-line teaser for hub cards and mega-menu blurbs. */
  blurb: string;
  seoTitle: string;
  seoDescription: string;
  /** Hierarchy lives here, NOT in the URL (URLs stay flat). */
  parentSlug?: string;
  /** Mega-menu / grouping column, e.g. "Rapportering". */
  navGroup?: string;
  status?: "live" | "coming-soon";
  /** Whether this node appears as a card on its hub page. */
  featured?: boolean;
  /**
   * Slugs shown as related links. A bare `"slug"` resolves inside this node's
   * collection; `"collection/slug"` crosses collections (see getRelated).
   */
  related?: string[];
  /** Bundled default copy: resolved + CMS-merged at request time. */
  defaults: MarketingPageCopy;
  /** Optional bundled-only editorial long-form (flagship pages). */
  body?: ArticleSection[];
  /**
   * The order the blocks render in. Bundled only, never from the CMS, so an
   * editor cannot reorder a page. Absent: the default order in
   * src/page-components/marketing-page.tsx (hero, reassurance, intro, reasons,
   * painPoints, table, features, howItWorks, checks, trust, integrations,
   * options, valueStats, body, depth, children, testimonial, contact, faq,
   * related, closingCta), each only when it has content.
   */
  sectionOrder?: SectionKey[];
  /** A featured card on its hub (replaces the hard-coded `/vvs` check). */
  highlight?: boolean;
  /**
   * Append the shared ESG questions (genericFaq.ts) to this page's own FAQ.
   * Default true. The new pages carry their own 6 to 8 questions: false.
   */
  genericFaq?: boolean;
}

export interface MarketingHub {
  collection: MarketingCollection;
  route: string; // "/kundetyper"
  pageKey: string; // "page.kundetyper"
  title: string;
  seoTitle: string;
  seoDescription: string;
  defaults: MarketingHubCopy;
}
