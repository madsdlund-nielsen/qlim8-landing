import type { MarketingPageCopy, MarketingHubCopy } from "@/content/marketing/types";

// Kundetyper — batch B: Revisorer, Plastfabrikanter, Rådgivere, Konsulenter,
// Frisører, Store virksomheder. Danish long-form marketing copy, typed as data.
// Brand-voice + positioning per docs/da/marketing/_shared/*. Fixed CTA conventions.

const PRIMARY_CTA = {
  label: "Opret gratis konto",
  href: "https://app.qlim8.com/auth?tab=register",
};
const HERO_SECONDARY_CTA = { label: "Se priser", href: "/priser" };
const CLOSING_SECONDARY_CTA = { label: "Book demo", href: "/kontakt" };

// ---------------------------------------------------------------------------
// Revisorer — 3rd-party / partner audience
// ---------------------------------------------------------------------------

export const KT_REVISOR: MarketingPageCopy = {
  hero: {
    eyebrow: "For revisorer og bogholdere",
    title: "Tilbyd klimaregnskab som ydelse — uden licens-omkostning pr. klient",
    subtitle:
      "Dine kunder spørger allerede om CO₂e-tal. Med qlim8 håndterer du alle dine klienters klimaregnskab fra ét konsulent-login, mens klienten selv betaler abonnementet.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Klimaregnskab er en oplagt udvidelse af din praksis",
    body:
      "Data ligger allerede i den bogføring, du håndterer. Problemet er, at de fleste ESG-platforme er bygget til kunden — ikke til dig, der betjener 20 kunder på én gang. Så snart hver klient kræver sin egen licens og sit eget system at lære, æder det marginen på ydelsen, før du er begyndt. qlim8 vender det om. Vores tredjeparts-adgang giver dig ét login, der dækker ubegrænset klienter, og audit-pack-scope giver dig fuld lineage read-only: du ser hver kg CO₂e tilbage til kilde-fakturaen uden at kunne ændre klientens data ved en fejl. Du bygger en ny fakturerbar ydelse oven på det regnskabsarbejde, du allerede laver.",
    bullets: [
      "Ét konsulent-login dækker ubegrænset klienter — ingen seat-fee pr. kunde.",
      "Klient-tenant betaler abonnementet; du lægger ikke licens til dit eget regnskab.",
      "Audit-pack-scope: fuld lineage, read-only — bygget til revisorarbejde.",
      "Kryptografisk sign-off på rapporter, der låses efter din underskrift.",
    ],
  },
  painPoints: [
    {
      pain:
        "ESG-konsulentsoftware koster typisk pr. klient-licens. Med 20 kunder er licensen alene en fast omkostning, før du har faktureret en eneste time.",
      solution:
        "qlim8 lægger abonnementet hos klient-tenanten. Din tredjeparts-adgang koster ikke seat-fee — du tilføjer klienter uden at din egen omkostning stiger.",
      outcome:
        "0 kr. i licens-omkostning på din side; hele fakturaen er dækningsbidrag på arbejdet.",
    },
    {
      pain:
        "Hver ny platform har en indlæringskurve. Du har hverken tid eller lyst til at lære et helt nyt system for at kunne tilbyde ydelsen.",
      solution:
        "qlim8 trækker klimadata direkte fra det regnskab, du allerede kender (Dinero, e-conomic, Billy). Du arbejder i kategorier og bilag, der ligner det, du er vant til.",
      outcome:
        "Onboarding pr. klient på 1-3 dage, hvis regnskabssystemet er tilkoblet [antagelse: interne onboarding-estimater, ikke kundevalideret].",
    },
    {
      pain:
        "I Excel skalerer klimaregnskab ikke. Du kopierer mellem fil-versioner, og der er intet audit-spor, når klienten eller revisor spørger, hvor et tal kommer fra.",
      solution:
        "qlim8 logger hver kategori-ændring automatisk og holder fuld lineage pr. emission-post. Du kan altid dokumentere, hvorfor et tal ser ud, som det gør.",
      outcome:
        "Pilot-revisorer håndterer 4-6x flere klimaregnskab-klienter på qlim8 end i en Excel-baseret tilgang [antagelse: 3 pilot-revisor-interviews, bør valideres bredere].",
    },
    {
      pain:
        "Du er ansvarlig for det, du underskriver. En rapport, klienten kan ændre bagefter, er en risiko for din underskrift.",
      solution:
        "Sign-off-flowet er bygget til revisorpraksis. Din underskrift på en rapport er kryptografisk verificeret og låst — ændrer klienten regnskabet senere, forbliver den underskrevne version uændret.",
      outcome:
        "Den audit-integritet, som CSRD og VSME kræver, uden manuel versionsstyring.",
    },
    {
      pain:
        "Dine interne noter og forbehold hører til hos dig, ikke i klientens rapport. I et delt regneark ender de nemt det forkerte sted.",
      solution:
        "Privat kommentar-tråd pr. klient og pr. emission-post holder din interne dokumentation adskilt fra det, klienten ser.",
      outcome:
        "Intern dokumentation forbliver intern — pr. klient, pr. post.",
    },
  ],
  features: [
    {
      title: "Ét login, ubegrænset klienter",
      body:
        "Tredjeparts-adgangs-flowet giver dig ét konsulent-login med en liste over alle dine klient-tenants og rød/gul/grøn-status pr. rapport. Du klikker en klient og er inde — ingen skift mellem 20 separate konti, ingen ny licens pr. relation.",
    },
    {
      title: "Audit-pack-scope: read-only med fuld lineage",
      body:
        "Audit-pack-scope giver dig fuld sporbarhed uden write-access. Du ser hver emission tilbage til den underliggende faktura, men kan ikke utilsigtet ændre klientens tal. Det er præcis den adgang, revisorarbejde kræver.",
    },
    {
      title: "Kryptografisk sign-off",
      body:
        "Når rapporten er klar, anmoder du om underskrift. Din sign-off er kryptografisk verificeret og låst til den version, du godkendte. Selv hvis regnskabet ændres bagefter, står den underskrevne rapport uændret — audit-sikker efter CSRD- og VSME-standard.",
    },
    {
      title: "Hvid-mærket rapport",
      body:
        "Klimaregnskabet leveres i underskrifts-klar PDF, du kan sende videre i din egen praksis' kontekst. Klienten får et professionelt dokument, du kan stå inde for, uden manuel reformatering.",
    },
    {
      title: "VSME- og CSRD-skabeloner",
      body:
        "Rapporterne følger VSME Basic, VSME Comprehensive og CSRD-strukturen med GHG Protocol-konsistent output. Du vælger den standard, klienten skal rapportere efter, i stedet for at bygge skabelonen selv.",
    },
    {
      title: "Scenario Planner som rådgivningsværktøj",
      body:
        "For dig, der vil rådgive og ikke kun rapportere: Scenario Planner og tiltags-værktøjet lader dig vise klienten, hvad konkrete reduktioner betyder for regnskabet. Ydelsen bliver løbende, ikke en engangs-rapport.",
    },
  ],
  valueStats: [
    {
      value: "4-6x",
      label: "flere klimaregnskab-klienter pr. revisor",
      note: "vs. Excel-baseret tilgang [antagelse: 3 pilot-revisor-interviews]",
    },
    {
      value: "0 kr.",
      label: "licens-omkostning på din side",
      note: "klient-tenant betaler abonnementet",
    },
    {
      value: "15.000-40.000 kr.",
      label: "typisk fakturering pr. klient/år",
      note: "[antagelse: markeds-research, bør splittes pr. virksomhedsstørrelse]",
    },
    {
      value: "1-3 dage",
      label: "onboarding pr. klient",
      note: "hvis regnskabssystem er tilkoblet [antagelse]",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — revisorer og bogholdere",
    items: [
      {
        q: "Skal jeg betale en licens pr. klient?",
        a: "Nej. Klient-tenanten betaler selv sit abonnement (Starter fra 250 kr/md, Premium 625 kr/md). Din tredjeparts-adgang koster ikke seat-fee, så du kan tilføje ubegrænset klienter uden at din egen omkostning stiger.",
      },
      {
        q: "Kan jeg komme til at ændre en klients data ved en fejl?",
        a: "Nej. Audit-pack-scope er read-only. Du ser fuld lineage — hver kg CO₂e tilbage til kilde-fakturaen — men du har ikke write-access til klientens tal. Det er designet, så du ikke utilsigtet kan ændre noget under et revisorforløb.",
      },
      {
        q: "Hvordan fungerer sign-off, og holder den ved revision?",
        a: "Når rapporten er klar, anmoder du om underskrift. Din sign-off er kryptografisk verificeret og låst til den godkendte version. Ændrer klienten regnskabet bagefter, forbliver den underskrevne rapport uændret. Det giver den audit-integritet, CSRD og VSME kræver.",
      },
      {
        q: "Hvilke regnskabssystemer kan jeg trække data fra?",
        a: "qlim8 integrerer native med danske regnskabssystemer som Dinero, e-conomic og Billy samt Eloverblik for elforbrug. Data flyder ind i klimaregnskabet, så du arbejder med bilag og kategorier, du kender fra dit almindelige regnskabsarbejde.",
      },
      {
        q: "Hvor mange klienter kan én revisor realistisk håndtere?",
        a: "Pilot-revisorer fortæller, at de kan håndtere 4-6x flere klimaregnskab-klienter på qlim8 end i en Excel-baseret tilgang [antagelse: 3 pilot-revisor-interviews]. Det tal bør valideres på flere praksisser, men retningen er, at ét login og automatisk datatræk fjerner det manuelle flaskehalsarbejde.",
      },
      {
        q: "Kan jeg rapportere efter både VSME og CSRD?",
        a: "Ja. qlim8 understøtter VSME Basic, VSME Comprehensive og CSRD med GHG Protocol-konsistent output. Du vælger standarden pr. klient afhængigt af, hvad de er forpligtet til.",
      },
    ],
  },
  closingCta: {
    title: "Byg en fakturerbar klimaregnskab-ydelse oven på din praksis",
    description:
      "Opret en gratis konto og se konsulent-flowet med audit-pack-scope og sign-off, eller book en demo, hvor vi går det igennem med revisorbriller.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Plastik fabrikanter — energy-intensive manufacturing
// ---------------------------------------------------------------------------

export const KT_PLASTFABRIKANT: MarketingPageCopy = {
  hero: {
    eyebrow: "For plastikproducenter",
    title: "Fra energitung produktion til dokumenteret CO₂e-regnskab",
    subtitle:
      "Din produktion er el-tung, dine råvarer vejer i Scope 3, og dine kunder begynder at spørge om CO₂e pr. produkt. qlim8 samler det i ét klimaregnskab, du kan stå inde for.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Klimaregnskabet skal kunne følge med produktionen",
    body:
      "For en plastikproducent ligger CO₂e-aftrykket to steder: i den energi, ekstruderingen og sprøjtestøbningen bruger (Scope 1 og 2), og i det granulat og de råvarer, du køber ind (Scope 3). Oveni presser kunderne på med krav om produkt-specifikke tal, og CSRD begynder at forplante sig op gennem værdikæden. qlim8 trækker elforbruget direkte fra Eloverblik og bygger et GHG Protocol-konsistent klimaregnskab oven på din bogføring — inklusive et produkt-carbon-footprint (PCF), du kan give videre til kunden. Vær opmærksom på afgrænsningen: vi laver corporate carbon accounting og PCF, ikke fuld cradle-to-grave livscyklus-analyse (LCA) med miljømærkning. Skal du bruge et detaljeret EPD-miljømærke, er det et LCA-værktøj, du skal supplere med.",
    bullets: [
      "Scope 1+2 fra din energi — elforbrug hentes automatisk fra Eloverblik.",
      "Scope 3 fra råvarer og granulat, bygget på dine indkøbsdata.",
      "Produkt-carbon-footprint (PCF), du kan dele med kunder.",
      "GHG Protocol-konsistent output til VSME- og CSRD-rapportering.",
    ],
  },
  painPoints: [
    {
      pain:
        "Produktionen er el-tung, men elforbruget står i afregninger og målere spredt over året. At samle det manuelt til et klimaregnskab er tidskrævende og fejlbehæftet.",
      solution:
        "qlim8 henter dit elforbrug direkte fra Eloverblik og omregner det med DK-specifikke faktorer (Energinet, AIB residual mix). Scope 1 fra brændstof og procesudledning føjes til på dine egne data.",
      outcome:
        "Scope 1+2-grundlaget bygget automatisk i stedet for at samle måleraflæsninger i hånden.",
    },
    {
      pain:
        "Granulat og råvarer er den største post i dit aftryk, men leverandørerne oplyser sjældent CO₂e, og du ender med at gætte.",
      solution:
        "qlim8 kategoriserer dine indkøb og sætter emissionsfaktorer på råvarerne, så Scope 3 kategori 1 (indkøbte varer) bliver et dokumenteret tal med kilde — ikke et skøn.",
      outcome:
        "Sporbart Scope 3-indkøbstal med citation pr. faktor, klar til revision.",
    },
    {
      pain:
        "Store kunder begynder at kræve CO₂e pr. leveret produkt. Uden et tal risikerer du at ryge ud af udbud eller leverandør-vurderinger.",
      solution:
        "qlim8 beregner et produkt-carbon-footprint (PCF) på virksomheds- og produktniveau, du kan dele direkte med kunden i et struktureret format.",
      outcome:
        "Et PCF-tal at svare med, når kundens indkøb spørger — i stedet for 'det har vi ikke'.",
    },
    {
      pain:
        "CSRD rammer dine større kunder først, og de sender kravet videre ned i værdikæden til dig som leverandør.",
      solution:
        "Bliver du inviteret ind i en kundes værdikæde-portal, deler du kun det relevante Scope 3-tal — ikke hele dit regnskab — med audit-log og dato på hver delt værdi.",
      outcome:
        "Du svarer på kundens CSRD-krav på minutter i stedet for dage med email-frem-og-tilbage.",
    },
    {
      pain:
        "Du er usikker på, om qlim8 kan levere det fulde miljømærke (EPD), dine kunder nogle gange spørger efter.",
      solution:
        "Vær ærlig med dig selv om behovet: qlim8 leverer corporate carbon accounting og PCF, ikke fuld cradle-to-grave LCA. Skal du have et akkrediteret EPD-miljømærke, kombinerer du qlim8 med et dedikeret LCA-værktøj.",
      outcome:
        "Klarhed over hvad du får — et solidt CO₂e-regnskab og PCF — uden falske løfter om LCA.",
    },
  ],
  features: [
    {
      title: "Eloverblik-integration",
      body:
        "Dit elforbrug hentes automatisk fra Eloverblik og omregnes med DK-specifikke emissionsfaktorer. For en el-tung produktion er det den tungeste post i Scope 2, og den er nu et løbende, korrekt tal frem for en årlig manuel opgørelse.",
    },
    {
      title: "Scope 3 på råvarer og granulat",
      body:
        "qlim8 kategoriserer dine indkøb og påfører emissionsfaktorer, så råvarer og granulat bliver til et dokumenteret Scope 3 kategori 1-tal. Hver faktor har en kilde-citation, du kan fremvise ved revision.",
    },
    {
      title: "Produkt-carbon-footprint (PCF)",
      body:
        "Beregn et CO₂e-tal på produktniveau, du kan dele med kunder, der stiller krav. Det er svaret, når indkøb spørger om produktets aftryk — leveret i et struktureret format i stedet for et løst estimat.",
    },
    {
      title: "Værdikæde-svar til dine kunder",
      body:
        "Når en større kunde inviterer dig ind i sin værdikæde-portal, deler du kun det relevante tal med audit-log og dato. Du bidrager til deres CSRD-rapportering uden at udlevere hele dit eget regnskab.",
    },
    {
      title: "VSME- og CSRD-klar rapportering",
      body:
        "Regnskabet kommer ud GHG Protocol-konsistent efter VSME Basic, VSME Comprehensive eller CSRD-struktur. Du vælger den standard, dine kunder og din bank forventer, uden at bygge skabelonen selv.",
    },
    {
      title: "Scenario Planner for reduktioner",
      body:
        "Overvej du at skifte til grøn strøm eller genanvendt granulat? Scenario Planner viser, hvad tiltaget betyder for dit samlede aftryk, før du investerer — så beslutningen bygger på et tal, ikke en fornemmelse.",
    },
  ],
  valueStats: [
    {
      value: "Scope 1+2+3",
      label: "samlet i ét regnskab",
      note: "energi, råvarer og indkøb",
    },
    {
      value: "Auto",
      label: "elforbrug fra Eloverblik",
      note: "DK-specifikke faktorer",
    },
    {
      value: "PCF",
      label: "produkt-tal til kunder",
      note: "corporate carbon accounting + PCF, ikke fuld LCA",
    },
    {
      value: "3-4 uger",
      label: "sparet pr. rapporteringscyklus",
      note: "[antagelse: interne tidsmålinger, ikke kundevalideret]",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — plastikproducenter",
    items: [
      {
        q: "Kan qlim8 håndtere vores el-tunge produktion?",
        a: "Ja. Dit elforbrug hentes automatisk fra Eloverblik og omregnes med DK-specifikke faktorer (Energinet, AIB residual mix). For en energitung produktion er Scope 2 typisk den største post, og den bliver et løbende korrekt tal frem for en manuel årsopgørelse.",
      },
      {
        q: "Hvordan får vi CO₂e på vores råvarer og granulat?",
        a: "qlim8 kategoriserer dine indkøb og påfører emissionsfaktorer, så råvarer bliver til et dokumenteret Scope 3 kategori 1-tal med kilde-citation. Hvor en leverandør selv oplyser et produkt-CO₂e, kan det tal bruges i stedet for en generisk faktor.",
      },
      {
        q: "Kan vi levere et produkt-CO₂e-tal til vores kunder?",
        a: "Ja. qlim8 beregner et produkt-carbon-footprint (PCF), du kan dele i struktureret format, når kunder stiller krav. Bemærk, at et PCF ikke er det samme som et akkrediteret EPD-miljømærke — se spørgsmålet om LCA nedenfor.",
      },
      {
        q: "Laver qlim8 en fuld LCA / EPD-miljømærkning?",
        a: "Nej. qlim8 laver corporate carbon accounting og PCF, ikke fuld cradle-to-grave livscyklus-analyse (LCA) med miljømærkning. Har du brug for et akkrediteret EPD, skal du supplere med et dedikeret LCA-værktøj. Vi er ærlige om den afgrænsning frem for at love mere, end vi bygger.",
      },
      {
        q: "Vores største kunde er CSRD-pligtig — hvad betyder det for os?",
        a: "CSRD-krav forplanter sig ned i værdikæden. Bliver du inviteret ind i en kundes værdikæde-portal, deler du kun det relevante Scope 3-tal med audit-log og dato, uden at udlevere hele dit regnskab. Du bidrager til kundens rapportering på minutter frem for dage.",
      },
      {
        q: "Hvad koster det?",
        a: "qlim8 starter fra 250 kr/md på Starter-planen, og Premium er 625 kr/md. For en produktionsvirksomhed med Scope 3-behov og PCF er det typisk Premium eller derover, der passer. Se prissiden for detaljerne.",
      },
    ],
  },
  closingCta: {
    title: "Få styr på Scope 1, 2 og 3 for din produktion",
    description:
      "Opret en gratis konto, kobl Eloverblik på, og se dit energi- og råvareaftryk samlet i ét regnskab — eller book en demo, hvor vi gennemgår PCF og værdikæde-svar.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Rådgivere — advisors / engineering consultancies (3rd-party)
// ---------------------------------------------------------------------------

export const KT_RAADGIVER: MarketingPageCopy = {
  hero: {
    eyebrow: "For rådgivere og ingeniørhuse",
    title: "Rådgiv på klima og ESG med data i stedet for regneark",
    subtitle:
      "Dine kunder beder om ESG-rådgivning, men dit grundlag ligger i skrøbelige Excel-ark. Med qlim8 rådgiver du på et levende klimaregnskab med sporbarhed og adgang på tværs af kunder.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Rådgivning skalerer ikke på regneark",
    body:
      "Som rådgiver eller ingeniørhus er klima og ESG en naturlig udvidelse af det, du allerede laver for kunderne. Men når hvert kunde-projekt er et nyt regneark, du bygger fra bunden, kan du ikke tage flere opgaver uden at ansætte flere hænder. Grundlaget er heller ikke sporbart: når kunden — eller kundens revisor — spørger, hvor et tal kommer fra, mangler du kildehenvisningen. qlim8 giver dig ét rådgiver-login med adgang til alle dine kunders klimaregnskab via tredjeparts-adgang. Data trækkes automatisk fra kundens regnskab, hver emission har fuld lineage, og du rådgiver på et fælles, opdateret grundlag i stedet for at vedligeholde 20 løsrevne filer.",
    bullets: [
      "Ét rådgiver-login på tværs af alle dine kunder.",
      "Kunde-tenant betaler abonnementet — ingen licens hos dig.",
      "Fuld lineage pr. emission — sporbart rådgivningsgrundlag.",
      "Scenario Planner og tiltag som konkrete rådgivningsværktøjer.",
    ],
  },
  painPoints: [
    {
      pain:
        "Hvert kunde-projekt starter som et blankt regneark. Du kan ikke tage flere ESG-opgaver, uden at timerne per rapport bliver din flaskehals.",
      solution:
        "qlim8 trækker kundens klimadata automatisk fra regnskabet, så du starter med et udfyldt grundlag i stedet for et tomt ark. Du bruger tiden på rådgivning frem for datasamling.",
      outcome:
        "Markant flere ESG-opgaver pr. fakturerbar time, fordi datasamlingen er automatiseret [antagelse: interne estimater, ikke kundevalideret].",
    },
    {
      pain:
        "Når kunden eller revisor spørger, hvor et tal kommer fra, kan du ikke pege på kilden i et regneark uden at grave i gamle bilag.",
      solution:
        "Hver emission i qlim8 har fuld lineage tilbage til kilde-fakturaen med faktor-citation. Du kan altid dokumentere, hvorfor et tal ser ud, som det gør.",
      outcome:
        "Rådgivning, der holder ved revision — ingen 'det tal kan jeg ikke lige forklare'.",
    },
    {
      pain:
        "Du vil rådgive proaktivt om reduktioner, men uden et værktøj er scenarier og tiltag noget, du regner i hånden hver gang.",
      solution:
        "Scenario Planner lader dig modellere konkrete tiltag — grøn strøm, transportskift, materialevalg — og vise kunden effekten på det samlede regnskab, før de investerer.",
      outcome:
        "Reduktionsrådgivning bakket op af tal i stedet for et fagligt skøn.",
    },
    {
      pain:
        "At administrere en separat licens og et separat login pr. kunde er både dyrt og bøvlet, når du betjener mange på én gang.",
      solution:
        "qlim8 samler alle dine kunder under ét rådgiver-login via tredjeparts-adgang. Kunde-tenanten betaler abonnementet, så du ikke lægger licens-omkostning til din egen drift.",
      outcome:
        "Ingen seat-fee pr. kunde; du skalerer portefølje uden tilsvarende omkostning.",
    },
    {
      pain:
        "Kunden har brug for at rapportere efter VSME eller CSRD, og du vil ikke bygge og vedligeholde skabelonerne selv.",
      solution:
        "qlim8 leverer GHG Protocol-konsistent output efter VSME Basic, VSME Comprehensive og CSRD. Du vælger standarden pr. kunde og lader platformen holde skabelonen opdateret.",
      outcome:
        "Kunden får en compliant rapport, uden at du vedligeholder regneark-skabeloner.",
    },
  ],
  features: [
    {
      title: "Rådgiver-login på tværs af kunder",
      body:
        "Tredjeparts-adgang giver dig ét login med en oversigt over alle dine kunders klimaregnskab og deres rapport-status. Du skifter mellem kunder uden at logge ud, og du betaler ikke licens pr. relation.",
    },
    {
      title: "Automatisk datagrundlag",
      body:
        "Kundens data trækkes fra regnskabssystemet (Dinero, e-conomic, Billy) og Eloverblik. Du starter hvert forløb med et udfyldt klimaregnskab i stedet for et tomt regneark, så timerne går til rådgivning.",
    },
    {
      title: "Fuld lineage og faktor-citation",
      body:
        "Hver emission kan spores tilbage til kilde-fakturaen, og hver emissionsfaktor har en citation. Dit rådgivningsgrundlag er dokumenteret og holder, når kundens revisor stiller spørgsmål.",
    },
    {
      title: "Scenario Planner og tiltag",
      body:
        "Modellér konkrete reduktionstiltag og vis kunden effekten på det samlede aftryk, før beslutningen tages. Rådgivningen bliver kvantificeret — et tal på bordet frem for et fagligt gæt.",
    },
    {
      title: "VSME- og CSRD-rapportering",
      body:
        "Leverér GHG Protocol-konsistent output efter den standard, kunden er forpligtet til. qlim8 holder skabelonen opdateret, så du rådgiver om indholdet frem for at vedligeholde formatet.",
    },
    {
      title: "Klientadgang uden write-risiko",
      body:
        "Har du kun brug for at læse og rådgive, giver audit-pack-scope dig fuld indsigt read-only. Du ser alt, men kan ikke utilsigtet ændre kundens data under et forløb.",
    },
  ],
  valueStats: [
    {
      value: "Ét login",
      label: "på tværs af alle kunder",
      note: "tredjeparts-adgang, ingen seat-fee",
    },
    {
      value: "0 kr.",
      label: "licens-omkostning hos dig",
      note: "kunde-tenant betaler abonnementet",
    },
    {
      value: "Fuld lineage",
      label: "pr. emission",
      note: "sporbart rådgivningsgrundlag",
    },
    {
      value: "3-4 uger",
      label: "sparet pr. kunde-rapportering",
      note: "[antagelse: interne tidsmålinger, ikke kundevalideret]",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — rådgivere",
    items: [
      {
        q: "Hvordan får jeg adgang til mine kunders klimaregnskab?",
        a: "Via qlim8's tredjeparts-adgang. Kunden inviterer dig ind, og du får adgang fra dit eget rådgiver-login. Du kan have ubegrænset kunder under det ene login uden at betale seat-fee pr. relation.",
      },
      {
        q: "Betaler jeg for hver kunde, jeg rådgiver?",
        a: "Nej. Kunde-tenanten betaler selv sit abonnement (Starter fra 250 kr/md, Premium 625 kr/md). Din adgang som rådgiver koster ikke ekstra, så du lægger ikke licens-omkostning til din egen drift.",
      },
      {
        q: "Kan jeg bruge qlim8 til reduktionsrådgivning, ikke kun rapportering?",
        a: "Ja. Scenario Planner og tiltags-værktøjet lader dig modellere konkrete reduktioner og vise kunden effekten på det samlede regnskab, før de investerer. Rådgivningen bliver kvantificeret frem for et fagligt skøn.",
      },
      {
        q: "Hvor sikker er dataen, når kundens revisor kigger med?",
        a: "Hver emission har fuld lineage tilbage til kilde-fakturaen, og hver emissionsfaktor har en citation. Kategori-ændringer logges automatisk, så rådgivningsgrundlaget er sporbart og holder ved revision.",
      },
      {
        q: "Kan jeg få read-only adgang, så jeg ikke ændrer kundens tal?",
        a: "Ja. Audit-pack-scope giver dig fuld indsigt read-only. Du ser alt og kan rådgive, men har ikke write-access, så du ikke utilsigtet ændrer kundens data under et forløb.",
      },
      {
        q: "Hvilke standarder kan jeg rapportere efter?",
        a: "qlim8 understøtter VSME Basic, VSME Comprehensive og CSRD med GHG Protocol-konsistent output. Du vælger standarden pr. kunde afhængigt af, hvad de er forpligtet til.",
      },
    ],
  },
  closingCta: {
    title: "Skalér din ESG-rådgivning på et sporbart grundlag",
    description:
      "Opret en gratis konto og prøv rådgiver-flowet med tredjeparts-adgang, eller book en demo, hvor vi viser Scenario Planner og lineage på rigtige data.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Konsulenter — sustainability consultants (3rd-party)
// ---------------------------------------------------------------------------

export const KT_KONSULENT: MarketingPageCopy = {
  hero: {
    eyebrow: "For bæredygtighedskonsulenter",
    title: "Lever målbare klimaregnskaber og reduktionsplaner til flere kunder",
    subtitle:
      "Du vil levere klimaregnskab og reduktionsplaner, der kan måles og følges — ikke en engangs-rapport. qlim8 giver dig værktøjerne til at gøre det effektivt på tværs af hele din kundeportefølje.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Fra engangs-rapport til målbar, løbende leverance",
    body:
      "Som bæredygtighedskonsulent er din værdi ikke selve regnearket — det er de reduktioner, du hjælper kunden med at nå. Men når hvert klimaregnskab bygges manuelt, går det meste af tiden til datasamling, og reduktionsplanen bliver et statisk dokument, ingen følger op på. qlim8 vender forholdet om. Data trækkes automatisk fra kundens regnskab, så du starter med et grundlag, ikke et tomt ark. Scenario Planner og tiltags-værktøjet lader dig bygge reduktionsplaner, der er kvantificerede og kan spores over tid. Og med tredjeparts-adgang håndterer du hele din portefølje fra ét konsulent-login, uden at betale licens pr. kunde. Du leverer det, kunden faktisk køber — målbar fremdrift — til flere kunder på samme tid.",
    bullets: [
      "Automatisk datagrundlag — mindre tid på indsamling, mere på rådgivning.",
      "Scenario- og tiltags-værktøj til kvantificerede reduktionsplaner.",
      "Ét konsulent-login til hele porteføljen via tredjeparts-adgang.",
      "Målsætninger og reduktion-tracking, der følges hele året.",
    ],
  },
  painPoints: [
    {
      pain:
        "Størstedelen af timerne på et klimaregnskab går til at samle og kategorisere data, ikke til den rådgivning, kunden betaler for.",
      solution:
        "qlim8 trækker data automatisk fra kundens regnskab og kategoriserer indkøb, så du starter med et udfyldt grundlag. Din tid flytter fra dataarbejde til analyse og reduktion.",
      outcome:
        "Flere kunder pr. konsulent, fordi datasamlingen ikke længere er flaskehalsen [antagelse: interne estimater, ikke kundevalideret].",
    },
    {
      pain:
        "Reduktionsplanen ender som et PDF-dokument i en skuffe. Ingen følger op, og du kan ikke vise kunden, om de nåede målet.",
      solution:
        "qlim8 har målsætninger og reduktion-tracking indbygget. Du sætter mål, kobler tiltag på, og både du og kunden ser fremdriften mod målet løbende i platformen.",
      outcome:
        "Reduktionsplanen bliver et levende værktøj, der binder kunden til en løbende leverance.",
    },
    {
      pain:
        "Når du foreslår et tiltag, mangler du et hurtigt, troværdigt tal for, hvad det betyder for kundens samlede aftryk.",
      solution:
        "Scenario Planner lader dig modellere konkrete tiltag og se effekten på det samlede regnskab, før kunden beslutter. Anbefalingen bygger på et tal, ikke et skøn.",
      outcome:
        "Kvantificerede anbefalinger, kunden kan træffe investeringsbeslutninger på.",
    },
    {
      pain:
        "At jonglere separate licenser og logins for hver kunde bremser dig, og pr.-kunde-omkostningen æder marginen på små opgaver.",
      solution:
        "Tredjeparts-adgang samler hele din portefølje under ét konsulent-login. Kunde-tenanten betaler abonnementet, så du ikke lægger licens til din egen drift.",
      outcome:
        "Ingen seat-fee pr. kunde; du kan tage også de mindre opgaver rentabelt.",
    },
    {
      pain:
        "Kunden skal kunne rapportere compliant til bank, kunde eller udbud, og du vil ikke bygge VSME/CSRD-skabelonerne fra bunden.",
      solution:
        "qlim8 leverer GHG Protocol-konsistent output efter VSME Basic, VSME Comprehensive og CSRD. Skabelonen holdes opdateret, så du fokuserer på indholdet og reduktionerne.",
      outcome:
        "Compliant rapportering ud af boksen, mens du bruger tiden på strategien.",
    },
  ],
  features: [
    {
      title: "Konsulent-login til hele porteføljen",
      body:
        "Tredjeparts-adgang giver dig ét login med oversigt over alle dine kunders klimaregnskab og rapport-status. Du håndterer porteføljen fra ét sted uden at betale licens pr. kunde.",
    },
    {
      title: "Scenario Planner",
      body:
        "Modellér konkrete reduktionstiltag og se effekten på kundens samlede aftryk, før beslutningen tages. Dine anbefalinger bliver kvantificerede — et tal på bordet i stedet for et fagligt gæt.",
    },
    {
      title: "Målsætninger og reduktion-tracking",
      body:
        "Sæt mål for kunden, kobl tiltag på, og følg fremdriften mod målet løbende. Reduktionsplanen bliver et levende værktøj hele året, ikke et statisk dokument efter rapporten.",
    },
    {
      title: "Automatisk datagrundlag",
      body:
        "Kundens data trækkes fra regnskabssystem og Eloverblik og kategoriseres automatisk. Du starter hvert forløb med et udfyldt regnskab, så timerne går til analyse og rådgivning frem for indtastning.",
    },
    {
      title: "VSME- og CSRD-rapportering",
      body:
        "Leverér GHG Protocol-konsistent output efter den standard, kunden er forpligtet til. Platformen holder skabelonen opdateret, så din leverance er compliant uden vedligehold af regneark.",
    },
    {
      title: "Sporbart grundlag til revision",
      body:
        "Hver emission har fuld lineage tilbage til kilden, og kategori-ændringer logges automatisk. Når kundens bank eller revisor spørger, kan både du og kunden dokumentere tallene.",
    },
  ],
  valueStats: [
    {
      value: "Ét login",
      label: "til hele porteføljen",
      note: "tredjeparts-adgang, ingen seat-fee",
    },
    {
      value: "Målbar",
      label: "reduktion-tracking",
      note: "mål + tiltag følges hele året",
    },
    {
      value: "Kvantificeret",
      label: "scenarie-planlægning",
      note: "effekt før investering",
    },
    {
      value: "3-4 uger",
      label: "sparet pr. kunde-rapportering",
      note: "[antagelse: interne tidsmålinger, ikke kundevalideret]",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — konsulenter",
    items: [
      {
        q: "Kan jeg håndtere flere kunder fra ét login?",
        a: "Ja. Med tredjeparts-adgang har du ét konsulent-login med adgang til alle dine kunders klimaregnskab. Kunden inviterer dig ind, og du kan have ubegrænset kunder uden at betale seat-fee pr. relation.",
      },
      {
        q: "Hvordan bygger jeg en reduktionsplan, kunden faktisk følger?",
        a: "qlim8 kombinerer Scenario Planner med målsætninger og reduktion-tracking. Du modellerer tiltag, sætter mål og kobler tiltagene på, så både du og kunden kan følge fremdriften mod målet løbende — planen bliver et levende værktøj frem for et PDF i en skuffe.",
      },
      {
        q: "Kan jeg vise kunden effekten af et tiltag, før de investerer?",
        a: "Ja. Scenario Planner lader dig modellere et konkret tiltag og se, hvad det betyder for kundens samlede aftryk, før beslutningen tages. Anbefalingen bygger på et tal frem for et skøn.",
      },
      {
        q: "Betaler jeg licens pr. kunde?",
        a: "Nej. Kunde-tenanten betaler selv abonnementet (Starter fra 250 kr/md, Premium 625 kr/md). Din adgang som konsulent koster ikke ekstra, så du kan tage også mindre opgaver rentabelt.",
      },
      {
        q: "Kan mine kunder rapportere compliant efter VSME og CSRD?",
        a: "Ja. qlim8 leverer GHG Protocol-konsistent output efter VSME Basic, VSME Comprehensive og CSRD. Du vælger standarden pr. kunde, og platformen holder skabelonen opdateret.",
      },
      {
        q: "Hvor meget tid sparer jeg reelt pr. kunde?",
        a: "Automatisk datatræk fjerner størstedelen af det manuelle indsamlingsarbejde. Vores interne estimat er 3-4 uger sparet pr. rapporteringscyklus [antagelse: interne tidsmålinger, ikke kundevalideret]. Den præcise gevinst afhænger af kundens datamodenhed og hvilke systemer der er tilkoblet.",
      },
    ],
  },
  closingCta: {
    title: "Lever målbar klimafremdrift til flere kunder",
    description:
      "Opret en gratis konto og prøv Scenario Planner og reduktion-tracking, eller book en demo, hvor vi går konsulent-flowet igennem på tværs af en portefølje.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Frisør — small service business example
// ---------------------------------------------------------------------------

export const KT_FRISOER: MarketingPageCopy = {
  hero: {
    eyebrow: "For frisørsaloner",
    title: "Dit klimaregnskab klaret på en eftermiddag",
    subtitle:
      "Din bank, din leverandør eller din kæde beder om ESG-tal, men du har ikke en bæredygtighedsafdeling. qlim8 laver et ærligt klimaregnskab for salonen ud fra det, du allerede har: el, vand og produkter.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Lille virksomhed, rigtig anmodning — men enkel at svare på",
    body:
      "En frisørsalon har et lille CO₂e-aftryk sammenlignet med en fabrik, og det skal copyen ikke lade som om andet. Men det ændrer ikke på, at banken, en leverandør eller kæden pludselig beder om et klimaregnskab, og at du ikke har tid til at lære CSRD for at svare. Værdien i qlim8 for dig er ikke omfang — det er fart og enkelhed. Vi trækker dit elforbrug fra Eloverblik og bygger et regnskab oven på din bogføring, så du får et klar-til-brug dokument uden at ansætte en konsulent. Du bruger en eftermiddag, ikke en måned, og du får et ærligt, GHG Protocol-konsistent tal, du kan sende videre med ro i maven.",
    bullets: [
      "Bygget til små virksomheder uden ESG-specialist.",
      "El fra Eloverblik, vand og produkter fra din bogføring.",
      "Klar-til-brug rapport til bank, leverandør eller kæde.",
      "En eftermiddags arbejde — ikke et konsulent-projekt.",
    ],
  },
  painPoints: [
    {
      pain:
        "Banken, en leverandør eller din kæde har bedt om ESG-tal, og du aner ikke, hvor du skal starte. Du driver en salon, ikke en miljøafdeling.",
      solution:
        "qlim8 guider dig gennem et klimaregnskab i almindeligt sprog. Du kobler dit elforbrug på fra Eloverblik og lader os bygge resten oven på din bogføring — ingen CSRD-uddannelse nødvendig.",
      outcome:
        "Et færdigt klimaregnskab på en eftermiddag i stedet for uger med usikkerhed [antagelse: interne onboarding-estimater, ikke kundevalideret].",
    },
    {
      pain:
        "Du har ikke tid til et langt konsulent-forløb, og et konsulenthonorar giver ikke mening for en salon af din størrelse.",
      solution:
        "qlim8 koster fra 250 kr/md på Starter-planen — en brøkdel af et konsulent-engagement. Du laver regnskabet selv med platformens hjælp og ejer dine egne data.",
      outcome:
        "Compliance uden konsulent, til en pris der passer en lille virksomhed.",
    },
    {
      pain:
        "Dit forbrug er el, vand og hårprodukter. Du er i tvivl om, hvordan det overhovedet bliver til et CO₂e-tal.",
      solution:
        "qlim8 henter elforbruget automatisk fra Eloverblik og omregner dine indkøb af vand og produkter til CO₂e via bogføringen med DK-specifikke faktorer.",
      outcome:
        "Dine faktiske forbrugsposter bliver til et dokumenteret regnskab, ikke et gæt.",
    },
    {
      pain:
        "Du er bange for at overdrive eller love noget grønt, du ikke kan stå inde for, hvis nogen spørger nærmere.",
      solution:
        "qlim8 laver et ærligt, GHG Protocol-konsistent regnskab, hvor hvert tal har en kilde. Salonens aftryk er lille — og det viser regnskabet, uden pynt.",
      outcome:
        "Et troværdigt tal, du kan forsvare, frem for en grøn påstand uden dækning.",
    },
    {
      pain:
        "Når svaret skal afsted, skal det se professionelt ud, uden at du selv skal formatere en rapport.",
      solution:
        "qlim8 leverer regnskabet i en klar-til-brug PDF efter VSME Basic. Du henter dokumentet og sender det videre, som det er.",
      outcome:
        "En færdig rapport at sende til bank, leverandør eller kæde — uden reformatering.",
    },
  ],
  features: [
    {
      title: "Eloverblik på et par klik",
      body:
        "Din salons elforbrug hentes automatisk fra Eloverblik og omregnes til CO₂e med DK-specifikke faktorer. For en salon er el typisk den tungeste post, og den er klaret uden manuel aflæsning.",
    },
    {
      title: "Vand og produkter fra bogføringen",
      body:
        "Dine indkøb af vand og hårprodukter kategoriseres og omregnes til CO₂e ud fra bogføringen. Du får dine faktiske forbrugsposter med, uden at skulle skrive noget ind i hånden.",
    },
    {
      title: "Klar-til-brug rapport",
      body:
        "Regnskabet kommer ud i en færdig PDF efter VSME Basic, klar til at sende til bank, leverandør eller kæde. Ingen reformatering, ingen 'vi mangler lige en tabel' — bare et dokument, du henter og sender.",
    },
    {
      title: "Almindeligt sprog hele vejen",
      body:
        "Du bliver guidet gennem regnskabet uden ESG-jargon. qlim8 er bygget til danske SMV'er, så trin og begreber er oversat til noget, en travl salonejer kan følge på en eftermiddag.",
    },
    {
      title: "Ærligt tal, du kan forsvare",
      body:
        "Hvert tal er GHG Protocol-konsistent og har en kilde. Salonens aftryk er lille, og det viser regnskabet uden pynt — så du aldrig kommer til at overdrive noget grønt, du ikke kan stå inde for.",
    },
  ],
  valueStats: [
    {
      value: "En eftermiddag",
      label: "til færdigt regnskab",
      note: "[antagelse: interne onboarding-estimater]",
    },
    {
      value: "Fra 250 kr/md",
      label: "Starter-plan",
      note: "en brøkdel af et konsulenthonorar",
    },
    {
      value: "Auto",
      label: "elforbrug fra Eloverblik",
      note: "ingen manuel aflæsning",
    },
    {
      value: "Klar PDF",
      label: "til bank og leverandør",
      note: "VSME Basic, klar til brug",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — frisørsaloner",
    items: [
      {
        q: "Er et klimaregnskab overhovedet relevant for en lille salon?",
        a: "Aftrykket er lille sammenlignet med en produktionsvirksomhed, og det siger vi gerne højt. Men hvis din bank, en leverandør eller din kæde beder om ESG-tal, skal du kunne svare. qlim8 gør det hurtigt og ærligt, så du har et dokument klar, når nogen spørger.",
      },
      {
        q: "Hvor lang tid tager det?",
        a: "For en salon med elforbruget koblet på Eloverblik og bogføringen tilgængelig er det typisk en eftermiddags arbejde [antagelse: interne onboarding-estimater, ikke kundevalideret]. Du laver det selv, guidet af platformen i almindeligt sprog.",
      },
      {
        q: "Hvad koster det?",
        a: "qlim8 starter fra 250 kr/md på Starter-planen. For de fleste saloner er det rigeligt til at lave og vedligeholde et klimaregnskab. Premium er 625 kr/md, hvis du får brug for mere. Se prissiden for detaljerne.",
      },
      {
        q: "Hvad indgår i regnskabet for en frisør?",
        a: "Typisk dit elforbrug (fra Eloverblik), dit vandforbrug og dine indkøb af hårprodukter, som kategoriseres via bogføringen. qlim8 omregner det til et GHG Protocol-konsistent CO₂e-tal med DK-specifikke faktorer.",
      },
      {
        q: "Kan jeg sende rapporten direkte til min bank?",
        a: "Ja. Regnskabet kommer ud i en klar-til-brug PDF efter VSME Basic. Du henter dokumentet og sender det, som det er, til bank, leverandør eller kæde — uden at skulle formatere noget selv.",
      },
      {
        q: "Skal jeg forstå CSRD for at bruge det?",
        a: "Nej. qlim8 er bygget til små virksomheder uden ESG-specialist. Du bliver guidet gennem regnskabet i almindeligt sprog, og platformen holder styr på, hvilken standard (typisk VSME Basic for en salon) der passer til dit behov.",
      },
    ],
  },
  closingCta: {
    title: "Få salonens klimaregnskab klaret i eftermiddag",
    description:
      "Opret en gratis konto, kobl Eloverblik på, og se, hvor hurtigt et ærligt klimaregnskab er klar til at sende videre. Book en demo, hvis du vil se det først.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};

// ---------------------------------------------------------------------------
// Store virksomheder — large companies, supply-chain angle
// ---------------------------------------------------------------------------

export const KT_STORE: MarketingPageCopy = {
  hero: {
    eyebrow: "For store virksomheder",
    title: "Saml Scope 3 fra hele din værdikæde og lever CSRD",
    subtitle:
      "Du er CSRD-pligtig og skal aggregere Scope 3 fra 50+ leverandører år efter år. qlim8 gør indsamlingen til self-service: send ét link til leverandørerne, og deres data lander direkte i dit regnskab med audit-spor.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Scope 3-indsamling, der ikke starter forfra hvert kvartal",
    body:
      "For en CSRD-pligtig virksomhed er det centrale problem ikke om, men hvordan du konsoliderer Scope 3 fra dine mange leverandører år efter år. Den klassiske vej er en Excel-tracker, månedlige reminder-mails og et årligt konsulent-engagement — en model, der ikke skalerer og ikke bygger intern kapacitet. qlim8's værdikæde-portal gør indsamlingen til self-service: dine leverandører får eget login, deler kun det relevante CO₂e-tal, og du ser dataen live i dit regnskab med audit-log og dato. En vigtig afgrænsning: qlim8 er bygget til dansk-forankrede mellemstore og store virksomheder, ikke til globale enterprises med 10.000+ ansatte og en fuld in-house ESG-afdeling. Har du det behov, vinder Microsoft Sustainability Manager eller Sphera. Er du derimod dansk CSRD-pligtig med leverandører i EU/UK, er vi bygget til netop din situation.",
    bullets: [
      "Send ét link — leverandøren deler data via eget login.",
      "Scope 3 kategori 1-15 aggregeret i ét regnskab.",
      "ESRS E1-mapping og 7-års audit-spor til CSRD.",
      "Bygget til dansk-forankrede virksomheder, ikke globale enterprises.",
    ],
  },
  painPoints: [
    {
      pain:
        "Scope 3 ligger spredt hos 50+ leverandører. At indsamle det i email-tråde og regneark tager uger hvert kvartal, og leverandørerne leverer i tolv forskellige formater.",
      solution:
        "qlim8's værdikæde-portal gør indsamlingen til self-service. Du sender ét link, leverandøren logger ind og indtaster eller uploader sit CO₂e-tal, og du modtager det i samme struktur hver gang.",
      outcome:
        "Typisk 3-4 ugers manuelt arbejde sparet i Q1 [antagelse: 2 pilot-enterprise-interviews, bør valideres bredere].",
    },
    {
      pain:
        "CSRD kræver, at hver Scope 3-værdi kan dokumenteres tilbage til kilden. En mail med et tal holder ikke ved revision.",
      solution:
        "Hver delt værdi i værdikæde-portalen har kilde, dato og leverandørens egen signatur, og audit-loggen gemmes i 7 år. Revisoren kan spore hele data-kæden uden en separat anmodning.",
      outcome:
        "CSRD-revisor-risikoen falder, fordi Scope 3-kæden er sporbar frem for anekdotisk.",
    },
    {
      pain:
        "Hvert år starter I forfra: nyt konsulent-engagement, ny indsamlingsrunde, ingen opbygget intern kapacitet.",
      solution:
        "qlim8 er en løbende platform, ikke et årligt projekt. Leverandørerne bliver i portalen, data konsolideres automatisk hen over året, og CSRD-rapporten genereres med ESRS E1-mapping fra jeres eget regnskab.",
      outcome:
        "Intern kapacitet, der bygges op år for år, i stedet for en gentaget konsulent-omkostning.",
    },
    {
      pain:
        "Jeres BI-team og controllere mangler klimadata i deres egne pipelines, så ESG lever adskilt fra den øvrige rapportering.",
      solution:
        "Klimadata er tilgængelig via REST API og MCP-server, så BI-team og controllere trækker real-time tal ind, hvor de allerede arbejder. Se /api for de tekniske detaljer.",
      outcome:
        "Klimadata som en regnskabs-API frem for en månedlig CSV, nogen skal huske at eksportere.",
    },
    {
      pain:
        "I overvejer en stor global enterprise-platform, men er usikre på, om den passer til en dansk-forankret virksomhed med danske leverandører.",
      solution:
        "Vær ærlig om skalaen: er I 10.000+ ansatte med en fuld in-house ESG-afdeling, vinder Microsoft eller Sphera. Er I dansk CSRD-pligtig med leverandører i EU/UK, er qlim8 bygget til jer — med native dansk regnskabsdata og en portal, jeres SMV-leverandører faktisk bruger.",
      outcome:
        "Den rigtige platform til jeres skala, uden at betale for enterprise-features, I ikke bruger.",
    },
  ],
  features: [
    {
      title: "Værdikæde-portal",
      body:
        "Inviter dine leverandører med ét link. De får eget login, deler kun det relevante CO₂e-tal og ser aldrig resten af dit regnskab. Reminder-mails sendes automatisk, så du ikke skal jagte nogen manuelt.",
    },
    {
      title: "ESRS E1-mapping",
      body:
        "CSRD-rapporten genereres med ESRS E1-mapping direkte fra dit regnskab. Du bygger ikke skabelonen selv, og output er GHG Protocol-konsistent på tværs af Scope 1, 2 og 3 kategori 1-15.",
    },
    {
      title: "7-års audit-spor",
      body:
        "Hver Scope 3-værdi er kildemarkeret tilbage til leverandør, dato og signatur, og audit-loggen gemmes i 7 år efter CSRD-kravet. Revisoren får read-only audit-pack-adgang uden seat-cost.",
    },
    {
      title: "REST API og MCP-server",
      body:
        "Dit BI-team trækker klimadata via REST API, og AI-assistenter kan kalde via MCP-serveren. ESG-data lever samme sted som jeres øvrige rapportering i stedet for i et isoleret værktøj. Se /api og /docs.",
    },
    {
      title: "White-label ESG-profil",
      body:
        "Publicér en offentlig ESG-profil på eget domæne med jeres egen branding. I viser fremdriften udadtil uden at eksponere det underliggende regnskab, og brand-risikoen ved offentliggørelse holdes nede.",
    },
    {
      title: "Native dansk regnskabsdata",
      body:
        "qlim8 forstår danske konteringsmønstre og DK-specifikke faktorer (Energinet, AIB residual mix) og integrerer med Dinero, e-conomic, Billy og Eloverblik. Ingen mapping-projekt for at få jeres data ind.",
    },
  ],
  valueStats: [
    {
      value: "3-4 uger",
      label: "sparet i Q1 på Scope 3",
      note: "[antagelse: 2 pilot-enterprise-interviews]",
    },
    {
      value: "Ét link",
      label: "pr. leverandør",
      note: "self-service, ingen email-jagt",
    },
    {
      value: "7 år",
      label: "audit-spor",
      note: "CSRD-krav opfyldt",
    },
    {
      value: "API + MCP",
      label: "klimadata til BI-teamet",
      note: "real-time frem for månedlig CSV",
    },
  ],
  faq: {
    title: "Ofte stillede spørgsmål — store virksomheder",
    items: [
      {
        q: "Hvordan samler vi Scope 3 fra mange leverandører?",
        a: "Via qlim8's værdikæde-portal. Du sender ét link til hver leverandør, de logger ind og deler kun det relevante CO₂e-tal, og du ser dataen live i dit eget regnskab. Reminder-mails sendes automatisk, så du ikke skal jagte nogen. Pilotbrugere sparer typisk 3-4 uger i Q1 [antagelse: 2 pilot-enterprise-interviews].",
      },
      {
        q: "Holder Scope 3-dataen ved en CSRD-revision?",
        a: "Ja. Hver delt værdi har kilde, dato og leverandørens signatur, og audit-loggen gemmes i 7 år. Revisoren får read-only audit-pack-adgang og kan spore hele data-kæden uden en separat anmodning — det er den dokumentation, CSRD kræver.",
      },
      {
        q: "Er qlim8 en enterprise-platform på niveau med Microsoft eller Sphera?",
        a: "Nej, og det skal vi være ærlige om. Er I 10.000+ ansatte med en fuld in-house ESG-afdeling, vinder Microsoft Sustainability Manager eller Sphera. qlim8 er bygget til dansk-forankrede mellemstore og store virksomheder med leverandører i EU/UK, hvor native dansk regnskabsdata og en portal, jeres SMV-leverandører faktisk bruger, er det, der gør forskellen.",
      },
      {
        q: "Kan vores BI-team trække klimadata ind i deres egne systemer?",
        a: "Ja. qlim8 har et REST API og en MCP-server, så BI-team og controllere trækker real-time klimadata ind, hvor de allerede arbejder, i stedet for at vente på en månedlig CSV-eksport. Tekniske detaljer ligger på /api og /docs.",
      },
      {
        q: "Får vores revisor adgang uden ekstra licens?",
        a: "Ja. Revisoren får read-only audit-pack-adgang via tredjeparts-adgang uden seat-cost. De ser fuld lineage og hele Scope 3-kæden, men kan ikke ændre jeres data.",
      },
      {
        q: "Dækker I hele Scope 3 kategori 1-15?",
        a: "qlim8 understøtter Scope 3 kategori 1-15 med værdikæde-portalen til leverandør-data og EXIOBASE-baserede faktorer for internationale poster. Hvilke kategorier der er relevante, afhænger af jeres forretning, og platformen hjælper med at afgrænse dem korrekt frem for at love 'fuldt Scope 3' uden specifikation.",
      },
    ],
  },
  closingCta: {
    title: "Gør Scope 3-indsamlingen til self-service og lever CSRD",
    description:
      "Opret en gratis konto og se værdikæde-portalen, eller book en demo, hvor vi gennemgår ESRS E1-mapping og audit-spor med jeres egen leverandør-struktur som eksempel.",
    primary: PRIMARY_CTA,
    secondary: CLOSING_SECONDARY_CTA,
  },
};
