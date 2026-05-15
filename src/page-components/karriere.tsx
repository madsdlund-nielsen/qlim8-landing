"use client";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function Karriere() {
  const openPositions: Array<{ title: string; department: string; location: string; type: string }> = [];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-20 sm:pb-28">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.05] mb-6" data-testid="text-karriere-title">
            Karriere hos qlim8
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Vi søger passionerede mennesker, der vil hjælpe danske virksomheder med at blive mere bæredygtige. Er du klar til at gøre en forskel?
          </p>
        </header>

        <section className="border-t border-gray-200 pt-10 mb-12">
          <p className="text-lg text-gray-700">
            Der er i øjeblikket ingen ledige stillinger.
          </p>
        </section>

        {openPositions.length > 0 && (
          <section className="border-t border-gray-200 pt-10 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Åbne stillinger</h2>
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
            Kan du ikke finde den rette stilling?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-xl">
            Vi er altid interesserede i at høre fra dygtige mennesker. Send en uopfordret ansøgning til os.
          </p>
          <a
            href="mailto:job@qlim8.com"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors"
            data-testid="button-apply"
          >
            Send ansøgning
          </a>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
