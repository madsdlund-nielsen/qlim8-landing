import type { Metadata } from "next";
import Metodologi from "@/page-components/metodologi";

export const metadata: Metadata = {
  title: "Metodologi — sådan beregner qlim8 dit klimaregnskab",
  description:
    "Alle emissionsfaktorer, datakilder og beregningsmetoder vi bruger til at producere dit scope 1-3 klimaregnskab. DEFRA, BEIS, Klimakompasset, GHG Protocol — fuld åbenhed, ingen sorte bokse.",
  alternates: { canonical: "https://qlim8.com/metodologi" },
  openGraph: {
    title: "qlim8 metodologi — alle emissionsfaktorer og beregninger",
    description:
      "Fuld åbenhed om kilder, faktorer og beregningsmetoder. DEFRA, BEIS, Klimakompasset, GHG Protocol.",
    url: "https://qlim8.com/metodologi",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 metodologi" }],
  },
};

export default function Page() {
  return <Metodologi />;
}
