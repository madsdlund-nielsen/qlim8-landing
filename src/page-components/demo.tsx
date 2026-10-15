import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { ClosingCta } from "@/components/ds/ClosingCta";
import { DEMO_HREF, FREE_START_CTA, STANDARD_MICRO, STANDARD_TRUST } from "@/content/cta";
import { getSelfServe } from "@/lib/selfServe";

// /demo: the film of the platform, where the demo dialog sends a company with
// fewer than ten employees (src/components/public/DemoDialog.tsx). The film is
// the app's own (qlim8-app, demo/qlim8-demo.mp4), copied into public/demo with
// its poster. It is an animated film built after the app's interface, with
// made-up company data, and the text below says so.
const VIDEO_SRC = "/demo/qlim8-demo.mp4";
const POSTER_SRC = "/demo/qlim8-demo-poster.jpg";

const SHOWN = [
  "Oprettelse af en konto og onboarding, hvor virksomheden udfyldes fra CVR-registret.",
  "Regnskabssystemet forbindes, og bilagene lander i platformen.",
  "Beregningsmotoren i seks trin: fra bilag til emissionsfaktor og kilde.",
  "Dashboardet med scope 1, 2 og 3 måned for måned, og hvor præcise data tallene bygger på.",
  "Én linje foldet ud til sin egen beregning, så revisoren kan følge den.",
  "Et reduktionsmål skrevet med egne ord og bekræftet felt for felt.",
  "Den færdige VSME-rapport og en forespørgsel til MCP-serveren.",
];

export default async function Demo() {
  const selfServe = await getSelfServe();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-(--container-max) px-4 pb-10 pt-14 sm:px-6 sm:pt-24">
        <h1 className="mb-5 max-w-3xl text-balance" data-testid="text-demo-title">
          Se qlim8 i praksis
        </h1>
        <p className="max-w-(--measure-body) text-lead text-foreground">
          En film på godt to minutter, der følger en ny bruger fra oprettelse til en færdig VSME-rapport.
          Teksten står i billedet, så du kan se den uden lyd.
        </p>
      </section>

      <section className="mx-auto max-w-(--container-max) px-4 pb-12 sm:px-6" aria-label="Film af platformen">
        <div className="overflow-hidden rounded-lg border border-border bg-primary shadow-soft">
          <video
            controls
            preload="metadata"
            playsInline
            poster={POSTER_SRC}
            className="aspect-video w-full bg-primary"
            data-testid="demo-video"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Din browser kan ikke afspille filmen her.{" "}
            <a href={VIDEO_SRC} className="underline">
              Hent filmen som MP4
            </a>
            .
          </video>
        </div>
        <p className="mt-3 max-w-(--measure-body) text-body-sm text-muted-foreground">
          Filmen er animeret efter platformens egen brugerflade. Virksomheden, tallene og bilagene i den er opdigtede.
        </p>
      </section>

      <section className="mx-auto max-w-(--container-max) px-4 pb-14 sm:px-6 md:pb-section">
        <h2 className="mb-6 max-w-3xl text-balance text-h3">Det viser filmen</h2>
        <ul className="max-w-(--measure-body) space-y-3">
          {SHOWN.map((item) => (
            <li key={item} className="flex gap-3 text-body text-foreground">
              <span aria-hidden="true" className="mt-3 h-1 w-2.5 shrink-0 bg-sage" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <ClosingCta
        title="Vakte noget i filmen spørgsmål?"
        description="Spørg os om, hvad du vil. Du får et ærligt svar, og ingen ringer efter dig uden at være bedt om det."
        primary={FREE_START_CTA}
        // Once the catalog sells nothing by itself the primary button already
        // books a demo, and a second button to the same place would be noise.
        secondary={selfServe ? { label: "Har I 10 eller flere ansatte? Book en demo", href: DEMO_HREF } : undefined}
        trustLine={STANDARD_TRUST}
        microLine={STANDARD_MICRO}
      />

      <SiteFooter />
    </div>
  );
}
