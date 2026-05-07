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
        "border-0 bg-[#0c0c0f]"
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
  className,
}: {
  href?: string;
  status?: ProjectStatus;
  isRu: boolean;
  className?: string;
}) {
  const openLabel = isRu ? "Открыть" : "Open";
  const wipLabel = isRu ? "В разработке" : "In progress";

  if (!href || status === "wip") {
    return (
      <div
        className={cx(
          "inline-flex min-h-[44px] w-full items-center justify-center gap-2",
          "rounded-xl border border-white/[0.08] bg-white/[0.06] px-4",
          "text-[13px] font-[600] tracking-tight text-white/72",
          className
        )}
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
        <span>{wipLabel}</span>
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
        "group relative flex min-h-[44px] w-full min-w-0 items-center justify-center",
        "rounded-xl border border-white/[0.08] bg-white/[0.06] px-4 py-2.5 pr-[4.75rem]",
        "text-white/85 transition hover:border-white/[0.12] hover:bg-white/[0.09]",
        className
      )}
      aria-label={`${clean} — ${openLabel}`}
      title={clean}
    >
      <span className="min-w-0 max-w-[calc(100%-4.5rem)] truncate text-center text-[13px] font-[600] tracking-tight">
        {clean}
      </span>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-[500] text-white/50 group-hover:text-white/65">
        {openLabel}
      </span>
    </a>
  );
}
