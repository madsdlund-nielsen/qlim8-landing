import { Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 rounded-lg">
                <Leaf className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">qlim8</span>
            </a>
            <p className="text-xs text-gray-500">CVR DK46033736</p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href="/karriere" className="hover:text-white transition-colors">Karriere</a>
            <a href="/kontakt" className="hover:text-white transition-colors">Kontakt</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/pricing" className="hover:text-white transition-colors">Priser</a>
          </nav>

          <a
            href="https://app.qlim8.com/auth?tab=register"
            className="self-start px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap"
          >
            Prøv gratis
          </a>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} qlim8</span>
          <a
            href="https://viridis-ramosa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Design af viridis ramosa
          </a>
        </div>
      </div>
    </footer>
  );
}
