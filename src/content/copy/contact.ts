// Bundled default copy for /kontakt. CMS pageKey: "page.contact".
// Form field labels/placeholders are UI chrome and stay in the JSX.

export const CONTACT_PAGE_KEY = "page.contact";

export interface ContactCopy {
  hero: {
    title: string;
    subtitle: string;
  };
  form: {
    title: string;
    submitLabel: string;
  };
  info: {
    title: string;
    email: string;
    phone: string;
    address: string;
    hoursWeekdays: string;
    hoursWeekend: string;
  };
}

export const CONTACT_COPY: ContactCopy = {
  hero: {
    title: "Lad os tale sammen",
    subtitle:
      "Har du spørgsmål om qlim8, klimaregnskab eller hvordan vi kan hjælpe din virksomhed? Vi er her for at hjælpe.",
  },
  form: {
    title: "Send os en besked",
    submitLabel: "Send besked",
  },
  info: {
    title: "Kontaktinformation",
    email: "kontakt@qlim8.com",
    phone: "+45 93 90 13 84",
    address: "Odense, Danmark",
    hoursWeekdays: "Mandag–fredag: 9:00–17:00",
    hoursWeekend: "Weekend: lukket",
  },
};
