// Campaign attribution for the newsletter.
//
// GA4 records `utm_*` on the pageview by itself, but the signup is a client-side
// POST that GA never sees — so we resolve a campaign token from the URL and send
// it with an explicit event instead. `ref` is our own short token (used by the
// LinkedIn profile button, for example); `utm_source` is the fallback for links
// that already carry standard campaign parameters.
//
// gtag only exists once the visitor has accepted analytics cookies (see
// CookieConsent), so every call here is a no-op until then — by design.

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
 * Report a completed newsletter signup to GA4, tagged with its source.
 *
 * The parameter is `signup_source`, not `source` — GA4 already has a built-in
 * traffic-source dimension by that name, and a custom definition would collide
 * with it in reports.
 */
export function trackNewsletterSignup(source: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "newsletter_signup", { signup_source: source });
}
