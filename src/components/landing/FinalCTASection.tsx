import { useEffect, useRef, useState, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import { TelegramLink } from "./LandingCTA";
import { TG_CHANNEL_URL } from "../../constants/links";
import { trackTelegramDirectClick } from "../../lib/analytics";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import { getStableViewportHeight } from "../../lib/stableViewport";

const FINAL_CTA_VIDEO = "/images/hero-bg.mp4";
const FINAL_CTA_POSTER = "/images/hero-bg-poster.webp";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function useSectionScrollScale(sectionRef: React.RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1.05);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1.08);
      return;
    }

    let raf = 0;
    let lastScale = 1.05;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = getStableViewportHeight();
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const progress = clamp01(scrolled / total);
      const next = 1.08 + progress * 0.44;
      if (Math.abs(next - lastScale) < 0.004) return;
      lastScale = next;
      setScale(next);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    // no resize: mobile chrome height changes must not retarget scale while idle

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [sectionRef]);

  return scale;
}

export default function FinalCTASection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgScale = useSectionScrollScale(cardRef);

  const bgStyle: CSSProperties = {
    transform: `translate3d(-50%, -50%, 0) scale(${bgScale})`,
  };

  useKeepVideoPlaying(videoRef);

  return (
    <Section
      id="contact"
      className="final-cta-section scroll-mt-[var(--tivonix-header-spacer)] py-14 sm:py-16 lg:py-20"
    >
      <Container className="pb-2 sm:pb-4 lg:pb-6">
        <div
          ref={cardRef}
          className="final-cta-card relative overflow-hidden rounded-[28px] px-6 py-12 text-center sm:rounded-[40px] sm:px-10 sm:py-14 lg:px-16 lg:py-16"
        >
          <div className="final-cta-card__bg" aria-hidden>
            <video
              ref={videoRef}
              className="final-cta-card__bg-img pointer-events-none"
              style={bgStyle}
              src={FINAL_CTA_VIDEO}
              poster={FINAL_CTA_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              disablePictureInPicture
            />
            <div className="final-cta-card__bg-overlay" />
          </div>

          <h2 className="relative z-[1] mx-auto max-w-[22ch] font-hero text-[clamp(1.75rem,4.5vw,2.85rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance">
            {copy.finalCta.title}
          </h2>

          <p className="relative z-[1] mx-auto mt-4 max-w-[36rem] font-sans text-[15px] font-medium leading-[1.55] text-white/78 sm:text-[16px]">
            {copy.finalCta.subtitle}
          </p>

          <div className="final-cta-card__actions relative z-[1] mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
            <LeadCTAButton
              source="final_cta"
              variant="white"
              size="lg"
              className="final-cta-btn"
            >
              {copy.finalCta.ctaPrimary}
            </LeadCTAButton>
            <TelegramLink
              variant="white"
              size="lg"
              href={TG_CHANNEL_URL}
              className="final-cta-btn final-cta-btn--black"
              onClick={() => trackTelegramDirectClick()}
            >
              {copy.finalCta.ctaSecondary}
            </TelegramLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
