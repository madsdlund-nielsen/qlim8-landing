"use client";
import { ArrowRight, Check, ShieldCheck, Globe2, Building2, BookOpen, Gauge, FileText, Sparkles } from "lucide-react";
import Image from "next/image";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HOMEPAGE_FAQS } from "@/content/homepage-faqs";

import dashboardImg from "@assets/qlim8-Dashboard_(2)_1775843644408.jpg";
import f1Klimahovedbog from "@assets/Feature_3_Klimahovedbog_1769884331462.jpg";
import f2Kontrolcenter from "@assets/Feature_1_Kontrolcenter_1769884331461.jpg";
import f3Rapportering from "@assets/Feature_2_Rapportering_1769884331462.jpg";

const SIGNUP_URL = "https://app.qlim8.com/auth?tab=register";
const DEMO_URL = "/kontakt?subject=Book%20demo";

const PROBLEMS = [
  {
    title: "Regneark, der knækker midt i scope-3",
    body: "Manuel kategorisering af 1.000+ posteringer. Fejl bliver opdaget for sent. Ingen audit-trail når banken spørger.",
  },
  {
    title: "Banken vil have ESG-data hvert kvartal",
    body: "L193 ramte 1. januar. SMV'er er nu rapporteringspligtige overfor deres pengeinstitut. Konsulenter koster 80.000+ kr/år.",
  },
  {
    title: "Kunderne kræver CSRD-leverandørdata",
    body: "Store børsnoterede kunder under CSRD beder om dine scope-3-tal. Uden tal — ud af leverandørlisten.",
  },
];

const FEATURES = [
  {
    eyebrow: "Klimahovedbog",
    title: "Hver post er sporbar — ned til bilagets nummer",
    body: "Vi henter posteringer fra dit regnskabssystem og kategoriserer dem til scope 1, 2 og 3 med vores danske emissionsbibliotek. Hver beregning er audit-ready og kan eksporteres som dokumentation til revisor eller bank.",
    bullets: [
      "Automatisk kategorisering af 12 måneders bogføring",
      "Sporbar formel + emissionsfaktor på hver post",
      "Eksporterbar bilagsfortegnelse",
    ],
    image: f1Klimahovedbog,
    reverse: false,
  },
  {
    eyebrow: "Kontrolcenter",
    title: "Et dashboard for alt — uden support-tickets",
    body: "Datakilder, fejl, mangler og næste handling — alt samlet på én skærm. Du behøver ikke at lære systemet at kende. Det fortæller dig, hvad der mangler.",
    bullets: [
      "Realtids-status på regnskab + Eloverblik",
      "Prioriteret liste over manglende data",
      "Auto-flag ved usandsynlige tal",
    ],
    image: f2Kontrolcenter,
    reverse: true,
  },
  {
    eyebrow: "Rapporteringsstudio",
    title: "VSME-rapport på 10 minutter — ikke 10 dage",
    body: "Når 12 måneders data er klar, færdigudfylder vores wizard 90 % af VSME-rapporten automatisk. Du udfylder kun det, vi ikke kan se i regnskabet. Resten genererer sig selv.",
    bullets: [
      "VSME Basis og Comprehensive",
      "Klimakompasset-format på et klik",
      "PDF + maskinlæsbar XBRL",
    ],
    image: f3Rapportering,
    reverse: false,
  },
];

const STEPS = [
  { n: "01", title: "Tilslut dine datakilder", body: "OAuth-forbindelse til Dinero/Billy/e-conomic og fuldmagt via Eloverblik. 10 minutter." },
  { n: "02", title: "Vi kategoriserer", body: "Vores motor klassificerer dine posteringer til scope 1, 2 og 3 med en dansk emissionsfaktorbase." },
  { n: "03", title: "Eksportér rapport", body: "VSME-rapport, Klimakompas-eksport eller leverandørdata til CSRD-kunder. På ét klik." },
];

const PLANS = [
  {
    name: "Starter",
    price: "250",
    period: "/md ved årligt",
    monthlyPrice: "300 kr/md ved månedligt",
    tag: "1 CVR · op til 5 mio. omsætning",
    features: [
      "Komplet klimaregnskab (scope 1-3)",
      "Regnskabsintegration (Dinero/Billy/e-conomic)",
      "Eloverblik-integration",
      "VSME Basis-rapport",
    ],
    cta: "Start gratis",
    href: SIGNUP_URL,
    highlighted: false,
  },
  {
    name: "Premium",
    price: "625",
    period: "/md ved årligt",
    monthlyPrice: "750 kr/md ved månedligt",
    tag: "Mest valgt · bank- og kunderapportering",
    features: [
      "Alt fra Starter, plus:",
      "VSME Comprehensive",
      "Public profile (kunde-deling)",
      "Leverandørrapport-modul",
      "Prioriteret support",
    ],
    cta: "Start gratis",
    href: SIGNUP_URL,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Tilbud",
    period: "",
    monthlyPrice: "Skræddersyet til flere CVR-numre",
    tag: "Flere CVR · værdikæde · custom integrationer",
    features: [
      "Alt fra Premium, plus:",
      "Flere CVR-numre",
      "Komplet værdikæde-modul",
      "API-adgang og SSO",
      "Dedikeret onboarding",
    ],
    cta: "Kontakt salg",
    href: DEMO_URL,
    highlighted: false,
  },
];

const FAQS = HOMEPAGE_FAQS;

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] overflow-x-hidden">
      <SiteHeader isHome />

      {/* 1. Hero */}
      <section className="relative px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-accent-foreground rounded-full text-xs font-semibold tracking-wide mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            ESG uden besværet
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
            Klimaregnskab uden<br className="hidden sm:block" /> regneark, konsulenter og kaos.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-9">
            qlim8 henter dine bogføringsdata, kategoriserer scope 1-3 automatisk og leverer en VSME-rapport, banken og kunderne forstår. Fra 250 kr/md.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              Opret gratis konto
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={DEMO_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
            >
              Book 20-min demo
            </a>
          </div>

          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <Image
              src={dashboardImg}
              alt="qlim8 dashboard"
              priority
              placeholder="blur"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* 2. Trust-strip */}
      <section className="bg-white border-y border-gray-100 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-gray-600">
            <li className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> CVR DK46033736</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> GDPR-compliant</li>
            <li className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-primary" /> Hosting i EU (Hetzner)</li>
            <li className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> VSME-format godkendt af EFRAG</li>
          </ul>
        </div>
      </section>

      {/* 3. Integrations-bånd */}
      <section className="py-10 sm:py-14 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-6">
            Integrerer med
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-gray-700">
            {["Dinero", "e-conomic", "Billy", "Eloverblik"].map((name) => (
              <span
                key={name}
                className="inline-flex items-center px-5 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-4">Logoer kommer · alle integrationer er bygget og live</p>
        </div>
      </section>

      {/* 4. Problem-sektion */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Det gør I i dag</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              ESG er bare blevet endnu et bjerg af papirarbejde.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">{p.title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5–7. Løsning F1/F2/F3 */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Det gør qlim8</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Tre moduler. Ét klimaregnskab. Nul konsulenter.
            </h2>
          </div>
          <div className="space-y-20 sm:space-y-28">
            {FEATURES.map((f) => (
              <div
                key={f.eyebrow}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${f.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">{f.eyebrow}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-4">{f.title}</h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">{f.body}</p>
                  <ul className="space-y-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-gray-800">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[15px]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <Image src={f.image} alt={f.title} placeholder="blur" className="w-full h-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Manifest */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-5">Manifest</p>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 leading-[1.3] tracking-tight">
            "Vi er kedelige med vilje. Vi tror på at ESG skal være lige så uspændende som lønudbetaling: korrekt, til tiden, og uden drama. Ingen brandnavne, ingen buzzwords, ingen falske grønne løfter."
          </blockquote>
        </div>
      </section>

      {/* 9. 3-step */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Sådan kommer du i gang</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Tre skridt — første rapport indenfor en arbejdsuge.
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {STEPS.map((s) => (
              <li key={s.n} className="bg-white rounded-2xl p-7 border border-gray-100">
                <span className="block text-primary font-bold text-sm tracking-[0.15em] mb-4">{s.n}</span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10. Pricing-teaser */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14 text-center mx-auto">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Priser</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              Fra 250 kr/md. Alt inkluderet.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ingen onboarding-gebyr. Ingen lock-in. Opsig hvornår som helst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-7 border ${p.highlighted ? "border-primary bg-accent/40 shadow-lg" : "border-gray-200 bg-white"}`}
              >
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{p.tag}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{p.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900">{p.price}{p.price !== "Tilbud" && " kr"}</span>
                  <span className="text-sm text-gray-500 ml-1">{p.period}</span>
                </div>
                <p className="text-xs text-gray-500 mb-5">{p.monthlyPrice}</p>
                <ul className="space-y-2 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  className={`block text-center px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    p.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-gray-600">
            <a href="/priser" className="text-primary font-semibold hover:underline">Se fuld feature-sammenligning →</a>
          </p>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Spørgsmål & svar</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Det folk normalt spørger om.
            </h2>
          </div>
          <Accordion type="single" collapsible className="bg-white rounded-2xl border border-gray-200 px-6">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="last:border-b-0">
                <AccordionTrigger className="text-left text-base font-semibold text-gray-900 py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-[15px] leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="py-20 sm:py-28 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-primary mb-6">
            <Gauge className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
            Klar til at få banken og kunderne ud af bagsædet?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Opret en gratis konto, tilslut Dinero, og se dit første klimaregnskab indenfor en time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              Opret gratis konto
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={DEMO_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Book 20-min demo
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

