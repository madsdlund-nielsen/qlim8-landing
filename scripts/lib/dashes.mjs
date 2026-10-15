// The dash rule, shared by check-dashes.mjs (the bundled copy) and
// check-cms-copy.mjs (what /admin has published), so both hold the same line.
//
// Owner's rule (October 2026):
//   - The long em-dash (U+2014) is never right in this site's copy.
//   - A short en-dash (U+2013) with a space on both sides, between words, is a
//     Danish tankestreg and is allowed ("Det er rigtigt – men ikke nok"). A
//     comma, colon or full stop is still preferred wherever one fits.
//   - The en-dash as a range sign is allowed with no spaces: between two
//     numbers ("9:00–17:00", "2024–2026") and between two weekdays or two
//     months ("Mandag–fredag", "januar–marts").
//   - Anything else is an em-dash in disguise and is rejected: an unspaced
//     en-dash between two ordinary words ("klima–regnskab"), a dash with a
//     space on one side only, and a dash with no word on one side.

const EM_DASH = "—";
const EN_DASH = "–";

/** Words that may stand either side of an unspaced en-dash as a range. */
const RANGE_WORDS = new Set([
  "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag",
  "man", "tirs", "ons", "tors", "fre", "lør", "søn",
  "januar", "februar", "marts", "april", "maj", "juni", "juli", "august",
  "september", "oktober", "november", "december",
]);

const isDigit = (ch) => ch !== undefined && /\d/.test(ch);
const isLetter = (ch) => ch !== undefined && /\p{L}/u.test(ch);
const isSpace = (ch) => ch === " " || ch === String.fromCharCode(160);

function wordBefore(text, col) {
  const m = text.slice(0, col).match(/(\p{L}+)$/u);
  return m ? m[1].toLowerCase() : "";
}
function wordAfter(text, col) {
  const m = text.slice(col + 1).match(/^(\p{L}+)/u);
  return m ? m[1].toLowerCase() : "";
}

/** True when the en-dash at `col` is allowed. */
function enDashOk(text, col) {
  const before = text[col - 1];
  const after = text[col + 1];
  // `9:00–17:00`, `2024–2026`: a range between two numbers.
  if (isDigit(before) && isDigit(after)) return true;
  // `Mandag–fredag`: a range between two weekdays or two months.
  if (isLetter(before) && isLetter(after)) {
    return RANGE_WORDS.has(wordBefore(text, col)) && RANGE_WORDS.has(wordAfter(text, col));
  }
  // ` – `: the Danish tankestreg, spaced on both sides, with something to
  // join on both sides. A line may end after the dash (a string split over
  // two lines), which is not a fault of the dash.
  if (isSpace(before) && isSpace(after)) {
    return text.slice(0, col).trim().length > 0 && text.slice(col + 1).trim().length > 0;
  }
  return false;
}

/** Every em-dash, and every en-dash that is neither a range nor a spaced tankestreg. */
export function dashFindings(text) {
  const out = [];
  for (let col = 0; col < text.length; col++) {
    const ch = text[col];
    if (ch !== EM_DASH && ch !== EN_DASH) continue;
    if (ch === EN_DASH && enDashOk(text, col)) continue;
    out.push({ col, char: ch === EM_DASH ? "em-dash" : "en-dash" });
  }
  return out;
}
