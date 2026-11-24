import type { Article } from './article'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET, VAELG } from './sammenligning/data'
import { DEMO_HREF, DEMO_LABEL } from './cta'

export const artikel: Article = {
  slug: 'wardn-alternativ',
  title: 'Wardn alternativ: qlim8 og Wardn sammenlignet',
  seoTitle: 'Wardn alternativ: pris, ESG-rapport og qlim8 sammenlignet',
  description:
    'Wardn eller qlim8? Wardn hjælper med ESG-projektet mod et implementeringsgebyr. qlim8 beregner klimaregnskabet fra bogføringen. Se forskellene.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'Wardn er en dansk ESG-platform, der guider jer gennem en ESG-rapport, og hvor Core-planen giver hjælp til hele projektet og til dataindsamlingen. Wardn Lite og Core koster hver €200 om måneden, plus et engangsgebyr på €1.200 for Lite og €3.600 for Core, og Wardn Free koster €0 om måneden plus et engangsgebyr på €1.600. qlim8 er en anden slags produkt og værd at undersøge først, hvis I vil have klimaregnskabet beregnet fra bogføringen og elforbruget, med en gratis pakke uden udløbsdato.',
    },

    { type: 'h2', text: 'Hvad er Wardn, og hvem passer platformen til?' },
    {
      type: 'paragraph',
      text: 'Wardn er en ESG-platform, der guider en virksomhed gennem en ESG-rapport. Wardn skriver selv, at platformen er bygget specifikt til VSME-rammeværket, som i dag hedder VS.',
    },
    {
      type: 'paragraph',
      text: 'Wardn har fire planer: Free, Lite, Core og Enterprise. Free er helt selvbetjent. Til Lite og Core skal I tale med Wardns salg. Core giver fuld facilitering af projektet og hjælp til dataindsamling. Enterprise er til virksomheder, der selv skal samle ESG-data fra datterselskaber og leverandører, og Wardn nævner API-integrationer og sporbarhed af de indsamlede data i den plan.',
    },
    {
      type: 'paragraph',
      text: 'Wardn beskriver kun en del af platformens funktioner offentligt, så flere felter i tabellen længere nede står som ikke oplyst. Wardn oplyser ikke på sin hjemmeside, at platformen beregner scope 1 og 2, og Wardn nævner ingen regnskabsintegrationer. Det er ikke en mangel. Wardn er en anden slags produkt: en guidet rapport med hjælp, ikke et klimaregnskab, der beregnes fra bogføringen.',
    },
    {
      type: 'richtext',
      html:
        '<ul>' +
        '<li>Vælg Wardn, hvis I vil have en leverandør til at facilitere hele ESG-projektet og hjælpe med dataindsamlingen. Det er indholdet i Wardn Core.</li>' +
        '<li>Vælg Wardn, hvis I er en større virksomhed, der selv skal samle ESG-data fra datterselskaber og leverandører. Det er indholdet i Wardn Enterprise.</li>' +
        '<li>Vælg Wardn, hvis I vil starte selv i den selvbetjente Free-plan og først senere tale med salg.</li>' +
        '</ul>',
    },

    { type: 'h2', text: 'Hvad er forskellen på Wardn og qlim8?' },
    {
      type: 'paragraph',
      text: 'Wardn er en guidet ESG-rapport med hjælp, mens qlim8 er et klimaregnskab, der beregnes fra bogføringen og elforbruget.',
    },

    { type: 'h3', text: 'Guidet rapport eller beregnet klimaregnskab' },
    {
      type: 'paragraph',
      text: 'Wardn leder jer gennem spørgsmålene i en ESG-rapport og hjælper med at få svarene på plads. qlim8 beregner udledningen i scope 1, 2 og 3 ud fra jeres fakturaer og jeres elforbrug og bygger rapporterne ovenpå: VS Basis, VS Udvidet og ESRS-rapportering. Har I ikke brug for et løbende klimaregnskab, men skal have en rapport igennem som et projekt, er Wardns model en reel mulighed.',
    },

    { type: 'h3', text: 'Hvor tallene kommer fra' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 henter <a href="/integrationer/e-conomic">fakturaerne fra e-conomic</a>, Dinero og Billy og elforbruget fra Eloverblik. Eloverblik kobles med en fuldmagt via MitID og hentes hver uge. Data fra andre systemer kommer ind som Excel eller CSV. ' +
        'Wardn nævner ingen regnskabsintegrationer og oplyser ikke Eloverblik på sin hjemmeside. Hos Wardn kommer data derfor ind gennem platformens spørgsmål og dataindsamlingen, ikke ved at læse bogføringen.</p>',
    },

    { type: 'h3', text: 'Sporbarhed og revisor' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 har <a href="/produkt/audit-trail-og-revisor">audit trail på hver beregning</a> med input, emissionsfaktor og kilde, og jeres revisor kan få direkte adgang med en gratis Revisor-konto. ' +
        'Wardn nævner sporbarhed af de indsamlede ESG-data i Enterprise-planen og oplyser ikke en særskilt adgang for revisor på sin hjemmeside.</p>',
    },

    { type: 'h3', text: 'Leverandører og datterselskaber: Wardn Enterprise' },
    {
      type: 'paragraph',
      text: 'Wardn Enterprise har indsamling af ESG-data fra datterselskaber og leverandører, og det er Wardns fordel. qlim8 henter hele værdikæden via CVR-numre, men qlim8s egentlige leverandørportal er planlagt og ikke færdig. Skal jeres leverandører og datterselskaber selv svare i en portal i dag, passer Wardn Enterprise bedre.',
    },

    { type: 'h3', text: 'Hjælp og pris' },
    {
      type: 'richtext',
      html:
        '<p>Wardn Core giver facilitering af projektet mod et engangsgebyr på €3.600 plus €200 om måneden. qlim8 er software, I selv bruger, og har ingen indbygget konsulentydelse. Hjælpen kommer fra jeres egen revisor eller rådgiver, som får en gratis konto. ' +
        'qlim8 har en gratis pakke uden udløbsdato. <a href="/priser">Gratis-pakken</a> dækker scope 1, 2 og 3 med Eloverblik og ét regnskabsprogram. ' +
        '[[Basis koster {pris:starter} om måneden, betalt årligt og ekskl. moms.]] Priserne for de øvrige pakker står på prissiden.</p>',
    },

    { type: 'h3', text: 'Hvad Wardn koster det første år' },
    {
      type: 'paragraph',
      text: 'Det første år koster Wardn Core €6.000, hvis I betaler €200 om måneden i tolv måneder plus engangsgebyret på €3.600. Wardn Lite koster €3.600 det første år på samme måde, med engangsgebyret på €1.200. Wardn Free koster €1.600 i engangsgebyr og €0 om måneden. Wardn oplyser ikke prisen på Enterprise på sin hjemmeside.',
    },

    { type: 'h2', text: 'Hvornår er Wardn det rigtige valg, og hvornår er qlim8?' },
    {
      type: 'paragraph',
      text: 'Wardn er det rigtige valg, når I har brug for en person til at drive ESG-projektet og ikke har tid til selv at samle tallene. Wardn er også det rigtige valg, hvis I skal indsamle ESG-data fra datterselskaber og leverandører i en platform.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 er det rigtige valg, når jeres bogføring ligger i e-conomic, Dinero eller Billy, og I vil have klimaregnskabet beregnet fra fakturaerne uden et projektforløb. qlim8 er også det rigtige valg, hvis I vil begynde gratis, lade jeres revisor se med i appen og bygge en VS-rapport ovenpå tallene. Skal jeres rapport hænge på en rådgiver, der gør arbejdet for jer, er det Wardn, I skal tale med.',
    },

    {
      type: 'cta',
      heading: 'Vil I se, hvordan jeres tal ser ud i qlim8?',
      text: 'Book en demo, så gennemgår vi platformen ud fra jeres egen situation, eller ring på +45 93 90 13 84.',
      buttonText: DEMO_LABEL,
      buttonHref: DEMO_HREF,
    },

    { type: 'h2', text: 'Hvordan ser Wardn ud ved siden af de andre danske programmer?' },
    {
      type: 'richtext',
      html:
        '<p>Tabellen sammenligner Wardn med qlim8 og <a href="/blog/bedste-klimaregnskabsprogram">fire andre danske programmer</a>. Hvor en leverandør ikke oplyser noget på sin hjemmeside, står der Ikke oplyst, og det er ikke det samme som nej.</p>',
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
    { type: 'h3', text: 'Valified' },
    { type: 'paragraph', text: KORT_OM.valified },
    { type: 'paragraph', text: VAELG.valified },

    { type: 'h2', text: 'Sådan skifter I fra Wardn til qlim8' },
    {
      type: 'paragraph',
      text: 'Fra Wardn flytter I ikke klimatallene, I beregner dem igen fra kilden og genbruger teksten fra jeres ESG-rapport. De fleste trin er eksport og upload.',
    },
    {
      type: 'richtext',
      html:
        '<ol>' +
        '<li>Hent jeres ESG-rapport ud af Wardn i det format, Wardn tilbyder.</li>' +
        '<li>Saml de tal, I indberettede, for eksempel energi, brændstof og medarbejdere.</li>' +
        '<li>Forbind regnskabsprogram og Eloverblik i qlim8, så klimadelen beregnes fra bilagene.</li>' +
        '<li>Kopiér jeres beskrivelser af politikker og tiltag ind i <a href="/produkt/vsme-rapport">rapport-guiden</a> i qlim8.</li>' +
        '<li>Tjek jeres aftale med Wardn for, hvornår den kan opsiges, før I skifter.</li>' +
        '</ol>',
    },

    { type: 'h2', text: 'Ofte stillede spørgsmål om Wardn' },
    { type: 'h3', text: 'Hvad koster Wardn?' },
    {
      type: 'paragraph',
      text: 'Wardn Lite og Core koster hver €200 om måneden plus et engangsgebyr for implementering på €1.200 for Lite og €3.600 for Core.',
    },
    { type: 'h3', text: 'Har Wardn en gratis plan?' },
    {
      type: 'paragraph',
      text: 'Ja, Wardn Free koster €0 om måneden, men har et engangsgebyr på €1.600.',
    },
    { type: 'h3', text: 'Hvad får man i Wardn Core?' },
    {
      type: 'paragraph',
      text: 'Wardn Core giver fuld facilitering af projektet og hjælp til dataindsamling.',
    },
    { type: 'h3', text: 'Kan Wardn hente data fra e-conomic?' },
    {
      type: 'paragraph',
      text: 'Wardn nævner ikke regnskabsintegrationer, hverken e-conomic eller andre, på sin hjemmeside.',
    },
    { type: 'h3', text: 'Hvad er forskellen på Wardn og qlim8?' },
    {
      type: 'paragraph',
      text: 'Wardn er en guidet ESG-rapport med hjælp, mens qlim8 beregner klimaregnskabet fra bogføringen og elforbruget, med en gratis pakke uden udløbsdato.',
    },
  ],
}
