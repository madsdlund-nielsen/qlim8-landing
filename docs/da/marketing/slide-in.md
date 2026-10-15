# Whitepaper-slide-in

> Sidst opdateret: 2026-10-15

Et leadpanel på de offentlige sider: den besøgende får whitepaperet "Din første VSME-rapport"
(3 sider, PDF) på mail og kan bagefter bede om VSME-skabelonen (en Excel-fil, der følger de samme
syv trin).

## Hvor den vises

Monteret én gang i `app/layout.tsx` (`SlideIn`, en klientkomponent, der læser `usePathname()`).
Skjult på `/kontakt`, `/priser`, `/nyhedsbrev` (og undersider), `/privatlivspolitik`, `/cookies`,
`/handelsbetingelser`, `/databehandleraftale`, `/docs`, `/api`, `/md` og alle stier, der ender på
`.md`. Listen er `isHiddenRoute` i `src/lib/slideIn.ts`.

## Ingen trin-tæller

Panelet viser aldrig, hvor mange trin der er, eller hvilket den besøgende er på: intet "Trin 2 af
4" og ingen fremskridtsmærker. Ser man arbejdet forude, starter man ikke. Har man udfyldt det
første trin, fortsætter man gerne, og frafaldet kommer først omkring trin 5-7. Ejerens regel,
oktober 2026.

## Hvornår den åbner

Ved den første af: 8 sekunder, 50 % scroll, eller at musen forlader vinduet i toppen. Den venter,
mens cookiebanneret ikke er besvaret, og ligger aldrig oven på det (z-40 mod bannerets z-50; den
skjules også, mens banneret åbnes igen fra sidefoden). Lukker man den (X, "Ikke nu", Escape),
bliver den til en pille, som åbner den igen. Har en besøgende lukket den i 3 besøg uden at tilmelde
sig, starter den som pille i 30 dage. Efter en tilmelding vises den ikke igen.

## Hvad der gemmes

- sessionStorage `qlim8_slidein_s`: trin, indtastede data, udløser og `leadId`, så en genindlæsning
  fortsætter.
- localStorage `qlim8_slidein`: `signedUp`, `dismissCount` og `lastDismissAt`, skrevet **kun når
  den besøgende har accepteret marketingcookies** (`currentConsent()?.marketing`). Uden det gemmes
  intet ud over sessionen.

Al adgang til lager er pakket i try/catch; panelet virker, også når lager er blokeret.

## Afsendelse

`POST /api/whitepaper-lead` (same-origin proxy, `app/api/whitepaper-lead/route.ts`) sender videre
til qlim8-apps `POST /api/public/whitepaper-lead` med `{ name, email, companySize, driver, phone |
null, interests[], triggeredBy, source }`. Svaret er `{ success, message, leadId }`, fejl er
`{ success: false, message }` og vises på sidste trin. Opfølgningen er
`POST /api/whitepaper-lead/<leadId>/vsme` med `{ email }`. En gennemført tilmelding rapporterer GA4
`generate_lead` med `lead_topic: "whitepaper"` (`trackWhitepaperLead`, kun med statistiksamtykke;
der er ingen Google Ads-label).

## Filer

`src/components/public/SlideIn.tsx` (komponent), `src/lib/slideIn.ts` (ren logik, testet i
`src/lib/slideIn.test.ts`), `src/content/slideIn.ts` (godkendt dansk tekst og valgmuligheder).
Teksten er dækket af tankestreg- og sales-led-vagterne som resten af `src/content`.
