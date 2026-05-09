import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { createContext, useState, useEffect, useMemo, useContext, useRef, lazy, Suspense, useId, useCallback, useLayoutEffect } from "react";
import { renderToString } from "react-dom/server";
import { useNavigate, useLocation, Link, useParams, Navigate, Routes, Route, MemoryRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createPortal } from "react-dom";
import { Bot, Zap, LayoutDashboard, Users, TrendingUp, ShieldCheck, ChevronLeft, ChevronRight, FolderOpen, Check, Plus } from "lucide-react";
import { SiTelegram, SiGmail, SiHubspot, SiGooglesheets, SiWhatsapp, SiNotion, SiGooglecalendar, SiClickup, SiStripe, SiGoogledocs, SiGoogleanalytics, SiZapier } from "react-icons/si";
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
      titleLine1: "Сделаем сайт или веб-сервис",
      titleLine2Prefix: "под задачи",
      titleLine2Premium: "вашего бизнеса",
      subtitle: "Создадим сайт или веб-сервис для вашего бизнеса. Разберём идею, спроектируем интерфейс, разработаем продукт и подготовим его к запуску. Всё — в одном месте и без технической путаницы.",
      emailPlaceholder: "Рабочий email",
      btnDemo: "Получить демо",
      btnTelegram: "Написать в Telegram",
      btnAutomation: "Автоматизировать ваш бизнес"
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
      titleLine1: "We build a site or web service",
      titleLine2Prefix: "for your",
      titleLine2Premium: "business goals",
      subtitle: "We unpack the idea, design the interface, build the product, and get it launch-ready. Everything in one place — without technical confusion.",
      emailPlaceholder: "Work email",
      btnDemo: "Get a demo",
      btnTelegram: "Message on Telegram",
      btnAutomation: "Automate your business"
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
      title: "Создание сайтов и веб-сервисов под ключ — TIVONIX",
      description: "TIVONIX создаёт сайты, лендинги, веб-сервисы, MVP, личные кабинеты, админки и Telegram-боты для бизнеса. Дизайн, разработка и запуск в одном процессе."
    };
  }
  const { titleLine1, subtitle } = dict.hero;
  return {
    title: `TIVONIX — ${titleLine1}`,
    description: subtitle
  };
}
function Container({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-6xl px-4 sm:px-6", children });
}
function Button({ variant = "primary", className, ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-6 py-4 text-[16px] font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/15";
  const styles = variant === "primary" ? "text-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]" : "bg-white/5 text-white border border-white/10 hover:bg-white/8";
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: [
        base,
        styles,
        variant === "primary" ? "bg-[var(--g)]" : "",
        className
      ].filter(Boolean).join(" "),
      ...props
    }
  );
}
function trackAdsConversion(eventLabel, eventCallback) {
  {
    return;
  }
}
function cx$9(...a) {
  return a.filter(Boolean).join(" ");
}
function clamp$3(n, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
const BRAND_CTA$1 = "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";
const ORANGE_STATIC = "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";
const CONIC_FRAME = "conic-gradient(from 210deg at 50% 50%, rgba(143,191,179,0.95), rgba(143,168,200,0.95), rgba(232,220,200,0.95), rgba(143,191,179,0.95))";
const CONTACT_EMAIL$1 = "tivoonix@gmail.com";
function isProbablyMobile() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
  return !!coarse || /Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(ua) || window.innerWidth < 820;
}
function openEmailDraft(to, subject, body) {
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (isProbablyMobile()) {
    window.location.href = mailto;
    return;
  }
  const w = window.open(gmail, "_blank", "noopener,noreferrer");
  if (!w) window.location.href = mailto;
}
function ModalProgressBar({
  progress,
  label
}) {
  const p = clamp$3(progress, 0, 1);
  const pct = Math.round(p * 100);
  const thumbLeft = `calc(${pct}% - 8px)`;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-6 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/10" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/2 h-[8px] -translate-y-1/2 overflow-hidden rounded-full bg-white/8", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-0 bottom-0 left-0 rounded-full",
          style: {
            width: `${pct}%`,
            background: BRAND_CTA$1,
            boxShadow: "0 0 28px rgba(255,120,40,0.55)",
            transition: "width 260ms cubic-bezier(.2,.9,.2,1)",
            backgroundSize: "200% 100%",
            animation: pct > 0 ? "tivonixBar 1.8s linear infinite" : "none"
          }
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/45 bg-black/85",
          style: {
            left: thumbLeft,
            transition: "left 260ms cubic-bezier(.2,.9,.2,1)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex min-w-[64px] flex-col items-end", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-[12px] font-extrabold tracking-wide text-white/90", children: [
        pct,
        "%"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-white/45", children: label })
    ] })
  ] });
}
function CurvyCheck({ on }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      className: cx$9("transition-opacity", on ? "opacity-100" : "opacity-0"),
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M5.5 12.6c2.0 1.6 3.3 3.2 4.2 5.1 2.6-4.8 5.8-8.2 10.0-11.2",
          stroke: "#FF9A3D",
          strokeWidth: "2.4",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function Chevron({ open }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      className: cx$9(
        "transition-transform duration-200",
        open ? "rotate-180" : "rotate-0"
      ),
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M6 9l6 6 6-6",
          stroke: "rgba(255,255,255,0.75)",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function FancySelect({
  label,
  value,
  onChange,
  options
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const [pos, setPos] = useState(null);
  const current = options.find((o) => o.value === value)?.label ?? value;
  useEffect(() => {
    if (!open) return;
    const update = () => {
      const b = btnRef.current;
      if (!b) return;
      const r = b.getBoundingClientRect();
      const gap = 8;
      const top = Math.round(r.bottom + gap);
      const maxH = Math.max(160, Math.round(window.innerHeight - top - 16));
      setPos({
        left: Math.round(r.left),
        top,
        width: Math.round(r.width),
        maxH
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const t = e.target;
      const b = btnRef.current;
      if (b && b.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const dropdown = open && pos ? createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "z-[9999]",
        style: {
          position: "fixed",
          left: pos.left,
          top: pos.top,
          width: pos.width
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "overflow-hidden rounded-2xl p-[1px] shadow-[0_28px_90px_rgba(0,0,0,0.65)]",
            style: { background: CONIC_FRAME },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "tivonix-dd max-h-[320px] overflow-auto rounded-2xl border border-white/10 bg-black/75 backdrop-blur-2xl",
                style: {
                  maxHeight: pos.maxH,
                  WebkitOverflowScrolling: "touch"
                },
                children: options.map((o) => {
                  const active = o.value === value;
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        onChange(o.value);
                        setOpen(false);
                      },
                      className: cx$9(
                        "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition",
                        active ? "bg-white/[0.08] text-white" : "bg-transparent text-white/78 hover:bg-white/[0.06] hover:text-white"
                      ),
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold", children: o.label }),
                        /* @__PURE__ */ jsx(CurvyCheck, { on: active })
                      ]
                    },
                    o.value
                  );
                })
              }
            )
          }
        )
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mb-1.5 text-[11.5px] font-semibold text-white/70", children: label }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "rounded-2xl p-[1px]",
        style: {
          background: "linear-gradient(90deg, rgba(255,154,61,0.72), rgba(255,255,255,0.10), rgba(143,168,200,0.35))"
        },
        children: /* @__PURE__ */ jsxs(
          "button",
          {
            ref: btnRef,
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: cx$9(
              "flex h-11 w-full items-center justify-between gap-3 rounded-2xl px-4",
              "border border-white/12 bg-white/[0.07] text-white",
              "backdrop-blur-xl outline-none",
              "hover:bg-white/[0.09] transition"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-[13px] text-white/90", children: current }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0", children: /* @__PURE__ */ jsx(Chevron, { open }) })
            ]
          }
        )
      }
    ),
    dropdown
  ] });
}
function StartModal({ open, onClose }) {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const defaults = useMemo(
    () => ({
      type: isRu ? "Лендинг / сайт" : "Landing / website",
      budget: isRu ? "Не знаю" : "Not sure",
      time: isRu ? "1–2 недели" : "1–2 weeks"
    }),
    [isRu]
  );
  const docs = useMemo(() => {
    if (isRu) {
      return [
        {
          label: "Согласие на обработку персональных данных",
          href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf"
        },
        {
          label: "Политика обработки персональных данных",
          href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf"
        }
      ];
    }
    return [
      { label: "Consent to personal data processing", href: "/doc/Consent_Tivonix_EN.pdf" },
      { label: "Privacy Policy", href: "/doc/Privacy_Policy_Tivonix_EN.pdf" }
    ];
  }, [isRu]);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const nameRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    telegram: "",
    company: "",
    projectType: defaults.type,
    budget: defaults.budget,
    timeframe: defaults.time,
    details: "",
    consent: false
    // ✅ добавили
  }));
  useEffect(() => {
    setForm((p) => {
      const wasDefaultType = p.projectType === "Лендинг / сайт" || p.projectType === "Landing / website";
      const wasDefaultBudget = p.budget === "Не знаю" || p.budget === "Not sure";
      const wasDefaultTime = p.timeframe === "1–2 недели" || p.timeframe === "1–2 weeks";
      return {
        ...p,
        projectType: wasDefaultType ? defaults.type : p.projectType,
        budget: wasDefaultBudget ? defaults.budget : p.budget,
        timeframe: wasDefaultTime ? defaults.time : p.timeframe
      };
    });
  }, [defaults.type, defaults.budget, defaults.time]);
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = window.setTimeout(() => setMounted(false), 200);
      return () => window.clearTimeout(t);
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => nameRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  const txt = useMemo(
    () => ({
      title: isRu ? "Заявка на сайт" : "Request",
      subtitle: isRu ? "Заполни пару полей — отвечу быстро." : "Fill a few fields — I’ll reply fast.",
      name: isRu ? "Имя" : "Name",
      email: "Email",
      telegram: isRu ? "Telegram / телефон" : "Telegram / phone",
      company: isRu ? "Компания" : "Company",
      projectType: isRu ? "Тип проекта" : "Project type",
      budget: isRu ? "Бюджет" : "Budget",
      timeframe: isRu ? "Сроки" : "Timeframe",
      details: isRu ? "Задача" : "Task",
      detailsPh: isRu ? "Коротко: страницы, примеры, функции…" : "Short: pages, examples, features…",
      send: isRu ? "Отправить" : "Send",
      cancel: isRu ? "Отмена" : "Cancel",
      required: isRu ? "Укажи имя и контакт." : "Add name and a contact.",
      consentRequired: isRu ? "Нужно согласиться с документами (галочка)." : "Please accept the documents (checkbox).",
      consentText: isRu ? "Я принимаю условия и согласен(на) с документами:" : "I agree with the documents:",
      close: isRu ? "Закрыть" : "Close",
      progressLabel: isRu ? "ГОТОВО" : "DONE",
      note: isRu ? "Откроется письмо в почте." : "Opens an email draft.",
      openDoc: isRu ? "Открыть" : "Open"
    }),
    [isRu]
  );
  const has = (v) => v.trim().length > 0;
  const progressPct = useMemo(() => {
    const steps = [
      has(form.name),
      has(form.email) || has(form.telegram),
      form.projectType !== defaults.type,
      form.budget !== defaults.budget,
      form.timeframe !== defaults.time,
      has(form.details),
      form.consent
      // ✅ добавили в прогресс
    ];
    const total = steps.length;
    const done = steps.filter(Boolean).length;
    let pct = Math.round(done / total * 100);
    const any = has(form.name) || has(form.email) || has(form.telegram) || has(form.details) || form.projectType !== defaults.type || form.budget !== defaults.budget || form.timeframe !== defaults.time || form.consent;
    if (pct === 0 && any) pct = 5;
    return pct;
  }, [form, defaults.type, defaults.budget, defaults.time]);
  const shouldRender = mounted || open;
  const update = (k, v) => {
    setErrorText("");
    setForm((p) => ({ ...p, [k]: v }));
  };
  const submit = async () => {
    const hasName = form.name.trim().length > 1;
    const hasContact = form.email.trim().length > 3 || form.telegram.trim().length > 2;
    if (!hasName || !hasContact) {
      setErrorText(txt.required);
      return;
    }
    if (!form.consent) {
      setErrorText(txt.consentRequired);
      return;
    }
    setSending(true);
    try {
      const subject = `[TIVONIX] ${isRu ? "Заявка" : "Request"} — ${form.name.trim().slice(0, 64)}`;
      const body = (isRu ? "Заявка на создание сайта" : "Website request") + `

${txt.name}: ${form.name || "-"}
${txt.email}: ${form.email || "-"}
${txt.telegram}: ${form.telegram || "-"}
${txt.company}: ${form.company || "-"}
${txt.projectType}: ${form.projectType || "-"}
${txt.budget}: ${form.budget || "-"}
${txt.timeframe}: ${form.timeframe || "-"}

${txt.details}:
${form.details || "-"}

${isRu ? "Согласие: Да" : "Consent: Yes"}
${isRu ? "Документы:" : "Documents:"}
` + docs.map((d) => `- ${d.label}: ${location.origin}${d.href}`).join("\n") + "\n";
      openEmailDraft(CONTACT_EMAIL$1, subject, body);
      trackAdsConversion("form_request");
      onClose();
    } finally {
      setSending(false);
    }
  };
  const onOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  const inputBase = cx$9(
    "w-full h-11 rounded-2xl px-4",
    "border border-white/12 bg-white/[0.07] text-white placeholder:text-white/35",
    "outline-none focus:border-white/22 focus:bg-white/[0.09]",
    "backdrop-blur-xl text-[13px]"
  );
  const cardH = "min(860px, calc(100dvh - 28px))";
  if (!shouldRender) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$9(
        "fixed inset-0 z-[70]",
        "flex items-center justify-center",
        "px-3 sm:px-5 py-4"
      ),
      onMouseDown: onOverlayMouseDown,
      "aria-hidden": !open,
      children: [
        /* @__PURE__ */ jsx("style", { children: `
          @keyframes tivonixBar {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 0%; }
          }

          /* кастомный скролл только в модалке */
          .tivonix-body {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
          }

          /* desktop: скрываем полосу */
          @media (min-width: 1024px) {
            .tivonix-body { scrollbar-width: none; }
            .tivonix-body::-webkit-scrollbar { width: 0; height: 0; }
          }

          /* mobile: тонкий кастомный */
          @media (max-width: 1023.98px) {
            .tivonix-body {
              scrollbar-width: thin;
              scrollbar-color: rgba(255,154,61,.75) rgba(255,255,255,.08);
            }
            .tivonix-body::-webkit-scrollbar { width: 7px; }
            .tivonix-body::-webkit-scrollbar-track {
              background: rgba(255,255,255,.08);
              border-radius: 999px;
            }
            .tivonix-body::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, rgba(255,215,176,.95), rgba(255,154,61,.98), rgba(255,106,26,.98));
              border-radius: 999px;
              border: 2px solid rgba(0,0,0,.45);
            }
          }

          /* dropdown scroll */
          .tivonix-dd {
            scrollbar-width: thin;
            scrollbar-color: rgba(255,154,61,.75) rgba(255,255,255,.08);
          }
          .tivonix-dd::-webkit-scrollbar { width: 7px; }
          .tivonix-dd::-webkit-scrollbar-track { background: rgba(255,255,255,.08); border-radius: 999px; }
          .tivonix-dd::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(255,215,176,.95), rgba(255,154,61,.98), rgba(255,106,26,.98));
            border-radius: 999px;
            border: 2px solid rgba(0,0,0,.45);
          }
        ` }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/70 backdrop-blur-[12px] transition-opacity duration-200 cursor-pointer",
            style: { opacity: open && visible ? 1 : 0, pointerEvents: open ? "auto" : "none" },
            onClick: onClose,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cx$9(
              "relative w-full",
              "max-w-[430px] sm:max-w-[760px] lg:max-w-[940px]",
              "transition-[transform,opacity] duration-200 ease-out"
            ),
            style: {
              opacity: open && visible ? 1 : 0,
              transform: open && visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
              pointerEvents: open ? "auto" : "none"
            },
            onMouseDown: (e) => e.stopPropagation(),
            role: "dialog",
            "aria-modal": "true",
            "aria-label": txt.title,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "rounded-[26px] p-[1px] shadow-[0_30px_110px_rgba(0,0,0,0.70)]",
                style: { background: CONIC_FRAME },
                children: /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "relative overflow-hidden rounded-[26px] border border-white/10 bg-black/45 backdrop-blur-2xl",
                    style: { height: cardH },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 opacity-[0.85]",
                          style: {
                            backgroundImage: "url(/images/121.webp)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(20px)",
                            transform: "scale(1.06)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 opacity-90",
                          style: {
                            backgroundImage: "radial-gradient(760px 420px at 18% 10%, rgba(255,154,61,0.18), transparent 60%),radial-gradient(720px 520px at 86% 35%, rgba(143,168,200,0.18), transparent 62%),radial-gradient(520px 520px at 42% 110%, rgba(143,191,179,0.16), transparent 60%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          "aria-hidden": true,
                          className: "pointer-events-none absolute inset-0 opacity-[0.24]",
                          style: {
                            backgroundImage: "radial-gradient(rgba(255,255,255,0.20) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                            maskImage: "radial-gradient(closest-side at 50% 40%, black, transparent 82%)",
                            WebkitMaskImage: "radial-gradient(closest-side at 50% 40%, black, transparent 82%)"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid h-full grid-rows-[auto_minmax(0,1fr)_auto]", children: [
                        /* @__PURE__ */ jsxs("div", { className: "px-4 pt-4 sm:px-6 md:px-8", children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                              /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-xl sm:hidden", children: /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: "/images/tivonix-logo-icon.png",
                                  alt: "TIVONIX",
                                  className: "h-6 w-6 opacity-90",
                                  draggable: false
                                }
                              ) }),
                              /* @__PURE__ */ jsx(
                                "img",
                                {
                                  src: "/images/tivonix-logo-lockup.png",
                                  alt: "TIVONIX",
                                  draggable: false,
                                  className: "hidden h-9 w-auto opacity-90 sm:block"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx(
                              "button",
                              {
                                type: "button",
                                onClick: onClose,
                                className: cx$9(
                                  "group grid h-9 w-9 place-items-center rounded-2xl sm:h-10 sm:w-10",
                                  "border border-white/14 bg-white/[0.07] backdrop-blur-xl",
                                  "transition-all duration-200 ease-out",
                                  "hover:scale-110 hover:bg-white/[0.12] hover:border-white/20",
                                  "active:scale-95",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                ),
                                "aria-label": txt.close,
                                children: /* @__PURE__ */ jsxs(
                                  "svg",
                                  {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    className: "transition-transform duration-200 ease-out group-hover:rotate-90",
                                    children: [
                                      /* @__PURE__ */ jsx(
                                        "path",
                                        {
                                          d: "M6 6L18 18",
                                          stroke: "#FFB36A",
                                          strokeWidth: "2",
                                          strokeLinecap: "round",
                                          className: "transition-opacity group-hover:opacity-90"
                                        }
                                      ),
                                      /* @__PURE__ */ jsx(
                                        "path",
                                        {
                                          d: "M18 6L6 18",
                                          stroke: "#FFB36A",
                                          strokeWidth: "2",
                                          strokeLinecap: "round",
                                          className: "transition-opacity group-hover:opacity-90"
                                        }
                                      )
                                    ]
                                  }
                                )
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
                            ModalProgressBar,
                            {
                              progress: progressPct / 100,
                              label: txt.progressLabel
                            }
                          ) }),
                          /* @__PURE__ */ jsxs("div", { className: "pointer-events-none mt-3 h-5", children: [
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "mx-auto h-[2px] w-full rounded-full opacity-95",
                                style: { background: ORANGE_STATIC }
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "mx-auto mt-[-2px] h-6 w-full blur-2xl opacity-40",
                                style: { background: ORANGE_STATIC }
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "tivonix-body px-4 pb-4 pt-2 sm:px-6 md:px-8", children: [
                          /* @__PURE__ */ jsxs("div", { className: "mt-1", children: [
                            /* @__PURE__ */ jsx("div", { className: "text-[18px] font-extrabold tracking-tight text-white sm:text-[20px]", children: txt.title }),
                            /* @__PURE__ */ jsx("div", { className: "mt-1 text-[12px] leading-relaxed text-white/65 sm:text-[12.5px]", children: txt.subtitle })
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 gap-3.5 sm:mt-5 sm:grid-cols-2 sm:gap-4", children: [
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsxs("div", { className: "mb-1.5 text-[11.5px] font-semibold text-white/70", children: [
                                txt.name,
                                " *"
                              ] }),
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  ref: nameRef,
                                  className: inputBase,
                                  value: form.name,
                                  onChange: (e) => update("name", e.target.value),
                                  autoComplete: "name"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("div", { className: "mb-1.5 text-[11.5px] font-semibold text-white/70", children: txt.email }),
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  className: inputBase,
                                  value: form.email,
                                  onChange: (e) => update("email", e.target.value),
                                  autoComplete: "email"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("div", { className: "mb-1.5 text-[11.5px] font-semibold text-white/70", children: txt.telegram }),
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  className: inputBase,
                                  value: form.telegram,
                                  onChange: (e) => update("telegram", e.target.value),
                                  autoComplete: "tel"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxs("div", { children: [
                              /* @__PURE__ */ jsx("div", { className: "mb-1.5 text-[11.5px] font-semibold text-white/70", children: txt.company }),
                              /* @__PURE__ */ jsx(
                                "input",
                                {
                                  className: inputBase,
                                  value: form.company,
                                  onChange: (e) => update("company", e.target.value)
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx(
                              FancySelect,
                              {
                                label: txt.projectType,
                                value: form.projectType,
                                onChange: (v) => update("projectType", v),
                                options: [
                                  { value: defaults.type, label: defaults.type },
                                  {
                                    value: isRu ? "Сайт-визитка" : "Business card website",
                                    label: isRu ? "Сайт-визитка" : "Business card website"
                                  },
                                  {
                                    value: isRu ? "Интернет-магазин" : "E-commerce",
                                    label: isRu ? "Интернет-магазин" : "E-commerce"
                                  },
                                  {
                                    value: isRu ? "SaaS / сервис" : "SaaS / product",
                                    label: isRu ? "SaaS / сервис" : "SaaS / product"
                                  },
                                  { value: isRu ? "Другое" : "Other", label: isRu ? "Другое" : "Other" }
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              FancySelect,
                              {
                                label: txt.budget,
                                value: form.budget,
                                onChange: (v) => update("budget", v),
                                options: [
                                  { value: defaults.budget, label: defaults.budget },
                                  { value: "€200–€500", label: "€200–€500" },
                                  { value: "€500–€1,000", label: "€500–€1,000" },
                                  { value: "€1,000–€3,000", label: "€1,000–€3,000" },
                                  { value: "€3,000+", label: "€3,000+" }
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx(
                              FancySelect,
                              {
                                label: txt.timeframe,
                                value: form.timeframe,
                                onChange: (v) => update("timeframe", v),
                                options: [
                                  { value: defaults.time, label: defaults.time },
                                  { value: isRu ? "2–4 недели" : "2–4 weeks", label: isRu ? "2–4 недели" : "2–4 weeks" },
                                  { value: isRu ? "1–2 месяца" : "1–2 months", label: isRu ? "1–2 месяца" : "1–2 months" },
                                  { value: isRu ? "Гибко" : "Flexible", label: isRu ? "Гибко" : "Flexible" }
                                ]
                              }
                            ) }),
                            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                              /* @__PURE__ */ jsx("div", { className: "mb-1.5 text-[11.5px] font-semibold text-white/70", children: txt.details }),
                              /* @__PURE__ */ jsx(
                                "textarea",
                                {
                                  className: cx$9(
                                    "min-h-[120px] w-full rounded-2xl px-4 py-3 text-[13px]",
                                    "border border-white/12 bg-white/[0.07] text-white placeholder:text-white/35",
                                    "outline-none focus:border-white/22 focus:bg-white/[0.09] backdrop-blur-xl"
                                  ),
                                  value: form.details,
                                  onChange: (e) => update("details", e.target.value),
                                  placeholder: txt.detailsPh
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-xl",
                                children: /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-start gap-3", children: [
                                  /* @__PURE__ */ jsx("span", { className: "mt-[2px] grid h-5 w-5 place-items-center rounded-[8px] border border-white/18 bg-black/30", children: /* @__PURE__ */ jsx(
                                    "input",
                                    {
                                      type: "checkbox",
                                      checked: form.consent,
                                      onChange: (e) => update("consent", e.target.checked),
                                      className: "h-4 w-4 accent-[#FF9A3D]"
                                    }
                                  ) }),
                                  /* @__PURE__ */ jsxs("span", { className: "text-[12px] leading-relaxed text-white/75", children: [
                                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-white/85", children: txt.consentText }),
                                    " ",
                                    /* @__PURE__ */ jsxs("span", { className: "text-white/55", children: [
                                      "(",
                                      isRu ? "откроются в новой вкладке" : "opens in a new tab",
                                      ")"
                                    ] }),
                                    /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-col gap-1.5", children: docs.map((d) => /* @__PURE__ */ jsxs(
                                      "a",
                                      {
                                        href: d.href,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-white/80 hover:text-white",
                                        children: [
                                          /* @__PURE__ */ jsx(
                                            "span",
                                            {
                                              className: "h-[6px] w-[6px] rounded-full",
                                              style: { background: "#FF9A3D" }
                                            }
                                          ),
                                          /* @__PURE__ */ jsx("span", { className: "underline decoration-white/25 underline-offset-4", children: d.label }),
                                          /* @__PURE__ */ jsxs("span", { className: "text-white/45", children: [
                                            "— ",
                                            txt.openDoc
                                          ] })
                                        ]
                                      },
                                      d.href
                                    )) })
                                  ] })
                                ] })
                              }
                            ) }),
                            errorText ? /* @__PURE__ */ jsx("div", { className: "sm:col-span-2 text-[11.5px] text-[#FFB36A]", children: errorText }) : null
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "h-6" })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 bg-black/40 px-4 pb-4 pt-3 sm:px-6 sm:pb-5 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
                          /* @__PURE__ */ jsx("div", { className: "text-[11.5px] text-white/45", children: txt.note }),
                          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                            /* @__PURE__ */ jsx(
                              Button,
                              {
                                onClick: onClose,
                                className: cx$9(
                                  "h-10 rounded-2xl px-5 text-[13px] font-semibold sm:h-11",
                                  "border border-white/12 bg-white/[0.06] text-white",
                                  "hover:bg-white/[0.09]"
                                ),
                                children: txt.cancel
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              Button,
                              {
                                onClick: submit,
                                disabled: sending || !form.consent,
                                className: cx$9(
                                  "h-10 rounded-2xl px-5 text-[13px] font-semibold sm:h-11",
                                  "!text-black",
                                  "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                                  "hover:brightness-[1.04] active:brightness-[0.96]",
                                  (sending || !form.consent) && "opacity-70 cursor-not-allowed"
                                ),
                                style: { background: BRAND_CTA$1 },
                                children: sending ? isRu ? "Отправляю…" : "Sending…" : txt.send
                              }
                            )
                          ] })
                        ] }) })
                      ] })
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
}
const TG_BOT_URL = "https://t.me/tivonixtech_leads_bot?start=calc";
function cx$8(...a) {
  return a.filter(Boolean).join(" ");
}
const NAV_MAIN = [
  { to: "/", key: "home" },
  { to: "/avtomatizaciya-biznesa", key: "automation" },
  { to: "/contacts", key: "contacts" },
  { to: "/projects", key: "projects" }
];
const BRAND_CTA = "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";
const ORANGE_LINE = "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";
const DESKTOP_MIN_WIDTH = 1280;
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
function useScrolled(threshold = 22) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
    };
  }, [threshold]);
  return scrolled;
}
function LangToggle({
  compact,
  reducedMotion
}) {
  const { lang, setLang } = useLang();
  const label = lang === "ru" ? "Выбор языка" : "Language";
  const h = compact ? "h-9 w-[5.25rem]" : "h-10 w-[5.75rem]";
  const text = compact ? "text-[11px]" : "text-xs";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx$8(
        "relative shrink-0 select-none rounded-full bg-white/[0.07] p-1 backdrop-blur-xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_22px_rgba(0,0,0,0.22)]",
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
            className: cx$8(
              "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/2)] rounded-full",
              !reducedMotion && "transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]"
            ),
            style: {
              background: BRAND_CTA,
              boxShadow: "0 4px 16px rgba(255,106,26,0.38)",
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
              className: cx$8(
                "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
                "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                text,
                lang === "ru" ? "text-black" : "text-white/60 hover:text-white/88"
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
              className: cx$8(
                "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
                "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                text,
                lang === "en" ? "text-black" : "text-white/60 hover:text-white/88"
              ),
              children: "EN"
            }
          )
        ] })
      ]
    }
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
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: cx$8(
        "relative inline-flex items-center gap-1 rounded-full",
        "border-0 bg-white/[0.07] backdrop-blur-xl p-1",
        compact ? "shadow-[0_12px_44px_rgba(0,0,0,0.38)]" : "shadow-[0_18px_64px_rgba(0,0,0,0.42)]"
      ),
      "aria-label": "Header navigation",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 rounded-full",
            style: {
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.09)"
            }
          }
        ),
        items.map((it) => {
          const isActive = it.key === activeKey;
          const pad = compact ? "px-3 h-9" : "px-4 h-10";
          const text = compact ? "text-[11px]" : "text-xs";
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: it.to,
              onClick: onItemClick(it.to),
              "aria-current": isActive ? "page" : void 0,
              className: cx$8(
                "relative rounded-full font-semibold transition flex items-center gap-2 select-none uppercase tracking-wide outline-none border-0",
                "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                pad,
                text,
                isActive ? "text-white bg-white/14 shadow-[0_10px_28px_rgba(0,0,0,0.32)]" : "text-white/75 hover:text-white hover:bg-white/[0.07]"
              ),
              style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
              children: [
                /* @__PURE__ */ jsx("span", { className: "leading-none", children: it.label }),
                isActive && /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": true,
                    className: "pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full opacity-95",
                    style: { background: ORANGE_LINE }
                  }
                )
              ]
            },
            it.key
          );
        })
      ]
    }
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion$1();
  const scrolled = useScrolled(26);
  const navigate = useNavigate();
  const location2 = useLocation();
  const { lang } = useLang();
  const isRu = lang === "ru";
  const burgerRef = useRef(null);
  const barRef = useRef(null);
  const [barH, setBarH] = useState(92);
  const measureBar = () => {
    const h = barRef.current?.getBoundingClientRect().height;
    if (h && Number.isFinite(h)) setBarH(Math.round(h));
  };
  useEffect(() => {
    const onResize = () => {
      measureBar();
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setOpen(false);
    };
    measureBar();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => burgerRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const body = document.body;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevLeft = body.style.left;
    const prevRight = body.style.right;
    const prevWidth = body.style.width;
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.left = prevLeft;
      body.style.right = prevRight;
      body.style.width = prevWidth;
      window.scrollTo(0, y);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    measureBar();
    const onResize = () => measureBar();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, scrolled]);
  const navLabel = (key) => {
    if (isRu) {
      if (key === "home") return "главная";
      if (key === "automation") return "автоматизация";
      if (key === "contacts") return "контакты";
      if (key === "projects") return "проекты";
    } else {
      if (key === "home") return "home";
      if (key === "automation") return "automation";
      if (key === "contacts") return "contacts";
      if (key === "projects") return "projects";
    }
    return key;
  };
  const activeKey = useMemo(() => {
    if (location2.pathname === "/contacts") return "contacts";
    if (location2.pathname === "/projects") return "projects";
    if (location2.pathname === "/avtomatizaciya-biznesa") return "automation";
    return "home";
  }, [location2.pathname]);
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
      if (location2.pathname !== "/") navigate("/");
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };
  const goHome = () => {
    setOpen(false);
    if (location2.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };
  const openStartModal = () => {
    setOpen(false);
    window.open(TG_BOT_URL, "_blank", "noopener,noreferrer");
  };
  const ariaHome = isRu ? "На главную" : "Go to home";
  const ariaMenu = isRu ? "Меню" : "Menu";
  const ctaTop = isRu ? "Рассчитать стоимость" : "Get an estimate";
  const ctaScrolled = isRu ? "Заказать сайт" : "Order a website";
  const dur = reducedMotion ? 0 : 280;
  const menuMaxH = `calc(100dvh - ${barH}px - 16px)`;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "h-[92px] sm:h-[100px] xl:h-[104px]" }),
    /* @__PURE__ */ jsxs("header", { className: "fixed inset-x-0 top-0 z-50", children: [
      /* @__PURE__ */ jsx("div", { className: "pt-3", ref: barRef, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cx$8(
            "relative transition-all",
            scrolled ? "rounded-[999px] bg-black/58 backdrop-blur-2xl border-0 shadow-[0_22px_72px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.06)]" : "rounded-[999px]"
          ),
          style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0 rounded-[999px] opacity-0 transition-opacity",
                style: {
                  opacity: scrolled ? 1 : 0,
                  transitionDuration: `${dur}ms`,
                  background: "radial-gradient(900px 120px at 50% 0%, rgba(255,122,32,0.28), transparent 60%)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                "aria-hidden": true,
                className: "pointer-events-none absolute left-10 right-10 top-0 h-[3px] rounded-full opacity-0 transition-opacity",
                style: {
                  opacity: scrolled ? 0.95 : 0,
                  transitionDuration: `${dur}ms`,
                  background: ORANGE_LINE
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cx$8(
                  "relative flex w-full min-w-0 items-center xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center xl:gap-x-4",
                  scrolled ? "px-4 sm:px-5" : "px-3 sm:px-4",
                  scrolled ? "h-[70px] sm:h-[74px]" : "h-[78px] sm:h-[82px]"
                ),
                style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex min-w-0 items-center gap-3 shrink-0 xl:justify-self-start", children: /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/",
                      onClick: (e) => {
                        e.preventDefault();
                        goHome();
                      },
                      className: cx$8(
                        "flex items-center outline-none",
                        "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 rounded-xl"
                      ),
                      "aria-label": ariaHome,
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "/images/tivonix-logo-lockup.png",
                          alt: "TIVONIX",
                          className: "h-8 sm:h-9 w-auto object-contain opacity-95 transition-opacity hover:opacity-100",
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
                      compact: scrolled
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "ml-auto hidden min-w-0 shrink-0 items-center gap-3 xl:ml-0 xl:flex xl:justify-self-end", children: [
                    /* @__PURE__ */ jsx(LangToggle, { reducedMotion }),
                    /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        onClick: openStartModal,
                        className: cx$8(
                          "rounded-full font-semibold !text-black outline-none !py-0",
                          "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                          "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                          "hover:brightness-[1.04] active:brightness-[0.96]",
                          scrolled ? "h-10 px-5" : "h-11 px-6"
                        ),
                        style: { background: BRAND_CTA },
                        children: /* @__PURE__ */ jsxs("span", { className: "relative grid grid-cols-1 grid-rows-1 place-items-center leading-none", children: [
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: cx$8(
                                "col-start-1 row-start-1 transition-all",
                                scrolled ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                              ),
                              style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
                              children: ctaTop
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: cx$8(
                                "col-start-1 row-start-1 transition-all",
                                scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                              ),
                              style: reducedMotion ? void 0 : { transitionDuration: `${dur}ms` },
                              children: ctaScrolled
                            }
                          )
                        ] })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "ml-auto xl:hidden flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(
                      Button,
                      {
                        type: "button",
                        onClick: openStartModal,
                        className: cx$8(
                          "rounded-2xl font-semibold !text-black outline-none !py-0",
                          "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                          "shadow-[0_18px_70px_rgba(255,120,40,0.30)]",
                          "hover:brightness-[1.04] active:brightness-[0.96]",
                          scrolled ? "h-10 px-4 text-sm" : "h-11 px-5 text-sm"
                        ),
                        style: { background: BRAND_CTA },
                        children: scrolled ? ctaScrolled : ctaTop
                      }
                    ) }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        ref: burgerRef,
                        type: "button",
                        className: cx$8(
                          "grid place-items-center outline-none border-0",
                          "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                          scrolled ? "h-10 w-10 rounded-2xl" : "h-11 w-11 rounded-2xl",
                          "bg-white/[0.08] backdrop-blur-xl shadow-[0_10px_36px_rgba(0,0,0,0.45)]",
                          "transition-[transform,background-color,box-shadow] duration-200 ease-out",
                          "hover:bg-white/[0.12] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
                          "active:scale-95",
                          open && "bg-white/[0.14] shadow-[0_14px_44px_rgba(0,0,0,0.5)]"
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
            )
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: "mobile-header-menu",
          className: cx$8("xl:hidden fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none"),
          "aria-hidden": !open,
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cx$8("absolute inset-0 transition-opacity duration-300", open ? "opacity-100" : "opacity-0"),
                style: {
                  background: "rgba(0,0,0,0.72)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)"
                },
                onClick: () => {
                  setOpen(false);
                  requestAnimationFrame(() => burgerRef.current?.focus());
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cx$8(
                  "absolute inset-0 flex flex-col bg-[#0a0a0c]",
                  "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                ),
                style: { transform: open ? "translateX(0)" : "translateX(100%)" },
                onClick: (e) => e.stopPropagation(),
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      "aria-hidden": true,
                      className: "pointer-events-none absolute inset-x-0 top-0 h-32 rounded-b-2xl opacity-90",
                      style: {
                        background: "radial-gradient(600px 80px at 50% 0%, rgba(255,154,61,0.22), transparent 65%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      "aria-hidden": true,
                      className: "pointer-events-none absolute left-6 right-6 top-0 h-[3px] rounded-full",
                      style: { background: ORANGE_LINE }
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "relative flex-1 flex flex-col min-h-0 pt-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-5 pr-5 sm:pt-6 sm:pr-6 mb-5", children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpen(false);
                          requestAnimationFrame(() => burgerRef.current?.focus());
                        },
                        className: cx$8(
                          "group grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-2xl shrink-0 border-0",
                          "bg-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
                          "transition-all duration-200 ease-out cursor-pointer",
                          "hover:scale-110 hover:bg-white/[0.13] active:scale-95",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                        ),
                        "aria-label": isRu ? "Закрыть меню" : "Close menu",
                        children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            className: "transition-transform duration-200 ease-out",
                            children: [
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  d: "M6 6L18 18",
                                  stroke: "#FF9A3D",
                                  strokeWidth: "2",
                                  strokeLinecap: "round"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  d: "M18 6L6 18",
                                  stroke: "#FF9A3D",
                                  strokeWidth: "2",
                                  strokeLinecap: "round"
                                }
                              )
                            ]
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "px-6 pb-6 pt-0 overflow-y-auto overscroll-contain", style: { maxHeight: menuMaxH }, onClick: (e) => e.stopPropagation(), children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: TG_BOT_URL,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: cx$8(
                              "h-12 rounded-2xl font-semibold flex items-center justify-center",
                              "bg-[#FF9A3D] text-black hover:brightness-105 active:brightness-95",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
                            ),
                            onClick: () => setOpen(false),
                            children: ctaScrolled
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          Link,
                          {
                            to: "/contacts",
                            className: cx$8(
                              "h-12 rounded-2xl font-medium flex items-center justify-center border-0 bg-white/[0.07] text-white",
                              "shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:bg-white/[0.11] active:bg-white/[0.08]",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
                            ),
                            onClick: () => setOpen(false),
                            children: isRu ? "Контакты" : "Contact"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx("nav", { className: "mt-6 flex flex-col gap-1", "aria-label": isRu ? "Навигация" : "Navigation", children: tabsItems.map((item) => /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: item.to,
                          className: cx$8(
                            "flex items-center justify-between rounded-xl px-3 py-3.5 text-white/90 hover:text-white",
                            "hover:bg-white/[0.05] active:bg-white/[0.03] transition-colors"
                          ),
                          onClick: () => {
                            setOpen(false);
                            requestAnimationFrame(() => burgerRef.current?.focus());
                          },
                          children: [
                            /* @__PURE__ */ jsx("span", { children: item.label }),
                            /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", className: "shrink-0 text-white/50", children: /* @__PURE__ */ jsx("path", { d: "M9 18l6-6-6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
                          ]
                        },
                        item.key
                      )) }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "my-5 h-px w-full opacity-80",
                          style: {
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)"
                          },
                          "aria-hidden": true
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-white/70", children: isRu ? "Язык" : "Language" }),
                        /* @__PURE__ */ jsx(LangToggle, { compact: true, reducedMotion })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "h-4" })
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(StartModal, { open: startOpen, onClose: () => setStartOpen(false) })
  ] });
}
function Section({
  id,
  className,
  children
}) {
  return /* @__PURE__ */ jsx("section", { id, className: ["py-14 sm:py-20", className].filter(Boolean).join(" "), children });
}
const HERO_BG_IMG = "/images/hero1.png";
const CONTACT_EMAIL = "tivoonix@gmail.com";
const HeroWebGLBg$4 = lazy(() => import("./assets/HeroWebGLBg-CnY8eKt4.js"));
function cx$7(...a) {
  return a.filter(Boolean).join(" ");
}
function useMediaQuery(query) {
  const getMatch = () => typeof window !== "undefined" ? window.matchMedia(query).matches : false;
  const [matches, setMatches] = useState(getMatch);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    if (m.addEventListener) m.addEventListener("change", onChange);
    else m.addListener(onChange);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", onChange);
      else m.removeListener(onChange);
    };
  }, [query]);
  return matches;
}
const HERO_STYLES$1 = `
  .hero{
    --tiv-amber: 255,154,61;
    --tiv-orange: 255,106,26;
    --tiv-cream: 255,215,176;
    --tiv-ice: 245,246,248;

    /* mobile bg knobs */
    --hero-img-shift: 0vh;
    --hero-img-scale: 1.04;
  }

  .heroBg{ position:absolute; inset:0; background:#000000; overflow:hidden; }

  .heroBg .heroImg{
    position:absolute; inset:0;
    width:100%; height:100%;
    object-fit:cover;
    object-position:50% 50%;
    transform: translate3d(0,var(--hero-img-shift),0) scale(var(--hero-img-scale));
    filter:saturate(1.05) contrast(1.04);
    will-change: transform;
  }

  .heroWebgl{
    position:absolute; inset:0;
    width:100%; height:100%;
    transform:scale(1.03);
    will-change: transform;
    pointer-events:auto;
  }
  .heroWebgl canvas{ pointer-events:auto; }

  .heroOverlay{
    position:absolute; inset:0;
    background:
      linear-gradient(90deg,
        rgba(0,0,0,0.82) 0%,
        rgba(0,0,0,0.64) 28%,
        rgba(0,0,0,0.30) 52%,
        rgba(0,0,0,0.12) 68%,
        rgba(0,0,0,0.26) 100%),
      radial-gradient(120% 90% at 55% 35%,
        rgba(var(--tiv-amber),0.14) 0%,
        rgba(var(--tiv-orange),0.10) 32%,
        rgba(0,0,0,0) 62%),
      radial-gradient(120% 120% at 50% 55%,
        rgba(0,0,0,0.18) 0%,
        rgba(0,0,0,0.84) 72%,
        rgba(0,0,0,1) 100%);
  }

  .heroGrain{
    position:absolute; inset:0;
    opacity:.10;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.26) 1px, transparent 0);
    background-size:28px 28px;
    mix-blend-mode:overlay;
    pointer-events:none;
  }

  /* ===== DESKTOP typography (как было) ===== */
  .heroH1{
    font-weight:850;
    letter-spacing:-0.03em;
    line-height:1.06;
    text-shadow:0 14px 38px rgba(0,0,0,0.86);
  }

  /* ===== CTA Gmail: тёмно-серый фирменный, без обводки ===== */
  .gmailBtn{
    border-radius:14px;
    border:none;
    background:#2a2a2a;
    backdrop-filter:none;
    -webkit-backdrop-filter:none;
    box-shadow:none;
    transition:transform .18s ease, background .18s ease;
  }
  .gmailBtn:hover{
    transform:translateY(-1px);
    background:#363636;
  }
  .gmailBtn:active{ transform:translateY(0px); }

  /* ===== Mobile (Vercel-like) — только стилями, без другой разметки ===== */

  /* Резерв снизу, чтобы фон не лез на текст */
  @media (max-width: 640px){
    .hero{
      --hero-img-shift: 16vh;   /* опусти фон */
      --hero-img-scale: 1;
    }
    .heroBg .heroImg{
      inset: auto;
      width: 88%;
      height: 88%;
      left: 50%;
      top: 68%;
      object-fit: contain;
      object-position: 50% 50%;
      transform: translate3d(-50%, -50%, 0) scale(var(--hero-img-scale));
    }

    /* Моб. оверлей: верх темнее, низ “чище” */
@media (max-width: 640px){
  .heroOverlay{
    background:
      /* общий диммер */
      linear-gradient(0deg,
        rgba(0,0,0,0.40),
        rgba(0,0,0,0.40)
      ),
      /* верх темнее под текст */
      linear-gradient(180deg,
        rgba(0,0,0,0.92) 0%,
        rgba(0,0,0,0.72) 28%,
        rgba(0,0,0,0.35) 58%,
        rgba(0,0,0,0.15) 72%,
        rgba(0,0,0,0.78) 100%
      );
  }
}

    .hero .heroWrap{
      text-align:left;
      padding-top: 2px;
      padding-bottom: clamp(220px, 40vh, 440px);
    }
    .hero .heroSubtitle{ margin-left:0; margin-right:auto; }

    /* Типографика мобилки */
    .hero .heroTitleCaps{ text-transform:none !important; letter-spacing:-0.02em !important; }
    .hero .heroH1{
      line-height:1.04;
      letter-spacing:-0.035em;
      text-shadow:none;
    }

    .hero .heroH1{ max-width: 20ch; margin-left:0; margin-right:auto; }
    .hero .heroSubtitle{
      font-size: 13.75px !important;
      line-height: 1.6 !important;
      color: rgba(255,255,255,0.68) !important;
      max-width: 48ch;
    }

    /* CTA: столбик, выравнивание как у текста */
    .hero .heroCtas{
      margin-top: 18px !important;
      display:grid !important;
      grid-template-columns: 1fr;
      gap: 10px !important;
      max-width: min(100%, 22rem);
      margin-left: 0 !important;
      margin-right: auto !important;
    }

    .hero .gmailBtn,
    .hero .tgBtn,
    .hero .heroAutomationBtn{
      height: 46px !important;
      border-radius: 14px !important;
      font-size: 13.5px !important;
      font-weight: 700 !important;
      letter-spacing: -0.012em !important;
      box-shadow: none !important;
    }

    .hero .tgBtn{
      background: #FF8A1E !important;
      color: rgba(0,0,0,0.92) !important;
      border: 1px solid rgba(255,140,60,0.55) !important;
    }

    .hero .gmailBtn{
      background: #2a2a2a !important;
      color: rgba(255,255,255,0.92) !important;
      border: none !important;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    /* Белая — та же геометрия + тонкая обводка */
    .hero .heroAutomationBtn{
      background: rgba(255,255,255,0.96) !important;
      color: rgba(0,0,0,0.9) !important;
      border: 1px solid rgba(255,255,255,0.55) !important;
    }

    /* Супер узкие экраны */
    @media (max-width: 360px){
      .hero .gmailBtn, .hero .tgBtn, .hero .heroAutomationBtn{ height: 46px !important; }
      .hero .heroH1{ max-width: 20ch; }
    }
  }

  @media (prefers-reduced-motion: reduce){
    .heroBg .heroImg{ transform:none; will-change:auto; }
    .heroWebgl{ transform:none; }
    .gmailBtn{ transition:none; }
  }
`;
function buildMailBody$1(lang) {
  if (lang === "ru") {
    return "Здравствуйте!\n\nХочу получить оценку разработки.\n\n1) Что нужно сделать (1–2 предложения):\n- \n\n2) Ключевые функции:\n- \n- \n- \n\n3) Есть ли дизайн/ТЗ/прототип:\n- \n\n4) Сроки / бюджет (если есть):\n- \n\nКонтакты для связи:\n- \n\nСпасибо!";
  }
  return "Hi!\n\nI'd like to get an estimate.\n\n1) What we’re building (1–2 sentences):\n- \n\n2) Key features:\n- \n- \n- \n\n3) Do you have design/spec/prototype:\n- \n\n4) Timeline / budget (if any):\n- \n\nContact details:\n- \n\nThank you!";
}
function getSubject$1(lang) {
  return lang === "ru" ? "Запрос оценки с сайта TIVONIX" : "TIVONIX inquiry: estimate";
}
function buildGmailUrl$1(to, subject, body) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function Hero() {
  const { lang, dict } = useLang();
  const hero = dict.hero;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const { gmailUrl, gmailLabel, tgLabel } = useMemo(() => {
    const subject = getSubject$1(lang);
    const body = buildMailBody$1(lang);
    return {
      gmailUrl: buildGmailUrl$1(CONTACT_EMAIL, subject, body),
      gmailLabel: lang === "ru" ? "Открыть в Gmail" : "Open in Gmail",
      tgLabel: "Telegram"
    };
  }, [lang]);
  return /* @__PURE__ */ jsxs(
    Section,
    {
      className: cx$7(
        "hero relative isolate overflow-hidden flex items-center",
        "pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20",
        "min-h-[78vh] sm:min-h-[82vh] lg:min-h-[86vh]"
      ),
      children: [
        /* @__PURE__ */ jsx("style", { children: HERO_STYLES$1 }),
        /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxs("div", { className: "heroBg", children: [
            mounted && isDesktop ? /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-0",
                style: {
                  background: "radial-gradient(120% 90% at 55% 35%, rgba(255,154,61,0.18) 0%, rgba(255,106,26,0.10) 34%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #030303 100%)"
                }
              }
            ) : null,
            mounted && isDesktop ? /* @__PURE__ */ jsx("div", { className: "heroWebgl pointer-events-auto", children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(HeroWebGLBg$4, {}) }) }) : /* @__PURE__ */ jsx(
              "img",
              {
                className: "heroImg",
                src: HERO_BG_IMG,
                alt: "",
                draggable: false,
                loading: "eager",
                decoding: "async"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "heroOverlay" }),
          /* @__PURE__ */ jsx("div", { className: "heroGrain" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent max-sm:h-52 max-sm:from-black/[0.72] max-sm:via-black/45" })
        ] }),
        /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-6xl px-1 sm:px-0 w-full", children: /* @__PURE__ */ jsxs("div", { className: "pt-2 sm:pt-6 lg:pt-8 heroWrap", children: [
          /* @__PURE__ */ jsxs("h1", { className: cx$7("heroH1 tracking-[-0.02em]", "text-[30px] sm:text-[46px] lg:text-[54px]"), children: [
            /* @__PURE__ */ jsx("span", { className: "block font-[850] text-white/95 uppercase heroTitleCaps", children: hero.titleLine1 }),
            /* @__PURE__ */ jsx("span", { className: "block font-[850] text-white/80 uppercase heroTitleCaps", children: hero.titleLine2Prefix }),
            /* @__PURE__ */ jsx("span", { className: "block font-[850] text-white/95 uppercase heroTitleCaps", children: hero.titleLine2Premium })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed font-medium text-white/85 heroSubtitle", children: hero.subtitle }),
          /* @__PURE__ */ jsxs("div", { className: "mt-7 flex w-full max-w-2xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start heroCtas", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: TG_BOT_URL,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": tgLabel,
                className: cx$7(
                  "tgBtn group relative w-full sm:w-auto",
                  "inline-flex items-center justify-center",
                  "rounded-xl h-[50px] sm:h-[52px] px-5 sm:px-6",
                  "text-center font-[780] tracking-[-0.01em]",
                  "text-[14px] sm:text-[15px] text-black whitespace-nowrap",
                  "border border-orange-500/45 shadow-[0_12px_40px_rgba(255,106,40,0.22)]",
                  "transition active:translate-y-[1px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                ),
                style: {
                  background: "#FF8A1E"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "relative z-10", children: tgLabel }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition duration-300 group-hover:opacity-70",
                      style: {
                        background: "radial-gradient(700px 120px at 50% 30%, rgba(255,176,32,0.65), rgba(0,0,0,0))"
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: gmailUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": gmailLabel,
                className: cx$7(
                  "gmailBtn",
                  "inline-flex items-center justify-center",
                  "rounded-xl h-[50px] sm:h-[52px] px-5 sm:px-6",
                  "w-full sm:w-auto whitespace-nowrap",
                  "text-white/90 text-[14px] sm:text-[15px] font-[780]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                ),
                children: gmailLabel
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/avtomatizaciya-biznesa",
                className: cx$7(
                  "heroAutomationBtn",
                  "inline-flex items-center justify-center",
                  "rounded-xl h-[50px] sm:h-[52px] px-5 sm:px-6",
                  "w-full sm:w-auto",
                  "text-center font-[780] tracking-[-0.01em]",
                  "text-[14px] sm:text-[15px] whitespace-nowrap",
                  "border border-white/50 bg-white text-black hover:bg-white/95",
                  "transition active:translate-y-[1px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                ),
                children: hero.btnAutomation
              }
            )
          ] })
        ] }) }) })
      ]
    }
  );
}
const STICKY_TOP = 96;
const MOBILE_STICKY_TOP = "calc(var(--header-h, 72px) + 10px)";
const MOBILE_CARD_MAX_W = 320;
function clamp$2(n, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function ProgressBar({
  progress,
  height,
  thin = false,
  showPercent = false
}) {
  const w = thin ? 12 : 16;
  const p = clamp$2(progress, 0, 1);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex justify-center", style: { height, width: w }, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 w-[2px] rounded-full bg-white/10" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 overflow-hidden rounded-full bg-white/8", children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute bottom-0 left-0 right-0 rounded-full",
          style: {
            height: `${p * 100}%`,
            background: "#F97316"
          }
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/45 bg-black/85",
          style: {
            top: `${p * 100}%`,
            marginTop: -6
          }
        }
      )
    ] }),
    showPercent && /* @__PURE__ */ jsxs("div", { className: "mt-3 text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase", children: [
      Math.round(p * 100),
      "%"
    ] })
  ] });
}
function StackCard({
  item,
  index,
  reveal,
  setRef,
  labelId,
  descId
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setRef,
      className: "relative mx-auto w-[min(86vw,var(--cardW))] text-left sm:w-full sm:mx-0",
      style: {
        ["--cardW"]: `${MOBILE_CARD_MAX_W}px`,
        opacity: reveal ? 1 : 0,
        transform: reveal ? "translateY(0)" : "translateY(14px)",
        transition: "transform .45s cubic-bezier(.2,.9,.2,1), opacity .4s ease",
        transitionDelay: `${index * 26}ms`,
        contentVisibility: "auto",
        containIntrinsicSize: "320px 320px"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "\n          relative w-full overflow-hidden rounded-[30px] p-[2px]\n          aspect-square\n          sm:aspect-auto sm:h-[200px]\n          focus-visible:outline-none\n        ",
            style: {
              background: "linear-gradient(135deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.04) 45%, rgba(255,255,255,.08) 100%)"
            },
            children: /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full overflow-hidden rounded-[28px] bg-black/55", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.src,
                  alt: "",
                  loading: "lazy",
                  decoding: "async",
                  draggable: false,
                  className: "h-full w-full select-none brightness-[0.88] saturate-[0.68] contrast-[0.96]",
                  style: { objectFit: "cover", objectPosition: "center" }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/45",
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 ring-1 ring-white/6" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx("div", { id: labelId, className: "text-[12px] font-semibold tracking-[0.20em] uppercase text-white/72", children: item.label }),
            /* @__PURE__ */ jsx("div", { className: "text-[11px] font-semibold tracking-[0.18em] uppercase text-white/38", children: item.category })
          ] }),
          item.note && descId && /* @__PURE__ */ jsx("div", { id: descId, className: "mt-1 text-[12.5px] leading-relaxed text-white/55", children: item.note })
        ] })
      ]
    }
  );
}
function WhyUs() {
  const { dict, lang } = useLang();
  const isRu = lang === "ru";
  const w = dict.whyUs;
  const sectionId = useId();
  const badgeLeft = w?.badgeLeft ?? (isRu ? "СТЕК" : "STACK");
  const badgeCenter = w?.badgeCenter ?? (isRu ? "ТЕХНОЛОГИИ" : "TECH");
  const badgeRight = w?.badgeRight ?? (isRu ? "МОДУЛИ" : "MODULES");
  const title1 = w.titleTop ?? (isRu ? "С чем мы" : "Our");
  const title2 = w.titleBottom ?? (isRu ? "работаем" : "stack");
  const stack = useMemo(
    () => [
      // public/images/stack — имена файлов как в папке (PNG с заглавной / полным названием)
      { id: "supabase", label: "Supabase", src: "/images/stack/Supabase.png", category: "Platform" },
      { id: "react", label: "React", src: "/images/stack/React.png", category: "Frontend" },
      { id: "ts", label: "TypeScript", src: "/images/stack/TypeScript.png", category: "Frontend" },
      { id: "tw", label: "Tailwind", src: "/images/stack/Tailwind.png", category: "Frontend" },
      { id: "node", label: "Node.js", src: "/images/stack/Node.js.png", category: "Backend" },
      { id: "ex", label: "Express", src: "/images/stack/Express.png", category: "Backend" },
      { id: "pg", label: "Postgres", src: "/images/stack/Postgres.png", category: "Database" },
      { id: "html", label: "HTML", src: "/images/stack/HTML.png", category: "Frontend" },
      { id: "css", label: "CSS", src: "/images/stack/CSS.png", category: "Frontend" },
      { id: "js", label: "JavaScript", src: "/images/stack/JavaScript.png", category: "Frontend" }
    ],
    []
  );
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const metricsRef = useRef({
    firstY: 0,
    lastY: 0,
    ready: false
  });
  const [reveal, setReveal] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setReveal(true);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const recalcMetrics = useCallback(() => {
    if (typeof window === "undefined") return;
    const els = itemRefs.current.filter(Boolean);
    if (!els.length) {
      metricsRef.current.ready = false;
      return;
    }
    let first = Number.POSITIVE_INFINITY;
    let last = Number.NEGATIVE_INFINITY;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      const centerY = r.top + window.scrollY + r.height / 2;
      if (centerY < first) first = centerY;
      if (centerY > last) last = centerY;
    }
    metricsRef.current.firstY = first;
    metricsRef.current.lastY = last;
    metricsRef.current.ready = last - first > 8;
  }, []);
  const updateProgress = useCallback(() => {
    if (typeof window === "undefined") return;
    const m = metricsRef.current;
    if (!m.ready) {
      setScrollProgress(0);
      return;
    }
    const midView = window.scrollY + window.innerHeight * 0.5;
    const raw = (midView - m.firstY) / (m.lastY - m.firstY);
    const next = clamp$2(raw, 0, 1);
    if (Math.abs(next - progressRef.current) > 5e-3) {
      progressRef.current = next;
      setScrollProgress(next);
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateProgress();
      });
    };
    const onResize = () => {
      recalcMetrics();
      onScroll();
    };
    const ro = rootRef.current ? new ResizeObserver(onResize) : null;
    if (ro && rootRef.current) ro.observe(rootRef.current);
    const t = window.setTimeout(() => {
      recalcMetrics();
      updateProgress();
    }, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, [recalcMetrics, updateProgress]);
  useEffect(() => {
    if (!reveal) return;
    const id = requestAnimationFrame(() => {
      recalcMetrics();
      updateProgress();
    });
    return () => cancelAnimationFrame(id);
  }, [reveal, recalcMetrics, updateProgress]);
  return /* @__PURE__ */ jsx(Section, { className: "pt-[150px] sm:pt-[200px] pb-16 sm:pb-24", children: /* @__PURE__ */ jsxs("div", { ref: rootRef, className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 -z-10 bg-black" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-0 right-0 top-0 -z-10 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" }),
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute -z-10 inset-0", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute -left-24 top-20 h-[520px] w-[520px] rounded-full opacity-[0.22]",
          style: {
            background: "radial-gradient(circle at 30% 30%, rgba(249,115,22,.25), rgba(249,115,22,0) 60%)"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute -right-24 top-40 h-[520px] w-[520px] rounded-full opacity-[0.18]",
          style: {
            background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,.12), rgba(255,255,255,0) 62%)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid items-start gap-10 lg:grid-cols-[520px_minmax(0,1fr)_60px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:sticky", style: { top: STICKY_TOP }, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-[12px] font-semibold tracking-[0.26em] uppercase", children: [
            /* @__PURE__ */ jsx("span", { className: "text-white/85", children: badgeLeft }),
            /* @__PURE__ */ jsx("span", { className: "text-white/25", children: " • " }),
            /* @__PURE__ */ jsx("span", { className: "text-[#F97316]/95", children: badgeCenter }),
            /* @__PURE__ */ jsx("span", { className: "text-white/25", children: " • " }),
            /* @__PURE__ */ jsx("span", { className: "text-white/70", children: badgeRight })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-white/18 via-white/8 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "\n                  mt-5 uppercase leading-[0.98] tracking-[-0.02em]\n                  text-[34px] sm:text-[48px] lg:text-[58px]\n                ",
            "aria-label": isRu ? "С чем мы работаем" : "Our stack",
            children: [
              /* @__PURE__ */ jsx("span", { className: "block font-[820] text-white/95", children: title1 }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "block font-[820] bg-gradient-to-r from-white via-white to-[#F97316] bg-clip-text text-transparent",
                  style: { WebkitTextFillColor: "transparent" },
                  children: title2
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[16px_minmax(0,1fr)] items-start gap-4 lg:block", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "sticky self-start lg:hidden",
              style: { top: MOBILE_STICKY_TOP },
              children: /* @__PURE__ */ jsx(ProgressBar, { progress: scrollProgress, height: 220, thin: true })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 justify-items-center sm:justify-items-stretch sm:grid-cols-2 sm:gap-7", children: stack.map((it, i) => {
            const labelId = `${sectionId}-${it.id}-label`;
            const descId = it.note ? `${sectionId}-${it.id}-desc` : void 0;
            return /* @__PURE__ */ jsx(
              StackCard,
              {
                item: it,
                index: i,
                reveal,
                labelId,
                descId,
                setRef: (el) => {
                  itemRefs.current[i] = el;
                }
              },
              it.id
            );
          }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none sticky bottom-0 mt-10 h-16 w-full bg-gradient-to-t from-black via-black/95 to-transparent" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:sticky", style: { top: STICKY_TOP }, children: /* @__PURE__ */ jsx(ProgressBar, { progress: scrollProgress, height: 320, showPercent: true }) })
    ] }) })
  ] }) });
}
function cx$6(...a) {
  return a.filter(Boolean).join(" ");
}
const IMG = "/images/gen.webp";
const TG_URL$1 = "https://t.me/TIVONIX";
const EMAIL = "tivoonix@gmail.com";
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}
const appear = (on) => cx$6(
  "will-change-[opacity,transform]",
  "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
  on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
);
const delay = (ms) => ({ ["transitionDelay"]: `${ms}ms` });
const COPY = {
  ru: {
    eyebrow: "САЙТЫ • СЕРВИСЫ • ЗАПУСК",
    h: "Создадим сайт или веб-сервис\nдля вашего бизнеса",
    p: "Поможем понять, что нужно разработать, сколько это займёт и с чего лучше начать. Дизайн, разработка и запуск — в одном процессе.",
    pCompact: "Поможем понять, что нужно разработать, сколько это займёт и с чего лучше начать. Дизайн, разработка и запуск — в одном процессе.",
    trust: "Ответим в течение дня • Первая консультация — бесплатно",
    tg: "Написать в Telegram",
    emailBtnLabel: "Открыть в Gmail",
    emailAria: "Открыть Gmail"
  },
  en: {
    eyebrow: "SaaS • MVP • Landing pages",
    h: "Launch your product faster",
    p: "UX/UI + frontend: from idea to design and build. Send 2–3 lines — I’ll reply with the best format, a rough budget range, and next steps.",
    pCompact: "UX/UI + frontend: from idea to design and build. Send 2–3 lines — I’ll reply with next steps.",
    trust: "I reply within a day • Free 15-min intro call",
    tg: "Write on Telegram",
    emailBtnLabel: "Open in Gmail",
    emailAria: "Open Gmail compose"
  }
};
const HERO_STYLES = `
  .gmailBtn{
    border-radius:18px;
    border:1px solid rgba(255,255,255,0.25);
    background:rgba(0,0,0,0.35);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    transition:transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .gmailBtn:hover{
    transform:translateY(-1px);
    background:rgba(255,255,255,0.06);
    border-color:rgba(255,255,255,0.30);
  }
  .gmailBtn:active{ transform:translateY(0px); }

  .tgBtn{
    border-radius:18px;
    border:1px solid rgba(255,255,255,0.18);
    background:rgba(0,0,0,0.34);
    backdrop-filter:blur(12px);
    -webkit-backdrop-filter:blur(12px);
    box-shadow:inset 0 1px 0 rgba(255,255,255,0.06);
    transition:transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .tgBtn:hover{
    transform:translateY(-1px);
    background:rgba(255,255,255,0.06);
    border-color:rgba(255,255,255,0.26);
  }
  .tgBtn:active{ transform:translateY(0px); }
`;
function buildMailBody(lang) {
  if (lang === "ru") {
    return "Здравствуйте!\n\nХочу получить оценку разработки.\n\n1) Что нужно сделать (1–2 предложения):\n- \n\n2) Ключевые функции:\n- \n- \n- \n\n3) Есть ли дизайн/ТЗ/прототип:\n- \n\n4) Сроки / бюджет (если есть):\n- \n\nКонтакты для связи:\n- \n\nСпасибо!";
  }
  return "Hi!\n\nI'd like to get an estimate.\n\n1) What we’re building (1–2 sentences):\n- \n\n2) Key features:\n- \n- \n- \n\n3) Do you have design/spec/prototype:\n- \n\n4) Timeline / budget (if any):\n- \n\nContact details:\n- \n\nThank you!";
}
function getSubject(lang) {
  return lang === "ru" ? "Запрос оценки с сайта TIVONIX" : "TIVONIX inquiry: estimate";
}
function buildGmailUrl(to, subject, body) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function AppsOrbitBlock() {
  const { lang } = useLang();
  const t = lang === "ru" ? COPY.ru : COPY.en;
  const [bgFailed, setBgFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(reducedMotion);
  const screenRef = useRef(null);
  const contentRef = useRef(null);
  const [mobileScale, setMobileScale] = useState(1);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    if (reducedMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);
  const gmailUrl = useMemo(() => {
    const subject = getSubject(lang);
    const body = buildMailBody(lang);
    return buildGmailUrl(EMAIL, subject, body);
  }, [lang]);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const compute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const screen = screenRef.current;
        const content = contentRef.current;
        if (!screen || !content) return;
        const isMobile = window.matchMedia("(max-width: 639px)").matches;
        if (!isMobile) {
          setMobileScale(1);
          setCompact(false);
          return;
        }
        setCompact(false);
        requestAnimationFrame(() => {
          const screen2 = screenRef.current;
          const content2 = contentRef.current;
          if (!screen2 || !content2) return;
          const H = screen2.clientHeight;
          const needed = content2.scrollHeight;
          const safety = 10;
          const ratio = (H - safety) / Math.max(1, needed);
          if (ratio >= 1) {
            setMobileScale(1);
            return;
          }
          if (ratio < 0.92) {
            setCompact(true);
            requestAnimationFrame(() => {
              const screen3 = screenRef.current;
              const content3 = contentRef.current;
              if (!screen3 || !content3) return;
              const H3 = screen3.clientHeight;
              const needed3 = content3.scrollHeight;
              const ratio3 = (H3 - safety) / Math.max(1, needed3);
              const s22 = Math.max(0.88, Math.min(1, ratio3));
              setMobileScale(s22);
            });
            return;
          }
          const s2 = Math.max(0.92, Math.min(1, ratio));
          setMobileScale(s2);
        });
      });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", compute);
    };
  }, [lang]);
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const screen = screenRef.current;
    const content = contentRef.current;
    if (!screen || !content) return;
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (!isMobile) return;
    const H = screen.clientHeight;
    const needed = content.scrollHeight;
    const safety = 10;
    const ratio = (H - safety) / Math.max(1, needed);
    if (ratio >= 1) setMobileScale(1);
    else setMobileScale(Math.max(0.88, Math.min(1, ratio)));
  }, [compact]);
  return /* @__PURE__ */ jsxs(Section, { className: "bg-black py-10 sm:py-12 lg:py-14", children: [
    /* @__PURE__ */ jsx("style", { children: HERO_STYLES }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: rootRef,
        className: cx$6("mx-auto max-w-6xl", appear(visible)),
        style: delay(30),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cx$6(
              "relative overflow-hidden rounded-[28px]",
              "border border-white/10",
              "bg-black"
            ),
            style: { height: "clamp(680px, 145vw, 900px)" },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute inset-0",
                    style: {
                      background: "radial-gradient(120% 90% at 50% 0%, rgba(255,154,61,0.30) 0%, rgba(255,106,26,0.16) 28%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #070707 100%)"
                    }
                  }
                ),
                !bgFailed && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: IMG,
                    alt: "",
                    draggable: false,
                    width: 1536,
                    height: 1024,
                    decoding: "async",
                    loading: "lazy",
                    onError: () => setBgFailed(true),
                    className: "h-full w-full object-cover",
                    style: {
                      objectPosition: "50% 50%",
                      transform: "scale(1.02)",
                      filter: "brightness(1.02) contrast(1.02)"
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: screenRef,
                  className: cx$6(
                    "absolute z-10",
                    "inset-[25%_6%_20%_6%]",
                    // mobile
                    "sm:inset-[28%_18%_26%_18%]"
                    // desktop
                  ),
                  children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-center", children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      ref: contentRef,
                      className: "w-full max-w-[60ch] px-2 sm:px-0",
                      style: {
                        transform: mobileScale < 1 ? `scale(${mobileScale})` : void 0,
                        transformOrigin: "center center"
                      },
                      children: /* @__PURE__ */ jsxs("div", { className: "px-1 sm:px-0", children: [
                        /* @__PURE__ */ jsx("div", { className: "text-[10.5px] sm:text-[13px] tracking-[0.22em] uppercase text-white/70", children: t.eyebrow }),
                        /* @__PURE__ */ jsx("h2", { className: "mt-2.5 whitespace-pre-line text-balance text-[20px] font-[850] leading-[1.06] tracking-[-0.02em] text-white sm:mt-4 sm:text-[40px]", children: t.h }),
                        /* @__PURE__ */ jsx("p", { className: "mt-2.5 text-pretty text-[12.8px] leading-[1.55] text-white/80 sm:mt-4 sm:text-[16px] sm:leading-[1.6]", children: compact ? t.pCompact : t.p }),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: cx$6(
                              "mt-2.5 text-[11.5px] text-white/60 sm:mt-4 sm:text-[12.5px]",
                              compact ? "hidden sm:block" : "block"
                            ),
                            children: t.trust
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3", children: [
                          /* @__PURE__ */ jsx(
                            "a",
                            {
                              href: gmailUrl,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              "aria-label": t.emailAria,
                              className: cx$6(
                                "gmailBtn block w-full",
                                "px-6 py-[13px] sm:py-[16px]",
                                "text-center font-[750] tracking-[-0.01em]",
                                "text-[14.5px] sm:text-[16px]",
                                "text-white/92",
                                "transition active:translate-y-[1px]",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                              ),
                              children: t.emailBtnLabel
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "a",
                            {
                              href: TG_URL$1,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: cx$6(
                                "group relative block w-full",
                                "rounded-2xl px-6 py-[13px] sm:py-[16px]",
                                "text-center font-[750] tracking-[-0.01em]",
                                "text-[14.5px] sm:text-[16px]",
                                "text-black",
                                "shadow-[0_18px_70px_rgba(0,0,0,.55)]",
                                "transition active:translate-y-[1px]",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                              ),
                              style: {
                                background: "linear-gradient(180deg, #FFB020 0%, #FF7A18 45%, #FF5A12 100%)"
                              },
                              children: [
                                /* @__PURE__ */ jsx("span", { className: "relative z-10", children: t.tg }),
                                /* @__PURE__ */ jsx(
                                  "span",
                                  {
                                    className: "pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition duration-300 group-hover:opacity-70",
                                    style: {
                                      background: "radial-gradient(700px 120px at 50% 30%, rgba(255,176,32,0.65), rgba(0,0,0,0))"
                                    }
                                  }
                                )
                              ]
                            }
                          )
                        ] })
                      ] })
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/8" })
            ]
          }
        )
      }
    ) })
  ] });
}
function cx$5(...a) {
  return a.filter(Boolean).join(" ");
}
const LOGO_IMG = "/images/logopad.webp";
function LogoCircle({ src }) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$5(
        "rounded-full overflow-hidden",
        "h-[122px] w-[122px] sm:h-[168px] sm:w-[168px] lg:h-[198px] lg:w-[198px]",
        "shadow-[0_26px_90px_rgba(0,0,0,0.62)]"
      ),
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          draggable: false,
          loading: "lazy",
          decoding: "async",
          className: "w-full h-full object-cover"
        }
      )
    }
  ) });
}
function Bullet({ children }) {
  return /* @__PURE__ */ jsxs("li", { className: "group flex gap-3", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "mt-[9px] h-[7px] w-[7px] rounded-full shrink-0",
        style: { background: "#F97316" },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "text-white/78 group-hover:text-white/88 transition-colors", children })
  ] });
}
function Chip({ children }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cx$5(
        "inline-flex items-center",
        "rounded-full bg-white/[0.06]",
        "px-3 py-1.5",
        "text-[11.5px] sm:text-[12px] leading-none text-white/80"
      ),
      children
    }
  );
}
function Benefits() {
  const { dict, lang } = useLang();
  const isRu = lang === "ru";
  const bd = dict?.benefits;
  const heroLine1 = bd?.heroLine1 ?? (isRu ? "Запустим ваш веб-сервис" : "Launch your web service");
  const heroLine2 = bd?.heroLine2 ?? (isRu ? "от идеи до" : "from idea to");
  const heroLine3 = bd?.heroLine3 ?? (isRu ? "первых клиентов" : "first customers");
  const problemTitle = bd?.problemTitle ?? (isRu ? "Где чаще всего теряются время и бюджет" : "Where time and budget usually slip away");
  const solutionTitle = bd?.solutionTitle ?? (isRu ? "КАК МЫ РАБОТАЕМ" : "HOW WE WORK");
  const problemBullets = bd?.problemBullets ?? (isRu ? [
    "Нет чёткого плана: что делаем, в каком порядке и зачем",
    "Дизайн сделан отдельно от разработки — потом всё приходится переделывать",
    "Не продуманы личный кабинет, админка, оплата и другие важные сценарии",
    "Проект долго дорабатывается, вместо того чтобы быстрее выйти на рынок"
  ] : [
    "No clear plan: what we build, in what order, and why",
    "Design is done apart from development — then everything has to be reworked",
    "User area, admin, payments, and other key flows aren’t thought through",
    "The project keeps getting polished instead of reaching the market faster"
  ]);
  const solutionBullets = bd?.solutionBullets ?? (isRu ? [
    "Сначала разбираемся в задаче: что нужно пользователям и как должен работать продукт",
    "Затем составляем структуру: какие страницы, личные кабинеты, формы и функции нужны",
    "После этого делаем дизайн и сразу учитываем, как он будет реализован в разработке",
    "Подключаем нужные сервисы: заявки, оплату, аналитику и другое",
    "На выходе вы получаете не просто макеты, а готовый продукт, который можно запускать"
  ] : [
    "We start by clarifying the task: what users need and how the product should work",
    "Then we map the structure: pages, user areas, forms, and required features",
    "After that we design with implementation in mind from day one",
    "We connect the required services: leads, payments, analytics, and more",
    "You get more than mockups - you get a launch-ready product"
  ]);
  const supportLine = bd?.supportLine ?? (isRu ? "Отвечаем в течение 24 часов. Можно начать с короткого обсуждения идеи — поможем понять объём, сроки и первые шаги." : "We reply within 24 hours. Start with a short idea discussion - we will help define scope, timeline, and first steps.");
  const eyebrow = isRu ? "дизайн • разработка • запуск" : "design • build • launch";
  const trustChips = useMemo(
    () => isRu ? ["Один подрядчик", "Понятный процесс", "Дизайн + разработка", "Готово к запуску"] : ["Single team", "Clear process", "Design + development", "Launch-ready"],
    [isRu]
  );
  const PrimaryTitle = "h2";
  return /* @__PURE__ */ jsx(
    Section,
    {
      id: "benefits",
      className: cx$5(
        "relative overflow-hidden bg-black",
        "py-16 sm:py-20 lg:py-24"
      ),
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/45", children: eyebrow }),
          /* @__PURE__ */ jsxs(PrimaryTitle, { className: "mt-4 leading-[0.96] tracking-[-0.02em] text-[34px] sm:text-[52px] lg:text-[66px]", children: [
            /* @__PURE__ */ jsx("span", { className: "block font-[820] text-white/95", children: heroLine1 }),
            /* @__PURE__ */ jsx("span", { className: "block font-[820] text-white/82", children: heroLine2 }),
            /* @__PURE__ */ jsx("span", { className: "block font-[820] text-white/58", children: heroLine3 })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-[58ch] text-[15px] sm:text-[16.5px] leading-[1.75] text-white/72", children: isRu ? "Продумываем структуру, дизайн и разработку вместе — чтобы быстрее получить готовый продукт, который удобно использовать и легко развивать." : "We plan structure, design, and development together — so you get a finished product faster: easy to use and easy to grow." }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: trustChips.map((t) => /* @__PURE__ */ jsx(Chip, { children: t }, t)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 sm:mt-10", children: /* @__PURE__ */ jsx(LogoCircle, { src: LOGO_IMG }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 sm:mt-14 grid gap-8 lg:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "benefitsTextPlate rounded-3xl border-0 ring-0 p-6 sm:p-7 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[18px] sm:text-[22px] leading-tight font-[780] text-white/95", children: problemTitle }),
            /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-4 text-[14.5px] sm:text-[15px] leading-[1.75]", children: problemBullets.map((t, i) => /* @__PURE__ */ jsx(Bullet, { children: t }, `problem-${i}`)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "benefitsTextPlate rounded-3xl border-0 ring-0 p-6 sm:p-7 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[18px] sm:text-[22px] leading-tight font-[780] text-white/95", children: solutionTitle }),
            /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-4 text-[14.5px] sm:text-[15px] leading-[1.75]", children: solutionBullets.map((t, i) => /* @__PURE__ */ jsx(Bullet, { children: t }, `solution-${i}`)) }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 text-[13px] sm:text-[13.5px] leading-[1.65] text-white/58", children: supportLine })
          ] })
        ] })
      ] })
    }
  );
}
const LOGO_ICON = "/images/tivonix-logo-icon.png";
const BG_IMG = "/images/sunset.webp";
const PAGE_SIZE = 6;
const ORANGE$1 = "#FF9A3D";
const PRIMARY_CATS = ["start", "price", "time", "process", "design", "dev"];
const SECONDARY_CATS = ["content", "seo", "tech", "support", "fix"];
const s$3 = (v) => v;
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
    ru: "Как мы заходим в проект и что нужно от вас на старте.",
    en: "How we get into the project and what we need from you at the start."
  },
  price: {
    ru: "Ориентиры по бюджету и что реально входит в стоимость.",
    en: "Budget guidelines and what is actually included in the price."
  },
  time: {
    ru: "Типичные сроки и когда можно ускориться до 1–2 дней.",
    en: "Typical timelines and when we can speed up to 1–2 days."
  },
  process: {
    ru: "Пошаговый процесс от брифа до запуска без хаоса.",
    en: "Step-by-step process from brief to launch without chaos."
  },
  design: {
    ru: "Как собираем премиум-визуал и попадаем в ваш бренд.",
    en: "How we build premium visuals that match your brand."
  },
  dev: {
    ru: "На чём всё собрано и какие интеграции возможны.",
    en: "What we build on and which integrations are possible."
  },
  content: {
    ru: "Как помогаем с текстами, оффером и структурой блоков.",
    en: "How we help with copy, offer, and block structure."
  },
  seo: {
    ru: "Что делаем по SEO уже на уровне лендинга.",
    en: "What we do for SEO already on the landing level."
  },
  tech: {
    ru: "Про скорость загрузки, адаптив и тех.часть проекта.",
    en: "About load speed, responsiveness, and the tech side."
  },
  support: {
    ru: "Как сопровождаем проект после запуска и что входит.",
    en: "How we support the project after launch and what is included."
  },
  fix: {
    ru: "Как работаем с правками, отступами и мелкими доработками.",
    en: "How we handle edits, spacing, and small improvements."
  }
};
const FAQ_ITEMS = [
  // Старт
  {
    id: "start-brief",
    cat: "start",
    q: { ru: "С чего начинается работа?", en: "Where does the work start?" },
    a: {
      ru: "С короткого брифа: чем занимаетесь, кому продаёте, какие услуги/продукты, примеры сайтов которые нравятся, и цель (заявки/продажи/презентация). Затем фиксируем структуру страницы и план работ.",
      en: "With a short brief: what you do, who your customers are, what services or products you sell, examples of sites you like, and the main goal (leads, sales, presentation). Then we lock the page structure and the work plan."
    }
  },
  {
    id: "start-need",
    cat: "start",
    q: { ru: "Что нужно от нас, чтобы начать?", en: "What do you need from us to get started?" },
    a: {
      ru: "Логотип (если есть), контакты/соцсети, черновые тексты (можно без идеала), фото/кейсы (если есть). Если чего-то нет — подскажем, чем заменить и как быстро собрать.",
      en: "Logo (if you have one), contacts/social links, rough texts (they do not have to be perfect), photos/case studies (if available). If something is missing, we suggest how to replace it and how to collect it quickly."
    }
  },
  {
    id: "start-domain",
    cat: "start",
    q: { ru: "Вы помогаете с доменом и хостингом?", en: "Do you help with domain and hosting?" },
    a: {
      ru: "Да. Поможем купить домен, настроить DNS и развернуть сайт на хостинге/сервере (или Vercel/Netlify).",
      en: "Yes. We help you buy a domain, configure DNS and deploy the site to hosting/server (or Vercel / Netlify)."
    }
  },
  // Стоимость
  {
    id: "price-from",
    cat: "price",
    q: { ru: "Сколько стоит сайт-визитка / лендинг?", en: "How much does a promo site / landing page cost?" },
    a: {
      ru: "Цена зависит от количества блоков, сложности анимаций и интеграций. Обычно есть 3 уровня: мини (до 6 блоков), стандарт (8–12 блоков), премиум (сложные блоки/анимации/интеграции).",
      en: "The price depends on the number of sections, animation complexity, and integrations. Usually there are 3 tiers: mini (up to 6 sections), standard (8–12 sections), and premium (complex sections/animations/integrations)."
    }
  },
  {
    id: "price-included",
    cat: "price",
    q: { ru: "Что входит в стоимость?", en: "What is included in the price?" },
    a: {
      ru: "Премиум-дизайн, адаптив, сборка на React+Tailwind, оптимизация изображений, базовое SEO, подключение форм/уведомлений (по запросу), деплой и мини-инструкция как менять контент.",
      en: "Premium design, responsive layout, React + Tailwind build, image optimization, basic SEO, forms/notifications integration (on request), deployment, and a short guide on how to edit the content."
    }
  },
  {
    id: "price-payments",
    cat: "price",
    q: { ru: "Как происходит оплата?", en: "How does payment work?" },
    a: {
      ru: "Обычно по этапам: 50% старт — 50% по готовности (или 3 этапа: дизайн/сборка/деплой).",
      en: "Usually in stages: 50% upfront and 50% on completion (or 3 stages: design / build / deploy)."
    }
  },
  // Сроки
  {
    id: "time-howlong",
    cat: "time",
    q: { ru: "Сколько по времени делается сайт?", en: "How long does it take to build the site?" },
    a: {
      ru: "Чаще всего 3–10 дней. Зависит от готовности контента и скорости согласований.",
      en: "Most often 3–10 days. It depends on how ready the content is and how fast approvals go."
    }
  },
  {
    id: "time-urgent",
    cat: "time",
    q: { ru: "Можно срочно за 1–2 дня?", en: "Is it possible to do it urgently in 1–2 days?" },
    a: {
      ru: "Можно, если структура простая и контент готов. Тогда делаем 1–2 итерации правок и быстро выкатываем на домен.",
      en: "Yes, if the structure is simple and the content is ready. Then we do 1–2 rounds of edits and quickly launch it on the domain."
    }
  },
  // Процесс
  {
    id: "process-steps",
    cat: "process",
    q: { ru: "Какие этапы работы?", en: "What are the main steps of the process?" },
    a: {
      ru: "1) Бриф и структура 2) Дизайн ключевых блоков 3) Сборка и адаптив 4) Правки 5) Оптимизация 6) Деплой 7) Передача + инструкция.",
      en: "1) Brief and structure 2) Design of key sections 3) Build and responsive layout 4) Edits 5) Optimization 6) Deploy 7) Handover and a short guide."
    }
  },
  {
    id: "process-revisions",
    cat: "process",
    q: { ru: "Сколько правок включено?", en: "How many revisions are included?" },
    a: {
      ru: "Обычно 2 круга по дизайну и 2 круга по текстам/мелочам. Если нужно больше — согласуем объём.",
      en: "Usually 2 rounds for design and 2 rounds for texts/small details. If you need more, we discuss the extra scope."
    }
  },
  // Дизайн
  {
    id: "design-saas",
    cat: "design",
    q: { ru: "Сделаете как у топ-SaaS?", en: "Can you make it look like a top-tier SaaS?" },
    a: {
      ru: "Да. Делаем премиум-стиль: стекло, мягкие свечения, градиенты, аккуратная типографика, точки/шум, правильная сетка.",
      en: "Yes. We build a premium style: glassmorphism, soft glows, gradients, tidy typography, noise/dots, and a proper layout grid."
    }
  },
  {
    id: "design-brand",
    cat: "design",
    q: { ru: "Можно в фирменных цветах?", en: "Can you use our brand colors?" },
    a: {
      ru: "Да. Подстроим палитру/градиенты под бренд, чтобы всё было едино и «дорого».",
      en: "Yes. We adapt the palette and gradients to your brand so everything feels consistent and premium."
    }
  },
  // Разработка
  {
    id: "dev-tech",
    cat: "dev",
    q: { ru: "На чём сделан сайт? Это WordPress?", en: "What is the tech stack? Is it WordPress?" },
    a: {
      ru: "Нет. Сайт на React + TypeScript + Tailwind: быстрее, гибче, чище и легче масштабируется.",
      en: "No. It is built with React + TypeScript + Tailwind: faster, more flexible, cleaner, and easier to scale."
    }
  },
  {
    id: "dev-integrations",
    cat: "dev",
    q: { ru: "Можно подключить формы, Telegram, CRM?", en: "Can you connect forms, Telegram, or CRM?" },
    a: {
      ru: "Да. Подключим форму (email/Telegram), Google Sheets, CRM (amo/Bitrix) и события аналитики.",
      en: "Yes. We can connect a form (email/Telegram), Google Sheets, CRM (amo/Bitrix), and analytics events."
    }
  },
  // Контент
  {
    id: "content-text",
    cat: "content",
    q: { ru: "Помогаете с текстами, если у нас их нет?", en: "Do you help with copy if we do not have it yet?" },
    a: {
      ru: "Да. Поможем оформить оффер, преимущества, блоки, CTA и FAQ — даже из черновиков.",
      en: "Yes. We help shape the offer, benefits, sections, CTAs, and FAQ — even from rough drafts."
    }
  },
  // SEO
  {
    id: "seo-basic",
    cat: "seo",
    q: { ru: "Будет ли сайт находиться в Google?", en: "Will the site be discoverable in Google?" },
    a: {
      ru: "Сделаем базовую SEO-основу: заголовки, мета, alt, скорость. Для полноценного продвижения нужен отдельный план и контент-стратегия.",
      en: "We set up basic SEO: titles, meta tags, alts, and performance. For full-scale promotion you will need a separate SEO and content strategy."
    }
  },
  // Тех.часть
  {
    id: "tech-speed",
    cat: "tech",
    q: { ru: "Сайт будет быстро грузиться?", en: "Will the site load fast?" },
    a: {
      ru: "Да. Оптимизация изображений, кеширование, аккуратные шрифты и лёгкая сборка дают быструю загрузку.",
      en: "Yes. Image optimization, caching, lean fonts and a light build make the site load quickly."
    }
  },
  {
    id: "tech-mobile",
    cat: "tech",
    q: { ru: "Будет адаптив под телефон?", en: "Will it be responsive on mobile?" },
    a: {
      ru: "Да. Адаптив — стандарт: телефон, планшет, ноутбук, большой экран.",
      en: "Yes. Responsive layout is standard: phone, tablet, laptop, and large screens."
    }
  },
  // Поддержка
  {
    id: "support-after",
    cat: "support",
    q: { ru: "Вы помогаете после запуска?", en: "Do you help after the launch?" },
    a: {
      ru: "Да. Можем сопровождать: правки, новые блоки/страницы, интеграции, улучшения конверсии.",
      en: "Yes. We can support you after launch: edits, new blocks/pages, integrations, and conversion improvements."
    }
  },
  // Правки
  {
    id: "fix-after",
    cat: "fix",
    q: { ru: "Если после запуска найдём косяк/отступ?", en: "What if we find a bug or spacing issue after launch?" },
    a: {
      ru: "Исправим. Доводим визуал до аккуратного состояния.",
      en: "We fix it. We bring the visuals to a clean and tidy state."
    }
  }
];
function cx$4(...a) {
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
  const [bgInView, setBgInView] = useState(false);
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
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setBgInView(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "300px 0px 300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const resetDisabled = query.trim() === "" && catFilter === "all" && page === 1;
  async function copy(text, id) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((v) => v === id ? null : v), 900);
    } catch {
    }
  }
  const title = isRu ? "FAQ — всё про сайт и работу" : "FAQ — about the site and workflow";
  const subtitle = isRu ? "Стоимость, сроки, процесс, контент, SEO и техчасть — коротко и по делу." : "Pricing, timelines, process, content, SEO, and tech — short and to the point.";
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
  return /* @__PURE__ */ jsxs(Section, { id: "faq", className: "relative overflow-hidden pt-16 sm:pt-20 pb-16 sm:pb-20 bg-black", children: [
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
    /* @__PURE__ */ jsxs("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0", children: [
      bgInView ? /* @__PURE__ */ jsx(
        "img",
        {
          src: BG_IMG,
          alt: "",
          loading: "lazy",
          decoding: "async",
          fetchPriority: "low",
          className: "absolute inset-0 h-full w-full object-cover object-top opacity-95",
          draggable: false
        }
      ) : null,
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0",
          style: s$3({
            background: bgInView ? "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.92) 100%)" : "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.94) 100%)"
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { ref: rootRef, className: "relative mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "mt-5 font-display text-[30px] leading-[34px] sm:text-[40px] sm:leading-[44px] font-extrabold tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm sm:text-[15px] text-white/60", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[720px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_auto] items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "faq-search", children: placeholder }),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx("span", { style: s$3({ color: ORANGE$1 }), children: /* @__PURE__ */ jsx(Icon, { name: "search" }) }) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "faq-search",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder,
                  inputMode: "search",
                  className: cx$4(
                    "w-full h-11 sm:h-12 rounded-[14px]",
                    "bg-white/[0.06] border-0",
                    "pl-10 pr-4 text-sm text-white/90 placeholder:text-white/40",
                    "outline-none",
                    "focus:ring-2 focus:ring-white/12"
                  )
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
                className: cx$4(
                  "h-11 sm:h-12 px-4 rounded-[14px]",
                  "border-0 bg-white/[0.06]",
                  resetDisabled ? "text-white/35 cursor-not-allowed opacity-70" : "text-white/75 hover:text-white/92 hover:bg-white/[0.07] transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                ),
                children: resetLabel
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: cx$4(
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
                    className: cx$4(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                      "border-0",
                      catFilter === "all" ? "bg-white/[0.16] text-white" : "bg-white/[0.07] text-white/75 hover:text-white/92 hover:bg-white/[0.10]",
                      "transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                      className: cx$4(
                        "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                        "border-0",
                        active ? "bg-white/[0.16] text-white" : "bg-white/[0.07] text-white/75 hover:text-white/92 hover:bg-white/[0.10]",
                        "transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                    className: cx$4(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
                      "border-0",
                      "bg-white/[0.07] text-white/80 hover:text-white hover:bg-white/[0.10] transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    ),
                    "aria-expanded": showAllCats,
                    "aria-label": showAllCats ? lessCatsLabel : moreCatsLabel,
                    children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                      showAllCats ? lessCatsLabel : moreCatsLabel,
                      /* @__PURE__ */ jsx("span", { className: cx$4("transition", showAllCats ? "rotate-180" : ""), children: /* @__PURE__ */ jsx(Icon, { name: "chev" }) })
                    ] })
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-[12px] text-white/55", children: filtered.length === 0 ? isRu ? "Ничего не найдено — попробуйте другой запрос." : "No results — try a different query." : isRu ? `Найдено: ${filtered.length}` : `Found: ${filtered.length}` })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-7 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: items.map((f) => {
        const isOpen = openId === f.id;
        const domId = toDomId(f.id);
        const teaser = TEASER_TEXTS[f.cat][l];
        return /* @__PURE__ */ jsx(
          "article",
          {
            className: cx$4(
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
                  className: cx$4(
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
                  className: cx$4(
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
                        className: cx$4(
                          "inline-flex items-center gap-2 rounded-[12px]",
                          "border-0 bg-white/[0.07] px-3 py-2",
                          "text-[12px] text-white/80 hover:bg-white/[0.10] transition",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        ),
                        children: [
                          /* @__PURE__ */ jsx("span", { style: s$3({ color: ORANGE$1 }), children: /* @__PURE__ */ jsx(Icon, { name: "copy" }) }),
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
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 whitespace-nowrap", style: s$3({ color: ORANGE$1 }), children: [
                    /* @__PURE__ */ jsx("span", { className: "inline-block h-1.5 w-1.5 rounded-full bg-current" }),
                    /* @__PURE__ */ jsx("span", { children: popularLabel })
                  ] })
                ] })
              ] })
            ] })
          },
          f.id
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "relative mt-10 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[560px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 sm:hidden", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              disabled: page <= 1,
              className: cx$4(
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
              className: cx$4(
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
              className: cx$4(
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
      ] }) })
    ] })
  ] });
}
const UPC_DOMAIN = "https://upc.watch/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const LOGOVO_DOMAIN = "https://logovo24.by/";
const GIFTSNIPER_DOMAIN = "https://t.me/GiftSniperTonBot";
function buildProjects(isRu) {
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
      cover: "/images/project-priew/labelo.jpg",
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
      cover: "/images/project-priew/upcwatc.png",
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
      cover: "/images/project-priew/payslip.jpg",
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
      cover: "/images/project-priew/headmid.jpg",
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
    // 5) LOGOVO — сеть шиномонтажа (Минск), визуал в духе «космос» под бренд
    {
      id: "logovo",
      title: "LOGOVO",
      subtitleRu: "Сеть шиномонтажа в Минске: услуги, адреса, прайс, кейсы и запись — в премиальной «космической» подаче бренда.",
      subtitleEn: "Minsk tire-service network: services, locations, pricing, cases and booking — premium “cosmic” brand look.",
      detailsRu: "Формат: многостраничный промо-сайт сети\nСрок: 12 дней\n\nЗаказчик\n• LOGOVO — шиномонтаж и сопутствующие услуги, несколько точек в Минске\n• Соцсети: Instagram @Logovo_mnsk\n\nЦель\n• Показать сервис «уровня студии»: скорость, точность, честность — и довести до записи без лишнего шума.\n• Визуально попасть в фирменный стиль: тёмная премиум-подача с «космической» эстетикой (как просили), без дешёвого китча.\n\nЧто сделали\n• Собрали структуру: услуги и акценты → прейскурант → адреса → кейсы → команда → отзывы → FAQ → контакты\n• Проработали типографику, сетку и анимации: глубина, ритм, плавные переходы — ощущение дорогого сервиса\n• Сделали сильный mobile-first: запись и цены читаются с телефона за секунды\n• Усилили доверие: реальные сценарии (кейсы), люди, отзывы, понятные ответы в FAQ\n\nРезультат\n• Сайт работает как витрина сети и подводит к действию: выбрать услугу, понять цену, записаться или связаться\n",
      detailsEn: "Format: multi-page promo site for a service network\nTimeline: 12 days\n\nClient\n• LOGOVO — tire service and related work, multiple locations in Minsk\n• Social: Instagram @Logovo_mnsk\n\nGoals\n• Communicate a premium, studio-like experience: speed, precision, honesty — and drive bookings without noise.\n• Match the brand direction: dark premium look with a “cosmic” aesthetic (as requested), avoiding cheap clichés.\n\nWhat we delivered\n• IA: services → pricing → locations → cases → team → reviews → FAQ → contacts\n• Typography, grid and motion: depth, rhythm, smooth transitions — premium service feel\n• Strong mobile-first: pricing and booking paths readable in seconds on a phone\n• Trust: real-world scenarios (cases), people, reviews, clear FAQ answers\n\nOutcome\n• The site acts as a storefront for the network and pushes action: pick a service, understand pricing, book or contact\n",
      domain: LOGOVO_DOMAIN,
      status: "live",
      tags: [
        "Landing",
        "React",
        "TypeScript",
        "Framer Motion",
        "Automotive"
      ],
      cover: "/images/project-priew/logovvo.jpg",
      outcomes: [
        isRu ? "Сделано за 12 дней" : "Delivered in 12 days",
        isRu ? "Структура под услуги, прайс и запись" : "Structure for services, pricing and booking",
        isRu ? "«Космический» премиум-визуал под бренд" : "“Cosmic” premium visuals aligned with the brand",
        isRu ? "Кейсы, команда и отзывы для доверия" : "Cases, team and reviews for trust"
      ],
      stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      testimonial: {
        name: isRu ? "Команда LOGOVO" : "LOGOVO team",
        role: isRu ? "Сеть шиномонтажа · Минск" : "Tire service network · Minsk",
        text: isRu ? "Нужен был сайт, который ощущается как мы: не «ещё один шиномонтаж», а сервис с характером. Космическая тема ожила без дешёвого блеска — глубина, тёмная палитра, сочная типографика. С телефона всё предельно ясно: цена, что входит, куда приехать. В сезон это прямо деньги — люди не теряются, а доходят до записи." : "We needed a site that feels like us — not “just another tire shop”, but a brand with character. The cosmic theme landed without cheap glitter: depth, a dark palette, strong typography. On mobile everything is obvious — pricing, what’s included, where to go. In peak season that’s revenue: people don’t get lost, they get to booking."
      }
    },
    // 6) GIFTSNIPER — Telegram-бот для оценки NFT и Telegram Gifts в TON
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
      cover: "/images/project-priew/gift.jpg",
      outcomes: [
        isRu ? "Оценка NFT и Gifts по данным рынка в одном окне" : "NFT and Gifts valuation from market data in one flow",
        isRu ? "Быстрый анализ: трейты, листинги, аналоги, ориентир цены" : "Fast analysis: traits, listings, comparables, pricing guidance",
        isRu ? "Без подключения кошелька и доступа к аккаунту" : "No wallet connection or account-access risk"
      ],
      stack: ["Telegram Bot API", "TON", "NFT Data", "Parser", "Analytics"]
    }
  ];
}
function findProjectBySlug(slug, isRu) {
  if (!slug) return void 0;
  return buildProjects(isRu).find((p) => p.id === slug);
}
const HeroWebGLBg$3 = lazy(() => import("./assets/HeroWebGLBg-CnY8eKt4.js"));
function cx$3(...a) {
  return a.filter(Boolean).join(" ");
}
const s$2 = (v) => v;
const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.png";
const WATERMARK_LOGO = "/favicon.svg";
const ACCENT$1 = "#FF6B2C";
const LANDING = {
  top: "/#top",
  services: "/#services",
  faq: "/#faq"
};
const MENU = [
  { to: LANDING.top, label: { ru: "Главная", en: "Home" } },
  { to: "/sozdanie-sajtov", label: { ru: "Создание сайтов", en: "Website development" } },
  { to: LANDING.services, label: { ru: "Услуги", en: "Services" } },
  { to: LANDING.faq, label: { ru: "FAQ", en: "FAQ" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } }
];
const SECTION_LINKS = [
  { to: "/#stack", label: { ru: "Технологии", en: "Tech stack" } },
  { to: "/#benefits", label: { ru: "Преимущества", en: "Benefits" } },
  { to: "/#admin", label: { ru: "Админ-панели", en: "Admin panels" } },
  { to: "/#services", label: { ru: "Тарифы", en: "Pricing" } }
];
const GMAIL_EMAIL_URL$1 = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tivoonix@gmail.com")}&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;
const CONTACTS = {
  telegram: { href: "https://t.me/TIVONIX", label: "Telegram" },
  instagram: { href: "https://www.instagram.com/tivonix.tech/", label: "Instagram" },
  email: { href: GMAIL_EMAIL_URL$1, label: "Email" }
};
const DOCS = {
  ru: [
    {
      href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
      label: "Политика ПД",
      aria: "Политика обработки и защиты персональных данных (PDF)"
    },
    {
      href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
      label: "Согласие ПД",
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
const footerLinkText = "font-sans text-[14px] font-normal leading-[1.6] text-[#A3A3A3] antialiased transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:rounded-sm";
const colTitleClass = "font-sans text-[15px] sm:text-[16px] font-bold tracking-tight text-white antialiased leading-snug";
function imgFallback(fallbackSrc) {
  return (e) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallbackSrc;
  };
}
function FooterLink({ to, children }) {
  return /* @__PURE__ */ jsx(Link, { to, className: cx$3("block w-fit", footerLinkText), children });
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
      className: cx$3("block w-fit max-w-full", footerLinkText),
      children
    }
  );
}
function ColNav({
  id,
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("nav", { "aria-labelledby": id, className: "min-w-0", children: [
    /* @__PURE__ */ jsx("h2", { id, className: colTitleClass, children: title }),
    /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children })
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
      className: cx$3(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        "border border-white/[0.12] bg-white/[0.03] text-white/58",
        "transition-[color,background-color,border-color] duration-200",
        "hover:border-white/22 hover:bg-white/[0.08] hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      ),
      children
    }
  );
}
function FooterSmokeBg({
  mounted,
  webglInView,
  reducedMotion
}) {
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: s$2({
          background: "radial-gradient(120% 90% at 85% 100%, rgba(255,154,61,0.24) 0%, rgba(255,106,26,0.14) 30%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #020202 100%)"
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cx$3(
          "absolute min-h-[760px]",
          "bottom-[-42%] left-[-95%] right-[-90%] top-[-8%]",
          "sm:bottom-[-48%] sm:left-[-50%] sm:right-[-55%] sm:top-[-4%]",
          "lg:bottom-[-48%] lg:left-[-8%] lg:right-[-28%] lg:top-[0%] lg:min-h-[min(100vh,920px)]"
        ),
        style: s$2({
          opacity: 1,
          WebkitMaskImage: "radial-gradient(ellipse 160% 120% at 82% 100%, #000 0%, #000 38%, rgba(0,0,0,0.94) 52%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,0.22) 84%, rgba(0,0,0,0.06) 94%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 160% 120% at 82% 100%, #000 0%, #000 38%, rgba(0,0,0,0.94) 52%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,0.22) 84%, rgba(0,0,0,0.06) 94%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%"
        }),
        children: mounted && webglInView && !reducedMotion ? /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(HeroWebGLBg$3, { interactive: false, quality: "low" }) }) : null
      }
    ) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0",
        style: s$2({
          background: [
            "linear-gradient(90deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.48) 30%, rgba(0,0,0,0.12) 54%, rgba(0,0,0,0.04) 72%, rgba(0,0,0,0.06) 100%)",
            "radial-gradient(120% 120% at 50% 92%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.44) 62%, rgba(0,0,0,0.82) 100%)"
          ].join(",")
        })
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: WATERMARK_LOGO,
        alt: "",
        draggable: false,
        loading: "lazy",
        decoding: "async",
        className: cx$3(
          "absolute z-[1] select-none",
          "-right-[18vw] -bottom-[18vw]",
          "w-[min(760px,76vw)] max-w-none",
          "opacity-[0.12] sm:-right-[12vw] sm:-bottom-[14vw] sm:w-[min(760px,62vw)] sm:opacity-[0.16]"
        )
      }
    )
  ] });
}
function Footer() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [mounted, setMounted] = useState(false);
  const footerRef = useRef(null);
  const [webglInView, setWebglInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const t = (v) => isRu ? v.ru : v.en;
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        setWebglInView(!!entries[0]?.isIntersecting);
      },
      { root: null, rootMargin: "260px 0px 260px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
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
  const rights = isRu ? "Все права защищены." : "All rights reserved.";
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      ref: footerRef,
      className: cx$3(
        "relative isolate overflow-hidden font-sans text-white antialiased",
        "selection:bg-[color:var(--accent)]/25"
      ),
      style: s$2({ ["--accent"]: ACCENT$1, backgroundColor: "#000000" }),
      children: [
        /* @__PURE__ */ jsx(FooterSmokeBg, { mounted, webglInView, reducedMotion }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "relative px-3 sm:px-5", children: /* @__PURE__ */ jsxs("div", { className: "relative pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-10 xl:gap-14", children: [
            /* @__PURE__ */ jsx("aside", { className: "shrink-0 lg:w-[min(280px,32%)] lg:max-w-[300px]", children: /* @__PURE__ */ jsx(
              Link,
              {
                to: LANDING.top,
                className: cx$3(
                  "inline-block rounded-lg",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                ),
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
            /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 md:grid-cols-3 md:gap-y-11 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6", children: [
              /* @__PURE__ */ jsx(ColNav, { id: "footer-site", title: isRu ? "Сайт" : "Site", children: MENU.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: i.to, children: t(i.label) }) }, i.to)) }),
              /* @__PURE__ */ jsx(ColNav, { id: "footer-sections", title: isRu ? "Секции" : "Sections", children: SECTION_LINKS.map((i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: i.to, children: t(i.label) }) }, i.to)) }),
              /* @__PURE__ */ jsxs(ColNav, { id: "footer-work", title: isRu ? "Кейсы" : "Work", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: "/projects", children: isRu ? "Все проекты" : "All projects" }) }),
                projects.map((p) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FooterLink, { to: `/projects/${p.id}`, children: p.title }) }, p.id))
              ] }),
              /* @__PURE__ */ jsxs(ColNav, { id: "footer-contact", title: isRu ? "Связь" : "Connect", children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ExternalLink, { href: CONTACTS.telegram.href, children: CONTACTS.telegram.label }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ExternalLink, { href: CONTACTS.instagram.href, children: CONTACTS.instagram.label }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ExternalLink, { href: CONTACTS.email.href, children: CONTACTS.email.label }) })
              ] }),
              /* @__PURE__ */ jsx(ColNav, { id: "footer-legal", title: isRu ? "Документы" : "Legal", children: docs.map((d) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ExternalLink, { href: d.href, newTab: true, "aria-label": d.aria, children: d.label }) }, d.href)) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cx$3(
                "mt-14 border-t border-white/[0.09] pt-8 sm:mt-16 sm:pt-9",
                "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              ),
              children: [
                /* @__PURE__ */ jsxs("p", { className: "text-[13px] leading-relaxed text-[#737373] sm:text-[14px]", children: [
                  "© ",
                  (/* @__PURE__ */ new Date()).getFullYear(),
                  " TIVONIX. ",
                  rights
                ] }),
                /* @__PURE__ */ jsxs(
                  "nav",
                  {
                    className: "flex flex-wrap items-center gap-1.5 sm:justify-end",
                    "aria-label": isRu ? "Соцсети и почта" : "Social and email",
                    children: [
                      /* @__PURE__ */ jsx(SocialIconLink, { href: CONTACTS.telegram.href, label: CONTACTS.telegram.label, children: /* @__PURE__ */ jsx(IconTelegram, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsx(SocialIconLink, { href: CONTACTS.instagram.href, label: CONTACTS.instagram.label, children: /* @__PURE__ */ jsx(IconInstagram$1, { className: "h-4 w-4" }) }),
                      /* @__PURE__ */ jsx(SocialIconLink, { href: CONTACTS.email.href, label: CONTACTS.email.label, children: /* @__PURE__ */ jsx(IconMail$1, { className: "h-4 w-4" }) })
                    ]
                  }
                )
              ]
            }
          )
        ] }) }) }) })
      ]
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
const CANONICAL_ORIGIN = "https://www.tivonix.tech";
const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/og.jpg`;
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
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: "TIVONIX" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: ogImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: "TIVONIX" }),
    schemaJsonLd != null && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(schemaJsonLd) })
  ] });
}
function cx$2(...a) {
  return a.filter(Boolean).join(" ");
}
const ACCENT = "#FF6B2C";
const VIDEOS = ["/video/1.mp4", "/video/2.mp4", "/video/3.mp4", "/video/4.mp4"];
const VIDEO_OFFSET_PX = 14;
const TG_USERNAME = "TIVONIX";
const TG_URL = `https://t.me/${TG_USERNAME}`;
const TG_TEXT_RU = "Привет! Хочу рассчитать стоимость. Пакет: ";
const TG_TEXT_EN = "Hi! I want a quote. Package: ";
function CheckIcon() {
  return /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M20 6 9 17l-5-5",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function useVideoBlock(ref, src) {
  const [canLoad, setCanLoad] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const apply = () => setReduceMotion(!!mql.matches);
    apply();
    if ("addEventListener" in mql) {
      mql.addEventListener("change", apply);
      return () => mql.removeEventListener("change", apply);
    }
    mql.addListener(apply);
    return () => mql.removeListener(apply);
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setCanLoad(true);
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        const visible = !!e?.isIntersecting;
        setInView(visible);
        if (visible) {
          setCanLoad(true);
        }
      },
      { root: null, rootMargin: "220px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  const safeReset = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {
    }
  }, [ref]);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = "none";
    const onLoadedData = () => safeReset();
    v.addEventListener("loadeddata", onLoadedData);
    safeReset();
    return () => v.removeEventListener("loadeddata", onLoadedData);
  }, [ref, safeReset]);
  useEffect(() => {
    const v = ref.current;
    if (!v || !src || !canLoad) return;
    if (v.getAttribute("data-src-attached") === "1") return;
    v.setAttribute("data-src-attached", "1");
    try {
      v.src = src;
      v.preload = "metadata";
      v.load?.();
    } catch {
    }
  }, [ref, src, canLoad]);
  const play = useCallback(async () => {
    const v = ref.current;
    if (!v || reduceMotion) return;
    try {
      if (v.preload !== "auto") v.preload = "auto";
      await v.play();
    } catch {
    }
  }, [ref, reduceMotion]);
  const stop = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    try {
      v.pause();
    } catch {
    }
  }, [ref]);
  useEffect(() => {
    if (!canLoad) return;
    if (inView) {
      void play();
      return;
    }
    stop();
  }, [inView, canLoad, play, stop]);
  return { play, stop, inView };
}
function openTelegram(planName, isRu) {
  const text = isRu ? `${TG_TEXT_RU}${planName}` : `${TG_TEXT_EN}${planName}`;
  const url = `${TG_URL}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
function PlanCard({ p, isRu }) {
  const ref = useRef(null);
  const { play, stop, inView } = useVideoBlock(ref, p.videoSrc);
  const [videoFailed, setVideoFailed] = useState(false);
  const label = isRu ? p.labelRu : p.labelEn;
  const title = isRu ? p.titleRu : p.titleEn;
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const cta = isRu ? p.ctaRu : p.ctaEn;
  const note = isRu ? p.noteRu : p.noteEn;
  const desc = isRu ? p.descRu : p.descEn;
  const bullets = isRu ? p.bulletsRu : p.bulletsEn;
  const badge = isRu ? p.badgeRu : p.badgeEn;
  const chip = p.chip ? isRu ? p.chip.ru : p.chip.en : null;
  const planName = isRu ? p.labelRu : p.labelEn;
  return /* @__PURE__ */ jsxs(
    "article",
    {
      onMouseEnter: play,
      onMouseLeave: stop,
      onFocus: play,
      onBlur: stop,
      onPointerEnter: play,
      onPointerLeave: stop,
      className: cx$2(
        "group relative overflow-hidden rounded-[22px]",
        "bg-black",
        "shadow-[0_30px_120px_rgba(0,0,0,0.65)]",
        "transition-transform duration-200",
        "hover:-translate-y-0.5",
        p.featured ? "md:-translate-y-1" : ""
      ),
      style: {
        ["--accent"]: ACCENT,
        isolation: "isolate",
        transform: "translateZ(0)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 rounded-[22px]",
            style: {
              zIndex: 999,
              boxShadow: p.featured ? "inset 0 0 0 1px color-mix(in srgb, var(--accent) 28%, rgba(255,255,255,0.10))" : "inset 0 0 0 1px rgba(255,255,255,0.10)"
            }
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative overflow-hidden bg-black",
            style: {
              height: 160,
              clipPath: "inset(0 round 22px 22px 0 0)",
              transform: "translateZ(0)"
            },
            children: [
              !videoFailed ? /* @__PURE__ */ jsx(
                "video",
                {
                  ref,
                  poster: p.poster,
                  muted: true,
                  playsInline: true,
                  loop: true,
                  preload: "none",
                  controls: false,
                  onError: () => setVideoFailed(true),
                  disablePictureInPicture: true,
                  className: cx$2(
                    "absolute left-0 top-0 h-full w-full object-cover",
                    "opacity-[0.72] transition-opacity duration-200",
                    inView ? "opacity-[0.86]" : "opacity-[0.72]",
                    "group-hover:opacity-[0.90]"
                  ),
                  style: {
                    zIndex: 1,
                    filter: "contrast(1.08) saturate(1.05)",
                    // ✅ смещение фокуса вниз без чёрных полос
                    objectPosition: `center calc(50% + ${VIDEO_OFFSET_PX}px)`,
                    backfaceVisibility: "hidden",
                    willChange: "opacity"
                  }
                }
              ) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0",
                  style: {
                    zIndex: 1,
                    background: "radial-gradient(100% 120% at 70% 20%, rgba(255,154,61,0.35), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.55))"
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 pointer-events-none",
                  style: {
                    zIndex: 2,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.92) 100%)"
                  }
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute left-5 top-5 z-[10] flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cx$2(
                      "inline-flex items-center rounded-full px-3 py-1",
                      "text-[11px] font-[900] tracking-[0.14em] uppercase",
                      "border border-white/10 bg-black/70 text-white/80",
                      "backdrop-blur"
                    ),
                    children: label
                  }
                ),
                chip ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: cx$2(
                      "inline-flex items-center rounded-full px-2.5 py-1",
                      "text-[10px] font-[900] tracking-[0.14em] uppercase",
                      "border border-white/10 bg-white/[0.05] text-white/70"
                    ),
                    children: chip
                  }
                ) : null
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "px-6 pt-5 relative z-[5]", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cx$2(
                "text-[34px] leading-[0.95] font-[950] tracking-[-0.035em] text-white",
                "whitespace-nowrap text-left"
              ),
              style: { letterSpacing: "-0.03em" },
              children: title
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-3 text-[12.5px] text-white/55", children: subtitle }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => openTelegram(planName, isRu),
                className: cx$2(
                  "inline-flex h-11 w-full items-center justify-center rounded-full px-6",
                  "text-[12px] font-[950] tracking-[0.18em] uppercase",
                  "text-black bg-[color:var(--accent)]",
                  "shadow-[0_18px_55px_rgba(255,107,44,0.18)]",
                  "transition hover:brightness-105",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40"
                ),
                children: cta
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "mt-2 text-center text-[12px] text-white/45", children: note })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 -mx-6 relative z-[5]", children: /* @__PURE__ */ jsxs("div", { className: "rounded-t-[18px] border-t border-x border-white/10 bg-white/[0.04] px-6 py-5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[13px] leading-relaxed text-white/80", children: desc }),
            /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2.5 text-[13px] text-white/62", children: bullets.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-[2px] text-white/45", children: /* @__PURE__ */ jsx(CheckIcon, {}) }),
              /* @__PURE__ */ jsx("span", { children: b })
            ] }, b)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: cx$2(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1",
                    "border border-white/10 bg-black/35",
                    "text-[11px] font-[950] tracking-[0.14em] uppercase text-white/70"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "h-2 w-2 rounded-full",
                        style: { backgroundColor: "color-mix(in srgb, var(--accent) 70%, transparent)" }
                      }
                    ),
                    badge
                  ]
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-white/40", children: isRu ? "Поддержка и консультация" : "Support & consultation" })
            ] })
          ] }) })
        ] }),
        p.featured ? /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 rounded-[22px]",
            style: {
              zIndex: 998,
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 28%, transparent)"
            }
          }
        ) : null
      ]
    }
  );
}
function ServicesPlans({ className }) {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const plans = useMemo(
    () => [
      {
        key: "launch",
        labelRu: "Лендинги + боты",
        labelEn: "Landing + Bots",
        titleRu: "БЫСТРЫЙ ЗАПУСК",
        titleEn: "LAUNCH",
        subtitleRu: "Лендинг + заявки + Telegram",
        subtitleEn: "Fast start: landing + Telegram bot",
        ctaRu: "Рассчитать стоимость",
        ctaEn: "Get a quote",
        noteRu: "Ответим в течение дня",
        noteEn: "Reply within 24h",
        descRu: "Сделаем страницу для рекламы и подключим приём заявок, чтобы вы быстро начали получать обращения от клиентов.",
        descEn: "Launch package: conversion landing + bot for leads and support.",
        bulletsRu: [
          "Страница под рекламу и продажи",
          "Форма заявки и кнопки связи",
          "Уведомления о заявках в Telegram",
          "Адаптация под телефон и базовая аналитика"
        ],
        bulletsEn: [
          "Conversion landing for ads",
          "Bot flows, menus, commands",
          "Integrations: CRM / Google / Notion",
          "Responsive, SEO basics, fast load"
        ],
        badgeRu: "Подходит для быстрого старта",
        badgeEn: "INCLUDED",
        chip: { ru: "ПАКЕТ", en: "BUNDLE" },
        videoSrc: VIDEOS[0]
      },
      {
        key: "product",
        labelRu: "Продукт",
        labelEn: "Product",
        titleRu: "ОНЛАЙН-СЕРВИС",
        titleEn: "PRODUCT",
        subtitleRu: "Личный кабинет, админка, оплата",
        subtitleEn: "MVP / dashboard / admin panel",
        ctaRu: "Рассчитать стоимость",
        ctaEn: "Get a quote",
        noteRu: "Предварительная оценка за 24 часа",
        noteEn: "Estimate in 24h",
        descRu: "Разработаем полноценный веб-сервис: пользователи смогут регистрироваться, пользоваться продуктом, оплачивать и получать нужный результат.",
        descEn: "Bigger builds: MVPs, dashboards, admin panels, roles, databases and integrations.",
        bulletsRu: [
          "Личный кабинет для клиентов",
          "Админ-панель для управления",
          "Роли пользователей и доступы",
          "Оплата, уведомления и интеграции"
        ],
        bulletsEn: ["Architecture, FE/BE, deploy", "Auth, roles, payments", "Admin, tables, filters", "Post-launch support"],
        badgeRu: "Рекомендуем для продукта",
        badgeEn: "RECOMMENDED",
        chip: { ru: "ЛУЧШИЙ ВЫБОР", en: "BEST VALUE" },
        videoSrc: VIDEOS[1],
        featured: true
      },
      {
        key: "automation",
        labelRu: "Автоматизация",
        labelEn: "Automation",
        titleRu: "АВТОМАТИЗАЦИЯ",
        titleEn: "AUTOMATION",
        subtitleRu: "Меньше ручной работы",
        subtitleEn: "Integrations / scripts / routine",
        ctaRu: "Рассчитать стоимость",
        ctaEn: "Get a quote",
        noteRu: "Поможем упростить процессы",
        noteEn: "No fluff",
        descRu: "Настроим процессы, которые сейчас отнимают время: заявки, таблицы, отчёты, уведомления и работу с клиентами.",
        descEn: "Automate routine: leads, sheets, reports, messaging and integrations.",
        bulletsRu: [
          "Автоматизация заявок и задач",
          "Связка таблиц и сервисов",
          "Уведомления в Telegram или email",
          "Отчёты, статусы и контроль процессов"
        ],
        bulletsEn: ["Make / Zapier / API integrations", "Google Sheets / Notion / CRM", "Telegram notifications", "Logs and stability"],
        badgeRu: "Подходит для бизнеса и команды",
        badgeEn: "INCLUDED",
        videoSrc: VIDEOS[3]
      }
    ],
    []
  );
  return /* @__PURE__ */ jsx("section", { className: cx$2("relative", className), style: { ["--accent"]: ACCENT }, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 lg:grid-cols-3 lg:items-start", children: plans.map((p) => /* @__PURE__ */ jsx(PlanCard, { p, isRu }, p.key)) }) }) });
}
function buildHomePageSchema({ pageTitle, pageDescription }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.tivonix.tech/#org",
        name: "TIVONIX",
        url: "https://www.tivonix.tech/",
        logo: {
          "@type": "ImageObject",
          url: "https://www.tivonix.tech/images/tivonix-logo-icon.png"
        },
        image: "https://www.tivonix.tech/og.jpg",
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
        "@id": "https://www.tivonix.tech/#website",
        url: "https://www.tivonix.tech/",
        name: "TIVONIX",
        publisher: { "@id": "https://www.tivonix.tech/#org" },
        inLanguage: ["ru", "en"]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.tivonix.tech/#home",
        url: "https://www.tivonix.tech/",
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": "https://www.tivonix.tech/#website" },
        about: { "@id": "https://www.tivonix.tech/#org" },
        inLanguage: ["ru", "en"]
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
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[var(--bg)]", children: [
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
      /* @__PURE__ */ jsx("div", { id: "stack", children: /* @__PURE__ */ jsx(WhyUs, {}) }),
      /* @__PURE__ */ jsx("div", { id: "benefits", children: /* @__PURE__ */ jsx(Benefits, {}) }),
      /* @__PURE__ */ jsx("div", { id: "admin", children: /* @__PURE__ */ jsx(AppsOrbitBlock, {}) }),
      /* @__PURE__ */ jsx("div", { id: "services", children: /* @__PURE__ */ jsx(ServicesPlans, { className: "py-14 sm:py-16" }) }),
      /* @__PURE__ */ jsx(FAQSection, {}),
      /* @__PURE__ */ jsx("div", { id: "contact" })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HERO_IMG = "/images/hero.png";
function cx$1(...a) {
  return a.filter(Boolean).join(" ");
}
const s$1 = (v) => v;
function projectPreviewSrc(p) {
  return p.cover ?? HERO_IMG;
}
function ProjectPreviewFrame({ src }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$1(
        "relative w-full overflow-hidden rounded-2xl",
        "border-0 bg-[#0c0c0f]"
      ),
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: "",
          className: "block h-auto w-full align-middle",
          draggable: false,
          loading: "lazy",
          decoding: "async"
        }
      )
    }
  );
}
function DomainPill({
  href,
  status = "live",
  isRu,
  className
}) {
  const openLabel = isRu ? "Открыть" : "Open";
  const wipLabel = isRu ? "В разработке" : "In progress";
  if (!href || status === "wip") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cx$1(
          "inline-flex min-h-[44px] w-full items-center justify-center gap-2",
          "rounded-xl border border-white/[0.08] bg-white/[0.06] px-4",
          "text-[13px] font-[600] tracking-tight text-white/72",
          className
        ),
        children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" }),
          /* @__PURE__ */ jsx("span", { children: wipLabel })
        ]
      }
    );
  }
  const clean = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: cx$1(
        "group relative flex min-h-[44px] w-full min-w-0 items-center justify-center",
        "rounded-xl border border-white/[0.08] bg-white/[0.06] px-4 py-2.5 pr-[4.75rem]",
        "text-white/85 transition hover:border-white/[0.12] hover:bg-white/[0.09]",
        className
      ),
      "aria-label": `${clean} — ${openLabel}`,
      title: clean,
      children: [
        /* @__PURE__ */ jsx("span", { className: "min-w-0 max-w-[calc(100%-4.5rem)] truncate text-center text-[13px] font-[600] tracking-tight", children: clean }),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-[500] text-white/50 group-hover:text-white/65", children: openLabel })
      ]
    }
  );
}
const HeroWebGLBg$2 = lazy(() => import("./assets/HeroWebGLBg-CnY8eKt4.js"));
const HEADER_H$1 = 72;
const GMAIL_EMAIL_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent("tivoonix@gmail.com")}&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;
function clamp$1(n, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function useParallaxCards() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(
      document.querySelectorAll("[data-parallax]")
    );
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const p = 1 - clamp$1(mid / vh, 0, 1);
        const amp = Number(el.dataset.parallaxAmp || 16);
        const y = (p - 0.5) * amp * -1.1;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
function ProjectCard({
  p,
  idx,
  isRu
}) {
  const labelProject = isRu ? "Проект" : "Project";
  const moreLabel = isRu ? "Подробнее" : "Details";
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const wip = p.status === "wip";
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-parallax": true,
      "data-parallax-amp": String(14 + idx * 4),
      className: cx$1(
        "relative overflow-hidden rounded-[24px]",
        "border border-white/[0.06] bg-white/[0.04] backdrop-blur-2xl",
        "will-change-transform"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col gap-8 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx(ProjectPreviewFrame, { src: projectPreviewSrc(p) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:items-start lg:gap-x-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38", children: labelProject }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-2", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-[1.375rem] sm:text-[1.625rem] font-[780] tracking-[-0.03em] text-white/[0.94] leading-[1.12]", children: p.title }),
              wip ? /* @__PURE__ */ jsx(
                "span",
                {
                  className: cx$1(
                    "inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.05]",
                    "px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/48"
                  ),
                  children: "WIP"
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-[60ch] text-[14px] sm:text-[15px] font-[450] leading-[1.62] text-white/[0.58]", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2.5 lg:shrink-0", children: [
            /* @__PURE__ */ jsx(DomainPill, { href: p.domain, status: p.status ?? "live", isRu }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `/projects/${p.id}`,
                className: cx$1(
                  "flex h-11 w-full items-center justify-center rounded-xl px-5",
                  "border-0 bg-[#FF9A3D] text-[13px] font-[650] text-black",
                  "transition-colors hover:bg-[#FFAC5C] active:bg-[#F08A2E]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55"
                ),
                "aria-label": isRu ? `Подробнее о проекте ${p.title}` : `More details about ${p.title}`,
                children: moreLabel
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-white/[0.06] pt-6", children: /* @__PURE__ */ jsx("ul", { className: "flex list-none flex-wrap gap-x-2 gap-y-2 p-0", role: "list", children: p.tags.map((tag) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          "span",
          {
            className: cx$1(
              "inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.05]",
              "px-2.5 py-1 text-[11px] font-[550] tracking-wide text-white/[0.68]"
            ),
            children: tag
          }
        ) }, tag)) }) })
      ] })
    }
  );
}
function MoreCard({ isRu }) {
  const soonLabel = isRu ? "Дальше" : "Next";
  const title = isRu ? "Дальше — больше" : "More coming soon";
  const body = isRu ? "Добавим новые кейсы и продукты. Сейчас показываем живые домены + то, что в активной разработке." : "We’ll add more case studies and products. For now we show live domains + what’s in active development.";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx$1(
        "relative overflow-hidden rounded-[24px]",
        "border border-white/[0.06] bg-white/[0.04] backdrop-blur-2xl"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38", children: soonLabel }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-[1.375rem] sm:text-[1.625rem] font-[780] tracking-[-0.03em] text-white/[0.94] leading-[1.12]", children: title }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 max-w-[60ch] text-[14px] sm:text-[15px] leading-[1.62] text-white/[0.58]", children: body })
      ] })
    }
  );
}
function ProjectsPage() {
  useParallaxCards();
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const projects = useMemo(() => buildProjects(isRu), [isRu]);
  const gmailLabel = "Gmail";
  const tgLabel = "Telegram";
  const seoTitle = isRu ? "Проекты и кейсы TIVONIX — сайты, веб-сервисы и MVP" : "TIVONIX projects and case studies — websites, web services and MVP";
  const seoDescription = isRu ? "Посмотрите проекты TIVONIX: лендинги, веб-сервисы, личные кабинеты, админки, MVP и Telegram-интеграции для бизнеса." : "Explore TIVONIX projects: landings, web services, client areas, admin panels, MVPs and Telegram integrations for business.";
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen", style: s$1({ "--headerH": `${HEADER_H$1}px` }), children: [
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
    /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10", "aria-hidden": true, children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden bg-black", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-full w-full scale-[1.03] will-change-transform", children: mounted ? /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(HeroWebGLBg$2, {}) }) : null }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0",
          style: s$1({
            background: "radial-gradient(1200px 650px at 18% 12%, rgba(255,154,61,0.18), transparent 60%),radial-gradient(900px 520px at 85% 20%, rgba(255,106,26,0.14), transparent 62%)"
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Section, { className: "pt-[calc(var(--headerH)+20px)] sm:pt-[calc(var(--headerH)+28px)] pb-16", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-10", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-[calc(var(--headerH)+14px)] lg:self-start", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[520px]", children: [
        /* @__PURE__ */ jsxs("h1", { className: "mt-7 text-[34px] sm:text-[48px] font-[800] tracking-[-0.03em] text-white leading-[1.05]", children: [
          isRu ? "Проекты " : "Projects ",
          /* @__PURE__ */ jsx("span", { className: "bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent", children: "TIVONIX" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: GMAIL_EMAIL_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              className: cx$1(
                "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                "border-0 bg-white/[0.10] backdrop-blur",
                "text-[14px] font-[650] text-white/85 hover:bg-white/[0.14] transition whitespace-nowrap"
              ),
              children: gmailLabel
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://t.me/TIVONIX",
              target: "_blank",
              rel: "noopener noreferrer",
              className: cx$1(
                "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                "text-[14px] font-[750] text-black whitespace-nowrap",
                "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                "shadow-[0_18px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition"
              ),
              children: tgLabel
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        projects.map((p, idx) => /* @__PURE__ */ jsx(ProjectCard, { p, idx, isRu }, p.id)),
        /* @__PURE__ */ jsx(MoreCard, { isRu }),
        /* @__PURE__ */ jsx("div", { id: "contact", className: "pt-2" })
      ] })
    ] }) }) })
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
            className: cx$1(
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
          /* @__PURE__ */ jsx("div", { className: "order-2 min-w-0 lg:order-1", children: /* @__PURE__ */ jsx(ProjectPreviewFrame, { src: projectPreviewSrc(project) }) }),
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
                    className: cx$1(
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
                  className: cx$1(
                    "inline-flex h-11 w-full items-center justify-center rounded-lg px-5",
                    "bg-white text-[14px] font-[700] text-neutral-900 hover:bg-white/90 transition"
                  ),
                  children: openSiteLabel
                }
              ) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: cx$1(
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
                  className: cx$1(
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
function cx(...a) {
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
      className: cx(
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
        /* @__PURE__ */ jsx("div", { className: cx("absolute inset-0 will-change-transform", reverse ? "orbit-rev" : "orbit"), style: animStyle, children: items.map((it, i) => {
          const ang = offsetDeg + i * step + (i % 2 ? 8 : -5);
          const posStyle = s({
            transform: `translate(-50%,-50%) rotate(${ang}deg) translateX(${radius}px) rotate(${-ang}deg)`
          });
          return /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/2", style: posStyle, children: /* @__PURE__ */ jsx("div", { className: cx(reverse ? "counter-rev" : "counter"), style: animStyle, children: /* @__PURE__ */ jsx(LangChip, { item: it }) }) }, `${it.label}-${i}`);
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
  const contactRowClass = cx(
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
                /* @__PURE__ */ jsx("span", { className: cx(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconTG, {}) }),
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
              className: cx(contactRowClass, "hidden sm:inline-flex"),
              children: [
                /* @__PURE__ */ jsx("span", { className: cx(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconMail, {}) }),
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
                /* @__PURE__ */ jsx("span", { className: cx(iconBoxClass, "text-[#FF9A3D]"), children: /* @__PURE__ */ jsx(IconInstagram, {}) }),
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
            className: cx(
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
    image: "1.png"
  },
  {
    title: "Команда тратит время вручную",
    text: "Менеджеры переносят данные, обновляют статусы и собирают отчёты руками вместо автоматизации.",
    image: "2.png"
  },
  {
    title: "Нет контроля над процессами",
    text: "Руководителю сложно понять, где застряли заявки, кто отвечает и сколько денег теряется.",
    image: "3.png"
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
        image: item.image ?? `${index + 1}.png`,
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
        image: "1.png"
      },
      {
        number: "02",
        title: "Клиенты ведутся вручную",
        text: "Менеджеры хранят информацию в таблицах, чатах и заметках, поэтому история клиента быстро распадается на куски.",
        image: "2.png"
      },
      {
        number: "03",
        title: "Ручной перенос данных",
        text: "Одни и те же данные копируются между CRM, таблицами, почтой и документами. Это забирает время и создаёт ошибки.",
        image: "3.png"
      },
      {
        number: "04",
        title: "Нет прозрачной аналитики",
        text: "Данные разбросаны по разным местам. Чтобы понять, что происходит в бизнесе, приходится собирать всё вручную.",
        image: "4.png"
      },
      {
        number: "05",
        title: "Повторяющиеся вопросы клиентов",
        text: "Команда снова и снова отвечает на одинаковые сообщения вместо того, чтобы заниматься продажами и развитием.",
        image: "5.png"
      },
      {
        number: "06",
        title: "Много повторяющихся действий",
        text: "Статусы, уведомления, напоминания, отчёты и передача задач выполняются руками, хотя это можно автоматизировать.",
        image: "6.png"
      },
      {
        number: "07",
        title: "Готовые сервисы не подходят под вашу логику работы",
        text: "Бизнес работает по своим правилам, а стандартные инструменты не закрывают процесс полностью.",
        image: "7.png"
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
        image: "1.png"
      },
      {
        title: "Потерянные заявки",
        text: "Когда заявки приходят из разных каналов и не собираются в одной системе, часть обращений теряется или обрабатывается слишком поздно.",
        image: "2.png"
      },
      {
        title: "Нет прозрачной аналитики",
        text: "Данные разбросаны по разным местам. Чтобы понять, что происходит в бизнесе, приходится собирать всё вручную.",
        image: "3.png"
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
        image: "1.png"
      },
      {
        title: "CRM и воронки продаж",
        text: "Настроим систему для работы с клиентами, статусами, задачами и этапами продаж.",
        image: "2.png"
      },
      {
        title: "Личные кабинеты",
        text: "Разработаем кабинеты для клиентов, сотрудников или партнёров с нужными функциями и ролями.",
        image: "3.png"
      },
      {
        title: "Админ-панели",
        text: "Сделаем удобные внутренние панели управления для заявок, пользователей, заказов, контента и процессов.",
        image: "4.png"
      },
      {
        title: "Уведомления и напоминания",
        text: "Настроим автоматические уведомления в Telegram, email или внутри системы.",
        image: "5.png"
      },
      {
        title: "Отчёты и аналитика",
        text: "Соберём ключевые показатели в удобные дашборды и понятные отчёты.",
        image: "6.png"
      },
      {
        title: "Оплаты и документы",
        text: "Подключим оплату, статусы платежей, подтверждения, документы и логику после оплаты.",
        image: "7.png"
      },
      {
        title: "Интеграции с внешними сервисами",
        text: "Свяжем сайт, CRM, Telegram, таблицы, платёжные системы, API и другие инструменты.",
        image: "8.png"
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
        image: "1.png"
      },
      {
        number: "02",
        title: "Clients tracked by hand",
        text: "Teams keep context in spreadsheets, chats, and notes, so the customer story falls apart.",
        image: "2.png"
      },
      {
        number: "03",
        title: "Manual data copying",
        text: "The same data is retyped across CRM, sheets, email, and documents—slow and error-prone.",
        image: "3.png"
      },
      {
        number: "04",
        title: "No clear analytics",
        text: "Metrics live in different places; understanding the business means stitching reports manually.",
        image: "4.png"
      },
      {
        number: "05",
        title: "Repetitive client questions",
        text: "The team answers the same messages again and again instead of selling and growing.",
        image: "5.png"
      },
      {
        number: "06",
        title: "Too many repeat tasks",
        text: "Statuses, alerts, reminders, reports, and handoffs are done manually though they could run automatically.",
        image: "6.png"
      },
      {
        number: "07",
        title: "Off-the-shelf tools don’t fit",
        text: "Your business has its own rules; standard products rarely cover the full process.",
        image: "7.png"
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
        image: "1.png"
      },
      {
        title: "Lost leads",
        text: "When leads come from many channels and aren’t unified, some inquiries are lost or handled too late.",
        image: "2.png"
      },
      {
        title: "No transparent analytics",
        text: "Data is scattered; seeing what’s really happening means manual reporting.",
        image: "3.png"
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
        image: "1.png"
      },
      {
        title: "CRM & sales pipelines",
        text: "Set up clients, statuses, tasks, and pipeline stages the way you sell.",
        image: "2.png"
      },
      {
        title: "Client portals",
        text: "Build portals for customers, staff, or partners with the right features and roles.",
        image: "3.png"
      },
      {
        title: "Admin panels",
        text: "Internal tools for leads, users, orders, content, and operations—tailored to your process.",
        image: "4.png"
      },
      {
        title: "Notifications & reminders",
        text: "Automated alerts in Telegram, email, or inside your product.",
        image: "5.png"
      },
      {
        title: "Reporting & analytics",
        text: "Dashboards and reports for the KPIs that matter.",
        image: "6.png"
      },
      {
        title: "Payments & documents",
        text: "Payments, statuses, confirmations, documents, and post-payment logic.",
        image: "7.png"
      },
      {
        title: "External integrations",
        text: "Connect site, CRM, Telegram, spreadsheets, payments, APIs, and more.",
        image: "8.png"
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
const AUTOMATION_HERO_IMG = "/images/avtomatizaciya-biznesa/hero.png";
const AUTOMATION_CONTACT_EMAIL = "tivoonix@gmail.com";
const WHY_TIVONIX_BAND_IMG = "/images/sunset.webp";
const TIVONIX_LOGO_MARK = "/images/tivonix-logo-icon.png";
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
      url: "https://www.tivonix.tech/avtomatizaciya-biznesa"
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
