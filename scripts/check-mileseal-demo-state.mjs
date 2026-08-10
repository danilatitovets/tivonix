/**
 * Unit checks for MileSeal demo state machine.
 * Run: npx tsx scripts/check-mileseal-demo-state.mjs
 */
import assert from "node:assert/strict";
import {
  createInitialDemoState,
  demoReducer,
} from "../src/components/mileseal/milesealDemoState.ts";

const ex1 = {
  id: "homepage-authors",
  label: "Content migration",
  scope: "Scope A",
  request: "Request A",
  result: {
    status: "Out of scope",
    hoursValue: "14–18",
    costValue: "$840–$1,080",
    timelineValue: "3–5 days",
    confidence: "High",
    reason: "Reason A",
    recommendation: "Rec A",
    effortItems: ["Item A — 14–18 hours"],
    changeRequest: "CR A",
    changeRequestSoft: "CR A soft",
    changeRequestFormal: "CR A formal",
  },
};

const ex2 = {
  id: "integrations",
  label: "Extra integrations",
  scope: "Scope B",
  request: "Request B",
  result: {
    status: "Out of scope",
    hoursValue: "22–30",
    costValue: "$1,320–$1,800",
    timelineValue: "5–8 days",
    confidence: "High",
    reason: "Reason B",
    recommendation: "Rec B",
    effortItems: ["Item B — 22–30 hours"],
    changeRequest: "CR B",
    changeRequestSoft: "CR B soft",
    changeRequestFormal: "CR B formal",
  },
};

let s = createInitialDemoState(ex1);
assert.equal(s.mode, "preset");
assert.equal(s.result, null);
assert.equal(s.scope, "Scope A");

s = demoReducer(s, { type: "analyzeStart" });
assert.equal(s.analyzing, true);
s = demoReducer(s, {
  type: "analyzeSuccess",
  result: ex1.result,
  scenarioId: ex1.id,
});
assert.equal(s.result?.reason, "Reason A");
assert.equal(s.mode, "preset");

s = demoReducer(s, { type: "editExample" });
assert.equal(s.mode, "custom");
assert.equal(s.result, null);

s = demoReducer(s, { type: "setScope", value: "hello" });
assert.equal(s.mode, "custom");
assert.equal(s.scope, "hello");
assert.equal(s.result, null);

s = demoReducer(s, { type: "selectScenario", example: ex2 });
assert.equal(s.mode, "preset");
assert.equal(s.scope, "Scope B");
assert.equal(s.request, "Request B");
assert.equal(s.result, null);

s = demoReducer(s, { type: "analyzeStart" });
s = demoReducer(s, {
  type: "analyzeSuccess",
  result: ex2.result,
  scenarioId: ex2.id,
});
assert.equal(s.result?.reason, "Reason B");

// Stale analyzeSuccess after scenario switch must not apply foreign result
s = demoReducer(createInitialDemoState(ex1), { type: "analyzeStart" });
s = demoReducer(s, { type: "selectScenario", example: ex2 });
assert.equal(s.analyzing, false);
s = demoReducer(s, {
  type: "analyzeSuccess",
  result: ex1.result,
  scenarioId: ex1.id,
});
assert.equal(s.result, null);
assert.equal(s.selectedScenarioId, "integrations");
assert.equal(s.scope, "Scope B");

s = demoReducer(s, { type: "analyzeStart" });
s = demoReducer(s, {
  type: "analyzeSuccess",
  result: ex2.result,
  scenarioId: ex2.id,
});
assert.equal(s.result?.reason, "Reason B");

s = demoReducer(s, { type: "openChangeRequest" });
assert.equal(s.isChangeRequestOpen, true);

s = demoReducer(s, { type: "startOver", example: ex2 });
assert.equal(s.mode, "preset");
assert.equal(s.result, null);
assert.equal(s.isChangeRequestOpen, false);
assert.equal(s.scope, "Scope B");

s = demoReducer(s, { type: "analyzeStart" });
s = demoReducer(s, {
  type: "analyzeSuccess",
  result: ex2.result,
  scenarioId: ex2.id,
});
const ex2Ru = {
  ...ex2,
  scope: "Объём B",
  request: "Запрос B",
  result: { ...ex2.result, reason: "Причина B" },
};
s = demoReducer(s, { type: "syncLangPreset", example: ex2Ru });
assert.equal(s.mode, "preset");
assert.equal(s.scope, "Объём B");
assert.equal(s.result?.reason, "Причина B");

s = demoReducer(s, { type: "editExample" });
s = demoReducer(s, { type: "setScope", value: "custom text" });
s = demoReducer(s, { type: "syncLangPreset", example: ex1 });
assert.equal(s.mode, "custom");
assert.equal(s.scope, "custom text");

// Analyzing in custom must not keep a preset result
s = demoReducer(createInitialDemoState(ex1), { type: "editExample" });
s = demoReducer(s, { type: "analyzeStart" });
s = demoReducer(s, {
  type: "analyzeSuccess",
  result: ex1.result,
  scenarioId: ex1.id,
});
assert.equal(s.result, null);
assert.equal(s.mode, "custom");

console.log("mileseal demo state checks passed");

// Work-Start Decision defaults + invalidation
import {
  createDefaultWorkStartDecision,
  invalidateWorkStartDecision,
  validateWorkStartDecision,
} from "../src/lib/workStartDecision.ts";
import { workStartDecisionCopy } from "../src/i18n/workStartDecisionCopy.ts";

const def = createDefaultWorkStartDecision("homepage-authors");
assert.equal(def.authorization, "approval_required");
assert.equal(def.decision, "");

const saved = validateWorkStartDecision(
  {
    ...def,
    owner: "Owner A",
    decision: "price",
    rationale: "Because scope changed",
    authorization: "work_may_start",
    decisionDate: "2026-08-10",
  },
  workStartDecisionCopy("en")
);
assert.equal(saved.saved, true);
assert.equal(saved.authorization, "work_may_start");

const stale = invalidateWorkStartDecision(saved, "homepage-authors");
assert.equal(stale.authorization, "approval_required");
assert.equal(stale.stale, true);
assert.equal(stale.saved, false);

let ws = createInitialDemoState(ex1);
ws = demoReducer(ws, { type: "analyzeStart" });
ws = demoReducer(ws, {
  type: "analyzeSuccess",
  result: ex1.result,
  scenarioId: ex1.id,
});
ws = demoReducer(ws, {
  type: "setWorkStartDecision",
  value: saved,
});
assert.equal(ws.workStartDecision.saved, true);
ws = demoReducer(ws, { type: "setScope", value: "changed scope" });
assert.equal(ws.workStartDecision.authorization, "approval_required");
assert.equal(ws.workStartDecision.stale, true);

console.log("mileseal WSD state checks passed");
