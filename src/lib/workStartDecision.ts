import type { Lang } from "../i18n/LangProvider";
import {
  workStartDecisionCopy,
  type WorkStartAuthorization,
  type WorkStartDecisionChoice,
  type WorkStartDecisionLabels,
} from "../i18n/workStartDecisionCopy.ts";

export type { WorkStartAuthorization, WorkStartDecisionChoice };
export type WorkStartDecisionState = {
  owner: string;
  decision: WorkStartDecisionChoice | "";
  rationale: string;
  authorization: WorkStartAuthorization;
  decisionDate: string;
  saved: boolean;
  stale: boolean;
  saveError: boolean;
  fieldErrors: Partial<
    Record<"owner" | "decision" | "rationale" | "decisionDate" | "authorization", string>
  >;
};

export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function createDefaultWorkStartDecision(scenarioId?: string): WorkStartDecisionState {
  const decision: WorkStartDecisionChoice | "" =
    scenarioId === "content-migration" ? "price" : "";
  return {
    owner: "",
    decision,
    rationale: "",
    authorization: "approval_required",
    decisionDate: todayIsoDate(),
    saved: false,
    stale: false,
    saveError: false,
    fieldErrors: {},
  };
}

export function invalidateWorkStartDecision(
  prev: WorkStartDecisionState,
  scenarioId?: string
): WorkStartDecisionState {
  return {
    ...createDefaultWorkStartDecision(scenarioId),
    stale: prev.saved,
  };
}

export function validateWorkStartDecision(
  state: WorkStartDecisionState,
  labels: WorkStartDecisionLabels
): WorkStartDecisionState {
  const fieldErrors: WorkStartDecisionState["fieldErrors"] = {};
  if (!state.owner.trim()) fieldErrors.owner = labels.errOwner;
  if (!state.decision) fieldErrors.decision = labels.errDecision;
  if (!state.rationale.trim()) fieldErrors.rationale = labels.errRationale;
  if (!state.decisionDate.trim()) fieldErrors.decisionDate = labels.errDate;

  if (state.authorization === "work_may_start") {
    if (!state.owner.trim()) fieldErrors.owner = labels.errOwner;
    if (!state.decision) fieldErrors.decision = labels.errDecision;
    if (!state.rationale.trim()) fieldErrors.rationale = labels.errRationale;
    if (!state.decisionDate.trim()) fieldErrors.decisionDate = labels.errDate;
    if (Object.keys(fieldErrors).length > 0) {
      fieldErrors.authorization = labels.errWorkMayStart;
    }
  }

  return {
    ...state,
    fieldErrors,
    saveError: Object.keys(fieldErrors).length > 0,
    saved: Object.keys(fieldErrors).length === 0,
    stale: false,
  };
}

export function decisionLabel(
  decision: WorkStartDecisionChoice | "",
  labels: WorkStartDecisionLabels
): string {
  if (!decision) return "—";
  return labels.decisions[decision];
}

export function authorizationLabel(
  authorization: WorkStartAuthorization,
  labels: WorkStartDecisionLabels
): string {
  return labels.authorization[authorization];
}

export function formatWorkStartDecisionBlock(
  state: WorkStartDecisionState,
  lang: Lang
): string {
  const labels = workStartDecisionCopy(lang);
  if (!state.saved || state.stale) return "";

  return [
    labels.documentHeading,
    `${labels.ownerLabel}: ${state.owner.trim()}`,
    `${labels.decisionLabel}: ${decisionLabel(state.decision, labels)}`,
    `${labels.rationaleLabel}: ${state.rationale.trim()}`,
    `${labels.authorizationLabel}: ${authorizationLabel(state.authorization, labels)}`,
    `${labels.dateLabel}: ${state.decisionDate.trim()}`,
  ].join("\n");
}

export function appendWorkStartDecisionToText(
  base: string,
  state: WorkStartDecisionState,
  lang: Lang
): string {
  const block = formatWorkStartDecisionBlock(state, lang);
  if (!block) return base;
  return `${base.trim()}\n\n${block}`;
}
