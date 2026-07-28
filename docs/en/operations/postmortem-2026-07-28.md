# Post-mortem — 2026-07-28: app outage and marketing TLS expiry

> Status: final · Date: 2026-07-28 · Owner: qlim8-team · Severity: SEV-1 (both sites)
>
> **Synced copy.** The canonical version lives in [qlim8-app](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/en/operations/postmortem-2026-07-28.md) (`docs/en/operations/`). Last synced: 2026-07-28.
>
> Incident B below is this repository's: the certbot renewal that had been
> failing since June, and the missing nginx reload fixed in #26.

Blameless post-mortem. All times UTC. Every claim below is labelled **verified**
(observed in a log, a command output or an external probe) or **inferred**.

## Summary

Two **unrelated** production failures overlapped on 2026-07-28, on two different
servers. They shared no cause; investigating one uncovered the other.

| | Incident A — app | Incident B — marketing |
|---|---|---|
| Host | `app.qlim8.com` (178.104.200.17) | `qlim8.com` (91.107.239.106) |
| Symptom | Connection refused on :80 and :443 | `NET::ERR_CERT_DATE_INVALID` |
| Duration | **6h 08m** (06:01:20 → 12:09:46) | **16h 50m** (Jul 27 20:16 → 13:07) |
| Detected by | Scheduled health check, 2h 04m late | A human, ~12h late. No monitoring existed |
| Root cause | nginx refused to start after a DNS lookup failed at config-load | certbot renewal misconfigured (`authenticator = standalone`) |

The single most important finding is not either root cause. It is that **nginx
failed once and nothing ever retried it**. A ten-second blip became a six-hour
outage purely for lack of a restart policy.

## Impact

- **app.qlim8.com**: fully unreachable for 6h 08m. All users, all endpoints. The
  Node application itself was healthy throughout (`pm2` online, `localhost:5000`
  returning 200) — only the reverse proxy was down. *Verified.*
- **qlim8.com / www.qlim8.com**: served an expired certificate for 16h 50m. Every
  visitor got a full-page browser security interstitial. The site itself was
  serving normally behind it. *Verified.*
- No data loss. No database impact. No failed deploys other than the post-deploy
  check correctly reporting the outage. *Verified.*

## Timeline

| Time (UTC) | Event |
|---|---|
| Apr 28, 20:16 | Landing certificate issued. This is the last one it ever got. |
| ~Jun 27 | Landing certbot renewal attempts begin and fail, silently, twice daily thereafter. certbot renews at 30 days remaining, which for a cert expiring Jul 27 is late June. The exact first failure was not established — the diagnostic captured only the last 80 log lines. *Inferred from the renewal schedule; the repeated failures themselves are verified.* |
| Jun 15, 15:26 | App certificate issued, valid to Sep 13. Never a factor. |
| **Jul 27, 20:16:34** | **Landing certificate expires. Incident B begins.** |
| Jul 28, 05:33:56 | Last green synthetic health check (run #834). |
| **Jul 28, 06:01:20** | **nginx restarted on the app host; `ExecStartPre` config test fails with `[emerg] host not found in upstream "eu-assets.i.posthog.com"`. nginx does not start. Incident A begins.** |
| 06:33–06:36 | CI run #375 deploys PR #222. Deploy reports **success** — build, migrations and `pm2 … online` all fine — while the site is unreachable. |
| 08:05:40 | Synthetic health check run #835 fails (`curl: (7)`). First automated detection, 2h 04m after onset. |
| 08:09 | Unrelated Hetzner incident ("Cloud Resource Creation Delay") opens. Red herring — see below. |
| ~08:20 | Investigation begins. Landing certificate expiry discovered incidentally. |
| 12:04:05 | Read-only SSH diagnostic runs on the app host. **Root cause A identified.** |
| 12:04:28 | Read-only SSH diagnostic runs on the landing host. **Root cause B identified.** |
| **12:09:46** | **`systemctl start nginx` — app.qlim8.com restored.** |
| 13:06:16 | Landing certificate re-issued via `certonly --webroot`; renewal config rewritten to `authenticator = webroot`. |
| **13:07:01** | **qlim8.com restored.** |
| 13:08:39 | App host hardened: `Restart=on-failure` + `resolver` with variable upstreams. |
| 13:26:47 | CI run #385 fully green, including the post-deploy check that had been red all day. |

## Root cause — Incident A (app outage)

nginx resolves a literal hostname in `proxy_pass` **once, at config-load time**,
and refuses to start if that lookup fails. The config proxied PostHog analytics:

```nginx
proxy_pass https://eu-assets.i.posthog.com/static/;
```

At 06:01:20 a routine restart coincided with a transient DNS failure:

```
[emerg] host not found in upstream "eu-assets.i.posthog.com"
        in /etc/nginx/sites-enabled/qlim8:11
nginx: configuration file /etc/nginx/nginx.conf test failed
```

*Verified* — quoted from the host's journal.

Three factors turned that into a six-hour outage:

1. **No restart policy.** nginx failed once and systemd never retried. This is
   the dominant factor: with `Restart=on-failure` the outage would have lasted
   about ten seconds, whatever the cause. *Verified* — no `Restart=` was set.
2. **`:80` and `:443` share one config file.** A failure anywhere in that file
   closes both ports, which is why the host looked completely dead rather than
   merely degraded. *Verified.*
3. **An analytics CDN is a hard startup dependency.** A third-party host that
   the site does not need in order to serve its own pages could nonetheless
   prevent it from starting.

`nginx -t` passed by the time we looked — DNS had recovered hours earlier. The
service simply had no mechanism to notice. *Verified.*

### What did NOT cause it

- **Certificates.** `app.qlim8.com` was valid to Sep 13. This was hypothesised
  twice during the response and was wrong both times. *Verified.*
- **The 06:33 deploy.** It completed cleanly at 06:36:29 with the app online. A
  bad deploy also produces 502/503 from nginx, not connection-refused. *Verified.*
- **The Hetzner incident.** It opened at 08:09 — *after* the first failed check
  at 08:05 — concerned creating and modifying cloud resources, not running
  servers, and the second Hetzner box in the same datacentre stayed up
  throughout. *Verified.*

## Root cause — Incident B (marketing TLS expiry)

The stored renewal configuration specified the wrong challenge method:

```
authenticator = standalone
```

Standalone binds port 80 to answer the ACME challenge. The dockerised nginx
container owns port 80, so certbot could never bind it, and every renewal failed:

```
Failed to renew certificate qlim8.com with error: Some challenges have failed.
ls: /var/www/certbot/.well-known/acme-challenge/: No such file or directory
```

*Verified* — quoted from the certbot container log and a directory listing.

This is a migration leftover. The site was originally provisioned with a
host-level certbot using `--standalone`, which worked before nginx moved into
Docker. The move happened; the saved setting did not follow. *Inferred, strongly
supported* — `scripts/setup-server.sh` still contained that standalone
provisioning and an `/etc/cron.d/certbot-renew` job at the start of this incident.

### A second, independent bug in the same path

Even a successful renewal would not have reached users: nginx reads its
certificate **once at startup** and the compose stack had nothing to reload it.
This was fixed earlier the same day (qlim8-landing#26, a 6h `nginx -s reload`
loop) — and the fix was, at the time, believed to be *the* fix.

It was not. The proof: that PR's own deploy recreated the nginx container, which
reloads certificates from the volume, and the expired certificate was **still**
served afterwards. That single observation is what redirected the investigation
from delivery to renewal. *Verified.*

Both bugs were real and both had to be fixed.

## Contributing factors

- **Zero monitoring on the marketing site.** It was not covered by any check.
  A fully user-visible outage ran ~12h until a human noticed it by accident.
- **No certificate-expiry monitoring anywhere.** Renewal breaks silently and
  surfaces only at the moment of expiry, with no lead time.
- **Detection latency far worse than intended.** The health check requests
  `*/15 * * * *`; observed gaps that week were **1h12m to 3h30m** because GitHub
  throttles scheduled workflows. *Verified* from run history.
- **A green deploy proved nothing.** The deploy job reported success purely on
  `deploy.sh` exiting 0, while the site was unreachable.
- **Config drift.** The app host's live `/etc/nginx/sites-enabled/qlim8` has
  never matched this repo's `nginx.conf`, and nothing syncs them. See the open
  action item below — the differences are not cosmetic.

## Response — what went well

- The 06:33 deploy and the Hetzner incident were both correctly excluded, with
  evidence, rather than assumed guilty.
- Once a read-only SSH diagnostic was run, each root cause was identified from a
  **single run** — 15 seconds each, after hours of external guesswork.
- Recovery was gated throughout: the nginx start was conditional on `nginx -t`
  passing, and the config edit backed up first, asserted its substitutions
  matched, and rolled back on failure.

## Response — what went badly

- **Hours were spent inferring from outside when the answer required being
  inside.** The capability to run commands on both hosts (via the deploy key
  already in GitHub Secrets) existed from the first minute. "I have no SSH" was
  treated as a dead end instead of a routing problem.
- **A wrong hypothesis was stated with too much confidence, twice.** The app
  outage was attributed to a certificate problem on the basis of a plausible
  mechanism and no evidence. The certificates were valid the whole time.
- **A partial fix was shipped as a complete one.** qlim8-landing#26 was correct
  but insufficient, and was communicated as the resolution.

## Corrective actions

| # | Action | Status |
|---|---|---|
| 1 | `Restart=on-failure`, `RestartSec=10s` for nginx on the app host | ✅ Done, verified via `systemctl show` |
| 2 | `resolver` + variable upstreams so DNS resolves at request time | ✅ Done on the live host and in `nginx.conf` |
| 3 | Re-issue landing certificate via webroot; rewrite lineage to `authenticator = webroot` | ✅ Done, verified — valid to Oct 26 |
| 4 | 6h `nginx -s reload` loop so renewals reach the running server | ✅ Done (qlim8-landing#26), verified running |
| 5 | Remove the conflicting host-level certbot cron and standalone provisioning | ✅ Done, absent from the host |
| 6 | Monitor the marketing site (apex + www) | ✅ Done — `synthetic-prod-health.yml` |
| 7 | Certificate-expiry monitoring, all three hostnames: fail <10 days, warn <21 | ✅ Done, falsified in both directions before shipping |
| 8 | Post-deploy check so a deploy that leaves prod unreachable fails | ✅ Done, verified failing (run #379) and passing (run #385) |
| 9 | Read-only SSH diagnostic workflows in both repos | ✅ Done |
| 10 | Bilingual incident runbook | ✅ Done — `operations/incident-runbook.md` |
| 11 | **Resolve the `nginx.conf` drift** — live config has `client_max_body_size 50M`, repo expects `160m` for >100 MB Excel imports; repo also has auth rate limiting and `/internal/` edge blocking that the host lacks | ⬜ **Open — needs a decision** |
| 12 | External uptime monitor (1–3 min polling) to replace GitHub Actions as the primary alarm | ⬜ Open |
| 13 | Rename the `HETZNRE_USER` secret (add correct name → switch reference → delete old) | ⬜ Open |

Action 11 is the highest-value open item and may already be causing a separate
user-visible bug: nginx rejects uploads over 50 MB at the edge, before they reach
the app's 150 MB limit.

## Lessons

1. **Retry policies matter more than root causes.** Every root cause is
   unforeseen by definition. `Restart=on-failure` would have contained this
   outage without anyone understanding why nginx failed.
2. **Startup-time dependencies are outage amplifiers.** Anything resolved or
   fetched at config-load turns a third party's transient failure into your
   permanent one. Defer to request time where the option exists.
3. **"I cannot reach it" is usually a routing problem, not a wall.** The
   credentials were in CI the entire time.
4. **A plausible mechanism is not evidence.** "nginx won't start, certificates
   are the usual reason" is a hypothesis. `certbot certificates` is a finding.
5. **Verify a fix against the symptom, not against the theory.** The landing
   reload loop was correct, deployed, and running — and the site was still
   broken. Only re-checking the user-visible symptom revealed the second bug.
6. **Monitoring that only fires once users are affected is not early warning.**
   Certificate expiry is knowable weeks ahead; nothing was looking.

## References

- Runbook: [`incident-runbook.md`](https://github.com/madsdlund-nielsen/qlim8-app/blob/main/docs/en/operations/incident-runbook.md) (in qlim8-app)
- qlim8-app: #225 (monitoring), #226 (recovery-step corrections), #227 (diagnostics + resolver)
- qlim8-landing: #26 (reload loop), #27 (diagnostics)
- Diagnostic runs: app `30357351043`, landing `30357380154`
