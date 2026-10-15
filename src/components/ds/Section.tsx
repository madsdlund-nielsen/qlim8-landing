// A page section: a full-bleed surface with the design's vertical air
// (space-section, 80px; space-section-lg, 100px) and a 1120px content width.
// Tone is the surface: background (the page), band (alternate sections, trust
// boxes), sand (quotes), primary (dark forest, text in primary-foreground).
import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "background" | "band" | "sand" | "primary";

const TONES: Record<SectionTone, string> = {
  background: "bg-background",
  band: "bg-band",
  sand: "bg-sand",
  primary: "bg-primary text-primary-foreground",
};

const SIZES = {
  default: "py-14 md:py-section",
  lg: "py-16 md:py-section-lg",
  /** Under a breadcrumb: less on top, the usual air below. */
  hero: "pb-14 pt-6 md:pb-section md:pt-10",
  none: "",
} as const;

export function Section({
  tone = "background",
  size = "default",
  id,
  className,
  innerClassName,
  children,
  "aria-labelledby": labelledBy,
}: {
  tone?: SectionTone;
  size?: keyof typeof SIZES;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  "aria-labelledby"?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(TONES[tone], SIZES[size], className)}>
      <div className={cn("mx-auto w-full max-w-(--container-max) px-4 sm:px-6", innerClassName)}>{children}</div>
    </section>
  );
}

/** A section's H2 with its optional lead, the pair every block opens with. */
export function SectionHead({
  title,
  lead,
  id,
  className,
}: {
  title: string;
  lead?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 grid gap-4 md:mb-12", className)}>
      <h2 id={id} className="max-w-3xl text-balance">
        {title}
      </h2>
      {lead && <p className="max-w-(--measure-body) text-lead text-foreground">{lead}</p>}
    </div>
  );
}
