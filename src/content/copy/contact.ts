// Bundled default copy for /kontakt. CMS pageKey: "page.contact".
// Form field labels/placeholders are UI chrome and stay in the JSX
// (src/components/public/ContactForm.tsx).
//
// This page is where a visitor becomes a customer: qlim8 is sold after a demo,
// and every "Book demo" on the site lands here with the demo preselected
// (src/content/cta.ts). The phone number is the other way in.

export const CONTACT_PAGE_KEY = "page.contact";

export interface ContactNextItem {
  title: string;
  body: string;
}

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
  /**
   * Optional whole block under the form: what happens once the visitor has
   * written (StepCard x 3). Absent = the page ends after the form and the
   * contact details.
   */
  next?: {
    title: string;
    items: ContactNextItem[];
  };
}

export const CONTACT_COPY: ContactCopy = {
  hero: {
    title: "Ring, skriv eller tag en uformel snak",
    subtitle: "Du vælger selv, hvordan vi taler sammen. Ring direkte på +45 93 90 13 84, skriv en besked her på siden, eller vælg Book en demo i formularen, hvis du vil have en uformel snak på 15 minutter om din virksomhed. Der sidder ingen telefonsælgere hos os.",
  },
  form: {
    title: "Skriv en besked eller book en snak",
    submitLabel: "Send besked",
  },
  info: {
    title: "Her fanger du os",
    email: "kontakt@qlim8.com",
    phone: "+45 93 90 13 84",
    address: "Otterup, Danmark",
    hoursWeekdays: "Mandag–fredag: 9:00–17:00",
    hoursWeekend: "Weekend: lukket",
  },
  next: {
    title: "Det sker, når du har skrevet",
    items: [
      {
        title: "Din besked lander hos Mads",
        body: "Den går direkte til os, og det er Mads, der læser den. Der er ingen salgsafdeling imellem, og vi kontakter dig kun om det, du selv har skrevet om.",
      },
      {
        title: "Du hører fra os på en hverdag",
        body: "Har du stillet et spørgsmål, vender vi tilbage hurtigst muligt. Vi svarer i åbningstiden, mandag til fredag mellem 9 og 17. Skriver du i weekenden, hører du fra os på en hverdag.",
      },
      {
        title: "En uformel snak på 15 minutter",
        body: "Har du valgt Book en demo, kontakter vi dig for at aftale et tidspunkt. Vi viser qlim8 med udgangspunkt i din virksomhed og svarer på det, du er i tvivl om. Du forpligter dig ikke til noget.",
      },
    ],
  },
};
