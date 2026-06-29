# qlim8-landing — documentation

> Last updated: 2026-06-29 · Owner: qlim8 team

This repository is the **marketing site** (qlim8.com). For the **whole-system architecture**
(the app at app.qlim8.com **and** this landing site) see the diagram suite:

- 📐 [English — system architecture](./en/architecture/system-architecture.md)
- 📐 [Dansk — systemarkitektur](./da/architecture/system-architecture.md)
- [Diagram sources & exports](./diagrams/README.md) — Mermaid `.mmd`, SVG, PNG, Excalidraw

These are **synced copies**. The canonical, always-current architecture docs live in the
[**qlim8-app**](https://github.com/madsdlund-nielsen/qlim8-app/tree/main/docs) repository
(`docs/{en,da}/architecture/`). Last synced: 2026-06-29.

> Note: the newsletter signup bridge was fixed in this change — the landing forms now POST to the
> absolute app URL (`NEXT_PUBLIC_API_URL ?? https://app.qlim8.com`) and reach the app's
> `/api/newsletter/signup` handler. See §5 and §8 of the architecture doc.
