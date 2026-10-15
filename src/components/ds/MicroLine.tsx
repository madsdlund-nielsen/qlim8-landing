// The micro line under the trust line ("Ingen kreditkort påkrævet · ..."). Part
// of the same switch: left out while the catalog sells nothing by itself.
import { cn } from "@/lib/utils";
import { getSelfServe } from "@/lib/selfServe";

export async function MicroLine({ text, inverted, center, className }: { text?: string; inverted?: boolean; center?: boolean; className?: string }) {
  if (!text?.trim()) return null;
  if (!(await getSelfServe())) return null;
  return (
    <p className={cn("mt-3 text-trust", inverted ? "text-primary-foreground" : "text-muted-foreground", center && "text-center", className)}>
      {text}
    </p>
  );
}
