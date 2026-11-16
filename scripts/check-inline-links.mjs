#!/usr/bin/env node
/**
 * Fails `npm run lint` when an internal link in the bundled copy or the bundled
 * articles would be dead, retired, forbidden, circular or unreadable.
 *
 * Two kinds of inline link exist (CLAUDE.md, "Internal links in copy"):
 *   - `[anchor](/path)` inside a marketing copy string (src/lib/inlineLinks.ts
 *     renders it as a link, the .md twin makes it absolute, JSON-LD strips it);
 *   - `<a href="/path">` inside an article `richtext` block.
 * The rule, shared with the live CMS check, is scripts/lib/inlineLinks.mjs:
 * the target must be a live route, not a retired address, not
 * /integrationer/appelsin, not a signup or checkout URL, not the page itself.
 *
 * Two passes:
 *   1. TEXT: every file under src/content/**, line by line. Catches a dead,
 *      retired or forbidden target and malformed `[text](` syntax anywhere,
 *      including in files that are not a page (cta.ts, navigation.ts, legal).
 *   2. PAGES: the loaded copy of every marketing page, hub, /priser,
 *      /metodologi, the homepage FAQ and every bundled article, field by field.
 *      Catches a link in a field that does not render links (it would print
 *      as text), the same target twice on one page, and a link to the page
 *      itself. Warns (does not fail) on a page with more than 5 inline links
 *      and on a target the page already reaches from a button or a "Relateret"
 *      chip, because the owner's rules say once, and 3 to 5 links.
 *
 * Run directly (`node --experimental-strip-types scripts/check-inline-links.mjs`)
 * or via `npm run lint`. CHECK_ROOT points the TEXT pass at another tree (the
 * tests use it); the PAGES pass then does not run.
 */
import "./lib/register-ts.mjs";
import { readFileSync, statSync, readdirSync, existsSync } from "node:fs";
import { join, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pageRoutes } from "./lib/routes.mjs";
import { findInlineLinks } from "../src/lib/inlineLinks.ts";
import { hasHtmlAnchor, hrefsIn, isInternalHref, splitTarget, syntaxProblems, targetProblems } from "./lib/inlineLinks.mjs";

const REPO = fileURLToPath(new URL("..", import.meta.url));
const ROOT = process.env.CHECK_ROOT ? resolve(process.env.CHECK_ROOT) : REPO;
const PAGES_PASS = !process.env.CHECK_ROOT;

/** Articles that live only in the CMS (no file in src/content), so a link to them is live. */
const CMS_ONLY_ARTICLES = ["har-ipcc-fjernet-det-vaerste-klimascenarie"];

const MAX_INLINE_LINKS = 5;

// ── What is live and what is retired ────────────────────────────────────────
const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../src/content/marketing/index.ts");
const { articles } = await import("../src/content/articles.ts");
const nextConfig = (await import("../next.config.ts")).default;

const routes = new Set([
  ...pageRoutes(REPO),
  ...MARKETING_HUBS.map((h) => h.route),
  ...ALL_MARKETING_NODES.map((n) => `/${n.collection}/${n.slug}`),
  ...articles.map((a) => `/blog/${a.slug}`),
  ...CMS_ONLY_ARTICLES.map((s) => `/blog/${s}`),
]);

const redirectRules = await nextConfig.redirects();
const redirectExact = new Map(redirectRules.filter((r) => !r.source.includes(":")).map((r) => [r.source, r.destination]));
const redirectPrefixes = redirectRules.filter((r) => r.source.includes(":")).map((r) => [r.source.slice(0, r.source.indexOf(":")), r.destination]);
const ctx = {
  isRoute: (p) => routes.has(p),
  redirectTarget: (p) => redirectExact.get(p) ?? redirectPrefixes.find(([pre]) => p.startsWith(pre))?.[1],
};

const failures = [];
const warnings = [];

// ── Pass 1: every file under src/content ────────────────────────────────────
function walk(path, out = []) {
  if (!existsSync(path)) return out;
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path).sort()) walk(join(path, entry), out);
  } else if ([".ts", ".tsx", ".md", ".json"].includes(extname(path))) {
    out.push(path);
  }
  return out;
}
const files = walk(join(ROOT, "src/content")).filter((f) => !/\.test\.tsx?$/.test(f) && !f.endsWith("redirects.json"));
if (files.length === 0) {
  console.error(`✗ check-inline-links: 0 filer fundet under src/content i ${ROOT}`);
  process.exit(1);
}
const lineIndex = []; // [rel, lines[]] for locating a finding from the PAGES pass
for (const file of files) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, "utf8").split("\n");
  lineIndex.push([rel, lines]);
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    for (const { match, why } of syntaxProblems(line)) failures.push(`${at}  "${match}": ${why}`);
    const targets = [
      ...findInlineLinks(line).map((l) => l.href),
      ...hrefsIn(line).map((h) => h.href),
    ];
    for (const href of targets) {
      if (!isInternalHref(href)) continue;
      for (const why of targetProblems(href, ctx)) failures.push(`${at}  ${href} ${why}`);
    }
  });
}

/** "file:line" of the first line holding `needle`, for a finding that knows only a string. */
function locate(needle) {
  const probe = needle.slice(0, 60);
  for (const [rel, lines] of lineIndex) {
    const i = lines.findIndex((l) => l.includes(probe));
    if (i >= 0) return `${rel}:${i + 1}`;
  }
  return "";
}

// ── Pass 2: the loaded pages ────────────────────────────────────────────────
// A field renders inline links only when its component calls InlineText (or
// Paragraphs, which does). Paths are the copy object's, with [n] written as [].
const MARKETING_FIELDS = [
  /^intro\.body$/, /^faq\.items\[\]\.a$/, /^depth\.items\[\]\.body$/, /^features\[\]\.body$/,
  /^howItWorks\.steps\[\]\.body$/, /^reasons\.items\[\]\.body$/, /^trust\.items\[\]\.body$/,
  /^options\.items\[\]\.body$/, /^painPoints\[\]\.(pain|solution|outcome)$/, /^table\.note$/,
  /^differentiators\[\]\.body$/,
];
const FAQ_ONLY = [/^faq\.items\[\]\.a$/];
const METHODOLOGY_FIELDS = [
  /(^|\.)(paragraphs|paragraphsAfter)\[\]$/, /^hero\.intro$/, /\.(intro|pointsIntro|antiCheatNote)$/, /callout\.body$/,
  /sources\[\]\.note$/, /points\[\]\.text$/, /(standards|notDoing)\.items\[\]\.body$/, /contains\[\]$/, /^outro\.body$/,
];

function* strings(value, path = "") {
  if (typeof value === "string") yield [path, value];
  else if (Array.isArray(value)) for (let i = 0; i < value.length; i++) yield* strings(value[i], `${path}[${i}]`);
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) yield* strings(v, path ? `${path}.${k}` : k);
}

/** One page: its links, field by field. `own` are the targets it already reaches from a button or chip. */
function checkPage({ route, label, fields, allowed, own = new Map() }) {
  const seen = new Map(); // target path -> where
  let count = 0;
  for (const [path, text] of fields) {
    const shape = path.replace(/\[\d+\]/g, "[]");
    const found = [...findInlineLinks(text).map((l) => ({ href: l.href, raw: l.raw }))];
    const html = hasHtmlAnchor(text) ? hrefsIn(text).map((h) => ({ href: h.href, raw: `href="${h.href}"` })) : [];
    if (!allowed) {
      // An article body: markdown syntax anywhere prints literally; <a> works only in richtext (handled by the caller).
    } else if ((found.length || html.length) && !allowed.some((re) => re.test(shape))) {
      failures.push(`${label} · ${path}: holds a link, but this field does not render links (it would print as text). ${locate(text) || ""}`.trim());
      continue;
    }
    for (const l of found.concat(html)) {
      if (!isInternalHref(l.href)) continue; // an external source is not an internal link
      count++;
      const { path: target } = splitTarget(l.href);
      const bare = target.length > 1 ? target.replace(/\/+$/, "") : target;
      if (target === route || bare === route) failures.push(`${label} · ${path}: ${l.raw} links the page to itself ${locate(l.raw)}`.trim());
      if (seen.has(bare)) failures.push(`${label} · ${path}: ${bare} is already linked in ${seen.get(bare)}; link each target once ${locate(l.raw)}`.trim());
      else seen.set(bare, path);
      if (own.has(bare)) warnings.push(`${label} · ${path}: ${bare} is already reached from ${own.get(bare)}`);
    }
  }
  if (count > MAX_INLINE_LINKS) warnings.push(`${label}: ${count} inline links (the owner's rule is 3 to 5)`);
}

if (PAGES_PASS) {
  const { getRelated } = await import("../src/content/marketing/index.ts");
  const { PRICING_COPY } = await import("../src/content/copy/pricing.ts");
  const { METHODOLOGY_COPY } = await import("../src/content/copy/methodology.ts");
  const { HOMEPAGE_FAQS } = await import("../src/content/homepage-faqs.ts");

  for (const node of ALL_MARKETING_NODES) {
    const route = `/${node.collection}/${node.slug}`;
    const own = new Map();
    for (const r of getRelated(node)) own.set(r.href, 'the "Relateret" chips');
    const d = node.defaults;
    for (const cta of [d.hero?.primaryCta, d.hero?.secondaryCta, d.closingCta?.primary, d.closingCta?.secondary, d.contact?.cta]) {
      if (cta?.href && isInternalHref(cta.href)) own.set(splitTarget(cta.href).path, "a button");
    }
    checkPage({ route, label: route, fields: strings(d), allowed: MARKETING_FIELDS, own });
  }
  for (const hub of MARKETING_HUBS) {
    checkPage({ route: hub.route, label: hub.route, fields: strings(hub.defaults), allowed: MARKETING_FIELDS });
  }
  checkPage({ route: "/priser", label: "/priser", fields: strings(PRICING_COPY), allowed: FAQ_ONLY });
  checkPage({ route: "/metodologi", label: "/metodologi", fields: strings(METHODOLOGY_COPY), allowed: METHODOLOGY_FIELDS });
  checkPage({ route: "/", label: "/ (homepage FAQ)", fields: strings({ faq: { items: HOMEPAGE_FAQS } }), allowed: FAQ_ONLY });

  // Articles: a link works only as <a href> inside a richtext block.
  for (const a of articles) {
    const route = `/blog/${a.slug}`;
    const own = new Map();
    a.sections.forEach((s) => {
      if (s.type === "cta" && isInternalHref(s.buttonHref)) own.set(splitTarget(s.buttonHref).path, "a button");
    });
    const fields = [];
    a.sections.forEach((s, i) => {
      if (s.type === "richtext") fields.push([`sections[${i}].html`, s.html]);
      else if (s.type === "cta") {
        for (const [k, v] of Object.entries({ heading: s.heading, text: s.text })) {
          if (findInlineLinks(v).length || hasHtmlAnchor(v)) failures.push(`${route} · sections[${i}].${k}: a link here prints as text; use a richtext block`);
        }
        if (isInternalHref(s.buttonHref) && splitTarget(s.buttonHref).path === route) failures.push(`${route} · sections[${i}].buttonHref links the page to itself`);
      } else {
        for (const [path, text] of strings(s, `sections[${i}]`)) {
          if (path.endsWith(".type")) continue;
          if (findInlineLinks(text).length || hasHtmlAnchor(text)) {
            failures.push(`${route} · ${path}: a link in a ${s.type} block prints as text (the renderer does not parse it); put the sentence in a richtext block with <a href>. ${locate(text)}`.trim());
          }
        }
      }
    });
    checkPage({ route, label: route, fields, allowed: [/\.html$/], own });
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
for (const w of warnings) console.warn(`  ! ${w}`);
if (failures.length === 0) {
  console.log(`✓ check-inline-links: ${files.length} filer under src/content${PAGES_PASS ? `, ${ALL_MARKETING_NODES.length + MARKETING_HUBS.length + articles.length + 3} sider` : ""}, ingen døde, udfasede eller forkerte interne links`);
  process.exit(0);
}
console.error(`✗ check-inline-links: ${failures.length} fund.\n`);
for (const f of failures) console.error(`  ${f}`);
console.error(`
Et internt link skal pege på en side, der findes i dag: ikke en udfaset adresse (redirects.json),
ikke /integrationer/appelsin, ikke en tilmeldings- eller checkout-adresse, ikke siden selv.
I marketingtekst skrives det [anker](/sti); i en artikel er det <a href="/sti"> i en richtext-blok.
Reglerne: docs/da/marketing/intern-linking.md (engelsk: docs/en/marketing/internal-linking.md).
`);
process.exit(1);
