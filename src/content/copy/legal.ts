// Bundled default copy for the legal pages. CMS pageKeys:
//   /cookies             -> "page.legal.cookies"
//   /handelsbetingelser  -> "page.legal.terms"
//   /privatlivspolitik   -> "page.legal.privacy"
// Each document body is a single rich-text HTML string rendered inside the
// page's prose wrapper; the CMS edits it with the rich-text editor (or raw
// HTML as fallback). Overrides are sanitized on write in qlim8-app.

export const LEGAL_COOKIES_PAGE_KEY = "page.legal.cookies";
export const LEGAL_TERMS_PAGE_KEY = "page.legal.terms";
export const LEGAL_PRIVACY_PAGE_KEY = "page.legal.privacy";

export interface LegalCopy {
  title: string;
  metaLine: string;
  versionLine: string;
  bodyHtml: string;
  footerHtml: string;
}

export const LEGAL_COOKIES_COPY: LegalCopy = {
  title: "Cookieerklæring",
  metaLine: "qlim8 — marketingsite",
  versionLine: "Version: 1.0 · Senest opdateret: 15. maj 2026",
  bodyHtml: `<h2>1. Hvad er cookies?</h2>
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
<table>
<thead>
<tr><th>Cookie-navn</th><th>Type</th><th>Formål</th><th>Varighed</th><th>Udbyder</th></tr>
</thead>
<tbody>
<tr><td><code>cookie_consent</code></td><td>Nødvendig</td><td>Husker dit cookie-samtykke</td><td>12 måneder</td><td>qlim8</td></tr>
<tr><td><code>session_id</code></td><td>Nødvendig</td><td>Opretholder sessionen ved navigation</td><td>Sessionen</td><td>qlim8</td></tr>
<tr><td><code>_ga, _ga_*</code></td><td>Statistik</td><td>Måler trafik og brug af sitet</td><td>Op til 24 måneder</td><td>Google</td></tr>
<tr><td><code>hubspotutk, __hstc, __hssc</code></td><td>Statistik / marketing</td><td>Tracking og lead-attribution</td><td>Op til 13 måneder</td><td>[udfyldes ved scanning]</td></tr>
<tr><td><code>li_at, lidc</code></td><td>Marketing</td><td>LinkedIn Insight Tag</td><td>Op til 12 måneder</td><td>LinkedIn</td></tr>
</tbody>
</table>
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
<p>qlim8<br />E-mail: <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a><br />CVR: DK46033736</p>`,
  footerHtml: "",
};

export const LEGAL_TERMS_COPY: LegalCopy = {
  title: "Handelsbetingelser",
  metaLine: "qlim8 — ESG-platform (SaaS)",
  versionLine: "Version: 1.0 · Gældende fra: 15. maj 2026",
  bodyHtml: `<h2>1. Indledning og aftalegrundlag</h2>
<p>1.1 Disse handelsbetingelser ("Betingelserne") regulerer aftalen mellem qlim8, CVR-nr. DK46033736, Stenløkkevej 12, 5450 ("Leverandøren") og den erhvervsdrivende kunde ("Kunden"), der tegner abonnement på Leverandørens ESG-platform ("Tjenesten").</p>
<p>1.2 Betingelserne gælder, uanset om Kunden bestiller via Leverandørens hjemmeside, ved underskrift af ordrebekræftelse eller på baggrund af et særskilt tilbud.</p>
<p>1.3 Tjenesten udbydes alene til erhvervsdrivende. Forbrugerbeskyttelseslovgivningen, herunder fortrydelsesretten efter forbrugeraftaleloven, finder ikke anvendelse.</p>
<p>1.4 Kundens egne indkøbsbetingelser finder ikke anvendelse, medmindre Leverandøren skriftligt har accepteret dem.</p>
<h2>2. Definitioner</h2>
<p><strong>"Tjenesten"</strong>: Den ESG-platform, herunder tilhørende moduler, dashboards, rapporter og API'er, som Leverandøren stiller til rådighed som software-as-a-service.</p>
<p><strong>"Brugere"</strong>: Fysiske personer, som Kunden giver adgang til Tjenesten (typisk medarbejdere og konsulenter hos Kunden).</p>
<p><strong>"Kundedata"</strong>: Alle data, herunder ESG-data, dokumenter og oplysninger, som Kunden eller dennes Brugere uploader, indtaster eller genererer i Tjenesten.</p>
<p><strong>"Abonnementsperiode"</strong>: Den løbende periode, hvor Kunden har adgang til Tjenesten mod betaling af abonnementsvederlag.</p>
<p><strong>"Ordrebekræftelse"</strong>: Den skriftlige bekræftelse (e-mail eller PDF), der specificerer valgt abonnement, antal Brugere, pris og særlige vilkår.</p>
<h2>3. Aftalens indgåelse</h2>
<p>3.1 Aftalen er bindende, når Kunden enten (i) accepterer Ordrebekræftelsen, (ii) underskriver en aftale med Leverandøren, eller (iii) tager Tjenesten i brug efter en prøveperiode er udløbet.</p>
<p>3.2 Den person, der accepterer aftalen på vegne af Kunden, indestår for at være berettiget til at forpligte Kunden.</p>
<p>3.3 Leverandøren kan tilbyde en gratis prøveperiode på 14 dage. Ved prøveperiodens udløb overgår adgangen til et betalt abonnement, medmindre Kunden inden udløbet opsiger skriftligt.</p>
<h2>4. Tjenesten</h2>
<p>4.1 Tjenesten leveres som standardiseret SaaS via internettet og omfatter de funktioner og moduler, der fremgår af Ordrebekræftelsen eller af Leverandørens produktbeskrivelse på leveringstidspunktet.</p>
<p>4.2 Leverandøren udvikler løbende Tjenesten og kan tilføje, ændre eller fjerne funktionalitet, så længe den samlede funktionalitet i al væsentlighed bevares i Abonnementsperioden.</p>
<p>4.3 Tjenesten leveres "as is". Leverandøren indestår ikke for, at Tjenesten kan opfylde Kundens specifikke forretningsmæssige eller compliance-behov, herunder konkrete rapporteringskrav under CSRD, ESRS, GHG-protokollen eller anden ESG-relateret regulering. Kunden er selv ansvarlig for at vurdere egnetheden.</p>
<h2>5. Adgang og brugsret</h2>
<p>5.1 Kunden får i Abonnementsperioden en ikke-eksklusiv, ikke-overdragelig brugsret til Tjenesten til Kundens interne erhvervsmæssige brug.</p>
<p>5.2 Adgang sker via individuelle brugerkonti. Login-oplysninger må ikke deles. Kunden er ansvarlig for alle handlinger, der foretages under Kundens konti.</p>
<p>5.3 Kunden må ikke (i) videresælge, udleje eller stille Tjenesten til rådighed for tredjemand, (ii) reverse-engineere eller kopiere Tjenesten, (iii) anvende Tjenesten til benchmarking eller udvikling af konkurrerende tjenester, eller (iv) bruge Tjenesten i strid med gældende lovgivning.</p>
<p>5.4 Leverandøren kan suspendere adgangen uden varsel ved væsentlig misbrug, manglende betaling efter rykker eller mistanke om sikkerhedsbrud.</p>
<h2>6. Pris og betaling</h2>
<p>6.1 Prisen fremgår af Ordrebekræftelsen og er angivet i DKK eksklusive moms og eventuelle tredjepartsgebyrer.</p>
<p>6.2 Abonnementsvederlaget faktureres månedligt eller årligt forud (efter Kundens valg). Betalingsbetingelser er netto 14 dage fra fakturadato.</p>
<p>6.3 Ved forsinket betaling påløber morarenter i henhold til rentelovens § 5 samt et rykkergebyr på op til kr. 100 pr. rykker, jf. renteloven.</p>
<p>6.4 Leverandøren kan én gang årligt regulere priserne med et varsel på 60 dage. Prisreguleringer ud over nettoprisindekset giver Kunden ret til at opsige aftalen med virkning fra reguleringens ikrafttræden.</p>
<h2>7. Abonnementsperiode og opsigelse</h2>
<p>7.1 Den indledende Abonnementsperiode er 1 eller 12 måneder (Efter kundens valg), medmindre andet fremgår af Ordrebekræftelsen. Aftalen forlænges automatisk med samme frekvens som ved oprettelse, medmindre den opsiges enten skriftligt med 3 måneders varsel til udløbet af igangværende periode eller øjeblikkeligt via selvbetjening på der findes på Tjenesten.</p>
<p>7.2 Opsigelse skal ske skriftligt til Leverandørens kontakt-e-mail der til enhver tid kan findes på Leverandørens hjemmeside www.qlim8.com, eller via selvbetjening på Tjenesten.</p>
<p>7.3 Leverandøren kan opsige aftalen med samme varsel. Ved Kundens væsentlige misligholdelse kan Leverandøren ophæve aftalen uden varsel.</p>
<p>7.4 Ved aftalens ophør udløber Kundens brugsret. Kunden har i en periode på 30 dage efter ophør adgang til at eksportere Kundedata i et standardformat. Herefter sletter Leverandøren Kundedata, medmindre opbevaring følger af lovgivning.</p>
<h2>8. Kundens forpligtelser og data</h2>
<p>8.1 Kunden er ansvarlig for, at Kundedata er korrekte, opdaterede og lovligt indhentede, samt for at Kunden har det fornødne grundlag for at behandle eventuelle personoplysninger i Kundedata.</p>
<p>8.2 Kunden indestår for, at Kundens brug af Tjenesten ikke krænker tredjemands rettigheder eller gældende lovgivning, herunder konkurrencelovgivning og databeskyttelseslovgivning.</p>
<p>8.3 Kunden skal opretholde rimelige tekniske og organisatoriske foranstaltninger for at sikre Brugernes login og bør straks underrette Leverandøren ved mistanke om uautoriseret adgang.</p>
<h2>9. Service niveau og support</h2>
<p>9.1 Leverandøren tilstræber en oppetid på 99,5 % målt månedligt, eksklusive planlagt vedligehold.</p>
<p>9.2 Planlagt vedligehold varsles så vidt muligt mindst 48 timer i forvejen og lægges normalt uden for almindelig kontortid.</p>
<p>9.3 Support ydes via e-mail på hverdage kl. 09-16 dansk tid. Svartider og prioritering fremgår af en eventuel SLA-bilag.</p>
<h2>10. Databehandling og persondata</h2>
<p>10.1 I det omfang Leverandøren som led i leveringen af Tjenesten behandler personoplysninger på vegne af Kunden, er Kunden dataansvarlig og Leverandøren databehandler. Parterne indgår en særskilt databehandleraftale, der opfylder kravene i GDPR artikel 28.</p>
<p>10.2 Leverandøren anvender godkendte underdatabehandlere, herunder hosting (Hetzner Online GmbH, Tyskland), webhotel (Simply.com A/S, Danmark), AI- og sprogtjenester (Ordbogen.ai, Danmark), e-mail-udsendelse (Resend, Inc., USA) og betaling (Stripe, Inc., USA). En opdateret liste fremgår af databehandleraftalen.</p>
<p>10.3 For Leverandørens egen behandling af personoplysninger om Kundens kontaktpersoner, Brugere og besøgende, henvises til Leverandørens <a href="/privatlivspolitik">privatlivspolitik</a>.</p>
<h2>11. Immaterielle rettigheder</h2>
<p>11.1 Alle rettigheder til Tjenesten, herunder kildekode, design, dokumentation og varemærker, tilhører Leverandøren eller dennes licensgivere. Aftalen overdrager ingen rettigheder ud over den i pkt. 5 nævnte brugsret.</p>
<p>11.2 Kundedata tilhører Kunden. Kunden giver dog Leverandøren en ikke-eksklusiv ret til at behandle Kundedata i det omfang, det er nødvendigt for at levere, vedligeholde og forbedre Tjenesten.</p>
<p>11.3 Leverandøren må anvende aggregerede og anonymiserede data udledt af Tjenesten til statistik, benchmarking og produktudvikling, så længe Kunden ikke kan identificeres.</p>
<p>11.4 Forslag og feedback fra Kunden, som indarbejdes i Tjenesten, tilhører Leverandøren uden vederlag til Kunden.</p>
<h2>12. Fortrolighed</h2>
<p>12.1 Parterne skal behandle ikke-offentlige oplysninger om hinandens forretning fortroligt og må alene anvende dem til opfyldelse af aftalen. Fortrolighedsforpligtelsen gælder også efter aftalens ophør.</p>
<p>12.2 Leverandøren må anvende Kundens navn og logo som reference på Leverandørens hjemmeside og i markedsføringsmateriale, medmindre Kunden skriftligt modsætter sig dette.</p>
<h2>13. Ansvar og ansvarsbegrænsning</h2>
<p>13.1 Parterne er erstatningsansvarlige efter dansk rets almindelige regler med de begrænsninger, der følger af pkt. 13.2-13.4.</p>
<p>13.2 Leverandøren er ikke ansvarlig for indirekte tab, herunder driftstab, avancetab, tab af data, tab af goodwill, bod eller dagbøder, eller for tab som følge af Kundens egne beslutninger truffet på baggrund af Tjenestens output, herunder rapportering under ESG-regulering.</p>
<p>13.3 Leverandørens samlede erstatningsansvar over for Kunden er for hver 12-måneders periode begrænset til det beløb, Kunden har betalt for Tjenesten i de 12 måneder, der går forud for det skadeforvoldende forhold.</p>
<p>13.4 Begrænsningerne i pkt. 13.2-13.3 finder ikke anvendelse ved grov uagtsomhed eller forsætligt forhold.</p>
<h2>14. Force majeure</h2>
<p>14.1 Parterne er ikke ansvarlige for manglende eller forsinket opfyldelse som følge af forhold uden for deres rimelige kontrol, herunder krig, terror, naturkatastrofer, strømsvigt, generalstrejke, pandemi, omfattende cyberangreb og myndighedsforanstaltninger.</p>
<p>14.2 Force majeure-situationen skal meddeles den anden part uden ugrundet ophold.</p>
<h2>15. Ændringer i betingelserne</h2>
<p>15.1 Leverandøren kan ændre Betingelserne med et varsel på 30 dage. Væsentlige ændringer, som stiller Kunden ringere, giver Kunden ret til at opsige aftalen med virkning fra ændringernes ikrafttræden.</p>
<p>15.2 Mindre ændringer, fx præciseringer eller ændringer som følge af lovkrav, kan gennemføres uden varsel.</p>
<h2>16. Overdragelse</h2>
<p>16.1 Kunden kan ikke overdrage sine rettigheder eller forpligtelser uden Leverandørens forudgående skriftlige samtykke.</p>
<p>16.2 Leverandøren kan overdrage aftalen til et koncernforbundet selskab eller som led i en virksomhedsoverdragelse.</p>
<h2>17. Lovvalg og værneting</h2>
<p>17.1 Aftalen er undergivet dansk ret med undtagelse af regler, der medfører anvendelse af andet lands ret.</p>
<p>17.2 Tvister, der ikke kan løses i mindelighed, skal afgøres ved Retten i Odense som første instans.</p>`,
  footerHtml: `Kontakt: qlim8 · CVR DK46033736 · Stenløkkevej 12, 5450 · <a href="mailto:kontakt@qlim8.com">kontakt@qlim8.com</a> · <a href="tel:+4593901384">+45 93 90 13 84</a>`,
};

export const LEGAL_PRIVACY_COPY: LegalCopy = {
  title: "Privatlivspolitik",
  metaLine: "qlim8 ApS — ESG-platform & marketingsite",
  versionLine: "Version: 1.0 · Senest opdateret: 15. maj 2026",
  bodyHtml: `<h2>1. Dataansvarlig</h2>
<p>Dataansvarlig for behandlingen af dine personoplysninger er:</p>
<p>qlim8<br />Stenløkkevej 12, 5450<br />CVR: DK46033736<br />E-mail: <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a><br />Telefon: <a href="tel:+4593901384">+45 93 90 13 84</a></p>
<p>Spørgsmål om denne politik eller dine rettigheder kan rettes til ovenstående kontaktoplysninger.</p>
<h2>2. Hvornår gælder politikken</h2>
<p>Denne politik beskriver, hvordan vi behandler personoplysninger, når du:</p>
<ul>
<li>Besøger vores marketingsite eller blog.</li>
<li>Tilmelder dig vores nyhedsbrev.</li>
<li>Opretter en konto og bruger vores ESG-platform som bruger hos en kunde.</li>
<li>Kontakter os via e-mail, formularer eller telefon.</li>
</ul>
<p>Når en virksomhedskunde uploader ESG-data til platformen, og disse data indeholder personoplysninger (fx om medarbejdere eller leverandører), er kunden dataansvarlig og vi databehandler. Forholdet reguleres af en særskilt databehandleraftale. Se afsnit 7.</p>
<h2>3. Hvilke personoplysninger behandler vi</h2>
<h3>3.1 Besøgende på marketingsitet</h3>
<ul>
<li>IP-adresse, browsertype, enhedstype, operativsystem.</li>
<li>Besøgte sider, klikadfærd, henvisningskilde.</li>
<li>Oplysninger, du selv indtaster i kontaktformularer (navn, e-mail, virksomhed, besked).</li>
</ul>
<h3>3.2 Nyhedsbrevsmodtagere</h3>
<ul>
<li>Navn og e-mail.</li>
<li>Eventuelt virksomhed og jobtitel.</li>
<li>Statistik over åbninger, klik og afmeldinger (leveret via Resend).</li>
</ul>
<h3>3.3 Brugere af ESG-platformen</h3>
<ul>
<li>Kontaktoplysninger: navn, arbejds-e-mail, jobtitel, telefon, arbejdsgiver.</li>
<li>Login-oplysninger: brugernavn, krypteret password, MFA-data.</li>
<li>Aktivitetslogs: log-ins, handlinger i platformen, IP-adresse, tidsstempler.</li>
<li>Supportkorrespondance: beskeder og bilag, du sender til support.</li>
</ul>
<h3>3.4 Betalings- og fakturaoplysninger (administratorer hos kunder)</h3>
<ul>
<li>Navn, fakturerings-e-mail, fakturaadresse.</li>
<li>Betalingen håndteres af Stripe. Vi modtager ikke fulde kortoplysninger.</li>
</ul>
<h3>3.5 Energidata hentet via Eloverblik (Energinet DataHub)</h3>
<p>Når en kunde giver fuldmagt via Eloverblik, henter vi elforbrugs- og solcelleproduktionsdata for kundens målepunkter. Vi modtager:</p>
<ul>
<li>Stamdata for målepunkter (målepunkts-ID, adresse, installationstype, netvirksomhed).</li>
<li>Tidsserier for forbrug og produktion (kWh pr. interval).</li>
<li>Eventuelle prisstrukturer og tariffer knyttet til målepunktet.</li>
</ul>
<p>Energinet er kilde til disse data. Vi opbevarer dataene på vores egne servere hos Hetzner. Selve adgangen sker via et token, som kunden kan trække tilbage til enhver tid via Eloverblik.</p>
<h3>3.6 Regnskabsdata hentet fra kundens regnskabssystem</h3>
<p>Når en kunde giver os adgang via OAuth til deres regnskabssystem (Dinero, Billy eller e-conomic), henter vi bogføringsdata med henblik på at kategorisere posteringer korrekt til brug for ESG-beregninger (særligt Scope 3-emissioner og leverandørkortlægning). Vi modtager:</p>
<ul>
<li>Kontoplan og posteringer med beløb, datoer, kontonumre og bilagstekst.</li>
<li>Leverandør- og kundeoplysninger fra fakturaer, herunder navne, adresser og CVR-numre. Bemærk, at oplysninger om enkeltmandsvirksomheder og personligt ejede selskaber anses som personoplysninger efter GDPR.</li>
<li>Fakturaspecifikationer og bilag i det omfang, de er nødvendige for kategoriseringen.</li>
</ul>
<p>For lønposteringer henter vi alene beløb og dato. Vi henter ikke navne, CPR-numre eller andre oplysninger om medarbejdere, der modtager løn.</p>
<p>Vi vurderer løbende, om enkelte felter kan udelades uden at forringe kategoriseringen, og fjerner dem fra dataudtrækket, så snart det er muligt. Kunden kan til enhver tid trække adgangen tilbage i sit regnskabssystem.</p>
<h2>4. Formål og retsgrundlag</h2>
<p>Vi behandler personoplysninger til følgende formål med følgende retsgrundlag efter databeskyttelsesforordningen (GDPR):</p>
<h3>4.1 Levering af platformen og kundeforholdet</h3>
<p>Formål: At give Brugere adgang, levere funktionalitet, drift, support og fakturering.<br />Retsgrundlag: Opfyldelse af aftale (GDPR art. 6, stk. 1, litra b) for kundens kontaktpersoner, og legitim interesse (art. 6, stk. 1, litra f) for de øvrige Brugere — idet det er nødvendigt for at kunne levere tjenesten til kunden.</p>
<h3>4.2 Sikkerhed og logning</h3>
<p>Formål: At forebygge misbrug, opdage sikkerhedshændelser og overholde forpligtelser.<br />Retsgrundlag: Legitim interesse (art. 6, stk. 1, litra f) i at sikre platformens og kundernes data.</p>
<h3>4.3 Nyhedsbrev og markedsføring</h3>
<p>Formål: At sende nyhedsbreve, produktnyheder og invitationer.<br />Retsgrundlag: Samtykke (art. 6, stk. 1, litra a) og markedsføringslovens § 10. Du kan til enhver tid afmelde dig via linket i nyhedsbrevet.</p>
<h3>4.4 Marketing og analyse på hjemmesiden</h3>
<p>Formål: At forbedre hjemmesiden, måle effekt af markedsføring og vise relevant indhold.<br />Retsgrundlag: Samtykke til ikke-nødvendige cookies (cookiebekendtgørelsen) og legitim interesse for grundlæggende, anonymiseret statistik.</p>
<h3>4.5 Opfyldelse af lovkrav</h3>
<p>Formål: At opbevare regnskabsmateriale og dokumentation.<br />Retsgrundlag: Retlig forpligtelse (art. 6, stk. 1, litra c), herunder bogføringsloven.</p>
<h2>5. Cookies</h2>
<p>Vi anvender cookies og lignende teknologier på vores marketingsite til drift, analyse og markedsføring. Nødvendige cookies sættes uden samtykke. Øvrige cookies, herunder statistik- og marketingcookies, sættes først, når du giver samtykke i vores cookiebanner.</p>
<p>En detaljeret oversigt over de enkelte cookies, formål og opbevaringstid findes i vores <a href="/cookies">cookieerklæring</a>. Du kan til enhver tid ændre eller trække dit samtykke tilbage via cookieindstillingerne på sitet.</p>
<h2>6. Nyhedsbrev</h2>
<p>Tilmelding sker via dobbelt opt-in (du modtager en bekræftelses-e-mail). Vi registrerer tidspunkt for samtykke samt indholdet af det samtykke, du har givet.</p>
<p>Du kan til enhver tid afmelde dig via linket i bunden af hvert nyhedsbrev. Vi kan herefter opbevare dokumentation for tidligere samtykke i op til 2 år efter afmelding for at kunne dokumentere overholdelse af markedsføringsloven.</p>
<h2>7. Behandling af kundens ESG-data (vi er databehandler)</h2>
<p>Når en virksomhedskunde bruger platformen, kan kunden uploade eller indtaste data — herunder ESG-data — der i nogle tilfælde indeholder personoplysninger om f.eks. medarbejdere, leverandører eller andre tredjeparter.</p>
<p>For sådanne oplysninger er kunden dataansvarlig, og vi handler som databehandler. Det betyder, at vi alene behandler oplysningerne efter dokumenteret instruks fra kunden i henhold til den databehandleraftale, der er indgået med kunden.</p>
<p>Hvis du er medarbejder hos eller registreret i en kundes brug af platformen, skal henvendelser om dine rettigheder rettes til den pågældende kunde som dataansvarlig.</p>
<h2>8. Modtagere, databehandlere og kilder</h2>
<p>Vi har bevidst valgt en EU-baseret kerneinfrastruktur for at minimere overførsel af personoplysninger til tredjelande. Vi videregiver eller deler personoplysninger med følgende kategorier af modtagere:</p>
<ul>
<li>Hosting og infrastruktur: Hetzner Online GmbH (Tyskland) til drift af platformens servere.</li>
<li>Domæner og webhotel: Simply.com A/S (Danmark) til drift af marketingsitet og domæner.</li>
<li>AI- og sprogtjenester: Ordbogen.ai (Danmark) til sprogbehandling i platformens funktioner.</li>
<li>E-mail-udsendelse: Resend, Inc. (USA) til transaktionelle e-mails og nyhedsbrev.</li>
<li>Betalingsleverandør: Stripe, Inc. (USA) til abonnementsbetalinger.</li>
<li>Analyseværktøjer på marketingsitet, i det omfang du har givet samtykke.</li>
<li>Eksterne rådgivere (revisor, advokat) under deres lovbestemte tavshedspligt.</li>
<li>Offentlige myndigheder, hvis vi er retligt forpligtet hertil.</li>
</ul>
<p>Vi henter desuden data fra følgende kilder:</p>
<ul>
<li>Energinet DataHub via Eloverblik — elforbrugs- og produktionsdata på baggrund af kundens elektroniske fuldmagt, jf. afsnit 3.5.</li>
<li>Kundens regnskabssystem (Dinero, Billy eller e-conomic) — bogføringsdata på baggrund af kundens OAuth-autorisation, jf. afsnit 3.6.</li>
</ul>
<p>En opdateret liste over underdatabehandlere udleveres til kunder på anmodning og fremgår af databehandleraftalen.</p>
<h2>9. Overførsel til tredjelande</h2>
<p>Vores kerneinfrastruktur — hosting (Hetzner, Tyskland), webhotel (Simply, Danmark) og AI-behandling (Ordbogen.ai, Danmark) — er placeret inden for EU/EØS, og data behandlet af disse leverandører forlader ikke EU/EØS.</p>
<p>Visse leverandører er dog etableret i USA, herunder Stripe (betaling) og Resend (e-mail-udsendelse). For så vidt angår Resend gælder det, at selvom udsendelse kan ske via en EU-region, opbevarer Resend account-data, logs og e-mail-metadata i USA.</p>
<p>Når personoplysninger overføres til tredjelande, sikrer vi et lovligt overførselsgrundlag, fx:</p>
<ul>
<li>EU-US Data Privacy Framework, hvis modtageren er certificeret.</li>
<li>EU-Kommissionens standardkontraktbestemmelser (SCC) suppleret med tekniske og organisatoriske foranstaltninger.</li>
</ul>
<p>Du kan få en kopi af det relevante overførselsgrundlag ved at kontakte os.</p>
<h2>10. Opbevaringstid</h2>
<p>Vi opbevarer personoplysninger, så længe det er nødvendigt for de formål, de er indsamlet til:</p>
<ul>
<li>Brugerkonti og platformdata: I hele aftaleperioden plus op til 90 dage efter ophør (eksport- og afviklingsperiode).</li>
<li>Regnskabs- og fakturamateriale: 5 år fra udgangen af det regnskabsår, materialet vedrører, jf. bogføringsloven.</li>
<li>Nyhedsbrev: Indtil du afmelder dig, samt dokumentation for samtykke i op til 2 år herefter.</li>
<li>Kontaktformularer og support: Op til 2 år efter sidste kontakt, medmindre længere opbevaring er nødvendig.</li>
<li>Cookies: Som angivet i <a href="/cookies">cookieerklæringen</a>.</li>
</ul>
<h2>11. Dine rettigheder</h2>
<p>Du har efter databeskyttelsesforordningen følgende rettigheder:</p>
<ul>
<li><strong>Indsigt</strong>: Du har ret til at få oplyst, hvilke personoplysninger vi behandler om dig.</li>
<li><strong>Berigtigelse</strong>: Du har ret til at få urigtige oplysninger rettet.</li>
<li><strong>Sletning</strong>: Du har i visse tilfælde ret til at få oplysninger slettet.</li>
<li><strong>Begrænsning</strong>: Du har i visse tilfælde ret til at få behandlingen begrænset.</li>
<li><strong>Dataportabilitet</strong>: Du har i visse tilfælde ret til at modtage dine oplysninger i et struktureret, almindeligt anvendt format.</li>
<li><strong>Indsigelse</strong>: Du har ret til at gøre indsigelse mod behandling baseret på legitim interesse, herunder direkte markedsføring.</li>
<li><strong>Tilbagekaldelse af samtykke</strong>: Du kan til enhver tid trække et givet samtykke tilbage. Tilbagekaldelse påvirker ikke lovligheden af den behandling, der er sket før tilbagekaldelsen.</li>
</ul>
<p>Henvendelser om dine rettigheder kan ske til <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a>. Vi besvarer henvendelsen uden ugrundet ophold og senest inden for én måned.</p>
<h2>12. Sikkerhed</h2>
<p>Vi har implementeret passende tekniske og organisatoriske foranstaltninger for at beskytte personoplysninger mod hændelig eller ulovlig tilintetgørelse, tab, ændring og uautoriseret videregivelse eller adgang. Dette omfatter blandt andet adgangsstyring, kryptering under transport, logning, backup og medarbejderuddannelse.</p>
<p>I tilfælde af et sikkerhedsbrud, der indebærer høj risiko for de registrerede, underretter vi de berørte og Datatilsynet i overensstemmelse med GDPR art. 33-34.</p>
<h2>13. Klage til Datatilsynet</h2>
<p>Du har ret til at indgive en klage til Datatilsynet, hvis du er utilfreds med vores behandling af dine personoplysninger.</p>
<p>Datatilsynet<br />Carl Jacobsens Vej 35, 2500 Valby<br />Telefon: 33 19 32 00<br />E-mail: <a href="mailto:dt@datatilsynet.dk">dt@datatilsynet.dk</a><br />Web: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a></p>
<h2>14. Ændringer i politikken</h2>
<p>Vi kan opdatere denne privatlivspolitik fra tid til anden. Den til enhver tid gældende version er tilgængelig på vores hjemmeside med angivelse af versionsnummer og opdateringsdato. Ved væsentlige ændringer informerer vi via e-mail eller i platformen.</p>`,
  footerHtml: `Kontakt: qlim8 · CVR DK46033736 · Stenløkkevej 12, 5450 · <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a>`,
};
