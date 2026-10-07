import type { MarketingPageCopy, MarketingHubCopy } from "@/content/marketing/types";
import { DEMO_CTA, PHONE_CTA } from "@/content/cta";

// ---------------------------------------------------------------------------
// Shared CTA conventions: qlim8 is sold after a demo (see src/content/cta.ts).
// Primary CTA is DEMO_CTA, the closing secondary is PHONE_CTA.
// ---------------------------------------------------------------------------
const HERO_SECONDARY_CTA = {
  label: "Se pakker",
  href: "/priser",
} as const;

// ===========================================================================
// PRODUKT: hub
// ===========================================================================
export const PRODUKT_HUB_COPY: MarketingHubCopy = {
  hero: {
    eyebrow: "Produkt",
    title: "Én platform fra faktura til revisor-klar rapport",
    subtitle:
      "qlim8 samler dit klimaregnskab, din dataudforskning, din rapportering og dine reduktioner ét sted, bygget oven på det regnskab du allerede har.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Dit klimaregnskab: bygget oven på dit regnskab",
    body: "De fleste ESG-værktøjer beder dig starte forfra: eksportér til CSV, byg et mapping-projekt, hyr en konsulent. qlim8 gør det modsatte. Vi tager udgangspunkt i at dine tal allerede findes (i Dinero, e-conomic, Billy og Eloverblik) og bygger klimaregnskabet oven på dem. Fra det samme datagrundlag får du et dashboard med dit CO₂e-aftryk, værktøjer til at grave ned i hvor emissionerne kommer fra, færdige VSME- og CSRD-rapporter med kildehenvisning, og et sted at planlægge og spore reduktioner. Hvert tal er sporbart tilbage til den oprindelige faktura, så revisoren kan følge kæden uden en eneste opfølgnings-mail. Det er forskellen mellem klimaregnskab og klima-markedsføring.",
    bullets: [
      "Dansk regnskabsdata native: Dinero, e-conomic, Billy og Eloverblik, ingen CSV-flyt",
      "Audit-spor på hver kg CO₂e, sporbart tilbage til bilaget",
      "ESG som salgsværktøj hele året, ikke kun en rapport én gang om året",
    ],
  },
  cardsHeading: "Udforsk produktet",
  cardsSubheading:
    "Otte moduler, ét datagrundlag, fra det daglige overblik til den underskrevne rapport.",
  differentiators: [
    {
      title: "Dansk regnskabsdata som fundament",
      body: "Vi understøtter Dinero, e-conomic og Billy native og kategoriserer mod 1.159 danske emissions-kategorier fra Klimakompasset. Ingen mapping-projekt, ingen manuel CSV-eksport. Dit klimaregnskab er 80 % færdigt i det øjeblik din bogføring er tilsluttet.",
    },
    {
      title: "Audit-spor indbygget, ikke tilkøbt",
      body: "Hver kg CO₂e har en klikbar kildehenvisning tilbage til den oprindelige faktura, og hver kategori-ændring, faktor og datakilde logges i et 7-årigt audit-trail (CSRD-krav). Når revisoren spørger \"hvor kommer det tal fra?\", er svaret ét klik væk.",
    },
    {
      title: "ESG som salgsværktøj, ikke compliance-byrde",
      body: "Scenarier, reduktions-tiltag og delbare profiler gør klimaregnskabet brugbart hele året. Du bruger det til at vinde grønne udbud og svare kunder, ikke kun til at aflevere en rapport, når banken beder om det.",
    },
    {
      title: "Fra SMV til enterprise-værdikæde i samme platform",
      body: "Start som SMV med basis-flow og VSME Basic. Voks til scenarier, revisor-adgang og en leverandørportal der samler Scope 3 fra 100+ leverandører, uden at skifte system eller migrere data undervejs.",
    },
  ],
  closingCta: {
    title: "Se hele platformen med dit eget regnskab",
    description:
      "Book en demo, hvor vi viser platformen med din egen kontoplan som eksempel.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_DASHBOARD: Dashboard
// ===========================================================================
export const PR_DASHBOARD: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt",
    title: "Hele dit klimaregnskab på én skærm",
    subtitle:
      "Scope 1, 2 og 3, fordelt på kategorier, med udviklingen over tid og status mod dine mål, samlet på ét dashboard i stedet for tolv regneark.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Mandag-morgen-overblik uden regneark",
    body: "Et klimaregnskab er ikke meget værd, hvis du skal samle det manuelt hver gang nogen spørger. qlim8-dashboardet giver dig det samlede billede med det samme: dit CO₂e-aftryk fordelt på Scope 1, 2 og 3, brudt ned på kategorier, med kurven over tid og hvor langt du er fra dine reduktionsmål. Tallene opdateres, i takt med at dine fakturaer synkroniseres fra bogføringen, så det du ser mandag morgen, er retvisende, ikke en måned gammelt. Skal CFO'en bruge et tal til bestyrelsen, en kunde bede om jeres aftryk, eller banken spørge før et grønt lån, er svaret allerede på skærmen. Ingen konsolidering, ingen \"vi vender tilbage\".",
    bullets: [
      "Scope 1, 2 og 3 fordelt på kategorier i ét overblik",
      "Udvikling over tid: se om kurven knækker den rigtige vej",
      "Status mod mål, så du ved hvor langt du er fra target",
    ],
  },
  painPoints: [
    {
      pain: "Hver gang nogen spørger om jeres CO₂-tal, går der en halv dag med at samle tal fra forskellige ark og tjekke om de er opdaterede.",
      solution: "Dashboardet holder det samlede billede aktuelt, i takt med at fakturaerne synkroniseres fra din bogføring.",
      outcome: "Overblikket er klar mandag morgen, ikke efter en halv dags konsolidering.",
    },
    {
      pain: "Du ved, at Scope 3 fylder mest, men du kan ikke se fordelingen mellem scopes og kategorier uden at bygge en pivottabel.",
      solution: "Aftrykket vises fordelt på Scope 1, 2 og 3 og brudt ned på kategori direkte i dashboardet.",
      outcome: "Du ser med det samme, hvor de store poster ligger, uden at røre Excel.",
    },
    {
      pain: "Ledelsen vil vide, om I bevæger jer den rigtige vej, men et enkelt årstal siger ikke, om kurven knækker.",
      solution: "Udviklingen over tid vises som en kurve, så du kan følge trenden måned for måned og år for år.",
      outcome: "Bestyrelsen får en trend, ikke et løsrevet tal.",
    },
    {
      pain: "I har sat et reduktionsmål, men ingen kan svare på, hvor langt I egentlig er fra det lige nu.",
      solution: "Dashboardet viser status mod dine mål, så afstanden til target altid er synlig.",
      outcome: "Målet bliver noget du styrer efter løbende, ikke noget du opdager, du missede ved årets slutning.",
    },
    {
      pain: "Tallene i regnearket er så gamle, at ingen tør bruge dem til en kundepræsentation eller et bank-møde.",
      solution: "Dashboardet afspejler de senest synkroniserede fakturaer, så du kan bruge tallene, mens de stadig er friske.",
      outcome: "Du deler tal, du tør stå inde for, uden at tjekke datoen på et regneark først.",
    },
  ],
  features: [
    {
      title: "Scope 1/2/3-fordeling",
      body: "Se dit samlede aftryk delt op på de tre scopes efter GHG Protocol-konsistent metode. Fordelingen gør det tydeligt, hvor stor en del af aftrykket der ligger i din egen drift kontra i værdikæden.",
    },
    {
      title: "Kategori-nedbrydning",
      body: "Hvert scope brydes ned på kategori, så du kan se hvilke aktiviteter der driver aftrykket. Det er udgangspunktet for at prioritere, hvor en reduktion faktisk rykker.",
    },
    {
      title: "Udvikling over tid",
      body: "Følg dit aftryk måned for måned og år for år som en kurve. Du ser om reduktionerne slår igennem, og du kan sammenligne perioder uden at bygge grafen selv.",
    },
    {
      title: "Status mod mål",
      body: "Har du sat et reduktionsmål, viser dashboardet hvor langt du er fra det. Afstanden til target er synlig hele året, ikke kun når rapporten skal laves.",
    },
    {
      title: "Live-opdatering fra bogføringen",
      body: "Tallene bygger på de fakturaer, der synkroniseres fra Dinero, e-conomic eller Billy. Når ny data kommer ind, opdateres overblikket. Du behøver ikke genindtaste eller genberegne noget.",
    },
  ],
  howItWorks: {
    title: "Sådan får du overblikket",
    steps: [
      {
        title: "Tilslut din bogføring",
        body: "Forbind Dinero, e-conomic eller Billy via OAuth. Setup tager under en dag, og der er ingen CSV-eksport at holde styr på.",
      },
      {
        title: "Lad data kategorisere",
        body: "qlim8 læser dine fakturaer og kategoriserer dem mod danske emissions-data. Dashboardet fyldes automatisk med dit aftryk fordelt på scopes og kategorier.",
      },
      {
        title: "Åbn dashboardet",
        body: "Se dit samlede CO₂e-aftryk, fordelingen på kategorier, kurven over tid og status mod dine mål, samlet på én skærm.",
      },
      {
        title: "Gå dybere, når du vil",
        body: "Klik dig fra et tal videre til Udforskning for at se hvilke fakturaer der ligger bag, eller til Rapportering for at trække tallene ud i en rapport.",
      },
    ],
  },
  valueStats: [
    { value: "Scope 1-3", label: "samlet på ét overblik" },
    { value: "Under 1 dag", label: "fra tilslutning til første tal", note: "[antagelse: 1-3 dage hvis Dinero/e-conomic er tilkoblet]" },
    { value: "1-3 t/md.", label: "sparet på manuel konsolidering", note: "[antagelse: baseret på interne tidsmålinger, ikke kundevalideret]" },
    { value: "1.159", label: "danske emissions-kategorier dækket" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om dashboardet",
    items: [
      {
        q: "Hvor ofte opdateres tallene på dashboardet?",
        a: "Dashboardet afspejler de fakturaer, der er synkroniseret fra din bogføring. Data hentes løbende, så overblikket følger med, i takt med at nye posteringer kommer ind i Dinero, e-conomic eller Billy.",
      },
      {
        q: "Viser dashboardet Scope 1, 2 og 3?",
        a: "Ja. Dit aftryk vises fordelt på alle tre scopes efter en GHG Protocol-konsistent metode, og hvert scope brydes ned på kategori, så du kan se hvor emissionerne kommer fra.",
      },
      {
        q: "Kan jeg se udviklingen over tid?",
        a: "Ja. Dashboardet viser dit aftryk som en kurve over tid, så du kan følge trenden måned for måned og år for år og se, om dine reduktioner slår igennem.",
      },
      {
        q: "Hvordan følger jeg mit reduktionsmål?",
        a: "Når du har sat et mål, viser dashboardet din status mod det, altså hvor langt du er fra target. Afstanden er synlig løbende, så du kan styre efter målet hele året.",
      },
      {
        q: "Skal jeg indtaste tal manuelt for at få et dashboard?",
        a: "Nej. Dashboardet bygger på de fakturaer, der synkroniseres fra din bogføring, og som kategoriseres automatisk mod danske emissions-data. Du reviderer og retter efter behov, men grundlaget kommer fra din eksisterende data.",
      },
      {
        q: "Kan jeg gå fra et tal til de bagvedliggende bilag?",
        a: "Ja. Fra dashboardet kan du klikke videre til Udforskning for at filtrere data og finde de konkrete fakturaer, der ligger bag et tal. Hver kg CO₂e er sporbar tilbage til kilden.",
      },
    ],
  },
  closingCta: {
    title: "Få dit klimaregnskab på én skærm",
    description:
      "Book en demo, hvor vi viser dashboardet med din egen kontoplan som eksempel: aftrykket fordelt på scopes, kategorier og tid.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_UDFORSKNING: Udforskning
// ===========================================================================
export const PR_UDFORSKNING: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt",
    title: "Find ud af hvor emissionerne kommer fra",
    subtitle:
      "Dyk ned i data bag tallene: filtrér på scope, kategori, afdeling, leverandør og periode, og se præcis hvilke aktiviteter der driver dit aftryk.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Fra ét stort tal til de konkrete poster",
    body: "Dashboardet giver dig overblikket. Udforskning giver dig svarene. Når du kan se, at Scope 3 fylder mest, er det næste spørgsmål altid: hvor kommer det fra? Med Udforskning filtrerer du data på scope, kategori, afdeling, leverandør og periode og graver dig ned fra det samlede aftryk til de konkrete aktiviteter bag. Vil du vide, hvilken afdeling der driver transportemissionerne, hvilke leverandører der vejer tungest i indkøb, eller om et bestemt kvartal skiller sig ud, kan du isolere det på få klik. Det gør det muligt at prioritere reduktioner der rent faktisk rykker, og at svare præcist, når revisoren eller ledelsen spørger til et bestemt tal, i stedet for at gætte.",
    bullets: [
      "Filtrér på scope, kategori, afdeling, leverandør og periode",
      "Grav fra det samlede aftryk ned til de enkelte aktiviteter",
      "Isolér de poster der driver aftrykket, så du kan prioritere",
    ],
  },
  painPoints: [
    {
      pain: "Du kan se, at aftrykket er stort, men ikke hvilke konkrete udgifter der driver det, så du ved ikke, hvor du skal sætte ind.",
      solution: "Udforskning lader dig filtrere ned fra scope til kategori til den enkelte aktivitet, så du ser præcis hvilke poster der vejer tungest.",
      outcome: "Du prioriterer de reduktioner der rykker, i stedet for at gætte.",
    },
    {
      pain: "Ledelsen vil vide, hvilken afdeling der udleder mest, men dine tal er ikke brudt ned pr. afdeling.",
      solution: "Filtrér på afdeling og se aftrykket pr. enhed uden at bygge en ny opgørelse manuelt.",
      outcome: "Du svarer på afdelings-spørgsmålet på minutter, ikke på en eftermiddag.",
    },
    {
      pain: "Én enkelt leverandør kan stå for en stor del af dit indkøbs-aftryk, men det drukner i totalen.",
      solution: "Filtrér på leverandør og se, hvem der vejer tungest, grundlaget for en samtale om reduktion eller leverandørskifte.",
      outcome: "Du finder de få leverandører, hvor en indsats faktisk batter.",
    },
    {
      pain: "Et kvartal så mærkeligt højt ud, men du kan ikke afgøre, om det er en fejl eller en reel stigning uden at grave i bilagene.",
      solution: "Filtrér på periode og kategori og find de konkrete fakturaer bag udsvinget.",
      outcome: "Du opdager fejlkategoriseringer, før de ender i rapporten.",
    },
    {
      pain: "Revisoren spørger til et bestemt tal, og du kan ikke hurtigt vise, hvilke posteringer der ligger bag.",
      solution: "Udforskning viser de aktiviteter bag et tal, og hver post er sporbar tilbage til sin faktura.",
      outcome: "Revisorens spørgsmål besvares med det samme, ingen \"vi vender tilbage\".",
    },
  ],
  features: [
    {
      title: "Filtrér på scope",
      body: "Isolér Scope 1, 2 eller 3, helt ned til de 15 Scope 3-kategorier. Du ser aftrykket for præcis den del af regnskabet, du arbejder med, uden støj fra resten.",
    },
    {
      title: "Filtrér på kategori",
      body: "Bryd aftrykket ned på emissions-kategori og se, hvilke aktivitetstyper der driver tallene. Det er udgangspunktet for at finde de poster, hvor en reduktion rent faktisk rykker.",
    },
    {
      title: "Filtrér på afdeling",
      body: "Se aftrykket fordelt pr. afdeling eller enhed. Det gør det muligt at placere ansvar og at følge, om en konkret afdelings indsats slår igennem over tid.",
    },
    {
      title: "Filtrér på leverandør",
      body: "Find de leverandører der vejer tungest i dit indkøbs-aftryk. Det er grundlaget for en konkret leverandør-samtale, eller for at prioritere, hvem du inviterer ind i værdikæde-modulet.",
    },
    {
      title: "Filtrér på periode",
      body: "Afgræns til en måned, et kvartal eller et år og sammenlign perioder. Udsving bliver synlige, så du kan skelne reelle ændringer fra fejlkategoriseringer.",
    },
    {
      title: "Sporbarhed tilbage til bilaget",
      body: "Bag hvert tal ligger de konkrete aktiviteter, og hver aktivitet er sporbar tilbage til sin oprindelige faktura. Du kan altid komme fra et aggregeret tal til det bilag, der udløste det.",
    },
  ],
  howItWorks: {
    title: "Sådan graver du i dine data",
    steps: [
      {
        title: "Start fra et tal",
        body: "Gå til Udforskning direkte eller klik dig videre fra et tal på dashboardet, du vil forstå bedre.",
      },
      {
        title: "Sæt dine filtre",
        body: "Kombinér filtre på scope, kategori, afdeling, leverandør og periode, indtil du har isoleret præcis den del af aftrykket, du undersøger.",
      },
      {
        title: "Find kilden",
        body: "Se de aktiviteter bag tallet, og følg sporet tilbage til den konkrete faktura, så du ved præcis, hvad der driver emissionen.",
      },
      {
        title: "Handl på indsigten",
        body: "Ret en fejlkategorisering, planlæg et reduktions-tiltag, eller træk data ud via Data udtræk til din egen videre analyse.",
      },
    ],
  },
  valueStats: [
    { value: "5 dimensioner", label: "scope, kategori, afdeling, leverandør, periode" },
    { value: "Kat. 1-15", label: "Scope 3 kan filtreres pr. kategori" },
    { value: "1 klik", label: "fra aggregeret tal til bagvedliggende bilag" },
    { value: "1.159", label: "danske emissions-kategorier at filtrere på" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Udforskning",
    items: [
      {
        q: "Hvilke dimensioner kan jeg filtrere på?",
        a: "Du kan filtrere dine emissioner på scope, kategori, afdeling, leverandør og periode, og kombinere dem. Det gør det muligt at isolere præcis den del af aftrykket, du vil undersøge.",
      },
      {
        q: "Kan jeg se aftrykket pr. afdeling?",
        a: "Ja. Filtrér på afdeling for at se, hvilke enheder der driver aftrykket. Det er nyttigt, når ledelsen vil placere ansvar eller følge en konkret afdelings udvikling.",
      },
      {
        q: "Kan jeg finde de leverandører, der udleder mest?",
        a: "Ja. Ved at filtrere på leverandør ser du, hvem der vejer tungest i dit indkøbs-aftryk. Det er ofte udgangspunktet for at prioritere leverandør-dialog eller invitere dem ind i værdikæde-modulet.",
      },
      {
        q: "Kan jeg komme fra et tal til den konkrete faktura?",
        a: "Ja. Bag hvert tal ligger de enkelte aktiviteter, og hver aktivitet er sporbar tilbage til sit bilag. For rå- og aggregerede eksporter, se undersiden Data udtræk.",
      },
      {
        q: "Kan jeg sammenligne to perioder?",
        a: "Ja. Filtrér på periode for at afgrænse til fx et kvartal eller et år og se, hvordan aftrykket har flyttet sig. Det gør udsving synlige, så du kan skelne reelle ændringer fra fejl.",
      },
      {
        q: "Hjælper Udforskning med at finde fejl i data?",
        a: "Indirekte, ja. Ved at filtrere ned til en periode eller kategori med et mistænkeligt udsving kan du finde de konkrete fakturaer bag og opdage fejlkategoriseringer, før de ender i en rapport.",
      },
    ],
  },
  closingCta: {
    title: "Grav ned i tallene bag dit klimaregnskab",
    description:
      "Book en demo, hvor vi viser, hvordan du udforsker emissionerne på tværs af scope, kategori, afdeling, leverandør og periode, helt ned til det enkelte bilag.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_DATA_UDTRAEK: Data udtræk (child of Udforskning)
// ===========================================================================
export const PR_DATA_UDTRAEK: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt · Udforskning",
    title: "Træk dine tal ud: til analyse, regneark eller revisor",
    subtitle:
      "Eksportér rå- og aggregerede data i strukturerede formater, og behold sporbarheden hele vejen tilbage til det oprindelige bilag.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Dine data, ikke låst inde",
    body: "Nogle gange skal tallene ud af platformen, til en egen analyse i regnearket, til controlleren der vil krydstjekke, eller til revisoren der vil have datagrundlaget ved siden af rapporten. Data udtræk lader dig trække både rådata (den enkelte aktivitet med sin emissions-faktor) og aggregerede data (summeret pr. scope, kategori eller periode) ud i strukturerede formater. Det vigtige er, at sporbarheden følger med: hver linje i eksporten bærer sin emission-lineage, kæden fra kg CO₂e tilbage til den konkrete faktura. Du får altså ikke et løsrevet tal, men et tal med kilde. Det betyder, at dit eget regneark og revisorens stikprøve peger på præcis samme grundlag, og at ingen skal gætte, hvor et tal kom fra.",
    bullets: [
      "Rådata pr. aktivitet og aggregerede tal pr. scope, kategori eller periode",
      "Strukturerede eksportformater til egne analyser og videre bearbejdning",
      "Emission-lineage følger med, sporbart tilbage til bilaget",
    ],
  },
  painPoints: [
    {
      pain: "Du vil lave din egen analyse i Excel, men platformens tal kan kun ses på skærmen, ikke tages ud.",
      solution: "Data udtræk eksporterer både rå og aggregerede emissioner i strukturerede formater, du kan åbne i regnearket.",
      outcome: "Din analyse bygger på platformens tal, ikke på tal du har tastet af manuelt.",
    },
    {
      pain: "Revisoren vil have datagrundlaget ved siden af selve rapporten, og du ender med at klippe det sammen i hånden.",
      solution: "Træk det underliggende datasæt ud i ét eksport-format, som revisoren kan arbejde videre med direkte.",
      outcome: "Datagrundlaget afleveres samlet: ingen manuel sammenklipning før revision.",
    },
    {
      pain: "Når du eksporterer tal til et andet system, mister du oplysningen om, hvor hvert tal kom fra.",
      solution: "Hver eksporteret post bærer sin emission-lineage, sporet tilbage til den oprindelige faktura følger med ud.",
      outcome: "Sporbarheden overlever eksporten: ingen løsrevne tal uden kilde.",
    },
    {
      pain: "Du har brug for tallene på både detalje- og oversigtsniveau, men kan kun få den ene visning ad gangen.",
      solution: "Vælg mellem rådata pr. aktivitet og aggregerede tal pr. scope, kategori eller periode i samme udtræks-flow.",
      outcome: "Du får præcis det granularitetsniveau, opgaven kræver, uden at bygge det om.",
    },
  ],
  features: [
    {
      title: "Rådata pr. aktivitet",
      body: "Eksportér den enkelte aktivitet med dens emissions-faktor og beregnede kg CO₂e. Det er det granulære grundlag, hvis du selv vil regne videre eller lave en dybere analyse.",
    },
    {
      title: "Aggregerede data",
      body: "Træk tal ud summeret pr. scope, kategori eller periode, når du har brug for oversigten frem for detaljen. Nyttigt til ledelsesrapporter og hurtige krydstjek.",
    },
    {
      title: "Strukturerede eksportformater",
      body: "Data kommer ud i strukturerede formater, der åbner direkte i regneark eller kan læses af andre systemer. Ingen efterbehandling for at gøre eksporten brugbar.",
    },
    {
      title: "Emission-lineage i eksporten",
      body: "Hver post bærer sin sporbarhed: kæden fra kg CO₂e tilbage til den oprindelige faktura. Dit regneark og revisorens stikprøve peger dermed på præcis samme grundlag.",
    },
    {
      title: "Datagrundlag til revisor",
      body: "Udtrækket giver revisoren det underliggende datasæt ved siden af rapporten, så stikprøver kan tages direkte i dataen frem for gennem manuelle forespørgsler.",
    },
  ],
  howItWorks: {
    title: "Sådan trækker du data ud",
    steps: [
      {
        title: "Filtrér til det du skal bruge",
        body: "Brug Udforsknings filtre på scope, kategori, afdeling, leverandør og periode til at afgrænse præcis det datasæt, du vil eksportere.",
      },
      {
        title: "Vælg granularitet",
        body: "Beslut, om du vil have rådata pr. aktivitet eller aggregerede tal pr. scope, kategori eller periode.",
      },
      {
        title: "Eksportér",
        body: "Træk dataen ud i et struktureret format. Emission-lineage følger med, så sporbarheden bevares uden for platformen.",
      },
      {
        title: "Arbejd videre",
        body: "Åbn eksporten i dit regneark, del den med controlleren, eller giv revisoren datagrundlaget ved siden af den færdige rapport.",
      },
    ],
  },
  valueStats: [
    { value: "Rå + aggregeret", label: "to granularitetsniveauer i samme flow" },
    { value: "Lineage", label: "sporbarhed følger med ud i eksporten" },
    { value: "5 filtre", label: "afgræns før du eksporterer" },
    { value: "7 år", label: "audit-trail bag hvert tal", note: "CSRD-krav" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Data udtræk",
    items: [
      {
        q: "Hvilke data kan jeg trække ud?",
        a: "Du kan eksportere både rådata pr. aktivitet, med emissions-faktor og beregnet kg CO₂e, og aggregerede tal summeret pr. scope, kategori eller periode. Du vælger det granularitetsniveau, opgaven kræver.",
      },
      {
        q: "Bevares sporbarheden, når jeg eksporterer?",
        a: "Ja. Hver eksporteret post bærer sin emission-lineage, altså kæden tilbage til den oprindelige faktura. Du får et tal med kilde, ikke et løsrevet tal.",
      },
      {
        q: "Kan jeg bruge udtrækket til min egen analyse i Excel?",
        a: "Ja. Data kommer ud i strukturerede formater, der åbner direkte i regneark, så du kan bygge dine egne analyser oven på platformens tal i stedet for at taste dem af manuelt.",
      },
      {
        q: "Kan revisoren få datagrundlaget ved siden af rapporten?",
        a: "Ja. Data udtræk giver revisoren det underliggende datasæt, så stikprøver kan tages direkte i dataen. Det supplerer den færdige rapport og sporet i platformen.",
      },
      {
        q: "Hvordan afgrænser jeg, hvad der kommer med i udtrækket?",
        a: "Du bruger Udforsknings filtre på scope, kategori, afdeling, leverandør og periode til at afgrænse datasættet, inden du eksporterer. Så indeholder udtrækket præcis det, du har brug for.",
      },
      {
        q: "Er Data udtræk en del af Udforskning?",
        a: "Ja. Data udtræk er udtræks-flowet under Udforskning: du filtrerer dig frem til de rigtige data i Udforskning og trækker dem derefter ud i et struktureret format med sporbarheden bevaret.",
      },
    ],
  },
  closingCta: {
    title: "Tag dine tal med: med kilden i behold",
    description:
      "Book en demo, hvor vi viser, hvordan du trækker rå- eller aggregerede emissionsdata ud til egne analyser, regneark eller revisor, uden at miste sporet tilbage til bilaget.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_RAPPORTERING: Rapportering (hub for report features)
// ===========================================================================
export const PR_RAPPORTERING: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt",
    title: "Fra data til færdig rapport: klar til revisor, bank og bestyrelse",
    subtitle:
      "Generér VSME-rapporten i EFRAG's officielle Excel og en designet PDF-rapport over året direkte fra dit regnskab, med et spor fra hver linje tilbage til bilaget.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Rapporten er ikke et projekt: den er et klik",
    body: "VSME og CSRD er ikke valgfri længere: banker kræver tallene før grønne lån, store kunder kræver dem fra deres leverandører. Problemet er ikke ambitionen, men omfanget: EFRAG-skabelonen dækker 40+ datapunkter for VSME Basic og over 100 for Comprehensive, og hver påstand skal kunne dokumenteres. qlim8 tager skabelonen som software, ikke som dokument. Vi læser dit klimaregnskab, indsætter dine tal i EFRAG's officielle Excel-projektmappe og leverer den sammen med en audit-CSV, hvor hver linje har sin bilagsreference. Ved siden af kan du generere en designet PDF-rapport over hele regnskabsåret, som du kan sende til bestyrelse, bank eller kunde. Herunder finder du de enkelte dele: struktureret Excel til revisor, PDF-rapporten til dem der skal læse den, og det audit-trail der gør, at revisorens spørgsmål besvares, før de bliver stillet.",
    bullets: [
      "VSME Basic og Comprehensive genereret direkte fra dit regnskab",
      "EFRAG's Excel-projektmappe med en audit-CSV, der sporer hver linje til bilaget",
      "Hver rapport gemmes som en fast version, som revisoren kan attestere",
    ],
  },
  painPoints: [
    {
      pain: "EFRAG-skabelonen er 40+ tomme felter for Basic og 100+ for Comprehensive, og du skal selv finde og indsætte hvert tal.",
      solution: "qlim8 mapper dit regnskab mod EFRAG-felterne og genererer rapporten med dine tal indsat på de rigtige pladser.",
      outcome: "VSME Basic bliver 4-8 timers arbejde frem for 40-80 timer manuelt [antagelse: pilot-interview, ikke bredt valideret].",
    },
    {
      pain: "Revisoren spørger, hvor et bestemt tal kommer fra, og du bruger dage på at grave posteringer frem manuelt.",
      solution: "Hver linje i VSME-leverancen har sin bilagsreference i audit-CSV'en, og i platformen kan hvert tal følges ned til posteringen og bilaget.",
      outcome: "Revisorens spørgsmål besvares fra sporet, ingen manuel bilagsjagt.",
    },
    {
      pain: "En førstegangs-VSME hos en konsulent koster typisk et femcifret til sekscifret beløb, og du skal betale igen næste år.",
      solution: "Rapporterne genereres fra platformen som en del af abonnementet.",
      outcome: "Du erstatter en konsulent-regning på 75.000-200.000 kr. [antagelse: markeds-research, ikke kundevalideret] med et abonnement.",
    },
    {
      pain: "Du retter regnskabet efter, at rapporten er afleveret, og er nu i tvivl om, hvad der egentlig stod i den version, du sendte.",
      solution: "Hver rapport fryses, når den genereres: den får et versionsnummer, og dens datagrundlag gemmes med en hash. Den ændres og slettes aldrig. Retter du regnskabet, genererer du en ny version.",
      outcome: "Den afleverede rapport står fast: du kan rette regnskabet uden at rykke ved historikken.",
    },
    {
      pain: "Forskellige modtagere (bank, bestyrelse, kunde) vil have tallene i forskellig form, og du reformaterer i hånden hver gang.",
      solution: "Samme regnskab kommer ud som EFRAG's Excel til revisor og videre bearbejdning, og som en designet PDF-rapport, du kan sende til bank, bestyrelse eller kunde.",
      outcome: "Ét regnskab, to formater, uden manuel reformatering pr. modtager.",
    },
  ],
  features: [
    {
      title: "VSME Basic og Comprehensive",
      body: "Generér EFRAG's VSME-skabeloner direkte fra dit regnskab. Tallene lander i skabelonens officielle celler, og valideringen viser grønt/OK for de krævede rækker.",
    },
    {
      title: "Excel-rapport",
      body: "EFRAG's officielle Excel-projektmappe med fast struktur, til revisor eller videre bearbejdning. Den leveres i en ZIP med en audit-CSV, der sporer hver linje til bilaget. Se undersiden Excel rapport for detaljer.",
    },
    {
      title: "PDF-rapport",
      body: "En designet rapport over hele regnskabsåret: Scope 1, 2 og 3, et overblik over året og dine reduktionsmål, i det visuelle udtryk du vælger. Se undersiden PDF rapport for detaljer.",
    },
    {
      title: "Audit Trail",
      body: "Hver kategori-ændring, faktor og datakilde logges automatisk. Se undersiden Audit Trail for, hvordan sporet dokumenterer hvem der ændrede hvad hvornår.",
    },
    {
      title: "CSRD / ESRS E1-mapping",
      body: "For større tenants mappes det samme datagrundlag mod ESRS E1, så pipelinen kan levere CSRD-rapportering, når kravet rammer. Supplier-rollup fra værdikæden inkluderes i Scope 3-tabellerne.",
    },
    {
      title: "Faste versioner og revisor-attestering",
      body: "Hver genereret rapport får et versionsnummer, og dens datagrundlag og hashes gemmes. Revisoren attesterer en bestemt version ved at uploade sin underskrevne erklæring, og platformen forsegler en kvittering, der binder rapportfil, datagrundlag og erklæring sammen.",
    },
  ],
  howItWorks: {
    title: "Sådan laver du en rapport",
    steps: [
      {
        title: "Vælg rapport",
        body: "Vælg VSME Basic eller Comprehensive, eller PDF-rapporten over et helt regnskabsår. qlim8 ved, hvilke felter standarden kræver, og hvilke af dine data der hører hjemme hvor.",
      },
      {
        title: "Generér",
        body: "Klik generér. Dine tal hentes fra klimaregnskabet, og rapporten gemmes som en fast version sammen med sit datagrundlag.",
      },
      {
        title: "Send den til modtageren",
        body: "Giv revisoren VSME-projektmappen og audit-CSV'en, eller send PDF-rapporten til bank, bestyrelse eller samarbejdspartner. Det er den samme rapport, uanset hvem der læser den.",
      },
      {
        title: "Få den attesteret",
        body: "Inviter revisoren ind i platformen. Revisoren attesterer rapporten ved at uploade sin underskrevne erklæring, og attesteringen bindes til præcis den version.",
      },
    ],
  },
  valueStats: [
    { value: "4-8 timer", label: "til en VSME Basic-rapport", note: "[antagelse: pilot-interview, ikke bredt valideret]" },
    { value: "40+ / 100+", label: "datapunkter i Basic / Comprehensive udfyldt automatisk" },
    { value: "Pr. linje", label: "bilagsreference i VSME-leverancens audit-CSV" },
    { value: "Excel · PDF", label: "samme klimaregnskab, to formater" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om rapportering",
    items: [
      {
        q: "Hvilke rapporter kan qlim8 generere?",
        a: "qlim8 genererer EFRAG's VSME Basic og Comprehensive direkte fra dit regnskab som EFRAG's officielle Excel-projektmappe, og en designet PDF-rapport over hele regnskabsåret. For større tenants understøttes desuden ESRS E1-mapping til CSRD-rapportering.",
      },
      {
        q: "Er rapporterne klar til revisor?",
        a: "Ja. VSME-projektmappen leveres i en ZIP med en audit-CSV, hvor hver linje har sin bilagsreference (bilagsnummer, eksternt id og fil-hash), og i platformen kan revisoren følge et tal helt tilbage til bilaget. Selve PDF-rapporten har ingen kildehenvisninger: sporet ligger i platformen.",
      },
      {
        q: "Hvad er forskellen på Excel- og PDF-rapporten?",
        a: "Excel-rapporten er EFRAG's VSME-projektmappe med fast struktur, til revisor og videre bearbejdning, og sporbar pr. linje via audit-CSV'en. PDF-rapporten er en designet præsentation af årets klimaregnskab til bestyrelse, bank eller kunde, i det visuelle udtryk du vælger. Begge bygger på det samme klimaregnskab.",
      },
      {
        q: "Hvad sker der med en rapport, hvis jeg retter regnskabet bagefter?",
        a: "Ingenting. En rapport fryses, når den genereres: den får et versionsnummer, og dens datagrundlag gemmes med en hash. Den ændres og slettes aldrig. Retter du regnskabet, genererer du en ny version, og den gamle står uændret ved siden af. Har revisoren attesteret en version, er attesteringen bundet til netop den.",
      },
      {
        q: "Kan jeg bruge qlim8 til CSRD og ikke kun VSME?",
        a: "For større tenants mappes datagrundlaget mod ESRS E1, så samme pipeline kan levere CSRD-rapportering, når kravet rammer. Supplier-data fra værdikæde-modulet inkluderes automatisk i Scope 3-tabellerne.",
      },
      {
        q: "Hvor lang tid tager det at lave en VSME-rapport?",
        a: "Pilotbrugere genererer en VSME Basic-rapport på 4-8 timer mod 40-80 timer manuelt eller med konsulent [antagelse: pilot-interview, ikke bredt valideret]. Det meste af tiden går til review af tallene, ikke til at udfylde skabelonen.",
      },
    ],
  },
  closingCta: {
    title: "Generér din første rapport fra dit eget regnskab",
    description:
      "Book en demo, hvor vi viser rapport-flowet fra bogføring til VSME-rapport, med sporet fra hver linje tilbage til bilaget.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_EXCEL: Excel rapport
// ===========================================================================
export const PR_EXCEL: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt · Rapportering",
    title: "Struktureret Excel-rapport: med sporet til bilaget",
    subtitle:
      "Få VSME-rapporten som EFRAG's officielle Excel-projektmappe til revisor eller videre bearbejdning, med en audit-CSV, der sporer hver linje tilbage til bilaget.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Til revisoren der vil regne videre",
    body: "Nogle modtagere vil ikke have en pæn PDF. De vil have tallene i et regneark, de kan arbejde i. Revisoren skal tage stikprøver, controlleren skal krydstjekke, og bæredygtighedsansvarlige skal bygge deres egen opstilling oven på tallene. Excel-rapporten giver dem filer med fast struktur: VSME-tallene ligger i EFRAG's officielle projektmappe, i de samme celler hver gang, og bogføringsudtrækket har samme opbygning hver gang. VSME-projektmappen leveres i en ZIP sammen med en audit-CSV, hvor hver linje har sin bilagsreference (bilagsnummer, eksternt id og fil-hash), et audit-trail som JSON og et verifikations-script. Det betyder, at modtageren ikke får et løsrevet tal, men et tal med spor: revisoren kan tage en linje, finde bilaget og krydstjekke mod bogføringen. Det gør revisionen hurtigere, fordi spørgsmålet \"hvor kommer det tal fra?\" allerede er besvaret i leverancen.",
    bullets: [
      "EFRAG's officielle VSME-projektmappe med fast struktur",
      "Audit-CSV med bilagsreference på hver linje",
      "Til revisor, controller og videre bearbejdning i regnearket",
    ],
  },
  painPoints: [
    {
      pain: "Revisoren beder om tallene i Excel, og du sidder med en PDF, du skal taste af eller kopiere manuelt.",
      solution: "Excel-rapporten leverer VSME-tallene i EFRAG's projektmappe, som revisoren kan arbejde direkte i.",
      outcome: "Revisoren får et regneark, ikke en PDF at taste af, færre fejl, hurtigere revision.",
    },
    {
      pain: "Når du krydstjekker et tal mod bogføringen, kan du ikke se, hvilke fakturaer det dækker.",
      solution: "Audit-CSV'en i samme ZIP giver hver linje sin bilagsreference: bilagsnummer, eksternt id og fil-hash.",
      outcome: "Krydstjek tager minutter, fordi bilaget kan findes ud fra linjen.",
    },
    {
      pain: "Du vil bygge din egen opstilling oven på VSME-tallene, men de ligger låst i et rapportformat.",
      solution: "Projektmappen åbner direkte i regnearket, klar til dine egne formler og pivottabeller.",
      outcome: "Du bygger videre på tallene med det samme, uden en manuel udtræks-runde først.",
    },
    {
      pain: "Hver gang tallene opdateres, skal du reformatere Excel-arket, så det passer til revisorens forventning.",
      solution: "Projektmappen genereres med samme faste struktur hver gang, direkte fra det aktuelle regnskab.",
      outcome: "Du genererer en ny, konsistent version uden manuel reformatering.",
    },
  ],
  features: [
    {
      title: "Struktureret regneark",
      body: "VSME-tallene lander i EFRAG's officielle projektmappe, i de samme celler fra gang til gang. Revisor og controller ved præcis, hvor de skal kigge.",
    },
    {
      title: "Sporbar pr. linje",
      body: "Audit-CSV'en følger med i ZIP-filen og angiver for hver linje bilagsnummer, eksternt id og fil-hash. I platformen kan hvert tal desuden følges ned til posteringen og bilaget.",
    },
    {
      title: "Klar til videre bearbejdning",
      body: "Filen åbner direkte i Excel eller tilsvarende, klar til egne formler, pivottabeller og opstillinger. Ingen efterbehandling for at gøre den brugbar.",
    },
    {
      title: "Konsistent gengenerering",
      body: "Er tallene opdateret, genererer du en ny version med samme struktur. Du undgår at reformatere i hånden hver gang regnskabet ændrer sig.",
    },
    {
      title: "Samme regnskab som PDF'en",
      body: "Excel- og PDF-rapporten bygger på det samme klimaregnskab. Du vælger rapport efter modtageren: Excel, når der skal regnes videre, PDF, når regnskabet skal præsenteres.",
    },
  ],
  howItWorks: {
    title: "Sådan laver du en Excel-rapport",
    steps: [
      {
        title: "Vælg VSME-skabelon",
        body: "Vælg Basic eller Comprehensive. qlim8 kender de felter, standarden kræver, og fylder dem fra dit regnskab.",
      },
      {
        title: "Generér",
        body: "Klik generér. Tallene indsættes i projektmappens faste celler, og du henter en ZIP med projektmappen, audit-CSV'en, audit-trailet og verifikations-scriptet.",
      },
      {
        title: "Send eller bearbejd",
        body: "Del filerne med revisoren, eller åbn projektmappen selv i regnearket og byg din egen opstilling oven på tallene.",
      },
    ],
  },
  valueStats: [
    { value: "Struktureret", label: "faste felter, genkendeligt fra gang til gang" },
    { value: "Pr. linje", label: "bilagsreference i audit-CSV'en" },
    { value: "EFRAG", label: "officiel VSME-projektmappe, ikke en egen skabelon" },
    { value: "Ét regnskab", label: "samme grundlag for Excel- og PDF-rapporten" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Excel-rapporten",
    items: [
      {
        q: "Hvad indeholder Excel-rapporten?",
        a: "VSME-rapporten leveres som en ZIP med EFRAG's officielle Excel-projektmappe, en audit-CSV med bilagsreference pr. linje, et audit-trail som JSON og et verifikations-script. Projektmappen har fast struktur og er tænkt til revisor og videre bearbejdning. Cellerne har ikke hver sin kildehenvisning: sporet ligger i audit-CSV'en og i platformen.",
      },
      {
        q: "Kan revisoren se, hvor tallene kommer fra?",
        a: "Ja. Audit-CSV'en angiver for hver linje bilagsnummer, eksternt id og fil-hash, så revisoren kan finde de konkrete bilag og tage stikprøver uden at sende dig en forespørgsel. Med adgang til platformen kan revisoren også følge tallene dér.",
      },
      {
        q: "Kan jeg bygge mine egne beregninger oven på filen?",
        a: "Ja. Filen åbner direkte i Excel eller tilsvarende og er klar til dine egne formler, pivottabeller og opstillinger. Den strukturerede opsætning gør det nemt at bygge videre.",
      },
      {
        q: "Hvad hvis tallene ændrer sig, efter jeg har eksporteret?",
        a: "Så genererer du blot en ny version. Projektmappen bygges med samme faste struktur hver gang direkte fra det aktuelle regnskab, så du undgår manuel reformatering.",
      },
      {
        q: "Stemmer Excel-rapporten med PDF-rapporten?",
        a: "Begge bygger på det samme klimaregnskab, men de stiller tallene forskelligt op: VSME-projektmappen viser fx Scope 2 både markeds- og lokationsbaseret, som EFRAG kræver. Du vælger Excel, når modtageren skal regne videre, og PDF, når regnskabet skal præsenteres.",
      },
    ],
  },
  closingCta: {
    title: "Giv revisoren tallene i et regneark",
    description:
      "Book en demo, så viser vi VSME-rapporten i Excel og audit-CSV'en, der sporer hver linje tilbage til bilaget.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_PDF: PDF rapport
// ===========================================================================
export const PR_PDF: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt · Rapportering",
    title: "PDF-rapport: årets klimaregnskab, klar til at dele",
    subtitle:
      "Generér en designet PDF-rapport over et helt regnskabsår direkte fra dit klimaregnskab. Hver rapport gemmes som en fast version, som din revisor kan attestere.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Rapporten du kan sende ud af huset",
    body: "Når klimaregnskabet skal ud af huset, til bestyrelsesmødet, til banken før et grønt lån eller til en kunde der beder om jeres tal, skal det se færdigt ud. PDF-rapporten genereres i platformen fra dit klimaregnskab for et helt regnskabsår: Scope 1, 2 og 3, et overblik over året og dine reduktionsmål, sat op i et gennemført layout. Du vælger mellem flere visuelle udtryk, og den samme rapport kan sendes til bestyrelse, investorer, bank eller samarbejdspartner. Hver rapport fryses, når den genereres: den får et versionsnummer, dens datagrundlag gemmes med en hash, og den ændres eller slettes aldrig. Skal et tal dokumenteres, ligger sporet i platformen, hvor hvert tal kan følges ned til posteringen og bilaget. Resultatet er en rapport, du tør sende videre, uden manuel opsætning i tekstbehandling.",
    bullets: [
      "Designet PDF over et helt regnskabsår, direkte fra dit klimaregnskab",
      "Flere visuelle udtryk at vælge imellem",
      "Fast version med datagrundlag og hash, klar til revisorens attestering",
    ],
  },
  painPoints: [
    {
      pain: "Rapporten skal se professionel ud til bestyrelsen, og du bruger timer på at sætte tal og grafer op i tekstbehandling.",
      solution: "PDF-rapporten genereres med et gennemført layout direkte fra dit klimaregnskab. Opsætningen er lavet for dig.",
      outcome: "Du sender en færdig rapport uden manuel opsætning i Word.",
    },
    {
      pain: "Banken, bestyrelsen og en kunde vil alle se jeres klimatal, og du laver en ny opstilling til hver af dem.",
      solution: "Den samme rapport kan sendes til dem alle: Scope 1, 2 og 3, årets overblik og reduktionsmålene, sat op én gang.",
      outcome: "Én rapport dækker flere modtagere, uden at du bygger den om fra bunden.",
    },
    {
      pain: "Revisoren skal stå inde for rapporten, men erklæringen ender i en mail-tråd, løsrevet fra den fil, den handler om.",
      solution: "Revisoren attesterer i platformen ved at uploade sin underskrevne erklæring. Platformen forsegler en kvittering, der binder rapportfilen, dens datagrundlag og erklæringen sammen.",
      outcome: "Det er dokumenteret, præcis hvilken version revisoren har attesteret.",
    },
    {
      pain: "Du vil have rapportens udtryk til at passe til anledningen, men har kun ét fast format at vælge imellem.",
      solution: "Vælg mellem flere visuelle udtryk, når du genererer rapporten.",
      outcome: "Rapporten ser gennemført ud, uden en designer involveret.",
    },
    {
      pain: "Du retter regnskabet, efter rapporten er sendt, og er i tvivl om, hvad der stod i den version, modtageren fik.",
      solution: "Hver rapport fryses, når den genereres, med versionsnummer, datagrundlag og hash. Genererer du igen, får du en ny version ved siden af.",
      outcome: "Den afsendte rapport står fast, og du kan altid finde præcis den version frem.",
    },
  ],
  features: [
    {
      title: "Et helt regnskabsår",
      body: "Rapporten genereres fra klimaregnskabet for et helt regnskabsår, med data for alle 12 måneder. Den viser Scope 1, 2 og 3, et overblik over året og dine reduktionsmål.",
    },
    {
      title: "Flere visuelle udtryk",
      body: "Vælg det udtryk, rapporten skal have, når du genererer den. Tallene er de samme, det er opsætningen, der skifter. Se undersiden Temaer.",
    },
    {
      title: "Fast version",
      body: "Hver genereret rapport får et versionsnummer, og dens datagrundlag og hashes gemmes. Den ændres og slettes aldrig. Genererer du igen, opstår en ny version.",
    },
    {
      title: "Revisor-attestering",
      body: "Inviter revisoren ind i platformen. Revisoren attesterer en gemt rapport ved at uploade sin underskrevne erklæring, og platformen forsegler kryptografisk en kvittering, der binder rapportfil, datagrundlag og erklæring sammen.",
    },
    {
      title: "Sporet ligger i platformen",
      body: "PDF'en er lavet til at blive læst og præsenteret, og den har ingen kildehenvisninger eller links. Sporet ligger i platformen, hvor hvert tal kan følges ned til posteringen og bilaget, og i audit-CSV'en, der følger med VSME-rapporten.",
    },
  ],
  howItWorks: {
    title: "Sådan laver du en PDF-rapport",
    steps: [
      {
        title: "Hav et helt år i regnskabet",
        body: "PDF-rapporten dækker et regnskabsår, så alle 12 måneder skal have data i dit klimaregnskab.",
      },
      {
        title: "Vælg udtryk",
        body: "Vælg det visuelle udtryk, rapporten skal have.",
      },
      {
        title: "Generér PDF'en",
        body: "Klik generér. Rapporten sættes op og gemmes som en fast version sammen med sit datagrundlag.",
      },
      {
        title: "Del og få den attesteret",
        body: "Send PDF'en til bestyrelse, investor, bank eller kunde. Har du inviteret revisoren ind, kan revisoren attestere netop den version.",
      },
    ],
  },
  valueStats: [
    { value: "Hele året", label: "Scope 1, 2 og 3, overblik og reduktionsmål" },
    { value: "Flere udtryk", label: "vælg rapportens visuelle stil" },
    { value: "Fast version", label: "versionsnummer, datagrundlag og hash gemmes" },
    { value: "Alle pakker", label: "PDF-rapporten er med i alle pakker" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om PDF-rapporten",
    items: [
      {
        q: "Hvad indeholder PDF-rapporten?",
        a: "Rapporten dækker et helt regnskabsår og viser Scope 1, 2 og 3, et overblik over året og dine reduktionsmål, sat op i et gennemført layout, der er klar til at blive delt.",
      },
      {
        q: "Kan jeg lave en rapport for en kortere periode?",
        a: "Nej. PDF-rapporten dækker altid et helt regnskabsår, og alle 12 måneder skal have data. Vil du følge tallene løbende, gør du det i dashboardet.",
      },
      {
        q: "Hvilke visuelle udtryk kan jeg vælge imellem?",
        a: "Du vælger mellem flere udtryk, når du genererer rapporten. Tallene er de samme, det er opsætningen, der skifter. Book en demo, så viser vi dem.",
      },
      {
        q: "Kan revisoren stå inde for rapporten?",
        a: "Ja. Du inviterer revisoren ind i platformen, og revisoren attesterer en gemt rapport ved at uploade sin underskrevne erklæring. Platformen forsegler en kvittering, der binder rapportfilen, dens datagrundlag og erklæringen sammen, så attesteringen hører til præcis den version.",
      },
      {
        q: "Hvad sker der, hvis jeg genererer rapporten igen?",
        a: "Så får du en ny version. Den tidligere rapport er frosset med sit versionsnummer, datagrundlag og hash og ændres eller slettes aldrig, så du kan altid se, hvad der stod i den version, du sendte.",
      },
      {
        q: "Har PDF'en kildehenvisninger?",
        a: "Nej, ikke i selve PDF'en. Den er lavet til at blive læst og præsenteret. Sporet ligger i platformen, hvor hvert tal kan følges ned til posteringen og bilaget, og i audit-CSV'en, der følger med VSME-rapporten.",
      },
    ],
  },
  closingCta: {
    title: "Send en rapport, du tør stå inde for",
    description:
      "Book en demo, så viser vi, hvordan du genererer en PDF-rapport over årets klimaregnskab, og hvordan revisoren attesterer den.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ===========================================================================
// PR_AUDIT: Audit Trail
// ===========================================================================
export const PR_AUDIT: MarketingPageCopy = {
  hero: {
    eyebrow: "Produkt · Rapportering",
    title: "Et revisor-klart spor over hvem der ændrede hvad hvornår",
    subtitle:
      "Hver kategori-ændring, faktor og datakilde logges automatisk, så du kan dokumentere hele datakæden bag dit klimaregnskab, uden at føre log i hånden.",
    primaryCta: DEMO_CTA,
    secondaryCta: HERO_SECONDARY_CTA,
  },
  intro: {
    heading: "Dokumentationen der besvarer spørgsmålet før det stilles",
    body: "Et klimaregnskab holder kun ved revision, hvis du kan vise, hvordan tallene blev til. CSRD kræver et audit-trail i op til 7 år, og en revisor vil altid spørge: hvem ændrede den kategori, hvilken faktor blev brugt, og hvornår? Med qlim8 er svaret ikke et regneark, nogen håber er opdateret. Det er et spor, systemet fører automatisk. Hver kategori-ændring, hver emissions-faktor og hver datakilde logges i takt med, at du arbejder, og sammen med sporet pr. kg CO₂e i platformen giver det en ubrudt kæde fra det færdige tal tilbage til den oprindelige faktura. Det gør revisionen hurtigere og mindre nervepirrende: der er ingen \"hvor kom det tal fra?\"-øjeblikke, fordi historikken allerede ligger der.",
    bullets: [
      "Hver kategori-ændring, faktor og datakilde logges automatisk",
      "7-årigt audit-trail, CSRD-krav, indbygget, ikke tilkøbt",
      "Hvem ændrede hvad hvornår, sporet tilbage til bilaget",
    ],
  },
  painPoints: [
    {
      pain: "Revisoren spørger, hvem der ændrede en kategori, og hvornår, og I har ingen samlet log, kun folks hukommelse.",
      solution: "Hver kategori-ændring logges automatisk med hvem, hvad og hvornår, i takt med at der arbejdes.",
      outcome: "Spørgsmålet besvares fra loggen, ikke fra hukommelsen.",
    },
    {
      pain: "Et tal bygger på en bestemt emissions-faktor, men du kan ikke dokumentere, hvilken faktor der faktisk blev brugt.",
      solution: "Den anvendte faktor og datakilde logges pr. beregning, så du altid kan vise grundlaget bag et tal.",
      outcome: "Hvert tal kan forsvares med den faktor og kilde, det bygger på.",
    },
    {
      pain: "CSRD kræver, at dokumentationen bevares i årevis, og du frygter at skulle bygge et separat opbevarings-projekt.",
      solution: "Audit-trailet bevares i 7 år som en indbygget del af platformen (CSRD-krav).",
      outcome: "Opbevaringskravet er dækket uden et ekstra projekt.",
    },
    {
      pain: "Revisionen trækker ud, fordi hvert spørgsmål udløser en manuel jagt gennem gamle mails og filer.",
      solution: "Hele datakæden ligger samlet i sporet, fra tal tilbage til faktura.",
      outcome: "Revisorens spørgsmål besvares på stedet, ingen bilagsjagt i mails.",
    },
    {
      pain: "Flere kolleger arbejder i regnskabet, og du kan ikke se, hvem der stod bag en bestemt rettelse.",
      solution: "Loggen registrerer hvem der foretog hver ændring, så ansvaret altid kan spores.",
      outcome: "Ændringer kan altid henføres til en person, ingen anonyme rettelser.",
    },
  ],
  features: [
    {
      title: "Automatisk logning af ændringer",
      body: "Hver kategori-ændring registreres af systemet, i takt med at du arbejder. Du behøver ikke føre en separat log. Sporet opstår som et biprodukt af det almindelige arbejde.",
    },
    {
      title: "Faktor- og kildesporing",
      body: "Den emissions-faktor og datakilde, der ligger bag hvert tal, logges pr. beregning. Du kan altid dokumentere, hvilket grundlag et bestemt kg CO₂e-tal hviler på.",
    },
    {
      title: "Hvem, hvad, hvornår",
      body: "Loggen registrerer, hvem der foretog en ændring, hvad der blev ændret, og hvornår. Ansvaret kan spores, også når flere arbejder i samme regnskab.",
    },
    {
      title: "7-årig retention",
      body: "Audit-trailet bevares i 7 år, som CSRD kræver. Dokumentationen er der, når revisionen kommer, uden et separat arkiverings-projekt.",
    },
    {
      title: "Ubrudt kæde til bilaget",
      body: "Sammen med sporet pr. kg CO₂e i platformen danner loggen en ubrudt kæde fra det færdige tal tilbage til den oprindelige faktura. Ingen led mangler mellem påstand og bilag.",
    },
  ],
  howItWorks: {
    title: "Sådan opstår dit audit-spor",
    steps: [
      {
        title: "Arbejd som du plejer",
        body: "Kategorisér fakturaer, ret et forslag, vælg en faktor. Der er ingen ekstra logge-trin: sporet skabes automatisk, mens du arbejder.",
      },
      {
        title: "Systemet logger hver ændring",
        body: "Hver kategori-ændring, faktor og datakilde registreres med hvem, hvad og hvornår, og bevares i 7 år.",
      },
      {
        title: "Følg sporet, når det skal bruges",
        body: "Ved revision eller et spørgsmål fra ledelsen kan du følge et tal tilbage gennem sine ændringer til den oprindelige faktura.",
      },
      {
        title: "Del med revisor",
        body: "Giv revisoren adgang til det fulde spor som en del af audit-pakken, så gennemgangen sker i dataen frem for gennem mail-forespørgsler.",
      },
    ],
  },
  valueStats: [
    { value: "Automatisk", label: "logges uden manuelt logge-trin" },
    { value: "7 år", label: "retention på audit-trailet", note: "CSRD-krav" },
    { value: "Hvem/hvad/hvornår", label: "på hver ændring" },
    { value: "Ubrudt kæde", label: "fra kg CO₂e tilbage til fakturaen" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål om Audit Trail",
    items: [
      {
        q: "Hvad bliver logget i audit-trailet?",
        a: "Hver kategori-ændring, den anvendte emissions-faktor og hver datakilde logges automatisk, sammen med hvem der foretog ændringen og hvornår. Det giver en samlet historik over, hvordan tallene blev til.",
      },
      {
        q: "Skal jeg selv føre loggen?",
        a: "Nej. Sporet skabes automatisk, i takt med at du arbejder i regnskabet. Der er ikke et ekstra logge-trin: dokumentationen opstår som et biprodukt af det almindelige arbejde.",
      },
      {
        q: "Hvor længe bevares audit-trailet?",
        a: "Audit-trailet bevares i 7 år, hvilket svarer til CSRD-kravet. Det er indbygget i platformen, så du ikke behøver et separat opbevarings- eller arkiverings-projekt.",
      },
      {
        q: "Kan revisoren se hele datakæden?",
        a: "Ja. Sammen med sporet pr. kg CO₂e i platformen danner loggen en ubrudt kæde fra det færdige tal tilbage til den oprindelige faktura. Revisoren kan følge kæden uden at sende forespørgsler.",
      },
      {
        q: "Kan jeg se, hvem der ændrede et bestemt tal?",
        a: "Ja. Loggen registrerer, hvem der foretog hver ændring, så en rettelse altid kan henføres til en person, også når flere kolleger arbejder i samme regnskab.",
      },
      {
        q: "Hvad hvis jeg retter regnskabet, efter en rapport er lavet?",
        a: "Ændringen logges i audit-trailet. Rapporten blev frosset, da den blev genereret: den har et versionsnummer, dens datagrundlag er gemt med en hash, og den ændres aldrig. Retter du regnskabet, genererer du en ny version. Har revisoren attesteret rapporten, er attesteringen bundet til præcis den version, så både historikken og den attesterede rapport står fast.",
      },
    ],
  },
  closingCta: {
    title: "Gør revisionen til et opslag, ikke en jagt",
    description:
      "Book en demo, så viser vi audit-trailet, der automatisk dokumenterer hver ændring, faktor og datakilde bag dit klimaregnskab.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};
