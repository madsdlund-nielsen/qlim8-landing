import { NextResponse } from "next/server";
import { clientIp, isBotUserAgent, visitorHash } from "@/lib/siteVisitor";
import { MAX_BATCH } from "@/lib/siteEvents";

// Same-origin endpoint for the cookieless analytics (src/lib/siteEvents.ts).
// The browser sends its events here; this adds the daily visitor hash
// (src/lib/siteVisitor.ts) and forwards them server-to-server to qlim8-app's
// POST /api/public/site-events with the secret both hosts share
// (CMS_REVALIDATE_SECRET). The IP and user agent stop here.
//
// It always answers 204: the beacon never reads the answer, and a failure to
// count a visit must never show on the page. Bots and a missing secret are
// dropped silently.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://app.qlim8.com";
const MAX_BODY_BYTES = 16 * 1024;

const done = () => new NextResponse(null, { status: 204 });

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  const ua = request.headers.get("user-agent");
  const ip = clientIp(request.headers);
  if (!secret || !ip || isBotUserAgent(ua)) return done();

  let events: unknown[];
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return done();
    const body = JSON.parse(text) as { events?: unknown };
    if (!Array.isArray(body.events) || body.events.length === 0) return done();
    events = body.events.slice(0, MAX_BATCH);
  } catch {
    return done();
  }

  try {
    await fetch(`${API_BASE}/api/public/site-events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ visitorHash: visitorHash(ip, ua ?? ""), events }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // The app host is down or slow: the visit goes uncounted, nothing more.
  }
  return done();
}
