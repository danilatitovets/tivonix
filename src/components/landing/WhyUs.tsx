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

const HERO_IMG = "/images/hero.png";
const STICKY_TOP = 96; // desktop sticky under header
const MOBILE_STICKY_TOP = "calc(var(--header-h, 72px) + 10px)";

type Tech = {
  id: string;
  label: string;
  sub: string;
  accent: string;
  mark: React.ReactNode;
};

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

const PROGRESS_GRAD =
  "linear-gradient(180deg,#FFD7B0 0%,#FF9A3D 35%,#FF6A1A 70%,#FFC678 100%)";

function ReactAtomMark() {
  return (
    <svg
      width="26"
      height="26"
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
    <div className="text-[12px] font-extrabold tracking-widest text-white/90">
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
  height: number; // px
  thin?: boolean;
}) {
  const w = thin ? 14 : 18;
  return (
    <div className="relative" style={{ height, width: w }}>
      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-white/10" />
      <div className="absolute inset-y-1 left-1/2 w-[8px] -translate-x-1/2 overflow-hidden rounded-full bg-black/60">
        <div
          className="absolute left-0 top-0 w-full rounded-full"
          style={{
            height: `${progress * 100}%`,
            background: PROGRESS_GRAD,
            boxShadow:
              "0 0 26px rgba(255,160,70,.55), 0 0 12px rgba(0,0,0,.8)",
          }}
        />
      </div>
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
  return (
    <div
      ref={setRef}
      className="relative"
      style={{
        transition: "transform .55s ease, opacity .55s ease, filter .55s ease",
      }}
    >
      {/* aura */}
      <div
        className={[
          "pointer-events-none absolute -inset-8 rounded-[44px] blur-2xl",
          active ? "opacity-70" : "opacity-35",
        ].join(" ")}
        style={{ background: tech.accent }}
      />

      <div
        className={[
          "relative overflow-hidden rounded-[30px] border border-white/10",
          "bg-black/35 backdrop-blur-2xl",
          "px-6 py-5 sm:px-7 sm:py-6",
        ].join(" ")}
        style={
          {
            opacity: reveal ? 1 : 0,
            transform: reveal ? "translateY(0)" : "translateY(18px)",
            transitionDelay: `${index * 60}ms`,
            filter: active ? "blur(0px)" : "blur(0.2px)",
          } as CSSProperties
        }
      >
        {/* photo back */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -inset-10"
            style={
              {
                backgroundImage: `url(${HERO_IMG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: active ? 0.18 : 0.12,
                filter: "blur(12px) saturate(0.9) contrast(1.08)",
                transform: "scale(1.08)",
              } as CSSProperties
            }
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 85% at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,.62) 70%, rgba(0,0,0,.88) 100%)",
              opacity: 0.55,
            }}
          />
        </div>

        {/* dots */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.18)_1px,transparent_0)] [background-size:22px_22px]" />

        <div className="relative flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl">
            <div
              className="absolute -inset-10 opacity-85 blur-2xl"
              style={{ background: tech.accent }}
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative flex h-full w-full items-center justify-center">
              {tech.mark}
            </div>
          </div>

          <div className="min-w-0">
            <div className="truncate text-[16px] font-semibold text-white/92">
              {tech.label}
            </div>
            <div className="mt-1 text-[13px] leading-relaxed text-white/55">
              {tech.sub}
            </div>
          </div>
        </div>

        <div className="relative mt-4 text-[11px] tracking-widest text-white/40">
          {stackLabel}
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { dict } = useLang();
  const w = dict.whyUs;

  const BG =
    "radial-gradient(900px 520px at 18% 12%, rgba(62,13,0,.35) 0%, rgba(10,0,0,0) 62%)," +
    "radial-gradient(820px 520px at 88% 18%, rgba(66,43,4,.28) 0%, rgba(10,0,0,0) 64%)," +
    "radial-gradient(760px 520px at 30% 78%, rgba(26,2,0,.30) 0%, rgba(10,0,0,0) 62%)," +
    "linear-gradient(180deg, #000000 0%, #040000 35%, #0A0000 100%)";

  const techs = useMemo<Tech[]>(
    () => [
      {
        id: "react",
        label: w.techs.react.label,
        sub: w.techs.react.sub,
        accent:
          "linear-gradient(135deg, #1A0200 0%, #3E0D00 55%, #464019 100%)",
        mark: <ReactAtomMark />,
      },
      {
        id: "ts",
        label: w.techs.ts.label,
        sub: w.techs.ts.sub,
        accent:
          "linear-gradient(135deg, #110100 0%, #3E0D00 55%, #453B12 100%)",
        mark: <MarkText s="TS" />,
      },
      {
        id: "js",
        label: w.techs.js.label,
        sub: w.techs.js.sub,
        accent:
          "linear-gradient(135deg, #250300 0%, #320800 55%, #44370C 100%)",
        mark: <MarkText s="JS" />,
      },
      {
        id: "node",
        label: w.techs.node.label,
        sub: w.techs.node.sub,
        accent:
          "linear-gradient(135deg, #1A0200 0%, #431900 52%, #464019 100%)",
        mark: <MarkText s="NODE" />,
      },
      {
        id: "express",
        label: w.techs.express.label,
        sub: w.techs.express.sub,
        accent:
          "linear-gradient(135deg, #0A0000 0%, #250300 55%, #422B04 100%)",
        mark: <MarkText s="EX" />,
      },
      {
        id: "supabase",
        label: w.techs.supabase.label,
        sub: w.techs.supabase.sub,
        accent:
          "linear-gradient(135deg, #110100 0%, #3E0D00 50%, #453B12 100%)",
        mark: <MarkText s="SB" />,
      },
      {
        id: "postgres",
        label: w.techs.postgres.label,
        sub: w.techs.postgres.sub,
        accent:
          "linear-gradient(135deg, #250300 0%, #431900 48%, #44370C 100%)",
        mark: <MarkText s="PG" />,
      },
      {
        id: "tailwind",
        label: w.techs.tailwind.label,
        sub: w.techs.tailwind.sub,
        accent:
          "linear-gradient(135deg, #0A0000 0%, #320800 52%, #464019 100%)",
        mark: <MarkText s="TW" />,
      },
      {
        id: "saas",
        label: w.techs.saas.label,
        sub: w.techs.saas.sub,
        accent:
          "linear-gradient(135deg, #1A0200 0%, #3E0D00 45%, #422B04 100%)",
        mark: <MarkText s="UI" />,
      },
      {
        id: "perf",
        label: w.techs.perf.label,
        sub: w.techs.perf.sub,
        accent:
          "linear-gradient(135deg, #110100 0%, #431900 45%, #453B12 100%)",
        mark: <MarkText s="⚡" />,
      },
    ],
    [w]
  );

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [active, setActive] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setReveal(true);
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        const x = t * 18;
        const scale = 1 - t * 0.04;
        const op = 1 - t * 0.18;

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
    <Section className="pt-[200px] sm:pt-[280px] pb-16 sm:pb-24">
      <div ref={rootRef} className="relative">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: BG }}
        />
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-28 -z-10 bg-gradient-to-b from-black to-transparent" />

        <Container>
          {/* Один layout на все брейкпоинты (БЕЗ дубля карточек) */}
          <div className="grid items-start gap-8 lg:grid-cols-[520px_minmax(0,1fr)_40px]">
            {/* LEFT (desktop sticky) */}
            <div className="lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <div className="text-[12px] tracking-widest text-white/40">{w.badge}</div>

              <h2 className="mt-4 font-display text-[56px] leading-[0.92] sm:text-[76px] font-extrabold">
                {w.titleTop}
                <br />
                <span className="text-white/45">{w.titleBottom}</span>
              </h2>

              <div className="mt-6 max-w-[480px] text-[14px] leading-relaxed text-white/55">
                {w.description}
              </div>
            </div>

            {/* CARDS AREA:
                mobile -> grid: [progress | cards]
                desktop -> normal block, progress on right column */}
            <div className="relative">
              <div className="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-4 lg:block">
                {/* MOBILE progress (left of cards), sticky under header, disappears after section */}
                <div
                  className="sticky self-start lg:hidden"
                  style={{ top: MOBILE_STICKY_TOP } as CSSProperties}
                >
                  <ProgressBar progress={scrollProgress} height={240} thin />
                </div>

                {/* Cards (single map only!) */}
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

              <div className="pointer-events-none sticky bottom-0 mt-10 h-20 w-full bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* DESKTOP progress (right column) */}
            <div className="hidden lg:block lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <ProgressBar progress={scrollProgress} height={260} />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
