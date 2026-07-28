import type { MarketingPageCopy, MarketingHubCopy } from "@/content/marketing/types";
import type { ArticleSection } from "@/content/article";

// Fixed CTAs (per authoring spec) — reused across every page below.
const PRIMARY_CTA = { label: "Opret gratis konto", href: "https://app.qlim8.com/auth?tab=register" };
const SECONDARY_HERO_CTA = { label: "Se priser", href: "/priser" };
const CLOSING_SECONDARY_CTA = { label: "Book demo", href: "/kontakt" };

// ---------------------------------------------------------------------------
// Hub: Kundetyper — "hvorfor vi findes" + markeds-differentiering
// ---------------------------------------------------------------------------

export const KUNDETYPER_HUB_COPY: MarketingHubCopy = {
  hero: {
    eyebrow: "Kundetyper",
    title: "Dit klimaregnskab — bygget oven på dit regnskab",
    subtitle:
      "qlim8 er bygget til danske SMV'er og deres revisorer. Vi forvandler den bogføring, du allerede laver, til et audit-bakket klimaregnskab — uden regneark og uden ekstern konsulent.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Vi forstår dansk håndværk og transport — ikke generisk ESG",
    body:
      "De fleste klimaplatforme er bygget til store internationale koncerner og oversat til dansk bagefter. Det mærker du med det samme: intet Dinero, ingen danske faktorer, et mapping-projekt før du overhovedet får et tal. qlim8 vender det om. Vi tilslutter dit bogføringssystem — Dinero, e-conomic eller Billy — læser dine indkøbsfakturaer og omsætter hver linje mod 1.159 danske emissions-kategorier. Du logger ind og har et første klimaregnskab samme dag, ikke efter et halvt års implementering. Hver branche på denne side møder de samme tre krav: banken, en bygherre eller et offentligt udbud beder om CO₂e-data. Vi gør svaret til en del af regnskabet i stedet for et særprojekt hvert forår.",
    bullets: [
      "Native dansk regnskabsdata: Dinero, e-conomic, Billy og Eloverblik — intet mapping-projekt.",
      "1.159 danske emissions-kategorier og DK-specifikke el-faktorer (Energinet, 5-minutters granularitet).",
      "VSME Basic / VSME Comprehensive-rapport i underskrifts-klar PDF med audit-spor bag hvert tal.",
      "Fast pris fra 300 kr./md. — ingen konsulent-fee på 75.000+ kr. [antagelse: 2 konsulent-firma-interviews, sample size 4].",
    ],
  },
  cardsHeading: "Find din branche",
  cardsSubheading:
    "Vælg din faggruppe og se, hvordan Scope 1, 2 og 3 rammer netop dit firma — og hvad qlim8 trækker automatisk.",
  differentiators: [
    {
      title: "Bygget til dansk bogføring, ikke oversat til den",
      body:
        "Generiske EU-platforme (Plan A, Sweep) kræver at du eksporterer og mapper dine data manuelt. qlim8 tilslutter Dinero, e-conomic og Billy native og kategoriserer 70-80 % af dine fakturaer automatisk [antagelse: Ordbogen.ai-confidence ≥ 0,85]. Du starter med data, ikke med et opsætningsprojekt.",
    },
    {
      title: "En rapport du kan aflevere — ikke et regneark",
      body:
        "Excel er stadig fint under ca. 50 fakturaer/md. Derover koster kopiér-indsæt både tid og troværdighed. qlim8 leverer VSME Basic og Comprehensive i underskrifts-klar PDF med kilde-citation bag hvert kg CO₂e, så revisor kan spore tallet uden en eneste opfølgnings-mail.",
    },
    {
      title: "1/10 af en konsulent, opdateret hele året",
      body:
        "Et førstegangs-VSME-engagement hos et konsulenthus løber typisk op i 75.000-200.000 kr. [antagelse: markeds-research, sample size 4] — og rapporten er et øjebliksbillede. qlim8 koster fra 300 kr./md., holder tallene løbende opdateret, og du ejer selv dine data.",
    },
    {
      title: "Klar på 1 dag, ikke efter 6 måneders implementering",
      body:
        "Store enterprise-platforme (Microsoft, Sphera) er bygget til 10.000+ ansatte og et halvt års udrulning. For et håndværks- eller transportfirma er det overkill. qlim8 er klar samme dag du tilslutter dit regnskab — setup under 1 dag på 5 ud af 5 piloter i Q4 2025.",
    },
  ],
  closingCta: {
    title: "Se dit klimaregnskab før frokost",
    description:
      "Opret en gratis konto, tilslut Dinero, e-conomic eller Billy, og se dine første scope-summer samme dag. Ingen konsulent, ingen binding.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Tømrer
// ---------------------------------------------------------------------------

export const KT_TOMRER: MarketingPageCopy = {
  hero: {
    eyebrow: "Kundetyper · Bygge & anlæg",
    title: "Klimaregnskab for tømrer- og snedkerfirmaer",
    subtitle:
      "Din diesel, dit trælast-indkøb og dit byggeaffald er allerede bogført. qlim8 forvandler det til et klimaregnskab, du kan lægge på bordet, når banken eller bygherren spørger.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Dit CO₂e-aftryk sidder i varevognen og på trælasten",
    body:
      "For et tømrerfirma ligger langt det meste af klimaregnskabet to steder: dieslen i varevogne og maskiner (Scope 1) og indkøbet af træ, plader og beslag (Scope 3, kategori 1). Begge dele står allerede som fakturaer i din bogføring. Problemet er ikke, at data mangler — det er, at ingen har tid til at oversætte 400 indkøbslinjer til kg CO₂e i hånden. qlim8 tilslutter Dinero, e-conomic eller Billy, læser hver faktura og kategoriserer den mod danske emissions-faktorer. I stedet for et forårsprojekt med regneark får du et løbende tal, der er klart, når en totalentreprenør eller din bank beder om det på et byggeprojekt.",
    bullets: [
      "Diesel i varevogne og maskiner regnes som Scope 1 direkte fra dine brændstof-fakturaer.",
      "Træ, plader, isolering og beslag mappes til Scope 3 kategori 1 uden manuel opslag.",
      "Byggeaffald og spild dokumenteres, så du kan svare på bygherrens ESG-spørgeskema.",
    ],
  },
  painPoints: [
    {
      pain: "Dieslen til varevogne og maskiner er din største enkeltpost, men den står spredt ud over hundredvis af tank-fakturaer.",
      solution:
        "qlim8 samler alle brændstof-posteringer fra dit regnskab og omregner dem til Scope 1 med danske faktorer — automatisk, hver måned.",
      outcome: "Ingen manuel opsummering af tankkvitteringer; du sparer 1-3 timer/md. [antagelse: pilotbrugere, ikke branchevalideret].",
    },
    {
      pain: "Træ- og materialeindkøb fylder mest i Scope 3, men hver leverandørlinje skal kobles til en emissions-faktor, du ikke kender.",
      solution:
        "AI-kategorisering foreslår faktoren for hver indkøbslinje mod 1.159 danske kategorier og lærer af dine rettelser.",
      outcome: "70-80 % af linjerne rammer rigtigt uden manuel hjælp [antagelse: Ordbogen.ai-confidence ≥ 0,85].",
    },
    {
      pain: "Bygherrer og totalentreprenører sender ESG-spørgeskemaer med kort frist, typisk midt i en travl byggefase.",
      solution:
        "Fordi tallene opdateres løbende, trækker du en VSME Basic-rapport, når spørgeskemaet lander — ikke først når du får tid.",
      outcome: "Svar på timer i stedet for at bruge en weekend på regneark.",
    },
    {
      pain: "Banken kobler grøn finansiering og gunstige vilkår til, at du kan dokumentere dit CO₂e-aftryk.",
      solution:
        "qlim8 leverer en audit-bakket rapport med kilde-citation bag hvert tal, som din bankrådgiver kan læse direkte.",
      outcome: "Du undgår at udsætte en finansieringssamtale, fordi tallet ikke er klart.",
    },
    {
      pain: "Byggeaffald og spild er svært at sætte tal på, men efterspørges i stigende grad i udbud.",
      solution:
        "Registrér affaldsfraktioner som aktiviteter, så de indgår i regnskabet sammen med dit indkøb og din diesel.",
      outcome: "Ét samlet billede af projektets aftryk — ikke fire løsrevne regneark.",
    },
  ],
  features: [
    {
      title: "Brændstof → Scope 1 automatisk",
      body:
        "Hver diesel- og benzin-postering fra dit regnskab bliver til et Scope 1-tal med den korrekte danske faktor. Du ser fordelingen mellem varevogne og maskiner uden at føre kørebog i et regneark.",
    },
    {
      title: "Materialeindkøb kategoriseret for dig",
      body:
        "Træ, plader, isolering, beton og beslag foreslås automatisk mod 1.159 danske emissions-kategorier. Retter du en kategori, husker systemet det til næste faktura fra samme leverandør.",
    },
    {
      title: "VSME-rapport i underskrifts-klar PDF",
      body:
        "Du henter en VSME Basic-rapport, når en bygherre eller bank beder om den. Den kommer i færdig PDF med scope-summer og kilde-citation, så du ikke skal reformatere noget.",
    },
    {
      title: "Audit-spor bag hvert tal",
      body:
        "Alle kategori-ændringer og beregninger logges i 7 år (CSRD-krav). Når en revisor spørger \"hvor kommer det tal fra?\", klikker du dig til fakturaen bag det.",
    },
    {
      title: "Løbende i stedet for én gang om året",
      body:
        "Klimaregnskabet opdateres, i takt med at du bogfører. Du behøver ikke starte et projekt hvert forår — tallet er der, når du skal bruge det.",
    },
  ],
  valueStats: [
    { value: "1.159", label: "danske emissions-kategorier dine materialer mappes mod" },
    { value: "70-80 %", label: "af fakturalinjer kategoriseres automatisk", note: "[antagelse: confidence ≥ 0,85]" },
    { value: "< 1 dag", label: "fra tilslutning til første klimaregnskab", note: "[antagelse: 5/5 piloter Q4 2025]" },
    { value: "7 år", label: "audit-spor bag hvert tal" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — tømrer",
    items: [
      {
        q: "Skal jeg føre kørebog for at få mit diesel-forbrug med?",
        a: "Nej. qlim8 læser dine brændstof-fakturaer direkte fra Dinero, e-conomic eller Billy og omregner dem til Scope 1. Vil du fordele på enkelte køretøjer, kan du tilføje det, men grundtallet kommer af sig selv.",
      },
      {
        q: "Hvordan håndteres mit indkøb af træ og byggematerialer?",
        a: "Hver indkøbslinje foreslås automatisk mod en dansk emissions-faktor og lægges i Scope 3 kategori 1. Du retter kun de linjer, systemet er usikkert på, og rettelsen huskes til næste gang.",
      },
      {
        q: "Er en VSME Basic-rapport nok, når en totalentreprenør spørger?",
        a: "I langt de fleste tilfælde ja. VSME Basic dækker de scope-summer og nøgletal, bygherrer og totalentreprenører beder om. Har du brug for mere dybde, giver VSME Comprehensive (Premium) den udvidede model.",
      },
      {
        q: "Kan min revisor bruge det direkte?",
        a: "Ja. Rapporten er audit-bakket med kilde-citation bag hvert kg CO₂e og et 7-årigt spor. Det er typisk det, der gør revisor-gennemgangen hurtigere og billigere [antagelse: 8.000-15.000 kr./år, 3 pilot-revisor-interviews].",
      },
      {
        q: "Hvad koster det for et lille tømrerfirma?",
        a: "Starter koster fra 300 kr./md. og dækker basis-flowet plus VSME Basic med op til 3.000 aktiviteter pr. billing-periode og 2 seats. Premium (1.195 kr./md.) tilføjer Scenario Planner, Klimaagent og VSME Comprehensive.",
      },
    ],
  },
  closingCta: {
    title: "Få tømrerfirmaets klimaregnskab ud af regnearket",
    description:
      "Opret en gratis konto, tilslut dit regnskab, og se din diesel og dine materialer omsat til CO₂e samme dag. Klar til næste bygherre-spørgeskema.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Maler
// ---------------------------------------------------------------------------

export const KT_MALER: MarketingPageCopy = {
  hero: {
    eyebrow: "Kundetyper · Bygge & anlæg",
    title: "Klimaregnskab for malerfirmaer",
    subtitle:
      "Maling, opløsningsmidler, kemi, affald og varevogns-diesel er allerede bogført. qlim8 gør det til dokumentation, du kan aflevere til bygherren — uden regneark.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Din kemi og din varevogn fortæller det meste af historien",
    body:
      "Et malerfirmas aftryk sidder især i indkøbet af maling, opløsningsmidler og kemi (Scope 3, kategori 1), i det affald der følger med, og i dieslen til varevognene (Scope 1). Alt sammen står som posteringer i din bogføring — men at oversætte 200 malingsindkøb til kg CO₂e i hånden er et projekt, ingen malermester har tid til. qlim8 tilslutter Dinero, e-conomic eller Billy og gør det for dig. Når en bygherre eller totalentreprenør sender et dokumentationskrav, trækker du en færdig rapport i stedet for at starte et regneark forfra. Klimaregnskabet bliver en del af bogføringen, ikke en ekstra opgave oven i sæsonen.",
    bullets: [
      "Maling, opløsningsmidler og kemi mappes til Scope 3 kategori 1 automatisk.",
      "Varevogns-diesel regnes som Scope 1 direkte fra dine brændstof-fakturaer.",
      "Affaldsfraktioner registreres, så dokumentationen til bygherren er samlet ét sted.",
    ],
  },
  painPoints: [
    {
      pain: "Indkøb af maling og opløsningsmidler er mange små fakturalinjer, og hver skal kobles til en emissions-faktor.",
      solution:
        "qlim8 foreslår automatisk faktoren for hver linje mod 1.159 danske kategorier og lærer af dine rettelser.",
      outcome: "70-80 % rammer rigtigt uden manuel hjælp [antagelse: confidence ≥ 0,85].",
    },
    {
      pain: "Kemi- og affaldshåndtering er netop det, bygherrer spørger til — men det er svært at sætte tal på.",
      solution:
        "Registrér kemi- og affaldsposter som aktiviteter, så de indgår i klimaregnskabet sammen med indkøb og diesel.",
      outcome: "Ét samlet svar på bygherrens dokumentationskrav i stedet for fire løse ark.",
    },
    {
      pain: "Varevogns-dieslen er en stor post, men den er spredt over mange tank-kvitteringer.",
      solution:
        "Alle brændstof-posteringer samles og omregnes til Scope 1 med danske faktorer, hver måned.",
      outcome: "Du sparer 1-3 timer/md. på manuel opsummering [antagelse: pilotbrugere].",
    },
    {
      pain: "Totalentreprenører kræver ESG-dokumentation som betingelse for at være på deres leverandørliste.",
      solution:
        "Du henter en VSME Basic-rapport med scope-summer og kilde-citation, når kravet lander — ikke uger senere.",
      outcome: "Du bliver på leverandørlisten uden at bruge en weekend på det.",
    },
    {
      pain: "Du er ikke ESG-specialist og vil ikke ansætte en for at svare på et spørgeskema.",
      solution:
        "qlim8 leverer det færdige klimaregnskab; du skal kun godkende de kategoriseringer, systemet er usikkert på.",
      outcome: "Ingen konsulent-regning på 75.000+ kr. [antagelse: markeds-research, sample size 4].",
    },
  ],
  features: [
    {
      title: "Kemi og maling automatisk kategoriseret",
      body:
        "Hver indkøbslinje med maling, spartel, opløsningsmiddel eller lim foreslås mod 1.159 danske emissions-kategorier. Retter du en, huskes rettelsen til næste faktura fra samme leverandør.",
    },
    {
      title: "Affald som en del af regnskabet",
      body:
        "Registrér dine affaldsfraktioner som aktiviteter, så de tæller med i klimaregnskabet. Så er det dokumenteret, når en bygherre spørger til bortskaffelse.",
    },
    {
      title: "Varevogns-diesel → Scope 1",
      body:
        "Dine brændstof-fakturaer bliver til et Scope 1-tal automatisk. Du ser din transport-andel uden at føre kørebog.",
    },
    {
      title: "Dokumentation bygherren kan læse",
      body:
        "VSME Basic-rapporten kommer i underskrifts-klar PDF med kilde-citation. Bygherren eller totalentreprenøren får et tal, de kan stole på, uden at du reformaterer noget.",
    },
    {
      title: "Audit-spor i 7 år",
      body:
        "Alle beregninger og kategori-ændringer logges (CSRD-krav). Din revisor kan spore hvert kg CO₂e tilbage til den underliggende faktura.",
    },
  ],
  valueStats: [
    { value: "1.159", label: "danske kategorier din maling og kemi mappes mod" },
    { value: "70-80 %", label: "af fakturalinjer kategoriseres automatisk", note: "[antagelse: confidence ≥ 0,85]" },
    { value: "fra 300 kr./md.", label: "for basis-flow og VSME Basic" },
    { value: "7 år", label: "audit-spor til revisor" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — maler",
    items: [
      {
        q: "Hvordan tæller maling og opløsningsmidler i klimaregnskabet?",
        a: "De ligger i Scope 3 kategori 1 (indkøbte varer). qlim8 læser dine indkøbsfakturaer og foreslår en dansk emissions-faktor pr. linje, som du kan justere. Rettelser huskes til fremtidige fakturaer.",
      },
      {
        q: "Kan jeg dokumentere min affaldshåndtering?",
        a: "Ja. Du registrerer dine affaldsfraktioner som aktiviteter, og de indgår i regnskabet sammen med indkøb og transport. Det giver ét samlet svar på bygherrens dokumentationskrav.",
      },
      {
        q: "Hvad hvis en totalentreprenør beder om ESG-data med kort frist?",
        a: "Fordi tallene opdateres løbende, henter du en VSME Basic-rapport med det samme. Du starter ikke et regneark forfra hver gang.",
      },
      {
        q: "Skal jeg have ESG-erfaring for at bruge qlim8?",
        a: "Nej. Du tilslutter dit regnskab og godkender de kategoriseringer, systemet er usikkert på. Resten sker automatisk — du behøver hverken ESG-baggrund eller en konsulent.",
      },
      {
        q: "Hvad koster det?",
        a: "Starter koster fra 300 kr./md. med VSME Basic, op til 3.000 aktiviteter pr. billing-periode og 2 seats. Premium (1.195 kr./md.) tilføjer VSME Comprehensive, Scenario Planner og Klimaagent.",
      },
    ],
  },
  closingCta: {
    title: "Gør malerfirmaets kemi og diesel til dokumentation",
    description:
      "Opret en gratis konto, tilslut dit regnskab, og se dit klimaregnskab samme dag. Klar til næste bygherre-krav.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Elektriker
// ---------------------------------------------------------------------------

export const KT_ELEKTRIKER: MarketingPageCopy = {
  hero: {
    eyebrow: "Kundetyper · Bygge & anlæg",
    title: "Klimaregnskab for el-installatører",
    subtitle:
      "Servicevogne, kabel- og komponentindkøb og dit eget elforbrug er allerede data. qlim8 samler det til et klimaregnskab, du kan aflevere som underleverandør på større byggeprojekter.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Som underleverandør bliver du bedt om ESG-data — vær klar",
    body:
      "El-installatører er ofte underleverandør på byggeprojekter, hvor hovedentreprenøren skal aggregere Scope 3 fra sin leverandørkæde. Så lander spørgsmålet hos dig: hvad er jeres CO₂e-aftryk? Det meste af svaret ligger allerede i din bogføring — dieslen i servicevognene (Scope 1), indkøbet af kabler, tavler og komponenter (Scope 3, kategori 1) og dit eget elforbrug (Scope 2). qlim8 tilslutter Dinero, e-conomic eller Billy og trækker dit elforbrug via Eloverblik med danske faktorer i 5-minutters granularitet. I stedet for at gætte på et tal, du sender videre, får du et audit-bakket regnskab, hovedentreprenøren kan lægge direkte ind i sit.",
    bullets: [
      "Servicevogne regnes som Scope 1 direkte fra dine brændstof-fakturaer.",
      "Kabler, tavler og komponenter mappes til Scope 3 kategori 1 automatisk.",
      "Elforbrug hentes via Eloverblik med danske Energinet-faktorer (5-minutters granularitet).",
    ],
  },
  painPoints: [
    {
      pain: "Hovedentreprenøren beder om jeres Scope 3-data til sit eget klimaregnskab, og du har ikke et tal at give.",
      solution:
        "qlim8 leverer dit samlede aftryk med kilde-citation, så du sender et audit-bakket tal videre i stedet for et skøn.",
      outcome: "Du bliver en leverandør, hovedentreprenøren kan bruge — ikke et hul i deres regnskab.",
    },
    {
      pain: "Materialeindkøb er mange linjer — kabler, komponenter, tavler — hver med sin emissions-faktor.",
      solution:
        "AI-kategorisering foreslår faktoren for hver linje mod 1.159 danske kategorier og lærer af dine rettelser.",
      outcome: "70-80 % rammer rigtigt uden manuel hjælp [antagelse: confidence ≥ 0,85].",
    },
    {
      pain: "Dit eget elforbrug er Scope 2, men aflæsning og faktor-valg er besværligt at gøre rigtigt.",
      solution:
        "qlim8 henter forbruget via Eloverblik og bruger danske Energinet-faktorer med 5-minutters granularitet.",
      outcome: "Et præcist Scope 2-tal uden manuel aflæsning eller gæt på faktoren.",
    },
    {
      pain: "Servicevognene kører meget, men dieslen er spredt over utallige tank-kvitteringer.",
      solution:
        "Alle brændstof-posteringer samles og omregnes til Scope 1 hver måned.",
      outcome: "Du sparer 1-3 timer/md. på manuel opsummering [antagelse: pilotbrugere].",
    },
    {
      pain: "Du vil ikke ansætte en ESG-medarbejder for at kunne svare på et spørgeskema fra en hovedentreprenør.",
      solution:
        "qlim8 laver regnskabet; du godkender kun det, systemet er usikkert på, og trækker rapporten når den skal bruges.",
      outcome: "Ingen konsulent-regning på 75.000+ kr. [antagelse: markeds-research, sample size 4].",
    },
  ],
  features: [
    {
      title: "Elforbrug via Eloverblik",
      body:
        "qlim8 henter dit målte elforbrug via Eloverblik og omregner det med danske Energinet-faktorer i 5-minutters granularitet. Dit Scope 2-tal er præcist uden manuel aflæsning.",
    },
    {
      title: "Materialer automatisk kategoriseret",
      body:
        "Kabler, tavler, komponenter og armaturer foreslås mod 1.159 danske emissions-kategorier. Retter du en kategori, huskes den til næste faktura fra samme grossist.",
    },
    {
      title: "Servicevogne → Scope 1",
      body:
        "Dine brændstof-fakturaer bliver til et Scope 1-tal automatisk. Du ser din transport-andel uden kørebog.",
    },
    {
      title: "Et tal hovedentreprenøren kan bruge",
      body:
        "VSME Basic-rapporten kommer i underskrifts-klar PDF med kilde-citation bag hvert kg CO₂e. Hovedentreprenøren kan lægge dit tal direkte ind i sit eget Scope 3-regnskab.",
    },
    {
      title: "Audit-spor i 7 år",
      body:
        "Alle beregninger og kategori-ændringer logges (CSRD-krav). Både din revisor og hovedentreprenørens auditor kan spore hvert tal tilbage til kilden.",
    },
  ],
  valueStats: [
    { value: "5 min.", label: "granularitet på dansk el-CO₂-data (Eloverblik/Energinet)" },
    { value: "1.159", label: "danske kategorier dine materialer mappes mod" },
    { value: "70-80 %", label: "af fakturalinjer kategoriseres automatisk", note: "[antagelse: confidence ≥ 0,85]" },
    { value: "< 1 dag", label: "fra tilslutning til første regnskab", note: "[antagelse: 5/5 piloter]" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — el-installatør",
    items: [
      {
        q: "Hvordan får qlim8 fat i mit elforbrug?",
        a: "Via Eloverblik, hvor dit målte forbrug ligger. qlim8 omregner det med danske Energinet-faktorer i 5-minutters granularitet, så dit Scope 2-tal er præcist uden manuel aflæsning.",
      },
      {
        q: "En hovedentreprenør beder om vores CO₂e-data — hvad afleverer jeg?",
        a: "En VSME Basic-rapport med scope-summer og kilde-citation. Fordi den er audit-bakket, kan hovedentreprenøren lægge dit tal direkte ind i sit eget Scope 3-regnskab uden at bede om mere.",
      },
      {
        q: "Bliver mine kabler og komponenter kategoriseret rigtigt?",
        a: "AI-kategorisering foreslår en dansk faktor pr. indkøbslinje mod 1.159 kategorier. Du godkender eller retter, og systemet husker rettelsen til fremtidige fakturaer fra samme grossist.",
      },
      {
        q: "Skal jeg have en ESG-medarbejder?",
        a: "Nej. Du tilslutter dit regnskab og Eloverblik, godkender de usikre kategoriseringer, og trækker rapporten når den skal bruges. Ingen konsulent, ingen ny stilling.",
      },
      {
        q: "Hvad koster det?",
        a: "Starter koster fra 300 kr./md. med VSME Basic, op til 3.000 aktiviteter pr. billing-periode og 2 seats. Premium (1.195 kr./md.) tilføjer VSME Comprehensive, Scenario Planner og Klimaagent.",
      },
    ],
  },
  closingCta: {
    title: "Vær klar, når hovedentreprenøren spørger om ESG-data",
    description:
      "Opret en gratis konto, tilslut dit regnskab og Eloverblik, og få et audit-bakket klimaregnskab, du kan sende videre samme dag.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// VVS — FLAGSHIP (6 painPoints, 6 features, full howItWorks, 6 FAQ)
// ---------------------------------------------------------------------------

export const KT_VVS: MarketingPageCopy = {
  hero: {
    eyebrow: "Kundetyper · Bygge & anlæg",
    title: "Klimaregnskab for VVS-firmaer — bygget på dit regnskab",
    subtitle:
      "Servicevogne, rør og kedler, kølemidler og servicebesøg er allerede data i din bogføring. qlim8 samler det til et audit-bakket klimaregnskab, du kan aflevere til bygherrer og kommuner i udbud.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Alle fire scopes af et VVS-firma sidder allerede i bogføringen",
    body:
      "Et VVS-firma har et af de mest sammensatte aftryk i håndværksfagene: diesel i servicevognene (Scope 1), F-gasser og kølemidler fra varmepumper og køleanlæg (også Scope 1), elforbrug på værksted og lager (Scope 2), og et stort materialeindkøb af rør, fittings, kedler og pumper (Scope 3, kategori 1). Det er meget at holde styr på i hånden — men det står allerede som posteringer i dit regnskab. qlim8 tilslutter Dinero, e-conomic eller Billy, læser hver faktura og omsætter den til kg CO₂e mod danske faktorer. Resultatet er et løbende klimaregnskab, der er klart, når en bygherre, en kommune eller et offentligt udbud beder om ESG-data — ikke et forårsprojekt med regneark og konsulent.",
    bullets: [
      "Servicevogns-diesel og kølemiddel-påfyldninger regnes som Scope 1.",
      "Elforbrug på værksted og lager hentes via Eloverblik (Scope 2, 5-minutters granularitet).",
      "Rør, kedler, pumper og fittings mappes til Scope 3 kategori 1 automatisk.",
      "VSME Basic / Comprehensive-rapport klar til bygherrer og offentlige udbud.",
    ],
  },
  painPoints: [
    {
      pain: "Servicevognene kører mange kilometer hver dag, og dieslen er din tungeste Scope 1-post — men den ligger spredt over hundredvis af tank-fakturaer.",
      solution:
        "qlim8 samler alle brændstof-posteringer fra dit regnskab og omregner dem til Scope 1 med danske faktorer, automatisk hver måned.",
      outcome: "Ingen manuel opsummering af kvitteringer; du sparer 1-3 timer/md. [antagelse: pilotbrugere, ikke branchevalideret].",
    },
    {
      pain: "F-gasser og kølemidler fra varmepumper og køleanlæg er en ofte glemt Scope 1-post — men de har høj GWP og trækker regnskabet skævt, hvis de mangler.",
      solution:
        "Du registrerer dine kølemiddel-påfyldninger som aktiviteter, og qlim8 omregner dem med den korrekte GWP-faktor.",
      outcome: "Et retvisende Scope 1-tal, der ikke undervurderer dit reelle aftryk.",
    },
    {
      pain: "Materialeindkøbet er enormt — rør, fittings, kedler, pumper, ventiler — og hver linje skal kobles til en emissions-faktor, du ikke kender.",
      solution:
        "AI-kategorisering foreslår faktoren for hver indkøbslinje mod 1.159 danske kategorier og lærer af dine rettelser.",
      outcome: "70-80 % af linjerne rammer rigtigt uden manuel hjælp [antagelse: Ordbogen.ai-confidence ≥ 0,85].",
    },
    {
      pain: "Med mange servicebiler og servicebesøg er det svært at holde styr på, hvad transporten reelt koster i CO₂e.",
      solution:
        "Fordi hele flådens brændstof samles ét sted, ser du transport-andelen af regnskabet uden at føre kørebog pr. bil.",
      outcome: "Overblik over den største påvirkning uden nyt administrativt arbejde.",
    },
    {
      pain: "Bygherrer og kommuner kræver i stigende grad ESG-data som en del af udbud — og uden et tal ryger du ud af feltet.",
      solution:
        "Du henter en VSME Basic- eller Comprehensive-rapport med scope-summer og kilde-citation, når udbuddet kræver det.",
      outcome: "Du kan byde på opgaver, hvor ESG er tildelingskriterium, uden ekstern hjælp.",
    },
    {
      pain: "Du er VVS-mester, ikke ESG-specialist, og du vil ikke bruge en weekend eller en konsulent på et spørgeskema.",
      solution:
        "qlim8 laver det færdige klimaregnskab; du godkender kun de kategoriseringer, systemet er usikkert på.",
      outcome: "Ingen konsulent-regning på 75.000+ kr. [antagelse: markeds-research, sample size 4].",
    },
  ],
  features: [
    {
      title: "Kølemidler og F-gasser i Scope 1",
      body:
        "Registrér dine påfyldninger af kølemiddel som aktiviteter, så omregner qlim8 dem med den korrekte GWP-faktor. Den ofte glemte, men tunge Scope 1-post kommer med — og dit tal bliver retvisende.",
    },
    {
      title: "Servicevogns-diesel → Scope 1 automatisk",
      body:
        "Hver brændstof-postering fra dit regnskab bliver til et Scope 1-tal med den korrekte danske faktor. Du ser hele flådens transport-andel uden kørebog pr. bil.",
    },
    {
      title: "Rør, kedler og pumper kategoriseret for dig",
      body:
        "Hele dit materialeindkøb foreslås automatisk mod 1.159 danske emissions-kategorier. Retter du en kategori, husker systemet det til næste faktura fra samme grossist.",
    },
    {
      title: "Elforbrug via Eloverblik",
      body:
        "Værksteds- og lager-el hentes via Eloverblik og omregnes med danske Energinet-faktorer i 5-minutters granularitet. Dit Scope 2-tal er præcist uden manuel aflæsning.",
    },
    {
      title: "Udbuds-klar VSME-rapport",
      body:
        "VSME Basic og Comprehensive kommer i underskrifts-klar PDF med scope-summer og kilde-citation. Du afleverer et tal, bygherre og kommune kan stole på, uden reformatering.",
    },
    {
      title: "Audit-spor bag hvert kg CO₂e",
      body:
        "Alle beregninger og kategori-ændringer logges i 7 år (CSRD-krav). Når en revisor eller en udbudsgiver spørger til et tal, klikker du dig til fakturaen bag det.",
    },
  ],
  howItWorks: {
    title: "Fra regnskab til udbuds-klar rapport i fire trin",
    steps: [
      {
        title: "Tilslut dit regnskab",
        body:
          "Log ind med Visma Connect og forbind Dinero, e-conomic eller Billy. Tilslut Eloverblik for dit elforbrug. Det tager minutter, ikke et implementeringsprojekt.",
      },
      {
        title: "Lad qlim8 læse dine fakturaer",
        body:
          "Systemet henter dine indkøbs- og brændstof-fakturaer og foreslår en dansk emissions-faktor pr. linje. 70-80 % rammer automatisk [antagelse: confidence ≥ 0,85].",
      },
      {
        title: "Tilføj kølemidler og godkend",
        body:
          "Registrér dine kølemiddel-påfyldninger, og godkend de kategoriseringer, systemet er usikkert på. Herfra lærer qlim8 af dine rettelser og bliver mere præcis over tid.",
      },
      {
        title: "Hent din rapport",
        body:
          "Træk en VSME Basic- eller Comprehensive-rapport i underskrifts-klar PDF med audit-spor. Klar til bygherre, kommune eller offentligt udbud.",
      },
    ],
  },
  valueStats: [
    { value: "1.159", label: "danske kategorier dine rør og kedler mappes mod" },
    { value: "5 min.", label: "granularitet på dansk el-CO₂-data (Eloverblik)" },
    { value: "70-80 %", label: "af fakturalinjer kategoriseres automatisk", note: "[antagelse: confidence ≥ 0,85]" },
    { value: "< 1 dag", label: "fra tilslutning til første klimaregnskab", note: "[antagelse: 5/5 piloter Q4 2025]" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — VVS",
    items: [
      {
        q: "Hvordan får jeg mine F-gasser og kølemidler med i klimaregnskabet?",
        a: "Du registrerer dine kølemiddel-påfyldninger som aktiviteter i qlim8 med type og mængde. Systemet omregner dem med den korrekte GWP-faktor og lægger dem i Scope 1. Det er ofte den post, andre glemmer — og som får et VVS-regnskab til at være retvisende.",
      },
      {
        q: "Tæller servicevognenes diesel som Scope 1 eller Scope 3?",
        a: "Brændstof, du selv køber og forbrænder i egne køretøjer, er Scope 1. qlim8 læser dine brændstof-fakturaer direkte fra regnskabet og omregner dem, så du ikke skal føre kørebog for at få tallet.",
      },
      {
        q: "Kan jeg bruge rapporten til et offentligt udbud, hvor ESG er tildelingskriterium?",
        a: "Ja. VSME Basic dækker de scope-summer og nøgletal, de fleste udbud beder om, og Comprehensive giver den udvidede model. Begge kommer i underskrifts-klar PDF med kilde-citation, så udbudsgiveren kan verificere tallene.",
      },
      {
        q: "Hvor stor en del af mit materialeindkøb kan kategoriseres automatisk?",
        a: "Typisk 70-80 % af fakturalinjerne rammer rigtigt uden manuel hjælp [antagelse: Ordbogen.ai-confidence ≥ 0,85]. Du godkender eller retter resten, og systemet husker dine rettelser til fremtidige fakturaer fra samme grossist.",
      },
      {
        q: "Hvad er forskellen på VSME Basic og Comprehensive for et VVS-firma?",
        a: "VSME Basic dækker de grundlæggende scope-summer og nøgletal og følger med Starter (fra 300 kr./md.). VSME Comprehensive udvider modellen og følger med Premium (1.195 kr./md.) sammen med Scenario Planner, Klimaagent og reduktions-tracking.",
      },
      {
        q: "Skal jeg have en ESG-medarbejder eller en konsulent?",
        a: "Nej. Du tilslutter dit regnskab og Eloverblik, registrerer kølemidler, og godkender de usikre kategoriseringer. Resten sker automatisk. Det erstatter typisk et førstegangs-konsulent-engagement på 75.000-200.000 kr. [antagelse: markeds-research, sample size 4].",
      },
    ],
  },
  closingCta: {
    title: "Gør VVS-firmaets aftryk udbuds-klart",
    description:
      "Opret en gratis konto, tilslut dit regnskab og Eloverblik, registrér dine kølemidler, og få et audit-bakket klimaregnskab, der holder til bygherrer og offentlige udbud.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// Bundled-only long-form editorial body for the flagship VVS page.
export const KT_VVS_BODY: ArticleSection[] = [
  {
    type: "lead",
    text: "Et VVS-firma har et af de mest sammensatte klimaregnskaber i håndværksfagene. Her er, hvordan de fire scopes rammer din forretning, hvad qlim8 trækker automatisk, og hvordan du svarer, når en bygherre eller kommune beder om ESG-data.",
  },
  {
    type: "h2",
    text: "Hvorfor VVS-firmaer får spørgsmål om klimaregnskab nu",
  },
  {
    type: "paragraph",
    text: "Kravet om et klimaregnskab kommer sjældent fra dig selv. Det kommer udefra: din bank kobler grøn finansiering til CO₂e-dokumentation, en totalentreprenør skal aggregere Scope 3 fra sin leverandørkæde, eller en kommune sætter ESG ind som tildelingskriterium i et udbud. For et VVS-firma, der ofte er underleverandør på større byggeprojekter, betyder det, at spørgsmålet før eller siden lander på dit bord — typisk med kort frist og midt i en travl periode.",
  },
  {
    type: "paragraph",
    text: "Den gode nyhed er, at det meste af svaret allerede findes. Dit klimaregnskab sidder i den bogføring, du laver hver måned. Udfordringen er ikke at skaffe data, men at oversætte hundredvis af posteringer til kg CO₂e — og det er præcis den opgave, qlim8 automatiserer ved at tilslutte Dinero, e-conomic eller Billy direkte.",
  },
  {
    type: "h2",
    text: "Sådan mapper de fire scopes til et VVS-firma",
  },
  {
    type: "paragraph",
    text: "GHG Protocol deler et klimaregnskab i tre scopes. For et VVS-firma fylder alle tre — og Scope 1 er mere sammensat end i mange andre fag, fordi kølemidler kommer oveni brændstoffet.",
  },
  {
    type: "list",
    items: [
      "Scope 1 (direkte udledning): Diesel og benzin i servicevognene, som du selv køber og forbrænder. Hertil kommer F-gasser og kølemidler, der lækker eller efterfyldes i varmepumper og køleanlæg — en post med høj GWP, der ofte glemmes.",
      "Scope 2 (indkøbt energi): El til værksted, lager og kontor. Med dansk elmix svinger faktoren time for time, og qlim8 henter det målte forbrug via Eloverblik.",
      "Scope 3 (indirekte, værdikæden): Dit materialeindkøb — rør, fittings, kedler, pumper, ventiler og isolering — ligger i kategori 1 (indkøbte varer og tjenester). For de fleste VVS-firmaer er det her, det store tal gemmer sig.",
    ],
  },
  {
    type: "callout",
    text: "Glem ikke kølemidlerne. F-gasser har en GWP mange gange højere end CO₂, så selv små påfyldninger kan flytte dit Scope 1-tal mærkbart. Registrér dem som aktiviteter, så qlim8 omregner dem med den korrekte faktor — ellers undervurderer regnskabet dit reelle aftryk.",
  },
  {
    type: "h2",
    text: "Hvilke data qlim8 trækker automatisk",
  },
  {
    type: "paragraph",
    text: "Pointen med qlim8 er, at du ikke bygger et regneark. Du tilslutter de systemer, du allerede bruger, og lader platformen læse tallene:",
  },
  {
    type: "list",
    items: [
      "Indkøbs- og brændstof-fakturaer fra Dinero, e-conomic eller Billy — læst og kategoriseret mod 1.159 danske emissions-kategorier.",
      "Elforbrug via Eloverblik med danske Energinet-faktorer i 5-minutters granularitet — dit Scope 2-tal uden manuel aflæsning.",
      "AI-kategorisering, der foreslår en faktor pr. fakturalinje og rammer 70-80 % automatisk [antagelse: confidence ≥ 0,85], og som lærer af dine rettelser.",
      "Manuelt registrerede aktiviteter for det, der ikke står som en faktura — for eksempel kølemiddel-påfyldninger.",
    ],
  },
  {
    type: "paragraph",
    text: "Det, du selv gør, er at godkende de kategoriseringer, systemet er usikkert på, og at registrere de få poster, der ikke findes i bogføringen. Resten er automatik — og fordi rettelser huskes, bliver næste måned hurtigere end den forrige.",
  },
  {
    type: "h2",
    text: "Sådan svarer du på en bygherres ESG-krav",
  },
  {
    type: "ordered-list",
    items: [
      "Læs, hvad der faktisk spørges om. De fleste bygherrer og totalentreprenører vil have scope-summer og et samlet CO₂e-tal — ikke en fuld CSRD-pakke.",
      "Træk en VSME Basic-rapport i qlim8. Den kommer i underskrifts-klar PDF med scope-summer og kilde-citation bag hvert tal.",
      "Hvis udbuddet kræver mere dybde, brug VSME Comprehensive (Premium), der udvider modellen.",
      "Send rapporten. Fordi den er audit-bakket, kan modtageren verificere tallene selv og lægge dit Scope 3-bidrag direkte ind i deres eget regnskab.",
    ],
  },
  {
    type: "paragraph",
    text: "Fordi tallene opdateres løbende, i takt med at du bogfører, starter du ikke forfra hver gang. Du henter rapporten, når den skal bruges — også når fristen er kort.",
  },
  {
    type: "h2",
    text: "VSME for VVS: hvad standarden dækker",
  },
  {
    type: "paragraph",
    text: "VSME (Voluntary SME standard) er EFRAG's frivillige rapporteringsstandard for små og mellemstore virksomheder. Den er skruet sammen, så en SMV kan svare på de ESG-krav, der kommer fra banker, kunder og udbud, uden at skulle løfte den fulde CSRD-byrde. For et VVS-firma betyder det i praksis, at VSME Basic dækker de scope-summer og nøgletal, langt de fleste modparter beder om, mens Comprehensive giver den udvidede model, hvis en større bygherre eller kommune kræver mere.",
  },
  {
    type: "paragraph",
    text: "qlim8's VSME-output er GHG Protocol-konsistent, og VSME-skabelonerne mapper til ESRS E1, så du står stærkt, den dag et krav bevæger sig fra frivilligt til obligatorisk. Vi garanterer ikke compliance — vi understøtter den — men du får et audit-spor på 7 år og kilde-citation bag hvert kg CO₂e, så en revisor eller udbudsgiver kan efterprøve tallet.",
  },
  {
    type: "callout",
    text: "Klimaregnskab behøver ikke være et forårsprojekt. Når det ligger oven på din bogføring, er tallet der, når banken, en bygherre eller et udbud spørger — uden konsulent og uden en weekend i regneark.",
  },
  {
    type: "h2",
    text: "Hvad det koster, og hvornår det betaler sig",
  },
  {
    type: "paragraph",
    text: "qlim8 Starter koster fra 300 kr./md. og dækker basis-flowet plus VSME Basic med op til 3.000 aktiviteter pr. billing-periode og 2 seats. Premium (1.195 kr./md.) tilføjer VSME Comprehensive, Scenario Planner, Klimaagent og reduktions-tracking med op til 7.500 aktiviteter og 5 seats. Til sammenligning løber et førstegangs-VSME-engagement hos et konsulenthus typisk op i 75.000-200.000 kr. [antagelse: markeds-research, sample size 4] — og giver dig et øjebliksbillede i stedet for et tal, du ejer og kan opdatere hele året.",
  },
];

// ---------------------------------------------------------------------------
// Entreprenør
// ---------------------------------------------------------------------------

export const KT_ENTREPRENOER: MarketingPageCopy = {
  hero: {
    eyebrow: "Kundetyper · Bygge & anlæg",
    title: "Klimaregnskab for entreprenører og bygningsentreprenører",
    subtitle:
      "Maskiner og diesel, beton, stål og asfalt, og en flok underleverandører — dit aftryk er stort og sammensat. qlim8 gør det til et audit-bakket regnskab, der holder i offentlige udbud.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Når ESG er tildelingskriterium, skal tallet være i orden",
    body:
      "For en entreprenør er både Scope 1 og Scope 3 tunge. Maskiner og køretøjer sluger diesel (Scope 1), og indkøbet af beton, stål og asfalt trækker et stort Scope 3-aftryk (kategori 1). Oveni skal underleverandørernes bidrag med, hvis en offentlig udbudsgiver kræver det. Kommuner og staten sætter i stigende grad ESG ind som tildelingskriterium — og uden et dokumenteret klimaregnskab taber du point, før prisen overhovedet vurderes. qlim8 tilslutter Dinero, e-conomic eller Billy og omsætter dine fakturaer til kg CO₂e mod danske faktorer. I stedet for at samle tal fra fire regneark får du et løbende regnskab med audit-spor, der er klart, når det næste udbud åbner.",
    bullets: [
      "Diesel til maskiner og køretøjer regnes som Scope 1 fra dine brændstof-fakturaer.",
      "Beton, stål og asfalt mappes til Scope 3 kategori 1 automatisk.",
      "Underleverandørers bidrag kan indsamles og lægges ind i dit regnskab.",
      "VSME-rapport med audit-spor til offentlige udbud, hvor ESG scorer point.",
    ],
  },
  painPoints: [
    {
      pain: "Offentlige udbud sætter ESG ind som tildelingskriterium, og uden et dokumenteret tal taber du point fra start.",
      solution:
        "qlim8 leverer en VSME Basic- eller Comprehensive-rapport med scope-summer og kilde-citation, klar til udbudsmaterialet.",
      outcome: "Du kan konkurrere på opgaver, hvor ESG vægter — uden ekstern konsulent.",
    },
    {
      pain: "Dieslen til maskiner og køretøjer er en stor Scope 1-post, spredt over utallige tank- og leverance-fakturaer.",
      solution:
        "Alle brændstof-posteringer samles og omregnes til Scope 1 med danske faktorer, automatisk hver måned.",
      outcome: "Ét samlet Scope 1-tal uden manuel opsummering af kvitteringer.",
    },
    {
      pain: "Beton, stål og asfalt er dit tunge Scope 3, men hver leverandørlinje skal kobles til en faktor.",
      solution:
        "AI-kategorisering foreslår faktoren for hver indkøbslinje mod 1.159 danske kategorier og lærer af dine rettelser.",
      outcome: "70-80 % rammer rigtigt uden manuel hjælp [antagelse: confidence ≥ 0,85].",
    },
    {
      pain: "På større projekter skal underleverandørernes bidrag med, men at jagte data på mail er tidskrævende.",
      solution:
        "Du kan indsamle underleverandør-data og lægge det ind i dit regnskab ét sted, i stedet for at koordinere via mail-tråde.",
      outcome: "Mindre koordinering i rapporteringssæsonen [antagelse: 3-4 uger sparet for større opgaver, interne tidsmålinger].",
    },
    {
      pain: "Et manuelt regneark holder ikke til en udbudsgivers efterprøvning af tallene.",
      solution:
        "qlim8 giver et 7-årigt audit-spor med kilde-citation bag hvert kg CO₂e, som en udbudsgiver kan verificere.",
      outcome: "Du undgår at få en byd afvist, fordi dokumentationen ikke kan spores.",
    },
  ],
  features: [
    {
      title: "Maskin- og køretøjs-diesel → Scope 1",
      body:
        "Alle brændstof-fakturaer bliver til et Scope 1-tal automatisk. Du ser fordelingen mellem maskiner og køretøjer uden at føre logbog.",
    },
    {
      title: "Tunge materialer kategoriseret for dig",
      body:
        "Beton, stål, asfalt, grus og armering foreslås mod 1.159 danske emissions-kategorier. Retter du en kategori, huskes den til næste faktura fra samme leverandør.",
    },
    {
      title: "Underleverandør-data ét sted",
      body:
        "I stedet for at jagte data på mail kan du indsamle underleverandørernes bidrag og lægge det ind i dit Scope 3. Så er projektets samlede aftryk dokumenteret.",
    },
    {
      title: "Udbuds-klar VSME-rapport",
      body:
        "VSME Basic og Comprehensive kommer i underskrifts-klar PDF med scope-summer og kilde-citation. Den kan lægges direkte i udbudsmaterialet, hvor ESG er tildelingskriterium.",
    },
    {
      title: "Audit-spor i 7 år",
      body:
        "Alle beregninger og kategori-ændringer logges (CSRD-krav). En udbudsgiver eller revisor kan spore hvert tal tilbage til den underliggende faktura.",
    },
  ],
  valueStats: [
    { value: "1.159", label: "danske kategorier dine materialer mappes mod" },
    { value: "70-80 %", label: "af fakturalinjer kategoriseres automatisk", note: "[antagelse: confidence ≥ 0,85]" },
    { value: "3-4 uger", label: "sparet i rapporteringssæson på større opgaver", note: "[antagelse: interne tidsmålinger]" },
    { value: "7 år", label: "audit-spor til udbudsgiver og revisor" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — entreprenør",
    items: [
      {
        q: "Kan jeg bruge rapporten i et offentligt udbud, hvor ESG er tildelingskriterium?",
        a: "Ja. VSME Basic dækker de scope-summer og nøgletal, de fleste udbud beder om, og Comprehensive giver den udvidede model. Begge kommer i underskrifts-klar PDF med kilde-citation, så udbudsgiveren kan efterprøve tallene.",
      },
      {
        q: "Hvordan håndteres beton, stål og asfalt?",
        a: "De ligger i Scope 3 kategori 1. qlim8 læser dine indkøbsfakturaer og foreslår en dansk emissions-faktor pr. linje mod 1.159 kategorier. Du godkender eller retter, og rettelsen huskes til fremtidige fakturaer.",
      },
      {
        q: "Kan jeg få underleverandørernes udledning med?",
        a: "Ja. Du kan indsamle underleverandørernes bidrag og lægge det ind i dit Scope 3 ét sted, i stedet for at koordinere via mail. Det giver projektets samlede aftryk uden løsrevne regneark.",
      },
      {
        q: "Holder qlim8's tal til en udbudsgivers efterprøvning?",
        a: "Ja. Hvert kg CO₂e har kilde-citation, og alle ændringer logges i et 7-årigt audit-spor. En udbudsgiver eller revisor kan spore tallet tilbage til den underliggende faktura.",
      },
      {
        q: "Hvad koster det for et entreprenørfirma?",
        a: "Starter koster fra 300 kr./md. med VSME Basic, op til 3.000 aktiviteter pr. billing-periode og 2 seats. Har du mange fakturaer og brug for underleverandør-koordinering og VSME Comprehensive, giver Premium (1.195 kr./md.) op til 7.500 aktiviteter og 5 seats.",
      },
    ],
  },
  closingCta: {
    title: "Gør entreprenørens klimaregnskab udbuds-klart",
    description:
      "Opret en gratis konto, tilslut dit regnskab, og få et audit-bakket klimaregnskab, der holder, når ESG er tildelingskriterium i næste udbud.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Vognmand
// ---------------------------------------------------------------------------

export const KT_VOGNMAND: MarketingPageCopy = {
  hero: {
    eyebrow: "Kundetyper · Transport",
    title: "Klimaregnskab for vognmænd og transportfirmaer",
    subtitle:
      "Brændstof dominerer dit aftryk, og dine kunder skal bruge transport-emissionsdata til deres eget Scope 3. qlim8 gør din bogføring til et audit-bakket tal, du kan sende videre.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_HERO_CTA,
  },
  intro: {
    heading: "Dine kunder spørger om transport-data — vær den vognmand, der har det",
    body:
      "For en vognmand er klimaregnskabet næsten enkelt at forstå: brændstoffet dominerer. Diesel i lastbiler og trækkere er langt den tungeste Scope 1-post, og resten af regnskabet er beskedent ved siden af. Det svære er ikke at forstå aftrykket, men at dine kunder — vareejerne — nu skal bruge transport-emissionsdata til deres eget Scope 3. Flere af dem er CSRD-pligtige og sender spørgeskemaer med krav om et dokumenteret tal. qlim8 tilslutter Dinero, e-conomic eller Billy, samler alt dit brændstof og omregner det til CO₂e med danske faktorer. Så kan du svare med et audit-bakket tal i stedet for et skøn — og bruge det som argument, når du byder på transportopgaver.",
    bullets: [
      "Brændstof til lastbiler og trækkere regnes som Scope 1 fra dine fakturaer.",
      "Et audit-bakket tal, dine kunder kan lægge direkte ind i deres Scope 3.",
      "Overblik over flådens forbrug som grundlag for optimering.",
      "VSME Basic-rapport, når en CSRD-pligtig kunde beder om dokumentation.",
    ],
  },
  painPoints: [
    {
      pain: "Dine kunder er blevet CSRD-pligtige og kræver transport-emissionsdata til deres Scope 3 — og et løst skøn er ikke nok.",
      solution:
        "qlim8 leverer dit brændstof-aftryk med kilde-citation, så du sender et audit-bakket tal, kunden kan bruge direkte.",
      outcome: "Du bliver den transportør, kunden beholder — ikke et databehov, de skal løse et andet sted.",
    },
    {
      pain: "Brændstoffet dominerer regnskabet, men det ligger spredt over hundredvis af tank- og diesel-fakturaer.",
      solution:
        "Alle brændstof-posteringer samles fra dit regnskab og omregnes til Scope 1 med danske faktorer, automatisk.",
      outcome: "Ét samlet Scope 1-tal uden manuel opsummering [antagelse: 1-3 timer/md. sparet, pilotbrugere].",
    },
    {
      pain: "Uden overblik over flådens forbrug er det svært at vide, hvor en optimering rent faktisk flytter noget.",
      solution:
        "qlim8 viser forbruget samlet, så du ser, hvor det tunge aftryk ligger, før du beslutter tiltag.",
      outcome: "Et databaseret grundlag for flådeoptimering i stedet for mavefornemmelse.",
    },
    {
      pain: "Du vil bruge et lavt CO₂e-tal aktivt, når du byder på opgaver — men du kan ikke dokumentere det.",
      solution:
        "En VSME Basic-rapport med audit-spor gør dit tal troværdigt nok til at lægge på bordet hos en vareejer.",
      outcome: "ESG bliver et salgsargument i stedet for en byrde.",
    },
    {
      pain: "Du er vognmand, ikke ESG-specialist, og har hverken tid eller lyst til en konsulent.",
      solution:
        "qlim8 laver regnskabet; du godkender kun det, systemet er usikkert på, og trækker rapporten når den skal bruges.",
      outcome: "Ingen konsulent-regning på 75.000+ kr. [antagelse: markeds-research, sample size 4].",
    },
  ],
  features: [
    {
      title: "Brændstof → Scope 1 automatisk",
      body:
        "Hver diesel-postering fra dit regnskab bliver til et Scope 1-tal med den korrekte danske faktor. Dét er kernen i en vognmands klimaregnskab, og det kommer af sig selv.",
    },
    {
      title: "Et tal dine kunder kan bruge",
      body:
        "VSME Basic-rapporten kommer i underskrifts-klar PDF med kilde-citation. En CSRD-pligtig kunde kan lægge dit transport-tal direkte ind i sit eget Scope 3-regnskab.",
    },
    {
      title: "Overblik til flådeoptimering",
      body:
        "Du ser flådens samlede forbrug ét sted. Det giver et databaseret grundlag for at vurdere, hvor en investering i nyere køretøjer eller ruteplanlægning rent faktisk flytter noget.",
    },
    {
      title: "ESG som salgsargument",
      body:
        "Med et dokumenteret tal kan du bruge dit aftryk aktivt, når du byder på transportopgaver — i stedet for at ESG kun er noget, du skal svare på.",
    },
    {
      title: "Audit-spor i 7 år",
      body:
        "Alle beregninger logges (CSRD-krav). Både din kunde og deres auditor kan spore dit transport-tal tilbage til de underliggende brændstof-fakturaer.",
    },
  ],
  valueStats: [
    { value: "Scope 1", label: "hvor brændstoffet dominerer dit aftryk" },
    { value: "8", label: "lande med EXIOBASE-data, hvis du kører internationalt", note: "SE, NO, DE, NL, GB, PL, UA + DK" },
    { value: "1-3 timer/md.", label: "sparet på manuel opsummering", note: "[antagelse: pilotbrugere]" },
    { value: "7 år", label: "audit-spor til CSRD-pligtige kunder" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — vognmand",
    items: [
      {
        q: "En kunde beder om transport-emissionsdata til deres Scope 3 — hvad afleverer jeg?",
        a: "En VSME Basic-rapport eller dit dokumenterede brændstof-aftryk med kilde-citation. Fordi det er audit-bakket, kan kunden lægge dit tal direkte ind i sit eget Scope 3 uden at bede om mere.",
      },
      {
        q: "Er brændstof det eneste, der tæller for en vognmand?",
        a: "Det er den dominerende post, men ikke det eneste. qlim8 tager også dit elforbrug (Scope 2) og dit øvrige indkøb (Scope 3) med, så regnskabet er komplet — brændstoffet fylder bare mest.",
      },
      {
        q: "Kan qlim8 hjælpe med flådeoptimering?",
        a: "qlim8 måler og giver overblik over forbruget — vi reducerer ikke for dig. Men overblikket er grundlaget: du ser, hvor det tunge aftryk ligger, før du beslutter, om nyere køretøjer eller bedre ruteplanlægning betaler sig.",
      },
      {
        q: "Hvad hvis jeg kører internationalt?",
        a: "qlim8 har EXIOBASE-data for 8 lande (SE, NO, DE, NL, GB, PL, UA og DK), så indkøb og aktiviteter i de markeder kan omregnes med landespecifikke faktorer.",
      },
      {
        q: "Hvad koster det for et vognmandsfirma?",
        a: "Starter koster fra 300 kr./md. med VSME Basic, op til 3.000 aktiviteter pr. billing-periode og 2 seats. Kører du meget og vil bruge Scenario Planner til at teste optimeringer, giver Premium (1.195 kr./md.) op til 7.500 aktiviteter og 5 seats.",
      },
    ],
  },
  closingCta: {
    title: "Vær vognmanden, der har transport-data klar",
    description:
      "Opret en gratis konto, tilslut dit regnskab, og få et audit-bakket brændstof-regnskab, dine kunder kan bruge i deres Scope 3.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};
