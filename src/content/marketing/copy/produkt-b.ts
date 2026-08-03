import type { MarketingPageCopy } from "@/content/marketing/types";

// Report-detail marketing copy: recipient variants (Modtagere) + themes + VSME modules.
// Voice per docs/da/marketing/_shared/brand-voice.md + positioning.md.
// Grounded in docs/da/marketing/features/csrd-vsme-reporting.md and compliance/{vsme,csrd}.md.
// Fixed CTA conventions applied throughout. Pricing = live landing numbers
// (Starter fra 300 kr/md, Premium 1.195 kr/md).

const primaryCta = {
  label: "Opret gratis konto",
  href: "https://app.qlim8.com/auth?tab=register",
} as const;

const heroSecondaryCta = { label: "Se priser", href: "/priser" } as const;

const bookDemo = { label: "Book demo", href: "/kontakt" } as const;

// ---------------------------------------------------------------------------
// PR_MODTAGERE: overblik-side der samler de fire modtager-varianter
// ---------------------------------------------------------------------------

export const PR_MODTAGERE: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "Ét klimaregnskab: fire rapporter til dem der spørger",
    subtitle:
      "Bestyrelsen, investorerne, banken og dine samarbejdspartnere vil have det samme klimaregnskab, men de vil se det forskelligt. qlim8 tilpasser samme datagrundlag til hver modtager, så du ikke bygger fire versioner i hånden.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Samme tal, forskellige læsere",
    body: "Dit klimaregnskab er ét sæt tal med kildecitation tilbage til hver faktura. Men bestyrelsen vil have mål og afvigelse, investoren vil have sammenlignelighed år-til-år, banken vil have præcis de datapunkter deres kreditmodel kræver, og din store kunde vil have din del af deres Scope 3. Fire modtagere, fire forventninger, og indtil nu fire gange manuelt arbejde. qlim8 genererer hver variant fra det samme underliggende regnskab, så tallene altid stemmer på tværs, og du ikke risikerer at bestyrelsen og banken ser to forskellige CO₂e-tal for samme år.",
    bullets: [
      "Bestyrelsesrapport: beslutningsklar med mål, afvigelse og risiko.",
      "Investorrapport: sammenlignelig, GHG Protocol-konsistent, med trend.",
      "Bankrapport: klar-til-upload dokumentation til finansiering.",
      "Samarbejdspartnere: dél ét link i stedet for et regneark.",
    ],
  },
  painPoints: [
    {
      pain: "Du bygger den samme rapport om og om igen, fordi bestyrelsen, banken og kunden hver især beder om deres eget format.",
      solution:
        "qlim8 trækker alle fire varianter fra det samme klimaregnskab. Du vælger modtager, ikke datasæt.",
      outcome: "2-3 dage sparet pr. rapporteringsrunde [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Tallene stemmer ikke på tværs af versioner, fordi de er kopieret manuelt mellem regneark på forskellige tidspunkter.",
      solution:
        "Alle varianter deler ét datagrundlag med kildecitation pr. post. Retter du en faktura, opdateres grundlaget ét sted.",
      outcome: "Nul risiko for at bank og bestyrelse ser forskellige CO₂e-tal for samme år.",
    },
    {
      pain: "Du ved ikke hvilke datapunkter den konkrete modtager faktisk har brug for, så du sender enten for lidt eller alt for meget.",
      solution:
        "Hver variant er skåret til sin modtager: bestyrelsen får overblik og afvigelse, banken får de rå datakrav.",
      outcome: "Færre frem-og-tilbage-mails; modtageren kan bruge rapporten første gang.",
    },
    {
      pain: "Når regnskabet rettes efter en rapport er sendt, ved du ikke længere hvad modtageren faktisk fik.",
      solution:
        "Signerede rapporter låses: dataen bevares som den var ved underskrift, også når regnskabet ændres bagefter.",
      outcome: "Du kan altid dokumentere præcis hvad hver modtager modtog og hvornår.",
    },
  ],
  features: [
    {
      title: "Bestyrelsesrapport",
      body: "Beslutningsklart klimaregnskab til bestyrelsen: status mod mål, afvigelse fra sidste år og de risici der kræver en beslutning. Skåret til et møde, ikke til en revision.",
    },
    {
      title: "Investorrapport",
      body: "ESG-data til investorer og ejere med fokus på sammenlignelighed. GHG Protocol-konsistente tal, trend over år og et grundlag investoren kan holde op mod andre selskaber i porteføljen.",
    },
    {
      title: "Bankrapport",
      body: "Klar-til-upload dokumentation til bankens ESG- og L193-datakrav ved finansiering. Præcis de datapunkter kreditmodellen efterspørger, med kildecitation der besvarer bankens spørgsmål på forhånd.",
    },
    {
      title: "Rapport til samarbejdspartnere",
      body: "Dine kunder og leverandører beder om din del af deres Scope 3. Del ét link med de tal de skal bruge, i stedet for at fylde deres regneark ud manuelt.",
    },
    {
      title: "Fælles datagrundlag",
      body: "Alle fire varianter bygger på det samme klimaregnskab med kildecitation pr. kg CO₂e tilbage til den oprindelige faktura. Ét sted at rette, fire steder det slår igennem.",
    },
  ],
  valueStats: [
    { value: "4", label: "modtager-varianter fra ét regnskab" },
    { value: "1", label: "datagrundlag: tallene stemmer altid" },
    { value: "2-3 dage", label: "sparet pr. rapporteringsrunde", note: "[antagelse: interne tidsestimater]" },
    { value: "7 år", label: "audit-trail bag hver rapport" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Er det de samme tal i alle fire rapporter?",
        a: "Ja. Alle varianter trækkes fra det samme klimaregnskab med samme kildecitation. Forskellen er hvad der fremhæves og hvordan det præsenteres, ikke selve tallene. Det er hele pointen: bestyrelsen og banken ser konsistente CO₂e-tal.",
      },
      {
        q: "Kan jeg tilpasse hvilke datapunkter en bestemt modtager får?",
        a: "Hver variant er forudskåret til sin typiske modtager. Bestyrelsesrapporten fokuserer på mål og afvigelse, bankrapporten på de rå datakrav. Du vælger variant og genererer: grundlaget er det samme underliggende regnskab.",
      },
      {
        q: "Hvad sker der med en rapport hvis jeg retter regnskabet bagefter?",
        a: "En signeret rapport låses og bevarer dataen som den var ved underskrift. Du kan stadig rette regnskabet fremadrettet, men den afsendte rapport viser tilstanden på afsendelsestidspunktet. Så du kan altid dokumentere hvad hver modtager fik.",
      },
      {
        q: "Skal jeg have en dyr plan for at få flere modtager-varianter?",
        a: "Rapporteringen er en del af platformen. Starter fra 300 kr/md dækker VSME Basic; Premium på 1.195 kr/md tilføjer VSME Comprehensive og revisor-adgang. Se priser for hvad hver plan indeholder.",
      },
      {
        q: "Kan revisoren bekræfte tallene i rapporten?",
        a: "Ja. Hver post har kildecitation tilbage til den oprindelige faktura, og revisor kan inviteres til at signere rapporten kryptografisk i platformen. Det gælder på tværs af modtager-varianterne.",
      },
    ],
  },
  closingCta: {
    title: "Byg ét klimaregnskab: send det til alle der spørger",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og se hvordan samme datagrundlag bliver til en bestyrelses-, investor-, bank- og partner-rapport.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_BESTYRELSE: klimaregnskab til bestyrelsen
// ---------------------------------------------------------------------------

export const PR_BESTYRELSE: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "Klimaregnskab til bestyrelsen: beslutningsklart",
    subtitle:
      "Bestyrelsen skal ikke læse en revisionsrapport på 40 sider. De skal se status mod mål, afvigelsen fra sidste år og de risici der kræver en beslutning. qlim8 genererer den rapport direkte fra dit regnskab.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Et bestyrelsesmøde er ikke en revision",
    body: "Når klimaregnskabet skal på dagsordenen, har bestyrelsen ét spørgsmål: hvordan går det, og hvad skal vi beslutte? Et 100-siders EFRAG-ark svarer ikke på det. Et klimaregnskab til bestyrelsen skal vise, om I når jeres mål, hvor I afviger, og hvilke risici der er materielle nok til en beslutning. qlim8 tager det samme datagrundlag som din compliance-rapport og skærer det til et møde: overblik, trend og afvigelse på de sider bestyrelsen faktisk læser. Tallene er GHG Protocol-konsistente og har kildecitation tilbage til fakturaen, så et spørgsmål fra et bestyrelsesmedlem kan besvares på stedet.",
    bullets: [
      "Status mod jeres reduktionsmål: grønt/rødt, ikke rådata.",
      "Afvigelse fra sidste år, forklaret.",
      "De risici der kræver en beslutning, ikke alle 100 datapunkter.",
    ],
  },
  painPoints: [
    {
      pain: "Bestyrelsen får et compliance-ark de ikke kan bruge til at træffe beslutninger, så klimapunktet bliver skøjtet over.",
      solution:
        "qlim8 genererer en bestyrelsesrapport skåret til beslutning: mål, afvigelse og risiko på få sider.",
      outcome: "Klimapunktet bliver et reelt dagsordenspunkt i stedet for et bilag ingen læser.",
    },
    {
      pain: "Du bruger en aften på at klippe grafer og tal sammen til bestyrelsen manuelt, hver gang.",
      solution:
        "Rapporten trækkes automatisk fra dit klimaregnskab. Du vælger 'bestyrelse' og genererer.",
      outcome: "Aftenens klip-og-klister falder bort; typisk 3-5 timer sparet pr. møde [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Et bestyrelsesmedlem spørger 'hvor kommer det tal fra?', og du kan ikke svare i mødet.",
      solution:
        "Hver post har kildecitation tilbage til den oprindelige faktura. Svaret er ét klik væk.",
      outcome: "Bestyrelsens tillid til tallene bygges i mødet, ikke i en opfølgnings-mail en uge efter.",
    },
    {
      pain: "Sidste års tal og i år er lavet forskelligt, så trenden er ikke til at stole på.",
      solution:
        "Samme metodegrundlag og faktorer år efter år gør afvigelsen reel, ikke en artefakt af metoden.",
      outcome: "Bestyrelsen kan diskutere den faktiske udvikling, ikke om tallene overhovedet kan sammenlignes.",
    },
  ],
  features: [
    {
      title: "Mål og afvigelse øverst",
      body: "Rapporten åbner med status mod jeres reduktionsmål og afvigelsen fra sidste år. Bestyrelsen ser med det samme, om I er på sporet, uden at lede i tabeller.",
    },
    {
      title: "Risiko fremhævet",
      body: "De poster der ændrer sig mest, eller hvor datagrundlaget er svagest, løftes frem. Bestyrelsen bruger tiden på det der kræver en beslutning, ikke på de 90 % der er stabile.",
    },
    {
      title: "Kildecitation på hvert tal",
      body: "Hvert tal kan spores tilbage til den oprindelige faktura. Når et bestyrelsesmedlem stiller det svære spørgsmål, er dokumentationen allerede i rapporten.",
    },
    {
      title: "Beslutningsklart format",
      body: "Få sider, klart sprog, ingen EFRAG-jargon. Rapporten er skrevet til at blive læst på 10 minutter før et møde, ikke til at blive arkiveret ulæst.",
    },
    {
      title: "Låst efter godkendelse",
      body: "Når bestyrelsen har set en version, kan den låses. Retter du regnskabet bagefter, bevarer den godkendte rapport tilstanden ved godkendelsen, så referatet altid matcher det materiale bestyrelsen faktisk fik.",
    },
  ],
  valueStats: [
    { value: "3-5 timer", label: "sparet pr. bestyrelsesmøde", note: "[antagelse: interne tidsestimater]" },
    { value: "1 klik", label: "fra tal til kildefaktura" },
    { value: "GHG Protocol", label: "konsistente tal år-til-år" },
    { value: "Få sider", label: "i stedet for 100-siders ark" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad indeholder et klimaregnskab til bestyrelsen?",
        a: "Status mod jeres reduktionsmål, afvigelse fra sidste år og de risici der kræver en beslutning. Det er skåret til et møde, ikke den fulde compliance-rapport, men bygget på præcis samme datagrundlag med kildecitation pr. tal.",
      },
      {
        q: "Kan bestyrelsen stole på at tallene kan sammenlignes med sidste år?",
        a: "Ja. qlim8 bruger samme metode og emissionsfaktorer år efter år, så afvigelsen afspejler en reel udvikling og ikke et metodeskift. Tallene er GHG Protocol-konsistente.",
      },
      {
        q: "Skal jeg bygge bestyrelsesrapporten oven på compliance-rapporten?",
        a: "Nej. Begge trækkes fra det samme klimaregnskab. Du vælger bestyrelses-varianten og genererer, der er ikke to datasæt at holde synkroniseret.",
      },
      {
        q: "Hvad hvis vi retter regnskabet efter bestyrelsen har godkendt rapporten?",
        a: "En godkendt rapport kan låses og bevarer dataen som den var ved godkendelsen. Du kan rette regnskabet fremadrettet, men referatet matcher altid det materiale bestyrelsen faktisk så.",
      },
      {
        q: "Hvad koster det at lave bestyrelsesrapporter?",
        a: "Rapporteringen er en del af platformen. Starter fra 300 kr/md; Premium på 1.195 kr/md tilføjer bl.a. VSME Comprehensive og revisor-adgang. Se priser for detaljerne.",
      },
    ],
  },
  closingCta: {
    title: "Giv bestyrelsen et klimaregnskab de kan beslutte ud fra",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og generér en beslutningsklar bestyrelsesrapport med mål, afvigelse og risiko.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_INVESTOR: ESG-data til investorer/ejere
// ---------------------------------------------------------------------------

export const PR_INVESTOR: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "ESG-data til investorer: sammenligneligt og konsistent",
    subtitle:
      "Investorer og ejere skal kunne holde jeres klimatal op mod resten af porteføljen. qlim8 leverer GHG Protocol-konsistente tal med trend over år, så jeres rapportering står mål med det investoren ser fra andre selskaber.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Investoren sammenligner: sørg for at det kan lade sig gøre",
    body: "En investor læser aldrig kun jeres klimaregnskab. De læser det ved siden af ti andre selskabers. Det, der gør jeres tal brugbare for dem, er ikke detaljeringsgraden: det er sammenligneligheden: at Scope 1, 2 og 3 er opgjort GHG Protocol-konsistent, at metoden er den samme fra år til år, og at trenden er reel. qlim8 opgør jeres klimaregnskab efter en fast metode og genererer en investorrapport der viser udviklingen over tid med kildecitation bag hvert tal. Investoren kan tage tallene direkte ind i deres egen porteføljerapportering uden at skulle spørge hvordan I har regnet.",
    bullets: [
      "GHG Protocol-konsistent Scope 1, 2 og 3.",
      "Trend over år på samme metodegrundlag.",
      "Kildecitation bag hvert tal, klar til investorens due diligence.",
    ],
  },
  painPoints: [
    {
      pain: "Investoren kan ikke sammenligne jeres tal med resten af porteføljen, fordi metoden er uklar.",
      solution:
        "qlim8 opgør Scope 1, 2 og 3 GHG Protocol-konsistent, så tallene er sammenlignelige på tværs af selskaber.",
      outcome: "Investoren tager tallene direkte ind i sin porteføljerapportering uden at spørge om metode.",
    },
    {
      pain: "Trenden ser rodet ud, fordi hvert år er opgjort en smule forskelligt.",
      solution:
        "Fast metode og faste faktorer år efter år gør trenden reel og læsbar.",
      outcome: "Udviklingen fortæller en historie investoren kan stole på, ikke en metode-artefakt.",
    },
    {
      pain: "Due diligence-spørgsmål om et enkelt tal koster dig dage med at grave i regneark.",
      solution:
        "Hvert tal har kildecitation tilbage til fakturaen. Svaret ligger i rapporten.",
      outcome: "Due diligence-runden bliver kortere; typisk 4-8 timer sparet pr. runde [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Du sender investoren et statisk PDF, og næste kvartal skal alt laves om fra bunden.",
      solution:
        "Rapporten genereres fra det levende klimaregnskab. Nyt kvartal, samme knap.",
      outcome: "Løbende investor-rapportering bliver en generering, ikke et projekt.",
    },
  ],
  features: [
    {
      title: "GHG Protocol-konsistent opgørelse",
      body: "Scope 1, 2 og 3 opgøres efter GHG Protocol, så jeres tal er sammenlignelige med andre selskaber i investorens portefølje. Bemærk: konsistent, ikke akkrediteret, vi opgør efter standarden, vi udsteder ikke certifikater.",
    },
    {
      title: "Trend over år",
      body: "Rapporten viser udviklingen i jeres CO₂e-aftryk over tid på samme metodegrundlag. Investoren ser en reel kurve, ikke et øjebliksbillede der ikke kan sammenlignes med sidste år.",
    },
    {
      title: "Scope 3 med kildecitation",
      body: "Scope 3-posterne, inkl. indkøb (kat. 1): har kildecitation tilbage til fakturaen. Investorens spørgsmål om det største og mest usikre scope besvares på forhånd.",
    },
    {
      title: "Klar til due diligence",
      body: "Kildecitation og audit-trail på 7 år betyder at investorens due diligence-team kan verificere tallene selv. Færre spørgsmål tilbage til dig, hurtigere runde.",
    },
    {
      title: "Genereres kvartal efter kvartal",
      body: "Investor-rapporten trækkes fra det levende klimaregnskab. Løbende rapportering til ejerkredsen bliver en knap, ikke et nyt regneark hvert kvartal.",
    },
  ],
  valueStats: [
    { value: "Scope 1-3", label: "GHG Protocol-konsistent" },
    { value: "Trend", label: "på fast metode år-til-år" },
    { value: "4-8 timer", label: "sparet pr. due diligence-runde", note: "[antagelse: interne tidsestimater]" },
    { value: "7 år", label: "audit-trail bag tallene" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad gør vores klimatal sammenlignelige for en investor?",
        a: "At de er opgjort GHG Protocol-konsistent og efter samme metode år efter år. Så kan investoren holde jeres Scope 1, 2 og 3 op mod andre selskaber i porteføljen uden at skulle korrigere for metodeforskelle.",
      },
      {
        q: "Betyder GHG Protocol-konsistent at tallene er certificerede?",
        a: "Nej. Vi opgør efter GHG Protocol-metoden, men vi er ikke et akkrediteringsorgan og udsteder ikke certifikater. Det revisoren kan gøre er at signere rapporten i platformen; hver post er sporbar tilbage til kilden.",
      },
      {
        q: "Kan investoren verificere tallene selv?",
        a: "Ja. Hvert tal har kildecitation tilbage til den oprindelige faktura, og der er 7-årig audit-trail. Due diligence-teamet kan følge sporet uden at skulle bede jer om rådata.",
      },
      {
        q: "Kan jeg lave investor-rapporten hvert kvartal uden at starte forfra?",
        a: "Ja. Rapporten genereres fra det levende klimaregnskab, så en ny periode er en ny generering, ikke et nyt regneark. Metoden holdes konstant, så trenden forbliver læsbar.",
      },
      {
        q: "Hvilken plan skal jeg have for investor-rapportering?",
        a: "Rapporteringen er en del af platformen. For fuld Scope 3 og de udvidede datapunkter er Premium (1.195 kr/md) typisk det rette; Starter fra 300 kr/md dækker grundopgørelsen og VSME Basic. Se priser.",
      },
    ],
  },
  closingCta: {
    title: "Giv investoren tal de kan sammenligne",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og generér en GHG Protocol-konsistent investorrapport med trend og kildecitation.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_BANK: ESG-rapport til banken (L193 / finansiering)
// ---------------------------------------------------------------------------

export const PR_BANK: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "ESG-rapport til banken: klar til upload",
    subtitle:
      "Banken beder om ESG-data før de godkender finansieringen, ofte med reference til L193-datakravene. qlim8 leverer præcis de datapunkter i et klar-til-upload dokument, så finansieringen ikke venter på et regneark.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Bankens ESG-krav skal ikke forsinke lånet",
    body: "Flere og flere banker beder om ESG- og klimadata før de godkender et lån eller en kreditramme, ofte med henvisning til L193 og deres egne bæredygtighedskrav til udlån. Problemet er sjældent tallene; det er formatet. Banken vil have bestemte datapunkter, opgjort på en måde deres kreditmodel kan læse, med dokumentation bag. qlim8 tager dit klimaregnskab og genererer en bankrapport med præcis de datapunkter banken efterspørger, hver med kildecitation tilbage til fakturaen. Du uploader ét dokument i stedet for at oversætte dit regnskab til bankens skema i hånden. Så ESG-kravet bliver et vedhæftet bilag, ikke en flaskehals i finansieringen.",
    bullets: [
      "De datapunkter bankens ESG-/L193-krav beder om.",
      "Klar-til-upload dokumentation med kildecitation.",
      "GHG Protocol-konsistente tal banken kan læse ind i kreditmodellen.",
    ],
  },
  painPoints: [
    {
      pain: "Banken sender et ESG-skema du ikke ved hvordan du udfylder, og finansieringen står stille imens.",
      solution:
        "qlim8 genererer en bankrapport med de datapunkter bankens krav efterspørger, færdigt udfyldt fra dit regnskab.",
      outcome: "ESG-kravet bliver et vedhæftet bilag, ikke en uges forsinkelse på lånet.",
    },
    {
      pain: "Du opgør tallene selv, men banken afviser formatet, og du starter forfra.",
      solution:
        "Rapporten leveres klar-til-upload i standardformater (PDF, Excel) med GHG Protocol-konsistente tal.",
      outcome: "Færre afvisningsrunder med bankens kreditafdeling.",
    },
    {
      pain: "Bankens rådgiver stiller spørgsmål til et enkelt tal, og du kan ikke dokumentere hvor det kommer fra.",
      solution:
        "Hver post har kildecitation tilbage til fakturaen; audit-trail på 7 år ligger bag.",
      outcome: "Bankens spørgsmål besvares før de stilles; sagsbehandlingen glider hurtigere.",
    },
    {
      pain: "Du skal levere opdaterede tal hvert år for at beholde den grønne rente, og det bliver et projekt hver gang.",
      solution:
        "Rapporten genereres fra det levende klimaregnskab. Årlig opdatering er en generering, ikke et nyt dataindsamlings-projekt.",
      outcome: "Den løbende bank-rapportering koster timer, ikke uger.",
    },
  ],
  features: [
    {
      title: "Bankens datapunkter, forudfyldt",
      body: "Rapporten indeholder de klima- og ESG-datapunkter bankens krav, herunder L193-relaterede, efterspørger, trukket direkte fra dit klimaregnskab. Du oversætter ikke dit regnskab til bankens skema i hånden.",
    },
    {
      title: "Klar-til-upload dokumentation",
      body: "Output i PDF og Excel, formateret så det kan lægges direkte i bankens portal eller sendes til rådgiveren. Ingen manuel reformatering før upload.",
    },
    {
      title: "Kildecitation bag hvert tal",
      body: "Hvert tal er sporbart tilbage til den oprindelige faktura. Når bankens kreditafdeling verificerer, ligger dokumentationen allerede i rapporten.",
    },
    {
      title: "GHG Protocol-konsistent opgørelse",
      body: "Scope 1, 2 og 3 opgøres efter GHG Protocol, så banken kan læse tallene ind i sin egen kreditmodel uden at gætte på metoden.",
    },
    {
      title: "Årlig opdatering uden nyt projekt",
      body: "Skal du dokumentere klimatal årligt for at beholde en grøn finansiering, genereres den nye rapport fra det levende regnskab. En knap, ikke en ny runde manuelt arbejde.",
    },
  ],
  valueStats: [
    { value: "Klar-til-upload", label: "PDF + Excel til bankens portal" },
    { value: "L193", label: "-relaterede datapunkter dækket" },
    { value: "1 klik", label: "fra tal til kildefaktura" },
    { value: "Timer", label: "til årlig opdatering, ikke uger", note: "[antagelse: interne tidsestimater]" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad skal en ESG-rapport til banken indeholde?",
        a: "Typisk jeres klimatal (Scope 1, 2 og ofte 3) opgjort konsistent, plus den dokumentation bankens kreditmodel og L193-relaterede krav efterspørger. qlim8 genererer præcis de datapunkter fra dit klimaregnskab med kildecitation bag.",
      },
      {
        q: "Hvad er L193 i denne sammenhæng?",
        a: "Bankernes øgede krav om at indhente og vurdere bæredygtighedsdata fra erhvervskunder afspejler sig i konkrete datakrav ved finansiering. qlim8 leverer de klimadatapunkter i et format banken kan bruge. Tjek det konkrete skema med din bankrådgiver, da kravene varierer mellem banker.",
      },
      {
        q: "Kan jeg uploade rapporten direkte i bankens system?",
        a: "Rapporten leveres klar-til-upload i PDF og Excel. De fleste banker beder om ét af de to formater; du henter filen og lægger den i bankens portal eller sender den til rådgiveren uden reformatering.",
      },
      {
        q: "Hvordan besvarer jeg bankens spørgsmål til et enkelt tal?",
        a: "Hver post har kildecitation tilbage til den oprindelige faktura, og der er 7-årig audit-trail. Bankens kreditafdeling kan følge sporet, så de fleste spørgsmål er besvaret allerede i rapporten.",
      },
      {
        q: "Hvad koster det at lave en bankrapport?",
        a: "Rapporteringen er en del af platformen. Starter fra 300 kr/md dækker grundopgørelsen; skal du levere fuld Scope 3 eller de udvidede datapunkter banken beder om, er Premium (1.195 kr/md) typisk det rette. Se priser.",
      },
    ],
  },
  closingCta: {
    title: "Lever bankens ESG-krav uden at forsinke finansieringen",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og generér en klar-til-upload bankrapport med de datapunkter finansieringen kræver.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_SAMARBEJDSPARTNERE: dél klimadata med kunder/leverandører (deres Scope 3)
// ---------------------------------------------------------------------------

export const PR_SAMARBEJDSPARTNERE: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "Dél dine klimadata: ét link, ikke et regneark",
    subtitle:
      "Dine store kunder og leverandører beder om din del af deres Scope 3. I stedet for at udfylde deres regneark hver gang, deler du ét link med de tal de skal bruge, trukket direkte fra dit klimaregnskab.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Når din kunde beder om dine tal til deres Scope 3",
    body: "Store kunder og leverandører har deres egen CSRD- eller VSME-forpligtelse, og du er en del af deres Scope 3. Derfor lander der et regneark i din indbakke: 'udfyld venligst jeres CO₂-tal'. Det regneark er lidt forskelligt hver gang, og du bruger en formiddag på at oversætte dit klimaregnskab til deres kolonner. qlim8 vender det om: du deler ét link med de tal partneren beder om, trukket direkte fra dit klimaregnskab og med kildecitation bag. Partneren henter det de skal bruge til deres Scope 3, og du udfylder ikke det samme i femten forskellige skabeloner. Beder de om et bestemt format, kan tallene også hentes som Excel eller JSON.",
    bullets: [
      "Dél ét link i stedet for at udfylde deres regneark.",
      "Tallene er din del af partnerens Scope 3, klar til brug.",
      "Kildecitation bag hvert tal, hvis partneren spørger.",
    ],
  },
  painPoints: [
    {
      pain: "Hver stor kunde sender sit eget regneark, og du oversætter dit klimaregnskab til deres kolonner igen og igen.",
      solution:
        "qlim8 samler dine tal ét sted, og du deler dem som ét link i stedet for at udfylde hver skabelon.",
      outcome: "En formiddag pr. kunde-forespørgsel falder bort [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Du er ikke sikker på hvilke af dine tal der hører til netop den kundes Scope 3.",
      solution:
        "Rapporten er skåret til partnerens behov: din del af deres værdikæde, opgjort GHG Protocol-konsistent.",
      outcome: "Partneren kan lægge tallene direkte ind uden at spørge hvad de dækker.",
    },
    {
      pain: "Partneren stiller spørgsmål til et tal, og du kan ikke dokumentere det uden at grave i bilag.",
      solution:
        "Hvert tal har kildecitation tilbage til fakturaen, så dokumentationen følger med linket.",
      outcome: "Partnerens spørgsmål besvares på forhånd; ingen ekstra mail-runde.",
    },
    {
      pain: "Kunden vil have tallene i et bestemt filformat til deres eget system.",
      solution:
        "Tallene kan hentes som PDF, Excel eller JSON, det format partnerens system kan læse.",
      outcome: "Partnerens system-integration kører uden manuel indtastning i begge ender.",
    },
  ],
  features: [
    {
      title: "Ét delbart link",
      body: "Del dine relevante klimatal som ét link i stedet for at udfylde partnerens regneark. Beder tre kunder om det samme, deler du samme grundlag tre gange uden nyt arbejde.",
    },
    {
      title: "Skåret til partnerens Scope 3",
      body: "Rapporten viser din del af partnerens værdikæde, din Scope 3-relevante udledning, opgjort GHG Protocol-konsistent, så tallene kan lægges direkte ind hos dem.",
    },
    {
      title: "Kildecitation følger med",
      body: "Hvert tal er sporbart tilbage til den oprindelige faktura. Hvis partneren eller deres revisor spørger, er dokumentationen der allerede.",
    },
    {
      title: "Flere formater",
      body: "Ud over det delte link kan tallene hentes som PDF, Excel eller JSON. Skal partnerens system have en fil i et bestemt format, er det ét valg, ikke en genindtastning.",
    },
    {
      title: "Opdateres når dit regnskab gør",
      body: "Grundlaget er dit levende klimaregnskab. Retter du en faktura, er de delte tal opdaterede næste gang partneren henter dem. Du sender ikke en rettet version rundt manuelt.",
    },
  ],
  valueStats: [
    { value: "1 link", label: "i stedet for N regneark" },
    { value: "PDF / Excel / JSON", label: "de formater partneren beder om" },
    { value: "Din Scope 3-del", label: "opgjort GHG Protocol-konsistent" },
    { value: "1 klik", label: "fra tal til kildefaktura" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Min store kunde beder om vores CO₂-tal til deres Scope 3. Hvad deler jeg?",
        a: "Din del af deres værdikæde: dine relevante udledninger opgjort GHG Protocol-konsistent. qlim8 samler det i en rapport du deler som ét link, i stedet for at udfylde kundens eget regneark.",
      },
      {
        q: "Skal jeg udfylde et nyt regneark for hver kunde der spørger?",
        a: "Nej. Du deler samme grundlag som ét link, uanset hvor mange partnere der beder om det. Har de brug for en fil, kan tallene hentes som PDF, Excel eller JSON.",
      },
      {
        q: "Kan partneren stole på tallene?",
        a: "Hvert tal har kildecitation tilbage til den oprindelige faktura, og der er 7-årig audit-trail bag. Partneren, eller deres revisor, kan følge sporet, så tallene kan bruges direkte i deres egen rapportering.",
      },
      {
        q: "Hvad hvis vi retter regnskabet efter vi har delt tallene?",
        a: "Grundlaget er dit levende klimaregnskab, så delte tal afspejler det opdaterede regnskab næste gang partneren henter dem. Skal en bestemt version bevares, kan en rapport låses ved deling.",
      },
      {
        q: "Hvilken plan skal jeg have for at dele Scope 3-data?",
        a: "Rapporteringen er en del af platformen. Starter fra 300 kr/md dækker grundopgørelsen; for fuld Scope 3-detaljering er Premium (1.195 kr/md) typisk det rette. Se priser.",
      },
    ],
  },
  closingCta: {
    title: "Dél dine klimadata som ét link",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og dél din del af partnerens Scope 3 uden at udfylde endnu et regneark.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_TEMAER: vælg rapportens visuelle tema (Light Nordic vs. McKinsey)
// ---------------------------------------------------------------------------

export const PR_TEMAER: MarketingPageCopy = {
  hero: {
    eyebrow: "Rapport",
    title: "Vælg rapportens tema: Light Nordic eller McKinsey",
    subtitle:
      "Samme klimaregnskab, to visuelle udtryk. Vælg 'Light Nordic' for et rent, nordisk look eller 'McKinsey' for et stringent konsulent-udtryk. Tallene er de samme: indpakningen matcher modtageren.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Indpakningen betyder noget, når rapporten skal læses",
    body: "En rapport til bestyrelsen og en rapport til en investor kan indeholde de samme tal og stadig fungere bedst i hvert sit udtryk. qlim8 lader dig vælge rapportens visuelle tema uden at røre ved indholdet. 'Light Nordic' er rent, luftigt og nordisk. Velegnet når rapporten skal signalere åbenhed og enkelhed. 'McKinsey' er stringent, tæt og konsulent-agtigt, velegnet når modtageren forventer et analytisk, beslutnings-tungt udtryk. Du skifter tema med ét valg og genererer rapporten igen; tallene, kildecitationen og strukturen er uændrede. Så du bruger ikke tid i et layoutprogram, du vælger det udtryk der passer til hvem der læser.",
    bullets: [
      "To temaer: Light Nordic (rent, nordisk) og McKinsey (stringent, konsulent).",
      "Samme tal og kildecitation, kun det visuelle skifter.",
      "Skift tema med ét valg, generér igen.",
    ],
  },
  painPoints: [
    {
      pain: "Standard-rapporten passer ikke til modtageren. Den er enten for pyntet eller for tør.",
      solution:
        "Vælg mellem to temaer der rammer hver sin forventning: nordisk enkelhed eller konsulent-stringens.",
      outcome: "Rapporten møder modtagerens forventning uden at du rører ved tallene.",
    },
    {
      pain: "Du eksporterer til PDF og bruger derefter en aften i et layoutprogram på at få den til at se præsentabel ud.",
      solution:
        "Temaet anvendes ved genereringen. Rapporten kommer ud færdig-designet.",
      outcome: "Layout-aftenen falder bort; typisk 2-4 timer sparet pr. rapport [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Skifter du udtryk, er du bange for at tallene flytter sig eller kildecitationen falder ud.",
      solution:
        "Temaet er kun visuelt. Tal, struktur og kildecitation er identiske på tværs af de to temaer.",
      outcome: "Du kan trygt vælge udtryk efter modtager uden at genkontrollere indholdet.",
    },
    {
      pain: "Forskellige modtagere vil have forskelligt udtryk, og du ender med at vedligeholde to versioner.",
      solution:
        "Samme rapport, to temaer, ét klik imellem. Der er ikke to dokumenter at holde synkroniseret.",
      outcome: "Bestyrelsen og investoren kan få hvert sit udtryk fra samme kilde.",
    },
  ],
  features: [
    {
      title: "Light Nordic",
      body: "Et rent, luftigt og nordisk udtryk med god luft omkring tallene, dæmpet farvebrug og enkel typografi. Velegnet når rapporten skal signalere åbenhed og gennemsigtighed, fx til samarbejdspartnere eller en offentlig-orienteret læser.",
    },
    {
      title: "McKinsey",
      body: "Et stringent, tæt og analytisk udtryk i konsulent-stil: kompakte tabeller, tydelig informationshierarki og et beslutnings-tungt look. Velegnet når modtageren, fx en investor eller en professionel bestyrelse, forventer et konsulent-agtigt oplæg.",
    },
    {
      title: "Samme indhold i begge",
      body: "Uanset tema er tallene, strukturen og kildecitationen den samme. Temaet ændrer typografi, farver og layout, ikke hvad rapporten siger eller hvor tallene kommer fra.",
    },
    {
      title: "Skift uden reformatering",
      body: "Vælg tema før du genererer, og rapporten kommer ud færdig-designet i PDF. Vil du se den anden version, skifter du tema og genererer igen, ingen manuel opsætning i et layoutprogram.",
    },
    {
      title: "Konsistent på tværs af modtager-varianter",
      body: "Temaet lægger sig oven på bestyrelses-, investor-, bank- og partner-rapporterne. Du kan give hver modtager sit udtryk uden at bygge separate skabeloner.",
    },
  ],
  howItWorks: {
    title: "Sådan vælger og anvender du et tema",
    steps: [
      {
        title: "1. Generér dit klimaregnskab",
        body: "Kobl dit regnskab på, og lad qlim8 opgøre klimaregnskabet. Temavalget ændrer ikke tallene: grundlaget er det samme uanset udtryk.",
      },
      {
        title: "2. Vælg tema",
        body: "Vælg 'Light Nordic' eller 'McKinsey' før du genererer rapporten. Valget bestemmer typografi, farver og layout.",
      },
      {
        title: "3. Generér rapporten",
        body: "Rapporten kommer ud som færdig-designet PDF i det valgte tema, med tal og kildecitation uændret.",
      },
      {
        title: "4. Skift hvis modtageren kræver det",
        body: "Vil en anden modtager have det andet udtryk, skifter du tema og genererer igen. Samme kilde, nyt look, ingen ny opsætning.",
      },
    ],
  },
  valueStats: [
    { value: "2", label: "temaer: Light Nordic + McKinsey" },
    { value: "1 valg", label: "skifter hele udtrykket" },
    { value: "0", label: "ændringer i tal og kildecitation" },
    { value: "2-4 timer", label: "sparet pr. rapport i layout", note: "[antagelse: interne tidsestimater]" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad er forskellen på Light Nordic og McKinsey?",
        a: "Light Nordic er et rent, luftigt og nordisk udtryk med dæmpede farver og god luft. McKinsey er stringent, tæt og analytisk i konsulent-stil med kompakte tabeller. Vælg det der matcher modtagerens forventning. Indholdet er det samme i begge.",
      },
      {
        q: "Ændrer temaet på tallene i rapporten?",
        a: "Nej. Temaet er rent visuelt: typografi, farver og layout. Tallene, strukturen og kildecitationen er identiske uanset om du vælger Light Nordic eller McKinsey.",
      },
      {
        q: "Kan jeg skifte tema efter jeg har genereret en rapport?",
        a: "Ja. Du vælger det andet tema og genererer rapporten igen fra samme datagrundlag. Der er ikke to versioner at vedligeholde. Det er ét klik imellem udtrykkene.",
      },
      {
        q: "Virker temaet sammen med modtager-varianterne?",
        a: "Ja. Temaet lægger sig oven på bestyrelses-, investor-, bank- og partner-rapporterne, så du kan give hver modtager både den rette variant og det rette udtryk.",
      },
      {
        q: "Kan jeg få rapporten uden qlim8's brand?",
        a: "White-label-PDF, hvor rapporten bærer dit eget brand i stedet for qlim8's, findes på de større planer. Se priser for hvad hver plan indeholder.",
      },
    ],
  },
  closingCta: {
    title: "Giv rapporten det udtryk modtageren forventer",
    description:
      "Opret en gratis konto, generér dit klimaregnskab, og se samme rapport i både Light Nordic og McKinsey.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_VSME: hvad VSME-standarden er + at qlim8 laver Basic og Comprehensive
// ---------------------------------------------------------------------------

export const PR_VSME: MarketingPageCopy = {
  hero: {
    eyebrow: "VSME",
    title: "VSME-rapport direkte fra dit regnskab: Basic og Comprehensive",
    subtitle:
      "VSME er EFRAG's frivillige rapporteringsstandard for SMV'er. qlim8 genererer både VSME Basic og VSME Comprehensive fra dit klimaregnskab, med kildecitation pr. tal og revisor-sign-off.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Hvad er VSME: og hvorfor beder de om det?",
    body: "VSME (Voluntary SME Standard) er EFRAG's frivillige standard for små og mellemstore virksomheder. Den er tænkt som et trin på vejen mod CSRD: er du ikke CSRD-pligtig, kan du rapportere via VSME, og store kunder og banker accepterer den som dokumentation. Standarden findes i to moduler. VSME Basic dækker 40+ datapunkter, primært klima og governance. VSME Comprehensive dækker 100+ datapunkter og tilføjer bl.a. bredere social og governance. For en typisk dansk SMV der har fået en 'send os jeres CO₂-tal'-anmodning er Basic ofte tilstrækkeligt. qlim8 genererer begge moduler direkte fra dit klimaregnskab, så du ikke udfylder EFRAG-arket i hånden.",
    bullets: [
      "VSME Basic: 40+ datapunkter (EFRAG-spec), primært klima og governance.",
      "VSME Comprehensive: 100+ datapunkter, bredere social og governance.",
      "Begge genereres fra dit klimaregnskab med kildecitation pr. tal.",
    ],
  },
  painPoints: [
    {
      pain: "En kunde eller bank beder om en VSME-rapport, og du ved ikke hvor du skal starte.",
      solution:
        "qlim8 mapper EFRAG's VSME-felter mod dit klimaregnskab og genererer rapporten som PDF eller Excel.",
      outcome: "Førstegangs-VSME bliver dage-arbejde frem for et konsulent-engagement til 75.000-200.000 kr. [antagelse, markeds-research].",
    },
    {
      pain: "EFRAG-Excel-arket er tomt, og du skal udfylde 40+ datapunkter manuelt med dokumentation bag hvert tal.",
      solution:
        "Tallene lander i arkets officielle celler direkte fra dit regnskab, hver med kildecitation.",
      outcome: "40-80 timers manuel udfyldning falder bort [antagelse, pilot-tal].",
    },
    {
      pain: "Du er usikker på om du skal bruge Basic eller Comprehensive.",
      solution:
        "qlim8 laver begge. Starter dækker Basic; Premium tilføjer Comprehensive. Du kan skifte når kravet ændrer sig.",
      outcome: "Du vælger modul efter behov, ikke efter hvad et konsulenthus kan levere.",
    },
    {
      pain: "Revisorens spørgsmål forsinker rapporten med uger.",
      solution:
        "Hver post er sporbar til fakturaen, og revisor kan signere rapporten kryptografisk i platformen.",
      outcome: "Revisorens spørgsmål besvares før de stilles; sign-off sker i platformen.",
    },
  ],
  features: [
    {
      title: "VSME Basic",
      body: "Det korte modul: 40+ datapunkter, primært klima og governance, i EFRAG's officielle Basic-celler (B1-B11). For en typisk SMV med en kunde- eller bank-anmodning er Basic ofte nok. Se detaljesiden for hvad Basic dækker og hvor hurtigt.",
    },
    {
      title: "VSME Comprehensive",
      body: "Det udvidede modul: 100+ datapunkter i EFRAG's Comprehensive-celler (C1-C9), med bredere social og governance og fuld Scope 3. Til dig der har fået et krav fra en bank eller stor kunde om mere end grundtallene. Se detaljesiden.",
    },
    {
      title: "Tallene lander i EFRAG-arket",
      body: "qlim8 mapper felterne mod EFRAG's officielle template-version, så tallene lander i de rigtige celler og arkets egen valideringsfane viser grønt/OK for de krævede rækker. Du afleverer ikke et ark med røde 'MISSING VALUE'-markeringer.",
    },
    {
      title: "Kildecitation pr. tal",
      body: "Hver post har en klikbar kildecitation tilbage til den oprindelige aktivitet. Når revisoren spørger hvor et tal kommer fra, er svaret ét klik væk. Fakturaerne bag ligger i sporet.",
    },
    {
      title: "Skalerer til CSRD",
      body: "Rammer CSRD dit segment senere, bruger vi samme data med en anden template-mapping (ESRS E1). Du indsamler ikke data forfra: VSME er trinnet, ikke en blindgyde.",
    },
  ],
  valueStats: [
    { value: "Basic + Comprehensive", label: "begge moduler i platformen" },
    { value: "4-8 timer", label: "til VSME Basic", note: "[antagelse: pilot-tal, 2 brugere]" },
    { value: "Grøn valideringsfane", label: "i EFRAG-arket for krævede rækker" },
    { value: "7 år", label: "audit-trail (CSRD-krav)" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad er VSME?",
        a: "VSME (Voluntary SME Standard) er EFRAG's frivillige rapporteringsstandard for små og mellemstore virksomheder. Den fungerer som et trin mod CSRD: er du ikke CSRD-pligtig, kan du rapportere via VSME, og store kunder og banker accepterer den som dokumentation.",
      },
      {
        q: "Hvad er forskellen på VSME Basic og VSME Comprehensive?",
        a: "Basic dækker 40+ datapunkter, primært klima og governance (EFRAG-celler B1-B11). Comprehensive dækker 100+ datapunkter med bredere social og governance og fuld Scope 3 (celler C1-C9). For de fleste SMV'er med en kunde- eller bank-anmodning er Basic tilstrækkeligt.",
      },
      {
        q: "Laver qlim8 begge moduler?",
        a: "Ja. Starter fra 300 kr/md dækker VSME Basic; Premium på 1.195 kr/md tilføjer VSME Comprehensive og revisor-adgang. Du kan skifte modul når kravet ændrer sig. Samme klimaregnskab ligger bag begge.",
      },
      {
        q: "Er en VSME-rapport fra qlim8 revisor-klar?",
        a: "Hver post har kildecitation tilbage til fakturaen, der er 7-årig audit-trail, og revisor kan signere rapporten kryptografisk i platformen. Bemærk: qlim8 opgør efter standarden: vi er ikke et akkrediteringsorgan, og revisionen udføres af din revisor.",
      },
      {
        q: "Hvad hvis jeg senere bliver CSRD-pligtig?",
        a: "Så bruger vi samme data med en anden template-mapping til ESRS E1. Du indsamler ikke data forfra. VSME er bygget som et trin mod CSRD, og qlim8 følger den vej med samme datagrundlag.",
      },
    ],
  },
  closingCta: {
    title: "Generér din VSME-rapport fra dit eget regnskab",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og se hvad VSME Basic og Comprehensive lander på med dine egne tal.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_VSME_BASIS: VSME Basic-modulet
// ---------------------------------------------------------------------------

export const PR_VSME_BASIS: MarketingPageCopy = {
  hero: {
    eyebrow: "VSME Basic",
    title: "VSME Basic-rapport på 4-8 timer",
    subtitle:
      "VSME Basic er det korte modul: 40+ datapunkter, primært klima og governance. qlim8 genererer det direkte fra dit klimaregnskab, så udfyldningen bliver kvalitetsreview i stedet for manuel indtastning.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Hvad VSME Basic dækker: og hvem det passer til",
    body: "VSME Basic er EFRAG's korte modul: 40+ datapunkter der primært dækker klima (Scope 1 og 2, ofte indkøb i Scope 3) og governance. Det passer til den typiske danske SMV der har fået en 'send os jeres CO₂-tal'-anmodning fra en stor kunde, en bank eller frivilligt før CSRD. Manuel udfyldning af EFRAG's Basic-ark tager typisk 40-80 timer, fordi hver post skal kilde-dokumenteres i hånden. qlim8 mapper Basic-felterne (B1-B11) mod dit klimaregnskab og genererer rapporten som PDF eller Excel med dine tal indsat i de officielle celler. Pilotbrugere når rapporten på 4-8 timer: primært brugt på at kvalitetsreviewe, ikke på at taste ind [antagelse: pilot-tal, 2 brugere].",
    bullets: [
      "40+ datapunkter, primært klima og governance (EFRAG B1-B11).",
      "Til SMV'er med en kunde-, bank- eller frivillig VSME-anmodning.",
      "4-8 timer i qlim8 vs. 40-80 timer manuelt [antagelse: pilot-tal].",
    ],
  },
  painPoints: [
    {
      pain: "EFRAG's Basic-ark er tomt, og du skal finde og indtaste 40+ datapunkter med dokumentation bag hvert.",
      solution:
        "qlim8 mapper Basic-felterne mod dit klimaregnskab og udfylder de officielle celler automatisk.",
      outcome: "40-80 timers manuel udfyldning bliver til 4-8 timers kvalitetsreview [antagelse: pilot-tal].",
    },
    {
      pain: "Vandindvinding og lignende poster kræver at du graver i forsyningsfakturaer manuelt.",
      solution:
        "Vandindvinding forudfyldes automatisk fra m³-mængder på dine vandværks-fakturaer; spildevandslinjer frasorteres.",
      outcome: "Samme kubikmeter tælles ikke dobbelt, og du indtaster ikke tal fra forsyningsfakturaer i hånden.",
    },
    {
      pain: "Du afleverer et ark til banken eller revisor med røde 'MISSING VALUE'-markeringer.",
      solution:
        "Når wizarden er udfyldt, viser EFRAG-arkets egen valideringsfane grønt/OK for de krævede Basic-rækker.",
      outcome: "Du afleverer et ark der validerer, ikke et med røde felter.",
    },
    {
      pain: "Konsulent-tilbuddet på din første VSME-rapport er uforholdsmæssigt dyrt.",
      solution:
        "VSME Basic er inkluderet fra Starter (fra 300 kr/md); du betaler et abonnement, ikke et engangs-projekt.",
      outcome: "Erstat et førstegangs-konsulenthonorar på 75.000-200.000 kr. [antagelse, markeds-research] med en inkluderet feature.",
    },
  ],
  features: [
    {
      title: "40+ datapunkter, forudfyldt",
      body: "Basic dækker EFRAG-felterne B1-B11: primært Scope 1 og 2, indkøb i Scope 3 og governance-oplysninger. qlim8 mapper dem mod dit klimaregnskab, så cellerne er udfyldt når du åbner rapporten.",
    },
    {
      title: "Vandindvinding automatisk",
      body: "Vandindvinding udledes fra m³-/liter-mængder på dine vandværks-fakturaer, og spildevandslinjer frasorteres så samme kubikmeter ikke tælles dobbelt. Et af de datapunkter der ellers koster tid, er dækket.",
    },
    {
      title: "Grøn valideringsfane",
      body: "Tallene lander i EFRAG's officielle celler, så arkets egen valideringsfane viser OK for de krævede Basic-rækker når wizarden er udfyldt. Du afleverer ikke et ark med røde 'MISSING VALUE'-markeringer.",
    },
    {
      title: "Kildecitation pr. post",
      body: "Hvert tal er sporbart tilbage til den oprindelige faktura. Spørger banken eller revisoren til en post, er dokumentationen ét klik væk i stedet for en eftermiddags gravearbejde.",
    },
    {
      title: "PDF og Excel ud",
      body: "Rapporten kan hentes som PDF eller Excel i EFRAG-arkets format. Du leverer det format modtageren beder om uden at reformatere.",
    },
  ],
  valueStats: [
    { value: "4-8 timer", label: "til en Basic-rapport", note: "[antagelse: pilot-tal, 2 brugere]" },
    { value: "40+", label: "datapunkter (EFRAG B1-B11)" },
    { value: "Fra 300 kr/md", label: "Basic inkluderet i Starter" },
    { value: "Grøn valideringsfane", label: "for krævede Basic-rækker" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad dækker VSME Basic?",
        a: "40+ datapunkter i EFRAG-cellerne B1-B11: primært klima (Scope 1 og 2, indkøb i Scope 3) og governance-oplysninger. Det er det korte af de to VSME-moduler og er ofte nok til en kunde- eller bank-anmodning.",
      },
      {
        q: "Hvem passer Basic til?",
        a: "Den typiske danske SMV (5-250 medarbejdere) der har fået en anmodning om CO₂-tal fra en stor kunde eller bank, eller som vil rapportere frivilligt før CSRD. Har du brug for bredere social/governance eller fuld Scope 3, er Comprehensive det rette.",
      },
      {
        q: "Hvor hurtigt kan jeg have en Basic-rapport klar?",
        a: "Pilotbrugere når rapporten på 4-8 timer mod 40-80 timer ved manuel udfyldning [antagelse: pilot-tal, 2 brugere]. Tiden går primært til kvalitetsreview, fordi cellerne allerede er udfyldt fra dit klimaregnskab.",
      },
      {
        q: "Er VSME Basic inkluderet i abonnementet?",
        a: "Ja. VSME Basic er inkluderet fra Starter (fra 300 kr/md). Du betaler et abonnement frem for et førstegangs-konsulenthonorar på typisk 75.000-200.000 kr. [antagelse, markeds-research]. Se priser.",
      },
      {
        q: "Kan jeg opgradere til Comprehensive senere?",
        a: "Ja. Comprehensive ligger på Premium (1.195 kr/md) og bruger samme klimaregnskab. Kommer der et krav om det udvidede modul fra en bank eller stor kunde, skifter du modul uden at indsamle data forfra.",
      },
    ],
  },
  closingCta: {
    title: "Lav din VSME Basic-rapport på en eftermiddag",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og se dine egne tal lande i EFRAG's Basic-celler med kildecitation.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};

// ---------------------------------------------------------------------------
// PR_VSME_COMPREHENSIVE: VSME Comprehensive-modulet
// ---------------------------------------------------------------------------

export const PR_VSME_COMPREHENSIVE: MarketingPageCopy = {
  hero: {
    eyebrow: "VSME Comprehensive",
    title: "VSME Comprehensive: det udvidede modul, fra dit regnskab",
    subtitle:
      "Comprehensive er det store VSME-modul: 100+ datapunkter, fuld Scope 3 og bredere politik, mål og governance. qlim8 genererer det fra dit klimaregnskab, når en bank eller stor kunde beder om mere end grundtallene.",
    primaryCta,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Når Basic ikke er nok",
    body: "VSME Comprehensive er EFRAG's udvidede modul: 100+ datapunkter i cellerne C1-C9. Det tilføjer bredere social og governance oven på klimadelen, fuld Scope 3 og oplysninger om politikker og mål. Du får typisk brug for det når en bank stiller det som betingelse for finansiering, eller når en stor kunde beder om mere end de grundlæggende CO₂-tal til deres egen værdikæde-rapportering. Manuel udfyldning af Comprehensive er et større stykke arbejde end Basic, over 100 poster, hver med dokumentation. qlim8 mapper C1-C9-felterne mod dit klimaregnskab og genererer rapporten med tallene indsat i de officielle celler. Pilotbrugere når Comprehensive på 1-2 dages arbejde frem for et konsulent-engagement på 2-4 uger [antagelse].",
    bullets: [
      "100+ datapunkter i EFRAG-cellerne C1-C9.",
      "Fuld Scope 3 plus bredere social, governance, politik og mål.",
      "Til krav fra bank eller stor kunde om mere end grundtallene.",
    ],
  },
  painPoints: [
    {
      pain: "En bank eller stor kunde kræver det udvidede VSME-modul, og Basic-tallene rækker ikke.",
      solution:
        "qlim8 genererer VSME Comprehensive med 100+ datapunkter i EFRAG-cellerne C1-C9 fra dit klimaregnskab.",
      outcome: "Du opfylder det udvidede krav uden at bestille et separat konsulent-projekt.",
    },
    {
      pain: "Comprehensive er over 100 poster, og manuel udfyldning trækker ud i uger.",
      solution:
        "Cellerne udfyldes fra dit klimaregnskab, så arbejdet bliver review og de kvalitative afsnit, ikke rå indtastning.",
      outcome: "1-2 dages arbejde frem for et 2-4 ugers konsulent-engagement [antagelse].",
    },
    {
      pain: "Det udvidede modul kræver fuld Scope 3, og du har ikke leverandørernes tal.",
      solution:
        "Scope 3 opgøres GHG Protocol-konsistent, og leverandør-data fra Værdikæde-modulet ruller op i Scope 3-tabellerne.",
      outcome: "Scope 3-tabellerne er konsoliderede fra de leverandører der allerede har delt data.",
    },
    {
      pain: "Du skal bruge C1-C9 nu, men ved at CSRD rammer dig senere, og frygter at lave alt om.",
      solution:
        "Comprehensive bruger samme data som en senere ESRS E1-mapping til CSRD. Datagrundlaget genbruges.",
      outcome: "Comprehensive i dag bliver springbræt til CSRD, ikke spildt arbejde.",
    },
  ],
  features: [
    {
      title: "100+ datapunkter (C1-C9)",
      body: "Comprehensive dækker EFRAG-cellerne C1-C9 med over 100 datapunkter: klima i fuld bredde, social, governance og oplysninger om politikker og mål. qlim8 mapper dem mod dit klimaregnskab og de aktiviteter du har registreret.",
    },
    {
      title: "Fuld Scope 3 med værdikæde-rollup",
      body: "Scope 3 opgøres GHG Protocol-konsistent, og leverandør-data fra Værdikæde-modulet ruller automatisk op i tabellerne. De leverandører der har delt data, tæller med uden manuel sammenkopiering.",
    },
    {
      title: "Politik og mål",
      body: "Comprehensive beder om mere end tal: politikker, mål og handlinger. qlim8 strukturerer de kvalitative afsnit sammen med de kvantitative, så rapporten hænger sammen i EFRAG-formatet.",
    },
    {
      title: "Grøn valideringsfane",
      body: "Tallene lander i EFRAG's officielle Comprehensive-celler, så arkets egen valideringsfane viser OK/COMPLETE for de krævede rækker. En automatiseret genberegnings-test bekræfter at C1-C9 mapper korrekt.",
    },
    {
      title: "Springbræt til CSRD",
      body: "Rammer CSRD dit segment (fx Wave 3), bruger vi samme data med en ESRS E1-mapping. Comprehensive i dag betyder at du ikke indsamler data forfra når CSRD-kravet kommer.",
    },
  ],
  valueStats: [
    { value: "100+", label: "datapunkter (EFRAG C1-C9)" },
    { value: "1-2 dage", label: "vs. 2-4 ugers konsulent", note: "[antagelse: pilot-tal]" },
    { value: "Fuld Scope 3", label: "med værdikæde-rollup" },
    { value: "1.195 kr/md", label: "Comprehensive på Premium" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad er forskellen på VSME Comprehensive og Basic?",
        a: "Comprehensive er det udvidede modul: 100+ datapunkter i cellerne C1-C9 mod Basics 40+ i B1-B11. Det tilføjer fuld Scope 3, bredere social og governance samt oplysninger om politikker og mål. Basic dækker primært klima og governance.",
      },
      {
        q: "Hvem har brug for Comprehensive?",
        a: "Typisk virksomheder hvor en bank stiller det som betingelse for finansiering, eller hvor en stor kunde beder om mere end de grundlæggende CO₂-tal til deres egen værdikæde-rapportering. Rækker Basic, behøver du ikke Comprehensive.",
      },
      {
        q: "Hvor lang tid tager en Comprehensive-rapport?",
        a: "Pilotbrugere når den på 1-2 dages arbejde mod et 2-4 ugers konsulent-engagement [antagelse]. Cellerne udfyldes fra dit klimaregnskab, så tiden går til review og de kvalitative afsnit om politik og mål.",
      },
      {
        q: "Hvordan får jeg fuld Scope 3 med?",
        a: "Scope 3 opgøres GHG Protocol-konsistent, og leverandør-data fra Værdikæde-modulet ruller op i Scope 3-tabellerne. De leverandører der allerede har delt data, konsolideres automatisk ind.",
      },
      {
        q: "Hvad koster VSME Comprehensive?",
        a: "Comprehensive ligger på Premium (1.195 kr/md) og bruger samme klimaregnskab som Basic. Se priser. Rammer CSRD dig senere, genbruges datagrundlaget via en ESRS E1-mapping, ingen ny indsamling.",
      },
    ],
  },
  closingCta: {
    title: "Lever det udvidede VSME-modul uden konsulent-engagement",
    description:
      "Opret en gratis konto, kobl dit regnskab på, og se VSME Comprehensive lande i EFRAG's C1-C9-celler med fuld Scope 3.",
    primary: primaryCta,
    secondary: bookDemo,
  },
};
