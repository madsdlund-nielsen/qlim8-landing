import { NextRequest, NextResponse } from "next/server";
import { COPY_DEFAULTS, COPY_PAGE_KEYS } from "@/content/copy";
import { secretsMatch } from "@/lib/secretCompare";

// Serves the site's bundled default marketing copy to the qlim8-app admin
// CMS, so the editor can display the actual current content of each page.
// Shares the revalidate-webhook secret (CMS_REVALIDATE_SECRET) — the app
// proxies requests here server-side and never exposes the secret to browsers.

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CMS_REVALIDATE_SECRET not configured" }, { status: 503 });
  }
  if (!secretsMatch(request.headers.get("x-revalidate-secret"), secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pageKey = request.nextUrl.searchParams.get("pageKey");
  if (!pageKey) {
    return NextResponse.json({ pageKeys: COPY_PAGE_KEYS });
  }
  const copy = COPY_DEFAULTS[pageKey];
  if (copy === undefined) {
    return NextResponse.json({ error: `Unknown pageKey: ${pageKey}` }, { status: 404 });
  }
  return NextResponse.json({ pageKey, copy });
}
