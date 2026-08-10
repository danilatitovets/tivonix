/**
 * Deterministic checks for MileSeal case demo state + formulas.
 */
import assert from "node:assert/strict";
import {
  CASE_ADDITIONAL_HOURS,
  CASE_DEFAULT_CAPACITY,
  CASE_DEFAULT_RATE,
  caseAdditionalCost,
  caseTimelineDays,
  formatCaseBusinessDays,
  formatCaseHours,
} from "../src/i18n/milesealCaseCopy.ts";
import {
  CASE_DEMO_DEFAULT_CAPACITY,
  CASE_DEMO_DEFAULT_RATE,
  caseDemoReducer,
  createInitialCaseDemoState,
} from "../src/components/mileseal/milesealCaseDemoState.ts";

assert.equal(CASE_ADDITIONAL_HOURS, 56);
assert.equal(CASE_DEFAULT_RATE, 80);
assert.equal(CASE_DEFAULT_RATE, CASE_DEMO_DEFAULT_RATE);
assert.equal(CASE_DEFAULT_CAPACITY, CASE_DEMO_DEFAULT_CAPACITY);
assert.equal(caseAdditionalCost(80), 4480);
assert.equal(caseAdditionalCost(100), 5600);
assert.equal(caseTimelineDays(8), 7);
assert.equal(caseTimelineDays(7), 8);
assert.equal(caseTimelineDays(56), 1);
assert.equal(caseTimelineDays(1), 56);

assert.equal(formatCaseHours(1, "ru"), "1 час");
assert.equal(formatCaseHours(2, "ru"), "2 часа");
assert.equal(formatCaseHours(3, "ru"), "3 часа");
assert.equal(formatCaseHours(4, "ru"), "4 часа");
assert.equal(formatCaseHours(5, "ru"), "5 часов");
assert.equal(formatCaseHours(24, "ru"), "24 часа");
assert.equal(formatCaseHours(56, "ru"), "56 часов");
assert.equal(formatCaseBusinessDays(1, "ru"), "1 рабочий день");
assert.equal(formatCaseBusinessDays(2, "ru"), "2 рабочих дня");
assert.equal(formatCaseBusinessDays(7, "ru", true), "+7 рабочих дней");

let state = createInitialCaseDemoState();
assert.equal(state.stage, "ready");
assert.equal(state.agencyRate, CASE_DEMO_DEFAULT_RATE);
assert.equal(state.deliveryHoursPerDay, CASE_DEMO_DEFAULT_CAPACITY);

state = caseDemoReducer(state, { type: "startAnalysisWith", rate: 100, capacity: 10 });
assert.equal(state.stage, "analyzing");
assert.equal(state.agencyRate, 100);
assert.equal(state.deliveryHoursPerDay, 10);
assert.equal(caseAdditionalCost(state.agencyRate), 5600);
assert.equal(caseTimelineDays(state.deliveryHoursPerDay), 6);

state = caseDemoReducer(state, { type: "finishAnalysis" });
assert.equal(state.stage, "result");

state = caseDemoReducer(state, { type: "setTone", tone: "soft" });
assert.equal(state.selectedTone, "soft");

state = caseDemoReducer(state, { type: "reset" });
assert.equal(state.stage, "ready");
assert.equal(state.agencyRate, CASE_DEMO_DEFAULT_RATE);
assert.equal(state.selectedTone, "neutral");

state = createInitialCaseDemoState({ startInResult: true });
assert.equal(state.stage, "result");
assert.equal(state.hasRunDemo, true);

console.log("mileseal case demo state checks passed");

import {
  createDefaultWorkStartDecision,
  validateWorkStartDecision,
} from "../src/lib/workStartDecision.ts";
import { workStartDecisionCopy } from "../src/i18n/workStartDecisionCopy.ts";

const caseDef = createDefaultWorkStartDecision("content-migration");
assert.equal(caseDef.decision, "price");
assert.equal(caseDef.authorization, "approval_required");

state = createInitialCaseDemoState();
state = caseDemoReducer(state, { type: "startAnalysisWith", rate: 80, capacity: 8 });
state = caseDemoReducer(state, { type: "finishAnalysis" });
assert.equal(state.workStartDecision.decision, "price");

const caseSaved = validateWorkStartDecision(
  {
    ...caseDef,
    owner: "PM Lead",
    decision: "price",
    rationale: "Priced change request",
    authorization: "work_may_start",
    decisionDate: "2026-08-10",
  },
  workStartDecisionCopy("en")
);
state = caseDemoReducer(state, { type: "setWorkStartDecision", value: caseSaved });
assert.equal(state.workStartDecision.saved, true);

state = caseDemoReducer(state, { type: "startAnalysisWith", rate: 80, capacity: 8 });
assert.equal(state.workStartDecision.stale, true);

console.log("mileseal case WSD checks passed");
