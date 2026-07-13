import { createReadStream } from "node:fs";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const DIST_DIR = path.resolve("dist");
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const ROUTES = [
  "/",
  "/projects",
  "/contacts",
  "/sozdanie-sajtov",
  "/projects/labelos",
  "/projects/upc",
  "/projects/payclip",
];

function outputFileForRoute(route) {
  if (route === "/") return path.join(DIST_DIR, "index.html");
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(DIST_DIR, clean, "index.html");
}

function contentTypeFor(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".json")) return "application/json; charset=utf-8";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  if (filePath.endsWith(".webp")) return "image/webp";
  if (filePath.endsWith(".ico")) return "image/x-icon";
  if (filePath.endsWith(".xml")) return "application/xml; charset=utf-8";
  return "application/octet-stream";
}

async function createStaticSpaServer() {
  const indexPath = path.join(DIST_DIR, "index.html");
  const server = createServer(async (req, res) => {
    try {
      const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const cleanPath = requestPath === "/" ? "/index.html" : requestPath;
      let filePath = path.join(DIST_DIR, cleanPath);
      if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");

      try {
        await access(filePath);
      } catch {
        filePath = indexPath; // SPA fallback before prerender writes route files
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", contentTypeFor(filePath));
      createReadStream(filePath).pipe(res);
    } catch {
      res.statusCode = 500;
      res.end("Server error");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, "127.0.0.1", () => resolve());
  });

  return server;
}

async function waitForServerReady(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Static server did not start within ${timeoutMs}ms`);
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  const url = `${BASE_URL}${route}`;
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("h1", { timeout: 20000 });
    await page.waitForFunction(() => !document.querySelector("#loader"), null, {
      timeout: 20000,
    });

    const html = await page.content();
    const outputFile = outputFileForRoute(route);
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, html, "utf8");
    console.log(`prerendered: ${route} -> ${path.relative(process.cwd(), outputFile)}`);
  } finally {
    await page.close().catch(() => {});
  }
}

let server;
let browser;

try {
  await readFile(path.join(DIST_DIR, "index.html"), "utf8");
  server = await createStaticSpaServer();
  await waitForServerReady(`${BASE_URL}/`);

  browser = await chromium.launch({ headless: true });

  for (const route of ROUTES) {
    await prerenderRoute(browser, route);
  }

  console.log("Prerender completed.");
} catch (error) {
  console.error("Prerender failed:", error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close().catch(() => {});
  if (server) {
    await new Promise((resolve) => server.close(() => resolve()));
  }
}
