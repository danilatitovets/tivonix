import { useEffect, useRef } from "react";
import { trackEvent } from "../lib/analytics";

/** Fires scroll_50 / scroll_90 once per page load. */
export default function ScrollDepthTracker() {
  const fired50 = useRef(false);
  const fired90 = useRef(false);

  useEffect(() => {
    fired50.current = false;
    fired90.current = false;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = (window.scrollY / scrollable) * 100;
      if (!fired50.current && pct >= 50) {
        fired50.current = true;
        trackEvent("scroll_50");
      }
      if (!fired90.current && pct >= 90) {
        fired90.current = true;
        trackEvent("scroll_90");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
