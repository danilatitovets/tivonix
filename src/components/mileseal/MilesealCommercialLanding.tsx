import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { ctaClass } from "../leads/ctaStyles";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import { useRef, type RefObject } from "react";
import { milesealCommercialCopy } from "../../i18n/milesealCommercialCopy";
import { trackLeadFormOpen } from "../../lib/analytics";

const HERO_VIDEO = "/images/hero-bg.mp4";
const HERO_POSTER = "/images/hero-bg-poster.webp";

type Props = {
  caseStudyPath: string;
  onRequestReview: () => void;
  onRequestAudit: () => void;
  reviewOpenerRef?: RefObject<HTMLButtonElement | null>;
};

export default function MilesealCommercialLanding({
  caseStudyPath,
  onRequestReview,
  onRequestAudit,
  reviewOpenerRef,
}: Props) {
  const copy = milesealCommercialCopy();
  const videoRef = useRef<HTMLVideoElement>(null);
  useKeepVideoPlaying(videoRef);

  const openReview = () => {
    trackLeadFormOpen("mileseal_scope_review");
    onRequestReview();
  };

  return (
    <div className="bg-black text-white">
      <section className="relative isolate min-h-[min(92svh,920px)] overflow-hidden pt-[calc(var(--tivonix-header-spacer)+0.5rem)] pb-12 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden>
          <video
            ref={videoRef}
            className="pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover object-center"
            src={HERO_VIDEO}
            poster={HERO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,80,0,0.18)_0%,transparent_62%)]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-[46rem] text-center">
            <span className="inline-flex items-center rounded-full bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF9A3D] ring-1 ring-white/10">
              {copy.hero.badge}
            </span>

            <h1 className="mt-6 font-hero text-[clamp(2rem,6vw,4.25rem)] font-normal uppercase leading-[0.94] tracking-[0.01em] text-white text-balance">
              {copy.hero.title}
            </h1>

            <p className="mx-auto mt-5 max-w-[38rem] font-sans text-[15px] font-medium leading-[1.55] text-white/72 sm:mt-6 sm:text-[16px]">
              {copy.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
              <button
                type="button"
                ref={reviewOpenerRef}
                data-testid="mileseal-hero-review-cta"
                onClick={openReview}
                className={ctaClass("primary", "lg")}
              >
                {copy.hero.reviewCta}
              </button>
              <Link to={caseStudyPath} className={ctaClass("secondary", "lg")}>
                {copy.hero.caseCta}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="mileseal-offers"
        className="border-t border-white/[0.06] bg-[#0a0a0a] py-14 sm:py-16"
        aria-labelledby="mileseal-offers-title"
      >
        <Container>
          <div className="mx-auto max-w-[40rem] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ffae66]">
              {copy.ladder.eyebrow}
            </p>
            <h2
              id="mileseal-offers-title"
              className="mt-4 font-hero text-[clamp(1.75rem,4vw,2.75rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white"
            >
              {copy.ladder.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[34rem] text-[15px] font-medium leading-[1.55] text-white/60">
              {copy.ladder.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[56rem] gap-4 sm:grid-cols-3 sm:gap-5">
            {copy.ladder.tiers.map((tier) => (
              <div
                key={tier.id}
                className={
                  tier.featured
                    ? "relative overflow-hidden rounded-[24px] bg-[#141414] px-5 py-7 ring-2 ring-[#fc5000]/55 sm:px-6 sm:py-8"
                    : "overflow-hidden rounded-[24px] bg-[#0c0c0c] px-5 py-7 ring-1 ring-white/[0.08] sm:px-6 sm:py-8"
                }
              >
                {tier.featured ? (
                  <span className="absolute right-4 top-4 rounded-full bg-[#fc5000]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ffae66]">
                    {copy.ladder.featuredBadge}
                  </span>
                ) : null}
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">
                  {tier.eyebrow}
                </p>
                <p className="mt-3 font-hero text-[2rem] font-normal uppercase leading-none tracking-[0.02em] text-white">
                  {tier.price}
                </p>
                <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-white">
                  {tier.title}
                </h3>
                <p className="mt-2 text-[14px] font-medium leading-[1.55] text-white/58">
                  {tier.text}
                </p>
                {tier.note ? (
                  <p className="mt-3 text-[12px] font-semibold text-[#ffae66]">{tier.note}</p>
                ) : null}
                {tier.cta ? (
                  <button
                    type="button"
                    data-testid={
                      tier.id === "review"
                        ? "mileseal-pricing-review-cta"
                        : tier.id === "audit"
                          ? "mileseal-pricing-audit-cta"
                          : undefined
                    }
                    onClick={
                      tier.id === "audit"
                        ? () => {
                            trackLeadFormOpen("mileseal_scope_leakage_audit");
                            onRequestAudit();
                          }
                        : tier.id === "review"
                          ? openReview
                          : undefined
                    }
                    className={
                      tier.featured
                        ? ctaClass("primary", "md") + " mt-6 w-full"
                        : ctaClass("secondary", "md") + " mt-6 w-full"
                    }
                  >
                    {tier.cta}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
