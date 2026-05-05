import fs from "fs";

const lines = fs.readFileSync("src/pages/ProjectsPage.tsx", "utf8").split(/\r?\n/);
const body = lines.slice(681, 981).join("\n");

const header = `export type ProjectStatus = "live" | "wip";

export type Testimonial = {
  name: string;
  role: string;
  text: string;
};

export type Project = {
  id: string;
  title: string;
  subtitleRu: string;
  subtitleEn: string;
  detailsRu: string;
  detailsEn: string;
  domain?: string;
  tags: string[];
  cover?: string;
  status?: ProjectStatus;
  outcomes?: string[];
  stack?: string[];
  testimonial?: Testimonial;
};

const UPC_DOMAIN = "https://upc.promo/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";
const HEADMIND_DOMAIN = "https://headmind.ru/";
const LOGOVO_DOMAIN = "https://logovo24.by/";

export function buildProjects(isRu: boolean): Project[] {
  return [
${body}
  ];
}

export function findProjectBySlug(slug: string | undefined, isRu: boolean): Project | undefined {
  if (!slug) return undefined;
  return buildProjects(isRu).find((p) => p.id === slug);
}
`;

fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync("src/data/projectsCatalog.ts", header, "utf8");
console.log("OK", header.length);
