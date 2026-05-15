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
    ];
  },
};

export default nextConfig;
