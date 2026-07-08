// src/components/history/MacBookMessenger.tsx
import React, { useEffect, useMemo, useRef } from "react";

const S = (o: Record<string, any>) => o as React.CSSProperties;

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function seg(p: number, a: number, b: number) {
  if (p <= a) return 0;
  if (p >= b) return 1;
  return (p - a) / (b - a);
}
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

const MACBOOK_IMG = "/images/mak.webp";
const BRAND_LOGO = "/images/favicon.webp";

// 🔧 ТОЛЬКО ЭТО ЧИСЛО МЕНЯЕШЬ, ЧТОБЫ ПОДБИВАТЬ РАЗМЕР МАКБУКА
const MACBOOK_MAX_WIDTH = 1040; // максимальная ширина макбука в пикселях
// (высота считается автоматически из соотношения сторон 3:2)

type Msg = {
  id: string;
  side: "left" | "right";
  style: "outline" | "solid" | "muted";
  text: string;
  from: number;
  to: number;
};

function typed(text: string, t01: number) {
  const t = clamp(t01, 0, 1);
  const len = text.length;
  const n = Math.max(0, Math.round(len * t));
  return text.slice(0, n);
}

function Bubble({ msg, t01 }: { msg: Msg; t01: number }) {
  const t = ease(clamp(t01, 0, 1));
  const opacity = t;
  const y = (1 - t) * 10;

  const base = "max-w-[78%] rounded-[18px] px-5 py-3 text-[14px] leading-snug";

  let klass = "";
  if (msg.style === "outline") {
    klass =
      "border border-white/80 bg-transparent text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.65)]";
  } else if (msg.style === "solid") {
    klass =
      "bg-[linear-gradient(135deg,#FFA847,#FF7A29)] text-black/90 shadow-[0_14px_44px_rgba(0,0,0,0.78)]";
  } else {
    klass = "border border-white/10 bg-white/3 text-white/40";
  }

  return (
    <div
      className={
        msg.side === "right" ? "flex justify-end" : "flex justify-start"
      }
      style={S({ opacity, transform: `translateY(${y}px)` })}
    >
      <div className={`${base} ${klass}`}>{typed(msg.text, t)}</div>
    </div>
  );
}

function Typing({ side, show }: { side: "left" | "right"; show: boolean }) {
  if (!show) return null;
  return (
    <div className={side === "right" ? "flex justify-end" : "flex justify-start"}>
      <div
        className="rounded-[16px] px-4 py-3 border border-white/10 bg-white/5"
        style={S({ backdropFilter: "blur(12px)" })}
      >
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/60 animate-pulse" />
          <span className="h-2 w-2 rounded-full bg-white/50 animate-pulse [animation-delay:120ms]" />
          <span className="h-2 w-2 rounded-full bg-white/40 animate-pulse [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
}

export default function MacBookMessenger({ progress = 0 }: { progress?: number }) {
  const p = clamp(progress, 0, 1);

  const msgs: Msg[] = useMemo(
    () => [
      {
        id: "m1",
        side: "left",
        style: "outline",
        text: "Хочу запустить SaaS-панель. На какие сроки вы ориентируетесь по разработке?",
        from: 0.04,
        to: 0.26,
      },
      {
        id: "m2",
        side: "right",
        style: "solid",
        text: "Реалистично 10–14 дней. Дизайн 2–3 дня, фронт 5–7 дней, бэк + интеграции 2–3 дня. Начнём со структуры и спринтов.",
        from: 0.28,
        to: 0.58,
      },
      {
        id: "m3",
        side: "left",
        style: "muted",
        text: "Ок. Хочется аккуратный интерфейс, адаптив и быстрый старт. Можно начать с главной и дашборда.",
        from: 0.6,
        to: 0.78,
      },
      {
        id: "m4",
        side: "right",
        style: "solid",
        text: "Супер. Сегодня: бриф + карта экранов. Завтра: 1-й вариант дизайна. Дальше: фронт/бэк параллельно. Через 2 недели — готовый MVP.",
        from: 0.8,
        to: 0.98,
      },
    ],
    []
  );

  const typingBefore = (m: Msg) => p > m.from - 0.06 && p < m.from + 0.02;

  const listRef = useRef<HTMLDivElement | null>(null);
  const lastAutoRef = useRef<number>(-1);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (p <= lastAutoRef.current) return;
    lastAutoRef.current = p;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [p]);

  // рамка экрана внутри макбука (проценты можно подровнять под PNG)
  const screen = {
    left: "17%",
    right: "17%",
    top: "16%",
    bottom: "27%",
  } as const;

  return (
    // ⬇️ здесь управляем РАЗМЕРОМ всего макбука
    <div
      className="relative"
      style={S({
        width: "100%",              // занимает доступную ширину
        maxWidth: MACBOOK_MAX_WIDTH, // но не больше этого числа
        aspectRatio: "3 / 2",       // соотношение сторон макбука (1152×768 ≈ 3:2)
      })}
    >
      {/* PNG макбука */}
      <img
        src={MACBOOK_IMG}
        alt="MacBook"
        className="pointer-events-none select-none absolute inset-x-0 bottom-0 w-full h-auto max-w-none"
        draggable={false}
      />

      {/* Экран */}
      <div
        className="absolute"
        style={S({
          left: screen.left,
          right: screen.right,
          top: screen.top,
          bottom: screen.bottom,
          borderRadius: 26,
          overflow: "hidden",
        })}
      >
        {/* фон */}
        <div
          className="absolute inset-0"
          style={S({
            background:
              "radial-gradient(1200px 700px at 0% 0%, rgba(255,160,70,0.22), transparent 60%), radial-gradient(1100px 700px at 100% 20%, rgba(255,120,40,0.20), transparent 60%), rgba(10,10,10,0.98)",
          })}
        />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.06]" />

        {/* header */}
        <div
          className="relative px-6 py-4 border-b border-white/10 bg-black/50"
          style={S({ backdropFilter: "blur(16px)" })}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* наше лого слева */}
              <div className="h-7 w-7 rounded-full border border-white/20 bg-white/[0.06] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)]">
                <img
                  src={BRAND_LOGO}
                  alt="Tivonix"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div>
                <div className="text-[12px] text-white/80 tracking-[0.18em] uppercase">
                  TIVONIX • PROJECT CHAT
                </div>
                <div className="text-[12px] text-white/45">online • responding</div>
              </div>
            </div>
            <div className="text-[12px] text-white/55">SaaS • timeline</div>
          </div>
        </div>

        {/* messages */}
        <div
          ref={listRef}
          className="relative h-[calc(100%-64px-66px)] px-6 py-5 space-y-4 overflow-y-auto hide-scrollbar"
          style={S({ scrollbarWidth: "none" })}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar{ width:0; height:0; }
          `}</style>

          {msgs.map((m) => {
            const t01 = seg(p, m.from, m.to);
            const show = p >= m.from - 0.02;
            return (
              <React.Fragment key={m.id}>
                <Typing side={m.side} show={typingBefore(m)} />
                {show && <Bubble msg={m} t01={t01} />}
              </React.Fragment>
            );
          })}

          <div className="h-2" />
        </div>

        {/* input bar */}
        <div
          className="absolute left-0 right-0 bottom-0 px-6 py-4 border-t border-white/10 bg-black/50"
          style={S({ backdropFilter: "blur(16px)" })}
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-white/10 bg-white/6" />
            <div className="flex-1 h-10 rounded-full border border-white/10 bg-white/6" />
            <div className="h-10 px-4 rounded-full border border-white/10 bg-white/8 text-white/60 text-[12px] flex items-center">
              send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
