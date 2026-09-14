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
      ? "Product Engineering и Launch Packages — TIVONIX"
      : lang === "zh"
        ? "Product Engineering 与 Launch Packages — TIVONIX"
        : "Product Engineering and Launch Packages — TIVONIX";
  const description =
    lang === "ru"
      ? "Сложные SaaS, FinTech, marketplaces и internal systems оцениваются после brief. Start, Growth и Product остаются launch-пакетами для ограниченного scope."
      : lang === "zh"
        ? "复杂 SaaS、金融科技、市场平台与内部系统在 brief 后评估。Start、Growth 与 Product 保留为有限范围的 launch packages。"
        : "Complex SaaS, FinTech, marketplaces and internal systems are scoped after a brief. Start, Growth and Product remain launch packages for bounded work.";

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
