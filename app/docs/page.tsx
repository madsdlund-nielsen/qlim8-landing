import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ds/Button";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { DOCS_PAGE_SCHEMA } from "@/lib/pageSchemas";

export const metadata: Metadata = {
  title: "Docs: Vejledninger, integration og API",
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
    body: "Forbind Claude eller ChatGPT til dine klimadata på få minutter, log ind med din qlim8-konto, ingen API-nøgle. Guide til almindelige brugere.",
  },
  {
    href: "/docs/mcp-tools",
    title: "MCP tool reference",
    body: "Alle 31 MCP-tools, 3 resources og 3 prompts, den komplette reference vedligeholdes på developers.qlim8.com.",
  },
  {
    href: "/docs/api-reference",
    title: "REST API v1 reference",
    body: "Bearer-auth med scopes, cursor-paginering og RFC 9457-fejl, komplet endpoint-reference på developers.qlim8.com.",
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
    body: "Alle emissionsfaktorer, datakilder og beregningsmetoder, fuld åbenhed om hvordan dit klimaregnskab produceres.",
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
      <h3 className="mb-2 group-hover:text-primary transition-colors">
        {title} <span className="font-normal text-muted-foreground">{arrow}</span>
      </h3>
      <p className="text-body-sm text-muted-foreground">{body}</p>
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
    <>
      <JsonLd schema={DOCS_PAGE_SCHEMA} />
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-14">
        <h1 className="mb-6">
          Sådan kommer du i gang med qlim8
        </h1>
        <p className="text-lead text-foreground max-w-(--measure-body)">
          Onboarding-guides lever i platformen, mens udvikler-dokumentation samles her: MCP-serveren, REST API'en og metodologien bag dit klimaregnskab.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="mb-8 border-t border-border pt-10">
          For udviklere
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
          {DEVELOPER_DOCS.map((d) => (
            <DocLink key={d.href} {...d} />
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <h2 className="mb-8 border-t border-border pt-10">
          Generelt
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-10">
          {GENERAL_DOCS.map((d) => (
            <DocLink key={d.href} {...d} />
          ))}
        </div>

        <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-7 sm:p-10">
          <h2 className="mb-3 text-primary-foreground">developers.qlim8.com er live</h2>
          <p className="text-primary-foreground text-body-sm mb-5">
            Udviklerportalen samler den fulde reference: MCP-serverens 31 tools, interaktiv REST
            API-reference (OpenAPI), auth-, webhook- og migrationsguides.
          </p>
          <Button href="https://developers.qlim8.com" variant="inverted">
            Åbn developers.qlim8.com ↗
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
    </>
  );
}
