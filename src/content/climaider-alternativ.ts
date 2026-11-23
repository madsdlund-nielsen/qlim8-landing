// AFVENTER EJERENS BESLUTNING: registreres ikke i articles.ts, før konkursen er bekræftet på virk.dk.
import type { Article } from './article'
import { DEMO_HREF, DEMO_LABEL } from './cta'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'

export const artikel: Article = {
  slug: 'climaider-alternativ',
  title: 'Climaider alternativ: sådan sikrer og flytter I jeres klimaregnskab',
  seoTitle: 'Climaider alternativ: sådan flytter I jeres klimaregnskab',
  description:
    'Ifølge CVR-registret er Climaider ApS erklæret konkurs. Se, hvad I skal sikre nu, hvad en afløser skal kunne, og hvilke danske alternativer der findes.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 6,
  sections: [
    {
      type: 'lead',
      text: `Ifølge CVR-registret skiftede Climaider ApS navn den 30. september 2026 og blev erklæret konkurs den 20. oktober 2026. Har I brugt Climaider eller overvejet det, så sikr jeres rapporter og beregningsgrundlag nu. Jeres bilag ligger i jeres eget regnskabsprogram, så klimaregnskabet kan beregnes igen i et andet system.`,
    },

    { type: 'h2', text: 'Hvad er der sket med Climaider?' },
    {
      type: 'paragraph',
      text: `Ifølge CVR-registret er selskabet Climaider ApS (CVR 39835037) erklæret konkurs. Selskabet skiftede den 30. september 2026 navn til Anpartsselskabet af 21.08.2018, og konkursen blev erklæret den 20. oktober 2026.`,
    },
    {
      type: 'paragraph',
      text: `Ud over de to datoer skriver vi ikke om selskabet. Spørgsmål om adgang til jeres data kan rettes til konkursboets kurator, hvis navn står i konkursmeddelelsen i Statstidende.`,
    },

    { type: 'h2', text: 'Hvad skal I sikre nu, hvis I har brugt Climaider?' },
    {
      type: 'paragraph',
      text: `Det vigtigste at sikre er jeres seneste rapport og tallene for jeres basisår, fordi alle fremtidige reduktionsmål måles mod dem.`,
    },
    { type: 'h3', text: 'Kildedata fra bogføring og leverandører' },
    {
      type: 'paragraph',
      text: `Jeres kildedata ligger i jeres bogføring og hos jeres leverandører, ikke kun i et klimaprogram. Sørg for, at I har adgang til bilag, kontoudtog, energiaftaler og brændstofdata for de år, rapporten dækker. Har I givet Climaider adgang til jeres regnskabssystem, så fjern adgangen i regnskabssystemets indstillinger.`,
    },
    { type: 'h3', text: 'Seneste rapport og basisår' },
    {
      type: 'paragraph',
      text: `Gem den seneste klimarapport og den VS-rapport (tidligere VSME), I har afleveret, som PDF eller Excel. Gem også tallene for basisåret, altså det år, I måler reduktioner mod, og de reduktionsmål, I har sat. Det er disse tal, banken og kunderne kan spørge til.`,
    },
    { type: 'h3', text: 'Metode og faktorer' },
    {
      type: 'richtext',
      html: `<p>Noter de emissionsfaktorer og den metode, der er brugt, så I kan sammenligne en ny beregning med den gamle. Forskelle mellem to programmer skyldes ofte forskellige faktorer og kategoriseringer, ikke forskellige bilag.</p>`,
    },

    { type: 'h2', text: 'Hvad skal en afløser kunne?' },
    {
      type: 'richtext',
      html: `<p>En afløser skal kunne hente data fra jeres regnskabssystem og vise, hvor hvert tal kommer fra.</p>`,
    },
    {
      type: 'paragraph',
      text: `Fem krav er værd at stille, uanset hvilket program I vælger:`,
    },
    {
      type: 'ordered-list',
      items: [
        `Integration til jeres regnskabssystem, så data hentes fra bilagene i stedet for at blive tastet.`,
        `Audit trail på hver beregning med input, emissionsfaktor og kilde, fordi revisor, bank og store kunder spørger, hvor et tal kommer fra.`,
        `VS Basis-rapport, og VS Udvidet hvis banken eller en stor kunde beder om det.`,
        `Eksport af alle data i åbne formater som Excel, så I selv kan tage jeres data med.`,
        `Dansk support og EU-hosting, og vilkår der siger, hvad der sker med jeres data, når I forlader tjenesten.`,
      ],
    },

    { type: 'h2', text: 'Hvilke alternativer findes der i Danmark?' },
    {
      type: 'richtext',
      html: `<p>Der findes flere danske alternativer, og tabellen viser, hvad hver leverandør selv oplyser på sin hjemmeside.</p>`,
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },
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
    {
      type: 'paragraph',
      text: `qlim8 har hverken ISO 27001 eller SOC 2. Kræver jeres køber en af dem, eller har I CSRD-pligt, så sammenlign også med de store internationale platforme.`,
    },

    { type: 'h2', text: 'Sådan flytter I til qlim8' },
    {
      type: 'paragraph',
      text: `I flytter til qlim8 ved at forbinde jeres regnskabsprogram, hente jeres kildedata og overføre basisårets tal fra den gamle rapport. Det meste af skiftet er eksport og upload af jeres egne data, og hvor lang tid det tager, afhænger af, hvor mange systemer og kilder I har.`,
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        `<li>Saml det, I har sikret: seneste rapport, basisårets tal og de reduktionsmål, I har sat.</li>` +
        `<li>Opret en gratis konto i qlim8, og forbind e-conomic, Dinero eller Billy. qlim8 beregner udledningen fra bilagene og kategoriserer fakturaerne med AI.</li>` +
        `<li>Giv fuldmagt til Eloverblik med MitID, så elforbruget hentes time for time.</li>` +
        `<li>Upload data uden for regnskabet, for eksempel brændstofmængder, som Excel eller CSV, eller registrér dem manuelt.</li>` +
        `<li>Sammenlign totalerne for basisåret med jeres gamle rapport, og brug audit trail til at se, hvor et tal kommer fra. Forskelle skyldes ofte andre beregningsfaktorer.</li>` +
        `<li>Sæt reduktionsmål ud fra basisåret.</li>` +
        '</ol>',
    },
    {
      type: 'cta',
      heading: 'Vil I se, hvordan jeres tal ser ud i qlim8?',
      text: `Book en demo, så gennemgår vi jeres regnskabssystem og det, I har sikret, eller ring til os på +45 93 90 13 84.`,
      buttonText: DEMO_LABEL,
      buttonHref: DEMO_HREF,
    },

    { type: 'h2', text: 'Spørgsmål om Climaider' },
    { type: 'h3', text: 'Er Climaider gået konkurs?' },
    {
      type: 'paragraph',
      text: `Ifølge CVR-registret blev Climaider ApS erklæret konkurs den 20. oktober 2026, efter at selskabet den 30. september 2026 havde skiftet navn.`,
    },
    { type: 'h3', text: 'Kan jeg stadig logge ind i Climaider?' },
    {
      type: 'paragraph',
      text: `Det kan vi ikke svare på, så kontakt konkursboets kurator for at høre om adgang til jeres data.`,
    },
    { type: 'h3', text: 'Hvordan får jeg mine data ud af Climaider?' },
    {
      type: 'paragraph',
      text: `Kontakt konkursboets kurator, og beregn i mellemtiden klimaregnskabet igen ud fra bilagene i jeres eget regnskabsprogram.`,
    },
    { type: 'h3', text: 'Gælder den VS-rapport, jeg har sendt til banken, stadig?' },
    {
      type: 'paragraph',
      text: `Ja, en rapport, I allerede har afleveret, er afleveret, og næste års rapport kan bygge videre på de samme tal, hvis I har dem.`,
    },
    { type: 'h3', text: 'Hvad er et godt alternativ til Climaider?' },
    {
      type: 'paragraph',
      text: `Vælg et program, der forbinder til jeres regnskabsprogram og kan eksportere alt, og sammenlign qlim8, Verarca, Grønlog, EcoMetrics, Wardn og Valified i tabellen.`,
    },
  ],
}
