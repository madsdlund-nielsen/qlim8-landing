import type { Metadata } from "next";
import CookiePolicy from "@/page-components/cookies";

export const metadata: Metadata = {
  title: "Cookieerklæring | qlim8",
  description:
    "Oversigt over de cookies, qlim8 bruger på marketingsitet — nødvendige, statistik- og marketing-cookies, samtykke, tredjeparter og dine rettigheder.",
  alternates: { canonical: "https://qlim8.com/cookies" },
  openGraph: {
    title: "Cookieerklæring | qlim8",
    description: "Oversigt over de cookies, qlim8 bruger.",
    url: "https://qlim8.com/cookies",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 cookieerklæring" }],
  },
};

export default function Page() {
  return <CookiePolicy />;
}
