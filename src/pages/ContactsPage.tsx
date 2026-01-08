// src/pages/ContactsPage.tsx
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Container from "../components/ui/Container";
import Header from "../components/landing/Headerdouble";
import { useLang } from "../i18n/LangProvider";

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

type LangItem = { label: string; sub?: string; glow?: number };

function LangChip({ item }: { item: LangItem }) {
  const chipStyle = s({
    boxShadow: `0 18px 65px rgba(0,0,0,0.55), 0 0 ${(item.glow ?? 16)}px rgba(255,154,61,0.14)`,
  });

  const dotStyle = s({
    background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE2} 100%)`,
    boxShadow: "0 0 0 4px rgba(255,154,61,0.12)",
  });

  return (
    <div
      className={cx(
        "select-none",
        "inline-flex items-center gap-2",
        "rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-2",
        "border border-white/10 bg-black/55 backdrop-blur-xl",
        "shadow-[0_18px_65px_rgba(0,0,0,0.55)]"
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
  const { radius, duration, items, reverse, offsetDeg = -14 } = props;
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
    <div className="absolute left-1/2 top-1/2" style={wrapStyle} aria-hidden="true">
      <div className="absolute inset-0 rounded-full border border-white/8 opacity-60" />
      <div className="absolute inset-0 rounded-full border border-[#FF9A3D]/10 opacity-80 [mask-image:radial-gradient(transparent_52%,black_64%)] [-webkit-mask-image:radial-gradient(transparent_52%,black_64%)]" />

      <div className={cx("absolute inset-0 will-change-transform", reverse ? "orbit-rev" : "orbit")} style={animStyle}>
        {items.map((it, i) => {
          const ang = offsetDeg + i * step + (i % 2 ? 8 : -5);
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
    r1: 260,
    r2: 390,
    r3: 540,
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

      const r1 = Math.floor(sun / 2 + (isPhone ? 44 : 62));
      const r2 = r1 + (isPhone ? 110 : 160);
      const r3 = r2 + (isPhone ? 120 : 190);

      setSState({ isPhone, headerH, side, sun, r1, r2, r3 });
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
  const openTg = isRu ? "Открыть →" : "Open →";
  const sendMail = isRu ? "Отправить →" : "Send →";
  const writeBtn = isRu ? "Написать" : "Write";

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative rounded-full p-[1px] bg-[conic-gradient(from_180deg,rgba(255,154,61,0.0),rgba(255,154,61,0.65),rgba(255,106,26,0.30),rgba(255,154,61,0.0))] shadow-[0_34px_150px_rgba(0,0,0,0.70)]">
        <div className="relative overflow-hidden rounded-full border border-white/10 bg-black/70 backdrop-blur-2xl">
          <div style={sizeStyle} />

          <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="pointer-events-none absolute -inset-12 opacity-80" style={hazeStyle} />

          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="w-full max-w-[260px] text-center">
              <div className="text-[11px] tracking-[0.22em] text-white/45">TIVONIX</div>
              <div className="mt-2 text-[22px] sm:text-[24px] font-[820] tracking-tight text-white/92 leading-[1.1]">
                {title}
              </div>
              <div className="mt-2 text-[12.5px] text-white/62 leading-relaxed">
                {subtitle}
              </div>

              <div className="mt-5">
                <div className="grid gap-2.5 relative z-20 pointer-events-auto">
                  <a
                    href="https://t.me/TIVONIX"
                    target="_blank"
                    rel="noreferrer"
                    className={cx(
                      "group inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3",
                      "border border-white/12 bg-white/[0.05] hover:bg-white/[0.07] transition",
                      "shadow-[0_16px_60px_rgba(0,0,0,0.45)]",
                      "whitespace-nowrap"
                    )}
                  >
                    <span className="inline-flex items-center gap-3 text-white/85">
                      <span className="grid place-items-center h-9 w-9 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,215,176,0.20),rgba(255,154,61,0.18))]">
                        <span className="text-[#FF9A3D]">
                          <IconTG />
                        </span>
                      </span>
                      <span className="text-[13px] font-[780] tracking-tight">Telegram</span>
                    </span>
                    <span className="text-[#FF9A3D]/85 group-hover:text-[#FF6A1A] transition text-[12px] font-[750]">
                      {openTg}
                    </span>
                  </a>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tivoonix@gmail.com&su=%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20(SaaS%2FMVP)"
                    target="_blank"
                    rel="noreferrer"
                    className={cx(
                      "group inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3",
                      "border border-white/12 bg-white/[0.05] hover:bg-white/[0.07] transition",
                      "shadow-[0_16px_60px_rgba(0,0,0,0.45)]",
                      "whitespace-nowrap"
                    )}
                  >
                    <span className="inline-flex items-center gap-3 text-white/85">
                      <span className="grid place-items-center h-9 w-9 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,215,176,0.20),rgba(255,154,61,0.18))]">
                        <span className="text-[#FF9A3D]">
                          <IconMail />
                        </span>
                      </span>
                      <span className="text-[13px] font-[780] tracking-tight">Gmail</span>
                    </span>
                    <span className="text-[#FF9A3D]/85 group-hover:text-[#FF6A1A] transition text-[12px] font-[750]">
                      {sendMail}
                    </span>
                  </a>
                </div>

                <div className="mt-4 relative z-20 pointer-events-auto">
                  <a
                    href="https://t.me/TIVONIX"
                    target="_blank"
                    rel="noreferrer"
                    className={cx(
                      "inline-flex h-11 w-full items-center justify-center rounded-2xl px-6",
                      "text-[14px] font-[800] text-black whitespace-nowrap",
                      "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                      "shadow-[0_18px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition"
                    )}
                  >
                    {writeBtn}
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
  const { headerH, side, sun, r1, r2, r3 } = useSolarLayoutNoScroll();

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

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      <Header />

      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[10px] bg-[linear-gradient(90deg,rgba(255,154,61,0),rgba(255,154,61,0.65),rgba(255,106,26,0))]" />
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

              {/* ✅ кольца ВСЕГДА, даже на телефоне */}
              <OrbitRing radius={r1 + 30} duration={18} items={ring1} offsetDeg={-8} />
              <OrbitRing radius={r2} duration={26} items={ring2} reverse offsetDeg={8} />
              <OrbitRing radius={r3} duration={38} items={ring3} offsetDeg={-18} />

              {/* center */}
              <SunContacts size={Math.round(sun * 1.25)} />

              {/* edge fade */}
              <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_62%,transparent_84%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_62%,transparent_84%)]" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
