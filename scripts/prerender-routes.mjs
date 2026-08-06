/** Routes prerendered to dist/<path>/index.html — keep in sync with scripts/prerender-node.mjs */
export const PRERENDER_ROUTES = [
  "/",
  "/en",
  "/zh",
  "/sozdanie-sajtov",
  "/avtomatizaciya-biznesa",
  "/mileseal",
  "/mileseal/cases/content-migration",
  "/projects",
  "/en/projects",
  "/zh/projects",
  "/plans",
  "/en/plans",
  "/zh/plans",
  "/about",
  "/en/about",
  "/zh/about",
  "/contacts",
  "/en/contacts",
  "/zh/contacts",
  "/partners",
  "/ru/partners",
  "/en/partners",
  "/zh/partners",
  "/projects/slotty",
  "/projects/spliton",
  "/projects/headmind",
  "/projects/logovo",
  "/en/projects/slotty",
  "/en/projects/spliton",
  "/en/projects/headmind",
  "/en/projects/logovo",
  "/zh/projects/slotty",
  "/zh/projects/spliton",
  "/zh/projects/headmind",
  "/zh/projects/logovo",
];

export function prerenderHtmlPath(distDir, route) {
  if (route === "/") return `${distDir}/index.html`;
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${distDir}/${clean}/index.html`;
}
