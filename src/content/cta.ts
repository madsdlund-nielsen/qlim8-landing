// The ways a visitor becomes a customer, and the only ones. qlim8 is sold
// after a demo: there is no self-service signup or checkout on this site, and
// no package prices anywhere in its copy. A visitor can book a demo, write via
// the contact form, call, or sign up for the newsletter.
//
// Every CTA on the site points at one of these, so moving the demo booking
// (to a calendar tool, say) is a one-line change. `scripts/check-sales-led.mjs`
// fails `npm run lint` when a signup link or a package price reappears in the
// bundled copy; `scripts/check-cms-copy.mjs` does the same for CMS-published
// copy.

/** The contact form with "Book en demo" preselected (see page-components/kontakt). */
export const DEMO_HREF = "/kontakt?emne=demo";
export const DEMO_LABEL = "Book demo";

export const CONTACT_HREF = "/kontakt";

export const PHONE_DISPLAY = "+45 93 90 13 84";
export const PHONE_HREF = "tel:+4593901384";

/** Existing customers still log in; nobody signs up. */
export const LOGIN_URL = "https://app.qlim8.com/auth";

export const DEMO_CTA = { label: DEMO_LABEL, href: DEMO_HREF } as const;
export const PHONE_CTA = { label: `Ring ${PHONE_DISPLAY}`, href: PHONE_HREF } as const;
