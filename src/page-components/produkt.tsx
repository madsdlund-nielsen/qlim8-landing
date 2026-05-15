"use client";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { FeatureCheckList } from "@/components/public/FeatureCheckList";
import { CTASection } from "@/components/public/CTASection";

import commandCenterImg from "@assets/Command_center_screenshot_1765487990875.png";
import carbonLedgerImg from "@assets/carbon_ledger_screenshot_1765487990874.png";
import reportingStudioImg from "@assets/reporting_studio_screenshot_1765487990878.png";

export default function Produkt() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 mb-6" data-testid="text-hero-title">
              Klimaregnskab gjort <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">simpelt</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" data-testid="text-hero-subtitle">
              qlim8 er den mest intuitive platform til at tracke, beregne og rapportere dine CO2-emissioner. Designet specifikt til danske virksomheder med fokus på dansk lovgivning, emissionsfaktorer og compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-32">
          
          {/* Feature 1.1: Command Center - Real-time Performance Dashboard */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-cc1-title">
                Overblik over dine udledninger i realtid
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Dit dashboard er stedet hvor alle vigtige KPI'er præsenteres i realtid. Ikke kun ser du dine samlede emissioner (i tCO2e), men du får øjeblikkelig indsigt i hvordan din virksomhed klarer sig måned for måned. Det centrale donutdiagram viser en visuell opbygning af dine scopes - hvor kommer dine emissioner fra? Scope 1 (direkte fra virksomheden), Scope 2 (fra energi) eller Scope 3 (værdikæde)?
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Dashboardet opdateres automatisk hver gang der importeres ny data eller manuelt tilføjes transaktioner. Du behøver ikke at vente på månedslukninger eller komplekse beregninger - systemet gør det hele for dig løbende. Skal du have konkrete svar på eks "Hvad var mine emissioner i april?" eller "Hvor meget har jeg reduceret siden sidste år?" - det er blot et klik væk. Alle tal er audit-ready, så du kan dele dem med din bank eller revisor.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "Realtids-opdatering", description: "Se dine emissioner ændres øjeblikkelig når du importerer data" },
                  { label: "Scope-opdeling", description: "Forstå øjeblikkelig hvor dine emissioner kommer fra" },
                  { label: "Historisk data", description: "Sammenlign år-til-år progression og track dine reduceringstiltag" }
                ]} 
                color="emerald" 
              />
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={commandCenterImg.src} 
                alt="Command Center" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-cc1"
              />
              <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full bg-accent/40 rounded-xl" />
            </motion.div>
          </div>

          {/* Feature 1.2: Command Center - Intelligent Alerting System */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={commandCenterImg.src} 
                alt="Command Center Alerts" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-cc2"
              />
              <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-orange-100/30 rounded-xl" />
            </motion.div>
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-cc2-title">
                Advarsler når det betyder noget
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Dashboardet er ikke bare for at se på tal - det handler også om at blive alertet når noget kræver din opmærksomhed. Systemet genkender mønstre i dine data. Hvis dine emissioner pludseligt stiger med 15% fra én måned til næste uden forklaring, får du en advarsel. Hvis du har sat dig et reduceringsmål og er på vej til at misse det, ved du det inden det er for sent.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Men det vigtigste er at disse advarsler ikke er "støj" - det er intelligent data-analyse. Systemet forstår sæsonvariation (ja, du bruger mere energi om vinteren), det forstår vækst (hvis du ansætter 10 nye mennesker burde dine Scope 1 og 2 emissioner jo stige), og det genkender dine normale mønstre. Derfor når alarmen går, er det fordi noget faktisk er værd at undersøge. Det giver dig tid til at handle proaktivt før dine emissioner bliver et problem.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "Anomali-detektion", description: "Automatisk alarmering ved uventet stigning i emissioner" },
                  { label: "Target tracking", description: "Få øjeblikkelig feedback hvis du er på vej til at misse dine reduktionsmål" },
                  { label: "Intelligent filtering", description: "du får kun besked når der er noget vigtigt, der kræver din opmærksomhed" }
                ]} 
                color="amber" 
              />
            </motion.div>
          </div>

          {/* Feature 2.1: Carbon Ledger - Complete Audit Trail */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-cl1-title">
                Hver transaktion efterlader et spor
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hovedbogen er din regnskabsjournal for emissioner. Ligesom du i Dinero kan se hver enkelt bilag og trans­aktion, kan du i qlim8 se hver emission. Når du har et bilag på 650 kWh elektricitet i marts, vises det præcist her - sammen med beregningen af hvor meget CO2e det repræsenterer baseret på din region (DK1/DK2), året (med de korrekte danske Energinet-faktorer), og for elektricitet også både markeds-baseret eller lokations-baseret.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Dette er ikke bare flot at have - det er nødvendigt for at være revisions-klar. Hver emission har en årsag, en kilde og en beregningsmetode der skal være dokumenteret. Hvis revisor spørger "hvordan kom du til tallet 47,3 tCO2e for 2024?" kan du præcist vise hver transaktion der bidrog til det. Du kan filtrere efter kategori, periode, afdeling, eller datakilde. Og hvis du opdager en fejl? Du kan markere transaktionen, se hvad der skete, og dokumentere ændringen direkte i systemet.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "Komplet transparens", description: "Se hver bilags-linje og hvordan den blev til en mængde CO2e" },
                  { label: "Revisionsklar dokumentation", description: "Alle beregninger og kilder dokumenteret" },
                  { label: "Fejl-håndtering", description: "Dokumenter og ret fejl direkte uden at miste historik eller audit-trail" }
                ]} 
                color="emerald" 
              />
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={carbonLedgerImg.src} 
                alt="Carbon Ledger" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-cl1"
              />
              <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full bg-accent/40 rounded-xl" />
            </motion.div>
          </div>

          {/* Feature 2.2: Carbon Ledger - Smart Categorization */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={carbonLedgerImg.src} 
                alt="Carbon Ledger Categories" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-cl2"
              />
              <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-blue-100/30 rounded-xl" />
            </motion.div>
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-cl2-title">
                AI der lærer når du lærer
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                De danske emissionskategorier er dybde-defineret med 1.159 mulige kategorier organiseret i 3 niveauer. En "Montør" kunne være mange ting - er det en timelønnet serviceteknikker (der skulle være under "Transport og Installation"), eller er det en elektriker (som skulle være under "Elektrikerydelser")? qlim8's AI-system genkender disse nuancer og foreslår den mest nøjagtige kategori baseret på kontekst, beskrivelse og helt ned til varenavn.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Og her er den smarte del: Systemet lærer fra dine korrektioner. Hver gang du redigerer en kategori, dokumenteres det. Næste gang du ser en lignende transaktion, bruger systemet denne "læring" til at foreslå det samme koblet med al den kontekst den opgældende faktura kan give. Over tid får AI-systemet bedre og bedre forståelse for din virksomheds karakteristiske mønstre. Plus du får en "Lært" badge på kategorier som systemet helt har internaliseret baseret på dine historiske data. Det betyder færre manuelle korrektioner og mere tid til at fokusere på virksomheden.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "1.159 danske kategorier", description: "Præcis 3-level hierarki med dansk specifik data" },
                  { label: "Indlæringssystem", description: "AI lærer fra dine korrektioner og bliver bedre over tid" },
                  { label: "Confidence scores", description: "Se hvor sikker AI'en er på hver kategori-forslag - er den mindre end 95% sikker vil den bede om dit input, men kun første gang" }
                ]} 
                color="blue" 
              />
            </motion.div>
          </div>

          {/* Feature 4.1: Reporting - VSME Compliance */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-rep1-title">
                Fra data til compliance-klar rapport på minutter
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hvis du tror at du skal bruge uger på at kompilere VSME rapporter - det gjorde du før qlim8. Med Reporting Studio går data direkte fra beregninger til professionel rapport. Du vælger format: Vil du have en executive summary for bestyrelsen? En detaljeret tech-rapport for revision? En transparent sustainability rapport for netstedet? qlim8 genererer alt fra samme datasæt, sikrer helt konsistens på tværs af alle rapporter.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Rapporter er ikke bare "tabel på tabel". qlim8' Designer-studio lader dig tilpasse udseende, branding og struktur. Men den vigtigste part er metodologien. VSME-rapporten inkluderer automatisk alle påkrævede disclosures, reference til GHG Protocol standard, dokumentation af dine data-kilder, og completeness-analyse ("Du har 92% fuld data for Scope 1 og 2, men kun 45% for Scope 3 - her er hvad der mangler"). Ingen guestimations uden dokumentation. VSME-rapporten fokuserer på de væsentligste områder, så du kan levere et solidt klimaregnskab uden unødig kompleksitet.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "VSME-kompatibel", description: "Rapporter efter EFRAG VSME-standarden med GHG Protocol metodologi" },
                  { label: "Completeness check", description: "Se præcist hvad der mangler før du rapporterer" },
                  { label: "PDF/Excel export", description: "Professionel formattering klar til revisor eller stakehold" }
                ]} 
                color="blue" 
              />
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={reportingStudioImg.src} 
                alt="Reporting Studio" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-rep1"
              />
              <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full bg-blue-100/30 rounded-xl" />
            </motion.div>
          </div>

          {/* Feature 4.2: Reporting - Custom Templates & Branding */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={reportingStudioImg.src} 
                alt="Reporting Templates" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-rep2"
              />
              <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-indigo-100/30 rounded-xl" />
            </motion.div>
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-rep2-title">
                Dine rapporter, dit brand, dit budskab
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Compliance og transparens er vigtig, men det skal også se godt ud. Reporting Studio inkluderer templates som er design-optimeret, men fuldt tilpasselige. Du kan indsæt dit logo, vælge farver der matcher dit brand, tilføje forord eller metodologi-dokumentation, og organisér data på den måde der giver mest mening for dit publikum. En bestylelses rapport behøver ikke de samme detaljer som en revisor-rapport - qlim8 hjælper dig med at kurate indhold baseret på publikum.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Og fordi alt kommer fra samme datasæt betyder det at executive summary-tal matchér helt præcist med detail-rapport. Ingen copy-paste fejl, ingen forglemmelser, ingen inkonsistens mellem forskellige rapporter. Du genererer hundredvis af rapporter årligt (til bestyrelse, revisorer, låntagere, investorer, offentliggørelse) - og med qlim8 er det bare at vælge template og klikke "generer". Det som før tog 3 uger tager nu 3 timer.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "Tilpasselige templates", description: "Branding, struktur, og detalje-niveau" },
                  { label: "Målgruppe-fokus", description: "Bestyrelse, revision, investor, eller offentlig hver får hvad de behøver" },
                  { label: "En-klik distribution", description: "Generer og send rapporter automatisk" }
                ]} 
                color="purple" 
              />
            </motion.div>
          </div>

          {/* Feature 5.1: AI Invoice Upload - Automation at Scale */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-aiu1-title">
                Fra papir til præcision på sekunder
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                De mest afgørende datos kommer ofte fra fakturaer. En betaling til TransportCorp kunne være taxi (Scope 3), kunne være lokalt logistik (Scope 3, forskellige sub-kategorier), eller kunne være virksomheds-bil (Scope 1 eller 2 afhængigt af energi-type). En faktura fra kontorudstyrs-firma kunne være møbler (Scope 3 kapitalgoder), kunne være IT (Scope 3), kunne være løbende leje. Normalt skulle disse gennemgås manuelt en gang om året - efter revisor-møde når tallene skal være til­gængelige. Med AI Invoice Upload skanner qlim8 fakturaer automatisk, ekstraherer metadata (leverandør, dato, beløb), OCR'er selv håndskrevne bilag, og foreslår automatisk kategori baseret på beskrivelse, varenavn, og emneord.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                De danske emissioner bliver ikke mindre præcise ved automatisering - de bliver mere præcise. Systemet kan processa hundredvis af fakturaer på tiden det ville tage at tælle én manuelt. Plus fordi alt dokumenteres betyder det at hvis revisor spørger "hvor kom denne emission fra?" kan du præcis vise den oprindelige PDF faktura. Ingen guestimations, ingen "jeg tror det var omkring...". AI uploader arbejder med Google Gemini-vision til at genkende og kategorisere selv komplicerede fakturaer.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "Multi-format støtte", description: "PDF, billeder, CSV - alle proceseras automatisk" },
                  { label: "Batch processing", description: "Upload 100 fakturaer og behandl dem alle samtidig" },
                  { label: "Udtraktion + kategorisering", description: "Fra faktura to CO2e beregning på sekunder" }
                ]} 
                color="purple" 
              />
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={commandCenterImg.src} 
                alt="AI Invoice Upload" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-aiu1"
              />
              <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full bg-violet-100/30 rounded-xl" />
            </motion.div>
          </div>

          {/* Feature 5.2: Dinero Integration - Seamless Data Flow */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <img 
                src={carbonLedgerImg.src} 
                alt="Dinero Integration" 
                className="rounded-xl shadow-xl border border-gray-200"
                data-testid="img-feature-aiu2"
              />
              <div className="absolute -z-10 -bottom-8 -left-8 w-full h-full bg-lime-100/30 rounded-xl" />
            </motion.div>
            <motion.div 
              className="space-y-6 order-1 lg:order-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900" data-testid="text-feature-aiu2-title">
                Dine bogføring bliver din klimaregning
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hvis du bruger Dinero (som mere end 100000 andre danske SMV'er gør) har du allerede alle de data qlim8 behøver. Hver bilag i Dinero indeholder værdifuld information: hvem blev betalt, hvor meget, hvornår, og hvad lyder bemærkningen på? qlim8 kan synkroniseres med Dinero API'en, henter automatisk dine transaktioner, og mappes dem direkte til emissioner. Det betyder: du bogfører én gang i Dinero, og qlim8 opdateres automatisk. Ingen dobbeltkontrol, ingen unødigt arbejde.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Men integreringen er ikke blot "kopiér data". qlim8 hjælper dig med at "mappe" dine Dinero konti og leverandører til klimakategorier. "Alle fakturaer til SvenskeEl skal være Elektricitet", "Alle lønudbetalinger skal benyttes til at beregne Scope 3 arbejdspendling". Når først mappingen er sat op kører det helt automatisk. Hver gang der bogføres nye transaktioner i Dinero, behandles de automatisk i qlim8. Det betyder du aldrig skal gennemgå data manuelt igen - du kan fokusere på dine klimemål i stedet for data-administration.
              </p>
              <FeatureCheckList 
                items={[
                  { label: "Automatisk sync", description: "Transaktioner fra Dinero til klimaregning på auto-pilot" },
                  { label: "Intelligent mapping", description: "Definér regler der automatisk kategoriseres dine transaktioner" },
                  { label: "Bi-directional audit", description: "Spor hver transaktion fra oprindelig faktura gennem klimaberegning" }
                ]} 
                color="teal" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        title="Klar til at se dit klimaregnskab?"
        description="Start med en gratis trial og se selv hvordan qlim8 transformerer klimaregnskab fra chore til competitive advantage."
        primaryButton={{ text: "Se priser", href: "/pricing" }}
        secondaryButton={{ text: "Login", href: "https://app.qlim8.com/auth" }}
        variant="dark"
      />

      <SiteFooter />
    </div>
  );
}
