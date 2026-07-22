import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useLocation, useNavigate, Link, useParams, Navigate, Routes, Route, MemoryRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { createContext, useState, useEffect, useMemo, useContext, useId, useRef, useCallback, useSyncExternalStore, useLayoutEffect, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { Check, ArrowUpRight, ChevronDown, Mail, Bot, Zap, LayoutDashboard, Users, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight, FolderOpen, Plus, Minus } from "lucide-react";
import { SiTelegram, SiGmail, SiHubspot, SiGooglesheets, SiWhatsapp, SiNotion, SiGooglecalendar, SiClickup, SiStripe, SiGoogledocs, SiGoogleanalytics, SiZapier } from "react-icons/si";
import { FiBell } from "react-icons/fi";
function detectLangFromUrl() {
  if (typeof window === "undefined") return "ru";
  try {
    const qp = new URL(window.location.href).searchParams.get("lang");
    if (qp === "ru" || qp === "en") return qp;
  } catch {
  }
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/ru" || path.startsWith("/ru/")) return "ru";
  if (path === "/partners") return "ru";
  return "ru";
}
function readBootstrapLang(fallback) {
  if (typeof window === "undefined") return fallback ?? "ru";
  const urlLang = detectLangFromUrl();
  const boot = window.__TIVONIX_LANG__;
  if (boot === "ru" || boot === "en") {
    return boot === urlLang ? boot : urlLang;
  }
  return fallback ?? urlLang;
}
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
      ctaExternal: "Открыть панель"
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
        { title: "maria_beauty", source: "Hi, I’d like a consultation about your services", time: "1 min", channel: "instagram" },
        { title: "Anna", source: "Can I book a manicure for Saturday?", time: "2 min", channel: "whatsapp" },
        { title: "Commercial proposal", source: "Sent the dev proposal — see the attachment", time: "3 min", channel: "gmail" },
        { title: "Website form", source: "Ivan · landing for ads · +1 555 123-4567", time: "4 min", channel: "website" },
        { title: "Ads · Leads", source: "New lead: automation for a beauty salon", time: "6 min", channel: "facebook" },
        { title: "Message", source: "Interested in lead automation — what’s the price?", time: "7 min", channel: "vk" },
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
      ctaExternal: "Open panel"
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
  return readBootstrapLang(detectLangFromUrl());
}
function syncHtmlLang(lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
}
function LangProvider({
  children,
  initialLang
}) {
  const [lang, setLangState] = useState(() => initialLang ?? detectLang());
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
function LangPathSync() {
  const { pathname } = useLocation();
  const { lang, setLang } = useLang();
  useEffect(() => {
    let next = null;
    const clean = pathname.replace(/\/+$/, "") || "/";
    if (clean === "/en" || clean.startsWith("/en/")) next = "en";
    else if (clean === "/ru" || clean.startsWith("/ru/")) next = "ru";
    else if (clean === "/partners") next = "ru";
    else if (clean === "/" || clean === "/plans" || clean === "/about" || clean === "/projects" || clean === "/contacts") {
      next = "ru";
    }
    if (next && next !== lang) setLang(next);
  }, [pathname, lang, setLang]);
  return null;
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
      title: "TIVONIX — сайты, CRM, боты и веб-продукты для бизнеса",
      description: "Разрабатываем лендинги, Telegram-ботов, CRM, личные кабинеты, SaaS и MVP — и связываем их в единый процесс: от первого обращения до оплаты."
    };
  }
  return {
    title: "TIVONIX — websites, CRM, bots and web products for business",
    description: "We build landing pages, Telegram bots, CRMs, client portals, SaaS and MVPs — and connect them into one lead process from first inquiry to payment."
  };
}
const LOADED_FLAG = "__tivonix_hotjar_loaded";
function hotjarId() {
  return null;
}
function hotjarSv() {
  const n = Number("6");
  return Number.isFinite(n) && n > 0 ? n : 6;
}
function alreadyLoaded() {
  if (typeof window === "undefined") return true;
  return Boolean(window[LOADED_FLAG]);
}
function markLoaded() {
  window[LOADED_FLAG] = true;
}
function initHotjar() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const id = hotjarId();
  if (!id) return;
  if (alreadyLoaded() || typeof window.hj === "function") {
    markLoaded();
    return;
  }
  const sv = hotjarSv();
  (function(h, o, t, j) {
    h.hj = h.hj || function(...args) {
      (h.hj.q = h.hj.q || []).push(args);
    };
    h._hjSettings = { hjid: id, hjsv: sv };
    const a = o.getElementsByTagName("head")[0];
    const r = o.createElement("script");
    r.async = true;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
  markLoaded();
}
function trackHotjarEvent(name) {
  if (typeof window === "undefined") return;
  if (typeof window.hj !== "function") return;
  if (!name) return;
  try {
    window.hj("event", name);
  } catch {
  }
}
const HOTJAR_MASK_CLASS = "hj-masked";
const HOTJAR_SUPPRESS_ATTR = { "data-hj-suppress": "" };
function trackPartnersEvent(eventName, params) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!eventName) return;
  window.gtag("event", eventName, params ?? {});
}
const CTA_SOURCE_KEY = "tivonix_cta_source";
function setCtaSource(source) {
  try {
    sessionStorage.setItem(CTA_SOURCE_KEY, source);
  } catch {
  }
}
function getCtaSource() {
  try {
    const v = sessionStorage.getItem(CTA_SOURCE_KEY);
    if (v) return v;
  } catch {
  }
  return "unknown";
}
function scrub(props) {
  if (!props) return void 0;
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    const key = k.toLowerCase();
    if (key.includes("email") || key.includes("phone") || key.includes("telegram") || key.includes("name") || key.includes("task") || key.includes("contact") || key.includes("message") || key.includes("detail")) {
      continue;
    }
    if (typeof v === "string" && v.length > 80) continue;
    out[k] = v;
  }
  return out;
}
function trackEvent(name, props) {
  const safe = scrub(props);
  trackHotjarEvent(name);
  trackPartnersEvent(name, safe);
}
function trackCtaPrimaryClick(source) {
  setCtaSource(source);
  trackEvent("cta_primary_click", { source });
  if (source === "hero") trackEvent("hero_primary_cta_click", { source });
}
function trackLeadFormOpen(source) {
  setCtaSource(source);
  trackEvent("lead_form_open", { source });
}
function trackLeadFormStart() {
  trackEvent("lead_form_start");
}
function trackLeadFormValidationError(field) {
  trackEvent("lead_form_validation_error", field ? { field } : void 0);
}
function trackLeadFormSubmit(source) {
  trackEvent("lead_form_submit", { source });
}
function trackLeadFormSuccess(source) {
  trackEvent("lead_form_success", { source });
}
function trackLeadFormServerError() {
  trackEvent("lead_form_server_error");
}
function trackLeadFormAbandon(source) {
  trackEvent("lead_form_abandon", { source });
}
function trackTelegramDirectClick() {
  trackEvent("telegram_direct_click");
}
function trackTelegramBotClick() {
  trackEvent("telegram_bot_click");
}
function trackEmailClick() {
  trackEvent("email_click");
}
function trackProjectView(slug) {
  trackEvent("project_view", { slug: slug.slice(0, 40) });
}
function trackPricingView() {
  trackEvent("pricing_view");
}
function leadFormCopy(lang) {
  const isRu = lang === "ru";
  return isRu ? COPY_RU$4 : COPY_EN$4;
}
const BUDGET_RU = [
  { id: "", label: "Не выбран" },
  { id: "under_500", label: "до $500" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "от $5,000" },
  { id: "unknown", label: "пока не знаю" }
];
const BUDGET_EN = [
  { id: "", label: "Not selected" },
  { id: "under_500", label: "under $500" },
  { id: "500_1500", label: "$500–1,500" },
  { id: "1500_5000", label: "$1,500–5,000" },
  { id: "from_5000", label: "from $5,000" },
  { id: "unknown", label: "not sure yet" }
];
const COPY_RU$4 = {
  title: "Расскажите, что нужно запустить",
  subtitle: "Опишите задачу своими словами. Мы разберём её и отправим предварительный план, срок и диапазон стоимости.",
  name: "Имя",
  nameOptional: "необязательно",
  contact: "Telegram, email или другой контакт",
  contactHint: "Email, Telegram или телефон",
  contactPh: "email, @username или +375…",
  task: "Описание задачи",
  taskPh: "Что нужно сделать?",
  budget: "Примерный бюджет",
  budgetOptional: "необязательно",
  budgets: BUDGET_RU,
  consent: "Согласен(на) с политикой обработки персональных данных",
  privacyLabel: "Политика",
  privacyHref: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
  send: "Получить предварительную оценку",
  sending: "Отправляю…",
  close: "Закрыть",
  cancel: "Отмена",
  errors: {
    contact: "Укажите email, Telegram или телефон.",
    task: "Кратко опишите задачу (хотя бы пару слов).",
    consent: "Нужно согласие с политикой конфиденциальности."
  },
  successTitle: "Заявка получена",
  success: "Изучим задачу и ответим по указанному контакту в течение рабочего дня.",
  successCase: "Посмотреть похожий кейс",
  successHome: "Вернуться на главную",
  errorTitle: "Не удалось отправить заявку",
  errorBody: "Можно написать напрямую:",
  fallbackEmail: "Написать на tivoonix@gmail.com",
  fallbackTelegram: "Открыть чат @TIVONIX",
  altTelegram: "Или написать в Telegram",
  altBot: "Telegram-бот",
  altEmail: "Email",
  sticky: "Получить оценку",
  ctaDiscuss: "Оценить проект",
  ctaEstimate: "Получить оценку проекта",
  ctaProjects: "Есть похожая задача? Обсудить проект",
  selectedPlan: "Выбранный план",
  clearPlan: "Без плана",
  planHint: "Заявка по тарифу — можно уточнить детали ниже.",
  formNote: "Ответим в течение рабочего дня. Созвон не обязателен. Контакты не передаём третьим лицам."
};
const COPY_EN$4 = {
  title: "Tell us what you need to launch",
  subtitle: "Describe the task in your own words. We’ll review it and send a preliminary plan, timeline and cost range.",
  name: "Name",
  nameOptional: "optional",
  contact: "Telegram, email or another contact",
  contactHint: "Email, Telegram, or phone",
  contactPh: "email, @username, or phone",
  task: "Task description",
  taskPh: "What do you need?",
  budget: "Approximate budget",
  budgetOptional: "optional",
  budgets: BUDGET_EN,
  consent: "I agree to the privacy policy",
  privacyLabel: "Privacy policy",
  privacyHref: "/doc/Privacy_Policy_Tivonix_EN.pdf",
  send: "Get a preliminary estimate",
  sending: "Sending…",
  close: "Close",
  cancel: "Cancel",
  errors: {
    contact: "Enter an email, Telegram, or phone number.",
    task: "Briefly describe the task (a few words).",
    consent: "Please accept the privacy policy."
  },
  successTitle: "Request received",
  success: "We’ll review the task and reply via your contact within a business day.",
  successCase: "See a similar case",
  successHome: "Back to home",
  errorTitle: "Couldn’t send the request",
  errorBody: "You can reach out directly:",
  fallbackEmail: "Email tivoonix@gmail.com",
  fallbackTelegram: "Open chat @TIVONIX",
  altTelegram: "Or message on Telegram",
  altBot: "Telegram bot",
  altEmail: "Email",
  sticky: "Get an estimate",
  ctaDiscuss: "Estimate project",
  ctaEstimate: "Get a project estimate",
  ctaProjects: "Have a similar task? Let’s discuss",
  selectedPlan: "Selected plan",
  clearPlan: "No plan",
  planHint: "Request for this plan — add details below.",
  formNote: "We reply within a business day. A call is optional. We don’t share contacts with third parties."
};
function readUtm(param) {
  if (typeof window === "undefined") return "";
  try {
    return new URL(window.location.href).searchParams.get(param) || "";
  } catch {
    return "";
  }
}
function buildLeadMeta(ctaSource, plan) {
  const source = ctaSource || getCtaSource();
  return {
    url: typeof window !== "undefined" ? window.location.href : "",
    page: typeof window !== "undefined" ? window.location.pathname : "",
    ctaSource: source,
    referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    utmSource: readUtm("utm_source"),
    utmMedium: readUtm("utm_medium"),
    utmCampaign: readUtm("utm_campaign"),
    datetime: (/* @__PURE__ */ new Date()).toISOString(),
    planId: plan?.id,
    planName: plan?.name
  };
}
const DRAFT_KEY = "tivonix_lead_draft_v1";
function loadLeadDraft() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function saveLeadDraft(fields) {
  if (typeof window === "undefined") return;
  try {
    const { company_fax_url: _honeypot, ...rest } = fields;
    void _honeypot;
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
  } catch {
  }
}
function clearLeadDraft() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
  }
}
function suggestedBudgetForPlan(planId) {
  switch (planId) {
    case "start":
      return "500_1500";
    case "growth":
      return "1500_5000";
    case "product":
      return "from_5000";
    case "custom":
      return "unknown";
    default:
      return "";
  }
}
function validateLeadFields(fields) {
  if (!fields.contact.trim() || fields.contact.trim().length < 3) {
    return { ok: false, field: "contact", messageKey: "contact" };
  }
  if (!fields.task.trim() || fields.task.trim().length < 5) {
    return { ok: false, field: "task", messageKey: "task" };
  }
  if (!fields.consent) {
    return { ok: false, field: "consent", messageKey: "consent" };
  }
  return { ok: true };
}
async function submitLead(body, signal) {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      return {
        ok: true,
        emailSent: data.emailSent,
        telegramSent: data.telegramSent
      };
    }
    return {
      ok: false,
      error: data.error || `http_${res.status}`,
      fallback: data.fallback || res.status >= 500
    };
  } catch {
    return { ok: false, error: "network_error", fallback: true };
  }
}
const CONTACT_EMAIL = "tivoonix@gmail.com";
const TELEGRAM_DIRECT_URL = "https://t.me/TIVONIX";
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
PLAN_CATALOG.help.telegramPayload;
const PARTNER_AGENCY_TELEGRAM_PAYLOAD = "partner_agency";
function getPlanCtaAction(planId) {
  return PLAN_CATALOG[planId].ctaAction;
}
({
  ...Object.fromEntries(
    Object.values(PLAN_CATALOG).map((entry) => [entry.telegramPayload, entry.adminSource])
  )
});
const TG_BOT_BASE_URL = "https://t.me/tivonixtech_leads_bot";
const TG_CHANNEL_URL = "https://t.me/TIVONIX";
const TG_BOT_URL = buildTelegramBotUrl("calc");
function buildTelegramBotUrl(startPayload) {
  if (!startPayload) return TG_BOT_BASE_URL;
  return `${TG_BOT_BASE_URL}?start=${encodeURIComponent(startPayload)}`;
}
const PARTNER_AGENCY_TELEGRAM_URL = buildTelegramBotUrl(PARTNER_AGENCY_TELEGRAM_PAYLOAD);
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
function planPagePrice(lang, planId) {
  const copy = pricingCopy(lang);
  const p = copy.plans[planId];
  return p.price !== "индивидуально" && p.price !== "custom" ? p.price : void 0;
}
const COPY_RU$3 = {
  title: "Планы запуска",
  subtitle: "Понятные тарифы под вашу задачу — от первых заявок до полноценного веб-сервиса",
  includesLabel: "Что входит",
  launchDiscount: {
    percent: "10%",
    note: "* Скидка на запуск: первые проекты ведём по сниженной цене от базового прайса."
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
        "лендинг",
        "адаптивная версия",
        "форма заявки",
        "уведомление в Telegram или email",
        "базовая аналитика",
        "согласованный объём правок",
        "срок от 7 рабочих дней"
      ],
      cta: "Получить состав Start",
      ctaHint: "Откроется форма заявки. План Start уже будет выбран.",
      compactCta: "Состав Start"
    },
    growth: {
      name: "Growth",
      tagline: "Система заявок для бизнеса",
      ...planPriceStrings("от", PLAN_PRICE_USD.growth),
      desc: "Когда заявок становится больше, они приходят из разных каналов и команде нужен порядок: статусы, ответственные, таблица или mini-CRM.",
      includes: [
        "многостраничный сайт",
        "формы и интеграции",
        "Telegram или таблица",
        "статусы заявок",
        "базовая административная часть",
        "до двух базовых интеграций",
        "срок от 2 недель"
      ],
      cta: "Оценить Growth",
      ctaHint: "Откроется короткая форма. План Growth уже будет выбран.",
      compactCta: "Оценить Growth"
    },
    product: {
      name: "Product",
      tagline: "Веб-сервис и MVP",
      ...planPriceStrings("от", PLAN_PRICE_USD.product),
      desc: "Когда нужен не просто сайт, а рабочий веб-сервис: пользователи, личные кабинеты, роли, база данных и админ-панель. Сложный SaaS целиком в этот тариф не входит.",
      includes: [
        "личный кабинет",
        "авторизация",
        "роли",
        "база данных",
        "базовая админ-панель",
        "одна основная внешняя интеграция",
        "срок от 4 недель"
      ],
      cta: "Рассчитать MVP",
      ctaHint: "Откроется форма. Опишите продукт — оценим объём.",
      compactCta: "Рассчитать MVP"
    },
    custom: {
      name: "Custom",
      tagline: "Сложная логика и масштаб",
      price: "индивидуально",
      desc: "Когда задача не помещается в готовый тариф: несколько ролей, платежи, интеграции, аналитика и масштабирование.",
      includes: [
        "сложная бизнес-логика",
        "несколько ролей",
        "платежи",
        "интеграции",
        "аналитика",
        "масштабирование",
        "индивидуальная оценка"
      ],
      cta: "Обсудить Custom",
      ctaHint: "Откроется форма для обсуждения нестандартной задачи.",
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
const COPY_EN$3 = {
  title: "Launch plans",
  subtitle: "Clear plans for your task — from first leads to a full web service",
  includesLabel: "What’s included",
  launchDiscount: {
    percent: "10%",
    note: "* Launch discount: early projects ship at a reduced rate from the base price."
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
      ctaHint: "Opens a short form. Describe the product — we’ll estimate scope.",
      compactCta: "Describe product"
    },
    custom: {
      name: "Custom",
      tagline: "Automation & AI",
      price: "custom",
      desc: "When the task doesn’t fit a ready plan: AI bots, complex CRM, document automation, integrations or an internal system.",
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
        a: "It’s the minimum launch cost. The final price depends on screens, logic, integrations, client area, CRM and timeline."
      },
      {
        id: "pay-now",
        q: "Do I pay right away?",
        a: "No. We discuss the task, clarify scope, then agree on cost and stages before any payment."
      },
      {
        id: "which-plan",
        q: "Which plan if I’m not sure?",
        a: "Pick Growth or message us. We’ll review your task and tell you if you need a site, bot, CRM, client area or custom automation."
      },
      {
        id: "start-expand",
        q: "Can I start with Start and expand later?",
        a: "Yes. Often it’s better to launch a simple version, test leads, then add CRM, statuses, client area or integrations."
      },
      {
        id: "growth-includes",
        q: "What’s in Growth?",
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
    valueAside: "Not for modules you don’t use yet",
    valueLead: "We launch what helps you capture and process leads first. When the business outgrows it — we add CRM, client area, payments, integrations or automation.",
    helpTitle: "Not sure which plan to pick?",
    helpLead: "Describe your task in your own words — we’ll suggest whether to start with Start, Growth, Product or Custom.",
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
  return lang === "ru" ? COPY_RU$3 : COPY_EN$3;
}
function cx$f(...a) {
  return a.filter(Boolean).join(" ");
}
const BRAND_CTA = "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";
const ORANGE_LINE = "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";
const FRAME = "linear-gradient(135deg, rgba(255,154,61,0.55), rgba(255,255,255,0.12) 38%, rgba(143,168,200,0.28) 72%, rgba(255,154,61,0.35))";
const emptyForm = () => ({
  name: "",
  contact: "",
  task: "",
  budget: "",
  consent: false,
  company_fax_url: ""
});
function LeadFormModal({
  open,
  onClose,
  source,
  planId = null
}) {
  const { lang } = useLang();
  const copy = leadFormCopy(lang);
  const pricing = pricingCopy(lang);
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const contactRef = useRef(null);
  const taskRef = useRef(null);
  const consentRef = useRef(null);
  const startedRef = useRef(false);
  const successRef = useRef(false);
  const submittingRef = useRef(false);
  const [activePlanId, setActivePlanId] = useState(planId);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [fieldError, setFieldError] = useState("");
  const [errorField, setErrorField] = useState(
    null
  );
  const [serverError, setServerError] = useState(false);
  const planName = activePlanId ? pricing.plans[activePlanId].name : null;
  const planPrice = activePlanId ? planPagePrice(lang, activePlanId) : null;
  useEffect(() => {
    if (open) {
      setMounted(true);
      setStatus("idle");
      setFieldError("");
      setErrorField(null);
      setServerError(false);
      startedRef.current = false;
      successRef.current = false;
      setActivePlanId(planId);
      const draft = loadLeadDraft();
      const suggested = suggestedBudgetForPlan(planId);
      setForm({
        ...emptyForm(),
        ...draft,
        company_fax_url: "",
        budget: draft?.budget || suggested || "",
        consent: draft?.consent === true
      });
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = window.setTimeout(() => setMounted(false), 220);
      return () => window.clearTimeout(t);
    }
  }, [open, planId]);
  useEffect(() => {
    if (!open || status === "success") return;
    saveLeadDraft(form);
  }, [form, open, status]);
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => contactRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    if (!root) return;
    const onKey = (e) => {
      if (e.key === "Escape" && status !== "loading") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = root.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusable).filter((el) => el.offsetParent !== null);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, status, source, form]);
  const handleClose = () => {
    if (status === "loading") return;
    if (!successRef.current && (form.contact || form.task || form.name)) {
      trackLeadFormAbandon(source);
    }
    onClose();
  };
  const update = (k, v) => {
    if (!startedRef.current && (k === "contact" || k === "task" || k === "name")) {
      startedRef.current = true;
      trackLeadFormStart();
    }
    setFieldError("");
    setErrorField(null);
    setForm((p) => ({ ...p, [k]: v }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current || status === "loading") return;
    const v = validateLeadFields(form);
    if (!v.ok) {
      trackLeadFormValidationError(v.field);
      setErrorField(v.field ?? null);
      if (v.messageKey === "contact") {
        setFieldError(copy.errors.contact);
        contactRef.current?.focus();
      } else if (v.messageKey === "task") {
        setFieldError(copy.errors.task);
        taskRef.current?.focus();
      } else {
        setFieldError(copy.errors.consent);
        consentRef.current?.focus();
      }
      return;
    }
    submittingRef.current = true;
    setStatus("loading");
    setServerError(false);
    trackLeadFormSubmit(source);
    const result = await submitLead({
      name: form.name.trim(),
      contact: form.contact.trim(),
      task: form.task.trim(),
      budget: form.budget,
      consent: form.consent,
      company_fax_url: form.company_fax_url,
      lang,
      planId: activePlanId || void 0,
      meta: buildLeadMeta(source, {
        id: activePlanId || void 0,
        name: planName || void 0
      })
    });
    submittingRef.current = false;
    if (result.ok) {
      successRef.current = true;
      clearLeadDraft();
      setForm(emptyForm());
      setStatus("success");
      trackLeadFormSuccess(source);
      return;
    }
    trackLeadFormServerError();
    setServerError(true);
    setStatus("error");
  };
  if (!mounted && !open) return null;
  if (typeof document === "undefined") return null;
  const budgetOptions = copy.budgets.filter((b) => b.id !== "");
  const inputBase = cx$f(
    "w-full h-12 rounded-xl px-4",
    "border-0 bg-white/[0.08] text-white placeholder:text-white/40",
    "outline-none focus:bg-white/[0.12]",
    "text-[14px] font-medium transition",
    HOTJAR_MASK_CLASS
  );
  const labelClass = "mb-1.5 block min-h-[1.15rem] text-[12px] font-medium leading-none text-white/80";
  const node = /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$f(
        "fixed inset-0 z-[220]",
        "flex items-end justify-center sm:items-center",
        "px-0 sm:px-5 py-0 sm:py-5"
      ),
      "aria-hidden": !open,
      children: [
        /* @__PURE__ */ jsx("style", { children: `
        .lead-modal-scroll {
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,154,61,.7) rgba(255,255,255,.06);
        }
        .lead-modal-scroll::-webkit-scrollbar { width: 6px; }
        .lead-modal-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,.06);
          border-radius: 999px;
        }
        .lead-modal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #FFD7B0, #FF9A3D, #FF6A1A);
          border-radius: 999px;
        }
      ` }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/72 backdrop-blur-[14px] transition-opacity duration-200 cursor-pointer",
            style: { opacity: open && visible ? 1 : 0 },
            onClick: handleClose,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "relative w-full max-w-none sm:max-w-[640px] lg:max-w-[720px] transition-[transform,opacity] duration-220 ease-out",
            style: {
              opacity: open && visible ? 1 : 0,
              transform: open && visible ? "translateY(0) scale(1)" : "translateY(18px) scale(0.98)",
              pointerEvents: open ? "auto" : "none"
            },
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": titleId,
            "aria-describedby": descId,
            ref: dialogRef,
            onMouseDown: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "rounded-t-[28px] p-[1px] shadow-[0_32px_120px_rgba(0,0,0,0.72)] sm:rounded-[28px]",
                style: { background: FRAME },
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "relative flex max-h-[min(94dvh,780px)] flex-col overflow-hidden rounded-t-[27px] bg-black/50 backdrop-blur-2xl sm:rounded-[27px]",
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 opacity-80",
                          style: {
                            backgroundImage: "url(/images/121.webp)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(22px)",
                            transform: "scale(1.08)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0",
                          style: {
                            backgroundImage: "radial-gradient(720px 380px at 16% 0%, rgba(255,154,61,0.20), transparent 58%),radial-gradient(640px 420px at 92% 28%, rgba(143,168,200,0.16), transparent 60%),radial-gradient(520px 360px at 50% 110%, rgba(255,106,26,0.12), transparent 55%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 opacity-[0.18]",
                          style: {
                            backgroundImage: "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                            maskImage: "radial-gradient(closest-side at 50% 35%, black, transparent 80%)",
                            WebkitMaskImage: "radial-gradient(closest-side at 50% 35%, black, transparent 80%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "relative z-10 shrink-0 px-5 pt-4 sm:px-7 sm:pt-5", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
                            /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl sm:hidden", children: /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: "/images/tivonix-logo-icon.webp",
                                alt: "",
                                className: "h-6 w-6 opacity-90",
                                draggable: false
                              }
                            ) }),
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: "/images/tivonix-logo-lockup.webp",
                                alt: "TIVONIX",
                                draggable: false,
                                className: "hidden h-9 w-auto opacity-90 sm:block"
                              }
                            ),
                            /* @__PURE__ */ jsxs("div", { className: "min-w-0 sm:ml-1", children: [
                              /* @__PURE__ */ jsx(
                                "h2",
                                {
                                  id: titleId,
                                  className: "truncate text-[17px] font-extrabold tracking-tight text-white sm:text-[19px]",
                                  children: copy.title
                                }
                              ),
                              /* @__PURE__ */ jsx("p", { id: descId, className: "mt-0.5 truncate text-[12px] text-white/55 sm:text-[12.5px]", children: copy.subtitle })
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: handleClose,
                              disabled: status === "loading",
                              className: "group grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] text-white/80 transition hover:bg-white/[0.14] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 disabled:opacity-50",
                              "aria-label": copy.close,
                              children: /* @__PURE__ */ jsxs(
                                "svg",
                                {
                                  width: "15",
                                  height: "15",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  className: "transition-transform duration-200 group-hover:rotate-90",
                                  "aria-hidden": true,
                                  children: [
                                    /* @__PURE__ */ jsx("path", { d: "M6 6L18 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
                                    /* @__PURE__ */ jsx("path", { d: "M18 6L6 18", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
                                  ]
                                }
                              )
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none mt-4 h-4", children: [
                          /* @__PURE__ */ jsx("div", { className: "mx-auto h-[2px] w-full rounded-full opacity-95", style: { background: ORANGE_LINE } }),
                          /* @__PURE__ */ jsx("div", { className: "mx-auto mt-[-2px] h-5 w-full opacity-35 blur-xl", style: { background: ORANGE_LINE } })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "lead-modal-scroll relative z-10 min-h-0 flex-1 px-5 pb-2 pt-1 sm:px-7", children: status === "success" ? /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "flex min-h-[280px] flex-col items-center justify-center gap-4 py-10 text-center",
                          role: "status",
                          "aria-live": "polite",
                          children: [
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "grid h-14 w-14 place-items-center rounded-full",
                                style: {
                                  background: "linear-gradient(145deg, rgba(255,215,176,0.25), rgba(255,106,26,0.2))",
                                  boxShadow: "0 0 40px rgba(255,154,61,0.25)"
                                },
                                children: /* @__PURE__ */ jsx("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: /* @__PURE__ */ jsx(
                                  "path",
                                  {
                                    d: "M5.5 12.6c2 1.6 3.3 3.2 4.2 5.1 2.6-4.8 5.8-8.2 10-11.2",
                                    stroke: "#FF9A3D",
                                    strokeWidth: "2.4",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                  }
                                ) })
                              }
                            ),
                            /* @__PURE__ */ jsx("h3", { className: "font-hero text-[1.35rem] font-semibold tracking-[-0.02em] text-white", children: copy.successTitle }),
                            /* @__PURE__ */ jsx("p", { className: "max-w-[36ch] text-[15px] leading-relaxed text-white/75 sm:text-[16px]", children: copy.success }),
                            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col items-center gap-2.5 sm:flex-row", children: [
                              /* @__PURE__ */ jsx(
                                "a",
                                {
                                  href: "/projects/spliton",
                                  className: "inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-[13.5px] font-medium text-white/85 transition hover:border-white/30 hover:text-white",
                                  onClick: onClose,
                                  children: copy.successCase
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "a",
                                {
                                  href: "/",
                                  className: "inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[13.5px] font-bold text-black transition hover:bg-white/92",
                                  onClick: onClose,
                                  children: copy.successHome
                                }
                              )
                            ] })
                          ]
                        }
                      ) : /* @__PURE__ */ jsxs("form", { id: "lead-form", onSubmit, noValidate: true, className: "space-y-3.5 pb-2", children: [
                        /* @__PURE__ */ jsxs("div", { className: "absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden", "aria-hidden": true, children: [
                          /* @__PURE__ */ jsx("label", { htmlFor: "lead-company-fax", children: "Company fax" }),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              id: "lead-company-fax",
                              name: "company_fax_url",
                              type: "text",
                              tabIndex: -1,
                              autoComplete: "off",
                              value: form.company_fax_url,
                              onChange: (e) => update("company_fax_url", e.target.value)
                            }
                          )
                        ] }),
                        activePlanId && planName ? /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 rounded-xl bg-white/[0.06] px-3.5 py-3", children: [
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsx("p", { className: "text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/55", children: copy.selectedPlan }),
                            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[15px] font-semibold tracking-tight text-white", children: [
                              planName,
                              planPrice ? /* @__PURE__ */ jsx("span", { className: "ml-2 text-[13px] font-medium text-white/55", children: planPrice }) : null
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setActivePlanId(null),
                              className: "shrink-0 text-[12px] font-medium text-white/45 transition hover:text-white/75",
                              children: copy.clearPlan
                            }
                          )
                        ] }) : null,
                        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3.5 sm:grid-cols-2", children: [
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxs("label", { htmlFor: "lead-name", className: labelClass, children: [
                              copy.name,
                              " ",
                              /* @__PURE__ */ jsxs("span", { className: "font-normal text-white/45", children: [
                                "(",
                                copy.nameOptional,
                                ")"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                id: "lead-name",
                                name: "name",
                                type: "text",
                                autoComplete: "name",
                                className: inputBase,
                                value: form.name,
                                onChange: (e) => update("name", e.target.value),
                                disabled: status === "loading",
                                ...HOTJAR_SUPPRESS_ATTR
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxs("label", { htmlFor: "lead-contact", className: labelClass, children: [
                              copy.contact,
                              " *"
                            ] }),
                            /* @__PURE__ */ jsx(
                              "input",
                              {
                                ref: contactRef,
                                id: "lead-contact",
                                name: "contact",
                                type: "text",
                                required: true,
                                autoComplete: "email",
                                inputMode: "email",
                                placeholder: copy.contactPh,
                                className: cx$f(
                                  inputBase,
                                  errorField === "contact" && "bg-[#FF9A3D]/12 focus:bg-[#FF9A3D]/16"
                                ),
                                value: form.contact,
                                onChange: (e) => update("contact", e.target.value),
                                disabled: status === "loading",
                                "aria-invalid": errorField === "contact",
                                "aria-describedby": fieldError ? "lead-field-error" : void 0,
                                ...HOTJAR_SUPPRESS_ATTR
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsxs("label", { htmlFor: "lead-task", className: labelClass, children: [
                            copy.task,
                            " *"
                          ] }),
                          /* @__PURE__ */ jsx(
                            "textarea",
                            {
                              ref: taskRef,
                              id: "lead-task",
                              name: "task",
                              required: true,
                              rows: 4,
                              placeholder: activePlanId && planName ? lang === "ru" ? `Что важно по плану ${planName}? Сроки, примеры, пожелания…` : `What matters for the ${planName} plan? Timeline, examples, notes…` : copy.taskPh,
                              className: cx$f(
                                "min-h-[108px] w-full resize-none rounded-xl px-4 py-3 text-[14px] font-medium",
                                "border-0 bg-white/[0.08] text-white placeholder:text-white/40",
                                "outline-none focus:bg-white/[0.12] transition",
                                HOTJAR_MASK_CLASS,
                                errorField === "task" && "bg-[#FF9A3D]/12 focus:bg-[#FF9A3D]/16"
                              ),
                              value: form.task,
                              onChange: (e) => update("task", e.target.value),
                              disabled: status === "loading",
                              "aria-invalid": errorField === "task",
                              ...HOTJAR_SUPPRESS_ATTR
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsxs("div", { className: labelClass, children: [
                            copy.budget,
                            " ",
                            /* @__PURE__ */ jsxs("span", { className: "font-normal text-white/45", children: [
                              "(",
                              copy.budgetOptional,
                              ")"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", role: "group", "aria-label": copy.budget, children: budgetOptions.map((b) => {
                            const active = form.budget === b.id;
                            return /* @__PURE__ */ jsx(
                              "button",
                              {
                                type: "button",
                                disabled: status === "loading",
                                onClick: () => update("budget", active ? "" : b.id),
                                className: cx$f(
                                  "h-9 rounded-full px-3.5 text-[12px] font-medium transition",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40",
                                  active ? "bg-white text-black" : "bg-white/[0.08] text-white/75 hover:bg-white/[0.12] hover:text-white"
                                ),
                                children: b.label
                              },
                              b.id
                            );
                          }) })
                        ] }),
                        /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-2.5 px-0.5 py-1", children: [
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              ref: consentRef,
                              type: "checkbox",
                              checked: form.consent,
                              onChange: (e) => update("consent", e.target.checked),
                              disabled: status === "loading",
                              className: cx$f(
                                "mt-0.5 h-4 w-4 shrink-0 accent-[#FF9A3D]",
                                errorField === "consent" && "outline outline-2 outline-[#FF9A3D]/60 outline-offset-2"
                              ),
                              "aria-required": "true"
                            }
                          ),
                          /* @__PURE__ */ jsxs("span", { className: "text-[13px] leading-snug text-white/70", children: [
                            copy.consent,
                            " ",
                            /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: copy.privacyHref,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "font-medium text-[#FFB36A] underline decoration-[#FF9A3D]/30 underline-offset-2 hover:text-[#FFD7B0]",
                                children: copy.privacyLabel
                              }
                            )
                          ] })
                        ] }),
                        fieldError ? /* @__PURE__ */ jsx("p", { id: "lead-field-error", role: "alert", className: "text-[12.5px] text-[#FFB36A]", children: fieldError }) : null,
                        serverError ? /* @__PURE__ */ jsxs(
                          "div",
                          {
                            role: "alert",
                            className: "rounded-xl bg-[#FF9A3D]/10 px-4 py-3.5 text-[12.5px] text-white/88",
                            children: [
                              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: copy.errorTitle }),
                              /* @__PURE__ */ jsx("p", { className: "mt-1 text-white/60", children: copy.errorBody }),
                              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-col gap-2 sm:flex-row", children: [
                                /* @__PURE__ */ jsx(
                                  "a",
                                  {
                                    href: `mailto:${CONTACT_EMAIL}`,
                                    onClick: () => trackEmailClick(),
                                    className: "inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-[13px] font-bold text-black",
                                    children: copy.fallbackEmail
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  "a",
                                  {
                                    href: TELEGRAM_DIRECT_URL,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    onClick: () => trackTelegramDirectClick(),
                                    className: "inline-flex h-10 items-center justify-center rounded-full bg-white/[0.08] px-4 text-[13px] font-medium text-white",
                                    children: copy.fallbackTelegram
                                  }
                                )
                              ] })
                            ]
                          }
                        ) : null
                      ] }) }),
                      status !== "success" ? /* @__PURE__ */ jsxs("div", { className: "relative z-10 shrink-0 bg-black/35 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:px-7 sm:pb-5", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            "aria-hidden": true,
                            className: "mb-3 h-px w-full opacity-60",
                            style: {
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "submit",
                            form: "lead-form",
                            disabled: status === "loading",
                            className: cx$f(
                              "flex h-12 w-full items-center justify-center rounded-full text-[15px] font-bold text-black",
                              "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                              "hover:brightness-[1.04] active:brightness-[0.96]",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50",
                              status === "loading" && "cursor-not-allowed opacity-70"
                            ),
                            style: { background: BRAND_CTA },
                            children: status === "loading" ? copy.sending : copy.send
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11.5px] text-white/40", children: [
                          /* @__PURE__ */ jsx(
                            "a",
                            {
                              href: TELEGRAM_DIRECT_URL,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              onClick: () => trackTelegramDirectClick(),
                              className: "transition hover:text-white/75",
                              children: "@TIVONIX"
                            }
                          ),
                          /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "text-white/18", children: "·" }),
                          /* @__PURE__ */ jsx(
                            "a",
                            {
                              href: TG_BOT_URL,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              onClick: () => trackTelegramBotClick(),
                              className: "transition hover:text-white/75",
                              children: copy.altBot
                            }
                          ),
                          /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "text-white/18", children: "·" }),
                          /* @__PURE__ */ jsx(
                            "a",
                            {
                              href: `mailto:${CONTACT_EMAIL}`,
                              onClick: () => trackEmailClick(),
                              className: "transition hover:text-white/75",
                              children: CONTACT_EMAIL
                            }
                          )
                        ] })
                      ] }) : null
                    ]
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
  return createPortal(node, document.body);
}
const LeadFormContext = createContext(null);
function LeadFormProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [planId, setPlanId] = useState(null);
  const openLeadForm = useCallback((ctaSource, options) => {
    trackCtaPrimaryClick(ctaSource);
    trackLeadFormOpen(ctaSource);
    setSource(ctaSource);
    setPlanId(options?.planId ?? null);
    setOpen(true);
  }, []);
  const closeLeadForm = useCallback(() => {
    setOpen(false);
  }, []);
  const value = useMemo(
    () => ({ openLeadForm, closeLeadForm, isOpen: open, source, planId }),
    [openLeadForm, closeLeadForm, open, source, planId]
  );
  return /* @__PURE__ */ jsxs(LeadFormContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsx(
      LeadFormModal,
      {
        open,
        source,
        planId,
        onClose: closeLeadForm
      }
    )
  ] });
}
const LANDING_SHELL_CLASS = "mx-auto w-full max-w-[1480px] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-[100px]";
const HERO_SCROLL_HEADLINE_CLASS = "font-hero w-full max-w-full font-normal uppercase tracking-[0.01em] text-white leading-[0.88] text-[clamp(2.35rem,6.8vw,4.75rem)] sm:text-[clamp(2.85rem,5.8vw,5.75rem)] lg:text-[clamp(3.25rem,5.2vw,6.5rem)] xl:text-[clamp(3.75rem,4.8vw,7rem)]";
const LANDING_HEADLINE_CLASS = "font-hero font-normal uppercase tracking-[0.02em] text-white leading-[0.98] text-[clamp(2.25rem,7.2vw,3.75rem)] sm:text-[clamp(2.75rem,5.8vw,4.5rem)] lg:text-[clamp(3.25rem,4.8vw,5.25rem)]";
function Container({
  children,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: [LANDING_SHELL_CLASS, className].filter(Boolean).join(" "), children });
}
const PARTNERS_PATH_RU = "/ru/partners";
const PARTNERS_PATH_EN = "/en/partners";
const PARTNERS_PATH_LEGACY = "/partners";
function partnersPath(lang) {
  return lang === "en" ? PARTNERS_PATH_EN : PARTNERS_PATH_RU;
}
function isPartnersPath(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p === PARTNERS_PATH_LEGACY || p === PARTNERS_PATH_RU || p === PARTNERS_PATH_EN;
}
const PARTNERS_ORIGIN = "https://tivonix.tech";
function partnersCanonicalUrl(lang, pathname) {
  const p = (pathname ?? "").replace(/\/+$/, "") || "";
  if (p === PARTNERS_PATH_LEGACY) {
    return `${PARTNERS_ORIGIN}${PARTNERS_PATH_LEGACY}`;
  }
  if (p === PARTNERS_PATH_RU || p === PARTNERS_PATH_EN) {
    return `${PARTNERS_ORIGIN}${p}`;
  }
  return `${PARTNERS_ORIGIN}${partnersPath(lang)}`;
}
function partnersHreflangUrl(path) {
  return `${PARTNERS_ORIGIN}${path}`;
}
const COPY_RU$2 = {
  seo: {
    title: "О компании — TIVONIX",
    description: "TIVONIX — продуктовая команда: сайты, заявки, кабинеты и автоматизация. Зачем мы начали, миссия, ценности и почему с нами работают."
  },
  hero: {
    title: "Системы, в которых заявки не теряются",
    titleLines: ["Системы,", "в которых", "заявки не", "теряются"],
    cta: "Обсудить задачу"
  },
  story: {
    paragraphs: [
      "Форма на сайте есть. А дальше часто начинается хаос: письма во входящих, статусы в голове, Excel вручную, и никто не знает, кто взял заявку. Из этой боли и вырос TIVONIX. Не из презентации.",
      "Мы сами собирали для бизнеса цепочки от сайта до Telegram, CRM и кабинета. Видели, где всё ломается. Поэтому делаем не красивую страницу ради галочки, а рабочую систему.",
      "Сегодня запускаем лендинги под заявки, mini-CRM, личные кабинеты и MVP. С понятным объёмом, сроками и ответом за результат. Собираем состав под задачу, показываем ход работы и отдаём код с доступами. Система живёт у вас, а не в чужом кабинете."
    ]
  },
  mission: {
    label: "Миссия",
    title: "Автоматизировать рутину вокруг клиента",
    text: "Мы помогаем бизнесу убрать ручной перенос заявок и хаос в коммуникациях — чтобы команда занималась продажами и продуктом, а не поиском «кто взял лид»."
  },
  vision: {
    label: "Видение",
    title: "Понятный цифровой контур для любого масштаба",
    text: "От локального бизнеса до веб-сервиса: один процесс от первого касания до статуса в системе. Без лишней разработки ради галочки — только то, что двигает деньги и скорость ответа."
  },
  values: {
    label: "Ценности",
    title: "Скорость, ясность и ответственность",
    text: "Так мы работаем на каждом проекте — от первого сообщения до передачи доступов.",
    items: [
      {
        title: "Скорость",
        text: "Быстрый старт и короткие итерации: промежуточный результат видно уже в первые недели, а не в конце."
      },
      {
        title: "Ясность",
        text: "Фиксируем объём, сроки и границы до старта. Понятно, что входит в работу и что остаётся на следующий этап."
      },
      {
        title: "Ответственность",
        text: "Отвечаем за результат: сценарии заявок, статусы и ключевые пути пользователя проверяем до релиза."
      },
      {
        title: "Прозрачность",
        text: "Передаём код и доступы. Конфиденциальность и контроль над системой остаются у вас."
      }
    ]
  },
  why: {
    title: "Почему TIVONIX",
    text: "Мы соединяем продукт, интеграции и запуск — чтобы вы росли, а не тонули в спорах «где заявка».",
    cta: "Обсудить задачу",
    items: [
      {
        key: "experience",
        title: "Опыт",
        text: "Делаем живые проекты: от лендинга с Telegram до fintech и маркетплейсов с кабинетами и оплатой."
      },
      {
        key: "expertise",
        title: "Экспертиза",
        text: "Умеем упрощать сложное: маршруты заявок, роли, статусы, интеграции — без лишней архитектуры."
      },
      {
        key: "innovation",
        title: "Технологии",
        text: "Современный стек, AI там, где он экономит время, и автоматизация рутины вокруг клиента."
      },
      {
        key: "team",
        title: "Команда",
        text: "Дизайн, разработка, QA и запуск в одной связке. Состав под задачу — без безликой «студии на аутсорсе»."
      }
    ]
  },
  people: {
    title: "Это мы",
    text: "Роли, которые реально закрывают проект — от идеи до продакшена.",
    members: [
      { id: "danila", initials: "ДТ", name: "Данила Т.", role: "Архитектура и full-stack" },
      { id: "anna", initials: "АК", name: "Анна К.", role: "UI/UX дизайн" },
      { id: "maxim", initials: "МС", name: "Максим С.", role: "Frontend" },
      { id: "igor", initials: "ИВ", name: "Игорь В.", role: "Backend" },
      { id: "elena", initials: "ЕН", name: "Елена Н.", role: "QA и тестирование" },
      { id: "roman", initials: "РП", name: "Роман П.", role: "Проджект-менеджмент" }
    ]
  },
  join: {
    cta: "Начать разговор"
  }
};
const COPY_EN$2 = {
  seo: {
    title: "About — TIVONIX",
    description: "TIVONIX is a product team: sites, lead flows, portals and automation. Why we started, our mission, values and how we work."
  },
  hero: {
    title: "Systems where leads don’t get lost",
    titleLines: ["Systems", "where leads", "don’t get", "lost"],
    cta: "Discuss your task"
  },
  story: {
    paragraphs: [
      "The form on the site works. Then chaos often starts: inbox noise, status in someone’s head, Excel by hand, and nobody knows who took the lead. That’s the pain TIVONIX grew from. Not a pitch deck.",
      "We kept building chains from site to Telegram, CRM and portal for real businesses. We saw where things break. So we don’t ship a pretty page for the checkbox. We ship a system that works.",
      "Today we launch lead pages, mini-CRM, client portals and MVPs. Clear scope, clear timelines, clear ownership of the result. We assemble the right people for the job, show progress as we go, and hand over code and access. The system lives with you, not in someone else’s account."
    ]
  },
  mission: {
    label: "Mission",
    title: "Automate the busywork around the customer",
    text: "We help teams stop manually moving leads and losing context — so people sell and build product instead of hunting “who took that lead”."
  },
  vision: {
    label: "Vision",
    title: "A clear digital loop at any scale",
    text: "From local business to a web product: one path from first touch to a status in the system. No vanity scope — only what moves money and response speed."
  },
  values: {
    label: "Values",
    title: "Speed, clarity, accountability",
    text: "How we work on every project — from the first message to handing over access.",
    items: [
      {
        title: "Speed",
        text: "Fast kickoff and short iterations: you see intermediate progress in the first weeks, not only at the end."
      },
      {
        title: "Clarity",
        text: "We lock scope, timeline and boundaries before start. What’s in and what’s next is explicit."
      },
      {
        title: "Accountability",
        text: "We own the outcome: lead flows, statuses and key user paths are checked before release."
      },
      {
        title: "Transparency",
        text: "We hand over code and access. Privacy and control of the system stay with you."
      }
    ]
  },
  why: {
    title: "Why TIVONIX",
    text: "We connect product, integrations and launch — so you grow instead of arguing “where is the lead”.",
    cta: "Discuss your task",
    items: [
      {
        key: "experience",
        title: "Experience",
        text: "Live projects from Telegram lead capture to fintech and marketplaces with portals and payments."
      },
      {
        key: "expertise",
        title: "Expertise",
        text: "We simplify the hard parts: routing, roles, statuses, integrations — without overbuilt architecture."
      },
      {
        key: "innovation",
        title: "Technology",
        text: "Modern stack, AI where it saves time, and automation around the customer journey."
      },
      {
        key: "team",
        title: "Team",
        text: "Design, engineering, QA and launch together. The right mix for the task — not a faceless outsourcing shop."
      }
    ]
  },
  people: {
    title: "This is us",
    text: "Roles that actually ship the project — from idea to production.",
    members: [
      { id: "danila", initials: "DT", name: "Danila T.", role: "Architecture & full-stack" },
      { id: "anna", initials: "AK", name: "Anna K.", role: "UI/UX design" },
      { id: "maxim", initials: "MS", name: "Maxim S.", role: "Frontend" },
      { id: "igor", initials: "IV", name: "Igor V.", role: "Backend" },
      { id: "elena", initials: "EN", name: "Elena N.", role: "QA & testing" },
      { id: "roman", initials: "RP", name: "Roman P.", role: "Project management" }
    ]
  },
  join: {
    cta: "Start the conversation"
  }
};
function aboutCopy(lang) {
  return lang === "en" ? COPY_EN$2 : COPY_RU$2;
}
function aboutPath(lang) {
  return lang === "en" ? "/en/about" : "/about";
}
const DEFAULT_PANEL_ORIGIN = "https://tivonixpanel-production.up.railway.app";
function partnerPanelOrigin() {
  return DEFAULT_PANEL_ORIGIN;
}
function partnerPanelLoginUrl() {
  return `${partnerPanelOrigin()}/login`;
}
function partnerPanelRegisterUrl(type) {
  const url = new URL(`${partnerPanelOrigin()}/register`);
  url.searchParams.set("type", type);
  return url.toString();
}
function cx$e(...a) {
  return a.filter(Boolean).join(" ");
}
function ctaClass$1(variant, size, className) {
  const isSquare = variant === "plain";
  return cx$e(
    "inline-flex items-center justify-center font-sans font-medium tracking-normal transition duration-200",
    isSquare ? "rounded-none shadow-none" : "rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "active:scale-[0.98]",
    size === "lg" ? "h-12 px-8 text-[15px] sm:h-[52px] sm:px-9 sm:text-[16px]" : "h-11 px-7 text-[14px] sm:px-8",
    (variant === "primary" || variant === "cream") && "tivonix-cta-primary",
    variant === "secondary" && "tivonix-cta-secondary",
    variant === "ghost" && "text-white/75 hover:text-white",
    variant === "plain" && "border-0 bg-transparent font-medium text-white/88 hover:bg-white/[0.04] hover:text-white",
    variant === "white" && "border-0 bg-white font-medium text-[#070607] shadow-none hover:bg-white/92",
    className
  );
}
function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error("useLeadForm must be used within LeadFormProvider");
  return ctx;
}
function LeadCTAButton({
  source,
  children,
  variant = "primary",
  size = "md",
  className,
  "aria-label": ariaLabel,
  onClick
}) {
  const { openLeadForm } = useLeadForm();
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => {
        onClick?.();
        openLeadForm(source);
      },
      className: ctaClass$1(variant, size, className),
      "aria-label": ariaLabel,
      children
    }
  );
}
const EN_ROUTE_MAP = {
  "/": "/en",
  "/projects": "/en/projects",
  "/contacts": "/en/contacts",
  "/plans": "/en/plans",
  "/about": "/en/about"
};
const RU_ROUTE_MAP = {
  "/en": "/",
  "/en/projects": "/projects",
  "/en/contacts": "/contacts",
  "/en/plans": "/plans",
  "/en/about": "/about"
};
function stripLangPrefix(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) return p.slice(3) || "/";
  return p;
}
function pathForLang(pathname, lang) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (clean === "/partners" || clean === "/ru/partners") {
    return lang === "en" ? "/en/partners" : "/ru/partners";
  }
  if (clean === "/en/partners") {
    return lang === "en" ? "/en/partners" : "/ru/partners";
  }
  const mRu = clean.match(/^\/projects\/([^/]+)$/);
  if (mRu) {
    return lang === "en" ? `/en/projects/${mRu[1]}` : `/projects/${mRu[1]}`;
  }
  const mEn = clean.match(/^\/en\/projects\/([^/]+)$/);
  if (mEn) {
    return lang === "en" ? `/en/projects/${mEn[1]}` : `/projects/${mEn[1]}`;
  }
  if (lang === "en") {
    if (EN_ROUTE_MAP[clean]) return EN_ROUTE_MAP[clean];
    if (clean.startsWith("/en")) return clean;
    return clean;
  }
  if (RU_ROUTE_MAP[clean]) return RU_ROUTE_MAP[clean];
  if (clean.startsWith("/en/")) return stripLangPrefix(clean);
  return clean;
}
const ORANGE_PILL = "bg-gradient-to-r from-[#FFD7B0] via-[#FF9A3D] to-[#FF6A1A] shadow-[0_6px_20px_rgba(255,107,44,0.2)]";
function cx$d(...a) {
  return a.filter(Boolean).join(" ");
}
function LangToggle({
  compact,
  reducedMotion,
  variant = "header"
}) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const isHero = variant === "hero";
  const switchLang = (next) => {
    setLang(next);
    const target = pathForLang(location.pathname, next);
    if (target !== location.pathname) {
      navigate(`${target}${location.search}${location.hash}`, { replace: true });
    }
  };
  const label = lang === "ru" ? "Выбор языка" : "Language";
  if (isHero) {
    const item = (code) => {
      const active = lang === code;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": active,
          onClick: () => switchLang(code),
          className: cx$d(
            "relative flex h-10 items-center justify-center rounded-full border-0 px-4 font-bold uppercase tracking-[0.12em] outline-none select-none transition duration-[260ms]",
            "text-[11px] focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
            active ? "bg-[#2c2c2c] text-white" : "bg-transparent text-white hover:bg-white/[0.06]"
          ),
          children: /* @__PURE__ */ jsx("span", { className: "leading-none translate-y-[0.5px]", children: code.toUpperCase() })
        }
      );
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative inline-flex shrink-0 items-center gap-0.5 rounded-full border-0 bg-[#141414] p-1 select-none",
        role: "radiogroup",
        "aria-label": label,
        "aria-orientation": "horizontal",
        children: [
          item("ru"),
          item("en")
        ]
      }
    );
  }
  const h = compact ? "h-9 w-[5.25rem]" : "h-10 w-[5.75rem]";
  const text = compact ? "text-[11px]" : "text-xs";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$d(
        "relative shrink-0 select-none rounded-full border border-white/[0.08] bg-[#121212] p-1",
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
            className: cx$d(
              "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/2)] rounded-full",
              ORANGE_PILL,
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
              onClick: () => switchLang("ru"),
              className: cx$d(
                "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                text,
                lang === "ru" ? "text-[#1A202C]" : "text-white/45 hover:text-white/72"
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
              onClick: () => switchLang("en"),
              className: cx$d(
                "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                text,
                lang === "en" ? "text-[#1A202C]" : "text-white/45 hover:text-white/72"
              ),
              children: "EN"
            }
          )
        ] })
      ]
    }
  );
}
function cx$c(...a) {
  return a.filter(Boolean).join(" ");
}
const NAV_MAIN = [
  { to: "/#offer", key: "services", hash: "offer" },
  { to: "/projects", key: "projects" },
  { to: "/plans", key: "plans" },
  { to: "/about", key: "about" },
  { key: "partners" }
];
const NAV_MOBILE = [
  { to: "/#offer", key: "services", hash: "offer" },
  { to: "/projects", key: "projects" },
  { to: "/plans", key: "plans" },
  { to: "/about", key: "about" },
  { key: "partners" }
];
const DESKTOP_MIN_WIDTH = 1280;
const LOGO_DEFAULT = "/images/tivonix-logo-lockup.webp";
const LOGO_WHITE = "/images/tivonix-logo-white.webp";
const LOGO_BLACK = "/images/logo-black.png";
function usePrefersReducedMotion$1() {
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
    const isHome = pathname === "/" || pathname === "/en";
    if (!isHome) {
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
      ([entry]) => {
        setInView(!!entry?.isIntersecting);
      },
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
  const query = `(max-width: ${maxWidth}px)`;
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
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
      className: cx$c(
        "relative inline-flex items-center gap-0.5 rounded-full border-0 bg-[#141414] p-1"
      ),
      "aria-label": "Header navigation",
      children: items.map((it) => {
        const isActive = it.key === activeKey;
        const pad = compact ? "px-3.5 h-10" : "px-5 h-11";
        const text = compact ? "text-[10.5px]" : "text-[11px]";
        return /* @__PURE__ */ jsx(
          Link,
          {
            to: it.to,
            onClick: onItemClick(it.to, it.hash),
            "aria-current": isActive ? "page" : void 0,
            className: cx$c(
              "relative flex items-center justify-center gap-2 rounded-full border-0 font-bold uppercase tracking-[0.14em] outline-none select-none transition",
              "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
              pad,
              text,
              isActive ? "bg-[#2c2c2c] text-white" : "bg-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/85"
            ),
            style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
            children: /* @__PURE__ */ jsx("span", { className: "leading-none translate-y-[0.5px]", children: it.label })
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
  const reducedMotion = usePrefersReducedMotion$1();
  const isMobile = useIsMobile();
  const heroInView = useHomeHeroInView(location.pathname);
  const footerInView = useFooterInView(location.pathname);
  const [partnersCapsLock, setPartnersCapsLock] = useState(false);
  useEffect(() => {
    if (!isPartnersPath(location.pathname)) {
      setPartnersCapsLock(false);
      return;
    }
    const el = document.documentElement;
    const sync = () => setPartnersCapsLock(el.dataset.partnersCaps === "1");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["data-partners-caps"] });
    return () => mo.disconnect();
  }, [location.pathname]);
  const hideHeader = (footerInView || partnersCapsLock) && !open;
  const isPartners = isPartnersPath(location.pathname);
  const logoSrc = isPartners ? LOGO_BLACK : heroInView ? LOGO_WHITE : LOGO_DEFAULT;
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
      if (key === "services") return "услуги";
      if (key === "projects") return "проекты";
      if (key === "plans") return "тарифы";
      if (key === "about") return "о компании";
      if (key === "partners") return "партнёры";
    } else {
      if (key === "services") return "services";
      if (key === "projects") return "projects";
      if (key === "plans") return "pricing";
      if (key === "about") return "about";
      if (key === "partners") return "partners";
    }
    return key;
  };
  const navTo = (it) => {
    if (it.key === "partners") return partnersPath(lang);
    if (it.key === "about") return aboutPath(lang);
    return it.to ?? "/";
  };
  const activeKey = useMemo(() => {
    if (location.pathname === "/plans") return "plans";
    if (location.pathname === "/projects" || location.pathname.startsWith("/projects/"))
      return "projects";
    if (location.pathname === "/about" || location.pathname === "/en/about") return "about";
    if (isPartnersPath(location.pathname)) return "partners";
    return null;
  }, [location.pathname]);
  const tabsItems = useMemo(
    () => NAV_MAIN.map((it) => ({
      key: it.key,
      to: navTo(it),
      label: navLabel(it.key),
      hash: it.hash
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );
  const mobileNavItems = useMemo(
    () => NAV_MOBILE.map((it) => ({
      key: it.key,
      to: navTo(it),
      label: navLabel(it.key),
      hash: it.hash
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );
  const onNav = (to, hash) => (e) => {
    setOpen(false);
    if (hash) {
      e.preventDefault();
      const go = () => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      };
      if (location.pathname !== "/" && location.pathname !== "/en") {
        navigate(lang === "en" ? "/en" : "/");
        window.setTimeout(go, 80);
      } else {
        go();
      }
      return;
    }
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
  const onPartners = isPartnersPath(location.pathname);
  const leadCopy = leadFormCopy(lang);
  const ctaTop = onPartners ? isRu ? "Войти в панель" : "Log in to panel" : isRu ? "Оценить проект" : "Estimate project";
  const ctaHref = onPartners ? partnerPanelLoginUrl() : "#";
  const onPartnersCtaClick = onPartners ? () => trackPartnersEvent("partners_login_click", { source: "header" }) : void 0;
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
        className: cx$c(
          needsSpacer ? "h-[78px] sm:h-[82px]" : "h-0"
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "header",
      {
        className: cx$c(
          "pointer-events-none fixed inset-x-0 top-0 z-[120] transition-[transform,opacity]",
          // Float via transform (not `top`) so chrome/scroll never fights a top tween (~12–20px jumps)
          hideHeader ? "-translate-y-full opacity-0" : heroInView && !isMobile ? "translate-y-3 opacity-100 sm:translate-y-4" : "translate-y-0 opacity-100"
        ),
        style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
        children: /* @__PURE__ */ jsx("div", { className: "h-[78px] w-full bg-transparent sm:h-[82px]", children: /* @__PURE__ */ jsx(Container, { className: "h-full", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx$c(
              "relative flex h-full w-full min-w-0 items-center xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center xl:gap-x-4"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: cx$c("flex min-w-0 items-center gap-3 shrink-0 xl:justify-self-start", !hideHeader && "pointer-events-auto"), children: /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/",
                  onClick: (e) => {
                    e.preventDefault();
                    goHome();
                  },
                  className: cx$c(
                    "flex items-center outline-none",
                    "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 rounded-xl"
                  ),
                  "aria-label": ariaHome,
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: logoSrc,
                      alt: "TIVONIX",
                      className: cx$c(
                        "w-auto object-contain object-left opacity-95 transition-all hover:opacity-100",
                        "h-9 sm:h-10"
                      ),
                      draggable: false,
                      loading: "eager",
                      decoding: "async"
                    }
                  )
                }
              ) }),
              heroInView && !isPartners ? /* @__PURE__ */ jsx(
                "div",
                {
                  className: cx$c(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:hidden",
                    !hideHeader && "pointer-events-auto"
                  ),
                  children: /* @__PURE__ */ jsx(LangToggle, { variant: "hero", reducedMotion })
                }
              ) : null,
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cx$c(
                    "relative hidden min-w-0 items-center gap-2 justify-self-center xl:flex",
                    !hideHeader && "pointer-events-auto"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      PillNav,
                      {
                        activeKey,
                        reducedMotion,
                        items: tabsItems,
                        onItemClick: onNav,
                        compact: false
                      }
                    ),
                    !isPartners ? /* @__PURE__ */ jsx(LangToggle, { variant: "hero", reducedMotion }) : null
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: cx$c("ml-auto hidden min-w-0 shrink-0 items-center xl:ml-0 xl:flex xl:justify-self-end", !hideHeader && "pointer-events-auto"), children: onPartners ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: ctaHref,
                  onClick: onPartnersCtaClick,
                  className: "inline-flex h-11 items-center justify-center rounded-full bg-white px-7 font-sans text-[14px] font-medium tracking-normal text-[#070607] no-underline transition hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                  children: ctaTop
                }
              ) : /* @__PURE__ */ jsx(LeadCTAButton, { source: "header", variant: "white", className: "h-11 px-7 text-[14px]", children: ctaTop }) }),
              /* @__PURE__ */ jsxs("div", { className: cx$c("ml-auto xl:hidden flex items-center gap-2", !hideHeader && "pointer-events-auto"), children: [
                /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: onPartners ? /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: ctaHref,
                    onClick: onPartnersCtaClick,
                    className: "inline-flex h-11 items-center justify-center rounded-full bg-white px-6 font-sans text-[13px] font-medium tracking-normal text-[#070607] no-underline transition hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45",
                    children: ctaTop
                  }
                ) : /* @__PURE__ */ jsx(LeadCTAButton, { source: "header", variant: "white", className: "h-11 px-6 text-[13px]", children: ctaTop }) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    ref: burgerRef,
                    type: "button",
                    className: cx$c(
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
        className: cx$c(
          "xl:hidden fixed inset-0 z-[200]",
          open ? "pointer-events-auto" : "pointer-events-none"
        ),
        "aria-hidden": !open,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx$c(
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
                    className: cx$c(
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
                /* @__PURE__ */ jsx("nav", { className: "mt-1 flex flex-col", "aria-label": isRu ? "Навигация" : "Navigation", children: mobileNavItems.map((item) => /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: item.to,
                    className: cx$c(
                      "flex items-center justify-between border-b border-white/[0.08] px-3 py-4 text-[15px] font-medium text-white/92",
                      "transition-colors hover:bg-white/[0.03] active:bg-white/[0.02]",
                      activeKey === item.key && "text-[#FFAE66]"
                    ),
                    onClick: (e) => {
                      onNav(item.to, item.hash)(e);
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
                  onPartners ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: ctaHref,
                      onClick: () => {
                        onPartnersCtaClick?.();
                        setOpen(false);
                      },
                      className: "inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/[0.08] px-6 text-[14px] font-bold text-white no-underline transition hover:bg-white/[0.03]",
                      children: ctaTop
                    }
                  ) : /* @__PURE__ */ jsx(
                    LeadCTAButton,
                    {
                      source: "header",
                      variant: "white",
                      className: "h-12 w-full text-[14px]",
                      "aria-label": leadCopy.ctaDiscuss,
                      onClick: () => setOpen(false),
                      children: leadCopy.ctaDiscuss
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: onPartners ? `${partnersPath(lang)}#partner-formats` : "/plans",
                      className: cx$c(
                        "inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[14px] font-medium text-white",
                        "bg-[#070607] transition hover:bg-[#1a1a1a]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      ),
                      onClick: () => setOpen(false),
                      children: onPartners ? isRu ? "Форматы" : "Formats" : isRu ? "Планы" : "Plans"
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
const Section = React.forwardRef(
  function Section2({ id, className, style, children }, ref) {
    return /* @__PURE__ */ jsx(
      "section",
      {
        ref,
        id,
        style,
        className: ["py-14 sm:py-20", className].filter(Boolean).join(" "),
        children
      }
    );
  }
);
function landingCopy(lang) {
  const isRu = lang === "ru";
  return isRu ? COPY_RU$1 : COPY_EN$1;
}
const COPY_RU$1 = {
  hero: {
    eyebrow: "САЙТЫ · CRM · БОТЫ · ВЕБ-СЕРВИСЫ",
    titleLines: ["Собираем сайты и системы,", "в которых заявки не теряются"],
    titleHighlight: "заявки не теряются",
    scrollStages: [
      {
        headline: "Собираем сайты и системы, в которых заявки не теряются",
        headlineLines: ["Собираем сайты и системы,", "в которых заявки не теряются"],
        headlineBefore: "Собираем сайты и системы,",
        headlineAccent: "в которых заявки не теряются",
        headlineAfter: "",
        lead: "Разрабатываем лендинги, Telegram-ботов, CRM, личные кабинеты и MVP — и связываем их в единый процесс: от первого обращения до оплаты и результата."
      },
      {
        headline: "Форма отправлена. А что происходит дальше?",
        headlineLines: ["Форма отправлена.", "А что происходит дальше?"],
        headlineBefore: "Форма отправлена.",
        headlineAccent: "А что происходит дальше?",
        headlineAfter: "",
        lead: "Когда обращения остаются в чатах, почте и таблицах, команда отвечает поздно, забывает клиентов и не понимает следующий шаг."
      },
      {
        headline: "Одна заявка. Один понятный процесс",
        headlineLines: ["Одна заявка.", "Один понятный процесс"],
        headlineBefore: "Одна заявка.",
        headlineAccent: "Один понятный процесс",
        headlineAfter: "",
        lead: "Связываем сайт, Telegram, CRM, таблицы и внутренние сервисы так, чтобы команда сразу видела клиента, статус и следующий шаг."
      }
    ],
    subtitle: "Разрабатываем лендинги, Telegram-ботов, CRM, личные кабинеты и MVP — и связываем их в единый процесс: от первого обращения до оплаты и результата.",
    ctaPrimary: "Получить оценку проекта",
    ctaSecondary: "Посмотреть живые проекты",
    micro: "Ответим в течение рабочего дня · Работаем по этапам · Передаём исходники и доступы",
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
    title: "Пока заявка живёт в чатах — процесс ломается",
    titleLines: ["Пока заявка живёт в чатах", "процесс ломается"],
    subtitle: "Когда обращения остаются в чатах, почте и таблицах, команда отвечает поздно, забывает клиентов и не понимает следующий шаг.",
    hoverCta: "Как закрываем",
    items: [
      {
        title: "Никто не назначен",
        text: "Заявка пришла, но ответственный не выбран — она зависает, пока кто-то случайно не откроет чат.",
        solution: "Автоназначение или правило маршрутизации: заявка сразу попадает к нужному человеку."
      },
      {
        title: "Ответили слишком поздно",
        text: "Менеджер увидел обращение вечером. К этому моменту клиент уже ушёл к тем, кто ответил быстрее.",
        solution: "Мгновенные уведомления в Telegram или email — заявка не ждёт в переписке."
      },
      {
        title: "Статус неизвестен",
        text: "Непонятно, кто новый, кто ждёт оценки, кто в работе, а кто уже оплатил.",
        solution: "Статусы в CRM или таблице: новая → в работе → оценка отправлена → оплачена."
      },
      {
        title: "Клиент пишет повторно",
        text: "Человеку приходится напоминать о себе, потому что команда потеряла нить диалога.",
        solution: "История и следующий шаг видны в системе — без поиска по чатам."
      }
    ]
  },
  offer: {
    title: "Услуги и продукты",
    featured: {
      badge: "TIVONIX",
      title: "Не только лендинги: сайты, учёт, боты и веб-продукты",
      text: "Собираем то, через что приходят заявки и работают пользователи: от страницы под рекламу до сервиса с ролями и платежами.",
      linkText: "Рассказать о задаче",
      footer: "Фиксируем объём до старта и показываем результат по этапам"
    },
    metrics: [
      {
        title: "Сайты и лендинги",
        text: "Страницы, которые объясняют предложение, собирают обращения и передают их команде."
      },
      {
        title: "Телеграм боты",
        text: "Боты принимают заявки, задают вопросы, уведомляют сотрудников и показывают клиенту следующий шаг."
      },
      {
        title: "Админ панели и учёт",
        text: "Компактные системы под ваш процесс: статусы, ответственные, история, роли и отчёты."
      },
      {
        title: "Личные кабинеты",
        text: "Интерфейсы для клиентов, партнёров и сотрудников с авторизацией, документами, оплатой и историей."
      },
      {
        title: "Сервисы и автоматизация",
        text: "Первая версия продукта с ролями и платежами или связка форм, ботов, таблиц и учёта без ручного переноса."
      }
    ],
    ctaBar: {
      title: "Соберём систему, где заявки не теряются — или первую версию продукта.",
      primary: "Получить оценку",
      secondary: "Рассчитать проект"
    }
  },
  ai: {
    ariaLabel: "TIVONIX — AI в продуктах для бизнеса",
    centerBadge: "TIVONIX AI",
    headline: "AI там, где он действительно экономит время",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["Разбор заявок", "Документы", "Черновики ответов", "CRM", "Поддержка"]
  },
  flow: {
    label: "Решение",
    title: "Форма отправлена. А что происходит дальше?",
    titleMuted: "Нормальный путь: заявка сохраняется, команда получает сигнал, есть ответственный, статус и следующий шаг — без поиска по чатам.",
    steps: [
      {
        label: "Заявка",
        title: "Клиент оставляет обращение",
        desc: "С сайта, бота, рекламы или формы"
      },
      {
        label: "Уведомление",
        title: "Команда получает сигнал",
        desc: "В Telegram или на email — сразу"
      },
      {
        label: "Ответственный",
        title: "Назначается владелец",
        desc: "Понятно, кто отвечает за заявку"
      },
      {
        label: "Статус",
        title: "Статус всегда актуален",
        desc: "Новая → в работе → оценка → оплата"
      },
      {
        label: "Оплата",
        title: "Сделка доходит до результата",
        desc: "Без потери контекста по пути"
      }
    ]
  },
  pricingTeaser: {
    eyebrow: "Тарифы",
    title: "Планы запуска",
    more: "Подробнее"
  },
  compare: {
    title: "Обычный сайт и система TIVONIX",
    subtitle: "Разница не в «красивой странице», а в том, что происходит после отправки формы.",
    regular: {
      title: "Обычный сайт",
      headline: "Форма есть — дальше вручную",
      items: [
        "Форма отправлена",
        "Письмо лежит во входящих",
        "Статус неизвестен",
        "Ответственный не назначен",
        "Данные переносятся вручную"
      ]
    },
    chaosTags: ["Заявка теряется", "Нет статуса", "Excel вручную", "Ответ на следующий день"],
    tivonix: {
      title: "Система TIVONIX",
      headline: "Заявка под контролем",
      badge: "Заявка не висит в переписке — команда видит следующий шаг",
      items: [
        "Заявка сразу приходит в нужный канал",
        "Автоматически создаётся запись",
        "Назначается ответственный",
        "Команда видит статус",
        "Руководитель видит результат"
      ]
    },
    cta: "Разобрать мой процесс"
  },
  cases: {
    badge: "Новый кейс",
    cta: "Хочу похожую систему",
    viewCase: "Смотреть кейс",
    openProduct: "Открыть продукт",
    discussSimilar: "Есть похожая задача",
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
    },
    tivonixpanel: {
      need: "Нужна была партнёрская панель — кабинет, где агентства и фрилансеры ведут сделки, статусы и выплаты без хаоса в чатах",
      done: "Собрали логин, онбординг, дашборд сделок, модели Referral / White-label и трекинг проектов с выплатами",
      modules: [
        "Логин",
        "Онбординг",
        "Дашборд",
        "Referral",
        "White-label",
        "Сделки",
        "Проекты",
        "Выплаты"
      ],
      ownProduct: "Собственный продукт TIVONIX"
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
          "Определяем пользователей, основной сценарий и результат первой версии."
        ]
      },
      {
        kind: "bullets",
        title: "Фиксируем объём",
        items: [
          "Согласовываем функции, этапы, сроки, стоимость и формат связи."
        ]
      },
      {
        kind: "bullets",
        title: "Показываем прототип или структуру",
        items: [
          "До разработки проверяем логику экранов и ключевой путь пользователя."
        ]
      },
      {
        kind: "bullets",
        title: "Разрабатываем по этапам",
        items: [
          "После каждого этапа показываем рабочий результат и собираем обратную связь."
        ]
      },
      {
        kind: "bullets",
        title: "Тестируем и запускаем",
        items: [
          "Проверяем мобильную версию, формы, роли, интеграции и основные сценарии."
        ]
      },
      {
        kind: "bullets",
        title: "Передаём и поддерживаем",
        items: [
          "Передаём исходники, доступы и инструкции. После запуска исправляем выявленные ошибки в рамках согласованной гарантии."
        ]
      }
    ]
  },
  finalCta: {
    title: "Расскажите, что нужно запустить",
    subtitle: "Опишите задачу своими словами. Мы разберём её и отправим предварительный план, срок и диапазон стоимости.",
    ctaPrimary: "Получить оценку",
    ctaSecondary: "Написать в Telegram",
    micro: "Ответим в течение рабочего дня. Созвон не обязателен. Контакты не передаём третьим лицам."
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
    eyebrow: "WEBSITES · CRM · BOTS · WEB APPS",
    titleLines: ["We build sites and systems", "where leads do not get lost"],
    titleHighlight: "leads do not get lost",
    scrollStages: [
      {
        headline: "We build sites and systems where leads do not get lost",
        headlineLines: ["We build sites and systems", "where leads do not get lost"],
        headlineBefore: "We build sites and systems",
        headlineAccent: "where leads do not get lost",
        headlineAfter: "",
        lead: "We develop landing pages, Telegram bots, CRMs, client portals and MVPs — and connect them into one process: from first inquiry to payment and result."
      },
      {
        headline: "The form was submitted. What happens next?",
        headlineLines: ["The form was submitted.", "What happens next?"],
        headlineBefore: "The form was submitted.",
        headlineAccent: "What happens next?",
        headlineAfter: "",
        lead: "When inquiries live in chats, inboxes and spreadsheets, the team replies late, forgets clients and does not know the next step."
      },
      {
        headline: "One lead. One clear process",
        headlineLines: ["One lead.", "One clear process"],
        headlineBefore: "One lead.",
        headlineAccent: "One clear process",
        headlineAfter: "",
        lead: "We connect the site, Telegram, CRM, sheets and internal tools so the team sees the client, status and next step right away."
      }
    ],
    subtitle: "We develop landing pages, Telegram bots, CRMs, client portals and MVPs — and connect them into one process: from first inquiry to payment and result.",
    ctaPrimary: "Get a project estimate",
    ctaSecondary: "See live projects",
    micro: "We reply within a business day · Phased delivery · Source code and access handed over",
    flowNodes: ["Lead", "Processing", "Telegram", "CRM"],
    flowNodeHints: ["From site", "Auto", "Alert", "In CRM"],
    flowTelegramBot: "TIVONIX Bot",
    flowDisplayChips: ["Landing", "Form", "Telegram"],
    flowAnalysis: {
      headline: "Task reviewed",
      lead: "The landing captures traffic, the form saves contact details, Telegram alerts your team — the lead doesn’t sit in a chat thread.",
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
    title: "While leads live in chats — the process breaks",
    titleLines: ["While leads live in chats", "the process breaks"],
    subtitle: "When inquiries live in chats, inboxes and spreadsheets, the team replies late, forgets clients and doesn’t know the next step.",
    hoverCta: "How we fix it",
    items: [
      {
        title: "No owner assigned",
        text: "The lead arrived, but nobody owns it — it sits until someone opens the chat by chance.",
        solution: "Auto-assignment or routing rules: the lead goes to the right person immediately."
      },
      {
        title: "Reply came too late",
        text: "The manager saw it in the evening. By then the client already went to whoever answered faster.",
        solution: "Instant Telegram or email alerts — leads don’t wait in threads."
      },
      {
        title: "Status unknown",
        text: "Unclear who is new, who waits for a quote, who is in progress, and who already paid.",
        solution: "Statuses in CRM or a sheet: new → in progress → quote sent → paid."
      },
      {
        title: "Client has to follow up",
        text: "People have to remind you about themselves because the team lost the thread.",
        solution: "History and next step stay visible in the system — no chat archaeology."
      }
    ]
  },
  offer: {
    title: "Services and products",
    featured: {
      badge: "TIVONIX",
      title: "Not only landing pages — sites, CRM, bots and web products",
      text: "We build what captures leads and runs users: from an ad page to SaaS with roles and payments.",
      linkText: "Tell us about your task",
      footer: "We lock scope before start — and show results by stage"
    },
    metrics: [
      {
        title: "Websites and landing pages",
        text: "Pages that explain the offer, capture inquiries and hand them to your team."
      },
      {
        title: "Telegram bots",
        text: "Bots take leads, ask questions, alert staff and show the client the next step."
      },
      {
        title: "CRM and admin panels",
        text: "Compact systems for your process: statuses, owners, history, roles and reports."
      },
      {
        title: "Client portals",
        text: "Interfaces for clients, partners and staff with auth, documents, payments and history."
      },
      {
        title: "SaaS, MVP and automation",
        text: "A first product version with roles and payments — or forms, Telegram, sheets and CRM without manual hopping."
      }
    ],
    ctaBar: {
      title: "We’ll build a system where leads don’t get lost — or a first product version.",
      primary: "Get an estimate",
      secondary: "Estimate the project"
    }
  },
  ai: {
    ariaLabel: "TIVONIX — AI in business products",
    centerBadge: "TIVONIX AI",
    headline: "AI where it actually saves time",
    models: ["OpenAI", "Claude", "Gemini", "Grok"],
    tags: ["Lead triage", "Documents", "Reply drafts", "CRM", "Support"]
  },
  flow: {
    label: "Solution",
    title: "Form submitted. What happens next?",
    titleMuted: "The right path: the lead is saved, the team gets a signal, someone owns it, status and next step stay clear — without digging through chats.",
    steps: [
      {
        label: "Lead",
        title: "Client submits a request",
        desc: "From the site, bot, ads or a form"
      },
      {
        label: "Alert",
        title: "Team gets a signal",
        desc: "In Telegram or email — immediately"
      },
      {
        label: "Owner",
        title: "An owner is assigned",
        desc: "Clear who is responsible"
      },
      {
        label: "Status",
        title: "Status stays up to date",
        desc: "New → in progress → quote → paid"
      },
      {
        label: "Payment",
        title: "The deal reaches a result",
        desc: "Without losing context along the way"
      }
    ]
  },
  pricingTeaser: {
    eyebrow: "Pricing",
    title: "Launch plans",
    more: "Learn more"
  },
  compare: {
    title: "Typical website vs TIVONIX system",
    subtitle: "The difference isn’t a prettier page — it’s what happens after the form is submitted.",
    regular: {
      title: "Typical website",
      headline: "Form submitted — then manual work",
      items: [
        "Form submitted",
        "Email sits in the inbox",
        "Status unknown",
        "No owner assigned",
        "Data moved by hand"
      ]
    },
    chaosTags: ["Lead gets lost", "No status", "Manual Excel", "Reply the next day"],
    tivonix: {
      title: "TIVONIX system",
      headline: "Lead under control",
      badge: "Lead doesn’t sit in chat — the team sees the next step",
      items: [
        "Lead arrives in the right channel",
        "A record is created automatically",
        "An owner is assigned",
        "The team sees the status",
        "Leadership sees the result"
      ]
    },
    cta: "Map my process"
  },
  cases: {
    badge: "New case",
    cta: "I want a similar system",
    viewCase: "View case",
    openProduct: "Open product",
    discussSimilar: "Similar task",
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
    },
    tivonixpanel: {
      need: "Needed a partner panel — a dashboard where agencies and freelancers track deals, statuses and payouts without chat chaos",
      done: "Built login, onboarding, deals dashboard, Referral / White-label models and project payout tracking",
      modules: [
        "Login",
        "Onboarding",
        "Dashboard",
        "Referral",
        "White-label",
        "Deals",
        "Projects",
        "Payouts"
      ],
      ownProduct: "TIVONIX own product"
    }
  },
  audience: {
    badge: "TIVONIX",
    title: "Who we help",
    subtitle: "Businesses that need more than a pretty site — a working system: leads, bookings, statuses, payments or a client area.",
    callouts: {
      left: {
        text: "Leads reach the manager in under a minute — not buried in chats or tomorrow’s spreadsheet."
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
        text: "Telegram alerts, statuses — clients don’t wait and leave."
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
      { title: "Small business", desc: "When leads are handled manually — and that’s already getting in the way" }
    ]
  },
  process: {
    title: "How we work",
    steps: [
      {
        kind: "bullets",
        title: "We clarify the task",
        items: [
          "We define users, the core scenario and the first-version outcome."
        ]
      },
      {
        kind: "bullets",
        title: "We lock the scope",
        items: [
          "We agree on features, stages, timeline, cost and how we communicate."
        ]
      },
      {
        kind: "bullets",
        title: "We show a prototype or structure",
        items: [
          "Before build we validate screen logic and the key user path."
        ]
      },
      {
        kind: "bullets",
        title: "We develop in stages",
        items: [
          "After each stage we show a working result and gather feedback."
        ]
      },
      {
        kind: "bullets",
        title: "We test and launch",
        items: [
          "We check mobile, forms, roles, integrations and core flows."
        ]
      },
      {
        kind: "bullets",
        title: "We hand over and support",
        items: [
          "We hand over source code, access and instructions. After launch we fix issues found within the agreed warranty."
        ]
      }
    ]
  },
  finalCta: {
    title: "Tell us what you need to launch",
    subtitle: "Describe the task in your own words. We’ll review it and send a preliminary plan, timeline and cost range.",
    ctaPrimary: "Get an estimate",
    ctaSecondary: "Message on Telegram",
    micro: "We reply within a business day. A call is optional. We don’t share contacts with third parties."
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
function isTelegramWebView() {
  if (typeof window === "undefined") return false;
  if (window.TelegramWebviewProxy != null) return true;
  const ua = navigator.userAgent || "";
  if (/Telegram/i.test(ua)) return true;
  return false;
}
function useKeepVideoPlaying(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.disableRemotePlayback = true;
    const play = () => {
      if (document.visibilityState === "hidden") return;
      if (!video.paused && !video.ended) return;
      void video.play().catch(() => {
      });
    };
    play();
    const onReady = () => play();
    const onEnded = () => {
      video.currentTime = 0;
      play();
    };
    const onPause = () => {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(play);
      }
    };
    const onVis = () => {
      if (document.visibilityState === "visible") play();
    };
    const onPageShow = () => play();
    const unlock = () => play();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("ended", onEnded);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });
    const watchdog = window.setInterval(() => {
      if (document.visibilityState === "visible" && (video.paused || video.ended)) {
        play();
      }
    }, 700);
    return () => {
      window.clearInterval(watchdog);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
    };
  }, [videoRef]);
}
let frozenH = 0;
function readNow() {
  frozenH = window.innerHeight || frozenH || 800;
}
function getStableViewportHeight() {
  if (typeof window === "undefined") return 800;
  if (!frozenH) readNow();
  return frozenH;
}
const HERO_VIDEO = "/images/hero-bg.mp4";
const HERO_POSTER = "/images/hero-bg-poster.webp";
const SCROLL_TRACK_VH = 240;
function cx$b(...a) {
  return a.filter(Boolean).join(" ");
}
function clamp01$3(v) {
  return Math.min(1, Math.max(0, v));
}
function smoothstep$1(t) {
  const x = clamp01$3(t);
  return x * x * (3 - 2 * x);
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
  const t = smoothstep$1((local - hold) / (1 - hold));
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
      scrollable = Math.max(1, el.offsetHeight - getStableViewportHeight());
    };
    const update = () => {
      raf = 0;
      setProgress(clamp01$3((window.scrollY - trackTop) / scrollable));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 10) return;
      lastW = window.innerWidth;
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
function HeroHeadline({ stage }) {
  const lines = stage.headlineLines && stage.headlineLines.length > 0 ? stage.headlineLines : [stage.headline];
  return /* @__PURE__ */ jsx("h1", { className: cx$b(HERO_SCROLL_HEADLINE_CLASS, "hero-scroll-headline mx-auto text-center"), children: lines.map((line, i) => /* @__PURE__ */ jsx("span", { className: "hero-scroll-headline__line block", children: line }, `${line}-${i}`)) });
}
function HeroCard({
  progress,
  stages,
  ctaPrimary,
  ctaSecondary,
  micro
}) {
  const textOpacity = useMemo(() => textOpacities(progress), [progress]);
  const activeStage = textOpacity[2] > 0.5 ? 2 : textOpacity[1] > 0.5 ? 1 : 0;
  const videoRef = useRef(null);
  useKeepVideoPlaying(videoRef);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$b(
        "relative isolate h-full min-h-0 flex-1 overflow-visible rounded-[40px] bg-black"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-black", children: [
          /* @__PURE__ */ jsx(
            "video",
            {
              ref: videoRef,
              className: "pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover object-center",
              src: HERO_VIDEO,
              poster: HERO_POSTER,
              autoPlay: true,
              muted: true,
              loop: true,
              playsInline: true,
              preload: "auto",
              controls: false,
              disablePictureInPicture: true,
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55",
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 shadow-[inset_0_-3px_0_0_#000,inset_-3px_0_0_0_#000]",
              "aria-hidden": true
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center pt-[calc(4.875rem+0.5rem)] pb-6 sm:pt-[calc(var(--tivonix-header-spacer)+1.5rem)]", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx$b(
              LANDING_SHELL_CLASS,
              "pointer-events-none relative flex w-full flex-1 flex-col items-center justify-center"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: "relative grid w-full flex-1 justify-items-center content-center", children: stages.map((stage, i) => {
                const opacity = textOpacity[i];
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "hero-stage-copy col-start-1 row-start-1 flex w-full flex-col items-center justify-center text-center",
                    style: {
                      opacity,
                      visibility: opacity < 0.04 ? "hidden" : "visible"
                    },
                    "aria-hidden": i !== activeStage,
                    children: [
                      /* @__PURE__ */ jsx(HeroHeadline, { stage }),
                      /* @__PURE__ */ jsx("p", { className: "pointer-events-none mt-4 max-w-[38rem] px-2 text-[14px] font-medium leading-[1.55] text-white/72 sm:mt-5 sm:text-[15px]", children: stage.lead })
                    ]
                  },
                  stage.headline
                );
              }) }),
              /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto relative z-20 mt-6 flex w-full max-w-[38rem] flex-col items-center gap-3 px-2 sm:mt-8", children: [
                /* @__PURE__ */ jsx(
                  LeadCTAButton,
                  {
                    source: "hero",
                    variant: "primary",
                    size: "lg",
                    className: "min-h-[48px] w-full max-w-[20rem] shadow-[0_12px_40px_rgba(255,107,44,0.28)] sm:min-h-[52px] sm:max-w-[22rem]",
                    children: ctaPrimary
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/projects",
                    className: "inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 text-[13px] font-semibold text-white/82 transition hover:border-white/35 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55",
                    children: ctaSecondary
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "max-w-[34rem] text-center text-[11px] font-medium leading-snug text-white/45 sm:text-[12px]", children: micro })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
function Hero() {
  const trackRef = useRef(null);
  const progress = useHeroScrollProgress(trackRef);
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const stages = copy.hero.scrollStages;
  const [tgWebView, setTgWebView] = useState(false);
  useEffect(() => {
    setTgWebView(isTelegramWebView());
  }, []);
  const cardProps = {
    stages,
    ctaPrimary: copy.hero.ctaPrimary,
    ctaSecondary: copy.hero.ctaSecondary,
    micro: copy.hero.micro
  };
  if (tgWebView) {
    return /* @__PURE__ */ jsx(
      Section,
      {
        className: cx$b(
          "relative z-[1] isolate overflow-hidden bg-transparent !py-0",
          "min-h-[100svh] pb-0"
        ),
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: cx$b(
              "mx-auto flex h-[calc(100svh-1.25rem)] min-h-0 w-full max-w-none flex-col",
              "px-3 pt-2.5 pb-2.5",
              "sm:max-w-[min(98vw,1840px)] sm:px-3",
              "lg:px-4 lg:pt-3 lg:pb-3"
            ),
            children: /* @__PURE__ */ jsx(HeroCard, { progress: 1, ...cardProps })
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: trackRef,
      className: "hero-scroll-track relative",
      style: { height: `${SCROLL_TRACK_VH}svh` },
      children: /* @__PURE__ */ jsx(
        Section,
        {
          className: cx$b(
            "hero-scroll-sticky sticky top-0 z-[1] isolate overflow-hidden bg-transparent !py-0",
            "min-h-[100svh] pb-0"
          ),
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cx$b(
                "mx-auto flex h-[calc(100svh-1.25rem)] min-h-0 w-full max-w-none flex-col",
                "px-3 pt-2.5 pb-2.5",
                "sm:max-w-[min(98vw,1840px)] sm:px-3",
                "lg:px-4 lg:pt-3 lg:pb-3"
              ),
              children: /* @__PURE__ */ jsx(HeroCard, { progress, ...cardProps })
            }
          )
        }
      )
    }
  );
}
function Reveal$1({ children, className, delay = 0 }) {
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
        visible ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-[0.55s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]" : "translate-y-3 opacity-0"
      ].filter(Boolean).join(" "),
      style,
      children
    }
  );
}
function homeExtraCopy(lang) {
  return lang === "ru" ? COPY_RU : COPY_EN;
}
const COPY_RU = {
  trust: {
    ariaLabel: "Почему можно доверять",
    items: [
      "Поддержка после запуска"
    ]
  },
  featured: {
    eyebrow: "Проекты",
    title: "Три живых результата",
    subtitle: "Разные типы задач — от финтех-платформы до локального бизнеса.",
    viewCase: "Посмотреть кейс",
    openLive: "Открыть проект",
    problem: "Проблема:",
    solution: "Решение:",
    resultLabel: "Результат:",
    prev: "Предыдущий кейс",
    next: "Следующий кейс",
    items: [
      {
        id: "spliton",
        type: "Веб-продукт · FinTech",
        problem: "Нужна была финтех-платформа для долей в музыке — не лендинг, а полноценный продукт с деньгами, ролями и комплаенсом.",
        solution: "Собрали каталог релизов, кабинеты, KYC, платежи, вторичный рынок и портал оператора.",
        result: "Финтех-платформа в продакшене: кабинеты, роли, KYC, платежи и вторичный рынок.",
        modules: [
          "Кабинеты",
          "KYC",
          "Платежи",
          "Вторичный рынок",
          "Админ-панель",
          "i18n"
        ]
      },
      {
        id: "slotty",
        type: "Маркетплейс · запись",
        problem: "Нужен был не лендинг с кнопкой, а маркетплейс записи: каталог, слоты, кабинет мастера и оплата.",
        solution: "Собрали каталог с фильтрами и картой, Telegram Mini App, кабинет Free/Pro, админку и bePaid.",
        result: "Маркетплейс на slotty.of.by: запись без звонков, кабинеты и платежи в одной системе.",
        modules: [
          "Каталог",
          "Карта",
          "Слоты",
          "Кабинет мастера",
          "Telegram",
          "bePaid"
        ]
      },
      {
        id: "logovo",
        type: "Локальный бизнес",
        problem: "Клиент с дороги не находил филиал и запись — адреса и CTA прятались, заявка терялась.",
        solution: "Собрали сайт сети: филиалы, услуги, цены, карта и короткий путь до заявки или звонка.",
        result: "Сайт сети шиномонтажей с филиалами, услугами, ценами и маршрутом до заявки.",
        modules: ["Филиалы", "Услуги", "Цены", "Карта", "Запись", "B2B"]
      }
    ]
  },
  direction: {
    eyebrow: "Направления",
    title: "Что нужно запустить?",
    subtitle: "Выберите сценарий — разберём задачу и предложим первый шаг.",
    leads: {
      label: "Заявки",
      title: "Собрать заявки в один поток",
      text: "Сайт, бот и CRM — один маршрут до ответа.",
      cta: "Разобрать путь",
      points: ["Сайт и лендинг", "Telegram-бот", "Mini-CRM"],
      stack: [
        {
          title: "Сайт",
          text: "Форма → заявка сразу",
          headline: "Пользователь заполняет форму",
          mock: "form",
          mockName: "Иван",
          mockContact: "+375 29 000-00-00",
          mockSubmit: "Отправить"
        },
        {
          title: "Бот",
          text: "Уведомление в Telegram",
          headline: "Заявка приходит в бот",
          mock: "bot",
          mockName: "Новая заявка",
          mockContact: "Иван · сайт",
          mockSubmit: "сейчас"
        },
        {
          title: "CRM",
          text: "Ответственный назначен",
          headline: "Ответственный берёт в работу",
          mock: "crm",
          mockName: "Иван · сайт",
          mockContact: "Анна",
          mockSubmit: "В работе"
        }
      ]
    },
    product: {
      label: "Продукт",
      title: "Запустить продукт",
      text: "MVP с кабинетом, ролями и платежами.",
      cta: "Обсудить MVP",
      points: ["Личный кабинет", "Роли и доступы", "Платежи"],
      stack: [
        {
          title: "SaaS / MVP",
          text: "Первая рабочая версия",
          headline: "Собираем первую версию",
          mock: "mvp",
          mockName: "Dashboard",
          mockContact: "12 задач",
          mockSubmit: "Live"
        },
        {
          title: "Кабинет",
          text: "Роли без хаоса",
          headline: "Роли и доступы в кабинете",
          mock: "cabinet",
          mockName: "Клиент",
          mockContact: "Менеджер",
          mockSubmit: "Админ"
        },
        {
          title: "Платежи",
          text: "Интеграции под ключ",
          headline: "Подключаем оплату",
          mock: "pay",
          mockName: "Оплата",
          mockContact: "4 900 ₽",
          mockSubmit: "Успешно"
        }
      ]
    }
  },
  solution: {
    outcomes: [
      "Заявка не потеряна",
      "Ответственный назначен",
      "Следующий шаг понятен"
    ]
  },
  aiScenarios: {
    title: "AI там, где он действительно экономит время",
    note: "Подбираем модель под задачу и требования к данным — не добавляем AI ради логотипа.",
    items: [
      {
        title: "Разбор заявок",
        text: "AI определяет тему обращения, извлекает ключевые данные и направляет заявку нужному сотруднику."
      },
      {
        title: "Работа с документами",
        text: "Система читает файлы, извлекает реквизиты и сохраняет данные в нужные поля."
      },
      {
        title: "Помощь менеджеру",
        text: "AI находит информацию в базе компании и готовит черновик ответа клиенту."
      }
    ]
  },
  homePricing: {
    eyebrow: "Тарифы",
    title: "Понятный старт без скрытых обещаний",
    note: "Стоимость зависит от количества экранов, ролей, интеграций и сложности бизнес-логики. До старта фиксируем объём, этапы и стоимость.",
    allPlans: "Сравнить все планы",
    more: "Подробнее",
    ctas: {
      start: "Получить состав Start",
      growth: "Оценить Growth",
      product: "Рассчитать MVP",
      custom: "Обсудить Custom"
    }
  },
  guarantees: {
    title: "Понятные условия до начала разработки",
    subtitle: "До старта письменно фиксируем объём, сроки, стоимость и ответственность сторон.",
    items: [
      "Объём и стоимость фиксируются до старта этапа",
      "Работа делится на понятные части",
      "Клиент видит промежуточный результат",
      "Исходный код и доступы передаются клиенту",
      "Конфиденциальные данные не публикуются",
      "Перед запуском проверяются ключевые сценарии",
      "Условия поддержки согласовываются заранее"
    ]
  },
  founder: {
    title: "За проект отвечает не безликая студия",
    name: "Данила Титовец",
    role: "Основатель TIVONIX, full-stack разработчик",
    bio: "Отвечает за архитектуру, разработку и запуск проектов. В зависимости от задачи подключает специалистов по дизайну, frontend, backend, мобильной разработке и продвижению.",
    cta: "Написать основателю"
  },
  team: {
    title: "Над проектом работает команда",
    text: "TIVONIX — продуктовая команда: дизайн, разработка, тестирование и запуск в одной связке. Собираем состав под задачу для быстрого внедрения продукта и осуществления ваших мечт — и ведём проект до результата.",
    cta: "О компании",
    members: [
      { initials: "ДТ", name: "Данила Т.", role: "Архитектура и full-stack" },
      { initials: "АК", name: "Анна К.", role: "UI/UX дизайн" },
      { initials: "МС", name: "Максим С.", role: "Frontend-разработка" },
      { initials: "ИВ", name: "Игорь В.", role: "Backend-разработка" },
      { initials: "ЕН", name: "Елена Н.", role: "Тестирование и QA" },
      { initials: "РП", name: "Роман П.", role: "Проджект-менеджмент" }
    ]
  },
  testimonials: {
    eyebrow: "Отзывы",
    title: "Что говорят о работе",
    viewCase: "Кейс",
    ownProduct: "Собственный продукт TIVONIX"
  },
  scale: {
    badge: "Живые системы",
    title: "Запускаем продукты, в которых заявки не теряются",
    seal: "От идеи до запуска",
    foot: "Сайты, Telegram, CRM, кабинеты и MVP в одной связке. Фиксируем объём, сроки и передаём код с доступами.",
    stats: [
      { value: "7+", label: "Проектов в продакшене" },
      { value: "1 нед.", label: "Быстрый запуск панели" },
      { value: "100%", label: "Код и доступы у вас" },
      { value: "BY · RU", label: "География запусков" }
    ]
  },
  mobileSticky: {
    label: "Получить оценку"
  }
};
const COPY_EN = {
  trust: {
    ariaLabel: "Why you can trust us",
    items: [
      "Support after launch"
    ]
  },
  featured: {
    eyebrow: "Projects",
    title: "Three live results",
    subtitle: "Different project types — from a fintech platform to local business.",
    viewCase: "View case",
    openLive: "Open live",
    problem: "Problem:",
    solution: "Solution:",
    resultLabel: "Result:",
    prev: "Previous case",
    next: "Next case",
    items: [
      {
        id: "spliton",
        type: "Web product · FinTech",
        problem: "Needed a fintech platform for music shares — a full product with money flows, roles and compliance, not a landing page.",
        solution: "Built release catalog, portals, KYC, payments, secondary market and an operator portal.",
        result: "Fintech platform in production: portals, roles, KYC, payments and a secondary market.",
        modules: [
          "Portals",
          "KYC",
          "Payments",
          "Secondary market",
          "Admin",
          "i18n"
        ]
      },
      {
        id: "slotty",
        type: "Marketplace · booking",
        problem: "Needed more than a “book now” landing — a booking marketplace with catalog, slots, master cabinet and payments.",
        solution: "Built filtered catalog + map, Telegram Mini App, Free/Pro master cabinet, admin and bePaid.",
        result: "Marketplace on slotty.of.by: book without calls, cabinets and payments in one system.",
        modules: [
          "Catalog",
          "Map",
          "Slots",
          "Master cabinet",
          "Telegram",
          "bePaid"
        ]
      },
      {
        id: "logovo",
        type: "Local business",
        problem: "Drivers couldn’t find a branch or booking path — addresses and CTAs were buried, leads were lost.",
        solution: "Built a network site: branches, services, prices, map and a short path to book or call.",
        result: "Tire-service network site with branches, services, prices and a clear path to a lead.",
        modules: ["Branches", "Services", "Prices", "Map", "Booking", "B2B"]
      }
    ]
  },
  direction: {
    eyebrow: "Directions",
    title: "What do you need to launch?",
    subtitle: "Pick a path — we’ll review the task and suggest the first step.",
    leads: {
      label: "Leads",
      title: "One stream for every lead",
      text: "Site, bot and CRM — one path to a reply.",
      cta: "Map the path",
      points: ["Website & landing", "Telegram bot", "Mini-CRM"],
      stack: [
        {
          title: "Site",
          text: "Form → lead instantly",
          headline: "The user fills out the form",
          mock: "form",
          mockName: "Alex",
          mockContact: "+1 555 010-2030",
          mockSubmit: "Send"
        },
        {
          title: "Bot",
          text: "Alert in Telegram",
          headline: "The lead lands in the bot",
          mock: "bot",
          mockName: "New lead",
          mockContact: "Alex · site",
          mockSubmit: "now"
        },
        {
          title: "CRM",
          text: "Owner assigned",
          headline: "An owner picks it up",
          mock: "crm",
          mockName: "Alex · site",
          mockContact: "Anna",
          mockSubmit: "In progress"
        }
      ]
    },
    product: {
      label: "Product",
      title: "Launch a product",
      text: "MVP with portal, roles and payments.",
      cta: "Discuss MVP",
      points: ["Client portal", "Roles & access", "Payments"],
      stack: [
        {
          title: "SaaS / MVP",
          text: "First working version",
          headline: "We ship the first version",
          mock: "mvp",
          mockName: "Dashboard",
          mockContact: "12 tasks",
          mockSubmit: "Live"
        },
        {
          title: "Portal",
          text: "Roles without chaos",
          headline: "Roles and access in the portal",
          mock: "cabinet",
          mockName: "Client",
          mockContact: "Manager",
          mockSubmit: "Admin"
        },
        {
          title: "Payments",
          text: "Integrations included",
          headline: "Payments get connected",
          mock: "pay",
          mockName: "Payment",
          mockContact: "$49",
          mockSubmit: "Paid"
        }
      ]
    }
  },
  solution: {
    outcomes: [
      "Lead not lost",
      "Owner assigned",
      "Next step is clear"
    ]
  },
  aiScenarios: {
    title: "AI where it actually saves time",
    note: "We pick the model for the task and data requirements — we don’t add AI for the logo.",
    items: [
      {
        title: "Lead triage",
        text: "AI detects the topic, extracts key fields and routes the lead to the right person."
      },
      {
        title: "Document handling",
        text: "The system reads files, extracts details and fills the right fields."
      },
      {
        title: "Manager assist",
        text: "AI finds info in your company knowledge base and drafts a reply for the client."
      }
    ]
  },
  homePricing: {
    eyebrow: "Pricing",
    title: "A clear start without vague promises",
    note: "Price depends on screens, roles, integrations and business logic. Before we start we lock scope, stages and cost.",
    allPlans: "Compare all plans",
    more: "Details",
    ctas: {
      start: "Get Start scope",
      growth: "Estimate Growth",
      product: "Estimate MVP",
      custom: "Discuss Custom"
    }
  },
  guarantees: {
    title: "Clear terms before development starts",
    subtitle: "Before kickoff we put scope, timeline, cost and responsibilities in writing.",
    items: [
      "Scope and cost are fixed before a stage starts",
      "Work is split into clear parts",
      "You see intermediate results",
      "Source code and access are handed over",
      "Confidential data is not published",
      "Key flows are checked before launch",
      "Support terms are agreed in advance"
    ]
  },
  founder: {
    title: "A real person owns the project — not a faceless studio",
    name: "Danila Titovets",
    role: "Founder of TIVONIX, full-stack developer",
    bio: "Owns architecture, development and launch. Depending on the task, brings in design, frontend, backend, mobile and growth specialists.",
    cta: "Message the founder"
  },
  team: {
    title: "A team works on your project",
    text: "TIVONIX is a product team: design, engineering, QA and launch in one loop. We assemble the right mix for fast product delivery — and turn your ideas into a live result.",
    cta: "About the company",
    members: [
      { initials: "DT", name: "Danila T.", role: "Architecture & full-stack" },
      { initials: "AK", name: "Anna K.", role: "UI/UX design" },
      { initials: "MS", name: "Maxim S.", role: "Frontend engineering" },
      { initials: "IV", name: "Igor V.", role: "Backend engineering" },
      { initials: "EN", name: "Elena N.", role: "QA & testing" },
      { initials: "RP", name: "Roman P.", role: "Project management" }
    ]
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    viewCase: "Case",
    ownProduct: "TIVONIX own product"
  },
  scale: {
    badge: "Live systems",
    title: "We ship products where leads don’t get lost",
    seal: "From idea to launch",
    foot: "Sites, Telegram, CRM, portals and MVPs in one loop. We lock scope and timelines, then hand over code and access.",
    stats: [
      { value: "7+", label: "Projects in production" },
      { value: "1 wk", label: "Fastest panel launch" },
      { value: "100%", label: "Code and access yours" },
      { value: "BY · RU", label: "Where we ship" }
    ]
  },
  mobileSticky: {
    label: "Get an estimate"
  }
};
const UPC_DOMAIN = "https://upc.watch/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const LOGOVO_DOMAIN = "https://www.logovo24.by/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const SLOTTY_DOMAIN = "https://slotty.of.by/book";
const SPLITON_DOMAIN = "https://spliton.io/app";
const TIVONIXPANEL_DOMAIN = "https://tivonixpanel-production.up.railway.app/login";
const PUBLIC_PROJECT_IDS = [
  "tivonixpanel",
  "spliton",
  "slotty",
  "headmind",
  "logovo"
];
const SLOTTY_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/slotty/r${i + 1}.webp`);
const SPLITON_GALLERY = Array.from({ length: 9 }, (_, i) => `/images/project-priew/spliton/g${i + 1}.webp`);
const TIVONIXPANEL_GALLERY = [
  "/images/project-priew/tivonixpanel/1.webp",
  "/images/project-priew/tivonixpanel/2.webp",
  "/images/project-priew/tivonixpanel/3.webp",
  "/images/project-priew/tivonixpanel/4.webp",
  "/images/project-priew/tivonixpanel/5.webp",
  "/images/project-priew/tivonixpanel/6.webp",
  "/images/project-priew/tivonixpanel/7.webp",
  "/images/project-priew/tivonixpanel/8.webp"
];
function buildAllProjects(isRu) {
  return [
    // 0) TIVONIX PANEL — партнёрская панель
    {
      id: "tivonixpanel",
      title: "Tivonix Panel",
      subtitleRu: "Партнёрская панель TIVONIX: сделки, статусы, проекты и выплаты — один кабинет вместо хаоса в чатах и таблицах.",
      subtitleEn: "TIVONIX partner panel: deals, statuses, projects and payouts — one dashboard instead of chaos in chats and spreadsheets.",
      detailsRu: "Формат: партнёрская панель / SaaS-кабинет\n\nЗачем это\nПартнёрство редко разваливается из‑за оффера. Оно сыпется, когда **никто не видит картину**: где заявка, на каком этапе сделка, когда выплата. Пока правда живёт в Telegram и Excel — каждый день начинается с «напомни» и скринов в полночь.\n\nМы собрали **кабинет, в который заходят сами**: регистрация, вход, статусы, проекты и выплаты в одном месте. Не слайд «как будет», а инструмент, который уже ведёт деньги и доверие.\n\nКак работает\nПартнёр регистрируется, выбирает модель — **Referral** или **White-label** — и после модерации получает доступ в кабинет.\nДальше цикл простой: передал задачу → видит статус → понимает следующий шаг → отслеживает выплату. Одна панель вместо чатов, таблиц и «напомни, пожалуйста».\n\nЧто внутри\nЭто полноценный **кабинет партнёрской сети**, не лендинг. Слева тёмный сайдбар: главная, клиенты, партнёры, сделки, выплаты, отчёты, настройки, юр. профили, заявки партнёров и журнал действий.\n\nНа **главной** — живые KPI: клиенты, партнёры, закрытые сделки, сумма продаж, начисленные комиссии и «к выплате», плюс графики по дням и месяцам, воронка по статусам, топ партнёров, источников и услуг. Данные обновляются в реальном времени.\n\nВ **клиентах** — база компаний и контактов, которых партнёры передают в работу: поиск, вкладки статусов (на проверке / одобрено / в работе / закрыт / дубли), фильтры по партнёру, услуге, источнику, бюджету и дате, добавление клиента и выгрузка в Excel.\n\nВ **партнёрах** — сеть целиком: активность, клиенты, сделки, продажи, комиссия и баланс. Отдельно — заявки на вход (Referral / White-label) и модерация. **Выплаты** и комиссии живут в панели, без сторонних таблиц. UI собран под ежедневную работу, а не под презентацию.\n\nЧто сделали\nРазработка TIVONIX — **1 неделя**. Спроектировали структуру под реальный партнёрский процесс, собрали регистрацию, логин и сделки, довели UI (сетка, статусы, **пустые состояния**) и выкатили в продакшен на Railway.\n\nИтог\nЖивая панель, куда партнёры **заходят сами** — ведут сделки и видят выплаты. Не презентация «как будет», а продукт, который уже в работе.\n",
      detailsEn: "Format: partner panel / SaaS dashboard\n\nWhy it matters\nPartnerships rarely die on the offer. They die when **nobody shares the same picture**: where’s the request, what stage is the deal, when’s the payout. While truth lives in chats and spreadsheets, every day starts with “remind me” and midnight screenshots.\n\nWe built a **cabinet people actually open**: registration, login, statuses, projects and payouts in one place. Not a “how it will look” slide — a tool that already moves money and trust.\n\nHow it works\nA partner signs up, picks **Referral** or **White-label**, and gets access after moderation.\nThen the loop is simple: submit a task → see the status → know the next step → track the payout. One cabinet instead of chats, spreadsheets and “please remind me”.\n\nWhat’s inside\nA full **partner-network cabinet**, not a landing page. Dark sidebar on the left: home, clients, partners, deals, payouts, reports, settings, legal profiles, partner applications and an activity log.\n\n**Home** shows live KPIs: clients, partners, closed deals, sales total, accrued commissions and “to be paid”, plus charts by day and month, a status funnel, top partners, sources and services. Data updates in real time.\n\n**Clients** is the database of companies and contacts partners hand over: search, status tabs (under review / approved / in work / closed / duplicates), filters by partner, service, source, budget and date, add-client and Excel export.\n\n**Partners** is the whole network: activity, clients, deals, sales, commission and balance. Separately — join requests (Referral / White-label) and moderation. **Payouts** and commissions live in the panel, no side spreadsheets. UI built for daily work, not for a deck.\n\nWhat we delivered\nTIVONIX build — **1 week**. Designed the partner workflow, shipped registration, login and deals, polished UI (grid, statuses, **empty states**) and went live on Railway.\n\nOutcome\nA live panel partners **actually open** — they run deals and see payouts. Not a “how it will look” demo, but a product already in use.\n",
      domain: TIVONIXPANEL_DOMAIN,
      status: "live",
      tags: ["SaaS", "Admin Panel", "Partners", "Dashboard", "UI/UX"],
      cover: `/images/${encodeURI("обложки")}/tivonixpanel.webp`,
      gallery: TIVONIXPANEL_GALLERY,
      outcomes: [
        isRu ? "**Кабинет** с логином и онбордингом" : "**Dashboard** with login and onboarding",
        isRu ? "Сделки, проекты и **выплаты** в одном месте" : "Deals, projects and **payouts** in one place",
        isRu ? "Модели **Referral** и **White-label**" : "**Referral** and **White-label** models",
        isRu ? "Продукт **в продакшене** на Railway" : "Product **live** on Railway",
        isRu ? "Собрали за **1 неделю**" : "Shipped in **1 week**"
      ],
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Railway"],
      testimonial: {
        name: isRu ? "Артём К." : "Artem K.",
        role: isRu ? "Один из основателей TIVONIX" : "Co-founder, TIVONIX",
        text: isRu ? "Раньше статусы размазывались по чатам, выплаты сидели в таблицах. С панелью открыл кабинет и сразу понятно, где сделка и что дальше. Без воды, просто работает." : "Statuses used to live in chats, payouts in spreadsheets. With the panel you open the dashboard and know where the deal is. No fluff, it just works."
      }
    },
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
    // 1b) LOGOVO — сеть шиномонтажа · https://www.logovo24.by/
    {
      id: "logovo",
      title: "LOGOVO",
      subtitleRu: "Сайт сети шиномонтажа LOGOVO в Минске: Figma → Next.js, 4 филиала, запись, карта, B2B — под ключ за 1 600 BYN, команда TIVONIX.",
      subtitleEn: "Website for LOGOVO tire network in Minsk: Figma → Next.js, 4 branches, booking, map, B2B — turnkey for 1,600 BYN by TIVONIX.",
      detailsRu: "Зачем это\nШиномонтаж выбирают не в кресле — **с дороги, одной рукой, пока мигает индикатор**. Если адрес, часы и «записаться» прячутся на трёх экранах — клиент уедет к тому, кто ответил быстрее.\n\nЗаказчик — **ООО «Логово»** (сеть шиномонтажа в Минске, УНП 193616584): **4 филиала**, два работают **24/7**, безнал для автопарков и такси, полный контур услуг — от шиномонтажа и правки дисков до хранения и кондиционера. Бюджет проекта — **1 600 BYN** ([[≈ 42 800 ₽]] / [[≈ 560 $]]). Сайт собрала **команда TIVONIX** под ключ — не шаблон и не «отдали архив».\n\nКак работает\nЧеловек с телефона открывает **logovo24.by** → услуга → филиал на карте / режим → **записаться** или **позвонить**. Автопарк идёт в B2B: безнал, единый прайс, документы на четырёх точках — без переписки «пришлите счёт».\n\nЧто внутри\nВесь продукт сделали мы: **дизайн в Figma** (структура, mobile-first, CTA «с дороги»), потом разработка на **Next.js 16 + TypeScript + Tailwind v4** — статический экспорт под shared-хостинг. Не конструктор: ручная вёрстка, Leaflet-карта с геолокацией «найти меня», калькулятор «комплекс 4 колёса», до/после, отзывы, скидки, кейсы, FAQ, SEO (schema AutoRepair, sitemap, OG).\n\n**11 услуг** с отдельными страницами и прайсом: шиномонтаж, грузовой, правка и покраска дисков, аргон, прокол, вулканизация, балансировка, проточка, хранение, кондиционер. **4 адреса** (Лещинского и Логойский тракт — 24/7; Гурского и Дзержинского — дневной режим). B2B-блок: такси / логистика / флоты, бейдж **75+ клиентов**. Запись: форма → mailto на сеть. Sticky-бар на мобиле: позвонить / записаться.\n\nВизуал — светлая система **LOGOVO × Awesomic**: canvas `#f4f4f5`, ember-оранжевый `#ff5a00` только на CTA и бейджах 24/7, тёмные obsidian-блоки для контраста, крупные pill-кнопки, radius карточек 36px. Mobile-first — основной трафик с дороги.\n\nЗапуск под ключ\nПомогли с **доменом logovo24.by**, **сами** подняли хостинг (**hoster.by** / cPanel), выгрузили статику `out/`, настроили прод. Полный цикл: идея → Figma → код → деплой.\n\nИтог\nНе «сайт за тысячу». **Рабочий инструмент сети LOGOVO** за [[≈ 560 $]]: запись, карта, B2B, дизайн и прод на **logovo24.by** — сделала команда TIVONIX.\n",
      detailsEn: "Why it matters\nTire service isn’t chosen from a couch — it’s chosen **from the road, one-handed, while a warning light blinks**. If address, hours and “book” hide across three screens, the client drives to whoever answers faster.\n\nClient — **LOGOVO LLC** (Minsk tire network, UNP 193616584): **4 branches**, two open **24/7**, fleet billing for taxi and logistics, full service loop — fitting, wheel repair/paint, storage, A/C and more. Project budget — **1,600 BYN** ([[≈ 42,800 ₽]] / [[≈ $560]]). Built **turnkey by the TIVONIX team** — not a template, not “here’s a zip”.\n\nHow it works\nSomeone opens **logovo24.by** on a phone → service → branch on the map / hours → **book** or **call**. Fleets go to B2B: invoices, unified pricing, docs across four locations — no “send the contract” threads.\n\nWhat’s inside\nWe built the whole product: **Figma design** (structure, mobile-first, on-the-road CTAs), then **Next.js 16 + TypeScript + Tailwind v4** — static export for shared hosting. No page builder: handmade layout, Leaflet map with “find me” geolocation, “4 wheels package” calculator, before/after, reviews, discounts, cases, FAQ, SEO (AutoRepair schema, sitemap, OG).\n\n**11 services** with dedicated pages and pricing: fitting, commercial, wheel repair/paint, argon, puncture, vulcanizing, balancing, brake disc machining, storage, A/C. **4 addresses** (Leshchinskogo and Logoyskiy trakt — 24/7; Gurskogo and Dzerzhinskogo — daytime). B2B block: taxi / logistics / fleets, **75+ clients** badge. Booking: form → mailto to the network. Sticky mobile bar: call / book.\n\nVisual system — light **LOGOVO × Awesomic**: canvas `#f4f4f5`, ember orange `#ff5a00` only on CTAs and 24/7 badges, dark obsidian blocks for contrast, large pill buttons, 36px card radius. Mobile-first — most traffic comes from the road.\n\nTurnkey launch\nWe helped with the **logovo24.by** domain, **set up hosting ourselves** (**hoster.by** / cPanel), shipped the `out/` static build, wired production. Full cycle: idea → Figma → code → deploy.\n\nOutcome\nNot a “thousand-buck site”. A **working tool for the LOGOVO network** for [[≈ $560]]: booking, map, B2B, design and prod on **logovo24.by** — by the TIVONIX team.\n",
      domain: LOGOVO_DOMAIN,
      status: "live",
      tags: ["Website", "Next.js", "Local Business", "Booking", "B2B", "Figma"],
      cover: "/images/project-priew/logovo.webp",
      outcomes: [
        isRu ? "Бюджет **1 600 BYN** ([[≈ 42 800 ₽]] / [[≈ 560 $]])" : "Budget **1,600 BYN** ([[≈ 42,800 ₽]] / [[≈ $560]])",
        isRu ? "**TIVONIX** под ключ: Figma → Next.js → hoster.by" : "**TIVONIX** turnkey: Figma → Next.js → hoster.by",
        isRu ? "**4 филиала** · два **24/7** · 11 услуг · B2B" : "**4 branches** · two **24/7** · 11 services · B2B",
        isRu ? "Карта Leaflet · запись · калькулятор · SEO" : "Leaflet map · booking · calculator · SEO"
      ],
      stack: ["Next.js", "TypeScript", "Tailwind", "Leaflet", "Figma", "hoster.by"],
      testimonial: {
        name: isRu ? "ООО «Логово»" : "LOGOVO LLC",
        role: isRu ? "Сеть шиномонтажа · Минск · 4 филиала" : "Tire-service network · Minsk · 4 branches",
        text: isRu ? "Хотели сайт, с которого человек с дороги сразу пишет или звонит, а не ищет адреса по кругу. Ребята сделали всё под ключ: дизайн, разработку, домен. Четыре точки, запись, безнал для автопарков. Сайт уже в работе." : "We wanted a site where people can book or call right from the road, not hunt for addresses. The team did the full thing: design, build, domain. Four locations, booking, fleet billing. Site is live."
      }
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
        text: isRu ? "Сделали быстро и аккуратно. Сайт выглядит дорого, без ощущения шаблона. По срокам тоже всё нормально." : "Fast and neat. The site looks premium, not like a template. Timeline was fine too."
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
        text: isRu ? "Пишем в чат, правки прилетают быстро. Без лишней воды, результатом довольны." : "We message them, edits come back fast. Straight talk, happy with the result."
      }
    },
    // 4) HEADMIND — корпоративный сайт на WordPress
    {
      id: "headmind",
      title: "Headmind",
      subtitleRu: "Корпоративный сайт ООО «Хэдмайнд»: Figma → WordPress + Elementor, хостинг и домен headmind.ru — бюджет 100 000 ₽.",
      subtitleEn: "Corporate site for Headmind: Figma → WordPress + Elementor, hosting and domain headmind.ru — budget 100,000 ₽.",
      detailsRu: "Зачем это\nООО «Хэдмайнд» — консалтинг по трансформации бизнеса: стратегия, цифровизация, оргдизайн, производство, контракты. В B2B часто **теряют сделку на первом касании**, если сайт говорит «обо всём и ни о чём». Нужен был сайт, который спокойно шлют в первом сообщении.\n\nЗаказчик — **Евгений Беликов**, основатель и генеральный директор ООО «Хэдмайнд» (соучредитель — Виталий Петровский). Бюджет — **100 000 ₽** ([[≈ 1 280 $]]). Прод: **headmind.ru**.\n\nКак работает\nПосетитель проходит короткий маршрут: **услуги** → **подход / экспертиза** → **команда** → **контакт / заявка**. На каждом шаге понятно, кто вы и чем сильны. CTA стоит там, где человек уже готов написать.\n\nЧто внутри\nСначала **макеты в Figma**: несколько визуальных вариантов на выбор — пока заказчику не «зашло». Потом дизайн и сборка на **WordPress + Elementor**: услуги (трансформация, цифровизация, HR, производство, контракты, продажи), команда, доверие, формы заявки.\n\nПод ключ: подобрали и подключили **хостинг**, купили/привязали **домен headmind.ru**, выкатили в прод, настроили админку WordPress, чтобы контент правили сами. Стек не «с нуля на React» — осознанный выбор: быстрый запуск, удобное редактирование, спокойный B2B-сайт.\n\nЧто сделали\nFigma (выборка вариантов) → дизайн → WordPress/Elementor → хостинг + домен → живой **headmind.ru**. Упаковали экспертизу в маршрут до заявки.\n\nИтог\nНе шаблон «поставьте логотип». **Корпоративный сайт под ключ** для Евгения Беликова / ООО «Хэдмайнд»: 100 000 ₽, Figma → WP, домен и хостинг — можно открыть и проверить самому.\n",
      detailsEn: "Why it matters\nHeadmind is a business-transformation consultancy: strategy, digitalization, org design, production, contracts. In B2B you often **lose the deal on first contact** if the site says everything and nothing. They needed a site you can send in the first message.\n\nClient — **Evgeniy Belikov**, founder and CEO of Headmind (co-founder — Vitaliy Petrovsky). Budget — **100,000 ₽** ([[≈ $1,280]]). Live: **headmind.ru**.\n\nHow it works\nA visitor follows a short path: **services** → **approach / expertise** → **team** → **contact / lead**. At every step it’s clear who you are and why you’re strong. CTAs sit where people are already ready to write.\n\nWhat’s inside\nFirst **Figma mockups**: several visual directions until the client picked a favourite. Then design and build on **WordPress + Elementor**: services (transformation, digitalization, HR, production, contracts, sales), team, trust, lead forms.\n\nTurnkey: hosting set up, **domain headmind.ru** connected, shipped to production, WordPress admin ready so they can edit content themselves. Not a custom React build on purpose — fast launch, easy editing, a calm B2B site.\n\nWhat we delivered\nFigma (variant selection) → design → WordPress/Elementor → hosting + domain → live **headmind.ru**. Expertise packaged into a path to a lead.\n\nOutcome\nNot a “drop your logo” template. A **turnkey corporate site** for Evgeniy Belikov / Headmind: 100,000 ₽, Figma → WP, domain and hosting — open it and check yourself.\n",
      domain: HEADMIND_DOMAIN,
      status: "live",
      tags: ["B2B", "WordPress", "Elementor", "Figma", "Corporate"],
      cover: "/images/project-priew/headmind.webp",
      outcomes: [
        isRu ? "Заказчик **Евгений Беликов** · бюджет [[≈ 1 280 $]]" : "Client **Evgeniy Belikov** · budget [[≈ $1,280]]",
        isRu ? "**Figma** (варианты) → **WordPress + Elementor**" : "**Figma** (variants) → **WordPress + Elementor**",
        isRu ? "Хостинг + домен **headmind.ru** под ключ" : "Hosting + domain **headmind.ru** turnkey",
        isRu ? "Маршрут услуг → команда → **заявка**" : "Path: services → team → **lead**"
      ],
      stack: ["Figma", "WordPress", "Elementor", "Hosting", "Domain"],
      testimonial: {
        name: isRu ? "Евгений Беликов" : "Evgeniy Belikov",
        role: isRu ? "Основатель и гендиректор, ООО «Хэдмайнд»" : "Founder & CEO, Headmind",
        text: isRu ? "Сначала кинули несколько макетов в Figma, мы выбрали свой. Потом WordPress, хостинг, домен. Теперь спокойно кидаем сайт клиенту на первом звонке." : "They sent a few Figma options, we picked one. Then WordPress, hosting, domain. Now we send the site on the first call without thinking twice."
      }
    },
    // 7) SLOTTY — маркетплейс онлайн-записи к мастерам
    {
      id: "slotty",
      title: "Slotty",
      subtitleRu: "Полный маркетплейс записи к мастерам: каталог с фильтрами и картой, Telegram Mini App, кабинет мастера (SaaS Free/Pro), platform-admin, bePaid — на Railway, домен slotty.of.by.",
      subtitleEn: "Full booking marketplace for masters: filtered catalog + map, Telegram Mini App, master SaaS cabinet (Free/Pro), platform admin, bePaid — on Railway, domain slotty.of.by.",
      detailsRu: "Зачем это\nЗапись к мастеру до сих пор часто живёт в **Direct и WhatsApp**: «есть на завтра?», «а через час?», «ой, забыла напомнить». Клиент устаёт писать. Мастер устаёт отвечать. Слоты пропадают в тишине чата.\n\nНужен был не черновик и не «кнопка записаться», а **полный маркетплейс**: каталог с жёсткой фильтрацией, карта, путь клиента, SaaS-кабинет мастера, роли, platform-admin, оплаты, уведомления и прод. Заказчик — **Виктория Д.** Бюджет — 230 000 ₽ ([[≈ 2 940 $]]). Срок — **3 недели**.\n\nКак работает\nКлиент открывает **slotty.of.by** (сайт или Telegram Mini App) → каталог → фильтры / карта → мастер → услуга → **свободный слот** → подтверждение. Код записи, напоминания в Telegram и email — без звонков.\nМастер в кабинете ведёт профиль, портфолио, адрес, услуги, акции, расписание, заявки и клиентов; тариф Free или Pro.\nPlatform-admin модерирует мастеров, записи, биллинг, платежи bePaid, рассылки и журнал — платформой можно рулить уже сейчас.\n\nЧто внутри\nЭто **крупная разработка**, не лендинг с формой. Фронт: React + TypeScript + Vite + Tailwind. Бэкенд: Express API, PostgreSQL (**88 миграций**), JWT-сессии. Прод: **два сервиса на Railway** (web + api), домен **slotty.of.by** — подсказали, где купить домен, подняли хостинг, привязали DNS и выкатили в бой. Плюс Telegram Bot / Mini App, Google Auth, email (Resend), карты (Leaflet / OSM, опционально Яндекс), платежи **bePaid** (BYN), Sentry, SEO-prerender.\n\nМаркетплейс для клиента: **6 категорий** (маникюр, барберы, брови/ресницы, массаж, фитнес, тату). Каталог — не «список карточек», а полноценный поиск: все / популярные / акции / новинки, текстовый поиск, **карта с геосортировкой**.\n\nФильтры: сортировка (рекомендации, популярность, ближайший слот, расстояние, рейтинг, цена ↑↓, отзывы); дата (сегодня / завтра / неделя / выходные / точный день); время суток и слайдер часов; визит в салоне или на дому; длительность; цена в BYN; рейтинг от 4.5 / 4.7 / 4.9; число отзывов; только верифицированные; только с акциями; только с онлайн-записью. Запись: дата → слот → комментарий → референс-фото → успех с кодом **SL-…**. Профиль клиента: записи, избранное, уведомления, настройки, отзыв после визита.\n\nКабинет мастера — отдельный SaaS: сегодня / заявки / расписание / услуги (каталог, цены, пакеты, акции) / профиль и портфолио / клиенты / репутация / биллинг / уведомления (десятки типов событий). Онбординг в **8 шагов**: категории → профиль → адрес на карте → услуги → доверие → превью → тариф. Тарифы: Free (лимиты) / Pro / trial 7 дней — оплата bePaid или ручной перевод.\n\nPlatform-admin: обзор, заявки (категории, удаления, спонсорство, жалобы), поддержка, статус системы, пользователи, мастера, услуги, записи (в т.ч. проблемные отмены), биллинг и промокоды, платежи bePaid, рассылки, аудит. Роли: **client / master / platform_admin**. Auth: email, Google, Telegram — с телефона и с компьютера.\n\nСложные куски, которые обычно «ломают» сроки: concurrent booking и слоты, pending expiry, auto-complete, споры по записи; entitlements Free/Pro; очередь уведомлений; multi-identity auth; серверный каталог с 20+ параметрами фильтра и Pro-boost в рекомендациях.\n\nЧто сделали\nДизайн + разработка под ключ: маркетплейс, кабинеты, админка, интеграции, домен и хостинг. Продукт на **slotty.of.by** — **скоро запуск к настоящим клиентам и мастерам**.\n\nИтог\nНе демо «посмотрите идею». **Полный маркетплейс записи** с фильтрами, картой, Mini App, SaaS мастера и platform-admin. Виктория Д., [[≈ 2 940 $]], 3 недели — и живой прод, куда можно зайти и проверить самому.\n",
      detailsEn: "Why it matters\nBooking a master still often lives in **DMs and WhatsApp**: “free tomorrow?”, “in an hour?”, “oops, forgot to remind”. Clients get tired of typing. Masters get tired of answering. Slots vanish into chat silence.\n\nThis wasn’t a draft or a “book now” button. It needed a **full marketplace**: filtered catalog, map, client path, master SaaS cabinet, roles, platform admin, payments, notifications and production. Client — **Victoria D.** Budget — 230,000 ₽ ([[≈ $2,940]]). Timeline — **3 weeks**.\n\nHow it works\nClient opens **slotty.of.by** (web or Telegram Mini App) → catalog → filters / map → master → service → **open slot** → confirm. Booking code, Telegram + email reminders — no calls.\nMasters run profile, portfolio, address, services, promos, schedule, requests and clients; Free or Pro plan.\nPlatform admin moderates masters, bookings, billing, bePaid payments, broadcasts and audit — the platform is operable now.\n\nWhat’s inside\nA **large build**, not a landing with a form. Frontend: React + TypeScript + Vite + Tailwind. Backend: Express API, PostgreSQL (**88 migrations**), JWT sessions. Production: **two Railway services** (web + api), domain **slotty.of.by** — we advised where to buy the domain, set up hosting, pointed DNS and shipped live. Plus Telegram Bot / Mini App, Google Auth, email (Resend), maps (Leaflet / OSM, optional Yandex), **bePaid** (BYN), Sentry, SEO prerender.\n\nClient marketplace: **6 categories** (manicure, barbers, brows/lashes, massage, fitness, tattoo). Catalog isn’t a flat card list — full search: all / popular / promos / new, text search, **map with geo sort**.\n\nFilters: sort (recommended, popular, soonest, distance, rating, price ↑↓, reviews); date (today / tomorrow / week / weekend / exact day); time of day + hour slider; studio or at-home; duration; BYN price; rating from 4.5 / 4.7 / 4.9; review count; verified only; promos only; online booking only. Booking: date → slot → comment → reference photos → success with code **SL-…**. Client profile: appointments, favorites, notifications, settings, post-visit review.\n\nMaster cabinet is a separate SaaS: today / requests / schedule / services (catalog, prices, bundles, promos) / profile & portfolio / clients / reputation / billing / notifications (dozens of event types). **8-step** onboarding: categories → profile → map address → services → trust → preview → plan. Plans: Free (limits) / Pro / 7-day trial — bePaid or manual transfer.\n\nPlatform admin: overview, requests (category changes, deletions, sponsorship, reports), support, system status, users, masters, services, bookings (incl. problem cancellations), billing & promo codes, bePaid payments, broadcasts, audit. Roles: **client / master / platform_admin**. Auth: email, Google, Telegram — phone or desktop.\n\nHard pieces that usually blow timelines: concurrent booking & slots, pending expiry, auto-complete, booking disputes; Free/Pro entitlements; notification job queue; multi-identity auth; server catalog with 20+ filter params and Pro boost in recommendations.\n\nWhat we delivered\nDesign + turnkey build: marketplace, cabinets, admin, integrations, domain and hosting. Live on **slotty.of.by** — **soon launching to real clients and masters**.\n\nOutcome\nNot a “look at the idea” demo. A **full booking marketplace** with filters, map, Mini App, master SaaS and platform admin. Victoria D., [[≈ $2,940]], 3 weeks — and a live prod you can open and check yourself.\n",
      domain: SLOTTY_DOMAIN,
      status: "live",
      tags: ["Marketplace", "Booking", "Beauty", "SaaS", "Telegram", "Admin Panel"],
      cover: "/images/project-priew/slotty.webp",
      gallery: SLOTTY_GALLERY,
      outcomes: [
        isRu ? "**Полный маркетплейс** за 3 недели — не MVP" : "**Full marketplace** in 3 weeks — not an MVP",
        isRu ? "Каталог с **фильтрами + карта** · Mini App · Free/Pro" : "Catalog with **filters + map** · Mini App · Free/Pro",
        isRu ? "Домен **slotty.of.by** · хостинг Railway (web + api)" : "Domain **slotty.of.by** · Railway hosting (web + api)",
        isRu ? "Виктория Д. · [[≈ 2 940 $]] · скоро запуск к живым клиентам" : "Victoria D. · [[≈ $2,940]] · soon launching to live clients"
      ],
      stack: [
        "React",
        "TypeScript",
        "Vite",
        "Express",
        "PostgreSQL",
        "Railway",
        "Telegram Mini App",
        "Google Auth",
        "bePaid",
        "Leaflet",
        "Resend"
      ],
      testimonial: {
        name: isRu ? "Виктория Д." : "Victoria D.",
        role: isRu ? "Заказчик Slotty" : "Slotty client",
        text: isRu ? "Мне нужен был нормальный маркетплейс: фильтры, кабинет мастера, админка. Не демо. За три недели собрали на нашем домене, уже можно звать реальных клиентов." : "I needed a real marketplace: filters, master cabinet, admin. Not a demo. In three weeks it was on our domain and ready for real clients."
      }
    },
    // 8) SPLITON — финтех-платформа для музыкальных активов
    {
      id: "spliton",
      title: "Spliton",
      subtitleRu: "Финтех-платформа для долей в музыке: каталог, первичный и вторичный рынок, кошелёк USDT, ledger, compliance и operator portal — продукт с инвестором и живым сопровождением.",
      subtitleEn: "Fintech platform for music shares: catalog, primary & secondary market, USDT wallet, ledger, compliance and operator portal — investor-backed product with ongoing support.",
      detailsRu: "Зачем это\nМузыкальные активы — не лендинг с кнопкой «купить». Здесь **реальные деньги**, роли, согласия, депозиты и выводы должны сходиться без дыр: confirm → processing → result. Один сбой на выплате или consent — и доверие кончается быстрее любого релиза.\n\nНужна была не «админка на коленке», а **полноценная биржа долей**: кабинет инвестора, operator portal, ledger, treasury, KYC/AML, споры, публичный trust center. Мы собрали это end-to-end — и **до сих пор сопровождаем** продукт в бою.\n\nКак работает\nИнвестор регистрируется, проходит согласия и при необходимости KYC, пополняет баланс в **USDT (TRC20)**.\nДальше: выбирает релиз в каталоге → изучает data room → покупает доли (UNT) на первичке → видит позиции и начисления в кабинете → при желании торгует на **вторичном рынке** (стакан, лимитные заявки) → выводит средства через проверку treasury.\nОператор ведёт депозиты, выводы, compliance, релизы, рефералов, споры и публичный статус системы — всё из admin-портала.\n\nЧто внутри\nЭто **крупный продукт в одном репозитории**, не одностраничный сайт. Клиентская часть на Next.js, сервер на NestJS, база PostgreSQL через Prisma, автотесты на критичные денежные сценарии.\n\nКабинет инвестора: каталог релизов, покупка долей, портфель и метрики, кошелёк (пополнение, вывод, история, выписки), **вторичный рынок со сложным биржевым стаканом** и лимитными заявками, калькулятор, новости, поддержка и центр споров, реферальная и партнёрская программы, VIP.\n\nПубличная часть: лендинг продукта, **центр доверия** (учёт операций, статус сервисов, документы), страница статуса системы, комиссии, юридические тексты, справочный центр.\n\nПортал оператора — отдельная **огромная админ-панель** для команды платформы: не пара экранов, а десятки разделов управления. Главный обзор, задачи операторов, пользователи и роли, треки и раунды, артисты, лейблы, жанры.\n\nФинансы: кошельки, пополнения, **выплаты**, позиции, доход и доход платформы, казначейство, платёжные реквизиты. Рынок: вторичный рынок, сделки, подозрительные операции. Операции: поддержка, споры, комплаенс, KYC, юридические тексты, рефералы и партнёры.\n\nАналитика с **графиками**: финансы, пользователи, треки, рынок, доход, риски, операции. Плюс отчёты и выгрузки, новости, справочный центр, статус системы, уведомления, журнал аудита действий сотрудников. Роли: супер-админ, бухгалтер, контент, поддержка, комплаенс, бизнес-аналитик.\n\nФинансовое ядро: внутренний учёт операций с двойной записью, сверки, комиссии платформы, автоматизация депозитов в сети TRON, политика горячего и холодного кошелька, регламенты инцидентов. Интерфейс на acid lime `#b7f500` — как в живом продукте.\n\nЯзыки: интерфейс полностью на **четырёх языках** — русский, английский, испанский, португальский.\n\nЧто сделали\nСпроектировали и собрали весь контур: дизайн, фронтенд, бэкенд, база, комплаенс, автотесты и продакшен-операции. Продукт запущен, в него зашёл инвестор на [[200 000 $]], платформа в работе — **TIVONIX продолжает поддержку и развитие**.\n\nИтог\nНе демо и не презентация. **Живая финтех-платформа** с кабинетом инвестора, сложной биржей долей и огромной админкой под выплаты, графики и операционное управление. Сопровождаем до сих пор.\n",
      detailsEn: "Why it matters\nMusic assets aren’t a landing page with a buy button. **Real money**, roles, consents, deposits and withdrawals have to lock without holes: confirm → processing → result. One payout or consent failure — and trust dies faster than any release.\n\nThis wasn’t a “quick admin”. It needed a **full share exchange**: investor cabinet, operator portal, ledger, treasury, KYC/AML, disputes, public trust center. We built it end-to-end — and **still support** it in production.\n\nHow it works\nAn investor signs up, accepts policies, completes KYC when required, and tops up in **USDT (TRC20)**.\nThen: pick a release in the catalog → review the data room → buy shares (UNT) on primary → track positions and accruals → optionally trade on the **secondary market** (order book, limit orders) → withdraw through treasury checks.\nOperators run deposits, withdrawals, compliance, releases, referrals, disputes and public system status — all from the admin portal.\n\nWhat’s inside\nA **large product in one repository**, not a single-page site. Client app on Next.js, server on NestJS, PostgreSQL via Prisma, automated tests on critical money flows.\n\nInvestor cabinet: release catalog, share purchase, portfolio and metrics, wallet (deposit, withdraw, history, statements), **secondary market with a complex order book** and limit orders, calculator, news, support and dispute center, referral and partner programs, VIP.\n\nPublic surface: product landing, **trust center** (operations ledger, service status, documents), system status page, fees, legal pages, help center.\n\nThe operator portal is a **huge admin panel** for the platform team: not a few screens, but dozens of management sections. Executive overview, operator tasks, users and roles, tracks and rounds, artists, labels, genres.\n\nFinance: wallets, deposits, **payouts**, holdings, revenue and platform revenue, treasury, payment requisites. Market: secondary market, trades, suspicious activity. Operations: support, disputes, compliance, KYC, legal texts, referrals and partners.\n\nAnalytics with **charts**: finance, users, tracks, market, revenue, risk, operations. Plus reports and exports, news, help center, system status, notifications, staff audit log. Roles: super admin, accountant, content, support, compliance, business analyst.\n\nFinancial core: internal double-entry operations ledger, reconciliation, platform fees, TRON deposit automation, hot/cold wallet policy, incident runbooks. Interface on acid lime `#b7f500` — matching the live product.\n\nLanguages: the interface is fully localized in **four languages** — Russian, English, Spanish, Portuguese.\n\nWhat we delivered\nDesigned and shipped the full loop: design, frontend, backend, database, compliance, automated tests and production ops. The product is live, backed by an investor at [[$200,000]], and **TIVONIX still supports and evolves** it.\n\nOutcome\nNot a demo and not a deck. A **live fintech platform** with an investor cabinet, a complex share exchange and a huge admin for payouts, charts and day-to-day operations. Still supported.\n",
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
        isRu ? "Полный финтех-контур: кабинет + биржа долей + портал оператора" : "Full fintech loop: cabinet + share exchange + operator portal",
        isRu ? "Огромная админка: выплаты, казначейство, графики, комплаенс" : "Huge admin: payouts, treasury, charts, compliance",
        isRu ? "Учёт операций, KYC, центр доверия, USDT TRC20" : "Operations ledger, KYC, trust center, USDT TRC20",
        isRu ? "Инвестор [[200 000 $]] · продукт в продакшене" : "Investor [[$200,000]] · live in production",
        isRu ? "**TIVONIX сопровождает** платформу до сих пор" : "**TIVONIX still supports** the platform",
        isRu ? "4 языка: русский, английский, испанский, португальский" : "4 languages: Russian, English, Spanish, Portuguese",
        isRu ? "Сложный биржевой стакан на вторичном рынке" : "Complex order book on the secondary market"
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
      ],
      testimonial: {
        name: isRu ? "Виктор Безбородых" : "Viktor Bezborodykh",
        role: isRu ? "Основатель MIN.ECO" : "Founder & CEO, MIN.ECO",
        text: isRu ? "У Spliton тяжёлая начинка: доли, кошелёк, выплаты, большая админка. Собрали целиком, выкатили в прод и не пропали. С ними спокойно идти дальше." : "Spliton is heavy: shares, wallet, payouts, a big admin. They built the full stack, shipped to production, and stayed around. Easy to keep going with them."
      }
    }
  ];
}
function buildProjects(isRu) {
  const all = buildAllProjects(isRu);
  return PUBLIC_PROJECT_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p) => Boolean(p)
  );
}
function projectsWithTestimonials(isRu) {
  return buildAllProjects(isRu).filter((p) => Boolean(p.testimonial));
}
function isPublicProjectId(id) {
  return PUBLIC_PROJECT_IDS.includes(id);
}
function findProjectBySlug(slug, isRu) {
  if (!slug) return void 0;
  return buildProjects(isRu).find((p) => p.id === slug);
}
function useInView(ref, options) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      setInView(Boolean(entry?.isIntersecting));
    }, options ?? { root: null, rootMargin: "80px 0px", threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, options?.rootMargin, options?.threshold]);
  return inView;
}
const AUTO_MS = 5500;
function cx$a(...parts) {
  return parts.filter(Boolean).join(" ");
}
function FeaturedCaseSlide({
  item,
  isRu,
  copy,
  active
}) {
  const project = findProjectBySlug(item.id, isRu);
  if (!project) return null;
  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const cover = project.cover ?? "";
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: cx$a(
        "case-split case-split--no-tabs col-start-1 row-start-1 transition-opacity duration-300 ease-out",
        active ? "relative z-[1] opacity-100" : "pointer-events-none invisible z-0 opacity-0"
      ),
      "aria-hidden": !active,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "case-split__visual", children: [
          cover ? /* @__PURE__ */ jsx(
            "img",
            {
              src: cover,
              alt: project.title,
              loading: active ? "eager" : "lazy",
              decoding: "async",
              className: "case-split__img",
              width: 960,
              height: 640
            }
          ) : null,
          /* @__PURE__ */ jsx("div", { className: "case-split__visual-overlay", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "case-split__grid", children: [
          /* @__PURE__ */ jsx("div", { className: "case-split__visual-gap", "aria-hidden": true }),
          /* @__PURE__ */ jsxs("div", { className: "case-split__content", children: [
            /* @__PURE__ */ jsx("span", { className: "case-split__badge", children: item.type }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 font-hero text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white", children: /* @__PURE__ */ jsx(
              Link,
              {
                to: `/projects/${project.id}`,
                tabIndex: active ? 0 : -1,
                onClick: () => trackEvent("project_open", {
                  project: project.id,
                  source: "featured"
                }),
                className: "transition-colors hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70",
                children: project.title
              }
            ) }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-[14px] leading-relaxed text-white/48 sm:text-[15px]", children: subtitle }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3 text-[13.5px] leading-relaxed text-white/62", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-white/78", children: copy.featured.problem }),
                " ",
                item.problem
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-white/78", children: copy.featured.solution }),
                " ",
                item.solution
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-white/78", children: copy.featured.resultLabel }),
                " ",
                item.result
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "case-split__chips mt-5", children: item.modules.map((m) => /* @__PURE__ */ jsx("span", { className: "case-split__chip", children: m }, m)) }),
            project.domain ? /* @__PURE__ */ jsxs(
              "a",
              {
                href: project.domain,
                target: "_blank",
                rel: "noopener noreferrer",
                tabIndex: active ? 0 : -1,
                onClick: () => trackEvent("project_live_open", {
                  project: project.id,
                  source: "featured"
                }),
                className: "mt-6 inline-flex text-[13px] font-medium text-[#FF9A3D] transition-colors hover:text-[#FFB06A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70",
                children: [
                  copy.featured.openLive,
                  " →"
                ]
              }
            ) : null
          ] })
        ] })
      ]
    }
  );
}
function FeaturedProjectsSection() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const copy = homeExtraCopy(lang);
  const items = copy.featured.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { rootMargin: "40px 0px", threshold: 0 });
  const go = useCallback(
    (next) => {
      const len = items.length;
      if (len === 0) return;
      setIndex((next % len + len) % len);
    },
    [items.length]
  );
  useEffect(() => {
    if (!inView || paused || items.length < 2) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, items.length, inView]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx(
    Section,
    {
      ref: sectionRef,
      id: "featured-projects",
      className: "scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16 lg:!py-20",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(Reveal$1, { className: "mx-auto mb-8 max-w-[40rem] text-center sm:mb-10", children: /* @__PURE__ */ jsx("h2", { className: "mx-auto text-center font-hero text-[clamp(1.85rem,4.2vw,2.85rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance", children: isRu ? "Три живые результата" : "Three live results" }) }),
        /* @__PURE__ */ jsx(Reveal$1, { children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "featured-case-carousel relative overflow-anchor-none",
            style: { overflowAnchor: "none" },
            onMouseEnter: () => setPaused(true),
            onMouseLeave: () => setPaused(false),
            onFocusCapture: () => setPaused(true),
            onBlurCapture: (e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setPaused(false);
              }
            },
            onTouchStart: (e) => {
              touchX.current = e.changedTouches[0]?.clientX ?? null;
              setPaused(true);
            },
            onTouchEnd: (e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX;
              touchX.current = null;
              setPaused(false);
              if (start == null || end == null) return;
              const delta = end - start;
              if (Math.abs(delta) < 48) return;
              go(delta < 0 ? index + 1 : index - 1);
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "featured-case-carousel__stage grid", children: items.map((slide, i) => /* @__PURE__ */ jsx(
                FeaturedCaseSlide,
                {
                  item: slide,
                  isRu,
                  copy,
                  active: i === index
                },
                slide.id
              )) }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "mt-6 flex items-center justify-center gap-2",
                  role: "tablist",
                  "aria-label": isRu ? "Кейсы" : "Cases",
                  children: items.map((slide, i) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": i === index,
                      "aria-label": slide.id,
                      onClick: () => setIndex(i),
                      className: "relative h-1 w-10 overflow-hidden rounded-full bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70 sm:w-12",
                      children: i === index ? /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "featured-case-line-fill absolute inset-0 rounded-full bg-[#FF6B2C]",
                          style: {
                            animationDuration: `${AUTO_MS}ms`,
                            animationPlayState: paused ? "paused" : "running"
                          }
                        },
                        `${slide.id}-${index}`
                      ) : null
                    },
                    slide.id
                  ))
                }
              )
            ]
          }
        ) })
      ] })
    }
  );
}
const CARD_DARK = "#141414";
const CARD_SOFT = "#262626";
const PAIN_CARD_BACKGROUNDS = [
  "/images/hero-stage-1.webp",
  "/images/pain-bg-late.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-2.webp"
];
function useCalmPainMotion() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCalm(reduced.matches || narrow.matches);
    sync();
    reduced.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);
  return calm;
}
function ChannelsVisual({ isRu }) {
  const rows = isRu ? [
    { ch: "Instagram", icon: "/images/icons/instagram.svg", count: "20", unit: "заявок", hot: true },
    { ch: "Telegram", icon: "/images/icons/telegram.svg", count: "8", unit: "непрочит.", hot: true },
    { ch: "WhatsApp", icon: "/images/icons/whatsapp.svg", count: "5", unit: "сообщений", hot: true },
    { ch: "Звонок", icon: "/images/icons/phone.svg", count: "3", unit: "пропущенных", hot: true },
    { ch: "Сайт", icon: "/images/icons/globe.svg", count: "4", unit: "формы", hot: false },
    { ch: "Email", icon: "/images/icons/gmail.svg", count: "6", unit: "писем", hot: true }
  ] : [
    { ch: "Instagram", icon: "/images/icons/instagram.svg", count: "20", unit: "leads", hot: true },
    { ch: "Telegram", icon: "/images/icons/telegram.svg", count: "8", unit: "unread", hot: true },
    { ch: "WhatsApp", icon: "/images/icons/whatsapp.svg", count: "5", unit: "messages", hot: true },
    { ch: "Call", icon: "/images/icons/phone.svg", count: "3", unit: "missed", hot: true },
    { ch: "Website", icon: "/images/icons/globe.svg", count: "4", unit: "forms", hot: false },
    { ch: "Email", icon: "/images/icons/gmail.svg", count: "6", unit: "emails", hot: true }
  ];
  const track = [...rows, ...rows];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes pain-channels-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .pain-channels-track {
          animation: pain-channels-scroll 18s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pain-channels-track { animation: none !important; }
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "relative h-[148px] overflow-hidden sm:h-[156px]", children: [
      /* @__PURE__ */ jsx("div", { className: "pain-channels-track space-y-1.5", children: track.map((r, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-3 py-2.5",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2.5", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: r.icon,
                  alt: "",
                  width: 18,
                  height: 18,
                  "aria-hidden": true,
                  className: "h-[18px] w-[18px] shrink-0"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "truncate text-[13px] font-medium text-white/90", children: r.ch })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-baseline gap-1.5", children: [
              r.hot ? /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 shrink-0 self-center rounded-full bg-[#FF5722]", "aria-hidden": true }) : /* @__PURE__ */ jsx(Check, { size: 12, className: "self-center text-white/35", "aria-hidden": true }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: [
                    "text-[15px] font-semibold tabular-nums leading-none",
                    r.hot ? "text-[#FF8A5C]" : "text-white/45"
                  ].join(" "),
                  children: r.count
                }
              ),
              /* @__PURE__ */ jsx("span", { className: r.hot ? "text-[12px] text-white/70" : "text-[12px] text-white/40", children: r.unit })
            ] })
          ]
        },
        `${r.ch}-${i}`
      )) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#141414] to-transparent",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#141414] to-transparent",
          "aria-hidden": true
        }
      )
    ] })
  ] });
}
function TelegramVisual({ isRu }) {
  const calm = useCalmPainMotion();
  const message = isRu ? "Здравствуйте, хочу записаться на консультацию…" : "Hi, I’d like to book a consultation…";
  const stages = isRu ? [
    { time: "сейчас", status: "Менеджер ещё не видел", late: false },
    { time: "23 мин", status: "Никто не ответил", late: false },
    { time: "4 часа", status: "Всё ещё без ответа", late: true },
    { time: "день назад", status: "Клиент всё ещё ждёт", late: true },
    { time: "неделю назад", status: "вы забыли?", late: true }
  ] : [
    { time: "now", status: "Manager hasn’t seen it", late: false },
    { time: "23 min", status: "Nobody replied", late: false },
    { time: "4 hours", status: "Still no reply", late: true },
    { time: "a day ago", status: "Client is still waiting", late: true },
    { time: "a week ago", status: "did you forget?", late: true }
  ];
  const last = stages.length - 1;
  const [open, setOpen] = useState(calm);
  const [typed, setTyped] = useState(calm ? message : "");
  const [stageIdx, setStageIdx] = useState(calm ? last : 0);
  const [showStatus, setShowStatus] = useState(calm);
  const stage = stages[stageIdx] ?? stages[last];
  const isTyping = open && !calm && typed.length < message.length;
  const isLate = stage.late;
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (calm) {
      setOpen(true);
      setTyped(message);
      setStageIdx(last);
      setShowStatus(true);
      return;
    }
    let cancelled = false;
    const timeouts = [];
    const t = (fn, ms) => {
      timeouts.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };
    setOpen(false);
    setTyped("");
    setStageIdx(0);
    setShowStatus(false);
    t(() => setOpen(true), 280);
    message.split("").forEach((_, i) => {
      t(() => setTyped(message.slice(0, i + 1)), 480 + 32 * (i + 1));
    });
    const typingDone = 480 + 32 * message.length + 300;
    t(() => setShowStatus(true), typingDone);
    stages.forEach((_, i) => {
      if (i === 0) return;
      t(() => setStageIdx(i), typingDone + 1100 * i);
    });
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [message, calm, last, isRu]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [
        "rounded-t-2xl border border-white/[0.08] border-b-0 shadow-[0_-16px_48px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "translate-y-0" : "translate-y-[108%]"
      ].join(" "),
      style: { backgroundColor: CARD_SOFT },
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-2.5 pb-1", "aria-hidden": true, children: /* @__PURE__ */ jsx("span", { className: "h-1 w-9 rounded-full bg-white/20" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2.5 px-3.5 pb-3.5 pt-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF9A3D]/15", children: /* @__PURE__ */ jsx("img", { src: "/images/icons/telegram.svg", alt: "", width: 20, height: 20, "aria-hidden": true, className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[12px] font-semibold text-white/90", children: "Telegram" }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: [
                    "text-[10px] tabular-nums transition-colors duration-500",
                    isLate ? "text-[#FFAB91]" : "text-white/38"
                  ].join(" "),
                  children: stage.time
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1.5 min-h-[2.4rem] text-[12px] leading-snug text-white/88 sm:text-[13px]", children: [
              typed,
              isTyping ? /* @__PURE__ */ jsx("span", { className: "ml-0.5 inline-block text-[#FF9A3D]", "aria-hidden": true, children: "|" }) : null
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: [
                  "mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-all duration-500",
                  showStatus ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0",
                  isLate ? "bg-[#FF5722]/28 text-white" : "bg-white/10 text-white/88",
                  stageIdx === last ? "bg-[#FF5722]/40 text-white" : ""
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: [
                        "h-1.5 w-1.5 rounded-full",
                        isLate ? "bg-[#FF5722]" : "bg-white/90"
                      ].join(" "),
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: stage.status })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function StatusRow({
  title,
  titleClass,
  items,
  toneClass
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: `mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${titleClass}`, children: title }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-1.5", children: items.map((item) => /* @__PURE__ */ jsx(
      "span",
      {
        className: [
          "inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-medium",
          toneClass[item.tone]
        ].join(" "),
        children: item.label
      },
      item.label
    )) })
  ] });
}
function StatusVisual({ isRu }) {
  const copy = isRu ? {
    goodTitle: "Как должно быть",
    badTitle: "Как сейчас",
    good: [
      { label: "Новая", tone: "soft" },
      { label: "В работе", tone: "mid" },
      { label: "Записан", tone: "strong" },
      { label: "Оплачен", tone: "paid" }
    ],
    bad: [
      { label: "Без статуса", tone: "chaos" },
      { label: "Потеряна", tone: "lost" },
      { label: "Ждёт ответа", tone: "warn" },
      { label: "Пропущена", tone: "lost" }
    ]
  } : {
    goodTitle: "How it should be",
    badTitle: "How it is now",
    good: [
      { label: "New", tone: "soft" },
      { label: "In progress", tone: "mid" },
      { label: "Booked", tone: "strong" },
      { label: "Paid", tone: "paid" }
    ],
    bad: [
      { label: "No status", tone: "chaos" },
      { label: "Lost", tone: "lost" },
      { label: "Awaiting", tone: "warn" },
      { label: "Missed", tone: "lost" }
    ]
  };
  const goodTone = {
    soft: "bg-emerald-500/15 text-emerald-200/85",
    mid: "bg-emerald-500/25 text-emerald-100",
    strong: "bg-emerald-500/40 text-white",
    paid: "bg-emerald-500 text-white"
  };
  const badTone = {
    chaos: "bg-white/10 text-white/70",
    warn: "bg-[#FF5722]/20 text-[#FFAB91]",
    lost: "bg-[#FF5722]/30 text-white"
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 space-y-3 pt-1 sm:pt-2", children: [
    /* @__PURE__ */ jsx(
      StatusRow,
      {
        title: copy.goodTitle,
        titleClass: "text-emerald-400/70",
        items: copy.good,
        toneClass: goodTone
      }
    ),
    /* @__PURE__ */ jsx(
      StatusRow,
      {
        title: copy.badTitle,
        titleClass: "text-[#FF8A5C]/85",
        items: copy.bad,
        toneClass: badTone
      }
    )
  ] });
}
function AdminToolCard({
  kind,
  title,
  lines,
  isRu
}) {
  if (kind === "notebook") {
    return /* @__PURE__ */ jsxs("div", { className: "relative w-[9.75rem] shrink-0 overflow-hidden rounded-xl bg-[#1e1c18] sm:w-[10.75rem]", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-y-0 left-0 w-3 bg-[#FF9A3D]/35",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-y-2 left-[5px] flex flex-col justify-around",
          "aria-hidden": true,
          children: [0, 1, 2].map((n) => /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#141414]/80" }, n))
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative pl-5 pr-2.5 py-2.5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.08em] text-[#FF9A3D]/90", children: title }),
        /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1.5 border-t border-dashed border-white/10 pt-2", children: lines.map((line) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "border-b border-white/[0.06] pb-1 font-mono text-[10px] leading-snug text-white/70",
            children: line
          },
          line
        )) })
      ] })
    ] });
  }
  if (kind === "calendar") {
    const days = isRu ? ["пн", "вт", "ср", "чт", "пт", "сб", "вс"] : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const cells = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const hot = /* @__PURE__ */ new Set([3, 7, 12]);
    return /* @__PURE__ */ jsxs("div", { className: "w-[9.75rem] shrink-0 overflow-hidden rounded-xl bg-[#1a1a1a] sm:w-[10.75rem]", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-[#FF5722] px-2.5 py-1.5 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90", children: isRu ? "март" : "march" }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-px px-1.5 pt-1.5 text-center text-[8px] text-white/35", children: days.map((d) => /* @__PURE__ */ jsx("span", { children: d }, d)) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-0.5 px-1.5 pb-1.5 pt-1", children: cells.map((day, i) => /* @__PURE__ */ jsx(
        "span",
        {
          className: [
            "flex h-4 items-center justify-center rounded-sm text-[9px]",
            day == null ? "" : hot.has(day) ? "bg-[#FF5722] font-semibold text-white" : "text-white/55"
          ].join(" "),
          children: day ?? ""
        },
        i
      )) }),
      /* @__PURE__ */ jsx("p", { className: "truncate border-t border-white/[0.06] px-2.5 py-1.5 text-[9px] text-white/50", children: lines[0] })
    ] });
  }
  if (kind === "excel" || kind === "table") {
    return /* @__PURE__ */ jsxs("div", { className: "w-[9.75rem] shrink-0 overflow-hidden rounded-xl bg-[#1a1a1a] sm:w-[10.75rem]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.04] px-2 py-1.5", children: [
        kind === "excel" ? /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/icons/excel.svg",
            alt: "",
            width: 14,
            height: 14,
            "aria-hidden": true,
            className: "h-3.5 w-3.5 shrink-0"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "rounded px-1.5 py-0.5 text-[9px] font-semibold bg-white/15 text-white/80", children: "Sheet" }),
        /* @__PURE__ */ jsx("span", { className: "truncate text-[10px] text-white/50", children: title })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded border border-white/10", children: lines.map((line, row) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: [
            "flex border-b border-white/10 last:border-b-0",
            row === 0 ? "bg-white/[0.06]" : ""
          ].join(" "),
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 shrink-0 border-r border-white/10 px-1 py-1 text-center text-[8px] text-white/30", children: row + 1 }),
            /* @__PURE__ */ jsx("span", { className: "truncate px-1.5 py-1 text-[9px] text-white/65", children: line })
          ]
        },
        line
      )) }) })
    ] });
  }
  if (kind === "chats") {
    const bubbles = isRu ? [
      { side: "in", text: "Здравствуйте!" },
      { side: "out", text: "…" },
      { side: "in", text: "Можно записаться?" }
    ] : [
      { side: "in", text: "Hello!" },
      { side: "out", text: "…" },
      { side: "in", text: "Can I book?" }
    ];
    return /* @__PURE__ */ jsxs("div", { className: "flex w-[9.75rem] shrink-0 flex-col overflow-hidden rounded-xl bg-[#1a1a1a] sm:w-[10.75rem]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9A3D]/20", children: /* @__PURE__ */ jsx("img", { src: "/images/icons/telegram.svg", alt: "", width: 12, height: 12, "aria-hidden": true, className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-[10px] font-semibold text-white/85", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-[8px] text-white/35", children: isRu ? "12 непрочит." : "12 unread" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col gap-1 px-2 py-2", children: bubbles.map((b, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: [
            "max-w-[85%] rounded-lg px-2 py-1 text-[9px] leading-snug",
            b.side === "in" ? "self-start rounded-tl-sm bg-white/10 text-white/75" : "self-end rounded-tr-sm bg-[#FF5722]/35 text-white/85"
          ].join(" "),
          children: b.text
        },
        `${b.text}-${i}`
      )) }),
      /* @__PURE__ */ jsx("div", { className: "border-t border-white/[0.06] px-2 py-1.5", children: /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/[0.06] px-2 py-1 text-[8px] text-white/30", children: isRu ? "Сообщение…" : "Message…" }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-[9.75rem] shrink-0 rounded-xl px-3 py-2.5 sm:w-[10.75rem]",
      style: { backgroundColor: CARD_SOFT },
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold text-[#FF9A3D]", children: title }),
        /* @__PURE__ */ jsx("ul", { className: "mt-1.5 space-y-1", children: lines.map((line) => /* @__PURE__ */ jsxs("li", { className: "truncate text-[11px] leading-snug text-white/60", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[#FF9A3D]/80", children: "›" }),
          " ",
          line
        ] }, line)) })
      ]
    }
  );
}
function AdminVisual({ isRu }) {
  const cards = isRu ? [
    {
      kind: "notebook",
      title: "Блокнот",
      lines: ["Анна — перезвонить", "Игорь — прайс", "Салон — бронь"]
    },
    {
      kind: "calendar",
      title: "Календарь",
      lines: ["15:00 — консультация"]
    },
    {
      kind: "table",
      title: "Таблица",
      lines: ["строка 14 — новая", "строка 22 — ждёт", "фильтр сбит"]
    },
    {
      kind: "excel",
      title: "Excel",
      lines: ["лист «заявки»", "нет статуса", "кто ответил?"]
    },
    {
      kind: "memory",
      title: "Память",
      lines: ["«вроде ответил»", "«завтра напишу»", "«не помню»"]
    },
    {
      kind: "chats",
      title: "Чаты",
      lines: ["12 непрочитанных", "3 пропущенных", "никто не взял"]
    }
  ] : [
    {
      kind: "notebook",
      title: "Notebook",
      lines: ["Anna — call back", "Igor — price list", "Salon — booking"]
    },
    {
      kind: "calendar",
      title: "Calendar",
      lines: ["3:00 pm — consult"]
    },
    {
      kind: "table",
      title: "Sheet",
      lines: ["row 14 — new", "row 22 — waiting", "filter broken"]
    },
    {
      kind: "excel",
      title: "Excel",
      lines: ["leads tab", "no status", "who replied?"]
    },
    {
      kind: "memory",
      title: "Memory",
      lines: ["«think I replied»", "«will write tomorrow»", "«don’t remember»"]
    },
    {
      kind: "chats",
      title: "Chats",
      lines: ["12 unread", "3 missed", "nobody took it"]
    }
  ];
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const inView = useInView(rootRef, { rootMargin: "60px 0px", threshold: 0 });
  const HOLD_MS = 2400;
  const SWIPE_MS = 480;
  const n = cards.length;
  const loop = [...cards, ...cards];
  useEffect(() => {
    if (!inView) return;
    let holdId = 0;
    let swipeId = 0;
    let alive = true;
    const goNext = () => {
      if (!alive) return;
      const next = indexRef.current + 1;
      indexRef.current = next;
      setNoTransition(false);
      setIndex(next);
      if (next === n) {
        swipeId = window.setTimeout(() => {
          if (!alive) return;
          setNoTransition(true);
          indexRef.current = 0;
          setIndex(0);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!alive) return;
              setNoTransition(false);
              holdId = window.setTimeout(goNext, HOLD_MS);
            });
          });
        }, SWIPE_MS);
      } else {
        holdId = window.setTimeout(goNext, HOLD_MS);
      }
    };
    holdId = window.setTimeout(goNext, HOLD_MS);
    return () => {
      alive = false;
      window.clearTimeout(holdId);
      window.clearTimeout(swipeId);
    };
  }, [n, inView]);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0];
    if (!first) return;
    const gap = 10;
    const step = first.offsetWidth + gap;
    track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
  }, [index]);
  return /* @__PURE__ */ jsxs("div", { ref: rootRef, className: "relative min-w-0 overflow-hidden pt-1 sm:pt-2", style: { overflowAnchor: "none" }, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: trackRef,
        className: [
          "flex w-max items-stretch gap-2.5 will-change-transform",
          noTransition ? "transition-none" : "transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        ].join(" "),
        children: loop.map((card, i) => /* @__PURE__ */ jsx(
          AdminToolCard,
          {
            kind: card.kind,
            title: card.title,
            lines: card.lines,
            isRu
          },
          `${card.kind}-${i}`
        ))
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#141414] to-transparent",
        "aria-hidden": true
      }
    )
  ] });
}
function PainBentoCard({
  title,
  text,
  visual,
  accent = false,
  overlay = false,
  bgImage,
  bgAlways = false,
  bgBlur = false,
  bgPosition = "center center",
  className
}) {
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: [
        "relative isolate flex flex-col overflow-hidden rounded-[20px] sm:rounded-2xl",
        "min-h-0 sm:min-h-[260px] bg-[#141414]",
        className ?? ""
      ].join(" "),
      style: { backgroundColor: CARD_DARK },
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
                "absolute inset-0 z-0 h-full w-full scale-[1.08] object-cover",
                bgAlways ? "opacity-100" : "opacity-0",
                bgBlur ? "blur-[5px] brightness-[0.68] saturate-[0.92]" : ""
              ].join(" "),
              style: { objectPosition: bgPosition }
            }
          ),
          bgAlways ? /* @__PURE__ */ jsx(
            "div",
            {
              className: [
                "pointer-events-none absolute inset-0 z-0",
                bgBlur ? "bg-gradient-to-b from-black/55 via-black/48 to-black/72" : accent ? "bg-gradient-to-b from-black/55 via-black/48 to-black/78" : "bg-gradient-to-b from-black/60 via-black/48 to-black/78"
              ].join(" "),
              "aria-hidden": true
            }
          ) : null
        ] }) : null,
        /* @__PURE__ */ jsx(
          "div",
          {
            className: [
              "relative z-[1] flex flex-1 flex-col",
              overlay ? "px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-8" : "px-5 pb-4 pt-5 sm:p-8"
            ].join(" "),
            children: overlay ? /* @__PURE__ */ jsxs("div", { className: "relative z-[1] flex min-h-[240px] flex-1 flex-col justify-start pb-[6.75rem] sm:min-h-[280px] sm:pb-[7.5rem]", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-hero text-[22px] font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[24px]", children: title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2.5 max-w-[36ch] text-[15px] leading-[1.55] text-white/72 sm:text-[16px] sm:leading-[1.6]", children: text })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "mb-4 sm:mb-5 sm:min-h-[96px]", children: visual }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 sm:mt-auto sm:gap-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-hero text-[22px] font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[24px]", children: title }),
                /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[1.55] text-white/72 sm:mt-2.5 sm:text-[16px] sm:leading-[1.6]", children: text })
              ] })
            ] })
          }
        ),
        overlay ? /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-3 bottom-0 z-[3] sm:inset-x-4", children: visual }) : null
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
      className: "relative z-[1] mt-2 scroll-mt-[calc(var(--tivonix-header-spacer)+12px)] bg-black pt-6 pb-14 sm:mt-6 sm:pt-4 sm:pb-20 lg:mt-8 lg:pt-6 lg:pb-24",
      children: /* @__PURE__ */ jsxs(Container, { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "min-w-0 text-center", children: /* @__PURE__ */ jsx(
          "h2",
          {
            className: `${LANDING_HEADLINE_CLASS} text-center leading-[1.08] sm:leading-[0.98]`,
            children: copy.pain.titleLines.map((line) => /* @__PURE__ */ jsx("span", { className: "block", children: line }, line))
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-1 gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:items-stretch", children: [
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-auto sm:h-full lg:col-span-8 lg:min-h-[340px]",
              title: items[0].title,
              text: items[0].text,
              bgImage: PAIN_CARD_BACKGROUNDS[0],
              visual: /* @__PURE__ */ jsx(ChannelsVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-auto sm:h-full lg:col-span-4 lg:min-h-[340px]",
              title: items[1].title,
              text: items[1].text,
              accent: true,
              overlay: true,
              bgImage: PAIN_CARD_BACKGROUNDS[1],
              bgAlways: true,
              bgBlur: true,
              bgPosition: "center 32%",
              visual: /* @__PURE__ */ jsx(TelegramVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-auto sm:h-full lg:col-span-6",
              title: items[3].title,
              text: items[3].text,
              bgImage: PAIN_CARD_BACKGROUNDS[3],
              visual: /* @__PURE__ */ jsx(AdminVisual, { isRu })
            }
          ),
          /* @__PURE__ */ jsx(
            PainBentoCard,
            {
              className: "h-auto sm:h-full lg:col-span-6",
              title: items[2].title,
              text: items[2].text,
              bgImage: PAIN_CARD_BACKGROUNDS[2],
              visual: /* @__PURE__ */ jsx(StatusVisual, { isRu })
            }
          )
        ] })
      ] })
    }
  );
}
const OFFER_MOSAIC_BG = `/images/${encodeURI("как рабоает/пп/блоки/ffon.webp")}`;
const OFFER_MOSAIC_ASPECT = 1672 / 941;
const OFFER_TN_FOCUS_Y = 0.74;
const TOP_ENTER_STAGGER_MS = 80;
const TOP_ENTER_DURATION_MS = 420;
const REVEAL_DELAY_MS = 60;
const REVEAL_DURATION_MS = 1100;
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
      const mosaicEl = mosaicRef.current;
      if (!mosaicEl) return;
      const mosaicRect = mosaicEl.getBoundingClientRect();
      if (mosaicRect.width <= 0 || mosaicRect.height <= 0) return;
      const isMobile = window.innerWidth < 1024;
      const rowBottom2 = mosaicEl.querySelector(".offer-mosaic__row-bottom");
      mosaicEl.style.setProperty("--offer-grid-w", `${mosaicRect.width}px`);
      mosaicEl.style.setProperty("--offer-grid-h", `${mosaicRect.height}px`);
      mosaicEl.querySelectorAll("[data-offer-slice]").forEach((card) => {
        const inBottomRow = Boolean(card.closest(".offer-mosaic__row-bottom"));
        if (isMobile && inBottomRow && rowBottom2) {
          const rowRect = rowBottom2.getBoundingClientRect();
          const cardRect2 = card.getBoundingClientRect();
          const gridW = Math.max(rowBottom2.scrollWidth, rowRect.width);
          const gridH = gridW / OFFER_MOSAIC_ASPECT;
          const posX2 = cardRect2.left - rowRect.left + rowBottom2.scrollLeft;
          const posY2 = cardRect2.height * 0.48 - gridH * OFFER_TN_FOCUS_Y;
          card.style.setProperty("--offer-bg-w", `${gridW}px`);
          card.style.setProperty("--offer-bg-h", `${gridH}px`);
          card.style.setProperty("--offer-bg-pos-x", `${-posX2}px`);
          card.style.setProperty("--offer-bg-pos-y", `${posY2}px`);
          return;
        }
        const cardRect = card.getBoundingClientRect();
        const scroll = getAccumulatedScroll(card, mosaicEl);
        const posX = cardRect.left - mosaicRect.left + scroll.x;
        const posY = cardRect.top - mosaicRect.top + scroll.y;
        card.style.setProperty("--offer-bg-w", `${mosaicRect.width}px`);
        card.style.setProperty("--offer-bg-h", `${mosaicRect.height}px`);
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
    const staggerSpan = 0.32;
    const next = cards.map((_, index) => {
      const start = index / cards.length * staggerSpan;
      const local = clamp$1((progress - start) / (1 - start + 0.12), 0, 1);
      const bgRaw = clamp$1(local / 0.45, 0, 1);
      const textRaw = clamp$1((local - 0.12) / 0.4, 0, 1);
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
  title,
  text,
  className,
  bgReveal,
  textReveal: textReveal2
}) {
  return /* @__PURE__ */ jsx(
    OfferBlockCard,
    {
      slice,
      bgReveal,
      textReveal: textReveal2,
      className: ["min-h-[280px] sm:min-h-[300px] lg:min-h-0", className].filter(Boolean).join(" "),
      children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-0 flex-1 flex-col justify-between gap-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "min-h-[2.6em] font-hero text-[clamp(1.2rem,2.2vw,1.55rem)] font-normal uppercase leading-[1.12] tracking-[0.02em] text-white", children: title }),
        /* @__PURE__ */ jsx("p", { className: "min-h-[4.65em] text-pretty text-[14px] font-normal leading-[1.55] tracking-normal text-white/70 sm:min-h-[4.65em] sm:text-[15px]", children: text })
      ] })
    }
  );
}
function FeaturedCard({
  title,
  text,
  linkText,
  footer,
  className,
  visible
}) {
  const { openLeadForm } = useLeadForm();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: [
        "offer-top-enter h-full w-full min-w-0",
        visible ? "offer-top-enter--visible" : "",
        className ?? ""
      ].filter(Boolean).join(" "),
      children: /* @__PURE__ */ jsxs(OfferBlockCard, { slice: 1, className: "h-full lg:min-h-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "my-0 max-w-[48ch] flex-1 sm:my-1 lg:my-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-hero text-[clamp(1.35rem,2.8vw,1.85rem)] font-normal uppercase leading-[1.12] tracking-[0.02em] text-white", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] font-normal leading-[1.55] tracking-normal text-white/72 sm:mt-3.5 sm:text-[16px] sm:leading-[1.6]", children: text }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => openLeadForm("main_offer"),
              className: "group mt-5 inline-flex min-h-[2.5rem] items-center gap-1.5 text-[14px] font-medium tracking-normal text-white/85 transition hover:text-[#FFAE66]",
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
        /* @__PURE__ */ jsx("p", { className: "text-[13px] font-normal leading-snug tracking-normal text-white/55 sm:text-[14px]", children: footer })
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
        /* @__PURE__ */ jsx(Reveal$1, { delay: 0, children: /* @__PURE__ */ jsx("div", { className: "min-w-0 text-center", children: /* @__PURE__ */ jsx("h2", { className: `${LANDING_HEADLINE_CLASS} text-center text-balance`, children: copy.offer.title }) }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: mosaicRef,
            className: "offer-mosaic relative mt-10 flex flex-col gap-2.5 sm:mt-12 sm:gap-4",
            style: {
              ["--offer-mosaic-image"]: `url("${OFFER_MOSAIC_BG}")`
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "offer-mosaic__row-top grid grid-cols-1 gap-2.5 sm:gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "offer-mosaic__cell min-h-[220px] min-w-0 w-full sm:min-h-[240px] lg:col-span-8 lg:min-h-0", children: /* @__PURE__ */ jsx(
                  FeaturedCard,
                  {
                    title: copy.offer.featured.title,
                    text: copy.offer.featured.text,
                    linkText: copy.offer.featured.linkText,
                    footer: copy.offer.featured.footer,
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
                      className: "h-full min-h-[21rem] sm:min-h-[21rem] lg:min-h-0"
                    }
                  )
                },
                item.title
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
function cx$9(...a) {
  return a.filter(Boolean).join(" ");
}
function TivonixGlowBorder({ className, children }) {
  return /* @__PURE__ */ jsx("div", { className: cx$9("tivonix-glow-border", className), children: /* @__PURE__ */ jsx("div", { className: "tivonix-glow-border__content relative min-h-0 flex-1", children }) });
}
function cx$8(...a) {
  return a.filter(Boolean).join(" ");
}
function ScrollFingerHint({
  visible,
  label,
  variant = "light",
  bare: _bare = false,
  onActivate,
  className,
  style
}) {
  const isDark = variant === "dark";
  const ink = isDark ? "#1a1a1a" : "#ffffff";
  const accent = "#ff6b2c";
  const Tag = onActivate ? "button" : "div";
  return /* @__PURE__ */ jsxs(
    Tag,
    {
      type: onActivate ? "button" : void 0,
      onClick: onActivate,
      className: cx$8(
        "scroll-finger-hint",
        visible && "scroll-finger-hint--visible",
        isDark && "scroll-finger-hint--dark",
        className
      ),
      style,
      "aria-hidden": !visible,
      "aria-label": onActivate ? label ?? "Scroll down" : void 0,
      tabIndex: onActivate && visible ? 0 : -1,
      children: [
        /* @__PURE__ */ jsx("span", { className: "scroll-finger-hint__icon", "aria-hidden": true, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 28 44", width: "28", height: "44", fill: "none", children: [
          /* @__PURE__ */ jsx(
            "rect",
            {
              x: "2",
              y: "1",
              width: "24",
              height: "40",
              rx: "12",
              stroke: ink,
              strokeWidth: "2"
            }
          ),
          /* @__PURE__ */ jsx("rect", { x: "12", y: "8", width: "4", height: "12", rx: "2", stroke: ink, strokeWidth: "1.5", opacity: "0.55" }),
          /* @__PURE__ */ jsx("circle", { className: "scroll-finger-hint__wheel", cx: "14", cy: "11", r: "2", fill: accent })
        ] }) }),
        label ? /* @__PURE__ */ jsx("span", { className: "scroll-finger-hint__label", children: label }) : null
      ]
    }
  );
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
function clamp01$2(v) {
  return Math.min(1, Math.max(0, v));
}
function smoothstep(t) {
  const x = clamp01$2(t);
  return x * x * (3 - 2 * x);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function logoReveal(progress, index) {
  const orbitSpan = ORBIT_REVEAL_END - ORBIT_START;
  const segment = orbitSpan / AI_MODEL_COUNT;
  const start = ORBIT_START + index * segment;
  return smoothstep((progress - start) / (segment * 0.72));
}
function aiMarkOpacity(progress, approach) {
  if (progress >= ORBIT_START - 0.02) return 0;
  const fadeIn = Math.max(smoothstep(progress / 0.04), approach);
  const fadeOut = 1 - smoothstep((progress - 0.1) / (AI_MARK_PHASE_END - 0.1));
  return fadeIn * fadeOut;
}
function sectionApproach(rectTop, viewport, headerSpacer) {
  return smoothstep((viewport * 0.88 - rectTop) / (viewport * 0.88 - headerSpacer));
}
function aiShellExpand(rectTop, scrollInTrack, viewport, headerSpacer, scrollable, tailPx) {
  let expand = 0;
  if (rectTop < viewport * 0.92) {
    expand = sectionApproach(rectTop, viewport, headerSpacer);
  } else if (scrollInTrack > 0) {
    expand = 1;
  }
  const tailStart = scrollable - tailPx * 0.9;
  if (scrollInTrack > tailStart) {
    expand *= 1 - smoothstep((scrollInTrack - tailStart) / Math.max(1, tailPx * 0.9));
  }
  return expand;
}
function hubReveal(progress) {
  return smoothstep((progress - HUB_START) / 0.1);
}
function rowReady(drop) {
  return smoothstep(clamp01$2((drop - 0.94) / 0.06));
}
function typewriterLength(progress, length, drop) {
  const ready = rowReady(drop);
  if (ready <= 0) return 0;
  const t = smoothstep((progress - TYPE_START) / (TYPE_END - TYPE_START)) * ready;
  return Math.floor(t * length);
}
function textReveal(progress, drop) {
  const ready = rowReady(drop);
  if (ready <= 0) return 0;
  return smoothstep((progress - (TYPE_START - 0.01)) / 0.04) * ready;
}
function hubContentFade(drift) {
  return smoothstep((drift - 0.32) / 0.52);
}
function dropToBlocks(progress) {
  if (progress < DROP_START) return 0;
  return smoothstep((progress - DROP_START) / (DROP_END - DROP_START));
}
function rowExitScroll(drift) {
  return smoothstep(drift);
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
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const isRu = lang === "ru";
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
  const reducedMotionPref = usePrefersReducedMotion();
  const [tgWebView, setTgWebView] = useState(false);
  useEffect(() => {
    setTgWebView(isTelegramWebView());
  }, []);
  const reducedMotion = reducedMotionPref || tgWebView;
  const headline = copy.ai.headline;
  const [showScrollHint, setShowScrollHint] = useState(false);
  const showHintRef = useRef(false);
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
      animScrollable = Math.max(1, animPinHeight - getStableViewportHeight());
      driftScrollable = Math.max(1, trackHeight - animPinHeight);
      tailPx = DRIFT_RUNWAY_VH / 100 * getStableViewportHeight();
      headerSpacer = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--tivonix-header-spacer")
      ) || 92;
    };
    const applyFrame = () => {
      const scrollY = window.scrollY;
      const viewport = getStableViewportHeight();
      const scrollInTrack = scrollY - trackTop;
      if (scrollInTrack < -viewport || scrollInTrack > trackHeight + viewport) {
        if (showHintRef.current) {
          showHintRef.current = false;
          setShowScrollHint(false);
        }
        return false;
      }
      const rectTop = sectionRef.current?.getBoundingClientRect().top ?? trackTop - scrollY;
      const scrollable = Math.max(1, trackHeight - viewport);
      const pinProgress = reducedMotion ? tgWebView || scrollInTrack > animScrollable * 0.2 ? 1 : 0 : clamp01$2(scrollInTrack / animScrollable);
      const drift = reducedMotion ? 0 : clamp01$2((scrollInTrack - animScrollable) / driftScrollable);
      const isEntered = rectTop < viewport * 0.85;
      const approach = rectTop < viewport * 0.92 ? sectionApproach(rectTop, viewport, headerSpacer) : scrollInTrack > 0 ? 1 : 0;
      const progress = pinProgress;
      const expand = reducedMotion ? 1 : aiShellExpand(rectTop, scrollInTrack, viewport, headerSpacer, scrollable, tailPx);
      const hub = hubReveal(progress);
      const drop = dropToBlocks(progress);
      const typedChars = typewriterLength(progress, headline.length, drop);
      const aiMarkIn = aiMarkOpacity(progress, approach);
      const hubFade = hubContentFade(drift);
      const textOpacity = textReveal(progress, drop) * (1 - hubFade);
      const hubOpacity = hub * (1 - hubFade);
      const targetExitScroll = rowExitScroll(drift);
      const isScrolling = scrollY !== lastScrollY;
      const smoothRate = reducedMotion || !isScrolling ? 1 : 0.18;
      smoothExitScroll += (targetExitScroll - smoothExitScroll) * smoothRate;
      const exitScroll = smoothExitScroll;
      const auroraStrength = 1;
      const inAnimPin = scrollInTrack >= 0 && scrollInTrack < animScrollable;
      const isPinned = inAnimPin && rectTop <= 0;
      const nextHint = !reducedMotion && inAnimPin && rectTop <= 48 && progress < 0.28;
      if (nextHint !== showHintRef.current) {
        showHintRef.current = nextHint;
        if (isScrolling || !nextHint) {
          setShowScrollHint(nextHint);
        }
      }
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
      const mobileStripReveal = phoneLayout && drop > 0.68 ? smoothstep((drop - 0.68) / 0.25) : 0;
      const mobileStripProgress = mobileStripReveal * (1 - exitScroll);
      const stripActive = compactLayout && drop >= STRIP_DROP_THRESHOLD;
      const stripFadeIn = stripActive ? smoothstep((drop - STRIP_DROP_THRESHOLD) / STRIP_FADE_SPAN) : 0;
      const driftPxBase = exitScroll * Math.max(viewport * 0.72, 480);
      const driftPx = phoneLayout && !stripActive ? -mobileStripProgress * mobileDriftMax : driftPxBase;
      const orbitBlend = 1 - smoothstep(drop / 0.24);
      const inOrbitPhase = orbitBlend > 0.04;
      const orbitBlocksIn = progress < ORBIT_START ? 0 : smoothstep((progress - ORBIT_START) / 0.07);
      const logoExitFade = phoneLayout ? smoothstep((exitScroll - 0.9) / 0.1) : smoothstep((exitScroll - 0.28) / 0.72);
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
          const animSettled = smoothstep((progress - 0.97) / 0.03);
          const scrollT = clamp01$2(animSettled * 0.15 + exitScroll * 0.85);
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
        const rowOpacity = smoothstep(drop);
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
      return isScrolling && Math.abs(smoothExitScroll - targetExitScroll) > 15e-4;
    };
    const update = () => {
      const continueSmoothing = applyFrame();
      raf = continueSmoothing ? requestAnimationFrame(update) : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 10) return;
      lastW = window.innerWidth;
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
  }, [reducedMotion, headline, tgWebView]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: pinWrapRef,
      className: "ai-premium-pin relative",
      style: {
        height: tgWebView ? "auto" : `calc(${ANIM_PIN_VH}svh + ${DRIFT_RUNWAY_VH}svh)`,
        ["--ai-expand"]: tgWebView ? "1" : "0"
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: animPinRef,
          className: "ai-premium-anim-pin relative",
          style: { height: tgWebView ? "auto" : `${ANIM_PIN_VH}svh` },
          children: /* @__PURE__ */ jsxs(
            "section",
            {
              ref: sectionRef,
              id: "ai",
              className: tgWebView ? "ai-premium-section relative z-40 flex min-h-[100svh] flex-col" : "ai-premium-section relative sticky top-0 z-40 flex h-[100svh] flex-col",
              "aria-label": copy.ai.ariaLabel,
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    ref: shellRef,
                    className: "ai-premium-section-shell relative mx-auto flex min-h-0 w-full flex-1 flex-col",
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
                ),
                /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[60] flex justify-center pb-1 sm:bottom-8", children: /* @__PURE__ */ jsx(
                  ScrollFingerHint,
                  {
                    bare: true,
                    visible: showScrollHint && !tgWebView,
                    variant: "light",
                    label: isRu ? "Листайте — появится анимация" : "Scroll — the animation plays",
                    onActivate: () => {
                      window.scrollBy({
                        top: Math.round(window.innerHeight * 0.32),
                        behavior: "smooth"
                      });
                    },
                    className: "pointer-events-auto"
                  }
                ) })
              ]
            }
          )
        }
      )
    }
  ) });
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
const COMPARE_SYSTEM_BG = "/images/ff11.webp";
function ComparisonSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const pricing = pricingCopy(lang);
  const isRu = lang === "ru";
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "compare",
      className: "compare-section-lift scroll-mt-[var(--tivonix-header-spacer)] bg-black !pb-8 !pt-6 sm:!pb-10 sm:!pt-8 lg:!pb-12 lg:!pt-10",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[46rem] text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance", children: copy.compare.title }),
          copy.compare.subtitle ? /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-[40rem] font-sans text-[15px] font-medium leading-[1.55] tracking-normal text-white/48 sm:text-[16px]", children: copy.compare.subtitle }) : null
        ] }),
        /* @__PURE__ */ jsx("div", { className: "compare-split-wrap compare-split-wrap--static mt-6 sm:mt-7", children: /* @__PURE__ */ jsxs("div", { className: "compare-split", children: [
          /* @__PURE__ */ jsx("article", { className: "compare-split__left compare-split__panel", "aria-label": copy.compare.regular.title, children: /* @__PURE__ */ jsxs("div", { className: "compare-split__left-inner", children: [
            /* @__PURE__ */ jsx("p", { className: "compare-split__label text-white/40", children: copy.compare.regular.title }),
            /* @__PURE__ */ jsx("h3", { className: "compare-split__headline", children: copy.compare.regular.headline }),
            /* @__PURE__ */ jsx("div", { className: "compare-manual", "aria-label": isRu ? "Хаос после формы" : "Chaos after the form", children: /* @__PURE__ */ jsxs("div", { className: "compare-manual__chaos", children: [
              /* @__PURE__ */ jsx("div", { className: "compare-manual__wires", "aria-hidden": true, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [
                /* @__PURE__ */ jsx("path", { d: "M22 18 C34 14, 42 16, 48 20" }),
                /* @__PURE__ */ jsx("path", { d: "M68 18 C78 22, 84 28, 88 34" }),
                /* @__PURE__ */ jsx("path", { d: "M18 28 C14 40, 14 48, 18 56" }),
                /* @__PURE__ */ jsx("path", { d: "M28 58 C40 62, 48 58, 54 54" }),
                /* @__PURE__ */ jsx("path", { d: "M62 52 C72 56, 80 58, 86 60" }),
                /* @__PURE__ */ jsx("path", { d: "M22 66 C30 74, 36 80, 42 84" }),
                /* @__PURE__ */ jsx("path", { d: "M58 68 C66 76, 72 82, 78 86" }),
                /* @__PURE__ */ jsx("path", { d: "M52 28 C50 36, 48 42, 50 48" }),
                /* @__PURE__ */ jsx("path", { d: "M88 42 C82 52, 76 62, 72 70" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "compare-manual__chips", children: [
                /* @__PURE__ */ jsx("span", { className: "compare-manual__chip compare-manual__chip--ok compare-manual__chip--a", children: copy.compare.regular.items[0] }),
                /* @__PURE__ */ jsxs("span", { className: "compare-manual__chip compare-manual__chip--warn compare-manual__chip--b", children: [
                  /* @__PURE__ */ jsx("span", { className: "compare-manual__x", "aria-hidden": true, children: "×" }),
                  copy.compare.chaosTags[0]
                ] }),
                /* @__PURE__ */ jsx("span", { className: "compare-manual__chip compare-manual__chip--ok compare-manual__chip--c", children: copy.compare.regular.items[1] }),
                /* @__PURE__ */ jsxs("span", { className: "compare-manual__chip compare-manual__chip--warn compare-manual__chip--d", children: [
                  /* @__PURE__ */ jsx("span", { className: "compare-manual__x", "aria-hidden": true, children: "×" }),
                  copy.compare.chaosTags[1]
                ] }),
                /* @__PURE__ */ jsx("span", { className: "compare-manual__chip compare-manual__chip--ok compare-manual__chip--e", children: copy.compare.regular.items[2] }),
                /* @__PURE__ */ jsxs("span", { className: "compare-manual__chip compare-manual__chip--warn compare-manual__chip--f", children: [
                  /* @__PURE__ */ jsx("span", { className: "compare-manual__x", "aria-hidden": true, children: "×" }),
                  copy.compare.chaosTags[2]
                ] }),
                /* @__PURE__ */ jsx("span", { className: "compare-manual__chip compare-manual__chip--ok compare-manual__chip--g", children: copy.compare.regular.items[3] }),
                /* @__PURE__ */ jsxs("span", { className: "compare-manual__chip compare-manual__chip--warn compare-manual__chip--h", children: [
                  /* @__PURE__ */ jsx("span", { className: "compare-manual__x", "aria-hidden": true, children: "×" }),
                  copy.compare.chaosTags[3]
                ] })
              ] })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsxs("article", { className: "compare-split__right compare-split__panel", "aria-label": copy.compare.tivonix.title, children: [
            /* @__PURE__ */ jsxs("div", { className: "compare-split__right-media", style: { transform: "scale(1.04)" }, "aria-hidden": true, children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: COMPARE_SYSTEM_BG,
                  alt: "",
                  className: "compare-split__globe",
                  loading: "lazy",
                  decoding: "async"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "compare-split__right-overlay" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "compare-split__right-inner", children: [
              /* @__PURE__ */ jsx("p", { className: "compare-split__label text-white/75", children: copy.compare.tivonix.title }),
              /* @__PURE__ */ jsx("h3", { className: "compare-split__headline", children: copy.compare.tivonix.headline }),
              /* @__PURE__ */ jsx("ul", { className: "compare-system-list", children: copy.compare.tivonix.items.map((item, index) => /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx(Check, { size: 16, className: "shrink-0 text-white", strokeWidth: 2.5, "aria-hidden": true }),
                /* @__PURE__ */ jsx("span", { className: "compare-system-list__text", children: item }),
                index === 1 ? /* @__PURE__ */ jsxs("span", { className: "compare-system-list__icons", "aria-hidden": true, children: [
                  /* @__PURE__ */ jsx("img", { src: "/images/icons/telegram.svg", alt: "", className: "compare-system-list__icon" }),
                  /* @__PURE__ */ jsx("img", { src: "/images/icons/gmail.svg", alt: "", className: "compare-system-list__icon" })
                ] }) : null,
                index === 2 ? /* @__PURE__ */ jsx("span", { className: "compare-system-list__icons", "aria-hidden": true, children: /* @__PURE__ */ jsx("img", { src: "/images/icons/excel.svg", alt: "", className: "compare-system-list__icon" }) }) : null,
                index === 5 ? /* @__PURE__ */ jsx("span", { className: "compare-system-list__icons", "aria-hidden": true, children: /* @__PURE__ */ jsx("img", { src: "/images/icons/google-ads.svg", alt: "", className: "compare-system-list__icon" }) }) : null
              ] }, item)) }),
              /* @__PURE__ */ jsx("div", { className: "compare-split__badge mt-auto pt-6", children: copy.compare.tivonix.badge })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "article",
            {
              className: "compare-split__pricing compare-split__panel scroll-mt-[var(--tivonix-header-spacer)]",
              "aria-label": copy.pricingTeaser.title,
              children: /* @__PURE__ */ jsxs("div", { className: "compare-split__pricing-inner", children: [
                /* @__PURE__ */ jsx("p", { className: "compare-split__eyebrow compare-split__label", children: copy.pricingTeaser.eyebrow }),
                /* @__PURE__ */ jsx("h3", { className: "compare-split__headline", children: copy.pricingTeaser.title }),
                /* @__PURE__ */ jsx("div", { className: "compare-plans-teaser mt-5", children: PLAN_IDS.map((id) => {
                  const plan = pricing.plans[id];
                  const badge = id === "growth" ? pricing.badges.popular : id === "product" ? pricing.badges.product : null;
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: `compare-plans-teaser__item${id === "growth" ? " compare-plans-teaser__item--highlight" : id === "product" ? " compare-plans-teaser__item--accent" : ""}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "compare-plans-teaser__head", children: [
                          /* @__PURE__ */ jsxs("div", { className: "compare-plans-teaser__names", children: [
                            /* @__PURE__ */ jsx("span", { className: "compare-plans-teaser__name", children: plan.name }),
                            badge ? /* @__PURE__ */ jsx("span", { className: "compare-plans-teaser__badge", children: badge }) : null
                          ] }),
                          /* @__PURE__ */ jsx("span", { className: "compare-plans-teaser__price", children: plan.price })
                        ] }),
                        /* @__PURE__ */ jsx("p", { className: "compare-plans-teaser__tagline", children: plan.tagline })
                      ]
                    },
                    id
                  );
                }) })
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsx(
          LeadCTAButton,
          {
            source: "compare",
            variant: "primary",
            size: "lg",
            onClick: () => trackEvent("service_cta_click", { section: "compare" }),
            children: "cta" in copy.compare ? copy.compare.cta : isRu ? "Разобрать мой процесс" : "Map my process"
          }
        ) })
      ] })
    }
  );
}
const PLANS_IMG$2 = `/images/${encodeURIComponent("планы")}`;
const GRID_PLANS = [
  {
    id: "start",
    img: `${PLANS_IMG$2}/1.webp`,
    footRu: "Быстрый старт под рекламу",
    footEn: "Fast launch for ads"
  },
  {
    id: "growth",
    img: `${PLANS_IMG$2}/2.webp`,
    footRu: "Чаще всего выбирают",
    footEn: "Most chosen plan"
  },
  {
    id: "product",
    img: `${PLANS_IMG$2}/3.webp`,
    footRu: "Для веб-сервиса",
    footEn: "For a web service"
  },
  {
    id: "custom",
    img: `${PLANS_IMG$2}/4.webp`,
    footRu: "Под вашу логику",
    footEn: "Built around your logic"
  }
];
const ENTERPRISE_IMG = `${PLANS_IMG$2}/5.webp`;
const PLAN_TAGS = {
  start: { ru: "Заявки", en: "Leads" },
  growth: { ru: "Система", en: "System" },
  product: { ru: "Продукт", en: "Product" },
  custom: { ru: "Масштаб", en: "Scale" }
};
function clamp01$1(v) {
  return Math.min(1, Math.max(0, v));
}
function usePlanPhotoScale(sectionRef) {
  const [scale, setScale] = useState(1.04);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1.12);
      return;
    }
    let raf = 0;
    let lastScale = 1.04;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = getStableViewportHeight();
      const total = Math.max(1, rect.height + vh * 0.45);
      const scrolled = vh * 0.75 - rect.top;
      const progress = clamp01$1(scrolled / total);
      const next = 1.04 + progress * 0.28;
      if (Math.abs(next - lastScale) < 4e-3) return;
      lastScale = next;
      setScale(next);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [sectionRef]);
  return scale;
}
function FeatureIcon() {
  return /* @__PURE__ */ jsx(Check, { className: "home-plan-card__check h-3.5 w-3.5", strokeWidth: 2.25, "aria-hidden": true });
}
function HomePlanPrice({ price, priceOriginal }) {
  const match = price.match(/^(от|from)\s+(.+)$/i);
  const from = match?.[1];
  const amount = match?.[2];
  const hasOriginal = Boolean(priceOriginal);
  return /* @__PURE__ */ jsx("div", { className: "home-plan-card__price-block", children: /* @__PURE__ */ jsxs("div", { className: "home-plan-card__price", children: [
    /* @__PURE__ */ jsx(
      "p",
      {
        className: ["home-plan-card__price-old", hasOriginal ? "" : "is-empty"].filter(Boolean).join(" "),
        "aria-hidden": !hasOriginal,
        children: priceOriginal ?? " "
      }
    ),
    from && amount ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { className: "home-plan-card__price-from", children: from }),
      /* @__PURE__ */ jsx("span", { className: "home-plan-card__price-amount", children: amount })
    ] }) : /* @__PURE__ */ jsx("span", { className: "home-plan-card__price-amount home-plan-card__price-amount--solo", children: price })
  ] }) });
}
function HomePricingSection() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const pricing = pricingCopy(lang);
  const extra = homeExtraCopy(lang);
  const { openLeadForm } = useLeadForm();
  const sectionRef = useRef(null);
  const photoScale = usePlanPhotoScale(sectionRef);
  const custom = pricing.plans.custom;
  const photoStyle = { "--plan-photo-scale": String(photoScale) };
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "pricing",
      ref: sectionRef,
      className: "scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16 lg:!py-20",
      style: photoStyle,
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs(Reveal$1, { className: "mx-auto max-w-[40rem] text-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance", children: extra.homePricing.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-[38rem] font-sans text-[14.5px] font-medium leading-[1.55] text-white/62", children: extra.homePricing.note })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "home-plan-grid mt-10", children: GRID_PLANS.map(({ id, img, footRu, footEn }, i) => {
          const plan = pricing.plans[id];
          const popular = id === "growth";
          const tag = PLAN_TAGS[id][isRu ? "ru" : "en"];
          const isCustom = id === "custom";
          return /* @__PURE__ */ jsx(Reveal$1, { delay: i * 45, className: "home-plan-grid__cell", children: /* @__PURE__ */ jsxs(
            "article",
            {
              className: [
                "home-plan-card",
                popular ? "home-plan-card--popular" : ""
              ].join(" "),
              children: [
                /* @__PURE__ */ jsx("div", { className: "home-plan-card__media", "aria-hidden": true, children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: img,
                    alt: "",
                    className: "home-plan-card__bg",
                    loading: "lazy",
                    decoding: "async"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "home-plan-card__veil", "aria-hidden": true }),
                /* @__PURE__ */ jsxs("div", { className: "home-plan-card__body", children: [
                  /* @__PURE__ */ jsxs("div", { className: "home-plan-card__main", children: [
                    /* @__PURE__ */ jsxs("div", { className: "home-plan-card__head", children: [
                      /* @__PURE__ */ jsxs("div", { className: "home-plan-card__tag-row", children: [
                        /* @__PURE__ */ jsx("span", { className: "home-plan-card__tag", children: tag }),
                        popular ? /* @__PURE__ */ jsx("span", { className: "home-plan-card__new", children: pricing.badges.popular }) : /* @__PURE__ */ jsx("span", { className: "home-plan-card__new is-empty", "aria-hidden": true, children: " " })
                      ] }),
                      /* @__PURE__ */ jsx("h3", { className: "home-plan-card__name", children: plan.name }),
                      /* @__PURE__ */ jsx(HomePlanPrice, { price: plan.price, priceOriginal: plan.priceOriginal }),
                      /* @__PURE__ */ jsx("p", { className: "home-plan-card__unit", children: plan.tagline })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "home-plan-card__actions", children: [
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: "/plans",
                          className: "home-plan-card__cta group",
                          onClick: () => trackEvent("pricing_cta_click", {
                            plan: id,
                            source: "home_more"
                          }),
                          children: [
                            extra.homePricing.more,
                            /* @__PURE__ */ jsx(
                              ArrowUpRight,
                              {
                                className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                "aria-hidden": true
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "home-plan-card__fine", children: isCustom ? isRu ? "Оценка после брифа" : "Quote after a brief" : isRu ? `Скидка ${LAUNCH_DISCOUNT_PERCENT}% на запуск` : `${LAUNCH_DISCOUNT_PERCENT}% launch discount` }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "home-plan-card__process",
                          onClick: () => {
                            trackEvent("pricing_cta_click", {
                              plan: id,
                              source: "home"
                            });
                            openLeadForm("pricing", { planId: id });
                          },
                          children: isRu ? "Разобрать мой процесс" : "Map my process"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "home-plan-card__details", children: [
                    /* @__PURE__ */ jsx("p", { className: "home-plan-card__desc", children: plan.desc }),
                    /* @__PURE__ */ jsx("ul", { className: "home-plan-card__list", children: plan.includes.slice(0, 6).map((item) => /* @__PURE__ */ jsxs("li", { children: [
                      /* @__PURE__ */ jsx(FeatureIcon, {}),
                      /* @__PURE__ */ jsx("span", { children: item })
                    ] }, item)) }),
                    /* @__PURE__ */ jsxs("p", { className: "home-plan-card__foot", children: [
                      /* @__PURE__ */ jsx(Check, { className: "h-3 w-3", strokeWidth: 3, "aria-hidden": true }),
                      isRu ? footRu : footEn
                    ] })
                  ] })
                ] })
              ]
            }
          ) }, id);
        }) }),
        /* @__PURE__ */ jsx(Reveal$1, { delay: 200, className: "mt-3", children: /* @__PURE__ */ jsxs("article", { className: "home-plan-enterprise", children: [
          /* @__PURE__ */ jsx("div", { className: "home-plan-enterprise__media", "aria-hidden": true, children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ENTERPRISE_IMG,
              alt: "",
              className: "home-plan-enterprise__bg",
              loading: "lazy",
              decoding: "async"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "home-plan-card__veil home-plan-card__veil--wide", "aria-hidden": true }),
          /* @__PURE__ */ jsxs("div", { className: "home-plan-enterprise__inner", children: [
            /* @__PURE__ */ jsxs("div", { className: "home-plan-enterprise__copy", children: [
              /* @__PURE__ */ jsx("span", { className: "home-plan-card__tag", children: PLAN_TAGS.custom[isRu ? "ru" : "en"] }),
              /* @__PURE__ */ jsx("h3", { className: "home-plan-enterprise__name", children: custom.name }),
              /* @__PURE__ */ jsx("p", { className: "home-plan-enterprise__desc", children: custom.desc })
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "home-plan-enterprise__list", children: custom.includes.map((item) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(FeatureIcon, {}),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsx("div", { className: "home-plan-enterprise__action", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  trackEvent("pricing_cta_click", {
                    plan: "custom",
                    source: "home_enterprise"
                  });
                  openLeadForm("pricing", { planId: "custom" });
                },
                className: "home-plan-card__cta group",
                children: [
                  extra.homePricing.ctas.custom,
                  /* @__PURE__ */ jsx(
                    ArrowUpRight,
                    {
                      className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      "aria-hidden": true
                    }
                  )
                ]
              }
            ) })
          ] })
        ] }) })
      ] })
    }
  );
}
function stepDetail(step) {
  if (step.kind === "search") return step.hint ?? step.query;
  return step.items.slice(0, 2).join(" · ");
}
function ProcessTimelineSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const steps = copy.process.steps;
  const isRu = lang === "ru";
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: "process",
      className: "scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24",
      "aria-labelledby": "process-title",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(Reveal$1, { children: /* @__PURE__ */ jsxs("header", { className: "mx-auto max-w-[40rem] text-center", children: [
          /* @__PURE__ */ jsx("h2", { id: "process-title", className: `${LANDING_HEADLINE_CLASS} text-center`, children: copy.process.title }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-[36rem] text-[15px] leading-[1.65] text-white/50 sm:mt-5 sm:text-[16px]", children: isRu ? "От первой встречи до запуска — понятный путь без сюрпризов." : "From the first brief to launch — a clear path without surprises." })
        ] }) }),
        /* @__PURE__ */ jsxs("ol", { className: "relative mx-auto mt-12 max-w-[52rem] list-none sm:mt-14 lg:mt-16", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "pointer-events-none absolute bottom-6 left-[18px] top-6 w-[2px] sm:left-[23px]",
              style: {
                background: "linear-gradient(180deg, #ff6b2c 0%, rgba(255,107,44,0.35) 28%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.04) 100%)"
              },
              "aria-hidden": true
            }
          ),
          steps.map((step, index) => {
            const detail = stepDetail(step);
            const isLast = index === steps.length - 1;
            return /* @__PURE__ */ jsx("li", { className: isLast ? "relative" : "relative pb-10 sm:pb-12", children: /* @__PURE__ */ jsx(Reveal$1, { delay: Math.min(index * 70, 280), children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "relative z-[1] flex w-9 shrink-0 flex-col items-center sm:w-12", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: "grid h-9 w-9 place-items-center rounded-full bg-[#ff6b2c] font-hero text-[13px] font-bold tabular-nums text-white shadow-[0_0_0_6px_rgba(255,107,44,0.16)] sm:h-12 sm:w-12 sm:text-[15px]",
                  "aria-hidden": true,
                  children: index + 1
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 pt-1 sm:pt-2", children: [
                /* @__PURE__ */ jsx("p", { className: "font-hero text-[clamp(1.15rem,2.4vw,1.45rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-white", children: step.title }),
                detail ? /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-[40rem] text-[14px] leading-[1.55] text-white/45 sm:mt-2.5 sm:text-[15px] sm:leading-[1.6]", children: detail }) : null
              ] })
            ] }) }) }, step.title);
          })
        ] })
      ] })
    }
  );
}
const LOGO$1 = "/images/tivonix-logo-white.webp";
const LOGO_COLORS = ["#ffffff", "#FF9A3D", "#FF5C00"];
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  };
}
function mixColors(progress) {
  const n = LOGO_COLORS.length - 1;
  const scaled = Math.min(1, Math.max(0, progress)) * n;
  const i = Math.min(n - 1, Math.floor(scaled));
  const t = scaled - i;
  const a = hexToRgb(LOGO_COLORS[i]);
  const b = hexToRgb(LOGO_COLORS[i + 1]);
  return `rgb(${Math.round(a.r + (b.r - a.r) * t)}, ${Math.round(a.g + (b.g - a.g) * t)}, ${Math.round(a.b + (b.b - a.b) * t)})`;
}
function splitWords$1(text) {
  return text.split(/(\s+)/).filter(Boolean);
}
function FounderSection() {
  const { lang } = useLang();
  const about = aboutCopy(lang);
  const team = homeExtraCopy(lang).team;
  const sectionRef = useRef(null);
  const storyRef = useRef(null);
  const logoRef = useRef(null);
  const storyText = about.story.paragraphs.join(" ");
  const words = useMemo(() => splitWords$1(storyText), [storyText]);
  useEffect(() => {
    const section = sectionRef.current;
    const story = storyRef.current;
    const logo = logoRef.current;
    if (!section || !story || typeof window === "undefined") return;
    const wordEls = Array.from(story.querySelectorAll(".landing-story__word"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      wordEls.forEach((w) => {
        w.style.setProperty("--w", "1");
      });
      if (logo) logo.style.backgroundColor = mixColors(0.5);
      return;
    }
    let active = false;
    let raf = 0;
    let lastLogo = -1;
    const update = () => {
      raf = 0;
      if (!active) return;
      const vh = getStableViewportHeight();
      const sRect = section.getBoundingClientRect();
      const raw = Math.min(1, Math.max(0, (vh * 0.75 - sRect.top) / (sRect.height + vh * 0.35)));
      const logoKey = Math.round(raw * 40);
      if (logo && logoKey !== lastLogo) {
        lastLogo = logoKey;
        logo.style.backgroundColor = mixColors(raw);
      }
      const whiteLine = vh * 0.62;
      const grayLine = vh * 0.98;
      const span = grayLine - whiteLine || 1;
      for (let i = 0; i < wordEls.length; i++) {
        const y = wordEls[i].getBoundingClientRect().top + wordEls[i].offsetHeight * 0.35;
        const t = Math.min(1, Math.max(0, (grayLine - y) / span));
        wordEls[i].style.setProperty("--w", (Math.round(t * 25) / 25).toFixed(2));
      }
    };
    const schedule = () => {
      if (raf || !active) return;
      raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) schedule();
      },
      { root: null, rootMargin: "15% 0px", threshold: 0 }
    );
    io.observe(section);
    active = true;
    schedule();
    requestAnimationFrame(() => schedule());
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      active = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [words]);
  return /* @__PURE__ */ jsx(
    Section,
    {
      ref: sectionRef,
      id: "about",
      className: "landing-story-section scroll-mt-[var(--tivonix-header-spacer)] !py-16 sm:!py-24",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[42rem] text-center", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: lang === "en" ? "/en" : "/",
              className: "mb-8 inline-flex justify-center sm:mb-10",
              "aria-label": "TIVONIX",
              children: /* @__PURE__ */ jsx(
                "span",
                {
                  ref: logoRef,
                  className: "landing-story-section__logo",
                  role: "img",
                  "aria-label": "TIVONIX",
                  style: {
                    backgroundColor: LOGO_COLORS[0],
                    WebkitMaskImage: `url(${LOGO$1})`,
                    maskImage: `url(${LOGO$1})`
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.85rem,5vw,3.1rem)] font-semibold uppercase leading-[1.05] tracking-[-0.04em] text-white text-balance", children: about.hero.title }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: aboutPath(lang),
              className: "group inline-flex items-center gap-1.5 rounded-full bg-[#FF9A3D] px-7 py-3.5 text-[14px] font-semibold uppercase tracking-[0.04em] text-black transition hover:bg-[#ff8a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              children: [
                team.cta,
                /* @__PURE__ */ jsx(
                  ArrowUpRight,
                  {
                    className: "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                    "aria-hidden": true
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "landing-story-section__rule mx-auto mt-12 max-w-[28rem]", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: storyRef, className: "landing-story mx-auto mt-12 w-full max-w-[68rem]", lang, children: /* @__PURE__ */ jsx("p", { className: "landing-story__p", children: words.map(
          (token, wi) => /^\s+$/.test(token) ? /* @__PURE__ */ jsx("span", { children: " " }, wi) : /* @__PURE__ */ jsx("span", { className: "landing-story__word", children: token }, wi)
        ) }) })
      ] })
    }
  );
}
const PLANS_IMG$1 = `/images/${encodeURIComponent("планы")}`;
const PLAN_PHOTOS = [1, 2, 3, 4, 5].map((n) => `${PLANS_IMG$1}/${n}.png`);
const SPEED_PX_PER_SEC = 38;
function initialsFromName(name) {
  const parts = name.replace(/[«»""]/g, "").split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
function TestimonialCard({
  project,
  photo,
  viewCase,
  ownProduct
}) {
  const t = project.testimonial;
  const showCase = isPublicProjectId(project.id);
  const isOwn = project.id === "tivonixpanel";
  const cardStyle = { "--card-photo": `url("${photo}")` };
  return /* @__PURE__ */ jsxs("article", { className: "home-testimonials__card", style: cardStyle, children: [
    /* @__PURE__ */ jsx("div", { className: "home-testimonials__card-bg", "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "home-testimonials__card-veil", "aria-hidden": true }),
    /* @__PURE__ */ jsxs("div", { className: "home-testimonials__card-body", children: [
      /* @__PURE__ */ jsx("span", { className: "home-testimonials__avatar", "aria-hidden": true, children: initialsFromName(t.name) }),
      /* @__PURE__ */ jsxs("div", { className: "home-testimonials__content", children: [
        /* @__PURE__ */ jsxs("div", { className: "home-testimonials__meta", children: [
          /* @__PURE__ */ jsx("p", { className: "home-testimonials__name", children: t.name }),
          /* @__PURE__ */ jsx("p", { className: "home-testimonials__role", children: t.role })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "home-testimonials__text", children: t.text }),
        /* @__PURE__ */ jsx("div", { className: "home-testimonials__foot", children: isOwn ? /* @__PURE__ */ jsx("span", { className: "home-testimonials__muted", children: ownProduct }) : showCase ? /* @__PURE__ */ jsxs(Link, { to: `/projects/${project.id}`, className: "home-testimonials__case", children: [
          viewCase,
          ": ",
          project.title
        ] }) : /* @__PURE__ */ jsx("span", { className: "home-testimonials__muted", children: project.title }) })
      ] })
    ] })
  ] });
}
function HomeTestimonialsSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);
  const items = projectsWithTestimonials(lang === "ru");
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const [holding, setHolding] = useState(false);
  const holdingRef = useRef(false);
  const inViewRef = useRef(true);
  const reducedRef = useRef(false);
  useEffect(() => {
    holdingRef.current = holding;
  }, [holding]);
  useEffect(() => {
    const scroller = marqueeRef.current;
    const track = trackRef.current;
    if (!scroller || !track || typeof window === "undefined") return;
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;
    let raf = 0;
    let lastTs = 0;
    let halfWidth = 0;
    const measure = () => {
      halfWidth = track.scrollWidth / 2;
    };
    const loop = (ts) => {
      raf = requestAnimationFrame(loop);
      if (!lastTs) lastTs = ts;
      const dt = Math.min(0.05, (ts - lastTs) / 1e3);
      lastTs = ts;
      if (holdingRef.current || !inViewRef.current) return;
      if (halfWidth <= 0) measure();
      if (halfWidth <= 0) return;
      scroller.scrollLeft += SPEED_PX_PER_SEC * dt;
      if (scroller.scrollLeft >= halfWidth) {
        scroller.scrollLeft -= halfWidth;
      }
    };
    measure();
    raf = requestAnimationFrame(loop);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(track);
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(scroller);
    const onScroll = () => {
      if (halfWidth <= 0) return;
      if (scroller.scrollLeft >= halfWidth) {
        scroller.scrollLeft -= halfWidth;
      } else if (scroller.scrollLeft <= 0) {
        scroller.scrollLeft += halfWidth;
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);
  if (items.length === 0) return null;
  const sequence = [...items, ...items];
  const pause = (e) => {
    setHolding(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
    }
  };
  const resume = () => setHolding(false);
  return /* @__PURE__ */ jsxs(
    Section,
    {
      id: "testimonials",
      className: "home-testimonials scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16",
      children: [
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Reveal$1, { className: "mx-auto max-w-[36rem] text-center", children: /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white", children: copy.testimonials.title }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: marqueeRef,
            className: [
              "home-testimonials__marquee mt-10",
              holding ? "is-holding" : ""
            ].filter(Boolean).join(" "),
            "aria-label": copy.testimonials.title,
            onPointerDown: pause,
            onPointerUp: resume,
            onPointerCancel: resume,
            onLostPointerCapture: resume,
            children: /* @__PURE__ */ jsx("div", { ref: trackRef, className: "home-testimonials__track", children: sequence.map((project, i) => /* @__PURE__ */ jsx(
              TestimonialCard,
              {
                project,
                photo: PLAN_PHOTOS[i % PLAN_PHOTOS.length],
                viewCase: copy.testimonials.viewCase,
                ownProduct: copy.testimonials.ownProduct
              },
              `${project.id}-${i}`
            )) })
          }
        )
      ]
    }
  );
}
const FAQ_ITEMS = [
  {
    id: "price",
    q: { ru: "Сколько стоит разработка?", en: "How much does development cost?" },
    a: {
      ru: "Стоимость зависит от экранов, ролей, интеграций и бизнес-логики. После разбора задачи отправляем предварительный план, срок и диапазон стоимости. До старта фиксируем объём.",
      en: "Cost depends on screens, roles, integrations and business logic. After reviewing the task we send a preliminary plan, timeline and cost range. Scope is locked before we start."
    }
  },
  {
    id: "time",
    q: { ru: "Сколько занимает запуск?", en: "How long does a launch take?" },
    a: {
      ru: "Start — от 7 рабочих дней, Growth — от 2 недель, Product — от 4 недель. Срок зависит от объёма и скорости согласований.",
      en: "Start — from 7 business days, Growth — from 2 weeks, Product — from 4 weeks. Timeline depends on scope and how fast decisions are made."
    }
  },
  {
    id: "pay",
    q: { ru: "Как проходит оплата?", en: "How does payment work?" },
    a: {
      ru: "Работаем по этапам. Сначала согласуем объём и стоимость этапа, затем оплата и старт. Полный сложный SaaS не входит автоматически в базовый Product.",
      en: "We work in stages. First we agree on stage scope and cost, then payment and start. A full complex SaaS is not automatically included in the base Product plan."
    }
  },
  {
    id: "small",
    q: { ru: "Можно ли начать с небольшой версии?", en: "Can we start with a small version?" },
    a: {
      ru: "Да. Часто лучше начать с лендинга, бота, формы и уведомлений, а потом добавить CRM, кабинет или интеграции.",
      en: "Yes. Often it’s better to start with a landing page, bot, form and alerts, then add CRM, a portal or integrations."
    }
  },
  {
    id: "source",
    q: { ru: "Кто получает исходники и доступы?", en: "Who gets the source code and access?" },
    a: {
      ru: "Исходный код и доступы передаются клиенту. Условия передачи фиксируем до старта этапа.",
      en: "Source code and access are handed over to the client. Handover terms are fixed before the stage starts."
    }
  },
  {
    id: "after",
    q: { ru: "Что происходит после запуска?", en: "What happens after launch?" },
    a: {
      ru: "Проверяем ключевые сценарии, передаём инструкции. Выявленные ошибки исправляем в рамках согласованной гарантии. Дальнейшая поддержка обсуждается отдельно.",
      en: "We check key flows and hand over instructions. Issues found are fixed within the agreed warranty. Ongoing support is discussed separately."
    }
  },
  {
    id: "existing",
    q: { ru: "Работаете ли вы с существующим проектом?", en: "Do you work with an existing project?" },
    a: {
      ru: "Да. Можем доработать сайт, подключить Telegram, CRM, статусы, кабинет или автоматизацию к уже запущенному продукту.",
      en: "Yes. We can extend a site, connect Telegram, CRM, statuses, a portal or automation to a product already live."
    }
  },
  {
    id: "start",
    q: { ru: "Как начать работу?", en: "How do we start?" },
    a: {
      ru: "Опишите задачу в форме на сайте. Мы разберём её и ответим в течение рабочего дня с планом и диапазоном стоимости. Созвон не обязателен.",
      en: "Describe the task in the site form. We’ll review it and reply within a business day with a plan and cost range. A call is optional."
    }
  }
];
function FaqRow({
  item,
  open,
  onToggle,
  lang
}) {
  const panelId = useId();
  const buttonId = useId();
  const q = lang === "ru" ? item.q.ru : item.q.en;
  const a = lang === "ru" ? item.a.ru : item.a.en;
  return /* @__PURE__ */ jsxs("div", { className: `home-faq__item${open ? " is-open" : ""}`, children: [
    /* @__PURE__ */ jsx("h3", { className: "m-0", children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id: buttonId,
        "aria-expanded": open,
        "aria-controls": panelId,
        onClick: onToggle,
        className: "home-faq__trigger",
        children: [
          /* @__PURE__ */ jsx("span", { className: "home-faq__q", children: q }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: `home-faq__chevron h-5 w-5 shrink-0${open ? " is-open" : ""}`,
              strokeWidth: 2,
              "aria-hidden": true
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: panelId,
        role: "region",
        "aria-labelledby": buttonId,
        hidden: !open,
        className: "home-faq__panel",
        children: open ? /* @__PURE__ */ jsx("p", { className: "home-faq__a", children: a }) : null
      }
    )
  ] });
}
function FAQSection() {
  const { lang } = useLang();
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id ?? null);
  const title = lang === "ru" ? "Частые вопросы" : "FAQ";
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "faq",
      className: "home-faq scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16",
      children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[44rem]", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-center font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-semibold tracking-[-0.03em] text-white", children: title }),
        /* @__PURE__ */ jsx("div", { className: "home-faq__list mt-8 sm:mt-10", children: FAQ_ITEMS.map((item) => /* @__PURE__ */ jsx(
          FaqRow,
          {
            item,
            lang,
            open: openId === item.id,
            onToggle: () => setOpenId((prev) => prev === item.id ? null : item.id)
          },
          item.id
        )) })
      ] }) })
    }
  );
}
function cx$7(...a) {
  return a.filter(Boolean).join(" ");
}
function TelegramLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href = TG_BOT_URL,
  onClick
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: ctaClass(variant, size, className),
      onClick,
      children
    }
  );
}
function ctaClass(variant, size, className) {
  const isSquare = variant === "plain";
  return cx$7(
    "inline-flex items-center justify-center font-sans font-medium tracking-normal transition duration-200",
    isSquare ? "rounded-none shadow-none" : "rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "active:scale-[0.98]",
    size === "lg" ? "h-12 px-8 text-[15px] sm:h-[52px] sm:px-9 sm:text-[16px]" : "h-11 px-7 text-[14px] sm:px-8",
    (variant === "primary" || variant === "cream") && "tivonix-cta-primary",
    variant === "secondary" && "tivonix-cta-secondary",
    variant === "ghost" && "text-white/75 hover:text-white",
    variant === "plain" && "border-0 bg-transparent font-medium text-white/88 hover:bg-white/[0.04] hover:text-white",
    variant === "white" && "border-0 bg-white font-medium text-[#070607] shadow-none hover:bg-white/92",
    className
  );
}
const FINAL_CTA_VIDEO = "/images/hero-bg.mp4";
const FINAL_CTA_POSTER = "/images/hero-bg-poster.webp";
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
    let lastScale = 1.05;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = getStableViewportHeight();
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const progress = clamp01(scrolled / total);
      const next = 1.08 + progress * 0.44;
      if (Math.abs(next - lastScale) < 4e-3) return;
      lastScale = next;
      setScale(next);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [sectionRef]);
  return scale;
}
function FinalCTASection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const bgScale = useSectionScrollScale(cardRef);
  const bgStyle = {
    transform: `translate3d(-50%, -50%, 0) scale(${bgScale})`
  };
  useKeepVideoPlaying(videoRef);
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "contact",
      className: "final-cta-section scroll-mt-[var(--tivonix-header-spacer)] py-14 sm:py-16 lg:py-20",
      children: /* @__PURE__ */ jsx(Container, { className: "pb-2 sm:pb-4 lg:pb-6", children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: cardRef,
          className: "final-cta-card relative overflow-hidden rounded-[28px] px-6 py-12 text-center sm:rounded-[40px] sm:px-10 sm:py-14 lg:px-16 lg:py-16",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "final-cta-card__bg", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx(
                "video",
                {
                  ref: videoRef,
                  className: "final-cta-card__bg-img pointer-events-none",
                  style: bgStyle,
                  src: FINAL_CTA_VIDEO,
                  poster: FINAL_CTA_POSTER,
                  autoPlay: true,
                  muted: true,
                  loop: true,
                  playsInline: true,
                  preload: "auto",
                  controls: false,
                  disablePictureInPicture: true
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "final-cta-card__bg-overlay" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "relative z-[1] mx-auto max-w-[22ch] font-hero text-[clamp(1.75rem,4.5vw,2.85rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance", children: copy.finalCta.title }),
            /* @__PURE__ */ jsx("p", { className: "relative z-[1] mx-auto mt-4 max-w-[36rem] font-sans text-[15px] font-medium leading-[1.55] text-white/78 sm:text-[16px]", children: copy.finalCta.subtitle }),
            /* @__PURE__ */ jsxs("div", { className: "final-cta-card__actions relative z-[1] mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-3", children: [
              /* @__PURE__ */ jsx(
                LeadCTAButton,
                {
                  source: "final_cta",
                  variant: "white",
                  size: "lg",
                  className: "final-cta-btn",
                  children: copy.finalCta.ctaPrimary
                }
              ),
              /* @__PURE__ */ jsx(
                TelegramLink,
                {
                  variant: "white",
                  size: "lg",
                  href: TG_CHANNEL_URL,
                  className: "final-cta-btn final-cta-btn--black",
                  onClick: () => trackTelegramDirectClick(),
                  children: copy.finalCta.ctaSecondary
                }
              )
            ] })
          ]
        }
      ) })
    }
  );
}
function cx$6(...a) {
  return a.filter(Boolean).join(" ");
}
const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.webp";
const FOOTER_BG = `/images/${encodeURI("как рабоает")}/${encodeURI("футер.webp")}`;
const SELL_IMG = "/images/footer-sell.webp";
const FOOTER_PAGES = [
  { to: "/", label: { ru: "Главная", en: "Home" } },
  { to: "/plans", label: { ru: "Тарифы", en: "Pricing" } },
  { to: "/about", label: { ru: "О компании", en: "About" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } }
];
const FOOTER_SERVICES = [
  { to: "/sozdanie-sajtov", label: { ru: "Создание сайтов", en: "Website development" } },
  { to: "/avtomatizaciya-biznesa", label: { ru: "Автоматизация", en: "Automation" } },
  { to: "/#ai", label: { ru: "AI в продуктах", en: "AI in products" } },
  { to: "/#process", label: { ru: "Как мы работаем", en: "How we work" } }
];
const FOOTER_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;
const FOOTER_CONNECT = [
  { href: TG_CHANNEL_URL, label: "Telegram", kind: "tg" },
  { href: "https://www.instagram.com/tivonix.tech/", label: "Instagram", kind: "ig" },
  { href: FOOTER_GMAIL_URL, label: "Gmail", kind: "mail" }
];
const DOCS = {
  ru: [
    {
      href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
      label: "Политика обработки ПД",
      aria: "Политика обработки и защиты персональных данных (PDF)"
    },
    {
      href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
      label: "Согласие на обработку ПД",
      aria: "Согласие на обработку персональных данных (PDF)"
    }
  ],
  en: [
    {
      href: "/doc/Privacy_Policy_Tivonix_EN.pdf",
      label: "Privacy Policy",
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
  "aria-label": ariaLabel,
  className
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
      className: cx$6("site-footer__link", className),
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
  children,
  className
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      className: cx$6("site-footer__social-link", className),
      children
    }
  );
}
function IconTelegram({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M21.2 3.4c.55-.22 1.1.3.95.86L19.05 19.4c-.14.55-.72.82-1.2.52l-4.35-2.7-2.35 2.25c-.4.38-1.05.14-1.15-.4l-.55-4.55 9.05-8.15c.18-.16-.04-.42-.25-.3L6.9 13.05l-4.35-1.35c-.58-.18-.58-1 .02-1.15L21.2 3.4Z" }) });
}
function IconInstagram$1({ className }) {
  return /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx("path", { d: "M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.7a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Z" }),
    /* @__PURE__ */ jsx("circle", { cx: "17.35", cy: "6.7", r: "1.15" }),
    /* @__PURE__ */ jsx("path", { d: "M16.7 2H7.3A5.3 5.3 0 0 0 2 7.3v9.4A5.3 5.3 0 0 0 7.3 22h9.4A5.3 5.3 0 0 0 22 16.7V7.3A5.3 5.3 0 0 0 16.7 2Zm3.4 14.7a3.45 3.45 0 0 1-3.4 3.4H7.3a3.45 3.45 0 0 1-3.4-3.4V7.3A3.45 3.45 0 0 1 7.3 3.9h9.4a3.45 3.45 0 0 1 3.4 3.4v9.4Z" })
  ] });
}
function IconMail$1({ className }) {
  return /* @__PURE__ */ jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M20.2 4.5H3.8A2.3 2.3 0 0 0 1.5 6.8v10.4a2.3 2.3 0 0 0 2.3 2.3h16.4a2.3 2.3 0 0 0 2.3-2.3V6.8a2.3 2.3 0 0 0-2.3-2.3Zm.4 2.55v.2l-8.05 5.35a.95.95 0 0 1-1.1 0L3.4 7.25v-.2c0-.22.18-.4.4-.4h16.4c.22 0 .4.18.4.4Zm0 10.15c0 .22-.18.4-.4.4H3.8a.4.4 0 0 1-.4-.4V9.2l7.45 4.95a2.85 2.85 0 0 0 3.3 0L20.6 9.2v8Z" }) });
}
function Footer() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const sellRef = useRef(null);
  const sellWordRef = useRef(null);
  const t = (v) => isRu ? v.ru : v.en;
  useEffect(() => {
    const sell = sellRef.current;
    const word = sellWordRef.current;
    if (!sell || !word) return;
    const fit = () => {
      const total = sell.clientWidth;
      if (total < 64) return;
      const maxWidth = total * 0.94;
      word.style.width = "auto";
      word.style.transform = "none";
      word.style.letterSpacing = "-0.02em";
      let lo = 20;
      let hi = Math.min(480, maxWidth * 0.52);
      for (let i = 0; i < 20; i += 1) {
        const mid = (lo + hi) / 2;
        word.style.fontSize = `${mid}px`;
        if (word.scrollWidth <= maxWidth) lo = mid;
        else hi = mid;
      }
      word.style.fontSize = `${lo * 0.97}px`;
    };
    const ro = new ResizeObserver(fit);
    ro.observe(sell);
    fit();
    void document.fonts?.ready?.then(fit);
    return () => ro.disconnect();
  }, []);
  const docs = isRu ? DOCS.ru : DOCS.en;
  const projects = buildProjects(isRu).slice(0, 5);
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx(
    "footer",
    {
      id: "site-footer",
      className: "site-footer font-sans text-white antialiased selection:bg-[color:var(--accent)]/25",
      children: /* @__PURE__ */ jsx(Container, { className: "site-footer__shell", children: /* @__PURE__ */ jsxs("div", { className: "site-footer__panel", children: [
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
        /* @__PURE__ */ jsxs("div", { className: "site-footer__content", children: [
          /* @__PURE__ */ jsxs("div", { className: "site-footer__main", children: [
            /* @__PURE__ */ jsxs("aside", { className: "site-footer__touch", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/",
                  className: "site-footer__logo focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg",
                  "aria-label": isRu ? "На главную" : "Home",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: LOGO_LOCKUP_PNG,
                      onError: imgFallback(LOGO_LOCKUP_PNG),
                      alt: "Tivonix",
                      className: "block h-8 w-auto sm:h-9",
                      draggable: false,
                      loading: "lazy",
                      decoding: "async"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("h2", { className: "site-footer__touch-title", children: isRu ? "Связаться" : "Get in touch" }),
              /* @__PURE__ */ jsx("p", { className: "site-footer__touch-lead", children: isRu ? "Ваш техпартнёр по сайтам, ботам и CRM" : "Your tech partner for sites, bots and CRM" }),
              /* @__PURE__ */ jsxs("a", { href: FOOTER_GMAIL_URL, target: "_blank", rel: "noopener noreferrer", className: "site-footer__touch-row", children: [
                /* @__PURE__ */ jsx(Mail, { className: "site-footer__touch-row-icon", strokeWidth: 2, "aria-hidden": true }),
                /* @__PURE__ */ jsx("span", { children: CONTACT_EMAIL })
              ] }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: TG_CHANNEL_URL,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "site-footer__touch-row",
                  children: [
                    /* @__PURE__ */ jsx(IconTelegram, { className: "site-footer__touch-row-icon" }),
                    /* @__PURE__ */ jsx("span", { children: "Telegram" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "site-footer__actions", children: /* @__PURE__ */ jsx(LeadCTAButton, { source: "footer", variant: "primary", className: "site-footer__action-btn", children: isRu ? "Обсудить проект" : "Discuss a project" }) }),
              /* @__PURE__ */ jsx(
                "nav",
                {
                  className: "site-footer__social",
                  "aria-label": isRu ? "Соцсети и почта" : "Social and email",
                  children: FOOTER_CONNECT.map((item) => /* @__PURE__ */ jsx(
                    SocialIconLink,
                    {
                      href: item.href,
                      label: item.label,
                      className: `site-footer__social-link--${item.kind}`,
                      children: item.kind === "tg" ? /* @__PURE__ */ jsx(IconTelegram, { className: "site-footer__social-icon" }) : item.kind === "ig" ? /* @__PURE__ */ jsx(IconInstagram$1, { className: "site-footer__social-icon" }) : /* @__PURE__ */ jsx(IconMail$1, { className: "site-footer__social-icon" })
                    },
                    item.href
                  ))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "site-footer__grid", children: [
              /* @__PURE__ */ jsx(ColNav, { id: "footer-pages", title: isRu ? "Компания" : "Company", children: FOOTER_PAGES.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: i.to, children: t(i.label) }) }, i.to)) }),
              /* @__PURE__ */ jsx(ColNav, { id: "footer-services", title: isRu ? "Услуги" : "Services", children: FOOTER_SERVICES.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: i.to, children: t(i.label) }) }, i.to)) }),
              /* @__PURE__ */ jsxs(ColNav, { id: "footer-work", title: isRu ? "Кейсы" : "Cases", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: "/projects", children: isRu ? "Все проекты" : "All projects" }) }),
                projects.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: `/projects/${p.id}`, children: p.title }) }, p.id))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "site-footer__bottom", children: [
            /* @__PURE__ */ jsx("div", { className: "site-footer__bottom-start", children: /* @__PURE__ */ jsxs("p", { className: "site-footer__copy", children: [
              "TIVONIX © ",
              year,
              /* @__PURE__ */ jsx("span", { className: "site-footer__copy-sep", "aria-hidden": true, children: "|" }),
              isRu ? "Все права защищены" : "All rights reserved"
            ] }) }),
            /* @__PURE__ */ jsx("nav", { className: "site-footer__legal-nav", "aria-label": isRu ? "Документы" : "Legal", children: docs.map((d) => /* @__PURE__ */ jsx(ExternalLink, { href: d.href, newTab: true, "aria-label": d.aria, children: d.label }, d.href)) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: sellRef,
              className: "site-footer__sell",
              style: {
                ["--footer-sell-img"]: `url(${JSON.stringify(SELL_IMG)})`
              },
              children: [
                /* @__PURE__ */ jsx("p", { className: "site-footer__sell-kicker", children: isRu ? "Ваш техпартнёр" : "Your tech partner" }),
                /* @__PURE__ */ jsx("p", { className: "site-footer__sell-word", ref: sellWordRef, "aria-label": "TIVONIX", children: "tivonix" })
              ]
            }
          )
        ] })
      ] }) })
    }
  );
}
function JsonLd({ data }) {
  return /* @__PURE__ */ jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
    }
  );
}
const CANONICAL_ORIGIN$1 = "https://tivonix.tech";
const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN$1}/images/og-social.jpg`;
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
  const canonicalUrl = canonicalPath.startsWith("http") ? canonicalPath : `${CANONICAL_ORIGIN$1}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;
  const ogLocaleAlt = ogLocalePrimary === "ru_RU" ? "en_US" : "ru_RU";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
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
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:image:type",
          content: ogImage.endsWith(".webp") ? "image/webp" : ogImage.endsWith(".png") ? "image/png" : "image/jpeg"
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: OG_IMAGE_ALT }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: OG_IMAGE_ALT })
    ] }),
    schemaJsonLd != null ? /* @__PURE__ */ jsx(JsonLd, { data: schemaJsonLd }) : null
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
        image: "https://tivonix.tech/images/ceo.png",
        description: pageDescription,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "tivoonix@gmail.com",
            availableLanguage: ["ru", "en"]
          }
        ],
        sameAs: ["https://t.me/TIVONIX"],
        founder: { "@id": "https://tivonix.tech/#danila-titovets" }
      },
      {
        "@type": "Person",
        "@id": "https://tivonix.tech/#danila-titovets",
        name: "Данила Титовец",
        alternateName: "Danila Titovets",
        jobTitle: "Founder & Full-stack developer",
        worksFor: { "@id": "https://tivonix.tech/#org" },
        address: {
          "@type": "PostalAddress",
          addressCountry: "BY"
        },
        url: "https://tivonix.tech/",
        sameAs: ["https://t.me/TIVONIX"],
        email: "tivoonix@gmail.com",
        image: "https://tivonix.tech/images/ceo.png"
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://tivonix.tech/#service",
        name: "TIVONIX",
        url: "https://tivonix.tech/",
        description: pageDescription,
        provider: { "@id": "https://tivonix.tech/#danila-titovets" },
        areaServed: "Worldwide",
        email: "tivoonix@gmail.com"
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
function buildProjectCaseSchema({
  id,
  title,
  description,
  coverUrl,
  domain,
  tags,
  stack,
  lang,
  dateModified
}) {
  const pageUrl = `https://tivonix.tech/projects/${id}`;
  const inLanguage = lang === "ru" ? "ru" : "en";
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
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "ru" ? "Главная" : "Home",
            item: "https://tivonix.tech/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "ru" ? "Проекты" : "Projects",
            item: "https://tivonix.tech/projects"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: pageUrl
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${title} — ${lang === "ru" ? "кейс TIVONIX" : "TIVONIX case study"}`,
        description,
        isPartOf: { "@id": "https://tivonix.tech/#website" },
        about: { "@id": `${pageUrl}#creativework` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        inLanguage,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: coverUrl
        }
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#creativework`,
        name: title,
        description,
        url: pageUrl,
        image: coverUrl,
        creator: { "@id": "https://tivonix.tech/#org" },
        publisher: { "@id": "https://tivonix.tech/#org" },
        inLanguage,
        keywords: [...tags, ...stack ?? []].join(", "),
        ...domain ? { sameAs: [domain] } : {},
        ...dateModified ? { dateModified } : {}
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
  const { pathname } = useLocation();
  const seo = homePageSeoFromDict(dict);
  const isEnPath = pathname === "/en" || pathname.startsWith("/en/");
  const canonicalPath = isEnPath ? "/en" : "/";
  const schemaJsonLd = buildHomePageSchema({
    pageTitle: seo.title,
    pageDescription: seo.description
  });
  return /* @__PURE__ */ jsxs("div", { className: "landing-caldera min-h-screen overflow-x-clip bg-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: seo.title,
        description: seo.description,
        canonicalPath,
        schemaJsonLd,
        ogLocalePrimary: lang === "en" ? "en_US" : "ru_RU",
        hreflang: true
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "top" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("div", { id: "hero", children: /* @__PURE__ */ jsx(Hero, {}) }),
      /* @__PURE__ */ jsx(FeaturedProjectsSection, {}),
      /* @__PURE__ */ jsx(LandingPainSection, {}),
      /* @__PURE__ */ jsx(MainOfferSection, {}),
      /* @__PURE__ */ jsx(AiPremiumSection, {}),
      /* @__PURE__ */ jsx(ComparisonSection, {}),
      /* @__PURE__ */ jsx(HomePricingSection, {}),
      /* @__PURE__ */ jsx(ProcessTimelineSection, {}),
      /* @__PURE__ */ jsx(FounderSection, {}),
      /* @__PURE__ */ jsx(HomeTestimonialsSection, {}),
      /* @__PURE__ */ jsx(FAQSection, {})
    ] }),
    /* @__PURE__ */ jsx(FinalCTASection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG = "/images/hero.webp";
function cx$5(...a) {
  return a.filter(Boolean).join(" ");
}
const s$1 = (v) => v;
function projectPreviewSrc(p) {
  return p.cover ?? HERO_IMG;
}
const PREVIEW_SPECS = {
  card: { maxH: 240, aspect: 16 / 9 },
  detail: { maxH: 360, aspect: 16 / 9 },
  thumb: { maxH: 200, aspect: 16 / 9 },
  grid: { maxH: 9999, aspect: 16 / 9, fullWidth: true }
};
const ZOOM_STEPS = [1, 1.5, 2.25];
function ProjectPreviewFrame({
  src,
  variant = "card"
}) {
  const { maxH, aspect, fullWidth } = PREVIEW_SPECS[variant];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$5(
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
          className: "absolute inset-0 block h-full w-full object-cover object-top",
          draggable: false,
          loading: "lazy",
          decoding: "async"
        }
      )
    }
  );
}
function GalleryLightbox({
  images,
  index,
  isRu,
  onClose,
  onIndexChange
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(0);
  const stageRef = useRef(null);
  const closeLabel = isRu ? "Закрыть" : "Close";
  const prevLabel = isRu ? "Предыдущий" : "Previous";
  const nextLabel = isRu ? "Следующий" : "Next";
  const zoom = ZOOM_STEPS[zoomIdx] ?? 1;
  const src = images[index];
  const multi = images.length > 1;
  useEffect(() => {
    setMounted(true);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);
  useEffect(() => {
    setZoomIdx(0);
    stageRef.current?.scrollTo({ left: 0, top: 0 });
  }, [index]);
  const requestClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(onClose, 180);
  }, [onClose]);
  const go = useCallback(
    (delta) => {
      if (!multi) return;
      const next = (index + delta + images.length) % images.length;
      onIndexChange(next);
    },
    [images.length, index, multi, onIndexChange]
  );
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "+" || e.key === "=") setZoomIdx((z) => Math.min(z + 1, ZOOM_STEPS.length - 1));
      if (e.key === "-" || e.key === "_") setZoomIdx((z) => Math.max(z - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, requestClose]);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cx$5(
          "fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6",
          "transition-opacity duration-200",
          visible ? "opacity-100" : "opacity-0"
        ),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": isRu ? "Просмотр скриншота" : "Screenshot viewer",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "absolute inset-0 bg-black",
              "aria-label": closeLabel,
              onClick: requestClose
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cx$5(
                "relative z-[1] flex max-h-[min(92dvh,920px)] w-full max-w-[min(96vw,1120px)] flex-col",
                "transition-transform duration-200",
                visible ? "scale-100" : "scale-[0.97]"
              ),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between gap-3 px-0.5", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[12px] font-medium tabular-nums text-white/40", children: [
                    index + 1,
                    " / ",
                    images.length
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "grid h-9 w-9 place-items-center rounded-full text-white/45 transition hover:bg-white/[0.06] hover:text-white/75",
                      "aria-label": closeLabel,
                      onClick: requestClose,
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative min-h-0 flex-1", children: [
                  multi ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute left-0 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/35 transition hover:bg-white/[0.06] hover:text-white/70 sm:grid",
                        "aria-label": prevLabel,
                        onClick: () => go(-1),
                        children: "‹"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        className: "absolute right-0 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/35 transition hover:bg-white/[0.06] hover:text-white/70 sm:grid",
                        "aria-label": nextLabel,
                        onClick: () => go(1),
                        children: "›"
                      }
                    )
                  ] }) : null,
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      ref: stageRef,
                      className: cx$5(
                        "max-h-[min(84dvh,860px)] overflow-auto rounded-2xl bg-black",
                        "overscroll-contain",
                        zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
                      ),
                      onDoubleClick: () => setZoomIdx((z) => z >= ZOOM_STEPS.length - 1 ? 0 : Math.min(z + 1, ZOOM_STEPS.length - 1)),
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "grid place-items-center p-0 sm:p-1",
                          style: {
                            width: `${zoom * 100}%`,
                            minHeight: zoom > 1 ? void 0 : "min(84dvh, 860px)",
                            minWidth: "100%"
                          },
                          children: /* @__PURE__ */ jsx(
                            "img",
                            {
                              src,
                              alt: "",
                              className: "block h-auto max-w-full select-none rounded-xl object-contain",
                              style: {
                                maxHeight: zoom === 1 ? "min(80dvh, 820px)" : "none",
                                width: zoom === 1 ? "auto" : `${100 / zoom}%`
                              },
                              draggable: false,
                              decoding: "async"
                            }
                          )
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-[11px] text-white/25", children: isRu ? "Двойной клик — увеличить · Esc — закрыть · ← → листать" : "Double-click to zoom · Esc to close · ← → to browse" })
              ]
            }
          )
        ]
      }
    ),
    document.body
  );
}
function ProjectGalleryStrip({
  images,
  isRu
}) {
  const [active, setActive] = useState(null);
  if (!images.length) return null;
  const label = isRu ? "Скриншоты проекта" : "Project screenshots";
  const openLabel = isRu ? "Открыть скриншот" : "Open screenshot";
  return /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
    /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38", children: label }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cx$5(
          "flex gap-3 overflow-x-auto pb-1",
          "snap-x snap-mandatory scroll-smooth",
          "no-scrollbar"
        ),
        role: "list",
        "aria-label": label,
        children: images.map((src, i) => /* @__PURE__ */ jsx("div", { role: "listitem", className: "shrink-0 snap-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "group block cursor-zoom-in rounded-2xl outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/35",
            "aria-label": `${openLabel} ${i + 1}`,
            onClick: () => setActive(i),
            children: /* @__PURE__ */ jsx(ProjectPreviewFrame, { src, variant: "thumb" })
          }
        ) }, src))
      }
    ),
    active !== null ? /* @__PURE__ */ jsx(
      GalleryLightbox,
      {
        images,
        index: active,
        isRu,
        onClose: () => setActive(null),
        onIndexChange: setActive
      }
    ) : null
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
const filterPillClass = (active) => cx$5(
  "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-[13px] font-medium transition",
  active ? "bg-[#3a3a3d] text-white" : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92"
);
function ProjectGridCard({ p, isRu }) {
  const wip = p.status === "wip";
  const domainClean = p.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const productType = p.tags[0] ?? (isRu ? "Проект" : "Project");
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const role = isRu ? "Роль TIVONIX: дизайн и разработка" : "TIVONIX role: design & development";
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
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium uppercase tracking-[0.12em] text-white/40", children: productType }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: `/projects/${p.id}`,
            className: "block min-w-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45",
            children: /* @__PURE__ */ jsx("h2", { className: "mt-1 truncate font-sans text-[15px] font-medium tracking-normal text-white/[0.92] transition group-hover:text-white", children: p.title })
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-white/52", children: subtitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[11.5px] text-white/38", children: role }),
        p.stack?.length ? /* @__PURE__ */ jsx("p", { className: "mt-1.5 truncate text-[11px] text-white/35", children: (p.stack ?? []).slice(0, 4).join(" · ") }) : null,
        domainClean && !wip ? /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-[12px] text-white/40", children: domainClean }) : /* @__PURE__ */ jsx("p", { className: "mt-1 text-[12px] text-white/40", children: isRu ? "В разработке" : "In progress" })
      ] }),
      wip ? /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-[#1c1c1f] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white/48", children: "WIP" }) : p.domain ? /* @__PURE__ */ jsx(
        "a",
        {
          href: p.domain,
          target: "_blank",
          rel: "noopener noreferrer",
          className: cx$5(
            "shrink-0 inline-flex items-center gap-1 rounded-full",
            "bg-[#1c1c1f] px-2.5 py-1 text-[11px] font-medium text-white/58",
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
  const { pathname } = useLocation();
  const isRu = lang === "ru";
  const isEnPath = pathname.startsWith("/en");
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const leadCopy = leadFormCopy(lang);
  useEffect(() => {
    trackProjectView("list");
  }, []);
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
        canonicalPath: isEnPath ? "/en/projects" : "/projects",
        ogLocalePrimary: isRu ? "ru_RU" : "en_US",
        hreflang: true
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Section, { className: "projects-page scroll-mt-[var(--tivonix-header-spacer)] !pb-20 !pt-[calc(var(--tivonix-header-spacer)+1.75rem)] sm:!pt-[calc(var(--tivonix-header-spacer)+2.25rem)]", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-[1180px]", children: [
      /* @__PURE__ */ jsx("header", { className: "mx-auto max-w-[720px] text-center", children: /* @__PURE__ */ jsx("h1", { className: "font-hero text-[clamp(1.85rem,4.5vw,2.75rem)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-white", children: heroTitle }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx$5(
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
      /* @__PURE__ */ jsx("div", { className: "mt-16 flex flex-col items-center gap-3 text-center", children: /* @__PURE__ */ jsx(LeadCTAButton, { source: "projects", variant: "white", size: "lg", children: leadCopy.ctaProjects }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const PROJECT_CASE_SYSTEM = {
  tivonixpanel: {
    moodRu: "Партнёрский кабинет без хаоса в чатах",
    moodEn: "Partner cabinet without chat chaos",
    storyRu: "Партнёрство сыпется не на оффере — на слепых зонах: где заявка, какой этап, когда выплата. Пока правда в Telegram и Excel — каждый день начинается с «напомни». Мы собрали кабинет, в который заходят сами: статусы, проекты и выплаты на тёмном canvas с одним оранжевым акцентом.",
    storyEn: "Partnerships don’t die on the offer — they die on blind spots: where’s the request, what stage, when’s the payout. While truth lives in chats and spreadsheets, every day starts with “remind me”. We built a cabinet people actually open: statuses, projects and payouts on a dark canvas with one orange accent.",
    logo: "/images/project-logos/tivonixpanel.png",
    palette: [
      {
        name: "Signal Orange",
        hex: "#FF6B2C",
        group: "brand",
        roleRu: "Единственный акцент: кнопки, статусы «в работе», ключевые CTA и точки внимания в кабинете.",
        roleEn: "The only accent: filled buttons, in-progress statuses, primary CTAs and focus moments in the cabinet."
      },
      {
        name: "Void Canvas",
        hex: "#0a0a0b",
        group: "neutral",
        roleRu: "Основной фон страницы, hero-оверлей и «чёрное поле» вокруг панелей.",
        roleEn: "Dominant page background, hero overlay and the black field around panels."
      },
      {
        name: "Graphite Card",
        hex: "#1c1c1f",
        group: "neutral",
        roleRu: "Поверхности карточек и секций — на шаг светлее canvas, без жёстких границ.",
        roleEn: "Card and section surfaces — one step lighter than the canvas, no hard borders."
      },
      {
        name: "Obsidian Control",
        hex: "#27272b",
        group: "neutral",
        roleRu: "Вторичные кнопки, инпуты и тихие интерактивные зоны.",
        roleEn: "Secondary buttons, inputs and quiet interactive surfaces."
      },
      {
        name: "Ash Text",
        hex: "#8a8a8e",
        group: "neutral",
        roleRu: "Вторичный текст, подписи к полям, вспомогательные лейблы.",
        roleEn: "Muted body copy, field labels and helper text."
      },
      {
        name: "Ivory Text",
        hex: "#f2f2f2",
        group: "neutral",
        roleRu: "Заголовки, основной текст и иконки на тёмном фоне.",
        roleEn: "Headlines, primary text and icons on dark surfaces."
      },
      {
        name: "Pure White",
        hex: "#ffffff",
        group: "neutral",
        roleRu: "Текст и иконки на оранжевых primary-кнопках — максимальный контраст.",
        roleEn: "Text and icon fills on orange primary buttons for maximum contrast."
      }
    ]
  },
  spliton: {
    moodRu: "Биржа долей в музыке — полный финтех-контур",
    moodEn: "Music-share exchange — full fintech loop",
    storyRu: "Музыкальные активы — не кнопка «купить». Деньги, согласия, пополнения и статусы должны сходиться **без дыр**: подтверждение → обработка → результат. Один сбой на выплате — и доверие кончается быстрее любого релиза.\n\nSpliton — живая **биржа долей**: каталог релизов, покупка на первичном рынке, сложный вторичный рынок со стаканом и лимитными заявками, кошелёк USDT, внутренний учёт операций, KYC, центр доверия и портал оператора. Не слайд «как будет» — продукт, где интерфейс, финансы и комплаенс в одной системе.\n\nИнтерфейс полностью на **четырёх языках**: русский, английский, испанский, португальский. В платформу зашёл инвестор на [[200 000 $]]. Мы собрали продукт целиком — включая **огромную админку** под выплаты, казначейство и аналитику с графиками — и **до сих пор сопровождаем**. Acid lime `#b7f500` на чёрном фоне — как на живом spliton.io.",
    storyEn: "Music assets aren’t a buy button. Money, consents, deposits and statuses have to lock **without holes**: confirm → processing → result. One payout failure — and trust dies faster than any release.\n\nSpliton is a live **share exchange**: release catalog, primary-market purchase, a complex secondary market with an order book and limit orders, USDT wallet, internal operations ledger, KYC, trust center and operator portal. Not a “how it will look” slide — a product where interface, finance and compliance live in one system.\n\nThe interface is fully localized in **four languages**: Russian, English, Spanish, Portuguese. The platform is backed by an investor at [[$200,000]]. We shipped the full product — including a **huge admin** for payouts, treasury and analytics with charts — and **still support it**. Acid lime `#b7f500` on black — matching live spliton.io.",
    logo: "/images/project-logos/spliton.webp",
    palette: [
      {
        name: "Acid Lime",
        hex: "#b7f500",
        group: "brand",
        roleRu: "Primary Spliton: кнопки покупки, активные статусы, графики и ключевые CTA на тёмном UI.",
        roleEn: "Spliton primary: buy buttons, active statuses, sparklines and key CTAs on dark UI."
      },
      {
        name: "Void Black",
        hex: "#000000",
        group: "neutral",
        roleRu: "Основной canvas страниц доверия, кабинета и маркетинга.",
        roleEn: "Main canvas for trust pages, cabinet and marketing."
      },
      {
        name: "Ink Surface",
        hex: "#141414",
        group: "neutral",
        roleRu: "Карточки кабинета, ledger-блоки и приподнятые панели.",
        roleEn: "Cabinet cards, ledger blocks and elevated panels."
      },
      {
        name: "Control Gray",
        hex: "#161616",
        group: "neutral",
        roleRu: "Вторичные поверхности, инпуты и тихие акцентные зоны.",
        roleEn: "Secondary surfaces, inputs and quiet accent areas."
      },
      {
        name: "Muted Text",
        hex: "#7a7a7a",
        group: "neutral",
        roleRu: "Вторичные подписи, метаданные операций и helper-текст.",
        roleEn: "Secondary labels, operation metadata and helper text."
      },
      {
        name: "Ivory Signal",
        hex: "#e4e4e4",
        group: "neutral",
        roleRu: "Основной текст, суммы USDT и навигация.",
        roleEn: "Primary text, USDT amounts and navigation."
      },
      {
        name: "Ink on Lime",
        hex: "#060606",
        group: "neutral",
        roleRu: "Текст и иконки на Acid Lime кнопках — максимальный контраст.",
        roleEn: "Text and icons on Acid Lime buttons — maximum contrast."
      }
    ]
  },
  slotty: {
    moodRu: "Полный маркетплейс записи — фильтры, карта, SaaS мастера",
    moodEn: "Full booking marketplace — filters, map, master SaaS",
    storyRu: "Не «кнопка записаться». **Маркетплейс**: каталог с жёсткими фильтрами и картой, Telegram Mini App, кабинет мастера Free/Pro, platform-admin, bePaid.\n\nЗаказчик — **Виктория Д.** Бюджет — 230 000 ₽ ([[≈ 2 940 $]]). Срок — **3 недели**. React + Express + PostgreSQL, прод на **Railway**, домен **slotty.of.by** — подсказали, где купить, подняли хостинг, выкатили.\n\nСкоро запуск к **настоящим клиентам и мастерам**. Зайти и проверить можно самому: слот видно сразу, без Direct.",
    storyEn: "Not a “book now” button. A **marketplace**: filtered catalog + map, Telegram Mini App, master Free/Pro cabinet, platform admin, bePaid.\n\nClient — **Victoria D.** Budget — 230,000 ₽ ([[≈ $2,940]]). Timeline — **3 weeks**. React + Express + PostgreSQL, production on **Railway**, domain **slotty.of.by** — we advised where to buy, set up hosting, shipped live.\n\nSoon launching to **real clients and masters**. You can open it yourself: the slot is visible right away — no DMs.",
    logo: "/images/project-logos/slotty.png",
    palette: [
      {
        name: "Rose Brand",
        hex: "#F47C8C",
        group: "brand",
        roleRu: "Основной бренд Slotty: кнопки, бордеры и акценты в каталоге и записи.",
        roleEn: "Core Slotty brand: buttons, borders and accents across catalog and booking."
      },
      {
        name: "Hot Pink",
        hex: "#FF5F7A",
        group: "brand",
        roleRu: "Яркий CTA и hover: «записаться», подтверждение слота, живые акценты.",
        roleEn: "Bright CTA and hover: book, confirm a slot, live accent moments."
      },
      {
        name: "Blush Canvas",
        hex: "#FFF1F4",
        group: "neutral",
        roleRu: "Мягкий розовый фон секций лендинга и подложек карточек.",
        roleEn: "Soft pink wash for landing sections and card underlays."
      },
      {
        name: "Dusty Rose",
        hex: "#E29595",
        group: "neutral",
        roleRu: "Приглушённые бордеры и вторичные розовые обводки UI.",
        roleEn: "Muted borders and secondary rose outlines in the UI."
      },
      {
        name: "Ink",
        hex: "#111827",
        group: "neutral",
        roleRu: "Тёмный текст и чёрные CTA на светлом интерфейсе.",
        roleEn: "Dark copy and black CTAs on the light interface."
      },
      {
        name: "Mist",
        hex: "#EBEBEB",
        group: "neutral",
        roleRu: "Нейтральные поверхности, разделители и спокойные фоны.",
        roleEn: "Neutral surfaces, dividers and quiet backgrounds."
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        group: "neutral",
        roleRu: "Основной холст продукта и текст на розовых кнопках.",
        roleEn: "Primary product canvas and text on pink buttons."
      }
    ]
  },
  headmind: {
    moodRu: "Корпоративный сайт — Figma → WordPress под ключ",
    moodEn: "Corporate site — Figma → WordPress turnkey",
    storyRu: "Заказчик — **Евгений Беликов**, основатель и гендиректор ООО «Хэдмайнд». Бюджет — **100 000 ₽** ([[≈ 1 280 $]]).\n\nСначала макеты в **Figma** (несколько вариантов на выбор), потом сборка на **WordPress + Elementor**, хостинг и домен **headmind.ru**. Сайт, который спокойно шлют в первом B2B-сообщении.",
    storyEn: "Client — **Evgeniy Belikov**, founder and CEO of Headmind. Budget — **100,000 ₽** ([[≈ $1,280]]).\n\nFirst **Figma** mockups (several options), then **WordPress + Elementor**, hosting and domain **headmind.ru**. A site you can send in the first B2B message.",
    logo: "/images/project-logos/headmind.png",
    palette: [
      {
        name: "Ocean Accent",
        hex: "#0A7EA8",
        group: "brand",
        roleRu: "Брендовый акцент сайта: CTA, ссылки и фокус в маршруте к заявке.",
        roleEn: "Site brand accent: CTAs, links and focus along the lead path."
      },
      {
        name: "Deep Ocean",
        hex: "#075F7F",
        group: "brand",
        roleRu: "Hover и усиление акцента на кнопках и активных состояниях.",
        roleEn: "Hover and stronger accent on buttons and active states."
      },
      {
        name: "Slate Canvas",
        hex: "#0F172A",
        group: "neutral",
        roleRu: "Тёмный холст секций и спокойный корпоративный фон.",
        roleEn: "Dark section canvas and calm corporate background."
      },
      {
        name: "Ink",
        hex: "#111827",
        group: "neutral",
        roleRu: "Основной текст и заголовки на светлых блоках.",
        roleEn: "Primary text and headlines on light blocks."
      },
      {
        name: "Warm Graphite",
        hex: "#2E2828",
        group: "neutral",
        roleRu: "Тёмные поверхности карточек и вторичных панелей.",
        roleEn: "Dark card surfaces and secondary panels."
      },
      {
        name: "Steel Text",
        hex: "#6B7280",
        group: "neutral",
        roleRu: "Вторичный текст: роли команды и подписи к услугам.",
        roleEn: "Secondary copy: team roles and service captions."
      },
      {
        name: "Pure White",
        hex: "#FFFFFF",
        group: "neutral",
        roleRu: "Светлые секции и текст на акцентных кнопках.",
        roleEn: "Light sections and text on accent buttons."
      }
    ]
  },
  logovo: {
    moodRu: "Сеть шиномонтажа LOGOVO — сайт под ключ за 1 600 BYN",
    moodEn: "LOGOVO tire network — turnkey site for 1,600 BYN",
    storyRu: "Заказчик — **ООО «Логово»**, Минск: **4 филиала**, два **24/7**. Бюджет — **1 600 BYN** ([[≈ 42 800 ₽]] / [[≈ 560 $]]).\n\nСобрала **команда TIVONIX**: Figma → Next.js → домен и hoster.by. Светлый Awesomic-canvas, ember `#ff5a00` на CTA — запись с дороги за минуту.",
    storyEn: "Client — **LOGOVO LLC**, Minsk: **4 branches**, two **24/7**. Budget — **1,600 BYN** ([[≈ 42,800 ₽]] / [[≈ $560]]).\n\nBuilt by the **TIVONIX team**: Figma → Next.js → domain and hoster.by. Light Awesomic canvas, ember `#ff5a00` on CTAs — book from the road in a minute.",
    logo: "/images/project-logos/logovo.png",
    logoFit: "contain",
    palette: [
      {
        name: "Ember",
        hex: "#FF5A00",
        group: "brand",
        roleRu: "Главный акцент продакшена: «Записаться», бейджи 24/7 и CTA с дороги.",
        roleEn: "Production primary: Book, 24/7 badges and on-the-road CTAs."
      },
      {
        name: "Ember Hover",
        hex: "#E65200",
        group: "brand",
        roleRu: "Hover оранжевых кнопок — чуть темнее ember.",
        roleEn: "Orange button hover — a shade darker than ember."
      },
      {
        name: "Paper Canvas",
        hex: "#F4F4F5",
        group: "neutral",
        roleRu: "Светлый фон страниц Awesomic — основной холст сайта.",
        roleEn: "Light Awesomic page background — the site’s main canvas."
      },
      {
        name: "Obsidian",
        hex: "#09090B",
        group: "neutral",
        roleRu: "Тёмные CTA-блоки, футер и контрастные секции.",
        roleEn: "Dark CTA blocks, footer and contrast sections."
      },
      {
        name: "Graphite",
        hex: "#18181B",
        group: "neutral",
        roleRu: "Основной текст body на светлом canvas.",
        roleEn: "Primary body text on the light canvas."
      },
      {
        name: "Cloud",
        hex: "#ECECEE",
        group: "neutral",
        roleRu: "Карточки услуг, вторичные кнопки и мягкие панели.",
        roleEn: "Service cards, secondary buttons and soft panels."
      },
      {
        name: "Snow",
        hex: "#FFFFFF",
        group: "neutral",
        roleRu: "Белые поверхности и текст на ember-кнопках.",
        roleEn: "White surfaces and text on ember buttons."
      }
    ]
  },
  labelos: {
    moodRu: "Премиум-лендинг лейбла",
    moodEn: "Premium label landing",
    storyRu: "Короткий промо-лендинг под конверсию: типографика, ритм и ясный оффер без воды. Тёмный canvas и один violet-акцент на CTA.",
    storyEn: "A short conversion landing: type, rhythm and a clear offer without fluff. Dark canvas and one violet accent on CTAs.",
    palette: [
      {
        name: "Violet Accent",
        hex: "#8b5cf6",
        group: "brand",
        roleRu: "Акцент конверсии: primary CTA и выделенные product-моменты.",
        roleEn: "Conversion accent: primary CTAs and highlighted product moments."
      },
      {
        name: "Ink Canvas",
        hex: "#0a0a0b",
        group: "neutral",
        roleRu: "Фон промо-лендинга и тёмные секции.",
        roleEn: "Promo landing background and dark sections."
      },
      {
        name: "Panel",
        hex: "#161618",
        group: "neutral",
        roleRu: "Карточки возможностей и сценариев.",
        roleEn: "Feature and flow cards."
      },
      {
        name: "Muted Text",
        hex: "#a1a1aa",
        group: "neutral",
        roleRu: "Вторичный текст и пояснения к офферу.",
        roleEn: "Secondary copy and offer explanations."
      },
      {
        name: "Ivory Text",
        hex: "#f2f2f2",
        group: "neutral",
        roleRu: "Display-заголовки и основной UI-текст.",
        roleEn: "Display headlines and primary UI text."
      }
    ]
  },
  upc: {
    moodRu: "SaaS MVP: трек → ссылка → просмотры",
    moodEn: "SaaS MVP: track → link → views",
    storyRu: "Продуктовый интерфейс под монетизацию коротких видео: подключаешь трек, делишься ссылкой, следишь за охватом. Тёмная оболочка метрик и яркий Pulse-акцент на действие.",
    storyEn: "Product UI for short-video monetization: attach a track, share a link, track reach. Dark metrics shell and a vivid Pulse accent on action.",
    palette: [
      {
        name: "TikTok Pulse",
        hex: "#fe2c55",
        group: "brand",
        roleRu: "Энергия продукта: primary CTA и акцент на цикле монетизации.",
        roleEn: "Product energy: primary CTAs and accent on the monetization loop."
      },
      {
        name: "Void Canvas",
        hex: "#09090b",
        group: "neutral",
        roleRu: "Фон SaaS-интерфейса и тёмная оболочка метрик.",
        roleEn: "SaaS interface background and dark metrics shell."
      },
      {
        name: "Card",
        hex: "#18181b",
        group: "neutral",
        roleRu: "Карточки треков, ссылок и метрик.",
        roleEn: "Track, link and metrics cards."
      },
      {
        name: "Cyan Cue",
        hex: "#25f4ee",
        group: "neutral",
        roleRu: "Вторичный акцент рядом с Pulse — лёгкие highlights.",
        roleEn: "Secondary accent beside Pulse — light highlights."
      },
      {
        name: "Ivory Text",
        hex: "#fafafa",
        group: "neutral",
        roleRu: "Заголовки и основной текст продукта.",
        roleEn: "Titles and primary product text."
      }
    ]
  },
  payclip: {
    moodRu: "Платежи: лендинг + онбординг",
    moodEn: "Payments: landing + onboarding",
    storyRu: "Посадочная и онбординг, которые быстрее доводят до действия. Clip Blue на primary, спокойные нейтрали вокруг форм и статусов оплаты.",
    storyEn: "Landing and onboarding that move users to action faster. Clip Blue on primary, calm neutrals around forms and payment statuses.",
    palette: [
      {
        name: "Clip Blue",
        hex: "#3b82f6",
        group: "brand",
        roleRu: "Primary для онбординга и платежных действий.",
        roleEn: "Primary for onboarding and payment actions."
      },
      {
        name: "Night Canvas",
        hex: "#0a0a0c",
        group: "neutral",
        roleRu: "Фон посадочной и онбординг-экранов.",
        roleEn: "Landing and onboarding screen background."
      },
      {
        name: "Graphite Form",
        hex: "#1c1c22",
        group: "neutral",
        roleRu: "Фоны форм и вторичные поверхности.",
        roleEn: "Form backgrounds and secondary surfaces."
      },
      {
        name: "Success Mint",
        hex: "#34d399",
        group: "neutral",
        roleRu: "Успешная оплата и позитивные статусы.",
        roleEn: "Successful payment and positive statuses."
      },
      {
        name: "Ivory Text",
        hex: "#f0f0f2",
        group: "neutral",
        roleRu: "Основной текст и лейблы в онбординге.",
        roleEn: "Primary text and labels in onboarding."
      }
    ]
  }
};
function getProjectCaseSystem(id) {
  return PROJECT_CASE_SYSTEM[id];
}
const HEADER_H = 72;
const CANONICAL_ORIGIN = "https://tivonix.tech";
const BULLET_RE = /^[•\-]\s*/;
const LEAD_META_RE = /^(Формат|Срок|Format|Timeline|Продукт|Product)\s*:/i;
const BODY = "font-sans text-[16px] font-medium leading-[1.55] tracking-normal text-[#c3c3cc] sm:text-[17px]";
const H2 = "font-hero text-[clamp(1.55rem,2.8vw,2.1rem)] font-normal uppercase tracking-[0.02em] leading-[1.05] text-[#ededf3]";
function clipMetaDescription(text, max = 158) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const slice = t.slice(0, max - 1);
  const i = slice.lastIndexOf(" ");
  return `${(i > 70 ? slice.slice(0, i) : slice).trimEnd()}…`;
}
function absoluteAssetUrl(path) {
  if (path.startsWith("http")) return path;
  return `${CANONICAL_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}
function isSectionHeading(line) {
  const t = line.trim();
  if (!t || BULLET_RE.test(t) || LEAD_META_RE.test(t)) return false;
  if (t.length > 72) return false;
  if (/[.!?…]$/.test(t)) return false;
  if ((t.match(/[,;:—]/g) || []).length >= 2) return false;
  return true;
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
function RichText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g).filter(Boolean);
  return /* @__PURE__ */ jsx(Fragment, { children: parts.map((part, idx) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      return /* @__PURE__ */ jsx("span", { className: "font-[600] text-[#b7f500]", children: part.slice(2, -2) }, idx);
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsx("strong", { className: "font-[600] text-[#ededf3]", children: part.slice(2, -2) }, idx);
    }
    return /* @__PURE__ */ jsx("span", { children: part }, idx);
  }) });
}
function SpecRow({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-2 border-t border-white/[0.06] py-5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8 sm:items-start", children: [
    /* @__PURE__ */ jsx("dt", { className: "text-[13px] font-[500] tracking-normal text-[#8a8a8e]", children: label }),
    /* @__PURE__ */ jsx("dd", { className: "min-w-0 text-[15px] font-[400] leading-[1.45] tracking-normal text-[#ededf3]", children })
  ] });
}
function Pill({ children }) {
  return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-[#1c1c1f] px-3.5 py-1.5 text-[12px] font-[500] tracking-normal text-[#c3c3cc]", children });
}
function FeatureGrid({ items }) {
  return /* @__PURE__ */ jsx("ul", { className: "mt-7 grid list-none gap-3 sm:grid-cols-2 sm:gap-4", children: items.map((item, idx) => /* @__PURE__ */ jsx(
    "li",
    {
      className: "rounded-[12px] bg-[#1c1c1f] px-5 py-4 text-[15px] font-[400] leading-[1.45] text-[#c3c3cc] sm:text-[16px]",
      children: /* @__PURE__ */ jsx(RichText, { text: item })
    },
    `${idx}-${item.slice(0, 40)}`
  )) });
}
function CaseBrandIntro({
  title,
  mood,
  story,
  logo,
  logoFit = "cover",
  domain,
  domainClean,
  wip
}) {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.85rem,4vw,2.75rem)] font-normal uppercase tracking-[0.02em] leading-[1.05] text-[#ededf3]", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-[17px] font-[400] leading-snug text-[#c3c3cc] sm:text-[18px]", children: mood })
      ] }),
      logo ? /* @__PURE__ */ jsx(
        "div",
        {
          className: cx$5(
            "shrink-0 overflow-hidden rounded-[14px] bg-black sm:rounded-[16px]",
            logoFit === "contain" ? "h-[4.5rem] w-14 sm:h-[5.25rem] sm:w-16" : "h-14 w-14 sm:h-16 sm:w-16"
          ),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "",
              className: cx$5(
                "h-full w-full object-center",
                logoFit === "contain" ? "object-contain" : "object-cover"
              ),
              draggable: false,
              decoding: "async"
            }
          )
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsx("div", { className: cx$5("mt-8 max-w-[42rem] space-y-4", BODY), children: story.split(/\n\n+/).map((para, idx) => /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(RichText, { text: para }) }, idx)) }),
    domain && !wip ? /* @__PURE__ */ jsxs(
      "a",
      {
        href: domain,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "mt-8 inline-flex max-w-full items-center gap-2 text-[15px] font-[500] text-[#c3c3cc] transition hover:text-white",
        children: [
          /* @__PURE__ */ jsx(ExternalIcon, { className: "shrink-0 text-[#8a8a8e]" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: domain.startsWith("http") ? domain : `https://${domainClean}` })
        ]
      }
    ) : null
  ] });
}
function ColorPalette({
  swatches,
  isRu
}) {
  const brand = swatches.filter((s2) => s2.group === "brand");
  const neutrals = swatches.filter((s2) => s2.group === "neutral");
  return /* @__PURE__ */ jsxs("section", { className: "mb-16 scroll-mt-28 sm:mb-[72px]", "aria-labelledby": "case-palette", children: [
    /* @__PURE__ */ jsx("h2", { id: "case-palette", className: H2, children: isRu ? "Палитра" : "Color Palette" }),
    brand.length ? /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[13px] font-[500] text-[#8a8a8e]", children: isRu ? "Бренд" : "Brand" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-8", children: brand.map((sw) => /* @__PURE__ */ jsx(PaletteSwatch, { swatch: sw, isRu, wide: true }, sw.hex + sw.name)) })
    ] }) : null,
    neutrals.length ? /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[13px] font-[500] text-[#8a8a8e]", children: isRu ? "Нейтрали" : "Neutrals" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4", children: neutrals.map((sw) => /* @__PURE__ */ jsx(PaletteSwatch, { swatch: sw, isRu }, sw.hex + sw.name)) })
    ] }) : null
  ] });
}
function PaletteSwatch({
  swatch,
  isRu,
  wide
}) {
  const [copied, setCopied] = useState(false);
  const isLight = luminance(swatch.hex) > 0.55;
  const copyLabel = isRu ? "Копировать" : "Copy";
  const copiedLabel = isRu ? "Скопировано" : "Copied";
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(swatch.hex);
    } catch {
      const el = document.createElement("textarea");
      el.value = swatch.hex;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return /* @__PURE__ */ jsxs("div", { className: cx$5("min-w-0", wide && "max-w-xl"), children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: onCopy,
        className: cx$5(
          "group relative w-full overflow-hidden rounded-2xl ring-1 ring-white/[0.06]",
          "outline-none transition focus-visible:ring-2 focus-visible:ring-[#FF6B2C]/55",
          wide ? "h-16 sm:h-[72px]" : "h-14 sm:h-16"
        ),
        style: { backgroundColor: swatch.hex },
        "aria-label": `${copyLabel} ${swatch.name} ${swatch.hex}`,
        title: `${copyLabel} ${swatch.hex}`,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cx$5(
                "pointer-events-none absolute inset-0 rounded-2xl",
                isLight ? "ring-1 ring-inset ring-black/10" : "ring-1 ring-inset ring-white/[0.04]"
              ),
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: cx$5(
                "absolute right-3 top-1/2 z-[1] -translate-y-1/2",
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1",
                "text-[11px] font-[600] tracking-normal backdrop-blur-sm",
                "opacity-0 transition duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
                isLight ? "bg-black/55 text-white" : "bg-white/90 text-[#171719]"
              ),
              children: [
                /* @__PURE__ */ jsx(CopyIcon, { className: "h-3 w-3 shrink-0" }),
                copied ? copiedLabel : copyLabel
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] font-medium tracking-normal text-[#ededf3] sm:text-[16px]", children: swatch.name }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: onCopy,
        className: "mt-0.5 font-mono text-[12px] tabular-nums text-[#8a8a8e] transition hover:text-[#ededf3]",
        children: copied ? copiedLabel : swatch.hex
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-[36ch] text-[13px] leading-[1.45] text-[#78787d] sm:text-[14px]", children: isRu ? swatch.roleRu : swatch.roleEn })
  ] });
}
function CopyIcon({ className }) {
  return /* @__PURE__ */ jsxs("svg", { className, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsx(
      "rect",
      {
        x: "9",
        y: "9",
        width: "11",
        height: "11",
        rx: "2",
        stroke: "currentColor",
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M5 15V7a2 2 0 0 1 2-2h8",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round"
      }
    )
  ] });
}
function luminance(hex) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return 0;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function parseCaseBody(text) {
  const lines = text.split("\n").map((l) => l.trim());
  const blocks = [];
  let i = 0;
  const nextNonEmpty = (from) => {
    for (let j = from; j < lines.length; j++) {
      const t = lines[j].trim();
      if (t) return { j, t };
    }
    return null;
  };
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    if (LEAD_META_RE.test(line)) {
      const colon = line.indexOf(":");
      const label = colon >= 0 ? line.slice(0, colon).trim() : line;
      const value = colon >= 0 ? line.slice(colon + 1).trim() : "";
      blocks.push({ type: "meta", label, value });
      i++;
      continue;
    }
    if (BULLET_RE.test(line)) {
      const items = [];
      while (i < lines.length) {
        const L = lines[i].trim();
        if (!L || !BULLET_RE.test(L)) break;
        items.push(L.replace(BULLET_RE, ""));
        i++;
      }
      blocks.push({ type: "bullets", items });
      continue;
    }
    const nxt = nextNonEmpty(i + 1);
    const heading = isSectionHeading(line) && nxt && (BULLET_RE.test(nxt.t) || !isSectionHeading(nxt.t));
    if (heading) {
      const title = line;
      i++;
      while (i < lines.length && !lines[i].trim()) i++;
      if (i < lines.length && BULLET_RE.test(lines[i].trim())) {
        const items = [];
        while (i < lines.length) {
          const L = lines[i].trim();
          if (!L || !BULLET_RE.test(L)) break;
          items.push(L.replace(BULLET_RE, ""));
          i++;
        }
        blocks.push({ type: "section", title, bullets: items });
      } else {
        const para2 = [];
        while (i < lines.length) {
          const L = lines[i].trim();
          if (!L) break;
          if (BULLET_RE.test(L)) break;
          if (isSectionHeading(L) && nextNonEmpty(i + 1)) break;
          para2.push(L);
          i++;
        }
        blocks.push({ type: "section", title, paragraphs: para2 });
      }
      continue;
    }
    const para = [];
    while (i < lines.length) {
      const L = lines[i].trim();
      if (!L) break;
      if (BULLET_RE.test(L)) break;
      if (isSectionHeading(L) && nextNonEmpty(i + 1)) break;
      para.push(L);
      i++;
    }
    if (para.length) blocks.push({ type: "prose", paragraphs: para });
  }
  return blocks;
}
function CaseDetailBody({
  text,
  isRu,
  palette
}) {
  const blocks = useMemo(() => parseCaseBody(text), [text]);
  const rest = blocks.filter((b) => b.type !== "meta");
  let contentIndex = 0;
  const nodes = [];
  if (palette?.length) {
    nodes.push(/* @__PURE__ */ jsx(ColorPalette, { swatches: palette, isRu }, "palette"));
  }
  for (const block of rest) {
    contentIndex++;
    if (block.type === "prose") {
      nodes.push(
        /* @__PURE__ */ jsx("div", { className: "mb-12 max-w-[42rem] space-y-4 last:mb-0 sm:mb-14", children: block.paragraphs.map((p, idx) => /* @__PURE__ */ jsx("p", { className: BODY, children: /* @__PURE__ */ jsx(RichText, { text: p }) }, idx)) }, `prose-${contentIndex}`)
      );
    } else if (block.type === "bullets") {
      nodes.push(
        /* @__PURE__ */ jsx("div", { className: "mb-14 sm:mb-16", children: /* @__PURE__ */ jsx(FeatureGrid, { items: block.items }) }, `bullets-${contentIndex}`)
      );
    } else if (block.type === "section") {
      const isOutcome = /^(итог|outcome|результат|result)/i.test(block.title);
      nodes.push(
        /* @__PURE__ */ jsxs(
          "section",
          {
            className: "mb-16 scroll-mt-28 border-t border-white/[0.06] pt-10 sm:mb-[72px] sm:pt-12",
            children: [
              /* @__PURE__ */ jsx("h2", { className: H2, children: block.title }),
              block.paragraphs?.length ? /* @__PURE__ */ jsx("div", { className: cx$5("mt-5 max-w-[42rem] space-y-4", isOutcome && "text-[#ededf3]"), children: block.paragraphs.map((p, idx) => /* @__PURE__ */ jsx("p", { className: BODY, children: /* @__PURE__ */ jsx(RichText, { text: p }) }, idx)) }) : null,
              block.bullets?.length ? /* @__PURE__ */ jsx(FeatureGrid, { items: block.bullets }) : null
            ]
          },
          `section-${contentIndex}`
        )
      );
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "text-left", children: nodes });
}
function OutcomesBlock({
  items,
  isRu
}) {
  return /* @__PURE__ */ jsxs("section", { id: "outcomes", className: "mt-4 scroll-mt-28 sm:mt-6", children: [
    /* @__PURE__ */ jsx("h2", { className: H2, children: isRu ? "Что получили" : "Outcomes" }),
    /* @__PURE__ */ jsx("ol", { className: "mt-8 list-none space-y-0 divide-y divide-white/[0.06]", children: items.map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "flex gap-5 py-5 first:pt-0 last:pb-0 sm:gap-8", children: [
      /* @__PURE__ */ jsx("span", { className: "font-hero w-8 shrink-0 text-[18px] font-normal tabular-nums tracking-[0.02em] text-[#8a8a8e]", children: String(idx + 1).padStart(2, "0") }),
      /* @__PURE__ */ jsx("p", { className: "min-w-0 text-[17px] font-[400] leading-[1.45] text-[#c3c3cc] sm:text-[18px]", children: /* @__PURE__ */ jsx(RichText, { text: item }) })
    ] }, `${idx}-${item.slice(0, 32)}`)) })
  ] });
}
function MoreLikeThis({
  currentId,
  isRu
}) {
  const others = useMemo(
    () => buildProjects(isRu).filter((p) => p.id !== currentId).slice(0, 4),
    [currentId, isRu]
  );
  if (!others.length) return null;
  const title = isRu ? "Ещё проекты" : "More like this";
  return /* @__PURE__ */ jsxs("section", { className: "mt-[72px] sm:mt-24", "aria-labelledby": "more-like-this", children: [
    /* @__PURE__ */ jsx(
      "h2",
      {
        id: "more-like-this",
        className: "mb-8 font-hero text-[clamp(1.35rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-[#ededf3] sm:mb-10",
        children: title
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12", children: others.map((p) => /* @__PURE__ */ jsx(MoreProjectCard, { project: p, isRu }, p.id)) })
  ] });
}
function MoreProjectCard({ project, isRu }) {
  const cover = projectPreviewSrc(project);
  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  return /* @__PURE__ */ jsxs(Link, { to: `/projects/${project.id}`, className: "group block min-w-0 outline-none", children: [
    /* @__PURE__ */ jsx("div", { className: "relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#141416]", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: cover,
        alt: "",
        className: "absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.03]",
        loading: "lazy",
        decoding: "async",
        draggable: false
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "mt-0.5 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-[#1c1c1f]", children: /* @__PURE__ */ jsx("img", { src: cover, alt: "", className: "h-full w-full object-cover", draggable: false }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[15px] font-medium tracking-normal text-[#ededf3] transition group-hover:text-white", children: project.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-[13px] leading-[1.45] tracking-normal text-[#8a8a8e]", children: subtitle })
      ] })
    ] })
  ] });
}
function ProjectDetailPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const isRu = lang === "ru";
  const project = useMemo(() => findProjectBySlug(slug, isRu), [slug, isRu]);
  const caseSystem = project ? getProjectCaseSystem(project.id) : void 0;
  useEffect(() => {
    if (project?.id) trackProjectView(project.id);
  }, [project?.id]);
  const backLabel = isRu ? "Все проекты" : "All projects";
  const stackLabel = isRu ? "Стек" : "Stack";
  const domainLabel = isRu ? "Домен" : "Domain";
  const statusLabel = isRu ? "Статус" : "Status";
  const tagsLabel = isRu ? "Теги" : "Tags";
  const liveLabel = isRu ? "В продакшене" : "Live";
  const wipLabel = isRu ? "В разработке" : "In progress";
  const openSiteLabel = isRu ? "Открыть сайт" : "Open website";
  const websiteSoonLabel = isRu ? "Сайт скоро" : "Website soon";
  const roleLabel = isRu ? "Роль TIVONIX" : "TIVONIX role";
  const roleValue = isRu ? "Дизайн и разработка под ключ" : "End-to-end design and development";
  const detailsLabel = isRu ? "Подробнее" : "Details";
  if (!slug) return /* @__PURE__ */ jsx(Navigate, { to: "/projects", replace: true });
  if (!project) return /* @__PURE__ */ jsx(Navigate, { to: "/projects", replace: true });
  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const details = isRu ? project.detailsRu : project.detailsEn;
  const mood = caseSystem ? isRu ? caseSystem.moodRu : caseSystem.moodEn : null;
  const seoTitle = `${project.title} — ${isRu ? "кейс TIVONIX" : "TIVONIX case study"}`;
  const seoDescription = clipMetaDescription(
    subtitle + (isRu ? " Студия TIVONIX: веб-разработка, лендинги, продукты и MVP." : " TIVONIX studio: web development, landings, products and MVPs.")
  );
  const wip = project.status === "wip";
  const domainClean = project.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";
  const coverSrc = projectPreviewSrc(project);
  const coverAbsolute = absoluteAssetUrl(coverSrc);
  const schemaJsonLd = buildProjectCaseSchema({
    id: project.id,
    title: project.title,
    description: seoDescription,
    coverUrl: coverAbsolute,
    domain: project.domain,
    tags: project.tags,
    stack: project.stack,
    lang
  });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative min-h-screen overflow-x-clip bg-[#0a0a0b]",
      style: s$1({ "--headerH": `${HEADER_H}px` }),
      children: [
        /* @__PURE__ */ jsx(
          SEO,
          {
            title: seoTitle,
            description: seoDescription,
            canonicalPath: `/projects/${project.id}`,
            ogImage: coverAbsolute,
            ogType: "article",
            ogLocalePrimary: isRu ? "ru_RU" : "en_US",
            schemaJsonLd
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 z-0 overflow-hidden", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: coverSrc,
              alt: "",
              className: "absolute left-1/2 top-[-10%] h-[110%] w-[110%] max-w-none -translate-x-1/2 object-cover object-center opacity-40",
              style: s$1({
                filter: "blur(56px) saturate(1.08) brightness(0.55)",
                WebkitFilter: "blur(56px) saturate(1.08) brightness(0.55)"
              }),
              draggable: false,
              decoding: "async"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#0a0a0b]/78" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.55)_0%,rgba(10,10,11,0.92)_55%,#0a0a0b_100%)]" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx(Header, {}),
          /* @__PURE__ */ jsx("main", { className: "pt-[calc(var(--headerH)+24px)] pb-28 sm:pt-[calc(var(--headerH)+32px)] sm:pb-36", children: /* @__PURE__ */ jsxs(Container, { children: [
            /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-col gap-1 sm:mt-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/projects",
                className: "inline-flex w-fit items-center gap-2 text-[13px] font-[500] tracking-normal text-[#8a8a8e] transition hover:text-[#ededf3]",
                children: [
                  /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "←" }),
                  backLabel
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 items-start gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.88fr)] lg:gap-14 xl:gap-16", children: [
              /* @__PURE__ */ jsxs("div", { className: "order-2 min-w-0 lg:order-1", children: [
                /* @__PURE__ */ jsx("figure", { className: "relative w-full overflow-hidden rounded-[12px] bg-[#141416]", children: /* @__PURE__ */ jsx("div", { className: "relative aspect-[16/10] w-full", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: coverSrc,
                    alt: `${project.title} — ${isRu ? "обложка кейса" : "case cover"}`,
                    className: "absolute inset-0 h-full w-full object-cover object-top",
                    draggable: false,
                    decoding: "async",
                    fetchPriority: "high"
                  }
                ) }) }),
                project.gallery?.length ? /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(ProjectGalleryStrip, { images: project.gallery, isRu }) }) : null
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "order-1 min-w-0 lg:order-2 lg:pt-1", children: [
                /* @__PURE__ */ jsxs("header", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsx("h1", { className: "font-hero text-[clamp(1.85rem,4.2vw,2.75rem)] font-normal uppercase tracking-[0.02em] leading-[1.02] text-[#ededf3]", children: project.title }),
                  /* @__PURE__ */ jsx("p", { className: cx$5("max-w-[36ch]", BODY), children: mood ?? subtitle }),
                  mood ? /* @__PURE__ */ jsx("p", { className: "max-w-[40ch] text-[14px] leading-relaxed text-[#8a8a8e]", children: subtitle }) : null
                ] }),
                /* @__PURE__ */ jsxs("dl", { className: "mt-8", children: [
                  /* @__PURE__ */ jsx(SpecRow, { label: domainLabel, children: project.domain && !wip ? /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: project.domain,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex max-w-full items-center gap-2 transition hover:text-white",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: domainClean }),
                        /* @__PURE__ */ jsx(ExternalIcon, { className: "shrink-0 text-[#8a8a8e]" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsx("span", { className: "text-[#8a8a8e]", children: websiteSoonLabel }) }),
                  /* @__PURE__ */ jsx(SpecRow, { label: statusLabel, children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: cx$5(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          wip ? "bg-amber-400/90" : "bg-emerald-400/90"
                        )
                      }
                    ),
                    wip ? wipLabel : liveLabel
                  ] }) }),
                  /* @__PURE__ */ jsx(SpecRow, { label: roleLabel, children: roleValue }),
                  /* @__PURE__ */ jsx(SpecRow, { label: tagsLabel, children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsx(Pill, { children: tag }, tag)) }) }),
                  project.stack?.length ? /* @__PURE__ */ jsx(SpecRow, { label: stackLabel, children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.stack.map((tech) => /* @__PURE__ */ jsx(Pill, { children: tech }, tech)) }) }) : null
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col gap-4", children: [
                  project.domain && !wip ? /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: project.domain,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#FF6B2C] px-6 text-[15px] font-medium tracking-normal text-white transition hover:bg-[#ff7d45]",
                      children: openSiteLabel
                    }
                  ) : /* @__PURE__ */ jsx("div", { className: "inline-flex h-[52px] w-full items-center justify-center rounded-full bg-[#1c1c1f] px-6 text-[15px] font-medium tracking-normal text-[#8a8a8e]", children: websiteSoonLabel }),
                  /* @__PURE__ */ jsx(
                    LeadCTAButton,
                    {
                      source: "project_page",
                      variant: "plain",
                      className: "!h-auto !min-h-0 w-full !rounded-none !border-0 !bg-transparent !px-0 !py-1 !text-[15px] !font-medium !tracking-normal !text-[#ededf3] hover:!bg-transparent hover:!text-white/75",
                      children: leadFormCopy(lang).ctaDiscuss
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "text-left text-[13px] leading-relaxed tracking-normal text-[#8a8a8e]", children: isRu ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    "Напиши: ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#c3c3cc]", children: "что делаем" }),
                    ",",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#c3c3cc]", children: "срок" }),
                    ",",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#c3c3cc]", children: "пример" }),
                    "."
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    "Message: ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#c3c3cc]", children: "what to build" }),
                    ",",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#c3c3cc]", children: "timeline" }),
                    ",",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#c3c3cc]", children: "reference" }),
                    "."
                  ] }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "article",
              {
                className: "mt-16 max-w-[52rem] sm:mt-[72px] lg:mt-24",
                itemScope: true,
                itemType: "https://schema.org/CreativeWork",
                children: [
                  /* @__PURE__ */ jsx("meta", { itemProp: "name", content: project.title }),
                  /* @__PURE__ */ jsx("meta", { itemProp: "description", content: subtitle }),
                  /* @__PURE__ */ jsx("link", { itemProp: "url", href: `${CANONICAL_ORIGIN}/projects/${project.id}` }),
                  /* @__PURE__ */ jsx("div", { className: "mb-10 border-b border-white/[0.06] pb-10 sm:mb-12 sm:pb-12", children: caseSystem ? /* @__PURE__ */ jsx(
                    CaseBrandIntro,
                    {
                      title: project.title,
                      mood: isRu ? caseSystem.moodRu : caseSystem.moodEn,
                      story: isRu ? caseSystem.storyRu : caseSystem.storyEn,
                      logo: caseSystem.logo,
                      logoFit: caseSystem.logoFit,
                      domain: project.domain,
                      domainClean,
                      wip
                    }
                  ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("h2", { className: H2, children: detailsLabel }),
                    /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[40rem] text-[15px] leading-relaxed text-[#8a8a8e]", children: isRu ? "Как устроен продукт: смысл, сценарии, интерфейс и токены." : "How the product is built: intent, flows, interface and tokens." })
                  ] }) }),
                  /* @__PURE__ */ jsx(
                    CaseDetailBody,
                    {
                      text: details,
                      isRu,
                      palette: caseSystem?.palette
                    }
                  ),
                  project.outcomes?.length ? /* @__PURE__ */ jsx(OutcomesBlock, { items: project.outcomes, isRu }) : null,
                  project.testimonial ? /* @__PURE__ */ jsxs("figure", { className: "mt-16 max-w-[42rem] border-t border-white/[0.06] pt-10 sm:mt-[72px] sm:pt-12", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[13px] font-[500] tracking-normal text-[#8a8a8e]", children: isRu ? "Отзыв · 5 из 5" : "Review · 5 of 5" }),
                    project.testimonial.textAr ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsxs(
                        "blockquote",
                        {
                          className: "mt-4 text-[18px] font-[400] leading-[1.7] tracking-[0.005em] text-[#c3c3cc] sm:text-[20px]",
                          dir: "rtl",
                          lang: "ar",
                          children: [
                            "“",
                            project.testimonial.textAr,
                            "”"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("p", { className: "mt-5 text-[12px] font-[500] tracking-normal text-[#8a8a8e]", children: isRu ? "Расшифровка" : "Translation" }),
                      /* @__PURE__ */ jsxs("blockquote", { className: "mt-2 text-[16px] font-[400] leading-[1.5] tracking-[0.005em] text-[#a8a8b0] sm:text-[17px]", children: [
                        "“",
                        project.testimonial.text,
                        "”"
                      ] })
                    ] }) : /* @__PURE__ */ jsxs("blockquote", { className: "mt-4 text-[18px] font-[400] leading-[1.5] tracking-[0.005em] text-[#c3c3cc] sm:text-[20px]", children: [
                      "“",
                      project.testimonial.text,
                      "”"
                    ] }),
                    /* @__PURE__ */ jsxs("figcaption", { className: "mt-5 text-[13px] tracking-normal text-[#8a8a8e]", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-medium text-[#ededf3]", children: project.testimonial.name }),
                      /* @__PURE__ */ jsx("span", { className: "mx-1.5 text-white/20", children: "·" }),
                      project.testimonial.role
                    ] })
                  ] }) : null
                ]
              }
            ),
            /* @__PURE__ */ jsx(MoreLikeThis, { currentId: project.id, isRu })
          ] }) })
        ] })
      ]
    }
  );
}
const ORANGE = "#FF9A3D";
const ORANGE2 = "#FF6A1A";
function cx$4(...a) {
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
      className: cx$4(
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
  const animStyle = s({ animationDuration: `${duration}s` });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "absolute left-1/2 top-1/2 z-0 pointer-events-none",
      style: wrapStyle,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border border-white/8 opacity-60" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full border border-[#FF9A3D]/10 opacity-80 [mask-image:radial-gradient(transparent_52%,black_64%)] [-webkit-mask-image:radial-gradient(transparent_52%,black_64%)]" }),
        /* @__PURE__ */ jsx("div", { className: cx$4("absolute inset-0 will-change-transform", reverse ? "orbit-rev" : "orbit"), style: animStyle, children: items.map((it, i) => {
          const ang = offsetDeg + i * step + (i % 2 ? 8 : -5);
          const posStyle = s({
            transform: `translate(-50%,-50%) rotate(${ang}deg) translateX(${radius}px) rotate(${-ang}deg)`
          });
          return /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2", style: posStyle, children: /* @__PURE__ */ jsx("div", { className: cx$4(reverse ? "counter-rev" : "counter"), style: animStyle, children: /* @__PURE__ */ jsx(LangChip, { item: it }) }) }, `${it.label}-${i}`);
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
  const leadCopy = leadFormCopy(lang);
  const botCta = isRu ? "Telegram-бот" : "Telegram bot";
  const contactRowClass = cx$4(
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
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[12.5px] leading-snug text-white/50", children: isRu ? "Данила Титовец · ответ в течение рабочего дня" : "Danila Titovets · reply within a business day" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-[12px] leading-snug text-white/40", children: isRu ? "Опишите задачу — пришлём план, срок и диапазон стоимости." : "Describe the task — we’ll send a plan, timeline and cost range." }),
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
                /* @__PURE__ */ jsx("span", { className: cx$4(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconTG, {}) }),
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
              className: cx$4(contactRowClass, "hidden sm:inline-flex"),
              children: [
                /* @__PURE__ */ jsx("span", { className: cx$4(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconMail, {}) }),
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
                /* @__PURE__ */ jsx("span", { className: cx$4(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconInstagram, {}) }),
                /* @__PURE__ */ jsx("span", { className: "min-w-0 text-[13px] font-[780] tracking-tight text-white/85", children: "Instagram" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 relative z-20 pointer-events-auto space-y-2", children: [
          /* @__PURE__ */ jsx(
            LeadCTAButton,
            {
              source: "contacts",
              variant: "primary",
              className: "!h-10 w-full !rounded-xl !text-[13.5px] !font-[800]",
              children: leadCopy.ctaDiscuss
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: TG_BOT_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: cx$4(
                "inline-flex h-10 w-full items-center justify-center rounded-xl px-5",
                "text-[13px] font-[700] text-white/80 whitespace-nowrap",
                "border border-white/15 bg-white/[0.05] hover:bg-white/[0.09] transition duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/35"
              ),
              children: botCta
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.55)]" })
  ] }) }) });
}
function ContactsPage() {
  useLockPageScroll(true);
  const { lang } = useLang();
  const { pathname } = useLocation();
  const isRu = lang === "ru";
  const isEnPath = pathname.startsWith("/en");
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
        canonicalPath: isEnPath ? "/en/contacts" : "/contacts",
        ogLocalePrimary: isRu ? "ru_RU" : "en_US",
        hreflang: true
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
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-[16px] leading-7 text-white/72", children: isRu ? "Проектируем, дизайним, разрабатываем и запускаем сайты в одном процессе: без хаоса и с понятным результатом для заявок и продаж." : "We design, develop and launch websites in one clear process focused on leads and sales." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(LeadCTAButton, { source: "service_websites", variant: "primary", size: "lg", children: isRu ? "Оставить заявку" : "Send a brief" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://t.me/TIVONIX",
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: () => trackTelegramDirectClick(),
              className: "inline-flex h-12 items-center justify-center rounded-full bg-white/[0.08] px-7 text-[14px] font-bold text-white/90 ring-1 ring-white/12 transition hover:bg-white/[0.12]",
              children: "Telegram"
            }
          )
        ] })
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
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-4xl text-white/74 leading-7", children: "Бриф и структура, дизайн ключевых блоков, разработка, правки, деплой и поддержка. Типовой срок: от нескольких дней для лендинга до нескольких недель для MVP. Первичную оценку даём после короткого брифа или созвона." })
      ] }) }),
      /* @__PURE__ */ jsx(Section, { className: "pt-8 pb-14", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[24px] sm:text-[32px] font-[800] tracking-tight text-white", children: "FAQ и следующий шаг" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-4xl text-white/74 leading-7", children: "Частые вопросы по процессу и стоимости уже собраны в разделе FAQ на главной. Оставьте заявку на сайте или перейдите в контакты — ответим с ориентиром по сроку и формату." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(LeadCTAButton, { source: "service_websites", variant: "primary", size: "lg", children: isRu ? "Оставить заявку" : "Send a brief" }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/contacts",
              className: "inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-[650] text-white border border-white/15 bg-white/[0.04]",
              children: isRu ? "Контакты" : "Contacts"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://t.me/TIVONIX",
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: () => trackTelegramDirectClick(),
              className: "inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-[650] text-white/80 border border-white/10 bg-transparent",
              children: "Telegram"
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
        const Icon = item.Icon;
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
            children: /* @__PURE__ */ jsx(Icon, { size: item.iconSize, color: item.color, "aria-hidden": true })
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
  const { openLeadForm } = useLeadForm();
  return /* @__PURE__ */ jsx(Section, { className: "relative overflow-x-hidden overflow-y-visible pb-16 pt-0 sm:pb-20", children: /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden px-4 py-8 text-center sm:px-8 sm:py-10", children: [
      /* @__PURE__ */ jsxs("h1", { className: `relative z-10 mt-5 ${automationTypo.h1}`, children: [
        /* @__PURE__ */ jsx("span", { className: "block", children: t.hero.h1Line1 }),
        /* @__PURE__ */ jsx("span", { className: "block", children: t.hero.h1Line2 })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "relative z-10 mx-auto mt-8 max-w-[40rem] text-[17px] font-medium leading-[1.55] text-white/85 sm:text-[19px] sm:leading-[1.6] lg:text-[20px]", children: t.hero.subtitle }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto mt-5 flex flex-wrap justify-center gap-2.5", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => openLeadForm("service_automation"),
            className: "inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white px-4 text-[13px] font-semibold tracking-tight text-neutral-900 shadow-sm transition hover:bg-white/92 active:translate-y-px sm:px-5 sm:text-[14px]",
            children: t.hero.microCtaTelegram
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: TG_BOT_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            onClick: () => trackTelegramBotClick(),
            className: "inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white/[0.12] px-4 text-[13px] font-semibold tracking-tight text-white/90 ring-1 ring-white/15 transition hover:bg-white/[0.18] active:translate-y-px sm:px-5 sm:text-[14px]",
            children: "Telegram"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `mailto:${AUTOMATION_CONTACT_EMAIL}?subject=${encodeURIComponent(t.hero.microCtaEmailSubject)}`,
            className: "inline-flex h-9 min-w-0 shrink-0 items-center justify-center rounded-full bg-white/[0.12] px-4 text-[13px] font-semibold tracking-tight text-white/90 ring-1 ring-white/15 transition hover:bg-white/[0.18] active:translate-y-px sm:px-5 sm:text-[14px]",
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
          "button",
          {
            type: "button",
            onClick: () => openLeadForm("service_automation"),
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
  icon: Icon,
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
          Icon,
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
  const { openLeadForm } = useLeadForm();
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
              "button",
              {
                type: "button",
                onClick: () => openLeadForm("service_automation"),
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
  const { openLeadForm } = useLeadForm();
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
          "button",
          {
            type: "button",
            onClick: () => openLeadForm("service_automation"),
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
            onClick: () => trackTelegramDirectClick(),
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
function cx$3(...parts) {
  return parts.filter(Boolean).join(" ");
}
function PricingFAQSection() {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  const [openId, setOpenId] = useState(null);
  return /* @__PURE__ */ jsx(Reveal$1, { delay: 160, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs("div", { className: "pricing-faq", children: [
    /* @__PURE__ */ jsx("div", { className: "pricing-faq__head", children: /* @__PURE__ */ jsx("h3", { className: "font-hero text-[clamp(1.35rem,2.8vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white", children: copy.faq.title }) }),
    /* @__PURE__ */ jsx("div", { children: copy.faq.items.map((item) => {
      const open = openId === item.id;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx$3("pricing-faq__item", open && "pricing-faq__item--open"),
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setOpenId((prev) => prev === item.id ? null : item.id),
                className: cx$3(
                  "flex w-full items-center justify-between gap-4 px-5 text-left sm:px-8",
                  open ? "pb-3 pt-5" : "py-5"
                ),
                "aria-expanded": open,
                children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: cx$3(
                        "font-sans text-[14px] font-medium sm:text-[15px]",
                        open ? "text-white" : "text-white/88"
                      ),
                      children: item.q
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    ChevronDown,
                    {
                      size: 16,
                      className: cx$3(
                        "shrink-0 transition",
                        open ? "rotate-180 text-[var(--color-ember)]" : "text-white/45"
                      ),
                      "aria-hidden": true
                    }
                  )
                ]
              }
            ),
            open ? /* @__PURE__ */ jsx("div", { className: "px-5 pb-6 sm:px-8", children: /* @__PURE__ */ jsx("p", { className: "pricing-faq__answer max-w-[62ch] font-sans text-[14px] font-medium leading-[1.7] text-white/72", children: item.a }) }) : null
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
function cx$2(...parts) {
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
          className: cx$2(
            "pricing-plan-scope__col",
            isGrowth && "pricing-plan-scope__col--growth"
          ),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "pricing-plan-scope__head", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$2(
                    "pricing-plan-scope__name font-hero font-normal uppercase tracking-[0.02em]",
                    isGrowth ? "text-[var(--color-ember)]" : "text-white"
                  ),
                  children: planCopy.name
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$2(
                    "pricing-plan-scope__price-old font-sans text-[10px] font-medium line-through",
                    planCopy.priceOriginal ? "text-white/35" : "text-transparent"
                  ),
                  "aria-hidden": !planCopy.priceOriginal,
                  children: planCopy.priceOriginal ?? " "
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "pricing-plan-scope__price font-hero text-[13px] font-normal tracking-[0.02em] text-[var(--color-ember)] normal-case", children: planCopy.price })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-scope__bars", "aria-hidden": true, children: Array.from({ length: SEGMENTS }).map((_, index) => {
              const on = index < filled;
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$2("pricing-plan-scope__bar", on && "pricing-plan-scope__bar--on")
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
const EMBER = "#fc5000";
const PLANS_IMG = `/images/${encodeURIComponent("планы")}`;
const PLAN_IMAGES = {
  start: `${PLANS_IMG}/1.webp`,
  growth: `${PLANS_IMG}/2.webp`,
  product: `${PLANS_IMG}/3.webp`,
  custom: `${PLANS_IMG}/4.webp`
};
function cx$1(...parts) {
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
      className: ctaClass$1(
        featured ? "primary" : "white",
        compact ? "md" : "md",
        cx$1("w-full", compact && "h-9 text-[12px] sm:h-10 sm:text-[13px]", className)
      ),
      children
    }
  );
}
function ComparisonValue({
  cell,
  labels,
  textLabels
}) {
  if (cell.kind === "yes") {
    return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center text-[var(--color-ember)]", "aria-label": labels.yes, children: /* @__PURE__ */ jsx(Check, { size: 15, strokeWidth: 2.25, "aria-hidden": true }) });
  }
  if (cell.kind === "no") {
    return /* @__PURE__ */ jsx("span", { className: "text-white/28", "aria-label": labels.no, children: /* @__PURE__ */ jsx(Minus, { size: 15, strokeWidth: 1.75, "aria-hidden": true }) });
  }
  const label = cell.kind === "text" && cell.textKey ? textLabels[cell.textKey] : labels[cell.kind];
  return /* @__PURE__ */ jsx("span", { className: "font-sans text-[11px] font-medium text-white/50 sm:text-[12px]", children: label });
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
      className: cx$1(
        layout === "column" ? "pricing-compare__plan-head" : "pricing-compare__mobile-plan",
        featured && "pricing-compare__plan-head--featured"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cx$1(
              "pricing-compare__plan-name font-hero font-normal uppercase tracking-[0.02em]",
              layout === "column" ? "text-[15px] sm:text-[16px]" : "text-[14px]",
              featured ? "text-[var(--color-ember)]" : "text-white"
            ),
            children: name
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cx$1(
              "pricing-compare__plan-original font-sans text-[11px] font-medium",
              priceOriginal ? "text-white/35 line-through" : "text-transparent"
            ),
            "aria-hidden": !priceOriginal,
            children: priceOriginal ?? " "
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cx$1(
              "pricing-compare__plan-price font-hero font-normal leading-none tracking-[0.02em] normal-case",
              layout === "column" ? "text-[14px] sm:text-[15px]" : "text-[13px]",
              isCustom ? "text-white" : "text-[var(--color-ember)]"
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
  const match = price.match(/^(от|from)\s+(.+)$/i);
  const from = match?.[1];
  const amount = match?.[2];
  return /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__price-block", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$1(
        "pricing-plan-card__price-value",
        from && amount ? "pricing-plan-card__price-value--stack" : "pricing-plan-card__price-value--solo"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "p",
          {
            className: cx$1(
              "pricing-plan-card__price-original",
              hasOriginal ? "is-visible" : "is-empty"
            ),
            "aria-hidden": !hasOriginal,
            children: priceOriginal ?? " "
          }
        ),
        from && amount ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "pricing-plan-card__price-from", children: from }),
          /* @__PURE__ */ jsx("span", { className: "pricing-plan-card__price-amount", children: amount })
        ] }) : /* @__PURE__ */ jsx("span", { className: "pricing-plan-card__price-amount pricing-plan-card__price-amount--solo", children: price })
      ]
    }
  ) });
}
function CompactPlanPrice({ price, priceOriginal }) {
  if (!priceOriginal) {
    return /* @__PURE__ */ jsx("p", { className: "mt-4 font-hero text-[1.55rem] font-normal tracking-[0.02em] text-white normal-case", children: price });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("p", { className: "font-sans text-[12px] font-semibold text-white/75 line-through", children: priceOriginal }),
    /* @__PURE__ */ jsx("p", { className: "mt-0.5 font-hero text-[1.55rem] font-normal tracking-[0.02em] text-white normal-case", children: price })
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
      className: cx$1(
        "pricing-plan-card",
        highlight && "pricing-plan-card--highlight",
        planId === "growth" && "pricing-plan-card--growth",
        planId === "product" && "pricing-plan-card--product"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__media", "aria-hidden": true, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: PLAN_IMAGES[planId],
            alt: "",
            className: "pricing-plan-card__bg",
            loading: "lazy",
            decoding: "async"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__veil", "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { className: "pricing-plan-card__body", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-plan-card__head", children: [
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__badge-slot", children: badge ? /* @__PURE__ */ jsx("span", { className: "pricing-plan-card__badge", children: badge }) : /* @__PURE__ */ jsx("span", { className: "pricing-plan-card__badge is-empty", "aria-hidden": true, children: " " }) }),
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: cx$1(
                  "pricing-plan-card__name"
                ),
                children: name
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "pricing-plan-card__tagline", children: tagline }),
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__price-slot", children: /* @__PURE__ */ jsx(PlanPrice, { price, priceOriginal }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pricing-plan-card__details", children: [
            /* @__PURE__ */ jsx("p", { className: "pricing-plan-card__desc", children: desc }),
            /* @__PURE__ */ jsx("ul", { className: "pricing-plan-card__includes-list", children: includes.map((item) => /* @__PURE__ */ jsxs("li", { className: "pricing-plan-card__includes-item", children: [
              /* @__PURE__ */ jsx(
                Check,
                {
                  size: 13,
                  className: "pricing-plan-card__check",
                  strokeWidth: 2.25,
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, item)) }),
            /* @__PURE__ */ jsx("div", { className: "pricing-plan-card__footer", children: /* @__PURE__ */ jsx(PlanCtaButton, { featured: planId === "growth", onClick: onCta, children: cta }) })
          ] })
        ] })
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
      className: cx$1(
        "pricing-footer-card flex h-full flex-col",
        highlight && "pricing-footer-card--highlight",
        planId === "growth" && "pricing-footer-card--growth"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "pricing-footer-card__body flex flex-col p-6 sm:p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-footer-card__head", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-hero text-[1.25rem] font-normal uppercase tracking-[0.02em] text-white", children: name }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 font-sans text-[12.5px] font-medium leading-relaxed text-white/48", children: shortDesc }),
            /* @__PURE__ */ jsx("div", { className: "pricing-footer-card__price-slot", children: /* @__PURE__ */ jsx(CompactPlanPrice, { price, priceOriginal }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pricing-footer-card__chips mt-auto pt-4", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: chips.map((chip) => /* @__PURE__ */ jsx("span", { className: "pricing-footer-card__chip", children: chip }, chip)) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pricing-footer-card__footer !pt-0 p-6 sm:p-8", children: /* @__PURE__ */ jsx(PlanCtaButton, { featured: planId === "growth", compact: true, onClick: onCta, children: compactCta }) })
      ]
    }
  );
}
function PricingPlansSection({ className }) {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  const { openLeadForm } = useLeadForm();
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
    openLeadForm("pricing", { planId });
  };
  const handleHelpCta = () => {
    openLeadForm("pricing_help");
  };
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "pricing",
      className: cx$1(
        "scroll-mt-[var(--tivonix-header-spacer)] bg-black py-10 sm:py-20 lg:py-24",
        className
      ),
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs(Reveal$1, { className: "mx-auto max-w-[48rem] text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-hero text-[clamp(2rem,5vw,3.25rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance", children: copy.title }),
          /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-4 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 sm:mt-5", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "font-hero shrink-0 text-[clamp(1.85rem,3.8vw,2.5rem)] font-normal uppercase leading-none tracking-[0.02em]",
                style: { color: EMBER },
                children: copy.launchDiscount.percent
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "max-w-[42ch] text-center font-sans text-[12px] font-medium leading-snug text-[var(--color-ember)]/75 sm:text-left sm:text-[13px]", children: copy.launchDiscount.note })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Reveal$1, { delay: 80, className: "pricing-plans-grid mt-10 sm:mt-12", children: PLANS.map((plan) => {
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
        /* @__PURE__ */ jsx(Reveal$1, { delay: 120, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs("div", { className: "pricing-compare", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-compare__intro", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-hero text-[clamp(1.5rem,3vw,2.1rem)] font-normal uppercase tracking-[0.02em] text-white", children: copy.compareTitle }),
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
                    className: cx$1(
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
                        className: cx$1("text-white/45 transition", open && "rotate-180"),
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
        /* @__PURE__ */ jsx(Reveal$1, { delay: 150, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsxs("div", { className: "pricing-value-band", children: [
          /* @__PURE__ */ jsxs("div", { className: "pricing-value-band__copy", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-hero text-[clamp(1.5rem,3vw,2.25rem)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white", children: [
              copy.footer.valueTitle,
              " ",
              /* @__PURE__ */ jsx("span", { className: "pricing-value-band__highlight", children: copy.footer.valueTitleHighlight })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 font-sans text-[12px] font-medium text-white/38", children: copy.footer.valueAside }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-[38ch] font-sans text-[14px] font-medium leading-[1.65] text-white/50", children: copy.footer.valueLead })
          ] }),
          /* @__PURE__ */ jsx(PricingPlanScopeGrid, { onPlanAction: handlePlanCta })
        ] }) }),
        /* @__PURE__ */ jsx(PricingFAQSection, {}),
        /* @__PURE__ */ jsx(Reveal$1, { delay: 170, className: "mt-10 sm:mt-12", children: /* @__PURE__ */ jsx("div", { className: "pricing-help-band", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleHelpCta,
            className: "pricing-help-band__link w-full cursor-pointer border-0 bg-transparent",
            children: copy.footer.helpCta
          }
        ) }) }),
        /* @__PURE__ */ jsx(Reveal$1, { delay: 180, className: "pricing-footer-grid mt-0 hidden md:grid", children: PLANS.map((plan) => {
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
  const { pathname } = useLocation();
  const isEnPath = pathname === "/en/plans";
  useEffect(() => {
    trackPricingView();
  }, []);
  const title = lang === "ru" ? "Планы запуска — TIVONIX" : "Launch plans — TIVONIX";
  const description = lang === "ru" ? "Тарифы TIVONIX: Start, Growth, Product и Custom — от лендинга с заявками до веб-сервиса с CRM, оплатой и автоматизацией." : "TIVONIX plans: Start, Growth, Product and Custom — from a lead page to a full web service with CRM, payments and automation.";
  const schemaJsonLd = buildPricingPageSchema({ pageTitle: title, pageDescription: description, lang });
  const canonicalPath = isEnPath ? "/en/plans" : "/plans";
  return /* @__PURE__ */ jsxs("div", { className: "landing-caldera plans-caldera min-h-screen overflow-x-clip bg-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title,
        description,
        canonicalPath,
        ogLocalePrimary: lang === "en" ? "en_US" : "ru_RU",
        hreflang: true,
        schemaJsonLd
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "top" }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(PricingPlansSection, { className: "!pt-[calc(var(--tivonix-header-spacer)+1rem)] sm:!pt-[calc(var(--tivonix-header-spacer)+1.5rem)]" }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const LOGO = "/images/tivonix-logo-white.webp";
const JOIN_BG = "/images/1.png";
const AVATAR = "/favicon-192.png";
function splitWords(text) {
  return text.split(/(\s+)/).filter(Boolean);
}
function WhyIcon({ kind }) {
  const common = {
    viewBox: "0 0 72 72",
    className: "about-why__icon",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    "aria-hidden": true
  };
  if (kind === "experience") {
    return /* @__PURE__ */ jsxs("svg", { ...common, children: [
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "5.5" }),
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "14" }),
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "23", opacity: "0.75" }),
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "31", opacity: "0.4" })
    ] });
  }
  if (kind === "expertise") {
    return /* @__PURE__ */ jsxs("svg", { ...common, children: [
      /* @__PURE__ */ jsx("circle", { cx: "26", cy: "34", r: "13" }),
      /* @__PURE__ */ jsx("circle", { cx: "46", cy: "34", r: "13" }),
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "46", r: "13" })
    ] });
  }
  if (kind === "innovation") {
    return /* @__PURE__ */ jsxs("svg", { ...common, children: [
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "28", opacity: "0.45" }),
      /* @__PURE__ */ jsx("ellipse", { cx: "36", cy: "36", rx: "12", ry: "28" }),
      /* @__PURE__ */ jsx("path", { d: "M10 36h52M14 24h44M14 48h44", strokeLinecap: "round", opacity: "0.85" })
    ] });
  }
  return /* @__PURE__ */ jsxs("svg", { ...common, children: [
    /* @__PURE__ */ jsx("circle", { cx: "36", cy: "18", r: "4.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "20", cy: "32", r: "4.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "52", cy: "32", r: "4.5" }),
    /* @__PURE__ */ jsx("circle", { cx: "24", cy: "50", r: "4" }),
    /* @__PURE__ */ jsx("circle", { cx: "48", cy: "50", r: "4" }),
    /* @__PURE__ */ jsx("circle", { cx: "36", cy: "36", r: "3.5" }),
    /* @__PURE__ */ jsx("path", { d: "M36 22.5V32.5M24 35l8 3M48 35l-8 3M28 47l5-7M44 47l-5-7", opacity: "0.55" })
  ] });
}
function AboutPage() {
  const { lang } = useLang();
  const copy = aboutCopy(lang);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const peopleRef = useRef(null);
  const footerRef = useRef(null);
  const footerTrackRef = useRef(null);
  const footerRunnerRef = useRef(null);
  const lineCount = copy.hero.titleLines.length;
  const storyText = useMemo(() => copy.story.paragraphs.join(" "), [copy.story.paragraphs]);
  const storyWords = useMemo(() => splitWords(storyText), [storyText]);
  useEffect(() => {
    const box = footerRef.current;
    const track = footerTrackRef.current;
    const runner = footerRunnerRef.current;
    if (!box || !track || !runner || typeof window === "undefined") return;
    const sync = () => {
      const w = box.clientWidth;
      const h = box.clientHeight;
      const inset = 1;
      const rw = Math.max(0, w - inset * 2);
      const rh = Math.max(0, h - inset * 2);
      const styles = getComputedStyle(box);
      const parsedRadius = Number.parseFloat(styles.borderTopLeftRadius) || 24;
      const radius = Math.min(parsedRadius - inset, rw / 2, rh / 2);
      for (const node of [track, runner]) {
        node.setAttribute("x", String(inset));
        node.setAttribute("y", String(inset));
        node.setAttribute("width", String(rw));
        node.setAttribute("height", String(rh));
        node.setAttribute("rx", String(Math.max(0, radius)));
        node.setAttribute("ry", String(Math.max(0, radius)));
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(box);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--hero-p", "1");
      el.dataset.cta = "1";
      return;
    }
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      const p = Math.min(1, Math.max(0, scrolled / travel));
      el.style.setProperty("--hero-p", p.toFixed(4));
      el.dataset.cta = p > 0.88 ? "1" : "0";
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
  }, []);
  useEffect(() => {
    const story = storyRef.current;
    if (!story || typeof window === "undefined") return;
    const wordEls = Array.from(story.querySelectorAll(".about-story__word"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      wordEls.forEach((w) => w.style.setProperty("--w", "1"));
      return;
    }
    let active = false;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!active) return;
      const vh = window.innerHeight;
      const whiteLine = vh * 0.55;
      const grayLine = vh * 0.96;
      const span = grayLine - whiteLine || 1;
      for (let i = 0; i < wordEls.length; i++) {
        const y = wordEls[i].getBoundingClientRect().top + wordEls[i].offsetHeight * 0.35;
        const t = Math.min(1, Math.max(0, (grayLine - y) / span));
        wordEls[i].style.setProperty("--w", (Math.round(t * 28) / 28).toFixed(2));
      }
    };
    const schedule = () => {
      if (raf || !active) return;
      raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) schedule();
      },
      { root: null, rootMargin: "12% 0px", threshold: 0 }
    );
    io.observe(story);
    active = true;
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      active = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [storyWords]);
  useEffect(() => {
    const el = peopleRef.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 899px)");
    if (reduced) {
      el.style.setProperty("--spread", "1");
      el.dataset.formed = "1";
      return;
    }
    let raf = 0;
    const update = () => {
      if (mobile.matches) {
        el.style.setProperty("--spread", "1");
        el.dataset.formed = "1";
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.08;
      const t = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const eased = t * t * (3 - 2 * t);
      el.style.setProperty("--spread", eased.toFixed(3));
      el.dataset.formed = eased > 0.55 ? "1" : "0";
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "about-caldera min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: copy.seo.title,
        description: copy.seo.description,
        canonicalPath: lang === "en" ? "/en/about" : "/about",
        ogLocalePrimary: lang === "en" ? "en_US" : "ru_RU",
        hreflang: true
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "about-caldera__mesh", "aria-hidden": true, children: /* @__PURE__ */ jsxs("svg", { className: "about-caldera__mesh-svg", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "aboutPageGlow", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#fc5000" }),
        /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#ff7a33" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#fc5000" })
      ] }) }),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-track",
          vectorEffect: "non-scaling-stroke",
          d: "M 6 0 V 18 C 6 22 4 24 8 28 C 14 34 4 38 8 44 C 12 50 5 54 7 62 C 9 70 4 74 7 82 C 8 86 6 88 6 90"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-track",
          vectorEffect: "non-scaling-stroke",
          d: "M 94 0 V 16 C 94 20 96 24 92 28 C 86 34 96 38 92 44 C 88 50 95 54 93 62 C 91 70 96 74 93 82 C 92 86 94 88 94 90"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-track about-caldera__mesh-track--soft",
          vectorEffect: "non-scaling-stroke",
          d: "M 0 22 H 28 C 36 22 40 18 50 18 C 60 18 64 22 72 22 H 100"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-track about-caldera__mesh-track--soft",
          vectorEffect: "non-scaling-stroke",
          d: "M 0 48 H 22 C 32 48 38 54 50 54 C 62 54 68 48 78 48 H 100"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-track about-caldera__mesh-track--soft",
          vectorEffect: "non-scaling-stroke",
          d: "M 0 74 H 26 C 34 74 40 70 50 70 C 60 70 66 74 74 74 H 100"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-runner",
          vectorEffect: "non-scaling-stroke",
          pathLength: "1",
          d: "M 6 0 V 18 C 6 22 4 24 8 28 C 14 34 4 38 8 44 C 12 50 5 54 7 62 C 9 70 4 74 7 82 C 8 86 6 88 6 90"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "about-caldera__mesh-runner about-caldera__mesh-runner--delay",
          vectorEffect: "non-scaling-stroke",
          pathLength: "1",
          d: "M 94 0 V 16 C 94 20 96 24 92 28 C 86 34 96 38 92 44 C 88 50 95 54 93 62 C 91 70 96 74 93 82 C 92 86 94 88 94 90"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "overflow-x-clip", children: [
      /* @__PURE__ */ jsx(
        "section",
        {
          ref: heroRef,
          className: "about-hero about-hero--lines relative",
          style: { ["--hero-lines"]: lineCount },
          children: /* @__PURE__ */ jsxs("div", { className: "about-hero__pin", children: [
            /* @__PURE__ */ jsx("div", { className: "about-hero__rail", "aria-hidden": true, children: /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "about-hero__svg",
                viewBox: "0 0 1440 320",
                preserveAspectRatio: "none",
                children: [
                  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "aboutHeroGlow", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                    /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#fc5000" }),
                    /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#ff7a33" }),
                    /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#fc5000" })
                  ] }) }),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "about-hero__track",
                      d: "M -20 200 H 360 C 480 200 540 90 720 90 C 900 90 960 200 1080 200 H 1460"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "about-hero__runner",
                      pathLength: "1",
                      d: "M -20 200 H 360 C 480 200 540 90 720 90 C 900 90 960 200 1080 200 H 1460"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(Container, { className: "relative z-[2] text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "about-caldera__tag mx-auto mb-6", children: lang === "en" ? "Our story" : "Наша история" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "about-hero__logo mx-auto mb-7 sm:mb-8",
                  role: "img",
                  "aria-label": "TIVONIX",
                  style: {
                    backgroundColor: "var(--caldera-ember)",
                    WebkitMaskImage: `url(${LOGO})`,
                    maskImage: `url(${LOGO})`
                  }
                }
              ),
              /* @__PURE__ */ jsxs("h1", { className: "about-caldera__display about-hero__title mx-auto", children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: copy.hero.title }),
                copy.hero.titleLines.map((line, i) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "about-hero__line",
                    style: { ["--i"]: i },
                    "aria-hidden": true,
                    children: line
                  },
                  line
                ))
              ] }),
              /* @__PURE__ */ jsx("div", { className: "about-hero__cta mt-8 flex justify-center", children: /* @__PURE__ */ jsx(
                LeadCTAButton,
                {
                  source: "founder",
                  variant: "primary",
                  size: "lg",
                  className: "about-caldera__btn",
                  onClick: () => trackEvent("service_cta_click", { section: "about_hero" }),
                  children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                    copy.hero.cta,
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": true })
                  ] })
                }
              ) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "about-caldera__section about-story-section pt-0", children: /* @__PURE__ */ jsx(Container, { className: "relative z-[2]", children: /* @__PURE__ */ jsx("div", { ref: storyRef, className: "about-story", lang, children: /* @__PURE__ */ jsx("p", { className: "about-story__text", children: storyWords.map(
        (token, i) => /^\s+$/.test(token) ? /* @__PURE__ */ jsx("span", { children: " " }, `s-${i}`) : /* @__PURE__ */ jsx("span", { className: "about-story__word", children: token }, `w-${i}`)
      ) }) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "about-caldera__section", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx("div", { className: "about-caldera__trio", children: [copy.mission, copy.vision, copy.values].map((block) => /* @__PURE__ */ jsxs("article", { className: "about-caldera__card", children: [
          /* @__PURE__ */ jsx("span", { className: "about-caldera__sulfur", children: block.label }),
          /* @__PURE__ */ jsx("h2", { className: "about-caldera__h", children: block.title }),
          /* @__PURE__ */ jsx("p", { className: "about-caldera__body", children: block.text })
        ] }, block.label)) }),
        /* @__PURE__ */ jsx("ul", { className: "about-values", children: copy.values.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "about-values__item", children: [
          /* @__PURE__ */ jsx("p", { className: "about-caldera__h about-caldera__h--sm", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "about-caldera__body about-caldera__body--sm", children: item.text })
        ] }, item.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "about-why-section about-caldera__section", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "about-why__head", children: [
          /* @__PURE__ */ jsx("h2", { className: "about-caldera__display about-caldera__display--section", children: copy.why.title }),
          /* @__PURE__ */ jsx("p", { className: "about-caldera__body about-why__lead", children: copy.why.text })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "about-why", children: copy.why.items.map((item) => /* @__PURE__ */ jsxs("article", { className: "about-why__item", children: [
          /* @__PURE__ */ jsx("div", { className: "about-why__icon-wrap", children: /* @__PURE__ */ jsx(WhyIcon, { kind: item.key }) }),
          /* @__PURE__ */ jsx("h3", { className: "about-caldera__h about-caldera__h--sm", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "about-caldera__body about-caldera__body--sm", children: item.text })
        ] }, item.key)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-14 flex justify-center sm:mt-16", children: /* @__PURE__ */ jsx(
          LeadCTAButton,
          {
            source: "founder",
            variant: "primary",
            size: "lg",
            className: "about-caldera__btn",
            onClick: () => trackEvent("service_cta_click", { section: "about_why" }),
            children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              copy.why.cta,
              /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": true })
            ] })
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          ref: peopleRef,
          className: "about-people about-caldera__section about-caldera__section--last",
          style: { ["--spread"]: 0 },
          children: /* @__PURE__ */ jsxs(Container, { children: [
            /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[40rem] text-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "about-caldera__display about-caldera__display--section about-caldera__display--center", children: copy.people.title }),
              /* @__PURE__ */ jsx("p", { className: "about-caldera__body mt-4", children: copy.people.text })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "about-people__stage mt-12 sm:mt-14", children: [
              /* @__PURE__ */ jsx("ul", { className: "about-people__side about-people__side--left", children: copy.people.members.slice(0, 3).map((m, i) => /* @__PURE__ */ jsxs("li", { className: "about-people__item", style: { ["--i"]: i }, children: [
                /* @__PURE__ */ jsx("div", { className: "about-people__avatar", "aria-hidden": true, children: /* @__PURE__ */ jsx("img", { src: AVATAR, alt: "", width: 96, height: 96, draggable: false }) }),
                /* @__PURE__ */ jsx("p", { className: "about-people__name", children: m.name }),
                /* @__PURE__ */ jsx("p", { className: "about-people__role", children: m.role })
              ] }, m.id)) }),
              /* @__PURE__ */ jsx("div", { className: "about-people__shot", children: /* @__PURE__ */ jsxs("div", { className: "about-join", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: JOIN_BG,
                    alt: "",
                    className: "about-join__bg",
                    loading: "lazy",
                    decoding: "async",
                    draggable: false
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "about-join__shade", "aria-hidden": true }),
                /* @__PURE__ */ jsx("div", { className: "about-join__cta relative z-[4] flex min-h-[inherit] items-end justify-center pb-6 pt-36 sm:pb-8 sm:pt-44", children: /* @__PURE__ */ jsx(
                  LeadCTAButton,
                  {
                    source: "founder",
                    variant: "white",
                    size: "lg",
                    className: "about-caldera__btn about-caldera__btn--chalk",
                    onClick: () => trackEvent("service_cta_click", { section: "about_join" }),
                    children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                      copy.join.cta,
                      /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": true })
                    ] })
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsx("ul", { className: "about-people__side about-people__side--right", children: copy.people.members.slice(3, 6).map((m, i) => /* @__PURE__ */ jsxs("li", { className: "about-people__item", style: { ["--i"]: i }, children: [
                /* @__PURE__ */ jsx("div", { className: "about-people__avatar", "aria-hidden": true, children: /* @__PURE__ */ jsx("img", { src: AVATAR, alt: "", width: 96, height: 96, draggable: false }) }),
                /* @__PURE__ */ jsx("p", { className: "about-people__name", children: m.name }),
                /* @__PURE__ */ jsx("p", { className: "about-people__role", children: m.role })
              ] }, m.id)) })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "about-footer-wrap", children: [
      /* @__PURE__ */ jsxs("div", { className: "about-footer__leads", "aria-hidden": true, children: [
        /* @__PURE__ */ jsx("span", { className: "about-footer__lead about-footer__lead--l" }),
        /* @__PURE__ */ jsx("span", { className: "about-footer__lead about-footer__lead--r" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "about-footer", ref: footerRef, children: [
        /* @__PURE__ */ jsxs("svg", { className: "about-footer__frame", "aria-hidden": true, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "aboutFooterGlow", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#fc5000" }),
            /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#ff7a33" }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#fc5000" })
          ] }) }),
          /* @__PURE__ */ jsx("rect", { ref: footerTrackRef, className: "about-footer__track", x: "1", y: "1", width: "0", height: "0", rx: "39", ry: "39" }),
          /* @__PURE__ */ jsx(
            "rect",
            {
              ref: footerRunnerRef,
              className: "about-footer__runner",
              pathLength: "1",
              x: "1",
              y: "1",
              width: "0",
              height: "0",
              rx: "39",
              ry: "39"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "about-footer__clip", children: /* @__PURE__ */ jsx(Footer, {}) })
      ] })
    ] })
  ] });
}
const RU = {
  seo: {
    title: "Партнёрская программа TIVONIX — Referral и White-label",
    description: "Передавайте клиентов или продавайте разработку под своим брендом. TIVONIX оценивает, разрабатывает и запускает сайты, CRM, кабинеты, ботов и веб-сервисы.",
    serviceName: "TIVONIX Partners — Referral и White-label",
    emailSubject: "TIVONIX Partners — обсуждение сотрудничества"
  },
  hero: {
    h1: "Берите больше заказов на разработку — без найма своей IT-команды",
    subtitle: "Для агентств, фрилансеров и студий: вы находите клиента, TIVONIX оценивает, разрабатывает и запускает. Клиент остаётся вашим — выберите Referral или White-label и зарегистрируйтесь в панели.",
    cta: "Стать партнёром",
    loginCta: "Войти в панель",
    trust: "Можно начать с одного проекта • Клиент остаётся вашим • NDA"
  },
  problem: {
    title: "Не отказывайтесь от заказа, если клиенту понадобилась разработка",
    body: [
      { text: "Допустим, вы занимаетесь " },
      { text: "рекламой", pill: true },
      { text: ", " },
      { text: "дизайном", pill: true },
      { text: " или " },
      { text: "продвижением", pill: true },
      { text: ". Клиент доверяет вам, но теперь ему нужен " },
      { text: "сайт, CRM, онлайн-запись или личный кабинет", em: true },
      { text: ". Вам не придётся " },
      { text: "нанимать разработчиков", em: true },
      { text: " или искать исполнителей. Вы передаёте задачу TIVONIX, " },
      { text: "добавляете свою наценку", em: true },
      { text: " и продолжаете вести клиента. Мы оцениваем, разрабатываем, тестируем и " },
      { text: "запускаем продукт", em: true },
      { text: "." }
    ],
    rolesHeading: "Кто за что отвечает",
    roles: [
      {
        title: "Вы",
        items: [
          "находите клиента",
          "обсуждаете с ним бизнес-задачу",
          "называете итоговую цену",
          "остаётесь главным контактом",
          "контролируете отношения с клиентом"
        ]
      },
      {
        title: "TIVONIX",
        items: [
          "разбирается в технической части",
          "рассчитывает партнёрскую стоимость",
          "делает дизайн и разработку",
          "тестирует и запускает проект",
          "показывает каждый этап работы"
        ]
      },
      {
        title: "Ваша выгода",
        items: [
          "не нужно содержать разработчиков в штате",
          "можно принимать более дорогие заказы",
          "клиент остаётся с вами",
          "разница между партнёрской и конечной ценой остаётся вам",
          "вы расширяете услуги своего агентства"
        ]
      }
    ]
  },
  money: {
    label: "Простой пример",
    body: "TIVONIX оценил разработку в $1500. Вы продаёте проект клиенту за $2200. Мы выполняем техническую часть, вы ведёте клиента, а разница $700 остаётся вашему агентству.",
    caption: "Клиент платит вам → вы оставляете наценку → TIVONIX получает партнёрскую стоимость",
    flow: ["У вас есть клиент", "TIVONIX выполняет разработку", "вы зарабатываете на своей наценке"],
    disclaimer: "Суммы приведены для примера. Деньги появляются только от реального оплаченного проекта. Стоимость каждого проекта рассчитывается отдельно."
  },
  models: {
    heading: {
      before: "Передайте клиента или",
      sell: "продайте",
      middle: "проект под своим",
      brand: "брендом"
    },
    menu: [
      { title: "Оценка за 24 часа", description: "Объём, сроки, формат" },
      { title: "White-label", description: "Работа под вашим брендом" },
      { title: "Referral", description: "Вознаграждение после оплаты" },
      { title: "Кабинет партнёра", description: "Статусы и выплаты" }
    ],
    allInOne: {
      title: "Всё под рукой",
      text: "Оценка, модели сотрудничества, комиссия и кабинет сделок — в одном месте."
    },
    quickStart: {
      pill: "Оценка за 24 часа",
      title: "Быстрый старт",
      text: "Присылаете задачу — получаете объём, сроки и партнёрскую стоимость."
    },
    status: {
      title: "Прозрачный статус",
      text: "В кабинете видно, на каком этапе сделка и когда будет выплата.",
      steps: [
        { t: "Заявка", d: "контакт получен" },
        { t: "В работе", d: "разработка идёт" },
        { t: "Оплачено", d: "комиссия начислена" }
      ]
    },
    referral: {
      title: "Referral-партнёр",
      text: "Передаёте контакт или добавляете TIVONIX в чат. Мы оцениваем проект, заключаем сделку и выполняем работу. Клиент закрепляется за вами. Партнёрское вознаграждение начисляется после оплаты заказа клиентом.",
      cta: "Стать Referral-партнёром",
      note: "Вознаграждение — только после оплаты клиентом."
    },
    whiteLabel: {
      title: "White-label",
      text: "Продаёте разработку как услугу агентства. TIVONIX сообщает стоимость разработки. Партнёр самостоятельно назначает конечную цену для своего клиента. Мы не выходим к клиенту без согласия.",
      cta: "Работать по White-label",
      note: "Стоимость, сроки и условия проекта согласовываются после проверки заявки."
    },
    panelHint: "Регистрация откроется в партнёрской панели TIVONIX",
    footnote: "Регистрация бесплатная. Вознаграждение — только за оплаченные проекты."
  },
  video: {
    title: "Как работает партнёрство — за 60 секунд",
    subtitle: "От выбора формата до первого проекта в панели TIVONIX."
  },
  afterReg: {
    title: "Что будет после регистрации",
    lead: "Короткий путь от заявки до доступа в панель.",
    steps: [
      { t: "Вы выбираете формат", d: "Referral или White-label." },
      { t: "Создаёте аккаунт", d: "Указываете свои контакты и отправляете заявку." },
      { t: "Мы проверяем заявку", d: "После одобрения вы принимаете условия сотрудничества." },
      { t: "Получаете доступ к панели", d: "Передаёте клиента или создаёте первый проект и следите за статусами." }
    ],
    disclaimer: "Регистрация не означает автоматическое одобрение. Сначала мы проверяем заявку и связываемся с партнёром."
  },
  capabilities: {
    heading: "Возможности",
    titles: [
      "Сайт или квиз",
      "Бот и автоматизация",
      "CRM или админ-панель",
      "Личный кабинет / сервис",
      "Интеграции",
      "Поддержка и развитие"
    ],
    h2Before: "От страницы под рекламу до",
    h2Pill: "полноценного",
    h2After: "веб-продукта"
  },
  process: {
    title: "Вы контролируете клиента. Мы контролируем разработку",
    lead: "Шесть понятных шагов от заявки до запуска — без размытых сроков и скрытых ролей.",
    steps: ["Заявка", "Разбор", "Оценка", "Согласование", "Разработка", "Запуск"]
  },
  cases: {
    title: "Не концепты, а работающие продукты",
    view: "Смотреть проект",
    all: "Все проекты",
    texts: {
      spliton: "Финтех-платформа для музыкальных активов: каталог релизов, покупка долей, кошелёк, вторичный рынок, выплаты и административная система.",
      slotty: "Система онлайн-записи: услуги, расписание, бронирование, напоминания, портфолио, подписки и личный кабинет."
    }
  },
  examples: {
    sr: "Примеры моделей Referral и White-label",
    referral: {
      pill: "Referral",
      title: "Пример Referral",
      text: "Клиент оплатил заказ. Партнёрское вознаграждение начисляется после подтверждённой оплаты — не за привлечение других партнёров."
    },
    whiteLabel: {
      pill: "White-label",
      title: "Пример White-label",
      text: "TIVONIX сообщает стоимость разработки агентству. Агентство само назначает цену клиенту и оставляет разницу себе."
    }
  },
  faq: {
    title: "Частые вопросы",
    more: "Подробнее",
    items: [
      {
        q: "Кто может стать партнёром?",
        a: "Агентства, студии, фрилансеры и специалисты, у которых уже есть или появляются клиенты на разработку."
      },
      {
        q: "Чем Referral отличается от White-label?",
        a: "Referral — вы передаёте клиента, TIVONIX ведёт сделку и платит вознаграждение после оплаты. White-label — вы продаёте разработку под своим брендом и сами назначаете цену клиенту."
      },
      {
        q: "Кто общается с клиентом?",
        a: "В White-label основную коммуникацию ведёте вы. В Referral мы можем общаться напрямую в согласованном формате."
      },
      {
        q: "Остаётся ли клиент за агентством?",
        a: "Да. Клиент закрепляется за вами — TIVONIX не «забирает» отношения."
      },
      {
        q: "Когда выплачивается Referral-вознаграждение?",
        a: "После того как клиент оплатил заказ и платёж подтверждён. Деньги только от реального оплаченного проекта."
      },
      {
        q: "Как агентство зарабатывает на White-label?",
        a: "TIVONIX сообщает стоимость разработки. Вы сами назначаете конечную цену клиенту и оставляете разницу."
      },
      {
        q: "Может ли TIVONIX выйти к клиенту напрямую?",
        a: "В White-label — только с вашего согласия. В Referral формат общения согласуем заранее."
      },
      {
        q: "Можно ли начать с одного проекта?",
        a: "Да. Один пилотный проект — нормальный старт."
      },
      {
        q: "Что будет после регистрации?",
        a: "Заявка уходит на проверку (pending). После одобрения — условия сотрудничества и доступ к панели."
      },
      {
        q: "Где отслеживать клиентов, сделки и выплаты?",
        a: "В партнёрской панели TIVONIX: статусы сделок, проекты и выплаты в одном кабинете."
      }
    ]
  },
  final: {
    badge: "Готовы начать",
    title: "Начните с одного проекта",
    body: "Выберите формат, зарегистрируйтесь и отправьте первую задачу через партнёрскую панель.",
    referralCta: "Выбрать Referral",
    whiteLabelCta: "Выбрать White-label",
    loginLink: "Уже есть аккаунт? Войти в панель",
    footnote: "Можно начать с одного проекта • Клиент остаётся вашим • NDA"
  },
  footer: {
    marquee: "WHITE-LABEL · REFERRAL · ПАРТНЁРСКАЯ РАЗРАБОТКА · ПОД ВАШИМ БРЕНДОМ",
    homeAria: "TIVONIX — на главную",
    navAria: "Навигация в подвале",
    formats: "Форматы",
    login: "Войти в панель",
    askTelegram: "Задать вопрос",
    projects: "Проекты",
    contacts: "Контакты",
    channel: "Канал",
    privacy: "Политика",
    privacyAria: "Политика обработки и защиты персональных данных (PDF)",
    consent: "Согласие",
    consentAria: "Согласие на обработку персональных данных (PDF)",
    note: "Разработка для агентств: сайты, CRM, кабинеты и боты под вашим брендом."
  },
  discuss: {
    label: "Задать вопрос",
    ask: "Telegram — только вопрос, регистрация в панели"
  },
  ui: {
    client: "Клиент",
    you: "Вы",
    youPct: "Вы",
    estimate: "Оценка TIVONIX",
    markup: "Ваша наценка",
    clientPrice: "Цена клиенту"
  }
};
const EN = {
  seo: {
    title: "TIVONIX Partner Program — Referral and White-label",
    description: "Refer clients or sell development under your brand. TIVONIX scopes, builds, and ships websites, CRMs, portals, bots, and web products.",
    serviceName: "TIVONIX Partners — Referral and White-label",
    emailSubject: "TIVONIX Partners — partnership discussion"
  },
  hero: {
    h1: "Take on more development work — without hiring your own IT team",
    subtitle: "For agencies, freelancers, and studios: you find the client; TIVONIX scopes, builds, and launches. The client stays yours — pick Referral or White-label and register in the panel.",
    cta: "Become a partner",
    loginCta: "Log in to the panel",
    trust: "Start with one project • The client stays yours • NDA"
  },
  problem: {
    title: "Don’t turn down a deal just because the client needs development",
    body: [
      { text: "Say you run " },
      { text: "ads", pill: true },
      { text: ", " },
      { text: "design", pill: true },
      { text: ", or " },
      { text: "growth", pill: true },
      { text: ". Your client trusts you — and now they need " },
      { text: "a website, CRM, online booking, or client portal", em: true },
      { text: ". You don’t have to " },
      { text: "hire developers", em: true },
      { text: " or hunt freelancers. Hand the work to TIVONIX, " },
      { text: "add your markup", em: true },
      { text: ", and keep owning the relationship. We scope, build, test, and " },
      { text: "launch the product", em: true },
      { text: "." }
    ],
    rolesHeading: "Who owns what",
    roles: [
      {
        title: "You",
        items: [
          "find the client",
          "align on the business goal",
          "quote the final price",
          "remain the primary contact",
          "own the client relationship"
        ]
      },
      {
        title: "TIVONIX",
        items: [
          "owns the technical scope",
          "calculates the partner price",
          "handles design and development",
          "tests and ships the project",
          "keeps every stage visible"
        ]
      },
      {
        title: "What’s in it for you",
        items: [
          "no in-house developers required",
          "you can take on higher-value deals",
          "the client stays with you",
          "the gap between partner price and client price is yours",
          "you expand your agency’s service lineup"
        ]
      }
    ]
  },
  money: {
    label: "Simple example",
    body: "TIVONIX prices development at $1,500. You sell the project to the client for $2,200. We deliver the build, you manage the client, and the $700 difference stays with your agency.",
    caption: "Client pays you → you keep the markup → TIVONIX receives the partner price",
    flow: ["You have a client", "TIVONIX builds it", "you earn on your markup"],
    disclaimer: "Figures are illustrative. Earnings come only from a real paid project. Every project is priced individually."
  },
  models: {
    heading: {
      before: "Refer the client — or",
      sell: "sell",
      middle: "the project under your",
      brand: "brand"
    },
    menu: [
      { title: "Estimate in 24 hours", description: "Scope, timeline, format" },
      { title: "White-label", description: "Delivery under your brand" },
      { title: "Referral", description: "Payout after client payment" },
      { title: "Partner panel", description: "Statuses and payouts" }
    ],
    allInOne: {
      title: "Everything in one place",
      text: "Estimates, partnership models, commission, and deal tracking — all in one place."
    },
    quickStart: {
      pill: "Estimate in 24 hours",
      title: "Fast start",
      text: "Send the brief — get scope, timeline, and partner pricing."
    },
    status: {
      title: "Transparent status",
      text: "See where each deal stands and when payout is due.",
      steps: [
        { t: "Lead in", d: "contact received" },
        { t: "In progress", d: "build underway" },
        { t: "Paid", d: "commission accrued" }
      ]
    },
    referral: {
      title: "Referral partner",
      text: "Share the contact or add TIVONIX to the chat. We estimate, close, and deliver. The client is attributed to you. Partner reward is accrued after the client pays for the order.",
      cta: "Become a Referral partner",
      note: "Reward only after the client pays."
    },
    whiteLabel: {
      title: "White-label",
      text: "Sell development as your agency’s service. TIVONIX quotes the build cost. You set the final price for your client. We never contact the client without your approval.",
      cta: "Work White-label",
      note: "Price, timeline, and terms are agreed after we review your application."
    },
    panelHint: "Registration opens in the TIVONIX partner panel",
    footnote: "Registration is free. Rewards only on paid projects."
  },
  video: {
    title: "How partnership works — in 60 seconds",
    subtitle: "From choosing a format to your first project in the TIVONIX panel."
  },
  afterReg: {
    title: "What happens after registration",
    lead: "A short path from application to panel access.",
    steps: [
      { t: "You choose a format", d: "Referral or White-label." },
      { t: "Create an account", d: "Share your contacts and submit the application." },
      { t: "We review the application", d: "After approval, you accept the partnership terms." },
      { t: "You get panel access", d: "Refer a client or create the first project and track statuses." }
    ],
    disclaimer: "Registration does not mean automatic approval. We review the application and contact the partner first."
  },
  capabilities: {
    heading: "Capabilities",
    titles: [
      "Website or quiz",
      "Bot and automation",
      "CRM or admin panel",
      "Client portal / product",
      "Integrations",
      "Support and growth"
    ],
    h2Before: "From an ad landing page to",
    h2Pill: "a full",
    h2After: "web product"
  },
  process: {
    title: "You own the client. We own the build",
    lead: "Six clear steps from request to launch — no fuzzy timelines or hidden roles.",
    steps: ["Request", "Discovery", "Estimate", "Alignment", "Development", "Launch"]
  },
  cases: {
    title: "Not concepts — working products",
    view: "View project",
    all: "All projects",
    texts: {
      spliton: "Fintech platform for music assets: release catalog, fractional purchases, wallet, secondary market, payouts, and admin system.",
      slotty: "Online booking system: services, schedule, reservations, reminders, portfolio, subscriptions, and client portal."
    }
  },
  examples: {
    sr: "Referral and White-label model examples",
    referral: {
      pill: "Referral",
      title: "Referral example",
      text: "The client paid for the order. Partner reward is accrued after confirmed payment — not for recruiting other partners."
    },
    whiteLabel: {
      pill: "White-label",
      title: "White-label example",
      text: "TIVONIX quotes the build cost to the agency. The agency sets the client price and keeps the difference."
    }
  },
  faq: {
    title: "FAQ",
    more: "Details",
    items: [
      {
        q: "Who can become a partner?",
        a: "Agencies, studios, freelancers, and specialists who already have — or will have — clients needing development."
      },
      {
        q: "How is Referral different from White-label?",
        a: "Referral — you hand over the client; TIVONIX runs the deal and pays a reward after payment. White-label — you sell development under your brand and set the client price yourself."
      },
      {
        q: "Who talks to the client?",
        a: "In White-label, you own client communication. In Referral, we may speak directly in an agreed format."
      },
      {
        q: "Does the client stay with the agency?",
        a: "Yes. The client is attributed to you — TIVONIX does not take the relationship."
      },
      {
        q: "When is the Referral reward paid?",
        a: "After the client pays for the order and payment is confirmed. Money only from a real paid project."
      },
      {
        q: "How does an agency earn on White-label?",
        a: "TIVONIX quotes the build cost. You set the final client price and keep the difference."
      },
      {
        q: "Can TIVONIX contact the client directly?",
        a: "In White-label — only with your approval. In Referral, contact format is agreed upfront."
      },
      {
        q: "Can we start with one project?",
        a: "Yes. One pilot project is a normal start."
      },
      {
        q: "What happens after registration?",
        a: "Your application goes to review (pending). After approval — partnership terms and panel access."
      },
      {
        q: "Where do I track clients, deals, and payouts?",
        a: "In the TIVONIX partner panel: deal statuses, projects, and payouts in one place."
      }
    ]
  },
  final: {
    badge: "Ready to start",
    title: "Start with one project",
    body: "Choose a format, register, and submit the first task through the partner panel.",
    referralCta: "Choose Referral",
    whiteLabelCta: "Choose White-label",
    loginLink: "Already have an account? Log in to the panel",
    footnote: "Start with one project • The client stays yours • NDA"
  },
  footer: {
    marquee: "WHITE-LABEL · REFERRAL · PARTNERSHIP DEVELOPMENT · UNDER YOUR BRAND",
    homeAria: "TIVONIX — home",
    navAria: "Footer navigation",
    formats: "Formats",
    login: "Log in to the panel",
    askTelegram: "Ask a question",
    projects: "Projects",
    contacts: "Contacts",
    channel: "Channel",
    privacy: "Privacy",
    privacyAria: "Privacy Policy (PDF)",
    consent: "Consent",
    consentAria: "Consent to personal data processing (PDF)",
    note: "Development for agencies: websites, CRMs, portals, and bots under your brand."
  },
  discuss: {
    label: "Ask a question",
    ask: "Telegram for questions — registration is in the panel"
  },
  ui: {
    client: "Client",
    you: "You",
    youPct: "You",
    estimate: "TIVONIX estimate",
    markup: "Your markup",
    clientPrice: "Client price"
  }
};
function getPartnersCopy(lang) {
  return lang === "en" ? EN : RU;
}
const PARTNERS_DOCS = {
  ru: {
    privacy: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
    consent: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf"
  },
  en: {
    privacy: "/doc/Privacy_Policy_Tivonix_EN.pdf",
    consent: "/doc/Consent_Tivonix_EN.pdf"
  }
};
const PARTNERS_GMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tivoonix@gmail.com")}&su=${encodeURIComponent("TIVONIX Partners — обсуждение сотрудничества")}`;
const TIVONIX_MARK = "/images/tivonix-logo-icon.webp";
const PARTNERS_EASY_BG = `/images/${encodeURI("как рабоает/пп/4.webp")}`;
const PARTNERS_REF_BG = `/images/partners/${encodeURIComponent("зеленая.png")}`;
const PARTNERS_WL_BG = `/images/partners/${encodeURIComponent("оранж.png")}`;
const CASES = [
  {
    id: "spliton",
    title: "Spliton",
    tags: ["Fintech", "Marketplace", "Payments"],
    cover: "/images/project-priew/spliton.webp"
  },
  {
    id: "slotty",
    title: "Slotty",
    tags: ["Booking", "SaaS", "Telegram"],
    cover: "/images/project-priew/slotty.webp"
  }
];
const CAPABILITY_IDS = ["landing", "bot", "crm", "cabinet", "integrations", "support"];
function buildPartnersSchema(copy, lang, pathname) {
  const url = partnersCanonicalUrl(lang, pathname);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.seo.title,
        description: copy.seo.description,
        isPartOf: { "@id": "https://tivonix.tech/#website" },
        inLanguage: lang
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: copy.seo.serviceName,
        description: copy.seo.description,
        provider: {
          "@type": "Organization",
          name: "TIVONIX",
          url: "https://tivonix.tech/"
        },
        areaServed: "Worldwide",
        serviceType: "Partner software development — Referral and White-label",
        url
      }
    ]
  };
}
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function Shell({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cx(LANDING_SHELL_CLASS, className), children });
}
function Reveal({ children, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx(
        className,
        visible ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]" : "translate-y-3 opacity-0"
      ),
      children
    }
  );
}
function DarkPill({
  children,
  href = PARTNER_AGENCY_TELEGRAM_URL,
  sameTab = false,
  onClick
}) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      ...sameTab ? {} : { target: "_blank", rel: "noopener noreferrer" },
      onClick,
      className: "inline-flex min-h-[2.75rem] items-center justify-center rounded-partners-btn bg-partners-ink px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-cream no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partners-ink",
      children
    }
  );
}
const pillClass = "inline-flex min-h-[2.75rem] items-center justify-center rounded-partners-btn bg-partners-sand px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-ink no-underline transition hover:bg-partners-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partners-ink";
function SandPill({
  children,
  href,
  sameTab = false,
  onClick
}) {
  const external = href.startsWith("http") || href.startsWith("tg:");
  if (external) {
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        ...sameTab ? {} : { target: "_blank", rel: "noopener noreferrer" },
        onClick,
        className: pillClass,
        children
      }
    );
  }
  if (href.startsWith("#")) {
    return /* @__PURE__ */ jsx("a", { href, onClick, className: pillClass, children });
  }
  return /* @__PURE__ */ jsx(Link, { to: href, className: pillClass, children });
}
function CapsMiniVisual({ id }) {
  if (id === "landing") {
    return /* @__PURE__ */ jsx("div", { className: "partners-caps__viz partners-caps__viz--landing", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-caps__browser", children: [
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__chrome", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__url", children: "tivonix.tech/lead" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__page", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__nav", children: [
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {})
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__hero-bar" }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__hero-bar partners-caps__hero-bar--s" }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__cta-row", children: [
          /* @__PURE__ */ jsx("span", { className: "partners-caps__cta", children: "Старт" }),
          /* @__PURE__ */ jsx("span", { className: "partners-caps__cta partners-caps__cta--ghost", children: "Ещё" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "partners-caps__form", children: [
          /* @__PURE__ */ jsx("span", { className: "partners-caps__field-label", children: "Имя" }),
          /* @__PURE__ */ jsxs("span", { className: "partners-caps__input", children: [
            /* @__PURE__ */ jsx("span", { className: "partners-caps__typed", children: "Анна" }),
            /* @__PURE__ */ jsx("span", { className: "partners-caps__caret" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "partners-caps__field-label", children: "Телефон" }),
          /* @__PURE__ */ jsx("span", { className: "partners-caps__input partners-caps__input--phone", children: "+7 ···" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__tg-chip", children: [
          /* @__PURE__ */ jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M21.5 3.6 2.9 11.1c-1.3.5-1.3 1.3-.2 1.6l4.7 1.5 1.8 5.5c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.9L22.9 5c.3-1.2-.4-1.8-1.4-1.4ZM9.2 14.5l-.3 3.3 1.3-1.7 8-7.6-9 5.9Z" }) }),
          "В Telegram"
        ] })
      ] })
    ] }) });
  }
  if (id === "bot") {
    return /* @__PURE__ */ jsx("div", { className: "partners-caps__viz partners-caps__viz--bot", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-caps__phone", children: [
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__phone-head", children: [
        /* @__PURE__ */ jsx("span", { className: "partners-caps__phone-avatar" }),
        /* @__PURE__ */ jsxs("div", { className: "partners-caps__phone-meta", children: [
          /* @__PURE__ */ jsx("span", { className: "partners-caps__phone-name", children: "TIVONIX Bot" }),
          /* @__PURE__ */ jsx("span", { className: "partners-caps__phone-status", children: "online" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__chat", children: [
        /* @__PURE__ */ jsx("span", { className: "partners-caps__msg partners-caps__msg--in partners-caps__msg--a", children: "Привет! Опишите задачу" }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__msg partners-caps__msg--out partners-caps__msg--b", children: "Нужен сайт + CRM" }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__msg partners-caps__msg--in partners-caps__msg--c", children: "Ок. Срок и бюджет?" }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__msg partners-caps__msg--out partners-caps__msg--d", children: "2 недели" }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__msg partners-caps__msg--in partners-caps__msg--typing", children: [
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {}),
          /* @__PURE__ */ jsx("i", {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__compose", children: [
        /* @__PURE__ */ jsx("span", { children: "Сообщение…" }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__send" })
      ] })
    ] }) });
  }
  if (id === "crm") {
    return /* @__PURE__ */ jsx("div", { className: "partners-caps__viz partners-caps__viz--crm", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-caps__board", children: [
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__col", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__col-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-orange" }),
          " Новые"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__ticket partners-caps__ticket--1", children: [
          /* @__PURE__ */ jsx("b", { children: "Лендинг" }),
          /* @__PURE__ */ jsx("em", { children: "сегодня" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__ticket partners-caps__ticket--move", children: [
          /* @__PURE__ */ jsx("b", { children: "Квиз" }),
          /* @__PURE__ */ jsx("em", { children: "сейчас" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__col", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__col-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-blue" }),
          " В работе"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__ticket partners-caps__ticket--2", children: [
          /* @__PURE__ */ jsx("b", { children: "CRM" }),
          /* @__PURE__ */ jsx("em", { children: "Аня" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__progress", children: /* @__PURE__ */ jsx("i", {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__col", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__col-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-green" }),
          " Готово"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__ticket partners-caps__ticket--3", children: [
          /* @__PURE__ */ jsx("b", { children: "Кабинет" }),
          /* @__PURE__ */ jsx("em", { children: "оплачен" })
        ] })
      ] })
    ] }) });
  }
  if (id === "cabinet") {
    return /* @__PURE__ */ jsx("div", { className: "partners-caps__viz partners-caps__viz--cabinet", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-caps__app", children: [
      /* @__PURE__ */ jsxs("aside", { className: "partners-caps__side", children: [
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", { className: "is-active" }),
        /* @__PURE__ */ jsx("span", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__main", children: [
        /* @__PURE__ */ jsxs("div", { className: "partners-caps__toolbar", children: [
          /* @__PURE__ */ jsx("span", { className: "partners-caps__search", children: "поиск…" }),
          /* @__PURE__ */ jsx("span", { className: "partners-caps__user-chip" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "partners-caps__cards", children: [
          /* @__PURE__ */ jsxs("span", { className: "partners-caps__dash", children: [
            /* @__PURE__ */ jsx("b", { children: "12" }),
            /* @__PURE__ */ jsx("em", { children: "лида" })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "partners-caps__dash partners-caps__dash--b", children: [
            /* @__PURE__ */ jsx("b", { children: "$4.2k" }),
            /* @__PURE__ */ jsx("em", { children: "оплаты" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "partners-caps__rows", children: [
          /* @__PURE__ */ jsxs("span", { className: "partners-caps__row is-live", children: [
            /* @__PURE__ */ jsx("i", {}),
            " Spliton · в работе"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "partners-caps__row", children: [
            /* @__PURE__ */ jsx("i", {}),
            " Slotty · оценка"
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__pay", children: "Подписка · активна" })
      ] })
    ] }) });
  }
  if (id === "integrations") {
    return /* @__PURE__ */ jsx("div", { className: "partners-caps__viz partners-caps__viz--integrations", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-caps__net", children: [
      /* @__PURE__ */ jsxs("svg", { className: "partners-caps__net-svg", viewBox: "0 0 300 220", width: "300", height: "220", fill: "none", children: [
        /* @__PURE__ */ jsx("line", { className: "partners-caps__link", x1: "150", y1: "110", x2: "150", y2: "42" }),
        /* @__PURE__ */ jsx("line", { className: "partners-caps__link", x1: "150", y1: "110", x2: "248", y2: "110" }),
        /* @__PURE__ */ jsx("line", { className: "partners-caps__link", x1: "150", y1: "110", x2: "150", y2: "178" }),
        /* @__PURE__ */ jsx("line", { className: "partners-caps__link", x1: "150", y1: "110", x2: "52", y2: "110" }),
        /* @__PURE__ */ jsx("circle", { className: "partners-caps__packet partners-caps__packet--1", r: "3.5", cx: "150", cy: "110" }),
        /* @__PURE__ */ jsx("circle", { className: "partners-caps__packet partners-caps__packet--2", r: "3.5", cx: "150", cy: "110" }),
        /* @__PURE__ */ jsx("circle", { className: "partners-caps__packet partners-caps__packet--3", r: "3.5", cx: "150", cy: "110" }),
        /* @__PURE__ */ jsx("circle", { className: "partners-caps__packet partners-caps__packet--4", r: "3.5", cx: "150", cy: "110" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__inode partners-caps__inode--crm", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-crm" }),
          " CRM"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-row", children: [
          /* @__PURE__ */ jsx("b", { children: "Анна · лендинг" }),
          /* @__PURE__ */ jsx("em", { className: "is-new", children: "новый" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__inode-meta", children: "сделка · сегодня" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__inode partners-caps__inode--pay", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-pay" }),
          " Оплата"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__inode-sum", children: "₽ 4 900" }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-card", children: [
          /* @__PURE__ */ jsx("span", { className: "partners-caps__inode-chip" }),
          "···· 4242"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__inode-ok", children: "✓ Оплачено" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "partners-caps__hub-core", children: "TX" }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__inode partners-caps__inode--tg", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-tg" }),
          " Telegram"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__inode-bubble", children: "Новая оплата + лид" }),
        /* @__PURE__ */ jsx("span", { className: "partners-caps__inode-meta", children: "сейчас · бот" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "partners-caps__inode partners-caps__inode--tbl", children: [
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-h", children: [
          /* @__PURE__ */ jsx("i", { className: "is-tbl" }),
          " Таблица"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "partners-caps__inode-sheet", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("b", { children: "row" }),
            /* @__PURE__ */ jsx("b", { children: "status" })
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("em", { children: "A12" }),
            /* @__PURE__ */ jsx("em", { className: "is-ok", children: "ok" })
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("em", { children: "A13" }),
            /* @__PURE__ */ jsx("em", { className: "is-sync", children: "sync" })
          ] })
        ] })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "partners-caps__viz partners-caps__viz--support", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-caps__support", children: [
    /* @__PURE__ */ jsxs("div", { className: "partners-caps__check-list", children: [
      /* @__PURE__ */ jsxs("span", { className: "partners-caps__check is-on", children: [
        /* @__PURE__ */ jsx("i", { children: "✓" }),
        " Фикс бага"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "partners-caps__check is-on partners-caps__check--2", children: [
        /* @__PURE__ */ jsx("i", { children: "✓" }),
        " Новый модуль"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "partners-caps__check partners-caps__check--3", children: [
        /* @__PURE__ */ jsx("i", { children: "○" }),
        " Сопровождение"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "partners-caps__check partners-caps__check--4", children: [
        /* @__PURE__ */ jsx("i", { children: "○" }),
        " Релиз v1.2"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "partners-caps__support-side", children: [
      /* @__PURE__ */ jsx("span", { className: "partners-caps__support-ring" }),
      /* @__PURE__ */ jsx("span", { className: "partners-caps__support-label", children: "24/7" })
    ] })
  ] }) });
}
const CAPS_EXPAND_SHARE = 0.14;
function CapabilitiesBanner() {
  const { lang } = useLang();
  const copy = getPartnersCopy(lang);
  const isRu = lang === "ru";
  const capabilities = CAPABILITY_IDS.map((id, index2) => ({ id, title: copy.capabilities.titles[index2] }));
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const walkerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const showHintRef = useRef(true);
  const total = capabilities.length;
  const active = capabilities[index];
  const indexRef = useRef(0);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduce = () => setReduced(mq.matches);
    applyReduce();
    mq.addEventListener?.("change", applyReduce);
    return () => mq.removeEventListener?.("change", applyReduce);
  }, []);
  useEffect(() => {
    if (reduced) {
      document.documentElement.dataset.partnersCaps = "0";
      setShowScrollHint(false);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const pin = pinRef.current;
      const stage = stageRef.current;
      if (!pin || !stage) return;
      const rect = pin.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const travel = Math.max(1, pin.offsetHeight - vh);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      const p = scrolled / travel;
      let expand = 1;
      if (p <= CAPS_EXPAND_SHARE) {
        expand = p / CAPS_EXPAND_SHARE;
      } else if (p >= 1 - CAPS_EXPAND_SHARE) {
        expand = (1 - p) / CAPS_EXPAND_SHARE;
      }
      stage.style.setProperty("--caps-expand", String(Math.min(1, Math.max(0, expand))));
      const midStart = CAPS_EXPAND_SHARE;
      const midEnd = 1 - CAPS_EXPAND_SHARE;
      const slideP = Math.max(0, Math.min(1, (p - midStart) / (midEnd - midStart)));
      const next = Math.min(total - 1, Math.floor(slideP * total + 1e-6));
      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
        setCycle((c) => c + 1);
      }
      if (walkerRef.current) {
        walkerRef.current.style.left = `calc(${slideP * 100}% - ${slideP * 56}px)`;
      }
      const locking = rect.top <= 4 && rect.bottom > vh * 0.65;
      document.documentElement.dataset.partnersCaps = locking ? "1" : "0";
      const nextHint = locking && slideP < 0.08;
      if (nextHint !== showHintRef.current) {
        showHintRef.current = nextHint;
        setShowScrollHint(nextHint);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      document.documentElement.dataset.partnersCaps = "0";
    };
  }, [reduced, total]);
  const scrollToSlide = (i) => {
    const pin = pinRef.current;
    if (!pin || reduced) {
      setIndex(i);
      setCycle((c) => c + 1);
      return;
    }
    const vh = window.innerHeight || 1;
    const travel = Math.max(1, pin.offsetHeight - vh);
    const midStart = CAPS_EXPAND_SHARE;
    const midEnd = 1 - CAPS_EXPAND_SHARE;
    const slideMid = midStart + (i + 0.5) / total * (midEnd - midStart);
    const top = pin.getBoundingClientRect().top + window.scrollY + travel * slideMid;
    window.scrollTo({ top, behavior: "smooth" });
  };
  const card = /* @__PURE__ */ jsxs("div", { className: "partners-caps relative overflow-visible rounded-[22px] bg-partners-white px-5 pb-24 pt-6 sm:px-8 sm:pb-28 sm:pt-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex w-full max-w-[440px] justify-center", children: /* @__PURE__ */ jsx(CapsMiniVisual, { id: active.id }) }, `viz-${active.id}-${cycle}`),
      /* @__PURE__ */ jsx(
        "h3",
        {
          className: "mt-5 font-partners-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-tight tracking-[-0.025em] text-partners-charcoal",
          children: active.title
        },
        `title-${active.id}-${cycle}`
      ),
      /* @__PURE__ */ jsx(
        "nav",
        {
          className: "mt-4 inline-flex items-center gap-0.5 rounded-full bg-[#141414] p-1",
          role: "tablist",
          "aria-label": copy.capabilities.heading,
          children: capabilities.map((item, i) => {
            const on = i === index;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": on,
                "aria-label": item.title,
                onClick: () => scrollToSlide(i),
                className: cx(
                  "relative flex h-8 min-w-[2.4rem] items-center justify-center rounded-full border-0 px-2.5",
                  "font-partners text-[11px] font-bold tabular-nums tracking-[0.08em] outline-none select-none transition duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[#ff6b2c]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  on ? "bg-[#2c2c2c] text-white" : "bg-transparent text-white/50 hover:bg-white/[0.04] hover:text-white/85"
                ),
                children: String(i + 1).padStart(2, "0")
              },
              item.id
            );
          })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "partners-caps__scroll-hint", children: /* @__PURE__ */ jsx(
        ScrollFingerHint,
        {
          bare: true,
          visible: showScrollHint && !reduced,
          variant: "dark",
          label: isRu ? "Листайте — появятся сцены" : "Scroll — scenes play"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "partners-caps__track", "aria-hidden": true, children: /* @__PURE__ */ jsx("span", { ref: walkerRef, className: "partners-caps__track-walker", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 76", width: "52", height: "62", fill: "none", children: [
      /* @__PURE__ */ jsx("g", { className: "partners-caps__arm partners-caps__arm--back", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18 24c-7 2.5-11 10-10.5 17",
          stroke: "#1a1a1a",
          strokeWidth: "3",
          strokeLinecap: "round"
        }
      ) }),
      /* @__PURE__ */ jsxs("g", { className: "partners-caps__walker-body", children: [
        /* @__PURE__ */ jsx("rect", { x: "14", y: "8", width: "36", height: "36", rx: "10", fill: "#1a1a1a" }),
        /* @__PURE__ */ jsx("circle", { cx: "36", cy: "20", r: "2.6", fill: "#ff6b2c" }),
        /* @__PURE__ */ jsx("circle", { cx: "44", cy: "20", r: "2.6", fill: "#ff6b2c" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M35.5 28c2.2 2.6 6.4 2.6 8.6 0",
            stroke: "#ff6b2c",
            strokeWidth: "2.2",
            strokeLinecap: "round"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("g", { className: "partners-caps__arm partners-caps__arm--front", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M50 24c7 2.5 11 10 10.5 17",
          stroke: "#1a1a1a",
          strokeWidth: "3",
          strokeLinecap: "round"
        }
      ) }),
      /* @__PURE__ */ jsxs("g", { className: "partners-caps__leg partners-caps__leg--l", children: [
        /* @__PURE__ */ jsx("path", { d: "M26 44v16", stroke: "#1a1a1a", strokeWidth: "2.8", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "29", cy: "63", rx: "6.2", ry: "3.8", fill: "#ff6b2c" })
      ] }),
      /* @__PURE__ */ jsxs("g", { className: "partners-caps__leg partners-caps__leg--r", children: [
        /* @__PURE__ */ jsx("path", { d: "M38 44v16", stroke: "#1a1a1a", strokeWidth: "2.8", strokeLinecap: "round" }),
        /* @__PURE__ */ jsx("ellipse", { cx: "41", cy: "63", rx: "6.2", ry: "3.8", fill: "#ff6b2c" })
      ] })
    ] }) }) })
  ] });
  if (reduced) {
    return /* @__PURE__ */ jsxs("div", { className: "partners-caps-scene partners-caps-scene--static", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-10 max-w-[36rem] text-center", children: /* @__PURE__ */ jsxs(
        "h2",
        {
          id: "partners-caps",
          className: "font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-partners-ink text-balance",
          children: [
            copy.capabilities.h2Before,
            " ",
            /* @__PURE__ */ jsx("span", { className: "mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#ff6b2c] px-3 py-1 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle", children: copy.capabilities.h2Pill }),
            " ",
            copy.capabilities.h2After
          ]
        }
      ) }),
      card
    ] });
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: pinRef,
      className: "partners-caps-pin",
      style: { height: `${100 + total * 72}vh` },
      children: /* @__PURE__ */ jsx("div", { className: "partners-caps-sticky", children: /* @__PURE__ */ jsxs("div", { ref: stageRef, className: "partners-caps-stage", style: { ["--caps-expand"]: 0 }, children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 max-w-[34rem] px-5 text-center sm:mb-4 sm:px-8", children: /* @__PURE__ */ jsxs(
          "h2",
          {
            id: "partners-caps",
            className: "font-partners-display text-[clamp(1.35rem,3vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.02em] text-partners-ink text-balance",
            children: [
              copy.capabilities.h2Before,
              " ",
              /* @__PURE__ */ jsx("span", { className: "mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#ff6b2c] px-2.5 py-0.5 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle", children: copy.capabilities.h2Pill }),
              " ",
              copy.capabilities.h2After
            ]
          }
        ) }),
        card
      ] }) })
    }
  );
}
function DiscussPanel() {
  const { lang } = useLang();
  const copy = getPartnersCopy(lang);
  return /* @__PURE__ */ jsxs("div", { className: "partners-bento__discuss", children: [
    /* @__PURE__ */ jsx("p", { className: "partners-bento__discuss-label", children: copy.discuss.label }),
    /* @__PURE__ */ jsxs("div", { className: "partners-bento__discuss-btns", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: PARTNER_AGENCY_TELEGRAM_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "partners-bento__discuss-btn partners-bento__discuss-btn--tg",
          "aria-label": copy.discuss.ask,
          children: [
            /* @__PURE__ */ jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { d: "M21.5 3.6 2.9 11.1c-1.3.5-1.3 1.3-.2 1.6l4.7 1.5 1.8 5.5c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.9L22.9 5c.3-1.2-.4-1.8-1.4-1.4ZM9.2 14.5l-.3 3.3 1.3-1.7 8-7.6-9 5.9Z" }) }),
            "Telegram"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: PARTNERS_GMAIL_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "partners-bento__discuss-btn partners-bento__discuss-btn--mail",
          children: [
            /* @__PURE__ */ jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx("rect", { x: "3.5", y: "5.5", width: "17", height: "13", rx: "2.2", stroke: "currentColor", strokeWidth: "1.8" }),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "m4.5 7.5 7.5 5.2L19.5 7.5",
                  stroke: "currentColor",
                  strokeWidth: "1.8",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            ] }),
            "Gmail"
          ]
        }
      )
    ] })
  ] });
}
function BentoEstimateUi({ pill }) {
  return /* @__PURE__ */ jsx("div", { className: "partners-bento__secure", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-bento__secure-pill", children: [
    /* @__PURE__ */ jsx("span", { className: "partners-bento__secure-check", children: "✓" }),
    /* @__PURE__ */ jsx("span", { children: pill })
  ] }) });
}
function BentoReferralUi() {
  const { lang } = useLang();
  const chip = lang === "ru" ? "после оплаты" : "after payment";
  return /* @__PURE__ */ jsxs("div", { className: "partners-bento__fun", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxs("div", { className: "partners-bento__fun-row", children: [
      /* @__PURE__ */ jsx("span", { className: "partners-bento__orb partners-bento__orb--o", style: { background: "#ff8a4c" }, children: "✉" }),
      /* @__PURE__ */ jsx("span", { className: "partners-bento__orb partners-bento__orb--mid", style: { background: "#0086fc" }, children: "🤝" }),
      /* @__PURE__ */ jsx("span", { className: "partners-bento__orb", style: { background: "#00ca48" }, children: "$" }),
      /* @__PURE__ */ jsx("span", { className: "partners-bento__orb", style: { background: "#ff58ae" }, children: "◎" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "partners-bento__fun-chip", children: chip })
  ] });
}
function BentoWhiteLabelUi() {
  const { lang } = useLang();
  const label = lang === "ru" ? "Ваш бренд" : "Your brand";
  const sub = lang === "ru" ? "~ наценка ваша" : "~ your markup";
  return /* @__PURE__ */ jsx("div", { className: "partners-bento__power", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-bento__power-card", children: [
    /* @__PURE__ */ jsx("span", { className: "partners-bento__power-i", children: "i" }),
    /* @__PURE__ */ jsxs("div", { className: "partners-bento__power-copy", children: [
      /* @__PURE__ */ jsx("strong", { children: label }),
      /* @__PURE__ */ jsx("em", { children: sub })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "partners-bento__power-meter", "aria-hidden": true, children: [
      /* @__PURE__ */ jsx("i", { className: "is-blue" }),
      /* @__PURE__ */ jsx("i", { className: "is-amber" }),
      /* @__PURE__ */ jsx("i", { className: "is-fire", children: "🔥" })
    ] })
  ] }) });
}
function ExampleMoneyFlow() {
  const { lang } = useLang();
  const ui = getPartnersCopy(lang).ui;
  return /* @__PURE__ */ jsx("div", { className: "partners-money", "aria-hidden": true, children: /* @__PURE__ */ jsx("div", { className: "partners-money__zoom", children: /* @__PURE__ */ jsxs("div", { className: "partners-money__track", children: [
    /* @__PURE__ */ jsxs("div", { className: "partners-money__node partners-money__node--client", "data-step": "1", children: [
      /* @__PURE__ */ jsx("span", { className: "partners-money__label", children: ui.client }),
      /* @__PURE__ */ jsx("span", { className: "partners-money__sum", children: "−$2200" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "partners-money__rail partners-money__rail--1", children: /* @__PURE__ */ jsx("span", { className: "partners-money__dot partners-money__dot--1", children: "$" }) }),
    /* @__PURE__ */ jsxs("div", { className: "partners-money__node partners-money__node--you", "data-step": "2", children: [
      /* @__PURE__ */ jsx("span", { className: "partners-money__label", children: ui.you }),
      /* @__PURE__ */ jsx("span", { className: "partners-money__sum partners-money__sum--keep", children: "+$700" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "partners-money__rail partners-money__rail--2", children: /* @__PURE__ */ jsx("span", { className: "partners-money__dot partners-money__dot--2", children: "$" }) }),
    /* @__PURE__ */ jsxs("div", { className: "partners-money__node partners-money__node--tvx", "data-step": "3", children: [
      /* @__PURE__ */ jsx("span", { className: "partners-money__label", children: "TIVONIX" }),
      /* @__PURE__ */ jsx("span", { className: "partners-money__sum partners-money__sum--tvx", children: "$1500" })
    ] })
  ] }) }) });
}
function ModelExampleReferral() {
  const { lang } = useLang();
  const ui = getPartnersCopy(lang).ui;
  return /* @__PURE__ */ jsxs("div", { className: "partners-ex partners-ex--ref", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxs("div", { className: "partners-ex__flow", children: [
      /* @__PURE__ */ jsxs("div", { className: "partners-ex__step partners-ex__step--1", children: [
        /* @__PURE__ */ jsx("span", { className: "partners-ex__who", children: ui.client }),
        /* @__PURE__ */ jsx("strong", { className: "partners-ex__sum", children: "$2500" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "partners-ex__arrow partners-ex__arrow--a" }),
      /* @__PURE__ */ jsxs("div", { className: "partners-ex__step partners-ex__step--2", children: [
        /* @__PURE__ */ jsx("span", { className: "partners-ex__who", children: ui.youPct }),
        /* @__PURE__ */ jsx("strong", { className: "partners-ex__sum partners-ex__sum--you", children: "+$375" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "partners-ex__arrow partners-ex__arrow--b" }),
      /* @__PURE__ */ jsxs("div", { className: "partners-ex__step partners-ex__step--3", children: [
        /* @__PURE__ */ jsx("span", { className: "partners-ex__who", children: "TIVONIX" }),
        /* @__PURE__ */ jsx("strong", { className: "partners-ex__sum", children: "$2125" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "partners-ex__bar", children: /* @__PURE__ */ jsx("i", { className: "partners-ex__fill" }) })
  ] });
}
function ModelExampleWhiteLabel() {
  const { lang } = useLang();
  const ui = getPartnersCopy(lang).ui;
  return /* @__PURE__ */ jsx("div", { className: "partners-ex partners-ex--wl", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-ex__stack", children: [
    /* @__PURE__ */ jsxs("div", { className: "partners-ex__card partners-ex__card--tvx", children: [
      /* @__PURE__ */ jsx("span", { children: ui.estimate }),
      /* @__PURE__ */ jsx("strong", { children: "$1500" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "partners-ex__card partners-ex__card--you", children: [
      /* @__PURE__ */ jsx("span", { children: ui.markup }),
      /* @__PURE__ */ jsx("strong", { children: "+$700" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "partners-ex__card partners-ex__card--client", children: [
      /* @__PURE__ */ jsx("span", { children: ui.clientPrice }),
      /* @__PURE__ */ jsx("strong", { children: "$2200" })
    ] })
  ] }) });
}
function PartnersFooterRunner() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 64 76", width: "48", height: "58", fill: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxs("g", { className: "partners-footer__arm partners-footer__arm--back", children: [
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M18 28H2",
          stroke: "#1a1a1a",
          strokeWidth: "3",
          strokeLinecap: "round"
        }
      ),
      /* @__PURE__ */ jsx("circle", { cx: "2", cy: "28", r: "3.2", fill: "#ff6b2c" })
    ] }),
    /* @__PURE__ */ jsxs("g", { className: "partners-footer__body", children: [
      /* @__PURE__ */ jsx("rect", { x: "14", y: "8", width: "36", height: "36", rx: "10", fill: "#1a1a1a" }),
      /* @__PURE__ */ jsx("circle", { cx: "36", cy: "20", r: "2.6", fill: "#ff6b2c" }),
      /* @__PURE__ */ jsx("circle", { cx: "44", cy: "20", r: "2.6", fill: "#ff6b2c" }),
      /* @__PURE__ */ jsx(
        "path",
        {
          d: "M35.5 28c2.2 2.6 6.4 2.6 8.6 0",
          stroke: "#ff6b2c",
          strokeWidth: "2.2",
          strokeLinecap: "round"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("g", { className: "partners-footer__arm partners-footer__arm--front", children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M50 24c7 2.5 11 10 10.5 17",
        stroke: "#1a1a1a",
        strokeWidth: "3",
        strokeLinecap: "round"
      }
    ) }),
    /* @__PURE__ */ jsxs("g", { className: "partners-footer__leg partners-footer__leg--l", children: [
      /* @__PURE__ */ jsx("path", { d: "M26 44v16", stroke: "#1a1a1a", strokeWidth: "2.8", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("ellipse", { cx: "29", cy: "63", rx: "6.2", ry: "3.8", fill: "#ff6b2c" })
    ] }),
    /* @__PURE__ */ jsxs("g", { className: "partners-footer__leg partners-footer__leg--r", children: [
      /* @__PURE__ */ jsx("path", { d: "M38 44v16", stroke: "#1a1a1a", strokeWidth: "2.8", strokeLinecap: "round" }),
      /* @__PURE__ */ jsx("ellipse", { cx: "41", cy: "63", rx: "6.2", ry: "3.8", fill: "#ff6b2c" })
    ] })
  ] });
}
function PartnersFooter() {
  const { lang } = useLang();
  const copy = getPartnersCopy(lang);
  const line = copy.footer.marquee;
  const docs = PARTNERS_DOCS[lang];
  const loginUrl = partnerPanelLoginUrl();
  return /* @__PURE__ */ jsxs("footer", { id: "site-footer", className: "partners-footer", children: [
    /* @__PURE__ */ jsx("div", { className: "partners-footer__scene", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-footer__tow", children: [
      /* @__PURE__ */ jsx("div", { className: "partners-footer__pill", children: /* @__PURE__ */ jsx("span", { className: "partners-footer__phrase", children: line }) }),
      /* @__PURE__ */ jsx("span", { className: "partners-footer__rope" }),
      /* @__PURE__ */ jsx("div", { className: "partners-footer__runner", children: /* @__PURE__ */ jsx(PartnersFooterRunner, {}) })
    ] }) }),
    /* @__PURE__ */ jsxs(Shell, { className: "partners-footer__shell", children: [
      /* @__PURE__ */ jsxs("div", { className: "partners-footer__bar", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "partners-footer__logo", "aria-label": copy.footer.homeAria, children: [
          /* @__PURE__ */ jsx("img", { src: TIVONIX_MARK, alt: "", width: 28, height: 28, decoding: "async" }),
          /* @__PURE__ */ jsx("span", { children: "TIVONIX Partners" })
        ] }),
        /* @__PURE__ */ jsxs("nav", { className: "partners-footer__nav", "aria-label": copy.footer.navAria, children: [
          /* @__PURE__ */ jsx("a", { href: "#partner-formats", children: copy.footer.formats }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: loginUrl,
              onClick: () => trackPartnersEvent("partners_login_click", { source: "footer" }),
              children: copy.footer.login
            }
          ),
          /* @__PURE__ */ jsx(Link, { to: "/projects", children: copy.footer.projects }),
          /* @__PURE__ */ jsx(Link, { to: "/contacts", children: copy.footer.contacts }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: PARTNER_AGENCY_TELEGRAM_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              children: copy.footer.askTelegram
            }
          ),
          /* @__PURE__ */ jsx("a", { href: TG_CHANNEL_URL, target: "_blank", rel: "noopener noreferrer", children: copy.footer.channel }),
          /* @__PURE__ */ jsx("a", { href: docs.privacy, target: "_blank", rel: "noopener noreferrer", "aria-label": copy.footer.privacyAria, children: copy.footer.privacy }),
          /* @__PURE__ */ jsx("a", { href: docs.consent, target: "_blank", rel: "noopener noreferrer", "aria-label": copy.footer.consentAria, children: copy.footer.consent })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "partners-footer__note", children: copy.footer.note })
    ] })
  ] });
}
function PartnersProcessVisual() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className: "partners-process__svg",
      viewBox: "0 0 440 380",
      width: "440",
      height: "380",
      fill: "none",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "148", cy: "206", r: "92", fill: "#ffe8dc" }),
        /* @__PURE__ */ jsx("circle", { cx: "302", cy: "214", r: "86", fill: "#ece9e5" }),
        /* @__PURE__ */ jsxs("g", { className: "partners-process__you", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M74 150c16-26 58-34 84-18 14 9 20 26 17 42-4 26-22 54-50 62-32 8-60-8-68-34-6-18 2-34 17-52Z",
              fill: "#ff6b2c"
            }
          ),
          /* @__PURE__ */ jsx("circle", { cx: "116", cy: "168", r: "3.4", fill: "#1a1a1a" }),
          /* @__PURE__ */ jsx("circle", { cx: "136", cy: "166", r: "3.4", fill: "#1a1a1a" }),
          /* @__PURE__ */ jsx("circle", { cx: "117.2", cy: "166.8", r: "1", fill: "#fff" }),
          /* @__PURE__ */ jsx("circle", { cx: "137.2", cy: "164.8", r: "1", fill: "#fff" }),
          /* @__PURE__ */ jsx("path", { d: "M120 178c4.5 5.5 13 5.5 17.5 0", stroke: "#1a1a1a", strokeWidth: "2.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M108 248v40", stroke: "#1a1a1a", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M132 250v38", stroke: "#1a1a1a", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("rect", { x: "95", y: "284", width: "26", height: "13", rx: "6.5", fill: "#1a1a1a" }),
          /* @__PURE__ */ jsx("rect", { x: "95", y: "293", width: "26", height: "5", rx: "2.5", fill: "#ff6b2c" }),
          /* @__PURE__ */ jsx("rect", { x: "121", y: "284", width: "26", height: "13", rx: "6.5", fill: "#1a1a1a" }),
          /* @__PURE__ */ jsx("rect", { x: "121", y: "293", width: "26", height: "5", rx: "2.5", fill: "#ff6b2c" }),
          /* @__PURE__ */ jsxs("g", { className: "partners-process__wave", children: [
            /* @__PURE__ */ jsx("path", { d: "M86 208 C62 198 52 172 64 154", stroke: "#1a1a1a", strokeWidth: "5.5", strokeLinecap: "round" }),
            /* @__PURE__ */ jsx("ellipse", { cx: "66", cy: "152", rx: "9", ry: "7.5", fill: "#1a1a1a" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("g", { className: "partners-process__tiv", children: [
          /* @__PURE__ */ jsx("rect", { x: "270", y: "146", width: "98", height: "98", rx: "26", fill: "#2a2a2a" }),
          /* @__PURE__ */ jsx("rect", { x: "282", y: "158", width: "18", height: "6", rx: "3", fill: "#3d3d3d" }),
          /* @__PURE__ */ jsx("circle", { cx: "302", cy: "184", r: "3.4", fill: "#ff6b2c" }),
          /* @__PURE__ */ jsx("circle", { cx: "326", cy: "184", r: "3.4", fill: "#ff6b2c" }),
          /* @__PURE__ */ jsx("circle", { cx: "303.2", cy: "182.8", r: "1", fill: "#fff", opacity: "0.7" }),
          /* @__PURE__ */ jsx("circle", { cx: "327.2", cy: "182.8", r: "1", fill: "#fff", opacity: "0.7" }),
          /* @__PURE__ */ jsx("path", { d: "M306 198c5 6 14 6 20 0", stroke: "#ff6b2c", strokeWidth: "2.6", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M296 244v40", stroke: "#1a1a1a", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M332 244v40", stroke: "#1a1a1a", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("rect", { x: "283", y: "280", width: "26", height: "13", rx: "6.5", fill: "#1a1a1a" }),
          /* @__PURE__ */ jsx("rect", { x: "283", y: "289", width: "26", height: "5", rx: "2.5", fill: "#ff6b2c" }),
          /* @__PURE__ */ jsx("rect", { x: "321", y: "280", width: "26", height: "13", rx: "6.5", fill: "#1a1a1a" }),
          /* @__PURE__ */ jsx("rect", { x: "321", y: "289", width: "26", height: "5", rx: "2.5", fill: "#ff6b2c" }),
          /* @__PURE__ */ jsx("path", { d: "M360 196 C382 208 390 232 378 254", stroke: "#1a1a1a", strokeWidth: "5.5", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("ellipse", { cx: "376", cy: "256", rx: "9", ry: "7.5", fill: "#1a1a1a" })
        ] }),
        /* @__PURE__ */ jsxs("g", { className: "partners-process__shake", children: [
          /* @__PURE__ */ jsx("circle", { className: "partners-process__burst", cx: "220", cy: "232", r: "34", fill: "#ff6b2c", opacity: "0.12" }),
          /* @__PURE__ */ jsx("circle", { className: "partners-process__burst partners-process__burst--2", cx: "220", cy: "232", r: "22", fill: "#ff6b2c", opacity: "0.16" }),
          /* @__PURE__ */ jsx("path", { d: "M148 206 C168 214 186 222 200 230", stroke: "#1a1a1a", strokeWidth: "6", strokeLinecap: "round" }),
          /* @__PURE__ */ jsx("path", { d: "M290 206 C270 214 252 222 238 230", stroke: "#1a1a1a", strokeWidth: "6", strokeLinecap: "round" }),
          /* @__PURE__ */ jsxs("g", { className: "partners-process__clasp", children: [
            /* @__PURE__ */ jsx("ellipse", { cx: "214", cy: "234", rx: "16", ry: "12", fill: "#1a1a1a", transform: "rotate(-18 214 234)" }),
            /* @__PURE__ */ jsx("ellipse", { cx: "226", cy: "234", rx: "16", ry: "12", fill: "#2a2a2a", transform: "rotate(18 226 234)" }),
            /* @__PURE__ */ jsx("ellipse", { cx: "220", cy: "232", rx: "10", ry: "8", fill: "#1a1a1a" }),
            /* @__PURE__ */ jsx("path", { d: "M208 228c4-3 10-3 14 0", stroke: "#ff6b2c", strokeWidth: "2.2", strokeLinecap: "round" })
          ] })
        ] })
      ]
    }
  );
}
function PartnersPage() {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const copy = getPartnersCopy(lang);
  const canonicalUrl = partnersCanonicalUrl(lang, location.pathname);
  const loginUrl = partnerPanelLoginUrl();
  const referralRegisterUrl = partnerPanelRegisterUrl("referral");
  const whiteLabelRegisterUrl = partnerPanelRegisterUrl("white_label");
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const rolesRef = useRef(null);
  const easyCardRef = useRef(null);
  const easyBgRef = useRef(null);
  const bentoRef = useRef(null);
  const moneyRef = useRef(null);
  const finalRef = useRef(null);
  const finalZoomRef = useRef(null);
  const modelsExamplesRef = useRef(null);
  useRef(null);
  const reducedMotion = useRef(false);
  const scrollToFormats = (e) => {
    e.preventDefault();
    trackPartnersEvent("partners_hero_cta_click");
    const el = document.getElementById("partner-formats");
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion.current ? "auto" : "smooth",
      block: "start"
    });
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reducedMotion.current) return;
      const hero = heroRef.current;
      const bg = bgRef.current;
      if (hero && bg) {
        const rect = hero.getBoundingClientRect();
        const travel = Math.max(hero.offsetHeight * 0.9, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        bg.style.transform = `scale(${1 + progress * 0.22})`;
      }
      const roles = rolesRef.current;
      if (roles) {
        const rect = roles.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const start = vh * 0.9;
        const end = vh * 0.15;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        const scale = 1 + progress * 0.14;
        roles.querySelectorAll(".partners-role-zoom").forEach((img) => {
          img.style.transform = `scale(${scale})`;
        });
      }
      const easy = easyCardRef.current;
      const easyBg = easyBgRef.current;
      if (easy && easyBg) {
        const rect = easy.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const start = vh * 0.95;
        const end = vh * 0.2;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        easyBg.style.transform = `scale(${1 + progress * 0.28})`;
        easy.querySelectorAll(".partners-bento__menu-row").forEach((row, i) => {
          const local = Math.min(1, Math.max(0, (progress - i * 0.14) / 0.42));
          row.style.transform = `translateY(${(1 - local) * 18}px)`;
          row.style.opacity = String(0.28 + local * 0.72);
        });
      }
      const bento = bentoRef.current;
      if (bento) {
        const vh = window.innerHeight || 1;
        bento.querySelectorAll("[data-bento-zoom]").forEach((el) => {
          const card = el.closest(".partners-bento__card");
          const target = card ?? el;
          const rect = target.getBoundingClientRect();
          const start = vh * 0.92;
          const end = vh * 0.22;
          const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          const amount = Number(el.dataset.bentoZoom) || 0.16;
          el.style.transform = `scale(${1 + progress * amount})`;
        });
        const timeline = bento.querySelector(".partners-bento__timeline");
        if (timeline) {
          const card = timeline.closest(".partners-bento__card");
          const rect = (card ?? timeline).getBoundingClientRect();
          const start = vh * 0.88;
          const end = vh * 0.28;
          const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          const stage = Math.min(2, Math.floor(progress * 3.25));
          timeline.querySelectorAll(".partners-bento__step").forEach((step, i) => {
            step.classList.toggle("is-lit", i <= stage);
            step.classList.toggle("is-now", i === stage);
          });
        }
      }
      const money = moneyRef.current;
      if (money) {
        const rect = money.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const start = vh * 0.92;
        const end = vh * 0.25;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        const zoom = money.querySelector(".partners-money__zoom");
        if (zoom) zoom.style.transform = `scale(${1 + progress * 0.18})`;
      }
      const modelsEx = modelsExamplesRef.current;
      if (modelsEx) {
        const vh = window.innerHeight || 1;
        modelsEx.querySelectorAll(".partners-models-split__zoom").forEach((el) => {
          const card = el.closest(".partners-models-split__card");
          const rect = (card ?? el).getBoundingClientRect();
          const start = vh * 0.95;
          const end = vh * 0.2;
          const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          el.style.transform = `scale(${1 + progress * 0.28})`;
        });
      }
      const finalSec = finalRef.current;
      const finalZoom = finalZoomRef.current;
      if (finalSec && finalZoom) {
        const rect = finalSec.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const start = vh * 0.95;
        const end = vh * 0.12;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        const mobile = window.innerWidth < 768;
        const from = mobile ? 1.12 : 1.38;
        const delta = mobile ? 0.2 : 0.46;
        finalZoom.style.transform = `scale(${from - progress * delta})`;
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-clip bg-partners-cream font-partners text-partners-charcoal antialiased", children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600&family=Inter:wght@400;500;600&display=swap",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx("style", { children: `
          .partners-tivonix-frame {
            border: 3.5px solid transparent;
            border-radius: 22px;
            padding: 8px;
            background:
              linear-gradient(#fbfaf9, #fbfaf9) padding-box,
              conic-gradient(
                from 210deg,
                #ff6b2c 0deg,
                #ff8b4a 70deg,
                #e0e0e0 140deg,
                #b0b0b0 200deg,
                #c8c8c8 260deg,
                #ff8b4a 320deg,
                #ff6b2c 360deg
              ) border-box;
          }
          .partners-role-media {
            overflow: hidden;
            margin-top: 0.75rem;
            margin-left: -0.25rem;
            margin-right: -0.25rem;
          }
          .partners-role-zoom {
            display: block;
            width: 100%;
            max-width: 340px;
            height: auto;
            margin-left: auto;
            margin-right: auto;
            transform-origin: center center;
            will-change: transform;
          }

          .partners-money {
            margin-top: 1.25rem;
            border-radius: 16px;
            background: #ffffff;
            padding: 1.1rem 1rem 0.9rem;
            overflow: hidden;
          }
          .partners-money__zoom {
            transform: scale(1);
            transform-origin: center center;
            will-change: transform;
            transition: none;
          }
          .partners-final__media {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-radius: 18px;
            background: #e8e4df;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            min-height: 0;
            aspect-ratio: auto;
            padding: 1rem 0.75rem;
            text-align: center;
          }
          .partners-hero__img {
            object-position: center;
            transform: scale(1.05);
            transform-origin: center center;
          }
          .partners-hero__mobile {
            width: 148%;
            max-width: none;
            margin-left: -24%;
            height: auto;
          }
          .partners-hero__mobile-wrap {
            margin-top: -4.5rem;
            padding-bottom: 0.5rem;
          }
          @media (max-width: 639px) {
            .partners-hero__mobile-wrap {
              margin-top: -5.5rem;
            }
          }
          @media (min-width: 640px) {
            .partners-final__media {
              border-radius: 22px;
              padding: 1.75rem 1.25rem;
            }
          }
          @media (min-width: 768px) {
            .partners-final__media {
              min-height: 480px;
              aspect-ratio: 16 / 10;
              padding: 2.5rem 2rem;
            }
          }
          .partners-final__zoom {
            position: absolute;
            inset: 0;
            transform: scale(1.12);
            transform-origin: center center;
            will-change: transform;
          }
          @media (min-width: 768px) {
            .partners-final__zoom {
              inset: -22%;
              transform: scale(1.38);
            }
          }
          .partners-final__zoom img {
            display: block;
            width: 100%;
            height: 100%;
            max-width: none;
            object-fit: cover;
            object-position: center;
          }
          .partners-final__copy {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 1.15rem 1rem;
            border-radius: 16px;
            background: rgba(8, 10, 12, 0.52);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            color: #fff;
            overflow-wrap: anywhere;
          }
          @media (min-width: 640px) {
            .partners-final__copy {
              max-width: 34rem;
              padding: 1.75rem 1.5rem;
              border-radius: 18px;
            }
          }
          .partners-final__copy h2 {
            color: #fff;
          }
          .partners-final__copy p {
            color: rgba(255, 255, 255, 0.92);
          }
          .partners-final__copy .partners-final__footnote {
            color: rgba(255, 255, 255, 0.72);
          }
          .partners-final__copy .partners-final__secondary {
            color: #fff;
          }
          .partners-final__actions {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          @media (min-width: 480px) {
            .partners-final__actions {
              flex-direction: row;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
              gap: 0.75rem 1.25rem;
            }
          }
          .partners-process__svg {
            display: block;
            width: min(100%, 300px);
            height: auto;
            margin: 0 auto;
            overflow: visible;
          }
          @media (min-width: 640px) {
            .partners-process__svg {
              width: min(100%, 380px);
            }
          }
          @media (min-width: 1024px) {
            .partners-process__svg {
              width: min(100%, 440px);
            }
          }

          /* Partners cream footer + running mascot */
          .partners-footer {
            position: relative;
            background: #ffffff;
            color: #1a1a1a;
            overflow: hidden;
            border: 0;
            box-shadow: none;
          }
          .partners-footer__scene {
            position: relative;
            display: flex;
            align-items: center;
            height: 150px;
            overflow: hidden;
            background: #ffffff;
            border: 0;
            box-shadow: none;
          }
          @media (min-width: 768px) {
            .partners-footer__scene {
              height: 180px;
            }
          }
          .partners-footer__tow {
            position: absolute;
            left: 0;
            top: 50%;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 0;
            width: max-content;
            white-space: nowrap;
            transform: translateY(-50%);
            animation: partners-footer-tow 16s linear infinite;
            will-change: transform;
          }
          .partners-footer__pill {
            display: inline-flex;
            align-items: center;
            flex: 0 0 auto;
            padding: 0.7rem 1.25rem 0.75rem;
            border-radius: 999px;
            background: #ff6b2c;
            border: 0;
            box-shadow: none;
          }
          .partners-footer__phrase {
            white-space: nowrap;
            font-family: "Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: clamp(0.95rem, 2.4vw, 1.35rem);
            font-weight: 650;
            letter-spacing: -0.03em;
            line-height: 1.15;
            color: #ffffff;
            user-select: none;
          }
          .partners-footer__rope {
            position: relative;
            flex: 0 0 44px;
            align-self: center;
            height: 2.5px;
            margin-top: -10px;
            margin-right: -14px;
            border-radius: 999px;
            background: #1a1a1a;
          }
          .partners-footer__runner {
            position: relative;
            flex: 0 0 auto;
            width: 52px;
            height: 62px;
            margin-left: -2px;
          }
          .partners-footer__runner svg {
            display: block;
            overflow: visible;
          }
          .partners-footer__body {
            transform-origin: 32px 36px;
            animation: partners-caps-walk-bob 0.38s ease-in-out infinite;
          }
          /* Rear arm stays locked on the rope while he walks */
          .partners-footer__arm--back {
            transform-box: fill-box;
            transform-origin: right center;
          }
          .partners-footer__arm--front {
            transform-box: fill-box;
            transform-origin: left top;
            animation: partners-caps-arm-front 0.38s ease-in-out infinite;
          }
          .partners-footer__leg--l {
            transform-box: fill-box;
            transform-origin: center top;
            animation: partners-caps-leg-l 0.38s ease-in-out infinite;
          }
          .partners-footer__leg--r {
            transform-box: fill-box;
            transform-origin: center top;
            animation: partners-caps-leg-r 0.38s ease-in-out infinite;
          }
          .partners-footer__shell {
            padding-top: 1.75rem;
            padding-bottom: 2.25rem;
            background: #ffffff;
            border: 0;
            box-shadow: none;
          }
          .partners-footer__bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 1rem 1.5rem;
          }
          .partners-footer__logo {
            display: inline-flex;
            align-items: center;
            gap: 0.65rem;
            color: #1a1a1a;
            text-decoration: none;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .partners-footer__logo img {
            display: block;
            width: 28px;
            height: 28px;
            border-radius: 8px;
          }
          .partners-footer__nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem 1.15rem;
          }
          .partners-footer__nav a {
            color: #1a1a1a;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: -0.01em;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .partners-footer__nav a:hover {
            color: #ff6b2c;
          }
          .partners-footer__note {
            margin: 1rem 0 0;
            max-width: 36rem;
            color: #ff6b2c;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: 13px;
            line-height: 1.45;
            letter-spacing: -0.01em;
          }
          @keyframes partners-footer-tow {
            0% { transform: translate3d(-100%, -50%, 0); }
            100% { transform: translate3d(100vw, -50%, 0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .partners-footer__tow,
            .partners-footer__body,
            .partners-footer__arm--front,
            .partners-footer__leg--l,
            .partners-footer__leg--r {
              animation: none !important;
            }
            .partners-footer__tow {
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          .partners-models-split {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          @media (min-width: 768px) {
            .partners-models-split {
              flex-direction: row;
              align-items: stretch;
              gap: 16px;
            }
            .partners-models-split__card {
              flex: 1 1 0;
              min-width: 0;
              transition:
                flex 0.45s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .partners-models-split:hover .partners-models-split__card {
              flex: 0.78 1 0;
            }
            .partners-models-split:hover .partners-models-split__card:hover {
              flex: 1.35 1 0;
              transform: translateY(-5px);
            }
          }
          .partners-models-split__card {
            position: relative;
            border: 0;
            border-radius: 24px;
            padding: 1.6rem 1.4rem 1.45rem;
            box-shadow: none;
            outline: none;
            overflow: hidden;
            color: #fff;
            isolation: isolate;
          }
          .partners-models-split__media {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            border-radius: inherit;
            pointer-events: none;
          }
          .partners-models-split__zoom {
            position: absolute;
            inset: -12%;
            transform: scale(1);
            transform-origin: center center;
            will-change: transform;
          }
          .partners-models-split__zoom img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
          .partners-models-split__shade {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(180deg, rgba(12, 18, 14, 0.28) 0%, rgba(12, 18, 14, 0.5) 100%);
          }
          .partners-models-split__card--wl .partners-models-split__shade {
            background:
              linear-gradient(180deg, rgba(28, 14, 8, 0.28) 0%, rgba(28, 14, 8, 0.52) 100%);
          }
          .partners-models-split__body {
            position: relative;
            z-index: 1;
          }
          .partners-models-split__card--ref {
            background: #049a5c;
          }
          .partners-models-split__card--wl {
            background: #e85516;
          }
          @media (prefers-reduced-motion: reduce) {
            .partners-models-split__zoom {
              transform: none !important;
            }
          }
          .partners-models-split__pill {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.2);
            padding: 0.35rem 0.85rem;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: -0.01em;
            color: #fff;
          }
          .partners-models-split__title {
            margin: 0.85rem 0 0;
            font-family: "Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: clamp(1.55rem, 3vw, 2rem);
            font-weight: 600;
            letter-spacing: -0.03em;
            line-height: 1.15;
            color: #fff;
          }
          .partners-models-split__text {
            margin: 0.85rem 0 0;
            max-width: 28rem;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            font-size: clamp(1.05rem, 1.8vw, 1.2rem);
            font-weight: 500;
            line-height: 1.45;
            letter-spacing: -0.015em;
            color: rgba(255, 255, 255, 0.92);
          }
          @media (min-width: 640px) {
            .partners-models-split__card {
              padding: 1.9rem 1.7rem 1.7rem;
            }
          }

          .partners-ex {
            margin-top: 1.35rem;
            border-radius: 16px;
            background: rgba(8, 10, 12, 0.52);
            padding: 1rem 0.9rem 0.85rem;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
          }
          .partners-ex__flow {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 18px minmax(0, 1fr) 18px minmax(0, 1fr);
            align-items: center;
            gap: 0.2rem;
          }
          .partners-ex__step {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
            min-height: 3.6rem;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.38);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
            padding: 0.55rem 0.3rem;
            text-align: center;
            opacity: 0.88;
            transform: scale(0.98);
          }
          .partners-ex__step--1 {
            animation: partners-ex-step 3.6s ease-in-out infinite;
          }
          .partners-ex__step--2 {
            animation: partners-ex-step 3.6s ease-in-out infinite 0.7s;
          }
          .partners-ex__step--3 {
            animation: partners-ex-step 3.6s ease-in-out infinite 1.4s;
          }
          .partners-ex__who {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
          }
          .partners-ex__sum {
            font-size: clamp(1rem, 2vw, 1.2rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #fff;
            font-variant-numeric: tabular-nums;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          }
          .partners-ex__sum--you {
            color: #b8ffd4;
          }
          .partners-ex__arrow {
            display: block;
            height: 2px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.45);
            position: relative;
            overflow: hidden;
          }
          .partners-ex__arrow::after {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 40%;
            background: #fff;
            border-radius: inherit;
            animation: partners-ex-pulse 3.6s ease-in-out infinite;
          }
          .partners-ex__arrow--b::after {
            animation-delay: 0.7s;
          }
          .partners-ex__bar {
            margin-top: 0.75rem;
            height: 8px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.28);
            overflow: hidden;
          }
          .partners-ex__fill {
            display: block;
            height: 100%;
            width: 15%;
            border-radius: inherit;
            background: #fff;
            animation: partners-ex-fill 3.6s ease-in-out infinite;
          }
          .partners-ex__stack {
            display: grid;
            gap: 0.45rem;
          }
          .partners-ex__card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.4);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
            padding: 0.7rem 0.85rem;
            opacity: 0.9;
            transform: translateY(4px);
          }
          .partners-ex__card span {
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
          }
          .partners-ex__card strong {
            font-size: clamp(1.05rem, 2vw, 1.25rem);
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #fff;
            font-variant-numeric: tabular-nums;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          }
          .partners-ex__card--tvx {
            animation: partners-ex-stack 3.8s ease-in-out infinite;
          }
          .partners-ex__card--you {
            animation: partners-ex-stack 3.8s ease-in-out infinite 0.55s;
          }
          .partners-ex__card--client {
            animation: partners-ex-stack 3.8s ease-in-out infinite 1.1s;
          }
          @keyframes partners-ex-step {
            0%, 12% { opacity: 0.88; transform: scale(0.98); }
            18%, 34% { opacity: 1; transform: scale(1.03); background: rgba(0, 0, 0, 0.55); }
            48%, 100% { opacity: 0.94; transform: scale(1); }
          }
          @keyframes partners-ex-pulse {
            0%, 15% { transform: translateX(-120%); opacity: 0; }
            25%, 45% { opacity: 1; }
            70% { transform: translateX(220%); opacity: 0; }
            100% { transform: translateX(220%); opacity: 0; }
          }
          @keyframes partners-ex-fill {
            0%, 10% { width: 8%; }
            35% { width: 15%; }
            55% { width: 100%; }
            85%, 100% { width: 15%; }
          }
          @keyframes partners-ex-stack {
            0%, 10% { opacity: 0.9; transform: translateY(4px); }
            22%, 40% { opacity: 1; transform: translateY(0); background: rgba(0, 0, 0, 0.55); }
            58%, 100% { opacity: 0.96; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .partners-models-split__card {
              transition: none !important;
              transform: none !important;
            }
            .partners-models-split:hover .partners-models-split__card,
            .partners-models-split:hover .partners-models-split__card:hover {
              flex: 1 1 0 !important;
            }
            .partners-ex__step,
            .partners-ex__card,
            .partners-ex__fill,
            .partners-ex__arrow::after {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              width: auto;
            }
            .partners-ex__fill { width: 15%; }
          }
          .partners-process__you {
            transform-origin: 120px 220px;
            animation: partners-process-float 3.8s ease-in-out infinite;
          }
          .partners-process__tiv {
            transform-origin: 320px 220px;
            animation: partners-process-float 3.8s ease-in-out infinite 0.25s;
          }
          .partners-process__shake {
            transform-origin: 220px 232px;
            animation: partners-process-handshake 2.4s ease-in-out infinite;
          }
          .partners-process__clasp {
            transform-origin: 220px 232px;
            animation: partners-process-clasp 2.4s ease-in-out infinite;
          }
          .partners-process__burst {
            transform-origin: 220px 232px;
            transform-box: fill-box;
            animation: partners-process-burst 2.4s ease-out infinite;
          }
          .partners-process__burst--2 {
            animation-delay: 0.12s;
          }
          .partners-process__wave {
            transform-origin: 318px 198px;
            animation: partners-process-wave 2.8s ease-in-out infinite;
          }
          @keyframes partners-process-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-7px); }
          }
          @keyframes partners-process-handshake {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(1.5px, -2px) rotate(-2.5deg); }
            50% { transform: translate(-1px, 1.5px) rotate(2deg); }
            75% { transform: translate(1px, -1px) rotate(-1.5deg); }
          }
          @keyframes partners-process-clasp {
            0%, 100% { transform: scale(1); }
            40% { transform: scale(1.04); }
            70% { transform: scale(0.98); }
          }
          @keyframes partners-process-burst {
            0%, 100% { transform: scale(0.85); opacity: 0.1; }
            45% { transform: scale(1.15); opacity: 0.22; }
            70% { transform: scale(1); opacity: 0.12; }
          }
          @keyframes partners-process-wave {
            0%, 100% { transform: rotate(0deg); }
            30% { transform: rotate(-14deg); }
            55% { transform: rotate(8deg); }
            75% { transform: rotate(-6deg); }
          }
          .partners-money__track {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 40px minmax(0, 1fr) 40px minmax(0, 1fr);
            align-items: center;
            gap: 0;
            width: 100%;
            max-width: 520px;
            margin: 0 auto;
          }
          .partners-money__node {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.3rem;
            min-height: 4.5rem;
            border-radius: 14px;
            border: 1.5px solid transparent;
            background: #fbfaf9;
            padding: 0.55rem 0.4rem;
            transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          }
          .partners-money__label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #7e7e7d;
          }
          .partners-money__sum {
            font-size: 16px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #343433;
            line-height: 1.1;
            transform-origin: center;
            display: inline-block;
          }
          .partners-money__sum--keep { color: #00c978; }
          .partners-money__sum--tvx { color: #ff6b2c; }

          .partners-money__rail {
            position: relative;
            height: 2px;
            width: 100%;
            border-radius: 999px;
            background: #e8e4df;
            justify-self: stretch;
          }
          .partners-money__dot {
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 2;
            display: grid;
            place-items: center;
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 999px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            opacity: 0;
            transform: translateY(-50%);
            will-change: left, opacity;
          }
          .partners-money__dot--1 {
            background: #00c978;
            animation: partners-dot-1 5.5s ease-in-out infinite;
          }
          .partners-money__dot--2 {
            background: #ff6b2c;
            animation: partners-dot-2 5.5s ease-in-out infinite;
          }

          .partners-money__node--client {
            animation: partners-lit-client 5.5s ease-in-out infinite;
          }
          .partners-money__node--you {
            animation: partners-lit-you 5.5s ease-in-out infinite;
          }
          .partners-money__node--tvx {
            animation: partners-lit-tvx 5.5s ease-in-out infinite;
          }
          .partners-money__node--client .partners-money__sum {
            animation: partners-sum-pop-client 5.5s ease-in-out infinite;
          }
          .partners-money__node--you .partners-money__sum {
            animation: partners-sum-pop-you 5.5s ease-in-out infinite;
          }
          .partners-money__node--tvx .partners-money__sum {
            animation: partners-sum-pop-tvx 5.5s ease-in-out infinite;
          }

          .partners-money__caption {
            margin: 0.9rem 0 0;
            text-align: center;
            font-size: 12px;
            line-height: 1.4;
            color: #7e7e7d;
          }

          /* Timeline 5.5s */
          @keyframes partners-dot-1 {
            0%, 12% { opacity: 0; left: 0; transform: translateY(-50%) scale(0.65); }
            15% { opacity: 1; left: 0; transform: translateY(-50%) scale(1.15); }
            33% { opacity: 1; left: calc(100% - 1.1rem); transform: translateY(-50%) scale(1.15); }
            37%, 100% { opacity: 0; left: calc(100% - 1.1rem); transform: translateY(-50%) scale(0.7); }
          }
          @keyframes partners-dot-2 {
            0%, 54% { opacity: 0; left: 0; transform: translateY(-50%) scale(0.65); }
            57% { opacity: 1; left: 0; transform: translateY(-50%) scale(1.15); }
            75% { opacity: 1; left: calc(100% - 1.1rem); transform: translateY(-50%) scale(1.15); }
            79%, 100% { opacity: 0; left: calc(100% - 1.1rem); transform: translateY(-50%) scale(0.7); }
          }
          @keyframes partners-lit-client {
            0%, 8% { border-color: transparent; background: #fbfaf9; box-shadow: none; transform: scale(1); }
            10%, 18% { border-color: #00c978; background: #f0fff7; box-shadow: 0 0 0 4px rgba(0, 201, 120, 0.18); transform: scale(1.06); }
            26%, 100% { border-color: transparent; background: #fbfaf9; box-shadow: none; transform: scale(1); }
          }
          @keyframes partners-lit-you {
            0%, 34% { border-color: transparent; background: #fbfaf9; box-shadow: none; transform: scale(1); }
            36%, 52% { border-color: #00c978; background: #f0fff7; box-shadow: 0 0 0 4px rgba(0, 201, 120, 0.2); transform: scale(1.08); }
            58%, 100% { border-color: transparent; background: #fbfaf9; box-shadow: none; transform: scale(1); }
          }
          @keyframes partners-lit-tvx {
            0%, 76% { border-color: transparent; background: #fbfaf9; box-shadow: none; transform: scale(1); }
            78%, 90% { border-color: #ff6b2c; background: #fff7f2; box-shadow: 0 0 0 4px rgba(255, 107, 44, 0.18); transform: scale(1.08); }
            96%, 100% { border-color: transparent; background: #fbfaf9; box-shadow: none; transform: scale(1); }
          }
          @keyframes partners-sum-pop-client {
            0%, 8% { transform: scale(1); }
            10%, 18% { transform: scale(1.35); }
            26%, 100% { transform: scale(1); }
          }
          @keyframes partners-sum-pop-you {
            0%, 34% { transform: scale(1); }
            36%, 52% { transform: scale(1.4); }
            58%, 100% { transform: scale(1); }
          }
          @keyframes partners-sum-pop-tvx {
            0%, 76% { transform: scale(1); }
            78%, 90% { transform: scale(1.4); }
            96%, 100% { transform: scale(1); }
          }

          @media (max-width: 639px) {
            .partners-money__track {
              grid-template-columns: minmax(0, 1fr) 28px minmax(0, 1fr) 28px minmax(0, 1fr);
              max-width: 100%;
            }
            .partners-money__sum { font-size: 14px; }
            .partners-money__node { min-height: 3.9rem; padding: 0.45rem 0.25rem; }
          }

          @media (prefers-reduced-motion: reduce) {
            .partners-money__dot,
            .partners-money__node--client,
            .partners-money__node--you,
            .partners-money__node--tvx,
            .partners-money__node--client .partners-money__sum,
            .partners-money__node--you .partners-money__sum,
            .partners-money__node--tvx .partners-money__sum {
              animation: none !important;
            }
            .partners-money__dot { opacity: 0 !important; }
            .partners-money__node--you {
              border-color: #00c978;
              background: #f0fff7;
            }
            .partners-money__zoom { transform: none !important; }
            .partners-final__zoom { transform: none !important; }
            .partners-process__you,
            .partners-process__tiv,
            .partners-process__shake,
            .partners-process__clasp,
            .partners-process__burst,
            .partners-process__wave {
              animation: none !important;
            }
          }

          /* Video + after-registration */
          .partners-video {
            margin: 0 auto;
            width: 100%;
            max-width: 920px;
            aspect-ratio: 16 / 9;
            overflow: hidden;
            border-radius: 18px;
            border: 1.5px solid rgba(26, 26, 26, 0.08);
            background: #e8e4df;
          }
          .partners-video__el {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            background: #1a1a1a;
          }
          .partners-after-reg__grid {
            display: grid;
            gap: 12px;
            grid-template-columns: 1fr;
          }
          @media (min-width: 700px) {
            .partners-after-reg__grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          @media (min-width: 1100px) {
            .partners-after-reg__grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          .partners-after-reg__card {
            display: flex;
            flex-direction: column;
            gap: 0.45rem;
            border-radius: 20px;
            background: #ffffff;
            padding: 1.15rem 1.2rem 1.25rem;
          }
          .partners-after-reg__num {
            display: grid;
            place-items: center;
            width: 1.75rem;
            height: 1.75rem;
            border-radius: 999px;
            background: #ff6b2c;
            color: #fff;
            font-size: 13px;
            font-weight: 700;
          }
          .partners-after-reg__t {
            margin: 0;
            font-size: clamp(1.05rem, 2vw, 1.2rem);
            font-weight: 600;
            letter-spacing: -0.02em;
            color: #1a1a1a;
            line-height: 1.2;
          }
          .partners-after-reg__d {
            margin: 0;
            font-size: 14px;
            line-height: 1.45;
            color: #5c564e;
          }

          /* ——— Models bento (Family-like) ——— */
          .partners-bento {
            display: grid;
            gap: 12px;
            grid-template-columns: 1fr;
          }
          @media (min-width: 900px) {
            .partners-bento {
              grid-template-columns: 1.1fr 1fr 1fr;
              grid-template-rows: auto auto;
            }
            .partners-bento__easy {
              grid-row: 1 / span 2;
            }
          }
          .partners-bento__card {
            display: flex;
            flex-direction: column;
            border-radius: 24px;
            background: #ffffff;
            padding: 1.25rem 1.2rem 1.35rem;
            overflow: hidden;
          }
          .partners-bento__viz {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            min-height: 176px;
            margin-bottom: 1.1rem;
            overflow: hidden;
            border-radius: 18px;
            background: #f4f2ef;
            padding: 0.85rem 0.7rem;
          }
          .partners-bento__zoom {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            transform: scale(1);
            transform-origin: center center;
            will-change: transform;
          }
          .partners-bento__title {
            font-size: clamp(1.2rem, 2.4vw, 1.45rem);
            font-weight: 600;
            letter-spacing: -0.025em;
            color: #1a1a1a;
            line-height: 1.15;
          }
          .partners-bento__text {
            margin-top: 0.5rem;
            font-size: 14px;
            line-height: 1.5;
            color: #5c564e;
          }
          /* Family-style light viz pieces (no dark grey slabs) */
          .partners-bento__secure {
            display: grid;
            place-items: center;
            width: 100%;
            min-height: 7rem;
          }
          .partners-bento__secure-pill {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            border-radius: 999px;
            background: #00ca48;
            color: #fff;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: -0.02em;
            padding: 0.75rem 1.15rem 0.75rem 0.75rem;
            box-shadow: 0 0 0 4px rgba(0, 202, 72, 0.18);
          }
          .partners-bento__secure-check {
            display: grid;
            place-items: center;
            width: 1.55rem;
            height: 1.55rem;
            border-radius: 999px;
            background: #fff;
            color: #00ca48;
            font-size: 12px;
            font-weight: 800;
            line-height: 1;
          }
          .partners-bento__fast {
            width: 100%;
            max-width: 240px;
            margin: 0 auto;
            border-radius: 16px;
            background: #fff;
            padding: 1rem 1rem 0.95rem;
            box-shadow: 0 10px 28px rgba(26, 26, 26, 0.08);
          }
          .partners-bento__fast .partners-bento__timeline {
            max-width: none;
            gap: 0.7rem;
          }
          .partners-bento__fast .partners-bento__step {
            opacity: 0.4;
          }
          .partners-bento__fast .partners-bento__step.is-lit {
            opacity: 1;
          }
          .partners-bento__fast .partners-bento__step-t {
            color: #0086fc;
            font-weight: 700;
          }
          .partners-bento__fast .partners-bento__step-d {
            color: #8a8278;
          }
          .partners-bento__fast .partners-bento__step-dot {
            border-color: #b8d9ff;
            background: #fff;
          }
          .partners-bento__fast .partners-bento__step.is-lit .partners-bento__step-dot {
            border-color: #0086fc;
            background: #0086fc;
            box-shadow: none;
            position: relative;
          }
          .partners-bento__fast .partners-bento__step.is-lit .partners-bento__step-dot::after {
            content: "✓";
            position: absolute;
            inset: 0;
            display: grid;
            place-items: center;
            color: #fff;
            font-size: 8px;
            font-weight: 800;
            line-height: 1;
          }
          .partners-bento__fun {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.85rem;
            width: 100%;
          }
          .partners-bento__fun-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
          }
          .partners-bento__orb {
            display: grid;
            place-items: center;
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 999px;
            color: #fff;
            font-size: 1rem;
            font-weight: 800;
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
            transform: scale(0.92);
          }
          .partners-bento__orb--mid {
            width: 3.15rem;
            height: 3.15rem;
            font-size: 1.25rem;
            transform: scale(1);
            z-index: 1;
          }
          .partners-bento__orb--o {
            background: #ff6b2c !important;
          }
          .partners-bento__fun-chip {
            display: inline-flex;
            border-radius: 999px;
            background: #ff6b2c;
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            padding: 0.4rem 0.75rem;
          }
          .partners-bento__power {
            width: 100%;
            display: grid;
            place-items: center;
          }
          .partners-bento__power-card {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            align-items: center;
            gap: 0.75rem;
            width: 100%;
            max-width: 250px;
            border-radius: 16px;
            background: #fff;
            padding: 0.85rem 0.9rem;
            box-shadow: 0 10px 28px rgba(26, 26, 26, 0.08);
          }
          .partners-bento__power-i {
            display: grid;
            place-items: center;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 999px;
            background: #eeeae4;
            color: #8a8278;
            font-size: 11px;
            font-weight: 800;
            font-style: italic;
          }
          .partners-bento__power-copy {
            display: flex;
            min-width: 0;
            flex-direction: column;
            gap: 0.15rem;
          }
          .partners-bento__power-copy strong {
            font-size: 14px;
            font-weight: 700;
            color: #1a1a1a;
            letter-spacing: -0.02em;
          }
          .partners-bento__power-copy em {
            font-style: normal;
            font-size: 12px;
            color: #8a8278;
          }
          .partners-bento__power-meter {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.3rem;
            border-radius: 999px;
            background: #f4f2ef;
            padding: 0.45rem 0.35rem;
          }
          .partners-bento__power-meter i {
            display: block;
            width: 0.45rem;
            height: 0.45rem;
            border-radius: 999px;
            background: #cfc8c0;
            font-style: normal;
          }
          .partners-bento__power-meter i.is-blue { background: #0086fc; }
          .partners-bento__power-meter i.is-amber { background: #ffb020; }
          .partners-bento__power-meter i.is-fire {
            width: auto;
            height: auto;
            background: transparent;
            font-size: 11px;
            line-height: 1;
          }

          /* Tall card with stage image bg + scroll zoom */
          .partners-bento__easy {
            position: relative;
            color: #fff;
            padding: 1rem;
            background: #121212;
            min-height: 100%;
            overflow: hidden;
          }
          .partners-bento__easy-bg {
            position: absolute;
            inset: -12%;
            z-index: 0;
            background: url("${PARTNERS_EASY_BG}") center / cover no-repeat;
            transform: scale(1);
            transform-origin: center center;
            will-change: transform;
            pointer-events: none;
          }
          .partners-bento__easy-bg::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(10, 10, 10, 0.35) 0%, rgba(10, 10, 10, 0.72) 100%);
          }
          .partners-bento__easy-body {
            position: relative;
            z-index: 1;
            display: flex;
            flex: 1;
            flex-direction: column;
            height: 100%;
            min-height: 280px;
          }
          .partners-bento__menu {
            display: grid;
            gap: 8px;
            width: 100%;
          }
          .partners-bento__menu-row {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            border-radius: 14px;
            background: #3a3a3a;
            padding: 0.7rem 0.8rem;
            opacity: 1;
            transform: translateY(0);
            will-change: transform, opacity;
            animation: partners-menu-pulse 5.2s ease-in-out infinite;
          }
          .partners-bento__menu-row:nth-child(1) { animation-delay: 0s; }
          .partners-bento__menu-row:nth-child(2) { animation-delay: 1.3s; }
          .partners-bento__menu-row:nth-child(3) { animation-delay: 2.6s; }
          .partners-bento__menu-row:nth-child(4) { animation-delay: 3.9s; }
          .partners-bento__menu-ico {
            display: grid;
            place-items: center;
            width: 2.35rem;
            height: 2.35rem;
            border-radius: 999px;
            color: #fff;
            flex-shrink: 0;
          }
          .partners-bento__menu-ico svg {
            display: block;
          }
          .partners-bento__menu-copy {
            display: flex;
            min-width: 0;
            flex-direction: column;
            gap: 2px;
          }
          .partners-bento__menu-t {
            display: block;
            font-size: 15px;
            font-weight: 600;
            color: #fbfaf9;
            line-height: 1.2;
          }
          .partners-bento__menu-d {
            display: block;
            font-size: 12px;
            color: rgba(255,255,255,0.62);
            line-height: 1.3;
          }
          .partners-bento__easy-foot {
            margin-top: auto;
            padding-top: 1.35rem;
          }
          .partners-bento__easy .partners-bento__title {
            color: #fbfaf9;
            margin: 0;
          }
          .partners-bento__easy .partners-bento__text {
            color: rgba(255,255,255,0.72);
          }

          @keyframes partners-menu-pulse {
            0%, 14%, 100% { background: #3a3a3a; }
            18%, 32% { background: #4a4a4a; }
            40% { background: #3a3a3a; }
          }

          /* Green estimating pill */
          .partners-bento__pill {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            border-radius: 999px;
            background: #00ca48;
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            padding: 0.45rem 0.7rem;
            box-shadow: 0 0 0 0 rgba(0, 202, 72, 0.35);
            animation: partners-pill-glow 2.4s ease-in-out infinite;
          }
          .partners-bento__spin {
            width: 0.85rem;
            height: 0.85rem;
            border-radius: 999px;
            border: 2px solid rgba(255,255,255,0.35);
            border-top-color: #fff;
            animation: partners-spin 0.85s linear infinite;
          }
          @keyframes partners-spin { to { transform: rotate(360deg); } }
          @keyframes partners-pill-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0, 202, 72, 0.2); }
            50% { box-shadow: 0 0 0 8px rgba(0, 202, 72, 0); }
          }

          /* Status timeline — scroll-scrubbed */
          .partners-bento__timeline {
            display: grid;
            gap: 0.85rem;
            width: 100%;
            max-width: 200px;
          }
          .partners-bento__step {
            display: grid;
            grid-template-columns: 1rem minmax(0, 1fr);
            gap: 0.65rem;
            align-items: start;
            opacity: 0.34;
            transition: opacity 0.35s ease;
          }
          .partners-bento__step.is-lit {
            opacity: 1;
          }
          .partners-bento__step-dot {
            width: 0.7rem;
            height: 0.7rem;
            margin-top: 0.28rem;
            border-radius: 999px;
            border: 2px solid rgba(255,255,255,0.35);
            background: transparent;
            transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
          }
          .partners-bento__step.is-lit:nth-child(1) .partners-bento__step-dot,
          .partners-bento__step.is-lit:nth-child(3) .partners-bento__step-dot {
            border-color: #00c978;
            background: #00c978;
          }
          .partners-bento__step.is-lit:nth-child(2) .partners-bento__step-dot,
          .partners-bento__step.is-now:nth-child(2) .partners-bento__step-dot {
            border-color: #0086fc;
            background: #0086fc;
          }
          .partners-bento__step.is-now .partners-bento__step-dot {
            box-shadow: 0 0 0 4px rgba(255, 107, 44, 0.18);
          }
          .partners-bento__step.is-now:nth-child(2) .partners-bento__step-dot {
            box-shadow: 0 0 0 4px rgba(0, 134, 252, 0.22);
          }
          .partners-bento__step-copy {
            display: flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }
          .partners-bento__step-t {
            font-size: 14px;
            font-weight: 600;
            color: #343433;
            line-height: 1.2;
          }
          .partners-bento__step-d {
            font-size: 12px;
            color: #7a7672;
            line-height: 1.3;
          }

          /* Model icons (Referral / White-label) — animated */
          .partners-ico {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            height: 88px;
          }
          .partners-ico--referral {
            gap: 0.7rem;
            min-width: 180px;
          }
          .partners-ico__person {
            display: grid;
            place-items: center;
            width: 46px;
            height: 46px;
            border-radius: 999px;
            background: #e8e4df;
            flex-shrink: 0;
          }
          .partners-ico__rail {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 22px;
            flex-shrink: 0;
            overflow: visible;
          }
          .partners-ico--referral .partners-ico__arrow-svg {
            display: block;
            animation: partners-ico-arrow 1.6s ease-in-out infinite;
          }
          .partners-ico__mark {
            display: block;
            width: 44px;
            height: 44px;
            border-radius: 11px;
            object-fit: cover;
            flex-shrink: 0;
          }
          @keyframes partners-ico-arrow {
            0%, 100% { transform: translateX(-6px); opacity: 0.35; }
            45%, 55% { transform: translateX(6px); opacity: 1; }
          }

          .partners-ico--wl {
            position: relative;
            width: 132px;
            height: 92px;
            isolation: isolate;
          }
          .partners-ico__card {
            position: absolute;
            width: 76px;
            height: 58px;
            border-radius: 14px;
          }
          .partners-ico__card--back {
            left: 10px;
            top: 12px;
            display: grid;
            place-items: center;
            background: #121212;
            transform: rotate(-8deg);
            z-index: 1;
            overflow: hidden;
          }
          .partners-ico__mark--wl {
            width: 36px;
            height: 36px;
            border-radius: 9px;
            object-fit: cover;
          }
          .partners-ico__card--front {
            left: 46px;
            top: 24px;
            z-index: 2;
            background: #ffffff;
            box-shadow: inset 0 0 0 1.5px #d4d0cb;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 12px;
            animation: partners-ico-cover 2.8s ease-in-out infinite;
            will-change: transform;
          }
          .partners-ico__shield {
            display: grid;
            place-items: center;
            line-height: 0;
          }
          @keyframes partners-ico-cover {
            0%, 14% { transform: translate(22px, 6px); }
            38%, 62% { transform: translate(-14px, -4px); }
            100% { transform: translate(22px, 6px); }
          }

          @media (prefers-reduced-motion: reduce) {
            .partners-ico--referral .partners-ico__arrow-svg,
            .partners-ico__card--front {
              animation: none !important;
            }
            .partners-ico--referral .partners-ico__arrow-svg {
              opacity: 1;
              transform: none;
            }
            .partners-ico__card--front {
              transform: translate(-6px, 0);
            }
          }

          .partners-bento__cta {
            margin-top: 0.9rem;
          }

          /* Hover discuss panel + darken card behind */
          .partners-bento__hover {
            position: relative;
            isolation: isolate;
          }
          .partners-bento__hover::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 2;
            border-radius: inherit;
            background: rgba(18, 18, 18, 0);
            transition: background 0.28s ease;
            pointer-events: none;
          }
          .partners-bento__hover:hover::before,
          .partners-bento__hover:focus-within::before {
            background: rgba(18, 18, 18, 0.42);
          }
          .partners-bento__discuss {
            position: absolute;
            left: 0.75rem;
            right: 0.75rem;
            bottom: 0.75rem;
            z-index: 10;
            display: flex;
            flex-direction: column;
            gap: 0.55rem;
            border-radius: 14px;
            background: #ffffff;
            padding: 0.85rem;
            transform: translateY(calc(100% + 1rem));
            opacity: 0;
            pointer-events: none;
            transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease;
          }
          .partners-bento__hover:hover .partners-bento__discuss,
          .partners-bento__hover:focus-within .partners-bento__discuss {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .partners-bento__discuss-label {
            margin: 0;
            text-align: center;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #7e7e7d;
          }
          .partners-bento__discuss-btns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.45rem;
          }
          .partners-bento__discuss-btn {
            position: relative;
            z-index: 1;
            display: inline-flex;
            min-height: 2.5rem;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            border-radius: 999px;
            padding: 0.45rem 0.65rem;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: -0.01em;
            text-decoration: none;
            pointer-events: auto;
            transition: filter 0.2s ease, background 0.2s ease;
          }
          .partners-bento__discuss-btn--tg {
            background: #121212;
            color: #fbfaf9;
          }
          .partners-bento__discuss-btn--tg:hover {
            filter: brightness(1.12);
          }
          .partners-bento__discuss-btn--mail {
            background: #f2f0ed;
            color: #121212;
          }
          .partners-bento__discuss-btn--mail:hover {
            background: #e8e4df;
          }
          .partners-bento__discuss-btn svg {
            flex-shrink: 0;
          }

          @media (prefers-reduced-motion: reduce) {
            .partners-bento__menu-row,
            .partners-bento__pill,
            .partners-bento__spin {
              animation: none !important;
            }
            .partners-bento__menu-row {
              opacity: 1 !important;
              transform: none !important;
            }
            .partners-bento__zoom {
              transform: none !important;
            }
            .partners-bento__step {
              opacity: 1;
            }
            .partners-bento__step:nth-child(1) .partners-bento__step-dot,
            .partners-bento__step:nth-child(3) .partners-bento__step-dot {
              border-color: #00c978;
              background: #00c978;
            }
            .partners-bento__step:nth-child(2) .partners-bento__step-dot {
              border-color: #0086fc;
              background: #0086fc;
            }
          }

          /* Capabilities banner — scroll scrub scene + walker */
          .partners-caps-pin {
            position: relative;
            width: 100%;
          }
          .partners-caps-sticky {
            position: sticky;
            top: 0;
            z-index: 20;
            display: flex;
            min-height: 100vh;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            padding: 0.75rem 0 2.5rem;
            background: #f5f2ee;
            overflow: visible;
          }
          .partners-caps-stage {
            --caps-expand: 0;
            --caps-base: min(72rem, calc(100vw - 2.5rem));
            width: calc(var(--caps-base) + (100vw - var(--caps-base) - 1rem) * var(--caps-expand));
            max-width: 100vw;
            margin: 0 auto;
            will-change: width;
            overflow: visible;
          }
          .partners-caps-stage .partners-caps {
            border-radius: calc(22px - 10px * var(--caps-expand));
            box-shadow: none;
            overflow: visible;
          }
          .partners-caps-scene--static {
            max-width: 72rem;
            margin: 0 auto;
            padding: 0 1.25rem 3rem;
          }
          @media (min-width: 640px) {
            .partners-caps-scene--static {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }
          @keyframes partners-caps-walk-bob {
            0%, 100% { transform: translateY(0) rotate(-2.5deg); }
            50% { transform: translateY(-3px) rotate(2.5deg); }
          }
          @keyframes partners-caps-leg-l {
            0%, 100% { transform: rotate(20deg); }
            50% { transform: rotate(-20deg); }
          }
          @keyframes partners-caps-leg-r {
            0%, 100% { transform: rotate(-20deg); }
            50% { transform: rotate(20deg); }
          }
          @keyframes partners-caps-arm-back {
            0%, 100% { transform: rotate(-24deg); }
            50% { transform: rotate(24deg); }
          }
          @keyframes partners-caps-arm-front {
            0%, 100% { transform: rotate(24deg); }
            50% { transform: rotate(-24deg); }
          }

          .partners-caps__track {
            position: absolute;
            left: 1rem;
            right: 1rem;
            bottom: 0.85rem;
            height: 72px;
            margin: 0;
            overflow: visible;
            pointer-events: none;
          }
          .partners-caps__scroll-hint {
            position: relative;
            z-index: 4;
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            min-height: 5.25rem;
            pointer-events: none;
          }
          .partners-caps__scroll-hint .scroll-finger-hint {
            pointer-events: auto;
          }
          .partners-caps__track-walker {
            position: absolute;
            left: 0;
            bottom: 4px;
            z-index: 2;
            display: block;
            width: 56px;
            height: 66px;
            pointer-events: none;
            will-change: left;
          }
          .partners-caps__track-walker svg {
            display: block;
            width: 56px;
            height: 66px;
            overflow: visible;
          }
          .partners-caps__walker-body {
            transform-origin: 32px 36px;
            animation: partners-caps-walk-bob 0.42s ease-in-out infinite;
          }
          .partners-caps__arm--back {
            transform-box: fill-box;
            transform-origin: right top;
            animation: partners-caps-arm-back 0.42s ease-in-out infinite;
          }
          .partners-caps__arm--front {
            transform-box: fill-box;
            transform-origin: left top;
            animation: partners-caps-arm-front 0.42s ease-in-out infinite;
          }
          .partners-caps__leg--l {
            transform-box: fill-box;
            transform-origin: center top;
            animation: partners-caps-leg-l 0.42s ease-in-out infinite;
          }
          .partners-caps__leg--r {
            transform-box: fill-box;
            transform-origin: center top;
            animation: partners-caps-leg-r 0.42s ease-in-out infinite;
          }

          .partners-caps__viz {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 300px;
            border-radius: 16px;
            background: #f3f1ee;
            overflow: hidden;
            box-shadow: none;
          }
          @media (min-width: 768px) {
            .partners-caps__viz {
              height: 340px;
            }
          }

          /* Landing — browser + form + TG */
          .partners-caps__browser {
            width: 94%;
            max-width: 360px;
            border-radius: 16px;
            background: #fff;
            box-shadow: none;
            overflow: hidden;
          }
          .partners-caps__chrome {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px 10px;
            background: #eceae7;
          }
          .partners-caps__chrome > span:not(.partners-caps__url) {
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: #cfcbc6;
            flex-shrink: 0;
          }
          .partners-caps__chrome > span:first-child { background: #ff6b2c; }
          .partners-caps__chrome > span:nth-child(2) { background: #f0b429; }
          .partners-caps__chrome > span:nth-child(3) { background: #00c978; }
          .partners-caps__url {
            flex: 1;
            margin-left: 6px;
            padding: 3px 8px;
            border-radius: 6px;
            background: #fff;
            color: #9a9a98;
            font-size: 8px;
            font-weight: 600;
            letter-spacing: -0.01em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .partners-caps__page {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 10px 12px 12px;
          }
          .partners-caps__nav {
            display: flex;
            gap: 4px;
            margin-bottom: 2px;
          }
          .partners-caps__nav i {
            display: block;
            width: 18px;
            height: 4px;
            border-radius: 999px;
            background: #e8e4df;
            font-style: normal;
          }
          .partners-caps__nav i:first-child {
            width: 28px;
            background: #121212;
          }
          .partners-caps__hero-bar {
            display: block;
            height: 9px;
            width: 78%;
            border-radius: 999px;
            background: #e8e4df;
            animation: partners-caps-pulse 2s ease-in-out infinite;
          }
          .partners-caps__hero-bar--s {
            width: 52%;
            height: 6px;
            animation-delay: 0.15s;
          }
          .partners-caps__cta-row {
            display: flex;
            gap: 6px;
            margin-top: 2px;
          }
          .partners-caps__cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 48px;
            height: 20px;
            padding: 0 10px;
            border-radius: 999px;
            background: #121212;
            color: #fff;
            font-size: 8px;
            font-weight: 700;
            animation: partners-caps-pulse 2s ease-in-out infinite 0.25s;
          }
          .partners-caps__cta--ghost {
            background: #e8e4df;
            color: #6b6560;
          }
          .partners-caps__form {
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-top: 4px;
            padding: 8px;
            border-radius: 10px;
            background: #f7f5f2;
          }
          .partners-caps__field-label {
            font-size: 7.5px;
            font-weight: 700;
            color: #9a9a98;
            letter-spacing: 0.03em;
            text-transform: uppercase;
          }
          .partners-caps__input {
            position: relative;
            display: flex;
            align-items: center;
            height: 24px;
            padding: 0 8px;
            border-radius: 7px;
            border: 1.5px solid #ddd8d2;
            background: #fff;
            font-size: 9px;
            font-weight: 600;
            color: #121212;
          }
          .partners-caps__input--phone {
            color: #9a9a98;
            animation: partners-caps-phone-fill 3.2s ease-in-out infinite;
          }
          .partners-caps__typed {
            overflow: hidden;
            white-space: nowrap;
            max-width: 0;
            animation: partners-caps-type 3.2s steps(4, end) infinite;
          }
          .partners-caps__caret {
            width: 1.5px;
            height: 12px;
            margin-left: 1px;
            background: #ff6b2c;
            flex-shrink: 0;
            animation: partners-caps-blink 1s step-end infinite;
          }
          .partners-caps__tg-chip {
            align-self: flex-end;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            margin-top: 4px;
            padding: 5px 10px;
            border-radius: 999px;
            background: #ff6b2c;
            color: #fff;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.02em;
            animation: partners-caps-fly 2.4s ease-in-out infinite;
          }

          /* Bot — chat phone */
          .partners-caps__phone {
            width: 78%;
            max-width: 260px;
            border-radius: 20px;
            background: #fff;
            box-shadow: none;
            overflow: hidden;
          }
          .partners-caps__phone-head {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 9px 11px;
            background: #121212;
            color: #fff;
          }
          .partners-caps__phone-avatar {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: #ff6b2c;
            box-shadow: 0 0 0 2px rgba(255, 107, 44, 0.35);
            animation: partners-caps-pulse 1.8s ease-in-out infinite;
          }
          .partners-caps__phone-meta {
            display: flex;
            flex-direction: column;
            gap: 1px;
          }
          .partners-caps__phone-name {
            font-size: 9.5px;
            font-weight: 700;
            letter-spacing: -0.01em;
          }
          .partners-caps__phone-status {
            font-size: 7.5px;
            font-weight: 600;
            color: #00c978;
          }
          .partners-caps__chat {
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
            min-height: 158px;
            background: #f7f5f2;
          }
          .partners-caps__msg {
            max-width: 90%;
            padding: 6px 8px;
            border-radius: 10px;
            font-size: 8.5px;
            line-height: 1.3;
            font-weight: 500;
            opacity: 0;
            animation: partners-caps-msg-in 4.8s ease-in-out infinite;
          }
          .partners-caps__msg--in {
            align-self: flex-start;
            background: #fff;
            color: #343433;
            border-bottom-left-radius: 3px;
          }
          .partners-caps__msg--out {
            align-self: flex-end;
            background: #121212;
            color: #fff;
            border-bottom-right-radius: 3px;
          }
          .partners-caps__msg--a { animation-delay: 0s; }
          .partners-caps__msg--b { animation-delay: 0.55s; }
          .partners-caps__msg--c { animation-delay: 1.1s; }
          .partners-caps__msg--d { animation-delay: 1.65s; }
          .partners-caps__msg--typing {
            display: inline-flex;
            gap: 3px;
            align-items: center;
            min-width: 36px;
            animation-delay: 2.2s;
            animation-name: partners-caps-msg-in;
          }
          .partners-caps__msg--typing i {
            width: 4px;
            height: 4px;
            border-radius: 999px;
            background: #9a9a98;
            animation: partners-caps-dot 1.1s ease-in-out infinite;
          }
          .partners-caps__msg--typing i:nth-child(2) { animation-delay: 0.15s; }
          .partners-caps__msg--typing i:nth-child(3) { animation-delay: 0.3s; }
          .partners-caps__compose {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            padding: 8px 10px;
            background: #fff;
            border-top: 1px solid #eceae7;
            color: #9a9a98;
            font-size: 8px;
            font-weight: 500;
          }
          .partners-caps__send {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: #ff6b2c;
            box-shadow: 0 0 0 0 rgba(255, 107, 44, 0.4);
            animation: partners-caps-send-pulse 2s ease-in-out infinite;
          }

          /* CRM — board */
          .partners-caps__board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            width: 96%;
            max-width: 400px;
          }
          .partners-caps__col {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 12px 10px;
            border-radius: 14px;
            background: #fff;
            min-height: 220px;
            box-shadow: none;
          }
          .partners-caps__ticket {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 3px;
            min-height: 56px;
            padding: 12px;
            border-radius: 11px;
            background: #f3f1ee;
            animation: partners-caps-ticket 2.8s ease-in-out infinite;
          }
          .partners-caps__ticket b {
            font-size: 13px;
            font-weight: 700;
            color: #121212;
            letter-spacing: -0.02em;
          }
          .partners-caps__ticket em {
            font-style: normal;
            font-size: 10px;
            font-weight: 600;
            color: #9a9a98;
          }
          .partners-caps__ticket--1 { animation-delay: 0s; }
          .partners-caps__ticket--2 { animation-delay: 0.4s; }
          .partners-caps__ticket--3 { animation-delay: 0.8s; }
          .partners-caps__ticket--quiz { animation-delay: 0.2s; opacity: 0.92; }
          .partners-caps__progress {
            height: 5px;
            margin-top: auto;
            border-radius: 999px;
            background: #eceae7;
            overflow: hidden;
          }
          .partners-caps__progress i {
            display: block;
            height: 100%;
            width: 0%;
            border-radius: 999px;
            background: #0086fc;
            animation: partners-caps-progress 3.4s ease-in-out infinite;
          }

          /* Cabinet — app shell */
          .partners-caps__app {
            display: flex;
            width: 96%;
            max-width: 360px;
            height: 250px;
            border-radius: 16px;
            background: #fff;
            overflow: hidden;
            box-shadow: none;
          }
          .partners-caps__side {
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 36px;
            padding: 12px 9px;
            background: #121212;
          }
          .partners-caps__side span {
            display: block;
            height: 7px;
            border-radius: 999px;
            background: rgba(255,255,255,0.22);
          }
          .partners-caps__side span.is-active {
            background: #ff6b2c;
            animation: partners-caps-pulse 1.8s ease-in-out infinite;
          }
          .partners-caps__main {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 7px;
            padding: 10px;
            background: #fbfaf9;
            min-width: 0;
          }
          .partners-caps__toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
          }
          .partners-caps__search {
            flex: 1;
            height: 18px;
            padding: 0 8px;
            border-radius: 999px;
            background: #e8e4df;
            color: #9a9a98;
            font-size: 8px;
            font-weight: 600;
            line-height: 18px;
          }
          .partners-caps__user-chip {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: #121212;
            flex-shrink: 0;
          }
          .partners-caps__cards {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }
          .partners-caps__dash {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 2px;
            min-height: 44px;
            padding: 8px;
            border-radius: 9px;
            background: #fff;
            border: 1px solid #eceae7;
            animation: partners-caps-pulse 2s ease-in-out infinite;
          }
          .partners-caps__dash b {
            font-size: 13px;
            font-weight: 800;
            color: #121212;
            letter-spacing: -0.03em;
            line-height: 1;
          }
          .partners-caps__dash em {
            font-style: normal;
            font-size: 8px;
            font-weight: 600;
            color: #9a9a98;
          }
          .partners-caps__dash--b { animation-delay: 0.25s; }
          .partners-caps__dash--b b { color: #049a5c; }
          .partners-caps__rows {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .partners-caps__row {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 5px 7px;
            border-radius: 7px;
            background: #fff;
            border: 1px solid #eceae7;
            font-size: 8px;
            font-weight: 600;
            color: #6b6560;
          }
          .partners-caps__row i {
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: #cfcbc6;
            flex-shrink: 0;
            font-style: normal;
          }
          .partners-caps__row.is-live {
            color: #121212;
            animation: partners-caps-row-live 2.2s ease-in-out infinite;
          }
          .partners-caps__row.is-live i {
            background: #00c978;
            box-shadow: 0 0 0 0 rgba(0, 201, 120, 0.45);
            animation: partners-caps-live-dot 1.6s ease-out infinite;
          }
          .partners-caps__pay {
            display: inline-flex;
            align-self: flex-start;
            padding: 4px 8px;
            border-radius: 999px;
            background: rgba(0, 201, 120, 0.14);
            color: #049a5c;
            font-size: 8px;
            font-weight: 700;
            animation: partners-caps-pulse 2s ease-in-out infinite 0.4s;
          }

          /* Integrations — detailed service cards + packets */
          .partners-caps__net {
            position: relative;
            width: min(100%, 310px);
            height: 220px;
          }
          .partners-caps__net-svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
          .partners-caps__link {
            stroke: #d5cfc8;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-dasharray: 6 5;
            animation: partners-caps-dash 1.4s linear infinite;
          }
          .partners-caps__packet {
            fill: #ff6b2c;
            opacity: 0;
          }
          .partners-caps__packet--1 {
            animation: partners-caps-pkt-n 2.6s ease-in-out infinite;
          }
          .partners-caps__packet--2 {
            animation: partners-caps-pkt-e 2.6s ease-in-out infinite 0.35s;
          }
          .partners-caps__packet--3 {
            animation: partners-caps-pkt-s 2.6s ease-in-out infinite 0.7s;
          }
          .partners-caps__packet--4 {
            animation: partners-caps-pkt-w 2.6s ease-in-out infinite 1.05s;
          }
          .partners-caps__hub-core {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 3;
            display: grid;
            place-items: center;
            width: 42px;
            height: 42px;
            margin: -21px 0 0 -21px;
            border-radius: 13px;
            background: #ff6b2c;
            color: #fff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: -0.02em;
            box-shadow: 0 8px 18px rgba(255, 107, 44, 0.28);
            animation: partners-caps-hub 2s ease-in-out infinite;
          }
          .partners-caps__inode {
            position: absolute;
            z-index: 3;
            display: flex;
            flex-direction: column;
            gap: 3px;
            width: 108px;
            padding: 7px 8px;
            border-radius: 12px;
            background: #fff;
            color: #121212;
            box-shadow: 0 6px 16px rgba(20, 16, 12, 0.06);
            animation: partners-caps-node-glow 2.6s ease-in-out infinite;
          }
          .partners-caps__inode-h {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-size: 8px;
            font-weight: 800;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            color: #6b645c;
          }
          .partners-caps__inode-h i {
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 2.5px;
          }
          .partners-caps__inode-h i.is-crm { background: #0086fc; }
          .partners-caps__inode-h i.is-pay { background: #00ca48; }
          .partners-caps__inode-h i.is-tg { background: #2aabee; }
          .partners-caps__inode-h i.is-tbl { background: #ff6b2c; }
          .partners-caps__inode-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 4px;
          }
          .partners-caps__inode-row b {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .partners-caps__inode-row em.is-new {
            border-radius: 999px;
            background: #fff1ea;
            color: #ff6b2c;
            font-size: 7px;
            font-style: normal;
            font-weight: 800;
            padding: 1px 5px;
          }
          .partners-caps__inode-meta {
            font-size: 7.5px;
            color: #8a8278;
            letter-spacing: -0.01em;
          }
          .partners-caps__inode-sum {
            font-size: 13px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #121212;
            line-height: 1.1;
          }
          .partners-caps__inode-card {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 8px;
            font-weight: 600;
            color: #5c564e;
            font-variant-numeric: tabular-nums;
          }
          .partners-caps__inode-chip {
            width: 14px;
            height: 10px;
            border-radius: 2px;
            background: linear-gradient(135deg, #ffb347, #ff6b2c);
          }
          .partners-caps__inode-ok {
            margin-top: 1px;
            font-size: 8px;
            font-weight: 800;
            color: #049a5c;
            animation: partners-caps-pay-ok 2.6s ease-in-out infinite 0.35s;
          }
          .partners-caps__inode-bubble {
            border-radius: 8px 8px 8px 3px;
            background: #eaf6fd;
            color: #0f3d57;
            font-size: 8.5px;
            font-weight: 700;
            letter-spacing: -0.02em;
            padding: 5px 7px;
            line-height: 1.2;
          }
          .partners-caps__inode-sheet {
            display: grid;
            gap: 2px;
          }
          .partners-caps__inode-sheet > span {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3px;
          }
          .partners-caps__inode-sheet b {
            font-size: 7px;
            font-weight: 800;
            color: #8a8278;
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }
          .partners-caps__inode-sheet em {
            border-radius: 4px;
            background: #f5f2ee;
            color: #2a2622;
            font-size: 8px;
            font-style: normal;
            font-weight: 700;
            padding: 2px 4px;
            text-align: center;
          }
          .partners-caps__inode-sheet em.is-ok {
            background: #e8f8ef;
            color: #049a5c;
          }
          .partners-caps__inode-sheet em.is-sync {
            background: #fff1ea;
            color: #ff6b2c;
            animation: partners-caps-sheet-sync 1.6s ease-in-out infinite;
          }
          .partners-caps__inode--crm {
            top: 2px;
            left: 50%;
            transform: translateX(-50%);
          }
          .partners-caps__inode--pay {
            top: 50%;
            right: 2px;
            transform: translateY(-50%);
            animation-delay: 0.35s;
          }
          .partners-caps__inode--tg {
            bottom: 2px;
            left: 50%;
            transform: translateX(-50%);
            animation-delay: 0.7s;
          }
          .partners-caps__inode--tbl {
            top: 50%;
            left: 2px;
            transform: translateY(-50%);
            animation-delay: 1.05s;
          }

          /* Support */
          .partners-caps__support {
            position: relative;
            display: flex;
            align-items: center;
            gap: 18px;
            width: 94%;
            max-width: 360px;
          }
          .partners-caps__check-list {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .partners-caps__check {
            display: flex;
            align-items: center;
            gap: 7px;
            padding: 8px 9px;
            border-radius: 10px;
            background: #fff;
            font-size: 9.5px;
            font-weight: 600;
            color: #6b6560;
            box-shadow: none;
            opacity: 0.55;
          }
          .partners-caps__check i {
            display: grid;
            place-items: center;
            width: 15px;
            height: 15px;
            border-radius: 999px;
            font-style: normal;
            font-size: 8px;
            background: #e8e4df;
            color: #9a9a98;
            flex-shrink: 0;
          }
          .partners-caps__check.is-on {
            color: #121212;
            opacity: 1;
            animation: partners-caps-check-on 3.2s ease-in-out infinite;
          }
          .partners-caps__check.is-on i {
            background: #00c978;
            color: #fff;
          }
          .partners-caps__check--2 { animation-delay: 0.35s; }
          .partners-caps__check--3 {
            animation: partners-caps-pending 2.4s ease-in-out infinite 0.7s;
          }
          .partners-caps__check--4 {
            animation: partners-caps-pending 2.4s ease-in-out infinite 1.1s;
          }
          .partners-caps__support-side {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }
          .partners-caps__support-ring {
            width: 48px;
            height: 48px;
            border-radius: 999px;
            border: 3px solid #e8e4df;
            border-top-color: #ff6b2c;
            animation: partners-caps-spin 1.4s linear infinite;
          }
          .partners-caps__support-label {
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.04em;
            color: #121212;
          }

          @keyframes partners-caps-pulse {
            0%, 100% { opacity: 0.75; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.03); }
          }
          @keyframes partners-caps-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes partners-caps-type {
            0%, 12% { max-width: 0; }
            35%, 78% { max-width: 48px; }
            92%, 100% { max-width: 0; }
          }
          @keyframes partners-caps-phone-fill {
            0%, 40% { color: #9a9a98; border-color: #ddd8d2; }
            55%, 80% { color: #121212; border-color: #ff6b2c; }
            100% { color: #9a9a98; border-color: #ddd8d2; }
          }
          @keyframes partners-caps-fly {
            0%, 100% { transform: translateY(0); opacity: 0.9; }
            50% { transform: translateY(-5px); opacity: 1; }
          }
          @keyframes partners-caps-msg-in {
            0%, 8% { opacity: 0; transform: translateY(6px); }
            16%, 88% { opacity: 1; transform: translateY(0); }
            96%, 100% { opacity: 0.35; transform: translateY(0); }
          }
          @keyframes partners-caps-dot {
            0%, 100% { opacity: 0.35; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-2px); }
          }
          @keyframes partners-caps-send-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 107, 44, 0.35); }
            50% { box-shadow: 0 0 0 5px rgba(255, 107, 44, 0); }
          }
          @keyframes partners-caps-ticket {
            0%, 100% { opacity: 0.65; transform: translateY(0); }
            40%, 60% { opacity: 1; transform: translateY(-2px); background: #fff7f2; }
          }
          @keyframes partners-caps-progress {
            0%, 12% { width: 18%; }
            55%, 78% { width: 86%; }
            100% { width: 18%; }
          }
          @keyframes partners-caps-row-live {
            0%, 100% { background: #fff; }
            50% { background: #f0faf5; }
          }
          @keyframes partners-caps-live-dot {
            0% { box-shadow: 0 0 0 0 rgba(0, 201, 120, 0.45); }
            70%, 100% { box-shadow: 0 0 0 6px rgba(0, 201, 120, 0); }
          }
          @keyframes partners-caps-hub {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.06); }
          }
          @keyframes partners-caps-node-glow {
            0%, 100% { opacity: 0.85; }
            50% { opacity: 1; }
          }
          @keyframes partners-caps-dash {
            to { stroke-dashoffset: -22; }
          }
          @keyframes partners-caps-pay-ok {
            0%, 40% { opacity: 0.45; }
            55%, 85% { opacity: 1; }
            100% { opacity: 0.45; }
          }
          @keyframes partners-caps-sheet-sync {
            0%, 100% { opacity: 0.65; }
            50% { opacity: 1; }
          }
          @keyframes partners-caps-pkt-n {
            0% { opacity: 0; cx: 150; cy: 110; }
            12% { opacity: 1; }
            48% { opacity: 1; cx: 150; cy: 42; }
            58%, 100% { opacity: 0; cx: 150; cy: 42; }
          }
          @keyframes partners-caps-pkt-e {
            0% { opacity: 0; cx: 150; cy: 110; }
            12% { opacity: 1; }
            48% { opacity: 1; cx: 248; cy: 110; }
            58%, 100% { opacity: 0; cx: 248; cy: 110; }
          }
          @keyframes partners-caps-pkt-s {
            0% { opacity: 0; cx: 150; cy: 110; }
            12% { opacity: 1; }
            48% { opacity: 1; cx: 150; cy: 178; }
            58%, 100% { opacity: 0; cx: 150; cy: 178; }
          }
          @keyframes partners-caps-pkt-w {
            0% { opacity: 0; cx: 150; cy: 110; }
            12% { opacity: 1; }
            48% { opacity: 1; cx: 52; cy: 110; }
            58%, 100% { opacity: 0; cx: 52; cy: 110; }
          }
          @keyframes partners-caps-spin {
            to { transform: rotate(360deg); }
          }
          @keyframes partners-caps-pending {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 1; box-shadow: 0 0 0 2px rgba(255, 107, 44, 0.18); }
          }
          @keyframes partners-caps-check-on {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }

          @media (prefers-reduced-motion: reduce) {
            .partners-caps__hero-bar,
            .partners-caps__cta,
            .partners-caps__typed,
            .partners-caps__caret,
            .partners-caps__input--phone,
            .partners-caps__tg-chip,
            .partners-caps__phone-avatar,
            .partners-caps__msg,
            .partners-caps__msg--typing i,
            .partners-caps__send,
            .partners-caps__ticket,
            .partners-caps__progress i,
            .partners-caps__track-walker,
            .partners-caps__walker-body,
            .partners-caps__arm--back,
            .partners-caps__arm--front,
            .partners-caps__leg--l,
            .partners-caps__leg--r,
            .partners-caps__side span.is-active,
            .partners-caps__dash,
            .partners-caps__row.is-live,
            .partners-caps__row.is-live i,
            .partners-caps__pay,
            .partners-caps__link,
            .partners-caps__packet,
            .partners-caps__hub-core,
            .partners-caps__inode,
            .partners-caps__inode-ok,
            .partners-caps__inode-sheet em.is-sync,
            .partners-caps__check,
            .partners-caps__check.is-on,
            .partners-caps__support-ring {
              animation: none !important;
            }
            .partners-caps__msg,
            .partners-caps__check {
              opacity: 1;
            }
          }
        ` })
    ] }),
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: copy.seo.title,
        description: copy.seo.description,
        canonicalPath: canonicalUrl,
        ogLocalePrimary: lang === "ru" ? "ru_RU" : "en_US",
        schemaJsonLd: buildPartnersSchema(copy, lang, location.pathname)
      }
    ),
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "ru", href: partnersHreflangUrl(PARTNERS_PATH_RU) }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "en", href: partnersHreflangUrl(PARTNERS_PATH_EN) }),
      /* @__PURE__ */ jsx("link", { rel: "alternate", hrefLang: "x-default", href: partnersHreflangUrl("/partners") })
    ] }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          ref: heroRef,
          className: "relative flex flex-col overflow-hidden bg-partners-cream pb-4 pt-[calc(var(--tivonix-header-spacer)+1.25rem)] sm:min-h-[min(82vh,780px)] sm:pb-28 sm:pt-[calc(var(--tivonix-header-spacer)+2rem)]",
          "aria-labelledby": "partners-hero-title",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: bgRef,
                className: "pointer-events-none absolute inset-0 hidden origin-center will-change-transform sm:block",
                "aria-hidden": true,
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/partners/fon-hero.png",
                    alt: "",
                    className: "partners-hero__img !h-full !max-w-none h-full w-full scale-105 object-cover object-center",
                    decoding: "async",
                    fetchPriority: "high"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(Shell, { className: "relative z-[2] flex flex-1 flex-col justify-center", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[40rem] text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "mb-5 flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-full bg-[#ff6b2c] p-1 text-[12px] font-semibold tracking-[0.08em] text-white shadow-sm", children: ["ru", "en"].map((value) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setLang(value);
                    navigate(partnersPath(value), { replace: true });
                  },
                  className: cx(
                    "rounded-full px-3 py-1.5 transition",
                    lang === value ? "bg-white text-[#ff6b2c]" : "text-white hover:bg-white/15"
                  ),
                  "aria-pressed": lang === value,
                  children: value.toUpperCase()
                },
                value
              )) }) }),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  id: "partners-hero-title",
                  className: "font-partners-display text-[1.5rem] font-medium leading-[1.15] tracking-[-0.025em] text-partners-ink text-balance sm:text-[clamp(1.85rem,4.2vw,2.75rem)] sm:leading-[1.12]",
                  children: copy.hero.h1
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-[34rem] font-partners text-[15px] leading-[1.5] text-partners-brown sm:mt-5 sm:text-partners-body", children: copy.hero.subtitle }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-[3] mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#partner-formats",
                    onClick: scrollToFormats,
                    className: "inline-flex min-h-[2.75rem] items-center justify-center rounded-partners-btn bg-partners-ink px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-cream no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partners-ink",
                    children: copy.hero.cta
                  }
                ),
                /* @__PURE__ */ jsx(
                  SandPill,
                  {
                    href: loginUrl,
                    sameTab: true,
                    onClick: () => trackPartnersEvent("partners_login_click", { source: "hero" }),
                    children: copy.hero.loginCta
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "relative z-[3] mx-auto mt-4 max-w-[36rem] font-partners text-[13px] leading-snug tracking-[-0.01em] text-partners-muted sm:text-[14px]", children: copy.hero.trust })
            ] }) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "partners-hero__mobile-wrap relative z-[1] -mt-14 w-full overflow-hidden sm:hidden",
                "aria-hidden": true,
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/images/partners/fon-hero.png",
                    alt: "",
                    className: "partners-hero__mobile mx-auto block h-auto w-full max-w-none object-contain object-center",
                    decoding: "async",
                    fetchPriority: "high"
                  }
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "bg-partners-cream py-partners-section", "aria-labelledby": "partners-problem", children: /* @__PURE__ */ jsxs(Shell, { children: [
        /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto max-w-[36rem] text-left sm:max-w-[42rem] sm:text-center", children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              id: "partners-problem",
              className: "font-partners-display text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-partners-ink text-balance sm:text-[clamp(1.75rem,4vw,2.75rem)] sm:leading-[1.1]",
              children: copy.problem.title
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "mt-3 font-partners text-[15px] leading-[1.55] tracking-[-0.01em] text-partners-brown sm:mt-4 sm:text-partners-body", children: copy.problem.body.map(
            (part, i) => part.pill ? /* @__PURE__ */ jsx(
              "span",
              {
                className: "mx-0.5 inline-flex translate-y-[-1px] items-center rounded-full bg-[#ff6b2c] px-2.5 py-0.5 text-[13px] font-semibold leading-none tracking-[-0.01em] text-white sm:mx-1 sm:px-3 sm:py-1 sm:text-[14px]",
                children: part.text
              },
              i
            ) : part.em ? /* @__PURE__ */ jsx("span", { className: "font-medium text-partners-ink sm:font-semibold", children: part.text }, i) : /* @__PURE__ */ jsx("span", { children: part.text }, i)
          ) })
        ] }),
        /* @__PURE__ */ jsxs(Reveal, { className: "mt-10 sm:mt-12", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-left font-partners text-[1.125rem] font-medium leading-snug tracking-[-0.02em] text-partners-charcoal sm:mb-5 sm:text-center sm:text-partners-heading", children: copy.problem.rolesHeading }),
          /* @__PURE__ */ jsxs("div", { ref: rolesRef, className: "grid gap-5 lg:grid-cols-3 lg:gap-5", children: [
            /* @__PURE__ */ jsxs("article", { className: "flex flex-col rounded-[20px] bg-partners-white p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-partners-ink", children: copy.problem.roles[0].title }),
              /* @__PURE__ */ jsx("div", { className: "partners-role-media", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/partners/bez-tivonix.png",
                  alt: "",
                  width: 640,
                  height: 400,
                  className: "partners-role-zoom",
                  loading: "lazy",
                  decoding: "async"
                }
              ) }),
              /* @__PURE__ */ jsx("ul", { className: "mt-3 grid gap-2", children: copy.problem.roles[0].items.map((item) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex items-center gap-3 rounded-[12px] bg-partners-cream px-3.5 py-2.5 font-partners text-[15px] leading-snug text-partners-brown",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d4d4d4] text-[13px] font-bold leading-none text-white",
                        "aria-hidden": true,
                        children: "·"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ]
                },
                item
              )) })
            ] }),
            /* @__PURE__ */ jsx("article", { className: "partners-tivonix-frame", children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col rounded-[16px] bg-partners-white p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-[#ff6b2c]", children: "TIVONIX" }),
              /* @__PURE__ */ jsx("div", { className: "partners-role-media", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/partners/s-tivonix.png",
                  alt: "",
                  width: 640,
                  height: 400,
                  className: "partners-role-zoom",
                  loading: "lazy",
                  decoding: "async"
                }
              ) }),
              /* @__PURE__ */ jsx("ul", { className: "mt-3 grid gap-2", children: copy.problem.roles[1].items.map((item) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex items-center gap-3 rounded-[12px] bg-partners-cream px-3.5 py-2.5 font-partners text-[15px] leading-snug text-partners-brown",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ff6b2c] text-[12px] font-bold leading-none text-white",
                        "aria-hidden": true,
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ]
                },
                item
              )) })
            ] }) }),
            /* @__PURE__ */ jsxs("article", { className: "flex flex-col rounded-[20px] bg-partners-white p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-partners-ink", children: copy.problem.roles[2].title }),
              /* @__PURE__ */ jsx("div", { className: "partners-role-media", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/partners/vasha-vygoda.png",
                  alt: "",
                  width: 640,
                  height: 400,
                  className: "partners-role-zoom",
                  loading: "lazy",
                  decoding: "async"
                }
              ) }),
              /* @__PURE__ */ jsx("ul", { className: "mt-3 grid flex-1 gap-2 content-start", children: copy.problem.roles[2].items.map((item) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex items-center gap-3 rounded-[12px] bg-partners-cream px-3.5 py-2.5 font-partners text-[15px] leading-snug text-partners-brown",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ff6b2c] text-[12px] font-bold leading-none text-white",
                        "aria-hidden": true,
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ]
                },
                item
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Reveal, { className: "mt-8 rounded-[16px] bg-partners-white px-5 py-6 sm:px-8 sm:py-7", children: [
          /* @__PURE__ */ jsx("p", { className: "inline-flex rounded-partners-pill bg-[#ff6b2c] px-3.5 py-1.5 font-partners text-[13px] font-medium tracking-[-0.01em] text-white", children: copy.money.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[44rem] font-partners text-partners-body text-partners-charcoal", children: copy.money.body }),
          /* @__PURE__ */ jsx(ExampleMoneyFlow, {})
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "partner-formats",
          className: "scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream pb-6 sm:pb-8",
          "aria-labelledby": "partners-models",
          children: /* @__PURE__ */ jsxs(Shell, { children: [
            /* @__PURE__ */ jsx(Reveal, { className: "mx-auto mb-10 max-w-[36rem] text-center", children: /* @__PURE__ */ jsxs(
              "h2",
              {
                id: "partners-models",
                className: "font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-partners-ink text-balance",
                children: [
                  copy.models.heading.before,
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#00ca48] px-3 py-1 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle", children: copy.models.heading.sell }),
                  " ",
                  copy.models.heading.middle,
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#ff6b2c] px-3 py-1 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle", children: copy.models.heading.brand })
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("div", { ref: bentoRef, className: "partners-bento", children: [
              /* @__PURE__ */ jsxs("article", { ref: easyCardRef, className: "partners-bento__card partners-bento__easy", children: [
                /* @__PURE__ */ jsx("div", { ref: easyBgRef, className: "partners-bento__easy-bg", "aria-hidden": true }),
                /* @__PURE__ */ jsxs("div", { className: "partners-bento__easy-body", children: [
                  /* @__PURE__ */ jsx("div", { className: "partners-bento__menu", "aria-hidden": true, children: copy.models.menu.map((copyItem, index) => [
                    {
                      c: "#0086fc",
                      t: copyItem.title,
                      d: copyItem.description,
                      icon: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
                        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "8", stroke: "currentColor", strokeWidth: "1.8" }),
                        /* @__PURE__ */ jsx("path", { d: "M12 8v4.2l2.6 1.6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
                      ] })
                    },
                    {
                      c: "#9f4fff",
                      t: copy.models.menu[1].title,
                      d: copy.models.menu[1].description,
                      icon: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M7 8.5h10M7 12h7M7 15.5h5",
                            stroke: "currentColor",
                            strokeWidth: "1.8",
                            strokeLinecap: "round"
                          }
                        ),
                        /* @__PURE__ */ jsx("rect", { x: "4.5", y: "4.5", width: "15", height: "15", rx: "3.5", stroke: "currentColor", strokeWidth: "1.8" })
                      ] })
                    },
                    {
                      c: "#00ca48",
                      t: copy.models.menu[2].title,
                      d: copy.models.menu[2].description,
                      icon: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M8.5 16.5 15.5 7.5M9.2 8.2h.01M14.8 15.8h.01",
                            stroke: "currentColor",
                            strokeWidth: "1.9",
                            strokeLinecap: "round"
                          }
                        ),
                        /* @__PURE__ */ jsx("circle", { cx: "9.2", cy: "8.2", r: "1.35", fill: "currentColor" }),
                        /* @__PURE__ */ jsx("circle", { cx: "14.8", cy: "15.8", r: "1.35", fill: "currentColor" })
                      ] })
                    },
                    {
                      c: "#ff58ae",
                      t: copy.models.menu[3].title,
                      d: copy.models.menu[3].description,
                      icon: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, children: [
                        /* @__PURE__ */ jsx("rect", { x: "4.5", y: "5", width: "15", height: "14", rx: "2.5", stroke: "currentColor", strokeWidth: "1.8" }),
                        /* @__PURE__ */ jsx("path", { d: "M8 9.5h8M8 12.5h8M8 15.5h5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
                      ] })
                    }
                  ][index]).map((row) => /* @__PURE__ */ jsxs("div", { className: "partners-bento__menu-row", children: [
                    /* @__PURE__ */ jsx("span", { className: "partners-bento__menu-ico", style: { backgroundColor: row.c }, children: row.icon }),
                    /* @__PURE__ */ jsxs("span", { className: "partners-bento__menu-copy", children: [
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__menu-t", children: row.t }),
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__menu-d", children: row.d })
                    ] })
                  ] }, row.t)) }),
                  /* @__PURE__ */ jsxs("div", { className: "partners-bento__easy-foot", children: [
                    /* @__PURE__ */ jsx("h3", { className: "partners-bento__title", children: copy.models.allInOne.title }),
                    /* @__PURE__ */ jsx("p", { className: "partners-bento__text", children: copy.models.allInOne.text })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "partners-bento__card partners-bento__hover", tabIndex: 0, children: [
                /* @__PURE__ */ jsx("div", { className: "partners-bento__viz", children: /* @__PURE__ */ jsx("div", { className: "partners-bento__zoom", "data-bento-zoom": "0.12", children: /* @__PURE__ */ jsx(BentoEstimateUi, { pill: copy.models.quickStart.pill }) }) }),
                /* @__PURE__ */ jsx("h3", { className: "partners-bento__title", children: copy.models.quickStart.title }),
                /* @__PURE__ */ jsx("p", { className: "partners-bento__text", children: copy.models.quickStart.text }),
                /* @__PURE__ */ jsx(DiscussPanel, {})
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "partners-bento__card partners-bento__hover", tabIndex: 0, children: [
                /* @__PURE__ */ jsx("div", { className: "partners-bento__viz", children: /* @__PURE__ */ jsx("div", { className: "partners-bento__zoom", "data-bento-zoom": "0.1", children: /* @__PURE__ */ jsx("div", { className: "partners-bento__fast", "aria-hidden": true, children: /* @__PURE__ */ jsxs("div", { className: "partners-bento__timeline", children: [
                  /* @__PURE__ */ jsxs("div", { className: "partners-bento__step", children: [
                    /* @__PURE__ */ jsx("span", { className: "partners-bento__step-dot" }),
                    /* @__PURE__ */ jsxs("span", { className: "partners-bento__step-copy", children: [
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__step-t", children: copy.models.status.steps[0].t }),
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__step-d", children: copy.models.status.steps[0].d })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "partners-bento__step", children: [
                    /* @__PURE__ */ jsx("span", { className: "partners-bento__step-dot" }),
                    /* @__PURE__ */ jsxs("span", { className: "partners-bento__step-copy", children: [
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__step-t", children: copy.models.status.steps[1].t }),
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__step-d", children: copy.models.status.steps[1].d })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "partners-bento__step", children: [
                    /* @__PURE__ */ jsx("span", { className: "partners-bento__step-dot" }),
                    /* @__PURE__ */ jsxs("span", { className: "partners-bento__step-copy", children: [
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__step-t", children: copy.models.status.steps[2].t }),
                      /* @__PURE__ */ jsx("span", { className: "partners-bento__step-d", children: copy.models.status.steps[2].d })
                    ] })
                  ] })
                ] }) }) }) }),
                /* @__PURE__ */ jsx("h3", { className: "partners-bento__title", children: copy.models.status.title }),
                /* @__PURE__ */ jsx("p", { className: "partners-bento__text", children: copy.models.status.text }),
                /* @__PURE__ */ jsx(DiscussPanel, {})
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "partners-bento__card", children: [
                /* @__PURE__ */ jsx("div", { className: "partners-bento__viz", children: /* @__PURE__ */ jsx("div", { className: "partners-bento__zoom", "data-bento-zoom": "0.12", children: /* @__PURE__ */ jsx(BentoReferralUi, {}) }) }),
                /* @__PURE__ */ jsx("h3", { className: "partners-bento__title", children: copy.models.referral.title }),
                /* @__PURE__ */ jsx("p", { className: "partners-bento__text", children: copy.models.referral.text }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 font-partners text-[12px] leading-snug text-partners-muted", children: copy.models.referral.note }),
                /* @__PURE__ */ jsxs("div", { className: "partners-bento__cta", children: [
                  /* @__PURE__ */ jsx(
                    DarkPill,
                    {
                      href: referralRegisterUrl,
                      sameTab: true,
                      onClick: () => trackPartnersEvent("partners_referral_click", { source: "formats" }),
                      children: copy.models.referral.cta
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 font-partners text-[11px] leading-snug text-partners-muted", children: copy.models.panelHint })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("article", { className: "partners-bento__card", children: [
                /* @__PURE__ */ jsx("div", { className: "partners-bento__viz", children: /* @__PURE__ */ jsx("div", { className: "partners-bento__zoom", "data-bento-zoom": "0.12", children: /* @__PURE__ */ jsx(BentoWhiteLabelUi, {}) }) }),
                /* @__PURE__ */ jsx("h3", { className: "partners-bento__title", children: copy.models.whiteLabel.title }),
                /* @__PURE__ */ jsx("p", { className: "partners-bento__text", children: copy.models.whiteLabel.text }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 font-partners text-[12px] leading-snug text-partners-muted", children: copy.models.whiteLabel.note }),
                /* @__PURE__ */ jsxs("div", { className: "partners-bento__cta", children: [
                  /* @__PURE__ */ jsx(
                    DarkPill,
                    {
                      href: whiteLabelRegisterUrl,
                      sameTab: true,
                      onClick: () => trackPartnersEvent("partners_white_label_click", { source: "formats" }),
                      children: copy.models.whiteLabel.cta
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 font-partners text-[11px] leading-snug text-partners-muted", children: copy.models.panelHint })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 text-center font-partners text-partners-micro text-partners-muted", children: copy.models.footnote })
          ] })
        }
      ),
      null,
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "partners-after-reg",
          className: "scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section",
          "aria-labelledby": "partners-after-reg-title",
          children: /* @__PURE__ */ jsxs(Shell, { children: [
            /* @__PURE__ */ jsxs(Reveal, { className: "mx-auto mb-8 max-w-[36rem] text-center", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  id: "partners-after-reg-title",
                  className: "font-partners-display text-[clamp(1.5rem,3.6vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.02em] text-partners-ink text-balance",
                  children: copy.afterReg.title
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-3 font-partners text-[15px] leading-snug text-partners-brown sm:text-[16px]", children: copy.afterReg.lead })
            ] }),
            /* @__PURE__ */ jsx(Reveal, { className: "partners-after-reg__grid", children: copy.afterReg.steps.map((step, i) => /* @__PURE__ */ jsxs("article", { className: "partners-after-reg__card", children: [
              /* @__PURE__ */ jsx("span", { className: "partners-after-reg__num", "aria-hidden": true, children: i + 1 }),
              /* @__PURE__ */ jsx("h3", { className: "partners-after-reg__t", children: step.t }),
              /* @__PURE__ */ jsx("p", { className: "partners-after-reg__d", children: step.d })
            ] }, step.t)) }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mt-8 max-w-[40rem] text-center font-partners text-[14px] leading-snug text-partners-muted sm:text-[15px]", children: copy.afterReg.disclaimer })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "bg-partners-cream pt-partners-section", "aria-labelledby": "partners-caps", children: /* @__PURE__ */ jsx(CapabilitiesBanner, {}) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "process",
          className: "scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section",
          "aria-labelledby": "partners-process",
          children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Reveal, { className: "grid items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16", children: [
            /* @__PURE__ */ jsx("div", { className: "relative order-2 mx-auto flex w-full max-w-[20rem] items-center justify-center sm:max-w-[24rem] lg:order-1 lg:max-w-none", children: /* @__PURE__ */ jsx(PartnersProcessVisual, {}) }),
            /* @__PURE__ */ jsxs("div", { className: "order-1 min-w-0 lg:order-2", children: [
              /* @__PURE__ */ jsx(
                "h2",
                {
                  id: "partners-process",
                  className: "font-partners-display text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-partners-ink text-balance sm:text-[clamp(1.85rem,3.6vw,2.85rem)] sm:leading-[1.12] sm:tracking-[-0.025em]",
                  children: copy.process.title
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[34rem] font-partners text-[15px] leading-[1.55] tracking-[-0.01em] text-partners-brown sm:mt-4 sm:text-[17px] sm:leading-relaxed", children: copy.process.lead }),
              /* @__PURE__ */ jsx("ul", { className: "mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5", children: copy.process.steps.map((t) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "inline-flex items-center gap-2 rounded-full bg-partners-white px-3 py-2 sm:px-3.5 sm:py-2.5",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ff6b2c] text-[11px] font-bold leading-none text-white",
                        "aria-hidden": true,
                        children: "✓"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "font-partners text-[13px] font-semibold tracking-[-0.015em] text-partners-ink sm:text-[15px]", children: t })
                  ]
                },
                t
              )) })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "section",
        {
          id: "partners-cases",
          className: "scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section",
          "aria-labelledby": "partners-cases-title",
          children: /* @__PURE__ */ jsxs(Shell, { children: [
            /* @__PURE__ */ jsx(Reveal, { className: "mx-auto mb-10 max-w-[36rem] text-center", children: /* @__PURE__ */ jsx(
              "h2",
              {
                id: "partners-cases-title",
                className: "font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-partners-ink text-balance",
                children: copy.cases.title
              }
            ) }),
            /* @__PURE__ */ jsx(Reveal, { className: "grid gap-5 lg:grid-cols-3 lg:gap-5", children: CASES.map((c) => /* @__PURE__ */ jsxs(
              "article",
              {
                className: "group flex flex-col overflow-hidden rounded-[20px] bg-partners-white",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden bg-partners-cream", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: c.cover,
                      alt: "",
                      width: 640,
                      height: 400,
                      className: "!h-full !max-w-none h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04]",
                      loading: "lazy",
                      decoding: "async"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-5 sm:p-6", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-partners-ink", children: c.title }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 flex-1 font-partners text-[15px] leading-snug text-partners-brown", children: copy.cases.texts[c.id] }),
                    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: c.tags.map((tag) => /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "rounded-full bg-partners-cream px-3 py-1.5 font-partners text-[12px] font-semibold tracking-[-0.01em] text-partners-charcoal",
                        children: tag
                      },
                      tag
                    )) }),
                    /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        to: `/projects/${c.id}`,
                        className: "inline-flex min-h-[2.5rem] items-center justify-center rounded-partners-btn bg-[#ff6b2c] px-4 py-2 font-partners text-[14px] font-semibold tracking-[-0.01em] text-white no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b2c]",
                        children: copy.cases.view
                      }
                    ) })
                  ] })
                ]
              },
              c.id
            )) }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsx(SandPill, { href: "/projects", children: copy.cases.all }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "bg-partners-cream py-partners-section", "aria-labelledby": "partners-models-examples", children: /* @__PURE__ */ jsxs(Shell, { children: [
        /* @__PURE__ */ jsx("h2", { id: "partners-models-examples", className: "sr-only", children: copy.examples.sr }),
        /* @__PURE__ */ jsx("div", { ref: modelsExamplesRef, children: /* @__PURE__ */ jsxs(Reveal, { className: "partners-models-split", children: [
          /* @__PURE__ */ jsxs("article", { className: "partners-models-split__card partners-models-split__card--ref", children: [
            /* @__PURE__ */ jsxs("div", { className: "partners-models-split__media", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx("div", { className: "partners-models-split__zoom", children: /* @__PURE__ */ jsx("img", { src: PARTNERS_REF_BG, alt: "", width: 900, height: 700, decoding: "async", loading: "lazy" }) }),
              /* @__PURE__ */ jsx("div", { className: "partners-models-split__shade" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "partners-models-split__body", children: [
              /* @__PURE__ */ jsx("p", { className: "partners-models-split__pill", children: copy.examples.referral.pill }),
              /* @__PURE__ */ jsx("h3", { className: "partners-models-split__title", children: copy.examples.referral.title }),
              /* @__PURE__ */ jsx("p", { className: "partners-models-split__text", children: copy.examples.referral.text }),
              /* @__PURE__ */ jsx(ModelExampleReferral, {})
            ] })
          ] }),
          /* @__PURE__ */ jsxs("article", { className: "partners-models-split__card partners-models-split__card--wl", children: [
            /* @__PURE__ */ jsxs("div", { className: "partners-models-split__media", "aria-hidden": true, children: [
              /* @__PURE__ */ jsx("div", { className: "partners-models-split__zoom", children: /* @__PURE__ */ jsx("img", { src: PARTNERS_WL_BG, alt: "", width: 900, height: 700, decoding: "async", loading: "lazy" }) }),
              /* @__PURE__ */ jsx("div", { className: "partners-models-split__shade" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "partners-models-split__body", children: [
              /* @__PURE__ */ jsx("p", { className: "partners-models-split__pill", children: copy.examples.whiteLabel.pill }),
              /* @__PURE__ */ jsx("h3", { className: "partners-models-split__title", children: copy.examples.whiteLabel.title }),
              /* @__PURE__ */ jsx("p", { className: "partners-models-split__text", children: copy.examples.whiteLabel.text }),
              /* @__PURE__ */ jsx(ModelExampleWhiteLabel, {})
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-partners-cream py-partners-section", "aria-labelledby": "partners-faq", children: /* @__PURE__ */ jsxs(Shell, { children: [
        /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(
          "h2",
          {
            id: "partners-faq",
            className: "font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-partners-ink",
            children: copy.faq.title
          }
        ) }),
        /* @__PURE__ */ jsx(Reveal, { className: "mt-8 grid gap-3", children: copy.faq.items.map((item) => /* @__PURE__ */ jsxs(
          "details",
          {
            className: "group rounded-[20px] bg-partners-white p-5 sm:p-6",
            children: [
              /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer list-none items-start justify-between gap-4 font-partners text-[clamp(1.05rem,2vw,1.4375rem)] font-medium leading-snug tracking-[-0.02em] text-partners-charcoal [&::-webkit-details-marker]:hidden", children: [
                /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1", children: item.q }),
                /* @__PURE__ */ jsx("span", { className: "mt-1 shrink-0 font-partners text-[14px] font-medium text-partners-ember underline-offset-2 group-open:underline", children: copy.faq.more })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-[42rem] font-partners text-partners-caption text-partners-body", children: item.a })
            ]
          },
          item.q
        )) })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          ref: finalRef,
          className: "overflow-x-clip bg-partners-cream py-partners-section text-center",
          "aria-labelledby": "partners-final",
          children: /* @__PURE__ */ jsx(Shell, { className: "min-w-0", children: /* @__PURE__ */ jsx(Reveal, { className: "min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "partners-final__media", children: [
            /* @__PURE__ */ jsx("div", { ref: finalZoomRef, className: "partners-final__zoom", "aria-hidden": true, children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/partners/foo.webp",
                alt: "",
                width: 1680,
                height: 606,
                decoding: "async",
                loading: "lazy",
                fetchPriority: "low"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "partners-final__copy", children: [
              /* @__PURE__ */ jsx("p", { className: "inline-flex max-w-full rounded-partners-pill bg-[#ff6b2c] px-3 py-1.5 font-partners text-[12px] font-medium tracking-[-0.01em] text-white sm:px-3.5 sm:text-[13px]", children: copy.final.badge }),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  id: "partners-final",
                  className: "mx-auto mt-3 max-w-[22ch] font-partners-display text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em] text-balance sm:mt-4 sm:text-[clamp(1.75rem,4vw,2.75rem)] sm:leading-[1.12] sm:tracking-[-0.025em]",
                  children: copy.final.title
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-[32rem] font-partners text-[14px] leading-[1.5] tracking-[-0.01em] sm:mt-4 sm:text-[17px] sm:leading-relaxed", children: copy.final.body }),
              /* @__PURE__ */ jsxs("div", { className: "partners-final__actions mt-5 sm:mt-7", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: referralRegisterUrl,
                    onClick: () => trackPartnersEvent("partners_final_referral_click"),
                    className: "inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-partners-btn bg-white px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-ink no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:w-auto",
                    children: copy.final.referralCta
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: whiteLabelRegisterUrl,
                    onClick: () => trackPartnersEvent("partners_final_white_label_click"),
                    className: "inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-partners-btn bg-[#ff6b2c] px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-white no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:w-auto",
                    children: copy.final.whiteLabelCta
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: loginUrl,
                  onClick: () => trackPartnersEvent("partners_login_click", { source: "final" }),
                  className: "partners-final__secondary mt-4 inline-flex min-h-[2.5rem] items-center justify-center font-partners text-[14px] font-semibold tracking-[-0.01em] no-underline underline-offset-[3px] transition hover:underline sm:text-[15px]",
                  children: copy.final.loginLink
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "partners-final__footnote mt-4 font-partners text-[11px] leading-snug sm:mt-5 sm:text-partners-micro", children: copy.final.footnote })
            ] })
          ] }) }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(PartnersFooter, {})
  ] });
}
function NotFoundPage() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const title = isRu ? "Страница не найдена — TIVONIX" : "Page not found — TIVONIX";
  const description = isRu ? "Запрошенная страница не существует. Вернитесь на главную или посмотрите проекты TIVONIX." : "The page you requested does not exist. Return home or explore TIVONIX projects.";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen overflow-x-clip bg-[var(--bg)]", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title,
        description,
        canonicalPath: isRu ? "/404" : "/en/404",
        ogLocalePrimary: isRu ? "ru_RU" : "en_US",
        robots: "noindex,nofollow"
      }
    ),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          "aria-hidden": true,
          className: "pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,122,40,0.18),transparent_55%)]"
        }
      ),
      /* @__PURE__ */ jsxs(Container, { className: "relative pt-[calc(var(--tivonix-header-spacer)+2.5rem)] pb-16 sm:pb-20", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold tracking-[0.14em] text-[#FF9A3D]/90 uppercase", children: "404" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-4 max-w-[16ch] text-[clamp(2.1rem,5.5vw,3.6rem)] font-[850] leading-[1.05] tracking-[-0.035em] text-white", children: isRu ? "Страница не найдена" : "Page not found" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-xl text-[16px] leading-7 text-white/70 sm:text-[17px]", children: isRu ? "Ссылка устарела или адрес введён с ошибкой. Можно вернуться на главную, посмотреть проекты или оставить заявку." : "The link may be outdated or mistyped. Go home, browse projects, or send a short brief." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-9 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: isRu ? "/" : "/en",
              className: "inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-bold text-black transition hover:bg-white/92 sm:px-8 sm:text-[15px]",
              children: isRu ? "На главную" : "Home"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: isRu ? "/projects" : "/en/projects",
              className: "inline-flex h-12 items-center justify-center rounded-full bg-white/[0.08] px-7 text-[14px] font-bold text-white/90 ring-1 ring-white/12 transition hover:bg-white/[0.12] sm:px-8 sm:text-[15px]",
              children: isRu ? "Проекты" : "Projects"
            }
          ),
          /* @__PURE__ */ jsx(LeadCTAButton, { source: "final_cta", variant: "primary", size: "lg", children: isRu ? "Оставить заявку" : "Send a brief" })
        ] })
      ] })
    ] }),
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
    /* @__PURE__ */ jsx(LangPathSync, {}),
    /* @__PURE__ */ jsx(ScrollToHash, {}),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(LandingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en", element: /* @__PURE__ */ jsx(LandingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/projects", element: /* @__PURE__ */ jsx(ProjectsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/projects", element: /* @__PURE__ */ jsx(ProjectsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/projects/:slug", element: /* @__PURE__ */ jsx(ProjectDetailPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/projects/:slug", element: /* @__PURE__ */ jsx(ProjectDetailPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/plans", element: /* @__PURE__ */ jsx(PricingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/plans", element: /* @__PURE__ */ jsx(PricingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contacts", element: /* @__PURE__ */ jsx(ContactsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/contacts", element: /* @__PURE__ */ jsx(ContactsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/sozdanie-sajtov", element: /* @__PURE__ */ jsx(WebsiteCreationPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/avtomatizaciya-biznesa", element: /* @__PURE__ */ jsx(AutomationBusinessPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/partners", element: /* @__PURE__ */ jsx(PartnersPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: PARTNERS_PATH_RU, element: /* @__PURE__ */ jsx(PartnersPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: PARTNERS_PATH_EN, element: /* @__PURE__ */ jsx(PartnersPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
    ] })
  ] });
}
const CONSENT_KEY = "tivonix_analytics_consent";
function getAnalyticsConsent() {
  if (typeof window === "undefined") return "pending";
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
  }
  return "pending";
}
function setAnalyticsConsent(state) {
  try {
    localStorage.setItem(CONSENT_KEY, state);
  } catch {
  }
  window.dispatchEvent(new CustomEvent("tivonix-consent", { detail: state }));
}
function onConsentChange(cb) {
  const handler = (e) => {
    const detail = e.detail;
    cb(detail);
  };
  window.addEventListener("tivonix-consent", handler);
  return () => window.removeEventListener("tivonix-consent", handler);
}
const PRIVACY_RU = "/doc/Политика_обработки_ПД_Tivonix_RU.pdf";
const PRIVACY_EN = "/doc/Privacy_Policy_Tivonix_EN.pdf";
function ConsentBanner() {
  const { lang } = useLang();
  const { isOpen: leadFormOpen } = useLeadForm();
  const isRu = lang === "ru";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const sync = () => {
      setVisible(getAnalyticsConsent() === "pending");
    };
    sync();
    if (getAnalyticsConsent() === "accepted") {
      initHotjar();
    }
    return onConsentChange((state) => {
      if (state === "accepted") initHotjar();
      setVisible(state === "pending");
    });
  }, []);
  if (!visible || leadFormOpen) return null;
  const accept = () => {
    setAnalyticsConsent("accepted");
    initHotjar();
    setVisible(false);
  };
  const decline = () => {
    setAnalyticsConsent("rejected");
    setVisible(false);
  };
  const privacyHref = isRu ? PRIVACY_RU : PRIVACY_EN;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-start p-4 sm:p-6",
      style: {
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))"
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          role: "dialog",
          "aria-label": isRu ? "Согласие на cookies аналитики" : "Analytics cookies consent",
          className: "pointer-events-auto w-full max-w-[26rem] rounded-[2rem] border border-white/[0.08] bg-[#141414] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:p-8",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-[15px] leading-[1.55] text-white/70", children: isRu ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "Мы используем cookies, чтобы сайт работал лучше.",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: privacyHref,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-white/85 underline decoration-white/35 underline-offset-[3px] transition hover:text-white hover:decoration-white/60",
                  children: "Политика cookies"
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "We use cookies to make this site work better.",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: privacyHref,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-white/85 underline decoration-white/35 underline-offset-[3px] transition hover:text-white hover:decoration-white/60",
                  children: "Cookie Policy"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap items-center gap-2.5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: accept,
                  className: "inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[14px] font-semibold tracking-[-0.01em] text-[#111] transition hover:bg-white/92 active:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55",
                  children: isRu ? "Принять" : "Accept"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: decline,
                  className: "inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-transparent px-6 text-[14px] font-semibold tracking-[-0.01em] text-white/85 transition hover:border-white/40 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55",
                  children: isRu ? "Отклонить" : "Reject"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function ScrollDepthTracker() {
  const fired50 = useRef(false);
  const fired90 = useRef(false);
  useEffect(() => {
    fired50.current = false;
    fired90.current = false;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = window.scrollY / scrollable * 100;
      if (!fired50.current && pct >= 50) {
        fired50.current = true;
        trackEvent("scroll_50");
      }
      if (!fired90.current && pct >= 90) {
        fired90.current = true;
        trackEvent("scroll_90");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
function AppShell() {
  return /* @__PURE__ */ jsxs(LeadFormProvider, { children: [
    /* @__PURE__ */ jsx(AppRoutes, {}),
    /* @__PURE__ */ jsx(ConsentBanner, {}),
    /* @__PURE__ */ jsx(ScrollDepthTracker, {})
  ] });
}
function langFromUrl(url) {
  try {
    const path = (url.startsWith("http") ? new URL(url).pathname : url.split("?")[0]) || "/";
    if (path === "/en" || path.startsWith("/en/")) return "en";
    return "ru";
  } catch {
    return "ru";
  }
}
function render(url) {
  const helmetContext = {};
  const initialLang = langFromUrl(url);
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(LangProvider, { initialLang, children: /* @__PURE__ */ jsx(MemoryRouter, { initialEntries: [url], children: /* @__PURE__ */ jsx(AppShell, {}) }) }) })
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
