// src/components/landing/Hero.tsx
import React, { useState } from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import { Button } from "../ui/Button";
import { useLang, type Lang } from "../../i18n/LangProvider";

const HERO_CARD_IMG = "/images/sunset.webp";

const CONTACT_EMAIL = "tivoonix@gmail.com";
const TG_URL = "https://t.me/TIVONIX";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

function openGmailCompose(to: string, subject: string, body: string) {
  const url =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    `&to=${encodeURIComponent(to)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) {
    const mailto =
      `mailto:${to}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }
}

function buildMailBody(lang: Lang, fromRaw: string) {
  const from = fromRaw.trim();

  if (lang === "ru") {
    return (
      "Здравствуйте!\n\n" +
      "Хочу демо/обсудить проект.\n" +
      (from ? `Мой email: ${from}\n` : "") +
      "\nКоротко о задаче:\n- \n- \n\nСпасибо!"
    );
  }

  return (
    "Hi!\n\n" +
    "I'd like to get a demo / discuss a SaaS project.\n" +
    (from ? `My email: ${from}\n` : "") +
    "\nQuick overview of the product:\n- \n- \n\nThank you!"
  );
}

function getSubject(lang: Lang) {
  return lang === "ru" ? "Проект (SaaS/MVP)" : "Project (SaaS/MVP)";
}

export default function Hero() {
  const [email, setEmail] = useState("");
  const { lang, dict } = useLang();
  const hero = dict.hero;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = buildMailBody(lang, email);
    const subject = getSubject(lang);
    openGmailCompose(CONTACT_EMAIL, subject, body);
  };

  return (
    <Section className="relative isolate overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">
      {/* локальные стили для фона и карточки (без анимаций) */}
      <style>{`
        :root{
          --sun-amber: 255,154,61;
          --sun-orange: 255,106,26;
          --sun-cream: 255,215,176;
        }

        .heroPageBg{
          position:absolute; inset:0;
          background:
            radial-gradient(120% 90% at 50% 20%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 55%),
            radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.94) 70%, rgba(0,0,0,0.99) 100%),
            linear-gradient(180deg, #070708 0%, #050506 40%, #000 100%);
        }

        .heroGrain{
          position:absolute; inset:0;
          opacity:.10;
          background-image:
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.33) 1px, transparent 0);
          background-size: 28px 28px;
          mix-blend-mode: overlay;
        }

        .heroCard{
          position:relative;
          border-radius: 32px;
          overflow:hidden;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(10,10,10,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            0 22px 60px rgba(0,0,0,0.8),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .heroCardEdge{
          position:absolute; inset:-1px;
          border-radius: inherit;
          pointer-events:none;
          background:
            radial-gradient(90% 70% at 18% 0%, rgba(var(--sun-amber),0.20) 0%, rgba(0,0,0,0) 55%),
            radial-gradient(90% 70% at 82% 100%, rgba(var(--sun-orange),0.14) 0%, rgba(0,0,0,0) 55%);
          opacity:.9;
          mix-blend-mode: screen;
        }

        .heroCardSweep{
          position:absolute; inset:-35%;
          background: linear-gradient(110deg,
            rgba(0,0,0,0) 0%,
            rgba(var(--sun-amber),0.16) 45%,
            rgba(var(--sun-cream),0.22) 50%,
            rgba(var(--sun-amber),0.16) 55%,
            rgba(0,0,0,0) 100%);
          filter: blur(14px);
          transform: translateX(-10%) rotate(-10deg);
          opacity:.45;
          mix-blend-mode: screen;
        }

        .heroCardHalo{
          position:absolute; inset:-10%;
          background: radial-gradient(55% 42% at 50% 68%,
            rgba(var(--sun-amber),0.30) 0%,
            rgba(var(--sun-orange),0.14) 34%,
            rgba(0,0,0,0) 66%);
          opacity:.55;
          mix-blend-mode: screen;
        }

        .heroCardTopSheen{
          position:absolute; inset:0;
          background: linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 18%, rgba(0,0,0,0) 48%);
          opacity:.70;
          pointer-events:none;
        }
      `}</style>

      {/* общий фон секции */}
      <div className="pointer-events-none absolute inset-0">
        <div className="heroPageBg" />
        <div className="heroGrain" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
      </div>

      <Container>
        {/* одна большая карточка по центру, внутри всё по центру */}
        <div className="relative mx-auto max-w-6xl">
          <div className="heroCard min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] relative z-10 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-10">
            {/* ФОН ВНУТРИ КАРТОЧКИ — сдвинут в -z-10, чтобы не перекрывать иконку */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
              <img
                src={HERO_CARD_IMG}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[50%_70%]"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/32" />
              <div className="heroCardHalo" />
              <div className="heroCardSweep" />
              <div className="heroCardEdge" />
              <div className="heroCardTopSheen" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* ИКОНКА TELEGRAM – теперь точно сверху */}
            <a
              href={TG_URL}
              target="_blank"
              rel="noreferrer"
              className="absolute right-5 top-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 backdrop-blur hover:bg-white/10 transition"
              aria-label="Написать в Telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.5 13.3L10 17L11.9 14.9L16.5 19L19 5L5 11L9.5 13.3Z"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* КОНТЕНТ по центру */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <h1 className="font-display text-center text-[32px] leading-[1.03] sm:text-[46px] sm:leading-[1.02] lg:text-[54px] lg:leading-[1.02] font-extrabold tracking-[-0.03em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
                {hero.titleLine1}
                <span className="block text-white/92">
                  {hero.titleLine2Prefix}{" "}
                  <span className="bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                    {hero.titleLine2Premium}
                  </span>
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-center text-[14.5px] leading-relaxed text-white/80 sm:text-[15.5px] drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">
                {hero.subtitle}
              </p>

              {/* форма + кнопка демо */}
              <form
                onSubmit={onSubmit}
                className="mt-7 flex w-full max-w-[640px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
              >
                <div className="relative flex-1 min-w-[0]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/18 bg-black/40 backdrop-blur-md" />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-80 [background:radial-gradient(80%_140%_at_18%_0%,rgba(255,154,61,0.32),transparent_55%)]" />

                  <div className="relative flex items-center">
                    <span className="pointer-events-none absolute left-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-black/45 text-white/75">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          opacity="0.9"
                        />
                        <path
                          d="m6.5 8 5.1 4.1c.8.6 2 .6 2.8 0L19.5 8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          opacity="0.9"
                        />
                      </svg>
                    </span>

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder={hero.emailPlaceholder}
                      className={cx(
                        "w-full rounded-2xl bg-transparent",
                        "pl-16 pr-4",
                        "h-[52px] sm:h-[56px]",
                        "text-white/92 placeholder:text-white/60",
                        "outline-none",
                        "focus:ring-2 focus:ring-white/14"
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className={cx(
                    "relative overflow-hidden rounded-2xl h-[52px] sm:h-[56px] px-6",
                    "text-white font-semibold whitespace-nowrap transition-all",
                    "border border-white/14 backdrop-blur-md bg-black/65 hover:brightness-110 active:translate-y-[1px]",
                    "before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(90deg,#FFD7B0_0%,#FF9A3D_30%,#FF6A1A_60%,#FFD7B0_100%)] before:opacity-90",
                    "before:-z-10 before:transition-[opacity] before:duration-500 hover:before:opacity-100"
                  )}
                >
                  {hero.btnDemo}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
