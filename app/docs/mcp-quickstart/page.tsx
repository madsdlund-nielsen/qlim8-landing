import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

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
            ← Tilbage til docs
          </Link>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            qlim8 MCP-server
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            qlim8's MCP-server eksponerer 17 kuraterede tools, så AI-agenter (Claude, Cursor, Copilot, Replit, Lovable og enhver MCP-kompatibel klient) kan tilgå klimaregnskabsdata direkte. Serveren følger MCP-specifikationen.
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 border-t border-gray-200 pt-6 text-sm">
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Endpoint</dt>
              <dd className="font-mono text-gray-900 break-all">app.qlim8.com/api/mcp</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Transport</dt>
              <dd className="text-gray-900">Streamable HTTP (JSON-RPC 2.0)</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Auth</dt>
              <dd className="text-gray-900">Bearer-token (samme som /api/v1)</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="1" title="Forudsætninger">
            <p>
              <strong>API-nøgle</strong> — generér en under <em>Collectors → API Keys → Generate Key</em> i appen. Anmod kun om de scopes du har brug for (se{" "}
              <Link href="/docs/mcp-tools" className="text-primary font-semibold hover:underline">
                tool reference
              </Link>{" "}
              for krav per tool).
            </p>
            <p>
              <strong>MCP-kompatibel klient</strong> — Claude Desktop, Cursor eller en hvilken som helst klient der understøtter Streamable HTTP.
            </p>
          </Section>

          <Section number="2" title="Forbind en MCP-klient">
            <p>
              <strong>Claude Desktop</strong> — tilføj i <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">claude_desktop_config.json</code>:
            </p>
            <CodeBlock>{claudeDesktopConfig}</CodeBlock>
            <p>
              <strong>Cursor</strong> — i <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">.cursorrules</code> eller settings:
            </p>
            <CodeBlock>{cursorConfig}</CodeBlock>
            <p>
              <strong>Manuelt (curl)</strong> — initier session, list tools, kald et tool:
            </p>
            <CodeBlock>{curlInit}</CodeBlock>
            <p>
              Responsen indeholder en <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">mcp-session-id</code>-header. Brug den i efterfølgende kald:
            </p>
            <CodeBlock>{curlList}</CodeBlock>
            <CodeBlock>{curlCall}</CodeBlock>
            <p className="text-sm text-gray-600">
              Tool-kataloget kan også opdages uden auth via <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">GET /api/mcp/schema</code>.
            </p>
          </Section>

          <Section number="3" title="Tre lag af tools">
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Layer 1 — Core</p>
                <p className="text-[15px]">
                  Dækker de mest almindelige use cases: <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_emissions_summary</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_emissions</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_emission_lineage</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_activities</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_reports</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_report_status</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">generate_report</code>.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Layer 2 — Strategic</p>
                <p className="text-[15px]">
                  <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_targets</code> / <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">create_target</code> til CO2-reduktionsmål, plus emission factor-katalog. Value-chain tools (<code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_suppliers</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_value_chain_coverage</code>, <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_value_chain_exposure</code>) kræver Enterprise.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Layer 3 — Infrastructure</p>
                <p className="text-[15px]">
                  <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">list_webhooks</code> / <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">create_webhook</code> / <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">get_webhook_deliveries</code> — administrér webhook-abonnementer og inspicér leverancer. Ved oprettelse returneres <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">signing_secret</code> én gang — gem den sikkert.
                </p>
              </div>
              <div>
                <Link href="/docs/mcp-tools" className="text-primary font-semibold hover:underline text-sm">
                  Se fuld tool reference →
                </Link>
              </div>
            </div>
          </Section>

          <Section number="4" title="Fejlkoder">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left font-semibold text-gray-900 py-2 pr-4 align-top">Kode</th>
                    <th className="text-left font-semibold text-gray-900 py-2 align-top">Betydning</th>
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
            <p className="text-sm text-gray-600">
              Enterprise-gated tools (supplyChain-feature) returnerer en struktureret <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">-32602</code>-fejl med <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">required_tier</code> og <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">upgrade_url</code> i <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">data</code>-feltet.
            </p>
          </Section>

          <Section number="5" title="Rate-limits">
            <ul className="space-y-2 text-[15px]">
              <li>— Read-operations: <strong>600 req/min</strong> per API-nøgle</li>
              <li>— Write-operations: <strong>60 req/min</strong> per API-nøgle</li>
              <li>— Sandbox-nøgler: 10× strammere</li>
            </ul>
            <p className="text-sm text-gray-600">
              MCP-serveren deler rate-limit-bucket med REST-API'en (<Link href="/docs/api-reference" className="text-primary font-semibold hover:underline">/api/v1</Link>).
            </p>
          </Section>

          <Section number="6" title="Session-håndtering og klient-kompatibilitet">
            <p>
              Sessioner gemmes in-memory og udløber efter 24 timer eller ved server-restart. MCP-klienter håndterer session-tab automatisk ved at gen-sende <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">initialize</code> — ingen data går tabt, kun handshake gentages.
            </p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left font-semibold text-gray-900 py-2 pr-4 align-top">Klient</th>
                    <th className="text-left font-semibold text-gray-900 py-2 align-top">Status</th>
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
          </Section>

          <section className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12 mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white">
              Klar til at gå dybere?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-7 max-w-2xl">
              Se den fulde reference for alle 17 tools — input-schemas, eksempel-output og scope-krav — eller kig på REST API-alternativet.
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
