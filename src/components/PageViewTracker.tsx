import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analyticsAdapter";
import { useLang } from "../i18n/LangProvider";

/** Fires page_view after route changes when analytics consent is granted. */
export default function PageViewTracker() {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    trackPageView(pathname, lang);
  }, [pathname, lang]);

  return null;
}
