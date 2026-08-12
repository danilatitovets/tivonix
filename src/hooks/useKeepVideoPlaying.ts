import { useEffect, type RefObject } from "react";

/** Keep a muted background video playing — no idle pause, no loop freeze. */
export function useKeepVideoPlaying(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const arm = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = true;
      video.controls = false;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("autoplay", "");
      video.removeAttribute("controls");
      video.disableRemotePlayback = true;
    };

    arm();

    const play = () => {
      arm();
      if (document.visibilityState === "hidden") return;
      if (!video.paused && !video.ended) return;
      void video.play().catch(() => {
        /* autoplay policies / low-power mode — unlock handlers below */
      });
    };

    // iOS often won't buffer until play(); kick both load + play early.
    try {
      if (video.readyState < 2) video.load();
    } catch {
      /* ignore */
    }
    play();

    const onReady = () => play();
    const onEnded = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      play();
    };
    const onPause = () => {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(play);
      }
    };
    const onVis = () => {
      if (document.visibilityState === "visible") play();
    };
    const onPageShow = () => play();

    // First gesture unlocks autoplay on strict mobile browsers
    const unlock = () => play();

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("ended", onEnded);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("touchend", unlock, { passive: true, once: true });
    window.addEventListener("pointerdown", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });

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
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, [videoRef]);
}
