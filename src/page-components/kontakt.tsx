import { ContactForm } from "@/components/public/ContactForm";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { Section, SectionHead } from "@/components/ds/Section";
import { CardGrid } from "@/components/ds/Card";
import { StepCard } from "@/components/ds/StepCard";
import { CONTACT_COPY, type ContactCopy } from "@/content/copy/contact";

// All copy lives in src/content/copy/contact.ts (pageKey "page.contact");
// app/kontakt/page.tsx passes the CMS-merged result. A server component: only
// the form needs a hook, so only ContactForm is "use client".
export default function Kontakt({ copy = CONTACT_COPY }: { copy?: ContactCopy }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="max-w-(--container-max) mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <header className="mb-14">
          <h1 className="mb-6 max-w-3xl text-balance" data-testid="text-kontakt-title">
            {copy.hero.title}
          </h1>
          <p className="text-lead text-foreground max-w-(--measure-body)">
            {copy.hero.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="mb-6 text-h3">{copy.form.title}</h2>
            <ContactForm submitLabel={copy.form.submitLabel} />
          </div>

          <div>
            <h2 className="mb-6 text-h3">{copy.info.title}</h2>
            <a
              href={`tel:${copy.info.phone.replace(/\s+/g, "")}`}
              className="mb-8 block rounded-lg border border-border bg-card p-6 shadow-soft hover:border-border-strong transition-colors"
              data-testid="link-call"
            >
              <span className="block text-body-sm text-muted-foreground mb-1">Hellere tale sammen? Ring direkte</span>
              <span className="block font-display text-2xl font-medium text-primary">{copy.info.phone}</span>
            </a>
            <dl className="space-y-6 text-body">
              <div>
                <dt className="font-semibold text-primary mb-1">Email</dt>
                <dd>
                  <a href={`mailto:${copy.info.email}`} className="text-primary hover:underline break-all">
                    {copy.info.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary mb-1">Telefon</dt>
                <dd>
                  <a href={`tel:${copy.info.phone.replace(/\s+/g, "")}`} className="text-foreground hover:text-primary">
                    {copy.info.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-primary mb-1">Adresse</dt>
                <dd className="text-foreground">{copy.info.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary mb-1">Åbningstider</dt>
                <dd className="text-foreground">
                  {copy.info.hoursWeekdays}
                  <br />
                  {copy.info.hoursWeekend}
                </dd>
              </div>
            </dl>
            <p className="mt-10 text-body-sm text-muted-foreground">
              Vil du bare følge med?{" "}
              <a href="/nyhedsbrev" className="text-primary font-semibold hover:underline">
                Tilmeld dig nyhedsbrevet
              </a>
            </p>
          </div>
        </div>
      </article>

      {copy.next && copy.next.items.length > 0 && (
        <Section tone="band" id="naeste">
          <SectionHead title={copy.next.title} />
          <CardGrid>
            {copy.next.items.slice(0, 3).map((item, i) => (
              <StepCard key={item.title} n={i + 1} title={item.title} body={item.body} />
            ))}
          </CardGrid>
        </Section>
      )}

      <SiteFooter />
    </div>
  );
}
