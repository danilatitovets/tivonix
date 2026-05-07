// src/components/landing/FAQ.tsx
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

// ====== types ======
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
const BG_IMG = "/images/sunset.webp";

const PAGE_SIZE = 6;
const ORANGE = "#FF9A3D";

// UX: показываем только топ-категории сразу, остальные — через "Ещё"
const PRIMARY_CATS: Cat[] = ["start", "price", "time", "process", "design", "dev"];
const SECONDARY_CATS: Cat[] = ["content", "seo", "tech", "support", "fix"];

type Style = CSSProperties & Record<string, unknown>;
const s = (v: Record<string, unknown>) => v as Style;

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

const TEASER_TEXTS: Record<Cat, { ru: string; en: string }> = {
  start: {
    ru: "Как мы заходим в проект и что нужно от вас на старте.",
    en: "How we get into the project and what we need from you at the start.",
  },
  price: {
    ru: "Ориентиры по бюджету и что реально входит в стоимость.",
    en: "Budget guidelines and what is actually included in the price.",
  },
  time: {
    ru: "Типичные сроки и когда можно ускориться до 1–2 дней.",
    en: "Typical timelines and when we can speed up to 1–2 days.",
  },
  process: {
    ru: "Пошаговый процесс от брифа до запуска без хаоса.",
    en: "Step-by-step process from brief to launch without chaos.",
  },
  design: {
    ru: "Как собираем премиум-визуал и попадаем в ваш бренд.",
    en: "How we build premium visuals that match your brand.",
  },
  dev: {
    ru: "На чём всё собрано и какие интеграции возможны.",
    en: "What we build on and which integrations are possible.",
  },
  content: {
    ru: "Как помогаем с текстами, оффером и структурой блоков.",
    en: "How we help with copy, offer, and block structure.",
  },
  seo: {
    ru: "Что делаем по SEO уже на уровне лендинга.",
    en: "What we do for SEO already on the landing level.",
  },
  tech: {
    ru: "Про скорость загрузки, адаптив и тех.часть проекта.",
    en: "About load speed, responsiveness, and the tech side.",
  },
  support: {
    ru: "Как сопровождаем проект после запуска и что входит.",
    en: "How we support the project after launch and what is included.",
  },
  fix: {
    ru: "Как работаем с правками, отступами и мелкими доработками.",
    en: "How we handle edits, spacing, and small improvements.",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  // Старт
  {
    id: "start-brief",
    cat: "start",
    q: { ru: "С чего начинается работа?", en: "Where does the work start?" },
    a: {
      ru: "С короткого брифа: чем занимаетесь, кому продаёте, какие услуги/продукты, примеры сайтов которые нравятся, и цель (заявки/продажи/презентация). Затем фиксируем структуру страницы и план работ.",
      en: "With a short brief: what you do, who your customers are, what services or products you sell, examples of sites you like, and the main goal (leads, sales, presentation). Then we lock the page structure and the work plan.",
    },
  },
  {
    id: "start-need",
    cat: "start",
    q: { ru: "Что нужно от нас, чтобы начать?", en: "What do you need from us to get started?" },
    a: {
      ru: "Логотип (если есть), контакты/соцсети, черновые тексты (можно без идеала), фото/кейсы (если есть). Если чего-то нет — подскажем, чем заменить и как быстро собрать.",
      en: "Logo (if you have one), contacts/social links, rough texts (they do not have to be perfect), photos/case studies (if available). If something is missing, we suggest how to replace it and how to collect it quickly.",
    },
  },
  {
    id: "start-domain",
    cat: "start",
    q: { ru: "Вы помогаете с доменом и хостингом?", en: "Do you help with domain and hosting?" },
    a: {
      ru: "Да. Поможем купить домен, настроить DNS и развернуть сайт на хостинге/сервере (или Vercel/Netlify).",
      en: "Yes. We help you buy a domain, configure DNS and deploy the site to hosting/server (or Vercel / Netlify).",
    },
  },

  // Стоимость
  {
    id: "price-from",
    cat: "price",
    q: { ru: "Сколько стоит сайт-визитка / лендинг?", en: "How much does a promo site / landing page cost?" },
    a: {
      ru: "Цена зависит от количества блоков, сложности анимаций и интеграций. Обычно есть 3 уровня: мини (до 6 блоков), стандарт (8–12 блоков), премиум (сложные блоки/анимации/интеграции).",
      en: "The price depends on the number of sections, animation complexity, and integrations. Usually there are 3 tiers: mini (up to 6 sections), standard (8–12 sections), and premium (complex sections/animations/integrations).",
    },
  },
  {
    id: "price-included",
    cat: "price",
    q: { ru: "Что входит в стоимость?", en: "What is included in the price?" },
    a: {
      ru: "Премиум-дизайн, адаптив, сборка на React+Tailwind, оптимизация изображений, базовое SEO, подключение форм/уведомлений (по запросу), деплой и мини-инструкция как менять контент.",
      en: "Premium design, responsive layout, React + Tailwind build, image optimization, basic SEO, forms/notifications integration (on request), deployment, and a short guide on how to edit the content.",
    },
  },
  {
    id: "price-payments",
    cat: "price",
    q: { ru: "Как происходит оплата?", en: "How does payment work?" },
    a: {
      ru: "Обычно по этапам: 50% старт — 50% по готовности (или 3 этапа: дизайн/сборка/деплой).",
      en: "Usually in stages: 50% upfront and 50% on completion (or 3 stages: design / build / deploy).",
    },
  },

  // Сроки
  {
    id: "time-howlong",
    cat: "time",
    q: { ru: "Сколько по времени делается сайт?", en: "How long does it take to build the site?" },
    a: {
      ru: "Чаще всего 3–10 дней. Зависит от готовности контента и скорости согласований.",
      en: "Most often 3–10 days. It depends on how ready the content is and how fast approvals go.",
    },
  },
  {
    id: "time-urgent",
    cat: "time",
    q: { ru: "Можно срочно за 1–2 дня?", en: "Is it possible to do it urgently in 1–2 days?" },
    a: {
      ru: "Можно, если структура простая и контент готов. Тогда делаем 1–2 итерации правок и быстро выкатываем на домен.",
      en: "Yes, if the structure is simple and the content is ready. Then we do 1–2 rounds of edits and quickly launch it on the domain.",
    },
  },

  // Процесс
  {
    id: "process-steps",
    cat: "process",
    q: { ru: "Какие этапы работы?", en: "What are the main steps of the process?" },
    a: {
      ru: "1) Бриф и структура 2) Дизайн ключевых блоков 3) Сборка и адаптив 4) Правки 5) Оптимизация 6) Деплой 7) Передача + инструкция.",
      en: "1) Brief and structure 2) Design of key sections 3) Build and responsive layout 4) Edits 5) Optimization 6) Deploy 7) Handover and a short guide.",
    },
  },
  {
    id: "process-revisions",
    cat: "process",
    q: { ru: "Сколько правок включено?", en: "How many revisions are included?" },
    a: {
      ru: "Обычно 2 круга по дизайну и 2 круга по текстам/мелочам. Если нужно больше — согласуем объём.",
      en: "Usually 2 rounds for design and 2 rounds for texts/small details. If you need more, we discuss the extra scope.",
    },
  },

  // Дизайн
  {
    id: "design-saas",
    cat: "design",
    q: { ru: "Сделаете как у топ-SaaS?", en: "Can you make it look like a top-tier SaaS?" },
    a: {
      ru: "Да. Делаем премиум-стиль: стекло, мягкие свечения, градиенты, аккуратная типографика, точки/шум, правильная сетка.",
      en: "Yes. We build a premium style: glassmorphism, soft glows, gradients, tidy typography, noise/dots, and a proper layout grid.",
    },
  },
  {
    id: "design-brand",
    cat: "design",
    q: { ru: "Можно в фирменных цветах?", en: "Can you use our brand colors?" },
    a: {
      ru: "Да. Подстроим палитру/градиенты под бренд, чтобы всё было едино и «дорого».",
      en: "Yes. We adapt the palette and gradients to your brand so everything feels consistent and premium.",
    },
  },

  // Разработка
  {
    id: "dev-tech",
    cat: "dev",
    q: { ru: "На чём сделан сайт? Это WordPress?", en: "What is the tech stack? Is it WordPress?" },
    a: {
      ru: "Нет. Сайт на React + TypeScript + Tailwind: быстрее, гибче, чище и легче масштабируется.",
      en: "No. It is built with React + TypeScript + Tailwind: faster, more flexible, cleaner, and easier to scale.",
    },
  },
  {
    id: "dev-integrations",
    cat: "dev",
    q: { ru: "Можно подключить формы, Telegram, CRM?", en: "Can you connect forms, Telegram, or CRM?" },
    a: {
      ru: "Да. Подключим форму (email/Telegram), Google Sheets, CRM (amo/Bitrix) и события аналитики.",
      en: "Yes. We can connect a form (email/Telegram), Google Sheets, CRM (amo/Bitrix), and analytics events.",
    },
  },

  // Контент
  {
    id: "content-text",
    cat: "content",
    q: { ru: "Помогаете с текстами, если у нас их нет?", en: "Do you help with copy if we do not have it yet?" },
    a: {
      ru: "Да. Поможем оформить оффер, преимущества, блоки, CTA и FAQ — даже из черновиков.",
      en: "Yes. We help shape the offer, benefits, sections, CTAs, and FAQ — even from rough drafts.",
    },
  },

  // SEO
  {
    id: "seo-basic",
    cat: "seo",
    q: { ru: "Будет ли сайт находиться в Google?", en: "Will the site be discoverable in Google?" },
    a: {
      ru: "Сделаем базовую SEO-основу: заголовки, мета, alt, скорость. Для полноценного продвижения нужен отдельный план и контент-стратегия.",
      en: "We set up basic SEO: titles, meta tags, alts, and performance. For full-scale promotion you will need a separate SEO and content strategy.",
    },
  },

  // Тех.часть
  {
    id: "tech-speed",
    cat: "tech",
    q: { ru: "Сайт будет быстро грузиться?", en: "Will the site load fast?" },
    a: {
      ru: "Да. Оптимизация изображений, кеширование, аккуратные шрифты и лёгкая сборка дают быструю загрузку.",
      en: "Yes. Image optimization, caching, lean fonts and a light build make the site load quickly.",
    },
  },
  {
    id: "tech-mobile",
    cat: "tech",
    q: { ru: "Будет адаптив под телефон?", en: "Will it be responsive on mobile?" },
    a: {
      ru: "Да. Адаптив — стандарт: телефон, планшет, ноутбук, большой экран.",
      en: "Yes. Responsive layout is standard: phone, tablet, laptop, and large screens.",
    },
  },

  // Поддержка
  {
    id: "support-after",
    cat: "support",
    q: { ru: "Вы помогаете после запуска?", en: "Do you help after the launch?" },
    a: {
      ru: "Да. Можем сопровождать: правки, новые блоки/страницы, интеграции, улучшения конверсии.",
      en: "Yes. We can support you after launch: edits, new blocks/pages, integrations, and conversion improvements.",
    },
  },

  // Правки
  {
    id: "fix-after",
    cat: "fix",
    q: { ru: "Если после запуска найдём косяк/отступ?", en: "What if we find a bug or spacing issue after launch?" },
    a: {
      ru: "Исправим. Доводим визуал до аккуратного состояния.",
      en: "We fix it. We bring the visuals to a clean and tidy state.",
    },
  },
];

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function Icon({ name }: { name: "search" | "copy" | "chev" }) {
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
    case "chev":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m8.5 10 3.5 3.5L15.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function toDomId(id: string) {
  return `faq-${id}`;
}

function buildFaqJsonLd(items: LocalFaqItem[]) {
  // Google FAQ schema: https://schema.org/FAQPage
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
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
  const [showAllCats, setShowAllCats] = useState(false);

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

    if (catFilter !== "all") list = list.filter((x) => x.cat === catFilter);
    if (!q) return list;

    return list.filter((x) => (`${x.q} ${x.a} ${x.catLabel}`).toLowerCase().includes(q));
  }, [query, catFilter, localizedItems]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // reset page/open on filter changes
  useEffect(() => {
    setPage(1);
    setOpenId(null);
  }, [query, catFilter, l]);

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const resetDisabled = query.trim() === "" && catFilter === "all" && page === 1;

  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((v) => (v === id ? null : v)), 900);
    } catch {
      // optional: could fallback to execCommand, но в 2026 это обычно не нужно
    }
  }

  // microcopy
  const title = isRu ? "FAQ — всё про сайт и работу" : "FAQ — about the site and workflow";
  const subtitle = isRu
    ? "Стоимость, сроки, процесс, контент, SEO и техчасть — коротко и по делу."
    : "Pricing, timelines, process, content, SEO, and tech — short and to the point.";

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

  // JSON-LD: стабильный список для индексации (полный список, не зависит от поиска/категории/пагинации)
  const jsonLd = useMemo(() => buildFaqJsonLd(localizedItems), [localizedItems]);

  return (
    <Section id="faq" className="relative overflow-hidden pt-16 sm:pt-20 pb-16 sm:pb-20 bg-black">
      <style>{`
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
          .faq-card-bg{ backdrop-filter: blur(14px) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-answer-open{ animation: none; }
          .faq-answer-collapsed, .faq-answer-expanded{ transition: none; }
        }
      `}</style>

      {/* JSON-LD FAQ schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* background image as img (lazy-friendly) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={BG_IMG}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-95"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={s({
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.92) 100%)",
          })}
        />
      </div>

      <Container>
        {/* header */}
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="mt-5 font-display text-[30px] leading-[34px] sm:text-[40px] sm:leading-[44px] font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-[15px] text-white/60">{subtitle}</p>

          {/* search + reset */}
          <div className="mt-6">
            <div className="mx-auto max-w-[720px]">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] items-center">
                <div className="relative">
                  <label className="sr-only" htmlFor="faq-search">
                    {placeholder}
                  </label>

                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <span style={s({ color: ORANGE })}>
                      <Icon name="search" />
                    </span>
                  </div>

                  <input
                    id="faq-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    inputMode="search"
                    className={cx(
                      "w-full h-11 sm:h-12 rounded-[14px]",
                      "bg-white/[0.06] border-0",
                      "pl-10 pr-4 text-sm text-white/90 placeholder:text-white/40",
                      "outline-none",
                      "focus:ring-2 focus:ring-white/12",
                      "shadow-[0_18px_70px_rgba(0,0,0,0.55)]"
                    )}
                  />
                </div>

                <button
                  type="button"
                  disabled={resetDisabled}
                  onClick={() => {
                    setQuery("");
                    setOpenId(null);
                    setCatFilter("all");
                    setPage(1);
                    setShowAllCats(false);
                  }}
                  aria-disabled={resetDisabled}
                  className={cx(
                    "h-11 sm:h-12 px-4 rounded-[14px]",
                    "border-0 bg-white/[0.06]",
                    resetDisabled
                      ? "text-white/35 cursor-not-allowed opacity-70"
                      : "text-white/75 hover:text-white/92 hover:bg-white/[0.07] transition",
                    "shadow-[0_18px_70px_rgba(0,0,0,0.45)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  )}
                >
                  {resetLabel}
                </button>
              </div>

              {/* categories: one-row scroll on mobile, wrap on desktop */}
              <div className="mt-3">
                <div
                  className={cx(
                    "flex items-center justify-start sm:justify-center gap-2",
                    "overflow-x-auto sm:overflow-visible",
                    "no-scrollbar py-1"
                  )}
                  role="tablist"
                  aria-label={isRu ? "Категории вопросов" : "FAQ categories"}
                >
                  {/* All */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={catFilter === "all"}
                    aria-pressed={catFilter === "all"}
                    onClick={() => setCatFilter("all")}
                    className={cx(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                      "border-0",
                      catFilter === "all"
                        ? "bg-white/[0.16] text-white"
                        : "bg-white/[0.07] text-white/75 hover:text-white/92 hover:bg-white/[0.10]",
                      "transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    )}
                  >
                    {allLabel}
                  </button>

                  {(showAllCats ? [...PRIMARY_CATS, ...SECONDARY_CATS] : PRIMARY_CATS).map((c) => {
                    const active = c === catFilter;
                    const label = CAT_LABELS[c][l];

                    return (
                      <button
                        key={c}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-pressed={active}
                        onClick={() => setCatFilter(c)}
                        className={cx(
                          "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                          "border-0",
                          active
                            ? "bg-white/[0.16] text-white"
                            : "bg-white/[0.07] text-white/75 hover:text-white/92 hover:bg-white/[0.10]",
                          "transition",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}

                  {/* Toggle secondary categories */}
                  <button
                    type="button"
                    onClick={() => setShowAllCats((v) => !v)}
                    className={cx(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold",
                      "border-0",
                      "bg-white/[0.07] text-white/80 hover:text-white hover:bg-white/[0.10] transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    )}
                    aria-expanded={showAllCats}
                    aria-label={showAllCats ? lessCatsLabel : moreCatsLabel}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {showAllCats ? lessCatsLabel : moreCatsLabel}
                      <span className={cx("transition", showAllCats ? "rotate-180" : "")}>
                        <Icon name="chev" />
                      </span>
                    </span>
                  </button>
                </div>
              </div>

              {/* results hint */}
              <div className="mt-2 text-[12px] text-white/55">
                {filtered.length === 0
                  ? isRu
                    ? "Ничего не найдено — попробуйте другой запрос."
                    : "No results — try a different query."
                  : isRu
                    ? `Найдено: ${filtered.length}`
                    : `Found: ${filtered.length}`}
              </div>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="mt-7 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => {
            const isOpen = openId === f.id;
            const domId = toDomId(f.id);
            const teaser = TEASER_TEXTS[f.cat][l];

            return (
              <article
                key={f.id}
                className={cx(
                  "group relative overflow-hidden rounded-[20px]",
                  "border-0",
                  "bg-[#1c1c1f] faq-card-bg backdrop-blur-[22px]",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.42)]"
                )}
              >
                <div className="relative z-[2] p-5 flex flex-col">
                  <header className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-semibold text-white/92 leading-snug">
                        {f.q}
                      </h3>
                      <div className="mt-1 text-[12px] text-white/55">
                        {f.catLabel}
                      </div>
                    </div>
                  </header>

                  {/* toggle */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setOpenId((v) => (v === f.id ? null : f.id))}
                      aria-expanded={isOpen}
                      aria-controls={domId}
                      aria-label={isOpen ? btnHide : `${btnShow}: ${f.q}`}
                      className={cx(
                        "w-full flex items-center gap-2 rounded-[12px]",
                        "border-0 bg-white/[0.07] px-3 py-2",
                        "text-left text-[12px] text-white/80 hover:bg-white/[0.10] transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      )}
                    >
                      <img
                        src={LOGO_ICON}
                        alt=""
                        className="h-4 w-4 object-contain"
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                      />
                      {isOpen ? btnHide : btnShow}
                    </button>
                  </div>

                  {/* ANSWER: всегда в DOM для SEO, визуально свёрнут через max-height/opacity */}
                  <div
                    id={domId}
                    className={cx(
                      "mt-3 rounded-[14px] border-0 bg-black/45 px-4 py-3",
                      "text-[13px] leading-relaxed text-white/78",
                      isOpen ? "faq-answer-expanded faq-answer-open" : "faq-answer-collapsed"
                    )}
                    aria-hidden={!isOpen}
                  >
                    {f.a}

                    {/* Copy появляется только когда ответ открыт (логичный сценарий) */}
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => copy(f.a, f.id)}
                        className={cx(
                          "inline-flex items-center gap-2 rounded-[12px]",
                          "border-0 bg-white/[0.07] px-3 py-2",
                          "text-[12px] text-white/80 hover:bg-white/[0.10] transition",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        )}
                      >
                        <span style={s({ color: ORANGE })}>
                          <Icon name="copy" />
                        </span>
                        {copied === f.id ? btnCopied : btnCopy}
                      </button>
                    </div>
                  </div>

                  {/* teaser when closed */}
                  {!isOpen && (
                    <div className="mt-4 pt-3">
                      <div className="h-px w-full rounded-full bg-gradient-to-r from-white/0 via-white/18 to-white/0" />
                      <div className="mt-2 flex items-center justify-between gap-2 text-[11.5px] text-white/62">
                        <span className="line-clamp-2">{teaser}</span>
                        <span className="flex items-center gap-1 whitespace-nowrap" style={s({ color: ORANGE })}>
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                          <span>{popularLabel}</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* pagination: mobile prev/next, desktop dots */}
        <div className="relative mt-10 flex justify-center">
          <div className="w-full max-w-[560px]">
            {/* Mobile: prev/next */}
            <div className="flex items-center justify-between gap-3 sm:hidden">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={cx(
                  "h-11 px-4 rounded-[14px] border-0 bg-white/[0.06]",
                  page <= 1 ? "text-white/35 cursor-not-allowed" : "text-white/80 hover:bg-white/[0.10]",
                  "transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
              >
                {prevLabel}
              </button>

              <div className="text-[12.5px] text-white/70">
                {pageLabel} {page} / {totalPages}
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className={cx(
                  "h-11 px-4 rounded-[14px] border-0 bg-white/[0.06]",
                  page >= totalPages ? "text-white/35 cursor-not-allowed" : "text-white/80 hover:bg-white/[0.10]",
                  "transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                )}
              >
                {nextLabel}
              </button>
            </div>

            {/* Desktop: простые номера страниц без кругов и подчёркиваний */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-6">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                const label = n < 10 ? `0${n}` : String(n);

                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "border-0 bg-transparent p-0 select-none",
                      "text-[14px] font-semibold tabular-nums tracking-tight",
                      "transition-colors duration-200",
                      active ? "text-[#FF9840]" : "text-white/40 hover:text-white/70",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/18 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:rounded-sm"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
