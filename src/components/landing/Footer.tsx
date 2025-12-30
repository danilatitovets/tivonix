// src/components/landing/Footer.tsx
import React, { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Style = CSSProperties & Record<string, any>;
const s = (v: Record<string, any>) => v as Style;

const LOGO_LOCKUP_SVG = "/images/tivonix-logo-lockup.svg";
const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.png";

const LANDING = {
  top: "/#top",
  admin: "/#admin",
  stack: "/#stack",
  benefits: "/#benefits",
  faq: "/#faq",
  contact: "/#contact",
};

const MENU = [
  { to: LANDING.admin, label: { ru: "Админ панель", en: "Admin panel" } },
  { to: LANDING.stack, label: { ru: "Стек", en: "Stack" } },
  { to: LANDING.benefits, label: { ru: "Преимущества", en: "Benefits" } },
  { to: LANDING.faq, label: { ru: "FAQ", en: "FAQ" } },
  { to: "/projects", label: { ru: "Проекты", en: "Projects" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } },
];

const SOCIALS = [
  { href: "https://t.me/TIVONIX", label: "Telegram" },
  {
    href:
      "https://mail.google.com/mail/?view=cm&fs=1&to=tivoonix@gmail.com&su=" +
      encodeURIComponent("Проект (SaaS/MVP)"),
    label: "Gmail",
  },
];

function imgFallback(fallbackSrc: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallbackSrc;
  };
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();
  const isRu = lang === "ru";

  const getStartedLabel = isRu ? "НАЧАТЬ" : "GET STARTED";
  const subscribeText = isRu
    ? "Подписываясь, ты принимаешь наши условия. Без спама."
    : "By subscribing, you accept our terms. No spam.";
  const menuTitle = isRu ? "МЕНЮ" : "MENU";
  const linksTitle = isRu ? "ССЫЛКИ" : "LINKS";
  const backToTop = isRu ? "Наверх" : "Top";
  const faqShort = "FAQ";
  const rightsText = isRu
    ? `© ${year} Tivonix. Все права защищены.`
    : `© ${year} Tivonix. All rights reserved.`;

  return (
    <footer className="relative overflow-hidden bg-black py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
      </div>

      <Container>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[980px] -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"
            style={s({
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,120,40,0.7), rgba(0,0,0,0) 70%)",
            })}
          />

          <div
            className={cx(
              "relative overflow-hidden rounded-[34px]",
              "border border-white/15",
              "shadow-[0_45px_170px_rgba(0,0,0,0.9)]",
              "backdrop-blur-2xl bg-black/35"
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.30]"
              style={s({
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,150,90,0.6) 1px, rgba(0,0,0,0) 1.7px)",
                backgroundSize: "18px 18px",
                mixBlendMode: "screen",
              })}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[34px]"
              style={s({
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.04)",
              })}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-2 select-none text-[110px] font-extrabold tracking-tight text-white/[0.06] sm:text-[150px]"
              style={s({ textTransform: "lowercase" })}
            >
              tivonix
            </div>

            <div className="relative px-7 py-10 sm:px-10 sm:py-12">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="flex items-center">
                        <img
                          src={LOGO_LOCKUP_SVG}
                          onError={imgFallback(LOGO_LOCKUP_PNG)}
                          alt="Tivonix"
                          className="h-[52px] w-auto object-contain sm:h-[54px]"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["React", "Tailwind", "TypeScript", "SaaS UI"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[12px] text-white/75 backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 lg:pl-4">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <form
                        className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="relative flex-1">
                          <input
                            type="email"
                            placeholder="you@domain.com"
                            className={cx(
                              "h-12 w-full rounded-full px-4",
                              "bg-white/10 text-white placeholder:text-white/40",
                              "border border-white/20",
                              "outline-none focus:border-white/40",
                              "focus:ring-2 focus:ring-white/15"
                            )}
                          />
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-full"
                            style={s({
                              boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,0.08)",
                            })}
                          />
                        </div>

                        <button
                          type="submit"
                          className={cx(
                            "h-12 rounded-full px-6 font-semibold",
                            "text-[12px] tracking-wide",
                            "bg-white text-black",
                            "hover:bg-white/90 active:bg-white/80",
                            "shadow-[0_22px_80px_rgba(0,0,0,0.7)]"
                          )}
                        >
                          {getStartedLabel}
                        </button>
                      </form>

                      <div className="mt-2 text-[12px] text-white/55">
                        {subscribeText}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-white/55">
                        {menuTitle}
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        {MENU.map((i) => (
                          <Link
                            key={i.to}
                            to={i.to}
                            className="text-sm text-white/70 hover:text-white transition-colors"
                          >
                            {isRu ? i.label.ru : i.label.en}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-white/55">
                        {linksTitle}
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        {SOCIALS.map((i) => (
                          <a
                            key={i.href}
                            href={i.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-white/70 hover:text-white transition-colors"
                          >
                            {i.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-white/65">{rightsText}</div>

                <div className="flex items-center gap-4">
                  <Link className="text-sm text-white/65 hover:text-white" to={LANDING.top}>
                    {backToTop}
                  </Link>
                  <Link className="text-sm text-white/65 hover:text-white" to={LANDING.faq}>
                    {faqShort}
                  </Link>

                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={cx(
                      "ml-2 grid h-10 w-10 place-items-center rounded-full",
                      "border border-white/15 bg-black/40",
                      "text-white/80 hover:text-white",
                      "backdrop-blur"
                    )}
                    aria-label={backToTop}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 14l5-5 5 5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={s({
                backgroundImage:
                  "radial-gradient(1200px 420px at 50% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.4) 100%)",
              })}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
