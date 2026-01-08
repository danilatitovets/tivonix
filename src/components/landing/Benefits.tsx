// src/components/landing/Benefits.tsx
import React, { useMemo } from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** просто фотка – public/images/212.webp */
const BG_IMG = "/images/212.webp";

/* ====== pill-бейджи в стиле навигации ====== */
function Pill({ text }: { text: string }) {
  return (
    <div
      className={cx(
        "inline-flex h-[42px] items-center rounded-full px-6",
        // фон и бордер как у табов
        "border border-white/18 bg-[rgba(18,14,11,0.96)]",
        // типографика
        "text-[12px] sm:text-[13px] font-[730] tracking-[0.16em] uppercase text-white/78",
        // лёгкий объём
        "shadow-[0_18px_60px_rgba(0,0,0,0.70)]",
        // hover-состояние
        "transition-colors transition-shadow duration-200",
        "hover:border-white/55 hover:text-white hover:shadow-[0_22px_80px_rgba(0,0,0,0.9)]"
      )}
    >
      {text}
    </div>
  );
}

export default function Benefits() {
  const { dict } = useLang();
  const bDict = dict.benefits;

  const pills = useMemo(
    () => [
      "SaaS-сервисы и личные кабинеты",
      "Дашборды и аналитика",
      "Сайты и лендинги под ключ",
      "Telegram- и чат-боты",
      "Интеграции с CRM и API",
      "Автоматизация рутины",
      "Поддержка и развитие проекта",
    ],
    []
  );

  return (
    <Section
      id="benefits"
      className="relative overflow-hidden pt-16 sm:pt-20 pb-16 sm:pb-20"
    >
      {/* общий фон секции (как был) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.96))]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <Container>
        <div className="relative z-10">
          {/* бэйдж сверху */}
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF9A3D]" />
            <div className="text-[11px] tracking-[0.28em] text-white/55 uppercase">
              {bDict?.badge ?? "ЧТО Я ДЕЛАЮ"}
            </div>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* один большой блок: фотка + блюр + тёмный оверлей + контент */}
          <div
            className={cx(
              "mt-6 relative overflow-hidden rounded-[26px]",
              "border border-white/10",
              "shadow-[0_40px_160px_rgba(0,0,0,0.8)]",
              "min-h-[380px] sm:min-h-[440px] lg:min-h-[520px]"
            )}
          >
            {/* ФОН-ФОТКА */}
            <img
              src={BG_IMG}
              alt=""
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[2px]"
              style={{
                objectPosition: "center 65%",
              }}
            />

            {/* ТЁМНЫЙ ОВЕРЛЕЙ поверх фотки */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.78),rgba(0,0,0,0.94))]" />

            {/* контент поверх */}
            <div className="relative z-10 p-7 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-center">
                {/* текст слева */}
                <div className="max-w-[560px] text-white">
                  <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-[860] tracking-[-0.04em] leading-[1.04]">
                    {bDict?.titlePrefix ?? "Разрабатываю цифровые продукты"}
                    <br />
                    <span className="text-white/95">
                      {bDict?.titleHighlight ?? "под задачи вашего бизнеса"}
                    </span>
                  </h2>

                  <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/80">
                    {bDict?.rowMeta ??
                      "Запускаю и развиваю проекты: от лендингов и SaaS-панелей до ботов и интеграций. Беру на себя дизайн, фронтенд, бэкенд и поддержку."}
                  </p>

                  <div className="mt-8">
                    <a
                      href="#contacts"
                      className={cx(
                        "inline-flex items-center justify-center",
                        "h-11 px-6 rounded-full",
                        "bg-white text-black",
                        "text-[13px] font-[820]",
                        "shadow-[0_16px_70px_rgba(0,0,0,0.55)]",
                        "transition hover:opacity-95"
                      )}
                    >
                      {dict?.header?.start ?? "Обсудить проект"}
                    </a>
                  </div>
                </div>

                {/* таблетки справа */}
                <div className="lg:justify-self-end lg:max-w-[540px]">
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    {pills.map((t) => (
                      <Pill key={t} text={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
