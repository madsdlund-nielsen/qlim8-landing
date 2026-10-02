// The visitor's cookie choice on qlim8.com, kept in local storage.
//
// Necessary storage (this choice itself) needs no consent. Statistics (Google
// Analytics) and marketing (Google Ads) are chosen separately, and a choice
// lasts 12 months, as the cookie declaration (src/content/copy/legal.ts)
// says; after that, or for a value written by the banner before it had
// categories ("accepted" or "rejected", of unknown age), the banner asks again.
//
// The footer's "Cookieindstillinger" reopens the banner by dispatching
// OPEN_COOKIE_SETTINGS on window (src/components/CookieSettingsButton.tsx).

export const CONSENT_KEY = "qlim8_cookie_consent";
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const OPEN_COOKIE_SETTINGS = "qlim8:open-cookie-settings";

export interface ConsentChoice {
  statistics: boolean;
  marketing: boolean;
  /** When the choice was made, ISO 8601. */
  at: string;
}

/** A stored choice that still holds, or null when the banner should ask. */
export function parseConsent(raw: string | null, now: number = Date.now()): ConsentChoice | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!value || typeof value !== "object") return null;
  const { statistics, marketing, at } = value as Record<string, unknown>;
  if (typeof statistics !== "boolean" || typeof marketing !== "boolean" || typeof at !== "string") return null;
  const madeAt = Date.parse(at);
  if (!Number.isFinite(madeAt) || madeAt > now || now - madeAt > CONSENT_MAX_AGE_MS) return null;
  return { statistics, marketing, at };
}

export function serializeConsent(choice: Omit<ConsentChoice, "at">, now: number = Date.now()): string {
  return JSON.stringify({ statistics: choice.statistics, marketing: choice.marketing, at: new Date(now).toISOString() });
}

/** The choice in this browser, or null (none, expired, or storage unavailable). */
export function currentConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

/** Google Consent Mode v2 signals for a choice. */
export function consentModeFor(choice: Pick<ConsentChoice, "statistics" | "marketing">) {
  const ads = choice.marketing ? "granted" : "denied";
  return {
    analytics_storage: choice.statistics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  } as const;
}
