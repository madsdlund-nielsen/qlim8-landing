import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { METHODOLOGY_COPY, type MethodologyCopy, type MethodologyCallout } from "@/content/copy/methodology";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-gray-200 pt-10 sm:pt-14">
      <p className="text-sm font-semibold text-gray-500 mb-2">
        {number}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Callout({ callout }: { callout: MethodologyCallout }) {
  return (
    <div className="border-l-2 border-gray-300 pl-5 py-1 mt-2">
      <p className="font-bold text-gray-900 mb-1">{callout.title}</p>
      <p className="text-gray-700">{callout.body}</p>
    </div>
  );
}

// All copy lives in src/content/copy/methodology.ts (pageKey
// "page.methodology"); app/metodologi/page.tsx passes the CMS-merged result.
export default function Metodologi({ copy = METHODOLOGY_COPY }: { copy?: MethodologyCopy }) {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero / Lead */}
      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            {copy.hero.subtitle}
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {copy.hero.intro}
          </p>
        </div>
      </section>

      {/* Pull-quote 1 */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-2xl sm:text-4xl font-bold leading-[1.2] tracking-tight text-white">
            {copy.quote1}
          </blockquote>
        </div>
      </section>

      {/* Sektioner */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="1" title={copy.dataSources.title}>
            {copy.dataSources.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section number="2" title={copy.categorization.title}>
            {copy.categorization.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Callout callout={copy.categorization.callout} />
            <p className="text-sm text-gray-600">
              {copy.categorization.antiCheatNote}
            </p>
          </Section>

          <Section number="3" title={copy.factors.title}>
            {copy.factors.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <dl className="space-y-4 mt-2">
              {copy.factors.sources.map((s) => (
                <div key={s.name}>
                  <dt className="font-semibold text-gray-900">
                    {s.name}
                    {s.danish && <span className="ml-2 text-sm font-normal text-gray-500">{copy.factors.danishPriorityLabel}</span>}
                  </dt>
                  <dd className="text-gray-700 mt-1">{s.note}</dd>
                </div>
              ))}
            </dl>
            <Callout callout={copy.factors.callout} />
          </Section>

          <Section number="4" title={copy.calculation.title}>
            {copy.calculation.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section number="5" title={copy.auditTrail.title}>
            {copy.auditTrail.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="mt-2">
              <p className="font-semibold text-gray-900 mb-3">{copy.auditTrail.containsLabel}</p>
              <ul className="space-y-1 text-gray-700">
                {copy.auditTrail.contains.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
            <Callout callout={copy.auditTrail.callout} />
          </Section>
        </div>
      </section>

      {/* Pull-quote 2 */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl sm:text-3xl font-bold leading-[1.3] tracking-tight text-white">
            {copy.quote2}
          </blockquote>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="6" title={copy.dataQuality.title}>
            <p>{copy.dataQuality.intro}</p>
            <p>{copy.dataQuality.pointsIntro}</p>
            <dl className="space-y-2 mt-2">
              {copy.dataQuality.points.map((q) => (
                <div key={q.points} className="flex flex-col sm:flex-row sm:gap-6 border-b border-gray-200 pb-3 last:border-b-0">
                  <dt className="font-bold text-gray-900 sm:w-24 sm:flex-shrink-0">{q.points}</dt>
                  <dd className="text-gray-700">{q.text}</dd>
                </div>
              ))}
            </dl>
            {copy.dataQuality.paragraphsAfter.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section number="7" title={copy.standards.title}>
            <p>{copy.standards.intro}</p>
            <dl className="space-y-4 mt-2">
              {copy.standards.items.map((s) => (
                <div key={s.name}>
                  <dt className="font-semibold text-gray-900">{s.name}</dt>
                  <dd className="text-gray-700 mt-1">{s.body}</dd>
                </div>
              ))}
            </dl>
            <Callout callout={copy.standards.callout} />
          </Section>

          <Section number="8" title={copy.updates.title}>
            {copy.updates.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section number="9" title={copy.notDoing.title}>
            <p>{copy.notDoing.intro}</p>
            <dl className="space-y-5 mt-2">
              {copy.notDoing.items.map((item) => (
                <div key={item.title}>
                  <dt className="font-bold text-gray-900 mb-1">{item.title}</dt>
                  <dd className="text-gray-700">{item.body}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Afslutning */}
          <section className="border-t border-gray-200 pt-10 sm:pt-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-gray-900">
              {copy.outro.title}
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-7 max-w-2xl">
              {copy.outro.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a href="/kontakt" className="text-primary font-semibold hover:underline">
                {copy.outro.linkContact}
              </a>
              <a href="/docs" className="text-primary font-semibold hover:underline">
                {copy.outro.linkDocs}
              </a>
              <a href="/" className="text-primary font-semibold hover:underline">
                {copy.outro.linkHome}
              </a>
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
