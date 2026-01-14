// src/components/landing/Benefits.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../ui/Section";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** public/images/212.webp */
const BG_IMG = "/images/212.webp";

/* ====== pill ====== */
function Pill({ text }: { text: string }) {
  return (
    <div
      className={cx(
        "inline-flex items-center justify-center",
        "h-10 px-4 rounded-full",
        "border border-white/16 bg-white/[0.06] backdrop-blur-xl",
        "text-[12px] font-[650] tracking-[-0.01em] text-white/78",
        "transition duration-200",
        "hover:border-white/28 hover:bg-white/[0.08] hover:text-white/90"
      )}
    >
      {text}
    </div>
  );
}

/* ====== mobile pills slider: автоскролл (бесконечно) + прогресс ====== */
function MobilePillsSlider({ pills }: { pills: string[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  // пауза при касании/скролле
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let t: number | undefined;
    const pause = () => {
      setPaused(true);
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => setPaused(false), 2200);
    };

    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("mousedown", pause);
    el.addEventListener("wheel", pause, { passive: true });

    return () => {
      el.removeEventListener("touchstart", pause as any);
      el.removeEventListener("mousedown", pause as any);
      el.removeEventListener("wheel", pause as any);
      if (t) window.clearTimeout(t);
    };
  }, []);

  // прогресс (по “первой ленте”, без учёта дубля)
  useEffect(() => {
    const wrap = scrollerRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const update = () => {
      const one = track.scrollWidth / 2;
      const max = Math.max(1, one - wrap.clientWidth);
      const leftInOne = ((wrap.scrollLeft % one) + one) % one;
      const p = Math.max(0, Math.min(1, leftInOne / max));
      setProgress(p);
    };

    update();
    wrap.addEventListener("scroll", update, { passive: true });

    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    ro.observe(track);

    return () => {
      wrap.removeEventListener("scroll", update as any);
      ro.disconnect();
    };
  }, []);

  // автоскролл + бесконечность (дублированный трек)
  useEffect(() => {
    const wrap = scrollerRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const PX_PER_TICK = 1;
    const TICK_MS = 18;

    const step = () => {
      if (paused) return;
      const one = track.scrollWidth / 2;
      if (one <= 0) return;

      wrap.scrollLeft += PX_PER_TICK;

      if (wrap.scrollLeft >= one * 1.5) {
        wrap.scrollLeft -= one;
      }
    };

    const id = window.setInterval(step, TICK_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const doubled = useMemo(() => [...pills, ...pills], [pills]);

  return (
    <div className="sm:hidden mt-6">
      {/* progress bar */}
      <div className="mx-auto w-full max-w-[340px]">
        <div className="h-[6px] rounded-full bg-white/12 overflow-hidden border border-white/10">
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background:
                "linear-gradient(90deg, rgba(255,154,61,0.95), rgba(255,220,170,0.90))",
            }}
          />
        </div>
      </div>

      {/* one row */}
      <div className="mt-3">
        <div
          ref={scrollerRef}
          className={cx(
            "overflow-x-auto",
            "px-1 -mx-1 pb-2",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          <div ref={trackRef} className="flex gap-2.5 w-max">
            {doubled.map((t, idx) => (
              <div key={`${t}-${idx}`} className="shrink-0">
                <Pill text={t} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 text-center text-[11.5px] text-white/45">
          {Math.round(progress * 100)}%
        </div>
      </div>
    </div>
  );
}

export default function Benefits() {
  const { dict, lang } = useLang();
  const isRu = lang === "ru";

  // безопасно (чтобы TS не ругался на BenefitsDict)
  const bd: any = (dict as any)?.benefits ?? {};

  const titleLine1 =
    bd?.titleLine1 ?? (isRu ? "Запуск продукта без переделок." : "Launch without rework.");
  const titleLine2 =
    bd?.titleLine2 ?? (isRu ? "Дизайн + разработка под ключ" : "Design + development turnkey");
  const subtitle =
    bd?.subtitle ??
    (isRu
      ? "UI, код и интеграции — в одном процессе. Получите MVP или сайт, готовый к трафику и продажам."
      : "UI, code, and integrations in one flow. Get an MVP or website ready for traffic and sales.");

  const ctaText = bd?.ctaPrimary ?? (isRu ? "Обсудить проект" : "Discuss your project");
  const ctaSub = bd?.ctaSub ?? (isRu ? "Ответ в течение 2 часов" : "Reply within 2 hours");

  const pills = useMemo<string[]>(() => {
    const fromDict = bd?.pills;
    if (Array.isArray(fromDict) && fromDict.length) return fromDict;

    return isRu
      ? [
          "SaaS и личные кабинеты",
          "Дашборды и аналитика",
          "Лендинги и сайты",
          "Telegram-боты и чаты",
          "Интеграции с CRM и API",
          "Автоматизация рутины",
          "Поддержка и развитие",
        ]
      : [
          "SaaS & client areas",
          "Dashboards & analytics",
          "Landing pages & sites",
          "Telegram bots & chats",
          "CRM & API integrations",
          "Routine automation",
          "Support & growth",
        ];
  }, [bd, isRu]);

  return (
    <Section id="benefits" className="relative pt-16 sm:pt-20 pb-16 sm:pb-20">
      {/* общий фон секции */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.52),rgba(0,0,0,0.96))]" />
        <div className="absolute inset-0 opacity-[0.055] [background-image:radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 [background:radial-gradient(60%_55%_at_50%_0%,rgba(255,154,61,0.12),transparent_60%)]" />
      </div>

      <Container>
        <div className="relative z-10">
          <div
            className={cx(
              "relative overflow-hidden rounded-[26px] sm:rounded-[30px]",
              "border border-white/10",
              "shadow-[0_40px_160px_rgba(0,0,0,0.82)]"
            )}
          >
            {/* фон */}
            <img
              src={BG_IMG}
              alt=""
              draggable={false}
              className={cx(
                "pointer-events-none absolute inset-0 h-full w-full object-cover blur-[1px]",
                "object-[50%_65%]"
              )}
            />

            {/* оверлей */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(110% 140% at 50% 115%, rgba(255,154,61,0.42), transparent 62%)," +
                  "linear-gradient(135deg, rgba(0,0,0,0.60), rgba(0,0,0,0.94))",
              }}
            />

            {/* мягкая виньетка */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_20%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

            {/* контент */}
            <div className="relative z-10 px-5 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12">
              <div className="mx-auto max-w-[980px] text-center text-white">
                <h2 className="leading-[1.04] tracking-[-0.045em] text-[30px] sm:text-[46px] lg:text-[58px]">
                  <span className="font-[780] text-white/95">{titleLine1}</span>
                  <br />
                  <span
                    className={cx(
                      "font-[820] inline-block mt-1 sm:mt-0",
                      "bg-[linear-gradient(90deg,rgba(255,154,61,0.98),rgba(255,220,170,0.92))]",
                      "bg-clip-text text-transparent"
                    )}
                  >
                    {titleLine2}
                  </span>
                </h2>

                <p className="mt-4 sm:mt-5 text-[13.75px] sm:text-[15.75px] leading-[1.62] text-white/84 max-w-[860px] mx-auto">
                  {subtitle}
                </p>

                {/* CTA — статичная премиум-кнопка */}
                <div className="mt-6 sm:mt-9 flex flex-col items-center gap-2.5">
                  <Link
                    to="/contacts"
                    className={cx(
                      "group relative inline-flex items-center justify-center",
                      "h-[52px] sm:h-[58px] px-8 sm:px-11 rounded-full overflow-hidden select-none",
                      "text-[12.5px] sm:text-[13px] font-[900] tracking-[0.10em] uppercase",
                      "text-black",
                      "transition duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                      "active:scale-[0.99]"
                    )}
                    style={{
                      boxShadow:
                        "0 22px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.32)",
                    }}
                    aria-label={ctaText}
                  >
                    {/* base gradient */}
                    <span
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,154,61,0.98), rgba(255,220,170,0.92))",
                      }}
                    />
                    {/* glossy top highlight */}
                    <span className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.40),transparent)] opacity-70" />
                    {/* hover bloom */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-200 [background:radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.55),transparent_60%)]" />
                    {/* edge ring */}
                    <span className="absolute inset-0 rounded-full ring-1 ring-white/25" />
                    {/* subtle dark edge */}
                    <span className="absolute inset-0 rounded-full shadow-[inset_0_-1px_0_rgba(0,0,0,0.20)]" />

                    <span className="relative z-10">{ctaText}</span>
                  </Link>

                  <div className="text-[12px] sm:text-[12.5px] text-white/60">{ctaSub}</div>
                </div>

                {/* MOBILE: авто-скролл чипов */}
                <MobilePillsSlider pills={pills} />

                {/* DESKTOP/TABLET: wrap чипов */}
                <div className="hidden sm:flex mt-10 flex-wrap justify-center gap-3 max-w-[980px] mx-auto">
                  {pills.map((t) => (
                    <Pill key={t} text={t} />
                  ))}
                </div>
              </div>
            </div>

            {/* мягкий низ */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.36),transparent)]" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
