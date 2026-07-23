import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PricingPlansSection from "../components/landing/PricingPlansSection";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { buildPricingPageSchema } from "../lib/schema";
import { trackPricingView } from "../lib/analytics";

export default function PricingPage() {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const isEnPath = pathname === "/en/plans";
  const isZhPath = pathname === "/zh/plans";

  useEffect(() => {
    trackPricingView();
  }, []);

  const title =
    lang === "ru"
      ? "Планы запуска — TIVONIX"
      : "Launch plans — TIVONIX";
  const description =
    lang === "ru"
      ? "Тарифы TIVONIX: Start, Growth, Product и Custom — от лендинга с заявками до веб-сервиса с CRM, оплатой и автоматизацией."
      : "TIVONIX plans: Start, Growth, Product and Custom — from a lead page to a full web service with CRM, payments and automation.";

  const schemaJsonLd = buildPricingPageSchema({ pageTitle: title, pageDescription: description, lang });
  const canonicalPath = isZhPath ? "/zh/plans" : isEnPath ? "/en/plans" : "/plans";

  return (
    <div className="landing-caldera plans-caldera min-h-screen overflow-x-clip bg-black">
      <SEO
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        ogLocalePrimary={lang === "zh" ? "zh_CN" : lang === "en" ? "en_US" : "ru_RU"}
        hreflang
        schemaJsonLd={schemaJsonLd}
      />
      <div id="top" />
      <Header />

      <main>
        <PricingPlansSection className="!pt-[calc(var(--tivonix-header-spacer)+1rem)] sm:!pt-[calc(var(--tivonix-header-spacer)+1.5rem)]" />
      </main>

      <Footer />
    </div>
  );
}
