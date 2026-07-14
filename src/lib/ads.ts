// src/lib/ads.ts — Google Ads (gtag) init and conversion tracking via env

const AW_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
const CONVERSION_LABEL = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined;

function isConfigured(): boolean {
  return typeof AW_ID === "string" && AW_ID.length > 0 &&
    typeof CONVERSION_LABEL === "string" && CONVERSION_LABEL.length > 0;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Dynamically injects gtag script and initializes dataLayer/gtag.
 * No-op if VITE_GOOGLE_ADS_ID is not set.
 */
export function initGoogleAds(): void {
  if (!isConfigured() || typeof document === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", AW_ID!);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`;
  document.head.appendChild(script);
}

/**
 * Sends a conversion event to Google Ads.
 * No-op if env is not configured.
 * @param eventLabel - optional label for the conversion
 * @param eventCallback - optional callback (e.g. to navigate after send); used for same-tab links
 */
export function trackAdsConversion(eventLabel?: string, eventCallback?: () => void): void {
  if (!isConfigured() || typeof window.gtag !== "function") {
    eventCallback?.();
    return;
  }

  const sendTo = `${AW_ID}/${CONVERSION_LABEL}`;
  const payload: Record<string, unknown> = { send_to: sendTo };
  if (eventLabel != null && eventLabel !== "") {
    payload.event_label = eventLabel;
  }
  if (typeof eventCallback === "function") {
    payload.event_callback = eventCallback;
  }
  window.gtag("event", "conversion", payload);
}

/**
 * Custom GA/Ads event when gtag is available.
 * No-op if analytics is not configured — does not add a new analytics vendor.
 */
export function trackPartnersEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!eventName) return;
  window.gtag("event", eventName, params ?? {});
}
