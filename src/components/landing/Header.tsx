// src/components/landing/Header.tsx
import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { t3 } from "../../i18n/pick";
import { isPartnersPath, partnersPath } from "../../i18n/partnersPaths";
import { aboutPath } from "../../i18n/aboutCopy";
import { partnerPanelLoginUrl } from "../../lib/partnerPanel";
import { trackPartnersEvent } from "../../lib/ads";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import { leadFormCopy } from "../../i18n/leadFormCopy";
import LangToggle from "./LangToggle";
import { pathForLang } from "../../lib/localePaths";

// Десктоп-режим (бургер скрыт, показывается полоса навигации) с xl (>=1280).

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type NavKey = "services" | "projects" | "plans" | "about" | "partners";
type NavItem = { to?: string; key: NavKey; hash?: string };

const NAV_MAIN: NavItem[] = [
  { to: "/#offer", key: "services", hash: "offer" },
  { to: "/projects", key: "projects" },
  { to: "/plans", key: "plans" },
  { to: "/about", key: "about" },
  { key: "partners" },
];

const NAV_MOBILE: NavItem[] = [
  { to: "/#offer", key: "services", hash: "offer" },
  { to: "/projects", key: "projects" },
  { to: "/plans", key: "plans" },
  { to: "/about", key: "about" },
  { key: "partners" },
];

// Важно: десктоп-режим теперь только с xl (>=1280).
const DESKTOP_MIN_WIDTH = 1280;

const LOGO_DEFAULT = "/images/tivonix-logo-lockup.webp";
const LOGO_WHITE = "/images/tivonix-logo-white.webp";
const LOGO_BLACK = "/images/logo-black.png";

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

function useHomeHeroInView(pathname: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";
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

function useFooterInView(pathname: string) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let io: IntersectionObserver | null = null;

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
  compact,
}: {
  activeKey: NavKey | null;
  items: Array<{ key: NavKey; label: string; to: string; hash?: string }>;
  onItemClick: (to: string, hash?: string) => (e: React.MouseEvent) => void;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const dur = 260;

  return (
    <nav
      className={cx(
        "relative inline-flex items-center gap-0.5 rounded-full border-0 bg-[#141414] p-1"
      )}
      aria-label="Header navigation"
    >
      {items.map((it) => {
        const isActive = it.key === activeKey;
        const pad = compact ? "px-3.5 h-10" : "px-5 h-11";
        const text = compact ? "text-[10.5px]" : "text-[11px]";

        return (
          <Link
            key={it.key}
            to={it.to}
            onClick={onItemClick(it.to, it.hash)}
            aria-current={isActive ? "page" : undefined}
            className={cx(
              "relative flex items-center justify-center gap-2 rounded-full border-0 font-bold uppercase tracking-[0.14em] outline-none select-none transition",
              "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
              pad,
              text,
              isActive
                ? "bg-[#2c2c2c] text-white"
                : "bg-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/85"
            )}
            style={
              reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)
            }
          >
            <span className="leading-none translate-y-[0.5px]">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}


export default function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();
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
  const hideHeader = (footerInView || (partnersCapsLock && !isMobile)) && !open;
  const isPartners = isPartnersPath(location.pathname);
  const logoSrc = isPartners ? LOGO_BLACK : heroInView ? LOGO_WHITE : LOGO_DEFAULT;
  const isHome = location.pathname === "/" || location.pathname === "/en";
  const isAbout =
    location.pathname === "/about" || location.pathname === "/en/about";
  const needsSpacer = isMobile && !isHome && !isAbout;
  const { lang } = useLang();
  const isRu = lang === "ru";

  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const scrollLockYRef = useRef(0);

  // Закрывать меню при уходе на xl+ (>=1280)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Esc закрывает меню и возвращает фокус на бургер
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Блокировка скролла: фиксируем body и восстанавливаем позицию при закрытии.
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

  const navLabel = (key: NavKey) => {
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

  const homePath = lang === "en" ? "/en" : lang === "zh" ? "/zh" : "/";

  const navTo = (it: NavItem) => {
    if (it.key === "partners") return partnersPath(lang);
    if (it.key === "about") return aboutPath(lang);
    if (it.key === "services") return `${homePath}#offer`;
    return pathForLang(it.to ?? "/", lang);
  };

  const activeKey: NavKey | null = useMemo(() => {
    const p = location.pathname;
    if (p === "/plans" || p === "/en/plans" || p === "/zh/plans") return "plans";
    if (
      p === "/projects" ||
      p.startsWith("/projects/") ||
      p === "/en/projects" ||
      p.startsWith("/en/projects/")
    ) {
      return "projects";
    }
    if (p === "/about" || p === "/en/about" || p === "/zh/about") return "about";
    if (isPartnersPath(p)) return "partners";
    return null;
  }, [location.pathname]);

  const tabsItems = useMemo(
    () =>
      NAV_MAIN.map((it) => ({
        key: it.key,
        to: navTo(it),
        label: navLabel(it.key),
        hash: it.hash,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const mobileNavItems = useMemo(
    () =>
      NAV_MOBILE.map((it) => ({
        key: it.key,
        to: navTo(it),
        label: navLabel(it.key),
        hash: it.hash,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const onNav = (to: string, hash?: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (hash) {
      e.preventDefault();
      const go = () => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      };
      if (
        location.pathname !== "/" &&
        location.pathname !== "/en" &&
        location.pathname !== "/zh"
      ) {
        navigate(homePath);
        window.setTimeout(go, 80);
      } else {
        go();
      }
      return;
    }
    if (to === "/" || to === "/en" || to === "/zh") {
      e.preventDefault();
      if (location.pathname !== homePath) navigate(homePath);
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  const goHome = () => {
    setOpen(false);
    if (location.pathname !== homePath) navigate(homePath);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const ariaHome = t3(lang, "На главную", "Go to home", "返回首页");
  const ariaMenu = t3(lang, "Меню", "Menu", "菜单");

  const onPartners = isPartnersPath(location.pathname);
  const leadCopy = leadFormCopy(lang);
  const ctaTop = onPartners
    ? isRu
      ? "Войти в панель"
      : "Log in to panel"
    : isRu
      ? "Оценить проект"
      : "Estimate project";
  const ctaHref = onPartners ? partnerPanelLoginUrl() : "#";
  const onPartnersCtaClick = onPartners
    ? () => trackPartnersEvent("partners_login_click", { source: "header" })
    : undefined;

  const dur = reducedMotion ? 0 : 280;

  const closeMenu = () => {
    setOpen(false);
    requestAnimationFrame(() => burgerRef.current?.focus({ preventScroll: true }));
  };

  // Portal only after mount — SSR has no document.body target, and rendering the
  // menu on the first client pass (typeof document !== "undefined") caused #418.
  const [menuPortalReady, setMenuPortalReady] = useState(false);
  useEffect(() => {
    setMenuPortalReady(true);
  }, []);

  const mobileMenu = menuPortalReady ? (
      <div
        id="mobile-header-menu"
        className={cx(
          "xl:hidden fixed inset-0 z-[200]",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cx(
            "mobile-menu-panel absolute inset-0 flex min-h-[100dvh] flex-col overflow-hidden bg-[#161313]",
            "transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
          )}
          role="dialog"
          aria-modal="true"
          aria-label={t3(lang, "Меню", "Menu", "菜单")}
        >
          <div className="relative flex items-center justify-between px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                goHome();
              }}
              className="flex items-center outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 rounded-xl"
              aria-label={ariaHome}
            >
              <img
                src={heroInView ? LOGO_WHITE : LOGO_DEFAULT}
                alt="TIVONIX"
                className="h-7 w-auto object-contain opacity-95"
                draggable={false}
                decoding="async"
              />
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              className={cx(
                "grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-xl border-0",
                "bg-white/[0.04] text-white/72 transition hover:bg-white/[0.08] active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
              )}
              aria-label={t3(lang, "Закрыть меню", "Close menu", "关闭菜单")}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 ease-out"
                aria-hidden
              >
                <path
                  d="M4 7H20"
                  stroke="#FF9A3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "12px 7px",
                    transform: "translateY(5px) rotate(45deg)",
                    transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)",
                  } as React.CSSProperties}
                />
                <path
                  d="M4 12H20"
                  stroke="#FF9A3D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    opacity: 0,
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
                    transform: "translateY(-5px) rotate(-45deg)",
                    transition: reducedMotion ? "none" : "transform 0.28s cubic-bezier(0.33, 1, 0.68, 1)",
                  } as React.CSSProperties}
                />
              </svg>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-2 pb-5 sm:px-3">
            <nav className="mt-1 flex flex-col" aria-label={t3(lang, "Навигация", "Navigation", "导航")}>
              {mobileNavItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className={cx(
                    "flex items-center justify-between border-b border-white/[0.08] px-3 py-4 text-[15px] font-medium text-white/92",
                    "transition-colors hover:bg-white/[0.03] active:bg-white/[0.02]",
                    activeKey === item.key && "text-[#FFAE66]"
                  )}
                  onClick={(e) => {
                    onNav(item.to, item.hash)(e);
                    closeMenu();
                  }}
                >
                  <span className="capitalize">{item.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-white/32" aria-hidden>
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-2 px-2 pt-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {onPartners ? (
                <a
                  href={ctaHref}
                  onClick={() => {
                    onPartnersCtaClick?.();
                    setOpen(false);
                  }}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/[0.08] px-6 text-[14px] font-bold text-white no-underline transition hover:bg-white/[0.03]"
                >
                  {ctaTop}
                </a>
              ) : (
                <LeadCTAButton
                  source="header"
                  variant="white"
                  className="h-12 w-full text-[14px]"
                  aria-label={leadCopy.ctaDiscuss}
                  onClick={() => setOpen(false)}
                >
                  {leadCopy.ctaDiscuss}
                </LeadCTAButton>
              )}
              <Link
                to={onPartners ? `${partnersPath(lang)}#partner-formats` : pathForLang("/plans", lang)}
                className={cx(
                  "inline-flex h-12 items-center justify-center rounded-full px-6 font-sans text-[14px] font-medium text-white",
                  "bg-[#070607] transition hover:bg-[#1a1a1a]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                )}
                onClick={() => setOpen(false)}
              >
                {onPartners ? t3(lang, "Форматы", "Formats", "合作形式") : t3(lang, "Планы", "Plans", "方案")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      {/* spacer только на мобильных — на десктопе хедер поверх контента без сдвига */}
      <div
        aria-hidden
        className={cx(
          needsSpacer ? "h-[78px] sm:h-[82px]" : "h-0"
        )}
      />

      <header
        className={cx(
          "pointer-events-none fixed inset-x-0 top-0 z-[120] transition-[transform,opacity]",
          // Float via transform (not `top`) so chrome/scroll never fights a top tween (~12–20px jumps)
          hideHeader
            ? "-translate-y-full opacity-0"
            : heroInView && !isMobile
              ? "translate-y-3 opacity-100 sm:translate-y-4"
              : "translate-y-0 opacity-100"
        )}
        style={reducedMotion ? undefined : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)}
      >
        <div className="h-[78px] w-full bg-transparent sm:h-[82px]">
          <Container className="h-full">
            <div
              className={cx(
                "relative flex h-full w-full min-w-0 items-center xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center xl:gap-x-4"
              )}
            >
                {/* LEFT: логотип */}
                <div className={cx("flex min-w-0 items-center gap-3 shrink-0 xl:justify-self-start", !hideHeader && "pointer-events-auto")}>
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
                      src={logoSrc}
                      alt="TIVONIX"
                      className={cx(
                        "w-auto object-contain object-left opacity-95 transition-all hover:opacity-100",
                        "h-9 sm:h-10"
                      )}
                      draggable={false}
                      loading="eager"
                      decoding="async"
                    />
                  </Link>
                </div>

                {/* CENTER: RU/EN на mobile/tablet в hero — на одной линии с лого и бургером */}
                {heroInView && !isPartners ? (
                  <div
                    className={cx(
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:hidden",
                      !hideHeader && "pointer-events-auto"
                    )}
                  >
                    <LangToggle variant="hero" reducedMotion={reducedMotion} />
                  </div>
                ) : null}

                {/* CENTER: навигация (только xl+) + RU/EN рядом с табами */}
                <div
                  className={cx(
                    "relative hidden min-w-0 items-center gap-2 justify-self-center xl:flex",
                    !hideHeader && "pointer-events-auto"
                  )}
                >
                  <PillNav
                    activeKey={activeKey}
                    reducedMotion={reducedMotion}
                    items={tabsItems}
                    onItemClick={onNav}
                    compact={false}
                  />
                  {!isPartners ? (
                    <LangToggle variant="hero" reducedMotion={reducedMotion} />
                  ) : null}
                </div>

                {/* RIGHT: CTA (desktop xl+) */}
                <div className={cx("ml-auto hidden min-w-0 shrink-0 items-center xl:ml-0 xl:flex xl:justify-self-end", !hideHeader && "pointer-events-auto")}>
                  {onPartners ? (
                    <a
                      href={ctaHref}
                      onClick={onPartnersCtaClick}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 font-sans text-[14px] font-medium tracking-normal text-[#070607] no-underline transition hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                    >
                      {ctaTop}
                    </a>
                  ) : (
                    <LeadCTAButton source="header" variant="white" className="h-11 px-7 text-[14px]">
                      {ctaTop}
                    </LeadCTAButton>
                  )}
                </div>

                {/* RIGHT: tablet/mobile (до xl) — CTA + бургер */}
                <div className={cx("ml-auto xl:hidden flex items-center gap-2", !hideHeader && "pointer-events-auto")}>
                  <div className="hidden md:block">
                    {onPartners ? (
                      <a
                        href={ctaHref}
                        onClick={onPartnersCtaClick}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 font-sans text-[13px] font-medium tracking-normal text-[#070607] no-underline transition hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
                      >
                        {ctaTop}
                      </a>
                    ) : (
                      <LeadCTAButton source="header" variant="white" className="h-11 px-6 text-[13px]">
                        {ctaTop}
                      </LeadCTAButton>
                    )}
                  </div>

                  <button
                    ref={burgerRef}
                    type="button"
                    className={cx(
                      "grid place-items-center outline-none border-0",
                      "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                      "h-11 w-11 rounded-2xl",
                      "bg-[#1a1a1a]",
                      "transition-[transform,background-color] duration-200 ease-out",
                      "hover:bg-[#242424]",
                      "active:scale-95",
                      open && "bg-[#242424]"
                    )}
                    aria-label={open ? (t3(lang, "Закрыть меню", "Close menu", "关闭菜单")) : ariaMenu}
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
          </Container>
        </div>
      </header>

      {menuPortalReady && mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}