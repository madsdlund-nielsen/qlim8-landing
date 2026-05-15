"use client";
import { Leaf, Users, Target, Heart, User } from "lucide-react";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function About() {
  const handleGetAccess = () => {
    window.location.href = "/pricing";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24 pb-24 sm:pb-16 lg:pb-24">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6" data-testid="text-about-title">
            Vi demokratiserer klimaregnskab
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hos qlim8 tror vi på, at alle virksomheder — uanset størrelse — fortjener adgang til professionelle klimaværktøjer. Vi tilbyder løsninger, der er både enkle og overkommelig.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mb-10 sm:mb-16">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden mx-auto mb-3 sm:mb-4 border border-gray-300">
              <img src="/branding/founder-mugshot.png" alt="Grundlægger" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Grundlægger</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Jeg grundlagde qlim8 med en klar mission: At bringe en håndgribelig løsning ud til danske virksomheder, der giver mulighed for reel klimahandling. Som civilingeniør med speciale i energisystemer og energiteknologier har jeg dedikeret mig til at levere løsninger der både er teknisk stærke, brugervenlige og bæredygtige.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 text-center">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Vores Mission</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              At gøre klimaregnskab tilgængeligt og overkommeligt for danske SMV'er, så de kan fokusere på at drive bæredygtig forretning.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 text-center sm:col-span-2 md:col-span-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Vores Værdier</h3>
            <p className="text-xs font-semibold text-primary mb-3 sm:mb-4 tracking-wide">Ordentlighed | Impact | Dialog</p>
            <p className="text-xs sm:text-sm text-gray-600">
              Vi dyrker faglig ordentlighed og den direkte dialog, hvor vejen fra tanke til handling er kort. For os handler det ikke om at bruge smarte buzzwords, men om at udvikle løsninger, der er teknisk robuste, brugervenlige, og som skaber en målbar værdi for både din forretning og klimaet.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Hvorfor qlim8?</h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-600">
            <p>
              Mange danske SMV'er står over for stigende krav om ESG-rapportering fra banker, kunder og lovgivning. De eksisterende løsninger er ofte designet til store virksomheder med dedikerede bæredygtighedsafdelinger—og priser derefter.
            </p>
            <p>
              qlim8 ændrer det. Vi har bygget en moderne, dansk-fokuseret platform, der automatiserer dataindsamling, anvender korrekte emissionsfaktorer og genererer revisionsklare rapporter. Alt sammen til en pris, som SMV'er kan forholde sig til.
            </p>
            <p>
              Med integration til e-conomic, AI-drevet fakturaanalyse og danske emissionsfaktorer fra Energinet og Danmarks Statistik, får du et klimaregnskab, der er både præcist og effektivt.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Spørgsmål? Kontakt os{" "}
            <a href="/kontakt" className="text-primary hover:text-primary font-medium">
              her.
            </a>
          </p>
        </div>
      </div>

      <SiteFooter />

      <MobileStickyCTA 
        text="Kom i gang" 
        onClick={handleGetAccess} 
        showAfterScroll={300}
      />
    </div>
  );
}
