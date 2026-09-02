import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { LeadCTAButton } from "../leads/LeadCTAButton";
import { pathForLang } from "../../lib/localePaths";
import { getStableViewportHeight } from "../../lib/stableViewport";
import BgLoopVideo from "../ui/BgLoopVideo";

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
    let visible = false;

    const update = () => {
      if (!visible) return;
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
      if (!visible) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (visible) schedule();
      },
      { root: null, rootMargin: "30% 0px", threshold: 0 }
    );
    io.observe(el);

    window.addEventListener("scroll", schedule, { passive: true });
    // no resize: mobile chrome height changes must not retarget scale while idle

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, [sectionRef]);

  return scale;
}

export default function FinalCTASection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgScale = useSectionScrollScale(cardRef);

  const bgStyle: CSSProperties = {
    transform: `translate3d(-50%, -50%, 0) scale(${bgScale})`,
  };

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
            <BgLoopVideo variant="form" className="final-cta-card__bg-img pointer-events-none" style={bgStyle} />
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
            <Link
              to={pathForLang("/projects", lang)}
              className="final-cta-btn final-cta-btn--black inline-flex items-center justify-center rounded-full font-sans text-[15px] font-medium sm:text-[16px]"
            >
              {copy.finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
