// src/pages/LandingPage.tsx
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import FeaturedProjectsSection from "../components/landing/FeaturedProjectsSection";
import LandingPainSection from "../components/landing/LandingPainSection";
import MainOfferSection from "../components/landing/MainOfferSection";
import AiPremiumSection from "../components/landing/AiPremiumSection";
import ComparisonSection from "../components/landing/ComparisonSection";
import HomePricingSection from "../components/landing/HomePricingSection";
import ProcessTimelineSection from "../components/landing/ProcessTimelineSection";
import FounderSection from "../components/landing/FounderSection";
import HomeTestimonialsSection from "../components/landing/HomeTestimonialsSection";
import FAQ from "../components/landing/FAQ";
import FinalCTASection from "../components/landing/FinalCTASection";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
import { buildHomePageSchema } from "../lib/schema";
import { homePageSeoFromDict, useLang } from "../i18n/LangProvider";
import { useLocation } from "react-router-dom";

export default function LandingPage() {
  const { dict, lang } = useLang();
  const { pathname } = useLocation();
  const seo = homePageSeoFromDict(dict);
  const isEnPath = pathname === "/en" || pathname.startsWith("/en/");
  const canonicalPath = isEnPath ? "/en" : "/";
  const schemaJsonLd = buildHomePageSchema({
    pageTitle: seo.title,
    pageDescription: seo.description,
  });

  return (
    <div className="landing-caldera min-h-screen overflow-x-clip bg-black">
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath={canonicalPath}
        schemaJsonLd={schemaJsonLd}
        ogLocalePrimary={lang === "en" ? "en_US" : "ru_RU"}
        hreflang
      />
      <div id="top" />
      <Header />

      <main>
        <div id="hero">
          <Hero />
        </div>

        <FeaturedProjectsSection />

        <LandingPainSection />

        <MainOfferSection />

        <AiPremiumSection />

        <ComparisonSection />

        <HomePricingSection />

        <ProcessTimelineSection />

        <FounderSection />

        <HomeTestimonialsSection />

        <FAQ />
      </main>

      <FinalCTASection />

      <Footer />
    </div>
  );
}
