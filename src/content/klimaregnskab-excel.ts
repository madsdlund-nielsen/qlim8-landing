import type { Article } from './article'
import { FREE_START_CTA } from './cta'

export const artikel: Article = {
  slug: 'klimaregnskab-excel',
  title: 'Klimaregnskab i Excel: sådan laver I et CO2-regnskab i et regneark',
  seoTitle: 'Klimaregnskab i Excel: skabelon, faktorer og når det er nok',
  description:
    'Sådan laver I klimaregnskab i Excel: kolonnerne i regnearket, hvor emissionsfaktorer og EFRAG\'s VS-skabelon findes, og hvornår Excel ikke længere er nok.',
  category: 'Sammenligning',
  publishedAt: '2026-11-24',
  readingTime: 7,
  sections: [
    {
      type: 'lead',
      text: `Et klimaregnskab kan godt laves i Excel, og for en lille virksomhed med en enkel forretning er det ofte nok. Regnearket skal have én linje pr. aktivitet med dato, mængde, enhed, emissionsfaktor og kilde, og de officielle byggesten er gratis at hente: Energistyrelsens emissionsfaktorer, Energinets deklarationer for el og EFRAG's Excel-skabelon til VS-rapporten. Excel bliver tungt, når bilagene bliver mange, når faktorerne skal opdateres, og når banken eller revisor spørger, hvor et tal kommer fra.`,
    },

    { type: 'h2', text: 'Hvornår er Excel nok til et klimaregnskab?' },
    {
      type: 'paragraph',
      text: `Excel er nok, når virksomheden er lille, forretningen enkel, og klimaregnskabet kun skal vises frem en gang om året.`,
    },
    {
      type: 'richtext',
      html: `<p>I artiklen om hvad et klimaregnskab koster skønner vi, at det første komplette klimaregnskab i Excel tager 3 til 6 ugers internt arbejde for en mellemstor SMV. Samme artikel skønner, at Excel passer bedst til en mikrovirksomhed med 1 til 5 ansatte, til en ejer, der vil forstå beregningen fra bunden, eller som læringsprojekt, og at Excel ellers typisk er dyrere, end det ser ud.</p>`,
    },
    {
      type: 'list',
      items: [
        `Vælg Excel, hvis I har få energikilder og få bilag, for eksempel el, varme og et par køretøjer.`,
        `Vælg Excel, hvis I kun skal vise banken tallene en gang om året.`,
        `Vælg Excel, hvis I vil forstå beregningen fra bunden, før I vælger et program.`,
      ],
    },

    { type: 'h2', text: 'Hvad skal regnearket indeholde?' },
    {
      type: 'paragraph',
      text: `Et regneark til klimaregnskab skal have én linje pr. aktivitet, så hvert tal kan følges fra bilaget til resultatet.`,
    },
    {
      type: 'richtext',
      html:
        '<table>' +
        '<thead><tr><th>Kolonne</th><th>Hvad der står i den</th><th>Eksempel</th></tr></thead>' +
        '<tbody>' +
        '<tr><td>Dato eller periode</td><td>Hvornår aktiviteten fandt sted</td><td>marts 2026</td></tr>' +
        '<tr><td>Beskrivelse og bilag</td><td>Hvad det er, og hvilket bilag det kommer fra</td><td>Diesel, faktura 1043</td></tr>' +
        '<tr><td>Kategori</td><td>Brændsel, el, varme, transport, indkøb eller affald</td><td>Brændsel</td></tr>' +
        '<tr><td>Scope</td><td>1, 2 eller 3</td><td>1</td></tr>' +
        '<tr><td>Mængde og enhed</td><td>Den fysiske mængde, hvor I har den, ellers beløbet</td><td>385 liter</td></tr>' +
        '<tr><td>Emissionsfaktor</td><td>Udledning pr. enhed</td><td>kg CO2e pr. liter</td></tr>' +
        '<tr><td>Faktorens kilde og år</td><td>Hvem faktoren kommer fra, og hvilket år den gælder</td><td>Det officielle faktorark, 2024</td></tr>' +
        '<tr><td>Resultat</td><td>Mængde gange faktor</td><td>kg eller ton CO2e</td></tr>' +
        '</tbody>' +
        '</table>',
    },
    {
      type: 'paragraph',
      text: `Elforbrug skal stå i to kolonner, en lokationsbaseret og en markedsbaseret. Lokationsbaseret beregnes med Energinets miljødeklaration og markedsbaseret med eldeklarationen, og Klimakompassets vejledning beder også om begge.`,
    },
    {
      type: 'paragraph',
      text: `Brug kalenderåret som periode, fordi emissionsfaktorerne følger kalenderåret.`,
    },
    {
      type: 'paragraph',
      text: `Hold enheden ordentlig, fordi Energistyrelsens faktorark viser udledningerne i kg CO2e, mens resultater ofte vises i ton CO2e.`,
    },
    {
      type: 'paragraph',
      text: `Lav gerne én fane pr. scope og én fane med alle linjer, så totalerne altid kommer fra de samme linjer. Skriv ikke en faktor ind efter hukommelsen: hver faktor skal kunne slås op i en officiel kilde.`,
    },

    { type: 'h2', text: 'Hvor finder I skabelonen og emissionsfaktorerne?' },
    {
      type: 'paragraph',
      text: `De officielle byggesten til et klimaregnskab i Excel findes hos Energistyrelsen, Energinet og EFRAG.`,
    },
    { type: 'h3', text: 'Emissionsfaktorer: Energistyrelsens faktorark' },
    {
      type: 'richtext',
      html: `<p>Energistyrelsen udgiver et Excel-ark med emissionsfaktorerne bag Klimakompasset, med en fane pr. år og kolonner for kategori, enhed, udledning fordelt på scope 1, 2 og 3, kilde og land. Arket på Energistyrelsens side er fra november 2024, mens Klimakompasset skriver, at faktorerne senest blev opdateret i november 2025. Tjek derfor datoen, før I bruger arket.</p>`,
    },
    { type: 'h3', text: 'El: Energinets deklarationer' },
    {
      type: 'richtext',
      html: `<p>Energinet udgiver miljødeklarationen, den lokationsbaserede, som et regneark med årsgennemsnit, med en foreløbig udgave i januar og den endelige i juni året efter. Eldeklarationen, den markedsbaserede, udgives hvert år i juni for året før, og jeres elleverandør har sin egen deklaration.</p>`,
    },
    { type: 'h3', text: 'VS-rapporten: EFRAG\'s Excel-skabelon' },
    {
      type: 'richtext',
      html: `<p>EFRAG udgiver en Excel-skabelon til den frivillige standard VS (tidligere VSME), kaldet VS Digital Template. Version 2.0.0 udkom 4. november 2026, og skabelonen kan hentes uden at oprette en konto.</p>`,
    },
    {
      type: 'paragraph',
      text: `Skabelonen viser, hvilke oplysninger der kræves, regner totaler ud, har en omregner fra brændstof til MWh og har dansk som sprogvalg. EFRAG har lavet og testet den i Excel 365 og skriver, at funktionerne kan være begrænsede eller forkerte i andre regnearksprogrammer og ældre Excel-versioner. EFRAG skriver også, at ældre versioner af skabelonen ikke skal bruges, og tilbyder et gratis værktøj, der omsætter skabelonen til XBRL.`,
    },

    { type: 'h2', text: 'Hvor knækker Excel?' },
    {
      type: 'paragraph',
      text: `Excel knækker sjældent på selve regnestykket, men på mængden af linjer, på opdateringerne og på dokumentationen.`,
    },
    {
      type: 'richtext',
      html:
        '<ul>' +
        `<li>Mængden af bilag: hver faktura skal hentes, kategoriseres og kobles til en faktor i hånden.</li>` +
        `<li>Opdateringer: Energistyrelsens faktorer opdateres hvert år, Energinets deklarationer kommer i januar og juni, og EFRAG har udgivet en ny version af sin skabelon, så arket skal rettes igen.</li>` +
        `<li>Scope 3: udledningen i værdikæden kræver flere kategorier og ofte beløbsbaserede faktorer, og det er her, regnearket vokser mest.</li>` +
        `<li>Sporet: når banken eller revisor spørger, hvor et tal kommer fra, skal svaret kunne findes linje for linje, og et regneark viser ikke uden videre, hvem der har ændret hvad.</li>` +
        `<li>Personen: andet år går hurtigere, hvis den, der lavede det første år, stadig er der.</li>` +
        `<li>Skabelonen: EFRAG's skabelon er lavet til Excel 365, og en ny version kan betyde, at tallene skal flyttes over.</li>` +
        '</ul>',
    },

    { type: 'h2', text: 'Hvordan går I videre uden at miste arbejdet i regnearket?' },
    {
      type: 'paragraph',
      text: `I mister ikke jeres regneark, når I går videre: det bliver jeres basisår og jeres kontrol af de nye tal.`,
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        `<li>Behold regnearket som basisår, og notér, hvilke faktorer og år I har brugt.</li>` +
        `<li>Opret en gratis konto i qlim8, og forbind e-conomic, Dinero eller Billy, så fakturaerne beregnes fra bogføringen.</li>` +
        `<li>Upload de linjer, der ikke står i bogføringen, for eksempel brændstof i liter eller kørte kilometer, som Excel eller CSV. qlim8 læser begge formater.</li>` +
        `<li>Giv qlim8 fuldmagt til Eloverblik med MitID, så elforbruget hentes time for time.</li>` +
        `<li>Hent Excel-rapporten med hver linje: dato, kategori, mængde, emissionsfaktor og kilde, og læg den ved siden af jeres eget ark.</li>` +
        `<li>Lav VS-rapporten i qlim8.</li>` +
        '</ol>',
    },
    {
      type: 'paragraph',
      text: `qlim8 har en gratis pakke uden udløbsdato, så I kan lægge de to regneark side om side uden at betale. Er jeres Excel-ark stadig nok, kan I blive ved med det.`,
    },
    {
      type: 'cta',
      heading: 'Sammenlign jeres regneark med et klimaregnskab fra bogføringen',
      text: `Opret en gratis konto, forbind jeres regnskabsprogram, og sammenlign qlim8's Excel-rapport med jeres eget ark linje for linje.`,
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Spørgsmål om klimaregnskab i Excel' },
    { type: 'h3', text: 'Kan man lave klimaregnskab i Excel?' },
    {
      type: 'paragraph',
      text: `Ja, et klimaregnskab kan laves i Excel med én linje pr. aktivitet og Energistyrelsens emissionsfaktorer, og for en lille virksomhed med få energikilder er det ofte nok.`,
    },
    { type: 'h3', text: 'Findes der en gratis skabelon til klimaregnskab i Excel?' },
    {
      type: 'paragraph',
      text: `Ja, EFRAG udgiver en Excel-skabelon til VS-rapporten, som kan hentes uden at oprette en konto, og Energistyrelsen udgiver emissionsfaktorerne bag Klimakompasset som et Excel-ark.`,
    },
    { type: 'h3', text: 'Hvor finder jeg emissionsfaktorer til et CO2-regnskab i Excel?' },
    {
      type: 'paragraph',
      text: `Energistyrelsen udgiver Klimakompassets emissionsfaktorer som et Excel-ark, men tjek datoen, fordi arket på Energistyrelsens side er fra november 2024. For el udgiver Energinet miljødeklarationen og eldeklarationen.`,
    },
    { type: 'h3', text: 'Hvor lang tid tager et klimaregnskab i Excel?' },
    {
      type: 'paragraph',
      text: `Vi skønner, at det første komplette klimaregnskab i Excel tager 3 til 6 ugers internt arbejde for en mellemstor SMV.`,
    },
    { type: 'h3', text: 'Kan jeg uploade data fra Excel til qlim8?' },
    {
      type: 'paragraph',
      text: `Ja, qlim8 læser Excel og CSV, så data, der ikke står i bogføringen, kan uploades, mens fakturaerne hentes fra regnskabsprogrammet.`,
    },
  ],
}
