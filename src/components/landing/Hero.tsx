import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { HERO_SCROLL_HEADLINE_CLASS, HERO_SCROLL_LEAD_CLASS } from "../../lib/landingLayout";
import LangToggle from "./LangToggle";

const HERO_IMAGES = [
  "/images/hero-stage-1.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-3.webp",
] as const;

const SCROLL_TRACK_VH = 240;

type HeroScrollStage = {
  headline: string;
  lead: string;
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

function imageOpacities(progress: number): [number, number, number] {
  if (progress <= 0.5) {
    const t = smoothstep(progress / 0.5);
    return [1 - t, t, 0];
  }
  const t = smoothstep((progress - 0.5) / 0.5);
  return [0, 1 - t, t];
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

    const onResize = () => {
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

function HeroCard({
  progress,
  stages,
  isRu,
}: {
  progress: number;
  stages: ReadonlyArray<HeroScrollStage>;
  isRu: boolean;
}) {
  const imageOpacity = useMemo(() => imageOpacities(progress), [progress]);
  const textOpacity = useMemo(() => textOpacities(progress), [progress]);
  const activeStage = textOpacity[2] > 0.5 ? 2 : textOpacity[1] > 0.5 ? 1 : 0;

  const scrollDown = () => {
    const next = document.getElementById("pain");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
  };

  return (
    <div
      className={cx(
        "relative isolate h-full min-h-0 flex-1 overflow-hidden rounded-[28px] lg:rounded-[32px]"
      )}
    >
      {HERO_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={cx(
            "pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_92%] sm:object-[center_94%]",
            i === 0 && "brightness-[0.92]"
          )}
          style={{ opacity: imageOpacity[i] } as CSSProperties}
          decoding="async"
          fetchPriority={i === 0 ? "high" : "low"}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/16"
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex flex-col px-6 pt-[calc(4.875rem+0.5rem)] sm:px-10 sm:pt-[calc(var(--tivonix-header-spacer)+2rem)] lg:px-14">
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="relative w-full max-w-[52rem]">
            <div className="relative grid w-full justify-items-center">
              {stages.map((stage, i) => {
                const opacity = textOpacity[i];
                return (
                  <div
                    key={stage.headline}
                    className="hero-stage-copy col-start-1 row-start-1 flex w-full max-w-[52rem] flex-col items-center justify-center text-center"
                    style={
                      {
                        opacity,
                        visibility: opacity < 0.04 ? "hidden" : "visible",
                      } as CSSProperties
                    }
                    aria-hidden={i !== activeStage}
                  >
                    <h1 className={cx(HERO_SCROLL_HEADLINE_CLASS, "mx-auto w-full text-center")}>
                      {stage.headline}
                    </h1>
                    <p className={cx(HERO_SCROLL_LEAD_CLASS, "mx-auto w-full max-w-[34rem] text-center")}>
                      {stage.lead}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pointer-events-auto flex shrink-0 flex-col items-center gap-3 pb-5 sm:pb-7 lg:pb-8">
          <LangToggle variant="hero" />
          <button
            type="button"
            onClick={scrollDown}
            className={cx(
              "hero-scroll-hint grid h-10 w-10 place-items-center rounded-full border-0 sm:hidden",
              "bg-white/[0.08] text-white/75 transition hover:bg-white/[0.12] hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
            )}
            aria-label={isRu ? "Прокрутить вниз" : "Scroll down"}
          >
            <ChevronDown size={22} strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useHeroScrollProgress(trackRef);
  const { lang } = useLang();
  const isRu = lang === "ru";
  const copy = landingCopy(lang);
  const stages = copy.hero.scrollStages as ReadonlyArray<HeroScrollStage>;

  return (
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `${SCROLL_TRACK_VH}vh` } as CSSProperties}
    >
      <Section
        className={cx(
          "sticky top-0 z-[1] isolate overflow-hidden bg-transparent !py-0",
          "min-h-[100dvh] pb-0"
        )}
      >
        <div
          className={cx(
            "mx-auto flex h-[calc(100dvh-1.25rem)] min-h-0 w-full max-w-none flex-col",
            "px-3 pt-2.5 pb-2.5",
            "sm:max-w-[min(98vw,1840px)] sm:px-3",
            "lg:px-4 lg:pt-3 lg:pb-3"
          )}
        >
          <HeroCard progress={progress} stages={stages} isRu={isRu} />
        </div>
      </Section>
    </div>
  );
}
