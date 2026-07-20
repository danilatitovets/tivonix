/**
 * Unified analytics helper — Hotjar + Google Ads/gtag.
 * Never send PII (name, email, phone, telegram, task text).
 */

import { trackHotjarEvent, type HotjarEventName } from "./hotjar";
import { trackAdsConversion, trackPartnersEvent } from "./ads";

export type CtaSource =
  | "hero"
  | "hero_projects"
  | "projects"
  | "project_page"
  | "final_cta"
  | "contacts"
  | "mobile_sticky"
  | "header"
  | "main_offer"
  | "cases"
  | "audience"
  | "pricing"
  | "pricing_help"
  | "service_websites"
  | "service_automation"
  | "direction_leads"
  | "direction_product"
  | "founder"
  | "compare"
  | "footer"
  | "unknown";

const CTA_SOURCE_KEY = "tivonix_cta_source";

export function setCtaSource(source: CtaSource): void {
  try {
    sessionStorage.setItem(CTA_SOURCE_KEY, source);
  } catch {
    /* ignore */
  }
}

export function getCtaSource(): CtaSource {
  try {
    const v = sessionStorage.getItem(CTA_SOURCE_KEY);
    if (v) return v as CtaSource;
  } catch {
    /* ignore */
  }
  return "unknown";
}

/** Safe props only — no form field values. */
export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

function scrub(props?: AnalyticsProps): AnalyticsProps | undefined {
  if (!props) return undefined;
  const out: AnalyticsProps = {};
  for (const [k, v] of Object.entries(props)) {
    const key = k.toLowerCase();
    if (
      key.includes("email") ||
      key.includes("phone") ||
      key.includes("telegram") ||
      key.includes("name") ||
      key.includes("task") ||
      key.includes("contact") ||
      key.includes("message") ||
      key.includes("detail")
    ) {
      continue;
    }
    if (typeof v === "string" && v.length > 80) continue;
    out[k] = v;
  }
  return out;
}

export function trackEvent(
  name: HotjarEventName | string,
  props?: AnalyticsProps
): void {
  const safe = scrub(props);
  trackHotjarEvent(name as HotjarEventName);
  trackPartnersEvent(name, safe);
}

export function trackCtaPrimaryClick(source: CtaSource): void {
  setCtaSource(source);
  trackEvent("cta_primary_click", { source });
  if (source === "hero") trackEvent("hero_primary_cta_click", { source });
}

export function trackHeroProjectsClick(): void {
  trackEvent("hero_projects_click");
}

export function trackLeadFormOpen(source: CtaSource): void {
  setCtaSource(source);
  trackEvent("lead_form_open", { source });
}

export function trackLeadFormStart(): void {
  trackEvent("lead_form_start");
}

export function trackLeadFormValidationError(field?: string): void {
  trackEvent("lead_form_validation_error", field ? { field } : undefined);
}

export function trackLeadFormSubmit(source: CtaSource): void {
  trackEvent("lead_form_submit", { source });
  trackAdsConversion("form_request");
}

export function trackLeadFormSuccess(source: CtaSource): void {
  trackEvent("lead_form_success", { source });
}

export function trackLeadFormServerError(): void {
  trackEvent("lead_form_server_error");
}

export function trackLeadFormAbandon(source: CtaSource): void {
  trackEvent("lead_form_abandon", { source });
}

export function trackTelegramDirectClick(): void {
  trackEvent("telegram_direct_click");
}

export function trackTelegramBotClick(): void {
  trackEvent("telegram_bot_click");
}

export function trackEmailClick(): void {
  trackEvent("email_click");
}

export function trackProjectView(slug: string): void {
  trackEvent("project_view", { slug: slug.slice(0, 40) });
}

export function trackPricingView(): void {
  trackEvent("pricing_view");
}
