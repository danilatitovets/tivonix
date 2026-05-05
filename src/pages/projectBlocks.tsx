// src/pages/projectBlocks.tsx — общие блоки для /projects и /projects/:slug
import type { CSSProperties } from "react";
import type { Project, ProjectStatus } from "../data/projectsCatalog";

export const HERO_IMG = "/images/hero.png";

export function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Style = CSSProperties & Record<string, unknown>;
export const s = (v: Record<string, unknown>) => v as Style;

export function projectPreviewSrc(p: Project) {
  return p.cover ?? HERO_IMG;
}

/** Превью проекта: без белой обводки, скрин на всю ширину блока, высота по пропорциям картинки. */
export function ProjectPreviewFrame({ src }: { src: string }) {
  return (
    <div
      className={cx(
        "relative w-full overflow-hidden rounded-2xl",
        "border-0 bg-[#0c0c0f]",
        "shadow-[0_10px_32px_rgba(0,0,0,0.42)]"
      )}
    >
      <img
        src={src}
        alt=""
        className="block h-auto w-full align-middle"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function DomainPill({
  href,
  status = "live",
  isRu,
}: {
  href?: string;
  status?: ProjectStatus;
  isRu: boolean;
}) {
  const openLabel = isRu ? "Открыть" : "Open";
  const wipLabel = isRu ? "В разработке" : "In progress";

  if (!href || status === "wip") {
    return (
      <div
        className={cx(
          "inline-flex items-center gap-2",
          "rounded-2xl px-4 py-2",
          "border-0 bg-white/[0.08] backdrop-blur-xl",
          "text-white/75",
          "shadow-[0_10px_36px_rgba(0,0,0,0.35)]"
        )}
      >
        <span className="h-2 w-2 rounded-full bg-white/35 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
        <span className="text-[13px] font-[650] tracking-tight">{wipLabel}</span>
      </div>
    );
  }

  const clean = href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "group inline-flex items-center gap-2",
        "rounded-2xl px-4 py-2",
        "border-0 bg-white/[0.08] backdrop-blur-xl",
        "text-white/85 hover:text-white hover:bg-white/[0.11] transition",
        "shadow-[0_10px_36px_rgba(0,0,0,0.35)]"
      )}
      aria-label={`${clean} — ${openLabel}`}
      title={clean}
    >
      <span className="h-2 w-2 rounded-full bg-[#FF9A3D]/80 shadow-[0_0_0_4px_rgba(255,154,61,0.12)]" />
      <span className="text-[13px] font-[650] tracking-tight">{clean}</span>
      <span className="ml-1 text-[#FF9A3D]/80 group-hover:text-[#FF6A1A] transition">•</span>
      <span className="text-[12px] text-white/55 group-hover:text-white/70 transition">{openLabel}</span>
    </a>
  );
}
