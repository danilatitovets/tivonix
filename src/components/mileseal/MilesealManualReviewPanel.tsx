import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  FileText,
  Mail,
  MessageSquareText,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import AutoGrowTextarea from "../ui/AutoGrowTextarea";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import { buildLeadMeta, submitLead } from "../../lib/leads";
import { trackLeadFormSubmit, trackLeadFormSuccess } from "../../lib/analytics";
import { useLang } from "../../i18n/LangProvider";
import { milesealCopy } from "../../i18n/milesealCopy";
import { milesealWorkspaceCopy } from "../../i18n/milesealWorkspaceCopy";
import type { ScopeFormPrefill } from "../../data/milesealDemo";

const HERO_VIDEO = "/images/hero-bg.mp4";
const HERO_POSTER = "/images/hero-bg-poster.webp";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Step = "welcome" | "request" | "scope" | "contact" | "review";

type Props = {
  prefill?: ScopeFormPrefill | null;
  onClose: () => void;
};

export default function MilesealManualReviewPanel({ prefill, onClose }: Props) {
  const { lang } = useLang();
  const cta = milesealCopy(lang).cta;
  const ws = milesealWorkspaceCopy(lang);
  const formId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  useKeepVideoPlaying(videoRef);

  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agency, setAgency] = useState("");
  const [clientRequest, setClientRequest] = useState(prefill?.request ?? "");
  const [agreedScope, setAgreedScope] = useState(prefill?.scope ?? "");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const privacyHref =
    lang === "ru"
      ? "/doc/Политика_обработки_ПД_Tivonix_RU.pdf"
      : "/doc/Privacy_Policy_Tivonix_EN.pdf";

  const steps: Step[] = ["welcome", "request", "scope", "contact", "review"];
  const stepIndex = steps.indexOf(step);

  const ask =
    lang === "ru"
      ? {
          welcomeTitle: "Давайте разберём ваш кейс",
          welcomeText:
            "Я задам несколько коротких вопросов — без фейкового AI-ответа. После этого команда TIVONIX сверит запрос с объёмом вручную.",
          start: "Начать",
          qRequest: "Что написал клиент?",
          qRequestHint: "Вставьте новый запрос как пришёл — можно обезличенно.",
          qScope: "Что было согласовано?",
          qScopeHint: "Кратко: что входит в объём и что явно исключено.",
          qContact: "Куда прислать разбор?",
          qContactHint: "Рабочий email обязателен. Имя и агентство — по желанию.",
          qReview: "Проверьте и отправьте",
          qReviewHint: "Мы ответим с понятным выводом: что изменилось и что нужно согласовать.",
          next: "Далее",
          back: "Назад",
          stepOf: (n: number, total: number) => `Шаг ${n} из ${total}`,
        }
      : lang === "zh"
        ? {
            welcomeTitle: "我们来梳理你的案例",
            welcomeText:
              "我会问几个简短问题——不会给出虚假 AI 结论。随后 TIVONIX 团队会人工对照约定范围。",
            start: "开始",
            qRequest: "客户说了什么？",
            qRequestHint: "粘贴新请求原文，可做脱敏。",
            qScope: "当初约定了什么？",
            qScopeHint: "简要说明范围内与明确排除的内容。",
            qContact: "结果发到哪里？",
            qContactHint: "工作邮箱必填。姓名与代理商可选。",
            qReview: "确认并发送",
            qReviewHint: "我们会回复清晰结论：哪里变了、需要哪些书面确认。",
            next: "下一步",
            back: "返回",
            stepOf: (n: number, total: number) => `第 ${n} / ${total} 步`,
          }
        : {
            welcomeTitle: "Let’s walk through your case",
            welcomeText:
              "I’ll ask a few short questions — no fake AI verdict. Then the TIVONIX team will compare the request to the agreed scope by hand.",
            start: "Start",
            qRequest: "What did the client ask for?",
            qRequestHint: "Paste the new request as it arrived — anonymised is fine.",
            qScope: "What was already agreed?",
            qScopeHint: "Briefly: what’s in scope and what was explicitly excluded.",
            qContact: "Where should we send the review?",
            qContactHint: "Work email is required. Name and agency are optional.",
            qReview: "Review and send",
            qReviewHint: "We’ll reply with a clear read on what changed and what needs approval.",
            next: "Continue",
            back: "Back",
            stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
          };

  const inputClass = cx(
    "w-full min-h-12 rounded-2xl px-4 py-3",
    "border-0 bg-[#f4f3f1] text-[#141414] placeholder:text-[#141414]/35",
    "outline-none transition",
    "focus-visible:ring-2 focus-visible:ring-[#fc5000]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "font-sans text-[14px] font-medium"
  );

  const labelClass =
    "mb-1.5 flex items-center gap-2 text-[12px] font-semibold tracking-[0.04em] text-[#141414]/55";

  const primaryBtn = cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5",
    "bg-[#fc5000] text-[14px] font-semibold text-white transition",
    "hover:bg-[#e04800] active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "disabled:pointer-events-none disabled:opacity-50"
  );

  const ghostBtn = cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4",
    "bg-transparent text-[14px] font-semibold text-[#141414]/65 transition",
    "hover:bg-black/[0.04] hover:text-[#141414]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5000]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
  );

  const goNext = () => {
    setErrorMsg("");
    if (step === "welcome") {
      setStep("request");
      return;
    }
    if (step === "request") {
      if (!clientRequest.trim() || clientRequest.trim().length < 5) {
        setErrorMsg(cta.errRequest);
        return;
      }
      setStep("scope");
      return;
    }
    if (step === "scope") {
      if (!agreedScope.trim() || agreedScope.trim().length < 5) {
        setErrorMsg(cta.errScope);
        return;
      }
      setStep("contact");
      return;
    }
    if (step === "contact") {
      if (!email.trim() || email.trim().length < 3) {
        setErrorMsg(cta.errEmail);
        return;
      }
      setStep("review");
    }
  };

  const goBack = () => {
    setErrorMsg("");
    if (step === "request") setStep("welcome");
    else if (step === "scope") setStep("request");
    else if (step === "contact") setStep("scope");
    else if (step === "review") setStep("contact");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim() || email.trim().length < 3) {
      setErrorMsg(cta.errEmail);
      setStep("contact");
      return;
    }
    if (!clientRequest.trim() || clientRequest.trim().length < 5) {
      setErrorMsg(cta.errRequest);
      setStep("request");
      return;
    }
    if (!agreedScope.trim() || agreedScope.trim().length < 5) {
      setErrorMsg(cta.errScope);
      setStep("scope");
      return;
    }
    if (!consent) {
      setErrorMsg(cta.errConsent);
      return;
    }

    setStatus("loading");
    trackLeadFormSubmit("mileseal_scope_review");

    const labels =
      lang === "ru"
        ? {
            agency: "Агентство",
            scope: "Согласованный объём",
            request: "Запрос клиента",
            draft: "Черновик change request",
          }
        : lang === "zh"
          ? {
              agency: "代理商",
              scope: "已约定范围",
              request: "客户请求",
              draft: "变更请求草稿",
            }
          : {
              agency: "Agency",
              scope: "Agreed scope",
              request: "Recent client request",
              draft: "Demo change request draft",
            };

    const taskParts = [
      "[MileSeal human scope review]",
      agency.trim() ? `${labels.agency}: ${agency.trim()}` : null,
      "",
      `${labels.scope}:`,
      agreedScope.trim(),
      "",
      `${labels.request}:`,
      clientRequest.trim(),
      prefill?.changeRequest ? `\n${labels.draft}:\n${prefill.changeRequest}` : null,
    ].filter((line): line is string => line !== null);

    const result = await submitLead({
      name: name.trim() || agency.trim() || "MileSeal",
      contact: email.trim(),
      task: taskParts.join("\n"),
      budget: "unknown",
      consent: true,
      company_fax_url: honeypot,
      lang,
      meta: buildLeadMeta("mileseal_scope_review"),
    });

    if (result.ok) {
      trackLeadFormSuccess("mileseal_scope_review");
      setStatus("success");
      return;
    }

    setErrorMsg(result.fallback ? cta.errNetwork : cta.errGeneric);
    setStatus("error");
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mileseal-manual-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        aria-label={ws.closeArtifact}
        onClick={onClose}
      />

      <div
        className={cx(
          "relative z-10 flex max-h-[min(94dvh,880px)] w-full max-w-[34rem] flex-col overflow-hidden",
          "rounded-t-[1.75rem] sm:rounded-[1.75rem]",
          "bg-white/88 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/60 backdrop-blur-2xl"
        )}
      >
        {/* Hero video header */}
        <div className="relative h-[148px] shrink-0 overflow-hidden sm:h-[168px]">
          <video
            ref={videoRef}
            className="pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-[#0a0a0a]/88" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,80,0,0.22)_0%,transparent_60%)]" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label={ws.closeArtifact}
          >
            <X className="h-4 w-4" strokeWidth={2} aria-hidden />
          </button>

          <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-4 pt-10 sm:px-6">
            <div className="mb-3 flex items-center gap-2.5">
              <img
                src="/images/mileseal-mark-orange.svg"
                alt=""
                className="h-9 w-9 drop-shadow-[0_8px_20px_rgba(252,80,0,0.45)]"
                width={36}
                height={36}
              />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                MileSeal
              </span>
              <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm">
                {ws.demoBadge}
              </span>
            </div>
            <h2
              id="mileseal-manual-title"
              className="text-[clamp(1.2rem,3vw,1.45rem)] font-semibold tracking-[-0.03em] text-white"
            >
              {ws.manualTitle}
            </h2>
            <p className="mt-1 max-w-[28rem] text-[13px] font-medium leading-snug text-white/70">
              {ws.manualText}
            </p>
          </div>
        </div>

        {/* Progress */}
        {status !== "success" ? (
          <div className="flex items-center gap-2 border-b border-black/[0.05] bg-white/70 px-5 py-2.5 backdrop-blur-md sm:px-6">
            <p className="text-[12px] font-semibold text-[#141414]/45">
              {ask.stepOf(Math.max(1, stepIndex + 1), steps.length)}
            </p>
            <div className="ml-auto flex gap-1">
              {steps.map((s, i) => (
                <span
                  key={s}
                  className={cx(
                    "h-1 w-5 rounded-full transition",
                    i <= stepIndex ? "bg-[#fc5000]" : "bg-black/10"
                  )}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 no-scrollbar sm:px-6 sm:py-5">
          {status === "success" ? (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fc5000]/12 text-[#fc5000]">
                <Check className="h-6 w-6" strokeWidth={2.25} aria-hidden />
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fc5000]">
                {cta.successBadge}
              </p>
              <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.02em] text-[#141414]">
                {cta.successTitle}
              </h3>
              <p className="mt-2 max-w-[26rem] text-[14px] font-medium leading-relaxed text-[#141414]/55">
                {cta.successText}
              </p>
              <button type="button" className={cx(primaryBtn, "mt-6")} onClick={onClose}>
                {ws.closeArtifact}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex min-h-full flex-col">
              <AssistantBubble>
                {step === "welcome" ? (
                  <>
                    <p className="font-semibold text-[#141414]">{ask.welcomeTitle}</p>
                    <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-[#141414]/62">
                      {ask.welcomeText}
                    </p>
                  </>
                ) : null}
                {step === "request" ? (
                  <>
                    <p className="flex items-center gap-2 font-semibold text-[#141414]">
                      <MessageSquareText className="h-4 w-4 text-[#fc5000]" aria-hidden />
                      {ask.qRequest}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[#141414]/5">{ask.qRequestHint}</p>
                  </>
                ) : null}
                {step === "scope" ? (
                  <>
                    <p className="flex items-center gap-2 font-semibold text-[#141414]">
                      <FileText className="h-4 w-4 text-[#fc5000]" aria-hidden />
                      {ask.qScope}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[#141414]/5">{ask.qScopeHint}</p>
                  </>
                ) : null}
                {step === "contact" ? (
                  <>
                    <p className="flex items-center gap-2 font-semibold text-[#141414]">
                      <Mail className="h-4 w-4 text-[#fc5000]" aria-hidden />
                      {ask.qContact}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[#141414]/5">{ask.qContactHint}</p>
                  </>
                ) : null}
                {step === "review" ? (
                  <>
                    <p className="flex items-center gap-2 font-semibold text-[#141414]">
                      <ShieldCheck className="h-4 w-4 text-[#fc5000]" aria-hidden />
                      {ask.qReview}
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-[#141414]/5">{ask.qReviewHint}</p>
                  </>
                ) : null}
              </AssistantBubble>

              <div className="mt-4 space-y-3">
                {step === "request" ? (
                  <AutoGrowTextarea
                    id={`${formId}-request`}
                    name="client_request"
                    required
                    minRows={4}
                    maxRows={10}
                    tone="light"
                    value={clientRequest}
                    onChange={(e) => setClientRequest(e.target.value)}
                    disabled={status === "loading"}
                    className={inputClass}
                    placeholder={cta.clientRequest}
                  />
                ) : null}

                {step === "scope" ? (
                  <AutoGrowTextarea
                    id={`${formId}-scope`}
                    name="agreed_scope"
                    required
                    minRows={4}
                    maxRows={10}
                    tone="light"
                    value={agreedScope}
                    onChange={(e) => setAgreedScope(e.target.value)}
                    disabled={status === "loading"}
                    className={inputClass}
                    placeholder={cta.agreedScope}
                  />
                ) : null}

                {step === "contact" ? (
                  <div className="space-y-3">
                    <div>
                      <label htmlFor={`${formId}-email`} className={labelClass}>
                        <Mail className="h-3.5 w-3.5" aria-hidden />
                        {cta.email}
                      </label>
                      <input
                        id={`${formId}-email`}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={inputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${formId}-name`} className={labelClass}>
                          <User className="h-3.5 w-3.5" aria-hidden />
                          {cta.name}
                        </label>
                        <input
                          id={`${formId}-name`}
                          name="name"
                          type="text"
                          autoComplete="name"
                          className={inputClass}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={status === "loading"}
                        />
                      </div>
                      <div>
                        <label htmlFor={`${formId}-agency`} className={labelClass}>
                          <Building2 className="h-3.5 w-3.5" aria-hidden />
                          {cta.agency}
                        </label>
                        <input
                          id={`${formId}-agency`}
                          name="agency"
                          type="text"
                          autoComplete="organization"
                          className={inputClass}
                          value={agency}
                          onChange={(e) => setAgency(e.target.value)}
                          disabled={status === "loading"}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {step === "review" ? (
                  <div className="space-y-3">
                    <SummaryCard
                      icon={<MessageSquareText className="h-4 w-4" aria-hidden />}
                      label={cta.clientRequest}
                      value={clientRequest}
                    />
                    <SummaryCard
                      icon={<FileText className="h-4 w-4" aria-hidden />}
                      label={cta.agreedScope}
                      value={agreedScope}
                    />
                    <SummaryCard
                      icon={<Mail className="h-4 w-4" aria-hidden />}
                      label={cta.email}
                      value={email}
                    />

                    <label className="mt-2 flex items-start gap-3 rounded-2xl bg-[#f4f3f1] px-3.5 py-3 text-[13px] font-medium leading-snug text-[#141414]/7">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        disabled={status === "loading"}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-0 bg-white accent-[#fc5000]"
                      />
                      <span>
                        {cta.consent}{" "}
                        <a
                          href={privacyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#141414] underline underline-offset-2 hover:text-[#fc5000]"
                        >
                          {cta.privacy}
                        </a>
                      </span>
                    </label>
                  </div>
                ) : null}
              </div>

              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label htmlFor={`${formId}-fax`}>Company fax</label>
                <input
                  id={`${formId}-fax`}
                  name="company_fax_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {errorMsg ? (
                <p
                  className="mt-3 rounded-xl bg-[#fc5000]/10 px-3.5 py-2.5 text-[13px] font-medium text-[#c2410c]"
                  role="alert"
                >
                  {errorMsg}
                </p>
              ) : null}

              <div className="mt-auto flex items-center gap-2 pt-5">
                {step !== "welcome" ? (
                  <button type="button" className={ghostBtn} onClick={goBack} disabled={status === "loading"}>
                    {ask.back}
                  </button>
                ) : null}
                <div className="ml-auto flex items-center gap-2">
                  {step === "review" ? (
                    <button type="submit" className={primaryBtn} disabled={status === "loading"}>
                      {status === "loading" ? cta.sending : cta.send}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </button>
                  ) : (
                    <button type="button" className={primaryBtn} onClick={goNext}>
                      {step === "welcome" ? ask.start : ask.next}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function AssistantBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <img
        src="/images/mileseal-mark-orange.svg"
        alt=""
        className="mt-0.5 h-7 w-7 shrink-0"
        width={28}
        height={28}
      />
      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-[#f4f3f1]/90 px-3.5 py-3 ring-1 ring-black/[0.04]">
        {children}
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f4f3f1] px-3.5 py-3 ring-1 ring-black/[0.04]">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#141414]/4">
        <span className="text-[#fc5000]">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 whitespace-pre-wrap text-[13px] font-medium leading-relaxed text-[#141414]/8">
        {value}
      </p>
    </div>
  );
}
