"use client";
import { useState, useEffect } from "react";
import { Check, Minus, Loader2, CheckCircle, Mail, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";

type BillingCycle = "monthly" | "yearly";
type Currency = "dkk" | "eur";

const PRICES = {
  starter: {
    monthly: { dkk: 300, eur: 39 },
    yearly:  { dkk: 250, eur: 32.5 },
    yearlyTotal: { dkk: 3000, eur: 390 },
  },
  premium: {
    monthly: { dkk: 750, eur: 99 },
    yearly:  { dkk: 625, eur: 82.5 },
    yearlyTotal: { dkk: 7500, eur: 990 },
  },
};

interface FeatureRow {
  label: string;
  starter: boolean | string;
  premium: boolean | string;
  enterprise: boolean | string;
}

const FEATURE_ROWS: FeatureRow[] = [
  { label: "Scope 1, 2 & 3 udledningsberegning",    starter: true,             premium: true,              enterprise: true },
  { label: "Automatisk kategorisering (AI-faktura)", starter: true,             premium: true,              enterprise: true },
  { label: "Manuel dataregistrering",                starter: true,             premium: true,              enterprise: true },
  { label: "Excel/CSV-upload",                       starter: true,             premium: true,              enterprise: true },
  { label: "Carbon Ledger (auditbar oversigt)",      starter: true,             premium: true,              enterprise: true },
  { label: "VSME Basis-rapport",                     starter: true,             premium: true,              enterprise: true },
  { label: "Excel-eksport",                          starter: true,             premium: true,              enterprise: true },
  { label: "API-integrationer",                      starter: "1 integration",  premium: "Ubegrænsede",     enterprise: "Ubegrænsede" },
  { label: "Email-support",                          starter: true,             premium: true,              enterprise: true },
  { label: "PDF-eksport",                            starter: false,            premium: true,              enterprise: true },
  { label: "VSME Comprehensive-rapport",             starter: false,            premium: true,              enterprise: true },
  { label: "Reduction Hub & Scenario Builder",       starter: false,            premium: true,              enterprise: true },
  { label: "Offentlig profil & Brag Board badge",   starter: false,            premium: true,              enterprise: true },
  { label: "Direkte revisor-adgang",                 starter: false,            premium: true,              enterprise: true },
  { label: "Chat & telefon-support",                 starter: false,            premium: true,              enterprise: true },
  { label: "Komplet værdikæde via CVR",              starter: false,            premium: false,             enterprise: true },
  { label: "Fuld API-adgang",                        starter: false,            premium: false,             enterprise: true },
  { label: "SAML/SSO adgangskontrol",               starter: false,            premium: false,             enterprise: true },
  { label: "Dedikeret Customer Success Manager",     starter: false,            premium: false,             enterprise: true },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === false) {
    return (
      <span className="flex justify-center">
        <Minus className="h-4 w-4 text-gray-300" strokeWidth={2} />
      </span>
    );
  }
  if (value === true) {
    return (
      <span className="flex justify-center">
        <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="text-[12px] text-center font-medium text-primary block leading-tight">
      {value}
    </span>
  );
}

const FAQ_ITEMS = [
  {
    q: "Binder jeg mig til en aftale?",
    a: "Nej. Du kan annullere dit abonnement til enhver tid — månedlige planer stopper ved slutningen af den betalte periode, årlige planer refunderes ikke, men du bevarer adgangen til udløb. Ingen opsigelsesgebyr.",
  },
  {
    q: "Hvad sker der lige efter tilmelding?",
    a: "Straks efter betaling oprettes din konto og du guides igennem en kort onboarding. Du kan begynde at registrere data og oprette dit første klimaregnskab samme dag.",
  },
  {
    q: "Kan jeg skifte plan senere?",
    a: "Ja. Du kan opgradere fra Starter til Premium når som helst — adgangen er øjeblikkelig. Prisen justeres forholdsmæssigt for resten af perioden.",
  },
  {
    q: "Hvad er VSME, og er det obligatorisk?",
    a: "VSME (Voluntary SME Standard) er en frivillig ESG-rapporteringsstandard målrettet SMV'er, udviklet af EFRAG. Den er frivillig, men efterspørges i stigende grad af banker og større kunder som dokumentation for dit klimaarbejde.",
  },
  {
    q: "Har jeg brug for en revisor?",
    a: "Ikke for at komme i gang. qlim8 genererer revisionsklare beregninger med kildehenvisninger, som din revisor nemt kan efterprøve. Premium-planen giver desuden direkte revisoradgang til platformen.",
  },
  {
    q: "Hvad koster Historisk Import?",
    a: "Historisk Import er et éngangsprodukt til Premium-kunder på 9.000 kr. Det giver dig mulighed for at importere op til ét år historiske regnskabsdata fra Dinero med automatisk AI-klassificering, så du hurtigt etablerer en baseline.",
  },
];

export default function Pricing() {
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [currency, setCurrency] = useState<Currency>("dkk");
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
        body: JSON.stringify({ billingCycle, tier, currency }),
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

  const fmt = (val: number, cur: Currency) =>
    cur === "dkk"
      ? `${val.toLocaleString("da-DK")} kr`
      : `€${val.toLocaleString("da-DK", { minimumFractionDigits: val % 1 !== 0 ? 1 : 0 })}`;

  const starterPrice = billingCycle === "yearly" ? PRICES.starter.yearly : PRICES.starter.monthly;
  const premiumPrice = billingCycle === "yearly" ? PRICES.premium.yearly : PRICES.premium.monthly;

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">

          <div className="mb-10 sm:mb-14">
            <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-3" data-testid="text-pricing-label">
              Priser
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-5" data-testid="text-pricing-title">
              Fra 250 kr/md. Alt inkluderet.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
              Ingen onboarding-gebyr, ingen lock-in. Opsig hvornår som helst. Alle priser er ekskl. moms.
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

              <div className="inline-flex items-center border border-gray-300 rounded-full p-0.5 bg-white" data-testid="currency-toggle">
                <button
                  onClick={() => setCurrency("dkk")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${currency === "dkk" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
                  data-testid="toggle-dkk"
                >
                  DKK
                </button>
                <button
                  onClick={() => setCurrency("eur")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${currency === "eur" ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-700"}`}
                  data-testid="toggle-eur"
                >
                  EUR
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
                    — spar 17%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-8 sm:mb-10" data-testid="trust-bar">
            <span className="text-xs text-gray-400">✓ Annuller til enhver tid</span>
            <span className="text-gray-200 text-xs">·</span>
            <span className="text-xs text-gray-400">✓ Ingen opsætningsgebyr</span>
            <span className="text-gray-200 text-xs">·</span>
            <span className="text-xs text-gray-400">✓ Alle priser ekskl. moms</span>
          </div>

          <div className={`transition-all duration-300 ${loadingTier || showSuccess ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">

              {/* ── Starter ── */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid="plan-starter">
                <div className="mb-5">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1">Starter</p>
                  <p className="text-xs text-gray-500 mb-3">Til SMV'er der starter ESG-arbejdet — banken har spurgt, og I skal have et tal.</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <motion.span
                      key={`starter-${billingCycle}-${currency}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-bold text-gray-900"
                      data-testid="price-starter"
                    >
                      {fmt(starterPrice[currency], currency)}
                    </motion.span>
                    <span className="text-sm text-gray-400">/md</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {billingCycle === "yearly"
                      ? `Faktureret ${fmt(PRICES.starter.yearlyTotal[currency], currency)} årligt`
                      : "Faktureret månedligt"}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckout("starter")}
                  disabled={!!loadingTier}
                  className="w-full py-2.5 px-4 rounded-full border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5"
                  data-testid="button-checkout-starter"
                >
                  {loadingTier === "starter" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Forbereder...</>
                  ) : "Vælg Starter"}
                </button>
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.12em] font-medium mb-3">Inkluderet</p>
                <ul className="space-y-2 flex-1">
                  {["Scope 1/2/3 beregning", "AI fakturaupload", "VSME Basis-rapport", "1 API-integration", "Excel-eksport", "Email-support"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Premium ── */}
              <div className="bg-gray-900 rounded-2xl border border-gray-900 p-6 flex flex-col relative overflow-hidden" data-testid="plan-premium">
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-semibold bg-primary text-white px-2.5 py-1 rounded-full uppercase tracking-[0.1em]">
                    Mest populær
                  </span>
                </div>
                <div className="mb-5">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1">Premium</p>
                  <p className="text-xs text-gray-400 mb-3">Til SMV'er med kunde- og bankrapportering — VSME Comprehensive, leverandørdata, offentlig profil.</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <motion.span
                      key={`premium-${billingCycle}-${currency}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-bold text-white"
                      data-testid="price-premium"
                    >
                      {fmt(premiumPrice[currency], currency)}
                    </motion.span>
                    <span className="text-sm text-gray-400">/md</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {billingCycle === "yearly"
                      ? `Faktureret ${fmt(PRICES.premium.yearlyTotal[currency], currency)} årligt`
                      : "Faktureret månedligt"}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckout("premium")}
                  disabled={!!loadingTier}
                  className="w-full py-2.5 px-4 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-5"
                  data-testid="button-checkout-premium"
                >
                  {loadingTier === "premium" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Forbereder...</>
                  ) : "Vælg Premium"}
                </button>
                <p className="text-[11px] text-gray-500 uppercase tracking-[0.12em] font-medium mb-3">Alt i Starter, plus</p>
                <ul className="space-y-2 flex-1">
                  {["PDF-eksport", "VSME Comprehensive-rapport", "Reduction Hub & Scenario Builder", "Ubegrænsede integrationer", "Offentlig profil & Brag Board", "Direkte revisor-adgang", "Chat & telefon-support"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Enterprise ── */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col" data-testid="plan-enterprise">
                <div className="mb-5">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1">Enterprise</p>
                  <p className="text-xs text-gray-500 mb-3">Til større organisationer med flere CVR, komplet værdikæde og API-integration.</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold text-gray-900">Kontakt salg</span>
                  </div>
                  <p className="text-xs text-gray-400">Tilpasset pris for din organisation</p>
                </div>
                <a
                  href="mailto:hello@qlim8.com"
                  className="w-full py-2.5 px-4 rounded-full border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2 mb-5"
                  data-testid="button-contact-enterprise"
                >
                  <Mail className="h-4 w-4" />
                  Kontakt os
                </a>
                <p className="text-[11px] text-gray-400 uppercase tracking-[0.12em] font-medium mb-3">Alt i Premium, plus</p>
                <ul className="space-y-2 flex-1">
                  {([
                    { label: "Komplet værdikæde via CVR", note: "kræver premium abonnement fra værdikæden – dog får I som Enterprise kunde en rabatkode til jeres leverandører" },
                    { label: "Fuld API-adgang" },
                    { label: "SAML/SSO adgangskontrol" },
                    { label: "Dedikeret Customer Success Manager" },
                    { label: "White-label PDF-eksport" },
                  ] as { label: string; note?: string }[]).map((f) => (
                    <li key={f.label} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span>
                        {f.label}
                        {f.note && <span className="block text-xs text-gray-400 mt-0.5">({f.note})</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Feature comparison table ── */}
            <div className="mt-16 overflow-x-auto">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
                Komplet sammenligning
              </p>
              <table className="w-full border-collapse" data-testid="feature-comparison-table">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 text-sm font-medium text-gray-500 w-[44%]">Feature</th>
                    <th className="text-center py-3 px-3 text-sm font-semibold text-gray-900 w-[18%]">Starter</th>
                    <th className="text-center py-3 px-3 text-sm font-semibold text-gray-900 w-[18%]">Premium</th>
                    <th className="text-center py-3 px-3 text-sm font-semibold text-gray-900 w-[18%]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_ROWS.map((row, i) => (
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
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
              Ofte stillede spørgsmål
            </p>
            <div className="max-w-2xl divide-y divide-gray-100">
              {FAQ_ITEMS.map((item, i) => (
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
            Alle priser er ekskl. moms &nbsp;·&nbsp; Annuller når som helst
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
