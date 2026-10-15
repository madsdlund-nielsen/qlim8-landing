// Fold-outs that keep the depth of a page in the HTML (native <details>).
import { Details } from "./Details";

export function DepthDetails({ items }: { items: { summary: string; body: string }[] }) {
  return <Details items={items} />;
}
