import type { Lang } from "./LangProvider";

/** Pick a value for the active language. */
export function pick<T>(lang: Lang, map: Record<Lang, T>): T {
  return map[lang];
}

/** Pick among three locale strings. */
export function t3(lang: Lang, ru: string, en: string, zh: string): string {
  if (lang === "zh") return zh;
  return lang === "ru" ? ru : en;
}

/** <html lang> attribute value. */
export function htmlLangAttr(lang: Lang): string {
  if (lang === "zh") return "zh-CN";
  return lang;
}

/** Open Graph locale for the page language. */
export function ogLocaleFor(lang: Lang): "ru_RU" | "en_US" | "zh_CN" {
  if (lang === "zh") return "zh_CN";
  return lang === "en" ? "en_US" : "ru_RU";
}

/** Home / about / plans / contacts / projects path for a language. */
export function localizedHome(lang: Lang): string {
  if (lang === "en") return "/en";
  if (lang === "zh") return "/zh";
  return "/";
}
