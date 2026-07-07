"use client";
import { ArrowRight } from "lucide-react";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ABOUT_COPY, type AboutCopy } from "@/content/copy/about";

// All copy lives in src/content/copy/about.ts (pageKey "page.about");
// app/om-os/page.tsx passes the CMS-merged result. `founderImage` is
// CMS-overridable (pageKey "about.images", key "founder") and defaults to
// the bundled public asset.
export default function About({
  copy = ABOUT_COPY,
  founderImage = "/branding/founder-mugshot.png",
}: {
  copy?: AboutCopy;
  founderImage?: string;
}) {
  const handleGetAccess = () => {
    window.location.href = "/priser";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-24 sm:pb-28">
        <header className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            {copy.hero.subtitle}
          </p>
        </header>

        <section className="border-t border-gray-200 pt-10 mb-14">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <img
                src={founderImage}
                alt={copy.founder.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-1">
                {copy.founder.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{copy.founder.role}</p>
              <p className="text-gray-700 text-base leading-relaxed">
                {copy.founder.body}
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-10 mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-8">
            {copy.beliefs.title}
          </h2>
          <dl className="space-y-7">
            {copy.beliefs.items.map((belief) => (
              <div key={belief.title}>
                <dt className="font-bold text-gray-900 mb-1">{belief.title}</dt>
                <dd className="text-gray-700 leading-relaxed">
                  {belief.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-gray-900 text-gray-100 rounded-2xl p-7 sm:p-10 mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 leading-tight text-white">
            {copy.company.title}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-gray-400 mb-0.5">{copy.company.cvrLabel}</dt>
              <dd className="text-gray-200">{copy.company.cvr}</dd>
            </div>
            <div>
              <dt className="text-gray-400 mb-0.5">{copy.company.foundedLabel}</dt>
              <dd className="text-gray-200">{copy.company.founded}</dd>
            </div>
            <div>
              <dt className="text-gray-400 mb-0.5">{copy.company.hostingLabel}</dt>
              <dd className="text-gray-200">{copy.company.hosting}</dd>
            </div>
            <div>
              <dt className="text-gray-400 mb-0.5">{copy.company.contactLabel}</dt>
              <dd>
                <a href={`mailto:${copy.company.contactEmail}`} className="text-gray-200 hover:text-white transition-colors">
                  {copy.company.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
            {copy.outro.title}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-7 max-w-xl">
            {copy.outro.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/priser"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              {copy.outro.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${copy.company.contactEmail}`}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-900 font-semibold text-base hover:border-gray-300 transition-colors"
            >
              {copy.outro.ctaSecondary}
            </a>
          </div>
        </section>
      </article>

      <SiteFooter />

      <MobileStickyCTA
        text={copy.outro.ctaPrimary}
        onClick={handleGetAccess}
        showAfterScroll={300}
      />
    </div>
  );
}
