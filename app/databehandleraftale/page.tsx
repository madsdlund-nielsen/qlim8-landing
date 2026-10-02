import type { Metadata } from "next";
import Databehandleraftale from "@/page-components/databehandleraftale";
import { resolvePageCopy } from "@/lib/pageCopy";
import { LEGAL_DPA_PAGE_KEY, LEGAL_DPA_COPY } from "@/content/copy/legal";

// ISR: CMS-published copy refreshes on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Databehandleraftale",
  description:
    "qlim8's databehandleraftale efter GDPR artikel 28: hvordan vi behandler personoplysninger i kundens data, underdatabehandlere, sikkerhed og sletning.",
  alternates: { canonical: "https://qlim8.com/databehandleraftale" },
  openGraph: {
    title: "Databehandleraftale | qlim8",
    description: "qlim8's databehandleraftale for ESG-platformen.",
    url: "https://qlim8.com/databehandleraftale",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8 databehandleraftale" }],
  },
};

export default async function Page() {
  const copy = await resolvePageCopy(LEGAL_DPA_PAGE_KEY, LEGAL_DPA_COPY);
  return <Databehandleraftale copy={copy} />;
}
