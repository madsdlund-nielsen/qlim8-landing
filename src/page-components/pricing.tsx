// Server component. The page used to be "use client" for its billing-cycle
// toggle and the Stripe checkout it started; with no prices and no checkout
// there is nothing left that needs a hook.
import { Plus } from "lucide-react";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { PRICING_COPY, type PricingCopy } from "@/content/copy/pricing";
import { CONTACT_HREF, DEMO_HREF, DEMO_LABEL, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === false) {
    return <span className="block text-center text-gray-300">-</span>;
  }
  if (value === true) {
    return <span className="block text-center text-gray-900">✓</span>;
  }
  return (
    <span className="block text-center text-[12px] font-medium text-gray-700 leading-tight">
      {value}
    </span>
  );
}

function DemoButton({ dark = false, plan }: { dark?: boolean; plan: string }) {
  return (
    <a
      href={DEMO_HREF}
      className={
        "w-full py-2.5 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center mb-6 " +
        (dark
          ? "bg-primary text-white hover:bg-primary/90"
          : "border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white")
      }
      data-testid={`button-demo-${plan}`}
    >
      {DEMO_LABEL}
    </a>
  );
}

// All copy lives in src/content/copy/pricing.ts (pageKey "page.pricing");
// app/priser/page.tsx passes the CMS-merged result.
export default function Pricing({ copy = PRICING_COPY }: { copy?: PricingCopy }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">

          <div className="mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-5" data-testid="text-pricing-title">
              {copy.header.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
              {copy.header.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={DEMO_HREF}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                data-testid="button-demo-header"
              >
                {DEMO_LABEL}
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Ring {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-8 sm:mb-10" data-testid="trust-bar">
            {copy.trustBar.map((item, i) => (
              <span key={item} className="contents">
                {i > 0 && <span className="text-gray-200 text-xs">·</span>}
                <span className="text-xs text-gray-400">{item}</span>
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">

            {/* ── Starter ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid="plan-starter">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{copy.starter.name}</h2>
                <p className="text-sm text-gray-600">{copy.starter.tagline}</p>
              </div>
              <DemoButton plan="starter" />
              <p className="font-semibold text-gray-900 text-sm mb-3">{copy.starter.includedLabel}</p>
              <ul className="space-y-1.5 flex-1 text-sm text-gray-700">
                {copy.starter.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-2.5 shrink-0 bg-primary" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Premium ── */}
            <div className="bg-gray-900 rounded-2xl border border-gray-900 p-6 flex flex-col" data-testid="plan-premium">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-white mb-1">{copy.premium.name}</h2>
                <p className="text-sm text-gray-400">{copy.premium.tagline}</p>
              </div>
              <DemoButton dark plan="premium" />
              <p className="font-semibold text-white text-sm mb-3">{copy.premium.includedLabel}</p>
              <ul className="space-y-1.5 flex-1 text-sm text-gray-300">
                {copy.premium.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-2.5 shrink-0 bg-primary" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Enterprise ── */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid="plan-enterprise">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{copy.enterprise.name}</h2>
                <p className="text-sm text-gray-600">{copy.enterprise.tagline}</p>
              </div>
              <DemoButton plan="enterprise" />
              <p className="font-semibold text-gray-900 text-sm mb-3">{copy.enterprise.includedLabel}</p>
              <ul className="space-y-1.5 flex-1 text-sm text-gray-700">
                {copy.enterprise.features.map((f) => (
                  <li key={f.label} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-2.5 shrink-0 bg-primary" aria-hidden="true" />
                    <span>
                      {f.label}
                      {f.note && <span className="block text-xs text-gray-500 mt-0.5">({f.note})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Feature comparison table ── */}
          <div className="mt-20 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-t border-gray-200 pt-10">
              {copy.comparison.title}
            </h2>
            <table className="w-full border-collapse" data-testid="feature-comparison-table">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 text-sm font-medium text-gray-500 w-[44%]">Feature</th>
                  <th className="text-center py-3 px-3 text-sm font-semibold text-gray-900 w-[18%]">{copy.starter.name}</th>
                  <th className="text-center py-3 px-3 text-sm font-semibold text-gray-900 w-[18%]">{copy.premium.name}</th>
                  <th className="text-center py-3 px-3 text-sm font-semibold text-gray-900 w-[18%]">{copy.enterprise.name}</th>
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`} data-testid={`feature-row-${i}`}>
                    <td className="py-3 pr-4 text-sm text-gray-700">{row.label}</td>
                    <td className="py-3 px-3 text-center"><FeatureCell value={row.starter} /></td>
                    <td className="py-3 px-3 text-center"><FeatureCell value={row.premium} /></td>
                    <td className="py-3 px-3 text-center"><FeatureCell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-20" data-testid="faq-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-t border-gray-200 pt-10">
              {copy.faq.title}
            </h2>
            {/* Native <details>, as the marketing pages already do: every answer
                is in the server HTML (it was gated on client state before, so
                crawlers saw the questions only), and the FAQPage schema that
                app/priser/page.tsx emits from the same array describes text that
                is actually on the page. */}
            <div className="max-w-2xl divide-y divide-gray-100 border-y border-gray-100">
              {copy.faq.items.map((item, i) => (
                <details key={i} className="group py-4" data-testid={`faq-item-${i}`}>
                  <summary
                    className="flex cursor-pointer list-none items-center justify-between text-left text-sm font-medium text-gray-900 hover:text-primary transition-colors"
                    data-testid={`faq-toggle-${i}`}
                  >
                    {item.q}
                    <Plus className="h-4 w-4 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 group-open:rotate-45" strokeWidth={2} />
                  </summary>
                  <p className="pt-3 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-20 border-t border-gray-200 pt-10" data-testid="pricing-closing">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{copy.closing.title}</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">{copy.closing.body}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={DEMO_HREF}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                {DEMO_LABEL}
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Ring {PHONE_DISPLAY}
              </a>
              <a
                href={CONTACT_HREF}
                className="inline-flex items-center justify-center px-7 py-3 text-gray-700 font-semibold hover:text-primary transition-colors"
              >
                Skriv til os
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
