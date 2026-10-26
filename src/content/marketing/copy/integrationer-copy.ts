import type { MarketingPageCopy, MarketingHubCopy } from "@/content/marketing/types";
import { DEMO_CTA, PHONE_CTA } from "@/content/cta";

// Marketing copy for the "Integrationer" collection.
// Ground truth: docs/da/integrations/{dinero,e-conomic,billy,eloverblik,mcp-overview}.md
// + docs/da/marketing/features/integrations.md. Voice per _shared/brand-voice.md.
// Numbers without a cited source carry an [antagelse] tag.
//
// qlim8 is sold after a demo (src/content/cta.ts): every primary CTA books one,
// closing CTAs offer the phone as the alternative, and no package price appears.

const HERO_SECONDARY_CTA = {
  label: "Se pakker",
  href: "/priser",
} as const;

// ---------------------------------------------------------------------------
// Hub
// ---------------------------------------------------------------------------

export const INTEGRATIONER_HUB_COPY: MarketingHubCopy = {
  hero: {
    eyebrow: "Integrationer",
    title: "Vi henter data direkte fra dine systemer.",
    subtitle:
      "Du har allerede dataene i dit regnskab og din elmåler. qlim8 forbinder til dem og laver et klimaregnskab ud af tallene, uden CSV-eksport og uden dobbelt indtastning.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Et klimaregnskab bygget oven på det regnskab, du allerede fører",
    body:
      "En klimaplatform er kun noget værd, hvis den taler med det, du allerede bruger. Ellers er det bare et ekstra sted at taste de samme tal ind en gang til. qlim8 forbinder direkte til dansk regnskabssoftware: Dinero, e-conomic og Billy. Så bliver en stor del af dine posteringer til CO₂e-emissioner automatisk, og linjer, som systemet er i tvivl om, lægges til gennemsyn hos dig. Vi henter faktisk elforbrug fra Eloverblik og Energinet, så dine Scope 2-tal er målte i stedet for gættede. Og for udviklere og AI-assistenter er der REST API og en live MCP-server. Flere integrationer er på vej, blandt andet til HR og løn og cloud-lagring (se oversigten nedenfor). Vi hjælper gerne med den første tilslutning. Du skifter ikke system: du kobler klimaregnskabet på det, du har.",
    bullets: [
      "Dansk regnskabsdata native: vi forstår danske konteringsmønstre, ikke et generisk CSV-flow.",
      "Automatisk kategorisering af posteringer til emissions-kategorier, så du slipper for manuel mapping.",
      "Ingen manuel indtastning: målt elforbrug og bogførte fakturaer trækkes ind af sig selv.",
      "OAuth og krypterede tokens hvor det giver mening, ingen kopierede passwords i en e-mail.",
    ],
  },
  cardsHeading: "Vælg din integration",
  cardsSubheading:
    "Regnskab, energi og programmatisk adgang: tilslut det, du har, og lad tallene lande i klimaregnskabet.",
  options: {
    title: "Nye integrationer på vej",
    intro:
      "Vi bygger flere forbindelser, så tallene kommer fra de systemer, du allerede bruger. Beta betyder, at integrationen er ny og lanceres som beta i appen. Kommer snart betyder, at den er planlagt og endnu ikke kan forbindes.",
    items: [
      {
        title: "Eksport til cloud-lagring",
        body: "Rapporter gemmes automatisk i en mappe hos Dropbox eller Box, så de ligger klar, hvor dit team allerede arbejder.",
        bullets: ["Dropbox: Beta", "Box: Beta"],
      },
      {
        title: "HR og løn",
        body: "Medarbejdertal, køn og afdelinger bruges til den sociale del af VSME og ESRS og til nøgletal pr. medarbejder. qlim8 gemmer kun samlede tal, aldrig data om enkeltpersoner.",
        bullets: [
          "BambooHR: Beta",
          "Deel: Beta",
          "PeopleForce: Beta",
          "Gusto: Beta",
          "Zoho People: Beta",
          "Mindkey: Kommer snart",
          "Workday: Kommer snart",
          "SAP SuccessFactors: Kommer snart",
        ],
      },
      {
        title: "ERP",
        body: "Finansposter og indkøb fra dit ERP-system, så de indgår i klimaregnskabet.",
        bullets: ["SAP S/4HANA: Kommer snart"],
      },
      {
        title: "KMD Connect",
        body: "Disse KMD-systemer kommer via KMD Connect: økonomi og løn (Opus, Payroll Cloud), organisationsstruktur og P-numre (Delta), ejendomme, arealer og forbrug (Atrium), energi og forsyning (EnergyKey, Elements, EasyEnergy) og CO2-regnskab (CarbonKey).",
        bullets: [
          "KMD Opus: Kommer snart",
          "KMD Delta: Kommer snart",
          "KMD Atrium: Kommer snart",
          "KMD EnergyKey: Kommer snart",
          "KMD Elements: Kommer snart",
          "KMD EasyEnergy: Kommer snart",
          "KMD CarbonKey: Kommer snart",
          "KMD Payroll Cloud: Kommer snart",
        ],
      },
    ],
  },
  differentiators: [
    {
      title: "Dansk regnskabsdata native",
      body:
        "Dinero, e-conomic og Billy er bygget ind direkte, ikke via en dyr tredjeparts-konnektor. Vi kender de danske standardkonti (fx 2100 Gas, 2200 El), så mapping er forudfyldt og du starter tættere på et færdigt regnskab i stedet for et mapping-projekt.",
    },
    {
      title: "Automatisk kategorisering",
      body:
        "Posteringerne får en emissions-kategori automatisk, når systemet er sikkert nok, og resten lægges til gennemsyn hos dig. Du retter kun det, der er tenant-specifikt, typisk en håndfuld konti frem for hundredvis af linjer i hånden.",
    },
    {
      title: "Ingen manuel indtastning",
      body:
        "Målt elforbrug fra Eloverblik og bookede fakturaer fra dit regnskab trækkes ind af sig selv. Det fjerner den månedlige CSV-eksport og indtastning.",
    },
    {
      title: "Åben via API og MCP",
      body:
        "Ud over de færdige integrationer kan du bygge oven på qlim8 med et versioneret REST API og en live MCP-server med 31 tools, så BI-værktøjer, egne agenter og AI-assistenter som Claude kan hente emissioner og rapporter programmatisk.",
    },
  ],
  closingCta: {
    title: "Tilslut dit første system med personlig hjælp",
    description:
      "Opret en gratis konto og forbind regnskabet eller elmåleren, så ser du dine posteringer blive til et klimaregnskab. Ingen CSV-eksport, ingen konsulent. Vil du hellere se det først, så book en demo.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// e-conomic
// ---------------------------------------------------------------------------

export const IN_ECONOMIC: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration",
    title: "Forbind e-conomic: dine posteringer bliver til klimaregnskab",
    subtitle:
      "Tilslut e-conomic med to tokens, og qlim8 henter dine bookede fakturaer og din kontoplan. Posteringerne kategoriseres automatisk, når systemet er sikkert nok, og resten lægges til gennemsyn hos dig, så du ikke sidder og mapper konti i hånden.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Du bogfører i e-conomic, som du plejer",
    body: "Når e-conomic er forbundet, henter qlim8 tallene fra din bogføring og gør dem til et klimaregnskab. Du skifter ikke program og taster ikke dine fakturaer ind igen. Forbindelsen kræver to nøgler fra din e-conomic-aftale, og vi viser dig gerne, hvor du finder dem. Linjer, som systemet er i tvivl om, lægges til gennemsyn hos dig, før de tæller med.",
  },
  intro: {
    heading: "Regnskabet, du allerede fører, er grundlaget for dit klimaregnskab",
    body:
      "e-conomic er et af Danmarks mest udbredte regnskabssystemer, og dine bogførte udgifter fortæller allerede det meste af historien om dit CO₂e-aftryk. De ligger bare som kroner, ikke som emissioner. qlim8 forbinder via dobbelt-token-auth (appSecretToken plus agreementGrantToken), henter dine bookede fakturaer og din kontoplan, og oversætter tallene til spend-baserede emissioner. De mest brugte standardkonti er forudfyldt med en emissions-kategori: fx gas, el og flyrejser, så du kun mapper det, der er specifikt for din virksomhed. For revisorer betyder det, at endnu et dansk regnskabssystem er dækket, uanset hvad klienten kører.",
    bullets: [
      "Dobbelt-token-auth: ingen password sendt i en e-mail.",
      "Forudfyldt konto-mapping for de mest brugte standardkonti.",
      "Bookede fakturaer trækkes ind; kladder ignoreres, så tallene er stabile.",
    ],
  },
  painPoints: [
    {
      pain:
        "Du eksporterer bogføringen til CSV hver måned og uploader den til en ESG-platform, der ikke forstår dine konti.",
      solution:
        "qlim8 forbinder direkte til e-conomic og henter bookede fakturaer automatisk, ingen eksport, ingen upload.",
      outcome:
        "Ingen manuel eksport og indtastning hver måned.",
    },
    {
      pain:
        "At oversætte hundredvis af konteringslinjer til emissions-kategorier i hånden er både langsomt og fejlbehæftet.",
      solution:
        "Vi leverer et default-mapping for de mest brugte danske standardkonti; du overstyrer kun de tenant-specifikke konti.",
      outcome:
        "Fra manuel mapping af alle konti til en håndfuld rettelser.",
    },
    {
      pain:
        "Under revision skal du kunne vise, hvor hvert tal kommer fra, men et regneark har ingen kildehenvisning.",
      solution:
        "Hver aktivitet peger tilbage på sin e-conomic-datakilde, og forbindelses- og mapping-ændringer logges automatisk i audit-loggen.",
      outcome:
        "Audit-spor uden ekstra arbejde: ingen \"hvor kom det tal fra?\"-runder med revisor.",
    },
    {
      pain:
        "Din revisor vil gerne tilbyde klimaregnskab, men kan ikke pålægge alle kunder at skifte bogføringssystem.",
      solution:
        "e-conomic er dækket ved siden af Dinero og Billy, så rådgiveren kan bruge qlim8 uanset hvilket system klienten allerede kører.",
      outcome:
        "Flere klimaopgaver pr. fakturerbar revisor-time, uden systemskifte hos kunden.",
    },
  ],
  features: [
    {
      title: "Bookede fakturaer, ikke kladder",
      body:
        "Vi henter kun bookede fakturaer fra e-conomic, så dit klimaregnskab hviler på faktisk bogførte tal. Kladder og ikke-godkendte poster påvirker ikke totalerne.",
    },
    {
      title: "Forudfyldt kontoplan-mapping",
      body:
        "De mest brugte standardkonti er koblet til en emissions-kategori fra start. Du ser hvilke konti der er mappet, og retter kun dem, der er unikke for din virksomhed.",
    },
    {
      title: "Dobbelt-token-sikkerhed",
      body:
        "Adgang gives via appSecretToken plus et agreementGrantToken, du selv udsteder i e-conomic. Tokens gemmes krypteret pr. virksomhed, ingen delte passwords.",
    },
    {
      title: "Manuelle overrides der huskes",
      body:
        "Retter du en konto-kategori, huskes det til næste sync. Ved ændringer i kontoplanen advarer vi, så en ny konto ikke ryger ukategoriseret ind.",
    },
    {
      title: "Audit-spor på hver kilde",
      body:
        "Forbindelse og mapping-ændringer logges automatisk. Under revision kan du spore hvert emissionstal tilbage til den bogførte faktura, det stammer fra.",
    },
  ],
  howItWorks: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "1. Tilslut e-conomic",
        body:
          "Indsæt de to tokens fra din e-conomic-aftale og appen (App Secret Token og Agreement Grant Token) i qlim8. Vi validerer forbindelsen og henter dit firmanavn med det samme.",
      },
      {
        title: "2. Hent data",
        body:
          "Vi trækker dine bookede fakturaer og din kontoplan ind og kategoriserer posteringerne automatisk via default-mappingen.",
      },
      {
        title: "3. Justér mapping",
        body:
          "Gennemgå de forudfyldte konto-kategorier og ret de få, der er specifikke for din virksomhed. Dine rettelser huskes til næste sync.",
      },
      {
        title: "4. Færdig rapport",
        body:
          "Tallene lander i dit klimaregnskab, klar til VSME-rapporten, uden et eneste regneark.",
      },
    ],
  },
  valueStats: [
    { value: "Personlig", label: "hjælp til opsætningen" },
    { value: "2 tokens", label: "fra din e-conomic-aftale" },
    { value: "Bilag", label: "bag hvert tal" },
    { value: "0", label: "kopierede passwords" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om e-conomic-integrationen",
    items: [
      {
        q: "Hvordan forbinder qlim8 til e-conomic?",
        a: "Via e-conomics officielle REST API med dobbelt-token-auth: et appSecretToken udstedt til qlim8 som partner og et agreementGrantToken, du selv udsteder for din aftale. Begge gemmes krypteret. Der sendes ingen passwords.",
      },
      {
        q: "Henter I salgsfakturaer eller kun udgifter?",
        a: "Vi henter bookede fakturaer som grundlag for spend-baserede emissioner. Omsætningstal kan bruges til VSME-nøgletal, men det er dine udgifter, der driver størstedelen af klimaregnskabet.",
      },
      {
        q: "Skal jeg mappe alle mine konti selv?",
        a: "Nej. De mest brugte danske standardkonti er forudfyldt med en emissions-kategori. Du overstyrer kun de konti, der er specifikke for din virksomhed, og dine rettelser huskes til næste sync.",
      },
      {
        q: "Hvad sker der, hvis jeg ændrer min kontoplan?",
        a: "qlim8 opdager nye konti og advarer i mapping-oversigten, så en ny konto ikke ryger ukategoriseret ind. Du tilføjer kategorien én gang, og den bruges fremover.",
      },
      {
        q: "Virker det for revisorer med flere kunder?",
        a: "Ja. Hver kundeaftale håndteres som en separat datakilde med sit eget agreementGrantToken. Der er endnu ikke et aggregeret tværkunde-view, men hver klient holdes adskilt og revisionssikkert.",
      },
      {
        q: "Hvad koster det?",
        a: "Du kan forbinde e-conomic på en gratis konto. Med Gratis-pakken forbinder du Eloverblik og ét regnskabsprogram (e-conomic, Dinero eller Billy) og ser dit eget klimaregnskab. Gratis-pakken har ingen udløbsdato. Hvad de betalte pakker indeholder, står på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Lad e-conomic føre klimaregnskabet med",
    description:
      "Opret en gratis konto og tilslut e-conomic, så ser du dine bookede fakturaer blive til CO₂e-emissioner automatisk. Vil du hellere se det først, så book en demo.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// Dinero
// ---------------------------------------------------------------------------

export const IN_DINERO: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration",
    title: "Forbind Dinero med ét login: klimaregnskabet henter sig selv",
    subtitle:
      "Tilslut Dinero via Visma Connect (OAuth), og qlim8 læser 12 måneders historik ved første forbindelse. Derefter holder en daglig sync dit klimaregnskab opdateret, og du tager kun stilling til de linjer, systemet er i tvivl om.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Et login med Visma Connect, så er du i gang",
    body: "Du forbinder Dinero ved at logge ind med Visma Connect og vælge din virksomhed. Det klares med et par klik, og der er ingen nøgler at kopiere. Derefter bliver din bogføring til et klimaregnskab, mens du bogfører i Dinero, som du plejer. Er du i tvivl undervejs, så ring til os på +45 93 90 13 84, så tager vi det sammen.",
  },
  intro: {
    heading: "Bygget til den mindre virksomhed, der bruger Dinero",
    body:
      "Dinero er det danske regnskabssystem for mange små virksomheder, og det betyder, at du allerede har grundlaget for et klimaregnskab liggende. qlim8 forbinder via Visma Connect OAuth, så du logger ind ét sted i stedet for at kopiere API-nøgler rundt. Ved første forbindelse trækker vi 12 måneders indkøbsfakturaer og bogføringsposteringer ind og udleder CO₂e-emissioner. Derefter kører en daglig sync, så nye fakturaer lander af sig selv. Fordi det er OAuth, kan du altid trække adgangen tilbage hos Dinero, og hver synkronisering skrives i audit-loggen. Ingen CSV-eksport, ingen kopierede passwords, intet IT-projekt.",
    bullets: [
      "OAuth via Visma Connect: ét login, ingen nøgler at kopiere.",
      "12 måneders historik hentes ved første forbindelse.",
      "Daglig automatisk sync herefter: nye fakturaer kommer ind af sig selv.",
    ],
  },
  painPoints: [
    {
      pain:
        "Hver måned eksporterer du fra Dinero til CSV, uploader og mapper kategorier manuelt til en ESG-platform.",
      solution:
        "qlim8 forbinder direkte til Dinero via OAuth og trækker indkøbsfakturaer og posteringer ind automatisk, med daglig sync.",
      outcome:
        "Ingen manuel eksport og mapping hver måned.",
    },
    {
      pain:
        "Manuel indtastning af tal skaber taste-fejl, der forplanter sig hele vejen ind i ESG-rapporten.",
      solution:
        "Tallene læses direkte fra Dinero uden mellemled, så der ikke opstår indtastningsfejl undervejs.",
      outcome:
        "Færre fejl at rette senere: reduceret risiko for at en tastefejl ender som en forkert emissionslinje.",
    },
    {
      pain:
        "Din IT vil ikke godkende nye API-credentials sendt i et usikkert format.",
      solution:
        "Dinero bruger Visma Connect OAuth 2.0 (ISV-godkendt), så adgangen gives med et login og kan tilbagekaldes hos kilden.",
      outcome:
        "Ingen kopierede passwords og ingen IT-godkendelsesrunde for at komme i gang.",
    },
    {
      pain:
        "Du er lige startet og har hverken tid eller en ESG-specialist til at bygge et klimaregnskab op fra bunden.",
      solution:
        "Ved første forbindelse trækker vi 12 måneders historik ind, så du har et regnskab at kigge på fra dag ét.",
      outcome:
        "Fra tom skabelon til 12 måneders data på minutter i stedet for uger.",
    },
  ],
  features: [
    {
      title: "OAuth via Visma Connect",
      body:
        "Du forbinder med et login, ikke en nøgle. Adgangen er ISV-godkendt hos Visma og kan trækkes tilbage direkte i Dinero, når du vil.",
    },
    {
      title: "12 måneders historik med det samme",
      body:
        "Første forbindelse henter det seneste års indkøbsfakturaer og posteringer, så du starter med et fyldt klimaregnskab i stedet for en tom skabelon.",
    },
    {
      title: "Daglig automatisk sync",
      body:
        "Efter opsætning holder en daglig sync qlim8 i takt med Dineros fakturamodtagelse. Nye udgifter bliver til emissioner uden at du gør noget.",
    },
    {
      title: "Indkøb til Scope 1, 2 og 3",
      body:
        "Vi henter indkøbsfakturaer og udleder CO₂e-aftryk fra dem. Brændstof, du selv køber til dine køretøjer, tæller i Scope 1, el i Scope 2 og de fleste andre indkøb i Scope 3.",
    },
    {
      title: "Audit-log på hver sync",
      body:
        "Forbindelse, synkronisering og afbrydelse logges automatisk. Du kan altid se, hvornår data sidst blev hentet, og spore et tal til dets faktura.",
    },
  ],
  howItWorks: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "1. Tilslut Dinero",
        body:
          "Klik \"Tilslut Dinero\", log ind med Visma Connect og vælg din organisation. Ingen nøgle at kopiere.",
      },
      {
        title: "2. Hent data",
        body:
          "qlim8 trækker 12 måneders indkøbsfakturaer og posteringer ind og udleder CO₂e-emissioner. Derefter synker vi dagligt.",
      },
      {
        title: "3. Gennemgå kategorier",
        body:
          "Se posteringerne kategoriseret og justér efter behov. Alt spores tilbage til den oprindelige faktura i Dinero.",
      },
      {
        title: "4. Færdig rapport",
        body:
          "Dine tal ligger klar i klimaregnskabet til VSME-rapporten, opdateret dagligt, uden manuelt arbejde.",
      },
    ],
  },
  valueStats: [
    { value: "Personlig", label: "hjælp til opsætningen" },
    { value: "12 mdr", label: "historik ved første sync" },
    { value: "Visma Connect", label: "ét login, ingen nøgle at kopiere" },
    { value: "Dagligt", label: "automatisk sync" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Dinero-integrationen",
    items: [
      {
        q: "Hvordan tilslutter jeg Dinero til qlim8?",
        a: "Du klikker \"Tilslut Dinero\", logger ind via Visma Connect (OAuth) og vælger din organisation. Der er ingen API-nøgle at kopiere: adgangen gives med login og kan trækkes tilbage i Dinero når som helst.",
      },
      {
        q: "Hvor langt tilbage henter I data?",
        a: "Ved første forbindelse trækker vi 12 måneders indkøbsfakturaer og bogføringsposteringer ind. Derefter holder en daglig sync klimaregnskabet opdateret med nye fakturaer.",
      },
      {
        q: "Dækker integrationen også Visma eAccounting?",
        a: "Ja. Visma eAccounting kører på samme API-overflade og er dækket af Dinero-integrationen, der er ikke en separat Visma-integration. Enkelte felter kan afvige, men flowet er det samme.",
      },
      {
        q: "Henter I mine salgsfakturaer?",
        a: "Nej, vi henter indkøbsfakturaer, fordi det er dine udgifter, der driver klimaregnskabet: brændstof i Scope 1, el i Scope 2 og de fleste andre indkøb i Scope 3. Salgsfakturaer trækkes ikke ind.",
      },
      {
        q: "Er det sikkert at give qlim8 adgang?",
        a: "Adgangen er OAuth 2.0 via Visma Connect og ISV-godkendt hos Visma. Der deles ingen passwords, du kan tilbagekalde adgangen hos kilden, og hver sync føres i audit-loggen.",
      },
      {
        q: "Hvad koster Dinero-integrationen?",
        a: "Dinero kan du forbinde på en gratis konto, hvor du også kan forbinde Eloverblik og se dit eget klimaregnskab. Gratis-pakken har ingen udløbsdato. Indholdet i de betalte pakker står på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Tilslut Dinero, og lad klimaregnskabet hente sig selv",
    description:
      "Opret en gratis konto og forbind Dinero via Visma Connect, så ser du din bogføring blive til et klimaregnskab. Derefter kører en daglig sync, og du tager kun stilling til de linjer, systemet er i tvivl om. Vil du hellere se det først, så book en demo.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// Billy by Shine
// ---------------------------------------------------------------------------

export const IN_BILLY: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration",
    title: "Forbind Billy: regnskabsdata bliver til klimaregnskab",
    subtitle:
      "Tilslut Billy med en adgangsnøgle, du selv opretter, og qlim8 henter dine leverandørfakturaer ind som grundlag for spend-baserede emissioner. Hvert bilagsnummer følger med, så tallene kan spores tilbage.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Én nøgle fra Billy, så er du forbundet",
    body: "Du opretter en API-nøgle i Billy og sætter den ind i qlim8. Vi viser dig gerne, hvor du finder den. Herefter henter qlim8 tallene fra din bogføring, og hvert tal i klimaregnskabet kan spores tilbage til bilaget. Du fortsætter i Billy, som du plejer, og behøver ikke skifte system for at få styr på klimaet.",
  },
  intro: {
    heading: "Bygget til freelancere og enkeltmandsfirmaer på Billy",
    body:
      "Billy by Shine er populært blandt freelancere og mindre virksomheder, og hvis du fører dit regnskab der, har du allerede grundlaget for et klimaregnskab. Billy bruger ikke OAuth; i stedet opretter du selv en adgangsnøgle i Billy under Indstillinger og Adgangsnøgler og indsætter den i qlim8. Vi validerer nøglen, henter dine godkendte leverandørfakturaer og gemmer bilagsnummeret på hver postering. Nøglen gemmes krypteret pr. virksomhed. Bilagsnummeret vises både i posteringsoversigten og i revisions-panelet, så et emissionstal altid kan spores tilbage til den oprindelige faktura i Billy. Ingen Excel-upload, ingen manuel indtastning af udgifter.",
    bullets: [
      "Egen adgangsnøgle fra Billy: krypteret pr. virksomhed, ingen passwords delt.",
      "Godkendte leverandørfakturaer hentes som grundlag for spend-baserede emissioner.",
      "Bilagsnummer på hver postering, så tallene kan spores tilbage til Billy.",
    ],
  },
  painPoints: [
    {
      pain:
        "Som freelancer eller lille virksomhed har du hverken tid eller en ESG-specialist til at bygge et klimaregnskab i Excel.",
      solution:
        "qlim8 henter dine leverandørfakturaer direkte fra Billy og laver spend-baserede emissioner ud af dem automatisk.",
      outcome:
        "Fra manuel Excel-opbygning til et klimaregnskab, der bygger direkte på din bogføring.",
    },
    {
      pain:
        "Under revision skal du kunne pege på, hvilken faktura et tal stammer fra, men et regneark mister sporet.",
      solution:
        "Vi gemmer bilagsnummeret (voucherNo / suppliersInvoiceNo) på hver postering og viser det i posteringsoversigt og revisions-panel.",
      outcome:
        "Hvert emissionstal kan spores tilbage til den oprindelige faktura i Billy, ingen \"hvor kom det fra?\"-runder.",
    },
    {
      pain:
        "Du vil ikke sende dit Billy-password til en tredjepart for at få dem til at hente data.",
      solution:
        "Du opretter selv en adgangsnøgle i Billy og kan tilbagekalde den når som helst. qlim8 gemmer den krypteret pr. virksomhed.",
      outcome:
        "Fuld kontrol over adgangen: ingen delte passwords, revoke sker hos dig.",
    },
    {
      pain:
        "Kladder og annullerede fakturaer roder tallene til, hvis alt trækkes med.",
      solution:
        "Vi henter kun godkendte (approved) leverandørfakturaer, så dit klimaregnskab hviler på faktisk bogførte udgifter.",
      outcome:
        "Rene tal uden støj fra kladder: stabile totaler du kan stå inde for.",
    },
  ],
  features: [
    {
      title: "Adgangsnøgle, du selv styrer",
      body:
        "Du opretter nøglen i Billy og indsætter den i qlim8, hvor den gemmes krypteret. Ingen OAuth kræves, og du kan trække adgangen tilbage direkte i Billy.",
    },
    {
      title: "Godkendte leverandørfakturaer",
      body:
        "Vi henter kun fakturaer i status godkendt som grundlag for spend-baserede emissioner. Kladder og annullerede poster springes over, så tallene er rene.",
    },
    {
      title: "Bilagsnummer der følger med",
      body:
        "Hver postering bærer sit bilagsnummer fra Billy og et stabilt bill-id, der forhindrer dubletter ved gentagne synkroniseringer.",
    },
    {
      title: "Omsætning til VSME",
      body:
        "Billy-omsætning kan trækkes ind til VSME-guidens nøgletal, så du ikke skal taste omsætningstal manuelt oveni.",
    },
    {
      title: "Spor i revisions-panelet",
      body:
        "Bilagsnummeret vises både i posteringsoversigten og revisions-panelet, så du under revision kan gå fra emissionslinje til original faktura.",
    },
  ],
  howItWorks: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "1. Tilslut Billy",
        body:
          "Opret en adgangsnøgle i Billy under Indstillinger og Adgangsnøgler, og indsæt den i qlim8. Vi validerer nøglen og henter dit organisationsnavn.",
      },
      {
        title: "2. Hent data",
        body:
          "Klik \"Synk nu\", og qlim8 henter dine godkendte leverandørfakturaer med bilagsnummer og udleder spend-baserede emissioner.",
      },
      {
        title: "3. Gennemgå posteringer",
        body:
          "Se posteringerne kategoriseret med deres bilagsnummer, så du kan spore hvert tal tilbage til fakturaen i Billy.",
      },
      {
        title: "4. Færdig rapport",
        body:
          "Tallene ligger klar i klimaregnskabet til VSME-rapportering, uden Excel-upload og uden manuel indtastning.",
      },
    ],
  },
  valueStats: [
    { value: "Personlig", label: "hjælp til opsætningen" },
    { value: "Approved", label: "kun godkendte fakturaer" },
    { value: "Bilagsnr.", label: "på hver postering" },
    { value: "0", label: "Excel-uploads" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Billy-integrationen",
    items: [
      {
        q: "Hvordan forbinder jeg Billy til qlim8?",
        a: "Billy understøtter ikke OAuth, så du opretter selv en adgangsnøgle i Billy under Indstillinger og Adgangsnøgler og indsætter den i qlim8. Vi validerer nøglen og henter dit organisationsnavn. Nøglen gemmes krypteret pr. virksomhed.",
      },
      {
        q: "Hvilke fakturaer henter I fra Billy?",
        a: "Vi henter dine godkendte (approved) leverandørfakturaer som grundlag for spend-baserede emissioner. Kladder og annullerede fakturaer springes over, så dit klimaregnskab hviler på faktisk bogførte udgifter.",
      },
      {
        q: "Kan jeg spore et emissionstal tilbage til den rigtige faktura?",
        a: "Ja. Vi gemmer bilagsnummeret (voucherNo / suppliersInvoiceNo) på hver postering og viser det i både posteringsoversigten og revisions-panelet, så du kan gå fra emissionslinje til original faktura i Billy.",
      },
      {
        q: "Synkroniserer Billy automatisk?",
        a: "Billy-sync køres i dag manuelt med \"Synk nu\" (eller når din kvote genoptager). Til forskel fra Dinero er der endnu ikke periodisk auto-sync, men du kan synke, når du har brug for friske tal.",
      },
      {
        q: "Kan jeg bruge Billy-tal til min VSME-rapport?",
        a: "Ja. Ud over udgifter kan din Billy-omsætning trækkes ind til VSME-guidens nøgletal, så du ikke skal taste omsætning manuelt oveni klimaregnskabet.",
      },
      {
        q: "Hvad koster Billy-integrationen?",
        a: "Billy er et af de tre regnskabsprogrammer, du kan forbinde på en gratis konto sammen med Eloverblik. Gratis-pakken har ingen udløbsdato. Se /priser for, hvad de betalte pakker giver.",
      },
    ],
  },
  closingCta: {
    title: "Lad Billy fylde dit klimaregnskab",
    description:
      "Opret en gratis konto og tilslut Billy med din egen adgangsnøgle, så ser du dine leverandørfakturaer blive til CO₂e-emissioner, sporbare helt tilbage til bilaget. Vil du hellere se det først, så book en demo.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// Appelsin (coming soon)
// ---------------------------------------------------------------------------

export const IN_APPELSIN: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration · Kommer snart",
    title: "Appelsin-integration er på vej til qlim8",
    subtitle:
      "Vi arbejder på at forbinde Appelsin, så dit regnskab derfra kan blive til et klimaregnskab automatisk, med samme flow som Dinero, e-conomic og Billy. Den er endnu ikke live.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Appelsin kommer snart, og du kan starte nu",
    body: "Vi arbejder på en direkte forbindelse til Appelsin, men den er ikke klar endnu. Du behøver ikke vente: kan du trække en CSV- eller Excel-fil med dato og beløb ud af dit regnskab, kan du uploade den og se dit klimaregnskab allerede nu. Skriv eller ring til os, så hjælper vi med filen og giver dig besked, når Appelsin er på plads.",
  },
  intro: {
    heading: "Bruger du Appelsin? Så er du snart dækket",
    body:
      "Appelsin-integrationen er under udvikling og endnu ikke tilgængelig i qlim8. Planen er den samme som for vores øvrige regnskabsintegrationer: du forbinder dit Appelsin-regnskab, vi henter dine bogførte udgifter, og posteringerne kategoriseres automatisk til CO₂e-emissioner, uden CSV-eksport og uden manuel indtastning. Vi melder detaljerne ud, når integrationen er klar. Har du allerede Dinero, e-conomic eller Billy, kan vi forbinde det nu; er Appelsin dit eneste system, kan du bruge Excel-upload som midlertidig løsning, indtil den native integration er live.",
    bullets: [
      "Status: under udvikling, ikke live endnu og uden fast lanceringsdato.",
      "Samme flow som vores øvrige regnskabsintegrationer er planlagt.",
      "Excel-upload er en midlertidig løsning, indtil integrationen er klar.",
    ],
  },
  painPoints: [
    {
      pain:
        "Du fører regnskab i Appelsin og vil vide, om du kan få et klimaregnskab uden at skifte system.",
      solution:
        "Appelsin-integrationen er på roadmap'et; indtil den er live, kan du bruge Excel-upload eller en af vores eksisterende regnskabsintegrationer.",
      outcome:
        "En klar vej fremad nu, og automatisk sync når integrationen lander.",
    },
    {
      pain:
        "Du vil ikke vente med at komme i gang, bare fordi netop dit system endnu ikke er koblet på.",
      solution:
        "Du kan starte nu med Excel-upload og skifte til den native Appelsin-integration, så snart den er klar, uden at miste dine data.",
      outcome:
        "Ingen ventetid for at komme i gang med dit klimaregnskab.",
    },
  ],
  features: [
    {
      title: "Automatisk import (planlagt)",
      body:
        "Målet er, at dine bogførte udgifter fra Appelsin hentes automatisk, så du slipper for CSV-eksport og manuel indtastning: på linje med Dinero, e-conomic og Billy.",
    },
    {
      title: "Automatisk kategorisering (planlagt)",
      body:
        "Posteringer skal kategoriseres til emissions-kategorier automatisk, så du kun retter det, der er specifikt for din virksomhed.",
    },
    {
      title: "Excel-upload i mellemtiden",
      body:
        "Indtil integrationen er live, kan du uploade dine tal via regneark og få et klimaregnskab allerede nu.",
    },
    {
      title: "Sporbarhed (planlagt)",
      body:
        "Som med vores øvrige regnskabsintegrationer er planen, at hvert emissionstal kan spores tilbage til den oprindelige postering.",
    },
  ],
  howItWorks: {
    title: "Sådan bliver flowet, når den er klar",
    steps: [
      {
        title: "1. Tilslut Appelsin",
        body:
          "Du forbinder dit Appelsin-regnskab til qlim8. Den præcise metode meldes ud, når integrationen lanceres.",
      },
      {
        title: "2. Hent data",
        body:
          "qlim8 henter dine bogførte udgifter og kategoriserer dem automatisk til emissioner.",
      },
      {
        title: "3. Færdig rapport",
        body:
          "Tallene lander i klimaregnskabet, klar til VSME-rapporten.",
      },
    ],
  },
  valueStats: [
    { value: "Kommer snart", label: "Appelsin-integration" },
    { value: "Dinero, e-conomic, Billy", label: "kan forbindes i dag" },
    { value: "Excel", label: "midlertidig løsning nu" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Appelsin-integrationen",
    items: [
      {
        q: "Kan jeg forbinde Appelsin til qlim8 i dag?",
        a: "Ikke endnu. Appelsin-integrationen er under udvikling og er ikke live. Indtil den er klar, kan du bruge Excel-upload eller en af vores eksisterende regnskabsintegrationer (Dinero, e-conomic, Billy).",
      },
      {
        q: "Hvornår er Appelsin-integrationen klar?",
        a: "Den er under udvikling, og vi har ikke meldt en fast lanceringsdato ud. Vi opdaterer, så snart der er nyt. Skriv til os via /kontakt, hvis du vil have besked, når den lander.",
      },
      {
        q: "Kommer Appelsin til at fungere som Dinero-integrationen?",
        a: "Det er planen. Målet er samme automatiske flow: forbind, hent bogførte udgifter, og få dem kategoriseret til emissioner automatisk. De endelige detaljer meldes ud ved lancering.",
      },
      {
        q: "Hvordan kommer jeg i gang, mens jeg venter?",
        a: "Opret en gratis konto, så kan du bruge Excel-upload til at få et klimaregnskab allerede nu. Når Appelsin-integrationen er live, kan du skifte til den uden at miste dine data.",
      },
      {
        q: "Hvad koster det, når integrationen kommer?",
        a: "Med Gratis-pakken forbinder du i dag Eloverblik og ét regnskabsprogram (e-conomic, Dinero eller Billy). Gratis-pakken har ingen udløbsdato. Hvilke pakker Appelsin kommer med i, melder vi ud ved lancering, og pakkerne står på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Kom i gang nu: skift til Appelsin-integrationen, når den lander",
    description:
      "Book en demo, så viser vi, hvordan du kan starte med Excel-upload eller en af vores live regnskabsintegrationer. Vi giver besked, når Appelsin er klar.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// Eloverblik
// ---------------------------------------------------------------------------

export const IN_ELOVERBLIK: MarketingPageCopy = {
  hero: {
    eyebrow: "Energiintegration",
    title: "Hent dit faktiske elforbrug automatisk: præcise Scope 2-tal",
    subtitle:
      "qlim8 henter time-baseret elforbrug fra Eloverblik (Energinet) og ganger det med Energinets CO₂-faktor. Dine Scope 2-tal bliver målte i stedet for gættede, uden at fotografere en eneste elregning.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Dit elforbrug, hentet for dig hver uge",
    body: "Du giver qlim8 fuldmagt med MitID på eloverblik.dk. Derefter henter vi dit elforbrug time for time for hvert målepunkt, én gang om ugen, og regner det om med Energinets data. Du skal ikke fotografere elregninger eller taste kWh ind. Fuldmagten kan virke lidt teknisk første gang, så vi tager den gerne sammen med dig over telefonen.",
  },
  intro: {
    heading: "Målt elforbrug slår et årsgennemsnit hver gang",
    body:
      "Eloverblik er Energinets data-hub for danske virksomheders elforbrug. I stedet for at taste kWh fra elregninger giver du qlim8 adgang via en fuldmagt på eloverblik.dk, og vi henter dit time-baserede forbrug automatisk. Hver time ganges med Energinets CO₂-faktor, så dine Scope 2-emissioner bygger på faktisk målt forbrug frem for et årsgennemsnit. For en virksomhed med flere målepunkter betyder det sikker, fuld dækning, ingen glemte regninger og ingen manuelle skøn. Har Eloverblik leveret data for en måned, er den måling autoritativ; måneder uden data falder automatisk tilbage på el fra fakturaer, så du aldrig hverken dobbelttæller eller mangler forbrug.",
    bullets: [
      "Time-baseret, faktisk forbrug, ikke et årligt gennemsnitsskøn.",
      "Ganges med Energinets CO₂-faktor for korrekte Scope 2-tal.",
      "Måned med Eloverblik-data er autoritativ; øvrige måneder falder tilbage på faktura-el uden dobbelttælling.",
    ],
  },
  painPoints: [
    {
      pain:
        "Du fotograferer elregninger og taster kWh ind manuelt hver måned for hvert målepunkt.",
      solution:
        "qlim8 henter time-baseret forbrug direkte fra Eloverblik, så du aldrig indtaster en kWh igen.",
      outcome:
        "Ingen manuel el-indtastning, hverken pr. måned eller pr. målepunkt.",
    },
    {
      pain:
        "Dine Scope 2-tal hviler på et årligt gennemsnit, der ikke afspejler, hvornår og hvor meget du faktisk bruger.",
      solution:
        "Vi ganger dit faktiske time-forbrug med Energinets CO₂-faktor, så tallene følger den reelle variation.",
      outcome:
        "Præcise Scope 2-emissioner i stedet for en årsgennemsnits-antagelse.",
    },
    {
      pain:
        "Med både elregninger og målerdata risikerer du at tælle det samme forbrug to gange.",
      solution:
        "Har Eloverblik data for en måned, er den måling autoritativ, og el fra fakturaer for den måned frasorteres automatisk, synligt markeret i posteringsoversigten.",
      outcome:
        "Ingen dobbelttælling; du kan se præcis, hvilke faktura-linjer der er frasorteret og hvorfor.",
    },
    {
      pain:
        "En glemt elregning efterlader et hul i klimaregnskabet, som du først opdager under revision.",
      solution:
        "Fuldt time-dækket forbrug hentes automatisk for dine tildelte målepunkter, og måneder uden data falder tilbage på faktura-el.",
      outcome:
        "Fuld dækning uden huller: ingen glemte regninger.",
    },
    {
      pain:
        "En fuldmagt udløber, og pludselig stopper dine el-tal uden at du opdager det.",
      solution:
        "qlim8 mailer dine admins før og efter udløb på en fast kadence og markerer datakilden, så du kan forny i tide.",
      outcome:
        "Ingen tavse huller når en fuldmagt udløber. Du får besked og fornyer fuldmagten med MitID på eloverblik.dk.",
    },
  ],
  features: [
    {
      title: "Time-baseret forbrug",
      body:
        "Vi henter dit elforbrug pr. time pr. målepunkt fra Eloverblik. Det giver præcise Scope 2-tal. Forbruget er hele målepunktets, så en ladestander på adressen kan ikke skilles ud.",
    },
    {
      title: "Energinets CO₂-faktor",
      body:
        "Forbruget ganges med Energinets CO₂-faktor, så dine emissioner følger den faktiske variation i elnettet i stedet for et fast årstal.",
    },
    {
      title: "Autoritativ måling uden dobbelttælling",
      body:
        "For måneder med Eloverblik-data er målingen autoritativ, og el fra fakturaer frasorteres automatisk. De rå faktura-linjer bevares og markeres, så du kan se hvorfor de ikke tæller med.",
    },
    {
      title: "Automatisk fallback",
      body:
        "Måneder uden Eloverblik-data falder automatisk tilbage på el fra fakturaer eller AI-fakturaupload, så der aldrig er et hul i regnskabet.",
    },
    {
      title: "Påmindelser før fuldmagt udløber",
      body:
        "En fuldmagt har en udløbsdato. Vi mailer dine admins før og efter udløb og markerer datakilden, så el-tallene ikke tavst stopper.",
    },
  ],
  howItWorks: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "1. Tilslut Eloverblik",
        body:
          "Log ind med MitID på eloverblik.dk, og giv qlim8 fuldmagt med qlim8's CVR-nummer og din kundenøgle (customerKey). Begge dele finder du i qlim8. Vi finder din adgang via Eloverbliks authorization-opslag.",
      },
      {
        title: "2. Hent forbrug",
        body:
          "qlim8 henter time-baseret elforbrug for dine tildelte målepunkter og ganger det med Energinets CO₂-faktor.",
      },
      {
        title: "3. Se Scope 2 udfyldt",
        body:
          "Dine målte tal lander som Scope 2-emissioner. Måneder med Eloverblik-data er autoritative; øvrige falder tilbage på faktura-el.",
      },
      {
        title: "4. Færdig rapport",
        body:
          "Præcist elforbrug står klar i klimaregnskabet til VSME-rapporten, uden en eneste manuel kWh.",
      },
    ],
  },
  valueStats: [
    { value: "Time-data", label: "faktisk elforbrug" },
    { value: "Ugentligt", label: "nye data fra Eloverblik" },
    { value: "Scope 2", label: "målt, ikke gættet" },
    { value: "0", label: "elregninger at taste" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Eloverblik-integrationen",
    items: [
      {
        q: "Hvordan giver jeg qlim8 adgang til mit elforbrug?",
        a: "Du logger ind med MitID på eloverblik.dk og giver qlim8 en fuldmagt, hvor du indtaster qlim8's CVR-nummer og din kundenøgle (customerKey). Begge dele står i qlim8, når du opretter forbindelsen. Vi finder adgangen via Eloverbliks authorization-opslag og henter derefter dit forbrug automatisk. Det kræver, at din virksomhed har en aftaleforbinder på sin CVR-profil på eloverblik.dk.",
      },
      {
        q: "Hvor præcise bliver mine Scope 2-tal?",
        a: "Meget mere præcise end et årsgennemsnit. Vi henter dit forbrug pr. time og ganger det med Energinets CO₂-faktor, så emissionerne følger den faktiske variation i elnettet frem for et fast årstal.",
      },
      {
        q: "Tæller I både min elregning og målerdata med?",
        a: "Nej. For enhver måned, hvor Eloverblik har leveret forbrugsdata, er målingen autoritativ, og el fra fakturaer for den måned frasorteres automatisk, uanset kilde. De rå faktura-linjer bevares og markeres \"Frasorteret pga. Eloverblik\", så du kan se hvorfor. Måneder uden Eloverblik-data falder tilbage på faktura-el.",
      },
      {
        q: "Hvad hvis en lokation ikke er dækket af Eloverblik?",
        a: "El, som Eloverblik ikke dækker, fx en lokation uden for dine tildelte målepunkter, kan du tilføje via AI-fakturaupload for de måneder, hvor Eloverblik ingen data har. Så er dækningen fuld.",
      },
      {
        q: "Hvad sker der, når min fuldmagt udløber?",
        a: "qlim8 mailer dine admins før og efter udløb på en fast kadence og markerer datakilden med en udløbet-tilstand, så synkroniseringen ikke tavst stopper. Du fornyer fuldmagten på eloverblik.dk og trykker \"Tjek status\" for at genstarte.",
      },
      {
        q: "Kan I også hente gas og fjernvarme?",
        a: "Ikke automatisk. I dag henter vi kun el fra Eloverblik. Forbruget af gas og fjernvarme kan du i stedet indtaste selv.",
      },
    ],
  },
  closingCta: {
    title: "Få målte Scope 2-tal i stedet for skøn",
    description:
      "Opret en gratis konto og giv fuldmagten på eloverblik.dk, så ser du dit faktiske elforbrug blive til præcise Scope 2-emissioner. Vil du hellere se det først, så book en demo, og vi hjælper gerne med fuldmagten.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// REST API
// ---------------------------------------------------------------------------

export const IN_REST_API: MarketingPageCopy = {
  hero: {
    eyebrow: "For udviklere",
    title: "Byg oven på qlim8: hent emissioner og rapporter via REST",
    subtitle:
      "Et versioneret REST API under /api/v1 giver dig programmatisk adgang til posteringer, emissionsdata og rapportstatus. JSON over HTTPS, Bearer-token, cursor-paginering og webhooks til dine egne flows.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Dine klimadata i dine egne systemer",
    body: "Med REST API'et henter du dine klimadata ind i de værktøjer, du allerede bruger, med en API-nøgle til din virksomhed. Spørgsmål til opsætningen kan du sende til kontakt@qlim8.com.",
  },
  intro: {
    heading: "Dine klimadata, der hvor dine andre systemer er",
    body:
      "Nogle gange skal tallene ikke bare stå i qlim8: de skal ind i dit BI-værktøj, din datawarehouse eller et internt dashboard. Med qlim8's REST API henter du scope 1-3-data, leverandørrapporter og hele VSME-eksporter programmatisk under en versioneret /api/v1-overflade. Det er JSON over HTTPS med Bearer-token-auth, cursor-paginering og en fuld OpenAPI 3.1-spec, så din klient kan genereres automatisk. API-nøgler kan begrænses til specifikke scopes: fx emissions:read eller reports:generate, og alle mutating-calls skrives i audit-loggen. Med webhooks kan du abonnere på hændelser, så dine systemer reagerer, når data ændrer sig, i stedet for at polle. Se den fulde oversigt af REST og MCP på /api.",
    bullets: [
      "Versioneret /api/v1 med OpenAPI 3.1-spec og cursor-paginering.",
      "Scope-begrænsede Bearer-nøgler (emissions:read, reports:generate, webhooks:manage m.fl.).",
      "Webhooks, så dine systemer reagerer på ændringer i stedet for at polle.",
    ],
  },
  painPoints: [
    {
      pain:
        "Dine klimadata er låst inde i én platform, men dit BI-team har brug for dem i dashboardet.",
      solution:
        "Hent scope 1-3-data og rapportstatus programmatisk via /api/v1 og send dem videre til det værktøj, dit team allerede bruger.",
      outcome:
        "Ingen manuel eksport-runde: data flyder direkte ind i jeres eksisterende dashboards.",
    },
    {
      pain:
        "Du poller efter nye tal eller genererede rapporter og ved aldrig helt, hvornår noget er klart.",
      solution:
        "Abonnér på webhooks, så qlim8 giver dine systemer besked, når en rapport er genereret eller data ændrer sig.",
      outcome:
        "Event-drevne flows i stedet for konstant polling, mindre kode og hurtigere reaktion.",
    },
    {
      pain:
        "Du vil ikke give en integration bredere adgang end nødvendigt.",
      solution:
        "API-nøgler kan begrænses til specifikke scopes, så en read-only integration aldrig kan mutere data.",
      outcome:
        "Mindst-privilegie-adgang pr. integration, med fuld audit-log på alt der ændrer noget.",
    },
    {
      pain:
        "At bygge en klient mod et udokumenteret API er gætværk.",
      solution:
        "En fuld OpenAPI 3.1-spec ligger på /api/v1/openapi.json, så du kan generere en typet klient i stedet for at kode kald i hånden.",
      outcome:
        "Fra manuel kald-kodning til genereret klient, hurtigere og med færre fejl.",
    },
  ],
  features: [
    {
      title: "Versioneret REST under /api/v1",
      body:
        "Hent posteringer, emissionsdata og rapportstatus via en stabil, versioneret overflade. JSON over HTTPS med cursor-paginering til store datasæt.",
    },
    {
      title: "Scope-begrænsede nøgler",
      body:
        "Hver API-nøgle kan låses til bestemte scopes som emissions:read eller reports:generate. En integration får kun den adgang, den skal bruge.",
    },
    {
      title: "Webhooks",
      body:
        "Abonnér på hændelser og lad qlim8 kalde dine systemer, når data ændrer sig eller en rapport er klar. Leverancer kan følges, så du ser om et event kom frem.",
    },
    {
      title: "Leverandørrapportering",
      body:
        "CSRD-kunder kan trække scope 1-3-leverandørdata direkte fra deres tenant, så konsoliderede tal kan hentes uden manuelle Excel-runder.",
    },
    {
      title: "OpenAPI 3.1-spec",
      body:
        "Den fulde spec ligger på /api/v1/openapi.json, så du kan generere en typet klient og se præcis, hvilke felter hvert endpoint returnerer.",
    },
    {
      title: "Audit-log på mutating-calls",
      body:
        "Alle kald, der ændrer data, skrives i en tamper-evident audit-kæde. Under revision kan du vise, hvad der blev ændret, hvornår og af hvilken nøgle.",
    },
  ],
  howItWorks: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "1. Opret en API-nøgle",
        body:
          "Generér en Bearer-nøgle og vælg de scopes, integrationen skal bruge, fx emissions:read eller reports:generate.",
      },
      {
        title: "2. Hent data",
        body:
          "Kald /api/v1 med din nøgle. Filtrér på scope og datointerval, og paginér med cursor gennem store datasæt.",
      },
      {
        title: "3. Abonnér på webhooks",
        body:
          "Registrér en webhook, så qlim8 giver dine systemer besked, når data ændrer sig eller en rapport er genereret.",
      },
      {
        title: "4. Byg videre",
        body:
          "Send tallene ind i dit BI-værktøj, dashboard eller flow. Se den fulde reference på /docs/api-reference.",
      },
    ],
  },
  valueStats: [
    { value: "/api/v1", label: "versioneret REST" },
    { value: "OpenAPI 3.1", label: "fuld spec" },
    { value: "Webhooks", label: "event-drevne flows" },
    { value: "Scopes", label: "granulær adgang" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om REST API",
    items: [
      {
        q: "Hvad kan jeg hente via qlim8's REST API?",
        a: "Du kan hente posteringer, scope 1-3-emissionsdata, rapportstatus og leverandørrapporter, og du kan generere rapporter og administrere webhooks. Alt ligger under en versioneret /api/v1-overflade som JSON over HTTPS. Se oversigten på /api.",
      },
      {
        q: "Hvordan autentificerer jeg mod API'et?",
        a: "Med en Bearer-token (API-nøgle), du opretter i qlim8. Nøgler kan begrænses til specifikke scopes som emissions:read, reports:generate eller webhooks:manage, så en integration kun får den adgang, den behøver.",
      },
      {
        q: "Er der en OpenAPI-spec, jeg kan generere en klient fra?",
        a: "Ja. En fuld OpenAPI 3.1-spec ligger på /api/v1/openapi.json, så du kan generere en typet klient i stedet for at kode hvert kald manuelt. Detaljerne findes i /docs/api-reference.",
      },
      {
        q: "Kan jeg få besked, når data ændrer sig?",
        a: "Ja. Med webhooks kan du abonnere på hændelser, så qlim8 kalder dine systemer, når fx en rapport er genereret eller data ændres, event-drevet i stedet for polling. Leverancer kan følges, så du ser, om et event kom frem.",
      },
      {
        q: "Bruger REST og MCP de samme nøgler?",
        a: "Ja. MCP-serveren og REST-API'et deler samme Bearer-nøgler og scope-model, så en nøgle, der virker mod /api/v1, også kan drive MCP-tools. Se MCP-siden for AI-assistenter og /api for det fulde billede.",
      },
      {
        q: "Hvem har adgang til API'et?",
        a: "Programmatisk adgang er rettet mod større kunder, BI-værktøjer og custom-flows. Skriv til os via /kontakt eller kontakt@qlim8.com om adgang og scopes.",
      },
    ],
  },
  closingCta: {
    title: "Byg dine klimadata ind i dine egne systemer",
    description:
      "Book en demo, så gennemgår vi API-adgang og scopes med jer. Med en konto genererer I en scope-begrænset API-nøgle og henter scope 1-3-data programmatisk. Se den fulde reference på /docs/api-reference og oversigten på /api.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// MCP server
// ---------------------------------------------------------------------------

export const IN_MCP: MarketingPageCopy = {
  hero: {
    eyebrow: "For AI-assistenter",
    title: "Snak med din egen AI om dit klimaregnskab",
    subtitle:
      "qlim8 AI-integration med vores egen MCP-server. Spørg Claude eller ChatGPT om dine tal i naturligt sprog, og få svar hentet direkte fra dit klimaregnskab. 31 tools lader assistenten hente emissioner, generere rapporter og planlægge reduktioner, uden at en udvikler skal bygge en integration.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "Dine tal er med, hvor du er",
    body: "Forbind Claude eller ChatGPT til qlim8, og spørg til dine tal med dine egne ord. Assistenten henter svarene direkte fra dit klimaregnskab, og vi hjælper gerne med at komme i gang.",
  },
  intro: {
    heading: "Din assistent henter tallene, så du ikke skal åbne dashboardet",
    body:
      "MCP (Model Context Protocol) er en standard, der lader LLM-klienter kalde eksterne funktioner. qlim8 eksponerer en live MCP-server, så din assistent kan svare på \"Hvor stor del af vores Scope 3 kommer fra de fem største leverandører?\" direkte, uden at du åbner qlim8. Overfladen er 31 tools, 3 resources og 3 prompts. Almindelige brugere forbinder Claude eller ChatGPT via OAuth helt uden en API-nøgle at kopiere, mens udviklere tilføjer qlim8 i fx Claude Code eller Cursor med samme Bearer-nøgle som REST-API'et. Hvert tool har et påkrævet scope og en adfærds-annotering, så en klient kan se, hvad der er sikkert at køre automatisk, kontra hvad der ændrer data. Se den fulde oversigt på /api.",
    bullets: [
      "31 tools, 3 resources og 3 prompts, den fulde overflade.",
      "OAuth for Claude og ChatGPT (ingen nøgle at kopiere); Bearer-nøgle for Claude Code og Cursor.",
      "Scope- og tier-gate pr. tool, read-only som default og fuld audit-log på writes.",
    ],
  },
  painPoints: [
    {
      pain:
        "Dit analyseteam stiller de samme ad-hoc-spørgsmål til klimadata igen og igen og skal ind i UI'et hver gang.",
      solution:
        "Med MCP spørger de deres assistent i naturligt sprog, og den henter live tal direkte fra qlim8.",
      outcome:
        "Sparet tid pr. spørgsmål, fordi svaret kommer i samtalen i stedet for i et nyt udtræk.",
    },
    {
      pain:
        "At koble en intern assistent til jeres klimadata plejer at kræve en udvikler og en skræddersyet integration.",
      solution:
        "MCP-serveren er live og standardiseret, så Claude, custom GPTs eller et n8n-flow kan kalde qlim8 uden ad-hoc REST-arbejde.",
      outcome:
        "Fra udviklerprojekt til en forbindelse, der er sat op på minutter.",
    },
    {
      pain:
        "Du er nervøs for at give en AI-agent adgang, der kan ændre data uden opsyn.",
      solution:
        "Hvert tool bærer en adfærds-annotering (read-only kontra muterende) og et påkrævet scope; OAuth-consent er kun for tenant-admins og read-only som default.",
      outcome:
        "Du styrer præcis, hvad agenten må, og writes lander i en tamper-evident audit-kæde.",
    },
    {
      pain:
        "At kopiere API-nøgler rundt til hver bruger, der vil forbinde Claude eller ChatGPT, er besværligt og usikkert.",
      solution:
        "Claude og ChatGPT forbinder via OAuth 2.1 med dynamisk klient-registrering, helt uden en nøgle at kopiere.",
      outcome:
        "Almindelige brugere forbinder med et login, uden nøgler der cirkulerer på mail.",
    },
  ],
  features: [
    {
      title: "31 tools på tværs af dit klimaregnskab",
      body:
        "Assistenten kan hente emissioner (fx get_emissions_summary, get_emissions_by_category, get_emissions_by_scope3_category), generere rapporter, oprette mål og følge deres fremdrift, liste leverandører og oprette et tiltag med din egen vurdering af effekten og knytte det til et mål.",
    },
    {
      title: "Naturligt sprog, live tal",
      body:
        "En CFO kan spørge \"Hvor stor del af vores Scope 3 kommer fra de fem største leverandører?\" og få svaret direkte fra assistenten, uden at åbne qlim8-UI'et.",
    },
    {
      title: "OAuth eller Bearer-nøgle",
      body:
        "Claude og ChatGPT forbinder via OAuth uden nøgle; Claude Code, Cursor og egne agenter bruger samme Bearer-nøgler som REST-API'et. Consent er kun for tenant-admins.",
    },
    {
      title: "Sikre annotationer pr. tool",
      body:
        "Hvert tool markerer, om det er read-only eller muterende, så din klient kan auto-køre sikre opslag men bede om bekræftelse før noget ændrer data.",
    },
    {
      title: "3 resources og 3 prompts",
      body:
        "Ud over tools eksponerer serveren resources (emission-categories, ghg-scopes, usage-guide) og færdige prompts som emissions_vs_target_analysis og year_over_year_review.",
    },
    {
      title: "Scope-gate og audit-spor",
      body:
        "Hvert tool kræver et scope, og manglende scope giver en tydelig fejl. Write-tools skrives i den tamper-evidente audit-kæde med markeringen \"via mcp\".",
    },
    {
      title: "VSME-rapporten kan startes fra chatten",
      body:
        "generate_report sætter en VSME Basis eller Comprehensive-rapport i gang for et rapportår, og get_report_status følger jobbet til filen er klar. Assistenten kan også hente Scope 3 delt op på GHG-protokollens 15 kategorier, den samme opdeling EFRAG-arket udfyldes med. Se /integrationer/vsme-rapport-med-ai-agent.",
    },
  ],
  howItWorks: {
    title: "Sådan kommer du i gang",
    steps: [
      {
        title: "1. Tilslut din assistent",
        body:
          "Forbind Claude eller ChatGPT via OAuth uden nøgle, eller tilføj qlim8 i Claude Code / Cursor med en Bearer-nøgle. Se /docs/mcp-quickstart.",
      },
      {
        title: "2. Hent data i naturligt sprog",
        body:
          "Stil et spørgsmål: assistenten vælger det rette af de 31 tools og henter live tal fra dit klimaregnskab.",
      },
      {
        title: "3. Generér og handl",
        body:
          "Bed assistenten generere en rapport, oprette et mål eller tilføje et tiltag med din egen vurdering af effekten. Muterende tools kræver det rette scope.",
      },
      {
        title: "4. Færdig rapport",
        body:
          "Resultatet lander i qlim8, klar til VSME-rapporten, med hvert write sporet i audit-loggen.",
      },
    ],
  },
  valueStats: [
    { value: "31 tools", label: "MCP-overflade" },
    { value: "OAuth", label: "ingen nøgle at kopiere" },
    { value: "Read-only", label: "som default" },
    { value: "Audit", label: "på hvert write" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om MCP-serveren",
    items: [
      {
        q: "Hvad er qlim8's MCP-server?",
        a: "Det er en live server, der taler Model Context Protocol, så LLM-klienter som Claude, ChatGPT og egne agenter kan kalde qlim8-funktioner programmatisk: hente emissioner, generere rapporter, oprette mål, liste leverandører og planlægge reduktioner. Overfladen er 31 tools, 3 resources og 3 prompts. Se /api.",
      },
      {
        q: "Hvordan forbinder jeg Claude eller ChatGPT?",
        a: "Almindelige brugere forbinder Claude og ChatGPT via OAuth 2.1 med dynamisk klient-registrering, helt uden en API-nøgle at kopiere. Consent gives af en tenant-admin og er read-only som default. Trin-for-trin ligger i /docs/mcp-quickstart.",
      },
      {
        q: "Kan jeg bruge den fra Claude Code eller Cursor?",
        a: "Ja. Udviklere tilføjer qlim8 i Claude Code, Cursor og egne JSON-RPC-klienter med samme Bearer-nøgle som REST-API'et. Du peger klienten på /api/mcp med din nøgle, og agenten har adgang til alle tools.",
      },
      {
        q: "Hvilke tools findes der?",
        a: "De 31 tools spænder fra emissions-opslag (get_emissions_summary, get_emissions_by_category, get_emissions_by_scope3_category), aktiviteter og rapporter til leverandører, mål og deres fremdrift, tiltag, emissionsfaktorer, PCF-records, afdelinger og webhooks. Den fulde liste med scopes står i /docs/mcp-tools.",
      },
      {
        q: "Kan assistenten hjælpe med VSME-rapporten?",
        a: "Ja. Den kan hente alle tallene rapporten bygger på, altså Scope 1-3, energiforbrug og Scope 3 pr. GHG-kategori, og den kan starte selve rapporten med generate_report for VSME Basis, VSME BP eller VSME Comprehensive. De narrative afsnit om politikker, risici og governance udfylder I fortsat selv. Der er en side om det på /integrationer/vsme-rapport-med-ai-agent.",
      },
      {
        q: "Er det sikkert at lade en agent ændre data?",
        a: "Hvert tool bærer en adfærds-annotering (read-only kontra muterende) og kræver et scope, så en klient kan auto-køre sikre opslag men bede om bekræftelse før noget ændres. OAuth er read-only som default, og alle writes skrives i en tamper-evident audit-kæde med markeringen \"via mcp\".",
      },
      {
        q: "Kræver MCP en bestemt plan?",
        a: "MCP-adgang følger pakken, og hvilke pakker der giver adgang, står på /priser. Serveren deler nøgle- og scope-model med REST-API'et, og enkelte tools kræver desuden den funktion, de bruger, fx tiltag. Skriv til os via /kontakt, hvis du er i tvivl.",
      },
    ],
  },
  closingCta: {
    title: "Lad din assistent svare på dine klimaspørgsmål",
    description:
      "Book en demo, så viser vi, hvordan assistenten henter tallene. Med en konto forbinder I Claude eller ChatGPT via OAuth eller tilføjer qlim8 i Claude Code med en Bearer-nøgle. Start med /docs/mcp-quickstart og se alle tools i /docs/mcp-tools.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// VSME-rapportering via AI-agent
// ---------------------------------------------------------------------------
// The page that owns the VSME x MCP intersection. It exists because the two
// entities never met anywhere on the site: the VSME product pages rendered no
// mention of MCP at all, and the MCP page mentioned VSME four times in passing,
// so a model asked for "dansk VSME-software med MCP-server" had no single
// document to anchor on.
//
// Ground truth for every claim below:
//   docs/da/integrations/mcp-overview.md          (transport, auth, 31 tools)
//   qlim8-app server/mcp/lib/catalog.ts           (tool names and scopes)
//   qlim8-app server/reports/vsme.ts              (what a VSME report contains)
//   qlim8-app shared/subscriptionFeatures.ts      (VSME Basis: starter,
//                                                  Comprehensive og MCP: premium)
//
// Terminology: the hero sells the outcome, and "MCP" is explained the first time
// it appears in the body. See "Terminology" in CLAUDE.md.

export const IN_VSME_MCP: MarketingPageCopy = {
  hero: {
    eyebrow: "VSME og AI-assistenter",
    title: "Lad din AI hente tallene til VSME-rapporten",
    subtitle:
      "qlim8 AI-integration med vores egen MCP-server. Spørg Claude eller ChatGPT om dine VSME-tal, bed assistenten sætte rapporten i gang, og få den tilbage i det format, standarden giver: PDF for VSME Basis og BP, EFRAG's eget Excel-ark for Comprehensive.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  reassurance: {
    title: "VSME-rapporten bygger på det, du allerede har",
    body: "En VSME-rapport kan lyde som et stort stykke arbejde, men tallene bygger på dit klimaregnskab. Med qlim8's MCP-server kan du bede Claude eller ChatGPT om at hente dem og sætte rapporten i gang. Det, kun du kender, fx virksomhedens politikker, skriver du selv, og vi hjælper gerne, hvis du går i stå.",
  },
  intro: {
    heading: "VSME-rapportering, spurgt i naturligt sprog",
    body:
      "qlim8 er en dansk ESG-platform til klimaregnskab og VSME-rapportering, og den udstiller dine tal direkte til AI-assistenter gennem en indbygget MCP-server. MCP (Model Context Protocol) er den standard, Claude og ChatGPT bruger, når de skal hente data fra et system i stedet for at gætte. I praksis betyder det, at du kan skrive \"hvad er vores Scope 3 fordelt på de 15 GHG-kategorier?\" eller \"start VSME Basis-rapporten for 2025\" i din assistent, og få svaret hentet live fra dit eget klimaregnskab. Overfladen er 31 tools, 3 resources og 3 prompts. Claude og ChatGPT forbinder via OAuth 2.1 uden en API-nøgle at kopiere, mens Claude Code og Cursor bruger samme Bearer-nøgle som REST-API'et.",
    bullets: [
      "VSME Basis og Comprehensive, genereret gennem generate_report og hentet igen med get_report_status.",
      "Scope 1-3 med Scope 3 fordelt på GHG-protokollens 15 kategorier, det samme opslag rapporten selv bruger.",
      "Read-only som default, og hvert write havner i den tamper-evidente audit-kæde.",
    ],
  },
  painPoints: [
    {
      pain:
        "VSME-rapporten kræver tal fra flere hjørner af regnskabet, og du skal ind i dashboardet hver gang nogen spørger til ét af dem.",
      solution:
        "Assistenten henter tallene direkte: samlet CO2e, fordelingen på scope, energiforbruget og Scope 3 pr. kategori, uden at du åbner qlim8.",
      outcome:
        "Spørgsmål fra bank, revisor eller bestyrelse kan besvares, mens du står med telefonen i hånden.",
    },
    {
      pain:
        "Du ved ikke, om I skal vælge VSME Basis eller Comprehensive, og forskellen er svær at læse ud af standarden.",
      solution:
        "Bed assistenten sammenligne, hvad I allerede har data til. Den kan læse jeres emissioner, mål og datakilder og pege på, hvad der mangler for hver af de to versioner.",
      outcome:
        "Valget bliver truffet på jeres egne data i stedet for på en generisk vejledning.",
    },
    {
      pain:
        "Revisoren spørger, hvor et enkelt tal i rapporten kommer fra, og du skal grave manuelt i bilag og faktorer.",
      solution:
        "get_emission_lineage giver hele sporet for en postering: kildeaktiviteten, emissionsfaktoren, kategoriskift og audit-hashes. get_factor_citations viser, hvilke posteringer der brugte en given faktor.",
      outcome:
        "Revisoren kan selv følge tallet til bunds, i stedet for at bede dig om et nyt udtræk.",
    },
    {
      pain:
        "Du er nervøs for at give en AI-agent adgang til noget, der ender i en rapport, banken læser.",
      solution:
        "Hvert tool er markeret som read-only eller muterende og kræver et scope. OAuth-consent gives kun af en tenant-admin og er read-only som default.",
      outcome:
        "Assistenten kan læse alt, hvad du giver den lov til, og kun ændre noget, du udtrykkeligt har åbnet for.",
    },
  ],
  features: [
    {
      title: "Start VSME-rapporten fra din assistent",
      body:
        "generate_report sætter et render-job i gang for et rapportår og en standard (vsme_basic, vsme_bp eller vsme_comprehensive), og standarden afgør formatet. Kaldet er idempotent pr. år og standard, så et gentaget forsøg henter det igangværende job i stedet for at lave et nyt. get_report_status følger det til dørs.",
    },
    {
      title: "Scope 3 i GHG-protokollens 15 kategorier",
      body:
        "get_emissions_by_scope3_category giver den samme opdeling, som VSME-arket selv udfyldes med, og beløb der ikke kan henføres, kommer tilbage som unclassified i stedet for at forsvinde. Det er de tal, der lander i EFRAG-skabelonens celler for Scope 3.",
    },
    {
      title: "EFRAG's eget regneark, udfyldt celle for celle",
      body:
        "Comprehensive-rapporten patcher den officielle EFRAG-skabelon, så arkets egen valideringsfane kvitterer for hver påkrævet række. Basis leveres som en PDF med B1 stamdata, B2 energi, B3 drivhusgasser, B4 reduktionsmål og B5 klimapolitikker.",
    },
    {
      title: "Revisorens attesteringer er også et opslag",
      body:
        "get_report_attestations viser tredjeparts-underskrifter på en rapport. Attesteringen er låst til den præcise version, revisoren skrev under på, så assistenten ikke kan komme til at referere en nyere udgave.",
    },
    {
      title: "Mål og reduktioner i samme samtale",
      body:
        "list_targets og create_target dækker VSME's B4-reduktionsmål, get_target_progress viser, hvor et mål står, og tiltags-toolsene lader assistenten oprette et planlagt tiltag med den effekt, du selv angiver, og knytte det til et mål, så du kan tage stilling til det bagefter.",
    },
    {
      title: "Ingen integration at bygge",
      body:
        "Claude og ChatGPT forbinder via OAuth 2.1 med dynamisk klient-registrering. Claude Code, Cursor og egne JSON-RPC-klienter peger på /api/mcp med en Bearer-nøgle. Ingen af delene kræver, at nogen skriver kode.",
    },
  ],
  howItWorks: {
    title: "Fra spørgsmål til færdig VSME-rapport",
    steps: [
      {
        title: "1. Forbind assistenten",
        body:
          "Tilslut Claude eller ChatGPT via OAuth, eller tilføj qlim8 i Claude Code eller Cursor med en Bearer-nøgle. Trin for trin i /docs/mcp-quickstart.",
      },
      {
        title: "2. Spørg til tallene",
        body:
          "\"Hvad var vores samlede CO2e i 2025 fordelt på scope?\" eller \"hvilke Scope 3-kategorier fylder mest?\". Assistenten vælger selv det rette tool og henter live tal.",
      },
      {
        title: "3. Bed om rapporten",
        body:
          "\"Start VSME Basis for 2025.\" Assistenten kalder generate_report og følger jobbet med get_report_status, til den er klar.",
      },
      {
        title: "4. Send den videre",
        body:
          "Rapporten ligger i qlim8 sammen med et fuldt input-snapshot, klar til banken, kunden eller revisoren, og hvert write står i audit-loggen markeret \"via mcp\".",
      },
    ],
  },
  valueStats: [
    { value: "31 tools", label: "til hele klimaregnskabet" },
    { value: "B1-B11", label: "VSME-afsnit dækket" },
    { value: "15", label: "Scope 3-kategorier" },
    { value: "OAuth", label: "ingen nøgle at kopiere" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om VSME og AI-assistenter",
    items: [
      {
        q: "Kan min AI-assistent lave hele VSME-rapporten for mig?",
        a: "Den kan hente alle tallene og sætte rapporten i gang. Assistenten kalder generate_report med rapportår og standard (VSME Basis, VSME BP eller VSME Comprehensive), og følger jobbet med get_report_status, til filen er klar i qlim8. De narrative afsnit, altså politikker, risici og governance, udfylder I stadig selv i rapport-guiden: det er jeres virksomheds egne oplysninger, ikke noget der kan udledes af regnskabet.",
      },
      {
        q: "Hvad er en MCP-server, sagt uden fagsprog?",
        a: "Det er en standardiseret måde at lade en AI-assistent hente data fra et system. MCP står for Model Context Protocol. I stedet for at du kopierer tal ind i en chat, spørger assistenten qlim8 direkte og får de rigtige, aktuelle tal tilbage. Det er den samme mekanisme, Claude og ChatGPT bruger, når de kobles på andre værktøjer.",
      },
      {
        q: "Hvilke VSME-tal kan assistenten hente?",
        a: "Samlet CO2e og fordelingen på Scope 1, 2 og 3, Scope 3 delt op på GHG-protokollens 15 kategorier, emissioner pr. beregningskategori, de enkelte posteringer med fuldt spor tilbage til bilag og emissionsfaktor, jeres datakilder, reduktionsmål og tidligere genererede rapporter med attesteringer.",
      },
      {
        q: "Kræver det en bestemt plan?",
        a: "Både VSME-rapporten og MCP-adgangen følger pakken. Pakkeindholdet kan ændre sig, så det sikre sted at se det er /priser. Enkelte tools kræver desuden den funktion, de bruger, fx tiltag eller leverandørkæden.",
      },
      {
        q: "Kan assistenten ændre mine tal ved et uheld?",
        a: "Nej, ikke uden at du har givet lov. Hvert tool er markeret som enten read-only eller muterende og kræver et bestemt scope. OAuth-adgang er read-only som default, og consent gives kun af en tenant-admin. Alt, der ændrer data, skrives i en tamper-evident audit-kæde med markeringen \"via mcp\", så du kan se præcis hvad der skete.",
      },
      {
        q: "Virker det med andet end Claude og ChatGPT?",
        a: "Ja. Serveren taler almindelig MCP over streamable HTTP på https://app.qlim8.com/api/mcp, så enhver MCP-kompatibel klient kan bruge den, blandt andet Claude Code, Cursor og egne agenter. Et uautentificeret katalog over hele overfladen ligger på /api/mcp/schema, hvis du vil læse den programmatisk først.",
      },
      {
        q: "Er mine klimadata så tilgængelige for AI-udbyderen?",
        a: "Assistenten henter kun det, den bliver bedt om, og kun inden for de scopes du har givet. Det, assistenten henter, indgår i din samtale hos udbyderen af assistenten (Anthropic for Claude, OpenAI for ChatGPT), og der gælder deres vilkår. Selve klimaregnskabet ligger hos qlim8 på servere i EU, i Tyskland, og behandles efter GDPR med en databehandleraftale.",
      },
    ],
  },
  closingCta: {
    title: "Spørg din egen AI om VSME-tallene",
    description:
      "Book en demo, så viser vi, hvordan assistenten henter VSME-tallene. Med en konto forbinder I Claude eller ChatGPT via OAuth og beder assistenten om jeres Scope 1-3. Start i /docs/mcp-quickstart og se alle 31 tools i /docs/mcp-tools.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};
