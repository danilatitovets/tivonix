/** Routes prerendered to dist/<path>/index.html — keep in sync with scripts/prerender-node.mjs */
export const PRERENDER_ROUTES = [
  "/",
  "/en",
  "/sozdanie-sajtov",
  "/avtomatizaciya-biznesa",
  "/projects",
  "/en/projects",
  "/plans",
  "/en/plans",
  "/about",
  "/en/about",
  "/contacts",
  "/en/contacts",
  "/partners",
  "/ru/partners",
  "/en/partners",
  "/projects/slotty",
  "/projects/spliton",
  "/projects/headmind",
  "/projects/logovo",
  "/projects/tivonixpanel",
  "/en/projects/slotty",
  "/en/projects/spliton",
  "/en/projects/headmind",
  "/en/projects/logovo",
  "/en/projects/tivonixpanel",
];

export function prerenderHtmlPath(distDir, route) {
  if (route === "/") return `${distDir}/index.html`;
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${distDir}/${clean}/index.html`;
}
