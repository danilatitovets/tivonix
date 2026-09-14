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
      </div>

      {/* Full-bleed query strips: left + right */}
      <div className="neo-ai-chip-marquee" aria-hidden>
        <div className="neo-ai-chip-marquee__rows">
          <div className="neo-ai-chip-marquee__row">
            <div className="neo-ai-chip-marquee__track neo-ai-chip-marquee__track--left">
              {[...c.queryChipsRowA, ...c.queryChipsRowA].map((q, i) => (
                <span key={`a-${i}-${q}`} className="neo-ai-chip-marquee__chip">
                  {q}
                </span>
              ))}
            </div>
          </div>
          <div className="neo-ai-chip-marquee__row">
            <div className="neo-ai-chip-marquee__track neo-ai-chip-marquee__track--right">
              {[...c.queryChipsRowB, ...c.queryChipsRowB].map((q, i) => (
                <span key={`b-${i}-${q}`} className="neo-ai-chip-marquee__chip">
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[44rem] flex-col items-center text-center">
        {/* Chat-style input → AI Pilot, northern aurora glow */}
        <div className="neo-ai-chat-glow w-full max-w-[28rem]">
          <span className="neo-ai-chat-glow__aurora" aria-hidden />
          <a
            href={NEO_AI_PILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-ai-chat-glow__field group relative z-[1] flex w-full items-center gap-3 rounded-full py-2 pl-5 pr-2 text-left"
            aria-label={c.ctaPilot}
          >
            <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-white/45 transition group-hover:text-white/65">
              {c.chatPlaceholder}
            </span>
            <span className="neo-ai-chat-glow__btn inline-flex h-9 shrink-0 items-center justify-center rounded-full px-4 text-[13px] font-medium text-[#070607]">
              {c.chatAction}
            </span>
          </a>
        </div>

        <LeadCTAButton
          source="project_page"
          variant="plain"
          className="!mt-4 !h-auto !justify-center !px-0 !py-1 !text-[14px] !font-medium !text-white/45 hover:!bg-transparent hover:!text-white/80"
        >
          {c.ctaContact}
        </LeadCTAButton>
      </div>

      {/* Screenshots — full-width, click to lightbox */}
      <div className="mt-16 sm:mt-20">
        <h3 className="text-center font-hero text-[clamp(1.2rem,2.2vw,1.55rem)] font-normal uppercase tracking-[0.02em] text-white/90">
          {c.shotsTitle}
        </h3>

        <div
          className="mt-7 space-y-4 sm:mt-8 sm:space-y-5"
          role="list"
          aria-label={c.shotsTitle}
        >
          {NEO_AI_SHOTS.map((shot, i) => (
            <button
              key={shot.id}
              type="button"
              role="listitem"
              className="group block w-full cursor-zoom-in overflow-hidden rounded-[1.15rem] bg-[#f4f4f5] outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/35 sm:rounded-[1.5rem]"
              aria-label={`${openLabel}: ${isRu ? shot.altRu : shot.altEn}`}
              onClick={() => setActive(i)}
            >
              <SoftImg
                src={shot.src}
                alt={isRu ? shot.altRu : shot.altEn}
                className="aspect-[16/9] w-full object-cover object-top sm:aspect-[1024/581]"
                loading="lazy"
                decoding="async"
                fade
              />
            </button>
          ))}
        </div>
      </div>

      {/* Metrics — long blocks + generated icon top-right */}
      <div className="mt-16 grid grid-cols-1 gap-3 sm:mt-20 sm:grid-cols-2 sm:gap-4">
        {c.metrics.map((m) => (
          <div
            key={m.label}
            className="relative min-h-[7.5rem] min-w-0 overflow-hidden rounded-[14px] bg-[#1c1c1f] px-5 py-5 pr-20 sm:min-h-[8.25rem] sm:px-6 sm:py-6 sm:pr-24"
          >
            <img
              src={m.icon}
              alt=""
              width={56}
              height={56}
              className="pointer-events-none absolute right-3 top-3 h-12 w-12 rounded-[10px] object-cover sm:right-4 sm:top-4 sm:h-14 sm:w-14 sm:rounded-[12px]"
              decoding="async"
              aria-hidden
            />
            <p className="font-hero text-[clamp(2rem,4vw,2.65rem)] font-normal leading-none tracking-[0.02em] text-white">
              {m.value}
            </p>
            <p className="mt-3 max-w-[18rem] text-[13px] font-medium leading-snug text-white/45 sm:text-[14px]">
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
