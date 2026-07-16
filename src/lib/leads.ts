import type { CtaSource } from "./analytics";
import { getCtaSource } from "./analytics";

export type BudgetId =
  | "under_500"
  | "500_1500"
  | "1500_5000"
  | "from_5000"
  | "unknown"
  | "";

export type LeadFormFields = {
  name: string;
  contact: string;
  task: string;
  budget: BudgetId;
  consent: boolean;
  /** Honeypot — must stay empty (avoid name "website": browsers autofill it) */
  company_fax_url: string;
};

export type LeadMeta = {
  url: string;
  page: string;
  ctaSource: CtaSource;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  datetime: string;
  planId?: string;
  planName?: string;
};

export type LeadSubmitBody = {
  name: string;
  contact: string;
  task: string;
  budget: BudgetId;
  consent: boolean;
  company_fax_url: string;
  lang: string;
  planId?: string;
  meta: LeadMeta;
};

export type LeadSubmitResult =
  | { ok: true; emailSent?: boolean; telegramSent?: boolean }
  | { ok: false; error: string; fallback?: boolean };

function readUtm(param: string): string {
  if (typeof window === "undefined") return "";
  try {
    return new URL(window.location.href).searchParams.get(param) || "";
  } catch {
    return "";
  }
}

export function buildLeadMeta(
  ctaSource?: CtaSource,
  plan?: { id?: string; name?: string }
): LeadMeta {
  const source = ctaSource || getCtaSource();
  return {
    url: typeof window !== "undefined" ? window.location.href : "",
    page: typeof window !== "undefined" ? window.location.pathname : "",
    ctaSource: source,
    referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    utmSource: readUtm("utm_source"),
    utmMedium: readUtm("utm_medium"),
    utmCampaign: readUtm("utm_campaign"),
    datetime: new Date().toISOString(),
    planId: plan?.id,
    planName: plan?.name,
  };
}

const DRAFT_KEY = "tivonix_lead_draft_v1";

export function loadLeadDraft(): Partial<LeadFormFields> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<LeadFormFields>;
  } catch {
    return null;
  }
}

export function saveLeadDraft(fields: LeadFormFields): void {
  if (typeof window === "undefined") return;
  try {
    const { company_fax_url: _honeypot, ...rest } = fields;
    void _honeypot;
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
  } catch {
    /* ignore */
  }
}

export function clearLeadDraft(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/** Sensible default budget chip for a pricing plan */
export function suggestedBudgetForPlan(planId: string | null | undefined): BudgetId {
  switch (planId) {
    case "start":
      return "500_1500";
    case "growth":
      return "1500_5000";
    case "product":
      return "from_5000";
    case "custom":
      return "unknown";
    default:
      return "";
  }
}

export function validateLeadFields(fields: LeadFormFields): {
  ok: boolean;
  field?: "contact" | "task" | "consent";
  messageKey?: "contact" | "task" | "consent";
} {
  if (!fields.contact.trim() || fields.contact.trim().length < 3) {
    return { ok: false, field: "contact", messageKey: "contact" };
  }
  if (!fields.task.trim() || fields.task.trim().length < 5) {
    return { ok: false, field: "task", messageKey: "task" };
  }
  if (!fields.consent) {
    return { ok: false, field: "consent", messageKey: "consent" };
  }
  return { ok: true };
}

export async function submitLead(
  body: LeadSubmitBody,
  signal?: AbortSignal
): Promise<LeadSubmitResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      fallback?: boolean;
      emailSent?: boolean;
      telegramSent?: boolean;
    };

    if (res.ok && data.ok) {
      return {
        ok: true,
        emailSent: data.emailSent,
        telegramSent: data.telegramSent,
      };
    }

    return {
      ok: false,
      error: data.error || `http_${res.status}`,
      fallback: data.fallback || res.status >= 500,
    };
  } catch {
    return { ok: false, error: "network_error", fallback: true };
  }
}

export const CONTACT_EMAIL = "tivoonix@gmail.com";
export const TELEGRAM_DIRECT_URL = "https://t.me/TIVONIX";
