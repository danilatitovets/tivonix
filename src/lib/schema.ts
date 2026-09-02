// src/lib/schema.ts — Schema.org JSON-LD

import type { Lang } from "../i18n/LangProvider";
import { PLAN_PRICE_USD, pricingCopy } from "../i18n/pricingCopy";
import { PLAN_IDS, type PlanId } from "./pricingData";
import {
  CANONICAL_ORIGIN,
  CONTACT_EMAIL,
  socialSameAs,
} from "../config/siteConfig";
import { canonicalPathForLang } from "./localePaths";

const ORG_ID = `${CANONICAL_ORIGIN}/#org`;
const WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`;
const FOUNDER_ID = `${CANONICAL_ORIGIN}/#danila-titovets`;
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
        "@id": ORG_ID,
        name: "TIVONIX",
        url: `${CANONICAL_ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          url: `${CANONICAL_ORIGIN}/images/tivonix-logo-icon.webp`,
        },
        image: `${CANONICAL_ORIGIN}/images/ceo.png`,
        description: pageDescription,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: CONTACT_EMAIL,
            availableLanguage: ["ru", "en", "zh"],
          },
        ],
        sameAs: socialSameAs(),
        founder: { "@id": FOUNDER_ID },      },
      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: "Данила Титовец",
        alternateName: "Danila Titovets",
        jobTitle: "Founder & Full-stack developer",
        worksFor: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY",
        },
        url: `${CANONICAL_ORIGIN}/`,
        sameAs: socialSameAs(),
        email: CONTACT_EMAIL,
        image: `${CANONICAL_ORIGIN}/images/ceo.png`,      },
      {
        "@type": "ProfessionalService",
        "@id": `${CANONICAL_ORIGIN}/#service`,
        name: "TIVONIX",
        url: `${CANONICAL_ORIGIN}/`,
        description: pageDescription,
        provider: { "@id": FOUNDER_ID },
        areaServed: "Worldwide",
        email: CONTACT_EMAIL,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${CANONICAL_ORIGIN}/`,
        name: "TIVONIX",
        publisher: { "@id": ORG_ID },
        inLanguage: ["ru", "en", "zh"],
      },
      {
        "@type": "WebPage",
        "@id": `${CANONICAL_ORIGIN}/#home`,
        url: `${CANONICAL_ORIGIN}/`,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        inLanguage: ["ru", "en", "zh"],      },
    ],
  };
}

type ProjectCaseSchemaInput = {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  domain?: string;
  tags: string[];
  stack?: string[];
  lang: Lang;
  dateModified?: string;
};

/** Case study / CreativeWork JSON-LD для /projects/:id */
export function buildProjectCaseSchema({
  id,
  title,
  description,
  coverUrl,
  domain,
  tags,
  stack,
  lang,
  dateModified,
}: ProjectCaseSchemaInput) {
  const pagePath = canonicalPathForLang(`/projects/${id}`, lang);
  const pageUrl = `${CANONICAL_ORIGIN}${pagePath}`;
  const inLanguage = lang === "ru" ? "ru" : lang === "zh" ? "zh-CN" : "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "TIVONIX",
        url: `${CANONICAL_ORIGIN}/`,      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "ru" ? "Главная" : "Home",
            item: `${CANONICAL_ORIGIN}${canonicalPathForLang("/", lang)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "ru" ? "Проекты" : lang === "zh" ? "项目" : "Projects",
            item: `${CANONICAL_ORIGIN}${canonicalPathForLang("/projects", lang)}`,          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${title} — ${lang === "ru" ? "кейс TIVONIX" : "TIVONIX case study"}`,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${pageUrl}#creativework` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        inLanguage,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: coverUrl,
        },
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#creativework`,
        name: title,
        description,
        url: pageUrl,
        image: coverUrl,
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },        inLanguage,
        keywords: [...tags, ...(stack ?? [])].join(", "),
        ...(domain ? { sameAs: [domain] } : {}),
        ...(dateModified ? { dateModified } : {}),
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

    return {
      "@type": "Offer",
      name: plan.name,
      description: plan.desc,
      ...(hasPrice
        ? {
            price: usd,
            priceCurrency: "USD",
          }
        : {}),
      url: `${CANONICAL_ORIGIN}${canonicalPathForLang("/plans", lang)}#pricing`,
      seller: { "@id": ORG_ID },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "TIVONIX",
        url: `${CANONICAL_ORIGIN}/`,
      },
      {
        "@type": "WebPage",
        "@id": `${CANONICAL_ORIGIN}${canonicalPathForLang("/plans", lang)}#webpage`,
        url: `${CANONICAL_ORIGIN}${canonicalPathForLang("/plans", lang)}`,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: lang === "ru" ? "ru" : lang === "zh" ? "zh-CN" : "en",
      },
      {
        "@type": "Service",
        "@id": `${CANONICAL_ORIGIN}${canonicalPathForLang("/plans", lang)}#service`,
        name: pageTitle,
        description: pageDescription,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
        offers,
      },
    ],
  };
}
