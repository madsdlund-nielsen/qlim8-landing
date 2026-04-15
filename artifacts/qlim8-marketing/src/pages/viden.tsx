import { useState } from "react";
import { Leaf } from "lucide-react";
import { useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { SeoHead } from "@/components/SeoHead";

import bankImg1 from "@assets/stock_images/modern_bank_building_d414f203.jpg";
import bankImg2 from "@assets/stock_images/modern_bank_building_827cb7ea.jpg";
import supplyChainImg1 from "@assets/stock_images/supply_chain_logisti_327c9fac.jpg";
import supplyChainImg2 from "@assets/stock_images/supply_chain_logisti_833ce30d.jpg";
import sustainabilityImg1 from "@assets/stock_images/business_sustainabil_586da943.jpg";
import sustainabilityImg2 from "@assets/stock_images/business_sustainabil_2fe731b7.jpg";
import softwareImg1 from "@assets/stock_images/software_integration_ae1b386c.jpg";
import softwareImg2 from "@assets/stock_images/software_integration_fc5639fd.jpg";
import greenInvestImg1 from "@assets/stock_images/green_investment_fun_9ef7323d.jpg";
import greenInvestImg2 from "@assets/stock_images/green_investment_fun_0fbe4321.jpg";
import emissionsImg1 from "@assets/stock_images/carbon_emissions_fac_e7e7464f.jpg";
import emissionsImg2 from "@assets/stock_images/carbon_emissions_fac_49c2f22b.jpg";
import auditImg1 from "@assets/stock_images/audit_documentation__c485ca6a.jpg";
import auditImg2 from "@assets/stock_images/audit_documentation__ad08ee65.jpg";

const bobAnimation = `
  @keyframes gentle-bob {
    0%, 100% {
      transform: translateX(0) translateY(0);
    }
    50% {
      transform: translateX(4px) translateY(-2px);
    }
  }
  .animate-gentle-bob {
    animation: gentle-bob 3s ease-in-out infinite;
  }
`;

function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: "Tak for tilmeldingen! Check din email." });
        setName("");
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.message || "Der opstod en fejl. Prøv igen." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Noget gik galt. Prøv igen senere." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 bg-emerald-50 rounded-2xl p-8 lg:p-12 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Vil du have de seneste opdateringer?</h2>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        Tilmeld dig vores nyhedsbrev og få de seneste artikler om qlim8, klimaregnskab, compliance og bæredygtighedsstrategier direkte i din indbakke.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Dit navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          data-testid="input-newsletter-name"
          required
        />
        <input 
          type="email" 
          placeholder="Din email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          data-testid="input-newsletter-email"
          required
        />
        <button 
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-newsletter-subscribe"
        >
          {loading ? "Tilmelder..." : "Tilmeld"}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-4 rounded-lg ${message.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`} data-testid={`message-${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

const articles = [
  {
    id: "bank-esg",
    title: "Nye lånekrav: Derfor spørger din bank efter ESG-data i 2025",
    category: "Compliance",
    categoryColor: "emerald",
    images: [bankImg1, bankImg2],
    description: "Bankerne strammes op. I 2025 vil langt flere finansielle institutioner stille krav om ESG-data fra deres virksomhedskundeder. Læs her, hvad du skal forberede dig på.",
    content: `Bankerne strammes op. I 2025 vil langt flere finansielle institutioner stille krav om ESG-data fra deres virksomhedskundeder. Læs her, hvad du skal forberede dig på.

De danske banker følger efter deres europæiske kollegaer. Som følge af EU's retningslinjer for bæredygtigt finans, begynder danske bankforeninger at implementere ESG-krav i deres udlånspolitikker. Dette betyder konkret, at små og mellemstore virksomheder skal kunne dokumentere deres klima- og bæredygtighedsindsats for at få nye lån eller forlængelse af eksisterende kreditlinjer.

For danske SMV'er betyder dette:
- Du skal kunne fremvise solide klimaregnskaber
- Du skal have dokumentation af dine Scope 1, 2 og 3 emissioner
- Du skal kunne dokumentere målrettede reduceringstiltag
- Du skal være parate til revisorerklæringer om dine CO2e-data

Mange virksomheder er ikke helt parate til dette skift. Det er dog vigtig at handle nu, før fristen bliver kritisk. Med de rigtige værktøjer kan du få dit klimaregnskab på plads inden 2025.`
  },
  {
    id: "lieferkettengesetz",
    title: "Leverer du til Tyskland? Sådan rammer Lieferkettengesetz din danske virksomhed",
    category: "Scope 3",
    categoryColor: "orange",
    images: [supplyChainImg1, supplyChainImg2],
    description: "Lieferkettengesetz (deutsch Supply Chain Due Diligence Act) stiller nye krav til leverandører af tyske virksomheder. Få her de vigtigste informationer om, hvordan loven påvirker din forretning.",
    content: `Lieferkettengesetz (tysk lovgivning om ansvar i værdikæder) stiller nye krav til leverandører af tyske virksomheder. Hvis du leverer varer eller tjenester til Tyskland, påvirker denne lov dig.

Hvad er Lieferkettengesetz?
Lieferkettengesetz (LkSG) er tysk lovgivning, som forpligter virksomheder til at tage ansvar for menneskerettigheder og miljø i hele deres værdikæde. Fra januar 2024 gælder det for virksomheder med mere end 1.000 ansatte. Fra januar 2025 udvides det til virksomheder med mere end 750 ansatte.

Hvad betyder det for danske leverandører?
Hvis du leverer til en tysk virksomhed, som falder under Lieferkettengesetz, kan de stille krav om:
- Dokumentation af dine arbejdsforhold og menneskerettigheder
- Miljømæssig dokumentation, herunder klimaregnskaber
- Audit og kontrol af din virksomhed
- Vedtagelse af compliance-praksisser

Hvordan forbereders du?
- Start med at kortlægge dine egne leverandører
- Implementer et klimaregnskabssystem, der kan dokumentere dine emissioner
- Få styr på dine arbejdsforhold og menneskerettighedspolitikker
- Dokumenter dine reduceringstiltag for klima

Med det rigtige værktøj kan du dokumentere at du opfylder disse krav.`
  },
  {
    id: "vsme-standard",
    title: "VSME-standarden: Genvejen til CSRD for danske SMV'er",
    category: "Compliance",
    categoryColor: "emerald",
    images: [sustainabilityImg1, sustainabilityImg2],
    description: "VSME-standarden er EU's svar på små og mellemstore virksomheders bæredygtighedsrapportering. Lær her, hvordan du bruger VSME-standarden til at komme i gang med dit klimaregnskab.",
    content: `VSME-standarden (Voluntary Sustainability Reporting Standard for Small and Medium-sized Enterprises) er EU's officielle standard for små og mellemstore virksomheders bæredygtighedsrapportering.

Hvad er VSME?
VSME-standarden er en frivillig, nem indgangsport til CSRD-compliance. Den er designet til virksomheder med færre end 250 ansatte og årlig omsætning under 50 mio. EUR. Standarden giver en forenklet tilgang til bæredygtighedsrapportering, der fokuserer på de vigtigste områder for din virksomhed.

Fordele ved VSME-standarden:
- Minimal dokumentationsbyrde sammenlignet med fuld CSRD
- Fokus på klimaregnskab og de vigtigste emissioner
- Anerkendt af danske banker og finansiel sektor
- Kan senere konverteres til fuld CSRD-compliance
- Gør det nemmere at kommunikere dine klimaindsatser til stakeholders

Hvad skal du rapportere?
Som VSME-virksomhed skal du rapportere:
- Dine samlede CO2e-emissioner (Scope 1, 2 og vigtige Scope 3)
- Dit målsætninger og reduceringstiltag
- Dit governance og processer for klimaledelse

VSME er med andre ord den perfekte måde at starte dit klimaregnskab, selvom du senere skal fulgt CSRD-kravene.`
  },
  {
    id: "economic-integration",
    title: "Fra e-conomic til klimaregnskab: Sådan automatiserer du dataindsamlingen",
    category: "Integration",
    categoryColor: "blue",
    images: [softwareImg1, softwareImg2],
    description: "Dine finanstransaktioner i e-conomic indeholder vigtige data til dit klimaregnskab. Lær her, hvordan du automatiserer dataindsamlingen fra e-conomic til dit klimaregnskab.",
    content: `Hvis du bruger e-conomic, skal du ikke manuelt indtaste alle dine transaktioner i dit klimaregnskab. I stedet kan du automatisere dataindsamlingen via e-conomic API'en.

Hvorfor integrere e-conomic?
E-conomic indeholder værdifuld data om:
- Dine udgifter til energi, transport og materialer
- Dine køb af varer og tjenester, som kan kategoriseres efter emissioner
- Dine indtægter, som kan bruges til Scope 3-beregninger
- Historiske data, som kan bruges til beregning af baselines

Med integration sparer du:
- Tid på manuelle dataopgørelser
- Risiko for fejl og mangel på data
- Admin-arbejde ved hver rapporteringsperiode

Sådan integreres e-conomic:
1. Opret en API-nøgle i e-conomic
2. Forbind din klimaregnskabsplatform til e-conomic
3. Kort lægge dine transaktioner til de rigtige emissionskategorier
4. Indsaml historisk data
5. Generer dine klimaregnskaber automatisk

Resultat: Dine klimaemissioner beregnes automatisk hver gang du opbogfører en transaktion i e-conomic.`
  },
  {
    id: "grants-guide",
    title: "Få tilskud til dit klimaregnskab: En guide til SMV:Grøn og CO2-puljen",
    category: "Economics",
    categoryColor: "teal",
    images: [greenInvestImg1, greenInvestImg2],
    description: "Danske SMV'er kan få tilskud til at implementere klimaregnskab gennem SMV:Grøn og CO2-puljen. Lær her, hvordan du søger om og får dine omkostninger dækket.",
    content: `Danske SMV'er kan få økonomisk hjælp til at implementere klimaregnskab. Her er en guide til de vigtigste tilskudsmuligheder.

SMV:Grøn - Miljøministeriet
SMV:Grøn støtter små og mellemstore virksomheder med tilskud til grønne investeringer. Du kan søge om støtte til:
- Implementering af klimaregnskabssystemer
- Energioptimering og renewable energy
- Kredsløbsøkonomiske projekter

Tilskuddet dækker typisk 40-60% af projektomkostningerne.

CO2-puljen - Energistyrelsen
CO2-puljen giver tilskud til virksomheder, der reducerer deres CO2-emissioner. Du kan søge om:
- Investeringer i energieffektivitet
- Energiledelsessystemer (som kræver klimaregnskab)
- Benchmarking og måling af emissioner

Hvordan søger du?
1. Udarbejd et projekt- og budgetforslag
2. Dokumenter dine nuværende emissioner (med klimaregnskab)
3. Beskriv dine reduceringsmål
4. Send din ansøgning til den relevante pulje
5. Vent på godkendelse (typisk 4-8 uger)

Med det rigtige klimaregnskab øger du dine chancer for at få tilskuddet godkendt.`
  },
  {
    id: "scope3-guide",
    title: "Scope 3 for begyndere: Hvad stiller man op med leverandørdata?",
    category: "Scope 3",
    categoryColor: "orange",
    images: [emissionsImg1, emissionsImg2],
    description: "Scope 3-emissioner er ofte de vigtigste, men også de sværeste at måle. Lær her, hvordan du indsamler data fra dine leverandører og beregner Scope 3 korrekt.",
    content: `Scope 3-emissioner (emissioner i din værdikæde) er ofte 80-90% af en virksomheds samlede emissioner. Her er en begyndervejledning til at håndtere Scope 3.

Hvad er Scope 3?
Scope 3 dækker alle emissioner udenfor din virksomhed, som er forårsaget af dine forretningsaktiviteter:
- Indkøb af varer og tjenester
- Transport af dine produkter
- Brug af dine produkter hos kunderne
- Affaldsbehandling af dine produkter
- Arbejdsrejser og pendling

Hvordan indsamler du Scope 3-data?
Tre metoder:

1. Spend-based: Du bruger dit budget for hver kategori og gange med gennemsnitlige emissionsfaktorer per DKK.
   - Hurtigste metode
   - Mindre præcis, men et godt udgangspunkt

2. Leverandørdata: Du spørger dine leverandører om deres emissioner.
   - Mere præcis
   - Kræver leverandørsamarbejde

3. Activity-based: Du måler det fysiske forbrug direkte (kg materialer, km transport osv.).
   - Mest præcis
   - Mest tidskrævende

Praktisk tilgang:
- Start med spend-based for alle kategorier
- Fokuser på dine top-3 emissionskilder
- Bed dine største leverandører om data
- Anvend activity-based for de vigtigste områder
- Forbedres successivt hvert år

Med denne struktur får du hurtigt styr på Scope 3 uden at bruge for meget ressourcer.`
  },
  {
    id: "audit-ready",
    title: "Er din virksomhed revisionsklar? Dokumentation af CO2-data",
    category: "Compliance",
    categoryColor: "emerald",
    images: [auditImg1, auditImg2],
    description: "Revisor kræver dokumentation af dine CO2e-emissioner. Læs her, hvad du skal dokumentere og gemme for at være revisionsklar.",
    content: `En revisor vil stille krav til dokumentationen af dine CO2e-emissioner. Her er en check list over hvad du skal have på plads.

Revisors primære fokus:
- Nøjagtighed: Blev emissionerne beregnet korrekt?
- Afgrænsning: Hvilke emissioner er medtaget?
- Data-integritet: Er data korrekt indsamlet og lagret?
- Metodologi: Hvilken standard blev brugt?
- Verificering: Blev beregningerne kontrolleret?

Dokumentation der skal være på plads:

1. Metodologi-dokument:
- Hvilken standard bruger du (VSME, GHG Protocol, CSRD)?
- Hvordan afgrænsede du dine emissioner?
- Hvilke emissionsfaktorer brugte du og hvorfor?

2. Data-logning:
- Alle rådata: fakturaer, energiregniner, transportkvitteringer
- Behandlede data: kategorisering, konvertering til CO2e
- Resultat-dokumentation: beregnet emissioner pr. kategori

3. Kilder og referencer:
- Hvilke databaser brugte du til emissionsfaktorer?
- Hvilke år/versioner af emissionsfaktorer?
- Link til kilder eller kopier af dokumenter

4. Kontrol og kvalitetssikring:
- Hvem gennemgik dataene?
- Hvad var kontrolprocedurerne?
- Blev der fundet afvigelser?

5. Ændringer og corrigender:
- Hvis du fandt fejl, dokumenter ændringerne
- Forklar hvorfor fejlene opstod
- Vis hvordan de blev rettet

Med denne dokumentation vil en revisor kunne godkende dine CO2-emissioner.`
  }
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-700" },
  blue: { bg: "bg-blue-50", text: "text-blue-700" },
  teal: { bg: "bg-teal-50", text: "text-teal-700" }
};

export default function Viden() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const currentArticle = articles[activeTab];
  const colorScheme = categoryColors[currentArticle.categoryColor];

  const getCategoryColor = (categoryColor: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
      orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300" },
      blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
      teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-300" }
    };
    return colors[categoryColor] || colors.emerald;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SeoHead
        title="Viden om ESG & Klimaregnskab | qlim8"
        description="Artikler og guides om klimaregnskab, VSME-standarden, Scope 1-3 emissioner og ESG-compliance for danske virksomheder. Hold dig opdateret med de seneste krav."
        canonical="https://qlim8.com/viden"
      />
      <style>{bobAnimation}</style>
      <PublicHeader navLinks={[{ label: t('nav.product'), href: "/#features" }, { label: "Viden", href: "/viden", active: true }]} />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <Leaf className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              {t('blog.label')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-viden-title">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hold dig opdateret med de seneste nyheder om klimaregnskab, CSRD-compliance og bæredygtighedsstrategier for danske virksomheder.
          </p>
        </div>

        {/* Article Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {articles.map((article, index) => {
              const categoryColor = getCategoryColor(article.categoryColor);
              const isActive = activeTab === index;
              return (
                <button
                  key={article.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
                    isActive
                      ? `${categoryColor.bg} ${categoryColor.text} border-current ${isActive ? 'animate-gentle-bob' : ''}`
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                  data-testid={`button-tab-${article.id}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Article Display */}
          <article className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12 space-y-8">
              {/* Header */}
              <div>
                <div className={`inline-block px-3 py-1 ${colorScheme.bg} ${colorScheme.text} text-[10px] font-semibold uppercase tracking-wide rounded mb-4`}>
                  {currentArticle.category}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="text-article-title">
                  {currentArticle.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {currentArticle.description}
                </p>
              </div>

              {/* Zig-zag content with images */}
              {(() => {
                const paragraphs = currentArticle.content.split('\n\n');
                const midPoint = Math.ceil(paragraphs.length / 2);
                const firstHalf = paragraphs.slice(0, midPoint);
                const secondHalf = paragraphs.slice(midPoint);

                return (
                  <>
                    {/* Section 1: Text left, Image right */}
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                      <div className="prose prose-lg max-w-none order-2 lg:order-1">
                        {firstHalf.map((paragraph, idx) => (
                          <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="order-1 lg:order-2">
                        <img 
                          src={currentArticle.images[0]} 
                          alt={currentArticle.title}
                          className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-md"
                          data-testid="img-article-1"
                        />
                      </div>
                    </div>

                    {/* Section 2: Image left, Text right */}
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                      <div className="order-1">
                        <img 
                          src={currentArticle.images[1]} 
                          alt={currentArticle.title}
                          className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-md"
                          data-testid="img-article-2"
                        />
                      </div>
                      <div className="prose prose-lg max-w-none order-2">
                        {secondHalf.map((paragraph, idx) => (
                          <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}

              <div className="flex gap-2 pt-6 border-t border-gray-100">
                {activeTab > 0 && (
                  <button
                    onClick={() => setActiveTab(activeTab - 1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    data-testid="button-prev-article"
                  >
                    Forrige
                  </button>
                )}
                {activeTab < articles.length - 1 && (
                  <button
                    onClick={() => setActiveTab(activeTab + 1)}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    data-testid="button-next-article"
                  >
                    Næste
                  </button>
                )}
              </div>
            </div>
          </article>
        </div>

        <NewsletterForm />
      </div>

      <PublicFooter variant="full" />
    </div>
  );
}
