// The micro line under the trust line ("Ingen kreditkort påkrævet · ..."). Part
// of the same switch: while the catalog sells nothing by itself it reads
// SALES_LED_MICRO (the phone and the mail) instead of what the page wrote.
import { cn } from "@/lib/utils";
import { getSelfServe } from "@/lib/selfServe";
import { SALES_LED_MICRO } from "@/content/cta";

export async function MicroLine({ text, inverted, center, className }: { text?: string; inverted?: boolean; center?: boolean; className?: string }) {
  if (!text?.trim()) return null;
  const selfServe = await getSelfServe();
  return (
    <p className={cn("mt-3 text-trust", inverted ? "text-primary-foreground" : "text-muted-foreground", center && "text-center", className)}>
      {selfServe ? text : SALES_LED_MICRO}
    </p>
  );
}
