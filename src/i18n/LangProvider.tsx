// src/i18n/LangProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ru" | "en";

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

type HeroDict = {
  titleLine1: string;
  titleLine2Prefix: string;
  titleLine2Premium: string;
  subtitle: string;
  emailPlaceholder: string;
  btnDemo: string;
  btnTelegram: string;
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

type Dictionary = {
  header: HeaderDict;
  hero: HeroDict;
  curtain: CurtainDict;
  whyUs: WhyUsDict;
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
      titleLine1: "Сделаем вам SaaS-продукт",
      titleLine2Prefix: "быстро, аккуратно и",
      titleLine2Premium: "с премиум-UI",
      subtitle:
        "Дизайн как у топ-SaaS + чистый код + быстрый MVP. Админ-панель, роли, таблицы, аналитика, платежи — всё под ключ.",
      emailPlaceholder: "Рабочий email",
      btnDemo: "Получить демо",
      btnTelegram: "Написать в Telegram",
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
        react: {
          label: "React",
          sub: "UI для продукта, компоненты, архитектура",
        },
        ts: {
          label: "TypeScript",
          sub: "Типы, безопасность, масштабирование",
        },
        js: {
          label: "JavaScript",
          sub: "Логика, анимации, интеграции",
        },
        node: {
          label: "Node.js",
          sub: "API, сервисы, фоновые задачи",
        },
        express: {
          label: "Express",
          sub: "Маршруты, middleware, auth",
        },
        supabase: {
          label: "Supabase",
          sub: "Postgres, RLS, Storage, Auth",
        },
        postgres: {
          label: "PostgreSQL",
          sub: "Схемы, индексы, запросы",
        },
        tailwind: {
          label: "Tailwind CSS",
          sub: "UI-система, токены, скорость верстки",
        },
        saas: {
          label: "SaaS UI / UX",
          sub: "Стекло, сетка, детали, премиум-типографика",
        },
        perf: {
          label: "Performance",
          sub: "Оптимизация, lazy, UX-скорость",
        },
      },
    },
    orbit: {
      badge: "ADMIN PANEL • SaaS",
      titlePrefix: "Админ-панели для",
      titleHighlight: "вашего продукта",
      description:
        "Роли и доступы, таблицы с фильтрами, статусы/модерация, дашборды и интеграции — всё аккуратно и масштабируемо.",
      bullets: [
        {
          title: "Роли и доступы",
          desc: "пользователи, права, аудит",
        },
        {
          title: "Таблицы и управление",
          desc: "поиск, фильтры, экспорт",
        },
        {
          title: "Аналитика и процессы",
          desc: "дашборды, статусы, выплаты",
        },
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
      titleLine1: "We build your SaaS product",
      titleLine2Prefix: "fast, neatly and",
      titleLine2Premium: "with premium UI",
      subtitle:
        "Top-tier SaaS design + clean code + fast MVP. Admin panel, roles, tables, analytics, payments — all delivered end-to-end.",
      emailPlaceholder: "Work email",
      btnDemo: "Get a demo",
      btnTelegram: "Message on Telegram",
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
        react: {
          label: "React",
          sub: "Product UI, components, architecture",
        },
        ts: {
          label: "TypeScript",
          sub: "Types, safety, scaling",
        },
        js: {
          label: "JavaScript",
          sub: "Logic, animations, integrations",
        },
        node: {
          label: "Node.js",
          sub: "APIs, services, background jobs",
        },
        express: {
          label: "Express",
          sub: "Routes, middleware, auth",
        },
        supabase: {
          label: "Supabase",
          sub: "Postgres, RLS, Storage, Auth",
        },
        postgres: {
          label: "PostgreSQL",
          sub: "Schemas, indexes, queries",
        },
        tailwind: {
          label: "Tailwind CSS",
          sub: "UI system, tokens, fast layout",
        },
        saas: {
          label: "SaaS UI / UX",
          sub: "Glassmorphism, grid, details, premium typography",
        },
        perf: {
          label: "Performance",
          sub: "Optimization, lazy, UX speed",
        },
      },
    },
    orbit: {
      badge: "ADMIN PANEL • SaaS",
      titlePrefix: "Admin panels for",
      titleHighlight: "your product",
      description:
        "Roles and access, data tables with filters, statuses/moderation, dashboards and integrations — all clean and scalable.",
      bullets: [
        {
          title: "Roles & access",
          desc: "users, permissions, audit",
        },
        {
          title: "Tables & management",
          desc: "search, filters, export",
        },
        {
          title: "Analytics & processes",
          desc: "dashboards, statuses, payouts",
        },
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

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "ru";
  const stored = (localStorage.getItem("lang") || "").toLowerCase();
  if (stored === "ru" || stored === "en") return stored;

  const nav = (navigator.language || "").toLowerCase();
  return nav.startsWith("ru") ? "ru" : "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => getInitialLang());

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value: LangContextValue = {
    lang,
    setLang,
    dict: DICT[lang],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LangProvider");
  }
  return ctx;
}
