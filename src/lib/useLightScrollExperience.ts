/**
 * Soft scroll-scrub in messenger WebViews: keep animations, shorten sticky runway.
 * Full sticky scrub stays for normal Safari / Chrome (incl. iPhone Safari).
 */

import { useEffect, useState } from "react";
import { isInAppBrowser, watchInAppBrowser } from "./telegramWebView";

export function useSoftScrollScrub(): boolean {
  const [soft, setSoft] = useState(() =>
    typeof document !== "undefined" ? isInAppBrowser() : false
  );

  useEffect(() => {
    if (isInAppBrowser()) {
      setSoft(true);
      return;
    }
    return watchInAppBrowser(() => setSoft(true));
  }, []);

  return soft;
}

/** @deprecated */
export function useLightScrollExperience(): boolean {
  return useSoftScrollScrub();
}
