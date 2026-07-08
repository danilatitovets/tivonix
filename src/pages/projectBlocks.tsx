// src/pages/projectBlocks.tsx — общие блоки для /projects и /projects/:slug
import type { CSSProperties } from "react";
import type { Project, ProjectStatus } from "../data/projectsCatalog";

export const HERO_IMG = "/images/hero.webp";

export function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Style = CSSProperties & Record<string, unknown>;
export const s = (v: Record<string, unknown>) => v as Style;

export function projectPreviewSrc(p: Project) {
  return p.cover ?? HERO_IMG;
}

type PreviewVariant = "card" | "detail" | "thumb" | "grid";

const PREVIEW_SPECS: Record<PreviewVariant, { maxH: number; aspect: number; fullWidth?: boolean }> = {
  card: { maxH: 240, aspect: 16 / 9 },
  detail: { maxH: 360, aspect: 16 / 9 },
  thumb: { maxH: 180, aspect: 3 / 2 },
  grid: { maxH: 9999, aspect: 16 / 9, fullWidth: true },
};

/** Превью: целиком в кадре, без обрезки и без полос по бокам внутри рамки. */
export function ProjectPreviewFrame({
  src,
  variant = "card",
}: {
  src: string;
  variant?: PreviewVariant;
}) {
  const { maxH, aspect, fullWidth } = PREVIEW_SPECS[variant];

  return (
    <div
      className={cx(
        "relative overflow-hidden",
        fullWidth ? "w-full rounded-xl" : "mx-auto w-full rounded-2xl",
        "border-0 bg-[#141416]"
      )}
      style={{
        aspectRatio: aspect,
        ...(fullWidth
          ? {}
          : {
              maxHeight: maxH,
              width: `min(100%, calc(${maxH}px * ${aspect}))`,
            }),
      }}
    >
      <img
        src={src}
        alt=""
        className="block h-full w-full object-contain"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

/** Горизонтальная лента скриншотов (скроллбар) на странице кейса */
export function ProjectGalleryStrip({
  images,
  isRu,
}: {
  images: string[];
  isRu: boolean;
}) {
  if (!images.length) return null;

  const label = isRu ? "Скриншоты проекта" : "Project screenshots";

  return (
    <div className="mt-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38">{label}</p>
      <div
        className={cx(
          "flex gap-3 overflow-x-auto pb-1",
          "snap-x snap-mandatory scroll-smooth",
          "no-scrollbar"
        )}
        role="list"
        aria-label={label}
      >
        {images.map((src) => (
          <div key={src} role="listitem" className="shrink-0 snap-center">
            <ProjectPreviewFrame src={src} variant="thumb" />
          </div>
        ))}
      </div>
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
