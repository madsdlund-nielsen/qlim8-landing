import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { articles } from '@/content/articles'
import type { Article, ArticleSection } from '@/content/article'
import ArticleTemplate from '@/page-components/article'
import { fetchArticleBySlug, fetchPublishedArticles, type CmsArticle } from '@/lib/cms'
import { JsonLd } from '@/components/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schema'
import { fetchPublicPackages } from '@/lib/packages'
import { applyPriceTokensToArticle } from '@/lib/priceTokens'

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
  const [cms, packages] = await Promise.all([fetchArticleBySlug(slug, 'da'), fetchPublicPackages()])
  const article = cms ? fromCms(cms) : (articles.find((a) => a.slug === slug) ?? null)
  // A price in an article is a [[ ... {pris:starter} ... ]] token, filled from
  // the packages API here (src/lib/priceTokens.ts), so the page, its metadata
  // and its JSON-LD all see the resolved text, bundled or CMS alike. The .md
  // twin does the same in src/lib/markdown.ts.
  return article ? applyPriceTokensToArticle(article, packages) : null
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
    title: article.seoTitle ?? article.title,
    description: article.description,
    alternates: { canonical: `https://qlim8.com/blog/${article.slug}` },
    openGraph: {
      title: article.seoTitle ?? article.title,
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
