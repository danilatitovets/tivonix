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
  id: "migration",
  label: "Content migration",
  scope: "Scope A",
  request: "Request A",
  result: {
    status: "Out of scope",
    hoursValue: "14–18",
    costValue: "$840–$1,080",
    reason: "Reason A",
    recommendation: "Rec A",
    changeRequest: "CR A",
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
    reason: "Reason B",
    recommendation: "Rec B",
    changeRequest: "CR B",
  },
};

let s = createInitialDemoState(ex1);
assert.equal(s.mode, "preset");
assert.equal(s.result, null);
assert.equal(s.scope, "Scope A");

s = demoReducer(s, { type: "analyzeStart" });
assert.equal(s.analyzing, true);
s = demoReducer(s, { type: "analyzeSuccess", result: ex1.result });
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

s = demoReducer(s, { type: "analyzeSuccess", result: ex2.result });
assert.equal(s.result?.reason, "Reason B");

s = demoReducer(s, { type: "openChangeRequest" });
assert.equal(s.isChangeRequestOpen, true);

s = demoReducer(s, { type: "startOver", example: ex2 });
assert.equal(s.mode, "preset");
assert.equal(s.result, null);
assert.equal(s.isChangeRequestOpen, false);
assert.equal(s.scope, "Scope B");

s = demoReducer(s, { type: "analyzeSuccess", result: ex2.result });
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
s = demoReducer(s, { type: "analyzeSuccess", result: ex1.result });
assert.equal(s.result, null);
assert.equal(s.mode, "custom");

console.log("mileseal demo state checks passed");
