/**
 * Map project stack labels → icon paths under /images/stack.
 * Prefer existing WhyUs webp assets; fall back to downloaded SVGs.
 */

const STACK_ICON_BY_KEY: Record<string, string> = {
  react: "/images/stack/React.webp",
  typescript: "/images/stack/TypeScript.webp",
  "node.js": "/images/stack/Node.js.webp",
  node: "/images/stack/Node.js.webp",
  postgresql: "/images/stack/postgresql.svg",
  postgres: "/images/stack/Postgres.webp",
  railway: "/images/stack/railway.svg",
  tailwind: "/images/stack/Tailwind.webp",
  "tailwind css": "/images/stack/Tailwind.webp",
  vite: "/images/stack/vite.svg",
  "next.js": "/images/stack/nextjs.svg",
  nextjs: "/images/stack/nextjs.svg",
  leaflet: "/images/stack/leaflet.svg",
  figma: "/images/stack/figma.svg",
  "hoster.by": "/images/stack/hosterby.svg",
  hosterby: "/images/stack/hosterby.svg",
  supabase: "/images/stack/Supabase.webp",
  api: "/images/stack/api.svg",
  wordpress: "/images/stack/wordpress.svg",
  elementor: "/images/stack/elementor.svg",
  hosting: "/images/stack/hosting.svg",
  domain: "/images/stack/domain.svg",
  express: "/images/stack/Express.webp",
  "telegram mini app": "/images/stack/telegram.svg",
  telegram: "/images/stack/telegram.svg",
  "google auth": "/images/stack/google.svg",
  google: "/images/stack/google.svg",
  bepaid: "/images/stack/bepaid.svg",
  resend: "/images/stack/resend.svg",
  nestjs: "/images/stack/nestjs.svg",
  prisma: "/images/stack/prisma.svg",
  redis: "/images/stack/redis.svg",
  bullmq: "/images/stack/bullmq.svg",
  pgvector: "/images/stack/pgvector.svg",
  playwright: "/images/stack/playwright.svg",
  docker: "/images/stack/docker.svg",
  i18n: "/images/stack/i18next.svg",
  i18next: "/images/stack/i18next.svg",
};

function normalizeTechKey(label: string): string {
  return label.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Icon URL for a stack label, or null if unknown. */
export function stackIconFor(label: string): string | null {
  const key = normalizeTechKey(label);
  return STACK_ICON_BY_KEY[key] ?? null;
}
