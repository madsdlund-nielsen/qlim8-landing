// The trust card (design-system/komponenter/TrustCard.md): three short claims
// on soft sage-grey, a line icon in sage, a title (H3) and one sentence.
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * Three short claims on soft sage-grey, a line icon in sage, a title (H3) and
 * one sentence. On a band section the card turns white (`onBand`), or it would
 * vanish into its own background.
 */
export function TrustCard({ icon, title, body, onBand }: { icon: string; title: string; body: string; onBand?: boolean }) {
  return (
    <div className={cn("rounded-lg border p-6 md:p-8", onBand ? "border-border bg-card shadow-soft" : "border-band bg-band")}>
      <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-md", onBand ? "bg-band" : "bg-card")}>
        <Icon name={icon} />
      </span>
      <h3 className="mb-2 mt-4">{title}</h3>
      <p className="text-body-sm text-muted-foreground">{body}</p>
    </div>
  );
}
