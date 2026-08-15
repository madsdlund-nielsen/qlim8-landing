import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildTechArticleSchema, BASE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "MCP Quickstart: forbind din AI-assistent",
  description:
    "Forbind Claude eller ChatGPT til dine qlim8-klimadata på få minutter. Log ind med din qlim8-konto: ingen API-nøgle, ingen kode. Guide til almindelige brugere.",
  alternates: { canonical: "https://qlim8.com/docs/mcp-quickstart" },
  openGraph: {
    title: "qlim8 MCP Quickstart",
    description: "Chat med dine klimadata i Claude eller ChatGPT, uden kode.",
    url: "https://qlim8.com/docs/mcp-quickstart",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 MCP" }],
  },
};

const MCP_URL = "https://app.qlim8.com/api/mcp";

const EXAMPLE_PROMPTS = [
  "Hvad var vores samlede CO2e-udledning i 2025, fordelt på scope 1, 2 og 3?",
  "Vis vores udledninger måned for måned i 2025, er der et sæsonmønster?",
  "Hvilke kategorier driver mest af vores Scope 3? Brug GHG Protocol-opdelingen.",
  "Er vi på sporet mod vores 2030-reduktionsmål?",
  "Hvilke leverandører udgør den største del af vores værdikæde-eksponering?",
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
    // The id makes each step individually addressable, which the HowTo step
    // URLs in PAGE_SCHEMA point at. Without it those anchors resolve to the
    // top of the page and the structured data claims more than it delivers.
    <section id={number} className="border-t border-gray-200 pt-10 sm:pt-12 scroll-mt-24">
      <p className="text-sm font-semibold text-gray-500 mb-2">{number}</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-5 text-gray-700 text-base leading-relaxed">{children}</div>
    </section>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex-none w-7 h-7 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}


// The page is already written as six numbered steps, so a HowTo describes it
// accurately rather than being retro-fitted onto prose. Step names mirror the
// <Section number title> headings below; keep them in step if those change.
const HOWTO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Forbind din AI-assistent til dine qlim8-klimadata",
  description:
    "Forbind Claude eller ChatGPT til qlim8 via MCP (Model Context Protocol) og spørg til dit klimaregnskab i naturligt sprog. Ingen API-nøgle og ingen kode.",
  inLanguage: "da-DK",
  totalTime: "PT5M",
  tool: [{ "@type": "HowToTool", name: "En qlim8-konto med Premium" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Før du starter", url: `${BASE_URL}/docs/mcp-quickstart#1` },
    { "@type": "HowToStep", position: 2, name: "Claude (claude.ai, desktop og mobil)", url: `${BASE_URL}/docs/mcp-quickstart#2` },
    { "@type": "HowToStep", position: 3, name: "ChatGPT", url: `${BASE_URL}/docs/mcp-quickstart#3` },
    { "@type": "HowToStep", position: 4, name: "Gemini", url: `${BASE_URL}/docs/mcp-quickstart#4` },
    { "@type": "HowToStep", position: 5, name: "Hvad kan du spørge om?", url: `${BASE_URL}/docs/mcp-quickstart#5` },
    { "@type": "HowToStep", position: 6, name: "Sikkerhed og adgang", url: `${BASE_URL}/docs/mcp-quickstart#6` },
  ],
};

const PAGE_SCHEMA = [
  buildTechArticleSchema({
    headline: "Forbind din AI-assistent til dine klimadata",
    description:
      "Forbind Claude eller ChatGPT til dine qlim8-klimadata på få minutter via MCP. Log ind med din qlim8-konto: ingen API-nøgle, ingen kode.",
    path: "/docs/mcp-quickstart",
  }),
  HOWTO_SCHEMA,
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Docs", href: "/docs" },
    { name: "MCP quickstart", href: "/docs/mcp-quickstart" },
  ]),
];

export default function Page() {
  return (
    <>
      <JsonLd schema={PAGE_SCHEMA} />
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/docs" className="text-sm text-gray-600 hover:text-primary transition-colors mb-6 inline-block">
            ← Tilbage til docs
          </Link>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Forbind din AI-assistent til dine klimadata
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Med qlim8's MCP-server kan Claude og ChatGPT svare på spørgsmål direkte fra jeres
            klimaregnskab: udledninger, rapporter, mål og leverandører. Du logger bare ind med
            din qlim8-konto. <strong>Ingen API-nøgle, ingen kode.</strong>
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 border-t border-gray-200 pt-6 text-sm">
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Server-adresse</dt>
              <dd className="font-mono text-gray-900 break-all">{MCP_URL}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Login</dt>
              <dd className="text-gray-900">Din qlim8-konto (OAuth), ingen API-nøgle nødvendig</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-500 mb-1">Adgang</dt>
              <dd className="text-gray-900">Kun læseadgang som standard; kun jeres egne data</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="1" title="Før du starter">
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>En qlim8-brugerkonto</strong> i jeres virksomheds miljø.
              </li>
              <li>
                <strong>En administrator skal godkende forbindelsen.</strong> Godkendelsesskærmen
                vises kun for qlim8-administratorer. Er du ikke selv admin, klarer en
                admin-kollega login-trinnet én gang. Derefter virker forbindelsen for den
                chat-konto, den blev tilføjet på.
              </li>
              <li>
                <strong>AI-abonnement:</strong> Claude understøtter custom connectors på alle
                planer, også gratisplanen (dog maks. én connector dér). ChatGPT kræver en betalt
                plan (Plus, Pro, Business, Enterprise eller Edu).
              </li>
            </ul>
          </Section>

          <Section number="2" title="Claude (claude.ai, desktop og mobil)">
            <Steps
              items={[
                <>Åbn <strong>Settings → Connectors</strong> i Claude.</>,
                <>Klik på <strong>Add custom connector</strong>.</>,
                <>
                  Giv den navnet <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">qlim8</code>{" "}
                  og indsæt adressen{" "}
                  <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded break-all">{MCP_URL}</code>.
                  Lad OAuth-felterne under &quot;Advanced settings&quot; stå tomme.
                </>,
                <>
                  Klik <strong>Add</strong> og derefter <strong>Connect</strong>. Din browser åbner
                  qlim8, log ind og godkend adgangen.
                </>,
                <>
                  Tilbage i Claude: slå qlim8 til i chattens værktøjsmenu og stil dit første
                  spørgsmål.
                </>,
              ]}
            />
            <p className="text-sm text-gray-600">
              På <strong>Team/Enterprise-planer</strong> skal en organisations-Owner først tilføje
              connectoren under <em>Organization Settings → Connectors</em>, derefter klikker
              hvert medlem selv på <em>Connect</em> og logger ind.
            </p>
          </Section>

          <Section number="3" title="ChatGPT">
            <Steps
              items={[
                <>
                  Åbn <strong>Settings → Apps → Advanced settings</strong> og slå{" "}
                  <strong>Developer mode</strong> til. (I Business/Enterprise-workspaces skal en
                  admin muligvis først tillade custom apps.)
                </>,
                <>
                  Gå tilbage til <strong>Apps</strong> og vælg at tilføje en app: navn{" "}
                  <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded">qlim8</code>,
                  MCP-server-URL{" "}
                  <code className="text-[13px] bg-gray-100 px-1.5 py-0.5 rounded break-all">{MCP_URL}</code>,
                  og vælg <strong>OAuth</strong> som godkendelse (lad client-felterne stå tomme).
                </>,
                <>
                  Gem og klik <strong>Connect</strong>, log ind hos qlim8 og godkend adgangen.
                </>,
                <>Aktivér qlim8-appen i chatten og spørg løs.</>,
              ]}
            />
            <p className="text-sm text-gray-600">
              Custom MCP-connectors (kaldet <em>apps</em> i ChatGPT) kræver Plus, Pro, Business,
              Enterprise eller Edu: de er ikke tilgængelige på gratisplanen.
            </p>
          </Section>

          <Section number="4" title="Gemini">
            <p>
              Googles Gemini-app understøtter <strong>endnu ikke</strong> custom MCP-connectors for
              almindelige brugere, hverken på web eller mobil. Tekniske alternativer findes
              (Gemini CLI og Gemini Enterprise kan forbinde til serveren), men der er ingen
              brugervenlig vej endnu. Vi tilføjer en trin-for-trin-guide her, så snart Google åbner
              for det.
            </p>
          </Section>

          <Section number="5" title="Hvad kan du spørge om?">
            <p>Når forbindelsen er oprettet, kan du stille spørgsmål som:</p>
            <ul className="space-y-3">
              {EXAMPLE_PROMPTS.map((p) => (
                <li key={p} className="bg-white rounded-xl border border-gray-200 px-5 py-3.5 text-[15px] text-gray-800">
                  &quot;{p}&quot;
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              Assistenten henter tallene live fra qlim8, samme tal som i platformen, med samme
              beregningsgrundlag og kildesporing.
            </p>
          </Section>

          <Section number="6" title="Sikkerhed &amp; adgang">
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong>Admin-godkendelse:</strong> kun qlim8-administratorer kan godkende en ny
                forbindelse.
              </li>
              <li>
                <strong>Kun læseadgang som standard.</strong> Admin kan aktivt vælge skriveadgang
                til (fx oprette reduktionsmål eller starte rapporter) på godkendelsesskærmen.
              </li>
              <li>
                <strong>Kun jeres egne data.</strong> Assistenten kan udelukkende se jeres
                virksomheds miljø, aldrig andre kunders.
              </li>
              <li>
                <strong>Fortryd når som helst:</strong> forbindelsen tilbagekaldes i qlim8 under{" "}
                <em>Collectors → API Keys</em>.
              </li>
              <li>
                <strong>Teknisk:</strong> OAuth 2.1 med PKCE; adgangstokens udløber automatisk
                efter 1 time og fornyes i op til 60 dage.
              </li>
            </ul>
          </Section>

          <div className="bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">Til udviklere</h2>
            <p className="text-gray-300 text-[15px] leading-relaxed mb-5">
              API-nøgle-baseret opsætning (Claude Code, Cursor, curl), den fulde reference for alle
              31 MCP-tools og REST API v1-dokumentationen bor på udviklerportalen.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="https://developers.qlim8.com/mcp/"
                className="bg-white text-gray-900 font-semibold rounded-full px-5 py-2.5 hover:bg-gray-200 transition-colors"
              >
                developers.qlim8.com/mcp ↗
              </a>
              <a
                href="https://app.qlim8.com/api/mcp/schema"
                className="border border-gray-600 text-gray-100 font-semibold rounded-full px-5 py-2.5 hover:border-gray-400 transition-colors"
              >
                Maskinlæsbart tool-katalog ↗
              </a>
            </div>
            <div className="mt-6">
              <CodeBlock>{`curl https://app.qlim8.com/api/mcp/schema`}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
    </>
  );
}
