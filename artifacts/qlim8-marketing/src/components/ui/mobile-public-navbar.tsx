import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Logo } from "@/components/ui/logo";

interface MobilePublicNavbarProps {
  onGetAccess: () => void;
  onSignIn?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function MobilePublicNavbar({ onGetAccess, onSignIn, showBackButton, onBack }: MobilePublicNavbarProps) {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <a href="/" data-testid="link-logo">
            <Logo type="vertical" className="h-10 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-product">
              {t('nav.product')}
            </a>
            <a href="/viden" className="text-sm text-gray-600 hover:text-gray-900 transition-colors" data-testid="link-viden">
              Viden
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {onSignIn && (
            <button 
              onClick={onSignIn}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
              data-testid="button-signin"
            >
              {t('nav.signIn')}
            </button>
          )}
          <Button 
            onClick={onGetAccess}
            className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-3 sm:px-4 py-2 h-9 sm:h-10"
            data-testid="button-get-access"
          >
            <span className="hidden sm:inline">{t('nav.getAccess')}</span>
            <span className="sm:hidden">Kom i gang</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
