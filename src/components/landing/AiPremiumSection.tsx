import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import {
  AI_MODELS,
  AI_MODEL_COUNT,
  ORBIT_RX_MOBILE,
  ORBIT_RY_MOBILE,
  ORBIT_RX_PHONE,
  ORBIT_RY_PHONE,
  ROW_BLOCK_REF,
  ROW_BLOCK_REF_TABLET,
  ROW_OVERLAP,
  ROW_OVERLAP_TABLET,
  ROW_STEP_PHONE,
  ROW_STRIP_LEADING_PHONE,
  ROW_Y_PHONE,
  ROW_Y_MOBILE,
  orbitPosition,
  rowPosition,
  rowPositionScrollStrip,
} from "../../lib/aiModels";
import { isTelegramWebView } from "../../lib/telegramWebView";
import { getStableViewportHeight } from "../../lib/stableViewport";
import TivonixGlowBorder from "../ui/TivonixGlowBorder";
import ScrollFingerHint from "../ui/ScrollFingerHint";

const ANIM_PIN_VH = 235;
const DRIFT_RUNWAY_VH = 32;
const TIVONIX_LOGO = "/images/logo-black.webp";
const AI_SECTION_BG = "/images/foooa.webp";
const DROP_START = 0.68;
const DROP_END = 0.88;
const STRIP_DROP_THRESHOLD = 0.94;
const STRIP_FADE_SPAN = 0.06;
const ORBIT_START = 0.14;
const ORBIT_REVEAL_END = 0.46;
const HUB_START = 0.36;
const TYPE_START = 0.895;
const TYPE_END = 1;
const AI_MARK_PHASE_END = 0.18;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function logoReveal(progress: number, index: number) {
  const orbitSpan = ORBIT_REVEAL_END - ORBIT_START;
  const segment = orbitSpan / AI_MODEL_COUNT;
  const start = ORBIT_START + index * segment;
  return smoothstep((progress - start) / (segment * 0.72));
}

function aiMarkOpacity(progress: number, approach: number) {
  if (progress >= ORBIT_START - 0.02) return 0;
  const fadeIn = Math.max(smoothstep(progress / 0.04), approach);
  const fadeOut = 1 - smoothstep((progress - 0.1) / (AI_MARK_PHASE_END - 0.1));
  return fadeIn * fadeOut;
}

function sectionApproach(rectTop: number, viewport: number, headerSpacer: number) {
  return smoothstep((viewport * 0.88 - rectTop) / (viewport * 0.88 - headerSpacer));
}

function aiShellExpand(
  rectTop: number,
  scrollInTrack: number,
  viewport: number,
  headerSpacer: number,
  scrollable: number,
  tailPx: number
) {
  let expand = 0;

  if (rectTop < viewport * 0.92) {
    expand = sectionApproach(rectTop, viewport, headerSpacer);
  } else if (scrollInTrack > 0) {
    expand = 1;
  }

  const tailStart = scrollable - tailPx * 0.9;
  if (scrollInTrack > tailStart) {
    expand *= 1 - smoothstep((scrollInTrack - tailStart) / Math.max(1, tailPx * 0.9));
  }

  return expand;
}

function hubReveal(progress: number) {
  return smoothstep((progress - HUB_START) / 0.1);
}

function rowReady(drop: number) {
  return smoothstep(clamp01((drop - 0.94) / 0.06));
}

function typewriterLength(progress: number, length: number, drop: number) {
  const ready = rowReady(drop);
  if (ready <= 0) return 0;
  const t = smoothstep((progress - TYPE_START) / (TYPE_END - TYPE_START)) * ready;
  return Math.floor(t * length);
}

function textReveal(progress: number, drop: number) {
  const ready = rowReady(drop);
  if (ready <= 0) return 0;
  return smoothstep((progress - (TYPE_START - 0.01)) / 0.04) * ready;
}

function hubContentFade(drift: number) {
  return smoothstep((drift - 0.32) / 0.52);
}

function dropToBlocks(progress: number) {
  if (progress < DROP_START) return 0;
  return smoothstep((progress - DROP_START) / (DROP_END - DROP_START));
}

function rowExitScroll(drift: number) {
  return smoothstep(drift);
}

function phoneLogoScale(modelId: string, scale: number) {
  if (modelId === "grok") return 1.6;
  if (modelId === "mistral") return 1.06;
  return Math.min(scale, 1.32);
}

function mobileLogoScale(modelId: string, scale: number, phone: boolean) {
  if (phone) return phoneLogoScale(modelId, scale);
  return Math.min(scale, 1.4);
}

export default function AiPremiumSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const isRu = lang === "ru";
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const animPinRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const aiMarkRef = useRef<HTMLDivElement>(null);
  const phoneStripRef = useRef<HTMLDivElement>(null);
  const rowItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockSlotRefs = useRef<(HTMLElement | null)[]>([]);
  const logoImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const reducedMotionPref = usePrefersReducedMotion();
  const [tgWebView, setTgWebView] = useState(false);
  useEffect(() => {
    setTgWebView(isTelegramWebView());
  }, []);
  // Telegram WebView: same end-state as reduced motion, without multi-vh sticky pin
  const reducedMotion = reducedMotionPref || tgWebView;
  const headline = copy.ai.headline;
  const [showScrollHint, setShowScrollHint] = useState(false);
  const showHintRef = useRef(false);

  useEffect(() => {
    const track = pinWrapRef.current;
    const animPin = animPinRef.current;
    if (!track || !animPin || typeof window === "undefined") return;

    let raf = 0;
    let trackTop = 0;
    let animPinHeight = 0;
    let trackHeight = 0;
    let animScrollable = 1;
    let driftScrollable = 1;
    let headerSpacer = 92;
    let tailPx = 1;
    let lastScrollY = -1;
    let lastTypedChars = -1;
    let lastExpand = -1;
    let lastAuroraStrength = -1;
    let lastAiMarkOpacity = -1;
    let smoothExitScroll = 0;
    const logoFrame = AI_MODELS.map(() => ({
      left: "",
      top: "",
      opacity: "",
      transform: "",
      zIndex: "",
      blockOpacity: "",
      inOrbit: true,
      logoScale: "",
      imgOpacity: "",
      rowMode: false,
    }));

    const measure = () => {
      const rect = track.getBoundingClientRect();
      trackTop = window.scrollY + rect.top;
      animPinHeight = animPin.offsetHeight;
      trackHeight = track.offsetHeight;
      animScrollable = Math.max(1, animPinHeight - getStableViewportHeight());
      driftScrollable = Math.max(1, trackHeight - animPinHeight);
      tailPx = (DRIFT_RUNWAY_VH / 100) * getStableViewportHeight();
      headerSpacer =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--tivonix-header-spacer")
        ) || 92;
    };

    const applyFrame = () => {
      const scrollY = window.scrollY;
      const viewport = getStableViewportHeight();
      const scrollInTrack = scrollY - trackTop;
      if (scrollInTrack < -viewport || scrollInTrack > trackHeight + viewport) {
        if (showHintRef.current) {
          showHintRef.current = false;
          setShowScrollHint(false);
        }
        return false;
      }

      const rectTop = sectionRef.current?.getBoundingClientRect().top ?? trackTop - scrollY;
      const scrollable = Math.max(1, trackHeight - viewport);
      const pinProgress = reducedMotion
        ? tgWebView || scrollInTrack > animScrollable * 0.2
          ? 1
          : 0
        : clamp01(scrollInTrack / animScrollable);
      const drift = reducedMotion
        ? 0
        : clamp01((scrollInTrack - animScrollable) / driftScrollable);
      const isEntered = rectTop < viewport * 0.85;
      const approach =
        rectTop < viewport * 0.92
          ? sectionApproach(rectTop, viewport, headerSpacer)
          : scrollInTrack > 0
            ? 1
            : 0;
      const progress = pinProgress;

      const expand = reducedMotion
        ? 1
        : aiShellExpand(rectTop, scrollInTrack, viewport, headerSpacer, scrollable, tailPx);
      const hub = hubReveal(progress);
      const drop = dropToBlocks(progress);
      const typedChars = typewriterLength(progress, headline.length, drop);
      const aiMarkIn = aiMarkOpacity(progress, approach);
      const hubFade = hubContentFade(drift);
      const textOpacity = textReveal(progress, drop) * (1 - hubFade);
      const hubOpacity = hub * (1 - hubFade);
      const targetExitScroll = rowExitScroll(drift);
      // Snap when idle — continued easing after scroll stop made logos drift and felt like a page jump
      const isScrolling = scrollY !== lastScrollY;
      const smoothRate = reducedMotion || !isScrolling ? 1 : 0.18;
      smoothExitScroll += (targetExitScroll - smoothExitScroll) * smoothRate;
      const exitScroll = smoothExitScroll;
      const auroraStrength = 1;
      const inAnimPin = scrollInTrack >= 0 && scrollInTrack < animScrollable;
      const isPinned = inAnimPin && rectTop <= 0;

      // Finger cue while the AI story is pinned and animation hasn't taken over yet
      const nextHint =
        !reducedMotion && inAnimPin && rectTop <= 48 && progress < 0.28;
      if (nextHint !== showHintRef.current) {
        showHintRef.current = nextHint;
        // Avoid React setState while idle-smoothing — it re-rendered the sticky pin
        if (isScrolling || !nextHint) {
          setShowScrollHint(nextHint);
        }
      }

      lastScrollY = scrollY;

      if (expand !== lastExpand) {
        lastExpand = expand;
        pinWrapRef.current?.style.setProperty("--ai-expand", String(expand));
      }

      if (auroraStrength !== lastAuroraStrength) {
        lastAuroraStrength = auroraStrength;
        frameRef.current?.style.setProperty("--ai-aurora-fade", String(auroraStrength));
      }

      const phoneLayout = viewport < 640;
      const tabletLayout = viewport >= 640 && viewport < 1024;
      const desktopLayout = viewport >= 1024;
      const compactLayout = viewport < 1024;

      const frameEl = frameRef.current;
      if (frameEl) {
        frameEl.classList.toggle("ai-premium-frame--live", isEntered);
        frameEl.classList.toggle("ai-premium-frame--desktop", desktopLayout);
        frameEl.classList.toggle(
          "ai-premium-frame--orbit",
          inAnimPin &&
            progress > ORBIT_START - 0.06 &&
            (desktopLayout || drop < 0.35)
        );
      }

      pinWrapRef.current?.classList.toggle("ai-premium-pin--active", inAnimPin && progress > 0.02);

      const sectionEl = sectionRef.current;
      if (sectionEl) {
        sectionEl.classList.toggle("ai-premium-section--pinned", isPinned);
        sectionEl.classList.toggle("ai-premium-section--drift", drift > 0.01);
      }
      const orbitRx = phoneLayout ? ORBIT_RX_PHONE : tabletLayout ? ORBIT_RX_MOBILE : 33;
      const orbitRy = phoneLayout ? ORBIT_RY_PHONE : tabletLayout ? ORBIT_RY_MOBILE : 31;
      const stageEl = rowItemRefs.current[0]?.closest(".ai-premium-orbit-stage");
      const stageW = stageEl?.clientWidth ?? viewport;
      const mobileStripStep = ROW_STEP_PHONE;
      const mobileStripLeading = ROW_STRIP_LEADING_PHONE;
      const mobileStripWidth = mobileStripLeading + mobileStripStep * AI_MODEL_COUNT;
      const mobileDriftMax = Math.max(
        mobileStripWidth - stageW + mobileStripStep * 0.6,
        mobileStripStep * 2
      );
      const mobileStripReveal =
        phoneLayout && drop > 0.68 ? smoothstep((drop - 0.68) / 0.25) : 0;
      const mobileStripProgress = mobileStripReveal * (1 - exitScroll);
      const stripActive = compactLayout && drop >= STRIP_DROP_THRESHOLD;
      const stripFadeIn = stripActive
        ? smoothstep((drop - STRIP_DROP_THRESHOLD) / STRIP_FADE_SPAN)
        : 0;
      const driftPxBase = exitScroll * Math.max(viewport * 0.72, 480);
      const driftPx =
        phoneLayout && !stripActive ? -mobileStripProgress * mobileDriftMax : driftPxBase;

      const orbitBlend = 1 - smoothstep(drop / 0.24);
      const inOrbitPhase = orbitBlend > 0.04;
      const orbitBlocksIn =
        progress < ORBIT_START ? 0 : smoothstep((progress - ORBIT_START) / 0.07);
      const logoExitFade = phoneLayout
        ? smoothstep((exitScroll - 0.9) / 0.1)
        : smoothstep((exitScroll - 0.28) / 0.72);

      if (stageEl instanceof HTMLElement) {
        stageEl.classList.toggle("ai-premium-orbit-stage--strip-active", stripActive);
      }

      const phoneStrip = phoneStripRef.current;
      if (phoneStrip) {
        const stripFade = stripActive ? stripFadeIn * (1 - logoExitFade) : 0;
        phoneStrip.style.opacity = String(stripFade);
        phoneStrip.style.visibility = stripFade > 0.01 ? "visible" : "hidden";
        phoneStrip.style.pointerEvents =
          stripActive && stripFade > 0.92 && progress > 0.96 ? "auto" : "none";
        phoneStrip.setAttribute("aria-hidden", stripActive ? "false" : "true");

        if (stripActive) {
          const maxScroll = Math.max(0, phoneStrip.scrollWidth - phoneStrip.clientWidth);
          const animSettled = smoothstep((progress - 0.97) / 0.03);
          const scrollT = clamp01(animSettled * 0.15 + exitScroll * 0.85);
          const targetScroll = scrollT * maxScroll;
          if (Math.abs(phoneStrip.scrollLeft - targetScroll) > 0.5) {
            phoneStrip.scrollLeft = targetScroll;
          }
        } else if (phoneStrip.scrollLeft !== 0) {
          phoneStrip.scrollLeft = 0;
        }
      }

      frameRef.current?.classList.toggle("ai-premium-frame--phone-scroll", stripActive);

      const hubEl = hubRef.current;
      if (hubEl) {
        const hubTop = phoneLayout
          ? lerp(46, 36, drop)
          : tabletLayout
            ? lerp(48, 40, drop)
            : lerp(50, 42, drop);
        hubEl.style.top = `${hubTop}%`;
        hubEl.style.opacity = String(hubOpacity);
        hubEl.style.transform = `translate3d(-50%, -50%, 0) scale(${0.84 + hub * 0.16 - drop * 0.08})`;
      }

      if (lastAiMarkOpacity !== aiMarkIn) {
        lastAiMarkOpacity = aiMarkIn;
        const aiMark = aiMarkRef.current;
        if (aiMark) {
          aiMark.style.opacity = String(aiMarkIn);
          aiMark.style.transform = `translate3d(-50%, -50%, 0) scale(${0.92 + aiMarkIn * 0.08})`;
          aiMark.style.pointerEvents = aiMarkIn > 0.04 ? "auto" : "none";
        }
      }

      const textWrap = textWrapRef.current;
      if (textWrap) {
        textWrap.style.opacity = String(textOpacity);
        textWrap.style.transform = `translate3d(0, ${(1 - textOpacity) * 10}px, 0)`;
      }

      if (typedChars !== lastTypedChars && headlineRef.current) {
        lastTypedChars = typedChars;
        headlineRef.current.textContent = headline.slice(0, typedChars);
      }

      if (cursorRef.current) {
        const showCursor =
          typedChars < headline.length && textOpacity > 0.15 && drop > 0.93;
        cursorRef.current.style.display = showCursor ? "inline-block" : "none";
      }

      AI_MODELS.forEach((model, index) => {
        const el = rowItemRefs.current[index];
        if (!el) return;

        if (stripActive) {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
          return;
        }

        const { x: orbitX, y: orbitY } = orbitPosition(index, AI_MODEL_COUNT, orbitRx, orbitRy);
        const rowPos = phoneLayout
          ? rowPositionScrollStrip(
              index,
              mobileStripStep,
              stageW,
              ROW_Y_PHONE,
              mobileStripLeading
            )
          : tabletLayout
            ? rowPosition(
                index,
                AI_MODEL_COUNT,
                ROW_BLOCK_REF_TABLET,
                ROW_OVERLAP_TABLET,
                ROW_Y_MOBILE
              )
            : rowPosition(index, AI_MODEL_COUNT, ROW_BLOCK_REF, ROW_OVERLAP);

        const reveal = logoReveal(progress, index);
        const x = lerp(orbitX, rowPos.rowX, drop);
        const y = lerp(orbitY, rowPos.rowY, drop);
        const orbitScale = 0.94 + reveal * 0.06;
        const itemScale = lerp(orbitScale, 1, drop);
        const rowOpacity = smoothstep(drop);
        const baseOpacity =
          drop < 0.02
            ? Math.max(reveal, orbitBlocksIn)
            : Math.max(reveal * (1 - drop * 0.35), rowOpacity);
        const itemOpacity = String(baseOpacity * (1 - logoExitFade));
        const tabletScaleTarget = Math.min(model.scale, 1.4);
        const phoneScaleTarget = mobileLogoScale(model.id, model.scale, true);
        const logoScale = phoneLayout
          ? lerp(phoneScaleTarget * 0.97, phoneScaleTarget, 1 - orbitBlend)
          : tabletLayout
            ? lerp(tabletScaleTarget * 0.97, tabletScaleTarget, 1 - orbitBlend)
            : lerp(model.scale * 0.96, model.scale, 1 - orbitBlend);
        const imgOpacity = inOrbitPhase ? String(reveal * orbitBlend + (1 - orbitBlend)) : "1";
        const inRowLayout = drop > 0.68;

        const left = `${x}%`;
        const top = `${y}%`;
        const opacity = itemOpacity;
        const zIndex = inRowLayout ? String(12 + index) : inOrbitPhase ? "15" : "10";
        const transform = `translate3d(calc(-50% + ${driftPx}px), -50%, 0) scale(${itemScale})`;
        const blockOpacity = inOrbitPhase ? "1" : String(rowOpacity);
        const scaleStr = String(logoScale);
        const state = logoFrame[index];

        if (state.left !== left) {
          state.left = left;
          el.style.left = left;
        }
        if (state.top !== top) {
          state.top = top;
          el.style.top = top;
        }
        if (state.opacity !== opacity) {
          state.opacity = opacity;
          el.style.opacity = opacity;
        }
        el.style.visibility = "";
        el.style.pointerEvents = "";
        if (state.zIndex !== zIndex) {
          state.zIndex = zIndex;
          el.style.zIndex = zIndex;
        }
        if (state.transform !== transform) {
          state.transform = transform;
          el.style.transform = transform;
        }
        if (state.rowMode !== inRowLayout) {
          state.rowMode = inRowLayout;
          el.classList.toggle("ai-logo-row-item--row", inRowLayout);
        }

        const blockSlot = blockSlotRefs.current[index];
        if (blockSlot && state.blockOpacity !== blockOpacity) {
          state.blockOpacity = blockOpacity;
          blockSlot.style.opacity = blockOpacity;
        }

        const img = logoImgRefs.current[index];
        if (img && state.logoScale !== scaleStr) {
          state.logoScale = scaleStr;
          img.style.setProperty("--ai-logo-scale", scaleStr);
        }
        if (img && state.imgOpacity !== imgOpacity) {
          state.imgOpacity = imgOpacity;
          img.style.opacity = imgOpacity;
        }
      });

      return isScrolling && Math.abs(smoothExitScroll - targetExitScroll) > 0.0015;
    };

    const update = () => {
      const continueSmoothing = applyFrame();
      raf = continueSmoothing ? requestAnimationFrame(update) : 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 10) return;
      lastW = window.innerWidth;
      lastScrollY = -1;
      smoothExitScroll = 0;
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
  }, [reducedMotion, headline, tgWebView]);

  return (
    <>
      <div
        ref={pinWrapRef}
        className="ai-premium-pin relative"
        style={{
          height: tgWebView
            ? "auto"
            : `calc(${ANIM_PIN_VH}svh + ${DRIFT_RUNWAY_VH}svh)`,
          ["--ai-expand" as string]: tgWebView ? "1" : "0",
        }}
      >
        <div
          ref={animPinRef}
          className="ai-premium-anim-pin relative"
          style={{ height: tgWebView ? "auto" : `${ANIM_PIN_VH}svh` }}
        >
          <section
            ref={sectionRef}
            id="ai"
            className={
              tgWebView
                ? "ai-premium-section relative z-40 flex min-h-[100svh] flex-col"
                : "ai-premium-section relative sticky top-0 z-40 flex h-[100svh] flex-col"
            }
            aria-label={copy.ai.ariaLabel}
          >
            <div
              ref={shellRef}
              className="ai-premium-section-shell relative mx-auto flex min-h-0 w-full flex-1 flex-col"
            >
              <TivonixGlowBorder className="ai-premium-border-stage flex min-h-0 w-full flex-1 flex-col">
                <div
                  ref={frameRef}
                  className="ai-premium-frame relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[inherit]"
                  style={{ ["--ai-aurora-fade" as string]: "1" }}
                >
                  <div className="ai-premium-bg" aria-hidden>
                    <div
                      className="ai-premium-bg-image"
                      style={{ backgroundImage: `url("${AI_SECTION_BG}")` }}
                    />
                  </div>

                  <div className="ai-premium-frame__body relative z-10 flex flex-1 flex-col px-1 py-4 sm:py-6">
                    <div className="relative mx-auto w-full flex-1">
                      <div className="ai-premium-orbit-stage relative mx-auto w-full max-w-full px-2 sm:px-4">
                        <div
                          ref={aiMarkRef}
                          className="ai-premium-ai-mark pointer-events-none absolute left-1/2 top-1/2 z-30"
                          style={{ opacity: 0 }}
                          aria-hidden
                        >
                          <span
                            className={[
                              "ai-premium-ai-mark__text text-[clamp(4.5rem,20vw,10rem)] leading-none",
                              reducedMotion ? "" : "ai-premium-ai-mark__text--animated",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            AI
                          </span>
                        </div>

                        <div
                          ref={hubRef}
                          className="ai-hub absolute left-1/2 z-20 flex flex-col items-center"
                          style={{
                            top: "50%",
                            opacity: 0,
                            transform: "translate3d(-50%, -50%, 0) scale(0.84)",
                          }}
                        >
                          <img
                            src={TIVONIX_LOGO}
                            alt="TIVONIX"
                            className="block h-12 w-auto sm:h-16 lg:h-[5.5rem]"
                            draggable={false}
                          />

                          <div
                            ref={textWrapRef}
                            className="mx-auto mt-4 max-w-[22ch] text-center sm:mt-5 sm:max-w-[26ch]"
                            style={{ opacity: 0 }}
                          >
                            <p
                              className="font-hero text-[clamp(1.35rem,5.2vw,1.95rem)] font-semibold leading-[1.14] tracking-[-0.03em] text-white sm:text-[clamp(1.2rem,2.9vw,1.85rem)]"
                              aria-label={copy.ai.headline}
                            >
                              <span ref={headlineRef} aria-hidden />
                              <span
                                ref={cursorRef}
                                className="ai-type-cursor ml-0.5 inline-block text-[#FF9A3D]"
                                style={{ display: "none" }}
                                aria-hidden
                              >
                                |
                              </span>
                            </p>
                          </div>
                        </div>

                        <div
                          ref={phoneStripRef}
                          className="ai-logo-phone-strip lg:hidden"
                          style={{ opacity: 0 }}
                          aria-hidden
                        >
                          <div className="ai-logo-phone-strip__track">
                            {AI_MODELS.map((model) => (
                              <div key={`phone-${model.id}`} className="ai-logo-phone-strip__item">
                                <img
                                  src={model.src}
                                  alt={model.name}
                                  className={[
                                    "ai-logo-phone-strip__img",
                                    model.brighten ? "ai-logo-img--bright" : "",
                                    model.colorful ? "ai-logo-img--colorful" : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                  draggable={false}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {AI_MODELS.map((model, index) => (
                          <div
                            key={model.id}
                            ref={(el) => {
                              rowItemRefs.current[index] = el;
                            }}
                            className="ai-logo-row-item absolute z-10"
                            style={{ opacity: 0 }}
                          >
                            <div
                              ref={(el) => {
                                blockSlotRefs.current[index] = el;
                              }}
                              className={[
                                "ai-logo-block-slot flex items-center justify-center",
                                "max-sm:!size-[4.5rem] max-sm:!rounded-xl max-sm:!overflow-hidden",
                                "max-sm:bg-white/[0.04]",
                              ].join(" ")}
                            >
                              <img
                                ref={(el) => {
                                  logoImgRefs.current[index] = el;
                                }}
                                src={model.src}
                                alt={model.name}
                                className={[
                                  "ai-logo-img object-contain",
                                  "max-sm:max-h-10 max-sm:max-w-12",
                                  "max-h-[54px] max-w-[100px] sm:max-h-[60px] sm:max-w-[112px] lg:max-h-[64px] lg:max-w-[120px]",
                                  model.brighten ? "ai-logo-img--bright" : "",
                                  model.colorful ? "ai-logo-img--colorful" : "",
                                ].join(" ")}
                                style={{ transform: "scale(var(--ai-logo-scale, 1))" }}
                                draggable={false}
                                loading="eager"
                                decoding="async"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TivonixGlowBorder>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[60] flex justify-center pb-1 sm:bottom-8">
              <ScrollFingerHint
                bare
                visible={showScrollHint && !tgWebView}
                variant="light"
                label={isRu ? "Листайте — появится анимация" : "Scroll — the animation plays"}
                onActivate={() => {
                  window.scrollBy({
                    top: Math.round(window.innerHeight * 0.32),
                    behavior: "smooth",
                  });
                }}
                className="pointer-events-auto"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
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
