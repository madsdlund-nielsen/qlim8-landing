import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "REST API v1 Reference | qlim8 docs",
  description:
    "Komplet endpoint-reference for qlim8's /api/v1. Bearer-auth, cursor-paginering, RFC 7807-fejlformat, OpenAPI 3.1-spec.",
  alternates: { canonical: "https://qlim8.com/docs/api-reference" },
  openGraph: {
    title: "qlim8 REST API v1 Reference",
    description: "Alle /api/v1 endpoints — identity, emissions, factors, reports, webhooks m.fl.",
    url: "https://qlim8.com/docs/api-reference",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 API v1" }],
  },
};

type Endpoint = { method: "GET" | "POST" | "PUT" | "DELETE"; path: string; description: string };

type Group = {
  id: string;
  title: string;
  intro?: string;
  endpoints: Endpoint[];
};

const GROUPS: Group[] = [
  {
    id: "identity",
    title: "Identity & keys",
    endpoints: [
      { method: "GET", path: "/v1/me", description: "Aktuel API-key-holder + tenant." },
      { method: "POST", path: "/v1/api-keys", description: "Opret ny nøgle (tenant eller 3.-part)." },
      { method: "GET", path: "/v1/api-keys", description: "List nøgler." },
      { method: "DELETE", path: "/v1/api-keys/{id}", description: "Tilbagekald." },
    ],
  },
  {
    id: "emissions",
    title: "Emissions & activities",
    endpoints: [
      { method: "GET", path: "/v1/emissions", description: "List emission-entries (cursor-pagineret)." },
      { method: "GET", path: "/v1/emissions/{id}", description: "Enkelt entry." },
      { method: "GET", path: "/v1/activities", description: "List activities (filtre: dato, dataSource)." },
      { method: "GET", path: "/v1/activities/{id}", description: "Enkelt activity." },
    ],
  },
  {
    id: "factors",
    title: "Factors & lineage",
    endpoints: [
      { method: "GET", path: "/v1/factors", description: "Tilgængelige faktorer (DK + EXIOBASE)." },
      { method: "GET", path: "/v1/factors/{id}", description: "Enkelt faktor + citations." },
      { method: "GET", path: "/v1/lineage/{emissionEntryId}", description: "Fuld beregnings-lineage." },
    ],
  },
  {
    id: "audit",
    title: "Audit",
    endpoints: [
      { method: "GET", path: "/v1/audit", description: "Audit-log (filtre: since, until, action)." },
    ],
  },
  {
    id: "suppliers",
    title: "Suppliers (Enterprise)",
    intro: "Kræver Enterprise-tier med supplyChain-feature.",
    endpoints: [
      { method: "GET", path: "/v1/suppliers", description: "List supplier-connections." },
      { method: "POST", path: "/v1/suppliers/{id}/invite", description: "Invitér til datadeling." },
      { method: "GET", path: "/v1/suppliers/{id}/allocation", description: "Supplier-specifik allokering." },
    ],
  },
  {
    id: "targets",
    title: "Reduktionsmål",
    endpoints: [
      { method: "GET", path: "/v1/targets", description: "List mål." },
      { method: "POST", path: "/v1/targets", description: "Opret mål." },
      { method: "GET", path: "/v1/targets/{id}/progress", description: "Progress-tracking." },
    ],
  },
  {
    id: "tenant",
    title: "Tenant",
    endpoints: [
      { method: "GET", path: "/v1/tenant", description: "Aktuel tenant-metadata." },
      { method: "PUT", path: "/v1/tenant", description: "Opdatér tenant-settings." },
    ],
  },
  {
    id: "reports",
    title: "Reports (async)",
    endpoints: [
      { method: "POST", path: "/v1/reports", description: "Start rapport-generation (VSME, CSRD)." },
      { method: "GET", path: "/v1/reports", description: "List genererede rapporter." },
      { method: "GET", path: "/v1/reports/{id}", description: "Rapport + download-URL." },
      { method: "GET", path: "/v1/reports/{jobId}/status", description: "Job-status." },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    endpoints: [
      { method: "POST", path: "/v1/webhooks", description: "Opret subscription." },
      { method: "GET", path: "/v1/webhooks", description: "List." },
      { method: "DELETE", path: "/v1/webhooks/{id}", description: "Slet." },
      { method: "POST", path: "/v1/webhooks/{id}/test", description: "Send test-event." },
      { method: "POST", path: "/v1/webhooks/{id}/replay", description: "Replay fejlet leverance." },
      { method: "GET", path: "/v1/webhooks/{id}/deliveries", description: "Delivery-audit." },
    ],
  },
  {
    id: "admin",
    title: "Admin (super-admin)",
    endpoints: [
      { method: "GET", path: "/v1/admin/metrics", description: "Platform-KPIs (tenant-tæller, MRR)." },
    ],
  },
  {
    id: "openapi",
    title: "OpenAPI",
    endpoints: [
      { method: "GET", path: "/v1/openapi.json", description: "Machine-readable OpenAPI 3.1-spec (uden auth)." },
    ],
  },
];

const methodColor: Record<Endpoint["method"], string> = {
  GET: "bg-emerald-100 text-emerald-800",
  POST: "bg-blue-100 text-blue-800",
  PUT: "bg-amber-100 text-amber-800",
  DELETE: "bg-rose-100 text-rose-800",
};

function MethodBadge({ method }: { method: Endpoint["method"] }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[11px] font-bold ${methodColor[method]}`}>
      {method}
    </span>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Tilbage til docs
          </Link>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            REST API v1 Reference
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            /api/v1 — komplet endpoint-liste.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            qlim8's public REST API. Bearer-tokens (apiKeys-tabellen), cursor-pagineret, RFC 7807-fejlformat, OpenAPI 3.1-spec eksponeret. Tier-gates per endpoint via subscriptionFeatures.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Auth</p>
              <p className="text-sm font-mono text-gray-900">Authorization: Bearer &lt;key&gt;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Errors</p>
              <p className="text-sm text-gray-900">application/problem+json (RFC 7807)</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Rate-limit</p>
              <p className="text-sm text-gray-900">Delt bucket med MCP, 100 req/min pr. key</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Pagination</p>
              <p className="text-sm text-gray-900">limit (default 20, max 100), cursor (base64-keyset)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Indholdsfortegnelse
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="text-sm text-primary font-semibold hover:underline">
                  {g.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          {GROUPS.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {g.title}
                </h2>
                {g.intro && (
                  <p className="text-gray-600 text-[14px] mt-1.5">{g.intro}</p>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left font-semibold text-gray-700 py-3 px-4 w-24">Method</th>
                      <th className="text-left font-semibold text-gray-700 py-3 px-4">Path</th>
                      <th className="text-left font-semibold text-gray-700 py-3 px-4 hidden sm:table-cell">Beskrivelse</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {g.endpoints.map((e) => (
                      <tr key={`${e.method}-${e.path}`} className="align-top">
                        <td className="py-3 px-4 whitespace-nowrap"><MethodBadge method={e.method} /></td>
                        <td className="py-3 px-4 font-mono text-[13px] text-gray-900 break-all">{e.path}</td>
                        <td className="py-3 px-4 text-gray-700 hidden sm:table-cell">{e.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-7 sm:p-9">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Kendte begrænsninger</h2>
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Ingen versionering ud over /v1 — breaking changes kræver /v2.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Cursor-pagineret kun — ingen offset-pagination.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Bulk-operations mangler (fx batch-opret aktiviteter).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Rate-limit pr. tenant, ikke pr. nøgle — én nøgle kan udmatte hele tenant-bucketet.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Foretrækker du JSON-RPC og agent-tools?
            </h2>
            <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-6">
              Hvert REST-endpoint har et tilsvarende MCP-tool. Samme auth, samme rate-limits, optimeret til AI-agenter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/docs/mcp-quickstart"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                MCP Quickstart
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/mcp-tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Tool reference
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
