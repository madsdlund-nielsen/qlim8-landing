// Copy and option lists for the lead-capture slide-in (src/components/public/SlideIn.tsx).
// The logic around them is in src/lib/slideIn.ts. The Danish text is approved as
// written: change it with the owner, not in passing.

export const TOPICS = [
  "ESG rapporter",
  "Klimahandling & -tilpasning",
  "Events & workshops",
  "Kurser & webinarer",
  "Guides & whitebooks",
] as const;

export const SIZES = ["1-9", "10-49", "50-249", "250+"] as const;

export const DRIVERS = [
  "Banken eller en investor har spurgt",
  "En kunde stiller krav",
  "Vi vil være klar, før kravene kommer",
  "Vi skal rapportere (VSME eller CSRD)",
  "Noget andet",
] as const;

/** The book the guide builds on. Empty would make the welcome text say "efter vores metode". */
export const BOOK_TITLE = "ESG er nemt";

/** The site's own privacy policy. */
export const PRIVACY_URL = "/privatlivspolitik";

export const TOTAL_STEPS = 4;

export const COPY = {
  brand: "qlim8",
  brandSub: "Gratis whitepaper",
  close: "Minimér",
  pillStart: "Få dit gratis whitepaper",
  pillStartSub: "Din første VSME-rapport",
  pillResume: "Fortsæt, hvor du slap",
  pillResumeSub: "Dit gratis whitepaper",
  stepOf: (n: number) => `Trin ${n} af ${TOTAL_STEPS}`,

  welcomeTitle: "ESG behøver ikke være svært",
  welcomeLead: (bookTitle: string) =>
    `Få vores gratis whitepaper på tre sider om at lave jeres første VSME-rapport i syv trin, ${
      bookTitle ? `efter metoden fra bogen »${bookTitle}«` : "efter vores metode"
    }.`,
  freebieTitle: "Whitepaper: Din første VSME-rapport",
  freebieSmall: "Gratis PDF, 3 sider",
  welcomeCta: "Send mig whitepapperet",
  notNow: "Ikke nu",

  contactTitle: "Hvor skal vi sende den?",
  contactLead: "Skriv din email, så er whitepapperet hos dig om et øjeblik.",
  nameLabel: "Dit navn",
  emailLabel: "Din email",
  next: "Fortsæt",
  back: "Tilbage",

  aboutTitle: "Fortæl os kort om jer",
  aboutLead: "To spørgsmål, så sender vi det, der passer til jer.",
  sizeLegend: "Hvor mange ansatte er I?",
  driverLegend: "Hvorfor kigger I på klima nu?",

  phoneTitle: "Vil du have hjælp af en rådgiver?",
  phoneLead:
    "Skriv dit nummer, så kan en rådgiver fra qlim8 ringe, hvis du har spørgsmål til whitepapperet. Du kan også springe over.",
  phoneLabel: "Telefonnummer",
  skip: "Spring over",

  topicsTitle: "Hvad vil du høre mere om?",
  topicsLead: "Vælg de emner, du vil høre mere om.",
  topicsLeadBank: "Vælg de emner, du vil høre mere om. Vi starter med det, der hjælper dig med bankens spørgsmål.",
  topicsLegend: "Emner",
  submit: "Send mig whitepapperet",
  finePrefix:
    "Når du sender, accepterer du, at vi sender whitepapperet og nyheder om de emner, du har valgt. Du kan altid afmelde dig. Læs vores ",
  finePrivacy: "privatlivspolitik",
  fineSuffix: ".",

  thanks: (first: string) => (first ? `Tak, ${first}` : "Tak"),
  thanksLeadBefore: "Whitepapperet er på vej til ",
  thanksLeadAfter: ". Dukker det ikke op om få minutter, så kig i spamfilteret.",
  alsoSending: (topics: string) => `Vi sender dig også noget om: ${topics}.`,
  followupTitle: "Næste skridt: VSME-skabelonen",
  followupText:
    "Til guiden hører vores VSME-skabelon i Excel. Den følger de samme syv trin. Vil du have den tilsendt også?",
  followupYes: "Ja, send mig skabelonen",
  followupNo: "Nej tak, luk",
  vsmeSentStrong: "VSME-skabelonen er på vej.",
  vsmeSentRest: " Du får den på samme email.",
  closeDone: "Luk",
} as const;

export const ERRORS = {
  name: "Skriv dit navn",
  email: "Skriv en gyldig email, fx navn@firma.dk",
  choose: "Vælg det, der passer bedst",
  phone: "Telefonnummeret skal have 8 cifre, fx 12 34 56 78",
  interests: "Vælg mindst ét emne",
  generic: "Noget gik galt. Prøv igen om lidt.",
} as const;
