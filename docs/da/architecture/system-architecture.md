# Systemarkitektur — qlim8 app + landing, fra ende til anden

> Status: stabil · Sidst opdateret: 2026-06-29 · Ejer: qlim8-teamet

> ℹ️ **Synkroniseret kopi.** Denne arkitektur-reference vedligeholdes i **qlim8-app**-repoet
> ([`docs/da/architecture/system-architecture.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/system-architecture.md)),
> som er kilden (system of record). Kopieret hertil så landing-repoet også dokumenterer hele
> systemet. Sidst synkroniseret: 2026-06-29.

## Overblik

Dette dokument er den **visuelle reference** for hele qlim8-produktet: klimaregnskabs-SaaS'en
(`qlim8-app`, **app.qlim8.com**) og marketing-sitet (`qlim8-landing`, **qlim8.com**). Det
supplerer prosaen i [`overview.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/overview.md), [`data-flow.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/data-flow.md) og
[`deployment.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/deployment.md) med et lagdelt sæt diagrammer — fra et landskab i fugleperspektiv
ned til enkelte request-flows.

Diagrammerne er skrevet i [Mermaid](https://mermaid.js.org) og renderes inline på GitHub. Hvert
diagram er også eksporteret til **SVG, PNG og Excalidraw** under
[`../../diagrams/`](../../diagrams/README.md); `.mmd`-filerne dér er den redigerbare kilde
(source of truth). Se mappens README for hvordan eksporterne regenereres.

> **Konvention:** diagram-**labels er på engelsk/teknisk** (rute-navne, service-navne), og ét
> fælles billedsæt deles mellem dette dokument og dets engelske tvilling
> [`../../en/architecture/system-architecture.md`](../../en/architecture/system-architecture.md);
> kun den omkringliggende prosa er oversat.

## Sådan læses dokumentet

Læs oppefra og ned — hvert afsnit zoomer ind:

1. **Systemkontekst** — hvem bruger hvad, og alle eksterne afhængigheder.
2. **App-runtime** — request-livscyklussen inde i den ene server-proces.
3. **Public API & agent-flade** — v1 / MCP / OAuth-trioen (et produkt-differentiator).
4. **Domænemodel** — det ~80-tabellers skema, grupperet efter bounded context.
5. **Landing & app-broer** — hvordan marketing-sitet afleverer til app'en.
6. **Deployment & CI/CD** — hvor det hele kører.
7. **Nøgleflows** — sekvensdiagrammer for de bærende scenarier.
8. **Arkitektur-noter & kendte huller** — det et diagram alene kan vildlede om.

### Signaturforklaring

| Stil | Betydning |
|---|---|
| 🟦 Blå | Intern qlim8-komponent |
| 🟪 Lilla | Menneskelig persona / aktør |
| ⬜ Grå, stiplet kant | Ekstern SaaS / tredjepart |
| 🟩 Grøn cylinder | Datalager |
| 🟧 Orange | Sikkerheds-/auth-grænse |
| 🟥 Rød, stiplet | Kendt hul / forbehold |
| Stiplet kant | Asynkron / proxy'et / out-of-band |

---

## 1. Systemkontekst

Landskabet: begge produkter, alle menneskelige personaer, AI-agent-connectors og alle eksterne
tjenester. Dette ene diagram fungerer også som det overordnede overblik.

```mermaid
flowchart LR
  user["SME user<br/>(carbon accounting)"]
  consult["Third-party consultant<br/>(multi-client portfolio)"]
  admin["Super-admin"]
  dev["Developer<br/>(API key holder)"]
  agent["AI agent connector<br/>(Claude Cowork / ChatGPT)"]
  visitor["Marketing visitor"]

  subgraph qlim8["qlim8 product"]
    app["qlim8 App — app.qlim8.com<br/>React SPA + Express (single process)"]
    landing["qlim8 Landing — qlim8.com<br/>Next.js marketing site"]
    devportal["Developer portal — developers.qlim8.com<br/>static OpenAPI docs"]
  end

  subgraph ext["External services"]
    stripe["Stripe<br/>billing + webhooks"]
    acct["Accounting systems<br/>Dinero/Visma · e-conomic · Xero · Billy"]
    elo["Eloverblik / Energinet<br/>electricity metering"]
    resend["Resend<br/>transactional email"]
    ord["Ordbogen.ai<br/>LLM (invoice extraction)"]
    posthog["PostHog EU<br/>product analytics"]
    s3["Hetzner S3<br/>object storage"]
    refdata["Reference data<br/>ECB FX · Eurostat/DST · CVR registry"]
    ga["Google Analytics 4<br/>(landing only)"]
  end

  visitor --> landing
  user --> app
  consult --> app
  admin --> app
  dev -->|"REST /api/v1 (Bearer)"| app
  agent -->|"MCP + OAuth 2.1"| app

  landing -->|"signup / login CTA, checkout (HTTPS)"| app
  landing -.-> ga

  app --> stripe
  app --> acct
  app --> elo
  app --> resend
  app --> ord
  app --> posthog
  app --> s3
  app --> refdata
  app -. publishes OpenAPI .-> devportal

  classDef persona fill:#ede9fe,stroke:#7c3aed,color:#4c1d95;
  classDef internal fill:#dbeafe,stroke:#2563eb,color:#1e3a8a;
  classDef external fill:#f3f4f6,stroke:#9ca3af,color:#374151,stroke-dasharray:5 3;
  class user,consult,admin,dev,agent,visitor persona;
  class app,landing,devportal internal;
  class stripe,acct,elo,resend,ord,posthog,s3,refdata,ga external;
```

_Eksporter: [SVG](../../diagrams/svg/01-system-context.svg) · [PNG](../../diagrams/png/01-system-context.png) · [Mermaid](../../diagrams/mmd/01-system-context.mmd) · [Excalidraw](../../diagrams/excalidraw/01-system-context.excalidraw)_

De to produkter er **separate deployments**, der kun forbindes over offentlig HTTPS
(signup/login-CTA'er og Stripe-checkout). Alle produktdata ligger i EU (Hetzner Tyskland).

---

## 2. App-runtime / container-arkitektur

Request-livscyklussen inde i app'en. Det vigtigste dette diagram fortæller: **SPA'en, alle fire
API-flader og alle baggrundsworkere kører i én PM2 fork-proces** på port 5000 — der er ingen
separat worker-tier.

```mermaid
flowchart TB
  browser["Browser — React 19 SPA<br/>Wouter · TanStack Query · PostHog JS"]
  posthog["PostHog EU"]

  subgraph nginxbox["nginx (app host) — TLS 443"]
    nginx["location / &rarr; 127.0.0.1:5000<br/>/ingest/ + /ingest/static/ &rarr; PostHog<br/>WebSocket upgrade"]
  end

  subgraph proc["Express process — PM2 fork, single OS process, :5000"]
    direction TB
    subgraph mw["Middleware chain (in order)"]
      direction TB
      cors["CORS"] --> helmet["helmet / CSP / HSTS"] --> noindex["noindex"]
      noindex --> stripehook["Stripe webhook<br/>express.raw — pre-json"]
      stripehook --> json["express.json (+rawBody) · urlencoded"]
      json --> logger["request logger (PII-redacted)"]
      logger --> sess["session + Passport<br/>connect-pg-simple"]
      sess --> tenant["tenant context<br/>+ third-party mutation guard"]
    end

    subgraph surfaces["Route surfaces"]
      legacy["Legacy cookie API<br/>/api/* (~30 groups)"]
      v1["Public API v1<br/>/api/v1/* — Bearer, RFC7807"]
      mcp["MCP server<br/>/api/mcp — Streamable HTTP"]
      oauth["OAuth 2.1 AS<br/>/oauth/* + /.well-known"]
    end

    subgraph svc["Core services"]
      calc["calculationEngine<br/>3-tier, EXIOBASE"]
      ai["aiService / invoiceWorker<br/>Ordbogen LLM"]
      report["report generator<br/>jspdf + Playwright/React"]
      email["emailService (Resend)"]
      supplier["supplierShareService"]
    end

    subgraph jobs["Background jobs (in-process)"]
      pgboss["pg-boss workers<br/>reports.render · webhooks.deliver · uploads.spreadsheet"]
      cron["node-cron<br/>newsletter · tp-expiry · quota · eloverblik · login-prune"]
      pool["Playwright browser pool"]
    end
  end

  pg[("PostgreSQL 16<br/>app schema · pgboss schema · session")]
  s3[("Hetzner S3<br/>PCF docs · reports")]

  browser -->|HTTPS| nginx
  nginx --> cors
  tenant --> surfaces
  surfaces --> svc
  svc --> jobs
  svc --> pg
  jobs --> pg
  report --> s3
  ai --> s3
  nginx -. first-party proxy .-> posthog

  classDef internal fill:#dbeafe,stroke:#2563eb,color:#1e3a8a;
  classDef store fill:#dcfce7,stroke:#16a34a,color:#14532d;
  classDef security fill:#ffedd5,stroke:#ea580c,color:#7c2d12;
  classDef external fill:#f3f4f6,stroke:#9ca3af,color:#374151,stroke-dasharray:5 3;
  class browser,nginx,legacy,v1,mcp,calc,ai,report,email,supplier,pgboss,cron,pool internal;
  class oauth,stripehook,sess,tenant security;
  class pg,s3 store;
  class posthog external;
```

_Eksporter: [SVG](../../diagrams/svg/02-app-runtime.svg) · [PNG](../../diagrams/png/02-app-runtime.png) · [Mermaid](../../diagrams/mmd/02-app-runtime.mmd) · [Excalidraw](../../diagrams/excalidraw/02-app-runtime.excalidraw)_

Noter:
- **Stripe-webhooken er monteret før `express.json()`**, så den rå body er tilgængelig til
  signaturverifikation — den ligger uden for den normale JSON-sti (se `server/index.ts`).
- **nginx proxy'er PostHog first-party** via `/ingest/` (events) og `/ingest/static/`
  (SDK-assets); browseren taler aldrig direkte med PostHog, hvilket gør analytics
  ad-blocker-resistent.
- Baggrundsworkere startes i `httpServer.listen`-callbacket — samme proces, samme hukommelse.

---

## 3. Public API & AI-agent-flade

Et zoom på **v1 + MCP + OAuth**-trioen. qlim8 er sin **egen OAuth 2.1 Identity Provider** — der
er ingen ekstern IdP — hvilket lader AI-connectors (Claude Cowork, ChatGPT) autentificere og
betjene MCP-værktøjerne. v1 og MCP deler samme bearer-auth og rate-limiting-kode.

```mermaid
flowchart LR
  dev["Developer<br/>(API key holder)"]
  connector["AI connector<br/>Claude Cowork / ChatGPT"]

  subgraph as["OAuth 2.1 Authorization Server — qlim8 is its own IdP"]
    disc["/.well-known/<br/>oauth-authorization-server"]
    reg["/oauth/register (DCR)"]
    authz["/oauth/authorize<br/>+ consent screen (PKCE)"]
    token["/oauth/token · /oauth/revoke"]
  end

  subgraph shared["Shared gate"]
    bearer["resolveBearerAuth"]
    rl["rate limit"]
    scopes["scopes: read · write · audit_pack"]
  end

  subgraph v1["Public API v1 — /api/v1/*"]
    v1r["emissions · activities · factors · suppliers<br/>targets · reports(async) · webhooks · quota<br/>data-sources · scenarios · pcf · audit · lineage"]
  end

  subgraph mcp["MCP server — /api/mcp"]
    mcptools["tools: emissions, activities, reports,<br/>suppliers, targets, factors, webhooks,<br/>dataSources, quota, categories, scenarios"]
    mcpsess["in-memory sessions<br/>24h TTL — lost on restart"]
  end

  pg[("PostgreSQL — durable<br/>apiKeys · apiIdempotencyKeys<br/>oauthClients · oauthAccessTokens<br/>oauthRefreshTokens · oauthAuthorizationCodes")]

  dev -->|"Bearer API key"| bearer
  connector -->|discover| disc
  connector --> reg --> authz --> token
  token -->|"opaque tokens (sha256)"| pg
  connector -->|"Bearer token"| bearer
  bearer --> rl --> scopes
  scopes --> v1r
  scopes --> mcptools
  v1r --> pg
  mcptools --> pg
  mcptools -. session state .-> mcpsess

  classDef internal fill:#dbeafe,stroke:#2563eb,color:#1e3a8a;
  classDef store fill:#dcfce7,stroke:#16a34a,color:#14532d;
  classDef security fill:#ffedd5,stroke:#ea580c,color:#7c2d12;
  classDef persona fill:#ede9fe,stroke:#7c3aed,color:#4c1d95;
  class dev,connector persona;
  class disc,reg,authz,token,bearer,rl,scopes security;
  class v1r,mcptools,mcpsess internal;
  class pg store;
```

_Eksporter: [SVG](../../diagrams/svg/03-api-agent-surface.svg) · [PNG](../../diagrams/png/03-api-agent-surface.png) · [Mermaid](../../diagrams/mmd/03-api-agent-surface.mmd) · [Excalidraw](../../diagrams/excalidraw/03-api-agent-surface.excalidraw)_

**OAuth-tokens er varige** (uigennemsigtige sha256-hashes i Postgres); **MCP-sessioner er
flygtige** (i hukommelsen, 24t, geninitialiseres efter en genstart). Forveksl dem ikke.

---

## 4. Domænemodel

Skemaet er ~80 tabeller. Diagram 4a grupperer dem i bounded contexts (hver forretningsrække er
scoped til `tenants`); 4b og 4c viser de to mest værdifulde domæner i detaljer.

### 4a. Bounded contexts

```mermaid
flowchart TB
  tenants[("tenants<br/>root — every row scoped here")]

  subgraph auth["Auth & multi-tenancy"]
    a1["users · departments · sessions<br/>loginHistory · mfaTrustedDevices<br/>mfaRecoveryCodes · passwordResetTokens<br/>emailVerificationCodes · tenantTeamInvitations"]
  end
  subgraph carbon["Carbon accounting core"]
    c1["activities · activitySplits · emissionEntries<br/>emissionEntryCategoryChanges · dataSources<br/>emissionFactors · countryEmissionFactors<br/>emissionCategories · unitConversions<br/>priceIndices · currencyRates · categoryCorrections"]
  end
  subgraph reduce["Reduction & scenarios"]
    r1["reductionGoals · reductionTargets<br/>scenarios · tiltag · activityOntology<br/>auditLog · dismissedRecommendations"]
  end
  subgraph rep["Reporting & compliance"]
    rp1["generatedReports · apiReportJobs<br/>reportAttestations"]
  end
  subgraph tp["Third-party consultant"]
    t1["thirdPartyAccessGrants<br/>ledgerCommentThreads · ledgerComments<br/>ledgerCommentReads"]
  end
  subgraph scope3["Supplier / Scope 3"]
    sc1["supplierConnections"]
  end
  subgraph bill["Billing & quota"]
    b1["invoiceBatches · invoiceQueueItems<br/>quota periods · quota purchases"]
  end
  subgraph pcf["PCF / EPD"]
    p1["pcfDocuments · pcfExtractionDrafts<br/>pcfRecords"]
  end
  subgraph notif["Notifications & audit"]
    n1["notifications · auditEvents · announcements<br/>userAnnouncementSeen · userVersionSeen"]
  end
  subgraph api["Public API & OAuth"]
    ap1["apiKeys · apiIdempotencyKeys<br/>webhooks · webhookDeliveries<br/>oauthClients · oauthAccessTokens<br/>oauthRefreshTokens · oauthAuthorizationCodes"]
  end

  tenants --- auth
  tenants --- carbon
  tenants --- reduce
  tenants --- rep
  tenants --- tp
  tenants --- scope3
  tenants --- bill
  tenants --- pcf
  tenants --- notif
  tenants --- api

  classDef store fill:#dcfce7,stroke:#16a34a,color:#14532d;
  classDef internal fill:#dbeafe,stroke:#2563eb,color:#1e3a8a;
  class tenants store;
  class a1,c1,r1,rp1,t1,sc1,b1,p1,n1,ap1 internal;
```

_Eksporter: [SVG](../../diagrams/svg/04a-data-model-domains.svg) · [PNG](../../diagrams/png/04a-data-model-domains.png) · [Mermaid](../../diagrams/mmd/04a-data-model-domains.mmd) · [Excalidraw](../../diagrams/excalidraw/04a-data-model-domains.excalidraw)_

Se den fulde tabelliste i [`../reference/database-schema.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/reference/database-schema.md).

### 4b. Carbon accounting core (detaljeret)

```mermaid
erDiagram
  tenants ||--o{ dataSources : "owns"
  tenants ||--o{ activities : "owns"
  dataSources ||--o{ activities : "ingests"
  activities ||--o{ activitySplits : "split into"
  activitySplits }o--|| emissionCategories : "categorized as"
  activitySplits ||--o| emissionEntries : "produces"
  emissionCategories ||--o{ emissionFactors : "activity factor"
  emissionCategories ||--o{ countryEmissionFactors : "spend factor (EXIOBASE)"
  activitySplits }o--o| pcfRecords : "matched PCF (tier 1)"
  emissionEntries ||--o{ emissionEntryCategoryChanges : "audit trail"

  tenants {
    uuid id PK
    string subscriptionTier
    string country
  }
  dataSources {
    uuid id PK
    uuid tenantId FK
    string type
    string syncStatus
  }
  activities {
    uuid id PK
    uuid tenantId FK
    uuid dataSourceId FK
    numeric amount
    string currency
  }
  activitySplits {
    uuid id PK
    uuid activityId FK
    uuid categoryId FK
    uuid pcfRecordId FK
    string validationStatus
  }
  emissionEntries {
    uuid id PK
    uuid splitId FK
    string scope
    numeric co2eKg
    string method
  }
  emissionCategories {
    uuid id PK
    string scope
    string exiobaseCode
  }
```

_Eksporter: [SVG](../../diagrams/svg/04b-data-model-carbon-core.svg) · [PNG](../../diagrams/png/04b-data-model-carbon-core.png) · [Mermaid](../../diagrams/mmd/04b-data-model-carbon-core.mmd) · [Excalidraw](../../diagrams/excalidraw/04b-data-model-carbon-core.excalidraw)_

### 4c. Public API & OAuth-lager (detaljeret)

```mermaid
erDiagram
  tenants ||--o{ apiKeys : "tenant keys"
  users ||--o{ apiKeys : "third-party keys"
  tenants ||--o{ webhooks : "subscribes"
  webhooks ||--o{ webhookDeliveries : "delivery attempts"
  apiKeys ||--o{ apiIdempotencyKeys : "scopes replays"
  oauthClients ||--o{ oauthAuthorizationCodes : "issues"
  oauthClients ||--o{ oauthAccessTokens : "issues"
  oauthClients ||--o{ oauthRefreshTokens : "issues"
  oauthAccessTokens ||--o| oauthRefreshTokens : "rotates with"

  apiKeys {
    uuid id PK
    string environment
    string type
    string scopes
  }
  webhooks {
    uuid id PK
    uuid tenantId FK
    string signingSecret
  }
  webhookDeliveries {
    uuid id PK
    uuid webhookId FK
    string status
  }
  oauthClients {
    uuid id PK
    string clientId
    bool dynamicallyRegistered
  }
  oauthAccessTokens {
    uuid id PK
    string tokenHash
    string scope
  }
  oauthRefreshTokens {
    uuid id PK
    string tokenHash
    bool rotated
  }
```

_Eksporter: [SVG](../../diagrams/svg/04c-data-model-public-api.svg) · [PNG](../../diagrams/png/04c-data-model-public-api.png) · [Mermaid](../../diagrams/mmd/04c-data-model-public-api.mmd) · [Excalidraw](../../diagrams/excalidraw/04c-data-model-public-api.excalidraw)_

---

## 5. Landing-arkitektur & app-broer

Hvordan marketing-sitet er bygget, og præcis hvor det afleverer til app'en.

```mermaid
flowchart LR
  visitor["Marketing visitor"]

  subgraph landing["qlim8 Landing — Next.js 15 (standalone)"]
    pages["Pages: / · /priser · /blog + [slug]<br/>/api + /docs/* · /kontakt · /om-os<br/>/metodologi · /karriere · legal"]
    i18n["client-side i18n (8 langs)"]
    content["hardcoded TS articles (no CMS)"]
    ga["Google Analytics 4 (cookie consent)"]
    nlform["Newsletter form"]
    checkout["Pricing checkout"]
    cta["Signup / login CTAs"]
  end

  subgraph app["qlim8 App — app.qlim8.com"]
    appauth["/auth"]
    appcheckout["/api/stripe/checkout-public"]
    appnews["/api/newsletter/signup (handler)"]
  end
  stripe["Stripe Checkout"]

  visitor --> pages
  pages --- i18n
  pages --- content
  pages -.-> ga
  cta -->|"HTTPS anchor"| appauth
  checkout -->|"absolute NEXT_PUBLIC_API_URL"| appcheckout --> stripe
  nlform -->|"absolute NEXT_PUBLIC_API_URL (name + email)"| appnews

  classDef internal fill:#dbeafe,stroke:#2563eb,color:#1e3a8a;
  classDef external fill:#f3f4f6,stroke:#9ca3af,color:#374151,stroke-dasharray:5 3;
  classDef persona fill:#ede9fe,stroke:#7c3aed,color:#4c1d95;
  class visitor persona;
  class pages,i18n,content,checkout,cta,nlform,appauth,appcheckout,appnews internal;
  class ga,stripe external;
```

_Eksporter: [SVG](../../diagrams/svg/06-landing-bridges.svg) · [PNG](../../diagrams/png/06-landing-bridges.png) · [Mermaid](../../diagrams/mmd/06-landing-bridges.mmd) · [Excalidraw](../../diagrams/excalidraw/06-landing-bridges.excalidraw)_

> ✅ **Rettet.** `NewsletterForm.tsx` og `NewsletterSignupDialog.tsx` POST'er nu til den
> **absolutte** app-URL (`NEXT_PUBLIC_API_URL ?? https://app.qlim8.com`) — samme mønster som
> pricing-checkout — så requestet rammer app'ens `/api/newsletter/signup`-handler (CORS tillader
> allerede `qlim8.com`-origin). Den email-only dialog sender nu også det påkrævede `name`.
> Tidligere POST'ede den til en relativ sti, der endte blindt i Next-serveren. Se note 1 i §8.

Mappen `legacy/` i landing-repoet er en backup fra før omskrivningen og er bevidst udeladt.

---

## 6. Deployment & CI/CD-topologi

To **uafhængige** deployments på Hetzner (Tyskland), hver med sin egen nginx, certbot og
release-pipeline. De deler hverken database eller internt netværk — kun offentlig HTTPS + Stripe.

```mermaid
flowchart TB
  subgraph ghapp["GitHub: qlim8-app"]
    appmain["main branch"]
  end
  subgraph ghland["GitHub: qlim8-landing"]
    landmain["main branch"]
    gha["GitHub Actions (deploy.yml)"]
    ghcr["GHCR image<br/>ghcr.io/madsdlund-nielsen/qlim8-landing"]
  end

  subgraph hetzner["Hetzner (Germany)"]
    subgraph appvm["App host — app.qlim8.com (CX22, Ubuntu)"]
      anginx["nginx 80/443 + certbot<br/>Let's Encrypt"]
      pm2["PM2 fork — 1 instance<br/>dist/index.js :5000"]
      pg[("PostgreSQL 16<br/>app + pgboss + session")]
    end
    subgraph landvm["Landing host — qlim8.com (docker compose)"]
      lnginx["nginx container 80/443"]
      lweb["web container<br/>Next standalone :3000"]
      lcertbot["certbot container<br/>renew every 12h"]
    end
  end

  s3[("Hetzner S3<br/>PCF · reports")]
  stripe["Stripe"]
  devportal["developers.qlim8.com<br/>static OpenAPI"]

  appmain -->|"ssh deploy.sh: pull · npm i · playwright · build · db:push · backfills · pm2 restart"| pm2
  anginx --> pm2
  pm2 --> pg
  pm2 --> s3
  appmain -. publish OpenAPI .-> devportal

  landmain --> gha -->|build & push| ghcr
  gha -->|"scp compose+nginx · ssh docker compose pull/up"| landvm
  ghcr -->|pull image| lweb
  lnginx --> lweb

  lweb -. "checkout + CTA (HTTPS)" .-> anginx
  lweb -. checkout .-> stripe
  pm2 --> stripe

  classDef internal fill:#dbeafe,stroke:#2563eb,color:#1e3a8a;
  classDef store fill:#dcfce7,stroke:#16a34a,color:#14532d;
  classDef external fill:#f3f4f6,stroke:#9ca3af,color:#374151,stroke-dasharray:5 3;
  class appmain,landmain,gha,ghcr,anginx,pm2,lnginx,lweb,lcertbot,devportal internal;
  class pg,s3 store;
  class stripe external;
```

_Eksporter: [SVG](../../diagrams/svg/05-deployment.svg) · [PNG](../../diagrams/png/05-deployment.png) · [Mermaid](../../diagrams/mmd/05-deployment.mmd) · [Excalidraw](../../diagrams/excalidraw/05-deployment.excalidraw)_

- **App'en** udrulles via `deploy.sh` over SSH (`git pull → npm install → playwright install →
  npm run build → npm run db:push --force → backfills → pm2 restart`) og publicerer derefter
  OpenAPI-snapshottet til den statiske developer-portal.
- **Landing** udrulles via GitHub Actions: byg et multi-stage Alpine/Node 22 standalone-image →
  push til GHCR → SCP `docker-compose.yml`+`nginx.conf` → SSH `docker compose pull web && up -d`.

---

## 7. Nøgleflows

### 7.1 Faktura-indtag → AI → 3-tier-beregning → emissionspost

```mermaid
sequenceDiagram
  autonumber
  actor U as User (browser)
  participant N as nginx
  participant API as Express upload route
  participant S3 as Hetzner S3
  participant W as invoiceWorker
  participant LLM as Ordbogen LLM
  participant CALC as calculationEngine
  participant DB as PostgreSQL

  U->>N: Upload invoice (PDF/Excel)
  N->>API: POST /api/uploads (cookie auth)
  API->>S3: store document
  API->>DB: create invoiceBatch / queue item
  API-->>U: 202 accepted
  W->>S3: fetch document
  W->>LLM: extract + classify line items
  LLM-->>W: fields + category + confidence
  alt low confidence
    W->>DB: queue for human review
  else confident
    W->>CALC: evaluateCalculationHierarchy()
    Note over CALC: tier 1 PCF/EPD -> tier 2 activity -> tier 3 spend<br/>(EXIOBASE, currency-deflated, country->DK fallback)
    CALC-->>W: co2eKg + method + source
    W->>DB: write activities, activitySplits, emissionEntries
  end
  W->>DB: update categoryCorrections (learned)
  W-->>U: notification (entry ready)
```

_Eksporter: [SVG](../../diagrams/svg/07-seq-invoice.svg) · [PNG](../../diagrams/png/07-seq-invoice.png) · [Mermaid](../../diagrams/mmd/07-seq-invoice.mmd) · [Excalidraw](../../diagrams/excalidraw/07-seq-invoice.excalidraw)_

### 7.2 Pricing-checkout-bro (landing → app → Stripe)

```mermaid
sequenceDiagram
  autonumber
  actor V as Visitor (qlim8.com /priser)
  participant L as Landing (Next.js)
  participant A as App /api/stripe/checkout-public
  participant S as Stripe
  participant WH as App /api/stripe/webhook
  participant DB as PostgreSQL

  V->>L: choose plan, click subscribe
  L->>A: POST checkout-public (absolute app URL, no auth)
  A->>S: create Checkout Session
  S-->>A: session URL
  A-->>L: session URL
  L->>S: redirect browser to Stripe hosted page
  V->>S: complete payment
  S->>WH: webhook event (raw body, pre-json)
  Note over WH: signature verified with STRIPE_WEBHOOK_SECRET<br/>(mounted before express.json)
  WH->>DB: update tenant / subscription
  S-->>V: redirect to app.qlim8.com/auth
```

_Eksporter: [SVG](../../diagrams/svg/08-seq-checkout.svg) · [PNG](../../diagrams/png/08-seq-checkout.png) · [Mermaid](../../diagrams/mmd/08-seq-checkout.mmd) · [Excalidraw](../../diagrams/excalidraw/08-seq-checkout.excalidraw)_

### 7.3 OAuth 2.1 / MCP connector-auth

```mermaid
sequenceDiagram
  autonumber
  participant C as AI connector
  participant AS as qlim8 OAuth AS
  actor U as User
  participant MCP as /api/mcp
  participant DB as PostgreSQL

  C->>AS: GET /.well-known/oauth-authorization-server
  AS-->>C: metadata
  C->>AS: POST /oauth/register (DCR)
  AS-->>C: client_id
  C->>AS: GET /oauth/authorize (PKCE challenge)
  AS->>U: login (Passport) + consent screen
  U-->>AS: approve
  AS-->>C: authorization code
  C->>AS: POST /oauth/token (code + verifier)
  AS->>DB: store opaque access/refresh (sha256)
  AS-->>C: access + refresh tokens
  C->>MCP: initialize (Authorization: Bearer)
  Note over MCP: resolveBearerAuth + shared rate limit<br/>24h in-memory session (lost on restart)
  MCP->>DB: tool calls (scope-checked)
  MCP-->>C: results
```

_Eksporter: [SVG](../../diagrams/svg/09-seq-oauth-mcp.svg) · [PNG](../../diagrams/png/09-seq-oauth-mcp.png) · [Mermaid](../../diagrams/mmd/09-seq-oauth-mcp.mmd) · [Excalidraw](../../diagrams/excalidraw/09-seq-oauth-mcp.excalidraw)_

### 7.4 Asynkront v1-rapportjob (pg-boss)

```mermaid
sequenceDiagram
  autonumber
  participant C as API client / agent
  participant API as /api/v1/reports
  participant Q as pg-boss (v1.reports.render)
  participant R as report worker (in-process)
  participant POOL as Playwright browser pool
  participant S3 as Hetzner S3
  participant WHQ as pg-boss (v1.webhooks.deliver)
  participant EP as Customer webhook endpoint

  C->>API: POST /api/v1/reports (Bearer)
  API->>Q: enqueue job
  API-->>C: 202 + job id
  Q->>R: dispatch
  R->>POOL: render React sections -> PDF/XLSX
  POOL-->>R: rendered file
  R->>S3: store report (reports bucket)
  R->>WHQ: enqueue report.completed
  WHQ->>EP: POST signed webhook (HMAC)
  C->>API: GET /api/v1/reports/{id} (poll)
  API-->>C: completed + download URL
```

_Eksporter: [SVG](../../diagrams/svg/10-seq-report-job.svg) · [PNG](../../diagrams/png/10-seq-report-job.png) · [Mermaid](../../diagrams/mmd/10-seq-report-job.mmd) · [Excalidraw](../../diagrams/excalidraw/10-seq-report-job.excalidraw)_

---

## 8. Arkitektur-noter & kendte huller

1. **Nyhedsbrev-broen — rettet.** Landing-formularerne POST'er nu til den **absolutte** app-URL
   (`NEXT_PUBLIC_API_URL ?? https://app.qlim8.com`) og rammer app'ens `/api/newsletter/signup`-handler;
   den email-only dialog sender nu også det påkrævede `name`. (Tidligere endte en relativ
   `/api/newsletter/signup` blindt i Next-serveren — ingen handler, ingen `/api`-proxy.)
2. **Én proces.** Statisk SPA-servering, alle fire API-flader, alle workere og Playwright-poolen
   lever i én PM2 fork-instans. Der er ingen separat worker-/render-service.
3. **pg-boss er ikke separat infrastruktur.** Den kører i app'ens PostgreSQL under `pgboss`-skemaet.
4. **qlim8 er sin egen OAuth-IdP** (consent-skærm + dynamic client registration + PKCE). Ingen
   Auth0/Google; alle tokens og samtykke ligger i EU-Postgres (GDPR).
5. **First-party PostHog-proxy** via app-nginx `/ingest/` (events) + `/ingest/static/` (assets).
6. **Stripe-webhooken omgår JSON-body-parseren** (rå body, registreret først).
7. **To deployments, kun forbundet via offentlig HTTPS + Stripe.** Ingen delt DB eller internt
   netværk. To nginx-instanser og to certbots (bare-metal vs. dockeriseret). Landing-analytics er
   GA4; app-analytics er PostHog.
8. **Multi-tenancy + konsulent-kontekst.** Tenant-isolation via `resolveTenantContext`;
   konsulenter skifter klient med headeren `X-Client-Tenant-Id`; en `thirdPartyMutationGuard`
   nægter skrivninger for `third_party`-brugere undtagen en allow-list.
9. **MCP-sessioner er flygtige** (i hukommelsen, 24t, tabt ved genstart), mens OAuth-/API-tokens
   er varige i Postgres.
10. **Rapportgenerering er to-sporet:** legacy jspdf-generatorer (standard/CSRD/VSME) og den nyere
    Playwright + React-sektionsrenderer (via browser-poolen).
11. **3-tier-beregningens fallback:** PCF/EPD (leverandørspecifik) → aktivitetsfaktor →
    spend-baseret EXIOBASE, med country→DK-faktor-fallback og inflationskorrektion (HICP/CPI).

## Relaterede dokumenter

- [`architecture/overview.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/overview.md)
- [`architecture/data-flow.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/data-flow.md)
- [`architecture/deployment.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/deployment.md)
- [`architecture/auth-and-tenancy.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/auth-and-tenancy.md)
- [`architecture/security-and-gdpr.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/architecture/security-and-gdpr.md)
- [`reference/database-schema.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/reference/database-schema.md)
- [Diagram-kilder & eksporter](../../diagrams/README.md)
