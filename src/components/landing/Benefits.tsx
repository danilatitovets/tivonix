// src/components/landing/Benefits.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
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
        "border border-white/18 bg-[rgba(18,14,11,0.96)]",
        "text-[12px] sm:text-[13px] font-[730] tracking-[0.16em] uppercase text-white/78",
        "shadow-[0_18px_60px_rgba(0,0,0,0.70)]",
        "transition-colors transition-shadow duration-200",
        "hover:border-white/55 hover:text-white hover:shadow-[0_22px_80px_rgba(0,0,0,0.9)]"
      )}
    >
      {text}
    </div>
  );
}

export default function Benefits() {
  const { dict, lang } = useLang();
  const isRu = lang === "ru";
  const bDict = dict.benefits;

  const badgeText =
    bDict?.badge ?? (isRu ? "Этапы" : "Benefits");

  const titlePrefix =
    bDict?.titlePrefix ?? (isRu ? "Один блок — одна мысль." : "One block — one idea.");

  const titleHighlight =
    bDict?.titleHighlight ?? (isRu ? "ПРЕИМУЩЕСТВА" : "BENEFITS");

  const rowMeta =
    bDict?.rowMeta ??
    (isRu ? "UI • код • скорость • масштабирование" : "UI • code • speed • scaling");

  const ctaText =
    bDict?.cta ?? (isRu ? "Заказать" : "Order project");

  const pills = useMemo<string[]>(() => {
    const fromDict = (bDict?.pills ?? []) as string[];
    if (fromDict.length) return fromDict;

    return isRu
      ? [
          "SaaS-сервисы и личные кабинеты",
          "Дашборды и аналитика",
          "Сайты и лендинги под ключ",
          "Telegram- и чат-боты",
          "Интеграции с CRM и API",
          "Автоматизация рутины",
          "Поддержка и развитие проекта",
        ]
      : [
          "SaaS apps & client areas",
          "Dashboards and analytics",
          "Websites & landing pages",
          "Telegram & chat bots",
          "CRM and API integrations",
          "Routine automation",
          "Support & product growth",
        ];
  }, [bDict, isRu]);

  return (
    <Section
      id="benefits"
      className="relative overflow-hidden pt-16 sm:pt-20 pb-16 sm:pb-20"
    >
      {/* общий фон секции */}
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
              {badgeText}
            </div>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* большой блок */}
          <div
            className={cx(
              "mt-6 relative overflow-hidden rounded-[26px]",
              "border border-white/10",
              "shadow-[0_40px_160px_rgba(0,0,0,0.8)]",
              "min-h-[380px] sm:min-h-[440px] lg:min-h-[520px]"
            )}
          >
            {/* фон-фотка с лёгким блюром */}
            <img
              src={BG_IMG}
              alt=""
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover blur-[1px]"
              style={{
                objectPosition: "center 65%", // фокус как просил
              }}
            />

            {/* улучшенный оверлей: тёплый градиент снизу + мягкое затемнение */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 140% at 50% 115%, rgba(255,154,61,0.40), transparent 60%)," +
                  "linear-gradient(135deg, rgba(0,0,0,0.68), rgba(0,0,0,0.94))",
              }}
            />

            {/* контент */}
            <div className="relative z-10 p-7 sm:p-10 lg:p-12 h-full flex flex-col">
              {/* верх: по центру */}
              <div className="max-w-[720px] mx-auto text-center text-white">
                <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-[860] tracking-[-0.04em] leading-[1.04]">
                  {titlePrefix}
                  <br />
                  <span className="text-white/95">{titleHighlight}</span>
                </h2>

                <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/80">
                  {rowMeta}
                </p>

                {/* стеклянная кнопка «Заказать» → /contacts */}
                <div className="mt-8">
                  <Link
                    to="/contacts"
                    className={cx(
                      "inline-flex items-center justify-center",
                      "h-11 px-7 rounded-full",
                      "border border-white/35 bg-white/8",
                      "backdrop-blur-xl",
                      "text-[13px] font-[820] tracking-[0.12em] uppercase text-white",
                      "shadow-[0_18px_70px_rgba(0,0,0,0.70)]",
                      "transition duration-200",
                      "hover:bg-white/14 hover:border-white/70 hover:shadow-[0_22px_90px_rgba(0,0,0,0.9)]"
                    )}
                  >
                    {ctaText}
                  </Link>
                </div>
              </div>

              {/* низ: таблетки по горизонтали */}
              <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-3 lg:gap-4 max-w-[960px] mx-auto">
                {pills.map((t) => (
                  <Pill key={t} text={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
