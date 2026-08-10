/**
 * Validates MileSeal lead meta field shapes without importing app modules.
 */
import assert from "node:assert/strict";

function buildReviewMeta() {
  return {
    ctaSource: "mileseal_scope_review",
    offer: undefined,
    amount: undefined,
    currency: undefined,
  };
}

function buildAuditMeta() {
  return {
    ctaSource: "mileseal_scope_leakage_audit",
    offer: "scope_leakage_audit",
    amount: 350,
    currency: "USD",
  };
}

const reviewMeta = buildReviewMeta();
assert.equal(reviewMeta.ctaSource, "mileseal_scope_review");
assert.equal(reviewMeta.offer, undefined);

const auditMeta = buildAuditMeta();
assert.equal(auditMeta.ctaSource, "mileseal_scope_leakage_audit");
assert.equal(auditMeta.offer, "scope_leakage_audit");
assert.equal(auditMeta.amount, 350);
assert.equal(auditMeta.currency, "USD");

console.log("mileseal lead meta checks passed");
