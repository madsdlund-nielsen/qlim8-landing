// /.well-known/mcp.json: machine-readable discovery for the qlim8 MCP server.
//
// Served from the marketing origin on purpose. qlim8.com is the domain a crawler
// or a registry resolves the company to, while the server itself lives on
// app.qlim8.com, which is deliberately noindex. Without a document here, nothing
// on the indexed domain says the MCP server exists.
//
// The shape follows the de-facto convention (Resend's /.well-known/mcp.json is
// the reference implementation): identity, a `remote` block describing transport
// and auth, and a tool summary. It is not a substitute for the live catalog,
// which stays authoritative at app.qlim8.com/api/mcp/schema and is generated
// from server/mcp/lib/catalog.ts. Everything below is a stable summary of it.
//
// Reached via the rewrite in next.config.ts, because a route folder beginning
// with a dot is not reliably picked up by the App Router.

const MCP_ENDPOINT = "https://app.qlim8.com/api/mcp";

// Grouped by the layer the catalog assigns, which is also how the tool reference
// is organised. Names verified against the live schema endpoint.
const TOOLS = [
  { name: "get_emissions_summary", description: "Total CO2e by GHG scope, or grouped by calendar month" },
  { name: "get_emissions_by_scope3_category", description: "Scope 3 split across the 15 GHG Protocol categories" },
  { name: "get_emissions_by_category", description: "Emissions by internal calculation category" },
  { name: "list_emissions", description: "Raw emission entries, cursor-paginated" },
  { name: "get_emission_lineage", description: "Full lineage for one entry: source activity, factor, audit hashes" },
  { name: "list_activities", description: "Invoices and transactions behind the emissions" },
  { name: "list_reports", description: "Previously generated compliance reports (VSME, CSRD)" },
  { name: "get_report_status", description: "Poll a report render job" },
  { name: "generate_report", description: "Start a VSME Basic, VSME BP, VSME Comprehensive or CSRD report" },
  { name: "get_report_attestations", description: "Third-party auditor sign-offs, version-locked to a report" },
  { name: "list_data_sources", description: "Connected accounting systems and their sync status" },
  { name: "get_quota_status", description: "Invoice ingestion quota" },
  { name: "list_emission_categories", description: "Category taxonomy with hierarchy and default scope" },
  { name: "list_emission_factors", description: "Emission factors available to the tenant" },
  { name: "get_factor_citations", description: "Which entries used a given factor, for auditor self-service" },
  { name: "list_pcf_records", description: "Approved product carbon footprints" },
  { name: "list_suppliers", description: "Scope 3 supplier connections and disclosure status (Enterprise)" },
  { name: "get_value_chain_coverage", description: "Share of supplier spend covered by active disclosures (Enterprise)" },
  { name: "get_value_chain_exposure", description: "Suppliers ranked by trade amount (Enterprise)" },
  { name: "list_targets", description: "Reduction targets" },
  { name: "create_target", description: "Create a reduction target" },
  { name: "list_scenarios", description: "Reduction scenarios" },
  { name: "get_scenario", description: "One scenario with its initiatives" },
  { name: "list_tiltag", description: "Reduction initiatives in a scenario" },
  { name: "create_scenario_draft", description: "Draft a reduction scenario" },
  { name: "add_tiltag", description: "Add a reduction initiative with cost annotation" },
  { name: "submit_scenario_for_review", description: "Submit a consultant-drafted scenario for review" },
  { name: "list_departments", description: "Tenant departments" },
  { name: "list_webhooks", description: "Registered webhooks" },
  { name: "create_webhook", description: "Register a webhook, returns a one-time signing secret" },
  { name: "get_webhook_deliveries", description: "Recent webhook delivery attempts" },
];

const DISCOVERY = {
  name: "qlim8",
  description:
    "Danish ESG platform for carbon accounting and VSME sustainability reporting. Query Scope 1-3 greenhouse gas emissions, generate VSME Basic and Comprehensive reports against EFRAG's workbook, trace any figure to its source invoice and emission factor, and plan reductions.",
  homepage: "https://qlim8.com",
  documentation: "https://developers.qlim8.com/mcp/",
  remote: {
    url: MCP_ENDPOINT,
    transport: "streamable-http",
    stateless: true,
    authentication: {
      type: "oauth2",
      authorization_server: "https://app.qlim8.com",
      resource: MCP_ENDPOINT,
      protected_resource_metadata:
        "https://app.qlim8.com/.well-known/oauth-protected-resource",
      authorization_server_metadata:
        "https://app.qlim8.com/.well-known/oauth-authorization-server",
      bearer_methods_supported: ["header"],
      dynamic_client_registration: true,
      pkce: "S256",
      api_key: {
        description:
          "Alternatively, send a qlim8 API key as a Bearer token: `Authorization: Bearer qk_live_...`. Mint one at https://app.qlim8.com/collectors/api-keys",
        required: false,
      },
    },
  },
  capabilities: {
    tools: TOOLS.length,
    resources: 3,
    prompts: 3,
  },
  schema: `${MCP_ENDPOINT}/schema`,
  tools: TOOLS,
  resources: [
    { uri: "qlim8://emission-categories", description: "Category taxonomy" },
    { uri: "qlim8://ghg-scopes", description: "GHG Protocol scope definitions" },
    { uri: "qlim8://usage-guide", description: "How to use the qlim8 tool surface" },
  ],
  prompts: [
    { name: "emissions_vs_target_analysis", description: "Compare emissions against reduction targets" },
    { name: "year_over_year_review", description: "Year-over-year emissions review" },
    { name: "value_chain_briefing", description: "Supplier and value chain briefing" },
  ],
  access: {
    tier: "premium",
    notes:
      "MCP access requires a Premium or Enterprise subscription. Supplier and value chain tools additionally require Enterprise. Read-only by default; every write is recorded in a tamper-evident audit chain.",
  },
};

export function GET() {
  return new Response(JSON.stringify(DISCOVERY, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Registries and crawlers fetch this cross-origin.
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
