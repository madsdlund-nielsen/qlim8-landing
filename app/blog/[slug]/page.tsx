import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { articles } from '@/content/articles'
import ArticleTemplate from '@/page-components/article'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
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
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
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
      '@id': `https://qlim8.com/blog/${article.slug}`,
    },
    articleSection: article.category,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArticleTemplate article={article} />
    </>
  )
}
