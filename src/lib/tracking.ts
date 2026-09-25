// Campaign attribution for the newsletter.
//
// GA4 records `utm_*` on the pageview by itself, but the signup is a client-side
// POST that GA never sees, so we resolve a campaign token from the URL and send
// it with an explicit event instead. `ref` is our own short token (used by the
// LinkedIn profile button, for example); `utm_source` is the fallback for links
// that already carry standard campaign parameters.
//
// gtag only exists once the visitor has accepted analytics cookies (see
// CookieConsent), so every call here is a no-op until then, by design.

const MAX_TOKEN_LENGTH = 64;

/** Normalise a token to a safe, comparable shape: lowercase, `[a-z0-9._-]`. */
function normaliseToken(value: string | null): string | null {
  if (!value) return null;
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .slice(0, MAX_TOKEN_LENGTH)
    .replace(/^-+|-+$/g, "");
  return cleaned || null;
}

/**
 * The campaign token for the current page view. Reads `?ref=`, then
 * `?utm_source=`, falling back to the placement the form sits in.
 */
export function resolveSignupSource(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const params = new URLSearchParams(window.location.search);
  return (
    normaliseToken(params.get("ref")) ??
    normaliseToken(params.get("utm_source")) ??
    fallback
  );
}

/**
 * Google Ads account, separate from the GA4 property. The same gtag library
 * powers both: CookieConsent configures both IDs on the one tag load. Exported
 * so CookieConsent can reference the exact id in its `config` call.
 */
export const GOOGLE_ADS_ID = "AW-18008005975";

/**
 * The Google Ads conversion label for a newsletter signup (the "Abonner"
 * conversion in the account). There is no signup or checkout any more (qlim8
 * is sold after a demo), so the site's two conversions are this one and a sent
 * contact-form request (trackContactRequest below).
 */
const NEWSLETTER_CONVERSION_LABEL = "EBwqCKrRpeUcENe68YpD";

/**
 * Report a completed newsletter signup to both GA4 and Google Ads, tagged with
 * its source.
 *
 * The GA4 parameter is `signup_source`, not `source`: GA4 already has a built-in
 * traffic-source dimension by that name, and a custom definition would collide
 * with it in reports. The Google Ads event is the "conversion" the newsletter
 * campaign optimises toward, keyed by send_to.
 *
 * Both are no-ops until the visitor has accepted analytics cookies and gtag
 * exists, by design (see CookieConsent).
 */
export function trackNewsletterSignup(source: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "newsletter_signup", { signup_source: source });
  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${NEWSLETTER_CONVERSION_LABEL}`,
  });
}

/**
 * Report a sent contact-form request to GA4, as the standard `generate_lead`
 * event with the topic ("demo" or "question"). Now that qlim8 is sold after a
 * demo, a booked demo is the conversion that matters on this site; there is no
 * Google Ads conversion label for it yet, so only GA4 is told.
 *
 * A no-op until the visitor has accepted analytics cookies, like the above.
 */
export function trackContactRequest(topic: "demo" | "question", source: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "generate_lead", { lead_topic: topic, signup_source: source });
}
