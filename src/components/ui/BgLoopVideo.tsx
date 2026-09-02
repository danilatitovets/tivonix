import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import {
  FORM_POSTER,
  HERO_POSTER,
  HERO_VIDEO_DESKTOP,
  pickFormVideoSrc,
  pickHeroVideoSrc,
} from "../../lib/heroMedia";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  className?: string;
  style?: CSSProperties;
  poster?: string;
  /** Force a specific src (skips mobile/desktop pick). */
  src?: string;
  /** Hero keeps the original loop; form/final CTA use the new abstract clip. */
  variant?: "hero" | "form";
};

/**
 * Full-bleed muted loop. Poster stays on top until real playback so iOS
 * never shows its native Play affordance over an empty/paused frame.
 *
 * `className` / `style` go on the wrapper (for Final CTA zoom etc.).
 * The video + poster always fill the wrapper 100%.
 *
 * Off-screen loops are paused so the hero decoder is not fighting a second
 * 1080p clip at the bottom of the page.
 */
export default function BgLoopVideo({
  className,
  style,
  poster,
  src: srcProp,
  variant = "hero",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterSrc = poster ?? (variant === "form" ? FORM_POSTER : HERO_POSTER);
  const [src, setSrc] = useState(srcProp ?? (variant === "hero" ? HERO_VIDEO_DESKTOP : undefined));
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(variant === "hero");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = !!entry?.isIntersecting;
        if (variant === "hero" && !visible && (entry?.boundingClientRect.height ?? 0) < 8) {
          return;
        }
        setInView(visible);
      },
      {
        root: null,
        rootMargin: variant === "hero" ? "40px 0px" : "180px 0px",
        threshold: 0,
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  useEffect(() => {
    if (srcProp) {
      setSrc(srcProp);
      return;
    }
    if (reducedMotion) {
      setSrc(undefined);
      return;
    }
    if (variant === "form" && !inView) return;
    setSrc(variant === "form" ? pickFormVideoSrc() : pickHeroVideoSrc());
  }, [srcProp, variant, inView, reducedMotion]);

  useEffect(() => {
    setPlaying(false);
    const video = videoRef.current;
    if (!video || !src) return;
    try {
      video.load();
    } catch {
      /* ignore */
    }
  }, [src]);

  const active = Boolean(src) && inView && !reducedMotion;
  useKeepVideoPlaying(videoRef, active);

  return (
    <div
      ref={wrapRef}
      className={cx(
        "hero-bg-video-wrap pointer-events-none overflow-hidden",
        className ?? "absolute inset-0"
      )}
      style={style}
      aria-hidden
    >
      {src ? (
        <video
          ref={videoRef}
          className="hero-bg-video"
          src={src}
          poster={posterSrc}
          autoPlay={active}
          muted
          loop
          playsInline
          preload={variant === "hero" ? "auto" : inView ? "metadata" : "none"}
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onWaiting={() => setPlaying(false)}
          onEmptied={() => setPlaying(false)}
          onStalled={() => setPlaying(false)}
        />
      ) : null}
      <img
        src={posterSrc}
        alt=""
        draggable={false}
        decoding="async"
        fetchPriority={variant === "hero" ? "high" : "low"}
        className={cx(
          "hero-bg-video__poster transition-opacity duration-300",
          playing ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
