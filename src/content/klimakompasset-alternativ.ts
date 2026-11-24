import type { Article } from './article'
import { CONTACT_EMAIL, FREE_START_CTA } from './cta'
import { danskDato } from './sammenligning/byg'

export const artikel: Article = {
  slug: 'klimakompasset-alternativ',
  title: 'Klimakompasset alternativ: det naturlige næste skridt efter det gratis værktøj',
  seoTitle: 'Klimakompasset alternativ: sådan tager I det næste skridt',
  description:
    'Har I brugt Klimakompasset? Se, hvad det gør godt, hvornår I vokser fra det, og hvordan I går videre til qlim8, som bruger Klimakompassets faktorer.',
  category: 'Sammenligning',
  publishedAt: '2026-11-24',
  readingTime: 7,
  sections: [
    {
      type: 'lead',
      text: `Klimakompasset er Erhvervsstyrelsens gratis værktøj til klimaregnskab, og qlim8 er det naturlige næste skridt, når I vokser fra at taste tallene ind selv. Klimakompasset beregner scope 1, 2 og 3 med Energistyrelsens emissionsfaktorer, og qlim8 bruger primært de samme danske kilder, så tallene kan sammenlignes. Forskellen er, at qlim8 henter data fra bogføringen og Eloverblik i stedet for at få dem tastet, har audit trail på hver beregning og laver VS-rapporten, og at qlim8 har en gratis pakke uden udløbsdato.`,
    },

    { type: 'h2', text: 'Hvad er Klimakompasset, og hvad gør det godt?' },
    {
      type: 'paragraph',
      text: `Klimakompasset er et gratis, offentligt værktøj til små og mellemstore virksomheder, udviklet af Erhvervsstyrelsen sammen med Energistyrelsen og lanceret 2. december 2021.`,
    },
    {
      type: 'paragraph',
      text: `Klimakompasset beregner udledningen i scope 1, 2 og 3 efter GHG-protokollen. Ifølge Klimakompassets vejledning dækker scope 3 kategori 1 til 13, mens kategori 14 og 15 er udeladt, fordi de sjældent er relevante for SMV'er.`,
    },
    {
      type: 'paragraph',
      text: `Klimakompasset bruger emissionsfaktorer, som Energistyrelsen har indsamlet, udarbejdet og dokumenteret. Faktorerne bliver suppleret løbende og opdateret årligt, dog ikke dem alle, og de blev senest opdateret i november 2025 med data for 2024.`,
    },
    {
      type: 'paragraph',
      text: `Klimakompasset kan sætte reduktionsmål, følge udviklingen år for år og vurdere effekten af klimatiltag.`,
    },
    {
      type: 'paragraph',
      text: `Klimakompasset har en miniberegner uden login til scope 1 og 2: elektricitet, fjernvarme, brændsler, procesudledning og egne og leasede køretøjer. Miniberegneren gemmer ikke resultatet, så det forsvinder, når man forlader siden.`,
    },
    {
      type: 'paragraph',
      text: `Den fulde version kræver login med MitID eller mail, og med MitID Erhverv kan flere fra virksomheden bruge samme beregning. Ifølge Klimakompassets vejledning kan en konsulent eller revisor få adgang til beregningerne, og resultaterne kan downloades til Excel.`,
    },
    {
      type: 'richtext',
      html: `<p>Klimakompasset laver ikke en VS-rapport, men giver datapunkter, der flugter med <a href="/blog/hvad-er-vsme-vs">den frivillige standard VS</a>. Datapunkterne findes for scope 1 og 2 i miniberegneren og for alle scopes under E-nøgletal i den fulde version.</p>`,
    },
    {
      type: 'list',
      items: [
        `Vælg Klimakompasset, hvis I vil i gang med et første overblik over scope 1, 2 og 3 uden at betale.`,
        `Vælg Klimakompasset, hvis I har brug for et hurtigt overslag på scope 1 og 2 uden login.`,
        `Vælg Klimakompasset, hvis I kan taste jeres data i hånden og er tilfredse med gennemsnitsfaktorer.`,
        `Vælg Klimakompasset, hvis I vil sætte reduktionsmål og følge udviklingen år for år.`,
      ],
    },

    { type: 'h2', text: 'Hvad kan Klimakompasset ikke bruges til?' },
    {
      type: 'paragraph',
      text: `Klimakompasset skriver selv, at værktøjet ikke kan bruges til fire ting.`,
    },
    {
      type: 'ordered-list',
      items: [
        `Resultaterne kan ikke uden videre bruges som et verificeret klimaregnskab til lovpligtig rapportering efter direktivet for virksomheders bæredygtighedsrapportering (CSRD). Det kræver, at en revisor verificerer oplysningerne.`,
        `Resultaterne er ikke eksakte beregninger af virksomhedens faktiske udledninger, fordi emissionsfaktorerne bygger på gennemsnitsdata.`,
        `Klimakompasset kan ikke udarbejde livscyklusvurderinger (LCA'er) eller beregne drivhusgasudledningen for produkter.`,
        `CO2e-kompensation kan ikke medregnes i virksomhedens klimaaftryk.`,
      ],
    },
    {
      type: 'paragraph',
      text: `Under listen råder Klimakompasset til kun at markedsføre det, I kan dokumentere.`,
    },
    {
      type: 'paragraph',
      text: `Listen beskriver grænser, som et betalt program ikke uden videre fjerner. Også med qlim8 skal en revisor verificere oplysningerne, hvis de skal indgå i en CSRD-rapport, og hvor en faktura ikke har en fysisk mængde, bruger qlim8 beløbsbaserede gennemsnitsfaktorer. Hvor produkters udledning er et spørgsmål, kan I i qlim8 uploade PCF- og EPD-dokumenter fra jeres leverandører.`,
    },

    { type: 'h2', text: 'Hvornår er I vokset fra Klimakompasset?' },
    {
      type: 'paragraph',
      text: `I er vokset fra Klimakompasset, når nogen uden for virksomheden begynder at bruge tallene: banken, en stor kunde eller jeres revisor.`,
    },
    {
      type: 'list',
      items: [
        `Banken eller en kunde beder om en VS-rapport og ikke kun om tallene. Klimakompasset giver datapunkter til VS, men ikke selve rapporten.`,
        `Nogen spørger, hvor et tal kommer fra. Klimakompasset oplyser ikke et audit trail, men har et beskrivelsesfelt pr. linje, og ifølge Klimakompassets vejledning bliver de indtastede data ikke revideret.`,
        `Tastearbejdet vokser. I Klimakompasset taster I selv aktivitetsdata ind, og ifølge Klimakompassets vejledning taster I også selv elforbruget og udledningen pr. kWh ind, når I bruger Energinets deklaration.`,
        `I får tal fra leverandørerne. Leverandørspecifikke faktorer kan tastes ind som egne emissionsfaktorer, men ifølge Klimakompassets vejledning tilbyder værktøjet dem ikke selv.`,
      ],
    },
    {
      type: 'paragraph',
      text: `Det betyder ikke, at Klimakompasset var forkert at starte med. Det betyder, at klimaregnskabet er gået fra at være et overslag til at være noget, andre læser.`,
    },

    { type: 'h2', text: 'Hvad følger med fra Klimakompasset, og hvorfor kan tallene sammenlignes?' },
    {
      type: 'paragraph',
      text: `Det vigtigste, der følger med, er jeres basisår: resultaterne fra Klimakompasset er det, I sammenligner jeres første år i qlim8 med.`,
    },
    {
      type: 'richtext',
      html: `<p>Tallene kan sammenlignes, fordi qlim8 primært bruger danske kilder, herunder <a href="/metodologi">Klimakompassets emissionsfaktorer og Energinet</a>, og supplerer med EXIOBASE til indkøb uden fysiske mængder.</p>`,
    },
    {
      type: 'paragraph',
      text: `Ifølge Klimakompassets vejledning bygger Klimakompassets egne faktorer primært på EXIOBASE og suppleres med data fra blandt andet Energistyrelsen. Forskelle mellem de to opgørelser kan derfor skyldes, hvordan fakturaerne kategoriseres, om en post beregnes ud fra en fysisk mængde eller et beløb, og hvilket år faktorerne er fra. De kan også skyldes, at elforbruget i qlim8 kommer time for time fra Eloverblik. Klimakompasset følger kalenderåret, fordi faktorerne gør det, så sammenlign samme kalenderår.`,
    },
    {
      type: 'paragraph',
      text: `qlim8 beregner tallene igen fra jeres bogføring og Eloverblik, så resultaterne fra Klimakompasset er jeres sammenligning og ikke jeres datakilde. Fire ting kan I tage med:`,
    },
    {
      type: 'list',
      items: [
        `Resultaterne for basisåret.`,
        `De egne emissionsfaktorer, I har tastet ind.`,
        `Jeres reduktionsmål.`,
        `Kendskabet til, hvilke data I har, og hvor de ligger.`,
      ],
    },

    { type: 'h2', text: 'Klimakompasset og qlim8 side om side' },
    {
      type: 'paragraph',
      text: `Tabellen viser, hvad Klimakompasset og qlim8 hver især gør på de punkter, der betyder mest, når I tager næste skridt.`,
    },
    {
      type: 'richtext',
      html:
        '<table>' +
        '<thead><tr><th>Punkt</th><th>Klimakompasset</th><th>qlim8</th></tr></thead>' +
        '<tbody>' +
        '<tr><td>Pris</td><td>Gratis, offentligt værktøj</td><td>Gratis pakke uden udløbsdato</td></tr>' +
        '<tr><td>Scope 1, 2 og 3</td><td>Ja, i scope 3 kategori 1 til 13 ifølge Klimakompassets vejledning</td><td>Ja</td></tr>' +
        '<tr><td>Data ind</td><td>I taster aktivitetsdata ind selv</td><td>Fakturaer fra e-conomic, Dinero og Billy, Excel- og CSV-upload og manuel registrering</td></tr>' +
        '<tr><td>Elforbrug</td><td>I taster forbrug og udledning pr. kWh ind fra Energinets deklaration</td><td>Hentes time for time fra Eloverblik med fuldmagt via MitID</td></tr>' +
        '<tr><td>Emissionsfaktorer</td><td>Energistyrelsens, opdateret årligt</td><td>Primært danske kilder, herunder Klimakompassets faktorer og Energinet, suppleret med EXIOBASE</td></tr>' +
        '<tr><td>Spor på tallene</td><td>Audit trail oplyses ikke, et beskrivelsesfelt pr. linje</td><td>Audit trail på hver beregning med input, emissionsfaktor og kilde</td></tr>' +
        '<tr><td>Reduktionsmål</td><td>Reduktionsmål, fremskrivning og effekt af tiltag</td><td>Mål på kategorier og hele scopes, intensitetsmål, tiltag og overgangsplan</td></tr>' +
        '<tr><td>VS-rapport</td><td>Datapunkter, der flugter med VS, men ingen rapport</td><td>VS Basis- og VS Udvidet-rapport</td></tr>' +
        '<tr><td>Revisor og rådgiver</td><td>Adgang kan gives til konsulent eller revisor ifølge Klimakompassets vejledning</td><td>Direkte revisoradgang og gratis Revisor- og Konsulent-konti</td></tr>' +
        '<tr><td>Udtræk</td><td>Resultater kan downloades til Excel ifølge Klimakompassets vejledning</td><td>Excel-rapport med hver linje og PDF</td></tr>' +
        '</tbody>' +
        '</table>',
    },
    {
      type: 'richtext',
      html: `<p>Sidst opdateret ${danskDato('2026-11-24')}. Oplysningerne om Klimakompasset er hentet fra Klimakompassets egen side og vejledninger og fra Erhvervsstyrelsens og Energistyrelsens sider. Er noget forkert eller forældet, så skriv til ${CONTACT_EMAIL}, så retter vi det.</p>`,
    },
    {
      type: 'richtext',
      html: `<p>Vil I sammenligne qlim8 med andre betalte programmer, står <a href="/blog/bedste-klimaregnskabsprogram">de danske klimaregnskabsprogrammer</a> side om side i vores sammenligning.</p>`,
    },
    {
      type: 'cta',
      heading: 'Tag næste skridt uden at betale',
      text: `Opret en gratis konto, forbind jeres regnskabsprogram og Eloverblik, og læg tallene ved siden af jeres resultater fra Klimakompasset.`,
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Sådan tager I skridtet fra Klimakompasset til qlim8' },
    {
      type: 'paragraph',
      text: `I tager skridtet ved at gemme jeres resultater fra Klimakompasset, forbinde jeres kilder i qlim8 og sammenligne det første år med jeres basisår.`,
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        `<li>Gem jeres resultater fra Klimakompasset. Ifølge Klimakompassets vejledning kan de downloades til Excel i den fulde version, og har I brugt miniberegneren, så notér tallene, før I forlader siden. Notér også de egne emissionsfaktorer, I har tastet ind, og jeres reduktionsmål.</li>` +
        `<li>Opret en gratis konto i qlim8, og forbind e-conomic, Dinero eller Billy.</li>` +
        `<li>Giv qlim8 <a href="/integrationer/eloverblik">fuldmagt til Eloverblik med MitID</a>. qlim8 henter forbrug fra op til tre måneder før, kontoen blev oprettet, så for et basisår, der ligger længere tilbage, er resultaterne fra Klimakompasset jeres sammenligning.</li>` +
        `<li>Registrér det, der ikke står i bogføringen, for eksempel brændstof i liter, kørte kilometer eller affald, manuelt eller som Excel eller CSV.</li>` +
        `<li>Sammenlign totalerne for samme kalenderår med resultaterne fra Klimakompasset, og brug <a href="/produkt/audit-trail-og-revisor">audit trail</a> til at se, hvor en forskel kommer fra.</li>` +
        `<li>Sæt reduktionsmål ud fra basisåret, og lav VS-rapporten.</li>` +
        '</ol>',
    },

    { type: 'h2', text: 'Spørgsmål om Klimakompasset' },
    { type: 'h3', text: 'Hvad er et alternativ til Klimakompasset?' },
    {
      type: 'paragraph',
      text: `qlim8 er det naturlige næste skridt for virksomheder, der har brugt Klimakompasset, fordi qlim8 bruger primært danske kilder, henter data fra bogføringen og Eloverblik, har audit trail på hver beregning og laver VS-rapporten.`,
    },
    { type: 'h3', text: 'Kan Klimakompasset lave en VS-rapport (VSME)?' },
    {
      type: 'paragraph',
      text: `Nej, Klimakompasset laver ikke en VS-rapport, men giver datapunkter, der flugter med standarden, i miniberegneren for scope 1 og 2 og under E-nøgletal i den fulde version.`,
    },
    { type: 'h3', text: 'Kan man bruge Klimakompasset til CSRD?' },
    {
      type: 'paragraph',
      text: `Nej, ikke uden videre: Klimakompasset skriver selv, at resultaterne ikke kan bruges som et verificeret klimaregnskab til CSRD, fordi en revisor skal verificere oplysningerne.`,
    },
    { type: 'h3', text: 'Kan man eksportere fra Klimakompasset til Excel?' },
    {
      type: 'paragraph',
      text: `Ja, ifølge Klimakompassets vejledning kan resultaterne i den fulde version downloades til Excel. Miniberegneren gemmer ikke jeres beregning, så notér tallene, før I forlader siden.`,
    },
    { type: 'h3', text: 'Kan jeg tage mine tal fra Klimakompasset med til qlim8?' },
    {
      type: 'paragraph',
      text: `Ja, som sammenligning: gem jeres resultater fra Klimakompasset, og brug dem som basisår, mens qlim8 beregner tallene igen fra jeres bogføring og Eloverblik.`,
    },
  ],
}
