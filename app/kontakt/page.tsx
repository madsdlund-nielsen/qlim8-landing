import type { Metadata } from "next";
import Kontakt from "@/page-components/kontakt";
import { resolvePageCopy } from "@/lib/pageCopy";
import { CONTACT_PAGE_KEY, CONTACT_COPY } from "@/content/copy/contact";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildContactPageSchema } from "@/lib/schema";
import { contentDate } from "@/lib/contentDates";

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

const PAGE_SCHEMA = [
  buildContactPageSchema({
    name: "Kontakt qlim8",
    description:
      "Book en demo af qlim8, eller stil et spørgsmål om klimaregnskab og ESG via formularen, på email eller telefon.",
    dateModified: contentDate("/kontakt"),
  }),
  buildBreadcrumbSchema([
    { name: "qlim8", href: "/" },
    { name: "Kontakt", href: "/kontakt" },
  ]),
];

export default async function Page() {
  const copy = await resolvePageCopy(CONTACT_PAGE_KEY, CONTACT_COPY);
  return (
    <>
      <JsonLd schema={PAGE_SCHEMA} />
      <Kontakt copy={copy} />
    </>
  );
}
