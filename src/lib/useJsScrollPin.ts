import { useEffect, useState, type RefObject } from "react";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function viewportHeight() {
  return (
    window.visualViewport?.height ||
    window.innerHeight ||
    document.documentElement.clientHeight ||
    1
  );
}

/**
 * CSS `position: sticky` breaks in Telegram iOS (and often other WKWebView sheets).
 * Pin with `position: fixed` + scroll progress instead.
 */
export function useJsScrollPin(
  trackRef: RefObject<HTMLElement | null>,
  pinRef: RefObject<HTMLElement | null>,
  enabled: boolean
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      return;
    }

    let raf = 0;
    let last = -1;
    let pinNaturalH = 0;
    let bound = false;
    let track: HTMLElement | null = null;
    let pin: HTMLElement | null = null;
    let tries = 0;

    const clearPinStyles = () => {
      if (!pin) return;
      pin.style.position = "";
      pin.style.top = "";
      pin.style.bottom = "";
      pin.style.left = "";
      pin.style.right = "";
      pin.style.width = "";
      pin.style.height = "";
      pin.style.zIndex = "";
    };

    const measure = () => {
      if (!pin) return;
      const prev = pin.style.position;
      pin.style.position = "relative";
      pin.style.top = "";
      pin.style.bottom = "";
      pin.style.left = "";
      pin.style.right = "";
      pin.style.width = "";
      pin.style.height = "";
      pinNaturalH = pin.offsetHeight || viewportHeight();
      if (prev === "fixed" || prev === "absolute") {
        // update() re-applies
      }
    };

    const update = () => {
      raf = 0;
      if (!track || !pin) return;

      const rect = track.getBoundingClientRect();
      const vh = viewportHeight();
      const trackH = Math.max(track.offsetHeight, vh + 1);
      const scrollable = Math.max(1, trackH - vh);
      const h = pinNaturalH || vh;

      let p = 0;

      if (rect.top <= 1 && rect.bottom > vh + 1) {
        p = clamp01(-rect.top / scrollable);
        pin.style.position = "fixed";
        pin.style.top = "0px";
        pin.style.bottom = "auto";
        pin.style.left = "0px";
        pin.style.right = "0px";
        pin.style.width = "100%";
        pin.style.height = `${vh}px`;
        pin.style.zIndex = "2";
      } else if (rect.top > 1) {
        p = 0;
        clearPinStyles();
        pin.style.position = "relative";
        pin.style.height = `${Math.min(h, vh)}px`;
      } else {
        p = 1;
        pin.style.position = "absolute";
        pin.style.top = "auto";
        pin.style.bottom = "0px";
        pin.style.left = "0px";
        pin.style.right = "0px";
        pin.style.width = "100%";
        pin.style.height = `${Math.min(h, vh)}px`;
        pin.style.zIndex = "2";
      }

      if (Math.abs(p - last) >= 0.002) {
        last = p;
        setProgress(p);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 8 && !window.visualViewport) {
        onScroll();
        return;
      }
      lastW = window.innerWidth;
      measure();
      update();
    };

    const bind = () => {
      track = trackRef.current;
      pin = pinRef.current;
      if (!track || !pin) {
        if (tries++ < 120) {
          requestAnimationFrame(bind);
        }
        return;
      }
      if (bound) return;
      bound = true;
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("resize", onResize);
      window.visualViewport?.addEventListener("scroll", onScroll);
    };

    bind();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearPinStyles();
    };
  }, [enabled, trackRef, pinRef]);

  return progress;
}
