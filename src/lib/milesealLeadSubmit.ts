import type { Lang } from "../i18n/LangProvider";
import type { CtaSource } from "./analytics";
import { buildLeadMeta, submitLead, type LeadSubmitResult } from "./leads";
import type { ScopeFormPrefill } from "../data/milesealDemo";

export type MilesealLeadVariant = "review" | "audit";

export type MilesealLeadFormInput = {
  lang: Lang;
  variant: MilesealLeadVariant;
  name: string;
  email: string;
  agency: string;
  clientRequest: string;
  agreedScope: string;
  consent: boolean;
  honeypot: string;
  prefill?: ScopeFormPrefill | null;
};

export function milesealLeadCtaSource(variant: MilesealLeadVariant): CtaSource {
  return variant === "audit" ? "mileseal_scope_leakage_audit" : "mileseal_scope_review";
}

export function buildMilesealLeadTask(input: MilesealLeadFormInput): string {
  const isAudit = input.variant === "audit";
  const labels =
    input.lang === "ru"
      ? {
          agency: "Агентство",
          scope: "Согласованный объём",
          request: "Запрос клиента",
          draft: "Черновик change request",
        }
      : input.lang === "zh"
        ? {
            agency: "代理商",
            scope: "已约定范围",
            request: "客户请求",
            draft: "变更请求草稿",
          }
        : {
            agency: "Agency",
            scope: "Agreed scope excerpt",
            request: "Later client request",
            draft: "Demo change request draft",
          };

  const header = isAudit
    ? "[MileSeal Scope Leakage Audit — $350]"
    : "[MileSeal human scope review]";

  const parts = [
    header,
    input.agency.trim() ? `${labels.agency}: ${input.agency.trim()}` : null,
    "",
    `${labels.scope}:`,
    input.agreedScope.trim(),
    "",
    `${labels.request}:`,
    input.clientRequest.trim(),
    input.prefill?.changeRequest ? `\n${labels.draft}:\n${input.prefill.changeRequest}` : null,
  ].filter((line): line is string => line !== null);

  return parts.join("\n");
}

export function buildMilesealLeadBody(input: MilesealLeadFormInput) {
  const ctaSource = milesealLeadCtaSource(input.variant);
  const meta =
    input.variant === "audit"
      ? buildLeadMeta(ctaSource, undefined, {
          offer: "scope_leakage_audit",
          amount: 350,
          currency: "USD",
        })
      : buildLeadMeta(ctaSource);

  return {
    name: input.name.trim() || input.agency.trim() || "MileSeal",
    contact: input.email.trim(),
    task: buildMilesealLeadTask(input),
    budget: "unknown" as const,
    consent: true,
    company_fax_url: input.honeypot,
    lang: input.lang,
    meta,
  };
}

export async function submitMilesealLead(
  input: MilesealLeadFormInput,
  fetchImpl: typeof fetch = fetch
): Promise<LeadSubmitResult> {
  const body = buildMilesealLeadBody(input);
  try {
    const res = await fetchImpl("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      fallback?: boolean;
    };
    if (res.ok && data.ok) return { ok: true };
    return {
      ok: false,
      error: data.error || `http_${res.status}`,
      fallback: data.fallback || res.status >= 500,
    };
  } catch {
    return { ok: false, error: "network_error", fallback: true };
  }
}
