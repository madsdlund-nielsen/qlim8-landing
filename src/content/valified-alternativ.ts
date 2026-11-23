import type { Article } from './article'
import { sammenligningstabel, opdateretLinje } from './sammenligning/byg'
import { DANSKE, FUNKTIONER, KORT_OM, OPDATERET } from './sammenligning/data'
import { FREE_START_CTA } from './cta'

export const artikel: Article = {
  slug: 'valified-alternativ',
  title: 'Valified alternativ: qlim8 og Valified sammenlignet',
  seoTitle: 'Valified alternativ: pris, VS Basis og qlim8 sammenlignet',
  description:
    'Valified eller qlim8? Valified laver en VS Basis-rapport med branchebenchmark. Se, hvornår I har brug for scope 3, integrationer eller VS Udvidet.',
  category: 'Sammenligning',
  publishedAt: '2026-11-23',
  readingTime: 8,
  sections: [
    {
      type: 'lead',
      text: 'Valified er et dansk værktøj, der laver en ESG-rapport efter VS Basis og sammenligner jeres virksomhed med branchen. Valified Fundament koster 1.290 kr. om året, Fremdrift koster 7.990 kr. om året, og Komplet Fundament koster 5.990 kr. inklusive ét års abonnement. Valified er det bedste valg, hvis I hurtigt og billigt skal have en rapport og en branchesammenligning. qlim8 er værd at undersøge først, hvis klimaregnskabet også skal omfatte scope 3, bygges fra bogføringen og elforbruget eller skal række til VS Udvidet.',
    },

    { type: 'h2', text: 'Hvad er Valified, og hvem passer værktøjet til?' },
    {
      type: 'paragraph',
      text: 'Valified er et dansk værktøj til ESG-rapport og benchmark, der viser, hvor jeres virksomhed står i forhold til andre i branchen. Valifieds særkende er Valified Index, en score fra 1 til 100, der sammenligner jer med branchen på 13 forhold, og et potentiale opgjort i kroner.',
    },
    {
      type: 'paragraph',
      text: 'Valified har pakkerne Fundament, Fremdrift og Komplet, og I kan selv oprette en konto. Fundament koster 1.290 kr. om året, og Fremdrift koster 7.990 kr. om året. Komplet-pakkerne giver hjælp fra Valifieds team til en fast pris, og Komplet Fundament koster 5.990 kr. inklusive ét års abonnement. Valified har også et gratis Branchetjek. Valified oplyser ikke en gratis rapportplan på sin hjemmeside.',
    },
    {
      type: 'paragraph',
      text: 'Valifieds rapport bygger på Basis-niveauet og kan deles direkte med bank, revisor og kunder. Valified har datadeling med banker. I Fremdrift får I prioriterede mål og initiativer at arbejde efter, og rapporten kan få jeres eget design. Valified oplyser ikke scope 3, regnskabsintegrationer eller VS Udvidet på sin hjemmeside.',
    },
    {
      type: 'richtext',
      html:
        '<ul>' +
        '<li>Vælg Valified, hvis I primært skal aflevere en VS Basis-rapport til banken eller en kunde hurtigt og billigt.</li>' +
        '<li>Vælg Valified, hvis I vil se, hvordan jeres virksomhed ligger i forhold til branchen på Valified Index, og hvad potentialet er i kroner.</li>' +
        '<li>Vælg Valified, hvis I vil have hjælp fra et team til en fast pris frem for selv at udfylde rapporten.</li>' +
        '</ul>',
    },

    { type: 'h2', text: 'Hvad er forskellen på Valified og qlim8?' },
    {
      type: 'paragraph',
      text: 'Valified er en hurtig rapport med branchebenchmark, mens qlim8 er et løbende klimaregnskab, der beregnes fra bogføringen og elforbruget.',
    },

    { type: 'h3', text: 'Scope: hvor langt klimaregnskabet rækker' },
    {
      type: 'richtext',
      html:
        '<p>Valifieds Komplet-pakker nævner CO2-beregning for scope 1 og 2, og Valified oplyser ikke scope 3. qlim8 beregner scope 1, 2 og 3. ' +
        'Skal en kunde eller bank have værdikæden med, er det forskellen, der tæller mest.</p>',
    },

    { type: 'h3', text: 'Datakilde: bilag eller spørgsmål' },
    {
      type: 'paragraph',
      text: 'qlim8 henter bilag fra e-conomic, Dinero og Billy og elforbrug fra Eloverblik, så hvert tal kan følges tilbage til et bilag med input, emissionsfaktor og kilde. Valified oplyser ikke regnskabsintegrationer eller Eloverblik på sin hjemmeside. Har I få tal og kort tid, kan Valifieds enkle vej være nok.',
    },

    { type: 'h3', text: 'Rapportniveau: Basis eller også Udvidet' },
    {
      type: 'richtext',
      html:
        '<p>qlim8 laver rapporter efter VS Basis og VS Udvidet og har også ESRS-rapportering og dobbelt væsentlighedsanalyse. ' +
        'Valifieds rapport bygger på Basis-niveauet, og Valified oplyser hverken VS Udvidet, ESRS eller dobbelt væsentlighedsanalyse på sin hjemmeside. Spørger jeres kunde kun efter Basis, er Valified nok.</p>',
    },

    { type: 'h3', text: 'Benchmark eller plan' },
    {
      type: 'richtext',
      html:
        '<p>Valified sammenligner jer med branchen og viser et potentiale i kroner. qlim8 lader jer sætte reduktionsmål med basisår, målår og en planlinje og følge udviklingen år for år. ' +
        'Er det en score at vise banken, I leder efter, er Valified Index det naturlige valg. Er det en plan med mål og tiltag, er det qlim8.</p>',
    },

    { type: 'h3', text: 'Hjælp og pris' },
    {
      type: 'richtext',
      html:
        '<p>Valifieds Komplet-pakker er bygget til, at Valifieds team gør arbejdet for jer til en fast pris. qlim8 er software, I selv bruger, og har ingen indbygget konsulentydelse. Rådgivning sker via partnere og via gratis Revisor- og Konsulent-konti til jeres egen revisor og rådgiver. ' +
        'qlim8 har en gratis pakke uden udløbsdato, som dækker scope 1 til 3 med Eloverblik og ét regnskabsprogram. ' +
        '[[Basis koster {pris:starter} om måneden, betalt årligt og ekskl. moms.]] Priserne for de øvrige pakker står på prissiden.</p>',
    },

    {
      type: 'cta',
      heading: 'Se jeres egne tal i qlim8',
      text: 'Opret en gratis konto, forbind jeres regnskabsprogram og Eloverblik, og se, hvad klimaregnskabet viser, når det bygges af jeres egne bilag.',
      buttonText: FREE_START_CTA.label,
      buttonHref: FREE_START_CTA.href,
    },

    { type: 'h2', text: 'Hvornår er Valified det rigtige valg, og hvornår er qlim8?' },
    {
      type: 'paragraph',
      text: 'Valified er det rigtige valg, når banken eller en kunde beder om en rapport hurtigt, og I har brug for et sted at begynde. Valified er også det rigtige valg, hvis I vil have en score og en branchesammenligning at vise frem, og hvis I vil have hjælp fra Valifieds team til en fast pris.',
    },
    {
      type: 'paragraph',
      text: 'qlim8 er det rigtige valg, når jeres kunder spørger om scope 3, når tallene skal kunne dokumenteres til bilag, eller når I regner med at skulle gå fra VS Basis til VS Udvidet. qlim8 er også det rigtige valg, hvis I vil have klimaregnskabet opdateret løbende fra bogføringen og elforbruget i stedet for at udfylde det en gang om året.',
    },
    {
      type: 'paragraph',
      text: 'Valified og qlim8 kan også bruges efter hinanden. En virksomhed kan begynde med en simpel rapport og gå videre til et klimaregnskab, når en kunde eller bank stiller flere krav. Da er det en fordel, at qlim8 har en gratis pakke uden udløbsdato, så I kan lægge jeres bilag ind og se tallene, før I beslutter noget.',
    },

    { type: 'h2', text: 'Hvordan ser Valified ud ved siden af de andre danske programmer?' },
    {
      type: 'richtext',
      html:
        '<p>Tabellen sammenligner Valified med qlim8 og fire andre danske programmer. Hvor en leverandør ikke oplyser noget på sin hjemmeside, står der Ikke oplyst, og det er ikke det samme som nej.</p>',
    },
    { type: 'richtext', html: sammenligningstabel(DANSKE, FUNKTIONER) },
    { type: 'richtext', html: opdateretLinje(OPDATERET) },

    { type: 'h2', text: 'De andre leverandører kort' },
    { type: 'h3', text: 'qlim8' },
    { type: 'paragraph', text: KORT_OM.qlim8 },
    { type: 'h3', text: 'Verarca' },
    { type: 'paragraph', text: KORT_OM.verarca },
    { type: 'h3', text: 'Grønlog' },
    { type: 'paragraph', text: KORT_OM.gronlog },
    { type: 'h3', text: 'EcoMetrics' },
    { type: 'paragraph', text: KORT_OM.ecometrics },
    { type: 'h3', text: 'Wardn' },
    { type: 'paragraph', text: KORT_OM.wardn },

    { type: 'h2', text: 'Sådan skifter I fra Valified til qlim8' },
    {
      type: 'paragraph',
      text: 'Fra Valified tager I jeres svar med og lader qlim8 beregne klimatallene fra bogføringen. De fleste trin er eksport og upload.',
    },
    {
      type: 'ordered-list',
      items: [
        'Gem jeres Valified-rapport, så I har den som sammenligning med sidste år.',
        'Kopiér de kvalitative svar, for eksempel politikker og medarbejderdata, over i qlim8s rapport.',
        'Forbind regnskabsprogram og Eloverblik i qlim8, så klimatallene beregnes fra bilagene.',
        'Tjek jeres aftale med Valified for, hvornår abonnementet udløber, før I skifter.',
      ],
    },

    { type: 'h2', text: 'Ofte stillede spørgsmål om Valified' },
    { type: 'h3', text: 'Hvad koster Valified?' },
    {
      type: 'paragraph',
      text: 'Valified Fundament koster 1.290 kr. om året, Fremdrift koster 7.990 kr. om året, og Komplet Fundament koster 5.990 kr. inklusive ét års abonnement.',
    },
    { type: 'h3', text: 'Har Valified en gratis version?' },
    {
      type: 'paragraph',
      text: 'Valified har et gratis Branchetjek, men oplyser ikke en gratis rapportplan på sin hjemmeside.',
    },
    { type: 'h3', text: 'Kan Valified beregne scope 3?' },
    {
      type: 'paragraph',
      text: 'Valified oplyser ikke scope 3 på sin hjemmeside, og Komplet-pakkerne nævner CO2-beregning for scope 1 og 2.',
    },
    { type: 'h3', text: 'Hvad er Valified Index?' },
    {
      type: 'paragraph',
      text: 'Valified Index er Valifieds score fra 1 til 100, der sammenligner jeres virksomhed med branchen på 13 forhold.',
    },
    { type: 'h3', text: 'Hvad er forskellen på Valified og qlim8?' },
    {
      type: 'paragraph',
      text: 'Valified er en hurtig VS Basis-rapport med branchebenchmark, mens qlim8 er et løbende klimaregnskab med scope 1 til 3 fra bogføringen og rapporter efter både Basis og Udvidet.',
    },
  ],
}
