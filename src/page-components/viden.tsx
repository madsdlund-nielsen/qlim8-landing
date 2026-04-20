import Link from 'next/link'
import { Leaf, BookOpen, TrendingUp, Plug, Coins, ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'
import { articles } from '@/content/articles'
import { categoryMeta } from '@/content/article'

const topics = [
  {
    Icon: BookOpen,
    title: 'CSRD & VSME',
    description:
      'Hvad kræver de nye EU-regler egentlig? Vi forklarer standarderne i et sprog, der giver mening for en dansk SMV.',
  },
  {
    Icon: TrendingUp,
    title: 'Scope 1, 2 & 3',
    description:
      'Fra direkte emissioner til leverandørkæden — vi guider dig igennem GHG-protokollen trin for trin.',
  },
  {
    Icon: Plug,
    title: 'Integrationer',
    description:
      'Automatiser dataindsamlingen via e-conomic og andre systemer du allerede bruger i hverdagen.',
  },
  {
    Icon: Coins,
    title: 'Tilskud & økonomi',
    description:
      'Overblik over SMV:Grøn, CO2-puljen og andre støttemuligheder til grøn omstilling for din virksomhed.',
  },
]

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso))
}

export default function Viden() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SiteHeader />

      {/* ── Hero ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
          <Leaf className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
            Viden &amp; indsigt
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight" data-testid="text-viden-title">
          Klimaregnskab og ESG{' '}
          <span className="block sm:inline">— forklaret enkelt</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Vi deler vores viden om klimaregnskab, CSRD-compliance og bæredygtighed for
          danske virksomheder. Konkrete guides og opdateringer — uden konsulentjargon.
        </p>
      </section>

      {/* ── Emner ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center">
          Vi skriver om
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map(({ Icon, title, description }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                <Icon className="h-[18px] w-[18px] text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Artikler ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Seneste artikler</h2>

        {articles.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-400 text-sm">Første artikel er på vej.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => {
              const cat = categoryMeta[article.category]
              return (
                <Link
                  key={article.slug}
                  href={`/viden/${article.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col"
                  data-testid={`card-article-${article.slug}`}
                >
                  <span
                    className={`self-start px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded mb-3 ${cat.bg} ${cat.text}`}
                  >
                    {article.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium group-hover:gap-2 transition-all">
                      Læs <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Nyhedsbrev ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <NewsletterForm />
      </section>

      <SiteFooter />
    </div>
  )
}
