// Collaboration models as cards, each with its bullets as a check list.
import { CheckList } from "./CheckList";

export function OptionCards({ items }: { items: { title: string; body: string; bullets: string[] }[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {items.map((o) => (
        <div key={o.title} className="rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
          <h3 className="mb-2">{o.title}</h3>
          <p className="mb-4 text-body-sm text-muted-foreground">{o.body}</p>
          <CheckList items={o.bullets.map((b) => ({ body: b }))} className="gap-2 text-body-sm" />
        </div>
      ))}
    </div>
  );
}
