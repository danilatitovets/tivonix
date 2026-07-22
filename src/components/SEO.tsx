// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";
import { JsonLd } from "./JsonLd";

const CANONICAL_ORIGIN = "https://tivonix.tech";
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/images/og-social.jpg`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const OG_IMAGE_ALT = "TIVONIX AI — сайты, боты и автоматизация для бизнеса";

export type SEOProps = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: string;
  schemaJsonLd?: object;
  /** Основной og:locale под текущий язык страницы. */
  ogLocalePrimary?: "ru_RU" | "en_US";
};

export function SEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schemaJsonLd,
  ogLocalePrimary = "ru_RU",
}: SEOProps) {
  const canonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${CANONICAL_ORIGIN}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  const ogLocaleAlt = ogLocalePrimary === "ru_RU" ? "en_US" : "ru_RU";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="TIVONIX" />
        <meta property="og:locale" content={ogLocalePrimary} />
        <meta property="og:locale:alternate" content={ogLocaleAlt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
        <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
        <meta
          property="og:image:type"
          content={ogImage.endsWith(".webp") ? "image/webp" : ogImage.endsWith(".png") ? "image/png" : "image/jpeg"}
        />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
      </Helmet>
      {schemaJsonLd != null ? <JsonLd data={schemaJsonLd} /> : null}
    </>
  );
}
