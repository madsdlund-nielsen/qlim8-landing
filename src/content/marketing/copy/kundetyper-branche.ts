// Bundled default copy for the four industry pages under /kundetyper and the
// hub's own copy. CMS pageKeys: page.kundetyper and page.kundetyper.<slug>.
// Transcribed word for word from the copywriter's files; the node metadata
// (title, SEO, related) is in ../kundetyper.ts. The block order of each page is
// the node's sectionOrder there.
//
// A blank line inside a text ("\n\n") is a paragraph break (see paragraphs() in
// src/lib/paragraphs.ts). A sentence in double square brackets with a pris token is a
// price the packages API fills in, and disappears when no price is known.

import { DEMO_HREF, PHONE_CTA } from "@/content/cta";
import type { MarketingHubCopy, MarketingPageCopy } from "../types";

const PRISER = "/priser";
const PRISER_RAADGIVERE = "/priser#raadgivere";

export const KUNDETYPER_HUB_COPY: MarketingHubCopy = {
  hero: {
    eyebrow: "Kundetyper",
    title: "Dit klimaregnskab, bygget oven på dit regnskab",
    subtitle: "En stor del af tallene ligger allerede i din bogføring og dit elforbrug. qlim8 bygger klimaregnskabet oven på det, og vi hjælper dig personligt, hvis du går i stå.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Tag en uformel snak (Book 15 min)",
      href: DEMO_HREF,
    },
    // Bundled while the app cannot serve CMS images (app.qlim8.com/api/cms/assets
    // answers 500, October 2026). Photos belong in /admin: move it back there and
    // empty this field, plus public/photos/, once that is fixed.
    imageUrl: "/photos/qlim8-kundetyper-vaerksted.jpg",
    imageAlt: "Håndværker ved et træbord på værkstedet med en bærbar computer",
    trustLine: [
      "Ingen binding",
      "Oprettelse tager et par minutter",
      "Vi hjælper dig i gang",
    ],
  },
  intro: {
    heading: "Samme rolige metode, uanset branche",
    body: "Dine fakturaer for brændstof, materialer, el og indkøb står allerede i bogføringen. qlim8 henter dem fra e-conomic, Dinero eller Billy og sorterer linjerne automatisk, når systemet er sikkert nok.\n\nForskellen mellem brancherne er, hvor udledningen ligger: i varevognen, på lastbilen, i produktionen eller hos de kunder, du rådgiver. Driver du en anden slags virksomhed, fx en frisørsalon, en butik eller et kontor, er du lige så velkommen og bruger den samme platform.",
  },
  cardsHeading: "Find din branche",
  cardsSubheading: "Vælg den, der ligner din virksomhed mest, og se hvad der fylder.",
  differentiators: [
    {
      title: "Bygget på dansk bogføring",
      body: "Direkte forbindelse til e-conomic, Dinero og Billy og elforbrug fra Eloverblik. Du starter med dine egne tal, ikke et tomt regneark.",
    },
    {
      title: "En rapport, du kan stå inde for",
      body: "Hver udledningslinje kan spores tilbage til bilaget, og din revisor kan inviteres ind og attestere rapporten.",
    },
    {
      title: "Et menneske, du kan ringe til",
      body: "Går du i stå, taler du direkte med folk, der kender platformen, på +45 93 90 13 84.",
    },
  ],
  trust: {
    title: "Tryghed fra første dag",
    items: [
      {
        icon: "Lock",
        title: "Servere i EU",
        body: "Servere, database og fillager står i Tyskland, og data behandles efter GDPR.",
      },
      {
        icon: "Leaf",
        title: "Danske kilder først",
        body: "Primært Klimakompasset og Energinet, suppleret med EXIOBASE, hvor der kun er et indkøbsbeløb.",
      },
      {
        icon: "Clock",
        title: "Uden binding",
        body: "Free er gratis uden udløbsdato og kræver intet kreditkort.",
      },
    ],
  },
  contact: {
    title: "Vil du have en uforpligtende snak om din branche?",
    body: "Fortæl mig, hvad din virksomhed laver, så viser jeg dig, hvor tallene typisk kommer fra hos jer. Du taler med mig, ikke med en sælger.",
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
    title: "Spørgsmål om brancher",
    items: [
      {
        q: "Min branche står ikke på listen. Kan jeg stadig bruge qlim8?",
        a: "Ja. qlim8 bygger klimaregnskabet på bogføringen og elforbruget, så metoden er den samme for en frisørsalon, en butik, et kontor eller noget helt fjerde. De fire brancher på siden er ikke de eneste, platformen passer til.",
      },
      {
        q: "Hvorfor bliver mindre virksomheder spurgt om klimatal?",
        a: "Mange mindre virksomheder har ikke selv et lovkrav om klimaregnskab. Spørgsmålene kommer ofte fra banken, fra større kunder eller ved udbud, fordi de selv skal dokumentere udledningen i deres værdikæde.",
      },
      {
        q: "Kan mine kolleger også arbejde i qlim8?",
        a: "Ja. Du kan give kolleger adgang med en fast rolle som administrator, redigerer eller læser. Hvor mange brugere der følger med, står ved pakkerne på prissiden.",
      },
    ],
  },
  closingCta: {
    title: "Se dit eget klimaregnskab tage form",
    description: "Opret en gratis profil, forbind dit regnskabsprogram og Eloverblik, og se hvad dine egne tal fortæller. Vil du hellere tale med et menneske først, så ring.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Ring direkte på +45 93 90 13 84",
      href: PHONE_CTA.href,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort",
      "Personlig hjælp",
    ],
  },
};

export const KT_BYGGERI: MarketingPageCopy = {
  hero: {
    eyebrow: "Byggeri og håndværk",
    title: "Klimaregnskab og ESG til byggeri og håndværk: klar, når hovedentreprenøren spørger",
    subtitle: "Dieslen til servicevognen, grossistfakturaen og containerregningen står allerede i din bogføring. qlim8 henter dem fra e-conomic, Dinero eller Billy og gør dem til et klimaregnskab, du kan sende videre. Og bliver du i tvivl, ringer du bare.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Tag en uformel snak på 15 minutter",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "Tømrermester ved et lyst træbord på værkstedet med kaffe og en bærbar med qlim8, en hvid varebil i dagslys uden for vinduet.",
    trustLine: [
      "Passer til tømrer, VVS, el, maler, murer og entreprenør",
      "Ingen binding og intet kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
    microLine: "",
  },
  reasons: {
    title: "Hvorfor spørger hovedentreprenøren og banken pludselig?",
    intro: "De fleste håndværksvirksomheder er ikke selv omfattet af EU's rapporteringskrav. Kravene kommer alligevel, bare ad omvejen.",
    items: [
      {
        title: "Hovedentreprenøren skal selv rapportere",
        body: "De største entreprenører og bygherrer skal opgøre deres klimaaftryk efter EU's regler, og her tæller underentreprenørernes udledning med. Derfor lander spørgeskemaet eller ønsket om en CO2-rapport hos dig, tit med kort frist midt i en travl byggefase.",
      },
      {
        title: "Bygherren skriver det ind i udbuddet",
        body: "Kommuner, boligselskaber og pensionskasser stiller i stigende grad krav om CO2 og ESG i udbud og kontrakter. Og bygningsreglementet kræver en klimaberegning (LCA) af nyt byggeri, så klima er blevet en fast del af snakken på byggemødet.",
      },
      {
        title: "Banken spørger også",
        body: "Mange banker beder i dag om ESG-oplysninger, fx når kassekreditten skal fornyes, eller når en ny minigraver skal finansieres.",
      },
    ],
  },
  table: {
    title: "Hvad betyder Scope 1, 2 og 3 for en håndværker?",
    intro: "Sådan ser klimaregnskabets tre dele ud i din hverdag.",
    headers: {
      a: "Begreb",
      b: "Hvad det betyder for dig",
      c: "Hvad qlim8 kigger efter i dit regnskab",
    },
    rows: [
      {
        a: "Scope 1: det, I selv brænder af",
        b: "Diesel og benzin i servicevogne, varebiler, gravemaskine og minilæsser, og olie eller gas til varme på værkstedet.",
        c: "Fakturaer og tankkortopgørelser på det brændstof, I selv køber.",
      },
      {
        a: "Scope 2: den energi, I køber",
        b: "Strøm på værksted, lager og kontor, byggestrøm på et målepunkt i jeres navn og fjernvarme.",
        c: "Elforbruget time for time fra Eloverblik, regnet om med Energinets data. Fjernvarmen henter vi ikke automatisk, så her taster du forbruget ind fra varmeregningen.",
      },
      {
        a: "Scope 3: alt det, I køber ind",
        b: "Materialer, værktøj, underentreprenører, vognmænd, affaldscontaineren og leasingydelsen på bilerne.",
        c: "Fakturaerne fra trælasten og grossisten, fx STARK, Davidsen, Brødrene Dahl eller AO, fra vognmanden og fra affaldsmodtageren. Står der kun et beløb, regnes der ud fra beløbet.",
      },
    ],
    note: "qlim8 bruger den mest præcise kilde først: leverandørens egen EPD, så målte mængder som liter og kWh, og til sidst beløbet. Datakvaliteten står på hver post.",
  },
  howItWorks: {
    title: "Fra bilag til færdigt tal",
    intro: "Du bogfører, som du plejer. qlim8 bygger videre på det.",
    steps: [
      {
        title: "Forbind bogføringen og elmåleren",
        body: "Du forbinder e-conomic, Dinero eller Billy. Elforbruget kommer fra Eloverblik, når du har givet fuldmagt med MitID.",
      },
      {
        title: "qlim8 sorterer fakturalinjerne",
        body: "Grossistfakturaen med skruer og gipsplader, tankkortet og containerregningen kategoriseres automatisk, når systemet er sikkert nok. Er det i tvivl, lægges linjen til gennemsyn, før den tæller med. Omregningen bygger primært på Klimakompasset og Energinet.",
      },
      {
        title: "Hent rapporten, og send den videre",
        body: "Rapporten bygger på VSME, CSRD (ESRS E1) og GHG-protokollen og kan dannes som PDF eller Excel. Den samme rapport kan sendes til hovedentreprenøren, bygherren og banken. Hver udledningslinje kan spores tilbage til bilaget.",
      },
    ],
  },
  checks: {
    title: "Mere end CO2: folk, sikkerhed og orden på pladsen",
    intro: "En VSME-rapport handler også om mennesker, og her har mange håndværksvirksomheder en god historie. Tallene står ikke i bogføringen, så du taster dem selv ind. Kun medarbejdertal og FTE kan hentes automatisk.",
    items: [
      {
        title: "Arbejdsulykker og nærved-hændelser",
        body: "Hvor mange I har haft på pladserne og i værkstedet.",
      },
      {
        title: "Sikkerhedstræning",
        body: "Hvor stor en del af folkene der har været på kursus, fx i stilladsarbejde eller førstehjælp.",
      },
      {
        title: "Lærlinge og elever",
        body: "Hvor mange lærlinge I uddanner. Det er fagets fremtid.",
      },
      {
        title: "Sygefravær",
        body: "Sygefraværet, som du taster ind fra lønsystemet eller dine egne opgørelser.",
      },
      {
        title: "Medarbejdere",
        body: "Fra Zenegy kommer medarbejdertal og FTE pr. måned. Ellers uploader du en løn-CSV med medarbejdertal, FTE og køn.",
      },
      {
        title: "Affald fordelt på fraktioner",
        body: "Træ, gips, beton, metal og restaffald fra containeren, så bygherren kan se, hvad I sorterer.",
      },
    ],
  },
  integrations: {
    title: "Bygger på det regnskabsprogram, du allerede har",
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.",
  },
  contact: {
    title: "Har du fået et skema fra en hovedentreprenør?",
    body: "Ring eller skriv, så kigger vi på det sammen. Vi finder ud af, hvad du kan svare ud fra dine tal, og hvad der mangler. Du står ikke alene med det.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør i energiteknologi og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en uformel snak på 15 minutter",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål om klimaregnskab i byggebranchen",
    items: [
      {
        q: "Skal jeg taste hver skrue og lægte ind fra grossistfakturaen?",
        a: "Nej. qlim8 henter fakturaerne fra e-conomic, Dinero eller Billy, og en stor del af linjerne kategoriseres automatisk, når systemet er sikkert nok. Resten lægges til gennemsyn, før det tæller med, og qlim8 lærer af dine rettelser til næste gang.",
      },
      {
        q: "Hvad er forskellen på en LCA og et klimaregnskab?",
        a: "En LCA efter bygningsreglementet regner på selve bygningen, pr. kvadratmeter over 50 år. Et klimaregnskab regner på virksomheden: biler, maskiner, værksted og indkøb over et år. qlim8 laver klimaregnskabet, ikke LCA'en, og fordeler ikke tallene på byggesager. Har du leverandørens EPD, kan den uploades i qlim8, så leverandørens tal bruges på de produktlinjer, den er koblet til.",
      },
      {
        q: "Vi leaser vores varebiler. Skal de med i klimaregnskabet?",
        a: "Ja. Dieslen, I selv køber til bilerne, tæller qlim8 i Scope 1. Leasingydelsen hører til i Scope 3, kategori 8. Hvordan jeres leasingform skal opgøres, afklarer du med din revisor. Strøm til el-varebiler, der lades på værkstedet, indgår i målerens samlede forbrug og skilles ikke ud.",
      },
      {
        q: "Kan min revisor se tallene i qlim8?",
        a: "Ja. Du inviterer selv din revisor, som får læseadgang til udledningslinjer, revisionsspor, bilag og rapporter og kan attestere en rapport, men ikke ændre tallene. Hver udledningslinje kan spores tilbage til bilaget. Revisorens konto er gratis.",
      },
      {
        q: "Hovedentreprenøren har sendt et spørgeskema. Hvad gør jeg?",
        a: "Skemaerne spørger tit til brændstof, el, indkøb, affald og medarbejdere, og i qlim8 har du de tal samlet ét sted. Bruger hovedentreprenøren selv qlim8, kan de invitere dig som leverandør, så du kan dele din VSME Comprehensive-rapport med dem.",
      },
      {
        q: "Hvad koster det at komme i gang med qlim8?",
        a: "Ingenting. Med den gratis pakke, Free, forbinder du Eloverblik og ét regnskabsprogram (e-conomic, Dinero eller Billy) og ser dit eget klimaregnskab. Betalte pakker faktureres årligt. [[Starter koster {pris:starter} om måneden ekskl. moms.]] Hvad hver pakke indeholder, står på prissiden.",
      },
      {
        q: "Binder jeg mig til noget?",
        a: "Ikke når du starter. qlim8's gratis pakke, Free, har ingen binding og ingen udløbsdato, og du opretter kontoen på et par minutter uden kreditkort. Vælger du senere en betalt pakke, faktureres den årligt.",
      },
    ],
  },
  closingCta: {
    title: "Hav tallene klar, før næste skema lander",
    description: "Opret en gratis konto, forbind dit regnskabsprogram, og se, hvad din bogføring allerede fortæller om jeres klimaaftryk. Vi hjælper dig gerne i gang.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Tag en uformel snak på 15 minutter",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Ingen kreditkort påkrævet",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const KT_TRANSPORT: MarketingPageCopy = {
  hero: {
    eyebrow: "Transport og vognmænd",
    title: "Klimaregnskab for vognmænd, bygget på de bilag, du allerede har bogført",
    subtitle: "Speditøren, kunden eller leasingselskabet vil have jeres CO2-tal. qlim8 regner dem ud fra bogføringen, så du slipper for at tælle liter sammen fra tankkort og bilag i weekenden. Du bogfører som før, og vi hjælper dig hele vejen.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Tag en uformel snak på 15 minutter",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "En bogholder ved et lyst træbord med en kop kaffe kigger roligt på qlim8. Gennem vinduet ses trækkerne på vognmandens plads.",
    trustLine: [
      "Ingen binding og intet kreditkort",
      "Kontoen er oprettet på et par minutter",
      "Personlig hjælp på +45 93 90 13 84",
    ],
    microLine: "Til vognmænd, kurerer, flyttefirmaer og speditører",
  },
  reasons: {
    title: "Hvorfor spørger speditøren, kunden og leasingselskabet efter jeres CO2-tal?",
    intro: "De fleste vognmænd er ikke selv omfattet af EU's krav om bæredygtighedsrapportering (CSRD). Alligevel kommer spørgsmålene, især af tre grunde.",
    items: [
      {
        title: "Kunden skal regne jeres kørsel med",
        body: "Når en stor vareejer eller speditør laver klimaregnskab, tæller den fragt, de køber hos jer, med i deres Scope 3. Med et dokumenteret tal i stedet for et skøn gør du kundens arbejde nemt og står stærkere ved næste forhandling.",
      },
      {
        title: "Leasing og finansiering",
        body: "Når en ny trækker eller trailer skal leases eller finansieres, spørger flere leasingselskaber og banker til flådens CO2-aftryk og jeres planer.",
      },
      {
        title: "Udbud med miljøkrav",
        body: "I flere offentlige udbud af kørsel indgår krav om dokumenterede miljø- og klimadata. Med tallene klar kan du byde uden hastværk.",
      },
    ],
  },
  table: {
    title: "Hvad betyder Scope 1, 2 og 3 for en vognmand?",
    intro: "Kunder og revisorer taler om Scope 1, 2 og 3. Sådan ser det ud i en vognmands hverdag.",
    headers: {
      a: "Begreb",
      b: "Hvad det betyder for en vognmand",
      c: "Hvad qlim8 kigger efter i dit regnskab",
    },
    rows: [
      {
        a: "Scope 1: flådens egen udledning",
        b: "Den diesel og benzin, I selv køber til lastbiler, varevogne og maskiner. For de fleste vognmænd er det langt den største post.",
        c: "Brændstoffakturaer og samlefakturaen fra tankkortselskabet. Hvor mængden er kendt, regner qlim8 på liter med faktorer fra Klimakompasset, ellers på beløbet.",
      },
      {
        a: "Scope 2: den strøm, I køber",
        b: "Strøm til kontor, lagerhal og værksted og til elvarevogne, I lader på pladsen.",
        c: "Elforbruget time for time fra Eloverblik, regnet med Energinets data. Ladestanderens strøm indgår i målerens samlede forbrug og skilles ikke ud.",
      },
      {
        a: "Scope 3: undervognmænd og indkøb",
        b: "Ture, som undervognmænd kører for jer, dæk, reservedele, værksted og nye køretøjer. Leasingydelsen på trækkeren hører også til her.",
        c: "Fakturaer fra undervognmænd, dækcentre og værksteder, regnet ud fra beløbet med faktorer fra EXIOBASE, et internationalt datasæt.",
      },
    ],
    note: "Linjer, qlim8 ikke er sikker på, lægges til gennemsyn hos dig, før de tæller med. Hver post viser sin datakvalitet.",
  },
  howItWorks: {
    title: "Fra brændstoffaktura til færdigt tal",
    intro: "Mange vognmænd frygter et regneark med tusindvis af tankninger. Sådan fungerer qlim8 ikke.",
    steps: [
      {
        title: "Forbind dit regnskabsprogram",
        body: "Dinero forbinder du ved at logge ind med Visma Connect, e-conomic med to nøgler fra din aftale og Billy med en API-nøgle. Du og bogholderen bogfører præcis som før.",
      },
      {
        title: "qlim8 sorterer bilagene",
        body: "Brændstoffakturaerne lander i Scope 1, og fakturaer fra undervognmænd og værksteder i Scope 3. Er systemet i tvivl om en linje, lægges den til gennemsyn hos dig. qlim8 lærer af dine rettelser, så samme slags linje rammes bedre næste gang.",
      },
      {
        title: "Tilføj strømmen og få rapporten",
        body: "Du giver fuldmagt med MitID på eloverblik.dk, og elforbruget hentes time for time én gang om ugen. Rapporten får du som PDF eller Excel, og hver linje kan spores tilbage til bilaget eller måleraflæsningen.",
      },
    ],
  },
  checks: {
    title: "Vis kunderne, at I har styr på chauffører, sikkerhed og ordentlige forhold",
    intro: "En ESG-rapport efter VSME, EU's frivillige standard for mindre virksomheder, handler også om mennesker. Tallene skriver du selv ind, så de står samlet i rapporten.",
    items: [
      {
        title: "Arbejdsulykker og nærved-hændelser",
        body: "Årets ulykker og de nærved-hændelser, I har registreret, fx ved af- og pålæsning.",
      },
      {
        title: "Sikkerhedstræning",
        body: "Andelen af chauffører og øvrige medarbejdere, der har fået sikkerhedstræning i årets løb.",
      },
      {
        title: "Lærlinge og sygefravær",
        body: "Chaufførlærlinge og andre elever samt sygefraværet, som ikke hentes fra lønsystemet.",
      },
      {
        title: "Medarbejdere og FTE",
        body: "Kun de to tal hentes automatisk. Bruger I Zenegy, kommer de pr. måned derfra. Ellers kan du uploade en løn-CSV med medarbejdertal, FTE og køn.",
      },
    ],
  },
  integrations: {
    title: "Bygget på det regnskabsprogram, du allerede bruger",
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.",
  },
  contact: {
    title: "Har en kunde eller speditør bedt om jeres CO2-tal?",
    body: "Ring til mig, så tager vi en uforpligtende snak om, hvad kunden har bedt om, og hvordan du nemmest kommer i mål. Du sidder aldrig alene med tallene.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book 15 minutter med mig",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Spørgsmål fra vognmænd og transportfirmaer",
    items: [
      {
        q: "Vi tanker både almindelig diesel og HVO. Kan qlim8 kende forskel?",
        a: "Diesel og benzin, I selv køber til jeres køretøjer, regner qlim8 i Scope 1 ud fra brændstoffakturaerne. HVO100 og anden biodiesel har i dag ikke deres egen faktor i qlim8 og regnes ikke særskilt. Tanker I HVO på en del af flåden, så ring, før du sender tallene videre. Vi gennemgår gerne fakturaerne sammen med dig.",
      },
      {
        q: "Vores lastbiler er leasede. Hvor tæller de i klimaregnskabet?",
        a: "Den diesel, I selv køber til leasede lastbiler, tæller qlim8 i Scope 1 ud fra brændstoffakturaerne, ligesom for dem, I ejer. Selve leasingydelsen hører til Scope 3, kategori 8 (leasede aktiver). Hvordan netop jeres leasingaftale skal opgøres, aftaler du bedst med din revisor.",
      },
      {
        q: "Vi bruger undervognmænd til en del af turene. Kommer de med?",
        a: "Ja. Kører en undervognmand en tur for jer, tæller kørslen i jeres Scope 3. qlim8 finder fakturaerne i bogføringen og regner udledningen ud fra beløbet. Usikre linjer lægges til gennemsyn hos dig, før de tæller med.",
      },
      {
        q: "Kan jeg give en kunde eller speditør vores CO2-tal?",
        a: "Ja. Du sender rapporten fra qlim8 som PDF eller Excel. Den viser jeres samlede udledning og bygger på VSME, CSRD (ESRS E1) og GHG-protokollen. Det er den samme rapport til alle, ikke tal for en bestemt kunde eller rute. Bruger kunden selv qlim8, kan de invitere jer som leverandør, så du kan dele din VSME Comprehensive-rapport med dem.",
      },
      {
        q: "Kan jeg regne på et skift fra diesel til el?",
        a: "Ja, for personbiler og varevogne. Under Scenarier i qlim8 tester du, hvad et skift fra diesel til el betyder, og du kan sætte et reduktionsmål med basisår og målår. Lastbiler og HVO er ikke med i scenarierne i dag. Se pakkerne for, hvad der følger med.",
      },
      {
        q: "Hvor lang tid tager det, og binder jeg mig til noget?",
        a: "Det tager et par minutter at oprette en gratis konto i qlim8, og du behøver ikke kreditkort. Free er gratis, har ingen udløbsdato og ingen binding. Du forbinder Eloverblik og ét regnskabsprogram (e-conomic, Dinero eller Billy) og ser dit eget klimaregnskab. Betalte pakker faktureres årligt.",
      },
    ],
  },
  closingCta: {
    title: "Vær vognmanden, der har CO2-tallene klar",
    description: "Forbind dit regnskabsprogram, og se jeres klimaregnskab ud fra de bilag, du allerede har bogført. Vil du hellere tale først, så book en kort snak.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Tag en uformel snak på 15 minutter",
      href: DEMO_HREF,
    },
    trustLine: [
      "Ingen binding",
      "Intet kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
  },
};

export const KT_PRODUKTION: MarketingPageCopy = {
  hero: {
    eyebrow: "Produktion og industri",
    title: "Få styr på energi, råvarer og kundekrav i ét trygt klimaregnskab",
    subtitle: "Kunderne sender skemaer, og banken spørger til CO2. qlim8 bygger klimaregnskabet og VSME-rapporten på din bogføring og elmåleren i hallen, så du svarer alle med de samme tal. Du behøver ikke hyre en konsulent.",
    primaryCta: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondaryCta: {
      label: "Book en uformel gennemgang (15 min)",
      href: DEMO_HREF,
    },
    imageUrl: "",
    imageAlt: "Produktionsleder ved et skrivebord i kanten af hallen med kaffekop og bærbar. I baggrunden paller med stål og sække med plastgranulat i dagslys.",
    trustLine: [
      "Til maskinbyggere og plast-, metal-, træ- og fødevareproduktion",
      "Ingen binding, intet kreditkort",
      "Personlig hjælp på +45 93 90 13 84",
    ],
    microLine: "",
  },
  reasons: {
    title: "Slip for at udfylde ti forskellige spørgeskemaer fra ti forskellige kunder",
    intro: "Store kunder, der rapporterer efter CSRD, skal også vise tal for deres leverandører. Derfor lander indkøbsafdelingernes Excel-skemaer hos dig.",
    items: [
      {
        title: "Hver kunde spørger på sin måde",
        body: "Én vil have Scope 1 og 2, en anden spørger til energi og affald, en tredje til arbejdsmiljø. Hver gang starter du forfra med at finde tallene.",
      },
      {
        title: "Én VSME-rapport til alle, der spørger",
        body: "qlim8 samler dine tal efter VSME, EU's frivillige standard for SMV'er, i én rapport, du kan sende til hver kunde. Skemaerne forsvinder ikke helt, men du udfylder dem ud fra de samme tal.",
      },
      {
        title: "Banken får den samme rapport",
        body: "Spørger banken, bestyrelsen eller en investor, deler du den samme rapport. Det giver ro i maven, at alle har fået de samme tal.",
      },
    ],
  },
  table: {
    title: "Sådan hænger Scope 1, 2 og 3 sammen i en produktionsvirksomhed",
    intro: "Klimaaftrykket ligger to steder: i hallen, hvor maskinerne kører, og i de råvarer, du køber hjem.",
    headers: {
      a: "Scope",
      b: "Hvad det dækker hos dig",
      c: "Sådan kommer tallene ind",
    },
    rows: [
      {
        a: "Scope 1: direkte udledning fra fabrikken",
        b: "Naturgas, olie eller LPG til opvarmning og procesvarme, og brændstof til egne gaffeltrucks og varevogne.",
        c: "Fakturaerne kategoriseres fra bogføringen, og brændsel regnes ud fra mængden, fx liter olie. Kølemiddellækager og procesudledninger har egne kategorier.",
      },
      {
        a: "Scope 2: indkøbt el og fjernvarme",
        b: "Strøm til CNC-maskiner, støbemaskiner, trykluft og ventilation, og fjernvarme til hal og kontor.",
        c: "Elforbruget hentes time for time fra Eloverblik, og en grøn elaftale med oprindelsesgaranti kan registreres. Fjernvarme hentes ikke automatisk, men lægges ind fra varmeregningen.",
      },
      {
        a: "Scope 3: råvarer, fragt og affald",
        b: "Stål, aluminium, plastgranulat, træ, kemi, emballage, fragt ind og ud og affald fra driften.",
        c: "Vareindkøb og fragt regnes ud fra beløbet med faktorer fra EXIOBASE. Har leverandøren en PCF eller EPD, bruges leverandørens tal for den koblede produktlinje.",
      },
    ],
    note: "Hver post viser sin datakvalitet, så du kan se, hvor tallet kommer fra. Salg af skrot er en indtægt og giver ingen udledning.",
  },
  howItWorks: {
    title: "Fra råvareindkøb og elmåler til færdig rapport",
    intro: "",
    steps: [
      {
        title: "Forbind bogføringen og elmåleren",
        body: "Forbind e-conomic, Dinero eller Billy, og giv qlim8 fuldmagt på eloverblik.dk med MitID. Så hentes elforbruget i hallen time for time, én gang om ugen, og du slipper for at aflæse målere.",
      },
      {
        title: "Indkøbet bliver til Scope 3",
        body: "Linjerne med stål, granulat, emballage og fragt kategoriseres automatisk, når systemet er sikkert nok. Usikre linjer venter på dit gennemsyn, før de tæller med, og qlim8 lærer af dine rettelser.",
      },
      {
        title: "Én rapport, du kan stå inde for",
        body: "Du danner VSME-rapporten og deler den med kunder og bank. Hver linje kan spores tilbage til bilaget eller måleraflæsningen, og revisoren kan få læseadgang uden at kunne ændre tal.",
      },
    ],
  },
  checks: {
    title: "Arbejdsmiljø, medarbejdere og ansvarlig ledelse",
    intro: "Store kunder kigger også på S og G i ESG, når de vurderer underleverandører. Det kan du dokumentere i qlim8, men de fleste af tallene ligger ikke i bogføringen, så dem indtaster du selv.",
    items: [
      {
        title: "Sikkerhed i produktionen",
        body: "Arbejdsulykker, nærved-hændelser og hvor mange der har fået sikkerhedstræning.",
      },
      {
        title: "Medarbejdere og lærlinge",
        body: "Sygefravær og lærlinge. Medarbejdertal og FTE kan hentes fra Zenegy, og køn kan indlæses med en løn-CSV.",
      },
      {
        title: "Affald fordelt på fraktioner",
        body: "Fx metal, plast og træ, så kunderne kan se, hvordan I sorterer.",
      },
      {
        title: "Samlet i én rapport",
        body: "Tallene står i samme rapport som klimaregnskabet.",
      },
    ],
  },
  integrations: {
    title: "Bygget på de systemer, du allerede bruger",
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.",
  },
  contact: {
    title: "Få sparring fra en, der forstår produktion og energi",
    body: "Jeg er civilingeniør i energiteknologi og har i en årrække rådgivet danske produktionsvirksomheder om procesenergi, varmekonvertering, trykluft og solceller. Ringer du, får du ikke en sælger, men en der kender forskel på processtrøm og rumvarme. Er du i tvivl om kølemidler, procesvarme eller fragt, så tager vi det sammen.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør i energiteknologi og stifter af qlim8",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en uformel snak på 15 minutter",
      href: DEMO_HREF,
    },
  },
  faq: {
    title: "Ofte stillede spørgsmål fra produktion og industri",
    items: [
      {
        q: "Vi køber hundredvis af råvarer og komponenter. Hvordan griber vi Scope 3 an?",
        a: "Ingen forventer CO2-tal på hver møtrik fra første dag. qlim8 kategoriserer vareindkøbet ud fra bogføringen med spend-baserede faktorer fra EXIOBASE 3.8.2, et internationalt datasæt. Beløbene deflateres med Danmarks Statistiks forbrugerprisindeks, så prisstigninger ikke ligner mere CO2. Bagefter forfiner du de tungeste råvarer, fx stål eller granulat, med leverandørens egne tal.",
      },
      {
        q: "Kan vi lægge leverandørens egne CO2-tal ind?",
        a: "Ja. En PCF eller EPD fra leverandøren kan uploades i qlim8 som PDF eller XML efter EN 15804/ILCD. Når produktlinjen er koblet til den godkendte PCF eller EPD, bruges leverandørens tal frem for den generiske faktor. Skifter du til genanvendt granulat med et lavere tal, slår det igennem i regnskabet.",
      },
      {
        q: "Kan vi give kunden CO2-tallet for et bestemt emne, vi producerer?",
        a: "Ikke i dag. qlim8 opgør klimaregnskabet for hele virksomheden og fordeler ikke udledningen på produkter, emner eller kunder. Kunden kan få virksomhedens samlede tal i VSME-rapporten. Bruger kunden selv qlim8, kan de invitere dig som leverandør, og du kan dele din VSME Comprehensive-rapport med dem.",
      },
      {
        q: "Vi bruger et andet ERP end e-conomic, Dinero og Billy. Kan vi stadig bruge qlim8?",
        a: "Ja. qlim8 kan importere en CSV-fil fra regnskabssystemet, når den har kolonnerne dato og beløb, og Excel-filer kan uploades i upload-guiden. Der er også et REST API med API-nøgler. Dynamics 365 Business Central og Oracle NetSuite er tilgængelige som integrationer, og Uniconta er i beta.",
      },
      {
        q: "Kan vores revisor tjekke tallene?",
        a: "Ja. Hver udledningslinje i qlim8 har sit eget ID og kan spores tilbage til bilaget eller måleraflæsningen. Excel-rapporten viser linjens dato, kategori, mængde, emissionsfaktor og kilde, og revisionssporet kan ikke redigeres eller slettes i programmet. Revisoren, du inviterer, får læseadgang uden at kunne ændre tal. Revisoren kan attestere rapporten, og kontoen er gratis.",
      },
      {
        q: "Hvad koster qlim8, og binder vi os til noget?",
        a: "Free er gratis, har ingen udløbsdato og ingen binding, og du behøver ikke kreditkort. Med Free forbinder du Eloverblik og ét regnskabsprogram og ser dit eget klimaregnskab. Betalte pakker faktureres årligt, og prisen vises pr. måned ekskl. moms. Indholdet ser du på siden med priser. [[Starter koster {pris:starter} om måneden, betalt årligt.]]",
      },
    ],
  },
  closingCta: {
    title: "Få ro på kundekravene, før det næste skema lander",
    description: "Opret en gratis konto, og se dit klimaregnskab ud fra bogføringen og elmåleren. Eller tag 15 minutter med Mads om jeres produktion.",
    primary: {
      label: "Kom gratis i gang, helt uden binding",
      href: PRISER,
    },
    secondary: {
      label: "Book en uformel gennemgang (15 min)",
      href: DEMO_HREF,
    },
    trustLine: [
      "Oprettet på et par minutter",
      "Ingen binding, intet kreditkort",
      "Ring på +45 93 90 13 84",
    ],
  },
};

export const KT_REVISORER: MarketingPageCopy = {
  hero: {
    eyebrow: "For revisorer og rådgivere",
    title: "Klimaregnskaber og VSME-rapporter, der kan efterprøves linje for linje",
    subtitle: "Brug timerne på kontrol og rådgivning frem for datarensning i regneark. qlim8 bygger klimaregnskabet på kundens bogføring, og hver udledningslinje kan spores tilbage til bilaget eller måleraflæsningen.",
    primaryCta: {
      label: "Book en teknisk gennemgang (20 min)",
      href: DEMO_HREF,
    },
    secondaryCta: {
      label: "Opret gratis rådgiver-konto",
      href: PRISER_RAADGIVERE,
    },
    imageUrl: "",
    imageAlt: "En revisor ved et lyst træbord sammenligner en udledningslinje i qlim8 med bilaget på sin bærbare",
    trustLine: [
      "Bygger på GHG-protokollen og VSME",
      "Danske og internationale faktorer med kilde",
      "Revisionsspor, der ikke kan redigeres i programmet",
    ],
    microLine: "Revisorens konto er gratis · Ring direkte på +45 93 90 13 84",
  },
  reasons: {
    title: "Tre problemer, du møder i SMV-segmentet",
    intro: "I hjemmelavede regneark og i systemer, der ikke viser deres beregninger, går det typisk galt tre steder.",
    items: [
      {
        title: "Uklare emissionsfaktorer",
        body: "Det fremgår sjældent, hvilken faktor der er brugt, hvor den kommer fra, og om elforbruget er regnet med danske data eller et udenlandsk gennemsnit.",
      },
      {
        title: "Ingen kobling til bogføringen",
        body: "Der er ingen efterprøvelig forbindelse mellem bilagene og de mængder og beløb, klimaregnskabet bygger på. Så er fuldstændigheden svær at vurdere.",
      },
      {
        title: "Tiden går med indsamling",
        body: "Timerne bruges på at rykke for elregninger, brændstofopgørelser og bilag i stedet for på at kontrollere data og rådgive.",
      },
    ],
  },
  table: {
    title: "Metoden, komponent for komponent",
    intro: "",
    headers: {
      a: "Komponent",
      b: "Sådan virker det i qlim8",
      c: "Værdi for revisor og rådgiver",
    },
    rows: [
      {
        a: "Sporbarhed",
        b: "Hver udledningslinje har sit eget ID og kan spores tilbage til bilaget eller måleraflæsningen.",
        c: "Stikprøver starter i bilaget, ikke i et regneark.",
      },
      {
        a: "Faktorhierarki",
        b: "Leverandørens egen PCF/EPD først, så målte mængder (kWh, liter, kg) og til sidst indkøbsbeløb. Hver post viser sin datakvalitet.",
        c: "Du ser, hvad der er målt, og hvad der er estimeret.",
      },
      {
        a: "Emissionsfaktorer",
        b: "Klimakompasset til fysiske mængder, Energinet til el og EXIOBASE 3.8.2 til indkøb uden mængder.",
        c: "Faktor og kilde står på hver linje i Excel-rapporten.",
      },
      {
        a: "Scope 2",
        b: "Lokationsbaseret time for time med Energinets data og markedsbaseret med Energinets generelle eldeklaration.",
        c: "Begge opgørelser for el, uden egne mellemregninger.",
      },
      {
        a: "Revisionsspor",
        b: "Kan ikke redigeres eller slettes i programmet, og en hash-kæde viser, hvis en post er ændret.",
        c: "Kategoriskift kan efterprøves bagud med tidspunkt, bruger og tidligere værdi.",
      },
      {
        a: "Rapportering",
        b: "VSME i Basic-modulet og Comprehensive-modulet. Rapporterne findes som Excel og PDF og bygger på VSME, CSRD (ESRS E1) og GHG-protokollen.",
        c: "Samme rapport til erklæringsarbejdet, banken og bestyrelsen.",
      },
    ],
    note: "Personfelter i revisionssporet kan slettes efter en GDPR-anmodning.",
  },
  features: [
    {
      title: "Bogføringen som grundlag",
      body: "e-conomic, Dinero og Billy er direkte forbundet. Xero, QuickBooks Online, Dynamics 365 Business Central og Oracle NetSuite er tilgængelige, og Uniconta er i beta. Andre systemer kan levere CSV med dato og beløb.",
    },
    {
      title: "Elforbrug time for time",
      body: "Eloverblik leverer forbruget pr. målepunkt, når kunden har givet fuldmagt med MitID. Data hentes én gang om ugen.",
    },
    {
      title: "Kategorisering med gennemsyn",
      body: "Fakturalinjer kategoriseres automatisk, når systemet er sikkert nok. Usikre linjer går til gennemsyn, før de tæller med.",
    },
    {
      title: "Leverandørens egne tal",
      body: "PCF/EPD kan uploades som PDF eller XML efter EN 15804/ILCD. Er en produktlinje koblet til en godkendt PCF/EPD, bruges leverandørens tal.",
    },
    {
      title: "Medarbejderdata og API",
      body: "Zenegy leverer medarbejdertal, FTE og afdelinger pr. måned, og køn kan indlæses via løn-CSV. Kunden kan også bruge et REST API og en MCP-server til AI-assistenter som Claude og ChatGPT.",
    },
  ],
  integrations: {
    title: "Data fra de systemer, kunderne allerede bruger",
    footnote: "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.",
  },
  options: {
    title: "To måder at bruge qlim8 i din praksis",
    intro: "",
    items: [
      {
        title: "qlim8 som dit eget værktøj",
        body: "Kunden opretter en konto og inviterer dig. Fra ét konsulent-login arbejder du på tværs af dine kunder og bruger tiden på gennemsyn og rådgivning frem for indtastning.",
        bullets: [
          "Ét login til alle kunder, der har inviteret dig",
          "Kategoriskift logges altid med din begrundelse",
          "Reduktionsmål og Scenarier i samme klimaregnskab",
        ],
      },
      {
        title: "Kunden bruger qlim8 og inviterer dig som revisor",
        body: "Kunden står selv for opsamlingen og inviterer dig til kontrol eller attestering. Du får læseadgang til udledningslinjer, revisionsspor, bilag og rapporter og kan ikke ændre tal.",
        bullets: [
          "Download de rapporter, kunden har dannet, også VSME-Excel",
          "Attestér en rapport direkte i qlim8",
          "Revisorens egen konto er gratis",
        ],
      },
    ],
  },
  contact: {
    title: "Vil du se beregningsmotoren og datamodellen indefra?",
    body: "Når du booker en gennemgang, taler du direkte med mig og ikke med en sælger. Vi går datamodellen, emissionsfaktorerne, revisionssporet og VSME-strukturen igennem ud fra dine spørgsmål.",
    personName: "Mads Dahlén Lund-Nielsen",
    personRole: "Civilingeniør og stifter",
    phoneLine: "Ring direkte til mig på +45 93 90 13 84",
    emailLine: "Eller skriv til kontakt@qlim8.com",
    cta: {
      label: "Book en teknisk gennemgang (20 min)",
      href: DEMO_HREF,
    },
  },
  depth: {
    title: "Metoden i dybden",
    items: [
      {
        summary: "Faktorhierarki og datakvalitet",
        body: "For hver post bruger qlim8 den mest præcise kilde, der findes. Først leverandørens egen PCF eller EPD, når en produktlinje er koblet til et godkendt dokument. Dernæst målte mængder som kWh, liter og kg med faktorer fra Klimakompasset, og elforbrug med Energinets data. Til sidst indkøbsbeløbet med spend-baserede faktorer fra EXIOBASE 3.8.2, hvor beløbene deflateres med Danmarks Statistiks forbrugerprisindeks.\n\nHver post viser sin datakvalitet, så du kan rette kontrollen mod de poster, der er estimeret ud fra beløb. Biogen CO2 vises separat for de brændsler, der har en biogen faktor, og Scope 3 kan vises fordelt på de 15 GHG-kategorier i udforskningen.",
      },
      {
        summary: "Sådan er revisionssporet bygget",
        body: "Revisionssporet kan kun udvides. Poster kan ikke redigeres eller slettes i programmet, og en hash-kæde viser, hvis en post er ændret. Personfelter kan dog slettes efter en GDPR-anmodning.\n\nHver udledningslinje har sit eget ID, og ID'er og bilagsreferencer ligger samlet i revisionspakken. Når kunden har dannet en rapport, kan revisor attestere den.",
      },
    ],
  },
  faq: {
    title: "Tekniske spørgsmål fra revisorer og rådgivere",
    items: [
      {
        q: "Hvordan skelner qlim8 mellem aktivitetsdata og spend-baserede data?",
        a: "Hver post bygger på den mest præcise kilde, der findes, og viser sin datakvalitet. Leverandørens PCF/EPD og målte mængder som kWh, liter og kg går forud for indkøbsbeløb. Indkøb uden mængder beregnes med EXIOBASE 3.8.2, deflateret med Danmarks Statistiks forbrugerprisindeks.",
      },
      {
        q: "Opgør qlim8 Scope 2 både lokationsbaseret og markedsbaseret?",
        a: "Ja, for el. Den lokationsbaserede opgørelse regner time for time med Energinets data, og den markedsbaserede bruger Energinets generelle eldeklaration. Grønne elaftaler med oprindelsesgaranti kan registreres.",
      },
      {
        q: "Hvordan dokumenteres manuelle rettelser?",
        a: "Når en udledningslinje skifter kategori, gemmes tidspunktet, hvem der ændrede den, og den tidligere værdi i revisionssporet, som ikke kan redigeres i programmet. En konsulent skal altid give en begrundelse.",
      },
      {
        q: "Kan vi få beregningsgrundlaget til vores arbejdspapirer?",
        a: "Ja, gennem rapporterne og revisionspakken, som kunden danner. Excel-rapporten viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde, og revisionspakken indeholder unikke ID'er og bilagsreferencer. Som revisor downloader du de dannede rapporter og ser alle linjer, bilag og revisionsspor i platformen.",
      },
      {
        q: "Hvor ligger data, og hvordan er GDPR håndteret?",
        a: "Servere, database og fillager står i EU, i Tyskland (Hetzner, Nürnberg), og AI-leverandøren Ordbogen.ai er dansk. Data behandles efter GDPR med en databehandleraftale og deles kun med de underdatabehandlere, der står i den. Al trafik går over HTTPS.",
      },
      {
        q: "Hvordan er kundernes data adskilt, og hvem har adgang?",
        a: "Hver kundes data er adskilt, og hver forespørgsel tjekkes mod kontoen. Kunden har de faste roller administrator, redigerer og læser, og revisor og rådgiver får kun adgang, når kunden inviterer dem. Skræddersyede roller er planlagt.",
      },
      {
        q: "Hvad koster qlim8 for revisorer og rådgivere?",
        a: "Revisorens egen konto er gratis, og kunden betaler for sin egen pakke. Hvilke pakker der giver adgang for revisor og rådgiver, og hvilke vilkår en rådgiver-konto har, står på siden med pakkerne.",
      },
    ],
  },
  closingCta: {
    title: "Se metoden, før du stoler på tallene",
    description: "På 20 minutter gennemgår vi faktorhierarkiet, Scope 2 og revisionssporet i platformen.",
    primary: {
      label: "Book en teknisk gennemgang (20 min)",
      href: DEMO_HREF,
    },
    secondary: {
      label: "Se konti for revisorer og rådgivere",
      href: PRISER_RAADGIVERE,
    },
    trustLine: [
      "Revisorens konto er gratis",
      "Servere i EU (Tyskland)",
      "Du taler med stifteren",
    ],
  },
};
