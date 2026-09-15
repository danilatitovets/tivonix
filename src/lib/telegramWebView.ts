/**
 * Messenger / social in-app browsers (Telegram, VK, Viber, IG, FB, …).
 * Sticky + multi-vh scroll-scrub tracks fight collapsing chrome and break scroll.
 */

declare global {
  interface Window {
    TelegramWebviewProxy?: unknown;
    Telegram?: { WebApp?: unknown };
    __TIVONIX_INAPP__?: boolean;
  }
}

const INAPP_UA =
  /Telegram|VKAndroidApp|vk_app|VKontakte|VKApp|Viber|Instagram|FBAN|FBAV|FB_IAB|FBIOS|FB_FW|WhatsApp|Line\/|Snapchat|BytedanceWebview|TikTok|musical_ly|MicroMessenger|YaSearchBrowser|YandexSearchApp/i;

/** Android embedded WebView marker (Chrome Custom Tabs usually lack `; wv)`). */
const ANDROID_WV = /Android/i;

function uaLooksInApp(ua: string): boolean {
  if (INAPP_UA.test(ua)) return true;
  // Generic Android System WebView / many messenger shells
  if (ANDROID_WV.test(ua) && /; wv\)/i.test(ua)) return true;
  return false;
}

export function isInAppBrowser(): boolean {
  if (typeof window === "undefined") return false;

  if (window.__TIVONIX_INAPP__ === true) return true;

  if (window.TelegramWebviewProxy != null) return true;
  if (window.Telegram?.WebApp != null) return true;

  try {
    if (document.documentElement.classList.contains("tg-webview")) return true;
    if (document.documentElement.classList.contains("inapp-webview")) return true;
  } catch {
    /* ignore */
  }

  const ua = navigator.userAgent || "";
  return uaLooksInApp(ua);
}

/** @deprecated use isInAppBrowser — kept for existing imports */
export function isTelegramWebView(): boolean {
  return isInAppBrowser();
}

/**
 * Apply once as early as possible so CSS can kill sticky tracks before paint/hydrate.
 * Adds both `tg-webview` (legacy CSS) and `inapp-webview`.
 */
export function markInAppBrowser(): boolean {
  if (!isInAppBrowser()) return false;
  document.documentElement.classList.add("tg-webview", "inapp-webview");
  window.__TIVONIX_INAPP__ = true;
  return true;
}

/** @deprecated use markInAppBrowser */
export function markTelegramWebView(): boolean {
  return markInAppBrowser();
}
