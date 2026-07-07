"use client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CONTACT_COPY, type ContactCopy } from "@/content/copy/contact";

// All copy lives in src/content/copy/contact.ts (pageKey "page.contact");
// app/kontakt/page.tsx passes the CMS-merged result.
export default function Kontakt({ copy = CONTACT_COPY }: { copy?: ContactCopy }) {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <header className="mb-14">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6" data-testid="text-kontakt-title">
            {copy.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            {copy.hero.subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.form.title}</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base bg-white"
                  placeholder="Dit fulde navn"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base bg-white"
                  placeholder="din@email.dk"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Virksomhed</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base bg-white"
                  placeholder="Dit virksomhedsnavn"
                  data-testid="input-company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Besked</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-base bg-white"
                  placeholder="Hvordan kan vi hjælpe dig?"
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base rounded-full"
                data-testid="button-submit"
              >
                {copy.form.submitLabel}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.info.title}</h2>
            <dl className="space-y-6 text-base">
              <div>
                <dt className="font-semibold text-gray-900 mb-1">Email</dt>
                <dd>
                  <a href={`mailto:${copy.info.email}`} className="text-primary hover:underline break-all">
                    {copy.info.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-1">Telefon</dt>
                <dd>
                  <a href={`tel:${copy.info.phone.replace(/\s+/g, "")}`} className="text-gray-700 hover:text-gray-900">
                    {copy.info.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-1">Adresse</dt>
                <dd className="text-gray-700">{copy.info.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 mb-1">Åbningstider</dt>
                <dd className="text-gray-700">
                  {copy.info.hoursWeekdays}
                  <br />
                  {copy.info.hoursWeekend}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
