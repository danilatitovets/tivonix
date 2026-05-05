// src/components/landing/Benefits.tsx
import React, { type CSSProperties, useMemo } from "react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** public/images/logopad.webp */
const LOGO_IMG = "/images/logopad.webp";

// На странице один h1 — в Hero. Здесь используем h2.
const USE_H1 = false;

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
        "rounded-full bg-white/[0.06]",
        "px-3 py-1.5",
        "text-[11.5px] sm:text-[12px] leading-none text-white/80"
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
    (bd as { heroLine1?: string } | undefined)?.heroLine1 ??
    (isRu ? "Запустим ваш веб-сервис" : "Launch your web service");
  const heroLine2 =
    (bd as { heroLine2?: string } | undefined)?.heroLine2 ?? (isRu ? "от идеи до" : "from idea to");
  const heroLine3 =
    (bd as { heroLine3?: string } | undefined)?.heroLine3 ??
    (isRu ? "первых клиентов" : "first customers");

  const problemTitle =
    (bd as { problemTitle?: string } | undefined)?.problemTitle ??
    (isRu ? "Где чаще всего теряются время и бюджет" : "Where time and budget usually slip away");
  const solutionTitle =
    (bd as { solutionTitle?: string } | undefined)?.solutionTitle ??
    (isRu ? "КАК МЫ РАБОТАЕМ" : "HOW WE WORK");

  const problemBullets: string[] =
    (bd as { problemBullets?: string[] } | undefined)?.problemBullets ??
    (isRu
      ? [
          "Нет чёткого плана: что делаем, в каком порядке и зачем",
          "Дизайн сделан отдельно от разработки — потом всё приходится переделывать",
          "Не продуманы личный кабинет, админка, оплата и другие важные сценарии",
          "Проект долго дорабатывается, вместо того чтобы быстрее выйти на рынок",
        ]
      : [
          "No clear plan: what we build, in what order, and why",
          "Design is done apart from development — then everything has to be reworked",
          "User area, admin, payments, and other key flows aren’t thought through",
          "The project keeps getting polished instead of reaching the market faster",
        ]);

  const solutionBullets: string[] =
    (bd as { solutionBullets?: string[] } | undefined)?.solutionBullets ??
    (isRu
      ? [
          "Сначала разбираемся в задаче: что нужно пользователям и как должен работать продукт",
          "Затем составляем структуру: какие страницы, личные кабинеты, формы и функции нужны",
          "После этого делаем дизайн и сразу учитываем, как он будет реализован в разработке",
          "Подключаем нужные сервисы: заявки, оплату, аналитику и другое",
          "На выходе вы получаете не просто макеты, а готовый продукт, который можно запускать",
        ]
      : [
          "We start by clarifying the task: what users need and how the product should work",
          "Then we map the structure: pages, user areas, forms, and required features",
          "After that we design with implementation in mind from day one",
          "We connect the required services: leads, payments, analytics, and more",
          "You get more than mockups - you get a launch-ready product",
        ]);

  // Никаких “гарантий из воздуха”: только понятный следующий шаг.
  const supportLine =
    (bd as { supportLine?: string } | undefined)?.supportLine ??
    (isRu
      ? "Отвечаем в течение 24 часов. Можно начать с короткого обсуждения идеи — поможем понять объём, сроки и первые шаги."
      : "We reply within 24 hours. Start with a short idea discussion - we will help define scope, timeline, and first steps.");

  const eyebrow = isRu ? "дизайн • разработка • запуск" : "design • build • launch";

  // Доверие без цифр: конкретный формат и результат
  const trustChips = useMemo(
    () =>
      (isRu
        ? ["Один подрядчик", "Понятный процесс", "Дизайн + разработка", "Готово к запуску"]
        : ["Single team", "Clear process", "Design + development", "Launch-ready"]) as string[],
    [isRu]
  );

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

          <PrimaryTitle className="mt-4 leading-[0.96] tracking-[-0.02em] text-[34px] sm:text-[52px] lg:text-[66px]">
            <span className="block font-[820] text-white/95">{heroLine1}</span>
            <span className="block font-[820] text-white/82">{heroLine2}</span>
            <span className="block font-[820] text-white/58">{heroLine3}</span>
          </PrimaryTitle>

          <p className="mx-auto mt-5 max-w-[58ch] text-[15px] sm:text-[16.5px] leading-[1.75] text-white/72">
            {isRu
              ? "Продумываем структуру, дизайн и разработку вместе — чтобы быстрее получить готовый продукт, который удобно использовать и легко развивать."
              : "We plan structure, design, and development together — so you get a finished product faster: easy to use and easy to grow."}
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
          <div className="benefitsTextPlate rounded-3xl border-0 ring-0 p-6 sm:p-7 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-md">
            <div className="text-[18px] sm:text-[22px] leading-tight font-[780] text-white/95">
              {problemTitle}
            </div>
            <ul className="mt-5 space-y-4 text-[14.5px] sm:text-[15px] leading-[1.75]">
              {problemBullets.map((t, i) => (
                <Bullet key={`problem-${i}`}>{t}</Bullet>
              ))}
            </ul>
          </div>

          <div className="benefitsTextPlate rounded-3xl border-0 ring-0 p-6 sm:p-7 bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-md">
            <div className="text-[18px] sm:text-[22px] leading-tight font-[780] text-white/95">
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

          </div>
        </div>


      </Container>
    </Section>
  );
}
