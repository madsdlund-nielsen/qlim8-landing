// The .md twin of the new copy blocks (src/lib/markdown.ts): reasons as a
// numbered list, the table as GFM, checks and trust as bullets, options as H3 +
// bullets, depth as "### summary" + body, contact as plain lines, reassurance
// as a paragraph; sectionOrder decides the order; the old blocks are unchanged.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import "../../scripts/lib/register-ts.mjs";

const { renderMarketingPage, renderMarketingHub } = await import("./markdown.ts");

const node = {
  collection: "kundetyper",
  slug: "proevebranche",
  pageKey: "page.kundetyper.proevebranche",
  title: "Prøvebranche",
  navLabel: "Prøvebranche",
  blurb: "b",
  seoTitle: "Klimaregnskab for prøvebranchen",
  seoDescription: "d",
  defaults: {},
} as never;

const cta = { label: "Book en uformel gennemgang (15 min)", href: "/kontakt?emne=demo" };
const full = {
  hero: { title: "Overskrift", subtitle: "Undertekst", primaryCta: cta },
  reassurance: { title: "Det er ikke svært", body: "Du kommer trygt i gang." },
  intro: { heading: "Intro", body: "Introtekst", bullets: ["ét", "to"] },
  reasons: { title: "Hvorfor nu", intro: "Tre grunde.", items: [{ title: "Banken", body: "spørger" }, { title: "Kunden", body: "kræver" }] },
  painPoints: [{ pain: "Regneark", solution: "Automatik", outcome: "Spar tid" }],
  table: {
    title: "Scope-tabel",
    intro: "Sådan ser det ud.",
    headers: { a: "Scope", b: "Kilde", c: "Eksempel" },
    rows: [{ a: "1", b: "Diesel | benzin", c: "Varevogn" }, { a: "2", b: "El", c: "Værksted" }],
    note: "Alle tal kan spores.",
  },
  features: [{ title: "Funktion", body: "Beskrivelse" }],
  howItWorks: { title: "Fra bilag til tal", steps: [{ title: "Forbind", body: "Dit regnskab" }] },
  checks: { title: "S og G i ESG", intro: "Kort.", items: [{ title: "Sikkerhed", body: "På arbejdspladsen" }] },
  trust: { title: "Tryghed", items: [{ icon: "ShieldCheck", title: "Danske data", body: "Ingen gæt" }] },
  integrations: { title: "Vi bygger på det, du har", footnote: "Logoer tilhører deres ejere" },
  options: { title: "To modeller", intro: "Vælg.", items: [{ title: "Selv", body: "Du styrer", bullets: ["a", "b"] }] },
  valueStats: [{ value: "10 min", label: "om måneden", note: "i snit" }],
  depth: { title: "Gå i dybden", items: [{ summary: "Metoden", body: "Faktorerne kommer fra Klimakompasset." }] },
  testimonial: { quote: "Det virker.", name: "Kari", role: "Mester" },
  contact: {
    title: "Vil du snakke?",
    body: "Jeg hjælper gerne.",
    personName: "Mads",
    personRole: "Stifter",
    phoneLine: "Ring på +45 93 90 13 84",
    emailLine: "Skriv til kontakt@qlim8.com",
    cta,
  },
  faq: { title: "Spørgsmål", items: [{ q: "Hvad?", a: "Det her." }] },
  closingCta: { title: "Kom i gang", description: "Ring eller skriv.", primary: cta },
} as never;

test("every new block has a plain markdown rendering", () => {
  const md = renderMarketingPage(node, full);
  assert.match(md, /## Det er ikke svært\n\nDu kommer trygt i gang\./);
  assert.match(md, /## Hvorfor nu\n\nTre grunde\.\n\n1\. \*\*Banken\*\*: spørger\n2\. \*\*Kunden\*\*: kræver/);
  assert.match(md, /\| Scope \| Kilde \| Eksempel \|\n\| --- \| --- \| --- \|\n\| 1 \| Diesel \\\| benzin \| Varevogn \|\n\| 2 \| El \| Værksted \|\n\nAlle tal kan spores\./);
  assert.match(md, /## S og G i ESG\n\nKort\.\n\n- \*\*Sikkerhed\*\*: På arbejdspladsen/);
  assert.match(md, /## Tryghed\n\n- \*\*Danske data\*\*: Ingen gæt/);
  assert.match(md, /### Selv\n\nDu styrer\n\n- a\n- b/);
  assert.match(md, /### Metoden\n\nFaktorerne kommer fra Klimakompasset\./);
  assert.match(md, /## Vil du snakke\?\n\nJeg hjælper gerne\.\n\nMads, Stifter {2}\nRing på \+45 93 90 13 84 {2}\nSkriv til kontakt@qlim8\.com\n\n\[Book en uformel gennemgang \(15 min\)\]\(https:\/\/qlim8\.com\/kontakt\?emne=demo\)/);
  assert.match(md, /> Det virker\.\n\nKari, Mester/);
  assert.match(md, /## Vi bygger på det, du har\n\nSystemer: .*Dinero.*\n\nLogoer tilhører deres ejere/);
});

test("the default order is hero, reassurance, intro ... faq, closing; the old blocks read as before", () => {
  const md = renderMarketingPage(node, full);
  const at = (s: string) => md.indexOf(s);
  const order = ["# Overskrift", "## Det er ikke svært", "## Intro", "## Hvorfor nu", "## Udfordringer og løsninger", "## Scope-tabel",
    "## Det får du", "## Fra bilag til tal", "## S og G i ESG", "## Tryghed", "## Vi bygger på det, du har", "## To modeller",
    "## Nøgletal", "## Gå i dybden", "> Det virker.", "## Vil du snakke?", "## Spørgsmål", "## Kom i gang"];
  order.forEach((h, i) => assert.ok(at(h) >= 0, `${h} missing`));
  for (let i = 1; i < order.length; i++) assert.ok(at(order[i - 1]) < at(order[i]), `${order[i - 1]} should come before ${order[i]}`);
  assert.match(md, /_Spar tid_/);
  assert.match(md, /- \*\*10 min\*\*: om måneden i snit/);
});

test("sectionOrder, when a node has it, decides the order; a page with only the old blocks still renders", () => {
  const reordered = renderMarketingPage({ ...(node as object), sectionOrder: ["hero", "faq", "reasons", "closingCta"] } as never, full);
  assert.ok(reordered.indexOf("## Spørgsmål") < reordered.indexOf("## Hvorfor nu"));
  assert.ok(!reordered.includes("## Tryghed"), "a block outside sectionOrder is not rendered");
  const old = renderMarketingPage(node, {
    hero: { title: "T", subtitle: "S", primaryCta: cta },
    intro: { heading: "H", body: "B" },
    painPoints: [],
    features: [{ title: "F", body: "G" }],
    valueStats: [],
    faq: { title: "Q", items: [] },
    closingCta: { title: "C", description: "D", primary: cta },
  } as never);
  assert.match(old, /# T\n\nS\n\n## H\n\nB\n\n## Det får du\n\n### F\n\nG\n\n## C\n\nD\n$/);
});

test("a /priser button in the contact block books a demo while nothing is sold by itself", () => {
  const withPriser = { ...(full as object), contact: { ...(full as { contact: object }).contact, cta: { label: "Se pakker", href: "/priser" } } } as never;
  assert.match(renderMarketingPage(node, withPriser, false), /\[Book demo\]\(https:\/\/qlim8\.com\/kontakt\?emne=demo\)/);
  assert.match(renderMarketingPage(node, withPriser, true), /\[Se pakker\]\(https:\/\/qlim8\.com\/priser\)/);
});

test("a hub renders its trust and contact blocks", () => {
  const hub = { collection: "kundetyper", route: "/kundetyper", seoTitle: "t", seoDescription: "d" } as never;
  const md = renderMarketingHub(hub, {
    hero: { title: "Hub", subtitle: "Sub", primaryCta: cta },
    intro: { heading: "i", body: "b" },
    cardsHeading: "c",
    differentiators: [],
    trust: (full as { trust: object }).trust,
    contact: (full as { contact: object }).contact,
    closingCta: { title: "x", description: "y", primary: cta },
  } as never, []);
  assert.match(md, /## Tryghed/);
  assert.match(md, /## Vil du snakke\?/);
});
