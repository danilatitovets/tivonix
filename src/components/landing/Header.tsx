// src/components/landing/Header.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import { Button } from "../ui/Button";
import CurtainContent from "./CurtainContent";
import { useLang, type Lang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ============ Language Toggle UI ============ */

function LangToggle({
  lang,
  onChange,
  compact,
  label,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  compact?: boolean;
  label: string;
}) {
  const baseBtn =
    "h-9 rounded-full px-3 text-xs font-semibold transition border";
  const wrap = compact
    ? "flex items-center gap-1"
    : "flex items-center gap-1 mr-2";

  return (
    <div className={wrap} aria-label={label}>
      <button
        type="button"
        onClick={() => onChange("ru")}
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
        onClick={() => onChange("en")}
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

/* ================= effects config ================= */

type NavKey = "contacts" | "projects" | "faq";
type NavItem = { to: string; key: NavKey };

const NAV: NavItem[] = [
  { to: "/contacts", key: "contacts" },
  { to: "/projects", key: "projects" },
  { to: "#faq", key: "faq" },
];

// ✅ через сколько px от ВЕРХА страницы начинается опускание
const START_AFTER = 350;
// ✅ опускание (0 → vh) на этом диапазоне
const OPEN_RANGE = 900;
// ✅ пауза, когда полностью открыта
const HOLD_PX = 500;
// ✅ подъем (vh → 0) на этом диапазоне
const CLOSE_RANGE = 800;

const BAR_H = 76;
const PLANET_BG = "/images/PLANET.png";

// линии
const ORANGE_STATIC =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";
const ORANGE_LEFT =
  "linear-gradient(90deg, rgba(255,150,64,0) 0%, rgba(255,120,40,0.95) 55%, rgba(255,196,120,1) 100%)";
const ORANGE_RIGHT =
  "linear-gradient(90deg, rgba(255,196,120,1) 0%, rgba(255,120,40,0.95) 45%, rgba(255,150,64,0) 100%)";

// ✅ наш градиент для CTA
const BRAND_CTA =
  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";

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

type AshParticle = {
  id: string;
  top: number;
  size: number;
  blur: number;
  op: number;
  dur: number;
  delay: number;
  y: number;
  float: number;
};

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Header() {
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  const { lang, setLang, dict } = useLang();
  const tHeader = dict.header;

  const [openRaw, setOpenRaw] = useState(0);
  const [closeRaw, setCloseRaw] = useState(0);

  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 900
  );

  const rafRef = useRef<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onResize = () => {
      setVh(window.innerHeight);
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // закрыть моб.меню по Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const getY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      (document.body ? (document.body as any).scrollTop : 0) ||
      0;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const y = getY();
        const shifted = y - START_AFTER;

        if (shifted <= 0) {
          setOpenRaw(0);
          setCloseRaw(0);
          return;
        }

        const oR = clamp(shifted / OPEN_RANGE, 0, 1);
        const closeStart = OPEN_RANGE + HOLD_PX;
        const cR = clamp((shifted - closeStart) / CLOSE_RANGE, 0, 1);

        setOpenRaw(oR);
        setCloseRaw(cR);

        // если начала ехать шторка — закрываем моб.меню
        if (oR > 0.03) setOpen(false);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const openP = reducedMotion ? openRaw : easeOutCubic(openRaw);
  const closeP = reducedMotion ? closeRaw : easeOutCubic(closeRaw);

  const curtainFactor = clamp(openP * (1 - closeP), 0, 1);
  const curtainVisible = curtainFactor > 0.001;

  const curtainH = useMemo(() => {
    if (!curtainVisible) return 0;
    const target = Math.max(vh, BAR_H);
    return lerp(0, target, curtainFactor);
  }, [curtainVisible, curtainFactor, vh]);

  const fullyOpen = openRaw >= 0.999 && closeRaw < 0.02;

  const headerHide = curtainVisible
    ? clamp(openP * 18, 0, 1) * clamp(1 - closeP * 1.2, 0, 1)
    : 0;

  const blurPx = 10 + 14 * curtainFactor;
  const topA = lerp(0.4, 0.72, curtainFactor);
  const bottomA = lerp(0.52, 0.82, curtainFactor);

  const staticLineOpacity = clamp(1 - curtainFactor * 1.2, 0, 1);

  const baseLine = 0.38;
  const lineScale = lerp(baseLine, 1, curtainFactor);
  const lineScaleStr = lineScale.toFixed(4);

  const ash = useMemo<AshParticle[]>(() => {
    if (reducedMotion) return [];
    const rnd = mulberry32(1337);
    const count = 60;
    const out: AshParticle[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        id: `ash-${i}`,
        top: 4 + rnd() * 92,
        size: 1 + Math.round(rnd() * 3),
        blur: rnd() * 1.8,
        op: 0.14 + rnd() * 0.55,
        dur: 10 + rnd() * 18,
        delay: rnd() * 20,
        y: -10 + rnd() * 20,
        float: 2.2 + rnd() * 4.4,
      });
    }
    return out;
  }, [reducedMotion]);

  const curtainStyle: CSSProperties = {
    height: `${curtainH}px`,
    opacity: curtainVisible ? 1 : 0,
    willChange: "height, opacity",
  };

  const planetImgStyle: CSSProperties = {
    opacity: 0.85,
    filter: "blur(0.9px) saturate(1.35) contrast(1.22) brightness(1.18)",
    transform: "scale(1.08)",
    mixBlendMode: "screen" as any,
  };

  const dotsStyle: CSSProperties = {
    opacity: 0.04 + 0.08 * curtainFactor,
  };

  const lineLeftTransformStyle: CSSProperties = {
    transform: `scaleX(${lineScaleStr})`,
  };
  const lineRightTransformStyle: CSSProperties = {
    transform: `scaleX(${lineScaleStr})`,
  };

  const lineLeftBarStyle: CSSProperties = {
    backgroundImage: ORANGE_LEFT,
    backgroundSize: "220% 100%",
    animation: reducedMotion ? "none" : "lineFlow 2.2s linear infinite",
  };

  const lineRightBarStyle: CSSProperties = {
    backgroundImage: ORANGE_RIGHT,
    backgroundSize: "220% 100%",
    animation: reducedMotion ? "none" : "lineFlow 2.2s linear infinite",
  };

  const goStart = () => {
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      const id = to.replace("#", "");
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
      return;
    }
    setOpen(false);
  };

  const Logo = (
    <Link
      to="/"
      onClick={() => {
        setOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group flex items-center gap-3"
      aria-label={tHeader.home}
    >
      <img
        src="/images/tivonix-logo-lockup.png"
        alt="TIVONIX"
        className="block h-9 sm:h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
        draggable={false}
      />
    </Link>
  );

  return (
    <>
      <style>{`
        @keyframes textPop {
          0% { opacity: 0; transform: translateY(14px) scale(.985); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes lineFlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 220% 50%; }
        }
        @keyframes ashDrift {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(160vw, 0, 0); }
        }
        @keyframes ashFloat {
          0%   { transform: translate3d(0, calc(var(--y) - 6px), 0) rotate(0deg); }
          50%  { transform: translate3d(0, calc(var(--y) + 6px), 0) rotate(160deg); }
          100% { transform: translate3d(0, calc(var(--y) - 6px), 0) rotate(320deg); }
        }
        .ash {
          position: absolute;
          left: -35vw;
          width: var(--size);
          height: var(--size);
          opacity: var(--op);
          filter: blur(var(--blur));
          animation: ashDrift var(--dur) linear infinite;
          animation-delay: calc(var(--delay) * -1s);
          will-change: transform;
          mix-blend-mode: screen;
        }
        .ash > i {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%,
            rgba(255,235,215,0.90) 0%,
            rgba(255,160,90,0.60) 45%,
            rgba(255,120,40,0.12) 70%,
            rgba(255,120,40,0.00) 100%);
          animation: ashFloat var(--float) ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* spacer под fixed header */}
      <div aria-hidden className="h-[76px]" />

      {/* TOP BAR */}
      <div
        className="fixed inset-x-0 top-0 z-50"
        style={
          {
            opacity: 1 - headerHide,
            pointerEvents: headerHide > 0.92 ? "none" : "auto",
            transition: "opacity 120ms linear",
          } as CSSProperties
        }
      >
        <div className="border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <Container>
            <div className="flex items-center justify-between py-4">
              {Logo}

              {/* desktop nav */}
              <div className="hidden md:flex items-center gap-2 text-sm text-white/70">
                {NAV.map((it) =>
                  it.to.startsWith("#") ? (
                    <a
                      key={it.to}
                      href={it.to}
                      onClick={onNav(it.to)}
                      className="px-3 py-2 hover:text-white transition-colors"
                    >
                      {tHeader.nav[it.key]}
                    </a>
                  ) : (
                    <Link
                      key={it.to}
                      to={it.to}
                      onClick={onNav(it.to)}
                      className="px-3 py-2 hover:text-white transition-colors"
                    >
                      {tHeader.nav[it.key]}
                    </Link>
                  )
                )}

                <LangToggle
                  lang={lang}
                  onChange={setLang}
                  label={tHeader.language}
                />

                <Button
                  onClick={goStart}
                  className={cx(
                    "ml-2 h-10 rounded-full px-5 font-semibold",
                    "!text-black",
                    "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                    "hover:brightness-[1.04] active:brightness-[0.96]"
                  )}
                  style={{ background: BRAND_CTA } as CSSProperties}
                >
                  {tHeader.start}
                </Button>
              </div>

              {/* mobile burger */}
              <button
                type="button"
                className={cx(
                  "md:hidden grid place-items-center",
                  "h-11 w-11 rounded-2xl",
                  "border border-white/12 bg-black/35 backdrop-blur-xl",
                  "active:scale-[0.98] transition"
                )}
                aria-label={tHeader.menu}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                {/* бургер -> крест */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7H20"
                    stroke="#FF9A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={
                      {
                        transformOrigin: "12px 7px",
                        transform: open
                          ? "translateY(5px) rotate(45deg)"
                          : "none",
                        transition: "transform 220ms ease",
                      } as any
                    }
                  />
                  <path
                    d="M4 12H20"
                    stroke="#FF9A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={
                      {
                        opacity: open ? 0 : 1,
                        transition: "opacity 160ms ease",
                      } as any
                    }
                  />
                  <path
                    d="M4 17H20"
                    stroke="#FF9A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={
                      {
                        transformOrigin: "12px 17px",
                        transform: open
                          ? "translateY(-5px) rotate(-45deg)"
                          : "none",
                        transition: "transform 220ms ease",
                      } as any
                    }
                  />
                </svg>
              </button>
            </div>
          </Container>

          {/* линия под баром */}
          <div
            className="pointer-events-none relative -mb-3 h-6"
            style={{ opacity: staticLineOpacity } as CSSProperties}
          >
            <div
              className="mx-auto h-[2px] w-[min(720px,88%)] rounded-full opacity-95"
              style={{ background: ORANGE_STATIC } as CSSProperties}
            />
            <div
              className="mx-auto mt-[-2px] h-6 w-[min(720px,88%)] blur-2xl opacity-45"
              style={{ background: ORANGE_STATIC } as CSSProperties}
            />
          </div>

          {/* mobile dropdown */}
          <div
            className={cx(
              "md:hidden overflow-hidden border-t border-white/5 bg-black/55 backdrop-blur-2xl transition-[max-height,opacity] duration-300",
              open && !curtainVisible
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
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
                        className="rounded-2xl px-3 py-3 transition hover:bg:white/5 hover:text-white"
                      >
                        {tHeader.nav[it.key]}
                      </a>
                    ) : (
                      <Link
                        key={it.to}
                        to={it.to}
                        onClick={onNav(it.to)}
                        className="rounded-2xl px-3 py-3 transition hover:bg-white/5 hover:text-white"
                      >
                        {tHeader.nav[it.key]}
                      </Link>
                    )
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-white/60">
                    {tHeader.language}
                  </div>
                  <LangToggle
                    lang={lang}
                    onChange={setLang}
                    compact
                    label={tHeader.language}
                  />
                </div>

                <div className="mt-4">
                  <Button
                    onClick={goStart}
                    className={cx(
                      "w-full h-11 rounded-2xl font-semibold",
                      "!text-black",
                      "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                      "hover:brightness-[1.04] active:brightness-[0.96]"
                    )}
                    style={{ background: BRAND_CTA } as CSSProperties}
                  >
                    {tHeader.start}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>

      {/* ШТОРКА */}
      <div
        className={cx(
          "fixed inset-x-0 top-0 z-40 overflow-hidden",
          curtainVisible ? "" : "pointer-events-none"
        )}
        style={curtainStyle}
        aria-hidden={!curtainVisible}
      >
        <div className="absolute inset-0 z-[0]">
          <img
            src={PLANET_BG}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={planetImgStyle}
          />
        </div>

        <div
          className="absolute inset-0 z-[1]"
          style={
            {
              background: `linear-gradient(180deg,
                rgba(0,0,0,${topA.toFixed(3)}) 0%,
                rgba(0,0,0,${bottomA.toFixed(3)}) 100%)`,
              backdropFilter: `blur(${blurPx.toFixed(2)}px) saturate(1.15)`,
              WebkitBackdropFilter: `blur(${blurPx.toFixed(2)}px) saturate(1.15)`,
            } as CSSProperties
          }
        />

        <div
          className="pointer-events-none absolute inset-0 z-[2] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:18px_18px]"
          style={dotsStyle}
        />

        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-0 z-[3]">
            {ash.map((pp) => (
              <span
                key={pp.id}
                className="ash"
                style={
                  {
                    top: `${pp.top}%`,
                    ["--size" as any]: `${pp.size}px`,
                    ["--blur" as any]: `${pp.blur}px`,
                    ["--op" as any]: pp.op,
                    ["--dur" as any]: `${pp.dur}s`,
                    ["--delay" as any]: pp.delay,
                    ["--y" as any]: `${pp.y}px`,
                    ["--float" as any]: `${pp.float}s`,
                  } as any
                }
              >
                <i />
              </span>
            ))}
          </div>
        )}

        <div className="relative z-[10] h-full">
          <Container>
            <div className="h-full flex items-start justify-center pt-24 md:pt-32">
              <div
                className={cx(
                  "mx-auto w-full max-w-[980px]",
                  fullyOpen ? "opacity-100" : "opacity-0"
                )}
                style={
                  {
                    animation: fullyOpen ? "textPop 520ms ease-out both" : "none",
                    pointerEvents: fullyOpen ? "auto" : "none",
                  } as CSSProperties
                }
              >
                <CurtainContent />
              </div>
            </div>
          </Container>

          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="h-[2px] w-full bg-white/10" />

            <div className="mt-[-2px] h-[2px] w-full flex overflow-hidden">
              <div
                className="h-[2px] w-1/2 origin-right will-change-transform"
                style={lineLeftTransformStyle}
              >
                <div className="h-full" style={lineLeftBarStyle} />
              </div>
              <div
                className="h-[2px] w-1/2 origin-left will-change-transform"
                style={lineRightTransformStyle}
              >
                <div className="h-full" style={lineRightBarStyle} />
              </div>
            </div>

            <div className="mt-[-2px] h-10 w-full flex overflow-hidden blur-2xl opacity-55">
              <div
                className="h-10 w-1/2 origin-right will-change-transform"
                style={lineLeftTransformStyle}
              >
                <div className="h-full" style={lineLeftBarStyle} />
              </div>
              <div
                className="h-10 w-1/2 origin-left will-change-transform"
                style={lineRightTransformStyle}
              >
                <div className="h-full" style={lineRightBarStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
