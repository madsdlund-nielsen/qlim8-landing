import type { MarketingPageCopy } from "@/content/marketing/types";

// Produkt-copy (batch C) — features:
//   PR_TILTAG           reduktions-tiltag / -tracking   (kilde: reduction-tracking.md)
//   PR_SCENARIER        scenario planner                (kilde: scenario-planner.md)
//   PR_REVISOR_ADGANG   revisor / tredjeparts-adgang    (kilde: for-accountants.md)
//   PR_LEVERANDOERKAEDE Scope 3 værdikæde               (kilde: scope3-supply-chain.md)
//   PR_BRAGBOARD        offentlig ESG-profil            (kilde: public-esg-profile.md)
//
// Voice per docs/da/marketing/_shared/{brand-voice,positioning}.md.
// Tal uden citeret kilde bærer [antagelse]-tag.

const PRIMARY_CTA = {
  label: "Opret gratis konto",
  href: "https://app.qlim8.com/auth?tab=register",
} as const;

const HERO_SECONDARY_CTA = { label: "Se priser", href: "/priser" } as const;
const DEMO_CTA = { label: "Book demo", href: "/kontakt" } as const;

// ---------------------------------------------------------------------------
// PR_TILTAG — Reduktions-tiltag og fremdrift
// ---------------------------------------------------------------------------

export const PR_TILTAG: MarketingPageCopy = {
  hero: {
    eyebrow: "Tiltag",
    title: "Sæt et reduktions-mål — og se hver måned om I er på vej",
    subtitle:
      "Opret konkrete reduktionstiltag, knyt dem til dit klimaregnskab, og følg fremdriften mod målet måned for måned. Ikke en hensigt i en strategi-fil — målbar bevægelse.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Et mål uden måling er bare en hensigt",
    body:
      "\"50 % reduktion i 2030\" lyder konkret, indtil du opdager at det kræver målbar fremdrift hver eneste måned — ikke en heroisk indsats i Q4 2029. Problemet i de fleste virksomheder er, at målet står i en strategi-fil, mens det faktiske regnskab ligger et andet sted. Afstemningen sker manuelt én gang om året, og så er det ofte for sent at korrigere. qlim8 forbinder dine mål med det faktiske klimaregnskab: du opretter et mål, tilknytter de tiltag der skal levere reduktionen, og ser rød-gul-grøn-status pr. måned. Halter et tiltag, opdager du det inden for 1-2 måneder — mens der stadig er tid at gøre noget.",
    bullets: [
      "Absolutte eller intensitets-baserede mål mod et valgt baseline-år",
      "SBTi-konforme target-skabeloner (1,5 °C, well-below-2 °C)",
      "Tiltag-status: planlagt → i gang → implementeret → verificeret",
      "Read-only bestyrelses-link — deles uden ekstra seat-cost",
    ],
  },
  painPoints: [
    {
      pain:
        "Jeres 2030-mål lever i en strategi-Excel, og udledningen lever i regnskabet. De to mødes kun ved årsafslutning.",
      solution:
        "qlim8 kobler målet direkte på det faktiske klimaregnskab, så mål-trajektorien og den reelle udledning vises i samme graf hver måned.",
      outcome:
        "Fra én manuel afstemning om året til løbende status — 4-8 timer sparet pr. kvartal på afstemning [antagelse: pilot-interview].",
    },
    {
      pain:
        "Bestyrelsen spørger \"er vi på sporet?\", og svaret kræver en dags forberedelse og en masse forbehold.",
      solution:
        "Et read-only dashboard-link viser rød-gul-grøn-status pr. mål. I deler det før mødet i stedet for at bygge slides.",
      outcome:
        "Bestyrelses-rapportering går fra ~1 dags forberedelse til ~20 minutter [antagelse: pilot-interview].",
    },
    {
      pain:
        "Et tiltag leverer ikke som forventet — men det opdager I først ved årsopgørelsen, hvor det er for sent at rette op.",
      solution:
        "Månedlig fremdrift pr. tiltag gør at et halt tiltag lyser rødt med det samme, og du kan klikke ind og se hvilke aktiviteter der trækker op.",
      outcome:
        "Fejlende tiltag fanges på 1-2 måneder i stedet for ved årsafslutning.",
    },
    {
      pain:
        "I vil gerne sætte et ambitiøst mål, men frygter at blive beskyldt for greenwashing hvis metoden ikke holder.",
      solution:
        "Indbyggede SBTi-konforme skabeloner (1,5 °C, well-below-2 °C) giver et videnskabeligt funderet mål frem for et tal I selv har fundet på.",
      outcome:
        "Målet er dokumenterbart metodisk funderet — mindre eksponering mod greenwashing-kritik.",
    },
    {
      pain:
        "Konsulent-tracking af reduktioner koster 25.000-50.000 kr. for en årlig review, og resten af året famler I i blinde.",
      solution:
        "Reduktions-modulet er inkluderet i Premium og opdaterer løbende — ikke en engangs-review, men et levende dashboard.",
      outcome:
        "Løbende tracking til Premium-pris (625 kr/md) i stedet for en årlig konsulent-review til 25.000-50.000 kr.",
    },
  ],
  features: [
    {
      title: "Mål bygget på baseline",
      body:
        "Sæt et absolut eller intensitets-baseret mål mod et valgt baseline-år, fx \"50 % reduktion på Scope 1+2 i 2030 mod 2024\". Målet lever oven på dit faktiske regnskab, ikke i et sideløbende ark.",
    },
    {
      title: "SBTi-konforme skabeloner",
      body:
        "Vælg en færdig trajektorie (1,5 °C eller well-below-2 °C) i stedet for at regne kurven ud selv. Skabelonen giver et videnskabeligt funderet mål og reducerer risikoen for greenwashing-kritik.",
    },
    {
      title: "Tiltag med livscyklus",
      body:
        "Opret konkrete tiltag og følg hvert fra planlagt → i gang → implementeret → verificeret. Du ser præcis hvad der leverer reduktion, og hvad der stadig kun er en plan.",
    },
    {
      title: "Månedlig fremdrifts-graf",
      body:
        "En kurve viser mål-trajektorie mod faktisk udledning, opdateret hver måned — ikke et kvartals- eller års-snapshot. Rød-gul-grøn-status pr. mål gør det til et sekunds-tjek.",
    },
    {
      title: "ROI pr. tiltag",
      body:
        "Se effekten af hvert tiltag på klimaregnskabet, så I kan prioritere de tiltag der faktisk flytter tallet. Beslutninger om reduktion bliver til data, ikke mavefornemmelse.",
    },
    {
      title: "Read-only bestyrelses-link",
      body:
        "Del et link til dashboardet med bestyrelse eller ledelse uden at bruge en betalt seat. De ser status live til hvert kvartalsmøde, uden at I forbereder en ny præsentation.",
    },
  ],
  howItWorks: {
    title: "Fra mål til målt fremdrift",
    steps: [
      {
        title: "1. Opret målet",
        body:
          "Vælg scope, baseline-år og reduktions-procent, og læg en SBTi-konform trajektorie ind. På få minutter har du en kurve at måle mod.",
      },
      {
        title: "2. Knyt tiltagene",
        body:
          "Tilføj de konkrete tiltag der skal levere reduktionen, og sæt status på hvert. Systemet kobler dem til de aktiviteter i regnskabet de påvirker.",
      },
      {
        title: "3. Følg fremdriften",
        body:
          "Hver måned viser dashboardet mål mod faktisk med rød-gul-grøn-status. Klik en rød kategori for at se præcis hvad der trækker op.",
      },
      {
        title: "4. Del med bestyrelsen",
        body:
          "Send read-only-linket før kvartalsmødet. Ingen slide-produktion, ingen \"hvad skete der i Q3?\" — status står live.",
      },
    ],
  },
  valueStats: [
    {
      value: "1-2 mdr.",
      label: "til at opdage et haltende tiltag",
      note: "mod ved årsafslutning",
    },
    {
      value: "4-8 timer",
      label: "sparet pr. kvartal på afstemning",
      note: "[antagelse: pilot-interview]",
    },
    {
      value: "~20 min.",
      label: "bestyrelses-rapportering",
      note: "fra ~1 dags forberedelse [antagelse]",
    },
    {
      value: "0 kr.",
      label: "seat-cost for bestyrelses-link",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om reduktions-tracking",
    items: [
      {
        q: "Hvad er forskellen på et mål og et tiltag?",
        a: "Et mål er destinationen — fx 50 % reduktion på Scope 1+2 i 2030. Et tiltag er en konkret handling der skal levere reduktionen, fx skift til elbiler eller ny varmekilde. I qlim8 knytter du tiltag til mål og følger hvert tiltag fra planlagt til verificeret.",
      },
      {
        q: "Hvad er et SBTi-konformt mål?",
        a: "Det er et reduktions-mål der følger en trajektorie i tråd med Science Based Targets initiative — enten en 1,5 °C- eller well-below-2 °C-kurve. qlim8 har skabelonerne indbygget, så du vælger kurven i stedet for at regne den ud selv. Det gør målet videnskabeligt funderet frem for et tal du selv har sat.",
      },
      {
        q: "Hvor ofte opdateres fremdriften?",
        a: "Månedligt. Så snart nyt regnskabsdata er i systemet, genberegnes fremdriften mod målet. Det betyder at et tiltag der ikke leverer, viser sig inden for 1-2 måneder — ikke først ved årsafslutning.",
      },
      {
        q: "Kan bestyrelsen få adgang uden at vi betaler for en ekstra bruger?",
        a: "Ja. Du kan dele et read-only dashboard-link til bestyrelse eller ledelse uden seat-cost. De ser status live, men kan ikke ændre data.",
      },
      {
        q: "Er reduktions-modulet med i alle abonnementer?",
        a: "Starter (fra 250 kr/md) har basis reduktions-tracking med ét mål. Det fulde modul — ubegrænsede mål, SBTi-skabeloner og scenario-til-target-konvertering — er inkluderet i Premium (625 kr/md). Enterprise tilføjer mål pr. afdeling.",
      },
      {
        q: "Kan vi sætte mål pr. afdeling?",
        a: "På Enterprise-tier kan I sætte mål på afdelings-niveau og allokere reduktion pr. forretningsenhed. På Premium sætter I mål på virksomheds-niveau.",
      },
    ],
  },
  closingCta: {
    title: "Gør 2030-målet til noget I kan måle hver måned",
    description:
      "Opret dit første reduktions-mål, knyt tiltagene, og se fremdriften mod baseline løbende. Fuldt modul i Premium; del med bestyrelsen uden ekstra seat.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_SCENARIER — Scenario Planner
// ---------------------------------------------------------------------------

export const PR_SCENARIER: MarketingPageCopy = {
  hero: {
    eyebrow: "Scenarier",
    title: "Test reduktionen på dit eget regnskab — før du investerer",
    subtitle:
      "Simulér fremtidige reduktionsstier direkte på dit faktiske klimaregnskab, sammenlign scenarier mod målet, og beslut på data i stedet for mavefornemmelse.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "\"Hvor meget CO₂e sparer vi?\" — svaret på minutter, ikke uger",
    body:
      "Skal I skifte til elbiler? Udskifte jeres største leverandør? Indføre fjernarbejde? Hver beslutning koster penge, og ledelsen vil typisk vide hvor meget CO₂e den sparer, før de underskriver. Den klassiske vej er en konsulent-analyse: 4-6 uger og 50.000-150.000 kr. pr. beslutning [antagelse: pilot-interview] — og når svaret kommer, er beslutningen ofte allerede taget. qlim8 Scenario Planner går den anden vej. Du markerer de aktiviteter et tiltag påvirker, vælger tiltaget, og systemet genberegner den nye total på dit eget regnskab. Du sammenligner flere scenarier side om side, deler med ledelsen, og konverterer det godkendte scenarie til et reduktions-mål med ét klik.",
    bullets: [
      "Modellér på dine egne tal — ikke en generisk online-kalkulator",
      "Sammenlign op til 4 scenarier side om side mod baseline",
      "Se både CO₂e-effekt og økonomisk indvirkning",
      "Konvertér et godkendt scenarie til et reduktions-mål med ét klik",
    ],
  },
  painPoints: [
    {
      pain:
        "Ledelsen beder om \"hvor meget CO₂e sparer vi\", men der findes ikke et one-button-svar — og en konsulent-rapport tager 6 uger.",
      solution:
        "Scenario Planner modellerer ændringen direkte på dit klimaregnskab og viser den nye total på minutter, med kilde-citation på tallene.",
      outcome:
        "Test 3-5 scenarier på en eftermiddag i stedet for at booke et nyt konsulent-forløb for hvert [antagelse: pilot-interview].",
    },
    {
      pain:
        "Konsulent-kortlægning koster 50.000-150.000 kr. pr. beslutning [antagelse], og det er et engangs-svar der forældes så snart forudsætningerne ændrer sig.",
      solution:
        "Scenario Planner er inkluderet i Premium (625 kr/md) og kører løbende, så I kan modellere igen hver gang tallene skifter.",
      outcome:
        "Erstat konsulent-kortlægning på 50.000-150.000 kr. pr. beslutning [antagelse] med en inkluderet feature.",
    },
    {
      pain:
        "I risikerer at investere 200.000 kr. i et tiltag ud fra en antaget effekt der viser sig at være helt forkert.",
      solution:
        "Fordi modellen bruger dine faktiske aktiviteter og faktorer, ser I den reelle effekt før pengene bindes — fx at et elbil-skift kun giver 8 % og ikke de antagede 30 %.",
      outcome:
        "Undgå fejl-investeringer ved at se det reelle hjemtag før beslutningen tages.",
    },
    {
      pain:
        "Når estimatet endelig lander, spørger ledelsen \"hvor kom det tal fra?\", og diskussionen starter forfra.",
      solution:
        "Baseline og scenarie vises side om side med gemte forudsætninger og dato, så grundlaget er gennemsigtigt og efterprøvbart.",
      outcome:
        "Ingen \"hvor kom estimatet fra?\"-runder — forudsætningerne er gemt med scenariet.",
    },
    {
      pain:
        "Et godkendt scenarie ender som en slide, ikke som noget I rent faktisk følger op på bagefter.",
      solution:
        "Konvertér det godkendte scenarie til et reduktions-mål med ét klik, så tiltaget måles mod det faktiske regnskab fremover.",
      outcome:
        "Fra plan til målt fremdrift uden at genindtaste noget — planen bliver til et sporet mål.",
    },
  ],
  features: [
    {
      title: "Modellér på dine egne tal",
      body:
        "Scenariet bygger på dit faktiske klimaregnskab, ikke gennemsnitstal fra en online-kalkulator. Du markerer hvilke aktiviteter tiltaget påvirker, og systemet genberegner med de rigtige emissionsfaktorer.",
    },
    {
      title: "Sammenlign side om side",
      body:
        "Stil op til 4 scenarier op mod baseline i samme graf. Ledelsen ser \"gør vi ingenting\", \"elbiler\" og \"leverandør-skift\" ved siden af hinanden og kan beslutte på ét blik.",
    },
    {
      title: "CO₂e og kroner samtidig",
      body:
        "Hvert scenarie viser både den forventede CO₂e-effekt og den økonomiske indvirkning. Beslutningen bliver en afvejning på data, på samme måde som økonomi-afdelingen modellerer ROI før en investering.",
    },
    {
      title: "Hurtig genberegning",
      body:
        "Genberegning på 5.000+ aktiviteter sker på under 2 sekunder, så du kan justere forudsætninger live foran ledelsen. Ingen ventetid mellem \"hvad hvis\" og svaret.",
    },
    {
      title: "Del med et read-only-link",
      body:
        "Send scenariet til ledelse eller bestyrelse via et read-only-link, eller eksportér som PDF til en præsentation. Modtageren ser sammenligningen uden at kunne ændre forudsætningerne.",
    },
    {
      title: "Konvertér til mål",
      body:
        "Når et scenarie er godkendt, konverterer du det til et reduktions-mål med ét klik. Tiltaget bliver derefter målt mod det faktiske regnskab, så plan og virkelighed holdes op mod hinanden.",
    },
  ],
  howItWorks: {
    title: "Fra \"hvad nu hvis\" til besluttet",
    steps: [
      {
        title: "1. Opret et scenarie",
        body:
          "Giv scenariet et navn, fx \"Elbil-skift 2027\", og tag udgangspunkt i dit nuværende regnskab som baseline.",
      },
      {
        title: "2. Vælg tiltag og aktiviteter",
        body:
          "Marker de aktiviteter tiltaget påvirker — fx firmabil-kørslen — og vælg tiltaget. Systemet genberegner totalen med de nye faktorer.",
      },
      {
        title: "3. Sammenlign mod mål",
        body:
          "Stil scenariet op mod baseline og andre scenarier, og se om det bringer jer på linje med reduktions-målet. Justér forudsætninger live.",
      },
      {
        title: "4. Beslut og konvertér",
        body:
          "Del med ledelsen, og konvertér det godkendte scenarie til et reduktions-mål med ét klik, så det måles fremover.",
      },
    ],
  },
  valueStats: [
    {
      value: "3-5",
      label: "scenarier på en eftermiddag",
      note: "[antagelse: pilot-interview]",
    },
    {
      value: "50-150k kr.",
      label: "sparet konsulent-analyse pr. beslutning",
      note: "[antagelse]",
    },
    {
      value: "< 2 sek.",
      label: "genberegning af 5.000+ aktiviteter",
    },
    {
      value: "1 klik",
      label: "fra godkendt scenarie til mål",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Scenario Planner",
    items: [
      {
        q: "Hvordan adskiller det sig fra en online CO₂-kalkulator?",
        a: "En online-kalkulator bruger gennemsnitstal og ved intet om din virksomhed. Scenario Planner modellerer ændringen på dit eget klimaregnskab — dine faktiske aktiviteter og de rigtige emissionsfaktorer — så tallet afspejler netop jeres situation, ikke et branchegennemsnit.",
      },
      {
        q: "Kan jeg sammenligne flere scenarier på én gang?",
        a: "Ja. Du kan stille op til 4 scenarier op mod baseline i samme visning, så ledelsen ser \"gør intet\", \"elbiler\" og \"leverandør-skift\" side om side og kan beslutte på ét blik.",
      },
      {
        q: "Viser scenariet også den økonomiske effekt?",
        a: "Ja. Hvert scenarie beregner både CO₂e-effekt og økonomisk indvirkning, så beslutningen bliver en afvejning på data — ikke kun et klima-tal isoleret fra kronerne.",
      },
      {
        q: "Hvad sker der når vi har besluttet os?",
        a: "Du konverterer det godkendte scenarie til et reduktions-mål med ét klik. Derefter måles tiltaget mod det faktiske regnskab måned for måned, så I kan se om det reelt leverer det scenariet lovede.",
      },
      {
        q: "Hvilket abonnement kræver Scenario Planner?",
        a: "Scenario Planner er en Premium-feature (625 kr/md) og er ikke inkluderet i Starter. Enterprise tilføjer leverandør-allokering i scenarier, fx effekten af at flytte en leverandør fra Tyskland til Sverige, som påvirker Scope 3.",
      },
      {
        q: "Kan en konsulent bruge det til klient-rådgivning?",
        a: "Ja. Bæredygtigheds-konsulenter bruger scenarier som leverance til klienten og kan eksportere dem som PDF til præsentation. Det erstatter en manuel hvad-hvis-analyse i regneark.",
      },
    ],
  },
  closingCta: {
    title: "Beslut din næste reduktion på data — ikke på et gæt",
    description:
      "Modellér tiltag på dit eget klimaregnskab, sammenlign scenarier mod målet, og konvertér det godkendte til et reduktions-mål. Inkluderet i Premium.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_REVISOR_ADGANG — Revisor / tredjeparts-adgang
// ---------------------------------------------------------------------------

export const PR_REVISOR_ADGANG: MarketingPageCopy = {
  hero: {
    eyebrow: "Revisor-adgang",
    title: "Giv din revisor direkte adgang — slut med frem-og-tilbage-mails",
    subtitle:
      "Lad din revisor eller rådgiver arbejde direkte i klimaregnskabet med read-only audit-adgang. De validerer data og følger audit-sporet selv, uden at I sender filer frem og tilbage.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Én adgang i stedet for tolv fil-versioner",
    body:
      "Rapporterings-sæsonen ender ofte i en mail-kæde: revisoren beder om et bilag, du sender en Excel-fil, de spørger hvor et tal kommer fra, du graver i regnskabet, og sådan fortsætter det. qlim8 vender det om. Med tredjeparts-adgang får din revisor eller rådgiver et audit-pack-scope: fuld lineage på hver kg CO₂e tilbage til kilde-fakturaen, read-only, så de kan validere data uden at kunne ændre noget ved et uheld. De ser det samme regnskab som dig, i realtid. Når rapporten er klar, sender du en sign-off-anmodning, og revisorens underskrift låses kryptografisk — selv hvis regnskabet senere ændres, forbliver den underskrevne version uændret.",
    bullets: [
      "Audit-pack-scope: fuld lineage, read-only — designet til revisor-arbejde",
      "Kryptografisk sign-off, så den underskrevne rapport-version låses",
      "Privat kommentar-tråd pr. klient og pr. emission-post",
      "Ét konsulent-login dækker ubegrænset klienter — ingen seat-fee pr. klient",
    ],
  },
  painPoints: [
    {
      pain:
        "Revisoren spørger hvor et tal kommer fra, og du bruger en halv dag på at grave kilde-fakturaen frem og forklare beregningen.",
      solution:
        "Audit-pack-scope giver revisoren fuld lineage: de klikker sig fra en kg CO₂e tilbage til kilde-fakturaen selv, uden at spørge dig.",
      outcome:
        "Færre frem-og-tilbage-mails — revisoren validerer sporet direkte i stedet for at bede om bilag.",
    },
    {
      pain:
        "Hver klient har sit eget Excel-ark, og en klimaregnskab-rapport i regneark tager 40-80 timer at bygge.",
      solution:
        "I qlim8 arbejder revisoren i ét system med lineage og skabeloner, så tiden pr. klient-rapport falder markant.",
      outcome:
        "4-8 timer pr. klient-rapport mod 40-80 timer i en Excel-baseret tilgang [antagelse: pilot-revisor-interviews].",
    },
    {
      pain:
        "ESG-konsulent-software koster pr. klient-licens, og indlæringskurven æder marginen på en ny ydelse.",
      solution:
        "Med tredjeparts-adgang har du ét konsulent-login der dækker ubegrænset klienter, og klient-tenant betaler selv abonnementet.",
      outcome:
        "En praksis med 20 klimaregnskab-klienter à 15.000-40.000 kr/år kan tilføje ~300.000-800.000 kr/år i omsætning [antagelse: markeds-research].",
    },
    {
      pain:
        "Du er nervøs for ved et uheld at ændre klientens data, mens du gennemgår regnskabet.",
      solution:
        "Audit-pack-scope er read-only — du kan se hver post og hele sporet, men ikke ændre noget. Klientens data er beskyttet.",
      outcome:
        "Ingen risiko for utilsigtede ændringer i klient-data under review.",
    },
    {
      pain:
        "En underskrevet rapport skal kunne stå fast — men i regneark kan tallene ændre sig efter din underskrift.",
      solution:
        "Sign-off-flowet giver en kryptografisk underskrift der låses til rapport-versionen. Ændrer klienten regnskabet senere, forbliver den underskrevne version uændret.",
      outcome:
        "Audit-integritet som CSRD og VSME kræver — din underskrift kan ikke rykkes bagudrettet.",
    },
  ],
  features: [
    {
      title: "Ét login, ubegrænset klienter",
      body:
        "Tredjeparts-adgang lader dig håndtere alle dine klienters klimaregnskab via ét konsulent-login. Klient-tenant betaler abonnementet, så du ikke lægger licens-omkostning oven i din egen drift.",
    },
    {
      title: "Audit-pack-scope",
      body:
        "En read-only adgang designet til revisor-arbejde: fuld lineage fra hver kg CO₂e tilbage til kilde-fakturaen. Du validerer data og følger sporet uden write-access, så du ikke kan ændre klientens tal.",
    },
    {
      title: "Kryptografisk sign-off",
      body:
        "Når rapporten er klar, anmoder du om underskrift, og din signatur låses kryptografisk til versionen. Selv om klienten senere ændrer regnskabet, står den underskrevne rapport uændret — den audit-integritet CSRD og VSME kræver.",
    },
    {
      title: "Private kommentar-tråde",
      body:
        "Kommentér pr. klient og pr. emission-post i en privat tråd. Din interne dokumentation og dine noter til en konkret post forbliver interne og adskilt fra klientens visning.",
    },
    {
      title: "Portefølje-overblik",
      body:
        "Log ind én gang og se alle dine klienter med rød-gul-grøn-status pr. rapport. Du prioriterer de klienter der halter, i stedet for at åbne 23 separate filer for at finde ud af hvor du står.",
    },
    {
      title: "Skaler ydelsen",
      body:
        "Pilot-revisorer fortæller at de kan håndtere 4-6× flere klimaregnskab-klienter i qlim8 end i en Excel-baseret tilgang [antagelse: 3 pilot-revisor-interviews]. Du tilbyder en ydelse kunderne kræver, uden at hyre ESG-specialister.",
    },
  ],
  howItWorks: {
    title: "Sådan giver du din revisor adgang",
    steps: [
      {
        title: "1. Inviter revisoren",
        body:
          "Fra dit klimaregnskab sender du en tredjeparts-adgangs-invitation til din revisor eller rådgiver. De behøver ikke deres egen betalte seat.",
      },
      {
        title: "2. Revisoren får audit-pack-scope",
        body:
          "Revisoren accepterer og får read-only adgang med fuld lineage. De ser hver post og kan følge sporet tilbage til kilde-fakturaen selv.",
      },
      {
        title: "3. Valider og kommentér",
        body:
          "Revisoren validerer data og efterlader noter i den private kommentar-tråd pr. post — uden at kunne ændre tallene.",
      },
      {
        title: "4. Sign-off og lås",
        body:
          "Når rapporten er klar, anmoder du om underskrift. Revisorens signatur låses kryptografisk til versionen som audit-spor.",
      },
    ],
  },
  valueStats: [
    {
      value: "4-8 timer",
      label: "pr. klient-rapport",
      note: "mod 40-80 i Excel [antagelse]",
    },
    {
      value: "4-6×",
      label: "flere klienter pr. konsulent",
      note: "[antagelse: pilot-revisor-interviews]",
    },
    {
      value: "0 kr.",
      label: "seat-fee pr. klient",
      note: "klient-tenant betaler",
    },
    {
      value: "Read-only",
      label: "audit-pack — ingen utilsigtede ændringer",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om revisor-adgang",
    items: [
      {
        q: "Koster det ekstra at give min revisor adgang?",
        a: "Nej. Med tredjeparts-adgang får revisoren et audit-pack-scope uden egen betalt seat. Det er klient-tenant der betaler abonnementet (Starter fra 250 kr/md eller Premium 625 kr/md), og revisorens adgang lægger ikke licens-omkostning oveni.",
      },
      {
        q: "Kan revisoren ændre i vores regnskab?",
        a: "Nej. Audit-pack-scope er bevidst read-only. Revisoren kan se hver post og følge hele lineagen fra kg CO₂e tilbage til kilde-fakturaen, men kan ikke ændre data. Det beskytter klientens tal mod utilsigtede ændringer.",
      },
      {
        q: "Hvad betyder kryptografisk sign-off?",
        a: "Når revisoren underskriver en rapport, låses signaturen til den præcise version. Ændrer I regnskabet bagefter, forbliver den underskrevne version uændret og kan stadig fremvises. Det er den audit-integritet CSRD og VSME kræver.",
      },
      {
        q: "Kan én revisor håndtere flere klienter i samme login?",
        a: "Ja. Ét konsulent-login dækker ubegrænset klienter. Du logger ind ét sted og ser alle klienter med status pr. rapport, i stedet for at skifte mellem separate systemer eller filer.",
      },
      {
        q: "Hvordan holder vi interne noter adskilt fra klienten?",
        a: "Der er en privat kommentar-tråd pr. klient og pr. emission-post. Dine noter til en konkret post er isoleret og vises ikke til klienten, så intern dokumentation forbliver intern.",
      },
      {
        q: "Understøtter det VSME- og CSRD-rapportering?",
        a: "Ja. qlim8 har skabeloner til VSME Basic, VSME Comprehensive og CSRD, og sign-off-flowet med kryptografisk underskrift er bygget til at leve op til de audit-krav de standarder stiller.",
      },
    ],
  },
  closingCta: {
    title: "Lad din revisor validere regnskabet — uden en eneste bilags-mail",
    description:
      "Giv din revisor eller rådgiver read-only audit-adgang med fuld lineage og kryptografisk sign-off. Ét login dækker ubegrænset klienter, uden seat-fee.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_LEVERANDOERKAEDE — Scope 3 værdikæde
// ---------------------------------------------------------------------------

export const PR_LEVERANDOERKAEDE: MarketingPageCopy = {
  hero: {
    eyebrow: "Leverandørkæde",
    title: "Saml Scope 3 fra leverandørerne — send ét link, ikke 50 mails",
    subtitle:
      "Kortlæg dine leverandører via CVR-opslag, inviter dem til at dele deres Scope 3-data direkte, og se dækningsgrad og eksponering i ét regnskab. Slut med at jagte leverandører i mailtråde.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Scope 3 er 70-90 % af aftrykket — og det ligger hos andre",
    body:
      "Scope 3 dækker alle udledninger uden for din egen drift, og det er typisk 70-90 % af det samlede CO₂e-aftryk. Problemet er at data ligger spredt hos hundredvis af leverandører, transportører og affaldshåndtere. CSRD og VSME kræver at du dokumenterer det — og Excel med 47 vedhæftninger skalerer ikke. qlim8 Værdikæde gør indsamlingen til en self-service-portal. Du kortlægger leverandøren via CVR-opslag, sender én invitation, og leverandøren logger ind og deler kun det relevante — ikke hele deres regnskab. Du ser tallene live i dit eget regnskab, med kilde, dato og leverandørens egen signatur. Reminder-mails sendes automatisk, så indsamlingen kører i baggrunden hen over kvartalet.",
    bullets: [
      "Kortlæg leverandører via CVR-opslag — ingen manuel stamdata",
      "Ét delt regnskab i stedet for 47 Excel-vedhæftninger",
      "Audit-trail: hver delt værdi har kilde + dato (gemmes i 7 år)",
      "Dækningsgrad og eksponering pr. leverandør, live i regnskabet",
    ],
  },
  painPoints: [
    {
      pain:
        "Scope 3-indsamling er en kæde af mails og regneark: leverandører glemmer, leverer i 12 forskellige formater, eller svarer for sent.",
      solution:
        "Værdikæde-modulet gør indsamlingen til en portal. Du sender én invitation, leverandøren indtaster eller uploader selv, og reminder-mails sendes automatisk.",
      outcome:
        "Enterprise-brugere sparer typisk 3-4 ugers manuelt arbejde i Q1 ved at samle Scope 3 ét sted [antagelse: pilot-interview Q4 2025].",
    },
    {
      pain:
        "Hver ny leverandør-relation koster tid at sætte op, og onboarding via mail-frem-og-tilbage trækker ud.",
      solution:
        "Et indbygget invite-flow via CVR-opslag betyder ingen IT-projekt og ingen manuel stamdata. Leverandøren er koblet på med et par klik.",
      outcome:
        "Tid pr. leverandør-onboarding falder fra ~2 timer til ~10 minutter [antagelse: pilot-interview].",
    },
    {
      pain:
        "Revisoren spørger om sporbarheden, og et CO₂-tal modtaget i en mail holder ikke ved revision.",
      solution:
        "Hver delt værdi har kilde og dato i en audit-log der gemmes i 7 år, som CSRD kræver. Din revisor kan læse leverandør-sporet direkte via audit-pack-scope.",
      outcome:
        "Dokumenteret Scope 3-datakæde — markant lavere CSRD-revisor-risiko end mail-baseret indsamling.",
    },
    {
      pain:
        "En konsulent-Scope 3-kortlægning koster 250.000-500.000 kr. og skal gentages hvert år [antagelse: markeds-research].",
      solution:
        "Værdikæde-modulet er inkluderet i Enterprise-tier og skalerer til 100+ leverandører uden ekstra pris pr. relation.",
      outcome:
        "Erstat en engangs-konsulent-kortlægning på 250.000-500.000 kr. [antagelse] med en løbende, inkluderet portal.",
    },
    {
      pain:
        "I ved ikke hvor stor en del af jeres Scope 3 der faktisk er dækket af data — versus estimeret eller manglende.",
      solution:
        "Portalen viser dækningsgrad og eksponering pr. leverandør, så I ser præcis hvor meget der er dokumenteret og hvor hullerne er.",
      outcome:
        "Overblik over dækningsgrad frem for et gæt — I ved hvilke leverandører der mangler at levere.",
    },
  ],
  features: [
    {
      title: "Kortlæg via CVR-opslag",
      body:
        "Opret en leverandør ved at slå CVR-nummeret op i stedet for at taste stamdata manuelt. Kortlægningen af værdikæden bliver et par klik pr. leverandør, ikke et regneark.",
    },
    {
      title: "Self-service leverandør-portal",
      body:
        "Leverandøren får et login og deler kun det relevante — ikke hele deres regnskab. Data lander i samme format hver gang, så du slipper for at oversætte 12 forskellige Excel-skabeloner.",
    },
    {
      title: "Automatiske reminders",
      body:
        "Invitations- og reminder-mails sendes automatisk via en qlim8-branded afsender, uden spam-risiko. Indsamlingen kører i baggrunden hen over kvartalet, uden at du skriver opfølgnings-mails.",
    },
    {
      title: "Dækningsgrad og eksponering",
      body:
        "Se hvor stor en del af din Scope 3 der er dækket af faktiske leverandør-data, og hvor din største eksponering ligger. Du prioriterer de leverandører der betyder mest for tallet.",
    },
    {
      title: "Audit-trail i 7 år",
      body:
        "Hver delt værdi har kilde, dato og leverandørens signatur, og loggen gemmes i 7 år som CSRD kræver. Din revisor kan læse sporet direkte uden en separat data-anmodning.",
    },
    {
      title: "Skaler uden pr.-leverandør-fee",
      body:
        "Enterprise-tier inkluderer ubegrænsede supplier-connections. Du kan skalere til 100+ leverandører uden ekstra omkostning pr. relation, hvor konkurrenter typisk tager en pr.-supplier-fee.",
    },
  ],
  howItWorks: {
    title: "Fra mailtråd til delt regnskab",
    steps: [
      {
        title: "1. Kortlæg leverandøren",
        body:
          "Slå leverandøren op på CVR og opret dem i værdikæden. Ingen manuel stamdata — kortlægningen er et par klik.",
      },
      {
        title: "2. Send ét link",
        body:
          "Send én invitation. Leverandøren får et login til en portal, hvor de kan indtaste eller uploade deres eget Scope 3-tal.",
      },
      {
        title: "3. Data lander live",
        body:
          "Leverandørens tal flyder direkte ind i dit regnskab med kilde, dato og signatur. Reminder-mails sendes automatisk til dem der mangler.",
      },
      {
        title: "4. Følg dækning og eksponering",
        body:
          "Se dækningsgrad og eksponering pr. leverandør, og lad revisoren læse audit-sporet direkte. Hele kæden er sporbar til revision.",
      },
    ],
  },
  valueStats: [
    {
      value: "70-90 %",
      label: "af aftrykket er typisk Scope 3",
    },
    {
      value: "3-4 uger",
      label: "sparet manuelt arbejde i Q1",
      note: "[antagelse: pilot-interview Q4 2025]",
    },
    {
      value: "~10 min.",
      label: "leverandør-onboarding",
      note: "fra ~2 timer [antagelse]",
    },
    {
      value: "7 år",
      label: "audit-log gemt (CSRD-krav)",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om leverandørkæde og Scope 3",
    items: [
      {
        q: "Hvordan kortlægger jeg mine leverandører?",
        a: "Du slår leverandøren op på CVR-nummer og opretter dem i værdikæden. Stamdata hentes fra registeret, så du undgår manuel indtastning. Bemærk at CVR-baseret opslag forudsætter danske (og udvalgte nordiske) virksomhedsregistre.",
      },
      {
        q: "Skal leverandøren dele hele deres regnskab?",
        a: "Nej. Leverandøren deler kun det relevante Scope 3-tal via portalen, ikke deres samlede regnskab. De indtaster eller uploader selv, og du ser værdien i dit regnskab med kilde, dato og deres signatur.",
      },
      {
        q: "Hvad er dækningsgrad?",
        a: "Dækningsgrad viser hvor stor en del af din Scope 3 der er dokumenteret med faktiske leverandør-data versus estimeret eller manglende. Sammen med eksponering pr. leverandør fortæller det dig hvor du skal prioritere indsamlingen.",
      },
      {
        q: "Holder leverandør-data til revision?",
        a: "Ja. Hver delt værdi har en audit-trail med kilde og dato, og loggen gemmes i 7 år som CSRD kræver. Din revisor kan læse leverandør-sporet direkte via audit-pack-scope uden en separat data-anmodning.",
      },
      {
        q: "Kan jeg skalere til mange leverandører?",
        a: "Ja. Enterprise-tier inkluderer ubegrænsede supplier-connections, så du kan invitere 100+ leverandører uden ekstra omkostning pr. relation. Invite- og reminder-mails sendes automatisk, så indsamlingen kører i baggrunden.",
      },
      {
        q: "Hvilket abonnement kræver værdikæde-modulet?",
        a: "At sende leverandør-invitationer og modtage struktureret data er en Enterprise-feature. Starter og Premium kan modtage invitationer som leverandør — altså dele deres egne tal med en større kunde — men ikke selv sende dem.",
      },
    ],
  },
  closingCta: {
    title: "Saml din Scope 3 ét sted — og send aldrig en opfølgnings-mail igen",
    description:
      "Kortlæg leverandører via CVR, send ét link, og se deres Scope 3-data flyde ind i dit regnskab med audit-trail. Ubegrænsede supplier-connections i Enterprise.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_BRAGBOARD — Offentlig ESG-profil
// ---------------------------------------------------------------------------

export const PR_BRAGBOARD: MarketingPageCopy = {
  hero: {
    eyebrow: "Brag Board",
    title: "Vis dine klima-tal til markedet — og lad kunderne tjekke",
    subtitle:
      "En delbar, offentlig ESG-profil med dit klimaregnskab: opt-in, audit-bakket og leverandør-klar. Gør ESG til et salgsargument i udbud og kundedialog i stedet for en PDF du sender manuelt.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Fra \"vi er ved at lave en strategi\" til verificerbare tal",
    body:
      "Når en kunde, bank eller udbudsgiver spørger om dit CO₂e-aftryk, har du tre valg: sende en PDF (manuelt arbejde hver gang), sige \"vi er ved at lave noget\" (og miste troværdighed), eller dele en profil med dine faktiske tal og lade dem tjekke. qlim8s offentlige ESG-profil er det tredje. Du aktiverer en delbar URL — fx qlim8.com/p/dinvirksomhed — der viser dit klimaregnskab i det format du vælger. Du bestemmer hvilke felter der er offentlige, og profilen opdateres automatisk når regnskabet ændres, så du undgår versions-mareridt. Det vigtige er at hver påstand er audit-bakket: profilen viser ikke \"vi er klimavenlige\", men \"Scope 1: 12 tons, Scope 2: 5 tons, Scope 3: 145 tons (kilde: VSME-rapport 2025)\".",
    bullets: [
      "Delbar URL — ingen PDF at vedhæfte i 47 mails",
      "Opt-in og granulær: du vælger præcis hvad der vises",
      "Audit-bakket: hver påstand har kilde-citation",
      "Badge til hjemmeside og e-mail-signatur",
    ],
  },
  painPoints: [
    {
      pain:
        "Hvert tilbud kræver en custom PDF med CO₂-tal, og du copy-paster fra regnskabet, sender i en mail og venter på opfølgning.",
      solution:
        "En delbar URL erstatter PDF'en. Du sender ét link der altid viser de aktuelle tal, og profilen opdateres automatisk når regnskabet ændres.",
      outcome:
        "Spar 15-30 minutter pr. kunde-forespørgsel — ved 50 forespørgsler/år er det ~12-25 timer [antagelse: pilot-tal].",
    },
    {
      pain:
        "\"Har de tal vi kan stole på?\" er en blocker der trækker grønne tilbud i langdrag, mens I dokumenterer i hånden.",
      solution:
        "Profilen er audit-bakket med kilde-citation pr. påstand, så indkøberen kan verificere tallene selv og blocker'en fjernes tidligt.",
      outcome:
        "Sales-cyklus på grønne tilbud reduceret med 1-3 uger [antagelse: pilot-feedback].",
    },
    {
      pain:
        "I er nervøse for greenwashing-anklager, fordi generelle grønne udsagn ikke kan bakkes op.",
      solution:
        "Profilen viser konkrete tal med kilde og underskrift, ikke løse påstande. Alt er bakket af et audit-trail, og du vælger opt-in hvad der vises.",
      outcome:
        "Verificerbar dokumentation frem for markedsføring — lavere eksponering mod greenwashing-kritik.",
    },
    {
      pain:
        "En intern note kunne ved et uheld blive offentlig, og en statisk hjemmeside-sektion drifter væk fra det faktiske regnskab.",
      solution:
        "Profilen er opt-in og granulær — du styrer felt for felt hvad der vises — og den trækker live fra regnskabet, så den aldrig bliver forældet.",
      outcome:
        "Ingen \"en intern note blev offentlig\"-uheld og ingen manuel opdatering af tal på hjemmesiden.",
    },
    {
      pain:
        "I vil bruge ESG som differentiering, men uden at havne i en ren pris-konkurrence.",
      solution:
        "En audit-bakket profil er et salgsargument i udbud og kundedialog, og schema.org-markup gør at Google fremhæver tallene i søge-snippets.",
      outcome:
        "For en virksomhed med 5 mio. i omsætning er tilbud hvor klima var blocker typisk 5-15 % af pipeline — 250.000-750.000 kr. i potentiel impact [antagelse: sales-feedback].",
    },
  ],
  features: [
    {
      title: "Delbar ESG-URL",
      body:
        "Aktivér en offentlig profil på fx qlim8.com/p/dinvirksomhed der viser dit klimaregnskab. Du deler ét link i tilbud, signatur eller LinkedIn-bio i stedet for at vedhæfte en PDF hver gang.",
    },
    {
      title: "Opt-in og granulær kontrol",
      body:
        "Profilen er aldrig auto-offentlig — du aktiverer den bevidst og vælger felt for felt hvad der vises: kun aggregerede tal, pr. scope, eller pr. kategori. Du bestemmer præcis hvad markedet ser.",
    },
    {
      title: "Audit-bakket data",
      body:
        "Hver påstand har kilde-citation og er bakket af et audit-trail. Profilen viser konkrete tal med kilde og underskrift, så forskellen mellem markedsføring og verificerbar dokumentation er tydelig.",
    },
    {
      title: "Opdateres automatisk",
      body:
        "Profilen trækker live fra dit regnskab og opdateres når tallene ændrer sig. Ingen versions-mareridt og ingen statisk sektion der drifter væk fra virkeligheden.",
    },
    {
      title: "Badge og SEO-markup",
      body:
        "Sæt et ESG-badge på hjemmeside og e-mail-signatur, og lad schema.org/Organization-markup gøre at Google forstår dataen. Konkrete tal kan fremhæves i søge-snippets, så profilen også virker som lead-magnet.",
    },
    {
      title: "White-label på eget domæne",
      body:
        "På Enterprise-tier kan profilen ligge på jeres eget domæne, fx esg.dinvirksomhed.dk, så den er en del af jeres brand og ikke qlim8's. Kunden ser jeres identitet, ikke en tredjeparts.",
    },
  ],
  howItWorks: {
    title: "Sådan får du en delbar ESG-profil",
    steps: [
      {
        title: "1. Aktivér profilen",
        body:
          "Slå den offentlige profil til fra dit klimaregnskab. Den er opt-in og aldrig offentlig før du selv aktiverer den.",
      },
      {
        title: "2. Vælg hvad der vises",
        body:
          "Bestem felt for felt hvad der er offentligt — aggregerede tal, pr. scope, eller pr. kategori — så du kun deler det du vil.",
      },
      {
        title: "3. Del URL og badge",
        body:
          "Del linket i tilbud, signatur og LinkedIn, og sæt badget på hjemmesiden. Schema.org-markup gør tallene synlige for Google.",
      },
      {
        title: "4. Lad den opdatere sig selv",
        body:
          "Profilen trækker live fra regnskabet og opdateres automatisk. Du vedligeholder ingenting manuelt.",
      },
    ],
  },
  valueStats: [
    {
      value: "15-30 min.",
      label: "sparet pr. kunde-forespørgsel",
      note: "[antagelse: pilot-tal]",
    },
    {
      value: "1-3 uger",
      label: "kortere sales-cyklus på grønne tilbud",
      note: "[antagelse: pilot-feedback]",
    },
    {
      value: "Opt-in",
      label: "aldrig auto-offentlig — du vælger felterne",
    },
    {
      value: "Auto",
      label: "profil opdateres med regnskabet",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om offentlig ESG-profil",
    items: [
      {
        q: "Bliver mit regnskab automatisk offentligt?",
        a: "Nej. Profilen er opt-in og bliver aldrig offentlig af sig selv. Du aktiverer den bevidst og vælger felt for felt hvad der vises — kun aggregerede tal, pr. scope, eller pr. kategori. Resten forbliver privat.",
      },
      {
        q: "Hvordan undgår jeg at det ligner greenwashing?",
        a: "Profilen viser konkrete tal med kilde-citation, ikke løse udsagn som \"vi er klimavenlige\". Hver påstand er bakket af et audit-trail, fx \"Scope 1: 12 tons (kilde: VSME-rapport 2025)\". Det er verificerbar dokumentation, ikke markedsføring.",
      },
      {
        q: "Skal jeg opdatere profilen manuelt?",
        a: "Nej. Profilen trækker live fra dit klimaregnskab og opdateres automatisk når tallene ændrer sig. Du undgår både versions-mareridt og en statisk hjemmeside-sektion der drifter væk fra det faktiske regnskab.",
      },
      {
        q: "Kan jeg bruge profilen i udbud og salg?",
        a: "Ja — det er netop pointen. Du deler URL'en i tilbud, e-mail-signatur og LinkedIn, og et badge på hjemmesiden. Når blocker'en \"har de tal vi kan stole på?\" fjernes tidligt, går grønne tilbud typisk 1-3 uger hurtigere igennem [antagelse: pilot-feedback].",
      },
      {
        q: "Hjælper profilen på Google?",
        a: "Ja. Profilen har schema.org/Organization-markup, så søgemaskiner forstår dataen og kan fremhæve konkrete tal i søge-snippets. Det gør den også til en lead-magnet, ikke kun et dokument du sender på forespørgsel.",
      },
      {
        q: "Kan profilen ligge på vores eget domæne?",
        a: "På Enterprise-tier kan du white-labele profilen på eget domæne, fx esg.dinvirksomhed.dk, så den er en del af jeres brand. Premium (625 kr/md) giver den delbare qlim8-URL og badge i standard-format.",
      },
    ],
  },
  closingCta: {
    title: "Gør dit klimaregnskab til et salgsargument",
    description:
      "Aktivér en delbar, audit-bakket ESG-profil du kan sende i udbud og kundedialog. Opt-in og granulær, opdateres automatisk. Inkluderet i Premium.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};
