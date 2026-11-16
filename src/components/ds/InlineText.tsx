// A plain copy string with its inline links: `[anchor](/path)` becomes a Next
// <Link> in the prose link style (src/lib/inlineLinks.ts holds the syntax and
// the rules). A string without a link renders as the bare text it always was.
import Link from "next/link";
import { renderInlineLinks } from "@/lib/renderInlineLinks";

export function InlineText({ text }: { text: string }) {
  return <>{renderInlineLinks(text, Link)}</>;
}
