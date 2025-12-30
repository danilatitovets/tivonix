// src/components/landing/CurtainContent.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../../i18n/LangProvider";

const HERO_IMG = "/images/hero.png";
const BRAND_LOCKUP = "/images/tivonix-logo-lockup.png";

// фиксированное положение
const HEADER_H = -50;
const TOP_ADD = 0;

// фиксированные размеры карточки
const CARD_H = 560; // px
const CARD_W_MAX = 980; // px

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

/** акценты в тексте (бренд / SaaS / MVP / админ-панель) */
function renderAccent(line: string, muted = false) {
  const re =
    /(TIVONIX|TIVUX|SaaS|MVP|admin panel|админ[–—-]панел(?:ь|и))/g;
  const parts = line.split(re);
  return (
    <>
      {parts.map((p, i) => {
        if (p === "TIVONIX" || p === "TIVUX") {
          return (
            <span
              key={i}
              className={cx(
                "bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent",
                muted && "opacity-60"
              )}
            >
              {p}
            </span>
          );
        }
        if (p === "SaaS" || p === "MVP" || p === "admin panel" || p.startsWith("админ")) {
          return (
            <span
              key={i}
              className={cx(muted ? "text-[#FF9A3D]/55" : "text-[#FF9A3D]")}
            >
              {p}
            </span>
          );
        }
        return (
          <span key={i} className={cx(muted && "text-white/55")}>
            {p}
          </span>
        );
      })}
    </>
  );
}

/* ---------------- RAF typer ---------------- */
type TyperOptions = {
  startDelay?: number;
  charMs?: number;
  linePause?: number;
  endHold?: number;
  loop?: boolean;
};

function useRafTyper(lines: string[], opts: TyperOptions = {}) {
  const reduced = usePrefersReducedMotion();
  const {
    startDelay = 650,
    charMs = 26,
    linePause = 520,
    endHold = 1300,
    loop = true,
  } = opts;

  const [hasStarted, setHasStarted] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [current, setCurrent] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const rafRef = useRef<number>(0);

  const phaseRef = useRef<"delay" | "typing" | "pause" | "hold">("delay");
  const liRef = useRef(0);
  const ciRef = useRef(0);

  const lastCharTickRef = useRef(0);
  const phaseStartRef = useRef(0);

  const startedRef = useRef(false);
  const typingRef = useRef(false);

  const linesKey = useMemo(() => lines.join("|"), [lines]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;

    phaseRef.current = "delay";
    liRef.current = 0;
    ciRef.current = 0;
    lastCharTickRef.current = 0;
    phaseStartRef.current = 0;

    startedRef.current = false;
    typingRef.current = false;

    setHasStarted(false);
    setHistoryCount(0);
    setCurrent("");
    setIsTyping(false);

    if (!lines?.length) return;

    if (reduced) {
      setHasStarted(true);
      setHistoryCount(lines.length);
      setCurrent("");
      setIsTyping(false);
      return;
    }

    const setTypingFlag = (v: boolean) => {
      if (typingRef.current === v) return;
      typingRef.current = v;
      setIsTyping(v);
    };

    const tick = (now: number) => {
      if (!phaseStartRef.current) phaseStartRef.current = now;
      if (!lastCharTickRef.current) lastCharTickRef.current = now;

      const phase = phaseRef.current;

      if (phase === "delay") {
        setTypingFlag(false);
        if (now - phaseStartRef.current >= startDelay) {
          phaseRef.current = "typing";
          phaseStartRef.current = now;
          lastCharTickRef.current = now;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const line = lines[liRef.current] ?? "";

      if (phase === "typing") {
        setTypingFlag(true);

        if (!startedRef.current) {
          startedRef.current = true;
          setHasStarted(true);
        }

        if (now - lastCharTickRef.current >= charMs) {
          const steps = Math.floor(
            (now - lastCharTickRef.current) / charMs
          );
          lastCharTickRef.current += steps * charMs;

          ciRef.current = Math.min(line.length, ciRef.current + steps);
          const next = line.slice(0, ciRef.current);
          setCurrent(next);

          if (ciRef.current >= line.length) {
            setCurrent("");
            setHistoryCount((v) => Math.min(lines.length, v + 1));

            phaseRef.current = "pause";
            phaseStartRef.current = now;
            setTypingFlag(false);
          }
        }

        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (phase === "pause") {
        setTypingFlag(false);

        if (now - phaseStartRef.current >= linePause) {
          liRef.current += 1;
          ciRef.current = 0;

          if (liRef.current >= lines.length) {
            phaseRef.current = "hold";
            phaseStartRef.current = now;
          } else {
            phaseRef.current = "typing";
            phaseStartRef.current = now;
            lastCharTickRef.current = now;
          }
        }

        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (phase === "hold") {
        setTypingFlag(false);

        if (now - phaseStartRef.current >= endHold) {
          if (!loop) return;

          phaseRef.current = "delay";
          phaseStartRef.current = now;
          lastCharTickRef.current = now;

          liRef.current = 0;
          ciRef.current = 0;

          startedRef.current = false;
          setHasStarted(false);
          setHistoryCount(0);
          setCurrent("");
          setIsTyping(false);
        }

        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, [linesKey, reduced, startDelay, charMs, linePause, endHold, loop]);

  return { hasStarted, historyCount, current, reduced, isTyping };
}

/* ---------------- Timeline ---------------- */

type TimelineProps = {
  steps: string[];
  hasStarted: boolean;
  historyCount: number;
  current: string;
  isTyping: boolean;
  activeProgress: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  statusDone: string;
  statusInProgress: string;
};

function Timeline({
  steps,
  hasStarted,
  historyCount,
  current,
  isTyping,
  activeProgress,
  containerRef,
  statusDone,
  statusInProgress,
}: TimelineProps) {
  const prevHistoryRef = useRef(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (historyCount <= prevHistoryRef.current) return;
    prevHistoryRef.current = historyCount;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [historyCount, containerRef]);

  const visibleCount =
    hasStarted ? historyCount + (isTyping ? 1 : 0) : 0;
  const visible =
    visibleCount > 0
      ? steps.slice(0, Math.min(steps.length, visibleCount))
      : [];

  return (
    <div
      ref={containerRef}
      className={cx(
        "cc-scroll mt-6",
        "h-[330px] sm:h-[360px]",
        "overflow-y-auto pr-3",
        "overscroll-contain"
      )}
    >
      {!hasStarted ? (
        <div className="h-full" />
      ) : (
        <div className="space-y-6">
          {visible.map((step, i) => {
            const done = i < historyCount;
            const active = isTyping && i === historyCount;
            const isLastVisible = i === visible.length - 1;

            const segFill = done
              ? 1
              : active
              ? activeProgress
              : 0;

            return (
              <div
                key={i}
                className="flex items-start gap-4 pl-3 pt-2"
              >
                <div className="mt-[3px] flex flex-col items-center">
                  <div
                    className={cx(
                      "h-[12px] w-[12px] rounded-full",
                      done
                        ? "bg-[linear-gradient(180deg,#FFD7B0,#FF9A3D,#FF6A1A)] shadow-[0_0_0_6px_rgba(255,154,61,0.16)]"
                        : "bg-black/55 border border-[#FF9A3D]/70 shadow-[0_0_0_6px_rgba(255,154,61,0.14)]"
                    )}
                  />
                  {!isLastVisible && (
                    <div className="relative mt-2 h-10 w-[2px] overflow-hidden rounded-full bg-white/10">
                      <div
                        className="absolute inset-0 origin-top scale-y-0"
                        style={
                          {
                            transform: `scaleY(${segFill})`,
                            transition: "transform 420ms ease-out",
                            background:
                              "linear-gradient(180deg, rgba(255,215,176,0.95) 0%, rgba(255,154,61,0.95) 45%, rgba(255,106,26,0.95) 100%)",
                          } as any
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className={cx(
                      "font-display font-extrabold tracking-tight",
                      "text-[18px] leading-[24px] sm:text-[22px] sm:leading-[30px]",
                      "text-white/95"
                    )}
                    style={
                      {
                        transition:
                          "opacity 220ms ease-out, transform 220ms ease-out",
                      } as any
                    }
                  >
                    {active
                      ? renderAccent(current || "", false)
                      : renderAccent(step, false)}
                    {active && (
                      <span
                        className="inline-block w-[10px] translate-y-[1px] text-white/80"
                        style={
                          {
                            animation:
                              "caretBlink 0.9s steps(1) infinite",
                          } as any
                        }
                      >
                        |
                      </span>
                    )}
                  </div>

                  <div className="mt-1 text-white/45 text-sm">
                    {done ? statusDone : statusInProgress}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- main ---------------- */

export default function CurtainContent() {
  const { dict } = useLang();
  const curtain = dict.curtain;

  const steps = useMemo(() => curtain.steps, [curtain]);

  const { hasStarted, historyCount, current, reduced, isTyping } =
    useRafTyper(steps, {
      startDelay: 650,
      charMs: 26,
      linePause: 520,
      endHold: 1300,
      loop: true,
    });

  const activeLine =
    steps[clamp(historyCount, 0, steps.length - 1)] ?? "";
  const activeProgress =
    !hasStarted || reduced || !isTyping || !activeLine
      ? 0
      : clamp(
          (current?.length ?? 0) /
            Math.max(1, activeLine.length),
          0,
          1
        );

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <style>{`
        @keyframes caretBlink { 0%,45%{opacity:1} 46%,100%{opacity:0} }

        .cc-scroll { scrollbar-gutter: stable; }
        .cc-scroll::-webkit-scrollbar { width: 10px; }
        .cc-scroll::-webkit-scrollbar-track { background: transparent; }
        .cc-scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;
          border: 2px solid rgba(0,0,0,0);
          background-clip: padding-box;
          background-image: linear-gradient(180deg, rgba(255,215,176,0.9), rgba(255,154,61,0.9), rgba(255,106,26,0.9));
          box-shadow: 0 0 0 1px rgba(255,255,255,0.10) inset;
        }
        .cc-scroll::-webkit-scrollbar-thumb:hover {
          background-image: linear-gradient(180deg, rgba(255,215,176,1), rgba(255,154,61,1), rgba(255,106,26,1));
        }
      `}</style>

      <section className="relative mx-auto w-full max-w-[980px]">
        <div
          className="fixed inset-x-3 sm:inset-x-4 z-[60] mx-auto"
          style={
            {
              top: HEADER_H + TOP_ADD,
              maxWidth: `${CARD_W_MAX}px`,
              width: "100%",
            } as any
          }
        >
          <div
            className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_30px_140px_rgba(0,0,0,0.65)]"
            style={{ height: `${CARD_H}px` } as any}
          >
            {/* фон */}
            <div className="pointer-events-none absolute inset-0">
              <img
                src={HERO_IMG}
                alt=""
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.10] blur-[2px] saturate-[1.08] contrast-[1.06] scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={
                  {
                    background:
                      "radial-gradient(1200px 520px at 18% 8%, rgba(255,154,61,0.18) 0%, rgba(0,0,0,0) 28%)," +
                      "radial-gradient(900px 560px at 85% 28%, rgba(255,106,26,0.14) 0%, rgba(0,0,0,0) 68%)," +
                      "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.90) 100%)",
                  } as any
                }
              />
              <div className="absolute inset-0 ring-1 ring-white/10" />
            </div>

            {/* точки */}
            <div
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:18px_18px]"
              style={{ opacity: 0.06 } as any}
            />

            <div className="relative h-full px-6 py-7 sm:px-10 sm:py-8">
              {/* header блока */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={BRAND_LOCKUP}
                    alt="TIVONIX"
                    className="h-9 sm:h-10 w-auto opacity-95"
                    draggable={false}
                  />
                  <div className="min-w-0">
                    <div className="text-white/95 font-semibold tracking-tight">
                      {curtain.title}
                    </div>
                  </div>
                </div>
              </div>

              <Timeline
                steps={steps}
                hasStarted={hasStarted}
                historyCount={historyCount}
                current={current}
                isTyping={isTyping}
                activeProgress={activeProgress}
                containerRef={scrollerRef}
                statusDone={curtain.statusDone}
                statusInProgress={curtain.statusInProgress}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
