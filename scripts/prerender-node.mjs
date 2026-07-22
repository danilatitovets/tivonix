import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { PRERENDER_ROUTES, prerenderHtmlPath } from "./prerender-routes.mjs";

const DIST_DIR = path.resolve("dist");
const DIST_SERVER_DIR = path.resolve("dist-server");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");
const SERVER_ENTRY_PATH = path.join(DIST_SERVER_DIR, "entry-server.js");

const routes = PRERENDER_ROUTES;

function splitLeadingHeadTags(appHtml) {
  const tagRegex =
    /^(<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>|<script\b[^>]*>[\s\S]*?<\/script>)/i;
  let bodyHtml = appHtml.trimStart();
  const extracted = [];

  while (true) {
    const match = bodyHtml.match(tagRegex);
    if (!match) break;
    extracted.push(match[1]);
    bodyHtml = bodyHtml.slice(match[1].length).trimStart();
  }

  return { extractedHeadTags: extracted.join("\n"), bodyHtml };
}

function langForRoute(route) {
  return route === "/en" || route.startsWith("/en/") ? "en" : "ru";
}

function injectRenderedHtml(template, appHtml, headTags, route) {
  const { extractedHeadTags, bodyHtml } = splitLeadingHeadTags(appHtml);
  const mergedHead = [headTags, extractedHeadTags].filter(Boolean).join("\n");
  let html = template.includes("</head>")
    ? template.replace("</head>", `${mergedHead}\n</head>`)
    : template;

  const lang = langForRoute(route);
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(/<html([^>]*?)data-lang="[^"]*"/, `<html$1data-lang="${lang}"`);

  const rootRegex = /<div id="root"><\/div>/;
  if (rootRegex.test(html)) {
    return html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  }

  throw new Error('Template does not contain exact "<div id=\\"root\\"></div>" placeholder.');
}

async function main() {
  const template = await readFile(TEMPLATE_PATH, "utf8");
  const serverEntryUrl = pathToFileURL(SERVER_ENTRY_PATH).href;
  const { render } = await import(serverEntryUrl);

  for (const route of routes) {
    const { appHtml, headTags } = render(route);
    const html = injectRenderedHtml(template, appHtml, headTags, route);
    const outFile = prerenderHtmlPath(DIST_DIR, route);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    console.log(`prerendered: ${route} -> ${path.relative(process.cwd(), outFile)}`);
  }

  console.log("Node prerender completed.");
}

main().catch((error) => {
  console.error("Node prerender failed:", error);
  process.exitCode = 1;
});
