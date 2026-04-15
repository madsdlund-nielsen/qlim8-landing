import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CTASection } from "@/components/public/CTASection";
import { SeoHead } from "@/components/SeoHead";
import { PromoVideoPlayer } from "@/components/public/PromoVideoPlayer";
import { SiteHeader } from "@/components/public/SiteHeader";

import feature1Img from "@assets/Dashboard_1776248536007.png";
import feature2Img from "@assets/Tour1_1776248713681.png";
import feature3Img from "@assets/Udledninger_1776248536011.png";
import feature4Img from "@assets/Bragboard_1776248536006.png";
import feature5Img from "@assets/Bragboard_1776248536006.png";

import carouselTour from "@assets/Tour1_1776248713681.png";
import carouselDashboard from "@assets/Dashboard_1776248536007.png";
import carouselDatakilder from "@assets/Datakilder_1776248536008.png";
import carouselUdledninger from "@assets/Udledninger_1776248536011.png";
import carouselTiltag from "@assets/Tiltag_1776248536010.png";
import carouselScenarier from "@assets/Scenarier_1776248536009.png";
import carouselRapportering from "@assets/Rapportering_1776248536009.png";
import carouselBragboard from "@assets/Bragboard_1776248536006.png";

const CAROUSEL_SCREENSHOTS = [
  { src: carouselTour, label: "Onboarding" },
  { src: carouselDashboard, label: "Dashboard" },
  { src: carouselDatakilder, label: "Datakilder" },
  { src: carouselUdledninger, label: "Udledninger" },
  { src: carouselTiltag, label: "Tiltag" },
  { src: carouselScenarier, label: "Scenarier" },
  { src: carouselRapportering, label: "Rapportering" },
  { src: carouselBragboard, label: "Offentlig profil" },
];

function ScreenshotCarousel() {
  const [current, setCurrent] = useState(0);
  const total = CAROUSEL_SCREENSHOTS.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <div className="relative z-20 bg-white py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
          Se platformen i aktion
        </h2>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={CAROUSEL_SCREENSHOTS[current].src}
              alt={CAROUSEL_SCREENSHOTS[current].label}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
            aria-label="Forrige"
          >
            <ChevronDown className="h-5 w-5 text-gray-700 -rotate-90" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors"
            aria-label="Næste"
          >
            <ChevronDown className="h-5 w-5 text-gray-700 rotate-90" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {CAROUSEL_SCREENSHOTS.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/75"}`}
                aria-label={s.label}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          {CAROUSEL_SCREENSHOTS[current].label}
        </p>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    id: 6,
    header: "Ja, det koster ikke mere",
    description: "Konsulenter og andre software leverandører af lignende services har skabt et falsk billede af at det er besværligt og dyrt at arbejde med ESG og at få lavet et klimaregnskab. Det har intet på sig. Her får du alt beskrevet i punkterne nedenfor fra 250 kr om måneden. ",
    image: null,
    hasModal: true,
  },
  {
    id: 4,
    header: "Afrapportering med ét tryk",
    description: "Faktisk er der lidt mere end ét tryk, men det er ikke mange. Jeg har lavet en VSME wizard der guider dig til at udfylde de få punkter systemet ikke selv kan udfylde med tilgængelig data. Når der er 12 måneders data i systemet tager det ca 10min fra du sætter dig ved computeren til du kan sende en VSME rapport der indeholder de ESG punkter bankerne har brug for. Det er nemt!",
    image: feature4Img,
  },
  {
    id: 5,
    header: "Del dit ESG arbejde med alle",
    description: "Det er næsten en skam, hvis ESG forbliver et \"hemmeligt\" dokument du udveksler med banken én gang om året. Derfor har jeg lavet en hjemmeside hvor dit klimaregnskab bliver udstillet på en flot måde. Det er en hjemmeside som du selv vælger om du vil dele med nogen, men jeg foreslår at du deler den med så mange som muligt. Lad dine kunder og samarbejdspartnere vide at ESG er noget I arbejder aktivt med.",
    image: feature5Img,
  },
  {
    id: 3,
    header: "Revisions klare beregninger",
    description: "Alle vores beregninger bliver udstyret med et unikt nummer, så din revisor vil kunne kigge beregningerne igennem hvis dette kommer på tale. Du kan også se på det som et kvalitetsstempel, da jeg faktisk står inde for hver eneste beregning der bliver lavet på platformen.",
    image: feature3Img,
  },
  {
    id: 2,
    header: "Simpel guidet onboarding",
    description: "Når du logger ind første gang vil du blive mødt af en guidet tour af platformen, der blandt også hjælper dig igennem opsætning af integration direkte med dit regnskabssystem. Vi understøtter Dinero for nuværende, men flere integrationer kommer løbende - har du forslag til integrationer der giver mening? Skriv det til mig, jeg vender tilbage med det samme.",
    image: feature2Img,
  },
  {
    id: 1,
    header: "Overblik over udledninger",
    description: "På dashboardet vises et simpelt overblik over din virksomheds udledninger, samt fordelingen på scope 1, 2 og 3. Det er også her du kan se, hvis der er noget der kræver din opmærksomhed. Den sidste vigtige brik er et nyhedsfeed, der er gemt bag en knap og kun popper up én gang når der rent faktisk er noget du bør kigge på.",
    image: feature1Img,
  },
];

export default function Landing() {
  const [language, setLanguage] = useState<"da" | "en">("da");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);


  return (
    <div className="min-h-screen bg-[#F5F5F0] overflow-x-hidden">
      <SeoHead
        title="qlim8 » Automatisk Klimaregnskab & ESG til SMV (Fra 250 kr/md)"
        description="ESG behøver ikke være dyrt. Få overblik over Scope 1, 2 & 3 samt en færdig VSME-rapport. Slip for dyre konsulenter. Fra 250 kr/md ved årsabonnement."
        canonical="https://qlim8.com/"
      />
      <SiteHeader isHome />

      {/* Hero Section with Parallax Image */}
      <div ref={heroRef} className="relative min-h-screen">
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ opacity: heroOpacity, pointerEvents: "none" }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a2218 0%, #0f3d28 30%, #1a5c3a 60%, #14532d 80%, #0a2218 100%)" }} />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, #22c55e 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, #16a34a 0%, transparent 50%)" }} />
        </motion.div>
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl font-bold text-white mb-6"
          >
            {language === "da" 
              ? "Få et revisionsklart klimaregnskab"
              : "Get an audit-ready Climate Report"
            }
          </motion.h1>
          <p 
            ref={taglineRef}
            className="text-xl sm:text-2xl text-white/90 max-w-2xl"
          >
            {language === "da" 
              ? "ESG er nemt og billigt, lad mig vise dig hvordan"
              : "ESG is easy and affordable, let me show you how"
            }
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 mt-10 flex-wrap justify-center"
          >
            <a
              href="https://app.qlim8.com/auth?tab=register"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-colors text-base sm:text-lg"
              data-testid="button-try-free"
            >
              {language === "da" ? "Prøv gratis" : "Try for free"}
            </a>
            <a
              href="/pricing"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-colors text-base sm:text-lg backdrop-blur-sm"
              data-testid="button-see-pricing"
            >
              {language === "da" ? "Se priser" : "See pricing"}
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10"
          >
            <ChevronDown className="h-8 w-8 text-white animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="relative z-20 bg-[#F5F5F0] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center mb-8">
            {language === "da" 
              ? "Her kommer mine samarbejdspartnere og integrations partnere til at blive vist løbende - skal du også være her?"
              : "My collaboration and integration partners will be displayed here - want to join?"
            }
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 text-gray-400 text-sm italic">
            {language === "da" ? "Partnere annonceres løbende" : "Partners announced continuously"}
          </div>
        </div>
      </div>

      {/* Promo Video Section */}
      <PromoVideoPlayer />

      {/* Features Section */}
      <div className="relative z-20 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="space-y-16 md:space-y-24">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                language={language}
                isExpanded={expandedCard === feature.id}
                onToggle={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                onPriceModalOpen={() => setShowPriceModal(true)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Screenshot Carousel */}
      <ScreenshotCarousel />

      {/* FAQ Section */}
      <FAQSection language={language} />

      {/* CTA Section */}
      <CTASection
        title={language === "da" ? "Lad os komme i gang" : "Let's get started"}
        description={language === "da" ? "Se hvad qlim8 kan gøre for din virksomheds klimaregnskab. Alt samlet i én enkel plan." : "See our pricing and start your climate accounting today."}
        primaryButton={{ text: language === "da" ? "Se priser" : "See pricing", href: "/pricing" }}
        variant="light"
      />

      {/* Footer */}
      <SiteFooter />

      {/* Price Definition Modal */}
      <Dialog open={showPriceModal} onOpenChange={setShowPriceModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {language === "da" ? "Virksomhedskategorier" : "Company Categories"}
            </DialogTitle>
            <DialogDescription>
              {language === "da" 
                ? "Definitioner for mikro og små virksomheder"
                : "Definitions for micro and small companies"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === "da" ? "Mikrovirksomhed" : "Micro Company"}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === "da" ? "Færre end 10 ansatte" : "Less than 10 employees"}</li>
                <li>• {language === "da" ? "Omsætning under 15 mio. DKK" : "Revenue under 15M DKK"}</li>
                <li>• {language === "da" ? "Balance under 15 mio. DKK" : "Balance sheet under 15M DKK"}</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {language === "da" ? "Lille virksomhed" : "Small Company"}
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {language === "da" ? "Færre end 50 ansatte" : "Less than 50 employees"}</li>
                <li>• {language === "da" ? "Omsætning under 75 mio. DKK" : "Revenue under 75M DKK"}</li>
                <li>• {language === "da" ? "Balance under 40 mio. DKK" : "Balance sheet under 40M DKK"}</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

const FAQ_ITEMS = {
  da: [
    {
      q: "Hvad er VSME, og skal min virksomhed lave en VSME-rapport?",
      a: "VSME (Voluntary SME Standard) er en frivillig ESG-rapporteringsstandard udviklet specifikt til små og mellemstore virksomheder. Selvom det er frivilligt, forventes det i stigende grad af banker og større samarbejdspartnere. Kravene er langt enklere end CSRD, der gælder for store virksomheder.",
    },
    {
      q: "Hvad er ESG, og hvorfor er det relevant for SMV'er?",
      a: "ESG står for Environment, Social og Governance – altså miljø, sociale forhold og ledelsesforhold. Det er et sæt kriterier, som banker, investorer og store kunder bruger til at vurdere virksomheder. For SMV'er bliver ESG stadig vigtigere, fordi store virksomheder er forpligtet til at rapportere på hele deres forsyningskæde.",
    },
    {
      q: "Hvad koster det at bruge qlim8?",
      a: "qlim8 starter fra 250 kr/md ved årsabonnement. Der er ingen skjulte gebyrer, ingen opsætningsomkostninger og ingen binding. Se alle planer og hvad der er inkluderet på vores prisside.",
    },
    {
      q: "Hvad er Scope 1, 2 og 3 udledninger?",
      a: "Scope 1 er direkte udledninger fra din virksomheds egne aktiviteter (f.eks. firmabiler og opvarmning). Scope 2 er indirekte udledninger fra den el og varme, du køber. Scope 3 dækker alle øvrige indirekte udledninger i din værdikæde – f.eks. fra leverandører, transport og medarbejdernes pendling. qlim8 hjælper dig med at kortlægge alle tre.",
    },
    {
      q: "Understøtter qlim8 integration med Dinero?",
      a: "Ja, qlim8 har direkte integration med Dinero. Det betyder, at dine regnskabsdata automatisk hentes ind i systemet, så du slipper for manuel dataindtastning. Vi arbejder løbende på at tilføje flere integrationer – har du et ønske? Skriv til os.",
    },
    {
      q: "Hvem er qlim8 lavet til?",
      a: "qlim8 er lavet til danske mikro- og små virksomheder, der ønsker at komme i gang med ESG og klimaregnskab uden at hyre dyre konsulenter. Platformen er designet til dig, der ikke er ekspert i bæredygtighed, men gerne vil gøre det rigtige for din virksomhed og dine samarbejdspartnere.",
    },
    {
      q: "Kan jeg bruge qlim8, selvom jeg aldrig har arbejdet med ESG før?",
      a: "Absolut. qlim8 er bygget med en guidet onboarding, der tager dig igennem opsætningen trin for trin. Du behøver ingen forkundskaber om ESG eller klimaregnskab – systemet forklarer undervejs, hvad du skal gøre og hvorfor.",
    },
    {
      q: "Kan jeg bruge historiske data i mit klimaregnskab?",
      a: "Ja, du kan importere historiske data for at etablere en baseline og vise udviklingen over tid. Det giver dit klimaregnskab mere troværdighed og gør det muligt at dokumentere dine fremskridt. Du vil blive guidet i, hvordan du gør dette under onboarding.",
    },
    {
      q: "Er qlim8's beregninger revisionsklare?",
      a: "Ja. Alle beregninger i qlim8 tildeles et unikt referencenummer, så din revisor kan efterprøve dem. Vi anvender anerkendte emissionsfaktorer og dokumenterer kilden til hvert datapunkt. Det giver dig og din revisor fuld sporbarhed.",
    },
  ],
  en: [
    {
      q: "What is VSME, and does my company need to produce a VSME report?",
      a: "VSME (Voluntary SME Standard) is a voluntary ESG reporting standard developed specifically for small and medium-sized enterprises. While voluntary, it is increasingly expected by banks and larger business partners. The requirements are far simpler than CSRD, which applies to large companies.",
    },
    {
      q: "What is ESG, and why is it relevant for SMEs?",
      a: "ESG stands for Environment, Social, and Governance. It is a set of criteria used by banks, investors, and large customers to evaluate companies. For SMEs, ESG is becoming increasingly important because large companies are required to report on their entire supply chain.",
    },
    {
      q: "How much does qlim8 cost?",
      a: "qlim8 starts from 250 DKK/month on an annual plan. There are no hidden fees, no setup costs, and no lock-in. See all plans and what's included on our pricing page.",
    },
    {
      q: "What are Scope 1, 2, and 3 emissions?",
      a: "Scope 1 covers direct emissions from your company's own activities (e.g., company vehicles and heating). Scope 2 covers indirect emissions from purchased electricity and heat. Scope 3 covers all other indirect emissions in your value chain – e.g., from suppliers, transport, and employee commuting. qlim8 helps you map all three.",
    },
    {
      q: "Does qlim8 integrate with Dinero?",
      a: "Yes, qlim8 has a direct integration with Dinero. This means your accounting data is automatically pulled into the system, so you don't have to enter data manually. We continuously work on adding more integrations – have a suggestion? Write to us.",
    },
    {
      q: "Who is qlim8 built for?",
      a: "qlim8 is built for Danish micro and small companies that want to get started with ESG and climate accounting without hiring expensive consultants. The platform is designed for those who are not sustainability experts but want to do the right thing for their business and partners.",
    },
    {
      q: "Can I use qlim8 even if I've never worked with ESG before?",
      a: "Absolutely. qlim8 is built with a guided onboarding that walks you through the setup step by step. No prior knowledge of ESG or climate accounting is required – the system explains what you need to do and why along the way.",
    },
    {
      q: "Can I use historical data in my climate accounting?",
      a: "Yes, you can import historical data to establish a baseline and show progress over time. This gives your climate accounts more credibility and makes it possible to document your improvements. You will be guided through how to do this during onboarding.",
    },
    {
      q: "Are qlim8's calculations audit-ready?",
      a: "Yes. All calculations in qlim8 are assigned a unique reference number so your auditor can verify them. We use recognized emission factors and document the source of each data point, giving you and your auditor full traceability.",
    },
  ],
};

function FAQSection({ language }: { language: "da" | "en" }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = FAQ_ITEMS[language];

  return (
    <div className="relative z-20 bg-[#F5F5F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12"
          data-testid="faq-heading"
        >
          {language === "da" ? "Ofte stillede spørgsmål" : "Frequently asked questions"}
        </h2>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              data-testid={`faq-item-${index}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-testid={`faq-toggle-${index}`}
                aria-expanded={openIndex === index}
              >
                <span className="text-gray-900 font-semibold text-base sm:text-lg leading-snug">
                  {item.q}
                </span>
                <span className="flex-shrink-0 text-emerald-600">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-6 pb-5 text-gray-600 leading-relaxed"
                      data-testid={`faq-answer-${index}`}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  feature: typeof FEATURES[0];
  index: number;
  language: "da" | "en";
  isExpanded: boolean;
  onToggle: () => void;
  onPriceModalOpen: () => void;
}

function FeatureCard({ feature, index, language, isExpanded, onToggle, onPriceModalOpen }: FeatureCardProps) {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
      data-testid={`feature-card-${feature.id}`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        {feature.image ? (
          <img
            src={feature.image}
            alt={feature.header}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            loading="lazy"
          />
        ) : (
          <div className="rounded-xl shadow-lg w-full aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
            <div className="text-center p-8">
              <p className="text-sm font-medium text-emerald-500 uppercase tracking-wider mb-1">
                {language === "da" ? "Fra" : "From"}
              </p>
              <span className="text-5xl font-bold text-emerald-600">250 kr</span>
              <p className="text-emerald-700 mt-2 font-medium">
                {language === "da" ? "/md ved årsabonnement" : "/month on annual plan"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.header}</h3>
        
        {/* Desktop: Always show description */}
        <p className="hidden md:block text-gray-600 leading-relaxed">
          {feature.description}
          {feature.hasModal && (
            <>
              {" "}
              <button
                onClick={onPriceModalOpen}
                className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                data-testid="button-price-modal"
              >
                {language === "da" ? "Se definitionerne her." : "See definitions here."}
              </button>
            </>
          )}
        </p>
        
        {/* Mobile: Accordion */}
        <div className="md:hidden">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-emerald-600 font-medium"
            data-testid={`button-expand-${feature.id}`}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                {language === "da" ? "Skjul" : "Hide"}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                {language === "da" ? "Læs mere" : "Read more"}
              </>
            )}
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 leading-relaxed mt-4">
                  {feature.description}
                  {feature.hasModal && (
                    <>
                      {" "}
                      <button
                        onClick={onPriceModalOpen}
                        className="text-emerald-600 hover:text-emerald-700 underline font-medium"
                      >
                        {language === "da" ? "Se definition af hvilke virksomheder vi servicerer her." : "See definitions here."}
                      </button>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
