/**
 * Messenger / social in-app browsers + iOS WKWebView shells.
 * Telegram iOS link browser often has a Safari-identical UA and no bridge —
 * sticky scrub then paints a black void. Prefer JS-pin on all iPhone/iPad.
 */

declare global {
  interface Window {
    TelegramWebviewProxy?: unknown;
    TelegramWebviewProxyProto?: unknown;
    TelegramWebview?: unknown;
    TelegramGameProxy?: unknown;
    Telegram?: { WebApp?: unknown };
    __TIVONIX_INAPP__?: boolean;
    __TIVONIX_JS_SCRUB__?: boolean;
  }
}

const INAPP_UA =
  /Telegram|VKAndroidApp|vk_app|VKontakte|VKApp|Viber|Instagram|FBAN|FBAV|FB_IAB|FBIOS|FB_FW|WhatsApp|Line\/|Snapchat|BytedanceWebview|TikTok|musical_ly|MicroMessenger|YaSearchBrowser|YandexSearchApp/i;

export function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
}

function hasTelegramBridge(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.TelegramWebviewProxy != null ||
    window.TelegramWebviewProxyProto != null ||
    window.TelegramWebview != null ||
    window.TelegramGameProxy != null ||
    window.Telegram?.WebApp != null
  );
}

function uaLooksInApp(ua: string): boolean {
  if (INAPP_UA.test(ua)) return true;
  if (/Android/i.test(ua) && /; wv\)/i.test(ua)) return true;
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

/**
 * Use JS-fixed scroll scrub instead of CSS sticky.
 * True for messenger WebViews AND all iOS (Telegram sheet ≈ Safari UA).
 * Android Chrome / desktop keep CSS sticky (works there).
 */
export function needsJsScrollPin(): boolean {
  if (typeof window === "undefined") return false;
  if (window.__TIVONIX_JS_SCRUB__ === true) return true;
  if (isInAppBrowser()) return true;
  if (isIOS()) return true;
  return false;
}

/** @deprecated use isInAppBrowser */
export function isTelegramWebView(): boolean {
  return isInAppBrowser();
}

export function markInAppBrowser(): boolean {
  const inApp = isInAppBrowser();
  const jsScrub = needsJsScrollPin();
  if (!inApp && !jsScrub) return false;
  if (inApp || jsScrub) {
    document.documentElement.classList.add("tg-webview", "inapp-webview");
  }
  if (inApp) window.__TIVONIX_INAPP__ = true;
  if (jsScrub) window.__TIVONIX_JS_SCRUB__ = true;
  document.documentElement.dataset.scrub = jsScrub ? "js" : "css";
  return inApp || jsScrub;
}

/** @deprecated use markInAppBrowser */
export function markTelegramWebView(): boolean {
  return markInAppBrowser();
}

export function watchInAppBrowser(onChange: (active: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  let stopped = false;
  const emit = () => {
    if (stopped) return;
    if (markInAppBrowser() || needsJsScrollPin()) {
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
