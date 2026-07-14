import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/landing/Header";
import { SEO } from "../components/SEO";
import { PARTNER_AGENCY_TELEGRAM_URL, TG_CHANNEL_URL } from "../constants/links";
import { useLang } from "../i18n/LangProvider";
import { getPartnersCopy, PARTNERS_DOCS, type PartnersCopy } from "../i18n/partnersPageCopy";
import {
  PARTNERS_PATH_EN,
  PARTNERS_PATH_RU,
  partnersCanonicalUrl,
  partnersHreflangUrl,
  partnersPath,
} from "../i18n/partnersPaths";
import { trackPartnersEvent } from "../lib/ads";
import { LANDING_SHELL_CLASS } from "../lib/landingLayout";
import {
  PARTNERS_VIDEO_AVAILABLE,
  PARTNERS_VIDEO_POSTER,
  PARTNERS_VIDEO_SRC,
  partnerPanelLoginUrl,
  partnerPanelRegisterUrl,
} from "../lib/partnerPanel";

/** Gmail compose — как в Footer/Contacts (mailto перехватывается ads-трекингом) */
const PARTNERS_GMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent("tivoonix@gmail.com")}` +
  `&su=${encodeURIComponent("TIVONIX Partners — обсуждение сотрудничества")}`;

const TIVONIX_MARK = "/images/tivonix-logo-icon.webp";
const PARTNERS_EASY_BG = `/images/${encodeURI("как рабоает/пп/4.webp")}`;
const PARTNERS_REF_BG = `/images/partners/${encodeURIComponent("зеленая.png")}`;
const PARTNERS_WL_BG = `/images/partners/${encodeURIComponent("оранж.png")}`;

const CASES = [
  {
    id: "spliton",
    title: "Spliton",
    tags: ["Fintech", "Marketplace", "Payments"],
    cover: "/images/project-priew/spliton.webp",
  },
  {
    id: "slotty",
    title: "Slotty",
    tags: ["Booking", "SaaS", "Telegram"],
    cover: "/images/project-priew/slotty.webp",
  },
  {
    id: "giftsniper",
    title: "GiftSniper",
    tags: ["Telegram Bot", "TON", "Analytics"],
    cover: "/images/project-priew/giftsniper.webp",
  },
] as const;

const CAPABILITY_IDS = ["landing", "bot", "crm", "cabinet", "integrations", "support"] as const;

function buildPartnersSchema(copy: PartnersCopy, lang: "ru" | "en", pathname?: string) {
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
        inLanguage: lang,
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: copy.seo.serviceName,
        description: copy.seo.description,
        provider: {
          "@type": "Organization",
          name: "TIVONIX",
          url: "https://tivonix.tech/",
        },
        areaServed: "Worldwide",
        serviceType: "Partner software development — Referral and White-label",
        url,
      },
    ],
  };
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Shell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx(LANDING_SHELL_CLASS, className)}>{children}</div>
  );
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={ref}
      className={cx(
        className,
        visible
          ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
          : "translate-y-3 opacity-0"
      )}
    >
      {children}
    </div>
  );
}

function DarkPill({
  children,
  href = PARTNER_AGENCY_TELEGRAM_URL,
  sameTab = false,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  /** Same-tab navigation (panel register/login). */
  sameTab?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      {...(sameTab ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      onClick={onClick}
      className="inline-flex min-h-[2.75rem] items-center justify-center rounded-partners-btn bg-partners-ink px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-cream no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partners-ink"
    >
      {children}
    </a>
  );
}

const pillClass =
  "inline-flex min-h-[2.75rem] items-center justify-center rounded-partners-btn bg-partners-sand px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-ink no-underline transition hover:bg-partners-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partners-ink";

function SandPill({
  children,
  href,
  sameTab = false,
  onClick,
}: {
  children: ReactNode;
  href: string;
  sameTab?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const external = href.startsWith("http") || href.startsWith("tg:");
  if (external) {
    return (
      <a
        href={href}
        {...(sameTab ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        onClick={onClick}
        className={pillClass}
      >
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} onClick={onClick} className={pillClass}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={pillClass}>
      {children}
    </Link>
  );
}

function CapsMiniVisual({ id }: { id: (typeof CAPABILITY_IDS)[number] }) {
  if (id === "landing") {
    return (
      <div className="partners-caps__viz partners-caps__viz--landing" aria-hidden>
        <div className="partners-caps__browser">
          <div className="partners-caps__chrome">
            <span />
            <span />
            <span />
            <span className="partners-caps__url">tivonix.tech/lead</span>
          </div>
          <div className="partners-caps__page">
            <span className="partners-caps__nav">
              <i />
              <i />
              <i />
            </span>
            <span className="partners-caps__hero-bar" />
            <span className="partners-caps__hero-bar partners-caps__hero-bar--s" />
            <span className="partners-caps__cta-row">
              <span className="partners-caps__cta">Старт</span>
              <span className="partners-caps__cta partners-caps__cta--ghost">Ещё</span>
            </span>
            <div className="partners-caps__form">
              <span className="partners-caps__field-label">Имя</span>
              <span className="partners-caps__input">
                <span className="partners-caps__typed">Анна</span>
                <span className="partners-caps__caret" />
              </span>
              <span className="partners-caps__field-label">Телефон</span>
              <span className="partners-caps__input partners-caps__input--phone">+7 ···</span>
            </div>
            <span className="partners-caps__tg-chip">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M21.5 3.6 2.9 11.1c-1.3.5-1.3 1.3-.2 1.6l4.7 1.5 1.8 5.5c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.9L22.9 5c.3-1.2-.4-1.8-1.4-1.4ZM9.2 14.5l-.3 3.3 1.3-1.7 8-7.6-9 5.9Z" />
              </svg>
              В Telegram
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "bot") {
    return (
      <div className="partners-caps__viz partners-caps__viz--bot" aria-hidden>
        <div className="partners-caps__phone">
          <div className="partners-caps__phone-head">
            <span className="partners-caps__phone-avatar" />
            <div className="partners-caps__phone-meta">
              <span className="partners-caps__phone-name">TIVONIX Bot</span>
              <span className="partners-caps__phone-status">online</span>
            </div>
          </div>
          <div className="partners-caps__chat">
            <span className="partners-caps__msg partners-caps__msg--in partners-caps__msg--a">Привет! Опишите задачу</span>
            <span className="partners-caps__msg partners-caps__msg--out partners-caps__msg--b">Нужен сайт + CRM</span>
            <span className="partners-caps__msg partners-caps__msg--in partners-caps__msg--c">Ок. Срок и бюджет?</span>
            <span className="partners-caps__msg partners-caps__msg--out partners-caps__msg--d">2 недели</span>
            <span className="partners-caps__msg partners-caps__msg--in partners-caps__msg--typing">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="partners-caps__compose">
            <span>Сообщение…</span>
            <span className="partners-caps__send" />
          </div>
        </div>
      </div>
    );
  }

  if (id === "crm") {
    return (
      <div className="partners-caps__viz partners-caps__viz--crm" aria-hidden>
        <div className="partners-caps__board">
          <div className="partners-caps__col">
            <span className="partners-caps__col-h">
              <i className="is-orange" /> Новые
            </span>
            <span className="partners-caps__ticket partners-caps__ticket--1">
              <b>Лендинг</b>
              <em>сегодня</em>
            </span>
            <span className="partners-caps__ticket partners-caps__ticket--move">
              <b>Квиз</b>
              <em>сейчас</em>
            </span>
          </div>
          <div className="partners-caps__col">
            <span className="partners-caps__col-h">
              <i className="is-blue" /> В работе
            </span>
            <span className="partners-caps__ticket partners-caps__ticket--2">
              <b>CRM</b>
              <em>Аня</em>
            </span>
            <span className="partners-caps__progress">
              <i />
            </span>
          </div>
          <div className="partners-caps__col">
            <span className="partners-caps__col-h">
              <i className="is-green" /> Готово
            </span>
            <span className="partners-caps__ticket partners-caps__ticket--3">
              <b>Кабинет</b>
              <em>оплачен</em>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "cabinet") {
    return (
      <div className="partners-caps__viz partners-caps__viz--cabinet" aria-hidden>
        <div className="partners-caps__app">
          <aside className="partners-caps__side">
            <span />
            <span className="is-active" />
            <span />
            <span />
          </aside>
          <div className="partners-caps__main">
            <div className="partners-caps__toolbar">
              <span className="partners-caps__search">поиск…</span>
              <span className="partners-caps__user-chip" />
            </div>
            <div className="partners-caps__cards">
              <span className="partners-caps__dash">
                <b>12</b>
                <em>лида</em>
              </span>
              <span className="partners-caps__dash partners-caps__dash--b">
                <b>$4.2k</b>
                <em>оплаты</em>
              </span>
            </div>
            <div className="partners-caps__rows">
              <span className="partners-caps__row is-live">
                <i /> Spliton · в работе
              </span>
              <span className="partners-caps__row">
                <i /> Slotty · оценка
              </span>
            </div>
            <span className="partners-caps__pay">Подписка · активна</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "integrations") {
    return (
      <div className="partners-caps__viz partners-caps__viz--integrations" aria-hidden>
        <div className="partners-caps__net">
          <svg className="partners-caps__net-svg" viewBox="0 0 300 220" width="300" height="220" fill="none">
            <line className="partners-caps__link" x1="150" y1="110" x2="150" y2="42" />
            <line className="partners-caps__link" x1="150" y1="110" x2="248" y2="110" />
            <line className="partners-caps__link" x1="150" y1="110" x2="150" y2="178" />
            <line className="partners-caps__link" x1="150" y1="110" x2="52" y2="110" />
            <circle className="partners-caps__packet partners-caps__packet--1" r="3.5" cx="150" cy="110" />
            <circle className="partners-caps__packet partners-caps__packet--2" r="3.5" cx="150" cy="110" />
            <circle className="partners-caps__packet partners-caps__packet--3" r="3.5" cx="150" cy="110" />
            <circle className="partners-caps__packet partners-caps__packet--4" r="3.5" cx="150" cy="110" />
          </svg>

          <div className="partners-caps__inode partners-caps__inode--crm">
            <span className="partners-caps__inode-h">
              <i className="is-crm" /> CRM
            </span>
            <span className="partners-caps__inode-row">
              <b>Анна · лендинг</b>
              <em className="is-new">новый</em>
            </span>
            <span className="partners-caps__inode-meta">сделка · сегодня</span>
          </div>

          <div className="partners-caps__inode partners-caps__inode--pay">
            <span className="partners-caps__inode-h">
              <i className="is-pay" /> Оплата
            </span>
            <span className="partners-caps__inode-sum">₽ 4 900</span>
            <span className="partners-caps__inode-card">
              <span className="partners-caps__inode-chip" />
              ···· 4242
            </span>
            <span className="partners-caps__inode-ok">✓ Оплачено</span>
          </div>

          <span className="partners-caps__hub-core">TX</span>

          <div className="partners-caps__inode partners-caps__inode--tg">
            <span className="partners-caps__inode-h">
              <i className="is-tg" /> Telegram
            </span>
            <span className="partners-caps__inode-bubble">Новая оплата + лид</span>
            <span className="partners-caps__inode-meta">сейчас · бот</span>
          </div>

          <div className="partners-caps__inode partners-caps__inode--tbl">
            <span className="partners-caps__inode-h">
              <i className="is-tbl" /> Таблица
            </span>
            <span className="partners-caps__inode-sheet">
              <span>
                <b>row</b>
                <b>status</b>
              </span>
              <span>
                <em>A12</em>
                <em className="is-ok">ok</em>
              </span>
              <span>
                <em>A13</em>
                <em className="is-sync">sync</em>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="partners-caps__viz partners-caps__viz--support" aria-hidden>
      <div className="partners-caps__support">
        <div className="partners-caps__check-list">
          <span className="partners-caps__check is-on">
            <i>✓</i> Фикс бага
          </span>
          <span className="partners-caps__check is-on partners-caps__check--2">
            <i>✓</i> Новый модуль
          </span>
          <span className="partners-caps__check partners-caps__check--3">
            <i>○</i> Сопровождение
          </span>
          <span className="partners-caps__check partners-caps__check--4">
            <i>○</i> Релиз v1.2
          </span>
        </div>
        <div className="partners-caps__support-side">
          <span className="partners-caps__support-ring" />
          <span className="partners-caps__support-label">24/7</span>
        </div>
      </div>
    </div>
  );
}

const CAPS_EXPAND_SHARE = 0.14;

function CapabilitiesBanner() {
  const { lang } = useLang();
  const copy = getPartnersCopy(lang);
  const capabilities = CAPABILITY_IDS.map((id, index) => ({ id, title: copy.capabilities.titles[index] }));
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const walkerRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);
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

      // Expand → hold full → shrink on the way out
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

  const scrollToSlide = (i: number) => {
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
    const slideMid = midStart + ((i + 0.5) / total) * (midEnd - midStart);
    const top = pin.getBoundingClientRect().top + window.scrollY + travel * slideMid;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const card = (
    <div className="partners-caps relative overflow-visible rounded-[22px] bg-partners-white px-5 pb-24 pt-6 sm:px-8 sm:pb-28 sm:pt-8">
      <div className="flex flex-col items-center text-center">
        <div className="mx-auto flex w-full max-w-[440px] justify-center" key={`viz-${active.id}-${cycle}`}>
          <CapsMiniVisual id={active.id} />
        </div>

        <h3
          key={`title-${active.id}-${cycle}`}
          className="mt-5 font-partners-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-tight tracking-[-0.025em] text-partners-charcoal"
        >
          {active.title}
        </h3>

        <nav
          className="mt-4 inline-flex items-center gap-0.5 rounded-full bg-[#141414] p-1"
          role="tablist"
          aria-label={copy.capabilities.heading}
        >
          {capabilities.map((item, i) => {
            const on = i === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={item.title}
                onClick={() => scrollToSlide(i)}
                className={cx(
                  "relative flex h-8 min-w-[2.4rem] items-center justify-center rounded-full border-0 px-2.5",
                  "font-partners text-[11px] font-bold tabular-nums tracking-[0.08em] outline-none select-none transition duration-200",
                  "focus-visible:ring-2 focus-visible:ring-[#ff6b2c]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  on
                    ? "bg-[#2c2c2c] text-white"
                    : "bg-transparent text-white/50 hover:bg-white/[0.04] hover:text-white/85"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="partners-caps__track" aria-hidden>
        <span ref={walkerRef} className="partners-caps__track-walker">
          <svg viewBox="0 0 64 76" width="52" height="62" fill="none">
            <g className="partners-caps__arm partners-caps__arm--back">
              <path
                d="M18 24c-7 2.5-11 10-10.5 17"
                stroke="#1a1a1a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g className="partners-caps__walker-body">
              <rect x="14" y="8" width="36" height="36" rx="10" fill="#1a1a1a" />
              <circle cx="36" cy="20" r="2.6" fill="#ff6b2c" />
              <circle cx="44" cy="20" r="2.6" fill="#ff6b2c" />
              <path
                d="M35.5 28c2.2 2.6 6.4 2.6 8.6 0"
                stroke="#ff6b2c"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
            <g className="partners-caps__arm partners-caps__arm--front">
              <path
                d="M50 24c7 2.5 11 10 10.5 17"
                stroke="#1a1a1a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
            <g className="partners-caps__leg partners-caps__leg--l">
              <path d="M26 44v16" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round" />
              <ellipse cx="29" cy="63" rx="6.2" ry="3.8" fill="#ff6b2c" />
            </g>
            <g className="partners-caps__leg partners-caps__leg--r">
              <path d="M38 44v16" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round" />
              <ellipse cx="41" cy="63" rx="6.2" ry="3.8" fill="#ff6b2c" />
            </g>
          </svg>
        </span>
      </div>
    </div>
  );

  if (reduced) {
    return (
      <div className="partners-caps-scene partners-caps-scene--static">
        <div className="mx-auto mb-10 max-w-[36rem] text-center">
          <h2
            id="partners-caps"
            className="font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-partners-ink text-balance"
          >
            {copy.capabilities.h2Before}{" "}
            <span className="mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#ff6b2c] px-3 py-1 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle">
              {copy.capabilities.h2Pill}
            </span>{" "}
            {copy.capabilities.h2After}
          </h2>
        </div>
        {card}
      </div>
    );
  }

  return (
    <div
      ref={pinRef}
      className="partners-caps-pin"
      style={{ height: `${100 + total * 72}vh` }}
    >
      <div className="partners-caps-sticky">
        <div ref={stageRef} className="partners-caps-stage" style={{ ["--caps-expand" as string]: 0 }}>
          <div className="mx-auto mb-3 max-w-[34rem] px-5 text-center sm:mb-4 sm:px-8">
            <h2
              id="partners-caps"
              className="font-partners-display text-[clamp(1.35rem,3vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.02em] text-partners-ink text-balance"
            >
              {copy.capabilities.h2Before}{" "}
              <span className="mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#ff6b2c] px-2.5 py-0.5 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle">
                {copy.capabilities.h2Pill}
              </span>{" "}
              {copy.capabilities.h2After}
            </h2>
          </div>
          {card}
        </div>
      </div>
    </div>
  );
}

function DiscussPanel() {
  const { lang } = useLang();
  const copy = getPartnersCopy(lang);
  return (
    <div className="partners-bento__discuss">
      <p className="partners-bento__discuss-label">{copy.discuss.label}</p>
      <div className="partners-bento__discuss-btns">
        <a
          href={PARTNER_AGENCY_TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="partners-bento__discuss-btn partners-bento__discuss-btn--tg"
          aria-label={copy.discuss.ask}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21.5 3.6 2.9 11.1c-1.3.5-1.3 1.3-.2 1.6l4.7 1.5 1.8 5.5c.2.7.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.9L22.9 5c.3-1.2-.4-1.8-1.4-1.4ZM9.2 14.5l-.3 3.3 1.3-1.7 8-7.6-9 5.9Z" />
          </svg>
          Telegram
        </a>
        <a
          href={PARTNERS_GMAIL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="partners-bento__discuss-btn partners-bento__discuss-btn--mail"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="m4.5 7.5 7.5 5.2L19.5 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Gmail
        </a>
      </div>
    </div>
  );
}

/** Quick-start: Family «Backing Up» green pill */
function BentoEstimateUi({ pill }: { pill: string }) {
  return (
    <div className="partners-bento__secure" aria-hidden>
      <div className="partners-bento__secure-pill">
        <span className="partners-bento__secure-check">✓</span>
        <span>{pill}</span>
      </div>
    </div>
  );
}

/** Referral: colorful icon row + commission chip */
function BentoReferralUi() {
  const { lang } = useLang();
  const chip = lang === "ru" ? "после оплаты" : "after payment";
  return (
    <div className="partners-bento__fun" aria-hidden>
      <div className="partners-bento__fun-row">
        <span className="partners-bento__orb partners-bento__orb--o" style={{ background: "#ff8a4c" }}>✉</span>
        <span className="partners-bento__orb partners-bento__orb--mid" style={{ background: "#0086fc" }}>🤝</span>
        <span className="partners-bento__orb" style={{ background: "#00ca48" }}>$</span>
        <span className="partners-bento__orb" style={{ background: "#ff58ae" }}>◎</span>
      </div>
      <span className="partners-bento__fun-chip">{chip}</span>
    </div>
  );
}

/** White-label: light «Powerful» meter card */
function BentoWhiteLabelUi() {
  const { lang } = useLang();
  const label = lang === "ru" ? "Ваш бренд" : "Your brand";
  const sub = lang === "ru" ? "~ наценка ваша" : "~ your markup";
  return (
    <div className="partners-bento__power" aria-hidden>
      <div className="partners-bento__power-card">
        <span className="partners-bento__power-i">i</span>
        <div className="partners-bento__power-copy">
          <strong>{label}</strong>
          <em>{sub}</em>
        </div>
        <span className="partners-bento__power-meter" aria-hidden>
          <i className="is-blue" />
          <i className="is-amber" />
          <i className="is-fire">🔥</i>
        </span>
      </div>
    </div>
  );
}

/** Контакт → TIVONIX: передача клиента */

function ExampleMoneyFlow() {
  const { lang } = useLang();
  const ui = getPartnersCopy(lang).ui;
  return (
    <div className="partners-money" aria-hidden>
      <div className="partners-money__zoom">
        <div className="partners-money__track">
          <div className="partners-money__node partners-money__node--client" data-step="1">
            <span className="partners-money__label">{ui.client}</span>
            <span className="partners-money__sum">−$2200</span>
          </div>

          <div className="partners-money__rail partners-money__rail--1">
            <span className="partners-money__dot partners-money__dot--1">$</span>
          </div>

          <div className="partners-money__node partners-money__node--you" data-step="2">
            <span className="partners-money__label">{ui.you}</span>
            <span className="partners-money__sum partners-money__sum--keep">+$700</span>
          </div>

          <div className="partners-money__rail partners-money__rail--2">
            <span className="partners-money__dot partners-money__dot--2">$</span>
          </div>

          <div className="partners-money__node partners-money__node--tvx" data-step="3">
            <span className="partners-money__label">TIVONIX</span>
            <span className="partners-money__sum partners-money__sum--tvx">$1500</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelExampleReferral() {
  const { lang } = useLang();
  const ui = getPartnersCopy(lang).ui;
  return (
    <div className="partners-ex partners-ex--ref" aria-hidden>
      <div className="partners-ex__flow">
        <div className="partners-ex__step partners-ex__step--1">
          <span className="partners-ex__who">{ui.client}</span>
          <strong className="partners-ex__sum">$2500</strong>
        </div>
        <span className="partners-ex__arrow partners-ex__arrow--a" />
        <div className="partners-ex__step partners-ex__step--2">
          <span className="partners-ex__who">{ui.youPct}</span>
          <strong className="partners-ex__sum partners-ex__sum--you">+$375</strong>
        </div>
        <span className="partners-ex__arrow partners-ex__arrow--b" />
        <div className="partners-ex__step partners-ex__step--3">
          <span className="partners-ex__who">TIVONIX</span>
          <strong className="partners-ex__sum">$2125</strong>
        </div>
      </div>
      <div className="partners-ex__bar">
        <i className="partners-ex__fill" />
      </div>
    </div>
  );
}

function ModelExampleWhiteLabel() {
  const { lang } = useLang();
  const ui = getPartnersCopy(lang).ui;
  return (
    <div className="partners-ex partners-ex--wl" aria-hidden>
      <div className="partners-ex__stack">
        <div className="partners-ex__card partners-ex__card--tvx">
          <span>{ui.estimate}</span>
          <strong>$1500</strong>
        </div>
        <div className="partners-ex__card partners-ex__card--you">
          <span>{ui.markup}</span>
          <strong>+$700</strong>
        </div>
        <div className="partners-ex__card partners-ex__card--client">
          <span>{ui.clientPrice}</span>
          <strong>$2200</strong>
        </div>
      </div>
    </div>
  );
}

function PartnersFooterRunner() {
  return (
    <svg viewBox="0 0 64 76" width="48" height="58" fill="none" aria-hidden>
      {/* Rear arm — holds the pill rope */}
      <g className="partners-footer__arm partners-footer__arm--back">
        <path
          d="M18 28H2"
          stroke="#1a1a1a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="2" cy="28" r="3.2" fill="#ff6b2c" />
      </g>
      <g className="partners-footer__body">
        <rect x="14" y="8" width="36" height="36" rx="10" fill="#1a1a1a" />
        <circle cx="36" cy="20" r="2.6" fill="#ff6b2c" />
        <circle cx="44" cy="20" r="2.6" fill="#ff6b2c" />
        <path
          d="M35.5 28c2.2 2.6 6.4 2.6 8.6 0"
          stroke="#ff6b2c"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      <g className="partners-footer__arm partners-footer__arm--front">
        <path
          d="M50 24c7 2.5 11 10 10.5 17"
          stroke="#1a1a1a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g className="partners-footer__leg partners-footer__leg--l">
        <path d="M26 44v16" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="29" cy="63" rx="6.2" ry="3.8" fill="#ff6b2c" />
      </g>
      <g className="partners-footer__leg partners-footer__leg--r">
        <path d="M38 44v16" stroke="#1a1a1a" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="41" cy="63" rx="6.2" ry="3.8" fill="#ff6b2c" />
      </g>
    </svg>
  );
}

function PartnersFooter() {
  const { lang } = useLang();
  const copy = getPartnersCopy(lang);
  const line = copy.footer.marquee;
  const docs = PARTNERS_DOCS[lang];
  const loginUrl = partnerPanelLoginUrl();

  return (
    <footer id="site-footer" className="partners-footer">
      <div className="partners-footer__scene" aria-hidden>
        <div className="partners-footer__tow">
          <div className="partners-footer__pill">
            <span className="partners-footer__phrase">{line}</span>
          </div>
          <span className="partners-footer__rope" />
          <div className="partners-footer__runner">
            <PartnersFooterRunner />
          </div>
        </div>
      </div>

      <Shell className="partners-footer__shell">
        <div className="partners-footer__bar">
          <Link to="/" className="partners-footer__logo" aria-label={copy.footer.homeAria}>
            <img src={TIVONIX_MARK} alt="" width={28} height={28} decoding="async" />
            <span>TIVONIX Partners</span>
          </Link>
          <nav className="partners-footer__nav" aria-label={copy.footer.navAria}>
            <a href="#partner-formats">{copy.footer.formats}</a>
            <a
              href={loginUrl}
              onClick={() => trackPartnersEvent("partners_login_click", { source: "footer" })}
            >
              {copy.footer.login}
            </a>
            <Link to="/projects">{copy.footer.projects}</Link>
            <Link to="/contacts">{copy.footer.contacts}</Link>
            <a
              href={PARTNER_AGENCY_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.footer.askTelegram}
            </a>
            <a href={TG_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              {copy.footer.channel}
            </a>
            <a href={docs.privacy} target="_blank" rel="noopener noreferrer" aria-label={copy.footer.privacyAria}>
              {copy.footer.privacy}
            </a>
            <a href={docs.consent} target="_blank" rel="noopener noreferrer" aria-label={copy.footer.consentAria}>
              {copy.footer.consent}
            </a>
          </nav>
        </div>
        <p className="partners-footer__note">
          {copy.footer.note}
        </p>
      </Shell>
    </footer>
  );
}

/** Process block — two partners (orange + gray) shake hands */
function PartnersProcessVisual() {
  return (
    <svg
      className="partners-process__svg"
      viewBox="0 0 440 380"
      width="440"
      height="380"
      fill="none"
      aria-hidden
    >
      {/* Flat backdrop discs — no shadow */}
      <circle cx="148" cy="206" r="92" fill="#ffe8dc" />
      <circle cx="302" cy="214" r="86" fill="#ece9e5" />

      {/* Characters — bodies first */}
      <g className="partners-process__you">
        <path
          d="M74 150c16-26 58-34 84-18 14 9 20 26 17 42-4 26-22 54-50 62-32 8-60-8-68-34-6-18 2-34 17-52Z"
          fill="#ff6b2c"
        />
        <circle cx="116" cy="168" r="3.4" fill="#1a1a1a" />
        <circle cx="136" cy="166" r="3.4" fill="#1a1a1a" />
        <circle cx="117.2" cy="166.8" r="1" fill="#fff" />
        <circle cx="137.2" cy="164.8" r="1" fill="#fff" />
        <path d="M120 178c4.5 5.5 13 5.5 17.5 0" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M108 248v40" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M132 250v38" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <rect x="95" y="284" width="26" height="13" rx="6.5" fill="#1a1a1a" />
        <rect x="95" y="293" width="26" height="5" rx="2.5" fill="#ff6b2c" />
        <rect x="121" y="284" width="26" height="13" rx="6.5" fill="#1a1a1a" />
        <rect x="121" y="293" width="26" height="5" rx="2.5" fill="#ff6b2c" />
        {/* free waving arm */}
        <g className="partners-process__wave">
          <path d="M86 208 C62 198 52 172 64 154" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
          <ellipse cx="66" cy="152" rx="9" ry="7.5" fill="#1a1a1a" />
        </g>
      </g>

      <g className="partners-process__tiv">
        <rect x="270" y="146" width="98" height="98" rx="26" fill="#2a2a2a" />
        <rect x="282" y="158" width="18" height="6" rx="3" fill="#3d3d3d" />
        <circle cx="302" cy="184" r="3.4" fill="#ff6b2c" />
        <circle cx="326" cy="184" r="3.4" fill="#ff6b2c" />
        <circle cx="303.2" cy="182.8" r="1" fill="#fff" opacity="0.7" />
        <circle cx="327.2" cy="182.8" r="1" fill="#fff" opacity="0.7" />
        <path d="M306 198c5 6 14 6 20 0" stroke="#ff6b2c" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M296 244v40" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M332 244v40" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <rect x="283" y="280" width="26" height="13" rx="6.5" fill="#1a1a1a" />
        <rect x="283" y="289" width="26" height="5" rx="2.5" fill="#ff6b2c" />
        <rect x="321" y="280" width="26" height="13" rx="6.5" fill="#1a1a1a" />
        <rect x="321" y="289" width="26" height="5" rx="2.5" fill="#ff6b2c" />
        <path d="M360 196 C382 208 390 232 378 254" stroke="#1a1a1a" strokeWidth="5.5" strokeLinecap="round" />
        <ellipse cx="376" cy="256" rx="9" ry="7.5" fill="#1a1a1a" />
      </g>

      {/* Handshake */}
      <g className="partners-process__shake">
        <circle className="partners-process__burst" cx="220" cy="232" r="34" fill="#ff6b2c" opacity="0.12" />
        <circle className="partners-process__burst partners-process__burst--2" cx="220" cy="232" r="22" fill="#ff6b2c" opacity="0.16" />
        <path d="M148 206 C168 214 186 222 200 230" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
        <path d="M290 206 C270 214 252 222 238 230" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
        <g className="partners-process__clasp">
          <ellipse cx="214" cy="234" rx="16" ry="12" fill="#1a1a1a" transform="rotate(-18 214 234)" />
          <ellipse cx="226" cy="234" rx="16" ry="12" fill="#2a2a2a" transform="rotate(18 226 234)" />
          <ellipse cx="220" cy="232" rx="10" ry="8" fill="#1a1a1a" />
          <path d="M208 228c4-3 10-3 14 0" stroke="#ff6b2c" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

export default function PartnersPage() {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const copy = getPartnersCopy(lang);
  const canonicalUrl = partnersCanonicalUrl(lang, location.pathname);
  const loginUrl = partnerPanelLoginUrl();
  const referralRegisterUrl = partnerPanelRegisterUrl("referral");
  const whiteLabelRegisterUrl = partnerPanelRegisterUrl("white_label");
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const easyCardRef = useRef<HTMLElement>(null);
  const easyBgRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const moneyRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLElement>(null);
  const finalZoomRef = useRef<HTMLDivElement>(null);
  const modelsExamplesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useRef(false);

  const scrollToFormats = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackPartnersEvent("partners_hero_cta_click");
    const el = document.getElementById("partner-formats");
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion.current ? "auto" : "smooth",
      block: "start",
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
        roles.querySelectorAll<HTMLElement>(".partners-role-zoom").forEach((img) => {
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
        easy.querySelectorAll<HTMLElement>(".partners-bento__menu-row").forEach((row, i) => {
          const local = Math.min(1, Math.max(0, (progress - i * 0.14) / 0.42));
          row.style.transform = `translateY(${(1 - local) * 18}px)`;
          row.style.opacity = String(0.28 + local * 0.72);
        });
      }

      const bento = bentoRef.current;
      if (bento) {
        const vh = window.innerHeight || 1;
        bento.querySelectorAll<HTMLElement>("[data-bento-zoom]").forEach((el) => {
          const card = el.closest(".partners-bento__card") as HTMLElement | null;
          const target = card ?? el;
          const rect = target.getBoundingClientRect();
          const start = vh * 0.92;
          const end = vh * 0.22;
          const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          const amount = Number(el.dataset.bentoZoom) || 0.16;
          el.style.transform = `scale(${1 + progress * amount})`;
        });

        const timeline = bento.querySelector<HTMLElement>(".partners-bento__timeline");
        if (timeline) {
          const card = timeline.closest(".partners-bento__card") as HTMLElement | null;
          const rect = (card ?? timeline).getBoundingClientRect();
          const start = vh * 0.88;
          const end = vh * 0.28;
          const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          const stage = Math.min(2, Math.floor(progress * 3.25));
          timeline.querySelectorAll<HTMLElement>(".partners-bento__step").forEach((step, i) => {
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
        const zoom = money.querySelector<HTMLElement>(".partners-money__zoom");
        if (zoom) zoom.style.transform = `scale(${1 + progress * 0.18})`;
      }

      const modelsEx = modelsExamplesRef.current;
      if (modelsEx) {
        const vh = window.innerHeight || 1;
        modelsEx.querySelectorAll<HTMLElement>(".partners-models-split__zoom").forEach((el) => {
          const card = el.closest(".partners-models-split__card") as HTMLElement | null;
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

  return (
    <div className="min-h-screen overflow-x-clip bg-partners-cream font-partners text-partners-charcoal antialiased">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
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
        `}</style>
      </Helmet>
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath={canonicalUrl}
        ogLocalePrimary={lang === "ru" ? "ru_RU" : "en_US"}
        schemaJsonLd={buildPartnersSchema(copy, lang, location.pathname)}
      />
      <Helmet>
        <link rel="alternate" hrefLang="ru" href={partnersHreflangUrl(PARTNERS_PATH_RU)} />
        <link rel="alternate" hrefLang="en" href={partnersHreflangUrl(PARTNERS_PATH_EN)} />
        <link rel="alternate" hrefLang="x-default" href={partnersHreflangUrl("/partners")} />
      </Helmet>
      <Header />

      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative flex flex-col overflow-hidden bg-partners-cream pb-4 pt-[calc(var(--tivonix-header-spacer)+1.25rem)] sm:min-h-[min(82vh,780px)] sm:pb-28 sm:pt-[calc(var(--tivonix-header-spacer)+2rem)]"
          aria-labelledby="partners-hero-title"
        >
          {/* Desktop: full-bleed, empty center for copy, art left + right */}
          <div
            ref={bgRef}
            className="pointer-events-none absolute inset-0 hidden origin-center will-change-transform sm:block"
            aria-hidden
          >
            <img
              src="/images/partners/fon-hero.png"
              alt=""
              className="partners-hero__img !h-full !max-w-none h-full w-full scale-105 object-cover object-center"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <Shell className="relative z-[2] flex flex-1 flex-col justify-center">
            <div className="mx-auto max-w-[40rem] text-center">
              <div className="mb-5 flex justify-center">
                <div className="inline-flex rounded-full bg-[#ff6b2c] p-1 text-[12px] font-semibold tracking-[0.08em] text-white shadow-sm">
                  {(["ru", "en"] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        setLang(value);
                        navigate(partnersPath(value), { replace: true });
                      }}
                      className={cx(
                        "rounded-full px-3 py-1.5 transition",
                        lang === value ? "bg-white text-[#ff6b2c]" : "text-white hover:bg-white/15"
                      )}
                      aria-pressed={lang === value}
                    >
                      {value.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <h1
                id="partners-hero-title"
                className="font-partners-display text-[1.5rem] font-medium leading-[1.15] tracking-[-0.025em] text-partners-ink text-balance sm:text-[clamp(1.85rem,4.2vw,2.75rem)] sm:leading-[1.12]"
              >
                {copy.hero.h1}
              </h1>
              <p className="mx-auto mt-4 max-w-[34rem] font-partners text-[15px] leading-[1.5] text-partners-brown sm:mt-5 sm:text-partners-body">
                {copy.hero.subtitle}
              </p>
              <div className="relative z-[3] mt-6 flex flex-col items-stretch justify-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#partner-formats"
                  onClick={scrollToFormats}
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-partners-btn bg-partners-ink px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-cream no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-partners-ink"
                >
                  {copy.hero.cta}
                </a>
                <SandPill
                  href={loginUrl}
                  sameTab
                  onClick={() => trackPartnersEvent("partners_login_click", { source: "hero" })}
                >
                  {copy.hero.loginCta}
                </SandPill>
              </div>
              <p className="relative z-[3] mx-auto mt-4 max-w-[36rem] font-partners text-[13px] leading-snug tracking-[-0.01em] text-partners-muted sm:text-[14px]">
                {copy.hero.trust}
              </p>
            </div>
          </Shell>

          {/* Mobile: photo pulled up under copy — left + right visible */}
          <div
            className="partners-hero__mobile-wrap relative z-[1] -mt-14 w-full overflow-hidden sm:hidden"
            aria-hidden
          >
            <img
              src="/images/partners/fon-hero.png"
              alt=""
              className="partners-hero__mobile mx-auto block h-auto w-full max-w-none object-contain object-center"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* Problem */}
        <section className="bg-partners-cream py-partners-section" aria-labelledby="partners-problem">
          <Shell>
            <Reveal className="mx-auto max-w-[36rem] text-left sm:max-w-[42rem] sm:text-center">
              <h2
                id="partners-problem"
                className="font-partners-display text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-partners-ink text-balance sm:text-[clamp(1.75rem,4vw,2.75rem)] sm:leading-[1.1]"
              >
                {copy.problem.title}
              </h2>
              <p className="mt-3 font-partners text-[15px] leading-[1.55] tracking-[-0.01em] text-partners-brown sm:mt-4 sm:text-partners-body">
                {copy.problem.body.map((part, i) =>
                  part.pill ? (
                    <span
                      key={i}
                      className="mx-0.5 inline-flex translate-y-[-1px] items-center rounded-full bg-[#ff6b2c] px-2.5 py-0.5 text-[13px] font-semibold leading-none tracking-[-0.01em] text-white sm:mx-1 sm:px-3 sm:py-1 sm:text-[14px]"
                    >
                      {part.text}
                    </span>
                  ) : part.em ? (
                    <span key={i} className="font-medium text-partners-ink sm:font-semibold">
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </p>
            </Reveal>

            <Reveal className="mt-10 sm:mt-12">
              <h3 className="mb-4 text-left font-partners text-[1.125rem] font-medium leading-snug tracking-[-0.02em] text-partners-charcoal sm:mb-5 sm:text-center sm:text-partners-heading">
                {copy.problem.rolesHeading}
              </h3>
              <div ref={rolesRef} className="grid gap-5 lg:grid-cols-3 lg:gap-5">
                {/* Вы */}
                <article className="flex flex-col rounded-[20px] bg-partners-white p-5 sm:p-6">
                  <h4 className="font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-partners-ink">
                    {copy.problem.roles[0].title}
                  </h4>
                  <div className="partners-role-media">
                    <img
                      src="/images/partners/bez-tivonix.png"
                      alt=""
                      width={640}
                      height={400}
                      className="partners-role-zoom"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <ul className="mt-3 grid gap-2">
                    {copy.problem.roles[0].items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 rounded-[12px] bg-partners-cream px-3.5 py-2.5 font-partners text-[15px] leading-snug text-partners-brown"
                      >
                        <span
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d4d4d4] text-[13px] font-bold leading-none text-white"
                          aria-hidden
                        >
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                {/* TIVONIX — градиентный бордер равной толщины + отступ от контента */}
                <article className="partners-tivonix-frame">
                  <div className="flex h-full flex-col rounded-[16px] bg-partners-white p-5 sm:p-6">
                    <h4 className="font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-[#ff6b2c]">
                      TIVONIX
                    </h4>
                    <div className="partners-role-media">
                      <img
                        src="/images/partners/s-tivonix.png"
                        alt=""
                        width={640}
                        height={400}
                        className="partners-role-zoom"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <ul className="mt-3 grid gap-2">
                      {copy.problem.roles[1].items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 rounded-[12px] bg-partners-cream px-3.5 py-2.5 font-partners text-[15px] leading-snug text-partners-brown"
                        >
                          <span
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ff6b2c] text-[12px] font-bold leading-none text-white"
                            aria-hidden
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>

                {/* Ваша выгода */}
                <article className="flex flex-col rounded-[20px] bg-partners-white p-5 sm:p-6">
                  <h4 className="font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-partners-ink">
                    {copy.problem.roles[2].title}
                  </h4>
                  <div className="partners-role-media">
                    <img
                      src="/images/partners/vasha-vygoda.png"
                      alt=""
                      width={640}
                      height={400}
                      className="partners-role-zoom"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <ul className="mt-3 grid flex-1 gap-2 content-start">
                    {copy.problem.roles[2].items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 rounded-[12px] bg-partners-cream px-3.5 py-2.5 font-partners text-[15px] leading-snug text-partners-brown"
                      >
                        <span
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ff6b2c] text-[12px] font-bold leading-none text-white"
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </Reveal>

            <Reveal className="mt-8 rounded-[16px] bg-partners-white px-5 py-6 sm:px-8 sm:py-7">
              <p className="inline-flex rounded-partners-pill bg-[#ff6b2c] px-3.5 py-1.5 font-partners text-[13px] font-medium tracking-[-0.01em] text-white">
                {copy.money.label}
              </p>
              <p className="mt-3 max-w-[44rem] font-partners text-partners-body text-partners-charcoal">
                {copy.money.body}
              </p>
              <ExampleMoneyFlow />
            </Reveal>
          </Shell>
        </section>

        {/* Models — Family-style bento with mini animations */}
        <section
          id="partner-formats"
          className="scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream pb-6 sm:pb-8"
          aria-labelledby="partners-models"
        >
          <Shell>
            <Reveal className="mx-auto mb-10 max-w-[36rem] text-center">
              <h2
                id="partners-models"
                className="font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.02em] text-partners-ink text-balance"
              >
                {copy.models.heading.before}{" "}
                <span className="mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#00ca48] px-3 py-1 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle">
                  {copy.models.heading.sell}
                </span>{" "}
                {copy.models.heading.middle}{" "}
                <span className="mx-0.5 inline-flex translate-y-[-0.08em] items-center rounded-partners-pill bg-[#ff6b2c] px-3 py-1 text-[0.72em] font-medium tracking-[-0.01em] text-white align-middle">
                  {copy.models.heading.brand}
                </span>
              </h2>
            </Reveal>

            <Reveal>
              <div ref={bentoRef} className="partners-bento">
              {/* Tall action menu */}
              <article ref={easyCardRef} className="partners-bento__card partners-bento__easy">
                <div ref={easyBgRef} className="partners-bento__easy-bg" aria-hidden />
                <div className="partners-bento__easy-body">
                  <div className="partners-bento__menu" aria-hidden>
                    {copy.models.menu.map((copyItem, index) => ([
                      {
                        c: "#0086fc",
                        t: copyItem.title,
                        d: copyItem.description,
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M12 8v4.2l2.6 1.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ),
                      },
                      {
                        c: "#9f4fff",
                        t: copy.models.menu[1].title,
                        d: copy.models.menu[1].description,
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M7 8.5h10M7 12h7M7 15.5h5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                            <rect x="4.5" y="4.5" width="15" height="15" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
                          </svg>
                        ),
                      },
                      {
                        c: "#00ca48",
                        t: copy.models.menu[2].title,
                        d: copy.models.menu[2].description,
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M8.5 16.5 15.5 7.5M9.2 8.2h.01M14.8 15.8h.01"
                              stroke="currentColor"
                              strokeWidth="1.9"
                              strokeLinecap="round"
                            />
                            <circle cx="9.2" cy="8.2" r="1.35" fill="currentColor" />
                            <circle cx="14.8" cy="15.8" r="1.35" fill="currentColor" />
                          </svg>
                        ),
                      },
                      {
                        c: "#ff58ae",
                        t: copy.models.menu[3].title,
                        d: copy.models.menu[3].description,
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <rect x="4.5" y="5" width="15" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M8 9.5h8M8 12.5h8M8 15.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        ),
                      },
                    ][index])).map((row) => (
                      <div key={row.t} className="partners-bento__menu-row">
                        <span className="partners-bento__menu-ico" style={{ backgroundColor: row.c }}>
                          {row.icon}
                        </span>
                        <span className="partners-bento__menu-copy">
                          <span className="partners-bento__menu-t">{row.t}</span>
                          <span className="partners-bento__menu-d">{row.d}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="partners-bento__easy-foot">
                    <h3 className="partners-bento__title">{copy.models.allInOne.title}</h3>
                    <p className="partners-bento__text">
                      {copy.models.allInOne.text}
                    </p>
                  </div>
                </div>
              </article>

              {/* Estimating — detailed mock */}
              <article className="partners-bento__card partners-bento__hover" tabIndex={0}>
                <div className="partners-bento__viz">
                  <div className="partners-bento__zoom" data-bento-zoom="0.12">
                    <BentoEstimateUi pill={copy.models.quickStart.pill} />
                  </div>
                </div>
                <h3 className="partners-bento__title">{copy.models.quickStart.title}</h3>
                <p className="partners-bento__text">
                  {copy.models.quickStart.text}
                </p>
                <DiscussPanel />
              </article>

              {/* Deal timeline */}
              <article className="partners-bento__card partners-bento__hover" tabIndex={0}>
                <div className="partners-bento__viz">
                  <div className="partners-bento__zoom" data-bento-zoom="0.1">
                    <div className="partners-bento__fast" aria-hidden>
                      <div className="partners-bento__timeline">
                        <div className="partners-bento__step">
                          <span className="partners-bento__step-dot" />
                          <span className="partners-bento__step-copy">
                            <span className="partners-bento__step-t">{copy.models.status.steps[0].t}</span>
                            <span className="partners-bento__step-d">{copy.models.status.steps[0].d}</span>
                          </span>
                        </div>
                        <div className="partners-bento__step">
                          <span className="partners-bento__step-dot" />
                          <span className="partners-bento__step-copy">
                            <span className="partners-bento__step-t">{copy.models.status.steps[1].t}</span>
                            <span className="partners-bento__step-d">{copy.models.status.steps[1].d}</span>
                          </span>
                        </div>
                        <div className="partners-bento__step">
                          <span className="partners-bento__step-dot" />
                          <span className="partners-bento__step-copy">
                            <span className="partners-bento__step-t">{copy.models.status.steps[2].t}</span>
                            <span className="partners-bento__step-d">{copy.models.status.steps[2].d}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="partners-bento__title">{copy.models.status.title}</h3>
                <p className="partners-bento__text">
                  {copy.models.status.text}
                </p>
                <DiscussPanel />
              </article>

              {/* Referral */}
              <article className="partners-bento__card">
                <div className="partners-bento__viz">
                  <div className="partners-bento__zoom" data-bento-zoom="0.12">
                    <BentoReferralUi />
                  </div>
                </div>
                <h3 className="partners-bento__title">{copy.models.referral.title}</h3>
                <p className="partners-bento__text">
                  {copy.models.referral.text}
                </p>
                <p className="mt-2 font-partners text-[12px] leading-snug text-partners-muted">
                  {copy.models.referral.note}
                </p>
                <div className="partners-bento__cta">
                  <DarkPill
                    href={referralRegisterUrl}
                    sameTab
                    onClick={() => trackPartnersEvent("partners_referral_click", { source: "formats" })}
                  >
                    {copy.models.referral.cta}
                  </DarkPill>
                  <p className="mt-2 font-partners text-[11px] leading-snug text-partners-muted">
                    {copy.models.panelHint}
                  </p>
                </div>
              </article>

              {/* White-label */}
              <article className="partners-bento__card">
                <div className="partners-bento__viz">
                  <div className="partners-bento__zoom" data-bento-zoom="0.12">
                    <BentoWhiteLabelUi />
                  </div>
                </div>
                <h3 className="partners-bento__title">{copy.models.whiteLabel.title}</h3>
                <p className="partners-bento__text">
                  {copy.models.whiteLabel.text}
                </p>
                <p className="mt-2 font-partners text-[12px] leading-snug text-partners-muted">
                  {copy.models.whiteLabel.note}
                </p>
                <div className="partners-bento__cta">
                  <DarkPill
                    href={whiteLabelRegisterUrl}
                    sameTab
                    onClick={() => trackPartnersEvent("partners_white_label_click", { source: "formats" })}
                  >
                    {copy.models.whiteLabel.cta}
                  </DarkPill>
                  <p className="mt-2 font-partners text-[11px] leading-snug text-partners-muted">
                    {copy.models.panelHint}
                  </p>
                </div>
              </article>
              </div>
            </Reveal>

            <p className="mt-5 text-center font-partners text-partners-micro text-partners-muted">
              {copy.models.footnote}
            </p>
          </Shell>
        </section>

        {PARTNERS_VIDEO_AVAILABLE ? (
          <section
            id="partners-video"
            className="scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section"
            aria-labelledby="partners-video-title"
          >
            <Shell>
              <Reveal className="mx-auto mb-8 max-w-[36rem] text-center">
                <h2
                  id="partners-video-title"
                  className="font-partners-display text-[clamp(1.5rem,3.6vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.02em] text-partners-ink text-balance"
                >
                  {copy.video.title}
                </h2>
                <p className="mt-3 font-partners text-[15px] leading-snug text-partners-brown sm:text-[16px]">
                  {copy.video.subtitle}
                </p>
              </Reveal>
              <Reveal>
                <div className="partners-video">
                  <video
                    ref={videoRef}
                    className="partners-video__el"
                    controls
                    playsInline
                    preload="metadata"
                    poster={PARTNERS_VIDEO_POSTER}
                    onPlay={() => trackPartnersEvent("partners_video_play")}
                  >
                    <source src={PARTNERS_VIDEO_SRC} type="video/mp4" />
                  </video>
                </div>
              </Reveal>
            </Shell>
          </section>
        ) : null}

        <section
          id="partners-after-reg"
          className="scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section"
          aria-labelledby="partners-after-reg-title"
        >
          <Shell>
            <Reveal className="mx-auto mb-8 max-w-[36rem] text-center">
              <h2
                id="partners-after-reg-title"
                className="font-partners-display text-[clamp(1.5rem,3.6vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.02em] text-partners-ink text-balance"
              >
                {copy.afterReg.title}
              </h2>
              <p className="mt-3 font-partners text-[15px] leading-snug text-partners-brown sm:text-[16px]">
                {copy.afterReg.lead}
              </p>
            </Reveal>
            <Reveal className="partners-after-reg__grid">
              {copy.afterReg.steps.map((step, i) => (
                <article key={step.t} className="partners-after-reg__card">
                  <span className="partners-after-reg__num" aria-hidden>
                    {i + 1}
                  </span>
                  <h3 className="partners-after-reg__t">{step.t}</h3>
                  <p className="partners-after-reg__d">{step.d}</p>
                </article>
              ))}
            </Reveal>
            <p className="mx-auto mt-8 max-w-[40rem] text-center font-partners text-[14px] leading-snug text-partners-muted sm:text-[15px]">
              {copy.afterReg.disclaimer}
            </p>
          </Shell>
        </section>

        {/* Capabilities — scroll scrub + expand */}
        <section className="bg-partners-cream pt-partners-section" aria-labelledby="partners-caps">
          <CapabilitiesBanner />
        </section>

        {/* Process — split like Style Reference: mascot + steps */}
        <section
          id="process"
          className="scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section"
          aria-labelledby="partners-process"
        >
          <Shell>
            <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16">
              <div className="relative order-2 mx-auto flex w-full max-w-[20rem] items-center justify-center sm:max-w-[24rem] lg:order-1 lg:max-w-none">
                <PartnersProcessVisual />
              </div>

              <div className="order-1 min-w-0 lg:order-2">
                <h2
                  id="partners-process"
                  className="font-partners-display text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] text-partners-ink text-balance sm:text-[clamp(1.85rem,3.6vw,2.85rem)] sm:leading-[1.12] sm:tracking-[-0.025em]"
                >
                  {copy.process.title}
                </h2>
                <p className="mt-3 max-w-[34rem] font-partners text-[15px] leading-[1.55] tracking-[-0.01em] text-partners-brown sm:mt-4 sm:text-[17px] sm:leading-relaxed">
                  {copy.process.lead}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
                  {copy.process.steps.map((t) => (
                    <li
                      key={t}
                      className="inline-flex items-center gap-2 rounded-full bg-partners-white px-3 py-2 sm:px-3.5 sm:py-2.5"
                    >
                      <span
                        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#ff6b2c] text-[11px] font-bold leading-none text-white"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="font-partners text-[13px] font-semibold tracking-[-0.015em] text-partners-ink sm:text-[15px]">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Shell>
        </section>

        {/* Cases */}
        <section
          id="partners-cases"
          className="scroll-mt-[var(--tivonix-header-spacer)] bg-partners-cream py-partners-section"
          aria-labelledby="partners-cases-title"
        >
          <Shell>
            <Reveal className="mx-auto mb-10 max-w-[36rem] text-center">
              <h2
                id="partners-cases-title"
                className="font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-partners-ink text-balance"
              >
                {copy.cases.title}
              </h2>
            </Reveal>

            <Reveal className="grid gap-5 lg:grid-cols-3 lg:gap-5">
              {CASES.map((c) => (
                <article
                  key={c.id}
                  className="group flex flex-col overflow-hidden rounded-[20px] bg-partners-white"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-partners-cream">
                    <img
                      src={c.cover}
                      alt=""
                      width={640}
                      height={400}
                      className="!h-full !max-w-none h-full w-full scale-110 object-cover object-top blur-[22px] transition duration-500 ease-out group-hover:scale-[1.16]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-partners text-[1.25rem] font-semibold tracking-[-0.02em] text-partners-ink">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 font-partners text-[15px] leading-snug text-partners-brown">
                      {copy.cases.texts[c.id]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-partners-cream px-3 py-1.5 font-partners text-[12px] font-semibold tracking-[-0.01em] text-partners-charcoal"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5">
                      <Link
                        to={`/projects/${c.id}`}
                        className="inline-flex min-h-[2.5rem] items-center justify-center rounded-partners-btn bg-[#ff6b2c] px-4 py-2 font-partners text-[14px] font-semibold tracking-[-0.01em] text-white no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b2c]"
                      >
                        {copy.cases.view}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </Reveal>

            <div className="mt-8 text-center">
              <SandPill href="/projects">{copy.cases.all}</SandPill>
            </div>
          </Shell>
        </section>

        {/* Models examples — hover expand, no borders */}
        <section className="bg-partners-cream py-partners-section" aria-labelledby="partners-models-examples">
          <Shell>
            <h2 id="partners-models-examples" className="sr-only">
              {copy.examples.sr}
            </h2>
            <div ref={modelsExamplesRef}>
              <Reveal className="partners-models-split">
                <article className="partners-models-split__card partners-models-split__card--ref">
                  <div className="partners-models-split__media" aria-hidden>
                    <div className="partners-models-split__zoom">
                      <img src={PARTNERS_REF_BG} alt="" width={900} height={700} decoding="async" loading="lazy" />
                    </div>
                    <div className="partners-models-split__shade" />
                  </div>
                  <div className="partners-models-split__body">
                    <p className="partners-models-split__pill">{copy.examples.referral.pill}</p>
                    <h3 className="partners-models-split__title">{copy.examples.referral.title}</h3>
                    <p className="partners-models-split__text">
                      {copy.examples.referral.text}
                    </p>
                    <ModelExampleReferral />
                  </div>
                </article>
                <article className="partners-models-split__card partners-models-split__card--wl">
                  <div className="partners-models-split__media" aria-hidden>
                    <div className="partners-models-split__zoom">
                      <img src={PARTNERS_WL_BG} alt="" width={900} height={700} decoding="async" loading="lazy" />
                    </div>
                    <div className="partners-models-split__shade" />
                  </div>
                  <div className="partners-models-split__body">
                    <p className="partners-models-split__pill">{copy.examples.whiteLabel.pill}</p>
                    <h3 className="partners-models-split__title">{copy.examples.whiteLabel.title}</h3>
                    <p className="partners-models-split__text">
                      {copy.examples.whiteLabel.text}
                    </p>
                    <ModelExampleWhiteLabel />
                  </div>
                </article>
              </Reveal>
            </div>
          </Shell>
        </section>

        {/* FAQ */}
        <section className="bg-partners-cream py-partners-section" aria-labelledby="partners-faq">
          <Shell>
            <Reveal>
              <h2
                id="partners-faq"
                className="font-partners-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-partners-ink"
              >
                {copy.faq.title}
              </h2>
            </Reveal>
            <Reveal className="mt-8 grid gap-3">
              {copy.faq.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-[20px] bg-partners-white p-5 sm:p-6"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-partners text-[clamp(1.05rem,2vw,1.4375rem)] font-medium leading-snug tracking-[-0.02em] text-partners-charcoal [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0 flex-1">{item.q}</span>
                    <span className="mt-1 shrink-0 font-partners text-[14px] font-medium text-partners-ember underline-offset-2 group-open:underline">
                      {copy.faq.more}
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[42rem] font-partners text-partners-caption text-partners-body">{item.a}</p>
                </details>
              ))}
            </Reveal>
          </Shell>
        </section>

        {/* Final CTA */}
        <section
          ref={finalRef}
          className="overflow-x-clip bg-partners-cream py-partners-section text-center"
          aria-labelledby="partners-final"
        >
          <Shell className="min-w-0">
            <Reveal className="min-w-0">
              <div className="partners-final__media">
                <div ref={finalZoomRef} className="partners-final__zoom" aria-hidden>
                  <img
                    src="/images/partners/foo.png"
                    alt=""
                    width={1680}
                    height={720}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div className="partners-final__copy">
                  <p className="inline-flex max-w-full rounded-partners-pill bg-[#ff6b2c] px-3 py-1.5 font-partners text-[12px] font-medium tracking-[-0.01em] text-white sm:px-3.5 sm:text-[13px]">
                    {copy.final.badge}
                  </p>
                  <h2
                    id="partners-final"
                    className="mx-auto mt-3 max-w-[22ch] font-partners-display text-[1.35rem] font-medium leading-[1.2] tracking-[-0.02em] text-balance sm:mt-4 sm:text-[clamp(1.75rem,4vw,2.75rem)] sm:leading-[1.12] sm:tracking-[-0.025em]"
                  >
                    {copy.final.title}
                  </h2>
                  <p className="mx-auto mt-3 max-w-[32rem] font-partners text-[14px] leading-[1.5] tracking-[-0.01em] sm:mt-4 sm:text-[17px] sm:leading-relaxed">
                    {copy.final.body}
                  </p>
                  <div className="partners-final__actions mt-5 sm:mt-7">
                    <a
                      href={referralRegisterUrl}
                      onClick={() => trackPartnersEvent("partners_final_referral_click")}
                      className="inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-partners-btn bg-white px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-partners-ink no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:w-auto"
                    >
                      {copy.final.referralCta}
                    </a>
                    <a
                      href={whiteLabelRegisterUrl}
                      onClick={() => trackPartnersEvent("partners_final_white_label_click")}
                      className="inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-partners-btn bg-[#ff6b2c] px-5 py-2.5 font-partners text-[15px] font-semibold tracking-[-0.009em] text-white no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:w-auto"
                    >
                      {copy.final.whiteLabelCta}
                    </a>
                  </div>
                  <a
                    href={loginUrl}
                    onClick={() => trackPartnersEvent("partners_login_click", { source: "final" })}
                    className="partners-final__secondary mt-4 inline-flex min-h-[2.5rem] items-center justify-center font-partners text-[14px] font-semibold tracking-[-0.01em] no-underline underline-offset-[3px] transition hover:underline sm:text-[15px]"
                  >
                    {copy.final.loginLink}
                  </a>
                  <p className="partners-final__footnote mt-4 font-partners text-[11px] leading-snug sm:mt-5 sm:text-partners-micro">
                    {copy.final.footnote}
                  </p>
                </div>
              </div>
            </Reveal>
          </Shell>
        </section>
      </main>

      <PartnersFooter />
    </div>
  );
}
