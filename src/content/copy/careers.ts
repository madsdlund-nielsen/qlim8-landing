// Bundled default copy for /karriere. CMS pageKey: "page.careers".
// Open positions default to none; the CMS can publish a list.

export const CAREERS_PAGE_KEY = "page.careers";

export interface OpenPosition {
  title: string;
  department: string;
  location: string;
  type: string;
}

export interface CareersCopy {
  hero: {
    title: string;
    subtitle: string;
  };
  noOpenings: string;
  openPositionsTitle: string;
  openPositions: OpenPosition[];
  unsolicited: {
    title: string;
    body: string;
    buttonLabel: string;
    email: string;
  };
}

export const CAREERS_COPY: CareersCopy = {
  hero: {
    title: "Karriere hos qlim8",
    subtitle:
      "Vi søger passionerede mennesker, der vil hjælpe danske virksomheder med at blive mere bæredygtige. Er du klar til at gøre en forskel?",
  },
  noOpenings: "Der er i øjeblikket ingen ledige stillinger.",
  openPositionsTitle: "Åbne stillinger",
  openPositions: [],
  unsolicited: {
    title: "Kan du ikke finde den rette stilling?",
    body: "Vi er altid interesserede i at høre fra dygtige mennesker. Send en uopfordret ansøgning til os.",
    buttonLabel: "Send ansøgning",
    email: "job@qlim8.com",
  },
};
