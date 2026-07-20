import Link from 'next/link'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import { ArticleSections } from '@/components/public/ArticleSections'
import type { Article } from '@/content/article'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

export default function ArticleTemplate({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-24">
        <Link
          href="/blog"
          className="text-sm text-gray-600 hover:text-primary transition-colors mb-10 inline-block"
          data-testid="link-back-to-viden"
        >
          ← Alle artikler
        </Link>

        <header className="mb-12 sm:mb-14">
          <p className="text-sm text-gray-500 mb-3">
            {article.category} · {formatDate(article.publishedAt)} · {article.readingTime} min læsning
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5"
            data-testid="text-article-title"
          >
            {article.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {article.description}
          </p>
        </header>

        <article className="border-t border-gray-200 pt-10">
          <ArticleSections sections={article.sections} />
        </article>

        <div className="mt-14 p-7 bg-gray-900 rounded-2xl">
          <p className="text-white font-bold text-lg mb-2">Klar til at komme i gang?</p>
          <p className="text-gray-300 text-sm mb-5 max-w-xl">
            qlim8 gør klimaregnskabet automatisk. Fra 250 kr/md.
          </p>
          <a
            href="https://app.qlim8.com/auth?tab=register"
            className="inline-block px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-sm transition-colors"
          >
            Prøv gratis
          </a>
        </div>

        <div className="mt-10">
          <NewsletterForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
