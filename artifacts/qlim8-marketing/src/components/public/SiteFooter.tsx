export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex-shrink-0">
            <a href="/" className="inline-block mb-3">
              <span className="font-bold text-lg tracking-tight text-white">qlim8</span>
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href="/karriere" className="hover:text-white transition-colors">Karriere</a>
            <a href="/kontakt" className="hover:text-white transition-colors">Kontakt</a>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <a href="/pricing" className="hover:text-white transition-colors">Priser</a>
          </nav>

          <a
            href="https://app.qlim8.com/auth"
            className="self-start px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-full transition-colors whitespace-nowrap"
          >
            Prøv gratis
          </a>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2 text-xs text-gray-600 text-center">
          <span>© {new Date().getFullYear()} qlim8 · CVR DK46033736</span>
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
