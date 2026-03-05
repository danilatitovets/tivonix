// src/pages/LandingPage.tsx
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import WhyUs from "../components/landing/WhyUs";
import AppsOrbitBlock from "../components/landing/AppsOrbitBlock";
import Benefits from "../components/landing/Benefits";
import FAQ from "../components/landing/FAQ";
import SeoContent from "../components/landing/SeoContent";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import ServicesPlans from "../components/landing/ServicesPlans";
import { HOME_PAGE_SCHEMA } from "../lib/schema";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SEO
        title="TIVONIX — сайты и цифровые продукты"
        description="TIVONIX — делаем сайты, лендинги и веб-продукты: от идеи и прототипа до запуска, поддержки и развития."
        canonicalPath="/"
        schemaJsonLd={HOME_PAGE_SCHEMA}
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
        <SeoContent />
        <div id="contact" />
      </main>

      <Footer />
    </div>
  );
}