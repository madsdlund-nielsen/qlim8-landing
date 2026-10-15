// The design system's button (design-system/komponenter/Button.md). An <a> when
// it has an href, a <button> otherwise. Radius-md, at least 48px high, and the
// only motion is a 200ms colour change.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-transparent px-6 py-3 text-center text-button font-semibold no-underline transition-colors duration-200 motion-reduce:transition-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** One per visible area. */
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        /** The informal way in ("Tag en uformel snak"). */
        secondary: "bg-sand text-primary hover:bg-secondary-hover",
        /** Phone and less important choices. */
        outline: "border-border-strong bg-transparent text-primary hover:bg-band",
        /** On a primary surface: white, with forest text. */
        inverted: "bg-primary-foreground text-primary hover:bg-sand",
        /** On a primary surface: a white outline. */
        invertedOutline: "border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-hover",
      },
      full: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", full: false },
  },
);

type Common = VariantProps<typeof buttonStyles> & { className?: string; children: React.ReactNode };
type AnchorProps = Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;
type ButtonProps = Common & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: AnchorProps | ButtonProps) {
  const { variant, full, className, children, ...rest } = props;
  const cls = cn(buttonStyles({ variant, full }), className);
  if (typeof rest.href === "string") {
    return (
      <a {...(rest as Omit<AnchorProps, keyof Common>)} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...(rest as Omit<ButtonProps, keyof Common>)} className={cls}>
      {children}
    </button>
  );
}

/** Buttons side by side, stacked and full width on a phone. */
export function ButtonRow({ children, className, center }: { children: React.ReactNode; className?: string; center?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4 max-sm:flex-col max-sm:items-stretch", center && "justify-center", className)}>
      {children}
    </div>
  );
}
