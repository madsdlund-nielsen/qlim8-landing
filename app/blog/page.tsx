import type { Metadata } from "next";
import Viden, { type VidenArticle } from "@/page-components/viden";
import { articles as bundledArticles } from "@/content/articles";
import { fetchPublishedArticles } from "@/lib/cms";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema, BASE_URL, ORG_REF, WEBSITE_ID } from "@/lib/schema";

// Re-fetch published CMS articles on a 5-minute ISR cadence (busted instantly
// by the app's on-publish revalidate webhook).
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Viden om ESG & Klimaregnskab",
  description:
    "Artikler og guides om klimaregnskab, VSME-standarden, Scope 1-3 emissioner og ESG-compliance for danske virksomheder. Hold dig opdateret med de seneste krav.",
  alternates: { canonical: "https://qlim8.com/blog" },
  openGraph: {
    title: "Viden om ESG & Klimaregnskab | qlim8",
    description:
      "Artikler og guides om klimaregnskab, VSME-standarden og Scope 1-3 emissioner.",
    url: "https://qlim8.com/blog",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 viden" }],
  },
};

export default async function Page() {
  // Merge CMS-published articles with the bundled fallback list (DB wins by
  // slug), newest first.
  const published = await fetchPublishedArticles("da");
  const bySlug = new Map<string, VidenArticle>();
  for (const a of bundledArticles) {
    bySlug.set(a.slug, {
      slug: a.slug,
      title: a.title,
      description: a.description,
      category: a.category,
      publishedAt: a.publishedAt,
      readingTime: a.readingTime,
    });
  }
  for (const a of published) {
    bySlug.set(a.slug, a);
  }
  const merged = Array.from(bySlug.values()).sort(
    (x, y) => new Date(y.publishedAt).getTime() - new Date(x.publishedAt).getTime(),
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Viden om ESG og klimaregnskab",
    description:
      "Artikler og guides om klimaregnskab, VSME-standarden, Scope 1-3 emissioner og ESG-compliance for danske virksomheder.",
    url: `${BASE_URL}/blog`,
    inLanguage: "da-DK",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: ORG_REF,
    blogPost: merged.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      url: `${BASE_URL}/blog/${a.slug}`,
      datePublished: a.publishedAt,
      articleSection: a.category,
      author: ORG_REF,
    })),
  };

  return (
    <>
      <JsonLd
        schema={[
          blogSchema,
          buildBreadcrumbSchema([
            { name: "qlim8", href: "/" },
            { name: "Blog", href: "/blog" },
          ]),
        ]}
      />
      <Viden articles={merged} />
    </>
  );
}
