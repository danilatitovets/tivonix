// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";

const CANONICAL_ORIGIN = "https://tivonix.tech";
const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/og.jpg`;

export type SEOProps = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: string;
  schemaJsonLd?: object;
  /** Путь без origin, напр. "/" или "/projects" — добавит alternate hreflang (?lang=ru|en). */
  localizedPath?: string;
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
  localizedPath,
  ogLocalePrimary = "ru_RU",
}: SEOProps) {
  const canonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${CANONICAL_ORIGIN}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  const ogLocaleAlt = ogLocalePrimary === "ru_RU" ? "en_US" : "ru_RU";

  const pathForHreflang =
    localizedPath != null
      ? `${localizedPath.startsWith("/") ? localizedPath : `/${localizedPath}`}`
      : null;
  const hrefLangRu =
    pathForHreflang != null
      ? `${CANONICAL_ORIGIN}${pathForHreflang === "/" ? "/" : pathForHreflang}?lang=ru`
      : null;
  const hrefLangEn =
    pathForHreflang != null
      ? `${CANONICAL_ORIGIN}${pathForHreflang === "/" ? "/" : pathForHreflang}?lang=en`
      : null;
  const hrefLangDefault =
    pathForHreflang != null ? `${CANONICAL_ORIGIN}${pathForHreflang === "/" ? "/" : pathForHreflang}` : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {hrefLangRu != null && hrefLangEn != null && hrefLangDefault != null ? (
        <>
          <link rel="alternate" hrefLang="ru" href={hrefLangRu} />
          <link rel="alternate" hrefLang="en" href={hrefLangEn} />
          <link rel="alternate" hrefLang="x-default" href={hrefLangDefault} />
        </>
      ) : null}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="TIVONIX" />
      <meta property="og:locale" content={ogLocalePrimary} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TIVONIX" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="TIVONIX" />

      {schemaJsonLd != null && (
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      )}
    </Helmet>
  );
}
