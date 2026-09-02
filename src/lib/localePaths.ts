import type { Lang } from "../i18n/LangProvider";
import { CANONICAL_ORIGIN } from "../config/siteConfig";

const LOCALIZED_BASES = ["/", "/projects", "/contacts", "/plans", "/about"] as const;

const LOCALIZED_PATHS = [
  "/mileseal",
  "/mileseal/cases/content-migration",
] as const;

function withPrefix(lang: Lang, base: string): string {
  if (lang === "ru") return base === "/" ? "/" : base;
  const prefix = `/${lang}`;
  return base === "/" ? prefix : `${prefix}${base}`;
}

export function stripLangPrefix(pathname: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/en" || p === "/zh" || p === "/ru") return "/";
  if (p.startsWith("/en/")) return p.slice(3) || "/";
  if (p.startsWith("/zh/")) return p.slice(3) || "/";
  if (p.startsWith("/ru/")) return p.slice(3) || "/";
  return p;
}

export function pathForLang(pathname: string, lang: Lang): string {
  const clean = pathname.replace(/\/+$/, "") || "/";

  if (
    clean === "/partners" ||
    clean === "/ru/partners" ||
    clean === "/en/partners" ||
    clean === "/zh/partners"
  ) {
    if (lang === "en") return "/en/partners";
    if (lang === "zh") return "/zh/partners";
    return "/partners";
  }

  const mRu = clean.match(/^\/projects\/([^/]+)$/);
  if (mRu) return withPrefix(lang, `/projects/${mRu[1]}`);

  const mEn = clean.match(/^\/en\/projects\/([^/]+)$/);
  if (mEn) return withPrefix(lang, `/projects/${mEn[1]}`);

  const mZh = clean.match(/^\/zh\/projects\/([^/]+)$/);
  if (mZh) return withPrefix(lang, `/projects/${mZh[1]}`);

  const base = stripLangPrefix(clean);

  if ((LOCALIZED_PATHS as readonly string[]).includes(base)) {
    return withPrefix(lang, base);
  }

  if ((LOCALIZED_BASES as readonly string[]).includes(base)) {
    return withPrefix(lang, base);
  }

  if (lang === "en" && clean.startsWith("/en")) return clean;
  if (lang === "zh" && clean.startsWith("/zh")) return clean;
  return base;
}

export function canonicalPathForLang(basePath: string, lang: Lang): string {
  const base = basePath.replace(/\/+$/, "") || "/";
  if (lang === "en") return base === "/" ? "/en" : `/en${base}`;
  if (lang === "zh") return base === "/" ? "/zh" : `/zh${base}`;
  return base;
}

export function hreflangPair(canonicalPath: string): {
  ru: string;
  en: string;
  zh: string;
  xDefault: string;
} {
  const origin = CANONICAL_ORIGIN;
  const clean = canonicalPath.replace(/\/+$/, "") || "/";
  const base = stripLangPrefix(clean.startsWith("http") ? new URL(clean).pathname : clean);

  const ru = base === "/" ? `${origin}/` : `${origin}${base}`;
  const en = base === "/" ? `${origin}/en` : `${origin}/en${base}`;
  const zh = base === "/" ? `${origin}/zh` : `${origin}/zh${base}`;

  return { ru, en, zh, xDefault: ru };
}
