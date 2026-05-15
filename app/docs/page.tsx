import type { Metadata } from "next";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { BookOpen, ArrowRight, ExternalLink, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Docs | qlim8 — Vejledninger, integration og API",
  description:
    "Dokumentation for qlim8's ESG-platform: onboarding, integrationer, datakilder og API. Fuld dokumentation er på vej.",
  alternates: { canonical: "https://qlim8.com/docs" },
  openGraph: {
    title: "qlim8 docs",
    description: "Dokumentation for qlim8's ESG-platform.",
    url: "https://qlim8.com/docs",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 docs" }],
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-20 sm:pb-28">
        <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
          Docs
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Sådan kommer du i gang med qlim8.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
          Vi er ved at samle al dokumentation ét sted. Indtil videre finder du onboarding-guides direkte i platformen, og specifikke spørgsmål kan rettes til support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href="https://app.qlim8.com"
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Onboarding-guides</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Træd ind i platformen og følg den indbyggede tour. Dækker tilslutning af regnskab, Eloverblik-fuldmagt og første rapport.
            </p>
          </a>

          <a
            href="/api"
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">API & MCP</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              REST API til CSRD-leverandørrapportering og kommende MCP-integration. Se /api for adgang og dokumentation.
            </p>
          </a>

          <a
            href="/metodologi"
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Metodologi</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Alle emissionsfaktorer, datakilder og beregningsmetoder — fuld åbenhed om hvordan dit klimaregnskab produceres.
            </p>
          </a>

          <a
            href="mailto:kontakt@qlim8.com?subject=Docs%20sp%C3%B8rgsm%C3%A5l"
            className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Support</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Specifikke spørgsmål, integration-detaljer eller technical issues? Skriv til kontakt@qlim8.com.
            </p>
          </a>
        </div>

        <div className="mt-14 bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Fuld dokumentation er på vej</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed">
            Vi arbejder på en samlet docs-portal med søgbare guides, API-referencer og videogennemgange. Følg med på blog eller skriv til os for at høre, hvornår den lander.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
