// src/components/landing/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { Button } from "../ui/Button";
import { useLang, type Lang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type NavKey = "contacts" | "projects" | "faq";
type NavItem = { to: string; key: NavKey };

const NAV: NavItem[] = [
  { to: "/contacts", key: "contacts" },
  { to: "/projects", key: "projects" },
  { to: "#faq", key: "faq" },
];

const ORANGE_STATIC =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";

const BRAND_CTA =
  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";

const BAR_H = 76;

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
            ? "border-white/18 bg-white/10 text-white"
            : "border-white/10 bg-black/20 text-white/70 hover:text-white hover:bg-white/5"
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
            ? "border-white/18 bg-white/10 text-white"
            : "border-white/10 bg-black/20 text-white/70 hover:text-white hover:bg-white/5"
        )}
      >
        EN
      </button>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

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

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const y = window.scrollY + r.top - (BAR_H + 10);
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const onNav = (to: string) => (e: React.MouseEvent) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const id = to.slice(1);

      if (location.pathname !== "/") {
        navigate("/");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => scrollToId(id))
        );
      } else {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => scrollToId(id))
        );
      }
      return;
    }

    setOpen(false);
  };

  const goStart = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLabel = (key: NavKey) => {
    if (isRu) {
      if (key === "contacts") return "контакты";
      if (key === "projects") return "проекты";
      if (key === "faq") return "FAQ";
    } else {
      if (key === "contacts") return "contacts";
      if (key === "projects") return "projects";
      if (key === "faq") return "FAQ";
    }
    return key;
  };

  const ctaText = isRu ? "Начать" : "Get started";
  const ariaHome = isRu ? "На главную" : "Go to home";
  const ariaMenu = isRu ? "Меню" : "Menu";

  return (
    <>
      <div aria-hidden className="h-[76px]" />

      <div className="fixed inset-x-0 top-0 z-50">
        <div className="border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <Container>
            <div className="flex items-center justify-between py-4">
              <Link
                to="/"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
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

              <div className="hidden md:flex items-center gap-3 text-sm text-white/70">
                {NAV.map((it) =>
                  it.to.startsWith("#") ? (
                    <a
                      key={it.to}
                      href={it.to}
                      onClick={onNav(it.to)}
                      className="px-3 py-2 hover:text-white transition-colors"
                    >
                      {navLabel(it.key)}
                    </a>
                  ) : (
                    <Link
                      key={it.to}
                      to={it.to}
                      onClick={onNav(it.to)}
                      className="px-3 py-2 hover:text-white transition-colors"
                    >
                      {navLabel(it.key)}
                    </Link>
                  )
                )}

                <LangToggle />

                <Button
                  onClick={goStart}
                  className={cx(
                    "ml-1 h-10 rounded-full px-5 font-semibold",
                    "!text-black",
                    "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                    "hover:brightness-[1.04] active:brightness-[0.96]"
                  )}
                  style={{ background: BRAND_CTA } as any}
                >
                  {ctaText}
                </Button>
              </div>

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
                      transform: open
                        ? "translateY(-5px) rotate(-45deg)"
                        : "none",
                      transition: "transform 220ms ease",
                    }}
                  />
                </svg>
              </button>
            </div>
          </Container>

          <div className="pointer-events-none relative -mb-3 h-6">
            <div
              className="mx-auto h-[2px] w-[min(720px,88%)] rounded-full opacity-95"
              style={{ background: ORANGE_STATIC } as any}
            />
            <div
              className="mx-auto mt-[-2px] h-6 w-[min(720px,88%)] blur-2xl opacity-45"
              style={{ background: ORANGE_STATIC } as any}
            />
          </div>

          <div
            className={cx(
              "md:hidden overflow-hidden border-t border-white/5 bg-black/55 backdrop-blur-2xl",
              "transition-[max-height,opacity] duration-300",
              open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <Container>
              <div className="py-4">
                <div className="flex flex-col gap-1 text-sm text-white/75">
                  {NAV.map((it) =>
                    it.to.startsWith("#") ? (
                      <a
                        key={it.to}
                        href={it.to}
                        onClick={onNav(it.to)}
                        className="rounded-2xl px-3 py-3 transition hover:bg-white/5 hover:text-white"
                      >
                        {navLabel(it.key)}
                      </a>
                    ) : (
                      <Link
                        key={it.to}
                        to={it.to}
                        onClick={onNav(it.to)}
                        className="rounded-2xl px-3 py-3 transition hover:bg-white/5 hover:text-white"
                      >
                        {navLabel(it.key)}
                      </Link>
                    )
                  )}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <LangToggle compact />
                  <Button
                    onClick={goStart}
                    className={cx(
                      "flex-1 h-11 rounded-2xl font-semibold",
                      "!text-black",
                      "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                      "hover:brightness-[1.04] active:brightness-[0.96]"
                    )}
                    style={{ background: BRAND_CTA } as any}
                  >
                    {ctaText}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
