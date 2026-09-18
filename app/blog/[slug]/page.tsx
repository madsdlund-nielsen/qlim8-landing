import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { articles } from '@/content/articles'
import type { Article, ArticleSection } from '@/content/article'
import ArticleTemplate from '@/page-components/article'
import { fetchArticleBySlug, fetchPublishedArticles, type CmsArticle } from '@/lib/cms'
import { JsonLd } from '@/components/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'

type Props = { params: Promise<{ slug: string }> }

// ISR: published CMS articles refresh on this cadence; the app's revalidate
// webhook busts the per-slug tag immediately on publish/unpublish.
export const revalidate = 300

// Map a CMS article (published via the admin CMS) onto the landing Article
// shape so the existing renderer works unchanged.
function fromCms(a: CmsArticle): Article {
  return {
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category as Article['category'],
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    readingTime: a.readingTime,
    sections: a.sections as ArticleSection[],
  }
}

async function resolveArticle(slug: string): Promise<Article | null> {
  // CMS (DB) wins over the bundled fallback so edits go live without a redeploy.
  const cms = await fetchArticleBySlug(slug, 'da')
  if (cms) return fromCms(cms)
  return articles.find((a) => a.slug === slug) ?? null
}

export async function generateStaticParams() {
  const published = await fetchPublishedArticles('da')
  const slugs = new Set<string>()
  for (const a of articles) slugs.add(a.slug)
  for (const a of published) slugs.add(a.slug)
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await resolveArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `https://qlim8.com/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://qlim8.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: article.title }],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await resolveArticle(slug)
  if (!article) notFound()

  // Article + BreadcrumbList come from src/lib/schema.ts so the author and
  // publisher are the site-wide #organization rather than a third, unlinked
  // copy of the company, and dateModified is the real edit date.
  const schema = [
    buildArticleSchema({
      headline: article.title,
      description: article.description,
      path: `/blog/${article.slug}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      articleSection: article.category,
    }),
    buildBreadcrumbSchema([
      { name: 'qlim8', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: article.title, href: `/blog/${article.slug}` },
    ]),
  ]

  return (
    <>
      <JsonLd schema={schema} />
      <ArticleTemplate article={article} />
    </>
  )
}
