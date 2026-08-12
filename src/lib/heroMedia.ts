export const HERO_VIDEO_DESKTOP = "/images/hero-bg.mp4";
export const HERO_VIDEO_MOBILE = "/images/hero-bg-mobile.mp4";
export const HERO_POSTER = "/images/hero-bg-poster.webp";

/** Pick a lighter hero loop on phones / slow networks so autoplay can start without a tap. */
export function pickHeroVideoSrc(): string {
  if (typeof window === "undefined") return HERO_VIDEO_DESKTOP;

  try {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (conn?.saveData) return HERO_VIDEO_MOBILE;
    const type = conn?.effectiveType;
    if (type === "slow-2g" || type === "2g" || type === "3g") return HERO_VIDEO_MOBILE;
  } catch {
    /* ignore */
  }

  if (window.matchMedia("(max-width: 900px)").matches) return HERO_VIDEO_MOBILE;
  return HERO_VIDEO_DESKTOP;
}
