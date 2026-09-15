/**
 * True when we must use JS scroll-pin (Telegram / iOS) instead of CSS sticky.
 */

import { useEffect, useState } from "react";
import { needsJsScrollPin, watchInAppBrowser, markInAppBrowser } from "./telegramWebView";

export function useInAppJsScrub(): boolean {
  const [active, setActive] = useState(() =>
    typeof document !== "undefined" ? needsJsScrollPin() : false
  );

  useEffect(() => {
    markInAppBrowser();
    if (needsJsScrollPin()) {
      setActive(true);
      return;
    }
    return watchInAppBrowser(() => {
      if (needsJsScrollPin()) setActive(true);
    });
  }, []);

  return active;
}

/** @deprecated aliases */
export function useInAppSafeLayout(): boolean {
  return useInAppJsScrub();
}

export function useSoftScrollScrub(): boolean {
  return useInAppJsScrub();
}

export function useLightScrollExperience(): boolean {
  return useInAppJsScrub();
}
