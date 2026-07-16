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
        "@id": "https://www.tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://www.tivonix.tech/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.tivonix.tech/images/tivonix-logo-icon.webp",
        },
        image: "https://www.tivonix.tech/images/ceo.png",
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
        founder: { "@id": "https://www.tivonix.tech/#danila-titovets" },
      },
      {
        "@type": "Person",
        "@id": "https://www.tivonix.tech/#danila-titovets",
        name: "Данила Титовец",
        alternateName: "Danila Titovets",
        jobTitle: "Founder & Full-stack developer",
        worksFor: { "@id": "https://www.tivonix.tech/#org" },
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY",
        },
        url: "https://www.tivonix.tech/",
        sameAs: ["https://t.me/TIVONIX"],
        email: "tivoonix@gmail.com",
        image: "https://www.tivonix.tech/images/ceo.png",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.tivonix.tech/#service",
        name: "TIVONIX",
        url: "https://www.tivonix.tech/",
        description: pageDescription,
        provider: { "@id": "https://www.tivonix.tech/#danila-titovets" },
        areaServed: "Worldwide",
        email: "tivoonix@gmail.com",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.tivonix.tech/#website",
        url: "https://www.tivonix.tech/",
        name: "TIVONIX",
        publisher: { "@id": "https://www.tivonix.tech/#org" },
        inLanguage: ["ru", "en"],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.tivonix.tech/#home",
        url: "https://www.tivonix.tech/",
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": "https://www.tivonix.tech/#website" },
        about: { "@id": "https://www.tivonix.tech/#org" },
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
