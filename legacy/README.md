# Legacy — gamle sider og komponenter før Fase 1-relaunch

Denne mappe indeholder kopier af de sider og komponenter, der blev erstattet i Fase 1-relaunch-PR'en. Filerne er bevaret som reference og er ekskluderet fra både `tsc --noEmit` (via `tsconfig.json`) og Next.js' app-router-scan (de ligger uden for `/app/` og `/src/`).

De skal **ikke** importeres fra live-koden — git-historikken er den autoritative kilde til ændringerne, og denne mappe er kun en bekvem hurtig-reference.

## Indhold

### Page components (pre-rewrite)
- `page-components/landing.tsx` — gammel forside med ScreenshotCarousel og 6-kort-grid (før 11-sektion-rebuild)
- `page-components/pricing.tsx` — gammel /pricing-side (før /priser-rewrite)
- `page-components/about.tsx` — gammel /about-side (før /om-os-rewrite)
- `page-components/viden.tsx` — gammel /viden-side (før /blog-rewrite)
- `page-components/cookies.tsx` — gammel cookie-side (før verbatim Cookieerklæring-rewrite)

### Komponenter (pre-rewrite eller slettet)
- `components/public/SiteHeader.tsx` — gammel header med 1-CTA-knap og 3-item burger-menu (før 5-item desktop-nav + dual-CTA)
- `components/public/SiteFooter.tsx` — gammel footer med 3-blok layout + viridis-ramosa-link (før 4-kolonners footer)
- `components/public/PublicHeader.tsx` — slettet i Fase 1 (dead code, ingen importerede den)
- `components/public/PublicFooter.tsx` — slettet i Fase 1 (dead code, ingen importerede den)

### Route-stubs (pre-rename)
- `app/pricing/page.tsx` — gammel rute, redirected til `/priser` via `next.config.ts`
- `app/about/page.tsx` — gammel rute, redirected til `/om-os`
- `app/viden/page.tsx` — gammel rute, redirected til `/blog`
- `app/viden/[slug]/page.tsx` — gammel rute, redirected til `/blog/:slug*`

## Hvis du vil slette legacy

Når Fase 1 er stable i produktion og du er fortrolig med de nye sider, kan denne mappe slettes:

```bash
rm -rf legacy/
```

Filerne forbliver bevaret i git-historikken på den commit, hvor de blev erstattet.
