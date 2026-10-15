// Server component. The page used to be "use client" for its billing-cycle
// toggle and the Stripe checkout it started; with no prices and no checkout
// there is nothing left that needs a hook.
//
// Two layouts, chosen by the app's package catalog (src/lib/packageView.ts):
// while it sells nothing by itself (catalog version 1, or the API cannot be
// reached) this is the sales-led page it has been since 25.09: three cards
// behind "Book demo", no price. Once it does, the packages API decides the
// cards, prices and buttons (src/components/public/PackageGroups.tsx), and
// the buttons above and below them lead with "Kom gratis i gang" to the free
// package's signup URL, which the API names (freeStartHref).
import { Button } from "@/components/ds/Button";
import { Faq } from "@/components/ds/Faq";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { PackageGroups } from "@/components/public/PackageGroups";
import { PRICING_COPY, type PricingCopy } from "@/content/copy/pricing";
import { CONTACT_HREF, DEMO_HREF, DEMO_LABEL, FREE_START_CTA, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";
import { freeStartHref, isSelfServe, type PublicPackages } from "@/lib/packageView";

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === false) {
    return <span className="block text-center text-muted-foreground">-</span>;
  }
  if (value === true) {
    return <span className="block text-center text-primary">✓</span>;
  }
  return (
    <span className="block text-center text-trust font-medium text-foreground leading-tight">
      {value}
    </span>
  );
}

/**
 * The lead buttons at the top and bottom of the page. Sales-led: "Book demo"
 * first. Self-serve: "Kom gratis i gang" first, then "Book demo". Fixed here,
 * not CMS-editable, so no published copy can point them elsewhere.
 */
function LeadButtons({ freeStart, place }: { freeStart: string | null; place: "header" | "closing" }) {
  if (!freeStart) {
    return (
      <Button href={DEMO_HREF} data-testid={`button-demo-${place}`}>
        {DEMO_LABEL}
      </Button>
    );
  }
  return (
    <>
      <Button href={freeStart} data-testid={`button-free-start-${place}`}>
        {FREE_START_CTA.label}
      </Button>
      <Button href={DEMO_HREF} variant="outline" data-testid={`button-demo-${place}`}>
        {DEMO_LABEL}
      </Button>
    </>
  );
}

function DemoButton({ dark = false, plan }: { dark?: boolean; plan: string }) {
  return (
    <Button href={DEMO_HREF} variant={dark ? "inverted" : "outline"} full className="mb-6" data-testid={`button-demo-${plan}`}>
      {DEMO_LABEL}
    </Button>
  );
}

// All copy lives in src/content/copy/pricing.ts (pageKey "page.pricing");
// app/priser/page.tsx passes the CMS-merged result.
export default function Pricing({
  copy = PRICING_COPY,
  packages = null,
}: {
  copy?: PricingCopy;
  packages?: PublicPackages | null;
}) {
  const selfServe = isSelfServe(packages);
  const freeStart = freeStartHref(packages);
  // Self-serve cards keep their CMS-editable names and taglines; their lists
  // come from the packages API (PackageGroups, packageFeatures).
  const cardCopy = {
    starter: { name: copy.starter.name, tagline: copy.starter.tagline },
    premium: { name: copy.premium.name, tagline: copy.premium.tagline },
    enterprise: { name: copy.enterprise.name, tagline: copy.enterprise.tagline },
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="max-w-(--container-max) mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">

          <div className="mb-10 sm:mb-14">
            <h1 className="mb-5 max-w-3xl text-balance" data-testid="text-pricing-title">
              {copy.header.title}
            </h1>
            <p className="text-lead text-foreground max-w-(--measure-body) mb-8">
              {copy.header.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <LeadButtons freeStart={freeStart} place="header" />
              <Button href={PHONE_HREF} variant="outline">
                Ring {PHONE_DISPLAY}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-8 sm:mb-10" data-testid="trust-bar">
            {copy.trustBar.map((item, i) => (
              <span key={item} className="contents">
                {i > 0 && <span className="text-border text-trust">·</span>}
                <span className="text-trust text-muted-foreground">{item}</span>
              </span>
            ))}
          </div>

          {selfServe ? (
            <PackageGroups data={packages!} cardCopy={cardCopy} comparisonTitle={copy.comparison.title} />
          ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">

            {/* ── Starter ── */}
            <div className="bg-card rounded-lg border border-border shadow-soft p-6 flex flex-col" data-testid="plan-starter">
              <div className="mb-5">
                <h2 className="mb-1 text-h3">{copy.starter.name}</h2>
                <p className="text-body-sm text-muted-foreground">{copy.starter.tagline}</p>
              </div>
              <DemoButton plan="starter" />
              <p className="font-semibold text-foreground text-body-sm mb-3">{copy.starter.includedLabel}</p>
              <ul className="space-y-1.5 flex-1 text-body-sm text-foreground">
                {copy.starter.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-2.5 shrink-0 bg-sage" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Premium ── */}
            <div className="bg-primary text-primary-foreground rounded-lg border border-primary shadow-soft p-6 flex flex-col" data-testid="plan-premium">
              <div className="mb-5">
                <h2 className="mb-1 text-h3 text-primary-foreground">{copy.premium.name}</h2>
                <p className="text-body-sm text-primary-foreground">{copy.premium.tagline}</p>
              </div>
              <DemoButton dark plan="premium" />
              <p className="font-semibold text-primary-foreground text-body-sm mb-3">{copy.premium.includedLabel}</p>
              <ul className="space-y-1.5 flex-1 text-body-sm text-primary-foreground">
                {copy.premium.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-2.5 shrink-0 bg-primary-foreground" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Enterprise ── */}
            <div className="bg-card rounded-lg border border-border shadow-soft p-6 flex flex-col" data-testid="plan-enterprise">
              <div className="mb-5">
                <h2 className="mb-1 text-h3">{copy.enterprise.name}</h2>
                <p className="text-body-sm text-muted-foreground">{copy.enterprise.tagline}</p>
              </div>
              <DemoButton plan="enterprise" />
              <p className="font-semibold text-foreground text-body-sm mb-3">{copy.enterprise.includedLabel}</p>
              <ul className="space-y-1.5 flex-1 text-body-sm text-foreground">
                {copy.enterprise.features.map((f) => (
                  <li key={f.label} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-2.5 shrink-0 bg-sage" aria-hidden="true" />
                    <span>
                      {f.label}
                      {f.note && <span className="block text-trust text-muted-foreground mt-0.5">({f.note})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Feature comparison table ── */}
          <div className="mt-20 overflow-x-auto">
            <h2 className="mb-6 border-t border-border pt-10">
              {copy.comparison.title}
            </h2>
            <table className="w-full border-collapse" data-testid="feature-comparison-table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-body-sm font-medium text-muted-foreground w-[44%]">Feature</th>
                  <th className="text-center py-3 px-3 text-body-sm font-semibold text-foreground w-[18%]">{copy.starter.name}</th>
                  <th className="text-center py-3 px-3 text-body-sm font-semibold text-foreground w-[18%]">{copy.premium.name}</th>
                  <th className="text-center py-3 px-3 text-body-sm font-semibold text-foreground w-[18%]">{copy.enterprise.name}</th>
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map((row, i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? "" : "bg-band"}`} data-testid={`feature-row-${i}`}>
                    <td className="py-3 pr-4 text-body-sm text-foreground">{row.label}</td>
                    <td className="py-3 px-3 text-center"><FeatureCell value={row.starter} /></td>
                    <td className="py-3 px-3 text-center"><FeatureCell value={row.premium} /></td>
                    <td className="py-3 px-3 text-center"><FeatureCell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
          )}

          <div className="mt-20" data-testid="faq-section">
            <h2 className="mb-6 border-t border-border pt-10">
              {copy.faq.title}
            </h2>
            {/* The ds Faq is native <details>, as the marketing pages already do:
                every answer is in the server HTML (it was gated on client state
                before, so crawlers saw the questions only), and the FAQPage
                schema that app/priser/page.tsx emits from the same array
                describes text that is actually on the page. */}
            <Faq items={copy.faq.items} />
          </div>

          <div className="mt-20 border-t border-border pt-10" data-testid="pricing-closing">
            <h2 className="mb-3">{copy.closing.title}</h2>
            <p className="text-body text-foreground max-w-(--measure-body) mb-6">{copy.closing.body}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <LeadButtons freeStart={freeStart} place="closing" />
              <Button href={PHONE_HREF} variant="outline">
                Ring {PHONE_DISPLAY}
              </Button>
              <a
                href={CONTACT_HREF}
                className="inline-flex min-h-12 items-center justify-center px-4 text-button font-semibold text-primary underline-offset-4 hover:underline"
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
