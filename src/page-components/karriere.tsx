import { Button } from "@/components/ds/Button";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CAREERS_COPY, type CareersCopy } from "@/content/copy/careers";

// All copy lives in src/content/copy/careers.ts (pageKey "page.careers");
// app/karriere/page.tsx passes the CMS-merged result.
export default function Karriere({ copy = CAREERS_COPY }: { copy?: CareersCopy }) {
  const openPositions = copy.openPositions;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <header className="mb-12">
          <h1 className="mb-6" data-testid="text-karriere-title">
            {copy.hero.title}
          </h1>
          <p className="text-lead text-foreground">
            {copy.hero.subtitle}
          </p>
        </header>

        {openPositions.length === 0 && (
          <section className="border-t border-border pt-10 mb-12">
            <p className="text-body text-foreground">
              {copy.noOpenings}
            </p>
          </section>
        )}

        {openPositions.length > 0 && (
          <section className="border-t border-border pt-10 mb-12">
            <h2 className="mb-6">{copy.openPositionsTitle}</h2>
            <ul className="divide-y divide-border">
              {openPositions.map((position, index) => (
                <li
                  key={index}
                  className="py-6"
                  data-testid={`card-position-${index}`}
                >
                  <h3 className="mb-1">{position.title}</h3>
                  <p className="text-body-sm text-muted-foreground mb-2">{position.department}</p>
                  <p className="text-body-sm text-muted-foreground">
                    {position.location} · {position.type}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-border pt-10">
          <h2 className="mb-3">
            {copy.unsolicited.title}
          </h2>
          <p className="text-foreground text-body mb-6 max-w-(--measure-body)">
            {copy.unsolicited.body}
          </p>
          <Button href={`mailto:${copy.unsolicited.email}`} data-testid="button-apply">
            {copy.unsolicited.buttonLabel}
          </Button>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
