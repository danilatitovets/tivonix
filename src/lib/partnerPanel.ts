/**
 * Centralized partner panel URLs.
 * Set VITE_PARTNER_PANEL_URL in env (no trailing slash).
 */

const DEFAULT_PANEL_ORIGIN = "https://tivonixpanel-web.onrender.com";

export type PartnerRegisterType = "referral" | "white_label";

function normalizeOrigin(raw: string): string {
  return raw.replace(/\/+$/, "");
}

/** Base origin of the partner panel (no trailing slash). */
export function partnerPanelOrigin(): string {
  const fromEnv = import.meta.env.VITE_PARTNER_PANEL_URL as string | undefined;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return normalizeOrigin(fromEnv.trim());
  }
  return DEFAULT_PANEL_ORIGIN;
}

export function partnerPanelLoginUrl(): string {
  return `${partnerPanelOrigin()}/login`;
}

export function partnerPanelRegisterUrl(type: PartnerRegisterType): string {
  const url = new URL(`${partnerPanelOrigin()}/register`);
  url.searchParams.set("type", type);
  return url.toString();
}

export const PARTNER_PANEL_REGISTER_REFERRAL = () => partnerPanelRegisterUrl("referral");
export const PARTNER_PANEL_REGISTER_WHITE_LABEL = () => partnerPanelRegisterUrl("white_label");

/** Media paths for the partners explainer video (optional until assets ship). */
export const PARTNERS_VIDEO_SRC = "/videos/partners/tivonix-partners.mp4";
export const PARTNERS_VIDEO_POSTER = "/images/partners/tivonix-partners-poster.png";

/**
 * Flip to true when both video + poster are present under public/.
 * Missing today — do not render a broken <video>.
 */
export const PARTNERS_VIDEO_AVAILABLE = false;
