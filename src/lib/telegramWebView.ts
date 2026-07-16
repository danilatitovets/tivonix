/**
 * Telegram in-app browser (link open inside TG).
 * Sticky + vh/dvh scroll sections jump there when the chrome resizes.
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

/** Apply once before paint so CSS can stabilize scroll. */
export function markTelegramWebView(): boolean {
  if (!isTelegramWebView()) return false;
  document.documentElement.classList.add("tg-webview");
  return true;
}
