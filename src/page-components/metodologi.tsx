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
    <section className="border-t border-border pt-10 sm:pt-14">
      <p className="text-body-sm font-semibold text-muted-foreground mb-2">
        {number}
      </p>
      <h2 className="mb-6">
        {title}
      </h2>
      <div className="space-y-5 text-foreground text-body">
        {children}
      </div>
    </section>
  );
}

function Callout({ callout }: { callout: MethodologyCallout }) {
  return (
    <div className="border-l-2 border-sage pl-5 py-1 mt-2">
      <p className="font-semibold text-primary mb-1">{callout.title}</p>
      <p className="text-foreground">{callout.body}</p>
    </div>
  );
}

// All copy lives in src/content/copy/methodology.ts (pageKey
// "page.methodology"); app/metodologi/page.tsx passes the CMS-merged result.
export default function Metodologi({ copy = METHODOLOGY_COPY }: { copy?: MethodologyCopy }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero / Lead */}
      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-balance">
            {copy.hero.title}
          </h1>
          <p className="text-lead text-foreground mb-8">
            {copy.hero.subtitle}
          </p>
          <p className="text-foreground text-body">
            {copy.hero.intro}
          </p>
        </div>
      </section>

      {/* Pull-quote 1 */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto">
          <blockquote className="font-display text-2xl sm:text-4xl font-medium leading-[1.2] text-primary-foreground">
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
            <p className="text-body-sm text-muted-foreground">
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
                  <dt className="font-semibold text-primary">
                    {s.name}
                    {s.danish && <span className="ml-2 text-body-sm font-normal text-muted-foreground">{copy.factors.danishPriorityLabel}</span>}
                  </dt>
                  <dd className="text-foreground mt-1">{s.note}</dd>
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
              <p className="font-semibold text-primary mb-3">{copy.auditTrail.containsLabel}</p>
              <ul className="space-y-1 text-foreground">
                {copy.auditTrail.contains.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-3 h-1 w-2.5 shrink-0 bg-sage" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Callout callout={copy.auditTrail.callout} />
          </Section>
        </div>
      </section>

      {/* Pull-quote 2 */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto">
          <blockquote className="font-display text-xl sm:text-3xl font-medium leading-[1.3] text-primary-foreground">
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
                <div key={q.points} className="flex flex-col sm:flex-row sm:gap-6 border-b border-border pb-3 last:border-b-0">
                  <dt className="font-semibold text-primary sm:w-24 sm:flex-shrink-0">{q.points}</dt>
                  <dd className="text-foreground">{q.text}</dd>
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
                  <dt className="font-semibold text-primary">{s.name}</dt>
                  <dd className="text-foreground mt-1">{s.body}</dd>
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

          <Section number="9" title={copy.forecast.title}>
            {copy.forecast.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section number="10" title={copy.notDoing.title}>
            <p>{copy.notDoing.intro}</p>
            <dl className="space-y-5 mt-2">
              {copy.notDoing.items.map((item) => (
                <div key={item.title}>
                  <dt className="font-semibold text-primary mb-1">{item.title}</dt>
                  <dd className="text-foreground">{item.body}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Afslutning */}
          <section className="border-t border-border pt-10 sm:pt-14">
            <h2 className="mb-4">
              {copy.outro.title}
            </h2>
            <p className="text-foreground text-body mb-7 max-w-(--measure-body)">
              {copy.outro.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-body-sm">
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
