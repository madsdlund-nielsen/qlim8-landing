import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { ALL_MARKETING_NODES, MARKETING_HUBS } from "@/content/marketing";
import { fetchMarketingCopyEnvelope, fetchPublishedArticles } from "@/lib/cms";
import { contentDate, latestOf } from "@/lib/contentDates";
import { HOME_PAGE_KEY } from "@/content/copy/home";
import { PRICING_PAGE_KEY } from "@/content/copy/pricing";
import { METHODOLOGY_PAGE_KEY } from "@/content/copy/methodology";
import { ABOUT_PAGE_KEY } from "@/content/copy/about";
import { CONTACT_PAGE_KEY } from "@/content/copy/contact";
import { CAREERS_PAGE_KEY } from "@/content/copy/careers";
import {
  LEGAL_COOKIES_PAGE_KEY,
  LEGAL_PRIVACY_PAGE_KEY,
  LEGAL_TERMS_PAGE_KEY,
} from "@/content/copy/legal";

const BASE_URL = "https://qlim8.com";

// <lastmod> per URL is the newer of two real dates:
//   - the git date of the route's content files (src/generated/content-dates.json,
//     written by scripts/content-dates.mjs in CI before every build), and
//   - the `updatedAt` of the page's CMS-published override, when there is one,
//     so an edit made in /admin moves the date without a deploy.
// This replaced one hand-bumped constant shared by ~60 URLs, which nobody
// bumped, and which told crawlers that nothing on the site had changed in two
// months while the blog and the CMS kept moving. `new Date()` would be the
// same mistake in the other direction: every URL "changed" on every deploy.
//
// Fetches below share Next's data cache with the pages themselves (same URL,
// same tags), so the sitemap costs no extra CMS round-trips once pages are warm.

type Entry = {
  route: string;
  pageKeys?: string[];
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const STATIC_ROUTES: Entry[] = [
  { route: "/",                    pageKeys: [HOME_PAGE_KEY, "homepage.faqs", "landing.images"], changeFrequency: "weekly",  priority: 1.0 },
  { route: "/priser",              pageKeys: [PRICING_PAGE_KEY],     changeFrequency: "monthly", priority: 0.9 },
  { route: "/metodologi",          pageKeys: [METHODOLOGY_PAGE_KEY], changeFrequency: "monthly", priority: 0.8 },
  { route: "/api",                                                   changeFrequency: "monthly", priority: 0.7 },
  { route: "/om-os",               pageKeys: [ABOUT_PAGE_KEY, "about.images"], changeFrequency: "monthly", priority: 0.7 },
  { route: "/docs",                                                  changeFrequency: "monthly", priority: 0.6 },
  { route: "/docs/mcp-quickstart",                                   changeFrequency: "monthly", priority: 0.6 },
  { route: "/docs/mcp-tools",                                        changeFrequency: "monthly", priority: 0.6 },
  { route: "/docs/api-reference",                                    changeFrequency: "monthly", priority: 0.6 },
  { route: "/kontakt",             pageKeys: [CONTACT_PAGE_KEY],     changeFrequency: "monthly", priority: 0.6 },
  { route: "/nyhedsbrev",                                            changeFrequency: "monthly", priority: 0.6 },
  { route: "/karriere",            pageKeys: [CAREERS_PAGE_KEY],     changeFrequency: "monthly", priority: 0.5 },
  { route: "/cookies",             pageKeys: [LEGAL_COOKIES_PAGE_KEY], changeFrequency: "yearly", priority: 0.3 },
  { route: "/privatlivspolitik",   pageKeys: [LEGAL_PRIVACY_PAGE_KEY], changeFrequency: "yearly", priority: 0.3 },
  { route: "/handelsbetingelser",  pageKeys: [LEGAL_TERMS_PAGE_KEY], changeFrequency: "yearly",  priority: 0.3 },
];

async function cmsDate(pageKeys: string[] | undefined): Promise<Date | undefined> {
  if (!pageKeys?.length) return undefined;
  const envelopes = await Promise.all(pageKeys.map((k) => fetchMarketingCopyEnvelope(k, "da")));
  return latestOf(...envelopes.map((e) => e.updatedAt));
}

/** Git date ∨ CMS date; falls back to the git date alone when the CMS is unreachable. */
async function lastModifiedFor(route: string, pageKeys?: string[]): Promise<Date | undefined> {
  return latestOf(contentDate(route), await cmsDate(pageKeys));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog routes come from the same merge /blog renders: bundled first, then
  // CMS-published entries overwriting by slug, so an article authored only in
  // /admin is never missing here. fetchPublishedArticles returns [] on any CMS
  // failure, which degrades to the bundled list rather than an empty sitemap.
  const published = await fetchPublishedArticles("da");
  const blogBySlug = new Map<string, { slug: string; date: Date | undefined }>();
  for (const a of articles) {
    blogBySlug.set(a.slug, { slug: a.slug, date: latestOf(a.publishedAt, a.updatedAt, contentDate(`/blog/${a.slug}`)) });
  }
  for (const a of published) {
    blogBySlug.set(a.slug, { slug: a.slug, date: latestOf(a.publishedAt, a.updatedAt) });
  }
  const blogArticles = Array.from(blogBySlug.values());

  const staticRoutes: MetadataRoute.Sitemap = await Promise.all(
    STATIC_ROUTES.map(async (e) => ({
      url: `${BASE_URL}${e.route}`,
      lastModified: await lastModifiedFor(e.route, e.pageKeys),
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    })),
  );

  // The blog index is modified whenever any post is.
  const blogIndex: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/blog`,
    lastModified: latestOf(await lastModifiedFor("/blog"), ...blogArticles.map((a) => a.date)),
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const articleRoutes: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Marketing leaves first, so a hub can be dated by its newest leaf.
  // Coming-soon pages (Appelsin) are excluded: they render noindex until they ship.
  const liveNodes = ALL_MARKETING_NODES.filter((n) => n.status !== "coming-soon");
  const nodeDates = new Map<string, Date | undefined>();
  await Promise.all(
    liveNodes.map(async (n) => {
      nodeDates.set(`${n.collection}/${n.slug}`, await lastModifiedFor(`/${n.collection}/${n.slug}`, [n.pageKey]));
    }),
  );

  const marketingRoutes: MetadataRoute.Sitemap = liveNodes.map((n) => ({
    url: `${BASE_URL}/${n.collection}/${n.slug}`,
    lastModified: nodeDates.get(`${n.collection}/${n.slug}`),
    changeFrequency: "monthly",
    priority: n.parentSlug ? 0.6 : 0.7,
  }));

  const hubRoutes: MetadataRoute.Sitemap = await Promise.all(
    MARKETING_HUBS.map(async (h) => ({
      url: `${BASE_URL}${h.route}`,
      lastModified: latestOf(
        await lastModifiedFor(h.route, [h.pageKey]),
        ...liveNodes.filter((n) => n.collection === h.collection).map((n) => nodeDates.get(`${n.collection}/${n.slug}`)),
      ),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  return [...staticRoutes.slice(0, 3), blogIndex, ...staticRoutes.slice(3), ...articleRoutes, ...hubRoutes, ...marketingRoutes];
}
