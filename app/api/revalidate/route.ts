import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

// On-publish revalidation webhook called by qlim8-app's CMS publish endpoints.
// Authenticated with a shared secret (CMS_REVALIDATE_SECRET, set in both repos'
// environments). Drops the named ISR cache tags/paths so freshly published CMS
// content goes live without a redeploy.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  let body: { tags?: string[]; paths?: string[] };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const revalidated = { tags: [] as string[], paths: [] as string[] };
  for (const tag of body.tags ?? []) {
    revalidateTag(tag);
    revalidated.tags.push(tag);
  }
  for (const path of body.paths ?? []) {
    revalidatePath(path);
    revalidated.paths.push(path);
  }

  return NextResponse.json({ ok: true, revalidated });
}
