import type { MarketingPageCopy, MarketingHubCopy } from "@/content/marketing/types";

// Marketing copy for the "Integrationer" collection.
// Ground truth: docs/da/integrations/{dinero,e-conomic,billy,eloverblik,mcp-overview}.md
// + docs/da/marketing/features/integrations.md. Voice per _shared/brand-voice.md.
// Numbers without a cited source carry an [antagelse] tag.

const PRIMARY_CTA = {
  label: "Opret gratis konto",
  href: "https://app.qlim8.com/auth?tab=register",
} as const;

const HERO_SECONDARY_CTA = {
  label: "Se priser",
  href: "/priser",
} as const;

const DEMO_CTA = {
  label: "Book demo",
  href: "/kontakt",
} as const;

// ---------------------------------------------------------------------------
// Hub
// ---------------------------------------------------------------------------

export const INTEGRATIONER_HUB_COPY: MarketingHubCopy = {
  hero: {
    eyebrow: "Integrationer",
    title: "Vi henter data direkte fra dine systemer.",
    subtitle:
      "Du har allerede dataene i dit regnskab og din elmåler. qlim8 forbinder til dem og laver et klimaregnskab ud af tallene — uden CSV-eksport og uden dobbelt indtastning.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Et klimaregnskab bygget oven på det regnskab, du allerede fører",
    body:
      "En klimaplatform er kun noget værd, hvis den taler med det, du allerede bruger. Ellers er det bare et ekstra sted at taste de samme tal ind en gang til. qlim8 forbinder direkte til dansk regnskabssoftware — Dinero, e-conomic og Billy — så dine posteringer bliver til CO₂e-emissioner automatisk. Vi henter faktisk elforbrug fra Eloverblik og Energinet, så dine Scope 2-tal er målte i stedet for gættede. Og for udviklere og AI-assistenter er der REST API og en live MCP-server. Første tilslutning tager typisk 5-15 minutter pr. system [antagelse: interne opsætningsmålinger, ikke kundevalideret], og derefter synkroniserer vi løbende. Du skifter ikke system — du kobler klimaregnskabet på det, du har.",
    bullets: [
      "Dansk regnskabsdata native — vi forstår danske konteringsmønstre, ikke et generisk CSV-flow.",
      "Automatisk kategorisering af posteringer til emissions-kategorier, så du slipper for manuel mapping.",
      "Ingen manuel indtastning: målt elforbrug og bogførte fakturaer trækkes ind af sig selv.",
      "OAuth og krypterede tokens hvor det giver mening — ingen kopierede passwords i en e-mail.",
    ],
  },
  cardsHeading: "Vælg din integration",
  cardsSubheading:
    "Regnskab, energi og programmatisk adgang — tilslut det, du har, og lad tallene lande i klimaregnskabet.",
  differentiators: [
    {
      title: "Dansk regnskabsdata native",
      body:
        "Dinero, e-conomic og Billy er bygget ind direkte — ikke via en dyr tredjeparts-konnektor. Vi kender de danske standardkonti (fx 2100 Gas, 2200 El), så mapping er forudfyldt og du starter tættere på et færdigt regnskab i stedet for et mapping-projekt.",
    },
    {
      title: "Automatisk kategorisering",
      body:
        "Hver postering får en emissions-kategori automatisk, og de mest brugte konti er dækket fra start. Du retter kun det, der er tenant-specifikt — typisk en håndfuld konti frem for hundredvis af linjer i hånden.",
    },
    {
      title: "Ingen manuel indtastning",
      body:
        "Målt elforbrug fra Eloverblik og bookede fakturaer fra dit regnskab trækkes ind af sig selv. Det fjerner den månedlige CSV-eksport og indtastning — anslået 30-60 minutter pr. system pr. måned [antagelse: pilot-tal, ikke bredt kundevalideret].",
    },
    {
      title: "Åben via API og MCP",
      body:
        "Ud over de færdige integrationer kan du bygge oven på qlim8 med et versioneret REST API og en live MCP-server med 31 tools, så BI-værktøjer, egne agenter og AI-assistenter som Claude kan hente emissioner og rapporter programmatisk.",
    },
  ],
  closingCta: {
    title: "Tilslut dit første system på under et kvarter",
    description:
      "Opret en gratis konto, forbind dit regnskab eller din elmåler, og se dine posteringer blive til et klimaregnskab. Ingen CSV-eksport, ingen konsulent.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// e-conomic
// ---------------------------------------------------------------------------

export const IN_ECONOMIC: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration",
    title: "Forbind e-conomic — dine posteringer bliver til klimaregnskab",
    subtitle:
      "Tilslut e-conomic med to tokens, og qlim8 henter dine bookede fakturaer og din kontoplan. Hver postering kategoriseres automatisk til en emissions-kategori, så du ikke sidder og mapper konti i hånden.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Regnskabet du allerede fører er 90 % af et klimaregnskab",
    body:
      "e-conomic er et af Danmarks mest udbredte regnskabssystemer, og dine bogførte udgifter fortæller allerede det meste af historien om dit CO₂e-aftryk — de ligger bare som kroner, ikke som emissioner. qlim8 forbinder via dobbelt-token-auth (appSecretToken plus agreementGrantToken), henter dine bookede fakturaer og din kontoplan, og oversætter tallene til spend-baserede emissioner. De mest brugte standardkonti er forudfyldt med en emissions-kategori — fx gas, el og flyrejser — så du kun mapper det, der er specifikt for din virksomhed. For revisorer betyder det, at endnu et dansk regnskabssystem er dækket, uanset hvad klienten kører.",
    bullets: [
      "Dobbelt-token-auth — ingen password sendt i en e-mail.",
      "Forudfyldt konto-mapping for de mest brugte standardkonti.",
      "Bookede fakturaer trækkes ind; kladder ignoreres, så tallene er stabile.",
    ],
  },
  painPoints: [
    {
      pain:
        "Du eksporterer bogføringen til CSV hver måned og uploader den til en ESG-platform, der ikke forstår dine konti.",
      solution:
        "qlim8 forbinder direkte til e-conomic og henter bookede fakturaer automatisk — ingen eksport, ingen upload.",
      outcome:
        "Sparet manuel eksport og indtastning: anslået 30-60 minutter pr. måned [antagelse: pilot-tal, ikke bredt kundevalideret].",
    },
    {
      pain:
        "At oversætte hundredvis af konteringslinjer til emissions-kategorier i hånden er både langsomt og fejlbehæftet.",
      solution:
        "Vi leverer et default-mapping for de mest brugte danske standardkonti; du overstyrer kun de tenant-specifikke konti.",
      outcome:
        "Fra manuel mapping af alle konti til en håndfuld overrides — anslået 70-80 % dækket fra start [antagelse: baseret på standardkontoplan, ikke bredt kundevalideret].",
    },
    {
      pain:
        "Under revision skal du kunne vise, hvor hvert tal kommer fra — men et regneark har ingen kildehenvisning.",
      solution:
        "Hver aktivitet peger tilbage på sin e-conomic-datakilde, og forbindelses- og mapping-ændringer logges automatisk i audit-loggen.",
      outcome:
        "Audit-spor uden ekstra arbejde — ingen \"hvor kom det tal fra?\"-runder med revisor.",
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
        "Adgang gives via appSecretToken plus et agreementGrantToken, du selv udsteder i e-conomic. Tokens gemmes krypteret pr. virksomhed — ingen delte passwords.",
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
          "Udsted et agreementGrantToken i e-conomic og indsæt det i qlim8. Vi validerer forbindelsen og henter dit firmanavn med det samme.",
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
          "Tallene lander i dit klimaregnskab, klar til VSME- eller CSRD-rapportering — uden et eneste regneark.",
      },
    ],
  },
  valueStats: [
    { value: "5-15 min", label: "til at tilslutte", note: "[antagelse: interne opsætningsmålinger]" },
    { value: "30-60 min/md", label: "sparet manuel eksport", note: "[antagelse: pilot-tal]" },
    { value: "70-80 %", label: "konti mappet fra start", note: "[antagelse: standardkontoplan]" },
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
        a: "Regnskabsintegrationerne er med fra Starter, der starter fra 250 kr/md. Premium (625 kr/md) tilføjer flere integrationer og funktioner. Se /priser for detaljer.",
      },
    ],
  },
  closingCta: {
    title: "Lad e-conomic føre klimaregnskabet med",
    description:
      "Opret en gratis konto, tilslut e-conomic, og se dine bookede fakturaer blive til CO₂e-emissioner automatisk.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// Dinero
// ---------------------------------------------------------------------------

export const IN_DINERO: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration",
    title: "Forbind Dinero med ét login — klimaregnskabet henter sig selv",
    subtitle:
      "Tilslut Dinero via Visma Connect (OAuth), og qlim8 læser 12 måneders historik ved første forbindelse. Derefter holder en daglig sync dit klimaregnskab opdateret — du gør ingenting.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Bygget til den mindre virksomhed, der bruger Dinero",
    body:
      "Dinero er det danske regnskabssystem for mange små virksomheder — og det betyder, at du allerede har grundlaget for et klimaregnskab liggende. qlim8 forbinder via Visma Connect OAuth, så du logger ind ét sted i stedet for at kopiere API-nøgler rundt. Ved første forbindelse trækker vi 12 måneders indkøbsfakturaer og bogføringsposteringer ind og udleder CO₂e-emissioner. Derefter kører en daglig sync, så nye fakturaer lander af sig selv. Fordi det er OAuth, kan du altid trække adgangen tilbage hos Dinero, og hver synkronisering skrives i audit-loggen. Ingen CSV-eksport, ingen kopierede passwords, intet IT-projekt.",
    bullets: [
      "OAuth via Visma Connect — ét login, ingen nøgler at kopiere.",
      "12 måneders historik hentes ved første forbindelse.",
      "Daglig automatisk sync herefter — nye fakturaer kommer ind af sig selv.",
    ],
  },
  painPoints: [
    {
      pain:
        "Hver måned eksporterer du fra Dinero til CSV, uploader og mapper kategorier manuelt til en ESG-platform.",
      solution:
        "qlim8 forbinder direkte til Dinero via OAuth og trækker indkøbsfakturaer og posteringer ind automatisk, med daglig sync.",
      outcome:
        "Sparet manuelt arbejde: anslået 2-4 timer pr. måned pr. virksomhed [antagelse: interne målinger, ikke bredt kundevalideret].",
    },
    {
      pain:
        "Manuel indtastning af tal skaber taste-fejl, der forplanter sig hele vejen ind i ESG-rapporten.",
      solution:
        "Tallene læses direkte fra Dinero uden mellemled, så der ikke opstår indtastningsfejl undervejs.",
      outcome:
        "Færre fejl at rette senere — reduceret risiko for at en tastefejl ender som en forkert emissionslinje.",
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
      title: "Indkøb til Scope 3",
      body:
        "Vi henter indkøbsfakturaer — de udgifter, der er relevante for dine Scope 3-emissioner — og udleder CO₂e-aftryk fra dem automatisk.",
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
          "Dine tal ligger klar i klimaregnskabet til VSME- eller CSRD-rapportering — opdateret dagligt, uden manuelt arbejde.",
      },
    ],
  },
  valueStats: [
    { value: "5-15 min", label: "til at tilslutte", note: "[antagelse: interne opsætningsmålinger]" },
    { value: "12 mdr", label: "historik ved første sync" },
    { value: "2-4 timer/md", label: "sparet manuelt arbejde", note: "[antagelse: interne målinger]" },
    { value: "Dagligt", label: "automatisk sync" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Dinero-integrationen",
    items: [
      {
        q: "Hvordan tilslutter jeg Dinero til qlim8?",
        a: "Du klikker \"Tilslut Dinero\", logger ind via Visma Connect (OAuth) og vælger din organisation. Der er ingen API-nøgle at kopiere — adgangen gives med login og kan trækkes tilbage i Dinero når som helst.",
      },
      {
        q: "Hvor langt tilbage henter I data?",
        a: "Ved første forbindelse trækker vi 12 måneders indkøbsfakturaer og bogføringsposteringer ind. Derefter holder en daglig sync klimaregnskabet opdateret med nye fakturaer.",
      },
      {
        q: "Dækker integrationen også Visma eAccounting?",
        a: "Ja. Visma eAccounting kører på samme API-overflade og er dækket af Dinero-integrationen — der er ikke en separat Visma-integration. Enkelte felter kan afvige, men flowet er det samme.",
      },
      {
        q: "Henter I mine salgsfakturaer?",
        a: "Nej, vi henter indkøbsfakturaer, fordi det er dine udgifter, der driver Scope 3-emissionerne. Salgsfakturaer trækkes ikke ind.",
      },
      {
        q: "Er det sikkert at give qlim8 adgang?",
        a: "Adgangen er OAuth 2.0 via Visma Connect og ISV-godkendt hos Visma. Der deles ingen passwords, du kan tilbagekalde adgangen hos kilden, og hver sync føres i audit-loggen.",
      },
      {
        q: "Hvad koster Dinero-integrationen?",
        a: "Den er inkluderet fra Starter, der starter fra 250 kr/md. Premium koster 625 kr/md og tilføjer flere integrationer og funktioner. Se /priser.",
      },
    ],
  },
  closingCta: {
    title: "Tilslut Dinero og få 12 måneders klimaregnskab i dag",
    description:
      "Opret en gratis konto, log ind med Visma Connect, og se din bogføring blive til et klimaregnskab. Daglig sync derefter — du gør ingenting.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// Billy by Shine
// ---------------------------------------------------------------------------

export const IN_BILLY: MarketingPageCopy = {
  hero: {
    eyebrow: "Regnskabsintegration",
    title: "Forbind Billy — regnskabsdata bliver til klimaregnskab",
    subtitle:
      "Tilslut Billy med en adgangsnøgle, du selv opretter, og qlim8 henter dine leverandørfakturaer ind som grundlag for spend-baserede emissioner. Hvert bilagsnummer følger med, så tallene kan spores tilbage.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Bygget til freelancere og enkeltmandsfirmaer på Billy",
    body:
      "Billy by Shine er populært blandt freelancere og mindre virksomheder — og hvis du fører dit regnskab der, har du allerede grundlaget for et klimaregnskab. Billy bruger ikke OAuth; i stedet opretter du selv en adgangsnøgle i Billy under Indstillinger og Adgangsnøgler og indsætter den i qlim8. Vi validerer nøglen, henter dine godkendte leverandørfakturaer og gemmer bilagsnummeret på hver postering. Nøglen gemmes krypteret pr. virksomhed. Bilagsnummeret vises både i posteringsoversigten og i revisions-panelet, så et emissionstal altid kan spores tilbage til den oprindelige faktura i Billy. Ingen Excel-upload, ingen manuel indtastning af udgifter.",
    bullets: [
      "Egen adgangsnøgle fra Billy — krypteret pr. virksomhed, ingen passwords delt.",
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
        "Fra manuel Excel-opbygning til et klimaregnskab, der fylder sig selv — sparet indtastning pr. måned [antagelse: ikke bredt kundevalideret].",
    },
    {
      pain:
        "Under revision skal du kunne pege på, hvilken faktura et tal stammer fra — men et regneark mister sporet.",
      solution:
        "Vi gemmer bilagsnummeret (voucherNo / suppliersInvoiceNo) på hver postering og viser det i posteringsoversigt og revisions-panel.",
      outcome:
        "Hvert emissionstal kan spores tilbage til den oprindelige faktura i Billy — ingen \"hvor kom det fra?\"-runder.",
    },
    {
      pain:
        "Du vil ikke sende dit Billy-password til en tredjepart for at få dem til at hente data.",
      solution:
        "Du opretter selv en adgangsnøgle i Billy og kan tilbagekalde den når som helst. qlim8 gemmer den krypteret pr. virksomhed.",
      outcome:
        "Fuld kontrol over adgangen — ingen delte passwords, revoke sker hos dig.",
    },
    {
      pain:
        "Kladder og annullerede fakturaer roder tallene til, hvis alt trækkes med.",
      solution:
        "Vi henter kun godkendte (approved) leverandørfakturaer, så dit klimaregnskab hviler på faktisk bogførte udgifter.",
      outcome:
        "Rene tal uden støj fra kladder — stabile totaler du kan stå inde for.",
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
          "Tallene ligger klar i klimaregnskabet til VSME-rapportering — uden Excel-upload og uden manuel indtastning.",
      },
    ],
  },
  valueStats: [
    { value: "5-15 min", label: "til at tilslutte", note: "[antagelse: interne opsætningsmålinger]" },
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
        a: "Den er med fra Starter, der starter fra 250 kr/md. Premium (625 kr/md) tilføjer flere integrationer og funktioner. Se /priser for detaljer.",
      },
    ],
  },
  closingCta: {
    title: "Lad Billy fylde dit klimaregnskab",
    description:
      "Opret en gratis konto, tilslut Billy med din egen adgangsnøgle, og se dine leverandørfakturaer blive til CO₂e-emissioner — sporbare helt tilbage til bilaget.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
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
      "Vi arbejder på at forbinde Appelsin, så dit regnskab derfra kan blive til et klimaregnskab automatisk — med samme flow som Dinero, e-conomic og Billy. Den er endnu ikke live.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Bruger du Appelsin? Så er du snart dækket",
    body:
      "Appelsin-integrationen er under udvikling og endnu ikke tilgængelig i qlim8. Planen er den samme som for vores øvrige regnskabsintegrationer: du forbinder dit Appelsin-regnskab, vi henter dine bogførte udgifter, og posteringerne kategoriseres automatisk til CO₂e-emissioner — uden CSV-eksport og uden manuel indtastning. Vi melder detaljerne ud, når integrationen er klar. Har du allerede Dinero, e-conomic eller Billy, kan du komme i gang i dag; er Appelsin dit eneste system, kan du bruge Excel-upload som midlertidig løsning, indtil den native integration er live.",
    bullets: [
      "Status: under udvikling — ikke live endnu [antagelse: roadmap, ingen fast lanceringsdato meldt].",
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
        "Du kan starte i dag med Excel-upload og skifte til den native Appelsin-integration, så snart den er klar — uden at miste dine data.",
      outcome:
        "Ingen ventetid for at komme i gang med dit klimaregnskab.",
    },
  ],
  features: [
    {
      title: "Automatisk import (planlagt)",
      body:
        "Målet er, at dine bogførte udgifter fra Appelsin hentes automatisk, så du slipper for CSV-eksport og manuel indtastning — på linje med Dinero, e-conomic og Billy.",
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
          "Tallene lander i klimaregnskabet, klar til VSME- eller CSRD-rapportering.",
      },
    ],
  },
  valueStats: [
    { value: "Kommer snart", label: "Appelsin-integration", note: "[antagelse: under udvikling]" },
    { value: "3", label: "regnskabssystemer live i dag" },
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
        a: "Den er under udvikling, og vi har ikke meldt en fast lanceringsdato ud [antagelse: roadmap, ingen offentlig dato]. Vi opdaterer, så snart der er nyt. Skriv til os via /kontakt, hvis du vil have besked, når den lander.",
      },
      {
        q: "Kommer Appelsin til at fungere som Dinero-integrationen?",
        a: "Det er planen. Målet er samme automatiske flow: forbind, hent bogførte udgifter, og få dem kategoriseret til emissioner automatisk. De endelige detaljer meldes ud ved lancering.",
      },
      {
        q: "Hvordan kommer jeg i gang, mens jeg venter?",
        a: "Du kan oprette en gratis konto og bruge Excel-upload til at få et klimaregnskab allerede nu. Når Appelsin-integrationen er live, kan du skifte til den uden at miste dine data.",
      },
      {
        q: "Hvad koster det, når integrationen kommer?",
        a: "Regnskabsintegrationer er en del af abonnementet fra Starter (fra 250 kr/md); Premium koster 625 kr/md. Den endelige placering for Appelsin meldes ud ved lancering. Se /priser.",
      },
    ],
  },
  closingCta: {
    title: "Kom i gang nu — skift til Appelsin-integrationen, når den lander",
    description:
      "Opret en gratis konto og start med Excel-upload eller en af vores live regnskabsintegrationer. Vi giver besked, når Appelsin er klar.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// Eloverblik
// ---------------------------------------------------------------------------

export const IN_ELOVERBLIK: MarketingPageCopy = {
  hero: {
    eyebrow: "Energiintegration",
    title: "Hent dit faktiske elforbrug automatisk — præcise Scope 2-tal",
    subtitle:
      "qlim8 henter time-baseret elforbrug fra Eloverblik (Energinet) og ganger det med Energinets CO₂-faktor. Dine Scope 2-tal bliver målte i stedet for gættede — uden at fotografere en eneste elregning.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Målt elforbrug slår et årsgennemsnit hver gang",
    body:
      "Eloverblik er Energinets data-hub for danske virksomheders elforbrug. I stedet for at taste kWh fra elregninger giver du qlim8 adgang via en fuldmagt på eloverblik.dk, og vi henter dit time-baserede forbrug automatisk. Hver time ganges med Energinets CO₂-faktor, så dine Scope 2-emissioner bygger på faktisk målt forbrug frem for et årsgennemsnit. For en virksomhed med flere målepunkter betyder det sikker, fuld dækning — ingen glemte regninger og ingen manuelle skøn. Har Eloverblik leveret data for en måned, er den måling autoritativ; måneder uden data falder automatisk tilbage på el fra fakturaer, så du aldrig hverken dobbelttæller eller mangler forbrug.",
    bullets: [
      "Time-baseret, faktisk forbrug — ikke et årligt gennemsnitsskøn.",
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
        "Sparet manuel el-indtastning: anslået 1-2 timer pr. måned samlet [antagelse: interne målinger, ikke bredt kundevalideret].",
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
        "Har Eloverblik data for en måned, er den måling autoritativ, og el fra fakturaer for den måned frasorteres automatisk — synligt markeret i posteringsoversigten.",
      outcome:
        "Ingen dobbelttælling; du kan se præcis, hvilke faktura-linjer der er frasorteret og hvorfor.",
    },
    {
      pain:
        "En glemt elregning efterlader et hul i klimaregnskabet, som du først opdager under revision.",
      solution:
        "Fuldt time-dækket forbrug hentes automatisk for dine tildelte målepunkter, og måneder uden data falder tilbage på faktura-el.",
      outcome:
        "Fuld dækning uden huller — ingen glemte regninger.",
    },
    {
      pain:
        "En fuldmagt udløber, og pludselig stopper dine el-tal uden at du opdager det.",
      solution:
        "qlim8 mailer dine admins før og efter udløb på en fast kadence og markerer datakilden, så du kan forny i tide.",
      outcome:
        "Ingen tavse huller når en fuldmagt udløber — du får besked og kan forny med et klik.",
    },
  ],
  features: [
    {
      title: "Time-baseret forbrug",
      body:
        "Vi henter dit elforbrug pr. time pr. målepunkt fra Eloverblik. Det giver præcise Scope 2-tal og lægger grunden til senere features som fordeling af ladestander-forbrug.",
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
          "Giv qlim8 fuldmagt på eloverblik.dk og indsæt din customerKey i qlim8. Vi finder din adgang via Eloverbliks authorization-opslag.",
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
          "Præcist elforbrug står klar i klimaregnskabet til VSME- eller CSRD-rapportering — uden en eneste manuel kWh.",
      },
    ],
  },
  valueStats: [
    { value: "Time-data", label: "faktisk elforbrug" },
    { value: "1-2 timer/md", label: "sparet indtastning", note: "[antagelse: interne målinger]" },
    { value: "Scope 2", label: "målt, ikke gættet" },
    { value: "0", label: "elregninger at taste" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Eloverblik-integrationen",
    items: [
      {
        q: "Hvordan giver jeg qlim8 adgang til mit elforbrug?",
        a: "Du giver qlim8 en fuldmagt på eloverblik.dk-portalen og indsætter din customerKey i qlim8. Vi finder adgangen via Eloverbliks authorization-opslag og henter derefter dit forbrug automatisk. Det kræver, at din virksomhed har en aftaleforbinder på sin CVR-profil på eloverblik.dk.",
      },
      {
        q: "Hvor præcise bliver mine Scope 2-tal?",
        a: "Meget mere præcise end et årsgennemsnit. Vi henter dit forbrug pr. time og ganger det med Energinets CO₂-faktor, så emissionerne følger den faktiske variation i elnettet frem for et fast årstal.",
      },
      {
        q: "Tæller I både min elregning og målerdata med?",
        a: "Nej. For enhver måned, hvor Eloverblik har leveret forbrugsdata, er målingen autoritativ, og el fra fakturaer for den måned frasorteres automatisk — uanset kilde. De rå faktura-linjer bevares og markeres \"Frasorteret pga. Eloverblik\", så du kan se hvorfor. Måneder uden Eloverblik-data falder tilbage på faktura-el.",
      },
      {
        q: "Hvad hvis en lokation ikke er dækket af Eloverblik?",
        a: "El, som Eloverblik ikke dækker — fx en lokation uden for dine tildelte målepunkter — kan du tilføje via AI-fakturaupload for de måneder, hvor Eloverblik ingen data har. Så er dækningen fuld.",
      },
      {
        q: "Hvad sker der, når min fuldmagt udløber?",
        a: "qlim8 mailer dine admins før og efter udløb på en fast kadence og markerer datakilden med en udløbet-tilstand, så synkroniseringen ikke tavst stopper. Du fornyer fuldmagten på eloverblik.dk og trykker \"Tjek status\" for at genstarte.",
      },
      {
        q: "Kan I også hente gas og fjernvarme?",
        a: "Ikke endnu. I dag henter vi kun el fra Eloverblik. Gas og fjernvarme leveres også af Eloverblik, men er ikke implementeret endnu — det ligger på vores roadmap.",
      },
    ],
  },
  closingCta: {
    title: "Få målte Scope 2-tal i stedet for skøn",
    description:
      "Opret en gratis konto, giv qlim8 fuldmagt på eloverblik.dk, og se dit faktiske elforbrug blive til præcise Scope 2-emissioner.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// REST API
// ---------------------------------------------------------------------------

export const IN_REST_API: MarketingPageCopy = {
  hero: {
    eyebrow: "For udviklere",
    title: "Byg oven på qlim8 — hent emissioner og rapporter via REST",
    subtitle:
      "Et versioneret REST API under /api/v1 giver dig programmatisk adgang til posteringer, emissionsdata og rapportstatus. JSON over HTTPS, Bearer-token, cursor-paginering og webhooks til dine egne flows.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Dine klimadata, der hvor dine andre systemer er",
    body:
      "Nogle gange skal tallene ikke bare stå i qlim8 — de skal ind i dit BI-værktøj, din datawarehouse eller et internt dashboard. Med qlim8's REST API henter du scope 1-3-data, leverandørrapporter og hele VSME-eksporter programmatisk under en versioneret /api/v1-overflade. Det er JSON over HTTPS med Bearer-token-auth, cursor-paginering og en fuld OpenAPI 3.1-spec, så din klient kan genereres automatisk. API-nøgler kan begrænses til specifikke scopes — fx emissions:read eller reports:generate — og alle mutating-calls skrives i audit-loggen. Med webhooks kan du abonnere på hændelser, så dine systemer reagerer, når data ændrer sig, i stedet for at polle. Se den fulde oversigt af REST og MCP på /api.",
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
        "Ingen manuel eksport-runde — data flyder direkte ind i jeres eksisterende dashboards.",
    },
    {
      pain:
        "Du poller efter nye tal eller genererede rapporter og ved aldrig helt, hvornår noget er klart.",
      solution:
        "Abonnér på webhooks, så qlim8 giver dine systemer besked, når en rapport er genereret eller data ændrer sig.",
      outcome:
        "Event-drevne flows i stedet for konstant polling — mindre kode og hurtigere reaktion.",
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
        "Fra manuel kald-kodning til genereret klient — hurtigere og med færre fejl.",
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
          "Generér en Bearer-nøgle og vælg de scopes, integrationen skal bruge — fx emissions:read eller reports:generate.",
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
        a: "Ja. Med webhooks kan du abonnere på hændelser, så qlim8 kalder dine systemer, når fx en rapport er genereret eller data ændres — event-drevet i stedet for polling. Leverancer kan følges, så du ser, om et event kom frem.",
      },
      {
        q: "Bruger REST og MCP de samme nøgler?",
        a: "Ja. MCP-serveren og REST-API'et deler samme Bearer-nøgler og scope-model, så en nøgle, der virker mod /api/v1, også kan drive MCP-tools. Se MCP-siden for AI-assistenter og /api for det fulde billede.",
      },
      {
        q: "Hvem har adgang til API'et?",
        a: "Programmatisk adgang er rettet mod større kunder, BI-værktøjer og custom-flows. Skriv til os via /kontakt eller kontakt@qlim8.com om adgang, scopes og Enterprise-features.",
      },
    ],
  },
  closingCta: {
    title: "Byg dine klimadata ind i dine egne systemer",
    description:
      "Opret en konto, generér en scope-begrænset API-nøgle, og hent scope 1-3-data programmatisk. Se den fulde reference på /docs/api-reference og oversigten på /api.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};

// ---------------------------------------------------------------------------
// MCP server
// ---------------------------------------------------------------------------

export const IN_MCP: MarketingPageCopy = {
  hero: {
    eyebrow: "For AI-assistenter",
    title: "Spørg dit klimaregnskab i naturligt sprog via MCP",
    subtitle:
      "qlim8's MCP-server forbinder din AI-assistent — Claude, ChatGPT og andre — til dine klimadata. 31 tools lader assistenten hente emissioner, generere rapporter og planlægge reduktioner, uden at en udvikler skal bygge en integration.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Din assistent henter tallene, så du ikke skal åbne dashboardet",
    body:
      "MCP (Model Context Protocol) er en standard, der lader LLM-klienter kalde eksterne funktioner. qlim8 eksponerer en live MCP-server, så din assistent kan svare på \"Hvor stor del af vores Scope 3 kommer fra de fem største leverandører?\" direkte — uden at du åbner qlim8. Overfladen er 31 tools, 3 resources og 3 prompts. Almindelige brugere forbinder Claude eller ChatGPT via OAuth helt uden en API-nøgle at kopiere, mens udviklere tilføjer qlim8 i fx Claude Code eller Cursor med samme Bearer-nøgle som REST-API'et. Hvert tool har et påkrævet scope og en adfærds-annotering, så en klient kan se, hvad der er sikkert at køre automatisk, kontra hvad der ændrer data. Se den fulde oversigt på /api.",
    bullets: [
      "31 tools, 3 resources og 3 prompts — den fulde overflade.",
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
        "Sparet tid pr. spørgsmål, som kumulativt bliver til mange timer om ugen for et analyseteam [antagelse: interne skøn, ikke bredt kundevalideret].",
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
        "Du styrer præcis, hvad agenten må — og writes lander i en tamper-evident audit-kæde.",
    },
    {
      pain:
        "At kopiere API-nøgler rundt til hver bruger, der vil forbinde Claude eller ChatGPT, er besværligt og usikkert.",
      solution:
        "Claude og ChatGPT forbinder via OAuth 2.1 med dynamisk klient-registrering — helt uden en nøgle at kopiere.",
      outcome:
        "Ét-kliks forbindelse for almindelige brugere, uden nøgler der cirkulerer på mail.",
    },
  ],
  features: [
    {
      title: "31 tools på tværs af dit klimaregnskab",
      body:
        "Assistenten kan hente emissioner (fx get_emissions_summary, get_emissions_by_category, get_emissions_by_scope3_category), generere rapporter, oprette mål, liste leverandører og planlægge reduktioner via scenarier og tiltag.",
    },
    {
      title: "Naturligt sprog, live tal",
      body:
        "En CFO kan spørge \"Hvor stor del af vores Scope 3 kommer fra de fem største leverandører?\" og få svaret direkte fra assistenten — uden at åbne qlim8-UI'et.",
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
          "Stil et spørgsmål — assistenten vælger det rette af de 31 tools og henter live tal fra dit klimaregnskab.",
      },
      {
        title: "3. Generér og handl",
        body:
          "Bed assistenten generere en rapport, oprette et mål eller udkaste et reduktionsscenarie. Muterende tools kræver det rette scope.",
      },
      {
        title: "4. Færdig rapport",
        body:
          "Resultatet lander i qlim8, klar til VSME- eller CSRD-rapportering, med hvert write sporet i audit-loggen.",
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
        a: "Det er en live server, der taler Model Context Protocol, så LLM-klienter som Claude, ChatGPT og egne agenter kan kalde qlim8-funktioner programmatisk — hente emissioner, generere rapporter, oprette mål, liste leverandører og planlægge reduktioner. Overfladen er 31 tools, 3 resources og 3 prompts. Se /api.",
      },
      {
        q: "Hvordan forbinder jeg Claude eller ChatGPT?",
        a: "Almindelige brugere forbinder Claude og ChatGPT via OAuth 2.1 med dynamisk klient-registrering — helt uden en API-nøgle at kopiere. Consent gives af en tenant-admin og er read-only som default. Trin-for-trin ligger i /docs/mcp-quickstart.",
      },
      {
        q: "Kan jeg bruge den fra Claude Code eller Cursor?",
        a: "Ja. Udviklere tilføjer qlim8 i Claude Code, Cursor og egne JSON-RPC-klienter med samme Bearer-nøgle som REST-API'et. Du peger klienten på /api/mcp med din nøgle, og agenten har adgang til alle tools.",
      },
      {
        q: "Hvilke tools findes der?",
        a: "De 31 tools spænder fra emissions-opslag (get_emissions_summary, get_emissions_by_category, get_emissions_by_scope3_category), aktiviteter og rapporter til leverandører, mål, emissionsfaktorer, scenarier og tiltag, PCF-records, afdelinger og webhooks. Den fulde liste med scopes står i /docs/mcp-tools.",
      },
      {
        q: "Er det sikkert at lade en agent ændre data?",
        a: "Hvert tool bærer en adfærds-annotering (read-only kontra muterende) og kræver et scope, så en klient kan auto-køre sikre opslag men bede om bekræftelse før noget ændres. OAuth er read-only som default, og alle writes skrives i en tamper-evident audit-kæde med markeringen \"via mcp\".",
      },
      {
        q: "Kræver MCP en bestemt plan?",
        a: "Grundlæggende adgang deler nøgle- og scope-model med REST-API'et. Enkelte tools er tier-gated — fx leverandør- og værdikæde-tools kræver Enterprise, og scenarie-tools kræver scenarie-funktionen. Skriv til os via /kontakt om Enterprise-adgang.",
      },
    ],
  },
  closingCta: {
    title: "Lad din assistent svare på dine klimaspørgsmål",
    description:
      "Opret en konto og forbind Claude eller ChatGPT via OAuth — eller tilføj qlim8 i Claude Code med en Bearer-nøgle. Start med /docs/mcp-quickstart og se alle tools i /docs/mcp-tools.",
    primary: PRIMARY_CTA,
    secondary: DEMO_CTA,
  },
};
