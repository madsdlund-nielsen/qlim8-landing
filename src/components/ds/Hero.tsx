// The hero (design-system/komponenter/Hero.md): one H1, a lead, a primary and
// a secondary button, the trust line, and a photograph beside it. Without an
// image it is a single column; there is never a placeholder box. A button that
// leads to /priser books a demo while the catalog sells nothing by itself
// (resolveCta).
import * as React from "react";
import { Button, ButtonRow } from "./Button";
import { Photo, type PhotoSource } from "./Photo";
import { TrustLine } from "./TrustLine";
import { MicroLine } from "./MicroLine";
import { getSelfServe } from "@/lib/selfServe";
import { resolveCta } from "@/lib/packageView";
import { cn } from "@/lib/utils";

export interface HeroImage {
  src: PhotoSource;
  alt: string;
}

export async function Hero({
  before,
  eyebrow,
  badge,
  title,
  lead,
  primary,
  secondary,
  trustLine,
  microLine,
  image,
  ratio = "landscape",
}: {
  /** Breadcrumbs, above the heading. */
  before?: React.ReactNode;
  eyebrow?: string;
  badge?: string;
  title: string;
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  trustLine?: string[];
  microLine?: string;
  image?: HeroImage;
  ratio?: "landscape" | "portrait";
}) {
  const selfServe = await getSelfServe();
  const p = resolveCta(primary, selfServe);
  const s = secondary ? resolveCta(secondary, selfServe) : undefined;
  // Both buttons into the same place (the demo) is one button.
  const showSecondary = s && !(s.href === p.href && s.label === p.label);
  return (
    <div className={cn("grid items-center gap-8 lg:gap-12", image && "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]")}>
      <div>
        {before}
        {eyebrow && <p className="mb-3 text-body-sm font-semibold text-sage">{eyebrow}</p>}
        {badge && <span className="mb-4 inline-block rounded-md bg-sand px-3 py-1 text-trust font-semibold text-primary">{badge}</span>}
        <h1 className="mb-6 max-w-3xl text-balance">{title}</h1>
        <p className="mb-8 max-w-(--measure-body) text-lead text-foreground">{lead}</p>
        <ButtonRow>
          <Button href={p.href} variant="primary" data-testid="button-hero-primary">
            {p.label}
          </Button>
          {showSecondary && (
            <Button href={s.href} variant="secondary" data-testid="button-hero-secondary">
              {s.label}
            </Button>
          )}
        </ButtonRow>
        <TrustLine items={trustLine} />
        <MicroLine text={microLine} />
      </div>
      {image && <Photo src={image.src} alt={image.alt} ratio={ratio} priority sizes="(min-width: 1024px) 480px, 100vw" />}
    </div>
  );
}
