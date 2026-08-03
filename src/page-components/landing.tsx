"use client";
import { ArrowRight } from "lucide-react";
import { NewsletterSignupDialog } from "@/components/public/NewsletterSignupDialog";
import { SiteFooter } from "@/components/public/SiteFooter";
import { SiteHeader } from "@/components/public/SiteHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HOMEPAGE_FAQS, type HomepageFaq } from "@/content/homepage-faqs";
import { HOME_COPY, type HomeCopy } from "@/content/copy/home";
import { MarketingImage } from "@/components/public/MarketingImage";

import dashboardImg from "@assets/qlim8-Dashboard_(2)_1775843644408.jpg";
import kontrolcenterImg from "@assets/Feature_1_Kontrolcenter_1769884331461.jpg";
import klimahovedbogImg from "@assets/Feature_3_Klimahovedbog_1769884331462.jpg";
import rapporteringImg from "@assets/Feature_2_Rapportering_1769884331462.jpg";

const SIGNUP_URL = "https://app.qlim8.com/auth?tab=register";

// Bundled feature screenshots, by copy.features order.
const FEATURE_IMAGES = [kontrolcenterImg, klimahovedbogImg, rapporteringImg];

// All copy lives in src/content/copy/home.ts (pageKey "page.home");
// app/page.tsx passes the CMS-merged result. `faqs` defaults to the bundled
// list (pageKey "homepage.faqs"); marketing images are CMS-overridable
// (pageKey "landing.images") with bundled @assets fallbacks.
export interface LandingImages {
  hero?: string;
  features?: (string | undefined)[]; // by copy.features order
}

export default function Landing({
  copy = HOME_COPY,
  faqs = HOMEPAGE_FAQS,
  images = {},
}: {
  copy?: HomeCopy;
  faqs?: HomepageFaq[];
  images?: LandingImages;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F0] overflow-x-hidden">
      <SiteHeader isHome />

      {/* 1. Hero */}
      <section className="px-4 sm:px-6 pt-14 sm:pt-24 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-9">
            {copy.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              {copy.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <NewsletterSignupDialog />
          </div>
          <p className="text-sm text-gray-500 mb-14">
            {copy.hero.ctaNote}
          </p>

          <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <MarketingImage
              src={images.hero ?? dashboardImg}
              alt="qlim8 dashboard"
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* 2. Integrationsbånd */}
      <section className="py-16 sm:py-24 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-12">
            {copy.integrations.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-10">
            {copy.integrations.systems.map((name) => (
              <div key={name} className="text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">{name}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 mb-2">
            {copy.integrations.note1}
          </p>
          <p className="text-center text-sm text-gray-600">
            {copy.integrations.note2}
          </p>
          <p className="text-center text-base text-gray-700 mt-10 max-w-2xl mx-auto leading-relaxed">
            {copy.integrations.body}
          </p>
        </div>
      </section>

      {/* 3-5. Features */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-20 sm:space-y-28">
            {copy.features.map((f, i) => (
              <div
                key={f.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                    {f.title}
                  </h3>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-7">
                    {f.body}
                  </p>
                  <ul className="space-y-2 text-[15px] text-gray-800">
                    {f.bullets.map((b) => (
                      <li key={b} className="leading-relaxed">, {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <MarketingImage src={images.features?.[i] ?? FEATURE_IMAGES[i] ?? FEATURE_IMAGES[0]} alt={f.title} className="w-full h-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bygget anderledes */}
      <section className="py-20 sm:py-28 bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
              {copy.builtDifferent.title}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {copy.builtDifferent.intro}
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {copy.builtDifferent.commitments.map((c) => (
              <div key={c.title} className="border-t border-white/20 pt-7">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-snug">{c.title}</h3>
                <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-12">
            {copy.builtDifferent.sourcesNote}
          </p>
        </div>
      </section>

      {/* 7. Sådan kommer du i gang */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              {copy.steps.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {copy.steps.intro}
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-14">
            {copy.steps.items.map((s, i) => (
              <li key={s.title}>
                <p className="text-4xl font-bold text-gray-300 mb-4">{i + 1}</p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {s.title}
                </h3>
                <p className="text-gray-700 text-[15px] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
          <div>
            <a
              href={SIGNUP_URL}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            >
              {copy.steps.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-sm text-gray-500 mt-4">
              {copy.steps.ctaNote}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Pricing-teaser */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {copy.pricingTeaser.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {copy.pricingTeaser.plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-7 sm:p-8 border bg-white ${
                  p.highlighted ? "border-primary shadow-lg" : "border-gray-200"
                }`}
              >
                {p.badge && (
                  <p className="text-xs font-semibold text-gray-500 mb-3">
                    {p.badge}
                  </p>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">{p.price}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 min-h-[4rem]">{p.tag}</p>
                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                  {p.features.map((feat) => (
                    <li key={feat} className="leading-relaxed">, {feat}</li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  className={`block text-center px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    p.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-600">
            <a href="/priser" className="text-primary font-semibold hover:underline">
              {copy.pricingTeaser.linkLabel}
            </a>
          </p>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              {copy.faq.title}
            </h2>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-gray-200">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 py-5 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-[15px] leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-10 text-sm text-gray-600">
            <a href="/kontakt" className="text-primary font-semibold hover:underline">
              {copy.faq.linkLabel}
            </a>
          </p>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-20 sm:py-28 bg-[#F5F5F0] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
            {copy.finalCta.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-9 max-w-xl">
            {copy.finalCta.body}
          </p>
          <a
            href={SIGNUP_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
          >
            {copy.finalCta.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
