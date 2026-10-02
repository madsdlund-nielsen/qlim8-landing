// Bundled default copy for the legal pages. CMS pageKeys:
//   /cookies             -> "page.legal.cookies"
//   /handelsbetingelser  -> "page.legal.terms"
//   /privatlivspolitik   -> "page.legal.privacy"
//   /databehandleraftale -> "page.legal.dpa"
// Each document body is a single rich-text HTML string rendered inside the
// page's prose wrapper; the CMS edits it with the rich-text editor (or raw
// HTML as fallback). Overrides are sanitized on write in qlim8-app.
//
// The terms and the data processing agreement are accepted at signup by
// version: qlim8-app's CURRENT_TERMS_VERSION (shared/entitlements/signup.ts)
// names the date in TERMS_EFFECTIVE below. Change the text, change both.

export const LEGAL_COOKIES_PAGE_KEY = "page.legal.cookies";
export const LEGAL_TERMS_PAGE_KEY = "page.legal.terms";
export const LEGAL_PRIVACY_PAGE_KEY = "page.legal.privacy";
export const LEGAL_DPA_PAGE_KEY = "page.legal.dpa";

export interface LegalCopy {
  title: string;
  metaLine: string;
  versionLine: string;
  bodyHtml: string;
  footerHtml: string;
}

/** The day the terms and the data processing agreement version 2.0 apply from. */
export const TERMS_EFFECTIVE = "3. oktober 2026";

const CONTACT_FOOTER = `Kontakt: qlim8 · CVR DK46033736 · Stenløkkevej 12, 5450 Otterup · <a href="mailto:kontakt@qlim8.com">kontakt@qlim8.com</a> · <a href="tel:+4593901384">+45 93 90 13 84</a>`;

export const LEGAL_COOKIES_COPY: LegalCopy = {
  title: "Cookieerklæring",
  metaLine: "qlim8: qlim8.com og app.qlim8.com",
  versionLine: "Version: 1.1 · Senest opdateret: 3. oktober 2026",
  bodyHtml: `<h2>1. Hvad er cookies?</h2>
<p>Cookies er små tekstfiler, som lagres på din enhed (computer, tablet eller smartphone), når du besøger en hjemmeside. De bruges til at få siden til at fungere, til at huske dine valg og til at indsamle statistik om brugen.</p>
<p>Vi bruger også lokal lagring i browseren (local storage), som virker på samme måde. I denne erklæring omfatter "cookies" begge dele.</p>
<p>Erklæringen gælder både vores hjemmeside qlim8.com og selve platformen på app.qlim8.com. De to har hver deres cookiebanner, og dit valg gælder for den side, hvor du træffer det.</p>
<h2>2. Hvilke typer cookies bruger vi?</h2>
<h3>2.1 Nødvendige</h3>
<p>Nødvendige cookies får siderne til at virke: de husker dit cookievalg, holder dig logget ind på platformen og beskytter betalinger mod svindel. De sættes uden samtykke, jf. cookiebekendtgørelsens § 4, stk. 2.</p>
<h3>2.2 Statistik</h3>
<p>Statistikcookies viser os, hvordan siderne bruges, så vi kan forbedre dem. Vi bruger Google Analytics på begge sider og PostHog på platformen, hvor PostHog også kan optage forløbet på skærmen med alle indtastningsfelter skjult. De sættes kun, hvis du giver samtykke til statistik.</p>
<h3>2.3 Marketing</h3>
<p>Marketingcookies måler, om vores annoncer hos Google fører til, at virksomheder opretter sig eller køber. De sættes kun, hvis du giver samtykke til marketing.</p>
<h2>3. Oversigt over cookies</h2>
<h3>3.1 qlim8.com</h3>
<table>
<thead>
<tr><th>Navn</th><th>Type</th><th>Formål</th><th>Varighed</th><th>Udbyder</th></tr>
</thead>
<tbody>
<tr><td><code>qlim8_cookie_consent</code> (lokal lagring)</td><td>Nødvendig</td><td>Husker dit cookievalg</td><td>12 måneder</td><td>qlim8</td></tr>
<tr><td><code>_ga</code>, <code>_ga_*</code></td><td>Statistik</td><td>Google Analytics: måler besøg og brug af siden</td><td>Op til 2 år</td><td>Google</td></tr>
<tr><td><code>_gcl_au</code></td><td>Marketing</td><td>Google Ads: måler, om en annonce førte til en henvendelse eller oprettelse</td><td>90 dage</td><td>Google</td></tr>
</tbody>
</table>
<h3>3.2 app.qlim8.com</h3>
<table>
<thead>
<tr><th>Navn</th><th>Type</th><th>Formål</th><th>Varighed</th><th>Udbyder</th></tr>
</thead>
<tbody>
<tr><td><code>connect.sid</code></td><td>Nødvendig</td><td>Holder dig logget ind</td><td>24 timer, eller 30 dage hvis du vælger at forblive logget ind</td><td>qlim8</td></tr>
<tr><td><code>qlim8_td</code></td><td>Nødvendig</td><td>Husker en enhed, du har godkendt, så du ikke skal bekræfte med to trin hver gang</td><td>30 dage</td><td>qlim8</td></tr>
<tr><td><code>qlim8_cookie_consent</code> (lokal lagring)</td><td>Nødvendig</td><td>Husker dit cookievalg</td><td>12 måneder</td><td>qlim8</td></tr>
<tr><td><code>__stripe_mid</code>, <code>__stripe_sid</code></td><td>Nødvendig</td><td>Svindelforebyggelse, når du betaler med kort i platformen</td><td>1 år og 30 minutter</td><td>Stripe</td></tr>
<tr><td><code>ph_*</code> (cookie og lokal lagring)</td><td>Statistik</td><td>PostHog: brug af platformen og sessionsoptagelse med skjulte indtastningsfelter</td><td>1 år</td><td>PostHog (data i EU)</td></tr>
<tr><td><code>_ga</code>, <code>_ga_*</code></td><td>Statistik</td><td>Google Analytics: måler brug af platformen</td><td>Op til 2 år</td><td>Google</td></tr>
<tr><td><code>_gcl_au</code></td><td>Marketing</td><td>Google Ads: måler, om en annonce førte til en oprettelse eller et køb</td><td>90 dage</td><td>Google</td></tr>
</tbody>
</table>
<p>Selve kortbetalingen sker på Stripes egen side (checkout.stripe.com), hvor Stripes egne vilkår og cookies gælder.</p>
<h2>4. Samtykke</h2>
<p>Første gang du besøger en af siderne, viser vi et cookiebanner. Du kan acceptere alle cookies, nøjes med de nødvendige eller vælge statistik og marketing hver for sig. Intet ud over de nødvendige sættes, før du har valgt.</p>
<p>Dit valg gælder i 12 måneder. Derefter spørger vi igen.</p>
<h2>5. Sådan ændrer du dit valg eller sletter cookies</h2>
<ul>
<li>Vælg "Cookieindstillinger" nederst på qlim8.com eller i cookiebanneret på platformen for at ændre eller trække dit samtykke tilbage. Trækker du samtykket tilbage, sletter vi de cookies, vi selv kan nå, og indlæser ikke værktøjerne igen.</li>
<li>Du kan slette cookies i din browser. Find vejledning i browserens hjælpefunktion (fx Chrome, Firefox, Safari eller Edge).</li>
<li>Du kan blokere cookies generelt i browseren. Blokerer du de nødvendige, kan du ikke logge ind på platformen.</li>
</ul>
<h2>6. Tredjeparter</h2>
<p>Google- og Stripe-cookies sættes og kontrolleres af Google og Stripe. Læs mere hos leverandørerne:</p>
<ul>
<li>Google: <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/cookies</a></li>
<li>Stripe: <a href="https://stripe.com/cookie-settings" target="_blank" rel="noopener noreferrer">stripe.com/cookie-settings</a></li>
<li>PostHog: <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">posthog.com/privacy</a></li>
</ul>
<h2>7. Overførsel til tredjelande</h2>
<p>Google, Stripe og PostHog er koncerner med hovedsæde i USA. Oplysninger fra statistik- og marketingcookies kan derfor overføres til USA. Overførslen sker på grundlag af EU-US Data Privacy Framework og/eller EU-Kommissionens standardkontraktbestemmelser. PostHog opbevarer vores data i EU.</p>
<h2>8. Behandling af personoplysninger</h2>
<p>Når cookies indsamler personoplysninger, behandles de efter vores <a href="/privatlivspolitik">privatlivspolitik</a>.</p>
<h2>9. Ændringer i cookieerklæringen</h2>
<p>Vi opdaterer erklæringen, når vi tilføjer eller fjerner cookies, eller når lovgivningen ændres. Den gældende version står her med versionsnummer og dato.</p>
<h2>10. Kontakt</h2>
<p>Spørgsmål til cookieerklæringen kan rettes til:</p>
<p>qlim8<br />E-mail: <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a><br />CVR: DK46033736</p>
`,
  footerHtml: "",
};

export const LEGAL_TERMS_COPY: LegalCopy = {
  title: "Handelsbetingelser",
  metaLine: "qlim8: ESG-platform (SaaS)",
  versionLine: `Version: 2.0 · Gældende fra: ${TERMS_EFFECTIVE}`,
  bodyHtml: `<h2>1. Indledning og aftalegrundlag</h2>
<p>1.1 Disse handelsbetingelser ("Betingelserne") regulerer aftalen mellem qlim8, CVR-nr. DK46033736, Stenløkkevej 12, 5450 Otterup ("Leverandøren") og den erhvervsdrivende kunde ("Kunden"), der opretter en konto på eller køber adgang til Leverandørens ESG-platform ("Tjenesten").</p>
<p>1.2 Betingelserne gælder for alle pakker, uanset om Kunden opretter sig selv på qlim8.com eller app.qlim8.com, køber en pakke i Tjenesten eller indgår aftale på grundlag af et tilbud eller en Ordrebekræftelse.</p>
<p>1.3 Tjenesten udbydes alene til erhvervsdrivende. Forbrugerbeskyttelseslovgivningen, herunder fortrydelsesretten efter forbrugeraftaleloven, finder ikke anvendelse.</p>
<p>1.4 <a href="/databehandleraftale">Databehandleraftalen</a> er en del af aftalen og accepteres sammen med Betingelserne. For behandling af personoplysninger går Databehandleraftalen forud for Betingelserne.</p>
<p>1.5 Ved uoverensstemmelse mellem en Ordrebekræftelse og Betingelserne går Ordrebekræftelsen forud. Kundens egne indkøbsbetingelser finder ikke anvendelse, medmindre Leverandøren skriftligt har accepteret dem.</p>
<h2>2. Definitioner</h2>
<p><strong>"Tjenesten"</strong>: Den ESG-platform, herunder moduler, dashboards, rapporter, integrationer og API'er, som Leverandøren stiller til rådighed som software-as-a-service.</p>
<p><strong>"Pakke"</strong>: Det abonnement, Kunden har adgang til: Free, Starter, Premium, Business eller Enterprise for virksomheder, eller Revisor og Konsulent for rådgivere. Hvad hver pakke indeholder, fremgår af pakkesiden på <a href="https://qlim8.com/priser">qlim8.com/priser</a> på tidspunktet for købet eller af Ordrebekræftelsen.</p>
<p><strong>"Brugere"</strong>: Fysiske personer, som Kunden giver adgang til Tjenesten (typisk medarbejdere og rådgivere).</p>
<p><strong>"Kundedata"</strong>: Alle data, herunder ESG-data, regnskabsdata, dokumenter og oplysninger, som Kunden eller dennes Brugere uploader, indtaster, henter via en integration eller danner i Tjenesten.</p>
<p><strong>"Abonnementsperiode"</strong>: Den periode på 12 måneder, som en betalt Pakke løber og betales for ad gangen.</p>
<p><strong>"Prøveperiode"</strong>: Den gratis periode, der kan gå forud for den første Abonnementsperiode på Starter og Premium, jf. pkt. 5.</p>
<p><strong>"Ordrebekræftelse"</strong>: Ved køb i Tjenesten den kvittering og faktura, Kunden modtager pr. e-mail. Ved Business og Enterprise det skriftlige tilbud eller den bekræftelse, der angiver Pakke, pris og særlige vilkår.</p>
<h2>3. Konto og aftalens indgåelse</h2>
<p>3.1 Kunden opretter en konto med en e-mailadresse, som bekræftes med en kode, og angiver virksomhedens registreringsnummer (CVR-nummer eller EU-momsnummer). Aftalen om Free er indgået, når Kunden har accepteret Betingelserne og Databehandleraftalen ved oprettelsen.</p>
<p>3.2 Starter og Premium købes i Tjenesten med betalingskort. Aftalen om den betalte Pakke er indgået, når købet er gennemført. Business og Enterprise aftales efter dialog med Leverandøren, og aftalen er indgået, når Kunden accepterer tilbuddet eller Ordrebekræftelsen.</p>
<p>3.3 Der kan oprettes én Free-konto pr. registreringsnummer. Leverandøren kan afvise eller lukke en konto, der er oprettet med urigtige oplysninger.</p>
<p>3.4 Den person, der accepterer aftalen på vegne af Kunden, indestår for at være berettiget til at forpligte Kunden.</p>
<h2>4. Pakker</h2>
<p>4.1 <strong>Free</strong> er gratis og har ingen udløbsdato. Leverandøren kan ændre indholdet af Free eller ophøre med at tilbyde Free med 30 dages varsel. Kunden kan i varslingsperioden eksportere sine Kundedata eller vælge en betalt Pakke.</p>
<p>4.2 <strong>Starter</strong> og <strong>Premium</strong> købes af Kunden selv og betales med kort. Ved første køb kan der gælde en Prøveperiode, jf. pkt. 5.</p>
<p>4.3 <strong>Business</strong> og <strong>Enterprise</strong> aftales efter dialog med Leverandøren og betales mod faktura. De har ingen Prøveperiode.</p>
<p>4.4 <strong>Revisor</strong> og <strong>Konsulent</strong> er gratis Pakker til rådgivere, der arbejder i deres klienters data. Den enkelte klient bestemmer, hvad rådgiveren må se og gøre i klientens data, og kan til enhver tid trække adgangen tilbage. Rådgiveren er selv ansvarlig for sit aftaleforhold med klienten.</p>
<p>4.5 Kunden kan til enhver tid opgradere fra Starter til Premium i Tjenesten. Opgraderingen gælder straks, og forskellen i pris for resten af Abonnementsperioden opkræves med det samme. En nedgradering gælder fra udløbet af den igangværende Abonnementsperiode.</p>
<p>4.6 Overskrider Kunden grænserne i sin Pakke, fx efter en nedgradering, låses organisationen ("pakkelås"), indtil forholdet er bragt i orden. Under en pakkelås kan Kunden se og eksportere sine data, fjerne brugere og forbindelser og købe en større Pakke, men ikke tilføje nye data eller danne nye rapporter.</p>
<h2>5. Prøveperiode</h2>
<p>5.1 Ved første køb af Starter eller Premium får Kunden en gratis Prøveperiode på 7 dage, medmindre Kundens organisation tidligere har haft et abonnement på Starter eller Premium, herunder en Prøveperiode. Free, Business, Enterprise, Revisor og Konsulent har ingen Prøveperiode. Prøveperiodens længde vises ved købet.</p>
<p>5.2 Kunden angiver sit betalingskort, når Prøveperioden starter. Opsiger Kunden ikke inden Prøveperiodens udløb, overgår Pakken automatisk til et betalt abonnement med en Abonnementsperiode på 12 måneder, og årsprisen trækkes på kortet ved Prøveperiodens udløb.</p>
<p>5.3 Kunden kan opsige i Prøveperioden i Tjenesten under Konto (Administrer abonnement). Der trækkes da intet beløb, og når Prøveperioden udløber, fortsætter organisationen på Free.</p>
<h2>6. Tjenesten</h2>
<p>6.1 Tjenesten leveres som standardiseret SaaS via internettet og omfatter de funktioner, der hører til Kundens Pakke.</p>
<p>6.2 Leverandøren udvikler løbende Tjenesten og kan tilføje, ændre eller fjerne funktionalitet, så længe den samlede funktionalitet i Kundens Pakke i al væsentlighed bevares i Abonnementsperioden.</p>
<p>6.3 Tjenesten bruger sprogmodeller (kunstig intelligens) til blandt andet at kategorisere posteringer, læse data ud af dokumenter og besvare spørgsmål. Resultaterne er forslag, som Kunden bør kontrollere, og Kunden er ansvarlig for de tal og rapporter, Kunden bruger.</p>
<p>6.4 Tjenesten leveres "as is". Leverandøren indestår ikke for, at Tjenesten opfylder Kundens specifikke forretningsmæssige eller compliance-behov, herunder konkrete rapporteringskrav under CSRD, ESRS, VSME, GHG-protokollen eller anden ESG-regulering. Kunden er selv ansvarlig for at vurdere egnetheden.</p>
<h2>7. Adgang og brugsret</h2>
<p>7.1 Kunden får i aftalens løbetid en ikke-eksklusiv, ikke-overdragelig brugsret til Tjenesten til Kundens interne erhvervsmæssige brug, inden for grænserne i Kundens Pakke.</p>
<p>7.2 Adgang sker via personlige brugerkonti. Login-oplysninger må ikke deles. Kunden er ansvarlig for alle handlinger, der foretages under Kundens konti.</p>
<p>7.3 Kunden må ikke (i) videresælge, udleje eller stille Tjenesten til rådighed for tredjemand ud over det, Pakken giver adgang til, (ii) reverse-engineere eller kopiere Tjenesten, (iii) bruge Tjenesten til at udvikle konkurrerende tjenester, eller (iv) bruge Tjenesten i strid med gældende lovgivning.</p>
<p>7.4 Leverandøren kan suspendere adgangen uden varsel ved væsentligt misbrug eller mistanke om sikkerhedsbrud. Ved manglende betaling gælder pkt. 8.5.</p>
<h2>8. Pris og betaling</h2>
<p>8.1 Priserne fremgår af pakkesiden på qlim8.com/priser eller af Ordrebekræftelsen og er angivet i DKK eksklusive moms. Moms opkræves efter gældende regler. Har Kunden et gyldigt momsnummer i et andet EU-land, gælder reglerne om omvendt betalingspligt.</p>
<p>8.2 Starter og Premium betales årligt forud med betalingskort via Leverandørens betalingsudbyder (Stripe). Kunden giver Leverandøren tilladelse til at trække årsprisen ved købet eller ved Prøveperiodens udløb og derefter ved hver fornyelse. Kvittering og faktura sendes pr. e-mail og kan hentes i Tjenesten.</p>
<p>8.3 Business og Enterprise faktureres årligt forud og betales ved bankoverførsel. Betalingsbetingelserne er netto 30 dage fra fakturadato.</p>
<p>8.4 Ved opgradering i en Abonnementsperiode opkræves forskellen for resten af perioden straks, jf. pkt. 4.5.</p>
<p>8.5 Mislykkes en kortbetaling ved fornyelse, eller er en faktura ikke betalt ved forfald, giver Leverandøren Kunden besked, og Tjenesten fortsætter uændret i 7 dage. Er betalingen ikke sket herefter, låses organisationen som beskrevet i pkt. 4.6, indtil der er betalt. For fakturaer påløber morarenter efter rentelovens § 5 og et rykkergebyr på 100 kr. pr. rykker, jf. rentelovens § 9 b.</p>
<p>8.6 Leverandøren kan én gang årligt regulere priserne med et varsel på 60 dage. En prisregulering gælder fra Kundens næste Abonnementsperiode. Prisreguleringer ud over udviklingen i nettoprisindekset giver Kunden ret til at opsige aftalen med virkning fra reguleringens ikrafttræden.</p>
<p>8.7 Betalt vederlag refunderes ikke ved opsigelse eller nedgradering i en igangværende Abonnementsperiode, medmindre andet følger af Betingelserne eller af ufravigelig lovgivning.</p>
<h2>9. Abonnementsperiode, fornyelse og opsigelse</h2>
<p>9.1 Betalte Pakker løber i Abonnementsperioder på 12 måneder og fornyes automatisk for 12 måneder ad gangen, medmindre de opsiges.</p>
<p>9.2 Starter og Premium kan til enhver tid opsiges i Tjenesten under Konto (Administrer abonnement) eller skriftligt til kontakt@qlim8.com. Opsigelsen gælder fra udløbet af den igangværende Abonnementsperiode.</p>
<p>9.3 Business og Enterprise kan opsiges skriftligt til kontakt@qlim8.com med et varsel på mindst 3 måneder til udløbet af den igangværende Abonnementsperiode. Leverandøren sender cirka 4 måneder før udløbet et fornyelsesvarsel til Kundens fakturamodtager og administratorer med fornyelsesdato, pris og sidste frist for opsigelse.</p>
<p>9.4 Leverandøren kan opsige en betalt Pakke med 3 måneders varsel til udløbet af en Abonnementsperiode. Ved Kundens væsentlige misligholdelse kan Leverandøren ophæve aftalen uden varsel.</p>
<p>9.5 Når en betalt Pakke ophører, fortsætter organisationen på Free, så Kundens data bevares. Har organisationen flere brugere eller forbindelser, end Free tillader, gælder pkt. 4.6.</p>
<p>9.6 Kunden kan til enhver tid bede om at få sin konto lukket. Ved lukning har Kunden 30 dage til at eksportere Kundedata i et standardformat. Herefter sletter Leverandøren Kundedata, medmindre opbevaring følger af lovgivning, jf. Databehandleraftalen.</p>
<h2>10. Kundens forpligtelser og data</h2>
<p>10.1 Kunden er ansvarlig for, at Kundedata er korrekte, opdaterede og lovligt indhentede, og for at have det fornødne grundlag for at behandle eventuelle personoplysninger i Kundedata.</p>
<p>10.2 Kunden må ikke uploade CPR-numre eller følsomme personoplysninger, medmindre det er nødvendigt for Kundens brug af Tjenesten og lovligt.</p>
<p>10.3 Kunden indestår for, at Kundens brug af Tjenesten ikke krænker tredjemands rettigheder eller gældende lovgivning.</p>
<p>10.4 Kunden skal sikre Brugernes login med rimelige foranstaltninger og straks underrette Leverandøren ved mistanke om uautoriseret adgang.</p>
<h2>11. Integrationer og tredjepartstjenester</h2>
<p>11.1 Kunden kan forbinde Tjenesten med tredjepartstjenester, fx regnskabs- og lønsystemer, Eloverblik, Google Drive, Microsoft 365, Slack, Teams og Zapier. Forbindelsen oprettes og afbrydes af Kunden, og brugen af tredjepartstjenesten sker på tredjepartens egne vilkår.</p>
<p>11.2 Leverandøren er ikke ansvarlig for tredjepartstjenesters tilgængelighed eller for rigtigheden af de data, de leverer. Data, som Kunden lader Tjenesten sende til en tredjepartstjeneste, er Kundens ansvar.</p>
<h2>12. Service og support</h2>
<p>12.1 Leverandøren tilstræber en oppetid på 99,5 % målt månedligt, eksklusive planlagt vedligehold.</p>
<p>12.2 Planlagt vedligehold varsles så vidt muligt mindst 48 timer i forvejen og lægges normalt uden for almindelig kontortid.</p>
<p>12.3 Support ydes via e-mail på hverdage kl. 9–16 dansk tid. Pakker med chat- eller telefonsupport fremgår af pakkesiden. Eventuelle særlige svartider fremgår af Ordrebekræftelsen.</p>
<h2>13. Databehandling og persondata</h2>
<p>13.1 I det omfang Leverandøren behandler personoplysninger på vegne af Kunden, er Kunden dataansvarlig og Leverandøren databehandler. Behandlingen er reguleret af <a href="/databehandleraftale">Databehandleraftalen</a>, som opfylder kravene i GDPR artikel 28 og indeholder listen over godkendte underdatabehandlere.</p>
<p>13.2 For Leverandørens egen behandling af personoplysninger om Kundens kontaktpersoner, Brugere og besøgende henvises til Leverandørens <a href="/privatlivspolitik">privatlivspolitik</a>.</p>
<h2>14. Immaterielle rettigheder</h2>
<p>14.1 Alle rettigheder til Tjenesten, herunder kildekode, design, dokumentation og varemærker, tilhører Leverandøren eller dennes licensgivere. Aftalen overdrager ingen rettigheder ud over brugsretten i pkt. 7.</p>
<p>14.2 Kundedata tilhører Kunden. Kunden giver Leverandøren en ikke-eksklusiv ret til at behandle Kundedata i det omfang, det er nødvendigt for at levere, vedligeholde og forbedre Tjenesten, inden for rammerne af Databehandleraftalen.</p>
<p>14.3 Leverandøren må bruge aggregerede og anonymiserede data udledt af Tjenesten til statistik, benchmarking og produktudvikling, så længe hverken Kunden eller enkeltpersoner kan identificeres.</p>
<p>14.4 Forslag og feedback fra Kunden, som indarbejdes i Tjenesten, tilhører Leverandøren uden vederlag til Kunden.</p>
<h2>15. Fortrolighed</h2>
<p>15.1 Parterne skal behandle ikke-offentlige oplysninger om hinandens forretning fortroligt og må alene bruge dem til at opfylde aftalen. Fortrolighedsforpligtelsen gælder også efter aftalens ophør.</p>
<p>15.2 Leverandøren må bruge Kundens navn og logo som reference på sin hjemmeside og i markedsføringsmateriale, medmindre Kunden skriftligt modsætter sig det.</p>
<h2>16. Ansvar og ansvarsbegrænsning</h2>
<p>16.1 Parterne er erstatningsansvarlige efter dansk rets almindelige regler med de begrænsninger, der følger af pkt. 16.2-16.4.</p>
<p>16.2 Leverandøren er ikke ansvarlig for indirekte tab, herunder driftstab, avancetab, tab af data, tab af goodwill, bod eller dagbøder, eller for tab som følge af beslutninger, Kunden træffer på grundlag af Tjenestens resultater, herunder rapportering under ESG-regulering.</p>
<p>16.3 Leverandørens samlede erstatningsansvar over for Kunden er for hver periode på 12 måneder begrænset til det beløb, Kunden har betalt for Tjenesten i de 12 måneder, der går forud for det skadevoldende forhold.</p>
<p>16.4 Begrænsningerne i pkt. 16.2-16.3 gælder ikke ved grov uagtsomhed eller forsæt.</p>
<h2>17. Force majeure</h2>
<p>17.1 Parterne er ikke ansvarlige for manglende eller forsinket opfyldelse som følge af forhold uden for deres rimelige kontrol, herunder krig, terror, naturkatastrofer, strømsvigt, generalstrejke, pandemi, omfattende cyberangreb og myndighedsforanstaltninger.</p>
<p>17.2 Force majeure skal meddeles den anden part uden ugrundet ophold.</p>
<h2>18. Ændringer i betingelserne</h2>
<p>18.1 Leverandøren kan ændre Betingelserne med et varsel på 30 dage pr. e-mail eller i Tjenesten. Væsentlige ændringer, som stiller Kunden ringere, giver Kunden ret til at opsige aftalen med virkning fra ændringernes ikrafttræden.</p>
<p>18.2 Mindre ændringer, fx præciseringer eller ændringer som følge af lovkrav, kan gennemføres uden varsel.</p>
<h2>19. Overdragelse</h2>
<p>19.1 Kunden kan ikke overdrage sine rettigheder eller forpligtelser uden Leverandørens forudgående skriftlige samtykke.</p>
<p>19.2 Leverandøren kan overdrage aftalen til et koncernforbundet selskab eller som led i en virksomhedsoverdragelse.</p>
<h2>20. Lovvalg og værneting</h2>
<p>20.1 Aftalen er undergivet dansk ret med undtagelse af regler, der medfører anvendelse af andet lands ret.</p>
<p>20.2 Tvister, der ikke kan løses i mindelighed, afgøres ved Retten i Odense som første instans.</p>
`,
  footerHtml: CONTACT_FOOTER,
};

export const LEGAL_PRIVACY_COPY: LegalCopy = {
  title: "Privatlivspolitik",
  metaLine: "qlim8: qlim8.com og ESG-platformen på app.qlim8.com",
  versionLine: "Version: 2.0 · Senest opdateret: 3. oktober 2026",
  bodyHtml: `<h2>1. Dataansvarlig</h2>
<p>Dataansvarlig for behandlingen af dine personoplysninger er:</p>
<p>qlim8<br />Stenløkkevej 12, 5450 Otterup<br />CVR: DK46033736<br />E-mail: <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a><br />Telefon: <a href="tel:+4593901384">+45 93 90 13 84</a></p>
<p>Spørgsmål om denne politik eller dine rettigheder kan rettes til ovenstående.</p>
<h2>2. Hvornår gælder politikken</h2>
<p>Politikken beskriver, hvordan vi behandler personoplysninger, når du:</p>
<ul>
<li>besøger qlim8.com eller vores blog,</li>
<li>tilmelder dig vores nyhedsbrev eller kontakter os,</li>
<li>opretter en konto, selv eller efter en invitation, og bruger platformen på app.qlim8.com som kunde, bruger eller rådgiver,</li>
<li>køber en pakke, starter en prøveperiode eller modtager en faktura fra os.</li>
</ul>
<p>Når en virksomhed lægger data i platformen, som indeholder personoplysninger (fx om medarbejdere, leverandører eller kunder), er virksomheden dataansvarlig, og vi er databehandler. Det er reguleret i vores <a href="/databehandleraftale">databehandleraftale</a>. Se afsnit 7.</p>
<h2>3. Hvilke personoplysninger behandler vi</h2>
<h3>3.1 Besøgende på qlim8.com</h3>
<ul>
<li>Hvis du giver samtykke til statistik eller marketing: IP-adresse, browser, enhed, besøgte sider og hvorfra du kom (Google Analytics og Google Ads).</li>
<li>Det, du skriver i kontaktformularen: emne, navn, e-mail, virksomhed, telefon og besked.</li>
</ul>
<h3>3.2 Nyhedsbrev</h3>
<ul>
<li>Din e-mail og eventuelt dit navn, tidspunktet for tilmeldingen og hvor du tilmeldte dig.</li>
<li>Om nyhedsbrevet bliver leveret, åbnet og klikket på (via Resend).</li>
</ul>
<h3>3.3 Oprettelse af konto</h3>
<ul>
<li>Navn, e-mail, adgangskode (gemt som krypteret hash), om du opretter dig som virksomhed eller rådgiver, og hvilken pakke du valgte.</li>
<li>En engangskode til at bekræfte din e-mail (gemt krypteret og kun kortvarigt).</li>
<li>Hvornår du accepterede handelsbetingelserne og databehandleraftalen, og hvilken version.</li>
<li>IP-adresse og browser i vores sikkerhedslog.</li>
</ul>
<h3>3.4 Virksomhedsoplysninger</h3>
<p>Når du angiver din virksomheds CVR-nummer eller EU-momsnummer, slår vi det op i CVR-registeret (via Erhvervsstyrelsen og cvrapi.dk) eller i EU's momsregister (VIES) og henter navn, adresse, branche, juridisk form og antal ansatte, som du derefter bekræfter eller retter. Vi sender kun nummeret. For enkeltmandsvirksomheder er oplysningerne personoplysninger. Registerets svar gemmes i op til 30 dage, så vi ikke slår samme nummer op igen.</p>
<h3>3.5 Brugere af platformen</h3>
<ul>
<li>Kontaktoplysninger: navn, arbejds-e-mail, telefon, rolle og organisation.</li>
<li>Login: adgangskode-hash, totrinsbekræftelse og de enheder, du har godkendt.</li>
<li>Log-in-historik (tidspunkt, IP-adresse, browser) i 90 dage.</li>
<li>En revisionslog over handlinger i platformen med tidspunkt, bruger og IP-adresse.</li>
<li>Supporthenvendelser og de notifikationer, vi sender dig.</li>
</ul>
<h3>3.6 Køb, prøveperiode og betaling</h3>
<ul>
<li>Kortbetaling sker hos Stripe. Vi modtager aldrig det fulde kortnummer.</li>
<li>Stripe får virksomhedens navn, adresse og momsnummer samt e-mailen på den, der køber.</li>
<li>Vi gemmer, hvilken pakke organisationen har, abonnementets status, prøveperiodens udløb og fakturaerne.</li>
<li>Ved Business og Enterprise: fakturamodtagerens e-mail og et eventuelt indkøbsordrenummer.</li>
</ul>
<h3>3.7 Produktanalyse og fejl</h3>
<ul>
<li>Platformen registrerer udvalgte hændelser (fx oprettelse, køb og fejl) i PostHog med dit bruger-id og din organisation, så vi kan rette fejl og forstå, hvordan platformen bruges.</li>
<li>Hvis du giver samtykke til statistik i platformens cookiebanner, registreres også sidevisninger, klik og en optagelse af forløbet på skærmen, hvor indtastningsfelter er skjult (PostHog), samt brug målt med Google Analytics.</li>
<li>Hvis du giver samtykke til marketing, måler Google Ads, om en annonce førte til en oprettelse eller et køb.</li>
</ul>
<h3>3.8 Energidata fra Eloverblik</h3>
<p>Når en kunde giver fuldmagt via Eloverblik (Energinet DataHub), henter vi forbrugs- og produktionsdata for kundens målepunkter: stamdata (målepunkts-ID, adresse, installationstype, netvirksomhed), tidsserier i kWh og tilknyttede priser og tariffer. Adgangen kan til enhver tid trækkes tilbage i Eloverblik.</p>
<h3>3.9 Regnskabs- og lønsystemer</h3>
<p>Når en kunde forbinder sit regnskabssystem (fx e-conomic, Dinero, Billy, Uniconta, Xero, QuickBooks, Business Central eller NetSuite), henter vi kontoplan og posteringer med beløb, datoer, kontonumre og bilagstekst, leverandøroplysninger og de bilag, der er nødvendige for at kategorisere udgifterne. Oplysninger om enkeltmandsvirksomheder er personoplysninger.</p>
<p>Fra lønsystemer henter vi kun samlede tal (fx antal ansatte og lønsum), ikke oplysninger om den enkelte medarbejder. Pendlerdata, som en kunde uploader, gemmes kun samlet for grupper på mindst fem personer og uden postnumre.</p>
<h3>3.10 Sprogmodeller (kunstig intelligens)</h3>
<p>For at kategorisere posteringer, læse data ud af fakturaer og produktdokumenter og besvare spørgsmål i Klimaagenten sender platformen bilagstekst, dokumenter og spørgsmål til Ordbogen.ai, der driver sprogmodellerne i Danmark. CPR-numre fjernes fra posteringernes tekst, før den sendes. Ordbogen.ai behandler oplysningerne som vores databehandler og kun for at levere svaret.</p>
<h2>4. Formål og retsgrundlag</h2>
<ul>
<li><strong>Konto, platform og kundeforhold</strong> (oprettelse, bekræftelse, firmaopslag, drift, support, fornyelsesvarsler): opfyldelse af aftale, GDPR art. 6, stk. 1, litra b, for kundens kontaktpersoner, og legitim interesse, litra f, for øvrige brugere, fordi det er nødvendigt for at levere platformen til kunden.</li>
<li><strong>Køb, prøveperiode og betaling</strong>: opfyldelse af aftale, litra b.</li>
<li><strong>Sikkerhed og logning</strong>: legitim interesse, litra f, i at beskytte platformen og kundernes data.</li>
<li><strong>Produktanalyse og fejlretning uden cookies</strong>: legitim interesse, litra f, i at rette fejl og forbedre platformen.</li>
<li><strong>Statistik, sessionsoptagelse og annoncemåling</strong>: samtykke, litra a, jf. cookiebekendtgørelsen.</li>
<li><strong>Nyhedsbrev</strong>: samtykke, litra a, og markedsføringslovens § 10.</li>
<li><strong>Bogføring og fakturaer</strong>: retlig forpligtelse, litra c, efter bogføringsloven.</li>
</ul>
<h2>5. Cookies</h2>
<p>Vi bruger nødvendige cookies uden samtykke og statistik- og marketingcookies kun med dit samtykke. Se den fulde liste i vores <a href="/cookies">cookieerklæring</a>. Du kan ændre dit valg under "Cookieindstillinger" nederst på qlim8.com eller i platformens cookiebanner.</p>
<h2>6. Nyhedsbrev</h2>
<p>Du tilmelder dig ved at angive din e-mail og acceptere at modtage nyhedsbrevet, og du får en velkomstmail. Vi registrerer, hvornår og hvor du tilmeldte dig. Du kan altid afmelde dig via linket nederst i hvert nyhedsbrev. Vi gemmer dokumentation for samtykket i op til 2 år efter afmelding for at kunne dokumentere, at markedsføringsloven er overholdt.</p>
<h2>7. Kundens data (vi er databehandler)</h2>
<p>Data, som en kunde lægger i platformen, behandler vi kun efter kundens instruks og efter vores <a href="/databehandleraftale">databehandleraftale</a>. Er du medarbejder hos en kunde eller nævnt i en kundes data, skal henvendelser om dine rettigheder rettes til kunden som dataansvarlig. Vi hjælper kunden med at besvare dem.</p>
<h2>8. Modtagere og databehandlere</h2>
<p>Vi bruger en EU-baseret kerneinfrastruktur. Personoplysninger deles med:</p>
<ul>
<li><strong>Hetzner Online GmbH</strong> (Tyskland): servere, database og fillager i Tyskland.</li>
<li><strong>Ordbogen.ai</strong> (Danmark): sprogmodeller, jf. afsnit 3.10.</li>
<li><strong>Resend, Inc.</strong> (USA): udsendelse af e-mails og nyhedsbrev.</li>
<li><strong>Stripe Payments Europe Ltd.</strong> (Irland), en del af Stripe-koncernen: betaling, abonnementer, moms og fakturaer. Stripe er selvstændigt dataansvarlig for de oplysninger, Stripe selv skal bruge til betalingen og til at forebygge svindel.</li>
<li><strong>PostHog, Inc.</strong> (USA, data opbevares i EU): produktanalyse og fejlregistrering, jf. afsnit 3.7.</li>
<li><strong>Google Ireland Ltd.</strong>: Google Analytics og Google Ads, kun med samtykke.</li>
<li>Rådgivere (revisor, advokat) under deres tavshedspligt, og offentlige myndigheder, når loven kræver det.</li>
</ul>
<p>Vi henter oplysninger fra CVR-registeret (Erhvervsstyrelsen og cvrapi.dk), EU's momsregister (VIES), Energinet DataHub (Eloverblik) og de regnskabs- og lønsystemer, en kunde forbinder. Integrationer, som en kunde selv opretter for at sende data ud (fx Google Drive, Microsoft 365, Slack, Teams, Zapier, Notion, Airtable, HubSpot og Salesforce), sender data på kundens vegne og ansvar.</p>
<h2>9. Overførsel til tredjelande</h2>
<p>Platformens servere, database og sprogmodeller er placeret i EU/EØS. Resend, Stripe, PostHog og Google er dog koncerner med hovedsæde i USA, og oplysninger kan derfor overføres til USA. Resend opbevarer kontodata, logs og metadata om e-mails i USA. Overførslerne sker på grundlag af EU-US Data Privacy Framework, når modtageren er certificeret, og ellers EU-Kommissionens standardkontraktbestemmelser. Du kan få en kopi af grundlaget ved at kontakte os.</p>
<h2>10. Opbevaringstid</h2>
<ul>
<li><strong>Brugerkonti og platformdata</strong>: så længe kundeforholdet består. Lukkes en konto, har kunden 30 dage til at eksportere sine data, hvorefter de slettes. Sikkerhedskopier slettes, efterhånden som de udløber.</li>
<li><strong>Log-in-historik</strong>: 90 dage.</li>
<li><strong>Revisionslog</strong>: så længe organisationen findes. Sletter du din bruger, fjernes e-mail, IP-adresse og browser fra loggen, mens selve handlingerne bevares, så kundens data kan dokumenteres.</li>
<li><strong>Opslag i CVR og VIES</strong>: 30 dage.</li>
<li><strong>Fakturaer og bogføringsmateriale</strong>: 5 år fra udgangen af det regnskabsår, de vedrører, jf. bogføringsloven.</li>
<li><strong>Nyhedsbrev</strong>: indtil du afmelder dig, og dokumentation for samtykket i op til 2 år derefter.</li>
<li><strong>Kontaktformular</strong>: op til 2 år efter din seneste henvendelse.</li>
<li><strong>Cookies</strong>: som angivet i <a href="/cookies">cookieerklæringen</a>.</li>
</ul>
<h2>11. Dine rettigheder</h2>
<p>Du har efter databeskyttelsesforordningen ret til:</p>
<ul>
<li><strong>Indsigt</strong> i de oplysninger, vi behandler om dig.</li>
<li><strong>Berigtigelse</strong> af urigtige oplysninger.</li>
<li><strong>Sletning</strong> i visse tilfælde. Du kan selv slette din bruger under Konto i platformen.</li>
<li><strong>Begrænsning</strong> af behandlingen i visse tilfælde.</li>
<li><strong>Dataportabilitet</strong>: at få dine oplysninger i et struktureret, almindeligt anvendt format.</li>
<li><strong>Indsigelse</strong> mod behandling på grundlag af legitim interesse, herunder direkte markedsføring.</li>
<li><strong>Tilbagekaldelse af samtykke</strong> til enhver tid. Det påvirker ikke lovligheden af behandlingen før tilbagekaldelsen.</li>
</ul>
<p>Skriv til <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a>. Vi svarer uden ugrundet ophold og senest inden for én måned.</p>
<h2>12. Sikkerhed</h2>
<p>Vi beskytter personoplysninger med passende tekniske og organisatoriske foranstaltninger, blandt andet adgangsstyring med roller, totrinsbekræftelse, kryptering under transport, krypterede adgangsnøgler til integrationer, logning, sikkerhedskopier og en revisionslog, der ikke kan ændres bagefter.</p>
<p>Ved et sikkerhedsbrud, der indebærer høj risiko for dig, underretter vi dig og Datatilsynet efter GDPR art. 33-34.</p>
<h2>13. Klage til Datatilsynet</h2>
<p>Du kan klage til Datatilsynet, hvis du er utilfreds med vores behandling af dine personoplysninger:</p>
<p>Datatilsynet<br />Carl Jacobsens Vej 35, 2500 Valby<br />Telefon: 33 19 32 00<br />E-mail: <a href="mailto:dt@datatilsynet.dk">dt@datatilsynet.dk</a><br />Web: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a></p>
<h2>14. Ændringer i politikken</h2>
<p>Vi opdaterer politikken, når vores behandling ændrer sig. Den gældende version står her med versionsnummer og dato. Ved væsentlige ændringer giver vi besked pr. e-mail eller i platformen.</p>
`,
  footerHtml: `Kontakt: qlim8 · CVR DK46033736 · Stenløkkevej 12, 5450 Otterup · <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a>`,
};

export const LEGAL_DPA_COPY: LegalCopy = {
  title: "Databehandleraftale",
  metaLine: "qlim8: ESG-platform (SaaS) · Bilag til handelsbetingelserne",
  versionLine: `Version: 2.0 · Gældende fra: ${TERMS_EFFECTIVE}`,
  bodyHtml: `<p>Denne databehandleraftale ("Aftalen") er indgået mellem kunden, der har accepteret qlim8's <a href="/handelsbetingelser">handelsbetingelser</a> ("den dataansvarlige"), og qlim8, CVR-nr. DK46033736, Stenløkkevej 12, 5450 Otterup ("databehandleren"). Aftalen accepteres sammen med handelsbetingelserne, når kunden opretter en konto, og gælder, så længe databehandleren behandler personoplysninger for den dataansvarlige. Aftalen bygger på Datatilsynets standardkontraktbestemmelser efter databeskyttelsesforordningens artikel 28, stk. 3.</p>
<h2>1. Formål og anvendelse</h2>
<p>1.1 Aftalen fastsætter parternes rettigheder og forpligtelser, når databehandleren behandler personoplysninger på vegne af den dataansvarlige for at levere ESG-platformen ("Tjenesten") efter handelsbetingelserne.</p>
<p>1.2 Aftalen er udformet for at sikre, at parterne overholder databeskyttelsesforordningen (EU) 2016/679 ("forordningen") og databeskyttelsesloven.</p>
<p>1.3 Behandlingen er beskrevet i bilag A, de godkendte underdatabehandlere står i bilag B, og den dataansvarliges instruks og sikkerhedskravene står i bilag C.</p>
<p>1.4 Aftalen har forrang for tilsvarende bestemmelser i handelsbetingelserne, for så vidt angår behandling af personoplysninger.</p>
<h2>2. Den dataansvarliges rettigheder og forpligtelser</h2>
<p>2.1 Den dataansvarlige er ansvarlig for, at behandlingen sker i overensstemmelse med forordningen, og har både ret og pligt til at træffe beslutninger om formålet med og hjælpemidlerne til behandlingen.</p>
<p>2.2 Den dataansvarlige er ansvarlig for, at der er hjemmel til den behandling, databehandleren instrueres i at foretage, og for de oplysninger, den dataansvarlige lægger i Tjenesten.</p>
<h2>3. Databehandleren handler efter instruks</h2>
<p>3.1 Databehandleren behandler kun personoplysninger efter dokumenteret instruks fra den dataansvarlige, medmindre det kræves i henhold til EU-ret eller national ret. Instruksen fremgår af bilag C. Den dataansvarliges brug og opsætning af Tjenesten, herunder valg af integrationer, udgør også instruks.</p>
<p>3.2 Databehandleren underretter straks den dataansvarlige, hvis en instruks efter databehandlerens vurdering er i strid med forordningen eller anden databeskyttelseslovgivning.</p>
<h2>4. Fortrolighed</h2>
<p>4.1 Databehandleren giver kun adgang til personoplysningerne til personer, der har behov for det, og som har forpligtet sig til fortrolighed eller er underlagt lovbestemt tavshedspligt. Adgangen fratages, når behovet ophører.</p>
<h2>5. Behandlingssikkerhed</h2>
<p>5.1 Databehandleren gennemfører de tekniske og organisatoriske foranstaltninger, der kræves efter forordningens artikel 32, under hensyn til det aktuelle tekniske niveau, implementeringsomkostningerne og behandlingens karakter, omfang, sammenhæng og formål samt risiciene for de registrerede. Foranstaltningerne er beskrevet i bilag C.2.</p>
<h2>6. Anvendelse af underdatabehandlere</h2>
<p>6.1 Den dataansvarlige giver med Aftalen generel godkendelse til, at databehandleren anvender underdatabehandlere. De underdatabehandlere, der anvendes ved Aftalens indgåelse, står i bilag B.</p>
<p>6.2 Databehandleren underretter den dataansvarlige pr. e-mail eller i Tjenesten om planlagte ændringer i form af tilføjelse eller udskiftning af underdatabehandlere med mindst 30 dages varsel. Den dataansvarlige kan inden for varslet gøre indsigelse. Kan parterne ikke finde en løsning, kan den dataansvarlige opsige aftalen om Tjenesten med virkning fra ændringens ikrafttræden.</p>
<p>6.3 Databehandleren pålægger underdatabehandlere de samme databeskyttelsesforpligtelser som i Aftalen og forbliver over for den dataansvarlige ansvarlig for underdatabehandlernes opfyldelse af dem.</p>
<h2>7. Overførsel til tredjelande</h2>
<p>7.1 Overførsel af personoplysninger til lande uden for EU/EØS sker kun efter dokumenteret instruks fra den dataansvarlige og i overensstemmelse med forordningens kapitel V. Den dataansvarlige instruerer hermed databehandleren i at foretage de overførsler, der følger af bilag B og C.6.</p>
<h2>8. Bistand til den dataansvarlige</h2>
<p>8.1 Databehandleren bistår så vidt muligt den dataansvarlige med passende tekniske og organisatoriske foranstaltninger med at besvare anmodninger fra registrerede om udøvelse af deres rettigheder efter forordningens kapitel III. Modtager databehandleren en sådan anmodning direkte, videresender databehandleren den til den dataansvarlige uden ugrundet ophold.</p>
<p>8.2 Databehandleren bistår den dataansvarlige med at overholde forpligtelserne i forordningens artikel 32-36 om behandlingssikkerhed, anmeldelse og underretning ved brud, konsekvensanalyser og forudgående høring, under hensyntagen til behandlingens karakter og de oplysninger, databehandleren har adgang til.</p>
<h2>9. Underretning om brud på persondatasikkerheden</h2>
<p>9.1 Databehandleren underretter den dataansvarlige uden unødig forsinkelse og senest 48 timer efter at være blevet opmærksom på et brud på persondatasikkerheden hos databehandleren eller en underdatabehandler.</p>
<p>9.2 Underretningen beskriver så vidt muligt bruddets karakter, de berørte kategorier og det omtrentlige antal registrerede og registreringer, de sandsynlige konsekvenser og de foranstaltninger, der er truffet eller foreslås for at håndtere bruddet.</p>
<h2>10. Sletning og returnering af oplysninger</h2>
<p>10.1 Ved ophør af aftalen om Tjenesten kan den dataansvarlige i 30 dage eksportere sine data i et standardformat. Herefter sletter databehandleren personoplysningerne, medmindre EU-ret eller national ret foreskriver opbevaring. Sikkerhedskopier slettes, efterhånden som de udløber.</p>
<h2>11. Revision og inspektion</h2>
<p>11.1 Databehandleren stiller alle oplysninger til rådighed, der er nødvendige for at påvise overholdelsen af forordningens artikel 28 og Aftalen, og giver mulighed for og bidrager til revisioner, herunder inspektioner, foretaget af den dataansvarlige eller en revisor, som den dataansvarlige har bemyndiget.</p>
<p>11.2 Inspektioner varsles mindst 30 dage i forvejen, foretages inden for normal arbejdstid og betales af den dataansvarlige, medmindre de afslører væsentlig misligholdelse hos databehandleren.</p>
<h2>12. Ikrafttræden og ophør</h2>
<p>12.1 Aftalen træder i kraft, når den dataansvarlige accepterer handelsbetingelserne, og gælder, så længe databehandleren behandler personoplysninger for den dataansvarlige.</p>
<p>12.2 Databehandleren kan ændre Aftalen efter reglerne for ændringer i handelsbetingelserne, dog ikke på en måde, der forringer beskyttelsen af personoplysningerne. Ændringer, som følger af lovgivning eller af nye underdatabehandlere, sker efter pkt. 6.2.</p>
<h2>13. Kontakt</h2>
<p>13.1 Databehandleren kontaktes på <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a>. Databehandleren kontakter den dataansvarlige via de administratorer, der er registreret i Tjenesten.</p>
<h2>Bilag A: Oplysninger om behandlingen</h2>
<p><strong>Formål:</strong> At levere Tjenesten til den dataansvarlige: indsamling, beregning, analyse og rapportering af virksomhedens klima- og ESG-data, herunder hentning af data fra de integrationer, den dataansvarlige forbinder.</p>
<p><strong>Behandlingens karakter:</strong> Opbevaring, strukturering, kategorisering (også med sprogmodeller), beregning, visning, eksport og sletning.</p>
<p><strong>Kategorier af registrerede:</strong></p>
<ul>
<li>den dataansvarliges brugere, medarbejdere og rådgivere,</li>
<li>personer og enkeltmandsvirksomheder, der optræder i den dataansvarliges regnskabsdata, bilag og dokumenter, fx leverandører og kunder,</li>
<li>medarbejdere, i det omfang løn- og pendlerdata er knyttet til dem.</li>
</ul>
<p><strong>Typer af personoplysninger:</strong></p>
<ul>
<li>almindelige oplysninger: navne, e-mail, telefon, roller, brugsdata og IP-adresser,</li>
<li>regnskabsposteringer, bilagstekst og fakturaer med navne, adresser og CVR-numre,</li>
<li>adresser og målepunkter fra Eloverblik,</li>
<li>samlede løntal og anonymiserede pendlerdata.</li>
</ul>
<p>Tjenesten er ikke beregnet til CPR-numre eller følsomme personoplysninger. CPR-numre fjernes fra posteringernes tekst, før den behandles af sprogmodeller.</p>
<p><strong>Varighed:</strong> Så længe aftalen om Tjenesten består, og derefter som beskrevet i pkt. 10.</p>
<h2>Bilag B: Underdatabehandlere</h2>
<table>
<thead>
<tr><th>Underdatabehandler</th><th>Behandling</th><th>Lokalitet</th></tr>
</thead>
<tbody>
<tr><td>Hetzner Online GmbH, Tyskland</td><td>Servere, database, fillager og sikkerhedskopier</td><td>Tyskland</td></tr>
<tr><td>Ordbogen.ai, Danmark</td><td>Sprogmodeller til kategorisering, udtræk fra dokumenter og Klimaagenten</td><td>Danmark</td></tr>
<tr><td>Resend, Inc., USA</td><td>Udsendelse af e-mails og notifikationer</td><td>EU og USA (kontodata, logs og metadata i USA)</td></tr>
<tr><td>PostHog, Inc., USA</td><td>Fejlregistrering og produktanalyse, herunder sessionsoptagelse med skjulte indtastningsfelter, når brugeren har givet samtykke</td><td>EU</td></tr>
</tbody>
</table>
<h2>Bilag C: Instruks</h2>
<h3>C.1 Behandlingens genstand og instruks</h3>
<p>Databehandleren må behandle personoplysningerne for at levere Tjenesten som beskrevet i handelsbetingelserne og bilag A, herunder hente og sende data via de integrationer, den dataansvarlige selv forbinder. Når den dataansvarlige forbinder en tredjepartstjeneste (fx et regnskabssystem, Google Drive, Microsoft 365, Slack, Teams eller Zapier), er tredjeparten ikke databehandlerens underdatabehandler, og dataudvekslingen sker efter den dataansvarliges instruks og aftale med tredjeparten.</p>
<h3>C.2 Behandlingssikkerhed</h3>
<ul>
<li>Adgang til Tjenesten med personlige konti, roller og mulighed for totrinsbekræftelse.</li>
<li>Kryptering under transport (TLS) og krypterede adgangsnøgler til integrationer.</li>
<li>Adskillelse af kunders data i databasen, så en organisation kun ser sine egne data.</li>
<li>Logning af log-ind og handlinger i en revisionslog, der ikke kan ændres bagefter.</li>
<li>Daglige sikkerhedskopier og overvågning af driften.</li>
<li>Databehandlerens medarbejdere har kun adgang til produktionsdata, når det er nødvendigt for drift eller support.</li>
</ul>
<h3>C.3 Bistand</h3>
<p>Databehandleren bistår som beskrevet i pkt. 8 og 9. Tjenesten giver den dataansvarlige mulighed for selv at eksportere, rette og slette data og at fjerne brugere.</p>
<h3>C.4 Opbevaring og sletning</h3>
<p>Personoplysninger opbevares, så længe aftalen om Tjenesten består, og slettes derefter som beskrevet i pkt. 10.1. Log-in-historik slettes efter 90 dage.</p>
<h3>C.5 Lokalitet</h3>
<p>Behandlingen sker på databehandlerens servere i Tyskland og hos de underdatabehandlere, der står i bilag B. Databehandlerens medarbejdere arbejder fra Danmark.</p>
<h3>C.6 Overførsel til tredjelande</h3>
<p>Overførsler til USA sker til Resend og PostHog som angivet i bilag B, på grundlag af EU-US Data Privacy Framework, når modtageren er certificeret, og ellers EU-Kommissionens standardkontraktbestemmelser.</p>
<h3>C.7 Tilsyn</h3>
<p>Databehandleren giver efter anmodning den dataansvarlige en skriftlig redegørelse for overholdelsen af Aftalen én gang årligt uden beregning. Inspektion sker efter pkt. 11.</p>
`,
  footerHtml: CONTACT_FOOTER,
};
