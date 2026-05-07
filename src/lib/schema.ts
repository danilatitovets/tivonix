// src/lib/schema.ts — Schema.org JSON-LD for home page

type HomeSchemaInput = {
  pageTitle: string;
  pageDescription: string;
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
          url: "https://www.tivonix.tech/images/tivonix-logo-icon.png",
        },
        image: "https://www.tivonix.tech/og.jpg",
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
