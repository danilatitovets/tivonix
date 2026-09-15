import { useEffect, useState } from "react";
import { isInAppBrowser, watchInAppBrowser } from "./telegramWebView";

function isMobileSafariLikeUa(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  // Sticky multi-vh scrub is the main lag source in iOS WKWebView shells
  // (Telegram/VK often look identical to Safari). Use light scroll on iPhone/iPad.
  return /iPhone|iPad|iPod/i.test(ua);
}

/**
 * Sticky multi-vh scrub is unreliable in messenger WebViews and often on iOS.
 * Prefer a static end-state + normal document scroll there.
 * Desktop browsers keep the full scrub experience.
 */
export function useLightScrollExperience(): boolean {
  const [light, setLight] = useState(() => {
    if (typeof document === "undefined") return false;
    return isInAppBrowser() || isMobileSafariLikeUa();
  });

  useEffect(() => {
    if (isInAppBrowser() || isMobileSafariLikeUa()) {
      setLight(true);
      return;
    }
    return watchInAppBrowser(() => setLight(true));
  }, []);

  return light;
}
