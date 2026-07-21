import { useEffect, type RefObject } from "react";

/** Keep a muted background video playing — no idle pause, no loop freeze. */
export function useKeepVideoPlaying(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.disableRemotePlayback = true;

    const play = () => {
      if (document.visibilityState === "hidden") return;
      if (!video.paused && !video.ended) return;
      void video.play().catch(() => {});
    };

    play();

    const onReady = () => play();
    const onEnded = () => {
      video.currentTime = 0;
      play();
    };
    const onPause = () => {
      // Browser / power-saving may pause — immediately resume
      if (document.visibilityState === "visible") {
        requestAnimationFrame(play);
      }
    };
    const onVis = () => {
      if (document.visibilityState === "visible") play();
    };
    const onPageShow = () => play();

    // First gesture unlocks autoplay policies on strict browsers
    const unlock = () => play();

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("ended", onEnded);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });

    const watchdog = window.setInterval(() => {
      if (document.visibilityState === "visible" && (video.paused || video.ended)) {
        play();
      }
    }, 700);

    return () => {
      window.clearInterval(watchdog);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
    };
  }, [videoRef]);
}
