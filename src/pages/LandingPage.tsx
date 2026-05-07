// src/pages/LandingPage.tsx
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import WhyUs from "../components/landing/WhyUs";
import AppsOrbitBlock from "../components/landing/AppsOrbitBlock";
import Benefits from "../components/landing/Benefits";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import ServicesPlans from "../components/landing/ServicesPlans";
import { buildHomePageSchema } from "../lib/schema";
import { homePageSeoFromDict, useLang } from "../i18n/LangProvider";

export default function LandingPage() {
  const { dict, lang } = useLang();
  const seo = homePageSeoFromDict(dict);
  const schemaJsonLd = buildHomePageSchema({
    pageTitle: seo.title,
    pageDescription: seo.description,
  });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath="/"
        schemaJsonLd={schemaJsonLd}
        ogLocalePrimary={lang === "en" ? "en_US" : "ru_RU"}
      />
      <div id="top" />
      <Header />

      <main>
        <div id="hero">
          <Hero />
        </div>

        <div id="stack">
          <WhyUs />
        </div>


        <div id="benefits">
          <Benefits />
        </div>

        <div id="admin">
          <AppsOrbitBlock />
        </div>
                {/* NEW: 4 cards block */}
        <div id="services">
          <ServicesPlans className="py-14 sm:py-16" />
        </div>

        <FAQ />
        <div id="contact" />
      </main>

      <Footer />
    </div>
  );
}