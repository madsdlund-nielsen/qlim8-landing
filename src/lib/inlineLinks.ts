// Inline internal links in plain copy strings.
//
// A marketing-copy field (a FAQ answer, a step body, a card body, a methodology
// paragraph) is one plain string. Writing `[priserne](/priser)` inside it makes
// the words "priserne" a link to /priser. That is the whole syntax:
//
//   [anchor text](/site-relative/path)         also  /path#anchor  and  /path?q=1
//
// Only a path that starts with a single "/" is a link. Anything else
// (`[x](https://...)`, `[x](priser)`, `[x](//host)`, an unclosed `[x](`) stays
// literal text, so a typo never turns into a surprising link. The guard
// scripts/check-inline-links.mjs fails the lint on every such leftover and on a
// target that is dead, retired or the page itself.
//
// One syntax, four consumers, all here so they cannot drift:
//   - renderInlineLinks (src/lib/renderInlineLinks.ts): the rendered page, a Next <Link> in the prose link style.
//   - stripInlineLinks: JSON-LD, meta text and anything else that must not show
//     markup. Keeps the anchor text, drops the rest.
//   - inlineLinksToMarkdown: the `.md` twins, with an absolute URL.
//   - findInlineLinks: the lint guard, with the position of every link.
//
// This file is pure string work with no imports, so the guard scripts, the JSON-LD
// builders and `node --experimental-strip-types` can all load it.
// The paragraph rule (src/lib/paragraphs.ts) runs first and independently: a
// link never spans a blank line, because the anchor part cannot contain a newline.
// `[anchor](/path)`: the anchor has no brackets and no line break; the path starts
// with one "/" (not "//"), has no space, no parenthesis and no line break.
const LINK_SOURCE = String.raw`\[([^\[\]\n]+)\]\((\/(?!\/)[^\s()]*)\)`;

export type InlineSegment = { type: "text"; text: string } | { type: "link"; text: string; href: string };

/** A link found in a string, with where it starts (for the guard's line numbers). */
export type FoundInlineLink = { text: string; href: string; index: number; raw: string };

/** Every inline link in a string, in order. */
export function findInlineLinks(text: string): FoundInlineLink[] {
  const re = new RegExp(LINK_SOURCE, "g");
  const out: FoundInlineLink[] = [];
  for (const m of text.matchAll(re)) out.push({ text: m[1], href: m[2], index: m.index ?? 0, raw: m[0] });
  return out;
}

/** The string as text and link segments. A string without a link is one text segment. */
export function parseInlineLinks(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let last = 0;
  for (const l of findInlineLinks(text)) {
    if (l.index > last) segments.push({ type: "text", text: text.slice(last, l.index) });
    segments.push({ type: "link", text: l.text, href: l.href });
    last = l.index + l.raw.length;
  }
  if (last < text.length || segments.length === 0) segments.push({ type: "text", text: text.slice(last) });
  return segments;
}

/** True when the string holds at least one inline link. */
export function hasInlineLinks(text: string): boolean {
  return findInlineLinks(text).length > 0;
}

/** The plain text of a string: every `[text](/path)` becomes `text`. For JSON-LD, meta text and the like. */
export function stripInlineLinks(text: string): string {
  return text.replace(new RegExp(LINK_SOURCE, "g"), "$1");
}

/** For the `.md` twins: keep `[text](...)` but make the path an absolute URL, like every other link there. */
export function inlineLinksToMarkdown(text: string, baseUrl: string): string {
  return text.replace(new RegExp(LINK_SOURCE, "g"), (_m, anchor: string, href: string) => `[${anchor}](${baseUrl}${href})`);
}
