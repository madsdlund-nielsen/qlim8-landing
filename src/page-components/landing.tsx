// The homepage in the green design. A server component: the interactive part
// is the newsletter dialog, a client component of its own; the FAQ is native
// <details> (the answers are in the HTML), and every block is a design-system
// component (src/components/ds).
//
// Order: hero, integrations, the people who read the report (optional), trust,
// steps, themes, the package teaser from the packages API, the human contact,
// FAQ, closing. The package teaser keeps its behaviour and the self-serve
// switch exactly: sales-led (catalog v1, or the API unreachable) it shows the
// curated plans behind Book demo, no price; self-serve it shows the company
// packages from the API with their prices and buttons.
import * as React from "react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { NewsletterSignupDialog } from "@/components/public/NewsletterSignupDialog";
import { Section, SectionHead, type SectionTone } from "@/components/ds/Section";
import { Hero } from "@/components/ds/Hero";
import { buttonStyles } from "@/components/ds/Button";
import { Card, CardGrid } from "@/components/ds/Card";
import { TrustCard } from "@/components/ds/TrustCard";
import { StepCard } from "@/components/ds/StepCard";
import { IntegrationRow } from "@/components/ds/IntegrationRow";
import { Quote } from "@/components/ds/Quote";
import { ContactBox } from "@/components/ds/ContactBox";
import { ClosingCta } from "@/components/ds/ClosingCta";
import { Faq } from "@/components/ds/Faq";
import { Photo } from "@/components/ds/Photo";
import { HOMEPAGE_FAQS, type HomepageFaq } from "@/content/homepage-faqs";
import { HOME_COPY, type HomeCopy, type HomePlan } from "@/content/copy/home";
import { DEMO_HREF, DEMO_LABEL } from "@/content/cta";
import { ctaLabel, isSelfServe, packageFeatures, priceLines, trialLine, type PublicPackage, type PublicPackages } from "@/lib/packageView";
import { cn } from "@/lib/utils";

// All copy lives in src/content/copy/home.ts (pageKey "page.home");
// app/page.tsx passes the CMS-merged result. `faqs` defaults to the bundled
// list (pageKey "homepage.faqs"); marketing images are CMS-overridable
// (pageKey "landing.images"): the hero photo, and one image for each of the
// three theme teasers. With no image a section renders without one: there is
// no placeholder box.
export interface LandingImages {
  hero?: string;
  features?: (string | undefined)[]; // by copy.themes.items order
}

/**
 * The company packages for the teaser once the catalog sells something by
 * itself, in the catalog's order. A curated plan in the page copy with the
 * same name keeps its badge and tagline (CMS-editable, as on /priser); the
 * price, the button and the list come from the packages API (packageFeatures).
 */
function teaserPackages(data: PublicPackages, plans: HomePlan[]): { pkg: PublicPackage; plan?: HomePlan }[] {
  const byName = new Map(plans.map((p) => [p.name.trim().toLowerCase(), p]));
  return data.packages
    .filter((p) => p.accountType === "company")
    .sort((a, b) => a.displayRank - b.displayRank)
    .map((pkg) => ({ pkg, plan: byName.get(pkg.key) ?? byName.get(pkg.name.trim().toLowerCase()) }));
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 leading-relaxed">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-sage" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function PricingTeaser({ copy, packages }: { copy: HomeCopy["pricingTeaser"]; packages: PublicPackages | null }) {
  const selfServe = isSelfServe(packages);
  const cardBase = "relative flex flex-col rounded-lg border bg-card p-6 shadow-soft md:p-8";
  return (
    <>
      <SectionHead title={selfServe ? copy.title : copy.salesLedTitle} lead={selfServe ? copy.lead || undefined : undefined} />
      {selfServe && copy.points.length > 0 && (
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {copy.points.map((pt) => (
            <Card key={pt.title} className="flex flex-col gap-3">
              <h3>{pt.title}</h3>
              <p className="text-body-sm text-muted-foreground">{pt.body}</p>
            </Card>
          ))}
        </div>
      )}
      {selfServe ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" data-testid="pricing-teaser-packages">
          {teaserPackages(packages!, copy.plans).map(({ pkg, plan }) => {
            const price = priceLines(pkg);
            const { label: includedLabel, items: features } = packageFeatures(packages!, pkg, plan?.features);
            const demo = pkg.cta.kind === "demo" || !pkg.cta.url;
            const highlighted = plan?.highlighted ?? false;
            return (
              <div key={pkg.key} className={cn(cardBase, highlighted ? "border-border-strong" : "border-border")} data-testid={`teaser-${pkg.key}`}>
                {plan?.badge && <p className="mb-3 text-trust font-semibold text-sage">{plan.badge}</p>}
                <h3 className="mb-2">{pkg.name}</h3>
                {price ? (
                  <div className="mb-4">
                    <p className="text-lead font-semibold text-foreground">{price.main}</p>
                    {price.note && <p className="mt-1 text-trust text-muted-foreground">{price.note}</p>}
                    {trialLine(pkg) && <p className="mt-2 text-trust font-semibold text-sage">{trialLine(pkg)}</p>}
                  </div>
                ) : (
                  <p className="mb-4 text-body-sm font-semibold text-muted-foreground">Pris efter en samtale</p>
                )}
                <p className="mb-6 whitespace-pre-line text-body-sm text-muted-foreground">{plan?.tag ?? pkg.tagline ?? pkg.audience}</p>
                {includedLabel && <p className="mb-2 text-body-sm font-semibold text-foreground">{includedLabel}:</p>}
                <ul className="m-0 mb-8 flex-1 list-none space-y-2 p-0 text-body-sm text-foreground">
                  {features.map((feat) => (
                    <Bullet key={feat}>{feat}</Bullet>
                  ))}
                </ul>
                <a
                  href={demo ? DEMO_HREF : pkg.cta.url!}
                  className={buttonStyles({ variant: demo ? "secondary" : "primary", full: true })}
                  data-testid={`button-${pkg.cta.kind}-teaser-${pkg.key}`}
                >
                  {demo ? DEMO_LABEL : ctaLabel(pkg)}
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {copy.plans.map((p) => (
            <div key={p.name} className={cn(cardBase, p.highlighted ? "border-border-strong" : "border-border")}>
              {p.badge && <p className="mb-3 text-trust font-semibold text-sage">{p.badge}</p>}
              <h3 className="mb-4">{p.name}</h3>
              <p className="mb-6 min-h-16 text-body-sm text-muted-foreground">{p.tag}</p>
              <ul className="m-0 mb-8 flex-1 list-none space-y-2 p-0 text-body-sm text-foreground">
                {p.features.map((feat) => (
                  <Bullet key={feat}>{feat}</Bullet>
                ))}
              </ul>
              <a href={DEMO_HREF} className={buttonStyles({ variant: p.highlighted ? "primary" : "secondary", full: true })}>
                {DEMO_LABEL}
              </a>
            </div>
          ))}
        </div>
      )}
      <p className="mt-10 text-body-sm">
        <a href="/priser" className="font-semibold text-sage underline underline-offset-4 hover:text-primary">
          {copy.linkLabel}
        </a>
      </p>
    </>
  );
}

export default async function Landing({
  copy = HOME_COPY,
  faqs = HOMEPAGE_FAQS,
  images = {},
  packages = null,
}: {
  copy?: HomeCopy;
  faqs?: HomepageFaq[];
  images?: LandingImages;
  packages?: PublicPackages | null;
}) {
  const hero = copy.hero;
  // The surfaces alternate down the page, band first (the hero is on the page).
  let band = true;
  const next = (): SectionTone => {
    const t: SectionTone = band ? "band" : "background";
    band = !band;
    return t;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader isHome />
      <main>
        {/* 1. Hero */}
        <Section size="hero" className="pt-10 md:pt-section">
          <Hero
            title={hero.title}
            lead={hero.subtitle}
            primary={hero.primaryCta}
            secondary={hero.secondaryCta}
            trustLine={hero.trustLine}
            microLine={hero.microLine}
            image={images.hero ? { src: images.hero, alt: hero.imageAlt } : undefined}
          />
        </Section>

        {/* 2. Integrationer */}
        <Section tone={next()} id="integrationer">
          <h2 className="mb-6 max-w-3xl text-balance">{copy.integrations.title}</h2>
          <div className="mb-10 grid max-w-(--measure-body) gap-4">
            {copy.integrations.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <IntegrationRow footnote={copy.integrations.footnote} />
        </Section>

        {/* 3. Dem, der skal læse regnskabet (først når teksten er faktatjekket) */}
        {copy.recipients && copy.recipients.items.length > 0 && (
          <Section tone={next()} id="modtagere">
            <SectionHead title={copy.recipients.title} lead={copy.recipients.intro} />
            <CardGrid>
              {copy.recipients.items.map((t) => (
                <TrustCard key={t.title} icon={t.icon} title={t.title} body={t.body} />
              ))}
            </CardGrid>
          </Section>
        )}

        {/* 4. Dokumentation og tillid */}
        {(() => {
          const tone = next();
          return (
            <Section tone={tone} id="tillid">
              <h2 className="mb-6 max-w-3xl text-balance">{copy.trust.title}</h2>
              {copy.trust.paragraphs.length > 0 && (
                <div className="mb-10 grid max-w-(--measure-body) gap-4 md:mb-12">
                  {copy.trust.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              )}
              <CardGrid>
                {copy.trust.items.map((t) => (
                  <TrustCard key={t.title} icon={t.icon} title={t.title} body={t.body} onBand={tone === "band"} />
                ))}
              </CardGrid>
            </Section>
          );
        })()}

        {/* 5. Proces */}
        <Section tone={next()} id="proces">
          <SectionHead title={copy.steps.title} />
          <CardGrid>
            {copy.steps.items.slice(0, 3).map((s, i) => (
              <StepCard key={s.title} n={i + 1} title={s.title} body={s.body} />
            ))}
          </CardGrid>
        </Section>

        {/* 6. Temaer */}
        <Section tone={next()} id="temaer">
          <SectionHead title={copy.themes.title} lead={copy.themes.intro || undefined} />
          <CardGrid>
            {copy.themes.items.map((t, i) => {
              const img = images.features?.[i];
              return (
                <Card key={t.title} className="flex flex-col gap-4">
                  {img && <Photo src={img} alt={t.title} sizes="(min-width: 1024px) 340px, 100vw" />}
                  <h3>{t.title}</h3>
                  <p className="flex-1 text-body-sm text-muted-foreground">{t.body}</p>
                  <a href={t.href} className="text-body-sm font-semibold text-sage underline underline-offset-4 hover:text-primary">
                    {t.linkLabel}
                  </a>
                </Card>
              );
            })}
          </CardGrid>
        </Section>

        {/* 7. Pakker, fra API'et */}
        <Section tone={next()} id="pakker">
          <PricingTeaser copy={copy.pricingTeaser} packages={packages} />
        </Section>

        {/* 8. Menneskelig kontakt */}
        <Section tone={next()} id="kontakt">
          <h2 className="mb-10 max-w-3xl text-balance md:mb-12">{copy.human.title}</h2>
          <ContactBox contact={copy.human.contact}>
            <Quote quote={copy.human.quote} name={copy.human.quoteName} role={copy.human.quoteRole} />
          </ContactBox>
        </Section>

        {/* 9. FAQ, i HTML'en som <details> */}
        <Section tone={next()} id="faq">
          <SectionHead title={copy.faq.title} />
          <Faq items={faqs} openFirst />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="/kontakt" className="text-body-sm font-semibold text-sage underline underline-offset-4 hover:text-primary">
              {copy.faq.linkLabel}
            </a>
            {/* One NewsletterSignupDialog on the page: it opens itself on ?nyhedsbrev=1. */}
            <NewsletterSignupDialog />
          </div>
        </Section>

        {/* 10. Afslutning */}
        <ClosingCta
          title={copy.finalCta.title}
          description={copy.finalCta.body}
          primary={copy.finalCta.primary}
          secondary={copy.finalCta.secondary}
          trustLine={copy.finalCta.trustLine}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
