// Shared renderer for the three section hub pages (Kundetyper / Produkt /
// Integrationer): a hero, the differentiating intro, a grid of cards linking
// to the collection's featured pages, differentiators, trust cards, a contact
// box, the FAQ and the closing section, in the design-system components. A
// server component (the carousel that used to hold the cards is a plain grid:
// every link is in the HTML, and nothing is shipped to the client).
import * as React from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { Section, SectionHead } from "@/components/ds/Section";
import { Hero } from "@/components/ds/Hero";
import { Card, CardGrid } from "@/components/ds/Card";
import { TrustCard } from "@/components/ds/TrustCard";
import { ContactBox } from "@/components/ds/ContactBox";
import { ClosingCta } from "@/components/ds/ClosingCta";
import { Faq } from "@/components/ds/Faq";
import { Paragraphs } from "@/components/ds/Paragraphs";
import type { MarketingHubCopy } from "@/content/marketing/types";
import type { NavLeaf } from "@/content/navigation";
import { cn } from "@/lib/utils";

function HubCard({ card }: { card: NavLeaf }) {
  const inner = (
    <div
      className={cn(
        "h-full rounded-lg border bg-card p-6 shadow-soft transition-colors duration-200",
        card.comingSoon ? "border-border opacity-70" : card.highlight ? "border-border-strong hover:bg-band" : "border-border hover:border-border-strong",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3>{card.label}</h3>
        {card.comingSoon ? (
          <span className="rounded-md bg-sand px-2.5 py-0.5 text-trust font-semibold text-primary">Kommer snart</span>
        ) : (
          <ArrowRight className="h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
        )}
      </div>
      {card.blurb && <p className="text-body-sm text-muted-foreground">{card.blurb}</p>}
    </div>
  );
  if (card.comingSoon) return <div className="h-full">{inner}</div>;
  return (
    <a href={card.href} className="block h-full">
      {inner}
    </a>
  );
}

export default function MarketingHubTemplate({ copy, cards }: { copy: MarketingHubCopy; cards: NavLeaf[] }) {
  const hero = copy.hero;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section size="hero" className="pt-12 md:pt-section">
          <Hero
            eyebrow={hero.eyebrow}
            title={hero.title}
            lead={hero.subtitle}
            primary={hero.primaryCta}
            secondary={hero.secondaryCta}
            trustLine={hero.trustLine}
            image={hero.imageUrl?.trim() ? { src: hero.imageUrl, alt: hero.imageAlt ?? "" } : undefined}
          />
        </Section>

        <Section tone="band">
          <h2 className="mb-5 max-w-3xl text-balance">{copy.intro.heading}</h2>
          <div className="max-w-(--measure-body)">
            <Paragraphs text={copy.intro.body} />
          </div>
        </Section>

        <Section>
          <SectionHead title={copy.cardsHeading} lead={copy.cardsSubheading} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <HubCard key={card.href} card={card} />
            ))}
          </div>
        </Section>

        {copy.options && copy.options.items.length > 0 && (
          <Section>
            <SectionHead title={copy.options.title} lead={copy.options.intro} />
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {copy.options.items.map((o) => (
                <div key={o.title} className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
                  <h3 className="mb-2">{o.title}</h3>
                  <p className="mb-4 text-body-sm text-muted-foreground">{o.body}</p>
                  <ul className="m-0 grid list-none gap-2 p-0 text-body-sm">
                    {o.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {copy.differentiators.length > 0 && (
          <Section tone="band">
            <CardGrid>
              {copy.differentiators.map((d, i) => (
                <Card key={i}>
                  <h3 className="mb-2">{d.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{d.body}</p>
                </Card>
              ))}
            </CardGrid>
          </Section>
        )}

        {copy.trust && copy.trust.items.length > 0 && (
          <Section>
            <SectionHead title={copy.trust.title} />
            <CardGrid>
              {copy.trust.items.map((t) => (
                <TrustCard key={t.title} icon={t.icon} title={t.title} body={t.body} />
              ))}
            </CardGrid>
          </Section>
        )}

        {copy.contact?.title && (
          <Section tone="band">
            <ContactBox contact={copy.contact} />
          </Section>
        )}

        {copy.faq && copy.faq.items.length > 0 && (
          <Section>
            <SectionHead title={copy.faq.title} />
            <Faq items={copy.faq.items} />
          </Section>
        )}

        <ClosingCta
          title={copy.closingCta.title}
          description={copy.closingCta.description}
          primary={copy.closingCta.primary}
          secondary={copy.closingCta.secondary}
          trustLine={copy.closingCta.trustLine}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
