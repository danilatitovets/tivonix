/**
 * In messenger WebViews sticky multi-vh scrub paints a black pinned hero
 * and blocks the rest of the page. Use a safe static layout there.
 * Real Safari / Chrome keep full scroll animations.
 */

import { useEffect, useState } from "react";
import { isInAppBrowser, watchInAppBrowser } from "./telegramWebView";

export function useInAppSafeLayout(): boolean {
  const [safe, setSafe] = useState(() =>
    typeof document !== "undefined" ? isInAppBrowser() : false
  );

  useEffect(() => {
    if (isInAppBrowser()) {
      setSafe(true);
      return;
    }
    return watchInAppBrowser(() => setSafe(true));
  }, []);

  return safe;
}

/** @deprecated aliases */
export function useSoftScrollScrub(): boolean {
  return useInAppSafeLayout();
}

export function useLightScrollExperience(): boolean {
  return useInAppSafeLayout();
}
