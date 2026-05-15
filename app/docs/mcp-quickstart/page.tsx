import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ArrowLeft, ArrowRight, Plug, KeyRound, AlertTriangle, Gauge, Clock, Boxes } from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Quickstart | qlim8 docs",
  description:
    "Kom i gang med qlim8's MCP-server: 17 tools til AI-agenter, JSON-RPC 2.0 over Streamable HTTP. Connection-eksempler til Claude Desktop, Cursor og curl.",
  alternates: { canonical: "https://qlim8.com/docs/mcp-quickstart" },
  openGraph: {
    title: "qlim8 MCP Quickstart",
    description:
      "Forbind LLM-agenter direkte til qlim8 via Model Context Protocol.",
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

const curlInit = `curl -X POST https://app.qlim8.com/api/mcp \\
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
  }'`;

const curlList = `curl -X POST https://app.qlim8.com/api/mcp \\
  -H "Authorization: Bearer qk_live_<your-key>" \\
  -H "mcp-session-id: <session-id-from-step-1>" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}'`;

const curlCall = `curl -X POST https://app.qlim8.com/api/mcp \\
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

const ERROR_CODES: { code: string; meaning: string }[] = [
  { code: "-32602", meaning: "Invalid params — bad UUID, missing field, insufficient scope, eller tier-gate" },
  { code: "-32001", meaning: "Auth / session error — manglende Bearer-token, revoked key, session ikke fundet" },
  { code: "-32603", meaning: "Internal server error" },
  { code: "HTTP 404 på session-id", meaning: "Session udløbet eller server genstartet — send ny initialize" },
];

const CLIENTS: { name: string; notes: string }[] = [
  { name: "Claude Desktop", notes: "Fuld support via HTTP transport" },
  { name: "Cursor", notes: "Fuld support via MCP server config" },
  { name: "Replit Agent", notes: "HTTP transport understøttet" },
  { name: "Lovable", notes: "HTTP transport understøttet" },
  { name: "OpenAI agents", notes: "Via MCP-kompatible shim-biblioteker" },
  { name: "Custom agents", notes: "Enhver klient der taler JSON-RPC 2.0 over HTTP" },
];

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-black/40 text-gray-100 text-xs sm:text-sm rounded-xl p-5 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Plug;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-9">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight pt-1.5">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-gray-700 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Tilbage til docs
          </Link>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
            MCP Quickstart
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            qlim8 MCP-server.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            qlim8's MCP-server eksponerer 17 kuraterede tools, så AI-agenter (Claude, Cursor,
            Copilot, Replit, Lovable og enhver MCP-kompatibel klient) kan tilgå klimaregnskabsdata
            direkte. Serveren følger MCP-specifikationen.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Endpoint</p>
              <p className="text-sm font-mono text-gray-900 break-all">app.qlim8.com/api/mcp</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Transport</p>
              <p className="text-sm text-gray-900">Streamable HTTP (JSON-RPC 2.0)</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Auth</p>
              <p className="text-sm text-gray-900">Bearer-token (samme som /api/v1)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          <Card icon={KeyRound} title="1. Forudsætninger">
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>
                  <strong>API-nøgle</strong> — generér en under <em>Collectors → API Keys → Generate Key</em> i appen. Anmod kun om de scopes du har brug for (se{" "}
                  <Link href="/docs/mcp-tools" className="text-primary font-semibold hover:underline">
                    tool reference
                  </Link>{" "}
                  for krav per tool).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>
                  <strong>MCP-kompatibel klient</strong> — Claude Desktop, Cursor eller en hvilken som helst klient der understøtter Streamable HTTP.
                </span>
              </li>
            </ul>
          </Card>

          <Card icon={Plug} title="2. Forbind en MCP-klient">
            <p>
              <strong>Claude Desktop</strong> — tilføj i <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">claude_desktop_config.json</code>:
            </p>
            <CodeBlock>{claudeDesktopConfig}</CodeBlock>
            <p className="pt-2">
              <strong>Cursor</strong> — i <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">.cursorrules</code> eller settings:
            </p>
            <CodeBlock>{cursorConfig}</CodeBlock>
            <p className="pt-2">
              <strong>Manuelt (curl)</strong> — initier session, list tools, kald et tool:
            </p>
            <CodeBlock>{curlInit}</CodeBlock>
            <p>Responsen indeholder en <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">mcp-session-id</code>-header. Brug den i efterfølgende kald:</p>
            <CodeBlock>{curlList}</CodeBlock>
            <CodeBlock>{curlCall}</CodeBlock>
            <p className="pt-2 text-sm text-gray-600">
              Tool-kataloget kan også opdages uden auth via <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">GET /api/mcp/schema</code>.
            </p>
          </Card>

          <Card icon={Boxes} title="3. Tre lag af tools">
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Layer 1 — Core</p>
                <p className="text-sm">Dækker de mest almindelige use cases: <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_emissions_summary</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_emissions</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_emission_lineage</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_activities</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_reports</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_report_status</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">generate_report</code>.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Layer 2 — Strategic</p>
                <p className="text-sm"><code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_targets</code> / <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">create_target</code> til CO2-reduktionsmål, plus emission factor-katalog. Value-chain tools (<code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_suppliers</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_value_chain_coverage</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_value_chain_exposure</code>) kræver Enterprise.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Layer 3 — Infrastructure</p>
                <p className="text-sm"><code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_webhooks</code> / <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">create_webhook</code> / <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_webhook_deliveries</code> — administrér webhook-abonnementer og inspicér leverancer. Ved oprettelse returneres <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">signing_secret</code> én gang — gem den sikkert.</p>
              </div>
              <div className="pt-2">
                <Link href="/docs/mcp-tools" className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline">
                  Se fuld tool reference <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Card>

          <Card icon={AlertTriangle} title="4. Fejlkoder">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left font-semibold text-gray-900 py-2 pr-4">Kode</th>
                    <th className="text-left font-semibold text-gray-900 py-2">Betydning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ERROR_CODES.map((e) => (
                    <tr key={e.code}>
                      <td className="py-2 pr-4 font-mono text-[13px] text-gray-900 align-top whitespace-nowrap">{e.code}</td>
                      <td className="py-2 text-gray-700">{e.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 pt-2">
              Enterprise-gated tools (supplyChain-feature) returnerer en struktureret <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">-32602</code>-fejl med <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">required_tier</code> og <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">upgrade_url</code> i <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">data</code>-feltet.
            </p>
          </Card>

          <Card icon={Gauge} title="5. Rate-limits">
            <ul className="space-y-2 text-gray-700 text-[15px]">
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Read-operations: <strong>600 req/min</strong> per API-nøgle</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Write-operations: <strong>60 req/min</strong> per API-nøgle</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>Sandbox-nøgler: 10× strammere</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 pt-1">
              MCP-serveren deler rate-limit-bucket med REST-API'en (<Link href="/docs/api-reference" className="text-primary font-semibold hover:underline">/api/v1</Link>).
            </p>
          </Card>

          <Card icon={Clock} title="6. Session-håndtering">
            <p>
              Sessioner gemmes in-memory og udløber efter 24 timer eller ved server-restart. MCP-klienter håndterer session-tab automatisk ved at gen-sende <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">initialize</code> — ingen data går tabt, kun handshake gentages.
            </p>
            <div className="pt-3">
              <p className="font-semibold text-gray-900 mb-2">Klient-kompatibilitet</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left font-semibold text-gray-900 py-2 pr-4">Klient</th>
                      <th className="text-left font-semibold text-gray-900 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {CLIENTS.map((c) => (
                      <tr key={c.name}>
                        <td className="py-2 pr-4 font-semibold text-gray-900 whitespace-nowrap">{c.name}</td>
                        <td className="py-2 text-gray-700">{c.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <div className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Klar til at gå dybere?
            </h2>
            <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-6">
              Se den fulde reference for alle 17 tools — input-schemas, eksempel-output og scope-krav — eller kig på REST API-alternativet.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/docs/mcp-tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                MCP tool reference
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/api-reference"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                REST API endpoints
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
