// src/components/history/MessageToPhoneScene.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MacBookMessenger from "./MacBookChatMock";

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function seg(p: number, a: number, b: number) {
  if (p <= a) return 0;
  if (p >= b) return 1;
  return (p - a) / (b - a);
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function ease(t: number) {
  return t * t * (3 - 2 * t);
}
const S = (o: Record<string, any>) => o as React.CSSProperties;

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

function useSectionProgress() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const total = r.height - vh;
        const passed = -r.top;
        const prog =
          total <= 0 ? (r.top < 0 ? 1 : 0) : clamp(passed / total, 0, 1);
        setP(prog);
      });
    };

    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return { ref, p };
}

function useStageSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);

    const r = el.getBoundingClientRect();
    setSize({ w: r.width, h: r.height });

    return () => ro.disconnect();
  }, []);

  return { ref, size };
}

function useViewport() {
  const [vp, setVp] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return vp;
}

/* ======== LOCK BODY SCROLL (NO JUMP, StrictMode-safe) ======== */

let __lockCount = 0;
let __savedBodyStyles: Record<string, string> | null = null;

function lockBodyScroll() {
  if (__lockCount++ > 0) return;

  const y =
    window.scrollY ||
    document.documentElement.scrollTop ||
    (document.body.scrollTop ?? 0);

  document.body.dataset.lockY = String(y);

  __savedBodyStyles = {
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    right: document.body.style.right,
    width: document.body.style.width,
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  };

  const scrollbarW = window.innerWidth - document.documentElement.clientWidth;

  document.documentElement.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${y}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

  document.documentElement.style.overscrollBehavior = "none";
}

function unlockBodyScroll() {
  if (--__lockCount > 0) return;
  __lockCount = 0;

  const fromTop = Math.abs(parseInt(document.body.style.top || "0", 10));
  const fromData = parseInt(document.body.dataset.lockY || "0", 10) || 0;
  const y = fromTop || fromData;

  if (__savedBodyStyles) {
    document.body.style.position = __savedBodyStyles.position ?? "";
    document.body.style.top = __savedBodyStyles.top ?? "";
    document.body.style.left = __savedBodyStyles.left ?? "";
    document.body.style.right = __savedBodyStyles.right ?? "";
    document.body.style.width = __savedBodyStyles.width ?? "";
    document.body.style.overflow = __savedBodyStyles.overflow ?? "";
    document.body.style.paddingRight = __savedBodyStyles.paddingRight ?? "";
  }
  document.documentElement.style.overflow = "";
  document.documentElement.style.overscrollBehavior = "";

  // ✅ восстанавливаем на ТОЧНОЕ место
  window.scrollTo(0, y);

  __savedBodyStyles = null;
  delete document.body.dataset.lockY;
}

function useFreezeBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [active]);
}

function CursorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3.5L18.5 14.2l-6.1.5 2.7 5.2-2.3 1.1-2.7-5.2-4.2 4.4L6 3.5Z"
        fill="rgba(255,255,255,0.92)"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

const STICKY_TOP = 86;

export default function MessageToPhoneScene() {
  const reduced = usePrefersReducedMotion();
  const vp = useViewport();
  const { ref, p } = useSectionProgress();
  const { ref: stageRef, size } = useStageSize<HTMLDivElement>();

  // таймлайн до открытия оверлея
  const tShow = ease(seg(p, 0.06, 0.22));
  const tCursor = ease(seg(p, 0.30, 0.58));
  const tClick = ease(seg(p, 0.72, 0.80));
  const tExpand = ease(seg(p, 0.80, 0.92));

  const stageW = size.w || 1200;
  const stageH = size.h || 800;

  const baseW = clamp(stageW * 0.42, 320, 460);
  const baseH = 190;

  const cx0 = stageW / 2;
  const cy0 = stageH / 2;
  const clickX = cx0 + baseW * 0.18;
  const clickY = cy0 + baseH * 0.22;
  const startX = stageW - 56;
  const startY = 54;

  const curX = lerp(startX, clickX, tCursor);
  const curY = lerp(startY, clickY, tCursor);

  const pressPulse = tClick > 0 ? Math.sin(Math.PI * tClick) : 0;
  const cardScale = 1 - pressPulse * 0.012;
  const cardOpacity = reduced ? 1 : tShow * (1 - tExpand);

  // оверлей включаем один раз
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    if (reduced) return;
    if (!activated && tExpand > 0.02) setActivated(true);
  }, [activated, reduced, tExpand]);

  // прогресс внутри оверлея (по внутреннему скроллу)
  const overlayScrollRef = useRef<HTMLDivElement | null>(null);
  const [overlayP, setOverlayP] = useState(0);

  useEffect(() => {
    if (!activated) return;
    const el = overlayScrollRef.current;
    if (el) el.scrollTop = 0;
    setOverlayP(0);
  }, [activated]);

  const onOverlayScroll = () => {
    const el = overlayScrollRef.current;
    if (!el) return;
    const total = el.scrollHeight - el.clientHeight;
    const prog = total <= 0 ? 1 : clamp(el.scrollTop / total, 0, 1);
    setOverlayP(prog);
  };

  // размеры макбука в оверлее
  const macWRaw = clamp(vp.w * 0.78, 640, 1080);
  const macHRaw = macWRaw / 1.6;
  const macHMax = vp.h * 0.82;
  const macScale = macHRaw > macHMax ? macHMax / macHRaw : 1;
  const macW = macWRaw * macScale;
  const macH = macHRaw * macScale;

  // ✅ заморозка страницы — теперь без прыжка наверх
  useFreezeBodyScroll(activated);

  // панель opening
  const openW = activated
    ? vp.w
    : lerp(Math.min(baseW * 1.15, vp.w * 0.62), vp.w, tExpand);
  const openH = activated
    ? vp.h
    : lerp(Math.min(baseH * 1.35, vp.h * 0.46), vp.h, tExpand);
  const openR = activated ? 0 : lerp(28, 0, tExpand);

  const openingLabelOpacity = useMemo(() => {
    if (!activated) return 1;
    return clamp(1 - overlayP * 1.6, 0, 1);
  }, [activated, overlayP]);

  return (
    <section ref={ref} className="relative py-10 sm:py-14">
      <style>{`
        @keyframes ms-ripple {
          0%   { transform: translate(-50%,-50%) scale(.55); opacity: .45; }
          100% { transform: translate(-50%,-50%) scale(1.75); opacity: 0; }
        }
        @keyframes ms-blink { 0%,49%{opacity:1} 50%,100%{opacity:.25} }
      `}</style>

      {/* большая высота секции до оверлея */}
      <div className="relative min-h-[280vh]">
        <div className="sticky" style={S({ top: STICKY_TOP })}>
          <div
            ref={stageRef}
            className="relative h-[calc(100vh-86px)] flex items-center justify-center"
          >
            {/* фон сцены */}
            <div className="absolute inset-0 mx-4 sm:mx-8 rounded-[34px] border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_0%,rgba(255,160,70,0.10),transparent_60%),radial-gradient(700px_460px_at_90%_120%,rgba(255,120,40,0.08),transparent_58%)]" />
              <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.06]" />
            </div>

            {/* уведомление */}
            <div
              className="absolute left-1/2 top-1/2"
              style={S({
                transform: `translate(-50%,-50%) scale(${cardScale})`,
                width: baseW,
                opacity: cardOpacity,
                transition: reduced ? undefined : "transform 180ms ease",
              })}
            >
              <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-white/6 backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
                <div className="px-5 py-3 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[rgba(255,160,70,0.95)]" />
                    <span className="text-white/70 text-[12px] tracking-[0.18em] uppercase">
                      new message
                    </span>
                  </div>
                  <div className="text-white/45 text-[12px]">now</div>
                </div>

                <div className="px-5 py-5">
                  <div className="text-white/88 text-[14px] font-semibold leading-tight">
                    Заказчик
                  </div>

                  <div className="mt-2 text-white/70 text-[13px] leading-relaxed">
                    Добрый день! Сможете ли вы сделать SaaS проект на высшем
                    уровне?
                    <span
                      className="inline-block ml-1 h-[1.05em] w-[0.55em] rounded-[4px] bg-white/60 align-middle"
                      style={S({
                        animation:
                          !reduced && p < 0.5
                            ? "ms-blink 1s steps(1) infinite"
                            : undefined,
                      })}
                    />
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/60">
                      open
                    </span>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/60">
                      reply
                    </span>
                  </div>
                </div>

                {!reduced && tClick > 0.1 && (
                  <div
                    className="pointer-events-none absolute"
                    style={S({ left: "72%", top: "62%" })}
                  >
                    <div
                      className="absolute left-0 top-0 h-[10px] w-[10px] rounded-full"
                      style={S({
                        background: "rgba(255,160,70,0.60)",
                        transform: `translate(-50%,-50%) scale(${1 - pressPulse * 0.22})`,
                      })}
                    />
                    <div
                      className="absolute left-0 top-0 h-[130px] w-[130px] rounded-full border"
                      style={S({
                        borderColor: "rgba(255,160,70,0.30)",
                        animation: "ms-ripple 650ms ease-out infinite",
                        opacity: tClick < 1 ? 1 : 0,
                        transform: "translate(-50%,-50%)",
                      })}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* курсор */}
            {!reduced && tCursor > 0.02 && (
              <div
                className="pointer-events-none absolute"
                style={S({
                  left: curX,
                  top: curY,
                  transform: `translate(-50%,-50%) scale(${
                    0.92 + tCursor * 0.12 - pressPulse * 0.08
                  })`,
                  filter: "drop-shadow(0 22px 70px rgba(0,0,0,0.65))",
                })}
              >
                <CursorIcon />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN OVERLAY + внутренний скролл по мессенджеру */}
      {activated &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={overlayScrollRef}
            onScroll={onOverlayScroll}
            className="fixed inset-0"
            style={S({
              zIndex: 2147483647,
              overflowY: "auto",
              overscrollBehavior: "contain",
              background: "#070707",
              WebkitOverflowScrolling: "touch",
            })}
          >
            <div style={S({ minHeight: "260vh", position: "relative" })}>
              {/* фон оверлея */}
              <div
                className="absolute inset-0"
                style={S({
                  background:
                    "radial-gradient(1100px 700px at 20% 0%, rgba(255,160,70,0.10), transparent 60%), radial-gradient(900px 650px at 90% 120%, rgba(255,120,40,0.08), transparent 58%), #070707",
                })}
              />

              {/* панель opening */}
              <div className="sticky top-0 h-screen flex items-center justify-center">
                <div className="relative" style={S({ width: openW, height: openH })}>
                  <div
                    className="relative h-full w-full overflow-hidden"
                    style={S({
                      borderRadius: openR,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background:
                        "radial-gradient(900px 520px at 20% 0%, rgba(255,160,70,0.12), transparent 60%), radial-gradient(700px 460px at 90% 120%, rgba(255,120,40,0.10), transparent 58%), rgba(12,12,12,0.98)",
                      boxShadow: "0 40px 180px rgba(0,0,0,0.82)",
                    })}
                  >
                    <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.06]" />

                    {/* opening label */}
                    <div
                      className="absolute left-10 top-10 flex items-center gap-2 text-white/70 text-[12px] tracking-[0.18em] uppercase"
                      style={S({ opacity: openingLabelOpacity })}
                    >
                      <span className="h-2 w-2 rounded-full bg-[rgba(255,160,70,0.95)]" />
                      opening…
                    </div>

                    {/* Макбук + чат — прогресс от overlayP */}
                    <div
                      className="absolute left-1/2 top-1/2"
                      style={S({
                        transform: "translate(-50%,-50%)",
                        width: macW,
                        height: macH,
                      })}
                    >
                      <MacBookMessenger progress={overlayP} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
