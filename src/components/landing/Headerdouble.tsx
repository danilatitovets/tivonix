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
        } as React.CSSProperties}
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
                      src="/images/tivonix-logo-lockup.webp"
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
                      "transition-[transform,background-color,border-color] duration-200 ease-out",
                      "hover:bg-black/50 hover:border-white/18",
                      "active:scale-95",
                      open && "bg-white/[0.08] border-white/20"
                    )}
                    aria-label={open ? (isRu ? "Закрыть меню" : "Close menu") : ariaMenu}
                    aria-expanded={open}
                    aria-controls="mobile-header-menu"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpen((v) => !v);
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transition-transform duration-200 ease-out"
                    >
                      <path
                        d="M4 7H20"
                        stroke="#FF9A3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "12px 7px",
                          transform: open ? "translateY(5px) rotate(45deg)" : "translateY(0) rotate(0deg)",
                          transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)",
                        } as React.CSSProperties}
                      />
                      <path
                        d="M4 12H20"
                        stroke="#FF9A3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          opacity: open ? 0 : 1,
                          transition: reducedMotion ? "none" : "opacity 0.18s ease-out",
                        } as React.CSSProperties}
                      />
                      <path
                        d="M4 17H20"
                        stroke="#FF9A3D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "12px 17px",
                          transform: open ? "translateY(-5px) rotate(-45deg)" : "translateY(0) rotate(0deg)",
                          transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)",
                        } as React.CSSProperties}
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* MOBILE MENU — на весь экран, стиль как у хедера (блюр, тёмный фон, оранжевая полоска) */}
        <div
          id="mobile-header-menu"
          className={cx("xl:hidden fixed inset-0 z-50", open ? "pointer-events-auto" : "pointer-events-none")}
          aria-hidden={!open}
        >
          {/* подложка: тёмный блюр в стиле хедера */}
          <div
            className={cx("absolute inset-0 transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
            style={{
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            } as React.CSSProperties}
            onClick={() => {
              setOpen(false);
              requestAnimationFrame(() => burgerRef.current?.focus());
            }}
          />
          {/* панель на весь экран, выезд справа */}
          <div
            className={cx(
              "absolute inset-0 flex flex-col bg-[#0a0a0c]",
              "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            )}
            style={{ transform: open ? "translateX(0)" : "translateX(100%)" } as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
          >
            {/* оранжевое свечение сверху + полоска — как в хедере */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-32 rounded-b-2xl opacity-90"
              style={{
                background: "radial-gradient(600px 80px at 50% 0%, rgba(255,154,61,0.22), transparent 65%)",
              } as React.CSSProperties}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-6 right-6 top-0 h-[3px] rounded-full"
              style={{ background: ORANGE_LINE } as React.CSSProperties}
            />

            <div className="relative flex-1 flex flex-col min-h-0 pt-2">
                  {/* кнопка закрытия — сверху справа */}
                  <div className="flex justify-end pt-5 pr-5 sm:pt-6 sm:pr-6 mb-5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpen(false);
                        requestAnimationFrame(() => burgerRef.current?.focus());
                      }}
                      className={cx(
                        "group grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-2xl shrink-0",
                        "border border-white/14 bg-white/[0.07] backdrop-blur-xl",
                        "transition-all duration-200 ease-out cursor-pointer",
                        "hover:scale-110 hover:bg-white/[0.12] active:scale-95",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                      )}
                      aria-label={isRu ? "Закрыть меню" : "Close menu"}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-transform duration-200 ease-out"
                      >
                        <path
                          d="M6 6L18 18"
                          stroke="#FF9A3D"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M18 6L6 18"
                          stroke="#FF9A3D"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* scroll area */}
                  <div className="px-6 pb-6 pt-0 overflow-y-auto overscroll-contain" style={{ maxHeight: menuMaxH } as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col gap-3">
                      <button
                        type="button"
                        className={cx(
                          "h-12 rounded-2xl font-semibold flex items-center justify-center",
                          "bg-[#FF9A3D] text-black hover:brightness-105 active:brightness-95",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
                        )}
                        onClick={openStartModal}
                      >
                        {ctaScrolled}
                      </button>
                      <Link
                        to="/contacts"
                        className={cx(
                          "h-12 rounded-2xl font-medium flex items-center justify-center border border-white/20 bg-white/5 text-white",
                          "hover:bg-white/10 active:bg-white/5",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {isRu ? "Контакты" : "Contact"}
                      </Link>
                    </div>

                    <nav className="mt-6 flex flex-col" aria-label={isRu ? "Навигация" : "Navigation"}>
                      {tabsItems.map((item) => (
                        <Link
                          key={item.key}
                          to={item.to}
                          className={cx(
                            "flex items-center justify-between py-3 text-white/90 hover:text-white",
                            "border-b border-white/5 last:border-0"
                          )}
                          onClick={() => {
                            setOpen(false);
                            requestAnimationFrame(() => burgerRef.current?.focus());
                          }}
                        >
                          <span>{item.label}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/50">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      ))}
                    </nav>

                    <div className="my-4 border-t border-white/10" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">{isRu ? "Язык" : "Language"}</span>
                      <LangToggle compact scrolled />
                    </div>

                    {/* небольшой нижний отступ */}
                    <div className="h-4" />
                  </div>
            </div>
          </div>
        </div>
      </header>

      <StartModal open={startOpen} onClose={() => setStartOpen(false)} />
    </>
  );
}