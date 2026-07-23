// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";
import { hreflangPair } from "../lib/localePaths";

const CANONICAL_ORIGIN = "https://tivonix.tech";
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/images/og-social.jpg`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const OG_IMAGE_ALT = "TIVONIX — websites, bots and automation for business";

export type SEOProps = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: string;
  schemaJsonLd?: object;
  /** Основной og:locale под текущий язык страницы. */
  ogLocalePrimary?: "ru_RU" | "en_US" | "zh_CN";
  /** Emit hreflang alternate links for RU / EN / ZH. */
  hreflang?: boolean;
};

export function SEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schemaJsonLd,
  ogLocalePrimary = "ru_RU",
  hreflang = false,
}: SEOProps) {
  const canonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${CANONICAL_ORIGIN}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  const alts =
    ogLocalePrimary === "ru_RU"
      ? (["en_US", "zh_CN"] as const)
      : ogLocalePrimary === "en_US"
        ? (["ru_RU", "zh_CN"] as const)
        : (["ru_RU", "en_US"] as const);

  const hrefs = hreflang ? hreflangPair(canonicalPath) : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {hrefs ? <link rel="alternate" hrefLang="ru" href={hrefs.ru} /> : null}
      {hrefs ? <link rel="alternate" hrefLang="en" href={hrefs.en} /> : null}
      {hrefs ? <link rel="alternate" hrefLang="zh" href={hrefs.zh} /> : null}
      {hrefs ? <link rel="alternate" hrefLang="zh-CN" href={hrefs.zh} /> : null}
      {hrefs ? <link rel="alternate" hrefLang="x-default" href={hrefs.xDefault} /> : null}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="TIVONIX" />
      <meta property="og:locale" content={ogLocalePrimary} />
      {alts.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
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
      {schemaJsonLd != null ? (
        <script type="application/ld+json">{JSON.stringify(schemaJsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
