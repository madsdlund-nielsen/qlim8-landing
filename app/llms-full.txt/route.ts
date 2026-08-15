// /llms-full.txt: every page's markdown, concatenated into one document.
//
// The companion to /llms.txt. That file is an index an agent follows link by
// link; this one is the whole site in a single fetch, for ingestion pipelines
// that would rather not crawl. Same content, same CMS-resolved copy, no HTML.

import { markdownPaths, renderMarkdownFor } from "@/lib/markdown";
import { BASE_URL } from "@/lib/schema";

export const revalidate = 300;

export async function GET() {
  const paths = markdownPaths();

  const docs = await Promise.all(
    paths.map(async (p) => {
      const segments = p === "/" ? [] : p.replace(/^\//, "").split("/");
      const body = await renderMarkdownFor(segments);
      if (!body) return null;
      return `\n\n<!-- ${BASE_URL}${p} -->\n\n${body}`;
    }),
  );

  const header = `# qlim8, full text

> Danish ESG platform for carbon accounting (Scope 1-3) and VSME sustainability
> reporting, with a built-in Model Context Protocol (MCP) server at
> https://app.qlim8.com/api/mcp exposing 31 tools to AI agents.
>
> This file concatenates every page on qlim8.com as markdown. The per-page
> sources are at the same URLs with a .md suffix. Index: ${BASE_URL}/llms.txt
`;

  return new Response(header + docs.filter(Boolean).join("\n\n---\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
