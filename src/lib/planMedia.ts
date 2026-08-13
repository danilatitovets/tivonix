import { pickLoopSrc } from "./heroMedia";
import type { PlanId } from "./pricingData";

export type PlanVideoId = PlanId | "enterprise";

export type PlanVideoAssets = {
  desktop: string;
  mobile: string;
  poster: string;
};

function assets(n: 1 | 2 | 3 | 4 | 5): PlanVideoAssets {
  return {
    desktop: `/images/plans/plan-${n}.mp4`,
    mobile: `/images/plans/plan-${n}-mobile.mp4`,
    poster: `/images/plans/plan-${n}-poster.webp`,
  };
}

export const PLAN_VIDEO: Record<PlanVideoId, PlanVideoAssets> = {
  start: assets(1),
  growth: assets(2),
  product: assets(3),
  custom: assets(4),
  enterprise: assets(5),
};

export function pickPlanVideoSrc(id: PlanVideoId): string {
  const media = PLAN_VIDEO[id];
  return pickLoopSrc(media.desktop, media.mobile);
}

export function shouldSkipPlanVideo(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    if (conn?.saveData) return true;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
