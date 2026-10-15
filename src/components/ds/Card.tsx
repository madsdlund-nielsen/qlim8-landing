// The plain card and the card grid: the base of TrustCard and StepCard, and
// what the feature and pain-point blocks use.
import * as React from "react";
import { cn } from "@/lib/utils";

export const CARD = "rounded-lg border border-border bg-card p-6 shadow-soft md:p-8";

/** A card on the white surface: the base of the others. */
export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(CARD, className)}>{children}</div>;
}

/** Cards in a grid with the design's 32px gap; stacked on a phone. */
export function CardGrid({ cols = 3, className, children }: { cols?: 2 | 3; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-6 md:gap-8", cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2", className)}>{children}</div>
  );
}
