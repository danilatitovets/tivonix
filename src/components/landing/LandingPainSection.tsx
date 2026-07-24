import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { LANDING_HEADLINE_CLASS } from "../../lib/landingLayout";
import { useInView } from "../../hooks/useInView";

const CARD_DARK = "#141414";
const CARD_SOFT = "#262626";
const PAIN_CARD_BACKGROUNDS = [
  "/images/hero-stage-1.webp",
  "/images/pain-bg-late.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-2.webp",
] as const;

/** Mobile + reduced-motion: static visuals, no looping motion. */
function useCalmPainMotion() {
  const [calm, setCalm] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCalm(reduced.matches || narrow.matches);
    sync();
    reduced.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  return calm;
}

function ChannelsVisual({ isRu }: { isRu: boolean }) {
  const rows = isRu
    ? [
        { ch: "Instagram", icon: "/images/icons/instagram.svg", count: "20", unit: "заявок", hot: true },
        { ch: "Telegram", icon: "/images/icons/telegram.svg", count: "8", unit: "непрочит.", hot: true },
        { ch: "WhatsApp", icon: "/images/icons/whatsapp.svg", count: "5", unit: "сообщений", hot: true },
        { ch: "Звонок", icon: "/images/icons/phone.svg", count: "3", unit: "пропущенных", hot: true },
        { ch: "Сайт", icon: "/images/icons/globe.svg", count: "4", unit: "формы", hot: false },
        { ch: "Email", icon: "/images/icons/gmail.svg", count: "6", unit: "писем", hot: true },
      ]
    : [
        { ch: "Instagram", icon: "/images/icons/instagram.svg", count: "20", unit: "leads", hot: true },
        { ch: "Telegram", icon: "/images/icons/telegram.svg", count: "8", unit: "unread", hot: true },
        { ch: "WhatsApp", icon: "/images/icons/whatsapp.svg", count: "5", unit: "messages", hot: true },
        { ch: "Call", icon: "/images/icons/phone.svg", count: "3", unit: "missed", hot: true },
        { ch: "Website", icon: "/images/icons/globe.svg", count: "4", unit: "forms", hot: false },
        { ch: "Email", icon: "/images/icons/gmail.svg", count: "6", unit: "emails", hot: true },
      ];

  const track = [...rows, ...rows];

  return (
    <>
      <style>{`
        @keyframes pain-channels-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .pain-channels-track {
          animation: pain-channels-scroll 18s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pain-channels-track { animation: none !important; }
        }
      `}</style>

      <div className="relative h-[148px] overflow-hidden sm:h-[156px]">
        <div className="pain-channels-track space-y-1.5">
          {track.map((r, i) => (
            <div
              key={`${r.ch}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-3 py-2.5"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <img
                  src={r.icon}
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden
                  className="h-[18px] w-[18px] shrink-0"
                />
                <span className="truncate text-[13px] font-medium text-white/90">{r.ch}</span>
              </span>
              <span className="flex items-baseline gap-1.5">
                {r.hot ? (
                  <span className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-[#FF5722]" aria-hidden />
                ) : (
                  <Check size={12} className="self-center text-white/35" aria-hidden />
                )}
                <span
                  className={[
                    "text-[15px] font-semibold tabular-nums leading-none",
                    r.hot ? "text-[#FF8A5C]" : "text-white/45",
                  ].join(" ")}
                >
                  {r.count}
                </span>
                <span className={r.hot ? "text-[12px] text-white/70" : "text-[12px] text-white/40"}>
                  {r.unit}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#141414] to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#141414] to-transparent"
          aria-hidden
        />
      </div>
    </>
  );
}

function TelegramVisual({ isRu }: { isRu: boolean }) {
  const calm = useCalmPainMotion();
  const message = isRu
    ? "Здравствуйте, хочу записаться на консультацию…"
    : "Hi, I’d like to book a consultation…";

  const stages = isRu
    ? [
        { time: "сейчас", status: "Менеджер ещё не видел", late: false },
        { time: "23 мин", status: "Никто не ответил", late: false },
        { time: "4 часа", status: "Всё ещё без ответа", late: true },
        { time: "день назад", status: "Клиент всё ещё ждёт", late: true },
        { time: "неделю назад", status: "вы забыли?", late: true },
      ]
    : [
        { time: "now", status: "Manager hasn’t seen it", late: false },
        { time: "23 min", status: "Nobody replied", late: false },
        { time: "4 hours", status: "Still no reply", late: true },
        { time: "a day ago", status: "Client is still waiting", late: true },
        { time: "a week ago", status: "did you forget?", late: true },
      ];

  const last = stages.length - 1;
  const [open, setOpen] = useState(calm);
  const [typed, setTyped] = useState(calm ? message : "");
  const [stageIdx, setStageIdx] = useState(calm ? last : 0);
  const [showStatus, setShowStatus] = useState(calm);

  const stage = stages[stageIdx] ?? stages[last];
  const isTyping = open && !calm && typed.length < message.length;
  const isLate = stage.late;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (calm) {
      setOpen(true);
      setTyped(message);
      setStageIdx(last);
      setShowStatus(true);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    const t = (fn: () => void, ms: number) => {
      timeouts.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };

    setOpen(false);
    setTyped("");
    setStageIdx(0);
    setShowStatus(false);

    t(() => setOpen(true), 280);

    message.split("").forEach((_, i) => {
      t(() => setTyped(message.slice(0, i + 1)), 480 + 32 * (i + 1));
    });

    const typingDone = 480 + 32 * message.length + 300;
    t(() => setShowStatus(true), typingDone);

    // Time drifts: now → 23 min → 4h → day → week → "вы забыли?"
    stages.forEach((_, i) => {
      if (i === 0) return;
      t(() => setStageIdx(i), typingDone + 1100 * i);
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [message, calm, last, isRu]);

  return (
    <div
      className={[
        "rounded-t-2xl border border-white/[0.08] border-b-0 shadow-[0_-16px_48px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "translate-y-0" : "translate-y-[108%]",
      ].join(" ")}
      style={{ backgroundColor: CARD_SOFT }}
    >
      <div className="flex justify-center pt-2.5 pb-1" aria-hidden>
        <span className="h-1 w-9 rounded-full bg-white/20" />
      </div>

      <div className="flex items-start gap-2.5 px-3.5 pb-3.5 pt-1.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF9A3D]/15">
          <img src="/images/icons/telegram.svg" alt="" width={20} height={20} aria-hidden className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-semibold text-white/90">Telegram</span>
            <span
              className={[
                "text-[10px] tabular-nums transition-colors duration-500",
                isLate ? "text-[#FFAB91]" : "text-white/38",
              ].join(" ")}
            >
              {stage.time}
            </span>
          </div>

          <p className="mt-1.5 min-h-[2.4rem] text-[12px] leading-snug text-white/88 sm:text-[13px]">
            {typed}
            {isTyping ? (
              <span className="ml-0.5 inline-block text-[#FF9A3D]" aria-hidden>
                |
              </span>
            ) : null}
          </p>

          <div
            className={[
              "mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition-all duration-500",
              showStatus
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0",
              isLate ? "bg-[#FF5722]/28 text-white" : "bg-white/10 text-white/88",
              stageIdx === last ? "bg-[#FF5722]/40 text-white" : "",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                isLate ? "bg-[#FF5722]" : "bg-white/90",
              ].join(" ")}
              aria-hidden
            />
            <span>{stage.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({
  title,
  titleClass,
  items,
  toneClass,
}: {
  title: string;
  titleClass: string;
  items: { label: string; tone: string }[];
  toneClass: Record<string, string>;
}) {
  return (
    <div>
      <p className={`mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${titleClass}`}>
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {items.map((item) => (
          <span
            key={item.label}
            className={[
              "inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-medium",
              toneClass[item.tone],
            ].join(" ")}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatusVisual({ isRu }: { isRu: boolean }) {
  const copy = isRu
    ? {
        goodTitle: "Как должно быть",
        badTitle: "Как сейчас",
        good: [
          { label: "Новая", tone: "soft" },
          { label: "В работе", tone: "mid" },
          { label: "Записан", tone: "strong" },
          { label: "Оплачен", tone: "paid" },
        ],
        bad: [
          { label: "Без статуса", tone: "chaos" },
          { label: "Потеряна", tone: "lost" },
          { label: "Ждёт ответа", tone: "warn" },
          { label: "Пропущена", tone: "lost" },
        ],
      }
    : {
        goodTitle: "How it should be",
        badTitle: "How it is now",
        good: [
          { label: "New", tone: "soft" },
          { label: "In progress", tone: "mid" },
          { label: "Booked", tone: "strong" },
          { label: "Paid", tone: "paid" },
        ],
        bad: [
          { label: "No status", tone: "chaos" },
          { label: "Lost", tone: "lost" },
          { label: "Awaiting", tone: "warn" },
          { label: "Missed", tone: "lost" },
        ],
      };

  const goodTone: Record<string, string> = {
    soft: "bg-emerald-500/15 text-emerald-200/85",
    mid: "bg-emerald-500/25 text-emerald-100",
    strong: "bg-emerald-500/40 text-white",
    paid: "bg-emerald-500 text-white",
  };

  const badTone: Record<string, string> = {
    chaos: "bg-white/10 text-white/70",
    warn: "bg-[#FF5722]/20 text-[#FFAB91]",
    lost: "bg-[#FF5722]/30 text-white",
  };

  return (
    <div className="min-w-0 space-y-3 pt-1 sm:pt-2">
      <StatusRow
        title={copy.goodTitle}
        titleClass="text-emerald-400/70"
        items={copy.good}
        toneClass={goodTone}
      />
      <StatusRow
        title={copy.badTitle}
        titleClass="text-[#FF8A5C]/85"
        items={copy.bad}
        toneClass={badTone}
      />
    </div>
  );
}

function AdminToolCard({
  kind,
  title,
  lines,
  isRu,
}: {
  kind: "notebook" | "calendar" | "table" | "excel" | "memory" | "chats";
  title: string;
  lines: string[];
  isRu: boolean;
}) {
  if (kind === "notebook") {
    return (
      <div className="relative w-[9.75rem] shrink-0 overflow-hidden rounded-xl bg-[#1e1c18] sm:w-[10.75rem]">
        <div
          className="absolute inset-y-0 left-0 w-3 bg-[#FF9A3D]/35"
          aria-hidden
        />
        <div
          className="absolute inset-y-2 left-[5px] flex flex-col justify-around"
          aria-hidden
        >
          {[0, 1, 2].map((n) => (
            <span key={n} className="h-1.5 w-1.5 rounded-full bg-[#141414]/80" />
          ))}
        </div>
        <div className="relative pl-5 pr-2.5 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#FF9A3D]/90">
            {title}
          </p>
          <ul className="mt-2 space-y-1.5 border-t border-dashed border-white/10 pt-2">
            {lines.map((line) => (
              <li
                key={line}
                className="border-b border-white/[0.06] pb-1 font-mono text-[10px] leading-snug text-white/70"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (kind === "calendar") {
    const days = isRu
      ? ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
      : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const cells = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const hot = new Set([3, 7, 12]);

    return (
      <div className="w-[9.75rem] shrink-0 overflow-hidden rounded-xl bg-[#1a1a1a] sm:w-[10.75rem]">
        <div className="bg-[#FF5722] px-2.5 py-1.5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90">
            {isRu ? "март" : "march"}
          </p>
        </div>
        <div className="grid grid-cols-7 gap-px px-1.5 pt-1.5 text-center text-[8px] text-white/35">
          {days.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5 px-1.5 pb-1.5 pt-1">
          {cells.map((day, i) => (
            <span
              key={i}
              className={[
                "flex h-4 items-center justify-center rounded-sm text-[9px]",
                day == null
                  ? ""
                  : hot.has(day)
                    ? "bg-[#FF5722] font-semibold text-white"
                    : "text-white/55",
              ].join(" ")}
            >
              {day ?? ""}
            </span>
          ))}
        </div>
        <p className="truncate border-t border-white/[0.06] px-2.5 py-1.5 text-[9px] text-white/50">
          {lines[0]}
        </p>
      </div>
    );
  }

  if (kind === "excel" || kind === "table") {
    return (
      <div className="w-[9.75rem] shrink-0 overflow-hidden rounded-xl bg-[#1a1a1a] sm:w-[10.75rem]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.04] px-2 py-1.5">
          {kind === "excel" ? (
            <img
              src="/images/icons/excel.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden
              className="h-3.5 w-3.5 shrink-0"
            />
          ) : (
            <span className="rounded px-1.5 py-0.5 text-[9px] font-semibold bg-white/15 text-white/80">
              Sheet
            </span>
          )}
          <span className="truncate text-[10px] text-white/50">{title}</span>
        </div>
        <div className="p-2">
          <div className="overflow-hidden rounded border border-white/10">
            {lines.map((line, row) => (
              <div
                key={line}
                className={[
                  "flex border-b border-white/10 last:border-b-0",
                  row === 0 ? "bg-white/[0.06]" : "",
                ].join(" ")}
              >
                <span className="w-5 shrink-0 border-r border-white/10 px-1 py-1 text-center text-[8px] text-white/30">
                  {row + 1}
                </span>
                <span className="truncate px-1.5 py-1 text-[9px] text-white/65">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "chats") {
    const bubbles = isRu
      ? [
          { side: "in" as const, text: "Здравствуйте!" },
          { side: "out" as const, text: "…" },
          { side: "in" as const, text: "Можно записаться?" },
        ]
      : [
          { side: "in" as const, text: "Hello!" },
          { side: "out" as const, text: "…" },
          { side: "in" as const, text: "Can I book?" },
        ];

    return (
      <div className="flex w-[9.75rem] shrink-0 flex-col overflow-hidden rounded-xl bg-[#1a1a1a] sm:w-[10.75rem]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.04] px-2.5 py-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9A3D]/20">
            <img src="/images/icons/telegram.svg" alt="" width={12} height={12} aria-hidden className="h-3 w-3" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-semibold text-white/85">{title}</p>
            <p className="text-[8px] text-white/35">{isRu ? "12 непрочит." : "12 unread"}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-2 py-2">
          {bubbles.map((b, i) => (
            <div
              key={`${b.text}-${i}`}
              className={[
                "max-w-[85%] rounded-lg px-2 py-1 text-[9px] leading-snug",
                b.side === "in"
                  ? "self-start rounded-tl-sm bg-white/10 text-white/75"
                  : "self-end rounded-tr-sm bg-[#FF5722]/35 text-white/85",
              ].join(" ")}
            >
              {b.text}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] px-2 py-1.5">
          <div className="rounded-full bg-white/[0.06] px-2 py-1 text-[8px] text-white/30">
            {isRu ? "Сообщение…" : "Message…"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-[9.75rem] shrink-0 rounded-xl px-3 py-2.5 sm:w-[10.75rem]"
      style={{ backgroundColor: CARD_SOFT }}
    >
      <p className="text-[11px] font-semibold text-[#FF9A3D]">{title}</p>
      <ul className="mt-1.5 space-y-1">
        {lines.map((line) => (
          <li key={line} className="truncate text-[11px] leading-snug text-white/60">
            <span className="text-[#FF9A3D]/80">›</span> {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminVisual({ isRu }: { isRu: boolean }) {
  const cards = isRu
    ? [
        {
          kind: "notebook" as const,
          title: "Блокнот",
          lines: ["Анна — перезвонить", "Игорь — прайс", "Салон — бронь"],
        },
        {
          kind: "calendar" as const,
          title: "Календарь",
          lines: ["15:00 — консультация"],
        },
        {
          kind: "table" as const,
          title: "Таблица",
          lines: ["строка 14 — новая", "строка 22 — ждёт", "фильтр сбит"],
        },
        {
          kind: "excel" as const,
          title: "Excel",
          lines: ["лист «заявки»", "нет статуса", "кто ответил?"],
        },
        {
          kind: "memory" as const,
          title: "Память",
          lines: ["«вроде ответил»", "«завтра напишу»", "«не помню»"],
        },
        {
          kind: "chats" as const,
          title: "Чаты",
          lines: ["12 непрочитанных", "3 пропущенных", "никто не взял"],
        },
      ]
    : [
        {
          kind: "notebook" as const,
          title: "Notebook",
          lines: ["Anna — call back", "Igor — price list", "Salon — booking"],
        },
        {
          kind: "calendar" as const,
          title: "Calendar",
          lines: ["3:00 pm — consult"],
        },
        {
          kind: "table" as const,
          title: "Sheet",
          lines: ["row 14 — new", "row 22 — waiting", "filter broken"],
        },
        {
          kind: "excel" as const,
          title: "Excel",
          lines: ["leads tab", "no status", "who replied?"],
        },
        {
          kind: "memory" as const,
          title: "Memory",
          lines: ["«think I replied»", "«will write tomorrow»", "«don’t remember»"],
        },
        {
          kind: "chats" as const,
          title: "Chats",
          lines: ["12 unread", "3 missed", "nobody took it"],
        },
      ];

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const inView = useInView(rootRef, { rootMargin: "60px 0px", threshold: 0 });

  const HOLD_MS = 2400;
  const SWIPE_MS = 480;
  const n = cards.length;

  // Two full copies for seamless infinite swipe
  const loop = [...cards, ...cards];

  useEffect(() => {
    if (!inView) return;

    let holdId = 0;
    let swipeId = 0;
    let alive = true;

    const goNext = () => {
      if (!alive) return;
      const next = indexRef.current + 1;
      indexRef.current = next;
      setNoTransition(false);
      setIndex(next);

      if (next === n) {
        // After swipe onto the duplicate of first card, snap to start
        swipeId = window.setTimeout(() => {
          if (!alive) return;
          setNoTransition(true);
          indexRef.current = 0;
          setIndex(0);
          // re-enable transition on next frame, then continue
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!alive) return;
              setNoTransition(false);
              holdId = window.setTimeout(goNext, HOLD_MS);
            });
          });
        }, SWIPE_MS);
      } else {
        holdId = window.setTimeout(goNext, HOLD_MS);
      }
    };

    holdId = window.setTimeout(goNext, HOLD_MS);
    return () => {
      alive = false;
      window.clearTimeout(holdId);
      window.clearTimeout(swipeId);
    };
  }, [n, inView]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return;
    const gap = 10;
    const step = first.offsetWidth + gap;
    track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
  }, [index]);

  return (
    <div ref={rootRef} className="relative min-w-0 overflow-hidden pt-1 sm:pt-2" style={{ overflowAnchor: "none" }}>
      <div
        ref={trackRef}
        className={[
          "flex w-max items-stretch gap-2.5 will-change-transform",
          noTransition
            ? "transition-none"
            : "transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        ].join(" ")}
      >
        {loop.map((card, i) => (
          <AdminToolCard
            key={`${card.kind}-${i}`}
            kind={card.kind}
            title={card.title}
            lines={card.lines}
            isRu={isRu}
          />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#141414] to-transparent"
        aria-hidden
      />
    </div>
  );
}

function PainBentoCard({
  title,
  text,
  visual,
  accent = false,
  overlay = false,
  bgImage,
  bgAlways = false,
  bgBlur = false,
  bgPosition = "center center",
  className,
}: {
  title: string;
  text: string;
  visual: ReactNode;
  accent?: boolean;
  /** Visual as bottom sheet overlapping the title/text */
  overlay?: boolean;
  bgImage?: string;
  bgAlways?: boolean;
  bgBlur?: boolean;
  bgPosition?: string;
  className?: string;
}) {
  return (
    <article
      className={[
        "relative isolate flex flex-col overflow-hidden rounded-[20px] sm:rounded-2xl",
        "min-h-0 sm:min-h-[260px] bg-[#141414]",
        className ?? "",
      ].join(" ")}
      style={{ backgroundColor: CARD_DARK }}
    >
      {bgImage ? (
        <>
          <img
            src={bgImage}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className={[
              "absolute inset-0 z-0 h-full w-full scale-[1.08] object-cover",
              bgAlways ? "opacity-100" : "opacity-0",
              bgBlur ? "blur-[5px] brightness-[0.68] saturate-[0.92]" : "",
            ].join(" ")}
            style={{ objectPosition: bgPosition }}
          />
          {bgAlways ? (
            <div
              className={[
                "pointer-events-none absolute inset-0 z-0",
                bgBlur
                  ? "bg-gradient-to-b from-black/55 via-black/48 to-black/72"
                  : accent
                    ? "bg-gradient-to-b from-black/55 via-black/48 to-black/78"
                    : "bg-gradient-to-b from-black/60 via-black/48 to-black/78",
              ].join(" ")}
              aria-hidden
            />
          ) : null}
        </>
      ) : null}
      <div
        className={[
          "relative z-[1] flex flex-1 flex-col",
          overlay ? "px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-8" : "px-5 pb-4 pt-5 sm:p-8",
        ].join(" ")}
      >
        {overlay ? (
          <div className="relative z-[1] flex min-h-[240px] flex-1 flex-col justify-start pb-[6.75rem] sm:min-h-[280px] sm:pb-[7.5rem]">
            <h3 className="font-hero text-[22px] font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[24px]">
              {title}
            </h3>
            <p className="mt-2.5 max-w-[36ch] text-[15px] leading-[1.55] text-white/72 sm:text-[16px] sm:leading-[1.6]">
              {text}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-5 sm:min-h-[96px]">{visual}</div>
            <div className="flex flex-col gap-2 sm:mt-auto sm:gap-0">
              <h3 className="font-hero text-[22px] font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[24px]">
                {title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-white/72 sm:mt-2.5 sm:text-[16px] sm:leading-[1.6]">
                {text}
              </p>
            </div>
          </>
        )}
      </div>

      {overlay ? (
        <div className="pointer-events-none absolute inset-x-3 bottom-0 z-[3] sm:inset-x-4">
          {visual}
        </div>
      ) : null}
    </article>
  );
}

export default function LandingPainSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const isRu = lang === "ru";
  const items = copy.pain.items;

  return (
    <section
      id="pain"
      className="relative z-[1] mt-2 scroll-mt-[calc(var(--tivonix-header-spacer)+12px)] bg-black pt-6 pb-14 sm:mt-6 sm:pt-4 sm:pb-20 lg:mt-8 lg:pt-6 lg:pb-24"
    >
      <Container className="relative">
        <div className="min-w-0 text-center">
          <h2
            className={`${LANDING_HEADLINE_CLASS} text-center leading-[1.08] sm:leading-[0.98]`}
          >
            {copy.pain.titleLines.map((line, i) => (
              <span key={line} className="block">
                {i > 0 ? " " : null}
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:items-stretch">
          <PainBentoCard
            className="h-auto sm:h-full lg:col-span-8 lg:min-h-[340px]"
            title={items[0].title}
            text={items[0].text}
            bgImage={PAIN_CARD_BACKGROUNDS[0]}
            visual={<ChannelsVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-auto sm:h-full lg:col-span-4 lg:min-h-[340px]"
            title={items[1].title}
            text={items[1].text}
            accent
            overlay
            bgImage={PAIN_CARD_BACKGROUNDS[1]}
            bgAlways
            bgBlur
            bgPosition="center 32%"
            visual={<TelegramVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-auto sm:h-full lg:col-span-6"
            title={items[3].title}
            text={items[3].text}
            bgImage={PAIN_CARD_BACKGROUNDS[3]}
            visual={<AdminVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-auto sm:h-full lg:col-span-6"
            title={items[2].title}
            text={items[2].text}
            bgImage={PAIN_CARD_BACKGROUNDS[2]}
            visual={<StatusVisual isRu={isRu} />}
          />
        </div>
      </Container>
    </section>
  );
}

