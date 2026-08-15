// Content negotiation for the markdown twins.
//
// `/priser.md` is handled by a rewrite in next.config.ts. This covers the other
// half of the convention: an agent that asks for the normal URL with
// `Accept: text/markdown` gets the markdown document instead of the HTML page.
//
// Deliberately narrow. It only fires when markdown is asked for *ahead of*
// HTML, so a browser (which sends `text/html` first and `*/*` last) always gets
// the page. Anything under /api, /_next or with a file extension is left alone.

import { NextResponse, type NextRequest } from "next/server";

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  const lower = accept.toLowerCase();
  const md = lower.indexOf("text/markdown");
  if (md === -1) return false;
  const html = lower.indexOf("text/html");
  return html === -1 || md < html;
}

export function middleware(request: NextRequest) {
  if (!prefersMarkdown(request.headers.get("accept"))) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/md", request.url));
  }
  return NextResponse.rewrite(new URL(`/md${pathname}`, request.url));
}

export const config = {
  // Skip Next internals, the route handlers under /api, the markdown handlers
  // themselves, and anything that already looks like a file (including the
  // `.md` URLs, which the rewrite in next.config.ts owns).
  matcher: ["/((?!api|md|_next/static|_next/image|.*\\.).*)"],
};
