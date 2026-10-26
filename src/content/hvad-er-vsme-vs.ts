import type { Article } from './article'

export const artikel: Article = {
  slug: 'hvad-er-vsme-vs',
  title: 'Hvad er VSME? Og hvorfor hedder den nu VS?',
  description:
    'Om EU\'s frivillige ESG-standard, lempelserne i Omnibus I og det værdikædeloft, der gælder fra 2027. Hvad VSME er, hvad der er ændret med VS, og hvad du skal gøre nu.',
  category: 'Compliance',
  publishedAt: '2026-10-26',
  readingTime: 11,
  sections: [
    {
      type: 'lead',
      text: 'Mange danske SMV-ejere møder ESG første gang som et spørgeskema. Det kommer fra en stor kunde, fra banken eller som en del af et udbud. Det næste kommer fra en anden kunde og ser helt anderledes ud.',
    },
    {
      type: 'image',
      url: '/photos/qlim8-blog-vs-svejser.jpg',
      alt: 'Svejser arbejder på metalprofiler i en produktionshal.',
      caption: 'Foto: Collab Media / Unsplash',
    },
    {
      type: 'paragraph',
      text: 'VSME blev skabt til at løse det problem. En fælles europæisk skabelon, så en mindre virksomhed kan samle sine ESG-data ét sted og svare alle ud fra det samme grundlag.',
    },
    {
      type: 'paragraph',
      text: 'I 2026 har standarden fået nyt navn, ny juridisk status og en ny rolle. Den hedder nu VS, Voluntary Standard. Den 24. september trådte den i kraft som EU-forordning.',
    },
    {
      type: 'paragraph',
      text: 'Den vigtigste nyhed er værdikædeloftet. Fra regnskabsåret 2027 sætter det en øvre grænse for, hvad store virksomheder med CSRD-pligt kan kræve af dig til deres egen rapportering.',
    },
    {
      type: 'paragraph',
      text: 'Resten af artiklen gennemgår, hvad VSME er, hvad lempelserne har ændret, hvad VS kan bruges til, og hvad du skal gøre nu.',
    },

    { type: 'h2', text: '1. Hvad er VSME?' },
    {
      type: 'paragraph',
      text: 'VSME er en forkortelse for Voluntary Sustainability Reporting Standard for non-listed SMEs. På dansk: en frivillig standard for bæredygtighedsrapportering til små og mellemstore virksomheder, der ikke er børsnoterede.',
    },
    {
      type: 'paragraph',
      text: 'Standarden er udviklet af EFRAG. Det er det samme tekniske organ, der har skrevet ESRS, de obligatoriske standarder for de store virksomheder under CSRD. EFRAG afleverede den endelige VSME til EU-Kommissionen i december 2024.',
    },
    {
      type: 'paragraph',
      text: 'Den 30. juli 2025 gjorde Kommissionen VSME til en officiel anbefaling. En anbefaling er et signal. Ingen er juridisk bundet af den.',
    },
    { type: 'paragraph', text: 'Anbefalingen havde tre formål:' },
    {
      type: 'list',
      items: [
        'At give mindre virksomheder et enkelt og ensartet format til ESG-oplysninger.',
        'At hjælpe dem med at følge deres egen udvikling.',
        'At gøre det lettere at få adgang til grøn finansiering.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Kommissionen opfordrede samtidig store virksomheder, banker og investorer til at bygge deres dataforespørgsler på VSME, så vidt det var muligt. En opfordring er stadig kun en opfordring. Spørgeskemaerne fortsatte.',
    },

    { type: 'h2', text: '2. Problemet: spørgeskemaerne ruller ned gennem værdikæden' },
    {
      type: 'paragraph',
      text: 'CSRD kræver, at store virksomheder rapporterer om hele deres værdikæde. Når en stor virksomhed skal opgøre sin klimapåvirkning, skal den bruge data fra sine leverandører. Og leverandørerne er ofte små.',
    },
    {
      type: 'image',
      url: '/photos/qlim8-blog-vs-lagerhal.jpg',
      alt: 'Lagerhal med reoler fyldt med paller og papkasser.',
      caption: 'Foto: Alberto Rodríguez / Unsplash',
    },
    {
      type: 'paragraph',
      text: 'Kommissionen kalder det trickle-down-effekten. Kravene til de store siver ned til de små, ét spørgeskema ad gangen.',
    },
    {
      type: 'paragraph',
      text: 'Tag en tænkt metalvirksomhed på Fyn med 40 ansatte og tre store kunder. Den første kunde vil have CO2-udledningen i ton. Den anden vil have den i kilo pr. omsætningskrone. Den tredje vil vide, om fabrikken ligger tæt på et Natura 2000-område.',
    },
    {
      type: 'paragraph',
      text: 'De underliggende data er de samme hver gang. Formatet, definitionerne og fristerne skifter. Hver gang skal nogen i virksomheden bruge dage på at finde tallene frem igen.',
    },
    {
      type: 'paragraph',
      text: 'VSME var tænkt som det fælles sprog, der kunne gøre ét datasæt brugbart for alle tre kunder. Så længe standarden kun var en anbefaling, kunne kunderne frit spørge om mere.',
    },

    { type: 'h2', text: '3. Lempelserne: Omnibus I flytter grænsen' },
    {
      type: 'paragraph',
      text: 'I februar 2025 fremlagde Kommissionen Omnibus I, en pakke der skulle forenkle EU\'s bæredygtighedsregler. Rådet og Europa-Parlamentet blev enige i december 2025. Direktivet, (EU) 2026/470, trådte i kraft den 18. marts 2026.',
    },
    {
      type: 'image',
      url: '/photos/qlim8-blog-vs-eu-flag.jpg',
      alt: 'EU-flag foran Europa-Kommissionens hovedsæde i Bruxelles.',
      caption: 'Foto: Christian Lue / Unsplash',
    },
    {
      type: 'paragraph',
      text: 'Den største ændring er tærsklen. CSRD gælder nu kun for virksomheder med flere end 1.000 ansatte og en nettoomsætning på over 450 millioner euro. Børsnoterede SMV\'er er taget helt ud.',
    },
    {
      type: 'paragraph',
      text: 'Med de oprindelige regler var mange virksomheder med over 250 ansatte på vej ind under kravene. De fleste af dem er nu ude igen.',
    },
    { type: 'h3', text: 'Hvad betyder det i Danmark?' },
    {
      type: 'paragraph',
      text: 'Regeringen fremsatte den 7. oktober 2026 lovforslaget, der fører ændringerne ind i årsregnskabsloven. Det var sat til første behandling i Folketinget den 23. oktober, og loven foreslås at træde i kraft den 1. januar 2027.',
    },
    { type: 'paragraph', text: 'I danske tal betyder det:' },
    {
      type: 'list',
      items: [
        'CSRD gælder kun for virksomheder med over 1.000 ansatte og en nettoomsætning over 3.530 millioner kroner i to år i træk.',
        'Antallet af danske virksomheder med pligt til bæredygtighedsrapportering falder fra cirka 2.200 til cirka 220.',
        'Kravet om en redegørelse for samfundsansvar efter årsregnskabslovens § 99 a ophæves for store virksomheder fra regnskabsåret 2026. Et nyt krav i ledelsesberetningen dækker de ikke-finansielle forhold, der er nødvendige for at forstå virksomhedens udvikling.',
      ],
    },
    {
      type: 'paragraph',
      text: 'De store virksomheder fik samtidig forenklede ESRS-standarder, som gælder fra regnskabsåret 2027.',
    },
    { type: 'h3', text: 'Værdikædeloftet kommer til' },
    {
      type: 'paragraph',
      text: 'Omnibus I indførte også værdikædeloftet. Virksomheder med op til 1.000 ansatte, der ligger i værdikæden hos en CSRD-virksomhed, fik ret til at afvise forespørgsler, der går ud over den frivillige standard.',
    },
    {
      type: 'paragraph',
      text: 'Direktivet gav Kommissionen mandat til at fastlægge den standard i en delegeret retsakt. Den standard hedder i dag VS.',
    },

    { type: 'h2', text: '4. Fra VSME til VS' },
    {
      type: 'paragraph',
      text: 'Den 3. juli 2026 vedtog Kommissionen den frivillige standard som delegeret forordning. Den blev offentliggjort i EU-Tidende den 21. september som forordning (EU) 2026/1560 og trådte i kraft tre dage senere.',
    },
    {
      type: 'list',
      items: [
        'December 2024: EFRAG afleverer VSME til Kommissionen.',
        '30. juli 2025: Kommissionen udsender VSME som anbefaling.',
        '18. marts 2026: Omnibus I-direktivet træder i kraft.',
        '6. maj 2026: Udkast til VS sendes i offentlig høring.',
        '3. juli 2026: Kommissionen vedtager VS.',
        '4. september 2026: Parlament og Råd gør ikke indsigelse.',
        '24. september 2026: VS træder i kraft og kan bruges med det samme.',
        '1. januar 2027: Værdikædeloftet gælder for regnskabsår, der starter denne dato eller senere.',
      ],
    },
    { type: 'h3', text: 'Det nye' },
    {
      type: 'list',
      items: [
        'Navnet: SME er røget ud, fordi standarden nu er til alle virksomheder uden CSRD-pligt med op til 1.000 ansatte i gennemsnit. Den oprindelige VSME var skrevet til virksomheder med op til 250 ansatte.',
        'Den juridiske status: VS er en forordning og gælder direkte i alle EU-lande uden at skulle skrives ind i dansk lov. Den afløser anbefalingen fra 2025. Det er fortsat frivilligt at bruge den.',
        'Rollen: VS er nu referencepunktet for værdikædeloftet.',
        'Færre datapunkter: Kravet om CO2-intensitet pr. omsætning er fjernet. Biodiversitet er skåret ned til, om virksomheden har lokationer i eller nær et følsomt naturområde, og hvilket. Løngabet mellem kønnene skal kun oplyses, hvis anden lovgivning allerede kræver det. Uddannelsestimer opgøres uden kønsopdeling.',
        'Personaleomsætning er flyttet: Den ligger nu i det udvidede modul.',
        'Lettelser for de mindste: For virksomheder med 10 ansatte eller færre er en række datapunkter blevet frivillige, blandt andet energiforbrug, scope 1 og 2, vand og affald.',
        'Kroner: Omsætning og balance angives i den valuta, regnskabet føres i. Danske virksomheder kan altså bruge kroner.',
        'Fortrolige oplysninger: Forretningshemmeligheder og oplysninger, der kan skade virksomhedens kommercielle position alvorligt, kan udelades. Det skal oplyses for hvert datapunkt.',
        'Vejledningen er flyttet: Den detaljerede vejledning ligger nu i EFRAG\'s Knowledge Hub og er ikke længere en del af selve standarden.',
      ],
    },
    { type: 'h3', text: 'Det samme' },
    {
      type: 'paragraph',
      text: 'Strukturen med et basismodul og et udvidet modul er bevaret. Der er stadig ingen krav om dobbelt væsentlighedsanalyse og ingen krav om revision.',
    },
    {
      type: 'paragraph',
      text: 'Har I allerede arbejdet efter VSME, kan I bygge videre på det. De data, I har samlet, er stadig gyldige.',
    },

    { type: 'h2', text: '5. Hvad standarden indeholder' },
    {
      type: 'paragraph',
      text: 'VS har to moduler. Basismodulet er fundamentet, og det udvidede modul (Comprehensive) bygger ovenpå. I vælger enten basismodulet alene (Option A) eller begge moduler (Option B). Det udvidede modul kan ikke bruges alene.',
    },
    { type: 'h3', text: 'Basismodulet' },
    {
      type: 'list',
      items: [
        'B1: Grundlaget for rapporten, herunder en erklæring om hvilken option I følger',
        'B2: Praksis, politikker og initiativer for omstillingen',
        'B3: Energiforbrug og drivhusgasudledning i scope 1 og 2',
        'B4: Forurening af luft, vand og jord',
        'B5: Biodiversitet',
        'B6: Vand',
        'B7: Ressourceforbrug, cirkulær økonomi og affald',
        'B8: Medarbejdere, generelle oplysninger',
        'B9: Arbejdsmiljø og sikkerhed',
        'B10: Løn, overenskomst og uddannelse',
        'B11: Domme og bøder for korruption og bestikkelse',
      ],
    },
    {
      type: 'cta',
      heading: 'Basismodulet ud fra bogholderiet',
      text: 'qlim8 henter data direkte fra jeres regnskabssystem (e-conomic, Dinero, Billy eller Uniconta) og samler dem i en rapport efter VS. Se pakkerne, og kom gratis i gang.',
      buttonText: 'Se priser og pakker',
      buttonHref: '/priser',
    },
    { type: 'h3', text: 'Det udvidede modul' },
    {
      type: 'list',
      items: [
        'C1: Forretningsmodel og strategi',
        'C2: Uddybning af praksis, politikker og initiativer',
        'C3: Reduktionsmål og klimaomstilling',
        'C4: Klimarisici',
        'C5: Flere medarbejderdata, herunder personaleomsætning',
        'C6: Politikker og processer for menneskerettigheder',
        'C7: Bekræftede hændelser vedrørende menneskerettigheder',
        'C8: Omsætning fra bestemte sektorer: våben, tobak, fossile brændsler og kemikalier',
        'C9: Kønsfordeling i ledelsen',
      ],
    },
    {
      type: 'paragraph',
      text: 'Et modul skal følges i sin helhed. Princippet er dog, at I kun rapporterer de oplysninger, der er relevante for jeres virksomhed. B4 om forurening skal for eksempel kun udfyldes, hvis I allerede skal indberette udledninger efter anden lovgivning.',
    },
    {
      type: 'paragraph',
      text: 'Scope 3 er ikke et generelt krav. Standarden nævner, at scope 3 kan være relevant i produktion, landbrug og fødevarer, byggeri og ejendomsudvikling samt emballage. Ligger I i en af de brancher, er det værd at overveje.',
    },

    { type: 'h2', text: '6. Hvad kan VS bruges til?' },
    {
      type: 'paragraph',
      text: 'Kommissionen giver VS to formål. Standarden skal give virksomheder uden CSRD-pligt et enkelt format til frivillig rapportering. Og den skal bremse trickle-down-effekten i værdikæden. I praksis giver det seks anvendelser.',
    },
    { type: 'h3', text: 'Svar til kunder med CSRD-pligt' },
    {
      type: 'paragraph',
      text: 'Fra regnskabsåret 2027 dækker en VS-rapport alt det, en CSRD-kunde kan kræve af jer til sin CSRD-rapportering. I kan henvise til rapporten og spare dobbeltarbejdet.',
    },
    { type: 'h3', text: 'Banken' },
    {
      type: 'paragraph',
      text: 'Banker spørger til ESG ved lån og kreditvurdering. Det udvidede modul er skrevet med banker og investorer for øje. Især C3 om reduktionsmål og C4 om klimarisici er oplysninger, en bank typisk vil se.',
    },
    { type: 'h3', text: 'Tilbud og udbud' },
    {
      type: 'paragraph',
      text: 'Når en indkøber spørger til klima, arbejdsmiljø eller menneskerettigheder, har I svarene klar i et format, som allerede er velkendt.',
    },
    { type: 'h3', text: 'Jeres egen styring' },
    {
      type: 'paragraph',
      text: 'B3 giver jer et basisår for energi og CO2. C3 giver jer mål at styre efter. Opgør det samme hvert år, og I kan se, om tiltagene virker.',
    },
    { type: 'h3', text: 'En trædesten mod ESRS' },
    {
      type: 'paragraph',
      text: 'VS er tilpasset de forenklede ESRS. Vokser I ind under CSRD, bygger I videre på de data, I allerede har.',
    },
    { type: 'h3', text: 'EMAS' },
    {
      type: 'paragraph',
      text: 'Er I EMAS-registreret, kan miljøredegørelsen og VS-rapporten nu samles i én rapport, hvor fælles oplysninger kun står én gang.',
    },

    { type: 'h2', text: '7. Værdikædeloftet' },
    {
      type: 'paragraph',
      text: 'Værdikædeloftet er grunden til, at VS betyder mere end VSME gjorde.',
    },
    {
      type: 'paragraph',
      text: 'Fra regnskabsår, der starter 1. januar 2027 eller senere, må virksomheder med CSRD-pligt højst kræve de oplysninger af jer, som VS fastlægger. Det gælder, når I selv er uden CSRD-pligt og har op til 1.000 ansatte. Forordningen kalder jer en beskyttet virksomhed.',
    },
    { type: 'paragraph', text: 'VS sorterer sine datapunkter i fire kategorier:' },
    {
      type: 'ordered-list',
      items: [
        'Væsentlige datapunkter, som alle skal rapportere.',
        'Datapunkter, der kun skal rapporteres under bestemte omstændigheder.',
        'Frivillige datapunkter.',
        'Sektorspecifikke oplysninger.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Kun de væsentlige datapunkter, der står i forordningens bilag II, ligger inden for loftet. Bilag II skelner mellem virksomheder med 10 ansatte eller færre og virksomheder med flere end 10.',
    },
    {
      type: 'richtext',
      html:
        '<table><thead><tr><th>Oplysning</th><th>10 ansatte eller færre</th><th>Flere end 10 ansatte</th></tr></thead><tbody>' +
        '<tr><td>B1 Grundlag for rapporten (dele af)</td><td>Ja</td><td>Ja</td></tr>' +
        '<tr><td>B3 Energi og scope 1 og 2</td><td>Nej</td><td>Ja</td></tr>' +
        '<tr><td>B6 Vand</td><td>Nej</td><td>Ja</td></tr>' +
        '<tr><td>B7 Ressourcer og affald (dele af)</td><td>Nej</td><td>Ja</td></tr>' +
        '<tr><td>B8 Medarbejdere (dele af)</td><td>Ja</td><td>Ja</td></tr>' +
        '<tr><td>B9 Arbejdsmiljø (dele af)</td><td>Ja</td><td>Ja</td></tr>' +
        '<tr><td>B10 Løn, overenskomst og uddannelse (dele af)</td><td>Ja</td><td>Ja</td></tr>' +
        '<tr><td>C1 Forretningsmodel og strategi (dele af)</td><td>Nej</td><td>Ja</td></tr>' +
        '<tr><td>C5 Flere medarbejderdata</td><td>Nej</td><td>Ja</td></tr>' +
        '<tr><td>C6 Menneskerettigheder: politikker (dele af)</td><td>Nej</td><td>Ja</td></tr>' +
        '<tr><td>C7 Menneskerettigheder: hændelser (dele af)</td><td>Nej</td><td>Ja</td></tr>' +
        '</tbody></table>',
    },
    {
      type: 'paragraph',
      text: 'Uden for loftet ligger B2, B4, B5, B11, C2, C3, C4, C8 og C9. Det samme gør alle sektorspecifikke oplysninger, herunder scope 3.',
    },
    { type: 'paragraph', text: 'Tre ting er værd at hæfte sig ved:' },
    {
      type: 'list',
      items: [
        'Loftet går på tværs af modulerne: Har I flere end 10 ansatte, kan en CSRD-kunde kræve dele af det udvidede modul, også selvom I kun selv rapporterer efter basismodulet.',
        'De mindste er bedst beskyttet: Med 10 ansatte eller færre kan en CSRD-kunde hverken kræve energi, CO2 eller noget fra det udvidede modul.',
        'Klimamål og klimarisici er udenfor: C3 og C4 er typisk det, banker og store kunder spørger mest efter. De ligger uden for loftet, så en CSRD-kunde kan ikke kræve dem til sin CSRD-rapportering.',
      ],
    },

    { type: 'h2', text: '8. Det, loftet ikke dækker' },
    {
      type: 'paragraph',
      text: 'Værdikædeloftet bliver ofte beskrevet som en ret til at sige nej til alt ud over VS. Det er tæt på, men der er fire forbehold.',
    },
    { type: 'h3', text: 'Kunden må stadig spørge' },
    {
      type: 'paragraph',
      text: 'En CSRD-virksomhed kan godt bede om mere end loftet. Den skal tydeligt markere, hvilke oplysninger der ligger over loftet, og fortælle jer, at I har ret til at afslå. Kunden må heller ikke bruge kontrakter til at presse oplysninger over loftet igennem til CSRD-formål.',
    },
    { type: 'h3', text: 'Loftet gælder kun CSRD-rapportering' },
    {
      type: 'paragraph',
      text: 'Spørgsmål fra banken, i forbindelse med finansiering, i udbud eller fra kunder, der skal opfylde andre EU-regler, ligger uden for loftet. Det gælder for eksempel due diligence-kravene i CSDDD.',
    },
    { type: 'h3', text: 'Loftet er et maksimum' },
    {
      type: 'paragraph',
      text: 'Den store virksomhed skal fortsat vurdere, hvilke oplysninger fra værdikæden der er væsentlige for dens rapportering, og kun bede om dem. Får I et skema med hele bilag II, er det helt rimeligt at spørge, hvilke punkter kunden faktisk bruger.',
    },
    { type: 'h3', text: 'Loftet fjerner ikke behovet for data' },
    {
      type: 'paragraph',
      text: 'Klimadata er det, flest spørger efter, og meget af det ligger uden for loftet. Spørgsmålene om scope 3, reduktionsmål og klimarisici fortsætter.',
    },
    {
      type: 'paragraph',
      text: 'Dansk Erhverv har allerede peget på risikoen for, at loftet bliver omgået med særskilte kontraktkrav eller parallelle spørgeskemaer. Det bliver værd at holde øje med i 2027.',
    },

    { type: 'h2', text: '9. Hvad du gør nu' },
    {
      type: 'paragraph',
      text: 'Værdikædeloftet gælder fra regnskabsåret 2027. CSRD-virksomhederne skal bruge jeres data for 2027, når de rapporterer i 2028. Mange vil derfor begynde at spørge i løbet af 2027.',
    },
    {
      type: 'image',
      url: '/photos/qlim8-blog-vs-skrivebord.jpg',
      alt: 'Person ved et skrivebord med bærbar computer og papirer.',
      caption: 'Foto: Windows / Unsplash',
    },
    {
      type: 'ordered-list',
      items: [
        'Afklar jeres position. Har I over 1.000 ansatte og over 3.530 millioner kroner i omsætning, er I omfattet af CSRD. Er I uden CSRD-pligt og har op til 1.000 ansatte, er I en beskyttet virksomhed.',
        'Tæl jeres ansatte. Grænsen ved 10 ansatte afgør, hvor meget en CSRD-kunde kan kræve af jer.',
        'Byg basismodulet først. Energi og scope 1 og 2 kommer fra el-, varme- og brændstofregninger. Medarbejderdata, arbejdsmiljø og uddannelse ligger i lønsystemet og HR. Det meste findes allerede i bogholderiet.',
        'Spørg kunderne og banken. Find ud af, hvad jeres største kunder og jeres bank har brug for, før spørgeskemaet lander.',
        'Tag stilling til det udvidede modul. Spørger banken efter reduktionsmål og klimarisici, er C3 og C4 arbejdet værd. Har I flere end 10 ansatte, kan CSRD-kunder også kræve dele af C1, C5, C6 og C7.',
        'Overvej scope 3, hvis jeres branche kalder på det. Det gælder især produktion, fødevarer, byggeri og emballage.',
        'Dokumentér kilderne. Gem fakturaer, aflæsninger og de emissionsfaktorer, I bruger. Så kan tallene genbruges og forklares år efter år.',
        'Gør rapporten til jeres standardsvar. Når næste spørgeskema kommer, henviser I til VS-rapporten og svarer kun på det, der ligger ud over.',
      ],
    },

    { type: 'h2', text: 'Én standard, ét datasæt' },
    {
      type: 'paragraph',
      text: 'VSME startede som en anbefaling, som ingen var bundet af. Som VS er den blevet EU-ret med en klar grænse for, hvad store kunder kan kræve af de mindre.',
    },
    {
      type: 'paragraph',
      text: 'For en dansk SMV betyder det, at ESG-arbejdet kan gøres én gang. Kunden, banken og udbuddet kan få deres svar fra den samme rapport.',
    },
    { type: 'callout', text: 'Lav det én gang. Brug det overalt.' },
    {
      type: 'paragraph',
      text: 'Jeg hedder Mads Lund Nielsen. Civilingeniør i energisystemer, klimakoordinator i Nordfyns Kommune og stifter af qlim8. Lige nu skriver jeg bogen "ESG er nemt".',
    },
    {
      type: 'paragraph',
      text: 'qlim8 henter data direkte fra e-conomic, Dinero, Billy og Uniconta og laver en ESG-rapport efter EU\'s frivillige standard.',
    },
    {
      type: 'list',
      items: [
        'Ét datasæt til kunder, bank og udbud',
        'Revisionsspor bag hvert tal',
        'Basis eller Comprehensive, alt efter hvem der spørger',
      ],
    },
    {
      type: 'cta',
      heading: 'ESG er nemt',
      text: 'Skriv til mig på LinkedIn eller på mads@qlim8.com, eller book en demo, så viser jeg dig, hvordan qlim8 laver jeres VS-rapport ud fra bogholderiet.',
      buttonText: 'Book demo',
      buttonHref: '/kontakt?emne=demo',
    },

    { type: 'h3', text: 'Kilder' },
    {
      type: 'richtext',
      html:
        '<ul>' +
        '<li><a href="https://eur-lex.europa.eu/eli/reg_del/2026/1560">Delegeret forordning (EU) 2026/1560, EUR-Lex</a></li>' +
        '<li><a href="https://sustainablefutures.linklaters.com/post/102n88h/eu-csrd-commission-adopts-revised-esrs-and-voluntary-reporting-standard">Linklaters: Commission adopts revised ESRS and voluntary reporting standard</a></li>' +
        '<li><a href="https://www.ibr-ire.be/docs/default-source/nl/documents/actueel/nieuws/ec-da-vs-vs-efrag-vsme-en.pdf">IBR-IRE: Delegated Regulation on the Voluntary Standard vs. EFRAG VSME</a></li>' +
        '<li><a href="https://www.zevero.earth/blog/vsme-is-now-the-voluntary-standard-vs-what-changed">Zevero: VSME is now the Voluntary Standard</a></li>' +
        '<li><a href="https://www.deloitte.com/dk/en/services/audit-assurance/perspectives/lovforslag-om-forenkling-af-reglerne-om-baeredygtighedsrapportering.html">Deloitte: Lovforslag om forenkling af reglerne om bæredygtighedsrapportering</a></li>' +
        '<li><a href="https://www.danskerhverv.dk/presse-og-nyheder/nyheder/2026/juli/ny-frivillig-eu-standard-skal-gore-esg-rapportering-lettere-for-virksomheder/">Dansk Erhverv: Ny frivillig EU-standard skal gøre ESG-rapportering lettere</a></li>' +
        '<li><a href="https://erhvervsstyrelsen.dk/kommissionen-vedtager-forenklede-standarder-baeredygtighedsrapportering">Erhvervsstyrelsen: Kommissionen vedtager forenklede standarder</a></li>' +
        '<li><a href="https://www.danskindustri.dk/vi-radgiver-dig/virksomhedsregler-og-varktojer/esg/regulering/value-chain-cap/">Dansk Industri: Value chain cap</a></li>' +
        '</ul>',
    },
  ],
}
