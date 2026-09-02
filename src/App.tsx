import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  initAnalyticsAfterConsent,
  trackAdsFormConversion,
} from "./lib/analyticsAdapter";
import {
  trackEmailClick,
  trackTelegramBotClick,
  trackTelegramDirectClick,
} from "./lib/analytics";
import { getAnalyticsConsent, onConsentChange } from "./lib/consent";
import { AppShell } from "./AppShell";

function closestAnchor(el: EventTarget | null): HTMLAnchorElement | null {
  let e = el as HTMLElement | null;
  while (e && e !== document.body) {
    if (e.tagName === "A") return e as HTMLAnchorElement;
    e = e.parentElement;
  }
  return null;
}

function isContactLink(href: string): boolean {
  if (href.startsWith("mailto:")) return true;
  if (/^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i.test(href)) return true;
  return false;
}

function trackContactChannel(href: string) {
  if (href.startsWith("mailto:")) {
    trackEmailClick();
    return;
  }
  if (/tivonixtech_leads_bot/i.test(href)) {
    trackTelegramBotClick();
    return;
  }
  if (/t\.me\/TIVONIX|telegram\.me\/TIVONIX/i.test(href)) {
    trackTelegramDirectClick();
  }
}

export default function App() {
  useEffect(() => {
    if (getAnalyticsConsent() === "accepted") {
      initAnalyticsAfterConsent();
    }
    return onConsentChange((state) => {
      if (state === "accepted") initAnalyticsAfterConsent();
    });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = closestAnchor(e.target);
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!href || !isContactLink(href)) return;

      trackContactChannel(href);

      const newTab = (a.getAttribute("target") ?? "").toLowerCase() === "_blank";
      if (newTab) {
        trackAdsFormConversion();
        return;
      }

      e.preventDefault();
      trackAdsFormConversion(() => {
        window.location.href = href;
      });
      setTimeout(() => {
        window.location.href = href;
      }, 700);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  useEffect(() => {
    const key = "tivonix_visit_date";
    const today = new Date().toISOString().slice(0, 10);
    try {
      const sent = sessionStorage.getItem(key);
      if (sent === today) return;
      fetch("/api/visit", { method: "GET", keepalive: true }).finally(() => {
        try {
          sessionStorage.setItem(key, today);
        } catch {
          /* ignore */
        }
      });
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
