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
    title: "Vi er kedelige med vilje",
    subtitle:
      "qlim8 er bygget af én ingeniør, der var træt af at se SMV'er betale 80.000 kr for en ESG-rapport, banken kunne have læst på 5 minutter. Klimaregnskab burde være lige så uspændende som lønudbetaling: korrekt, til tiden, uden drama.",
  },
  founder: {
    title: "Grundlæggeren",
    role: "Civilingeniør, energisystemer",
    body: 'Jeg startede qlim8 fordi jeg havde set én konsulent for mange tage 60.000 kr for at klippe data fra Excel og kalde det "scope 3". Mit fag er energisystemer, og at automatisere det manuelle arbejde der alligevel skal laves. Det er den platform du logger ind på.',
    imageAlt: "qlim8 grundlægger",
  },
  beliefs: {
    title: "Det vi tror på",
    items: [
      {
        title: "Klimaregnskab er bogføring, ikke marketing.",
        body: "Ingen badges, ingen mærkninger, ingen falske grønne løfter. Bare tal, der står til revisorens efterprøvelse.",
      },
      {
        title: "Hvis det ikke er sporbart, så tæller det ikke.",
        body: "Hver beregning har et unikt ID, en kilde og en formel. Du skal kunne stå på mål for hver linje i dit klimaregnskab.",
      },
      {
        title: "SMV'er fortjener samme værktøjer som de store.",
        body: "CSRD-virksomheder har dedikerede teams. Du har 90 minutter en torsdag. Vi bygger til den virkelighed.",
      },
      {
        title: "Vi siger fra, når det er bullshit.",
        body: 'Hvis et tal er for godt til at være sandt, flagger vi det. Hvis en metode ikke holder, bruger vi den ikke. Ingen "optimering" af scope-3-data.',
      },
    ],
  },
  company: {
    title: "qlim8 ApS",
    cvrLabel: "CVR",
    cvr: "DK46033736",
    foundedLabel: "Stiftet",
    founded: "2024",
    hostingLabel: "Hosting",
    hosting: "Hetzner, Tyskland (EU)",
    contactLabel: "Kontakt",
    contactEmail: "kontakt@qlim8.com",
  },
  outro: {
    title: "Vil du høre mere?",
    body: "Skriv direkte. Ingen sales-team mellem dig og personen der har bygget platformen.",
    ctaPrimary: "Se priser",
    ctaSecondary: "kontakt@qlim8.com",
  },
};
