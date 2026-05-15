import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export const metadata: Metadata = {
  title: "MCP Quickstart | qlim8 docs",
  description:
    "Get started with the qlim8 MCP server: 17 tools for AI agents, JSON-RPC 2.0 over Streamable HTTP. Connection examples for Claude Desktop, Cursor and curl.",
  alternates: { canonical: "https://qlim8.com/docs/mcp-quickstart" },
  openGraph: {
    title: "qlim8 MCP Quickstart",
    description: "Connect LLM agents directly to qlim8 via the Model Context Protocol.",
    url: "https://qlim8.com/docs/mcp-quickstart",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 MCP" }],
  },
};

const claudeDesktopConfig = `{
  "mcpServers": {
    "qlim8": {
      "type": "http",
      "url": "https://app.qlim8.com/api/mcp",
      "headers": {
        "Authorization": "Bearer qk_live_<your-64-hex-key>"
      }
    }
  }
}`;

const cursorConfig = `{
  "mcp": {
    "servers": {
      "qlim8": {
        "url": "https://app.qlim8.com/api/mcp",
        "headers": { "Authorization": "Bearer qk_live_<your-64-hex-key>" }
      }
    }
  }
}`;

const curlInit = `# 1. Initialize session
curl -X POST https://app.qlim8.com/api/mcp \\
  -H "Authorization: Bearer qk_live_<your-key>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": { "name": "my-agent", "version": "1.0" }
    }
  }'
# → Response includes "mcp-session-id" header`;

const curlList = `# 2. List available tools
curl -X POST https://app.qlim8.com/api/mcp \\
  -H "Authorization: Bearer qk_live_<your-key>" \\
  -H "mcp-session-id: <session-id-from-step-1>" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'`;

const curlCall = `# 3. Call a tool
curl -X POST https://app.qlim8.com/api/mcp \\
  -H "mcp-session-id: <session-id>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "get_emissions_summary",
      "arguments": { "from": "2024-01-01T00:00:00Z", "to": "2024-12-31T23:59:59Z" }
    }
  }'`;

const tierGateError = `{
  "code": -32602,
  "message": "Your current plan is growth. This tool requires Enterprise (supplyChain feature). Upgrade at https://qlim8.com/upgrade",
  "data": { "required_tier": "enterprise", "upgrade_url": "https://qlim8.com/upgrade" }
}`;

const ERROR_CODES: { code: string; meaning: string }[] = [
  { code: "-32602", meaning: "Invalid params — bad UUID, missing field, insufficient scope, or tier gate" },
  { code: "-32001", meaning: "Auth / session error — missing Bearer token, revoked key, session not found" },
  { code: "-32603", meaning: "Internal server error" },
  { code: "HTTP 404 on session-id", meaning: "Session expired or server restarted — send a fresh initialize request" },
];

const CLIENTS: { name: string; notes: string }[] = [
  { name: "Claude Desktop", notes: "Full support via HTTP transport" },
  { name: "Cursor", notes: "Full support via MCP server config" },
  { name: "Replit Agent", notes: "HTTP transport supported" },
  { name: "Lovable", notes: "HTTP transport supported" },
  { name: "OpenAI agents", notes: "Via MCP-compatible shim libraries" },
  { name: "Custom agents", notes: "Any client that speaks JSON-RPC 2.0 over HTTP" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 text-gray-100 text-xs sm:text-sm rounded-xl p-5 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-gray-200 pt-10 sm:pt-12">
      <p className="text-sm font-semibold text-gray-500 mb-2">{number}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-5 text-gray-700 text-base leading-relaxed">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/docs" className="text-sm text-gray-600 hover:text-primary transition-colors mb-6 inline-block">
            ← Back to docs
          </Link>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            qlim8 MCP Server — Quickstart
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            The qlim8 MCP (Model Context Protocol) server exposes 17 curated tools that let AI agents (Claude, Cursor, Copilot, Replit, Lovable, and any MCP-compatible client) interact directly with carbon accounting data. The server follows the MCP specification and is compatible with all standard MCP clients.
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 border-t border-gray-200 pt-6 text-sm">
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Endpoint</dt>
              <dd className="font-mono text-gray-900 break-all">https://app.qlim8.com/api/mcp</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Transport</dt>
              <dd className="text-gray-900">Streamable HTTP (POST for requests, GET for SSE notifications, DELETE to close)</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Auth</dt>
              <dd className="text-gray-900">Same API keys as /api/v1 — Bearer token in Authorization header</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="1" title="Prerequisites">
            <ol className="space-y-3 list-decimal list-inside">
              <li>
                <strong>API key</strong> — mint one at <em>Collectors → API Keys → Generate Key</em> in the app. Request only the scopes you need (see{" "}
                <Link href="/docs/mcp-tools" className="text-primary font-semibold hover:underline">
                  Tool reference
                </Link>{" "}
                for per-tool requirements).
              </li>
              <li>
                <strong>MCP-compatible client</strong> — Claude Desktop, Cursor, or any client that supports Streamable HTTP.
              </li>
            </ol>
          </Section>

          <Section number="2" title="Connecting with an MCP client">
            <p>
              <strong>Claude Desktop</strong> (<code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">claude_desktop_config.json</code>):
            </p>
            <CodeBlock>{claudeDesktopConfig}</CodeBlock>
            <p>
              <strong>Cursor</strong> (<code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">.cursorrules</code> or settings):
            </p>
            <CodeBlock>{cursorConfig}</CodeBlock>
            <p>
              <strong>Manual (curl / raw HTTP)</strong>:
            </p>
            <CodeBlock>{curlInit}</CodeBlock>
            <CodeBlock>{curlList}</CodeBlock>
            <CodeBlock>{curlCall}</CodeBlock>
            <p>Discover the tool catalog (no auth required):</p>
            <CodeBlock>{`curl https://app.qlim8.com/api/mcp/schema`}</CodeBlock>
          </Section>

          <Section number="3" title="Layer 1 — Core tools">
            <p>These tools cover the most common use cases for agents and analysts.</p>
            <div className="space-y-5">
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">get_emissions_summary</p>
                <p className="text-[15px]">Returns total CO2e aggregated by scope for a date range.</p>
                <CodeBlock>{`{ "from": "2024-01-01T00:00:00Z", "to": "2024-12-31T23:59:59Z" }

{
  "total_co2e_kg": 142300.5,
  "by_scope": { "1": 12000, "2": 45000, "3": 85300.5 },
  "entry_count": 847
}`}</CodeBlock>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">list_emissions</p>
                <p className="text-[15px]">Cursor-paginated list of emission entries. Repeat with next_cursor for all pages.</p>
                <CodeBlock>{`{ "scope": "3", "from": "2024-01-01T00:00:00Z", "limit": 50 }`}</CodeBlock>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">get_emission_lineage</p>
                <p className="text-[15px]">Full traceability for a single emission entry — source invoice, emission factor, category history, and audit hashes.</p>
                <CodeBlock>{`{ "id": "550e8400-e29b-41d4-a716-446655440000" }`}</CodeBlock>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">list_activities</p>
                <p className="text-[15px]">Lists source invoices/transactions before categorization.</p>
                <CodeBlock>{`{ "from": "2024-01-01T00:00:00Z", "to": "2024-03-31T23:59:59Z", "limit": 100 }`}</CodeBlock>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">list_reports</p>
                <p className="text-[15px]">Lists previously generated compliance reports (VSME, CSRD).</p>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">get_report_status</p>
                <p className="text-[15px]">Polls a report render job by ID until status is "completed" or "failed".</p>
                <CodeBlock>{`{ "id": "job-uuid-here" }`}</CodeBlock>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">generate_report</p>
                <p className="text-[15px]">Queues a new report render. Returns a job ID for polling with get_report_status. Safe to retry — returns the existing in-flight job if already queued.</p>
                <CodeBlock>{`{ "report_year": 2024, "standard_type": "vsme_basic", "format": "pdf" }`}</CodeBlock>
                <p className="text-sm text-gray-600 mt-2">
                  Available <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">standard_type</code> values: <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">vsme_basic</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">vsme_bp</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">vsme_comprehensive</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">csrd</code>.
                </p>
              </div>
            </div>
          </Section>

          <Section number="4" title="Layer 2 — Strategic tools">
            <div className="space-y-5">
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">list_targets / create_target</p>
                <p className="text-[15px]">Read and create CO2 reduction targets.</p>
                <CodeBlock>{`{
  "name": "Science-Based Target 2030",
  "baseline_year": 2019,
  "baseline_emissions": 500.0,
  "target_year": 2030,
  "target_reduction_percent": 46.2,
  "scope": "all"
}`}</CodeBlock>
              </div>
              <div>
                <p className="font-mono font-semibold text-gray-900 mb-1">list_emission_factors / get_factor_citations</p>
                <p className="text-[15px]">Browse the emission factor catalog and see which entries used a specific factor.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Value-chain tools (Enterprise plan required)</p>
                <p className="text-[15px]">
                  <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_suppliers</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_value_chain_coverage</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_value_chain_exposure</code> require the <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">supplyChain</code> feature (Enterprise tier). Calling them on a Growth or Starter plan returns a structured error:
                </p>
                <CodeBlock>{tierGateError}</CodeBlock>
              </div>
            </div>
          </Section>

          <Section number="5" title="Layer 3 — Infrastructure tools">
            <div className="space-y-3">
              <p className="font-mono font-semibold text-gray-900">list_webhooks / create_webhook / get_webhook_deliveries</p>
              <p>Manage webhook subscriptions and inspect delivery logs.</p>
              <p>When creating a webhook the <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">signing_secret</code> is returned once — store it securely.</p>
            </div>
            <p className="pt-3">
              <Link href="/docs/mcp-tools" className="text-primary font-semibold hover:underline text-sm">
                See full tool reference →
              </Link>
            </p>
          </Section>

          <Section number="6" title="Error reference">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left font-semibold text-gray-900 py-2 pr-4 align-top">Error code</th>
                    <th className="text-left font-semibold text-gray-900 py-2 align-top">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ERROR_CODES.map((e) => (
                    <tr key={e.code}>
                      <td className="py-3 pr-4 font-mono text-[13px] text-gray-900 align-top whitespace-nowrap">{e.code}</td>
                      <td className="py-3 text-gray-700 align-top">{e.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section number="7" title="Rate limits">
            <p>The MCP server shares rate-limit buckets with the REST API (<Link href="/docs/api-reference" className="text-primary font-semibold hover:underline">/api/v1</Link>):</p>
            <ul className="space-y-2 text-[15px]">
              <li>— Read operations: <strong>600 requests / minute per API key</strong></li>
              <li>— Write operations: <strong>60 requests / minute per API key</strong></li>
              <li>— Sandbox keys: 10× stricter</li>
            </ul>
          </Section>

          <Section number="8" title="Session behaviour">
            <p>
              Sessions are stored in-memory and expire after 24 hours or on server restart. MCP clients handle session loss automatically by re-sending <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">initialize</code>. No data is lost — only the protocol handshake needs to be repeated.
            </p>
          </Section>

          <Section number="9" title="Client compatibility">
            <p>The server follows the MCP specification (protocol version 2024-11-05). It is compatible with:</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left font-semibold text-gray-900 py-2 pr-4 align-top">Client</th>
                    <th className="text-left font-semibold text-gray-900 py-2 align-top">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {CLIENTS.map((c) => (
                    <tr key={c.name}>
                      <td className="py-3 pr-4 font-semibold text-gray-900 whitespace-nowrap align-top">{c.name}</td>
                      <td className="py-3 text-gray-700 align-top">{c.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 pt-2">
              Tool descriptions and input schemas are written for LLM consumption — precise, concise, with format hints on every parameter. They work equally well across Claude, GPT-4, and Gemini models.
            </p>
          </Section>

          <section className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12 mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
              Ready to go deeper?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-7 max-w-2xl">
              See the full reference for all 17 tools — input schemas, example output, and scope requirements — or check out the REST API alternative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <Link href="/docs/mcp-tools" className="font-semibold text-white hover:underline">
                MCP tool reference →
              </Link>
              <Link href="/docs/api-reference" className="font-semibold text-white hover:underline">
                REST API endpoints →
              </Link>
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
