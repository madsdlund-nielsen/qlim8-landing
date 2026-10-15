// Holds src/index.css to design-system/tokens.json, the design system's source
// of truth. The palette is the same as qlim8-app's Roligt theme block, but the
// two repos share no file, so each has a test like this one: a colour changed
// in one place and not the other fails here instead of shipping a green the
// product does not use.
//
// The name map is in CLAUDE.md under "The palette". In short: a design token
// is the same utility name here, except `color-accent` (sage in the design),
// which is `sage` here because shadcn's `accent` is a hover surface.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (rel: string) => readFileSync(new URL(rel, import.meta.url), "utf8");
const tokens = JSON.parse(read("../../design-system/tokens.json")) as {
  color: { tokens: { name: string; value: string }[] };
  type: {
    fonts: { family: string; file: string; weight: string }[];
    groups: { styles: { name: string; fontSize: string; lineHeight: string; fontWeight: number; letterSpacing?: string }[] }[];
  };
  spacing: { tokens: { name: string; value: string }[] };
  radius: { tokens: { name: string; value: string }[] };
  shadow: { tokens: { name: string; value: string }[] };
  layout: { tokens: { name: string; value: string }[] };
};
const css = read("../index.css").replace(/\/\*[\s\S]*?\*\//g, "");

/** `name: value;` pairs of the first block opened by `selector`. */
function block(selector: string): Map<string, string> {
  const start = css.indexOf(selector + " {");
  assert.ok(start >= 0, `${selector} not found in src/index.css`);
  let depth = 0;
  let i = css.indexOf("{", start);
  const open = i;
  for (; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) break;
  }
  const out = new Map<string, string>();
  for (const m of css.slice(open + 1, i).matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out.set(m[1], m[2].trim());
  return out;
}

const root = block(":root");
const theme = block("@theme inline");

function tokenValue(name: string): string {
  const t = [...tokens.color.tokens, ...tokens.spacing.tokens, ...tokens.radius.tokens, ...tokens.shadow.tokens, ...tokens.layout.tokens].find((x) => x.name === name);
  assert.ok(t, `${name} is not in tokens.json`);
  // {color-sand} style references resolve to the token they name.
  const ref = t.value.match(/^\{(.+)\}$/);
  return ref ? tokenValue(ref[1]) : t.value;
}

/** "146.7 30.3% 17.5%" to "#1F3A2B", by the CSS hsl() algorithm. */
function hslToHex(triple: string): string {
  const [h, s, l] = triple.replace(/%/g, "").split(/\s+/).map(Number);
  const sat = s / 100;
  const light = l / 100;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return "#" + [f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}

// design token -> variable holding it as an HSL triple in :root
const HSL_TOKENS: Record<string, string> = {
  "color-background": "--background",
  "color-foreground": "--foreground",
  "color-card": "--card",
  "color-primary": "--primary",
  "color-primary-foreground": "--primary-foreground",
  "color-muted-foreground": "--muted-foreground",
  "color-border": "--border",
  "color-focus-ring": "--ring",
};
// design token -> hex in @theme inline (design-only names)
const HEX_TOKENS: Record<string, string> = {
  "color-accent": "--color-sage",
  "color-sand": "--color-sand",
  "color-band": "--color-band",
  "color-warm": "--color-warm",
  "color-warm-ink": "--color-warm-ink",
  "color-primary-hover": "--color-primary-hover",
  "color-secondary-hover": "--color-secondary-hover",
  "color-border-strong": "--color-border-strong",
};

test("every colour token of tokens.json is in index.css with the same value", () => {
  for (const [name, variable] of Object.entries(HSL_TOKENS)) {
    const v = root.get(variable);
    assert.ok(v, `${variable} missing from :root`);
    assert.equal(hslToHex(v), tokenValue(name).toUpperCase(), `${name} -> ${variable}`);
  }
  for (const [name, variable] of Object.entries(HEX_TOKENS)) {
    const v = theme.get(variable);
    assert.ok(v, `${variable} missing from @theme inline`);
    assert.equal(v.toUpperCase(), tokenValue(name).toUpperCase(), `${name} -> ${variable}`);
  }
  // Every colour token is mapped: a new one in tokens.json must be added here.
  const mapped = new Set([...Object.keys(HSL_TOKENS), ...Object.keys(HEX_TOKENS)]);
  for (const t of tokens.color.tokens) assert.ok(mapped.has(t.name), `${t.name} is in tokens.json but not mapped in this test`);
});

test("the shadcn variables that carry the design colours are the design colours", () => {
  const expect: Record<string, string> = {
    "--card-foreground": "color-foreground",
    "--popover": "color-card",
    "--popover-foreground": "color-foreground",
    "--secondary": "color-sand",
    "--secondary-foreground": "color-primary",
    "--muted": "color-band",
    "--accent": "color-band", // the hover surface, not the design's accent
    "--accent-foreground": "color-primary",
    "--input": "color-border-strong",
    "--input-decorative": "color-border",
  };
  for (const [variable, name] of Object.entries(expect)) {
    assert.equal(hslToHex(root.get(variable)!), tokenValue(name).toUpperCase(), `${variable} should be ${name}`);
  }
});

test("shadow, spacing, radius and layout tokens match", () => {
  const norm = (s: string) => s.replace(/\s+/g, "").toLowerCase();
  assert.equal(norm(theme.get("--shadow-soft")!), norm(tokenValue("shadow-soft")));
  assert.equal(theme.get("--spacing-section"), tokenValue("space-section"));
  assert.equal(theme.get("--spacing-section-lg"), tokenValue("space-section-lg"));
  assert.equal(theme.get("--radius-md"), tokenValue("radius-md"));
  assert.equal(theme.get("--radius-lg"), tokenValue("radius-lg"));
  assert.equal(theme.get("--container-max"), tokenValue("container-max"));
  assert.equal(root.get("--measure-body"), tokenValue("measure-body"));
  // Cards, panels and big surfaces stay at 12px: nothing rounder than the design.
  for (const k of ["--radius-xl", "--radius-2xl", "--radius-3xl"]) assert.equal(theme.get(k), tokenValue("radius-lg"), k);
  assert.equal(theme.get("--radius-sm"), "6px");
});

test("the type scale is the one in tokens.json", () => {
  for (const group of tokens.type.groups) {
    for (const s of group.styles) {
      const key = s.name.replace(/^type-/, "");
      assert.equal(theme.get(`--text-${key}`), s.fontSize, `${s.name} font size`);
      assert.equal(theme.get(`--text-${key}--line-height`), s.lineHeight, `${s.name} line height`);
      if (s.letterSpacing) assert.equal(theme.get(`--text-${key}--letter-spacing`), s.letterSpacing, `${s.name} letter spacing`);
    }
  }
  // Headings are Fraunces 500 (the base layer), not bold.
  assert.match(css, /h1, h2, h3 \{[^}]*font-weight: 500/);
});

test("the fonts are the files and weights of tokens.json, loaded in app/layout.tsx", () => {
  const layout = read("../../app/layout.tsx");
  for (const f of tokens.type.fonts) {
    assert.ok(layout.includes(`../design-system/${f.file}`), `${f.file} is not loaded in app/layout.tsx`);
    assert.ok(layout.includes(`weight: "${f.weight}"`), `${f.family} weight ${f.weight} not set in app/layout.tsx`);
  }
  assert.match(theme.get("--font-sans")!, /--app-font-sans/);
  assert.match(theme.get("--font-display")!, /--app-font-display/);
});

test("light only: no .dark block and no dark variant", () => {
  assert.ok(!/^\s*\.dark\s*\{/m.test(css), "a .dark block is back in src/index.css");
  assert.ok(!/@custom-variant\s+dark/.test(css));
});
