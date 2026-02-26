// src/components/landing/Header.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { Button } from "../ui/Button";
import { useLang, type Lang } from "../../i18n/LangProvider";
import StartModal from "./StartModal";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type NavKey = "home" | "contacts" | "projects";
type NavItem = { to: string; key: NavKey };

const NAV_MAIN: NavItem[] = [
  { to: "/", key: "home" },
  { to: "/contacts", key: "contacts" },
  { to: "/projects", key: "projects" },
];

const BRAND_CTA =
  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";

const ORANGE_LINE =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";

// Важно: десктоп-режим теперь только с xl (>=1280).
const DESKTOP_MIN_WIDTH = 1280;

function usePrefersReducedMotion() {
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

function LangToggle({ compact }: { compact?: boolean; scrolled?: boolean }) {
  const { lang, setLang } = useLang();

  const baseBtn =
    "h-9 rounded-full px-3 text-xs font-semibold transition border outline-none " +
    "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40";

  const wrap = compact ? "flex items-center gap-1" : "flex items-center gap-1 mr-2";

  const tone = {
    on: "border-white/14 bg-white/10 text-white",
    off: "border-white/10 bg-black/25 text-white/70 hover:text-white hover:bg-white/5",
  };

  const label = lang === "ru" ? "Выбор языка" : "Language";

  return (
    <div className={wrap} role="radiogroup" aria-label={label} aria-orientation="horizontal">
      <button
        type="button"
        role="radio"
        aria-checked={lang === "ru"}
        onClick={() => setLang("ru" as Lang)}
        className={cx(baseBtn, lang === "ru" ? tone.on : tone.off)}
      >
        RU
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={lang === "en"}
        onClick={() => setLang("en" as Lang)}
        className={cx(baseBtn, lang === "en" ? tone.on : tone.off)}
      >
        EN
      </button>
    </div>
  );
}

function PillNav({
  activeKey,
  items,
  onItemClick,
  reducedMotion,
  compact,
}: {
  activeKey: NavKey;
  items: Array<{ key: NavKey; label: string; to: string }>;
  onItemClick: (to: string) => (e: React.MouseEvent) => void;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const dur = 260;

  return (
    <nav
      className={cx(
        "relative inline-flex items-center gap-1 rounded-full",
        "border border-white/10 bg-white/[0.06] backdrop-blur-xl p-1",
        "ring-1 ring-white/5",
        compact ? "shadow-[0_12px_40px_rgba(0,0,0,0.35)]" : "shadow-[0_18px_60px_rgba(0,0,0,0.40)]"
      )}
      aria-label="Header navigation"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      />

      {items.map((it) => {
        const isActive = it.key === activeKey;
        const pad = compact ? "px-3 h-9" : "px-4 h-10";
        const text = compact ? "text-[11px]" : "text-xs";

        return (
          <Link
            key={it.key}
            to={it.to}
            onClick={onItemClick(it.to)}
            aria-current={isActive ? "page" : undefined}
            className={cx(
              "relative rounded-full font-semibold transition flex items-center gap-2 select-none uppercase tracking-wide outline-none",
              "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
              pad,
              text,
              isActive
                ? "text-white bg-white/12 border border-white/14 shadow-[0_10px_26px_rgba(0,0,0,0.28)]"
                : "text-white/75 hover:text-white hover:bg-white/6 border border-transparent"
            )}
            style={
              reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)
            }
          >
            <span className="leading-none">{it.label}</span>

            {isActive && (
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full opacity-95"
                style={{ background: ORANGE_LINE } as React.CSSProperties}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const scrolled = useScrolled(26);

  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLang();
  const isRu = lang === "ru";

  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  // высота верхней полосы (чтобы корректно посчитать maxHeight меню)
  const [barH, setBarH] = useState<number>(92);

  const measureBar = () => {
    const h = barRef.current?.getBoundingClientRect().height;
    if (h && Number.isFinite(h)) setBarH(Math.round(h));
  };

  // Закрывать меню при уходе на xl+ (>=1280)
  useEffect(() => {
    const onResize = () => {
      measureBar();
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setOpen(false);
    };
    measureBar();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc закрывает меню и возвращает фокус на бургер
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => burgerRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ iOS-safe блокировка фонового скролла (без прыжков вверх),
  // но само меню будет скроллиться внутри (overflow-y-auto).
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

  // когда открыли меню — пересчитать высоту полосы (на случай изменения scrolled/контента)
  useEffect(() => {
    if (!open) return;
    measureBar();

    // на iOS при смене адресной строки меняется viewport — слушаем resize
    const onResize = () => measureBar();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, scrolled]);

  const navLabel = (key: NavKey) => {
    if (isRu) {
      if (key === "home") return "главная";
      if (key === "contacts") return "контакты";
      if (key === "projects") return "проекты";
    } else {
      if (key === "home") return "home";
      if (key === "contacts") return "contacts";
      if (key === "projects") return "projects";
    }
    return key;
  };

  const activeKey: NavKey = useMemo(() => {
    if (location.pathname === "/contacts") return "contacts";
    if (location.pathname === "/projects") return "projects";
    return "home";
  }, [location.pathname]);

  const tabsItems = useMemo(
    () =>
      NAV_MAIN.map((it) => ({
        key: it.key,
        to: it.to,
        label: navLabel(it.key),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const onNav = (to: string) => (e: React.MouseEvent) => {
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

  const openStartModal = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    setStartOpen(true);
  };

  const ariaHome = isRu ? "На главную" : "Go to home";
  const ariaMenu = isRu ? "Меню" : "Menu";

  const ctaTop = isRu ? "Рассчитать стоимость" : "Get an estimate";
  const ctaScrolled = isRu ? "Заказать сайт" : "Order a website";

  const dur = reducedMotion ? 0 : 280;

  // высота области меню: viewport минус высота верхней полосы и небольшой отступ
  const menuMaxH = `calc(100dvh - ${barH}px - 16px)`;

  return (
    <>
      {/* spacer под фикс-хедер */}
      <div aria-hidden className="h-[92px] sm:h-[100px] xl:h-[104px]" />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="pt-3" ref={barRef}>
          <Container>
            <div
              className={cx(
                "relative transition-all",
                scrolled
                  ? "rounded-[999px] bg-black/55 backdrop-blur-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
                  : "rounded-[999px]"
              )}
              style={reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)}
            >
              {/* glow + top orange strip */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[999px] opacity-0 transition-opacity"
                style={
                  {
                    opacity: scrolled ? 1 : 0,
                    transitionDuration: `${dur}ms`,
                    background:
                      "radial-gradient(900px 120px at 50% 0%, rgba(255,122,32,0.28), transparent 60%)",
                  } as React.CSSProperties
                }
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-10 right-10 top-0 h-[3px] rounded-full opacity-0 transition-opacity"
                style={
                  {
                    opacity: scrolled ? 0.95 : 0,
                    transitionDuration: `${dur}ms`,
                    background: ORANGE_LINE,
                  } as React.CSSProperties
                }
              />

              {/* основная полоса хедера */}
              <div
                className={cx(
                  "relative flex items-center",
                  scrolled ? "px-4 sm:px-5" : "px-3 sm:px-4",
                  scrolled ? "h-[70px] sm:h-[74px]" : "h-[78px] sm:h-[82px]"
                )}
                style={reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)}
              >
                {/* LEFT: логотип */}
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      goHome();
                    }}
                    className={cx(
                      "flex items-center outline-none",
                      "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 rounded-xl"
                    )}
                    aria-label={ariaHome}
                  >
                    <img
                      src="/images/tivonix-logo-lockup.png"
                      alt="TIVONIX"
                      className="h-8 sm:h-9 w-auto object-contain opacity-95 transition-opacity hover:opacity-100"
                      draggable={false}
                      loading="eager"
                      decoding="async"
                    />
                  </Link>
                </div>

                {/* CENTER: навигация (только xl+) */}
                <div className="absolute inset-x-0 flex justify-center pointer-events-none">
                  <div className="hidden xl:block pointer-events-auto">
                    <PillNav
                      activeKey={activeKey}
                      reducedMotion={reducedMotion}
                      items={tabsItems}
                      onItemClick={onNav}
                      compact={scrolled}
                    />
                  </div>
                </div>

                {/* RIGHT: язык + CTA (desktop xl+) */}
                <div className="ml-auto hidden xl:flex items-center gap-3 shrink-0">
                  <LangToggle scrolled={scrolled} />
                  <Button
                    type="button"
                    onClick={openStartModal}
                    className={cx(
                      "rounded-full font-semibold !text-black outline-none",
                      "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                      "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                      "hover:brightness-[1.04] active:brightness-[0.96]",
                      scrolled ? "h-10 px-5" : "h-11 px-6"
                    )}
                    style={{ background: BRAND_CTA } as React.CSSProperties}
                  >
                    <span className="relative inline-grid">
                      <span
                        className={cx(
                          "col-start-1 row-start-1 transition-all",
                          scrolled ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
                        )}
                        style={reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)}
                      >
                        {ctaTop}
                      </span>
                      <span
                        className={cx(
                          "col-start-1 row-start-1 transition-all",
                          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                        )}
                        style={reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)}
                      >
                        {ctaScrolled}
                      </span>
                    </span>
                  </Button>
                </div>

                {/* RIGHT: tablet/mobile (до xl) — CTA + бургер */}
                <div className="ml-auto xl:hidden flex items-center gap-2">
                  <div className="hidden md:block">
                    <Button
                      type="button"
                      onClick={openStartModal}
                      className={cx(
                        "rounded-2xl font-semibold !text-black outline-none",
                        "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                        "shadow-[0_18px_70px_rgba(255,120,40,0.30)]",
                        "hover:brightness-[1.04] active:brightness-[0.96]",
                        scrolled ? "h-10 px-4 text-sm" : "h-11 px-5 text-sm"
                      )}
                      style={{ background: BRAND_CTA } as React.CSSProperties}
                    >
                      {scrolled ? ctaScrolled : ctaTop}
                    </Button>
                  </div>

                  <button
                    ref={burgerRef}
                    type="button"
                    className={cx(
                      "grid place-items-center outline-none",
                      "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                      scrolled ? "h-10 w-10 rounded-2xl" : "h-11 w-11 rounded-2xl",
                      "border border-white/12 bg-black/35 backdrop-blur-xl",
                      "active:scale-[0.98] transition"
                    )}
                    aria-label={ariaMenu}
                    aria-expanded={open}
                    aria-controls="mobile-header-menu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpen((v) => !v);
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7H20"
                        stroke="#FF9A3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "12px 7px",
                          transform: open ? "translateY(5px) rotate(45deg)" : "none",
                          transition: "transform 220ms ease",
                        }}
                      />
                      <path
                        d="M4 12H20"
                        stroke="#FF9A3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          opacity: open ? 0 : 1,
                          transition: "opacity 160ms ease",
                        }}
                      />
                      <path
                        d="M4 17H20"
                        stroke="#FF9A3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "12px 17px",
                          transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                          transition: "transform 220ms ease",
                        }}
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* ✅ MOBILE/TABLET MENU OVERLAY (до xl) — скроллится внутри */}
        <div
          id="mobile-header-menu"
          className={cx("xl:hidden", open ? "pointer-events-auto" : "pointer-events-none")}
          aria-hidden={!open}
        >
          {/* backdrop */}
          <div
            className={cx(
              "fixed inset-0 z-40 transition-opacity",
              open ? "opacity-100" : "opacity-0"
            )}
            style={{ background: "rgba(0,0,0,0.55)" }}
            onClick={() => {
              setOpen(false);
              requestAnimationFrame(() => burgerRef.current?.focus());
            }}
          />

          {/* panel */}
          <div className="fixed inset-x-0 z-50" style={{ top: barH }}>
            <Container>
              <div className="pt-3 pb-4">
                <div
                  className={cx(
                    "rounded-[28px] border border-white/10 bg-black/55 backdrop-blur-2xl shadow-[0_22px_80px_rgba(0,0,0,0.55)]",
                    "transition-[transform,opacity] duration-300",
                    open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  )}
                >
                  {/* ✅ scroll area */}
                  <div
                    className={cx(
                      "p-4",
                      "overflow-y-auto overscroll-contain"
                    )}
                    style={
                      {
                        maxHeight: menuMaxH,
                        WebkitOverflowScrolling: "touch",
                      } as React.CSSProperties
                    }
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center">
                      <PillNav
                        activeKey={activeKey}
                        reducedMotion={reducedMotion}
                        items={tabsItems}
                        onItemClick={(to) => (e) => {
                          onNav(to)(e);
                          setOpen(false);
                          requestAnimationFrame(() => burgerRef.current?.focus());
                        }}
                        compact
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <LangToggle compact scrolled />
                      <Button
                        type="button"
                        onClick={openStartModal}
                        className={cx(
                          "flex-1 h-11 rounded-2xl font-semibold !text-black outline-none",
                          "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                          "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                          "hover:brightness-[1.04] active:brightness-[0.96]"
                        )}
                        style={{ background: BRAND_CTA } as React.CSSProperties}
                      >
                        {ctaScrolled}
                      </Button>
                    </div>

                    <div className="mt-3 text-[12px] text-white/55 text-center">
                      {isRu
                        ? "Нажми — уточним задачу и быстро дадим оценку."
                        : "Tap — we’ll clarify scope and estimate quickly."}
                    </div>

                    {/* небольшой нижний отступ, чтобы не упираться в край при скролле */}
                    <div className="h-2" />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </header>

      <StartModal open={startOpen} onClose={() => setStartOpen(false)} />
    </>
  );
}