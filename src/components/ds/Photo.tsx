// A photograph in the design's frame: radius-lg, a sand edge, shadow-soft. The
// slot takes both a bundled static import and a CMS asset URL
// (https://app.qlim8.com/api/cms/assets/...); next/image serves both (the CMS
// host is in next.config.ts remotePatterns). A caller with no image renders no
// Photo at all: there is no placeholder box.
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export type PhotoSource = string | StaticImageData;

const OPTIMISABLE = /^(?:\/(?!\/)|https:\/\/app\.qlim8\.com\/api\/cms\/assets\/|http:\/\/localhost:5000\/api\/cms\/assets\/)/;

const RATIOS = { landscape: "aspect-[3/2]", portrait: "aspect-[4/5]", square: "aspect-square" } as const;

export function Photo({
  src,
  alt,
  ratio = "landscape",
  priority,
  sizes = "(min-width: 1024px) 480px, 100vw",
  className,
}: {
  src: PhotoSource;
  alt: string;
  ratio?: keyof typeof RATIOS;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const frame = cn("relative overflow-hidden rounded-lg border border-border bg-band shadow-soft", RATIOS[ratio], className);
  if (typeof src === "string" && !OPTIMISABLE.test(src)) {
    // An address next/image has not been told about: a plain <img> never throws.
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element -- host not in remotePatterns */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading={priority ? "eager" : "lazy"} />
      </div>
    );
  }
  return (
    <div className={frame}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
