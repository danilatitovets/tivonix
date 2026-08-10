/**
 * Wave 2 viewport screenshots for /en/mileseal (no lead submissions).
 * Usage: node scripts/capture-mileseal-wave2.mjs
 * Requires preview at http://127.0.0.1:4174
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.MILESEAL_URL || "http://127.0.0.1:4174";
const OUT = path.resolve("artifacts/mileseal-wave2");

async function shot(page, name, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(`${BASE}/en/mileseal`, { waitUntil: "networkidle" });
  await page.waitForSelector("text=Stop one client request before it becomes unpaid work.");
  const file = path.join(OUT, `${name}-${width}x${height}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("saved", path.relative(process.cwd(), file));
}

const browser = await chromium.launch();
const page = await browser.newPage();
await mkdir(OUT, { recursive: true });
await shot(page, "en-mileseal", 375, 812);
await shot(page, "en-mileseal", 1440, 900);
await browser.close();
console.log("wave2 screenshots done");
