// src/components/landing/Hero.tsx
import React, { useState, type CSSProperties } from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import { Button } from "../ui/Button";
import { useLang, type Lang } from "../../i18n/LangProvider";

const HERO_IMG = "/images/hero.png";

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

  // если попап/новая вкладка заблокированы — fallback через mailto
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
    <Section className="relative pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20">
      {/* фон */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.75)_70%,rgba(0,0,0,0.92)_100%)]" />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={
            {
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            } as CSSProperties
          }
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/95 to-transparent" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mt-6 font-display text-[36px] leading-[1.05] sm:text-[54px] sm:leading-[1.02] lg:text-[62px] font-extrabold tracking-[-0.03em] text-white">
            {hero.titleLine1}
            <span className="block text-white/90">
              {hero.titleLine2Prefix}{" "}
              <span className="bg-[linear-gradient(90deg,#FFD7B0,#FF9A3D,#FF6A1A)] bg-clip-text text-transparent">
                {hero.titleLine2Premium}
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-[14.5px] leading-relaxed text-white/72 sm:text-[16px]">
            {hero.subtitle}
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex w-full max-w-[720px] flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/14 bg-white/5 backdrop-blur-md" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-70 [background:radial-gradient(80%_120%_at_20%_0%,rgba(255,154,61,0.22),transparent_55%)]" />

              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white/65">
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
                    "h-[54px] sm:h-[58px]",
                    "text-white/90 placeholder:text-white/45",
                    "outline-none",
                    "focus:ring-2 focus:ring-white/10"
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className={cx(
                "relative overflow-hidden rounded-2xl h-[54px] sm:h-[58px] px-6",
                "text-white font-semibold whitespace-nowrap transition-all",
                "border border-white/10 backdrop-blur-md bg-black/55 hover:brightness-110 active:translate-y-[1px]",
                "before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(90deg,#FFD7B0_0%,#FF9A3D_30%,#FF6A1A_60%,#FFD7B0_100%)] before:opacity-90",
                "before:-z-10 before:transition-[opacity] before:duration-500 hover:before:opacity-100"
              )}
            >
              {hero.btnDemo}
            </Button>

            <a
              href={TG_URL}
              target="_blank"
              rel="noreferrer"
              className={cx(
                "inline-flex h-[54px] sm:h-[58px] items-center justify-center rounded-2xl px-6 whitespace-nowrap",
                "border border-white/14 bg-white/5 backdrop-blur",
                "text-[14px] font-[650] text-white/85 hover:bg-white/7 transition"
              )}
            >
              {hero.btnTelegram}
            </a>
          </form>
        </div>
      </Container>
      <div className="h-[1350px] sm:h-[1450px] lg:h-[1500px]" />
    </Section>
  );
}
