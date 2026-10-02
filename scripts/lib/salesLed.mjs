/**
 * What may not be said on qlim8.com, now that a company can start on Free and
 * buy Starter or Premium by itself: no package price in copy (prices come
 * only from the app's packages API), no hard-coded signup or checkout link
 * (the API names the signup URL), and no trial in copy. Starter and Premium
 * start with a trial since 2026-10-03, but its length is catalog data
 * (`trialDays` in the packages API), so the one sentence that names it is
 * built from the API in src/lib/packageView.ts and nowhere else. Shared by scripts/check-sales-led.mjs (the bundled copy, in
 * `npm run lint`) and scripts/check-cms-copy.mjs (the CMS-published copy that
 * overrides it, in `npm run test:contract`), so both hold the same line. The
 * rules are tested against known strings in salesLed.test.mjs (`npm test`).
 *
 * Deliberately narrow. The site still talks about money that is not a qlim8
 * package: consultant fees, an enterprise platform's monthly price, the kroner
 * on an example invoice. So there is no rule against "kr" or "pr. måned" as
 * such; the price rules name the figures qlim8's packages have actually been
 * sold at, and the phrasing an entry price is written in.
 *
 * Until the self-serve release these rules also forbade "Opret en gratis
 * konto", "Start gratis", "kreditkort" and "Vælg plan": qlim8 was sold only
 * after a demo. Those are true now and were removed with it.
 */

/**
 * Every figure a qlim8 package or add-on has been advertised at, in kr, and
 * the ones the self-serve catalog sells at (per month and per year, ex. VAT).
 * A package price on this site comes only from the app's packages API
 * (src/lib/packageView.ts), never from copy, so a price changed in the app's
 * Admin → Packages cannot leave a stale one behind here.
 */
const PLAN_FIGURES = [
  "250", "300", "395", "625", "750", "1195", "1595", "3000", "3600", "7500", "9000", "14340",
  "695", "1995", "3495", "6500", "8340", "23940", "41940", "78000",
];

const figure = `(?:${PLAN_FIGURES.map((f) => (f.length > 3 ? `${f.slice(0, -3)}[.\\s]?${f.slice(-3)}` : f)).join("|")})`;

/** The file that builds the trial sentence from the packages API. */
const TRIAL_FROM_DATA = ["src/lib/packageView.ts"];

/**
 * `allowedIn` exempts a file of the bundled copy from one rule: the CTA
 * module is where a signup URL would live if the site ever spelled one out.
 * The CMS check passes no file, so no CMS field is exempt.
 */
export const SALES_LED_RULES = [
  { kind: "signup link", re: /app\.qlim8\.com\/auth\?tab=register/i },
  { kind: "signup link", re: /app\.qlim8\.com\/signup/i, allowedIn: ["src/content/cta.ts"] },
  { kind: "checkout", re: /\/api\/stripe\/checkout|\/api\/billing\/checkout/i },
  { kind: "package price", re: new RegExp(`(?<![\\d.])${figure}\\s*(?:kr\\b|kr\\.|kroner|,-)`, "i") },
  { kind: "package price", re: /\b(?:fra|starter ved|starter fra|allerede fra|priserne starter)\s+\d{1,3}(?:[.\s]\d{3})*\s*(?:kr|kroner)\b/i },
  { kind: "package price", re: /premium-pris/i },
  { kind: "package price", re: /\d+\s*%\s*rabat\b/i },
  { kind: "trial claim", re: /\bprøveperiode\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "trial claim", re: /\bprøv\s+(?:platformen\s+|qlim8\s+)?gratis\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "trial claim", re: /\bgratis\s+demo-konto\b/i },
];

/**
 * Every rule a piece of text breaks, with the matching words. `file` is the
 * repo-relative path of bundled copy, for the rules that exempt a file.
 */
export function salesLedViolations(text, { file } = {}) {
  const out = [];
  for (const { kind, re, allowedIn } of SALES_LED_RULES) {
    if (file && allowedIn?.includes(file)) continue;
    const m = text.match(re);
    if (m) out.push({ kind, match: m[0] });
  }
  return out;
}
