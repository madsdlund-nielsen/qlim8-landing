import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { BookOpen, ArrowRight, ExternalLink, FileText, Plug, Boxes, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Docs | qlim8 — Vejledninger, integration og API",
  description:
    "Dokumentation for qlim8's ESG-platform: onboarding, MCP-server, REST API, datakilder og metodologi.",
  alternates: { canonical: "https://qlim8.com/docs" },
  openGraph: {
    title: "qlim8 docs",
    description: "Dokumentation for qlim8's ESG-platform.",
    url: "https://qlim8.com/docs",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 docs" }],
  },
};

const DEVELOPER_DOCS = [
  {
    href: "/docs/mcp-quickstart",
    icon: Plug,
    title: "MCP Quickstart",
    body: "Forbind Claude Desktop, Cursor eller en custom agent til qlim8's MCP-server. Auth, sessioner og første tool-kald.",
  },
  {
    href: "/docs/mcp-tools",
    icon: Boxes,
    title: "MCP tool reference",
    body: "Alle 17 MCP-tools — input-schemas, eksempel-output, scope-krav og tier-gates. Layer 1 (core), 2 (strategic), 3 (infrastructure).",
  },
  {
    href: "/docs/api-reference",
    icon: Code,
    title: "REST API v1 reference",
    body: "Komplet endpoint-liste under /api/v1: identity, emissions, factors, audit, suppliers, targets, reports, webhooks.",
  },
];

const GENERAL_DOCS = [
  {
    href: "https://app.qlim8.com",
    external: true,
    icon: BookOpen,
    title: "Onboarding-guides",
    body: "Træd ind i platformen og følg den indbyggede tour. Dækker tilslutning af regnskab, Eloverblik-fuldmagt og første rapport.",
  },
  {
    href: "/metodologi",
    icon: BookOpen,
    title: "Metodologi",
    body: "Alle emissionsfaktorer, datakilder og beregningsmetoder — fuld åbenhed om hvordan dit klimaregnskab produceres.",
  },
  {
    href: "mailto:kontakt@qlim8.com?subject=Docs%20sp%C3%B8rgsm%C3%A5l",
    external: true,
    icon: FileText,
    title: "Support",
    body: "Specifikke spørgsmål, integration-detaljer eller technical issues? Skriv til kontakt@qlim8.com.",
  },
];

function DocCard({
  href,
  icon: Icon,
  title,
  body,
  external,
}: {
  href: string;
  icon: typeof BookOpen;
  title: string;
  body: string;
  external?: boolean;
}) {
  const ArrowIcon = external ? ExternalLink : ArrowRight;
  const className =
    "group bg-white border border-gray-200 rounded-2xl p-7 hover:border-primary/40 transition-colors";
  const inner = (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowIcon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </>
  );
  if (external) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12">
        <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">
          Docs
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Sådan kommer du i gang med qlim8.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Onboarding-guides lever i platformen, mens udvikler-dokumentation samles her: MCP-serveren, REST API'en og metodologien bag dit klimaregnskab.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">For udviklere</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {DEVELOPER_DOCS.map((d) => (
            <DocCard key={d.href} {...d} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Generelt</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {GENERAL_DOCS.map((d) => (
            <DocCard key={d.href} {...d} />
          ))}
        </div>

        <div className="mt-14 bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">En samlet docs-portal er på vej</h2>
          <p className="text-gray-300 text-[15px] leading-relaxed">
            Vi arbejder på developers.qlim8.com med søgbare guides, interaktiv API-explorer og videogennemgange. Indtil da finder du den fulde reference her og i platformen.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
