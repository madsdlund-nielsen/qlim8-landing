import Link from 'next/link'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import type { Article, ArticleSection } from '@/content/article'

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
        <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8 border-l-2 border-gray-300 pl-5">
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
    case 'h4':
      return (
        <h4 className="text-base font-semibold text-gray-800 mt-6 mb-2">
          {section.text}
        </h4>
      )
    case 'paragraph':
      return (
        <p className="text-gray-700 leading-relaxed mb-5 text-[17px]">
          {section.text}
        </p>
      )
    case 'list':
      return (
        <ul className="space-y-2 my-5 text-gray-700 text-[17px]">
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed">— {item}</li>
          ))}
        </ul>
      )
    case 'ordered-list':
      return (
        <ol className="space-y-2 my-5 list-decimal list-inside text-gray-700 text-[17px]">
          {section.items.map((item, i) => (
            <li key={i} className="leading-relaxed pl-1">{item}</li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <div className="my-8 p-5 border-l-2 border-gray-300 bg-gray-50 text-[15px] text-gray-800 leading-relaxed">
          {section.text}
        </div>
      )
    case 'cta':
      return (
        <div className="my-10 p-7 bg-gray-900 rounded-2xl">
          <p className="text-white font-bold text-lg mb-2">{section.heading}</p>
          <p className="text-gray-300 text-sm mb-5 max-w-xl">{section.text}</p>
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
          {article.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
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
