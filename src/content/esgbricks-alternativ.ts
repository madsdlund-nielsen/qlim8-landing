import type { Article } from './article'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'
import { DEMO_HREF, DEMO_LABEL } from './cta'

export const artikel: Article = {
  slug: 'esgbricks-alternativ',
  title: 'esgBRICKS alternativ: qlim8 og esgBRICKS sammenlignet',
  seoTitle: 'ESG Bricks alternativ: pris, service og qlim8 sammenlignet',
  description:
    'esgBRICKS eller qlim8? esgBRICKS laver VS-rapporten for jer til 14.999 kr. om året ekskl. moms. qlim8 er software med en gratis pakke. Se forskellen.',
  category: 'Sammenligning',
  publishedAt: '2026-11-24',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'esgBRICKS er en dansk ESG-service, hvor en fast kontaktperson indsamler jeres data, beregner klimaregnskabet for scope 1, 2 og 3 og udarbejder den årlige VS-rapport for 14.999 kr. om året ekskl. moms. qlim8 er software: klimaregnskabet beregnes løbende fra jeres bogføring og elforbrug, og I laver selv rapporten, med en gratis pakke uden udløbsdato. Vil I købe arbejdet gjort, er esgBRICKS et godt valg, og vil I selv have tallene hele året, er qlim8 værd at undersøge først.',
    },

    { type: 'h2', text: 'Hvad er esgBRICKS, og hvem passer servicen til?' },
    {
      type: 'paragraph',
      text: 'esgBRICKS sælger først og fremmest en service: esgBRICKS indsamler og strukturerer jeres ESG-data, laver beregningerne og udarbejder den færdige ESG-rapport efter VS-standarden i sin egen platform. VS hed tidligere VSME, og esgBRICKS skriver selv begge navne.',
    },
    {
      type: 'paragraph',
      text: 'esgBRICKS, som mange søger efter som ESG Bricks, er udviklet af det danske firma Capana. Den komplette ESG-service koster 14.999 kr. om året ekskl. moms for én virksomhed med ét CVR-nummer. Prisen dækker ESG-rapporten efter VS, et klimaregnskab for scope 1, 2 og 3, en fast kontaktperson, sparring og en årlig opdatering af rapporten.',
    },
    {
      type: 'paragraph',
      text: 'Forløbet har fire trin: opstartsmøde, dataindsamling og udarbejdelse, præsentation af den færdige rapport og årlig opdatering. Har I flere selskaber eller CVR-numre, eller et særligt behov for scope 3-data, kan servicen udvides efter aftale. esgBRICKS skriver, at I kun betaler, hvis I er tilfredse med rapporten.',
    },
    {
      type: 'paragraph',
      text: 'esgBRICKS sælger først og fremmest en service og oplyser ingen pris for adgang til platformen alene. esgBRICKS skriver, at I ejer alle jeres egne data, og at data opbevares inden for EU.',
    },
    {
      type: 'paragraph',
      text: 'esgBRICKS tilbyder også at beregne klimaaftrykket af jeres produkter som en service. Den årlige PCF-service har en grundpris på 14.999 kr. ekskl. moms, og beregningerne af de enkelte produkter prissættes særskilt efter antal og kompleksitet.',
    },
    {
      type: 'richtext',
      html:
        '<ul>' +
        '<li>Vælg esgBRICKS, hvis I hverken har tid eller folk til selv at lave ESG-rapporten og hellere vil betale en fast årspris for, at en anden gør det.</li>' +
        '<li>Vælg esgBRICKS, hvis I skal have beregnet klimaaftrykket af de produkter, I sælger, og vil have en leverandør til at udføre beregningerne.</li>' +
        '<li>Vælg esgBRICKS, hvis I vil have en fast kontaktperson, der præsenterer den færdige rapport for jer hvert år.</li>' +
        '</ul>',
    },

    { type: 'h2', text: 'Hvad er forskellen på esgBRICKS og qlim8?' },
    {
      type: 'paragraph',
      text: 'esgBRICKS sælger arbejdet, og qlim8 sælger værktøjet: hos esgBRICKS laver en kontaktperson rapporten, og i qlim8 beregnes klimaregnskabet fra jeres bogføring, så I selv kan lave rapporten.',
    },

    { type: 'h3', text: 'Hvem gør arbejdet' },
    {
      type: 'paragraph',
      text: "Hos esgBRICKS gør en fast kontaktperson arbejdet: dataindsamling, beregninger, udarbejdelse af rapporten og præsentation af den. I qlim8 arbejder virksomheden selv i programmet, og qlim8 har ingen indbygget konsulentydelse. Hjælpen kommer fra jeres egen revisor eller rådgiver, som får en gratis Revisor- eller Konsulent-konto. Har ingen hos jer tid til at arbejde med tallene, er esgBRICKS' model den letteste.",
    },

    { type: 'h3', text: 'Hvor tallene kommer fra' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 henter fakturaerne fra e-conomic, Dinero og Billy og elforbruget time for time fra Eloverblik, og data uden for bogføringen kommer ind som Excel eller CSV. ' +
        'esgBRICKS oplyser ikke på sin hjemmeside, hvilke regnskabssystemer platformen henter fra, og nævner ikke Eloverblik. Hos esgBRICKS indsamles data i servicens dataindsamlingstrin.</p>',
    },

    { type: 'h3', text: 'Sporbarhed og revisor' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 har audit trail på hver beregning med input, emissionsfaktor og kilde, og jeres revisor kan få direkte adgang. ' +
        "esgBRICKS oplyser ikke et audit trail eller en adgang for revisor på sin hjemmeside, men skriver, at platformen gemmer strukturen og datagrundlaget fra tidligere rapporteringsperioder.</p>",
    },

    { type: 'h3', text: 'Rapporterne' },
    {
      type: 'richtext',
      html:
        '<p>I qlim8 laver I selv VS Basis og VS Udvidet, ESRS-rapportering og en dobbelt væsentlighedsanalyse ovenpå de samme tal. ' +
        "esgBRICKS udarbejder én samlet ESG-rapport efter VS-standarden om året, og esgBRICKS' eksempelrapport viser også oplysninger fra standardens udvidede modul. esgBRICKS oplyser ikke ESRS-rapportering eller dobbelt væsentlighedsanalyse som en del af servicen.</p>",
    },

    { type: 'h3', text: "Produkter og leverandører: esgBRICKS' fordel" },
    {
      type: 'paragraph',
      text: 'esgBRICKS har en PCF-service, der beregner klimaaftrykket af jeres produkter, og et leverandørmodul, som esgBRICKS bruger i ESG-servicen. I qlim8 kan I uploade PCF- og EPD-dokumenter fra jeres leverandører, og hele værdikæden hentes via CVR-numre. En egentlig leverandørportal er planlagt i qlim8, men ikke færdig. Vil I have en anden til at beregne klimaaftrykket af jeres produkter, er esgBRICKS det rigtige sted at spørge.',
    },

    { type: 'h3', text: 'Pris og betaling' },
    {
      type: 'richtext',
      html:
        '<p>esgBRICKS koster 14.999 kr. om året ekskl. moms for én virksomhed med ét CVR-nummer, og esgBRICKS skriver, at I kun betaler, hvis I er tilfredse med rapporten. qlim8 har en gratis pakke uden udløbsdato, som dækker scope 1, 2 og 3 med Eloverblik og ét regnskabsprogram. ' +
        '[[Basis koster {pris:starter} om måneden, betalt årligt og ekskl. moms.]] ' +
        'Hvad en konsulent, et regneark og software koster hver for sig, står i artiklen om hvad et klimaregnskab koster.</p>',
    },

    { type: 'h2', text: 'Hvornår er esgBRICKS det rigtige valg, og hvornår er qlim8?' },
    {
      type: 'paragraph',
      text: 'Det er bedre at købe arbejdet, når rapporten er en årlig pligt over for banken eller en kunde, og ingen hos jer har tid eller lyst til at lære standarden. Det gælder også, hvis I vil have en fast kontaktperson og en fast årspris, eller skal have beregnet klimaaftrykket af produkter. I de tilfælde er esgBRICKS et godt valg.',
    },
    {
      type: 'paragraph',
      text: 'Det er bedre at have et værktøj, når tallene skal bruges løbende i året, når flere rapporter skal laves fra de samme tal, eller når jeres egen revisor eller rådgiver allerede kender jer. I de tilfælde er qlim8 det rigtige valg, især hvis jeres bogføring ligger i e-conomic, Dinero eller Billy, og I vil se klimaregnskabet blive til fra jeres egne fakturaer. Begge dele kan være rigtige. Det afgørende er, om I vil købe arbejdet eller have tallene selv.',
    },

    {
      type: 'cta',
      heading: 'Vil I se, hvor meget qlim8 gør af sig selv?',
      text: 'Book en demo, så viser vi, hvordan klimaregnskabet bygges fra jeres bogføring, og hvad der er tilbage til jer og jeres rådgiver. I kan også ringe på +45 93 90 13 84.',
      buttonText: DEMO_LABEL,
      buttonHref: DEMO_HREF,
    },

    { type: 'h2', text: 'Hvordan ser esgBRICKS ud ved siden af de andre danske programmer?' },
    {
      type: 'richtext',
      html:
        '<p>Tabellen sammenligner esgBRICKS med qlim8 og seks andre danske programmer. esgBRICKS er en service, så flere felter handler om, hvad servicen leverer, ikke om funktioner, I selv bruger. Hvor en leverandør ikke oplyser noget på sin hjemmeside, står der Ikke oplyst, og det er ikke det samme som nej.</p>',
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'De andre leverandører kort' },
    { type: 'h3', text: 'qlim8' },
    { type: 'paragraph', text: KORT_OM.qlim8 },
    { type: 'paragraph', text: VAELG.qlim8 },
    { type: 'h3', text: 'Verarca' },
    { type: 'paragraph', text: KORT_OM.verarca },
    { type: 'paragraph', text: VAELG.verarca },
    { type: 'h3', text: 'Grønlog' },
    { type: 'paragraph', text: KORT_OM.gronlog },
    { type: 'paragraph', text: VAELG.gronlog },
    { type: 'h3', text: 'EcoMetrics' },
    { type: 'paragraph', text: KORT_OM.ecometrics },
    { type: 'paragraph', text: VAELG.ecometrics },
    { type: 'h3', text: 'Wardn' },
    { type: 'paragraph', text: KORT_OM.wardn },
    { type: 'paragraph', text: VAELG.wardn },
    { type: 'h3', text: 'Valified' },
    { type: 'paragraph', text: KORT_OM.valified },
    { type: 'paragraph', text: VAELG.valified },
    { type: 'h3', text: 'E-SG.cloud' },
    { type: 'paragraph', text: KORT_OM.esgcloud },
    { type: 'paragraph', text: VAELG.esgcloud },

    { type: 'h2', text: 'Sådan skifter I fra esgBRICKS til qlim8' },
    {
      type: 'paragraph',
      text: 'Fra esgBRICKS flytter I rapporten og basisårets tal, og klimaregnskabet beregnes igen fra jeres egne bilag. De fleste trin er eksport og upload.',
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        "<li>Gem den seneste ESG-rapport og tallene for jeres basisår. esgBRICKS skriver, at I ejer alle jeres egne data, så bed jeres kontaktperson om datagrundlaget for de år, rapporten dækker.</li>" +
        '<li>Opret en gratis konto i qlim8, og forbind e-conomic, Dinero eller Billy.</li>' +
        '<li>Giv qlim8 fuldmagt til Eloverblik med MitID.</li>' +
        '<li>Registrér det, der ikke står i bogføringen, for eksempel brændstof i liter, manuelt eller som Excel eller CSV.</li>' +
        "<li>Sammenlign totalerne for samme år med tallene i esgBRICKS' rapport, og sæt reduktionsmål ud fra basisåret.</li>" +
        '<li>esgBRICKS oplyser ingen bindingsperiode eller opsigelsesfrist på sin hjemmeside, så tjek jeres egen aftale, før I skifter.</li>' +
        '</ol>',
    },

    { type: 'h2', text: 'Ofte stillede spørgsmål om esgBRICKS' },
    { type: 'h3', text: 'Hvad koster esgBRICKS?' },
    {
      type: 'paragraph',
      text: "esgBRICKS' komplette ESG-service koster 14.999 kr. om året ekskl. moms for én virksomhed med ét CVR-nummer.",
    },
    { type: 'h3', text: 'Er ESG Bricks og esgBRICKS det samme?' },
    {
      type: 'paragraph',
      text: 'Ja, ESG Bricks er den måde, mange skriver esgBRICKS på, og esgBRICKS er udviklet af det danske firma Capana.',
    },
    { type: 'h3', text: 'Er esgBRICKS et program eller en service?' },
    {
      type: 'paragraph',
      text: 'esgBRICKS sælger først og fremmest en service og oplyser ingen pris for adgang til platformen alene.',
    },
    { type: 'h3', text: 'Kan esgBRICKS hente data fra e-conomic?' },
    {
      type: 'paragraph',
      text: 'esgBRICKS oplyser ikke på sin hjemmeside, hvilke regnskabssystemer platformen henter data fra.',
    },
    { type: 'h3', text: 'Kan esgBRICKS beregne klimaaftrykket af et produkt?' },
    {
      type: 'paragraph',
      text: 'Ja, esgBRICKS har en PCF-service med en årlig grundpris på 14.999 kr. ekskl. moms, hvor de enkelte produktberegninger prissættes særskilt.',
    },
    { type: 'h3', text: 'Hvad er forskellen på esgBRICKS og qlim8?' },
    {
      type: 'paragraph',
      text: 'esgBRICKS laver VS-rapporten for jer som en service, mens qlim8 er software, der beregner klimaregnskabet fra bogføringen og elforbruget, med en gratis pakke uden udløbsdato.',
    },
  ],
}
