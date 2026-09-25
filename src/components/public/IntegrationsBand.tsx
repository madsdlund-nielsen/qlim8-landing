// Integrationsbånd: the logos of the systems qlim8 pulls data from, on
// uniform tiles running left in a loop. Pure CSS (src/index.css), so the logos
// are in the server-rendered HTML and nothing ships to the client.
import type { CSSProperties } from "react";
import { INTEGRATION_LOGOS, type IntegrationLogo } from "@/content/integration-logos";

// Tile geometry from sm up, in px. The classes on <Tile> and --band-gap and the
// viewport padding in src/index.css carry the same numbers; these copies size
// the loop and its switch-off point.
const TILE_W = 176;
const GAP = 16;
const SIDE = 16;

// Logos are sized by area, not by height, so a square symbol and a long
// wordmark read as the same weight: height = sqrt(area / aspect), bounded by
// the tile's inner box. A logo whose artwork is optically light or heavy for
// its box corrects that with `scale`.
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
  return { w: w * scale, h: h * scale };
}

// A steady 40 px/s from sm up, whatever the number of logos.
const SET_WIDTH = INTEGRATION_LOGOS.length * (TILE_W + GAP);
const DURATION_S = Math.round(SET_WIDTH / 40);

// Wide enough to show every tile at once: stop the loop, drop the copy, centre
// the row. Only reachable on very wide screens with the current list, but it
// keeps the band honest when the list is short.
const FITS_AT = INTEGRATION_LOGOS.length * TILE_W + (INTEGRATION_LOGOS.length - 1) * GAP + 2 * SIDE;
const FITS_CSS = `@container integrations-band (min-width: ${FITS_AT}px) {
  .integrations-band-viewport { mask-image: none; }
  .integrations-band-track { animation: none; width: 100%; }
  .integrations-band-list { justify-content: center; width: 100%; padding-right: 0; }
  .integrations-band-list + .integrations-band-list { display: none; }
}`;

function Tile({ logo, decorative }: { logo: IntegrationLogo; decorative: boolean }) {
  const { w, h } = logoSize(logo);
  // The vendor's own file in its own colours: the brand rules we could find
  // allow a logo as supplied, never recoloured, so the tiles are what make
  // the band uniform, not the ink.
  return (
    <li className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white sm:h-20 sm:w-44">
      {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG gains nothing from next/image */}
      <img
        src={logo.src}
        alt={decorative ? "" : logo.name}
        title={decorative ? undefined : logo.name}
        width={Math.round(w)}
        height={Math.round(h)}
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ width: `calc(var(--logo-scale) * ${w.toFixed(1)}px)`, height: `calc(var(--logo-scale) * ${h.toFixed(1)}px)` }}
      />
    </li>
  );
}

function LogoList({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul
      className="integrations-band-list"
      {...(decorative ? { "aria-hidden": true } : { "aria-label": "Systemer qlim8 henter data fra" })}
    >
      {INTEGRATION_LOGOS.map((logo) => (
        <Tile key={logo.id} logo={logo} decorative={decorative} />
      ))}
    </ul>
  );
}

// Below sm the tiles are 144 wide, and --logo-scale (144 / 176) shrinks the
// logos by the same factor.
export function IntegrationsBand() {
  return (
    <div
      className="@container/integrations-band [--band-fade:2rem] [--band-gap:0.75rem] [--logo-scale:0.8182] sm:[--band-fade:6rem] sm:[--band-gap:1rem] sm:[--logo-scale:1]"
      data-testid="integrations-band"
    >
      <style>{FITS_CSS}</style>
      <div className="integrations-band-viewport">
        <div
          className="integrations-band-track"
          style={{ "--band-duration": `${DURATION_S}s` } as CSSProperties}
        >
          <LogoList />
          <LogoList decorative />
        </div>
      </div>
    </div>
  );
}
