// src/pages/LandingPage.tsx
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import LandingPainSection from "../components/landing/LandingPainSection";
import MainOfferSection from "../components/landing/MainOfferSection";
import AiPremiumSection from "../components/landing/AiPremiumSection";
import ComparisonSection from "../components/landing/ComparisonSection";
import CasesSection from "../components/landing/CasesSection";
import TivonixAudienceSection from "../components/landing/TivonixAudienceSection";
import ProcessTimelineSection from "../components/landing/ProcessTimelineSection";
import FAQ from "../components/landing/FAQ";
import FinalCTASection from "../components/landing/FinalCTASection";
import Footer from "../components/landing/Footer";
import { SEO } from "../components/SEO";
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
    <div className="min-h-screen overflow-x-clip bg-black">
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

        <LandingPainSection />

        <MainOfferSection />

        <AiPremiumSection />

        <ComparisonSection />

        <div id="new-case">
          <CasesSection />
        </div>

        <TivonixAudienceSection />

        <ProcessTimelineSection />

        <FAQ />
      </main>

      <FinalCTASection />

      <Footer />
    </div>
  );
}
