import SoftImg from "../ui/SoftImg";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import type { Lang } from "../../i18n/LangProvider";
import {
  NEO_AI_PILOT_URL,
  NEO_AI_SHOTS,
  neoAiCopy,
} from "../../data/neoTerminalAiChapter";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export default function NeoTerminalAiChapter({ lang }: { lang: Lang }) {
  const c = neoAiCopy(lang);
  const isRu = lang === "ru";

  return (
    <section
      className="mt-16 border-t border-white/[0.08] pt-14 sm:mt-20 sm:pt-16"
      aria-labelledby="neo-ai-heading"
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#FF9A3D]/90">
          {c.eyebrow}
        </p>
        <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
          {c.badge}
        </span>
      </div>

      <h2
        id="neo-ai-heading"
        className="mt-4 max-w-[22ch] font-hero text-[clamp(1.65rem,3.8vw,2.65rem)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white"
      >
        {c.heading}
      </h2>
      <p className="mt-5 max-w-[52rem] text-[15px] font-medium leading-[1.65] text-white/58 sm:text-[16px]">
        {c.lead}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={NEO_AI_PILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[14px] font-medium text-[#070607] transition hover:bg-white/92"
        >
          {c.ctaPilot}
        </a>
        <LeadCTAButton
          source="project_page"
          variant="plain"
          className="!h-11 !justify-center !rounded-full !border !border-white/15 !px-6 !text-[14px] !text-white/85 hover:!bg-white/[0.04]"
        >
          {c.ctaContact}
        </LeadCTAButton>
        <p className="text-[12px] text-white/38 sm:ml-1">{c.ctaPilotNote}</p>
      </div>

      {/* Problem + query chips */}
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div>
          <h3 className="font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
            {c.problemTitle}
          </h3>
          <p className="mt-4 text-[14.5px] leading-relaxed text-white/55">{c.problemBody}</p>
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {c.queryChips.map((q) => (
            <span
              key={q}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-white/78"
            >
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* Two modes */}
      <h3 className="mt-16 font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
        {c.modesTitle}
      </h3>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#FF9A3D]/85">01</p>
          <h4 className="mt-2 text-[18px] font-semibold tracking-tight text-white">{c.globalTitle}</h4>
          <p className="mt-3 text-[14px] leading-relaxed text-white/55">{c.globalBody}</p>
          <div className="mt-5 space-y-2 rounded-xl bg-black/35 p-4 ring-1 ring-white/[0.06]">
            <p className="text-[12px] text-white/40">{isRu ? "Пользователь" : "Shopper"}</p>
            <p className="text-[14px] font-medium text-white/88">«{c.globalExampleUser}»</p>
            <p className="pt-2 text-[12px] text-white/40">AI</p>
            <p className="text-[13.5px] leading-snug text-white/70">{c.globalExampleAi}</p>
          </div>
        </article>
        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#FF9A3D]/85">02</p>
          <h4 className="mt-2 text-[18px] font-semibold tracking-tight text-white">{c.productTitle}</h4>
          <p className="mt-3 text-[14px] leading-relaxed text-white/55">{c.productBody}</p>
          <ul className="mt-4 space-y-1.5">
            {c.productExamples.map((ex) => (
              <li key={ex} className="text-[13.5px] text-white/70">
                «{ex}»
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-white/[0.08] pt-4 text-[13.5px] font-medium leading-snug text-white/80">
            {c.productKey}
          </p>
        </article>
      </div>

      {/* Conversation flow */}
      <h3 className="mt-16 font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
        {c.flowTitle}
      </h3>
      <ol className="mt-6 max-w-[40rem] space-y-3">
        {c.flowSteps.map((step, i) => {
          const isUser = i % 2 === 0;
          return (
            <li
              key={`${step.who}-${i}`}
              className={cx("flex", isUser ? "justify-end" : "justify-start")}
            >
              <div
                className={cx(
                  "max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[85%]",
                  isUser
                    ? "bg-white text-[#0a0a0b]"
                    : "border border-white/10 bg-white/[0.05] text-white/85"
                )}
              >
                <p className={cx("text-[10px] font-medium uppercase tracking-[0.12em]", isUser ? "text-black/45" : "text-white/40")}>
                  {step.who}
                </p>
                <p className="mt-1 text-[14px] leading-snug">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Architecture */}
      <h3 className="mt-16 font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
        {c.archTitle}
      </h3>
      <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {c.archSteps.map((step, i) => (
          <li
            key={step}
            className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3"
          >
            <span className="mt-0.5 font-mono text-[11px] text-[#FF9A3D]/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[13.5px] font-medium leading-snug text-white/78">{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-[46rem] text-[14.5px] leading-relaxed text-white/55">{c.archNote}</p>

      {/* Reliability */}
      <h3 className="mt-16 font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
        {c.reliabilityTitle}
      </h3>
      <p className="mt-4 max-w-[48rem] text-[14.5px] leading-relaxed text-white/55">{c.reliabilityLead}</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {c.principles.map((p, i) => (
          <li
            key={p}
            className="flex gap-3 rounded-xl border border-white/[0.07] px-3.5 py-3 text-[13.5px] text-white/75"
          >
            <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
            {p}
          </li>
        ))}
      </ul>

      {/* Metrics */}
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {c.metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-5">
            <p className="font-hero text-[clamp(1.6rem,3vw,2.1rem)] font-normal tracking-[0.02em] text-white">
              {m.value}
            </p>
            <p className="mt-2 text-[12px] leading-snug text-white/45">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Screenshots */}
      <h3 className="mt-16 font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
        {c.shotsTitle}
      </h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {NEO_AI_SHOTS.map((shot) => (
          <figure key={shot.id} className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#141416]">
              {shot.src ? (
                <SoftImg
                  src={shot.src}
                  alt={isRu ? shot.altRu : shot.altEn}
                  className="aspect-[16/10] w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  fade
                />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-[#121214] px-4 text-center text-[12px] text-white/35">
                  {c.pendingShot}
                  <span className="sr-only">{isRu ? shot.altRu : shot.altEn}</span>
                </div>
              )}
            </div>
            <figcaption className="mt-3 text-[13px] leading-snug text-white/48">
              {isRu ? shot.captionRu : shot.captionEn}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Result */}
      <div className="mt-16 max-w-[48rem]">
        <h3 className="font-hero text-[clamp(1.25rem,2.4vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
          {c.resultTitle}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-white/58">{c.resultBody}</p>
        <ul className="mt-6 space-y-2">
          {c.resultPoints.map((p) => (
            <li key={p} className="flex gap-2.5 text-[14px] text-white/72">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FF9A3D]" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
