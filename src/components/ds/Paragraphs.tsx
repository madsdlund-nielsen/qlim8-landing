// A copy text as paragraphs: one <p> per blank-line-separated part (see
// src/lib/paragraphs.ts). A text without a break is the one <p> it always was.
import { paragraphs } from "@/lib/paragraphs";
import { cn } from "@/lib/utils";

export function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {paragraphs(text).map((p, i) => (
        <p key={i} className={cn(i > 0 && "mt-4", className)}>
          {p}
        </p>
      ))}
    </>
  );
}
