import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ds/Button";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { API_PAGE_SCHEMA } from "@/lib/pageSchemas";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "API & MCP: Programmatisk adgang til klimaregnskabsdata",
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
    body: "CSRD-kunder kan trække scope 1-3-leverandørdata direkte fra dit qlim8-tenant, ingen manuelle Excel-runder.",
  },
  {
    title: "MCP-server (live)",
    body: "31 kuraterede tools til AI-agenter via Anthropic's Model Context Protocol. Claude og ChatGPT forbinder med OAuth, helt uden API-nøgle, og Claude Code, Cursor, Replit, Lovable og custom JSON-RPC-klienter bruger samme Bearer-nøgler som REST-API'en.",
  },
  {
    title: "Granulær adgang",
    body: "API-nøgler kan begrænses til specifikke scopes (emissions:read, reports:generate, webhooks:manage m.fl.). Fuld audit-log på alle mutating-calls.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={API_PAGE_SCHEMA} />
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-12">
        <h1 className="mb-6">
          Klimaregnskab som API
        </h1>
        <p className="text-lead text-foreground mb-9 max-w-(--measure-body)">
          Træk scope 1-3-data, leverandørrapporter eller hele VSME-eksporter ud af qlim8 via REST eller MCP. Til store kunder, BI-værktøjer og custom-flows, eller til CSRD-leverandører, der har brug for konsoliderede tal på tværs af jeres SMV-leverandører.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="mailto:kontakt@qlim8.com?subject=Anmod%20om%20API-adgang">
            Anmod om API-adgang
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button href="/docs/api-reference" variant="outline">
            Se API-reference
          </Button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 border-t border-border pt-10">
          {CAPABILITIES.map((c) => (
            <div key={c.title}>
              <h2 className="mb-3 text-h3">{c.title}</h2>
              <p className="text-foreground text-body-sm">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-primary text-primary-foreground rounded-lg p-7 sm:p-10">
          <h2 className="mb-3 text-primary-foreground">REST: hent månedens scope-3-data</h2>
          <p className="text-primary-foreground text-body-sm mb-5">
            Cursor-pagineret, scope-filter. Fuld OpenAPI-spec på <code className="bg-primary-hover text-primary-foreground text-[13px] px-1.5 py-0.5 rounded-md">GET /api/v1/openapi.json</code>.
          </p>
          <pre className="bg-primary-hover text-primary-foreground text-xs sm:text-sm rounded-lg p-5 overflow-x-auto">
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
        <div className="bg-primary text-primary-foreground rounded-lg p-7 sm:p-10">
          <h2 className="mb-3 text-primary-foreground">MCP: forbind en agent</h2>
          <p className="text-primary-foreground text-body-sm mb-5">
            Almindelige brugere forbinder Claude eller ChatGPT via OAuth, uden API-nøgle (se MCP Quickstart). Udviklere tilføjer qlim8 i fx Claude Code eller Cursor med samme Bearer-token som REST-API'en. Agenten har derefter adgang til alle 31 tools direkte.
          </p>
          <pre className="bg-primary-hover text-primary-foreground text-xs sm:text-sm rounded-lg p-5 overflow-x-auto">
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
            <Link href="/docs/mcp-quickstart" className="font-semibold text-primary-foreground hover:underline">
              MCP Quickstart →
            </Link>
            <Link href="/docs/mcp-tools" className="font-semibold text-primary-foreground hover:underline">
              Tool reference →
            </Link>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Spørgsmål om adgang, scopes eller Koncern-funktioner? Skriv til{" "}
          <a href="mailto:kontakt@qlim8.com" className="font-semibold hover:underline">
            kontakt@qlim8.com
          </a>.
        </p>
      </section>

      <SiteFooter />
    </div>
    </>
  );
}
