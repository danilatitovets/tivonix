// src/components/landing/AppsOrbitBlock.tsx
import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
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

const delay = (ms: number): CSSProperties =>
  ({ ["transitionDelay" as any]: `${ms}ms` } as CSSProperties);

const LEFT_BG = "/images/gen.webp";

/* ================== visual tokens ================== */
const frameBg =
  "conic-gradient(from 210deg at 50% 50%, rgba(255,255,255,.10), rgba(62,13,0,.95), rgba(84,80,70,.85), rgba(67,25,0,.95), rgba(255,255,255,.08))";

const stripGrad =
  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(210,210,210,.18) 20%, rgba(255,154,61,.55) 52%, rgba(255,106,26,.18) 82%, rgba(255,255,255,0) 100%)";

const appear = (on: boolean) =>
  cx(
    "will-change-[transform,opacity] transition-[opacity,transform]",
    "duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
    on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[14px]"
  );

const sectionAnim = (on: boolean) =>
  cx(
    "will-change-[transform,opacity,filter]",
    "transition-[opacity,transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
    on ? "opacity-100 translate-y-0 scale-[1] blur-0" : "opacity-0 translate-y-[18px] scale-[0.985] blur-[2px]"
  );

/* ================== subcomponents ================== */

function HeaderLine({
  text,
  stageOn,
}: {
  text: string;
  stageOn: boolean;
}) {
  return (
    <div className={cx("flex items-center gap-3", appear(stageOn))} style={delay(10)}>
      <span className="h-2 w-2 rounded-full bg-[#FF9A3D] shadow-[0_0_18px_rgba(255,154,61,.55)]" />
      <div className="text-[11px] sm:text-[12px] tracking-[0.34em] uppercase text-white/70 font-[850]">
        {text}
      </div>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

type LeftBigCardProps = {
  title: string;
  desc: string;
  primaryCta: string;
  secondaryCta: string;
  ctaNote?: string;
  chips?: string[];
  stage: number;
  sectionEntered: boolean;
  leftOk: boolean;
  setLeftOk: (v: boolean) => void;
};

function LeftBigCard({
  title,
  desc,
  primaryCta,
  secondaryCta,
  ctaNote,
  chips,
  stage,
  sectionEntered,
  leftOk,
  setLeftOk,
}: LeftBigCardProps) {
  return (
    <div className={cx("relative h-full", appear(stage >= 2))} style={delay(20)}>
      <div className="relative h-full rounded-[52px] p-[1px]" style={{ background: frameBg } as CSSVars}>
        <div className="relative h-full overflow-hidden rounded-[51px] border border-white/10 bg-[#050506]">
          {/* bg */}
          <div className="absolute inset-0">
            {leftOk ? (
              <img
                src={LEFT_BG}
                alt=""
                className={cx(
                  "h-full w-full object-cover scale-[1.03]",
                  "will-change-[transform,opacity] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  sectionEntered ? "opacity-100" : "opacity-0 scale-[1.06]"
                )}
                loading="lazy"
                onError={() => setLeftOk(false)}
              />
            ) : (
              <div
                className={cx(
                  "h-full w-full",
                  "will-change-[opacity,transform] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  sectionEntered ? "opacity-100" : "opacity-0 scale-[1.02]"
                )}
                style={{
                  background:
                    "radial-gradient(1200px 760px at 70% 78%, rgba(255,154,61,.24), rgba(255,106,26,.14), rgba(0,0,0,0) 58%), radial-gradient(900px 700px at 40% 30%, rgba(255,255,255,.06), rgba(0,0,0,0) 65%), linear-gradient(180deg, #050506, #050506)",
                }}
              />
            )}

            <div
              className={cx(
                "absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/92",
                "will-change-[opacity] transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                sectionEntered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* arc */}
            <svg
              className={cx(
                "pointer-events-none absolute left-0 top-[40%] h-[60%] w-full opacity-80",
                "will-change-[opacity,transform] transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                sectionEntered ? "opacity-80 translate-y-0" : "opacity-0 translate-y-[10px]"
              )}
              viewBox="0 0 1200 420"
              preserveAspectRatio="none"
            >
              <path
                d="M -60 240 C 220 365, 540 395, 860 330 C 1060 290, 1160 240, 1280 155"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* content */}
          <div className="relative z-10 flex h-full flex-col px-8 py-9 sm:px-10 sm:py-11 lg:px-11 lg:py-12">
            <div className="max-w-[46ch]">
              <h2
                className={cx(
                  "text-[clamp(30px,3.6vw,54px)]",
                  "font-semibold leading-[1.06] tracking-[-0.04em] text-white",
                  appear(stage >= 2)
                )}
                style={delay(70)}
              >
                {title}
              </h2>

              <p
                className={cx(
                  "mt-5 text-[15px] sm:text-[15.5px] leading-[1.7] text-white/72",
                  appear(stage >= 3)
                )}
                style={delay(115)}
              >
                {desc}
              </p>

              {!!chips?.length && (
                <div className={cx("mt-6 flex flex-wrap gap-2", appear(stage >= 3))} style={delay(140)}>
                  {chips.slice(0, 6).map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="inline-flex items-center rounded-full px-3 py-[7px] border border-white/12 bg-white/[0.04] text-[12px] leading-none text-white/72"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className={cx("mt-auto pt-10", appear(stage >= 4))} style={delay(170)}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/contacts"
                  className={cx(
                    "inline-flex items-center justify-center",
                    "h-12 px-8 rounded-full",
                    "bg-white text-black font-semibold text-[14px]",
                    "shadow-[0_18px_60px_rgba(0,0,0,.55)]",
                    "hover:brightness-105 active:translate-y-[1px] transition"
                  )}
                >
                  {primaryCta}
                </Link>

                <Link
                  to="/projects"
                  className={cx(
                    "inline-flex items-center justify-center",
                    "h-12 px-6 rounded-full",
                    "border border-white/14 bg-white/[0.03]",
                    "text-white/80 font-semibold text-[13.5px]",
                    "hover:bg-white/[0.05] hover:text-white transition"
                  )}
                >
                  <span className="truncate">{secondaryCta}</span>
                </Link>
              </div>

              {ctaNote && (
                <div className="mt-3 text-[12px] leading-relaxed text-white/55">{ctaNote}</div>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
        </div>
      </div>
    </div>
  );
}

/* === Мини-карточка справа: ТОЛЬКО ЦИФРЫ ОРАНЖЕВЫЕ === */
function MiniCard({
  title,
  desc,
  idx,
  stageOn,
}: {
  title: string;
  desc: string;
  idx: number;
  stageOn: boolean;
}) {
  const number = String(idx + 1).padStart(2, "0");

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]",
        "px-5 py-[18px]",
        "will-change-[opacity,transform] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        appear(stageOn)
      )}
      style={delay(140 + idx * 80)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.14)_1px,transparent_0)] [background-size:22px_22px]" />

      <div className="relative flex items-start gap-4">
        {/* кружок как раньше — тёмный, только цифры оранжевые */}
        <div className="mt-[2px] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/22 bg-black/70">
          <span className="text-[11px] font-semibold tracking-[0.12em] text-[rgba(255,154,61,0.9)]">
            {number}
          </span>
        </div>

        <div className="min-w-0">
          <div className="text-[12px] sm:text-[12.5px] font-semibold text-white uppercase tracking-[0.14em] leading-snug">
            {title}
          </div>
          <p className="mt-2 text-[13.5px] leading-[1.6] text-white/70">{desc}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-70" style={{ background: stripGrad }} />
    </div>
  );
}

function RightPanel(props: {
  badge: string;
  text: string;
  items: { id: string; title: string; desc: string }[];
  stage: number;
}) {
  const { badge, text, items, stage } = props;

  return (
    <div className={cx("relative h-full", appear(stage >= 2))} style={delay(40)}>
      <div className="relative h-full rounded-[52px] p-[1px]" style={{ background: frameBg } as CSSVars}>
        <div className="relative h-full overflow-hidden rounded-[51px] border border-white/10 bg-[#050506]">
          {/* header */}
          <div className="relative px-7 pt-7 sm:px-8 sm:pt-8">
            <div className="text-[12px] sm:text-[12.5px] tracking-[0.28em] uppercase text-white/60 font-[850]">
              {badge}
            </div>
            <div className="mt-5 h-px w-full bg-white/10" />
          </div>

          {/* body */}
          <div className="relative flex h-full flex-col px-7 pb-7 pt-5 sm:px-8 sm:pb-8">
            <div className="max-w-[60ch] text-[15px] sm:text-[15.5px] leading-[1.7] text-white/70">
              {text}
            </div>

            <div className="mt-6 grid gap-3">
              {items.map((it, idx) => (
                <MiniCard key={it.id} title={it.title} desc={it.desc} idx={idx} stageOn={stage >= 3} />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
        </div>
      </div>
    </div>
  );
}

/* ================== main ================== */

export default function AppsOrbitBlock() {
  const { dict, lang } = useLang();
  const isRu = lang === "ru";
  const o: any = dict.orbit || {};

  const reducedMotion = usePrefersReducedMotion();
  const sentinelRef = useRef<HTMLSpanElement | null>(null);

  const [sectionEntered, setSectionEntered] = useState(false);
  const [entered, setEntered] = useState(false);

  const [stage, _setStage] = useState(0);
  const stageRef = useRef(0);
  const setStage = (n: number) => {
    if (stageRef.current === n) return;
    stageRef.current = n;
    _setStage(n);
  };

  const [leftOk, setLeftOk] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setSectionEntered(true);
      setEntered(true);
      setStage(4);
      return;
    }
    const el = sentinelRef.current;
    if (!el || typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = !!entries[0]?.isIntersecting;
        if (hit) {
          setSectionEntered(true);
          setEntered(true);
        }
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
    const push = (ms: number, s: number) => timers.push(window.setTimeout(() => setStage(s), ms));

    push(80, 1);  // header line
    push(240, 2); // blocks
    push(420, 3); // text/cards
    push(620, 4); // CTA

    return () => timers.forEach((t) => clearTimeout(t));
  }, [entered, reducedMotion]);

  /* ====== content ====== */
  const badgeText = o.badge || (isRu ? "АДМИН-ПАНЕЛЬ • SAAS" : "ADMIN PANEL • SAAS");

  const title =
    o.title ||
    (o.titlePrefix || o.titleHighlight
      ? `${o.titlePrefix || ""} ${o.titleHighlight || ""}`.trim()
      : isRu
      ? "Админ-панели для\nвашего продукта"
      : "Admin panels for\nyour product");

  const desc =
    o.description ||
    (isRu
      ? "Роли и доступы, таблицы с фильтрами, статусы и модерация, дашборды и интеграции — без визуального шума и с запасом на масштабирование."
      : "Roles & access, filterable tables, statuses/moderation, dashboards and integrations — without visual noise and built to scale.");

  const primaryCta = o.primaryCta || (isRu ? "Обсудить проект" : "Discuss the project");
  const secondaryCta = isRu ? "Посмотреть примеры" : "See examples";

  const chips: string[] =
    o.chips ||
    (isRu
      ? ["RBAC", "Audit log", "Поиск + фильтры", "Экспорт CSV", "Массовые действия"]
      : ["RBAC", "Audit log", "Search & filters", "CSV export", "Bulk actions",]);

  const ctaNote =
    o.ctaNote || (isRu ? "Ответим сегодня • 15–20 минут на созвон" : "Reply today • 15–20 min intro call");

  const cardsSrc = o.cards || {};
  const items: { id: string; title: string; desc: string }[] = [
    {
      id: "roles",
      title: cardsSrc.roles?.title || (isRu ? "РОЛИ И ДОСТУПЫ" : "ROLES & ACCESS"),
      desc:
        cardsSrc.roles?.sub ||
        (isRu
          ? "Пользователи, роли, группы и аудит: журнал действий и быстрые переключатели доступа."
          : "Users, roles, groups and audit: activity log and quick access toggles."),
    },
    {
      id: "tables",
      title: cardsSrc.tables?.title || (isRu ? "ТАБЛИЦЫ И УПРАВЛЕНИЕ" : "TABLES & MANAGEMENT"),
      desc:
        cardsSrc.tables?.sub ||
        (isRu
          ? "Поиск, фильтры, сортировки и экспорт — массовые операции и сохранённые представления."
          : "Search, filters, sorting and export — bulk actions and saved table views."),
    },
    {
      id: "analytics",
      title: cardsSrc.analytics?.title || (isRu ? "АНАЛИТИКА И ПРОЦЕССЫ" : "ANALYTICS & FLOWS"),
      desc:
        cardsSrc.analytics?.sub ||
        (isRu
          ? "Дашборды и статусы — KPI, очереди, SLA и прозрачные отчёты по этапам."
          : "Dashboards and statuses — KPIs, queues, SLAs and step-by-step reporting."),
    },
    {
      id: "integrations",
      title:
        cardsSrc.integrations?.title || (isRu ? "ИНТЕГРАЦИИ И АВТОМАТИЗАЦИЯ" : "INTEGRATIONS & AUTOMATION"),
      desc:
        cardsSrc.integrations?.sub ||
        (isRu
          ? "CRM, webhooks, антифрод и уведомления — события, триггеры и сценарии без боли."
          : "CRMs, webhooks, antifraud and notifications — events, triggers and flows without pain."),
    },
  ];

  const rightBadge = o.rightBadge || (isRu ? "ЧТО ВНУТРИ ПАНЕЛИ" : "WHAT'S INSIDE");
  const rightText =
    o.rightText ||
    (isRu
      ? "Состав админ-панели: от ролей и таблиц до аналитики и интеграций — всё в одном месте, аккуратно и без лишнего визуального шума."
      : "What’s inside: from roles and tables to analytics and integrations — everything in one place, clean and without visual noise.");

  return (
    <Section className={cx("relative overflow-x-clip", "pt-14 sm:pt-16 pb-16 sm:pb-20")}>
      {/* sentinel */}
      <span ref={sentinelRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* bg */}
      <div
        className={cx(
          "pointer-events-none absolute inset-0 -z-10 bg-black",
          "will-change-[opacity] transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          sectionEntered ? "opacity-100" : "opacity-0"
        )}
      />

      <Container>
        <div className="relative mx-auto max-w-[1320px]">
          <div className={cx("relative", sectionAnim(sectionEntered))}>
            {/* top glow */}
            <div
              className={cx(
                "pointer-events-none absolute -inset-x-8 -top-10 h-40 -z-10 blur-2xl",
                "transition-[opacity,transform] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                sectionEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"
              )}
              style={{
                background:
                  "radial-gradient(520px 180px at 45% 50%, rgba(255,154,61,.18), rgba(255,106,26,.10), rgba(0,0,0,0) 70%)",
              }}
            />

            <HeaderLine text={badgeText} stageOn={stage >= 1} />

            <div
              className={cx(
                "relative mt-6 grid gap-6",
                "lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]",
                "lg:items-stretch"
              )}
            >
              <LeftBigCard
                title={title}
                desc={desc}
                primaryCta={primaryCta}
                secondaryCta={secondaryCta}
                ctaNote={ctaNote}
                chips={chips}
                stage={stage}
                sectionEntered={sectionEntered}
                leftOk={leftOk}
                setLeftOk={setLeftOk}
              />

              <RightPanel badge={rightBadge} text={rightText} items={items} stage={stage} />
            </div>

            {/* divider */}
            <div
              className={cx(
                "pointer-events-none mt-10 h-px w-full",
                "bg-gradient-to-r from-transparent via-[rgba(255,154,61,.38)] to-transparent",
                "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                sectionEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]"
              )}
              style={delay(120)}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
