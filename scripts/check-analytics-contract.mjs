/**
 * Regression contract for commercial analytics.
 * A locally valid submit is only an attempt. A lead conversion may fire only
 * after /api/leads confirms successful delivery.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const analytics = await readFile(new URL("../src/lib/analytics.ts", import.meta.url), "utf8");
const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");

function exportedFunctionBody(source, name) {
  const marker = `export function ${name}`;
  const start = source.indexOf(marker);
  assert.notEqual(start, -1, `${name} must exist`);

  const bodyStart = source.indexOf("{", start);
  assert.notEqual(bodyStart, -1, `${name} must have a body`);

  let depth = 0;
  for (let i = bodyStart; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(bodyStart + 1, i);
    }
  }

  assert.fail(`Could not parse ${name}`);
}

const submit = exportedFunctionBody(analytics, "trackLeadFormSubmit");
const success = exportedFunctionBody(analytics, "trackLeadFormSuccess");
const abandon = exportedFunctionBody(analytics, "trackLeadFormAbandon");

assert.match(submit, /form_submit_attempt/);
assert.doesNotMatch(submit, /form_submit_success/);
assert.doesNotMatch(submit, /trackAdsFormConversion/);

assert.match(success, /form_submit_success/);
assert.match(success, /trackAdsFormConversion/);

assert.match(abandon, /form_abandon/);
assert.doesNotMatch(abandon, /form_submit_error/);

assert.doesNotMatch(
  app,
  /trackAdsFormConversion/,
  "Telegram/email clicks must not use the delivered-lead Ads conversion"
);

console.log("analytics contract checks passed");
