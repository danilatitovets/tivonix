/** In-memory rate limit for lead submissions (per serverless instance). */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
/** Mobile retries + shared carrier IPs need more headroom than 5 */
const MAX_REQUESTS = 30;

export function checkLeadRateLimit(ip: string): {
  ok: boolean;
  retryAfterSec?: number;
} {
  const key = ip || "unknown";
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(key, bucket);
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  return { ok: true };
}

/** Call only after the request passed validation and we attempt delivery. */
export function consumeLeadRateLimit(ip: string): void {
  const key = ip || "unknown";
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(key, bucket);
  }

  bucket.count += 1;
}
