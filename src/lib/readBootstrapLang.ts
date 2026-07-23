import type { Lang } from "../i18n/LangProvider";

declare global {
  interface Window {
    __TIVONIX_LANG__?: Lang;
  }
}

function isLang(v: string | null | undefined): v is Lang {
  return v === "ru" || v === "en" || v === "zh";
}

/** URL-only language — must match SSR/prerender output. */
export function detectLangFromUrl(): Lang {
  if (typeof window === "undefined") return "ru";

  try {
    const qp = new URL(window.location.href).searchParams.get("lang");
    if (isLang(qp)) return qp;
  } catch {
    /* ignore */
  }

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/zh" || path.startsWith("/zh/")) return "zh";
  if (path === "/ru" || path.startsWith("/ru/")) return "ru";
  if (path === "/partners") return "ru";

  return "ru";
}

/** Client bootstrap: inline script in index.html sets `window.__TIVONIX_LANG__`. */
export function readBootstrapLang(fallback?: Lang): Lang {
  if (typeof window === "undefined") return fallback ?? "ru";

  const urlLang = detectLangFromUrl();
  const boot = window.__TIVONIX_LANG__;
  if (isLang(boot)) {
    // SSR HTML always matches URL language — never hydrate with a different stored lang.
    return boot === urlLang ? boot : urlLang;
  }

  return fallback ?? urlLang;
}
