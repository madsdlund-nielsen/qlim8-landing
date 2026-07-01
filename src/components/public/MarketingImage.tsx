import Image, { type StaticImageData } from "next/image";

interface MarketingImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Renders a marketing image that may come from the CMS (a URL string, unknown
 * intrinsic size) or from a bundled `@assets` import (StaticImageData). Bundled
 * images use next/image with a blur placeholder; CMS images use a plain <img>
 * so `w-full h-auto` works without knowing dimensions. Lets every marketing
 * image be CMS-overridable with a graceful fallback.
 */
export function MarketingImage({ src, alt, className, priority }: MarketingImageProps) {
  if (typeof src === "string") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} loading={priority ? "eager" : "lazy"} />;
  }
  return <Image src={src} alt={alt} className={className} priority={priority} placeholder="blur" />;
}
