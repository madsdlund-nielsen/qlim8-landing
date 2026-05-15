import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function Handelsbetingelser() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Handelsbetingelser
          </h1>
          <p className="text-sm text-gray-600">
            qlim8 — ESG-platform (SaaS)
            <br />
            Version: 1.0 · Gældende fra: <span className="text-gray-500">15. maj 2026</span>
          </p>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-[15px] prose-li:text-[15px] prose-li:my-1 prose-ul:my-3 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

          <h2>1. Indledning og aftalegrundlag</h2>
          <p>1.1 Disse handelsbetingelser ("Betingelserne") regulerer aftalen mellem qlim8, CVR-nr. DK46033736, <span className="text-gray-500">Stenløkkevej 12, 5450</span> ("Leverandøren") og den erhvervsdrivende kunde ("Kunden"), der tegner abonnement på Leverandørens ESG-platform ("Tjenesten").</p>
          <p>1.2 Betingelserne gælder, uanset om Kunden bestiller via Leverandørens hjemmeside, ved underskrift af ordrebekræftelse eller på baggrund af et særskilt tilbud.</p>
          <p>1.3 Tjenesten udbydes alene til erhvervsdrivende. Forbrugerbeskyttelseslovgivningen, herunder fortrydelsesretten efter forbrugeraftaleloven, finder ikke anvendelse.</p>
          <p>1.4 Kundens egne indkøbsbetingelser finder ikke anvendelse, medmindre Leverandøren skriftligt har accepteret dem.</p>

          <h2>2. Definitioner</h2>
          <p><strong>"Tjenesten"</strong>: Den ESG-platform, herunder tilhørende moduler, dashboards, rapporter og API'er, som Leverandøren stiller til rådighed som software-as-a-service.</p>
          <p><strong>"Brugere"</strong>: Fysiske personer, som Kunden giver adgang til Tjenesten (typisk medarbejdere og konsulenter hos Kunden).</p>
          <p><strong>"Kundedata"</strong>: Alle data, herunder ESG-data, dokumenter og oplysninger, som Kunden eller dennes Brugere uploader, indtaster eller genererer i Tjenesten.</p>
          <p><strong>"Abonnementsperiode"</strong>: Den løbende periode, hvor Kunden har adgang til Tjenesten mod betaling af abonnementsvederlag.</p>
          <p><strong>"Ordrebekræftelse"</strong>: Den skriftlige bekræftelse (e-mail eller PDF), der specificerer valgt abonnement, antal Brugere, pris og særlige vilkår.</p>

          <h2>3. Aftalens indgåelse</h2>
          <p>3.1 Aftalen er bindende, når Kunden enten (i) accepterer Ordrebekræftelsen, (ii) underskriver en aftale med Leverandøren, eller (iii) tager Tjenesten i brug efter en prøveperiode er udløbet.</p>
          <p>3.2 Den person, der accepterer aftalen på vegne af Kunden, indestår for at være berettiget til at forpligte Kunden.</p>
          <p>3.3 Leverandøren kan tilbyde en gratis prøveperiode på 14 dage. Ved prøveperiodens udløb overgår adgangen til et betalt abonnement, medmindre Kunden inden udløbet opsiger skriftligt.</p>

          <h2>4. Tjenesten</h2>
          <p>4.1 Tjenesten leveres som standardiseret SaaS via internettet og omfatter de funktioner og moduler, der fremgår af Ordrebekræftelsen eller af Leverandørens produktbeskrivelse på leveringstidspunktet.</p>
          <p>4.2 Leverandøren udvikler løbende Tjenesten og kan tilføje, ændre eller fjerne funktionalitet, så længe den samlede funktionalitet i al væsentlighed bevares i Abonnementsperioden.</p>
          <p>4.3 Tjenesten leveres "as is". Leverandøren indestår ikke for, at Tjenesten kan opfylde Kundens specifikke forretningsmæssige eller compliance-behov, herunder konkrete rapporteringskrav under CSRD, ESRS, GHG-protokollen eller anden ESG-relateret regulering. Kunden er selv ansvarlig for at vurdere egnetheden.</p>

          <h2>5. Adgang og brugsret</h2>
          <p>5.1 Kunden får i Abonnementsperioden en ikke-eksklusiv, ikke-overdragelig brugsret til Tjenesten til Kundens interne erhvervsmæssige brug.</p>
          <p>5.2 Adgang sker via individuelle brugerkonti. Login-oplysninger må ikke deles. Kunden er ansvarlig for alle handlinger, der foretages under Kundens konti.</p>
          <p>5.3 Kunden må ikke (i) videresælge, udleje eller stille Tjenesten til rådighed for tredjemand, (ii) reverse-engineere eller kopiere Tjenesten, (iii) anvende Tjenesten til benchmarking eller udvikling af konkurrerende tjenester, eller (iv) bruge Tjenesten i strid med gældende lovgivning.</p>
          <p>5.4 Leverandøren kan suspendere adgangen uden varsel ved væsentlig misbrug, manglende betaling efter rykker eller mistanke om sikkerhedsbrud.</p>

          <h2>6. Pris og betaling</h2>
          <p>6.1 Prisen fremgår af Ordrebekræftelsen og er angivet i DKK eksklusive moms og eventuelle tredjepartsgebyrer.</p>
          <p>6.2 Abonnementsvederlaget faktureres månedligt eller årligt forud (efter Kundens valg). Betalingsbetingelser er netto 14 dage fra fakturadato.</p>
          <p>6.3 Ved forsinket betaling påløber morarenter i henhold til rentelovens § 5 samt et rykkergebyr på op til kr. 100 pr. rykker, jf. renteloven.</p>
          <p>6.4 Leverandøren kan én gang årligt regulere priserne med et varsel på 60 dage. Prisreguleringer ud over nettoprisindekset giver Kunden ret til at opsige aftalen med virkning fra reguleringens ikrafttræden.</p>

          <h2>7. Abonnementsperiode og opsigelse</h2>
          <p>7.1 Den indledende Abonnementsperiode er 1 eller 12 måneder (Efter kundens valg), medmindre andet fremgår af Ordrebekræftelsen. Aftalen forlænges automatisk med samme frekvens som ved oprettelse, medmindre den opsiges enten skriftligt med 3 måneders varsel til udløbet af igangværende periode eller øjeblikkeligt via selvbetjening på der findes på Tjenesten.</p>
          <p>7.2 Opsigelse skal ske skriftligt til Leverandørens kontakt-e-mail der til enhver tid kan findes på Leverandørens hjemmeside www.qlim8.com, eller via selvbetjening på Tjenesten.</p>
          <p>7.3 Leverandøren kan opsige aftalen med samme varsel. Ved Kundens væsentlige misligholdelse kan Leverandøren ophæve aftalen uden varsel.</p>
          <p>7.4 Ved aftalens ophør udløber Kundens brugsret. Kunden har i en periode på 30 dage efter ophør adgang til at eksportere Kundedata i et standardformat. Herefter sletter Leverandøren Kundedata, medmindre opbevaring følger af lovgivning.</p>

          <h2>8. Kundens forpligtelser og data</h2>
          <p>8.1 Kunden er ansvarlig for, at Kundedata er korrekte, opdaterede og lovligt indhentede, samt for at Kunden har det fornødne grundlag for at behandle eventuelle personoplysninger i Kundedata.</p>
          <p>8.2 Kunden indestår for, at Kundens brug af Tjenesten ikke krænker tredjemands rettigheder eller gældende lovgivning, herunder konkurrencelovgivning og databeskyttelseslovgivning.</p>
          <p>8.3 Kunden skal opretholde rimelige tekniske og organisatoriske foranstaltninger for at sikre Brugernes login og bør straks underrette Leverandøren ved mistanke om uautoriseret adgang.</p>

          <h2>9. Service niveau og support</h2>
          <p>9.1 Leverandøren tilstræber en oppetid på 99,5 % målt månedligt, eksklusive planlagt vedligehold.</p>
          <p>9.2 Planlagt vedligehold varsles så vidt muligt mindst 48 timer i forvejen og lægges normalt uden for almindelig kontortid.</p>
          <p>9.3 Support ydes via e-mail på hverdage kl. 09-16 dansk tid. Svartider og prioritering fremgår af en eventuel SLA-bilag.</p>

          <h2>10. Databehandling og persondata</h2>
          <p>10.1 I det omfang Leverandøren som led i leveringen af Tjenesten behandler personoplysninger på vegne af Kunden, er Kunden dataansvarlig og Leverandøren databehandler. Parterne indgår en særskilt databehandleraftale, der opfylder kravene i GDPR artikel 28.</p>
          <p>10.2 Leverandøren anvender godkendte underdatabehandlere, herunder hosting (Hetzner Online GmbH, Tyskland), webhotel (Simply.com A/S, Danmark), AI- og sprogtjenester (Ordbogen.ai, Danmark), e-mail-udsendelse (Resend, Inc., USA) og betaling (Stripe, Inc., USA). En opdateret liste fremgår af databehandleraftalen.</p>
          <p>10.3 For Leverandørens egen behandling af personoplysninger om Kundens kontaktpersoner, Brugere og besøgende, henvises til Leverandørens <a href="/privatlivspolitik">privatlivspolitik</a>.</p>

          <h2>11. Immaterielle rettigheder</h2>
          <p>11.1 Alle rettigheder til Tjenesten, herunder kildekode, design, dokumentation og varemærker, tilhører Leverandøren eller dennes licensgivere. Aftalen overdrager ingen rettigheder ud over den i pkt. 5 nævnte brugsret.</p>
          <p>11.2 Kundedata tilhører Kunden. Kunden giver dog Leverandøren en ikke-eksklusiv ret til at behandle Kundedata i det omfang, det er nødvendigt for at levere, vedligeholde og forbedre Tjenesten.</p>
          <p>11.3 Leverandøren må anvende aggregerede og anonymiserede data udledt af Tjenesten til statistik, benchmarking og produktudvikling, så længe Kunden ikke kan identificeres.</p>
          <p>11.4 Forslag og feedback fra Kunden, som indarbejdes i Tjenesten, tilhører Leverandøren uden vederlag til Kunden.</p>

          <h2>12. Fortrolighed</h2>
          <p>12.1 Parterne skal behandle ikke-offentlige oplysninger om hinandens forretning fortroligt og må alene anvende dem til opfyldelse af aftalen. Fortrolighedsforpligtelsen gælder også efter aftalens ophør.</p>
          <p>12.2 Leverandøren må anvende Kundens navn og logo som reference på Leverandørens hjemmeside og i markedsføringsmateriale, medmindre Kunden skriftligt modsætter sig dette.</p>

          <h2>13. Ansvar og ansvarsbegrænsning</h2>
          <p>13.1 Parterne er erstatningsansvarlige efter dansk rets almindelige regler med de begrænsninger, der følger af pkt. 13.2-13.4.</p>
          <p>13.2 Leverandøren er ikke ansvarlig for indirekte tab, herunder driftstab, avancetab, tab af data, tab af goodwill, bod eller dagbøder, eller for tab som følge af Kundens egne beslutninger truffet på baggrund af Tjenestens output, herunder rapportering under ESG-regulering.</p>
          <p>13.3 Leverandørens samlede erstatningsansvar over for Kunden er for hver 12-måneders periode begrænset til det beløb, Kunden har betalt for Tjenesten i de 12 måneder, der går forud for det skadeforvoldende forhold.</p>
          <p>13.4 Begrænsningerne i pkt. 13.2-13.3 finder ikke anvendelse ved grov uagtsomhed eller forsætligt forhold.</p>

          <h2>14. Force majeure</h2>
          <p>14.1 Parterne er ikke ansvarlige for manglende eller forsinket opfyldelse som følge af forhold uden for deres rimelige kontrol, herunder krig, terror, naturkatastrofer, strømsvigt, generalstrejke, pandemi, omfattende cyberangreb og myndighedsforanstaltninger.</p>
          <p>14.2 Force majeure-situationen skal meddeles den anden part uden ugrundet ophold.</p>

          <h2>15. Ændringer i betingelserne</h2>
          <p>15.1 Leverandøren kan ændre Betingelserne med et varsel på 30 dage. Væsentlige ændringer, som stiller Kunden ringere, giver Kunden ret til at opsige aftalen med virkning fra ændringernes ikrafttræden.</p>
          <p>15.2 Mindre ændringer, fx præciseringer eller ændringer som følge af lovkrav, kan gennemføres uden varsel.</p>

          <h2>16. Overdragelse</h2>
          <p>16.1 Kunden kan ikke overdrage sine rettigheder eller forpligtelser uden Leverandørens forudgående skriftlige samtykke.</p>
          <p>16.2 Leverandøren kan overdrage aftalen til et koncernforbundet selskab eller som led i en virksomhedsoverdragelse.</p>

          <h2>17. Lovvalg og værneting</h2>
          <p>17.1 Aftalen er undergivet dansk ret med undtagelse af regler, der medfører anvendelse af andet lands ret.</p>
          <p>17.2 Tvister, der ikke kan løses i mindelighed, skal afgøres ved <span className="text-gray-500">Retten i Odense</span> som første instans.</p>

          <p className="text-xs text-gray-500 pt-8 border-t border-gray-200 mt-12">
            Kontakt: qlim8 · CVR DK46033736 · <span className="text-gray-500">Stenløkkevej 12, 5450</span> · <a href="mailto:kontakt@qlim8.com">kontakt@qlim8.com</a> · <a href="tel:+4593901384">+45 93 90 13 84</a>
          </p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
