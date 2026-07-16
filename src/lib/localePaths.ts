import type { Lang } from "../i18n/LangProvider";

/** Paths with indexable EN mirrors */
const EN_ROUTE_MAP: Record<string, string> = {
  "/": "/en",
  "/projects": "/en/projects",
  "/contacts": "/en/contacts",
};

const RU_ROUTE_MAP: Record<string, string> = {
  "/en": "/",
  "/en/projects": "/projects",
  "/en/contacts": "/contacts",
};

export function stripLangPrefix(pathname: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) return p.slice(3) || "/";
  return p;
}

export function pathForLang(pathname: string, lang: Lang): string {
  const clean = pathname.replace(/\/+$/, "") || "/";

  // Partners already have dedicated paths
  if (clean === "/partners" || clean === "/ru/partners") {
    return lang === "en" ? "/en/partners" : "/ru/partners";
  }
  if (clean === "/en/partners") {
    return lang === "en" ? "/en/partners" : "/ru/partners";
  }

  // Project detail: /projects/:slug <-> /en/projects/:slug
  const mRu = clean.match(/^\/projects\/([^/]+)$/);
  if (mRu) {
    return lang === "en" ? `/en/projects/${mRu[1]}` : `/projects/${mRu[1]}`;
  }
  const mEn = clean.match(/^\/en\/projects\/([^/]+)$/);
  if (mEn) {
    return lang === "en" ? `/en/projects/${mEn[1]}` : `/projects/${mEn[1]}`;
  }

  if (lang === "en") {
    if (EN_ROUTE_MAP[clean]) return EN_ROUTE_MAP[clean];
    if (clean.startsWith("/en")) return clean;
    // Other RU pages keep query-lang style via local toggle without dedicated EN URL
    return clean;
  }

  if (RU_ROUTE_MAP[clean]) return RU_ROUTE_MAP[clean];
  if (clean.startsWith("/en/")) return stripLangPrefix(clean);
  return clean;
}

export function hreflangPair(canonicalPath: string): {
  ru: string;
  en: string;
  xDefault: string;
} {
  const origin = "https://www.tivonix.tech";
  const clean = canonicalPath.replace(/\/+$/, "") || "/";
  const base = stripLangPrefix(clean.startsWith("http") ? new URL(clean).pathname : clean);

  if (base === "/" || base === "") {
    return {
      ru: `${origin}/`,
      en: `${origin}/en`,
      xDefault: `${origin}/`,
    };
  }
  if (base === "/projects") {
    return {
      ru: `${origin}/projects`,
      en: `${origin}/en/projects`,
      xDefault: `${origin}/projects`,
    };
  }
  if (base === "/contacts") {
    return {
      ru: `${origin}/contacts`,
      en: `${origin}/en/contacts`,
      xDefault: `${origin}/contacts`,
    };
  }
  const proj = base.match(/^\/projects\/([^/]+)$/);
  if (proj) {
    return {
      ru: `${origin}/projects/${proj[1]}`,
      en: `${origin}/en/projects/${proj[1]}`,
      xDefault: `${origin}/projects/${proj[1]}`,
    };
  }

  return {
    ru: `${origin}${base}`,
    en: `${origin}${base}`,
    xDefault: `${origin}${base}`,
  };
}
