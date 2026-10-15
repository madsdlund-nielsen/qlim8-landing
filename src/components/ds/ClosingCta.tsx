// The closing section (design-system/komponenter/ClosingCta.md): a calm end
// with two ways in. A forest-green panel with radius-lg, H2 and lead in
// primary-foreground, and the buttons inverted (white with forest text, and a
// white outline). `tone="sand"` is the lighter variant of the mockup. No time
// pressure and no offer in the text. Replaces src/components/public/CTASection.
import { Button, ButtonRow } from "./Button";
import { Section } from "./Section";
import { TrustLine } from "./TrustLine";
import { MicroLine } from "./MicroLine";
import { getSelfServe } from "@/lib/selfServe";
import { resolveCta } from "@/lib/packageView";
import { cn } from "@/lib/utils";

export async function ClosingCta({
  title,
  description,
  primary,
  secondary,
  trustLine,
  microLine,
  tone = "primary",
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  trustLine?: string[];
  microLine?: string;
  tone?: "primary" | "sand";
}) {
  const selfServe = await getSelfServe();
  const p = resolveCta(primary, selfServe);
  const s = secondary ? resolveCta(secondary, selfServe) : undefined;
  const dark = tone === "primary";
  return (
    <Section size="none" className="pb-14 md:pb-section">
      <div
        className={cn(
          "rounded-lg px-4 py-16 text-center md:px-8 md:py-section-lg",
          dark ? "bg-primary text-primary-foreground" : "bg-sand text-foreground",
        )}
      >
        <h2 className={cn("mx-auto mb-4 max-w-2xl text-balance", dark && "text-primary-foreground")} data-testid="text-cta-title">
          {title}
        </h2>
        <p className={cn("mx-auto mb-8 max-w-(--measure-body) text-body", dark ? "text-primary-foreground" : "text-foreground")}>{description}</p>
        <ButtonRow center>
          <Button href={p.href} variant={dark ? "inverted" : "primary"} data-testid="button-cta-primary">
            {p.label}
          </Button>
          {s && !(s.href === p.href && s.label === p.label) && (
            <Button href={s.href} variant={dark ? "invertedOutline" : "outline"} data-testid="button-cta-secondary">
              {s.label}
            </Button>
          )}
        </ButtonRow>
        <TrustLine items={trustLine} inverted={dark} center />
        <MicroLine text={microLine} inverted={dark} center />
      </div>
    </Section>
  );
}
