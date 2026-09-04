// src/pages/projectBlocks.tsx — общие блоки для /projects и /projects/:slug
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { createPortal } from "react-dom";
import type { Project, ProjectStatus } from "../data/projectsCatalog";
import SoftImg from "../components/ui/SoftImg";

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

const ZOOM_MIN = 1;
const ZOOM_MAX = 3.5;
const ZOOM_STEP = 0.45;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function touchDistance(a: Touch, b: Touch) {
  const dx = a.clientX - b.clientX;
  const dy = a.clientY - b.clientY;
  return Math.hypot(dx, dy);
}

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
      <SoftImg
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
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tall, setTall] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeLabel = isRu ? "Закрыть" : "Close";
  const prevLabel = isRu ? "Предыдущий" : "Previous";
  const nextLabel = isRu ? "Следующий" : "Next";
  const zoomInLabel = isRu ? "Приблизить" : "Zoom in";
  const zoomOutLabel = isRu ? "Отдалить" : "Zoom out";
  const src = images[index];
  const multi = images.length > 1;
  const zoomed = scale > 1.02;

  const pinchRef = useRef<{ startDist: number; startScale: number } | null>(null);
  const panRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const lastTapRef = useRef(0);

  const resetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    pinchRef.current = null;
    panRef.current = null;
    swipeRef.current = null;
  }, []);

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
    resetView();
    setTall(false);
    stageRef.current?.scrollTo({ top: 0, left: 0 });
  }, [index, resetView]);

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

  const bumpZoom = useCallback((delta: number) => {
    setScale((s) => {
      const next = clamp(Number((s + delta).toFixed(2)), ZOOM_MIN, ZOOM_MAX);
      if (next <= ZOOM_MIN) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "ArrowLeft" && !zoomed) go(-1);
      if (e.key === "ArrowRight" && !zoomed) go(1);
      if (e.key === "+" || e.key === "=") bumpZoom(ZOOM_STEP);
      if (e.key === "-" || e.key === "_") bumpZoom(-ZOOM_STEP);
      if (e.key === "0") resetView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bumpZoom, go, requestClose, resetView, zoomed]);

  const onWheel = (e: ReactWheelEvent) => {
    // Native scroll for long screenshots; zoom with ctrl/cmd+wheel or when already zoomed
    if (!e.ctrlKey && !e.metaKey && !zoomed) return;
    e.preventDefault();
    const dir = e.deltaY > 0 ? -ZOOM_STEP * 0.55 : ZOOM_STEP * 0.55;
    bumpZoom(dir);
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    if (e.touches.length === 2) {
      const a = e.touches[0];
      const b = e.touches[1];
      if (!a || !b) return;
      pinchRef.current = { startDist: touchDistance(a, b), startScale: scale };
      panRef.current = null;
      swipeRef.current = null;
      return;
    }
    if (e.touches.length === 1) {
      const t = e.touches[0];
      if (!t) return;
      if (zoomed) {
        panRef.current = { x: t.clientX, y: t.clientY, ox: offset.x, oy: offset.y };
        swipeRef.current = null;
      } else {
        swipeRef.current = { x: t.clientX, y: t.clientY };
        panRef.current = null;
      }
    }
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      const a = e.touches[0];
      const b = e.touches[1];
      if (!a || !b) return;
      e.preventDefault();
      const dist = touchDistance(a, b);
      const next = clamp(
        pinchRef.current.startScale * (dist / Math.max(1, pinchRef.current.startDist)),
        ZOOM_MIN,
        ZOOM_MAX
      );
      setScale(next);
      if (next <= ZOOM_MIN) setOffset({ x: 0, y: 0 });
      return;
    }
    if (e.touches.length === 1 && panRef.current && zoomed) {
      const t = e.touches[0];
      if (!t) return;
      e.preventDefault();
      const dx = t.clientX - panRef.current.x;
      const dy = t.clientY - panRef.current.y;
      const limit = 180 * scale;
      setOffset({
        x: clamp(panRef.current.ox + dx, -limit, limit),
        y: clamp(panRef.current.oy + dy, -limit, limit),
      });
    }
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    if (pinchRef.current && e.touches.length < 2) {
      pinchRef.current = null;
      if (scale < 1.08) resetView();
    }
    if (panRef.current && e.touches.length === 0) panRef.current = null;

    if (swipeRef.current && e.changedTouches[0] && !zoomed && e.touches.length === 0) {
      const t = e.changedTouches[0];
      const dx = t.clientX - swipeRef.current.x;
      const dy = t.clientY - swipeRef.current.y;
      const moved = Math.hypot(dx, dy);
      swipeRef.current = null;
      if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        go(dx < 0 ? 1 : -1);
        return;
      }
      if (moved < 14) {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          lastTapRef.current = 0;
          setScale(2.2);
          setOffset({ x: 0, y: 0 });
        } else {
          lastTapRef.current = now;
        }
      }
      return;
    }

    if (zoomed && e.touches.length === 0 && e.changedTouches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        lastTapRef.current = 0;
        resetView();
      } else {
        lastTapRef.current = now;
      }
    }
  };

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cx(
        "fixed inset-0 z-[210] flex items-center justify-center p-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:p-6",
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
          "relative z-[1] flex h-[min(94dvh,960px)] w-full max-w-[min(100vw,1200px)] flex-col",
          "transition-transform duration-200",
          visible ? "scale-100" : "scale-[0.97]"
        )}
      >
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <p className="rounded-full bg-white/[0.12] px-3 py-1.5 text-[12px] font-semibold tabular-nums text-white/90 ring-1 ring-white/15">
            {index + 1} / {images.length}
            <span className="ml-2 text-white/70">{Math.round(scale * 100)}%</span>
          </p>
          <div className="flex items-center gap-1 rounded-full bg-white/[0.14] p-1 ring-1 ring-white/20 backdrop-blur-md">
            <button
              type="button"
              className="grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-full bg-white/15 text-[20px] font-semibold text-white transition hover:bg-white/25 disabled:opacity-35"
              aria-label={zoomOutLabel}
              disabled={scale <= ZOOM_MIN}
              onClick={() => bumpZoom(-ZOOM_STEP)}
            >
              −
            </button>
            <button
              type="button"
              className="grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-full bg-white/15 text-[20px] font-semibold text-white transition hover:bg-white/25 disabled:opacity-35"
              aria-label={zoomInLabel}
              disabled={scale >= ZOOM_MAX}
              onClick={() => bumpZoom(ZOOM_STEP)}
            >
              +
            </button>
            <button
              type="button"
              className="grid h-10 w-10 min-h-[44px] min-w-[44px] place-items-center rounded-full bg-white text-[16px] font-bold text-black transition hover:bg-white/90"
              aria-label={closeLabel}
              onClick={requestClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          {multi && !zoomed ? (
            <>
              <button
                type="button"
                className="absolute left-1 top-1/2 z-[2] grid h-11 w-11 min-h-[44px] min-w-[44px] -translate-y-1/2 place-items-center rounded-full bg-white/20 text-[22px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/30 sm:left-0"
                aria-label={prevLabel}
                onClick={() => go(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-1 top-1/2 z-[2] grid h-11 w-11 min-h-[44px] min-w-[44px] -translate-y-1/2 place-items-center rounded-full bg-white/20 text-[22px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/30 sm:right-0"
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
              "h-full rounded-2xl bg-black overscroll-contain",
              zoomed ? "overflow-hidden touch-none cursor-grab active:cursor-grabbing" : "overflow-auto cursor-zoom-in"
            )}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDoubleClick={(e) => {
              e.preventDefault();
              if (zoomed) resetView();
              else setScale(2.2);
            }}
          >
            <div
              className={cx(
                "flex w-full justify-center",
                zoomed || !tall ? "min-h-full items-center" : "items-start"
              )}
            >
              <img
                src={src}
                alt=""
                className={cx(
                  "block select-none transition-transform duration-100 will-change-transform",
                  // Long pages: full width + vertical scroll. Wide UI: fit in viewport.
                  tall && !zoomed ? "h-auto w-full max-w-full" : "max-h-full w-auto max-w-full object-contain"
                )}
                style={{
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                  transformOrigin: tall ? "top center" : "center center",
                }}
                draggable={false}
                decoding="async"
                onLoad={(e) => {
                  const el = e.currentTarget;
                  setTall(el.naturalHeight / Math.max(1, el.naturalWidth) > 1.35);
                }}
              />
            </div>
          </div>
        </div>

        <p className="mt-2 px-1 text-center text-[11px] leading-snug text-white/55">
          {isRu
            ? tall
              ? "Скролл вниз по длинному экрану · пинч / +/− — масштаб · свайп — листать"
              : "Пинч или +/− — масштаб · свайп — листать · двойной тап — крупнее"
            : tall
              ? "Scroll long screens · pinch / +/− to zoom · swipe to browse"
              : "Pinch or +/− to zoom · swipe to browse · double-tap to enlarge"}
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
    <div className="mt-4 sm:mt-5">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/38 sm:mb-3">{label}</p>
      <div className="relative -mx-6 sm:mx-0">
        <div
          className={cx(
            "flex gap-2.5 overflow-x-auto px-6 pb-1 sm:gap-3 sm:px-0",
            "snap-x snap-mandatory scroll-smooth",
            "no-scrollbar"
          )}
          role="list"
          aria-label={label}
        >
          {images.map((src, i) => (
            <div
              key={src}
              role="listitem"
              className="w-[min(78vw,18rem)] shrink-0 snap-start sm:w-[16rem] lg:w-[18rem]"
            >
              <button
                type="button"
                className="group block w-full cursor-zoom-in rounded-xl outline-none transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-white/35 sm:rounded-2xl"
                aria-label={`${openLabel} ${i + 1}`}
                onClick={() => setActive(i)}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#121214] ring-1 ring-white/[0.06] sm:rounded-2xl">
                  <SoftImg
                    src={src}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain object-center"
                    draggable={false}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : undefined}
                  />
                </div>
              </button>
            </div>
          ))}
          {/* Trailing spacer so last thumb can snap with peek room on mobile */}
          <div className="w-2 shrink-0 sm:hidden" aria-hidden />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0a0a0b] to-transparent sm:hidden"
          aria-hidden
        />
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
