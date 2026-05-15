import type { Article } from './article'

export const artikel: Article = {
  slug: 'scope-3-smv-guide',
  title: 'Scope 3 for SMV\'er: Sådan tæmmer du den skjulte kæmpe i dit klimaregnskab',
  description:
    'Scope 3 udgør 70-90 % af klimaaftrykket for en typisk SMV. Du behøver ikke leverandør-specifik data på alt. Her er den disciplinerede, hybride tilgang der reelt virker.',
  category: 'Scope 3',
  publishedAt: '2026-05-13',
  readingTime: 14,
  sections: [
    {
      type: 'lead',
      text: 'For de fleste danske SMV\'er udgør Scope 3 mellem 70 og 90 procent af det samlede klimaaftryk. Det er den enkelte mest sigende statistik om klimaarbejde i 2026, og det er også den, der lammer flest ejer-ledere, når de første gang sætter sig ned for at lave et klimaregnskab.',
    },
    {
      type: 'paragraph',
      text: 'Scope 1 — direkte udledninger fra egne kilder som firmabiler og gasfyr — er nemt. I kender forbruget. I har fakturaerne. Scope 2 — købt el og varme — er også nemt. I har eldeklarationen fra Energinet og varmemålerne. Det er typisk 10-30 procent af jeres samlede aftryk, og det er fuldt under jeres kontrol at måle.',
    },
    {
      type: 'paragraph',
      text: 'Men Scope 3? Indkøbte varer, services, transport ind og ud af virksomheden, affald, forretningsrejser, og hele jeres leverandørkæde. Det er hvor det meste af udledningen ligger, og det er hvor I ikke kontrollerer dataene direkte. Det er ikke jeres elregning. Det er hundredvis af leverandørers samlede klimaaftryk, som I på en eller anden måde skal kunne sætte tal på.',
    },
    {
      type: 'paragraph',
      text: 'Mange artikler om dette emne enten skræmmer eller forsimpler. De skræmmer ved at fremstille Scope 3 som en uoverstigelig opgave, der kræver, at I ringer til alle leverandører og beder om data. De forsimpler ved at sige, at AI og spend-baserede modeller bare løser problemet. Sandheden ligger imellem, og den er værd at få ordentligt forklaret.',
    },
    {
      type: 'paragraph',
      text: 'Scope 3 er ikke en præcis videnskab. Det er en disciplineret tilnærmelse, hvor det handler om at have en metode, der er defensibel — ikke perfekt. Lad mig forklare, hvordan I gør det.',
    },

    { type: 'h2', text: 'Hvad Scope 3 reelt dækker' },
    {
      type: 'paragraph',
      text: 'GHG Protocol Scope 3 Standard, som er den internationale standard for området, opdeler Scope 3 i 15 specifikke kategorier. Otte af dem er upstream (det I køber ind og det, der sker før jeres egen aktivitet), og syv af dem er downstream (det, der sker efter jeres produkter forlader jer).',
    },
    {
      type: 'paragraph',
      text: 'For en typisk dansk SMV er fire af de 15 kategorier som regel væsentlige. De andre 11 er enten små eller helt irrelevante, afhængigt af branche.',
    },
    {
      type: 'paragraph',
      text: 'Kategori 1 — Indkøbte varer og services er nærmest altid den største. Alt I køber: råvarer, kontorartikler, software-abonnementer, marketingydelser, revisorhjælp, rengøring. For en typisk produktionsvirksomhed kan denne kategori alene udgøre 50-70 procent af det samlede klimaaftryk.',
    },
    {
      type: 'paragraph',
      text: 'Kategori 4 — Upstream transport og distribution er den anden tunge. Det er den transport, jeres leverandører bruger på at bringe varer til jer. Hvis I køber komponenter fra Tyskland eller Kina, ligger der transport-emissioner indbygget her, som I sjældent ser direkte.',
    },
    {
      type: 'paragraph',
      text: 'Kategori 6 — Forretningsrejser er ofte mindre, men kan være betydelig for konsulentvirksomheder eller virksomheder med international aktivitet.',
    },
    {
      type: 'paragraph',
      text: 'Kategori 7 — Pendling dækker medarbejdernes transport til og fra arbejde. For større SMV\'er kan det være væsentlig; for små er det mindre.',
    },
    {
      type: 'paragraph',
      text: 'De øvrige kategorier — affaldsbehandling, lejede aktiver, investeringer, brug af solgte produkter, end-of-life-behandling og lignende — er typisk relevante for specifikke brancher. En byggevirksomhed skal medtage end-of-life. En software-virksomhed skal typisk medtage data-center-aktivitet. En finansiel virksomhed skal medtage investeringernes klimaaftryk.',
    },
    {
      type: 'paragraph',
      text: 'Pointen er: Scope 3 er ikke ét tal, det er 15 mulige tal, og I behøver realistisk kun at fokusere på de 3-5, der reelt er væsentlige for jeres branche. Det reducerer kompleksiteten markant, og det er præcis det, GHG Protocol kalder materialitetsprincippet.',
    },

    { type: 'h2', text: 'Den fundamentale udfordring' },
    {
      type: 'paragraph',
      text: 'Grunden til, at Scope 3 er svært, er enkel: I har ikke dataene direkte. I har fakturaerne fra jeres leverandører, men I har ikke deres klimaregnskaber. I ved, at I har købt stål for 250.000 kroner, men I ved ikke, hvor meget CO2 der blev udledt under produktion, transport og raffinering af det specifikke parti stål.',
    },
    {
      type: 'paragraph',
      text: 'Der findes tre grundlæggende tilgange til at løse det problem, og hver af dem har deres styrker og svagheder. Det er værd at forstå alle tre, fordi I sandsynligvis kommer til at bruge en kombination.',
    },
    {
      type: 'paragraph',
      text: 'Leverandør-specifik data er den mest præcise tilgang. I beder direkte hver leverandør om at oplyse klimaaftrykket på det, I har købt af dem. Det fungerer for nogle få store, strategiske leverandører, hvor det er værd at investere tid i relationen, og det kommer i stigende grad af sig selv, efterhånden som CSRD-omfattede virksomheder selv skal rapportere deres Scope 3. Men for en SMV med 100-500 leverandører er det helt urealistisk at indhente data fra alle.',
    },
    {
      type: 'paragraph',
      text: 'Aktivitets-baseret beregning bygger på fysiske mængder ganget med specifikke emissionsfaktorer. I har købt 2.000 liter diesel — gange med en faktor for diesel giver præcise CO2-tal. I har købt 500 kg stål — gange med en faktor for stål giver et estimat. Det her er mere præcist end spend-baseret beregning, men det kræver, at I har de fysiske mængder, og at I kan matche dem mod en relevant emissionsfaktor. For ting som energi, brændstof og specifikke materialer er det den klart bedste tilgang.',
    },
    {
      type: 'paragraph',
      text: 'Spend-baseret beregning bygger på pengebeløb ganget med en branchespecifik emissionsfaktor. I har brugt 250.000 kroner på indkøb af stål — gange med en spend-baseret faktor for stålindustrien giver et estimat. Det her er den mindst præcise tilgang, men det er også den eneste, der kan dække den lange hale af mindre leverandører og indkøb, hvor I ikke har fysiske mængder eller specifikke data.',
    },
    {
      type: 'paragraph',
      text: 'Hvis I udelukkende bruger leverandør-specifik data, får I aldrig færdiggjort et regnskab. Hvis I udelukkende bruger spend-baseret beregning, får I et regnskab, der er forkert i begge ender — for præcist for de største poster og for unøjagtigt for kompliceret. Hybrid er ikke en kompromis, det er den anbefalede tilgang i selve GHG Protocol Scope 3 Standard.',
    },

    { type: 'h2', text: 'Spend-baseret modellens skjulte fælder' },
    {
      type: 'paragraph',
      text: 'Lad mig blive teknisk et øjeblik, fordi spend-baseret beregning har nogle fælder, der er værd at kende, før I baserer en VSME-rapport på den.',
    },
    {
      type: 'paragraph',
      text: 'Inflation kan forvride beregningen markant. De fleste spend-baserede emissionsfaktorer er knyttet til et bestemt basisår — typisk hentet fra EXIOBASE eller lignende input-output-modeller. EXIOBASE\'s nyeste validerede version er på publiceringstidspunktet altid nogle år gammel. Hvis I bruger 2025-fakturabeløb mod faktorer, der er baseret på 2020-priser, fortolker modellen jeres højere priser som højere udledning — selvom det i virkeligheden bare er inflation. En faktura på 13.000 kroner for brædder i 2025 og 10.000 kroner for præcis samme brædder i 2020 burde give samme CO2-tal. I praksis vil en simpel spend-baseret model vise 30 procent højere udledning for 2025-fakturaen.',
    },
    {
      type: 'paragraph',
      text: 'Den korrekte tilgang er at deflater jeres fakturabeløb til faktorens basisår ved hjælp af Danmarks Statistiks prisindeks, så de monetære input matcher tidsmæssigt med faktoren. Det er en teknisk detalje, men det er den slags, der adskiller en defensibel Scope 3-beregning fra en, der vil blive plukket fra hinanden, hvis nogen kigger nøje på den.',
    },
    {
      type: 'paragraph',
      text: 'Spend-baseret beregning straffer grønnere indkøb. Det er den mest paradoksale fælde, og den, der får flest virksomheder til at miste tilliden til metoden. Hvis I køber et dyrere, mere bæredygtigt materiale — for eksempel et certificeret FSC-træ frem for konventionelt — så viser en simpel spend-baseret model jeres udledning som højere, fordi prisen er højere. Det er ikke ondsindet — det er bare en konsekvens af, at modellen ikke kan skelne mellem to produkter i samme kategori. Det betyder, at I i de mest material kategorier ikke kan stole på spend-baseret data alene, hvis I gør et reelt bæredygtighedsarbejde.',
    },
    {
      type: 'paragraph',
      text: 'Branchegennemsnit er gennemsnit. Det er den samme observation jeg lavede om bankens brug af branchedata: et gennemsnit er kun præcist for de få i midten. For halvdelen af virksomhederne er det for højt, for den anden halvdel for lavt. Hvis I konsekvent har valgt grønnere leverandører end branchegennemsnittet, vil spend-baseret beregning aldrig fange det. I bliver bedømt som gennemsnittet, ikke som I reelt er.',
    },
    {
      type: 'paragraph',
      text: 'Spend-baseret beregning er stadig nyttig — særligt som baseline og for den lange hale af mindre poster. Men I skal vide, hvad I har tilbage, når I bruger den.',
    },

    { type: 'h2', text: 'Materialitet: Hvor I skal lægge indsatsen' },
    {
      type: 'paragraph',
      text: 'GHG Protocol Scope 3 Standard har et begreb, der hedder materialitet. Det betyder, at I ikke skal behandle alle 15 kategorier med samme dybde. I skal identificere, hvilke kategorier der er væsentlige for jeres specifikke virksomhed, og lægge jeres metodologiske kvalitet der.',
    },
    {
      type: 'paragraph',
      text: 'Tommelfingerreglen er: en kategori er material, hvis den udgør mere end 5 procent af jeres samlede Scope 3-udledning. For de fleste SMV\'er betyder det, at 3-5 kategorier er materiale, og resten kan behandles med simpel spend-baseret beregning.',
    },
    {
      type: 'paragraph',
      text: 'Det er en kæmpe befrielse for de fleste, der starter Scope 3-arbejdet. I behøver ikke at samle data om alt med samme præcision. I skal være præcise, hvor det betyder noget — hvor en mindre fejl forskyder det samlede tal mærkbart — og I kan tillade jer mindre præcision i de små poster.',
    },
    {
      type: 'paragraph',
      text: 'Hvordan ved I, hvad der er material, før I har beregnet det? I starter typisk med et hurtigt baseline-estimat baseret på rene spend-baserede tal. Det giver jer ikke det rigtige tal, men det giver jer fordelingen — hvilke kategorier udgør hvilken procentdel af jeres samlede aftryk. Når I så ved, at indkøbte varer udgør 65 procent og forretningsrejser udgør 8 procent, kan I lægge jeres indsats på indkøbte varer og være tilfreds med en grovere beregning af forretningsrejser.',
    },
    { type: 'paragraph', text: 'Det handler om at gøre det rigtige arbejde der, hvor det rykker, og spare tid der, hvor det ikke gør.' },
    {
      type: 'paragraph',
      text: 'For SMV\'er der leverer til CSRD-omfattede virksomheder, er der en ekstra dimension her. Den nye Value Chain Cap fra Omnibus I-direktivet, som trådte i kraft 24. februar 2026, betyder, at store kunder ikke længere må kræve mere Scope 3-data fra jer end det, VSME-standarden specificerer. Det giver jer en juridisk grænse for, hvor langt I skal gå med jeres egen Scope 3-detaljering for at imødekomme leverandørkrav. I behøver ikke gå længere end VSME — selvom kunden måtte bede om det. Det er beskyttelse, der er værd at kende, før I bruger måneder på at indhente data, ingen lov kræver, at I afleverer.',
    },

    { type: 'h2', text: 'Hybrid: Den realistiske vej' },
    { type: 'paragraph', text: 'Lad mig samle det op til en konkret metodologi, der reelt virker for en dansk SMV i 2026.' },
    {
      type: 'paragraph',
      text: 'For Scope 2 og specifikke aktivitetsdata i Scope 3: Brug aktivitetsbaseret beregning med fysiske enheder og konkrete emissionsfaktorer. El, varme, brændstof, flyrejser med kendte ruter, transport med kendte vægter og distancer — alt det, hvor I har præcise tal og kan matche dem mod validerede faktorer fra Klimakompasset, Energinet eller relevante internationale kilder. Det er den højeste datakvalitet I kan opnå uden direkte leverandørdata.',
    },
    {
      type: 'paragraph',
      text: 'For de 3-5 store, materiale indkøbskategorier i Scope 3: Stræb efter aktivitetsbaseret beregning hvor muligt, og overvej direkte leverandørdata for de allerstørste leverandører. Hvis I har en hovedleverandør, der udgør 15 procent af jeres samlede indkøb, så er det værd at spørge dem om deres klimaregnskab. CSRD-omfattede virksomheder er typisk forpligtet til at kunne svare på det — og leverandører der ikke er CSRD-omfattede, har ofte alligevel data fra deres egen VSME-rapportering.',
    },
    {
      type: 'paragraph',
      text: 'For den lange hale af mindre indkøb og services: Brug spend-baseret beregning med ordentlig inflationsjustering. Det er ikke perfekt, men det er forsvarligt, og det fortæller jer det rigtige om størrelsesordenen.',
    },
    {
      type: 'paragraph',
      text: 'For alle tre tilgange: Dokumenter datakvaliteten ærligt. En god platform — eller en god konsulent — kan vægte hver post baseret på datatype og give jer et samlet kvalitetsscore. I qlim8 bruger vi et pointsystem fra 1 til 5 baseret på datatype, og den samlede score er vægtet efter udledningens størrelse. Det betyder, at en upræcis post på 100 ton udledning trækker mere ned i scoren end en upræcis post på 1 ton. Det er sådan, materialitetsprincippet implementeres i praksis.',
    },
    { type: 'paragraph', text: 'Det er ikke en perfekt metode. Det er en defensibel metode.' },

    { type: 'h2', text: 'Hvad I konkret skal gøre' },
    { type: 'paragraph', text: 'Hvis I står overfor jeres første Scope 3-beregning og vil have en realistisk tilgang, her er rækkefølgen.' },
    {
      type: 'paragraph',
      text: 'Trin 1: Lav en grov baseline. Brug spend-baseret beregning på alle indkøb i regnskabsåret. Det giver jer et samlet Scope 3-tal og — vigtigere — fordelingen på de 15 kategorier. Det her tager dage hvis I gør det manuelt og minutter hvis I bruger software, der trækker fakturaerne automatisk fra jeres regnskabssystem.',
    },
    {
      type: 'paragraph',
      text: 'Trin 2: Identificer det materiale. Find de 3-5 kategorier der udgør langt størstedelen af jeres samlede Scope 3-udledning. Det er der I skal lægge metodologisk dybde. De andre kategorier kan stå på spend-baseret beregning, indtil noget ændrer det billede.',
    },
    {
      type: 'paragraph',
      text: 'Trin 3: Forbedr de materiale kategorier. Gå fra spend-baseret til aktivitetsbaseret beregning hvor I kan finde fysiske mængder. For en transportvirksomhed kan det være at gå fra "vi har brugt 250.000 kroner på diesel" til "vi har købt 12.500 liter diesel" — det giver et markant mere præcist tal. For en byggevirksomhed kan det være at gå fra "stål 500.000 kroner" til "stål 8.500 kg".',
    },
    {
      type: 'paragraph',
      text: 'Trin 4: Spørg jeres tre største leverandører. Hvis I har en eller tre leverandører der står for 30-50 procent af jeres samlede indkøb, så er det værd at spørge dem direkte. CSRD-omfattede leverandører kan typisk svare. SMV-leverandører kan typisk pege på deres egen VSME-rapport, hvis de har en.',
    },
    {
      type: 'paragraph',
      text: 'Trin 5: Vær ærlig om resten. For alt det andet — den lange hale af kontorartikler, software-abonnementer, marketingydelser, og mindre indkøb — vær åben om, at I bruger spend-baseret beregning, og at det er et estimat. Det er den datakvalitetsscore I rapporterer på dashboardet og i rapportens forside. Det er ikke en svaghed, det er ærlighed.',
    },
    {
      type: 'paragraph',
      text: 'Det er en proces, ikke et projekt. I bliver ikke færdige med Scope 3 et bestemt tidspunkt. I bliver bare gradvist mere præcise år for år, mens I lærer hvor de største poster ligger, og hvor det er værd at investere i bedre data.',
    },

    { type: 'h2', text: 'Konklusion: Defensibel, ikke perfekt' },
    {
      type: 'paragraph',
      text: 'Scope 3 er som sagt ikke en præcis videnskab. Det er ikke noget, der er muligt at få helt nøjagtigt for en virksomhed, der køber ind fra hundredvis af leverandører, hvis data I ikke kontrollerer. Det er heller ikke det, der bliver krævet af jer.',
    },
    {
      type: 'paragraph',
      text: 'Det der bliver krævet, er at I bruger en defensibel metode. At I følger anerkendte standarder. At I dokumenterer hvad I har gjort, hvilke faktorer I har brugt, og hvor I har estimeret. At I ikke skjuler usikkerheden, men rapporterer den ærligt som en del af regnskabet.',
    },
    {
      type: 'paragraph',
      text: 'Bankens kreditmodel kan håndtere et tal med 30 procent usikkerhed, hvis I selv siger, at der er 30 procent usikkerhed. Det den ikke kan håndtere, er et tal der præsenteres som præcist, men reelt bygger på dårlige antagelser. Det samme gælder for revisor, for jeres store kunder, og for investorer.',
    },
    {
      type: 'paragraph',
      text: 'Det er den centrale lære af GHG Protocol Scope 3 Standard, og det er den, jeg ser flest SMV\'er misforstå. Det er ikke nul-fejl der efterspørges. Det er sporbar, ærlig, dokumenteret metodologi der efterspørges. De to ting er ikke det samme, og forskellen er enorm.',
    },
    {
      type: 'paragraph',
      text: 'I Scope 3 belønnes ærlig usikkerhed — ikke falsk præcision. Det er det, jeg vil have, I tager med fra denne artikel.',
    },
  ],
}
