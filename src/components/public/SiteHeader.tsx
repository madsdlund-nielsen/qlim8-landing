"use client";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SiteHeaderProps {
  isHome?: boolean;
}

const NAV_ITEMS = [
  { href: "/priser", label: "Priser" },
  { href: "/metodologi", label: "Metodologi" },
  { href: "/blog", label: "Blog" },
  { href: "/api", label: "API" },
];

export function SiteHeader({ isHome = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-site-header]")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-sm border-b border-gray-100"
      data-site-header
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" data-testid="link-logo" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">qlim8</span>
            {!isHome && (
              <span className="ml-4 text-xs sm:text-sm font-medium text-gray-500 hidden sm:inline">
                ← Forside
              </span>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-primary transition-colors"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://app.qlim8.com/auth"
              className="hidden sm:inline-flex text-sm font-medium px-3 py-1.5 text-gray-700 hover:text-primary transition-colors"
              data-testid="button-signin"
            >
              Log ind
            </a>
            <a
              href="https://app.qlim8.com/auth?tab=register"
              className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              data-testid="button-register"
            >
              Opret gratis konto
            </a>

            <div className="relative lg:hidden" data-site-header>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Åbn menu"
                data-testid="button-burger"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-gray-700" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-700" />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      data-testid={`menu-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="https://app.qlim8.com/auth"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100 sm:hidden"
                    data-testid="menu-signin"
                  >
                    Log ind
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
