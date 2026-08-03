// Bundled default copy for /metodologi. CMS pageKey: "page.methodology".
// Section numbering (1-9) is layout and stays in the JSX.

export const METHODOLOGY_PAGE_KEY = "page.methodology";

export interface MethodologySource {
  name: string;
  note: string;
  danish: boolean;
}

export interface MethodologyQualityPoint {
  points: string;
  text: string;
}

export interface MethodologyStandard {
  name: string;
  body: string;
}

export interface MethodologyNotDoingItem {
  title: string;
  body: string;
}

export interface MethodologyCallout {
  title: string;
  body: string;
}

export interface MethodologyCopy {
  hero: {
    title: string;
    subtitle: string;
    intro: string;
  };
  quote1: string;
  quote2: string;
  dataSources: {
    title: string;
    paragraphs: string[];
  };
  categorization: {
    title: string;
    paragraphs: string[];
    callout: MethodologyCallout;
    antiCheatNote: string;
  };
  factors: {
    title: string;
    paragraphs: string[];
    sources: MethodologySource[];
    danishPriorityLabel: string;
    callout: MethodologyCallout;
  };
  calculation: {
    title: string;
    paragraphs: string[];
  };
  auditTrail: {
    title: string;
    paragraphs: string[];
    containsLabel: string;
    contains: string[];
    callout: MethodologyCallout;
  };
  dataQuality: {
    title: string;
    intro: string;
    pointsIntro: string;
    points: MethodologyQualityPoint[];
    paragraphsAfter: string[];
  };
  standards: {
    title: string;
    intro: string;
    items: MethodologyStandard[];
    callout: MethodologyCallout;
  };
  updates: {
    title: string;
    paragraphs: string[];
  };
  notDoing: {
    title: string;
    intro: string;
    items: MethodologyNotDoingItem[];
  };
  outro: {
    title: string;
    body: string;
    linkContact: string;
    linkDocs: string;
    linkHome: string;
  };
}

export const METHODOLOGY_COPY: MethodologyCopy = {
  hero: {
    title: "Sådan bygger vi qlim8",
    subtitle:
      "Et klimaregnskab er kun lige så godt som metodologien bag. Her er hvordan vores ser ud, uden filter.",
    intro:
      "ESG handler ikke om at være pæn. Det handler om at være ærlig og agere på baggrund af tingenes faktiske tilstand. Derfor er hele qlim8 bygget omkring transparens: hvor data kommer fra, hvordan den kategoriseres, hvilken emissionsfaktor der bruges, og hvordan beregningen kommer til sit endelige tal. Du kan altid klikke fra et samlet CO2e-tal ned til den enkelte faktura, den enkelte måling, den enkelte beslutning. Det er ikke en feature: det er metoden.",
  },
  quote1: '"Virksomhederne skal bære deres fejl som en rustning. Ærligheden er deres skjold."',
  quote2:
    '"Det er det grundlæggende krav fra en revisor: kan du vise mig hvordan du nåede frem til det her tal."',
  dataSources: {
    title: "Hvor data kommer fra",
    paragraphs: [
      "qlim8 henter aktivitetsdata fra tre slags kilder: dit regnskabssystem, dit elforbrug og din manuelle indtastning.",
      'Fra dit regnskabssystem (Dinero, e-conomic eller Billy) hentes alle posteringer via nattlige API-kørsler. Hver postering gemmes som struktureret JSON-metadata, så vi kan tilgå hver detalje (leverandør, beløb, dato, kontoplan, fritekst) når kategoriseringen senere skal vælges. Vi henter alt, ikke kun "indkøb".',
      "Fra Eloverblik, hvor vi er officiel tredjepart hos Energinet, hentes både dit elforbrug fra elnettet og din egetproduktion fra solceller, hvis du har dem. Kørslen er ugentlig på grund af rate limits hos Energinet, men du kan altid hente nyeste data manuelt med ét tryk i UI'en.",
      "Manuelt kan du indtaste data i alle kategorier: forretningsrejser, brændstof, materialeforbrug, hvad det end måtte være. Du skriver fritekst om hvad varelinjen er, og du kan enten selv kategorisere eller lade AI'en foreslå. Uanset valget fremgår det af audit trail.",
    ],
  },
  categorization: {
    title: "Hvordan vi kategoriserer",
    paragraphs: [
      "Hver post i klimaregnskabet skal placeres i den rigtige kategori, før den kan beregnes korrekt. qlim8 bruger en tre-niveau-struktur: hovedkategori → underkategori → specifik kategori. Vi forsøger altid at ramme det mest specifikke niveau, og falder ellers tilbage på det næstbedste.",
      'Eksempel: en stiksav lander i den specifikke kategori "elektrisk håndværktøj", der ligger under "håndværktøj", der igen ligger under hovedkategorien "værktøj". Hvis vi kan vælge "elektrisk håndværktøj", bruger vi den faktor. Hvis ikke, bruger vi en gennemsnitsfaktor for "håndværktøj". Det bedste tilgængelige niveau vælges altid, og det fremgår af beregningen, hvilket niveau der er brugt.',
      "AI'en foreslår kategorisering baseret på al tilgængelig metadata: leverandørnavn, fakturatekst, kontoplan, beløb, dato. Hvert forslag har en indbygget confidence score, der følger med ind i audit trail. Du kan altid overskrive forslaget, og hvis du gør det, registreres det også.",
    ],
    callout: {
      title: "85% confidence threshold",
      body: 'Hvis AI\'en ikke kan finde en kategori med over 85% confidence, vælges højest mulige niveau som draft, og posten dukker op på dit dashboard under "Kræver jeres opmærksomhed". Her kan du frisøge i alle kategorier og placere posten manuelt.',
    },
    antiCheatNote:
      "Anti-snyd: Manuelt valg af en kategori med under 5% confidence trækkes fra i din samlede datakvalitetsscore. Det skal ikke kunne betale sig at flytte poster til kategorier der ikke matcher.",
  },
  factors: {
    title: "Hvilke emissionsfaktorer vi bruger",
    paragraphs: [
      "qlim8 har omkring 50.000 validerede emissionsfaktorer fra en kombination af danske og internationale kilder. Vi multiplicerer dem ikke kreativt med regioner eller år for at få større tal: vi tæller dem som de er, og vi vælger den rigtige til hver enkelt post.",
      "Rangordenen følger to principper. For det første: danske kilder har forrang frem for internationale, så beregningerne afspejler en dansk kontekst før vi falder tilbage på europæiske gennemsnit. For det andet: vi følger GHG Protokollens datakvalitetshierarki: specifikke målinger og LCA-data har forrang frem for branchespecifikke gennemsnit, som har forrang frem for spend-baserede estimater.",
    ],
    sources: [
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
    ],
    danishPriorityLabel: ", dansk forrang",
    callout: {
      title: "Inflation-tilbagediskontering på EXIOBASE",
      body: "EXIOBASE's nyeste validerede udgivelse er typisk ældre end de regnskabsposteringer der skal beregnes på. Vi løser det ved at tilbagediskontere det monetære input til EXIOBASE-udgivelsens basisår, så inflation ikke kunstigt oppuster udledningen. Vi bruger kun EXIOBASE's seneste validerede public release, aldrig betaer.",
    },
  },
  calculation: {
    title: "Hvordan vi beregner",
    paragraphs: [
      "Selve beregningen er simpel: aktivitetsdata gange emissionsfaktor giver CO2e. Det interessante er hvilke valg vi træffer undervejs.",
      "Vi foretrækker fysiske enheder frem for spend-baserede beregninger, hvor det er muligt. En faktura på 5.000 kr for diesel beregnes ikke ud fra beløbet. Den beregnes ud fra de liter der står i fakturaen, ganget med en validitet diesel-faktor. Først når vi ikke har fysiske enheder, falder vi tilbage på spend-baserede estimater fra EXIOBASE.",
      "Hver beregning gemmer både input, valgte faktor, kilde, kategori-niveau og resultat. Så du altid kan klikke fra det samlede CO2e-tal ned til den enkelte beregning og se præcis hvor tallet kommer fra.",
    ],
  },
  auditTrail: {
    title: "Audit trail: hvert tal kan spores",
    paragraphs: [
      'Vores audit trail kan ikke slettes eller forkortes. Det er en designbeslutning, ikke en bivirkning. Når en kategorisering ændres, en faktor opdateres, eller en bruger retter et input, tilføjes ændringen til audit trail, den oprindelige post forbliver. Du kan altid se hvem der lavede hvad, hvornår, og med hvilken begrundelse. Ved kategoriændringer efter en beregning er lavet, beder qlim8 brugeren om at indtaste en begrundelse, så ændringen ikke bare står som "rettet".',
      "Hver audit trail får en unik hash: det er den, du ser i beregningsdetaljer-popup'en. Hashen er navnet på audit trail, ikke beregningen i sig selv. Det betyder at to identiske beregninger ikke deler hash, fordi de stammer fra forskellige posteringer med forskellig historik.",
      "Rapporter er også immutable. Når du genererer en VSME-rapport eller en PDF, fryser qlim8 et komplet snapshot af alt der indgår (input, faktorer, audit trail, datakvalitetsberegning), så du om fem år kan trække rapporten frem og reproducere den 1:1. Det er det grundlæggende krav fra en revisor: kan du vise mig hvordan du nåede frem til det her tal, præcis som det stod på rapporten?",
    ],
    containsLabel: "Hvad audit trail indeholder:",
    contains: [
      "Datoer og tidsstempler",
      "Bruger der har lavet handlingen",
      "Input-værdier (rå data fra kilde)",
      "Valgt emissionsfaktor og dens kilde",
      "Konfidens-score ved AI-kategorisering",
      "Eventuelle ændringer + begrundelse",
      "Versionering af alle elementer",
      "Tilhørende beregnet output",
    ],
    callout: {
      title: "To formater til revisor",
      body: "Audit trail kan eksporteres som komplet CSV-oversigt over alle posteringer. Når du genererer en PDF-rapport (ikke VSME, der er Excel-formatet det officielle), ligger audit trail som et pænere bilag bagest i rapporten, inklusive nøgletal på bilagets integritet og en oversigt over poster der stikker ud fra normalen. Det letter revisorens opgave markant.",
    },
  },
  dataQuality: {
    title: "Hvordan vi måler datakvalitet",
    intro:
      "Vi viser en datakvalitetsscore øverst på dit dashboard og på forsiden af hver PDF-rapport. Den er ikke marketing: den er en konkret, vægtet beregning af hvor god din underliggende data er.",
    pointsIntro: "Hver emissionspost får point baseret på hvilken type data der ligger bag:",
    points: [
      { points: "5 point", text: "LCA eller produkt-PCF (mest specifik)" },
      { points: "4 point", text: "EPD (produkt-specifik miljøvaredeklaration)" },
      { points: "3 point", text: "Fysiske enheder med konkret emissionsfaktor (fx elektricitet, fjernvarme)" },
      { points: "1 point", text: "Spend-baseret estimat (mindst specifik)" },
      { points: "−1 point", text: "Manuelt valgt kategori med under 5% confidence (anti-snyd)" },
    ],
    paragraphsAfter: [
      "Den samlede datakvalitetsscore er et vægtet gennemsnit baseret på din virksomheds samlede udledning. En post på 100 ton CO2e med 3 point vejer mere end en post på 1 ton CO2e med 5 point. Det betyder, at scoren afspejler dataens kvalitet der hvor det betyder noget.",
      "Du ser scoren direkte på dashboardet, og du ser den på forsiden af enhver custom PDF-rapport. Vi skjuler den ikke. Den er en del af det at være ærlig, og over tid er det den der peger din virksomhed mod bedre datapraksis, fordi du kan se hvor du kan blive bedre.",
    ],
  },
  standards: {
    title: "Standarder vi følger",
    intro: "qlim8's metodologi er bygget oven på de internationale standarder for drivhusgasrapportering:",
    items: [
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
        body: "EFRAG's frivillige bæredygtighedsstandard for små og mellemstore virksomheder. Vi genererer VSME-rapporter direkte fra EFRAG's egen Excel-skabelon, så de er maskinlæsbare for bankerne, som er det format bankerne forventer.",
      },
    ],
    callout: {
      title: "Hvad vi ikke har: endnu",
      body: "qlim8's metodologi er ikke formelt tredjepartscertificeret. Vi har dialog med fagligt miljø på Syddansk Universitets Life Cycle Centre om kvalitetssikring, men der foreligger intet på skrift, og vi vil ikke navngive personer eller insinuere godkendelse vi ikke har. Hvis det er et must-have for din organisation, kontakt os. Vi er på vej.",
    },
  },
  updates: {
    title: "Hvordan vi holder os ajour",
    paragraphs: [
      "Emissionsfaktorer ændrer sig. El-mixet bliver grønnere, nye EPD'er udgives, Klimakompasset opdateres årligt med revision af faktorer. qlim8 følger disse opdateringer og bruger altid den nyeste validerede version af hver kilde.",
      "Vi genberegner ikke historiske beregninger bagudrettet, når en faktor opdateres. Det er et bevidst valg: en ny faktor afspejler at den virkelige verden har ændret sig, ikke at den gamle beregning var forkert. Hvis vi rettede historikken hver gang en faktor blev opdateret, ville du aldrig have et sammenligneligt baseline-år, og dine reduktionsmål ville flytte sig under fødderne på dig.",
      "Hver beregning gemmer derfor versionsnummeret på den faktor der blev brugt, så du om to år stadig kan se præcis hvilken Klimakompas-version din 2024-baseline byggede på.",
    ],
  },
  notDoing: {
    title: "Hvad vi ikke gør",
    intro:
      "Det er lige så vigtigt at fortælle hvad vi ikke gør, som hvad vi gør. Vi vil ikke have at du ender med et klimaregnskab du tror er noget andet, end det er.",
    items: [
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
        body: "qlim8 bruger eksisterende EPD'er og LCA-data hvor de findes, men vi udfører ikke selv primær LCA-arbejde for individuelle produkter.",
      },
      {
        title: "Vi bruger ikke beta-data.",
        body: "Selv om EXIOBASE eller en EPD-database har en nyere version i beta, bruger vi den ikke. Kun officielle, validerede udgivelser.",
      },
      {
        title: "Vi skjuler ikke dårlig datakvalitet.",
        body: "Datakvalitetsscoren står på dit dashboard og på forsiden af hver PDF-rapport. Ærligheden er virksomhedens skjold.",
      },
    ],
  },
  outro: {
    title: "Spørgsmål om metoden?",
    body: "Hvis du eller din revisor har konkrete spørgsmål til hvordan en beregning kommer i stand, er vi tilgængelige. Ærlig dialog om metoden er en del af det at have en sporbar platform.",
    linkContact: "Kontakt os →",
    linkDocs: "Se den tekniske dokumentation →",
    linkHome: "Tilbage til forsiden →",
  },
};
