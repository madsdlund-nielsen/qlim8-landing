// Inline internal links in copy strings (src/lib/inlineLinks.ts and
// renderInlineLinks.ts): the syntax, what stays literal, the three places the
// same string is emitted (page, JSON-LD, .md twin), and the neighbours it must
// not disturb (the paragraph break, the price token).
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import "../../scripts/lib/register-ts.mjs";
import { findInlineLinks, hasInlineLinks, inlineLinksToMarkdown, parseInlineLinks, stripInlineLinks } from "./inlineLinks.ts";
import { INLINE_LINK_CLASS, renderInlineLinks } from "./renderInlineLinks.ts";
import { paragraphs } from "./paragraphs.ts";
import { applyPriceTokensToString } from "./priceTokens.ts";

const html = (text: string) => renderToStaticMarkup(renderInlineLinks(text, "a") as never);

test("a [text](/path) becomes a link with the prose link class", () => {
  assert.equal(html("Se [priserne](/priser) her."), `Se <a href="/priser" class="${INLINE_LINK_CLASS}">priserne</a> her.`);
});

test("the link class is tokens only (the design-token guard's rule)", () => {
  assert.match(INLINE_LINK_CLASS, /text-sage/);
  assert.doesNotMatch(INLINE_LINK_CLASS, /gray|white|black|#/);
});

test("a path with a fragment or a query is kept whole", () => {
  assert.equal(html("[pakkerne](/priser#raadgivere)"), `<a href="/priser#raadgivere" class="${INLINE_LINK_CLASS}">pakkerne</a>`);
  assert.equal(html("[book](/kontakt?emne=demo)"), `<a href="/kontakt?emne=demo" class="${INLINE_LINK_CLASS}">book</a>`);
});

test("several links in one string, with the text between kept", () => {
  const out = html("[A](/a), så [B](/b) og til sidst [C](/c).");
  assert.equal([...out.matchAll(/<a /g)].length, 3);
  assert.match(out, /<\/a>, så <a href="\/b"/);
  assert.match(out, /og til sidst <a href="\/c"[^>]*>C<\/a>\.$/);
  assert.deepEqual(findInlineLinks("[A](/a), [B](/b)").map((l) => l.href), ["/a", "/b"]);
});

test("a string without a link comes back as the plain string", () => {
  assert.equal(renderInlineLinks("Ingen links her."), "Ingen links her.");
  assert.equal(hasInlineLinks("Ingen links her."), false);
  assert.equal(html("Tegn som <b> & 'citat' escapes"), "Tegn som &lt;b&gt; &amp; &#x27;citat&#x27; escapes");
});

test("anything that is not an internal path stays literal text", () => {
  for (const s of [
    "[ekstern](https://qlim8.com/priser)",
    "[ekstern](http://example.com)",
    "[protokol](//example.com/x)",
    "[uden skråstreg](priser)",
    "[mailto](mailto:a@b.dk)",
    "[uafsluttet](/priser",
    "[mellemrum](/pri ser)",
    "[]( /priser)",
    "[](/priser)",
    "[a [b]](/x)",
    "[x](/y(z))",
    "tekst (/priser) uden anker",
  ]) {
    assert.equal(hasInlineLinks(s), false, s);
    assert.equal(html(s), renderToStaticMarkup(s as never), `${s} must render as the text it is`);
  }
});

test("a link never spans a line break, so it never spans a paragraph", () => {
  assert.equal(hasInlineLinks("[første\nlinje](/priser)"), false);
  assert.equal(hasInlineLinks("[tekst](/pri\nser)"), false);
});

test("it sits next to the paragraph rule: split first, then a link in each paragraph", () => {
  const text = "Første afsnit med [priserne](/priser).\n\nAndet afsnit med [metoden](/metodologi) og tekst.\n\nTredje uden link.";
  const parts = paragraphs(text);
  assert.equal(parts.length, 3);
  const out = parts.map(html);
  assert.equal([...out[0].matchAll(/<a /g)].length, 1);
  assert.match(out[1], /<a href="\/metodologi"/);
  assert.equal(out[2], "Tredje uden link.");
  // The paragraph split does not cut a link in two.
  assert.equal(parts.join("").includes("](/priser)"), true);
});

test("the price token and an inline link share a sentence, in either order", () => {
  const v3 = JSON.parse(readFileSync(new URL("../../scripts/fixtures/public-packages.v3.json", import.meta.url), "utf8"));
  // A priced catalog: the token is filled and the link inside the same segment survives.
  const filled = applyPriceTokensToString("[[Basis koster {pris:starter}, se [priserne](/priser).]]", v3);
  assert.equal(filled, "Basis koster 795 kr., se [priserne](/priser).");
  assert.equal(html(filled), `Basis koster 795 kr., se <a href="/priser" class="${INLINE_LINK_CLASS}">priserne</a>.`);
  const sentence = "Se [priserne](/priser). [[Basis koster {pris:starter}.]] Slut.";
  assert.equal(stripInlineLinks(applyPriceTokensToString(sentence, null)), "Se priserne. Slut.");
});

test("stripInlineLinks keeps the anchor text and drops the markup (JSON-LD, meta text)", () => {
  assert.equal(stripInlineLinks("Se [priserne](/priser) og [metoden](/metodologi)."), "Se priserne og metoden.");
  assert.equal(stripInlineLinks("Ingen links."), "Ingen links.");
  assert.equal(stripInlineLinks("[ekstern](https://x.dk) bliver stående"), "[ekstern](https://x.dk) bliver stående");
});

test("inlineLinksToMarkdown makes the path absolute, as every other link in a twin is", () => {
  assert.equal(
    inlineLinksToMarkdown("Se [priserne](/priser#x) og [https](https://a.dk/b).", "https://qlim8.com"),
    "Se [priserne](https://qlim8.com/priser#x) og [https](https://a.dk/b).",
  );
});

test("parseInlineLinks gives text and link segments in order", () => {
  assert.deepEqual(parseInlineLinks("a [b](/c) d"), [
    { type: "text", text: "a " },
    { type: "link", text: "b", href: "/c" },
    { type: "text", text: " d" },
  ]);
  assert.deepEqual(parseInlineLinks(""), [{ type: "text", text: "" }]);
});

test("FAQPage JSON-LD carries plain text: no [ or ]( from a link", async () => {
  const { buildFaqPageSchema } = await import("./schema.ts");
  const { buildFaqSchema } = await import("../content/homepage-faqs.ts");
  const items = [{ q: "Hvad koster det?", a: "Se [priserne](/priser) og [metoden](/metodologi)." }];
  for (const schema of [buildFaqPageSchema(items), buildFaqSchema(items)]) {
    const json = JSON.stringify(schema);
    assert.doesNotMatch(json, /\]\(/);
    assert.doesNotMatch(json, /\[priserne\]/);
    assert.match(json, /Se priserne og metoden\./);
  }
});

test("the .md twin of a page keeps the link, absolute", async () => {
  const { renderMarketingPage } = await import("./markdown.ts");
  const node = {
    collection: "produkt", slug: "x", pageKey: "page.produkt.x", title: "X", navLabel: "X", blurb: "b",
    seoTitle: "X", seoDescription: "d", defaults: {},
  } as never;
  const copy = {
    hero: { title: "H", subtitle: "S", primaryCta: { label: "B", href: "/kontakt?emne=demo" } },
    faq: { title: "FAQ", items: [{ q: "Q", a: "Se [priserne](/priser)." }] },
    closingCta: { title: "T", description: "D", primary: { label: "B", href: "/kontakt?emne=demo" } },
  } as never;
  const md = renderMarketingPage(node, copy, false);
  assert.match(md, /Se \[priserne\]\(https:\/\/qlim8\.com\/priser\)\./);
  assert.doesNotMatch(md, /\]\(\/priser\)/);
});

test("an article's richtext link survives in the .md twin as [text](absolute url)", async () => {
  const { renderArticle } = await import("./markdown.ts");
  const md = renderArticle({
    slug: "t", title: "T", description: "d", category: "Compliance", publishedAt: "2026-01-01", readingTime: 1,
    sections: [{ type: "richtext", html: '<p>Læs om <a href="/priser">priserne</a> og <a href="https://eur-lex.europa.eu/x">kilden</a>.</p>' }],
  } as never);
  assert.match(md, /Læs om \[priserne\]\(https:\/\/qlim8\.com\/priser\) og \[kilden\]\(https:\/\/eur-lex\.europa\.eu\/x\)\./);
});
