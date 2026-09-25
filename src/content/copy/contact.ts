// Bundled default copy for /kontakt. CMS pageKey: "page.contact".
// Form field labels/placeholders are UI chrome and stay in the JSX
// (src/components/public/ContactForm.tsx).
//
// This page is where a visitor becomes a customer: qlim8 is sold after a demo,
// and every "Book demo" on the site lands here with the demo preselected
// (src/content/cta.ts). The phone number is the other way in.

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
    title: "Book en demo, eller skriv til os",
    subtitle:
      "På en demo viser vi qlim8 med udgangspunkt i din virksomhed, og så finder vi sammen den pakke, der passer. Har du bare et spørgsmål, så skriv eller ring.",
  },
  form: {
    title: "Book demo eller send en besked",
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
