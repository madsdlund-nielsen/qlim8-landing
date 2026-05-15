"use client";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function Karriere() {
  const openPositions: Array<{ title: string; department: string; location: string; type: string }> = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6" data-testid="text-karriere-title">
            Bliv en del af klimarevolutionen
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Vi søger passionerede mennesker, der vil hjælpe danske virksomheder med at blive mere bæredygtige. Er du klar til at gøre en forskel?
          </p>
        </div>

        <div className="bg-accent rounded-2xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 text-center">
          <p className="text-base sm:text-lg text-gray-700 font-medium">Der er i øjeblikket ingen ledige stillinger</p>
        </div>

        {openPositions.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Åbne stillinger</h2>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  data-testid={`card-position-${index}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">{position.title}</h3>
                      <p className="text-sm text-gray-500">{position.department}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-100 rounded-2xl p-6 sm:p-8 text-center">
          <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Kan du ikke finde den rette stilling?</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            Vi er altid interesserede i at høre fra dygtige mennesker. Send en uopfordret ansøgning til os.
          </p>
          <a 
            href="mailto:job@qlim8.com"
            className="inline-flex items-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base min-h-[48px]"
            data-testid="button-apply"
          >
            Send ansøgning
          </a>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
