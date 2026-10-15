// The price token: how a package price may appear in copy without ever being
// typed there.
//
//   [[Starter koster {pris:starter} om måneden, betalt årligt.]]
//   [[Det er {pris:starter:aar} om året.]]
//
// A sentence that names a price is wrapped in [[ ... ]] and holds one or more
// {pris:<packageKey>} (the monthly amount) or {pris:<packageKey>:aar} (the
// yearly amount) tokens. At render time applyPriceTokens replaces each token
// with the amount from the packages API (src/lib/packages.ts), in Danish
// formatting, and strips the [[ ]] markers. If ANY token inside a [[ ]]
// segment cannot be resolved, the whole segment is removed, so the page reads
// without it: catalog version 1, an API that cannot be reached, a package
// with no public price, an advisor package and the free package have no
// price to show. That is what keeps the guard against hand-typed prices
// (scripts/lib/salesLed.mjs) meaningful: the figure is only ever the
// catalog's, and the sentence is only ever there while the catalog sells it.
//
// Pure: no fetch, no alias imports, so `npm test` runs it directly. Callers
// fetch the packages; src/lib/pageCopy.ts applies this to every resolved page
// copy (so the CMS overrides, the rendered pages and the .md twins all pass
// through it).
import { isSelfServe, type PublicPackages } from "./packageView.ts";

const SEGMENT = /\[\[([\s\S]*?)\]\]/g;
const TOKEN = /\{pris:([a-z0-9_-]+)(?::(aar))?\}/gi;

/** Danish money: thousands with ".", decimals with "," only when there are any, then "kr.". */
export function formatPrice(minor: number): string {
  const kroner = minor / 100;
  const whole = Number.isInteger(kroner);
  const n = new Intl.NumberFormat("da-DK", {
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    minimumGroupingDigits: 1,
  } as Intl.NumberFormatOptions).format(kroner);
  return `${n} kr.`;
}

/** The amount a token names, or null when the catalog gives no public price for it. */
export function resolvePriceToken(
  data: PublicPackages | null | undefined,
  key: string,
  yearly: boolean,
): string | null {
  if (!data || !isSelfServe(data)) return null;
  const pkg = data.packages.find((p) => p.key === key.toLowerCase());
  if (!pkg || pkg.free || pkg.accountType !== "company") return null;
  const price = pkg.price;
  if (!price || price.visibility !== "public") return null;
  const minor = yearly ? price.yearlyMinor : price.monthlyMinor;
  return Number.isFinite(minor) && minor > 0 ? formatPrice(minor) : null;
}

/** One string: segments resolved or removed, stray tokens resolved or dropped. */
export function applyPriceTokensToString(text: string, data: PublicPackages | null | undefined): string {
  if (!text.includes("[[") && !text.includes("{pris:")) return text;
  let removed = false;
  const fill = (s: string): string | null => {
    let ok = true;
    const out = s.replace(TOKEN, (_m, key: string, aar?: string) => {
      const v = resolvePriceToken(data, key, Boolean(aar));
      if (v === null) ok = false;
      return v ?? "";
    });
    // A sentence ends "{pris:starter}." and the amount already ends in a dot.
    return ok ? out.replace(/kr\.\.(?!\.)/g, "kr.") : null;
  };
  let result = text.replace(SEGMENT, (_m, inner: string) => {
    const filled = fill(inner);
    if (filled === null) removed = true;
    return filled ?? "";
  });
  // A token outside a segment is a copy fault (the guards fail it); resolve it
  // if the catalog can, drop just the token if not, never print the braces.
  result = result.replace(TOKEN, (_m, key: string, aar?: string) => {
    const v = resolvePriceToken(data, key, Boolean(aar));
    if (v === null) removed = true;
    return v ?? "";
  });
  // An unclosed marker is never printed either.
  result = result.replace(/\[\[|\]\]/g, "");
  if (removed) {
    result = result
      .replace(/[ \t]{2,}/g, " ")
      .replace(/ +([.,:;!?])/g, "$1")
      .replace(/^\s+|\s+$/g, "")
      .replace(/\n{3,}/g, "\n\n");
  }
  return result;
}

/** True when some string in `before` had text and the same string in `after` has none. */
function lostText(before: unknown, after: unknown): boolean {
  if (typeof before === "string") return before.trim().length > 0 && (typeof after !== "string" || after.trim().length === 0);
  if (Array.isArray(before)) return before.some((b, i) => lostText(b, Array.isArray(after) ? after[i] : undefined)) && !Array.isArray(after);
  if (before && typeof before === "object") {
    return Object.entries(before).some(([k, b]) => !Array.isArray(b) && lostText(b, (after as Record<string, unknown>)?.[k]));
  }
  return false;
}

/**
 * The deep transform over resolved copy: every string passes through
 * applyPriceTokensToString. A `string[]` loses the entries that became empty;
 * an object in an array is dropped when one of its strings had text before and
 * has none left (a table row or an FAQ item whose answer was only the removed
 * sentence: a question with no answer is worse than no question). Anything
 * that is not a string, array or plain object is returned as it is.
 */
export function applyPriceTokens<T>(copy: T, data: PublicPackages | null | undefined): T {
  const walk = (v: unknown): unknown => {
    if (typeof v === "string") return applyPriceTokensToString(v, data);
    if (Array.isArray(v)) {
      const out: unknown[] = [];
      for (const item of v) {
        const next = walk(item);
        if (typeof item === "string") {
          if (typeof next === "string" && next.length === 0 && item.length > 0) continue;
        } else if (item && typeof item === "object" && !Array.isArray(item) && lostText(item, next)) {
          continue;
        }
        out.push(next);
      }
      return out;
    }
    if (v && typeof v === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, val] of Object.entries(v)) out[k] = walk(val);
      return out;
    }
    return v;
  };
  return walk(copy) as T;
}
