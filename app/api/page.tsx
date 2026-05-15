import type { Metadata } from "next";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ArrowRight, Code, Zap, Lock, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "API & MCP | qlim8 — Programmatisk adgang til klimaregnskabsdata",
  description:
    "qlim8 tilbyder REST API og kommende MCP-server til programmatisk adgang til klimaregnskab, scope 1-3 og leverandørrapportering. Ideelt til CSRD-værdikædedata.",
  alternates: { canonical: "https://qlim8.com/api" },
  openGraph: {
    title: "qlim8 API & MCP",
    description: "REST API og MCP-server til programmatisk adgang til klimaregnskabsdata.",
    url: "https://qlim8.com/api",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 API" }],
  },
};

const CAPABILITIES = [
  {
    icon: Code,
    title: "REST API",
    body: "Hent posteringer, emissionsdata og rapportstatus via versioneret REST. JSON over HTTPS, Bearer-token-autentificering.",
  },
  {
    icon: GitBranch,
    title: "Leverandørrapportering",
    body: "CSRD-kunder kan trække scope 1-3-leverandørdata direkte fra dit qlim8-tenant — ingen manuelle Excel-runder.",
  },
  {
    icon: Zap,
    title: "MCP-server (kommende)",
    body: "Klimaregnskab som første-klasses agent-tool. Forbind dine LLM-flows til qlim8 via Anthropic's Model Context Protocol.",
  },
  {
    icon: Lock,
    title: "Granulær adgang",
    body: "API-nøgler kan begrænses til specifikke moduler, rapportperioder eller CVR-numre. Fuld audit-log.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12">
        <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
          API & MCP
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Klimaregnskab som API.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-9 max-w-2xl">
          Træk scope 1-3-data, leverandørrapporter eller hele VSME-eksporter ud af qlim8 via REST. Til store kunder, BI-værktøjer og custom-flows — eller til CSRD-leverandører, der har brug for konsoliderede tal på tværs af jeres SMV-leverandører.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:kontakt@qlim8.com?subject=Anmod%20om%20API-adgang"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
          >
            Anmod om API-adgang
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/docs"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
          >
            Se docs
          </a>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CAPABILITIES.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="bg-white border border-gray-200 rounded-2xl p-7">
                <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">{c.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Eksempel: hent månedens scope-3-data</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
            En kort visning af hvordan en autoriseret klient kan trække data ud. Fuld OpenAPI-spec leveres med API-adgang.
          </p>
          <pre className="bg-black/40 text-gray-100 text-xs sm:text-sm rounded-xl p-5 overflow-x-auto">
            <code>{`curl https://api.qlim8.com/v1/emissions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G \\
  -d "scope=3" \\
  -d "period=2026-04"`}</code>
          </pre>
        </div>

        <div className="mt-10 text-center text-sm text-gray-600">
          MCP-integration er på roadmap'et til 2026 Q3. Skriv til{" "}
          <a href="mailto:kontakt@qlim8.com" className="text-primary font-semibold hover:underline">
            kontakt@qlim8.com
          </a>{" "}
          for tidlig adgang.
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
