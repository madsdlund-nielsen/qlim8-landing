// The ways a visitor becomes a customer. A company can start on Free and buy
// Starter or Premium by itself, and that path is the app's: the packages API
// (src/lib/packages.ts) says which packages a visitor can start or buy, at
// what price and at which signup URL, so no signup URL and no price is
// written in this site. What lives here is the rest: the demo booking, the
// contact form, the phone number, the login, and "Kom gratis i gang", which
// leads to the package page. While the app's catalog sells nothing by itself
// (or the API cannot be reached) every main button books a demo instead.
//
// Every CTA on the site points at one of these, so moving the demo booking
// (to a calendar tool, say) is a one-line change. `scripts/check-sales-led.mjs`
// fails `npm run lint` when a package price, a signup or checkout link or a
// trial appears in the bundled copy; `scripts/check-cms-copy.mjs` does the
// same for CMS-published copy.

/** The contact form with "Book en demo" preselected (see page-components/kontakt). */
export const DEMO_HREF = "/kontakt?emne=demo";
export const DEMO_LABEL = "Book demo";

export const CONTACT_HREF = "/kontakt";

export const PHONE_DISPLAY = "+45 93 90 13 84";
export const PHONE_HREF = "tel:+4593901384";

/** Existing customers log in here; new ones sign up at the URL the packages API names. */
export const LOGIN_URL = "https://app.qlim8.com/auth";

export const DEMO_CTA = { label: DEMO_LABEL, href: DEMO_HREF } as const;
export const PHONE_CTA = { label: `Ring ${PHONE_DISPLAY}`, href: PHONE_HREF } as const;

/** Header and homepage, once the catalog sells something by itself: to the package page. */
export const FREE_START_CTA = { label: "Kom gratis i gang", href: "/priser" } as const;
