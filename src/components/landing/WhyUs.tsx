// src/components/landing/WhyUs.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  useId,
  useCallback,
} from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

const STICKY_TOP = 96;
const MOBILE_STICKY_TOP = "calc(var(--header-h, 72px) + 10px)";

// ✅ “как раньше”: на мобиле карточка НЕ во всю ширину, а фикс/лимит и по центру
const MOBILE_CARD_MAX_W = 320; // подгони (например 280/300/320/360)

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

function prefetchImage(src: string) {
  if (typeof window === "undefined") return;
  const img = new Image();
  img.decoding = "async";
  img.loading = "eager";
  img.src = src;
}

/** прогресс справа (desktop) / слева (mobile) */
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
      <div
        className="relative flex justify-center"
        style={{ height, width: w } as CSSProperties}
      >
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
  reducedMotion,
  labelId,
  descId,
}: {
  item: StackItem;
  index: number;
  reveal: boolean;
  setRef: (el: HTMLButtonElement | null) => void;
  reducedMotion: boolean;
  labelId: string;
  descId?: string;
}) {
  const hoverSrc = useMemo(
    () => item.src.replace(/(\.[a-zA-Z0-9]+)$/, "2$1"),
    [item.src]
  );

  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const prefetchedRef = useRef(false);
  const ensurePrefetch = useCallback(() => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    prefetchImage(hoverSrc);
  }, [hoverSrc]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const overlayStyle: CSSProperties = reducedMotion
    ? {
        opacity: active ? 1 : 0,
        transition: "opacity .14s ease",
      }
    : {
        clipPath: active
          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          : "polygon(0 0, 0 0, 0 100%, 0 100%)",
        transition: "clip-path 1.25s cubic-bezier(.21,.99,.24,1)",
      };

  const lineLeft = active ? "100%" : "0%";

  const activate = () => {
    ensurePrefetch();
    setActive(true);
  };

  const deactivate = () => {
    if (!isTouch) setActive(false);
  };

  const toggle = () => {
    ensurePrefetch();
    setActive((v) => !v);
  };

  return (
    <button
      ref={setRef}
      type="button"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      onClick={toggle}
      aria-labelledby={labelId}
      aria-describedby={descId}
      className="
        group relative text-left
        mx-auto
        w-[min(86vw,var(--cardW))]
        sm:w-full sm:mx-0
      "
      style={
        {
          // 👇 даём Tailwind’у переменную, чтобы w-[min(...)] работал
          ["--cardW" as any]: `${MOBILE_CARD_MAX_W}px`,
          opacity: reveal ? 1 : 0,
          transform: reveal ? "translateY(0)" : "translateY(14px)",
          transition:
            "transform .45s cubic-bezier(.2,.9,.2,1), opacity .4s ease",
          transitionDelay: `${index * 26}ms`,
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
              "linear-gradient(135deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.08) 40%, rgba(255,255,255,.18) 100%)",
          } as CSSProperties
        }
      >
        <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-black/35">
          {/* base image */}
          <img
            src={item.src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full select-none"
            style={
              { objectFit: "cover", objectPosition: "center" } as CSSProperties
            }
          />

          {/* overlay */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0" style={overlayStyle}>
              <img
                src={hoverSrc}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full select-none"
                style={
                  { objectFit: "cover", objectPosition: "center" } as CSSProperties
                }
              />

              {!reducedMotion && (
                <div
                  className="absolute inset-0 opacity-[0.20] mix-blend-screen"
                  style={
                    {
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 4px)",
                    } as CSSProperties
                  }
                />
              )}

              <div
                className="absolute inset-0"
                style={
                  {
                    background:
                      "radial-gradient(120px 120px at 70% 40%, rgba(249,115,22,0.22), rgba(0,0,0,0) 60%)",
                    opacity: 0.9,
                  } as CSSProperties
                }
              />
            </div>

            {!reducedMotion && (
              <div
                className="absolute inset-0"
                style={
                  {
                    opacity: active ? 1 : 0,
                    transition: "opacity .18s ease",
                  } as CSSProperties
                }
              >
                <div
                  className="absolute top-[-18%] bottom-[-18%]"
                  style={
                    {
                      left: lineLeft,
                      transform: "translateX(-50%)",
                      transition: "left 1.25s cubic-bezier(.21,.99,.24,1)",
                    } as CSSProperties
                  }
                >
                  <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[40px]"
                    style={
                      {
                        background:
                          "linear-gradient(180deg, rgba(249,115,22,0) 0%, rgba(249,115,22,0.55) 38%, rgba(249,115,22,0.30) 62%, rgba(249,115,22,0) 100%)",
                        filter: "blur(10px)",
                        opacity: 0.92,
                      } as CSSProperties
                    }
                  />
                  <div
                    className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full"
                    style={
                      {
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 14%, rgba(255,196,118,1) 40%, rgba(249,115,22,1) 50%, rgba(255,196,118,1) 60%, rgba(255,255,255,0.98) 86%, rgba(255,255,255,0) 100%)",
                        boxShadow:
                          "0 0 10px rgba(255,255,255,0.8), 0 0 24px rgba(249,115,22,0.90), 0 0 44px rgba(249,115,22,0.78)",
                      } as CSSProperties
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/8" />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-0 ring-orange-400/0 transition group-focus-visible:ring-2 group-focus-visible:ring-orange-400/50" />
        </div>
      </div>

      <div className="mt-3 w-full">
        <div className="flex items-center justify-between gap-3">
          <div
            id={labelId}
            className="text-[12px] font-semibold tracking-[0.20em] uppercase text-white/80"
          >
            {item.label}
          </div>
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40">
            {item.category}
          </div>
        </div>

        {item.note && descId && (
          <div
            id={descId}
            className="mt-1 text-[12.5px] leading-relaxed text-white/55"
          >
            {item.note}
          </div>
        )}
      </div>
    </button>
  );
}

export default function WhyUs() {
  const { dict, lang } = useLang();
  const reducedMotion = usePrefersReducedMotion();

  const isRu = lang === "ru";
  const w = (dict as any).whyUs || {};
  const sectionId = useId();

  const badgeLeft = w.badgeLeft ?? (isRu ? "СТЕК" : "STACK");
  const badgeCenter = w.badgeCenter ?? (isRu ? "ТЕХНОЛОГИИ" : "TECH");
  const badgeRight = w.badgeRight ?? (isRu ? "МОДУЛИ" : "MODULES");

  const title1 = w.title1 ?? (isRu ? "На чём мы" : "What we");
  const title2 = w.title2 ?? (isRu ? "быстро запускаем" : "ship fast");

  const sub =
    w.sub ??
    (isRu
      ? "Не просто логотипы: это стек и модули, которые сокращают время до релиза и упрощают поддержку. Ниже — что используем и какую пользу вы получаете."
      : "Not just logos: a stack and modules that shorten time-to-ship and reduce maintenance cost. Here’s what we use — and the value you get.");

  const bullets: string[] =
    w.bullets ??
    (isRu
      ? [
          "Design system — единый стиль и быстрее сборка новых экранов",
          "Админка + роли/права — управление продуктом без участия разработчиков",
          "Интеграции и аналитика — платежи, события, метрики, отчёты",
        ]
      : [
          "Design system — consistent UI and faster delivery",
          "Admin + roles — manage product without engineers",
          "Integrations & analytics — payments, events, metrics, reports",
        ]);

  const trustLine =
    w.trustLine ??
    (isRu
      ? "Типизация и линт • Адаптив и a11y • Оптимизация загрузки"
      : "Typed code & linting • Responsive & a11y • Performance optimization");

  const stack = useMemo<StackItem[]>(
    () => [
      { id: "supabase", label: "Supabase", src: "/images/stack/supabase.webp", category: "Platform" },

      { id: "react", label: "React", src: "/images/stack/react.webp", category: "Frontend" },
      { id: "ts", label: "TypeScript", src: "/images/stack/ts.webp", category: "Frontend" },
      { id: "tw", label: "Tailwind", src: "/images/stack/tw.webp", category: "Frontend" },

      { id: "node", label: "Node.js", src: "/images/stack/node.webp", category: "Backend" },
      { id: "ex", label: "Express", src: "/images/stack/ex.webp", category: "Backend" },

      { id: "pg", label: "Postgres", src: "/images/stack/pg.webp", category: "Database" },

      { id: "html", label: "HTML", src: "/images/stack/html.webp", category: "Frontend" },
      { id: "css", label: "CSS", src: "/images/stack/css.webp", category: "Frontend" },
      { id: "js", label: "JavaScript", src: "/images/stack/js.webp", category: "Frontend" },
    ],
    []
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [reveal, setReveal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    let raf = 0;

    const update = () => {
      raf = 0;

      const midView = window.innerHeight * 0.5;
      let firstCenter: number | null = null;
      let lastCenter: number | null = null;

      for (const el of itemRefs.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        if (firstCenter === null || c < firstCenter) firstCenter = c;
        if (lastCenter === null || c > lastCenter) lastCenter = c;
      }

      if (
        firstCenter !== null &&
        lastCenter !== null &&
        Math.abs(lastCenter - firstCenter) > 4
      ) {
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
              >
                <span className="block font-[820] text-white/95">{title1}</span>
                <span
                  className="block font-[820] bg-gradient-to-r from-white via-white to-[#F97316] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" } as CSSProperties}
                >
                  {title2}
                </span>
              </h2>

              <p className="mt-5 max-w-[54ch] text-[14px] leading-relaxed text-white/70">
                {sub}
              </p>

              <ul className="mt-6 space-y-3 max-w-[54ch]">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-white/70">
                    <span
                      className="mt-[7px] h-2 w-2 rounded-full"
                      style={{ background: "#F97316" } as CSSProperties}
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-[12.5px] text-white/55">{trustLine}</div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-4 lg:block">
                <div
                  className="sticky self-start lg:hidden"
                  style={{ top: MOBILE_STICKY_TOP } as CSSProperties}
                >
                  <ProgressBar progress={scrollProgress} height={220} thin />
                </div>

                {/* ✅ мобила: по центру; sm+: как было (две колонки) */}
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
                        reducedMotion={reducedMotion}
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

            <div className="hidden lg:block lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <ProgressBar progress={scrollProgress} height={320} showPercent />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
