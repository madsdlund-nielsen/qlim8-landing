"use client";
import { ArrowRight, Mail } from "lucide-react";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function About() {
  const handleGetAccess = () => {
    window.location.href = "/priser";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-24 sm:pb-28">
        <header className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            Om os
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Vi er kedelige med vilje.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            qlim8 er bygget af én ingeniør, der var træt af at se SMV'er betale 80.000 kr for en ESG-rapport, banken kunne have læst på 5 minutter. Klimaregnskab burde være lige så uspændende som lønudbetaling: korrekt, til tiden, uden drama.
          </p>
        </header>

        <section className="space-y-7 mb-14">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <img
                src="/branding/founder-mugshot.png"
                alt="qlim8 grundlægger"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Grundlægger</p>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-2">
                Civilingeniør · energisystemer
              </h2>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Jeg startede qlim8 fordi jeg havde set én konsulent for mange tage 60.000 kr for at klippe data fra Excel og kalde det "scope 3". Mit fag er energisystemer — og at automatisere det manuelle arbejde der alligevel skal laves. Det er den platform du logger ind på.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-10 mb-14">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
              Det vi tror på
            </h2>
            <ul className="space-y-4">
              <li className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  <strong className="text-gray-900">Klimaregnskab er bogføring, ikke marketing.</strong> Ingen badges, ingen mærkninger, ingen falske grønne løfter. Bare tal, der står til revisorens efterprøvelse.
                </p>
              </li>
              <li className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  <strong className="text-gray-900">Hvis det ikke er sporbart, så tæller det ikke.</strong> Hver beregning har et unikt ID, en kilde og en formel. Du skal kunne stå på mål for hver linje i dit klimaregnskab.
                </p>
              </li>
              <li className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  <strong className="text-gray-900">SMV'er fortjener samme værktøjer som de store.</strong> CSRD-virksomheder har dedikerede teams. Du har 90 minutter en torsdag. Vi bygger til den virkelighed.
                </p>
              </li>
              <li className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="text-[15px] text-gray-800 leading-relaxed">
                  <strong className="text-gray-900">Vi siger fra, når det er bullshit.</strong> Hvis et tal er for godt til at være sandt, flagger vi det. Hvis en metode ikke holder, bruger vi den ikke. Ingen "optimering" af scope-3-data.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10 mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Selskab</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 leading-tight">
            qlim8 ApS
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-300">
            <div>
              <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">CVR</dt>
              <dd>DK46033736</dd>
            </div>
            <div>
              <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Stiftet</dt>
              <dd>2024</dd>
            </div>
            <div>
              <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Hosting</dt>
              <dd>Hetzner, Tyskland (EU)</dd>
            </div>
            <div>
              <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Kontakt</dt>
              <dd>
                <a href="mailto:kontakt@qlim8.com" className="hover:text-white transition-colors">
                  kontakt@qlim8.com
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
            Vil du høre mere?
          </h2>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-6 max-w-xl mx-auto">
            Skriv direkte. Ingen sales-team mellem dig og personen der har bygget platformen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/priser"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              Se priser
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:kontakt@qlim8.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
            >
              <Mail className="h-4 w-4" />
              kontakt@qlim8.com
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />

      <MobileStickyCTA
        text="Se priser"
        onClick={handleGetAccess}
        showAfterScroll={300}
      />
    </div>
  );
}
