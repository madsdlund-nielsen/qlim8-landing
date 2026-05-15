import Link from 'next/link'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import { articles } from '@/content/articles'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

export default function Viden() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.05]" data-testid="text-blog-title">
          ESG-viden uden konsulentjargon
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Konkrete guides til SMV'er om klimaregnskab, scope 1-3, VSME, L193 og hvad banken egentlig spørger om. Skrevet af mennesker der har bygget systemet.
        </p>
      </section>

      {/* Artikler */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-t border-gray-200 pt-10">Seneste artikler</h2>

        {articles.length === 0 ? (
          <p className="text-gray-500 text-sm">Første artikel er på vej.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block py-7"
                  data-testid={`card-article-${article.slug}`}
                >
                  <p className="text-sm text-gray-500 mb-2">
                    {article.category} · {formatDate(article.publishedAt)} · {article.readingTime} min læsning
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {article.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-primary group-hover:underline">
                    Læs artiklen →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Nyhedsbrev */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pb-20">
        <NewsletterForm />
      </section>

      <SiteFooter />
    </div>
  )
}
