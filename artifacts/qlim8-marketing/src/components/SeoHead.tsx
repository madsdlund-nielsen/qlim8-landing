import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;
  description: string;
  canonical: string;
}

export function SeoHead({ title, description, canonical }: SeoHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
}
