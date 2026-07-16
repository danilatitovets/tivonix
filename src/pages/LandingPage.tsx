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
    <div className="min-h-screen overflow-x-clip bg-black">
      <SEO
        title={
          isEnPath
            ? "TIVONIX — websites, bots and web services for business"
            : seo.title
        }
        description={
          isEnPath
            ? "We build websites, Telegram bots, CRMs, client portals and lead automation — tailored to your business workflow."
            : seo.description
        }
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
