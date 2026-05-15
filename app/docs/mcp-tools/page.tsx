import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Tools Reference | qlim8 docs",
  description:
    "Fuld reference for alle 17 tools eksponeret af qlim8's MCP-server. Input-schemas, eksempel-output, scope-krav og tier-gates.",
  alternates: { canonical: "https://qlim8.com/docs/mcp-tools" },
  openGraph: {
    title: "qlim8 MCP Tools Reference",
    description: "Alle 17 MCP-tools — schemas, eksempler, scopes.",
    url: "https://qlim8.com/docs/mcp-tools",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 MCP tools" }],
  },
};

type Param = { name: string; type: string; required: boolean; description: string };

type Tool = {
  name: string;
  layer: 1 | 2 | 3;
  scope: string;
  tierGate?: string;
  description: string;
  params: Param[];
  example: string;
};

const TOOLS: Tool[] = [
  {
    name: "get_emissions_summary",
    layer: 1,
    scope: "emissions:read",
    description:
      "Returnerer total CO2e (market-based, i kg) aggregeret per scope for tenant'en. Brug til spørgsmål om total udledning, scope 1/2/3-fordeling eller år-til-år-sammenligning.",
    params: [
      { name: "from", type: "string", required: false, description: "ISO 8601 datetime, filter på transaktionsdato start" },
      { name: "to", type: "string", required: false, description: "ISO 8601 datetime, filter på transaktionsdato slut" },
    ],
    example: `{
  "total_co2e_kg": 142300.5,
  "by_scope": { "1": 12000.0, "2": 45000.0, "3": 85300.5 },
  "entry_count": 847
}`,
  },
  {
    name: "list_emissions",
    layer: 1,
    scope: "emissions:read",
    description:
      "Cursor-pagineret liste af emission-entries (hver linket til en activity). Brug til detaljerede audits eller eksport af rå emission-data. Kald gentagne gange med next_cursor for at side igennem alle resultater.",
    params: [
      { name: "from", type: "string", required: false, description: "ISO 8601 datetime start" },
      { name: "to", type: "string", required: false, description: "ISO 8601 datetime slut" },
      { name: "scope", type: '"1" | "2" | "3"', required: false, description: 'GHG-scope: "1" (direkte), "2" (el), "3" (værdikæde)' },
      { name: "cursor", type: "string", required: false, description: "Opaque cursor fra forrige next_cursor" },
      { name: "limit", type: "integer", required: false, description: "1–200 (default 25)" },
    ],
    example: `{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "scope": "3",
      "co2e_market_based_kg": 1250.3,
      "co2e_location_based_kg": 1301.7,
      "activity_split_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "created_at": "2024-03-15T14:22:00.000Z"
    }
  ],
  "next_cursor": "eyJrIjoiMjAyNC0wMy0xNVQxNDoyMjowMC4wMDBaIiwiaS..."
}`,
  },
  {
    name: "get_emission_lineage",
    layer: 1,
    scope: "emissions:read",
    description:
      "Fuld datalineage for en enkelt emission-entry: kildebilag, brugt emission factor, kategori-ændringshistorik og kryptografiske audit-event-hashes til uafhængig verifikation.",
    params: [
      { name: "id", type: "string (uuid)", required: true, description: "UUID på emission-entry'en der skal traces" },
    ],
    example: `{
  "emission_entry": { "id": "550e8400-...", "scope": "3", "co2e_market_based_kg": 1250.3, ... },
  "activity_split": { "id": "7c9e6679-...", "category_mapped": "Road freight", "ai_confidence": 0.97, ... },
  "activity": { "external_id": "INV-2024-0312", "amount": 45000.0, "currency": "DKK", ... },
  "emission_factor": { "source": "Energistyrelsen 2023", "factor_value": 0.0501, "unit_denominator": "km", ... },
  "history": { "category_changes": [], "audit_events": [{ "seq": 1, "action": "emission.calculated", "hash": "a3f8b2...", ... }] }
}`,
  },
  {
    name: "list_activities",
    layer: 1,
    scope: "activities:read",
    description:
      "Cursor-pagineret liste af activities (bilag og transaktioner). Hver activity er et kildedokument som kan producere én eller flere emission-entries efter kategorisering.",
    params: [
      { name: "from", type: "string", required: false, description: "ISO 8601 datetime start" },
      { name: "to", type: "string", required: false, description: "ISO 8601 datetime slut" },
      { name: "cursor", type: "string", required: false, description: "Opaque cursor" },
      { name: "limit", type: "integer", required: false, description: "1–200 (default 25)" },
    ],
    example: `{
  "data": [
    {
      "id": "abc12345-...",
      "external_id": "INV-2024-0312",
      "transaction_date": "2024-03-12T00:00:00.000Z",
      "description": "Freight invoice March 2024",
      "amount": 45000.0,
      "currency": "DKK",
      "is_sandbox": false,
      "created_at": "2024-03-15T14:00:00.000Z"
    }
  ],
  "next_cursor": null
}`,
  },
  {
    name: "list_reports",
    layer: 1,
    scope: "reports:read",
    description: "Alle tidligere genererede compliance-rapporter for tenant'en (VSME, CSRD, m.fl.).",
    params: [],
    example: `[
  {
    "id": "rpt001-...",
    "report_year": 2024,
    "standard_type": "vsme_basic",
    "filename": "vsme_basic_2024.pdf",
    "file_size_bytes": 245678,
    "created_at": "2025-01-10T09:00:00.000Z"
  }
]`,
  },
  {
    name: "get_report_status",
    layer: 1,
    scope: "reports:read",
    description: 'Status på et report-render-job. Poll indtil status er "completed" eller "failed". Status-værdier: queued → running → completed | failed.',
    params: [
      { name: "id", type: "string (uuid)", required: true, description: "UUID på report-jobbet (fra generate_report)" },
    ],
    example: `{
  "id": "job001-...",
  "status": "completed",
  "report_year": 2024,
  "standard_type": "vsme_basic",
  "queued_at": "2025-01-10T08:50:00.000Z",
  "started_at": "2025-01-10T08:50:05.000Z",
  "completed_at": "2025-01-10T08:51:30.000Z",
  "generated_report_id": "rpt001-..."
}`,
  },
  {
    name: "generate_report",
    layer: 1,
    scope: "reports:generate",
    description: "Trigger et async report-render-job. Returnerer job-ID til polling med get_report_status. Idempotent for in-flight jobs.",
    params: [
      { name: "report_year", type: "integer", required: true, description: "Kalenderår rapporten dækker, fx 2024" },
      { name: "standard_type", type: "string", required: true, description: '"vsme_basic", "vsme_bp", "vsme_comprehensive" eller "csrd"' },
      { name: "format", type: '"pdf" | "xlsx"', required: false, description: 'Output-format (default "pdf")' },
    ],
    example: `{
  "id": "job001-...",
  "status": "queued",
  "report_year": 2024,
  "standard_type": "vsme_basic",
  "queued_at": "2025-01-10T08:50:00.000Z",
  "generated_report_id": null
}`,
  },
  {
    name: "list_targets",
    layer: 2,
    scope: "targets:read",
    description: "Alle CO2-reduktionsmål for tenant'en.",
    params: [],
    example: `[
  {
    "id": "tgt001-...",
    "name": "Science-Based Target 2030",
    "baseline_year": 2019,
    "baseline_emissions": 500.0,
    "target_year": 2030,
    "target_reduction_percent": 46.2,
    "scope": "all",
    "is_active": true
  }
]`,
  },
  {
    name: "create_target",
    layer: 2,
    scope: "targets:write",
    description: "Opretter et nyt CO2-reduktionsmål. Returnerer det oprettede target med tildelt ID.",
    params: [
      { name: "name", type: "string", required: true, description: "Display-navn, max 120 tegn" },
      { name: "baseline_year", type: "integer", required: true, description: "Referenceår, fx 2019" },
      { name: "baseline_emissions", type: "number", required: true, description: "Total CO2e i baseline-år (tonnes), ≥ 0" },
      { name: "target_year", type: "integer", required: true, description: "År for opnåelse, fx 2030" },
      { name: "target_reduction_percent", type: "number", required: true, description: "Procent-reduktion, 0–100" },
      { name: "scope", type: "string", required: false, description: '"1", "2", "3", "1+2" eller "all"' },
      { name: "category", type: "string", required: false, description: 'Emission-kategori, fx "Purchased electricity"' },
      { name: "description", type: "string", required: false, description: "Narrativ, max 2000 tegn" },
    ],
    example: `{
  "id": "tgt002-...",
  "name": "Science-Based Target 2030",
  "baseline_year": 2019,
  "baseline_emissions": 500.0,
  "target_year": 2030,
  "target_reduction_percent": 46.2,
  "scope": "all",
  "is_active": true,
  "created_at": "2026-05-15T09:00:00.000Z"
}`,
  },
  {
    name: "list_emission_factors",
    layer: 2,
    scope: "factors:read",
    description: "Emission factor-katalog. Hver faktor mapper kategori + region + år til kg CO2e per enhed.",
    params: [
      { name: "category", type: "string", required: false, description: 'Filter på kategorinavn, fx "Electricity, Denmark"' },
      { name: "region", type: "string", required: false, description: 'Region-kode, fx "DK", "EU", "WORLD"' },
      { name: "cursor", type: "string", required: false, description: "Opaque cursor" },
      { name: "limit", type: "integer", required: false, description: "1–200 (default 25)" },
    ],
    example: `{
  "data": [
    {
      "id": "ef001-...",
      "source": "Energistyrelsen 2023",
      "category": "Electricity, Denmark",
      "region": "DK",
      "year": 2023,
      "factor_value": 0.132,
      "unit_numerator": "kg CO2e",
      "unit_denominator": "kWh"
    }
  ],
  "next_cursor": null
}`,
  },
  {
    name: "get_factor_citations",
    layer: 2,
    scope: "factors:read",
    description: "Hvor mange af tenant'ens emission-entries der har brugt en specifik emission factor, plus en stikprøve af entry-ID'er. Til auditor self-service.",
    params: [
      { name: "id", type: "string (uuid)", required: true, description: "UUID på emission factor'en" },
    ],
    example: `{
  "factor": { "id": "ef001-...", "source": "Energistyrelsen 2023", "category": "Electricity, Denmark", "region": "DK", "year": 2023, "factor_value": 0.132 },
  "citation_count": 142,
  "sample_emission_entry_ids": ["550e8400-...", "7c9e6679-..."]
}`,
  },
  {
    name: "list_suppliers",
    layer: 2,
    scope: "suppliers:read",
    tierGate: "Enterprise (supplyChain)",
    description: "Alle Scope 3-leverandørforbindelser inkl. disclosure-status. Enterprise-plan påkrævet.",
    params: [
      { name: "year", type: "integer", required: false, description: "Filter på specifikt rapportår, fx 2024" },
    ],
    example: `[
  {
    "id": "sup001-...",
    "supplier_identifier": "12345678",
    "supplier_country": "DK",
    "supplier_name": "Acme Transport A/S",
    "supplier_industry": "Road freight",
    "report_year": 2024,
    "status": "active",
    "enterprise_trade_amount": 450000.0,
    "enterprise_trade_currency": "DKK",
    "accepted_at": "2024-02-01T12:00:00.000Z"
  }
]`,
  },
  {
    name: "get_value_chain_coverage",
    layer: 2,
    scope: "suppliers:read",
    tierGate: "Enterprise",
    description: "Procentdel af total leverandør-spend dækket af aktive Scope 3-disclosures. Enterprise-plan påkrævet.",
    params: [
      { name: "year", type: "integer", required: false, description: "Rapportår (default: seneste år med data)" },
    ],
    example: `{
  "report_year": 2024,
  "total_supplier_count": 45,
  "active_supplier_count": 32,
  "coverage_pct": 71.1,
  "total_trade_amount": 12500000.0,
  "covered_trade_amount": 8887500.0
}`,
  },
  {
    name: "get_value_chain_exposure",
    layer: 2,
    scope: "suppliers:read",
    tierGate: "Enterprise",
    description: "Leverandører sorteret efter trade amount faldende — viser hvilke leverandører der udgør den største Scope 3-risiko. Enterprise-plan påkrævet.",
    params: [
      { name: "year", type: "integer", required: false, description: "Rapportår (default: seneste år med data)" },
    ],
    example: `{
  "report_year": 2024,
  "suppliers": [
    { "supplier_identifier": "12345678", "supplier_name": "Acme Transport A/S", "status": "active", "trade_amount": 450000.0 },
    { "supplier_identifier": "87654321", "supplier_name": "BuildCo A/S", "status": "pending", "trade_amount": 320000.0 }
  ]
}`,
  },
  {
    name: "list_webhooks",
    layer: 3,
    scope: "webhooks:read",
    description: "Alle webhook-abonnementer for tenant'en.",
    params: [],
    example: `[
  {
    "id": "wh001-...",
    "url": "https://your-app.com/webhooks/qlim8",
    "events": ["emission.created", "report.completed"],
    "environment": "live",
    "is_active": true,
    "last_delivered_at": "2024-03-15T14:22:00.000Z",
    "signing_secret_last_four": "Xk9p"
  }
]`,
  },
  {
    name: "create_webhook",
    layer: 3,
    scope: "webhooks:manage",
    description: "Opretter et nyt webhook-abonnement. Returnerer signing_secret én gang — gem den sikkert. Tilgængelige events: emission.created, emission.updated, activity.created, report.completed, supplier.invited, supplier.accepted, target.created.",
    params: [
      { name: "url", type: "string (url)", required: true, description: "HTTPS-endpoint" },
      { name: "events", type: "string[]", required: true, description: "Én eller flere event-typer at abonnere på" },
      { name: "description", type: "string", required: false, description: "Human-readable label, max 200 tegn" },
      { name: "environment", type: '"live" | "sandbox"', required: false, description: "Default: nøglens environment" },
    ],
    example: `{
  "id": "wh001-...",
  "url": "https://your-app.com/webhooks/qlim8",
  "events": ["emission.created"],
  "environment": "live",
  "is_active": true,
  "signing_secret": "whsec_abc123...",
  "signing_secret_last_four": "123.",
  "created_at": "2024-03-15T14:00:00.000Z"
}`,
  },
  {
    name: "get_webhook_deliveries",
    layer: 3,
    scope: "webhooks:read",
    description: "De 100 seneste leverings-forsøg for et webhook, nyeste først. Status-værdier: pending, delivered, failed, retrying.",
    params: [
      { name: "webhook_id", type: "string (uuid)", required: true, description: "UUID på webhook-abonnementet" },
    ],
    example: `[
  {
    "id": "del001-...",
    "webhook_id": "wh001-...",
    "event": "emission.created",
    "schema_version": "2026-05",
    "status": "delivered",
    "attempt_count": 1,
    "last_response_status": 200,
    "last_response_latency_ms": 87,
    "delivered_at": "2024-03-15T14:22:05.000Z"
  }
]`,
  },
];

const LAYERS = [
  { n: 1 as const, title: "Layer 1 — Core", note: "Mest almindelige use cases for agenter og analytikere." },
  { n: 2 as const, title: "Layer 2 — Strategic", note: "Mål, factor-katalog og value-chain-tools (Enterprise)." },
  { n: 3 as const, title: "Layer 3 — Infrastructure", note: "Webhook-abonnementer og delivery-logs." },
];

function LayerBadge({ n }: { n: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent text-primary text-[11px] font-semibold uppercase tracking-wider">
      Layer {n}
    </span>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div id={tool.name} className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-8 scroll-mt-24">
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-mono">{tool.name}</h3>
        <LayerBadge n={tool.layer} />
        {tool.tierGate && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-900 text-white text-[11px] font-semibold uppercase tracking-wider">
            {tool.tierGate}
          </span>
        )}
      </div>
      <p className="text-gray-700 text-[15px] leading-relaxed mb-4">{tool.description}</p>
      <p className="text-[13px] text-gray-600 mb-4">
        <span className="font-semibold text-gray-900">Required scope:</span>{" "}
        <code className="bg-gray-100 px-1.5 py-0.5 rounded">{tool.scope}</code>
      </p>

      {tool.params.length > 0 ? (
        <div className="mb-4 overflow-x-auto">
          <p className="text-[13px] font-semibold text-gray-900 mb-2">Input schema</p>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left font-semibold text-gray-700 py-2 pr-3">Parameter</th>
                <th className="text-left font-semibold text-gray-700 py-2 pr-3">Type</th>
                <th className="text-left font-semibold text-gray-700 py-2 pr-3">Krav</th>
                <th className="text-left font-semibold text-gray-700 py-2">Beskrivelse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tool.params.map((p) => (
                <tr key={p.name} className="align-top">
                  <td className="py-2 pr-3 font-mono text-gray-900 whitespace-nowrap">{p.name}</td>
                  <td className="py-2 pr-3 font-mono text-gray-700 whitespace-nowrap">{p.type}</td>
                  <td className="py-2 pr-3 text-gray-700">{p.required ? "Ja" : "Nej"}</td>
                  <td className="py-2 text-gray-700">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[13px] text-gray-600 mb-4">
          <span className="font-semibold text-gray-900">Input schema:</span> ingen parametre
        </p>
      )}

      <div>
        <p className="text-[13px] font-semibold text-gray-900 mb-2">Eksempel-output</p>
        <pre className="bg-black/90 text-gray-100 text-xs rounded-xl p-4 overflow-x-auto">
          <code>{tool.example}</code>
        </pre>
      </div>
    </div>
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
            MCP Tools Reference
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            17 tools til AI-agenter.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mb-6">
            Fuld reference for alle tools eksponeret af qlim8's MCP-server. Tool-navne, beskrivelser og parametre er på engelsk og optimeret til LLM-konsumtion. Alle datoer er ISO 8601 UTC. Alle CO2e-værdier er i kilogram (kg) medmindre andet er noteret.
          </p>
          <p className="text-sm text-gray-600">
            For setup og forbindelses-eksempler, se{" "}
            <Link href="/docs/mcp-quickstart" className="text-primary font-semibold hover:underline">
              MCP Quickstart
            </Link>.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Indholdsfortegnelse</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {LAYERS.map((L) => (
                <div key={L.n}>
                  <p className="font-semibold text-gray-900 text-sm mt-2 mb-1.5">{L.title}</p>
                  <ul className="space-y-1">
                    {TOOLS.filter((t) => t.layer === L.n).map((t) => (
                      <li key={t.name}>
                        <a href={`#${t.name}`} className="text-[13px] font-mono text-primary hover:underline">
                          {t.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {LAYERS.map((L) => (
            <div key={L.n}>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {L.title}
                </h2>
                <p className="text-gray-600 text-[15px]">{L.note}</p>
              </div>
              <div className="space-y-6">
                {TOOLS.filter((t) => t.layer === L.n).map((t) => (
                  <ToolCard key={t.name} tool={t} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Foretrækker du REST?
            </h2>
            <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-6">
              Hvert MCP-tool har et tilsvarende REST-endpoint under <code className="text-[13px] bg-white/10 px-1.5 py-0.5 rounded">/api/v1</code>. Samme auth, samme rate-limits.
            </p>
            <Link
              href="/docs/api-reference"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              REST API endpoints
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
