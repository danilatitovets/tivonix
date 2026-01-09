// src/components/landing/SaaSMap.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
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

/** пробуем взять высоту хедера из CSS-переменной; если нет — fallback */
function getHeaderHeightPx() {
  if (typeof window === "undefined") return 72;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--header-h")
    .trim();
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 72;
}

function AsteriskMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2v20M2 12h20M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.92"
      />
    </svg>
  );
}

function Bars({
  total = 18,
  activeCount,
  activeColor,
}: {
  total?: number;
  activeCount: number;
  activeColor: string;
}) {
  return (
    <div className="flex flex-col justify-end gap-[10px]">
      {Array.from({ length: total }).map((_, i) => {
        const idxFromBottom = total - 1 - i;
        const isActive = idxFromBottom < activeCount;
        return (
          <div
            key={i}
            className="h-[8px] w-[92px] rounded-[7px]"
            style={
              isActive
                ? {
                    background: activeColor,
                    boxShadow: "0 14px 34px rgba(0,0,0,0.52)",
                  }
                : {
                    background: "rgba(255,255,255,0.12)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }
            }
          />
        );
      })}
    </div>
  );
}

function StatCard({
  title,
  kind,
  percent,
  hours,
  bars,
}: {
  title: React.ReactNode;
  kind: "without" | "with";
  percent: number;
  hours: number;
  bars: number;
}) {
  const ORANGE = "rgba(255,154,61,0.95)";
  const BLUE = "rgba(143,168,200,0.95)";
  const isWith = kind === "with";
  const accent = isWith ? BLUE : ORANGE;

  return (
    <div className="relative">
      {/* аккуратная рамка */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] rounded-[30px]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.00), rgba(255,255,255,0.18), rgba(255,255,255,0.00), rgba(255,255,255,0.12), rgba(255,255,255,0.00))",
          opacity: 0.9,
        }}
      />

      <div
        className={cx(
          "relative overflow-hidden rounded-[30px]",
          "border border-white/[0.07]",
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0.03)_100%)]"
        )}
        style={{
          boxShadow:
            "0 34px 100px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* мягкий глоу */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[260px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, ${accent}, rgba(0,0,0,0))`,
            opacity: 0.16,
          }}
        />

        <div className="relative p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <div
              className={cx(
                "grid h-9 w-9 place-items-center rounded-[12px]",
                "border border-white/[0.10] bg-white/[0.06]"
              )}
              style={{ boxShadow: "0 18px 52px rgba(0,0,0,0.55)" }}
            >
              <AsteriskMark className="text-white/80" />
            </div>

            <div className="rounded-[13px] bg-black/25 px-4 py-2 text-[14px] font-semibold text-white/85 border border-white/[0.06]">
              {title}
            </div>
          </div>

          {/* bars справа */}
          <div className="absolute right-7 top-[78px] bottom-7 flex items-end">
            <Bars activeCount={bars} activeColor={accent} />
          </div>

          {/* процент */}
          <div className="mt-[140px] flex items-end gap-3 sm:gap-4">
            <div
              className="text-[118px] leading-[0.92] sm:text-[142px] font-semibold tracking-[-0.06em]"
              style={{ color: accent, textShadow: "0 24px 70px rgba(0,0,0,0.55)" }}
            >
              {percent}
            </div>
            <div className="mb-3 text-[28px] sm:text-[30px] text-white/55">%</div>
          </div>

          {/* часы */}
          <div className="mt-5 flex items-end gap-3">
            <div className="text-[11px] font-semibold tracking-[0.22em] text-white/45">
              HOURS
            </div>
            <div className="text-[22px] font-semibold text-white/85">{hours}</div>
            <div className="text-[14px] text-white/45">h</div>
          </div>
        </div>

        {/* виньетка */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 74%, rgba(0,0,0,0.48) 100%)",
          }}
        />
      </div>
    </div>
  );
}

/** сколько скролла (в px) нужно, чтобы заполнить проценты пока блок sticky */
const PROGRESS_SCROLL_PX = 900;

export default function SaaSMap() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const reduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState(false);
  const [t, setT] = useState(0); // 0..1
  const [stickyTop, setStickyTop] = useState(96);

  // stickyTop = высота хедера + отступ
  useEffect(() => {
    const apply = () => {
      const hh = getHeaderHeightPx();
      setStickyTop(Math.round(hh + 10));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // появление
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShow(true);
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /**
   * ВАЖНО:
   * прогресс стартует именно в момент, когда sticky начинает "держать" блок:
   * это происходит при scrollY >= sectionTop - stickyTop
   */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    let sectionTop = 0;

    const recalc = () => {
      const r = el.getBoundingClientRect();
      sectionTop = window.scrollY + r.top;
    };

    const compute = () => {
      raf = 0;
      const scroll = window.scrollY;

      const start = sectionTop - stickyTop; // момент "достал до хедера и прилип"
      const end = start + PROGRESS_SCROLL_PX;

      const raw = (scroll - start) / Math.max(1, end - start);
      setT(clamp(raw, 0, 1));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    const onResize = () => {
      recalc();
      compute();
    };

    recalc();
    compute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stickyTop]);

  // плавность
  const eased = useMemo(() => {
    if (reduced) return t;
    return 1 - Math.pow(1 - t, 1.45);
  }, [t, reduced]);

  // без — медленнее и не до 100
  const tWithout = clamp(eased * 0.9, 0, 1);
  // с — быстрее и до 100
  const tWith = clamp(eased * 1.25, 0, 1);

  const percentWithout = Math.round(70 * tWithout);
  const percentWith = Math.round(100 * tWith);

  const hoursWithout = Math.round(8 * tWithout);
  const hoursWith = Math.round(2 * tWith);

  const TOTAL_BARS = 18;
  const barsWithout = Math.max(
    0,
    Math.min(TOTAL_BARS, Math.round((TOTAL_BARS * percentWithout) / 100))
  );
  const barsWith = Math.max(
    0,
    Math.min(TOTAL_BARS, Math.round((TOTAL_BARS * percentWith) / 100))
  );

  return (
    <Section id="saas-map" className="relative overflow-hidden py-16 sm:py-24">
      {/* фон */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 22% 18%, rgba(255,154,61,0.11), transparent 68%)," +
              "radial-gradient(860px 520px at 78% 30%, rgba(143,168,200,0.10), transparent 66%)," +
              "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(0,0,0,0.72))",
          }}
        />
      </div>

      <div className="relative z-10">
        <Container>
          {/* высокий трек */}
          <div ref={trackRef} className="relative min-h-[280vh]">
            {/* sticky: доезжает до хедера и фиксируется */}
            <div className="sticky flex items-center justify-center" style={{ top: stickyTop }}>
              <div
                className={cx(
                  "w-full max-w-[1120px]",
                  "transition-all duration-700 will-change-[transform,opacity]",
                  show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                )}
                style={{ transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)" }}
              >
                {/* заголовок */}
                <div className="text-center pt-6">
                  <div className="text-[11px] font-semibold tracking-[0.28em] text-white/45">
                    {isRu ? "СРАВНЕНИЕ" : "COMPARISON"}
                  </div>
                  <div className="mt-3 text-[26px] sm:text-[34px] font-semibold text-white/90 tracking-[-0.02em]">
                    {isRu
                      ? "Карточки доезжают → фиксируются → заполняются"
                      : "Cards reach → stick → fill"}
                  </div>

                  {/* прогресс-линиия */}
                  <div className="mt-5 mx-auto h-[6px] w-[260px] rounded-full bg-white/10 border border-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(eased * 100)}%`,
                        background:
                          "linear-gradient(90deg, rgba(255,154,61,0.95), rgba(143,168,200,0.95))",
                        boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
                      }}
                    />
                  </div>
                </div>

                {/* карточки */}
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  <StatCard
                    kind="without"
                    title={isRu ? "без TIVONIX" : "without TIVONIX"}
                    percent={percentWithout}
                    hours={hoursWithout}
                    bars={barsWithout}
                  />
                  <StatCard
                    kind="with"
                    title={isRu ? "c TIVONIX" : "with TIVONIX"}
                    percent={percentWith}
                    hours={hoursWith}
                    bars={barsWith}
                  />
                </div>
              </div>
            </div>

            {/* запас снизу */}
            <div aria-hidden="true" className="h-[160vh]" />
          </div>
        </Container>
      </div>
    </Section>
  );
}
