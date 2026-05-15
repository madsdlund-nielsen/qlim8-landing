import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/pricing",      destination: "/priser",      permanent: true },
      { source: "/about",        destination: "/om-os",       permanent: true },
      { source: "/viden",        destination: "/blog",        permanent: true },
      { source: "/viden/:slug*", destination: "/blog/:slug*", permanent: true },
      { source: "/produkt",      destination: "/",            permanent: true },
      { source: "/blog/bankens-nye-krav-esg-smv-finansiering", destination: "/blog/l193-bankens-esg-krav-smv", permanent: true },
      { source: "/blog/csrd-leverandoer-rapportering",          destination: "/blog",                           permanent: true },
    ];
  },
};

export default nextConfig;
