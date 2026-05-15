import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import { categoryMeta, type Article, type ArticleSection } from '@/content/article'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

function Section({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'lead':
      return (
        <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8 border-l-4 border-primary pl-5">
          {section.text}
        </p>
      )
    case 'h2':
      return (
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
          {section.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
          {section.text}
        </h3>
      )
    case 'paragraph':
      return (
        <p className="text-gray-700 leading-relaxed mb-5 text-[17px]">
          {section.text}
        </p>
      )
    case 'list':
      return (
        <ul className="space-y-2 my-5">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-[17px]">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ordered-list':
      return (
        <ol className="space-y-3 my-5">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-[17px]">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case 'h4':
      return (
        <h4 className="text-base font-semibold text-gray-800 mt-6 mb-2">
          {section.text}
        </h4>
      )
    case 'callout':
      return (
        <div className="my-8 p-5 bg-accent border border-accent rounded-xl text-[15px] text-accent-foreground leading-relaxed">
          {section.text}
        </div>
      )
    case 'cta':
      return (
        <div className="my-10 p-7 bg-gray-900 rounded-2xl text-center">
          <p className="text-white font-bold text-lg mb-2">{section.heading}</p>
          <p className="text-gray-400 text-sm mb-5">{section.text}</p>
          <a
            href={section.buttonHref}
            className="inline-block px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-sm transition-colors"
          >
            {section.buttonText}
          </a>
        </div>
      )
    default:
      return null
  }
}

export default function ArticleTemplate({ article }: { article: Article }) {
  const cat = categoryMeta[article.category]

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 pb-24">
        {/* Tilbage-link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
          data-testid="link-back-to-viden"
        >
          <ArrowLeft className="h-4 w-4" />
          Alle artikler
        </Link>

        {/* Artikel-header */}
        <header className="mb-10 sm:mb-14">
          <span
            className={`inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wide rounded mb-5 ${cat.bg} ${cat.text}`}
          >
            {article.category}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-5"
            data-testid="text-article-title"
          >
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-7">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pt-5 border-t border-gray-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} min. læsning
            </span>
          </div>
        </header>

        {/* Artikel-indhold */}
        <article>
          {article.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </article>

        {/* CTA — prøv qlim8 */}
        <div className="mt-14 p-7 bg-gray-900 rounded-2xl text-center">
          <p className="text-white font-bold text-lg mb-2">Klar til at komme i gang?</p>
          <p className="text-gray-400 text-sm mb-5">
            qlim8 gør klimaregnskabet automatisk. Fra 250 kr/md.
          </p>
          <a
            href="https://app.qlim8.com/auth"
            className="inline-block px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full text-sm transition-colors"
          >
            Prøv gratis
          </a>
        </div>

        {/* Nyhedsbrev */}
        <div className="mt-10">
          <NewsletterForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
