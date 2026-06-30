import { NextResponse } from "next/server";

// Same-origin proxy → qlim8-app, mirroring app/api/newsletter/signup/route.ts.
// Keeps the browser on qlim8.com (no CORS) and guarantees a JSON response even
// if the backend returns HTML (a 429 page, an nginx 502, etc.).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://app.qlim8.com";

// GET: read current unsubscribe state. Forwards the signed id + token.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  const token = searchParams.get("token") ?? "";
  const qs = new URLSearchParams({ id, token }).toString();

  try {
    const upstream = await fetch(`${API_BASE}/api/newsletter/unsubscribe?${qs}`, {
      method: "GET",
      cache: "no-store",
    });
    return jsonPassthrough(upstream);
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// POST: record the unsubscribe + reason.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${API_BASE}/api/newsletter/unsubscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return jsonPassthrough(upstream);
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Read as text then parse, so a non-JSON upstream body never throws here.
async function jsonPassthrough(upstream: Response) {
  const text = await upstream.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = { ok: false };
  }
  return NextResponse.json(data, { status: upstream.status });
}
