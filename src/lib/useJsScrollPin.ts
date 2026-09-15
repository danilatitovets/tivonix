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

function setPin(el: HTMLElement, props: Record<string, string>) {
  for (const [key, value] of Object.entries(props)) {
    el.style.setProperty(key, value, "important");
  }
}

function clearPin(el: HTMLElement) {
  for (const key of ["position", "top", "bottom", "left", "right", "width", "height", "z-index"]) {
    el.style.removeProperty(key);
  }
}

/**
 * CSS `position: sticky` breaks in Telegram iOS (and often other WKWebView sheets).
 * Pin with `position: fixed` + scroll progress instead.
 * Uses !important so tg-webview CSS cannot force relative over the pin.
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

    const measure = () => {
      if (!pin) return;
      clearPin(pin);
      pinNaturalH = pin.offsetHeight || viewportHeight();
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
        setPin(pin, {
          position: "fixed",
          top: "0px",
          bottom: "auto",
          left: "0px",
          right: "0px",
          width: "100%",
          height: `${vh}px`,
          "z-index": "2",
        });
      } else if (rect.top > 1) {
        p = 0;
        setPin(pin, {
          position: "relative",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto",
          width: "auto",
          height: `${Math.min(h, vh)}px`,
          "z-index": "auto",
        });
      } else {
        p = 1;
        setPin(pin, {
          position: "absolute",
          top: "auto",
          bottom: "0px",
          left: "0px",
          right: "0px",
          width: "100%",
          height: `${Math.min(h, vh)}px`,
          "z-index": "2",
        });
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
      if (pin) clearPin(pin);
    };
  }, [enabled, trackRef, pinRef]);

  return progress;
}
