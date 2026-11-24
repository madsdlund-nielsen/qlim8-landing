// An article's `richtext` block, cut into runs so a <table> can sit in a
// horizontally scrolling container of its own (src/components/public/
// ArticleSections.tsx) while the paragraphs around it stay as they were. The
// app's sanitizer keeps tables flat (no nesting), so the first closing tag
// ends the table. Pure string work, no imports: `npm test` runs it directly.

export type RichtextRun = { html: string; table: boolean };

const TABLE = /<table(?:\s[^>]*)?>[\s\S]*?<\/table>/gi;

/** The html as runs in order: each `<table>...</table>` is its own run; blank runs are left out. */
export function splitRichtextTables(html: string): RichtextRun[] {
  const runs: RichtextRun[] = [];
  let last = 0;
  const push = (chunk: string, table: boolean) => {
    if (chunk.trim()) runs.push({ html: chunk, table });
  };
  for (const m of html.matchAll(TABLE)) {
    push(html.slice(last, m.index), false);
    push(m[0], true);
    last = m.index + m[0].length;
  }
  push(html.slice(last), false);
  return runs;
}
