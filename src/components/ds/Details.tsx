// Native <details> fold-outs: the answer is in the HTML whether or not it is
// open, and nothing here ships JavaScript. DepthDetails and Faq use it.
import { ChevronDown } from "lucide-react";
import { Paragraphs } from "./Paragraphs";

/** Native <details>: the answer is in the HTML whether or not it is open. */
export function Details({ items, openFirst }: { items: { summary: string; body: string }[]; openFirst?: boolean }) {
  return (
    <div className="grid max-w-[860px] gap-3">
      {items.map((it, i) => (
        <details key={it.summary} open={openFirst && i === 0} className="group rounded-lg border border-border bg-card px-5 md:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-medium text-primary [&::-webkit-details-marker]:hidden">
            {it.summary}
            <ChevronDown aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 shrink-0 text-sage transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="max-w-(--measure-body) pb-4 text-foreground">
            <Paragraphs text={it.body} />
          </div>
        </details>
      ))}
    </div>
  );
}
