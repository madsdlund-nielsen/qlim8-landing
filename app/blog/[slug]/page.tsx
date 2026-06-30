import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { articles } from '@/content/articles'
import type { Article, ArticleSection } from '@/content/article'
import ArticleTemplate from '@/page-components/article'
import { fetchArticleBySlug, fetchPublishedArticles, type CmsArticle } from '@/lib/cms'

type Props = { params: Promise<{ slug: string }> }

// ISR — published CMS articles refresh on this cadence; the app's revalidate
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
      images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: article.title }],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await resolveArticle(slug)
  if (!article) notFound()

  const url = `https://qlim8.com/blog/${article.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: ['https://qlim8.com/opengraph.jpg'],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'qlim8 ApS',
      url: 'https://qlim8.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'qlim8 ApS',
      logo: { '@type': 'ImageObject', url: 'https://qlim8.com/favicon.svg' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: article.category,
    inLanguage: 'da-DK',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'qlim8', item: 'https://qlim8.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://qlim8.com/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleTemplate article={article} />
    </>
  )
}
