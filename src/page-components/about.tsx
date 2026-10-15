import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ds/Button";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ABOUT_COPY, type AboutCopy } from "@/content/copy/about";

// All copy lives in src/content/copy/about.ts (pageKey "page.about");
// app/om-os/page.tsx passes the CMS-merged result. `founderImage` is
// CMS-overridable (pageKey "about.images", key "founder") and defaults to
// the bundled public asset.
export default function About({
  copy = ABOUT_COPY,
  founderImage = "/branding/founder-mugshot.png",
}: {
  copy?: AboutCopy;
  founderImage?: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-24 sm:pb-28">
        <header className="mb-14">
          <h1 className="mb-6 text-balance">
            {copy.hero.title}
          </h1>
          <p className="text-lead text-foreground">
            {copy.hero.subtitle}
          </p>
        </header>

        <section className="border-t border-border pt-10 mb-14">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-border bg-card">
              <img
                src={founderImage}
                alt={copy.founder.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="mb-1 text-h3">
                {copy.founder.title}
              </h2>
              <p className="text-body-sm text-muted-foreground mb-3">{copy.founder.role}</p>
              <p className="text-foreground text-body">
                {copy.founder.body}
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-10 mb-14">
          <h2 className="mb-8">
            {copy.beliefs.title}
          </h2>
          <dl className="space-y-7">
            {copy.beliefs.items.map((belief) => (
              <div key={belief.title}>
                <dt className="font-semibold text-primary mb-1">{belief.title}</dt>
                <dd className="text-foreground text-body">
                  {belief.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-primary text-primary-foreground rounded-lg p-7 sm:p-10 mb-14">
          <h2 className="mb-6 text-h3 text-primary-foreground">
            {copy.company.title}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-body-sm">
            <div>
              <dt className="text-sand mb-0.5">{copy.company.cvrLabel}</dt>
              <dd className="text-primary-foreground">{copy.company.cvr}</dd>
            </div>
            <div>
              <dt className="text-sand mb-0.5">{copy.company.foundedLabel}</dt>
              <dd className="text-primary-foreground">{copy.company.founded}</dd>
            </div>
            <div>
              <dt className="text-sand mb-0.5">{copy.company.hostingLabel}</dt>
              <dd className="text-primary-foreground">{copy.company.hosting}</dd>
            </div>
            <div>
              <dt className="text-sand mb-0.5">{copy.company.contactLabel}</dt>
              <dd>
                <a href={`mailto:${copy.company.contactEmail}`} className="text-primary-foreground underline-offset-4 hover:underline">
                  {copy.company.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="mb-3">
            {copy.outro.title}
          </h2>
          <p className="text-foreground text-body mb-7 max-w-(--measure-body)">
            {copy.outro.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/priser">
              {copy.outro.ctaPrimary}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button href={`mailto:${copy.company.contactEmail}`} variant="outline">
              {copy.outro.ctaSecondary}
            </Button>
          </div>
        </section>
      </article>

      <SiteFooter />

      <MobileStickyCTA
        text={copy.outro.ctaPrimary}
        href="/priser"
        showAfterScroll={300}
      />
    </div>
  );
}
