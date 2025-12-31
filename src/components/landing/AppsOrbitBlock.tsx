// src/components/landing/AppsOrbitBlock.tsx
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type CSSVars = CSSProperties & Record<string, string | number>;

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

// ✅ фикс для проектов, где типы style ругаются на transitionDelay
const delay = (ms: number): CSSProperties =>
  ({ ["transitionDelay" as any]: `${ms}ms` } as CSSProperties);

export default function AppsOrbitBlock() {
  const { dict } = useLang();
  const o = dict.orbit;
  const bullets = useMemo(() => o.bullets ?? [], [o]);

  const reducedMotion = usePrefersReducedMotion();

  // ✅ старт анимации при входе
  const sentinelRef = useRef<HTMLSpanElement | null>(null);
  const [entered, setEntered] = useState(false);

  // 0..6
  const [stage, _setStage] = useState(0);
  const stageRef = useRef(0);
  const setStage = (n: number) => {
    if (stageRef.current === n) return;
    stageRef.current = n;
    _setStage(n);
  };

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      setStage(6);
      return;
    }

    const el = sentinelRef.current;
    if (!el || typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setEntered(true);
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!entered || reducedMotion) return;

    setStage(0);

    const timers: number[] = [];
    const push = (ms: number, s: number) => {
      timers.push(window.setTimeout(() => setStage(s), ms));
    };

    push(60, 1); // badge
    push(220, 2); // title
    push(430, 3); // desc
    push(720, 4); // bullets
    push(980, 5); // cta
    push(1180, 6); // footnote

    return () => timers.forEach((t) => clearTimeout(t));
  }, [entered, reducedMotion]);

  const appear = (on: boolean) =>
    cx(
      "will-change-[transform,opacity] transition-[opacity,transform]",
      "duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
      on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[16px]"
    );

  // ✅ твои 3 фотки (порядок = порядок bullets)
  const bulletImgs = useMemo(
    () => ["/images/rol.webp", "/images/tabl.webp", "/images/analitik.webp"],
    []
  );

  // ✅ единый размер для всех фото
  const IMG_H = "h-[148px] sm:h-[158px]";
  const frameBg =
    "conic-gradient(from 210deg at 50% 50%, rgba(255,255,255,.10), rgba(62,13,0,.95), rgba(69,59,18,.85), rgba(67,25,0,.95), rgba(255,255,255,.08))";

  type Bullet = (typeof bullets)[number];

function BulletCard({
  b,
  i,
  className,
}: {
  b: (typeof bullets)[number];
  i: number;
  className?: string;
}) {
  const imgSrc = bulletImgs[i] ?? bulletImgs[0];

  return (
    <div className={cx("text-left", className)}>
      {/* ✅ только фото с рамкой и текстом, без внешней “карточки” */}
      <div
        className="relative mb-4 rounded-2xl p-[1px]"
        style={{ background: frameBg } as CSSVars}
      >
        <div className="relative overflow-hidden rounded-[15px] border border-white/10 bg-black/35">
          <img
            src={imgSrc}
            alt={b.title}
            className={cx("w-full", IMG_H, "object-cover")}
            loading="lazy"
          />

          {/* затемнение/виньетка */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/80" />
          <div
            className="pointer-events-none absolute inset-0 opacity-65"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 22%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.9) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.18)_1px,transparent_0)] [background-size:22px_22px]" />

          {/* текст прямо на фотке */}
          <div className="relative z-10 flex h-full w-full flex-col justify-end px-4 pb-4">
            <div className="text-[15px] sm:text-[16px] font-[850] text-white">
              {b.title}
            </div>
            <div className="mt-1 text-[12px] sm:text-[13px] leading-snug text-white/78">
              {b.desc}
            </div>
          </div>
        </div>
      </div>

      {/* нижняя “жаркая” линия можно оставить */}
      <div className="mt-1 h-px w-full bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full w-full opacity-80"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(62,13,0,.95) 34%, rgba(67,25,0,.95) 55%, rgba(69,59,18,.9) 84%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>
    </div>
  );
}


  return (
    <Section
      className={cx(
        "relative overflow-hidden",
        "min-h-screen flex items-center",
        "pt-20 sm:pt-24 pb-20 sm:pb-24"
      )}
    >
      {/* кастомный скроллбар для мобилки */}
      <style>{`
        .orbitScroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,154,61,0.8) transparent;
        }
        .orbitScroll::-webkit-scrollbar {
          height: 4px;
        }
        .orbitScroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .orbitScroll::-webkit-scrollbar-thumb {
          border-radius: 9999px;
          background: linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A);
        }
      `}</style>

      <span
        ref={sentinelRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* локальная читабельность поверх фона */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_18%,rgba(0,0,0,0.10),rgba(0,0,0,0.55),rgba(0,0,0,0.92))]" />
      </div>

      <Container>
        <div className="relative z-10 mx-auto max-w-[1040px]">
          <div className="relative mx-auto max-w-[860px] text-center">
            <div
              className={cx(
                "text-[12px] sm:text-[13px] tracking-[0.24em] text-white/60",
                appear(stage >= 1)
              )}
              style={delay(20)}
            >
              {o.badge}
            </div>

            {/* заголовок без круга, только glow */}
            <h2
              className={cx(
                "mt-4 text-[34px] sm:text-[50px] lg:text-[62px]",
                "font-[850] leading-[1.03] tracking-[-0.025em] text-white",
                appear(stage >= 2)
              )}
              style={delay(40)}
            >
              {o.titlePrefix}{" "}
              <span className="relative inline-block align-baseline">
                <span
                  className="pointer-events-none absolute left-1/2 top-[62%] -z-10 h-10 w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-65"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,154,61,.34), rgba(62,13,0,.22), transparent 72%)",
                  }}
                />
                <span className="relative z-10 bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                  {o.titleHighlight}
                </span>
              </span>
            </h2>

            <p
              className={cx(
                "mt-5 text-[16px] sm:text-[18px] lg:text-[20px]",
                "leading-relaxed text-white/82",
                appear(stage >= 3)
              )}
              style={delay(60)}
            >
              {o.description}
            </p>

            {/* ✅ БЛОКИ: мобилка — горизонтальный скролл, десктоп — 3 колонки */}
            <div className={cx("mt-9", appear(stage >= 4))} style={delay(80)}>
              {/* mobile / tablet: горизонтальная лента */}
              <div className="-mx-4 sm:-mx-6 md:hidden">
                <div
                  className={cx(
                    "orbitScroll flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 pb-3",
                    "snap-x snap-mandatory scroll-smooth"
                  )}
                >
                  {bullets.map((b, i) => (
                    <BulletCard
                      key={b.title}
                      b={b}
                      i={i}
                      className={cx(
                        "flex-none snap-start",
                        "w-[82vw] max-w-[320px]"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* desktop: обычная сетка */}
              <div className="hidden md:grid md:grid-cols-3 gap-3 sm:gap-4">
                {bullets.map((b, i) => (
                  <BulletCard key={b.title} b={b} i={i} />
                ))}
              </div>
            </div>

            <div
              className={cx(
                "mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center",
                appear(stage >= 5)
              )}
              style={delay(90)}
            >
              <a
                href="/contacts"
                className={cx(
                  "inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl px-8",
                  "text-[15px] font-[950] tracking-[-0.01em] text-black",
                  "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                  "shadow-[0_18px_55px_rgba(255,122,0,0.18)]",
                  "hover:brightness-105 hover:shadow-[0_22px_70px_rgba(255,122,0,0.24)]",
                  "active:translate-y-[1px] transition"
                )}
              >
                {o.primaryCta}
              </a>

              <a
                href="/projects"
                className={cx(
                  "inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl px-8",
                  "border border-white/18 bg-white/7",
                  "text-[15px] font-[850] text-white/88",
                  "hover:bg-white/10 transition"
                )}
              >
                {o.secondaryCta}
              </a>
            </div>

            <div
              className={cx(
                "mt-5 text-[13px] sm:text-[14px] text-white/58",
                appear(stage >= 6)
              )}
              style={delay(120)}
            >
              {o.footnote}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
 