// The root markdown document. A catch-all segment cannot match an empty path,
// so `/` needs its own handler alongside app/md/[...slug]/route.ts.

import { renderMarkdownFor, MARKDOWN_CONTENT_TYPE } from "@/lib/markdown";

export const revalidate = 300;

export async function GET() {
  const body = await renderMarkdownFor([]);
  return new Response(body ?? "", {
    status: 200,
    headers: {
      "Content-Type": MARKDOWN_CONTENT_TYPE,
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
