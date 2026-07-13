import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { createContext, useState, useEffect, useMemo, useContext, useRef, useLayoutEffect, useCallback, lazy, Suspense } from "react";
import { renderToString } from "react-dom/server";
import { useNavigate, useLocation, Link, useParams, Navigate, Routes, Route, MemoryRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChevronDown, ArrowRight, Loader2, Check, Shield, ArrowUpRight, Phone, Mail, Globe, Globe2, MapPin, Maximize2, Search, Bot, Zap, LayoutDashboard, Users, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight, FolderOpen, Plus, Minus } from "lucide-react";
import { SiTelegram, SiInstagram, SiWhatsapp, SiGmail, SiHubspot, SiGooglesheets, SiNotion, SiGooglecalendar, SiClickup, SiStripe, SiGoogledocs, SiGoogleanalytics, SiZapier } from "react-icons/si";
import createGlobe from "cobe";
import { FiBell } from "react-icons/fi";
const LANG_STORAGE_KEY = "tivonix_lang";
const DICT = {
  ru: {
    header: {
      nav: {
        contacts: "контакты",
        projects: "проекты",
        faq: "FAQ"
      },
      start: "Начать",
      menu: "Меню",
      home: "На главную",
      language: "Язык"
    },
    hero: {
      eyebrow: "TIVONIX • САЙТЫ, БОТЫ, CRM",
      titleLine1: "Сайты,",
      titleLine2Prefix: "боты",
      titleLine2Premium: "и веб-сервисы",
      titleLine3: "которые помогают",
      titleLine4: "получать заявки",
      subtitle: "Разбираем задачу, предлагаем решение и запускаем продукт под ключ: лендинг, Telegram-бот, личный кабинет, CRM или автоматизацию.",
      note: "Ответим в течение дня • Первая консультация — бесплатно",
      emailPlaceholder: "Рабочий email",
      btnDemo: "Обсудить проект",
      btnTelegram: "Написать в Telegram",
      btnAutomation: "Посмотреть, что делаем",
      statLabel: "заявок сегодня",
      leadsAria: "Примеры входящих заявок",
      leads: [
        { title: "TIVONIX Bot", source: "Новая заявка: нужен расчёт сайта под рекламу", time: "сейчас", channel: "telegram" },
        { title: "maria_beauty", source: "Здравствуйте, хочу консультацию по услугам", time: "1 мин", channel: "instagram" },
        { title: "Анна", source: "Можно записаться на маникюр в субботу?", time: "2 мин", channel: "whatsapp" },
        { title: "Коммерческое предложение", source: "Отправил КП по разработке — посмотрите вложение", time: "3 мин", channel: "gmail" },
        { title: "Форма на сайте", source: "Иван · лендинг под рекламу · +7 999 123-45-67", time: "4 мин", channel: "website" },
        { title: "Реклама · Лиды", source: "Новый лид: автоматизация для салона красоты", time: "6 мин", channel: "facebook" },
        { title: "Сообщение", source: "Интересует автоматизация заявок — какая цена?", time: "7 мин", channel: "vk" },
        { title: "Новый контакт", source: "ООО «СтройДом» — оставил заявку в CRM", time: "9 мин", channel: "hubspot" },
        { title: "Бриф проекта", source: "Заполнили бриф в Notion — можно смотреть", time: "11 мин", channel: "notion" },
        { title: "Встреча с клиентом", source: "Завтра в 15:00 · обсуждение MVP", time: "13 мин", channel: "calendar" },
        { title: "TIVONIX Bot", source: "Заявка с бота: интеграция Telegram и CRM", time: "14 мин", channel: "telegram" },
        { title: "studio_pro", source: "Сколько стоит сайт с онлайн-записью?", time: "15 мин", channel: "instagram" },
        { title: "Дмитрий", source: "Хочу онлайн-запись для клиентов в салон", time: "16 мин", channel: "whatsapp" },
        { title: "Форма на сайте", source: "Новая заявка: лендинг + уведомления в Telegram", time: "18 мин", channel: "website" }
      ]
    },
    curtain: {
      title: "Процесс разработки — по шагам",
      statusDone: "Готово",
      statusInProgress: "В процессе…",
      steps: [
        "Мы — TIVONIX. Продуктовая студия: дизайн + разработка.",
        "Фиксируем цель и требования: SaaS / MVP, сроки, приоритеты.",
        "Прототип и UI: структура, экраны, состояния, стиль как у топ-SaaS.",
        "Разработка: личный кабинет, админ-панели, роли, таблицы, фильтры.",
        "Интеграции: платежи, уведомления, почта, аналитика, CRM.",
        "Качество: тесты, оптимизация, безопасность, чистая архитектура.",
        "Релиз: деплой, домен/SSL, мониторинг, документация.",
        "После запуска: поддержка, улучшения, рост продукта."
      ]
    },
    whyUs: {
      badge: "СТЕК • ТЕХНОЛОГИИ • ПРОДУКТ",
      titleTop: "С чем мы",
      titleBottom: "работаем",
      description: "Полный стек для SaaS и продуктов: фронт, бэкенд, база, UI-система и оптимизация. Делаем так, чтобы выглядело “дорого” и масштабировалось.",
      footerBadge: "STACK READY • SaaS / MVP",
      techs: {
        react: { label: "React", sub: "UI для продукта, компоненты, архитектура" },
        ts: { label: "TypeScript", sub: "Типы, безопасность, масштабирование" },
        js: { label: "JavaScript", sub: "Логика, анимации, интеграции" },
        node: { label: "Node.js", sub: "API, сервисы, фоновые задачи" },
        express: { label: "Express", sub: "Маршруты, middleware, auth" },
        supabase: { label: "Supabase", sub: "Postgres, RLS, Storage, Auth" },
        postgres: { label: "PostgreSQL", sub: "Схемы, индексы, запросы" },
        tailwind: { label: "Tailwind CSS", sub: "UI-система, токены, скорость верстки" },
        saas: { label: "SaaS UI / UX", sub: "Стекло, сетка, детали, премиум-типографика" },
        perf: { label: "Performance", sub: "Оптимизация, lazy, UX-скорость" }
      }
    },
    newCase: {
      label: "новый кейс",
      title: "NEW",
      live: "В продакшене",
      cta: "Смотреть кейс",
      ctaExternal: "Открыть spliton.io"
    },
    orbit: {
      badge: "ADMIN PANEL • SaaS",
      titlePrefix: "Админ-панели для",
      titleHighlight: "вашего продукта",
      description: "Роли и доступы, таблицы с фильтрами, статусы/модерация, дашборды и интеграции — всё аккуратно и масштабируемо.",
      bullets: [
        { title: "Роли и доступы", desc: "пользователи, права, аудит" },
        { title: "Таблицы и управление", desc: "поиск, фильтры, экспорт" },
        { title: "Аналитика и процессы", desc: "дашборды, статусы, выплаты" }
      ],
      primaryCta: "Обсудить проект",
      secondaryCta: "Кейсы",
      footnote: "MVP / Кабинет клиента / Админка / Интеграции",
      chat: {
        clientLabel: "клиент • уточнение",
        clientSubtitle: "SaaS + админ-панель",
        msgClient1: "Привет! Делаем SaaS. А вы делаете админ-панели для управления пользователями и данными?",
        msgMe1: "Да ✅ Сделаю админку: роли/доступы, таблицы (поиск/фильтры), статусы, модерация, аналитика. Подключу API и базовую безопасность.",
        msgClient2: "Отлично. Можно дашборд и историю действий?",
        inputPlaceholder: "Сообщение…",
        quickCallTitle: "Быстрый созвон",
        quickCallDuration: "15 минут",
        quickCallHint: "Нажмите, чтобы говорить"
      }
    },
    benefits: {
      badge: "ЭТАПЫ",
      titlePrefix: "Один блок — одна мысль.",
      titleHighlight: "ПРЕИМУЩЕСТВА",
      rowLabel: "ПРЕИМУЩЕСТВО",
      rowMeta: "UI • код • скорость • масштабирование",
      items: [
        {
          title: "Быстрый MVP",
          desc: "Собираем ядро продукта без лишнего: приоритеты, сроки, релизная логика.",
          badge: "1–3 недели"
        },
        {
          title: "Премиум UI",
          desc: "Сетка, типографика, состояния, микро-детали — как у топ-SaaS.",
          badge: "сразу «дорого»"
        },
        {
          title: "Безопасность и роли",
          desc: "Роли/доступы, защита API, базовые практики безопасности, контроль данных.",
          badge: "Auth / RLS"
        },
        {
          title: "Интеграции",
          desc: "Платежи, почта, уведомления, аналитика, CRM — подключаем стабильно.",
          badge: "webhooks"
        },
        {
          title: "Чистая архитектура",
          desc: "Компоненты, типы, слои API и структура под рост — без «свалки» через месяц.",
          badge: "масштабируемо"
        },
        {
          title: "После релиза",
          desc: "Деплой, домен/SSL, мониторинг, багфиксы и план улучшений по метрикам.",
          badge: "поддержка"
        }
      ]
    }
  },
  en: {
    header: {
      nav: {
        contacts: "contacts",
        projects: "projects",
        faq: "FAQ"
      },
      start: "Start",
      menu: "Menu",
      home: "Home",
      language: "Language"
    },
    hero: {
      eyebrow: "TIVONIX • WEBSITES, BOTS, CRM",
      titleLine1: "Websites,",
      titleLine2Prefix: "bots",
      titleLine2Premium: "and web apps",
      titleLine3: "that help you",
      titleLine4: "capture leads",
      subtitle: "We review your task, suggest a solution and launch it end-to-end: landing page, Telegram bot, client area, CRM or automation.",
      note: "We reply within a day • First consultation is free",
      emailPlaceholder: "Work email",
      btnDemo: "Discuss the project",
      btnTelegram: "Message us on Telegram",
      btnAutomation: "See what we build",
      statLabel: "leads today",
      leadsAria: "Sample incoming leads",
      leads: [
        { title: "TIVONIX Bot", source: "New lead: need a website quote for ads", time: "now", channel: "telegram" },
        { title: "maria_beauty", source: "Hi, I'd like a consultation about your services", time: "1 min", channel: "instagram" },
        { title: "Anna", source: "Can I book a manicure for Saturday?", time: "2 min", channel: "whatsapp" },
        { title: "Commercial proposal", source: "Sent the dev proposal — see the attachment", time: "3 min", channel: "gmail" },
        { title: "Website form", source: "Ivan · landing for ads · +1 555 123-4567", time: "4 min", channel: "website" },
        { title: "Ads · Leads", source: "New lead: automation for a beauty salon", time: "6 min", channel: "facebook" },
        { title: "Message", source: "Interested in lead automation — what's the price?", time: "7 min", channel: "vk" },
        { title: "New contact", source: "BuildCo LLC — submitted a CRM inquiry", time: "9 min", channel: "hubspot" },
        { title: "Project brief", source: "Brief filled in Notion — ready to review", time: "11 min", channel: "notion" },
        { title: "Client meeting", source: "Tomorrow at 3 PM · MVP discussion", time: "13 min", channel: "calendar" },
        { title: "TIVONIX Bot", source: "Bot lead: Telegram + CRM integration", time: "14 min", channel: "telegram" },
        { title: "studio_pro", source: "How much for a site with online booking?", time: "15 min", channel: "instagram" },
        { title: "Dmitry", source: "Need online booking for salon clients", time: "16 min", channel: "whatsapp" },
        { title: "Website form", source: "New lead: landing page + Telegram alerts", time: "18 min", channel: "website" }
      ]
    },
    curtain: {
      title: "Development process — step by step",
      statusDone: "Done",
      statusInProgress: "In progress…",
      steps: [
        "We are TIVONIX. Product studio: design + development.",
        "We define goals and scope: SaaS / MVP, deadlines, priorities.",
        "Prototype & UI: structure, screens, states, top-tier SaaS visuals.",
        "Development: user area, admin panels, roles, tables, filters.",
        "Integrations: payments, notifications, email, analytics, CRM.",
        "Quality: tests, optimization, security, clean architecture.",
        "Release: deploy, domain/SSL, monitoring, documentation.",
        "After launch: support, improvements, product growth."
      ]
    },
    whyUs: {
      badge: "STACK • TECHNOLOGY • PRODUCT",
      titleTop: "What we",
      titleBottom: "work with",
      description: "Full stack for SaaS and products: frontend, backend, database, UI system and performance. We make it look premium and scale cleanly.",
      footerBadge: "STACK READY • SaaS / MVP",
      techs: {
        react: { label: "React", sub: "Product UI, components, architecture" },
        ts: { label: "TypeScript", sub: "Types, safety, scaling" },
        js: { label: "JavaScript", sub: "Logic, animations, integrations" },
        node: { label: "Node.js", sub: "APIs, services, background jobs" },
        express: { label: "Express", sub: "Routes, middleware, auth" },
        supabase: { label: "Supabase", sub: "Postgres, RLS, Storage, Auth" },
        postgres: { label: "PostgreSQL", sub: "Schemas, indexes, queries" },
        tailwind: { label: "Tailwind CSS", sub: "UI system, tokens, fast layout" },
        saas: { label: "SaaS UI / UX", sub: "Glassmorphism, grid, details, premium typography" },
        perf: { label: "Performance", sub: "Optimization, lazy, UX speed" }
      }
    },
    newCase: {
      label: "new case",
      title: "NEW",
      live: "Live",
      cta: "View case study",
      ctaExternal: "Open spliton.io"
    },
    orbit: {
      badge: "ADMIN PANEL • SaaS",
      titlePrefix: "Admin panels for",
      titleHighlight: "your product",
      description: "Roles and access, data tables with filters, statuses/moderation, dashboards and integrations — all clean and scalable.",
      bullets: [
        { title: "Roles & access", desc: "users, permissions, audit" },
        { title: "Tables & management", desc: "search, filters, export" },
        { title: "Analytics & processes", desc: "dashboards, statuses, payouts" }
      ],
      primaryCta: "Discuss the project",
      secondaryCta: "Case studies",
      footnote: "MVP / Client area / Admin panel / Integrations",
      chat: {
        clientLabel: "client • clarification",
        clientSubtitle: "SaaS + admin panel",
        msgClient1: "Hi! We’re building a SaaS. Do you build admin panels for managing users and data?",
        msgMe1: "Yes ✅ I’ll build the admin: roles/access, tables (search/filters), statuses, moderation, analytics. I’ll connect APIs and basic security.",
        msgClient2: "Great. Can we have a dashboard and activity history?",
        inputPlaceholder: "Message…",
        quickCallTitle: "Quick call",
        quickCallDuration: "15 minutes",
        quickCallHint: "Tap to talk"
      }
    },
    benefits: {
      badge: "STEPS",
      titlePrefix: "One block — one idea.",
      titleHighlight: "BENEFITS",
      rowLabel: "BENEFIT",
      rowMeta: "UI • code • speed • scaling",
      items: [
        {
          title: "Fast MVP",
          desc: "We ship the core of the product without noise: priorities, deadlines, release logic.",
          badge: "1–3 weeks"
        },
        {
          title: "Premium UI",
          desc: "Grid, typography, states, micro-details — like top-tier SaaS.",
          badge: "instantly premium"
        },
        {
          title: "Security & roles",
          desc: "Roles/access, API protection, basic security practices, data control.",
          badge: "Auth / RLS"
        },
        {
          title: "Integrations",
          desc: "Payments, email, notifications, analytics, CRM — wired reliably.",
          badge: "webhooks"
        },
        {
          title: "Clean architecture",
          desc: "Components, types, API layer and structure ready for growth — no trash after a month.",
          badge: "scalable"
        },
        {
          title: "After release",
          desc: "Deploy, domain/SSL, monitoring, bugfixes and roadmap from metrics.",
          badge: "support"
        }
      ]
    }
  }
};
const LangContext = createContext(null);
function detectLang() {
  if (typeof window === "undefined") return "ru";
  try {
    const qp = new URL(window.location.href).searchParams.get("lang");
    if (qp === "ru" || qp === "en") return qp;
  } catch (_) {
  }
  if (window.location.pathname.startsWith("/en")) return "en";
  return "ru";
}
function syncHtmlLang(lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
}
function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => detectLang());
  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch (_) {
    }
    syncHtmlLang(l);
  };
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (_) {
    }
    syncHtmlLang(lang);
  }, [lang]);
  const value = useMemo(
    () => ({
      lang,
      setLang,
      dict: DICT[lang]
    }),
    [lang]
  );
  return /* @__PURE__ */ jsx(LangContext.Provider, { value, children });
}
function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
function homePageSeoFromDict(dict) {
  const isRu = dict.header.home === "На главную";
  if (isRu) {
    return {
      title: "TIVONIX — сайты, боты и AI-сервисы для бизнеса",
      description: "Создаём сайты, Telegram-ботов, CRM, личные кабинеты и автоматизацию заявок под ключ."
    };
  }
  const { titleLine1, titleLine2Prefix, titleLine2Premium, subtitle } = dict.hero;
  const heroTitle = `${titleLine1} ${titleLine2Prefix} ${titleLine2Premium}`.replace(/\s+/g, " ").trim();
  return {
    title: `TIVONIX — ${heroTitle}`,
    description: subtitle
  };
}
const LANDING_SHELL_CLASS = "mx-auto w-full max-w-[1480px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[100px]";
const HERO_SCROLL_HEADLINE_CLASS = "font-sans text-balance font-bold tracking-[-0.022em] text-white leading-[1.05] text-[clamp(1.9rem,4.6vw,3.65rem)] sm:text-[clamp(2.2rem,4vw,4.1rem)] lg:text-[clamp(2.35rem,3.6vw,4.35rem)]";
const HERO_SCROLL_LEAD_CLASS = "mx-auto mt-5 max-w-[38rem] font-sans text-[clamp(0.95rem,1.4vw,1.2rem)] font-normal leading-[1.55] text-white/92 sm:mt-6";
const LANDING_HEADLINE_CLASS = "font-hero font-semibold tracking-[-0.04em] text-white leading-[0.98] text-[clamp(2.25rem,7.2vw,3.25rem)] sm:text-[clamp(2.75rem,5.8vw,4rem)] lg:text-[clamp(3rem,4.8vw,4.75rem)]";
function Container({
  children,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: [LANDING_SHELL_CLASS, className].filter(Boolean).join(" "), children });
}
const PLAN_CATALOG = {
  start: {
    id: "start",
    name: "Start",
    tagline: {
      ru: "Лендинг + заявки + Telegram",
      en: "Landing page + leads + Telegram"
    },
    telegramPayload: "plan_start",
    adminSource: "Start (/plans)",
    ctaAction: "telegram"
  },
  growth: {
    id: "growth",
    name: "Growth",
    tagline: {
      ru: "Система заявок + Telegram + мини-CRM",
      en: "Lead system + Telegram + mini-CRM"
    },
    telegramPayload: "plan_growth",
    adminSource: "Growth (/plans)",
    ctaAction: "telegram"
  },
  product: {
    id: "product",
    name: "Product",
    tagline: {
      ru: "Веб-сервис, кабинет, админка, оплата",
      en: "Web service, client area, admin, payments"
    },
    telegramPayload: "plan_product",
    adminSource: "Product (/plans)",
    ctaAction: "telegram"
  },
  custom: {
    id: "custom",
    name: "Custom",
    tagline: {
      ru: "Автоматизация, AI и индивидуальное решение",
      en: "Automation, AI and a custom build"
    },
    telegramPayload: "plan_custom",
    adminSource: "Custom (/plans)",
    ctaAction: "telegram"
  },
  help: {
    id: "help",
    name: "Help",
    tagline: {
      ru: "Подбор подходящего формата запуска",
      en: "Finding the right launch format"
    },
    telegramPayload: "plan_help",
    adminSource: "Help (/plans)",
    ctaAction: "telegram"
  }
};
({
  start: PLAN_CATALOG.start.telegramPayload,
  growth: PLAN_CATALOG.growth.telegramPayload,
  product: PLAN_CATALOG.product.telegramPayload,
  custom: PLAN_CATALOG.custom.telegramPayload
});
const HELP_TELEGRAM_PAYLOAD = PLAN_CATALOG.help.telegramPayload;
function getPlanCtaAction(planId) {
  return PLAN_CATALOG[planId].ctaAction;
}
function getPlanTelegramPayload(planId) {
  return PLAN_CATALOG[planId].telegramPayload;
}
Object.fromEntries(
  Object.values(PLAN_CATALOG).map((entry) => [entry.telegramPayload, entry.adminSource])
);
const TG_BOT_BASE_URL = "https://t.me/tivonixtech_leads_bot";
const TG_CHANNEL_URL = "https://t.me/TIVONIX";
const TG_BOT_URL = buildTelegramBotUrl("calc");
function buildTelegramBotUrl(startPayload) {
  if (!startPayload) return TG_BOT_BASE_URL;
  return `${TG_BOT_BASE_URL}?start=${encodeURIComponent(startPayload)}`;
}
function buildPlanTelegramUrl(planId) {
  return buildTelegramBotUrl(getPlanTelegramPayload(planId));
}
function buildPricingPlanTelegramUrl(planId) {
  return buildPlanTelegramUrl(planId);
}
function buildHelpPlanTelegramUrl() {
  return buildTelegramBotUrl(HELP_TELEGRAM_PAYLOAD);
}
function cx$c(...a) {
  return a.filter(Boolean).join(" ");
}
function TelegramLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href = TG_BOT_URL
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: ctaClass(variant, size, className),
      children
    }
  );
}
function ctaClass(variant, size, className) {
  const isSquare = variant === "plain";
  return cx$c(
    "inline-flex items-center justify-center font-bold tracking-[-0.015em] transition duration-200",
    isSquare ? "rounded-none shadow-none" : "rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "active:scale-[0.98]",
    size === "lg" ? "h-12 px-8 text-[15px] sm:h-[52px] sm:px-9 sm:text-[16px]" : "h-11 px-7 text-[14px] sm:px-8",
    (variant === "primary" || variant === "cream") && "tivonix-cta-primary",
    variant === "secondary" && "tivonix-cta-secondary",
    variant === "ghost" && "text-white/75 hover:text-white",
    variant === "plain" && "border-0 bg-transparent font-semibold text-white/88 hover:bg-white/[0.04] hover:text-white",
    variant === "white" && "border-0 bg-white font-bold text-black shadow-none hover:bg-white/92",
    className
  );
}
function cx$b(...a) {
  return a.filter(Boolean).join(" ");
}
const NAV_MAIN = [
  { to: "/", key: "home" },
  { to: "/avtomatizaciya-biznesa", key: "automation" },
  { to: "/plans", key: "plans" },
  { to: "/projects", key: "projects" }
];
const DESKTOP_MIN_WIDTH = 1280;
const LOGO_DEFAULT = "/images/tivonix-logo-lockup.webp";
const LOGO_WHITE = "/images/tivonix-logo-white.webp";
function usePrefersReducedMotion$2() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(!!mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener("change", on);
    else mq.addListener(on);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", on);
      else mq.removeListener(on);
    };
  }, []);
  return reduced;
}
function useHomeHeroInView(pathname) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (pathname !== "/") {
      setInView(false);
      return;
    }
    const hero = document.getElementById("hero");
    if (!hero) {
      setInView(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(!!entry?.isIntersecting),
      { threshold: 0.06, rootMargin: "-80px 0px -30% 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);
  return inView;
}
function useFooterInView(pathname) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let io = null;
    const attach = () => {
      const footer = document.getElementById("site-footer");
      if (!footer) {
        setInView(false);
        return;
      }
      io?.disconnect();
      io = new IntersectionObserver(
        ([entry]) => setInView(!!entry?.isIntersecting),
        { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
      );
      io.observe(footer);
    };
    attach();
    const t = window.setTimeout(attach, 0);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, [pathname]);
  return inView;
}
function useIsMobile(maxWidth = 899) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= maxWidth
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const on = () => setIsMobile(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener("change", on);
    else mq.addListener(on);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", on);
      else mq.removeListener(on);
    };
  }, [maxWidth]);
  return isMobile;
}
function PillNav({
  activeKey,
  items,
  onItemClick,
  reducedMotion,
  compact
}) {
  const dur = 260;
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cx$b(
        "relative inline-flex items-center gap-0.5 rounded-full border-0 bg-[#141414] p-1"
      ),
      "aria-label": "Header navigation",
      children: items.map((it) => {
        const isActive = it.key === activeKey;
        const pad = compact ? "px-3.5 h-9" : "px-5 h-10";
        const text = compact ? "text-[10.5px]" : "text-[11px]";
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: it.to,
            onClick: onItemClick(it.to),
            "aria-current": isActive ? "page" : void 0,
            className: cx$b(
              "relative flex items-center gap-2 rounded-full border-0 font-bold uppercase tracking-[0.14em] outline-none select-none transition",
              "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
              pad,
              text,
              isActive ? "bg-[#2c2c2c] text-white" : "bg-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/85"
            ),
            style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
            children: /* @__PURE__ */ jsx("span", { className: "leading-none", children: it.label })
          },
          it.key
        );
      })
    }
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion$2();
  const isMobile = useIsMobile();
  const heroInView = useHomeHeroInView(location.pathname);
  const footerInView = useFooterInView(location.pathname);
  const hideHeader = footerInView && !open;
  const logoSrc = heroInView ? LOGO_WHITE : LOGO_DEFAULT;
  const isHome = location.pathname === "/";
  const needsSpacer = isMobile && !isHome;
  const { lang } = useLang();
  const isRu = lang === "ru";
  const burgerRef = useRef(null);
  const scrollLockYRef = useRef(0);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    scrollLockYRef.current = scrollY;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyLeft = body.style.left;
    const prevBodyRight = body.style.right;
    const prevBodyWidth = body.style.width;
    const prevBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.left = prevBodyLeft;
      body.style.right = prevBodyRight;
      body.style.width = prevBodyWidth;
      body.style.paddingRight = prevBodyPaddingRight;
      window.scrollTo(0, scrollLockYRef.current);
    };
  }, [open]);
  const navLabel = (key) => {
    if (isRu) {
      if (key === "home") return "главная";
      if (key === "automation") return "автоматизация";
      if (key === "plans") return "планы";
      if (key === "projects") return "проекты";
    } else {
      if (key === "home") return "home";
      if (key === "automation") return "automation";
      if (key === "plans") return "plans";
      if (key === "projects") return "projects";
    }
    return key;
  };
  const activeKey = useMemo(() => {
    if (location.pathname === "/plans") return "plans";
    if (location.pathname === "/projects") return "projects";
    if (location.pathname === "/avtomatizaciya-biznesa") return "automation";
    return "home";
  }, [location.pathname]);
  const tabsItems = useMemo(
    () => NAV_MAIN.map((it) => ({
      key: it.key,
      to: it.to,
      label: navLabel(it.key)
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );
  const onNav = (to) => (e) => {
    setOpen(false);
    if (to === "/") {
      e.preventDefault();
      if (location.pathname !== "/") navigate("/");
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };
  const goHome = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };
  const ariaHome = isRu ? "На главную" : "Go to home";
  const ariaMenu = isRu ? "Меню" : "Menu";
  const ctaTop = isRu ? "Обсудить проект" : "Discuss the project";
  const dur = reducedMotion ? 0 : 280;
  const closeMenu = () => {
    setOpen(false);
    requestAnimationFrame(() => burgerRef.current?.focus({ preventScroll: true }));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: cx$b(
          needsSpacer ? "h-[78px] sm:h-[82px]" : "h-0"
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "header",
      {
        className: cx$b(
          "fixed inset-x-0 z-[120] transition-[top,transform,opacity]",
          heroInView && !isMobile ? "top-3 sm:top-4" : "top-0",
          hideHeader ? "pointer-events-none -translate-y-full opacity-0" : "translate-y-0 opacity-100"
        ),
        style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
        children: /* @__PURE__ */ jsx("div", { className: "h-[78px] w-full bg-transparent sm:h-[82px]", children: /* @__PURE__ */ jsx(Container, { className: "h-full", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx$b(
              "relative flex h-full w-full min-w-0 items-center xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center xl:gap-x-4"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex min-w-0 items-center gap-3 shrink-0 xl:justify-self-start", children: /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/",
                  onClick: (e) => {
                    e.preventDefault();
                    goHome();
                  },
                  className: cx$b(
                    "flex items-center outline-none",
                    "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 rounded-xl"
                  ),
                  "aria-label": ariaHome,
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: logoSrc,
                      alt: "TIVONIX",
                      className: cx$b(
                        "w-auto object-contain opacity-95 transition-all hover:opacity-100",
                        heroInView ? "h-10 sm:h-11 lg:h-12" : "h-8 sm:h-9"
                      ),
                      draggable: false,
                      loading: "eager",
                      decoding: "async"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "hidden min-w-0 justify-self-center xl:block", children: /* @__PURE__ */ jsx(
                PillNav,
                {
                  activeKey,
                  reducedMotion,
                  items: tabsItems,
                  onItemClick: onNav,
                  compact: false
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "ml-auto hidden min-w-0 shrink-0 items-center xl:ml-0 xl:flex xl:justify-self-end", children: /* @__PURE__ */ jsx(
                TelegramLink,
                {
                  href: TG_BOT_URL,
                  variant: "white",
                  className: "h-11 px-7 text-[14px]",
                  children: ctaTop
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "ml-auto xl:hidden flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(
                  TelegramLink,
                  {
                    href: TG_BOT_URL,
                    variant: "white",
                    className: "h-11 px-6 text-[13px]",
                    children: ctaTop
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    ref: burgerRef,
                    type: "button",
                    className: cx$b(
                      "grid place-items-center outline-none border-0",
                      "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                      "h-11 w-11 rounded-2xl",
                      "bg-[#1a1a1a]",
                      "transition-[transform,background-color] duration-200 ease-out",
                      "hover:bg-[#242424]",
                      "active:scale-95",
                      open && "bg-[#242424]"
                    ),
                    "aria-label": open ? isRu ? "Закрыть меню" : "Close menu" : ariaMenu,
                    "aria-expanded": open,
                    "aria-controls": "mobile-header-menu",
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpen((v) => !v);
                    },
                    children: /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        width: "22",
                        height: "22",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        className: "transition-transform duration-200 ease-out",
                        children: [
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M4 7H20",
                              stroke: "#FF9A3D",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: {
                                transformOrigin: "12px 7px",
                                transform: open ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0deg)",
                                transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M4 12H20",
                              stroke: "#FF9A3D",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: {
                                opacity: open ? 0 : 1,
                                transition: reducedMotion ? "none" : "opacity 0.18s ease-out"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M4 17H20",
                              stroke: "#FF9A3D",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: {
                                transformOrigin: "12px 17px",
                                transform: open ? "translateY(-5px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
                                transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)"
                              }
                            }
                          )
                        ]
                      }
                    )
                  }
                )
              ] })
            ]
          }
        ) }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: "mobile-header-menu",
        className: cx$b(
          "xl:hidden fixed inset-0 z-[200]",
          open ? "pointer-events-auto" : "pointer-events-none"
        ),
        "aria-hidden": !open,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx$b(
              "mobile-menu-panel absolute inset-0 flex min-h-[100dvh] flex-col overflow-hidden bg-[#161313]",
              "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
            ),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": isRu ? "Меню" : "Menu",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-between px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/",
                    onClick: (e) => {
                      e.preventDefault();
                      goHome();
                    },
                    className: "flex items-center outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 rounded-xl",
                    "aria-label": ariaHome,
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: heroInView ? LOGO_WHITE : LOGO_DEFAULT,
                        alt: "TIVONIX",
                        className: "h-7 w-auto object-contain opacity-95",
                        draggable: false,
                        decoding: "async"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: closeMenu,
                    className: cx$b(
                      "grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-xl border-0",
                      "bg-white/[0.04] text-white/72 transition hover:bg-white/[0.08] active:scale-95",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                    ),
                    "aria-label": isRu ? "Закрыть меню" : "Close menu",
                    children: /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        width: "22",
                        height: "22",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        className: "transition-transform duration-200 ease-out",
                        "aria-hidden": true,
                        children: [
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M4 7H20",
                              stroke: "#FF9A3D",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: {
                                transformOrigin: "12px 7px",
                                transform: "translateY(5px) rotate(45deg)",
                                transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M4 12H20",
                              stroke: "#FF9A3D",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: {
                                opacity: 0,
                                transition: reducedMotion ? "none" : "opacity 0.18s ease-out"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M4 17H20",
                              stroke: "#FF9A3D",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              style: {
                                transformOrigin: "12px 17px",
                                transform: "translateY(-5px) rotate(-45deg)",
                                transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)"
                              }
                            }
                          )
                        ]
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-2 pb-5 sm:px-3", children: [
                /* @__PURE__ */ jsx("nav", { className: "mt-1 flex flex-col", "aria-label": isRu ? "Навигация" : "Navigation", children: tabsItems.map((item) => /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: item.to,
                    className: cx$b(
                      "flex items-center justify-between border-b border-white/[0.08] px-3 py-4 text-[15px] font-medium text-white/92",
                      "transition-colors hover:bg-white/[0.03] active:bg-white/[0.02]",
                      activeKey === item.key && "text-[#FFAE66]"
                    ),
                    onClick: (e) => {
                      onNav(item.to)(e);
                      closeMenu();
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "capitalize", children: item.label }),
                      /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "shrink-0 text-white/32", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                    ]
                  },
                  item.key
                )) }),
                /* @__PURE__ */ jsxs("div", { className: "mt-auto flex flex-col gap-2 px-2 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))]", children: [
                  /* @__PURE__ */ jsx(
                    TelegramLink,
                    {
                      href: TG_BOT_URL,
                      variant: "plain",
                      className: "h-12 w-full rounded-xl border border-white/[0.08] text-[14px]",
                      children: isRu ? "Обсудить проект" : "Contact sales"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/plans",
                      className: cx$b(
                        "inline-flex h-12 items-center justify-center rounded-xl px-6 text-[14px] font-semibold text-black",
                        "bg-[#ff6a21] transition hover:brightness-105",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40"
                      ),
                      onClick: () => setOpen(false),
                      children: isRu ? "Планы" : "Plans"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function Section({
  id,
  className,
  children
}) {
  return /* @__PURE__ */ jsx("section", { id, className: ["py-14 sm:py-20", className].filter(Boolean).join(" "), children });
}
function landingCopy(lang) {
  const isRu = lang === "ru";
  return isRu ? COPY_RU$1 : COPY_EN$1;
}
const COPY_RU$1 = {
  hero: {
    titleLines: ["Сайты, боты и сервисы,", "чтобы заявки не терялись"],
    scrollStages: [
      {
        headline: "Сайты, боты и веб-сервисы, которые помогают получать заявки",
        lead: "Разбираем задачу, предлагаем решение и запускаем продукт под ключ: лендинг, бот, CRM, кабинет или автоматизацию."
      },
      {
        headline: "Заявки приходят в разные места — и теряются",
        lead: "Сайт, Telegram, Instagram, звонки, таблица. Менеджер забывает ответить — клиент уходит."
      },
      {
        headline: "Собираем систему, где заявка не теряется",
        lead: "Клиент оставил заявку — команда сразу видит её в Telegram или CRM и знает, кто отвечает и что делать дальше."
      }
    ],
    subtitle: "Делаем сайты, Telegram-ботов, CRM, админ-панели и веб-сервисы под конкретную задачу бизнеса — чтобы заявки не терялись и команда работала без ручного хаоса.",
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Посмотреть, что делаем",
    micro: "Ответим в течение дня • Первая консультация бесплатно • Можно начать с идеи",
    flowNodes: ["Заявка", "Обработка", "Telegram", "CRM"],
    flowNodeHints: ["С сайта", "Автообработка", "Уведомление", "В CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["Лендинг", "Форма", "Telegram"],
    flowAnalysis: {
      headline: "Задача разобрана",
      lead: "Лендинг принимает трафик, форма сохраняет контакт, Telegram сразу уведомляет команду — заявка не зависает в переписке.",
      routeLabel: "Маршрут:",
      routeText: "сайт → форма → Telegram → CRM.",
      modulesLabel: "Состав:"
    },
    flowTelegramDetail: {
      sourceLabel: "Источник",
      sourceValue: "форма на лендинге",
      actionLabel: "Действие",
      actionValue: "менеджер получил уведомление — заявка не потерялась"
    },
    flowCrmDetail: {
      summary: "Заявка в CRM. Статус и ответственный на месте — не нужно искать по чатам и таблицам."
    },
    flowScenarios: [
      {
        prompt: "Нужен лендинг для рекламы",
        chips: ["Лендинг", "Форма", "Telegram"],
        notify: "Уведомление отправлено в Telegram",
        result: {
          kind: "crm",
          title: "Новая заявка",
          lines: [
            { label: "Имя", value: "Анна" },
            { label: "Услуга", value: "Лендинг" },
            { label: "Статус", value: "Новая" }
          ]
        }
      },
      {
        prompt: "Хочу Telegram-бота для заявок",
        chips: ["Telegram", "Автоматизация", "Уведомления"],
        notify: "Уведомление отправлено в Telegram",
        result: {
          kind: "telegram",
          title: "Telegram",
          lines: [
            { label: "Сообщение", value: "Новая заявка с сайта" },
            { label: "Имя", value: "Анна" },
            { label: "Телефон", value: "+375 ••• •• 42" }
          ]
        }
      },
      {
        prompt: "Нужен сайт + уведомления в Telegram",
        chips: ["Лендинг", "Форма", "Telegram", "Уведомления"],
        notify: "Уведомление отправлено в Telegram",
        result: {
          kind: "telegram",
          title: "Telegram",
          lines: [
            { label: "Сообщение", value: "Заявка с формы сайта" },
            { label: "Имя", value: "Мария" },
            { label: "Услуга", value: "Консультация" }
          ]
        }
      },
      {
        prompt: "Нужна система записи для клиентов",
        chips: ["Форма", "CRM", "Уведомления"],
        notify: "Заявка добавлена в CRM",
        result: {
          kind: "crm",
          title: "Новая заявка",
          lines: [
            { label: "Имя", value: "Елена" },
            { label: "Услуга", value: "Запись на услугу" },
            { label: "Статус", value: "Новая" }
          ]
        }
      },
      {
        prompt: "Хотим автоматизировать обработку заявок",
        chips: ["Автоматизация", "CRM", "Telegram"],
        notify: "Статус обновлён",
        result: {
          kind: "crm",
          title: "Новая заявка",
          lines: [
            { label: "Имя", value: "Дмитрий" },
            { label: "Услуга", value: "Автоматизация" },
            { label: "Статус", value: "В работе" }
          ]
        }
      }
    ],
    visualStatus: [
      { main: "Собираем систему заявок…", sub: "Лендинг, форма, Telegram" },
      { main: "Новая заявка получена", sub: "Уведомление отправлено в Telegram" },
      { main: "Заявка в мини-CRM", sub: "Статус: в работе" }
    ]
  },
  pain: {
    title: "Почему заявки теряются",
    titleLines: ["Почему заявки", "теряются"],
    subtitle: "Обычно дело не в продукте, а в том, что нет нормальной системы приёма и обработки.",
    hoverCta: "Как закрываем",
    items: [
      {
        title: "Заявки в разных местах",
        text: "Сайт, Telegram, Instagram, звонки, email — всё в разных окнах. Непонятно, кто уже ответил.",
        solution: "Собираем обращения в одно место: форма, бот, CRM или админка — команда видит все заявки сразу."
      },
      {
        title: "Ответили слишком поздно",
        text: "Клиент написал утром, менеджер увидел вечером. К этому моменту он уже записался к другим.",
        solution: "Уведомления в Telegram или email — заявка не ждёт в переписке."
      },
      {
        title: "Нет статусов",
        text: "Непонятно, кто новый, кто ждёт ответа, кто записан, а кто просто потерялся.",
        solution: "Статусы в CRM или таблице: новая → в работе → записан → оплачен."
      },
      {
        title: "Всё держится на одном человеке",
        text: "Блокнот, Excel или память администратора. Он вышел из чата — процесс встал.",
        solution: "Процесс в системе: заявки идут по правилам, а не по памяти одного человека."
      },
      {
        title: "Реклама идёт, заявки теряются",
        text: "Трафик есть, форма есть, но дальше заявка снова уходит в ручную обработку без контроля.",
        solution: "Лендинг + форма + Telegram + CRM — заявка сразу попадает в работу, а не в заметки."
      }
    ]
  },
  offer: {
    title: "Что мы делаем",
    featured: {
      badge: "TIVONIX",
      metric: "6",
      metricLabel: "направлений под задачу",
      quote: "Сайт под рекламу, Telegram-бот, CRM или мини-панель, личный кабинет, автоматизация и интеграции. Сначала разбираем, где теряются заявки — потом собираем то, что реально нужно.",
      linkText: "Разобрать задачу"
    },
    metrics: [
      { badge: "Срок", metric: "1–4", label: "недели до первого запуска" },
      { badge: "Уведомления", metric: "< 1 мин", label: "заявка у команды в Telegram" },
      { badge: "Статусы", metric: "CRM", label: "или таблица для команды" },
      { badge: "Код", metric: "100%", label: "остаётся у вас" },
      { badge: "Старт", metric: "MVP", label: "можно с простой версии" }
    ],
    ctaBar: {
      title: "Соберём систему, где заявки не теряются.",
      primary: "Обсудить проект",
      secondary: "Рассчитать проект"
    }
  },
  ai: {
    ariaLabel: "TIVONIX — AI в продуктах для бизнеса",
    centerBadge: "TIVONIX AI",
    headline: "Подключаем AI там, где он реально экономит время: ответы, разбор заявок, поддержка",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["AI-боты", "Автоответы", "Разбор заявок", "CRM", "Поддержка", "Аналитика"]
  },
  flow: {
    label: "Схема",
    title: "Как работает система",
    titleMuted: "от заявки до результата — без потерь по пути",
    steps: [
      {
        label: "Заявка",
        title: "Клиент оставляет заявку",
        desc: "На сайте, в форме, боте или с рекламы"
      },
      {
        label: "Telegram",
        title: "Команда получает уведомление",
        desc: "В Telegram или на email — сразу, без задержки"
      },
      {
        label: "CRM",
        title: "Заявка попадает в CRM",
        desc: "В таблицу, мини-CRM или админ-панель"
      },
      {
        label: "Статус",
        title: "У заявки есть статус",
        desc: "Новая → в работе → записан → оплачен"
      },
      {
        label: "Результат",
        title: "Понятно, что делать дальше",
        desc: "Есть ответственный — клиент не теряется"
      }
    ]
  },
  pricingTeaser: {
    eyebrow: "Тарифы",
    title: "Планы запуска",
    more: "Подробнее"
  },
  compare: {
    title: "Мы делаем не страницу, а рабочую систему заявок",
    subtitle: "Чтобы заявка не зависала в переписке — от формы до CRM и команды.",
    regular: {
      title: "Обычный сайт",
      headline: "Форма есть — дальше вручную",
      items: ["Есть текст", "Есть кнопка", "Есть форма", "Дальше — в чаты и таблицы"]
    },
    chaosTags: ["Заявка потерялась", "Нет статуса", "Вручную в Excel", "Ответили через день"],
    hover: {
      chaosMessages: [
        { channel: "Instagram", text: "Здравствуйте, сколько стоит?", time: "сейчас" },
        { channel: "Telegram", text: "Можно записаться на завтра?", time: "4 мин" },
        { channel: "WhatsApp", text: "А в субботу работаете?", time: "11 мин" },
        { channel: "Сайт", text: "Оставил заявку на сайте", time: "18 мин" },
        { channel: "Звонок", text: "Пропущенный звонок", time: "25 мин" },
        { channel: "Instagram", text: "??? вы тут?", time: "38 мин" },
        { channel: "Telegram", text: "Жду ответ уже час", time: "1 ч" },
        { channel: "Email", text: "Re: запрос с формы", time: "вчера" },
        { channel: "WhatsApp", text: "Есть окно сегодня вечером?", time: "1 ч" },
        { channel: "Сайт", text: "Нужен расчёт под ключ", time: "2 ч" },
        { channel: "Instagram", text: "Скиньте прайс, пожалуйста", time: "3 ч" },
        { channel: "Telegram", text: "Перезвоните, срочно", time: "4 ч" },
        { channel: "Звонок", text: "2 пропущенных", time: "5 ч" },
        { channel: "Email", text: "Fwd: коммерческое предложение", time: "6 ч" }
      ],
      crm: {
        title: "TIVONIX CRM",
        sidebar: [
          { label: "Заявки", active: true, count: 4 },
          { label: "Клиенты", active: false },
          { label: "Календарь", active: false },
          { label: "Отчёты", active: false }
        ],
        leadsTitle: "Заявки",
        leads: [
          {
            name: "Анна К.",
            source: "Сайт",
            preview: "Запись на консультацию",
            time: "2 мин",
            status: "Новая",
            tone: "new"
          },
          {
            name: "Игорь П.",
            source: "Telegram",
            preview: "Нужен расчёт проекта",
            time: "14 мин",
            status: "В работе",
            tone: "progress"
          },
          {
            name: "Салон Lux",
            source: "Instagram",
            preview: "Онлайн-запись на пятницу",
            time: "32 мин",
            status: "Записан",
            tone: "done"
          },
          {
            name: "Олег М.",
            source: "Форма",
            preview: "Оплата подтверждена",
            time: "1 ч",
            status: "Оплачен",
            tone: "paid"
          }
        ]
      }
    },
    tivonix: {
      title: "TIVONIX-система",
      headline: "Заявка под контролем",
      badge: "Заявка не висит в переписке — команда видит следующий шаг",
      items: [
        "Заявка не теряется",
        "Приходит в Telegram или email",
        "Попадает в CRM или таблицу",
        "Имеет статус и ответственного",
        "Команда понимает, что делать",
        "Можно наращивать рекламу без хаоса"
      ]
    }
  },
  cases: {
    badge: "Новый кейс",
    cta: "Хочу похожую систему",
    viewCase: "Смотреть кейс",
    openProduct: "Открыть продукт",
    spliton: {
      need: "Нужна была финтех-платформа для инвестиций в музыкальные активы — не лендинг, а полноценный продукт",
      done: "Собрали каталог релизов, покупку долей, кошелёк, вторичный рынок, юридические согласия и админ-панель",
      modules: [
        "Каталог релизов",
        "Покупка долей",
        "Кошелёк",
        "Вторичный рынок",
        "Юр. согласия",
        "Админ-панель",
        "i18n RU/EN/ES/PT",
        "Выплаты"
      ]
    }
  },
  audience: {
    badge: "TIVONIX",
    title: "Кому помогаем",
    subtitle: "Тем, кому нужен не просто красивый сайт, а рабочая система: заявки, записи, статусы, оплата или кабинет.",
    callouts: {
      left: {
        text: "Заявка у менеджера за минуту — не в переписке и не в таблице на завтра."
      },
      right: {
        text: "Instagram, Telegram, сайт и звонки — все обращения в одном процессе."
      }
    },
    pins: [
      { id: "masters", label: "Мастера", lat: 55.75, lng: 37.62 },
      { id: "studios", label: "Студии", lat: 48.85, lng: 2.35 },
      { id: "autoservice", label: "Автосервисы", lat: 40.71, lng: -74.01 },
      { id: "schools", label: "Школы", lat: 51.5, lng: -0.12 },
      { id: "startups", label: "Стартапы", lat: 1.35, lng: 103.82 },
      { id: "agencies", label: "Агентства", lat: 25.2, lng: 55.27 }
    ],
    marquee: [
      "Мастера",
      "Студии",
      "Салоны",
      "Автосервисы",
      "Онлайн-школы",
      "Эксперты",
      "Стартапы",
      "Агентства",
      "Малый бизнес",
      "Локальные услуги"
    ],
    pillars: [
      {
        title: "Заявки из любых каналов",
        text: "Реклама, мессенджеры, сайт — всё собираем в одну систему."
      },
      {
        title: "Быстрый ответ",
        text: "Уведомления в Telegram, статусы — клиент не ждёт и не уходит."
      },
      {
        title: "Рост без хаоса",
        text: "CRM, админка и автоматизация — когда заявок становится больше."
      }
    ],
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Посмотреть, что делаем",
    items: [
      { title: "Салоны, студии и мастера", desc: "Запись, заявки и напоминания без ручного хаоса" },
      { title: "Автосервисы и локальные услуги", desc: "Быстрый приём заявок с рекламы и понятный статус по каждому клиенту" },
      { title: "Онлайн-школы и курсы", desc: "Регистрация, оплата, кабинет ученика и статусы обучения" },
      { title: "Эксперты и консультанты", desc: "Заявки с лендинга сразу в Telegram и CRM" },
      { title: "Стартапы и MVP", desc: "Быстрый запуск продукта с нужными модулями, без лишнего" },
      { title: "Агентства и команды", desc: "Лендинги под рекламу с рабочей воронкой заявок" },
      { title: "Малый бизнес", desc: "Когда заявки идут вручную — и это уже мешает работать" }
    ]
  },
  process: {
    title: "Как проходит работа",
    steps: [
      {
        kind: "bullets",
        title: "Разбираем задачу",
        items: [
          "Что хотите получить на выходе",
          "Откуда сейчас приходят заявки",
          "Что уже есть: сайт, CRM, мессенджеры",
          "Где команда теряет время"
        ]
      },
      {
        kind: "search",
        title: "Предлагаем решение",
        query: "что лучше — сайт, бот, CRM или кабинет для моей задачи",
        hint: "Смотрим, что подойдёт под ваш объём и сроки"
      },
      {
        kind: "bullets",
        title: "Собираем дизайн и логику",
        items: [
          "Ключевые экраны и путь клиента",
          "Сценарии для менеджера и команды",
          "UI под ваш бренд"
        ]
      },
      {
        kind: "bullets",
        title: "Разрабатываем продукт",
        items: [
          "Фронтенд и логика заявок",
          "База данных и роли доступа",
          "Проверяем сценарии до запуска"
        ]
      },
      {
        kind: "bullets",
        title: "Подключаем заявки, оплату, CRM или Telegram",
        items: [
          "Формы и точки входа",
          "Интеграции с мессенджерами и почтой",
          "Оплата, таблицы, аналитика"
        ]
      },
      {
        kind: "bullets",
        title: "Запускаем и помогаем проверить",
        items: [
          "Публикуем и смотрим на реальных заявках",
          "Показываем команде, как работать",
          "Остаёмся на связи после запуска"
        ]
      }
    ]
  },
  finalCta: {
    title: "Расскажите, что хотите запустить или автоматизировать",
    subtitle: "Посмотрим задачу и предложим понятный первый шаг: сайт, бот, CRM, кабинет или MVP.",
    ctaPrimary: "Обсудить проект",
    ctaSecondary: "Получить разбор задачи",
    micro: "Ответим в течение дня • Первая консультация бесплатно"
  },
  packages: {
    sectionTitle: "Три направления под вашу задачу",
    launch: {
      title: "Сайт под рекламу",
      subtitle: "Лендинг + форма + Telegram",
      forWho: "Когда нужно быстро принимать заявки с рекламы, Instagram или сайта.",
      cta: "Рассчитать запуск",
      bullets: [
        "Страница под рекламу",
        "Форма заявки",
        "Кнопки связи",
        "Уведомления в Telegram или email",
        "Адаптив под телефон",
        "Базовая аналитика",
        "Запуск"
      ]
    },
    service: {
      title: "Личный кабинет и админка",
      subtitle: "Кабинет клиента + панель команды + оплата",
      forWho: "Когда нужен полноценный веб-сервис: регистрация, кабинет, статусы, оплата.",
      cta: "Обсудить сервис",
      bullets: [
        "Регистрация",
        "Личный кабинет",
        "Админ-панель",
        "Роли пользователей",
        "Заявки и статусы",
        "Уведомления",
        "Оплата",
        "Интеграции"
      ]
    },
    automation: {
      title: "Автоматизация",
      subtitle: "Меньше ручных действий",
      forWho: "Когда заявки, таблицы, отчёты и уведомления сейчас ведутся вручную.",
      cta: "Автоматизировать процесс",
      bullets: [
        "Автоматизация заявок",
        "Связка Telegram, email и таблиц",
        "Мини-CRM",
        "Статусы задач",
        "Уведомления команде",
        "Отчёты",
        "Интеграции"
      ]
    }
  }
};
const COPY_EN$1 = {
  hero: {
    titleLines: ["Websites, bots and services", "so leads don't get lost"],
    scrollStages: [
      {
        headline: "Websites, bots and web apps that help you capture leads",
        lead: "We review your task, suggest a solution and launch it end-to-end: landing page, bot, CRM, client area or automation."
      },
      {
        headline: "Leads arrive in different places — and get lost",
        lead: "Website, Telegram, Instagram, calls, spreadsheets. A manager forgets to reply — the client leaves."
      },
      {
        headline: "We build a system where leads stay tracked",
        lead: "A client submits a request — your team sees it in Telegram or CRM right away and knows who owns it and what to do next."
      }
    ],
    subtitle: "We build websites, Telegram bots, CRMs, admin panels and web services for real business tasks — so leads don't slip away and your team isn't stuck in manual chaos.",
    ctaPrimary: "Discuss the project",
    ctaSecondary: "See what we build",
    micro: "We reply within a day • First consultation is free • You can start with just an idea",
    flowNodes: ["Lead", "Processing", "Telegram", "CRM"],
    flowNodeHints: ["From site", "Auto", "Alert", "In CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["Landing", "Form", "Telegram"],
    flowAnalysis: {
      headline: "Task reviewed",
      lead: "The landing captures traffic, the form saves contact details, Telegram alerts your team — the lead doesn't sit in a chat thread.",
      routeLabel: "Route:",
      routeText: "site → form → Telegram → CRM.",
      modulesLabel: "Stack:"
    },
    flowTelegramDetail: {
      sourceLabel: "Source",
      sourceValue: "landing page form",
      actionLabel: "Action",
      actionValue: "manager got the alert — lead not lost"
    },
    flowCrmDetail: {
      summary: "Lead in CRM. Status and owner are clear — no digging through chats and spreadsheets."
    },
    flowScenarios: [
      {
        prompt: "Need a landing page for ads",
        chips: ["Landing", "Form", "Telegram"],
        notify: "Notification sent to Telegram",
        result: {
          kind: "crm",
          title: "New lead",
          lines: [
            { label: "Name", value: "Anna" },
            { label: "Service", value: "Landing page" },
            { label: "Status", value: "New" }
          ]
        }
      },
      {
        prompt: "Want a Telegram bot for leads",
        chips: ["Telegram", "Automation", "Alerts"],
        notify: "Notification sent to Telegram",
        result: {
          kind: "telegram",
          title: "Telegram",
          lines: [
            { label: "Message", value: "New lead from website" },
            { label: "Name", value: "Anna" },
            { label: "Phone", value: "+1 ••• •• 42" }
          ]
        }
      },
      {
        prompt: "Need a site + Telegram alerts",
        chips: ["Landing", "Form", "Telegram", "Alerts"],
        notify: "Notification sent to Telegram",
        result: {
          kind: "telegram",
          title: "Telegram",
          lines: [
            { label: "Message", value: "Lead from website form" },
            { label: "Name", value: "Maria" },
            { label: "Service", value: "Consultation" }
          ]
        }
      },
      {
        prompt: "Need a booking system for clients",
        chips: ["Form", "CRM", "Alerts"],
        notify: "Lead added to CRM",
        result: {
          kind: "crm",
          title: "New lead",
          lines: [
            { label: "Name", value: "Elena" },
            { label: "Service", value: "Appointment" },
            { label: "Status", value: "New" }
          ]
        }
      },
      {
        prompt: "Want to automate lead handling",
        chips: ["Automation", "CRM", "Telegram"],
        notify: "Status updated",
        result: {
          kind: "crm",
          title: "New lead",
          lines: [
            { label: "Name", value: "Dmitry" },
            { label: "Service", value: "Automation" },
            { label: "Status", value: "In progress" }
          ]
        }
      }
    ],
    visualStatus: [
      { main: "Building your lead system…", sub: "Landing, form, Telegram" },
      { main: "New lead received", sub: "Notification sent to Telegram" },
      { main: "Lead in mini-CRM", sub: "Status: in progress" }
    ]
  },
  pain: {
    title: "Why leads get lost",
    titleLines: ["Why leads", "get lost"],
    subtitle: "Usually it's not the product — it's the lack of a proper intake and follow-up system.",
    hoverCta: "How we fix it",
    items: [
      {
        title: "Leads in different places",
        text: "Website, Telegram, Instagram, calls, email — all in separate windows. Unclear who already replied.",
        solution: "We pull inquiries into one place: form, bot, CRM or admin panel — the team sees every lead at once."
      },
      {
        title: "Reply came too late",
        text: "A client wrote in the morning, the manager saw it in the evening. By then they booked elsewhere.",
        solution: "Telegram or email alerts — leads don't wait in chat threads."
      },
      {
        title: "No statuses",
        text: "Unclear who is new, who is waiting, who is booked, and who simply fell through.",
        solution: "Statuses in CRM or a sheet: new → in progress → booked → paid."
      },
      {
        title: "Everything depends on one person",
        text: "A notebook, Excel or the admin's memory. They go offline — the process stops.",
        solution: "The process lives in the system: leads move by rules, not one person's memory."
      },
      {
        title: "Ads run, leads get lost",
        text: "Traffic is there, the form is there, but after submit everything goes back to manual handling.",
        solution: "Landing + form + Telegram + CRM — every lead enters the workflow immediately."
      }
    ]
  },
  offer: {
    title: "What we build",
    featured: {
      badge: "TIVONIX",
      metric: "6",
      metricLabel: "directions for your task",
      quote: "Ad landing pages, Telegram bots, CRM or mini-panels, client areas, automation and integrations. First we map where leads get lost — then we build what you actually need.",
      linkText: "Review your task"
    },
    metrics: [
      { badge: "Timeline", metric: "1–4", label: "weeks to first launch" },
      { badge: "Alerts", metric: "< 1 min", label: "lead reaches the team in Telegram" },
      { badge: "Statuses", metric: "CRM", label: "or a sheet for your team" },
      { badge: "Code", metric: "100%", label: "stays with you" },
      { badge: "Start", metric: "MVP", label: "you can begin with a simple version" }
    ],
    ctaBar: {
      title: "We'll build a system where leads don't get lost.",
      primary: "Discuss the project",
      secondary: "Get an estimate"
    }
  },
  ai: {
    ariaLabel: "TIVONIX — AI in business products",
    centerBadge: "TIVONIX AI",
    headline: "We add AI where it actually saves time: replies, lead triage, support",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["AI bots", "Auto-replies", "Lead triage", "CRM", "Support", "Analytics"]
  },
  flow: {
    label: "Flow",
    title: "How the system works",
    titleMuted: "from lead to result — without losses along the way",
    steps: [
      {
        label: "Lead",
        title: "Client submits a request",
        desc: "On the site, in a form, bot or from ads"
      },
      {
        label: "Telegram",
        title: "Team gets an alert",
        desc: "In Telegram or email — right away"
      },
      {
        label: "CRM",
        title: "Lead lands in CRM",
        desc: "In a sheet, mini-CRM or admin panel"
      },
      {
        label: "Status",
        title: "Lead gets a status",
        desc: "New → in progress → booked → paid"
      },
      {
        label: "Result",
        title: "Clear what to do next",
        desc: "There's an owner — the client isn't lost"
      }
    ]
  },
  pricingTeaser: {
    eyebrow: "Pricing",
    title: "Launch plans",
    more: "Learn more"
  },
  compare: {
    title: "We build a working lead system — not just a page",
    subtitle: "So leads don't sit in chat threads — from form to CRM and your team.",
    regular: {
      title: "Typical website",
      headline: "Form submitted — then manual chaos",
      items: ["Some text", "A button", "A form", "Then — chats and spreadsheets"]
    },
    chaosTags: ["Lead lost", "No status", "Manual spreadsheet", "Reply next day"],
    hover: {
      chaosMessages: [
        { channel: "Instagram", text: "Hi, how much is it?", time: "now" },
        { channel: "Telegram", text: "Can I book for tomorrow?", time: "4 min" },
        { channel: "WhatsApp", text: "Are you open Saturday?", time: "11 min" },
        { channel: "Website", text: "Submitted the form", time: "18 min" },
        { channel: "Call", text: "Missed call", time: "25 min" },
        { channel: "Instagram", text: "??? anyone there?", time: "38 min" },
        { channel: "Telegram", text: "Waiting an hour already", time: "1 hr" },
        { channel: "Email", text: "Re: form inquiry", time: "yesterday" },
        { channel: "WhatsApp", text: "Any slot tonight?", time: "1 hr" },
        { channel: "Website", text: "Need a full quote", time: "2 hr" },
        { channel: "Instagram", text: "Please send pricing", time: "3 hr" },
        { channel: "Telegram", text: "Call me back, urgent", time: "4 hr" },
        { channel: "Call", text: "2 missed calls", time: "5 hr" },
        { channel: "Email", text: "Fwd: proposal request", time: "6 hr" }
      ],
      crm: {
        title: "TIVONIX CRM",
        sidebar: [
          { label: "Leads", active: true, count: 4 },
          { label: "Clients", active: false },
          { label: "Calendar", active: false },
          { label: "Reports", active: false }
        ],
        leadsTitle: "Leads",
        leads: [
          {
            name: "Anna K.",
            source: "Website",
            preview: "Book a consultation",
            time: "2 min",
            status: "New",
            tone: "new"
          },
          {
            name: "Igor P.",
            source: "Telegram",
            preview: "Need a project estimate",
            time: "14 min",
            status: "In progress",
            tone: "progress"
          },
          {
            name: "Lux Salon",
            source: "Instagram",
            preview: "Online booking for Friday",
            time: "32 min",
            status: "Booked",
            tone: "done"
          },
          {
            name: "Oleg M.",
            source: "Form",
            preview: "Payment confirmed",
            time: "1 hr",
            status: "Paid",
            tone: "paid"
          }
        ]
      }
    },
    tivonix: {
      title: "TIVONIX system",
      headline: "Lead under control",
      badge: "Lead doesn't sit in chat — the team sees the next step",
      items: [
        "Lead is not lost",
        "Arrives in Telegram or email",
        "Lands in CRM or a sheet",
        "Has a status and owner",
        "Team knows what to do",
        "You can scale ads without chaos"
      ]
    }
  },
  cases: {
    badge: "New case",
    cta: "I want a similar system",
    viewCase: "View case",
    openProduct: "Open product",
    spliton: {
      need: "Needed a fintech platform for music-asset investing — a full product, not a landing page",
      done: "Built release catalog, share purchases, wallet, secondary market, legal consents and admin panel",
      modules: [
        "Release catalog",
        "Share purchases",
        "Wallet",
        "Secondary market",
        "Legal consents",
        "Admin panel",
        "i18n RU/EN/ES/PT",
        "Payouts"
      ]
    }
  },
  audience: {
    badge: "TIVONIX",
    title: "Who we help",
    subtitle: "Businesses that need more than a pretty site — a working system: leads, bookings, statuses, payments or a client area.",
    callouts: {
      left: {
        text: "Leads reach the manager in under a minute — not buried in chats or tomorrow's spreadsheet."
      },
      right: {
        text: "Instagram, Telegram, website and calls — every channel in one flow."
      }
    },
    pins: [
      { id: "masters", label: "Masters", lat: 55.75, lng: 37.62 },
      { id: "studios", label: "Studios", lat: 48.85, lng: 2.35 },
      { id: "autoservice", label: "Auto shops", lat: 40.71, lng: -74.01 },
      { id: "schools", label: "Online schools", lat: 51.5, lng: -0.12 },
      { id: "startups", label: "Startups", lat: 1.35, lng: 103.82 },
      { id: "agencies", label: "Agencies", lat: 25.2, lng: 55.27 }
    ],
    marquee: [
      "Masters",
      "Studios",
      "Salons",
      "Auto shops",
      "Online schools",
      "Experts",
      "Startups",
      "Agencies",
      "Small business",
      "Local services"
    ],
    pillars: [
      {
        title: "Leads from any channel",
        text: "Ads, messengers, website — we pull it into one system."
      },
      {
        title: "Fast response",
        text: "Telegram alerts, statuses — clients don't wait and leave."
      },
      {
        title: "Growth without chaos",
        text: "CRM, admin and automation — when lead volume grows."
      }
    ],
    ctaPrimary: "Discuss the project",
    ctaSecondary: "See what we build",
    items: [
      { title: "Salons, studios and masters", desc: "Booking, leads and reminders without manual chaos" },
      { title: "Auto shops and local services", desc: "Fast lead intake from ads and a clear status for every client" },
      { title: "Online schools and courses", desc: "Registration, payments, student area and learning statuses" },
      { title: "Experts and consultants", desc: "Leads from landing straight to Telegram and CRM" },
      { title: "Startups and MVPs", desc: "Fast product launch with the modules you need — nothing extra" },
      { title: "Agencies and teams", desc: "Ad landing pages with a working lead funnel" },
      { title: "Small business", desc: "When leads are handled manually — and that's already getting in the way" }
    ]
  },
  process: {
    title: "How we work",
    steps: [
      {
        kind: "bullets",
        title: "We review the task",
        items: [
          "What outcome you need",
          "Where leads come from today",
          "What already exists: site, CRM, messengers",
          "Where the team loses time"
        ]
      },
      {
        kind: "search",
        title: "We suggest a solution",
        query: "what fits better — website, bot, CRM or client area for my task",
        hint: "We look at scope and timeline — not buzzwords"
      },
      {
        kind: "bullets",
        title: "We shape design and logic",
        items: [
          "Key screens and client journey",
          "Scenarios for managers and the team",
          "UI aligned with your brand"
        ]
      },
      {
        kind: "bullets",
        title: "We build the product",
        items: [
          "Frontend and lead logic",
          "Database and access roles",
          "We test scenarios before launch"
        ]
      },
      {
        kind: "bullets",
        title: "We connect leads, payments, CRM or Telegram",
        items: [
          "Forms and entry points",
          "Messenger and email integrations",
          "Payments, sheets, analytics"
        ]
      },
      {
        kind: "bullets",
        title: "We launch and help you verify",
        items: [
          "Go live and check with real leads",
          "Walk the team through daily use",
          "Stay in touch after launch"
        ]
      }
    ]
  },
  finalCta: {
    title: "Tell us what you want to launch or automate",
    subtitle: "We'll review the task and suggest a clear first step: site, bot, CRM, client area or MVP.",
    ctaPrimary: "Discuss the project",
    ctaSecondary: "Get a task review",
    micro: "We reply within a day • First consultation is free"
  },
  packages: {
    sectionTitle: "Three directions for your task",
    launch: {
      title: "Ad landing page",
      subtitle: "Landing + form + Telegram",
      forWho: "When you need to capture leads from ads, Instagram or your website fast.",
      cta: "Estimate launch",
      bullets: [
        "Ad-ready page",
        "Lead form",
        "Contact buttons",
        "Telegram or email alerts",
        "Mobile responsive",
        "Basic analytics",
        "Launch"
      ]
    },
    service: {
      title: "Client area and admin",
      subtitle: "Client portal + team panel + payments",
      forWho: "When you need a full web service: registration, client area, statuses, payments.",
      cta: "Discuss the service",
      bullets: [
        "Registration",
        "Client area",
        "Admin panel",
        "User roles",
        "Leads and statuses",
        "Notifications",
        "Payments",
        "Integrations"
      ]
    },
    automation: {
      title: "Automation",
      subtitle: "Less manual work",
      forWho: "When leads, sheets, reports and alerts are still handled manually.",
      cta: "Automate the process",
      bullets: [
        "Lead automation",
        "Telegram, email and sheets wiring",
        "Mini-CRM",
        "Task statuses",
        "Team notifications",
        "Reports",
        "Integrations"
      ]
    }
  }
};
const ORANGE_PILL = "bg-gradient-to-r from-[#FFD7B0] via-[#FF9A3D] to-[#FF6A1A] shadow-[0_6px_20px_rgba(255,107,44,0.2)]";
function cx$a(...a) {
  return a.filter(Boolean).join(" ");
}
function LangToggle({
  compact,
  reducedMotion,
  variant = "header"
}) {
  const { lang, setLang } = useLang();
  const isHero = variant === "hero";
  const label = lang === "ru" ? "Выбор языка" : "Language";
  const h = compact ? "h-9 w-[5.25rem]" : isHero ? "h-11 w-[6.5rem]" : "h-10 w-[5.75rem]";
  const text = compact ? "text-[11px]" : isHero ? "text-[13px]" : "text-xs";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$a(
        "relative shrink-0 select-none rounded-full p-1",
        isHero ? "border border-white/35 bg-white/[0.10] backdrop-blur-md" : "border border-white/[0.08] bg-[#121212]",
        h
      ),
      role: "radiogroup",
      "aria-label": label,
      "aria-orientation": "horizontal",
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            className: cx$a(
              "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/2)] rounded-full",
              isHero ? "bg-[#FFFCF5] shadow-[0_4px_14px_rgba(0,0,0,0.18)]" : ORANGE_PILL,
              !reducedMotion && "transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]"
            ),
            style: {
              transform: lang === "en" ? "translateX(100%)" : "translateX(0)"
            }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid h-full grid-cols-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": lang === "ru",
              onClick: () => setLang("ru"),
              className: cx$a(
                "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                text,
                lang === "ru" ? "text-[#1A202C]" : isHero ? "text-white/70 hover:text-white/90" : "text-white/45 hover:text-white/72"
              ),
              children: "RU"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": lang === "en",
              onClick: () => setLang("en"),
              className: cx$a(
                "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                text,
                lang === "en" ? "text-[#1A202C]" : isHero ? "text-white/70 hover:text-white/90" : "text-white/45 hover:text-white/72"
              ),
              children: "EN"
            }
          )
        ] })
      ]
    }
  );
}
const HERO_IMAGES = [
  "/images/hero-stage-1.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-3.webp"
];
const SCROLL_TRACK_VH = 240;
function cx$9(...a) {
  return a.filter(Boolean).join(" ");
}
function clamp01$5(v) {
  return Math.min(1, Math.max(0, v));
}
function smoothstep$3(t) {
  const x = clamp01$5(t);
  return x * x * (3 - 2 * x);
}
function imageOpacities(progress) {
  if (progress <= 0.5) {
    const t2 = smoothstep$3(progress / 0.5);
    return [1 - t2, t2, 0];
  }
  const t = smoothstep$3((progress - 0.5) / 0.5);
  return [0, 1 - t, t];
}
function textOpacities(progress) {
  const stage = progress * 3;
  const i = Math.min(2, Math.floor(stage));
  const local = stage - i;
  const hold = 0.72;
  const op = [0, 0, 0];
  if (local < hold) {
    op[i] = 1;
    return op;
  }
  if (i >= 2) {
    op[2] = 1;
    return op;
  }
  const t = smoothstep$3((local - hold) / (1 - hold));
  op[i] = 1 - t;
  if (i < 2) op[i + 1] = t;
  return op;
}
function useHeroScrollProgress(trackRef) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof window === "undefined") return;
    let raf = 0;
    let trackTop = 0;
    let scrollable = 1;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      trackTop = window.scrollY + rect.top;
      scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
    };
    const update = () => {
      raf = 0;
      setProgress(clamp01$5((window.scrollY - trackTop) / scrollable));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackRef]);
  return progress;
}
function HeroCard({
  progress,
  stages,
  isRu
}) {
  const imageOpacity = useMemo(() => imageOpacities(progress), [progress]);
  const textOpacity = useMemo(() => textOpacities(progress), [progress]);
  const activeStage = textOpacity[2] > 0.5 ? 2 : textOpacity[1] > 0.5 ? 1 : 0;
  const scrollDown = () => {
    const next = document.getElementById("pain");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$9(
        "relative isolate h-full min-h-0 flex-1 overflow-hidden rounded-[28px] lg:rounded-[32px]"
      ),
      children: [
        HERO_IMAGES.map((src, i) => /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt: "",
            className: "pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_92%] sm:object-[center_94%]",
            style: { opacity: imageOpacity[i] },
            decoding: "async",
            fetchPriority: i === 0 ? "high" : "low",
            loading: i === 0 ? "eager" : "lazy"
          },
          src
        )),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/16",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col px-6 pt-[calc(4.875rem+0.5rem)] sm:px-10 sm:pt-[calc(var(--tivonix-header-spacer)+2rem)] lg:px-14", children: [
          /* @__PURE__ */ jsx("div", { className: "flex min-h-0 flex-1 items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "relative w-full max-w-[52rem]", children: /* @__PURE__ */ jsx("div", { className: "relative grid w-full justify-items-center", children: stages.map((stage, i) => {
            const opacity = textOpacity[i];
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "hero-stage-copy col-start-1 row-start-1 flex w-full max-w-[52rem] flex-col items-center justify-center text-center",
                style: {
                  opacity,
                  visibility: opacity < 0.04 ? "hidden" : "visible"
                },
                "aria-hidden": i !== activeStage,
                children: [
                  /* @__PURE__ */ jsx("h1", { className: cx$9(HERO_SCROLL_HEADLINE_CLASS, "mx-auto w-full text-center"), children: stage.headline }),
                  /* @__PURE__ */ jsx("p", { className: cx$9(HERO_SCROLL_LEAD_CLASS, "mx-auto w-full max-w-[34rem] text-center"), children: stage.lead })
                ]
              },
              stage.headline
            );
          }) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto flex shrink-0 flex-col items-center gap-3 pb-5 sm:pb-7 lg:pb-8", children: [
            /* @__PURE__ */ jsx(LangToggle, { variant: "hero" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: scrollDown,
                className: cx$9(
                  "hero-scroll-hint grid h-10 w-10 place-items-center rounded-full border-0 sm:hidden",
                  "bg-white/[0.08] text-white/75 transition hover:bg-white/[0.12] hover:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                ),
                "aria-label": isRu ? "Прокрутить вниз" : "Scroll down",
                children: /* @__PURE__ */ jsx(ChevronDown, { size: 22, strokeWidth: 2.25, "aria-hidden": true })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function Hero() {
  const trackRef = useRef(null);
  const progress = useHeroScrollProgress(trackRef);
  const { lang } = useLang();
  const isRu = lang === "ru";
  const copy = landingCopy(lang);
  const stages = copy.hero.scrollStages;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: trackRef,
      className: "relative",
      style: { height: `${SCROLL_TRACK_VH}vh` },
      children: /* @__PURE__ */ jsx(
        Section,
        {
          className: cx$9(
            "sticky top-0 z-[1] isolate overflow-hidden bg-transparent !py-0",
            "min-h-[100dvh] pb-0"
          ),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cx$9(
                "mx-auto flex h-[calc(100dvh-1.25rem)] min-h-0 w-full max-w-none flex-col",
                "px-3 pt-2.5 pb-2.5",
                "sm:max-w-[min(98vw,1840px)] sm:px-3",
                "lg:px-4 lg:pt-3 lg:pb-3"
              ),
              children: /* @__PURE__ */ jsx(HeroCard, { progress, stages, isRu })
            }
          )
        }
      )
    }
  );
}
const CARD_DARK = "#141414";
const CARD_SOFT = "#262626";
const ACCENT$1 = "#FF5722";
const PAIN_CARD_BACKGROUNDS = [
  "/images/hero-stage-1.webp",
  "/images/pain-bg-4.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-3.webp"
];
function animStyle(delayMs, durationMs) {
  return {
    animationDelay: `${delayMs}ms`,
    ...durationMs ? { animationDuration: `${durationMs}ms` } : {}
  };
}
function FadeList({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    children,
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#141414] to-transparent",
        "aria-hidden": true
      }
    )
  ] });
}
function ChannelsVisual({ isRu }) {
  const rows = isRu ? [
    { ch: "Instagram", status: "3 непрочитанных", pending: true },
    { ch: "Telegram", status: "Ответ через 47 мин", pending: true },
    { ch: "Сайт", status: "В таблице", pending: false },
    { ch: "Звонок", status: "Не зафиксирован", pending: true }
  ] : [
    { ch: "Instagram", status: "3 unread", pending: true },
    { ch: "Telegram", status: "Reply in 47 min", pending: true },
    { ch: "Website", status: "In spreadsheet", pending: false },
    { ch: "Call", status: "Not logged", pending: true }
  ];
  return /* @__PURE__ */ jsx(FadeList, { children: /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: rows.map((r, i) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "pain-row-pulse flex items-center justify-between gap-3 rounded-lg bg-white/[0.05] px-3 py-2.5",
      style: animStyle(i * 420, 2800),
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium text-white/90", children: r.ch }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-[11px] text-white/40", children: [
          r.pending ? /* @__PURE__ */ jsx(Loader2, { size: 11, className: "animate-spin text-[#FF5722]/90" }) : /* @__PURE__ */ jsx(Check, { size: 11, className: "text-white/35" }),
          /* @__PURE__ */ jsx("span", { className: "pain-shimmer", style: animStyle(i * 300 + 200), children: r.status })
        ] })
      ]
    },
    r.ch
  )) }) });
}
function TelegramVisual({ isRu }) {
  const message = isRu ? "Здравствуйте, хочу записаться на консультацию…" : "Hi, I'd like to book a consultation…";
  const times = isRu ? ["сейчас", "32 мин", "1 ч назад"] : ["now", "32 min", "1 hr ago"];
  const status = isRu ? "Менеджер ещё не видел" : "Manager hasn't seen it";
  const [typed, setTyped] = useState("");
  const [timeIdx, setTimeIdx] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const [cycle, setCycle] = useState(0);
  const isTyping = typed.length < message.length;
  const isLate = timeIdx >= 2;
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(message);
      setTimeIdx(2);
      setShowStatus(true);
      return;
    }
    let cancelled = false;
    const timeouts = [];
    const t = (fn, ms) => {
      timeouts.push(window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms));
    };
    setTyped("");
    setTimeIdx(0);
    setShowStatus(false);
    message.split("").forEach((_, i) => {
      t(() => setTyped(message.slice(0, i + 1)), 38 * (i + 1));
    });
    const typingDone = 38 * message.length + 320;
    t(() => setShowStatus(true), typingDone);
    t(() => setTimeIdx(1), typingDone + 1600);
    t(() => setTimeIdx(2), typingDone + 3400);
    t(() => setCycle((c) => c + 1), typingDone + 6200);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [message, cycle]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "flex items-start gap-2.5 rounded-xl p-3 sm:p-3.5",
      style: { backgroundColor: CARD_SOFT },
      children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.1]", children: /* @__PURE__ */ jsx(SiTelegram, { size: 20, className: "text-[#FF9A3D]", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 pt-0.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-medium text-white/55", children: "Telegram" }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: [
                  "text-[10px] tabular-nums transition-colors duration-500",
                  isLate ? "text-[#FFAB91] pain-blink" : "text-white/38"
                ].join(" "),
                children: times[timeIdx]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1.5 min-h-[2.6rem] text-[12px] leading-snug text-white/90 sm:text-[13px]", children: [
            typed,
            isTyping && /* @__PURE__ */ jsx("span", { className: "pain-cursor ml-0.5 inline-block text-[#FF9A3D]", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: [
                "mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] transition-all duration-500 ease-out",
                showStatus ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0",
                isLate ? "bg-[#FF5722]/28 text-white pain-glow" : "bg-white/10 text-white/88"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: [
                      "h-1.5 w-1.5 rounded-full",
                      isLate ? "pain-dot-pulse bg-[#FF5722]" : "pain-dot-pulse bg-white/90"
                    ].join(" "),
                    "aria-hidden": true
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: isLate ? "pain-blink" : void 0, children: status })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function StatusPill({
  label,
  variant = "ok"
}) {
  const styles = {
    ok: "bg-white/[0.06] text-white/58",
    warn: "bg-white/[0.05] text-white/42 pain-shimmer",
    unknown: "bg-white/[0.05] text-white/30 pain-blink",
    lost: "pain-glow bg-[#FF5722]/20 text-[#FF8A5C]"
  };
  return /* @__PURE__ */ jsx("span", { className: `shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium ${styles[variant]}`, children: label });
}
const STATUS_MARQUEE_STYLES = `
  @keyframes pain-status-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes pain-status-right {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  .pain-status-track-left {
    animation: pain-status-left 26s linear infinite;
  }
  .pain-status-track-right {
    animation: pain-status-right 30s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .pain-status-track-left,
    .pain-status-track-right {
      animation: none !important;
    }
  }
`;
function StatusMarqueeRow({
  items,
  direction
}) {
  const track = [...items, ...items];
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: [
        "flex w-max gap-2",
        direction === "left" ? "pain-status-track-left" : "pain-status-track-right"
      ].join(" "),
      children: track.map((item, i) => /* @__PURE__ */ jsx(StatusPill, { label: item.label, variant: item.variant }, `${item.label}-${i}`))
    }
  ) });
}
function StatusVisual({ isRu }) {
  const rowLeft = isRu ? [
    { label: "Новая", variant: "ok" },
    { label: "В работе", variant: "ok" },
    { label: "Записан", variant: "warn" },
    { label: "Оплачен", variant: "ok" },
    { label: "На связи", variant: "warn" }
  ] : [
    { label: "New", variant: "ok" },
    { label: "In progress", variant: "ok" },
    { label: "Booked", variant: "warn" },
    { label: "Paid", variant: "ok" },
    { label: "Contacted", variant: "warn" }
  ];
  const rowRight = isRu ? [
    { label: "???", variant: "unknown" },
    { label: "Потеряна", variant: "lost" },
    { label: "Не обработана", variant: "warn" },
    { label: "Ждёт ответа", variant: "unknown" },
    { label: "Пропущена", variant: "lost" }
  ] : [
    { label: "???", variant: "unknown" },
    { label: "Lost", variant: "lost" },
    { label: "Unprocessed", variant: "warn" },
    { label: "Awaiting reply", variant: "unknown" },
    { label: "Missed", variant: "lost" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: STATUS_MARQUEE_STYLES }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 pt-4 sm:pt-5", children: [
      /* @__PURE__ */ jsx(
        Shield,
        {
          size: 14,
          className: "pain-shimmer mb-3 text-[#FF5722]",
          strokeWidth: 1.75,
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(StatusMarqueeRow, { items: rowLeft, direction: "left" }),
        /* @__PURE__ */ jsx(StatusMarqueeRow, { items: rowRight, direction: "right" })
      ] })
    ] })
  ] });
}
function AdminVisual({ isRu }) {
  const lines = isRu ? [
    { label: "Блокнот", value: "Анна — перезвонить" },
    { label: "Таблица", value: "строка 14" },
    { label: "Память", value: "«вроде ответил»", uncertain: true }
  ] : [
    { label: "Notebook", value: "Anna — call back" },
    { label: "Sheet", value: "row 14" },
    { label: "Memory", value: "«think I replied»", uncertain: true }
  ];
  return /* @__PURE__ */ jsx("div", { className: "space-y-2 font-mono text-[11px] leading-relaxed sm:text-[12px]", children: lines.map((line, i) => /* @__PURE__ */ jsxs(
    "p",
    {
      className: line.uncertain ? "pain-blink text-white/50" : "pain-fade-cycle text-white/48",
      style: animStyle(i * 500, 3200),
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-[#FF9A3D]", children: "›" }),
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-white/55", children: [
          line.label,
          ":"
        ] }),
        " ",
        line.value
      ]
    },
    line.label
  )) });
}
function FlowTerminalVisual({ isRu }) {
  const header = "form.submit → email";
  const branches = isRu ? [
    { prefix: "└─", text: "вручную в таблицу" },
    { prefix: "└─", text: "статус: неизвестно" },
    { prefix: "└─", label: "Telegram:", value: "нет", missing: true }
  ] : [
    { prefix: "└─", text: "manual spreadsheet" },
    { prefix: "└─", text: "status: unknown" },
    { prefix: "└─", label: "Telegram:", value: "none", missing: true }
  ];
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const totalSteps = 1 + branches.length;
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(totalSteps);
      return;
    }
    let cancelled = false;
    const timeouts = [];
    const t = (fn, ms) => {
      timeouts.push(window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms));
    };
    setStep(0);
    for (let i = 1; i <= totalSteps; i++) {
      t(() => setStep(i), 520 * i);
    }
    t(() => setCycle((c) => c + 1), 520 * totalSteps + 2400);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [totalSteps, cycle, isRu]);
  const showEnter = step >= totalSteps;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "rounded-xl p-3.5 font-mono sm:p-4",
      style: { backgroundColor: CARD_SOFT },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-1.5 border-b border-white/[0.06] pb-2.5", children: [
          /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#FF5F57]/80", "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#FEBC2E]/80", "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#28C840]/80", "aria-hidden": true }),
          /* @__PURE__ */ jsx("span", { className: "ml-auto text-[9px] uppercase tracking-wide text-white/28", children: isRu ? "обработка" : "handler" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-[10px] leading-[1.8] sm:text-[11px]", children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: [
                "text-white/78 transition-opacity duration-300",
                step >= 1 ? "opacity-100" : "opacity-0"
              ].join(" "),
              children: header
            }
          ),
          branches.map((line, i) => {
            const visible = step >= i + 2;
            return /* @__PURE__ */ jsxs(
              "p",
              {
                className: [
                  "transition-opacity duration-300",
                  visible ? "opacity-100" : "opacity-0",
                  line.missing ? "" : "text-white/42"
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-white/35", children: [
                    line.prefix,
                    " "
                  ] }),
                  line.missing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-white/42", children: [
                      line.label,
                      " "
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "pain-blink text-[#FF5722]", children: line.value })
                  ] }) : line.text
                ]
              },
              line.text ?? line.label
            );
          })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: [
              "mt-4 flex items-center justify-end gap-1.5 transition-all duration-500",
              showEnter ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsx("span", { className: "pain-cursor text-[#FF9A3D]", "aria-hidden": true }),
              /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 rounded-md bg-[#FF5722] px-2.5 py-1 text-[10px] font-medium text-white", children: "Enter ↵" })
            ]
          }
        )
      ]
    }
  );
}
function PainBentoCard({
  title,
  text,
  solution,
  hoverCta,
  visual,
  accent = false,
  split = false,
  bgImage,
  bgAlways = false,
  bgPosition = "center center",
  className
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: [
        "group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        accent ? "bg-[#FF5722]" : "bg-[#141414]",
        className ?? ""
      ].join(" "),
      style: accent ? void 0 : { backgroundColor: CARD_DARK },
      children: [
        bgImage ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: bgImage,
              alt: "",
              loading: "lazy",
              decoding: "async",
              draggable: false,
              className: [
                "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                bgAlways ? "opacity-100" : "opacity-0 motion-safe:group-hover:opacity-100"
              ].join(" "),
              style: { objectPosition: bgPosition }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: [
                "pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                bgAlways ? "opacity-100" : "opacity-0 motion-safe:group-hover:opacity-100",
                accent ? "bg-gradient-to-b from-[#FF5722]/55 via-[#FF5722]/35 to-[#FF5722]/72" : bgAlways ? "bg-gradient-to-b from-black/55 via-black/42 to-black/68" : "bg-gradient-to-b from-black/72 via-black/58 to-black/82"
              ].join(" "),
              "aria-hidden": true
            }
          )
        ] }) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            className: [
              "relative z-[1] flex flex-1 flex-col p-6 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8",
              "motion-safe:group-hover:opacity-0 motion-safe:group-hover:translate-y-[-6px]"
            ].join(" "),
            children: split ? /* @__PURE__ */ jsxs("div", { className: "grid flex-1 gap-6 lg:grid-cols-[1fr_minmax(260px,440px)] lg:items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "order-2 lg:order-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]", children: title }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-[13px] leading-[1.6] text-white/48 sm:text-[14px]", children: text })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "order-1 lg:order-2 lg:self-start", children: visual })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-5 min-h-[88px] sm:min-h-[96px]", children: visual }),
              /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]", children: title }),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: [
                      "mt-2 text-[13px] leading-[1.6] sm:text-[14px]",
                      accent ? "text-white/80" : "text-white/48"
                    ].join(" "),
                    children: text
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: [
              "absolute inset-0 z-[2] flex flex-col opacity-0 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "translate-y-2 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:opacity-100",
              "max-md:pointer-events-none max-md:opacity-0"
            ].join(" "),
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col justify-end p-6 pb-5 sm:p-8 sm:pb-6", style: { backgroundColor: ACCENT$1 }, children: /* @__PURE__ */ jsx("p", { className: "max-w-[42ch] text-[14px] leading-[1.65] text-white sm:text-[15px] sm:leading-[1.7]", children: solution }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 bg-[#141414] px-6 py-4 sm:px-8 sm:py-5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[13px] font-medium text-white sm:text-[14px]", children: hoverCta }),
                /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white motion-safe:group-hover:animate-pulse", children: /* @__PURE__ */ jsx(ArrowRight, { size: 14, strokeWidth: 2, "aria-hidden": true }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "bg-white/[0.04] px-6 py-4 md:hidden", children: /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-[1.6] text-white/55", children: solution }) })
      ]
    }
  );
}
function LandingPainSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const isRu = lang === "ru";
  const items = copy.pain.items;
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "pain",
      className: "relative z-[1] mt-4 scroll-mt-[var(--tivonix-header-spacer)] bg-black pt-2 pb-16 sm:mt-6 sm:pt-4 sm:pb-20 lg:mt-8 lg:pt-6 lg:pb-24",
      children: /* @__PURE__ */ jsxs(Container, { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "min-w-0 text-center", children: /* @__PURE__ */ jsx("h2", { className: `${LANDING_HEADLINE_CLASS} text-center`, children: copy.pain.titleLines.map((line) => /* @__PURE__ */ jsx("span", { className: "block", children: line }, line)) }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-12 lg:items-stretch", children: [
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-full lg:col-span-8 lg:min-h-[340px]",
              title: items[0].title,
              text: items[0].text,
              solution: items[0].solution,
              hoverCta: copy.pain.hoverCta,
              bgImage: PAIN_CARD_BACKGROUNDS[0],
              visual: /* @__PURE__ */ jsx(ChannelsVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-full lg:col-span-4 lg:min-h-[340px]",
              title: items[1].title,
              text: items[1].text,
              solution: items[1].solution,
              hoverCta: copy.pain.hoverCta,
              accent: true,
              bgImage: PAIN_CARD_BACKGROUNDS[1],
              bgAlways: true,
              visual: /* @__PURE__ */ jsx(TelegramVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-full lg:col-span-6",
              title: items[3].title,
              text: items[3].text,
              solution: items[3].solution,
              hoverCta: copy.pain.hoverCta,
              bgImage: PAIN_CARD_BACKGROUNDS[3],
              visual: /* @__PURE__ */ jsx(AdminVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-full lg:col-span-6",
              title: items[2].title,
              text: items[2].text,
              solution: items[2].solution,
              hoverCta: copy.pain.hoverCta,
              bgImage: PAIN_CARD_BACKGROUNDS[2],
              visual: /* @__PURE__ */ jsx(StatusVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-full sm:col-span-2 lg:col-span-12 lg:min-h-[280px]",
              title: items[4].title,
              text: items[4].text,
              solution: items[4].solution,
              hoverCta: copy.pain.hoverCta,
              bgImage: PAIN_CARD_BACKGROUNDS[4],
              bgAlways: true,
              bgPosition: "center center",
              split: true,
              visual: /* @__PURE__ */ jsx(FlowTerminalVisual, { isRu })
            }
          )
        ] })
      ] })
    }
  );
}
function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = { transitionDelay: `${delay}ms` };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: [
        className,
        visible ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-[0.55s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]" : "translate-y-5 opacity-0"
      ].filter(Boolean).join(" "),
      style,
      children
    }
  );
}
const OFFER_MOSAIC_BG = `/images/${encodeURI("как рабоает/пп/блоки/ffon.webp")}`;
const OFFER_BOTTOM_MOBILE_BG = `/images/${encodeURI("как рабоает/пп/6.webp")}`;
const TOP_ENTER_STAGGER_MS = 130;
const TOP_ENTER_DURATION_MS = 820;
const REVEAL_DELAY_MS = 200;
const REVEAL_DURATION_MS = 2800;
const OFFER_MOBILE_MAX_WIDTH = 1023;
function clamp$1(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}
function getAccumulatedScroll(el, root) {
  let x = 0;
  let y = 0;
  let node = el.parentElement;
  while (node && node !== root) {
    x += node.scrollLeft;
    y += node.scrollTop;
    node = node.parentElement;
  }
  return { x, y };
}
function useOfferMosaicBackground(mosaicRef) {
  useLayoutEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic) return;
    const update = () => {
      const mosaicRect = mosaic.getBoundingClientRect();
      if (mosaicRect.width <= 0 || mosaicRect.height <= 0) return;
      const rowBottom2 = mosaic.querySelector(".offer-mosaic__row-bottom");
      const isMobile = window.innerWidth < 1024;
      const gridW = isMobile && rowBottom2 ? Math.max(mosaicRect.width, rowBottom2.scrollWidth) : mosaicRect.width;
      const gridH = mosaicRect.height;
      mosaic.style.setProperty("--offer-grid-w", `${gridW}px`);
      mosaic.style.setProperty("--offer-grid-h", `${gridH}px`);
      mosaic.querySelectorAll("[data-offer-slice]").forEach((card) => {
        const inBottomRow = card.closest(".offer-mosaic__row-bottom") !== null;
        if (isMobile && inBottomRow) {
          card.style.removeProperty("--offer-bg-w");
          card.style.removeProperty("--offer-bg-h");
          card.style.removeProperty("--offer-bg-pos-x");
          card.style.removeProperty("--offer-bg-pos-y");
          return;
        }
        const cardRect = card.getBoundingClientRect();
        const scroll = getAccumulatedScroll(card, mosaic);
        const posX = cardRect.left - mosaicRect.left + scroll.x;
        const posY = cardRect.top - mosaicRect.top + scroll.y;
        card.style.setProperty("--offer-bg-w", `${gridW}px`);
        card.style.setProperty("--offer-bg-h", `${gridH}px`);
        card.style.setProperty("--offer-bg-pos-x", `${-posX}px`);
        card.style.setProperty("--offer-bg-pos-y", `${-posY}px`);
      });
    };
    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    scheduleUpdate();
    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(mosaic);
    window.addEventListener("resize", scheduleUpdate);
    document.fonts?.ready.then(scheduleUpdate).catch(() => void 0);
    const rowBottom = mosaic.querySelector(".offer-mosaic__row-bottom");
    rowBottom?.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      rowBottom?.removeEventListener("scroll", scheduleUpdate);
    };
  }, [mosaicRef]);
}
function useOfferSectionAnimation(mosaicRef, bottomCardRefs) {
  const [topVisible, setTopVisible] = useState([false, false]);
  const [cardReveals, setCardReveals] = useState([
    { bg: 0, text: 0 },
    { bg: 0, text: 0 },
    { bg: 0, text: 0 },
    { bg: 0, text: 0 }
  ]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startedRef = useRef(false);
  const finishInstant = useCallback(() => {
    setTopVisible([true, true]);
    setCardReveals([
      { bg: 1, text: 1 },
      { bg: 1, text: 1 },
      { bg: 1, text: 1 },
      { bg: 1, text: 1 }
    ]);
  }, []);
  const measureBottomRow = useCallback(() => {
    const mosaic = mosaicRef.current;
    const cards = bottomCardRefs.current.filter(Boolean);
    if (!mosaic || cards.length === 0) return null;
    const mosaicRect = mosaic.getBoundingClientRect();
    const first = cards[0].getBoundingClientRect();
    const last = cards[cards.length - 1].getBoundingClientRect();
    const startX = first.left - mosaicRect.left;
    const endX = last.right - mosaicRect.left;
    return { startX, endX, mosaicRect, cards };
  }, [bottomCardRefs, mosaicRef]);
  const updateCardReveals = useCallback((progress) => {
    const measured = measureBottomRow();
    if (!measured) return;
    const { cards } = measured;
    const staggerSpan = 0.72;
    const next = cards.map((_, index) => {
      const start = index / cards.length * staggerSpan;
      const local = clamp$1((progress - start) / (1 - start + 0.18), 0, 1);
      const bgRaw = clamp$1(local / 0.58, 0, 1);
      const textRaw = clamp$1((local - 0.32) / 0.52, 0, 1);
      return {
        bg: easeOutCubic(bgRaw),
        text: easeOutCubic(textRaw)
      };
    });
    setCardReveals(next);
  }, [measureBottomRow]);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia(`(max-width: ${OFFER_MOBILE_MAX_WIDTH}px)`).matches;
    setReducedMotion(reduced);
    const mosaic = mosaicRef.current;
    if (!mosaic) return;
    if (reduced || mobile) {
      finishInstant();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        window.setTimeout(() => setTopVisible([true, false]), 0);
        window.setTimeout(() => setTopVisible([true, true]), TOP_ENTER_STAGGER_MS);
        window.setTimeout(() => {
          const measured = measureBottomRow();
          if (!measured) {
            finishInstant();
            return;
          }
          updateCardReveals(0);
          const revealStart = performance.now();
          const tick = (now) => {
            const raw = clamp$1((now - revealStart) / REVEAL_DURATION_MS, 0, 1);
            updateCardReveals(easeOutCubic(raw));
            if (raw < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }, TOP_ENTER_DURATION_MS + REVEAL_DELAY_MS);
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(mosaic);
    return () => io.disconnect();
  }, [finishInstant, measureBottomRow, mosaicRef, updateCardReveals]);
  useEffect(() => {
    if (!topVisible[0]) return;
    const onResize = () => {
      const progress = cardReveals.every((c) => c.bg >= 1 && c.text >= 1) ? 1 : clamp$1(cardReveals.reduce((max, c) => Math.max(max, c.bg), 0), 0, 1);
      updateCardReveals(progress);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cardReveals, measureBottomRow, topVisible, updateCardReveals]);
  return {
    topVisible,
    cardReveals,
    reducedMotion
  };
}
function OfferBlockCard({
  slice,
  children,
  className,
  bgReveal = 1,
  textReveal: textReveal2 = 1
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      "data-offer-slice": slice,
      className: [
        "offer-block-card relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl",
        className ?? ""
      ].join(" "),
      style: {
        ["--offer-bg-reveal"]: bgReveal,
        ["--offer-text-reveal"]: textReveal2
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "offer-block-card__bg pointer-events-none absolute inset-0", "aria-hidden": true }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "offer-block-card__shade pointer-events-none absolute inset-0 bg-black",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "offer-block-card__content relative z-10 flex min-h-0 flex-1 flex-col justify-between p-6 sm:p-7", children })
      ]
    }
  );
}
function MetricCard({
  slice,
  badge,
  metric,
  label,
  className,
  bgReveal,
  textReveal: textReveal2
}) {
  return /* @__PURE__ */ jsxs(
    OfferBlockCard,
    {
      slice,
      bgReveal,
      textReveal: textReveal2,
      className: ["min-h-[200px] sm:min-h-[220px] lg:min-h-0", className].filter(Boolean).join(" "),
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-[15px] font-semibold tracking-[-0.01em] text-white/90 sm:text-[16px]", children: badge }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto w-full min-w-0 shrink-0 text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "font-hero whitespace-nowrap text-[2rem] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[2.5rem] lg:text-[2.75rem]", children: metric }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-pretty text-[14px] leading-snug text-white/48 sm:text-[15px]", children: label })
        ] })
      ]
    }
  );
}
function FeaturedCard({
  badge,
  metric,
  metricLabel,
  quote,
  linkText,
  className,
  visible
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: [
        "offer-top-enter h-full w-full min-w-0",
        visible ? "offer-top-enter--visible" : "",
        className ?? ""
      ].filter(Boolean).join(" "),
      children: /* @__PURE__ */ jsxs(OfferBlockCard, { slice: 1, className: "h-full lg:min-h-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[15px] font-semibold tracking-[-0.01em] text-white/90 sm:text-[16px]", children: badge }),
        /* @__PURE__ */ jsxs("div", { className: "my-4 max-w-[52ch] flex-1 sm:my-5 lg:my-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[1.7] text-white/58 sm:text-[16px]", children: quote }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: TG_BOT_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-white/80 transition hover:text-[#FFAE66]",
              children: [
                linkText,
                /* @__PURE__ */ jsx(
                  ArrowUpRight,
                  {
                    size: 15,
                    className: "transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    "aria-hidden": true
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-hero whitespace-nowrap text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[2.75rem] lg:text-[3.25rem]", children: metric }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-pretty text-[14px] leading-snug text-white/48 sm:text-[15px]", children: metricLabel })
        ] })
      ] })
    }
  );
}
function MainOfferSection() {
  const copy = landingCopy(useLang().lang);
  const mosaicRef = useRef(null);
  const bottomCardRefs = useRef([]);
  useOfferMosaicBackground(mosaicRef);
  const { topVisible, cardReveals } = useOfferSectionAnimation(
    mosaicRef,
    bottomCardRefs
  );
  const [topMetric, ...bottomMetrics] = copy.offer.metrics;
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "offer",
      className: "scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(Reveal, { delay: 0, children: /* @__PURE__ */ jsx("div", { className: "min-w-0 text-center", children: /* @__PURE__ */ jsx("h2", { className: `${LANDING_HEADLINE_CLASS} text-center text-balance`, children: copy.offer.title }) }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: mosaicRef,
            className: "offer-mosaic relative mt-10 flex flex-col gap-2.5 sm:mt-12 sm:gap-4",
            style: {
              ["--offer-mosaic-image"]: `url("${OFFER_MOSAIC_BG}")`,
              ["--offer-mobile-bottom-image"]: `url("${OFFER_BOTTOM_MOBILE_BG}")`
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "offer-mosaic__row-top grid grid-cols-1 gap-2.5 sm:gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "offer-mosaic__cell min-h-[220px] min-w-0 w-full sm:min-h-[240px] lg:col-span-8 lg:min-h-0", children: /* @__PURE__ */ jsx(
                  FeaturedCard,
                  {
                    badge: copy.offer.featured.badge,
                    metric: copy.offer.featured.metric,
                    metricLabel: copy.offer.featured.metricLabel,
                    quote: copy.offer.featured.quote,
                    linkText: copy.offer.featured.linkText,
                    visible: topVisible[0]
                  }
                ) }),
                topMetric ? /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: [
                      "offer-mosaic__cell offer-top-enter min-h-[220px] sm:min-h-[240px] lg:col-span-4 lg:flex lg:min-h-0",
                      topVisible[1] ? "offer-top-enter--visible" : ""
                    ].filter(Boolean).join(" "),
                    style: { transitionDelay: `${TOP_ENTER_STAGGER_MS}ms` },
                    children: /* @__PURE__ */ jsx(
                      MetricCard,
                      {
                        slice: 2,
                        ...topMetric,
                        className: "w-full lg:h-full lg:min-h-0"
                      }
                    )
                  }
                ) : null
              ] }),
              /* @__PURE__ */ jsx("div", { className: "offer-mosaic__row-bottom grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4", children: bottomMetrics.map((item, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  ref: (el) => {
                    bottomCardRefs.current[i] = el;
                  },
                  className: "offer-mosaic__cell min-w-0 lg:col-span-3",
                  children: /* @__PURE__ */ jsx(
                    MetricCard,
                    {
                      slice: i + 3,
                      ...item,
                      bgReveal: cardReveals[i]?.bg ?? 0,
                      textReveal: cardReveals[i]?.text ?? 0,
                      className: "h-full lg:min-h-0"
                    }
                  )
                },
                item.badge
              )) })
            ]
          }
        )
      ] })
    }
  );
}
const ORBIT_RX = 33;
const ORBIT_RY = 31;
const ORBIT_RX_MOBILE = 35;
const ORBIT_RY_MOBILE = 25;
const ORBIT_RX_PHONE = 36;
const ORBIT_RY_PHONE = 24;
const ROW_Y = 84;
const ROW_Y_MOBILE = 86;
const ROW_BLOCK_REF = 136;
const ROW_OVERLAP = 10;
const ROW_BLOCK_REF_TABLET = 80;
const ROW_OVERLAP_TABLET = 6;
const ROW_STEP_PHONE = 112;
const ROW_Y_PHONE = 80;
const ROW_STRIP_LEADING_PHONE = 32;
function orbitPosition(index, total, rx = ORBIT_RX, ry = ORBIT_RY) {
  const angle = index / total * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + rx * Math.cos(angle),
    y: 50 + ry * Math.sin(angle)
  };
}
function rowPosition(index, total, blockRef = ROW_BLOCK_REF, overlap = ROW_OVERLAP, rowY = ROW_Y) {
  const step = blockRef - overlap;
  const layoutW = blockRef + (total - 1) * step;
  const centerPx = blockRef / 2 + index * step;
  const rowX = centerPx / layoutW * 100;
  return { rowX, rowY };
}
function rowPositionScrollStrip(index, itemStep, stageWidth, rowY, leadingPad = 28) {
  const centerPx = leadingPad + itemStep * 0.5 + index * itemStep;
  const rowX = stageWidth > 0 ? centerPx / stageWidth * 100 : 50;
  return { rowX, rowY };
}
function orbitPositionLegacy(index, total) {
  return orbitPosition(index, total, ORBIT_RX, ORBIT_RY);
}
function rowPositionLegacy(index, total) {
  return rowPosition(index, total, ROW_BLOCK_REF, ROW_OVERLAP);
}
const MODEL_DEFS = [
  { id: "openai", name: "OpenAI", file: "openai.webp", scale: 1.88 },
  { id: "claude", name: "Claude", file: "claude.webp", scale: 1.08, colorful: true },
  { id: "gemini", name: "Gemini", file: "gemini.webp", scale: 2.12 },
  { id: "grok", name: "Grok", file: "grok.webp", scale: 2.65 },
  { id: "deepseek", name: "DeepSeek", file: "deepseek.webp", scale: 1.72, brighten: true },
  { id: "copilot", name: "Copilot", file: "copilot.webp", scale: 1.06 },
  { id: "meta", name: "Meta AI", file: "meta.webp", scale: 1.45 },
  { id: "mistral", name: "Mistral", file: "mistral.webp", scale: 0.96 },
  { id: "ollama", name: "Ollama", file: "ollama.webp", scale: 1.02 },
  { id: "perplexity", name: "Perplexity", file: "perplexity.webp", scale: 1.28 }
];
const AI_MODELS = MODEL_DEFS.map((model, index) => {
  const { x, y } = orbitPositionLegacy(index, MODEL_DEFS.length);
  const { rowX, rowY } = rowPositionLegacy(index, MODEL_DEFS.length);
  return {
    id: model.id,
    name: model.name,
    src: `/images/ai-logos/${model.file}`,
    x,
    y,
    rowX,
    rowY,
    scale: model.scale,
    brighten: "brighten" in model ? model.brighten : void 0,
    colorful: "colorful" in model ? model.colorful : void 0
  };
});
const AI_MODEL_COUNT = AI_MODELS.length;
function cx$8(...a) {
  return a.filter(Boolean).join(" ");
}
function TivonixGlowBorder({ className, children }) {
  return /* @__PURE__ */ jsx("div", { className: cx$8("tivonix-glow-border", className), children: /* @__PURE__ */ jsx("div", { className: "tivonix-glow-border__content relative min-h-0 flex-1", children }) });
}
const ANIM_PIN_VH = 235;
const DRIFT_RUNWAY_VH = 32;
const TIVONIX_LOGO = "/images/logo-black.webp";
const AI_SECTION_BG = "/images/foooa.webp";
const DROP_START = 0.68;
const DROP_END = 0.88;
const STRIP_DROP_THRESHOLD = 0.94;
const STRIP_FADE_SPAN = 0.06;
const ORBIT_START = 0.14;
const ORBIT_REVEAL_END = 0.46;
const HUB_START = 0.36;
const TYPE_START = 0.895;
const TYPE_END = 1;
const AI_MARK_PHASE_END = 0.18;
function clamp01$4(v) {
  return Math.min(1, Math.max(0, v));
}
function smoothstep$2(t) {
  const x = clamp01$4(t);
  return x * x * (3 - 2 * x);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function logoReveal(progress, index) {
  const orbitSpan = ORBIT_REVEAL_END - ORBIT_START;
  const segment = orbitSpan / AI_MODEL_COUNT;
  const start = ORBIT_START + index * segment;
  return smoothstep$2((progress - start) / (segment * 0.72));
}
function aiMarkOpacity(progress, approach) {
  if (progress >= ORBIT_START - 0.02) return 0;
  const fadeIn = Math.max(smoothstep$2(progress / 0.04), approach);
  const fadeOut = 1 - smoothstep$2((progress - 0.1) / (AI_MARK_PHASE_END - 0.1));
  return fadeIn * fadeOut;
}
function sectionApproach$1(rectTop, viewport, headerSpacer) {
  return smoothstep$2((viewport * 0.88 - rectTop) / (viewport * 0.88 - headerSpacer));
}
function aiShellExpand(rectTop, scrollInTrack, viewport, headerSpacer, scrollable, tailPx) {
  let expand = 0;
  if (rectTop < viewport * 0.92) {
    expand = sectionApproach$1(rectTop, viewport, headerSpacer);
  } else if (scrollInTrack > 0) {
    expand = 1;
  }
  const tailStart = scrollable - tailPx * 0.9;
  if (scrollInTrack > tailStart) {
    expand *= 1 - smoothstep$2((scrollInTrack - tailStart) / Math.max(1, tailPx * 0.9));
  }
  return expand;
}
function hubReveal(progress) {
  return smoothstep$2((progress - HUB_START) / 0.1);
}
function rowReady(drop) {
  return smoothstep$2(clamp01$4((drop - 0.94) / 0.06));
}
function typewriterLength$1(progress, length, drop) {
  const ready = rowReady(drop);
  if (ready <= 0) return 0;
  const t = smoothstep$2((progress - TYPE_START) / (TYPE_END - TYPE_START)) * ready;
  return Math.floor(t * length);
}
function textReveal(progress, drop) {
  const ready = rowReady(drop);
  if (ready <= 0) return 0;
  return smoothstep$2((progress - (TYPE_START - 0.01)) / 0.04) * ready;
}
function hubContentFade(drift) {
  return smoothstep$2((drift - 0.32) / 0.52);
}
function dropToBlocks(progress) {
  if (progress < DROP_START) return 0;
  return smoothstep$2((progress - DROP_START) / (DROP_END - DROP_START));
}
function rowExitScroll(drift) {
  return smoothstep$2(drift);
}
function phoneLogoScale(modelId, scale) {
  if (modelId === "grok") return 1.6;
  if (modelId === "mistral") return 1.06;
  return Math.min(scale, 1.32);
}
function mobileLogoScale(modelId, scale, phone) {
  return phoneLogoScale(modelId, scale);
}
function AiPremiumSection() {
  const copy = landingCopy(useLang().lang);
  const pinWrapRef = useRef(null);
  const animPinRef = useRef(null);
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const frameRef = useRef(null);
  const hubRef = useRef(null);
  const textWrapRef = useRef(null);
  const headlineRef = useRef(null);
  const cursorRef = useRef(null);
  const aiMarkRef = useRef(null);
  const phoneStripRef = useRef(null);
  const rowItemRefs = useRef([]);
  const blockSlotRefs = useRef([]);
  const logoImgRefs = useRef([]);
  const reducedMotion = usePrefersReducedMotion$1();
  const headline = copy.ai.headline;
  useEffect(() => {
    const track = pinWrapRef.current;
    const animPin = animPinRef.current;
    if (!track || !animPin || typeof window === "undefined") return;
    let raf = 0;
    let trackTop = 0;
    let animPinHeight = 0;
    let trackHeight = 0;
    let animScrollable = 1;
    let driftScrollable = 1;
    let headerSpacer = 92;
    let tailPx = 1;
    let lastScrollY = -1;
    let lastTypedChars = -1;
    let lastExpand = -1;
    let lastAuroraStrength = -1;
    let lastAiMarkOpacity = -1;
    let smoothExitScroll = 0;
    const logoFrame = AI_MODELS.map(() => ({
      left: "",
      top: "",
      opacity: "",
      transform: "",
      zIndex: "",
      blockOpacity: "",
      inOrbit: true,
      logoScale: "",
      imgOpacity: "",
      rowMode: false
    }));
    const measure = () => {
      const rect = track.getBoundingClientRect();
      trackTop = window.scrollY + rect.top;
      animPinHeight = animPin.offsetHeight;
      trackHeight = track.offsetHeight;
      animScrollable = Math.max(1, animPinHeight - window.innerHeight);
      driftScrollable = Math.max(1, trackHeight - animPinHeight);
      tailPx = DRIFT_RUNWAY_VH / 100 * window.innerHeight;
      headerSpacer = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--tivonix-header-spacer")
      ) || 92;
    };
    const applyFrame = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const scrollInTrack = scrollY - trackTop;
      if (scrollInTrack < -viewport || scrollInTrack > trackHeight + viewport) return false;
      const rectTop = sectionRef.current?.getBoundingClientRect().top ?? trackTop - scrollY;
      const scrollable = Math.max(1, trackHeight - viewport);
      const pinProgress = reducedMotion ? scrollInTrack > animScrollable * 0.2 ? 1 : 0 : clamp01$4(scrollInTrack / animScrollable);
      const drift = reducedMotion ? 0 : clamp01$4((scrollInTrack - animScrollable) / driftScrollable);
      const isEntered = rectTop < viewport * 0.85;
      const approach = rectTop < viewport * 0.92 ? sectionApproach$1(rectTop, viewport, headerSpacer) : scrollInTrack > 0 ? 1 : 0;
      const progress = pinProgress;
      const expand = reducedMotion ? 1 : aiShellExpand(rectTop, scrollInTrack, viewport, headerSpacer, scrollable, tailPx);
      const hub = hubReveal(progress);
      const drop = dropToBlocks(progress);
      const typedChars = typewriterLength$1(progress, headline.length, drop);
      const aiMarkIn = aiMarkOpacity(progress, approach);
      const hubFade = hubContentFade(drift);
      const textOpacity = textReveal(progress, drop) * (1 - hubFade);
      const hubOpacity = hub * (1 - hubFade);
      const targetExitScroll = rowExitScroll(drift);
      const smoothRate = reducedMotion ? 1 : scrollY === lastScrollY ? 0.1 : 0.18;
      smoothExitScroll += (targetExitScroll - smoothExitScroll) * smoothRate;
      const exitScroll = smoothExitScroll;
      const auroraStrength = 1;
      const inAnimPin = scrollInTrack >= 0 && scrollInTrack < animScrollable;
      const isPinned = inAnimPin && rectTop <= 0;
      lastScrollY = scrollY;
      if (expand !== lastExpand) {
        lastExpand = expand;
        pinWrapRef.current?.style.setProperty("--ai-expand", String(expand));
      }
      if (auroraStrength !== lastAuroraStrength) {
        lastAuroraStrength = auroraStrength;
        frameRef.current?.style.setProperty("--ai-aurora-fade", String(auroraStrength));
      }
      const phoneLayout = viewport < 640;
      const tabletLayout = viewport >= 640 && viewport < 1024;
      const desktopLayout = viewport >= 1024;
      const compactLayout = viewport < 1024;
      const frameEl = frameRef.current;
      if (frameEl) {
        frameEl.classList.toggle("ai-premium-frame--live", isEntered);
        frameEl.classList.toggle("ai-premium-frame--desktop", desktopLayout);
        frameEl.classList.toggle(
          "ai-premium-frame--orbit",
          inAnimPin && progress > ORBIT_START - 0.06 && (desktopLayout || drop < 0.35)
        );
      }
      pinWrapRef.current?.classList.toggle("ai-premium-pin--active", inAnimPin && progress > 0.02);
      const sectionEl = sectionRef.current;
      if (sectionEl) {
        sectionEl.classList.toggle("ai-premium-section--pinned", isPinned);
        sectionEl.classList.toggle("ai-premium-section--drift", drift > 0.01);
      }
      const orbitRx = phoneLayout ? ORBIT_RX_PHONE : tabletLayout ? ORBIT_RX_MOBILE : 33;
      const orbitRy = phoneLayout ? ORBIT_RY_PHONE : tabletLayout ? ORBIT_RY_MOBILE : 31;
      const stageEl = rowItemRefs.current[0]?.closest(".ai-premium-orbit-stage");
      const stageW = stageEl?.clientWidth ?? viewport;
      const mobileStripStep = ROW_STEP_PHONE;
      const mobileStripLeading = ROW_STRIP_LEADING_PHONE;
      const mobileStripWidth = mobileStripLeading + mobileStripStep * AI_MODEL_COUNT;
      const mobileDriftMax = Math.max(
        mobileStripWidth - stageW + mobileStripStep * 0.6,
        mobileStripStep * 2
      );
      const mobileStripReveal = phoneLayout && drop > 0.68 ? smoothstep$2((drop - 0.68) / 0.25) : 0;
      const mobileStripProgress = mobileStripReveal * (1 - exitScroll);
      const stripActive = compactLayout && drop >= STRIP_DROP_THRESHOLD;
      const stripFadeIn = stripActive ? smoothstep$2((drop - STRIP_DROP_THRESHOLD) / STRIP_FADE_SPAN) : 0;
      const driftPxBase = exitScroll * Math.max(viewport * 0.72, 480);
      const driftPx = phoneLayout && !stripActive ? -mobileStripProgress * mobileDriftMax : driftPxBase;
      const orbitBlend = 1 - smoothstep$2(drop / 0.24);
      const inOrbitPhase = orbitBlend > 0.04;
      const orbitBlocksIn = progress < ORBIT_START ? 0 : smoothstep$2((progress - ORBIT_START) / 0.07);
      const logoExitFade = phoneLayout ? smoothstep$2((exitScroll - 0.9) / 0.1) : smoothstep$2((exitScroll - 0.28) / 0.72);
      if (stageEl instanceof HTMLElement) {
        stageEl.classList.toggle("ai-premium-orbit-stage--strip-active", stripActive);
      }
      const phoneStrip = phoneStripRef.current;
      if (phoneStrip) {
        const stripFade = stripActive ? stripFadeIn * (1 - logoExitFade) : 0;
        phoneStrip.style.opacity = String(stripFade);
        phoneStrip.style.visibility = stripFade > 0.01 ? "visible" : "hidden";
        phoneStrip.style.pointerEvents = stripActive && stripFade > 0.92 && progress > 0.96 ? "auto" : "none";
        phoneStrip.setAttribute("aria-hidden", stripActive ? "false" : "true");
        if (stripActive) {
          const maxScroll = Math.max(0, phoneStrip.scrollWidth - phoneStrip.clientWidth);
          const animSettled = smoothstep$2((progress - 0.97) / 0.03);
          const scrollT = clamp01$4(animSettled * 0.15 + exitScroll * 0.85);
          const targetScroll = scrollT * maxScroll;
          if (Math.abs(phoneStrip.scrollLeft - targetScroll) > 0.5) {
            phoneStrip.scrollLeft = targetScroll;
          }
        } else if (phoneStrip.scrollLeft !== 0) {
          phoneStrip.scrollLeft = 0;
        }
      }
      frameRef.current?.classList.toggle("ai-premium-frame--phone-scroll", stripActive);
      const hubEl = hubRef.current;
      if (hubEl) {
        const hubTop = phoneLayout ? lerp(46, 36, drop) : tabletLayout ? lerp(48, 40, drop) : lerp(50, 42, drop);
        hubEl.style.top = `${hubTop}%`;
        hubEl.style.opacity = String(hubOpacity);
        hubEl.style.transform = `translate3d(-50%, -50%, 0) scale(${0.84 + hub * 0.16 - drop * 0.08})`;
      }
      if (lastAiMarkOpacity !== aiMarkIn) {
        lastAiMarkOpacity = aiMarkIn;
        const aiMark = aiMarkRef.current;
        if (aiMark) {
          aiMark.style.opacity = String(aiMarkIn);
          aiMark.style.transform = `translate3d(-50%, -50%, 0) scale(${0.92 + aiMarkIn * 0.08})`;
          aiMark.style.pointerEvents = aiMarkIn > 0.04 ? "auto" : "none";
        }
      }
      const textWrap = textWrapRef.current;
      if (textWrap) {
        textWrap.style.opacity = String(textOpacity);
        textWrap.style.transform = `translate3d(0, ${(1 - textOpacity) * 10}px, 0)`;
      }
      if (typedChars !== lastTypedChars && headlineRef.current) {
        lastTypedChars = typedChars;
        headlineRef.current.textContent = headline.slice(0, typedChars);
      }
      if (cursorRef.current) {
        const showCursor = typedChars < headline.length && textOpacity > 0.15 && drop > 0.93;
        cursorRef.current.style.display = showCursor ? "inline-block" : "none";
      }
      AI_MODELS.forEach((model, index) => {
        const el = rowItemRefs.current[index];
        if (!el) return;
        if (stripActive) {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
          return;
        }
        const { x: orbitX, y: orbitY } = orbitPosition(index, AI_MODEL_COUNT, orbitRx, orbitRy);
        const rowPos = phoneLayout ? rowPositionScrollStrip(
          index,
          mobileStripStep,
          stageW,
          ROW_Y_PHONE,
          mobileStripLeading
        ) : tabletLayout ? rowPosition(
          index,
          AI_MODEL_COUNT,
          ROW_BLOCK_REF_TABLET,
          ROW_OVERLAP_TABLET,
          ROW_Y_MOBILE
        ) : rowPosition(index, AI_MODEL_COUNT, ROW_BLOCK_REF, ROW_OVERLAP);
        const reveal = logoReveal(progress, index);
        const x = lerp(orbitX, rowPos.rowX, drop);
        const y = lerp(orbitY, rowPos.rowY, drop);
        const orbitScale = 0.94 + reveal * 0.06;
        const itemScale = lerp(orbitScale, 1, drop);
        const rowOpacity = smoothstep$2(drop);
        const baseOpacity = drop < 0.02 ? Math.max(reveal, orbitBlocksIn) : Math.max(reveal * (1 - drop * 0.35), rowOpacity);
        const itemOpacity = String(baseOpacity * (1 - logoExitFade));
        const tabletScaleTarget = Math.min(model.scale, 1.4);
        const phoneScaleTarget = mobileLogoScale(model.id, model.scale);
        const logoScale = phoneLayout ? lerp(phoneScaleTarget * 0.97, phoneScaleTarget, 1 - orbitBlend) : tabletLayout ? lerp(tabletScaleTarget * 0.97, tabletScaleTarget, 1 - orbitBlend) : lerp(model.scale * 0.96, model.scale, 1 - orbitBlend);
        const imgOpacity = inOrbitPhase ? String(reveal * orbitBlend + (1 - orbitBlend)) : "1";
        const inRowLayout = drop > 0.68;
        const left = `${x}%`;
        const top = `${y}%`;
        const opacity = itemOpacity;
        const zIndex = inRowLayout ? String(12 + index) : inOrbitPhase ? "15" : "10";
        const transform = `translate3d(calc(-50% + ${driftPx}px), -50%, 0) scale(${itemScale})`;
        const blockOpacity = inOrbitPhase ? "1" : String(rowOpacity);
        const scaleStr = String(logoScale);
        const state = logoFrame[index];
        if (state.left !== left) {
          state.left = left;
          el.style.left = left;
        }
        if (state.top !== top) {
          state.top = top;
          el.style.top = top;
        }
        if (state.opacity !== opacity) {
          state.opacity = opacity;
          el.style.opacity = opacity;
        }
        el.style.visibility = "";
        el.style.pointerEvents = "";
        if (state.zIndex !== zIndex) {
          state.zIndex = zIndex;
          el.style.zIndex = zIndex;
        }
        if (state.transform !== transform) {
          state.transform = transform;
          el.style.transform = transform;
        }
        if (state.rowMode !== inRowLayout) {
          state.rowMode = inRowLayout;
          el.classList.toggle("ai-logo-row-item--row", inRowLayout);
        }
        const blockSlot = blockSlotRefs.current[index];
        if (blockSlot && state.blockOpacity !== blockOpacity) {
          state.blockOpacity = blockOpacity;
          blockSlot.style.opacity = blockOpacity;
        }
        const img = logoImgRefs.current[index];
        if (img && state.logoScale !== scaleStr) {
          state.logoScale = scaleStr;
          img.style.setProperty("--ai-logo-scale", scaleStr);
        }
        if (img && state.imgOpacity !== imgOpacity) {
          state.imgOpacity = imgOpacity;
          img.style.opacity = imgOpacity;
        }
      });
      return Math.abs(smoothExitScroll - targetExitScroll) > 15e-4;
    };
    const update = () => {
      const continueSmoothing = applyFrame();
      raf = continueSmoothing ? requestAnimationFrame(update) : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      lastScrollY = -1;
      smoothExitScroll = 0;
      measure();
      update();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, headline]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: pinWrapRef,
      className: "ai-premium-pin relative",
      style: {
        height: `calc(${ANIM_PIN_VH}vh + ${DRIFT_RUNWAY_VH}vh)`,
        ["--ai-expand"]: "0"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: animPinRef,
          className: "ai-premium-anim-pin relative",
          style: { height: `${ANIM_PIN_VH}vh` },
          children: /* @__PURE__ */ jsx(
            "section",
            {
              ref: sectionRef,
              id: "ai",
              className: "ai-premium-section sticky top-0 z-40 flex h-[100svh] flex-col",
              "aria-label": copy.ai.ariaLabel,
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  ref: shellRef,
                  className: "ai-premium-section-shell mx-auto flex min-h-0 w-full flex-1 flex-col",
                  children: /* @__PURE__ */ jsx(TivonixGlowBorder, { className: "ai-premium-border-stage flex min-h-0 w-full flex-1 flex-col", children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      ref: frameRef,
                      className: "ai-premium-frame relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[inherit]",
                      style: { ["--ai-aurora-fade"]: "1" },
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "ai-premium-bg", "aria-hidden": true, children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "ai-premium-bg-image",
                            style: { backgroundImage: `url("${AI_SECTION_BG}")` }
                          }
                        ) }),
                        /* @__PURE__ */ jsx("div", { className: "ai-premium-frame__body relative z-10 flex flex-1 flex-col px-1 py-4 sm:py-6", children: /* @__PURE__ */ jsx("div", { className: "relative mx-auto w-full flex-1", children: /* @__PURE__ */ jsxs("div", { className: "ai-premium-orbit-stage relative mx-auto w-full max-w-full px-2 sm:px-4", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              ref: aiMarkRef,
                              className: "ai-premium-ai-mark pointer-events-none absolute left-1/2 top-1/2 z-30",
                              style: { opacity: 0 },
                              "aria-hidden": true,
                              children: /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: [
                                    "ai-premium-ai-mark__text text-[clamp(4.5rem,20vw,10rem)] leading-none",
                                    reducedMotion ? "" : "ai-premium-ai-mark__text--animated"
                                  ].filter(Boolean).join(" "),
                                  children: "AI"
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              ref: hubRef,
                              className: "ai-hub absolute left-1/2 z-20 flex flex-col items-center",
                              style: {
                                top: "50%",
                                opacity: 0,
                                transform: "translate3d(-50%, -50%, 0) scale(0.84)"
                              },
                              children: [
                                /* @__PURE__ */ jsx(
                                  "img",
                                  {
                                    src: TIVONIX_LOGO,
                                    alt: "TIVONIX",
                                    className: "block h-12 w-auto sm:h-16 lg:h-[5.5rem]",
                                    draggable: false
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    ref: textWrapRef,
                                    className: "mx-auto mt-4 max-w-[22ch] text-center sm:mt-5 sm:max-w-[26ch]",
                                    style: { opacity: 0 },
                                    children: /* @__PURE__ */ jsxs(
                                      "p",
                                      {
                                        className: "font-hero text-[clamp(1.35rem,5.2vw,1.95rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-white sm:text-[clamp(1.2rem,2.9vw,1.85rem)]",
                                        "aria-label": copy.ai.headline,
                                        children: [
                                          /* @__PURE__ */ jsx("span", { ref: headlineRef, "aria-hidden": true }),
                                          /* @__PURE__ */ jsx(
                                            "span",
                                            {
                                              ref: cursorRef,
                                              className: "ai-type-cursor ml-0.5 inline-block text-[#FF9A3D]",
                                              style: { display: "none" },
                                              "aria-hidden": true,
                                              children: "|"
                                            }
                                          )
                                        ]
                                      }
                                    )
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              ref: phoneStripRef,
                              className: "ai-logo-phone-strip lg:hidden",
                              style: { opacity: 0 },
                              "aria-hidden": true,
                              children: /* @__PURE__ */ jsx("div", { className: "ai-logo-phone-strip__track", children: AI_MODELS.map((model) => /* @__PURE__ */ jsx("div", { className: "ai-logo-phone-strip__item", children: /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: model.src,
                                  alt: model.name,
                                  className: [
                                    "ai-logo-phone-strip__img",
                                    model.brighten ? "ai-logo-img--bright" : "",
                                    model.colorful ? "ai-logo-img--colorful" : ""
                                  ].filter(Boolean).join(" "),
                                  draggable: false,
                                  loading: "lazy",
                                  decoding: "async"
                                }
                              ) }, `phone-${model.id}`)) })
                            }
                          ),
                          AI_MODELS.map((model, index) => /* @__PURE__ */ jsx(
                            "div",
                            {
                              ref: (el) => {
                                rowItemRefs.current[index] = el;
                              },
                              className: "ai-logo-row-item absolute z-10",
                              style: { opacity: 0 },
                              children: /* @__PURE__ */ jsx(
                                "div",
                                {
                                  ref: (el) => {
                                    blockSlotRefs.current[index] = el;
                                  },
                                  className: [
                                    "ai-logo-block-slot flex items-center justify-center",
                                    "max-sm:!size-[4.5rem] max-sm:!rounded-xl max-sm:!overflow-hidden",
                                    "max-sm:bg-white/[0.04]"
                                  ].join(" "),
                                  children: /* @__PURE__ */ jsx(
                                    "img",
                                    {
                                      ref: (el) => {
                                        logoImgRefs.current[index] = el;
                                      },
                                      src: model.src,
                                      alt: model.name,
                                      className: [
                                        "ai-logo-img object-contain",
                                        "max-sm:max-h-10 max-sm:max-w-12",
                                        "max-h-[54px] max-w-[100px] sm:max-h-[60px] sm:max-w-[112px] lg:max-h-[64px] lg:max-w-[120px]",
                                        model.brighten ? "ai-logo-img--bright" : "",
                                        model.colorful ? "ai-logo-img--colorful" : ""
                                      ].join(" "),
                                      style: { transform: "scale(var(--ai-logo-scale, 1))" },
                                      draggable: false,
                                      loading: "eager",
                                      decoding: "async"
                                    }
                                  )
                                }
                              )
                            },
                            model.id
                          ))
                        ] }) }) })
                      ]
                    }
                  ) })
                }
              )
            }
          )
        }
      )
    }
  ) });
}
function usePrefersReducedMotion$1() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}
const PLAN_IDS = ["start", "growth", "product", "custom"];
const COMPARISON_GROUPS = [
  {
    id: "core",
    rows: [
      { id: "landing", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "responsive", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "form", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "contactButtons", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "telegramNotify", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "emailNotify", values: { start: { kind: "option" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } }
    ]
  },
  {
    id: "crm",
    rows: [
      { id: "leadStorage", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "leadTable", values: { start: { kind: "option" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "miniCrm", values: { start: { kind: "no" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "statuses", values: { start: { kind: "no" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "history", values: { start: { kind: "no" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "roles", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } }
    ]
  },
  {
    id: "product",
    rows: [
      { id: "cabinet", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "admin", values: { start: { kind: "no" }, growth: { kind: "basic" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "auth", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "database", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "booking", values: { start: { kind: "option" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "payments", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } }
    ]
  },
  {
    id: "automation",
    rows: [
      { id: "autoNotify", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "integrations", values: { start: { kind: "no" }, growth: { kind: "basic" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "aiBot", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "option" }, custom: { kind: "yes" } } },
      { id: "aiLeads", values: { start: { kind: "no" }, growth: { kind: "no" }, product: { kind: "option" }, custom: { kind: "yes" } } },
      { id: "documents", values: { start: { kind: "no" }, growth: { kind: "no" }, product: { kind: "option" }, custom: { kind: "yes" } } },
      { id: "customFlows", values: { start: { kind: "no" }, growth: { kind: "option" }, product: { kind: "yes" }, custom: { kind: "yes" } } }
    ]
  },
  {
    id: "launch",
    rows: [
      { id: "domain", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "deploy", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "guide", values: { start: { kind: "yes" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      { id: "testing", values: { start: { kind: "basic" }, growth: { kind: "yes" }, product: { kind: "yes" }, custom: { kind: "yes" } } },
      {
        id: "support",
        values: {
          start: { kind: "text", textKey: "support7" },
          growth: { kind: "text", textKey: "support14" },
          product: { kind: "text", textKey: "support30" },
          custom: { kind: "text", textKey: "supportCustom" }
        }
      }
    ]
  }
];
const PLANS = [
  { id: "start", ctaAction: getPlanCtaAction("start") },
  { id: "growth", badgeKey: "popular", highlight: true, ctaAction: getPlanCtaAction("growth") },
  { id: "product", badgeKey: "product", ctaAction: getPlanCtaAction("product") },
  { id: "custom", ctaAction: getPlanCtaAction("custom") }
];
const LAUNCH_DISCOUNT_PERCENT = 10;
const PLAN_PRICE_USD = {
  start: 400,
  growth: 900,
  product: 2e3
};
function planPriceStrings(fromLabel, usd) {
  const discounted = Math.round(usd * (1 - LAUNCH_DISCOUNT_PERCENT / 100));
  return {
    price: `${fromLabel} $${discounted}`,
    priceOriginal: `${fromLabel} $${usd}`
  };
}
const COPY_RU = {
  title: "Планы запуска",
  subtitle: "Понятные тарифы под вашу задачу — от первых заявок до полноценного веб-сервиса",
  includesLabel: "Что входит",
  launchDiscount: {
    percent: "10%",
    note: "* Скидка — мы только начинаем: первые проекты запускаем по сниженной цене."
  },
  afterSelect: {
    title: "Что будет после выбора плана",
    steps: [
      "Вы выбираете подходящий план",
      "Мы уточняем задачу и объём",
      "Предлагаем понятный вариант запуска",
      "После согласования начинаем работу"
    ],
    note: "Цены указаны «от», потому что итог зависит от экранов, логики, интеграций и сроков. Оплата происходит после обсуждения и согласования задачи."
  },
  compareTitle: "Сравнение тарифов",
  expandAll: "Развернуть всё",
  collapseAll: "Свернуть",
  cell: {
    yes: "Да",
    no: "—",
    option: "Опция",
    basic: "Базово"
  },
  cellText: {
    support7: "7 дней",
    support14: "14 дней",
    support30: "30 дней",
    supportCustom: "По договорённости"
  },
  badges: {
    popular: "Чаще выбирают",
    product: "Для веб-сервиса"
  },
  plans: {
    start: {
      name: "Start",
      tagline: "Для быстрого запуска заявок",
      ...planPriceStrings("от", PLAN_PRICE_USD.start),
      desc: "Когда нужно быстро запустить страницу под рекламу, Instagram или Telegram и начать собирать заявки в одном месте.",
      includes: [
        "лендинг или страница услуги",
        "форма заявки",
        "кнопки связи",
        "уведомления в Telegram/email",
        "адаптация под телефон",
        "базовая аналитика",
        "запуск на домене"
      ],
      cta: "Обсудить запуск",
      ctaHint: "Откроется Telegram-бот, займёт около 2 минут.",
      compactCta: "Обсудить Start"
    },
    growth: {
      name: "Growth",
      tagline: "Система заявок для бизнеса",
      ...planPriceStrings("от", PLAN_PRICE_USD.growth),
      desc: "Когда заявок становится больше, они приходят из разных каналов и команде нужен порядок: статусы, ответственные, таблица или mini-CRM.",
      includes: [
        "сайт или несколько страниц",
        "форма заявки",
        "Telegram-уведомления",
        "таблица или мини-CRM",
        "статусы заявок",
        "базовая админка",
        "подключение аналитики",
        "помощь с запуском"
      ],
      cta: "Рассчитать систему",
      ctaHint: "Откроется короткая форма. План уже будет выбран.",
      compactCta: "Оставить заявку"
    },
    product: {
      name: "Product",
      tagline: "Веб-сервис под ключ",
      ...planPriceStrings("от", PLAN_PRICE_USD.product),
      desc: "Когда нужен не просто сайт, а рабочий веб-сервис: пользователи, личные кабинеты, роли, база данных и админ-панель.",
      includes: [
        "личный кабинет",
        "админ-панель",
        "регистрация и авторизация",
        "роли пользователей",
        "заявки, статусы, уведомления",
        "база данных",
        "интеграции",
        "оплата",
        "адаптивный интерфейс",
        "подготовка к запуску"
      ],
      cta: "Обсудить продукт",
      ctaHint: "Откроется короткая форма. Опишете продукт — мы оценим объём.",
      compactCta: "Описать продукт"
    },
    custom: {
      name: "Custom",
      tagline: "Автоматизация и AI-решения",
      price: "индивидуально",
      desc: "Когда задача не помещается в готовый тариф: AI-бот, сложная CRM, автоматизация документов, интеграции или внутренняя система.",
      includes: [
        "AI-боты и ассистенты",
        "автоматизация заявок",
        "интеграции с сервисами",
        "обработка данных и документов",
        "личные кабинеты",
        "сложные роли и сценарии",
        "кастомная CRM",
        "поддержка и развитие"
      ],
      cta: "Запросить план",
      ctaHint: "Откроется Telegram-бот для обсуждения нестандартной задачи.",
      compactCta: "Обсудить Custom"
    }
  },
  faq: {
    title: "Частые вопросы о тарифах",
    items: [
      {
        id: "price-from",
        q: "Что значит цена «от»?",
        a: "Это минимальная стоимость запуска. Итог зависит от количества экранов, логики, интеграций, личного кабинета, CRM и сроков."
      },
      {
        id: "pay-now",
        q: "Нужно ли платить сразу?",
        a: "Нет. Сначала мы обсуждаем задачу, уточняем объём и только потом согласуем стоимость и этапы работы."
      },
      {
        id: "which-plan",
        q: "Какой план выбрать, если я не понимаю?",
        a: "Можно выбрать Growth или просто написать нам. Мы разберём задачу и подскажем, нужен сайт, бот, CRM, кабинет или кастомная автоматизация."
      },
      {
        id: "start-expand",
        q: "Можно начать со Start, а потом расширить?",
        a: "Да. Часто лучше запустить простую версию, проверить заявки, а потом добавить CRM, статусы, кабинет или интеграции."
      },
      {
        id: "growth-includes",
        q: "Что входит в Growth?",
        a: "Growth подходит, когда нужно не просто принять заявку, а навести порядок: формы, Telegram-уведомления, статусы, таблица или mini-CRM, понятный процесс обработки."
      },
      {
        id: "when-product",
        q: "Когда нужен Product?",
        a: "Product нужен, если это уже не просто сайт, а веб-сервис: пользователи, личные кабинеты, роли, база данных, оплата, админ-панель."
      },
      {
        id: "when-custom",
        q: "Когда выбирать Custom?",
        a: "Custom подходит для нестандартных задач: AI-боты, сложные CRM, автоматизация документов, интеграции, внутренние панели и процессы под вашу команду."
      }
    ]
  },
  groups: {
    core: "Основное",
    crm: "Заявки и CRM",
    product: "Продуктовая логика",
    automation: "Автоматизация и AI",
    launch: "Запуск и поддержка"
  },
  features: {
    landing: "Лендинг / страница",
    responsive: "Адаптив под телефон",
    form: "Форма заявки",
    contactButtons: "Кнопки связи",
    telegramNotify: "Telegram-уведомления",
    emailNotify: "Email-уведомления",
    leadStorage: "Хранение заявок",
    leadTable: "Таблица заявок",
    miniCrm: "Мини-CRM",
    statuses: "Статусы заявок",
    history: "История обработки",
    roles: "Роли сотрудников",
    cabinet: "Личный кабинет",
    admin: "Админ-панель",
    auth: "Авторизация",
    database: "База данных",
    booking: "Онлайн-запись",
    payments: "Оплата",
    autoNotify: "Автоуведомления",
    integrations: "Интеграции",
    aiBot: "AI-бот",
    aiLeads: "AI-обработка заявок",
    documents: "Обработка документов",
    customFlows: "Кастомные сценарии",
    domain: "Помощь с доменом",
    deploy: "Деплой",
    guide: "Базовая инструкция",
    testing: "Тестирование сценариев",
    support: "Поддержка после запуска"
  },
  footer: {
    valueTitle: "Платите только за",
    valueTitleHighlight: "нужный объём запуска",
    valueAside: "Не за лишние модули, которыми пока не пользуетесь",
    valueLead: "Сначала запускаем то, что помогает получать и обрабатывать заявки. Когда бизнесу становится тесно — добавляем CRM, кабинет, оплату, интеграции или автоматизацию.",
    helpTitle: "Не уверены, какой план выбрать?",
    helpLead: "Опишите задачу своими словами — подскажем, с чего лучше начать: Start, Growth, Product или Custom.",
    helpCta: "Написать в Telegram",
    helpModalCta: "Оставить заявку",
    planScopeCaption: "Объём запуска по планам",
    chips: {
      start: ["Лендинг", "Форма", "Telegram"],
      growth: ["Мини-CRM", "Статусы", "Админка"],
      product: ["Кабинет", "Оплата", "Роли"],
      custom: ["AI-боты", "Интеграции", "CRM"]
    },
    shortDesc: {
      start: "Быстрый запуск страницы и заявок",
      growth: "Система заявок для команды",
      product: "Полноценный веб-сервис",
      custom: "Индивидуальная автоматизация"
    }
  }
};
const COPY_EN = {
  title: "Launch plans",
  subtitle: "Clear plans for your task — from first leads to a full web service",
  includesLabel: "What's included",
  launchDiscount: {
    percent: "10%",
    note: "* Launch discount — we're just getting started: early projects at a reduced rate."
  },
  afterSelect: {
    title: "What happens after you choose a plan",
    steps: [
      "You pick the plan that fits",
      "We clarify the task and scope",
      "We propose a clear launch option",
      "After agreement, we start work"
    ],
    note: "Prices are shown “from” because the final cost depends on screens, logic, integrations and timeline. Payment happens after we discuss and agree on the scope."
  },
  compareTitle: "Compare plans",
  expandAll: "Expand all",
  collapseAll: "Collapse",
  cell: {
    yes: "Yes",
    no: "—",
    option: "Optional",
    basic: "Basic"
  },
  cellText: {
    support7: "7 days",
    support14: "14 days",
    support30: "30 days",
    supportCustom: "By agreement"
  },
  badges: {
    popular: "Most popular",
    product: "For web products"
  },
  plans: {
    start: {
      name: "Start",
      tagline: "Fast lead capture launch",
      ...planPriceStrings("from", PLAN_PRICE_USD.start),
      desc: "When you need a page for ads, Instagram or Telegram — and want to collect inquiries in one place quickly.",
      includes: [
        "landing or service page",
        "lead form",
        "contact buttons",
        "Telegram/email alerts",
        "mobile-friendly layout",
        "basic analytics",
        "domain launch"
      ],
      cta: "Discuss launch",
      ctaHint: "Opens our Telegram bot — takes about 2 minutes.",
      compactCta: "Discuss Start"
    },
    growth: {
      name: "Growth",
      tagline: "Lead system for business",
      ...planPriceStrings("from", PLAN_PRICE_USD.growth),
      desc: "When leads grow and come from multiple channels — your team needs order: statuses, owners, a sheet or mini-CRM.",
      includes: [
        "site or multiple pages",
        "lead form",
        "Telegram alerts",
        "sheet or mini-CRM",
        "lead statuses",
        "basic admin",
        "analytics setup",
        "launch assistance"
      ],
      cta: "Get a quote",
      ctaHint: "Opens a short form. The Growth plan will already be selected.",
      compactCta: "Submit request"
    },
    product: {
      name: "Product",
      tagline: "Full web service",
      ...planPriceStrings("from", PLAN_PRICE_USD.product),
      desc: "When you need more than a website — a working web service with users, client areas, roles, a database and admin panel.",
      includes: [
        "client area",
        "admin panel",
        "sign-up and auth",
        "user roles",
        "leads, statuses, alerts",
        "database",
        "integrations",
        "payments",
        "responsive UI",
        "launch preparation"
      ],
      cta: "Discuss product",
      ctaHint: "Opens a short form. Describe the product — we'll estimate scope.",
      compactCta: "Describe product"
    },
    custom: {
      name: "Custom",
      tagline: "Automation & AI",
      price: "custom",
      desc: "When the task doesn't fit a ready plan: AI bots, complex CRM, document automation, integrations or an internal system.",
      includes: [
        "AI bots and assistants",
        "lead automation",
        "service integrations",
        "data and document processing",
        "client areas",
        "complex roles and flows",
        "custom CRM",
        "support and evolution"
      ],
      cta: "Request a plan",
      ctaHint: "Opens our Telegram bot to discuss a non-standard task.",
      compactCta: "Discuss Custom"
    }
  },
  faq: {
    title: "Pricing FAQ",
    items: [
      {
        id: "price-from",
        q: "What does “from” mean?",
        a: "It's the minimum launch cost. The final price depends on screens, logic, integrations, client area, CRM and timeline."
      },
      {
        id: "pay-now",
        q: "Do I pay right away?",
        a: "No. We discuss the task, clarify scope, then agree on cost and stages before any payment."
      },
      {
        id: "which-plan",
        q: "Which plan if I'm not sure?",
        a: "Pick Growth or message us. We'll review your task and tell you if you need a site, bot, CRM, client area or custom automation."
      },
      {
        id: "start-expand",
        q: "Can I start with Start and expand later?",
        a: "Yes. Often it's better to launch a simple version, test leads, then add CRM, statuses, client area or integrations."
      },
      {
        id: "growth-includes",
        q: "What's in Growth?",
        a: "Growth is for when you need order, not just a form: alerts, statuses, a sheet or mini-CRM and a clear processing flow."
      },
      {
        id: "when-product",
        q: "When do I need Product?",
        a: "Product is for a real web service: users, client areas, roles, database, payments and admin panel."
      },
      {
        id: "when-custom",
        q: "When to choose Custom?",
        a: "Custom fits non-standard work: AI bots, complex CRM, document automation, integrations and internal tools for your team."
      }
    ]
  },
  groups: {
    core: "Core",
    crm: "Leads & CRM",
    product: "Product logic",
    automation: "Automation & AI",
    launch: "Launch & support"
  },
  features: {
    landing: "Landing / page",
    responsive: "Mobile layout",
    form: "Lead form",
    contactButtons: "Contact buttons",
    telegramNotify: "Telegram alerts",
    emailNotify: "Email alerts",
    leadStorage: "Lead storage",
    leadTable: "Lead table",
    miniCrm: "Mini-CRM",
    statuses: "Lead statuses",
    history: "Processing history",
    roles: "Staff roles",
    cabinet: "Client area",
    admin: "Admin panel",
    auth: "Authentication",
    database: "Database",
    booking: "Online booking",
    payments: "Payments",
    autoNotify: "Auto alerts",
    integrations: "Integrations",
    aiBot: "AI bot",
    aiLeads: "AI lead processing",
    documents: "Document processing",
    customFlows: "Custom scenarios",
    domain: "Domain help",
    deploy: "Deploy",
    guide: "Basic guide",
    testing: "Scenario testing",
    support: "Post-launch support"
  },
  footer: {
    valueTitle: "Pay only for",
    valueTitleHighlight: "the launch scope you need",
    valueAside: "Not for modules you don't use yet",
    valueLead: "We launch what helps you capture and process leads first. When the business outgrows it — we add CRM, client area, payments, integrations or automation.",
    helpTitle: "Not sure which plan to pick?",
    helpLead: "Describe your task in your own words — we'll suggest whether to start with Start, Growth, Product or Custom.",
    helpCta: "Message on Telegram",
    helpModalCta: "Submit request",
    planScopeCaption: "Launch scope by plan",
    chips: {
      start: ["Landing", "Form", "Telegram"],
      growth: ["Mini-CRM", "Statuses", "Admin"],
      product: ["Client area", "Payments", "Roles"],
      custom: ["AI bots", "Integrations", "CRM"]
    },
    shortDesc: {
      start: "Fast page and lead launch",
      growth: "Lead system for your team",
      product: "Full web service",
      custom: "Custom automation"
    }
  }
};
function pricingCopy(lang) {
  return lang === "ru" ? COPY_RU : COPY_EN;
}
const COMPARE_GLOBE = "/images/pain-bg-4.webp";
function clamp01$3(v) {
  return Math.min(1, Math.max(0, v));
}
function useCompareGlobeScale(panelRef) {
  const [scale, setScale] = useState(1.04);
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1.1);
      return;
    }
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height + vh * 0.5);
      const scrolled = vh * 0.8 - rect.top;
      const progress = clamp01$3(scrolled / total);
      setScale(1.04 + progress * 0.3);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [panelRef]);
  return scale;
}
function chaosChannelIcon(channel) {
  const key = channel.toLowerCase();
  if (key.includes("instagram")) return { Icon: SiInstagram, color: "#E4405F" };
  if (key.includes("telegram")) return { Icon: SiTelegram, color: "#2AABEE" };
  if (key.includes("whatsapp")) return { Icon: SiWhatsapp, color: "#25D366" };
  if (key.includes("звонок") || key.includes("call")) return { Icon: Phone, color: "#FF9A3D" };
  if (key.includes("email") || key.includes("почт")) return { Icon: Mail, color: "#93C5FD" };
  return { Icon: Globe, color: "#FFAE66" };
}
function CompareCrmHover({
  title,
  sidebar,
  leadsTitle,
  leads
}) {
  return /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm", children: [
    /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm__topbar", children: [
      /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__logo", children: title }),
      /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__live", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm__layout", children: [
      /* @__PURE__ */ jsx("nav", { className: "compare-mini-crm__sidebar", "aria-label": title, children: sidebar.map((item) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `compare-mini-crm__nav${item.active ? " compare-mini-crm__nav--active" : ""}`,
          children: [
            /* @__PURE__ */ jsx("span", { children: item.label }),
            item.count ? /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__nav-count", children: item.count }) : null
          ]
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm__main", children: [
        /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm__main-head", children: [
          /* @__PURE__ */ jsx("span", { children: leadsTitle }),
          /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__main-count", children: leads.length })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "compare-mini-crm__leads", children: leads.map((lead) => /* @__PURE__ */ jsxs("article", { className: "compare-mini-crm__lead", children: [
          /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm__lead-top", children: [
            /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__lead-name", children: lead.name }),
            /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__lead-time", children: lead.time })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "compare-mini-crm__lead-preview", children: lead.preview }),
          /* @__PURE__ */ jsxs("div", { className: "compare-mini-crm__lead-meta", children: [
            /* @__PURE__ */ jsx("span", { className: "compare-mini-crm__lead-source", children: lead.source }),
            /* @__PURE__ */ jsx("span", { className: `compare-mini-crm__status compare-mini-crm__status--${lead.tone}`, children: lead.status })
          ] })
        ] }, `${lead.name}-${lead.preview}`)) })
      ] })
    ] })
  ] });
}
function ComparePlansHover({
  title,
  plans,
  badges,
  moreLabel
}) {
  const highlightId = "growth";
  return /* @__PURE__ */ jsxs("div", { className: "compare-mini-plans", children: [
    /* @__PURE__ */ jsx("p", { className: "compare-mini-plans__title", children: title }),
    /* @__PURE__ */ jsx("div", { className: "compare-mini-plans__list", children: PLAN_IDS.map((id) => {
      const plan = plans[id];
      const isHighlight = id === highlightId;
      const badge = id === "growth" ? badges.popular : id === "product" ? badges.product : null;
      return /* @__PURE__ */ jsxs(
        "article",
        {
          className: `compare-mini-plans__item${isHighlight ? " compare-mini-plans__item--highlight" : ""}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "compare-mini-plans__item-head", children: [
              /* @__PURE__ */ jsxs("div", { className: "compare-mini-plans__item-names", children: [
                /* @__PURE__ */ jsx("span", { className: "compare-mini-plans__name", children: plan.name }),
                badge ? /* @__PURE__ */ jsx("span", { className: "compare-mini-plans__badge", children: badge }) : null
              ] }),
              /* @__PURE__ */ jsx("span", { className: "compare-mini-plans__price", children: plan.price })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "compare-mini-plans__tagline", children: plan.tagline })
          ]
        },
        id
      );
    }) }),
    /* @__PURE__ */ jsxs(Link, { to: "/plans", className: "compare-mini-plans__more group", children: [
      moreLabel,
      /* @__PURE__ */ jsx(
        ArrowUpRight,
        {
          size: 14,
          className: "transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          "aria-hidden": true
        }
      )
    ] })
  ] });
}
function CompareChaosMessage({ msg }) {
  const { Icon: Icon2, color } = chaosChannelIcon(msg.channel);
  return /* @__PURE__ */ jsxs("div", { className: "compare-chaos-msg", children: [
    /* @__PURE__ */ jsx("span", { className: "compare-chaos-msg__icon", style: { color }, children: /* @__PURE__ */ jsx(Icon2, { size: 13, "aria-hidden": true }) }),
    /* @__PURE__ */ jsxs("div", { className: "compare-chaos-msg__body", children: [
      /* @__PURE__ */ jsxs("div", { className: "compare-chaos-msg__head", children: [
        /* @__PURE__ */ jsx("span", { className: "compare-chaos-msg__channel", children: msg.channel }),
        /* @__PURE__ */ jsx("span", { className: "compare-chaos-msg__time", children: msg.time })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "compare-chaos-msg__text", children: msg.text })
    ] })
  ] });
}
function CompareChaosHover({ messages, active }) {
  const renderGroup = (suffix) => messages.map((msg) => /* @__PURE__ */ jsx(CompareChaosMessage, { msg }, `${suffix}-${msg.channel}-${msg.text}`));
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `compare-chaos-stream${active ? " compare-chaos-stream--live" : ""}`,
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxs("div", { className: "compare-chaos-stream__track", children: [
        /* @__PURE__ */ jsx("div", { className: "compare-chaos-stream__group", children: renderGroup("a") }),
        /* @__PURE__ */ jsx("div", { className: "compare-chaos-stream__group", children: renderGroup("b") })
      ] })
    }
  );
}
function ComparisonSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const pricing = pricingCopy(lang);
  const crm = copy.compare.hover.crm;
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [pricingHover, setPricingHover] = useState(false);
  const centerPanelRef = useRef(null);
  const globeScale = useCompareGlobeScale(centerPanelRef);
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "compare",
      className: "compare-section-lift scroll-mt-[var(--tivonix-header-spacer)] bg-black !pb-8 !pt-6 sm:!pb-10 sm:!pt-8 lg:!pb-12 lg:!pt-10",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[46rem] text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.65rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white text-balance", children: copy.compare.title }),
          copy.compare.subtitle ? /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-[40rem] text-[15px] leading-[1.6] text-white/42 sm:text-[16px]", children: copy.compare.subtitle }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "compare-split mt-5 sm:mt-6", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `compare-split__left compare-split__panel${leftHover ? " compare-split__panel--hovered" : ""}`,
              onMouseEnter: () => setLeftHover(true),
              onMouseLeave: () => setLeftHover(false),
              role: "group",
              "aria-label": copy.compare.regular.title,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "compare-split__default compare-split__left-inner", children: [
                  /* @__PURE__ */ jsx("p", { className: "compare-split__headline font-hero text-[clamp(1.5rem,3.2vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white", children: copy.compare.regular.headline }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/35", children: copy.compare.regular.title }),
                  /* @__PURE__ */ jsx("div", { className: "compare-blocks-grid mt-6", children: copy.compare.regular.items.map((item) => /* @__PURE__ */ jsx("div", { className: "compare-block compare-block--muted", children: item }, item)) }),
                  /* @__PURE__ */ jsx("div", { className: "compare-blocks-grid mt-3", children: copy.compare.chaosTags.map((tag) => /* @__PURE__ */ jsx("div", { className: "compare-block compare-block--warn", children: tag }, tag)) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "compare-split__hover compare-split__hover--chaos", children: /* @__PURE__ */ jsx(CompareChaosHover, { messages: copy.compare.hover.chaosMessages, active: leftHover }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: centerPanelRef,
              className: `compare-split__right compare-split__panel${rightHover ? " compare-split__panel--hovered" : ""}${globeScale > 1.12 ? " compare-split__right--zoomed" : ""}`,
              onMouseEnter: () => setRightHover(true),
              onMouseLeave: () => setRightHover(false),
              role: "group",
              "aria-label": copy.compare.tivonix.title,
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "compare-split__right-media",
                    style: { transform: `scale(${globeScale})` },
                    "aria-hidden": true,
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: COMPARE_GLOBE,
                          alt: "",
                          className: "compare-split__globe",
                          loading: "lazy",
                          decoding: "async"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "compare-split__right-overlay" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "compare-split__default compare-split__right-inner", children: [
                  /* @__PURE__ */ jsx("p", { className: "compare-split__headline font-hero text-[clamp(1.5rem,3.2vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white", children: copy.compare.tivonix.headline }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/72", children: copy.compare.tivonix.title }),
                  /* @__PURE__ */ jsx("ul", { className: "mt-6 hidden space-y-2.5 text-left sm:block", children: copy.compare.tivonix.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-[14px] text-white/92 sm:text-[15px]", children: [
                    /* @__PURE__ */ jsx(Check, { size: 14, className: "mt-0.5 shrink-0 text-white", strokeWidth: 2.5, "aria-hidden": true }),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ] }, item)) }),
                  /* @__PURE__ */ jsxs("div", { className: "compare-split__badge mt-5 sm:mt-6", children: [
                    /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 2.5, "aria-hidden": true }),
                    /* @__PURE__ */ jsx("span", { className: "text-pretty leading-[1.45]", children: copy.compare.tivonix.badge })
                  ] }),
                  /* @__PURE__ */ jsx("ul", { className: "compare-split__mobile-list mt-6 space-y-2.5 text-left sm:mt-5 sm:hidden", children: copy.compare.tivonix.items.slice(0, 4).map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-[13px] text-white/90", children: [
                    /* @__PURE__ */ jsx(Check, { size: 13, className: "mt-0.5 shrink-0", strokeWidth: 2.5, "aria-hidden": true }),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ] }, item)) })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "compare-split__hover compare-split__hover--crm", children: /* @__PURE__ */ jsx(
                  CompareCrmHover,
                  {
                    title: crm.title,
                    sidebar: crm.sidebar,
                    leadsTitle: crm.leadsTitle,
                    leads: crm.leads
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              id: "services",
              className: `compare-split__pricing compare-split__panel scroll-mt-[var(--tivonix-header-spacer)]${pricingHover ? " compare-split__panel--hovered" : ""}`,
              onMouseEnter: () => setPricingHover(true),
              onMouseLeave: () => setPricingHover(false),
              role: "group",
              "aria-label": copy.pricingTeaser.title,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "compare-split__default compare-split__pricing-inner", children: [
                  /* @__PURE__ */ jsx("p", { className: "compare-split__eyebrow", children: copy.pricingTeaser.eyebrow }),
                  /* @__PURE__ */ jsx("h3", { className: "compare-split__headline mt-3 font-hero text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white", children: copy.pricingTeaser.title }),
                  /* @__PURE__ */ jsx("ul", { className: "compare-pricing-teaser mt-5", children: PLAN_IDS.map((id) => /* @__PURE__ */ jsxs("li", { className: "compare-pricing-teaser__row", children: [
                    /* @__PURE__ */ jsx("span", { className: "compare-pricing-teaser__name", children: pricing.plans[id].name }),
                    /* @__PURE__ */ jsx("span", { className: "compare-pricing-teaser__price", children: pricing.plans[id].price })
                  ] }, id)) }),
                  /* @__PURE__ */ jsxs("p", { className: "compare-pricing-teaser__more mt-5", children: [
                    copy.pricingTeaser.more,
                    /* @__PURE__ */ jsx(ArrowUpRight, { size: 15, className: "inline-block", "aria-hidden": true })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "compare-split__hover compare-split__hover--plans", children: /* @__PURE__ */ jsx(
                  ComparePlansHover,
                  {
                    title: pricing.title,
                    plans: pricing.plans,
                    badges: pricing.badges,
                    moreLabel: copy.pricingTeaser.more
                  }
                ) })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function cx$7(...a) {
  return a.filter(Boolean).join(" ");
}
function pillItemClass(active, compact) {
  return cx$7(
    "relative flex items-center rounded-full border-0 font-bold uppercase tracking-[0.12em] outline-none select-none transition duration-[260ms]",
    "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
    compact ? "px-3 h-9 text-[9.5px] tracking-[0.1em]" : "px-4 h-10 text-[10px]",
    active ? "bg-[#2c2c2c] text-white" : "bg-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/85"
  );
}
function PillActionItemView({
  item,
  active,
  compact,
  onSelect
}) {
  const className = pillItemClass(active, compact);
  if (item.to) {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: item.to,
        onClick: () => onSelect(item.id),
        className,
        "aria-current": active ? "page" : void 0,
        "data-active": active ? "" : void 0,
        children: /* @__PURE__ */ jsx("span", { className: "leading-none", children: item.label })
      }
    );
  }
  if (item.href) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href: item.href,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: () => onSelect(item.id),
        className,
        "data-active": active ? "" : void 0,
        children: /* @__PURE__ */ jsx("span", { className: "leading-none", children: item.label })
      }
    );
  }
  return /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onSelect(item.id), className, "data-active": active ? "" : void 0, children: /* @__PURE__ */ jsx("span", { className: "leading-none", children: item.label }) });
}
function PillActionBar({
  items,
  activeId,
  onActiveChange,
  compact = true,
  className,
  ariaLabel
}) {
  const handleSelect = (id) => {
    onActiveChange(id);
    items.find((item) => item.id === id)?.onClick?.();
  };
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cx$7(
        "relative inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border-0 bg-[#141414] p-1",
        className
      ),
      "aria-label": ariaLabel,
      children: items.map((item) => /* @__PURE__ */ jsx(
        PillActionItemView,
        {
          item,
          active: item.id === activeId,
          compact,
          onSelect: handleSelect
        },
        item.id
      ))
    }
  );
}
const UPC_DOMAIN = "https://upc.watch/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const GIFTSNIPER_DOMAIN = "https://t.me/GiftSniperTonBot";
const SLOTTY_DOMAIN = "https://slotty.of.by/book";
const SPLITON_DOMAIN = "https://spliton.io/app";
const PUBLIC_PROJECT_IDS = ["spliton", "slotty", "giftsniper"];
const SLOTTY_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/slotty/r${i + 1}.webp`);
const SPLITON_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/spliton/g${i + 1}.webp`);
function buildAllProjects(isRu) {
  return [
    // 1) LABEL0S — 3 days
    {
      id: "labelos",
      title: "LabelOS",
      subtitleRu: "SaaS для музыкальных лейблов: отчёты, рассылка, шаблоны и контроль выплат.",
      subtitleEn: "SaaS for music labels: reporting, email delivery, templates and payout control.",
      detailsRu: "Срок: 3 дня\n\nЦель\n• Быстро собрать внятный промо-лендинг продукта и зафиксировать ценностное предложение.\n\nЧто сделали\n• Сформировали структуру и блоки: Hero → проблемы → решение → возможности → сценарии → CTA\n• Привели типографику к премиум-стилю: иерархия, ритм, воздух, читабельность\n• Собрали адаптивную вёрстку (mobile-first) и аккуратные интерактивные состояния\n• Оптимизировали загрузку: lazy-графика, корректные размеры, аккуратные фоны\n\nОсобенности\n• Чёткий фокус на конверсию: короткие формулировки, сильный CTA, логичная структура\n• Минимум “воды” — только то, что отвечает на вопросы клиента\n",
      detailsEn: "Timeline: 3 days\n\nGoal\n• Build a clear promo landing and solidify the value proposition fast.\n\nWhat we did\n• Designed the page structure: Hero → pain points → solution → features → flows → CTA\n• Refined premium typography: hierarchy, rhythm, spacing, readability\n• Built responsive layout (mobile-first) with clean interactive states\n• Improved loading: lazy assets, correct sizing, polished background layers\n\nHighlights\n• Conversion-first copy and structure\n• No fluff — only what answers buyer questions\n",
      domain: LABELOS_DOMAIN,
      status: "live",
      tags: ["SaaS", "Landing", "UI/UX", "React", "Tailwind"],
      cover: "/images/project-priew/labelo.webp",
      outcomes: [
        isRu ? "Готовый промо-лендинг за 3 дня" : "Promo landing delivered in 3 days",
        isRu ? "Чёткая структура под конверсию" : "Conversion-focused structure",
        isRu ? "Адаптив + оптимизация загрузки" : "Responsive + optimized loading"
      ],
      stack: ["React", "Tailwind", "Vite"]
    },
    // 2) UPC — SaaS MVP (client: ИП Безбородых И.В.) · https://upc.watch/
    {
      id: "upc",
      title: "UPC",
      subtitleRu: "SaaS MVP: подключаешь трек к TikTok, делишься ссылкой — монетизируешь просмотры, когда ролик набирает охват.",
      subtitleEn: "SaaS MVP: attach your sound on TikTok, share a link — monetize views as the clip gains traction.",
      detailsRu: "Продукт: SaaS / MVP (не одностраничный лендинг)\n\nИдея\n• Артист или правообладатель подключает трек к ролику в TikTok и получает ссылку на отслеживание\n• Доход завязан на просмотрах и охвате: чем устойчивее набирает видео, тем сильнее монетизация сценария\n\nЗаказчик\n• ИП Безбородых И.В.\nКонтакт/представитель\n• Виктор Безбородых — Founder & CEO MIN.ECO (music distribution ecosystem)\n\nЧто сделали\n• Собрали продуктовый интерфейс и логику сценария «трек → ссылка → метрики»\n• Премиум-подача UI: сетка, типографика, анимации без перегруза\n• Адаптив, микровзаимодействия, скорость загрузки\n• Backend на Supabase/Postgres под учёт, интеграции и рост функциональности\n\nРезультат\n• Живой MVP на upc.watch с понятным циклом монетизации для коротких видео\n",
      detailsEn: "Product: SaaS / MVP (not a single-page marketing-only site)\n\nConcept\n• The rights holder connects a track to a TikTok video and gets a tracking link\n• Revenue ties to views and reach — stronger traction means a stronger monetization path\n\nClient\n• IE Bezborodykh I.V.\n• INN 261709192509\n• OGRNIP 325200000025627\nContact/rep\n• Viktor Bezborodykh — Founder & CEO of MIN.ECO (music distribution ecosystem)\n\nWhat we did\n• Product UI and flows: track → link → metrics\n• Premium UI craft: grid, typography, motion without clutter\n• Responsive layout, micro-interactions, fast loading\n• Supabase/Postgres backend for data, integrations and feature growth\n\nOutcome\n• Live MVP at upc.watch with a clear short-video monetization loop\n",
      domain: UPC_DOMAIN,
      status: "live",
      tags: ["SaaS", "MVP", "React", "TypeScript", "Supabase"],
      cover: "/images/project-priew/upcwatc.webp",
      outcomes: [
        isRu ? "MVP с циклом трек → ссылка → монетизация просмотров" : "MVP loop: track → link → view-based monetization",
        isRu ? "Премиум UI + стабильная скорость" : "Premium UI + solid performance",
        isRu ? "База Supabase/Postgres под масштаб продукта" : "Supabase/Postgres foundation to scale the product"
      ],
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind",
        "Supabase",
        "PostgreSQL"
      ],
      testimonial: {
        name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
        role: isRu ? "Founder & CEO MIN.ECO" : "Founder & CEO, MIN.ECO",
        text: isRu ? "Сделали быстро, аккуратно и с правильным ощущением премиума. Отдельно — за скорость и структуру." : "Fast, clean delivery with a premium feel. Great performance and structure."
      }
    },
    // 3) PAYCLIP — 2 weeks (client: ИП Безбородых И.В.)
    {
      id: "payclip",
      title: "PayClip",
      subtitleRu: "Платёжный продукт: лендинг под конверсию + онбординг. Быстро доводит до действия.",
      subtitleEn: "Payment product: conversion landing + onboarding.",
      detailsRu: "Срок: 2 недели\n\nЗаказчик\n• ИП Безбородых И.В.\nКонтакт/представитель\n• Виктор Безбородых — Founder & CEO MIN.ECO\n\nЦель\n• Сделать продуктовую посадочную + онбординг, чтобы быстрее доводить пользователя до действия.\n\nЧто сделали за 2 недели\n• Спроектировали структуру под лиды: оффер → доверие → сценарии → CTA\n• Собрали чистый UI: сетка, отступы, контраст, типографика\n• Протянули ключевые пользовательские сценарии (онбординг/первые шаги)\n• Добавили состояния/валидации/микровзаимодействия\n• Сделали адаптив и проверили кроссбраузерность\n\nРезультат\n• Понятная посадочная + онбординг, меньше вопросов у пользователей, выше конверсия в контакт\n",
      detailsEn: "Timeline: 2 weeks\n\nClient\n• IE Bezborodykh I.V.\n• INN 261709192509\n• OGRNIP 325200000025627\nContact/rep\n• Viktor Bezborodykh — Founder & CEO, MIN.ECO\n\nGoal\n• Build a product landing + onboarding to move users to action faster.\n\nWhat we delivered in 2 weeks\n• Lead-oriented structure: offer → trust → flows → CTA\n• Clean UI: grid, spacing, contrast, typography\n• Core user flows (onboarding / first steps)\n• States, validation, micro-interactions\n• Responsive layout + cross-browser checks\n\nResult\n• Clear landing + onboarding, fewer user questions, better conversion to contact\n",
      domain: PAYCLIP_DOMAIN,
      status: "live",
      tags: ["Fintech", "Landing", "Onboarding", "UI/UX", "Conversion"],
      cover: "/images/project-priew/payslip.webp",
      outcomes: [
        isRu ? "Сделано за 2 недели" : "Delivered in 2 weeks",
        isRu ? "Структура под конверсию" : "Conversion-driven structure",
        isRu ? "Онбординг и сценарии" : "Onboarding and user flows"
      ],
      stack: ["React", "TypeScript", "Tailwind", "API"],
      testimonial: {
        name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
        role: isRu ? "Founder & CEO MIN.ECO" : "Founder & CEO, MIN.ECO",
        text: isRu ? "Коммуникация — по делу, быстро вносят правки, результатом довольны." : "Clear communication, fast iterations, happy with the result."
      }
    },
    // 4) HEADMIND — closed case (stack: HTML/CSS/JS ES6)
    {
      id: "headmind",
      title: "Headmind",
      subtitleRu: "Корпоративный сайт: услуги, команда, доверие и лид-ген под B2B.",
      subtitleEn: "Corporate website: services structure, team credibility and B2B lead-gen.",
      detailsRu: "Формат: корпоративный сайт / презентация услуг\n\nЦель\n• Упаковать экспертизу и сделать сайт, который объясняет «кто мы», «что делаем» и приводит заявки.\n\nЧто сделали\n• Собрали информационную архитектуру: услуги → подход → кейсы → команда → контакт\n• Упростили формулировки и усилили доверие: акценты на опыте, ролях, результатах\n• Собрали верстку: чистая типографика, адаптив, скорость загрузки\n• Настроили CTA и точки захвата (контакты/формы)\n\nЗаказчики\n• Евгений Беликов — основатель и генеральный директор ООО «Хэдмайнд»\n• Виталий Петровский — партнёр, соучредитель ООО «Хэдмайнд»\n",
      detailsEn: "Format: corporate website / services showcase\n\nGoal\n• Package expertise into a clear website that explains who they are, what they do, and generates leads.\n\nWhat we did\n• Built information architecture: services → approach → cases → team → contact\n• Improved clarity + trust: experience, roles, outcomes\n• Clean responsive layout, fast loading\n• CTA and lead capture points (contacts/forms)\n\nClients\n• Evgeniy Belikov — Founder & CEO\n• Vitaliy Petrovskiy — Partner & Co-founder\n",
      domain: HEADMIND_DOMAIN,
      status: "live",
      tags: ["B2B", "Website", "UI/UX", "Structure", "Conversion"],
      cover: "/images/project-priew/headmind.webp",
      outcomes: [
        isRu ? "Понятная упаковка услуг и подхода" : "Clear services & approach packaging",
        isRu ? "Усиление доверия через команду и структуру" : "Stronger trust via team + structure",
        isRu ? "CTA и точки лид-генерации" : "CTA and lead capture points"
      ],
      stack: ["HTML", "CSS", "JavaScript (ES6)"],
      testimonial: {
        name: isRu ? "Евгений Беликов / Виталий Петровский" : "Evgeniy Belikov / Vitaliy Petrovskiy",
        role: isRu ? "ООО «Хэдмайнд»" : "Headmind",
        text: isRu ? "Собрали структуру и подачу так, что сайт стал понятнее для клиентов и лучше ведёт к заявке." : "The structure and messaging became clearer, and the site now drives leads more effectively."
      }
    },
    // 5) GIFTSNIPER — Telegram-бот для оценки NFT и Telegram Gifts в TON
    {
      id: "giftsniper",
      title: "GiftSniper",
      subtitleRu: "Telegram-бот для оценки NFT и Telegram Gifts в TON по рыночным данным: трейты, листинги, аналоги и ориентир цены.",
      subtitleEn: "Telegram bot for TON NFT and Telegram Gifts valuation using market data: traits, listings, comparables, and pricing guidance.",
      detailsRu: "Формат: Telegram-бот / аналитический продукт\n\nЦель\n• Помочь пользователю быстро понять, сколько может стоить NFT или Telegram Gift без ручного сравнения десятков объявлений.\n\nКак это работает\n• Пользователь отправляет ссылку на Getgems, Fragment, Tonviewer или NFT address\n• GiftSniper анализирует объект и возвращает данные в понятном формате\n\nЧто показывает бот\n• Трейты и характеристики NFT или Telegram Gift\n• Текущий листинг\n• Похожие объявления на рынке\n• Ориентировочную цену продажи\n• Данные для более быстрого решения по продаже\n\nБезопасность и позиционирование\n• GiftSniper не покупает и не продаёт активы за пользователя\n• Не подключается к кошельку и не запрашивает seed-фразу, private key или доступ к аккаунту\n• Это аналитический инструмент для оценки и сравнения объекта с рынком\n\nЧто сделали в проекте\n• Продумали логику работы бота и структуру сценариев\n• Реализовали обработку ссылок и показ ключевых рыночных данных\n• Собрали удобный пользовательский путь внутри Telegram\n\nРезультат\n• GiftSniper показывает, как Telegram-бот может быть полноценным продуктом с практической пользой для TON, NFT и Telegram Gifts\n• Твой помощник по первому заработку\n• Проект создан командой TIVONIX\n",
      detailsEn: "Format: Telegram bot / analytics product\n\nGoal\n• Help users quickly estimate NFT or Telegram Gift value without manually comparing dozens of listings.\n\nHow it works\n• A user sends a Getgems, Fragment, Tonviewer link, or an NFT address\n• GiftSniper analyzes the asset and returns key data in a clear format\n\nWhat the bot provides\n• Traits and asset characteristics\n• Current listing data\n• Comparable market offers\n• Estimated selling price range\n• Decision-support data for faster pricing\n\nSafety and positioning\n• GiftSniper does not buy or sell assets on behalf of users\n• No wallet connection and no request for seed phrase, private key, or account access\n• It is an analytics assistant for valuation and market comparison\n\nWhat we delivered\n• Bot logic and scenario architecture\n• Link parsing and market-data presentation flow\n• A smooth user journey inside Telegram\n\nOutcome\n• GiftSniper demonstrates how a Telegram bot can be a full product with real utility for TON, NFT, and Telegram Gifts users\n• Your first-earnings assistant\n• Project by TIVONIX team\n",
      domain: GIFTSNIPER_DOMAIN,
      status: "live",
      tags: ["Telegram Bot", "TON", "NFT", "Analytics", "Market Data"],
      cover: "/images/project-priew/giftsniper.webp",
      outcomes: [
        isRu ? "Оценка NFT и Gifts по данным рынка в одном окне" : "NFT and Gifts valuation from market data in one flow",
        isRu ? "Быстрый анализ: трейты, листинги, аналоги, ориентир цены" : "Fast analysis: traits, listings, comparables, pricing guidance",
        isRu ? "Без подключения кошелька и доступа к аккаунту" : "No wallet connection or account-access risk"
      ],
      stack: ["Telegram Bot API", "TON", "NFT Data", "Parser", "Analytics"]
    },
    // 7) SLOTTY — платформа онлайн-записи к мастерам (MVP)
    {
      id: "slotty",
      title: "Slotty",
      subtitleRu: "Платформа для онлайн-записи к мастерам, студиям и услугам: выбор специалиста, свободное время, запись, напоминания и история посещений в одном сервисе.",
      subtitleEn: "Online booking platform for masters, studios and services: pick a specialist, see open slots, book, get reminders and visit history in one app.",
      detailsRu: "Формат: SaaS / marketplace / сервис онлайн-записи\n\nДомен\n• slotty.of.by/book\n\nСтатус\n• В продакшене\n\nЦель\n• Помочь пользователю быстро найти подходящего мастера или студию, выбрать услугу, увидеть свободное время и записаться онлайн без звонков, переписок и лишних шагов.\n\nКак это работает\n• Пользователь выбирает категорию услуги: маникюр, парикмахер, косметология, брови, массаж и другие направления.\n• Дальше он видит мастеров, карточки услуг, цены, свободные слоты и может оформить запись прямо в приложении.\n• Мастер получает заявку, управляет расписанием, услугами, профилем и клиентами в личном кабинете.\n\nЧто показывает сервис\n• Каталог услуг и категорий\n• Карточки мастеров и студий\n• Свободные даты и время\n• Онлайн-запись на услугу\n• Статус записи\n• Напоминания пользователю\n• Историю записей\n• Личный кабинет мастера\n\nБезопасность и позиционирование\nSlotty не заменяет мастера и не вмешивается в услугу. Сервис помогает удобно соединить клиента и специалиста, упростить запись и убрать хаос из переписок. Авторизация может работать через Telegram, Google и другие способы входа, чтобы пользователю было удобно зайти с любого устройства.\n\nЧто сделали в проекте\n• Продумали структуру сервиса для клиентов и мастеров\n• Собрали пользовательский путь от выбора услуги до записи\n• Разработали каталог категорий, услуг и мастеров\n• Сделали личный кабинет мастера\n• Реализовали запись на свободное время\n• Добавили основу для напоминаний и управления заявками\n• Подготовили продукт к развитию в полноценный marketplace\n\nРезультат\nSlotty показывает, как локальный сервис записи может стать полноценным продуктом для мастеров, студий и клиентов. Пользователь быстро находит услугу и записывается, а мастер получает удобный инструмент для управления своим временем, услугами и клиентами.\n",
      detailsEn: "Format: SaaS / marketplace / online booking service\n\nDomain\n• slotty.of.by/book\n\nStatus\n• Live\n\nGoal\n• Help users quickly find the right master or studio, pick a service, see open time slots and book online — without calls, endless chats or extra steps.\n\nHow it works\n• The user picks a service category: nails, hair, skincare, brows, massage and more.\n• They browse masters, service cards, prices and open slots, then book in the app.\n• The master receives the request and manages schedule, services, profile and clients in a personal dashboard.\n\nWhat the service shows\n• Service and category catalog\n• Master and studio cards\n• Available dates and times\n• Online booking for a service\n• Booking status\n• User reminders\n• Visit history\n• Master dashboard\n\nSafety and positioning\nSlotty does not replace the master or interfere with the service itself. It connects client and specialist, simplifies booking and removes chaos from messaging. Sign-in can work via Telegram, Google and other methods so users can access the product from any device.\n\nWhat we delivered\n• Service structure for clients and masters\n• User journey from service pick to confirmed booking\n• Category, service and master catalog\n• Master personal area\n• Booking for open time slots\n• Foundation for reminders and request management\n• Product groundwork to grow into a full marketplace\n\nOutcome\nSlotty shows how a local booking service can become a full product for masters, studios and clients. Users find a service and book fast; masters get a practical tool to manage time, services and clients.\n",
      domain: SLOTTY_DOMAIN,
      status: "live",
      tags: ["Marketplace", "Booking", "Beauty", "SaaS", "Mobile App"],
      cover: "/images/project-priew/slotty.webp",
      gallery: SLOTTY_GALLERY,
      outcomes: [
        isRu ? "Онлайн-запись к мастерам без лишних переписок" : "Online booking for masters without endless messaging",
        isRu ? "Каталог услуг, мастеров и свободного времени в одном месте" : "Services, masters and open slots in one place",
        isRu ? "Удобный кабинет для мастера и клиента" : "Convenient areas for master and client",
        isRu ? "Быстрый путь от выбора услуги до подтверждённой записи" : "Fast path from service pick to confirmed booking"
      ],
      stack: [
        "React",
        "TypeScript",
        "Node.js",
        "Supabase",
        "Telegram Auth",
        "Google Auth",
        "Calendar",
        "Notifications"
      ]
    },
    // 8) SPLITON — финтех-платформа для музыкальных активов
    {
      id: "spliton",
      title: "Spliton",
      subtitleRu: "Финтех-платформа для музыкальных активов: каталог релизов, покупка долей, вторичный рынок, кошелёк, выплаты, юридические согласия и админ-панель.",
      subtitleEn: "Fintech platform for music assets: release catalog, share purchases, secondary market, wallet, payouts, legal consents and admin panel.",
      detailsRu: "Срок: 8–12 недель\n\nДомен\n• spliton.io/app\n\nСтатус\n• В продакшене\n\nЦель\n• Создать сложную финтех-платформу для инвестирования в музыкальные активы, где пользователь может просматривать каталог релизов, покупать доли, отслеживать баланс, участвовать во вторичном рынке и получать выплаты.\n• Проект требовал не просто интерфейс, а полноценную продуктовую систему: пользовательскую часть, финансовые сценарии, юридические согласия, админку, статусы, роли, безопасность, локализацию и проверку бизнес-логики.\n\nЧто сделали\n• Сформировали продуктовую структуру: публичные страницы, авторизация, личный кабинет, каталог активов, покупка, кошелёк, вывод, вторичный рынок, профиль, согласия, новости, поддержка и админ-панель.\n• Разработали каталог релизов с карточками, финансовыми параметрами, доступностью и переходом к покупке.\n• Реализовали сценарий покупки долей: доступно, недоступно, требуется согласие, ошибка, подтверждение, обработка и результат.\n• Собрали кошелёк и финансовые экраны: баланс, история, депозит, вывод и понятные состояния операций.\n• Разработали вторичный рынок: фильтры, сортировка, статусы, поиск, покупка, продажа, ордера и серверные фильтры.\n• Продумали юридические consent-flow для критических финансовых действий.\n• Создали админ-панель: финансы, новости, документы, реквизиты, статусы, проверки и история изменений.\n• Реализовали модуль юридических документов: версии, активные редакции, статусы и фиксация согласий пользователя.\n• Проработали модуль платёжных реквизитов: пул, предпросмотр, история, мультиязычные тексты и API для депозита.\n• Подключили локализацию RU / EN / ES / PT: статусы, ошибки, кнопки и пустые состояния без жёстко прошитых строк.\n• Улучшили UI/UX финансовых сценариев: confirm → processing → result.\n• Оптимизировали производительность: lazy-блоки, словари, маршруты и поведение в dev/prod.\n• Провели аудит бизнес-логики: покупка, продажа, listing, вывод, согласия, роли, статусы и краевые случаи.\n• Провели техническую стабилизацию: e2e, i18n gate, consent-flow, мобильные слои и throttling.\n\nОсобенности\nSpliton — один из самых объёмных типов проектов: маркетплейс, финансы, личный кабинет, админ-панель, юридическая логика, локализация, вторичный рынок и множество состояний. Главная сложность — связать дизайн, бизнес-логику, роли, API, базу данных, безопасность и реальные сценарии пользователя в одну стабильную систему.\n\nПример сценария\nПользователь заходит на платформу, проходит авторизацию, открывает каталог музыкальных активов, выбирает релиз, смотрит параметры, принимает необходимые юридические условия и покупает доли. После покупки актив появляется в кабинете. Пользователь следит за балансом, историей операций и выплатами, а при необходимости выставляет доли на вторичный рынок. Администратор управляет документами, новостями, реквизитами, статусами и финансовыми разделами через админ-панель.\n",
      detailsEn: "Timeline: 8–12 weeks\n\nDomain\n• spliton.io/app\n\nStatus\n• Live\n\nGoal\n• Build a fintech platform for investing in music assets: catalog, share purchases, balance tracking, secondary market and payouts.\n• Deliver a full product system — not just UI: user area, finance flows, legal consents, admin, roles, security, i18n and business-logic validation.\n\nWhat we delivered\n• Product structure: public pages, auth, user dashboard, asset catalog, purchase, wallet, withdrawals, secondary market, profile, consents, news, support and admin.\n• Release catalog with cards, financial parameters and purchase paths.\n• Share purchase flow with all critical states and consent gates.\n• Wallet and finance screens with clear operation states.\n• Secondary market with server-side filters, orders and statuses.\n• Legal consent flows for critical financial actions.\n• Admin panel for finance, news, documents, requisites and audits.\n• Legal documents module with versions and user acceptance tracking.\n• Payment requisites module for deposit scenarios.\n• Localization RU / EN / ES / PT across UI and errors.\n• Performance and navigation improvements; e2e and business-logic stabilization.\n\nHighlights\nSpliton combines marketplace, finance, user dashboard, admin, legal logic, i18n and secondary market in one high-complexity product.\n\nExample flow\nA user signs in, browses the catalog, reviews a release, accepts required legal terms, buys shares and tracks balance, payouts and secondary listings. Admins manage documents, news, requisites and platform status.\n",
      domain: SPLITON_DOMAIN,
      status: "live",
      tags: [
        "FinTech",
        "Marketplace",
        "SaaS",
        "MusicTech",
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "UI/UX",
        "Admin Panel",
        "Compliance"
      ],
      cover: "/images/project-priew/spliton.webp",
      gallery: SPLITON_GALLERY,
      outcomes: [
        isRu ? "Полноценная финтех-платформа для музыкальных активов" : "Full fintech platform for music assets",
        isRu ? "Каталог релизов и сценарий покупки долей" : "Release catalog and share purchase flow",
        isRu ? "Вторичный рынок с фильтрами, ордерами и статусами" : "Secondary market with filters, orders and statuses",
        isRu ? "Кошелёк, баланс, депозит и вывод средств" : "Wallet, balance, deposit and withdrawal flows",
        isRu ? "Юридические согласия и админ-панель" : "Legal consents and admin panel",
        isRu ? "Мультиязычный интерфейс RU / EN / ES / PT" : "Multilingual UI RU / EN / ES / PT",
        isRu ? "Платформа запущена и доступна в продакшене" : "Platform is live in production"
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind",
        "NestJS",
        "PostgreSQL",
        "Supabase",
        "Prisma",
        "Playwright",
        "i18n"
      ]
    }
  ];
}
function buildProjects(isRu) {
  const all = buildAllProjects(isRu);
  return PUBLIC_PROJECT_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p) => Boolean(p)
  );
}
function findProjectBySlug(slug, isRu) {
  if (!slug) return void 0;
  return buildProjects(isRu).find((p) => p.id === slug);
}
function clamp01$2(v) {
  return Math.min(1, Math.max(0, v));
}
function useCaseCoverPan(blockRef) {
  const [coverX, setCoverX] = useState(36);
  useEffect(() => {
    const el = blockRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height + vh * 0.35);
      const scrolled = vh * 0.82 - rect.top;
      const progress = clamp01$2(scrolled / total);
      const wide = window.innerWidth >= 1024;
      const start = wide ? 38 : 30;
      const end = wide ? 74 : 58;
      const target = reduced ? wide ? 58 : 46 : start + (end - start) * progress;
      setCoverX(target);
    };
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [blockRef]);
  return coverX;
}
function CasesSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const isRu = lang === "ru";
  const [activeTab, setActiveTab] = useState("view");
  const caseBlockRef = useRef(null);
  const coverX = useCaseCoverPan(caseBlockRef);
  const spliton = buildProjects(isRu).find((p) => p.id === "spliton");
  if (!spliton) return null;
  const subtitle = isRu ? spliton.subtitleRu : spliton.subtitleEn;
  const caseTabs = useMemo(() => {
    const tabs = [
      {
        id: "view",
        label: copy.cases.viewCase,
        to: `/projects/${spliton.id}`
      }
    ];
    if (spliton.domain) {
      tabs.push({
        id: "product",
        label: copy.cases.openProduct,
        href: spliton.domain
      });
    }
    tabs.push({
      id: "cta",
      label: copy.cases.cta,
      href: TG_BOT_URL
    });
    return tabs;
  }, [copy.cases.cta, copy.cases.openProduct, copy.cases.viewCase, spliton.domain, spliton.id]);
  return /* @__PURE__ */ jsx(Section, { id: "cases", className: "scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Reveal, { className: "case-split", children: [
    /* @__PURE__ */ jsxs("div", { className: "case-split__visual", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: spliton.cover ?? "/images/project-priew/spliton.webp",
          alt: spliton.title,
          loading: "lazy",
          decoding: "async",
          className: "case-split__img",
          style: { objectPosition: `${coverX}% 58%` }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "case-split__visual-overlay", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: caseBlockRef, className: "case-split__grid", children: [
      /* @__PURE__ */ jsx("div", { className: "case-split__visual-gap", "aria-hidden": true }),
      /* @__PURE__ */ jsxs("div", { className: "case-split__content", children: [
        /* @__PURE__ */ jsx("span", { className: "case-split__badge", children: copy.cases.badge }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 font-hero text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white", children: spliton.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-[14px] leading-relaxed text-white/48 sm:text-[15px]", children: subtitle }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3 text-[13.5px] leading-relaxed text-white/62", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-white/78", children: isRu ? "Задача:" : "Need:" }),
            " ",
            copy.cases.spliton.need
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-white/78", children: isRu ? "Сделали:" : "Built:" }),
            " ",
            copy.cases.spliton.done
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "case-split__chips mt-5 flex flex-wrap gap-2", children: copy.cases.spliton.modules.map((m) => /* @__PURE__ */ jsx("span", { className: "case-split__chip", children: m }, m)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "case-split__tabs", children: /* @__PURE__ */ jsx(
      PillActionBar,
      {
        items: caseTabs,
        activeId: activeTab,
        onActiveChange: setActiveTab,
        className: "case-split__tab-bar",
        ariaLabel: isRu ? "Действия с кейсом" : "Case actions"
      }
    ) })
  ] }) }) });
}
const ORANGE_DIM = [0.12, 0.04, 0.01];
const ORANGE_BASE = [0.2, 0.07, 0.01];
const ORANGE_ARC = [1, 0.52, 0.18];
const THETA = 0.18;
const PHI_SPEED = 85e-5;
const MARKER_ELEVATION = 0.06;
const MAX_RENDER_SIDE = 720;
const PIN_COLORS = {
  masters: [1, 0.52, 0.18],
  studios: [1, 0.38, 0.22],
  autoservice: [1, 0.68, 0.12],
  schools: [1, 0.45, 0.55],
  startups: [1, 0.32, 0.08],
  agencies: [1, 0.58, 0.32]
};
const ARCS = [
  { from: [55.75, 37.62], to: [51.5, -0.12] },
  { from: [40.71, -74.01], to: [25.2, 55.27] },
  { from: [1.35, 103.82], to: [48.85, 2.35] }
];
function GlobeFallback() {
  return /* @__PURE__ */ jsx("div", { className: "tivonix-globe-fallback", "aria-hidden": true, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 400 400", className: "tivonix-globe-fallback__svg", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: "tivonix-globe-dots", width: "10", height: "10", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx("circle", { cx: "5", cy: "5", r: "1.1", fill: "rgba(255,122,26,0.72)" }) }) }),
    /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "132", fill: "rgba(8,4,0,0.94)" }),
    /* @__PURE__ */ jsx("circle", { cx: "200", cy: "200", r: "132", fill: "url(#tivonix-globe-dots)", opacity: "0.9" })
  ] }) });
}
function prefersGlobeFallback() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const probe = document.createElement("canvas");
  const gl = probe.getContext("webgl") ?? probe.getContext("webgl2");
  return !gl;
}
function renderSize(rect) {
  const layoutW = Math.max(1, rect.width);
  const layoutH = Math.max(1, rect.height);
  const scale = Math.min(1, MAX_RENDER_SIDE / Math.max(layoutW, layoutH));
  return {
    width: Math.max(1, Math.round(layoutW * scale)),
    height: Math.max(1, Math.round(layoutH * scale))
  };
}
function TivonixGlobeCanvas({ pins }) {
  const wrapRef = useRef(null);
  const hostRef = useRef(null);
  const pinsRef = useRef(pins);
  const [fallback] = useState(prefersGlobeFallback);
  const pinsKey = useMemo(
    () => pins.map((pin) => `${pin.id}:${pin.lat}:${pin.lng}`).join("|"),
    [pins]
  );
  pinsRef.current = pins;
  useLayoutEffect(() => {
    if (fallback || typeof window === "undefined") return;
    const wrap = wrapRef.current;
    const host = hostRef.current;
    if (!wrap || !host) return;
    const canvas = document.createElement("canvas");
    canvas.className = "tivonix-globe-canvas";
    canvas.setAttribute("aria-hidden", "true");
    host.replaceChildren(canvas);
    let width = 0;
    let height = 0;
    let phi = 0.9;
    let frame = 0;
    let visible = true;
    let globe = null;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);
    const buildMarkers = () => pinsRef.current.map((pin) => ({
      location: [pin.lat, pin.lng],
      size: 0.05,
      color: PIN_COLORS[pin.id] ?? ORANGE_ARC
    }));
    const buildOptions = (w, h) => ({
      devicePixelRatio: dpr,
      width: w,
      height: h,
      phi,
      theta: THETA,
      dark: 1,
      diffuse: 1.22,
      mapSamples: 1e4,
      mapBrightness: window.innerWidth < 640 ? 13.5 : 11,
      mapBaseBrightness: 0.015,
      baseColor: ORANGE_BASE,
      markerColor: ORANGE_ARC,
      glowColor: ORANGE_DIM,
      markers: buildMarkers(),
      arcs: ARCS,
      arcColor: ORANGE_ARC,
      arcWidth: 0.4,
      arcHeight: 0.18,
      markerElevation: MARKER_ELEVATION,
      scale: 1,
      offset: [0, 0]
    });
    const resize = () => {
      const { width: nextW, height: nextH } = renderSize(wrap.getBoundingClientRect());
      if (nextW === width && nextH === height) return;
      width = nextW;
      height = nextH;
      if (globe) {
        globe.update(buildOptions(width, height));
        return;
      }
      globe = createGlobe(canvas, buildOptions(width, height));
    };
    const render2 = () => {
      if (visible) {
        phi += PHI_SPEED;
        globe?.update({ phi });
      }
      frame = requestAnimationFrame(render2);
    };
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.01, rootMargin: "64px" }
    );
    io.observe(wrap);
    resize();
    frame = requestAnimationFrame(render2);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      globe?.destroy();
      host.replaceChildren();
    };
  }, [fallback, pinsKey]);
  if (fallback) {
    return /* @__PURE__ */ jsx(GlobeFallback, {});
  }
  return /* @__PURE__ */ jsx("div", { ref: wrapRef, className: "tivonix-globe-canvas-wrap", children: /* @__PURE__ */ jsx("div", { ref: hostRef, className: "tivonix-globe-cobe-host", "aria-hidden": true }) });
}
const COPIES = 4;
function AudienceMarquee({ items }) {
  if (!items.length) return null;
  const sequence = Array.from(
    { length: COPIES },
    (_, copyIndex) => items.map((item, itemIndex) => ({
      id: `${copyIndex}-${itemIndex}`,
      label: item
    }))
  ).flat();
  return /* @__PURE__ */ jsx("div", { className: "tivonix-audience__marquee", "aria-hidden": true, children: /* @__PURE__ */ jsx("div", { className: "tivonix-audience__marquee-track", children: sequence.map(({ id, label }) => /* @__PURE__ */ jsxs("span", { className: "tivonix-audience__marquee-item", children: [
    /* @__PURE__ */ jsx("span", { className: "tivonix-audience__marquee-text", children: label }),
    /* @__PURE__ */ jsx("span", { className: "tivonix-audience__marquee-sep", children: "·" })
  ] }, id)) }) });
}
const PILLAR_ICONS = [Globe2, MapPin, Maximize2];
function TivonixAudienceSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "audience",
      className: "tivonix-audience scroll-mt-[var(--tivonix-header-spacer)] bg-black !py-0",
      children: /* @__PURE__ */ jsxs("div", { className: "tivonix-audience__frame", children: [
        /* @__PURE__ */ jsxs(Container, { className: "relative z-[1] pt-14 sm:pt-16 lg:pt-20", children: [
          /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("header", { className: "tivonix-audience__head", children: [
            /* @__PURE__ */ jsx("h2", { className: "tivonix-audience__title", children: copy.audience.title }),
            /* @__PURE__ */ jsx("p", { className: "tivonix-audience__subtitle", children: copy.audience.subtitle })
          ] }) }),
          /* @__PURE__ */ jsx(Reveal, { delay: 80, children: /* @__PURE__ */ jsx("div", { className: "tivonix-audience__hero", children: /* @__PURE__ */ jsx("div", { className: "tivonix-audience__globe-clip", children: /* @__PURE__ */ jsx("div", { className: "tivonix-audience__globe-inner", children: /* @__PURE__ */ jsx(TivonixGlobeCanvas, { pins: copy.audience.pins }) }) }) }) })
        ] }),
        /* @__PURE__ */ jsx(Reveal, { delay: 100, children: /* @__PURE__ */ jsx(AudienceMarquee, { items: copy.audience.marquee }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsx("div", { className: "tivonix-audience__pillars-wrap", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "tivonix-audience__pillars", children: copy.audience.pillars.map((pillar, index) => {
          const Icon2 = PILLAR_ICONS[index] ?? Globe2;
          return /* @__PURE__ */ jsxs("article", { className: "tivonix-audience__pillar", children: [
            /* @__PURE__ */ jsx(Icon2, { className: "tivonix-audience__pillar-icon", strokeWidth: 1.5, "aria-hidden": true }),
            /* @__PURE__ */ jsx("h3", { className: "tivonix-audience__pillar-title", children: pillar.title }),
            /* @__PURE__ */ jsx("p", { className: "tivonix-audience__pillar-text", children: pillar.text })
          ] }, pillar.title);
        }) }) }) }) })
      ] })
    }
  );
}
function smoothstep$1(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}
function typewriterLength(progress, length) {
  return Math.floor(smoothstep$1(progress) * length);
}
function ProcessBulletRow({
  label,
  state
}) {
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: [
        "flex items-center justify-between gap-3 rounded-lg bg-white/[0.05] px-3 py-2.5 transition-colors duration-300 ease-out",
        state === "hidden" ? "invisible" : "visible",
        state === "active" ? "bg-white/[0.08]" : ""
      ].join(" "),
      "aria-hidden": state === "hidden",
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-[12px] font-medium text-white/90", children: label }),
        /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center gap-1.5 text-[11px] text-[#FF5722]/90", children: state === "active" ? /* @__PURE__ */ jsx(Loader2, { size: 11, className: "animate-spin text-[#FF5722]/90", "aria-hidden": true }) : /* @__PURE__ */ jsx(
          Check,
          {
            size: 11,
            className: state === "done" ? "text-[#FF5722]/75" : "text-white/35",
            "aria-hidden": true
          }
        ) })
      ]
    }
  );
}
function ProcessStepStage({
  step,
  stepProgress,
  fade,
  reducedMotion
}) {
  const stageStyle = useMemo(() => {
    if (reducedMotion || fade <= 0 || fade >= 1) return void 0;
    return {
      opacity: 0.35 + fade * 0.65,
      transform: `translate3d(0, ${(1 - fade) * 12}px, 0)`
    };
  }, [fade, reducedMotion]);
  const typedQuery = useMemo(() => {
    if (step.kind !== "search") return "";
    if (reducedMotion) return step.query;
    return step.query.slice(0, typewriterLength(stepProgress, step.query.length));
  }, [reducedMotion, step, stepProgress]);
  const bulletStates = useMemo(() => {
    if (step.kind !== "bullets") return [];
    if (reducedMotion) {
      return step.items.map(
        (_, index) => index === step.items.length - 1 ? "active" : "done"
      );
    }
    const visibleBullets = Math.max(1, Math.ceil(smoothstep$1(stepProgress) * step.items.length));
    return step.items.map((_, index) => {
      if (index >= visibleBullets) return "hidden";
      if (index < visibleBullets - 1) return "done";
      return "active";
    });
  }, [reducedMotion, step, stepProgress]);
  return /* @__PURE__ */ jsxs("div", { className: "process-section__stage-inner", style: stageStyle, "aria-live": "polite", children: [
    step.kind === "bullets" ? /* @__PURE__ */ jsxs("article", { className: "w-full min-w-0 max-w-md overflow-hidden rounded-2xl bg-[#141414] p-5 text-left sm:p-6", children: [
      /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", children: step.items.map((item, index) => /* @__PURE__ */ jsx(ProcessBulletRow, { label: item, state: bulletStates[index] ?? "hidden" }, item)) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-5 font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]", children: step.title })
    ] }) : null,
    step.kind === "search" ? /* @__PURE__ */ jsxs("article", { className: "w-full min-w-0 max-w-md overflow-hidden rounded-2xl bg-[#141414] p-5 text-left sm:p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-[#262626] p-3 sm:p-3.5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 rounded-full bg-black/25 px-3 py-2.5 sm:px-3.5", children: [
        /* @__PURE__ */ jsx(
          Search,
          {
            className: "h-4 w-4 shrink-0 text-white/55",
            strokeWidth: 2.25,
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "min-w-0 flex-1 truncate text-left text-[12px] leading-snug text-white/88 sm:text-[13px]",
            "aria-hidden": true,
            children: [
              typedQuery,
              !reducedMotion && typedQuery.length < step.query.length ? /* @__PURE__ */ jsx("span", { className: "pain-cursor ml-0.5 inline-block text-[#FF9A3D]", children: "|" }) : null
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("h3", { className: "mt-5 font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]", children: step.title }),
      step.hint ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-[13px] leading-[1.6] text-white/48 sm:text-[14px]", children: step.hint }) : null
    ] }) : null
  ] });
}
const PROCESS_BG_MUTED = `/images/${encodeURI("как рабоает")}/${encodeURI("чер.webp")}`;
const PROCESS_BG_WARM = `/images/${encodeURI("как рабоает")}/${encodeURI("яр.webp")}`;
const STEP_SCROLL_VH = 80;
const APPROACH_RUNWAY_VH = 32;
function sectionApproach(rectTop, viewport, headerSpacer) {
  return smoothstep((viewport * 0.88 - rectTop) / (viewport * 0.88 - headerSpacer));
}
function processShellExpand(rectTop, scrollInTrack, viewport, headerSpacer, scrollable, approachPx) {
  let expand = 0;
  if (rectTop < viewport * 0.92) {
    expand = sectionApproach(rectTop, viewport, headerSpacer);
  } else if (scrollInTrack > 0) {
    expand = 1;
  }
  const tailStart = scrollable - approachPx * 0.9;
  if (scrollInTrack > tailStart) {
    expand *= 1 - smoothstep((scrollInTrack - tailStart) / Math.max(1, approachPx * 0.9));
  }
  return expand;
}
function clamp01$1(v) {
  return Math.min(1, Math.max(0, v));
}
function stepSegmentPhase(segment) {
  const introEnd = 0.1;
  const animEnd = 0.72;
  const holdEnd = 0.9;
  if (segment < introEnd) {
    return {
      fade: smoothstep(segment / introEnd),
      localProgress: 0
    };
  }
  if (segment < animEnd) {
    return {
      fade: 1,
      localProgress: smoothstep((segment - introEnd) / (animEnd - introEnd))
    };
  }
  if (segment < holdEnd) {
    return {
      fade: 1,
      localProgress: 1
    };
  }
  return {
    fade: 1,
    localProgress: 1
  };
}
function smoothstep(t) {
  const x = clamp01$1(t);
  return x * x * (3 - 2 * x);
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}
function ProcessTimelineSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const steps = copy.process.steps;
  const stepCount = steps.length;
  const pinWrapRef = useRef(null);
  const sectionRef = useRef(null);
  const warmBgRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [stepFade, setStepFade] = useState(1);
  const reducedMotion = usePrefersReducedMotion();
  const pinHeightVh = 100 + Math.max(0, stepCount - 1) * STEP_SCROLL_VH;
  const totalHeightVh = APPROACH_RUNWAY_VH + pinHeightVh;
  const tabs = useMemo(
    () => steps.map((_, index) => ({
      id: `step-${index}`,
      label: String(index + 1)
    })),
    [steps]
  );
  const scrollToStep = useCallback(
    (index) => {
      const track = pinWrapRef.current;
      if (!track || typeof window === "undefined") return;
      const trackTop = window.scrollY + track.getBoundingClientRect().top;
      const approachPx = APPROACH_RUNWAY_VH / 100 * window.innerHeight;
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const pinScrollable = Math.max(1, scrollable - approachPx);
      const targetProgress = (index + 0.78) / stepCount;
      window.scrollTo({
        top: trackTop + approachPx + targetProgress * pinScrollable,
        behavior: reducedMotion ? "auto" : "smooth"
      });
    },
    [reducedMotion, stepCount]
  );
  useEffect(() => {
    const track = pinWrapRef.current;
    if (!track || typeof window === "undefined") return;
    let raf = 0;
    let trackTop = 0;
    let scrollable = 1;
    let approachPx = 1;
    let pinScrollable = 1;
    let headerSpacer = 92;
    let lastStep = -1;
    let lastExpand = -1;
    const measure = () => {
      trackTop = window.scrollY + track.getBoundingClientRect().top;
      scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      approachPx = APPROACH_RUNWAY_VH / 100 * window.innerHeight;
      pinScrollable = Math.max(1, scrollable - approachPx);
      headerSpacer = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--tivonix-header-spacer")
      ) || 92;
    };
    const apply = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const scrollInTrack = scrollY - trackTop;
      const rectTop = sectionRef.current?.getBoundingClientRect().top ?? trackTop - scrollY;
      const expand = reducedMotion ? 1 : processShellExpand(
        rectTop,
        scrollInTrack,
        viewport,
        headerSpacer,
        scrollable,
        approachPx
      );
      const pinScroll = Math.max(0, scrollInTrack - approachPx);
      const progress = reducedMotion ? 1 : clamp01$1(pinScroll / pinScrollable);
      const stepIndex = Math.min(stepCount - 1, Math.floor(progress * stepCount));
      const segment = progress * stepCount - stepIndex;
      const isMobile = window.innerWidth < 1024;
      if (expand !== lastExpand) {
        lastExpand = expand;
        track.style.setProperty("--process-expand", String(expand));
      }
      const warmOpacity = isMobile ? smoothstep((stepIndex + 0.55) / stepCount) : smoothstep(progress);
      const { fade, localProgress } = reducedMotion ? { fade: 1, localProgress: 1 } : stepSegmentPhase(segment);
      if (stepIndex !== lastStep) {
        lastStep = stepIndex;
        setActiveStep(stepIndex);
      }
      setStepProgress(localProgress);
      setStepFade(fade);
      if (warmBgRef.current) {
        warmBgRef.current.style.opacity = String(warmOpacity);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, stepCount]);
  const currentStep = steps[activeStep];
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: pinWrapRef,
      className: "process-pin scroll-mt-[var(--tivonix-header-spacer)]",
      style: {
        height: `${totalHeightVh}vh`,
        ["--process-expand"]: "0"
      },
      children: /* @__PURE__ */ jsx(
        "section",
        {
          ref: sectionRef,
          id: "process",
          className: "process-section sticky top-0 z-30 flex h-[100svh] flex-col",
          "aria-label": copy.process.title,
          children: /* @__PURE__ */ jsx("div", { className: "process-section-shell flex min-h-0 flex-1 flex-col", children: /* @__PURE__ */ jsxs("div", { className: "process-section__frame flex min-h-0 flex-1 flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "process-section__bg process-section__bg--muted",
                style: { backgroundImage: `url("${PROCESS_BG_MUTED}")` },
                "aria-hidden": true
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: warmBgRef,
                className: "process-section__bg process-section__bg--warm",
                style: { backgroundImage: `url("${PROCESS_BG_WARM}")`, opacity: 0 },
                "aria-hidden": true
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "process-section__bg-fade", "aria-hidden": true }),
            /* @__PURE__ */ jsxs(Container, { className: "process-section__container relative z-10 flex min-h-0 flex-1 flex-col", children: [
              /* @__PURE__ */ jsx("header", { className: "process-section__head", children: /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.85rem,4.2vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white", children: copy.process.title }) }),
              /* @__PURE__ */ jsx("div", { className: "process-section__stage", children: currentStep ? /* @__PURE__ */ jsx(
                ProcessStepStage,
                {
                  step: currentStep,
                  stepProgress,
                  fade: stepFade,
                  reducedMotion
                },
                activeStep
              ) : null }),
              /* @__PURE__ */ jsx("div", { className: "process-section__tabs-wrap", children: /* @__PURE__ */ jsx(
                PillActionBar,
                {
                  items: tabs,
                  activeId: `step-${activeStep}`,
                  onActiveChange: (id) => {
                    const index = Number(id.replace("step-", ""));
                    if (!Number.isNaN(index)) scrollToStep(index);
                  },
                  ariaLabel: copy.process.title,
                  className: "process-section__tabs"
                }
              ) })
            ] })
          ] }) })
        }
      )
    }
  );
}
const LOGO_ICON = "/images/tivonix-logo-icon.webp";
const PAGE_SIZE = 6;
const ORANGE$1 = "#FF9A3D";
const PRIMARY_CATS = ["start", "price", "process", "dev", "support"];
const SECONDARY_CATS = [];
const s$2 = (v) => v;
const CAT_LABELS = {
  start: { ru: "Старт", en: "Start" },
  price: { ru: "Стоимость", en: "Pricing" },
  time: { ru: "Сроки", en: "Timeline" },
  process: { ru: "Процесс", en: "Process" },
  design: { ru: "Дизайн", en: "Design" },
  dev: { ru: "Разработка", en: "Development" },
  content: { ru: "Контент", en: "Content" },
  seo: { ru: "SEO", en: "SEO" },
  tech: { ru: "Тех.часть", en: "Tech" },
  support: { ru: "Поддержка", en: "Support" },
  fix: { ru: "Правки", en: "Edits" }
};
const TEASER_TEXTS = {
  start: {
    ru: "Можно начать без ТЗ — просто опишите задачу своими словами.",
    en: "You can start without a brief — just describe the task in your own words."
  },
  price: {
    ru: "Стоимость зависит от задачи — после разбора предложим вариант.",
    en: "Cost depends on the task — after a review we'll suggest an option."
  },
  time: {
    ru: "Сроки зависят от объёма и согласований.",
    en: "Timeline depends on scope and approvals."
  },
  process: {
    ru: "Делаем не только сайты — боты, CRM, кабинеты, автоматизацию.",
    en: "We don't only build websites — bots, CRM, client areas, automation."
  },
  design: {
    ru: "Дизайн под ваш бренд и задачу.",
    en: "Design aligned with your brand and task."
  },
  dev: {
    ru: "Telegram, email, CRM, таблицы — подключаем под ваш процесс.",
    en: "Telegram, email, CRM, sheets — wired to your workflow."
  },
  content: {
    ru: "Поможем собрать тексты и структуру, если нужно.",
    en: "We can help with copy and structure if needed."
  },
  seo: {
    ru: "Базовая SEO-разметка на уровне лендинга.",
    en: "Basic SEO markup at the landing level."
  },
  tech: {
    ru: "Адаптив, скорость и техчасть проекта.",
    en: "Responsive layout, speed and the tech side."
  },
  support: {
    ru: "После запуска можно проверить работу и дорастить продукт.",
    en: "After launch we can verify everything and grow the product."
  },
  fix: {
    ru: "Мелкие правки после запуска — обсуждаем отдельно.",
    en: "Small edits after launch — we discuss them separately."
  }
};
const FAQ_ITEMS = [
  {
    id: "start-unclear",
    cat: "start",
    q: {
      ru: "С чего начать, если я не понимаю, что именно мне нужно?",
      en: "Where do I start if I'm not sure what I need?"
    },
    a: {
      ru: "Можно просто описать задачу своими словами. Мы разберёмся, что лучше подойдёт: сайт, бот, CRM, личный кабинет или простая автоматизация.",
      en: "Just describe the task in your own words. We'll figure out what fits best: a website, bot, CRM, client area or simple automation."
    }
  },
  {
    id: "process-not-only-sites",
    cat: "process",
    q: { ru: "Вы делаете только сайты?", en: "Do you only build websites?" },
    a: {
      ru: "Нет. Мы делаем сайты, Telegram-ботов, CRM, админ-панели, личные кабинеты, интеграции и веб-сервисы под конкретную задачу бизнеса.",
      en: "No. We build websites, Telegram bots, CRMs, admin panels, client areas, integrations and web services for a specific business task."
    }
  },
  {
    id: "start-mvp",
    cat: "start",
    q: { ru: "Можно сделать небольшой проект, а не большую систему?", en: "Can we start small instead of a big system?" },
    a: {
      ru: "Да. Часто лучше начать с простой версии: форма заявки, бот, таблица, мини-CRM или лендинг. Потом это можно развивать.",
      en: "Yes. Often it's better to start simple: a lead form, bot, sheet, mini-CRM or landing page. You can grow it later."
    }
  },
  {
    id: "price-cost",
    cat: "price",
    q: { ru: "Сколько стоит проект?", en: "How much does a project cost?" },
    a: {
      ru: "Стоимость зависит от задачи, количества экранов, логики, интеграций и сроков. После короткого разбора мы предложим понятный вариант запуска.",
      en: "Cost depends on the task, number of screens, logic, integrations and timeline. After a short review we'll suggest a clear launch option."
    }
  },
  {
    id: "start-no-brief",
    cat: "start",
    q: { ru: "Нужно ли мне готовое техническое задание?", en: "Do I need a ready technical brief?" },
    a: {
      ru: "Нет. Если ТЗ нет, мы поможем собрать требования и объясним, что нужно сделать на первом этапе.",
      en: "No. If you don't have a brief, we'll help gather requirements and explain what to do at the first stage."
    }
  },
  {
    id: "dev-integrations",
    cat: "dev",
    q: {
      ru: "Можно подключить Telegram, email, CRM или таблицы?",
      en: "Can you connect Telegram, email, CRM or spreadsheets?"
    },
    a: {
      ru: "Да. Мы можем сделать так, чтобы заявки приходили в Telegram, email, CRM, Google Sheets, Supabase или другую систему, с которой работает команда.",
      en: "Yes. We can route leads to Telegram, email, CRM, Google Sheets, Supabase or another system your team already uses."
    }
  },
  {
    id: "support-after",
    cat: "support",
    q: { ru: "Вы помогаете после запуска?", en: "Do you help after launch?" },
    a: {
      ru: "Да. После запуска можно проверить работу, исправить мелкие моменты и дальше развивать продукт.",
      en: "Yes. After launch we can verify everything, fix small issues and keep growing the product."
    }
  },
  {
    id: "start-for-whom",
    cat: "start",
    q: { ru: "Для кого TIVONIX?", en: "Who is TIVONIX for?" },
    a: {
      ru: "Для бизнеса, которому нужен не просто красивый сайт, а рабочая система: заявки, записи, статусы, клиенты, оплата, кабинет или автоматизация.",
      en: "For businesses that need more than a pretty website — a working system: leads, bookings, statuses, clients, payments, client area or automation."
    }
  },
  {
    id: "time-launch",
    cat: "time",
    q: { ru: "Сколько занимает запуск?", en: "How long does launch take?" },
    a: {
      ru: "Простой лендинг или бот — обычно от нескольких дней до 2–4 недель. Полноценный сервис — дольше. Срок зависит от объёма, интеграций и скорости согласований.",
      en: "A simple landing or bot is usually a few days to 2–4 weeks. A full service takes longer. Timeline depends on scope, integrations and approval speed."
    }
  },
  {
    id: "start-domain",
    cat: "start",
    q: { ru: "Помогаете с доменом и запуском?", en: "Do you help with domain and launch?" },
    a: {
      ru: "Да. Поможем с доменом, хостингом, деплоем и базовой настройкой — чтобы продукт реально заработал.",
      en: "Yes. We help with domain, hosting, deploy and basic setup — so the product actually goes live."
    }
  }
];
function cx$6(...a) {
  return a.filter(Boolean).join(" ");
}
function Icon({ name }) {
  const common = "h-4 w-4 shrink-0";
  switch (name) {
    case "search":
      return /* @__PURE__ */ jsxs("svg", { className: common, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("path", { d: "M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z", stroke: "currentColor", strokeWidth: "1.8" }),
        /* @__PURE__ */ jsx("path", { d: "M16.2 16.2 21 21", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
      ] });
    case "copy":
      return /* @__PURE__ */ jsxs("svg", { className: common, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("path", { d: "M9 9h10v10H9V9Z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round"
          }
        )
      ] });
    case "chev":
      return /* @__PURE__ */ jsx("svg", { className: common, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "m8.5 10 3.5 3.5L15.5 10", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
  }
}
function toDomId(id) {
  return `faq-${id}`;
}
function buildFaqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a }
    }))
  };
}
function FAQSection() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const l = isRu ? "ru" : "en";
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [copied, setCopied] = useState(null);
  const [catFilter, setCatFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showAllCats, setShowAllCats] = useState(false);
  const rootRef = useRef(null);
  const localizedItems = useMemo(() => {
    return FAQ_ITEMS.map((item) => ({
      id: item.id,
      cat: item.cat,
      q: item.q[l],
      a: item.a[l],
      catLabel: CAT_LABELS[item.cat][l]
    }));
  }, [l]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = localizedItems;
    if (catFilter !== "all") list = list.filter((x) => x.cat === catFilter);
    if (!q) return list;
    return list.filter((x) => `${x.q} ${x.a} ${x.catLabel}`.toLowerCase().includes(q));
  }, [query, catFilter, localizedItems]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const showPagination = filtered.length > 0 && totalPages > 1;
  const compactResults = filtered.length <= 1;
  const items = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);
  useEffect(() => {
    setPage(1);
    setOpenId(null);
  }, [query, catFilter, l]);
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);
  const resetDisabled = query.trim() === "" && catFilter === "all" && page === 1;
  async function copy(text, id) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((v) => v === id ? null : v), 900);
    } catch {
    }
  }
  const title = isRu ? "Частые вопросы" : "FAQ";
  const placeholder = isRu ? "Поиск по вопросам…" : "Search questions…";
  const resetLabel = isRu ? "Сбросить" : "Reset";
  const allLabel = isRu ? "Все" : "All";
  const moreCatsLabel = isRu ? "Ещё" : "More";
  const lessCatsLabel = isRu ? "Свернуть" : "Less";
  const btnShow = isRu ? "Показать ответ" : "Show answer";
  const btnHide = isRu ? "Скрыть ответ" : "Hide answer";
  const btnCopy = isRu ? "Скопировать ответ" : "Copy answer";
  const btnCopied = isRu ? "Скопировано" : "Copied";
  const popularLabel = isRu ? "Частый вопрос" : "Popular";
  const prevLabel = isRu ? "Назад" : "Prev";
  const nextLabel = isRu ? "Дальше" : "Next";
  const pageLabel = isRu ? "Страница" : "Page";
  const jsonLd = useMemo(() => buildFaqJsonLd(localizedItems), [localizedItems]);
  return /* @__PURE__ */ jsxs(Section, { id: "faq", className: "faq-section relative isolate !py-0 bg-black", children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes faqAnswerIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-answer-open { animation: faqAnswerIn .20s ease-out; }
        /* Свёрнутый ответ: в DOM для SEO, визуально скрыт через max-height/opacity */
        .faq-answer-collapsed {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
          transition: max-height 0.25s ease, opacity 0.2s ease;
        }
        .faq-answer-expanded {
          max-height: 420px;
          opacity: 1;
          overflow: visible;
          transition: max-height 0.3s ease, opacity 0.2s ease;
        }

        /* mobile perf: меньше blur/тяжёлых эффектов */
        @media (max-width: 640px){
          .faq-card-bg{ backdrop-filter: blur(8px) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-answer-open{ animation: none; }
          .faq-answer-collapsed, .faq-answer-expanded{ transition: none; }
        }
      ` }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) } }),
    /* @__PURE__ */ jsxs(Container, { className: "faq-section__content relative z-[1] pt-16 sm:pt-20 pb-16 sm:pb-20", children: [
      /* @__PURE__ */ jsxs("div", { ref: rootRef, className: "relative mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-[30px] leading-[34px] sm:text-[40px] sm:leading-[44px] font-extrabold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]", children: title }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[720px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 sm:gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "faq-search-wrap relative", children: [
              /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "faq-search", children: placeholder }),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-3 top-1/2 z-[2] -translate-y-1/2", children: /* @__PURE__ */ jsx("span", { style: s$2({ color: ORANGE$1 }), children: /* @__PURE__ */ jsx(Icon, { name: "search" }) }) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "faq-search",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder,
                  inputMode: "search",
                  className: "faq-search-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: resetDisabled,
                onClick: () => {
                  setQuery("");
                  setOpenId(null);
                  setCatFilter("all");
                  setPage(1);
                  setShowAllCats(false);
                },
                "aria-disabled": resetDisabled,
                className: cx$6(
                  "h-11 shrink-0 whitespace-nowrap px-3.5 sm:h-12 sm:px-4 rounded-full border-0",
                  "bg-[#1c1c1f]",
                  resetDisabled ? "text-white/35 cursor-not-allowed opacity-70" : "text-white/80 hover:text-white hover:bg-[#262626] transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                ),
                children: resetLabel
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: cx$6(
                "flex items-center justify-start sm:justify-center gap-2",
                "overflow-x-auto sm:overflow-visible",
                "no-scrollbar py-1"
              ),
              role: "tablist",
              "aria-label": isRu ? "Категории вопросов" : "FAQ categories",
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    role: "tab",
                    "aria-selected": catFilter === "all",
                    "aria-pressed": catFilter === "all",
                    onClick: () => setCatFilter("all"),
                    className: cx$6(
                      "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-xs font-medium transition",
                      catFilter === "all" ? "bg-[#3a3a3d] text-white" : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                    ),
                    children: allLabel
                  }
                ),
                (showAllCats ? [...PRIMARY_CATS, ...SECONDARY_CATS] : PRIMARY_CATS).map((c) => {
                  const active = c === catFilter;
                  const label = CAT_LABELS[c][l];
                  return /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": active,
                      "aria-pressed": active,
                      onClick: () => setCatFilter(c),
                      className: cx$6(
                        "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-xs font-medium transition",
                        active ? "bg-[#3a3a3d] text-white" : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                      ),
                      children: label
                    },
                    c
                  );
                }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowAllCats((v) => !v),
                    className: cx$6(
                      "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-xs font-semibold transition",
                      "bg-[#1c1c1f] text-white/80 hover:bg-[#262626] hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                    ),
                    "aria-expanded": showAllCats,
                    "aria-label": showAllCats ? lessCatsLabel : moreCatsLabel,
                    children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                      showAllCats ? lessCatsLabel : moreCatsLabel,
                      /* @__PURE__ */ jsx("span", { className: cx$6("transition", showAllCats ? "rotate-180" : ""), children: /* @__PURE__ */ jsx(Icon, { name: "chev" }) })
                    ] })
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-[12px] text-white/68", children: filtered.length === 0 ? isRu ? "Ничего не найдено — попробуйте другой запрос." : "No results — try a different query." : isRu ? `Найдено: ${filtered.length}` : `Found: ${filtered.length}` })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cx$6(
            "mt-7 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            compactResults && "min-h-[18rem] sm:min-h-[20rem]"
          ),
          children: items.map((f) => {
            const isOpen = openId === f.id;
            const domId = toDomId(f.id);
            const teaser = TEASER_TEXTS[f.cat][l];
            return /* @__PURE__ */ jsx(
              "article",
              {
                className: cx$6(
                  "group relative overflow-hidden rounded-[20px]",
                  "border-0",
                  "bg-[#1c1c1f] faq-card-bg backdrop-blur-[10px]",
                  "shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                ),
                style: { contentVisibility: "auto", containIntrinsicSize: "360px 320px", contain: "layout paint style" },
                children: /* @__PURE__ */ jsxs("div", { className: "relative z-[2] p-5 flex flex-col", children: [
                  /* @__PURE__ */ jsx("header", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-[14px] font-semibold text-white/92 leading-snug", children: f.q }),
                    /* @__PURE__ */ jsx("div", { className: "mt-1 text-[12px] text-white/55", children: f.catLabel })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setOpenId((v) => v === f.id ? null : f.id),
                      "aria-expanded": isOpen,
                      "aria-controls": domId,
                      "aria-label": isOpen ? btnHide : `${btnShow}: ${f.q}`,
                      className: cx$6(
                        "w-full flex items-center gap-2 rounded-[12px]",
                        "border-0 bg-white/[0.07] px-3 py-2",
                        "text-left text-[12px] text-white/80 hover:bg-white/[0.10] transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      ),
                      children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: LOGO_ICON,
                            alt: "",
                            className: "h-4 w-4 object-contain",
                            draggable: false,
                            loading: "lazy",
                            decoding: "async"
                          }
                        ),
                        isOpen ? btnHide : btnShow
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      id: domId,
                      className: cx$6(
                        "mt-3 rounded-[14px] border-0 bg-black/45 px-4 py-3",
                        "text-[13px] leading-relaxed text-white/78",
                        isOpen ? "faq-answer-expanded faq-answer-open" : "faq-answer-collapsed"
                      ),
                      "aria-hidden": !isOpen,
                      children: [
                        f.a,
                        /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => copy(f.a, f.id),
                            className: cx$6(
                              "inline-flex items-center gap-2 rounded-[12px]",
                              "border-0 bg-white/[0.07] px-3 py-2",
                              "text-[12px] text-white/80 hover:bg-white/[0.10] transition",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                            ),
                            children: [
                              /* @__PURE__ */ jsx("span", { style: s$2({ color: ORANGE$1 }), children: /* @__PURE__ */ jsx(Icon, { name: "copy" }) }),
                              copied === f.id ? btnCopied : btnCopy
                            ]
                          }
                        ) })
                      ]
                    }
                  ),
                  !isOpen && /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "h-px w-full rounded-full bg-gradient-to-r from-white/0 via-white/18 to-white/0" }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between gap-2 text-[11.5px] text-white/62", children: [
                      /* @__PURE__ */ jsx("span", { className: "line-clamp-2", children: teaser }),
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 whitespace-nowrap", style: s$2({ color: ORANGE$1 }), children: [
                        /* @__PURE__ */ jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-current" }),
                        /* @__PURE__ */ jsx("span", { children: popularLabel })
                      ] })
                    ] })
                  ] })
                ] })
              },
              f.id
            );
          })
        }
      ),
      showPagination ? /* @__PURE__ */ jsx("div", { className: "relative mt-10 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[560px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 sm:hidden", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              disabled: page <= 1,
              className: cx$6(
                "h-11 px-4 rounded-[14px] border-0 bg-white/[0.06]",
                page <= 1 ? "text-white/35 cursor-not-allowed" : "text-white/80 hover:bg-white/[0.10]",
                "transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              ),
              children: prevLabel
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-[12.5px] text-white/70", children: [
            pageLabel,
            " ",
            page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
              disabled: page >= totalPages,
              className: cx$6(
                "h-11 px-4 rounded-[14px] border-0 bg-white/[0.06]",
                page >= totalPages ? "text-white/35 cursor-not-allowed" : "text-white/80 hover:bg-white/[0.10]",
                "transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              ),
              children: nextLabel
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex flex-wrap items-center justify-center gap-6", children: Array.from({ length: totalPages }).map((_, i) => {
          const n = i + 1;
          const active = n === page;
          const label = n < 10 ? `0${n}` : String(n);
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPage(n),
              "aria-current": active ? "page" : void 0,
              className: cx$6(
                "border-0 bg-transparent p-0 select-none",
                "text-[14px] font-semibold tabular-nums tracking-tight",
                "transition-colors duration-200",
                active ? "text-[#FF9840]" : "text-white/40 hover:text-white/70",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:rounded-sm"
              ),
              children: label
            },
            n
          );
        }) })
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "mt-10 sm:mt-12", "aria-hidden": "true" })
    ] })
  ] });
}
const FINAL_CTA_BG = `/images/${encodeURI("как рабоает")}/future.webp`;
function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}
function useSectionScrollScale(sectionRef) {
  const [scale, setScale] = useState(1.05);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1.08);
      return;
    }
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const progress = clamp01(scrolled / total);
      setScale(1.08 + progress * 0.44);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionRef]);
  return scale;
}
function FinalCTASection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const cardRef = useRef(null);
  const bgScale = useSectionScrollScale(cardRef);
  const bgStyle = {
    transform: `translate3d(-50%, -50%, 0) scale(${bgScale})`
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Section,
    {
      id: "contact",
      className: "final-cta-section scroll-mt-[var(--tivonix-header-spacer)] py-14 sm:py-16 lg:py-20",
      children: /* @__PURE__ */ jsx(Container, { className: "pb-2 sm:pb-4 lg:pb-6", children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: cardRef,
          className: "final-cta-card relative overflow-hidden rounded-[28px] px-6 py-12 text-center sm:rounded-[32px] sm:px-10 sm:py-14 lg:px-16 lg:py-16",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "final-cta-card__bg", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: FINAL_CTA_BG,
                  alt: "",
                  className: "final-cta-card__bg-img",
                  style: bgStyle,
                  loading: "lazy",
                  decoding: "async",
                  draggable: false
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "final-cta-card__bg-overlay" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "relative z-[1] mx-auto max-w-[20ch] font-hero text-[clamp(1.75rem,4.5vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white text-balance", children: copy.finalCta.title }),
            /* @__PURE__ */ jsxs("div", { className: "final-cta-card__actions relative z-[1] mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "projects-cta-glow final-cta-glow w-full max-w-[280px] sm:w-auto sm:min-w-[220px]", children: /* @__PURE__ */ jsx(
                TelegramLink,
                {
                  variant: "white",
                  size: "lg",
                  href: TG_BOT_URL,
                  className: "projects-cta-glow__btn final-cta-glow__btn w-full",
                  children: copy.finalCta.ctaPrimary
                }
              ) }),
              /* @__PURE__ */ jsx(
                TelegramLink,
                {
                  variant: "white",
                  size: "lg",
                  href: TG_CHANNEL_URL,
                  className: "final-cta-btn final-cta-btn--secondary w-full max-w-[280px] sm:w-auto sm:min-w-[220px]",
                  children: copy.finalCta.ctaSecondary
                }
              )
            ] })
          ]
        }
      ) })
    }
  ) });
}
function cx$5(...a) {
  return a.filter(Boolean).join(" ");
}
const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.webp";
const FOOTER_BG = `/images/${encodeURI("как рабоает")}/${encodeURI("футер.webp")}`;
const ACCENT = "#FF6B2C";
const FOOTER_PAGES = [
  { to: "/", label: { ru: "Главная", en: "Home" } },
  { to: "/plans", label: { ru: "Тарифы", en: "Pricing" } },
  { to: "/avtomatizaciya-biznesa", label: { ru: "Автоматизация", en: "Automation" } },
  { to: "/sozdanie-sajtov", label: { ru: "Создание сайтов", en: "Website development" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } }
];
const FOOTER_HOME = [
  { to: "/#pain", label: { ru: "Почему теряются заявки", en: "Why leads get lost" } },
  { to: "/#offer", label: { ru: "Что мы делаем", en: "What we build" } },
  { to: "/#ai", label: { ru: "AI в продуктах", en: "AI in products" } },
  { to: "/#compare", label: { ru: "Как работает система", en: "How the system works" } },
  { to: "/#cases", label: { ru: "Проекты", en: "Projects" } },
  { to: "/#audience", label: { ru: "Кому помогаем", en: "Who we help" } },
  { to: "/#process", label: { ru: "Как проходит работа", en: "How we work" } },
  { to: "/#faq", label: { ru: "Частые вопросы", en: "FAQ" } }
];
const FOOTER_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tivoonix@gmail.com")}&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;
const FOOTER_CONNECT = [
  { href: TG_CHANNEL_URL, label: "Telegram" },
  { href: "https://www.instagram.com/tivonix.tech/", label: "Instagram" },
  { href: FOOTER_GMAIL_URL, label: "Gmail" }
];
const DOCS = {
  ru: [
    {
      href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
      label: "Политика",
      aria: "Политика обработки и защиты персональных данных (PDF)"
    },
    {
      href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
      label: "Согласие",
      aria: "Согласие на обработку персональных данных (PDF)"
    }
  ],
  en: [
    {
      href: "/doc/Privacy_Policy_Tivonix_EN.pdf",
      label: "Privacy",
      aria: "Privacy Policy (PDF)"
    },
    {
      href: "/doc/Consent_Tivonix_EN.pdf",
      label: "Consent",
      aria: "Consent to personal data processing (PDF)"
    }
  ]
};
function imgFallback(fallbackSrc) {
  return (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallbackSrc;
  };
}
function FooterLink({ to, children }) {
  return /* @__PURE__ */ jsx(Link, { to, className: "site-footer__link", children });
}
function ExternalLink({
  href,
  children,
  newTab,
  "aria-label": ariaLabel
}) {
  const isHttp = href.startsWith("http");
  const openInNewTab = newTab ?? isHttp;
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: openInNewTab ? "_blank" : void 0,
      rel: openInNewTab ? "noopener noreferrer" : void 0,
      "aria-label": ariaLabel,
      className: "site-footer__link",
      children
    }
  );
}
function ColNav({
  id,
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("nav", { "aria-labelledby": id, className: "site-footer__col min-w-0", children: [
    /* @__PURE__ */ jsx("h2", { id, className: "site-footer__col-title", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "site-footer__col-list", children })
  ] });
}
function SocialIconLink({
  href,
  label,
  children
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      className: "site-footer__social-link",
      children
    }
  );
}
function IconTelegram({ className }) {
  return /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M21.8 4.6c.2-.8-.6-1.5-1.4-1.2L3.4 10c-1 .4-1 1.8 0 2.2l4.5 1.7 1.7 4.9c.3.9 1.5 1 2 .2l2.6-4.2 4.7 3.6c.7.5 1.7.1 1.9-.8L21.8 4.6Z",
        stroke: "currentColor",
        strokeWidth: "1.6",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ jsx("path", { d: "M8 13.8 19.6 6.4", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })
  ] });
}
function IconInstagram$1({ className }) {
  return /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "2.5", width: "19", height: "19", rx: "5", stroke: "currentColor", strokeWidth: "1.55" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4.25", stroke: "currentColor", strokeWidth: "1.55" }),
    /* @__PURE__ */ jsx("circle", { cx: "17.5", cy: "6.5", r: "1.35", fill: "currentColor" })
  ] });
}
function IconMail$1({ className }) {
  return /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M4.5 7.5v9a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2Z",
        stroke: "currentColor",
        strokeWidth: "1.65",
        opacity: "0.95"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M6 8.5 12 12.5l6-4",
        stroke: "currentColor",
        strokeWidth: "1.65",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function Footer() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [reducedMotion, setReducedMotion] = useState(false);
  const t = (v) => isRu ? v.ru : v.en;
  useEffect(() => {
    if (typeof window === "undefined") return;
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(!!motionMq.matches);
    };
    apply();
    motionMq.addEventListener?.("change", apply);
    return () => {
      motionMq.removeEventListener?.("change", apply);
    };
  }, []);
  const docs = isRu ? DOCS.ru : DOCS.en;
  const projects = buildProjects(isRu);
  const tagline = isRu ? "Сайты, боты и CRM — чтобы заявки не терялись" : "Websites, bots and CRM — so leads don't get lost";
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      id: "site-footer",
      className: "site-footer font-sans text-white antialiased selection:bg-[color:var(--accent)]/25",
      style: { ["--accent"]: ACCENT },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "site-footer__bg", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: FOOTER_BG,
              alt: "",
              className: "site-footer__bg-img",
              loading: "lazy",
              decoding: "async",
              draggable: false
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "site-footer__bg-fade" })
        ] }),
        /* @__PURE__ */ jsx(Container, { className: "site-footer__shell", children: /* @__PURE__ */ jsxs("div", { className: "site-footer__panel", children: [
          /* @__PURE__ */ jsx("div", { className: "site-footer__bar", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              className: "site-footer__logo focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] rounded-lg",
              "aria-label": isRu ? "Наверх" : "Back to top",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: LOGO_LOCKUP_PNG,
                  onError: imgFallback(LOGO_LOCKUP_PNG),
                  alt: "Tivonix",
                  className: "block h-9 w-auto sm:h-10",
                  draggable: false,
                  loading: "lazy",
                  decoding: "async"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "site-footer__grid", children: [
            /* @__PURE__ */ jsx(ColNav, { id: "footer-pages", title: isRu ? "Страницы" : "Pages", children: FOOTER_PAGES.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: i.to, children: t(i.label) }) }, i.to)) }),
            /* @__PURE__ */ jsx(ColNav, { id: "footer-home", title: isRu ? "На главной" : "Homepage", children: FOOTER_HOME.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: i.to, children: t(i.label) }) }, i.to)) }),
            /* @__PURE__ */ jsx(ColNav, { id: "footer-connect", title: isRu ? "Связь" : "Connect", children: FOOTER_CONNECT.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ExternalLink, { href: i.href, children: i.label }) }, i.href)) }),
            /* @__PURE__ */ jsxs(ColNav, { id: "footer-work", title: isRu ? "Кейсы" : "Cases", children: [
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: "/projects", children: isRu ? "Все проекты" : "All projects" }) }),
              projects.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: `/projects/${p.id}`, children: p.title }) }, p.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "site-footer__legal", children: [
            /* @__PURE__ */ jsxs("div", { className: "site-footer__brand", children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: cx$5(
                    "ai-premium-ai-mark__text site-footer__rainbow",
                    !reducedMotion && "ai-premium-ai-mark__text--animated"
                  ),
                  children: "tivonix & AI"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "site-footer__tagline", children: tagline })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "site-footer__legal-end", children: [
              /* @__PURE__ */ jsxs(
                "nav",
                {
                  className: "site-footer__social",
                  "aria-label": isRu ? "Соцсети и почта" : "Social and email",
                  children: [
                    /* @__PURE__ */ jsx(SocialIconLink, { href: FOOTER_CONNECT[0].href, label: FOOTER_CONNECT[0].label, children: /* @__PURE__ */ jsx(IconTelegram, { className: "site-footer__social-icon" }) }),
                    /* @__PURE__ */ jsx(SocialIconLink, { href: FOOTER_CONNECT[1].href, label: FOOTER_CONNECT[1].label, children: /* @__PURE__ */ jsx(IconInstagram$1, { className: "site-footer__social-icon" }) }),
                    /* @__PURE__ */ jsx(SocialIconLink, { href: FOOTER_CONNECT[2].href, label: FOOTER_CONNECT[2].label, children: /* @__PURE__ */ jsx(IconMail$1, { className: "site-footer__social-icon" }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("nav", { className: "site-footer__legal-nav", "aria-label": isRu ? "Документы" : "Legal", children: docs.map((d) => /* @__PURE__ */ jsx(ExternalLink, { href: d.href, newTab: true, "aria-label": d.aria, children: d.label }, d.href)) })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
const CANONICAL_ORIGIN = "https://tivonix.tech";
const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/images/og-social.jpg`;
const OG_IMAGE_WIDTH = "1200";
const OG_IMAGE_HEIGHT = "630";
const OG_IMAGE_ALT = "TIVONIX AI — сайты, боты и автоматизация для бизнеса";
function SEO({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schemaJsonLd,
  ogLocalePrimary = "ru_RU"
}) {
  const canonicalUrl = canonicalPath.startsWith("http") ? canonicalPath : `${CANONICAL_ORIGIN}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;
  const ogLocaleAlt = ogLocalePrimary === "ru_RU" ? "en_US" : "ru_RU";
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "TIVONIX" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: ogLocalePrimary }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale:alternate", content: ogLocaleAlt }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: OG_IMAGE_WIDTH }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: OG_IMAGE_HEIGHT }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:type", content: "image/jpeg" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: OG_IMAGE_ALT }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: OG_IMAGE_ALT }),
    schemaJsonLd != null && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schemaJsonLd) })
  ] });
}
function buildHomePageSchema({ pageTitle, pageDescription }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://tivonix.tech/",
        logo: {
          "@type": "ImageObject",
          url: "https://tivonix.tech/images/tivonix-logo-icon.webp"
        },
        image: "https://tivonix.tech/images/ceo.webp",
        description: pageDescription,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "tivoonix@gmail.com",
            availableLanguage: ["ru", "en"]
          }
        ],
        sameAs: ["https://t.me/TIVONIX"]
      },
      {
        "@type": "WebSite",
        "@id": "https://tivonix.tech/#website",
        url: "https://tivonix.tech/",
        name: "TIVONIX",
        publisher: { "@id": "https://tivonix.tech/#org" },
        inLanguage: ["ru", "en"]
      },
      {
        "@type": "WebPage",
        "@id": "https://tivonix.tech/#home",
        url: "https://tivonix.tech/",
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": "https://tivonix.tech/#website" },
        about: { "@id": "https://tivonix.tech/#org" },
        inLanguage: ["ru", "en"]
      }
    ]
  };
}
function buildPricingPageSchema({ pageTitle, pageDescription, lang }) {
  const copy = pricingCopy(lang);
  const offers = PLAN_IDS.map((id) => {
    const plan = copy.plans[id];
    const usd = PLAN_PRICE_USD[id];
    const hasPrice = typeof usd === "number";
    const discounted = hasPrice ? Math.round(usd * (1 - LAUNCH_DISCOUNT_PERCENT / 100)) : void 0;
    return {
      "@type": "Offer",
      name: plan.name,
      description: plan.desc,
      ...hasPrice ? {
        price: discounted,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: discounted,
          priceCurrency: "USD"
        }
      } : {},
      url: "https://tivonix.tech/plans#pricing",
      seller: { "@id": "https://tivonix.tech/#org" }
    };
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://tivonix.tech/"
      },
      {
        "@type": "WebPage",
        "@id": "https://tivonix.tech/plans#webpage",
        url: "https://tivonix.tech/plans",
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": "https://tivonix.tech/#website" },
        inLanguage: lang === "ru" ? "ru" : "en"
      },
      {
        "@type": "Service",
        "@id": "https://tivonix.tech/plans#service",
        name: pageTitle,
        description: pageDescription,
        provider: { "@id": "https://tivonix.tech/#org" },
        areaServed: "Worldwide",
        offers
      }
    ]
  };
}
function LandingPage() {
  const { dict, lang } = useLang();
  const seo = homePageSeoFromDict(dict);
  const schemaJsonLd = buildHomePageSchema({
    pageTitle: seo.title,
    pageDescription: seo.description
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-clip bg-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seo.title,
        description: seo.description,
        canonicalPath: "/",
        schemaJsonLd,
        ogLocalePrimary: lang === "en" ? "en_US" : "ru_RU"
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "top" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("div", { id: "hero", children: /* @__PURE__ */ jsx(Hero, {}) }),
      /* @__PURE__ */ jsx(LandingPainSection, {}),
      /* @__PURE__ */ jsx(MainOfferSection, {}),
      /* @__PURE__ */ jsx(AiPremiumSection, {}),
      /* @__PURE__ */ jsx(ComparisonSection, {}),
      /* @__PURE__ */ jsx("div", { id: "new-case", children: /* @__PURE__ */ jsx(CasesSection, {}) }),
      /* @__PURE__ */ jsx(TivonixAudienceSection, {}),
      /* @__PURE__ */ jsx(ProcessTimelineSection, {}),
      /* @__PURE__ */ jsx(FAQSection, {})
    ] }),
    /* @__PURE__ */ jsx(FinalCTASection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG = "/images/hero.webp";
function cx$4(...a) {
  return a.filter(Boolean).join(" ");
}
const s$1 = (v) => v;
function projectPreviewSrc(p) {
  return p.cover ?? HERO_IMG;
}
const PREVIEW_SPECS = {
  card: { maxH: 240, aspect: 16 / 9 },
  detail: { maxH: 360, aspect: 16 / 9 },
  thumb: { maxH: 180, aspect: 3 / 2 },
  grid: { maxH: 9999, aspect: 16 / 9, fullWidth: true }
};
function ProjectPreviewFrame({
  src,
  variant = "card"
}) {
  const { maxH, aspect, fullWidth } = PREVIEW_SPECS[variant];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$4(
        "relative overflow-hidden",
        fullWidth ? "w-full rounded-xl" : "mx-auto w-full rounded-2xl",
        "border-0 bg-[#141416]"
      ),
      style: {
        aspectRatio: aspect,
        ...fullWidth ? {} : {
          maxHeight: maxH,
          width: `min(100%, calc(${maxH}px * ${aspect}))`
        }
      },
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          className: "block h-full w-full object-contain",
          draggable: false,
          loading: "lazy",
          decoding: "async"
        }
      )
    }
  );
}
function ProjectGalleryStrip({
  images,
  isRu
}) {
  if (!images.length) return null;
  const label = isRu ? "Скриншоты проекта" : "Project screenshots";
  return /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38", children: label }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cx$4(
          "flex gap-3 overflow-x-auto pb-1",
          "snap-x snap-mandatory scroll-smooth",
          "no-scrollbar"
        ),
        role: "list",
        "aria-label": label,
        children: images.map((src) => /* @__PURE__ */ jsx("div", { role: "listitem", className: "shrink-0 snap-center", children: /* @__PURE__ */ jsx(ProjectPreviewFrame, { src, variant: "thumb" }) }, src))
      }
    )
  ] });
}
const ALL_FILTER = "all";
function collectTags(projects) {
  const set = /* @__PURE__ */ new Set();
  for (const p of projects) {
    for (const tag of p.tags) set.add(tag);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
function ExternalIcon$1({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      width: "12",
      height: "12",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
        /* @__PURE__ */ jsx("path", { d: "M15 3h6v6" }),
        /* @__PURE__ */ jsx("path", { d: "M10 14 21 3" })
      ]
    }
  );
}
const filterPillClass = (active) => cx$4(
  "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-[13px] font-medium transition",
  active ? "bg-[#3a3a3d] text-white" : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92"
);
function ProjectGridCard({ p, isRu }) {
  const wip = p.status === "wip";
  const domainClean = p.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return /* @__PURE__ */ jsxs("article", { className: "group min-w-0", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: `/projects/${p.id}`,
        className: "block min-w-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "aria-label": isRu ? `Кейс ${p.title}` : `Case study ${p.title}`,
        children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl bg-[#1c1c1f] transition duration-300 group-hover:bg-[#262626]", children: /* @__PURE__ */ jsx(ProjectPreviewFrame, { src: projectPreviewSrc(p), variant: "grid" }) })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/projects/${p.id}`,
            className: "block min-w-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45",
            children: /* @__PURE__ */ jsx("h2", { className: "truncate text-[15px] font-[700] tracking-[-0.02em] text-white/[0.92] transition group-hover:text-white", children: p.title })
          }
        ),
        domainClean && !wip ? /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate text-[12px] text-white/45", children: domainClean }) : /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[12px] text-white/40", children: isRu ? "В разработке" : "In progress" })
      ] }),
      wip ? /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-[#1c1c1f] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white/48", children: "WIP" }) : p.domain ? /* @__PURE__ */ jsx(
        "a",
        {
          href: p.domain,
          target: "_blank",
          rel: "noopener noreferrer",
          className: cx$4(
            "shrink-0 inline-flex items-center gap-1 rounded-full",
            "bg-[#1c1c1f] px-2.5 py-1 text-[11px] font-[600] text-white/58",
            "transition hover:bg-[#262626] hover:text-white/85"
          ),
          "aria-label": isRu ? `Открыть ${p.title}` : `Open ${p.title}`,
          children: /* @__PURE__ */ jsx(ExternalIcon$1, { className: "opacity-70" })
        }
      ) : null
    ] })
  ] });
}
function ProjectsPage() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const projects = useMemo(() => buildProjects(isRu), [isRu]);
  const tags = useMemo(() => collectTags(projects), [projects]);
  const filtered = useMemo(() => {
    if (activeFilter === ALL_FILTER) return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);
  const seoTitle = isRu ? "Проекты и кейсы TIVONIX — сайты, веб-сервисы и MVP" : "TIVONIX projects and case studies — websites, web services and MVP";
  const seoDescription = isRu ? "Посмотрите проекты TIVONIX: лендинги, веб-сервисы, личные кабинеты, админки, MVP и Telegram-интеграции для бизнеса." : "Explore TIVONIX projects: landings, web services, client areas, admin panels, MVPs and Telegram integrations for business.";
  const heroTitle = isRu ? "Проекты и кейсы" : "Projects and case studies";
  const allLabel = isRu ? "Все" : "All";
  const emptyLabel = isRu ? "Пока нет проектов в этой категории." : "No projects in this category yet.";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-clip bg-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoTitle,
        description: seoDescription,
        canonicalPath: "/projects",
        ogLocalePrimary: isRu ? "ru_RU" : "en_US"
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Section, { className: "projects-page scroll-mt-[var(--tivonix-header-spacer)] !pb-20 !pt-[calc(var(--tivonix-header-spacer)+1.75rem)] sm:!pt-[calc(var(--tivonix-header-spacer)+2.25rem)]", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-[1180px]", children: [
      /* @__PURE__ */ jsx("header", { className: "mx-auto max-w-[720px] text-center", children: /* @__PURE__ */ jsx("h1", { className: "font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-white", children: heroTitle }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx$4(
            "flex gap-2 overflow-x-auto pb-1 no-scrollbar",
            "justify-start sm:flex-wrap sm:justify-center"
          ),
          role: "tablist",
          "aria-label": isRu ? "Фильтр проектов" : "Project filter",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeFilter === ALL_FILTER,
                onClick: () => setActiveFilter(ALL_FILTER),
                className: filterPillClass(activeFilter === ALL_FILTER),
                children: allLabel
              }
            ),
            tags.map((tag) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": activeFilter === tag,
                onClick: () => setActiveFilter(tag),
                className: filterPillClass(activeFilter === tag),
                children: tag
              },
              tag
            ))
          ]
        }
      ) }),
      filtered.length ? /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsx(ProjectGridCard, { p, isRu }, p.id)) }) : /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-[15px] text-white/45", children: emptyLabel }),
      /* @__PURE__ */ jsx("p", { className: "mt-14 text-center text-[13px] text-white/35", children: isRu ? "Новые кейсы добавляем по мере запуска продуктов." : "We add new case studies as products go live." })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HEADER_H = 72;
const BULLET_RE = /^[•\-]\s*/;
function clipMetaDescription(text, max = 158) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max - 1);
  const i = slice.lastIndexOf(" ");
  return `${(i > 70 ? slice.slice(0, i) : slice).trimEnd()}…`;
}
function MetaRow({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38", children: label }),
    /* @__PURE__ */ jsx("div", { className: "min-w-0 text-[14px] leading-snug text-white/[0.88]", children })
  ] });
}
function ExternalIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
        /* @__PURE__ */ jsx("path", { d: "M15 3h6v6" }),
        /* @__PURE__ */ jsx("path", { d: "M10 14 21 3" })
      ]
    }
  );
}
function ProjectDetailBody({ text }) {
  const lines = text.split("\n").map((l) => l.trim());
  const nodes = [];
  let i = 0;
  let k = 0;
  let firstHeading = true;
  const nextNonEmpty = (from) => {
    for (let j = from; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t) return { j, t };
    }
    return null;
  };
  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      i++;
      continue;
    }
    if (BULLET_RE.test(line)) {
      const items = [];
      while (i < lines.length) {
        const L = lines[i].trim();
        if (!L) break;
        if (!BULLET_RE.test(L)) break;
        items.push(L.replace(BULLET_RE, ""));
        i++;
      }
      nodes.push(
        /* @__PURE__ */ jsx("ul", { className: "mb-8 list-none space-y-2.5 pl-0", children: items.map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[15px] leading-[1.65] text-white/[0.72]", children: [
          /* @__PURE__ */ jsx("span", { className: "mt-[0.52em] h-1 w-1 shrink-0 rounded-full bg-white/32" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, `${idx}-${item.slice(0, 48)}`)) }, k++)
      );
      continue;
    }
    const nxt = nextNonEmpty(i + 1);
    if (nxt && BULLET_RE.test(nxt.t)) {
      nodes.push(
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: cx$4(
              "mb-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40",
              firstHeading ? "mt-0" : "mt-10"
            ),
            children: line
          },
          k++
        )
      );
      firstHeading = false;
      i++;
      continue;
    }
    const para = [];
    while (i < lines.length) {
      const L = lines[i].trim();
      if (!L) break;
      if (BULLET_RE.test(L)) break;
      para.push(L);
      i++;
    }
    if (para.length) {
      nodes.push(
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "mb-5 text-[15px] leading-[1.65] text-white/[0.72] whitespace-pre-line last:mb-0",
            children: para.join("\n")
          },
          k++
        )
      );
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "text-left", children: nodes });
}
function ProjectDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const isRu = lang === "ru";
  const project = useMemo(() => findProjectBySlug(slug, isRu), [slug, isRu]);
  const backLabel = isRu ? "Все проекты" : "All projects";
  const pageEyebrow = isRu ? "Проект" : "Project";
  const resultsLabel = isRu ? "Результаты" : "Outcomes";
  const stackLabel = isRu ? "Стек" : "Stack";
  const domainLabel = isRu ? "Домен" : "Domain";
  const statusLabel = isRu ? "Статус" : "Status";
  const tagsLabel = isRu ? "Теги" : "Tags";
  const liveLabel = isRu ? "В продакшене" : "Live";
  const wipLabel = isRu ? "В разработке" : "In progress";
  const openSiteLabel = isRu ? "Открыть сайт" : "Open website";
  const estimateLabel = isRu ? "Оценка за 24 часа" : "Estimate in 24h";
  const websiteSoonLabel = isRu ? "Сайт скоро" : "Website soon";
  if (!slug) return /* @__PURE__ */ jsx(Navigate, { to: "/projects", replace: true });
  if (!project) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/projects", replace: true });
  }
  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const details = isRu ? project.detailsRu : project.detailsEn;
  const seoTitle = `${project.title} — ${isRu ? "кейс TIVONIX" : "TIVONIX case study"}`;
  const seoDescription = clipMetaDescription(
    subtitle + (isRu ? " Студия TIVONIX: веб-разработка, лендинги, продукты и MVP." : " TIVONIX studio: web development, landings, products and MVPs.")
  );
  const wip = project.status === "wip";
  const domainClean = project.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";
  const coverSrc = projectPreviewSrc(project);
  const coverBlurStyle = s$1({
    transform: "translate(-50%, -50%) scale(1.12)",
    filter: "blur(40px)",
    WebkitFilter: "blur(40px)",
    opacity: 0.58
  });
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen", style: s$1({ "--headerH": `${HEADER_H}px` }), children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoTitle,
        description: seoDescription,
        canonicalPath: `/projects/${project.id}`,
        ogLocalePrimary: isRu ? "ru_RU" : "en_US"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 z-0 overflow-hidden", "aria-hidden": true, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: coverSrc,
          alt: "",
          className: "absolute left-1/2 top-1/2 h-full min-h-[120%] w-full min-w-[120%] object-cover object-center",
          style: coverBlurStyle,
          draggable: false,
          decoding: "async"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,0.72)_0%,rgba(0,0,0,0.88)_50%,rgba(0,0,0,0.93)_100%)]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(Section, { className: "pt-[calc(var(--headerH)+16px)] sm:pt-[calc(var(--headerH)+24px)] pb-24", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "w-full text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/projects",
              className: "inline-flex w-fit items-center gap-2 text-[13px] font-[650] text-white/50 hover:text-white/80 transition",
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "text-white/35", children: "←" }),
                backLabel
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold tracking-tight text-white/80", children: pageEyebrow })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,400px)] lg:gap-10 xl:grid-cols-[minmax(0,1.25fr)_420px] xl:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "order-2 min-w-0 lg:order-1", children: [
            /* @__PURE__ */ jsx(ProjectPreviewFrame, { src: projectPreviewSrc(project), variant: "detail" }),
            project.gallery?.length ? /* @__PURE__ */ jsx(ProjectGalleryStrip, { images: project.gallery, isRu }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "order-1 min-w-0 space-y-8 lg:order-2 lg:pt-1", children: [
            /* @__PURE__ */ jsxs("header", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-[clamp(1.6rem,3.2vw,2.1rem)] font-[800] tracking-[-0.03em] text-white leading-[1.1]", children: project.title }),
              /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[1.55] text-white/58", children: subtitle })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6 border-t border-white/[0.08] pt-6", children: [
              /* @__PURE__ */ jsx(MetaRow, { label: domainLabel, children: project.domain && !wip ? /* @__PURE__ */ jsxs(
                "a",
                {
                  href: project.domain,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group inline-flex max-w-full items-center gap-2 font-[500] text-white/90 underline decoration-white/20 underline-offset-2 transition hover:decoration-white/45",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: domainClean }),
                    /* @__PURE__ */ jsx(ExternalIcon, { className: "shrink-0 text-white/45 transition group-hover:text-white/70" })
                  ]
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-white/45", children: websiteSoonLabel }) }),
              /* @__PURE__ */ jsx(MetaRow, { label: statusLabel, children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cx$4(
                      "h-2 w-2 shrink-0 rounded-full",
                      wip ? "bg-amber-400/90" : "bg-emerald-400/90"
                    )
                  }
                ),
                wip ? wipLabel : liveLabel
              ] }) }),
              /* @__PURE__ */ jsx(MetaRow, { label: tagsLabel, children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[12px] font-[500] text-white/70",
                  children: tag
                },
                tag
              )) }) }),
              project.stack?.length ? /* @__PURE__ */ jsx(MetaRow, { label: stackLabel, children: /* @__PURE__ */ jsx("span", { className: "text-white/75", children: project.stack.join(" · ") }) }) : null
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 border-t border-white/[0.08] pt-6", children: [
              project.domain && !wip ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: project.domain,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: cx$4(
                    "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                    "bg-white text-[14px] font-[700] text-neutral-900 hover:bg-white/90 transition"
                  ),
                  children: openSiteLabel
                }
              ) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: cx$4(
                    "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                    "border border-white/[0.1] bg-white/[0.05] text-[14px] font-[700] text-white/45"
                  ),
                  children: websiteSoonLabel
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://t.me/TIVONIX",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: cx$4(
                    "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                    "text-[14px] font-[800] text-black",
                    "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                    "hover:brightness-105 transition"
                  ),
                  children: estimateLabel
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-[12px] leading-relaxed text-white/38", children: isRu ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Напиши: ",
                /* @__PURE__ */ jsx("span", { className: "text-white/52", children: "что делаем" }),
                ",",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-white/52", children: "срок" }),
                ", ",
                /* @__PURE__ */ jsx("span", { className: "text-white/52", children: "пример" }),
                "."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Message: ",
                /* @__PURE__ */ jsx("span", { className: "text-white/52", children: "what to build" }),
                ",",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-white/52", children: "timeline" }),
                ", ",
                /* @__PURE__ */ jsx("span", { className: "text-white/52", children: "reference" }),
                "."
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "mt-14 border-t border-white/[0.08] pt-12 lg:mt-16 lg:pt-14", children: [
          /* @__PURE__ */ jsx(ProjectDetailBody, { text: details }),
          project.outcomes?.length ? /* @__PURE__ */ jsxs("div", { className: "mt-12 border-t border-white/[0.08] pt-10", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40", children: resultsLabel }),
            /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2.5", children: project.outcomes.map((x) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-[15px] leading-[1.6] text-white/[0.72]", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-[0.52em] h-1 w-1 shrink-0 rounded-full bg-white/32" }),
              /* @__PURE__ */ jsx("span", { children: x })
            ] }, x)) })
          ] }) : null,
          project.testimonial ? /* @__PURE__ */ jsxs("figure", { className: "mt-12 border-l-2 border-white/[0.12] pl-5", children: [
            /* @__PURE__ */ jsxs("blockquote", { className: "text-[15px] leading-[1.65] text-white/[0.74]", children: [
              "“",
              project.testimonial.text,
              "”"
            ] }),
            /* @__PURE__ */ jsxs("figcaption", { className: "mt-3 text-[13px] text-white/45", children: [
              /* @__PURE__ */ jsx("span", { className: "font-[650] text-white/70", children: project.testimonial.name }),
              " — ",
              project.testimonial.role
            ] })
          ] }) : null
        ] })
      ] }) }) })
    ] })
  ] });
}
const ORANGE = "#FF9A3D";
const ORANGE2 = "#FF6A1A";
function cx$3(...a) {
  return a.filter(Boolean).join(" ");
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
const s = (v) => v;
function useLockPageScroll(lock = true) {
  useEffect(() => {
    if (!lock) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [lock]);
}
function IconMail() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M4.5 7.5v9a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2Z",
        stroke: "currentColor",
        strokeWidth: "1.8",
        opacity: "0.9"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M6 8.5 12 12.5l6-4",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function IconTG() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M21 4.6 3.7 11.3c-.9.35-.86 1.63.07 1.92l4.2 1.33 1.64 5.05c.28.88 1.46 1.06 1.98.3l2.32-3.35 4.55 3.32c.7.5 1.7.1 1.88-.75L22 5.5c.2-.96-.76-1.66-1.6-.9Z",
        stroke: "currentColor",
        strokeWidth: "1.8",
        opacity: "0.9"
      }
    ),
    /* @__PURE__ */ jsx("path", { d: "M8.1 14.2 19.8 6.8", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function IconInstagram() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("rect", { x: "2.5", y: "2.5", width: "19", height: "19", rx: "5", stroke: "currentColor", strokeWidth: "1.65", opacity: "0.9" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4.25", stroke: "currentColor", strokeWidth: "1.65" }),
    /* @__PURE__ */ jsx("circle", { cx: "17.5", cy: "6.5", r: "1.35", fill: "currentColor" })
  ] });
}
function LangChip({ item }) {
  const glowPx = item.glow ?? 18;
  const chipStyle = s({
    boxShadow: [
      "0 10px 36px rgba(0,0,0,0.42)",
      `0 0 ${glowPx}px rgba(255,154,61,0.10)`,
      "inset 0 1px 0 rgba(255,255,255,0.08)"
    ].join(", ")
  });
  const dotStyle = s({
    background: `linear-gradient(155deg, ${ORANGE} 0%, ${ORANGE2} 95%)`,
    boxShadow: "0 0 14px rgba(255,154,61,0.30), inset 0 1px 0 rgba(255,255,255,0.35)"
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$3(
        "select-none",
        "inline-flex max-w-[11rem] items-center gap-2 sm:gap-2.5",
        "rounded-full px-3 py-1.5 sm:px-3.5 sm:py-2",
        "bg-[linear-gradient(165deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_45%,rgba(0,0,0,0.12)_100%)]",
        "backdrop-blur-[14px] backdrop-saturate-150"
      ),
      style: chipStyle,
      children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5", style: dotStyle, "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 leading-[1.12]", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-[12px] font-[720] tracking-[-0.03em] text-white/[0.93]", children: item.label }),
          item.sub ? /* @__PURE__ */ jsx("div", { className: "mt-[2px] text-[9.5px] sm:text-[10px] font-[560] text-white/46", children: item.sub }) : null
        ] })
      ]
    }
  );
}
function OrbitRing(props) {
  const { radius, duration, items, reverse, offsetDeg = -14 } = props;
  const step = 360 / Math.max(1, items.length);
  const size = radius * 2;
  const wrapStyle = s({
    width: size,
    height: size,
    marginLeft: -radius,
    marginTop: -radius
  });
  const animStyle2 = s({ animationDuration: `${duration}s` });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "absolute left-1/2 top-1/2 z-0 pointer-events-none",
      style: wrapStyle,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border border-white/8 opacity-60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border border-[#FF9A3D]/10 opacity-80 [mask-image:radial-gradient(transparent_52%,black_64%)] [-webkit-mask-image:radial-gradient(transparent_52%,black_64%)]" }),
        /* @__PURE__ */ jsx("div", { className: cx$3("absolute inset-0 will-change-transform", reverse ? "orbit-rev" : "orbit"), style: animStyle2, children: items.map((it, i) => {
          const ang = offsetDeg + i * step + (i % 2 ? 8 : -5);
          const posStyle = s({
            transform: `translate(-50%,-50%) rotate(${ang}deg) translateX(${radius}px) rotate(${-ang}deg)`
          });
          return /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2", style: posStyle, children: /* @__PURE__ */ jsx("div", { className: cx$3(reverse ? "counter-rev" : "counter"), style: animStyle2, children: /* @__PURE__ */ jsx(LangChip, { item: it }) }) }, `${it.label}-${i}`);
        }) })
      ]
    }
  );
}
function useSolarLayoutNoScroll() {
  const [sState, setSState] = useState(() => ({
    isPhone: false,
    headerH: 86,
    side: 820,
    sun: 420,
    r1: 260,
    r2: 390,
    r3: 540
  }));
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isPhone = w < 640;
      const headerH = isPhone ? 74 : 86;
      const areaH = Math.max(240, h - headerH);
      const areaW = w;
      const side = clamp(Math.min(areaW, areaH) - (isPhone ? 16 : 26), 300, 980);
      const sun = isPhone ? clamp(Math.floor(side * 0.86), 320, 520) : clamp(Math.floor(side * 0.58), 320, 480);
      const r1 = Math.floor(sun / 2 + (isPhone ? 44 : 62));
      const r2 = r1 + (isPhone ? 110 : 160);
      const r3 = r2 + (isPhone ? 120 : 190);
      setSState({ isPhone, headerH, side, sun, r1, r2, r3 });
    };
    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);
  return sState;
}
function SunContacts({ size }) {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const sizeStyle = s({ width: size, height: size });
  const hazeStyle = s({
    background: "radial-gradient(300px 240px at 35% 30%, rgba(255,215,176,0.22), transparent 62%),radial-gradient(360px 280px at 70% 40%, rgba(255,154,61,0.18), transparent 66%),radial-gradient(420px 320px at 45% 80%, rgba(255,106,26,0.12), transparent 70%)"
  });
  const title = isRu ? "Контакты" : "Contacts";
  const botCta = isRu ? "Написать в ТГ-бота" : "Message the Telegram bot";
  const contactRowClass = cx$3(
    "group inline-flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5",
    "bg-white/[0.055] hover:bg-white/[0.085] transition duration-200",
    "shadow-[0_10px_40px_rgba(0,0,0,0.28)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/30"
  );
  const iconBoxClass = "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[linear-gradient(180deg,rgba(255,215,176,0.14),rgba(255,154,61,0.10))]";
  return /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx("div", { className: "relative rounded-full p-[1px] bg-[conic-gradient(from_180deg,rgba(255,154,61,0.0),rgba(255,154,61,0.65),rgba(255,106,26,0.30),rgba(255,154,61,0.0))] shadow-[0_34px_150px_rgba(0,0,0,0.70)]", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-full border border-white/10 bg-black/70 backdrop-blur-2xl", children: [
    /* @__PURE__ */ jsx("div", { style: sizeStyle }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:14px_14px]" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -inset-12 opacity-80", style: hazeStyle }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[280px] text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-[11px] tracking-[0.22em] text-white/45", children: "TIVONIX" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-2 text-[22px] sm:text-[24px] font-[820] tracking-tight text-white/92 leading-[1.1]", children: title }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2 relative z-20 pointer-events-auto text-left", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://t.me/TIVONIX",
              target: "_blank",
              rel: "noopener noreferrer",
              className: contactRowClass,
              children: [
                /* @__PURE__ */ jsx("span", { className: cx$3(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconTG, {}) }),
                /* @__PURE__ */ jsx("span", { className: "min-w-0 text-[13px] font-[780] tracking-tight text-white/85", children: "Telegram" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=tivoonix@gmail.com&su=%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20(SaaS%2FMVP)",
              target: "_blank",
              rel: "noopener noreferrer",
              className: cx$3(contactRowClass, "hidden sm:inline-flex"),
              children: [
                /* @__PURE__ */ jsx("span", { className: cx$3(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconMail, {}) }),
                /* @__PURE__ */ jsx("span", { className: "min-w-0 text-[13px] font-[780] tracking-tight text-white/85", children: "Email" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.instagram.com/tivonix.tech/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: contactRowClass,
              children: [
                /* @__PURE__ */ jsx("span", { className: cx$3(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconInstagram, {}) }),
                /* @__PURE__ */ jsx("span", { className: "min-w-0 text-[13px] font-[780] tracking-tight text-white/85", children: "Instagram" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 relative z-20 pointer-events-auto", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: TG_BOT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: cx$3(
              "inline-flex h-10 w-full items-center justify-center rounded-xl px-5",
              "text-[13.5px] font-[800] text-black whitespace-nowrap",
              "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
              "shadow-[0_12px_40px_rgba(255,122,0,0.16)] hover:brightness-[1.04] transition duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/35"
            ),
            children: botCta
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.55)]" })
  ] }) }) });
}
function ContactsPage() {
  useLockPageScroll(true);
  const { lang } = useLang();
  const isRu = lang === "ru";
  const { headerH, side, sun, r1, r2, r3 } = useSolarLayoutNoScroll();
  const seoTitle = isRu ? "Контакты TIVONIX — заказать сайт или веб-сервис" : "TIVONIX contacts — order a website or web service";
  const seoDescription = isRu ? "Свяжитесь с TIVONIX, чтобы обсудить создание сайта, лендинга, веб-сервиса, MVP, админки или Telegram-бота." : "Contact TIVONIX to discuss creating a website, landing page, web service, MVP, admin panel, or Telegram bot.";
  const ring1 = useMemo(
    () => [
      { label: "React", sub: "UI", glow: 14 },
      { label: "TypeScript", sub: "Types", glow: 16 },
      { label: "Node.js", sub: "API", glow: 14 },
      { label: "SQL", sub: "Data", glow: 12 }
    ],
    []
  );
  const ring2 = useMemo(
    () => [
      { label: "Tailwind", sub: "Styles", glow: 16 },
      { label: "Supabase", sub: "DB/Auth", glow: 16 },
      { label: "Docker", sub: "Deploy", glow: 14 },
      { label: "Git", sub: "Flow", glow: 12 },
      { label: "Figma", sub: "Design", glow: 14 },
      { label: "Vite", sub: "Build", glow: 12 }
    ],
    []
  );
  const ring3 = useMemo(
    () => [
      { label: "Next.js", sub: "SSR", glow: 14 },
      { label: "Express", sub: "Backend", glow: 12 },
      { label: "PostgreSQL", sub: "DB", glow: 14 },
      { label: "JWT", sub: "Auth", glow: 12 },
      { label: "RLS", sub: "Security", glow: 12 },
      { label: "REST", sub: "API", glow: 12 },
      { label: "CI/CD", sub: "Auto", glow: 12 },
      { label: "Nginx", sub: "Proxy", glow: 12 }
    ],
    []
  );
  const stageStyle = s({ width: side, height: side });
  return /* @__PURE__ */ jsxs("div", { className: "relative h-[100svh] w-full overflow-hidden bg-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seoTitle,
        description: seoDescription,
        canonicalPath: "/contacts",
        ogLocalePrimary: isRu ? "ru_RU" : "en_US"
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-[10px] bg-[linear-gradient(90deg,rgba(255,154,61,0),rgba(255,154,61,0.65),rgba(255,106,26,0))]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(1200px_700px_at_12%_12%,rgba(255,154,61,0.18),transparent_60%),radial-gradient(900px_520px_at_88%_18%,rgba(255,106,26,0.14),transparent_62%),radial-gradient(900px_700px_at_55%_80%,rgba(255,154,61,0.10),transparent_65%),linear-gradient(180deg,rgba(0,0,0,0.78),rgba(0,0,0,0.96))]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 [box-shadow:inset_0_0_260px_rgba(0,0,0,0.92)]" })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes orbit { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes orbitRev { from { transform: rotate(360deg);} to { transform: rotate(0deg);} }
        @keyframes counter { from { transform: rotate(0deg);} to { transform: rotate(-360deg);} }
        @keyframes counterRev { from { transform: rotate(-360deg);} to { transform: rotate(0deg);} }
        .orbit { animation: orbit linear infinite; }
        .orbit-rev { animation: orbitRev linear infinite; }
        .counter { animation: counter linear infinite; }
        .counter-rev { animation: counterRev linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .orbit, .orbit-rev, .counter, .counter-rev { animation: none !important; }
        }
      ` }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0", style: s({ top: headerH }), children: /* @__PURE__ */ jsx("div", { className: "h-full w-full grid place-items-center", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto relative", style: stageStyle, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
          style: s({
            width: "92%",
            height: "92%",
            background: "radial-gradient(circle at 45% 40%, rgba(255,215,176,0.18) 0%, rgba(255,154,61,0.14) 28%, rgba(255,106,26,0.10) 46%, rgba(0,0,0,0) 70%)",
            filter: "blur(2px)"
          })
        }
      ),
      /* @__PURE__ */ jsx(OrbitRing, { radius: r1 + 30, duration: 18, items: ring1, offsetDeg: -8 }),
      /* @__PURE__ */ jsx(OrbitRing, { radius: r2, duration: 26, items: ring2, reverse: true, offsetDeg: 8 }),
      /* @__PURE__ */ jsx(OrbitRing, { radius: r3, duration: 38, items: ring3, offsetDeg: -18 }),
      /* @__PURE__ */ jsx(SunContacts, { size: Math.round(sun * 1.25) }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_62%,transparent_84%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_62%,transparent_84%)]" })
    ] }) }) }) })
  ] });
}
function WebsiteCreationPage() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const title = isRu ? "Создание сайтов под ключ — TIVONIX" : "Website development turnkey — TIVONIX";
  const description = isRu ? "Создаём сайты под ключ для бизнеса: лендинги, корпоративные сайты, веб-сервисы и MVP. Дизайн, адаптивная разработка, базовое SEO и запуск." : "We build turnkey websites for business: landing pages, corporate sites, web services and MVPs. Design, responsive development, basic SEO and launch.";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--bg)]", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title,
        description,
        canonicalPath: "/sozdanie-sajtov",
        ogLocalePrimary: isRu ? "ru_RU" : "en_US"
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Section, { className: "pt-8 sm:pt-10 pb-8", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-[32px] sm:text-[46px] font-[850] tracking-[-0.03em] text-white leading-[1.08]", children: isRu ? "Создание сайтов под ключ для бизнеса" : "Turnkey website development for business" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-[16px] leading-7 text-white/72", children: isRu ? "Проектируем, дизайним, разрабатываем и запускаем сайты в одном процессе: без хаоса и с понятным результатом для заявок и продаж." : "We design, develop and launch websites in one clear process focused on leads and sales." })
      ] }) }),
      /* @__PURE__ */ jsx(Section, { className: "py-8", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] sm:text-[32px] font-[800] tracking-tight text-white", children: "Что делаем" }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-4 grid gap-3 text-white/74", children: [
          /* @__PURE__ */ jsx("li", { children: "Лендинги и промо-страницы" }),
          /* @__PURE__ */ jsx("li", { children: "Корпоративные сайты и сайты услуг" }),
          /* @__PURE__ */ jsx("li", { children: "Веб-сервисы, MVP и личные кабинеты" }),
          /* @__PURE__ */ jsx("li", { children: "Интеграции с формами, Telegram и CRM" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Section, { className: "py-8", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] sm:text-[32px] font-[800] tracking-tight text-white", children: "Что входит в работу" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-4xl text-white/74 leading-7", children: "Структура страницы, дизайн, адаптивная разработка на React/TypeScript, формы заявок, базовая SEO-оптимизация (title/description/canonical/og), оптимизация скорости и запуск на домене." })
      ] }) }),
      /* @__PURE__ */ jsx(Section, { className: "py-8", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] sm:text-[32px] font-[800] tracking-tight text-white", children: "Этапы, сроки и оценка" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-4xl text-white/74 leading-7", children: "Бриф и структура, дизайн ключевых блоков, разработка, правки, деплой и поддержка. Типовой срок: от нескольких дней для лендинга до нескольких недель для MVP. Первичную оценку даём после короткого созвона или сообщения в Telegram." })
      ] }) }),
      /* @__PURE__ */ jsx(Section, { className: "pt-8 pb-14", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] sm:text-[32px] font-[800] tracking-tight text-white", children: "FAQ и следующий шаг" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-4xl text-white/74 leading-7", children: "Частые вопросы по процессу и стоимости уже собраны в разделе FAQ на главной. Напишите в Telegram или перейдите в контакты, чтобы получить расчёт по вашему проекту." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://t.me/TIVONIX",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-[750] text-black bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
              children: "Telegram"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contacts",
              className: "inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-[650] text-white border border-white/15 bg-white/[0.04]",
              children: "Контакты"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const automationTypo = {
  /** Главный заголовок страницы (hero) */
  h1: "font-display text-white font-[850] leading-[1.02] tracking-[-0.04em] text-[32px] sm:text-[48px] lg:text-[56px]",
  /** Все крупные заголовки секций */
  h2: "font-display text-white font-[850] leading-[0.98] tracking-[-0.045em] text-[32px] sm:text-[44px] lg:text-[52px]",
  /** Заголовки карточек и компактных блоков */
  h3: "font-display text-white font-[800] leading-[1.1] tracking-[-0.03em] text-[20px] sm:text-[22px]",
  /** Акцентные заголовки (слайды, сетка «Почему TIVONIX») */
  h3Lg: "font-display text-white font-[800] leading-[1.08] tracking-[-0.035em] text-[24px] sm:text-[28px] lg:text-[32px]"
};
const HeroWebGLBg$1 = lazy(() => import("./assets/HeroWebGLBg-CnY8eKt4.js"));
const DEFAULT_FRAME = "relative h-[13.5rem] overflow-hidden bg-black sm:h-[15rem] lg:h-[16.5rem]";
function SmokeMaskedIllustration({
  image,
  imageDir,
  title,
  smokeBase,
  orangeLayer,
  frameClassName = DEFAULT_FRAME
}) {
  const smokeMask = "radial-gradient(ellipse 78% 72% at 50% 50%, #fff 0%, #fff 34%, rgba(255,255,255,0.62) 52%, rgba(255,255,255,0.22) 68%, transparent 82%)";
  return /* @__PURE__ */ jsxs("div", { className: frameClassName, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        "aria-hidden": true,
        className: "absolute inset-0 z-[1]",
        style: {
          WebkitMaskImage: smokeMask,
          maskImage: smokeMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-[-20%] opacity-[0.92]", style: { background: smokeBase } }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-[-14%] z-[1] scale-[1.08] opacity-[0.76]", children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(HeroWebGLBg$1, { interactive: false, quality: "low" }) }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-[-12%] z-[2] opacity-[0.82]",
              style: { background: orangeLayer }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[3] bg-black/10" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: encodeURI(`${imageDir}/${image}`),
        alt: title,
        loading: "lazy",
        decoding: "async",
        draggable: false,
        className: "relative z-[4] h-full w-full scale-[1.08] object-contain opacity-[0.96] mix-blend-screen"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.98)_100%)]" })
  ] });
}
const SIGNS_FRAME = "relative h-[16.5rem] overflow-hidden bg-black sm:h-[18.5rem]";
function CenterLine() {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": true,
      className: "pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full -translate-x-1/2 md:block",
      children: /* @__PURE__ */ jsx("div", { className: "relative h-full w-px bg-[#ff7a1a]/28", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#ff7a1a]/45 via-[#ff7a1a]/85 to-[#ff7a1a]/45" }) })
    }
  );
}
function TimelineDot() {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: "absolute left-1/2 top-[11.15rem] z-[5] hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[#ff7a1a] shadow-[0_0_22px_rgba(255,122,26,0.75)] md:block"
    }
  );
}
function Connector({ alignRight }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: `absolute top-[11.5rem] hidden h-px w-14 bg-gradient-to-r md:block ${alignRight ? "right-full from-transparent to-[#ff7a1a]/80" : "left-full from-[#ff7a1a]/80 to-transparent"}`
    }
  );
}
function SignCard({
  item,
  alignRight,
  imageDir,
  smokeBase,
  orangeLayer
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: `relative w-full max-w-[34rem] overflow-hidden border border-white/[0.12] bg-black ${alignRight ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"}`,
      children: [
        /* @__PURE__ */ jsx(Connector, { alignRight }),
        /* @__PURE__ */ jsx(
          SmokeMaskedIllustration,
          {
            image: item.image,
            imageDir,
            title: item.title,
            smokeBase,
            orangeLayer,
            frameClassName: SIGNS_FRAME
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "px-6 pb-8 pt-5 sm:px-7 sm:pb-9", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.06] px-2 text-[11px] font-[850] text-white", children: item.number }),
          /* @__PURE__ */ jsx("h3", { className: automationTypo.h3Lg, children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-[16px] font-[600] leading-[1.65] text-white/86 sm:text-[18px]", children: item.text })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff7a1a]/75 to-transparent"
          }
        )
      ]
    }
  );
}
function SignItem({
  item,
  index,
  imageDir,
  smokeBase,
  orangeLayer
}) {
  const alignRight = index % 2 === 1;
  return /* @__PURE__ */ jsxs("li", { className: "relative z-10 grid gap-6 md:grid-cols-[1fr_5rem_1fr] md:items-start md:gap-0", children: [
    /* @__PURE__ */ jsx("div", { className: `relative ${alignRight ? "md:col-start-3" : "md:col-start-1"}`, children: /* @__PURE__ */ jsx(
      SignCard,
      {
        item,
        alignRight,
        imageDir,
        smokeBase,
        orangeLayer
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "relative hidden md:col-start-2 md:row-start-1 md:block", children: /* @__PURE__ */ jsx(TimelineDot, {}) })
  ] });
}
function AutomationSignsScrollSection({
  smokeBase,
  orangeLayer,
  imageDir,
  sectionTitle,
  sectionLead,
  ariaList,
  items
}) {
  return /* @__PURE__ */ jsx("section", { className: "relative scroll-mt-[var(--tivonix-header-spacer)] overflow-hidden bg-black", children: /* @__PURE__ */ jsx("div", { className: "relative py-16 sm:py-20 lg:py-24", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-5xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: `mx-auto mt-6 max-w-[56rem] ${automationTypo.h2}`, children: sectionTitle }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-6 max-w-[47rem] text-[16px] font-[600] leading-[1.68] text-white/76 sm:text-[18px]", children: sectionLead })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-14 max-w-6xl sm:mt-16", children: [
      /* @__PURE__ */ jsx(CenterLine, {}),
      /* @__PURE__ */ jsx(
        "ul",
        {
          className: "relative z-10 list-none space-y-10 sm:space-y-12 md:space-y-16",
          "aria-label": ariaList,
          children: items.map((item, index) => /* @__PURE__ */ jsx(
            SignItem,
            {
              item,
              index,
              imageDir,
              smokeBase,
              orangeLayer
            },
            item.number
          ))
        }
      )
    ] })
  ] }) }) });
}
const icons = [
  {
    label: "Telegram",
    Icon: SiTelegram,
    side: "left",
    x: -520,
    y: -120,
    size: 72,
    iconSize: 34,
    delay: 0,
    color: "#26A5E4"
  },
  {
    label: "Email",
    Icon: SiGmail,
    side: "left",
    x: -440,
    y: 0,
    size: 96,
    iconSize: 46,
    delay: 0.45,
    color: "#EA4335"
  },
  {
    label: "CRM",
    Icon: SiHubspot,
    side: "right",
    x: 500,
    y: -90,
    size: 96,
    iconSize: 48,
    delay: 0.9,
    color: "#FF5C35"
  },
  {
    label: "Таблицы",
    Icon: SiGooglesheets,
    side: "left",
    x: -330,
    y: -85,
    size: 82,
    iconSize: 40,
    delay: 1.3,
    color: "#34A853"
  },
  {
    label: "WhatsApp",
    Icon: SiWhatsapp,
    side: "left",
    x: -360,
    y: 125,
    size: 88,
    iconSize: 42,
    delay: 1.75,
    color: "#25D366"
  },
  {
    label: "Notion",
    Icon: SiNotion,
    side: "right",
    x: 400,
    y: 20,
    size: 78,
    iconSize: 38,
    delay: 2.2,
    color: "#000000"
  },
  {
    label: "Календарь",
    Icon: SiGooglecalendar,
    side: "right",
    x: 310,
    y: -135,
    size: 92,
    iconSize: 44,
    delay: 2.65,
    color: "#4285F4"
  },
  {
    label: "Задачи",
    Icon: SiClickup,
    side: "right",
    x: 370,
    y: 130,
    size: 84,
    iconSize: 42,
    delay: 3.1,
    color: "#7B68EE"
  },
  {
    label: "Оплаты",
    Icon: SiStripe,
    side: "right",
    x: 520,
    y: 115,
    size: 72,
    iconSize: 36,
    delay: 3.55,
    color: "#635BFF"
  },
  {
    label: "Документы",
    Icon: SiGoogledocs,
    side: "left",
    x: -520,
    y: 110,
    size: 72,
    iconSize: 36,
    delay: 4,
    color: "#4285F4"
  },
  {
    label: "Отчёты",
    Icon: SiGoogleanalytics,
    side: "left",
    x: -455,
    y: -15,
    size: 64,
    iconSize: 34,
    delay: 4.45,
    color: "#F9AB00"
  },
  {
    label: "Автоматизация",
    Icon: SiZapier,
    side: "left",
    x: -250,
    y: 85,
    size: 64,
    iconSize: 34,
    delay: 4.9,
    color: "#FF4A00"
  },
  {
    label: "Уведомления",
    Icon: FiBell,
    side: "right",
    x: 500,
    y: -10,
    size: 64,
    iconSize: 34,
    delay: 5.35,
    color: "#FF5C35"
  }
];
function AutomationEcosystemMap({
  logoSrc,
  smokeBase = "radial-gradient(circle at center, rgba(255,122,26,0.12), transparent 45%)",
  orangeLayer = "linear-gradient(180deg, rgba(255,122,26,0.10), transparent 60%)",
  badgeLabels
}) {
  const resolvedIcons = icons.map((icon, index) => ({
    ...icon,
    label: badgeLabels[index] ?? icon.label
  }));
  return /* @__PURE__ */ jsxs("section", { className: "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto min-h-[22rem] max-w-[min(96vw,1400px)] overflow-hidden rounded-[26px] bg-black px-4 py-8 sm:min-h-[30rem] lg:min-h-[34rem]", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0",
          style: { background: smokeBase }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0 z-[1]",
          style: { background: orangeLayer }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(255,122,26,0.22),transparent_35%),radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_84%)]"
        }
      ),
      /* @__PURE__ */ jsxs(
        "svg",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-0 z-[3] h-full w-full",
          viewBox: "0 0 1200 430",
          preserveAspectRatio: "none",
          children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("linearGradient", { id: "lineLeft", x1: "0", x2: "1", y1: "0", y2: "0", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0" }),
                /* @__PURE__ */ jsx("stop", { offset: "55%", stopColor: "#ffffff", stopOpacity: "0.28" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#ff7a1a", stopOpacity: "0.95" })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "lineRight", x1: "1", x2: "0", y1: "0", y2: "0", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0" }),
                /* @__PURE__ */ jsx("stop", { offset: "55%", stopColor: "#ffffff", stopOpacity: "0.28" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#ff7a1a", stopOpacity: "0.95" })
              ] }),
              /* @__PURE__ */ jsxs("filter", { id: "orangeGlow", children: [
                /* @__PURE__ */ jsx("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
                /* @__PURE__ */ jsxs("feMerge", { children: [
                  /* @__PURE__ */ jsx("feMergeNode", { in: "blur" }),
                  /* @__PURE__ */ jsx("feMergeNode", { in: "SourceGraphic" })
                ] })
              ] })
            ] }),
            resolvedIcons.map((icon, index) => {
              const startX = 600 + icon.x;
              const startY = 215 + icon.y;
              const c1x = icon.side === "left" ? startX + 150 : startX - 150;
              const c2x = icon.side === "left" ? 470 : 730;
              const c1y = startY;
              const c2y = 215 + icon.y * 0.35;
              const path = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, 600 215`;
              return /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: path,
                    fill: "none",
                    stroke: icon.side === "left" ? "url(#lineLeft)" : "url(#lineRight)",
                    strokeWidth: "1",
                    strokeDasharray: index % 2 === 0 ? "4 8" : "1 0",
                    opacity: "0.52"
                  }
                ),
                /* @__PURE__ */ jsxs("circle", { r: "3", fill: "#ff7a1a", filter: "url(#orangeGlow)", children: [
                  /* @__PURE__ */ jsx(
                    "animateMotion",
                    {
                      dur: `${5.8 + index % 4 * 0.45}s`,
                      begin: `${icon.delay}s`,
                      repeatCount: "indefinite",
                      path
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "animate",
                    {
                      attributeName: "opacity",
                      values: "0;1;1;0",
                      keyTimes: "0;0.15;0.75;1",
                      dur: `${5.8 + index % 4 * 0.45}s`,
                      begin: `${icon.delay}s`,
                      repeatCount: "indefinite"
                    }
                  )
                ] })
              ] }, `${icon.label}-line`);
            })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[4]", children: resolvedIcons.map((item, index) => {
        const Icon2 = item.Icon;
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: "integration-fly absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-white shadow-[0_0_34px_rgba(255,255,255,0.18)]",
            style: {
              "--from-x": `${item.x}px`,
              "--from-y": `${item.y}px`,
              "--size": `${item.size}px`,
              "--duration": `${6.6 + index % 5 * 0.45}s`,
              "--delay": `${item.delay}s`
            },
            children: /* @__PURE__ */ jsx(Icon2, { size: item.iconSize, color: item.color, "aria-hidden": true })
          },
          `int-${index}`
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute h-[13rem] w-[13rem] rounded-full bg-[#ff7a1a]/25 blur-[42px] sm:h-[18rem] sm:w-[18rem]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute h-[8rem] w-[8rem] animate-ping rounded-full border border-[#ff7a1a]/35 sm:h-[11rem] sm:w-[11rem]" }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex h-[7.5rem] w-[7.5rem] items-center justify-center rounded-full bg-black shadow-[0_0_45px_rgba(255,122,26,0.7)] ring-2 ring-[#ff7a1a] sm:h-[10rem] sm:w-[10rem]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,122,26,0.35),transparent_65%)]" }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: logoSrc,
              alt: "TIVONIX",
              width: 96,
              height: 96,
              decoding: "async",
              className: "relative z-10 h-[4rem] w-[4rem] object-contain sm:h-[5.5rem] sm:w-[5.5rem]"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[11] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.9)_100%)]" })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .integration-fly {
          width: var(--size);
          height: var(--size);
          animation: fly-to-center var(--duration) cubic-bezier(.55, 0, .15, 1) infinite;
          animation-delay: var(--delay);
          opacity: 0;
          will-change: transform, opacity, filter;
        }

        @keyframes fly-to-center {
          0% {
            transform: translate(var(--from-x), var(--from-y)) translate(-50%, -50%) scale(0.78);
            opacity: 0;
            filter: blur(5px);
          }

          10% {
            opacity: 1;
            filter: blur(0);
          }

          58% {
            opacity: 1;
          }

          82% {
            transform: translate(0, 0) translate(-50%, -50%) scale(0.26);
            opacity: 0;
            filter: blur(2px);
          }

          100% {
            transform: translate(0, 0) translate(-50%, -50%) scale(0.18);
            opacity: 0;
            filter: blur(8px);
          }
        }

        @media (max-width: 768px) {
          .integration-fly {
            width: calc(var(--size) * 0.68);
            height: calc(var(--size) * 0.68);
            animation-name: fly-to-center-mobile;
          }

          @keyframes fly-to-center-mobile {
            0% {
              transform:
                translate(calc(var(--from-x) * 0.52), calc(var(--from-y) * 0.75))
                translate(-50%, -50%)
                scale(0.72);
              opacity: 0;
              filter: blur(5px);
            }

            10% {
              opacity: 1;
              filter: blur(0);
            }

            58% {
              opacity: 1;
            }

            82% {
              transform: translate(0, 0) translate(-50%, -50%) scale(0.24);
              opacity: 0;
              filter: blur(2px);
            }

            100% {
              transform: translate(0, 0) translate(-50%, -50%) scale(0.18);
              opacity: 0;
              filter: blur(8px);
            }
          }
        }
      ` })
  ] });
}
const defaultPainPoints = [
  {
    title: "Заявки теряются между каналами",
    text: "Клиенты пишут в Telegram, WhatsApp, почту и формы, а команда не всегда видит всё вовремя.",
    image: "1.webp"
  },
  {
    title: "Команда тратит время вручную",
    text: "Менеджеры переносят данные, обновляют статусы и собирают отчёты руками вместо автоматизации.",
    image: "2.webp"
  },
  {
    title: "Нет контроля над процессами",
    text: "Руководителю сложно понять, где застряли заявки, кто отвечает и сколько денег теряется.",
    image: "3.webp"
  }
];
function PainCard({
  item,
  imageDir,
  smokeBase,
  orangeLayer,
  index
}) {
  return /* @__PURE__ */ jsxs("article", { className: "group relative min-h-[25rem] overflow-hidden border border-white/[0.12] bg-black", children: [
    /* @__PURE__ */ jsx(
      SmokeMaskedIllustration,
      {
        image: item.image ?? `${index + 1}.webp`,
        imageDir,
        title: item.title,
        smokeBase,
        orangeLayer
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 px-5 pb-6 pt-4 sm:px-6 sm:pb-7", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.06] px-2 text-[10px] font-[800] text-white", children: String(index + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("h3", { className: automationTypo.h3, children: item.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[28rem] text-[13.5px] leading-[1.62] text-white sm:text-[14.5px]", children: item.text })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff7a1a]/80 to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,122,26,0.1),transparent_46%)]" })
    ] })
  ] });
}
function PainPointsBlock({
  items = defaultPainPoints,
  imageDir = "/images/avtomatizaciya-biznesa/Где бизнес теряет",
  smokeBase,
  orangeLayer,
  sectionTitle,
  sectionLead
}) {
  const coreItems = Array.from({ length: 3 }, (_, index) => ({
    ...defaultPainPoints[index],
    ...items[index] ?? {},
    image: items[index]?.image ?? defaultPainPoints[index].image
  }));
  return /* @__PURE__ */ jsx(Section, { className: "relative scroll-mt-[var(--tivonix-header-spacer)] overflow-hidden bg-black py-16 sm:py-20", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: `max-w-[44rem] ${automationTypo.h2}`, children: sectionTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-[40rem] text-[14.5px] leading-[1.7] text-white sm:text-[16px]", children: sectionLead })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "shrink-0 pt-1" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 grid sm:grid-cols-3", children: coreItems.map((item, index) => /* @__PURE__ */ jsx(
      PainCard,
      {
        item,
        imageDir,
        smokeBase,
        orangeLayer,
        index
      },
      `${item.title}-${index}`
    )) })
  ] }) }) });
}
const ru = {
  seo: {
    title: "Автоматизация бизнеса — TIVONIX",
    description: "Автоматизация процессов, CRM, личные кабинеты, админ-панели и интеграции под реальные задачи бизнеса."
  },
  schemaServiceName: "Автоматизация бизнеса TIVONIX",
  hero: {
    h1Line1: "Автоматизируем процессы",
    h1Line2: "вашего бизнеса",
    subtitle: "Помогаем убрать ручную работу, связать сервисы и навести порядок в заявках, клиентах, отчётах и внутренних процессах.",
    microCtaTelegram: "В Telegram",
    microCtaEmail: "На почту",
    microCtaEmailSubject: "Автоматизация бизнеса — заявка",
    badges: ["консультация без оплаты", "быстрый разбор", "чёткий план старта"],
    ctaDiscuss: "Обсудить автоматизацию",
    ctaCases: "Посмотреть кейсы",
    heroImgAlt: "Схема автоматизации бизнес-процессов"
  },
  signs: {
    sectionTitle: "Когда уже пора автоматизировать процессы",
    sectionLead: "Обычно автоматизация нужна не «когда-нибудь потом», а в тот момент, когда бизнес начинает упираться в хаос, ручную работу и потерю контроля.",
    ariaList: "Признаки, что пора автоматизировать",
    items: [
      {
        number: "01",
        title: "Потерянные заявки",
        text: "Заявки приходят из разных источников и не собираются в одной системе, часть обращений теряется или обрабатывается слишком поздно.",
        image: "1.webp"
      },
      {
        number: "02",
        title: "Клиенты ведутся вручную",
        text: "Менеджеры хранят информацию в таблицах, чатах и заметках, поэтому история клиента быстро распадается на куски.",
        image: "2.webp"
      },
      {
        number: "03",
        title: "Ручной перенос данных",
        text: "Одни и те же данные копируются между CRM, таблицами, почтой и документами. Это забирает время и создаёт ошибки.",
        image: "3.webp"
      },
      {
        number: "04",
        title: "Нет прозрачной аналитики",
        text: "Данные разбросаны по разным местам. Чтобы понять, что происходит в бизнесе, приходится собирать всё вручную.",
        image: "4.webp"
      },
      {
        number: "05",
        title: "Повторяющиеся вопросы клиентов",
        text: "Команда снова и снова отвечает на одинаковые сообщения вместо того, чтобы заниматься продажами и развитием.",
        image: "5.webp"
      },
      {
        number: "06",
        title: "Много повторяющихся действий",
        text: "Статусы, уведомления, напоминания, отчёты и передача задач выполняются руками, хотя это можно автоматизировать.",
        image: "6.webp"
      },
      {
        number: "07",
        title: "Готовые сервисы не подходят под вашу логику работы",
        text: "Бизнес работает по своим правилам, а стандартные инструменты не закрывают процесс полностью.",
        image: "7.webp"
      }
    ]
  },
  pain: {
    title: "Где бизнес теряет заявки, время и деньги",
    lead: "Когда процессы разбросаны по CRM, таблицам и мессенджерам, команда работает вручную, а часть клиентов просто выпадает из системы.",
    items: [
      {
        title: "Ручной перенос данных",
        text: "Информация копируется между таблицами, CRM, почтой и мессенджерами. Из-за этого появляются ошибки, дубли и потери данных.",
        image: "1.webp"
      },
      {
        title: "Потерянные заявки",
        text: "Когда заявки приходят из разных каналов и не собираются в одной системе, часть обращений теряется или обрабатывается слишком поздно.",
        image: "2.webp"
      },
      {
        title: "Нет прозрачной аналитики",
        text: "Данные разбросаны по разным местам. Чтобы понять, что происходит в бизнесе, приходится собирать всё вручную.",
        image: "3.webp"
      }
    ]
  },
  why: {
    h2Line1: "Автоматизируем процессы",
    h2Line2: "вашего бизнеса",
    subtitle: "Автоматизация убирает рутину, ускоряет обработку заявок и даёт прозрачный контроль процессов.",
    benefits: [
      {
        title: "Меньше ручной работы",
        text: "Рутинные операции и перенос данных между сервисами автоматизируются. Команда меньше копирует данные вручную и реже допускает ошибки."
      },
      {
        title: "Быстрее обработка заявок",
        text: "Все обращения сразу попадают в единую систему. Статусы, уведомления и очередь обработки ведутся без потерь в чатах."
      },
      {
        title: "Понятный контроль процессов",
        text: "Этапы, задачи и отчеты собраны в одном месте. Вы видите реальную картину по процессам без ручной сборки таблиц."
      },
      {
        title: "Удобная работа команды",
        text: "Роли, доступы и сценарии настраиваются под вашу бизнес-логику. Каждый сотрудник работает в своем интерфейсе и по своим задачам."
      },
      {
        title: "Больше времени на рост",
        text: "Команда фокусируется на продукте, клиентах и развитии. Повторяющиеся операции выполняются автоматически."
      },
      {
        title: "Меньше ошибок в данных",
        text: "Единая логика обработки и автоматические сценарии снижают количество дубликатов и некорректных записей в данных."
      }
    ]
  },
  features: {
    title: "Что можно автоматизировать",
    ariaRegion: "Направления автоматизации",
    ariaCarousel: "карусель",
    prev: "Предыдущий слайд",
    next: "Следующий слайд",
    slides: [
      {
        title: "Обработка заявок",
        text: "Соберём заявки с сайта, форм, Telegram, email и других источников в одном месте.",
        image: "1.webp"
      },
      {
        title: "CRM и воронки продаж",
        text: "Настроим систему для работы с клиентами, статусами, задачами и этапами продаж.",
        image: "2.webp"
      },
      {
        title: "Личные кабинеты",
        text: "Разработаем кабинеты для клиентов, сотрудников или партнёров с нужными функциями и ролями.",
        image: "3.webp"
      },
      {
        title: "Админ-панели",
        text: "Сделаем удобные внутренние панели управления для заявок, пользователей, заказов, контента и процессов.",
        image: "4.webp"
      },
      {
        title: "Уведомления и напоминания",
        text: "Настроим автоматические уведомления в Telegram, email или внутри системы.",
        image: "5.webp"
      },
      {
        title: "Отчёты и аналитика",
        text: "Соберём ключевые показатели в удобные дашборды и понятные отчёты.",
        image: "6.webp"
      },
      {
        title: "Оплаты и документы",
        text: "Подключим оплату, статусы платежей, подтверждения, документы и логику после оплаты.",
        image: "7.webp"
      },
      {
        title: "Интеграции с внешними сервисами",
        text: "Свяжем сайт, CRM, Telegram, таблицы, платёжные системы, API и другие инструменты.",
        image: "8.webp"
      }
    ]
  },
  examples: {
    title: "Заявки, кабинеты, уведомления и оплаты в одной логике.",
    body: "Одна система связывает каналы и заявки, статусы и путь клиента, личные кабинеты и админку, записи и сообщения — без ручных переносов и потерянных обращений.",
    srOnly: "Одна цепочка в продукте"
  },
  ecosystemLabels: [
    "Telegram",
    "Email",
    "CRM",
    "Таблицы",
    "WhatsApp",
    "Notion",
    "Календарь",
    "Задачи",
    "Оплаты",
    "Документы",
    "Отчёты",
    "Автоматизация",
    "Уведомления"
  ],
  results: {
    title: "Что вы получите в результате",
    folderLabel: "Папка результата",
    folderMeta: (count) => `${count} пунктов после проекта`,
    cta: "Узнать свой результат",
    items: [
      "Понятную структуру будущей системы",
      "Прототип экранов и логики",
      "Веб-сервис или внутренний инструмент под ваш процесс",
      "Админ-панель для управления",
      "Интеграции с нужными сервисами",
      "Уведомления, статусы и автоматические действия",
      "Поддержку запуска и дальнейшего развития"
    ]
  },
  whyTivonix: {
    bandTitle: "Автоматизация, которая работает под ваш бизнес",
    points: [
      {
        title: "Не просто сайт, а рабочая система",
        text: "Мы смотрим шире: заявки, данные, пользователи, процессы, админка, интеграции и развитие после запуска."
      },
      {
        title: "Объясняем простым языком",
        text: "Без технической путаницы. Показываем, что именно нужно сделать, зачем это нужно и как это поможет бизнесу."
      },
      {
        title: "Можно начать с MVP",
        text: "Не обязательно сразу строить большую систему. Часто лучше запустить первую рабочую версию и развивать её поэтапно."
      },
      {
        title: "Берём на себя весь процесс",
        text: "Структура, дизайн, разработка, интеграции, тестирование и запуск — всё в одном месте."
      }
    ]
  },
  faq: {
    title: "Частые вопросы",
    items: [
      {
        q: "Сколько стоит автоматизация бизнеса?",
        a: "Стоимость зависит от объёма задачи: ролей, экранов, логики, интеграций и сценариев. После короткого разбора мы сможем дать ориентир по бюджету."
      },
      {
        q: "Сколько времени занимает разработка?",
        a: "Это зависит от сложности решения. Небольшую систему можно запустить быстрее, более сложный продукт требует больше этапов. Часто оптимально начинать с MVP."
      },
      {
        q: "Можно автоматизировать только один процесс?",
        a: "Да. Часто это лучший вариант. Например, сначала автоматизировать заявки, а потом постепенно добавить личный кабинет, аналитику, оплаты и другие блоки."
      },
      {
        q: "Вы делаете интеграции с Telegram, оплатами и внешними сервисами?",
        a: "Да. Мы можем подключить Telegram, email, платёжные системы, CRM, таблицы, API и другие сервисы."
      },
      {
        q: "Что лучше: готовый сервис или разработка под себя?",
        a: "Если задача типовая, может подойти готовый сервис. Если у бизнеса своя логика и нестандартные процессы, лучше делать решение под себя."
      },
      {
        q: "Нужно ли техническое задание?",
        a: "Нет. На старте достаточно описать задачу простыми словами. Мы сами поможем разобраться, сформировать структуру и определить первый этап."
      }
    ]
  },
  ctaBlock: {
    title: "Покажем, что можно автоматизировать именно у вас",
    body: "Расскажите, как сейчас устроена работа в вашем бизнесе. Мы разберём процессы, найдём точки автоматизации и предложим понятное решение: от простого внутреннего инструмента до полноценного веб-сервиса.",
    primary: "Получить консультацию",
    secondary: "Написать в Telegram",
    footnote: "Ответим в течение дня и подскажем, с чего лучше начать."
  },
  common: { imageFallback: "Изображение скоро появится" }
};
const en = {
  seo: {
    title: "Business automation — TIVONIX",
    description: "Process automation, CRM, client portals, admin panels, and integrations tailored to real business workflows."
  },
  schemaServiceName: "TIVONIX business automation",
  hero: {
    h1Line1: "We automate workflows",
    h1Line2: "for your business",
    subtitle: "We help remove manual work, connect your tools, and bring order to leads, customers, reporting, and internal processes.",
    microCtaTelegram: "Telegram",
    microCtaEmail: "Email",
    microCtaEmailSubject: "Business automation inquiry",
    badges: ["Free intro call", "Fast discovery", "A clear starting plan"],
    ctaDiscuss: "Discuss automation",
    ctaCases: "View case studies",
    heroImgAlt: "Diagram of automated business processes"
  },
  signs: {
    sectionTitle: "When it’s time to automate your processes",
    sectionLead: "Automation is rarely “someday”—it matters when the business hits chaos, manual overload, and loss of control.",
    ariaList: "Signs you should automate",
    items: [
      {
        number: "01",
        title: "Lost leads",
        text: "Inquiries arrive from many channels and never land in one system—some are lost or handled too late.",
        image: "1.webp"
      },
      {
        number: "02",
        title: "Clients tracked by hand",
        text: "Teams keep context in spreadsheets, chats, and notes, so the customer story falls apart.",
        image: "2.webp"
      },
      {
        number: "03",
        title: "Manual data copying",
        text: "The same data is retyped across CRM, sheets, email, and documents—slow and error-prone.",
        image: "3.webp"
      },
      {
        number: "04",
        title: "No clear analytics",
        text: "Metrics live in different places; understanding the business means stitching reports manually.",
        image: "4.webp"
      },
      {
        number: "05",
        title: "Repetitive client questions",
        text: "The team answers the same messages again and again instead of selling and growing.",
        image: "5.webp"
      },
      {
        number: "06",
        title: "Too many repeat tasks",
        text: "Statuses, alerts, reminders, reports, and handoffs are done manually though they could run automatically.",
        image: "6.webp"
      },
      {
        number: "07",
        title: "Off-the-shelf tools don’t fit",
        text: "Your business has its own rules; standard products rarely cover the full process.",
        image: "7.webp"
      }
    ]
  },
  pain: {
    title: "Where businesses lose leads, time, and money",
    lead: "When work is split across CRM, spreadsheets, and messengers, teams operate manually and clients slip through the cracks.",
    items: [
      {
        title: "Manual data transfer",
        text: "Information is copied between spreadsheets, CRM, email, and chat—creating errors, duplicates, and gaps.",
        image: "1.webp"
      },
      {
        title: "Lost leads",
        text: "When leads come from many channels and aren’t unified, some inquiries are lost or handled too late.",
        image: "2.webp"
      },
      {
        title: "No transparent analytics",
        text: "Data is scattered; seeing what’s really happening means manual reporting.",
        image: "3.webp"
      }
    ]
  },
  why: {
    h2Line1: "We automate workflows",
    h2Line2: "for your business",
    subtitle: "Automation cuts routine, speeds up lead handling, and gives clear process control.",
    benefits: [
      {
        title: "Less manual work",
        text: "Routine moves between tools are automated—fewer copy-paste mistakes for the team."
      },
      {
        title: "Faster lead handling",
        text: "Every inquiry lands in one system with statuses and notifications—nothing dies in chat threads."
      },
      {
        title: "Clear process control",
        text: "Stages, tasks, and reports live in one place—no more one-off spreadsheet dashboards."
      },
      {
        title: "Better team experience",
        text: "Roles, access, and flows match your logic—each person works in the right interface."
      },
      {
        title: "More time to grow",
        text: "The team focuses on product and customers while repeat work runs in the background."
      },
      {
        title: "Fewer data errors",
        text: "One processing model and automated steps reduce duplicates and bad records."
      }
    ]
  },
  features: {
    title: "What you can automate",
    ariaRegion: "Automation topics",
    ariaCarousel: "carousel",
    prev: "Previous slide",
    next: "Next slide",
    slides: [
      {
        title: "Lead capture",
        text: "Bring leads from your site, forms, Telegram, email, and other sources into one place.",
        image: "1.webp"
      },
      {
        title: "CRM & sales pipelines",
        text: "Set up clients, statuses, tasks, and pipeline stages the way you sell.",
        image: "2.webp"
      },
      {
        title: "Client portals",
        text: "Build portals for customers, staff, or partners with the right features and roles.",
        image: "3.webp"
      },
      {
        title: "Admin panels",
        text: "Internal tools for leads, users, orders, content, and operations—tailored to your process.",
        image: "4.webp"
      },
      {
        title: "Notifications & reminders",
        text: "Automated alerts in Telegram, email, or inside your product.",
        image: "5.webp"
      },
      {
        title: "Reporting & analytics",
        text: "Dashboards and reports for the KPIs that matter.",
        image: "6.webp"
      },
      {
        title: "Payments & documents",
        text: "Payments, statuses, confirmations, documents, and post-payment logic.",
        image: "7.webp"
      },
      {
        title: "External integrations",
        text: "Connect site, CRM, Telegram, spreadsheets, payments, APIs, and more.",
        image: "8.webp"
      }
    ]
  },
  examples: {
    title: "Leads, portals, notifications, and payments in one flow.",
    body: "One system ties channels and leads, statuses and the customer journey, portals and admin, records and messages—without manual re-entry or lost inquiries.",
    srOnly: "One connected product flow"
  },
  ecosystemLabels: [
    "Telegram",
    "Email",
    "CRM",
    "Sheets",
    "WhatsApp",
    "Notion",
    "Calendar",
    "Tasks",
    "Payments",
    "Documents",
    "Reports",
    "Automation",
    "Notifications"
  ],
  results: {
    title: "What you get when we’re done",
    folderLabel: "Delivery folder",
    folderMeta: (count) => `${count} deliverables after the project`,
    cta: "See what we could build for you",
    items: [
      "A clear structure for the future system",
      "A prototype of screens and logic",
      "A web service or internal tool for your process",
      "An admin panel to operate it",
      "Integrations with the services you need",
      "Notifications, statuses, and automated actions",
      "Launch support and a path to iterate"
    ]
  },
  whyTivonix: {
    bandTitle: "Automation shaped around your business",
    points: [
      {
        title: "Not just a site—a working system",
        text: "We think end-to-end: leads, data, users, processes, admin, integrations, and what comes after launch."
      },
      {
        title: "Plain-language explanations",
        text: "No jargon overload—what to build, why it matters, and how it helps the business."
      },
      {
        title: "You can start with an MVP",
        text: "You don’t need the full platform on day one; a first working version often wins, then we grow it step by step."
      },
      {
        title: "We own the full process",
        text: "Structure, design, development, integrations, testing, and launch—one team."
      }
    ]
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "How much does business automation cost?",
        a: "It depends on scope: roles, screens, logic, integrations, and scenarios. After a short discovery we can give a budget range."
      },
      {
        q: "How long does development take?",
        a: "It varies with complexity. Smaller systems ship faster; larger ones need more phases. Starting with an MVP is often best."
      },
      {
        q: "Can we automate just one process?",
        a: "Yes—and often that’s ideal. For example, automate leads first, then add portals, analytics, or payments later."
      },
      {
        q: "Do you integrate Telegram, payments, and other services?",
        a: "Yes—Telegram, email, payments, CRM, spreadsheets, APIs, and more."
      },
      {
        q: "SaaS product or custom build?",
        a: "For generic tasks, SaaS can work. For unique logic and processes, custom usually fits better."
      },
      {
        q: "Do I need a full technical specification?",
        a: "No. A plain-language description is enough to start—we help shape structure and the first milestone."
      }
    ]
  },
  ctaBlock: {
    title: "We’ll show what automation can look like for you",
    body: "Tell us how your business runs today. We’ll map processes, spot automation wins, and propose a clear path—from a simple internal tool to a full web service.",
    primary: "Book a consultation",
    secondary: "Message on Telegram",
    footnote: "We usually reply within a day with a sensible first step."
  },
  common: { imageFallback: "Image coming soon" }
};
function getAutomationPageCopy(lang) {
  return lang === "en" ? en : ru;
}
const AUTOMATION_SIGNS_IMG_DIR = "/images/avtomatizaciya-biznesa/Когда уже пора";
const AUTOMATION_HERO_IMG = "/images/avtomatizaciya-biznesa/hero.webp";
const AUTOMATION_CONTACT_EMAIL = "tivoonix@gmail.com";
const WHY_TIVONIX_BAND_IMG = "/images/sunset.webp";
const TIVONIX_LOGO_MARK = "/images/tivonix-logo-icon.webp";
const HeroWebGLBg = lazy(() => import("./assets/HeroWebGLBg-CnY8eKt4.js"));
const PAIN_POINTS_IMG_DIR = "/images/avtomatizaciya-biznesa/Где бизнес теряет";
function usePrefetchHeroWebGL() {
  useEffect(() => {
    void import("./assets/HeroWebGLBg-CnY8eKt4.js");
  }, []);
}
const WHY_AUTOMATION_SMOKE_BASE = "radial-gradient(120% 90% at 55% 35%, rgba(255,154,61,0.18) 0%, rgba(255,106,26,0.10) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)";
const WHY_AUTOMATION_ORANGE_LAYER = "linear-gradient(180deg,rgba(255,174,87,0.34)_0%,rgba(255,138,30,0.22)_38%,rgba(255,120,48,0.12)_72%,rgba(0,0,0,0.14)_100%)";
function SmokeWebGLLayer({
  className,
  quality = "low",
  opaqueBuffer = false
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        rootMargin: "260px 0px 260px 0px",
        threshold: 0.01
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsx("div", { ref, className, children: inView ? /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(HeroWebGLBg, { interactive: false, quality, opaqueBuffer }) }) : null });
}
function HeroTextSmokeBg() {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "pointer-events-none relative isolate h-[500px] w-full overflow-hidden rounded-b-[40px] bg-black sm:h-[540px] sm:rounded-b-[52px]",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: WHY_AUTOMATION_SMOKE_BASE } }),
        /* @__PURE__ */ jsx(
          SmokeWebGLLayer,
          {
            className: "absolute inset-0 h-full w-full scale-[1.03] bg-black opacity-100",
            quality: "high",
            opaqueBuffer: true
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1]", style: { background: WHY_AUTOMATION_ORANGE_LAYER } }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.1)_46%,rgba(0,0,0,0.86)_100%)]" })
      ]
    }
  );
}
const AUTOMATION_FEATURES_IMG_DIR = "/images/avtomatizaciya-biznesa/Что можно автоматизировать";
const whyAutomationBenefitIcons = [
  { icon: Bot, iconColor: "#38BDF8" },
  { icon: Zap, iconColor: "#FACC15" },
  { icon: LayoutDashboard, iconColor: "#C084FC" },
  { icon: Users, iconColor: "#4ADE80" },
  { icon: TrendingUp, iconColor: "#FB923C" },
  { icon: ShieldCheck, iconColor: "#2DD4BF" }
];
function DotList({
  items,
  variant = "grid",
  tossIn = false
}) {
  const ulRef = useRef(null);
  const [revealed, setRevealed] = useState(!tossIn);
  useEffect(() => {
    if (!tossIn) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const el = ulRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setRevealed(true);
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tossIn]);
  const ulClass = variant === "stack" ? "mx-auto flex w-full max-w-xl flex-col gap-3.5" : "grid gap-3.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3.5";
  return /* @__PURE__ */ jsx("ul", { ref: tossIn ? ulRef : void 0, className: ulClass, children: items.map((item, i) => /* @__PURE__ */ jsxs(
    "li",
    {
      className: "flex items-start gap-3 text-[14.5px] leading-[1.75] text-white/78 sm:text-[15px] " + (tossIn ? revealed ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-[0.52s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]" : "-translate-y-7 opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-0" : ""),
      style: tossIn && revealed ? { transitionDelay: `${i * 72}ms` } : void 0,
      children: [
        /* @__PURE__ */ jsx(
          Check,
          {
            className: "mt-[3px] h-[1.05em] w-[1.05em] shrink-0 text-[#FF9A3D]",
            strokeWidth: 2.5,
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsx("span", { children: item })
      ]
    },
    item
  )) });
}
function AutomationHero({ t }) {
  const [b1, b2, b3] = t.hero.badges;
  return /* @__PURE__ */ jsx(Section, { className: "relative overflow-x-hidden overflow-y-visible pb-16 pt-0 sm:pb-20", children: /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden px-4 py-8 text-center sm:px-8 sm:py-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: `relative z-10 mt-5 ${automationTypo.h1}`, children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: t.hero.h1Line1 }),
        /* @__PURE__ */ jsx("span", { className: "block", children: t.hero.h1Line2 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "relative z-10 mx-auto mt-8 max-w-[40rem] text-[17px] font-medium leading-[1.55] text-white/85 sm:text-[19px] sm:leading-[1.6] lg:text-[20px]", children: t.hero.subtitle }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto mt-5 flex flex-wrap justify-center gap-2.5", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: TG_BOT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold tracking-tight text-neutral-900 shadow-sm transition hover:bg-white/92 active:translate-y-px sm:px-5 sm:text-[14px]",
            children: t.hero.microCtaTelegram
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `mailto:${AUTOMATION_CONTACT_EMAIL}?subject=${encodeURIComponent(t.hero.microCtaEmailSubject)}`,
            className: "inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold tracking-tight text-neutral-900 shadow-sm transition hover:bg-white/92 active:translate-y-px sm:px-5 sm:text-[14px]",
            children: t.hero.microCtaEmail
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-[8rem] text-center sm:mt-7 md:mt-9 lg:mt-10", children: /* @__PURE__ */ jsxs("div", { className: "mt-[calc(3.25rem+12px)] flex flex-wrap justify-center gap-3 text-[13px] sm:mt-3 sm:text-[14px]", children: [
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#FF8A1E]/20 px-4 py-1.5 text-[#FFB55C]", children: b1 }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#FF8A1E]/20 px-4 py-1.5 text-[#FFB55C]", children: b2 }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#FF8A1E]/20 px-4 py-1.5 text-[#FFB55C]", children: b3 })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative left-1/2 mt-16 w-[109vw] max-w-none -translate-x-1/2 bg-black px-0 sm:left-auto sm:mx-auto sm:mt-20 sm:w-full sm:max-w-[min(100%,1280px)] sm:translate-x-0 sm:px-2", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: AUTOMATION_HERO_IMG,
          alt: t.hero.heroImgAlt,
          loading: "eager",
          decoding: "async",
          draggable: false,
          className: "h-[55vw] min-h-[268px] w-full object-cover sm:h-auto sm:min-h-0 sm:rounded-none"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-5 flex justify-center px-4 sm:absolute sm:inset-x-0 sm:bottom-6 sm:mt-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://t.me/TIVONIX",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex h-[56px] items-center justify-center rounded-2xl bg-[#FF8A1E] px-7 text-[16px] font-[780] tracking-[-0.01em] text-black shadow-[0_18px_70px_rgba(0,0,0,.55)] transition hover:opacity-95 active:translate-y-px sm:h-[60px] sm:px-9 sm:text-[17px]",
            children: t.hero.ctaDiscuss
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/projects",
            className: "inline-flex h-[56px] items-center justify-center rounded-2xl bg-white/[0.08] px-7 text-[16px] font-[780] text-white/90 transition hover:bg-white/[0.13] active:translate-y-px sm:h-[60px] sm:px-8 sm:text-[17px]",
            children: t.hero.ctaCases
          }
        )
      ] }) })
    ] })
  ] }) }) }) });
}
function WhyBenefitCardSmoke({
  seed,
  icon: Icon2,
  iconColor
}) {
  const ax = 48 + seed % 3 * 10;
  const ay = 30 + seed % 4 * 10;
  const base = `radial-gradient(120% 90% at ${ax}% ${ay}%, rgba(255,154,61,0.3) 0%, rgba(255,106,26,0.18) 36%, rgba(0,0,0,0) 64%), linear-gradient(180deg, #000000 0%, #030303 100%)`;
  return /* @__PURE__ */ jsxs("div", { className: "relative isolate aspect-[4/3] w-full overflow-hidden bg-black", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: base }, "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1]", style: { background: WHY_AUTOMATION_ORANGE_LAYER }, "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.16)_46%,rgba(0,0,0,0.86)_100%)]" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[3] flex items-center justify-center", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex h-[132px] w-[132px] items-center justify-center rounded-[22%] bg-[#1a1a1a] sm:h-40 sm:w-40",
        style: {
          boxShadow: `0 18px 52px rgb(0 0 0 / 0.5), 0 0 48px ${iconColor}`
        },
        children: /* @__PURE__ */ jsx(
          Icon2,
          {
            className: "h-[68px] w-[68px] sm:h-20 sm:w-20",
            style: { color: iconColor },
            strokeWidth: 1.35,
            "aria-hidden": true
          }
        )
      }
    ) })
  ] });
}
function AutomationSlideTextSmokeBg({ seed, webGl }) {
  const ax = 48 + seed % 3 * 10;
  const ay = 30 + seed % 4 * 10;
  const base = `radial-gradient(120% 90% at ${ax}% ${ay}%, rgba(255,154,61,0.22) 0%, rgba(255,106,26,0.13) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)`;
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: base } }),
    webGl ? /* @__PURE__ */ jsx(
      SmokeWebGLLayer,
      {
        className: "absolute inset-0 z-0 h-full w-full scale-[1.04] opacity-[0.72]",
        quality: "low"
      }
    ) : null,
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1]", style: { background: WHY_AUTOMATION_ORANGE_LAYER } }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.14)_44%,rgba(0,0,0,0.88)_100%)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[3] bg-gradient-to-br from-black/45 via-black/20 to-transparent" })
  ] });
}
function AutomationCTASmokeBg() {
  const seed = 2;
  const ax = 48 + seed % 3 * 10;
  const ay = 30 + seed % 4 * 10;
  const base = `radial-gradient(120% 90% at ${ax}% ${ay}%, rgba(255,154,61,0.24) 0%, rgba(255,106,26,0.14) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)`;
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[30px] bg-[linear-gradient(180deg,rgba(255,138,30,0.16),rgba(255,138,30,0.04))]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[30px]", style: { background: base } }),
    /* @__PURE__ */ jsx(
      SmokeWebGLLayer,
      {
        className: "absolute inset-0 z-0 h-full w-full scale-[1.04] rounded-[30px] opacity-[0.68]",
        quality: "low"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] rounded-[30px]", style: { background: WHY_AUTOMATION_ORANGE_LAYER } }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2] rounded-[30px] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.84)_100%)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[3] rounded-[30px] bg-gradient-to-br from-black/32 via-black/12 to-transparent" })
  ] });
}
function WhyAutomation({ t }) {
  return /* @__PURE__ */ jsxs(Section, { className: "relative scroll-mt-[92px] overflow-x-visible bg-black py-16 sm:scroll-mt-[100px] sm:py-20 xl:scroll-mt-[104px]", children: [
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center py-2 text-center sm:py-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: automationTypo.h2, children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: t.why.h2Line1 }),
        /* @__PURE__ */ jsx("span", { className: "block", children: t.why.h2Line2 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[48rem] text-[19px] leading-[1.64] text-white/84 sm:text-[22px] sm:leading-[1.58]", children: t.why.subtitle })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "no-scrollbar relative z-[1] mt-10 min-w-0 w-full overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth pb-2",
        style: { WebkitOverflowScrolling: "touch" },
        children: /* @__PURE__ */ jsx("div", { className: "flex w-max min-w-0 flex-nowrap gap-4 pr-4 pl-[max(1rem,calc((100vw-72rem)/2+1rem))] sm:gap-5 sm:pr-6 sm:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:gap-4 xl:gap-5", children: whyAutomationBenefitIcons.map((meta, index) => {
          const benefit = t.why.benefits[index];
          if (!benefit) return null;
          return /* @__PURE__ */ jsxs(
            "article",
            {
              className: "isolate flex min-h-0 w-[min(82vw,19rem)] shrink-0 flex-col overflow-hidden rounded-2xl bg-white/[0.05] sm:w-[19rem]",
              children: [
                /* @__PURE__ */ jsx(WhyBenefitCardSmoke, { seed: index, icon: meta.icon, iconColor: meta.iconColor }),
                /* @__PURE__ */ jsxs("div", { className: "p-5 sm:p-6", children: [
                  /* @__PURE__ */ jsx("h3", { className: automationTypo.h3, children: benefit.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-2.5 text-[16px] leading-[1.7] text-white/82 sm:text-[17px]", children: benefit.text })
                ] })
              ]
            },
            benefit.title
          );
        }) })
      }
    )
  ] });
}
function AutomationFeatureSlideImage({
  src,
  alt,
  className,
  imageFallback
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-center text-[13px] text-white/40 " + (className ?? ""),
        role: "img",
        "aria-label": alt,
        children: imageFallback
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt,
      loading: "eager",
      decoding: "async",
      draggable: false,
      onError: () => setFailed(true),
      className
    }
  );
}
function AutomationFeatures({ t }) {
  const slides = t.features.slides;
  const n = slides.length;
  const [active, setActive] = useState(0);
  const scrollerRef = useRef(null);
  const slideRefs = useRef([]);
  const syncActiveFromScroll = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const mid = root.scrollLeft + root.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < n; i++) {
      const el = slideRefs.current[i];
      if (!el) continue;
      const cMid = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(cMid - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setActive(best);
  }, [n]);
  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        syncActiveFromScroll();
      });
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);
    syncActiveFromScroll();
    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [syncActiveFromScroll]);
  const scrollToIndex = (i) => {
    const el = slideRefs.current[(i % n + n) % n];
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  };
  return /* @__PURE__ */ jsxs(Section, { className: "overflow-visible bg-black py-16 sm:py-20", children: [
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-3xl flex-col items-center py-2 text-center sm:py-4", children: /* @__PURE__ */ jsx("h2", { className: automationTypo.h2, children: t.features.title }) }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "mt-10 w-full overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        ref: scrollerRef,
        role: "region",
        "aria-roledescription": t.features.ariaCarousel,
        "aria-label": t.features.ariaRegion,
        style: {
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingLeft: "max(0.75rem, calc((100% - min(96vw, 80rem)) / 2))",
          paddingRight: "max(0.75rem, calc((100% - min(96vw, 80rem)) / 2))"
        },
        children: /* @__PURE__ */ jsx("div", { className: "flex w-max gap-2 sm:gap-3", children: slides.map((item, i) => {
          const imgSrc = encodeURI(`${AUTOMATION_FEATURES_IMG_DIR}/${item.image}`);
          const isActive = i === active;
          return /* @__PURE__ */ jsx(
            "article",
            {
              ref: (el) => {
                slideRefs.current[i] = el;
              },
              className: "w-[min(96vw,80rem)] shrink-0 snap-center snap-always overflow-hidden rounded-[24px] bg-black shadow-[0_28px_90px_rgba(0,0,0,0.5)] transition-[transform,opacity] duration-500 ease-out sm:rounded-[28px] " + (isActive ? "z-[1] scale-100 opacity-100" : "z-0 scale-[0.94] opacity-[0.5] sm:scale-[0.96] sm:opacity-[0.58]"),
              style: { transformOrigin: "center center" },
              "aria-current": isActive ? "true" : void 0,
              children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-[min(84vw,36rem)] flex-col lg:h-[min(68vh,680px)] lg:min-h-[min(68vh,680px)] lg:flex-row lg:items-stretch", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative flex min-h-0 w-full flex-1 flex-col overflow-hidden px-7 pb-11 pt-9 sm:px-12 sm:pb-14 sm:pt-11 lg:h-full lg:w-1/2 lg:max-w-none lg:flex-none lg:shrink-0 lg:py-14 lg:pl-14 lg:pr-12", children: [
                  /* @__PURE__ */ jsx(AutomationSlideTextSmokeBg, { seed: i, webGl: isActive }),
                  /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex min-h-0 flex-1 flex-col", children: [
                    /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: TIVONIX_LOGO_MARK,
                        alt: "TIVONIX",
                        width: 44,
                        height: 44,
                        decoding: "async",
                        className: "h-10 w-10 object-contain opacity-[0.96] sm:h-11 sm:w-11"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-1 flex-col justify-center sm:mt-11 lg:mt-12", children: [
                      /* @__PURE__ */ jsx("h3", { className: `max-w-none ${automationTypo.h3Lg}`, children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[48ch] text-[17px] leading-[1.72] text-white/62 sm:mt-7 sm:text-[19px] sm:leading-[1.74] lg:mt-8 lg:text-[21px] lg:leading-[1.72]", children: item.text })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "relative isolate z-0 min-h-[min(92vw,32rem)] w-full flex-1 bg-[#0a0a0a] sm:min-h-[min(64vw,28rem)] lg:h-full lg:min-h-0 lg:w-1/2 lg:flex-none lg:min-w-0", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-3 z-0 sm:inset-4 lg:inset-0", children: /* @__PURE__ */ jsx(
                  AutomationFeatureSlideImage,
                  {
                    src: imgSrc,
                    alt: item.title,
                    imageFallback: t.common.imageFallback,
                    className: "pointer-events-none h-full w-full object-contain object-center lg:object-cover"
                  }
                ) }) })
              ] })
            },
            item.title
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mt-10", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center sm:justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": t.features.prev,
          className: "flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14] active:scale-[0.97]",
          onClick: () => scrollToIndex(active - 1),
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5", strokeWidth: 2 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "aria-label": t.features.next,
          className: "flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14] active:scale-[0.97]",
          onClick: () => scrollToIndex(active + 1),
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-5 w-5", strokeWidth: 2 })
        }
      )
    ] }) }) }) })
  ] });
}
function RealExamples({ t }) {
  return /* @__PURE__ */ jsx(Section, { className: "relative overflow-hidden bg-black py-16 sm:py-20", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-3xl flex-col items-center py-2 text-center sm:py-4 lg:max-w-4xl", children: [
      /* @__PURE__ */ jsx("p", { className: "sr-only", children: t.examples.srOnly }),
      /* @__PURE__ */ jsx("h2", { className: `${automationTypo.h2} max-w-[56rem]`, "aria-label": t.examples.title, children: t.examples.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-[40rem] text-[15px] leading-[1.65] text-white/72 sm:text-[17px] sm:leading-[1.6]", children: t.examples.body })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mt-12 sm:mt-14 lg:mt-16", children: /* @__PURE__ */ jsx(
      AutomationEcosystemMap,
      {
        logoSrc: TIVONIX_LOGO_MARK,
        smokeBase: WHY_AUTOMATION_SMOKE_BASE,
        orangeLayer: WHY_AUTOMATION_ORANGE_LAYER,
        badgeLabels: t.ecosystemLabels
      }
    ) })
  ] }) }) });
}
function ResultsSection({ t }) {
  const items = t.results.items;
  const count = items.length;
  return /* @__PURE__ */ jsx(Section, { className: "bg-black py-16 sm:py-20", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-3xl flex-col items-center py-2 text-center sm:py-4", children: /* @__PURE__ */ jsx("h2", { id: "automation-results-heading", className: automationTypo.h2, children: t.results.title }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-10 w-full max-w-[min(100%,26rem)] sm:max-w-[32rem] lg:max-w-[36rem]", children: [
      /* @__PURE__ */ jsx("div", { className: "relative z-20 flex justify-center sm:justify-start sm:pl-1", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 rounded-t-2xl bg-[linear-gradient(180deg,rgba(32,32,32,0.98),rgba(12,12,12,0.99))] px-5 py-2.5 shadow-[0_-8px_32px_rgba(0,0,0,0.42)] sm:gap-3 sm:rounded-t-[18px] sm:px-6 sm:py-3", children: [
        /* @__PURE__ */ jsx(FolderOpen, { className: "h-6 w-6 shrink-0 text-[#FF9A3D] sm:h-7 sm:w-7", strokeWidth: 1.85, "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { className: "text-left leading-tight", children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-[11px] font-[760] uppercase tracking-[0.16em] text-[#FFB56C]/95 sm:text-[12px]", children: t.results.folderLabel }),
          /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[12px] font-[550] text-white/45 sm:text-[13px]", children: t.results.folderMeta(count) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "article",
        {
          className: "relative z-10 -mt-1 overflow-hidden rounded-[22px] rounded-tl-sm bg-[linear-gradient(165deg,rgba(28,28,28,0.97)_0%,rgba(8,8,8,0.99)_55%)] shadow-[0_28px_72px_rgba(0,0,0,0.52)] sm:rounded-[26px] sm:rounded-tl-md",
          "aria-labelledby": "automation-results-heading",
          children: [
            /* @__PURE__ */ jsx("div", { className: "px-5 py-7 sm:px-8 sm:py-9", children: /* @__PURE__ */ jsx(DotList, { items, variant: "stack", tossIn: true }) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center bg-black/35 px-5 py-6 sm:px-8 sm:py-7", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://t.me/TIVONIX",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex h-[50px] w-full max-w-[min(100%,20rem)] items-center justify-center rounded-2xl bg-[#FF8A1E] px-6 text-[15px] font-[780] tracking-[-0.01em] text-black shadow-[0_14px_44px_rgba(255,106,40,0.28)] transition hover:opacity-95 active:translate-y-px sm:h-[54px] sm:max-w-none sm:px-10 sm:text-[16px]",
                children: t.results.cta
              }
            ) })
          ]
        }
      )
    ] })
  ] }) });
}
function WhyTivonix({ t }) {
  const points = t.whyTivonix.points;
  return /* @__PURE__ */ jsxs(Section, { className: "relative overflow-hidden bg-black !pt-6 !pb-12 sm:!pt-8 sm:!pb-16", children: [
    /* @__PURE__ */ jsx("div", { className: "relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-black", children: /* @__PURE__ */ jsxs("div", { className: "relative isolate h-56 overflow-hidden bg-black sm:h-64 lg:h-72", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: WHY_TIVONIX_BAND_IMG,
          alt: "",
          loading: "lazy",
          decoding: "async",
          draggable: false,
          className: "absolute inset-0 z-0 h-full w-full object-cover object-center"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/75",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 z-[2] bg-[radial-gradient(ellipse_95%_80%_at_50%_45%,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.82)_100%)]",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("h2", { className: `mx-auto max-w-[44rem] text-center ${automationTypo.h2}`, children: t.whyTivonix.bandTitle }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "relative z-10 -mt-3 sm:-mt-5 lg:-mt-6", children: /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-white/[0.08] sm:grid-cols-2", children: points.map((item, index) => /* @__PURE__ */ jsxs(
      "article",
      {
        className: "relative min-h-[17rem] overflow-hidden bg-[#050505] px-6 py-7 sm:px-8 sm:py-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "mb-7 text-[12px] font-[850] uppercase tracking-[0.18em] text-[#ff8a1e]", children: String(index + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("h3", { className: `max-w-[28rem] ${automationTypo.h3Lg}`, children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-[31rem] text-[15px] font-[600] leading-[1.7] text-white/76 sm:text-[17px]", children: item.text }),
          /* @__PURE__ */ jsx(
            "div",
            {
              "aria-hidden": true,
              className: "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff7a1a]/75 to-transparent"
            }
          )
        ]
      },
      item.title
    )) }) }) })
  ] });
}
function AutomationFaqPlusHaze({ expanded }) {
  const base = "linear-gradient(180deg, #101010 0%, #050505 100%)";
  return /* @__PURE__ */ jsx("span", { className: "relative flex h-12 w-12 shrink-0 items-center justify-center", children: /* @__PURE__ */ jsxs("span", { className: "relative h-12 w-12 overflow-hidden rounded-full bg-black shadow-[0_0_18px_rgba(0,0,0,0.36)] ring-1 ring-white/[0.14]", children: [
    /* @__PURE__ */ jsx("span", { className: "absolute inset-0", style: { background: base }, "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[1] bg-gradient-to-b from-white/[0.03] to-transparent", "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 z-[3] flex items-center justify-center", children: /* @__PURE__ */ jsx(
      Plus,
      {
        className: `h-[19px] w-[19px] text-white transition-transform duration-300 ease-out ${expanded ? "rotate-45" : ""}`,
        strokeWidth: 2,
        "aria-hidden": true
      }
    ) })
  ] }) });
}
function AutomationFAQ({ t }) {
  const [open, setOpen] = useState(null);
  const faqs = t.faq.items;
  return /* @__PURE__ */ jsx(Section, { className: "bg-black py-16 sm:py-20", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsx("h2", { className: automationTypo.h2, children: t.faq.title }) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:mt-10 sm:gap-3.5", children: faqs.map((item, index) => {
      const active = open === index;
      return /* @__PURE__ */ jsxs(
        "article",
        {
          className: "overflow-hidden rounded-3xl bg-[#1a1a1a] px-5 py-4 ring-1 transition-[background-color,box-shadow] duration-300 ease-out sm:px-6 sm:py-[1.125rem] " + (active ? "ring-white/[0.14] shadow-[0_12px_36px_rgba(0,0,0,0.34)]" : "ring-white/[0.07] shadow-none"),
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                "aria-expanded": active,
                onClick: () => setOpen((prev) => prev === index ? null : index),
                className: "flex w-full items-start justify-between gap-4 text-left",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "min-w-0 pt-1 font-display text-[16px] font-[760] leading-snug tracking-[-0.02em] text-white sm:text-[17px]", children: item.q }),
                  /* @__PURE__ */ jsx(AutomationFaqPlusHaze, { expanded: active })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${active ? "mt-2.5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`,
                children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx("p", { className: "text-left text-[14.5px] leading-[1.75] text-white/65 sm:text-[15px] sm:leading-[1.72]", children: item.a }) })
              }
            )
          ]
        },
        item.q
      );
    }) })
  ] }) });
}
function AutomationCTA({ t }) {
  return /* @__PURE__ */ jsx(Section, { className: "py-16 sm:py-20", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[30px] border border-white/[0.09] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:p-10", children: [
    /* @__PURE__ */ jsx(AutomationCTASmokeBg, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: TIVONIX_LOGO_MARK,
          alt: "TIVONIX",
          width: 52,
          height: 52,
          decoding: "async",
          className: "h-11 w-11 object-contain opacity-[0.96] sm:h-[52px] sm:w-[52px]"
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: `mt-5 ${automationTypo.h2}`, children: t.ctaBlock.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-[78ch] text-[15px] leading-[1.75] text-white/72 sm:text-[16.5px]", children: t.ctaBlock.body }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://t.me/TIVONIX",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex h-[54px] items-center justify-center rounded-2xl bg-[#FF8A1E] px-6 text-[15px] font-[780] tracking-[-0.01em] text-black shadow-[0_18px_70px_rgba(0,0,0,.55)] transition hover:opacity-95 active:translate-y-px sm:h-[58px] sm:px-8 sm:text-[16px]",
            children: t.ctaBlock.primary
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://t.me/TIVONIX",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex h-[54px] items-center justify-center rounded-2xl bg-white/[0.08] px-6 text-[15px] font-[780] text-white/90 transition hover:bg-white/[0.13] active:translate-y-px sm:h-[58px] sm:px-7 sm:text-[16px]",
            children: t.ctaBlock.secondary
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-[13px] leading-[1.65] text-white/58 sm:text-[13.5px]", children: t.ctaBlock.footnote })
    ] })
  ] }) }) });
}
function AutomationBusinessPage() {
  usePrefetchHeroWebGL();
  const { lang } = useLang();
  const t = useMemo(() => getAutomationPageCopy(lang), [lang]);
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: t.schemaServiceName,
      serviceType: "Automation and custom web systems",
      provider: { "@type": "Organization", name: "TIVONIX" },
      areaServed: "CIS",
      url: "https://tivonix.tech/avtomatizaciya-biznesa"
    }),
    [t.schemaServiceName]
  );
  return /* @__PURE__ */ jsx("div", { className: "relative min-h-screen bg-black font-sans antialiased", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 isolate", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center", children: /* @__PURE__ */ jsx(HeroTextSmokeBg, {}) }),
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: t.seo.title,
        description: t.seo.description,
        canonicalPath: "/avtomatizaciya-biznesa",
        schemaJsonLd: schema,
        ogLocalePrimary: lang === "en" ? "en_US" : "ru_RU"
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 min-w-0 overflow-x-visible", children: [
      /* @__PURE__ */ jsx(AutomationHero, { t }),
      /* @__PURE__ */ jsx(
        AutomationSignsScrollSection,
        {
          smokeBase: WHY_AUTOMATION_SMOKE_BASE,
          orangeLayer: WHY_AUTOMATION_ORANGE_LAYER,
          imageDir: AUTOMATION_SIGNS_IMG_DIR,
          sectionTitle: t.signs.sectionTitle,
          sectionLead: t.signs.sectionLead,
          ariaList: t.signs.ariaList,
          items: t.signs.items
        }
      ),
      /* @__PURE__ */ jsx(WhyAutomation, { t }),
      /* @__PURE__ */ jsx(
        PainPointsBlock,
        {
          items: t.pain.items,
          imageDir: PAIN_POINTS_IMG_DIR,
          smokeBase: WHY_AUTOMATION_SMOKE_BASE,
          orangeLayer: WHY_AUTOMATION_ORANGE_LAYER,
          sectionTitle: t.pain.title,
          sectionLead: t.pain.lead
        }
      ),
      /* @__PURE__ */ jsx(AutomationFeatures, { t }),
      /* @__PURE__ */ jsx(RealExamples, { t }),
      /* @__PURE__ */ jsx(ResultsSection, { t }),
      /* @__PURE__ */ jsx(WhyTivonix, { t }),
      /* @__PURE__ */ jsx(AutomationFAQ, { t }),
      /* @__PURE__ */ jsx(AutomationCTA, { t })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
function cx$2(...parts) {
  return parts.filter(Boolean).join(" ");
}
function PricingFAQSection() {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  const [openId, setOpenId] = useState(copy.faq.items[0]?.id ?? null);
  return /* @__PURE__ */ jsx(Reveal, { delay: 160, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs("div", { className: "pricing-faq border border-white/[0.1] bg-black", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-white/[0.08] px-4 py-4 sm:px-5", children: /* @__PURE__ */ jsx("h3", { className: "font-hero text-[1.15rem] font-semibold tracking-[-0.02em] text-white sm:text-[1.25rem]", children: copy.faq.title }) }),
    /* @__PURE__ */ jsx("div", { children: copy.faq.items.map((item) => {
      const open = openId === item.id;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx$2(
            "border-b border-white/[0.08] last:border-b-0",
            open && "bg-white/[0.035]"
          ),
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setOpenId((prev) => prev === item.id ? null : item.id),
                className: cx$2(
                  "flex w-full items-center justify-between gap-4 px-4 text-left sm:px-5",
                  open ? "pb-3 pt-4" : "py-4"
                ),
                "aria-expanded": open,
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cx$2(
                        "text-[14px] font-semibold",
                        open ? "text-white" : "text-white/92"
                      ),
                      children: item.q
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    ChevronDown,
                    {
                      size: 16,
                      className: cx$2(
                        "shrink-0 transition",
                        open ? "rotate-180 text-[#FF9A3D]" : "text-white/45"
                      ),
                      "aria-hidden": true
                    }
                  )
                ]
              }
            ),
            open ? /* @__PURE__ */ jsx("div", { className: "px-4 pb-5 sm:px-5", children: /* @__PURE__ */ jsx("p", { className: "max-w-[62ch] border-l-2 border-[#FF9A3D]/55 pl-3.5 text-[14px] leading-[1.7] text-white/82", children: item.a }) }) : null
          ]
        },
        item.id
      );
    }) })
  ] }) });
}
const SCOPE_LEVEL = {
  start: 2,
  growth: 4,
  product: 6,
  custom: 8
};
const SEGMENTS = 8;
function cx$1(...parts) {
  return parts.filter(Boolean).join(" ");
}
function PricingPlanScopeGrid({ onPlanAction }) {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  return /* @__PURE__ */ jsxs("div", { className: "pricing-plan-scope", children: [
    /* @__PURE__ */ jsx("p", { className: "pricing-plan-scope__caption", children: copy.footer.planScopeCaption }),
    /* @__PURE__ */ jsx("div", { className: "pricing-plan-scope__grid", children: PLAN_IDS.map((planId) => {
      const plan = PLANS.find((p) => p.id === planId);
      const planCopy = copy.plans[planId];
      const filled = SCOPE_LEVEL[planId];
      const isGrowth = plan.highlight;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onPlanAction(planId),
          className: cx$1(
            "pricing-plan-scope__col",
            isGrowth && "pricing-plan-scope__col--growth"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "pricing-plan-scope__head", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$1(
                    "pricing-plan-scope__name font-hero font-semibold tracking-[-0.02em]",
                    isGrowth ? "text-[#FF9A3D]" : "text-white"
                  ),
                  children: planCopy.name
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$1(
                    "pricing-plan-scope__price-old text-[10px] font-medium line-through",
                    planCopy.priceOriginal ? "text-white/35" : "text-transparent"
                  ),
                  "aria-hidden": !planCopy.priceOriginal,
                  children: planCopy.priceOriginal ?? " "
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$1(
                    "pricing-plan-scope__price font-hero text-[13px] font-semibold text-[#FF9A3D]"
                  ),
                  children: planCopy.price
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-scope__bars", "aria-hidden": true, children: Array.from({ length: SEGMENTS }).map((_, index) => {
              const on = index < filled;
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$1("pricing-plan-scope__bar", on && "pricing-plan-scope__bar--on")
                },
                index
              );
            }) })
          ]
        },
        planId
      );
    }) })
  ] });
}
const COMPARE_LOGO = "/images/tivonix-logo-white.webp";
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function PlanCtaButton({
  featured,
  compact,
  onClick,
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: cx(
        "inline-flex w-full items-center justify-center rounded-full border-0 font-bold tracking-[-0.015em] transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "active:scale-[0.98]",
        compact ? "h-9 text-[12px] sm:h-10 sm:text-[13px]" : "h-11 px-7 text-[14px]",
        featured ? "bg-[#FF9A3D] text-black hover:bg-[#FFB05C]" : "bg-white text-black hover:bg-white/92",
        className
      ),
      children
    }
  );
}
function openPlanTelegram(planId) {
  window.open(buildPricingPlanTelegramUrl(planId), "_blank", "noopener,noreferrer");
}
function ComparisonValue({
  cell,
  labels,
  textLabels
}) {
  if (cell.kind === "yes") {
    return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center text-[#FF9A3D]", "aria-label": labels.yes, children: /* @__PURE__ */ jsx(Check, { size: 15, strokeWidth: 2.25, "aria-hidden": true }) });
  }
  if (cell.kind === "no") {
    return /* @__PURE__ */ jsx("span", { className: "text-white/28", "aria-label": labels.no, children: /* @__PURE__ */ jsx(Minus, { size: 15, strokeWidth: 1.75, "aria-hidden": true }) });
  }
  const label = cell.kind === "text" && cell.textKey ? textLabels[cell.textKey] : labels[cell.kind];
  return /* @__PURE__ */ jsx("span", { className: "text-[11px] font-medium text-white/50 sm:text-[12px]", children: label });
}
function ComparePlanHead({
  planId,
  name,
  price,
  priceOriginal,
  cta,
  featured,
  onAction,
  layout
}) {
  const isCustom = planId === "custom";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx(
        layout === "column" ? "pricing-compare__plan-head" : "pricing-compare__mobile-plan",
        featured && "pricing-compare__plan-head--featured"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cx(
              "pricing-compare__plan-name font-hero font-semibold tracking-[-0.02em]",
              layout === "column" ? "text-[15px] sm:text-[16px]" : "text-[14px]",
              featured ? "text-[#FF9A3D]" : "text-white"
            ),
            children: name
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cx(
              "pricing-compare__plan-original text-[11px] font-medium",
              priceOriginal ? "text-white/35 line-through" : "text-transparent"
            ),
            "aria-hidden": !priceOriginal,
            children: priceOriginal ?? " "
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cx(
              "pricing-compare__plan-price font-hero font-semibold leading-none tracking-[-0.02em]",
              layout === "column" ? "text-[14px] sm:text-[15px]" : "text-[13px]",
              isCustom ? "text-white" : "text-[#FF9A3D]"
            ),
            children: price
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pricing-compare__plan-cta", children: /* @__PURE__ */ jsx(PlanCtaButton, { compact: true, featured, onClick: onAction, className: "max-w-[148px]", children: cta }) })
      ]
    }
  );
}
function PlanPrice({ price, priceOriginal }) {
  const hasOriginal = Boolean(priceOriginal);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "p",
      {
        className: cx(
          "pricing-plan-card__price-original text-[13px] font-medium leading-[1.125]",
          hasOriginal ? "text-white/38 line-through" : "text-transparent"
        ),
        "aria-hidden": !hasOriginal,
        children: priceOriginal ?? " "
      }
    ),
    /* @__PURE__ */ jsx(
      "p",
      {
        className: cx(
          "pricing-plan-card__price-value mt-1 font-hero text-[clamp(1.65rem,2.2vw,2rem)] font-semibold leading-[1.05] tracking-[-0.03em]",
          hasOriginal ? "text-[#FF9A3D]" : "text-white"
        ),
        children: price
      }
    )
  ] });
}
function CompactPlanPrice({ price, priceOriginal }) {
  if (!priceOriginal) {
    return /* @__PURE__ */ jsx("p", { className: "mt-4 font-hero text-[1.45rem] font-semibold tracking-[-0.03em] text-white", children: price });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[12px] font-medium text-white/38 line-through", children: priceOriginal }),
    /* @__PURE__ */ jsx("p", { className: "mt-0.5 font-hero text-[1.45rem] font-semibold tracking-[-0.03em] text-[#FF9A3D]", children: price })
  ] });
}
function PlanCard({
  planId,
  highlight,
  badge,
  name,
  tagline,
  price,
  priceOriginal,
  desc,
  includes,
  cta,
  onCta
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: cx(
        "pricing-plan-card flex h-full flex-col",
        highlight && "pricing-plan-card--highlight",
        planId === "growth" && "pricing-plan-card--growth",
        planId === "product" && "pricing-plan-card--product"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pricing-plan-card__body flex flex-col p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-plan-card__head", children: [
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__badge-slot", children: badge ? /* @__PURE__ */ jsx("span", { className: "inline-flex w-fit whitespace-nowrap rounded-full bg-[#FF9A3D]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FF9A3D]", children: badge }) : null }),
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: cx(
                  "pricing-plan-card__name font-hero text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.03em]",
                  planId === "growth" ? "text-[#FF9A3D]" : "text-white"
                ),
                children: name
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: cx(
                  "pricing-plan-card__tagline mt-1 text-[13px] leading-[1.35]",
                  planId === "growth" ? "text-[#FF9A3D]/80" : "text-white/48"
                ),
                children: tagline
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__price-slot", children: /* @__PURE__ */ jsx(PlanPrice, { price, priceOriginal }) }),
            /* @__PURE__ */ jsx("p", { className: "pricing-plan-card__desc mt-4 text-[13px] leading-[1.6] text-white/52", children: desc })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__includes", children: /* @__PURE__ */ jsx("ul", { className: "pricing-plan-card__includes-list space-y-2", children: includes.map((item) => /* @__PURE__ */ jsxs("li", { className: "pricing-plan-card__includes-item flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/68", children: [
            /* @__PURE__ */ jsx(Check, { size: 13, className: "mt-0.5 shrink-0 text-[#FF9A3D]", strokeWidth: 2.25, "aria-hidden": true }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) }) }),
          /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__spacer flex-1", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__footer border-t border-white/[0.08] p-5 sm:p-6", children: /* @__PURE__ */ jsx(PlanCtaButton, { featured: planId === "growth", onClick: onCta, children: cta }) })
      ]
    }
  );
}
function CompactPlanCard({
  planId,
  name,
  shortDesc,
  price,
  priceOriginal,
  chips,
  compactCta,
  highlight,
  onCta
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: cx(
        "pricing-footer-card flex h-full flex-col",
        highlight && "pricing-footer-card--highlight",
        planId === "growth" && "pricing-footer-card--growth"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pricing-footer-card__body flex flex-col p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-footer-card__head", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-hero text-[1.1rem] font-semibold tracking-[-0.02em] text-white", children: name }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[12.5px] leading-relaxed text-white/48", children: shortDesc }),
            /* @__PURE__ */ jsx("div", { className: "pricing-footer-card__price-slot", children: /* @__PURE__ */ jsx(CompactPlanPrice, { price, priceOriginal }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pricing-footer-card__chips mt-auto pt-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: chips.map((chip) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-full border border-white/[0.12] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/58",
              children: chip
            },
            chip
          )) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pricing-footer-card__footer border-t border-white/[0.08] p-5 sm:p-6", children: /* @__PURE__ */ jsx(PlanCtaButton, { featured: planId === "growth", compact: true, onClick: onCta, children: compactCta }) })
      ]
    }
  );
}
function PricingPlansSection({ className }) {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  const [openGroups, setOpenGroups] = useState(
    () => Object.fromEntries(COMPARISON_GROUPS.map((g) => [g.id, true]))
  );
  const allExpanded = useMemo(
    () => COMPARISON_GROUPS.every((g) => openGroups[g.id]),
    [openGroups]
  );
  const toggleAll = () => {
    const next = !allExpanded;
    setOpenGroups(Object.fromEntries(COMPARISON_GROUPS.map((g) => [g.id, next])));
  };
  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handlePlanCta = (planId) => {
    openPlanTelegram(planId);
  };
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "pricing",
      className: cx(
        "scroll-mt-[var(--tivonix-header-spacer)] bg-black py-10 sm:py-20 lg:py-24",
        className
      ),
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto max-w-[48rem] text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.85rem,4.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white", children: copy.title }),
          /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-3 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 sm:mt-4", children: [
            /* @__PURE__ */ jsx("span", { className: "font-hero shrink-0 text-[clamp(1.85rem,3.8vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-[#FF9A3D]", children: copy.launchDiscount.percent }),
            /* @__PURE__ */ jsx("span", { className: "max-w-[42ch] text-center text-[11px] leading-snug text-[#FF9A3D]/72 sm:text-left sm:text-[12px]", children: copy.launchDiscount.note })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Reveal, { delay: 80, className: "pricing-plans-grid mt-10 sm:mt-12", children: PLANS.map((plan) => {
          const planCopy = copy.plans[plan.id];
          return /* @__PURE__ */ jsx(
            PlanCard,
            {
              planId: plan.id,
              highlight: plan.highlight,
              badge: plan.badgeKey ? copy.badges[plan.badgeKey] : void 0,
              name: planCopy.name,
              tagline: planCopy.tagline,
              price: planCopy.price,
              priceOriginal: planCopy.priceOriginal,
              desc: planCopy.desc,
              includes: planCopy.includes,
              cta: planCopy.cta,
              onCta: () => handlePlanCta(plan.id)
            },
            plan.id
          );
        }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 120, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs("div", { className: "pricing-compare", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-compare__intro", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-hero text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold tracking-[-0.03em] text-white", children: copy.compareTitle }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: toggleAll,
                className: "pricing-compare__toggle lg:hidden",
                children: allExpanded ? copy.collapseAll : copy.expandAll
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pricing-compare__mobile-plans lg:hidden", children: /* @__PURE__ */ jsx("div", { className: "pricing-compare__mobile-plans-scroll", children: PLAN_IDS.map((id) => {
            const planCopy = copy.plans[id];
            const plan = PLANS.find((p) => p.id === id);
            return /* @__PURE__ */ jsx(
              ComparePlanHead,
              {
                planId: id,
                name: planCopy.name,
                price: planCopy.price,
                priceOriginal: planCopy.priceOriginal,
                cta: planCopy.compactCta,
                featured: plan.highlight,
                onAction: () => handlePlanCta(id),
                layout: "card"
              },
              `mobile-head-${id}`
            );
          }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "pricing-compare__desktop hidden lg:block", children: [
            /* @__PURE__ */ jsxs("div", { className: "pricing-compare__head", children: [
              /* @__PURE__ */ jsx("div", { className: "pricing-compare__feature-col pricing-compare__feature-col--head", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: COMPARE_LOGO,
                  alt: "TIVONIX",
                  className: "pricing-compare__logo",
                  width: 176,
                  height: 40,
                  loading: "lazy",
                  decoding: "async"
                }
              ) }),
              PLAN_IDS.map((id) => {
                const planCopy = copy.plans[id];
                const plan = PLANS.find((p) => p.id === id);
                return /* @__PURE__ */ jsx(
                  ComparePlanHead,
                  {
                    planId: id,
                    name: planCopy.name,
                    price: planCopy.price,
                    priceOriginal: planCopy.priceOriginal,
                    cta: planCopy.compactCta,
                    featured: plan.highlight,
                    onAction: () => handlePlanCta(id),
                    layout: "column"
                  },
                  `head-${id}`
                );
              })
            ] }),
            COMPARISON_GROUPS.map((group) => /* @__PURE__ */ jsxs("div", { className: "pricing-compare__group", children: [
              /* @__PURE__ */ jsx("div", { className: "pricing-compare__group-title", children: copy.groups[group.id] }),
              group.rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "pricing-compare__row", children: [
                /* @__PURE__ */ jsx("div", { className: "pricing-compare__feature-col", children: copy.features[row.id] }),
                PLAN_IDS.map((planId) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cx(
                      "pricing-compare__plan-col",
                      planId === "growth" && "pricing-compare__plan-col--growth"
                    ),
                    children: /* @__PURE__ */ jsx(
                      ComparisonValue,
                      {
                        cell: row.values[planId],
                        labels: copy.cell,
                        textLabels: copy.cellText
                      }
                    )
                  },
                  planId
                ))
              ] }, row.id))
            ] }, group.id))
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pricing-compare__mobile lg:hidden", children: COMPARISON_GROUPS.map((group) => {
            const open = openGroups[group.id];
            return /* @__PURE__ */ jsxs("div", { className: "pricing-compare__mobile-group", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => toggleGroup(group.id),
                  className: "pricing-compare__mobile-group-btn",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: copy.groups[group.id] }),
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        size: 16,
                        className: cx("text-white/45 transition", open && "rotate-180"),
                        "aria-hidden": true
                      }
                    )
                  ]
                }
              ),
              open ? /* @__PURE__ */ jsx("div", { className: "pricing-compare__mobile-rows", children: group.rows.map((row) => /* @__PURE__ */ jsxs("div", { className: "pricing-compare__mobile-row", children: [
                /* @__PURE__ */ jsx("p", { className: "pricing-compare__mobile-feature", children: copy.features[row.id] }),
                /* @__PURE__ */ jsx("div", { className: "pricing-compare__mobile-values", children: PLAN_IDS.map((planId) => /* @__PURE__ */ jsxs("div", { className: "pricing-compare__mobile-value", children: [
                  /* @__PURE__ */ jsx("p", { className: "pricing-compare__mobile-plan-label", children: copy.plans[planId].name }),
                  /* @__PURE__ */ jsx(
                    ComparisonValue,
                    {
                      cell: row.values[planId],
                      labels: copy.cell,
                      textLabels: copy.cellText
                    }
                  )
                ] }, planId)) })
              ] }, row.id)) }) : null
            ] }, group.id);
          }) })
        ] }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 150, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs("div", { className: "pricing-value-band", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-value-band__copy", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-hero text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white", children: [
              copy.footer.valueTitle,
              " ",
              /* @__PURE__ */ jsx("span", { className: "pricing-value-band__highlight", children: copy.footer.valueTitleHighlight })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-[12px] text-white/38", children: copy.footer.valueAside }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-[38ch] text-[14px] leading-[1.65] text-white/50", children: copy.footer.valueLead })
          ] }),
          /* @__PURE__ */ jsx(PricingPlanScopeGrid, { onPlanAction: handlePlanCta })
        ] }) }),
        /* @__PURE__ */ jsx(PricingFAQSection, {}),
        /* @__PURE__ */ jsx(Reveal, { delay: 170, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsx("div", { className: "pricing-help-band", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: buildHelpPlanTelegramUrl(),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "pricing-help-band__link",
            children: copy.footer.helpCta
          }
        ) }) }),
        /* @__PURE__ */ jsx(Reveal, { delay: 180, className: "pricing-footer-grid mt-0 hidden md:grid", children: PLANS.map((plan) => {
          const planCopy = copy.plans[plan.id];
          return /* @__PURE__ */ jsx(
            CompactPlanCard,
            {
              planId: plan.id,
              name: planCopy.name,
              shortDesc: copy.footer.shortDesc[plan.id],
              price: planCopy.price,
              priceOriginal: planCopy.priceOriginal,
              chips: copy.footer.chips[plan.id],
              compactCta: planCopy.compactCta,
              highlight: plan.highlight,
              onCta: () => handlePlanCta(plan.id)
            },
            `footer-${plan.id}`
          );
        }) })
      ] })
    }
  );
}
function PricingPage() {
  const { lang } = useLang();
  const title = lang === "ru" ? "Планы запуска — TIVONIX" : "Launch plans — TIVONIX";
  const description = lang === "ru" ? "Тарифы TIVONIX: Start, Growth, Product и Custom — от лендинга с заявками до веб-сервиса с CRM, оплатой и автоматизацией." : "TIVONIX plans: Start, Growth, Product and Custom — from a lead page to a full web service with CRM, payments and automation.";
  const schemaJsonLd = buildPricingPageSchema({ pageTitle: title, pageDescription: description, lang });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-clip bg-[var(--bg)]", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title,
        description,
        canonicalPath: "/plans",
        ogLocalePrimary: lang === "en" ? "en_US" : "ru_RU",
        schemaJsonLd
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "top" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(PricingPlansSection, { className: "!pt-[calc(var(--tivonix-header-spacer)+1rem)] sm:!pt-[calc(var(--tivonix-header-spacer)+1.5rem)]" }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HEADER_OFFSET = 84;
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    });
  }, [pathname, hash]);
  return null;
}
function AppRoutes() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToHash, {}),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(LandingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/projects", element: /* @__PURE__ */ jsx(ProjectsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/projects/:slug", element: /* @__PURE__ */ jsx(ProjectDetailPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/plans", element: /* @__PURE__ */ jsx(PricingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contacts", element: /* @__PURE__ */ jsx(ContactsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/sozdanie-sajtov", element: /* @__PURE__ */ jsx(WebsiteCreationPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/avtomatizaciya-biznesa", element: /* @__PURE__ */ jsx(AutomationBusinessPage, {}) })
    ] })
  ] });
}
function render(url) {
  const helmetContext = {};
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(LangProvider, { children: /* @__PURE__ */ jsx(MemoryRouter, { initialEntries: [url], children: /* @__PURE__ */ jsx(AppRoutes, {}) }) }) }) })
  );
  const { helmet } = helmetContext;
  const headTags = [
    helmet?.title?.toString() ?? "",
    helmet?.meta?.toString() ?? "",
    helmet?.link?.toString() ?? "",
    helmet?.script?.toString() ?? ""
  ].filter(Boolean).join("\n");
  return { appHtml, headTags };
}
export {
  render
};
