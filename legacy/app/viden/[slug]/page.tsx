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
    alternates: { canonical: `https://qlim8.com/viden/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://qlim8.com/viden/${article.slug}`,
      images: [{ url: '/opengraph.jpg', width: 1200, height: 630, alt: article.title }],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()
  return <ArticleTemplate article={article} />
}
