import type { Article } from './article'

export const artikel: Article = {
  slug: 'klimaregnskab-smv-klienter-konsulentkonto',
  title: 'Klimaregnskab for SMV-klienter: det praktiske samlet i én konsulentkonto',
  seoTitle: 'Klimaregnskab til SMV-klienter: gratis konsulentkonto',
  description:
    'Gratis konsulentkonto til rådgivere: klimaregnskab, reduktionsmål, VS-rapport og leverandørdata for alle SMV-klienter samlet i én portefølje.',
  category: 'Compliance',
  publishedAt: '2026-10-29',
  readingTime: 9,
  sections: [
    {
      type: 'lead',
      text: 'Dine SMV-klienter får flere spørgsmål om klimadata. Med L193 skal banker vurdere ESG-risiko i kreditvurderingen, og klienten bliver bedt om udledninger, mål og politikker. Store kunder spørger også, fordi de skal rapportere om hele værdikæden.',
    },
    {
      type: 'paragraph',
      text: 'Efter Omnibus I gælder CSRD kun virksomheder med over 1.000 ansatte og over 450 mio. euro i omsætning. Det er cirka 220 danske virksomheder, og deres leverandører er ofte SMV\'er.',
    },
    {
      type: 'paragraph',
      text: 'Mange af dine timer går til at samle data i regneark. Fakturaer, elforbrug, lønsystem og leverandørsvar skal ligge samlet, før rådgivningen kan begynde. Rådgivningen er det, klienten betaler dig for.',
    },
    {
      type: 'paragraph',
      text: 'Artiklen gennemgår otte workflows fra klimaregnskab til VS (tidligere VSME) og viser, hvor qlim8 tager det praktiske. Konsulentkontoen er gratis. Den faglige vurdering er din.',
    },

    { type: 'h2', text: 'Hvordan laver man et klimaregnskab efter GHG-protokollen for en SMV?' },
    {
      type: 'paragraph',
      text: 'Et klimaregnskab efter GHG-protokollen opgør virksomhedens drivhusgasudledning i tre scopes. Scope 1 er direkte udledning, scope 2 er købt energi opgjort location-based og market-based, og scope 3 er værdikæden i 15 kategorier. For en SMV bygger opgørelsen typisk på bogføring, elforbrug og brændstof, omregnet med emissionsfaktorer.',
    },
    {
      type: 'paragraph',
      text: 'Klienten inviterer dig ind fra sin qlim8-konto, og du ser regnskabet på postniveau. Udledningen er beregnet med danske emissionsfaktorer, og scope 3 med spend-baserede faktorer ud fra klientens fakturaer, hvor der ikke findes mængdedata. AI har kategoriseret fakturaerne, og du kan omkategorisere en post med en begrundelse. Ændringen fremgår af postens historik sammen med kildeposteringen og faktoren.',
    },
    {
      type: 'paragraph',
      text: 'Scope 1 og 2 vises i detaljer i alle pakker, og scope 3 vises på kategorier fra Basis. Fra Udvidet viser analysen, hvilke kategorier og leverandører der fylder mest, og hvordan udledningen udvikler sig fra år til år. Dine kommentarer til klienten ligger på de poster, de handler om.',
    },
    {
      type: 'paragraph',
      text: 'VS stiller ikke et generelt krav om scope 3. Standarden nævner, at det kan være relevant i produktion, landbrug og fødevarer, byggeri og ejendom samt emballage.',
    },

    { type: 'h2', text: 'Hvordan indsamler man data til en kundes klimaregnskab?' },
    {
      type: 'paragraph',
      text: 'Data til et klimaregnskab kommer fra bogføring, elforbrug, lønsystem og mængdedata som brændstof. Fakturaer giver spend-baserede tal til scope 3, og målerdata giver forbrug til scope 2. Mængdedata giver mere præcise tal end beløb, så de er værd at hente ind der, hvor udledningen er størst.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 henter data automatisk fra klientens bogføring, blandt andet fra e-conomic, Dinero, Billy, Uniconta og Dynamics 365 Business Central. Elforbrug hentes fra Eloverblik. Fra Basis kan lønsystemdata kobles på. Data uden for systemerne, for eksempel brændstofmængder, kommer ind via Excel/CSV-upload eller manuel registrering.',
    },
    {
      type: 'paragraph',
      text: 'Ved tilkobling af bogføringen hentes den seneste hele måned plus den indeværende måned. Et helt års historik kan tilkøbes, så klienten har et basisår at sætte mål ud fra.',
    },

    { type: 'h2', text: 'Hvordan sætter man reduktionsmål for en SMV?' },
    {
      type: 'paragraph',
      text: 'Et reduktionsmål forudsætter et basisår med opgjort udledning, kategoriserede poster og en afgrænsning af, hvilke scopes og kategorier målet omfatter. Målet kan sættes pr. kategori, pr. scope eller som intensitet, altså udledning i forhold til aktivitet. Fremdriften følges derefter år for år.',
    },
    { type: 'paragraph', text: 'qlim8 har mål på tre niveauer:' },
    {
      type: 'list',
      items: [
        'Basis: reduktionsmål på kategorier i scope 1 og 2.',
        'Udvidet: reduktionsmål på hele scopes. Målene indgår i C3 (reduktionsmål og klimaomstilling) i VS Comprehensive-rapporten.',
        'Komplet: intensitetsmål med forklaring af årets ændring, business-as-usual-linje og planlinje mod målet samt scope 3-mål på kategorier med fysiske data (mængder).',
      ],
    },
    {
      type: 'paragraph',
      text: 'Du kan foreslå mål i klientens konto, og klienten godkender dem. For hvert mål viser qlim8 årene fra basisåret med udledning, den lineære sti og afstanden til stien. Status er foran, på sporet, bagud, nået eller misset.',
    },
    {
      type: 'paragraph',
      text: 'Afviger det genberegnede basisår mere end 5 % fra det tal, målet blev sat ud fra, markeres det ved målet. Så kan du tage stilling til, om målet skal genberegnes.',
    },

    { type: 'h2', text: 'Hvordan laver man en klimahandlingsplan eller overgangsplan med tiltag?' },
    {
      type: 'paragraph',
      text: 'En klimahandlingsplan samler de tiltag, der skal bringe virksomheden mod sine reduktionsmål. Hvert tiltag beskrives typisk med kategori, scope, effekt, tidsramme og økonomi. Overgangsplanen er den samlede oversigt over tiltagene og deres bidrag til målene. I VS Comprehensive hører den under C3.',
    },
    {
      type: 'paragraph',
      text: 'Tiltag findes i qlim8 fra Udvidet. Et tiltag angives med kategori, scope og effekttype: mindre forbrug eller lavere emissionsfaktor. Dertil kommer effekt i procent, start- og slutår, engangsinvestering i kr. og ændring i årlig driftsudgift. Fra Komplet kan effekten indfases over flere år.',
    },
    {
      type: 'paragraph',
      text: 'Du og klienten angiver selv effekten, så de faglige antagelser er jeres. Du foreslår tiltag direkte i appen, og klienten godkender forslaget, før det bliver et tiltag. Hvert tiltag kobles til de mål, det bidrager til.',
    },
    {
      type: 'paragraph',
      text: 'Tiltagene kan samles i pakker. For virksomheder i brancher med stor klimapåvirkning samler qlim8 dem også i en overgangsplan.',
    },

    { type: 'h2', text: 'Hvilke politikker skal en virksomhed have til en VS-rapport (VSME)?' },
    {
      type: 'paragraph',
      text: 'VS er frivillig at bruge og kræver hverken dobbelt væsentlighedsanalyse eller revision. Basismodulet beder i B2 om praksis, politikker og initiativer for omstillingen. Det udvidede modul uddyber det i C2 og beder i C6 om politikker og processer for menneskerettigheder.',
    },
    {
      type: 'paragraph',
      text: 'Basismodulet har B1 til B11, og det udvidede modul har C1 til C9. Ud over politikkerne beder det udvidede modul om reduktionsmål og klimaomstilling i C3 og om klimarisici i C4.',
    },
    {
      type: 'paragraph',
      text: 'I qlim8 udfyldes politikkerne som datapunkter i VS-rapporten: B2 med et flueben pr. emne, C2 som fritekst og C6 med ja eller nej og de emner, politikken dækker. Du kan udfylde dem sammen med klienten.',
    },
    {
      type: 'paragraph',
      text: 'VS Basis-rapporten findes fra Basis-pakken og VS Comprehensive fra Udvidet. Du kan udarbejde rapportudkast, og klienten godkender udkastet, før det bliver en version. En ny rapport for samme år bliver en ny version.',
    },
    {
      type: 'paragraph',
      text: 'Rapporterne leveres som PDF eller Excel. Udvidet giver også en professionel ESG-rapport som PDF. Komplet har en dobbelt væsentlighedsanalyse med påvirkning og finansiel risiko pr. emne. qlim8 laver ikke CSRD/ESRS-rapporter.',
    },

    { type: 'h2', text: 'Hvordan tjekker man leverandørernes klimadata i leverandørkæden?' },
    {
      type: 'paragraph',
      text: 'Store virksomheder med CSRD-pligt rapporterer om værdikæden og spørger derfor deres SMV-leverandører. Fra regnskabsår, der starter 1. januar 2027, må de højst kræve de oplysninger, som VS fastlægger, af leverandører uden CSRD-pligt og med op til 1.000 ansatte. Det er værdikædeloftet.',
    },
    {
      type: 'paragraph',
      text: 'Loftet har fem afgrænsninger, du kan sortere en kundes spørgeskema efter:',
    },
    {
      type: 'list',
      items: [
        'Kun visse datapunkter i forordningens bilag II ligger inden for loftet.',
        'Virksomheder med 10 ansatte eller færre er bedst beskyttet.',
        'Uden for loftet ligger blandt andet C3 (reduktionsmål), C4 (klimarisici) og alle sektorspecifikke oplysninger, herunder scope 3.',
        'Loftet gælder kun forespørgsler til CSRD-rapportering. Spørgsmål fra banker, i udbud eller efter andre regler som CSDDD ligger uden for.',
        'Kunden skal markere, hvad der ligger over loftet.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Klienter på Koncern kan samle hele værdikæden via CVR og invitere leverandørerne til at dele deres klimadata. Hver leverandørforbindelse har en status, fra inviteret til aktiv. Dækningsgraden viser, hvor stor en andel af handlen med de tilknyttede leverandører der er dækket af aktive klimadata. Eksponeringen sorterer leverandørerne efter købsbeløb, så I kan prioritere, hvem der skal spørges først. Som konsulent ser du værdikæden, og klienten inviterer leverandørerne.',
    },
    {
      type: 'paragraph',
      text: 'Fra Udvidet viser analysen, hvilke leverandører der fylder i scope 3. Leverandørers produktspecifikke klimadata (PCF/EPD) kan uploades: 3 dokumenter i Basis, 5 i Udvidet, 20 i Komplet og ubegrænset i Koncern.',
    },

    { type: 'h2', text: 'Hvordan håndterer man mange klienters klimaregnskaber på én gang?' },
    {
      type: 'paragraph',
      text: 'I qlim8 ligger alle dine klienter i én portefølje under din konsulentkonto. Du skifter mellem klienter, og hvert skift logges. Klienten styrer adgangen og kan tidsbegrænse den.',
    },
    {
      type: 'paragraph',
      text: 'Klienten inviterer dig ind fra sin egen qlim8-konto. Klienter på Basis kan invitere én ekstern rådgiver (revisor eller konsulent), og fra Udvidet er der ingen grænse.',
    },
    {
      type: 'paragraph',
      text: 'Du kan omkategorisere poster, kommentere, foreslå mål og tiltag og udarbejde rapportudkast. Du ser ikke klientens fakturering, integrationsnøgler eller team-opsætning.',
    },
    {
      type: 'paragraph',
      text: 'Fordi data hentes automatisk, er klientens tal opdateret løbende. Opfølgning gennem året kræver ingen ny dataindsamling.',
    },

    { type: 'h2', text: 'Hvad koster det, og hvordan kommer man i gang?' },
    {
      type: 'paragraph',
      text: 'Konsulentkontoen i qlim8 er gratis. Klientens pakke afgør, hvilke funktioner du har adgang til, og rådgiveradgang kræver Basis eller højere. Du opretter kontoen under Rådgivere på qlim8.com/priser, og klienten inviterer dig ind fra sin konto.',
    },
    { type: 'paragraph', text: 'Pakkerne set fra konsulentens side:' },
    {
      type: 'list',
      items: [
        'Basis: scope 3 på kategorier, VS Basis-rapport, lønsystemdata, mål på kategorier i scope 1 og 2, 3 PCF/EPD-dokumenter og én ekstern rådgiver.',
        'Udvidet: VS Comprehensive-rapport, professionel ESG-rapport som PDF, mål på hele scopes, tiltag og tiltagspakker, analyse af kategorier og leverandører, 5 PCF/EPD-dokumenter og ingen grænse for rådgivere.',
        'Komplet: intensitetsmål, business-as-usual-linje og planlinje, indfasning af tiltag, scope 3-mål med fysiske data, dobbelt væsentlighedsanalyse og 20 PCF/EPD-dokumenter.',
        'Koncern: hele værdikæden via CVR med dækningsgrad og eksponering, et års historik inkluderet og ubegrænset PCF/EPD-upload.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Basis og Udvidet køber klienten selv. Komplet og Koncern bookes som demo på qlim8.com.',
    },

    { type: 'h2', text: 'Ofte stillede spørgsmål' },
    { type: 'h3', text: 'Er VS (VSME) en pligt for SMV\'er?' },
    {
      type: 'paragraph',
      text: 'Nej. VS er frivillig at bruge. Den er EU-forordning (EU) 2026/1560 og har været i kraft siden 24. september 2026.',
    },
    { type: 'h3', text: 'Skal en SMV have scope 3 med i VS?' },
    {
      type: 'paragraph',
      text: 'Scope 3 er ikke et generelt krav i VS. Standarden nævner, at det kan være relevant i produktion, landbrug og fødevarer, byggeri og ejendom samt emballage.',
    },
    { type: 'h3', text: 'Hvad er forskellen på VS Basis og VS Comprehensive?' },
    {
      type: 'paragraph',
      text: 'Basismodulet har datapunkterne B1 til B11. Comprehensive lægger C1 til C9 ovenpå, blandt andet reduktionsmål, klimarisici og menneskerettigheder. qlim8 har VS Basis fra Basis-pakken og VS Comprehensive fra Udvidet.',
    },
    { type: 'h3', text: 'Gælder værdikædeloftet også bankens spørgsmål?' },
    {
      type: 'paragraph',
      text: 'Nej. Loftet gælder kun forespørgsler til CSRD-rapportering. Spørgsmål fra banker, i udbud eller efter andre regler som CSDDD ligger uden for.',
    },
    { type: 'h3', text: 'Hvad kan en konsulent se og ændre i klientens qlim8-konto?' },
    {
      type: 'paragraph',
      text: 'Konsulenten kan omkategorisere poster, kommentere, foreslå mål og tiltag og udarbejde rapportudkast. Forslag og rapportudkast godkendes af klienten. Klientens fakturering, integrationsnøgler og team-opsætning er skjult. Klienten kan tidsbegrænse adgangen.',
    },

    { type: 'h2', text: 'Fra regneark til rådgivning' },
    {
      type: 'paragraph',
      text: 'Datahentning, kategorisering, mål, tiltag, rapportudkast og leverandørdata ligger samlet i klientens qlim8-konto. Du arbejder i én portefølje med alle dine klienter og følger deres tal løbende gennem året. Timerne fra regnearket går til rådgivningen.',
    },
    {
      type: 'paragraph',
      text: 'Jeg hedder Mads Dahlén Lund-Nielsen. Civilingeniør i energisystemer, klimakoordinator i Nordfyns Kommune og stifter af qlim8. Lige nu skriver jeg bogen "ESG er nemt".',
    },
    {
      type: 'cta',
      heading: 'ESG er nemt',
      text: 'Konsulentkontoen giver dig én portefølje med dine klienters klimaregnskaber, adgang styret af klienten og rapportudkast i VS-formatet. Kontoen er gratis. Skriv til mig på LinkedIn eller på mads@qlim8.com, hvis du har spørgsmål.',
      buttonText: 'Opret gratis konsulentkonto',
      buttonHref: '/priser#raadgivere',
    },
  ],
}
