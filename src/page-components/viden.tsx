import Link from 'next/link'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import { articles as bundledArticles } from '@/content/articles'

export type VidenArticle = {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  updatedAt?: string
  readingTime: number
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

// `articles` defaults to the bundled list; the blog index page passes a list
// merged with CMS-published articles (DB wins by slug).
export default function Viden({ articles = bundledArticles }: { articles?: VidenArticle[] }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-(--container-max) mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12">
        <h1 className="mb-5 max-w-3xl text-balance" data-testid="text-blog-title">
          ESG-viden uden konsulentjargon
        </h1>
        <p className="text-lead text-foreground max-w-(--measure-body)">
          Konkrete guides til SMV'er om klimaregnskab, scope 1-3, VSME, L193 og hvad banken egentlig spørger om. Skrevet af mennesker der har bygget systemet.
        </p>
      </section>

      {/* Artikler */}
      <section className="max-w-(--container-max) mx-auto px-4 sm:px-6 py-10">
        <h2 className="mb-8 border-t border-border pt-10">Seneste artikler</h2>

        {articles.length === 0 ? (
          <p className="text-muted-foreground text-body-sm">Første artikel er på vej.</p>
        ) : (
          <ul className="divide-y divide-border">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block py-7"
                  data-testid={`card-article-${article.slug}`}
                >
                  <p className="text-body-sm text-muted-foreground mb-2">
                    {article.category} · {formatDate(article.publishedAt)} · {article.readingTime} min læsning
                  </p>
                  <h3 className="mb-2 group-hover:underline underline-offset-4">
                    {article.title}
                  </h3>
                  <p className="text-body text-foreground">
                    {article.description}
                  </p>
                  <p className="mt-3 text-body-sm font-semibold text-primary group-hover:underline">
                    Læs artiklen →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Nyhedsbrev */}
      <section className="max-w-(--container-max) mx-auto px-4 sm:px-6 py-12 pb-20">
        <NewsletterForm source="blog-index" />
      </section>

      <SiteFooter />
    </div>
  )
}
