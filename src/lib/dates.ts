/**
 * The most recent of several optional dates (ISO strings or Date), or
 * undefined when none is usable. Invalid strings are ignored rather than
 * turning into "Invalid Date" in the sitemap. Kept free of imports so
 * node --test can load it without the `@/` alias.
 */
export function latestOf(...candidates: Array<string | Date | null | undefined>): Date | undefined {
  let max: Date | undefined;
  for (const c of candidates) {
    if (!c) continue;
    const d = c instanceof Date ? c : new Date(c);
    if (Number.isNaN(d.getTime())) continue;
    if (!max || d > max) max = d;
  }
  return max;
}
