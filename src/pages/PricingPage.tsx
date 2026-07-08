import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import PricingPlansSection from "../components/landing/PricingPlansSection";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { buildPricingPageSchema } from "../lib/schema";

export default function PricingPage() {
  const { lang } = useLang();

  const title =
    lang === "ru"
      ? "Планы запуска — TIVONIX"
      : "Launch plans — TIVONIX";
  const description =
    lang === "ru"
      ? "Тарифы TIVONIX: Start, Growth, Product и Custom — от лендинга с заявками до веб-сервиса с CRM, оплатой и автоматизацией."
      : "TIVONIX plans: Start, Growth, Product and Custom — from a lead page to a full web service with CRM, payments and automation.";

  const schemaJsonLd = buildPricingPageSchema({ pageTitle: title, pageDescription: description, lang });

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)]">
      <SEO
        title={title}
        description={description}
        canonicalPath="/plans"
        ogLocalePrimary={lang === "en" ? "en_US" : "ru_RU"}
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
