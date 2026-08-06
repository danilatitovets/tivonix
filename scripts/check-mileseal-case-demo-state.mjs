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

assert.equal(CASE_ADDITIONAL_HOURS, 40);
assert.equal(CASE_DEFAULT_RATE, 70);
assert.equal(CASE_DEFAULT_RATE, CASE_DEMO_DEFAULT_RATE);
assert.equal(CASE_DEFAULT_CAPACITY, CASE_DEMO_DEFAULT_CAPACITY);
assert.equal(caseAdditionalCost(70), 2800);
assert.equal(caseAdditionalCost(100), 4000);
assert.equal(caseTimelineDays(8), 5);
assert.equal(caseTimelineDays(7), 6);
assert.equal(caseTimelineDays(40), 1);
assert.equal(caseTimelineDays(1), 40);

assert.equal(formatCaseHours(1, "ru"), "1 час");
assert.equal(formatCaseHours(2, "ru"), "2 часа");
assert.equal(formatCaseHours(3, "ru"), "3 часа");
assert.equal(formatCaseHours(4, "ru"), "4 часа");
assert.equal(formatCaseHours(5, "ru"), "5 часов");
assert.equal(formatCaseHours(24, "ru"), "24 часа");
assert.equal(formatCaseHours(40, "ru"), "40 часов");
assert.equal(formatCaseBusinessDays(1, "ru"), "1 рабочий день");
assert.equal(formatCaseBusinessDays(2, "ru"), "2 рабочих дня");
assert.equal(formatCaseBusinessDays(5, "ru", true), "+5 рабочих дней");

let state = createInitialCaseDemoState();
assert.equal(state.stage, "ready");
assert.equal(state.agencyRate, CASE_DEMO_DEFAULT_RATE);
assert.equal(state.deliveryHoursPerDay, CASE_DEMO_DEFAULT_CAPACITY);

state = caseDemoReducer(state, { type: "startAnalysisWith", rate: 100, capacity: 10 });
assert.equal(state.stage, "analyzing");
assert.equal(state.agencyRate, 100);
assert.equal(state.deliveryHoursPerDay, 10);
assert.equal(caseAdditionalCost(state.agencyRate), 4000);
assert.equal(caseTimelineDays(state.deliveryHoursPerDay), 4);

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
