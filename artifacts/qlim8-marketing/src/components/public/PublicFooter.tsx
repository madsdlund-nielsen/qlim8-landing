import { Leaf, Linkedin, Twitter } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PublicFooterProps {
  variant?: "minimal" | "full";
  language?: string;
}

export function PublicFooter({ variant = "full", language }: PublicFooterProps) {
  const { t } = useI18n();

  if (variant === "minimal") {
    const lang = language ?? "da";
    return (
      <footer className="relative z-20 bg-gray-900 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} qlim8, DK46033736.{" "}
          {lang === "da" ? "Alle rettigheder forbeholdes." : "All rights reserved."}
          <span className="hidden sm:inline"> · </span>
          <br className="sm:hidden" />
          <a
            href="https://viridis-ramosa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Design af viridis ramosa
          </a>
        </div>
      </footer>
    );
  }

  return (
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
            <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">{t('footer.product')}</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><a href="/#features" className="hover:text-white transition-colors py-1 block">{t('footer.product.command')}</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors py-1 block">{t('footer.product.ledger')}</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors py-1 block">{t('footer.product.reduction')}</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors py-1 block">{t('footer.product.reporting')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">{t('footer.company')}</h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors py-1 block">{t('footer.company.about')}</a></li>
              <li><a href="/viden" className="hover:text-white transition-colors py-1 block">{t('footer.company.customers')}</a></li>
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
  );
}
