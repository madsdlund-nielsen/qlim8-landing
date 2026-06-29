"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { NewsletterSignupDialog } from "@/components/public/NewsletterSignupDialog";
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
import kontrolcenterImg from "@assets/Feature_1_Kontrolcenter_1769884331461.jpg";
import klimahovedbogImg from "@assets/Feature_3_Klimahovedbog_1769884331462.jpg";
import rapporteringImg from "@assets/Feature_2_Rapportering_1769884331462.jpg";

const SIGNUP_URL = "https://app.qlim8.com/auth?tab=register";

const FEATURES = [
  {
    title: "Sat op én gang. Kører i baggrunden.",
    body: "Forbind dit regnskabssystem og dit Eloverblik én gang. Derefter henter qlim8 data automatisk — hver nat fra Dinero, e-conomic eller Billy, og ugentligt fra Eloverblik. AI-kategorisering placerer hver post i det rigtige scope, så dit klimaregnskab er opdateret når du har brug for det — ikke når du husker det. Når du tilkobler dit regnskab, henter qlim8 også tre måneders historisk data med det samme, så du har et reelt billede fra dag ét.",
    bullets: [
      "Natlig kørsel fra regnskab",
      'Ugentlig kørsel fra Eloverblik med "Hent nu"-knap',
      "AI-kategorisering til Scope 1, 2 og 3",
    ],
    image: kontrolcenterImg,
    reverse: false,
  },
  {
    title: "Hver beregning kan spores tilbage til kilden",
    body: 'Hver post i klimaregnskabet får et unikt ID, og du kan klikke fra dashboardet ned i den konkrete beregning — input, emissionsfaktor og kilde, sporbart fra dag ét. Når revisor spørger "hvor kommer det tal fra?", har du svaret.',
    bullets: [
      "Validerede emissionsfaktorer fra Klimakompasset, Energinet, EXIOBASE og EPD-databaser",
      "Unikt beregnings-ID på hver post, eksporterbart til Excel",
      "Direkte revisor-portal med kommentering og signering (fra Premium)",
    ],
    image: klimahovedbogImg,
    reverse: true,
  },
  {
    title: "Ikke bare et tal — en plan",
    body: "Når du har målt, vil du have en plan. qlim8 sætter reduktionsmål baseret på dine egne tal og lader dig teste konkrete tiltag i Scenario Builder — se effekten af en elbil-flåde, ny leverandør eller halverede forretningsrejser før du beslutter dig. Når du er klar, deler du via en custom PDF-rapport eller dit offentlige Brag Board, så bank, kunder og samarbejdspartnere kan se hvor I er på vej hen.",
    bullets: [
      "Reduktionsmål baseret på dine egne tal",
      "Scenario Builder — test tiltag før du beslutter",
      "Deling via custom PDF eller offentligt Brag Board",
      "Premium-features fra 625 kr/md",
    ],
    image: rapporteringImg,
    reverse: false,
  },
];

const COMMITMENTS = [
  {
    title: "1. Vi viser kilden til hvert tal.",
    body: "Hver beregning har et unikt ID, og du kan klikke fra dashboardet ned til den faktura eller måling, den stammer fra. Ingen blackbox — fordi din revisor skal kunne validere arbejdet uden at ringe til vores support.",
  },
  {
    title: "2. Vi bruger danske data, ikke approximationer.",
    body: "Eloverblik henter dit reelle elforbrug direkte fra Energinet. Klimakompassets danske emissionsfaktorer ligger nederst i datahierarkiet. Internationale platforme estimerer dansk data ud fra europæiske gennemsnit — vi gør det ikke.",
  },
  {
    title: "3. Vi tæller ikke faktorer kreativt.",
    body: "Vi har ca. 50.000 validerede emissionsfaktorer fra Klimakompasset, Energinet, EXIOBASE og førende EPD-databaser. Vi multiplicerer dem ikke kreativt med regioner og år for at få større tal. Vi vælger den rigtige faktor til den rigtige post.",
  },
  {
    title: "4. Vi behøver ikke en salgssamtale.",
    body: "Du behøver ikke booke en demo eller tale med en sælger. Opret en konto, klik rundt med eksempeldata, og forbind dit regnskab når du er klar. Det er det.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Opret en gratis konto",
    body: "Du lander i platformen med eksempeldata. Ingen kreditkort, intet salgsmøde.",
  },
  {
    n: "2",
    title: "Klik dig rundt",
    body: "En kort guided tur viser dig dashboard, klimahovedbog, rapporter og reduktionsmål — alt sammen med realistiske data, så du kan se præcis hvad du får.",
  },
  {
    n: "3",
    title: "Forbind dit regnskab",
    body: "Når du er klar, henter qlim8 tre måneders historisk data fra dit regnskabssystem. Din egen data overtager dashboardet — og din 14-dages prøveperiode starter her.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "250 kr/md",
    tag: "Til SMV'er der skal levere VSME-rapport til banken og vil have det overstået ordentligt.",
    features: [
      "Komplet Scope 1-3 klimaregnskab",
      "VSME Basis-rapport med wizard",
      "Fuld audit trail på hver beregning",
      "Alle danske integrationer",
    ],
    cta: "Start gratis",
    href: SIGNUP_URL,
    highlighted: false,
  },
  {
    name: "Premium",
    price: "625 kr/md",
    badge: "Anbefalet til de fleste",
    tag: "Til virksomheder der vil bruge ESG aktivt — reducere udledninger og dele resultater.",
    features: [
      "Alt i Starter",
      "VSME Comprehensive med wizard",
      "Reduktionsmål + Scenario Builder",
      "Custom PDF-rapport + offentligt Brag Board",
      "Fuldt REST API + MCP",
    ],
    cta: "Start gratis",
    href: SIGNUP_URL,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Kontakt",
    tag: "Til organisationer der skal indsamle VSME-rapporter fra deres supply chain.",
    features: [
      "Alt i Premium",
      "Dedikeret supply chain portal",
      "Rollebaseret adgang og rettighedsstyring",
    ],
    cta: "Kontakt os",
    href: "/kontakt?subject=Enterprise",
    highlighted: false,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] overflow-x-hidden">
      <SiteHeader isHome />

      {/* 1. Hero */}
      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
            ESG uden besværet
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-9">
            Automatisk klimaregnskab og VSME-rapport for danske SMV'er — hentet direkte fra dit regnskabssystem og elforbrug. 10 minutter om måneden, ikke 10 dage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              Prøv platformen gratis
              <ArrowRight className="h-4 w-4" />
            </a>
            <NewsletterSignupDialog />
          </div>
          <p className="text-sm text-gray-500 mb-14">
            Eksempeldata · Ingen kreditkort · Forpligt dig først ved tilkobling
          </p>

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

      {/* 2. Integrationsbånd */}
      <section className="py-16 sm:py-24 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
            Vi henter data direkte fra dine systemer
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-10">
            {["Dinero", "e-conomic", "Billy", "Eloverblik"].map((name) => (
              <div key={name} className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mb-2">
            Eloverblik: officiel tredjepart hos Energinet
          </p>
          <p className="text-center text-sm text-gray-600">
            Fuldt REST API · MCP-ready
          </p>
          <p className="text-center text-base text-gray-700 mt-10 max-w-2xl mx-auto leading-relaxed">
            Sæt integrationerne op én gang. qlim8 henter regnskabsdata og elforbrug i baggrunden.
          </p>
        </div>
      </section>

      {/* 3-5. Features */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-20 sm:space-y-28">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${f.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                    {f.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-7">
                    {f.body}
                  </p>
                  <ul className="space-y-2 text-[15px] text-gray-800">
                    {f.bullets.map((b) => (
                      <li key={b} className="leading-relaxed">— {b}</li>
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

      {/* 6. Bygget anderledes */}
      <section className="py-20 sm:py-28 bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
              Bygget anderledes
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              De fleste ESG-platforme er bygget til store virksomheder med dedikerede bæredygtighedsteams og store budgetter. qlim8 er bygget til danske SMV'er. Det former hvert valg vi har truffet.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="border-t border-white/20 pt-7">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug">{c.title}</h3>
                <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-12">
            Datakilder: Klimakompasset · Energinet · EXIOBASE · EPD International
          </p>
        </div>
      </section>

      {/* 7. Sådan kommer du i gang */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              Sådan kommer du i gang
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Du behøver ikke vide noget om ESG før du opretter dig — det viser sig selv.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-14">
            {STEPS.map((s) => (
              <li key={s.n}>
                <p className="text-4xl font-bold text-gray-300 mb-4">{s.n}</p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-gray-700 text-[15px] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
          <div>
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              Opret gratis konto
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Ingen kreditkort · Eksempeldata · Forpligt dig først ved tilkobling
            </p>
          </div>
        </div>
      </section>

      {/* 8. Pricing-teaser */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Tre planer. Find den der passer.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-7 sm:p-8 border bg-white ${
                  p.highlighted ? "border-primary shadow-lg" : "border-gray-200"
                }`}
              >
                {p.badge && (
                  <p className="text-xs font-semibold text-gray-500 mb-3">
                    {p.badge}
                  </p>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">{p.price}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 min-h-[4rem]">{p.tag}</p>
                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                  {p.features.map((feat) => (
                    <li key={feat} className="leading-relaxed">— {feat}</li>
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

          <p className="mt-10 text-sm text-gray-600">
            <a href="/priser" className="text-primary font-semibold hover:underline">
              Se fuld sammenligning →
            </a>
          </p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Spørgsmål og svar
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-gray-200">
            {HOMEPAGE_FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 py-5 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-[15px] leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-10 text-sm text-gray-600">
            <a href="/kontakt" className="text-primary font-semibold hover:underline">
              Flere spørgsmål? Kontakt os →
            </a>
          </p>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
            ESG er nemt — kom selv og se
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-9 max-w-xl">
            Du behøver hverken kreditkort eller salgsmøde. Opret en konto, klik dig rundt med eksempeldata, og tilkobl dit regnskab når du er klar.
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
          >
            Opret gratis konto
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
