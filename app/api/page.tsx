import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "API & MCP | qlim8 — Programmatisk adgang til klimaregnskabsdata",
  description:
    "qlim8 tilbyder REST API og en live MCP-server til programmatisk adgang til klimaregnskab, scope 1-3 og leverandørrapportering. Ideelt til CSRD-værdikædedata og AI-agenter.",
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
    title: "REST API",
    body: "Hent posteringer, emissionsdata og rapportstatus via versioneret REST under /api/v1. JSON over HTTPS, Bearer-token-auth, cursor-paginering, OpenAPI 3.1-spec.",
  },
  {
    title: "Leverandørrapportering",
    body: "CSRD-kunder kan trække scope 1-3-leverandørdata direkte fra dit qlim8-tenant — ingen manuelle Excel-runder.",
  },
  {
    title: "MCP-server (live)",
    body: "17 kuraterede tools til AI-agenter via Anthropic's Model Context Protocol. Fungerer med Claude Desktop, Cursor, Replit, Lovable og custom JSON-RPC-klienter.",
  },
  {
    title: "Granulær adgang",
    body: "API-nøgler kan begrænses til specifikke scopes (emissions:read, reports:generate, webhooks:manage m.fl.). Fuld audit-log på alle mutating-calls.",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Klimaregnskab som API
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-9 max-w-2xl">
          Træk scope 1-3-data, leverandørrapporter eller hele VSME-eksporter ud af qlim8 via REST eller MCP. Til store kunder, BI-værktøjer og custom-flows — eller til CSRD-leverandører, der har brug for konsoliderede tal på tværs af jeres SMV-leverandører.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:kontakt@qlim8.com?subject=Anmod%20om%20API-adgang"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
          >
            Anmod om API-adgang
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/docs/api-reference"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
          >
            Se API-reference
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 border-t border-gray-200 pt-10">
          {CAPABILITIES.map((c) => (
            <div key={c.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{c.title}</h2>
              <p className="text-gray-700 text-[15px] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">REST — hent månedens scope-3-data</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
            Cursor-pagineret, scope-filter. Fuld OpenAPI-spec på <code className="bg-white/10 text-gray-100 text-[13px] px-1.5 py-0.5 rounded">GET /api/v1/openapi.json</code>.
          </p>
          <pre className="bg-black/40 text-gray-100 text-xs sm:text-sm rounded-xl p-5 overflow-x-auto">
            <code>{`curl https://app.qlim8.com/api/v1/emissions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G \\
  -d "scope=3" \\
  -d "from=2026-04-01T00:00:00Z" \\
  -d "to=2026-04-30T23:59:59Z"`}</code>
          </pre>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">MCP — forbind en agent</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
            Tilføj qlim8 som MCP-server i Claude Desktop eller Cursor med samme Bearer-token. Agenten har derefter adgang til alle 17 tools direkte.
          </p>
          <pre className="bg-black/40 text-gray-100 text-xs sm:text-sm rounded-xl p-5 overflow-x-auto">
            <code>{`{
  "mcpServers": {
    "qlim8": {
      "type": "http",
      "url": "https://app.qlim8.com/api/mcp",
      "headers": {
        "Authorization": "Bearer qk_live_<your-key>"
      }
    }
  }
}`}</code>
          </pre>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 text-sm">
            <Link href="/docs/mcp-quickstart" className="font-semibold text-white hover:underline">
              MCP Quickstart →
            </Link>
            <Link href="/docs/mcp-tools" className="font-semibold text-white hover:underline">
              Tool reference →
            </Link>
          </div>
        </div>

        <p className="mt-10 text-sm text-gray-600">
          Spørgsmål om adgang, scopes eller Enterprise-features? Skriv til{" "}
          <a href="mailto:kontakt@qlim8.com" className="text-primary font-semibold hover:underline">
            kontakt@qlim8.com
          </a>.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
