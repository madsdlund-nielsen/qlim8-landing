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
import { BASE_URL } from "@/lib/schema";

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

/** The ways in, as one line: a demo or a phone call. No signup link exists. */
function demoLine(): string {
  return `[${DEMO_LABEL}](${BASE_URL}${DEMO_HREF}) eller ring [${PHONE_DISPLAY}](${PHONE_HREF}).`;
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

function renderMarketingPage(node: MarketingNode, copy: MarketingPageCopy): string {
  const url = `${BASE_URL}/${node.collection}/${node.slug}`;
  const trail = getAncestors(node).map((a) => a.title);

  return join([
    frontMatter({
      title: node.seoTitle,
      description: node.seoDescription,
      url,
      section: [node.collection, ...trail.slice(1)].join(" / "),
    }),
    `# ${copy.hero.title}`,
    copy.hero.subtitle,
    `## ${copy.intro.heading}`,
    copy.intro.body,
    bullets(copy.intro.bullets),
    copy.painPoints?.length &&
      [
        "## Udfordringer og løsninger",
        ...copy.painPoints.map((p) =>
          [`**${p.pain}**`, p.solution, p.outcome && `_${p.outcome}_`].filter(Boolean).join("\n\n"),
        ),
      ].join("\n\n"),
    copy.features?.length &&
      ["## Det får du", ...copy.features.map((f) => `### ${f.title}\n\n${f.body}`)].join("\n\n"),
    copy.howItWorks?.steps?.length &&
      [
        `## ${copy.howItWorks.title}`,
        ...copy.howItWorks.steps.map((s) => `### ${s.title}\n\n${s.body}`),
      ].join("\n\n"),
    copy.valueStats?.length &&
      [
        "## Nøgletal",
        ...copy.valueStats.map((v) => `- **${v.value}**: ${v.label}${v.note ? ` ${v.note}` : ""}`),
      ].join("\n"),
    faqSection(copy.faq),
    `## ${copy.closingCta.title}`,
    copy.closingCta.description,
  ]);
}

function renderMarketingHub(hub: MarketingHub, copy: MarketingHubCopy, children: MarketingNode[]): string {
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

function renderHome(copy: HomeCopy): string {
  return join([
    frontMatter({
      title: "qlim8: automatisk klimaregnskab og VSME-rapportering",
      description:
        "Dansk ESG-platform til klimaregnskab (Scope 1-3) og VSME-rapportering, med indbygget MCP-server til AI-assistenter.",
      url: `${BASE_URL}/`,
    }),
    `# ${copy.hero.title}`,
    copy.hero.subtitle,
    copy.hero.ctaNote,
    `## ${copy.integrations.title}`,
    `Systemer: ${INTEGRATION_LOGOS.map((l) => l.name).join(", ")}.`,
    ...copy.features.map((f) =>
      [`## ${f.title}`, f.body, bullets(f.bullets)].filter(Boolean).join("\n\n"),
    ),
    `## ${copy.builtDifferent.title}`,
    copy.builtDifferent.intro,
    ...copy.builtDifferent.commitments.map((c) => `### ${c.title}\n\n${c.body}`),
    `## ${copy.steps.title}`,
    copy.steps.intro,
    ...copy.steps.items.map((s) => `### ${s.title}\n\n${s.body}`),
    `## ${copy.pricingTeaser.title}`,
    ...copy.pricingTeaser.plans.map((p) =>
      [`### ${p.name}`, p.badge && `_${p.badge}_`, p.tag, bullets(p.features)].filter(Boolean).join("\n\n"),
    ),
    `Prisen afhænger af pakke og behov, og I får et konkret tilbud ved en demo. Se hvad hver pakke indeholder på [${BASE_URL}/priser](${BASE_URL}/priser.md).`,
    `## ${copy.finalCta.title}`,
    copy.finalCta.body,
    demoLine(),
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

function renderPricing(copy: PricingCopy): string {
  return join([
    frontMatter({
      title: "Pakker: Starter, Premium & Enterprise",
      description:
        "Starter, Premium og Enterprise, og hvad hver pakke indeholder. Prisen afhænger af pakke og behov og gives ved en demo.",
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
    "VSME Basis er med fra Starter. VSME Comprehensive og MCP-adgang kræver Premium. CSRD kræver Enterprise.",
    copy.comparison?.rows?.length &&
      [
        `## ${copy.comparison.title}`,
        // One string, not one per row: `join` puts a blank line between parts,
        // which would break the table into unrelated paragraphs.
        [
          "| Funktion | Starter | Premium | Enterprise |",
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
    return renderHome(await resolvePageCopy(HOME_PAGE_KEY, HOME_COPY));
  }

  if (segments.length === 1) {
    const [first] = segments;
    if (first === "priser") {
      return renderPricing(await resolvePageCopy(PRICING_PAGE_KEY, PRICING_COPY));
    }
    if (first === "blog") return renderBlogIndex();

    const hub = MARKETING_HUBS.find((h) => h.route === `/${first}`);
    if (hub) {
      const copy = await resolvePageCopy(hub.pageKey, hub.defaults);
      const children = ALL_MARKETING_NODES.filter(
        (n) => n.collection === hub.collection && !n.parentSlug && n.status !== "coming-soon",
      );
      return renderMarketingHub(hub, copy, children);
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
    const copy = await resolvePageCopy(node.pageKey, node.defaults);
    return renderMarketingPage(node, copy);
  }

  return null;
}

/** Named exports used by the llms.txt route so it can list real hub titles. */
export { getHub };
