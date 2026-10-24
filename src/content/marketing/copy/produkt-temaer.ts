// Bundled default copy for the six theme pages under /produkt and the hub's
// own copy. CMS pageKeys: page.produkt and page.produkt.<slug>. Transcribed
// word for word from the copywriter's files; the node metadata (title, SEO,
// related) is in ../produkt.ts. The block order of each page is the node's
// sectionOrder there.
//
// A blank line inside a text ("\n\n") is a paragraph break (see paragraphs() in
// src/lib/paragraphs.ts). A sentence in double square brackets with a pris token is a
// price the packages API fills in, and disappears when no price is known.

import { DEMO_HREF } from "@/content/cta";
import type { MarketingHubCopy, MarketingPageCopy } from "../types";

const PRISER = "/priser";

export const PRODUKT_HUB_COPY: MarketingHubCopy = {
  hero: {
    eyebrow: "Produkt",
    title: "Én platform fra faktura til færdig rapport",
    subtitle: "qlim8 samler dit klimaregnskab, dine rapporter og dine reduktionsmål ét sted, bygget oven på den bogføring, du allerede har. Du tager det i dit eget tempo.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Tag en uformel snak (Book 15 min)",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "Virksomhedsejer ved et lyst skrivebord med kaffekop og bærbar",
    trustLine: [
      "Ingen binding",
      "Oprettelse tager et par minutter",
      "Vi hjælper dig i gang",
    ],
  },
  intro: {
    heading: "Ét datagrundlag, mange svar",
    body: "Det hele starter i din bogføring. qlim8 forbindes med e-conomic, Dinero eller Billy og Eloverblik, sorterer fakturalinjerne automatisk, når systemet er sikkert nok, og lægger resten til gennemsyn.\n\nFra det samme grundlag får du overblik, rapporter, VSME-rapporten, revisionsspor, reduktionsmål og en måde at samle dine leverandørers klimarapporter på. Hvad pakkerne indeholder, ser du på prissiden.",
  },
  cardsHeading: "Udforsk platformen",
  cardsSubheading: "Seks områder og ét datagrundlag, fra overblik til færdig rapport.",
  differentiators: [
    {
      title: "Bygget oven på det, du har",
      body: "Du starter med dine egne bilag og dit elforbrug. Andre regnskabsprogrammer kan indlæses som CSV, og der er et REST API.",
    },
    {
      title: "Hvert tal kan spores",
      body: "Hver udledningslinje har sit eget ID. Skifter en linje kategori, gemmes hvem der gjorde det, hvornår, og hvad der stod før.",
    },
    {
      title: "Mere end en årsrapport",
      body: "Sæt reduktionsmål på dine egne tal, følg dem år for år, og planlæg dine egne tiltag, før du beslutter dig.",
    },
  ],
  trust: {
    title: "Bygget til at blive tjekket",
    items: [
      {
        icon: "ShieldCheck",
        title: "Et spor, der ikke kan rettes i",
        body: "Revisionssporet kan ikke redigeres eller slettes i programmet. Personoplysninger kan dog slettes efter en GDPR-anmodning.",
      },
      {
        icon: "Users",
        title: "Faste roller",
        body: "Kolleger får rollen administrator, redigerer eller læser. Din revisor kan se tal og bilag, men ikke ændre dem.",
      },
      {
        icon: "Lock",
        title: "Servere i EU",
        body: "Servere, database og fillager står i Tyskland, og al trafik går over HTTPS.",
      },
    ],
  },
  contact: {
    title: "Vil du se platformen med dine egne tal?",
    body: "Jeg viser dig gerne qlim8 med udgangspunkt i din virksomhed og siger ærligt, hvilke dele du har brug for nu, og hvilke der kan vente.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Stifter og civilingeniør i energiteknologi",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en uformel gennemgang (15 min)",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om platformen",
    items: [
      {
        q: "Hvad sker der med de fakturalinjer, qlim8 er i tvivl om?",
        a: "Fakturalinjer, qlim8 er i tvivl om, lægges til gennemsyn og tæller først med i klimaregnskabet, når du har kigget på dem. Retter du en kategori, lærer qlim8 af det, så gentagne linjer rammes bedre næste gang.",
      },
      {
        q: "Skal jeg tage hele qlim8 i brug fra start?",
        a: "Nej. Du kan starte med at forbinde regnskabsprogrammet og Eloverblik og se dit eget klimaregnskab tage form. Rapporter, reduktionsmål og leverandørkæde tager du i brug, når du får brug for dem, og hvad pakkerne indeholder, står på prissiden.",
      },
      {
        q: "Kan jeg bruge mine klimadata fra qlim8 i andre systemer?",
        a: "Ja. Excel-rapporten viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde. Der findes også et REST API med API-nøgler og en MCP-server til AI-assistenter som Claude og ChatGPT.",
      },
    ],
  },
  closingCta: {
    title: "Se hele platformen med dine egne tal",
    description: "Opret en gratis profil, og forbind dit regnskabsprogram og Eloverblik, eller book en uformel gennemgang med udgangspunkt i din virksomhed.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Tag en uformel snak (Book 15 min)",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp",
    ],
  },
};

export const PR_PLATFORM: MarketingPageCopy = {
  hero: {
    eyebrow: "Platform og overblik",
    title: "Forstå dit klimaregnskab på én skærm",
    subtitle: "qlim8 henter tallene fra din bogføring og dit elforbrug og samler dem ét sted. Du ser, hvor udledningen kommer fra, og kan altid følge et tal tilbage til bilaget.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Tag en uformel snak",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "En kvinde i en grøn striktrøje sidder ved et lyst træskrivebord med en kaffekop og kigger roligt på qlim8-dashboardet på sin bærbare, med en plante i dagslys bag sig.",
    trustLine: [
      "Ingen binding",
      "Oprettet på et par minutter",
      "Vi hjælper dig i gang",
    ],
    microLine: "Ingen kreditkort påkrævet · Personlig hjælp på +45 93 90 13 84",
  },
  integrations: {
    title: "Bygget på de programmer, du allerede bruger",
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.",
  },
  intro: {
    heading: "Et overblik, du kan stå inde for",
    body: "Når banken, en kunde eller bestyrelsen spørger til jeres CO2-tal, skal svaret ikke koste en halv dag med regneark. I qlim8 ligger klimaregnskabet klar, fordelt på Scope 1, 2 og 3.\n\nOg du kan se, hvilke indkøb, brændstoffer og målere der fylder mest, og hvad hvert tal bygger på, også uden at være ekspert i udledninger.",
  },
  trust: {
    title: "Tal, du kan forklare",
    items: [
      {
        icon: "Link2",
        title: "Bygget på din bogføring",
        body: "Tallene kommer fra de bilag og målinger, du allerede har i e-conomic, Dinero eller Billy og Eloverblik.",
      },
      {
        icon: "Eye",
        title: "Du ser, hvad tallene bygger på",
        body: "Hver post viser sin datakvalitet, så du ved, hvor regnskabet står stærkt, og hvor det kan blive bedre.",
      },
      {
        icon: "ShieldCheck",
        title: "Intet usikkert tæller i det skjulte",
        body: "Linjer, systemet er i tvivl om, lægges til gennemsyn hos dig, før de tæller med.",
      },
    ],
  },
  features: [
    {
      title: "Dashboardet",
      body: "De samlede udledninger fordelt på Scope 1, 2 og 3 og måned for måned, sammenlignet med samme periode året før.",
    },
    {
      title: "Til gennemsyn",
      body: "De linjer, der venter på dig, står samlet ét sted. Du godkender eller retter kategorien, før linjen tæller med.",
    },
    {
      title: "Kategorier og leverandører",
      body: "Se, hvilke kategorier og leverandører der fylder mest, så du ved, hvor en indsats batter.",
    },
    {
      title: "Udforskning",
      body: "Gå fra måned til kategori til den enkelte beregning, og se Scope 3 fordelt på de 15 GHG-kategorier.",
    },
    {
      title: "Dine data, også uden for qlim8",
      body: "Hent Excel-rapporten med alle linjer, eller eksportér det udvalg, du står i.",
    },
  ],
  howItWorks: {
    title: "Sådan får du overblikket",
    intro: "",
    steps: [
      {
        title: "Forbind det, du har",
        body: "Opret en gratis konto, og forbind dit regnskabsprogram og Eloverblik.",
      },
      {
        title: "Se tallene tage form",
        body: "qlim8 kategoriserer fakturalinjerne og beregner udledningen. Det usikre lægges til gennemsyn hos dig.",
      },
      {
        title: "Gå i dybden, når du vil",
        body: "Start på dashboardet, og klik dig videre, når et tal skal forklares.",
      },
    ],
  },
  table: {
    title: "Visningerne i platformen",
    intro: "",
    headers: {
      a: "Visning",
      b: "Hvad du ser",
      c: "Hvad du kan gøre",
    },
    rows: [
      {
        a: "Dashboard",
        b: "Samlede udledninger, Scope 1, 2 og 3 og datakvalitet",
        c: "Vælge periode og se, hvad der venter",
      },
      {
        a: "Til gennemsyn",
        b: "Linjer, systemet er i tvivl om",
        c: "Godkende eller rette kategorien",
      },
      {
        a: "Kategorier",
        b: "Udledningen fordelt på kategorier",
        c: "Finde de poster, der fylder mest",
      },
      {
        a: "Leverandører",
        b: "De største leverandører målt på andel af Scope 3",
        c: "Vælge, hvem du taler med først",
      },
      {
        a: "Energi",
        b: "Elforbrug pr. måned fra jeres målepunkter",
        c: "Se jeres registrerede grønne elaftaler",
      },
      {
        a: "Udforskning",
        b: "Måned, kategori og den enkelte beregning",
        c: "Eksportere udvalget til Excel",
      },
      {
        a: "Revisionsspor",
        b: "Alle beregninger på kontoen",
        c: "Følge en linje tilbage til bilaget",
      },
    ],
    note: "Hvad der er med i hver pakke, står under Priser.",
  },
  depth: {
    title: "Sådan virker platformen i detaljer",
    items: [
      {
        summary: "Dashboardet: det samlede billede",
        body: "Dashboardet viser de samlede udledninger for den periode, du vælger, fordelt på Scope 1, 2 og 3. Et diagram viser udledningen måned for måned, og tallene sammenlignes med samme periode året før. Scope 2 kan vises lokationsbaseret og markedsbaseret, og biogen CO2 vises for sig.\n\nUnder fordelingen står, hvad udledningen bygger på: leverandørens egen PCF eller EPD, målte mængder som kWh, liter og kg, eller indkøbsbeløb. Jo flere linjer der bygger på mængder, jo mere præcist er regnskabet.",
      },
      {
        summary: "Udforskning: fra måned til den enkelte linje",
        body: "Her finder du ud af, hvad der driver et tal. Du vælger et år og går fra måned til kategori til den enkelte beregning, med dato, aktivitet, mængde og datakvalitet for hver linje. Skift til GHG-kategorierne, og Scope 3 vises fordelt på de 15 kategorier.\n\nStår en linje forkert, retter du kategorien. qlim8 gemmer tidspunktet, hvem der ændrede den, og den tidligere værdi. En konsulent skal altid give en begrundelse.",
      },
      {
        summary: "Dataudtræk: tag tallene med ud",
        body: "Excel-rapporten viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde, så bogholderen kan regne efter i sit eget regneark. Fra Udforskning eksporterer du månederne, kategorierne eller de enkelte linjer til Excel.\n\nUnikke ID'er og bilagsreferencer ligger i revisionspakken. Skal tallene videre til egne systemer, er der et REST API med API-nøgler og en MCP-server til AI-assistenter som Claude og ChatGPT.",
      },
      {
        summary: "Hvor tallene kommer fra",
        body: "Faktorer for fysiske mængder kommer fra Klimakompasset, el beregnes med Energinets data, og indkøb uden mængder beregnes med spend-baserede faktorer fra EXIOBASE 3.8.2, deflateret med Danmarks Statistiks forbrugerprisindeks.\n\nUd over e-conomic, Dinero og Billy er Xero, QuickBooks Online, Dynamics 365 Business Central og Oracle NetSuite tilgængelige, og Uniconta er i beta. Andre systemer kan importeres som CSV med dato og beløb.",
      },
    ],
  },
  contact: {
    title: "Skal vi kigge på dine tal sammen?",
    body: "Jeg viser dig gerne, hvordan overblikket ser ud for en virksomhed som din, i dit tempo og uden fagsprog.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Stifter og civilingeniør i energiteknologi",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Tag en uformel snak",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om platformen og overblikket",
    items: [
      {
        q: "Hvad viser dashboardet i qlim8?",
        a: "Dashboardet viser virksomhedens samlede udledninger for den periode, du vælger, fordelt på Scope 1, 2 og 3 og måned for måned. Du ser også, hvilke data tallene bygger på, og hvad der venter på gennemsyn.",
      },
      {
        q: "Hvordan finder jeg ud af, hvor vores udledning kommer fra?",
        a: "Kategorier viser, hvilke typer forbrug der fylder mest, og Leverandører viser, hvem der står for den største del af Scope 3. I Udforskning går du ned til den enkelte beregning.",
      },
      {
        q: "Hvad er forskellen på Dashboard og Udforskning?",
        a: "Dashboardet giver det samlede billede for den periode, du vælger, også flere år. I Udforskning arbejder du med ét år ad gangen og går fra måned til kategori til den enkelte beregning.",
      },
      {
        q: "Kan jeg rette en linje, der står i den forkerte kategori?",
        a: "Ja. Du retter kategorien i Til gennemsyn eller i Udforskning, og ændringen gemmes i revisionssporet. qlim8 lærer af dine rettelser, så gentagne linjer rammes bedre næste gang.",
      },
      {
        q: "Hvor ofte bliver tallene opdateret?",
        a: "Posteringerne hentes automatisk fra dit regnskabsprogram, og dashboardet viser, hvornår der sidst blev hentet. Elforbruget fra Eloverblik hentes én gang om ugen.",
      },
      {
        q: "Hvorfor står biogen CO2 for sig selv?",
        a: "Biogen CO2 kommer fra brændsler af biologisk oprindelse. qlim8 viser den separat for de brændsler, der har en biogen faktor, så den ikke blandes sammen med Scope 1, 2 og 3.",
      },
    ],
  },
  closingCta: {
    title: "Se dit eget klimaregnskab tage form",
    description: "Forbind dit regnskabsprogram og Eloverblik, og se dine egne tal. Den gratis konto har ingen udløbsdato.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Tag en uformel snak",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const PR_RAPPORTERING: MarketingPageCopy = {
  hero: {
    eyebrow: "Rapportering",
    title: "Færdige klimarapporter, som modtageren forstår med det samme",
    subtitle: "qlim8 laver rapporten direkte fra dit klimaregnskab, som en pæn PDF eller en Excel-fil med alle linjerne. Den samme rapport kan gå til bestyrelsen, banken og investorerne.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Tag en uformel snak",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "En virksomhedsejer og hans bankrådgiver sidder ved et lyst træbord og bladrer roligt i en trykt klimarapport, med kaffekopper og en plante i dagslys.",
    trustLine: [
      "Ingen binding",
      "Oprettet på et par minutter",
      "Vi hjælper dig i gang",
    ],
    microLine: "Ingen kreditkort påkrævet · Personlig hjælp på +45 93 90 13 84",
  },
  intro: {
    heading: "Én rapport til alle, der spørger",
    body: "Banken spørger til jeres klimatal. En stor kunde beder om dem til sit eget regnskab. Bestyrelsen vil vide, om I er på vej mod målet. Svaret bygger på de samme tal.\n\nDerfor danner du én rapport fra dit klimaregnskab og sender den til dem, der spørger. Du slipper for at klippe tal sammen i hånden.",
    bullets: [
      "PDF i tre udgaver: Light, Dark og Consulting",
      "Excel-rapport med alle linjer og deres kilde",
      "Ét regnskab bag alle rapporter",
    ],
  },
  trust: {
    title: "En rapport, du tør sende videre",
    items: [
      {
        icon: "FileCheck",
        title: "Bygget på anerkendte standarder",
        body: "Rapporten bygger på VSME og GHG-protokollen, så læseren kan se, hvad tallene er opgjort efter.",
      },
      {
        icon: "Eye",
        title: "Hvert tal kan spores",
        body: "Hver udledningslinje har sit eget ID og kan spores tilbage til bilaget eller måleraflæsningen.",
      },
      {
        icon: "Users",
        title: "Revisoren kan attestere",
        body: "Du inviterer selv din revisor, og revisorens konto er gratis. Revisoren får læseadgang, kan hente dine rapporter og attestere en rapport.",
      },
    ],
  },
  features: [
    {
      title: "PDF i tre udgaver",
      body: "Light, Dark og Consulting: de samme tal i tre udtryk. Vælg den, der passer til læseren.",
    },
    {
      title: "Excel-rapport med alle linjer",
      body: "Hver linje står med dato, kategori, mængde, emissionsfaktor og kilde, så bogholderen og revisoren kan regne efter.",
    },
    {
      title: "VSME Basic og Comprehensive",
      body: "Skal du levere en VSME-rapport, laver qlim8 den i både Basic-modulet og Comprehensive-modulet.",
    },
    {
      title: "Mere end CO2",
      body: "Rapporten kan også dokumentere arbejdsulykker, sikkerhedstræning, lærlinge, sygefravær og affald fordelt på fraktioner.",
    },
  ],
  howItWorks: {
    title: "Sådan laver du en rapport",
    intro: "",
    steps: [
      {
        title: "Få styr på grundlaget",
        body: "Forbind bogføringen og Eloverblik, og kig linjerne til gennemsyn igennem.",
      },
      {
        title: "Vælg rapport",
        body: "Vælg PDF i Light, Dark eller Consulting, Excel-rapporten eller VSME-rapporten.",
      },
      {
        title: "Del den med dem, der spørger",
        body: "Hent rapporten, og send den til bestyrelsen, banken eller investorerne.",
      },
    ],
  },
  table: {
    title: "Hvem læser rapporten, og hvad leder de efter",
    intro: "",
    headers: {
      a: "Modtager",
      b: "Hvad de typisk spørger om",
      c: "Hvad rapporten viser dem",
    },
    rows: [
      {
        a: "Bestyrelse og ejere",
        b: "Hvor står vi, og er vi på vej mod målet",
        c: "Scope 1, 2 og 3 for året og jeres reduktionsmål",
      },
      {
        a: "Bank",
        b: "Hvad er jeres udledning, og hvad bygger tallene på",
        c: "Udledningen og metoden: VSME og GHG-protokollen",
      },
      {
        a: "Investorer",
        b: "Kan tallene sammenlignes og efterprøves",
        c: "Scope 1, 2 og 3 efter GHG-protokollen og eventuelt revisorens attestering",
      },
      {
        a: "Store kunder",
        b: "Jeres tal til deres eget Scope 3",
        c: "PDF-rapporten, eller jeres VSME Comprehensive-rapport delt gennem qlim8",
      },
      {
        a: "Revisor",
        b: "Hvor kommer hvert tal fra",
        c: "Excel-rapporten og læseadgang til linjer, revisionsspor og bilag",
      },
    ],
    note: "Der er ikke en særskilt skabelon pr. modtager, og rapporten følger ikke en bestemt banks standard.",
  },
  depth: {
    title: "Rapporterne i detaljer",
    items: [
      {
        summary: "Excel-rapporten",
        body: "Excel-rapporten er til den, der vil regne selv. Den viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde, så bogholderen kan krydstjekke og regne videre i sit eget regneark.\n\nSkal revisoren tage stikprøver, ligger unikke ID'er og bilagsreferencer i revisionspakken.",
      },
      {
        summary: "PDF i tre udgaver",
        body: "PDF'en er til den, der skal læse. Der er tre udgaver: Light er redaktionel med hvide sider og luft omkring tallene, Dark har mørke sider og fotografier i fuld bredde, og Consulting er sat op i konsulentstil med konklusionen som overskrift, nummererede figurer og kildelinjer. Tallene er de samme i alle tre.\n\nRapporten viser Scope 1, 2 og 3, og har I sat reduktionsmål, står de også i den.",
      },
      {
        summary: "Til bestyrelsen og investorerne",
        body: "En bestyrelsesrapport skal give overblik til mødet. Send PDF'en med mødematerialet, fx i Consulting-udgaven, hvis læseren vil have konklusionen først. Har I sat reduktionsmål med basisår og målår, står de i rapporten ved siden af årets tal.\n\nEn investorrapport handler om, at tallene kan sammenlignes og efterprøves. Scope 1, 2 og 3 er opgjort efter GHG-protokollen, og jeres revisor kan attestere rapporten.",
      },
      {
        summary: "Til banken",
        body: "Beder banken om jeres klimatal, fx i forbindelse med et lån, sender du den samme rapport, og hvert tal kan spores tilbage til bilaget, hvis rådgiveren spørger.\n\nqlim8 har ikke en særlig bankrapport og følger ikke en bestemt banks standard. Har banken sit eget skema, henter du tallene samme sted.",
      },
      {
        summary: "Kunder, samarbejdspartnere og Bragboard",
        body: "Bruger en af dine store kunder selv qlim8, kan de invitere jer som leverandør, og I kan dele jeres VSME Comprehensive-rapport med dem.\n\nUdadtil kan I slå en offentlig profil med et Brag Board-badge til, og inde i qlim8 viser Bragboard de milepæle, I har nået i jeres reduktionsmål.",
      },
    ],
  },
  contact: {
    title: "Skal vi kigge på rapporten sammen?",
    body: "Er du i tvivl om, hvad banken eller bestyrelsen skal have? Jeg viser dig gerne rapporterne og hjælper dig med at vælge.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Stifter og civilingeniør i energiteknologi",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Tag en uformel snak",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om rapporterne",
    items: [
      {
        q: "Får banken, bestyrelsen og investorerne hver sin rapport?",
        a: "Nej. qlim8 har ikke en særskilt skabelon pr. modtager. Du sender den samme rapport til dem, der spørger. Du kan vælge PDF-udgave efter læseren, men tallene er de samme.",
      },
      {
        q: "Hvad er forskellen på PDF- og Excel-rapporten?",
        a: "PDF'en er til at læse og findes i udgaverne Light, Dark og Consulting. Excel-rapporten er til at regne i og viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde. Begge bygger på det samme klimaregnskab.",
      },
      {
        q: "Hvad skal jeg sende til banken?",
        a: "Den samme rapport, som bestyrelsen får. PDF'en giver rådgiveren et overblik, og Excel-rapporten viser linjerne bag, hvis banken vil regne efter. qlim8 har ikke en særlig bankrapport, så spørg din rådgiver, hvad banken konkret skal bruge.",
      },
      {
        q: "Hvilken PDF-udgave skal vi vælge?",
        a: "Vælg efter læseren. Light er redaktionel og luftig, Dark har mørke sider og fotografier, og Consulting har konklusionen som overskrift. Tallene er de samme i alle tre.",
      },
      {
        q: "Hvad er den offentlige profil med Brag Board-badge?",
        a: "Det er en offentlig profil for jeres klimaarbejde, som I selv vælger at slå til, med et Brag Board-badge, I kan vise frem over for kunder og samarbejdspartnere. Den supplerer rapporten, men erstatter den ikke.",
      },
      {
        q: "Kan jeg danne rapporten igen, hvis tallene ændrer sig?",
        a: "Ja. Rapporten dannes ud fra klimaregnskabet, som det står, når du danner den. Retter du en linje, eller kommer der nye bilag til, danner du blot rapporten igen.",
      },
    ],
  },
  closingCta: {
    title: "Lav din første rapport på dine egne tal",
    description: "Opret en gratis konto, og forbind bogføringen. Hvilke rapporter der er med i hver pakke, står under Priser.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Tag en uformel snak",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const PR_VSME: MarketingPageCopy = {
  hero: {
    eyebrow: "VSME",
    title: "VSME-rapporten i Basic eller Comprehensive, bygget på din bogføring",
    subtitle: "VSME er EFRAG's frivillige standard for bæredygtighedsrapportering til små og mellemstore virksomheder. qlim8 danner rapporten i både Basic-modulet og Comprehensive-modulet ud fra det klimaregnskab, der allerede bygger på din bogføring.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "En virksomhedsejer ved et træbord med en kop kaffe læser en rapport på sin bærbare computer",
    trustLine: [
      "Basic- og Comprehensive-modulet",
      "Bygget på VSME og GHG-protokollen",
      "Hver linje kan spores tilbage til grundlaget",
    ],
    microLine: "Ingen kreditkort påkrævet · Personlig hjælp på +45 93 90 13 84",
  },
  intro: {
    heading: "Når kunden eller banken beder om en VSME-rapport",
    body: "Måske har en stor kunde sendt et spørgeskema, eller banken har spurgt til din CO₂-udledning. VSME giver dig ét fælles format at svare i, så du ikke skal lede efter tallene hver gang.\n\nI qlim8 bygger rapporten på det klimaregnskab, du allerede har fra bogføringen. Klimadelen er regnet ud, og de sociale og ledelsesmæssige oplysninger skriver du selv ind.",
  },
  trust: {
    title: "Det, rapporten hviler på",
    items: [
      {
        icon: "FileCheck",
        title: "Bygget på standarderne",
        body: "Rapporten bygger på VSME og GHG-protokollen.",
      },
      {
        icon: "Landmark",
        title: "Danske kilder først",
        body: "Beregningen bygger primært på Klimakompasset og Energinets data, suppleret med EXIOBASE 3.8.2 til indkøb uden fysiske mængder.",
      },
      {
        icon: "Eye",
        title: "Sporbar til bilaget",
        body: "Hver udledningslinje har sit eget ID og kan spores tilbage til det bilag eller den måleraflæsning, den bygger på.",
      },
    ],
  },
  features: [
    {
      title: "Basic og Comprehensive",
      body: "qlim8 danner VSME-rapporten i begge moduler fra det samme klimaregnskab, så I ikke starter forfra.",
    },
    {
      title: "Klimadelen fra bogføringen",
      body: "Scope 1, 2 og 3 regnes ud fra fakturaerne i bogføringen og elforbruget fra Eloverblik. Hver post viser sin datakvalitet.",
    },
    {
      title: "Sociale og ledelsesmæssige data",
      body: "Arbejdsulykker, nærved-hændelser, sikkerhedstræning, lærlinge, sygefravær og affald fordelt på fraktioner indtastes. Medarbejdertal og FTE kan hentes fra Zenegy.",
    },
    {
      title: "Excel, som revisoren kan hente",
      body: "VSME-rapporten dannes som Excel. Revisoren kan downloade den og attestere rapporten.",
    },
    {
      title: "Én rapport til alle modtagere",
      body: "Den samme rapport kan deles med kunder, bestyrelse, investorer og bank.",
    },
    {
      title: "Start fra en AI-assistent",
      body: "Gennem qlim8's MCP-server kan en AI-assistent som Claude sætte rapporten i gang. Se integrationssiden VSME-rapport med AI-agent.",
    },
  ],
  table: {
    title: "Basic-modulet og Comprehensive-modulet",
    intro: "Comprehensive er et tillæg oven på Basic, ikke en anden rapport.",
    headers: {
      a: "Område",
      b: "Basic-modulet (B1-B11)",
      c: "Comprehensive-modulet (C1-C9)",
    },
    rows: [
      {
        a: "Hvornår",
        b: "Grundmodulet, som alle VSME-rapporter indeholder",
        c: "Når modtageren beder om mere end Basic",
      },
      {
        a: "Virksomheden",
        b: "Grundlaget for rapporten samt praksis og politikker for bæredygtighed",
        c: "Forretningsmodel, strategi og en uddybning af praksis og politikker",
      },
      {
        a: "Klima",
        b: "Energiforbrug og udledning i Scope 1 og 2",
        c: "Reduktionsmål, omstillingsplan og klimarisici",
      },
      {
        a: "Miljø i øvrigt",
        b: "Fx vand, biodiversitet, ressourcer og affald",
        c: "-",
      },
      {
        a: "Medarbejdere",
        b: "Antal, arbejdsmiljø, løn, overenskomst og uddannelse",
        c: "Flere oplysninger om medarbejderne og om menneskerettigheder",
      },
      {
        a: "Ledelse",
        b: "Domme og bøder for korruption og bestikkelse",
        c: "Kønsfordeling i den øverste ledelse og omsætning fra visse sektorer",
      },
    ],
    note: "Tabellen beskriver standarden. qlim8 regner klimadelen ud fra klimaregnskabet. De øvrige oplysninger indtaster I, dog kan medarbejdertal og FTE hentes fra Zenegy.",
  },
  howItWorks: {
    title: "Fra bogføring til VSME-rapport",
    intro: "",
    steps: [
      {
        title: "Forbind bogføring og elmåler",
        body: "Forbind e-conomic, Dinero eller Billy, og giv fuldmagt på eloverblik.dk med MitID. Så bygger qlim8 klimaregnskabet.",
      },
      {
        title: "Gennemgå og udfyld",
        body: "Kig linjerne til gennemsyn igennem, og skriv de sociale og ledelsesmæssige oplysninger ind.",
      },
      {
        title: "Dan og del rapporten",
        body: "Vælg Basic eller Comprehensive efter, hvad modtageren beder om, og del rapporten.",
      },
    ],
  },
  depth: {
    title: "VSME i detaljer",
    items: [
      {
        summary: "Hvem beder om hvad",
        body: "Banken spørger typisk til energi, udledning og ledelsesforhold i forbindelse med lån og kredit. Spørg banken, hvilket modul den ønsker.\n\nStørre kunder spørger gennem indkøbsafdelingen, ofte til Scope 1 og 2 og til arbejdsmiljø.\n\nBag mange af spørgsmålene ligger CSRD: store virksomheder skal også opgøre udledningen i deres værdikæde og spørger derfor leverandørerne, også dem, der ikke selv er omfattet. VSME er lavet, så en mindre virksomhed kan svare dem alle med én rapport.",
      },
      {
        summary: "Basic-modulet i praksis",
        body: "Basic er grundmodulet, og alle VSME-rapporter indeholder det. Udledningen kommer fra klimaregnskabet, hvor elforbruget fra Eloverblik regnes med Energinets data, og brændstof, I selv køber, tæller i Scope 1.\n\nDet øvrige, fx affald, arbejdsulykker og sikkerhedstræning, skriver I ind.",
      },
      {
        summary: "Hvornår Comprehensive er det rigtige",
        body: "Comprehensive bruges, når modtageren vil vide mere om strategi, reduktionsmål, omstilling og klimarisici.\n\nEr I leverandør til en virksomhed, der bruger qlim8, kan I dele jeres VSME Comprehensive-rapport med kunden, når I har takket ja til kundens invitation.",
      },
      {
        summary: "Når kravene vokser",
        body: "Rapporten bygger på VSME og GHG-protokollen, så opgørelsen kan bruges igen, hvis kravene vokser.\n\nKlimaregnskabet bag den er det samme, uanset om du sender en VSME-rapport, en ESG-rapport eller et udtræk i Excel. Du skal ikke indsamle tallene forfra.",
      },
    ],
  },
  contact: {
    title: "Er du i tvivl om, hvilket modul du skal bruge?",
    body: "Send mig spørgsmålet fra kunden eller banken, så finder vi sammen ud af, om Basic er nok.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør i energiteknologi og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om VSME-rapporten",
    items: [
      {
        q: "Hvad er forskellen på Basic-modulet og Comprehensive-modulet i VSME?",
        a: "Basic er grundmodulet med blandt andet energi, udledning i Scope 1 og 2, affald, medarbejdere og korruption. Comprehensive er et tillæg oven på Basic med blandt andet strategi, reduktionsmål, klimarisici og flere oplysninger om medarbejdere og ledelse. qlim8 danner begge moduler.",
      },
      {
        q: "Hvilket VSME-modul skal vi vælge?",
        a: "Spørg den, der beder om rapporten. Basic er altid grundlaget, og Comprehensive lægges oven i, når en bank, investor eller stor kunde beder om mere.",
      },
      {
        q: "Hvilke sociale data skal vi selv indtaste til VSME-rapporten?",
        a: "Arbejdsulykker, nærved-hændelser, sikkerhedstræning, lærlinge, sygefravær og affald fordelt på fraktioner indtastes i qlim8. Medarbejdertal og FTE kan hentes fra Zenegy, og en løn-CSV kan give medarbejdertal, FTE og køn.",
      },
      {
        q: "Kan vi gå fra VSME Basic til Comprehensive senere?",
        a: "Ja. Begge moduler bygger på det samme klimaregnskab i qlim8, så I indsamler ikke klimadata forfra. Comprehensive kræver de ekstra oplysninger, standarden beder om, fx reduktionsmål, omstillingsplan og klimarisici.",
      },
      {
        q: "Bygger VSME-rapporten i qlim8 på en bankstandard?",
        a: "Nej. Rapporten bygger på VSME og GHG-protokollen. Har banken særlige ønsker, så spørg, hvilket VSME-modul den vil have.",
      },
      {
        q: "Hvorfor beder kunderne om VSME, når vi ikke er omfattet af CSRD?",
        a: "Store virksomheder, der rapporterer efter CSRD, skal også opgøre udledningen i deres værdikæde. Derfor spørger de deres leverandører. VSME giver mindre virksomheder ét format, de kan svare alle kunder i.",
      },
      {
        q: "Kan revisoren gennemgå VSME-rapporten?",
        a: "Ja. Revisoren kan downloade VSME-rapporten som Excel og attestere den, og ID'erne og bilagsreferencerne bag hver linje ligger i revisionspakken.",
      },
    ],
  },
  closingCta: {
    title: "Svar kunden og banken med én rapport",
    description: "Opret en gratis konto og se dit klimaregnskab, eller book en gennemgang af VSME-rapporten.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const PR_AUDIT: MarketingPageCopy = {
  hero: {
    eyebrow: "Audit trail og revisor",
    title: "Et klimaregnskab, revisoren kan følge tilbage til bilaget",
    subtitle: "Hver udledningslinje i qlim8 har sit eget ID og kan spores tilbage til det bilag eller den måleraflæsning, den bygger på. Revisionssporet kan ikke redigeres i programmet, og revisoren får læseadgang og kan attestere rapporten.",
    primaryCta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    secondaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    imageUrl: "",
    imageAlt: "En revisor og en bogholder ved et lyst træbord gennemgår et klimaregnskab på en bærbar computer i dagslys",
    trustLine: [
      "Unikt ID på hver udledningslinje",
      "Revisionsspor med hash-kæde",
      "Revisorens konto er gratis",
    ],
    microLine: "Personlig gennemgang med Mads · +45 93 90 13 84",
  },
  intro: {
    heading: "Dokumentationen opstår, mens du arbejder",
    body: "Du behøver ikke føre en log ved siden af klimaregnskabet. Når qlim8 henter fakturaerne fra din bogføring og elforbruget fra Eloverblik, får hver udledningslinje sit eget ID og kan spores tilbage til bilaget eller måleraflæsningen. Retter nogen en kategori, bliver det også gemt.\n\nSå kan spørgsmålet \"hvor kommer det tal fra?\" besvares fra platformen i stedet for fra hukommelsen, og din revisor kan selv slå op.",
  },
  trust: {
    title: "Sådan passer vi på data og spor",
    items: [
      {
        icon: "ShieldCheck",
        title: "Data i EU",
        body: "Servere, database og fillager står i Tyskland hos Hetzner i Nürnberg. Persondata behandles efter GDPR med en databehandleraftale.",
      },
      {
        icon: "Lock",
        title: "Adskilte kundedata",
        body: "Hver kundes data er adskilt fra andre kunders, og hver forespørgsel tjekkes mod den konto, der spørger. Al trafik går over HTTPS.",
      },
      {
        icon: "Users",
        title: "Faste roller",
        body: "Jeres egne brugere er administrator, redigerer eller læser.",
      },
    ],
  },
  features: [
    {
      title: "Unikt ID på hver udledningslinje",
      body: "Hver linje kan spores tilbage til fakturaen eller måleraflæsningen, den er beregnet ud fra.",
    },
    {
      title: "Revisionsspor, der ikke kan redigeres",
      body: "Poster kan ikke redigeres eller slettes i programmet, og en hash-kæde viser, hvis en post er ændret. Personfelter kan slettes efter en GDPR-anmodning.",
    },
    {
      title: "Kategoriændringer med historik",
      body: "Tidspunkt, bruger og tidligere værdi gemmes, når en linje skifter kategori. En konsulent skal altid skrive en begrundelse.",
    },
    {
      title: "Læseadgang til revisoren",
      body: "I inviterer selv revisoren, som får læseadgang til udledningslinjer, revisionsspor, bilag og rapporter. Revisorens konto er gratis.",
    },
    {
      title: "Attestering i platformen",
      body: "Revisoren kan attestere en rapport, I har dannet, direkte i qlim8.",
    },
    {
      title: "Revisionspakken",
      body: "De unikke ID'er og bilagsreferencerne bag rapporten er samlet i revisionspakken.",
    },
  ],
  table: {
    title: "Hvad revisoren kan, og hvad revisoren ikke kan",
    intro: "",
    headers: {
      a: "Handling",
      b: "Revisoren",
      c: "Bemærkning",
    },
    rows: [
      {
        a: "Se udledningslinjer, revisionsspor, bilag og rapporter",
        b: "Ja",
        c: "Hos de virksomheder, der har inviteret revisoren",
      },
      {
        a: "Ændre tal eller kategorier",
        b: "Nej",
        c: "Revisoren kan kun læse, downloade og attestere",
      },
      {
        a: "Downloade de rapporter, virksomheden har dannet",
        b: "Ja",
        c: "Også VSME-rapporten som Excel",
      },
      {
        a: "Selv eksportere hele udledningsregnskabet til Excel",
        b: "Nej",
        c: "Virksomheden eksporterer Excel-rapporten og sender den",
      },
      {
        a: "Attestere en rapport",
        b: "Ja",
        c: "Attesteringen er revisorens egen erklæring om rapporten",
      },
      {
        a: "Betale for sin egen konto",
        b: "Nej",
        c: "Revisorens konto er gratis",
      },
    ],
    note: "Revisoradgang følger virksomhedens pakke. Se pakkerne.",
  },
  howItWorks: {
    title: "Fra bilag til attesteret rapport",
    intro: "",
    steps: [
      {
        title: "Arbejd som du plejer",
        body: "qlim8 henter fakturaer fra bogføringen og elforbrug fra Eloverblik. Sporet opstår undervejs uden et ekstra trin.",
      },
      {
        title: "Invitér revisoren",
        body: "Revisoren får læseadgang og kan følge hver linje tilbage til bilaget. Konsulenter og rådgivere har ét login til alle de virksomheder, der har inviteret dem.",
      },
      {
        title: "Revisoren gennemgår og attesterer",
        body: "Revisoren gennemgår grundlaget, downloader de rapporter, I har dannet, og attesterer rapporten.",
      },
    ],
  },
  depth: {
    title: "Sådan virker sporbarheden",
    items: [
      {
        summary: "Fra bilag til udledningslinje",
        body: "Hver udledningslinje i qlim8 har sit eget ID og hænger sammen med den aktivitet, den er beregnet ud fra: en fakturalinje fra bogføringen eller en måleraflæsning fra Eloverblik. Bilaget ligger ved aktiviteten.\n\nTil hver linje hører en emissionsfaktor og en kilde, og hver post viser sin datakvalitet, så det er tydeligt, om tallet bygger på leverandørens egen PCF eller EPD, en målt mængde eller et indkøbsbeløb.",
      },
      {
        summary: "Et revisionsspor, der kun kan vokse",
        body: "Revisionssporet er append-only: nye hændelser lægges til, mens de eksisterende ikke kan redigeres eller slettes i programmet. Hver post er bundet til den forrige med et digitalt fingeraftryk, en hash, så en senere ændring bryder kæden og kan ses.\n\nGDPR stiller ét forbehold: beder en person om at blive slettet, kan personfelterne i sporet, fx en e-mailadresse, slettes. Selve hændelserne bliver stående.",
      },
      {
        summary: "Kategoriændringer og begrundelser",
        body: "Flyttes en linje til en anden kategori, gemmer qlim8 tidspunktet, hvem der lavede ændringen, og den tidligere kategori. Jeres egne brugere kan skrive en begrundelse, og en konsulent eller rådgiver skal altid skrive en. Revisoren ser både den nuværende kategori og vejen dertil.",
      },
      {
        summary: "Excel-rapporten og revisionspakken",
        body: "Excel-rapporten viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde og kan bruges til at regne videre.\n\nRevisionspakken er til selve revisionen. Her ligger de unikke ID'er og bilagsreferencerne, der kobler hver linje til sit bilag. ID'erne står ikke i Excel-filen.",
      },
    ],
  },
  contact: {
    title: "Vil du se sporet på dine egne tal?",
    body: "Jeg viser gerne, hvordan en linje følges tilbage til bilaget, og hvad din revisor ser. Tag endelig revisoren med på mødet.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør i energiteknologi og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om audit trail og revisoradgang",
    items: [
      {
        q: "Kan revisoren ændre i vores klimaregnskab?",
        a: "Nej. Revisoren har læseadgang til udledningslinjer, revisionsspor, bilag og rapporter, men kan ikke ændre tal. Ændringer laves af virksomhedens egne brugere og af de rådgivere, virksomheden har inviteret.",
      },
      {
        q: "Kan revisoren eksportere hele udledningsregnskabet til Excel?",
        a: "Nej. Revisoren kan downloade de rapporter, virksomheden har dannet, også VSME-rapporten som Excel, men kan ikke selv eksportere regnearket med alle udregninger. Har revisoren brug for det, eksporterer virksomheden Excel-rapporten og sender den.",
      },
      {
        q: "Hvordan kan man se, om en post i revisionssporet er ændret?",
        a: "Revisionssporet kan ikke redigeres eller slettes i qlim8. Hver post er bundet til den forrige med en hash, et digitalt fingeraftryk, så en ændring bryder hash-kæden og kan ses.",
      },
      {
        q: "Hvad sker der med revisionssporet, hvis en medarbejder beder om at blive slettet?",
        a: "Personfelter i revisionssporet, fx en e-mailadresse, kan slettes efter en GDPR-anmodning. Hændelserne bliver stående, så det stadig kan ses, hvad der blev ændret og hvornår.",
      },
      {
        q: "Hvad betyder det, at revisoren attesterer en rapport i qlim8?",
        a: "Revisoren kan attestere en rapport, som virksomheden har dannet. Attesteringen er revisorens egen erklæring om netop den rapport. qlim8 leverer grundlaget og sporet, mens selve revisionen udføres af revisoren.",
      },
      {
        q: "Hvad sker der, hvis vi retter en linje, efter revisoren har kigget?",
        a: "Skifter linjen kategori, gemmes tidspunktet, hvem der ændrede den, og den tidligere kategori i revisionssporet. Revisoren kan derfor se, hvilke kategorier der er ændret siden gennemgangen.",
      },
    ],
  },
  closingCta: {
    title: "Gør revisionen til et opslag",
    description: "Vi viser sporet fra bilag til rapport, og hvad din revisor får adgang til.",
    primary: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    secondary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    trustLine: [
      "Revisorens konto er gratis",
      "Gratis konto uden kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const PR_REDUKTION: MarketingPageCopy = {
  hero: {
    eyebrow: "Strategi og plan",
    title: "Fra klimaregnskab til en plan, du kan følge",
    subtitle: "Sæt et reduktionsmål på dine egne tal, følg det år for år mod en målkurve, og planlæg de tiltag, der skal bringe dig derhen, med dit eget skøn over effekten.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "To kolleger står ved en elvarevogn i gården foran virksomheden, den ene med en tablet i hånden",
    trustLine: [
      "Mål regnet på dit eget klimaregnskab",
      "Dine egne tiltag, gerne med en rådgiver",
      "Kun hele år tæller i rapporterne",
    ],
    microLine: "Ingen kreditkort påkrævet · Personlig hjælp på +45 93 90 13 84",
  },
  intro: {
    heading: "Et mål behøver ikke være et stort strategiprojekt",
    body: "Når dit klimaregnskab er på plads, ved du, hvor udledningen kommer fra. Næste skridt er at beslutte, hvor meget den skal ned, og hvad du vil gøre ved det.\n\nI qlim8 regnes målet på det klimaregnskab, du allerede har fra bogføringen, og tiltagene ligger samme sted. Du vælger selv mål og tiltag og skriver selv dit skøn over effekten ind, gerne med en rådgivers hjælp. Målet regnes ud fra dine egne data og kilder, du kan læse. Ingen AI sætter en plan sammen for dig. Du skal ikke vedligeholde et regneark ved siden af.",
  },
  trust: {
    title: "En plan, der hviler på regnskabet",
    items: [
      {
        icon: "Leaf",
        title: "Regnet på dine egne tal",
        body: "Målet måles mod dit eget klimaregnskab fra bogføringen og Eloverblik, og kun hele regnskabsår tæller med i fremdriften.",
      },
      {
        icon: "FileCheck",
        title: "Et fast basisår",
        body: "Basisåret ligger fast. Ændrer tallene bag det sig med mere end 5 %, får du besked og kan genberegne med en begrundelse.",
      },
      {
        icon: "Calculator",
        title: "Skøn og faktiske tal holdes adskilt",
        body: "Effekten af et tiltag er dit eget skøn. Den står som planlagt effekt for sig, ved siden af den faktiske reduktion i dit klimaregnskab, og trækkes aldrig fra de faktiske tal.",
      },
    ],
  },
  features: [
    {
      title: "Mål for kilder, scopes og intensitet",
      body: "Sæt et mål for en enkelt kilde som diesel eller el, for hele Scope 1 og 2, eller for udledning pr. million kroner i omsætning eller pr. fuldtidsansat. Mål for Scope 1 og 2 kommer med i VSME-rapporten.",
    },
    {
      title: "Målkurve med en lineær sti",
      body: "Kurven viser udledningen år for år og den lige linje fra basisåret til målet, så du ser, om du er foran, på sporet eller bagud. Året til dato kan ses i appen, men er foreløbigt og tæller aldrig i rapporterne.",
    },
    {
      title: "Dine egne tiltag, med dit eget skøn",
      body: "Skriv de tiltag ind, du overvejer eller har besluttet, fx at skifte en gaskedel ud med en varmepumpe. Du angiver selv, hvilken kategori i klimaregnskabet tiltaget berører, hvor meget du forventer, at det giver, og hvornår det starter og slutter.",
    },
    {
      title: "Gerne med en rådgiver",
      body: "Vi anbefaler at skrive tiltagene ind sammen med en rådgiver, som kan hjælpe med at vurdere effekten og omkostningerne. Det er en anbefaling og ikke et krav, og du kan lave hele planen selv.",
    },
    {
      title: "Tiltag samlet i pakker",
      body: "Saml tiltag, der hører sammen, i en pakke af tiltag, og se deres samlede effekt på tværs af dine mål.",
    },
    {
      title: "Forventet forløb og en plan, der viser, hvad der mangler",
      body: "Linjen for det forventede forløb viser udledningen, hvis du ikke gør mere, og følger Energistyrelsens fremskrevne elfaktor. Planlinjen er forløbet minus tiltagene, og afstanden til målet vises som \"Mangler en plan\".",
    },
    {
      title: "Omstillingsplan til VSME-rapporten",
      body: "Hører du til en branche med stor klimapåvirkning, samler qlim8 dine tiltag med investering, driftsomkostning og delmål for hvert år i en omstillingsplan. Mangler vi din branchekode, spørger vi efter den.",
    },
    {
      title: "Samme tal i appen og i rapporterne",
      body: "Målene regnes ét sted, så de samme tal står i appen, i rapporterne og på den offentlige profil. Mål for Scope 1 og 2 skrives ind i afsnit C3 i VSME-rapporten, og de tiltag, du har knyttet til dem, kommer med på listen over de vigtigste handlinger.",
    },
    {
      title: "Bragboard og offentlig profil",
      body: "Bragboard viser milepælene og de nåede mål fra dine reduktionsmål. Vil du vise dit arbejde udadtil, kan du slå en offentlig profil med Brag Board-badge til. Profilen aktiveres af dig.",
    },
  ],
  table: {
    title: "Mål, målkurve, plan, fremskrivning og Bragboard",
    intro: "Fem værktøjer, der svarer på hvert sit spørgsmål.",
    headers: {
      a: "Værktøj",
      b: "Det svarer på",
      c: "Eksempel",
    },
    rows: [
      {
        a: "Mål",
        b: "Hvor vil vi hen, og hvornår?",
        c: "50 % lavere udledning i 2030 end i basisåret 2024",
      },
      {
        a: "Målkurve",
        b: "Hvor langt er vi nået?",
        c: "Udledningen i 2026 ligger under den lige linje fra 2024 til 2030",
      },
      {
        a: "Plan",
        b: "Hvad gør vi for at komme derhen?",
        c: "Gaskedlen skiftes ud med en varmepumpe, med dit eget skøn over effekten",
      },
      {
        a: "Fremskrivning",
        b: "Hvad sker der, hvis vi ikke gør mere?",
        c: "Elforbruget følger Energistyrelsens fremskrevne elfaktor, resten holdes fladt",
      },
      {
        a: "Bragboard",
        b: "Hvad har vi nået at vise frem?",
        c: "Milepæle og nåede mål fra reduktionsmålene",
      },
    ],
    note: "Eksemplerne er kun til illustration.",
  },
  howItWorks: {
    title: "Fra mål til plan i tre skridt",
    intro: "",
    steps: [
      {
        title: "Vælg, hvad du vil nedbringe",
        body: "Start med dine største kilder fra det seneste hele år, og se, hvor mange tons de fylder. Vælg så basisår, målår og hvor meget udledningen skal ned. Basisåret skal være et helt år med data.",
      },
      {
        title: "Tilføj tiltag",
        body: "Skriv de tiltag ind, du vil gennemføre, med dit eget skøn over effekten, og knyt dem til målet. Den planlagte effekt står for sig, ved siden af den faktiske reduktion.",
      },
      {
        title: "Følg kurven",
        body: "Hvert år med et helt regnskab tilføjer et punkt. Kurven viser, om du er foran, på sporet eller bagud, og den planlagte effekt står ud for målet.",
      },
    ],
  },
  depth: {
    title: "Metoden bag mål og plan",
    items: [
      {
        summary: "Sådan vælger du basisår, og hvad der sker, hvis det flytter sig",
        body: "Basisåret, også kaldet baseline, er det år, målet måles imod. GHG-protokollen anbefaler et år med pålidelige data, og at basisåret regnes om, hvis virksomheden ændrer sig væsentligt, fx ved opkøb eller frasalg, eller hvis beregningsmetoden ændres.\n\nI qlim8 skal basisåret være et helt regnskabsår med data i det, målet dækker. Har virksomheden et regnskabsår, der ikke følger kalenderåret, følger målet det, så tallene er de samme som i VSME-rapporten. Det første år med et komplet klimaregnskab er ofte et godt udgangspunkt.\n\nNår målet er sat, ligger basisværdien fast. qlim8 regner basisåret igen på dine nuværende tal og giver besked, hvis det afviger med mere end 5 %, fx efter en opdateret emissionsfaktor eller sene fakturaer. Så kan du genberegne basisåret, og målet flytter med, så den aftalte reduktion står fast. Genberegningen kræver en begrundelse, som gemmes i revisionssporet. Tal med din revisor, før du ændrer et basisår, du har rapporteret på.",
      },
      {
        summary: "Hvilke mål kan du sætte",
        body: "Et kategorimål gælder en enkelt kilde i Scope 1 eller 2, fx diesel eller el. Et mål for Scope 1 og 2 samler dem begge og er det, der kommer med i VSME-rapporten. Et intensitetsmål måler udledningen pr. million kroner i omsætning (nominelt) eller pr. fuldtidsansat, så du kan se, om du reducerer, selv om virksomheden vokser. Omsætningen hentes fra dit regnskabsprogram, hvis det er forbundet, ellers skriver du den selv. Antal fuldtidsansatte kommer fra lønsystemet eller indtastes.\n\nÆndrer udledningen sig fra ét år til det næste, deler qlim8 ændringen op for et intensitetsmål: hvor meget skyldes vækst eller lavere aktivitet, og hvor meget skyldes højere eller lavere udledning pr. enhed.\n\nScope 3-kategorier kan få et mål, når mindst 80 % af udledningen i basisåret bygger på målte mængder eller leverandørdata og ikke på indkøbsbeløb. Er en kategori ikke med, viser qlim8 andelen og hvorfor.",
      },
      {
        summary: "Grøn strøm flytter ikke målet",
        body: "Målene følger den lokationsbaserede metode, hvor strømmens udledning er det danske nets gennemsnit og ikke din elaftale. Køb af grøn strøm og oprindelsesgarantier flytter derfor ikke et mål. Det gør lavere forbrug og et renere elnet.\n\nHar du et markedsbaseret tal for Scope 2, kan det stadig stå i VSME-rapporten ved siden af.",
      },
      {
        summary: "Fra diesel til el i klimaregnskabet",
        body: "Brændstof, som virksomheden selv køber til sine køretøjer, tæller i Scope 1. Lader du elbilerne på dine egne målere, flytter udledningen over i Scope 2.\n\nStrømmen hentes fra Eloverblik pr. målepunkt, og det er hele målepunktets forbrug, der indgår. En ladestander skilles altså ikke ud for sig.\n\nI planen skriver du selv dit skøn over effekten ind, og en rådgiver kan hjælpe med at vurdere et skifte fra diesel til el.",
      },
      {
        summary: "Hvornår planlagt effekt tæller",
        body: "Planlagt effekt er dit eget skøn, regnet på dit eget klimaregnskab. Den står for sig, ved siden af den faktiske reduktion, og trækkes aldrig fra de faktiske tal. Først når et tiltag virker, viser det sig i dit klimaregnskab og på kurven.\n\nTo tiltag på samme kategori fjerner tilsammen aldrig mere end 100 % af den. Et tiltag, der allerede er gennemført i det seneste hele år, ligger i tallene og tælles ikke en gang til, og et tiltag, der gennemføres midt i året, tæller kun resten af sin effekt. Effekten kan også vokse jævnt over flere år.\n\nBragboard viser milepælene og de nåede mål, mens den offentlige profil med Brag Board-badge er til omverdenen, fx kunder i et udbud.",
      },
      {
        summary: "Forventet forløb uden nye tiltag",
        body: "Fremskrivningen viser, hvad udledningen bliver, hvis du ikke gør mere. Den er flad, medmindre du lader en kategori følge omsætningen eller antallet af medarbejdere og angiver en årlig vækst. Elforbrugets udledning følger Energistyrelsens fremskrevne el-emissionsfaktor (KF25), og fjernvarme holdes uændret.\n\nPlanlinjen er fremskrivningen minus de planlagte tiltag, og afstanden til målet vises som \"Mangler en plan\". Fremskrivningen er en prognose og ikke en måling, og den indgår aldrig i opgørelsen, i rapporterne eller i målets fremdrift. Metoden står på /metodologi.",
      },
      {
        summary: "Omstillingsplan for brancher med stor klimapåvirkning",
        body: "VSME-standarden spørger virksomheder i brancher med stor klimapåvirkning, om de har en omstillingsplan. Det gælder blandt andet landbrug, industri, byggeri, handel, transport og ejendomme. Angiv din branchekode, så viser qlim8 planen, hvis den er relevant for dig.\n\nPlanen samler de tiltag, der har reduktionspotentiale, med investering (CapEx), driftsomkostning (OpEx) og delmål for hvert år langs den lige linje fra basisåret til målet.",
      },
    ],
  },
  contact: {
    title: "Vil du have hjælp til det første mål?",
    body: "Jeg hjælper gerne med at vælge basisår og se på, hvilke tiltag der giver mening i din virksomhed.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør i energiteknologi og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om reduktionsmål og klimaplan",
    items: [
      {
        q: "Hvad er forskellen på et reduktionsmål og et tiltag?",
        a: "Et reduktionsmål er destinationen: hvor meget udledningen skal ned fra et basisår til et målår. Et tiltag er en konkret handling, fx at skifte en gaskedel ud med en varmepumpe. I qlim8 knytter du tiltag til et mål, så deres planlagte effekt står ud for målet. Den planlagte effekt er dit eget skøn og trækkes aldrig fra de faktiske tal.",
      },
      {
        q: "Hvilket basisår skal vi vælge til vores reduktionsmål?",
        a: "Vælg et helt år med et pålideligt og komplet klimaregnskab. GHG-protokollen anbefaler at regne basisåret om ved væsentlige ændringer, fx opkøb, frasalg eller en ny beregningsmetode. Er du i tvivl, så aftal valget med din revisor.",
      },
      {
        q: "Hvordan tilføjer jeg et tiltag?",
        a: "Du skriver tiltaget ind selv: hvilken kategori i klimaregnskabet det berører, hvor meget du forventer, at det giver, hvornår det starter og slutter, og gerne investering og driftsomkostning. Effekten er dit eget skøn. Vi anbefaler at få en rådgiver med, men det er ikke et krav.",
      },
      {
        q: "Tæller et tiltag automatisk mod reduktionsmålet?",
        a: "Nej. Et tiltag knyttes til de mål, det berører, og dets kategori skal ligge i målet. Så står den planlagte effekt ud for målet, adskilt fra den faktiske reduktion. Selve målet flytter sig først, når reduktionen viser sig i dit klimaregnskab.",
      },
      {
        q: "Bygger planen på en AI?",
        a: "Nej. Du vælger selv mål og tiltag, og qlim8 regner på dit eget klimaregnskab ud fra kilder, du kan læse. Ingen AI sætter en plan sammen for dig.",
      },
      {
        q: "Kan jeg købe grøn strøm og nå målet med det?",
        a: "Nej. Målene følger den lokationsbaserede metode, hvor strømmens udledning er det danske nets gennemsnit. Køb af grøn strøm og oprindelsesgarantier flytter derfor ikke et mål. Lavere forbrug og et renere elnet gør.",
      },
      {
        q: "Hvor tæller strømmen til elbilerne i klimaregnskabet?",
        a: "Lades bilerne på virksomhedens egne målere, tæller strømmen i Scope 2. qlim8 henter elforbruget fra Eloverblik og opgør det både lokationsbaseret, time for time, og markedsbaseret, og en grøn elaftale med oprindelsesgaranti kan registreres. Det er hele målepunktets forbrug, der indgår.",
      },
      {
        q: "Hvad er det forventede forløb uden nye tiltag?",
        a: "Det er en fremskrivning af, hvad udledningen bliver, hvis du ikke gør mere. Den bruger Energistyrelsens fremskrevne elfaktor og er usikker, fordi den forudsætter, at der ikke kommer nye politiske tiltag. Den er ikke en måling og indgår aldrig i opgørelsen eller rapporterne. Se metoden på /metodologi.",
      },
      {
        q: "Hvad viser Bragboard i qlim8?",
        a: "Bragboard viser milepælene og de nåede mål fra dine reduktionsmål. Vil du vise dit arbejde udadtil, findes der også en offentlig profil med Brag Board-badge.",
      },
      {
        q: "Følger det hele med alle pakker?",
        a: "Nej, funktionerne hører til forskellige pakker. Hvad hver pakke indeholder, står altid på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Gør målet til noget, du kan følge",
    description: "Opret en gratis konto og få dit klimaregnskab på plads, eller book en gennemgang af mål og plan.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const PR_LEVERANDOER: MarketingPageCopy = {
  hero: {
    eyebrow: "Leverandørkæde og Scope 3",
    title: "Saml leverandørernes klimadata ét sted og i ét format",
    subtitle: "Invitér leverandørerne enkeltvis eller mange ad gangen fra en CSV- eller Excel-fil. Når de har takket ja, kan de dele deres VSME Comprehensive-rapport med jer, og I kan eksportere oversigten.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "En indkøbschef og en leverandør sidder ved et lyst mødebord med kaffe og papirer og taler roligt sammen",
    trustLine: [
      "Invitationer enkeltvis eller i bulk",
      "VSME Comprehensive som fælles format",
      "PCF og EPD fra leverandørerne",
    ],
    microLine: "Ingen kreditkort påkrævet · Personlig hjælp på +45 93 90 13 84",
  },
  intro: {
    heading: "Klimaregnskabet stopper ikke ved din egen dør",
    body: "En stor del af udledningen ligger ofte hos dem, du køber af. Derfor spørger flere virksomheder deres leverandører om klimatal, og mange leverandører får de samme spørgsmål fra mange kunder.\n\nI qlim8 kan du invitere dine leverandører og få deres VSME Comprehensive-rapport samlet ét sted. Er du selv leverandør, kan du svare kunden med din egen rapport, når kunden har inviteret dig i qlim8.",
  },
  trust: {
    title: "Leverandørdata, der kan holde",
    items: [
      {
        icon: "Link2",
        title: "Leverandørens egne tal først",
        body: "Har leverandøren en PCF eller EPD, bruges leverandørens tal for den produktlinje, der er koblet til den.",
      },
      {
        icon: "FileCheck",
        title: "Ét fælles format",
        body: "Leverandøren deler sin VSME Comprehensive-rapport, så svarene følger den samme standard.",
      },
      {
        icon: "ShieldCheck",
        title: "Leverandøren siger selv ja",
        body: "Der deles først noget, når leverandøren har takket ja til invitationen.",
      },
    ],
  },
  features: [
    {
      title: "Invitér enkeltvis eller i bulk",
      body: "Tilføj en leverandør ad gangen, eller importér hele leverandørlisten fra en CSV- eller Excel-fil. Hver leverandør får sin egen invitation.",
    },
    {
      title: "Delt VSME Comprehensive-rapport",
      body: "Når leverandøren har takket ja, kan leverandøren dele sin VSME Comprehensive-rapport med jer.",
    },
    {
      title: "PCF og EPD fra leverandørerne",
      body: "Leverandørers PCF og EPD kan uploades som PDF eller XML efter EN 15804/ILCD. Er en produktlinje koblet til en godkendt PCF eller EPD, bruges leverandørens tal.",
    },
    {
      title: "Eksport til ordregiveren",
      body: "Som ordregiver kan I eksportere oversigten over jeres leverandørforbindelser til videre brug.",
    },
    {
      title: "Scope 3 fordelt på kategorier",
      body: "I udforskningen kan Scope 3 vises fordelt på GHG-protokollens 15 kategorier, så I ser, hvor i værdikæden udledningen ligger.",
    },
    {
      title: "Datakvalitet på hver post",
      body: "Hver post viser, om den bygger på leverandørens egne tal, en målt mængde eller et indkøbsbeløb.",
    },
  ],
  table: {
    title: "Hvor tallene for indkøb kommer fra",
    intro: "qlim8 bruger den mest præcise kilde, der findes for hver post.",
    headers: {
      a: "Datakilde",
      b: "Grundlag",
      c: "Datakvalitet",
    },
    rows: [
      {
        a: "Leverandørens PCF eller EPD",
        b: "Leverandørens egen opgørelse for produktet, uploadet som PDF eller XML efter EN 15804/ILCD",
        c: "Højest, når produktlinjen er koblet til en godkendt PCF eller EPD",
      },
      {
        a: "Målte mængder",
        b: "Liter, kg og andre fysiske mængder med faktorer fra Klimakompasset",
        c: "Mellem",
      },
      {
        a: "Indkøbsbeløb",
        b: "Spend-baserede faktorer fra EXIOBASE 3.8.2, deflateret med Danmarks Statistiks forbrugerprisindeks",
        c: "Lavest, men dækker indkøb uden fysiske mængder",
      },
    ],
    note: "Hver post viser sin datakvalitet, så det er synligt, hvor leverandørens egne tal vil gøre størst forskel.",
  },
  howItWorks: {
    title: "Fra leverandørliste til delte rapporter",
    intro: "",
    steps: [
      {
        title: "Invitér leverandørerne",
        body: "Tilføj dem en ad gangen, eller importér listen fra en CSV- eller Excel-fil.",
      },
      {
        title: "Leverandøren takker ja og deler",
        body: "Leverandøren accepterer invitationen og deler sin VSME Comprehensive-rapport med jer.",
      },
      {
        title: "Eksportér oversigten",
        body: "Eksportér oversigten over jeres leverandørforbindelser til jeres egen rapportering og opfølgning.",
      },
    ],
  },
  depth: {
    title: "Leverandørkæden i detaljer",
    items: [
      {
        summary: "Scope 3 og leverandørerne",
        body: "Scope 3 er de indirekte udledninger i værdikæden, fordelt på GHG-protokollens 15 kategorier. Indkøbte varer og tjenester er ofte en af de største.\n\nI qlim8 starter Scope 3 i bogføringen. Indkøb kategoriseres og regnes ud fra mængden, når den kendes, og ellers ud fra beløbet. Jo flere produktlinjer der er koblet til leverandørens egen PCF eller EPD, jo mindre hviler regnskabet på gennemsnitsfaktorer.",
      },
      {
        summary: "Sådan virker invitationen",
        body: "Som ordregiver tilføjer I leverandørerne enkeltvis eller importerer dem fra en CSV- eller Excel-fil. Hver leverandør får en invitation og kan takke ja eller nej.\n\nDelingen foregår i qlim8, så leverandøren skal have en konto. Hvad de enkelte pakker indeholder, for både ordregiver og leverandør, står under pakkerne.",
      },
      {
        summary: "PCF og EPD, leverandørens egne produkttal",
        body: "En PCF er et produkts klimaaftryk. En EPD er en miljøvaredeklaration efter en standard som EN 15804, som især bruges til byggevarer.\n\nI qlim8 uploades dokumentet som PDF eller XML efter EN 15804/ILCD og godkendes, før det tæller. Når en produktlinje er koblet til en godkendt PCF eller EPD, bruges leverandørens tal i stedet for den generiske faktor.",
      },
      {
        summary: "VSME Comprehensive som fælles svar",
        body: "Leverandøren deler den VSME Comprehensive-rapport, leverandøren selv har dannet. Det er den samme rapport til alle kunder, så leverandøren skal ikke svare forskelligt til hver.\n\nFor ordregiveren betyder det, at svarene fra forskellige leverandører følger den samme standard og kan sammenlignes på de samme punkter.",
      },
    ],
  },
  contact: {
    title: "Skal I i gang med leverandørerne?",
    body: "Fortæl mig, hvor mange leverandører I har, og hvad jeres kunder eller jeres egen rapportering kræver, så finder vi et fornuftigt sted at starte.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør i energiteknologi og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om leverandørkæden",
    items: [
      {
        q: "Hvordan inviterer vi mange leverandører på én gang?",
        a: "Importér leverandørlisten fra en CSV- eller Excel-fil. I kan også tilføje leverandører enkeltvis. Hver leverandør får sin egen invitation og kan takke ja eller nej.",
      },
      {
        q: "Skal leverandøren bruge qlim8 for at dele sine klimatal?",
        a: "Ja. Delingen sker i qlim8, så leverandøren skal have en konto. Når leverandøren har takket ja til invitationen, kan leverandøren dele sin VSME Comprehensive-rapport med kunden.",
      },
      {
        q: "Kan vi få leverandørens svar i vores eget spørgeskema?",
        a: "Nej. qlim8 har ikke eksport skræddersyet til den enkelte kundes spørgeskema. Leverandøren deler sin VSME Comprehensive-rapport, som er den samme til alle kunder, og det er netop pointen med en fælles standard.",
      },
      {
        q: "Hvad er forskellen på en PCF og en EPD?",
        a: "En PCF er et produkts klimaaftryk. En EPD er en miljøvaredeklaration efter en standard som EN 15804. Begge kan uploades i qlim8 som PDF eller XML, og er en produktlinje koblet til en godkendt PCF eller EPD, bruges leverandørens tal.",
      },
      {
        q: "Hvad kan vi som ordregiver eksportere?",
        a: "I kan eksportere oversigten over jeres leverandørforbindelser og bruge den i jeres egen rapportering eller opfølgning.",
      },
      {
        q: "Hvordan regnes indkøb fra leverandører, der ikke deler data?",
        a: "Indkøbet regnes ud fra beløbet i bogføringen med spend-baserede faktorer fra EXIOBASE 3.8.2, deflateret med Danmarks Statistiks forbrugerprisindeks. Kendes mængden, bruges faktorer fra Klimakompasset. Hver post viser sin datakvalitet.",
      },
      {
        q: "Har qlim8 en leverandørportal?",
        a: "En egentlig leverandørportal er planlagt, men ikke bygget. I dag foregår samarbejdet gennem invitationen og den delte VSME Comprehensive-rapport.",
      },
    ],
  },
  closingCta: {
    title: "Få leverandørernes tal ind i ét format",
    description: "Opret en gratis konto og se jeres eget klimaregnskab, eller book en gennemgang af leverandørkæden.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Book en gennemgang",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};
