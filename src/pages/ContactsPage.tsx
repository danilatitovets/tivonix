// src/pages/ContactsPage.tsx
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Container from "../components/ui/Container";
import Header from "../components/landing/Header";
import { SEO } from "../components/SEO";
import { useLang } from "../i18n/LangProvider";
import { TG_BOT_URL } from "../constants/links";

const ORANGE = "#FF9A3D";
const ORANGE2 = "#FF6A1A";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

type Style = CSSProperties & Record<string, any>;
const s = (v: Record<string, any>) => v as Style;

function useLockPageScroll(lock = true) {
  useEffect(() => {
    if (!lock) return;
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [lock]);
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M4.5 7.5v9a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path
        d="M6 8.5 12 12.5l6-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconTG() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M21 4.6 3.7 11.3c-.9.35-.86 1.63.07 1.92l4.2 1.33 1.64 5.05c.28.88 1.46 1.06 1.98.3l2.32-3.35 4.55 3.32c.7.5 1.7.1 1.88-.75L22 5.5c.2-.96-.76-1.66-1.6-.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path d="M8.1 14.2 19.8 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.65" opacity="0.9" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="17.5" cy="6.5" r="1.35" fill="currentColor" />
    </svg>
  );
}

type LangItem = { label: string; sub?: string; glow?: number };

function LangChip({ item }: { item: LangItem }) {
  const chipStyle = s({
    boxShadow: `0 18px 65px rgba(0,0,0,0.55), 0 0 ${(item.glow ?? 16)}px rgba(255,154,61,0.14)`,
  });

  const dotStyle = s({
    background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE2} 100%)`,
    boxShadow: "0 0 12px rgba(255,154,61,0.35)",
  });

  return (
    <div
      className={cx(
        "select-none",
        "inline-flex items-center gap-2",
        "rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2",
        "bg-white/[0.055] backdrop-blur-xl",
        "shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]"
      )}
      style={chipStyle}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={dotStyle} />
      <div className="leading-tight">
        <div className="text-[11.5px] sm:text-[12px] font-[760] tracking-tight text-white/90">
          {item.label}
        </div>
        {item.sub ? <div className="text-[10px] sm:text-[10.5px] text-white/55">{item.sub}</div> : null}
      </div>
    </div>
  );
}

function OrbitRing(props: {
  radius: number;
  duration: number;
  items: LangItem[];
  reverse?: boolean;
  offsetDeg?: number;
}) {
  const { radius, duration, items, reverse, offsetDeg = 0 } = props;
  const step = 360 / Math.max(1, items.length);
  const size = radius * 2;

  const wrapStyle = s({
    width: size,
    height: size,
    marginLeft: -radius,
    marginTop: -radius,
  });
  const animStyle = s({ animationDuration: `${duration}s` });

  return (
    <div className="absolute left-1/2 top-1/2 z-20" style={wrapStyle} aria-hidden="true">
      {/* тонкая орбита — чипы ровно на этой окружности */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full border border-white/[0.07] bg-transparent"
        style={s({
          boxShadow: "0 0 28px rgba(255,154,61,0.04), inset 0 0 0 1px rgba(255,255,255,0.02)",
        })}
      />

      <div className={cx("absolute inset-0 will-change-transform", reverse ? "orbit-rev" : "orbit")} style={animStyle}>
        {items.map((it, i) => {
          const ang = offsetDeg + i * step;
          const posStyle = s({
            transform: `translate(-50%,-50%) rotate(${ang}deg) translateX(${radius}px) rotate(${-ang}deg)`,
          });
          return (
            <div key={`${it.label}-${i}`} className="absolute left-1/2 top-1/2" style={posStyle}>
              <div className={cx(reverse ? "counter-rev" : "counter")} style={animStyle}>
                <LangChip item={it} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function useSolarLayoutNoScroll() {
  const [sState, setSState] = useState(() => ({
    isPhone: false,
    headerH: 86,
    side: 820,
    sun: 420,
    sunDisplay: 525,
    orbit1: 320,
    orbit2: 450,
    orbit3: 590,
  }));

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const isPhone = w < 640;

      const headerH = isPhone ? 74 : 86;

      const areaH = Math.max(240, h - headerH);
      const areaW = w;

      const side = clamp(Math.min(areaW, areaH) - (isPhone ? 16 : 26), 300, 980);

      const sun = isPhone
        ? clamp(Math.floor(side * 0.86), 320, 520)
        : clamp(Math.floor(side * 0.58), 320, 480);

      const sunDisplay = Math.round(sun * 1.25);
      const planetR = sunDisplay / 2;

      const pad1 = isPhone ? 52 : 68;
      const gap12 = isPhone ? 82 : 108;
      const gap23 = isPhone ? 92 : 124;

      let orbit1 = Math.round(planetR + pad1);
      let orbit2 = orbit1 + gap12;
      let orbit3 = orbit2 + gap23;

      const maxOrbit = Math.floor(side / 2) - (isPhone ? 14 : 22);
      if (orbit3 > maxOrbit) {
        const scale = maxOrbit / orbit3;
        orbit1 = Math.max(Math.round(planetR + (isPhone ? 36 : 48)), Math.round(orbit1 * scale));
        orbit2 = Math.max(orbit1 + (isPhone ? 58 : 72), Math.round(orbit2 * scale));
        orbit3 = maxOrbit;
      }
      if (orbit2 >= orbit3 - 8) orbit2 = orbit3 - (isPhone ? 48 : 62);
      if (orbit1 >= orbit2 - 8) orbit1 = Math.max(Math.round(planetR + 32), orbit2 - (isPhone ? 62 : 78));

      setSState({ isPhone, headerH, side, sun, sunDisplay, orbit1, orbit2, orbit3 });
    };

    calc();
    window.addEventListener("resize", calc, { passive: true });
    return () => window.removeEventListener("resize", calc);
  }, []);

  return sState;
}

/* -------------------- center sun -------------------- */
function SunContacts({ size }: { size: number }) {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const sizeStyle = s({ width: size, height: size });
  const hazeStyle = s({
    background:
      "radial-gradient(300px 240px at 35% 30%, rgba(255,215,176,0.22), transparent 62%)," +
      "radial-gradient(360px 280px at 70% 40%, rgba(255,154,61,0.18), transparent 66%)," +
      "radial-gradient(420px 320px at 45% 80%, rgba(255,106,26,0.12), transparent 70%)",
  });

  const title = isRu ? "Контакты" : "Contacts";
  const subtitle = isRu ? "Напиши — отвечу быстро." : "Send a message — I reply fast.";
  const botCta = isRu ? "Бот для заявок" : "Leads bot";

  /** Фиксированная колонка 36px — иконки строго на одной вертикали во всех рядах */
  const contactRowClass = cx(
    "group grid w-full grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-x-3",
    "min-h-[48px] rounded-2xl px-4 py-2.5",
    "bg-white/[0.06] hover:bg-white/[0.09] transition duration-200",
    "shadow-[0_14px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.07)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/35 focus-visible:ring-offset-0"
  );

  const contactIconWrap = cx(
    "flex h-9 w-9 items-center justify-center justify-self-center rounded-2xl",
    "bg-[linear-gradient(180deg,rgba(255,215,176,0.16),rgba(255,154,61,0.12))]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
  );

  const contactLabelClass =
    "min-w-0 text-left text-[13px] font-[780] leading-none tracking-tight text-white/85";

  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <div className="relative rounded-full shadow-[0_28px_120px_rgba(0,0,0,0.72),0_0_80px_rgba(255,154,61,0.08),0_0_1px_rgba(255,255,255,0.05)]">
        <div className="relative overflow-hidden rounded-full bg-[rgba(8,8,10,0.82)] backdrop-blur-2xl">
          <div style={sizeStyle} />

          <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="pointer-events-none absolute -inset-12 opacity-80" style={hazeStyle} />

          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="w-full max-w-[280px] text-center">
              <div className="text-[11px] tracking-[0.22em] text-white/45">TIVONIX</div>
              <h1 className="mt-2 text-[22px] sm:text-[24px] font-[820] tracking-tight text-white/92 leading-[1.1]">
                {title}
              </h1>
              <div className="mt-2 text-[12.5px] text-white/62 leading-relaxed">
                {subtitle}
              </div>

              <div className="mt-5">
                <div className="grid gap-2.5 relative z-20 pointer-events-auto">
                  <a href="https://t.me/TIVONIX" target="_blank" rel="noopener noreferrer" className={contactRowClass}>
                    <span className={contactIconWrap}>
                      <span className="flex text-[#FF9A3D] [&_svg]:block [&_svg]:shrink-0">
                        <IconTG />
                      </span>
                    </span>
                    <span className={contactLabelClass}>Telegram</span>
                  </a>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tivoonix@gmail.com&su=%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20(SaaS%2FMVP)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactRowClass}
                  >
                    <span className={contactIconWrap}>
                      <span className="flex text-[#FF9A3D] [&_svg]:block [&_svg]:shrink-0">
                        <IconMail />
                      </span>
                    </span>
                    <span className={contactLabelClass}>Gmail</span>
                  </a>

                  <a
                    href="https://www.instagram.com/tivonix.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactRowClass}
                  >
                    <span className={contactIconWrap}>
                      <span className="flex text-[#FF9A3D] [&_svg]:block [&_svg]:shrink-0">
                        <IconInstagram />
                      </span>
                    </span>
                    <span className={contactLabelClass}>Instagram</span>
                  </a>
                </div>

                <div className="mt-4 relative z-20 pointer-events-auto">
                  <a
                    href={TG_BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex min-h-10 w-full items-center justify-center rounded-xl px-4 py-2.5",
                      "text-[13px] font-semibold leading-snug text-black text-center",
                      "bg-[#FF9A3D] hover:bg-[#FFAC5C] active:bg-[#F08A2E]",
                      "transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/50"
                    )}
                  >
                    {botCta}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.55)]" />
        </div>
      </div>
    </div>
  );
}

/* -------------------- page -------------------- */
export default function ContactsPage() {
  useLockPageScroll(true);
  const { lang } = useLang();
  const isRu = lang === "ru";
  const { headerH, side, sun, sunDisplay, orbit1, orbit2, orbit3 } = useSolarLayoutNoScroll();

  const ring1 = useMemo<LangItem[]>(
    () => [
      { label: "React", sub: "UI", glow: 14 },
      { label: "TypeScript", sub: "Types", glow: 16 },
      { label: "Node.js", sub: "API", glow: 14 },
      { label: "SQL", sub: "Data", glow: 12 },
    ],
    []
  );

  const ring2 = useMemo<LangItem[]>(
    () => [
      { label: "Tailwind", sub: "Styles", glow: 16 },
      { label: "Supabase", sub: "DB/Auth", glow: 16 },
      { label: "Docker", sub: "Deploy", glow: 14 },
      { label: "Git", sub: "Flow", glow: 12 },
      { label: "Figma", sub: "Design", glow: 14 },
      { label: "Vite", sub: "Build", glow: 12 },
    ],
    []
  );

  const ring3 = useMemo<LangItem[]>(
    () => [
      { label: "Next.js", sub: "SSR", glow: 14 },
      { label: "Express", sub: "Backend", glow: 12 },
      { label: "PostgreSQL", sub: "DB", glow: 14 },
      { label: "JWT", sub: "Auth", glow: 12 },
      { label: "RLS", sub: "Security", glow: 12 },
      { label: "REST", sub: "API", glow: 12 },
      { label: "CI/CD", sub: "Auto", glow: 12 },
      { label: "Nginx", sub: "Proxy", glow: 12 },
    ],
    []
  );

  const stageStyle = s({ width: side, height: side });

  const seoTitle = isRu ? "Контакты — TIVONIX" : "Contacts — TIVONIX";
  const seoDescription = isRu
    ? "Связаться с TIVONIX: заказать сайт, лендинг, MVP или бота. Telegram и email — ответим быстро."
    : "Contact TIVONIX: website, landing, MVP or bot. Telegram and email — we reply fast.";

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/contacts"
        localizedPath="/contacts"
        ogLocalePrimary={isRu ? "ru_RU" : "en_US"}
      />
      <Header />

      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(255,154,61,0.12),transparent_72%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_12%_12%,rgba(255,154,61,0.18),transparent_60%),radial-gradient(900px_520px_at_88%_18%,rgba(255,106,26,0.14),transparent_62%),radial-gradient(900px_700px_at_55%_80%,rgba(255,154,61,0.10),transparent_65%),linear-gradient(180deg,rgba(0,0,0,0.78),rgba(0,0,0,0.96))]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 [box-shadow:inset_0_0_260px_rgba(0,0,0,0.92)]" />
      </div>

      {/* animations */}
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        @keyframes orbitRev { from { transform: rotate(360deg);} to { transform: rotate(0deg);} }
        @keyframes counter { from { transform: rotate(0deg);} to { transform: rotate(-360deg);} }
        @keyframes counterRev { from { transform: rotate(-360deg);} to { transform: rotate(0deg);} }
        .orbit { animation: orbit linear infinite; }
        .orbit-rev { animation: orbitRev linear infinite; }
        .counter { animation: counter linear infinite; }
        .counter-rev { animation: counterRev linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .orbit, .orbit-rev, .counter, .counter-rev { animation: none !important; }
        }
      `}</style>

      {/* content area under header (no scroll) */}
      <div className="absolute inset-x-0 bottom-0" style={s({ top: headerH })}>
        <div className="h-full w-full grid place-items-center">
          <Container>
            <div className="mx-auto relative" style={stageStyle}>
              {/* glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={s({
                  width: "92%",
                  height: "92%",
                  background:
                    "radial-gradient(circle at 45% 40%, rgba(255,215,176,0.18) 0%, rgba(255,154,61,0.14) 28%, rgba(255,106,26,0.10) 46%, rgba(0,0,0,0) 70%)",
                  filter: "blur(2px)",
                })}
              />

              {/* три концентрические орбиты — радиусы от реального размера «планеты» */}
              <OrbitRing radius={orbit1} duration={22} items={ring1} offsetDeg={-12} />
              <OrbitRing radius={orbit2} duration={32} items={ring2} reverse offsetDeg={18} />
              <OrbitRing radius={orbit3} duration={46} items={ring3} offsetDeg={-28} />

              <SunContacts size={sunDisplay} />

              {/* мягкое затухание края сцены; z ниже орбит — чипы не прячутся под маской */}
              <div className="pointer-events-none absolute inset-0 z-[12] [mask-image:radial-gradient(circle_at_center,black_0%,black_78%,transparent_97%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_0%,black_78%,transparent_97%)]" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
