import SoftImg from "../ui/SoftImg";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import type { Lang } from "../../i18n/LangProvider";
import {
  NEO_AI_PILOT_URL,
  NEO_AI_SHOTS,
  neoAiCopy,
} from "../../data/neoTerminalAiChapter";

/**
 * Lean AI Commerce chapter for Neo Terminal case.
 * Visual language: air, hero type, rounded product shots — no bordered cards / fake chat UI.
 */
export default function NeoTerminalAiChapter({ lang }: { lang: Lang }) {
  const c = neoAiCopy(lang);
  const isRu = lang === "ru";

  return (
    <section
      className="mt-16 pt-14 sm:mt-20 sm:pt-16"
      aria-labelledby="neo-ai-heading"
    >
      <div className="flex items-center gap-3">
        <img
          src="/projects/terminal-neo/ai/ai-mark.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-full bg-white object-contain p-1"
          decoding="async"
          aria-hidden
        />
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
          {c.eyebrow}
        </p>
      </div>

      <h2
        id="neo-ai-heading"
        className="mt-5 max-w-[18ch] font-hero text-[clamp(1.75rem,4vw,2.85rem)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-white"
      >
        {c.heading}
      </h2>

      <p className="mt-5 max-w-[56rem] text-[15px] font-medium leading-[1.65] text-white/55 sm:text-[16px]">
        {c.lead}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {c.queryChips.map((q) => (
          <span
            key={q}
            className="rounded-full bg-white/[0.07] px-3.5 py-2 text-[13px] font-medium text-white/75"
          >
            {q}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={NEO_AI_PILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-[14px] font-medium text-[#070607] transition hover:bg-white/92"
        >
          {c.ctaPilot}
        </a>
        <LeadCTAButton
          source="project_page"
          variant="plain"
          className="!h-auto !justify-start !px-0 !py-1 !text-[14px] !font-medium !text-white/55 hover:!bg-transparent hover:!text-white/85"
        >
          {c.ctaContact}
        </LeadCTAButton>
      </div>

      {/* Screenshots — alternating left / right, rounded only */}
      <div className="mt-16 space-y-14 sm:mt-20 sm:space-y-16">
        <h3 className="font-hero text-[clamp(1.2rem,2.2vw,1.55rem)] font-normal uppercase tracking-[0.02em] text-white/90">
          {c.shotsTitle}
        </h3>

        {NEO_AI_SHOTS.map((shot, i) => {
          const flip = i % 2 === 1;
          return (
            <figure
              key={shot.id}
              className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10"
            >
              <div className={flip ? "lg:order-2" : "lg:order-1"}>
                <div className="overflow-hidden rounded-[1.25rem] bg-[#f4f4f5] sm:rounded-[1.5rem]">
                  <SoftImg
                    src={shot.src}
                    alt={isRu ? shot.altRu : shot.altEn}
                    className="aspect-[16/10] w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    fade
                  />
                </div>
              </div>
              <figcaption
                className={`max-w-[28rem] text-[15px] font-medium leading-relaxed text-white/55 ${
                  flip ? "lg:order-1 lg:justify-self-end lg:text-right" : "lg:order-2"
                }`}
              >
                {isRu ? shot.captionRu : shot.captionEn}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Metrics — full width, no borders */}
      <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-20 sm:grid-cols-4 sm:gap-x-8">
        {c.metrics.map((m) => (
          <div key={m.label} className="min-w-0">
            <p className="font-hero text-[clamp(2rem,4.5vw,2.75rem)] font-normal leading-none tracking-[0.02em] text-white">
              {m.value}
            </p>
            <p className="mt-2.5 max-w-[14rem] text-[12.5px] font-medium leading-snug text-white/42">
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
