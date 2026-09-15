/**
 * True inside messenger in-app browsers (Telegram, VK, …).
 * There we use JS scroll-pin scrub instead of CSS sticky.
 */

import { useEffect, useState } from "react";
import { isInAppBrowser, watchInAppBrowser } from "./telegramWebView";

export function useInAppJsScrub(): boolean {
  const [active, setActive] = useState(() =>
    typeof document !== "undefined" ? isInAppBrowser() : false
  );

  useEffect(() => {
    if (isInAppBrowser()) {
      setActive(true);
      return;
    }
    return watchInAppBrowser(() => setActive(true));
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
