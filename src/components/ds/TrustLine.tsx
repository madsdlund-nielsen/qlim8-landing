// The trust line under a main button (and MicroLine.tsx beside it) (design-system/komponenter/TrustLine.md):
// up to three short reassurances, each with a sage check, and the micro line
// below it. The sales-led switch is built in: "Ingen binding" and "Ingen
// kreditkort" are true of the free package only, so while the catalog sells
// nothing by itself (catalog v1, or the packages API unreachable) the trust
// line is SALES_LED_TRUST and the micro line is left out.
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SALES_LED_TRUST } from "@/content/cta";
import { getSelfServe } from "@/lib/selfServe";

export async function TrustLine({ items, inverted, center, className }: { items?: string[]; inverted?: boolean; center?: boolean; className?: string }) {
  const own = (items ?? []).filter((t) => t.trim());
  if (own.length === 0) return null;
  const lines = (await getSelfServe()) ? own.slice(0, 3) : [SALES_LED_TRUST];
  return (
    <ul
      className={cn(
        "mt-3 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-trust",
        inverted ? "text-primary-foreground" : "text-muted-foreground",
        center && "justify-center",
        className,
      )}
    >
      {lines.map((t) => (
        <li key={t} className="inline-flex items-center gap-1">
          <Check aria-hidden="true" strokeWidth={2} className={cn("h-4 w-4 shrink-0", inverted ? "text-primary-foreground" : "text-sage")} />
          {t}
        </li>
      ))}
    </ul>
  );
}
