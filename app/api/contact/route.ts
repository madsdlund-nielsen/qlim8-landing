import { NextResponse } from "next/server";

// Same-origin proxy to qlim8-app's POST /api/public/contact, used by the form
// on /kontakt (a demo booking or a question). Mirrors the newsletter proxy:
// the browser stays on qlim8.com (no CORS), and the response is always JSON
// even when the app host answers with an nginx or rate-limit page, which the
// form requires.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://app.qlim8.com";
const FALLBACK = "Noget gik galt. Prøv igen, eller ring på +45 93 90 13 84.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ugyldig forespørgsel." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${API_BASE}/api/public/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    // Read as text then parse, so a non-JSON upstream body (proxy/limiter HTML)
    // never throws here: we substitute a Danish error instead.
    const text = await upstream.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, message: FALLBACK };
    }
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    // Network failure reaching qlim8-app.
    return NextResponse.json({ success: false, message: FALLBACK }, { status: 500 });
  }
}
