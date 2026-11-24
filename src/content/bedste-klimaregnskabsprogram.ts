import type { Article } from './article'
import { FREE_START_CTA } from './cta'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET } from './sammenligning/data'

export const artikel: Article = {
  slug: 'bedste-klimaregnskabsprogram',
  title: 'Bedste klimaregnskabsprogram 2026: sådan vælger en dansk SMV',
  seoTitle: 'Bedste klimaregnskabsprogram 2026: sådan vælger du',
  description:
    'Sådan vælger en dansk SMV klimaregnskabsprogram i 2026: otte danske programmer sammenlignet, plus de store platforme, Klimakompasset og Excel.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 10,
  sections: [
    {
      type: 'lead',
      text: `Der findes ikke ét bedste klimaregnskabsprogram: det rigtige afhænger af jeres regnskabssystem, jeres rapportkrav og om I vil have hjælp. For en dansk SMV med bogføring i e-conomic, Dinero eller Billy er qlim8 værd at undersøge først, og Grønlog og EcoMetrics er de nærmeste sammenligninger. Bruger I Business Central, Uniconta eller E-Komplet, er Verarca og EcoMetrics relevante, og vil I have en leverandør til at drive projektet eller lave rapporten, er Wardn, esgBRICKS og Verarcas servicepakke det.`,
    },
    {
      type: 'paragraph',
      text: `Kort sagt passer programmerne til hver deres situation:`,
    },
    {
      type: 'list',
      items: [
        `Gratis start med e-conomic, Dinero eller Billy: qlim8, Grønlog og EcoMetrics har alle en gratis plan eller pakke.`,
        `Business Central, Uniconta eller E-Komplet: Verarca og EcoMetrics nævner dem på deres integrationssider, og E-SG.cloud nævner Business Central.`,
        `En leverandør, der driver ESG-projektet eller laver rapporten: Wardn Core, esgBRICKS og Verarcas Managed Carbon Service.`,
        `En platform, som revisor eller konsulent bruger til flere klienter: qlim8's gratis Revisor- og Konsulent-konti og E-SG.cloud.`,
        `Hurtigt en VS Basis-rapport med branchebenchmark til banken: Valified.`,
        `CSRD-pligt, krav om SOC 2 eller ISO 27001, eller selskaber i flere lande: en stor international platform.`,
        `Klimaregnskab uden et betalt program: Klimakompasset eller et regneark i Excel.`,
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
        `Regnskabssystem: Programmet skal kunne hente data fra det system, I bruger. qlim8 og Grønlog nævner e-conomic, Dinero og Billy. Verarca nævner e-conomic, Uniconta, Business Central og E-Komplet. EcoMetrics nævner e-conomic, Dinero, Uniconta, Billy, Business Central og flere. E-SG.cloud nævner e-conomic og Business Central. Wardn, Valified og esgBRICKS nævner ingen regnskabssystemer.`,
        `Rapportniveau: Spørg banken og kunderne, om de beder om VS Basis (tidligere VSME), VS Udvidet eller ESRS. qlim8, Verarca, EcoMetrics og E-SG.cloud oplyser VS Udvidet, hos Verarca som tilkøb, og esgBRICKS' eksempelrapport viser oplysninger fra det udvidede modul. Grønlog, Wardn og Valified oplyser ikke VS Udvidet.`,
        `Scope 3: Scope 3 er udledningen i værdikæden. qlim8, Verarca, Grønlog, EcoMetrics og esgBRICKS dækker scope 3, og E-SG.cloud gør det gennem partnerberegnere. Valified oplyser ikke scope 3.`,
        `Hjælp og revisor: Vil I selv køre programmet eller have en person til at gennemgå data? Verarca, Wardn, Valified og E-SG.cloud har rådgivning eller hjælp, og hos esgBRICKS er hele rapporten en service. qlim8 har ingen indbygget konsulentydelse, men gratis konti til jeres egen revisor og konsulent. EcoMetrics giver revisor læseadgang på Plus og Pro.`,
        `Pris og gratis start: Sammenlign den samlede årspris, og se, hvad en gratis plan dækker. Tabellen herunder viser priserne, som leverandørerne oplyser dem.`,
      ],
    },

    { type: 'h2', text: 'De danske klimaregnskabsprogrammer side om side' },
    {
      type: 'paragraph',
      text: `Tabellen viser, hvad de otte danske programmer selv oplyser på deres hjemmesider, og datoen står under tabellen. Ikke oplyst betyder, at leverandøren ikke nævner det, ikke at den mangler det.`,
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'De otte danske programmer kort' },
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
      html: `<p><a href="/blog/verarca-alternativ">Verarca</a> er det bedste valg, hvis I bruger Business Central, Uniconta eller E-Komplet, eller vil have en person til at gennemgå jeres data i Managed Carbon Service. Der er ingen gratis plan på prissiden.</p>`,
    },

    { type: 'h3', text: 'Grønlog' },
    { type: 'paragraph', text: KORT_OM.gronlog },
    {
      type: 'richtext',
      html: `<p><a href="/blog/gronlog-alternativ">Grønlog</a> passer, hvis I vil starte gratis med scope 1 og 2 uden integrationer, eller har brug for en leverandørportal, som ligger i Professional-planen. Programmet har også et scenarie- og målsætningsmodul, mens scope 3 og den fulde VS-rapport ligger i de betalte planer.</p>`,
    },

    { type: 'h3', text: 'EcoMetrics' },
    { type: 'paragraph', text: KORT_OM.ecometrics },
    {
      type: 'richtext',
      html: `<p><a href="/blog/ecometrics-alternativ">EcoMetrics</a> er den danske leverandør, der ligner qlim8 mest, og det bedste valg, hvis I bruger Business Central, e-komplet, Visma Business NXT eller EG Xena, eller vil have en VS-rapport allerede i en gratis plan. Platformen har også VS Udvidet, reduktionsmål, dobbelt væsentlighedsanalyse og læseadgang for revisor.</p>`,
    },

    { type: 'h3', text: 'Wardn' },
    { type: 'paragraph', text: KORT_OM.wardn },
    {
      type: 'richtext',
      html: `<p><a href="/blog/wardn-alternativ">Wardn</a> er en guidet ESG-rapport med hjælp, ikke et klimaregnskab, der beregnes fra bogføringen, og det er en anden slags produkt end de øvrige. Det passer, hvis I vil have en leverandør til at facilitere projektet i Core, eller skal indsamle ESG-data fra leverandører og datterselskaber i Enterprise.</p>`,
    },

    { type: 'h3', text: 'Valified' },
    { type: 'paragraph', text: KORT_OM.valified },
    {
      type: 'richtext',
      html: `<p><a href="/blog/valified-alternativ">Valified</a> er det rigtige valg, hvis I hurtigt skal have en VS Basis-rapport og vil sammenligne jer med branchen. Scoren går fra 1 til 100 mod branchen på 13 forhold, der vises et potentiale i kroner, og rapporten kan deles med banken. Scope 3, regnskabsintegrationer og VS Udvidet oplyses ikke.</p>`,
    },

    { type: 'h3', text: 'esgBRICKS' },
    { type: 'paragraph', text: KORT_OM.esgbricks },
    {
      type: 'richtext',
      html: `<p><a href="/blog/esgbricks-alternativ">esgBRICKS</a> er det rigtige valg, hvis I hellere vil købe arbejdet end et program: en fast kontaktperson laver den årlige VS-rapport for jer, og esgBRICKS skriver, at I kun betaler, hvis I er tilfredse med rapporten. esgBRICKS oplyser ikke regnskabsintegrationer, Eloverblik eller en gratis plan.</p>`,
    },

    { type: 'h3', text: 'E-SG.cloud' },
    { type: 'paragraph', text: KORT_OM.esgcloud },
    {
      type: 'richtext',
      html: `<p><a href="/blog/esg-cloud-alternativ">E-SG.cloud</a> passer bedst, hvis I er revisor, konsulent eller forhandler og vil give jeres kunder en ESG-platform under eget brand med et overblik over alle klienter. Platformen har VS Basis og VS Udvidet i alle pakker, revisionsspor i Pro og CSRD og testadgang i 14 dage.</p>`,
    },

    { type: 'h3', text: 'Climaider' },
    {
      type: 'richtext',
      html: `<p>Climaider ApS er ifølge CVR-registret erklæret konkurs den 20. oktober 2026 og er derfor ikke med i tabellen. Har I brugt <a href="/blog/climaider-alternativ">Climaider</a>, kan I læse, hvad I skal sikre nu, og hvilket tilbud qlim8 har til Climaider-kunder.</p>`,
    },

    { type: 'h2', text: 'Klimaregnskab uden et betalt program' },
    { type: 'h3', text: 'Klimakompasset' },
    {
      type: 'paragraph',
      text: `Klimakompasset er Erhvervsstyrelsens gratis, offentlige værktøj til klimaregnskab, udviklet sammen med Energistyrelsen. I taster selv aktivitetsdata ind og får scope 1, 2 og 3 opgjort med Energistyrelsens emissionsfaktorer, men ingen VS-rapport.`,
    },
    {
      type: 'richtext',
      html: `<p>Har I brugt <a href="/blog/klimakompasset-alternativ">Klimakompasset</a>, kan I læse, hvad det næste skridt er, og hvorfor tallene bygger på samme grundlag.</p>`,
    },
    { type: 'h3', text: 'Excel' },
    {
      type: 'paragraph',
      text: `Et klimaregnskab kan laves i Excel med Energistyrelsens emissionsfaktorer, Energinets deklarationer og EFRAG's Excel-skabelon til VS-rapporten.`,
    },
    {
      type: 'richtext',
      html: `<p>Guiden til <a href="/blog/klimaregnskab-excel">klimaregnskab i Excel</a> viser, hvad regnearket skal indeholde, hvor det knækker, og hvordan I går videre uden at miste arbejdet.</p>`,
    },

    { type: 'h2', text: 'Hvad med de store internationale klimaplatforme?' },
    {
      type: 'richtext',
      html: `<p>Har I CSRD-pligt, en køber der kræver SOC 2 eller ISO 27001, eller selskaber i flere lande, så er <a href="/blog/store-klimaplatforme-sammenlignet">de internationale platforme</a> Watershed, Position Green, Greenly, Persefoni, Coolset, Terrascope og Plan A det rigtige sted at sammenligne.</p>`,
    },
    {
      type: 'paragraph',
      text: `Ud fra de oplyste priser koster de ca. 45.000 kr. til over en million kroner om året, hvor Persefoni Pro er gratis for én bruger. Position Green og Plan A offentliggør ikke priser, og deres priser er estimeret til ca. 50.000 til 150.000 kr. og ca. 50.000 til 250.000 kr. om året. qlim8 har ikke ISO 27001 eller SOC 2, så kræver jeres køber det, skal I også kigge her.`,
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
      text: `De danske programmer har gratis planer eller betalte planer til priser på måneds- og årsbasis, mens de store internationale platforme koster ca. 45.000 kr. om året og derover. Verarca oplyser 299 kr. om måneden betalt årligt for scope 1 og 2 hos mikrovirksomheder, Grønlog 590 og 1.490 kr. om måneden, EcoMetrics 4.950 og 11.950 kr. om året ekskl. moms, Valified 1.290 kr. om året, E-SG.cloud 999 og 1.999 kr. om måneden ekskl. moms og esgBRICKS' service 14.999 kr. om året ekskl. moms.`,
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
