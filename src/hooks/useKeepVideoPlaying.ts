import { useEffect, type RefObject } from "react";

/** Keep a muted background video playing (loop + tab return), without fighting scroll. */
export function useKeepVideoPlaying(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      if (document.visibilityState === "hidden") return;
      void video.play().catch(() => {});
    };

    play();

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    const onVis = () => {
      if (document.visibilityState === "visible") play();
    };

    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [videoRef]);
}
