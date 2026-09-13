import { useLocation } from "react-router-dom";
import ProductLanding from "../components/home2026/ProductLanding";
import { SEO } from "../components/SEO";
import { buildHomePageSchema } from "../lib/schema";
import { useLang } from "../i18n/LangProvider";

const HOME_SEO = {
  ru: {
    title: "TIVONIX — разработка SaaS, бизнес-систем и AI-продуктов",
    description:
      "Проектируем и разрабатываем SaaS, внутренние платформы, CRM, marketplaces и AI-powered systems — от архитектуры и UX до backend и production.",
  },
  en: {
    title: "TIVONIX — Product Engineering for SaaS, Business Systems & AI",
    description:
      "We design and engineer SaaS, internal platforms, marketplaces and AI-powered systems — from product architecture and UX to backend and production.",
  },
  zh: {
    title: "TIVONIX — SaaS、业务系统与 AI 产品工程",
    description:
      "我们设计并开发 SaaS、内部平台、marketplaces 和 AI-powered systems，从产品架构与 UX 到 backend 和 production。",
  },
} as const;

export default function LandingPage() {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const seo = HOME_SEO[lang];
  const canonicalPath =
    pathname === "/zh" || pathname.startsWith("/zh/")
      ? "/zh"
      : pathname === "/en" || pathname.startsWith("/en/")
        ? "/en"
        : "/";
  const schemaJsonLd = buildHomePageSchema({
    pageTitle: seo.title,
    pageDescription: seo.description,
  });

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonicalPath={canonicalPath}
        schemaJsonLd={schemaJsonLd}
        ogLocalePrimary={lang === "zh" ? "zh_CN" : lang === "en" ? "en_US" : "ru_RU"}
        hreflang
      />
      <ProductLanding />
    </>
  );
}
