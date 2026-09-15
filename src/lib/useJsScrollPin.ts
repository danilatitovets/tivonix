import { useEffect, useState, type RefObject } from "react";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/**
 * CSS `position: sticky` breaks inside Telegram / messenger WKWebViews
 * (black void, no scrub). Pin with `position: fixed` driven by scroll instead.
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

    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin || typeof window === "undefined") return;

    let raf = 0;
    let last = -1;
    let pinNaturalH = 0;

    const clearPinStyles = () => {
      pin.style.position = "";
      pin.style.top = "";
      pin.style.bottom = "";
      pin.style.left = "";
      pin.style.right = "";
      pin.style.width = "";
      pin.style.height = "";
      pin.style.zIndex = "";
      pin.style.maxWidth = "";
      pin.style.marginLeft = "";
      pin.style.marginRight = "";
    };

    const measure = () => {
      const prev = pin.style.position;
      if (prev === "fixed" || prev === "absolute") {
        pin.style.position = "relative";
        pin.style.top = "";
        pin.style.bottom = "";
        pin.style.height = "";
      }
      pinNaturalH = pin.offsetHeight || window.innerHeight;
      if (prev === "fixed" || prev === "absolute") {
        // restore — update() will re-apply
      }
    };

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const trackH = Math.max(track.offsetHeight, vh + 1);
      const scrollable = Math.max(1, trackH - vh);
      const h = pinNaturalH || vh;

      let p = 0;

      if (rect.top <= 0 && rect.bottom > vh) {
        p = clamp01(-rect.top / scrollable);
        pin.style.position = "fixed";
        pin.style.top = "0px";
        pin.style.bottom = "auto";
        pin.style.left = "0px";
        pin.style.right = "0px";
        pin.style.width = "100%";
        pin.style.height = `${vh}px`;
        pin.style.zIndex = "2";
      } else if (rect.top > 0) {
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

      if (Math.abs(p - last) >= 0.003) {
        last = p;
        setProgress(p);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 8) return;
      lastW = window.innerWidth;
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearPinStyles();
    };
  }, [enabled, trackRef, pinRef]);

  return progress;
}
