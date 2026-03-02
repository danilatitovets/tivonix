// api/visit.ts — учёт визитов для счётчика в боте /admin (без БД, в памяти)
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getTodayCount, incrementToday } from "./_visitStore.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).setHeader("Allow", "GET, POST").end();
  }

  const statsOnly = req.query?.stats === "1" || req.query?.stats === "true";

  if (statsOnly) {
    const count = getTodayCount();
    return res.status(200).json({ count });
  }

  incrementToday();
  return res.status(204).end();
}
