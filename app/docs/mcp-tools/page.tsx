import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export const metadata: Metadata = {
  title: "MCP Tools Reference | qlim8 docs",
  description:
    "Full reference for all 17 tools exposed by the qlim8 MCP server. Input schemas, example output, scope requirements and tier gates.",
  alternates: { canonical: "https://qlim8.com/docs/mcp-tools" },
  openGraph: {
    title: "qlim8 MCP Tools Reference",
    description: "All 17 MCP tools — schemas, examples, scopes.",
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
  trailer?: string;
};

const TOOLS: Tool[] = [
  {
    name: "get_emissions_summary",
    layer: 1,
    scope: "emissions:read",
    description:
      "Returns total CO2e (market-based, in kg) aggregated by scope for this tenant. Use this to answer questions about total emissions, scope 1/2/3 breakdown, or year-over-year comparisons.",
    params: [
      { name: "from", type: "string", required: false, description: 'ISO 8601 datetime, filter on transaction date start, e.g. "2024-01-01T00:00:00Z"' },
      { name: "to", type: "string", required: false, description: 'ISO 8601 datetime, filter on transaction date end, e.g. "2024-12-31T23:59:59Z"' },
    ],
    example: `{
  "total_co2e_kg": 142300.5,
  "by_scope": {
    "1": 12000.0,
    "2": 45000.0,
    "3": 85300.5
  },
  "entry_count": 847
}`,
  },
  {
    name: "list_emissions",
    layer: 1,
    scope: "emissions:read",
    description:
      "Returns a cursor-paginated list of emission entries (each linked to an invoice/activity). Use for detailed audits or exporting raw emission data. Call repeatedly with next_cursor to page through all results.",
    params: [
      { name: "from", type: "string", required: false, description: "ISO 8601 datetime filter on transaction date start" },
      { name: "to", type: "string", required: false, description: "ISO 8601 datetime filter on transaction date end" },
      { name: "scope", type: '"1" | "2" | "3"', required: false, description: 'Filter to a GHG scope: "1" (direct), "2" (electricity), "3" (value chain)' },
      { name: "cursor", type: "string", required: false, description: "Opaque cursor from a previous next_cursor response field" },
      { name: "limit", type: "integer", required: false, description: "Results per page, 1–200 (default 25)" },
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
      "Returns the full data lineage for a single emission entry: the source invoice/activity, the emission factor used, category change history, and cryptographic audit event hashes for independent verification.",
    params: [
      { name: "id", type: "string (uuid)", required: true, description: "UUID of the emission entry to trace" },
    ],
    example: `{
  "emission_entry": {
    "id": "550e8400-...",
    "scope": "3",
    "co2e_market_based_kg": 1250.3,
    "co2e_location_based_kg": 1301.7,
    "calculated_at": "2024-03-15T14:22:00.000Z",
    "calculation_log": { "categoryName": "Road freight", "emissionFactorRegion": "DK", "emissionFactorYear": 2023 }
  },
  "activity_split": {
    "id": "7c9e6679-...",
    "category_mapped": "Road freight",
    "amount_allocated_dkk": 45000.0,
    "quantity_input": 2500.0,
    "unit_input": "km",
    "is_green_power": false,
    "ai_confidence": 0.97,
    "created_at": "2024-03-15T14:20:00.000Z"
  },
  "activity": {
    "id": "abc12345-...",
    "external_id": "INV-2024-0312",
    "transaction_date": "2024-03-12T00:00:00.000Z",
    "description": "Freight invoice March 2024",
    "amount": 45000.0,
    "currency": "DKK",
    "ingested_at": "2024-03-15T14:00:00.000Z"
  },
  "emission_factor": {
    "id": "ef123-...",
    "source": "Energistyrelsen 2023",
    "category": "Road freight",
    "region": "DK",
    "year": 2023,
    "factor_value": 0.0501,
    "unit_numerator": "kg CO2e",
    "unit_denominator": "km"
  },
  "history": {
    "category_changes": [],
    "audit_events": [
      { "id": "ae001-...", "seq": 1, "timestamp": "2024-03-15T14:22:00.000Z", "action": "emission.calculated", "actor_id": null, "hash": "a3f8b2...", "prev_hash": "000000..." }
    ]
  }
}`,
  },
  {
    name: "list_activities",
    layer: 1,
    scope: "activities:read",
    description:
      "Returns a cursor-paginated list of activities (invoices and transactions) for this tenant. Each activity is a source document that may produce one or more emission entries after categorization.",
    params: [
      { name: "from", type: "string", required: false, description: "ISO 8601 datetime filter on transaction date start" },
      { name: "to", type: "string", required: false, description: "ISO 8601 datetime filter on transaction date end" },
      { name: "cursor", type: "string", required: false, description: "Opaque cursor from a previous next_cursor" },
      { name: "limit", type: "integer", required: false, description: "Results per page, 1–200 (default 25)" },
    ],
    example: `{
  "data": [
    {
      "id": "abc12345-...",
      "department_id": null,
      "data_source_id": "ds001-...",
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
    description: "Returns all previously generated compliance reports for this tenant (VSME, CSRD, etc.).",
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
    description: 'Returns the status of a report render job. Poll until status is "completed" or "failed".',
    params: [
      { name: "id", type: "string (uuid)", required: true, description: "UUID of the report job (from generate_report) or a generated report" },
    ],
    example: `{
  "id": "job001-...",
  "status": "completed",
  "report_year": 2024,
  "standard_type": "vsme_basic",
  "queued_at": "2025-01-10T08:50:00.000Z",
  "started_at": "2025-01-10T08:50:05.000Z",
  "completed_at": "2025-01-10T08:51:30.000Z",
  "failed_at": null,
  "failure_reason": null,
  "generated_report_id": "rpt001-..."
}`,
    trailer: "Status values: queued → running → completed | failed",
  },
  {
    name: "generate_report",
    layer: 1,
    scope: "reports:generate",
    description: "Triggers an async report render job. Returns a job ID for polling with get_report_status. Idempotent for in-flight jobs.",
    params: [
      { name: "report_year", type: "integer", required: true, description: "Calendar year the report covers, e.g. 2024" },
      { name: "standard_type", type: "string", required: true, description: '"vsme_basic", "vsme_bp", "vsme_comprehensive", or "csrd"' },
      { name: "format", type: '"pdf" | "xlsx"', required: false, description: 'Output format (default: "pdf")' },
    ],
    example: `{
  "id": "job001-...",
  "status": "queued",
  "report_year": 2024,
  "standard_type": "vsme_basic",
  "queued_at": "2025-01-10T08:50:00.000Z",
  "started_at": null,
  "completed_at": null,
  "failed_at": null,
  "failure_reason": null,
  "generated_report_id": null
}`,
  },
  {
    name: "list_targets",
    layer: 2,
    scope: "targets:read",
    description: "Returns all CO2 reduction targets for this tenant.",
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
    "category": null,
    "description": "Aligned with 1.5°C pathway",
    "is_active": true,
    "created_at": "2023-06-01T10:00:00.000Z"
  }
]`,
  },
  {
    name: "create_target",
    layer: 2,
    scope: "targets:write",
    description: "Creates a new CO2 reduction target. Returns the created target with its assigned ID.",
    params: [
      { name: "name", type: "string", required: true, description: "Display name, max 120 chars" },
      { name: "baseline_year", type: "integer", required: true, description: "Reference year, e.g. 2019" },
      { name: "baseline_emissions", type: "number", required: true, description: "Total CO2e in baseline year (tonnes), ≥ 0" },
      { name: "target_year", type: "integer", required: true, description: "Year to achieve the reduction, e.g. 2030" },
      { name: "target_reduction_percent", type: "number", required: true, description: "Percentage reduction, 0–100" },
      { name: "scope", type: "string", required: false, description: '"1", "2", "3", "1+2", or "all"' },
      { name: "category", type: "string", required: false, description: 'Emission category, e.g. "Purchased electricity"' },
      { name: "description", type: "string", required: false, description: "Narrative, max 2000 chars" },
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
    description: "Returns the emission factor catalog. Each factor maps category + region + year to kg CO2e per unit.",
    params: [
      { name: "category", type: "string", required: false, description: 'Filter by category name, e.g. "Electricity, Denmark"' },
      { name: "region", type: "string", required: false, description: 'Filter by region code, e.g. "DK", "EU", "WORLD"' },
      { name: "cursor", type: "string", required: false, description: "Opaque cursor from next_cursor" },
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
    description: "Returns how many of this tenant's emission entries used a specific emission factor, plus a sample of entry IDs. Use for auditor self-service.",
    params: [
      { name: "id", type: "string (uuid)", required: true, description: "UUID of the emission factor" },
    ],
    example: `{
  "factor": { "id": "ef001-...", "source": "Energistyrelsen 2023", "category": "Electricity, Denmark", "region": "DK", "year": 2023, "factor_value": 0.132, "unit_numerator": "kg CO2e", "unit_denominator": "kWh" },
  "citation_count": 142,
  "sample_emission_entry_ids": ["550e8400-...", "7c9e6679-..."]
}`,
  },
  {
    name: "list_suppliers",
    layer: 2,
    scope: "suppliers:read",
    tierGate: "Enterprise (supplyChain feature)",
    description: "Returns all Scope 3 supplier connections including disclosure status. Enterprise plan required.",
    params: [
      { name: "year", type: "integer", required: false, description: "Filter to a specific report year, e.g. 2024" },
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
    "invited_email": "supplier@acme.dk",
    "accepted_at": "2024-02-01T12:00:00.000Z",
    "revoked_at": null
  }
]`,
  },
  {
    name: "get_value_chain_coverage",
    layer: 2,
    scope: "suppliers:read",
    tierGate: "Enterprise",
    description: "Returns the percentage of total supplier spend covered by active Scope 3 disclosures. Enterprise plan required.",
    params: [
      { name: "year", type: "integer", required: false, description: "Report year (defaults to most recent year with data)" },
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
    description: "Returns suppliers sorted by trade amount descending — shows which suppliers represent the largest Scope 3 risk. Enterprise plan required.",
    params: [
      { name: "year", type: "integer", required: false, description: "Report year (defaults to most recent year with data)" },
    ],
    example: `{
  "report_year": 2024,
  "suppliers": [
    { "supplier_identifier": "12345678", "supplier_name": "Acme Transport A/S", "supplier_country": "DK", "status": "active", "trade_amount": 450000.0 },
    { "supplier_identifier": "87654321", "supplier_name": "BuildCo A/S", "supplier_country": "DK", "status": "pending", "trade_amount": 320000.0 }
  ]
}`,
  },
  {
    name: "list_webhooks",
    layer: 3,
    scope: "webhooks:read",
    description: "Returns all webhook subscriptions for this tenant.",
    params: [],
    example: `[
  {
    "id": "wh001-...",
    "url": "https://your-app.com/webhooks/qlim8",
    "description": "Production webhook",
    "events": ["emission.created", "report.completed"],
    "environment": "live",
    "is_active": true,
    "last_delivered_at": "2024-03-15T14:22:00.000Z",
    "last_failed_at": null,
    "deactivated_reason": null,
    "signing_secret_last_four": "Xk9p",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]`,
  },
  {
    name: "create_webhook",
    layer: 3,
    scope: "webhooks:manage",
    description: "Creates a new webhook subscription. Returns the signing secret once — store it securely. Available event types (partial list — see full list at GET /api/mcp/schema): emission.created, emission.updated, activity.created, report.completed, supplier.invited, supplier.accepted, target.created.",
    params: [
      { name: "url", type: "string (url)", required: true, description: 'HTTPS endpoint, e.g. "https://your-app.com/webhooks/qlim8"' },
      { name: "events", type: "string[]", required: true, description: "One or more event types to subscribe to" },
      { name: "description", type: "string", required: false, description: "Human-readable label, max 200 chars" },
      { name: "environment", type: '"live" | "sandbox"', required: false, description: "Defaults to the key's environment" },
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
    trailer: "Example output shows signing_secret only once. Use it to verify incoming payloads — see qlim8 docs for HMAC-SHA256 verification snippets.",
  },
  {
    name: "get_webhook_deliveries",
    layer: 3,
    scope: "webhooks:read",
    description: "Returns the 100 most recent delivery attempts for a webhook, newest first.",
    params: [
      { name: "webhook_id", type: "string (uuid)", required: true, description: "UUID of the webhook subscription" },
    ],
    example: `[
  {
    "id": "del001-...",
    "webhook_id": "wh001-...",
    "event": "emission.created",
    "schema_version": "2026-05",
    "status": "delivered",
    "attempt_count": 1,
    "last_attempt_at": "2024-03-15T14:22:05.000Z",
    "last_response_status": 200,
    "last_response_latency_ms": 87,
    "next_attempt_at": null,
    "delivered_at": "2024-03-15T14:22:05.000Z",
    "created_at": "2024-03-15T14:22:00.000Z"
  }
]`,
    trailer: "Delivery status values: pending, delivered, failed, retrying",
  },
];

const LAYERS = [
  { n: 1 as const, title: "Layer 1 — Core" },
  { n: 2 as const, title: "Layer 2 — Strategic" },
  { n: 3 as const, title: "Layer 3 — Infrastructure" },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div id={tool.name} className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-8 scroll-mt-24">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-mono mb-2">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Layer {tool.layer}
        {tool.tierGate && <> · {tool.tierGate}</>}
        {" · "}Required scope: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[13px]">{tool.scope}</code>
      </p>
      <p className="text-gray-700 text-[15px] leading-relaxed mb-4">{tool.description}</p>

      {tool.params.length > 0 ? (
        <div className="mb-4 overflow-x-auto">
          <p className="text-[13px] font-semibold text-gray-900 mb-2">Input schema</p>
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left font-semibold text-gray-700 py-2 pr-3">Parameter</th>
                <th className="text-left font-semibold text-gray-700 py-2 pr-3">Type</th>
                <th className="text-left font-semibold text-gray-700 py-2 pr-3">Required</th>
                <th className="text-left font-semibold text-gray-700 py-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tool.params.map((p) => (
                <tr key={p.name} className="align-top">
                  <td className="py-2 pr-3 font-mono text-gray-900 whitespace-nowrap">{p.name}</td>
                  <td className="py-2 pr-3 font-mono text-gray-700 whitespace-nowrap">{p.type}</td>
                  <td className="py-2 pr-3 text-gray-700">{p.required ? "Yes" : "No"}</td>
                  <td className="py-2 text-gray-700">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[13px] text-gray-600 mb-4">
          <span className="font-semibold text-gray-900">Input schema:</span> None
        </p>
      )}

      <div>
        <p className="text-[13px] font-semibold text-gray-900 mb-2">Example output</p>
        <pre className="bg-gray-900 text-gray-100 text-xs rounded-xl p-4 overflow-x-auto">
          <code>{tool.example}</code>
        </pre>
      </div>

      {tool.trailer && (
        <p className="text-sm text-gray-600 mt-3">{tool.trailer}</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-10">
        <div className="max-w-4xl mx-auto">
          <Link href="/docs" className="text-sm text-gray-600 hover:text-primary transition-colors mb-6 inline-block">
            ← Back to docs
          </Link>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            qlim8 MCP Tools Reference
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mb-6">
            Full reference for all 17 tools exposed by the qlim8 MCP server. For setup and connection examples see the{" "}
            <Link href="/docs/mcp-quickstart" className="text-primary font-semibold hover:underline">
              MCP Quickstart
            </Link>.
          </p>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            All tool names, descriptions, and parameter names are in English and optimised for LLM consumption. All dates are ISO 8601 UTC. All CO2e values are in kilograms (kg) unless noted.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-4xl mx-auto border-t border-gray-200 pt-10">
          <p className="font-semibold text-gray-900 mb-4">Contents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {LAYERS.map((L) => (
              <div key={L.n}>
                <p className="font-semibold text-gray-900 text-sm mt-3 mb-1.5">{L.title}</p>
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
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {LAYERS.map((L) => (
            <div key={L.n}>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {L.title}
                </h2>
              </div>
              <div className="space-y-6">
                {TOOLS.filter((t) => t.layer === L.n).map((t) => (
                  <ToolCard key={t.name} tool={t} />
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
              Prefer REST?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
              Every MCP tool has a corresponding REST endpoint under <code className="text-[13px] bg-white/10 px-1.5 py-0.5 rounded">/api/v1</code>. Same auth, same rate limits.
            </p>
            <Link href="/docs/api-reference" className="font-semibold text-white hover:underline text-sm">
              REST API endpoints →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
