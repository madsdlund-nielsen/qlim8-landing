// Serves the markdown twin of a page.
//
// Reached two ways, both configured elsewhere:
//   - `/priser.md`            via the rewrite in next.config.ts
//   - `Accept: text/markdown` via middleware.ts
//
// The root (`/index.md` and `/` with an Accept header) is handled by
// app/md/route.ts, because a catch-all segment cannot match an empty path.

import { renderMarkdownFor, MARKDOWN_CONTENT_TYPE } from "@/lib/markdown";

// Same ISR cadence as the HTML pages: the copy comes from the same CMS fetches,
// and the app's revalidate webhook busts both through shared cache tags.
export const revalidate = 300;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  // `/index.md` is the conventional spelling for the root document.
  const segments = slug.length === 1 && slug[0] === "index" ? [] : slug;

  const body = await renderMarkdownFor(segments);
  if (body === null) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
