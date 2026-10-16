// Cookieless website analytics, the browser side.
//
// The site reports pageviews and a few interactions (the film on /demo, the
// materiality analysis on /events/dma, the whitepaper slide-in, the demo
// dialog) to its own same-origin proxy, app/api/site-events/route.ts, which
// adds a daily-rotating visitor hash and forwards them to qlim8-app, where
// /admin (Analyse → Hjemmeside) shows them. The list of events and the funnels
// live in qlim8-app (shared/siteEvents.ts); keep SITE_EVENT_NAMES in step.
//
// Nothing is written to the visitor's device: no cookie, no local or session
// storage. The visit's source (?ref=, utm_*, the referrer) is read once per tab
// and kept in memory, so a client-side navigation keeps it and a reload reads
// it again. That is why this needs no consent and runs regardless of the
// cookie banner, unlike GA4 (src/lib/tracking.ts).

export const SITE_EVENT_NAMES = [
  "pageview",
  "demo_video_started",
  "demo_video_halfway",
  "demo_video_completed",
  "demo_cta_clicked",
  "demo_dialog_opened",
  "demo_requested",
  "dma_started",
  "dma_halfway",
  "dma_completed",
  "dma_profile_requested",
  "slidein_shown",
  "slidein_step",
  "slidein_minimized",
  "slidein_reopened",
  "whitepaper_requested",
  "vsme_requested",
] as const;

export type SiteEventName = (typeof SITE_EVENT_NAMES)[number];
export type SiteEventProps = Record<string, string | number | boolean>;

export interface SiteAttribution {
  ref: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrerHost: string | null;
}

export interface SiteEventPayload extends SiteAttribution {
  event: SiteEventName;
  path: string;
  props?: SiteEventProps;
}

export const SITE_EVENTS_ENDPOINT = "/api/site-events";
/** The app accepts at most 20 events per batch. */
export const MAX_BATCH = 20;

const TOKEN_MAX = 120;

function token(value: string | null): string | null {
  const v = value?.trim();
  return v ? v.slice(0, TOKEN_MAX) : null;
}

/** The referrer's host, or null for none, an unparseable one, or our own site. */
export function referrerHostOf(referrer: string, ownHost: string): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (!host || host === ownHost.toLowerCase()) return null;
    return host;
  } catch {
    return null;
  }
}

/** Where this visit came from, read from the entry URL and the referrer. */
export function readAttribution(href: string, referrer: string): SiteAttribution {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return { ref: null, utmSource: null, utmMedium: null, utmCampaign: null, referrerHost: null };
  }
  const p = url.searchParams;
  return {
    ref: token(p.get("ref")),
    utmSource: token(p.get("utm_source")),
    utmMedium: token(p.get("utm_medium")),
    utmCampaign: token(p.get("utm_campaign")),
    referrerHost: referrerHostOf(referrer, url.hostname),
  };
}

/** Pathname only: a query string or fragment never leaves the browser. */
export function pathOf(href: string): string {
  try {
    return new URL(href).pathname || "/";
  } catch {
    return "/";
  }
}

/** True for automated browsers, which should not be counted. */
export function isAutomated(nav: { webdriver?: boolean } | undefined): boolean {
  return !!nav?.webdriver;
}

/**
 * The materiality analysis milestone crossed by going from `before` to
 * `after` completed topics, if any: the first topic, half of them, all of them.
 */
export function dmaMilestone(before: number, after: number, total: number): SiteEventName | null {
  if (after <= before) return null;
  if (before < total && after >= total) return "dma_completed";
  const half = Math.ceil(total / 2);
  if (before < half && after >= half) return "dma_halfway";
  if (before === 0 && after >= 1) return "dma_started";
  return null;
}

/**
 * The film milestones reached at `currentTime` of `duration` seconds that
 * have not been reported yet. `seen` is updated in place.
 */
export function videoMilestones(currentTime: number, duration: number, seen: Set<SiteEventName>): SiteEventName[] {
  const out: SiteEventName[] = [];
  if (!Number.isFinite(duration) || duration <= 0) return out;
  const share = currentTime / duration;
  const reach = (name: SiteEventName, at: number) => {
    if (share >= at && !seen.has(name)) {
      seen.add(name);
      out.push(name);
    }
  };
  reach("demo_video_halfway", 0.5);
  reach("demo_video_completed", 0.95);
  return out;
}

// --- The queue (browser only) ---------------------------------------------

let attribution: SiteAttribution | null = null;
const queue: SiteEventPayload[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let listening = false;

function entryAttribution(): SiteAttribution {
  if (!attribution) attribution = readAttribution(window.location.href, document.referrer);
  return attribution;
}

function send(batch: SiteEventPayload[]) {
  if (batch.length === 0) return;
  const body = JSON.stringify({ events: batch });
  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(SITE_EVENTS_ENDPOINT, blob)) return;
    }
    void fetch(SITE_EVENTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics never breaks the page.
  }
}

/** Sends everything queued now. */
export function flushSiteEvents() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  while (queue.length > 0) send(queue.splice(0, MAX_BATCH));
}

/**
 * Reports one event for the current page. Batched for a moment, and flushed
 * when the page is hidden, so a click that navigates away is not lost.
 */
export function trackSiteEvent(event: SiteEventName, props?: SiteEventProps) {
  if (typeof window === "undefined") return;
  try {
    if (isAutomated(navigator)) return;
    if (!listening) {
      listening = true;
      window.addEventListener("pagehide", flushSiteEvents);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") flushSiteEvents();
      });
    }
    queue.push({ event, path: pathOf(window.location.href), ...entryAttribution(), ...(props ? { props } : {}) });
    if (queue.length >= MAX_BATCH) flushSiteEvents();
    else if (!timer) timer = setTimeout(flushSiteEvents, 1500);
  } catch {
    // Analytics never breaks the page.
  }
}
