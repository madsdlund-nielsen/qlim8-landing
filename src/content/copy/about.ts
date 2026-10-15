// Bundled default copy for /om-os. CMS pageKey: "page.about".
// The founder image stays under its original pageKey "about.images".

export const ABOUT_PAGE_KEY = "page.about";

export interface AboutBelief {
  title: string;
  body: string;
}

export interface AboutCopy {
  hero: {
    title: string;
    subtitle: string;
  };
  founder: {
    title: string;
    role: string;
    body: string;
    imageAlt: string;
  };
  beliefs: {
    title: string;
    items: AboutBelief[];
  };
  company: {
    title: string;
    cvrLabel: string;
    cvr: string;
    foundedLabel: string;
    founded: string;
    hostingLabel: string;
    hosting: string;
    contactLabel: string;
    contactEmail: string;
  };
  outro: {
    title: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

export const ABOUT_COPY: AboutCopy = {
  hero: {
    title: "Bag qlim8 sidder et menneske, du kan ringe til",
    subtitle: "qlim8 er klimaregnskab og ESG-rapportering til danske SMV'er, bygget oven på den bogføring, du allerede har. Jeg stiftede qlim8 i slutningen af 2025, fordi jeg selv havde siddet med ESG-ansvaret og set, hvor tungt det kan være. Her kan du læse, hvem jeg er, hvordan vi arbejder, og hvor dine data ligger.",
  },
  founder: {
    title: "Mads Dahlén Lund-Nielsen",
    role: "Stifter og civilingeniør",
    body: "Jeg har en fortid som elektriker og er i dag civilingeniør. Hos Nordic Green Solutions var jeg beregner og konsulent på konkrete tiltag i virksomheder af alle størrelser. Hos SH Group var jeg afdelingsleder, og senest var jeg klimakoordinator og ESG-ansvarlig i Nordfyns Kommune. Jeg har altså mødt den grønne omstilling, CSRD-krav og lovbestemte reduktionskrav i driften, ikke kun i et regneark. Jeg kender den knappe tid, budgetterne uden luft og de mange krav, der lander hos en lille virksomhed. Den erfaring har jeg bygget ind i qlim8, og når du ringer, er det mig, du taler med.",
    imageAlt: "Mads Dahlén Lund-Nielsen, stifter af qlim8",
  },
  beliefs: {
    title: "Det, vi står for",
    items: [
      {
        title: "Hvorfor qlim8 findes",
        body: "Det startede med en frustration over den ESG-platform, jeg skulle bruge på mit arbejde. Den var langsom og upålidelig, og de store systemer, jeg mødte, var både tunge og dyre. En aften i oktober besluttede jeg, at det måtte kunne gøres bedre, og at jeg ikke kunne være den eneste, der havde det sådan. Målet er, at alle danske virksomheder kan lave et klimaregnskab på egne præmisser, også den mindste. Derfor kan du starte gratis.",
      },
      {
        title: "Bygget oven på din bogføring",
        body: "Du skal ikke starte forfra i et nyt regneark. qlim8 forbindes direkte med e-conomic, Dinero eller Billy og henter dit elforbrug fra Eloverblik. Fakturalinjerne kategoriseres automatisk, når systemet er sikkert nok, og de usikre lægges til gennemsyn, før de tæller med. Så går tiden med at handle på tallene og ikke med at samle dem.",
      },
      {
        title: "Hver linje kan forklares",
        body: "Et tal, du ikke kan forklare, hjælper dig ikke hos banken eller revisoren. Hver udledningslinje har sit eget ID og kan spores tilbage til det bilag eller den måleraflæsning, den bygger på. Revisionssporet kan ikke redigeres eller slettes i programmet, og rapporten bygger på VSME, CSRD (ESRS E1) og GHG-protokollen.",
      },
      {
        title: "Ingen telefonsælgere, et direkte nummer",
        body: "Vi ringer ikke rundt og sælger. Du ringer, når det passer dig, og så er det mig, du taler med, på +45 93 90 13 84. Vi taler i øjenhøjde og uden indviklet fagsprog, og er du bedst tjent med den gratis pakke, så siger jeg det. Du kan også altid skrive til kontakt@qlim8.com.",
      },
      {
        title: "Dine data står på servere i Tyskland",
        body: "Servere, database og fillager står i EU, hos Hetzner i Nürnberg, og vores AI-leverandør, Ordbogen.ai, er dansk. Data behandles efter GDPR med en databehandleraftale. Al trafik går over HTTPS, følsomme felter som nøglerne til dine integrationer krypteres i databasen, og hver kundes data er adskilt fra de andres.",
      },
    ],
  },
  company: {
    title: "qlim8",
    cvrLabel: "CVR",
    cvr: "DK46033736",
    foundedLabel: "Stiftet",
    founded: "2025",
    hostingLabel: "Hosting",
    hosting: "Hetzner i Nürnberg, Tyskland (EU)",
    contactLabel: "Kontakt",
    contactEmail: "kontakt@qlim8.com",
  },
  outro: {
    title: "Skal vi tage en snak?",
    body: "Ring direkte på +45 93 90 13 84, eller skriv til kontakt@qlim8.com. Der er ingen salgsafdeling mellem dig og den person, der har bygget platformen. Vil du hellere kigge selv først, kan du starte gratis og uden binding.",
    ctaPrimary: "Kom gratis i gang",
    ctaSecondary: "Skriv til Mads",
  },
};
