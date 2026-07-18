// src/pages/projectBlocks.tsx — общие блоки для /projects и /projects/:slug
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
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
  thumb: { maxH: 200, aspect: 16 / 9 },
  grid: { maxH: 9999, aspect: 16 / 9, fullWidth: true },
};

const ZOOM_STEPS = [1, 1.5, 2.25] as const;

/** Превью скриншотов: заполняет рамку без «приподнятых» полос снизу. */
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
        className="absolute inset-0 block h-full w-full object-cover object-top"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function GalleryLightbox({
  images,
  index,
  isRu,
  onClose,
  onIndexChange,
}: {
  images: string[];
  index: number;
  isRu: boolean;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeLabel = isRu ? "Закрыть" : "Close";
  const prevLabel = isRu ? "Предыдущий" : "Previous";
  const nextLabel = isRu ? "Следующий" : "Next";
  const zoom = ZOOM_STEPS[zoomIdx] ?? 1;
  const src = images[index];
  const multi = images.length > 1;

  useEffect(() => {
    setMounted(true);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    setZoomIdx(0);
    stageRef.current?.scrollTo({ left: 0, top: 0 });
  }, [index]);

  const requestClose = useCallback(() => {
    setVisible(false);
    window.setTimeout(onClose, 180);
  }, [onClose]);

  const go = useCallback(
    (delta: number) => {
      if (!multi) return;
      const next = (index + delta + images.length) % images.length;
      onIndexChange(next);
    },
    [images.length, index, multi, onIndexChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "+" || e.key === "=") setZoomIdx((z) => Math.min(z + 1, ZOOM_STEPS.length - 1));
      if (e.key === "-" || e.key === "_") setZoomIdx((z) => Math.max(z - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, requestClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cx(
        "fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={isRu ? "Просмотр скриншота" : "Screenshot viewer"}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black"
        aria-label={closeLabel}
        onClick={requestClose}
      />

      <div
        className={cx(
          "relative z-[1] flex max-h-[min(92dvh,920px)] w-full max-w-[min(96vw,1120px)] flex-col",
          "transition-transform duration-200",
          visible ? "scale-100" : "scale-[0.97]"
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-3 px-0.5">
          <p className="text-[12px] font-medium tabular-nums text-white/40">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-white/45 transition hover:bg-white/[0.06] hover:text-white/75"
            aria-label={closeLabel}
            onClick={requestClose}
          >
            ✕
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          {multi ? (
            <>
              <button
                type="button"
                className="absolute left-0 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/35 transition hover:bg-white/[0.06] hover:text-white/70 sm:grid"
                aria-label={prevLabel}
                onClick={() => go(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-0 top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/35 transition hover:bg-white/[0.06] hover:text-white/70 sm:grid"
                aria-label={nextLabel}
                onClick={() => go(1)}
              >
                ›
              </button>
            </>
          ) : null}

          <div
            ref={stageRef}
            className={cx(
              "max-h-[min(84dvh,860px)] overflow-auto rounded-2xl bg-black",
              "overscroll-contain",
              zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            )}
            onDoubleClick={() =>
              setZoomIdx((z) => (z >= ZOOM_STEPS.length - 1 ? 0 : Math.min(z + 1, ZOOM_STEPS.length - 1)))
            }
          >
            <div
              className="grid place-items-center p-0 sm:p-1"
              style={{
                width: `${zoom * 100}%`,
                minHeight: zoom > 1 ? undefined : "min(84dvh, 860px)",
                minWidth: "100%",
              }}
            >
              <img
                src={src}
                alt=""
                className="block h-auto max-w-full select-none rounded-xl object-contain"
                style={{
                  maxHeight: zoom === 1 ? "min(80dvh, 820px)" : "none",
                  width: zoom === 1 ? "auto" : `${100 / zoom}%`,
                }}
                draggable={false}
                decoding="async"
              />
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] text-white/25">
          {isRu
            ? "Двойной клик — увеличить · Esc — закрыть · ← → листать"
            : "Double-click to zoom · Esc to close · ← → to browse"}
        </p>
      </div>
    </div>,
    document.body
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
  const [active, setActive] = useState<number | null>(null);

  if (!images.length) return null;

  const label = isRu ? "Скриншоты проекта" : "Project screenshots";
  const openLabel = isRu ? "Открыть скриншот" : "Open screenshot";

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
        {images.map((src, i) => (
          <div key={src} role="listitem" className="shrink-0 snap-center">
            <button
              type="button"
              className="group block cursor-zoom-in rounded-2xl outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/35"
              aria-label={`${openLabel} ${i + 1}`}
              onClick={() => setActive(i)}
            >
              <ProjectPreviewFrame src={src} variant="thumb" />
            </button>
          </div>
        ))}
      </div>

      {active !== null ? (
        <GalleryLightbox
          images={images}
          index={active}
          isRu={isRu}
          onClose={() => setActive(null)}
          onIndexChange={setActive}
        />
      ) : null}
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
