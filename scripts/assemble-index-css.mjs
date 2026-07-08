import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distPath = path.join(root, "dist/assets/index-Cg3hY4R2.css");
const gitHeadPath = path.join(root, "src/index.css.githead");
const partsDir = path.join(root, "src/_css_parts");
const outPath = path.join(root, "src/index.css");

const PREFIXES = [
  "pain-",
  "offer-",
  "ai-premium",
  "ai-logo",
  "ai-mark",
  "pricing-",
  "compare-",
  "case-split",
  "final-cta",
  "flow-illustration",
];

const KEYFRAME_PREFIXES = ["pain-", "compare-chaos", "ai-aurora", "ai-mark"];

function matchesSelector(selector) {
  return PREFIXES.some((p) => selector.includes(p));
}

function extractFromDist(css) {
  const rootNode = postcss.parse(css);
  const extracted = postcss.root();

  rootNode.walkAtRules("keyframes", (rule) => {
    if (KEYFRAME_PREFIXES.some((p) => rule.params.includes(p))) {
      extracted.append(rule.clone());
    }
  });

  rootNode.walkRules((rule) => {
    if (matchesSelector(rule.selector)) {
      extracted.append(rule.clone());
    }
  });

  return extracted.toString();
}

function readPart(name) {
  const file = path.join(partsDir, name);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8").trim() : "";
}

function stripProcessIdea(css) {
  return css
    .replace(/\n  \.process-section__idea \{[\s\S]*?\n  \}\n/g, "\n")
    .replace(
      /\n    \.process-section__idea \{[\s\S]*?\n    \}\n/g,
      "\n"
    )
    .replace(
      /\.process-section__idea,\s*/g,
      ""
    );
}

function main() {
  const base = fs.readFileSync(gitHeadPath, "utf8").replace(/^\uFEFF/, "").trimEnd();
  const distCss = fs.readFileSync(distPath, "utf8");
  const fromDist = extractFromDist(distCss);

  const overlays = [
    readPart("354.css"),
    readPart("537.css"),
    readPart("646.css"),
    readPart("666.css"),
    readPart("115.css"),
    readPart("119.css"),
    readPart("120.css"),
    readPart("771.css"),
    stripProcessIdea(readPart("779.css")),
    readPart("682.css"),
  ].filter(Boolean);

  const content = `${base}

@layer components {
${fromDist}

${overlays.join("\n\n")}
}
`;

  fs.writeFileSync(outPath, content, "utf8");
  console.log(`Wrote ${content.split("\n").length} lines`);
}

main();
