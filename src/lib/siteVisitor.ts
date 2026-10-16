// The server side of the cookieless analytics (app/api/site-events/route.ts):
// who counts as one visitor, and who is not counted at all.
//
// A visitor is a hash of IP and user agent with a salt that lives only in this
// process's memory and is replaced when the date changes in Copenhagen. The
// old salt is gone, so yesterday's hashes cannot be recomputed or linked to
// today's, and the IP itself is never stored or forwarded. A deploy restarts
// the process and starts a new salt, so on a deploy day a visitor can count
// twice: an overcount we accept for not keeping a salt anywhere.

import { createHash, randomBytes } from "node:crypto";

let salt: { day: string; value: string } | null = null;

/** The calendar day in Copenhagen, "YYYY-MM-DD". */
export function copenhagenDay(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function saltFor(day: string): string {
  if (!salt || salt.day !== day) salt = { day, value: randomBytes(32).toString("hex") };
  return salt.value;
}

/** 32 hex characters, stable for one IP and user agent within one day. */
export function visitorHash(ip: string, userAgent: string, now: Date = new Date(), saltOverride?: string): string {
  const day = copenhagenDay(now);
  const s = saltOverride ?? saltFor(day);
  return createHash("sha256").update(`${s}|${day}|${ip}|${userAgent}`).digest("hex").slice(0, 32);
}

/** The visitor's IP as nginx passes it (X-Real-IP, then the first X-Forwarded-For hop). */
export function clientIp(headers: Headers): string | null {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const first = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return first || null;
}

const BOT = /bot|crawl|spider|slurp|preview|fetch|monitor|headless|lighthouse|pingdom|uptime|curl|wget|python-requests|axios|node-fetch|go-http|java\//i;

/** Crawlers, link previews, monitors and scripts: not visitors. */
export function isBotUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT.test(userAgent);
}
