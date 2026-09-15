/**
 * Messenger / social in-app browsers (Telegram, VK, Viber, IG, FB, …).
 * Sticky + multi-vh scroll-scrub tracks fight collapsing chrome and break scroll.
 *
 * Telegram iOS often uses a Safari-identical UA — rely on injected globals + polling.
 */

declare global {
  interface Window {
    TelegramWebviewProxy?: unknown;
    TelegramWebviewProxyProto?: unknown;
    TelegramWebview?: unknown;
    Telegram?: { WebApp?: unknown };
    __TIVONIX_INAPP__?: boolean;
  }
}

const INAPP_UA =
  /Telegram|VKAndroidApp|vk_app|VKontakte|VKApp|Viber|Instagram|FBAN|FBAV|FB_IAB|FBIOS|FB_FW|WhatsApp|Line\/|Snapchat|BytedanceWebview|TikTok|musical_ly|MicroMessenger|YaSearchBrowser|YandexSearchApp/i;

function hasTelegramBridge(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.TelegramWebviewProxy != null ||
    window.TelegramWebviewProxyProto != null ||
    window.TelegramWebview != null ||
    window.Telegram?.WebApp != null
  );
}

function uaLooksInApp(ua: string): boolean {
  if (INAPP_UA.test(ua)) return true;
  if (/Android/i.test(ua) && /; wv\)/i.test(ua)) return true;
  // iOS WKWebView shells often omit the Safari token
  if (/iPhone|iPad|iPod/i.test(ua) && /AppleWebKit/i.test(ua) && !/Safari\//i.test(ua)) {
    return true;
  }
  return false;
}

function hasInAppHtmlClass(): boolean {
  try {
    const cl = document.documentElement.classList;
    return cl.contains("tg-webview") || cl.contains("inapp-webview");
  } catch {
    return false;
  }
}

export function isInAppBrowser(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__TIVONIX_INAPP__ === true) return true;
  if (hasTelegramBridge()) return true;
  if (hasInAppHtmlClass()) return true;
  return uaLooksInApp(navigator.userAgent || "");
}

/** @deprecated use isInAppBrowser */
export function isTelegramWebView(): boolean {
  return isInAppBrowser();
}

export function markInAppBrowser(): boolean {
  // iOS: always light-scroll — Telegram/VK WebViews share Safari UA and lag on sticky scrub
  const ios =
    typeof navigator !== "undefined" && /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
  if (!isInAppBrowser() && !ios) return false;
  document.documentElement.classList.add("tg-webview", "inapp-webview");
  window.__TIVONIX_INAPP__ = true;
  return true;
}

/** @deprecated use markInAppBrowser */
export function markTelegramWebView(): boolean {
  return markInAppBrowser();
}

/**
 * Telegram iOS may inject bridges slightly after first paint.
 * Poll briefly and flip to light-scroll mode when detected.
 */
export function watchInAppBrowser(onChange: (active: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  let stopped = false;
  const emit = () => {
    if (stopped) return;
    if (markInAppBrowser() || isInAppBrowser()) {
      onChange(true);
      stopped = true;
    }
  };

  emit();
  if (stopped) return () => {};

  const started = Date.now();
  const id = window.setInterval(() => {
    emit();
    if (stopped || Date.now() - started > 4000) {
      window.clearInterval(id);
    }
  }, 100);

  window.addEventListener("load", emit, { once: true });

  return () => {
    stopped = true;
    window.clearInterval(id);
  };
}
