"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function Kontakt() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SiteHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6" data-testid="text-kontakt-title">
            Lad os tale sammen
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Har du spørgsmål om qlim8, klimaregnskab eller hvordan vi kan hjælpe din virksomhed? Vi er her for at hjælpe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Send os en besked</h2>
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Navn</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  placeholder="Dit fulde navn"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  placeholder="din@email.dk"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Virksomhed</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  placeholder="Dit virksomhedsnavn"
                  data-testid="input-company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Besked</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-base"
                  placeholder="Hvordan kan vi hjælpe dig?"
                  data-testid="input-message"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-base"
                data-testid="button-submit"
              >
                Send besked
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 mt-8 md:mt-0">Kontaktinformation</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                  <a href="mailto:kontakt@qlim8.com" className="text-sm sm:text-base text-primary hover:text-primary break-all">
                    kontakt@qlim8.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Telefon</h3>
                  <a href="tel:+4593901384" className="text-sm sm:text-base text-gray-600 hover:text-gray-900">
                    +45 93 90 13 84
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Adresse</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Odense, Danmark
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 bg-gray-50 rounded-xl p-5 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Åbningstider</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Mandag - Fredag: 9:00 - 17:00<br />
                Weekend: Lukket
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
