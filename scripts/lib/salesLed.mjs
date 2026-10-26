/**
 * What may not be said on qlim8.com, now that a company can start on Gratis
 * (key free) and buy Basis (starter) or Udvidet (premium) by itself: no
 * package price in copy (prices come only from the app's packages API), no
 * hard-coded signup or checkout link
 * (the API names the signup URL), and no trial in copy. Basis and Udvidet
 * start with a trial since 2026-10-03, but its length is catalog data
 * (`trialDays` in the packages API), so the one sentence that names it is
 * built from the API in src/lib/packageView.ts and nowhere else. The same goes
 * for the intro boost and the upgrade offer (`introBoost`, `upgradeOffer`). Shared by scripts/check-sales-led.mjs (the bundled copy, in
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

import { readFileSync } from "node:fs";

/**
 * The price token (src/lib/priceTokens.ts). A price may stand in copy only as
 * `{pris:<packageKey>}` (monthly) or `{pris:<packageKey>:aar}` (yearly), inside
 * a `[[ ... ]]` sentence that the site drops when the catalog shows no price.
 * Hand-typed figures stay forbidden exactly as before (SALES_LED_RULES below
 * still match the raw text, inside `[[ ]]` too); what is new is that a token
 * is allowed, and that a token outside `[[ ]]`, a malformed token, an unknown
 * package key and an unbalanced marker are errors of their own.
 *
 * The keys are the packages of the app's catalog v3, from the committed API
 * answer in scripts/fixtures: a package added to the catalog is added there
 * (CLAUDE.md says to regenerate the fixtures), and then it is a valid key.
 */
export const PRICE_PACKAGE_KEYS = new Set(
  JSON.parse(readFileSync(new URL("../fixtures/public-packages.v3.json", import.meta.url), "utf8")).packages.map((p) => p.key),
);

const TOKEN_RE = /\{pris:([^}]*)\}/gi;
const SEGMENT_RE = /\[\[[\s\S]*?\]\]/g;

/**
 * Every fault in the price tokens of `text`: with the kind "price token", the
 * matching words and the offset. Needs the whole text of a file or a CMS field
 * (a `[[ ]]` sentence may span several source lines), unlike the per-line
 * figure rules.
 */
export function priceTokenViolations(text) {
  const out = [];
  const opens = (text.match(/\[\[/g) ?? []).length;
  const closes = (text.match(/\]\]/g) ?? []).length;
  if (opens !== closes) out.push({ kind: "price token", match: "[[ ]] unbalanced", index: 0 });
  const outside = text.replace(SEGMENT_RE, (m) => " ".repeat(m.length));
  for (const m of outside.matchAll(TOKEN_RE)) {
    out.push({ kind: "price token", match: `${m[0]} outside [[ ]]`, index: m.index });
  }
  for (const m of text.matchAll(TOKEN_RE)) {
    const [key, unit, extra] = m[1].split(":");
    if (!/^[a-z0-9_-]+$/i.test(key) || extra !== undefined || (unit !== undefined && unit !== "aar")) {
      out.push({ kind: "price token", match: `${m[0]} malformed (use {pris:<pakke>} or {pris:<pakke>:aar})`, index: m.index });
    } else if (!PRICE_PACKAGE_KEYS.has(key.toLowerCase())) {
      out.push({ kind: "price token", match: `${m[0]} unknown package (${[...PRICE_PACKAGE_KEYS].join(", ")})`, index: m.index });
    }
  }
  return out;
}

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
  // Catalog version 3 (October 2026): Basis 795 and Komplet 3995 a month.
  "795", "3995", "9540", "47940",
];

const figure = `(?:${PLAN_FIGURES.map((f) => (f.length > 3 ? `${f.slice(0, -3)}[.\\s]?${f.slice(-3)}` : f)).join("|")})`;

/**
 * The one file that builds the trial and intro-offer sentences from the
 * packages API (`trialDays`, `introBoost`, `upgradeOffer`). Everywhere else,
 * including every CMS field, this wording is still refused.
 */
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
  { kind: "package price", re: /\b(?:fra|starter ved|starter fra|basis ved|basis fra|allerede fra|priserne starter)\s+\d{1,3}(?:[.\s]\d{3})*\s*(?:kr|kroner)\b/i },
  { kind: "package price", re: /premium-pris|udvidet-pris/i },
  { kind: "package price", re: /\d+\s*%\s*rabat\b/i },
  { kind: "trial claim", re: /\bprøveperiode\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "trial claim", re: /\bprøv\s+(?:platformen\s+|qlim8\s+)?gratis\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "trial claim", re: /\bgratis\s+prøve\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "intro offer claim", re: /\bde\s+første\s+\d+\s+dage\s+med\s+alt\s+fra\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "intro offer claim", re: /\bopgrader\s+til\s+\S+\s+inden\s+for\s+det\s+første\s+år\b/i, allowedIn: TRIAL_FROM_DATA },
  { kind: "trial claim", re: /\bgratis\s+demo-konto\b/i },
];

/**
 * Every rule a piece of text breaks, with the matching words. `file` is the
 * repo-relative path of bundled copy, for the rules that exempt a file.
 */
export function salesLedViolations(text, { file, tokens = true } = {}) {
  const out = [];
  for (const { kind, re, allowedIn } of SALES_LED_RULES) {
    if (file && allowedIn?.includes(file)) continue;
    const m = text.match(re);
    if (m) out.push({ kind, match: m[0] });
  }
  // `tokens: false` is for a caller that reads line by line and checks the
  // tokens once over the whole file (scripts/check-sales-led.mjs).
  if (tokens) out.push(...priceTokenViolations(text).map(({ kind, match }) => ({ kind, match })));
  return out;
}
