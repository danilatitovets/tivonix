import { useState } from "react";
import SoftImg from "../ui/SoftImg";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import type { Lang } from "../../i18n/LangProvider";
import {
  NEO_AI_PILOT_URL,
  NEO_AI_SHOTS,
  neoAiCopy,
} from "../../data/neoTerminalAiChapter";
import { GalleryLightbox } from "../../pages/projectBlocks";

/**
 * Lean AI Commerce chapter for Neo Terminal case.
 * Centered intro + chat-style pilot CTA; screenshots as a plain gallery with lightbox.
 */
export default function NeoTerminalAiChapter({ lang }: { lang: Lang }) {
  const c = neoAiCopy(lang);
  const isRu = lang === "ru";
  const [active, setActive] = useState<number | null>(null);
  const images = NEO_AI_SHOTS.map((s) => s.src);
  const openLabel = isRu ? "Открыть скриншот" : "Open screenshot";

  return (
    <section
      className="mt-16 border-t border-white/[0.06] pt-14 sm:mt-20 sm:pt-16"
      aria-labelledby="neo-ai-heading"
    >
      <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
        <img
          src="/projects/terminal-neo/ai/ai-mark.png"
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 object-contain"
          decoding="async"
          aria-hidden
        />

        <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
          {c.eyebrow}
        </p>

        <h2
          id="neo-ai-heading"
          className="mt-4 font-hero text-[clamp(1.75rem,4vw,2.85rem)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-white text-balance"
        >
          {c.heading}
        </h2>

        <p className="mt-5 text-[15px] font-medium leading-[1.65] text-white/55 sm:text-[16px]">
          {c.lead}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {c.queryChips.map((q) => (
            <span
              key={q}
              className="rounded-full bg-white/[0.07] px-3.5 py-2 text-[13px] font-medium text-white/75"
            >
              {q}
            </span>
          ))}
        </div>

        {/* Chat-style input → AI Pilot */}
        <a
          href={NEO_AI_PILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 flex w-full max-w-[28rem] items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.06] py-2 pl-5 pr-2 text-left transition hover:border-white/20 hover:bg-white/[0.09]"
          aria-label={c.ctaPilot}
        >
          <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-white/40 transition group-hover:text-white/55">
            {c.chatPlaceholder}
          </span>
          <span className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-white px-4 text-[13px] font-medium text-[#070607] transition group-hover:bg-white/92">
            {c.chatAction}
          </span>
        </a>

        <LeadCTAButton
          source="project_page"
          variant="plain"
          className="!mt-4 !h-auto !justify-center !px-0 !py-1 !text-[14px] !font-medium !text-white/45 hover:!bg-transparent hover:!text-white/80"
        >
          {c.ctaContact}
        </LeadCTAButton>
      </div>

      {/* Screenshots — plain gallery, open on click */}
      <div className="mt-16 sm:mt-20">
        <h3 className="text-center font-hero text-[clamp(1.2rem,2.2vw,1.55rem)] font-normal uppercase tracking-[0.02em] text-white/90">
          {c.shotsTitle}
        </h3>

        <div
          className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4"
          role="list"
          aria-label={c.shotsTitle}
        >
          {NEO_AI_SHOTS.map((shot, i) => (
            <button
              key={shot.id}
              type="button"
              role="listitem"
              className="group block w-full cursor-zoom-in overflow-hidden rounded-[1.1rem] bg-[#f4f4f5] outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/35 sm:rounded-[1.25rem]"
              aria-label={`${openLabel}: ${isRu ? shot.altRu : shot.altEn}`}
              onClick={() => setActive(i)}
            >
              <SoftImg
                src={shot.src}
                alt={isRu ? shot.altRu : shot.altEn}
                className="aspect-[16/10] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                fade
              />
            </button>
          ))}
        </div>
      </div>

      {/* Metrics — blocks */}
      <div className="mt-16 grid grid-cols-2 gap-2.5 sm:mt-20 sm:grid-cols-4 sm:gap-4">
        {c.metrics.map((m) => (
          <div
            key={m.label}
            className="min-w-0 rounded-[12px] bg-[#1c1c1f] px-4 py-5 text-center sm:px-5 sm:py-6"
          >
            <p className="font-hero text-[clamp(1.85rem,3.8vw,2.5rem)] font-normal leading-none tracking-[0.02em] text-white">
              {m.value}
            </p>
            <p className="mx-auto mt-3 max-w-[12rem] text-[12px] font-medium leading-snug text-white/45 sm:text-[12.5px]">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {active !== null ? (
        <GalleryLightbox
          images={images}
          index={active}
          isRu={isRu}
          onClose={() => setActive(null)}
          onIndexChange={setActive}
        />
      ) : null}
    </section>
  );
}
