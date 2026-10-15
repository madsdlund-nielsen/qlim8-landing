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
import Image from "next/image";
import { buttonStyles } from "@/components/ds/Button";
import { cn } from "@/lib/utils";
import { DEMO_HREF, DEMO_LABEL, FREE_START_CTA, LOGIN_URL } from "@/content/cta";
import { useSelfServe } from "@/components/public/SelfServeContext";

interface SiteHeaderProps {
  isHome?: boolean;
}

const TRIGGER_CLASS =
  "bg-transparent text-foreground hover:text-sage hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-sage px-0 h-auto text-body-sm font-semibold";

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
                <p className="text-trust font-semibold text-muted-foreground mb-3">
                  {g.heading}
                </p>
              )}
              <ul className="space-y-1">
                {g.items.map((leaf) => (
                  <li key={leaf.href}>
                    <NavigationMenuLink asChild>
                      <a
                        href={leaf.href}
                        className="block rounded-md px-3 py-2 hover:bg-band transition-colors duration-200"
                        style={leaf.depth ? { paddingLeft: `${12 + Math.min(leaf.depth, 3) * 12}px` } : undefined}
                      >
                        <span
                          className={
                            "flex items-center gap-2 text-sm " +
                            (leaf.depth ? "font-normal text-foreground" : "font-semibold text-primary")
                          }
                        >
                          {leaf.label}
                          {leaf.comingSoon && (
                            <span className="rounded-md bg-sand px-2 py-0.5 text-[10px] font-semibold text-primary">
                              Snart
                            </span>
                          )}
                        </span>
                        {withBlurb && leaf.blurb && (
                          <span className="block text-trust text-muted-foreground mt-0.5">{leaf.blurb}</span>
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
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-sage underline-offset-4 hover:underline"
        >
          Se alle {item.label.toLowerCase()} →
        </a>
      </div>
    </NavigationMenuContent>
  );
}

export function SiteHeader({ isHome = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const selfServe = useSelfServe();
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
      className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-sand"
      data-site-header
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" data-testid="link-logo" className="flex items-center">
            {/* Full "laas" (wordmark + [climate]) needs ~160px width for the
                annotation to stay legible, so it is desktop-only; phones fall
                back to the wordmark alone, exactly as the design manual says
                below 160px. */}
            <Image
              src="/brand/qlim8-ordmaerke-primaer.svg"
              alt="qlim8"
              width={496}
              height={182}
              priority
              className="h-7 w-auto sm:hidden"
            />
            <Image
              src="/brand/qlim8-laas-primaer.svg"
              alt="qlim8"
              width={496}
              height={182}
              priority
              className="hidden h-14 w-auto sm:block"
            />
            {!isHome && (
              <span className="ml-4 text-trust font-semibold text-muted-foreground hidden sm:inline">
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
                        className="text-body-sm font-semibold text-foreground hover:text-sage transition-colors duration-200"
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
              href={LOGIN_URL}
              className="hidden sm:inline-flex text-body-sm font-semibold px-3 py-1.5 text-foreground hover:text-sage transition-colors duration-200"
              data-testid="button-signin"
            >
              Log ind
            </a>
            {selfServe ? (
              <>
                <a
                  href={DEMO_HREF}
                  className={cn(buttonStyles({ variant: "outline" }), "hidden min-h-10 px-4 py-2 text-body-sm md:inline-flex")}
                  data-testid="button-book-demo"
                >
                  {DEMO_LABEL}
                </a>
                <a
                  href={FREE_START_CTA.href}
                  className={cn(buttonStyles({ variant: "primary" }), "min-h-10 px-3 py-2 text-body-sm sm:px-4")}
                  data-testid="button-free-start"
                >
                  {FREE_START_CTA.label}
                </a>
              </>
            ) : (
              <a
                href={DEMO_HREF}
                className={cn(buttonStyles({ variant: "primary" }), "min-h-10 px-3 py-2 text-body-sm sm:px-4")}
                data-testid="button-book-demo"
              >
                {DEMO_LABEL}
              </a>
            )}

            <div className="relative lg:hidden" data-site-header>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-2 hover:bg-band rounded-md transition-colors duration-200"
                aria-label="Åbn menu"
                data-testid="button-burger"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-primary" />
                ) : (
                  <Menu className="h-5 w-5 text-primary" />
                )}
              </button>

              {/* Always in the DOM, hidden by CSS until opened. The desktop
                  mega-menu is mounted by Radix only while open, so this drawer
                  is the one place the full site hierarchy (every collection
                  and every leaf) exists in the server-rendered HTML for a
                  crawler to follow. Gating it on state made the header
                  contribute no structural links at all. */}
              <nav
                aria-label="Menu"
                hidden={!menuOpen}
                className="absolute right-0 top-full mt-2 w-72 max-h-[80vh] overflow-y-auto bg-card rounded-lg shadow-soft border border-border z-50"
              >
                  {PRIMARY_NAV.map((item) =>
                    item.groups && item.groups.length > 0 ? (
                      <div key={item.label} className="border-b border-border last:border-0">
                        <button
                          onClick={() =>
                            setOpenSection((s) => (s === item.label ? null : item.label))
                          }
                          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-primary hover:bg-band transition-colors duration-200"
                        >
                          {item.label}
                          <ChevronDown
                            className={
                              "h-4 w-4 text-sage transition-transform " +
                              (openSection === item.label ? "rotate-180" : "")
                            }
                          />
                        </button>
                        <div className="pb-2" hidden={openSection !== item.label}>
                            <a
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="block px-6 py-2 text-sm font-semibold text-sage hover:bg-band"
                            >
                              Se alle {item.label.toLowerCase()} →
                            </a>
                            {item.groups.map((g) =>
                              g.items.map((leaf) => (
                                <a
                                  key={leaf.href}
                                  href={leaf.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex items-center gap-2 px-6 py-2 text-sm text-foreground hover:bg-band hover:text-primary transition-colors duration-200"
                                  style={leaf.depth ? { paddingLeft: `${24 + Math.min(leaf.depth, 3) * 12}px` } : undefined}
                                >
                                  {leaf.label}
                                  {leaf.comingSoon && (
                                    <span className="rounded-md bg-sand px-2 py-0.5 text-[10px] font-semibold text-primary">
                                      Snart
                                    </span>
                                  )}
                                </a>
                              )),
                            )}
                        </div>
                      </div>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-foreground hover:bg-band transition-colors duration-200 border-b border-border last:border-0"
                        data-testid={`menu-${item.label.toLowerCase()}`}
                      >
                        {item.label}
                      </a>
                    ),
                  )}
                  <a
                    href={LOGIN_URL}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-foreground hover:bg-band transition-colors duration-200 border-t border-border sm:hidden"
                    data-testid="menu-signin"
                  >
                    Log ind
                  </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
