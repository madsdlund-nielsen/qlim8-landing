// The pure parts of the demo dialog (src/components/public/DemoDialog.tsx),
// kept apart so they can be tested without a browser: which link the dialog
// takes over, where an employee band leads, and which booking address is safe
// to show.
import { DEMO_HREF, EMPLOYEE_BANDS, SMALL_COMPANY_BAND, type EmployeeBand } from "../content/cta.ts";

/** Dispatched on window by openDemoDialog(); DemoDialog listens for it. */
export const OPEN_DEMO_DIALOG_EVENT = "qlim8:open-demo-dialog";

/** Open the demo dialog from code (a <button>, say). A no-op on the server. */
export function openDemoDialog(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_DEMO_DIALOG_EVENT));
}

/**
 * Is this href a demo CTA: the contact form with the demo topic, on this site?
 * `href` is read the way the browser would (relative to `base`), so a relative
 * link, an absolute link to this origin and a trailing slash all count, and a
 * link to another origin or another page does not. A plain "/kontakt" is a
 * contact link, not a demo CTA.
 */
export function isDemoHref(href: string | null | undefined, base: string): boolean {
  if (!href) return false;
  let url: URL;
  let origin: URL;
  try {
    origin = new URL(base);
    url = new URL(href, origin);
  } catch {
    return false;
  }
  if (url.origin !== origin.origin) return false;
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
  const target = new URL(DEMO_HREF, origin);
  return path === target.pathname && url.searchParams.get("emne") === target.searchParams.get("emne");
}

/** Where a band leads: the film for the smallest companies, the calendar for the rest. */
export function routeForBand(band: string): "video" | "booking" {
  return band === SMALL_COMPANY_BAND ? "video" : "booking";
}

export function isEmployeeBand(value: string): value is EmployeeBand {
  return EMPLOYEE_BANDS.some((b) => b.value === value);
}

/** The booking address from the app's answer, only when it is an https URL. */
export function safeBookingUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

/** A deliberately loose e-mail check: something@something.tld, no spaces. The app validates for real. */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
