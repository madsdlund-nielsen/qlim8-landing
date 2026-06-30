import type { Metadata } from "next";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { UnsubscribeForm } from "@/components/public/UnsubscribeForm";

// Reachable only via a signed link in our emails — keep it out of search
// indexes and the sitemap (it is deliberately not listed in app/sitemap.ts).
export const metadata: Metadata = {
  title: "Afmeld nyhedsbrev | qlim8",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; token?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-10">
          <UnsubscribeForm id={sp.id ?? ""} token={sp.token ?? ""} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
