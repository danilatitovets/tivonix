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

// Поменяй на свои пути
const LOGO_LOCKUP_SVG = "/images/tivonix-logo-lockup.svg";
const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.png";

// watermark-лого снизу справа (лучше SVG)
// Важно: путь обычно без /public -> "/favicon.svg"
const WATERMARK_LOGO = "/favicon.svg";

// Один акцентный цвет на весь футер
const ACCENT = "#FF6B2C";

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

// Gmail compose для email (без mailto:)
const GMAIL_EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent("tivoonix@gmail.com")}` +
  `&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;

const CONTACTS = {
  telegram: { href: "https://t.me/TIVONIX", label: "Telegram" },
  email: {
    href: GMAIL_EMAIL_URL,
    label: "Email",
  },
};

const LEGAL = [
  { to: "/privacy", label: { ru: "Политика", en: "Privacy" } },
  { to: "/terms", label: { ru: "Условия", en: "Terms" } },
];

// ВНИЗУ оставляем только TG
const SOCIALS = [
  { href: "https://t.me/TIVONIX", label: "Telegram", icon: TelegramIcon },
];

function imgFallback(fallbackSrc: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallbackSrc;
  };
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cx(
        "group inline-flex items-center gap-2 text-sm text-white/70 transition-colors",
        "hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40 focus-visible:rounded"
      )}
    >
      <span className="relative">
        {children}
        <span
          className={cx(
            "absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200",
            "group-hover:w-full"
          )}
          style={s({
            backgroundColor:
              "color-mix(in srgb, var(--accent) 75%, transparent)",
          })}
        />
      </span>
    </Link>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isHttp = href.startsWith("http");
  return (
    <a
      href={href}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
      className={cx(
        "group inline-flex items-center gap-2 text-sm text-white/70 transition-colors",
        "hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40 focus-visible:rounded"
      )}
    >
      <span className="relative">
        {children}
        <span
          className={cx(
            "absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200",
            "group-hover:w-full"
          )}
          style={s({
            backgroundColor:
              "color-mix(in srgb, var(--accent) 75%, transparent)",
          })}
        />
      </span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();
  const isRu = lang === "ru";
  const t = (v: { ru: string; en: string }) => (isRu ? v.ru : v.en);

  const tagline = isRu
    ? "SaaS и MVP под ключ — быстро, аккуратно, поддерживаемо."
    : "SaaS & MVP delivered fast — clean, maintainable, reliable.";

  const rightsText = isRu
    ? `© ${year} Tivonix. Все права защищены.`
    : `© ${year} Tivonix. All rights reserved.`;

  return (
    <footer
      className={cx(
        "relative isolate overflow-hidden bg-black text-white",
        "selection:bg-[color:var(--accent)]/30 selection:text-white"
      )}
      style={s({ ["--accent" as any]: ACCENT })}
    >
      {/* тонкая верхняя линия */}
      <div className="h-px w-full bg-[color:var(--accent)]/25" />

      {/* Watermark слой */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -right-28 -bottom-28 h-[640px] w-[640px] opacity-35 blur-3xl"
          style={s({
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 45%, transparent), rgba(0,0,0,0))",
          })}
        />

        <img
          src={WATERMARK_LOGO}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className={cx(
            "absolute select-none",
            "-right-[10vw] -bottom-[10vw]",
            "w-[min(980px,68vw)] max-w-none",
            "opacity-[0.14]",
            "blur-0"
          )}
          style={s({
            filter: "saturate(1.05) contrast(1.05) brightness(1.03)",
            imageRendering: "auto",
          })}
        />
      </div>

      <Container>
        <div className="relative py-14 sm:py-16">
          {/* Верх: лого + описание */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-[560px]">
              <Link
                to={LANDING.top}
                className={cx(
                  "inline-flex items-center gap-3 rounded-xl p-1 pr-3",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/45"
                )}
                aria-label={isRu ? "Наверх" : "Back to top"}
                title={isRu ? "Наверх" : "Back to top"}
              >
                <img
                  src={LOGO_LOCKUP_SVG}
                  onError={imgFallback(LOGO_LOCKUP_PNG)}
                  alt="Tivonix"
                  className="h-9 w-auto"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-xs text-white/40 hidden sm:inline">
                  {isRu ? "Наверх" : "Top"}
                </span>
              </Link>

              <p className="mt-4 text-sm leading-6 text-white/65">{tagline}</p>

              <div className="mt-5 h-px w-24 bg-[color:var(--accent)]/40" />
            </div>
          </div>

          {/* 3 колонки */}
          <div className="mt-10 grid grid-cols-2 gap-10 sm:grid-cols-3">
            {/* MENU */}
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
                {isRu ? "Меню" : "Menu"}
              </div>
              <ul className="mt-4 space-y-2.5">
                {MENU.map((i) => (
                  <li key={i.to}>
                    <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
                {isRu ? "Контакты" : "Contact"}
              </div>

              <ul className="mt-4 space-y-2.5">
                <li>
                  <ExternalLink href={CONTACTS.telegram.href}>
                    {CONTACTS.telegram.label}
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href={CONTACTS.email.href}>
                    {CONTACTS.email.label}
                  </ExternalLink>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
                {isRu ? "Документы" : "Legal"}
              </div>
              <ul className="mt-4 space-y-2.5">
                {LEGAL.map((i) => (
                  <li key={i.to}>
                    <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* низ — © + только TG */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm text-white/60">{rightsText}</div>

                <div className="mt-3 flex items-center gap-3">
                  {SOCIALS.map((soc) => (
                    <a
                      key={soc.href}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "inline-flex h-9 w-9 items-center justify-center rounded-full",
                        "text-white/55 hover:text-white transition-colors",
                        "hover:bg-[color:var(--accent)]/[0.08]",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40"
                      )}
                      aria-label={soc.label}
                      title={soc.label}
                    >
                      <soc.icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-sm text-white/45">{/* пусто */}</div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ======= icons (inline svg) ======= */

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.8 4.6c.2-.8-.6-1.5-1.4-1.2L3.4 10c-1 .4-1 1.8 0 2.2l4.5 1.7 1.7 4.9c.3.9 1.5 1 2 .2l2.6-4.2 4.7 3.6c.7.5 1.7.1 1.9-.8L21.8 4.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.8 19.6 6.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
