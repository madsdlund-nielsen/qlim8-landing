import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";

const BASE_URL = "https://qlim8.com";

// Bump when the static marketing/legal pages get a meaningful content change.
// (Blog routes derive lastModified from each article's publishedAt instead, so
// they don't need this.) Using a stable date avoids telling crawlers that every
// page changed on every deploy, which `new Date()` would otherwise do.
const SITE_UPDATED = new Date("2026-06-08");

export default function sitemap(): MetadataRoute.Sitemap {
  // The blog index is effectively "modified" whenever the newest article ships.
  const blogUpdated = articles.reduce(
    (latest, a) => (a.publishedAt > latest ? a.publishedAt : latest),
    articles[0]?.publishedAt ?? "1970-01-01",
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                    lastModified: SITE_UPDATED,          changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/priser`,              lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/metodologi`,          lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`,                lastModified: new Date(blogUpdated), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/api`,                 lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/om-os`,               lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/docs`,                lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/docs/mcp-quickstart`, lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/docs/mcp-tools`,      lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/docs/api-reference`,  lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/kontakt`,             lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/karriere`,            lastModified: SITE_UPDATED,          changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/cookies`,             lastModified: SITE_UPDATED,          changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/privatlivspolitik`,   lastModified: SITE_UPDATED,          changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/handelsbetingelser`,  lastModified: SITE_UPDATED,          changeFrequency: "yearly",  priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
