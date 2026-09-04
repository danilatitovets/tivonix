/**
 * Stack glyphs for project pills.
 * Prefer inline react-icons so logos never 404 on case-sensitive hosts.
 * Image files are only a fallback for brands without an SI icon.
 */

import type { ComponentType, ReactNode } from "react";
import { Code2, Globe, Server } from "lucide-react";
import {
  SiDocker,
  SiElementor,
  SiExpress,
  SiFigma,
  SiGoogle,
  SiLeaflet,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiRailway,
  SiReact,
  SiRedis,
  SiResend,
  SiSupabase,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiVite,
  SiWordpress,
} from "react-icons/si";

type Glyph = ComponentType<{ className?: string; size?: number | string; "aria-hidden"?: boolean }>;

const ICON_BY_KEY: Record<string, Glyph> = {
  react: SiReact,
  typescript: SiTypescript,
  ts: SiTypescript,
  "node.js": SiNodedotjs,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  railway: SiRailway,
  tailwind: SiTailwindcss,
  "tailwind css": SiTailwindcss,
  vite: SiVite,
  "next.js": SiNextdotjs,
  nextjs: SiNextdotjs,
  next: SiNextdotjs,
  leaflet: SiLeaflet,
  figma: SiFigma,
  supabase: SiSupabase,
  wordpress: SiWordpress,
  elementor: SiElementor,
  express: SiExpress,
  "telegram mini app": SiTelegram,
  telegram: SiTelegram,
  "google auth": SiGoogle,
  google: SiGoogle,
  resend: SiResend,
  nestjs: SiNestjs,
  nest: SiNestjs,
  prisma: SiPrisma,
  redis: SiRedis,
  docker: SiDocker,
  api: Code2,
  hosting: Server,
  хостинг: Server,
  domain: Globe,
  dns: Globe,
};

const IMG_BY_KEY: Record<string, string> = {
  playwright: "/images/stack/playwright.svg",
  i18n: "/images/stack/i18next.svg",
  i18next: "/images/stack/i18next.svg",
  bullmq: "/images/stack/bullmq.svg",
  pgvector: "/images/stack/pgvector.svg",
  bepaid: "/images/stack/bepaid.svg",
  "hoster.by": "/images/stack/hosterby.svg",
  hosterby: "/images/stack/hosterby.svg",
};

const ICON_CLASS = "h-3.5 w-3.5 shrink-0 text-white/90 sm:h-4 sm:w-4";

export function normalizeTechKey(label: string): string {
  return label
    .replace(/\*\*/g, "")
    .replace(/^[•\-–—]\s*/, "")
    .trim()
    .replace(/\.+$/, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function cleanTechLabel(label: string): string {
  return label
    .replace(/\*\*/g, "")
    .replace(/^[•\-–—]\s*/, "")
    .trim()
    .replace(/\.+$/, "");
}

/** Split a "React, TypeScript, Docker." line without breaking "i18n (RU, EN)". */
export function splitTechList(text: string): string[] {
  const parts: string[] = [];
  let buf = "";
  let depth = 0;
  for (const ch of text) {
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    if (depth === 0 && /[,،、·•|/]/.test(ch)) {
      const item = cleanTechLabel(buf);
      if (item) parts.push(item);
      buf = "";
      continue;
    }
    buf += ch;
  }
  const last = cleanTechLabel(buf);
  if (last) parts.push(last);
  return parts;
}

export function stackIconFor(label: string): ReactNode {
  const key = normalizeTechKey(label);
  if (!key) return null;
  const Icon = ICON_BY_KEY[key];
  if (Icon) return <Icon className={ICON_CLASS} aria-hidden />;
  const src = IMG_BY_KEY[key];
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={14}
        height={14}
        className={`${ICON_CLASS} object-contain opacity-95`}
        loading="lazy"
        decoding="async"
        aria-hidden
      />
    );
  }
  return <Code2 className={ICON_CLASS} aria-hidden />;
}
