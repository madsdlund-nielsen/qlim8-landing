import type { Article } from './article'

export const artikel: Article = {
  slug: 'undgaa-greenwashing-smv',
  title: 'Undgå greenwashing: Den ærlige guide til at kommunikere jeres klimadata uden at bryde loven',
  description:
    'Forbrugerombudsmanden stramper op på greenwashing. EU\'s nye direktiv træder i kraft 27. september 2026. Her er forskellen mellem en bøde og en konkurrencefordel — den ligger i sproget.',
  category: 'Compliance',
  publishedAt: '2026-05-15',
  readingTime: 13,
  sections: [
    {
      type: 'lead',
      text: 'Mange af de SMV-ejere, jeg taler med, har stort set samme bekymring, når vi kommer til kommunikation: "Jeg vil gerne fortælle om vores klimaarbejde, men jeg er bange for at sige noget forkert. Hvad må jeg overhovedet skrive på vores hjemmeside?"',
    },
    {
      type: 'paragraph',
      text: 'Det er en reel og berettiget frygt. Forbrugerombudsmanden har de seneste år strammet markant op på, hvad virksomheder må sige om klima og bæredygtighed, og i oktober 2025 blev en større dansk virksomhed idømt en bøde på 3,5 millioner kroner for at markedsføre træpiller som "CO2-neutrale" og "bæredygtige" uden tilstrækkelig dokumentation. Den 27. september 2026 træder EU\'s nye direktiv om vildledende grønne udsagn i kraft — kendt i daglig tale som greenwashing-direktivet — og det skærper kravene yderligere.',
    },
    {
      type: 'paragraph',
      text: 'Det er ikke et område, hvor man kan have en sjusket tilgang. Men det er heller ikke et område, der skal lamme jer. Der findes en helt klar måde at kommunikere klimadata på, som både holder juridisk og som bygger ægte tillid hos kunder, banker og medarbejdere.',
    },
    {
      type: 'paragraph',
      text: 'Pointen er enkel, og jeg vil gentage den et par gange i denne artikel, fordi den fortjener at hænge ved: Generelle udsagn er farlige. Specifikke, dokumenterede udsagn er beskyttet. Forskellen mellem dem er ofte hele forskellen mellem en bøde og en konkurrencefordel.',
    },
    { type: 'paragraph', text: 'Lad mig forklare hvordan.' },

    { type: 'h2', text: 'Det juridiske landskab i 2026' },
    {
      type: 'paragraph',
      text: 'Den vigtigste juridiske ramme for klimakommunikation i Danmark er Forbrugerombudsmandens "Anbefalinger til virksomheders miljømarkedsføring", udgivet oktober 2024. Anbefalingerne erstattede den tidligere kvikguide fra 2021 og er nu et fortolkningsbidrag til markedsføringslovens §§ 5, 6 og 13 — reglerne om vildledning og krav til dokumentation.',
    },
    {
      type: 'paragraph',
      text: 'I 2024 fik Forbrugerombudsmanden derudover 28 millioner kroner specifikt afsat til at behandle greenwashing-sager. Det er et politisk signal, der er værd at læse: området bliver overvåget, og budgettet til at føre sager findes.',
    },
    {
      type: 'paragraph',
      text: 'Den 27. september 2026 træder EU\'s ændring af direktivet om urimelig handelspraksis (UCP-direktivet) i kraft. Det er det, mange kalder greenwashing-direktivet. Det skærper kravene yderligere, særligt omkring CO2-kompensationsudsagn, og det indfører tydeligere krav om uafhængig tredjepartsverifikation for visse typer udsagn.',
    },
    {
      type: 'paragraph',
      text: 'Sammenstillet betyder det: I 2026 er det sværere end nogensinde at markedsføre sig grønt, men det er også klarere end nogensinde, hvad der er tilladt. Reglerne er ikke vage. De er detaljerede og dokumenterede, og hvis I sætter jer ind i dem, kan I navigere dem ordentligt.',
    },
    {
      type: 'paragraph',
      text: 'Bøden på 3,5 millioner kroner fra oktober 2025 er værd at studere som arketypisk eksempel. Virksomheden i den sag brugte udtryk som "CO2-neutral" og "bæredygtig" på emballage, hjemmeside og sociale medier. Forbrugerombudsmanden lagde i sin vurdering vægt på, at det var generelle udsagn uden tilstrækkelig konkret dokumentation, og at markedsføringen gav forbrugerne et fejlagtigt indtryk af, at produkterne ikke havde negativ klimaeffekt. Det var ikke nok, at produkterne opfyldte lovgivningens minimumskrav. Der skulle foreligge reel og aktuel dokumentation — typisk i form af livscyklusanalyser — for de konkrete miljøpåstande.',
    },
    {
      type: 'paragraph',
      text: 'Det er det grundlæggende princip i dansk og europæisk greenwashing-praksis: jo mere generel påstanden er, desto tungere dokumentation kræves der.',
    },

    { type: 'h2', text: 'Den vigtigste skelnen: Generelle vs. specifikke udsagn' },
    {
      type: 'paragraph',
      text: 'Hvis du kun husker én ting fra denne artikel, så lad det være det her. Forbrugerombudsmanden skelner mellem to typer klimaudsagn, og det er den skelnen, der afgør, hvor stor en juridisk risiko I løber.',
    },
    {
      type: 'paragraph',
      text: 'Generelle udsagn er ord og udtryk, der dækker over et samlet helhedsindtryk: "bæredygtig", "klimavenlig", "grøn", "CO2-neutral", "miljøvenlig", "klimaansvarlig", "net-zero", "kompensérende". For at bruge dem skal I kunne dokumentere et helhedsbillede — det vil typisk sige en komplet livscyklusanalyse (LCA) der dækker hele produktets eller virksomhedens påvirkning. Det er en høj dokumentationsbyrde, og det er sjældent, en SMV reelt kan dokumentere et generelt udsagn til Forbrugerombudsmandens standard.',
    },
    {
      type: 'paragraph',
      text: 'Min anbefaling er at undgå generelle udsagn helt, medmindre I har en komplet LCA og er parat til at forsvare den. I 95 % af tilfældene er gevinsten ikke risikoen værd.',
    },
    {
      type: 'paragraph',
      text: 'Specifikke udsagn er kvantificerede påstande om konkrete forhold: "Vi har reduceret vores Scope 2-udledning med 14 % i 2024 i forhold til 2023", "Vores produktion drives af certificeret grøn strøm fra Energinet", "Vores firmaflåde er omstillet 60 % til el". For at bruge dem skal I kunne dokumentere selve det specifikke forhold — ikke et helhedsbillede. Det er en langt lavere dokumentationsbyrde, fordi det er nemmere at bevise én konkret ting end et samlet helhedsindtryk.',
    },
    {
      type: 'paragraph',
      text: 'Specifikke udsagn er den vej, der både er juridisk sikrere og kommunikativt mere kraftfuld. "Vi har reduceret vores Scope 2 med 14 %" siger noget reelt om jer. "Vi er bæredygtige" siger ingenting og indebærer maksimal juridisk risiko.',
    },
    {
      type: 'paragraph',
      text: 'Hvis I tager én ting med jer fra hele jeres ESG-arbejde i kommunikationsmæssigt henseende, så lad det være: Brug tal, brug konkrete kategorier, undgå overskrifter, der opsummerer noget I ikke kan dokumentere ned til detaljerne. Det er ikke kun sikrere — det er også bedre kommunikation, fordi konkrete tal får folk til at tro på jer.',
    },

    { type: 'h2', text: 'De fire klassiske SMV-fælder' },
    {
      type: 'paragraph',
      text: 'I min erfaring med at se danske SMV\'er kommunikere om klima, falder fejlene typisk i fire kategorier. Det er værd at kende dem alle fire, fordi de er fælder, der er meget nemme at træde i uden at vide det.',
    },
    {
      type: 'paragraph',
      text: 'Fælde 1: Generelle udsagn på hjemmesiden uden bagvedliggende data. "Vi tager bæredygtighed alvorligt" eller "Vi arbejder for en grøn fremtid" lyder uskyldigt, men hvis I ikke kan dokumentere, hvad I konkret gør, så er det allerede i risikozonen. Det er ikke nødvendigvis ulovligt — afhænger af konteksten — men det kan blive det, hvis det er en del af en samlet markedsføring, der giver et indtryk, I ikke kan stå inde for. Min anbefaling er at erstatte alle generelle udsagn med specifikke. I stedet for "vi tager bæredygtighed alvorligt", skriv "Vi måler vores Scope 1, 2 og 3 udledning årligt og har offentlige reduktionsmål for 2030".',
    },
    {
      type: 'paragraph',
      text: 'Fælde 2: Sammenblanding af reduktioner og CO2-kompensation. Det er den mest udbredte tekniske fejl, og det er værd at have et selvstændigt afsnit om — kommer længere nede.',
    },
    {
      type: 'paragraph',
      text: 'Fælde 3: Visuel greenwashing. Forbrugerombudsmanden har eksplicit udtalt, at brug af grønne farver, natur-billeder og generelle visuelle elementer kan vurderes som vildledende, hvis ikke produkternes eller virksomhedens reelle påvirkning underbygger det indtryk. Det betyder, at en webshop, der sælger noget, der reelt ikke er særligt grønt, men bruger billeder af træer og bjerge i sin marketing, potentielt sender et vildledende signal. Det er en regel, der virker tør, men som er ført i konkrete sager.',
    },
    {
      type: 'paragraph',
      text: 'Fælde 4: At kommunikere før dokumentationen er på plads. Dette er fælden, der koster flest virksomheder bøder. Marketingafdelingen vil gerne kommunikere de grønne initiativer, ESG-arbejdet halter bagefter, og påstande publiceres før de er underbygget. Reglen er klar: dokumentationen skal være på plads, inden udsagnet publiceres. Det er ikke nok at have lovet sig selv, at man når at dokumentere det senere. Forbrugerombudsmanden vurderer markedsføringen på det tidspunkt, den blev offentliggjort.',
    },
    {
      type: 'paragraph',
      text: 'Det er fire fælder, der er nemme at træde i og forholdsvist nemme at undgå, hvis I er bevidste om dem.',
    },

    { type: 'h2', text: 'Den mest tekniske fælde: Reel reduktion vs. CO2-kompensation' },
    {
      type: 'paragraph',
      text: 'Lad mig zoome ind på fælde nummer to, fordi det er den, der teknisk volder de fleste problemer for SMV\'er, og fordi den nye EU-lovgivning fra september 2026 strammer kravene specifikt på dette område.',
    },
    { type: 'paragraph', text: 'Der er en fundamental forskel mellem to typer klimahandling, og den forskel skal være krystalklar i jeres kommunikation:' },
    {
      type: 'paragraph',
      text: 'Reel reduktion sker inden for jeres egne grænser eller værdikæde. I udskifter dieselvarevogne med el. I køber grøn strøm til værkstedet. I stiller krav til leverandører om materialer med lavere aftryk. I forlænger maskinernes levetid. I omlægger leveringsruter. Det er reduktion i jeres egen Scope 1, 2 eller 3 udledning, og det er det, der reelt tæller i et klimaregnskab, en VSME-rapport og en bankens kreditvurdering.',
    },
    {
      type: 'paragraph',
      text: 'CO2-kompensation (også kaldet offsets, klimakreditter eller carbon credits) er investeringer i eksterne projekter — skovrejsning, vedvarende energi i andre lande, metanopfangning på lossepladser, og lignende. Det er positivt for verden, og det kan være en del af en samlet klimastrategi, men det reducerer ikke jeres egen udledning. Det forskydes til et andet sted.',
    },
    {
      type: 'paragraph',
      text: 'Pointen er den her: I må gerne kompensere. I må også gerne kommunikere, at I kompenserer. Det, I ikke må, er at fremstille kompensation som reduktion. Hvis I udleder 100 ton CO2e, køber kompensation for 100 ton, og kalder jer "klimaneutrale" eller "CO2-neutrale", så er det netop den type påstand, der har udløst både den 3,5 millioner kroners bøde i oktober 2025 og det kommende UCP-direktivs strengeste bestemmelser.',
    },
    {
      type: 'paragraph',
      text: 'I praksis bør I i jeres kommunikation altid holde de to ting fysisk adskilt. Hvis I har reduceret jeres udledning med 14 %, så sig det. Hvis I derudover har kompenseret for noget af resten, så sig det — og kald det kompensation, ikke reduktion. Reduktion og kompensation er ikke det samme, og enhver kommunikation der antyder ellers, er juridisk og kommunikativt risikabel.',
    },
    {
      type: 'paragraph',
      text: 'Det er præcis det her princip, vi har bygget ind som en hård regel i qlim8. Når brugere arbejder med reduktionsmål og scenarier, behandles eventuel CO2-kompensation under en isoleret logik, der aldrig blandes med reduktionsfremdriften. Det kan ikke ved en fejl præsenteres som en reduktion i en VSME-rapport. Det er ikke en feature, det er en grundregel — fordi det er den ene fejl, der koster mest, hvis I laver den.',
    },

    { type: 'h2', text: 'Hvordan dokumentation faktisk fungerer som skjold' },
    {
      type: 'paragraph',
      text: 'Når jeg taler med danske SMV-ejere om greenwashing-frygt, er det ofte ikke selve reglerne, der lammer dem — det er usikkerheden om, hvordan de skal dokumentere noget i praksis. Lad mig være konkret.',
    },
    {
      type: 'paragraph',
      text: 'Forbrugerombudsmanden kræver, at I ved hvert klimaudsagn kan fremvise solid og aktuel dokumentation for den specifikke påstand. Det betyder fire ting i praksis:',
    },
    {
      type: 'paragraph',
      text: 'For det første: I skal kunne spore tallet til en kilde. Hvis I siger "vi har reduceret Scope 2 med 14 %", skal I kunne fremvise hvor 14 %-tallet kommer fra. Hvilke målinger? Hvilken baseline? Hvilke faktorer? Det er præcis det, vi i qlim8 har bygget som et immutable audit trail. Hver beregning har en unik hash, og I kan klikke fra et samlet tal ned til de fakturaer og målinger, det stammer fra. Det er ikke en luksus — det er forskellen på at have et bevis og at have en påstand.',
    },
    {
      type: 'paragraph',
      text: 'For det andet: Dokumentationen skal være aktuel. Hvis I bruger en emissionsfaktor fra Klimakompasset 2023 i en rapport fra 2026, kan I komme i problemer, fordi den specifikke faktor er ændret. Det betyder, at I enten skal opdatere alle jeres beregninger manuelt, hver gang en faktor ændres — eller bruge en platform, der gør det automatisk. Det her er en af de mindst sexede, men mest reelle, fordele ved specialiseret software: faktor-opdateringer sker automatisk, og I undgår den situation, hvor jeres marketingmateriale citerer forældede tal.',
    },
    {
      type: 'paragraph',
      text: 'For det tredje: Datakvaliteten skal være ærlig. Vi har bygget et datakvalitetspoint-system ind i qlim8, hvor hver emissionspost får point baseret på datakildens kvalitet: LCA og produkt-PCF får 5 point, EPD\'er får 4, fysiske enheder med konkret faktor får 3, spend-baserede estimater får 1, og manuelt valgt kategori med lav konfidens trækker fra. Den samlede datakvalitetsscore er et vægtet gennemsnit baseret på virksomhedens samlede udledning, og den står på forsiden af hver custom PDF-rapport.',
    },
    {
      type: 'paragraph',
      text: 'Det er præcis det, der gør, at I kan kommunikere ærligt. Hvis datakvalitetsscoren er 65 %, så ved I — og kan sige til banken eller revisor — at I har solid dokumentation for de største poster, og at de mindre poster baseres på fornuftige estimater. Hvis I forsøger at fremstille det som 100 % validitet, falder I i fælden. Hvis I er åbne om de 65 %, har I en defensibel position. Den hjælper jer hele vejen rundt — overfor banken, overfor revisor, overfor en eventuel anmeldelse, og overfor jeres egen ledelse.',
    },
    {
      type: 'paragraph',
      text: 'For det fjerde: Standardisering hjælper. Hvis jeres beregning følger en anerkendt standard — GHG Protocol Corporate Standard, VSME, ISO 14064 — så har I en kraftig ramme om jeres dokumentation. Det er meget sværere at angribe et tal, der er beregnet efter GHG Protocol-metodologi, end et tal, I selv har konstrueret. I qlim8 følger vi GHG Protocol Corporate Standard og Scope 3 Standard, og VSME-rapporter genereres direkte fra EFRAGs officielle Excel-skabelon. Det er ikke for at imponere — det er fordi standardisering er den mest effektive form for juridisk forsikring.',
    },
    {
      type: 'paragraph',
      text: 'Sammen udgør de fire ting et reelt forsvar mod greenwashing-anklager: I kan spore tallene, de er aktuelle, kvaliteten er ærligt rapporteret, og I følger en anerkendt standard. Det er det, jeg mener, når jeg siger, at dokumentation er jeres skjold.',
    },

    { type: 'h2', text: 'Tre konkrete råd til ærlig klimakommunikation' },
    { type: 'paragraph', text: 'Lad mig destillere det her ned til tre praktiske råd, som I kan tage med i jeres næste marketingmøde.' },
    {
      type: 'paragraph',
      text: 'Råd 1: Vær specifik, ikke generel. I stedet for at sige "vi er bæredygtige", sig "vi har reduceret vores el-forbrug med 22 % siden 2022 ved at udskifte til LED og optimere driften". Tal er beskyttet i lovgivningen. Helhedsbeskrivelser er ikke. Og tal er også bedre kommunikation — folk husker dem, og folk stoler på dem.',
    },
    {
      type: 'paragraph',
      text: 'Råd 2: Adskil reduktion og kompensation. Hvis I gør begge dele, så sig begge dele — separat. "Vi har reduceret vores udledning med X ton siden 2023, og vi kompenserer derudover for Y ton via et certificeret skovprojekt i Tanzania." Aldrig "vi er klimaneutrale". Aldrig "vi har opvejet vores aftryk". Vær præcis om hvad I har gjort, og hvor det er sket.',
    },
    {
      type: 'paragraph',
      text: 'Råd 3: Lad dataen tale for sig selv. I qlim8 har vi bygget en feature, vi kalder Brag Board — en offentlig profil, hvor jeres ESG-fremskridt vises automatisk fra jeres reelle data i platformen. Pointen er ikke at promovere Brag Board, men princippet: hvis jeres marketingafdeling henter tal direkte fra jeres dokumenterede platform i stedet for at lave nye påstande, er risikoen for greenwashing minimeret. Det er meget sværere at sige noget forkert om sit klimaarbejde, hvis kilden er den samme audit trail, som banken og revisor bruger.',
    },

    { type: 'h2', text: 'Konklusion: Ærligheden er rustningen' },
    {
      type: 'paragraph',
      text: 'Min stærke overbevisning, efter at have arbejdet med ESG-værktøjer og kommunikation længe nu, er, at frygten for greenwashing får mange virksomheder til at gøre det stik modsatte af hvad der er klogt. De stopper med at kommunikere overhovedet. De gemmer deres reelle resultater væk, fordi de er bange for at blive misforstået. De ender med at se mere mistænkelige ud, ikke mindre, fordi tavshed på et område som dette signalerer, at man ikke har noget at vise.',
    },
    {
      type: 'paragraph',
      text: 'Den bedste forsvar mod greenwashing-anklager er ikke at undgå at tale om klima. Det er at tale om klima på en måde, der er konkret, dokumenteret, sporbart og ærlig. Bær jeres datakvalitetsscore som det den er — et reelt tal, der over tid bliver bedre. Bær jeres reelle reduktioner med stolthed — sig det med tal og specifikke kategorier. Bær jeres kompensation som det den er — en separat aktivitet, der ikke erstatter reduktion. Og bær jeres områder med datausikkerhed med ærlighed — det er bedre at sige "her er vores estimat baseret på branche-data" end at lade som om I har præcise tal, I ikke har.',
    },
    {
      type: 'paragraph',
      text: 'ESG handler ikke om at være pæn. Det handler om at være ærlig — og om at agere på baggrund af tingenes faktiske tilstand. Virksomhederne, der gør det, har ingen grund til at frygte greenwashing-anklager, fordi der ikke er noget at angribe. Ærligheden er deres skjold.',
    },
    { type: 'paragraph', text: 'Det er hele pointen.' },
  ],
}
