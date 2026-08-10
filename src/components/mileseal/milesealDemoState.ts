import type { MilesealDemoExample } from "../../data/milesealDemo";
import {
  createDefaultWorkStartDecision,
  invalidateWorkStartDecision,
  type WorkStartDecisionState,
} from "../../lib/workStartDecision.ts";

export type DemoMode = "preset" | "custom";
export type DemoTone = "neutral" | "soft" | "formal";
export type DemoWorkspaceStage =
  | "empty"
  | "ready"
  | "analyzing"
  | "result"
  | "manual-review";

export type DemoResult = MilesealDemoExample["result"];

export type DemoState = {
  selectedScenarioId: string;
  mode: DemoMode;
  scope: string;
  request: string;
  result: DemoResult | null;
  isChangeRequestOpen: boolean;
  analyzing: boolean;
  copied: boolean;
  /** Workspace UI */
  stage: DemoWorkspaceStage;
  activeAnalysisStep: number;
  activeTone: DemoTone;
  copyError: boolean;
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  sessionStarted: boolean;
  workStartDecision: WorkStartDecisionState;
};

export type DemoAction =
  | { type: "selectScenario"; example: MilesealDemoExample }
  | { type: "editExample" }
  | { type: "restoreExample"; example: MilesealDemoExample }
  | { type: "setScope"; value: string }
  | { type: "setRequest"; value: string }
  | { type: "analyzeStart" }
  | { type: "setAnalysisStep"; step: number }
  | { type: "analyzeSuccess"; result: DemoResult; scenarioId: string }
  | { type: "openChangeRequest" }
  | { type: "closeChangeRequest" }
  | { type: "setTone"; tone: DemoTone }
  | { type: "copied" }
  | { type: "copyFailed" }
  | { type: "clearCopied" }
  | { type: "startOver"; example: MilesealDemoExample }
  | { type: "newAnalysis" }
  | { type: "enterManualReview" }
  | { type: "toggleSidebarCollapsed" }
  | { type: "setMobileNavOpen"; open: boolean }
  | { type: "syncLangPreset"; example: MilesealDemoExample }
  | { type: "setWorkStartDecision"; value: WorkStartDecisionState };

function baseFromExample(example: MilesealDemoExample): Pick<
  DemoState,
  "selectedScenarioId" | "mode" | "scope" | "request"
> {
  return {
    selectedScenarioId: example.id,
    mode: "preset",
    scope: example.scope,
    request: example.request,
  };
}

export function createInitialDemoState(example: MilesealDemoExample): DemoState {
  return {
    ...baseFromExample(example),
    result: null,
    isChangeRequestOpen: false,
    analyzing: false,
    copied: false,
    stage: "empty",
    activeAnalysisStep: 0,
    activeTone: "neutral",
    copyError: false,
    isSidebarCollapsed: false,
    isMobileNavOpen: false,
    sessionStarted: false,
    workStartDecision: createDefaultWorkStartDecision(example.id),
  };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "selectScenario":
    case "restoreExample":
      return {
        ...state,
        ...baseFromExample(action.example),
        result: null,
        isChangeRequestOpen: false,
        analyzing: false,
        copied: false,
        copyError: false,
        stage: "ready",
        activeAnalysisStep: 0,
        activeTone: "neutral",
        sessionStarted: true,
        isMobileNavOpen: false,
        workStartDecision: createDefaultWorkStartDecision(action.example.id),
      };
    case "startOver":
      return {
        ...createInitialDemoState(action.example),
        ...baseFromExample(action.example),
        stage: "ready",
        sessionStarted: true,
        isSidebarCollapsed: state.isSidebarCollapsed,
        workStartDecision: createDefaultWorkStartDecision(action.example.id),
      };
    case "newAnalysis":
      return {
        ...createInitialDemoState({
          id: state.selectedScenarioId,
          label: "",
          scope: "",
          request: "",
          result: {
            status: "",
            hoursValue: "",
            costValue: "",
            timelineValue: "",
            confidence: "",
            reason: "",
            recommendation: "",
            effortItems: [],
            changeRequest: "",
            changeRequestSoft: "",
            changeRequestFormal: "",
          },
        }),
        selectedScenarioId: state.selectedScenarioId,
        isSidebarCollapsed: state.isSidebarCollapsed,
        workStartDecision: createDefaultWorkStartDecision(state.selectedScenarioId),
      };
    case "editExample":
      return {
        ...state,
        mode: "custom",
        result: null,
        isChangeRequestOpen: false,
        analyzing: false,
        copied: false,
        copyError: false,
        stage: state.sessionStarted ? "ready" : "empty",
        activeAnalysisStep: 0,
        workStartDecision: invalidateWorkStartDecision(
          state.workStartDecision,
          state.selectedScenarioId
        ),
      };
    case "setScope":
      return {
        ...state,
        mode: "custom",
        scope: action.value,
        result: null,
        isChangeRequestOpen: false,
        copied: false,
        copyError: false,
        stage: state.sessionStarted ? "ready" : "empty",
        workStartDecision: invalidateWorkStartDecision(
          state.workStartDecision,
          state.selectedScenarioId
        ),
      };
    case "setRequest":
      return {
        ...state,
        mode: "custom",
        request: action.value,
        result: null,
        isChangeRequestOpen: false,
        copied: false,
        copyError: false,
        stage: state.sessionStarted ? "ready" : "empty",
        workStartDecision: invalidateWorkStartDecision(
          state.workStartDecision,
          state.selectedScenarioId
        ),
      };
    case "analyzeStart":
      if (state.mode !== "preset") return state;
      return {
        ...state,
        analyzing: true,
        isChangeRequestOpen: true,
        copied: false,
        copyError: false,
        stage: "analyzing",
        activeAnalysisStep: 0,
        sessionStarted: true,
        workStartDecision: invalidateWorkStartDecision(
          state.workStartDecision,
          state.selectedScenarioId
        ),
      };
    case "setAnalysisStep":
      return { ...state, activeAnalysisStep: action.step };
    case "analyzeSuccess":
      // Ignore stale timeouts after scenario switch, lang sync, restore, or custom edit.
      if (
        state.mode !== "preset" ||
        state.selectedScenarioId !== action.scenarioId ||
        !state.analyzing
      ) {
        return {
          ...state,
          analyzing: false,
          stage: state.mode === "preset" && state.result ? "result" : state.stage,
          result: state.mode === "preset" ? state.result : null,
        };
      }
      return {
        ...state,
        analyzing: false,
        result: action.result,
        isChangeRequestOpen: true,
        copied: false,
        copyError: false,
        stage: "result",
        activeTone: "neutral",
        workStartDecision: createDefaultWorkStartDecision(action.scenarioId),
      };
    case "openChangeRequest":
      if (!state.result) return state;
      return { ...state, isChangeRequestOpen: true };
    case "closeChangeRequest":
      return { ...state, isChangeRequestOpen: false };
    case "setTone":
      return { ...state, activeTone: action.tone };
    case "copied":
      return { ...state, copied: true, copyError: false };
    case "copyFailed":
      return { ...state, copied: false, copyError: true };
    case "clearCopied":
      return { ...state, copied: false, copyError: false };
    case "enterManualReview":
      return {
        ...state,
        mode: "custom",
        stage: "manual-review",
        analyzing: false,
        result: null,
        isChangeRequestOpen: false,
        sessionStarted: true,
      };
    case "toggleSidebarCollapsed":
      return { ...state, isSidebarCollapsed: !state.isSidebarCollapsed };
    case "setMobileNavOpen":
      return { ...state, isMobileNavOpen: action.open };
    case "syncLangPreset": {
      if (state.mode !== "preset") return state;
      const hadResult = Boolean(state.result);
      return {
        ...state,
        selectedScenarioId: action.example.id,
        scope: action.example.scope,
        request: action.example.request,
        result: hadResult ? action.example.result : null,
        isChangeRequestOpen: hadResult ? state.isChangeRequestOpen : false,
        analyzing: false,
        copied: false,
        copyError: false,
        stage: !state.sessionStarted
          ? "empty"
          : hadResult
            ? "result"
            : "ready",
        activeTone: "neutral",
        workStartDecision: hadResult
          ? state.workStartDecision
          : createDefaultWorkStartDecision(action.example.id),
      };
    }
    case "setWorkStartDecision":
      return { ...state, workStartDecision: action.value };
    default:
      return state;
  }
}

export function changeRequestForTone(result: DemoResult, tone: DemoTone): string {
  if (tone === "soft") return result.changeRequestSoft || result.changeRequest;
  if (tone === "formal") return result.changeRequestFormal || result.changeRequest;
  return result.changeRequest;
}
