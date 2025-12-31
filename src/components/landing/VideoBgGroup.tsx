// src/components/landing/VideoBgGroup.tsx
import { useEffect, useRef, useState, type CSSProperties } from "react";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(!!mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener("change", on);
    else mq.addListener(on);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", on);
      else mq.removeListener(on);
    };
  }, []);
  return reduced;
}

export default function VideoBgGroup({
  children,
  src,
  poster,
  className,

  // настройки по умолчанию
  opacity = 0.28,
  scale = 1.06,

  // ✅ главное: проиграть 1 раз и остановиться на последнем кадре
  playOnce = true,
  freezeLastFrame = true,

  // когда запускать (насколько секция должна быть в кадре)
  threshold = 0.12,
}: {
  children: React.ReactNode;
  src: string;
  poster: string;
  className?: string;

  opacity?: number;
  scale?: number;

  playOnce?: boolean;
  freezeLastFrame?: boolean;

  threshold?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [inView, setInView] = useState(false);
  const [startedOnce, setStartedOnce] = useState(false);
  const [endedOnce, setEndedOnce] = useState(false);

  // ✅ зона активности (пока пользователь в группе секций)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        const on = !!e?.isIntersecting && (e.intersectionRatio ?? 0) >= threshold;
        setInView(on);
        if (on) setStartedOnce(true);
      },
      {
        threshold: [0, threshold, Math.min(0.35, threshold + 0.08), 0.5],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const freezeToLastFrame = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      const d = v.duration || 0;
      if (freezeLastFrame && d > 0) v.currentTime = Math.max(0, d - 0.03);
    } catch {}
    try {
      v.pause();
    } catch {}
  };

  const onEnded = () => {
    setEndedOnce(true);
    freezeToLastFrame();
  };

  // ✅ play/pause логика
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reducedMotion) return;

    // до первого входа — стоп + в ноль
    if (!startedOnce) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {}
      return;
    }

    // если уже закончило и playOnce — больше не запускаем
    if (playOnce && endedOnce) {
      freezeToLastFrame();
      return;
    }

    if (inView) {
      try {
        const p = v.play();
        // @ts-expect-error
        p?.catch?.(() => {});
      } catch {}
    } else {
      try {
        v.pause();
      } catch {}
    }
  }, [inView, startedOnce, reducedMotion, playOnce, endedOnce]);

  const videoStyle: CSSProperties = {
    opacity,
    transform: `scale(${scale}) translateZ(0)`,
    backfaceVisibility: "hidden",
  };

  return (
    <div ref={wrapRef} className={cx("relative isolate bg-black", className)}>
      {/* ✅ sticky фон (ВАЖНО: 100svh и -inset-px убирают “шов/полосу”) */}
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden bg-black">
        <div className="pointer-events-none absolute -inset-px">
          {!reducedMotion ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              style={videoStyle}
              src={src}
              poster={poster}
              muted
              playsInline
              preload="auto"
              loop={false}
              onEnded={onEnded}
            />
          ) : (
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ ...videoStyle, opacity: Math.max(opacity, 0.35) }}
              draggable={false}
            />
          )}

          {/* общий readability */}
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_15%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(900px_520px_at_70%_55%,rgba(255,154,61,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22),rgba(0,0,0,0.92))]" />
          <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>
      </div>

      {/* контент поверх */}
      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  );
}
