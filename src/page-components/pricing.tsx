"use client";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import { PRICING_COPY, type PricingCopy, type PriceSet } from "@/content/copy/pricing";

type BillingCycle = "monthly" | "yearly";

/**
 * Subscriptions are billed in DKK only — the Stripe products carry no EUR
 * prices. Still posted to /api/stripe/checkout-public so the bridge keeps its
 * existing request shape.
 */
const CURRENCY = "dkk" as const;

function pick(prices: PriceSet, cycle: BillingCycle): number {
  return cycle === "yearly" ? prices.yearlyDkk : prices.monthlyDkk;
}

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === false) {
    return <span className="block text-center text-gray-300">—</span>;
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

// All copy lives in src/content/copy/pricing.ts (pageKey "page.pricing");
// app/priser/page.tsx passes the CMS-merged result.
export default function Pricing({ copy = PRICING_COPY }: { copy?: PricingCopy }) {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkoutStatus = params.get("checkout");
    if (checkoutStatus === "success") {
      setShowSuccess(true);
      window.history.replaceState({}, "", "/priser");
      setTimeout(() => { window.location.href = "https://app.qlim8.com/auth"; }, 2500);
    } else if (checkoutStatus === "cancelled") {
      window.history.replaceState({}, "", "/priser");
      toast({ title: "Betaling annulleret", description: "Du kan altid prøve igen når du er klar." });
    }
  }, []);

  const handleCheckout = async (tier: "starter" | "premium") => {
    setLoadingTier(tier);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://app.qlim8.com";
      const res = await fetch(`${API_BASE}/api/stripe/checkout-public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ billingCycle, tier, currency: CURRENCY }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Ukendt fejl");
      }
    } catch (err: any) {
      setLoadingTier(null);
      toast({ title: "Der opstod en fejl", description: "Kunne ikke starte betalingen. Prøv igen.", variant: "destructive" });
    }
  };

  const fmt = (val: number) => `${val.toLocaleString("da-DK")} kr`;

  const starterPrice = pick(copy.prices.starter, billingCycle);
  const premiumPrice = pick(copy.prices.premium, billingCycle);

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
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

            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-gray-300 rounded-full p-0.5 bg-white" data-testid="billing-toggle">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${billingCycle === "monthly" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
                  data-testid="toggle-monthly"
                >
                  Månedlig
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${billingCycle === "yearly" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
                  data-testid="toggle-yearly"
                >
                  Årlig
                </button>
              </div>

              </div>

              <AnimatePresence mode="wait">
                {billingCycle === "yearly" && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-sm text-primary font-medium"
                  >
                    {copy.header.yearlySavingsNote}
                  </motion.span>
                )}
              </AnimatePresence>
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

          <div className={`transition-all duration-300 ${loadingTier || showSuccess ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">

              {/* ── Starter ── */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid="plan-starter">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{copy.starter.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">{copy.starter.tagline}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <motion.span
                      key={`starter-${billingCycle}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-bold text-gray-900"
                      data-testid="price-starter"
                    >
                      {fmt(starterPrice)}
                    </motion.span>
                    <span className="text-sm text-gray-400">/md</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {billingCycle === "yearly"
                      ? `Faktureret ${fmt(copy.prices.starter.yearlyTotalDkk)} årligt`
                      : "Faktureret månedligt"}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckout("starter")}
                  disabled={!!loadingTier}
                  className="w-full py-2.5 px-4 rounded-full border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
                  data-testid="button-checkout-starter"
                >
                  {loadingTier === "starter" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Forbereder...</>
                  ) : copy.starter.cta}
                </button>
                <p className="font-semibold text-gray-900 text-sm mb-3">{copy.starter.includedLabel}</p>
                <ul className="space-y-1.5 flex-1 text-sm text-gray-700">
                  {copy.starter.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
              </div>

              {/* ── Premium ── */}
              <div className="bg-gray-900 rounded-2xl border border-gray-900 p-6 flex flex-col" data-testid="plan-premium">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-white mb-1">{copy.premium.name}</h2>
                  <p className="text-sm text-gray-400 mb-4">{copy.premium.tagline}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <motion.span
                      key={`premium-${billingCycle}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-bold text-white"
                      data-testid="price-premium"
                    >
                      {fmt(premiumPrice)}
                    </motion.span>
                    <span className="text-sm text-gray-400">/md</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {billingCycle === "yearly"
                      ? `Faktureret ${fmt(copy.prices.premium.yearlyTotalDkk)} årligt`
                      : "Faktureret månedligt"}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckout("premium")}
                  disabled={!!loadingTier}
                  className="w-full py-2.5 px-4 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
                  data-testid="button-checkout-premium"
                >
                  {loadingTier === "premium" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Forbereder...</>
                  ) : copy.premium.cta}
                </button>
                <p className="font-semibold text-white text-sm mb-3">{copy.premium.includedLabel}</p>
                <ul className="space-y-1.5 flex-1 text-sm text-gray-300">
                  {copy.premium.features.map((f) => (
                    <li key={f}>— {f}</li>
                  ))}
                </ul>
              </div>

              {/* ── Enterprise ── */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid="plan-enterprise">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{copy.enterprise.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">{copy.enterprise.tagline}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">{copy.enterprise.priceLabel}</span>
                  </div>
                  <p className="text-xs text-gray-500">{copy.enterprise.priceNote}</p>
                </div>
                <a
                  href="mailto:hello@qlim8.com"
                  className="w-full py-2.5 px-4 rounded-full border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center mb-6"
                  data-testid="button-contact-enterprise"
                >
                  {copy.enterprise.cta}
                </a>
                <p className="font-semibold text-gray-900 text-sm mb-3">{copy.enterprise.includedLabel}</p>
                <ul className="space-y-1.5 flex-1 text-sm text-gray-700">
                  {copy.enterprise.features.map((f) => (
                    <li key={f.label}>
                      — {f.label}
                      {f.note && <span className="block text-xs text-gray-500 ml-3 mt-0.5">({f.note})</span>}
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
          </div>

          <div className="mt-20" data-testid="faq-section">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-t border-gray-200 pt-10">
              {copy.faq.title}
            </h2>
            <div className="max-w-2xl divide-y divide-gray-100">
              {copy.faq.items.map((item, i) => (
                <div key={i} data-testid={`faq-item-${i}`}>
                  <button
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-primary transition-colors"
                    data-testid={`faq-toggle-${i}`}
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${faqOpen === i ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center text-xs text-gray-400">
            {copy.footerNote}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
            data-testid="checkout-success-overlay"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              <CheckCircle className="h-24 w-24 text-primary" strokeWidth={1.5} />
              <p className="text-lg font-medium text-gray-900">Betaling gennemført</p>
              <p className="text-sm text-gray-500">Du sendes videre til login...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
