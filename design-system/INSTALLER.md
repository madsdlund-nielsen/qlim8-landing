# Sådan bruger du det i Claude Code

1. Pak zip-filen ud, og kopiér mappen til roden af repoet som `design-system/` (hjemmesiden og/eller appen).
2. Kopiér `.claude/skills/qlim8-groen-design/` til `.claude/skills/` i repoet, så Claude Code finder skillen. Tilføj gerne denne linje i repoets CLAUDE.md:
   `Ved UI og tekst: følg skillen qlim8-groen-design og tokens i design-system/tokens.css.`
3. Hjemmesiden (Tailwind 4): `@import "../design-system/tailwind-theme.css";` efter `@import "tailwindcss";`, og kopiér `design-system/fonts/` til `public/fonts/` (eller peg `@font-face` på den nye sti). Skriv aldrig lang tankestreg (—) i tekst.
4. Appen: importér `design-system/tokens.css` og `components.css`. Systemet er kun lyst. Hvis appen har et mørkt tema eller sin egen palette, skal I beslutte, hvilke flader der skifter til de grønne tokens, før noget flyttes. Repoets CLAUDE.md siger, at paletterne i app og hjemmeside holdes ens i hånden.
5. Hold kontrol: kør repoets lint, typecheck og tests efter ændringerne.

Indhold: `tokens.json` (kilde), `tokens.css` og `tailwind-theme.css`, `components.css` (klasser med præfiks `g-`), `komponenter/` (retningslinjer), `previews/` (levende eksempler), `fonts/`, `assets/logo/`, `BRAND.md`.
