import type { Metadata } from "next";
import Landing from "@/page-components/landing";

export const metadata: Metadata = {
  title: "qlim8 » Automatisk Klimaregnskab & ESG til SMV (Fra 250 kr/md)",
  description:
    "ESG behøver ikke være dyrt. Få overblik over Scope 1, 2 & 3 samt en færdig VSME-rapport. Slip for dyre konsulenter. Fra 250 kr/md ved årsabonnement.",
  alternates: { canonical: "https://qlim8.com/" },
  openGraph: {
    title: "qlim8 » Automatisk Klimaregnskab & ESG til SMV",
    description:
      "ESG behøver ikke være dyrt. Få overblik over Scope 1, 2 & 3 samt en færdig VSME-rapport. Fra 250 kr/md.",
    url: "https://qlim8.com/",
    images: [{ url: "/opengraph.jpg", width: 1200, height: 630, alt: "qlim8" }],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "qlim8",
            url: "https://qlim8.com",
            logo: "https://qlim8.com/favicon.svg",
            description:
              "Automatisk klimaregnskab og ESG-rapportering til danske SMV'er.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "DK",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer support",
              email: "hej@qlim8.com",
            },
            sameAs: ["https://app.qlim8.com"],
          }),
        }}
      />
      <Landing />
    </>
  );
}
