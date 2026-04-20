"use client";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SiteHeaderProps {
  isHome?: boolean;
}

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            {!isHome && (
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
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://app.qlim8.com/auth"
              className="text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
              data-testid="button-signin"
            >
              Login / Opret bruger
            </a>

            <div className="relative" data-site-header>
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
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  <a
                    href="https://app.qlim8.com/auth"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                    data-testid="menu-try-free"
                  >
                    Prøv gratis
                  </a>
                  <a
                    href="/produkt"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    data-testid="menu-features"
                  >
                    Features
                  </a>
                  <a
                    href="/pricing"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    data-testid="menu-pricing"
                  >
                    Priser
                  </a>
                  <a
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    data-testid="menu-about"
                  >
                    About
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
