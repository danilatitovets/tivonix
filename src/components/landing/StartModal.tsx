import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/Button";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

const BRAND_CTA =
  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";

const ORANGE_STATIC =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";

const CONIC_FRAME =
  "conic-gradient(from 210deg at 50% 50%, rgba(143,191,179,0.95), rgba(143,168,200,0.95), rgba(232,220,200,0.95), rgba(143,191,179,0.95))";

const CONTACT_EMAIL = "tivoonix@gmail.com";

function isProbablyMobile() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
  return (
    !!coarse ||
    /Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(ua) ||
    window.innerWidth < 820
  );
}

function openEmailDraft(to: string, subject: string, body: string) {
  const mailto =
    `mailto:${to}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  const gmail =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  if (isProbablyMobile()) {
    window.location.href = mailto;
    return;
  }

  const w = window.open(gmail, "_blank", "noopener,noreferrer");
  if (!w) window.location.href = mailto;
}

/* ================= Progress ================= */

function ModalProgressBar({
  progress,
  label,
}: {
  progress: number;
  label: string;
}) {
  const p = clamp(progress, 0, 1);
  const pct = Math.round(p * 100);
  const thumbLeft = `calc(${pct}% - 8px)`;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-6 w-full">
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/10" />

        <div className="absolute inset-x-0 top-1/2 h-[8px] -translate-y-1/2 overflow-hidden rounded-full bg-white/8">
          <div
            className="absolute top-0 bottom-0 left-0 rounded-full"
            style={
              {
                width: `${pct}%`,
                background: BRAND_CTA,
                boxShadow: "0 0 28px rgba(255,120,40,0.55)",
                transition: "width 260ms cubic-bezier(.2,.9,.2,1)",
                backgroundSize: "200% 100%",
                animation: pct > 0 ? "tivonixBar 1.8s linear infinite" : "none",
              } as React.CSSProperties
            }
          />
        </div>

        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-white/45 bg-black/85"
          style={
            {
              left: thumbLeft,
              transition: "left 260ms cubic-bezier(.2,.9,.2,1)",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="flex min-w-[64px] flex-col items-end">
        <div className="text-[12px] font-extrabold tracking-wide text-white/90">
          {pct}%
        </div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ================= Select (portal, not clipped by scroll) ================= */

type Opt = { value: string; label: string };

function CurvyCheck({ on }: { on: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={cx("transition-opacity", on ? "opacity-100" : "opacity-0")}
    >
      <path
        d="M5.5 12.6c2.0 1.6 3.3 3.2 4.2 5.1 2.6-4.8 5.8-8.2 10.0-11.2"
        stroke="#FF9A3D"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={cx(
        "transition-transform duration-200",
        open ? "rotate-180" : "rotate-0"
      )}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FancySelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Opt[];
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState<{
    left: number;
    top: number;
    width: number;
    maxH: number;
  } | null>(null);

  const current = options.find((o) => o.value === value)?.label ?? value;

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const b = btnRef.current;
      if (!b) return;
      const r = b.getBoundingClientRect();
      const gap = 8;
      const top = Math.round(r.bottom + gap);
      const maxH = Math.max(160, Math.round(window.innerHeight - top - 16));
      setPos({
        left: Math.round(r.left),
        top,
        width: Math.round(r.width),
        maxH,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const b = btnRef.current;
      if (b && b.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dropdown =
    open && pos
      ? createPortal(
          <div
            className="z-[9999]"
            style={
              {
                position: "fixed",
                left: pos.left,
                top: pos.top,
                width: pos.width,
              } as React.CSSProperties
            }
          >
            <div
              className="overflow-hidden rounded-2xl p-[1px] shadow-[0_28px_90px_rgba(0,0,0,0.65)]"
              style={{ background: CONIC_FRAME } as React.CSSProperties}
            >
              <div
                className="tivonix-dd max-h-[320px] overflow-auto rounded-2xl border border-white/10 bg-black/75 backdrop-blur-2xl"
                style={
                  {
                    maxHeight: pos.maxH,
                    WebkitOverflowScrolling: "touch",
                  } as React.CSSProperties
                }
              >
                {options.map((o) => {
                  const active = o.value === value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                      }}
                      className={cx(
                        "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition",
                        active
                          ? "bg-white/[0.08] text-white"
                          : "bg-transparent text-white/78 hover:bg-white/[0.06] hover:text-white"
                      )}
                    >
                      <span className="text-[13px] font-semibold">{o.label}</span>
                      <CurvyCheck on={active} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div>
      <div className="mb-1.5 text-[11.5px] font-semibold text-white/70">
        {label}
      </div>

      <div
        className="rounded-2xl p-[1px]"
        style={
          {
            background:
              "linear-gradient(90deg, rgba(255,154,61,0.72), rgba(255,255,255,0.10), rgba(143,168,200,0.35))",
          } as React.CSSProperties
        }
      >
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cx(
            "flex h-11 w-full items-center justify-between gap-3 rounded-2xl px-4",
            "border border-white/12 bg-white/[0.07] text-white",
            "backdrop-blur-xl outline-none",
            "hover:bg-white/[0.09] transition"
          )}
        >
          <span className="text-[13px] text-white/90">{current}</span>
          <span className="shrink-0">
            <Chevron open={open} />
          </span>
        </button>
      </div>

      {dropdown}
    </div>
  );
}

/* ================= Modal ================= */

type Props = { open: boolean; onClose: () => void };

type FormState = {
  name: string;
  email: string;
  telegram: string;
  company: string;
  projectType: string;
  budget: string;
  timeframe: string;
  details: string;
};

export default function StartModal({ open, onClose }: Props) {
  const { lang } = useLang();
  const isRu = lang === "ru";

  // дефолты зависят от языка
  const defaults = useMemo(
    () => ({
      type: isRu ? "Лендинг / сайт" : "Landing / website",
      budget: isRu ? "Не знаю" : "Not sure",
      time: isRu ? "1–2 недели" : "1–2 weeks",
    }),
    [isRu]
  );

  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [sending, setSending] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [form, setForm] = useState<FormState>(() => ({
    name: "",
    email: "",
    telegram: "",
    company: "",
    projectType: defaults.type,
    budget: defaults.budget,
    timeframe: defaults.time,
    details: "",
  }));

  // чтобы при смене языка дефолты не ломали выбранное пользователем
  useEffect(() => {
    setForm((p) => {
      const wasDefaultType =
        p.projectType === "Лендинг / сайт" || p.projectType === "Landing / website";
      const wasDefaultBudget = p.budget === "Не знаю" || p.budget === "Not sure";
      const wasDefaultTime = p.timeframe === "1–2 недели" || p.timeframe === "1–2 weeks";

      return {
        ...p,
        projectType: wasDefaultType ? defaults.type : p.projectType,
        budget: wasDefaultBudget ? defaults.budget : p.budget,
        timeframe: wasDefaultTime ? defaults.time : p.timeframe,
      };
    });
  }, [defaults.type, defaults.budget, defaults.time]);

  // show/hide animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = window.setTimeout(() => setMounted(false), 200);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // lock page scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // focus
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => nameRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);

  // Esc close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const txt = useMemo(
    () => ({
      title: isRu ? "Заявка на сайт" : "Request",
      subtitle: isRu
        ? "Заполни пару полей — отвечу быстро."
        : "Fill a few fields — I’ll reply fast.",
      name: isRu ? "Имя" : "Name",
      email: "Email",
      telegram: isRu ? "Telegram / телефон" : "Telegram / phone",
      company: isRu ? "Компания" : "Company",
      projectType: isRu ? "Тип проекта" : "Project type",
      budget: isRu ? "Бюджет" : "Budget",
      timeframe: isRu ? "Сроки" : "Timeframe",
      details: isRu ? "Задача" : "Task",
      detailsPh: isRu
        ? "Коротко: страницы, примеры, функции…"
        : "Short: pages, examples, features…",
      send: isRu ? "Отправить" : "Send",
      cancel: isRu ? "Отмена" : "Cancel",
      required: isRu ? "Укажи имя и контакт." : "Add name and a contact.",
      close: isRu ? "Закрыть" : "Close",
      progressLabel: isRu ? "ГОТОВО" : "DONE",
      note: isRu ? "Откроется письмо в почте." : "Opens an email draft.",
    }),
    [isRu]
  );

  const has = (v: string) => v.trim().length > 0;

  const progressPct = useMemo(() => {
    const steps = [
      has(form.name),
      has(form.email) || has(form.telegram),
      form.projectType !== defaults.type,
      form.budget !== defaults.budget,
      form.timeframe !== defaults.time,
      has(form.details),
    ];
    const total = steps.length;
    const done = steps.filter(Boolean).length;
    let pct = Math.round((done / total) * 100);

    const any =
      has(form.name) ||
      has(form.email) ||
      has(form.telegram) ||
      has(form.details) ||
      form.projectType !== defaults.type ||
      form.budget !== defaults.budget ||
      form.timeframe !== defaults.time;

    if (pct === 0 && any) pct = 5;
    return pct;
  }, [form, defaults.type, defaults.budget, defaults.time]);

  const shouldRender = mounted || open;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setErrorText("");
    setForm((p) => ({ ...p, [k]: v }));
  };

  const submit = async () => {
    const hasName = form.name.trim().length > 1;
    const hasContact = form.email.trim().length > 3 || form.telegram.trim().length > 2;

    if (!hasName || !hasContact) {
      setErrorText(txt.required);
      return;
    }

    setSending(true);
    try {
      const subject = `[TIVONIX] ${isRu ? "Заявка" : "Request"} — ${form.name
        .trim()
        .slice(0, 64)}`;

      const body =
        (isRu ? "Заявка на создание сайта" : "Website request") +
        "\n\n" +
        `${txt.name}: ${form.name || "-"}\n` +
        `${txt.email}: ${form.email || "-"}\n` +
        `${txt.telegram}: ${form.telegram || "-"}\n` +
        `${txt.company}: ${form.company || "-"}\n` +
        `${txt.projectType}: ${form.projectType || "-"}\n` +
        `${txt.budget}: ${form.budget || "-"}\n` +
        `${txt.timeframe}: ${form.timeframe || "-"}\n\n` +
        `${txt.details}:\n${form.details || "-"}\n`;

      openEmailDraft(CONTACT_EMAIL, subject, body);
      onClose();
    } finally {
      setSending(false);
    }
  };

  const onOverlayMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputBase = cx(
    "w-full h-11 rounded-2xl px-4",
    "border border-white/12 bg-white/[0.07] text-white placeholder:text-white/35",
    "outline-none focus:border-white/22 focus:bg-white/[0.09]",
    "backdrop-blur-xl text-[13px]"
  );

  // фиксируем реальную высоту карточки — иначе body может не скроллиться до футера
  const cardH = "min(860px, calc(100dvh - 28px))";

  if (!shouldRender) return null;

  return (
    <div
      className={cx(
        "fixed inset-0 z-[70]",
        "flex items-center justify-center",
        "px-3 sm:px-5 py-4"
      )}
      onMouseDown={onOverlayMouseDown}
      aria-hidden={!open}
    >
      <style>
        {`
          @keyframes tivonixBar {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 0%; }
          }

          /* кастомный скролл только в модалке */
          .tivonix-body {
            overflow-y: auto;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
          }

          /* desktop: скрываем полосу */
          @media (min-width: 1024px) {
            .tivonix-body { scrollbar-width: none; }
            .tivonix-body::-webkit-scrollbar { width: 0; height: 0; }
          }

          /* mobile: тонкий кастомный */
          @media (max-width: 1023.98px) {
            .tivonix-body {
              scrollbar-width: thin;
              scrollbar-color: rgba(255,154,61,.75) rgba(255,255,255,.08);
            }
            .tivonix-body::-webkit-scrollbar { width: 7px; }
            .tivonix-body::-webkit-scrollbar-track {
              background: rgba(255,255,255,.08);
              border-radius: 999px;
            }
            .tivonix-body::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, rgba(255,215,176,.95), rgba(255,154,61,.98), rgba(255,106,26,.98));
              border-radius: 999px;
              border: 2px solid rgba(0,0,0,.45);
            }
          }

          /* dropdown scroll */
          .tivonix-dd {
            scrollbar-width: thin;
            scrollbar-color: rgba(255,154,61,.75) rgba(255,255,255,.08);
          }
          .tivonix-dd::-webkit-scrollbar { width: 7px; }
          .tivonix-dd::-webkit-scrollbar-track { background: rgba(255,255,255,.08); border-radius: 999px; }
          .tivonix-dd::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(255,215,176,.95), rgba(255,154,61,.98), rgba(255,106,26,.98));
            border-radius: 999px;
            border: 2px solid rgba(0,0,0,.45);
          }
        `}
      </style>

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-[12px] transition-opacity duration-200"
        style={{ opacity: open && visible ? 1 : 0 }}
      />

      <div
        className={cx(
          "relative w-full",
          "max-w-[430px] sm:max-w-[760px] lg:max-w-[940px]",
          "transition-[transform,opacity] duration-200 ease-out"
        )}
        style={
          {
            opacity: open && visible ? 1 : 0,
            transform: open && visible
              ? "translateY(0) scale(1)"
              : "translateY(16px) scale(0.97)",
            pointerEvents: open ? "auto" : "none",
          } as React.CSSProperties
        }
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={txt.title}
      >
        <div
          className="rounded-[26px] p-[1px] shadow-[0_30px_110px_rgba(0,0,0,0.70)]"
          style={{ background: CONIC_FRAME } as React.CSSProperties}
        >
          {/* CARD */}
          <div
            className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/45 backdrop-blur-2xl"
            style={{ height: cardH } as React.CSSProperties}
          >
            {/* bg layers */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.85]"
              style={
                {
                  backgroundImage: "url(/images/hero.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)",
                  transform: "scale(1.06)",
                } as React.CSSProperties
              }
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-90"
              style={
                {
                  backgroundImage:
                    "radial-gradient(760px 420px at 18% 10%, rgba(255,154,61,0.18), transparent 60%)," +
                    "radial-gradient(720px 520px at 86% 35%, rgba(143,168,200,0.18), transparent 62%)," +
                    "radial-gradient(520px 520px at 42% 110%, rgba(143,191,179,0.16), transparent 60%)",
                } as React.CSSProperties
              }
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.24]"
              style={
                {
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.20) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                  maskImage:
                    "radial-gradient(closest-side at 50% 40%, black, transparent 82%)",
                  WebkitMaskImage:
                    "radial-gradient(closest-side at 50% 40%, black, transparent 82%)",
                } as React.CSSProperties
              }
            />

            {/* GRID: header / body / footer  */}
            <div className="relative z-10 grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
              {/* HEADER (fixed, no scroll) */}
              <div className="px-4 pt-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-xl sm:hidden">
                      <img
                        src="/images/tivonix-logo-icon.png"
                        alt="TIVONIX"
                        className="h-6 w-6 opacity-90"
                        draggable={false}
                      />
                    </div>

                    <img
                      src="/images/tivonix-logo-lockup.png"
                      alt="TIVONIX"
                      draggable={false}
                      className="hidden h-9 w-auto opacity-90 sm:block"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className={cx(
                      "grid h-9 w-9 place-items-center rounded-2xl sm:h-10 sm:w-10",
                      "border border-white/14 bg-white/[0.07] backdrop-blur-xl",
                      "hover:bg-white/[0.10] active:scale-[0.97] transition"
                    )}
                    aria-label={txt.close}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 6L18 18"
                        stroke="#FFB36A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 6L6 18"
                        stroke="#FFB36A"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-3">
                  <ModalProgressBar
                    progress={progressPct / 100}
                    label={txt.progressLabel}
                  />
                </div>

                {/* divider like header */}
                <div className="pointer-events-none mt-3 h-5">
                  <div
                    className="mx-auto h-[2px] w-full rounded-full opacity-95"
                    style={{ background: ORANGE_STATIC } as React.CSSProperties}
                  />
                  <div
                    className="mx-auto mt-[-2px] h-6 w-full blur-2xl opacity-40"
                    style={{ background: ORANGE_STATIC } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* BODY (scrollable) */}
              <div className="tivonix-body px-4 pb-4 pt-2 sm:px-6 md:px-8">
                <div className="mt-1">
                  <div className="text-[18px] font-extrabold tracking-tight text-white sm:text-[20px]">
                    {txt.title}
                  </div>
                  <div className="mt-1 text-[12px] leading-relaxed text-white/65 sm:text-[12.5px]">
                    {txt.subtitle}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3.5 sm:mt-5 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <div className="mb-1.5 text-[11.5px] font-semibold text-white/70">
                      {txt.name} *
                    </div>
                    <input
                      ref={nameRef}
                      className={inputBase}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <div className="mb-1.5 text-[11.5px] font-semibold text-white/70">
                      {txt.email}
                    </div>
                    <input
                      className={inputBase}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <div className="mb-1.5 text-[11.5px] font-semibold text-white/70">
                      {txt.telegram}
                    </div>
                    <input
                      className={inputBase}
                      value={form.telegram}
                      onChange={(e) => update("telegram", e.target.value)}
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <div className="mb-1.5 text-[11.5px] font-semibold text-white/70">
                      {txt.company}
                    </div>
                    <input
                      className={inputBase}
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                    />
                  </div>

                  <FancySelect
                    label={txt.projectType}
                    value={form.projectType}
                    onChange={(v) => update("projectType", v)}
                    options={[
                      { value: defaults.type, label: defaults.type },
                      {
                        value: isRu ? "Сайт-визитка" : "Business card website",
                        label: isRu ? "Сайт-визитка" : "Business card website",
                      },
                      {
                        value: isRu ? "Интернет-магазин" : "E-commerce",
                        label: isRu ? "Интернет-магазин" : "E-commerce",
                      },
                      {
                        value: isRu ? "SaaS / сервис" : "SaaS / product",
                        label: isRu ? "SaaS / сервис" : "SaaS / product",
                      },
                      { value: isRu ? "Другое" : "Other", label: isRu ? "Другое" : "Other" },
                    ]}
                  />

                  <FancySelect
                    label={txt.budget}
                    value={form.budget}
                    onChange={(v) => update("budget", v)}
                    options={[
                      { value: defaults.budget, label: defaults.budget },
                      { value: "€200–€500", label: "€200–€500" },
                      { value: "€500–€1,000", label: "€500–€1,000" },
                      { value: "€1,000–€3,000", label: "€1,000–€3,000" },
                      { value: "€3,000+", label: "€3,000+" },
                    ]}
                  />

                  <div className="sm:col-span-2">
                    <FancySelect
                      label={txt.timeframe}
                      value={form.timeframe}
                      onChange={(v) => update("timeframe", v)}
                      options={[
                        { value: defaults.time, label: defaults.time },
                        { value: isRu ? "2–4 недели" : "2–4 weeks", label: isRu ? "2–4 недели" : "2–4 weeks" },
                        { value: isRu ? "1–2 месяца" : "1–2 months", label: isRu ? "1–2 месяца" : "1–2 months" },
                        { value: isRu ? "Гибко" : "Flexible", label: isRu ? "Гибко" : "Flexible" },
                      ]}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mb-1.5 text-[11.5px] font-semibold text-white/70">
                      {txt.details}
                    </div>
                    <textarea
                      className={cx(
                        "min-h-[120px] w-full rounded-2xl px-4 py-3 text-[13px]",
                        "border border-white/12 bg-white/[0.07] text-white placeholder:text-white/35",
                        "outline-none focus:border-white/22 focus:bg-white/[0.09] backdrop-blur-xl"
                      )}
                      value={form.details}
                      onChange={(e) => update("details", e.target.value)}
                      placeholder={txt.detailsPh}
                    />
                  </div>

                  {errorText ? (
                    <div className="sm:col-span-2 text-[11.5px] text-[#FFB36A]">
                      {errorText}
                    </div>
                  ) : null}
                </div>

                {/* extra bottom space so last field never “sticks” to footer */}
                <div className="h-6" />
              </div>

              {/* FOOTER (fixed, no scroll) */}
              <div className="border-t border-white/10 bg-black/40 px-4 pb-4 pt-3 sm:px-6 sm:pb-5 md:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[11.5px] text-white/45">{txt.note}</div>

                  <div className="flex gap-3">
                    <Button
                      onClick={onClose}
                      className={cx(
                        "h-10 rounded-2xl px-5 text-[13px] font-semibold sm:h-11",
                        "border border-white/12 bg-white/[0.06] text-white",
                        "hover:bg-white/[0.09]"
                      )}
                    >
                      {txt.cancel}
                    </Button>

                    <Button
                      onClick={submit}
                      disabled={sending}
                      className={cx(
                        "h-10 rounded-2xl px-5 text-[13px] font-semibold sm:h-11",
                        "!text-black",
                        "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                        "hover:brightness-[1.04] active:brightness-[0.96]",
                        sending && "opacity-80"
                      )}
                      style={{ background: BRAND_CTA } as React.CSSProperties}
                    >
                      {sending ? (isRu ? "Отправляю…" : "Sending…") : txt.send}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* /grid */}
          </div>
          {/* /card */}
        </div>
      </div>
    </div>
  );
}
