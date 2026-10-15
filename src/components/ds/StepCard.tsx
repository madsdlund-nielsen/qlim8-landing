// The step card (design-system/komponenter/StepCard.md): the journey in up to
// three calm steps.
import { CARD } from "./Card";

/** One of up to three steps: a number badge in primary, a calm action as the title, a short explanation. */
export function StepCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className={CARD}>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-button font-semibold text-primary-foreground">{n}</span>
      <h3 className="mb-2 mt-4">{title}</h3>
      <p className="text-body-sm text-muted-foreground">{body}</p>
    </div>
  );
}
