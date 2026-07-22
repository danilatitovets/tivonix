// src/i18n/LangProvider.tsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { detectLangFromUrl, readBootstrapLang } from "../lib/readBootstrapLang";

export type Lang = "ru" | "en";

const LANG_STORAGE_KEY = "tivonix_lang";

/* ====== словари ====== */

type HeaderDict = {
  nav: {
    contacts: string;
    projects: string;
    faq: string;
  };
  start: string;
  menu: string;
  home: string;
  language: string;
};

export type HeroLeadChannel =
  | "telegram"
  | "instagram"
  | "whatsapp"
  | "gmail"
  | "website"
  | "facebook"
  | "vk"
  | "hubspot"
  | "notion"
  | "calendar";

type HeroLead = {
  title: string;
  source: string;
  time: string;
  channel: HeroLeadChannel;
};

type HeroDict = {
  eyebrow: string;
  titleLine1: string;
  titleLine2Prefix: string;
  titleLine2Premium: string;
  titleLine3: string;
  titleLine4: string;
  subtitle: string;
  note: string;
  emailPlaceholder: string;
  btnDemo: string;
  btnTelegram: string;
  btnAutomation: string;
  statLabel: string;
  leadsAria: string;
  leads: HeroLead[];
};

type CurtainDict = {
  title: string;
  statusDone: string;
  statusInProgress: string;
  steps: string[];
};

type WhyUsDict = {
  badge: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  footerBadge: string;
  techs: {
    react: { label: string; sub: string };
    ts: { label: string; sub: string };
    js: { label: string; sub: string };
    node: { label: string; sub: string };
    express: { label: string; sub: string };
    supabase: { label: string; sub: string };
    postgres: { label: string; sub: string };
    tailwind: { label: string; sub: string };
    saas: { label: string; sub: string };
    perf: { label: string; sub: string };
  };
};

type OrbitDict = {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  bullets: { title: string; desc: string }[];
  primaryCta: string;
  secondaryCta: string;
  footnote: string;
  chat: {
    clientLabel: string;
    clientSubtitle: string;
    msgClient1: string;
    msgMe1: string;
    msgClient2: string;
    inputPlaceholder: string;
    quickCallTitle: string;
    quickCallDuration: string;
    quickCallHint: string;
  };
};

type BenefitsDict = {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  rowLabel: string;
  rowMeta: string;
  items: {
    title: string;
    desc: string;
    badge: string;
  }[];
};

type NewCaseDict = {
  label: string;
  title: string;
  live: string;
  cta: string;
  ctaExternal: string;
};

export type Dictionary = {
  header: HeaderDict;
  hero: HeroDict;
  curtain: CurtainDict;
  whyUs: WhyUsDict;
  newCase: NewCaseDict;
  orbit: OrbitDict;
  benefits: BenefitsDict;
};

const DICT: Record<Lang, Dictionary> = {
  ru: {
    header: {
      nav: {
        contacts: "контакты",
        projects: "проекты",
        faq: "FAQ",
      },
      start: "Начать",
      menu: "Меню",
      home: "На главную",
      language: "Язык",
    },
    hero: {
      eyebrow: "TIVONIX • САЙТЫ, БОТЫ, CRM",
      titleLine1: "Сайты,",
      titleLine2Prefix: "боты",
      titleLine2Premium: "и веб-сервисы",
      titleLine3: "которые помогают",
      titleLine4: "получать заявки",
      subtitle:
        "Разбираем задачу, предлагаем решение и запускаем продукт под ключ: лендинг, Telegram-бот, личный кабинет, CRM или автоматизацию.",
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
        { title: "Форма на сайте", source: "Новая заявка: лендинг + уведомления в Telegram", time: "18 мин", channel: "website" },
      ],
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
        "После запуска: поддержка, улучшения, рост продукта.",
      ],
    },
    whyUs: {
      badge: "СТЕК • ТЕХНОЛОГИИ • ПРОДУКТ",
      titleTop: "С чем мы",
      titleBottom: "работаем",
      description:
        "Полный стек для SaaS и продуктов: фронт, бэкенд, база, UI-система и оптимизация. Делаем так, чтобы выглядело “дорого” и масштабировалось.",
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
        perf: { label: "Performance", sub: "Оптимизация, lazy, UX-скорость" },
      },
    },
    newCase: {
      label: "новый кейс",
      title: "NEW",
      live: "В продакшене",
      cta: "Смотреть кейс",
      ctaExternal: "Открыть панель",
    },
    orbit: {
      badge: "ADMIN PANEL • SaaS",
      titlePrefix: "Админ-панели для",
      titleHighlight: "вашего продукта",
      description:
        "Роли и доступы, таблицы с фильтрами, статусы/модерация, дашборды и интеграции — всё аккуратно и масштабируемо.",
      bullets: [
        { title: "Роли и доступы", desc: "пользователи, права, аудит" },
        { title: "Таблицы и управление", desc: "поиск, фильтры, экспорт" },
        { title: "Аналитика и процессы", desc: "дашборды, статусы, выплаты" },
      ],
      primaryCta: "Обсудить проект",
      secondaryCta: "Кейсы",
      footnote: "MVP / Кабинет клиента / Админка / Интеграции",
      chat: {
        clientLabel: "клиент • уточнение",
        clientSubtitle: "SaaS + админ-панель",
        msgClient1:
          "Привет! Делаем SaaS. А вы делаете админ-панели для управления пользователями и данными?",
        msgMe1:
          "Да ✅ Сделаю админку: роли/доступы, таблицы (поиск/фильтры), статусы, модерация, аналитика. Подключу API и базовую безопасность.",
        msgClient2: "Отлично. Можно дашборд и историю действий?",
        inputPlaceholder: "Сообщение…",
        quickCallTitle: "Быстрый созвон",
        quickCallDuration: "15 минут",
        quickCallHint: "Нажмите, чтобы говорить",
      },
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
          badge: "1–3 недели",
        },
        {
          title: "Премиум UI",
          desc: "Сетка, типографика, состояния, микро-детали — как у топ-SaaS.",
          badge: "сразу «дорого»",
        },
        {
          title: "Безопасность и роли",
          desc: "Роли/доступы, защита API, базовые практики безопасности, контроль данных.",
          badge: "Auth / RLS",
        },
        {
          title: "Интеграции",
          desc: "Платежи, почта, уведомления, аналитика, CRM — подключаем стабильно.",
          badge: "webhooks",
        },
        {
          title: "Чистая архитектура",
          desc: "Компоненты, типы, слои API и структура под рост — без «свалки» через месяц.",
          badge: "масштабируемо",
        },
        {
          title: "После релиза",
          desc: "Деплой, домен/SSL, мониторинг, багфиксы и план улучшений по метрикам.",
          badge: "поддержка",
        },
      ],
    },
  },

  en: {
    header: {
      nav: {
        contacts: "contacts",
        projects: "projects",
        faq: "FAQ",
      },
      start: "Start",
      menu: "Menu",
      home: "Home",
      language: "Language",
    },
    hero: {
      eyebrow: "TIVONIX • WEBSITES, BOTS, CRM",
      titleLine1: "Websites,",
      titleLine2Prefix: "bots",
      titleLine2Premium: "and web apps",
      titleLine3: "that help you",
      titleLine4: "capture leads",
      subtitle:
        "We review your task, suggest a solution and launch it end-to-end: landing page, Telegram bot, client area, CRM or automation.",
      note: "We reply within a day • First consultation is free",
      emailPlaceholder: "Work email",
      btnDemo: "Discuss the project",
      btnTelegram: "Message us on Telegram",
      btnAutomation: "See what we build",
      statLabel: "leads today",
      leadsAria: "Sample incoming leads",
      leads: [
        { title: "TIVONIX Bot", source: "New lead: need a website quote for ads", time: "now", channel: "telegram" },
        { title: "maria_beauty", source: "Hi, I\u2019d like a consultation about your services", time: "1 min", channel: "instagram" },
        { title: "Anna", source: "Can I book a manicure for Saturday?", time: "2 min", channel: "whatsapp" },
        { title: "Commercial proposal", source: "Sent the dev proposal — see the attachment", time: "3 min", channel: "gmail" },
        { title: "Website form", source: "Ivan · landing for ads · +1 555 123-4567", time: "4 min", channel: "website" },
        { title: "Ads · Leads", source: "New lead: automation for a beauty salon", time: "6 min", channel: "facebook" },
        { title: "Message", source: "Interested in lead automation — what\u2019s the price?", time: "7 min", channel: "vk" },
        { title: "New contact", source: "BuildCo LLC — submitted a CRM inquiry", time: "9 min", channel: "hubspot" },
        { title: "Project brief", source: "Brief filled in Notion — ready to review", time: "11 min", channel: "notion" },
        { title: "Client meeting", source: "Tomorrow at 3 PM · MVP discussion", time: "13 min", channel: "calendar" },
        { title: "TIVONIX Bot", source: "Bot lead: Telegram + CRM integration", time: "14 min", channel: "telegram" },
        { title: "studio_pro", source: "How much for a site with online booking?", time: "15 min", channel: "instagram" },
        { title: "Dmitry", source: "Need online booking for salon clients", time: "16 min", channel: "whatsapp" },
        { title: "Website form", source: "New lead: landing page + Telegram alerts", time: "18 min", channel: "website" },
      ],
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
        "After launch: support, improvements, product growth.",
      ],
    },
    whyUs: {
      badge: "STACK • TECHNOLOGY • PRODUCT",
      titleTop: "What we",
      titleBottom: "work with",
      description:
        "Full stack for SaaS and products: frontend, backend, database, UI system and performance. We make it look premium and scale cleanly.",
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
        perf: { label: "Performance", sub: "Optimization, lazy, UX speed" },
      },
    },
    newCase: {
      label: "new case",
      title: "NEW",
      live: "Live",
      cta: "View case study",
      ctaExternal: "Open panel",
    },
    orbit: {
      badge: "ADMIN PANEL • SaaS",
      titlePrefix: "Admin panels for",
      titleHighlight: "your product",
      description:
        "Roles and access, data tables with filters, statuses/moderation, dashboards and integrations — all clean and scalable.",
      bullets: [
        { title: "Roles & access", desc: "users, permissions, audit" },
        { title: "Tables & management", desc: "search, filters, export" },
        { title: "Analytics & processes", desc: "dashboards, statuses, payouts" },
      ],
      primaryCta: "Discuss the project",
      secondaryCta: "Case studies",
      footnote: "MVP / Client area / Admin panel / Integrations",
      chat: {
        clientLabel: "client • clarification",
        clientSubtitle: "SaaS + admin panel",
        msgClient1:
          "Hi! We’re building a SaaS. Do you build admin panels for managing users and data?",
        msgMe1:
          "Yes ✅ I’ll build the admin: roles/access, tables (search/filters), statuses, moderation, analytics. I’ll connect APIs and basic security.",
        msgClient2: "Great. Can we have a dashboard and activity history?",
        inputPlaceholder: "Message…",
        quickCallTitle: "Quick call",
        quickCallDuration: "15 minutes",
        quickCallHint: "Tap to talk",
      },
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
          badge: "1–3 weeks",
        },
        {
          title: "Premium UI",
          desc: "Grid, typography, states, micro-details — like top-tier SaaS.",
          badge: "instantly premium",
        },
        {
          title: "Security & roles",
          desc: "Roles/access, API protection, basic security practices, data control.",
          badge: "Auth / RLS",
        },
        {
          title: "Integrations",
          desc: "Payments, email, notifications, analytics, CRM — wired reliably.",
          badge: "webhooks",
        },
        {
          title: "Clean architecture",
          desc: "Components, types, API layer and structure ready for growth — no trash after a month.",
          badge: "scalable",
        },
        {
          title: "After release",
          desc: "Deploy, domain/SSL, monitoring, bugfixes and roadmap from metrics.",
          badge: "support",
        },
      ],
    },
  },
};

/* ====== контекст ====== */

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: Dictionary;
};

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Client language resolution (after inline bootstrap in index.html):
 * 1) ?lang=ru|en
 * 2) /en/... or /ru/... URL prefix
 * 3) window.__TIVONIX_LANG__ (localStorage, set before React)
 * 4) default ru
 *
 * SSR/prerender uses `initialLang` from URL only — must stay in sync with bootstrap URL rules.
 */
function detectLang(): Lang {
  return readBootstrapLang(detectLangFromUrl());
}

function syncHtmlLang(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  // удобно для CSS: html[data-lang="en"] ...
  (document.documentElement as HTMLElement).dataset.lang = lang;
}

export function LangProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  /** SSR / forced start language (e.g. from `/en/...` URL). */
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? detectLang());

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch (_) {}
    syncHtmlLang(l);
  };

  // Sync <html lang/data-lang> after mount — never during the hydrate render.
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (_) {}
    syncHtmlLang(lang);
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      dict: DICT[lang],
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/** Syncs `lang` from `/en` or `/ru` URL prefixes (and partners paths). */
export function LangPathSync() {
  const { pathname } = useLocation();
  const { lang, setLang } = useLang();

  useEffect(() => {
    let next: Lang | null = null;
    const clean = pathname.replace(/\/+$/, "") || "/";
    if (clean === "/en" || clean.startsWith("/en/")) next = "en";
    else if (clean === "/ru" || clean.startsWith("/ru/")) next = "ru";
    else if (clean === "/partners") next = "ru";
    else if (
      clean === "/" ||
      clean === "/plans" ||
      clean === "/about" ||
      clean === "/projects" ||
      clean === "/contacts"
    ) {
      next = "ru";
    }
    if (next && next !== lang) setLang(next);
  }, [pathname, lang, setLang]);

  return null;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Title и meta description для главной — те же строки, что в Hero (один источник правды). */
export function homePageSeoFromDict(dict: Dictionary): { title: string; description: string } {
  const isRu = dict.header.home === "На главную";
  if (isRu) {
    return {
      title: "TIVONIX — сайты, CRM, боты и веб-продукты для бизнеса",
      description:
        "Разрабатываем лендинги, Telegram-ботов, CRM, личные кабинеты, SaaS и MVP — и связываем их в единый процесс: от первого обращения до оплаты.",
    };
  }

  return {
    title: "TIVONIX — websites, CRM, bots and web products for business",
    description:
      "We build landing pages, Telegram bots, CRMs, client portals, SaaS and MVPs — and connect them into one lead process from first inquiry to payment.",
  };
}
