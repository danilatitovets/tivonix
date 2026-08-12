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
 * Full-bleed muted loop with a poster cover until playback actually starts.
 * Hides the native iOS/Android “tap to play” affordance behind the poster.
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
    <>
      <video
        ref={videoRef}
        className={cx("hero-bg-video", className)}
        style={style}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onWaiting={() => setPlaying(false)}
      />
      <img
        src={poster}
        alt=""
        aria-hidden
        draggable={false}
        decoding="async"
        fetchPriority="high"
        className={cx(
          className,
          "hero-bg-video__poster pointer-events-none transition-opacity duration-500",
          playing ? "opacity-0" : "opacity-100"
        )}
        style={style}
      />
    </>
  );
}
