# qlim8-landing: documentation

> Last updated: 2026-10-15 · Owner: qlim8 team

This repository is the **marketing site** (qlim8.com). For the **whole-system architecture**
(the app at app.qlim8.com **and** this landing site) see the diagram suite:

- 📐 [English: system architecture](./en/architecture/system-architecture.md)
- 📐 [Dansk: systemarkitektur](./da/architecture/system-architecture.md)
- [Diagram sources & exports](./diagrams/README.md): Mermaid `.mmd`, SVG, PNG, Excalidraw

## SEO

- 🔎 [English: sitemap dates, structured data and what crawlers see](./en/seo/structured-data-and-sitemap.md) ·
  🇩🇰 [Dansk](./da/seo/structured-data-and-sitemap.md)

  The three rules the site holds itself to (a real `lastmod` per URL, one
  `@id`-linked schema graph with no `offers` or prices, content in the HTML)
  and the scripts that enforce each: `scripts/content-dates.mjs`,
  `scripts/check-schema.mjs`, `scripts/check-cms-copy.mjs`. Since the
  October 2026 restructure it also covers the 43-URL sitemap and the redirects.

- 🗺️ [English: information architecture](./en/seo/information-architecture.md) ·
  🇩🇰 [Dansk: informationsarkitektur](./da/seo/informationsarkitektur.md)

  The page tree (hubs, the four industry pages, the six product theme pages, the
  eight integration pages), which pages are written green and which blue, the
  full table of the 30 redirects, and which search terms each merged page took
  over. How to retire a page is in `CLAUDE.md`.

## Marketing

- 📷 [English: photo list](./en/marketing/photo-list.md) ·
  🇩🇰 [Dansk: fotoliste](./da/marketing/fotoliste.md)

  The brief for the photos the site wants (style, format, consent, one entry
  per page and CMS field). The Danish file is the one handed to the
  photographer. Photos are uploaded in the app's `/admin`, never committed here.

## Operations

- 📋 [English: post-mortem, 2026-07-28](./en/operations/postmortem-2026-07-28.md) ·
  🇩🇰 [Dansk](./da/operations/postmortem-2026-07-28.md)

  This site served an **expired TLS certificate for 16h 50m** on 2026-07-27/28.
  Root cause: the stored certbot renewal config specified
  `authenticator = standalone`, which cannot work here because the nginx
  container holds port 80, so every renewal had been failing silently since
  June. A second, independent bug meant nginx never reloaded a renewed
  certificate either; that one is fixed by the 6h reload loop in
  `docker-compose.yml` (#26).

  The same day, `app.qlim8.com` was down for 6h 08m for an unrelated reason. Both
  are covered in the post-mortem.

These are **synced copies**. The canonical, always-current architecture docs live in the
[**qlim8-app**](https://github.com/madsdlund-nielsen/qlim8-app/tree/main/docs) repository
(`docs/{en,da}/architecture/`). Last synced: 2026-06-29; the sales-led sections (§1, §5, §6,
§7.2, §8) were updated here on 2026-09-25, ahead of the qlim8-app copy.

> Note (2026-10-15): the site is self-serve when the app's package catalog sells something by
> itself, and sales-led (no price, every main button books a demo) while it does not or the
> packages API cannot be reached. The landing site never calls a checkout: its bridges to the app
> are the same-origin proxies `/api/contact` → `/api/public/contact` and `/api/newsletter/signup`
> → `/api/newsletter/signup`, the CMS reads, the packages API, the signup URL the API names, and
> the "Log ind" link for existing customers. Since October 2026 the pages also read optional copy
> blocks, fill price tokens from the packages API and answer 301 for retired addresses; see §5
> of the architecture doc, and "Self-serve" and "Site structure and redirects" in `CLAUDE.md`.
