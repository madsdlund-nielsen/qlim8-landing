"use client";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { PRIMARY_NAV, type NavTop } from "@/content/navigation";
import { Wordmark } from "@/components/Wordmark";

interface SiteHeaderProps {
  isHome?: boolean;
}

const TRIGGER_CLASS =
  "bg-transparent text-gray-700 hover:text-primary hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-primary px-0 h-auto";

function MegaMenu({ item }: { item: NavTop }) {
  const groups = item.groups ?? [];
  const withBlurb = groups.length <= 2; // keep the wide Produkt menu compact
  return (
    <NavigationMenuContent>
      <div className="p-6" style={{ width: `min(90vw, ${Math.min(groups.length, 4) * 230 + 32}px)` }}>
        <div
          className="grid gap-x-8 gap-y-5"
          style={{ gridTemplateColumns: `repeat(${Math.min(groups.length, 4)}, minmax(0, 1fr))` }}
        >
          {groups.map((g) => (
            <div key={g.heading || item.label}>
              {g.heading && (
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  {g.heading}
                </p>
              )}
              <ul className="space-y-1">
                {g.items.map((leaf) => (
                  <li key={leaf.href}>
                    <NavigationMenuLink asChild>
                      <a href={leaf.href} className="block rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
                        <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                          {leaf.label}
                          {leaf.comingSoon && (
                            <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary">
                              Snart
                            </span>
                          )}
                        </span>
                        {withBlurb && leaf.blurb && (
                          <span className="block text-xs text-gray-500 mt-0.5">{leaf.blurb}</span>
                        )}
                      </a>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a
          href={item.href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Se alle {item.label.toLowerCase()} →
        </a>
      </div>
    </NavigationMenuContent>
  );
}

export function SiteHeader({ isHome = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

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
            {/* Full "laas" (wordmark + [climate]) needs ~160px width for the
                annotation to stay legible, so it is desktop-only; phones fall
                back to the wordmark alone, exactly as the design manual says
                below 160px. */}
            <Wordmark className="h-7 w-auto text-[#2b303b] sm:hidden" />
            <img
              src="/brand/qlim8-laas-primaer.svg"
              alt="qlim8"
              className="hidden h-14 w-auto sm:block"
            />
            {!isHome && (
              <span className="ml-4 text-xs sm:text-sm font-medium text-gray-500 hidden sm:inline">
                ← Forside
              </span>
            )}
          </a>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-5">
              {PRIMARY_NAV.map((item) =>
                item.groups && item.groups.length > 0 ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className={TRIGGER_CLASS} data-testid={`nav-${item.label.toLowerCase()}`}>
                      {item.label}
                    </NavigationMenuTrigger>
                    <MegaMenu item={item} />
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                        data-testid={`nav-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

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
                <div className="absolute right-0 top-full mt-2 w-72 max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                  {PRIMARY_NAV.map((item) =>
                    item.groups && item.groups.length > 0 ? (
                      <div key={item.label} className="border-b border-gray-100 last:border-0">
                        <button
                          onClick={() =>
                            setOpenSection((s) => (s === item.label ? null : item.label))
                          }
                          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            className={
                              "h-4 w-4 text-gray-400 transition-transform " +
                              (openSection === item.label ? "rotate-180" : "")
                            }
                          />
                        </button>
                        {openSection === item.label && (
                          <div className="pb-2">
                            <a
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="block px-6 py-2 text-sm font-semibold text-primary hover:bg-gray-50"
                            >
                              Se alle {item.label.toLowerCase()} →
                            </a>
                            {item.groups.map((g) =>
                              g.items.map((leaf) => (
                                <a
                                  key={leaf.href}
                                  href={leaf.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2 px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                                >
                                  {leaf.label}
                                  {leaf.comingSoon && (
                                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary">
                                      Snart
                                    </span>
                                  )}
                                </a>
                              )),
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        data-testid={`menu-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </a>
                    ),
                  )}
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
