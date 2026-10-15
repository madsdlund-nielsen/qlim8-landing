// The single reusable renderer for every industry / feature / integration leaf
// page. Driven entirely by a MarketingNode + its resolved MarketingPageCopy,
// built from the design-system components in src/components/ds. Blocks render
// in node.sectionOrder when it has one, otherwise in DEFAULT_ORDER, each only
// when it has content, so a page that carries today's blocks (hero, intro,
// painPoints, features, howItWorks, valueStats, faq, related, closingCta)
// renders exactly those. Server component: no client hooks.
import * as React from "react";
import { ArrowRight, Plus } from "lucide-react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ArticleSections } from "@/components/public/ArticleSections";
import { Section, SectionHead, type SectionTone } from "@/components/ds/Section";
import { Hero } from "@/components/ds/Hero";
import { Card, CardGrid } from "@/components/ds/Card";
import { TrustCard } from "@/components/ds/TrustCard";
import { StepCard } from "@/components/ds/StepCard";
import { IntegrationRow } from "@/components/ds/IntegrationRow";
import { Quote } from "@/components/ds/Quote";
import { ContactBox } from "@/components/ds/ContactBox";
import { ClosingCta } from "@/components/ds/ClosingCta";
import { ScopeTable } from "@/components/ds/ScopeTable";
import { NumberedList } from "@/components/ds/NumberedList";
import { CheckList } from "@/components/ds/CheckList";
import { OptionCards } from "@/components/ds/OptionCards";
import { DepthDetails } from "@/components/ds/DepthDetails";
import { Faq } from "@/components/ds/Faq";
import { Paragraphs } from "@/components/ds/Paragraphs";
import type { MarketingNode, MarketingPageCopy, SectionKey } from "@/content/marketing/types";
import { getRelated, getChildren } from "@/content/marketing";
import { buildBreadcrumbTrail } from "@/lib/marketingPage";

export const DEFAULT_ORDER: SectionKey[] = [
  "hero", "reassurance", "intro", "reasons", "painPoints", "table", "features", "howItWorks", "checks", "trust",
  "integrations", "options", "valueStats", "body", "depth", "children", "testimonial", "contact", "faq", "related",
  "closingCta",
];

/** Blocks whose cards need the page surface under them (band cards on a band would vanish). */
const NEEDS_BACKGROUND: SectionKey[] = ["trust"];

export default function MarketingPageTemplate({ node, copy }: { node: MarketingNode; copy: MarketingPageCopy }) {
  const trail = buildBreadcrumbTrail(node);
  const related = getRelated(node);
  const children = getChildren(node.collection, node.slug);
  const comingSoon = node.status === "coming-soon";

  const has = (k: SectionKey): boolean => {
    switch (k) {
      case "hero": return true;
      case "reassurance": return Boolean(copy.reassurance?.body);
      case "intro": return Boolean(copy.intro);
      case "reasons": return Boolean(copy.reasons?.items?.length);
      case "painPoints": return Boolean(copy.painPoints?.length);
      case "table": return Boolean(copy.table?.rows?.length);
      case "features": return Boolean(copy.features?.length);
      case "howItWorks": return Boolean(copy.howItWorks?.steps?.length);
      case "checks": return Boolean(copy.checks?.items?.length);
      case "trust": return Boolean(copy.trust?.items?.length);
      case "integrations": return Boolean(copy.integrations?.title);
      case "options": return Boolean(copy.options?.items?.length);
      case "valueStats": return Boolean(copy.valueStats?.length);
      case "body": return Boolean(node.body?.length);
      case "depth": return Boolean(copy.depth?.items?.length);
      case "children": return children.length > 0;
      case "testimonial": return Boolean(copy.testimonial?.quote);
      case "contact": return Boolean(copy.contact?.title);
      case "faq": return Boolean(copy.faq?.items?.length);
      case "related": return related.length > 0;
      case "closingCta": return true;
    }
  };

  const hero = copy.hero;
  const render = (k: SectionKey, tone: SectionTone): React.ReactNode => {
    switch (k) {
      case "hero":
        return (
          <Section tone={tone} size="hero">
            <Hero
              before={<Breadcrumbs trail={trail} />}
              eyebrow={hero.eyebrow}
              badge={comingSoon ? "Kommer snart" : undefined}
              title={hero.title}
              lead={hero.subtitle}
              primary={hero.primaryCta}
              secondary={hero.secondaryCta}
              trustLine={hero.trustLine}
              microLine={hero.microLine}
              image={hero.imageUrl?.trim() ? { src: hero.imageUrl, alt: hero.imageAlt ?? "" } : undefined}
            />
          </Section>
        );
      case "reassurance":
        return (
          <Section tone={tone}>
            <h2 className="mb-4 max-w-3xl text-balance">{copy.reassurance!.title}</h2>
            <p className="max-w-(--measure-body) text-lead text-foreground">{copy.reassurance!.body}</p>
          </Section>
        );
      case "intro":
        return (
          <Section tone={tone}>
            <h2 className="mb-5 max-w-3xl text-balance">{copy.intro!.heading}</h2>
            <div className="max-w-(--measure-body)">
              <Paragraphs text={copy.intro!.body} />
            </div>
            {copy.intro!.bullets && copy.intro!.bullets.length > 0 && (
              <CheckList className="mt-6" items={copy.intro!.bullets.map((b) => ({ body: b }))} />
            )}
          </Section>
        );
      case "reasons":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.reasons!.title} lead={copy.reasons!.intro} />
            <NumberedList items={copy.reasons!.items} />
          </Section>
        );
      case "painPoints":
        return (
          <Section tone={tone}>
            <SectionHead title="Sådan løser vi dine udfordringer" />
            <CardGrid cols={2}>
              {copy.painPoints!.map((p, i) => (
                <Card key={i}>
                  <p className="mb-2 text-body-sm font-semibold text-muted-foreground">Udfordringen</p>
                  <p className="mb-4">{p.pain}</p>
                  <p className="mb-2 text-body-sm font-semibold text-sage">Sådan hjælper qlim8</p>
                  <p>{p.solution}</p>
                  {p.outcome && <p className="mt-4 border-t border-border pt-3 text-body-sm font-semibold text-foreground">{p.outcome}</p>}
                </Card>
              ))}
            </CardGrid>
          </Section>
        );
      case "table":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.table!.title} lead={copy.table!.intro} />
            <ScopeTable headers={copy.table!.headers} rows={copy.table!.rows} note={copy.table!.note} />
          </Section>
        );
      case "features":
        return (
          <Section tone={tone}>
            <SectionHead title="Det får du" />
            <CardGrid>
              {copy.features!.map((f, i) => (
                <Card key={i}>
                  <h3 className="mb-2">{f.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{f.body}</p>
                </Card>
              ))}
            </CardGrid>
          </Section>
        );
      case "howItWorks":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.howItWorks!.title} lead={copy.howItWorks!.intro} />
            <CardGrid>
              {copy.howItWorks!.steps.map((s, i) => (
                <StepCard key={i} n={i + 1} title={s.title} body={s.body} />
              ))}
            </CardGrid>
          </Section>
        );
      case "checks":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.checks!.title} lead={copy.checks!.intro} />
            <CheckList items={copy.checks!.items} />
          </Section>
        );
      case "trust":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.trust!.title} />
            <CardGrid>
              {copy.trust!.items.map((t) => (
                <TrustCard key={t.title} icon={t.icon} title={t.title} body={t.body} onBand={tone === "band"} />
              ))}
            </CardGrid>
          </Section>
        );
      case "integrations":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.integrations!.title} />
            <IntegrationRow footnote={copy.integrations!.footnote} />
          </Section>
        );
      case "options":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.options!.title} lead={copy.options!.intro} />
            <OptionCards items={copy.options!.items} />
          </Section>
        );
      case "valueStats":
        return (
          <Section tone={tone}>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.valueStats!.map((s, i) => (
                <div key={i}>
                  <p className="mb-1 font-display text-h2 text-primary">{s.value}</p>
                  <p className="font-semibold text-foreground">{s.label}</p>
                  {s.note && <p className="mt-1 text-body-sm text-muted-foreground">{s.note}</p>}
                </div>
              ))}
            </div>
          </Section>
        );
      case "body":
        return (
          <Section tone={tone}>
            <div className="max-w-3xl">
              <ArticleSections sections={node.body!} />
            </div>
          </Section>
        );
      case "depth":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.depth!.title} />
            <DepthDetails items={copy.depth!.items} />
          </Section>
        );
      case "children":
        return (
          <Section tone={tone}>
            <h2 className="mb-6 text-h3">Udforsk videre</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((c) => (
                <a
                  key={c.slug}
                  href={`/${c.collection}/${c.slug}`}
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-soft transition-colors duration-200 hover:border-border-strong"
                >
                  <Plus className="mt-0.5 h-5 w-5 shrink-0 text-sage" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-primary">{c.navLabel}</span>
                    <span className="mt-0.5 block text-body-sm text-muted-foreground">{c.blurb}</span>
                  </span>
                </a>
              ))}
            </div>
          </Section>
        );
      case "testimonial":
        return (
          <Section tone={tone}>
            <Quote quote={copy.testimonial!.quote} name={copy.testimonial!.name} role={copy.testimonial!.role} />
          </Section>
        );
      case "contact":
        return (
          <Section tone={tone}>
            <ContactBox contact={copy.contact!} />
          </Section>
        );
      case "faq":
        return (
          <Section tone={tone}>
            <SectionHead title={copy.faq.title} />
            <Faq items={copy.faq.items} />
          </Section>
        );
      case "related":
        return (
          <Section tone={tone}>
            <h2 className="mb-6 text-h3">Relateret</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-body-sm font-semibold text-primary transition-colors duration-200 hover:bg-band"
                >
                  {r.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Section>
        );
      case "closingCta":
        return (
          <ClosingCta
            title={copy.closingCta.title}
            description={copy.closingCta.description}
            primary={copy.closingCta.primary}
            secondary={copy.closingCta.secondary}
            trustLine={copy.closingCta.trustLine}
          />
        );
    }
  };

  // Alternate the surface down the page; closingCta brings its own.
  const keys = (node.sectionOrder ?? DEFAULT_ORDER).filter(has);
  let tone: SectionTone = "background";
  const sections = keys.map((k) => {
    const t: SectionTone = NEEDS_BACKGROUND.includes(k) ? "background" : tone;
    if (k !== "closingCta") tone = t === "background" ? "band" : "background";
    return <React.Fragment key={k}>{render(k, t)}</React.Fragment>;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>{sections}</main>
      <SiteFooter />
    </div>
  );
}
