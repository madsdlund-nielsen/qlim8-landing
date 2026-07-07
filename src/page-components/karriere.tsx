"use client";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CAREERS_COPY, type CareersCopy } from "@/content/copy/careers";

// All copy lives in src/content/copy/careers.ts (pageKey "page.careers");
// app/karriere/page.tsx passes the CMS-merged result.
export default function Karriere({ copy = CAREERS_COPY }: { copy?: CareersCopy }) {
  const openPositions = copy.openPositions;

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6" data-testid="text-karriere-title">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {copy.hero.subtitle}
          </p>
        </header>

        {openPositions.length === 0 && (
          <section className="border-t border-gray-200 pt-10 mb-12">
            <p className="text-lg text-gray-700">
              {copy.noOpenings}
            </p>
          </section>
        )}

        {openPositions.length > 0 && (
          <section className="border-t border-gray-200 pt-10 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.openPositionsTitle}</h2>
            <ul className="divide-y divide-gray-200">
              {openPositions.map((position, index) => (
                <li
                  key={index}
                  className="py-6"
                  data-testid={`card-position-${index}`}
                >
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{position.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{position.department}</p>
                  <p className="text-sm text-gray-600">
                    {position.location} · {position.type}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {copy.unsolicited.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-xl">
            {copy.unsolicited.body}
          </p>
          <a
            href={`mailto:${copy.unsolicited.email}`}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            data-testid="button-apply"
          >
            {copy.unsolicited.buttonLabel}
          </a>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
