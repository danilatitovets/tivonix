import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;
const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

gsap.registerPlugin(ScrollTrigger);

function wrapProgress(value: number) {
  let wrappedValue = value % 1;
  if (wrappedValue < 0) wrappedValue += 1;
  return wrappedValue;
}

function getCircularPosition(
  progress: number,
  radiusX: number,
  radiusY: number,
  angleOffset = 0
) {
  const angle = progress * Math.PI * 2 + angleOffset;
  return {
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value: number) {
  return gsap.utils.clamp(0, 1, gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value));
}

function shapeFocus(strength: number, start = 0.42, power = 2.8) {
  const normalized = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(normalized, power);
}

export interface CircularSplitRollItem {
  id?: string | number;
  title?: string;
  /** Still image (fallback / reduced motion). */
  image?: string;
  /** Preferred: muted scroll-demo video. */
  video?: string;
  poster?: string;
  alt?: string;
}

interface CircularSplitRollCompProps {
  items?: CircularSplitRollItem[];
  className?: string;
  background?: string;
  titleColor?: string;
  sectionHeight?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
  titleSize?: string;
  pinSpacing?: boolean;
  scrub?: number;
  textCenterScale?: number;
  textSideScale?: number;
  textCenterOpacity?: number;
  textSideOpacity?: number;
  imageCenterScale?: number;
  imageSideScale?: number;
  imageCenterOpacity?: number;
  imageSideOpacity?: number;
  textFocusStart?: number;
  textFocusPower?: number;
  imageFocusStart?: number;
  imageFocusPower?: number;
  leftAngleOffset?: number;
  rightAngleOffset?: number;
  focusPhase?: number;
  leftDepthMax?: number;
  rightDepthMax?: number;
  columnSpreadVw?: number;
  columnOffsetPx?: number;
  gridImageClassName?: string;
  gridCardClassName?: string;
  gridTitleClassName?: string;
}

function MediaFill({
  video,
  image,
  poster,
  alt,
  className,
}: {
  video?: string;
  image?: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;
    el.muted = true;
    void el.play().catch(() => {
      /* autoplay policies */
    });
  }, [video]);

  if (video) {
    return (
      <video
        ref={videoRef}
        className={className}
        src={video}
        poster={poster || image}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        controls={false}
        draggable={false}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      src={image || poster}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}

function CircularSplitRollComp({
  items = [],
  className = "",
  background,
  titleColor,
  sectionHeight = 260,
  leftRadiusX = 220,
  leftRadiusY = 220,
  rightRadiusX = 400,
  rightRadiusY = 400,
  imageCardWidth = 190,
  imageCardHeight = 210,
  titleSize = "clamp(28px, 3vw, 56px)",
  pinSpacing = true,
  scrub = 1.2,
  textCenterScale = 1,
  textSideScale = 0.68,
  textCenterOpacity = 1,
  textSideOpacity = 0.18,
  imageCenterScale = 1,
  imageSideScale = 0.58,
  imageCenterOpacity = 1,
  imageSideOpacity = 0.14,
  textFocusStart = 0.42,
  textFocusPower = 2.6,
  imageFocusStart = 0.45,
  imageFocusPower = 3.2,
  leftAngleOffset = Math.PI,
  rightAngleOffset = 0,
  focusPhase = 0.5,
  leftDepthMax = 30,
  rightDepthMax = 40,
  columnSpreadVw = 5,
  columnOffsetPx = 500,
  gridImageClassName = "",
  gridCardClassName = "",
  gridTitleClassName = "",
}: CircularSplitRollCompProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  const safeItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.id ?? index,
        title: item.title ?? `Item ${index + 1}`,
        image: item.image ?? item.poster ?? "",
        video: item.video,
        poster: item.poster ?? item.image ?? "",
        alt: item.alt ?? item.title ?? `Item ${index + 1}`,
      })),
    [items]
  );

  useEffect(() => {
    if (!rootRef.current || !stickyRef.current || typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const leftNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__left-item"
        ) as HTMLElement[];
        const rightNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__right-item"
        ) as HTMLElement[];

        const total = safeItems.length;
        if (!total) return;

        gsap.set([...leftNodes, ...rightNodes], { opacity: 1 });

        const render = (scrollProgress: number) => {
          progressRef.current = scrollProgress;
          const width = window.innerWidth;
          let factor = 1;
          if (width < DESKTOP_WIDTH && width >= TABLET_MIN_WIDTH) {
            factor = width / DESKTOP_WIDTH;
          }

          const leftRadiusScaledX = leftRadiusX * factor;
          const leftRadiusScaledY = leftRadiusY * factor;
          const rightRadiusScaledX = rightRadiusX * factor;
          const rightRadiusScaledY = rightRadiusY * factor;

          if (rootRef.current) {
            rootRef.current.style.setProperty(
              "--css-card-width",
              `${imageCardWidth * factor}px`
            );
            rootRef.current.style.setProperty(
              "--css-card-height",
              `${imageCardHeight * factor}px`
            );
          }

          leftNodes.forEach((node, index) => {
            const localProgress = wrapProgress(
              index / total - scrollProgress + focusPhase / total
            );
            const position = getCircularPosition(
              localProgress,
              leftRadiusScaledX,
              leftRadiusScaledY,
              leftAngleOffset
            );
            const focusStrength = shapeFocus(
              getStrength(position.horizontalDepth),
              textFocusStart,
              textFocusPower
            );
            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale: gsap.utils.interpolate(textSideScale, textCenterScale, focusStrength),
              opacity: gsap.utils.interpolate(
                textSideOpacity,
                textCenterOpacity,
                focusStrength
              ),
              zIndex: Math.round(
                gsap.utils.interpolate(Z_INDEX_MIN, leftDepthMax, focusStrength)
              ),
              transformOrigin: "50% 50%",
            });
          });

          rightNodes.forEach((node, index) => {
            const localProgress = wrapProgress(
              index / total - scrollProgress + focusPhase / total
            );
            const position = getCircularPosition(
              localProgress,
              rightRadiusScaledX,
              rightRadiusScaledY,
              rightAngleOffset
            );
            const focusStrength = shapeFocus(
              getStrength(-position.horizontalDepth),
              imageFocusStart,
              imageFocusPower
            );
            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale: gsap.utils.interpolate(
                imageSideScale,
                imageCenterScale,
                focusStrength
              ),
              opacity: gsap.utils.interpolate(
                imageSideOpacity,
                imageCenterOpacity,
                focusStrength
              ),
              zIndex: Math.round(
                gsap.utils.interpolate(Z_INDEX_MIN, rightDepthMax, focusStrength)
              ),
              transformOrigin: "50% 50%",
            });
          });
        };

        render(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: `+=${sectionHeight * safeItems.length}%`,
          pin: stickyRef.current,
          scrub,
          pinSpacing,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            render(self.progress);
          },
        });

        const onResize = () => {
          render(progressRef.current);
          scrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          scrollTrigger.kill();
        };
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [
    safeItems,
    scrub,
    pinSpacing,
    sectionHeight,
    leftRadiusX,
    leftRadiusY,
    rightRadiusX,
    rightRadiusY,
    imageCardWidth,
    imageCardHeight,
    textCenterScale,
    textSideScale,
    textCenterOpacity,
    textSideOpacity,
    imageCenterScale,
    imageSideScale,
    imageCenterOpacity,
    imageSideOpacity,
    textFocusStart,
    textFocusPower,
    imageFocusStart,
    imageFocusPower,
    leftAngleOffset,
    rightAngleOffset,
    focusPhase,
    leftDepthMax,
    rightDepthMax,
  ]);

  const mediaClass =
    "pointer-events-none absolute inset-0 block h-full w-full select-none object-cover object-top";

  return (
    <section
      ref={rootRef}
      className={`relative min-h-screen w-full overflow-clip ${className}`}
      style={
        {
          "--css-title-size": titleSize,
          "--css-card-width": `${imageCardWidth}px`,
          "--css-card-height": `${imageCardHeight}px`,
          background: background ?? "#070607",
          color: titleColor ?? "#ffffff",
        } as React.CSSProperties
      }
    >
      <div
        ref={stickyRef}
        aria-hidden="true"
        className={`relative h-screen w-full overflow-hidden ${
          reducedMotion ? "hidden" : "max-[1025px]:hidden"
        }`}
      >
        <div className="relative mx-auto flex h-full w-full">
          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{
              transform: `translateX(calc(${columnSpreadVw}vw - ${columnOffsetPx}px))`,
            }}
          >
            <div className="relative h-[78vh]">
              {safeItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__left-item pointer-events-none absolute left-1/2 top-1/2 w-full origin-center whitespace-nowrap text-center text-[length:var(--css-title-size,clamp(28px,3vw,56px))] font-medium leading-none tracking-[-0.04em] opacity-0 will-change-[transform,opacity]"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex h-full w-[50vw] items-center justify-center"
            style={{
              transform: `translateX(calc(${columnOffsetPx}px - ${columnSpreadVw}vw))`,
            }}
          >
            <div className="relative h-[78vh]">
              {safeItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__right-item absolute left-1/2 top-1/2 ml-[calc(var(--css-card-width,210px)*-0.5)] mt-[calc(var(--css-card-height,210px)*-0.5)] h-[var(--css-card-height,210px)] w-[var(--css-card-width,210px)] origin-center opacity-0 will-change-[transform,opacity]"
                >
                  <div className="relative h-full w-full overflow-hidden bg-[#101012]">
                    <MediaFill
                      video={item.video}
                      image={item.image}
                      poster={item.poster}
                      alt={item.alt}
                      className={mediaClass}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full px-5 py-10 max-md:px-4 max-md:py-8 ${
          reducedMotion
            ? "block"
            : "sr-only max-[1025px]:not-sr-only max-[1025px]:block"
        }`}
      >
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-5 max-md:grid-cols-2 max-md:gap-4">
          {safeItems.map((item) => (
            <article key={item.id} className={`w-full ${gridCardClassName}`}>
              <div
                className={`relative aspect-square w-full overflow-hidden bg-[#101012] ${gridImageClassName}`}
              >
                <MediaFill
                  video={item.video}
                  image={item.image}
                  poster={item.poster}
                  alt={item.alt}
                  className={mediaClass}
                />
              </div>
              <h3
                className={`mt-3 text-center text-[clamp(18px,4vw,30px)] font-medium leading-none tracking-[-0.04em] text-white max-md:mt-2 max-md:text-[clamp(16px,5vw,24px)] ${gridTitleClassName}`}
              >
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface CircularSplitRollProps
  extends Omit<
    CircularSplitRollCompProps,
    | "leftRadiusX"
    | "leftRadiusY"
    | "rightRadiusX"
    | "rightRadiusY"
    | "imageCardWidth"
    | "imageCardHeight"
  > {
  radius?: number;
  cardSize?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
}

export default function CircularSplitRoll({
  items = [],
  radius = 500,
  cardSize = 205,
  sectionHeight = 100,
  leftRadiusX,
  leftRadiusY,
  rightRadiusX,
  rightRadiusY,
  imageCardWidth,
  imageCardHeight,
  ...rest
}: CircularSplitRollProps) {
  return (
    <CircularSplitRollComp
      items={items}
      sectionHeight={sectionHeight}
      leftRadiusX={leftRadiusX ?? radius}
      leftRadiusY={leftRadiusY ?? radius}
      rightRadiusX={rightRadiusX ?? radius}
      rightRadiusY={rightRadiusY ?? radius}
      imageCardWidth={imageCardWidth ?? cardSize}
      imageCardHeight={imageCardHeight ?? cardSize}
      {...rest}
    />
  );
}
