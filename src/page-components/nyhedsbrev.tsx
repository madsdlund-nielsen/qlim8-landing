import Link from 'next/link'
import { SiteHeader } from '@/components/public/SiteHeader'
import { SiteFooter } from '@/components/public/SiteFooter'
import { NewsletterForm } from '@/components/public/NewsletterForm'

const HIGHLIGHTS = [
  'Guides til klimaregnskab, scope 1-3, VSME og L193, skrevet i almindeligt dansk.',
  'Hvad banker, kunder og revisorer faktisk spørger om, og hvordan du svarer.',
  'Nye artikler og produktudgivelser, når de er der. Ikke oftere.',
]

// Standalone signup page: the destination for links we place outside the site
// (LinkedIn buttons, email signatures, slides). Every embedded form elsewhere
// lives inside another page; this one exists to be linked to directly.
export default function Nyhedsbrev() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-10">
        <h1
          className="mb-5 text-balance"
          data-testid="text-newsletter-title"
        >
          ESG-viden i indbakken, uden konsulentjargon
        </h1>
        <p className="text-lead text-foreground">
          Tilmeld dig qlim8s nyhedsbrev og få konkrete guides til klimaregnskab,
          compliance og bæredygtighed for danske SMV&apos;er.
        </p>

        <ul className="mt-8 space-y-3">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="flex gap-3 text-body text-foreground">
              <span aria-hidden="true" className="mt-3 h-1 w-2.5 shrink-0 bg-sage" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <NewsletterForm
          source="nyhedsbrev-side"
          heading="Tilmeld nyhedsbrevet"
          description="Ingen spam, og du kan afmelde med ét klik fra bunden af enhver mail."
        />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        <p className="text-body-sm text-muted-foreground">
          Vi bruger kun din email til nyhedsbrevet. Læs hvordan vi behandler dine
          oplysninger i vores{' '}
          <Link href="/privatlivspolitik" className="text-primary hover:underline">
            privatlivspolitik
          </Link>
          . Vil du læse med først? Se{' '}
          <Link href="/blog" className="text-primary hover:underline">
            alle artikler
          </Link>
          .
        </p>
      </section>

      <SiteFooter />
    </div>
  )
}
