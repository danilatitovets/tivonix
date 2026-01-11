// src/components/landing/Header.tsx
import React, { useEffect, useMemo, useState } from "react";
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

const ORANGE_STATIC =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";

const BRAND_CTA =
  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";

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

function LangToggle({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const baseBtn =
    "h-9 rounded-full px-3 text-xs font-semibold transition border";
  const wrap = compact
    ? "flex items-center gap-1"
    : "flex items-center gap-1 mr-2";

  const label = lang === "ru" ? "Выбор языка" : "Language";

  return (
    <div className={wrap} aria-label={label}>
      <button
        type="button"
        onClick={() => setLang("ru" as Lang)}
        className={cx(
          baseBtn,
          lang === "ru"
            ? "border-white/16 bg-white/10 text-white"
            : "border-white/10 bg-black/25 text-white/70 hover:text-white hover:bg-white/5"
        )}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => setLang("en" as Lang)}
        className={cx(
          baseBtn,
          lang === "en"
            ? "border-white/16 bg-white/10 text-white"
            : "border-white/10 bg-black/25 text-white/70 hover:text-white hover:bg-white/5"
        )}
      >
        EN
      </button>
    </div>
  );
}

/** SaaS segmented tabs без оранжевой точки */
function SaaSTabs({
  activeKey,
  items,
  onItemClick,
  reducedMotion,
}: {
  activeKey: NavKey;
  items: Array<{ key: NavKey; label: string; to: string }>;
  onItemClick: (to: string) => (e: React.MouseEvent) => void;
  reducedMotion: boolean;
}) {
  const dur = 240;

  return (
    <div
      className={cx(
        "relative inline-flex items-center gap-1 rounded-full",
        "border border-white/10 bg-white/[0.06] backdrop-blur-xl p-1",
        "shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/5"
      )}
      role="navigation"
      aria-label="Header navigation"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      />

      {items.map((it) => {
        const isActive = it.key === activeKey;

        return (
          <Link
            key={it.key}
            to={it.to}
            onClick={onItemClick(it.to)}
            aria-current={isActive ? "page" : undefined}
            className={cx(
              "relative h-9 rounded-full px-4 text-xs font-semibold transition flex items-center gap-2 select-none",
              isActive
                ? "text-white bg-white/10 border border-white/14 shadow-[0_10px_30px_rgba(0,0,0,0.30)]"
                : "text-white/72 hover:text-white hover:bg-white/5 border border-transparent"
            )}
            style={
              reducedMotion
                ? undefined
                : ({ transitionDuration: `${dur}ms` } as React.CSSProperties)
            }
          >
            <span className="leading-none">{it.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  const reducedMotion = usePrefersReducedMotion();

  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLang();
  const isRu = lang === "ru";

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  const ctaText = isRu ? "Начать" : "Get started";
  const ariaHome = isRu ? "На главную" : "Go to home";
  const ariaMenu = isRu ? "Меню" : "Menu";

  const activeKey: NavKey = useMemo(() => {
    if (location.pathname === "/contacts") return "contacts";
    if (location.pathname === "/projects") return "projects";
    return "home";
  }, [location.pathname]);

  const onNav = (to: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (to === "/") {
      e.preventDefault();
      if (location.pathname !== "/") navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goStart = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openStartModal = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStartOpen(true);
  };

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

  return (
    <>
      {/* spacer под фикс-хедер + табы */}
      <div aria-hidden className="h-[112px]" />

      <div className="fixed inset-x-0 top-0 z-50">
        {/* верхний бар + оранжевая линия */}
        <div className="border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <Container>
            <div className="flex items-center justify-between py-4">
              {/* Brand */}
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  goStart();
                }}
                className="group flex items-center gap-3"
                aria-label={ariaHome}
              >
                <div className="relative h-10 w-10 rounded-2xl border border-white/12 bg-white/5 backdrop-blur grid place-items-center overflow-hidden sm:hidden">
                  <img
                    src="/images/tivonix-logo-icon.png"
                    alt="TIVONIX"
                    className="h-6 w-6 opacity-90"
                    draggable={false}
                  />
                </div>

                <img
                  src="/images/tivonix-logo-lockup.png"
                  alt="TIVONIX"
                  className="hidden sm:block h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  draggable={false}
                />
              </Link>

              {/* Desktop right side: язык + CTA */}
              <div className="hidden md:flex items-center gap-3">
                <LangToggle />

                <Button
                  onClick={openStartModal}
                  className={cx(
                    "ml-1 h-10 rounded-full px-5 font-semibold",
                    "!text-black",
                    "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                    "hover:brightness-[1.04] active:brightness-[0.96]"
                  )}
                  style={{ background: BRAND_CTA } as React.CSSProperties}
                >
                  {ctaText}
                </Button>
              </div>

              {/* Mobile burger */}
              <button
                type="button"
                className={cx(
                  "md:hidden grid place-items-center",
                  "h-11 w-11 rounded-2xl",
                  "border border-white/12 bg-black/35 backdrop-blur-xl",
                  "active:scale-[0.98] transition"
                )}
                aria-label={ariaMenu}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
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
          </Container>

          {/* оранжевая линия под баром */}
          <div className="pointer-events-none relative -mb-3 h-6">
            <div
              className="mx-auto h-[2px] w-[min(720px,88%)] rounded-full opacity-95"
              style={{ background: ORANGE_STATIC } as React.CSSProperties}
            />
            <div
              className="mx-auto mt-[-2px] h-6 w-[min(720px,88%)] blur-2xl opacity-45"
              style={{ background: ORANGE_STATIC } as React.CSSProperties}
            />
          </div>

          {/* Mobile dropdown под линией */}
          <div
            className={cx(
              "md:hidden overflow-hidden border-t border-white/5 bg-black/55 backdrop-blur-2xl",
              "transition-[max-height,opacity] duration-300",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <Container>
              <div className="py-4">
                <div className="flex justify-center">
                  <SaaSTabs
                    activeKey={activeKey}
                    reducedMotion={reducedMotion}
                    items={tabsItems}
                    onItemClick={(to) => (e) => {
                      onNav(to)(e);
                      setOpen(false);
                    }}
                  />
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <LangToggle compact />
                  <Button
                    onClick={openStartModal}
                    className={cx(
                      "flex-1 h-11 rounded-2xl font-semibold",
                      "!text-black",
                      "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                      "hover:brightness-[1.04] active:brightness-[0.96]"
                    )}
                    style={{ background: BRAND_CTA } as React.CSSProperties}
                  >
                    {ctaText}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* DESKTOP: табы по центру ниже оранжевой линии */}
        <div className="hidden md:block bg-transparent pt-2 pb-4">
          <Container>
            <div className="flex justify-center">
              <SaaSTabs
                activeKey={activeKey}
                reducedMotion={reducedMotion}
                items={tabsItems}
                onItemClick={onNav}
              />
            </div>
          </Container>
        </div>
      </div>

      {/* Modal */}
      <StartModal open={startOpen} onClose={() => setStartOpen(false)} />
    </>
  );
}
