// Shared content model for the three long-form marketing sections:
// Kundetyper (industries), Produkt (features), Integrationer (integrations).
//
// One schema drives ~40 pages. Two typed objects per page:
//   - MarketingPageCopy: the CMS-editable copy body. IMPORTANT — every array
//     here MUST be homogeneous (all items the same shape). resolvePageCopy runs
//     it through mergeCopy (src/lib/copyMerge.ts), whose mergeArray validates
//     each override item against defaults[0] as a template and silently falls
//     back to the bundled default if any item's shape differs. A heterogeneous
//     (discriminated-union) array would therefore break CMS editing.
//   - MarketingNode: static routing/SEO/hierarchy metadata, NOT CMS-merged.
//     Carries an optional bundled-only `body` (ArticleSection[]) escape hatch
//     for editorial long-form prose, rendered by the existing article Section
//     switch — bundled-only, so it sidesteps the array-merge constraint.

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
    imageUrl?: string;
  };
  /** Differentiation / "why this matters for you" intro. */
  intro: {
    heading: string;
    body: string;
    bullets?: string[];
  };
  painPoints: PainSolutionBlock[];
  features: FeatureItem[];
  howItWorks?: {
    title: string;
    steps: HowItWorksStep[];
  };
  valueStats: ValueStat[];
  testimonial?: Testimonial;
  faq: {
    title: string;
    items: FaqItem[];
  };
  closingCta: {
    title: string;
    description: string;
    primary: CtaLink;
    secondary?: CtaLink;
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
  closingCta: {
    title: string;
    description: string;
    primary: CtaLink;
    secondary?: CtaLink;
  };
}

// ---------------------------------------------------------------------------
// Node metadata (routing / SEO / hierarchy) — not CMS-merged
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
  /** Sibling slugs (same collection) shown as related links. */
  related?: string[];
  /** Bundled default copy — resolved + CMS-merged at request time. */
  defaults: MarketingPageCopy;
  /** Optional bundled-only editorial long-form (flagship pages). */
  body?: ArticleSection[];
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
