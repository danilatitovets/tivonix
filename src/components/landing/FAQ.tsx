// src/components/landing/FAQ.tsx
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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

const LOGO_ICON = "/images/tivonix-logo-icon.webp";

const PAGE_SIZE = 6;
const ORANGE = "#FF9A3D";

// UX: показываем только топ-категории сразу, остальные — через "Ещё"
const PRIMARY_CATS: Cat[] = ["start", "price", "process", "dev", "support"];
const SECONDARY_CATS: Cat[] = [];

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
    ru: "Можно начать без ТЗ — просто опишите задачу своими словами.",
    en: "You can start without a brief — just describe the task in your own words.",
  },
  price: {
    ru: "Стоимость зависит от задачи — после разбора предложим вариант.",
    en: "Cost depends on the task — after a review we'll suggest an option.",
  },
  time: {
    ru: "Сроки зависят от объёма и согласований.",
    en: "Timeline depends on scope and approvals.",
  },
  process: {
    ru: "Делаем не только сайты — боты, CRM, кабинеты, автоматизацию.",
    en: "We don't only build websites — bots, CRM, client areas, automation.",
  },
  design: {
    ru: "Дизайн под ваш бренд и задачу.",
    en: "Design aligned with your brand and task.",
  },
  dev: {
    ru: "Telegram, email, CRM, таблицы — подключаем под ваш процесс.",
    en: "Telegram, email, CRM, sheets — wired to your workflow.",
  },
  content: {
    ru: "Поможем собрать тексты и структуру, если нужно.",
    en: "We can help with copy and structure if needed.",
  },
  seo: {
    ru: "Базовая SEO-разметка на уровне лендинга.",
    en: "Basic SEO markup at the landing level.",
  },
  tech: {
    ru: "Адаптив, скорость и техчасть проекта.",
    en: "Responsive layout, speed and the tech side.",
  },
  support: {
    ru: "После запуска можно проверить работу и дорастить продукт.",
    en: "After launch we can verify everything and grow the product.",
  },
  fix: {
    ru: "Мелкие правки после запуска — обсуждаем отдельно.",
    en: "Small edits after launch — we discuss them separately.",
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "start-unclear",
    cat: "start",
    q: {
      ru: "С чего начать, если я не понимаю, что именно мне нужно?",
      en: "Where do I start if I'm not sure what I need?",
    },
    a: {
      ru: "Можно просто описать задачу своими словами. Мы разберёмся, что лучше подойдёт: сайт, бот, CRM, личный кабинет или простая автоматизация.",
      en: "Just describe the task in your own words. We'll figure out what fits best: a website, bot, CRM, client area or simple automation.",
    },
  },
  {
    id: "process-not-only-sites",
    cat: "process",
    q: { ru: "Вы делаете только сайты?", en: "Do you only build websites?" },
    a: {
      ru: "Нет. Мы делаем сайты, Telegram-ботов, CRM, админ-панели, личные кабинеты, интеграции и веб-сервисы под конкретную задачу бизнеса.",
      en: "No. We build websites, Telegram bots, CRMs, admin panels, client areas, integrations and web services for a specific business task.",
    },
  },
  {
    id: "start-mvp",
    cat: "start",
    q: { ru: "Можно сделать небольшой проект, а не большую систему?", en: "Can we start small instead of a big system?" },
    a: {
      ru: "Да. Часто лучше начать с простой версии: форма заявки, бот, таблица, мини-CRM или лендинг. Потом это можно развивать.",
      en: "Yes. Often it's better to start simple: a lead form, bot, sheet, mini-CRM or landing page. You can grow it later.",
    },
  },
  {
    id: "price-cost",
    cat: "price",
    q: { ru: "Сколько стоит проект?", en: "How much does a project cost?" },
    a: {
      ru: "Стоимость зависит от задачи, количества экранов, логики, интеграций и сроков. После короткого разбора мы предложим понятный вариант запуска.",
      en: "Cost depends on the task, number of screens, logic, integrations and timeline. After a short review we'll suggest a clear launch option.",
    },
  },
  {
    id: "start-no-brief",
    cat: "start",
    q: { ru: "Нужно ли мне готовое техническое задание?", en: "Do I need a ready technical brief?" },
    a: {
      ru: "Нет. Если ТЗ нет, мы поможем собрать требования и объясним, что нужно сделать на первом этапе.",
      en: "No. If you don't have a brief, we'll help gather requirements and explain what to do at the first stage.",
    },
  },
  {
    id: "dev-integrations",
    cat: "dev",
    q: {
      ru: "Можно подключить Telegram, email, CRM или таблицы?",
      en: "Can you connect Telegram, email, CRM or spreadsheets?",
    },
    a: {
      ru: "Да. Мы можем сделать так, чтобы заявки приходили в Telegram, email, CRM, Google Sheets, Supabase или другую систему, с которой работает команда.",
      en: "Yes. We can route leads to Telegram, email, CRM, Google Sheets, Supabase or another system your team already uses.",
    },
  },
  {
    id: "support-after",
    cat: "support",
    q: { ru: "Вы помогаете после запуска?", en: "Do you help after launch?" },
    a: {
      ru: "Да. После запуска можно проверить работу, исправить мелкие моменты и дальше развивать продукт.",
      en: "Yes. After launch we can verify everything, fix small issues and keep growing the product.",
    },
  },
  {
    id: "start-for-whom",
    cat: "start",
    q: { ru: "Для кого TIVONIX?", en: "Who is TIVONIX for?" },
    a: {
      ru: "Для бизнеса, которому нужен не просто красивый сайт, а рабочая система: заявки, записи, статусы, клиенты, оплата, кабинет или автоматизация.",
      en: "For businesses that need more than a pretty website — a working system: leads, bookings, statuses, clients, payments, client area or automation.",
    },
  },
  {
    id: "time-launch",
    cat: "time",
    q: { ru: "Сколько занимает запуск?", en: "How long does launch take?" },
    a: {
      ru: "Простой лендинг или бот — обычно от нескольких дней до 2–4 недель. Полноценный сервис — дольше. Срок зависит от объёма, интеграций и скорости согласований.",
      en: "A simple landing or bot is usually a few days to 2–4 weeks. A full service takes longer. Timeline depends on scope, integrations and approval speed.",
    },
  },
  {
    id: "start-domain",
    cat: "start",
    q: { ru: "Помогаете с доменом и запуском?", en: "Do you help with domain and launch?" },
    a: {
      ru: "Да. Поможем с доменом, хостингом, деплоем и базовой настройкой — чтобы продукт реально заработал.",
      en: "Yes. We help with domain, hosting, deploy and basic setup — so the product actually goes live.",
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
  const rootRef = useRef<HTMLDivElement | null>(null);

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
  const showPagination = filtered.length > 0 && totalPages > 1;
  const compactResults = filtered.length <= 1;
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

  // JSON-LD: стабильный список для индексации (полный список, не зависит от поиска/категории/пагинации)
  const jsonLd = useMemo(() => buildFaqJsonLd(localizedItems), [localizedItems]);

  return (
    <Section id="faq" className="faq-section relative isolate !py-0 bg-black">
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
          .faq-card-bg{ backdrop-filter: blur(8px) !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-answer-open{ animation: none; }
          .faq-answer-collapsed, .faq-answer-expanded{ transition: none; }
        }
      `}</style>

      {/* JSON-LD FAQ schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Container className="faq-section__content relative z-[1] pt-16 sm:pt-20 pb-16 sm:pb-20">
        {/* header */}
        <div ref={rootRef} className="relative mx-auto max-w-2xl text-center">
          <h2 className="mt-5 font-display text-[30px] leading-[34px] sm:text-[40px] sm:leading-[44px] font-extrabold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
            {title}
          </h2>

          {/* search + reset */}
          <div className="mt-6">
            <div className="mx-auto max-w-[720px]">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 sm:gap-3">
                <div className="faq-search-wrap relative">
                  <label className="sr-only" htmlFor="faq-search">
                    {placeholder}
                  </label>

                  <div className="pointer-events-none absolute left-3 top-1/2 z-[2] -translate-y-1/2">
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
                    className="faq-search-input"
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
                    "h-11 shrink-0 whitespace-nowrap px-3.5 sm:h-12 sm:px-4 rounded-full border-0",
                    "bg-[#1c1c1f]",
                    resetDisabled
                      ? "text-white/35 cursor-not-allowed opacity-70"
                      : "text-white/80 hover:text-white hover:bg-[#262626] transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
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
                      "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-xs font-medium transition",
                      catFilter === "all"
                        ? "bg-[#3a3a3d] text-white"
                        : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
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
                          "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-xs font-medium transition",
                          active
                            ? "bg-[#3a3a3d] text-white"
                            : "bg-[#1c1c1f] text-white/78 hover:bg-[#262626] hover:text-white/92",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
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
                      "shrink-0 rounded-full border-0 px-3.5 py-1.5 text-xs font-semibold transition",
                      "bg-[#1c1c1f] text-white/80 hover:bg-[#262626] hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
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
              <div className="mt-2 text-[12px] text-white/68">
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
        <div
          className={cx(
            "mt-7 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            compactResults && "min-h-[18rem] sm:min-h-[20rem]"
          )}
        >
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
                  "bg-[#1c1c1f] faq-card-bg backdrop-blur-[10px]",
                  "shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                )}
                style={{ contentVisibility: "auto", containIntrinsicSize: "360px 320px", contain: "layout paint style" } as CSSProperties}
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
        {showPagination ? (
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
        ) : (
          <div className="mt-10 sm:mt-12" aria-hidden="true" />
        )}
      </Container>
    </Section>
  );
}
