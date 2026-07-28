# Post mortem — 2026-07-28: app-nedbrud og udløbet certifikat på marketing-sitet

> Status: endelig · Dato: 2026-07-28 · Ejer: qlim8-team · Alvorlighed: SEV-1 (begge sites)
>
> **Synkroniseret kopi.** Den kanoniske version ligger i [qlim8-app](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/operations/postmortem-2026-07-28.md) (`docs/da/operations/`). Sidst synkroniseret: 2026-07-28.
>
> Hændelse B nedenfor tilhører dette repository: certbot-fornyelsen der havde
> fejlet siden juni, og den manglende nginx-reload rettet i #26.

Blameless post mortem. Alle tidspunkter i UTC. Hver påstand er markeret
**verificeret** (observeret i en log, et kommando-output eller en ekstern probe)
eller **udledt**.

## Resumé

To **urelaterede** produktionsfejl overlappede 2026-07-28 på to forskellige
servere. De deler ingen årsag; undersøgelsen af den ene afslørede den anden.

| | Hændelse A — app | Hændelse B — marketing |
|---|---|---|
| Host | `app.qlim8.com` (178.104.200.17) | `qlim8.com` (91.107.239.106) |
| Symptom | Connection refused på :80 og :443 | `NET::ERR_CERT_DATE_INVALID` |
| Varighed | **6t 08m** (06:01:20 → 12:09:46) | **16t 50m** (27. jul 20:16 → 13:07) |
| Opdaget af | Skemalagt health check, 2t 04m for sent | Et menneske, ~12t for sent. Ingen overvågning fandtes |
| Rodårsag | nginx nægtede at starte efter en fejlet DNS-opslag ved config-load | forkert konfigureret certbot-fornyelse (`authenticator = standalone`) |

Det vigtigste fund er ikke nogen af de to rodårsager. Det er, at **nginx fejlede
én gang, og intet forsøgte igen**. Et ti-sekunders udfald blev til seks timers
nedbrud alene på grund af en manglende restart-politik.

## Konsekvens

- **app.qlim8.com**: fuldstændig utilgængelig i 6t 08m. Alle brugere, alle
  endpoints. Selve Node-applikationen var rask hele vejen igennem (`pm2` online,
  `localhost:5000` svarede 200) — kun reverse proxy'en var nede. *Verificeret.*
- **qlim8.com / www.qlim8.com**: serverede et udløbet certifikat i 16t 50m. Hver
  besøgende fik en fuldskærms sikkerhedsadvarsel. Sitet bag ved kørte normalt.
  *Verificeret.*
- Intet datatab. Ingen databasepåvirkning. Ingen fejlede deploys ud over
  post-deploy-tjekket, der korrekt rapporterede nedbruddet. *Verificeret.*

## Tidslinje

| Tid (UTC) | Hændelse |
|---|---|
| 28. apr, 20:16 | Landing-certifikat udstedt. Det sidste sitet nogensinde fik. |
| ~27. jun | Landing-fornyelsesforsøg begynder og fejler, lydløst, to gange dagligt derefter. certbot fornyer ved 30 dage tilbage, hvilket for et certifikat der udløber 27. jul er sidst i juni. Præcis første fejl blev ikke fastslået — diagnostikken hentede kun de sidste 80 log-linjer. *Udledt ud fra fornyelsesplanen; selve de gentagne fejl er verificerede.* |
| 15. jun, 15:26 | App-certifikat udstedt, gyldigt til 13. sep. Aldrig en faktor. |
| **27. jul, 20:16:34** | **Landing-certifikatet udløber. Hændelse B starter.** |
| 28. jul, 05:33:56 | Sidste grønne synthetic health check (kørsel #834). |
| **28. jul, 06:01:20** | **nginx genstartes på app-hosten; `ExecStartPre` config-test fejler med `[emerg] host not found in upstream "eu-assets.i.posthog.com"`. nginx starter ikke. Hændelse A starter.** |
| 06:33–06:36 | CI-kørsel #375 deployer PR #222. Deploy rapporterer **success** — build, migrationer og `pm2 … online` alle fine — mens sitet er utilgængeligt. |
| 08:05:40 | Health check-kørsel #835 fejler (`curl: (7)`). Første automatiske opdagelse, 2t 04m efter start. |
| 08:09 | Urelateret Hetzner-hændelse ("Cloud Resource Creation Delay") åbner. Blindspor — se nedenfor. |
| ~08:20 | Undersøgelsen begynder. Landing-certifikatets udløb opdages tilfældigt. |
| 12:04:05 | Read-only SSH-diagnostik kører på app-hosten. **Rodårsag A identificeret.** |
| 12:04:28 | Read-only SSH-diagnostik kører på landing-hosten. **Rodårsag B identificeret.** |
| **12:09:46** | **`systemctl start nginx` — app.qlim8.com genoprettet.** |
| 13:06:16 | Landing-certifikat genudstedt via `certonly --webroot`; renewal-config omskrevet til `authenticator = webroot`. |
| **13:07:01** | **qlim8.com genoprettet.** |
| 13:08:39 | App-host hærdet: `Restart=on-failure` + `resolver` med variable upstreams. |
| 13:26:47 | CI-kørsel #385 helt grøn, inkl. post-deploy-tjekket der havde været rødt hele dagen. |

## Rodårsag — hændelse A (app-nedbrud)

nginx slår et bogstaveligt hostnavn i `proxy_pass` op **én gang, ved config-load**,
og nægter at starte hvis opslaget fejler. Konfigurationen proxyede PostHog-analytics:

```nginx
proxy_pass https://eu-assets.i.posthog.com/static/;
```

06:01:20 faldt en rutinemæssig genstart sammen med et forbigående DNS-svigt:

```
[emerg] host not found in upstream "eu-assets.i.posthog.com"
        in /etc/nginx/sites-enabled/qlim8:11
nginx: configuration file /etc/nginx/nginx.conf test failed
```

*Verificeret* — citeret fra hostens journal.

Tre forhold gjorde det til seks timers nedbrud:

1. **Ingen restart-politik.** nginx fejlede én gang, og systemd forsøgte aldrig
   igen. Dette er den dominerende faktor: med `Restart=on-failure` ville
   nedbruddet have varet ca. ti sekunder, uanset årsagen. *Verificeret* — ingen
   `Restart=` var sat.
2. **`:80` og `:443` deler én config-fil.** En fejl hvor som helst i den fil
   lukker begge porte, hvilket er grunden til at hosten så helt død ud frem for
   blot degraderet. *Verificeret.*
3. **Et analytics-CDN er en hård startafhængighed.** En tredjepart, som sitet
   ikke behøver for at servere sine egne sider, kunne alligevel forhindre det i
   at starte.

`nginx -t` bestod, da vi kiggede — DNS var kommet sig timer forinden. Servicen
havde blot ingen mekanisme til at opdage det. *Verificeret.*

### Hvad der IKKE var årsagen

- **Certifikater.** `app.qlim8.com` var gyldigt til 13. sep. Dette blev antaget
  to gange under håndteringen og var forkert begge gange. *Verificeret.*
- **Deployet 06:33.** Det gennemførtes rent 06:36:29 med appen online. Et dårligt
  deploy giver desuden 502/503 fra nginx, ikke connection-refused. *Verificeret.*
- **Hetzner-hændelsen.** Den åbnede 08:09 — *efter* det første fejlede tjek
  08:05 — handlede om at oprette og ændre cloud-ressourcer, ikke om kørende
  servere, og den anden Hetzner-maskine i samme datacenter kørte hele vejen
  igennem. *Verificeret.*

## Rodårsag — hændelse B (udløbet marketing-certifikat)

Den gemte renewal-konfiguration angav den forkerte challenge-metode:

```
authenticator = standalone
```

Standalone binder port 80 for at besvare ACME-udfordringen. Den dockeriserede
nginx-container ejer port 80, så certbot kunne aldrig binde den, og hver eneste
fornyelse fejlede:

```
Failed to renew certificate qlim8.com with error: Some challenges have failed.
ls: /var/www/certbot/.well-known/acme-challenge/: No such file or directory
```

*Verificeret* — citeret fra certbot-containerens log og en directory-listning.

Det er en rest fra en migrering. Sitet blev oprindeligt sat op med en
host-installeret certbot med `--standalone`, hvilket virkede før nginx flyttede
ind i Docker. Flytningen skete; den gemte indstilling fulgte ikke med. *Udledt,
stærkt understøttet* — `scripts/setup-server.sh` indeholdt stadig den
standalone-provisionering og et `/etc/cron.d/certbot-renew`-job ved hændelsens
begyndelse.

### En anden, uafhængig fejl i samme kæde

Selv en vellykket fornyelse ville ikke være nået frem til brugerne: nginx læser
sit certifikat **én gang ved opstart**, og compose-stacken havde intet til at
genindlæse det. Dette blev rettet tidligere samme dag (qlim8-landing#26, en
6-timers `nginx -s reload`-løkke) — og rettelsen blev dengang antaget at *være*
løsningen.

Det var den ikke. Beviset: samme PR's eget deploy genskabte nginx-containeren,
som indlæser certifikater fra volumet forfra, og det udløbne certifikat blev
**stadig** serveret bagefter. Netop den observation flyttede undersøgelsen fra
levering til fornyelse. *Verificeret.*

Begge fejl var reelle, og begge skulle rettes.

## Medvirkende forhold

- **Nul overvågning af marketing-sitet.** Det var ikke dækket af noget tjek. Et
  fuldt brugersynligt nedbrud løb ~12t indtil et menneske tilfældigt opdagede det.
- **Ingen overvågning af certifikatudløb nogen steder.** Fornyelse går i stykker
  lydløst og viser sig først i udløbsøjeblikket, uden varsel.
- **Detektionsforsinkelse langt værre end tilsigtet.** Health checket beder om
  `*/15 * * * *`; observerede mellemrum den uge var **1t12m til 3t30m**, fordi
  GitHub throttler skemalagte workflows. *Verificeret* ud fra kørselshistorik.
- **Et grønt deploy beviste ingenting.** Deploy-jobbet rapporterede success alene
  på at `deploy.sh` returnerede 0, mens sitet var utilgængeligt.
- **Config-drift.** App-hostens live `/etc/nginx/sites-enabled/qlim8` har aldrig
  matchet dette repos `nginx.conf`, og intet synkroniserer dem. Se det åbne
  handlingspunkt nedenfor — forskellene er ikke kosmetiske.

## Håndtering — hvad gik godt

- Deployet 06:33 og Hetzner-hændelsen blev begge korrekt udelukket med beviser
  frem for antaget skyldige.
- Så snart en read-only SSH-diagnostik blev kørt, blev hver rodårsag fundet i en
  **enkelt kørsel** — 15 sekunder hver, efter timers gætteri udefra.
- Genopretningen var gated hele vejen: nginx-start var betinget af at `nginx -t`
  bestod, og config-redigeringen tog backup først, verificerede at dens
  udskiftninger matchede, og rullede tilbage ved fejl.

## Håndtering — hvad gik skidt

- **Der blev brugt timer på at slutte udefra, hvor svaret krævede at være
  indenfor.** Muligheden for at køre kommandoer på begge hosts (via deploy-nøglen,
  der allerede lå i GitHub Secrets) fandtes fra første minut. "Jeg har ingen SSH"
  blev behandlet som en blindgyde i stedet for et routing-problem.
- **En forkert hypotese blev fremsat med for stor sikkerhed, to gange.**
  App-nedbruddet blev tilskrevet et certifikatproblem på baggrund af en plausibel
  mekanisme og ingen beviser. Certifikaterne var gyldige hele tiden.
- **En delvis rettelse blev leveret som en komplet.** qlim8-landing#26 var korrekt
  men utilstrækkelig, og blev kommunikeret som løsningen.

## Korrigerende handlinger

| # | Handling | Status |
|---|---|---|
| 1 | `Restart=on-failure`, `RestartSec=10s` for nginx på app-hosten | ✅ Færdig, verificeret via `systemctl show` |
| 2 | `resolver` + variable upstreams så DNS slås op ved request-tid | ✅ Færdig på live-hosten og i `nginx.conf` |
| 3 | Genudsted landing-certifikat via webroot; omskriv lineage til `authenticator = webroot` | ✅ Færdig, verificeret — gyldigt til 26. okt |
| 4 | 6-timers `nginx -s reload`-løkke så fornyelser når den kørende server | ✅ Færdig (qlim8-landing#26), verificeret kørende |
| 5 | Fjern den konflikterende host-certbot-cron og standalone-provisionering | ✅ Færdig, fraværende på hosten |
| 6 | Overvåg marketing-sitet (apex + www) | ✅ Færdig — `synthetic-prod-health.yml` |
| 7 | Overvågning af certifikatudløb, alle tre hostnavne: fejl <10 dage, advar <21 | ✅ Færdig, falsificeret i begge retninger før levering |
| 8 | Post-deploy-tjek så et deploy der efterlader prod utilgængelig fejler | ✅ Færdig, verificeret fejlende (#379) og bestående (#385) |
| 9 | Read-only SSH-diagnostik-workflows i begge repos | ✅ Færdig |
| 10 | Tosproget incident-runbook | ✅ Færdig — `operations/incident-runbook.md` |
| 11 | **Løs `nginx.conf`-driften** — live-config har `client_max_body_size 50M`, repoet forventer `160m` til Excel-imports >100 MB; repoet har desuden rate limiting på auth og `/internal/`-blokering, som hosten mangler | ⬜ **Åben — kræver en beslutning** |
| 12 | Ekstern uptime-monitor (1–3 min polling) som primær alarm i stedet for GitHub Actions | ⬜ Åben |
| 13 | Omdøb `HETZNRE_USER`-secret (tilføj korrekt navn → skift reference → slet gammel) | ⬜ Åben |

Handling 11 er det mest værdifulde åbne punkt og forårsager muligvis allerede en
separat brugersynlig fejl: nginx afviser uploads over 50 MB ved kanten, før de
når appens grænse på 150 MB.

## Læring

1. **Retry-politikker betyder mere end rodårsager.** Enhver rodårsag er per
   definition uforudset. `Restart=on-failure` ville have inddæmmet dette nedbrud
   uden at nogen forstod hvorfor nginx fejlede.
2. **Afhængigheder ved opstart forstærker nedbrud.** Alt hvad der slås op eller
   hentes ved config-load gør en tredjeparts forbigående fejl til din permanente.
   Udskyd til request-tid hvor muligheden findes.
3. **"Jeg kan ikke nå den" er som regel et routing-problem, ikke en mur.**
   Credentials lå i CI hele tiden.
4. **En plausibel mekanisme er ikke et bevis.** "nginx vil ikke starte,
   certifikater er den sædvanlige årsag" er en hypotese. `certbot certificates`
   er et fund.
5. **Verificér en rettelse mod symptomet, ikke mod teorien.** Landing-reload-løkken
   var korrekt, deployet og kørende — og sitet var stadig i stykker. Kun ved at
   gentjekke det brugersynlige symptom fandt vi fejl nummer to.
6. **Overvågning der først udløses når brugere er ramt, er ikke tidlig varsling.**
   Certifikatudløb kan vides uger i forvejen; ingen kiggede.

## Referencer

- Runbook: [`incident-runbook.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/da/operations/incident-runbook.md) (i qlim8-app)
- qlim8-app: #225 (overvågning), #226 (rettelser af genopretningstrin), #227 (diagnostik + resolver)
- qlim8-landing: #26 (reload-løkke), #27 (diagnostik)
- Diagnostik-kørsler: app `30357351043`, landing `30357380154`
