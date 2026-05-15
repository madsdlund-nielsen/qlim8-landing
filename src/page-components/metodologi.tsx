import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { Database, Layers, BookOpen, Calculator, ShieldCheck, GaugeCircle, ScrollText, RefreshCw, Ban, ArrowRight } from "lucide-react";

const SECTIONS: { icon: typeof Database; title: string; body: string; bullets?: string[] }[] = [
  {
    icon: Database,
    title: "1. Datakilder",
    body: "Vi henter rådata fra fire kilder og laver intet selv. Du beholder fuld kontrol over hvad vi har adgang til, og du kan trække adgangen tilbage til enhver tid.",
    bullets: [
      "Regnskabssystemer: Dinero, Billy, e-conomic (OAuth-baseret adgang)",
      "El-data: Eloverblik (Energinet DataHub) via elektronisk fuldmagt",
      "Manuel import: CSV til posteringer der ikke kommer fra regnskab",
      "Lønposteringer: kun beløb og dato — ingen navne, CPR eller medarbejderdata",
    ],
  },
  {
    icon: Layers,
    title: "2. Kategorisering",
    body: "Hver postering klassificeres til Scope 1, 2 eller 3 efter GHG Protocol. Vores motor matcher mod kontoplan, bilagstekst og leverandør-CVR. Når vi ikke er sikre, flagger vi posten til manuelt review fremfor at gætte.",
    bullets: [
      "Scope 1: direkte emissioner (egen brændstof, køretøjer, gas)",
      "Scope 2: indirekte emissioner fra el og fjernvarme",
      "Scope 3: alle øvrige (indkøb, transport, affald, leverandører)",
    ],
  },
  {
    icon: BookOpen,
    title: "3. Emissionsfaktorer",
    body: "Vi bruger officielle, peer-reviewed kilder. Ingen interne faktorer, ingen sorte bokse.",
    bullets: [
      "DEFRA (UK) — primær kilde for transport, brændstof, energi",
      "BEIS (UK) — opdaterede faktorer for elektricitet og varme",
      "Klimakompasset (Erhvervsstyrelsen) — danske brancheværdier",
      "GHG Protocol — strukturel ramme og metodisk grundlag",
    ],
  },
  {
    icon: Calculator,
    title: "4. Beregning",
    body: "For hver post: emission = aktivitetsdata × emissionsfaktor. Aktivitetsdata kommer fra dit regnskab (beløb, mængde, distance). Faktor kommer fra kildebibliotek (kg CO2e per enhed). Resultat lagres med fuld sporbarhed.",
  },
  {
    icon: ScrollText,
    title: "5. Audit trail",
    body: "Hver beregning får et unikt ID og logges med kilde, faktor, aktivitetsdata, tidspunkt og bruger. Du kan eksportere fuld bilagsfortegnelse som CSV eller PDF til revisor og bank.",
    bullets: [
      "Unikt beregnings-ID på hver linje",
      "Historik over ændringer (hvem ændrede hvad og hvornår)",
      "Eksporterbar som CSV/PDF til 3.-parts review",
    ],
  },
  {
    icon: GaugeCircle,
    title: "6. Datakvalitet (Tier 1-5)",
    body: "Vi mærker hver post med datakvalitets-tier baseret på hvor præcis kilden er. Tier 1 = målt på din side. Tier 5 = brancheværdi som proxy. Banken og revisor får et klart billede af hvor solid din rapport er.",
    bullets: [
      "Tier 1: Direkte målte data (kWh fra Eloverblik, liter brændstof fra kvittering)",
      "Tier 2-3: Aktivitetsdata × specifik faktor (DEFRA, BEIS)",
      "Tier 4-5: Spend-baseret eller brancheværdi (Klimakompasset, EXIOBASE)",
    ],
  },
  {
    icon: ShieldCheck,
    title: "7. Standarder & rammeværker",
    body: "Vi rapporterer i de standarder banker, revisorer og kunder kender. Du behøver ikke at oversætte.",
    bullets: [
      "VSME (Voluntary SME standard) — EFRAG, basis og comprehensive",
      "GHG Protocol — Corporate Standard",
      "ISO 14064-1 — kompatibel struktur",
      "ESRS E1 (CSRD) — leverandørrapportering til store kunder",
    ],
  },
  {
    icon: RefreshCw,
    title: "8. Opdateringer",
    body: "Emissionsfaktorer revideres årligt. Når DEFRA, BEIS eller Klimakompasset udgiver nye versioner, opdaterer vi biblioteket og noterer ændringen i din audit-log. Du beholder historiske beregninger uændrede så sammenligninger på tværs af år forbliver konsistente.",
  },
  {
    icon: Ban,
    title: "9. Det gør vi ikke",
    body: "Ærligheden er vores produkt. Her er hvad qlim8 IKKE er.",
    bullets: [
      "Vi laver ikke CO2-kreditkompensation eller anbefaler det",
      "Vi udsteder ikke certifikater eller mærkninger",
      "Vi reviderer ikke selv — det er din revisors job, vi leverer dokumentationen",
      "Vi 'optimerer' ikke tal — vi rapporterer hvad data viser",
    ],
  },
];

export default function Metodologi() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-4">Metodologi</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Vi er kedelige med vilje.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Klimaregnskab skal være lige så kedeligt og forudsigeligt som lønudbetaling. Her er præcist hvilke kilder, faktorer og metoder vi bruger til at producere dit klimaregnskab — fra rådata til VSME-rapport.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight pt-1.5">
                    {s.title}
                  </h2>
                </div>
                <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed mb-4">
                  {s.body}
                </p>
                {s.bullets && (
                  <ul className="space-y-2 text-gray-700 text-[15px]">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Closing */}
          <div className="bg-gray-900 text-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
              Mangler du en specifik faktor eller standard?
            </h2>
            <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-6">
              Vi opdaterer biblioteket løbende. Hvis du har brug for en specifik branchefaktor, et alternativt rammeværk eller en custom emissionskilde — skriv til os.
            </p>
            <a
              href="mailto:kontakt@qlim8.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              kontakt@qlim8.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
