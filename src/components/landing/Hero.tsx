import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { HERO_SCROLL_HEADLINE_CLASS, LANDING_SHELL_CLASS } from "../../lib/landingLayout";
import { isTelegramWebView } from "../../lib/telegramWebView";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";

const HERO_VIDEO = "/images/hero-bg.mp4";
const HERO_POSTER = "/images/hero-bg-poster.webp";

/** Use svh — dvh resizes mid-scroll in TG / mobile chrome and jumps sticky tracks */
const SCROLL_TRACK_VH = 240;

type HeroScrollStage = {
  headline: string;
  lead: string;
  headlineLines?: string[];
  headlineBefore?: string;
  headlineAccent?: string;
  headlineAfter?: string;
};

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function textOpacities(progress: number): [number, number, number] {
  const stage = progress * 3;
  const i = Math.min(2, Math.floor(stage));
  const local = stage - i;
  const hold = 0.72;
  const op: [number, number, number] = [0, 0, 0];

  if (local < hold) {
    op[i] = 1;
    return op;
  }

  if (i >= 2) {
    op[2] = 1;
    return op;
  }

  const t = smoothstep((local - hold) / (1 - hold));
  op[i] = 1 - t;
  if (i < 2) op[i + 1] = t;
  return op;
}

function useHeroScrollProgress(trackRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    let trackTop = 0;
    let scrollable = 1;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      trackTop = window.scrollY + rect.top;
      scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
    };

    const update = () => {
      raf = 0;
      setProgress(clamp01((window.scrollY - trackTop) / scrollable));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let lastH = window.innerHeight;
    const onResize = () => {
      const h = window.innerHeight;
      // Ignore tiny mobile-chrome resizes that nudge sticky math by ~10–30px
      if (Math.abs(h - lastH) < 48) return;
      lastH = h;
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackRef]);

  return progress;
}

function HeroHeadline({ stage }: { stage: HeroScrollStage }) {
  const lines =
    stage.headlineLines && stage.headlineLines.length > 0
      ? stage.headlineLines
      : [stage.headline];

  return (
    <h1 className={cx(HERO_SCROLL_HEADLINE_CLASS, "hero-scroll-headline mx-auto text-center")}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="hero-scroll-headline__line block">
          {line}
        </span>
      ))}
    </h1>
  );
}

function HeroCard({
  progress,
  stages,
}: {
  progress: number;
  stages: ReadonlyArray<HeroScrollStage>;
}) {
  const textOpacity = useMemo(() => textOpacities(progress), [progress]);
  const activeStage = textOpacity[2] > 0.5 ? 2 : textOpacity[1] > 0.5 ? 1 : 0;
  const videoRef = useRef<HTMLVideoElement>(null);
  useKeepVideoPlaying(videoRef);

  return (
    <div
      className={cx(
        "relative isolate h-full min-h-0 flex-1 overflow-visible rounded-[40px] bg-black"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-black">
        <video
          ref={videoRef}
          className="absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover object-center"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 shadow-[inset_0_-3px_0_0_#000,inset_-3px_0_0_0_#000]"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[calc(4.875rem+0.5rem)] pb-6 sm:pt-[calc(var(--tivonix-header-spacer)+1.5rem)]">
        <div
          className={cx(
            LANDING_SHELL_CLASS,
            "pointer-events-none relative flex w-full flex-1 flex-col items-center justify-center"
          )}
        >
          <div className="relative grid w-full justify-items-center">
            {stages.map((stage, i) => {
              const opacity = textOpacity[i];
              return (
                <div
                  key={stage.headline}
                  className="hero-stage-copy col-start-1 row-start-1 flex w-full flex-col items-center justify-center text-center"
                  style={
                    {
                      opacity,
                      visibility: opacity < 0.04 ? "hidden" : "visible",
                    } as CSSProperties
                  }
                  aria-hidden={i !== activeStage}
                >
                  <HeroHeadline stage={stage} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useHeroScrollProgress(trackRef);
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const stages = copy.hero.scrollStages as ReadonlyArray<HeroScrollStage>;
  const [tgWebView, setTgWebView] = useState(false);

  useEffect(() => {
    setTgWebView(isTelegramWebView());
  }, []);

  const cardProps = {
    stages,
  };

  if (tgWebView) {
    return (
      <Section
        className={cx(
          "relative z-[1] isolate overflow-hidden bg-transparent !py-0",
          "min-h-[100svh] pb-0"
        )}
      >
        <div
          className={cx(
            "mx-auto flex h-[calc(100svh-1.25rem)] min-h-0 w-full max-w-none flex-col",
            "px-3 pt-2.5 pb-2.5",
            "sm:max-w-[min(98vw,1840px)] sm:px-3",
            "lg:px-4 lg:pt-3 lg:pb-3"
          )}
        >
          <HeroCard progress={1} {...cardProps} />
        </div>
      </Section>
    );
  }

  return (
    <div
      ref={trackRef}
      className="hero-scroll-track relative"
      style={{ height: `${SCROLL_TRACK_VH}svh` } as CSSProperties}
    >
      <Section
        className={cx(
          "hero-scroll-sticky sticky top-0 z-[1] isolate overflow-hidden bg-transparent !py-0",
          "min-h-[100svh] pb-0"
        )}
      >
        <div
          className={cx(
            "mx-auto flex h-[calc(100svh-1.25rem)] min-h-0 w-full max-w-none flex-col",
            "px-3 pt-2.5 pb-2.5",
            "sm:max-w-[min(98vw,1840px)] sm:px-3",
            "lg:px-4 lg:pt-3 lg:pb-3"
          )}
        >
          <HeroCard progress={progress} {...cardProps} />
        </div>
      </Section>
    </div>
  );
}
