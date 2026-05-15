import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

const SOURCES = [
  {
    name: "Klimakompasset",
    note: "Erhvervsstyrelsen og Energistyrelsen. Danske emissionsfaktorer for typiske aktiviteter og indkøbskategorier.",
    danish: true,
  },
  {
    name: "Energinet",
    note: "Eldeklarationer via Eloverblik. Officielle danske el-emissionsfaktorer for både lokationsbaseret og markedsbaseret beregning.",
    danish: true,
  },
  {
    name: "EXIOBASE 3.11",
    note: "Globalt input-output-datasæt for spend-baserede beregninger på indkøbskategorier hvor specifik aktivitetsdata mangler.",
    danish: false,
  },
  {
    name: "EPD-databaser",
    note: "INIES (Frankrig), International EPD System, IBU (Tyskland), ÖKOBAUDAT, EPD Norge og EPD Danmark. Specifikke produkt-EPD'er bruges hvor de er tilgængelige.",
    danish: false,
  },
  {
    name: "DEFRA / DESNZ",
    note: "Britiske emissionsfaktorer for international transport og andre kategorier hvor de er internationale referencer.",
    danish: false,
  },
];

const QUALITY_POINTS = [
  { points: "5 point", text: "LCA eller produkt-PCF (mest specifik)" },
  { points: "4 point", text: "EPD (produkt-specifik miljøvaredeklaration)" },
  { points: "3 point", text: "Fysiske enheder med konkret emissionsfaktor (fx elektricitet, fjernvarme)" },
  { points: "1 point", text: "Spend-baseret estimat (mindst specifik)" },
  { points: "−1 point", text: "Manuelt valgt kategori med under 5% confidence (anti-snyd)" },
];

const STANDARDS = [
  {
    name: "GHG Protocol Corporate Standard",
    body: "Det fundamentale rammeværk for virksomhedsrapportering af Scope 1, 2 og 3.",
  },
  {
    name: "GHG Protocol Corporate Value Chain (Scope 3) Standard",
    body: "Specifik vejledning for de 15 kategorier i Scope 3.",
  },
  {
    name: "VSME (Voluntary SME standard)",
    body: "EFRAG's frivillige bæredygtighedsstandard for små og mellemstore virksomheder. Vi genererer VSME-rapporter direkte fra EFRAG's egen Excel-skabelon, så de er maskinlæsbare for bankerne — som er det format bankerne forventer.",
  },
];

const AUDIT_CONTAINS = [
  "Datoer og tidsstempler",
  "Bruger der har lavet handlingen",
  "Input-værdier (rå data fra kilde)",
  "Valgt emissionsfaktor og dens kilde",
  "Konfidens-score ved AI-kategorisering",
  "Eventuelle ændringer + begrundelse",
  "Versionering af alle elementer",
  "Tilhørende beregnet output",
];

const NOT_DOING = [
  {
    title: "Vi genberegner ikke historiske tal når faktorer opdateres.",
    body: "En ændring i faktor er en ændring i virkeligheden, ikke en korrektion.",
  },
  {
    title: 'Vi laver ikke offsets eller "carbon neutral"-beregninger.',
    body: "qlim8 måler din faktiske udledning. Hvad du gør for at kompensere er en separat øvelse.",
  },
  {
    title: "Vi laver ikke produkt-LCA fra bunden.",
    body: "qlim8 bruger eksisterende EPD'er og LCA-data hvor de findes — men vi udfører ikke selv primær LCA-arbejde for individuelle produkter.",
  },
  {
    title: "Vi bruger ikke beta-data.",
    body: "Selv om EXIOBASE eller en EPD-database har en nyere version i beta, bruger vi den ikke. Kun officielle, validerede udgivelser.",
  },
  {
    title: "Vi skjuler ikke dårlig datakvalitet.",
    body: "Datakvalitetsscoren står på dit dashboard og på forsiden af hver PDF-rapport. Ærligheden er virksomhedens skjold.",
  },
];

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-gray-200 pt-10 sm:pt-14">
      <p className="text-sm font-semibold text-gray-500 mb-2">
        {number}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function Metodologi() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      {/* Hero / Lead */}
      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Sådan bygger vi qlim8
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            Et klimaregnskab er kun lige så godt som metodologien bag. Her er hvordan vores ser ud — uden filter.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            ESG handler ikke om at være pæn. Det handler om at være ærlig og agere på baggrund af tingenes faktiske tilstand. Derfor er hele qlim8 bygget omkring transparens: hvor data kommer fra, hvordan den kategoriseres, hvilken emissionsfaktor der bruges, og hvordan beregningen kommer til sit endelige tal. Du kan altid klikke fra et samlet CO2e-tal ned til den enkelte faktura, den enkelte måling, den enkelte beslutning. Det er ikke en feature — det er metoden.
          </p>
        </div>
      </section>

      {/* Pull-quote 1 */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-2xl sm:text-4xl font-bold leading-[1.2] tracking-tight text-white">
            "Virksomhederne skal bære deres fejl som en rustning — ærligheden er deres skjold."
          </blockquote>
        </div>
      </section>

      {/* Sektioner */}
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="1" title="Hvor data kommer fra">
            <p>
              qlim8 henter aktivitetsdata fra tre slags kilder: dit regnskabssystem, dit elforbrug og din manuelle indtastning.
            </p>
            <p>
              Fra dit regnskabssystem — Dinero, e-conomic eller Billy — hentes alle posteringer via nattlige API-kørsler. Hver postering gemmes som struktureret JSON-metadata, så vi kan tilgå hver detalje (leverandør, beløb, dato, kontoplan, fritekst) når kategoriseringen senere skal vælges. Vi henter alt, ikke kun "indkøb".
            </p>
            <p>
              Fra Eloverblik — hvor vi er officiel tredjepart hos Energinet — hentes både dit elforbrug fra elnettet og din egetproduktion fra solceller, hvis du har dem. Kørslen er ugentlig på grund af rate limits hos Energinet, men du kan altid hente nyeste data manuelt med ét tryk i UI'en.
            </p>
            <p>
              Manuelt kan du indtaste data i alle kategorier — forretningsrejser, brændstof, materialeforbrug, hvad det end måtte være. Du skriver fritekst om hvad varelinjen er, og du kan enten selv kategorisere eller lade AI'en foreslå. Uanset valget fremgår det af audit trail.
            </p>
          </Section>

          <Section number="2" title="Hvordan vi kategoriserer">
            <p>
              Hver post i klimaregnskabet skal placeres i den rigtige kategori, før den kan beregnes korrekt. qlim8 bruger en tre-niveau-struktur: hovedkategori → underkategori → specifik kategori. Vi forsøger altid at ramme det mest specifikke niveau, og falder ellers tilbage på det næstbedste.
            </p>
            <p>
              Eksempel: en stiksav lander i den specifikke kategori "elektrisk håndværktøj", der ligger under "håndværktøj", der igen ligger under hovedkategorien "værktøj". Hvis vi kan vælge "elektrisk håndværktøj", bruger vi den faktor. Hvis ikke, bruger vi en gennemsnitsfaktor for "håndværktøj". Det bedste tilgængelige niveau vælges altid — og det fremgår af beregningen, hvilket niveau der er brugt.
            </p>
            <p>
              AI'en foreslår kategorisering baseret på al tilgængelig metadata: leverandørnavn, fakturatekst, kontoplan, beløb, dato. Hvert forslag har en indbygget confidence score, der følger med ind i audit trail. Du kan altid overskrive forslaget — og hvis du gør det, registreres det også.
            </p>
            <div className="border-l-2 border-gray-300 pl-5 py-1 mt-2">
              <p className="font-bold text-gray-900 mb-1">85% confidence threshold</p>
              <p className="text-gray-700">
                Hvis AI'en ikke kan finde en kategori med over 85% confidence, vælges højest mulige niveau som draft, og posten dukker op på dit dashboard under "Kræver jeres opmærksomhed". Her kan du frisøge i alle kategorier og placere posten manuelt.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Anti-snyd: Manuelt valg af en kategori med under 5% confidence trækkes fra i din samlede datakvalitetsscore. Det skal ikke kunne betale sig at flytte poster til kategorier der ikke matcher.
            </p>
          </Section>

          <Section number="3" title="Hvilke emissionsfaktorer vi bruger">
            <p>
              qlim8 har omkring 50.000 validerede emissionsfaktorer fra en kombination af danske og internationale kilder. Vi multiplicerer dem ikke kreativt med regioner eller år for at få større tal — vi tæller dem som de er, og vi vælger den rigtige til hver enkelt post.
            </p>
            <p>
              Rangordenen følger to principper. For det første: danske kilder har forrang frem for internationale, så beregningerne afspejler en dansk kontekst før vi falder tilbage på europæiske gennemsnit. For det andet: vi følger GHG Protokollens datakvalitetshierarki — specifikke målinger og LCA-data har forrang frem for branchespecifikke gennemsnit, som har forrang frem for spend-baserede estimater.
            </p>
            <dl className="space-y-4 mt-2">
              {SOURCES.map((s) => (
                <div key={s.name}>
                  <dt className="font-semibold text-gray-900">
                    {s.name}
                    {s.danish && <span className="ml-2 text-sm font-normal text-gray-500">— dansk forrang</span>}
                  </dt>
                  <dd className="text-gray-700 mt-1">{s.note}</dd>
                </div>
              ))}
            </dl>
            <div className="border-l-2 border-gray-300 pl-5 py-1 mt-2">
              <p className="font-bold text-gray-900 mb-1">Inflation-tilbagediskontering på EXIOBASE</p>
              <p className="text-gray-700">
                EXIOBASE's nyeste validerede udgivelse er typisk ældre end de regnskabsposteringer der skal beregnes på. Vi løser det ved at tilbagediskontere det monetære input til EXIOBASE-udgivelsens basisår — så inflation ikke kunstigt oppuster udledningen. Vi bruger kun EXIOBASE's seneste validerede public release, aldrig betaer.
              </p>
            </div>
          </Section>

          <Section number="4" title="Hvordan vi beregner">
            <p>
              Selve beregningen er simpel: aktivitetsdata gange emissionsfaktor giver CO2e. Det interessante er hvilke valg vi træffer undervejs.
            </p>
            <p>
              Vi foretrækker fysiske enheder frem for spend-baserede beregninger, hvor det er muligt. En faktura på 5.000 kr for diesel beregnes ikke ud fra beløbet — den beregnes ud fra de liter der står i fakturaen, ganget med en validitet diesel-faktor. Først når vi ikke har fysiske enheder, falder vi tilbage på spend-baserede estimater fra EXIOBASE.
            </p>
            <p>
              Hver beregning gemmer både input, valgte faktor, kilde, kategori-niveau og resultat — så du altid kan klikke fra det samlede CO2e-tal ned til den enkelte beregning og se præcis hvor tallet kommer fra.
            </p>
          </Section>

          <Section number="5" title="Audit trail — hvert tal kan spores">
            <p>
              Vores audit trail kan ikke slettes eller forkortes. Det er en designbeslutning, ikke en bivirkning. Når en kategorisering ændres, en faktor opdateres, eller en bruger retter et input, tilføjes ændringen til audit trail — den oprindelige post forbliver. Du kan altid se hvem der lavede hvad, hvornår, og med hvilken begrundelse. Ved kategoriændringer efter en beregning er lavet, beder qlim8 brugeren om at indtaste en begrundelse, så ændringen ikke bare står som "rettet".
            </p>
            <p>
              Hver audit trail får en unik hash — det er den, du ser i beregningsdetaljer-popup'en. Hashen er navnet på audit trail, ikke beregningen i sig selv. Det betyder at to identiske beregninger ikke deler hash, fordi de stammer fra forskellige posteringer med forskellig historik.
            </p>
            <p>
              Rapporter er også immutable. Når du genererer en VSME-rapport eller en PDF, fryser qlim8 et komplet snapshot af alt der indgår — input, faktorer, audit trail, datakvalitetsberegning — så du om fem år kan trække rapporten frem og reproducere den 1:1. Det er det grundlæggende krav fra en revisor: kan du vise mig hvordan du nåede frem til det her tal, præcis som det stod på rapporten?
            </p>
            <div className="mt-2">
              <p className="font-semibold text-gray-900 mb-3">Hvad audit trail indeholder:</p>
              <ul className="space-y-1 text-gray-700">
                {AUDIT_CONTAINS.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
            <div className="border-l-2 border-gray-300 pl-5 py-1 mt-2">
              <p className="font-bold text-gray-900 mb-1">To formater til revisor</p>
              <p className="text-gray-700">
                Audit trail kan eksporteres som komplet CSV-oversigt over alle posteringer. Når du genererer en PDF-rapport (ikke VSME — der er Excel-formatet det officielle), ligger audit trail som et pænere bilag bagest i rapporten, inklusive nøgletal på bilagets integritet og en oversigt over poster der stikker ud fra normalen. Det letter revisorens opgave markant.
              </p>
            </div>
          </Section>
        </div>
      </section>

      {/* Pull-quote 2 */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-gray-900 text-gray-100">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl sm:text-3xl font-bold leading-[1.3] tracking-tight text-white">
            "Det er det grundlæggende krav fra en revisor: kan du vise mig hvordan du nåede frem til det her tal."
          </blockquote>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          <Section number="6" title="Hvordan vi måler datakvalitet">
            <p>
              Vi viser en datakvalitetsscore øverst på dit dashboard og på forsiden af hver PDF-rapport. Den er ikke marketing — den er en konkret, vægtet beregning af hvor god din underliggende data er.
            </p>
            <p>Hver emissionspost får point baseret på hvilken type data der ligger bag:</p>
            <dl className="space-y-2 mt-2">
              {QUALITY_POINTS.map((q) => (
                <div key={q.points} className="flex flex-col sm:flex-row sm:gap-6 border-b border-gray-200 pb-3 last:border-b-0">
                  <dt className="font-bold text-gray-900 sm:w-24 sm:flex-shrink-0">{q.points}</dt>
                  <dd className="text-gray-700">{q.text}</dd>
                </div>
              ))}
            </dl>
            <p>
              Den samlede datakvalitetsscore er et vægtet gennemsnit baseret på din virksomheds samlede udledning. En post på 100 ton CO2e med 3 point vejer mere end en post på 1 ton CO2e med 5 point. Det betyder, at scoren afspejler dataens kvalitet <em>der hvor det betyder noget</em>.
            </p>
            <p>
              Du ser scoren direkte på dashboardet, og du ser den på forsiden af enhver custom PDF-rapport. Vi skjuler den ikke. Den er en del af det at være ærlig — og over tid er det den der peger din virksomhed mod bedre datapraksis, fordi du kan se hvor du kan blive bedre.
            </p>
          </Section>

          <Section number="7" title="Standarder vi følger">
            <p>qlim8's metodologi er bygget oven på de internationale standarder for drivhusgasrapportering:</p>
            <dl className="space-y-4 mt-2">
              {STANDARDS.map((s) => (
                <div key={s.name}>
                  <dt className="font-semibold text-gray-900">{s.name}</dt>
                  <dd className="text-gray-700 mt-1">{s.body}</dd>
                </div>
              ))}
            </dl>
            <div className="border-l-2 border-gray-300 pl-5 py-1 mt-2">
              <p className="font-bold text-gray-900 mb-1">Hvad vi ikke har — endnu</p>
              <p className="text-gray-700">
                qlim8's metodologi er ikke formelt tredjepartscertificeret. Vi har dialog med fagligt miljø på Syddansk Universitets Life Cycle Centre om kvalitetssikring, men der foreligger intet på skrift, og vi vil ikke navngive personer eller insinuere godkendelse vi ikke har. Hvis det er et must-have for din organisation, kontakt os — vi er på vej.
              </p>
            </div>
          </Section>

          <Section number="8" title="Hvordan vi holder os ajour">
            <p>
              Emissionsfaktorer ændrer sig. El-mixet bliver grønnere, nye EPD'er udgives, Klimakompasset opdateres årligt med revision af faktorer. qlim8 følger disse opdateringer og bruger altid den nyeste validerede version af hver kilde.
            </p>
            <p>
              Vi genberegner ikke historiske beregninger bagudrettet, når en faktor opdateres. Det er et bevidst valg: en ny faktor afspejler at den virkelige verden har ændret sig — ikke at den gamle beregning var forkert. Hvis vi rettede historikken hver gang en faktor blev opdateret, ville du aldrig have et sammenligneligt baseline-år, og dine reduktionsmål ville flytte sig under fødderne på dig.
            </p>
            <p>
              Hver beregning gemmer derfor versionsnummeret på den faktor der blev brugt — så du om to år stadig kan se præcis hvilken Klimakompas-version din 2024-baseline byggede på.
            </p>
          </Section>

          <Section number="9" title="Hvad vi ikke gør">
            <p>
              Det er lige så vigtigt at fortælle hvad vi <em>ikke</em> gør, som hvad vi gør. Vi vil ikke have at du ender med et klimaregnskab du tror er noget andet, end det er.
            </p>
            <dl className="space-y-5 mt-2">
              {NOT_DOING.map((item) => (
                <div key={item.title}>
                  <dt className="font-bold text-gray-900 mb-1">{item.title}</dt>
                  <dd className="text-gray-700">{item.body}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Afslutning */}
          <section className="border-t border-gray-200 pt-10 sm:pt-14">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-gray-900">
              Spørgsmål om metoden?
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-7 max-w-2xl">
              Hvis du eller din revisor har konkrete spørgsmål til hvordan en beregning kommer i stand, er vi tilgængelige. Ærlig dialog om metoden er en del af det at have en sporbar platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <a href="/kontakt" className="text-primary font-semibold hover:underline">
                Kontakt os →
              </a>
              <a href="/docs" className="text-primary font-semibold hover:underline">
                Se den tekniske dokumentation →
              </a>
              <a href="/" className="text-primary font-semibold hover:underline">
                Tilbage til forsiden →
              </a>
            </div>
          </section>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
