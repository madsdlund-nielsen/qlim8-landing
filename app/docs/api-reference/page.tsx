import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export const metadata: Metadata = {
  title: "REST API v1 Reference | qlim8 docs",
  description:
    "qlim8's offentlige REST API (/api/v1): Bearer-auth med scopes, cursor-paginering, RFC 9457-fejl og webhooks. Den komplette reference bor på developers.qlim8.com.",
  alternates: { canonical: "https://qlim8.com/docs/api-reference" },
  openGraph: {
    title: "qlim8 REST API v1",
    description: "Komplet API-reference på developers.qlim8.com.",
    url: "https://qlim8.com/docs/api-reference",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 API v1" }],
  },
};

const LINKS = [
  {
    href: "https://developers.qlim8.com/api-reference/",
    title: "Interaktiv API-reference",
    body: "Alle /api/v1-endpoints med parametre, svar-skemaer og eksempler — identity, emissions, factors, audit, suppliers, targets, reports, scenarier og webhooks.",
  },
  {
    href: "https://developers.qlim8.com/guides/authentication.md",
    title: "Authentication-guide",
    body: "API-nøgler (qk_live_… / qk_sandbox_…), scopes, programmatisk nøgle-oprettelse, tredjeparts-/konsulentnøgler og OAuth 2.1 til MCP-connectors.",
  },
  {
    href: "https://developers.qlim8.com/guides/errors.md",
    title: "Fejl & rate limits",
    body: "RFC 9457 Problem Details, stabile fejlkoder, troubleshooting-tabel og de aktuelle rate limits pr. nøgle.",
  },
  {
    href: "https://api.qlim8.com/api/v1/openapi.json",
    title: "OpenAPI 3.1-spec (JSON)",
    body: "Den autoritative, maskinlæsbare kontrakt for hele REST-overfladen — genereret direkte fra serveren.",
  },
];

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
            REST API v1
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            qlim8's offentlige REST API under <code className="text-base bg-gray-100 px-1.5 py-0.5 rounded">/api/v1</code>:
            Bearer-auth med API-nøgler (<code className="text-base bg-gray-100 px-1.5 py-0.5 rounded">qk_live_…</code> /{" "}
            <code className="text-base bg-gray-100 px-1.5 py-0.5 rounded">qk_sandbox_…</code>) og per-nøgle scopes,
            cursor-paginering, idempotente writes og RFC 9457-fejlformat.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
            Den komplette, altid opdaterede reference vedligeholdes på udviklerportalen —
            genereret fra serverens OpenAPI-spec, så dokumentation og API aldrig driver fra
            hinanden.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto space-y-5">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group block bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-gray-400 transition-colors"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {l.title} <span className="font-normal text-gray-400">↗</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{l.body}</p>
            </a>
          ))}

          <div className="pt-6 flex flex-col gap-2">
            <Link href="/docs/mcp-quickstart" className="text-primary font-semibold hover:underline">
              Vil du hellere chatte med dine data? Se MCP Quickstart →
            </Link>
            <a href="https://developers.qlim8.com" className="text-primary font-semibold hover:underline">
              Hele udviklerportalen: developers.qlim8.com ↗
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
