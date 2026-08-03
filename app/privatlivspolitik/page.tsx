import type { Metadata } from "next";
import Privatlivspolitik from "@/page-components/privatlivspolitik";
import { resolvePageCopy } from "@/lib/pageCopy";
import { LEGAL_PRIVACY_PAGE_KEY, LEGAL_PRIVACY_COPY } from "@/content/copy/legal";

// ISR: CMS-published copy refreshes on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description:
    "Sådan behandler qlim8 ApS personoplysninger om besøgende, brugere og kunder: dataansvar, retsgrundlag, opbevaring og dine rettigheder under GDPR.",
  alternates: { canonical: "https://qlim8.com/privatlivspolitik" },
  openGraph: {
    title: "Privatlivspolitik | qlim8",
    description: "Sådan behandler qlim8 personoplysninger.",
    url: "https://qlim8.com/privatlivspolitik",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 privatlivspolitik" }],
  },
};

export default async function Page() {
  const copy = await resolvePageCopy(LEGAL_PRIVACY_PAGE_KEY, LEGAL_PRIVACY_COPY);
  return <Privatlivspolitik copy={copy} />;
}
