import { Leaf, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { PublicHeader } from "@/components/public/PublicHeader";
import { SeoHead } from "@/components/SeoHead";

export default function Kontakt() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SeoHead
        title="Kontakt qlim8 – Vi er her for at hjælpe"
        description="Har du spørgsmål om klimaregnskab, ESG eller qlim8? Kontakt os via formularen eller send en email. Vi svarer altid hurtigt."
        canonical="https://qlim8.com/kontakt"
      />
      <PublicHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-4 sm:mb-6">
            <Leaf className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
              Kontakt
            </span>
          </div>
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
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                  placeholder="Dit fulde navn"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                  placeholder="din@email.dk"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Virksomhed</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base"
                  placeholder="Dit virksomhedsnavn"
                  data-testid="input-company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Besked</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-base"
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
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                  <a href="mailto:kontakt@qlim8.com" className="text-sm sm:text-base text-emerald-600 hover:text-emerald-700 break-all">
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

      <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 rounded-lg">
                  <Leaf className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <div className="font-bold text-lg tracking-tight text-white">qlim8</div>
                </div>
              </a>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">{t('footer.company')}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors py-1 block">{t('footer.company.about')}</a></li>
                <li><a href="/karriere" className="hover:text-white transition-colors py-1 block">{t('footer.company.careers')}</a></li>
                <li><a href="/kontakt" className="hover:text-white transition-colors py-1 block">{t('footer.company.contact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">{t('footer.social')}</h4>
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" data-testid="link-linkedin">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-11 h-11 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" data-testid="link-twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-500">
            {t('footer.copyright')} · <a href="https://viridis-ramosa.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Design af viridis ramosa</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
