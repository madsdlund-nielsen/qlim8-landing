import type { Article } from './article'

export const artikel: Article = {
  slug: 'hvad-koster-klimaregnskab-2026',
  title: 'Hvad koster et klimaregnskab i 2026? Den ærlige guide til danske SMV\'er',
  description:
    'Konsulent, gør-det-selv i Excel eller specialiseret software? Den reelle 3-årige TCO for et klimaregnskab — og de skjulte omkostninger, ingen taler om.',
  category: 'Økonomi',
  publishedAt: '2026-04-29',
  readingTime: 12,
  sections: [
    {
      type: 'lead',
      text: 'Det er et af de mest søgte spørgsmål blandt danske erhvervsledere i 2026, og det er også et af dem, der bliver besvaret mest uærligt: Hvad koster det egentlig at få lavet et klimaregnskab?',
    },
    { type: 'paragraph', text: 'Jeg har set svaret variere fra "gratis" til "200.000 kroner". Begge dele er teknisk korrekte for nogle. Begge dele er stærkt vildledende for de fleste.' },
    {
      type: 'paragraph',
      text: 'Lad mig give dig den ærlige version. Jeg sælger selv en del af løsningsbilledet, og jeg fortæller dig præcis hvor og hvordan. Men min hovedinteresse i denne artikel er ikke at sælge dig qlim8 — det er at give dig et sandt overblik over markedet, så du kan tage en informeret beslutning. Hvis jeg gør det godt, finder mange af jer ud af, at qlim8 passer til jer. Hvis jeg gør det dårligt, lyder jeg som de generiske ESG-marketing-artikler, der har skabt halvdelen af forvirringen i markedet i forvejen.',
    },
    { type: 'paragraph', text: 'Vi starter med hvad du faktisk køber, så bliver tallene meningsfulde.' },

    { type: 'h2', text: 'Hvad et klimaregnskab faktisk indeholder' },
    {
      type: 'paragraph',
      text: 'Når jeg taler med SMV-ejere om klimaregnskab, opdager jeg ofte, at de tror, det er ét produkt. Det er det ikke. Et "klimaregnskab" er typisk fire ting samlet:',
    },
    {
      type: 'paragraph',
      text: 'For det første en beregning af din virksomheds drivhusgasudledning i Scope 1 (direkte fra egne kilder som firmabiler og gasfyr), Scope 2 (energi du køber — el, varme) og Scope 3 (alt det indirekte — fra indkøbte varer og tjenester til affald og forretningsrejser). Scope 3 udgør typisk 70-90 % af det samlede aftryk for en SMV, og det er der, langt det meste af det reelle arbejde ligger.',
    },
    {
      type: 'paragraph',
      text: 'For det andet en formel rapport i et format, der kan bruges. Det er typisk VSME-skabelonen fra EFRAG — den europæiske organisation, der står bag bæredygtighedsstandarderne. VSME findes som Basis (bagudskuende historiske data) eller Comprehensive (med politikker, handlinger og målsætninger). Bankerne har konvergeret om VSME som det fælles sprog for SMV\'er, og de foretrækker den i Excel-format, fordi det kan maskinaflæses.',
    },
    {
      type: 'paragraph',
      text: 'For det tredje et audit trail — dokumentation, der gør, at I kan vise, hvor hvert tal i regnskabet kommer fra. Det er ikke en luksus. Det er det grundlæggende krav fra en revisor: hvis nogen peger på et tal og spørger "hvor kommer det fra?", skal I kunne svare med konkrete fakturaer, målinger og emissionsfaktorer.',
    },
    {
      type: 'paragraph',
      text: 'For det fjerde — for de virksomheder, der vil videre end ren compliance — en reduktionsstrategi. Reduktionsmål, scenarier for hvad forskellige tiltag betyder, og en plan, der kan dokumenteres overfor bank, kunder og bestyrelse.',
    },
    { type: 'paragraph', text: 'Det er hvad du køber. Nu til hvad det koster.' },

    { type: 'h2', text: 'Vej 1: ESG-konsulent' },
    {
      type: 'paragraph',
      text: 'En dygtig dansk bæredygtighedskonsulent koster typisk mellem 1.200 og 1.800 kroner i timen. De største revisionshuse (PwC, EY, Deloitte, KPMG) ligger oftest i toppen af det interval. Specialiserede bæredygtighedsbureauer som Beierholm Bæredygtighed, BDO Sustainability og en del mindre boutique-konsulenter ligger typisk i midten. Helt små én-mands-konsulenter kan ligge under det interval, men kvaliteten varierer.',
    },
    {
      type: 'paragraph',
      text: 'Et komplet VSME Basis-regnskab for en mellemstor SMV — lad os sige 15-50 ansatte med en almindelig fakturamængde — tager erfaringsmæssigt 30-50 konsulenttimer. Det inkluderer dataindsamling, kategorisering, beregning, rapport-skrivning og to-tre møder.',
    },
    {
      type: 'paragraph',
      text: 'Det giver en regning på 36.000-90.000 kroner for ét klimaregnskab. Det er din opstartsudgift første år. Hvert efterfølgende år koster typisk lidt mindre — 20-40 konsulenttimer afhængigt af hvor stabilt forretningen er, så omkring 24.000-72.000 kroner pr. årligt regnskab.',
    },
    {
      type: 'paragraph',
      text: 'Jeg vil ikke pege fingre ad det her. Jeg har samarbejdet med flere danske bæredygtighedskonsulenter, og jeg har stor respekt for det, de gør. En god konsulent bringer ting til bordet, som software ikke kan: strategisk dømmekraft, fortolkning af regulatoriske gråzoner, evnen til at føre en svær samtale med en bestyrelse, og dybde i specifikke brancher. Hvis I står med en kompleks omstillingsbeslutning, en kunde der pludselig kræver Scope 3-data på en bestemt produktlinje, eller en bestyrelse der har brug for en sparringspartner — så er en konsulent reelt værdifuld.',
    },
    {
      type: 'paragraph',
      text: 'Det konsulenten typisk ikke skal bruges på, er det rutinemæssige dataindsamlingsarbejde. At sidde og samle fakturaer, slå emissionsfaktorer op, opdatere et regneark, og lave de samme beregninger om hver måned eller hvert kvartal. Det er ikke konsulentens kompetence, og det er ikke det, du betaler 1.500 kr i timen for. Hvis du gør det, betaler du dyr arbejdskraft for at lave noget, der burde være automatiseret.',
    },
    {
      type: 'paragraph',
      text: 'Hvornår konsulent-vejen er rigtig: Hvis I har en kompleks forretning, er i en højeksponeret branche, har specifikke regulatoriske udfordringer, har brug for strategisk rådgivning frem for bare rapportering, eller hvis I i forvejen har en konsulentrelation, der fungerer. Og hvis I har budgettet til både rugbrødsarbejdet og strategien.',
    },

    { type: 'h2', text: 'Vej 2: Gør-det-selv i Excel' },
    { type: 'paragraph', text: 'Det her er den løsning, der ser gratis ud, og som de færreste regner ærligt på.' },
    {
      type: 'paragraph',
      text: 'For en mellemstor SMV tager det første komplette klimaregnskab i Excel typisk 3-6 ugers internt arbejde. Det er typisk direktøren, bogholderen eller en koordineret indsats mellem flere. Dataindsamling alene kan tage to uger — fakturaerne skal hentes, kategoriseres, og linkes til de rigtige emissionsfaktorer fra Klimakompasset, EXIOBASE eller andre kilder. Beregningerne tager en uge mere. Rapport-skrivning og formatering til VSME-skabelonen tager den sidste uge.',
    },
    {
      type: 'paragraph',
      text: 'Hvis vi regner med, at den person, der gør arbejdet, har en intern omkostning på 400-600 kroner i timen (det er den interne timepris for en ejer-leder eller seniormedarbejder i mange SMV\'er, inklusive lønomkostninger og overhead), så er en realistisk samlet intern omkostning for et Excel-regnskab typisk 40.000-80.000 kroner i intern tid det første år.',
    },
    {
      type: 'paragraph',
      text: 'Andet år er hurtigere — måske 2-3 uger — så 20.000-40.000 kroner i intern tid. Forudsat at den person, der lavede det første år, stadig er ansat og kan huske, hvad de gjorde.',
    },
    {
      type: 'paragraph',
      text: 'Det er ikke det værste ved Excel-vejen. Det værste er, at du ender med et statisk dokument, der er forældet den dag, det er færdigt. Hver gang en ny faktura kommer ind, eller en emissionsfaktor opdateres, eller en kunde stiller et nyt spørgsmål, skal nogen tilbage i regnearket og rette. Det gør de typisk ikke, og dermed forsvinder værdien af regnskabet hurtigt.',
    },
    {
      type: 'paragraph',
      text: 'Hvornår Excel-vejen er rigtig: For en mikrovirksomhed med 1-5 ansatte og en enkel forretning, hvor klimaregnskabet ikke skal indgå i nogen forretningsproces andet end at vise banken en gang om året. For en virksomhed, hvor ejeren er teknisk dygtig og har personlig interesse i at forstå mekanikken fra bunden. Eller som læringsprojekt, hvor selve arbejdet er en del af pointen. Hvis ingen af de ting er sande, er Excel-vejen typisk dyrere end den ser ud.',
    },

    { type: 'h2', text: 'Vej 3: Specialiseret software' },
    { type: 'paragraph', text: 'Her bliver markedet større og mere mangfoldigt, end mange tror. Lad mig dele det op i to lag.' },
    {
      type: 'paragraph',
      text: 'Enterprise-platforme rettet mod store virksomheder — internationalt anerkendte navne som Normative, Position Green, Watershed og en del lignende. De er designet til virksomheder med dedikerede bæredygtighedsteams og store budgetter. Deres priser er sjældent offentlige; de fleste forhandler individuelt og kræver demoer og salgsmøder, før de tilbyder et tal. Min erfaring, fra at tale med SMV-ejere der har fået tilbud fra denne kategori, er at en SMV-pakke typisk lander i 5-cifret kroneklasse pr. måned. Det kan være 10.000 til 30.000 kroner pr. måned, afhængig af bredden af features og antal brugere. Det er fantastisk software for de virksomheder, der har brug for det. For en typisk dansk SMV med 10-50 ansatte er det skyderi efter gråspurve med rumvåben.',
    },
    {
      type: 'paragraph',
      text: 'SMV-specifikke platforme — det segment hvor qlim8 lever, sammen med en håndfuld andre danske og europæiske aktører. Her er priserne offentlige og typisk i 3-cifret kroneklasse pr. måned. Det er bevidst designet til den SMV-virkelighed, hvor budgettet for bæredygtighedsarbejde er reelt begrænset, og hvor man ikke har en dedikeret bæredygtighedschef til at lære et komplekst system at kende.',
    },
    { type: 'paragraph', text: 'Lad mig være konkret om qlim8\'s egne priser, for det er den eneste platform, jeg kan udtale mig fagligt præcist om.' },
    {
      type: 'paragraph',
      text: 'qlim8 Starter koster 300 kroner om måneden ved månedlig betaling, eller 3.000 kroner om året ved årsbetaling. Det svarer til 250 kroner om måneden effektivt, hvis du vælger årsbetaling. Den dækker komplet Scope 1, 2 og 3 klimaregnskab med AI-kategorisering, fuld audit trail på hver beregning, VSME Basis-rapport med wizard, Excel-eksport og adgang til alle danske integrationer (Dinero, e-conomic, Billy og Eloverblik).',
    },
    {
      type: 'paragraph',
      text: 'qlim8 Premium koster 750 kroner om måneden ved månedlig betaling, eller 7.500 kroner om året ved årsbetaling. Det svarer til 625 kroner om måneden effektivt på årsbetaling. Premium inkluderer alt i Starter plus VSME Comprehensive, reduktionsmål, Scenario Builder, custom PDF-rapporter, offentligt Brag Board og fuldt REST API + MCP-integration.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 Enterprise er den tredje tier — den er prissat individuelt fordi den indeholder funktioner som dedikeret supply chain-portal og rollebaseret adgangsstyring, og fordi behovet varierer markant. Hvis I er en større organisation der skal indsamle VSME-data fra mange underleverandører, er det den vej, vi typisk taler med jer om.',
    },
    {
      type: 'paragraph',
      text: 'Derudover findes en enkelt vigtig add-on: I kan tilkøbe yderligere historisk data, hvis I vil have en baseline længere tilbage i tiden end de tre måneder, der hentes automatisk ved tilkobling. Prisen svarer typisk til et års abonnement på jeres tier — så omkring 3.000-7.500 kroner som engangsbeløb, afhængig af hvilken plan I er på.',
    },
    {
      type: 'paragraph',
      text: 'Det er det. Ingen opsætningsgebyrer, ingen forpligtelser ud over abonnementet, ingen skjulte konsulenttimer indregnet i prisen. Du kan oprette en gratis konto, prøve hele platformen i et eksempelmiljø med fyldt eksempeldata, og vælge plan først, når du beslutter dig for at tilkoble dit eget regnskab.',
    },
    {
      type: 'paragraph',
      text: 'Hvornår software-vejen er rigtig: Hvis I har 5-250 ansatte, har et regnskabssystem hvor data allerede ligger struktureret, ikke har en dedikeret bæredygtighedsmedarbejder, og vil have en proces der løber af sig selv frem for et projekt I skal lave om hvert år.',
    },

    { type: 'h2', text: 'Det ærlige sammenligningsbillede' },
    { type: 'paragraph', text: 'Lad mig samle det i tal. Det her er en 3-årig total-omkostning for en typisk dansk SMV med 15-50 ansatte:' },
    {
      type: 'list',
      items: [
        'DIY i Excel: opstart 0 kr, år 1 typisk 40-80.000 kr (intern tid), år 2 og 3 typisk 20-40.000 kr — 3-års TCO 80-160.000 kr. Intet automatisk audit trail eller opdatering.',
        'Konsulent: opstart 0 kr, år 1 typisk 36-90.000 kr, år 2 og 3 typisk 24-72.000 kr — 3-års TCO 84-234.000 kr. Delvist audit trail, ingen automatisk opdatering.',
        'SMV-software (qlim8 Starter): opstart 0 kr (sandbox er gratis), årlige omkostninger 3-3.600 kr — 3-års TCO 9-10.800 kr. Fuld audit trail, automatisk opdatering, samme dag.',
        'Enterprise-platform: opstart 0 kr (men salgsmøde-tid), årligt typisk 120-360.000 kr — 3-års TCO 360.000-1.080.000 kr. Fuld audit trail og automatisk opdatering, men implementation tager 1-3 måneder.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Tallene er realistiske ranges, ikke worst case eller best case. De er heller ikke universelle — der findes konsulenter, der gør det billigere, og der findes Excel-projekter, der gøres på en uge. Men hvis I tager en ærlig snak om jeres realistiske scenarie og bruger ovenstående som udgangspunkt, lander I tæt på sandheden.',
    },

    { type: 'h2', text: 'De skjulte omkostninger ingen taler om' },
    { type: 'paragraph', text: 'Sammenligningstabellen ovenfor dækker det direkte. Den dækker ikke alt.' },
    {
      type: 'paragraph',
      text: 'Prisen på at vente. L193 trådte i kraft 1. januar 2026, og banker og store kunder begynder reelt at sortere leverandører efter ESG-dokumentation nu. Hvis du udskyder beslutningen i 12 måneder, fordi du ikke ved hvilken vej du skal vælge, koster det dig potentielt en kreditrevurdering, en tabt udbudsrunde, eller et øget rentebånd. Ingen af de omkostninger optræder på en faktura — men de er ofte mere reelle end forskellen mellem konsulent og software.',
    },
    {
      type: 'paragraph',
      text: 'Prisen på at vælge forkert system. At starte i et tungt enterprise-system og opdage, at det ikke er bygget til jeres virkelighed, koster ikke kun de penge I har betalt, men også den tid I har brugt på at lære det. Det samme gælder omvendt: at vælge en for letvægt løsning og opdage, at I har brug for funktionalitet, der ikke findes, betyder at flytte til ny platform med data-eksport og setup forfra. Time-to-value — hvor hurtigt I reelt har et brugbart resultat — er en undervurderet faktor.',
    },
    {
      type: 'paragraph',
      text: 'Prisen på audit-support. Hvis revisoren stiller spørgsmål til jeres regnskab og I ikke har et ordentligt audit trail, ender det med flere konsulenttimer eller flere interne timer for at finde svarene. Et komplet, sporbart audit trail er en engangs-investering der betaler sig hver gang I bliver spurgt — og I vil blive spurgt.',
    },
    {
      type: 'paragraph',
      text: 'Prisen på opdateringer. Klimakompasset opdateres årligt af Erhvervsstyrelsen og Energistyrelsen. Eldeklarationer fra Energinet skifter løbende. Nye EPD\'er publiceres konstant. En platform, der opdaterer disse automatisk, fjerner en reel og tilbagevendende intern omkostning, som ofte glemmes i den oprindelige investeringsberegning.',
    },

    { type: 'h2', text: 'Hvad du skal kigge efter — og hvad du ikke skal betale for' },
    {
      type: 'paragraph',
      text: 'Når du vurderer en løsning — konsulent, software eller hybrid — er der nogle ting, du skal kræve, og nogle ting, du aldrig skal betale for.',
    },
    {
      type: 'paragraph',
      text: 'Krav: Audit trail på hver beregning. Hvis I ikke kan klikke fra et samlet tal ned til den enkelte faktura og se hvilken emissionsfaktor der er brugt, har I en blackbox. Revisor kan ikke validere en blackbox. Bank kan ikke stole på en blackbox. I kan ikke selv stole på en blackbox.',
    },
    {
      type: 'paragraph',
      text: 'Krav: VSME-kompatibilitet. Slutproduktet skal eksporteres i EFRAG\'s officielle skabelon, helst Excel-format. Hvis I får en pæn PDF-rapport, der ikke følger VSME-strukturen, kan banken eller den store kunde ikke importere den i deres systemer, og I står tilbage med et dokument, der ser pænt ud, men som ingen andre kan bruge.',
    },
    {
      type: 'paragraph',
      text: 'Krav: Danske data og kilder først. Klimakompasset, Energinets eldeklarationer, EPD Danmark og andre danske kilder skal være integrerede og prioriteres over internationale fallback-data. Hvis platformen er bygget primært til amerikanske eller britiske data, vil jeres regnskab afspejle en virkelighed, der ikke er jeres.',
    },
    {
      type: 'paragraph',
      text: 'Betal ikke for: Opdateringer. Emissionsfaktorer opdateres løbende, og det er en grundlæggende del af platformens vedligeholdelse. Hvis nogen vil tage ekstra penge for at "opdatere" jeres regnskab, når Klimakompasset udgiver nye faktorer, skal I tænke jer om.',
    },
    {
      type: 'paragraph',
      text: 'Betal ikke for: Setup-gebyrer på SMV-software. Hvis platformen er bygget til SMV\'er, skal den kunne tilkobles uden professional services. Setup-gebyrer er et tegn på, at I er ved at købe et enterprise-produkt under en SMV-fane.',
    },
    {
      type: 'paragraph',
      text: 'Betal ikke for: Bindingsperioder. SMV-software bør kunne opsiges. Hvis nogen vil binde jer i 24 måneder uden ud-klausul, sender det et signal om, at de ikke er trygge ved, at I bliver tilfredse nok til at fortsætte frivilligt.',
    },

    { type: 'h2', text: 'Hvad jeg vil anbefale dig at gøre' },
    { type: 'paragraph', text: 'Hvis jeg skulle vælge én tilgang til en typisk dansk SMV med 10-100 ansatte i 2026, ville den se sådan ud.' },
    {
      type: 'paragraph',
      text: 'Start med specialiseret SMV-software. Det dækker 80-90 % af compliance-behovet for typisk under 10.000 kroner om året, og det giver jer et reelt klimaregnskab fra den dag, I tilkobler jeres regnskabssystem. Det er det, et automatisk system er bedst til.',
    },
    {
      type: 'paragraph',
      text: 'Suppler med konsulent på strategi, ikke på data. Hvis I står overfor en omstillingsbeslutning, en kompleks Scope 3-udfordring fra en stor kunde, eller en bestyrelse der har brug for en sparringspartner, så hyr en god konsulent til de timer det tager. 5-15 timers konsulent om året er typisk nok for de fleste SMV\'er — det er 8.000-25.000 kroner i strategisk rådgivning ovenpå softwaren.',
    },
    {
      type: 'paragraph',
      text: 'Undgå Excel. Det er den falske besparelse, der koster mest over tid. Det eneste argument for det er, hvis I er en mikrovirksomhed med en personlig interesse i at forstå mekanikken fra bunden — og selv da, vil mange ende med at konkludere, at de hellere vil bruge den interne tid på forretningen.',
    },
    {
      type: 'paragraph',
      text: 'Undgå enterprise-platforme, indtil I reelt har behovet. De er fantastiske til 250+-medarbejder-virksomheder med dedikerede bæredygtighedsteams. De er ikke for jer endnu, og det er ok at vente.',
    },

    { type: 'h2', text: 'Det her handler om noget mere end pris' },
    {
      type: 'paragraph',
      text: 'Et klimaregnskab har en pris. Det at ikke have et, har en højere — særligt i den nuværende danske virkelighed, hvor banker, store kunder og leverandørkæder begynder at sortere på dokumentation.',
    },
    {
      type: 'paragraph',
      text: 'Men prisen er ikke det interessante. Det interessante er, hvad I får for pengene, om det bygger over tid, og om det reelt frigiver ressourcer i jeres virksomhed til at bruge tiden på det, der reelt rykker forretningen.',
    },
    {
      type: 'paragraph',
      text: 'Hvis I gør det rigtigt, er klimaregnskabet ikke et projekt. Det er en proces, der kører i baggrunden, og som leverer dokumentation når I har brug for den. Og når I har den proces, kan I bruge jeres budget — både for konsulent og for software — på det der reelt skaber værdi: den strategiske samtale om hvor I skal hen, ikke det manuelle arbejde med at finde frem til hvor I er.',
    },
    {
      type: 'paragraph',
      text: 'Det er det, vi har bygget qlim8 til. Hvis du vil se hvordan, er der en gratis konto med eksempeldata, du kan klikke rundt i, før du beslutter dig. Ingen kreditkort, ingen salgsmøde, og prøveperioden starter først, når du tilkobler dit eget regnskab.',
    },
    {
      type: 'paragraph',
      text: 'Den ærlige sammenligning, du har lige læst, er præcis den sammenligning, jeg gerne vil have, du laver. Hvis qlim8 ikke er det rigtige for jer, så lad være med at vælge os. Hvis det er, så er der ingen grund til at vente.',
    },
  ],
}
