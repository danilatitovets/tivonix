// api/visit.ts — учёт визитов для счётчика в боте /admin
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";

const KEY_PREFIX = "visits:";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET или POST — один раз за сессию вызывается с фронта
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).setHeader("Allow", "GET, POST").end();
  }

  try {
    const key = `${KEY_PREFIX}${todayKey()}`;
    await kv.incr(key);
    return res.status(204).end();
  } catch (e) {
    console.error("visit count error", e);
    return res.status(500).json({ error: "Failed to count visit" });
  }
}
