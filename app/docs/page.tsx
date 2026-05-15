import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

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
    title: "MCP Quickstart",
    body: "Forbind Claude Desktop, Cursor eller en custom agent til qlim8's MCP-server. Auth, sessioner og første tool-kald.",
  },
  {
    href: "/docs/mcp-tools",
    title: "MCP tool reference",
    body: "Alle 17 MCP-tools — input-schemas, eksempel-output, scope-krav og tier-gates. Layer 1 (core), 2 (strategic), 3 (infrastructure).",
  },
  {
    href: "/docs/api-reference",
    title: "REST API v1 reference",
    body: "Komplet endpoint-liste under /api/v1: identity, emissions, factors, audit, suppliers, targets, reports, webhooks.",
  },
];

const GENERAL_DOCS = [
  {
    href: "https://app.qlim8.com",
    external: true,
    title: "Onboarding-guides",
    body: "Træd ind i platformen og følg den indbyggede tour. Dækker tilslutning af regnskab, Eloverblik-fuldmagt og første rapport.",
  },
  {
    href: "/metodologi",
    title: "Metodologi",
    body: "Alle emissionsfaktorer, datakilder og beregningsmetoder — fuld åbenhed om hvordan dit klimaregnskab produceres.",
  },
  {
    href: "mailto:kontakt@qlim8.com?subject=Docs%20sp%C3%B8rgsm%C3%A5l",
    external: true,
    title: "Support",
    body: "Specifikke spørgsmål, integration-detaljer eller technical issues? Skriv til kontakt@qlim8.com.",
  },
];

function DocLink({
  href,
  title,
  body,
  external,
}: {
  href: string;
  title: string;
  body: string;
  external?: boolean;
}) {
  const arrow = external ? "↗" : "→";
  const content = (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {title} <span className="font-normal text-gray-400">{arrow}</span>
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </>
  );
  if (external) {
    return (
      <a href={href} className="group block">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className="group block">
      {content}
    </Link>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-14">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
          Sådan kommer du i gang med qlim8
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Onboarding-guides lever i platformen, mens udvikler-dokumentation samles her: MCP-serveren, REST API'en og metodologien bag dit klimaregnskab.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-t border-gray-200 pt-10">
          For udviklere
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
          {DEVELOPER_DOCS.map((d) => (
            <DocLink key={d.href} {...d} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-t border-gray-200 pt-10">
          Generelt
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
          {GENERAL_DOCS.map((d) => (
            <DocLink key={d.href} {...d} />
          ))}
        </div>

        <div className="mt-16 bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
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
