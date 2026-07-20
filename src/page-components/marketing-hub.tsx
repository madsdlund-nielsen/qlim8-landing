"use client";
// Shared renderer for the three section hub pages (Kundetyper / Produkt /
// Integrationer). A hero + differentiation intro, an embla carousel of cards
// linking to the collection's featured leaves, differentiators, and a CTA.
import { ArrowRight, Plus } from "lucide-react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CTASection } from "@/components/public/CTASection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { MarketingHubCopy } from "@/content/marketing/types";
import type { NavLeaf } from "@/content/navigation";

function Card({ card }: { card: NavLeaf }) {
  const highlight = card.href.endsWith("/vvs");
  const inner = (
    <div
      className={
        "h-full rounded-2xl border bg-white p-6 transition-colors " +
        (card.comingSoon
          ? "border-gray-100 opacity-70"
          : highlight
            ? "border-primary/40 ring-1 ring-primary/20 hover:border-primary"
            : "border-gray-100 hover:border-primary")
      }
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{card.label}</h3>
        {card.comingSoon ? (
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-primary">
            Kommer snart
          </span>
        ) : (
          <ArrowRight className="h-4 w-4 text-primary shrink-0" />
        )}
      </div>
      {card.blurb && <p className="text-sm text-gray-600 leading-relaxed">{card.blurb}</p>}
    </div>
  );

  if (card.comingSoon) {
    return <div className="h-full">{inner}</div>;
  }
  return (
    <a href={card.href} className="block h-full">
      {inner}
    </a>
  );
}

export default function MarketingHubTemplate({
  copy,
  cards,
}: {
  copy: MarketingHubCopy;
  cards: NavLeaf[];
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-16 sm:pt-20 sm:pb-24 text-center">
          {copy.hero.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              {copy.hero.eyebrow}
            </p>
          )}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 max-w-3xl mx-auto">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            {copy.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={copy.hero.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              {copy.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            {copy.hero.secondaryCta && (
              <a
                href={copy.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                {copy.hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Intro / why we exist */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">{copy.intro.heading}</h2>
          <p className="text-gray-700 text-[17px] leading-relaxed">{copy.intro.body}</p>
        </div>
      </section>

      {/* Cards carousel */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{copy.cardsHeading}</h2>
            {copy.cardsSubheading && (
              <p className="text-gray-600 mt-2">{copy.cardsSubheading}</p>
            )}
          </div>
          <Carousel opts={{ align: "start" }} className="px-1">
            <CarouselContent>
              {cards.map((card) => (
                <CarouselItem key={card.href} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card card={card} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Differentiators */}
      {copy.differentiators.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {copy.differentiators.map((d, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{d.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {copy.faq && copy.faq.items.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">{copy.faq.title}</h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {copy.faq.items.map((f, i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-gray-900 list-none">
                    {f.q}
                    <Plus className="h-5 w-5 text-gray-400 shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={copy.closingCta.title}
        description={copy.closingCta.description}
        primaryButton={{ text: copy.closingCta.primary.label, href: copy.closingCta.primary.href }}
        secondaryButton={
          copy.closingCta.secondary
            ? { text: copy.closingCta.secondary.label, href: copy.closingCta.secondary.href }
            : undefined
        }
        variant="dark"
      />

      <SiteFooter />
    </div>
  );
}
