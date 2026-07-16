import type { Lang } from "./LangProvider";

/** Partners page paths with language prefixes */
export const PARTNERS_PATH_RU = "/ru/partners";
export const PARTNERS_PATH_EN = "/en/partners";
/** Legacy without prefix — same as RU */
export const PARTNERS_PATH_LEGACY = "/partners";

export function partnersPath(lang: Lang): string {
  return lang === "en" ? PARTNERS_PATH_EN : PARTNERS_PATH_RU;
}

export function isPartnersPath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, "") || "/";
  return p === PARTNERS_PATH_LEGACY || p === PARTNERS_PATH_RU || p === PARTNERS_PATH_EN;
}

export function langFromPartnersPath(pathname: string): Lang | null {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === PARTNERS_PATH_EN) return "en";
  if (p === PARTNERS_PATH_RU || p === PARTNERS_PATH_LEGACY) return "ru";
  return null;
}

const PARTNERS_ORIGIN = "https://www.tivonix.tech";

/** Canonical for the current partners URL (legacy `/partners` keeps short path). */
export function partnersCanonicalUrl(lang: Lang, pathname?: string): string {
  const p = (pathname ?? "").replace(/\/+$/, "") || "";
  if (p === PARTNERS_PATH_LEGACY) {
    return `${PARTNERS_ORIGIN}${PARTNERS_PATH_LEGACY}`;
  }
  if (p === PARTNERS_PATH_RU || p === PARTNERS_PATH_EN) {
    return `${PARTNERS_ORIGIN}${p}`;
  }
  return `${PARTNERS_ORIGIN}${partnersPath(lang)}`;
}

export function partnersHreflangUrl(path: string): string {
  return `${PARTNERS_ORIGIN}${path}`;
}
