import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/content/articles";
import { secretsMatch } from "@/lib/secretCompare";

// Exposes the bundled blog articles (src/content/*.ts) to the qlim8-app
// admin CMS for a one-time import into cms_articles. Once imported, the CMS
// copies win by slug and these bundled modules remain as offline fallbacks.
// Same shared-secret scheme as /api/cms/defaults.

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CMS_REVALIDATE_SECRET not configured" }, { status: 503 });
  }
  if (!secretsMatch(request.headers.get("x-revalidate-secret"), secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ articles });
}
