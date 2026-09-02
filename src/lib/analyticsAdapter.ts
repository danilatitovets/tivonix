/**
 * Unified analytics adapter — GA4, Hotjar, Google Ads conversions.
 * Loads only after consent. Never throws when blocked or unconfigured.
 */

import { ANALYTICS, hasAnalyticsConfigured } from "../config/siteConfig";
import { getAnalyticsConsent } from "./consent";
import { initHotjar, trackHotjarEvent } from "./hotjar";

let initialized = false;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  return getAnalyticsConsent() === "accepted";
}

function gaConfigured(): boolean {
  return Boolean(ANALYTICS.gaMeasurementId);
}

function adsConfigured(): boolean {
  return Boolean(ANALYTICS.googleAdsId && ANALYTICS.googleAdsConversionLabel);
}

function injectScript(src: string): void {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Initialize all configured analytics vendors after consent. Idempotent. */
export function initAnalyticsAfterConsent(): void {
  if (!canTrack() || initialized) return;
  if (!hasAnalyticsConfigured()) return;

  initialized = true;

  if (gaConfigured() || adsConfigured()) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());

    if (gaConfigured()) {
      window.gtag("config", ANALYTICS.gaMeasurementId, { send_page_view: false });
      injectScript(
        `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.gaMeasurementId}`
      );
    } else if (adsConfigured()) {
      injectScript(
        `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.googleAdsId}`
      );
      window.gtag("config", ANALYTICS.googleAdsId);
    }
  }

  initHotjar();
}

export type AnalyticsEventProps = Record<string, string | number | boolean | undefined>;

function scrub(props?: AnalyticsEventProps): AnalyticsEventProps | undefined {
  if (!props) return undefined;
  const out: AnalyticsEventProps = {};
  for (const [k, v] of Object.entries(props)) {
    const key = k.toLowerCase();
    if (
      key.includes("email") ||
      key.includes("phone") ||
      key.includes("telegram") ||
      key.includes("name") ||
      key.includes("task") ||
      key.includes("contact") ||
      key.includes("message")
    ) {
      continue;
    }
    if (typeof v === "string" && v.length > 120) continue;
    out[k] = v;
  }
  return out;
}

function gtagEvent(name: string, params?: AnalyticsEventProps): void {
  if (!canTrack()) return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params ?? {});
    }
  } catch {
    /* blocked */
  }
}

/** Fire analytics event to all configured vendors. */
export function trackAnalyticsEvent(
  name: string,
  props?: AnalyticsEventProps
): void {
  const safe = scrub(props);
  trackHotjarEvent(name);
  gtagEvent(name, safe);
}

export function trackPageView(path: string, locale: string): void {
  trackAnalyticsEvent("page_view", { page_path: path, locale });
}

export function trackAdsFormConversion(callback?: () => void): void {
  if (!canTrack() || !adsConfigured()) {
    callback?.();
    return;
  }
  try {
    if (typeof window.gtag !== "function") {
      callback?.();
      return;
    }
    const payload: Record<string, unknown> = {
      send_to: `${ANALYTICS.googleAdsId}/${ANALYTICS.googleAdsConversionLabel}`,
    };
    if (callback) payload.event_callback = callback;
    window.gtag("event", "conversion", payload);
  } catch {
    callback?.();
  }
}

export function resetAnalyticsInitForTests(): void {
  initialized = false;
}
