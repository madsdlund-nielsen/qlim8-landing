import type { Metadata } from "next";
import Kontakt from "@/page-components/kontakt";
import { resolvePageCopy } from "@/lib/pageCopy";
import { CONTACT_PAGE_KEY, CONTACT_COPY } from "@/content/copy/contact";
import { JsonLd } from "@/components/JsonLd";
import { CONTACT_PAGE_SCHEMA } from "@/lib/pageSchemas";

// ISR: CMS-published copy refreshes on this cadence.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Book en demo eller kontakt qlim8",
  description:
    "Book en demo af qlim8, eller stil et spørgsmål om klimaregnskab og ESG. Skriv via formularen, send en email eller ring på +45 93 90 13 84.",
  alternates: { canonical: "https://qlim8.com/kontakt" },
  openGraph: {
    title: "Book en demo eller kontakt qlim8",
    description:
      "Book en demo af qlim8, eller stil et spørgsmål om klimaregnskab og ESG. Ring på +45 93 90 13 84.",
    url: "https://qlim8.com/kontakt",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "Kontakt qlim8" }],
  },
};

export default async function Page() {
  const copy = await resolvePageCopy(CONTACT_PAGE_KEY, CONTACT_COPY);
  return (
    <>
      <JsonLd schema={CONTACT_PAGE_SCHEMA} />
      <Kontakt copy={copy} />
    </>
  );
}
