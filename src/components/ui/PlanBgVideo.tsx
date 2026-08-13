import { useEffect, useRef, useState } from "react";
import {
  PLAN_VIDEO,
  pickPlanVideoSrc,
  shouldSkipPlanVideo,
  type PlanVideoId,
} from "../../lib/planMedia";

type Props = {
  plan: PlanVideoId;
  className: string;
};

export default function PlanBgVideo({ plan, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const poster = PLAN_VIDEO[plan].poster;
  const [src, setSrc] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      if (!shouldSkipPlanVideo()) setSrc(pickPlanVideoSrc(plan));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = !!entry?.isIntersecting;
        setInView(visible);
        if (visible && !shouldSkipPlanVideo()) {
          setSrc(pickPlanVideoSrc(plan));
        }
      },
      { root: null, rootMargin: "220px 0px", threshold: 0.08 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [plan]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    if (!inView) {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      return;
    }

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {
        /* autoplay policies — poster stays visible */
      });
    };

    play();
    const onVis = () => {
      if (document.visibilityState === "visible" && inView) play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [src, inView]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden" aria-hidden>
      {src ? (
        <video
          ref={videoRef}
          className={className}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onWaiting={() => setPlaying(false)}
          onEmptied={() => setPlaying(false)}
        />
      ) : null}
      <img
        src={poster}
        alt=""
        className={className}
        decoding="async"
        loading="lazy"
        draggable={false}
        style={{
          zIndex: 1,
          opacity: src && playing ? 0 : 1,
          transition: "opacity 280ms ease",
        }}
      />
    </div>
  );
}
