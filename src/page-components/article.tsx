import Link from 'next/link'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import { Button } from '@/components/ds/Button'
import { ArticleSections } from '@/components/public/ArticleSections'
import type { Article } from '@/content/article'
import { DEMO_HREF, DEMO_LABEL, PHONE_DISPLAY, PHONE_HREF } from '@/content/cta'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

export default function ArticleTemplate({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-24">
        <Link
          href="/blog"
          className="text-body-sm text-muted-foreground hover:text-primary transition-colors mb-10 inline-block"
          data-testid="link-back-to-viden"
        >
          ← Alle artikler
        </Link>

        <header className="mb-12 sm:mb-14">
          <p className="text-body-sm text-muted-foreground mb-3">
            {article.category} · {formatDate(article.publishedAt)} · {article.readingTime} min læsning
          </p>
          <h1
            className="mb-5 text-balance"
            data-testid="text-article-title"
          >
            {article.title}
          </h1>
          <p className="text-lead text-foreground">
            {article.description}
          </p>
        </header>

        <article className="border-t border-border pt-10">
          <ArticleSections sections={article.sections} />
        </article>

        <div className="mt-14 rounded-lg bg-primary p-7 text-primary-foreground">
          <p className="mb-2 font-display text-h3 text-primary-foreground">Klar til at komme i gang?</p>
          <p className="mb-5 max-w-xl text-body-sm text-primary-foreground">
            qlim8 gør klimaregnskabet automatisk. Book en demo, så viser vi platformen med udgangspunkt i din virksomhed.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {/* A full page load, like every other demo CTA: ContactForm reads
                ?emne=demo from the URL once, when it mounts. */}
            <Button href={DEMO_HREF} variant="inverted">
              {DEMO_LABEL}
            </Button>
            <a
              href={PHONE_HREF}
              className="text-body-sm text-primary-foreground underline-offset-4 hover:underline"
            >
              Eller ring {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="mt-10">
          <NewsletterForm source="artikel" />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
