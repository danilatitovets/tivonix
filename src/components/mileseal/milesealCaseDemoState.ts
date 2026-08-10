import type { CaseTone } from "../../i18n/milesealCaseCopy";
import {
  createDefaultWorkStartDecision,
  invalidateWorkStartDecision,
  type WorkStartDecisionState,
} from "../../lib/workStartDecision.ts";

export type DemoStage = "ready" | "analyzing" | "result";

export const CASE_DEMO_DEFAULT_RATE = 80;
export const CASE_DEMO_DEFAULT_CAPACITY = 8;

export type CaseDemoState = {
  stage: DemoStage;
  agencyRate: number;
  deliveryHoursPerDay: number;
  rateInput: string;
  capacityInput: string;
  rateInvalid: boolean;
  capacityInvalid: boolean;
  selectedTone: CaseTone;
  copied: boolean;
  copyError: boolean;
  activeAnalysisStep: number;
  hasRunDemo: boolean;
  workStartDecision: WorkStartDecisionState;
};

export type CaseDemoAction =
  | { type: "setRateInput"; value: string }
  | { type: "setCapacityInput"; value: string }
  | { type: "commitRate" }
  | { type: "commitCapacity" }
  | { type: "startAnalysis" }
  | { type: "startAnalysisWith"; rate: number; capacity: number }
  | { type: "setAnalysisStep"; step: number }
  | { type: "finishAnalysis" }
  | { type: "showResultImmediate" }
  | { type: "setTone"; tone: CaseTone }
  | { type: "resetTone" }
  | { type: "copied" }
  | { type: "copyFailed" }
  | { type: "clearCopyStatus" }
  | { type: "reset" }
  | { type: "setWorkStartDecision"; value: WorkStartDecisionState };

function clampRate(n: number): number {
  return Math.min(500, Math.max(10, n));
}

function clampCapacity(n: number): number {
  return Math.min(24, Math.max(1, n));
}

function parsePositive(value: string): number | null {
  const cleaned = value.trim().replace(",", ".");
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function createInitialCaseDemoState(opts?: { startInResult?: boolean }): CaseDemoState {
  const startInResult = opts?.startInResult ?? false;
  return {
    stage: startInResult ? "result" : "ready",
    agencyRate: CASE_DEMO_DEFAULT_RATE,
    deliveryHoursPerDay: CASE_DEMO_DEFAULT_CAPACITY,
    rateInput: String(CASE_DEMO_DEFAULT_RATE),
    capacityInput: String(CASE_DEMO_DEFAULT_CAPACITY),
    rateInvalid: false,
    capacityInvalid: false,
    selectedTone: "neutral",
    copied: false,
    copyError: false,
    activeAnalysisStep: -1,
    hasRunDemo: startInResult,
    workStartDecision: createDefaultWorkStartDecision("content-migration"),
  };
}

export function caseDemoReducer(state: CaseDemoState, action: CaseDemoAction): CaseDemoState {
  switch (action.type) {
    case "setRateInput":
      return {
        ...state,
        rateInput: action.value,
        rateInvalid: false,
        copied: false,
        copyError: false,
      };
    case "setCapacityInput":
      return {
        ...state,
        capacityInput: action.value,
        capacityInvalid: false,
        copied: false,
        copyError: false,
      };
    case "commitRate": {
      const parsed = parsePositive(state.rateInput);
      if (parsed == null || parsed < 10 || parsed > 500) {
        return { ...state, rateInvalid: true };
      }
      const next = clampRate(Math.round(parsed * 100) / 100);
      return {
        ...state,
        agencyRate: next,
        rateInput: String(next),
        rateInvalid: false,
      };
    }
    case "commitCapacity": {
      const parsed = parsePositive(state.capacityInput);
      if (parsed == null || parsed < 1 || parsed > 24) {
        return { ...state, capacityInvalid: true };
      }
      const next = clampCapacity(Math.round(parsed));
      return {
        ...state,
        deliveryHoursPerDay: next,
        capacityInput: String(next),
        capacityInvalid: false,
      };
    }
    case "startAnalysis":
      if (state.stage === "analyzing") return state;
      return {
        ...state,
        stage: "analyzing",
        activeAnalysisStep: 0,
        hasRunDemo: true,
        copied: false,
        copyError: false,
        workStartDecision: invalidateWorkStartDecision(state.workStartDecision, "content-migration"),
      };
    case "startAnalysisWith": {
      if (state.stage === "analyzing") return state;
      const rate = clampRate(Math.round(action.rate * 100) / 100);
      const capacity = clampCapacity(Math.round(action.capacity));
      return {
        ...state,
        agencyRate: rate,
        deliveryHoursPerDay: capacity,
        rateInput: String(rate),
        capacityInput: String(capacity),
        rateInvalid: false,
        capacityInvalid: false,
        stage: "analyzing",
        activeAnalysisStep: 0,
        hasRunDemo: true,
        copied: false,
        copyError: false,
        workStartDecision: invalidateWorkStartDecision(state.workStartDecision, "content-migration"),
      };
    }
    case "setAnalysisStep":
      return { ...state, activeAnalysisStep: action.step };
    case "finishAnalysis":
      return {
        ...state,
        stage: "result",
        activeAnalysisStep: 3,
        hasRunDemo: true,
        workStartDecision: createDefaultWorkStartDecision("content-migration"),
      };
    case "showResultImmediate":
      return {
        ...state,
        stage: "result",
        activeAnalysisStep: 3,
        hasRunDemo: true,
        copied: false,
        copyError: false,
      };
    case "setTone":
      return {
        ...state,
        selectedTone: action.tone,
        copied: false,
        copyError: false,
      };
    case "resetTone":
      return {
        ...state,
        selectedTone: "neutral",
        copied: false,
        copyError: false,
      };
    case "copied":
      return { ...state, copied: true, copyError: false };
    case "copyFailed":
      return { ...state, copied: false, copyError: true };
    case "clearCopyStatus":
      return { ...state, copied: false, copyError: false };
    case "reset":
      return createInitialCaseDemoState();
    case "setWorkStartDecision":
      return { ...state, workStartDecision: action.value };
    default:
      return state;
  }
}
