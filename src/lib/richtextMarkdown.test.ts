// An article's richtext block as markdown in the .md twin (src/lib/richtextMarkdown.ts):
// lists keep their numbering and line breaks, paragraphs stay paragraphs, tables stay
// tables, and links stay links (a site path made absolute).
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import "../../scripts/lib/register-ts.mjs";
import { richtextToMarkdown } from "./richtextMarkdown.ts";

const BASE = "https://qlim8.com";

test("an ordered list keeps its numbers, one item per line", () => {
  assert.equal(richtextToMarkdown("<ol><li>Første</li><li>Anden</li><li>Tredje</li></ol>", BASE), "1. Første\n2. Anden\n3. Tredje");
});

test("an unordered list becomes dashes", () => {
  assert.equal(richtextToMarkdown("<ul><li>A</li><li>B</li></ul>", BASE), "- A\n- B");
});

test("paragraphs are separated by a blank line, and a list after a paragraph is its own block", () => {
  assert.equal(richtextToMarkdown("<p>Ét.</p><p>To.</p><ol><li>x</li></ol>", BASE), "Ét.\n\nTo.\n\n1. x");
});

test("a site link becomes absolute, an external one is kept, an empty anchor is dropped", () => {
  assert.equal(
    richtextToMarkdown('<p>Se <a href="/priser">priserne</a> og <a href="https://eur-lex.europa.eu/x" target="_blank" rel="noopener">kilden</a>.<a href="/x"></a></p>', BASE),
    "Se [priserne](https://qlim8.com/priser) og [kilden](https://eur-lex.europa.eu/x).",
  );
});

test("a link inside a list item survives", () => {
  assert.equal(richtextToMarkdown('<ol><li>Gem <a href="/produkt/audit-trail-og-revisor">fakturaer</a>.</li></ol>', BASE), "1. Gem [fakturaer](https://qlim8.com/produkt/audit-trail-og-revisor).");
});

test("a table becomes a GFM table, a pipe in a cell is escaped", () => {
  const md = richtextToMarkdown("<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1 | 2</td><td>Ja</td></tr></tbody></table>", BASE);
  assert.equal(md, "| A | B |\n| --- | --- |\n| 1 \\| 2 | Ja |");
});

test("bold, italics, headings and entities", () => {
  assert.equal(richtextToMarkdown("<h3>Titel</h3><p>En <strong>vigtig</strong> og <em>skæv</em> sag &amp; mere&nbsp;tekst.</p>", BASE), "### Titel\n\nEn **vigtig** og _skæv_ sag & mere tekst.");
});

test("text outside any block is kept as a paragraph, other tags are dropped", () => {
  assert.equal(richtextToMarkdown("Løs tekst <span>med span</span>", BASE), "Løs tekst med span");
});

test("the two articles whose lists were converted to richtext keep numbering in their twin", async () => {
  const { renderArticle } = await import("./markdown.ts");
  const { articles } = await import("../content/articles.ts");
  const vs = renderArticle(articles.find((a: { slug: string }) => a.slug === "hvad-er-vsme-vs") as never);
  assert.match(vs, /^1\. Afklar jeres position\./m);
  assert.match(vs, /^8\. Gør rapporten til jeres standardsvar\./m);
  assert.match(vs, /^7\. Dokumentér kilderne\. Gem \[fakturaer, aflæsninger og de emissionsfaktorer\]\(https:\/\/qlim8\.com\/produkt\/audit-trail-og-revisor\)/m);
  assert.match(vs, /^\| Oplysning \| 10 ansatte eller færre \| Flere end 10 ansatte \|$/m);
  const mcp = renderArticle(articles.find((a: { slug: string }) => a.slug === "vsme-rapport-ai-agent-mcp") as never);
  assert.match(mcp, /^1\. Log ind på din qlim8-konto\./m);
  assert.match(mcp, /^5\. Spørg om noget/m);
});
