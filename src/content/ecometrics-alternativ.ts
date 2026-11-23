import type { Article } from './article'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'
import { FREE_START_CTA } from './cta'

export const artikel: Article = {
  slug: 'ecometrics-alternativ',
  title: 'EcoMetrics alternativ: qlim8 og EcoMetrics sammenlignet',
  seoTitle: 'EcoMetrics alternativ: pris, DMA, VS og qlim8 sammenlignet',
  description:
    'EcoMetrics eller qlim8? To danske platforme med gratis plan, VS-rapport og dobbelt væsentlighedsanalyse. Se forskellene på integrationer, API, klimaplan og ESRS.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 9,
  sections: [
    {
      type: 'lead',
      text: 'EcoMetrics er den danske platform, der ligner qlim8 mest. Begge har en gratis plan, dobbelt væsentlighedsanalyse, elforbrug fra Eloverblik og en MCP-forbindelse til AI-assistenter. EcoMetrics er det bedste valg, hvis I bruger Business Central, e-komplet, Visma Business NXT eller EG Xena, eller vil have VS-rapporten med i en gratis plan. qlim8 er værd at undersøge først, hvis I har brug for et API, en dybere klimaplan, ESRS-rapportering eller gratis konti til jeres revisor og rådgiver.',
    },

    { type: 'h2', text: 'Hvad er EcoMetrics, og hvem passer platformen til?' },
    {
      type: 'paragraph',
      text: 'EcoMetrics er en dansk ESG-platform, der beregner klimaregnskab og ESG-rapport ud fra virksomhedens regnskabsdata. Platformen henter data fra regnskabsprogrammer og Eloverblik og samler dem i scope 1 til 3, en VS-rapport og en dobbelt væsentlighedsanalyse.',
    },
    {
      type: 'paragraph',
      text: 'EcoMetrics Basic er gratis. EcoMetrics Plus koster 4.950 kr. om året ekskl. moms, og EcoMetrics Pro koster 11.950 kr. om året ekskl. moms. Basic dækker scope 1 til 3 og en VS-rapport som PDF og i Excel. Dobbelt væsentlighedsanalyse og ESRS-mapping hører til Plus og Pro, og det samme gør læseadgang for revisor og MCP-forbindelsen til AI-assistenter.',
    },
    {
      type: 'paragraph',
      text: 'EcoMetrics oplyser, at data ligger hos Supabase i EU (Irland), og qlim8 hoster i Tyskland. Hverken EcoMetrics eller qlim8 oplyser en ISO 27001- eller SOC 2-certificering.',
    },
    {
      type: 'richtext',
      html:
        '<ul>' +
        '<li>Vælg EcoMetrics, hvis I bruger Business Central, e-komplet, Visma Business NXT eller EG Xena, fordi EcoMetrics har en direkte integration til dem.</li>' +
        '<li>Vælg EcoMetrics, hvis I vil have en VS-rapport i en gratis plan, så I kan aflevere en rapport til banken eller en kunde uden at købe noget.</li>' +
        '<li>Vælg EcoMetrics, hvis I vil hente lønoplysninger fra Salary. EcoMetrics nævner også Zenegy, som qlim8 har.</li>' +
        '<li>Vælg EcoMetrics, hvis I vil have dobbelt væsentlighedsanalyse og læseadgang for revisor til en lav årspris.</li>' +
        '</ul>',
    },

    { type: 'h2', text: 'Hvad har EcoMetrics og qlim8 til fælles?' },
    {
      type: 'paragraph',
      text: 'EcoMetrics og qlim8 er opbygget efter samme idé: klimaregnskabet beregnes ud fra bogføringen og elforbruget, og rapporterne kommer bagefter.',
    },
    {
      type: 'richtext',
      html:
        '<p>Begge platforme har en gratis plan, scope 1 til 3, elforbrug fra Eloverblik, dobbelt væsentlighedsanalyse, et revisionsspor og en MCP-forbindelse til AI-assistenter. ' +
        'Begge har også VS-standardens to niveauer. qlim8 laver en VS Udvidet-rapport, og EcoMetrics skriver, at I kan lave en rapport med basismodulet i dag og med det udvidede modul, når kunden beder om det. ' +
        'Begge forbinder til e-conomic, Dinero, Billy og Uniconta, og begge forbinder til Zenegy. Uniconta er stadig i beta hos qlim8.</p>',
    },

    { type: 'h2', text: 'Hvad er forskellen på EcoMetrics og qlim8?' },
    {
      type: 'paragraph',
      text: 'Den største forskel er, at EcoMetrics kan forbindes til flere regnskabssystemer, mens qlim8 går dybere på API, klimaplan, ESRS og rådgiveradgang.',
    },

    { type: 'h3', text: 'Integrationer: EcoMetrics dækker flere systemer' },
    {
      type: 'paragraph',
      text: 'EcoMetrics har flere regnskabsintegrationer end qlim8. EcoMetrics nævner e-conomic, Dinero, Billy, Uniconta, Business Central, e-komplet, Visma Business NXT og EG Xena og lønsystemerne Salary og Zenegy. qlim8 forbinder til e-conomic, Dinero og Billy, har Uniconta i beta og Zenegy som lønsystem. Bruger I et ERP-system, som qlim8 ikke har, er EcoMetrics det rigtige sted at starte. I qlim8 kan data fra andre systemer komme ind som Excel eller CSV.',
    },

    { type: 'h3', text: 'API og MCP: qlim8 kan skrive, EcoMetrics kan læse' },
    {
      type: 'paragraph',
      text: 'qlim8 har et REST API og en MCP-server med 31 værktøjer, og AI-assistenter kan bruge dem til at oprette reduktionsmål og udkast til tiltag og til at starte en rapport. MCP-forbindelsen hos EcoMetrics har kun læseadgang, og EcoMetrics oplyser ikke et REST API på sin hjemmeside. Skal et eget system eller en AI-assistent skrive til klimaregnskabet og ikke kun læse, er det qlim8, der kan det.',
    },

    { type: 'h3', text: 'Klimaplanens dybde: mål, tiltag og overgangsplan' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 har en klimaplan med flere led. qlim8 har reduktionsmål på kategorier og hele scopes, intensitetsmål, en business-as-usual-linje og en planlinje, reduktionstiltag med overgangsplan og scope 3-mål på fysiske data. ' +
        'EcoMetrics oplyser, at I kan sætte reduktionsmål og følge fremdriften. Skal målene ud i tiltag og en plan, som en revisor eller en bank kan følge, er qlim8 dybere.</p>',
    },

    { type: 'h3', text: 'ESRS: rapportering i appen eller mapping' },
    {
      type: 'paragraph',
      text: 'qlim8 har ESRS-rapportering i appen og kryds-mapper væsentlighedsanalysen til ESRS, IFRS, GRI og CDP. EcoMetrics beskriver sin dobbelte væsentlighedsanalyse og ESRS-mapping som en del af Plus og Pro. Er jeres kunde eller bank begyndt at spørge efter ESRS, giver qlim8 flere rapportformater at vælge imellem.',
    },

    { type: 'h3', text: 'Rådgivere: gratis konti til revisor og konsulent' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 har gratis Revisor-konti og gratis Konsulent-konti, hvor en rådgiver ser alle sine klienter i én portefølje. ' +
        'EcoMetrics giver revisor læseadgang på Plus og Pro og har et partnerprogram. Arbejder jeres rådgiver for flere klienter, kan rådgiveren få overblikket samlet i qlim8. Skal revisoren kun kigge med, dækker EcoMetrics behovet.</p>',
    },

    {
      type: 'cta',
      heading: 'Se jeres egne tal i qlim8',
      text: 'Opret en gratis konto, forbind jeres regnskabsprogram og Eloverblik, og se klimaregnskabet bygget af jeres egne bilag. Så kan I sammenligne med EcoMetrics på jeres egne data.',
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Hvornår er EcoMetrics det rigtige valg, og hvornår er qlim8?' },
    {
      type: 'paragraph',
      text: 'EcoMetrics er det rigtige valg, når jeres regnskabssystem kun findes hos EcoMetrics, eller når I vil have en VS-rapport i en gratis plan. EcoMetrics er også et godt valg, hvis I vil have dobbelt væsentlighedsanalyse og læseadgang for revisor til en lav årspris og ikke har brug for et API.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 er det rigtige valg, når klimaregnskabet skal kunne styres af andre systemer eller AI-assistenter, når reduktionsmålene skal omsættes til tiltag og en overgangsplan, eller når jeres rådgiver arbejder for flere klienter. De to platforme har så meget til fælles, at den hurtigste måde at vælge på er at lægge de samme bilag ind i begge. Begge har en gratis plan.',
    },

    { type: 'h2', text: 'Hvordan ser EcoMetrics ud ved siden af de andre danske programmer?' },
    {
      type: 'richtext',
      html:
        '<p>Tabellen sammenligner EcoMetrics med qlim8 og fire andre danske programmer. Hvor en leverandør ikke oplyser noget på sin hjemmeside, står der Ikke oplyst, og det er ikke det samme som nej.</p>',
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
    { type: 'h3', text: 'Wardn' },
    { type: 'paragraph', text: KORT_OM.wardn },
    { type: 'paragraph', text: VAELG.wardn },
    { type: 'h3', text: 'Valified' },
    { type: 'paragraph', text: KORT_OM.valified },
    { type: 'paragraph', text: VAELG.valified },

    { type: 'h2', text: 'Sådan skifter I fra EcoMetrics til qlim8' },
    {
      type: 'paragraph',
      text: 'Et skifte fra EcoMetrics består af at flytte rapporter og dokumenter, forbinde de samme kilder igen og genbruge jeres væsentlighedsanalyse. De fleste trin er eksport og upload.',
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        '<li>Eksportér jeres VS-rapport fra EcoMetrics som PDF eller Excel, så I har sidste års tal at sammenligne med.</li>' +
        '<li>Gem jeres dobbelte væsentlighedsanalyse som dokument, og indtast emnerne i qlim8s væsentlighedsanalyse.</li>' +
        '<li>Hent de EPD&#39;er, I har samlet fra leverandørerne, og upload dem i qlim8 som PCF/EPD-dokumenter. Findes de ikke i EcoMetrics, hentes de hos leverandøren.</li>' +
        '<li>Forbind jeres regnskabsprogram i qlim8, og giv qlim8 fuldmagt til Eloverblik via MitID. Bruger I Business Central, e-komplet, Visma Business NXT eller EG Xena, kommer data ind som Excel eller CSV.</li>' +
        '<li>Skift, når den periode, I har betalt for hos EcoMetrics, slutter, og tjek vilkårene i jeres egen aftale først.</li>' +
        '</ol>',
    },

    { type: 'h2', text: 'Ofte stillede spørgsmål om EcoMetrics' },
    { type: 'h3', text: 'Hvad koster EcoMetrics?' },
    {
      type: 'paragraph',
      text: 'EcoMetrics Basic er gratis, Plus koster 4.950 kr. om året og Pro 11.950 kr. om året, begge ekskl. moms.',
    },
    { type: 'h3', text: 'Har EcoMetrics en gratis plan?' },
    {
      type: 'paragraph',
      text: 'Ja, EcoMetrics Basic er gratis og dækker scope 1 til 3 og en VS-rapport som PDF og i Excel.',
    },
    { type: 'h3', text: 'Hvilke systemer integrerer EcoMetrics med?' },
    {
      type: 'paragraph',
      text: 'EcoMetrics nævner e-conomic, Dinero, Billy, Uniconta, Business Central, e-komplet, Visma Business NXT og EG Xena samt lønsystemerne Salary og Zenegy og elforbrug fra Eloverblik.',
    },
    { type: 'h3', text: 'Kan EcoMetrics lave dobbelt væsentlighedsanalyse?' },
    {
      type: 'paragraph',
      text: 'Ja, dobbelt væsentlighedsanalyse og ESRS-mapping er med i EcoMetrics Plus og Pro.',
    },
    { type: 'h3', text: 'Hvad er forskellen på EcoMetrics og qlim8?' },
    {
      type: 'paragraph',
      text: 'EcoMetrics har flere ERP-integrationer og en VS-rapport i den gratis plan, mens qlim8 har et REST API, en dybere klimaplan, ESRS-rapportering og gratis Revisor- og Konsulent-konti.',
    },
  ],
}
