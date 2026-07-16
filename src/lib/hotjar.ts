/**
 * Hotjar client wrapper.
 * Loads once, only in production, only when consent + ID are present.
 * Accesses window only on the client.
 */

export type HotjarEventName =
  | "cta_primary_click"
  | "lead_form_open"
  | "lead_form_start"
  | "lead_form_validation_error"
  | "lead_form_submit"
  | "lead_form_success"
  | "lead_form_server_error"
  | "lead_form_abandon"
  | "telegram_direct_click"
  | "telegram_bot_click"
  | "email_click"
  | "project_view"
  | "pricing_view"
  | "scroll_50"
  | "scroll_90";

declare global {
  interface Window {
    hj?: (...args: unknown[]) => void;
    _hjSettings?: { hjid: number; hjsv: number };
  }
}

const LOADED_FLAG = "__tivonix_hotjar_loaded";

function hotjarId(): number | null {
  const raw =
    (import.meta.env.VITE_HOTJAR_ID as string | undefined) ||
    (import.meta.env.VITE_NEXT_PUBLIC_HOTJAR_ID as string | undefined);
  if (!raw || !String(raw).trim()) return null;
  const n = Number(String(raw).trim());
  return Number.isFinite(n) && n > 0 ? n : null;
}

function hotjarSv(): number {
  const raw =
    (import.meta.env.VITE_HOTJAR_SV as string | undefined) ||
    (import.meta.env.VITE_NEXT_PUBLIC_HOTJAR_SV as string | undefined);
  const n = Number(raw || "6");
  return Number.isFinite(n) && n > 0 ? n : 6;
}

function alreadyLoaded(): boolean {
  if (typeof window === "undefined") return true;
  return Boolean((window as unknown as Record<string, unknown>)[LOADED_FLAG]);
}

function markLoaded(): void {
  (window as unknown as Record<string, unknown>)[LOADED_FLAG] = true;
}

/**
 * Inject official Hotjar tracking code once.
 * No-op without ID, outside browser, if already loaded, or in non-production
 * unless VITE_HOTJAR_FORCE=1.
 */
export function initHotjar(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const id = hotjarId();
  if (!id) return;

  const force = import.meta.env.VITE_HOTJAR_FORCE === "1";
  if (!import.meta.env.PROD && !force) return;

  if (alreadyLoaded() || typeof window.hj === "function") {
    markLoaded();
    return;
  }

  const sv = hotjarSv();

  // Official Hotjar snippet pattern
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (function (h: any, o: Document, t: string, j: string) {
    h.hj =
      h.hj ||
      function (...args: unknown[]) {
        (h.hj.q = h.hj.q || []).push(args);
      };
    h._hjSettings = { hjid: id, hjsv: sv };
    const a = o.getElementsByTagName("head")[0];
    const r = o.createElement("script");
    r.async = true;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

  markLoaded();
}

export function trackHotjarEvent(name: HotjarEventName | string): void {
  if (typeof window === "undefined") return;
  if (typeof window.hj !== "function") return;
  if (!name) return;
  try {
    window.hj("event", name);
  } catch {
    /* ignore */
  }
}

/** Ask Hotjar to mask sensitive form fields. */
export const HOTJAR_MASK_CLASS = "hj-masked";
export const HOTJAR_SUPPRESS_ATTR = { "data-hj-suppress": "" } as const;
