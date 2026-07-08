import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Container from "../ui/Container";
import PillActionBar from "../ui/PillActionBar";
import ProcessStepStage from "./ProcessStepStage";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";

const PROCESS_BG_MUTED = `/images/${encodeURI("как рабоает")}/${encodeURI("чер.png")}`;
const PROCESS_BG_WARM = `/images/${encodeURI("как рабоает")}/${encodeURI("яр.png")}`;
const STEP_SCROLL_VH = 80;
const APPROACH_RUNWAY_VH = 32;

function sectionApproach(rectTop: number, viewport: number, headerSpacer: number) {
  return smoothstep((viewport * 0.88 - rectTop) / (viewport * 0.88 - headerSpacer));
}

function processShellExpand(
  rectTop: number,
  scrollInTrack: number,
  viewport: number,
  headerSpacer: number,
  scrollable: number,
  approachPx: number
) {
  let expand = 0;

  if (rectTop < viewport * 0.92) {
    expand = sectionApproach(rectTop, viewport, headerSpacer);
  } else if (scrollInTrack > 0) {
    expand = 1;
  }

  const tailStart = scrollable - approachPx * 0.9;
  if (scrollInTrack > tailStart) {
    expand *= 1 - smoothstep((scrollInTrack - tailStart) / Math.max(1, approachPx * 0.9));
  }

  return expand;
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function stepSegmentPhase(segment: number) {
  const introEnd = 0.1;
  const animEnd = 0.72;
  const holdEnd = 0.9;

  if (segment < introEnd) {
    return {
      fade: smoothstep(segment / introEnd),
      localProgress: 0,
    };
  }

  if (segment < animEnd) {
    return {
      fade: 1,
      localProgress: smoothstep((segment - introEnd) / (animEnd - introEnd)),
    };
  }

  if (segment < holdEnd) {
    return {
      fade: 1,
      localProgress: 1,
    };
  }

  return {
    fade: 1,
    localProgress: 1,
  };
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}

export default function ProcessTimelineSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const steps = copy.process.steps;
  const stepCount = steps.length;

  const pinWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const warmBgRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [stepFade, setStepFade] = useState(1);
  const reducedMotion = usePrefersReducedMotion();

  const pinHeightVh = 100 + Math.max(0, stepCount - 1) * STEP_SCROLL_VH;
  const totalHeightVh = APPROACH_RUNWAY_VH + pinHeightVh;

  const tabs = useMemo(
    () =>
      steps.map((_, index) => ({
        id: `step-${index}`,
        label: String(index + 1),
      })),
    [steps]
  );

  const scrollToStep = useCallback(
    (index: number) => {
      const track = pinWrapRef.current;
      if (!track || typeof window === "undefined") return;

      const trackTop = window.scrollY + track.getBoundingClientRect().top;
      const approachPx = (APPROACH_RUNWAY_VH / 100) * window.innerHeight;
      const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      const pinScrollable = Math.max(1, scrollable - approachPx);
      const targetProgress = (index + 0.78) / stepCount;

      window.scrollTo({
        top: trackTop + approachPx + targetProgress * pinScrollable,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion, stepCount]
  );

  useEffect(() => {
    const track = pinWrapRef.current;
    if (!track || typeof window === "undefined") return;

    let raf = 0;
    let trackTop = 0;
    let scrollable = 1;
    let approachPx = 1;
    let pinScrollable = 1;
    let headerSpacer = 92;
    let lastStep = -1;
    let lastExpand = -1;

    const measure = () => {
      trackTop = window.scrollY + track.getBoundingClientRect().top;
      scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
      approachPx = (APPROACH_RUNWAY_VH / 100) * window.innerHeight;
      pinScrollable = Math.max(1, scrollable - approachPx);
      headerSpacer =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--tivonix-header-spacer")
        ) || 92;
    };

    const apply = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const scrollInTrack = scrollY - trackTop;
      const rectTop = sectionRef.current?.getBoundingClientRect().top ?? trackTop - scrollY;
      const expand = reducedMotion
        ? 1
        : processShellExpand(
            rectTop,
            scrollInTrack,
            viewport,
            headerSpacer,
            scrollable,
            approachPx
          );

      const pinScroll = Math.max(0, scrollInTrack - approachPx);
      const progress = reducedMotion ? 1 : clamp01(pinScroll / pinScrollable);
      const stepIndex = Math.min(stepCount - 1, Math.floor(progress * stepCount));
      const segment = progress * stepCount - stepIndex;
      const isMobile = window.innerWidth < 1024;

      if (expand !== lastExpand) {
        lastExpand = expand;
        track.style.setProperty("--process-expand", String(expand));
      }

      const warmOpacity = isMobile
        ? smoothstep((stepIndex + 0.55) / stepCount)
        : smoothstep(progress);
      const { fade, localProgress } = reducedMotion
        ? { fade: 1, localProgress: 1 }
        : stepSegmentPhase(segment);

      if (stepIndex !== lastStep) {
        lastStep = stepIndex;
        setActiveStep(stepIndex);
      }

      setStepProgress(localProgress);
      setStepFade(fade);

      if (warmBgRef.current) {
        warmBgRef.current.style.opacity = String(warmOpacity);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, stepCount]);

  const currentStep = steps[activeStep];

  return (
    <div
      ref={pinWrapRef}
      className="process-pin scroll-mt-[var(--tivonix-header-spacer)]"
      style={{
        height: `${totalHeightVh}vh`,
        ["--process-expand" as string]: "0",
      }}
    >
      <section
        ref={sectionRef}
        id="process"
        className="process-section sticky top-0 z-30 flex h-[100svh] flex-col"
        aria-label={copy.process.title}
      >
        <div className="process-section-shell flex min-h-0 flex-1 flex-col">
          <div className="process-section__frame flex min-h-0 flex-1 flex-col overflow-hidden">
            <div
              className="process-section__bg process-section__bg--muted"
              style={{ backgroundImage: `url("${PROCESS_BG_MUTED}")` }}
              aria-hidden
            />
            <div
              ref={warmBgRef}
              className="process-section__bg process-section__bg--warm"
              style={{ backgroundImage: `url("${PROCESS_BG_WARM}")`, opacity: 0 }}
              aria-hidden
            />
            <div className="process-section__bg-fade" aria-hidden />

            <Container className="process-section__container relative z-10 flex min-h-0 flex-1 flex-col">
              <header className="process-section__head">
                <h2 className="font-hero text-[clamp(1.85rem,4.2vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                  {copy.process.title}
                </h2>
              </header>

              <div className="process-section__stage">
                {currentStep ? (
                  <ProcessStepStage
                    key={activeStep}
                    step={currentStep}
                    stepProgress={stepProgress}
                    fade={stepFade}
                    reducedMotion={reducedMotion}
                  />
                ) : null}
              </div>

              <div className="process-section__tabs-wrap">
                <PillActionBar
                  items={tabs}
                  activeId={`step-${activeStep}`}
                  onActiveChange={(id) => {
                    const index = Number(id.replace("step-", ""));
                    if (!Number.isNaN(index)) scrollToStep(index);
                  }}
                  ariaLabel={copy.process.title}
                  className="process-section__tabs"
                />
              </div>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
}
