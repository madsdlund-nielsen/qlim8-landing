// The integration row (design-system/komponenter/IntegrationCard.md): the
// systems qlim8 connects to, one card each, with the vendor's own logo
// unaltered (never recoloured or dimmed), how the connection is made, and a
// "Kommer snart" label on the ones the app's catalog has not shipped, under
// the heading "Direkte forbindelser i dag og flere på vej" (INTEGRATION_BAND
// in cta.ts). Absorbs
// the logo band that used to scroll across the homepage (the marquee is gone:
// a calm row, content in the HTML). The footnote under it is the design's
// "Logoer for tredjepartsintegrationer tilhører deres respektive ejere".
//
// Data: src/content/integration-logos.ts (status and subline per system).
import Image from "next/image";
import { INTEGRATION_LOGOS, type IntegrationLogo } from "@/content/integration-logos";
import { INTEGRATION_BAND } from "@/content/cta";
import { cn } from "@/lib/utils";

export const INTEGRATION_FOOTNOTE = "Logoer for tredjepartsintegrationer tilhører deres respektive ejere.";

// Logos are sized by area, not height, so a square symbol and a long wordmark
// read as the same weight: height = sqrt(area / aspect), bounded by the box.
const LOGO_AREA = 2400;
const LOGO_MAX_W = 120;
const LOGO_MAX_H = 40;

function logoSize({ width, height, scale = 1 }: IntegrationLogo) {
  const aspect = width / height;
  let h = Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / aspect));
  let w = h * aspect;
  if (w > LOGO_MAX_W) {
    w = LOGO_MAX_W;
    h = w / aspect;
  }
  return { w: Math.round(w * scale), h: Math.round(h * scale) };
}

function IntegrationCard({ logo }: { logo: IntegrationLogo }) {
  const size = logo.src ? logoSize(logo) : null;
  return (
    <li
      className="flex items-center gap-4 rounded-lg border border-border bg-card px-5 py-4 shadow-soft"
      data-testid={`integration-${logo.id}`}
    >
      <div className="flex h-14 w-32 shrink-0 items-center justify-center">
        {logo.src && size ? (
          <Image src={logo.src} alt={logo.name} width={size.w} height={size.h} style={{ width: size.w, height: size.h }} />
        ) : (
          <strong className="text-body font-semibold text-foreground">{logo.name}</strong>
        )}
      </div>
      <div className="grid gap-1">
        {!(logo.status === "kommer-snart" && logo.subline === INTEGRATION_BAND.statusLabel) && (
          <span className="text-trust text-muted-foreground">{logo.subline}</span>
        )}
        {logo.status === "kommer-snart" && (
          <span className="w-fit rounded-md bg-sand px-2 py-0.5 text-trust font-semibold text-primary">{INTEGRATION_BAND.statusLabel}</span>
        )}
      </div>
    </li>
  );
}

export function IntegrationRow({ footnote = INTEGRATION_FOOTNOTE, className }: { footnote?: string; className?: string }) {
  return (
    <div className={className}>
      <p id="integration-band-title" className="mb-4 text-body-sm font-semibold text-foreground">
        {INTEGRATION_BAND.title}
      </p>
      <ul
        aria-labelledby="integration-band-title"
        className={cn("m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3")}
      >
        {INTEGRATION_LOGOS.map((logo) => (
          <IntegrationCard key={logo.id} logo={logo} />
        ))}
      </ul>
      {footnote && <p className="mt-6 text-trust text-muted-foreground">{footnote}</p>}
    </div>
  );
}
