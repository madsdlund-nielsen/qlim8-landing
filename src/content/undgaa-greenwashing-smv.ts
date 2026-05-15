import type { Article } from './article'

export const artikel: Article = {
  slug: 'undgaa-greenwashing-smv',
  title: 'Sådan undgår du greenwashing — 5 fælder danske SMV\'er falder i',
  description: 'EU\'s Green Claims-direktiv tvinger virksomheder til at dokumentere grønne påstande. Konkurrence- og Forbrugerstyrelsen er begyndt at uddele bøder. Her er fem klassiske fælder, der får SMV\'er i klemme — og hvordan du undgår dem.',
  category: 'Compliance',
  publishedAt: '2026-04-28',
  readingTime: 5,
  sections: [
    {
      type: 'lead',
      text: 'Greenwashing er ikke længere bare et omdømmespørgsmål. Med EU\'s Green Claims-direktiv og en mere aktiv Konkurrence- og Forbrugerstyrelse i Danmark, kan ubegrundede grønne påstande nu udløse bøder og påbud. SMV\'er, der har skrevet "klimavenlig" i marketingmateriale uden dokumentation, er pludselig sårbare.',
    },
    {
      type: 'paragraph',
      text: 'Den gode nyhed er at du ikke skal være jurist for at undgå problemet. De fleste sager handler om de samme fem fejl — og alle fem er nemme at fixe, hvis du fanger dem tidligt.',
    },

    { type: 'h2', text: 'Fælde 1: "Klimavenlig" uden tal bag' },
    {
      type: 'paragraph',
      text: 'Den mest klassiske. En virksomhed skriver "klimavenlig leverance" eller "miljørigtige løsninger" på hjemmesiden uden nogen specifikation af hvad det betyder, eller hvilken sammenligning det er.',
    },
    {
      type: 'paragraph',
      text: 'Konkurrence- og Forbrugerstyrelsen har slået fast at generelle grønne påstande kun er lovlige hvis de er dokumenterbare. Hvis du ikke kan vise et konkret tal og en kilde, må du ikke skrive det.',
    },
    { type: 'h3', text: 'Sådan fixer du det' },
    {
      type: 'paragraph',
      text: 'Erstat "klimavenlig" med konkrete tal: "30% lavere CO2-aftryk per enhed sammenlignet med 2023". Hav dokumentationen liggende. Eller drop den grønne påstand helt — den er ofte mindre vigtig end du tror.',
    },

    { type: 'h2', text: 'Fælde 2: CO2-kompensation uden klassificering' },
    {
      type: 'paragraph',
      text: 'Mange små virksomheder køber CO2-kreditter og kalder sig "CO2-neutrale". Det er nu officielt en grå zone i EU. Hvis du markedsfører dig som CO2-neutral baseret på kreditkompensation, skal du oplyse:',
    },
    {
      type: 'list',
      items: [
        'Hvilken andel der er reel reduktion vs. kompensation',
        'Hvilken type kreditter (verificerede, midlertidige, frivillige)',
        'Hvilket projekt kreditterne kommer fra',
      ],
    },
    {
      type: 'paragraph',
      text: 'Hvis du ikke har de oplysninger, er du i klemme. Fra 2026 må EU-medlemslande forbyde "CO2-neutral"-påstande baseret udelukkende på kompensation.',
    },

    { type: 'h2', text: 'Fælde 3: "Bæredygtig" uden afgrænsning' },
    {
      type: 'paragraph',
      text: '"Bæredygtig" er det grønne ord der har mistet sin betydning. Du må stadig bruge det, men kun hvis du afgrænser hvad det betyder i din specifikke kontekst.',
    },
    { type: 'h3', text: 'Sådan fixer du det' },
    {
      type: 'paragraph',
      text: 'Skriv "bæredygtig produktion" → "produceret med 100% genanvendt aluminium". Skriv "bæredygtig levering" → "el-køretøjer på alle leverancer indenfor 25 km". Specifikt eller intet.',
    },

    { type: 'h2', text: 'Fælde 4: Selektiv rapportering' },
    {
      type: 'paragraph',
      text: 'Du har reduceret scope 2-emissioner med 40% — det skriver du om. Scope 1 er steget med 60% — det nævner du ikke. Det er klassisk selektiv rapportering, og det er præcis det Konkurrencestyrelsen kigger efter.',
    },
    {
      type: 'paragraph',
      text: 'Hvis du rapporterer på ét scope, skal du fortælle læseren at de andre scopes findes. Hvis dit samlede CO2-aftryk er gået op, må du ikke pakke det ind i en god scope 2-historie.',
    },
    {
      type: 'callout',
      text: 'Tommelfingerregel: Hvis en konkurrent kunne læse din rapport og påvise du har skjult tal, er du selektiv. Vær hellere kedelig og fuldstændig.',
    },

    { type: 'h2', text: 'Fælde 5: Tredjeparts-mærker uden licens' },
    {
      type: 'paragraph',
      text: 'Du sætter et grønt logo på din hjemmeside — fx "ISO 14001-inspireret" eller "CO2-bevidst certificeret". Hvis du ikke er faktisk certificeret af den rette myndighed, er det vildledende.',
    },
    {
      type: 'paragraph',
      text: 'Det inkluderer også egen-lavede mærker der ligner officielle certificeringer. Hvis dit "Grønne valg"-mærke kan forveksles med en officiel mærkning, er du i risikozone.',
    },

    { type: 'h2', text: 'Hvad gør du i stedet?' },
    {
      type: 'paragraph',
      text: 'Det enkleste svar er det bedste: vis tal, ikke adjektiver. Et klimaregnskab med scope 1, 2 og 3-data, en kort metodologi-side der forklarer hvilke faktorer du har brugt, og en ærlig opgørelse af hvor du står. Det er kedeligt — og det er præcis derfor det virker.',
    },
    {
      type: 'paragraph',
      text: 'Vi tror på at den bedste ESG-marketing er ingen ESG-marketing. Vis tallene, kald dem klimaregnskab, og lad kunden trække sin egen konklusion.',
    },

    {
      type: 'cta',
      heading: 'Brug data, ikke marketing',
      text: 'qlim8 producerer audit-ready scope 1-3-rapporter du kan dele med kunder, banker og din bestyrelse. Hver beregning er sporbar — perfekt baggrundsdokumentation hvis nogen spørger.',
      buttonText: 'Start gratis konto',
      buttonHref: 'https://app.qlim8.com/auth?tab=register',
    },
  ],
}
