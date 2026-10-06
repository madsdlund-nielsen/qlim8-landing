// The em-dash rule, shared by check-dashes.mjs (the bundled copy) and
// check-cms-copy.mjs (what /admin has published), so both hold the same line.
//
// The em-dash (U+2014) is never right in this site's copy. The en-dash (U+2013)
// is the correct Danish range sign between two numbers or two words
// ("9:00–17:00", "Mandag–fredag") and wrong anywhere else, where it is an
// em-dash in disguise.

const EM_DASH = "—";
const EN_DASH = "–";

/** `9:00–17:00`, `2024–2026`, `Mandag–fredag`: a range, and correct Danish. */
const RANGE_OK = /(?:\d|\p{L})–(?:\d|\p{L})/u;

/** Every em-dash, and every en-dash not between two word or number characters. */
export function dashFindings(text) {
  const out = [];
  for (let col = 0; col < text.length; col++) {
    const ch = text[col];
    if (ch !== EM_DASH && ch !== EN_DASH) continue;
    if (ch === EN_DASH && RANGE_OK.test(text.slice(Math.max(0, col - 1), col + 2))) continue;
    out.push({ col, char: ch === EM_DASH ? "em-dash" : "en-dash" });
  }
  return out;
}
