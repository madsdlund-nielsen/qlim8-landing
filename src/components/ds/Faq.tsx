// The FAQ as native <details>: every answer is in the HTML (SEO rule 3).
import { Details } from "./Details";

export function Faq({ items, openFirst }: { items: { q: string; a: string }[]; openFirst?: boolean }) {
  return <Details items={items.map((f) => ({ summary: f.q, body: f.a }))} openFirst={openFirst} />;
}
