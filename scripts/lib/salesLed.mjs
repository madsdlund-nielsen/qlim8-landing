/**
 * What may not be said on qlim8.com now that qlim8 is sold after a demo: no
 * way for a visitor to sign up or pay by themselves, and no price for a
 * package. Shared by scripts/check-sales-led.mjs (the bundled copy, in
 * `npm run lint`) and scripts/check-cms-copy.mjs (the CMS-published copy that
 * overrides it, in `npm run test:contract`), so both hold the same line.
 *
 * Deliberately narrow. The site still talks about money that is not a qlim8
 * package: consultant fees, an enterprise platform's monthly price, the kroner
 * on an example invoice. So there is no rule against "kr" or "pr. måned" as
 * such; the price rules name the figures qlim8's packages have actually been
 * sold at, and the phrasing an entry price is written in.
 */

/** Every figure a qlim8 package or add-on has been advertised at, in kr. */
const PLAN_FIGURES = ["250", "300", "395", "625", "750", "1195", "1595", "3000", "3600", "7500", "9000", "14340"];

const figure = `(?:${PLAN_FIGURES.map((f) => (f.length > 3 ? `${f.slice(0, -3)}[.\\s]?${f.slice(-3)}` : f)).join("|")})`;

export const SALES_LED_RULES = [
  { kind: "signup link", re: /app\.qlim8\.com\/auth\?tab=register/i },
  { kind: "checkout", re: /\/api\/stripe\/checkout/i },
  { kind: "package price", re: new RegExp(`(?<![\\d.])${figure}\\s*(?:kr\\b|kr\\.|kroner|,-)`, "i") },
  { kind: "package price", re: /\b(?:fra|starter ved|starter fra|allerede fra|priserne starter)\s+\d{1,3}(?:[.\s]\d{3})*\s*(?:kr|kroner)\b/i },
  { kind: "package price", re: /premium-pris/i },
  { kind: "self-service claim", re: /\bgratis\s+(?:konto|demo-konto|prøveperiode)\b/i },
  { kind: "self-service claim", re: /\bprøv\s+(?:platformen\s+|qlim8\s+)?gratis\b/i },
  { kind: "self-service claim", re: /\bstart\s+gratis\b/i },
  { kind: "self-service claim", re: /\bopret\s+(?:en\s+|din\s+)?(?:gratis\s+)?konto\b/i },
  { kind: "self-service claim", re: /\bopretter\s+(?:dig\b|en\s+(?:frisk\s+|gratis\s+)?konto\b)/i },
  { kind: "self-service claim", re: /\bkreditkort\b/i },
  { kind: "self-service claim", re: /\bprøveperiode\b/i },
  { kind: "self-service claim", re: /\bvælg\s+(?:medlemskab|starter|premium|din\s+plan|plan)\b/i },
  { kind: "package price", re: /\bkoster\s+ingenting\b|\bgratis\s+fra\b|\d+\s*%\s*rabat\b/i },
];

/** Every rule a piece of text breaks, with the matching words. */
export function salesLedViolations(text) {
  const out = [];
  for (const { kind, re } of SALES_LED_RULES) {
    const m = text.match(re);
    if (m) out.push({ kind, match: m[0] });
  }
  return out;
}
