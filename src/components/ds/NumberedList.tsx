// A numbered list: a number badge in primary and an H3 title with its sentence.

export function NumberedList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="m-0 grid max-w-3xl list-none gap-6 p-0">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-button font-semibold text-primary-foreground">
            {i + 1}
          </span>
          <div>
            <h3 className="mb-1">{item.title}</h3>
            <p className="max-w-(--measure-body)">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
