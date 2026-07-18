import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Section from "../ui/Section";
import ScrollFingerHint from "../ui/ScrollFingerHint";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { leadFormCopy } from "../../i18n/leadFormCopy";
import { HERO_SCROLL_HEADLINE_CLASS, HERO_SCROLL_LEAD_CLASS } from "../../lib/landingLayout";
import { isTelegramWebView } from "../../lib/telegramWebView";
import { LeadCTAButton } from "../leads/LeadCTAButton";

const HERO_IMAGES = [
  "/images/hero-stage-1.webp",
  "/images/hero-stage-2.webp",
  "/images/hero-stage-3.webp",
] as const;

/** Use svh — dvh resizes mid-scroll in TG / mobile chrome and jumps sticky tracks */
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
  ctaLabel,
}: {
  progress: number;
  stages: ReadonlyArray<HeroScrollStage>;
  isRu: boolean;
  ctaLabel: string;
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
        "relative isolate h-full min-h-0 flex-1 overflow-visible rounded-[28px] bg-black lg:rounded-[32px]"
      )}
    >
      {/* Обрезка только у фото — иначе blur радужной кнопки даёт яркую полосу по нижнему краю */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-black">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={cx(
              /* Чуть больше контейнера — убирает белый fringe снизу/справа от border-radius */
              "absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] max-w-none object-cover object-[center_92%] sm:object-[center_94%]",
              i === 0 && "brightness-[0.92]"
            )}
            style={{ opacity: imageOpacity[i] } as CSSProperties}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-black/40"
          aria-hidden
        />
        {/* Перекрывает светлый antialias-край фото снизу и справа */}
        <div
          className="absolute inset-0 shadow-[inset_0_-3px_0_0_#000,inset_-3px_0_0_0_#000]"
          aria-hidden
        />
      </div>

      {/* media overlays only */}
      <div className="absolute inset-0 z-10 flex flex-col px-6 pt-[calc(4.875rem+0.5rem)] sm:px-10 sm:pt-[calc(var(--tivonix-header-spacer)+2rem)] lg:px-14">
        {/* Текст выше по центру — не едет вниз вместе с кнопкой */}
        <div className="pointer-events-none absolute inset-x-6 top-[min(42%,18rem)] -translate-y-1/2 sm:inset-x-10 lg:inset-x-14">
          <div className="relative mx-auto w-full max-w-[52rem]">
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

        <div className="pointer-events-auto relative z-20 mt-auto flex shrink-0 flex-col items-center gap-2 pb-1 sm:gap-2.5 sm:pb-1.5 lg:pb-2">
          <span className="hero-cta-rainbow">
            <LeadCTAButton
              source="hero"
              variant="white"
              size="lg"
              className="hero-cta-rainbow__btn min-w-[220px]"
            >
              {ctaLabel}
            </LeadCTAButton>
          </span>
          <ScrollFingerHint
            bare
            visible={progress < 0.35}
            variant="light"
            label={isRu ? "Листайте вниз" : "Scroll down"}
            onActivate={scrollDown}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
          />
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
  const leadCopy = leadFormCopy(lang);
  const stages = copy.hero.scrollStages as ReadonlyArray<HeroScrollStage>;
  const [tgWebView, setTgWebView] = useState(false);

  useEffect(() => {
    setTgWebView(isTelegramWebView());
  }, []);

  // Telegram in-app browser: no sticky multi-screen scrub — chrome resize causes jump loops
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
          <HeroCard
            progress={1}
            stages={stages}
            isRu={isRu}
            ctaLabel={leadCopy.ctaDiscuss}
          />
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
          <HeroCard
            progress={progress}
            stages={stages}
            isRu={isRu}
            ctaLabel={leadCopy.ctaDiscuss}
          />
        </div>
      </Section>
    </div>
  );
}
