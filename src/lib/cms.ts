// Read-only client for the qlim8-app CMS public API. Content authored in the
// app /admin CMS is published here and consumed by the marketing site. Every
// fetch falls back gracefully (null / empty) so the site keeps rendering its
// bundled defaults if the API is unavailable.

export const CMS_API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://app.qlim8.com";

// ISR: re-fetch published content at most every 5 minutes; an on-publish
// webhook (app/api/revalidate) busts these tags immediately.
const REVALIDATE_SECONDS = 300;

export interface ArticleSection {
  type:
    | "lead"
    | "h2"
    | "h3"
    | "h4"
    | "paragraph"
    | "list"
    | "ordered-list"
    | "callout"
    | "cta"
    | "image"
    | "richtext";
  text?: string;
  items?: string[];
  heading?: string;
  buttonText?: string;
  buttonHref?: string;
  assetId?: string;
  url?: string;
  alt?: string;
  caption?: string;
  html?: string;
}

export interface CmsArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  sections: ArticleSection[];
}

export type CmsArticleSummary = Omit<CmsArticle, "sections">;

type Language = "da" | "en";

async function cmsFetch<T>(path: string, tags: string[]): Promise<T | null> {
  try {
    const res = await fetch(`${CMS_API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchPublishedArticles(language: Language = "da"): Promise<CmsArticleSummary[]> {
  const data = await cmsFetch<CmsArticleSummary[]>(
    `/api/public/cms/articles?language=${language}`,
    ["cms-articles"],
  );
  return data ?? [];
}

export async function fetchArticleBySlug(slug: string, language: Language = "da"): Promise<CmsArticle | null> {
  return cmsFetch<CmsArticle>(`/api/public/cms/articles/${encodeURIComponent(slug)}?language=${language}`, [
    "cms-articles",
    `cms-article-${slug}`,
  ]);
}

export async function fetchMarketingCopy(
  pageKey: string,
  language: Language = "da",
): Promise<Record<string, unknown>> {
  const data = await cmsFetch<{ copy: Record<string, unknown> }>(
    `/api/public/cms/marketing/${encodeURIComponent(pageKey)}?language=${language}`,
    ["cms-marketing", `cms-marketing-${pageKey}`],
  );
  return data?.copy ?? {};
}

/**
 * Pull a CMS-published image URL out of a marketing-copy map, or undefined if
 * the key is unset/blank. Callers pass the result (or a bundled `@assets`
 * fallback) to next/image, so a missing/malformed override never breaks a page.
 */
export function cmsImageUrl(copy: Record<string, unknown>, key: string): string | undefined {
  const v = copy[key];
  return typeof v === "string" && v.trim().length > 0 ? v : undefined;
}
