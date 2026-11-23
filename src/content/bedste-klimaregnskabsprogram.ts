import type { Article } from './article'
import { FREE_START_CTA } from './cta'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET } from './sammenligning/data'

export const artikel: Article = {
  slug: 'bedste-klimaregnskabsprogram',
  title: 'Bedste klimaregnskabsprogram 2026: sådan vælger en dansk SMV',
  seoTitle: 'Bedste klimaregnskabsprogram 2026: sådan vælger du',
  description:
    'Sådan vælger en dansk SMV klimaregnskabsprogram i 2026: qlim8, Verarca, Grønlog, EcoMetrics, Wardn og Valified sammenlignet på pris, integrationer og funktioner.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 9,
  sections: [
    {
      type: 'lead',
      text: `Der findes ikke ét bedste klimaregnskabsprogram: det rigtige afhænger af jeres regnskabssystem, jeres rapportkrav og om I vil have hjælp. For en dansk SMV med bogføring i e-conomic, Dinero eller Billy er qlim8 værd at undersøge først, og Grønlog og EcoMetrics er de nærmeste sammenligninger. Bruger I Business Central, Uniconta eller E-Komplet, er Verarca og EcoMetrics relevante, og vil I have en leverandør til at drive projektet, er Wardn og Verarcas servicepakke det.`,
    },
    {
      type: 'paragraph',
      text: `Kort sagt passer programmerne til hver deres situation:`,
    },
    {
      type: 'list',
      items: [
        `Gratis start med e-conomic, Dinero eller Billy: qlim8, Grønlog og EcoMetrics har alle en gratis plan eller pakke.`,
        `Business Central, Uniconta eller E-Komplet: Verarca og EcoMetrics nævner dem på deres integrationssider.`,
        `En leverandør, der driver ESG-projektet: Wardn Core og Verarcas Managed Carbon Service.`,
        `Hurtigt en VS Basis-rapport med branchebenchmark til banken: Valified.`,
        `CSRD-pligt, krav om SOC 2 eller ISO 27001, eller selskaber i flere lande: en stor international platform.`,
      ],
    },

    { type: 'h2', text: 'Hvordan vælger en dansk SMV klimaregnskabsprogram?' },
    {
      type: 'paragraph',
      text: `Et klimaregnskabsprogram vælges ud fra fem ting: regnskabssystem, rapportniveau, scope 3, hjælp og pris.`,
    },
    {
      type: 'ordered-list',
      items: [
        `Regnskabssystem: Programmet skal kunne hente data fra det system, I bruger. qlim8 og Grønlog nævner e-conomic, Dinero og Billy. Verarca nævner e-conomic, Uniconta, Business Central og E-Komplet. EcoMetrics nævner e-conomic, Dinero, Uniconta, Billy, Business Central og flere. Wardn og Valified nævner ingen regnskabssystemer.`,
        `Rapportniveau: Spørg banken og kunderne, om de beder om VS Basis (tidligere VSME), VS Udvidet eller ESRS. qlim8, Verarca og EcoMetrics oplyser VS Udvidet, hos Verarca som tilkøb. Grønlog, Wardn og Valified oplyser ikke VS Udvidet.`,
        `Scope 3: Scope 3 er udledningen i værdikæden. qlim8, Verarca, Grønlog og EcoMetrics dækker scope 3. Valified oplyser ikke scope 3.`,
        `Hjælp og revisor: Vil I selv køre programmet eller have en person til at gennemgå data? Verarca, Wardn og Valified har rådgivning eller hjælp. qlim8 har ingen indbygget konsulentydelse, men gratis konti til jeres egen revisor og konsulent. EcoMetrics giver revisor læseadgang på Plus og Pro.`,
        `Pris og gratis start: Sammenlign den samlede årspris, og se, hvad en gratis plan dækker. Tabellen herunder viser priserne, som leverandørerne oplyser dem.`,
      ],
    },

    { type: 'h2', text: 'De danske klimaregnskabsprogrammer side om side' },
    {
      type: 'paragraph',
      text: `Tabellen viser, hvad de seks danske programmer selv oplyser på deres hjemmesider, og datoen står under tabellen. Ikke oplyst betyder, at leverandøren ikke nævner det, ikke at den mangler det.`,
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'De seks danske programmer kort' },
    { type: 'h3', text: 'qlim8' },
    { type: 'paragraph', text: KORT_OM.qlim8 },
    {
      type: 'paragraph',
      text: `qlim8 er værd at undersøge først, hvis I bruger e-conomic, Dinero eller Billy, vil starte gratis og skal bruge VS Basis, VS Udvidet, ESRS-rapportering eller dobbelt væsentlighedsanalyse. qlim8 har audit trail på hver beregning, gratis konti til revisor og konsulent og et REST API og en MCP-server med 31 værktøjer. qlim8 har ikke ISO 27001 eller SOC 2, SBTi-mål og en egentlig leverandørportal er planlagt, og der er ingen indbygget konsulentydelse.`,
    },

    { type: 'h3', text: 'Verarca' },
    { type: 'paragraph', text: KORT_OM.verarca },
    {
      type: 'richtext',
      html: `<p>Verarca er det bedste valg, hvis I bruger Business Central, Uniconta eller E-Komplet, eller vil have en person til at gennemgå jeres data i Managed Carbon Service. Der er ingen gratis plan på prissiden.</p>`,
    },

    { type: 'h3', text: 'Grønlog' },
    { type: 'paragraph', text: KORT_OM.gronlog },
    {
      type: 'richtext',
      html: `<p>Grønlog passer, hvis I vil starte gratis med scope 1 og 2 uden integrationer, eller har brug for en leverandørportal, som ligger i Professional-planen. Programmet har også et scenarie- og målsætningsmodul, mens scope 3 og den fulde VS-rapport ligger i de betalte planer.</p>`,
    },

    { type: 'h3', text: 'EcoMetrics' },
    { type: 'paragraph', text: KORT_OM.ecometrics },
    {
      type: 'richtext',
      html: `<p>EcoMetrics er den danske leverandør, der ligner qlim8 mest, og det bedste valg, hvis I bruger Business Central, e-komplet, Visma Business NXT eller EG Xena, eller vil have en VS-rapport allerede i en gratis plan. Platformen har også VS Udvidet, reduktionsmål, dobbelt væsentlighedsanalyse og læseadgang for revisor.</p>`,
    },

    { type: 'h3', text: 'Wardn' },
    { type: 'paragraph', text: KORT_OM.wardn },
    {
      type: 'richtext',
      html: `<p>Wardn er en guidet ESG-rapport med hjælp, ikke et klimaregnskab, der beregnes fra bogføringen, og det er en anden slags produkt end de øvrige. Det passer, hvis I vil have en leverandør til at facilitere projektet i Core, eller skal indsamle ESG-data fra leverandører og datterselskaber i Enterprise.</p>`,
    },

    { type: 'h3', text: 'Valified' },
    { type: 'paragraph', text: KORT_OM.valified },
    {
      type: 'richtext',
      html: `<p>Valified er det rigtige valg, hvis I hurtigt skal have en VS Basis-rapport og vil sammenligne jer med branchen. Scoren går fra 1 til 100 mod branchen på 13 forhold, der vises et potentiale i kroner, og rapporten kan deles med banken. Scope 3, regnskabsintegrationer og VS Udvidet oplyses ikke.</p>`,
    },

    { type: 'h2', text: 'Hvad med de store internationale klimaplatforme?' },
    {
      type: 'richtext',
      html: `<p>Har I CSRD-pligt, en køber der kræver SOC 2 eller ISO 27001, eller selskaber i flere lande, så er de internationale platforme Watershed, Position Green, Greenly, Persefoni, Coolset, Terrascope og Plan A det rigtige sted at sammenligne.</p>`,
    },
    {
      type: 'paragraph',
      text: `Ud fra de oplyste priser koster de ca. 45.000 kr. til over en million kroner om året, hvor Persefoni Pro er gratis for én bruger. Position Green og Plan A offentliggør ikke priser. qlim8 har ikke ISO 27001 eller SOC 2, så kræver jeres køber det, skal I også kigge her.`,
    },

    {
      type: 'cta',
      heading: 'Se jeres egne tal, før I vælger',
      text: `Opret en gratis konto, forbind jeres regnskabsprogram, og se klimaregnskabet bygget på jeres egne bilag. Hellere en samtale først? Book en demo.`,
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Spørgsmål om klimaregnskabsprogrammer' },
    { type: 'h3', text: 'Hvad er det bedste klimaregnskabsprogram til en SMV?' },
    {
      type: 'paragraph',
      text: `Der er ikke ét bedste program, så vælg ud fra jeres regnskabssystem og rapportkrav, og undersøg qlim8 først, hvis I bruger e-conomic, Dinero eller Billy.`,
    },
    { type: 'h3', text: 'Hvad koster et klimaregnskabsprogram?' },
    {
      type: 'paragraph',
      text: `De danske programmer har gratis planer eller betalte planer til priser på måneds- og årsbasis, mens de store internationale platforme koster ca. 45.000 kr. om året og derover. Verarca oplyser 299 kr. om måneden betalt årligt for scope 1 og 2 hos mikrovirksomheder, Grønlog 590 og 1.490 kr. om måneden, EcoMetrics 4.950 og 11.950 kr. om året ekskl. moms og Valified 1.290 kr. om året.`,
    },
    { type: 'h3', text: 'Findes der et gratis klimaregnskabsprogram?' },
    {
      type: 'paragraph',
      text: `Ja, qlim8 har en gratis pakke uden udløbsdato, og Grønlog og EcoMetrics har gratis planer, som dækker forskelligt: Grønlogs gratis plan dækker scope 1 og 2, og EcoMetrics' gratis plan dækker scope 1 til 3 og en VS-rapport.`,
    },
    { type: 'h3', text: 'Kan man lave klimaregnskab i Excel?' },
    {
      type: 'paragraph',
      text: `Ja, men tallene skal samles og regnes om manuelt, hver gang de ændrer sig, og et program med integration til regnskabssystemet sparer det arbejde.`,
    },
    { type: 'h3', text: 'Hvad skal et klimaregnskabsprogram kunne til banken?' },
    {
      type: 'paragraph',
      text: `Det skal kunne lave en VS Basis-rapport og vise, hvilket bilag hvert tal bygger på.`,
    },
  ],
}
