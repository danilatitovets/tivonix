// src/components/landing/WhyUs.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

const STICKY_TOP = 96;
const MOBILE_STICKY_TOP = "calc(var(--header-h, 72px) + 10px)";

// твой файл: public/images/hero.png
const HERO_IMG = "/images/hero.png";

type Tech = {
  id: string;
  label: string;
  sub: string;
  accent: string;
  mark: React.ReactNode;
  kind?: "lang" | "default";
};

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

function ReactAtomMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="opacity-95"
    >
      <circle cx="12" cy="12" r="1.8" fill="rgba(255,255,255,.92)" />
      <path
        d="M12 3.5c2.8 0 5.2 3.8 5.2 8.5S14.8 20.5 12 20.5 6.8 16.7 6.8 12 9.2 3.5 12 3.5Z"
        stroke="rgba(255,255,255,.82)"
        strokeWidth="1.2"
      />
      <path
        d="M4.2 7.2c1.4-2.4 5.9-1.7 10 1.0s6.4 7.1 5 9.5-5.9 1.7-10-1.0-6.4-7.1-5-9.5Z"
        stroke="rgba(255,255,255,.72)"
        strokeWidth="1.2"
      />
      <path
        d="M4.2 16.8c-1.4-2.4 0.9-6.8 5-9.5s8.6-3.4 10-1.0-.9 6.8-5 9.5-8.6 3.4-10 1.0Z"
        stroke="rgba(255,255,255,.62)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function MarkText({ s }: { s: string }) {
  return (
    <div className="text-[11px] font-extrabold tracking-[0.18em] text-white/90 uppercase">
      {s}
    </div>
  );
}

function LangChip({ s }: { s: string }) {
  return (
    <div className="rounded-full border border-white/18 bg-white/7 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.16em] text-white/85 uppercase">
      {s}
    </div>
  );
}

function ProgressBar({
  progress,
  height,
  thin = false,
}: {
  progress: number; // 0..1
  height: number;
  thin?: boolean;
}) {
  const w = thin ? 12 : 16;
  const knobY = `${clamp(progress, 0, 1) * 100}%`;

  return (
    <div className="relative flex justify-center" style={{ height, width: w }}>
      <div className="absolute inset-y-0 w-[2px] rounded-full bg-white/10" />

      <div className="absolute bottom-0 w-[4px] -translate-x-[1px] overflow-hidden rounded-full bg-white/5">
        <div
          className="w-full"
          style={{
            height: `${clamp(progress, 0, 1) * 100}%`,
            background: "linear-gradient(to top, #F97316 0%, #9CA3AF 100%)",
          }}
        />
      </div>

      <div
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/45 bg-black/80"
        style={{ top: knobY, marginTop: -6 }}
      />
    </div>
  );
}

function TechCard({
  tech,
  setRef,
  active,
  index,
  reveal,
  stackLabel,
}: {
  tech: Tech;
  setRef: (el: HTMLDivElement | null) => void;
  active: boolean;
  index: number;
  reveal: boolean;
  stackLabel: string;
}) {
  const isLang = tech.kind === "lang";

  return (
    <div
      ref={setRef}
      className="relative"
      style={{
        transition: "transform .45s cubic-bezier(.2,.9,.2,1), opacity .4s ease",
      }}
    >
      <div
        className={[
          "relative overflow-hidden rounded-[22px] border px-5 py-4 sm:px-6 sm:py-5",
          active ? "border-[#F97316]/70 bg-black/80" : "border-white/12 bg-black/70",
        ].join(" ")}
        style={
          {
            opacity: reveal ? 1 : 0,
            transform: reveal ? "translateY(0)" : "translateY(16px)",
            transitionDelay: `${index * 40}ms`,
          } as CSSProperties
        }
      >
        {/* ФОН КАРТОЧКИ */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${HERO_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              filter: "blur(3px)",
              opacity: 0.85,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.36) 80%, rgba(0,0,0,0.10) 100%)",
            }}
          />
        </div>

        {/* Верхняя линия (без анимации) */}
        <div className="relative mb-3 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full"
            style={{
              width: "55%",
              background: "linear-gradient(to right, #9CA3AF 0%, #F97316 100%)",
              opacity: active ? 0.65 : 0.35,
              transition: "opacity .25s ease",
            }}
          />
        </div>

        {/* Контент */}
        <div className="relative flex items-start gap-4">
          {isLang ? (
            <div className="pt-0.5">
              <LangChip s={tech.id.toUpperCase()} />
            </div>
          ) : (
            <div
              className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border bg-black/80"
              style={{
                borderColor: active
                  ? "rgba(249,115,22,.18)"
                  : "rgba(255,255,255,.14)",
              }}
            >
              <div
                className="absolute inset-0 opacity-70"
                style={{ background: tech.accent }}
              />
              <div className="absolute inset-px rounded-[18px] bg-black/75" />
              <div className="relative flex h-full w-full items-center justify-center">
                {tech.mark}
              </div>
            </div>
          )}

          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[15px] font-semibold text-white/95">
                {tech.label}
              </div>

              {isLang && (
                <div className="rounded-full border border-white/12 bg-black/45 px-2 py-1 text-[10px] font-semibold tracking-[0.12em] text-white/55 uppercase">
                  language
                </div>
              )}
            </div>

            <div className="text-[13px] leading-relaxed text-white/60">
              {tech.sub}
            </div>
          </div>
        </div>

        {/* Низ — только подпись стека, без 01/10 */}
        <div className="relative mt-4 flex items-center justify-start text-[11px] tracking-[0.14em] uppercase text-white/35">
          <span>{stackLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { dict } = useLang();
  const w = dict.whyUs;

  const BG = "#000000";

  const techs = useMemo<Tech[]>(
    () => [
      {
        id: "react",
        label: w.techs.react.label,
        sub: w.techs.react.sub,
        accent: "linear-gradient(135deg,#4ADE80 0%,#22C55E 100%)",
        mark: <ReactAtomMark />,
        kind: "default",
      },
      {
        id: "ts",
        label: w.techs.ts.label,
        sub: w.techs.ts.sub,
        accent: "transparent",
        mark: <span className="sr-only">TS</span>,
        kind: "lang",
      },
      {
        id: "js",
        label: w.techs.js.label,
        sub: w.techs.js.sub,
        accent: "transparent",
        mark: <span className="sr-only">JS</span>,
        kind: "lang",
      },
      {
        id: "node",
        label: w.techs.node.label,
        sub: w.techs.node.sub,
        accent: "linear-gradient(135deg,#34D399 0%,#10B981 100%)",
        mark: <MarkText s="NODE" />,
        kind: "default",
      },
      {
        id: "express",
        label: w.techs.express.label,
        sub: w.techs.express.sub,
        accent: "linear-gradient(135deg,#9CA3AF 0%,#6B7280 100%)",
        mark: <MarkText s="EX" />,
        kind: "default",
      },
      {
        id: "supabase",
        label: w.techs.supabase.label,
        sub: w.techs.supabase.sub,
        accent: "linear-gradient(135deg,#22C55E 0%,#16A34A 100%)",
        mark: <MarkText s="SB" />,
        kind: "default",
      },
      {
        id: "postgres",
        label: w.techs.postgres.label,
        sub: w.techs.postgres.sub,
        accent: "linear-gradient(135deg,#38BDF8 0%,#0EA5E9 100%)",
        mark: <MarkText s="PG" />,
        kind: "default",
      },
      {
        id: "tailwind",
        label: w.techs.tailwind.label,
        sub: w.techs.tailwind.sub,
        accent: "linear-gradient(135deg,#2DD4BF 0%,#14B8A6 100%)",
        mark: <MarkText s="TW" />,
        kind: "default",
      },
      {
        id: "saas",
        label: w.techs.saas.label,
        sub: w.techs.saas.sub,
        accent: "linear-gradient(135deg,#F97316 0%,#EA580C 100%)",
        mark: <MarkText s="UI" />,
        kind: "default",
      },
      {
        id: "perf",
        label: w.techs.perf.label,
        sub: w.techs.perf.sub,
        accent: "linear-gradient(135deg,#FBBF24 0%,#F97316 100%)",
        mark: <MarkText s="⚡" />,
        kind: "default",
      },
    ],
    [w]
  );

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // появление секции
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setReveal(true);
      },
      { threshold: 0.16 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // скролл-логика
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.52;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      let firstCenter: number | null = null;
      let lastCenter: number | null = null;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;

        const dist = Math.abs(c - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }

        if (firstCenter === null || c < firstCenter) firstCenter = c;
        if (lastCenter === null || c > lastCenter) lastCenter = c;

        const t = clamp(dist / (window.innerHeight * 0.6), 0, 1);
        const x = t * 14;
        const scale = 1 - t * 0.03;
        const op = 1 - t * 0.14;

        el.style.transform = `translateX(${x}px) scale(${scale})`;
        el.style.opacity = String(op);
      });

      setActive(bestIdx);

      if (
        firstCenter !== null &&
        lastCenter !== null &&
        Math.abs(lastCenter - firstCenter) > 4
      ) {
        const midView = window.innerHeight * 0.5;
        const raw = (midView - firstCenter) / (lastCenter - firstCenter);
        setScrollProgress(clamp(raw, 0, 1));
      } else {
        setScrollProgress(0);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Section className="pt-[200px] sm:pt-[260px] pb-16 sm:pb-24">
      <div ref={rootRef} className="relative">
        {/* фон секции */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: BG }}
        />
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-32 -z-10 bg-gradient-to-b from-black via-black/90 to-transparent" />

        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[520px_minmax(0,1fr)_40px]">
            {/* ЛЕВАЯ КОЛОНКА */}
            <div
              className="lg:sticky"
              style={{ top: STICKY_TOP } as CSSProperties}
            >
              <div className="text-[12px] uppercase tracking-[0.26em] text-white/40">
                {w.badge}
              </div>

              <h2 className="mt-4 font-display text-[46px] leading-[0.96] sm:text-[64px] lg:text-[72px] font-extrabold">
                {w.titleTop}
                <br />
                <span className="text-white/40">{w.titleBottom}</span>
              </h2>

              <div className="mt-6 max-w-[480px] text-[14px] leading-relaxed text-white/60">
                {w.description}
              </div>
            </div>

            {/* ЦЕНТР: карточки + mobile прогресс */}
            <div className="relative">
              <div className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-4 lg:block">
                {/* mobile прогресс слева от карточек */}
                <div
                  className="sticky self-start lg:hidden"
                  style={{ top: MOBILE_STICKY_TOP } as CSSProperties}
                >
                  <ProgressBar progress={scrollProgress} height={220} thin />
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {techs.map((t, i) => (
                    <TechCard
                      key={t.id}
                      tech={t}
                      index={i}
                      reveal={reveal}
                      active={i === active}
                      setRef={(el) => (cardRefs.current[i] = el)}
                      stackLabel={w.footerBadge}
                    />
                  ))}
                </div>
              </div>

              {/* нижний fade */}
              <div className="pointer-events-none sticky bottom-0 mt-10 h-16 w-full bg-gradient-to-t from-black via-black/95 to-transparent" />
            </div>

            {/* ПРАВАЯ КОЛОНКА: desktop прогресс */}
            <div
              className="hidden lg:block lg:sticky"
              style={{ top: STICKY_TOP } as CSSProperties}
            >
              <ProgressBar progress={scrollProgress} height={240} />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
