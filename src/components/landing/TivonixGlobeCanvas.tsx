import { useLayoutEffect, useMemo, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import type { GlobePin } from "../../lib/globeProjection";

const ORANGE_DIM: [number, number, number] = [0.12, 0.04, 0.01];
const ORANGE_BASE: [number, number, number] = [0.2, 0.07, 0.01];
const ORANGE_ARC: [number, number, number] = [1, 0.52, 0.18];
const THETA = 0.18;
const PHI_SPEED = 0.00085;
const MARKER_ELEVATION = 0.06;
const MAX_RENDER_SIDE = 720;

const PIN_COLORS: Record<string, [number, number, number]> = {
  masters: [1, 0.52, 0.18],
  studios: [1, 0.38, 0.22],
  autoservice: [1, 0.68, 0.12],
  schools: [1, 0.45, 0.55],
  startups: [1, 0.32, 0.08],
  agencies: [1, 0.58, 0.32],
};

/** Separate hub pairs — no shared endpoints to avoid arc spikes. */
const ARCS: COBEOptions["arcs"] = [
  { from: [55.75, 37.62], to: [51.5, -0.12] },
  { from: [40.71, -74.01], to: [25.2, 55.27] },
  { from: [1.35, 103.82], to: [48.85, 2.35] },
];

function GlobeFallback() {
  return (
    <div className="tivonix-globe-fallback" aria-hidden>
      <svg viewBox="0 0 400 400" className="tivonix-globe-fallback__svg">
        <defs>
          <pattern id="tivonix-globe-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.1" fill="rgba(255,122,26,0.72)" />
          </pattern>
        </defs>
        <circle cx="200" cy="200" r="132" fill="rgba(8,4,0,0.94)" />
        <circle cx="200" cy="200" r="132" fill="url(#tivonix-globe-dots)" opacity="0.9" />
      </svg>
    </div>
  );
}

function prefersGlobeFallback() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const probe = document.createElement("canvas");
  const gl = probe.getContext("webgl") ?? probe.getContext("webgl2");
  return !gl;
}

function renderSize(rect: DOMRect) {
  const layoutW = Math.max(1, rect.width);
  const layoutH = Math.max(1, rect.height);
  const scale = Math.min(1, MAX_RENDER_SIDE / Math.max(layoutW, layoutH));
  return {
    width: Math.max(1, Math.round(layoutW * scale)),
    height: Math.max(1, Math.round(layoutH * scale)),
  };
}

type Props = {
  pins: GlobePin[];
};

export default function TivonixGlobeCanvas({ pins }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef(pins);
  const [fallback] = useState(prefersGlobeFallback);
  const pinsKey = useMemo(
    () => pins.map((pin) => `${pin.id}:${pin.lat}:${pin.lng}`).join("|"),
    [pins]
  );

  pinsRef.current = pins;

  useLayoutEffect(() => {
    if (fallback || typeof window === "undefined") return;

    const wrap = wrapRef.current;
    const host = hostRef.current;
    if (!wrap || !host) return;

    const canvas = document.createElement("canvas");
    canvas.className = "tivonix-globe-canvas";
    canvas.setAttribute("aria-hidden", "true");
    host.replaceChildren(canvas);

    let width = 0;
    let height = 0;
    let phi = 0.9;
    let frame = 0;
    let visible = true;
    let globe: ReturnType<typeof createGlobe> | null = null;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);

    const buildMarkers = (): COBEOptions["markers"] =>
      pinsRef.current.map((pin) => ({
        location: [pin.lat, pin.lng],
        size: 0.05,
        color: PIN_COLORS[pin.id] ?? ORANGE_ARC,
      }));

    const buildOptions = (w: number, h: number): COBEOptions => ({
      devicePixelRatio: dpr,
      width: w,
      height: h,
      phi,
      theta: THETA,
      dark: 1,
      diffuse: 1.22,
      mapSamples: 10000,
      mapBrightness: window.innerWidth < 640 ? 13.5 : 11,
      mapBaseBrightness: 0.015,
      baseColor: ORANGE_BASE,
      markerColor: ORANGE_ARC,
      glowColor: ORANGE_DIM,
      markers: buildMarkers(),
      arcs: ARCS,
      arcColor: ORANGE_ARC,
      arcWidth: 0.4,
      arcHeight: 0.18,
      markerElevation: MARKER_ELEVATION,
      scale: 1,
      offset: [0, 0],
    });

    const resize = () => {
      const { width: nextW, height: nextH } = renderSize(wrap.getBoundingClientRect());
      if (nextW === width && nextH === height) return;

      width = nextW;
      height = nextH;

      if (globe) {
        globe.update(buildOptions(width, height));
        return;
      }

      globe = createGlobe(canvas, buildOptions(width, height));
    };

    const render = () => {
      if (visible) {
        phi += PHI_SPEED;
        globe?.update({ phi });
      }
      frame = requestAnimationFrame(render);
    };

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.01, rootMargin: "64px" }
    );
    io.observe(wrap);

    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      globe?.destroy();
      host.replaceChildren();
    };
  }, [fallback, pinsKey]);

  if (fallback) {
    return <GlobeFallback />;
  }

  return (
    <div ref={wrapRef} className="tivonix-globe-canvas-wrap">
      <div ref={hostRef} className="tivonix-globe-cobe-host" aria-hidden />
    </div>
  );
}

export type { GlobePin };
