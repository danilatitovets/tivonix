export const HERO_VIDEO_DESKTOP = "/images/hero-bg.mp4";
export const HERO_VIDEO_MOBILE = "/images/hero-bg-mobile.mp4";
export const HERO_POSTER = "/images/hero-bg-poster.webp";

export const FORM_VIDEO_DESKTOP = "/images/form-bg.mp4";
export const FORM_VIDEO_MOBILE = "/images/form-bg-mobile.mp4";
export const FORM_POSTER = "/images/form-bg-poster.webp";

export function pickLoopSrc(desktop: string, mobile: string): string {
  if (typeof window === "undefined") return desktop;

  try {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return mobile;
    const type = conn?.effectiveType;
    if (type === "slow-2g" || type === "2g" || type === "3g") return mobile;
  } catch {
    /* ignore */
  }

  if (window.matchMedia("(max-width: 900px)").matches) return mobile;
  return desktop;
}

/** Pick a lighter hero loop on phones / slow networks so autoplay can start without a tap. */
export function pickHeroVideoSrc(): string {
  return pickLoopSrc(HERO_VIDEO_DESKTOP, HERO_VIDEO_MOBILE);
}

export function pickFormVideoSrc(): string {
  return pickLoopSrc(FORM_VIDEO_DESKTOP, FORM_VIDEO_MOBILE);
}
