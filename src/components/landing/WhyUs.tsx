// src/components/landing/WhyUs.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

const STICKY_TOP = 96;
const MOBILE_STICKY_TOP = "calc(var(--header-h, 72px) + 10px)";

type StackItem = {
  id: string;
  label: string;
  src: string;
};

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

/** прогресс справа (desktop) / слева (mobile) */
function ProgressBar({
  progress,
  height,
  thin = false,
  showPercent = false,
}: {
  progress: number;
  height: number;
  thin?: boolean;
  showPercent?: boolean;
}) {
  const w = thin ? 12 : 16;
  const p = clamp(progress, 0, 1);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center" style={{ height, width: w }}>
        <div className="absolute inset-y-0 w-[2px] rounded-full bg-white/10" />
        <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 overflow-hidden rounded-full bg-white/8">
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{ height: `${p * 100}%`, background: "#F97316" }}
          />
        </div>
        <div
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/45 bg-black/85"
          style={{ top: `${p * 100}%`, marginTop: -6 }}
        />
      </div>

      {showPercent && (
        <div className="mt-3 text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
          {Math.round(p * 100)}%
        </div>
      )}
    </div>
  );
}

/** ✅ Иконка 200×200 как фото, с серым градиентным бордером */
function StackPhoto({
  item,
  index,
  reveal,
  setRef,
}: {
  item: StackItem;
  index: number;
  reveal: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={setRef}
      className="relative"
      style={
        {
          opacity: reveal ? 1 : 0,
          transform: reveal ? "translateY(0)" : "translateY(14px)",
          transition:
            "transform .45s cubic-bezier(.2,.9,.2,1), opacity .4s ease",
          transitionDelay: `${index * 28}ms`,
        } as CSSProperties
      }
    >
      {/* рамка */}
      <div
        className="group relative h-[200px] w-[200px] overflow-hidden rounded-[34px] p-[2px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.08) 40%, rgba(255,255,255,.18) 100%)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-black/35">
          {/* картинка */}
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            draggable={false}
            className="h-full w-full select-none"
            style={{
              objectFit: "cover", // если не надо обрезать — contain
              objectPosition: "center",
              transition: "opacity 180ms ease",
            }}
          />

          {/* внутренняя обводка */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/8" />

          {/* ✅ СКАН-МАСКА: картинка “пропадает” (приглушение) */}
          <div
            className={[
              "pointer-events-none absolute inset-0",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-150",
            ].join(" ")}
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.80) 55%, rgba(0,0,0,.86) 100%)",
            }}
          />

          {/* ✅ ТЕКСТ ПО ЦЕНТРУ */}
          <div
            className={[
              "pointer-events-none absolute inset-0 flex items-center justify-center",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-180",
            ].join(" ")}
          >
            <div
              className={[
                "rounded-full border border-white/12 bg-black/55 backdrop-blur",
                "px-5 py-3",
                "text-[12px] font-semibold tracking-[0.28em] uppercase",
                "text-white/90",
              ].join(" ")}
            >
              {item.label}
            </div>
          </div>

          {/* ✅ ЧЁТКАЯ СКАН-ЛИНИЯ (тонкая, яркая) */}
          <div className="pointer-events-none absolute inset-0">
            {/* сама линия */}
            <div
              className={[
                "absolute top-[-10%] h-[120%] w-[2px]",
                "opacity-0 group-hover:opacity-100",
                // старт слева за пределами
                "-translate-x-[40px]",
                // на hover уезжает вправо за пределы
                "group-hover:translate-x-[240px]",
                "transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.9,.2,1)]",
              ].join(" ")}
              style={{
                left: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.95) 30%, rgba(249,115,22,.95) 50%, rgba(255,255,255,.9) 70%, rgba(255,255,255,0) 100%)",
              }}
            />
            {/* лёгкий glow вокруг линии (очень аккуратный) */}
            <div
              className={[
                "absolute top-[-10%] h-[120%] w-[10px]",
                "opacity-0 group-hover:opacity-100",
                "-translate-x-[44px] group-hover:translate-x-[236px]",
                "transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.9,.2,1)]",
              ].join(" ")}
              style={{
                left: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(249,115,22,.20) 45%, rgba(255,255,255,.14) 55%, rgba(255,255,255,0) 100%)",
                filter: "blur(3px)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const { dict } = useLang();
  const w = dict.whyUs;

  // ✅ список твоих иконок справа (порядок — как хочешь)
  const stack = useMemo<StackItem[]>(
    () => [
      { id: "cms", label: "CMS", src: "/images/stack/cms.webp" },
      { id: "css", label: "CSS", src: "/images/stack/css.webp" },
      { id: "ex", label: "Express", src: "/images/stack/ex.webp" },
      { id: "html", label: "HTML", src: "/images/stack/html.webp" },
      { id: "js", label: "JavaScript", src: "/images/stack/js.webp" },
      { id: "node", label: "Node.js", src: "/images/stack/node.webp" },
      { id: "pg", label: "Postgres", src: "/images/stack/pg.webp" },
      { id: "react", label: "React", src: "/images/stack/react.webp" },
      { id: "saas", label: "SaaS", src: "/images/stack/saas.webp" },
      { id: "supabase", label: "Supabase", src: "/images/stack/supabase.webp" },
      { id: "ts", label: "TypeScript", src: "/images/stack/ts.webp" },
      { id: "tw", label: "Tailwind", src: "/images/stack/tw.webp" },
    ],
    []
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [reveal, setReveal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // reveal
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setReveal(true);
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // прогресс — по центрам первого/последнего фото
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;

      const midView = window.innerHeight * 0.5;
      let firstCenter: number | null = null;
      let lastCenter: number | null = null;

      itemRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        if (firstCenter === null || c < firstCenter) firstCenter = c;
        if (lastCenter === null || c > lastCenter) lastCenter = c;
      });

      if (
        firstCenter !== null &&
        lastCenter !== null &&
        Math.abs(lastCenter - firstCenter) > 4
      ) {
        const raw = (midView - firstCenter) / (lastCenter - firstCenter);
        setScrollProgress(clamp(raw, 0, 1));
      } else {
        setScrollProgress(0);
      }
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

  return (
    <Section className="pt-[200px] sm:pt-[260px] pb-16 sm:pb-24">
      <div ref={rootRef} className="relative">
        {/* фон */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-32 bg-gradient-to-b from-black via-black/90 to-transparent" />

        {/* споты */}
        <div className="pointer-events-none absolute -z-10 inset-0">
          <div
            className="absolute -left-24 top-20 h-[520px] w-[520px] rounded-full opacity-[0.22]"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(249,115,22,.25), rgba(249,115,22,0) 60%)",
            }}
          />
          <div
            className="absolute -right-24 top-40 h-[520px] w-[520px] rounded-full opacity-[0.18]"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,.12), rgba(255,255,255,0) 62%)",
            }}
          />
        </div>

        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[560px_minmax(0,1fr)_60px]">
            {/* слева — заголовок */}
            <div className="lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <div className="flex items-center gap-3">
                <div className="text-[12px] font-semibold tracking-[0.26em] uppercase">
                  <span className="text-white/85">СТЕК</span>
                  <span className="text-white/25"> • </span>
                  <span className="text-[#F97316]/95">ТЕХНОЛОГИИ</span>
                  <span className="text-white/25"> • </span>
                  <span className="text-white/70">ПРОДУКТ</span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/18 via-white/8 to-transparent" />
              </div>

              <h2 className="mt-5 font-display text-[46px] leading-[0.96] sm:text-[64px] lg:text-[72px] font-extrabold">
                <span className="text-white/95">{w?.title1 ?? "С чем мы"}</span>
                <br />
                <span
                  className="bg-gradient-to-r from-white via-white to-[#F97316] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  {w?.title2 ?? "работаем"}
                </span>
              </h2>

              <p className="mt-6 max-w-[46ch] text-[14px] leading-relaxed text-white/55">
                {w?.sub ??
                  "Полный стек для разработки: UI, фронтенд, бэкенд, база данных, админка, performance."}
              </p>
            </div>

            {/* центр — фото-лента */}
            <div className="relative">
              <div className="grid grid-cols-[16px_minmax(0,1fr)] items-start gap-4 lg:block">
                {/* mobile прогресс */}
                <div
                  className="sticky self-start lg:hidden"
                  style={{ top: MOBILE_STICKY_TOP } as CSSProperties}
                >
                  <ProgressBar progress={scrollProgress} height={220} thin />
                </div>

                {/* сами фотки */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
                  {stack.map((it, i) => (
                    <StackPhoto
                      key={it.id}
                      item={it}
                      index={i}
                      reveal={reveal}
                      setRef={(el) => (itemRefs.current[i] = el)}
                    />
                  ))}
                </div>
              </div>

              <div className="pointer-events-none sticky bottom-0 mt-10 h-16 w-full bg-gradient-to-t from-black via-black/95 to-transparent" />
            </div>

            {/* справа — прогресс бар (desktop) */}
            <div className="hidden lg:block lg:sticky" style={{ top: STICKY_TOP } as CSSProperties}>
              <ProgressBar progress={scrollProgress} height={320} showPercent />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
