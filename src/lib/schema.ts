// src/lib/schema.ts — Schema.org JSON-LD for home page (canonical non-www)

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
        "@id": "https://tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://tivonix.tech/",
        logo: {
          "@type": "ImageObject",
          url: "https://tivonix.tech/images/tivonix-logo-icon.png",
        },
        image: "https://tivonix.tech/og.jpg",
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
