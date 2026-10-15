import type { NextConfig } from "next";
// The JSON, not src/content/marketing/redirects.ts: next.config.ts cannot load
// a sibling TypeScript module. The typed accessor reads the same file.
import redirectRows from "./src/content/marketing/redirects.json";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    // CMS-managed images are served by qlim8-app at /api/cms/assets/:id; allow
    // next/image to optimize them from the app origin (prod + local dev).
    remotePatterns: [
      { protocol: "https", hostname: "app.qlim8.com", pathname: "/api/cms/assets/**" },
      { protocol: "http", hostname: "localhost", port: "5000", pathname: "/api/cms/assets/**" },
    ],
  },
  // Markdown twins: `/priser.md` serves the same page as plain markdown, the
  // convention Resend popularised and that agents now probe for. A rewrite
  // (not a redirect) so the `.md` URL is the canonical address of the markdown
  // document rather than a detour. `Accept: text/markdown` on the normal URL is
  // handled in middleware.ts and lands on the same handlers.
  async rewrites() {
    return [
      { source: "/index.md", destination: "/md" },
      { source: "/:path*.md", destination: "/md/:path*" },
      // A route folder beginning with a dot is not reliably picked up by the
      // App Router, so the handlers live at /well-known and are mapped here.
      { source: "/.well-known/mcp.json", destination: "/well-known/mcp.json" },
      {
        source: "/.well-known/mcp-registry-auth",
        destination: "/well-known/mcp-registry-auth",
      },
    ];
  },
  // Every redirect carries an explicit statusCode: 301. `permanent: true` makes
  // Next answer 308, which crawlers treat the same but which this site does not
  // want to depend on (the plan and the tests say 301).
  async redirects() {
    return [
      { source: "/pricing",      destination: "/priser",      statusCode: 301 },
      { source: "/about",        destination: "/om-os",       statusCode: 301 },
      { source: "/viden",        destination: "/blog",        statusCode: 301 },
      { source: "/viden/:slug*", destination: "/blog/:slug*", statusCode: 301 },
      { source: "/blog/bankens-nye-krav-esg-smv-finansiering", destination: "/blog/l193-bankens-esg-krav-smv", statusCode: 301 },
      { source: "/blog/csrd-leverandoer-rapportering",          destination: "/blog",                           statusCode: 301 },
      // The merged industry and product pages (src/content/marketing/redirects.json):
      // each row is the page and its .md twin.
      ...redirectRows.flatMap(({ from, to }) => [
        { source: from, destination: to, statusCode: 301 },
        { source: `${from}.md`, destination: `${to}.md`, statusCode: 301 },
      ]),
    ];
  },
};

export default nextConfig;
