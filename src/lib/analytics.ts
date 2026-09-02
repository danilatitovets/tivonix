/**
 * Unified analytics helper — routes events through analyticsAdapter.
 * Never send PII (name, email, phone, telegram, task text).
 */

import { trackAnalyticsEvent, trackAdsFormConversion } from "./analyticsAdapter";

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

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

type AnalyticsTestEvent = { name: string; props?: AnalyticsProps };
let testSink: AnalyticsTestEvent[] | null = null;
const milesealOnceKeys = new Set<string>();

function readLocale(): string {
  if (typeof document === "undefined") return "ru";
  return document.documentElement.lang || "ru";
}

function readPath(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

function readUtm(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  if (typeof window === "undefined") return {};
  try {
    const p = new URL(window.location.href).searchParams;
    return {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
    };
  } catch {
    return {};
  }
}

function baseProps(extra?: AnalyticsProps): AnalyticsProps {
  return {
    locale: readLocale(),
    page_path: readPath(),
    ...readUtm(),
    ...extra,
  };
}

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

export function trackEvent(name: string, props?: AnalyticsProps): void {
  const safe = scrub(baseProps(props));
  if (testSink) {
    testSink.push({ name, props: safe });
  }
  trackAnalyticsEvent(name, safe);
}

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
  trackEvent("cta_click", { cta_source: source });
}

export function trackHeroProjectsClick(): void {
  trackEvent("cta_click", { cta_source: "hero_projects" });
}

export function trackLeadFormOpen(source: CtaSource): void {
  setCtaSource(source);
  trackEvent("form_open", { cta_source: source });
}

export function trackLeadFormStart(): void {
  trackEvent("form_start", { cta_source: getCtaSource() });
}

export function trackLeadFormValidationError(field?: string): void {
  trackEvent("form_validation_error", field ? { field } : undefined);
}

export function trackLeadFormSubmit(source: CtaSource): void {
  trackEvent("form_submit_success", { cta_source: source });
  trackAdsFormConversion();
}

export function trackLeadFormSuccess(source: CtaSource): void {
  trackEvent("form_submit_success", { cta_source: source });
}

export function trackLeadFormServerError(): void {
  trackEvent("form_submit_error");
}

export function trackLeadFormAbandon(source: CtaSource): void {
  trackEvent("form_submit_error", { cta_source: source, reason: "abandon" });
}

export function trackTelegramDirectClick(): void {
  trackEvent("telegram_click");
}

export function trackTelegramBotClick(): void {
  trackEvent("telegram_click", { channel: "bot" });
}

export function trackEmailClick(): void {
  trackEvent("email_click");
}

export function trackPartnerCtaClick(type: string): void {
  trackEvent("partner_cta_click", { partner_type: type });
}

export function trackProjectView(slug: string): void {
  trackEvent("project_view", { slug: slug.slice(0, 40) });
}

export function trackExternalProjectClick(slug: string): void {
  trackEvent("external_project_click", { slug: slug.slice(0, 40) });
}

export function trackPricingView(): void {
  trackEvent("pricing_view");
}

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

/** @deprecated use trackAdsFormConversion from analyticsAdapter */
export { trackAdsFormConversion as trackAdsConversion } from "./analyticsAdapter";
