# Internal linking: rules and how to write a link

> Last updated: 2026-11-16 · Owner: qlim8 team · Danish twin: [`docs/da/marketing/intern-linking.md`](../../da/marketing/intern-linking.md)

Internal links tell readers and search engines which page answers the next question. They are
added by hand, a few at a time, to pages and articles that already read well. This page holds the
owner's rules and the mechanics for each place a link can live.

## The rules

1. **At most 3 to 5 new internal links per post or page.** Fewer is fine. A post that already has
   links keeps them; the limit is on what is added.
2. **Spread them through the body.** Never in a heading, never in the intro sentence (the lead),
   and never inside a link that is already there.
3. **Never link a post to itself.**
4. **Link each target once per post.** A target the post already reaches counts as present: a
   button (a `cta` block, the hero or closing button on a page) or a chip in "Relateret". Do not
   add a second link to it from the text.
5. **The anchor text must read naturally.** Link words that are already in the sentence. Do not
   rewrite a sentence to fit a keyword in. If no natural anchor exists, leave the link out.
6. **Prioritise targets that rank 4 to 15 in Search Console.** A page already near the first page
   gains most from one more internal link. Pages outside that range are linked only where the
   anchor words name the page exactly.
7. **Show the owner a table first, and wait for the OK.** Before any file or `/admin` text is
   changed, send the table below. Nothing is edited until the owner has answered.

### The table to show first

| Source post | Anchor (exact text) | Target URL | Target's query and position |
|---|---|---|---|
| `/blog/scope-3-smv-guide` | spend-baserede faktorer | `/produkt/platform-og-overblik` | hvad er vsme (inferred), 15.4 |

Where the query comes from: the Search Console **Performance** export (Search results, date range
of at least 3 months, Export to CSV or Sheets). It contains one file for queries and one for
pages, and **they are not paired**: the export does not say which query brought a visitor to which
page. The query in the table is therefore **inferred** from the page's topic, and the column must say
so ("inferred"). Where no query fits, write "no matching query". The position is the page's own
position from the pages file, with its impressions: a position on 2 impressions is thin, say so.

## Where a link lives, and how to write it

First find out **which copy is live**. Copy published in the app's `/admin` wins over this
repository (see "Where the copy lives" in `CLAUDE.md`), and an edit in the repo is then invisible.

```bash
curl -s "https://app.qlim8.com/api/public/cms/marketing/page.home?language=da"
curl -s "https://app.qlim8.com/api/public/cms/articles?language=da"
```

An empty `"copy":{}` means the repository file is what visitors see.

### Marketing pages (industries, product themes, integrations, hubs, /priser, /metodologi)

Write the link inside the plain string, in the copy file:

```ts
a: "Hvad hver pakke indeholder, står på [priserne](/priser).",
```

- The syntax is `[anchor text](/path)`. The path starts with one `/` and is a page on this site.
  `/priser#raadgivere` and `/kontakt?emne=demo` work. Anything else (`https://...`, `priser`,
  `//host`, a missing `)`) is printed as plain text, and the lint fails on it.
- It works in the fields that render links: FAQ answers, depth fold-outs, the intro paragraphs,
  feature, step, reason, trust and option card bodies, pain and solution lines, the table note,
  the hub's differentiators, the /priser FAQ and the /metodologi paragraphs. Titles, summaries,
  questions, hero, closing and CTA fields do not render links, and the lint says so if one is used.
- A blank line is still a paragraph break (`src/lib/paragraphs.ts`); a link sits inside one
  paragraph and never spans a break.
- The link is rendered as the same sage, underlined link as in an article. The `.md` twin of the
  page gets `[anchor](https://qlim8.com/path)`. JSON-LD (FAQPage) and the meta text get the anchor
  words only, with no markup.
- A price sentence in `[[ ... ]]` may hold a link; if the price is unknown the whole sentence
  goes, link included.

### Bundled articles (`src/content/<slug>.ts`)

A `paragraph` block prints text as text, so a link needs a `richtext` block with real HTML:

```ts
{ type: "richtext", html: '<p>Se hvad <a href="/priser">pakkerne</a> koster.</p>' },
```

Split the surrounding paragraphs into `paragraph`, `richtext`, `paragraph` as needed. Use a relative
path starting with `/`. The `.md` twin keeps the link as `[text](https://qlim8.com/path)`.
The lint fails when `[..](..)` or `<a href>` is put in any other block, because it would print.

### Articles published in `/admin`

Open **Blogindlæg**, open the article, select the anchor words in the editor, press the **Link**
button and type the path (`/priser`, a relative path works), then save (a draft) and **publish**.
The editor turns a paragraph with a link into a `richtext` block by itself. The change is live
within five minutes. A bundled article file whose slug is also published in `/admin` is dead:
edit it in `/admin`.

## What the guards check

`npm run lint` runs `scripts/check-inline-links.mjs` over `src/content` and the loaded pages and
articles (rule: `scripts/lib/inlineLinks.mjs`, tests: `scripts/lib/inlineLinks.test.mjs` and
`src/lib/inlineLinks.test.ts`). It fails when a target:

- is not a live route (static page, hub, marketing leaf, bundled article);
- is a retired address from `src/content/marketing/redirects.json` or `next.config.ts` (it works,
  one 301 hop later, and the hop costs the link its weight);
- is `/integrationer/appelsin`;
- is a signup, register or checkout address (the packages API names those; never copy);
- is the `.md` twin or ends in a slash;
- is the page itself, or the same target twice on one page;
- sits in a field that does not render links, or is malformed (`[text](` without a valid path).

It only warns when a page has more than 5 inline links, or links a target it already reaches from a
button or a "Relateret" chip, because rules 1 and 4 are the owner's to judge.

`npm run test:contract` (`scripts/check-cms-copy.mjs`) holds copy published in `/admin` to the same
rules, and fails on a link to a path that is not a route.

A bundled article that lives only in the CMS (no file in `src/content`) cannot be seen by the lint:
add its slug to `CMS_ONLY_ARTICLES` in `scripts/check-inline-links.mjs` before linking to it.
