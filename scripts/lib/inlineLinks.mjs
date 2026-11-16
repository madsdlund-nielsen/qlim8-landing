// The inline-link rule, shared by check-inline-links.mjs (the bundled copy and
// the bundled articles) and check-cms-copy.mjs (what /admin has published), so
// both hold the same line. Tested in scripts/lib/inlineLinks.test.mjs.
//
// A marketing copy string may hold `[anchor](/path)` (src/lib/inlineLinks.ts is
// the syntax and the renderer); an article carries its links as `<a href="/path">`
// inside a `richtext` block. Both are internal links, and a link is a promise
// to the reader, so a target has to be a page that is live today:
//
//   - a live route (static page, hub, marketing leaf, bundled article);
//   - not a retired address in redirects.json or next.config.ts (it still
//     answers, one 301 hop later, and the hop costs the link its weight);
//   - not /integrationer/appelsin;
//   - not a signup, register or checkout address (the packages API names those,
//     and they are never typed in copy: CLAUDE.md, "What copy may not say");
//   - not the .md twin and not with a trailing slash (both are a hop or a
//     different document);
//   - not the page the link sits on, where that is known.
//
// And the syntax has to be a link or plainly not one: `[text](` that is not a
// valid internal link (external URL, no leading slash, no closing bracket, a
// space in the path) is reported, because the page would print it as text.
import { findInlineLinks } from "../../src/lib/inlineLinks.ts";

/** Targets that are refused whatever they are, with the reason. */
export const FORBIDDEN_TARGETS = {
  "/integrationer/appelsin": "this page is not linked from copy",
};

const SIGNUP_PATH = /^\/(signup|register|checkout|opret-konto)(\/|$)/i;
const SIGNUP_QUERY = /(?:^|[?&])(package|tab)=/i;

/** The path of an internal href without query and fragment, and the rest. */
export function splitTarget(href) {
  const m = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(href) ?? [];
  return { path: m[1] ?? href, query: m[2] ?? "", hash: m[3] ?? "" };
}

/** True for a site-relative href: one leading slash, not "//host". */
export const isInternalHref = (href) => href.startsWith("/") && !href.startsWith("//");

/**
 * What is wrong with a link target, as plain sentences; [] when nothing.
 * `ctx.isRoute(path)` says whether a path is a live page, `ctx.redirectTarget(path)`
 * returns where a retired path now goes (or undefined), `ctx.selfPath` is the
 * path of the page the link sits on, when known.
 */
export function targetProblems(href, ctx) {
  if (!isInternalHref(href)) return [];
  const { path, query, hash } = splitTarget(href);
  const out = [];
  if (SIGNUP_PATH.test(path) || SIGNUP_QUERY.test(query)) {
    out.push("is a signup, register or checkout address: the packages API names those, never copy");
    return out;
  }
  if (FORBIDDEN_TARGETS[path]) {
    out.push(`is not allowed as a link target (${FORBIDDEN_TARGETS[path]})`);
    return out;
  }
  if (path.endsWith(".md")) {
    out.push("is the .md twin of a page: link the page itself, the twin gets its links rewritten");
    return out;
  }
  if (path.length > 1 && path.endsWith("/")) out.push("ends in a slash: link the path without it");
  const bare = path.length > 1 ? path.replace(/\/+$/, "") : path;
  const retired = ctx.redirectTarget?.(bare);
  if (retired) {
    out.push(`is a retired address (301 to ${retired}): link ${retired} instead`);
  } else if (!ctx.isRoute(bare)) {
    out.push("is not a live route on qlim8.com");
  }
  if (ctx.selfPath && bare === ctx.selfPath) out.push(`links the page to itself (${ctx.selfPath}${hash ? hash : ""})`);
  return out;
}

/**
 * Malformed inline-link syntax in a string: every `](` that is not the middle of
 * a valid `[anchor](/path)`. Each problem says what to change.
 */
export function syntaxProblems(text) {
  const valid = new Set();
  for (const l of findInlineLinks(text)) valid.add(l.index + 1 + l.text.length);
  const out = [];
  for (const m of text.matchAll(/\]\(/g)) {
    if (valid.has(m.index)) continue;
    const after = text.slice(m.index + 2);
    const target = /^[^)\n]*/.exec(after)[0];
    const closed = after.length > target.length && after[target.length] === ")";
    const context = text.slice(Math.max(0, m.index - 24), m.index + 2 + Math.min(target.length, 40) + (closed ? 1 : 0)).replace(/\s+/g, " ");
    let why;
    if (!closed) why = "the link is not closed with )";
    else if (/^(https?:)?\/\//i.test(target) || /^[a-z][a-z0-9+.-]*:/i.test(target)) {
      why = "an inline link is internal only: write an external source as <a href> in a richtext block, or leave it out";
    } else if (!target.startsWith("/")) why = "the target must be a site-relative path starting with /";
    else if (/\s/.test(target)) why = "there is a space in the target";
    else why = "not a valid [anchor](/path): empty anchor, brackets inside the anchor, or ( ) inside the path";
    out.push({ match: context, why });
  }
  return out;
}

/** Every href="..." and buttonHref in a piece of HTML or source, as the raw target. */
export function hrefsIn(text) {
  const out = [];
  for (const m of text.matchAll(/\b(?:button)?[Hh]ref\s*[=:]\s*\\?["']([^"'\\\s]+)/g)) out.push({ href: m[1], index: m.index ?? 0 });
  return out;
}

/** True when the string holds an HTML anchor tag. */
export const hasHtmlAnchor = (text) => /<a\s[^>]*href=/i.test(text);
