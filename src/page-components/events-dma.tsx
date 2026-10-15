import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";
import { Button, ButtonRow } from "@/components/ds/Button";
import { Photo } from "@/components/ds/Photo";
import { TrustLine } from "@/components/ds/TrustLine";
import { DmaAnalysis } from "@/components/events/DmaAnalysis";
import { fetchMarketingCopy, cmsImageUrl } from "@/lib/cms";
import { getSelfServe } from "@/lib/selfServe";
import { resolveCta } from "@/lib/packageView";
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from "@/content/cta";
import { DMA_BOOKING_URL, DMA_COPY } from "@/content/copy/events-dma";

const FALLBACK_PORTRAIT = "/branding/founder-mugshot.png";

// /events/dma: the double materiality screening. A server component; only
// DmaAnalysis (the questions, the matrix and the profile) is "use client".
// The copy is in src/content/copy/events-dma.ts.
export default async function EventsDma() {
  const [images, selfServe] = await Promise.all([fetchMarketingCopy("about.images", "da"), getSelfServe()]);
  const portrait = cmsImageUrl(images, "founder") ?? FALLBACK_PORTRAIT;
  const { contact, closing } = DMA_COPY;
  const primary = resolveCta(closing.primary, selfServe);
  const secondary = resolveCta(closing.secondary, selfServe);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <DmaAnalysis />

        <section aria-labelledby="dma-h2c" className="mx-auto w-full max-w-(--container-max) px-4 py-16 sm:px-6 md:py-section">
          <div className="grid items-stretch gap-8 lg:grid-cols-2">
            <div className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-soft sm:p-8" data-testid="contact-box">
              <Photo src={portrait} alt={`${contact.personName}, ${contact.personRole}`} className="mb-4" sizes="(min-width: 1024px) 480px, 100vw" />
              <p className="mb-6 text-body-sm text-muted-foreground">
                {contact.personName}, {contact.personRole}
              </p>
              <h2 id="dma-h2c" className="mb-4 text-h3">
                {contact.title}
              </h2>
              <p className="mb-2">{contact.body}</p>
              <p className="mb-2">
                Telefon:{" "}
                <a href={PHONE_HREF} className="font-semibold text-sage underline underline-offset-4">
                  {PHONE_DISPLAY}
                </a>
              </p>
              <p className="mb-2">
                Mail:{" "}
                <a href={CONTACT_EMAIL_HREF} className="font-semibold text-sage underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <Button href={DMA_BOOKING_URL} target="_blank" rel="noopener" variant="primary" full className="mt-4">
                {contact.book}
              </Button>
            </div>
            <div className="flex flex-col justify-center rounded-lg bg-primary px-6 py-16 text-center text-primary-foreground md:px-8 md:py-section-lg">
              <ButtonRow center>
                <Button href={primary.href} variant="inverted">
                  {primary.label}
                </Button>
                {!(secondary.href === primary.href && secondary.label === primary.label) && (
                  <Button href={secondary.href} variant="invertedOutline">
                    {secondary.label}
                  </Button>
                )}
              </ButtonRow>
              <TrustLine items={closing.trust} inverted center />
            </div>
          </div>
          <p className="mt-8 max-w-(--measure-body) text-body-sm text-muted-foreground">{DMA_COPY.disclaimer}</p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
