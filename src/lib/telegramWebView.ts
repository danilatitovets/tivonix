/**
 * Sticky + vh/svh scroll-scrub tracks fight mobile browser chrome
 * (and Telegram WebView) — scroll feels stuck, then jumps upward.
 */

declare global {
  interface Window {
    TelegramWebviewProxy?: unknown;
  }
}

export function isTelegramWebView(): boolean {
  if (typeof window === "undefined") return false;

  if (window.TelegramWebviewProxy != null) return true;

  const ua = navigator.userAgent || "";
  if (/Telegram/i.test(ua)) return true;

  return false;
}

/** Mobile / coarse pointer: prefer static sections over sticky scrub tracks. */
export function shouldSimplifyScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (isTelegramWebView()) return true;
  try {
    return window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)").matches;
  } catch {
    return false;
  }
}

/** Apply once before paint so CSS can stabilize scroll. */
export function markTelegramWebView(): boolean {
  const tg = isTelegramWebView();
  if (tg) document.documentElement.classList.add("tg-webview");
  if (shouldSimplifyScroll()) document.documentElement.classList.add("simple-scroll");
  return tg;
}
