import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface PublicHeaderProps {
  showBackButton?: boolean;
  showMobileMenu?: boolean;
  navLinks?: NavLink[];
  ctaButton?: CTAButton;
  mobileMenuItems?: Array<{ label: string; href?: string; onClick?: () => void }>;
}

export function PublicHeader({
  showBackButton = true,
  showMobileMenu = false,
  navLinks,
  ctaButton,
  mobileMenuItems,
}: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultNavLinks: NavLink[] = [];
  const links = navLinks ?? defaultNavLinks;

  return (
    <header className="sticky top-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            {showBackButton && (
              <a
                href="/"
                className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                data-testid="button-back"
              >
                ← Forside
              </a>
            )}
            <a href="/" data-testid="link-logo">
              <span className="text-2xl font-bold text-gray-900">qlim8</span>
            </a>
            {links.length > 0 && (
              <div className="hidden md:flex items-center gap-6">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm transition-colors ${
                      link.active
                        ? "text-gray-900 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    data-testid={`link-nav-${link.href.replace(/[/#]/g, '')}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {showMobileMenu && mobileMenuItems && (
              <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="h-5 w-5 text-gray-700" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {mobileMenuItems.map((item, i) => (
                    <DropdownMenuItem key={i} asChild>
                      {item.onClick ? (
                        <button onClick={item.onClick} className="cursor-pointer w-full text-left">
                          {item.label}
                        </button>
                      ) : (
                        <a href={item.href} className="cursor-pointer">
                          {item.label}
                        </a>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <a
              href="/auth"
              className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              data-testid="button-signin"
            >
              Login
            </a>
            {ctaButton && (
              ctaButton.href ? (
                <a
                  href={ctaButton.href}
                  className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all"
                  data-testid="button-get-access"
                >
                  {ctaButton.text}
                </a>
              ) : (
                <button
                  onClick={ctaButton.onClick}
                  className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all"
                  data-testid="button-get-access"
                >
                  {ctaButton.text}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
