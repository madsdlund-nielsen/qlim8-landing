// /events/dma: the double materiality screening (dobbelt væsentlighedsanalyse)
// handed out at events. Ten ESRS topics, two questions each (impact and
// financial), a live matrix and a profile with a link onward per topic. The
// copy came from the design prototype "Dobbelt væsentlighedsanalyse V1.5".
//
// Bundled only: the page has no CMS key, so this file is the live text. The
// links go to live pages (scripts/lib/redirects.test.mjs keeps them so), and a
// feature is never tied to a package here, since /priser shows that from the API.

/** Google Calendar booking: 30 minutes with the founder. */
export const DMA_BOOKING_URL = "https://calendar.app.google/phvE1cuTy9q58kkj8";

/** A topic is material when either score is at least this. */
export const DMA_THRESHOLD = 3;

export type DmaGroup = "Miljø" | "Mennesker" | "Ledelse";

export interface DmaTopic {
  code: string;
  group: DmaGroup;
  name: string;
  desc: string;
  /** The impact question. */
  qi: string;
  /** The financial question. */
  qf: string;
  info: { what: string; help: string; links: { label: string; href: string }[] };
}

export const DMA_TOPICS: DmaTopic[] = [
  {
    code: "E1",
    group: "Miljø",
    name: "Klimaændringer",
    desc: "Udledning af drivhusgasser, energi og tilpasning til klimaet.",
    qi: "Hvor meget belaster din drift og værdikæde klimaet gennem udledninger?",
    qf: "Hvor meget kan klimaregler, energipriser og kundekrav ramme din økonomi?",
    info: {
      what: "Klima handler om dine udledninger af drivhusgasser (scope 1, 2 og 3), dit energiforbrug og din tilpasning til et ændret klima.",
      help: "Når du forbinder dit regnskabssystem, bliver posteringer til klimaregnskab automatisk, og de detaljerede scope 3 udledninger beregnes for dig.",
      links: [
        { label: "Læs guiden til scope 3", href: "/blog/scope-3-smv-guide" },
        { label: "Se pakkerne", href: "/priser" },
      ],
    },
  },
  {
    code: "E2",
    group: "Miljø",
    name: "Forurening",
    desc: "Udledning af stoffer til luft, vand og jord.",
    qi: "Hvor meget forurener dine aktiviteter luft, vand eller jord?",
    qf: "Hvor meget kan miljøkrav, påbud eller oprydning koste dig?",
    info: {
      what: "Forurening handler om udledning af stoffer til luft, vand og jord, for eksempel fra produktion, kølemidler og kemikalier.",
      help: "Det frivillige VSME-format, som banker og kunder kender, har et punkt om forurening. Du kan se, hvordan qlim8 samler VSME-rapporten.",
      links: [
        { label: "Se VSME-rapporten", href: "/produkt/vsme-rapport" },
        { label: "Læs om VSME-modulerne", href: "/blog/vsme-basis-vs-comprehensive" },
      ],
    },
  },
  {
    code: "E3",
    group: "Miljø",
    name: "Vand og havressourcer",
    desc: "Vandforbrug og påvirkning af vandmiljøet.",
    qi: "Hvor meget vand bruger eller belaster du, især hvor der er vandmangel?",
    qf: "Hvor afhængig er du af vand, og hvad koster det, hvis forsyningen svigter?",
    info: {
      what: "Vand handler om, hvor meget vand du bruger og udleder, og om du ligger i et område med vandmangel.",
      help: "Det frivillige VSME-format har et punkt om vand, så du kan nøjes med at oplyse det, der er relevant for dig.",
      links: [
        { label: "Se VSME-rapporten", href: "/produkt/vsme-rapport" },
        { label: "Læs om VSME-modulerne", href: "/blog/vsme-basis-vs-comprehensive" },
      ],
    },
  },
  {
    code: "E4",
    group: "Miljø",
    name: "Biodiversitet og økosystemer",
    desc: "Natur, arealer og dyreliv.",
    qi: "Hvor meget presser dine aktiviteter natur, arealer og dyreliv?",
    qf: "Hvor meget afhænger din drift af natur, for eksempel råvarer og tilladelser?",
    info: {
      what: "Biodiversitet handler om, hvordan dine aktiviteter og råvarer påvirker natur, arealer og dyreliv, og hvor meget din drift afhænger af naturen.",
      help: "Det frivillige VSME-format har et punkt om biodiversitet. Det er en rolig måde at oplyse det på, hvis banken eller en kunde spørger.",
      links: [
        { label: "Se VSME-rapporten", href: "/produkt/vsme-rapport" },
        { label: "Læs om VSME-modulerne", href: "/blog/vsme-basis-vs-comprehensive" },
      ],
    },
  },
  {
    code: "E5",
    group: "Miljø",
    name: "Ressourcer og cirkulær økonomi",
    desc: "Materialeforbrug, affald og genbrug.",
    qi: "Hvor store mængder materialer bruger du, og hvor meget ender som affald?",
    qf: "Hvor følsom er du over for priser og knaphed på råvarer?",
    info: {
      what: "Ressourcer og cirkulær økonomi handler om materialer, affald og genbrug.",
      help: "Opret og følg konkrete tiltag, og se effekten på dit klimaregnskab, så du kan vise, at du bruger færre ressourcer.",
      links: [
        { label: "Se mål og tiltag", href: "/produkt/reduktionsmaal-og-scenarier" },
        { label: "Læs om VSME-modulerne", href: "/blog/vsme-basis-vs-comprehensive" },
      ],
    },
  },
  {
    code: "S1",
    group: "Mennesker",
    name: "Egen arbejdsstyrke",
    desc: "Sikkerhed, trivsel, løn og vilkår for medarbejderne.",
    qi: "Hvor store er risiciene for dine medarbejderes sikkerhed, trivsel og vilkår?",
    qf: "Hvor meget påvirker fravær, rekruttering og fastholdelse din økonomi?",
    info: {
      what: "Egen arbejdsstyrke handler om sikkerhed, trivsel, løn og vilkår for dine medarbejdere.",
      help: "Personaleoplysninger kan trækkes automatisk, så du slipper for at samle tallene i hånden.",
      links: [{ label: "Se pakkerne", href: "/priser" }],
    },
  },
  {
    code: "S2",
    group: "Mennesker",
    name: "Arbejdere i værdikæden",
    desc: "Vilkår for dem, der arbejder hos dine leverandører.",
    qi: "Hvor stor er risikoen for dårlige arbejdsvilkår hos dine leverandører?",
    qf: "Hvor meget kan leverandørernes forhold ramme leverancer eller dit omdømme?",
    info: {
      what: "Arbejdere i værdikæden handler om vilkårene hos dine leverandører og deres underleverandører.",
      help: "Kortlæg dine leverandører via CVR, og indsaml deres data med ét link. Det er et roligt første skridt til at kende kæden.",
      links: [{ label: "Se leverandørkæden", href: "/produkt/leverandoerkaede" }],
    },
  },
  {
    code: "S3",
    group: "Mennesker",
    name: "Berørte lokalsamfund",
    desc: "Naboer og lokalsamfund omkring dine aktiviteter.",
    qi: "Hvor meget påvirker dine aktiviteter naboer og lokalsamfund med støj, trafik eller miljø?",
    qf: "Hvor meget kan lokal modstand forsinke eller fordyre din drift?",
    info: {
      what: "Berørte lokalsamfund handler om, hvordan dine aktiviteter påvirker naboer og lokalsamfund med støj, trafik eller miljø.",
      help: "Du kan vise omverdenen, hvad du gør, med en offentlig profil eller din rapport.",
      links: [{ label: "Se rapportering", href: "/produkt/rapportering" }],
    },
  },
  {
    code: "S4",
    group: "Mennesker",
    name: "Kunder og slutbrugere",
    desc: "Sikkerhed, information og privatliv for dem, der bruger det, du leverer.",
    qi: "Hvor meget kan dine produkter, ydelser eller data skade kunder og brugere?",
    qf: "Hvor meget afhænger din omsætning af kundernes tillid og sikkerhed?",
    info: {
      what: "Kunder og slutbrugere handler om sikkerhed, information og privatliv for dem, der bruger det, du leverer.",
      help: "Når du fortæller om dine klimadata, skal det kunne dokumenteres. Guiden viser, hvordan du undgår greenwashing, og audit trail logger hver ændring og datakilde.",
      links: [
        { label: "Læs guiden om greenwashing", href: "/blog/undgaa-greenwashing-smv" },
        { label: "Se audit trail", href: "/produkt/audit-trail-og-revisor" },
      ],
    },
  },
  {
    code: "G1",
    group: "Ledelse",
    name: "Forretningsadfærd",
    desc: "Etik, korruption, betalingsadfærd og leverandørrelationer.",
    qi: "Hvor stor er risikoen for korruption, urimelig betalingsadfærd eller brud på etik?",
    qf: "Hvor meget kan bøder, sagsomkostninger eller tabte kunder koste dig?",
    info: {
      what: "Forretningsadfærd handler om etik, korruption, betalingsadfærd og forholdet til dine leverandører.",
      help: "En revisor og en bank vil gerne kunne se, hvor et tal kommer fra. Hver ændring, faktor og datakilde logges automatisk, og du kan give revisor direkte adgang.",
      links: [{ label: "Se audit trail og revisoradgang", href: "/produkt/audit-trail-og-revisor" }],
    },
  },
];

export const DMA_SCALE_WORDS = ["Ingen", "Lav", "Middel", "Høj", "Meget høj"];

export type DmaZone = "both" | "imp" | "fin" | "none";

export const DMA_ZONE_LABEL: Record<DmaZone, string> = {
  both: "Dobbelt væsentligt",
  imp: "Væsentligt for påvirkning",
  fin: "Væsentligt for økonomi",
  none: "Ikke væsentligt lige nu",
};

export const DMA_COPY = {
  hero: {
    title: "Se hvad der er væsentligt for din virksomhed",
    lead: "Du behøver ikke kende reglerne på forhånd. Svar på to korte spørgsmål om ti emner, og se dit billede tage form undervejs.",
    start: "Start din egen analyse, helt uden binding",
    book: "Tag en uformel snak (Book 30 min)",
    trust: ["Ingen binding", "Tager 3 minutter", "Vi hjælper dig videre"],
    steps: [
      { title: "Besvar ti emner i ro og mag", body: "To spørgsmål pr. emne: hvad din virksomhed betyder for verden, og hvad emnet betyder for din økonomi." },
      { title: "Se dit billede tage form", body: "Hvert emne lander i oversigten ved siden af, så du kan se, hvad der fylder mest." },
      { title: "Vi hjælper dig trygt videre", body: "Du får et første overblik og kan tage en uformel snak med os om næste skridt." },
    ],
  },
  analysis: {
    title: "Din væsentlighedsanalyse",
    lead: "Dobbelt væsentlighed betyder, at du ser på to ting: hvordan din virksomhed påvirker mennesker og miljø, og hvordan emner uden for din virksomhed kan påvirke din økonomi.",
  },
  contact: {
    title: "Vil du have en uforpligtende snak?",
    body: "Jeg gennemgår gerne dit billede sammen med dig og svarer på det, du er i tvivl om.",
    personName: "Mads",
    personRole: "grundlægger af qlim8",
    book: "Book en uformel gennemgang (30 min)",
  },
  closing: {
    primary: { label: "Kom gratis i gang, helt uden binding", href: "/priser" },
    secondary: { label: "Vi hjælper dig videre", href: "/kontakt" },
    trust: ["Ingen binding"],
  },
  disclaimer:
    "Det her er en første screening og ikke en juridisk vurdering. Du svarer på en skala fra 1 til 5, og et emne er væsentligt, når mindst én af de to scorer er 3 eller højere. Dine svar bliver i din browser, medmindre du selv beder om at få din profil tilsendt.",
};
