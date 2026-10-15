// The scope or method table: a real <table> from md up, one stacked <dl> per
// row below, both server-rendered (so both are in the HTML).
import { cn } from "@/lib/utils";

export function ScopeTable({
  headers,
  rows,
  note,
}: {
  headers: { a: string; b: string; c: string };
  rows: { a: string; b: string; c: string }[];
  note?: string;
}) {
  const cols = [headers.a, headers.b, headers.c];
  return (
    <div>
      {/* md and up: a table. */}
      <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-soft md:block">
        <table className="w-full border-collapse text-left text-body-sm">
          <thead>
            <tr className="bg-band">
              {cols.map((h) => (
                <th key={h} scope="col" className="px-5 py-4 font-semibold text-primary">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border align-top">
                <th scope="row" className="px-5 py-4 font-semibold text-foreground">
                  {r.a}
                </th>
                <td className="px-5 py-4 text-foreground">{r.b}</td>
                <td className="px-5 py-4 text-foreground">{r.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Below md: one stacked card per row. */}
      <div className="grid gap-4 md:hidden">
        {rows.map((r, i) => (
          <dl key={i} className="m-0 grid gap-3 rounded-lg border border-border bg-card p-5 shadow-soft">
            {[
              [cols[0], r.a, true],
              [cols[1], r.b, false],
              [cols[2], r.c, false],
            ].map(([label, value, strong]) => (
              <div key={label as string}>
                <dt className="text-trust text-muted-foreground">{label as string}</dt>
                <dd className={cn("m-0 text-body-sm text-foreground", strong && "font-semibold")}>{value as string}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
      {note && <p className="mt-4 max-w-(--measure-body) text-body-sm text-muted-foreground">{note}</p>}
    </div>
  );
}
