import type { Article } from './article'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'
import { DEMO_HREF, DEMO_LABEL } from './cta'

export const artikel: Article = {
  slug: 'esg-cloud-alternativ',
  title: 'E-SG.cloud alternativ: qlim8 og E-SG.cloud sammenlignet',
  seoTitle: 'ESG Cloud alternativ: E-SG.cloud, pris og qlim8 sammenlignet',
  description:
    'E-SG.cloud (ESG Cloud) eller qlim8? Den ene er bygget til revisorer og konsulenter, den anden til virksomheden med gratis rådgiverkonti. Se forskellene.',
  category: 'Sammenligning',
  publishedAt: '2026-11-24',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'E-SG.cloud, som mange skriver ESG Cloud, er en dansk ESG-platform bygget til revisorer, konsulenter og forhandlere, som også sælger pakker til VS og CSRD direkte til virksomheder. VSME Starter koster 999 kr. om måneden og VSME Advanced 1.999 kr. om måneden ekskl. moms. qlim8 er bygget til, at virksomheden selv har klimaregnskabet fra bogføringen, mens revisor og konsulent får gratis konti. Er I en virksomhed på e-conomic, Dinero eller Billy, er qlim8 værd at undersøge først, og er I et rådgiverhus, der vil tilbyde en platform under eget brand, er E-SG.cloud bygget til det.',
    },

    { type: 'h2', text: 'Hvad er E-SG.cloud, og hvem passer platformen til?' },
    {
      type: 'paragraph',
      text: 'E-SG.cloud er en modulær ESG-platform fra en dansk softwarevirksomhed, der blev etableret i 2022, og som rådgivere kan bruge til deres kunder og forhandlere kan tilbyde under eget brand.',
    },
    {
      type: 'paragraph',
      text: 'E-SG.cloud har fire pakker: VSME Starter til 999 kr. om måneden, VSME Advanced til 1.999 kr. om måneden, VSME Pro og CSRD. Priserne er ekskl. moms, og Pro og CSRD prissættes efter tilbud. E-SG.cloud bruger stadig det gamle navn VSME i pakkenavnene, mens standarden i dag hedder VS. Under alle fire pakker står knappen Kontakt salg, og E-SG.cloud tilbyder testadgang i 14 dage.',
    },
    {
      type: 'paragraph',
      text: 'Alle pakker har begge VS-moduler (Basis og Udvidet), en skabelon og vejledning til dobbelt væsentlighedsanalyse, ubegrænset antal brugere, tre enheder og seks sprog. Flere enheder kan tilkøbes for 499 kr. pr. enhed om måneden. CSRD-pakken guider gennem ESRS-datapunkterne.',
    },
    {
      type: 'paragraph',
      text: 'E-SG.cloud beregner scope 1 og 2 med en manuel CO2-beregner i alle pakker. Scope 3 beregnes gennem partnerberegnere: Groundly fra Advanced og Verarca og Catalysta fra Pro. E-SG.cloud kobler til e-conomic og Business Central og har et åbent API. Revisionsspor, change log og XBRL-eksport er med i Pro og CSRD. Data ligger hos Microsoft Azure i Sverige.',
    },
    {
      type: 'richtext',
      html:
        '<ul>' +
        '<li>Vælg E-SG.cloud, hvis I er et revisions- eller rådgivningshus, der vil tilbyde jeres kunder en ESG-platform under eget brand med et dashboard over alle klienter.</li>' +
        '<li>Vælg E-SG.cloud, hvis I er en kæde eller koncern, hvor hver enhed skal have sit eget login og taste sine egne data.</li>' +
        '<li>Vælg E-SG.cloud, hvis I skal bruge XBRL-eksport eller en CSRD-pakke i samme platform som VS-rapporten.</li>' +
        '<li>Vælg E-SG.cloud, hvis I bruger Business Central og vil have det koblet på CO2-beregningen.</li>' +
        '</ul>',
    },

    { type: 'h2', text: 'Hvem er køberen: virksomheden eller rådgiveren?' },
    {
      type: 'paragraph',
      text: 'Den største forskel på E-SG.cloud og qlim8 er, hvem platformen er bygget til at blive købt af.',
    },
    {
      type: 'richtext',
      html:
        '<p>E-SG.cloud er bygget til, at revisorer og konsulenter arbejder med deres kunders ESG-data i et multiklient-dashboard, og rådgivere kan bruge platformen under eget brand. Virksomheder kan også købe direkte. ' +
        'I qlim8 har virksomheden sin egen konto med sine egne data, og revisor og konsulent får gratis Revisor- og Konsulent-konti, hvor de ser alle deres klienter i én portefølje. ' +
        'Vil I som rådgiver tilbyde en platform under eget navn, er E-SG.cloud bygget til det. Vil I som rådgiver arbejde i jeres klienters egne tal uden at betale for adgangen, passer qlim8s rådgiverkonti.</p>',
    },

    { type: 'h3', text: 'Hvor tallene kommer fra' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 beregner udledningen fra fakturaerne i e-conomic, Dinero og Billy og henter elforbruget fra Eloverblik hver uge, og data uden for bogføringen kommer ind som Excel eller CSV. ' +
        'E-SG.cloud har en manuel CO2-beregner til scope 1 og 2, kobler til e-conomic og Business Central og beregner scope 3 gennem partnere. E-SG.cloud oplyser ikke Eloverblik på sin hjemmeside.</p>',
    },

    { type: 'h3', text: 'VS, CSRD og rapportformater' },
    {
      type: 'richtext',
      html:
        '<p>Begge platforme har VS Basis og VS Udvidet. E-SG.cloud har en CSRD-pakke med ESRS-datapunkter, og qlim8 har ESRS-rapportering i appen. qlim8 har dobbelt væsentlighedsanalysen i appen, og E-SG.cloud har en skabelon og vejledning til den i alle pakker. ' +
        'E-SG.cloud har XBRL-eksport i Pro og CSRD, og qlim8 har ikke XBRL-eksport. Skal rapporten afleveres i XBRL, er det E-SG.cloud, der kan det.</p>',
    },

    { type: 'h3', text: 'Sporbarhed' },
    {
      type: 'paragraph',
      text: 'qlim8 har audit trail på hver beregning med input, emissionsfaktor og kilde. E-SG.cloud oplyser revisionsspor og change log i Pro og CSRD.',
    },

    { type: 'h3', text: 'API og AI-assistenter' },
    {
      type: 'richtext',
      html:
        '<p>Begge har et API. qlim8 har et REST API og en MCP-server med 31 værktøjer, så en AI-assistent kan læse og skrive i klimaregnskabet. ' +
        'E-SG.cloud beskriver et åbent API til ERP-, økonomi- og dataplatforme, men oplyser ikke en MCP-server og har ingen offentlig API-dokumentation på sin hjemmeside.</p>',
    },

    { type: 'h3', text: 'Hosting og sikkerhed' },
    {
      type: 'paragraph',
      text: 'E-SG.cloud har data hos Microsoft Azure i Sverige og skriver, at virksomheden er på vej til at opnå en ISO-certificering. qlim8 hoster hos Hetzner i Nürnberg i Tyskland og har hverken ISO 27001 eller SOC 2.',
    },

    { type: 'h3', text: 'Pris' },
    {
      type: 'richtext',
      html:
        '<p>E-SG.cloud koster 999 kr. om måneden for VSME Starter og 1.999 kr. om måneden for VSME Advanced ekskl. moms. Pro og CSRD prissættes efter tilbud, og der er testadgang i 14 dage. qlim8 har en gratis pakke uden udløbsdato, og Revisor- og Konsulent-konti er gratis. ' +
        '[[Basis koster {pris:starter} om måneden, betalt årligt og ekskl. moms.]]</p>',
    },

    { type: 'h2', text: 'Hvornår er E-SG.cloud det rigtige valg, og hvornår er qlim8?' },
    {
      type: 'paragraph',
      text: 'E-SG.cloud er det rigtige valg, når køberen er et rådgiverhus, der vil bruge og tilbyde platformen til mange kunder. E-SG.cloud er også det rigtige valg for en kæde med mange enheder, der hver skal have sit eget login, eller når I skal bruge XBRL-eksport, en CSRD-pakke eller en kobling til Business Central.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 er det rigtige valg, når virksomheden selv vil have klimaregnskabet beregnet fra bogføringen og elforbruget, og når jeres revisor eller konsulent skal arbejde i jeres tal uden at betale for adgangen. qlim8 er også det rigtige valg, hvis I vil starte gratis uden udløbsdato eller lade en AI-assistent skrive til klimaregnskabet. Er I rådgiver, kan I afprøve qlim8s rådgiverkonto og sammenligne den med dashboardet i E-SG.cloud på en rigtig klient.',
    },

    {
      type: 'cta',
      heading: 'Rådgiver eller virksomhed: se qlim8 med jeres egne tal',
      text: 'Book en demo, så viser vi både virksomhedens konto og rådgiverens portefølje med alle klienter, eller ring på +45 93 90 13 84.',
      buttonText: DEMO_LABEL,
      buttonHref: DEMO_HREF,
    },

    { type: 'h2', text: 'Hvordan ser E-SG.cloud ud ved siden af de andre danske programmer?' },
    {
      type: 'richtext',
      html:
        '<p>Tabellen sammenligner E-SG.cloud med qlim8 og seks andre danske programmer. Hvor en leverandør ikke oplyser noget på sin hjemmeside, står der Ikke oplyst, og det er ikke det samme som nej.</p>',
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
    { type: 'h3', text: 'esgBRICKS' },
    { type: 'paragraph', text: KORT_OM.esgbricks },
    { type: 'paragraph', text: VAELG.esgbricks },

    { type: 'h2', text: 'Sådan skifter I fra E-SG.cloud til qlim8' },
    {
      type: 'paragraph',
      text: 'Fra E-SG.cloud flytter I rapporterne og jeres tekster, og klimaregnskabet beregnes igen fra bilagene. De fleste trin er eksport og upload.',
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        '<li>Eksportér jeres rapporter fra E-SG.cloud i de formater, platformen tilbyder, for eksempel PDF eller Excel, og gem jeres væsentlighedsanalyse.</li>' +
        '<li>Opret en gratis konto i qlim8, og forbind e-conomic, Dinero eller Billy. Bruger I Business Central, uploader I posteringerne som Excel eller CSV.</li>' +
        '<li>Giv qlim8 fuldmagt til Eloverblik med MitID.</li>' +
        '<li>Indtast emnerne fra jeres væsentlighedsanalyse i qlim8s dobbelte væsentlighedsanalyse.</li>' +
        '<li>Er I rådgiver, opretter I en gratis Konsulent- eller Revisor-konto og samler jeres klienter i én portefølje.</li>' +
        '<li>Vilkårene hos E-SG.cloud siger 12 måneders abonnement og 3 måneders skriftligt varsel til udløbet af en abonnementsperiode, så planlæg skiftet efter det.</li>' +
        '</ol>',
    },

    { type: 'h2', text: 'Ofte stillede spørgsmål om E-SG.cloud' },
    { type: 'h3', text: 'Hvad koster ESG Cloud?' },
    {
      type: 'paragraph',
      text: 'E-SG.cloud koster 999 kr. om måneden for VSME Starter og 1.999 kr. om måneden for VSME Advanced ekskl. moms, og Pro og CSRD prissættes efter tilbud.',
    },
    { type: 'h3', text: 'Er ESG Cloud og E-SG.cloud det samme?' },
    {
      type: 'paragraph',
      text: 'Ja, ESG Cloud er den måde, mange skriver E-SG.cloud på, og platformen ligger på esgcloud.dk.',
    },
    { type: 'h3', text: 'Kan revisorer og konsulenter bruge E-SG.cloud til deres klienter?' },
    {
      type: 'paragraph',
      text: 'Ja, E-SG.cloud er bygget til revisorer og konsulenter, med et multiklient-dashboard og mulighed for at bruge platformen under eget brand.',
    },
    { type: 'h3', text: 'Har E-SG.cloud en gratis plan?' },
    {
      type: 'paragraph',
      text: 'E-SG.cloud tilbyder testadgang i 14 dage, og prissiden viser ingen gratis pakke.',
    },
    { type: 'h3', text: 'Hvad er forskellen på E-SG.cloud og qlim8?' },
    {
      type: 'paragraph',
      text: 'E-SG.cloud er bygget til, at rådgivere og forhandlere kan bruge og tilbyde platformen, mens qlim8 er bygget til, at virksomheden selv har klimaregnskabet fra bogføringen, og giver rådgiveren en gratis konto.',
    },
  ],
}
