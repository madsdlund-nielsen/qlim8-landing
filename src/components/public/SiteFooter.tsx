import { Linkedin } from "lucide-react";
import { FOOTER_SOLUTIONS } from "@/content/navigation";
import Image from "next/image";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, CONTACT_HREF, DEMO_HREF, DEMO_LABEL, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Løsninger",
    links: FOOTER_SOLUTIONS.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    heading: "Produkt",
    links: [
      { label: "Pakker", href: "/priser" },
      { label: "Metodologi", href: "/metodologi" },
      { label: "API", href: "/api" },
    ],
  },
  {
    heading: "Ressourcer",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Nyhedsbrev", href: "/nyhedsbrev" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    heading: "Selskab",
    links: [
      { label: "Om os", href: "/om-os" },
      { label: "Karriere", href: "/karriere" },
      { label: DEMO_LABEL, href: DEMO_HREF },
      { label: "Kontakt", href: CONTACT_HREF },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privatlivspolitik", href: "/privatlivspolitik" },
  { label: "Handelsbetingelser", href: "/handelsbetingelser" },
  { label: "Databehandleraftale", href: "/databehandleraftale" },
  { label: "Cookies", href: "/cookies" },
];

export function SiteFooter() {
  return (
    <footer className="bg-band py-14 text-muted-foreground sm:py-20">
      <div className="mx-auto max-w-(--container-max) px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <Image src="/brand/qlim8-laas-primaer.svg" alt="qlim8" width={496} height={182} className="h-14 w-auto" />
            </a>
            <p className="max-w-xs text-body-sm text-muted-foreground">
              ESG er nemt. Klimaregnskab, scope-3 og rapportering bygget til danske SMV'er.
            </p>
            <p className="text-body-sm">
              <a href={PHONE_HREF} className="font-semibold text-sage underline-offset-4 hover:underline">
                {PHONE_DISPLAY}
              </a>
              <br />
              <a href={CONTACT_EMAIL_HREF} className="font-semibold text-sage underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/qlim8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="qlim8 på LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-strong text-primary transition-colors duration-200 hover:bg-card"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <p className="pt-2 text-trust text-muted-foreground">CVR DK46033736</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 font-sans text-body font-semibold text-primary">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-body-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-x-6 gap-y-3 border-t border-sand pt-6 text-trust text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} qlim8 · CVR DK46033736</span>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors duration-200 hover:text-primary">
                {link.label}
              </a>
            ))}
            <CookieSettingsButton className="transition-colors duration-200 hover:text-primary" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
