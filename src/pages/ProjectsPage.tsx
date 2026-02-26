// src/pages/ProjectsPage.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Header from "../components/landing/Headerdouble";
import { useLang } from "../i18n/LangProvider";

const HERO_IMG = "/images/hero.png";
const PROJECTS_BG = "/images/projects-bg.png";
const HEADER_H = 72;

const UPC_DOMAIN = "https://upc.promo/";
const PAYCLIP_DOMAIN = "https://usepayclip.com/";
const LABELOS_DOMAIN = "https://labelos.digital/";

const GMAIL_EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent("tivoonix@gmail.com")}` +
  `&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;

type ProjectStatus = "live" | "wip";

type Testimonial = {
  name: string;
  role: string;
  text: string;
};

type Project = {
  id: string;
  title: string;
  subtitleRu: string;
  subtitleEn: string;

  // content for modal
  detailsRu: string;
  detailsEn: string;

  domain?: string;
  tags: string[];
  cover?: string;
  status?: ProjectStatus;

  outcomes?: string[];
  stack?: string[];
  testimonial?: Testimonial;
};

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

type Style = CSSProperties & Record<string, unknown>;
const s = (v: Record<string, unknown>) => v as Style;

function useParallaxCards() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    if (!els.length) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 800;

      for (const el of els) {
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const p = 1 - clamp(mid / vh, 0, 1);
        const amp = Number(el.dataset.parallaxAmp || 16);
        const y = (p - 0.5) * amp * -1.1;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

function DomainPill({
  href,
  status = "live",
  isRu,
}: {
  href?: string;
  status?: ProjectStatus;
  isRu: boolean;
}) {
  const openLabel = isRu ? "Открыть" : "Open";
  const wipLabel = isRu ? "В разработке" : "In progress";

  if (!href || status === "wip") {
    return (
      <div
        className={cx(
          "inline-flex items-center gap-2",
          "rounded-2xl px-4 py-2",
          "border border-white/12 bg-black/30 backdrop-blur-xl",
          "text-white/75",
          "shadow-[0_14px_60px_rgba(0,0,0,0.40)]"
        )}
      >
        <span className="h-2 w-2 rounded-full bg-white/35 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
        <span className="text-[13px] font-[650] tracking-tight">
          {wipLabel}
        </span>
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
        "group inline-flex items-center gap-2",
        "rounded-2xl px-4 py-2",
        "border border-white/12 bg-black/30 backdrop-blur-xl",
        "text-white/85 hover:text-white transition",
        "shadow-[0_14px_60px_rgba(0,0,0,0.40)]"
      )}
      aria-label={`${clean} — ${openLabel}`}
      title={clean}
    >
      <span className="h-2 w-2 rounded-full bg-[#FF9A3D]/80 shadow-[0_0_0_4px_rgba(255,154,61,0.12)]" />
      <span className="text-[13px] font-[650] tracking-tight">{clean}</span>
      <span className="ml-1 text-[#FF9A3D]/80 group-hover:text-[#FF6A1A] transition">
        •
      </span>
      <span className="text-[12px] text-white/55 group-hover:text-white/70 transition">
        {openLabel}
      </span>
    </a>
  );
}

/**
 * RIGHT SLIDE-OVER MODAL (right half screen)
 * - slides from right
 * - takes right half on desktop, full width on mobile
 * - closes on backdrop click + Esc
 * - locks body scroll
 */
function ProjectSlideOver({
  open,
  project,
  isRu,
  onClose,
}: {
  open: boolean;
  project: Project | null;
  isRu: boolean;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!project) return null;

  const titleId = `proj-title-${project.id}`;
  const descId = `proj-desc-${project.id}`;

  const subtitle = isRu ? project.subtitleRu : project.subtitleEn;
  const details = isRu ? project.detailsRu : project.detailsEn;

  const closeLabel = isRu ? "Закрыть" : "Close";
  const resultsLabel = isRu ? "Результаты" : "Outcomes";
  const stackLabel = isRu ? "Стек" : "Stack";
  const openSiteLabel = isRu ? "Открыть сайт" : "Open website";
  const estimateLabel = isRu ? "Оценка за 24 часа" : "Estimate in 24h";
  const websiteSoonLabel = isRu ? "Сайт скоро" : "Website soon";

  return (
    <div
      className={cx(
        "fixed inset-0 z-[80]",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className={cx(
          "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* panel wrapper */}
      <div
        className={cx(
          "absolute right-0 top-0 h-full w-full sm:w-[min(560px,100%)] lg:w-1/2",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className={cx(
            "relative h-full overflow-hidden",
            "border-l border-white/10",
            "bg-[#070707]/92 backdrop-blur-2xl",
            "shadow-[-30px_0_120px_rgba(0,0,0,0.75)]"
          )}
        >
          {/* visual */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={project.cover ?? HERO_IMG}
              alt=""
              className={cx(
                "absolute inset-0 h-full w-full object-cover",
                "opacity-[0.18] blur-[10px] scale-[1.06]"
              )}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={s({
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.94))," +
                  "radial-gradient(900px 520px at 18% 10%, rgba(255,154,61,0.16) 0%, rgba(0,0,0,0) 44%)," +
                  "radial-gradient(820px 520px at 90% 22%, rgba(255,106,26,0.12) 0%, rgba(0,0,0,0) 64%)",
              })}
            />
          </div>

          {/* header */}
          <div className="relative z-10 flex items-start justify-between gap-4 p-5 sm:p-6">
            <div className="min-w-0">
              <div
                id={titleId}
                className="text-[18px] sm:text-[22px] font-[850] tracking-tight text-white/95 leading-[1.1] truncate"
              >
                {project.title}
              </div>
              <div className="mt-2 text-[13px] text-white/65 leading-relaxed">
                {subtitle}
              </div>
            </div>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              className={cx(
                "shrink-0 inline-flex h-10 items-center justify-center rounded-2xl px-4",
                "border border-white/14 bg-white/5 backdrop-blur",
                "text-[13px] font-[750] text-white/85 hover:bg-white/7 transition",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40"
              )}
            >
              {closeLabel}
            </button>
          </div>

          {/* body */}
          <div className="relative z-10 h-[calc(100%-76px)] overflow-y-auto px-5 pb-6 sm:px-6 sm:pb-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={cx(
                    "inline-flex items-center rounded-2xl px-3 py-1",
                    "border border-white/10 bg-white/[0.05]",
                    "text-[12px] text-white/70"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              id={descId}
              className="mt-5 text-[14px] text-white/70 leading-relaxed whitespace-pre-line"
            >
              {details}
            </div>

            {project.outcomes?.length ? (
              <div className="mt-6">
                <div className="text-[12px] tracking-[0.22em] text-white/45 uppercase">
                  {resultsLabel}
                </div>
                <ul className="mt-3 space-y-2 text-[13px] text-white/65">
                  {project.outcomes.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.testimonial ? (
              <div
                className={cx(
                  "mt-6 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-xl p-4",
                  "shadow-[0_14px_60px_rgba(0,0,0,0.35)]"
                )}
              >
                <div className="text-[13px] text-white/70 leading-relaxed">
                  “{project.testimonial.text}”
                </div>
                <div className="mt-2 text-[12px] text-white/45">
                  <span className="text-white/70 font-[650]">
                    {project.testimonial.name}
                  </span>{" "}
                  — {project.testimonial.role}
                </div>
              </div>
            ) : null}

            <div
              className={cx(
                "mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-4",
                "backdrop-blur-xl"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <DomainPill
                  href={project.domain}
                  status={project.status ?? "live"}
                  isRu={isRu}
                />
              </div>

              {project.stack?.length ? (
                <div className="mt-5">
                  <div className="text-[12px] tracking-[0.22em] text-white/45 uppercase">
                    {stackLabel}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((x) => (
                      <span
                        key={x}
                        className={cx(
                          "inline-flex items-center rounded-2xl px-3 py-1",
                          "border border-white/10 bg-white/[0.05]",
                          "text-[12px] text-white/70"
                        )}
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-1 gap-3">
                {project.domain ? (
                  <a
                    href={project.domain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "border border-white/14 bg-white/5 backdrop-blur",
                      "text-[14px] font-[700] text-white/85 hover:bg-white/7 transition whitespace-nowrap"
                    )}
                  >
                    {openSiteLabel}
                  </a>
                ) : (
                  <div
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "border border-white/12 bg-white/[0.03]",
                      "text-[14px] font-[700] text-white/55"
                    )}
                  >
                    {websiteSoonLabel}
                  </div>
                )}

                <a
                  href="https://t.me/TIVONIX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                    "text-[14px] font-[800] text-black whitespace-nowrap",
                    "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                    "shadow-[0_18px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40"
                  )}
                >
                  {estimateLabel}
                </a>

                <div className="text-[12px] text-white/40 leading-relaxed">
                  {isRu ? (
                    <>
                      Напиши: <span className="text-white/60">что делаем</span>,{" "}
                      <span className="text-white/60">срок</span>,{" "}
                      <span className="text-white/60">пример</span>.
                    </>
                  ) : (
                    <>
                      Message:{" "}
                      <span className="text-white/60">what to build</span>,{" "}
                      <span className="text-white/60">timeline</span>,{" "}
                      <span className="text-white/60">reference</span>.
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-white/35">
              {isRu
                ? "Esc — закрыть • клик по фону — закрыть"
                : "Esc — close • click backdrop — close"}
            </div>

            <div className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  p,
  idx,
  isRu,
  onMore,
}: {
  p: Project;
  idx: number;
  isRu: boolean;
  onMore: (p: Project) => void;
}) {
  const labelProject = isRu ? "ПРОЕКТ" : "PROJECT";
  const moreLabel = isRu ? "Подробнее" : "Details";
  const subtitle = isRu ? p.subtitleRu : p.subtitleEn;
  const wip = p.status === "wip";

  return (
    <div
      data-parallax
      data-parallax-amp={String(14 + idx * 4)}
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "border border-white/10 bg-white/[0.06] backdrop-blur-2xl",
        "shadow-[0_30px_120px_rgba(0,0,0,0.55)]",
        "will-change-transform"
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={p.cover ?? HERO_IMG}
          alt=""
          className={cx(
            "absolute inset-0 h-full w-full object-cover",
            "opacity-[0.28] blur-[10px] scale-[1.08]"
          )}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={s({
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.80), rgba(0,0,0,0.92))," +
              "radial-gradient(900px 520px at 18% 8%, rgba(255,154,61,0.20) 0%, rgba(0,0,0,0) 40%)," +
              "radial-gradient(820px 520px at 88% 22%, rgba(255,106,26,0.16) 0%, rgba(0,0,0,0) 60%)",
          })}
        />
        <div className="absolute inset-0 ring-1 ring-white/10" />
      </div>

      <div className="relative z-10 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="text-[12px] tracking-[0.22em] text-white/45">
            {labelProject}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="text-[22px] sm:text-[26px] font-[760] tracking-tight text-white/95 leading-[1.1]">
              {p.title}
            </div>

            {wip ? (
              <span
                className={cx(
                  "inline-flex items-center rounded-2xl px-3 py-1",
                  "border border-white/12 bg-white/[0.05]",
                  "text-[11px] font-[700] tracking-[0.14em] text-white/55"
                )}
              >
                WIP
              </span>
            ) : null}
          </div>

          <div className="mt-2 text-[14px] sm:text-[15px] text-white/65 leading-relaxed max-w-[56ch]">
            {subtitle}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className={cx(
                  "inline-flex items-center rounded-2xl px-3 py-1",
                  "border border-white/10 bg-white/[0.05]",
                  "text-[12px] text-white/70"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <DomainPill
              href={p.domain}
              status={p.status ?? "live"}
              isRu={isRu}
            />
          </div>

          <button
            type="button"
            onClick={() => onMore(p)}
            className={cx(
              "inline-flex h-11 items-center justify-center rounded-2xl px-6",
              "border border-white/14 bg-white/5 backdrop-blur",
              "text-[14px] font-[750] text-white/85 hover:bg-white/7 transition whitespace-nowrap",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40"
            )}
            aria-label={
              isRu
                ? `Подробнее о проекте ${p.title}`
                : `More details about ${p.title}`
            }
          >
            {moreLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function MoreCard({ isRu }: { isRu: boolean }) {
  const soonLabel = isRu ? "ДАЛЬШЕ" : "NEXT";
  const title = isRu ? "Дальше — больше" : "More coming soon";
  const body = isRu
    ? "Добавим новые кейсы и продукты. Сейчас показываем живые домены + то, что в активной разработке."
    : "We’ll add more case studies and products. For now we show live domains + what’s in active development.";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "border border-white/10 bg-white/[0.06] backdrop-blur-2xl",
        "shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
      )}
    >
      <div
        className="pointer-events-none absolute -inset-10 opacity-70"
        style={s({
          background:
            "radial-gradient(520px 260px at 20% 25%, rgba(255,154,61,0.22), transparent 62%)," +
            "radial-gradient(520px 260px at 85% 15%, rgba(255,106,26,0.16), transparent 62%)",
        })}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 p-7 sm:p-8">
        <div className="text-[12px] tracking-[0.22em] text-white/45">
          {soonLabel}
        </div>
        <div className="mt-2 text-[22px] sm:text-[28px] font-[800] tracking-tight text-white/95 leading-[1.1]">
          {title}
        </div>
        <div className="mt-2 text-[14px] sm:text-[15px] text-white/65 leading-relaxed max-w-[70ch]">
          {body}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  useParallaxCards();
  const { lang } = useLang();
  const isRu = lang === "ru";

  const projects = useMemo<Project[]>(
    () => [
      // 1) LABEL0S — 3 days (first PDF)
      {
        id: "labelos",
        title: "LabelOS",
        subtitleRu:
          "SaaS для музыкальных лейблов: отчёты, рассылка, шаблоны и контроль выплат.",
        subtitleEn:
          "SaaS for music labels: reporting, email delivery, templates and payout control.",
        detailsRu:
          "Срок: 3 дня\n\n" +
          "Цель\n" +
          "• Быстро собрать внятный промо-лендинг продукта и зафиксировать ценностное предложение.\n\n" +
          "Что сделали\n" +
          "• Сформировали структуру и блоки: Hero → проблемы → решение → возможности → сценарии → CTA\n" +
          "• Привели типографику к премиум-стилю: иерархия, ритм, воздух, читабельность\n" +
          "• Собрали адаптивную вёрстку (mobile-first) и аккуратные интерактивные состояния\n" +
          "• Оптимизировали загрузку: lazy-графика, корректные размеры, аккуратные фоны\n\n" +
          "Особенности\n" +
          "• Чёткий фокус на конверсию: короткие формулировки, сильный CTA, логичная структура\n" +
          "• Минимум “воды” — только то, что отвечает на вопросы клиента\n",
        detailsEn:
          "Timeline: 3 days\n\n" +
          "Goal\n" +
          "• Build a clear promo landing and solidify the value proposition fast.\n\n" +
          "What we did\n" +
          "• Designed the page structure: Hero → pain points → solution → features → flows → CTA\n" +
          "• Refined premium typography: hierarchy, rhythm, spacing, readability\n" +
          "• Built responsive layout (mobile-first) with clean interactive states\n" +
          "• Improved loading: lazy assets, correct sizing, polished background layers\n\n" +
          "Highlights\n" +
          "• Conversion-first copy and structure\n" +
          "• No fluff — only what answers buyer questions\n",
        domain: LABELOS_DOMAIN,
        status: "live",
        tags: ["SaaS", "Landing", "UI/UX", "React", "Tailwind"],
        cover: "/images/project-cover-labelos.jpg",
        outcomes: [
          isRu ? "Готовый промо-лендинг за 3 дня" : "Promo landing delivered in 3 days",
          isRu ? "Чёткая структура под конверсию" : "Conversion-focused structure",
          isRu ? "Адаптив + оптимизация загрузки" : "Responsive + optimized loading",
        ],
        stack: ["React", "Tailwind", "Vite"],
      },

      // 2) UPC — promo landing
      {
        id: "upc",
        title: "UPC Promo",
        subtitleRu:
          "Промо-лендинг: премиум-визуал, анимации, адаптив и скорость.",
        subtitleEn:
          "Promo landing: premium visuals, animations, responsive layout and speed.",
        detailsRu:
          "Формат: промо-лендинг\n\n" +
          "Цель\n" +
          "• Сделать презентацию продукта в премиум-подаче и обеспечить быстрые загрузки.\n\n" +
          "Что сделали\n" +
          "• Проработали сетку, типографику и визуальную иерархию секций\n" +
          "• Добавили анимации и эффекты так, чтобы не перегружать интерфейс\n" +
          "• Настроили адаптив (mobile/tablet/desktop) и микровзаимодействия\n" +
          "• Оптимизировали графику и фоновые слои для скорости\n\n" +
          "Результат\n" +
          "• Страница выглядит дорого, читается легко и работает быстро\n",
        detailsEn:
          "Format: promo landing\n\n" +
          "Goal\n" +
          "• Present the product with a premium look while keeping loading fast.\n\n" +
          "What we did\n" +
          "• Built a precise grid, typography and section hierarchy\n" +
          "• Added subtle animations without UI overload\n" +
          "• Implemented responsive layout (mobile/tablet/desktop)\n" +
          "• Optimized visuals and background layers for performance\n\n" +
          "Result\n" +
          "• Premium look, high readability, fast loading\n",
        domain: UPC_DOMAIN,
        status: "live",
        tags: ["Landing", "Vite", "React", "Tailwind", "Performance"],
        cover: "/images/project-cover-upc.jpg",
        outcomes: [
          isRu ? "Премиум-подача без перегруза" : "Premium visuals without clutter",
          isRu ? "Анимации + стабильная скорость" : "Animations + stable performance",
          isRu ? "Адаптив на все экраны" : "Responsive across devices",
        ],
        stack: ["React", "Tailwind", "Vite"],
      },

      // 3) PAYCLIP — 2 weeks (second PDF)
      {
        id: "payclip",
        title: "PayClip",
        subtitleRu:
          "Платёжный продукт: лендинг под конверсию + онбординг.",
        subtitleEn: "Payment product: conversion landing + onboarding.",
        detailsRu:
          "Срок: 2 недели\n\n" +
          "Цель\n" +
          "• Сделать продуктовую посадочную + онбординг, чтобы быстрее доводить пользователя до действия.\n\n" +
          "Что сделали за 2 недели\n" +
          "• Спроектировали структуру под лиды: оффер → доверие → сценарии → CTA\n" +
          "• Собрали чистый UI: сетка, отступы, контраст, типографика\n" +
          "• Протянули ключевые пользовательские сценарии (онбординг/первые шаги)\n" +
          "• Добавили состояния/валидации/микровзаимодействия\n" +
          "• Сделали адаптив и проверили кроссбраузерность\n\n" +
          "Результат\n" +
          "• Понятная посадочная + онбординг, меньше вопросов у пользователей, выше конверсия в контакт\n",
        detailsEn:
          "Timeline: 2 weeks\n\n" +
          "Goal\n" +
          "• Build a product landing + onboarding to move users to action faster.\n\n" +
          "What we delivered in 2 weeks\n" +
          "• Lead-oriented structure: offer → trust → flows → CTA\n" +
          "• Clean UI: grid, spacing, contrast, typography\n" +
          "• Core user flows (onboarding / first steps)\n" +
          "• States, validation, micro-interactions\n" +
          "• Responsive layout + cross-browser checks\n\n" +
          "Result\n" +
          "• Clear landing + onboarding, fewer user questions, better conversion to contact\n",
        domain: PAYCLIP_DOMAIN,
        status: "live",
        tags: ["Fintech", "Landing", "UI/UX", "React", "Tailwind"],
        cover: "/images/project-cover-payclip.jpg",
        outcomes: [
          isRu ? "Сделано за 2 недели" : "Delivered in 2 weeks",
          isRu ? "Структура под конверсию" : "Conversion-driven structure",
          isRu ? "Онбординг и сценарии" : "Onboarding and user flows",
        ],
        stack: ["React", "Tailwind"],
        testimonial: {
          name: isRu ? "Клиент" : "Client",
          role: "Fintech",
          text: isRu
            ? "Сделали быстро и аккуратно. Коммуникация — по делу, результат отличный."
            : "Fast and clean delivery. Great communication and a solid result.",
        },
      },

      // WIP
      {
        id: "smart-house-ops",
        title: "Smart House Ops",
        subtitleRu:
          "Платформа эксплуатации: заявки, маршруты, команды, аналитика.",
        subtitleEn:
          "Facility ops platform: tickets, routes, crews, analytics.",
        detailsRu:
          "В работе (WIP):\n" +
          "• Дашборды, роли, процессы\n" +
          "• Аналитика и контроль операций\n" +
          "• Интеграции и модель рисков\n",
        detailsEn:
          "Work in progress (WIP):\n" +
          "• Dashboards, roles, workflows\n" +
          "• Ops analytics and control\n" +
          "• Integrations and risk model\n",
        status: "wip",
        tags: ["Dashboard", "Ops", "React", "Backend"],
        cover: "/images/project-cover-sho.jpg",
        outcomes: [
          isRu ? "Дашборды и процессы" : "Dashboards and workflows",
          isRu ? "Аналитика операций" : "Ops analytics",
        ],
        stack: ["React", "API", "DB"],
      },
    ],
    [isRu]
  );

  const [active, setActive] = useState<Project | null>(null);

  const gmailLabel = "Gmail";
  const tgLabel = "Telegram";

  return (
    <div
      className="relative min-h-screen"
      style={s({ "--headerH": `${HEADER_H}px` })}
    >
      <Header />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <img
          src={PROJECTS_BG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_65%] opacity-55 blur-[6px]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65),rgba(0,0,0,0.95))]" />
        <div
          className="absolute inset-0"
          style={s({
            background:
              "radial-gradient(1200px 650px at 18% 12%, rgba(255,154,61,0.20), transparent 60%)," +
              "radial-gradient(900px 520px at 85% 20%, rgba(255,106,26,0.16), transparent 62%)",
          })}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <Section className="pt-[calc(var(--headerH)+20px)] sm:pt-[calc(var(--headerH)+28px)] pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-10">
            <div className="lg:sticky lg:top-[calc(var(--headerH)+14px)] lg:self-start">
              <div className="max-w-[520px]">
                <h1 className="mt-7 text-[34px] sm:text-[48px] font-[800] tracking-[-0.03em] text-white leading-[1.05]">
                  {isRu ? "Проекты " : "Projects "}
                  <span className="bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                    TIVONIX
                  </span>
                </h1>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={GMAIL_EMAIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "border border-white/14 bg-white/5 backdrop-blur",
                      "text-[14px] font-[650] text-white/85 hover:bg-white/7 transition whitespace-nowrap"
                    )}
                  >
                    {gmailLabel}
                  </a>

                  <a
                    href="https://t.me/TIVONIX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                      "text-[14px] font-[750] text-black whitespace-nowrap",
                      "bg-[linear-gradient(180deg,#FFD7B0_0%,#FF9A3D_52%,#FF6A1A_100%)]",
                      "shadow-[0_18px_55px_rgba(255,122,0,0.18)] hover:brightness-105 transition"
                    )}
                  >
                    {tgLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {projects.map((p, idx) => (
                <ProjectCard
                  key={p.id}
                  p={p}
                  idx={idx}
                  isRu={isRu}
                  onMore={(proj) => setActive(proj)}
                />
              ))}

              <MoreCard isRu={isRu} />
              <div id="contact" className="pt-2" />
            </div>
          </div>
        </Container>
      </Section>

      <ProjectSlideOver
        open={!!active}
        project={active}
        isRu={isRu}
        onClose={() => setActive(null)}
      />
    </div>
  );
}