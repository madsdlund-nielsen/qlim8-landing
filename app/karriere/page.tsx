import type { Metadata } from "next";
import Karriere from "@/page-components/karriere";

export const metadata: Metadata = {
  title: "Karriere | Bliv en del af qlim8",
  description:
    "Vi søger passionerede mennesker der vil hjælpe danske virksomheder med at blive mere bæredygtige. Se ledige stillinger eller send en uopfordret ansøgning til qlim8.",
  alternates: { canonical: "https://qlim8.com/karriere" },
  openGraph: {
    title: "Karriere | Bliv en del af qlim8",
    description:
      "Vi søger passionerede mennesker der vil hjælpe danske virksomheder med at blive mere bæredygtige.",
    url: "https://qlim8.com/karriere",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Karriere hos qlim8" }],
  },
};

export default function Page() {
  return <Karriere />;
}
