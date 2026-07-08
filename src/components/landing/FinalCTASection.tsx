import { useEffect, useRef, useState, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { CalcButton, TelegramLink } from "./LandingCTA";
import StartModal from "./StartModal";

const FINAL_CTA_BG = `/images/${encodeURI("как рабоает")}/future.png`;

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

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const progress = clamp01(scrolled / total);
      setScale(1.08 + progress * 0.44);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionRef]);

  return scale;
}

export default function FinalCTASection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgScale = useSectionScrollScale(cardRef);

  const bgStyle: CSSProperties = {
    transform: `translate3d(-50%, -50%, 0) scale(${bgScale})`,
  };

  return (
    <>
      <Section
        id="contact"
        className="final-cta-section scroll-mt-[var(--tivonix-header-spacer)] py-14 sm:py-16 lg:py-20"
      >
        <Container className="pb-2 sm:pb-4 lg:pb-6">
          <div
            ref={cardRef}
            className="final-cta-card relative overflow-hidden rounded-[28px] px-6 py-12 text-center sm:rounded-[32px] sm:px-10 sm:py-14 lg:px-16 lg:py-16"
          >
            <div className="final-cta-card__bg" aria-hidden>
              <img
                src={FINAL_CTA_BG}
                alt=""
                className="final-cta-card__bg-img"
                style={bgStyle}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="final-cta-card__bg-overlay" />
            </div>

            <h2 className="relative z-[1] mx-auto max-w-[20ch] font-hero text-[clamp(1.75rem,4.5vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white text-balance">
              {copy.finalCta.title}
            </h2>

            <div className="final-cta-card__actions relative z-[1] mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4">
              <div className="projects-cta-glow final-cta-glow w-full max-w-[280px] sm:w-auto sm:min-w-[220px]">
                <TelegramLink
                  variant="white"
                  size="lg"
                  className="projects-cta-glow__btn final-cta-glow__btn w-full"
                >
                  {copy.finalCta.ctaPrimary}
                </TelegramLink>
              </div>
              <CalcButton
                variant="white"
                size="lg"
                onClick={() => setModalOpen(true)}
                className="final-cta-btn final-cta-btn--secondary w-full max-w-[280px] sm:w-auto sm:min-w-[220px]"
              >
                {copy.finalCta.ctaSecondary}
              </CalcButton>
            </div>
          </div>
        </Container>
      </Section>

      <StartModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
