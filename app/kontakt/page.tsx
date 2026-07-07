import type { Metadata } from "next";
import Kontakt from "@/page-components/kontakt";
import { resolvePageCopy } from "@/lib/pageCopy";
import { CONTACT_PAGE_KEY, CONTACT_COPY } from "@/content/copy/contact";

// ISR — CMS-published copy refreshes on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Kontakt qlim8 – Vi er her for at hjælpe",
  description:
    "Har du spørgsmål om klimaregnskab, ESG eller qlim8? Kontakt os via formularen eller send en email. Vi svarer altid hurtigt.",
  alternates: { canonical: "https://qlim8.com/kontakt" },
  openGraph: {
    title: "Kontakt qlim8 – Vi er her for at hjælpe",
    description:
      "Har du spørgsmål om klimaregnskab, ESG eller qlim8? Vi svarer altid hurtigt.",
    url: "https://qlim8.com/kontakt",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Kontakt qlim8" }],
  },
};

export default async function Page() {
  const copy = await resolvePageCopy(CONTACT_PAGE_KEY, CONTACT_COPY);
  return <Kontakt copy={copy} />;
}
