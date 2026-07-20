// The single reusable renderer for every industry / feature / integration leaf
// page. Driven entirely by a MarketingNode + its resolved MarketingPageCopy.
// Server component (no client hooks) — FAQ uses native <details>.
import { ArrowRight, Check, Plus } from "lucide-react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CTASection } from "@/components/public/CTASection";
import { Breadcrumbs } from "@/components/public/Breadcrumbs";
import { ArticleSections } from "@/components/public/ArticleSections";
import type { MarketingNode, MarketingPageCopy } from "@/content/marketing/types";
import { getRelated, getChildren } from "@/content/marketing";
import { buildBreadcrumbTrail } from "@/lib/marketingPage";

function ctaClasses(primary: boolean) {
  return primary
    ? "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
    : "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold hover:border-primary hover:text-primary transition-colors";
}

export default function MarketingPageTemplate({
  node,
  copy,
}: {
  node: MarketingNode;
  copy: MarketingPageCopy;
}) {
  const trail = buildBreadcrumbTrail(node);
  const related = getRelated(node);
  const children = getChildren(node.collection, node.slug);
  const comingSoon = node.status === "coming-soon";

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-14 sm:pt-10 sm:pb-20">
          <Breadcrumbs trail={trail} />
          {copy.hero.eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              {copy.hero.eyebrow}
            </p>
          )}
          {comingSoon && (
            <span className="inline-block mb-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
              Kommer snart
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-5 max-w-3xl">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mb-8">
            {copy.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={copy.hero.primaryCta.href} className={ctaClasses(true)}>
              {copy.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            {copy.hero.secondaryCta && (
              <a href={copy.hero.secondaryCta.href} className={ctaClasses(false)}>
                {copy.hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Intro / differentiation */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
            {copy.intro.heading}
          </h2>
          <p className="text-gray-700 text-[17px] leading-relaxed">{copy.intro.body}</p>
          {copy.intro.bullets && copy.intro.bullets.length > 0 && (
            <ul className="mt-6 space-y-3">
              {copy.intro.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-[17px]">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Pain → solution */}
      {copy.painPoints.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 max-w-2xl">
              Sådan løser vi dine udfordringer
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {copy.painPoints.map((p, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-[#F5F5F0] p-6">
                  <p className="text-sm font-semibold text-gray-500 mb-2">Udfordringen</p>
                  <p className="text-gray-800 mb-4 leading-relaxed">{p.pain}</p>
                  <p className="text-sm font-semibold text-primary mb-2">Sådan hjælper qlim8</p>
                  <p className="text-gray-700 leading-relaxed">{p.solution}</p>
                  {p.outcome && (
                    <p className="mt-4 text-sm font-medium text-gray-900 border-t border-gray-200 pt-3">
                      {p.outcome}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {copy.features.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">Det får du</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {copy.features.map((f, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      {copy.howItWorks && copy.howItWorks.steps.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              {copy.howItWorks.title}
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {copy.howItWorks.steps.map((s, i) => (
                <div key={i}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value stats */}
      {copy.valueStats.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.valueStats.map((s, i) => (
                <div key={i} className="text-center sm:text-left">
                  <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-gray-800 font-medium">{s.label}</p>
                  {s.note && <p className="text-sm text-gray-500 mt-1">{s.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Long-form editorial body (flagship pages) */}
      {node.body && node.body.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <ArticleSections sections={node.body} />
          </div>
        </section>
      )}

      {/* Child pages sub-nav */}
      {children.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Udforsk videre</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((c) => (
                <a
                  key={c.slug}
                  href={`/${c.collection}/${c.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 hover:border-primary transition-colors"
                >
                  <Plus className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>
                    <span className="block font-semibold text-gray-900 group-hover:text-primary">
                      {c.navLabel}
                    </span>
                    <span className="block text-sm text-gray-500 mt-0.5">{c.blurb}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {copy.faq.items.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              {copy.faq.title}
            </h2>
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

      {/* Related links */}
      {related.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Relateret</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/${r.collection}/${r.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors"
                >
                  {r.navLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
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
