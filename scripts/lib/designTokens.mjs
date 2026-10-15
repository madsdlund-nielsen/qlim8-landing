// The design-token rule, used by check-design-tokens.mjs. The site's colours,
// radii and edges are the tokens in src/index.css (design-system/tokens.json),
// so a class that names a raw palette step, white or black, a hex value, or a
// radius the design does not have (rounded-2xl and rounded-3xl) is a way around
// them. The rule works on one line of source at a time.
//
// What it flags:
//   palette   text-gray-900, bg-slate-50, border-zinc-200 ... (the neutral
//             scales) and the coloured scales (red, emerald, teal ...), with any
//             variant prefix (hover:, md:, group-[.x]:) and any utility that
//             takes a colour (text, bg, border, ring, ring-offset, divide, from,
//             to, via, fill, stroke, outline, decoration, placeholder, accent,
//             caret, shadow)
//   white     bg-white, text-black, and the pair bg-black, text-white,
//             border-white: use bg-card / text-foreground and, on a primary
//             surface, text-primary-foreground
//   hex       an arbitrary colour value anywhere (bg-[#fff], text-[rgb(...)],
//             border-[hsl(...)]) and a bare hex colour on a line that sets a
//             className (or cn( / cva()
//   radius    rounded-2xl and rounded-3xl (and their directional forms): 12px
//             is rounded-lg, and the design has nothing rounder than a card

const UTILITIES = "text|bg|border|ring|ring-offset|divide|from|to|via|fill|stroke|outline|decoration|placeholder|accent|caret|shadow";
const NEUTRALS = "gray|slate|zinc|neutral|stone";
const COLOURS = "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";

/** A utility class starts after whitespace, a quote, a backtick, a colon or a bracket, never inside a word. */
const START = String.raw`(?<![\w-])`;

export const RULES = [
  { id: "palette", re: new RegExp(`${START}(?:${UTILITIES})-(?:${NEUTRALS}|${COLOURS})-\\d+`, "g"), why: "a raw palette step: use the tokens (text-foreground, text-muted-foreground, bg-band, border-border, text-sage ...)" },
  { id: "white-black", re: new RegExp(`${START}(?:bg-white|text-black|bg-black|text-white|border-white|border-black)(?![\\w-])`, "g"), why: "white or black: bg-card, text-foreground, or text-primary-foreground on a primary surface" },
  { id: "arbitrary-colour", re: new RegExp(`${START}(?:${UTILITIES})-\\[(?:#|rgb|hsl|oklch|color)`, "g"), why: "an arbitrary colour value: add a token instead" },
  { id: "radius", re: new RegExp(`${START}rounded(?:-[trbl]{1,2})?-(?:2xl|3xl)(?![\\w-])`, "g"), why: "rounded-2xl and rounded-3xl: use rounded-lg (cards) or rounded-md (controls)" },
];

// Not after a word character, "&" (an entity), "/", "-" or "[" (bg-[#fff] is the arbitrary rule's), and not an anchor (href="#fee").
const HEX = /(?<![\w&/[-])(?<!href=")(?<!href=\{")(?<!to=")(?<!href: ")#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![\w-])/g;
const SETS_CLASS = /className|\bcn\(|\bcva\(|\bclsx\(/;

/** Findings on one line: [{ rule, match, col }], col 0-based. */
export function tokenFindings(line) {
  const out = [];
  for (const { id, re } of RULES) {
    re.lastIndex = 0;
    for (const m of line.matchAll(re)) out.push({ rule: id, match: m[0], col: m.index });
  }
  if (SETS_CLASS.test(line)) {
    for (const m of line.matchAll(HEX)) out.push({ rule: "hex", match: m[0], col: m.index });
  }
  return out;
}

export const WHY = Object.fromEntries([...RULES.map((r) => [r.id, r.why]), ["hex", "a hex colour in a className: add a token instead"]]);
