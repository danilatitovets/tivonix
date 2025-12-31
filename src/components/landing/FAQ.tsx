// src/components/landing/FAQ.tsx
import { useMemo, useState, useEffect, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider"; // ✅ твой провайдер языка

// ====== типы / хелперы ======
const LOGO_VIDEO_MP4 = "/images/animation.mp4"; // положи в public/images

type Cat =
  | "start"
  | "price"
  | "time"
  | "process"
  | "design"
  | "dev"
  | "content"
  | "seo"
  | "tech"
  | "support"
  | "fix";

type FaqItem = {
  id: string;
  cat: Cat;
  q: { ru: string; en: string };
  a: { ru: string; en: string };
};

type LocalFaqItem = {
  id: string;
  cat: Cat;
  q: string;
  a: string;
  catLabel: string;
};

type CatFilter = "all" | Cat;

const LOGO_ICON = "/images/tivonix-logo-icon.png";
const PAGE_SIZE = 6;
const CLOSED_CARD_H = 285;
const ORANGE = "#FF9A3D";

// ✅ CSS helper — даёт style индекс-сигнатуру
type Style = CSSProperties & Record<string, any>;
const s = (v: Record<string, any>) => v as Style;

const CAT_LABELS: Record<Cat, { ru: string; en: string }> = {
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
  fix: { ru: "Правки", en: "Edits" },
};

const FAQ_ITEMS: FaqItem[] = [
  // Старт
  {
    id: "start-brief",
    cat: "start",
    q: {
      ru: "С чего начинается работа?",
      en: "Where does the work start?",
    },
    a: {
      ru: "С короткого брифа: чем занимаетесь, кому продаёте, какие услуги/продукты, примеры сайтов которые нравятся, и цель (заявки/продажи/презентация). Затем фиксируем структуру страницы и план работ.",
      en: "With a short brief: what you do, who your customers are, what services or products you sell, examples of sites you like, and the main goal (leads, sales, presentation). Then we lock the page structure and the work plan.",
    },
  },
  {
    id: "start-need",
    cat: "start",
    q: {
      ru: "Что нужно от нас, чтобы начать?",
      en: "What do you need from us to get started?",
    },
    a: {
      ru: "Логотип (если есть), контакты/соцсети, черновые тексты (можно без идеала), фото/кейсы (если есть). Если чего-то нет — подскажем, чем заменить и как быстро собрать.",
      en: "Logo (if you have one), contacts/social links, rough texts (they do not have to be perfect), photos/case studies (if available). If something is missing, we suggest how to replace it and how to collect it quickly.",
    },
  },
  {
    id: "start-domain",
    cat: "start",
    q: {
      ru: "Вы помогаете с доменом и хостингом?",
      en: "Do you help with domain and hosting?",
    },
    a: {
      ru: "Да. Поможем купить домен, настроить DNS и развернуть сайт на хостинге/сервере (или Vercel/Netlify).",
      en: "Yes. We help you buy a domain, configure DNS and deploy the site to hosting/server (or Vercel / Netlify).",
    },
  },

  // Стоимость
  {
    id: "price-from",
    cat: "price",
    q: {
      ru: "Сколько стоит сайт-визитка / лендинг?",
      en: "How much does a promo site / landing page cost?",
    },
    a: {
      ru: "Цена зависит от количества блоков, сложности анимаций и интеграций. Обычно есть 3 уровня: мини (до 6 блоков), стандарт (8–12 блоков), премиум (сложные блоки/анимации/интеграции).",
      en: "The price depends on the number of sections, animation complexity, and integrations. Usually there are 3 tiers: mini (up to 6 sections), standard (8–12 sections), and premium (complex sections/animations/integrations).",
    },
  },
  {
    id: "price-included",
    cat: "price",
    q: {
      ru: "Что входит в стоимость?",
      en: "What is included in the price?",
    },
    a: {
      ru: "Премиум-дизайн, адаптив, сборка на React+Tailwind, оптимизация изображений, базовое SEO, подключение форм/уведомлений (по запросу), деплой и мини-инструкция как менять контент.",
      en: "Premium design, responsive layout, React + Tailwind build, image optimization, basic SEO, forms/notifications integration (on request), deployment, and a short guide on how to edit the content.",
    },
  },
  {
    id: "price-payments",
    cat: "price",
    q: {
      ru: "Как происходит оплата?",
      en: "How does payment work?",
    },
    a: {
      ru: "Обычно по этапам: 50% старт — 50% по готовности (или 3 этапа: дизайн/сборка/деплой).",
      en: "Usually in stages: 50% upfront and 50% on completion (or 3 stages: design / build / deploy).",
    },
  },

  // Сроки
  {
    id: "time-howlong",
    cat: "time",
    q: {
      ru: "Сколько по времени делается сайт?",
      en: "How long does it take to build the site?",
    },
    a: {
      ru: "Чаще всего 3–10 дней. Зависит от готовности контента и скорости согласований.",
      en: "Most often 3–10 days. It depends on how ready the content is and how fast approvals go.",
    },
  },
  {
    id: "time-urgent",
    cat: "time",
    q: {
      ru: "Можно срочно за 1–2 дня?",
      en: "Is it possible to do it urgently in 1–2 days?",
    },
    a: {
      ru: "Можно, если структура простая и контент готов. Тогда делаем 1–2 итерации правок и быстро выкатываем на домен.",
      en: "Yes, if the structure is simple and the content is ready. Then we do 1–2 rounds of edits and quickly launch it on the domain.",
    },
  },

  // Процесс
  {
    id: "process-steps",
    cat: "process",
    q: {
      ru: "Какие этапы работы?",
      en: "What are the main steps of the process?",
    },
    a: {
      ru: "1) Бриф и структура 2) Дизайн ключевых блоков 3) Сборка и адаптив 4) Правки 5) Оптимизация 6) Деплой 7) Передача + инструкция.",
      en: "1) Brief and structure 2) Design of key sections 3) Build and responsive layout 4) Edits 5) Optimization 6) Deploy 7) Handover and a short guide.",
    },
  },
  {
    id: "process-revisions",
    cat: "process",
    q: {
      ru: "Сколько правок включено?",
      en: "How many revisions are included?",
    },
    a: {
      ru: "Обычно 2 круга по дизайну и 2 круга по текстам/мелочам. Если нужно больше — согласуем объём.",
      en: "Usually 2 rounds for design and 2 rounds for texts/small details. If you need more, we discuss the extra scope.",
    },
  },

  // Дизайн
  {
    id: "design-saas",
    cat: "design",
    q: {
      ru: "Сделаете как у топ-SaaS?",
      en: "Can you make it look like a top-tier SaaS?",
    },
    a: {
      ru: "Да. Делаем премиум-стиль: стекло, мягкие свечения, градиенты, аккуратная типографика, точки/шум, правильная сетка.",
      en: "Yes. We build a premium style: glassmorphism, soft glows, gradients, tidy typography, noise/dots, and a proper layout grid.",
    },
  },
  {
    id: "design-brand",
    cat: "design",
    q: {
      ru: "Можно в фирменных цветах?",
      en: "Can you use our brand colors?",
    },
    a: {
      ru: "Да. Подстроим палитру/градиенты под бренд, чтобы всё было едино и «дорого».",
      en: "Yes. We adapt the palette and gradients to your brand so everything feels consistent and premium.",
    },
  },

  // Разработка
  {
    id: "dev-tech",
    cat: "dev",
    q: {
      ru: "На чём сделан сайт? Это WordPress?",
      en: "What is the tech stack? Is it WordPress?",
    },
    a: {
      ru: "Нет. Сайт на React + TypeScript + Tailwind: быстрее, гибче, чище и легче масштабируется.",
      en: "No. It is built with React + TypeScript + Tailwind: faster, more flexible, cleaner, and easier to scale.",
    },
  },
  {
    id: "dev-integrations",
    cat: "dev",
    q: {
      ru: "Можно подключить формы, Telegram, CRM?",
      en: "Can you connect forms, Telegram, or CRM?",
    },
    a: {
      ru: "Да. Подключим форму (email/Telegram), Google Sheets, CRM (amo/Bitrix) и события аналитики.",
      en: "Yes. We can connect a form (email/Telegram), Google Sheets, CRM (amo/Bitrix), and analytics events.",
    },
  },

  // Контент
  {
    id: "content-text",
    cat: "content",
    q: {
      ru: "Помогаете с текстами, если у нас их нет?",
      en: "Do you help with copy if we do not have it yet?",
    },
    a: {
      ru: "Да. Поможем оформить оффер, преимущества, блоки, CTA и FAQ — даже из черновиков.",
      en: "Yes. We help shape the offer, benefits, sections, CTAs, and FAQ — even from rough drafts.",
    },
  },

  // SEO
  {
    id: "seo-basic",
    cat: "seo",
    q: {
      ru: "Будет ли сайт находиться в Google?",
      en: "Will the site be discoverable in Google?",
    },
    a: {
      ru: "Сделаем базовую SEO-основу: заголовки, мета, alt, скорость. Для полноценного продвижения нужен отдельный план и контент-стратегия.",
      en: "We set up basic SEO: titles, meta tags, alts, and performance. For full-scale promotion you will need a separate SEO and content strategy.",
    },
  },

  // Тех.часть
  {
    id: "tech-speed",
    cat: "tech",
    q: {
      ru: "Сайт будет быстро грузиться?",
      en: "Will the site load fast?",
    },
    a: {
      ru: "Да. Оптимизация изображений, кеширование, аккуратные шрифты и лёгкая сборка дают быструю загрузку.",
      en: "Yes. Image optimization, caching, lean fonts and a light build make the site load quickly.",
    },
  },
  {
    id: "tech-mobile",
    cat: "tech",
    q: {
      ru: "Будет адаптив под телефон?",
      en: "Will it be responsive on mobile?",
    },
    a: {
      ru: "Да. Адаптив — стандарт: телефон, планшет, ноутбук, большой экран.",
      en: "Yes. Responsive layout is standard: phone, tablet, laptop, and large screens.",
    },
  },

  // Поддержка
  {
    id: "support-after",
    cat: "support",
    q: {
      ru: "Вы помогаете после запуска?",
      en: "Do you help after the launch?",
    },
    a: {
      ru: "Да. Можем сопровождать: правки, новые блоки/страницы, интеграции, улучшения конверсии.",
      en: "Yes. We can support you after launch: edits, new blocks/pages, integrations, and conversion improvements.",
    },
  },

  // Правки
  {
    id: "fix-after",
    cat: "fix",
    q: {
      ru: "Если после запуска найдём косяк/отступ?",
      en: "What if we find a bug or spacing issue after launch?",
    },
    a: {
      ru: "Исправим. Доводим визуал до аккуратного состояния.",
      en: "We fix it. We bring the visuals to a clean and tidy state.",
    },
  },
];

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function Icon({ name }: { name: "search" | "copy" | "mail" }) {
  const common = "h-4 w-4 shrink-0";
  switch (name) {
    case "search":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16.2 16.2 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "copy":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 9h10v10H9V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path
            d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="m6 8 6 4.2L18 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function toDomId(id: string) {
  return `faq-${id}`;
}

export default function FAQSection() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const l = isRu ? "ru" : "en";

  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState<CatFilter>("all");
  const [page, setPage] = useState(1);

  const cats = useMemo<CatFilter[]>(() => {
    const set = new Set<Cat>();
    for (const x of FAQ_ITEMS) set.add(x.cat);
    return ["all", ...Array.from(set)];
  }, []);

  // локализованные айтемы
  const localizedItems = useMemo<LocalFaqItem[]>(() => {
    return FAQ_ITEMS.map((item) => ({
      id: item.id,
      cat: item.cat,
      q: item.q[l],
      a: item.a[l],
      catLabel: CAT_LABELS[item.cat][l],
    }));
  }, [l]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = localizedItems;

    if (catFilter !== "all") {
      list = list.filter((x) => x.cat === catFilter);
    }
    if (!q) return list;

    return list.filter((x) =>
      (`${x.q} ${x.a} ${x.catLabel}`).toLowerCase().includes(q)
    );
  }, [query, catFilter, localizedItems]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
    setOpenId(null);
  }, [query, catFilter, l]);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const items = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((v) => (v === id ? null : v)), 900);
    } catch {
      // ignore
    }
  }

  const title = isRu ? "FAQ — всё про сайт и работу" : "FAQ — about the site and workflow";
  const subtitle = isRu
    ? "Стоимость, сроки, процесс, контент, SEO, техчасть — всё здесь."
    : "Pricing, timelines, process, content, SEO, and tech — all in one place.";
  const placeholder = isRu ? "Поиск по вопросам..." : "Search questions...";
  const resetLabel = isRu ? "Сбросить" : "Reset";
  const allLabel = isRu ? "Все" : "All";
  const btnOpen = isRu ? "Открыть" : "Open";
  const btnHide = isRu ? "Скрыть" : "Hide";
  const btnShowAnswer = isRu ? "Показать ответ" : "Show answer";
  const btnCopyAnswer = isRu ? "Скопировать ответ" : "Copy answer";
  const btnCopied = isRu ? "Скопировано" : "Copied";
  const btnWriteUs = isRu ? "Написать нам" : "Contact us";

  return (
    <Section id="faq" className={cx("relative overflow-hidden pt-16 sm:pt-20 pb-16 sm:pb-20 bg-black")}>
      {/* градиентная анимация границы */}
      <style>{`
        @keyframes faqBorderMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .faq-grad-border { position: relative; }

        .faq-grad-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 18px;
          padding: 1px;
          pointer-events: none;
          opacity: 0;
          transition: opacity .22s ease;

          background: linear-gradient(
            90deg,
            #FFD7B0 0%,
            #FF9A3D 18%,
            #FF6A1A 55%,
            #FF9A3D 86%,
            #FFD7B0 100%
          );
          background-size: 220% 220%;
          animation: faqBorderMove 1.4s linear infinite;

          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          mask-composite: exclude;
        }

        .faq-grad-border:hover::before { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .faq-grad-border::before { animation: none; }
        }
      `}</style>

      {/* фон */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={s({
          background:
            "radial-gradient(900px 380px at 50% 0%, rgba(255,255,255,0.08), transparent 55%)," +
            "radial-gradient(700px 260px at 18% 12%, rgba(143,191,179,0.12), transparent 60%)," +
            "radial-gradient(700px 260px at 82% 12%, rgba(143,168,200,0.12), transparent 60%)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 35%)," +
            "linear-gradient(to bottom, #050505 0%, #050505 42%, #000000 100%)",
        })}
      />

      <Container>
        {/* шапка */}
        <div className="relative mx-auto max-w-2xl text-center">

<div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-white/10 bg-black/40 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
  <video
    muted
    playsInline
    loop
    autoPlay
    preload="auto"
    className="
      absolute left-1/2 top-1/2
      h-[130%] w-[130%]
      -translate-x-1/2 -translate-y-1/2
      object-cover
    "
    onError={(e) => {
      (e.currentTarget as HTMLVideoElement).style.display = "none";
    }}
  >
    <source src={LOGO_VIDEO_MP4} type="video/mp4" />
  </video>
</div>

          <h2 className="mt-5 font-display text-[30px] leading-[34px] sm:text-[40px] sm:leading-[44px] font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-[15px] text-white/55">{subtitle}</p>

          {/* поиск + сброс */}
          <div className="mt-6">
            <div className="mx-auto max-w-[720px]">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center">
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <span style={s({ color: ORANGE })}>
                      <Icon name="search" />
                    </span>
                  </div>

                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className={cx(
                      "w-full h-11 sm:h-12 rounded-[14px]",
                      "bg-white/[0.04] border border-white/10",
                      "pl-10 pr-4 text-sm text-white/85 placeholder:text-white/35",
                      "outline-none",
                      "focus:border-white/20 focus:ring-2 focus:ring-white/10",
                      "shadow-[0_18px_70px_rgba(0,0,0,0.55)]"
                    )}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setOpenId(null);
                    setCatFilter("all");
                    setPage(1);
                  }}
                  className={cx(
                    "h-11 sm:h-12 px-4 rounded-[14px]",
                    "border border-white/10 bg-white/[0.04]",
                    "text-sm text-white/70 hover:text-white/90 hover:bg-white/[0.06] transition",
                    "shadow-[0_18px_70px_rgba(0,0,0,0.45)]"
                  )}
                >
                  {resetLabel}
                </button>
              </div>

              {/* категории */}
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {cats.map((c) => {
                  const active = c === catFilter;
                  const label =
                    c === "all" ? allLabel : CAT_LABELS[c][l];

                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCatFilter(c)}
                      className={cx(
                        "rounded-full px-3 py-1.5 text-xs font-medium",
                        "border border-white/10",
                        active
                          ? "bg-white/[0.08] text-white"
                          : "bg-black/20 text-white/70 hover:text-white/90 hover:bg-white/[0.05]",
                        "transition"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* карточки (6 на страницу) */}
        <div className={cx("mt-7 grid gap-5", "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3")}>
          {items.map((f) => {
            const isOpen = openId === f.id;
            const domId = toDomId(f.id);

            return (
              <div
                key={f.id}
                className={cx(
                  "group faq-grad-border relative overflow-hidden rounded-[18px]",
                  "border border-white/10 bg-white/[0.03]",
                  "shadow-[0_22px_90px_rgba(0,0,0,0.65)]"
                )}
                style={!isOpen ? s({ height: CLOSED_CARD_H }) : undefined}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

                <div className="relative z-[2] p-5 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-white/90 leading-snug">{f.q}</div>
                      <div className="mt-1 text-[12px] text-white/45">{f.catLabel}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenId((v) => (v === f.id ? null : f.id))}
                      aria-expanded={isOpen}
                      aria-controls={domId}
                      className={cx(
                        "shrink-0 rounded-[12px] px-3 py-1.5 text-[12px] font-medium",
                        "border border-white/10 bg-white/[0.04] text-white/75",
                        "hover:bg-white/[0.06] hover:text-white/90 transition"
                      )}
                    >
                      {isOpen ? btnHide : btnOpen}
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      onClick={() => setOpenId((v) => (v === f.id ? null : f.id))}
                      className="w-full flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-[12px] text-white/70 hover:bg-white/[0.04] transition"
                    >
                      <img src={LOGO_ICON} alt="" className="h-4 w-4 object-contain" draggable={false} />
                      {btnShowAnswer}
                    </button>

                    <button
                      type="button"
                      onClick={() => copy(f.a, f.id)}
                      className="w-full flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-[12px] text-white/70 hover:bg-white/[0.04] transition"
                    >
                      <span style={s({ color: ORANGE })}>
                        <Icon name="copy" />
                      </span>
                      {copied === f.id ? btnCopied : btnCopyAnswer}
                    </button>

                    <a
                      href="#contact"
                      className="w-full flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.02] px-3 py-2 text-left text-[12px] text-white/70 hover:bg-white/[0.04] transition"
                    >
                      <span style={s({ color: ORANGE })}>
                        <Icon name="mail" />
                      </span>
                      {btnWriteUs}
                    </a>
                  </div>

                  <div
                    id={domId}
                    className={cx(
                      "mt-3 rounded-[14px] border border-white/10 bg-black/30 px-4 py-3",
                      "text-[13px] leading-relaxed text-white/65",
                      isOpen ? "block" : "hidden"
                    )}
                  >
                    {f.a}
                  </div>

                  {!isOpen ? <div className="mt-auto" /> : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* пагинация-кружки */}
        <div className="relative mt-10 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = n === page;

              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cx(
                    "relative grid place-items-center rounded-full select-none",
                    "h-10 w-10 sm:h-11 sm:w-11",
                    "text-[13px] sm:text-[14px] font-semibold",
                    "border border-white/10",
                    "transition-transform duration-200",
                    active ? "scale-[1.06]" : "hover:scale-[1.04]"
                  )}
                  style={s({
                    color: "#fff",
                    background: active
                      ? "radial-gradient(circle at 30% 28%, #FFD7B0 0%, #FFB474 22%, #FF9A3D 45%, #FF6A1A 78%, #C84A00 100%)"
                      : "radial-gradient(circle at 30% 28%, rgba(255,215,176,0.95) 0%, #FF9A3D 44%, #FF6A1A 78%, #B84800 100%)",
                    boxShadow: active
                      ? "0 18px 50px rgba(255,122,0,0.22), inset 0 1px 0 rgba(255,255,255,0.22)"
                      : "0 14px 36px rgba(255,122,0,0.16), inset 0 1px 0 rgba(255,255,255,0.18)",
                    opacity: active ? 1 : 0.92,
                  })}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={s({
                      background:
                        "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 20%, transparent 55%)",
                      opacity: 0.7,
                    })}
                  />
                  <span className="relative z-10">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
