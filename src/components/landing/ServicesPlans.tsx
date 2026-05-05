// src/components/landing/ServicesPlans.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const ACCENT = "#FF6B2C";
const VIDEOS = ["/video/1.mp4", "/video/2.mp4", "/video/3.mp4", "/video/4.mp4"] as const;

// смещение “фокуса” видео вниз (без translate, без дыр сверху)
const VIDEO_OFFSET_PX = 14;

// ✅ TG
const TG_USERNAME = "TIVONIX";
const TG_URL = `https://t.me/${TG_USERNAME}`;
// можно накинуть текст в старт: https://t.me/<user>?text=...
const TG_TEXT_RU = "Привет! Хочу рассчитать стоимость. Пакет: ";
const TG_TEXT_EN = "Hi! I want a quote. Package: ";

type Plan = {
  key: string;

  labelRu: string;
  labelEn: string;

  titleRu: string;
  titleEn: string;

  subtitleRu: string;
  subtitleEn: string;

  ctaRu: string;
  ctaEn: string;

  noteRu: string;
  noteEn: string;

  descRu: string;
  descEn: string;

  bulletsRu: string[];
  bulletsEn: string[];

  badgeRu: string;
  badgeEn: string;

  chip?: { ru: string; en: string };
  featured?: boolean;

  videoSrc: string;
  poster?: string;
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useVideoBlock(ref: React.RefObject<HTMLVideoElement>, src?: string) {
  const [canLoad, setCanLoad] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const apply = () => setReduceMotion(!!mql.matches);
    apply();

    if ("addEventListener" in mql) {
      mql.addEventListener("change", apply);
      return () => mql.removeEventListener("change", apply);
    }
    // @ts-expect-error old API
    mql.addListener(apply);
    // @ts-expect-error old API
    return () => mql.removeListener(apply);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setCanLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setCanLoad(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "280px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  const safeReset = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    try {
      v.pause();
      v.currentTime = 0;
    } catch {}
  }, [ref]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;
    v.loop = true;

    v.preload = "none";

    const onLoadedData = () => safeReset();
    v.addEventListener("loadeddata", onLoadedData);

    safeReset();
    return () => v.removeEventListener("loadeddata", onLoadedData);
  }, [ref, safeReset]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src || !canLoad) return;

    if (v.getAttribute("data-src-attached") === "1") return;
    v.setAttribute("data-src-attached", "1");

    try {
      v.src = src;
      v.preload = "metadata";
      v.load?.();
    } catch {}
  }, [ref, src, canLoad]);

  const play = useCallback(async () => {
    const v = ref.current;
    if (!v || reduceMotion) return;
    try {
      if (v.preload !== "auto") v.preload = "auto";
      await v.play();
    } catch {}
  }, [ref, reduceMotion]);

  const stop = useCallback(() => {
    safeReset();
  }, [safeReset]);

  return { play, stop };
}

// ✅ открываем TG (в новой вкладке) + с префиллом текста
function openTelegram(planName: string, isRu: boolean) {
  const text = isRu ? `${TG_TEXT_RU}${planName}` : `${TG_TEXT_EN}${planName}`;
  const url = `${TG_URL}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function PlanCard({ p, isRu }: { p: Plan; isRu: boolean }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const { play, stop } = useVideoBlock(ref, p.videoSrc);

  const label = isRu ? p.labelRu : p.labelEn;
  const title = isRu ? p.titleRu : p.titleEn;
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const cta = isRu ? p.ctaRu : p.ctaEn;
  const note = isRu ? p.noteRu : p.noteEn;
  const desc = isRu ? p.descRu : p.descEn;
  const bullets = isRu ? p.bulletsRu : p.bulletsEn;
  const badge = isRu ? p.badgeRu : p.badgeEn;
  const chip = p.chip ? (isRu ? p.chip.ru : p.chip.en) : null;

  // имя пакета для текста в TG
  const planName = isRu ? p.labelRu : p.labelEn;

  return (
    <article
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      onPointerEnter={play}
      onPointerLeave={stop}
      className={cx(
        "group relative overflow-hidden rounded-[22px]",
        "bg-black",
        "shadow-[0_30px_120px_rgba(0,0,0,0.65)]",
        "transition-transform duration-200",
        "hover:-translate-y-0.5",
        p.featured ? "md:-translate-y-1" : ""
      )}
      style={{
        ["--accent" as any]: ACCENT,
        isolation: "isolate",
        transform: "translateZ(0)",
      }}
    >
      {/* рамка поверх всего */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px]"
        style={{
          zIndex: 999,
          boxShadow: p.featured
            ? "inset 0 0 0 1px color-mix(in srgb, var(--accent) 28%, rgba(255,255,255,0.10))"
            : "inset 0 0 0 1px rgba(255,255,255,0.10)",
        }}
      />

      {/* TOP VIDEO */}
      <div
        className="relative overflow-hidden bg-black"
        style={{
          height: 160,
          clipPath: "inset(0 round 22px 22px 0 0)",
          transform: "translateZ(0)",
        }}
      >
        <video
          ref={ref}
          poster={p.poster}
          muted
          playsInline
          loop
          preload="none"
          controls={false}
          // @ts-expect-error nonstandard attribute
          disablePictureInPicture
          className={cx(
            "absolute left-0 top-0 h-full w-full object-cover",
            "opacity-[0.70] transition-opacity duration-200",
            "group-hover:opacity-[0.90]"
          )}
          style={{
            zIndex: 1,
            filter: "contrast(1.08) saturate(1.05)",
            // ✅ смещение фокуса вниз без чёрных полос
            objectPosition: `center calc(50% + ${VIDEO_OFFSET_PX}px)`,
            backfaceVisibility: "hidden",
            willChange: "opacity",
          }}
        />

        {/* нижний градиент */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        <div className="absolute left-5 top-5 z-[10] flex items-center gap-2">
          <span
            className={cx(
              "inline-flex items-center rounded-full px-3 py-1",
              "text-[11px] font-[900] tracking-[0.14em] uppercase",
              "border border-white/10 bg-black/70 text-white/80",
              "backdrop-blur"
            )}
          >
            {label}
          </span>

          {chip ? (
            <span
              className={cx(
                "inline-flex items-center rounded-full px-2.5 py-1",
                "text-[10px] font-[900] tracking-[0.14em] uppercase",
                "border border-white/10 bg-white/[0.05] text-white/70"
              )}
            >
              {chip}
            </span>
          ) : null}
        </div>
      </div>

      {/* BODY */}
      <div className="px-6 pt-5 relative z-[5]">
        <div
          className={cx(
            "text-[34px] leading-[0.95] font-[950] tracking-[-0.035em] text-white",
            "whitespace-nowrap text-left"
          )}
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </div>

        <div className="mt-3 text-[12.5px] text-white/55">{subtitle}</div>

        <div className="mt-5">
          {/* ✅ Кнопка ведёт в Telegram */}
          <button
            type="button"
            onClick={() => openTelegram(planName, isRu)}
            className={cx(
              "inline-flex h-11 w-full items-center justify-center rounded-full px-6",
              "text-[12px] font-[950] tracking-[0.18em] uppercase",
              "text-black bg-[color:var(--accent)]",
              "shadow-[0_18px_55px_rgba(255,107,44,0.18)]",
              "transition hover:brightness-105",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40"
            )}
          >
            {cta}
          </button>

          <div className="mt-2 text-center text-[12px] text-white/45">{note}</div>
        </div>

        <div className="mt-5 -mx-6 relative z-[5]">
          <div className="rounded-t-[18px] border-t border-x border-white/10 bg-white/[0.04] px-6 py-5">
            <div className="text-[13px] leading-relaxed text-white/80">{desc}</div>

            <ul className="mt-4 space-y-2.5 text-[13px] text-white/62">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-[2px] text-white/45">
                    <CheckIcon />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center gap-2">
              <span
                className={cx(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1",
                  "border border-white/10 bg-black/35",
                  "text-[11px] font-[950] tracking-[0.14em] uppercase text-white/70"
                )}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "color-mix(in srgb, var(--accent) 70%, transparent)" }}
                />
                {badge}
              </span>

              <span className="text-[11px] text-white/40">
                {isRu ? "Поддержка и консультация" : "Support & consultation"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* featured accent */}
      {p.featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px]"
          style={{
            zIndex: 998,
            boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 28%, transparent)",
          }}
        />
      ) : null}
    </article>
  );
}

export default function ServicesPlans({ className }: { className?: string }) {
  const { lang } = useLang();
  const isRu = lang === "ru";

  const plans = useMemo<Plan[]>(
    () => [
      {
        key: "launch",
        labelRu: "Лендинги + боты",
        labelEn: "Landing + Bots",
        titleRu: "БЫСТРЫЙ ЗАПУСК",
        titleEn: "LAUNCH",
        subtitleRu: "Лендинг + заявки + Telegram",
        subtitleEn: "Fast start: landing + Telegram bot",
        ctaRu: "Рассчитать стоимость",
        ctaEn: "Get a quote",
        noteRu: "Ответим в течение дня",
        noteEn: "Reply within 24h",
        descRu:
          "Сделаем страницу для рекламы и подключим приём заявок, чтобы вы быстро начали получать обращения от клиентов.",
        descEn: "Launch package: conversion landing + bot for leads and support.",
        bulletsRu: [
          "Страница под рекламу и продажи",
          "Форма заявки и кнопки связи",
          "Уведомления о заявках в Telegram",
          "Адаптация под телефон и базовая аналитика",
        ],
        bulletsEn: [
          "Conversion landing for ads",
          "Bot flows, menus, commands",
          "Integrations: CRM / Google / Notion",
          "Responsive, SEO basics, fast load",
        ],
        badgeRu: "Подходит для быстрого старта",
        badgeEn: "INCLUDED",
        chip: { ru: "ПАКЕТ", en: "BUNDLE" },
        videoSrc: VIDEOS[0],
      },
      {
        key: "product",
        labelRu: "Продукт",
        labelEn: "Product",
        titleRu: "ОНЛАЙН-СЕРВИС",
        titleEn: "PRODUCT",
        subtitleRu: "Личный кабинет, админка, оплата",
        subtitleEn: "MVP / dashboard / admin panel",
        ctaRu: "Рассчитать стоимость",
        ctaEn: "Get a quote",
        noteRu: "Предварительная оценка за 24 часа",
        noteEn: "Estimate in 24h",
        descRu:
          "Разработаем полноценный веб-сервис: пользователи смогут регистрироваться, пользоваться продуктом, оплачивать и получать нужный результат.",
        descEn: "Bigger builds: MVPs, dashboards, admin panels, roles, databases and integrations.",
        bulletsRu: [
          "Личный кабинет для клиентов",
          "Админ-панель для управления",
          "Роли пользователей и доступы",
          "Оплата, уведомления и интеграции",
        ],
        bulletsEn: ["Architecture, FE/BE, deploy", "Auth, roles, payments", "Admin, tables, filters", "Post-launch support"],
        badgeRu: "Рекомендуем для продукта",
        badgeEn: "RECOMMENDED",
        chip: { ru: "ЛУЧШИЙ ВЫБОР", en: "BEST VALUE" },
        videoSrc: VIDEOS[1],
        featured: true,
      },
      {
        key: "automation",
        labelRu: "Автоматизация",
        labelEn: "Automation",
        titleRu: "АВТОМАТИЗАЦИЯ",
        titleEn: "AUTOMATION",
        subtitleRu: "Меньше ручной работы",
        subtitleEn: "Integrations / scripts / routine",
        ctaRu: "Рассчитать стоимость",
        ctaEn: "Get a quote",
        noteRu: "Поможем упростить процессы",
        noteEn: "No fluff",
        descRu:
          "Настроим процессы, которые сейчас отнимают время: заявки, таблицы, отчёты, уведомления и работу с клиентами.",
        descEn: "Automate routine: leads, sheets, reports, messaging and integrations.",
        bulletsRu: [
          "Автоматизация заявок и задач",
          "Связка таблиц и сервисов",
          "Уведомления в Telegram или email",
          "Отчёты, статусы и контроль процессов",
        ],
        bulletsEn: ["Make / Zapier / API integrations", "Google Sheets / Notion / CRM", "Telegram notifications", "Logs and stability"],
        badgeRu: "Подходит для бизнеса и команды",
        badgeEn: "INCLUDED",
        videoSrc: VIDEOS[3],
      },
    ],
    []
  );

  return (
    <section className={cx("relative", className)} style={{ ["--accent" as any]: ACCENT }}>
      <Container>
        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {plans.map((p) => (
            <PlanCard key={p.key} p={p} isRu={isRu} />
          ))}
        </div>
      </Container>
    </section>
  );
}