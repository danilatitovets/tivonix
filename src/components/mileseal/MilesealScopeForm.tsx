import { useId, useState, type FormEvent } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import AutoGrowTextarea from "../ui/AutoGrowTextarea";
import { ctaClass } from "../leads/ctaStyles";
import { buildLeadMeta, submitLead } from "../../lib/leads";
import { trackLeadFormSubmit, trackLeadFormSuccess } from "../../lib/analytics";
import { useLang } from "../../i18n/LangProvider";
import { milesealCopy } from "../../i18n/milesealCopy";
import type { ScopeFormPrefill } from "../../data/milesealDemo";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const inputClass = cx(
  "w-full h-12 rounded-[16px] px-4",
  "border-0 bg-[#141414] text-white placeholder:text-white/35",
  "outline-none focus:bg-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-[#fc5000]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c]",
  "font-sans text-[14px] font-medium transition"
);

const labelClass = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55";

type Props = {
  prefill?: ScopeFormPrefill | null;
  formOpen: boolean;
  onOpenForm: () => void;
  formKey: number;
};

export default function MilesealScopeForm({ prefill, formOpen, onOpenForm, formKey }: Props) {
  const { lang } = useLang();
  const copy = milesealCopy(lang).cta;

  return (
    <Section
      id="scope-review"
      className="scroll-mt-[var(--tivonix-header-spacer)] bg-black !py-14 sm:!py-16 lg:!py-20"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[40rem] text-center">
            <h2 className="font-hero text-[clamp(1.85rem,4.5vw,3rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance">
              {copy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[34rem] text-[15px] font-medium leading-relaxed text-white/60 sm:text-[16px]">
              {copy.text}
            </p>
            {!formOpen ? (
              <div className="mt-7">
                <button type="button" onClick={onOpenForm} className={ctaClass("primary", "lg")}>
                  {copy.openForm}
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>

        {formOpen ? (
          <Reveal delay={60} className="mx-auto mt-10 max-w-[40rem]">
            <MilesealReviewForm key={`${formKey}-${lang}`} prefill={prefill} />
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}

function MilesealReviewForm({ prefill }: { prefill?: ScopeFormPrefill | null }) {
  const { lang } = useLang();
  const copy = milesealCopy(lang).cta;
  const formId = useId();
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || email.trim().length < 3) {
      setErrorMsg(copy.errEmail);
      setStatus("error");
      return;
    }
    if (!clientRequest.trim() || clientRequest.trim().length < 5) {
      setErrorMsg(copy.errRequest);
      setStatus("error");
      return;
    }
    if (!agreedScope.trim() || agreedScope.trim().length < 5) {
      setErrorMsg(copy.errScope);
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg(copy.errConsent);
      setStatus("error");
      return;
    }

    setStatus("loading");
    trackLeadFormSubmit("mileseal_scope_review");

    const labels =
      lang === "ru"
        ? { agency: "Агентство", scope: "Согласованный объём", request: "Запрос клиента", draft: "Черновик change request" }
        : lang === "zh"
          ? { agency: "代理商", scope: "已约定范围", request: "客户请求", draft: "变更请求草稿" }
          : { agency: "Agency", scope: "Agreed scope", request: "Recent client request", draft: "Demo change request draft" };

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

    setErrorMsg(result.fallback ? copy.errNetwork : copy.errGeneric);
    setStatus("error");
  };

  if (status === "success") {
    return (
      <div className="rounded-[24px] bg-[#0c0c0c] px-6 py-10 text-center sm:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF9A3D]">
          {copy.successBadge}
        </p>
        <h3 className="mt-3 font-hero text-[clamp(1.6rem,3.5vw,2.25rem)] uppercase tracking-[0.02em] text-white">
          {copy.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-[32rem] font-sans text-[15px] font-medium leading-[1.55] text-white/62">
          {copy.successText}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-[24px] bg-[#0c0c0c] p-5 sm:p-7"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            {copy.name}
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
          <label htmlFor={`${formId}-email`} className={labelClass}>
            {copy.email}
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
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-agency`} className={labelClass}>
          {copy.agency}
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

      <div className="mt-4">
        <label htmlFor={`${formId}-request`} className={labelClass}>
          {copy.clientRequest}
        </label>
        <AutoGrowTextarea
          id={`${formId}-request`}
          name="client_request"
          required
          minRows={3}
          maxRows={12}
          value={clientRequest}
          onChange={(e) => setClientRequest(e.target.value)}
          disabled={status === "loading"}
        />
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-scope`} className={labelClass}>
          {copy.agreedScope}
        </label>
        <AutoGrowTextarea
          id={`${formId}-scope`}
          name="agreed_scope"
          required
          minRows={3}
          maxRows={12}
          value={agreedScope}
          onChange={(e) => setAgreedScope(e.target.value)}
          disabled={status === "loading"}
        />
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

      <label className="mt-5 flex items-start gap-3 text-[13px] font-medium leading-snug text-white/65">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={status === "loading"}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-0 bg-white/15 accent-[#fc5000]"
        />
        <span>
          {copy.consent}{" "}
          <a
            href={privacyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/85 underline underline-offset-2 hover:text-white"
          >
            {copy.privacy}
          </a>
        </span>
      </label>

      {errorMsg ? (
        <p
          className="mt-4 rounded-xl bg-[#fc5000]/12 px-3.5 py-2.5 text-[13px] font-medium text-[#FF9A3D]"
          role="alert"
        >
          {errorMsg}
        </p>
      ) : null}

      <div className="mt-6">
        <button
          type="submit"
          disabled={status === "loading"}
          className={ctaClass("primary", "lg", "w-full sm:w-auto disabled:opacity-60")}
        >
          {status === "loading" ? copy.sending : copy.send}
        </button>
      </div>
    </form>
  );
}
