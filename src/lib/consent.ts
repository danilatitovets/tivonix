/**
 * Analytics cookie consent — single banner, no second independent banner.
 * Hotjar loads only after explicit analytics consent.
 */

const CONSENT_KEY = "tivonix_analytics_consent";

export type ConsentState = "pending" | "accepted" | "rejected";

export function getAnalyticsConsent(): ConsentState {
  if (typeof window === "undefined") return "pending";
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch {
    /* ignore */
  }
  return "pending";
}

export function setAnalyticsConsent(state: "accepted" | "rejected"): void {
  try {
    localStorage.setItem(CONSENT_KEY, state);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("tivonix-consent", { detail: state }));
}

export function onConsentChange(cb: (state: ConsentState) => void): () => void {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent).detail as ConsentState;
    cb(detail);
  };
  window.addEventListener("tivonix-consent", handler);
  return () => window.removeEventListener("tivonix-consent", handler);
}
