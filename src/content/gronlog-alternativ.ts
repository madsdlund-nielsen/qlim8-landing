import type { Article } from './article'
import { FREE_START_CTA } from './cta'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'

export const artikel: Article = {
  slug: 'gronlog-alternativ',
  title: 'Grønlog alternativ: qlim8 og Grønlog sammenlignet',
  seoTitle: 'Grønlog alternativ: gratisplan, pris og qlim8 sammenlignet',
  description:
    'Grønlog eller qlim8? Begge har en gratis plan og forbinder til Dinero, e-conomic og Billy. Se forskellene på scope 3, VS-rapport, API og revisor.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'Grønlog og qlim8 har begge en gratis plan uden udløbsdato og forbinder begge til Dinero, e-conomic og Billy. Grønlog er det rigtige valg, hvis I vil have scope 3 og en fuld VS-rapport til en fast, offentlig månedspris på 590 kr., eller hvis I skal bruge en leverandørportal nu.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 er værd at undersøge først, hvis I også skal bruge VS Udvidet, dobbelt væsentlighedsanalyse, elforbrug fra Eloverblik, et åbent API eller gratis adgang for jeres revisor. Grønlog oplyser hverken Eloverblik, VS Udvidet, dobbelt væsentlighedsanalyse eller revisoradgang på sin hjemmeside, og Grønlogs API er under udvikling.',
    },

    { type: 'h2', text: 'Hvad er Grønlog, og hvem passer det til?' },
    {
      type: 'paragraph',
      text: 'Grønlog er et selvbetjent klimaværktøj, der beregner udledningen ud fra udgifterne i jeres regnskabssystem.',
    },
    {
      type: 'paragraph',
      text: 'Grønlog har fire planer: Gratis til 0 kr., Starter til 590 kr. om måneden, Professional til 1.490 kr. om måneden og Enterprise efter tilbud. Gratis-planen dækker scope 1 og 2 uden integrationer og viser kun VS-rapporten (VS hed tidligere VSME). Starter har scope 1, 2 og 3 og fuld adgang til VS-rapporten. Professional har en leverandørportal, og Enterprise har fuld CSRD/ESRS-overholdelse.',
    },
    { type: 'h3', text: 'Vælg Grønlog, hvis I ...' },
    {
      type: 'list',
      items: [
        'vil have scope 3 og en fuld VS-rapport til en fast, offentlig månedspris på 590 kr.',
        'skal bruge en leverandørportal nu. Grønlogs Professional-plan har en leverandørportal, mens qlim8\'s leverandørportal er planlagt. Hos qlim8 er værdikæden via CVR live.',
        'vil arbejde med scenarier for jeres udledning. Grønlog oplyser et scenarie- og målsætningsmodul.',
      ],
    },

    { type: 'h2', text: 'Hvad er forskellen på Grønlog og qlim8?' },
    {
      type: 'paragraph',
      text: 'De største forskelle mellem Grønlog og qlim8 er, hvad den gratis plan indeholder, om der er et åbent API, hvor elforbruget kommer fra, og hvor langt rapporteringen rækker.',
    },
    { type: 'h3', text: 'Hvad kan den gratis plan hos Grønlog og hos qlim8?' },
    {
      type: 'paragraph',
      text: 'Grønlogs gratis plan dækker scope 1 og 2 uden integrationer, mens qlim8\'s gratis pakke dækker scope 1, 2 og 3 med Eloverblik og ét regnskabsprogram. Hos Grønlog ligger scope 3 og fuld VS-rapport i de betalte planer. Begge gratis planer har ingen udløbsdato. Hvad Gratis-pakken ellers indeholder hos qlim8, står på /priser.',
    },
    { type: 'h3', text: 'Har Grønlog og qlim8 et åbent API?' },
    {
      type: 'richtext',
      html: '<p>Grønlogs API er under udvikling, og qlim8 har et REST API og en MCP-server med 31 værktøjer. MCP-serveren gør det muligt at koble en AI-assistent på jeres tal.</p>',
    },
    { type: 'h3', text: 'Hvor kommer elforbruget fra hos Grønlog og hos qlim8?' },
    {
      type: 'richtext',
      html: '<p>qlim8 henter elforbruget fra Eloverblik efter fuldmagt med MitID, og Grønlog oplyser ikke en Eloverblik-forbindelse på sin hjemmeside. Forbrugsdata fra Eloverblik hentes hver uge, time for time. Skal elforbruget i jeres klimaregnskab bygge på målerdata frem for regninger, er det en forskel, der tæller.</p>',
    },
    { type: 'h3', text: 'Hvor langt rækker rapporteringen hos Grønlog og hos qlim8?' },
    {
      type: 'richtext',
      html: '<p>qlim8 laver både VS Basis og VS Udvidet, og Grønlog oplyser ikke VS Udvidet på sin hjemmeside. qlim8 har desuden dobbelt væsentlighedsanalyse og ESRS-rapportering i appen og en gratis konto til jeres revisor. Grønlog oplyser hverken dobbelt væsentlighedsanalyse eller revisoradgang, og beskriver fuld CSRD/ESRS-overholdelse i sin Enterprise-plan.</p>',
    },
    { type: 'h3', text: 'Hvad har Grønlog og qlim8 til fælles?' },
    {
      type: 'paragraph',
      text: 'Grønlog og qlim8 forbinder begge til Dinero, e-conomic og Billy, og begge lader jer købe uden et salgsmøde. Begge viser, hvordan et tal er beregnet: Grønlog oplyser sporbar beregning med kildehenvisninger, og qlim8 har en audit trail med input, emissionsfaktor og kilde. Grønlog har et scenarie- og målsætningsmodul, og qlim8 har reduktionsmål, tiltag og overgangsplan. Grønlog oplyser primær hosting i Frankfurt, og qlim8 hoster i Tyskland.',
    },
    { type: 'h3', text: 'Hvad koster Grønlog sammenlignet med qlim8?' },
    {
      type: 'paragraph',
      text: 'Grønlogs betalte planer koster 590 kr. og 1.490 kr. om måneden, og qlim8 har en gratis pakke uden udløbsdato. [[Basis koster {pris:starter} om måneden, betalt årligt og ekskl. moms.]] Grønlog har en fast offentlig månedspris for scope 3 og fuld VS-rapport, og det er enklere at sammenligne end en pakkeoversigt. Pakkerne og priserne hos qlim8 står på /priser.',
    },
    {
      type: 'cta',
      heading: 'Se jeres egne tal, før I vælger',
      text: 'Begge har en gratis plan, så den hurtigste sammenligning er at prøve dem på jeres eget regnskab. Opret en gratis konto i qlim8, og forbind jeres regnskabsprogram.',
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Grønlog og qlim8 i en samlet sammenligning' },
    {
      type: 'richtext',
      html: '<p>Tabellen sætter Grønlog og qlim8 op mod fire andre danske programmer, og den viser, hvad hver leverandør selv oplyser på sin hjemmeside. Et felt, der står som ikke oplyst, betyder, at leverandøren ikke nævner funktionen, ikke at den mangler.</p>',
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'Kort om de andre programmer i tabellen' },
    { type: 'h3', text: 'qlim8' },
    { type: 'paragraph', text: KORT_OM.qlim8 },
    { type: 'paragraph', text: VAELG.qlim8 },
    { type: 'h3', text: 'Verarca' },
    { type: 'paragraph', text: KORT_OM.verarca },
    { type: 'paragraph', text: VAELG.verarca },
    { type: 'h3', text: 'EcoMetrics' },
    { type: 'paragraph', text: KORT_OM.ecometrics },
    { type: 'paragraph', text: VAELG.ecometrics },
    { type: 'h3', text: 'Wardn' },
    { type: 'paragraph', text: KORT_OM.wardn },
    { type: 'paragraph', text: VAELG.wardn },
    { type: 'h3', text: 'Valified' },
    { type: 'paragraph', text: KORT_OM.valified },
    { type: 'paragraph', text: VAELG.valified },

    { type: 'h2', text: 'Sådan skifter I fra Grønlog til qlim8' },
    {
      type: 'paragraph',
      text: 'Et skifte fra Grønlog består af at gemme jeres tal, forbinde det samme regnskabsprogram i qlim8 og fjerne Grønlogs adgang. De fleste trin er eksport og upload.',
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        '<li>Gem den seneste rapport og jeres tal fra Grønlog, så I har jeres basisår.</li>' +
        '<li>Opret en gratis konto i qlim8, og forbind det samme regnskabsprogram: Dinero, e-conomic eller Billy.</li>' +
        '<li>Upload de aktivitetsdata, I selv har tastet ind i Grønlog, til qlim8 som Excel eller CSV.</li>' +
        '<li>Giv qlim8 fuldmagt til Eloverblik med MitID, så elforbruget kommer med.</li>' +
        '<li>Fjern Grønlogs adgang til regnskabsprogrammet, når tallene i qlim8 stemmer med jeres basisår.</li>' +
        '</ol>',
    },
    {
      type: 'paragraph',
      text: 'Har I en betalt plan hos Grønlog, så tjek opsigelsesvilkårene i jeres aftale, før I fjerner adgangen. Lad gerne de to programmer køre side om side, til tallene stemmer.',
    },

    { type: 'h2', text: 'Spørgsmål om Grønlog' },
    { type: 'h3', text: 'Hvad koster Grønlog?' },
    {
      type: 'paragraph',
      text: 'Grønlog har en gratis plan til 0 kr., Starter til 590 kr. om måneden, Professional til 1.490 kr. om måneden og Enterprise efter tilbud.',
    },
    { type: 'h3', text: 'Har Grønlog en gratis plan?' },
    {
      type: 'paragraph',
      text: 'Ja, Grønlogs gratis plan dækker scope 1 og 2 uden integrationer og viser kun VS-rapporten. Scope 3 og fuld VS-rapport ligger i de betalte planer.',
    },
    { type: 'h3', text: 'Kan Grønlog lave en VS-rapport?' },
    {
      type: 'paragraph',
      text: 'Ja, fuld adgang til VS-rapporten er med i Grønlogs betalte planer, mens gratis-planen kun viser den. Grønlog oplyser ikke VS Udvidet på sin hjemmeside.',
    },
    { type: 'h3', text: 'Hvilke regnskabsprogrammer virker med Grønlog?' },
    {
      type: 'paragraph',
      text: 'Grønlog forbinder til Dinero, e-conomic og Billy. Grønlogs gratis plan har ingen integrationer.',
    },
    { type: 'h3', text: 'Har Grønlog et API?' },
    {
      type: 'paragraph',
      text: 'Grønlog skriver på sin hjemmeside, at API\'et er under udvikling. qlim8 har et REST API og en MCP-server med 31 værktøjer.',
    },
  ],
}
