// The rules the marketing copy shapes depend on (see the header of
// src/content/marketing/types.ts). Every node and hub in the bundled defaults
// is held to them, so a page added later cannot quietly break CMS editing:
// mergeCopy validates override items against defaults[0] and falls back to the
// bundled copy, silently, when a key is missing.
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import "../../scripts/lib/register-ts.mjs";

const { ALL_MARKETING_NODES, MARKETING_HUBS } = await import("../content/marketing/index.ts");
const cta = await import("../content/cta.ts");
const { HOME_COPY, HOME_PAGE_KEY } = await import("../content/copy/home.ts");
const { ICON_NAMES } = await import("../components/ds/iconNames.ts");

type Page = { label: string; copy: Record<string, unknown> };
const pages: Page[] = [
  ...(ALL_MARKETING_NODES as unknown as { pageKey: string; defaults: Record<string, unknown> }[]).map((n) => ({ label: n.pageKey, copy: n.defaults })),
  ...(MARKETING_HUBS as unknown as { pageKey: string; defaults: Record<string, unknown> }[]).map((h) => ({ label: h.pageKey, copy: h.defaults })),
  // The homepage is held to the same rules: it is CMS-merged the same way.
  { label: HOME_PAGE_KEY as string, copy: HOME_COPY as unknown as Record<string, unknown> },
];

/** Every array in `value` with its path. */
function arrays(value: unknown, path: string, out: { path: string; items: unknown[] }[] = []) {
  if (Array.isArray(value)) {
    out.push({ path, items: value });
    value.forEach((v, i) => arrays(v, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) arrays(v, `${path}.${k}`, out);
  }
  return out;
}

// painPoints[].outcome and valueStats[].note are optional keys that predate the
// rule: copyMerge passes an extra key through, so they do no harm. Nothing new may join them.
const LEGACY_OPTIONAL = new Set(["painPoints[].outcome", "valueStats[].note", "pricingTeaser.plans[].badge"]);

test("arrays are homogeneous: every item has the same keys, and defaults[0] has them all", () => {
  for (const { label, copy } of pages) {
    for (const { path, items } of arrays(copy, label)) {
      if (items.length === 0) continue;
      const first = items[0];
      if (first && typeof first === "object" && !Array.isArray(first)) {
        const union = new Set(items.flatMap((i) => Object.keys(i as object)));
        for (const key of union) {
          const generic = path.replace(`${label}.`, "").replace(/\[\d+\]/g, "[]");
          if (LEGACY_OPTIONAL.has(`${generic}[].${key}`)) continue;
          assert.ok(key in (first as object), `${path}: key "${key}" is not in item 0, so a CMS item with it would be mismatched`);
          items.forEach((it, i) => assert.ok(key in (it as object) && (it as Record<string, unknown>)[key] !== undefined, `${path}[${i}] lacks "${key}": array items have no optional keys`));
        }
      } else {
        const kind = typeof first;
        items.forEach((it, i) => assert.equal(typeof it, kind, `${path}[${i}] is a ${typeof it}, item 0 a ${kind}`));
      }
    }
  }
});

test("no arrays of arrays", () => {
  for (const { label, copy } of pages) {
    for (const { path, items } of arrays(copy, label)) {
      items.forEach((it, i) => assert.ok(!Array.isArray(it), `${path}[${i}] is an array inside an array`));
    }
  }
});

test("icon names come from the allow-list, and Icon.tsx maps every name on it", () => {
  const allowed = new Set<string>(ICON_NAMES);
  for (const { label, copy } of pages) {
    const blocks = [copy.trust, copy.recipients] as ({ items: { icon: string }[] } | undefined)[];
    for (const block of blocks) {
      for (const item of block?.items ?? []) assert.ok(allowed.has(item.icon), `${label}: icon "${item.icon}" is not in ICON_NAMES`);
    }
  }
  const icon = readFileSync(new URL("../components/ds/Icon.tsx", import.meta.url), "utf8");
  for (const name of ICON_NAMES) assert.match(icon, new RegExp(`\\b${name}\\b`), `Icon.tsx does not import ${name}`);
});

test("CTA hrefs come from src/content/cta.ts or lead to /priser", () => {
  const allowed = new Set<string>([cta.DEMO_HREF, cta.CONTACT_HREF, cta.PHONE_HREF, cta.LOGIN_URL, cta.FREE_START_CTA.href, cta.CONTACT_EMAIL_HREF]);
  const ok = (href: string) => allowed.has(href) || /^\/priser(?:[/?#]|$)/.test(href);
  const links = (copy: Record<string, any>): { where: string; href: string }[] => [
    { where: "hero.primaryCta", href: copy.hero?.primaryCta?.href },
    { where: "hero.secondaryCta", href: copy.hero?.secondaryCta?.href },
    { where: "closingCta.primary", href: copy.closingCta?.primary?.href },
    { where: "closingCta.secondary", href: copy.closingCta?.secondary?.href },
    { where: "contact.cta", href: copy.contact?.cta?.href },
    { where: "finalCta.primary", href: copy.finalCta?.primary?.href },
    { where: "finalCta.secondary", href: copy.finalCta?.secondary?.href },
    { where: "human.contact.cta", href: copy.human?.contact?.cta?.href },
  ];
  for (const { label, copy } of pages) {
    for (const { where, href } of links(copy)) {
      if (href === undefined) continue;
      assert.ok(ok(href), `${label} ${where}: "${href}" is neither a cta.ts value nor a /priser link`);
    }
  }
});

test("every node has the sections it names, and sectionOrder lists real, unique keys", async () => {
  const valid = new Set([
    "hero", "reassurance", "intro", "reasons", "painPoints", "table", "features", "howItWorks", "checks", "trust",
    "integrations", "options", "valueStats", "body", "depth", "children", "testimonial", "contact", "faq", "related", "closingCta",
  ]);
  for (const n of ALL_MARKETING_NODES as { pageKey: string; sectionOrder?: string[] }[]) {
    if (!n.sectionOrder) continue;
    assert.equal(new Set(n.sectionOrder).size, n.sectionOrder.length, `${n.pageKey}: sectionOrder repeats a key`);
    for (const k of n.sectionOrder) assert.ok(valid.has(k), `${n.pageKey}: "${k}" is not a section key`);
  }
});

test("no em-dash in the bundled marketing copy", () => {
  const text = JSON.stringify(pages.map((p) => p.copy));
  assert.ok(!text.includes(String.fromCharCode(0x2014)), "an em-dash is in the bundled marketing copy");
});
