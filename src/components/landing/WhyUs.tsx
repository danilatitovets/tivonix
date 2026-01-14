// src/components/landing/WhyUs.tsx
import React, { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

const STICKY_TOP = 96;
const MOBILE_STICKY_TOP = "calc(var(--header-h, 72px) + 10px)";

type StackItem = {
  id: string;
  label: string;
  src: string;
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
    <div className="flex flex-col items-center">
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

/**
 * Карточка 200×200: “сканер” действительно едет слева -> вправо
 * - on hover (desktop) или on tap (touch)
 * - клип открывается по ширине + линия двигается (left)
 * - оранжевый градиент + мягкое свечение + scan-полосы
 */
function StackPhoto({
  item,
  index,
  reveal,
  setRef,
  reducedMotion,
}: {
  item: StackItem;
  index: number;
  reveal: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  reducedMotion: boolean;
}) {
  // /stack/html.webp -> /stack/html2.webp
  const hoverSrc = useMemo(
    () => item.src.replace(/(\.[a-zA-Z0-9]+)$/, "2$1"),
    [item.src]
  );

  const [active, setActive] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // грубая проверка тача
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // прогресс сканирования 0..1
  // reducedMotion: без “езда”, просто сразу показываем hover-версию
  const scanP = reducedMotion ? (active ? 1 : 0) : active ? 1 : 0;

  // ширина раскрытия: 0% -> 100%
  const clipPath = reducedMotion
    ? active
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 0 0, 0 100%, 0 100%)"
    : active
    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
    : "polygon(0 0, 0 0, 0 100%, 0 100%)";

  // линия: left = прогресс*100, но мы двигаем именно внутренний “сканер”
  // пока клип открывается, линия должна быть на границе клипа (правый край видимой области)
  // при active = 1, клип 100% и линия справа
  const lineLeft = active ? "100%" : "0%";

  const baseEnter = () => setActive(true);
  const baseLeave = () => !isTouch && setActive(false);

  // на таче: тап = toggle
  const onTap = () => {
    if (!isTouch) return;
    setActive((v) => !v);
  };

  return (
    <div
      ref={setRef}
      className="relative"
      onMouseEnter={baseEnter}
      onMouseLeave={baseLeave}
      onClick={onTap}
      style={
        {
          opacity: reveal ? 1 : 0,
          transform: reveal ? "translateY(0)" : "translateY(14px)",
          transition: "transform .45s cubic-bezier(.2,.9,.2,1), opacity .4s ease",
          transitionDelay: `${index * 28}ms`,
        } as CSSProperties
      }
    >
      {/* внешняя рамка */}
      <div
        className="relative h-[200px] w-[200px] overflow-hidden rounded-[34px] p-[2px]"
        style={
          {
            background:
              "linear-gradient(135deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.08) 40%, rgba(255,255,255,.18) 100%)",
          } as CSSProperties
        }
      >
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-black/35">
          {/* базовое изображение */}
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            draggable={false}
            className="h-full w-full select-none"
            style={{ objectFit: "cover", objectPosition: "center" } as CSSProperties}
          />

          {/* overlay: картинка 2 + сканер */}
          <div className="pointer-events-none absolute inset-0">
            {/* слой, который раскрывается */}
            <div
              className="absolute inset-0"
              style={
                {
                  clipPath,
                  transition: reducedMotion
                    ? "clip-path 0s linear"
                    : "clip-path 1.5s cubic-bezier(.21,.99,.24,1)",
                } as CSSProperties
              }
            >
              <img
                src={hoverSrc}
                alt={item.label}
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none"
                style={{ objectFit: "cover", objectPosition: "center" } as CSSProperties}
              />

              {/* scan-полосы внутри раскрытой области */}
              <div
                className="absolute inset-0 opacity-[0.22] mix-blend-screen"
                style={
                  {
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 4px)",
                  } as CSSProperties
                }
              />

              {/* чуть-чуть “дымки” чтобы оранжевый смотрелся богаче */}
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

            {/* СКАНЕР-ЛИНИЯ (движется) — рисуем поверх всего, но видно только когда active */}
            <div
              className="absolute inset-0"
              style={
                {
                  opacity: active ? 1 : 0,
                  transition: "opacity .2s ease",
                } as CSSProperties
              }
            >
              {/* контейнер линии, который ездит слева->вправо */}
              <div
                className="absolute top-[-18%] bottom-[-18%]"
                style={
                  {
                    left: lineLeft,
                    transform: "translateX(-50%)",
                    transition: reducedMotion
                      ? "left 0s linear"
                      : "left 1.5s cubic-bezier(.21,.99,.24,1)",
                  } as CSSProperties
                }
              >
                {/* мягкое широкое свечение */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[44px]"
                  style={
                    {
                      background:
                        "linear-gradient(180deg, rgba(249,115,22,0) 0%, rgba(249,115,22,0.55) 38%, rgba(249,115,22,0.30) 62%, rgba(249,115,22,0) 100%)",
                      filter: "blur(10px)",
                      opacity: 0.95,
                    } as CSSProperties
                  }
                />

                {/* ядро линии */}
                <div
                  className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] rounded-full"
                  style={
                    {
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 14%, rgba(255,196,118,1) 40%, rgba(249,115,22,1) 50%, rgba(255,196,118,1) 60%, rgba(255,255,255,0.98) 86%, rgba(255,255,255,0) 100%)",
                      boxShadow:
                        "0 0 10px rgba(255,255,255,0.9), 0 0 26px rgba(249,115,22,0.95), 0 0 46px rgba(249,115,22,0.85)",
                    } as CSSProperties
                  }
                />

                {/* верхняя капля */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6"
                  style={
                    {
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.98), rgba(255,196,118,0.45), rgba(0,0,0,0))",
                      filter: "blur(4px)",
                    } as CSSProperties
                  }
                />

                {/* нижняя капля */}
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6"
                  style={
                    {
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.98), rgba(255,196,118,0.45), rgba(0,0,0,0))",
                      filter: "blur(4px)",
                    } as CSSProperties
                  }
                />
              </div>

              {/* легкая “подсветка границы раскрытия”: чтобы всегда было ощущение сканера */}
              <div
                className="absolute inset-0"
                style={
                  {
                    opacity: active ? 1 : 0,
                    transition: "opacity .25s ease",
                    // подсветка справа, совпадает с направлением “движения”
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(249,115,22,0.10) 78%, rgba(249,115,22,0.00) 100%)",
                  } as CSSProperties
                }
              />
            </div>
          </div>

          {/* внутренняя тонкая обводка */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/8" />
        </div>
      </div>

      {/* подпись (можешь убрать, если не надо) */}
      <div className="mt-3 text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-white/40">
        {item.label}
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { dict, lang } = useLang();
  const reducedMotion = usePrefersReducedMotion();

  const isRu = lang === "ru";
  const w = (dict as any).whyUs || {};

  const badgeLeft = w.badgeLeft ?? (isRu ? "СТЕК" : "STACK");
  const badgeCenter = w.badgeCenter ?? (isRu ? "ТЕХНОЛОГИИ" : "TECHNOLOGIES");
  const badgeRight = w.badgeRight ?? (isRu ? "ПРОДУКТ" : "PRODUCT");

  const title1 = w.title1 ?? (isRu ? "С чем мы" : "What we");
  const title2 = w.title2 ?? (isRu ? "работаем" : "work with");

  const sub =
    w.sub ??
    (isRu
      ? "Полный стек для разработки: UI, фронтенд, бэкенд, база данных, админка, оптимизация."
      : "Full stack for development: UI, frontend, backend, database, admin panel, performance.");

  const stack = useMemo<StackItem[]>(
    () => [
      { id: "cms", label: "CMS", src: "/images/stack/cms.webp" },
      { id: "css", label: "CSS", src: "/images/stack/css.webp" },
      { id: "ex", label: "Express", src: "/images/stack/ex.webp" },
      { id: "html", label: "HTML", src: "/images/stack/html.webp" },
      { id: "js", label: "JavaScript", src: "/images/stack/js.webp" },
      { id: "node", label: "Node.js", src: "/images/stack/node.webp" },
      { id: "pg", label: "Postgres", src: "/images/stack/pg.webp" },
      { id: "react", label: "React", src: "/images/stack/react.webp" },
      { id: "saas", label: "SaaS", src: "/images/stack/saas.webp" },
      { id: "supabase", label: "Supabase", src: "/images/stack/supabase.webp" },
      { id: "ts", label: "TypeScript", src: "/images/stack/ts.webp" },
      { id: "tw", label: "Tailwind", src: "/images/stack/tw.webp" },
    ],
    []
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [reveal, setReveal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // включение анимаций блока
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

  // скролл-прогресс для правого бара
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const midView = window.innerHeight * 0.5;
      let firstCenter: number | null = null;
      let lastCenter: number | null = null;

      itemRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        if (firstCenter === null || c < firstCenter) firstCenter = c;
        if (lastCenter === null || c > lastCenter) lastCenter = c;
      });

      if (firstCenter !== null && lastCenter !== null && Math.abs(lastCenter - firstCenter) > 4) {
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
        {/* фон */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" />

        {/* споты */}
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
          <div className="grid items-start gap-10 lg:grid-cols-[560px_minmax(0,1fr)_60px]">
            {/* слева текст */}
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

              <h2 className="mt-5 font-display text-[46px] leading-[0.96] sm:text-[64px] lg:text-[72px] font-extrabold">
                <span className="text-white/95">{title1}</span>
                <br />
                <span
                  className="bg-gradient-to-r from-white via-white to-[#F97316] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" } as CSSProperties}
                >
                  {title2}
                </span>
              </h2>

              <p className="mt-6 max-w-[46ch] text-[14px] leading-relaxed text-white/55">{sub}</p>
            </div>

            {/* центр — иконки + мобильный прогресс */}
            <div className="relative">
              <div className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-4 lg:block">
                <div className="sticky self-start lg:hidden" style={{ top: MOBILE_STICKY_TOP } as CSSProperties}>
                  <ProgressBar progress={scrollProgress} height={220} thin />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
                  {stack.map((it, i) => (
                    <StackPhoto
                      key={it.id}
                      item={it}
                      index={i}
                      reveal={reveal}
                      reducedMotion={reducedMotion}
                      setRef={(el) => {
                        itemRefs.current[i] = el;
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="pointer-events-none sticky bottom-0 mt-10 h-16 w-full bg-gradient-to-t from-black via-black/95 to-transparent" />
            </div>

            {/* справа — прогресс бар (desktop) */}
            <div className="hidden lg:block lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <ProgressBar progress={scrollProgress} height={320} showPercent />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
