import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, Check, Loader2, Shield } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { LANDING_HEADLINE_CLASS } from "../../lib/landingLayout";

const CARD_DARK = "#141414";
const CARD_SOFT = "#262626";
const PAIN_CARD_BACKGROUNDS = [
  "/images/hero-stage-1.webp",
  "/images/pain-bg-4.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-3.webp",
] as const;

function animStyle(delayMs: number, durationMs?: number): CSSProperties {
  return {
    animationDelay: `${delayMs}ms`,
    ...(durationMs ? { animationDuration: `${durationMs}ms` } : {}),
  };
}

function FadeList({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#141414] to-transparent"
        aria-hidden
      />
    </div>
  );
}

function ChannelsVisual({ isRu }: { isRu: boolean }) {
  const rows = isRu
    ? [
        { ch: "Instagram", status: "3 непрочитанных", pending: true },
        { ch: "Telegram", status: "Ответ через 47 мин", pending: true },
        { ch: "Сайт", status: "В таблице", pending: false },
        { ch: "Звонок", status: "Не зафиксирован", pending: true },
      ]
    : [
        { ch: "Instagram", status: "3 unread", pending: true },
        { ch: "Telegram", status: "Reply in 47 min", pending: true },
        { ch: "Website", status: "In spreadsheet", pending: false },
        { ch: "Call", status: "Not logged", pending: true },
      ];
  return (
    <FadeList>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div
            key={r.ch}
            className="pain-row-pulse flex items-center justify-between gap-3 rounded-lg bg-white/[0.05] px-3 py-2.5"
            style={animStyle(i * 420, 2800)}
          >
            <span className="text-[12px] font-medium text-white/90">{r.ch}</span>
            <span className="flex items-center gap-1.5 text-[11px] text-white/40">
              {r.pending ? (
                <Loader2 size={11} className="animate-spin text-[#FF5722]/90" />
              ) : (
                <Check size={11} className="text-white/35" />
              )}
              <span className="pain-shimmer" style={animStyle(i * 300 + 200)}>
                {r.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </FadeList>
  );
}

function TelegramVisual({ isRu }: { isRu: boolean }) {
  const message = isRu
    ? "Здравствуйте, хочу записаться на консультацию…"
    : "Hi, I'd like to book a consultation…";
  const times = isRu ? ["сейчас", "32 мин", "1 ч назад"] : ["now", "32 min", "1 hr ago"];
  const status = isRu ? "Менеджер ещё не видел" : "Manager hasn't seen it";

  const [typed, setTyped] = useState("");
  const [timeIdx, setTimeIdx] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const [cycle, setCycle] = useState(0);

  const isTyping = typed.length < message.length;
  const isLate = timeIdx >= 2;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(message);
      setTimeIdx(2);
      setShowStatus(true);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    const t = (fn: () => void, ms: number) => {
      timeouts.push(window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms));
    };

    setTyped("");
    setTimeIdx(0);
    setShowStatus(false);

    message.split("").forEach((_, i) => {
      t(() => setTyped(message.slice(0, i + 1)), 38 * (i + 1));
    });

    const typingDone = 38 * message.length + 320;

    t(() => setShowStatus(true), typingDone);
    t(() => setTimeIdx(1), typingDone + 1600);
    t(() => setTimeIdx(2), typingDone + 3400);
    t(() => setCycle((c) => c + 1), typingDone + 6200);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [message, cycle]);

  return (
    <div
      className="flex items-start gap-2.5 rounded-xl p-3 sm:p-3.5"
      style={{ backgroundColor: CARD_SOFT }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.1]">
        <SiTelegram size={20} className="text-[#FF9A3D]" aria-hidden />
      </span>

      <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-white/55">Telegram</span>
            <span
              className={[
                "text-[10px] tabular-nums transition-colors duration-500",
                isLate ? "text-[#FFAB91] pain-blink" : "text-white/38",
              ].join(" ")}
            >
              {times[timeIdx]}
            </span>
          </div>

          <p className="mt-1.5 min-h-[2.6rem] text-[12px] leading-snug text-white/90 sm:text-[13px]">
            {typed}
            {isTyping && <span className="pain-cursor ml-0.5 inline-block text-[#FF9A3D]" aria-hidden />}
          </p>

          <div
            className={[
              "mt-2.5 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[10px] transition-all duration-500 ease-out",
              showStatus ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0",
              isLate ? "bg-[#FF5722]/28 text-white pain-glow" : "bg-white/10 text-white/88",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                isLate ? "pain-dot-pulse bg-[#FF5722]" : "pain-dot-pulse bg-white/90",
              ].join(" ")}
              aria-hidden
            />
            <span className={isLate ? "pain-blink" : undefined}>{status}</span>
          </div>
      </div>
    </div>
  );
}

function StatusPill({
  label,
  variant = "ok",
}: {
  label: string;
  variant?: "ok" | "warn" | "unknown" | "lost";
}) {
  const styles = {
    ok: "bg-white/[0.06] text-white/58",
    warn: "bg-white/[0.05] text-white/42 pain-shimmer",
    unknown: "bg-white/[0.05] text-white/30 pain-blink",
    lost: "pain-glow bg-[#FF5722]/20 text-[#FF8A5C]",
  };

  return (
    <span className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}

const STATUS_MARQUEE_STYLES = `
  @keyframes pain-status-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes pain-status-right {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }
  .pain-status-track-left {
    animation: pain-status-left 26s linear infinite;
  }
  .pain-status-track-right {
    animation: pain-status-right 30s linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .pain-status-track-left,
    .pain-status-track-right {
      animation: none !important;
    }
  }
`;

type StatusItem = { label: string; variant?: "ok" | "warn" | "unknown" | "lost" };

function StatusMarqueeRow({
  items,
  direction,
}: {
  items: StatusItem[];
  direction: "left" | "right";
}) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className={[
          "flex w-max gap-2",
          direction === "left" ? "pain-status-track-left" : "pain-status-track-right",
        ].join(" ")}
      >
        {track.map((item, i) => (
          <StatusPill key={`${item.label}-${i}`} label={item.label} variant={item.variant} />
        ))}
      </div>
    </div>
  );
}

function StatusVisual({ isRu }: { isRu: boolean }) {
  const rowLeft: StatusItem[] = isRu
    ? [
        { label: "Новая", variant: "ok" },
        { label: "В работе", variant: "ok" },
        { label: "Записан", variant: "warn" },
        { label: "Оплачен", variant: "ok" },
        { label: "На связи", variant: "warn" },
      ]
    : [
        { label: "New", variant: "ok" },
        { label: "In progress", variant: "ok" },
        { label: "Booked", variant: "warn" },
        { label: "Paid", variant: "ok" },
        { label: "Contacted", variant: "warn" },
      ];

  const rowRight: StatusItem[] = isRu
    ? [
        { label: "???", variant: "unknown" },
        { label: "Потеряна", variant: "lost" },
        { label: "Не обработана", variant: "warn" },
        { label: "Ждёт ответа", variant: "unknown" },
        { label: "Пропущена", variant: "lost" },
      ]
    : [
        { label: "???", variant: "unknown" },
        { label: "Lost", variant: "lost" },
        { label: "Unprocessed", variant: "warn" },
        { label: "Awaiting reply", variant: "unknown" },
        { label: "Missed", variant: "lost" },
      ];

  return (
    <>
      <style>{STATUS_MARQUEE_STYLES}</style>
      <div className="min-w-0 pt-4 sm:pt-5">
        <Shield
          size={14}
          className="pain-shimmer mb-3 text-[#FF5722]"
          strokeWidth={1.75}
          aria-hidden
        />
        <div className="space-y-2">
          <StatusMarqueeRow items={rowLeft} direction="left" />
          <StatusMarqueeRow items={rowRight} direction="right" />
        </div>
      </div>
    </>
  );
}

function AdminVisual({ isRu }: { isRu: boolean }) {
  const lines = isRu
    ? [
        { label: "Блокнот", value: "Анна — перезвонить" },
        { label: "Таблица", value: "строка 14" },
        { label: "Память", value: "«вроде ответил»", uncertain: true },
      ]
    : [
        { label: "Notebook", value: "Anna — call back" },
        { label: "Sheet", value: "row 14" },
        { label: "Memory", value: "«think I replied»", uncertain: true },
      ];

  return (
    <div className="space-y-2 font-mono text-[11px] leading-relaxed sm:text-[12px]">
      {lines.map((line, i) => (
        <p
          key={line.label}
          className={line.uncertain ? "pain-blink text-white/50" : "pain-fade-cycle text-white/48"}
          style={animStyle(i * 500, 3200)}
        >
          <span className="text-[#FF9A3D]">›</span>{" "}
          <span className="text-white/55">{line.label}:</span> {line.value}
        </p>
      ))}
    </div>
  );
}

function FlowTerminalVisual({ isRu }: { isRu: boolean }) {
  const header = "form.submit → email";
  const branches = isRu
    ? [
        { prefix: "└─", text: "вручную в таблицу" },
        { prefix: "└─", text: "статус: неизвестно" },
        { prefix: "└─", label: "Telegram:", value: "нет", missing: true },
      ]
    : [
        { prefix: "└─", text: "manual spreadsheet" },
        { prefix: "└─", text: "status: unknown" },
        { prefix: "└─", label: "Telegram:", value: "none", missing: true },
      ];

  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const totalSteps = 1 + branches.length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(totalSteps);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    const t = (fn: () => void, ms: number) => {
      timeouts.push(window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms));
    };

    setStep(0);
    for (let i = 1; i <= totalSteps; i++) {
      t(() => setStep(i), 520 * i);
    }
    t(() => setCycle((c) => c + 1), 520 * totalSteps + 2400);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [totalSteps, cycle, isRu]);

  const showEnter = step >= totalSteps;

  return (
    <div
      className="rounded-xl p-3.5 font-mono sm:p-4"
      style={{ backgroundColor: CARD_SOFT }}
    >
        <div className="mb-3 flex items-center gap-1.5 border-b border-white/[0.06] pb-2.5">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-[#28C840]/80" aria-hidden />
          <span className="ml-auto text-[9px] uppercase tracking-wide text-white/28">
            {isRu ? "обработка" : "handler"}
          </span>
        </div>

        <div className="space-y-1 text-[10px] leading-[1.8] sm:text-[11px]">
          <p
            className={[
              "text-white/78 transition-opacity duration-300",
              step >= 1 ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {header}
          </p>

          {branches.map((line, i) => {
            const visible = step >= i + 2;

            return (
              <p
                key={line.text ?? line.label}
                className={[
                  "transition-opacity duration-300",
                  visible ? "opacity-100" : "opacity-0",
                  line.missing ? "" : "text-white/42",
                ].join(" ")}
              >
                <span className="text-white/35">{line.prefix} </span>
                {line.missing ? (
                  <>
                    <span className="text-white/42">{line.label} </span>
                    <span className="pain-blink text-[#FF5722]">{line.value}</span>
                  </>
                ) : (
                  line.text
                )}
              </p>
            );
          })}
        </div>

        <div
          className={[
            "mt-4 flex items-center justify-end gap-1.5 transition-all duration-500",
            showEnter ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
          ].join(" ")}
        >
          <span className="pain-cursor text-[#FF9A3D]" aria-hidden />
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FF5722] px-2.5 py-1 text-[10px] font-medium text-white">
            Enter ↵
          </span>
        </div>
    </div>
  );
}

function PainBentoCard({
  title,
  text,
  solution,
  hoverCta,
  visual,
  accent = false,
  split = false,
  bgImage,
  bgAlways = false,
  bgPosition = "center center",
  className,
  href = "#offer",
}: {
  title: string;
  text: string;
  solution: string;
  hoverCta: string;
  visual: ReactNode;
  accent?: boolean;
  split?: boolean;
  bgImage?: string;
  bgAlways?: boolean;
  bgPosition?: string;
  className?: string;
  href?: string;
}) {
  const hoverBg = bgImage ?? "/images/hero-stage-1.webp";

  return (
    <article
      className={[
        "group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        accent ? "bg-[#FF5722]" : "bg-[#141414]",
        className ?? "",
      ].join(" ")}
      style={accent ? undefined : { backgroundColor: CARD_DARK }}
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
              "absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              bgAlways ? "opacity-100" : "opacity-0 motion-safe:group-hover:opacity-100",
            ].join(" ")}
            style={{ objectPosition: bgPosition }}
          />
          <div
            className={[
              "pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              bgAlways ? "opacity-100" : "opacity-0 motion-safe:group-hover:opacity-100",
              accent
                ? "bg-gradient-to-b from-black/40 via-black/35 to-black/55"
                : bgAlways
                  ? "bg-gradient-to-b from-black/55 via-black/42 to-black/68"
                  : "bg-gradient-to-b from-black/72 via-black/58 to-black/82",
            ].join(" ")}
            aria-hidden
          />
        </>
      ) : null}
      <div
        className={[
          "relative z-[1] flex flex-1 flex-col p-6 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8",
          "motion-safe:group-hover:opacity-0 motion-safe:group-hover:translate-y-[-6px]",
        ].join(" ")}
      >
        {split ? (
          <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_minmax(260px,440px)] lg:items-center">
            <div className="order-2 lg:order-1">
              <h3 className="font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/48 sm:text-[14px]">{text}</p>
            </div>
            <div className="order-1 lg:order-2 lg:self-start">{visual}</div>
          </div>
        ) : (
          <>
            <div className="mb-5 min-h-[88px] sm:min-h-[96px]">{visual}</div>
            <div className="mt-auto">
              <h3 className="font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]">
                {title}
              </h3>
              <p
                className={[
                  "mt-2 text-[13px] leading-[1.6] sm:text-[14px]",
                  accent ? "text-white/80" : "text-white/48",
                ].join(" ")}
              >
                {text}
              </p>
            </div>
          </>
        )}
      </div>

      <a
        href={href}
        className={[
          "absolute inset-0 z-[2] flex flex-col no-underline opacity-0 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "translate-y-2 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:opacity-100",
          "max-md:pointer-events-none max-md:opacity-0",
          "focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9A3D]/50",
        ].join(" ")}
        aria-label={`${hoverCta}: ${title}`}
      >
        <div className="relative flex flex-1 flex-col justify-end overflow-hidden p-6 pb-5 sm:p-8 sm:pb-6">
          <img
            src={hoverBg}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-[28px]"
            style={{ objectPosition: bgPosition }}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-black/45"
            aria-hidden
          />
          <p className="relative z-[1] max-w-[42ch] text-[14px] leading-[1.65] text-white sm:text-[15px] sm:leading-[1.7]">
            {solution}
          </p>
        </div>

        <div className="relative z-[1] flex items-center justify-between gap-3 bg-[#141414] px-6 py-4 sm:px-8 sm:py-5">
          <span className="text-[13px] font-medium text-white sm:text-[14px]">{hoverCta}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white motion-safe:group-hover:animate-pulse">
            <ArrowRight size={14} strokeWidth={2} aria-hidden />
          </span>
        </div>
      </a>

      <div className="bg-white/[0.04] px-6 py-4 md:hidden">
        <a
          href={href}
          className="block text-[13px] leading-[1.6] text-white/55 no-underline transition hover:text-white/80"
        >
          {solution}
        </a>
      </div>
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
      className="relative z-[1] mt-4 scroll-mt-[var(--tivonix-header-spacer)] bg-black pt-2 pb-16 sm:mt-6 sm:pt-4 sm:pb-20 lg:mt-8 lg:pt-6 lg:pb-24"
    >
      <Container className="relative">
        <div className="min-w-0 text-center">
          <h2 className={`${LANDING_HEADLINE_CLASS} text-center`}>
            {copy.pain.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-12 lg:items-stretch">
          <PainBentoCard
            className="h-full lg:col-span-8 lg:min-h-[340px]"
            title={items[0].title}
            text={items[0].text}
            solution={items[0].solution}
            hoverCta={copy.pain.hoverCta}
            bgImage={PAIN_CARD_BACKGROUNDS[0]}
            visual={<ChannelsVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-full lg:col-span-4 lg:min-h-[340px]"
            title={items[1].title}
            text={items[1].text}
            solution={items[1].solution}
            hoverCta={copy.pain.hoverCta}
            accent
            bgImage={PAIN_CARD_BACKGROUNDS[1]}
            bgAlways
            visual={<TelegramVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-full lg:col-span-6"
            title={items[3].title}
            text={items[3].text}
            solution={items[3].solution}
            hoverCta={copy.pain.hoverCta}
            bgImage={PAIN_CARD_BACKGROUNDS[3]}
            visual={<AdminVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-full lg:col-span-6"
            title={items[2].title}
            text={items[2].text}
            solution={items[2].solution}
            hoverCta={copy.pain.hoverCta}
            bgImage={PAIN_CARD_BACKGROUNDS[2]}
            visual={<StatusVisual isRu={isRu} />}
          />

          <PainBentoCard
            className="h-full sm:col-span-2 lg:col-span-12 lg:min-h-[280px]"
            title={items[4].title}
            text={items[4].text}
            solution={items[4].solution}
            hoverCta={copy.pain.hoverCta}
            bgImage={PAIN_CARD_BACKGROUNDS[4]}
            bgAlways
            bgPosition="center center"
            split
            visual={<FlowTerminalVisual isRu={isRu} />}
          />
        </div>
      </Container>
    </section>
  );
}

