// An article's `richtext` block (sanitised HTML from /admin, or written in a
// bundled article file) as markdown, for the .md twin (src/lib/markdown.ts).
//
// It used to strip every tag, which ran a numbered list into one line, a table
// into one line of cells and dropped every link. This keeps what an agent
// reading the twin needs: paragraphs, ordered and unordered lists, headings,
// tables, bold and italics, and links. A site path (`/priser`) becomes an
// absolute URL, as every other link in a twin is. Any other tag is dropped and
// its text kept. Pure string work, no imports, so it runs under
// `node --experimental-strip-types`.

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'", "#x27": "'" };
const decode = (s: string) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
  const k = e.toLowerCase();
  if (k in ENTITIES) return ENTITIES[k];
  if (k.startsWith("#x")) return String.fromCodePoint(parseInt(k.slice(2), 16));
  if (k.startsWith("#")) return String.fromCodePoint(parseInt(k.slice(1), 10));
  return m;
});

/** Inline HTML as markdown on one line: links, bold, italics, code; every other tag dropped. */
function inline(html: string, baseUrl: string): string {
  const out = html
    .replace(/<a\s[^>]*?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href: string, inner: string) => {
      const text = inline(inner, baseUrl);
      const url = href.startsWith("/") && !href.startsWith("//") ? baseUrl + href : href;
      return text ? `[${text}](${url})` : "";
    })
    .replace(/<(strong|b)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (_m, _t, _a, inner: string) => `**${inline(inner, baseUrl)}**`)
    .replace(/<(em|i)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (_m, _t, _a, inner: string) => `_${inline(inner, baseUrl)}_`)
    .replace(/<code(\s[^>]*)?>([\s\S]*?)<\/code>/gi, (_m, _a, inner: string) => `\`${inner.replace(/<[^>]+>/g, "")}\``)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "");
  return decode(out).replace(/\s+/g, " ").trim();
}

function cells(rowHtml: string, baseUrl: string): string[] {
  return [...rowHtml.matchAll(/<t[hd](?:\s[^>]*)?>([\s\S]*?)<\/t[hd]>/gi)].map((m) => inline(m[1], baseUrl).replace(/\|/g, "\\|"));
}

function table(html: string, baseUrl: string): string {
  const rows = [...html.matchAll(/<tr(?:\s[^>]*)?>([\s\S]*?)<\/tr>/gi)].map((m) => cells(m[1], baseUrl)).filter((r) => r.length);
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => [...r, ...Array(width - r.length).fill("")];
  const [head, ...body] = rows.map(pad);
  return [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...body.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

function list(tag: string, html: string, baseUrl: string): string {
  const items = [...html.matchAll(/<li(?:\s[^>]*)?>([\s\S]*?)<\/li>/gi)].map((m) => inline(m[1], baseUrl)).filter(Boolean);
  return items.map((it, i) => (tag.toLowerCase() === "ol" ? `${i + 1}. ${it}` : `- ${it}`)).join("\n");
}

/** The block as markdown, blocks separated by a blank line. */
export function richtextToMarkdown(html: string, baseUrl: string): string {
  const blocks: string[] = [];
  const re = /<(p|ol|ul|table|h[1-6]|blockquote)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let last = 0;
  const loose = (s: string) => {
    const t = inline(s, baseUrl);
    if (t) blocks.push(t);
  };
  for (const m of html.matchAll(re)) {
    loose(html.slice(last, m.index));
    last = (m.index ?? 0) + m[0].length;
    const tag = m[1].toLowerCase();
    const body = m[2];
    if (tag === "p") loose(body);
    else if (tag === "ol" || tag === "ul") blocks.push(list(tag, body, baseUrl));
    else if (tag === "table") blocks.push(table(body, baseUrl));
    else if (tag === "blockquote") blocks.push(`> ${inline(body, baseUrl)}`);
    else blocks.push(`${"#".repeat(Number(tag[1]))} ${inline(body, baseUrl)}`);
  }
  loose(html.slice(last));
  return blocks.filter(Boolean).join("\n\n");
}
