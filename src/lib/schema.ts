// src/lib/schema.ts — Schema.org JSON-LD for home page (all URLs canonical www)
export const HOME_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tivonix.tech/#org",
      name: "TIVONIX",
      url: "https://www.tivonix.tech/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tivonix.tech/images/tivonix-logo-icon.png",
      },
      image: "https://www.tivonix.tech/og.jpg",
      description:
        "TIVONIX — делаем сайты, лендинги и веб-продукты: от идеи и прототипа до запуска, поддержки и развития.",
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
      name: "TIVONIX — сайты и цифровые продукты",
      description:
        "TIVONIX — делаем сайты, лендинги и веб-продукты: от идеи и прототипа до запуска, поддержки и развития.",
      isPartOf: { "@id": "https://www.tivonix.tech/#website" },
      about: { "@id": "https://www.tivonix.tech/#org" },
      inLanguage: ["ru", "en"],
    },
  ],
} as const;
