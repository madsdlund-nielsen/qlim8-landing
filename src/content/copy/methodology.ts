// Bundled default copy for /metodologi. CMS pageKey: "page.methodology".
// Section numbering (1-10) is layout and stays in the JSX.

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
  /** The business-as-usual projection of the reduction plan (section 9). */
  forecast: {
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
      "Et klimaregnskab er kun lige så godt som metoden bag. Her kan du se, hvordan vores ser ud.",
    intro:
      "ESG handler ikke om at være pæn og poleret. Det handler om at være ærlig og agere på baggrund af tingenes faktiske tilstand. Derfor er hele qlim8 bygget omkring transparens: hvor data kommer fra, hvordan de kategoriseres, hvilke emissionsfaktorer der bruges, og hvordan beregningen kommer frem til sit endelige tal. Hvert tal kan spores tilbage til den faktura, den måling eller den beslutning, det bygger på.",
  },
  quote1: '"Virksomheder skal bære deres fejl som en rustning. Ærligheden er deres skjold."',
  quote2:
    '"Det er det grundlæggende krav fra en revisor: kan du vise mig hvordan du nåede frem til det her tal."',
  dataSources: {
    title: "Hvor data kommer fra",
    paragraphs: [
      "qlim8 henter aktivitetsdata fra tre slags kilder: dit regnskabssystem, dit elforbrug og din manuelle indtastning.",
      "Fra dit regnskabssystem (fx Dinero, e-conomic eller Billy) hentes dine posteringer direkte via systemets API. Hver postering gemmes, så vi kan tilgå alle detaljer (leverandør, beløb, dato, kontoplan, fritekst), når kategoriseringen senere skal vælges. Xero, QuickBooks Online, Dynamics 365 Business Central og Oracle NetSuite kan også forbindes, og Uniconta er i beta. Bruger du et andet system, kan du importere en CSV-fil med dato og beløb.",
      "Fra Eloverblik, hvor vi er officiel tredjepart hos Energinet, hentes dit elforbrug fra elnettet time for time for hvert målepunkt og din egenproduktion fra solceller, hvis du har solceller installeret. Adgangen giver du med en fuldmagt med MitID på eloverblik.dk. Kørslen er ugentlig på grund af begrænsninger hos Energinet, men du kan altid hente de nyeste data manuelt med ét tryk i platformen, fx når du skal lave en rapport.",
      "Manuelt kan du indtaste data i alle kategorier: forretningsrejser, brændstof, materialeforbrug, hvad det end måtte være. Du skriver fritekst om hvad varelinjen er, og du kan enten selv kategorisere eller lade AI'en foreslå. Uanset valget fremgår det af audit trail, hvilke beslutninger der er truffet, og hvor godt den valgte kategori passer til de data, der er indtastet.",
    ],
  },
  categorization: {
    title: "Hvordan vi kategoriserer",
    paragraphs: [
      "Hver post i klimaregnskabet skal placeres i den rigtige kategori, før den kan beregnes korrekt. qlim8 bruger en tre-niveau-struktur: hovedkategori → underkategori → specifik kategori. Vi forsøger altid at ramme det mest specifikke niveau, og falder ellers tilbage på det næstbedste. Alle valg er synlige i audit trail og får en score, der afhænger af, hvor godt kategorien faktisk matcher.",
      'Eksempel: en stiksav lander i den specifikke kategori "elektrisk håndværktøj", der ligger under "håndværktøj", der igen ligger under hovedkategorien "værktøj". Hvis vi kan vælge "elektrisk håndværktøj", bruger vi den faktor. Hvis ikke, bruger vi en gennemsnitsfaktor for "håndværktøj". Det bedste tilgængelige niveau vælges altid, og det fremgår af beregningen, hvilket niveau der er brugt.',
      "AI'en foreslår kategorisering ud fra alle tilgængelige data: leverandørnavn, fakturatekst, kontoplan, beløb, dato. Hvert forslag har en indbygget confidence score, der følger med ind i audit trail. Du kan altid overskrive forslaget, og hvis du gør det, registreres det også. qlim8 lærer af dine rettelser, så gentagne linjer rammes bedre næste gang.",
    ],
    callout: {
      title: "Grænsen på 85 % sikkerhed",
      body: 'Er AI\'en under 85 % sikker på en kategori (standardgrænsen), vælges det højest mulige niveau som kladde, og posten lægges under "Til gennemsyn". Den tæller først med i klimaregnskabet, når du har taget stilling til den. Her kan du søge i alle kategorier og placere posten manuelt.',
    },
    antiCheatNote:
      "Anti-snyd: Er sikkerheden for en kategori under 50 %, tæller en aktivitetsbaseret post som estimeret og dermed lavest i datakvalitetsscoren. Det skal ikke kunne betale sig at flytte poster til kategorier, der ikke matcher, for at pynte på regnskabet.",
  },
  factors: {
    title: "Hvilke emissionsfaktorer vi bruger",
    paragraphs: [
      "qlim8 bruger primært danske kilder (Klimakompasset og Energinet) og supplerer med internationale kilder som EXIOBASE. Til hver enkelt post vælger vi den faktor, der passer bedst.",
      "Rangordenen følger to principper. For det første har danske kilder forrang frem for internationale, så beregningerne afspejler en dansk kontekst, før vi falder tilbage på internationale data. For det andet følger vi GHG-protokollens datakvalitetshierarki og bruger den mest præcise kilde først: leverandørens egen PCF eller EPD, så faktorer for målte mængder (kWh, liter, kg) og til sidst indkøbsbeløb. I appen viser hver post sin datakvalitet, så du kan se, hvor på rangordenen den ligger.",
    ],
    sources: [
      {
        name: "Klimakompasset",
        note: "Erhvervsstyrelsen og Energistyrelsen. Danske emissionsfaktorer for aktiviteter opgjort i fysiske mængder, fx kWh, liter og kg.",
        danish: true,
      },
      {
        name: "Energinet",
        note: "Officielle danske el-faktorer: CO2-intensitet time for time til den lokationsbaserede beregning og Energinets generelle eldeklaration til den markedsbaserede. Grønne elaftaler med oprindelsesgaranti kan registreres.",
        danish: true,
      },
      {
        name: "EXIOBASE 3.8.2",
        note: "Internationalt input-output-datasæt (2022-data) til spend-baserede beregninger på indkøb, hvor der ikke er fysiske mængder. Faktorerne er angivet i kg CO2e pr. 1.000 kr. i 2020-priser.",
        danish: false,
      },
      {
        name: "Leverandørers PCF og EPD",
        note: "PCF- og EPD-dokumenter, som du eller din leverandør uploader (PDF eller XML efter EN 15804/ILCD). Når en produktlinje er koblet til en godkendt PCF eller EPD, bruges leverandørens eget tal.",
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
      title: "Indkøbsbeløb deflateres før beregning",
      body: "Spend-faktorerne er angivet i kg CO2e pr. 1.000 kr. i 2020-priser, mens dine posteringer typisk er nyere. Derfor deflaterer vi først beløbet med Danmarks Statistiks forbrugerprisindeks, så inflation ikke kunstigt puster udledningen op. Vi bruger kun validerede udgivelser af EXIOBASE, aldrig betaversioner.",
    },
  },
  calculation: {
    title: "Hvordan vi beregner",
    paragraphs: [
      "Selve beregningen er simpel: aktivitetsdata gange emissionsfaktor giver CO2e. Det interessante er hvilke valg vi træffer undervejs.",
      "Vi foretrækker fysiske enheder frem for spend-baserede beregninger, hvor det er muligt. En faktura på 5.000 kr. for 385 liter diesel beregnes ikke ud fra beløbet, men ud fra de liter, der står i fakturaen, ganget med en valideret faktor for diesel fra Klimakompasset. Brændstof, som virksomheden selv køber til sine køretøjer, tælles i Scope 1. Først når vi ikke har fysiske enheder, falder vi tilbage på spend-baserede estimater fra EXIOBASE.",
      "Hver beregning gemmer både input, valgt faktor, kilde, kategoriniveau og resultat, så hvert tal kan spores tilbage til den enkelte beregning og det bilag eller den måleraflæsning, den bygger på. Biogen CO2 vises separat for de brændsler, der har en biogen faktor.",
    ],
  },
  auditTrail: {
    title: "Audit trail: hvert tal kan spores",
    paragraphs: [
      'Vores audit trail kan ikke redigeres eller slettes i programmet. Det er en designbeslutning, ikke en bivirkning. Når en kategorisering ændres, en faktor opdateres, eller en bruger retter et input, tilføjes ændringen til audit trail, og den oprindelige post bliver stående. Når en linje skifter kategori, gemmes tidspunktet, hvem der ændrede den, og den tidligere værdi. qlim8 beder om en begrundelse, så ændringen ikke bare står som "rettet". For dine egne brugere er begrundelsen frivillig, men en konsulent skal altid give en. Den eneste undtagelse fra reglen om sletning er personoplysninger, som kan slettes efter en GDPR-anmodning.',
      "Hver audit trail får en unik hash, et langt fingeraftryk, som du kan se i beregningsdetaljerne. Hasherne hænger sammen i en kæde, så det kan ses, hvis en post er blevet ændret. Hashen hører til den enkelte audit trail, ikke til beregningen i sig selv. Derfor deler to identiske beregninger ikke hash, når de stammer fra forskellige posteringer med forskellig historik.",
      "Rapporter er også uforanderlige. Når du genererer en VSME-rapport eller en PDF, fryser qlim8 et snapshot af det, rapporten bygger på: input, faktorer og audit trail. Rapporten får et versionsnummer, og den bliver ikke ændret bagefter. Genererer du igen, bliver det en ny version, så du om fem år kan trække præcis den rapport frem, du sendte. Det er det grundlæggende krav fra en revisor: kan du vise mig hvordan du nåede frem til det her tal, præcis som det stod på rapporten?",
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
      body: "Audit trail kan eksporteres som en komplet CSV-oversigt over alle posteringer. Excel-rapporten viser hver linje med dato, kategori, mængde, emissionsfaktor og kilde, og unikke ID'er og bilagsreferencer ligger i revisionspakken. Hver rapport gemmes med et uforanderligt snapshot af de tal, faktorer og det revisionsspor, den bygger på. Det letter revisorens opgave markant.",
    },
  },
  dataQuality: {
    title: "Hvordan vi måler datakvalitet",
    intro:
      "Vi viser en datakvalitetsscore fra 0 til 100 øverst på dit dashboard. Den er ikke et marketingstunt, men en konkret, vægtet beregning af, hvor gode dine underliggende data er. Forhåbentlig bliver den bedre over tid.",
    pointsIntro: "Hver emissionspost får point baseret på hvilken type data der ligger bag:",
    points: [
      { points: "100 point", text: "Leverandørens egen PCF eller EPD (mest specifik)" },
      { points: "85 point", text: "LCA-baseret faktor for en målt mængde" },
      { points: "70 point", text: "Fysiske enheder med konkret emissionsfaktor (fx elektricitet, fjernvarme)" },
      { points: "40 point", text: "Spend-baseret estimat ud fra indkøbsbeløbet" },
      { points: "20 point", text: "Estimeret eller lav sikkerhed for kategorien (mindst specifik)" },
    ],
    paragraphsAfter: [
      "Den samlede datakvalitetsscore er et vægtet gennemsnit baseret på din virksomheds samlede udledning. En post på 100 ton CO2e med 70 point vejer mere end en post på 1 ton CO2e med 100 point. Det betyder, at scoren afspejler dataens kvalitet der hvor det betyder noget.",
      "Du ser scoren direkte på dashboardet. Vi skjuler den ikke. Den er en del af det at være ærlig, og over tid er det den der peger din virksomhed mod bedre datapraksis, fordi du kan se hvor du kan blive bedre.",
    ],
  },
  standards: {
    title: "Standarder vi følger",
    intro: "qlim8's metodologi er bygget oven på de internationale standarder for drivhusgasrapportering:",
    items: [
      {
        name: "GHG Protocol Corporate Standard",
        body: "Det grundlæggende rammeværk for virksomheders rapportering af Scope 1 og 2.",
      },
      {
        name: "GHG Protocol Corporate Value Chain (Scope 3) Standard",
        body: "Specifik vejledning for de 15 kategorier i Scope 3.",
      },
      {
        name: "VSME (Voluntary SME standard)",
        body: "EFRAG's frivillige bæredygtighedsstandard for små og mellemstore virksomheder. Vi laver VSME-rapporter i både Basic- og Comprehensive-modulet. De genereres direkte fra EFRAG's egen Excel-skabelon, så de er maskinlæsbare for modtageren, fx banken.",
      },
    ],
    callout: {
      title: "Hvad vi endnu ikke har",
      body: "qlim8's metodologi er ikke formelt tredjepartscertificeret. Er det et krav i din organisation, så kontakt os. Det er på vej.",
    },
  },
  updates: {
    title: "Hvordan vi holder os ajour",
    paragraphs: [
      "Emissionsfaktorer ændrer sig. Elmixet bliver grønnere, leverandører udgiver nye EPD'er, og Klimakompasset opdateres årligt med revision af faktorer. qlim8 følger disse opdateringer og bruger kun validerede versioner af hver kilde.",
      "Vi genberegner ikke historiske beregninger bagudrettet, når en faktor opdateres. Det er et bevidst valg: en ny faktor afspejler at den virkelige verden har ændret sig, ikke at den gamle beregning var forkert. Hvis vi rettede historikken hver gang en faktor blev opdateret, ville du aldrig have et sammenligneligt baseline-år, og dine reduktionsmål ville flytte sig under fødderne på dig.",
      "Hver beregning gemmer derfor versionsnummeret på den faktor der blev brugt, så du om to år stadig kan se præcis hvilken Klimakompas-version din 2024-baseline byggede på.",
    ],
  },
  forecast: {
    title: "Forventet forløb uden nye tiltag",
    paragraphs: [
      "I reduktionsplanen viser qlim8 også et forventet forløb, hvis virksomheden ikke gør mere. Det er en fremskrivning og ikke en måling, og det indgår aldrig i opgørelsen, i rapporterne eller i målets fremdrift. Forløbet starter i det seneste afsluttede regnskabsår og er fladt, medmindre virksomheden selv lader en kategori følge omsætningen eller antallet af medarbejdere og angiver en årlig vækst.",
      "Elforbrugets udledning følger Energistyrelsens fremskrevne el-emissionsfaktor for 2025–2035 (KF25, udgivet 24. september 2025), det gennemsnitlige udslip pr. forbrugt kWh fra det danske net. Har virksomheden Eloverblik, bruger qlim8 serien for Vestdanmark (DK1) eller Østdanmark (DK2) efter målepunkternes postnumre, vejet efter hvor meget strøm hvert målepunkt bruger. Uden Eloverblik, eller for et målepunkt uden postnummer, bruges landsgennemsnittet og aldrig Vestdanmark som standard. Efter 2035 holdes den sidste værdi uændret, og fjernvarme holdes uændret.",
      "Fremskrivningen ændrer virksomhedens eget niveau i samme forhold og erstatter det ikke. Linjen nævner den udgave, den bygger på, og planen bruger altid Energistyrelsens nyeste udgave. Fremskrivningen er usikker, fordi den forudsætter, at der ikke kommer nye politiske tiltag.",
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
        body: "qlim8 bruger de PCF'er og EPD'er, som du eller dine leverandører uploader, og LCA-baserede faktorer, hvor de findes, men vi udfører ikke selv LCA-arbejde for de enkelte produkter.",
      },
      {
        title: "Vi bruger ikke beta-data.",
        body: "Selv om EXIOBASE eller en anden kilde har en nyere version i beta, bruger vi den ikke. Kun officielle, validerede udgivelser.",
      },
      {
        title: "Vi skjuler ikke dårlig datakvalitet.",
        body: "Datakvalitetsscoren står øverst på dit dashboard. Ærligheden er din virksomheds skjold.",
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
