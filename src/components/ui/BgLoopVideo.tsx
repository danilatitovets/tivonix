import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import { HERO_POSTER, HERO_VIDEO_DESKTOP, pickHeroVideoSrc } from "../../lib/heroMedia";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  className?: string;
  style?: CSSProperties;
  poster?: string;
  /** Force a specific src (skips mobile/desktop pick). */
  src?: string;
};

/**
 * Full-bleed muted loop. Poster stays on top until real playback so iOS
 * never shows its native Play affordance over an empty/paused frame.
 *
 * `className` / `style` go on the wrapper (for Final CTA zoom etc.).
 * The video + poster always fill the wrapper 100%.
 */
export default function BgLoopVideo({
  className,
  style,
  poster = HERO_POSTER,
  src: srcProp,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState(srcProp ?? HERO_VIDEO_DESKTOP);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setSrc(srcProp ?? pickHeroVideoSrc());
  }, [srcProp]);

  useEffect(() => {
    setPlaying(false);
    const video = videoRef.current;
    if (!video) return;
    try {
      video.load();
    } catch {
      /* ignore */
    }
  }, [src]);

  useKeepVideoPlaying(videoRef);

  return (
    <div
      className={cx(
        "hero-bg-video-wrap pointer-events-none overflow-hidden",
        className ?? "absolute inset-0"
      )}
      style={style}
      aria-hidden
    >
      <video
        ref={videoRef}
        className="hero-bg-video"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
      <img
        src={poster}
        alt=""
        draggable={false}
        decoding="async"
        fetchPriority="high"
        className={cx(
          "hero-bg-video__poster transition-opacity duration-300",
          playing ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
