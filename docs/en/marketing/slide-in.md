# The whitepaper slide-in

> Last updated: 2026-10-15

A lead-capture panel on the public pages: the visitor gets the whitepaper "Din første
VSME-rapport" (3 pages, PDF) by email and can ask for the VSME template (an Excel workbook
following the same seven steps) afterwards.

## Where it shows

Mounted once in `app/layout.tsx` (`SlideIn`, a client component reading `usePathname()`).
Hidden on `/kontakt`, `/priser`, `/nyhedsbrev` (and sub-paths), `/privatlivspolitik`,
`/cookies`, `/handelsbetingelser`, `/databehandleraftale`, `/docs`, `/api`, `/md` and any path
ending in `.md`. The list is `isHiddenRoute` in `src/lib/slideIn.ts`.

## When it opens

On the first of: 8 seconds, 50% scroll, the pointer leaving through the top of the window. It
waits while the cookie banner is unanswered and never sits on top of it (z-40 against the
banner's z-50; it also hides while the banner is reopened from the footer). Closing (X, "Ikke
nu", Escape) minimises it to a pill that reopens it. After a visitor has closed it in 3 visits
without signing up, it starts as the pill for 30 days. After a signup it is not shown again.

## What is stored

- sessionStorage `qlim8_slidein_s`: step, entered data, trigger, `leadId`, so a reload continues.
- localStorage `qlim8_slidein`: `signedUp`, `dismissCount`, `lastDismissAt`, written **only when
  the visitor accepted marketing cookies** (`currentConsent()?.marketing`). Without that consent
  nothing persists beyond the session.

All storage access is wrapped in try/catch; the panel works with storage blocked.

## Sending

`POST /api/whitepaper-lead` (same-origin proxy, `app/api/whitepaper-lead/route.ts`) forwards to
qlim8-app `POST /api/public/whitepaper-lead` with `{ name, email, companySize, driver, phone |
null, interests[], triggeredBy, source }`; success is `{ success, message, leadId }`, errors
`{ success: false, message }`, shown in the last step. The follow-up is
`POST /api/whitepaper-lead/<leadId>/vsme` with `{ email }`. A successful lead reports GA4
`generate_lead` with `lead_topic: "whitepaper"` (`trackWhitepaperLead`, statistics consent only;
there is no Google Ads label).

## Files

`src/components/public/SlideIn.tsx` (component), `src/lib/slideIn.ts` (pure logic, tested in
`src/lib/slideIn.test.ts`), `src/content/slideIn.ts` (approved Danish copy and option lists).
The copy is covered by the dash and sales-led guards like the rest of `src/content`.
