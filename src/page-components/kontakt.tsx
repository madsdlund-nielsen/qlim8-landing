import { ContactForm } from "@/components/public/ContactForm";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { CONTACT_COPY, type ContactCopy } from "@/content/copy/contact";

// All copy lives in src/content/copy/contact.ts (pageKey "page.contact");
// app/kontakt/page.tsx passes the CMS-merged result. A server component: only
// the form needs a hook, so only ContactForm is "use client".
export default function Kontakt({ copy = CONTACT_COPY }: { copy?: ContactCopy }) {
  return (
    <div className="min-h-screen bg-background">
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
            <ContactForm submitLabel={copy.form.submitLabel} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.info.title}</h2>
            <a
              href={`tel:${copy.info.phone.replace(/\s+/g, "")}`}
              className="mb-8 block rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary transition-colors"
              data-testid="link-call"
            >
              <span className="block text-sm text-gray-500 mb-1">Hellere tale sammen? Ring direkte</span>
              <span className="block text-2xl font-bold text-gray-900">{copy.info.phone}</span>
            </a>
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
            <p className="mt-10 text-sm text-gray-600">
              Vil du bare følge med?{" "}
              <a href="/nyhedsbrev" className="text-primary font-semibold hover:underline">
                Tilmeld dig nyhedsbrevet
              </a>
            </p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
