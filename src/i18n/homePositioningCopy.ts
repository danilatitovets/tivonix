import type { Lang } from "./LangProvider";

type HeroStage = {
  headline: string;
  lead: string;
  headlineLines?: string[];
};

type HomePositioningCopy = {
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    scrollStages: readonly HeroStage[];
    ctaPrimary: string;
    ctaSecondary: string;
    micro: string;
  };
};

const RU: HomePositioningCopy = {
  seo: {
    title: "TIVONIX — Product Engineering: SaaS, FinTech и бизнес-системы",
    description:
      "Проектируем и разрабатываем SaaS, fintech, marketplaces, CRM/ERP, внутренние платформы, клиентские кабинеты, AI и automation — от архитектуры до production.",
  },
  hero: {
    eyebrow: "PRODUCT ENGINEERING · SAAS · FINTECH · BUSINESS SYSTEMS",
    scrollStages: [
      {
        headline: "Программные продукты — от архитектуры до production",
        headlineLines: ["Программные продукты", "от архитектуры до production"],
        lead:
          "SaaS, fintech, marketplaces, внутренние платформы, client portals, AI и automation — с одним техническим владельцем от scope до запуска.",
      },
      {
        headline: "Не handoff. Рабочая система.",
        headlineLines: ["Не handoff.", "Рабочая система."],
        lead:
          "Проектируем UX, data model, роли, интеграции и failure modes в одном контексте — чтобы первая версия не стала одноразовым прототипом.",
      },
      {
        headline: "Founder-led product engineering",
        headlineLines: ["Founder-led", "product engineering"],
        lead:
          "Senior ownership на ключевых решениях, production code, передача исходников и доступов, прозрачные границы scope.",
      },
    ],
    ctaPrimary: "Обсудить продукт",
    ctaSecondary: "Посмотреть продукты в production",
    micro:
      "Сначала контекст и риски. Затем scope, архитектура и реалистичный следующий шаг.",
  },
};

const EN: HomePositioningCopy = {
  seo: {
    title: "TIVONIX — Product Engineering for SaaS, Fintech & Business Systems",
    description:
      "We design and build SaaS, fintech, marketplaces, internal platforms, client portals, AI and automation — from architecture to production.",
  },
  hero: {
    eyebrow: "PRODUCT ENGINEERING · SAAS · FINTECH · BUSINESS SYSTEMS",
    scrollStages: [
      {
        headline: "Software products — from architecture to production",
        headlineLines: ["Software products", "from architecture to production"],
        lead:
          "SaaS, fintech, marketplaces, internal platforms, client portals, AI and automation — with one technical owner from scope to launch.",
      },
      {
        headline: "Not a handoff. A working system.",
        headlineLines: ["Not a handoff.", "A working system."],
        lead:
          "We design UX, data models, roles, integrations and failure modes together, so the first release is not a disposable prototype.",
      },
      {
        headline: "Founder-led product engineering",
        headlineLines: ["Founder-led", "product engineering"],
        lead:
          "Senior ownership on critical decisions, production code, source and access handover, and explicit scope boundaries.",
      },
    ],
    ctaPrimary: "Discuss your product",
    ctaSecondary: "See products in production",
    micro:
      "Context and risks first. Then scope, architecture and a realistic next step.",
  },
};

const ZH: HomePositioningCopy = {
  seo: {
    title: "TIVONIX — SaaS、FinTech 与业务系统的 Product Engineering",
    description:
      "从架构到 production，设计并开发 SaaS、金融科技、Marketplace、内部平台、客户门户、AI 与自动化系统。",
  },
  hero: {
    eyebrow: "PRODUCT ENGINEERING · SAAS · FINTECH · BUSINESS SYSTEMS",
    scrollStages: [
      {
        headline: "从架构到 production 的软件产品",
        headlineLines: ["软件产品工程", "从架构到 production"],
        lead:
          "SaaS、金融科技、Marketplace、内部平台、客户门户、AI 与自动化——由同一技术负责人贯穿 scope、架构、开发与上线。",
      },
      {
        headline: "不是交接文件，而是能运行的系统",
        headlineLines: ["不是 handoff", "而是能运行的系统"],
        lead:
          "UX、数据模型、权限、集成与 failure modes 在同一上下文中设计，避免第一版变成一次性原型。",
      },
      {
        headline: "Founder-led product engineering",
        headlineLines: ["Founder-led", "product engineering"],
        lead:
          "关键技术决策由 senior owner 负责，交付 production code、源码与访问权限，并明确 scope 边界。",
      },
    ],
    ctaPrimary: "讨论您的产品",
    ctaSecondary: "查看已上线产品",
    micro: "先理解业务背景与风险，再确定 scope、架构和可执行的下一步。",
  },
};

export function homePositioningCopy(lang: Lang): HomePositioningCopy {
  if (lang === "en") return EN;
  if (lang === "zh") return ZH;
  return RU;
}
