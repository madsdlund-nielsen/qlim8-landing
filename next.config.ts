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
