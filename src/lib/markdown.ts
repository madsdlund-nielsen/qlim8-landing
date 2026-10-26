// Markdown renditions of the site, for agents.
//
// The pattern is Resend's: every page has a `.md` twin, reachable either by
// appending `.md` to the URL or by sending `Accept: text/markdown`, and
// `/llms.txt` indexes the lot. An assistant that wants the package table should
// not have to run a Tailwind-class-heavy HTML document through a parser to find
// it. Like the rendered site, the twins carry no package prices and no signup
// link: qlim8 is sold after a demo (src/content/cta.ts).
//
// The one rule that matters here: **everything goes through resolvePageCopy**,
// so a page published from the app's /admin CMS serialises its published text,
// not this repo's bundled default. Serialising the defaults would quietly hand
// agents stale copy on exactly the fields most likely to have been edited,
// which is the trap CLAUDE.md warns about for the rendered site.

import type { MarketingNode, MarketingHub, MarketingPageCopy, MarketingHubCopy } from "@/content/marketing/types";
import type { Article, ArticleSection } from "@/content/article";
import { ALL_MARKETING_NODES, MARKETING_HUBS, getNode, getHub, getAncestors } from "@/content/marketing";
import { resolvePageCopy } from "@/lib/pageCopy";
import { fetchPublishedArticles, fetchArticleBySlug } from "@/lib/cms";
import { articles as bundledArticles } from "@/content/articles";
import { HOME_PAGE_KEY, HOME_COPY, type HomeCopy } from "@/content/copy/home";
import { INTEGRATION_LOGOS } from "@/content/integration-logos";
import { PRICING_PAGE_KEY, PRICING_COPY, type PricingCopy } from "@/content/copy/pricing";
import { DEMO_HREF, DEMO_LABEL, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";
import type { SectionKey } from "@/content/marketing/types";
import { BASE_URL } from "@/lib/schema";
import { fetchPublicPackages } from "@/lib/packages";
import {
  comparisonSections,
  ctaLabel,
  curatedPlanFor,
  freeStartHref,
  groupPackages,
  isSelfServe,
  packageFeatures,
  priceLines,
  resolveCta,
  type PublicPackage,
  type PublicPackages,
} from "@/lib/packageView";

export const MARKDOWN_CONTENT_TYPE = "text/markdown; charset=utf-8";

/**
 * Collapse blank runs so a missing optional block doesn't leave a hole.
 * Accepts the falsy results of `array.length && ...` guards directly.
 */
function join(parts: (string | undefined | false | 0)[]): string {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";
}

function bullets(items: string[] | undefined): string | undefined {
  if (!items?.length) return undefined;
  return items.map((i) => `- ${i}`).join("\n");
}

function frontMatter(fields: Record<string, string | undefined>): string {
  const lines = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `---\n${lines.join("\n")}\n---`;
}

/** The ways in, as one line: a demo or a phone call. */
function demoLine(): string {
  return `[${DEMO_LABEL}](${BASE_URL}${DEMO_HREF}) eller ring [${PHONE_DISPLAY}](${PHONE_HREF}).`;
}

/**
 * The ways in once the catalog sells something by itself: the free package's
 * signup URL, which the packages API names, then a demo or a call. The
 * sales-led line otherwise.
 */
function startLine(packages: PublicPackages | null): string {
  const freeStart = freeStartHref(packages);
  return freeStart ? `[Kom gratis i gang](${freeStart}), [${DEMO_LABEL.toLowerCase()}](${BASE_URL}${DEMO_HREF}) eller ring [${PHONE_DISPLAY}](${PHONE_HREF}).` : demoLine();
}

/** A package from the API: its price, its button and its list (packageFeatures). */
function renderApiPackage(
  data: PublicPackages,
  pkg: PublicPackage,
  curated?: { tagline?: string; features?: string[] },
  level = "##",
): string {
  const price = priceLines(pkg);
  const { label, entries } = packageFeatures(data, pkg, curated?.features);
  const features = entries.map((f) => (f.planned ? `${f.text} (planlagt)` : f.text));
  const button =
    pkg.cta.kind === "demo" || !pkg.cta.url ? `[${DEMO_LABEL}](${BASE_URL}${DEMO_HREF})` : `[${ctaLabel(pkg)}](${pkg.cta.url})`;
  return [
    `${level} ${pkg.name}`,
    price ? `**${price.main}**${price.note ? `, ${price.note}` : ""}` : "Pris efter en samtale.",
    curated?.tagline ?? pkg.tagline ?? pkg.audience ?? undefined,
    label && `${label}:`,
    bullets(features),
    button,
  ]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * The API's comparison as markdown (any number of packages): one table, or one
 * per category when the API sorts the rows into categories, a roadmap row
 * marked "(planlagt)".
 */
function apiComparisonTable(data: PublicPackages, title: string): string | undefined {
  const cols = data.comparison.packages;
  const sections = comparisonSections(data);
  const rows = sections ? sections.flatMap((sec) => sec.rows) : data.comparison.rows;
  if (!cols.length || !rows.length) return undefined;
  const table = (rs: typeof rows) =>
    [
      `| Funktion | ${cols.map((c) => c.name).join(" | ")} |`,
      `| --- | ${cols.map(() => "---").join(" | ")} |`,
      ...rs.map(
        (r) =>
          `| ${r.label}${r.status === "planned" ? " (planlagt)" : ""} | ${cols.map((c) => comparisonCell(r.cells[c.key] ?? false)).join(" | ")} |`,
      ),
    ].join("\n");
  if (!sections) return [`## ${title}`, table(rows)].join("\n\n");
  return [`## ${title}`, ...sections.flatMap((sec) => [`### ${sec.label}`, table(sec.rows)])].join("\n\n");
}

function faqSection(faq: { title: string; items: { q: string; a: string }[] } | undefined): string | undefined {
  if (!faq?.items?.length) return undefined;
  return [
    `## ${faq.title}`,
    ...faq.items.map((f) => `### ${f.q}\n\n${f.a}`),
  ].join("\n\n");
}

// ---------------------------------------------------------------------------
// Marketing leaves and hubs
// ---------------------------------------------------------------------------

/** A CTA as a markdown link: a /priser button books a demo while nothing is sold by itself. */
function ctaMd(cta: { label: string; href: string } | undefined, selfServe: boolean): string | undefined {
  if (!cta?.label || !cta.href) return undefined;
  const c = resolveCta(cta, selfServe);
  return `[${c.label}](${c.href.startsWith("/") ? BASE_URL + c.href : c.href})`;
}

/** A GFM table cell: no pipes, no line breaks. */
function cell(text: string): string {
  return text.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");
}

type Titled = { title: string; body: string };

/** "**Title**: body" bullets. */
function titledBullets(items: Titled[] | undefined): string | undefined {
  if (!items?.length) return undefined;
  return items.map((i) => `- **${i.title}**: ${i.body}`).join("\n");
}

/** The contact block as plain lines: person, phone and e-mail as written, then the button. */
function contactSection(
  c: MarketingPageCopy["contact"] | MarketingHubCopy["contact"],
  selfServe: boolean,
): string | undefined {
  if (!c?.title) return undefined;
  return [
    `## ${c.title}`,
    c.body,
    [`${c.personName}, ${c.personRole}`, c.phoneLine, c.emailLine].filter(Boolean).join("  \n"),
    ctaMd(c.cta, selfServe),
  ]
    .filter(Boolean)
    .join("\n\n");
}

function trustSection(t: MarketingPageCopy["trust"]): string | undefined {
  if (!t?.items?.length) return undefined;
  return [`## ${t.title}`, titledBullets(t.items)].join("\n\n");
}

/** The default order of the blocks: the one src/page-components/marketing-page.tsx renders in. */
const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "hero", "reassurance", "intro", "reasons", "painPoints", "table", "features", "howItWorks", "checks", "trust",
  "integrations", "options", "valueStats", "body", "depth", "children", "testimonial", "contact", "faq", "related",
  "closingCta",
];

export function renderMarketingPage(node: MarketingNode, copy: MarketingPageCopy, selfServe = false): string {
  const url = `${BASE_URL}/${node.collection}/${node.slug}`;
  const trail = getAncestors(node).map((a) => a.title);

  const sections: Partial<Record<SectionKey, string | undefined | false | 0>> = {
    hero: [`# ${copy.hero.title}`, copy.hero.subtitle].join("\n\n"),
    reassurance: copy.reassurance?.body && [`## ${copy.reassurance.title}`, copy.reassurance.body].join("\n\n"),
    intro: copy.intro && [`## ${copy.intro.heading}`, copy.intro.body, bullets(copy.intro.bullets)].filter(Boolean).join("\n\n"),
    reasons:
      copy.reasons?.items?.length &&
      [
        `## ${copy.reasons.title}`,
        copy.reasons.intro,
        copy.reasons.items.map((r, i) => `${i + 1}. **${r.title}**: ${r.body}`).join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n"),
    painPoints:
      copy.painPoints?.length &&
      [
        "## Udfordringer og løsninger",
        ...copy.painPoints.map((p) =>
          [`**${p.pain}**`, p.solution, p.outcome && `_${p.outcome}_`].filter(Boolean).join("\n\n"),
        ),
      ].join("\n\n"),
    table:
      copy.table?.rows?.length &&
      [
        `## ${copy.table.title}`,
        copy.table.intro,
        // One string, not one per row: join() puts a blank line between parts,
        // which would break the table into unrelated paragraphs.
        [
          `| ${cell(copy.table.headers.a)} | ${cell(copy.table.headers.b)} | ${cell(copy.table.headers.c)} |`,
          "| --- | --- | --- |",
          ...copy.table.rows.map((r) => `| ${cell(r.a)} | ${cell(r.b)} | ${cell(r.c)} |`),
        ].join("\n"),
        copy.table.note,
      ]
        .filter(Boolean)
        .join("\n\n"),
    features: copy.features?.length && ["## Det får du", ...copy.features.map((f) => `### ${f.title}\n\n${f.body}`)].join("\n\n"),
    howItWorks:
      copy.howItWorks?.steps?.length &&
      [`## ${copy.howItWorks.title}`, copy.howItWorks.intro, ...copy.howItWorks.steps.map((s) => `### ${s.title}\n\n${s.body}`)]
        .filter(Boolean)
        .join("\n\n"),
    checks:
      copy.checks?.items?.length &&
      [`## ${copy.checks.title}`, copy.checks.intro, titledBullets(copy.checks.items)].filter(Boolean).join("\n\n"),
    trust: trustSection(copy.trust),
    integrations:
      copy.integrations?.title &&
      [
        `## ${copy.integrations.title}`,
        `Systemer: ${INTEGRATION_LOGOS.map((l) => (l.status === "kommer-snart" ? `${l.name} (kommer snart)` : l.name)).join(", ")}.`,
        copy.integrations.footnote,
      ]
        .filter(Boolean)
        .join("\n\n"),
    options:
      copy.options?.items?.length &&
      [
        `## ${copy.options.title}`,
        copy.options.intro,
        ...copy.options.items.map((o) => [`### ${o.title}`, o.body, bullets(o.bullets)].filter(Boolean).join("\n\n")),
      ]
        .filter(Boolean)
        .join("\n\n"),
    valueStats:
      copy.valueStats?.length &&
      ["## Nøgletal", ...copy.valueStats.map((v) => `- **${v.value}**: ${v.label}${v.note ? ` ${v.note}` : ""}`)].join("\n"),
    depth:
      copy.depth?.items?.length &&
      [`## ${copy.depth.title}`, ...copy.depth.items.map((d) => `### ${d.summary}\n\n${d.body}`)].join("\n\n"),
    testimonial:
      copy.testimonial?.quote &&
      `> ${copy.testimonial.quote}\n\n${[copy.testimonial.name, copy.testimonial.role].filter(Boolean).join(", ")}`,
    contact: contactSection(copy.contact, selfServe),
    faq: faqSection(copy.faq),
    closingCta: [`## ${copy.closingCta.title}`, copy.closingCta.description].join("\n\n"),
  };

  return join([
    frontMatter({
      title: node.seoTitle,
      description: node.seoDescription,
      url,
      section: [node.collection, ...trail.slice(1)].join(" / "),
    }),
    ...(node.sectionOrder ?? DEFAULT_SECTION_ORDER).map((k) => sections[k]),
  ]);
}

export function renderMarketingHub(
  hub: MarketingHub,
  copy: MarketingHubCopy,
  children: MarketingNode[],
  selfServe = false,
): string {
  return join([
    frontMatter({
      title: hub.seoTitle,
      description: hub.seoDescription,
      url: `${BASE_URL}${hub.route}`,
    }),
    `# ${copy.hero.title}`,
    copy.hero.subtitle,
    children.length &&
      [
        "## Sider i dette afsnit",
        ...children.map((c) => `- [${c.title}](${BASE_URL}/${c.collection}/${c.slug}.md): ${c.blurb}`),
      ].join("\n"),
    copy.options?.items?.length &&
      [
        `## ${copy.options.title}`,
        copy.options.intro,
        ...copy.options.items.map((o) => [`### ${o.title}`, o.body, bullets(o.bullets)].filter(Boolean).join("\n\n")),
      ]
        .filter(Boolean)
        .join("\n\n"),
    trustSection(copy.trust),
    contactSection(copy.contact, selfServe),
    faqSection(copy.faq),
  ]);
}

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

function renderSection(s: ArticleSection): string {
  switch (s.type) {
    case "lead":
    case "paragraph":
      return s.text;
    case "h2":
      return `## ${s.text}`;
    case "h3":
      return `### ${s.text}`;
    case "h4":
      return `#### ${s.text}`;
    case "callout":
      return `> ${s.text}`;
    case "list":
      return s.items.map((i) => `- ${i}`).join("\n");
    case "ordered-list":
      return s.items.map((i, n) => `${n + 1}. ${i}`).join("\n");
    case "cta":
      return `**${s.heading}**\n\n${s.text}\n\n[${s.buttonText}](${s.buttonHref})`;
    case "image":
      return `![${s.alt}](${s.url})${s.caption ? `\n\n_${s.caption}_` : ""}`;
    case "richtext":
      // The only block carrying HTML. Strip tags rather than emit raw markup
      // into a document whose whole point is to be plain text.
      return s.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    default:
      return "";
  }
}

export function renderArticle(a: Article): string {
  return join([
    frontMatter({
      title: a.title,
      description: a.description,
      url: `${BASE_URL}/blog/${a.slug}`,
      category: a.category,
      published: a.publishedAt,
    }),
    `# ${a.title}`,
    ...a.sections.map(renderSection),
  ]);
}

// ---------------------------------------------------------------------------
// Home and pricing
// ---------------------------------------------------------------------------

function renderHome(copy: HomeCopy, packages: PublicPackages | null = null): string {
  const selfServe = isSelfServe(packages);
  return join([
    frontMatter({
      title: "Klimaregnskab og ESG-rapport til danske SMV'er",
      description: selfServe
        ? "Få ro i maven med et klimaregnskab bygget oven på din bogføring i e-conomic, Dinero eller Billy. Gratis profil uden binding og personlig hjælp."
        : "Klimaregnskab og ESG rapporter til små og mellemstore virksomheder, hentet direkte fra dit regnskabssystem. Book en demo.",
      url: `${BASE_URL}/`,
    }),
    `# ${copy.hero.title}`,
    copy.hero.subtitle,
    `## ${copy.integrations.title}`,
    ...copy.integrations.paragraphs,
    `Systemer: ${INTEGRATION_LOGOS.map((l) => (l.status === "kommer-snart" ? `${l.name} (kommer snart)` : l.name)).join(", ")}.`,
    copy.recipients?.items?.length &&
      [`## ${copy.recipients.title}`, copy.recipients.intro, titledBullets(copy.recipients.items)].filter(Boolean).join("\n\n"),
    `## ${copy.trust.title}`,
    ...copy.trust.paragraphs,
    titledBullets(copy.trust.items),
    `## ${copy.steps.title}`,
    ...copy.steps.items.map((s) => `### ${s.title}\n\n${s.body}`),
    `## ${copy.themes.title}`,
    copy.themes.intro,
    ...copy.themes.items.map((t) => `### ${t.title}\n\n${t.body}\n\n[${t.linkLabel.replace(/\s*→\s*$/, "")}](${BASE_URL}${t.href}.md)`),
    `## ${selfServe ? copy.pricingTeaser.title : copy.pricingTeaser.salesLedTitle}`,
    selfServe && copy.pricingTeaser.lead,
    selfServe && titledBullets(copy.pricingTeaser.points),
    ...(selfServe
      ? packages!.packages
          .filter((p) => p.accountType === "company")
          .sort((a, b) => a.displayRank - b.displayRank)
          .map((p) => {
            const plan = curatedPlanFor(copy.pricingTeaser.plans, p);
            return renderApiPackage(packages!, p, plan && { tagline: plan.tag, features: plan.features }, "###");
          })
      : copy.pricingTeaser.plans.map((p) =>
          [`### ${p.name}`, p.badge && `_${p.badge}_`, p.tag, bullets(p.features)].filter(Boolean).join("\n\n"),
        )),
    selfServe
      ? `Priserne er pr. måned, faktureret årligt, ekskl. moms. Alle pakker på [${BASE_URL}/priser](${BASE_URL}/priser.md).`
      : `Prisen afhænger af pakke og behov, og I får et konkret tilbud ved en demo. Se hvad hver pakke indeholder på [${BASE_URL}/priser](${BASE_URL}/priser.md).`,
    `## ${copy.human.title}`,
    `> ${copy.human.quote}\n\n${[copy.human.quoteName, copy.human.quoteRole].filter(Boolean).join(", ")}`,
    contactSection(copy.human.contact, selfServe)?.replace(/^## /, "### "),
    `## ${copy.finalCta.title}`,
    copy.finalCta.body,
    startLine(packages),
  ]);
}

type PackageCopy = { name: string; tagline: string; includedLabel: string; features: string[] };

function renderPackage(p: PackageCopy): string {
  return [`## ${p.name}`, p.tagline, `${p.includedLabel}:`, bullets(p.features)].filter(Boolean).join("\n\n");
}

function comparisonCell(v: boolean | string): string {
  if (v === true) return "Ja";
  if (v === false) return "-";
  return v;
}

function renderPricing(copy: PricingCopy, packages: PublicPackages | null = null): string {
  if (isSelfServe(packages)) return renderSelfServePricing(copy, packages!);
  return join([
    frontMatter({
      title: "Pakker til klimaregnskab og ESG-rapportering",
      description:
        "Se qlim8's pakker til klimaregnskab og ESG-rapportering. Tag en uformel snak, eller ring direkte på +45 93 90 13 84, så finder vi pakken, der passer.",
      url: `${BASE_URL}/priser`,
    }),
    `# ${copy.header.title}`,
    copy.header.subtitle,
    bullets(copy.trustBar?.map((t) => t.replace(/^✓\s*/, ""))),
    renderPackage(copy.starter),
    renderPackage(copy.premium),
    renderPackage({
      ...copy.enterprise,
      features: copy.enterprise.features.map((f) => (f.note ? `${f.label} (${f.note})` : f.label)),
    }),
    copy.comparison?.rows?.length &&
      [
        `## ${copy.comparison.title}`,
        // One string, not one per row: `join` puts a blank line between parts,
        // which would break the table into unrelated paragraphs.
        [
          `| Funktion | ${copy.starter.name} | ${copy.premium.name} | ${copy.enterprise.name} |`,
          "| --- | --- | --- | --- |",
          ...copy.comparison.rows.map(
            (r) =>
              `| ${r.label} | ${comparisonCell(r.starter)} | ${comparisonCell(r.premium)} | ${comparisonCell(r.enterprise)} |`,
          ),
        ].join("\n"),
      ].join("\n\n"),
    "## Pris",
    `Prisen afhænger af pakke og behov, og I får et konkret tilbud ved en demo. ${demoLine()}`,
    faqSection(copy.faq),
    copy.closing && `## ${copy.closing.title}`,
    copy.closing?.body,
  ]);
}

const GROUP_HEADINGS = { free: "Kom gratis i gang", selfServe: "Køb selv", contact: "Kontakt os" } as const;

/** /priser.md once the catalog sells something by itself: everything priced comes from the API. */
function renderSelfServePricing(copy: PricingCopy, packages: PublicPackages): string {
  const curated: Record<string, { tagline?: string; features?: string[] }> = {
    starter: copy.starter,
    premium: copy.premium,
    enterprise: { ...copy.enterprise, features: copy.enterprise.features.map((f) => (f.note ? `${f.label} (${f.note})` : f.label)) },
  };
  const groups = groupPackages(packages);
  return join([
    frontMatter({
      title: "Priser: start gratis og uden binding",
      description:
        "Kom i gang med Gratis-pakken uden binding og uden kreditkort. De betalte pakker er årsaftaler med prisen vist pr. måned ekskl. moms. Ring, hvis du er i tvivl.",
      url: `${BASE_URL}/priser`,
    }),
    `# ${copy.header.title}`,
    copy.header.subtitle,
    bullets(copy.trustBar?.map((t) => t.replace(/^✓\s*/, ""))),
    startLine(packages),
    ...(["free", "selfServe", "contact"] as const)
      .filter((g) => groups[g].length > 0)
      .flatMap((g) => [`## ${GROUP_HEADINGS[g]}`, ...groups[g].map((p) => renderApiPackage(packages, p, curated[p.key], "###"))]),
    apiComparisonTable(packages, copy.comparison?.title ?? "Sammenlign pakkerne"),
    "## Pris",
    "Priserne er pr. måned, faktureret årligt, ekskl. moms. Basis og Udvidet betales med kort i appen; Komplet og Koncern faktureres årligt.",
    faqSection(copy.faq),
    copy.closing && `## ${copy.closing.title}`,
    copy.closing?.body,
    startLine(packages),
  ]);
}

// ---------------------------------------------------------------------------
// Resolver: URL path -> markdown
// ---------------------------------------------------------------------------

/** Every path that has a `.md` twin, used by /llms.txt and the route handler. */
export function markdownPaths(): string[] {
  return [
    "/",
    "/priser",
    "/blog",
    ...MARKETING_HUBS.map((h) => h.route),
    ...ALL_MARKETING_NODES.filter((n) => n.status !== "coming-soon").map(
      (n) => `/${n.collection}/${n.slug}`,
    ),
  ];
}

async function resolveArticleBySlug(slug: string): Promise<Article | null> {
  // CMS wins by slug, exactly as app/blog/[slug] resolves it.
  const cms = await fetchArticleBySlug(slug, "da");
  if (cms) {
    return {
      slug: cms.slug,
      title: cms.title,
      description: cms.description,
      category: cms.category as Article["category"],
      publishedAt: cms.publishedAt,
      readingTime: cms.readingTime,
      sections: cms.sections as ArticleSection[],
    };
  }
  return bundledArticles.find((a) => a.slug === slug) ?? null;
}

async function renderBlogIndex(): Promise<string> {
  const published = await fetchPublishedArticles("da");
  const bySlug = new Map<string, { slug: string; title: string; description: string; publishedAt: string }>();
  for (const a of bundledArticles) bySlug.set(a.slug, a);
  for (const a of published) bySlug.set(a.slug, a);
  const merged = Array.from(bySlug.values()).sort(
    (x, y) => new Date(y.publishedAt).getTime() - new Date(x.publishedAt).getTime(),
  );
  return join([
    frontMatter({
      title: "Viden om ESG og klimaregnskab",
      description: "Artikler og guides om klimaregnskab, VSME, Scope 1-3 og ESG-compliance.",
      url: `${BASE_URL}/blog`,
    }),
    "# Blog",
    "Tilføj `.md` til enhver artikel-URL for at få kilden som markdown.",
    merged
      .map((a) => `- [${a.title}](${BASE_URL}/blog/${a.slug}.md) (${a.publishedAt}): ${a.description}`)
      .join("\n"),
  ]);
}

/**
 * Render the markdown twin for a site path, or null if the path has none.
 * `segments` is the URL path split on "/", with the `.md` suffix already
 * stripped by the caller.
 */
export async function renderMarkdownFor(segments: string[]): Promise<string | null> {
  if (segments.length === 0) {
    const [copy, packages] = await Promise.all([resolvePageCopy(HOME_PAGE_KEY, HOME_COPY), fetchPublicPackages()]);
    return renderHome(copy, packages);
  }

  if (segments.length === 1) {
    const [first] = segments;
    if (first === "priser") {
      const [copy, packages] = await Promise.all([resolvePageCopy(PRICING_PAGE_KEY, PRICING_COPY), fetchPublicPackages()]);
      return renderPricing(copy, packages);
    }
    if (first === "blog") return renderBlogIndex();

    const hub = MARKETING_HUBS.find((h) => h.route === `/${first}`);
    if (hub) {
      const [copy, packages] = await Promise.all([resolvePageCopy(hub.pageKey, hub.defaults), fetchPublicPackages()]);
      const children = ALL_MARKETING_NODES.filter(
        (n) => n.collection === hub.collection && !n.parentSlug && n.status !== "coming-soon",
      );
      return renderMarketingHub(hub, copy, children, isSelfServe(packages));
    }
    return null;
  }

  if (segments.length === 2) {
    const [first, second] = segments;
    if (first === "blog") {
      const article = await resolveArticleBySlug(second);
      return article ? renderArticle(article) : null;
    }
    const hub = MARKETING_HUBS.find((h) => h.route === `/${first}`);
    if (!hub) return null;
    const node = getNode(hub.collection, second);
    if (!node || node.status === "coming-soon") return null;
    const [copy, packages] = await Promise.all([resolvePageCopy(node.pageKey, node.defaults), fetchPublicPackages()]);
    return renderMarketingPage(node, copy, isSelfServe(packages));
  }

  return null;
}

/** Named exports used by the llms.txt route so it can list real hub titles. */
export { getHub };
