import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

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

function Method({ method }: { method: Endpoint["method"] }) {
  return (
    <span className="font-mono text-[12px] font-semibold text-gray-500 uppercase">
      {method}
    </span>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/docs" className="text-sm text-gray-600 hover:text-primary transition-colors mb-6 inline-block">
            ← Tilbage til docs
          </Link>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            REST API v1 reference
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            qlim8's public REST API. Bearer-tokens (apiKeys-tabellen), cursor-pagineret, RFC 7807-fejlformat, OpenAPI 3.1-spec eksponeret. Tier-gates per endpoint via subscriptionFeatures.
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-gray-200 pt-6 text-sm">
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Auth</dt>
              <dd className="font-mono text-gray-900">Authorization: Bearer &lt;key&gt;</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Errors</dt>
              <dd className="text-gray-900">application/problem+json (RFC 7807)</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Rate-limit</dt>
              <dd className="text-gray-900">Delt bucket med MCP, 100 req/min pr. key</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Pagination</dt>
              <dd className="text-gray-900">limit (default 20, max 100), cursor (base64-keyset)</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-4xl mx-auto border-t border-gray-200 pt-10">
          <p className="font-semibold text-gray-900 mb-4">Indholdsfortegnelse</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2">
            {GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="text-sm text-primary font-semibold hover:underline">
                {g.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-14">
          {GROUPS.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <div className="mb-5 border-t border-gray-200 pt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  {g.title}
                </h2>
                {g.intro && (
                  <p className="text-gray-600 text-[14px] mt-1.5">{g.intro}</p>
                )}
              </div>
              <table className="w-full text-sm border-collapse">
                <tbody className="divide-y divide-gray-200">
                  {g.endpoints.map((e) => (
                    <tr key={`${e.method}-${e.path}`} className="align-top">
                      <td className="py-3 pr-4 w-20"><Method method={e.method} /></td>
                      <td className="py-3 pr-4 font-mono text-[13px] text-gray-900 break-all">{e.path}</td>
                      <td className="py-3 text-gray-700 hidden sm:table-cell">{e.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Kendte begrænsninger</h2>
            <ul className="space-y-2 text-gray-700 text-base">
              <li>— Ingen versionering ud over /v1 — breaking changes kræver /v2.</li>
              <li>— Cursor-pagineret kun — ingen offset-pagination.</li>
              <li>— Bulk-operations mangler (fx batch-opret aktiviteter).</li>
              <li>— Rate-limit pr. tenant, ikke pr. nøgle — én nøgle kan udmatte hele tenant-bucketet.</li>
            </ul>
          </div>

          <div className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
              Foretrækker du JSON-RPC og agent-tools?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-7 max-w-2xl">
              Hvert REST-endpoint har et tilsvarende MCP-tool. Samme auth, samme rate-limits, optimeret til AI-agenter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <Link href="/docs/mcp-quickstart" className="font-semibold text-white hover:underline">
                MCP Quickstart →
              </Link>
              <Link href="/docs/mcp-tools" className="font-semibold text-white hover:underline">
                Tool reference →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
