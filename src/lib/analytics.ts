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
  | "mileseal_scope"
  | "mileseal_scope_review"
  | "mileseal_scope_leakage_audit"
  | "direction_leads"
  | "direction_product"
  | "founder"
  | "compare"
  | "footer"
  | "partners"
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

type AnalyticsTestEvent = { name: string; props?: AnalyticsProps };
let testSink: AnalyticsTestEvent[] | null = null;
const milesealOnceKeys = new Set<string>();

export function trackEvent(
  name: HotjarEventName | string,
  props?: AnalyticsProps
): void {
  const safe = scrub(props);
  if (testSink) {
    testSink.push({ name, props: safe });
  }
  trackHotjarEvent(name as HotjarEventName);
  trackPartnersEvent(name, safe);
}

/** Test-only sink for MileSeal analytics assertions. */
export function __setAnalyticsTestSink(enabled: boolean): void {
  testSink = enabled ? [] : null;
}

export function __readAnalyticsTestSink(): AnalyticsTestEvent[] {
  return testSink ? [...testSink] : [];
}

export function __resetAnalyticsTestSink(): void {
  if (testSink) testSink.length = 0;
  milesealOnceKeys.clear();
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

/** Fire a MileSeal analytics event at most once per page session. */
export function trackMilesealOnce(
  key: string,
  name: string,
  props?: AnalyticsProps
): void {
  if (milesealOnceKeys.has(key)) return;
  milesealOnceKeys.add(key);
  trackEvent(name, props);
}

export function trackMilesealDemoStarted(props?: AnalyticsProps): void {
  trackMilesealOnce("mileseal_demo_started", "mileseal_demo_started", props);
}

export function trackMilesealCaseOpened(props?: AnalyticsProps): void {
  trackMilesealOnce("mileseal_case_opened", "mileseal_case_opened", props);
}

export function trackMilesealManualReviewOpened(props?: AnalyticsProps): void {
  trackEvent("mileseal_manual_review_opened", props);
}

export function trackMilesealManualReviewSubmitted(props?: AnalyticsProps): void {
  trackEvent("mileseal_manual_review_submitted", props);
}

export function trackMilesealSampleDownloaded(props?: AnalyticsProps): void {
  trackEvent("mileseal_sample_downloaded", props);
}

export function trackMilesealAuditRequested(props?: AnalyticsProps): void {
  trackEvent("mileseal_audit_requested", props);
}
