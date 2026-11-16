// A copy text as paragraphs: one <p> per blank-line-separated part (see
// src/lib/paragraphs.ts). A text without a break is the one <p> it always was.
// Each paragraph may hold `[anchor](/path)` inline links (src/lib/inlineLinks.ts).
import { paragraphs } from "@/lib/paragraphs";
import { cn } from "@/lib/utils";
import { InlineText } from "./InlineText";

export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {paragraphs(text).map((p, i) => (
        <p key={i} className={cn(i > 0 && "mt-4", className)}>
          <InlineText text={p} />
        </p>
      ))}
    </>
  );
}
