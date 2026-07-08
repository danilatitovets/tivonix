// src/lib/schema.ts — Schema.org JSON-LD

import type { Lang } from "../i18n/LangProvider";
import { LAUNCH_DISCOUNT_PERCENT, PLAN_PRICE_USD, pricingCopy } from "../i18n/pricingCopy";
import { PLAN_IDS, type PlanId } from "./pricingData";

type HomeSchemaInput = {
  pageTitle: string;
  pageDescription: string;
};

type PricingSchemaInput = {
  pageTitle: string;
  pageDescription: string;
  lang: Lang;
};

/** Совпадает с title/description из Hero / react-helmet на главной. */
export function buildHomePageSchema({ pageTitle, pageDescription }: HomeSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://tivonix.tech/",
        logo: {
          "@type": "ImageObject",
          url: "https://tivonix.tech/images/tivonix-logo-icon.webp",
        },
        image: "https://tivonix.tech/images/ceo.webp",
        description: pageDescription,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "tivoonix@gmail.com",
            availableLanguage: ["ru", "en"],
          },
        ],
        sameAs: ["https://t.me/TIVONIX"],
      },
      {
        "@type": "WebSite",
        "@id": "https://tivonix.tech/#website",
        url: "https://tivonix.tech/",
        name: "TIVONIX",
        publisher: { "@id": "https://tivonix.tech/#org" },
        inLanguage: ["ru", "en"],
      },
      {
        "@type": "WebPage",
        "@id": "https://tivonix.tech/#home",
        url: "https://tivonix.tech/",
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": "https://tivonix.tech/#website" },
        about: { "@id": "https://tivonix.tech/#org" },
        inLanguage: ["ru", "en"],
      },
    ],
  };
}

export function buildPricingPageSchema({ pageTitle, pageDescription, lang }: PricingSchemaInput) {
  const copy = pricingCopy(lang);

  const offers = PLAN_IDS.map((id: PlanId) => {
    const plan = copy.plans[id];
    const usd = PLAN_PRICE_USD[id as keyof typeof PLAN_PRICE_USD];
    const hasPrice = typeof usd === "number";
    const discounted = hasPrice
      ? Math.round(usd * (1 - LAUNCH_DISCOUNT_PERCENT / 100))
      : undefined;

    return {
      "@type": "Offer",
      name: plan.name,
      description: plan.desc,
      ...(hasPrice
        ? {
            price: discounted,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: discounted,
              priceCurrency: "USD",
            },
          }
        : {}),
      url: "https://tivonix.tech/plans#pricing",
      seller: { "@id": "https://tivonix.tech/#org" },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://tivonix.tech/",
      },
      {
        "@type": "WebPage",
        "@id": "https://tivonix.tech/plans#webpage",
        url: "https://tivonix.tech/plans",
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": "https://tivonix.tech/#website" },
        inLanguage: lang === "ru" ? "ru" : "en",
      },
      {
        "@type": "Service",
        "@id": "https://tivonix.tech/plans#service",
        name: pageTitle,
        description: pageDescription,
        provider: { "@id": "https://tivonix.tech/#org" },
        areaServed: "Worldwide",
        offers,
      },
    ],
  };
}
