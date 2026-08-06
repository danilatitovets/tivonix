import type { MilesealDemoExample } from "../data/milesealDemo";

export type DemoMode = "preset" | "custom";

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
};

export type DemoAction =
  | { type: "selectScenario"; example: MilesealDemoExample }
  | { type: "editExample" }
  | { type: "restoreExample"; example: MilesealDemoExample }
  | { type: "setScope"; value: string }
  | { type: "setRequest"; value: string }
  | { type: "analyzeStart" }
  | { type: "analyzeSuccess"; result: DemoResult; scenarioId: string }
  | { type: "openChangeRequest" }
  | { type: "copied" }
  | { type: "clearCopied" }
  | { type: "startOver"; example: MilesealDemoExample }
  | { type: "syncLangPreset"; example: MilesealDemoExample };

export function createInitialDemoState(example: MilesealDemoExample): DemoState {
  return {
    selectedScenarioId: example.id,
    mode: "preset",
    scope: example.scope,
    request: example.request,
    result: null,
    isChangeRequestOpen: false,
    analyzing: false,
    copied: false,
  };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "selectScenario":
    case "restoreExample":
    case "startOver":
      return {
        ...state,
        selectedScenarioId: action.example.id,
        mode: "preset",
        scope: action.example.scope,
        request: action.example.request,
        result: null,
        isChangeRequestOpen: false,
        analyzing: false,
        copied: false,
      };
    case "editExample":
      return {
        ...state,
        mode: "custom",
        result: null,
        isChangeRequestOpen: false,
        analyzing: false,
        copied: false,
      };
    case "setScope":
      return {
        ...state,
        mode: "custom",
        scope: action.value,
        result: null,
        isChangeRequestOpen: false,
        copied: false,
      };
    case "setRequest":
      return {
        ...state,
        mode: "custom",
        request: action.value,
        result: null,
        isChangeRequestOpen: false,
        copied: false,
      };
    case "analyzeStart":
      if (state.mode !== "preset") return state;
      return {
        ...state,
        analyzing: true,
        isChangeRequestOpen: false,
        copied: false,
      };
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
          result: state.mode === "preset" ? state.result : null,
        };
      }
      return {
        ...state,
        analyzing: false,
        result: action.result,
        isChangeRequestOpen: false,
        copied: false,
      };
    case "openChangeRequest":
      if (!state.result) return state;
      return { ...state, isChangeRequestOpen: true };
    case "copied":
      return { ...state, copied: true };
    case "clearCopied":
      return { ...state, copied: false };
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
      };
    }
    default:
      return state;
  }
}
