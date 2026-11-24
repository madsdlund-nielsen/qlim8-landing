import type { Article } from './article'
import { FREE_START_CTA } from './cta'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'

export const artikel: Article = {
  slug: 'verarca-alternativ',
  title: 'Verarca alternativ: qlim8 og Verarca sammenlignet',
  seoTitle: 'Verarca alternativ: pris, funktioner og qlim8 sammenlignet',
  description:
    'Verarca eller qlim8? Pris, integrationer, VS-rapport og service sammenlignet, og en ærlig vurdering af, hvornår Verarca er det bedste valg for jer.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'Verarca og qlim8 er begge danske klimaregnskaber, der bygger på jeres bogføring. Verarca er det rigtige valg, hvis I bruger Business Central, Uniconta eller E-Komplet, eller hvis I vil have Managed Carbon Service, hvor I får rådgivning fra en person hos Verarca.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 er værd at undersøge først, hvis I bruger Dinero eller Billy, vil starte med en gratis pakke uden udløbsdato, eller skal bruge dobbelt væsentlighedsanalyse og ESRS-rapportering i samme program. Begge programmer forbinder til e-conomic og henter elforbrug fra Eloverblik.',
    },

    { type: 'h2', text: 'Hvad er Verarca, og hvem passer det til?' },
    {
      type: 'paragraph',
      text: 'Verarca er et dansk klimaregnskab og en ESG-rapport, der bygger på data fra bogføringen og har integrationer til e-conomic, Uniconta, Business Central og E-Komplet.',
    },
    {
      type: 'paragraph',
      text: 'Verarcas laveste offentlige pris er 299 kr. om måneden betalt årligt, ekskl. moms, for scope 1 og 2 hos mikrovirksomheder. Prisen afhænger af virksomhedens regnskabsklasse og af, om scope 3 er med. Managed Carbon Service koster 499 kr. om måneden betalt årligt i samme gruppe.',
    },
    {
      type: 'paragraph',
      text: 'VS (tidligere VSME) er EU\'s frivillige rapporteringsstandard for mindre virksomheder. Verarca sælger VS-rapporten som to tilkøb, Basismodulet (VSME) og Comprehensive-modulet (VSME).',
    },
    { type: 'h3', text: 'Vælg Verarca, hvis I ...' },
    {
      type: 'list',
      items: [
        'bruger Business Central, Uniconta eller E-Komplet og vil have en integration til netop det system. qlim8\'s testede integrationer er e-conomic, Dinero og Billy, og Uniconta er i beta.',
        'vil have Managed Carbon Service, hvor I får rådgivning fra en person hos Verarca. qlim8 har ingen indbygget konsulentydelse.',
        'vil have en offentlig pris, der følger jeres regnskabsklasse.',
        'arbejder mod SBTi og vil have et dokumenteret datagrundlag. Verarca oplyser datagrundlag til SBTi-arbejdet, mens SBTi-mål er planlagt hos qlim8.',
      ],
    },

    { type: 'h2', text: 'Hvad er forskellen på Verarca og qlim8?' },
    {
      type: 'paragraph',
      text: 'Det regnskabssystem, I bruger i dag, afgør det meste af valget mellem Verarca og qlim8. Bagefter kommer VS-rapporten, rådgivningen og væsentlighedsanalysen.',
    },
    { type: 'h3', text: 'Hvilke regnskabssystemer forbinder Verarca og qlim8 til?' },
    {
      type: 'richtext',
      html: '<p>Verarca forbinder til e-conomic, Uniconta, Business Central og E-Komplet, og qlim8 forbinder til <a href="/integrationer">e-conomic, Dinero og Billy</a>, med Uniconta i beta. Verarca oplyser ikke en integration til Dinero eller Billy på sin hjemmeside. qlim8 har ikke en testet integration til Business Central eller E-Komplet. Begge forbinder til e-conomic.</p>',
    },
    { type: 'h3', text: 'Hvordan får I en VS-rapport hos Verarca og hos qlim8?' },
    {
      type: 'richtext',
      html: '<p>Verarca sælger VS-rapporten som tilkøb til klimaregnskabet, og qlim8 laver rapporterne i platformen. qlim8 laver rapporter efter <a href="/produkt/vsme-rapport">VS Basis og VS Udvidet</a>, den udvidede del af standarden, og Verarca sælger begge niveauer som hvert sit modul. Hvad qlim8\'s pakker indeholder, står på /priser.</p>',
    },
    { type: 'h3', text: 'Hvem kigger på tallene hos Verarca og hos qlim8?' },
    {
      type: 'richtext',
      html: '<p>Verarca har Managed Carbon Service med en person, og qlim8 giver gratis adgang til jeres egne rådgivere. qlim8 har ingen indbygget konsulentydelse, men giver <a href="/produkt/audit-trail-og-revisor">jeres egen revisor</a> eller konsulent en gratis konto med direkte adgang til beregningerne. Verarca oplyser ikke en særskilt revisoradgang på sin hjemmeside.</p>',
    },
    {
      type: 'paragraph',
      text: 'Begge viser, hvordan hvert tal er beregnet. Verarca viser beregningsmetode og datakilde på hvert tal, og qlim8 viser input, emissionsfaktor og kilde i en audit trail på hver beregning.',
    },
    { type: 'h3', text: 'Hvem har dobbelt væsentlighedsanalyse og ESRS?' },
    {
      type: 'paragraph',
      text: 'qlim8 har dobbelt væsentlighedsanalyse og ESRS-rapportering i appen, og Verarca oplyser ingen af delene på sin hjemmeside. qlim8 kan også kryds-mappe væsentlighedsanalysen til ESRS, IFRS, GRI og CDP. Skal I bruge væsentlighedsanalysen i et regnskab for en kunde eller en bank, er det en forskel, der tæller.',
    },
    { type: 'h3', text: 'Hvad med elforbrug og klimamål?' },
    {
      type: 'richtext',
      html: '<p>Verarca og qlim8 henter begge elforbrug fra Eloverblik, så det er ikke en forskel. qlim8 henter <a href="/integrationer/eloverblik">elforbruget time for time fra Eloverblik</a> efter fuldmagt med MitID. Verarca har reduktionsmål i sit dashboard, og qlim8 har mål på kategorier og hele scopes, intensitetsmål, business-as-usual og planlinje samt tiltag og overgangsplan.</p>',
    },
    { type: 'h3', text: 'Hvad koster Verarca sammenlignet med qlim8?' },
    {
      type: 'paragraph',
      text: 'Verarcas laveste offentlige pris er 299 kr. om måneden betalt årligt, ekskl. moms, og qlim8 har en gratis pakke uden udløbsdato, der dækker scope 1, 2 og 3 med Eloverblik og ét regnskabsprogram. [[Basis koster {pris:starter} om måneden, betalt årligt og ekskl. moms.]] Verarca oplyser ikke en gratis plan på sin hjemmeside. Priserne er ikke direkte sammenlignelige, fordi Verarcas pris følger regnskabsklassen, og qlim8\'s pakker har forskelligt indhold. Pakkerne og priserne står på /priser.',
    },
    {
      type: 'cta',
      heading: 'Se jeres egne tal, før I vælger',
      text: 'Opret en gratis konto, forbind jeres regnskabsprogram, og se klimaregnskabet bygget på jeres egne bilag.',
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Verarca og qlim8 i en samlet sammenligning' },
    {
      type: 'richtext',
      html: '<p>Tabellen sætter Verarca og qlim8 op mod <a href="/blog/bedste-klimaregnskabsprogram">fire andre danske programmer</a>, og den viser, hvad hver leverandør selv oplyser på sin hjemmeside. Et felt, der står som ikke oplyst, betyder, at leverandøren ikke nævner funktionen, ikke at den mangler.</p>',
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'Kort om de andre programmer i tabellen' },
    { type: 'h3', text: 'qlim8' },
    { type: 'paragraph', text: KORT_OM.qlim8 },
    { type: 'paragraph', text: VAELG.qlim8 },
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

    { type: 'h2', text: 'Sådan skifter I fra Verarca til qlim8' },
    {
      type: 'paragraph',
      text: 'Et skifte fra Verarca består af at gemme jeres tal, forbinde bogføringen i qlim8 og sige abonnementet op i tide. De fleste trin er eksport og upload.',
    },
    {
      type: 'ordered-list',
      items: [
        'Gem jeres resultater og den seneste rapport fra Verarca, så I har jeres basisår.',
        'Opret en gratis konto i qlim8, og forbind e-conomic, Dinero eller Billy.',
        'Bruger I Business Central eller E-Komplet, uploader I posteringerne som Excel eller CSV, fordi qlim8\'s testede integrationer er e-conomic, Dinero og Billy.',
        'Giv qlim8 fuldmagt til Eloverblik med MitID, og brug Verarca-tallene for basisåret som udgangspunkt for jeres reduktionsmål.',
        'Sig Verarca op i tide, og lad de to programmer køre side om side, til perioden udløber.',
      ],
    },
    {
      type: 'paragraph',
      text: 'Verarcas abonnement tegnes for 12 måneder, og opsigelse kræver mindst 90 dages varsel til udgangen af abonnementsperioden. Har I Managed Carbon Service, følger rådgivningen ikke med til qlim8. Jeres egen revisor eller konsulent kan i stedet få en gratis konto.',
    },

    { type: 'h2', text: 'Spørgsmål om Verarca' },
    { type: 'h3', text: 'Hvad koster Verarca?' },
    {
      type: 'paragraph',
      text: 'Verarcas laveste offentlige pris er 299 kr. om måneden betalt årligt (3.588 kr. om året ekskl. moms) for scope 1 og 2 hos mikrovirksomheder. Prisen afhænger af regnskabsklasse og af, om scope 3 er med, og VS-modulerne er tilkøb.',
    },
    { type: 'h3', text: 'Har Verarca en gratis plan?' },
    {
      type: 'paragraph',
      text: 'Verarca oplyser ikke en gratis plan på sin hjemmeside. qlim8 har en gratis pakke uden udløbsdato.',
    },
    { type: 'h3', text: 'Hvilke regnskabssystemer virker med Verarca?' },
    {
      type: 'paragraph',
      text: 'Verarca nævner e-conomic, Uniconta, Business Central og E-Komplet på sin integrationsside. Verarca oplyser ikke en integration til Dinero eller Billy.',
    },
    { type: 'h3', text: 'Kan Verarca lave en VS-rapport?' },
    {
      type: 'paragraph',
      text: 'Ja, Verarca tilbyder Basismodulet (VSME) og Comprehensive-modulet (VSME) som tilkøb til klimaregnskabet.',
    },
    { type: 'h3', text: 'Hvad er forskellen på Verarca og qlim8?' },
    {
      type: 'paragraph',
      text: 'Verarca har integrationer til Business Central, Uniconta og E-Komplet og tilbyder Managed Carbon Service med en person, mens qlim8 forbinder e-conomic, Dinero og Billy, har dobbelt væsentlighedsanalyse og ESRS-rapportering i appen og har en gratis pakke uden udløbsdato.',
    },
  ],
}
