import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { useLang } from "../../i18n/LangProvider";
import { leadFormCopy } from "../../i18n/leadFormCopy";
import { pathForLang } from "../../lib/localePaths";
import type { CtaSource } from "../../lib/analytics";
import {
  trackEmailClick,
  trackLeadFormAbandon,
  trackLeadFormServerError,
  trackLeadFormStart,
  trackLeadFormSubmit,
  trackLeadFormSuccess,
  trackLeadFormValidationError,
  trackTelegramDirectClick,
} from "../../lib/analytics";
import { HOTJAR_MASK_CLASS, HOTJAR_SUPPRESS_ATTR } from "../../lib/hotjar";
import {
  buildLeadMeta,
  clearLeadDraft,
  CONTACT_EMAIL,
  loadLeadDraft,
  saveLeadDraft,
  submitLead,
  suggestedBudgetForPlan,
  TELEGRAM_DIRECT_URL,
  validateLeadFields,
  type LeadFormFields,
  type ProductTypeId,
} from "../../lib/leads";
import type { PlanId } from "../../lib/pricingData";
import { planPagePrice, pricingCopy } from "../../i18n/pricingCopy";
import BgLoopVideo from "../ui/BgLoopVideo";
import { ArrowRight } from "lucide-react";
import { ctaClass } from "./ctaStyles";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const ORANGE_LINE =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.55) 18%, rgba(255,198,120,0.85) 50%, rgba(255,120,40,0.55) 82%, rgba(255,160,70,0) 100%)";

const FRAME =
  "linear-gradient(135deg, rgba(255,154,61,0.38), rgba(255,255,255,0.1) 38%, rgba(143,168,200,0.2) 72%, rgba(255,154,61,0.28))";

type StepOption<T extends string> = { id: T; label: string };

/** Discrete step slider — reference: ChatGPT-style effort control, TIVONIX orange. */
function DiscreteStepSlider<T extends string>({
  fieldLabel,
  options,
  value,
  onChange,
  disabled,
}: {
  fieldLabel: string;
  options: StepOption<T>[];
  value: T | "";
  onChange: (next: T) => void;
  disabled?: boolean;
}) {
  const n = options.length;
  const idx = Math.max(
    0,
    options.findIndex((o) => o.id === value)
  );
  const hasValue = value !== "" && options.some((o) => o.id === value);
  const pct = n <= 1 ? 0 : (idx / (n - 1)) * 100;
  const currentLabel = hasValue ? options[idx].label : fieldLabel;

  const pickFromClientX = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const next = Math.round((x / Math.max(rect.width, 1)) * (n - 1));
    onChange(options[next].id);
  };

  return (
    <div className="rounded-[18px] bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/[0.06] sm:rounded-[22px] sm:px-4 sm:py-3.5">
      <div className="mb-2.5 flex items-center justify-center gap-1.5 sm:mb-3.5">
        <span className="text-[13px] font-medium tracking-[-0.01em] text-white sm:text-[14px]">
          {currentLabel}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-45">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        className={cx(
          "relative mx-0.5 h-7 select-none sm:mx-1 sm:h-8",
          disabled ? "pointer-events-none opacity-55" : "cursor-pointer touch-none"
        )}
        role="slider"
        aria-label={fieldLabel}
        aria-valuemin={0}
        aria-valuemax={n - 1}
        aria-valuenow={hasValue ? idx : undefined}
        aria-valuetext={hasValue ? currentLabel : undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onChange(options[Math.min(n - 1, (hasValue ? idx : 0) + 1)].id);
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onChange(options[Math.max(0, (hasValue ? idx : 0) - 1)].id);
          }
        }}
        onPointerDown={(e) => {
          if (disabled) return;
          const track = e.currentTarget;
          track.setPointerCapture(e.pointerId);
          pickFromClientX(e.clientX, track);
        }}
        onPointerMove={(e) => {
          if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
          pickFromClientX(e.clientX, e.currentTarget);
        }}
      >
        <div className="absolute inset-x-0 top-1/2 h-[10px] -translate-y-1/2 rounded-full bg-white/[0.1]" />
        <div
          className="absolute left-0 top-1/2 h-[10px] -translate-y-1/2 rounded-full"
          style={{
            width: hasValue ? `${pct}%` : "10px",
            background:
              "linear-gradient(90deg, rgba(255,154,61,0.75) 0%, #FF9A3D 100%)",
          }}
        />
        {options.map((opt, i) => {
          const left = n <= 1 ? 50 : (i / (n - 1)) * 100;
          const filled = hasValue && i <= idx;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              aria-label={opt.label}
              className={cx(
                "absolute top-1/2 z-[1] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition",
                filled ? "bg-white/70" : "bg-white/25"
              )}
              style={{ left: `${left}%` }}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt.id);
              }}
            />
          );
        })}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 z-[2] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-[left] duration-150 ease-out"
          style={{ left: hasValue ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  open: boolean;
  onClose: () => void;
  source: CtaSource;
  planId?: PlanId | null;
};

const emptyForm = (): LeadFormFields => ({
  name: "",
  contact: "",
  productType: "",
  users: "",
  task: "",
  integrations: "",
  timeline: "",
  budget: "",
  consent: false,
  company_fax_url: "",
});

export default function LeadFormModal({
  open,
  onClose,
  source,
  planId = null,
}: Props) {
  const { lang } = useLang();
  const copy = leadFormCopy(lang);
  const pricing = pricingCopy(lang);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLInputElement | null>(null);
  const taskRef = useRef<HTMLTextAreaElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);
  const startedRef = useRef(false);
  const successRef = useRef(false);
  const submittingRef = useRef(false);
  const [activePlanId, setActivePlanId] = useState<PlanId | null>(planId);

  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<LeadFormFields>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState("");
  const [errorField, setErrorField] = useState<"contact" | "task" | "consent" | null>(
    null
  );
  const [serverError, setServerError] = useState(false);
  const [showSuccessDetails, setShowSuccessDetails] = useState(false);
  const expandVideo = status === "loading" || status === "success";

  const planName = activePlanId ? pricing.plans[activePlanId].name : null;
  const planPrice = activePlanId ? planPagePrice(lang, activePlanId) : null;

  useEffect(() => {
    if (open) {
      setMounted(true);
      setStatus("idle");
      setFieldError("");
      setErrorField(null);
      setServerError(false);
      setShowSuccessDetails(false);
      startedRef.current = false;
      successRef.current = false;
      setActivePlanId(planId);

      const draft = loadLeadDraft();
      const suggested = suggestedBudgetForPlan(planId);
      setForm({
        ...emptyForm(),
        ...draft,
        company_fax_url: "",
        budget: draft?.budget || suggested || "",
        consent: draft?.consent === true,
      });

      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = window.setTimeout(() => setMounted(false), 220);
      return () => window.clearTimeout(t);
    }
  }, [open, planId]);

  useEffect(() => {
    if (status !== "success") {
      setShowSuccessDetails(false);
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setShowSuccessDetails(true), reduced ? 0 : 1400);
    return () => window.clearTimeout(t);
  }, [status]);

  useEffect(() => {
    if (!open || status === "success") return;
    saveLeadDraft(form);
  }, [form, open, status]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => contactRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = dialogRef.current;
    if (!root) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusable).filter((el) => el.offsetParent !== null);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, status, source, form]);

  const handleClose = () => {
    if (status === "loading") return;
    if (!successRef.current && (form.contact || form.task || form.name)) {
      trackLeadFormAbandon(source);
    }
    onClose();
  };

  const update = <K extends keyof LeadFormFields>(k: K, v: LeadFormFields[K]) => {
    if (
      !startedRef.current &&
      (k === "contact" ||
        k === "task" ||
        k === "name" ||
        k === "productType" ||
        k === "users" ||
        k === "integrations" ||
        k === "timeline" ||
        k === "budget" ||
        k === "consent")
    ) {
      startedRef.current = true;
      trackLeadFormStart();
    }
    setFieldError("");
    setErrorField(null);
    setForm((p) => ({ ...p, [k]: v }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || status === "loading") return;

    const v = validateLeadFields(form);
    if (!v.ok) {
      trackLeadFormValidationError(v.field);
      setErrorField(v.field ?? null);
      if (v.messageKey === "contact") {
        setFieldError(copy.errors.contact);
        contactRef.current?.focus();
        contactRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (v.messageKey === "task") {
        setFieldError(copy.errors.task);
        taskRef.current?.focus();
        taskRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setFieldError(copy.errors.consent);
        consentRef.current?.focus();
        consentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setServerError(false);
    trackLeadFormSubmit(source);

    const result = await submitLead({
      name: form.name.trim(),
      contact: form.contact.trim(),
      productType: form.productType,
      users: form.users.trim(),
      task: form.task.trim(),
      integrations: form.integrations.trim(),
      timeline: form.timeline,
      budget: form.budget,
      consent: form.consent,
      company_fax_url: form.company_fax_url,
      lang,
      planId: activePlanId || undefined,
      meta: buildLeadMeta(source, {
        id: activePlanId || undefined,
        name: planName || undefined,
      }),
    });

    submittingRef.current = false;

    if (result.ok) {
      successRef.current = true;
      clearLeadDraft();
      setForm(emptyForm());
      setStatus("success");
      trackLeadFormSuccess(source);
      return;
    }

    trackLeadFormServerError();
    setServerError(true);
    setStatus("error");
  };

  if (!mounted && !open) return null;
  if (typeof document === "undefined") return null;

  const budgetOptions = copy.budgets.filter((b) => b.id !== "");

  const labelClass =
    "mb-1 block min-h-[1.05rem] text-[11.5px] font-medium leading-none text-white/65 sm:mb-1.5 sm:min-h-[1.15rem] sm:text-[12px]";

  const inputBase = cx(
    "w-full h-11 rounded-[12px] px-3.5 sm:h-12 sm:rounded-xl sm:px-4",
    "border-0 bg-white/[0.08] text-white placeholder:text-white/38",
    "outline-none focus:bg-white/[0.11]",
    "text-[14px] font-medium transition",
    HOTJAR_MASK_CLASS
  );

  const node = (
    <div
      className={cx(
        "fixed inset-0 z-[115]",
        "flex items-end justify-center sm:items-center",
        "box-border px-0 sm:px-5",
        "pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-[calc(var(--tivonix-header-spacer)+0.5rem)]",
        "pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-5"
      )}
      aria-hidden={!open}
    >
      <style>{`
        .lead-modal-scroll {
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,154,61,.45) rgba(255,255,255,.05);
        }
        .lead-modal-scroll::-webkit-scrollbar { width: 5px; }
        .lead-modal-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,.05);
          border-radius: 999px;
        }
        .lead-modal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(255,215,176,.85), rgba(255,154,61,.9));
          border-radius: 999px;
        }
        .lead-sent-word {
          animation: lead-sent-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .lead-sent-details {
          animation: lead-sent-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes lead-sent-in {
          from { opacity: 0; transform: translateY(10px) scale(0.94); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .lead-sent-word, .lead-sent-details { animation: none; }
        }
        .lead-submit-cta:hover .tivonix-cta-primary__icon-svg {
          transform: translateX(2px);
        }
      `}</style>

      <div
        className="absolute inset-0 bg-black/72 backdrop-blur-[14px] transition-opacity duration-200 cursor-pointer"
        style={{ opacity: open && visible ? 1 : 0 }}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className="relative flex min-h-0 w-full max-h-full max-w-none flex-col sm:max-w-[640px] lg:max-w-[720px] transition-[transform,opacity] duration-220 ease-out"
        style={
          {
            opacity: open && visible ? 1 : 0,
            transform:
              open && visible
                ? "translateY(0) scale(1)"
                : "translateY(18px) scale(0.98)",
            pointerEvents: open ? "auto" : "none",
          } as CSSProperties
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="flex min-h-0 max-h-full w-full flex-col overflow-hidden rounded-t-[22px] p-[1px] shadow-[0_24px_90px_rgba(0,0,0,0.62)] sm:rounded-[28px]"
          style={{ background: FRAME }}
        >
          <div
            className="relative flex min-h-0 max-h-full w-full flex-col overflow-hidden rounded-t-[21px] bg-[#0b0b0d] sm:min-h-[min(68dvh,560px)] sm:max-h-[min(90dvh,820px)] sm:rounded-[27px]"
          >
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden",
                "transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                expandVideo ? "h-full" : "h-[5.25rem] sm:h-[9.5rem]"
              )}
            >
              <BgLoopVideo variant="form" />
              <div
                className={cx(
                  "absolute inset-0 transition-colors duration-500",
                  expandVideo
                    ? "bg-black/72"
                    : "bg-gradient-to-b from-black/35 via-black/48 to-[#0b0b0d]"
                )}
              />
              {!expandVideo ? (
                <div
                  className="absolute inset-x-0 bottom-0 h-[64px] sm:h-[96px]"
                  style={{
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    maskImage:
                      "linear-gradient(180deg, transparent 0%, black 58%, black 100%)",
                    WebkitMaskImage:
                      "linear-gradient(180deg, transparent 0%, black 58%, black 100%)",
                  }}
                />
              ) : null}
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={status === "loading"}
              className="group absolute right-3 top-3 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-white/80 ring-1 ring-white/12 transition hover:bg-black/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 disabled:opacity-50 sm:right-5 sm:top-5 sm:h-9 sm:w-9"
              aria-label={copy.close}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:rotate-90"
                aria-hidden
              >
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {expandVideo ? (
              <div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 py-16 text-center"
                role="status"
                aria-live="polite"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 72% 48% at 50% 48%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 58%, transparent 78%)",
                  }}
                />
                {status === "success" && showSuccessDetails ? (
                  <div className="lead-sent-details relative flex flex-col items-center gap-4">
                    <div
                      className="grid h-14 w-14 place-items-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(255,215,176,0.25), rgba(255,106,26,0.2))",
                        boxShadow: "0 0 40px rgba(255,154,61,0.25)",
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M5.5 12.6c2 1.6 3.3 3.2 4.2 5.1 2.6-4.8 5.8-8.2 10-11.2"
                          stroke="#FF9A3D"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="font-hero text-[1.35rem] font-semibold tracking-[-0.02em] text-white">
                      {copy.successTitle}
                    </h3>
                    <p className="max-w-[36ch] text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
                      {copy.success}
                    </p>
                    <div className="mt-2 flex flex-col items-center gap-2.5 sm:flex-row">
                      <a
                        href={pathForLang("/projects/spliton", lang)}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-black/25 px-5 text-[13.5px] font-medium text-white/90 backdrop-blur-md transition hover:border-white/30 hover:text-white"
                        onClick={onClose}
                      >
                        {copy.successCase}
                      </a>
                      <a
                        href={lang === "en" ? "/en" : lang === "zh" ? "/zh" : "/"}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[13.5px] font-bold text-black transition hover:bg-white/92"
                        onClick={onClose}
                      >
                        {copy.successHome}
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="lead-sent-word relative font-hero text-[clamp(1.85rem,6.5vw,3.5rem)] font-normal uppercase leading-none tracking-[0.14em] text-white">
                    <span
                      className="inline-block rounded-full px-8 py-3.5 sm:px-10"
                      style={{
                        background: "rgba(6,6,8,0.92)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.55)",
                        textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                      }}
                    >
                      {status === "success" ? copy.sent : copy.sending}
                    </span>
                  </p>
                )}
              </div>
            ) : null}

            <div
              className={cx(
                "relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden transition-opacity duration-300",
                expandVideo && "pointer-events-none select-none opacity-0"
              )}
              aria-hidden={expandVideo}
            >
            {/* header */}
            <div className="relative isolate shrink-0 overflow-hidden px-4 pt-3.5 pr-12 sm:px-7 sm:pt-6 sm:pr-16">
              <div className="relative min-w-0 pr-2">
                <h2
                  id={titleId}
                  className="text-[15.5px] font-semibold leading-snug tracking-tight text-white sm:text-[19px]"
                >
                  {copy.title}
                </h2>
              </div>

              <div className="pointer-events-none relative mt-3 h-3 sm:mt-5 sm:h-4">
                <div className="mx-auto h-[2px] w-full rounded-full opacity-95" style={{ background: ORANGE_LINE }} />
                <div className="mx-auto mt-[-2px] h-4 w-full opacity-30 blur-xl sm:h-5 sm:opacity-35" style={{ background: ORANGE_LINE }} />
              </div>
            </div>

            {/* body */}
            <div className="lead-modal-scroll relative z-10 min-h-0 flex-1 overscroll-contain bg-[#0b0b0d] px-4 pb-1.5 pt-0.5 sm:px-7 sm:pb-2 sm:pt-1">
                <form id="lead-form" onSubmit={onSubmit} noValidate className="space-y-3 pb-1 sm:space-y-3.5 sm:pb-2">
                  <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="lead-company-fax">Company fax</label>
                    <input
                      id="lead-company-fax"
                      name="company_fax_url"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company_fax_url}
                      onChange={(e) => update("company_fax_url", e.target.value)}
                    />
                  </div>

                  {activePlanId && planName ? (
                    <div className="flex items-start justify-between gap-3 rounded-xl bg-white/[0.06] px-3.5 py-3">
                      <div className="min-w-0">
                        <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-white/55">
                          {copy.selectedPlan}
                        </p>
                        <p className="mt-1 text-[15px] font-semibold tracking-tight text-white">
                          {planName}
                          {planPrice ? (
                            <span className="ml-2 text-[13px] font-medium text-white/55">
                              {planPrice}
                            </span>
                          ) : null}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActivePlanId(null)}
                        className="shrink-0 text-[12px] font-medium text-white/45 transition hover:text-white/75"
                      >
                        {copy.clearPlan}
                      </button>
                    </div>
                  ) : null}

                  <div>
                    <div className={labelClass}>
                      {copy.productType}{" "}
                      <span className="font-normal text-white/45">
                        ({copy.productTypeOptional})
                      </span>
                    </div>
                    <div
                      className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
                      role="group"
                      aria-label={copy.productType}
                    >
                      {copy.productTypes.map((type) => {
                        const active = form.productType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            disabled={status === "loading"}
                            onClick={() =>
                              update("productType", active ? "" : (type.id as ProductTypeId))
                            }
                            className={cx(
                              "h-8 shrink-0 rounded-full px-3 text-[11.5px] font-medium transition",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40",
                              active
                                ? "bg-[#FF9A3D] text-black"
                                : "bg-white/[0.08] text-white/75 hover:bg-white/[0.12] hover:text-white"
                            )}
                          >
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                    <div className="min-w-0">
                      <label htmlFor="lead-name" className={labelClass}>
                        {copy.name}{" "}
                        <span className="font-normal text-white/45">({copy.nameOptional})</span>
                      </label>
                      <input
                        id="lead-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        className={inputBase}
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        disabled={status === "loading"}
                        {...HOTJAR_SUPPRESS_ATTR}
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="lead-contact" className={labelClass}>
                        {copy.contact} *
                      </label>
                      <input
                        ref={contactRef}
                        id="lead-contact"
                        name="contact"
                        type="text"
                        required
                        autoComplete="email"
                        inputMode="email"
                        placeholder={copy.contactPh}
                        className={cx(
                          inputBase,
                          errorField === "contact" && "bg-[#FF9A3D]/12 focus:bg-[#FF9A3D]/16"
                        )}
                        value={form.contact}
                        onChange={(e) => update("contact", e.target.value)}
                        disabled={status === "loading"}
                        aria-invalid={errorField === "contact"}
                        aria-describedby={fieldError ? "lead-field-error" : undefined}
                        {...HOTJAR_SUPPRESS_ATTR}
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="lead-users" className={labelClass}>
                      {copy.users}
                    </label>
                    <input
                      id="lead-users"
                      name="users"
                      type="text"
                      autoComplete="off"
                      placeholder={copy.usersPh}
                      className={inputBase}
                      value={form.users}
                      onChange={(e) => update("users", e.target.value)}
                      disabled={status === "loading"}
                      {...HOTJAR_SUPPRESS_ATTR}
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="lead-task" className={labelClass}>
                      {copy.task} *
                    </label>
                    <textarea
                      ref={taskRef}
                      id="lead-task"
                      name="task"
                      required
                      rows={2}
                      placeholder={
                        activePlanId && planName
                          ? lang === "ru"
                            ? `Что важно по плану ${planName}? Сроки, примеры, пожелания…`
                            : lang === "zh"
                              ? `关于 ${planName} 方案，哪些最重要？周期、示例、备注…`
                              : `What matters for the ${planName} plan? Timeline, examples, notes…`
                          : copy.taskPh
                      }
                      className={cx(
                        "min-h-[72px] w-full resize-none rounded-[12px] px-3.5 py-2.5 text-[14px] font-medium sm:min-h-[88px] sm:rounded-xl sm:px-4 sm:py-3",
                        "border-0 bg-white/[0.08] text-white placeholder:text-white/38",
                        "outline-none focus:bg-white/[0.11] transition",
                        HOTJAR_MASK_CLASS,
                        errorField === "task" && "bg-[#FF9A3D]/12 focus:bg-[#FF9A3D]/16"
                      )}
                      value={form.task}
                      onChange={(e) => update("task", e.target.value)}
                      disabled={status === "loading"}
                      aria-invalid={errorField === "task"}
                      {...HOTJAR_SUPPRESS_ATTR}
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="lead-integrations" className={labelClass}>
                      {copy.integrations}
                    </label>
                    <input
                      id="lead-integrations"
                      name="integrations"
                      type="text"
                      autoComplete="off"
                      placeholder={copy.integrationsPh}
                      className={inputBase}
                      value={form.integrations}
                      onChange={(e) => update("integrations", e.target.value)}
                      disabled={status === "loading"}
                      {...HOTJAR_SUPPRESS_ATTR}
                    />
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <div className={labelClass}>{copy.timeline}</div>
                      <DiscreteStepSlider
                        fieldLabel={copy.timeline}
                        options={copy.timelines}
                        value={form.timeline}
                        disabled={status === "loading"}
                        onChange={(id) => update("timeline", id)}
                      />
                    </div>

                    <div>
                      <div className={labelClass}>
                        {copy.budget}{" "}
                        <span className="font-normal text-white/45">({copy.budgetOptional})</span>
                      </div>
                      <DiscreteStepSlider
                        fieldLabel={copy.budget}
                        options={budgetOptions}
                        value={form.budget}
                        disabled={status === "loading"}
                        onChange={(id) => update("budget", id)}
                      />
                    </div>
                  </div>

                  {fieldError && errorField !== "consent" ? (
                    <p id="lead-field-error" role="alert" className="text-[12.5px] text-[#FFB36A]">
                      {fieldError}
                    </p>
                  ) : null}

                  {serverError ? (
                    <div
                      role="alert"
                      className="rounded-xl bg-[#FF9A3D]/10 px-4 py-3.5 text-[12.5px] text-white/88"
                    >
                      <p className="font-semibold">{copy.errorTitle}</p>
                      <p className="mt-1 text-white/60">{copy.errorBody}</p>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          onClick={() => trackEmailClick()}
                          className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-[13px] font-bold text-black"
                        >
                          {copy.fallbackEmail}
                        </a>
                        <a
                          href={TELEGRAM_DIRECT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackTelegramDirectClick()}
                          className="inline-flex h-10 items-center justify-center rounded-full bg-white/[0.08] px-4 text-[13px] font-medium text-white"
                        >
                          {copy.fallbackTelegram}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </form>
            </div>

            {/* footer */}
              <div className="relative z-10 shrink-0 border-t border-white/[0.06] bg-[#0b0b0d] px-4 pb-4 pt-2.5 sm:border-0 sm:px-7 sm:pb-6 sm:pt-2">
                <div
                  aria-hidden
                  className="mb-2.5 hidden h-px w-full opacity-60 sm:mb-3 sm:block"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                  }}
                />

                <label className="mb-2.5 flex cursor-pointer items-start gap-2 px-0.5 sm:mb-3 sm:gap-2.5">
                  <input
                    ref={consentRef}
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    disabled={status === "loading"}
                    className={cx(
                      "mt-0.5 h-4 w-4 shrink-0 accent-[#FF9A3D]",
                      errorField === "consent" && "outline outline-2 outline-[#FF9A3D]/60 outline-offset-2"
                    )}
                    aria-required="true"
                    aria-invalid={errorField === "consent"}
                  />
                  <span className="text-[12px] leading-snug text-white/70 sm:text-[12.5px]">
                    {copy.consent}{" "}
                    <a
                      href={copy.privacyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#FFB36A] underline decoration-[#FF9A3D]/30 underline-offset-2 hover:text-[#FFD7B0]"
                    >
                      {copy.privacyLabel}
                    </a>
                  </span>
                </label>

                {fieldError && errorField === "consent" ? (
                  <p id="lead-field-error" role="alert" className="mb-2 text-[12.5px] text-[#FFB36A] sm:mb-2.5">
                    {fieldError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  form="lead-form"
                  disabled={status === "loading"}
                  className={ctaClass(
                    "primary",
                    "lg",
                    cx(
                      "lead-submit-cta w-full !h-11 shadow-[0_12px_40px_rgba(255,107,44,0.28)] sm:!h-[52px]",
                      status === "loading" && "cursor-not-allowed opacity-70"
                    ),
                    true
                  )}
                >
                  <span className="tivonix-cta-primary__label">
                    {status === "loading" ? copy.sending : copy.send}
                  </span>
                  <span className="tivonix-cta-primary__icon" aria-hidden="true">
                    <ArrowRight className="tivonix-cta-primary__icon-svg" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
