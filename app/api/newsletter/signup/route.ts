import { NextResponse } from "next/server";

// Same-origin proxy → qlim8-app. Keeps the browser on qlim8.com (no CORS) and
// guarantees a JSON response even if the backend ever returns HTML (a 429 page,
// an nginx 502, etc.), which the signup forms require — they always call res.json().
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://app.qlim8.com";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Ugyldig forespørgsel." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${API_BASE}/api/newsletter/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    // Read as text then parse, so a non-JSON upstream body (proxy/limiter HTML)
    // never throws here — we substitute a Danish error instead.
    const text = await upstream.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: false, message: "Noget gik galt. Prøv igen senere." };
    }
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    // Network failure reaching qlim8-app.
    return NextResponse.json(
      { success: false, message: "Noget gik galt. Prøv igen senere." },
      { status: 500 },
    );
  }
}
