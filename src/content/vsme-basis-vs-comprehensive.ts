import type { Article } from './article'

export const artikel: Article = {
  slug: 'vsme-basis-vs-comprehensive',
  title: 'Den ultimative VSME-guide: Skal din SMV vælge Basis- eller Comprehensive-modulet?',
  description:
    'EFRAG har defineret to moduler af VSME-standarden — Basis og Comprehensive. Den rigtige beslutning afhænger af, hvem der spørger efter jeres data og hvor I står strategisk. Her er den ærlige guide.',
  category: 'Compliance',
  publishedAt: '2026-05-06',
  readingTime: 14,
  sections: [
    {
      type: 'lead',
      text: 'Det er det spørgsmål, jeg får mest fra danske SMV-ejere lige nu: Skal vi nøjes med VSME Basis-modulet, eller skal vi gå hele vejen og lave Comprehensive?',
    },
    {
      type: 'paragraph',
      text: 'Det korte svar er, at det afhænger af, hvem der spørger efter dine data, og hvor I står strategisk. Det lange svar er det her — og det vigtigste, mange SMV\'er ikke ved: Comprehensive er ikke "mere af det samme", det er noget andet, til en anden situation. At vælge forkert er en reel risiko, både hvis I undervælger og hvis I overvælger.',
    },
    {
      type: 'paragraph',
      text: 'Lad mig først give dig en hurtig opdatering på hvad VSME egentlig er i 2026, fordi det har ændret sig betydeligt siden standarden blev udgivet, og fordi der er en ny, vigtig udvikling, langt de fleste SMV\'er endnu ikke har hørt om.',
    },

    { type: 'h2', text: 'VSME i 2026: Mere end en frivillig standard' },
    {
      type: 'paragraph',
      text: 'VSME — Voluntary Sustainability Reporting Standard for non-listed SMEs — blev udviklet af EFRAG (European Financial Reporting Advisory Group) og godkendt i november 2024. Standarden blev finaliseret i december samme år, og den 30. juli 2025 vedtog EU-Kommissionen den officielt som Recommendation 2025/1710. Det betyder, at den nu er en formel europæisk anbefaling — ikke en juridisk bindende rapporteringspligt, men en officielt anerkendt fælles standard.',
    },
    {
      type: 'paragraph',
      text: 'Det interessante er, hvad der skete kort efter. Den 24. februar 2026 vedtog EU Omnibus I-direktivet, der blandt andet introducerede en såkaldt Value Chain Cap. Det betyder, at store CSRD-omfattede virksomheder ikke længere må kræve mere ESG-data fra deres SMV-leverandører end det, VSME specificerer.',
    },
    {
      type: 'paragraph',
      text: 'Det er en bestemmelse, jeg synes alle danske SMV\'er burde kende. Hvis jeres største kunde har sendt et 40-siders ESG-spørgeskema med krav, der går langt ud over VSME, har I nu et juridisk grundlag for at sige nej. I behøver ikke svare på alt. I skal svare på VSME — hverken mere eller mindre. Det er et juridisk loft, ikke et gulv.',
    },
    {
      type: 'paragraph',
      text: 'Det her flytter VSME fra at være "endnu en compliance-byrde" til at være et juridisk skjold. Bankerne har konvergeret om standarden, EU-kommissionen har officielt anbefalet den, og storkunder har nu fået en lovbestemt grænse for, hvor meget de må kræve. Hvis I vælger at lave VSME ordentligt, har I dokumentation, der er beskyttet af både regulatorisk konsensus og direktiv-tekst.',
    },
    { type: 'paragraph', text: 'Det er den verden, jeres beslutning om Basis eller Comprehensive bliver truffet i.' },

    { type: 'h2', text: 'Basis-modulet: Det stærke fundament' },
    {
      type: 'paragraph',
      text: 'VSME Basis er det modul, der dækker hvad I faktisk har gjort. Det er bagudskuende, kvantitativt og fokuseret på de data, der typisk allerede findes i jeres systemer.',
    },
    {
      type: 'paragraph',
      text: 'Konkret dækker Basis-modulet otte hovedområder. På miljøsiden: energiforbrug, drivhusgasudledninger i Scope 1, 2 og 3, vandforbrug, og biodiversitet (med begrænset omfang for SMV\'er, der ikke arbejder direkte med naturpåvirkning). På den sociale side: medarbejderforhold, arbejdsmiljø, og en grundlæggende beskrivelse af forretningsetik og governance. På styringssiden: beskrivelse af bæredygtighedspolitikker og hvem i organisationen, der har ansvar.',
    },
    {
      type: 'paragraph',
      text: 'Det vigtige ved Basis-modulet er, at det stort set kan fyldes ud fra data, der allerede findes i jeres regnskabssystem, jeres lønsystem, jeres eldeklaration og en kort selvevaluering af governance-strukturen. For langt de fleste danske SMV\'er er det her, hvor 80-90 % af det, banken eller den større kunde reelt har brug for, kan dokumenteres.',
    },
    {
      type: 'paragraph',
      text: 'EFRAG har udgivet en officiel Excel-skabelon, og det er den, bankerne foretrækker. Den er maskinaflæselig, så bankrådgiveren kan trække jeres tal direkte ind i deres egne kreditmodeller uden manuel indtastning. Hvis I afleverer en pæn hjemmelavet PDF, der ikke følger skabelonens struktur, er der en god chance for, at jeres dokumentation aldrig kommer ind i bankens system. Det er sådan en lille teknisk detalje, som koster reel værdi for jer, hvis I rammer forkert.',
    },
    {
      type: 'paragraph',
      text: 'For en almindelig dansk SMV med 15-50 ansatte og en tilkoblet datakilde tager VSME Basis typisk få timer at færdiggøre med den rigtige software — og 3-6 uger med manuelt arbejde i Excel.',
    },
    {
      type: 'paragraph',
      text: 'Hvem Basis-modulet er nok for: Mikrovirksomheder og SMV\'er, der primært skal levere data til banken som led i den årlige kreditrevurdering. SMV\'er i lav-eksponerede brancher — typisk service, rådgivning, mindre handel, kontoraktivitet — hvor banken nøjes med branchedata suppleret med jeres basale tal. Virksomheder, der ikke er en strategisk leverandør til CSRD-omfattede storkunder med specifikke krav om transitions-planer.',
    },
    { type: 'paragraph', text: 'Hvis I er der, så er Basis tilstrækkeligt. Lav det, læg det fra jer, og brug tiden på at drive forretning.' },

    { type: 'h2', text: 'Comprehensive-modulet: Strategi, mål og fremtidsplan' },
    {
      type: 'paragraph',
      text: 'Comprehensive-modulet er hvor billedet skifter karakter. Det er ikke bare "Basis plus lidt mere". Det er strukturelt anderledes og kræver en anden type arbejde.',
    },
    {
      type: 'paragraph',
      text: 'Hvor Basis er bagudskuende og spørger "hvad udledte I sidste år?", er Comprehensive fremadrettet og spørger "hvad er jeres plan for at reducere det?". Det er bygget op omkring det, EFRAG kalder PAT-strukturen: Policies, Actions, Targets. Det er ikke længere kun et regnskab, det er en strategi.',
    },
    {
      type: 'paragraph',
      text: 'Modulet indeholder syv specifikke disclosure-områder, C1 til C7. EFRAG udgav i december 2025 detaljerede Supporting Guides for tre af de mest centrale, og udgav i februar 2026 en serie pædagogiske videoer for at hjælpe SMV\'er med at navigere dem. Det giver et indtryk af kompleksiteten: når EFRAG selv vurderer, at SMV\'er har brug for videoinstruktion til at forstå Comprehensive, så er det ikke noget, man læser en eftermiddag og udfylder.',
    },
    { type: 'paragraph', text: 'De tre centrale disclosures er:' },
    {
      type: 'paragraph',
      text: 'C2 — Beskrivelse af praksis, politikker og fremtidige initiativer. Hvor Basis-modulet spørger om I har en bæredygtighedspolitik, beder Comprehensive jer beskrive den med eksempler og dokumentation. Hvad gør I konkret? Hvad har I planer om?',
    },
    {
      type: 'paragraph',
      text: 'C3 — GHG-reduktionsmål og klima-omstillingsplaner. Det her er den tunge disclosure for de fleste SMV\'er. I skal definere konkrete reduktionsmål for Scope 1, 2 og 3, dokumentere baseline, og lægge en troværdig plan for, hvordan I når målet. EFRAG\'s eget eksempel i deres Supporting Guide følger en fiktiv SMV i en klima-intensiv branche, der reducerer fra 5.000 tCO2e i 2025 til 3.850 tCO2e i 2030 — en 23 % reduktion. Det er den slags konkrete, dokumenterede mål, Comprehensive forventer.',
    },
    {
      type: 'paragraph',
      text: 'C7 — Medarbejderforhold og leverandørkæde-hensyn. En udvidet beskrivelse af, hvordan I behandler både egne medarbejdere og dem i jeres værdikæde.',
    },
    {
      type: 'paragraph',
      text: 'De øvrige disclosures (C1, C4, C5, C6) dækker emner som finansielle bæredygtighedsrisici, due diligence-processer, og sektorspecifikke forhold. De er typisk mindre tunge, men kræver stadig arbejde.',
    },
    {
      type: 'paragraph',
      text: 'Det her er ikke noget, man fylder ud i et regneark på en eftermiddag. Det er en strategisk øvelse, der typisk involverer flere i ledelsen, en eller flere workshops, og ofte en konsulent eller intern bæredygtighedsmedarbejder, der kan facilitere processen. Comprehensive er det modul, hvor en god konsulents dømmekraft reelt skaber værdi — at oversætte en virksomheds strategi til den rigtige form i C2 og C3 er præcis det, software ikke kan og ikke bør automatisere fuldt ud.',
    },
    {
      type: 'paragraph',
      text: 'Hvem Comprehensive-modulet er rigtigt for: SMV\'er, der er strategisk leverandør til CSRD-omfattede virksomheder, der eksplicit beder om Comprehensive (eller dets indhold). Virksomheder, der vil bruge ESG som aktiv konkurrencefordel — vinde udbud, tiltrække investorer, differentiere sig overfor banker med bæredygtighedslinkede lånevilkår. Virksomheder, der i forvejen har en bæredygtighedsstrategi og bare mangler at formalisere den.',
    },

    { type: 'h2', text: 'Det virkelige spørgsmål: Hvem spørger efter hvad?' },
    {
      type: 'paragraph',
      text: 'Hvis I bare svarer på spørgsmålet "skal vi vælge Basis eller Comprehensive?" abstrakt, ender I oftest med et forkert svar. Det rigtige spørgsmål er: Hvem spørger jer om data, og hvad har de konkret brug for?',
    },
    {
      type: 'paragraph',
      text: 'Banken spørger næsten altid efter Basis. Bankerne kører i kreditmodeller, der har brug for kvantificerbare data: udledning, energiforbrug, eksponering mod fysiske og omstillingsrisici. De har ikke brug for at vide, om I har en politik for medarbejderudvikling formuleret i fem afsnit. Min erfaring fra at tale med bankrådgivere over hele Danmark — Nykredit, Jyske Bank, Danske Bank Erhverv, Sparekassen Sjælland-Fyn, og flere mindre lokalbanker — er at de stort set alle tager imod VSME Basis som tilstrækkelig dokumentation, så længe tallene er sporbare og rapporten er i det officielle format.',
    },
    {
      type: 'paragraph',
      text: 'Store CSRD-kunder spørger efter Comprehensive — men kun til en grænse. Det er her, Value Chain Cap fra Omnibus I-direktivet bliver afgørende. Hvis jeres største kunde er en CSRD-omfattet virksomhed med over 1.000 medarbejdere, må de stille spørgsmål om VSME-indhold, men de må ikke længere kræve mere end det. Hvis I har lavet VSME Basis og en mindre del af Comprehensive — typisk C3 om reduktionsmål, som er det, store kunder primært bruger til deres egen Scope 3-rapportering — så har I dækket, hvad I lovligt skal levere. Hvis kunden alligevel kræver mere, har I et legitimt grundlag for at sige nej eller forhandle.',
    },
    {
      type: 'paragraph',
      text: 'Investorer og potentielle købere spørger ofte efter Comprehensive. Hvis I er i en exit-proces, søger ekstern finansiering, eller har en bestyrelse med tilknyttede investorer, vil Comprehensive typisk være forventet. Det signalerer, at I har en strategi, ikke kun et regnskab.',
    },
    {
      type: 'paragraph',
      text: 'Forbrugere og medier spørger sjældent direkte. Men hvis I markedsfører jer som "klimavenlig", "grøn" eller "bæredygtig", forventer Forbrugerombudsmanden, at I kan dokumentere det. Et VSME Comprehensive med konkrete mål og handlinger er en del af det dokumentationsgrundlag. Et tomt brand-statement uden underliggende strategi er det, der typisk udløser greenwashing-anklager.',
    },
    {
      type: 'paragraph',
      text: 'Med andre ord: Spørg ikke "hvad er bedst", spørg "hvem spørger". Lav det, der dækker dem, der reelt har brug for det. Og udvid, når en ny situation opstår.',
    },

    { type: 'h2', text: 'Hvad det reelt kræver af jer' },
    { type: 'paragraph', text: 'Lad mig være konkret om arbejdsmængden, fordi det er det, de fleste artikler holder mystisk.' },
    {
      type: 'paragraph',
      text: 'VSME Basis i praksis for en typisk SMV med tilkoblet regnskabssystem og eldeklaration: dataindsamling sker automatisk eller på få timer; kategorisering og validering tager typisk 2-4 timer; rapport-generering i den officielle skabelon tager 5-10 minutter med den rigtige software. Total: en halv arbejdsdag for første rapport, mindre for de efterfølgende, forudsat at dataindsamlingen kører i baggrunden.',
    },
    {
      type: 'paragraph',
      text: 'Hvis I gør det manuelt i Excel, ganger I tiden med 30-50, fordi I selv skal slå emissionsfaktorer op, opdatere dem løbende, og bygge VSME-strukturen fra bunden. Det er ikke umuligt — det er bare meget mere arbejde.',
    },
    {
      type: 'paragraph',
      text: 'VSME Comprehensive i praksis for samme virksomhed: Basis-data er stadig grundlaget, men dertil kommer mindst tre faser. Først en strategiproces, hvor ledelsen definerer reduktionsmål og handlinger — typisk en workshop på en halv eller hel dag. Derefter scenario-modellering, hvor I tester forskellige tiltag og deres effekt: udskiftning af bilflåde, energirenovering, leverandørskift, og lignende. Det er den proces, vi har bygget vores Scenario Builder til, fordi det er det, der konkret kan automatiseres med ordentlig data. Og endelig dokumentation i de specifikke disclosures C1-C7 efter EFRAG\'s Supporting Guides — det er typisk her, en konsulent eller intern facilitator gør størst forskel, fordi det handler om at oversætte strategi til den rigtige form.',
    },
    {
      type: 'paragraph',
      text: 'Total tidsbrug: en halv til hel arbejdsuge for første Comprehensive-rapport, plus den løbende vedligeholdelse af mål og tracking af fremdrift. Andet år er typisk hurtigere, fordi grundstrukturen er etableret.',
    },
    { type: 'paragraph', text: 'Det er ikke en byrde, der vælter en SMV. Men det er heller ikke noget, man bare lige snupper med ved siden af.' },

    { type: 'h2', text: 'Bliver VSME obligatorisk? Mit ærlige bud' },
    {
      type: 'paragraph',
      text: 'Det er det spørgsmål, der ofte kommer hen mod slutningen af samtaler med SMV-ejere: "Hvorfor skal vi overhovedet gøre det, hvis det er frivilligt? Kan vi ikke bare vente?"',
    },
    { type: 'paragraph', text: 'Lad mig give dig den nuancerede version, fordi den er vigtig.' },
    {
      type: 'paragraph',
      text: 'Juridisk er VSME frivilligt i dag, og det forbliver formelt frivilligt i hvert fald de næste par år. EU-Kommissionen har i deres Omnibus-pakke fra februar 2025 foreslået, at VSME skal kunne bruges som basis for en fremtidig delegeret retsakt, der gælder for virksomheder mellem 250 og 1.000 medarbejdere — altså som en obligatorisk standard for det segment, der er for stort til at være "rigtig SMV" men for lille til at være omfattet af CSRD. Den proces er igangværende, men der er ingen klar tidslinje, og det politiske klima er præget af modsatrettede signaler. Det danske erhvervsministerium har eksplicit talt om at "trykke på pauseknappen" på dele af ESG-regelsættet, og en del af CSRD-tærsklerne diskuteres aktivt i Bruxelles.',
    },
    {
      type: 'paragraph',
      text: 'Min ærlige vurdering: Jeg ville ikke planlægge ud fra, at VSME bliver juridisk obligatorisk for danske SMV\'er under 250 medarbejdere de næste fem år. Det er ikke umuligt — særligt hvis EU\'s politik for bæredygtighedsstandarder tager en mere ekspansiv retning igen — men det er heller ikke sandsynligt på kort sigt.',
    },
    { type: 'paragraph', text: 'Det er bare ikke det interessante spørgsmål.' },
    {
      type: 'paragraph',
      text: 'Det interessante spørgsmål er, om VSME bliver kommercielt obligatorisk. Og det er allerede sket. Banker har konvergeret om det. Store CSRD-kunder har konvergeret om det. EU-Kommissionen har officielt anbefalet det. Value Chain Cap har gjort det til det juridiske loft for hvad nogen må kræve af jer. Det er ikke et lovkrav — det er det facto-standard for bæredygtighedsdokumentation i SMV-segmentet i Europa, og det er stort set sikkert at forblive det.',
    },
    {
      type: 'paragraph',
      text: 'At vente på lovkrav for at gøre noget, banken allerede beder om, kunden allerede beder om, og udbudsrunderne allerede inkluderer som tildelingskriterium, er ikke en strategi. Det er udskydelse forklædt som forsigtighed.',
    },
    {
      type: 'paragraph',
      text: 'Pointen er ikke "lov siger I skal". Pointen er, at I uanset hvad bliver mødt med kravet i en kommerciel sammenhæng, hvor det at have ordentlig VSME-dokumentation reelt giver jer kapitaladgang, kunder og udbudsmuligheder. Det er en investering, ikke en compliance-byrde. Det er præcis den slags investering, hvor det er bedre at komme i gang lidt før end lidt for sent.',
    },

    { type: 'h2', text: 'Min konkrete anbefaling' },
    {
      type: 'paragraph',
      text: 'Hvis I står overfor beslutningen i dag, og I ikke har et specifikt eksternt krav, der peger mod Comprehensive, er min anbefaling enkel: Start med Basis.',
    },
    {
      type: 'paragraph',
      text: 'Det er den hurtigste vej til bankklar dokumentation. Det er det, langt de fleste umiddelbare interessenter — bank, mindre kunder, leverandørkæder — har brug for. Det giver jer baseline-data, I kan bygge ovenpå, når og hvis Comprehensive bliver relevant. Og det undgår det meget reelle problem, at I overinvesterer i en strategiproces, før I er klar til at gennemføre den.',
    },
    {
      type: 'paragraph',
      text: 'Comprehensive bør være et bevidst skridt op, drevet af en konkret situation: en stor CSRD-kunde, der eksplicit beder om det. En investor-samtale, hvor det er forventet. En markedsføringsstrategi, der kræver dokumenterede klimaløfter. En udbudsrunde, hvor PAT-struktur er en del af tildelingskriterierne. Når en af de situationer opstår, så byg Comprehensive ovenpå jeres allerede etablerede Basis.',
    },
    {
      type: 'paragraph',
      text: 'Den ene store undtagelse: Hvis I i forvejen har en aktiv bæredygtighedsstrategi, med klare interne mål og dokumenteret arbejde, så er Comprehensive en mindre opgave end det lyder, fordi I i praksis allerede har lavet meget af arbejdet. Det er bare at få det struktureret i den rigtige form. I så fald kan I springe direkte til Comprehensive uden at gå over Basis først — men det er en undtagelse, ikke standard-vejen.',
    },
    {
      type: 'paragraph',
      text: 'Undgå at vælge Comprehensive af de forkerte grunde. Det er ikke "den seriøse" version af VSME. Det er en anden version, til et andet formål. At lave Comprehensive uden et reelt formål er præcis den slags overinvestering, der får SMV\'er til at miste tilliden til hele ESG-projektet.',
    },

    { type: 'h2', text: 'Hvordan vi håndterer det i qlim8' },
    {
      type: 'paragraph',
      text: 'For klarhedens skyld om hvordan vi har struktureret det i platformen: qlim8 Starter (fra 250 kr/md ved årsbetaling) dækker VSME Basis komplet med wizard, audit trail og den officielle EFRAG Excel-eksport. Det er bygget til at få dig fra "jeg har et regnskabssystem" til "jeg har en bankklar Basis-rapport" på under en arbejdsdag.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 Premium (fra 625 kr/md ved årsbetaling) tilføjer VSME Comprehensive med wizard for C1-C7, Scenario Builder for at modellere reduktionstiltag før I forpligter jer til dem, Reduction Hub til at sætte og spore mål over tid, samt custom PDF-rapporter. Det er bygget til den virksomhed, der har taget skridtet og vil arbejde med ESG strategisk.',
    },
    {
      type: 'paragraph',
      text: 'Forskellen er ikke kun feature-niveau — det er en anden brugersituation. Hvis I er i tvivl om hvilken I skal vælge, så start med Starter, brug et eller to kvartaler på at få Basis på plads, og opgrader når I har et konkret behov for Comprehensive. Det er den rækkefølge, vi anbefaler alle nye kunder, der ikke kommer ind med et akut Comprehensive-krav fra en kunde.',
    },

    { type: 'h2', text: 'VSME er et skjold, ikke kun en byrde' },
    {
      type: 'paragraph',
      text: 'Lad mig slutte med at vende tilbage til Value Chain Cap, fordi det er den vigtigste enkelte udvikling i dansk SMV-ESG i 2026, og fordi den ændrer, hvordan I bør tænke om hele VSME-projektet.',
    },
    {
      type: 'paragraph',
      text: 'Hvis I gør VSME ordentligt — og det er ligegyldigt om I starter med Basis eller går hele vejen til Comprehensive — så har I dokumentation, der er beskyttet af både regulatorisk konsensus, EU-anbefaling og direktiv-tekst. Jeres bankrådgiver kan ikke kræve mere end VSME. Jeres store CSRD-kunde kan ikke kræve mere end VSME. Den uendelige række af stadigt mere detaljerede spørgeskemaer, som mange SMV\'er har frygtet, har nu et juridisk loft.',
    },
    {
      type: 'paragraph',
      text: 'Det er ikke kun en compliance-øvelse. Det er en investering i, at I — én gang — laver dokumentationen rigtigt og kan henvise alle videre til den. Bank, kunde, leverandør, revisor, investor. Samme dokument, samme format, samme audit trail, samme metode.',
    },
    {
      type: 'paragraph',
      text: 'Det er værdien af at vælge en standard og holde sig til den. Og det er den ene gang, hvor jeg vil sige, at en mindre, men løbende investering i et godt setup giver mere værdi end et større ad-hoc-projekt, der laves om hvert år.',
    },
    { type: 'paragraph', text: 'Start hvor I er. Vælg den modul-version, der dækker dem, der spørger jer i dag. Byg ovenpå, når en ny situation opstår.' },
    { type: 'paragraph', text: 'Det er det. Det er den ultimative VSME-guide. Resten er detaljer.' },
  ],
}
