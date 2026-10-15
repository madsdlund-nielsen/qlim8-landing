// A list with sage line-icon checks; an item may carry a bold lead-in title.
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export function CheckList({ items, className }: { items: { title?: string; body: string }[]; className?: string }) {
  return (
    <ul className={cn("m-0 grid max-w-3xl list-none gap-4 p-0", className)}>
      {items.map((item) => (
        <li key={`${item.title ?? ""}${item.body}`} className="flex gap-3">
          <Icon name="Check" className="mt-1 h-5 w-5 shrink-0 text-sage" />
          <span className="max-w-(--measure-body)">
            {item.title && <strong className="font-semibold text-foreground">{item.title}: </strong>}
            <span className={item.title ? "text-muted-foreground" : undefined}>{item.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
