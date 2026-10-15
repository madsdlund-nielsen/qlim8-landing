// The quote (design-system/komponenter/Quote.md): a person speaking at eye
// level, on sand, in the display face. At most one per section.
export function Quote({ quote, name, role }: { quote: string; name?: string; role?: string }) {
  const by = [name, role].filter((v): v is string => Boolean(v && v.trim())).join(", ");
  return (
    <blockquote className="m-0 rounded-lg bg-sand p-6 text-foreground md:p-8">
      <p className="max-w-(--measure-body) font-display text-lead">{quote}</p>
      {by && <footer className="mt-4 text-body-sm text-foreground">{by}</footer>}
    </blockquote>
  );
}
