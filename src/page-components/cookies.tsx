"use client";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Cookieerklæring
          </h1>
          <p className="text-sm text-gray-600">
            qlim8 ApS — marketingsite
            <br />
            Version: 1.0 · Senest opdateret: <span className="text-gray-500">[UDFYLDES INDEN GO-LIVE]</span>
          </p>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-[15px] prose-li:text-[15px] prose-li:my-1 prose-ul:my-3 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

          <h2>1. Hvad er cookies?</h2>
          <p>Cookies er små tekstfiler, som lagres på din enhed (computer, tablet eller smartphone), når du besøger vores hjemmeside. Cookies bruges til at få hjemmesiden til at fungere, til at huske dine valg, samt til at indsamle statistik om brugen af sitet.</p>
          <p>Vi bruger også andre teknologier, der ligner cookies, fx pixels og lokal lagring (local storage). I denne erklæring omfatter "cookies" alle disse teknologier.</p>

          <h2>2. Hvilke typer cookies bruger vi?</h2>

          <h3>2.1 Nødvendige cookies</h3>
          <p>Disse cookies er nødvendige for, at hjemmesiden kan fungere korrekt. De omfatter blandt andet cookies, der husker dine cookie-præferencer, og cookies der opretholder en session, mens du navigerer. Disse cookies sættes uden samtykke, jf. cookiebekendtgørelsens § 4.</p>

          <h3>2.2 Statistik-cookies</h3>
          <p>Statistik-cookies hjælper os med at forstå, hvordan besøgende bruger sitet, så vi kan forbedre indhold og navigation. Vi bruger fx Google Analytics eller tilsvarende værktøjer. Disse cookies sættes kun, hvis du giver samtykke.</p>

          <h3>2.3 Marketing-cookies</h3>
          <p>Marketing-cookies bruges til at vise relevant indhold og annoncer samt til at måle effekten af vores markedsføring. De kan også sættes af tredjeparter, fx LinkedIn. Disse cookies sættes kun, hvis du giver samtykke.</p>

          <h2>3. Oversigt over cookies</h2>
          <p>Nedenstående er en oversigt over de typer cookies, der kan blive sat på sitet. Den konkrete liste afhænger af de værktøjer, der er aktive på sitet, og opdateres løbende. En automatisk og altid opdateret oversigt vises i cookiebanneret på sitet.</p>

          <div className="overflow-x-auto my-6 not-prose">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-3 px-3 text-left font-bold text-gray-900">Cookie-navn</th>
                  <th className="py-3 px-3 text-left font-bold text-gray-900">Type</th>
                  <th className="py-3 px-3 text-left font-bold text-gray-900">Formål</th>
                  <th className="py-3 px-3 text-left font-bold text-gray-900">Varighed</th>
                  <th className="py-3 px-3 text-left font-bold text-gray-900">Udbyder</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3"><code className="text-xs">cookie_consent</code></td>
                  <td className="py-3 px-3">Nødvendig</td>
                  <td className="py-3 px-3">Husker dit cookie-samtykke</td>
                  <td className="py-3 px-3">12 måneder</td>
                  <td className="py-3 px-3">qlim8</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3"><code className="text-xs">session_id</code></td>
                  <td className="py-3 px-3">Nødvendig</td>
                  <td className="py-3 px-3">Opretholder sessionen ved navigation</td>
                  <td className="py-3 px-3">Sessionen</td>
                  <td className="py-3 px-3">qlim8</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3"><code className="text-xs">_ga, _ga_*</code></td>
                  <td className="py-3 px-3">Statistik</td>
                  <td className="py-3 px-3">Måler trafik og brug af sitet</td>
                  <td className="py-3 px-3">Op til 24 måneder</td>
                  <td className="py-3 px-3">Google</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-3"><code className="text-xs">hubspotutk, __hstc, __hssc</code></td>
                  <td className="py-3 px-3">Statistik / marketing</td>
                  <td className="py-3 px-3">Tracking og lead-attribution</td>
                  <td className="py-3 px-3">Op til 13 måneder</td>
                  <td className="py-3 px-3 text-gray-500">[udfyldes ved scanning]</td>
                </tr>
                <tr>
                  <td className="py-3 px-3"><code className="text-xs">li_at, lidc</code></td>
                  <td className="py-3 px-3">Marketing</td>
                  <td className="py-3 px-3">LinkedIn Insight Tag</td>
                  <td className="py-3 px-3">Op til 12 måneder</td>
                  <td className="py-3 px-3">LinkedIn</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p><em>Bemærk: Den endelige liste bør genereres ved en cookie-scanning af det faktiske site (fx via Cookiebot, Cookie Information eller Cookiehub) og automatisk indlejres i denne erklæring eller i cookiebanneret.</em></p>

          <h2>4. Samtykke</h2>
          <p>Når du første gang besøger vores site, vises et cookiebanner, hvor du kan vælge, hvilke typer cookies du ønsker at acceptere. Du kan vælge mellem at acceptere alle, kun nødvendige, eller selv vælge kategorier.</p>
          <p>Dit samtykke er gyldigt i op til 12 måneder, hvorefter du vil blive bedt om at tage stilling på ny. Du kan til enhver tid ændre eller tilbagekalde dit samtykke via cookieindstillingerne på sitet.</p>

          <h2>5. Sådan administrerer eller sletter du cookies</h2>
          <p>Du kan til enhver tid:</p>
          <ul>
            <li>Ændre dit samtykke via cookieindstillingerne på sitet (knap i cookiebanneret).</li>
            <li>Slette cookies fra din browser. Find vejledning i din browsers hjælpefunktion (fx Chrome, Firefox, Safari, Edge).</li>
            <li>Fravælge brug af cookies generelt via browserens indstillinger. Bemærk, at sitet ikke nødvendigvis fungerer optimalt uden cookies.</li>
          </ul>

          <h2>6. Tredjeparter</h2>
          <p>Nogle af de cookies, der sættes på sitet, kontrolleres af tredjeparter. Det betyder, at vi ikke kan kontrollere eller fjerne disse cookies via vores eget site. Du kan finde information om og fravælge tredjepartscookies på leverandørernes egne hjemmesider, fx:</p>
          <ul>
            <li>Google: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/cookies</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank" rel="noopener noreferrer">linkedin.com/legal/cookie-policy</a></li>
          </ul>

          <h2>7. Overførsel til tredjelande</h2>
          <p>Visse leverandører af tredjepartscookies (fx Google og LinkedIn) er etableret i USA, og brug af deres cookies kan indebære overførsel af personoplysninger til USA. Overførslen sker på grundlag af EU-US Data Privacy Framework og/eller EU-Kommissionens standardkontraktbestemmelser (SCC).</p>

          <h2>8. Behandling af personoplysninger</h2>
          <p>Når cookies indsamler personoplysninger, behandles disse i overensstemmelse med vores <a href="/privatlivspolitik">privatlivspolitik</a>.</p>

          <h2>9. Ændringer i cookieerklæringen</h2>
          <p>Vi kan opdatere denne erklæring i takt med, at vi tilføjer eller fjerner cookies på sitet, eller hvis lovgivningen ændres. Den til enhver tid gældende version er tilgængelig på sitet med angivelse af versionsnummer og opdateringsdato.</p>

          <h2>10. Kontakt</h2>
          <p>Spørgsmål til denne cookieerklæring kan rettes til:</p>
          <p>
            qlim8 ApS<br />
            E-mail: <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a><br />
            CVR: DK46033736
          </p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
