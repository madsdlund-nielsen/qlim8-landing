---
name: qlim8-groen-design
description: Brug når du bygger eller ændrer UI, sider, komponenter eller tekst til qlim8 i det grønne, rolige designsprog (varm råhvid, skovgrøn, salvie, sand, Fraunces og Source Sans 3). Gælder hjemmeside og app-flader, der skal tale til et trygt, grønt beslutningssystem.
---

# qlim8 grønt designsystem

Læs først `design-system/BRAND.md` (tone, farver, typografi, billeder, ikoner, logo), derefter `design-system/komponenter/<Navn>.md` for den komponent du bygger. Se `design-system/previews/<Navn>.html` for et levende eksempel.

## Regler
- Brug kun tokens fra `design-system/tokens.css` (eller `tailwind-theme.css` i Tailwind 4). Hardcode aldrig hex-værdier, og brug aldrig ren sort.
- Kun lyst tema: ingen kold blå, ingen neon, ingen mørk tech-baggrund.
- Overskrifter i Fraunces (vægt 500), brødtekst i Source Sans 3. Hold brødtekst på højst `measure-body` (68ch). Ingen versaler på hele sætninger.
- Hjørner: `radius-md` (8px) på knapper og felter, `radius-lg` (12px) på kort. Eneste skygge er `shadow-soft`.
- Sektioner har `space-section` (80px) eller `space-section-lg` (100px) lodret luft. Undgå tætpakkede dashboards på forsiden.
- `color-warm` (terracotta) er aldrig tekst. Brug `color-warm-ink` til varm tekst. Kanter, der markerer en styreflade, bruger `color-border-strong`.
- Hoved-CTA'en har altid en tryghedslinje under sig (`TrustLine`). Knaptekst er en venlig invitation, aldrig "Prøv nu!" eller "Køb i dag".
- Skriv dansk, i du-form og uden emoji. Aldrig lang tankestreg (—); kort tankestreg med mellemrum (–) kun, hvor grammatikken kalder på den. Ellers komma, kolon eller punktum.
- Linjeikoner med afrundede ender (Lucide eller Phosphor) i `color-accent`.
- Logoer ligger i `design-system/assets/logo/`. Genfarv dem aldrig.

## Pris og tilmelding
Priser og tilmeldings-links kommer fra appens katalog og ligger ikke i tekst eller komponenter her. Følg repoets egne regler (CLAUDE.md) for dem.
