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
  type BudgetId,
  type LeadFormFields,
} from "../../lib/leads";
import type { PlanId } from "../../lib/pricingData";
import { planPagePrice, pricingCopy } from "../../i18n/pricingCopy";
import BgLoopVideo from "../ui/BgLoopVideo";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const BRAND_CTA =
  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)";

const ORANGE_LINE =
  "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,120,40,0.95) 18%, rgba(255,198,120,1) 50%, rgba(255,120,40,0.95) 82%, rgba(255,160,70,0) 100%)";

const FRAME =
  "linear-gradient(135deg, rgba(255,154,61,0.55), rgba(255,255,255,0.12) 38%, rgba(143,168,200,0.28) 72%, rgba(255,154,61,0.35))";

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
  task: "",
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
  const descId = useId();
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

  const planName = activePlanId ? pricing.plans[activePlanId].name : null;
  const planPrice = activePlanId ? planPagePrice(lang, activePlanId) : null;

  useEffect(() => {
    if (open) {
      setMounted(true);
      setStatus("idle");
      setFieldError("");
      setErrorField(null);
      setServerError(false);
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
    if (!startedRef.current && (k === "contact" || k === "task" || k === "name")) {
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
      } else if (v.messageKey === "task") {
        setFieldError(copy.errors.task);
        taskRef.current?.focus();
      } else {
        setFieldError(copy.errors.consent);
        consentRef.current?.focus();
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
      task: form.task.trim(),
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

  const inputBase = cx(
    "w-full h-12 rounded-xl px-4",
    "border-0 bg-white/[0.10] text-white placeholder:text-white/40",
    "outline-none focus:bg-white/[0.14]",
    "text-[14px] font-medium transition",
    HOTJAR_MASK_CLASS
  );

  const labelClass = "mb-1.5 block min-h-[1.15rem] text-[12px] font-medium leading-none text-white/80";

  const node = (
    <div
      className={cx(
        "fixed inset-0 z-[115]",
        "flex items-end justify-center sm:items-center",
        "px-0 sm:px-5 py-0 sm:pt-[calc(var(--tivonix-header-spacer)+0.5rem)] sm:pb-5"
      )}
      aria-hidden={!open}
    >
      <style>{`
        .lead-modal-scroll {
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,154,61,.7) rgba(255,255,255,.06);
        }
        .lead-modal-scroll::-webkit-scrollbar { width: 6px; }
        .lead-modal-scroll::-webkit-scrollbar-track {
          background: rgba(255,255,255,.06);
          border-radius: 999px;
        }
        .lead-modal-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #FFD7B0, #FF9A3D, #FF6A1A);
          border-radius: 999px;
        }
      `}</style>

      <div
        className="absolute inset-0 bg-black/72 backdrop-blur-[14px] transition-opacity duration-200 cursor-pointer"
        style={{ opacity: open && visible ? 1 : 0 }}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-none sm:max-w-[640px] lg:max-w-[720px] transition-[transform,opacity] duration-220 ease-out"
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
        aria-describedby={descId}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-t-[28px] p-[1px] shadow-[0_32px_120px_rgba(0,0,0,0.72)] sm:rounded-[28px]"
          style={{ background: FRAME }}
        >
          <div
            className="relative flex max-h-[min(94dvh,780px)] flex-col overflow-hidden rounded-t-[27px] bg-[#0b0b0d] sm:rounded-[27px]"
          >
            {/* header — hero video only here, blurred out at the bottom */}
            <div className="relative z-10 isolate shrink-0 overflow-hidden px-5 pt-5 sm:px-7 sm:pt-6">
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    maskImage:
                      "linear-gradient(180deg, black 0%, black 42%, rgba(0,0,0,0.35) 72%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(180deg, black 0%, black 42%, rgba(0,0,0,0.35) 72%, transparent 100%)",
                  }}
                >
                  <BgLoopVideo variant="form" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/40 to-[#0b0b0d]" />
                <div
                  className="absolute inset-x-0 bottom-0 h-[96px]"
                  style={{
                    backdropFilter: "blur(22px)",
                    WebkitBackdropFilter: "blur(22px)",
                    maskImage:
                      "linear-gradient(180deg, transparent 0%, black 58%, black 100%)",
                    WebkitMaskImage:
                      "linear-gradient(180deg, transparent 0%, black 58%, black 100%)",
                  }}
                />
              </div>

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0 pr-2">
                  <h2
                    id={titleId}
                    className="text-[17px] font-extrabold tracking-tight text-white sm:text-[19px]"
                  >
                    {copy.title}
                  </h2>
                  <p id={descId} className="mt-1 max-w-[46ch] text-[12px] leading-snug text-white/70 sm:text-[12.5px]">
                    {copy.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={status === "loading"}
                  className="group grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/35 text-white/80 ring-1 ring-white/12 transition hover:bg-black/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40 disabled:opacity-50"
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
              </div>

              <div className="pointer-events-none relative mt-5 h-4">
                <div className="mx-auto h-[2px] w-full rounded-full opacity-95" style={{ background: ORANGE_LINE }} />
                <div className="mx-auto mt-[-2px] h-5 w-full opacity-35 blur-xl" style={{ background: ORANGE_LINE }} />
              </div>
            </div>

            {/* body */}
            <div className="lead-modal-scroll relative z-10 min-h-0 flex-1 bg-[#0b0b0d] px-5 pb-2 pt-1 sm:px-7">
              {status === "success" ? (
                <div
                  className="flex min-h-[280px] flex-col items-center justify-center gap-4 py-10 text-center"
                  role="status"
                  aria-live="polite"
                >
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
                  <p className="max-w-[36ch] text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
                    {copy.success}
                  </p>
                  <div className="mt-2 flex flex-col items-center gap-2.5 sm:flex-row">
                    <a
                      href={pathForLang("/projects/spliton", lang)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-[13.5px] font-medium text-white/85 transition hover:border-white/30 hover:text-white"
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
                <form id="lead-form" onSubmit={onSubmit} noValidate className="space-y-3.5 pb-2">
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

                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
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
                    <label htmlFor="lead-task" className={labelClass}>
                      {copy.task} *
                    </label>
                    <textarea
                      ref={taskRef}
                      id="lead-task"
                      name="task"
                      required
                      rows={4}
                      placeholder={
                        activePlanId && planName
                          ? lang === "ru"
                            ? `Что важно по плану ${planName}? Сроки, примеры, пожелания…`
                            : `What matters for the ${planName} plan? Timeline, examples, notes…`
                          : copy.taskPh
                      }
                      className={cx(
                        "min-h-[108px] w-full resize-none rounded-xl px-4 py-3 text-[14px] font-medium",
                        "border-0 bg-white/[0.10] text-white placeholder:text-white/40",
                        "outline-none focus:bg-white/[0.14] transition",
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

                  <div>
                    <div className={labelClass}>
                      {copy.budget}{" "}
                      <span className="font-normal text-white/45">({copy.budgetOptional})</span>
                    </div>
                    <div className="flex flex-wrap gap-2" role="group" aria-label={copy.budget}>
                      {budgetOptions.map((b) => {
                        const active = form.budget === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            disabled={status === "loading"}
                            onClick={() =>
                              update("budget", active ? "" : (b.id as BudgetId))
                            }
                            className={cx(
                              "h-9 rounded-full px-3.5 text-[12px] font-medium transition",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40",
                              active
                                ? "bg-white text-black"
                                : "bg-white/[0.08] text-white/75 hover:bg-white/[0.12] hover:text-white"
                            )}
                          >
                            {b.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 px-0.5 py-1">
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
                    />
                    <span className="text-[13px] leading-snug text-white/70">
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

                  {fieldError ? (
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
              )}
            </div>

            {/* footer */}
            {status !== "success" ? (
              <div className="relative z-10 shrink-0 bg-[#0b0b0d] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-7 sm:pb-5">
                <div
                  aria-hidden
                  className="mb-3 h-px w-full opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                  }}
                />
                <button
                  type="submit"
                  form="lead-form"
                  disabled={status === "loading"}
                  className={cx(
                    "flex h-12 w-full items-center justify-center rounded-full text-[15px] font-bold text-black",
                    "shadow-[0_18px_70px_rgba(255,120,40,0.35)]",
                    "hover:brightness-[1.04] active:brightness-[0.96]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50",
                    status === "loading" && "cursor-not-allowed opacity-70"
                  )}
                  style={{ background: BRAND_CTA }}
                >
                  {status === "loading" ? copy.sending : copy.send}
                </button>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11.5px] text-white/40">
                  <a
                    href={TELEGRAM_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTelegramDirectClick()}
                    className="transition hover:text-white/75"
                  >
                    @TIVONIX
                  </a>
                  <span aria-hidden className="text-white/18">
                    ·
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => trackEmailClick()}
                    className="transition hover:text-white/75"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
