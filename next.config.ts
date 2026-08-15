import type { NextConfig } from "next";

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
      // App Router, so the handler lives at /well-known and is mapped here.
      { source: "/.well-known/mcp.json", destination: "/well-known/mcp.json" },
    ];
  },
  async redirects() {
    return [
      { source: "/pricing",      destination: "/priser",      permanent: true },
      { source: "/about",        destination: "/om-os",       permanent: true },
      { source: "/viden",        destination: "/blog",        permanent: true },
      { source: "/viden/:slug*", destination: "/blog/:slug*", permanent: true },
      { source: "/blog/bankens-nye-krav-esg-smv-finansiering", destination: "/blog/l193-bankens-esg-krav-smv", permanent: true },
      { source: "/blog/csrd-leverandoer-rapportering",          destination: "/blog",                           permanent: true },
    ];
  },
};

export default nextConfig;
