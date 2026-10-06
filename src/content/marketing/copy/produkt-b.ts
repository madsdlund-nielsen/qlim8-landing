import type { MarketingPageCopy } from "@/content/marketing/types";
import { DEMO_CTA, PHONE_CTA } from "@/content/cta";

// Report-detail marketing copy: readers (Modtagere) + the report's visual look + VSME modules.
// Voice per docs/da/marketing/_shared/brand-voice.md + positioning.md.
// Grounded in docs/da/marketing/features/csrd-vsme-reporting.md and compliance/{vsme,csrd}.md.
// qlim8 is sold after a demo (see src/content/cta.ts): primary CTA is DEMO_CTA,
// closing secondary is PHONE_CTA, and no package prices appear in the copy.
// The PDF report is one report per whole reporting year, the same for every reader:
// no recipient variants, no named looks, no per-number citation inside the PDF
// (traceability lives in the platform and in the VSME ZIP's audit CSV).

const heroSecondaryCta = { label: "Se pakker", href: "/priser" } as const;

// ---------------------------------------------------------------------------
// PR_MODTAGERE: overblik-side: én rapport, sendt til forskellige læsere
// ---------------------------------------------------------------------------

export const PR_MODTAGERE: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "Ét klimaregnskab til alle der spørger",
    subtitle:
      "Bestyrelsen, investorerne, banken og dine samarbejdspartnere spørger efter det samme klimaregnskab. Med qlim8 sender du dem den samme rapport, bygget på ét regnskab, og giver hver læser det de typisk har brug for: PDF-rapporten, VSME-arket eller revisorens attestering.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Én rapport, forskellige læsere",
    body: "Dit klimaregnskab er ét sæt tal, og i platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra. Men læserne spørger forskelligt. Bestyrelsen vil have overblikket over året og jeres reduktionsmål. Investoren vil vide, at Scope 1, 2 og 3 er opgjort efter GHG Protocol. Banken beder ofte om VSME-datapunkter. Din store kunde vil bruge dine tal i sin egen Scope 3. qlim8 laver ikke en særskilt rapport til hver af dem. Du genererer én designet PDF-rapport for regnskabsåret og sender den til dem alle, og hvor en læser vil have mere, henter du det fra samme regnskab: EFRAG's VSME-arbejdsbog i Excel til banken, revisorens attestering til den der vil have tallene bekræftet, og et delbart link til dem der vil følge med.",
    bullets: [
      "Bestyrelse og ejere: PDF-rapporten med årets overblik, Scope 1-3 og reduktionsmål.",
      "Investorer: GHG Protocol-konsistente tal og, hvis de ønsker det, revisorens attestering.",
      "Bank: VSME-arbejdsbogen i EFRAG's Excel-format, med bilagsreference pr. linje.",
      "Samarbejdspartnere: din offentlige ESG-profil som ét link.",
    ],
  },
  painPoints: [
    {
      pain: "Du bygger den samme rapport om og om igen, fordi bestyrelsen, banken og kunden hver især beder om tallene.",
      solution:
        "Med qlim8 genererer du én PDF-rapport fra klimaregnskabet og sender den samme rapport til alle der spørger. Du klipper ikke tal sammen i hånden.",
      outcome: "2-3 dage sparet pr. rapporteringsrunde [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Tallene stemmer ikke på tværs, fordi de er kopieret manuelt mellem regneark på forskellige tidspunkter.",
      solution:
        "PDF-rapporten og VSME-arket bygger på det samme klimaregnskab. Retter du en faktura, retter du den ét sted, og næste rapport bygger på det rettede regnskab.",
      outcome: "Du sender ikke længere tal fra tre forskellige regneark til tre læsere.",
    },
    {
      pain: "Du ved ikke hvad den konkrete læser faktisk har brug for, så du sender enten for lidt eller alt for meget.",
      solution:
        "Start med PDF-rapporten, som alle kan læse. Beder banken om VSME, henter du EFRAG's Excel-arbejdsbog. Vil nogen have tallene bekræftet, kan din revisor attestere rapporten.",
      outcome: "Færre frem-og-tilbage-mails; du ved hvad du sender til hvem.",
    },
    {
      pain: "Når regnskabet rettes efter en rapport er sendt, ved du ikke længere hvad modtageren faktisk fik.",
      solution:
        "Hver genereret rapport får et versionsnummer og gemmes med det datagrundlag den blev lavet på. Den ændres ikke bagefter; retter du regnskabet, genererer du en ny version.",
      outcome: "Du kan altid finde præcis den version du sendte, med det datagrundlag den bygger på.",
    },
  ],
  features: [
    {
      title: "PDF-rapport til alle læsere",
      body: "Én designet rapport for regnskabsåret med overblik over året, Scope 1, 2 og 3 og jeres reduktionsmål. Den samme rapport kan gå til bestyrelsen, investorerne, banken og jeres partnere. PDF-rapporten er med i alle pakker.",
    },
    {
      title: "VSME-arket til banken",
      body: "Beder banken eller en stor kunde om VSME, henter du EFRAG's officielle Excel-arbejdsbog (Basic eller Comprehensive) i en ZIP sammen med en revisions-CSV, der for hver linje angiver bilaget bag tallet.",
    },
    {
      title: "Revisorens attestering",
      body: "Inviterer du din revisor ind i platformen, kan revisoren attestere en gemt rapport ved at uploade sin underskrevne erklæring. Platformen forsegler en kvittering, der binder erklæringen til præcis den version af rapporten og dens datagrundlag.",
    },
    {
      title: "Dél med samarbejdspartnere",
      body: "Din offentlige ESG-profil (Brag Board) er ét link, du kan give til kunder og leverandører i stedet for at udfylde deres regneark. Bruger kunden qlim8 Enterprise, kan du også dele data gennem deres værdikæde-modul.",
    },
    {
      title: "Fælles datagrundlag",
      body: "Alt bygger på det samme klimaregnskab, og i platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra. Ét sted at rette, og den næste rapport bygger på det rettede.",
    },
  ],
  valueStats: [
    { value: "1", label: "rapport til alle læsere" },
    { value: "Versioneret", label: "hver rapport gemmes med sit datagrundlag" },
    { value: "2-3 dage", label: "sparet pr. rapporteringsrunde", note: "[antagelse: interne tidsestimater]" },
    { value: "Alle pakker", label: "har PDF-rapporten med" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Får bestyrelsen, banken og investoren hver sin rapport?",
        a: "Nej. qlim8 laver ikke særskilte versioner til hver læser. Du genererer én PDF-rapport for regnskabsåret og sender den samme rapport til dem der spørger. Beder banken eller en kunde om VSME, henter du EFRAG's Excel-arbejdsbog fra samme klimaregnskab.",
      },
      {
        q: "Kan jeg tilpasse hvilke datapunkter en bestemt modtager får?",
        a: "Ikke i PDF-rapporten; den har samme indhold uanset hvem den sendes til. Du kan vælge rapportens visuelle udtryk, og du vælger selv, om læseren skal have PDF-rapporten, VSME-arket eller begge.",
      },
      {
        q: "Hvad sker der med en rapport hvis jeg retter regnskabet bagefter?",
        a: "Ingenting. En rapport gemmes med versionsnummer og det datagrundlag den blev lavet på, og den ændres ikke bagefter. Retter du regnskabet, genererer du en ny version. Så du kan altid finde præcis den version du sendte.",
      },
      {
        q: "Kræver PDF-rapporten en bestemt pakke?",
        a: "Nej. PDF-rapporten er med i alle pakker, også den gratis. Hvad hver pakke ellers indeholder, står på pakkesiden.",
      },
      {
        q: "Kan revisoren bekræfte tallene i rapporten?",
        a: "Ja. Du inviterer din revisor ind i platformen, hvor hvert tal kan følges tilbage til bilaget. Revisoren kan attestere en gemt rapport ved at uploade sin underskrevne erklæring, og platformen forsegler en kvittering, der binder erklæringen til præcis den version af rapporten og dens datagrundlag.",
      },
    ],
  },
  closingCta: {
    title: "Byg ét klimaregnskab: send det til alle der spørger",
    description:
      "Book en demo, så viser vi PDF-rapporten, VSME-arket og revisorens attestering, alle bygget på samme klimaregnskab.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_BESTYRELSE: klimaregnskab til bestyrelsen
// ---------------------------------------------------------------------------

export const PR_BESTYRELSE: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "Klimaregnskab til bestyrelsen: overblik til mødet",
    subtitle:
      "Bestyrelsen skal ikke læse en revisionsrapport på 40 sider. De skal se årets overblik og hvor I står i forhold til jeres reduktionsmål. qlim8 genererer PDF-rapporten direkte fra dit regnskab, og udviklingen over tid kan I følge i platformen.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Et bestyrelsesmøde er ikke en revision",
    body: "Når klimaregnskabet skal på dagsordenen, har bestyrelsen ét spørgsmål: hvordan går det, og hvad skal vi beslutte? Et 100-siders EFRAG-ark svarer ikke på det. qlim8 giver dig to ting at tage med til mødet. PDF-rapporten for regnskabsåret viser overblikket over året, Scope 1, 2 og 3 og jeres reduktionsmål, og den kan sendes ud med mødematerialet. I platformen kan I følge udviklingen over tid og status mod jeres mål, så I kan gå i dybden på mødet. Tallene er opgjort GHG Protocol-konsistent, og i platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra, så et spørgsmål fra et bestyrelsesmedlem kan besvares på stedet.",
    bullets: [
      "PDF-rapport med årets overblik, Scope 1-3 og jeres reduktionsmål.",
      "Udvikling over tid og status mod mål i platformen.",
      "Hvert tal kan følges til bilaget i platformen, hvis nogen spørger.",
    ],
  },
  painPoints: [
    {
      pain: "Bestyrelsen får et compliance-ark de ikke kan bruge til at træffe beslutninger, så klimapunktet bliver skøjtet over.",
      solution:
        "qlim8 genererer en PDF-rapport med årets overblik, Scope 1, 2 og 3 og jeres reduktionsmål, som kan ligge i mødematerialet.",
      outcome: "Klimapunktet bliver et reelt dagsordenspunkt i stedet for et bilag ingen læser.",
    },
    {
      pain: "Du bruger en aften på at klippe grafer og tal sammen til bestyrelsen manuelt, hver gang.",
      solution:
        "Rapporten trækkes direkte fra dit klimaregnskab for hele regnskabsåret. Du vælger rapportens udtryk og genererer.",
      outcome: "Aftenens klip-og-klister falder bort; typisk 3-5 timer sparet pr. møde [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Et bestyrelsesmedlem spørger 'hvor kommer det tal fra?', og du kan ikke svare i mødet.",
      solution:
        "I platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra. Har du platformen åben på mødet, kan du vise det.",
      outcome: "Bestyrelsens tillid til tallene bygges i mødet, ikke i en opfølgnings-mail en uge efter.",
    },
    {
      pain: "Bestyrelsen spørger, om I er på vej mod målet, og svaret ligger spredt i regneark.",
      solution:
        "Jeres reduktionsmål står i rapporten, og i platformen kan I følge udviklingen over tid og status mod målene.",
      outcome: "Bestyrelsen kan diskutere udviklingen ud fra ét sted, ikke ud fra tre regneark.",
    },
  ],
  features: [
    {
      title: "Årets overblik og reduktionsmål",
      body: "PDF-rapporten samler regnskabsåret: overblik over året, Scope 1, 2 og 3 og de reduktionsmål I har sat. Den kan sendes ud med mødematerialet og læses uden adgang til platformen.",
    },
    {
      title: "Udvikling og status i platformen",
      body: "Vil bestyrelsen se, hvordan udledningen har udviklet sig, og hvor I står i forhold til målene, viser platformen det. Rapporten er et billede af året; platformen viser bevægelsen.",
    },
    {
      title: "Sporbart i platformen",
      body: "I platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra. Når et bestyrelsesmedlem stiller det svære spørgsmål, er dokumentationen et par klik væk.",
    },
    {
      title: "Til et møde, ikke en revision",
      body: "Rapporten bygger på det samme klimaregnskab som en eventuel VSME-rapport, men den er et læsbart overblik, ikke et EFRAG-ark med 100 datapunkter. Du vælger rapportens visuelle udtryk, før du genererer.",
    },
    {
      title: "Den version bestyrelsen fik",
      body: "Hver genereret rapport får et versionsnummer og gemmes med det datagrundlag den blev lavet på. Retter du regnskabet bagefter, ændres den sendte rapport ikke, så referatet kan henvise til præcis den version bestyrelsen fik.",
    },
  ],
  valueStats: [
    { value: "3-5 timer", label: "sparet pr. bestyrelsesmøde", note: "[antagelse: interne tidsestimater]" },
    { value: "Scope 1-3", label: "og reduktionsmål i rapporten" },
    { value: "GHG Protocol", label: "konsistent opgørelse" },
    { value: "Alle pakker", label: "har PDF-rapporten med" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad indeholder et klimaregnskab til bestyrelsen?",
        a: "PDF-rapporten viser overblikket over regnskabsåret, Scope 1, 2 og 3 og jeres reduktionsmål. Udviklingen over tid og status mod målene ser I i platformen. Rapporten bygger på det samme klimaregnskab som resten af jeres rapportering.",
      },
      {
        q: "Kan vi se udviklingen fra år til år?",
        a: "Ja, i platformen. Dashboardet viser udviklingen over tid. PDF-rapporten dækker ét regnskabsår ad gangen.",
      },
      {
        q: "Findes der en særlig bestyrelsesudgave af rapporten?",
        a: "Nej. Der er én PDF-rapport, og den samme rapport kan gå til bestyrelsen, ejerne eller banken. Du vælger dens visuelle udtryk og genererer, og der er ikke to datasæt at holde synkroniseret.",
      },
      {
        q: "Hvad hvis vi retter regnskabet efter bestyrelsen har fået rapporten?",
        a: "Rapporten bestyrelsen fik, ændres ikke. Den blev gemt med versionsnummer og datagrundlag, da den blev genereret. Retter I regnskabet, genererer I en ny version, og referatet kan stadig henvise til den version bestyrelsen faktisk så.",
      },
      {
        q: "Hvad koster det at lave bestyrelsesrapporter?",
        a: "PDF-rapporten er med i alle pakker, også den gratis. Hvad hver pakke ellers indeholder, og priserne, står på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Giv bestyrelsen et klimaregnskab de kan beslutte ud fra",
    description:
      "Book en demo, hvor vi viser PDF-rapporten med årets overblik og reduktionsmål, og hvordan I følger udviklingen i platformen.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
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
      "Investorer og ejere skal kunne holde jeres klimatal op mod resten af porteføljen. qlim8 opgør Scope 1, 2 og 3 GHG Protocol-konsistent og samler året i en PDF-rapport, og udviklingen over tid kan følges i platformen.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Investoren sammenligner: sørg for at det kan lade sig gøre",
    body: "En investor læser aldrig kun jeres klimaregnskab. De læser det ved siden af ti andre selskabers. Det der gør jeres tal brugbare for dem, er ikke detaljeringsgraden, men at de kan sammenlignes: at Scope 1, 2 og 3 er opgjort GHG Protocol-konsistent, og at det er tydeligt hvad tallene bygger på. qlim8 opgør jeres klimaregnskab efter GHG Protocol og genererer en PDF-rapport for regnskabsåret, som I kan sende til ejerkredsen. Vil investoren gå tallene efter, kan hvert tal i platformen følges tilbage til linjen og bilaget, og jeres revisor kan attestere rapporten.",
    bullets: [
      "GHG Protocol-konsistent Scope 1, 2 og 3.",
      "PDF-rapport for regnskabsåret; udviklingen over tid i platformen.",
      "Revisoren kan attestere præcis den version I sender.",
    ],
  },
  painPoints: [
    {
      pain: "Investoren kan ikke sammenligne jeres tal med resten af porteføljen, fordi metoden er uklar.",
      solution:
        "qlim8 opgør Scope 1, 2 og 3 GHG Protocol-konsistent, så tallene er sammenlignelige på tværs af selskaber.",
      outcome: "Investoren ved, hvilken standard tallene er opgjort efter.",
    },
    {
      pain: "Investoren vil se udviklingen, men du har kun et øjebliksbillede i et regneark.",
      solution:
        "Dashboardet i platformen viser udviklingen i jeres udledning over tid. PDF-rapporten samler det enkelte regnskabsår.",
      outcome: "Udviklingen ligger ét sted, ikke spredt over flere års regneark.",
    },
    {
      pain: "Due diligence-spørgsmål om et enkelt tal koster dig dage med at grave i regneark.",
      solution:
        "I platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra, og jeres revisor kan arbejde med i platformen.",
      outcome: "Due diligence-runden bliver kortere; typisk 4-8 timer sparet pr. runde [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Du sender investoren et statisk PDF, og næste år skal alt laves om fra bunden.",
      solution:
        "Rapporten genereres fra det løbende klimaregnskab. Når næste regnskabsår er komplet, genererer du en ny rapport.",
      outcome: "Den årlige investor-rapportering bliver en generering, ikke et projekt.",
    },
  ],
  features: [
    {
      title: "GHG Protocol-konsistent opgørelse",
      body: "Scope 1, 2 og 3 opgøres efter GHG Protocol, så jeres tal er sammenlignelige med andre selskaber i investorens portefølje. Bemærk: konsistent, ikke akkrediteret, vi opgør efter standarden, vi udsteder ikke certifikater.",
    },
    {
      title: "Udvikling over tid i platformen",
      body: "Dashboardet i platformen viser udviklingen i jeres CO₂e-aftryk over tid. PDF-rapporten dækker ét regnskabsår ad gangen med overblik, Scope 1, 2 og 3 og jeres reduktionsmål.",
    },
    {
      title: "Scope 3 sporbart i platformen",
      body: "Scope 3-posterne, inkl. indkøb (kat. 1), kan i platformen følges tilbage til linjen og bilaget de bygger på. Investorens spørgsmål til det største og mest usikre scope kan besvares med dokumentationen.",
    },
    {
      title: "Klar til due diligence",
      body: "Investoren kan få tallene bekræftet af jeres revisor. Revisoren attesterer en gemt rapport ved at uploade sin underskrevne erklæring, og platformen forsegler en kvittering, der binder erklæringen til præcis den version af rapporten og dens datagrundlag.",
    },
    {
      title: "Ny rapport hvert regnskabsår",
      body: "Rapporten trækkes fra det løbende klimaregnskab for et helt regnskabsår. Hver generering gemmes som en ny version med sit datagrundlag, så I altid kan se, hvad ejerkredsen fik hvilket år.",
    },
  ],
  valueStats: [
    { value: "Scope 1-3", label: "GHG Protocol-konsistent" },
    { value: "Udvikling", label: "over tid i platformens dashboard" },
    { value: "4-8 timer", label: "sparet pr. due diligence-runde", note: "[antagelse: interne tidsestimater]" },
    { value: "Attestering", label: "fra revisoren, bundet til rapportens version" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad gør vores klimatal sammenlignelige for en investor?",
        a: "At de er opgjort GHG Protocol-konsistent, så investoren kan holde jeres Scope 1, 2 og 3 op mod andre selskaber, der opgør efter samme standard. Det hjælper også, at det er tydeligt hvad tallene bygger på; i platformen kan hvert tal følges tilbage til bilaget.",
      },
      {
        q: "Betyder GHG Protocol-konsistent at tallene er certificerede?",
        a: "Nej. Vi opgør efter GHG Protocol-metoden, men vi er ikke et akkrediteringsorgan og udsteder ikke certifikater. Det jeres revisor kan gøre, er at attestere en rapport: revisoren uploader sin underskrevne erklæring i platformen, og den bindes til præcis den version af rapporten.",
      },
      {
        q: "Kan investoren verificere tallene selv?",
        a: "Tallene verificeres bedst gennem jeres revisor, som I inviterer ind i platformen, hvor hvert tal kan følges tilbage til linjen og bilaget. Revisoren kan derefter attestere rapporten. PDF-rapporten er et overblik; dokumentationen bag tallene ligger i platformen.",
      },
      {
        q: "Kan jeg lave investor-rapporten oftere end én gang om året?",
        a: "PDF-rapporten dækker et helt regnskabsår, og alle 12 måneder skal have data. Vil ejerkredsen følge med i løbet af året, viser dashboardet i platformen udviklingen.",
      },
      {
        q: "Hvilken plan skal jeg have for investor-rapportering?",
        a: "PDF-rapporten er med i alle pakker, også den gratis. Hvad hver pakke ellers indeholder, står på pakkesiden.",
      },
    ],
  },
  closingCta: {
    title: "Giv investoren tal de kan sammenligne",
    description:
      "Book en demo, hvor vi viser en GHG Protocol-konsistent rapport, udviklingen i platformen og revisorens attestering.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_BANK: ESG-data til banken (VSME-arket + PDF-rapporten)
// ---------------------------------------------------------------------------

export const PR_BANK: MarketingPageCopy = {
  hero: {
    eyebrow: "Modtagere",
    title: "ESG-data til banken: VSME-arket og rapporten",
    subtitle:
      "Banken beder om ESG-data før de godkender finansieringen, ofte i form af VSME. qlim8 udfylder EFRAG's VSME-arbejdsbog i Excel fra dit klimaregnskab, og PDF-rapporten giver rådgiveren et læsbart overblik.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Bankens ESG-krav skal ikke forsinke lånet",
    body: "Flere og flere banker beder om ESG- og klimadata før de godkender et lån eller en kreditramme, ofte med henvisning til L193 og deres egne bæredygtighedskrav til udlån. Mange beder om VSME, EFRAG's frivillige standard for SMV'er. Problemet er sjældent tallene; det er formatet og dokumentationen. qlim8 laver ikke en særlig bankrapport. I stedet genererer du EFRAG's officielle VSME-arbejdsbog i Excel (Basic eller Comprehensive) direkte fra dit klimaregnskab. Den leveres i en ZIP sammen med en revisions-CSV, der for hver linje angiver bilaget bag tallet, og et revisionsspor. Til rådgiveren, der vil have et overblik, sender du PDF-rapporten for regnskabsåret. Tjek altid bankens konkrete skema med din rådgiver, da kravene varierer.",
    bullets: [
      "EFRAG's VSME-arbejdsbog i Excel, Basic eller Comprehensive.",
      "Revisions-CSV og revisionsspor i samme ZIP: hver linje kan føres til bilaget.",
      "PDF-rapport for regnskabsåret som læsbart overblik.",
    ],
  },
  painPoints: [
    {
      pain: "Banken sender et ESG-skema du ikke ved hvordan du udfylder, og finansieringen står stille imens.",
      solution:
        "Beder banken om VSME, udfylder qlim8 EFRAG's officielle arbejdsbog med dine tal i cellerne, direkte fra dit klimaregnskab.",
      outcome: "ESG-kravet bliver et vedhæftet bilag frem for et skema du udfylder i hånden.",
    },
    {
      pain: "Du opgør tallene selv, men banken afviser formatet, og du starter forfra.",
      solution:
        "VSME-arket kommer i EFRAG's eget Excel-format, så banken får standarden som den er udgivet. Bruger banken sit eget skema, har du tallene samlet ét sted at hente dem fra.",
      outcome: "Færre afvisningsrunder med bankens kreditafdeling.",
    },
    {
      pain: "Bankens rådgiver stiller spørgsmål til et enkelt tal, og du kan ikke dokumentere hvor det kommer fra.",
      solution:
        "Revisions-CSV'en i VSME-ZIP'en angiver for hver linje bilagsnummer og filens hash, og i platformen kan tallet følges til bilaget.",
      outcome: "Bankens spørgsmål besvares med dokumentationen, ikke med en eftermiddags gravearbejde.",
    },
    {
      pain: "Du skal levere opdaterede tal hvert år for at beholde den grønne rente, og det bliver et projekt hver gang.",
      solution:
        "Arket og rapporten genereres fra det løbende klimaregnskab. Årlig opdatering er en generering, ikke et nyt dataindsamlings-projekt.",
      outcome: "Den løbende bank-rapportering koster timer, ikke uger.",
    },
  ],
  features: [
    {
      title: "VSME-arbejdsbogen, udfyldt",
      body: "qlim8 udfylder EFRAG's officielle VSME-arbejdsbog i Excel, Basic eller Comprehensive, med tallene fra dit klimaregnskab. Du oversætter ikke dit regnskab til et tomt ark i hånden.",
    },
    {
      title: "Dokumentation i samme ZIP",
      body: "Arbejdsbogen leveres i en ZIP sammen med en revisions-CSV (bilagsnummer, ekstern reference og filens hash for hver linje), et revisionsspor og et kontrolscript. Kreditafdelingen kan se, hvad hvert tal bygger på.",
    },
    {
      title: "PDF-rapport som overblik",
      body: "Til rådgiveren, der vil læse frem for at regne, sender du PDF-rapporten for regnskabsåret med overblik over året, Scope 1, 2 og 3 og jeres reduktionsmål. Den bygger på samme klimaregnskab som VSME-arket.",
    },
    {
      title: "GHG Protocol-konsistent opgørelse",
      body: "Scope 1, 2 og 3 opgøres efter GHG Protocol, så banken kan læse tallene ind i sin egen kreditmodel uden at gætte på metoden.",
    },
    {
      title: "Årlig opdatering uden nyt projekt",
      body: "Skal du dokumentere klimatal årligt for at beholde en grøn finansiering, genererer du arket og rapporten igen fra det løbende regnskab, når året er komplet. Hver generering gemmes som en ny version.",
    },
  ],
  valueStats: [
    { value: "VSME i Excel", label: "EFRAG's officielle arbejdsbog" },
    { value: "Basic + Comprehensive", label: "de to VSME-moduler" },
    { value: "Pr. linje", label: "bilagsreference i revisions-CSV'en" },
    { value: "Timer", label: "til årlig opdatering, ikke uger", note: "[antagelse: interne tidsestimater]" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvad skal en ESG-rapport til banken indeholde?",
        a: "Det varierer, men typisk jeres klimatal (Scope 1, 2 og ofte 3) opgjort konsistent, og mange banker beder om VSME. qlim8 udfylder EFRAG's VSME-arbejdsbog fra dit klimaregnskab, og PDF-rapporten giver et læsbart overblik. Tjek bankens konkrete skema med din rådgiver.",
      },
      {
        q: "Hvad er L193 i denne sammenhæng?",
        a: "Bankernes øgede krav om at indhente og vurdere bæredygtighedsdata fra erhvervskunder afspejler sig i konkrete datakrav ved finansiering, og VSME er et format mange banker accepterer. qlim8 laver ikke en bank-specifik rapport, men leverer VSME-arket og PDF-rapporten. Tjek det konkrete skema med din bankrådgiver, da kravene varierer mellem banker.",
      },
      {
        q: "Kan jeg sende filerne direkte til banken?",
        a: "Ja. Du henter ZIP'en med VSME-arbejdsbogen og PDF-rapporten i platformen og lægger dem i bankens portal eller sender dem til rådgiveren. Bruger banken sit eget skema, skal tallene stadig overføres dertil.",
      },
      {
        q: "Hvordan besvarer jeg bankens spørgsmål til et enkelt tal?",
        a: "I platformen kan hvert tal følges tilbage til linjen og bilaget, og revisions-CSV'en i VSME-ZIP'en angiver bilaget for hver linje. Vil banken have tallene bekræftet, kan din revisor attestere rapporten i platformen.",
      },
      {
        q: "Hvad koster det at lave ESG-dokumentation til banken?",
        a: "PDF-rapporten er med i alle pakker, også den gratis. Hvilke VSME-moduler hver pakke indeholder, og priserne, står på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Lever bankens ESG-krav uden at forsinke finansieringen",
    description:
      "Book en demo, hvor vi viser VSME-arket, revisions-CSV'en og PDF-rapporten, som du kan sende til banken.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
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
      "Dine store kunder og leverandører beder om dine klimatal til deres Scope 3. I stedet for at udfylde deres regneark hver gang kan du give dem ét link til din offentlige ESG-profil, og bruger kunden selv qlim8 Enterprise, kan du dele dine tal gennem deres værdikæde-modul.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Når din kunde beder om dine tal til deres Scope 3",
    body: "Store kunder og leverandører har deres egen CSRD- eller VSME-forpligtelse, og du er en del af deres Scope 3. Derfor lander der et regneark i din indbakke: 'udfyld venligst jeres CO₂-tal'. Det regneark er lidt forskelligt hver gang, og du bruger en formiddag på at oversætte dit klimaregnskab til deres kolonner. qlim8 giver dig to veje. Din offentlige ESG-profil (Brag Board) viser de klimatal du vælger at gøre offentlige, direkte fra regnskabet, og du kan give linket til alle der spørger. Bruger kunden qlim8 Enterprise, kan du dele data med dem gennem værdikæde-modulet: kunden får en fastfrosset VSME Comprehensive-version af dine tal og den andel af din udledning, der fordeles til dem. Vil en partner have noget at læse, kan du sende PDF-rapporten for regnskabsåret.",
    bullets: [
      "Ét offentligt profil-link i stedet for at udfylde deres regneark.",
      "Værdikæde-deling med kunder på Enterprise: en fastfrosset version med din andel.",
      "PDF-rapporten som læsbart overblik, hvis partneren beder om det.",
    ],
  },
  painPoints: [
    {
      pain: "Hver stor kunde sender sit eget regneark, og du oversætter dit klimaregnskab til deres kolonner igen og igen.",
      solution:
        "Din offentlige ESG-profil samler dine tal ét sted, og du giver alle der spørger det samme link i stedet for at udfylde hver skabelon.",
      outcome: "En formiddag pr. kunde-forespørgsel falder bort [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Du er ikke sikker på hvilke af dine tal der hører til netop den kundes Scope 3.",
      solution:
        "Bruger kunden qlim8 Enterprise, får de gennem værdikæde-modulet den andel af din udledning, der fordeles til dem, sammen med en fastfrosset VSME Comprehensive-version af dine tal.",
      outcome: "Kunden kan bruge tallene uden at spørge, hvad de dækker.",
    },
    {
      pain: "Partneren stiller spørgsmål til et tal, og du kan ikke dokumentere det uden at grave i bilag.",
      solution:
        "I platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra, så du kan svare med dokumentationen.",
      outcome: "Partnerens spørgsmål besvares hurtigt, uden en eftermiddag i bilagsmappen.",
    },
    {
      pain: "Du sender rettede tal rundt, og ingen ved, hvilken udgave der er den gældende.",
      solution:
        "Din offentlige profil viser altid de aktuelle tal fra regnskabet. Det du deler gennem værdikæde-modulet, er derimod en fastfrosset version, så kunden ved præcis hvad de har fået.",
      outcome: "Klare udgaver: profilen følger regnskabet, den delte version står fast.",
    },
  ],
  features: [
    {
      title: "Ét offentligt link",
      body: "Din offentlige ESG-profil (Brag Board) er ét link, du kan give til alle der spørger. Beder tre kunder om det samme, giver du dem samme link uden nyt arbejde. Linket er det samme for alle; det er ikke tilpasset den enkelte partner.",
    },
    {
      title: "Værdikæde-deling på Enterprise",
      body: "Bruger din kunde qlim8 Enterprise, kan du dele data med dem gennem værdikæde-modulet. Kunden får en fastfrosset VSME Comprehensive-version af dine tal og den andel af din udledning, der fordeles til dem, til brug i deres Scope 3.",
    },
    {
      title: "Dokumentationen ligger i platformen",
      body: "I platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra. Spørger partneren eller deres revisor, kan du finde dokumentationen frem.",
    },
    {
      title: "PDF-rapport som overblik",
      body: "Vil en partner have noget at læse frem for et link, sender du PDF-rapporten for regnskabsåret med overblik over året, Scope 1, 2 og 3 og jeres reduktionsmål. Det er den samme rapport, du sender til alle andre.",
    },
    {
      title: "Levende profil, fastfrosne delinger",
      body: "Den offentlige profil følger dit klimaregnskab. Det du deler gennem værdikæde-modulet, og hver PDF-rapport du genererer, står fast som den version modtageren fik. Retter du regnskabet, bliver det en ny version, ikke en stille ændring af den gamle.",
    },
  ],
  valueStats: [
    { value: "1 link", label: "i stedet for N regneark" },
    { value: "Fastfrosset", label: "version ved værdikæde-deling" },
    { value: "Din andel", label: "af kundens Scope 3 via Enterprise-værdikæden" },
    { value: "Pr. bilag", label: "sporbart i platformen" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Min store kunde beder om vores CO₂-tal til deres Scope 3. Hvad deler jeg?",
        a: "Du kan give dem linket til din offentlige ESG-profil eller sende PDF-rapporten for regnskabsåret. Bruger kunden qlim8 Enterprise, kan du dele gennem deres værdikæde-modul, så de får en fastfrosset VSME Comprehensive-version af dine tal og den andel, der fordeles til dem.",
      },
      {
        q: "Skal jeg udfylde et nyt regneark for hver kunde der spørger?",
        a: "Ikke nødvendigvis. Du kan give alle det samme link til din offentlige profil. Insisterer en kunde på sit eget skema, har du tallene samlet i qlim8 at hente dem fra.",
      },
      {
        q: "Kan partneren stole på tallene?",
        a: "I platformen kan hvert tal følges tilbage til linjen og bilaget det kommer fra. Vil partneren have tallene bekræftet, kan din revisor attestere en rapport: revisoren uploader sin underskrevne erklæring, og den bindes til præcis den version af rapporten og dens datagrundlag.",
      },
      {
        q: "Hvad hvis vi retter regnskabet efter vi har delt tallene?",
        a: "Din offentlige profil følger regnskabet og viser de rettede tal. En værdikæde-deling og en genereret PDF-rapport er derimod fastfrosne versioner; de ændres ikke, og en rettelse bliver en ny version.",
      },
      {
        q: "Hvilken plan skal jeg have for at dele data med partnere?",
        a: "PDF-rapporten er med i alle pakker. Værdikæde-delingen, hvor kunden får din andel af deres Scope 3, kræver at kunden bruger qlim8 Enterprise. Hvad hver pakke ellers indeholder, står på pakkesiden.",
      },
    ],
  },
  closingCta: {
    title: "Dél dine klimadata som ét link",
    description:
      "Book en demo, så viser vi den offentlige profil, PDF-rapporten og værdikæde-delingen på Enterprise.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};

// ---------------------------------------------------------------------------
// PR_TEMAER: vælg rapportens visuelle udtryk
// ---------------------------------------------------------------------------

export const PR_TEMAER: MarketingPageCopy = {
  hero: {
    eyebrow: "Rapport",
    title: "Vælg rapportens visuelle udtryk",
    subtitle:
      "PDF-rapporten findes i flere visuelle udtryk. Du vælger det, der passer til jeres virksomhed og læsere, før du genererer. Tallene er de samme uanset udtryk.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Indpakningen betyder noget, når rapporten skal læses",
    body: "En klimarapport skal læses, ikke bare arkiveres, og udtrykket er med til at afgøre, om den bliver det. qlim8 lader dig vælge mellem flere visuelle udtryk til PDF-rapporten uden at røre ved indholdet. Udtrykket bestemmer typografi, farver og layout; tallene kommer fra det samme klimaregnskab, uanset hvad du vælger. Du vælger udtryk, før du genererer, og rapporten kommer ud færdig-designet. Vil du se et andet udtryk, genererer du igen, og det bliver en ny version af rapporten med sit eget versionsnummer. Så du bruger ikke tid i et layoutprogram.",
    bullets: [
      "Flere visuelle udtryk til PDF-rapporten.",
      "Samme tal; kun typografi, farver og layout skifter.",
      "Vælg før du genererer; en ny generering er en ny version.",
    ],
  },
  painPoints: [
    {
      pain: "Standard-rapporten passer ikke til jer. Den er enten for pyntet eller for tør.",
      solution:
        "Vælg det udtryk, der passer til jeres virksomhed og læsere, blandt flere designs.",
      outcome: "Rapporten får et udtryk, der passer til læseren, uden at du rører ved tallene.",
    },
    {
      pain: "Du eksporterer til PDF og bruger derefter en aften i et layoutprogram på at få den til at se præsentabel ud.",
      solution:
        "Udtrykket anvendes ved genereringen. Rapporten kommer ud færdig-designet.",
      outcome: "Layout-aftenen falder bort; typisk 2-4 timer sparet pr. rapport [antagelse: interne tidsestimater, ikke kundevalideret].",
    },
    {
      pain: "Skifter du udtryk, er du bange for at tallene flytter sig.",
      solution:
        "Udtrykket er kun visuelt. Tallene kommer fra det samme klimaregnskab, uanset hvilket udtryk du vælger.",
      outcome: "Udtrykket ændrer ikke beregningen, så du kan vælge efter læseren.",
    },
    {
      pain: "Når du har prøvet flere udtryk, er du i tvivl om, hvilken udgave af rapporten der blev sendt.",
      solution:
        "Hver generering gemmes som en ny version med versionsnummer og det datagrundlag den bygger på. Den ændres ikke bagefter.",
      outcome: "Du kan altid finde præcis den version, du sendte.",
    },
  ],
  features: [
    {
      title: "Flere udtryk at vælge imellem",
      body: "PDF-rapporten findes i flere visuelle udtryk med hver sin typografi, farvebrug og layout. Du vælger det, der passer til jeres virksomhed og til dem, der skal læse rapporten.",
    },
    {
      title: "Samme indhold i alle udtryk",
      body: "Uanset udtryk bygger rapporten på det samme klimaregnskab og har det samme indhold: overblik over året, Scope 1, 2 og 3 og jeres reduktionsmål. Udtrykket ændrer typografi, farver og layout, ikke hvad rapporten siger.",
    },
    {
      title: "Færdig-designet PDF",
      body: "Vælg udtryk før du genererer, og rapporten kommer ud færdig-designet i PDF. Ingen manuel opsætning i et layoutprogram.",
    },
    {
      title: "Ny generering, ny version",
      body: "Vil du se rapporten i et andet udtryk, genererer du igen. Det bliver en ny version med eget versionsnummer, og den tidligere version gemmes uændret. Du kan altid se, hvilken version der blev sendt.",
    },
    {
      title: "Én rapport til alle læsere",
      body: "Den samme rapport kan gå til bestyrelsen, investorerne, banken og jeres partnere. Udtrykket vælger du ud fra, hvem der primært skal læse den.",
    },
  ],
  howItWorks: {
    title: "Sådan vælger du rapportens udtryk",
    steps: [
      {
        title: "1. Opgør dit klimaregnskab",
        body: "Kobl dit regnskab på, og lad qlim8 opgøre klimaregnskabet. Rapporten dækker et helt regnskabsår, så alle 12 måneder skal have data.",
      },
      {
        title: "2. Vælg udtryk",
        body: "Vælg rapportens visuelle udtryk, før du genererer. Valget bestemmer typografi, farver og layout.",
      },
      {
        title: "3. Generér rapporten",
        body: "Rapporten kommer ud som færdig-designet PDF i det valgte udtryk og gemmes som en version med sit datagrundlag.",
      },
      {
        title: "4. Generér igen, hvis du vil se et andet",
        body: "Vil du have et andet udtryk, vælger du det og genererer igen. Det giver en ny version; den første gemmes uændret.",
      },
    ],
  },
  valueStats: [
    { value: "Flere", label: "visuelle udtryk at vælge imellem" },
    { value: "1 valg", label: "før du genererer" },
    { value: "Samme tal", label: "uanset udtryk" },
    { value: "2-4 timer", label: "sparet pr. rapport i layout", note: "[antagelse: interne tidsestimater]" },
  ],
  faq: {
    title: "Ofte stillede spørgsmål",
    items: [
      {
        q: "Hvilke udtryk kan jeg vælge imellem?",
        a: "PDF-rapporten findes i flere visuelle udtryk med hver sin typografi, farvebrug og layout. Vi viser dem gerne i en demo, så du kan se, hvilket der passer til jer. Indholdet er det samme i dem alle.",
      },
      {
        q: "Ændrer udtrykket på tallene i rapporten?",
        a: "Nej. Udtrykket er rent visuelt: typografi, farver og layout. Tallene kommer fra det samme klimaregnskab, uanset hvilket udtryk du vælger.",
      },
      {
        q: "Kan jeg skifte udtryk efter jeg har genereret en rapport?",
        a: "Du kan generere rapporten igen i et andet udtryk. Det bliver en ny version med eget versionsnummer, og den første version gemmes uændret, så du altid kan se, hvilken du sendte.",
      },
      {
        q: "Kan jeg give hver modtager sit eget udtryk?",
        a: "Du kan generere rapporten i det udtryk, der passer bedst til en given læser. Indholdet er det samme: der findes ikke særskilte udgaver til bestyrelse, investor eller bank.",
      },
      {
        q: "Kan rapporten bære vores eget brand i stedet for qlim8's?",
        a: "Nej. Du vælger blandt rapportens udtryk, men rapporten kan ikke udgives under jeres eget brand i stedet for qlim8's.",
      },
    ],
  },
  closingCta: {
    title: "Giv rapporten et udtryk, der passer til læseren",
    description:
      "Book en demo, så viser vi PDF-rapporten i de udtryk, du kan vælge imellem.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
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
      "VSME er EFRAG's frivillige rapporteringsstandard for SMV'er. qlim8 genererer både VSME Basic og VSME Comprehensive fra dit klimaregnskab som EFRAG's officielle Excel-arbejdsbog. Hver linje kan føres til bilaget via revisions-CSV'en i samme ZIP, og din revisor kan attestere rapporten i platformen.",
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Hvad er VSME: og hvorfor beder de om det?",
    body: "VSME (Voluntary SME Standard) er EFRAG's frivillige standard for små og mellemstore virksomheder. Den er tænkt som et trin på vejen mod CSRD: er du ikke CSRD-pligtig, kan du rapportere via VSME, og store kunder og banker accepterer den som dokumentation. Standarden findes i to moduler. VSME Basic dækker 40+ datapunkter, primært klima og governance. VSME Comprehensive dækker 100+ datapunkter og tilføjer bl.a. bredere social og governance. For en typisk dansk SMV der har fået en 'send os jeres CO₂-tal'-anmodning er Basic ofte tilstrækkeligt. qlim8 genererer begge moduler direkte fra dit klimaregnskab, så du ikke udfylder EFRAG-arket i hånden.",
    bullets: [
      "VSME Basic: 40+ datapunkter (EFRAG-spec), primært klima og governance.",
      "VSME Comprehensive: 100+ datapunkter, bredere social og governance.",
      "Begge genereres som EFRAG's Excel-arbejdsbog; hver linje kan føres til bilaget via revisions-CSV'en.",
    ],
  },
  painPoints: [
    {
      pain: "En kunde eller bank beder om en VSME-rapport, og du ved ikke hvor du skal starte.",
      solution:
        "qlim8 mapper EFRAG's VSME-felter mod dit klimaregnskab og udfylder EFRAG's officielle Excel-arbejdsbog.",
      outcome: "Førstegangs-VSME bliver dage-arbejde frem for et konsulent-engagement til 75.000-200.000 kr. [antagelse, markeds-research].",
    },
    {
      pain: "EFRAG-Excel-arket er tomt, og du skal udfylde 40+ datapunkter manuelt med dokumentation bag hvert tal.",
      solution:
        "Tallene lander i arkets officielle celler direkte fra dit regnskab, og revisions-CSV'en i samme ZIP angiver bilaget bag hver linje.",
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
        "Hver linje kan føres til bilaget via revisions-CSV'en, og din revisor kan attestere rapporten i platformen ved at uploade sin underskrevne erklæring.",
      outcome: "Revisoren har dokumentationen fra start, og attesteringen bindes til præcis den version af rapporten.",
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
      title: "Hver linje sporbar til bilaget",
      body: "Arbejdsbogen leveres i en ZIP med en revisions-CSV, der for hver linje angiver bilagsnummer, ekstern reference og filens hash, plus et revisionsspor. Når revisoren spørger hvor et tal kommer fra, kan det føres tilbage til bilaget, og i platformen kan du følge det til linjen og fakturaen.",
    },
    {
      title: "Skalerer til CSRD",
      body: "Rammer CSRD dit segment senere, bruger vi samme data med en anden template-mapping (ESRS E1). Du indsamler ikke data forfra: VSME er trinnet, ikke en blindgyde.",
    },
    {
      title: "Spørg din AI om VSME-tallene",
      body: "Dine VSME-tal er også tilgængelige for Claude og ChatGPT gennem qlim8's indbyggede MCP-server, standarden AI-assistenter bruger til at hente data fra et system. Du kan spørge til Scope 3 pr. kategori eller bede assistenten starte rapporten, uden at åbne dashboardet. Se /integrationer/vsme-rapport-med-ai-agent.",
    },
  ],
  valueStats: [
    { value: "Basic + Comprehensive", label: "begge moduler i platformen" },
    { value: "4-8 timer", label: "til VSME Basic", note: "[antagelse: pilot-tal, 2 brugere]" },
    { value: "Grøn valideringsfane", label: "i EFRAG-arket for krævede rækker" },
    { value: "Excel + revisions-CSV", label: "EFRAG-arbejdsbog med bilagsreference pr. linje" },
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
        a: "Ja. Starter dækker VSME Basic og revisor-adgang; Premium tilføjer VSME Comprehensive. Du kan skifte modul når kravet ændrer sig. Samme klimaregnskab ligger bag begge.",
      },
      {
        q: "Er en VSME-rapport fra qlim8 revisor-klar?",
        a: "Hver linje kan føres til bilaget via revisions-CSV'en i ZIP'en, og din revisor kan attestere rapporten i platformen ved at uploade sin underskrevne erklæring. Platformen forsegler en kvittering, der binder erklæringen til præcis den version af rapporten og dens datagrundlag. Bemærk: qlim8 opgør efter standarden. Vi er ikke et akkrediteringsorgan, og revisionen udføres af din revisor.",
      },
      {
        q: "Kan jeg spørge Claude eller ChatGPT om mine VSME-tal?",
        a: "Ja. qlim8 har en indbygget MCP-server (Model Context Protocol), altså den standard AI-assistenter bruger til at hente data fra et system. Du forbinder Claude eller ChatGPT via OAuth uden en API-nøgle, og kan derefter spørge til Scope 1-3, få Scope 3 delt op på GHG-protokollens 15 kategorier eller bede assistenten sætte VSME-rapporten i gang. MCP-adgang kræver Premium. Læs mere på /integrationer/vsme-rapport-med-ai-agent.",
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
      "Book en demo, hvor vi viser, hvad VSME Basic og Comprehensive dækker, og hvordan rapporten genereres fra dit regnskab.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
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
    primaryCta: DEMO_CTA,
    secondaryCta: heroSecondaryCta,
  },
  intro: {
    heading: "Hvad VSME Basic dækker: og hvem det passer til",
    body: "VSME Basic er EFRAG's korte modul: 40+ datapunkter der primært dækker klima (Scope 1 og 2, ofte indkøb i Scope 3) og governance. Det passer til den typiske danske SMV der har fået en 'send os jeres CO₂-tal'-anmodning fra en stor kunde, en bank eller frivilligt før CSRD. Manuel udfyldning af EFRAG's Basic-ark tager typisk 40-80 timer, fordi hver post skal kilde-dokumenteres i hånden. qlim8 mapper Basic-felterne (B1-B11) mod dit klimaregnskab og udfylder EFRAG's officielle Excel-arbejdsbog med dine tal i de officielle celler. Pilotbrugere når rapporten på 4-8 timer: primært brugt på at kvalitetsreviewe, ikke på at taste ind [antagelse: pilot-tal, 2 brugere].",
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
        "VSME Basic er inkluderet fra Starter; du betaler et abonnement, ikke et engangs-projekt.",
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
      title: "Sporbar pr. linje",
      body: "Arbejdsbogen leveres i en ZIP med en revisions-CSV, der angiver bilaget bag hver linje, og i platformen kan tallet følges til fakturaen. Spørger banken eller revisoren til en post, finder du dokumentationen der i stedet for at bruge en eftermiddag på gravearbejde.",
    },
    {
      title: "EFRAG's Excel-arbejdsbog",
      body: "Rapporten leveres som EFRAG's officielle Excel-arbejdsbog i en ZIP sammen med revisions-CSV, revisionsspor og et kontrolscript. Det er standardens eget format, så du ikke skal reformatere før aflevering.",
    },
    {
      title: "Start rapporten fra din AI-assistent",
      body: "Har du Premium, kan Claude eller ChatGPT sætte VSME Basic i gang for dig gennem qlim8's MCP-server, standarden AI-assistenter bruger til at hente data fra et system. Du beder om rapportåret, og assistenten følger jobbet til filen er klar. Se /integrationer/vsme-rapport-med-ai-agent.",
    },
  ],
  valueStats: [
    { value: "4-8 timer", label: "til en Basic-rapport", note: "[antagelse: pilot-tal, 2 brugere]" },
    { value: "40+", label: "datapunkter (EFRAG B1-B11)" },
    { value: "EFRAG Excel", label: "officiel arbejdsbog i en ZIP med revisions-CSV" },
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
        a: "Ja. VSME Basic er inkluderet fra Starter. Du betaler et abonnement frem for et førstegangs-konsulenthonorar på typisk 75.000-200.000 kr. [antagelse, markeds-research]. Se pakkerne.",
      },
      {
        q: "Kan jeg opgradere til Comprehensive senere?",
        a: "Ja. Comprehensive ligger på Premium og bruger samme klimaregnskab. Kommer der et krav om det udvidede modul fra en bank eller stor kunde, skifter du modul uden at indsamle data forfra.",
      },
    ],
  },
  closingCta: {
    title: "Lav din VSME Basic-rapport på en eftermiddag",
    description:
      "Book en demo, hvor vi viser, hvordan tallene lander i EFRAG's Basic-celler, og hvordan hver linje kan føres til bilaget.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
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
    primaryCta: DEMO_CTA,
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
    {
      title: "Hele Scope 3 kan spørges i naturligt sprog",
      body: "Comprehensive og MCP-adgang følges ad på Premium, så din AI-assistent kan hente Scope 3 delt op på GHG-protokollens 15 kategorier, præcis den opdeling EFRAG-arket udfyldes med. Claude og ChatGPT forbinder via OAuth uden en API-nøgle. Se /integrationer/vsme-rapport-med-ai-agent.",
    },
  ],
  valueStats: [
    { value: "100+", label: "datapunkter (EFRAG C1-C9)" },
    { value: "1-2 dage", label: "vs. 2-4 ugers konsulent", note: "[antagelse: pilot-tal]" },
    { value: "Fuld Scope 3", label: "med værdikæde-rollup" },
    { value: "Grøn valideringsfane", label: "i EFRAG-arket for krævede rækker" },
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
        a: "Comprehensive er en del af Premium og bruger samme klimaregnskab som Basic. Rammer CSRD dig senere, genbruges datagrundlaget via en ESRS E1-mapping, ingen ny indsamling. Premium køber I direkte i appen, og prisen står på /priser.",
      },
    ],
  },
  closingCta: {
    title: "Lever det udvidede VSME-modul uden konsulent-engagement",
    description:
      "Book en demo, hvor vi viser, hvordan VSME Comprehensive lander i EFRAG's C1-C9-celler med fuld Scope 3.",
    primary: DEMO_CTA,
    secondary: PHONE_CTA,
  },
};
