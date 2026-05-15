import { Linkedin } from "lucide-react";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Produkt",
    links: [
      { label: "Priser", href: "/priser" },
      { label: "Metodologi", href: "/metodologi" },
      { label: "API", href: "/api" },
    ],
  },
  {
    heading: "Ressourcer",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "Status", href: "https://status.qlim8.com" },
    ],
  },
  {
    heading: "Selskab",
    links: [
      { label: "Om os", href: "/om-os" },
      { label: "Karriere", href: "/karriere" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privatlivspolitik", href: "/privatlivspolitik" },
  { label: "Handelsbetingelser", href: "/handelsbetingelser" },
  { label: "Cookies", href: "/cookies" },
];

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-4">
            <a href="/" className="inline-block">
              <span className="font-bold text-xl tracking-tight text-white">qlim8</span>
            </a>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              ESG uden besværet. Klimaregnskab, scope-3 og rapportering bygget til danske SMV'er.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/qlim8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="qlim8 på LinkedIn"
                className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-gray-500 pt-2">CVR DK46033736</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-y-3 gap-x-6 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} qlim8 · CVR DK46033736</span>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="text-[11px] text-gray-600 text-center mt-6">
          Logoer for tredjepartsintegrationer tilhører deres respektive ejere.
        </p>
      </div>
    </footer>
  );
}
