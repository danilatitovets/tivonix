// src/components/landing/WhyUs.tsx
import React, {
  useCallback,
  useEffect,
  useId,
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
const MOBILE_CARD_MAX_W = 320;

type StackItem = {
  id: string;
  label: string;
  src: string;
  category: "Frontend" | "Backend" | "Database" | "Platform";
  note?: string;
};

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

function ProgressBar({
  progress,
  height,
  thin = false,
  showPercent = false,
}: {
  progress: number;
  height: number;
  thin?: boolean;
  showPercent?: boolean;
}) {
  const w = thin ? 12 : 16;
  const p = clamp(progress, 0, 1);

  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className="relative flex justify-center" style={{ height, width: w } as CSSProperties}>
        <div className="absolute inset-y-0 w-[2px] rounded-full bg-white/10" />
        <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 overflow-hidden rounded-full bg-white/8">
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={
              {
                height: `${p * 100}%`,
                background: "#F97316",
              } as CSSProperties
            }
          />
        </div>

        <div
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/45 bg-black/85"
          style={
            {
              top: `${p * 100}%`,
              marginTop: -6,
            } as CSSProperties
          }
        />
      </div>

      {showPercent && (
        <div className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
          {Math.round(p * 100)}%
        </div>
      )}
    </div>
  );
}

function StackCard({
  item,
  index,
  reveal,
  setRef,
  labelId,
  descId,
}: {
  item: StackItem;
  index: number;
  reveal: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  labelId: string;
  descId?: string;
}) {
  return (
    <div
      ref={setRef}
      className="relative mx-auto w-[min(86vw,var(--cardW))] text-left sm:w-full sm:mx-0"
      style={
        {
          ["--cardW" as any]: `${MOBILE_CARD_MAX_W}px`,
          opacity: reveal ? 1 : 0,
          transform: reveal ? "translateY(0)" : "translateY(14px)",
          transition: "transform .45s cubic-bezier(.2,.9,.2,1), opacity .4s ease",
          transitionDelay: `${index * 26}ms`,
          contentVisibility: "auto",
          containIntrinsicSize: "320px 320px",
        } as CSSProperties
      }
    >
      <div
        className="
          relative w-full overflow-hidden rounded-[30px] p-[2px]
          aspect-square
          sm:aspect-auto sm:h-[200px]
          focus-visible:outline-none
        "
        style={
          {
            background:
              "linear-gradient(135deg, rgba(255,255,255,.09) 0%, rgba(255,255,255,.04) 45%, rgba(255,255,255,.08) 100%)",
          } as CSSProperties
        }
      >
        <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-black/55">
          <img
            src={item.src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full select-none brightness-[0.88] saturate-[0.68] contrast-[0.96]"
            style={{ objectFit: "cover", objectPosition: "center" } as CSSProperties}
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/45"
            aria-hidden
          />

          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/6" />
        </div>
      </div>

      <div className="mt-3 w-full">
        <div className="flex items-center justify-between gap-3">
          <div id={labelId} className="text-[12px] font-semibold tracking-[0.20em] uppercase text-white/72">
            {item.label}
          </div>
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/38">
            {item.category}
          </div>
        </div>

        {item.note && descId && (
          <div id={descId} className="mt-1 text-[12.5px] leading-relaxed text-white/55">
            {item.note}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { dict, lang } = useLang();

  const isRu = lang === "ru";
  const w = dict.whyUs;
  const sectionId = useId();

  // badges
  const badgeLeft = (w as { badgeLeft?: string })?.badgeLeft ?? (isRu ? "СТЕК" : "STACK");
  const badgeCenter = (w as { badgeCenter?: string })?.badgeCenter ?? (isRu ? "ТЕХНОЛОГИИ" : "TECH");
  const badgeRight =
    (w as { badgeRight?: string })?.badgeRight ?? (isRu ? "МОДУЛИ" : "MODULES");

  // title (сжали текст до 2 строк, без описания/буллетов)
  const title1 = w.titleTop ?? (isRu ? "С чем мы" : "Our");
  const title2 = w.titleBottom ?? (isRu ? "работаем" : "stack");

  const stack = useMemo<StackItem[]>(
    () => [
      // public/images/stack — имена файлов как в папке (PNG с заглавной / полным названием)
      { id: "supabase", label: "Supabase", src: "/images/stack/Supabase.webp", category: "Platform" },
      { id: "react", label: "React", src: "/images/stack/React.webp", category: "Frontend" },
      { id: "ts", label: "TypeScript", src: "/images/stack/TypeScript.webp", category: "Frontend" },
      { id: "tw", label: "Tailwind", src: "/images/stack/Tailwind.webp", category: "Frontend" },
      { id: "node", label: "Node.js", src: "/images/stack/Node.js.webp", category: "Backend" },
      { id: "ex", label: "Express", src: "/images/stack/Express.webp", category: "Backend" },
      { id: "pg", label: "Postgres", src: "/images/stack/Postgres.webp", category: "Database" },
      { id: "html", label: "HTML", src: "/images/stack/HTML.webp", category: "Frontend" },
      { id: "css", label: "CSS", src: "/images/stack/CSS.webp", category: "Frontend" },
      { id: "js", label: "JavaScript", src: "/images/stack/JavaScript.webp", category: "Frontend" },
    ],
    []
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricsRef = useRef<{ firstY: number; lastY: number; ready: boolean }>({
    firstY: 0,
    lastY: 0,
    ready: false,
  });

  const [reveal, setReveal] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setReveal(true);
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const recalcMetrics = useCallback(() => {
    if (typeof window === "undefined") return;
    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) {
      metricsRef.current.ready = false;
      return;
    }

    let first = Number.POSITIVE_INFINITY;
    let last = Number.NEGATIVE_INFINITY;

    for (const el of els) {
      const r = el.getBoundingClientRect();
      const centerY = r.top + window.scrollY + r.height / 2;
      if (centerY < first) first = centerY;
      if (centerY > last) last = centerY;
    }

    metricsRef.current.firstY = first;
    metricsRef.current.lastY = last;
    metricsRef.current.ready = last - first > 8;
  }, []);

  const updateProgress = useCallback(() => {
    if (typeof window === "undefined") return;
    const m = metricsRef.current;
    if (!m.ready) {
      setScrollProgress(0);
      return;
    }

    const midView = window.scrollY + window.innerHeight * 0.5;
    const raw = (midView - m.firstY) / (m.lastY - m.firstY);
    const next = clamp(raw, 0, 1);
    // avoid re-render on tiny scroll deltas
    if (Math.abs(next - progressRef.current) > 0.005) {
      progressRef.current = next;
      setScrollProgress(next);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        updateProgress();
      });
    };

    const onResize = () => {
      recalcMetrics();
      onScroll();
    };

    const ro = rootRef.current ? new ResizeObserver(onResize) : null;
    if (ro && rootRef.current) ro.observe(rootRef.current);

    const t = window.setTimeout(() => {
      recalcMetrics();
      updateProgress();
    }, 0);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
    };
  }, [recalcMetrics, updateProgress]);

  useEffect(() => {
    if (!reveal) return;
    const id = requestAnimationFrame(() => {
      recalcMetrics();
      updateProgress();
    });
    return () => cancelAnimationFrame(id);
  }, [reveal, recalcMetrics, updateProgress]);

  return (
    <Section className="pt-[150px] sm:pt-[200px] pb-16 sm:pb-24">
      <div ref={rootRef} className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" />

        <div className="pointer-events-none absolute -z-10 inset-0">
          <div
            className="absolute -left-24 top-20 h-[520px] w-[520px] rounded-full opacity-[0.22]"
            style={
              {
                background:
                  "radial-gradient(circle at 30% 30%, rgba(249,115,22,.25), rgba(249,115,22,0) 60%)",
              } as CSSProperties
            }
          />
          <div
            className="absolute -right-24 top-40 h-[520px] w-[520px] rounded-full opacity-[0.18]"
            style={
              {
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,255,255,.12), rgba(255,255,255,0) 62%)",
              } as CSSProperties
            }
          />
        </div>

        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[520px_minmax(0,1fr)_60px]">
            {/* LEFT: only badge + title (убрали описание/буллеты/линию доверия) */}
            <div className="lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <div className="flex items-center gap-3">
                <div className="text-[12px] font-semibold tracking-[0.26em] uppercase">
                  <span className="text-white/85">{badgeLeft}</span>
                  <span className="text-white/25"> • </span>
                  <span className="text-[#F97316]/95">{badgeCenter}</span>
                  <span className="text-white/25"> • </span>
                  <span className="text-white/70">{badgeRight}</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/18 via-white/8 to-transparent" />
              </div>

              <h2
                className="
                  mt-5 uppercase leading-[0.98] tracking-[-0.02em]
                  text-[34px] sm:text-[48px] lg:text-[58px]
                "
                aria-label={isRu ? "С чем мы работаем" : "Our stack"}
              >
                <span className="block font-[820] text-white/95">{title1}</span>
                <span
                  className="block font-[820] bg-gradient-to-r from-white via-white to-[#F97316] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" } as CSSProperties}
                >
                  {title2}
                </span>
              </h2>
            </div>

            {/* RIGHT: cards */}
            <div className="relative">
              <div className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-4 lg:block">
                <div
                  className="sticky self-start lg:hidden"
                  style={{ top: MOBILE_STICKY_TOP } as CSSProperties}
                >
                  <ProgressBar progress={scrollProgress} height={220} thin />
                </div>

                <div className="grid grid-cols-1 gap-6 justify-items-center sm:justify-items-stretch sm:grid-cols-2 sm:gap-7">
                  {stack.map((it, i) => {
                    const labelId = `${sectionId}-${it.id}-label`;
                    const descId = it.note ? `${sectionId}-${it.id}-desc` : undefined;

                    return (
                      <StackCard
                        key={it.id}
                        item={it}
                        index={i}
                        reveal={reveal}
                        labelId={labelId}
                        descId={descId}
                        setRef={(el) => {
                          itemRefs.current[i] = el;
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="pointer-events-none sticky bottom-0 mt-10 h-16 w-full bg-gradient-to-t from-black via-black/95 to-transparent" />
            </div>

            {/* FAR RIGHT: progress */}
            <div className="hidden lg:block lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <ProgressBar progress={scrollProgress} height={320} showPercent />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}