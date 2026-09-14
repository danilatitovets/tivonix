/**
 * Guard the lead analytics contract.
 * Conversion must mean a confirmed delivered lead, not a CTA click or submit attempt.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const analytics = readFileSync("src/lib/analytics.ts", "utf8");
const app = readFileSync("src/App.tsx", "utf8");

function functionBody(source, name) {
  const start = source.indexOf(`export function ${name}`);
  assert.notEqual(start, -1, `${name} must exist`);
  const bodyStart = source.indexOf("{", start);
  assert.notEqual(bodyStart, -1, `${name} must have a body`);

  let depth = 0;
  for (let i = bodyStart; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "{") depth += 1;
    if (ch === "}") depth -= 1;
    if (depth === 0) return source.slice(bodyStart + 1, i);
  }
  throw new Error(`${name} body was not closed`);
}

const submitBody = functionBody(analytics, "trackLeadFormSubmit");
assert.match(submitBody, /form_submit_attempt/);
assert.doesNotMatch(submitBody, /form_submit_success/);
assert.doesNotMatch(submitBody, /trackAdsFormConversion/);

const successBody = functionBody(analytics, "trackLeadFormSuccess");
assert.match(successBody, /form_submit_success/);
assert.match(successBody, /trackAdsFormConversion/);

const abandonBody = functionBody(analytics, "trackLeadFormAbandon");
assert.match(abandonBody, /form_abandon/);
assert.doesNotMatch(abandonBody, /form_submit_error/);

assert.doesNotMatch(app, /trackAdsFormConversion/);

console.log("analytics contract: conversions fire only after confirmed lead success");
