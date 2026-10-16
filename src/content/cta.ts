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
// (to a calendar tool, say) is a one-line change. A demo CTA is a plain link to
// DEMO_HREF; DemoDialog (src/components/public/DemoDialog.tsx) intercepts a
// click on it, bundled and CMS-published copy alike, and opens the demo dialog:
// name and e-mail, then the number of employees. Up to nine goes to the film on
// /demo (DEMO_VIDEO_HREF), ten or more to the calendar page the app names. `scripts/check-sales-led.mjs`
// fails `npm run lint` when a package price, a signup or checkout link or a
// trial appears in the bundled copy; `scripts/check-cms-copy.mjs` does the
// same for CMS-published copy.

/**
 * The contact form with "Book en demo" preselected (see page-components/kontakt).
 * With JavaScript, DemoDialog catches a click on a link to this address and opens
 * the demo dialog instead (see isDemoHref in src/lib/demoDialog.ts). Without it,
 * the link still works and leads to the form, so keep the address as it is.
 */
export const DEMO_HREF = "/kontakt?emne=demo";
export const DEMO_LABEL = "Book demo";

export const CONTACT_HREF = "/kontakt";

/** The film of the platform, where a company with fewer than ten employees is sent (app/demo). */
export const DEMO_VIDEO_HREF = "/demo";

/**
 * The employee bands of the demo dialog: the same four as the app's slide-in
 * ("Hvor mange ansatte er I?"), with the same values. A small company (the
 * first band) sees the film; the others book a time in the calendar.
 */
export const EMPLOYEE_BANDS = [
  { value: "1-9", label: "1-9 ansatte" },
  { value: "10-49", label: "10-49 ansatte" },
  { value: "50-249", label: "50-249 ansatte" },
  { value: "250+", label: "250 eller flere ansatte" },
] as const;
export type EmployeeBand = (typeof EMPLOYEE_BANDS)[number]["value"];
export const SMALL_COMPANY_BAND: EmployeeBand = "1-9";

export const PHONE_DISPLAY = "+45 93 90 13 84";
export const PHONE_HREF = "tel:+4593901384";

/** Existing customers log in here; new ones sign up at the URL the packages API names. */
export const LOGIN_URL = "https://app.qlim8.com/auth";

export const DEMO_CTA = { label: DEMO_LABEL, href: DEMO_HREF } as const;
export const PHONE_CTA = { label: `Ring ${PHONE_DISPLAY}`, href: PHONE_HREF } as const;

/** Header and homepage, once the catalog sells something by itself: to the package page. */
export const FREE_START_CTA = { label: "Kom gratis i gang", href: "/priser" } as const;

/**
 * The package page scrolled past the free packages to the self-serve group
 * ("Køb selv"), whose first card is Starter (the anchor is set in PackageGroups).
 */
export const MEMBERSHIP_HREF = "/priser#medlemskab";

/** The mail address shown in the ContactBox, the footer and the contact page. */
export const CONTACT_EMAIL = "kontakt@qlim8.com";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

/**
 * The trust line and the micro line under a main button while the catalog
 * sells nothing by itself (catalog v1, or the API cannot be reached). "Ingen
 * kreditkort" and "Ingen binding" are true of the free package only, so they
 * must not stand over a button that books a demo; the call is the offer, and
 * the phone and the mail are the ways in. TrustLine and MicroLine swap these
 * in for whatever a page has written.
 */
export const SALES_LED_TRUST: string[] = ["Uforpligtende samtale", "Du taler direkte med stifteren", "Personlig hjælp"];
export const SALES_LED_MICRO = `Ring direkte på ${PHONE_DISPLAY} · Eller skriv til ${CONTACT_EMAIL}`;

/** The default trust line and micro line, for a page that sells the free start and has no text of its own. */
export const STANDARD_TRUST: string[] = ["Ingen binding", "Oprettelse tager et par minutter", "Vi hjælper dig i gang"];
export const STANDARD_MICRO = `Ingen kreditkort påkrævet · Personlig hjælp på ${PHONE_DISPLAY}`;

/**
 * The heading over the row of logos (IntegrationRow) and the label on the
 * systems that are not shipped yet. The heading holds only because the three
 * coming-soon systems carry the label.
 */
export const INTEGRATION_BAND = {
  title: "Direkte forbindelser i dag og flere på vej",
  statusLabel: "Kommer snart",
} as const;
