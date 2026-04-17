import type { Metadata } from "next";
import CookiePolicy from "@/page-components/cookies";

export const metadata: Metadata = {
  title: "Cookiepolitik | qlim8",
  description:
    "Læs om hvilke cookies qlim8 bruger og hvorfor. Vi bruger kun nødvendige cookies og analytiske cookies til at forbedre din oplevelse.",
  alternates: { canonical: "https://qlim8.com/cookies" },
  openGraph: {
    title: "Cookiepolitik | qlim8",
    description: "Læs om hvilke cookies qlim8 bruger og hvorfor.",
    url: "https://qlim8.com/cookies",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 cookiepolitik" }],
  },
};

export default function Page() {
  return <CookiePolicy />;
}
