// src/components/landing/SaaSMap.tsx
import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider"; // ✅ твой провайдер

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return reduced;
}

// ✅ картинка: public/images/saas-map.png
const IMG = "/images/saas-map.png";
const STEPS = [1, 2, 3, 4, 5, 6, 7];

export default function SaaSMap() {
  const { lang } = useLang();          // ✅ берём язык из провайдера
  const isRu = lang === "ru";

  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [show, setShow] = useState(false);
  const [revealT, setRevealT] = useState(0); // 0..1

  const topLabel = isRu ? "ДЕМО • ВИЗУАЛ • SaaS" : "DEMO • VISUAL • SaaS";
  const title = isRu ? "Карта продукта" : "Product map";
  const imgAlt = isRu ? "Карта продукта" : "Product map";
  const bottomText = isRu
    ? 'Сейчас мутность держится дольше и уходит “по чуть-чуть”. Ниже — цепочка шагов от 1 до 7.'
    : "Now the blur holds longer and fades out smoothly. Below is the chain of steps from 1 to 7.";

  /**
   * ✅ ВАЖНО: низ делаем В ТОТ ЖЕ СЕРЫЙ, что и в FAQ (#050505),
   * чтобы стык между секциями был без «полосы» и резкого перепада.
   */
  const BG =
    "radial-gradient(900px 520px at 12% 18%, rgba(42,12,0,0.74) 0%, rgba(0,0,0,0) 68%)," +
    "radial-gradient(820px 520px at 86% 30%, rgba(26,10,5,0.62) 0%, rgba(0,0,0,0) 66%)," +
    "linear-gradient(to bottom, #000000 0%, #000000 34%, #020202 52%, #050505 78%, #050505 100%)";

  // ✅ триггер появления
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShow(true);
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ✅ скролл-проявление мутности
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh * 0.95;
      const end = vh * 0.1;

      const raw = (start - r.top) / (start - end);
      const t = clamp(raw, 0, 1);

      setRevealT(t);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // ✅ кривая: держим мутность дольше
  const POWER = 2.4;
  const eased = reduced ? 1 : Math.pow(revealT, POWER);

  // ✅ параметры
  const MAX_BLUR = 28;
  const blurPx = reduced ? 0 : MAX_BLUR * (1 - eased);
  const imgOpacity = reduced ? 1 : 0.25 + eased * 0.75;
  const imgSat = reduced ? 1 : 0.88 + eased * 0.16;
  const imgContrast = reduced ? 1 : 1.08 - eased * 0.08;

  const fogOpacity = reduced ? 0 : 0.62 * (1 - eased);
  const vignetteOpacity = reduced ? 0.26 : 0.54 - eased * 0.24;

  return (
    <Section id="saas-map" className="relative overflow-hidden py-16 sm:py-24">
      {/* фон секции */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: BG } as React.CSSProperties}
      />

      {/* ✅ НИЖНЯЯ ПОДУШКА В ТОТ ЖЕ СЕРЫЙ (#050505), как у FAQ сверху */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[360px]"
        style={
          {
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(5,5,5,0.18) 26%, rgba(5,5,5,0.52) 56%, rgba(5,5,5,0.92) 85%, #050505 100%)",
          } as React.CSSProperties
        }
      />

      {/* dotted-pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={
          {
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(128,62,42,0.12) 1px, rgba(0,0,0,0) 1.8px)",
            backgroundSize: "20px 20px",
          } as React.CSSProperties
        }
      />

      {/* виньетка (мягче) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={
          {
            backgroundImage:
              "radial-gradient(120% 85% at 50% 32%, rgba(0,0,0,0) 0%, rgba(0,0,0,.28) 72%, rgba(0,0,0,.44) 100%)",
          } as React.CSSProperties
        }
      />

      <Container>
        <div ref={rootRef} className="relative">
          {/* ТЕКСТ */}
          <div
            className={cx(
              "mx-auto max-w-3xl text-center",
              "transition-all duration-700 will-change-[transform,opacity]",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={
              {
                transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
              } as React.CSSProperties
            }
          >
            <div className="text-[11px] font-semibold tracking-[0.22em] text-[#B0B0B0]">
              {topLabel}
            </div>

            <div className="mt-4 font-display text-[28px] leading-[1.08] sm:text-[40px] font-extrabold text-[#EAEAEA]">
              {title}
            </div>
          </div>

          {/* КАРТИНКА */}
          <div className="mt-10 sm:mt-12">
            <div
              className={cx(
                "relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px]",
                "border border-white/10 bg-white/[0.02] backdrop-blur-2xl",
                "transition-[transform,opacity] duration-700 will-change-[transform,opacity]",
                show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]",
                "px-[5px]"
              )}
              style={
                {
                  boxShadow: "none",
                  transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                } as React.CSSProperties
              }
            >
              {/* тонкая верхняя линия */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-70"
                style={
                  {
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 75%, rgba(255,255,255,0) 100%)",
                  } as React.CSSProperties
                }
              />

              {/* изображение */}
              <img
                src={IMG}
                alt={imgAlt}
                className="block h-auto w-full select-none"
                draggable={false}
                style={
                  {
                    opacity: imgOpacity,
                    filter: `blur(${blurPx}px) saturate(${imgSat}) contrast(${imgContrast})`,
                    transform: "translateX(-5px) scale(1.02)",
                    transformOrigin: "center",
                    transition: reduced ? "none" : "filter .22s ease, opacity .22s ease",
                  } as React.CSSProperties
                }
              />

              {/* дымка */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={
                  {
                    opacity: fogOpacity,
                    backgroundImage: [
                      "radial-gradient(900px 520px at 18% 22%, rgba(42,12,0,1) 0%, rgba(0,0,0,0) 70%)",
                      "radial-gradient(900px 520px at 82% 30%, rgba(26,10,5,1) 0%, rgba(0,0,0,0) 72%)",
                      "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.58) 100%)",
                    ].join(", "),
                    transition: reduced ? "none" : "opacity .22s ease",
                  } as React.CSSProperties
                }
              />

              {/* виньетка по краям */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={
                  {
                    opacity: vignetteOpacity,
                    backgroundImage:
                      "radial-gradient(120% 85% at 50% 33%, rgba(0,0,0,0) 0%, rgba(0,0,0,.44) 72%, rgba(0,0,0,.64) 100%)",
                    transition: reduced ? "none" : "opacity .22s ease",
                  } as React.CSSProperties
                }
              />

              {/* точки поверх */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={
                  {
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(128,62,42,0.12) 1px, rgba(0,0,0,0) 1.8px)",
                    backgroundSize: "22px 22px",
                    opacity: 0.26,
                    mixBlendMode: "screen",
                  } as React.CSSProperties
                }
              />

              {/* внутренняя рамка */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[28px]"
                style={
                  {
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)",
                  } as React.CSSProperties
                }
              />
            </div>

            {/* цепочка 1–7 */}
            <div
              className={cx(
                "mt-8 sm:mt-9",
                "transition-all duration-700 will-change-[transform,opacity]",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
              style={
                {
                  transitionTimingFunction: "cubic-bezier(.2,.9,.2,1)",
                } as React.CSSProperties
              }
            >
              <div className="relative mx-auto max-w-4xl px-2">
                {/* линия под кружками */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[6%] right-[6%] top-1/2 h-[2px] -translate-y-1/2 rounded-full"
                  style={
                    {
                      background:
                        "linear-gradient(90deg, rgba(255,197,143,0.05) 0%, rgba(255,154,61,0.55) 35%, rgba(255,106,26,0.75) 50%, rgba(255,154,61,0.55) 65%, rgba(255,197,143,0.05) 100%)",
                    } as React.CSSProperties
                  }
                />
                <ol className="relative grid grid-cols-7 gap-2 sm:gap-3">
                  {STEPS.map((s) => (
                    <li key={s} className="flex flex-col items-center">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold text-[#F9EEE5] shadow-[0_0_0_1px_rgba(0,0,0,0.7)]"
                        style={
                          {
                            background:
                              "radial-gradient(circle at 30% 0%, #FFE0BF 0%, #FF9A3D 38%, #3C1202 100%)",
                            boxShadow:
                              "0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(0,0,0,0.65)",
                          } as React.CSSProperties
                        }
                      >
                        {s}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* подпись */}
            <div className="mx-auto mt-5 max-w-3xl text-center text-[12px] text-[#8C8C8C]">
              {bottomText}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
