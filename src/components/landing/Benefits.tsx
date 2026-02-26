// src/components/landing/Benefits.tsx
import React, { type CSSProperties, useMemo } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { Button } from "../ui/Button";
import { useLang, type Lang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** public/images/logopad.webp */
const LOGO_IMG = "/images/logopad.webp";

const CONTACT_EMAIL = "tivoonix@gmail.com";
const TG_URL = "https://t.me/TIVONIX";

// На странице один h1 — в Hero. Здесь используем h2.
const USE_H1 = false;

function buildMailBody(lang: Lang) {
  if (lang === "ru") {
    return (
      "Здравствуйте!\n\n" +
      "Хочу получить оценку разработки SaaS/MVP.\n\n" +
      "1) Что делаем (1–2 предложения):\n- \n\n" +
      "2) Ключевые функции:\n- \n- \n- \n\n" +
      "3) Стадия (идея/прототип/дизайн/в разработке):\n- \n\n" +
      "4) Сроки / бюджет (если есть):\n- \n\n" +
      "Контакты:\n- \n\n" +
      "Спасибо!"
    );
  }
  return (
    "Hi!\n\n" +
    "I'd like to get an estimate for a SaaS/MVP project.\n\n" +
    "1) What we're building (1–2 sentences):\n- \n\n" +
    "2) Key features:\n- \n- \n- \n\n" +
    "3) Stage (idea/prototype/design/in progress):\n- \n\n" +
    "4) Timeline / budget (if any):\n- \n\n" +
    "Contacts:\n- \n\n" +
    "Thank you!"
  );
}

function getSubject(lang: Lang) {
  return lang === "ru"
    ? "Запрос оценки с сайта TIVONIX (SaaS/MVP)"
    : "TIVONIX inquiry: SaaS/MVP estimate";
}

function openMail(to: string, subject: string, body: string) {
  const mailto =
    `mailto:${to}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

function LogoCircle({ src }: { src: string }) {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <div
        className={cx(
          "rounded-full overflow-hidden",
          "h-[122px] w-[122px] sm:h-[168px] sm:w-[168px] lg:h-[198px] lg:w-[198px]",
          "shadow-[0_26px_90px_rgba(0,0,0,0.62)]"
        )}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="group flex gap-3">
      <span
        className="mt-[9px] h-[7px] w-[7px] rounded-full shrink-0"
        style={{ background: "#F97316" } as CSSProperties}
        aria-hidden="true"
      />
      <span className="text-white/78 group-hover:text-white/88 transition-colors">
        {children}
      </span>
    </li>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cx(
        "inline-flex items-center",
        "rounded-full border border-white/10 bg-white/[0.04]",
        "px-3 py-1.5",
        "text-[12px] leading-none text-white/72"
      )}
    >
      {children}
    </span>
  );
}

export default function Benefits() {
  const { dict, lang } = useLang();
  const isRu = lang === "ru";
  const bd = dict?.benefits;

  const heroLine1 =
    (bd as { heroLine1?: string } | undefined)?.heroLine1 ?? (isRu ? "ЗАПУСК SaaS / MVP" : "SHIP YOUR SaaS MVP");
  const heroLine2 =
    (bd as { heroLine2?: string } | undefined)?.heroLine2 ?? (isRu ? "СТРУКТУРНО И БЫСТРО" : "FAST AND STRUCTURED");
  const heroLine3 =
    (bd as { heroLine3?: string } | undefined)?.heroLine3 ??
    (isRu ? "ДИЗАЙН + РАЗРАБОТКА ПОД КЛЮЧ" : "DESIGN + DEVELOPMENT END-TO-END");

  const problemTitle =
    (bd as { problemTitle?: string } | undefined)?.problemTitle ?? (isRu ? "ПОЧЕМУ ПРОЕКТЫ БУКСУЮТ" : "WHY PROJECTS STALL");
  const solutionTitle =
    (bd as { solutionTitle?: string } | undefined)?.solutionTitle ?? (isRu ? "КАК МЫ РЕШАЕМ" : "HOW WE FIX IT");

  const problemBullets: string[] =
    (bd as { problemBullets?: string[] } | undefined)?.problemBullets ??
    (isRu
      ? [
          "Дизайн и разработка идут раздельно — начинаются бесконечные правки",
          "Нет UX-сценариев и структуры — макеты “красивые”, но не работают",
          "UI без дизайн-системы — интерфейс расползается и ломается в коде",
          "Бюджет уходит на переделки вместо релиза",
        ]
      : [
          "Design and development are split — revisions pile up",
          "No UX scenarios — nice screens, weak product logic",
          "No design system — UI becomes inconsistent and breaks in code",
          "Budget burns on rework instead of shipping",
        ]);

  const solutionBullets: string[] =
    (bd as { solutionBullets?: string[] } | undefined)?.solutionBullets ??
    (isRu
      ? [
          "Сначала сценарии и структура → затем дизайн-система → потом код",
          "Один процесс и одно видение: UI, фронт и интеграции согласованы",
          "Подключаем формы, аналитику, CRM/платежи (если нужно)",
          "На выходе — релизный продукт, а не “макеты для портфолио”",
        ]
      : [
          "Scenarios & structure → design system → implementation",
          "Single flow: UI, frontend, and integrations stay aligned",
          "We wire forms, analytics, CRM/payments (if needed)",
          "Result: launch-ready product, not portfolio mockups",
        ]);

  // Никаких “гарантий из воздуха”: только понятный следующий шаг.
  const supportLine =
    (bd as { supportLine?: string } | undefined)?.supportLine ??
    (isRu
      ? "Отвечаю в течение 24 часов. Можно начать с короткого аудита или прототипа — чтобы быстро прояснить объём."
      : "I reply within 24 hours. You can start with a quick audit or prototype to clarify scope fast.");

  const eyebrow = isRu ? "дизайн • разработка • запуск" : "design • build • launch";

  // Доверие без цифр: конкретный формат и результат
  const trustChips = useMemo(
    () =>
      (isRu
        ? ["Единый процесс", "UI-система", "Интеграции при необходимости", "Фокус на релиз"]
        : ["Single flow", "Design system", "Integrations if needed", "Ship-first"]) as string[],
    [isRu]
  );

  const deliverables = useMemo(
    () =>
      (isRu
        ? [
            "Оценка по этапам и рискам",
            "Короткий план работ (что/зачем/в каком порядке)",
            "Следующие шаги (созвон или бриф — на выбор)",
          ]
        : [
            "Stage-by-stage estimate + risks",
            "Short execution plan (what/why/order)",
            "Next steps (call or brief — your choice)",
          ]) as string[],
    [isRu]
  );

  const onPrimaryCta = () => {
    const subject = getSubject(lang as Lang);
    const body = buildMailBody(lang as Lang);
    openMail(CONTACT_EMAIL, subject, body);
  };

  const PrimaryTitle = USE_H1 ? ("h1" as const) : ("h2" as const);

  return (
    <Section
      id="benefits"
      className={cx(
        "relative overflow-hidden bg-black",
        "py-16 sm:py-20 lg:py-24"
      )}
    >
      <Container>
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-white/45">
            {eyebrow}
          </div>

          <PrimaryTitle className="mt-4 uppercase leading-[0.96] tracking-[-0.02em] text-[34px] sm:text-[52px] lg:text-[66px]">
            <span className="block font-[820] text-white/95">{heroLine1}</span>
            <span className="block font-[820] text-white/82">{heroLine2}</span>
            <span className="block font-[820] text-white/58">{heroLine3}</span>
          </PrimaryTitle>

          <p className="mx-auto mt-5 max-w-[58ch] text-[15px] sm:text-[16.5px] leading-[1.75] text-white/72">
            {isRu
              ? "Один процесс вместо “дизайн отдельно — код отдельно”. Структура, UI-система и реализация идут согласованно, чтобы быстрее дойти до релиза."
              : "One flow instead of “design here, code there”. Structure, design system, and implementation stay aligned — so you ship faster."}
          </p>

          {/* micro trust chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {trustChips.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="mt-8 sm:mt-10">
          <LogoCircle src={LOGO_IMG} />
        </div>

        {/* Cards */}
        <div className="mt-12 sm:mt-14 grid gap-8 lg:grid-cols-2">
          <div className="benefitsTextPlate rounded-3xl p-6 sm:p-7 border border-white/10 bg-black/40 shadow-[0_26px_90px_rgba(0,0,0,0.58)] backdrop-blur-md">
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45">
              {problemTitle}
            </div>
            <ul className="mt-5 space-y-4 text-[14.5px] sm:text-[15px] leading-[1.75]">
              {problemBullets.map((t, i) => (
                <Bullet key={`problem-${i}`}>{t}</Bullet>
              ))}
            </ul>
          </div>

          <div className="benefitsTextPlate rounded-3xl p-6 sm:p-7 border border-white/10 bg-black/40 shadow-[0_26px_90px_rgba(0,0,0,0.58)] backdrop-blur-md">
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/45">
              {solutionTitle}
            </div>
            <ul className="mt-5 space-y-4 text-[14.5px] sm:text-[15px] leading-[1.75]">
              {solutionBullets.map((t, i) => (
                <Bullet key={`solution-${i}`}>{t}</Bullet>
              ))}
            </ul>

            <div className="mt-6 text-[13px] sm:text-[13.5px] leading-[1.65] text-white/58">
              {supportLine}
            </div>

            {/* deliverables = conversion booster */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
              <div className="text-[11px] tracking-[0.26em] uppercase text-white/45">
                {isRu ? "Что вы получите после первого контакта" : "What you get after first contact"}
              </div>
              <ul className="mt-3 space-y-2 text-[13.5px] sm:text-[14px] leading-[1.6] text-white/70">
                {deliverables.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span
                      className="mt-[7px] h-[6px] w-[6px] rounded-full shrink-0"
                      style={{ background: "rgba(255,154,61,0.95)" } as CSSProperties}
                      aria-hidden="true"
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


      </Container>
    </Section>
  );
}
