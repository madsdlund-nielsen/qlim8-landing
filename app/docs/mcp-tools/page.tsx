import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { MCP_TOOLS_PAGE_SCHEMA } from "@/lib/pageSchemas";

export const metadata: Metadata = {
  title: "MCP Tools Reference",
  description:
    "qlim8's MCP-server eksponerer 31 tools, 3 resources og 3 prompts. Den komplette, altid opdaterede reference bor på developers.qlim8.com.",
  alternates: { canonical: "https://qlim8.com/docs/mcp-tools" },
  openGraph: {
    title: "qlim8 MCP Tools Reference",
    description: "31 MCP-tools: komplet reference på developers.qlim8.com.",
    url: "https://qlim8.com/docs/mcp-tools",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 MCP tools" }],
  },
};

const LINKS = [
  {
    href: "https://developers.qlim8.com/mcp/",
    title: "Tool-oversigt (developers.qlim8.com)",
    body: "Alle 31 tools grupperet i tre lag med scope, læse/skrive-adgang og tier-gates, plus opsætning for Claude, ChatGPT, Claude Code, Cursor og curl.",
  },
  {
    href: "https://developers.qlim8.com/mcp-tools-reference.md",
    title: "Fuld tool-reference (markdown)",
    body: "Input-parametre, eksempel-output og scope-krav for hvert enkelt tool. Genereret fra serverens kildekatalog, så den aldrig driver fra virkeligheden.",
  },
  {
    href: "https://app.qlim8.com/api/mcp/schema",
    title: "Maskinlæsbart katalog (JSON)",
    body: "Live discovery-dokument direkte fra serveren, ingen login nødvendigt. Til LLM-klienter og integrationer, der vil læse overfladen programmatisk.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={MCP_TOOLS_PAGE_SCHEMA} />
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">
            ← Tilbage til docs
          </Link>
          <h1 className="mb-6">
            MCP tool-reference
          </h1>
          <p className="text-lead text-foreground max-w-(--measure-body)">
            qlim8's MCP-server eksponerer <strong>31 kuraterede tools</strong>, 3 resources og 3
            prompts, fra emissions-opsummeringer og rapportgenerering til værdikæde, mål,
            tiltag og webhooks. Hvert tool kræver et specifikt scope, og læse-tools er markeret
            som sikre at auto-køre.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
            Den komplette reference vedligeholdes ét sted, på udviklerportalen, så den altid
            matcher serverens faktiske katalog.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto space-y-5">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group block bg-card rounded-lg border border-border p-6 sm:p-8 hover:border-border-strong transition-colors"
            >
              <h2 className="mb-2 text-h3 group-hover:underline underline-offset-4">
                {l.title} <span className="font-normal text-muted-foreground">↗</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.body}</p>
            </a>
          ))}

          <div className="pt-6">
            <Link href="/docs/mcp-quickstart" className="font-semibold hover:underline">
              Ny her? Start med MCP Quickstart: forbind Claude eller ChatGPT uden kode →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
    </>
  );
}
