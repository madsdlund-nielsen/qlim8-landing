// The rendering half of src/lib/inlineLinks.ts: a string with inline links as
// React nodes. No JSX, so `node --experimental-strip-types` can test it with
// react-dom/server (src/lib/inlineLinks.test.ts).
import { createElement, Fragment, type ElementType, type ReactNode } from "react";
import { parseInlineLinks } from "./inlineLinks.ts";

/** The class every inline link carries: the prose link of the article richtext (sage, underlined), tokens only. */
export const INLINE_LINK_CLASS = "font-medium text-sage underline underline-offset-2 hover:text-primary";

/**
 * React nodes for a string: text, with each inline link as `linkAs` (Next's
 * `Link` on the site, a plain "a" in a test). A string without a link comes back
 * as the plain string, so it renders exactly as before.
 */
export function renderInlineLinks(text: string, linkAs: ElementType = "a", className: string = INLINE_LINK_CLASS): ReactNode {
  const segments = parseInlineLinks(text);
  if (segments.length === 1 && segments[0].type === "text") return text;
  return createElement(
    Fragment,
    null,
    ...segments.map((s, i) =>
      s.type === "text" ? createElement(Fragment, { key: i }, s.text) : createElement(linkAs, { key: i, href: s.href, className }, s.text),
    ),
  );
}
