import { useEffect, type RefObject } from "react";

/** Keep a muted background video playing continuously (no freeze at loop / tab return). */
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

    const onTimeUpdate = () => {
      const { duration, currentTime } = video;
      if (!Number.isFinite(duration) || duration <= 0) return;
      // Restart just before the last frame so the native loop gap never freezes
      if (duration - currentTime < 0.08) {
        video.currentTime = 0;
        play();
      }
    };

    const onPause = () => {
      if (document.visibilityState === "visible") play();
    };

    const onVis = () => {
      if (document.visibilityState === "visible") play();
    };

    const watchdog = window.setInterval(() => {
      if (document.visibilityState === "visible" && video.paused) play();
    }, 1200);

    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.clearInterval(watchdog);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [videoRef]);
}
