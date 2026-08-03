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

/**
 * Fetch JSON from the app's public CMS API, falling back to null on any
 * failure so the site keeps rendering its bundled defaults.
 *
 * The fallback is deliberate, but it used to be *silent*, which made one
 * failure mode invisible: the app answers an unknown `/api/public/cms/*` path
 * with HTTP 200 and the SPA's HTML shell rather than a 404. `res.ok` therefore
 * passed, `res.json()` threw on the HTML, and the bare `catch` swallowed it, 
 * so renaming a CMS route in qlim8-app would leave this site building,
 * deploying, and quietly serving stale bundled copy forever, with no signal
 * anywhere.
 *
 * Every miss is now logged, and a non-JSON content-type is treated as a miss
 * explicitly rather than by way of a parse exception. These logs are what
 * scripts/check-cms-contract.mjs and the cms-contract workflow assert against.
 */
async function cmsFetch<T>(path: string, tags: string[]): Promise<T | null> {
  try {
    const res = await fetch(`${CMS_API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });

    if (!res.ok) {
      console.warn(`[cms] ${res.status} from ${path}, falling back to bundled defaults`);
      return null;
    }

    // An unknown /api path returns 200 + text/html (the SPA shell), which would
    // otherwise surface only as an opaque JSON parse error.
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      console.warn(
        `[cms] non-JSON response from ${path} (content-type: ${contentType || "none"}), ` +
          `the endpoint has most likely moved or been renamed in qlim8-app. ` +
          `Falling back to bundled defaults.`,
      );
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.warn(
      `[cms] request to ${path} failed, falling back to bundled defaults:`,
      err instanceof Error ? err.message : err,
    );
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
