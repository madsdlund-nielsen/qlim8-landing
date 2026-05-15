import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function Privatlivspolitik() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <SiteHeader />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28">
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Privatlivspolitik
          </h1>
          <p className="text-sm text-gray-600">
            qlim8 ApS — ESG-platform &amp; marketingsite
            <br />
            Version: 1.0 · Senest opdateret: <span className="text-gray-500">[UDFYLDES INDEN GO-LIVE]</span>
          </p>
        </header>

        <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-[15px] prose-li:text-[15px] prose-li:my-1 prose-ul:my-3 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

          <h2>1. Dataansvarlig</h2>
          <p>Dataansvarlig for behandlingen af dine personoplysninger er:</p>
          <p>
            qlim8 ApS<br />
            <span className="text-gray-500">[UDFYLDES INDEN GO-LIVE — selskabsadresse]</span><br />
            CVR: DK46033736<br />
            E-mail: <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a><br />
            Telefon: <a href="tel:+4593901384">+45 93 90 13 84</a>
          </p>
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
          <p>Formål: At give Brugere adgang, levere funktionalitet, drift, support og fakturering.<br />
            Retsgrundlag: Opfyldelse af aftale (GDPR art. 6, stk. 1, litra b) for kundens kontaktpersoner, og legitim interesse (art. 6, stk. 1, litra f) for de øvrige Brugere — idet det er nødvendigt for at kunne levere tjenesten til kunden.</p>

          <h3>4.2 Sikkerhed og logning</h3>
          <p>Formål: At forebygge misbrug, opdage sikkerhedshændelser og overholde forpligtelser.<br />
            Retsgrundlag: Legitim interesse (art. 6, stk. 1, litra f) i at sikre platformens og kundernes data.</p>

          <h3>4.3 Nyhedsbrev og markedsføring</h3>
          <p>Formål: At sende nyhedsbreve, produktnyheder og invitationer.<br />
            Retsgrundlag: Samtykke (art. 6, stk. 1, litra a) og markedsføringslovens § 10. Du kan til enhver tid afmelde dig via linket i nyhedsbrevet.</p>

          <h3>4.4 Marketing og analyse på hjemmesiden</h3>
          <p>Formål: At forbedre hjemmesiden, måle effekt af markedsføring og vise relevant indhold.<br />
            Retsgrundlag: Samtykke til ikke-nødvendige cookies (cookiebekendtgørelsen) og legitim interesse for grundlæggende, anonymiseret statistik.</p>

          <h3>4.5 Opfyldelse af lovkrav</h3>
          <p>Formål: At opbevare regnskabsmateriale og dokumentation.<br />
            Retsgrundlag: Retlig forpligtelse (art. 6, stk. 1, litra c), herunder bogføringsloven.</p>

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
          <p>
            Datatilsynet<br />
            Carl Jacobsens Vej 35, 2500 Valby<br />
            Telefon: 33 19 32 00<br />
            E-mail: <a href="mailto:dt@datatilsynet.dk">dt@datatilsynet.dk</a><br />
            Web: <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer">www.datatilsynet.dk</a>
          </p>

          <h2>14. Ændringer i politikken</h2>
          <p>Vi kan opdatere denne privatlivspolitik fra tid til anden. Den til enhver tid gældende version er tilgængelig på vores hjemmeside med angivelse af versionsnummer og opdateringsdato. Ved væsentlige ændringer informerer vi via e-mail eller i platformen.</p>

          <p className="text-xs text-gray-500 pt-8 border-t border-gray-200 mt-12">
            Kontakt: qlim8 ApS · CVR DK46033736 · <span className="text-gray-500">[UDFYLDES INDEN GO-LIVE — adresse]</span> · <a href="mailto:privacy@qlim8.com">privacy@qlim8.com</a>
          </p>
        </div>
      </article>

      <SiteFooter />
    </div>
  );
}
