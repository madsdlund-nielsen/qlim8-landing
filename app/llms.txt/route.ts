// /llms.txt: the index an AI agent reads first.
//
// English prose over Danish page links, deliberately. The pages themselves stay
// Danish (CLAUDE.md), but this file is never rendered to a visitor, and the
// query that prompted this work ("Danish software for VSME reports with an MCP
// server") is the kind that gets asked in English. The entity names a model
// matches against belong here in the language of the question.
//
// Kept in step with the site by construction: the page list comes from
// markdownPaths(), so a new marketing node appears here without an edit.

import { markdownPaths } from "@/lib/markdown";
import { ALL_MARKETING_NODES, MARKETING_HUBS } from "@/content/marketing";
import { fetchPublishedArticles } from "@/lib/cms";
import { articles as bundledArticles } from "@/content/articles";
import { BASE_URL } from "@/lib/schema";

export const revalidate = 300;

const MCP_ENDPOINT = "https://app.qlim8.com/api/mcp";

export async function GET() {
  const published = await fetchPublishedArticles("da");
  const bySlug = new Map<string, { slug: string; title: string; publishedAt: string }>();
  for (const a of bundledArticles) bySlug.set(a.slug, a);
  for (const a of published) bySlug.set(a.slug, a);
  const posts = Array.from(bySlug.values()).sort(
    (x, y) => new Date(y.publishedAt).getTime() - new Date(x.publishedAt).getTime(),
  );

  const nodeLine = (collection: string) =>
    ALL_MARKETING_NODES.filter((n) => n.collection === collection && n.status !== "coming-soon")
      .map((n) => `- [${n.title}](${BASE_URL}/${n.collection}/${n.slug}.md): ${n.blurb}`)
      .join("\n");

  const body = `# qlim8

> qlim8 is a Danish ESG platform for carbon accounting and VSME sustainability
> reporting, built for small and medium-sized enterprises. It calculates Scope 1,
> 2 and 3 greenhouse gas emissions directly from Danish accounting systems
> (Dinero, e-conomic, Billy) and metered electricity from Eloverblik/Energinet,
> and produces VSME Basic and VSME Comprehensive reports against EFRAG's own
> workbook. It exposes that data to AI agents through a built-in Model Context
> Protocol (MCP) server. The website is in Danish; this file and the API surface
> are in English.

Every page on this site has a markdown twin: append \`.md\` to any URL, or send
\`Accept: text/markdown\`, to get the source instead of HTML.

## MCP server (AI agents)

qlim8 runs a remote MCP server, so Claude, ChatGPT, Claude Code, Cursor and any
other MCP-compatible client can query a company's carbon ledger directly.

- Endpoint: ${MCP_ENDPOINT} (streamable HTTP, stateless)
- Surface: 31 tools, 3 resources, 3 prompts
- Auth: OAuth 2.1 with Dynamic Client Registration and PKCE (no API key to copy),
  or a Bearer API key (\`qk_live_*\` / \`qk_sandbox_*\`) shared with the REST API
- Access tier: Premium. Read-only by default; every write is recorded in a
  tamper-evident audit chain
- [Tool catalog (JSON, unauthenticated)](${MCP_ENDPOINT}/schema)
- [Discovery document](${BASE_URL}/.well-known/mcp.json)
- [Quickstart, Danish](${BASE_URL}/docs/mcp-quickstart)
- [Tool reference, Danish](${BASE_URL}/docs/mcp-tools)
- [Quickstart, English](https://developers.qlim8.com/mcp-quickstart.md)
- [Tool reference, English](https://developers.qlim8.com/mcp-tools-reference.md)

Representative tools: \`get_emissions_summary\`, \`get_emissions_by_scope3_category\`,
\`get_emission_lineage\`, \`generate_report\`, \`get_report_status\`,
\`get_report_attestations\`, \`list_suppliers\`, \`get_value_chain_coverage\`,
\`list_targets\`, \`create_target\`, \`list_scenarios\`, \`create_webhook\`.

## VSME reporting

VSME (Voluntary SME standard) is EFRAG's voluntary sustainability reporting
standard for SMEs. qlim8 produces both versions and an AI agent can start either
one with \`generate_report\`.

- [VSME reporting overview](${BASE_URL}/produkt/vsme-rapport.md)
- [VSME Basic](${BASE_URL}/produkt/vsme-basis.md): sections B1-B11, included from Starter
- [VSME Comprehensive](${BASE_URL}/produkt/vsme-comprehensive.md): adds C1-C9, requires Premium
- [VSME reporting via an AI agent](${BASE_URL}/integrationer/vsme-rapport-med-ai-agent.md)

## Developer surfaces

- [REST API and MCP overview](${BASE_URL}/api.md)
- [REST API reference](${BASE_URL}/docs/api-reference)
- [Developer portal](https://developers.qlim8.com)
- [OpenAPI 3.1 spec](https://api.qlim8.com/api/v1/openapi.json)
- [Developer llms.txt](https://developers.qlim8.com/llms.txt)
- [Developer llms-full.txt](https://developers.qlim8.com/llms-full.txt)

## Core pages

- [Home](${BASE_URL}/index.md)
- [Pricing](${BASE_URL}/priser.md)
- [Methodology](${BASE_URL}/metodologi)
- [About](${BASE_URL}/om-os)
${MARKETING_HUBS.map((h) => `- [${h.title}](${BASE_URL}${h.route}.md): ${h.seoDescription}`).join("\n")}

## Product

${nodeLine("produkt")}

## Integrations

${nodeLine("integrationer")}

## By industry

${nodeLine("kundetyper")}

## Blog

Append \`.md\` to any post URL for the markdown source.

- [Blog index](${BASE_URL}/blog.md)
${posts.map((a) => `- [${a.title}](${BASE_URL}/blog/${a.slug}.md) (${a.publishedAt})`).join("\n")}

## Full index

${markdownPaths().length} pages have markdown twins. Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
