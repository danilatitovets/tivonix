// src/components/landing/Footer.tsx
import React, { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { buildProjects } from "../../data/projectsCatalog";
import HeroWebGLBg from "./HeroWebGLBg";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}
type Style = CSSProperties & Record<string, unknown>;
const s = (v: Record<string, unknown>) => v as Style;

const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.png";
const WATERMARK_LOGO = "/favicon.svg";
const ACCENT = "#FF6B2C";

const LANDING = {
  top: "/#top",
  services: "/#services",
  faq: "/#faq",
} as const;

const MENU = [
  { to: LANDING.top, label: { ru: "Главная", en: "Home" } },
  { to: "/sozdanie-sajtov", label: { ru: "Создание сайтов", en: "Website development" } },
  { to: LANDING.services, label: { ru: "Услуги", en: "Services" } },
  { to: LANDING.faq, label: { ru: "FAQ", en: "FAQ" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } },
];

/** Якоря главной — отдельная колонка, чтобы сетка справа была плотнее (как у крупных SaaS-футеров). */
const SECTION_LINKS = [
  { to: "/#stack", label: { ru: "Технологии", en: "Tech stack" } },
  { to: "/#benefits", label: { ru: "Преимущества", en: "Benefits" } },
  { to: "/#admin", label: { ru: "Админ-панели", en: "Admin panels" } },
  { to: "/#services", label: { ru: "Тарифы", en: "Pricing" } },
] as const;

const GMAIL_EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent("tivoonix@gmail.com")}` +
  `&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;

const CONTACTS = {
  telegram: { href: "https://t.me/TIVONIX", label: "Telegram" },
  instagram: { href: "https://www.instagram.com/tivonix.tech/", label: "Instagram" },
  email: { href: GMAIL_EMAIL_URL, label: "Email" },
};

const DOCS = {
  ru: [
    {
      href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
      label: "Политика ПД",
      aria: "Политика обработки и защиты персональных данных (PDF)",
    },
    {
      href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
      label: "Согласие ПД",
      aria: "Согласие на обработку персональных данных (PDF)",
    },
  ],
  en: [
    {
      href: "/doc/Privacy_Policy_Tivonix_EN.pdf",
      label: "Privacy Policy",
      aria: "Privacy Policy (PDF)",
    },
    {
      href: "/doc/Consent_Tivonix_EN.pdf",
      label: "Consent",
      aria: "Consent to personal data processing (PDF)",
    },
  ],
} as const;

/** Ссылки: как у Framer — ~14px, серый #A3A3A3, hover → белый, line-height ~1.6 */
const footerLinkText =
  "font-sans text-[14px] font-normal leading-[1.6] text-[#A3A3A3] antialiased transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:rounded-sm";

/** Заголовки колонок: белый, ~16px, bold 700, без uppercase */
const colTitleClass =
  "font-sans text-[15px] sm:text-[16px] font-bold tracking-tight text-white antialiased leading-snug";

function imgFallback(fallbackSrc: string) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === "1") return;
    img.dataset.fallbackApplied = "1";
    img.src = fallbackSrc;
  };
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className={cx("block w-fit", footerLinkText)}>
      {children}
    </Link>
  );
}

function ExternalLink({
  href,
  children,
  newTab,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
  "aria-label"?: string;
}) {
  const isHttp = href.startsWith("http");
  const openInNewTab = newTab ?? isHttp;

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={cx("block w-fit max-w-full", footerLinkText)}
    >
      {children}
    </a>
  );
}

function ColNav({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-labelledby={id} className="min-w-0">
      <h2 id={id} className={colTitleClass}>
        {title}
      </h2>
      <ul className="mt-3 space-y-2">{children}</ul>
    </nav>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cx(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
        "border border-white/[0.12] bg-white/[0.03] text-white/58",
        "transition-[color,background-color,border-color] duration-200",
        "hover:border-white/22 hover:bg-white/[0.08] hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      )}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [mounted, setMounted] = useState(false);
  const t = (v: { ru: string; en: string }) => (isRu ? v.ru : v.en);

  useEffect(() => {
    setMounted(true);
  }, []);

  const docs = isRu ? DOCS.ru : DOCS.en;
  const projects = buildProjects(isRu);

  const rights = isRu ? "Все права защищены." : "All rights reserved.";

  return (
    <footer
      className={cx(
        "relative isolate overflow-hidden font-sans text-white antialiased",
        "selection:bg-[color:var(--accent)]/25"
      )}
      style={s({ ["--accent" as string]: ACCENT, backgroundColor: "#000000" })}
    >
      {/*
        Дым как в Hero: WebGL под оверлеем и **под** водяным знаком.
        Маска radial — без прямоугольного края Canvas; пласт уходит влево мягко.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 isolate overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={s({
            background:
              "radial-gradient(120% 90% at 85% 100%, rgba(255,154,61,0.22) 0%, rgba(255,106,26,0.12) 30%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #020202 100%)",
          })}
        />
        {/* 1) WebGL: та же сцена и маска, что на десктопе — на всех ширинах */}
        <div className="absolute inset-0">
          <div
            className="absolute bottom-[-48%] left-[-8%] right-[-28%] top-[0%] min-h-[min(100vh,920px)]"
            style={s({
              opacity: 1,
              WebkitMaskImage:
                "radial-gradient(ellipse 145% 115% at 92% 100%, #000 0%, #000 38%, rgba(0,0,0,0.94) 52%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,0.22) 84%, rgba(0,0,0,0.06) 94%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 145% 115% at 92% 100%, #000 0%, #000 38%, rgba(0,0,0,0.94) 52%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,0.22) 84%, rgba(0,0,0,0.06) 94%, transparent 100%)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            })}
          >
            {mounted ? <HeroWebGLBg /> : null}
          </div>
        </div>

        {/* 2) Оверлей: слева текст читается, справа/снизу почти не душим — дым сильно заметен */}
        <div
          className="absolute inset-0"
          style={s({
            background: [
              "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.42) 30%, rgba(0,0,0,0.10) 54%, rgba(0,0,0,0.02) 72%, rgba(0,0,0,0.04) 100%)",
              "radial-gradient(120% 120% at 50% 92%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.82) 100%)",
            ].join(","),
          })}
        />

        {/* 3) Водяной знак — только над фоном; весь текст/ссылки — в слое z-10 ниже */}
        <img
          src={WATERMARK_LOGO}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className={cx(
            "absolute z-[1] select-none",
            "-right-[12vw] -bottom-[14vw]",
            "w-[min(760px,62vw)] max-w-none",
            "opacity-[0.14] sm:opacity-[0.16]"
          )}
          style={s({ filter: "saturate(1.06) brightness(1.12)" })}
        />
      </div>

      <div className="relative z-10">
        <Container>
          <div className="relative px-3 sm:px-5">
            <div className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
            {/* Framer-подобная схема: бренд слева, плотная сетка колонок справа (без «пустого поля»). */}
            <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
              <aside className="shrink-0 lg:w-[min(280px,32%)] lg:max-w-[300px]">
                <Link
                  to={LANDING.top}
                  className={cx(
                    "inline-block rounded-lg",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  )}
                  aria-label={isRu ? "Наверх" : "Back to top"}
                >
                  <img
                    src={LOGO_LOCKUP_PNG}
                    onError={imgFallback(LOGO_LOCKUP_PNG)}
                    alt="Tivonix"
                    className="block h-9 w-auto sm:h-10"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              </aside>

              <div className="min-w-0 flex-1">
                <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-7 md:grid-cols-3 md:gap-y-11 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
                  <ColNav id="footer-site" title={isRu ? "Сайт" : "Site"}>
                    {MENU.map((i) => (
                      <li key={i.to}>
                        <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                      </li>
                    ))}
                  </ColNav>

                  <ColNav id="footer-sections" title={isRu ? "Секции" : "Sections"}>
                    {SECTION_LINKS.map((i) => (
                      <li key={i.to}>
                        <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                      </li>
                    ))}
                  </ColNav>

                  <ColNav id="footer-work" title={isRu ? "Кейсы" : "Work"}>
                    <li>
                      <FooterLink to="/projects">{isRu ? "Все проекты" : "All projects"}</FooterLink>
                    </li>
                    {projects.map((p) => (
                      <li key={p.id}>
                        <FooterLink to={`/projects/${p.id}`}>{p.title}</FooterLink>
                      </li>
                    ))}
                  </ColNav>

                  <ColNav id="footer-contact" title={isRu ? "Связь" : "Connect"}>
                    <li>
                      <ExternalLink href={CONTACTS.telegram.href}>{CONTACTS.telegram.label}</ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={CONTACTS.instagram.href}>{CONTACTS.instagram.label}</ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={CONTACTS.email.href}>{CONTACTS.email.label}</ExternalLink>
                    </li>
                  </ColNav>

                  <ColNav id="footer-legal" title={isRu ? "Документы" : "Legal"}>
                    {docs.map((d) => (
                      <li key={d.href}>
                        <ExternalLink href={d.href} newTab aria-label={d.aria}>
                          {d.label}
                        </ExternalLink>
                      </li>
                    ))}
                  </ColNav>
                </div>
              </div>
            </div>

            <div
              className={cx(
                "mt-14 border-t border-white/[0.09] pt-8 sm:mt-16 sm:pt-9",
                "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              )}
            >
              <p className="text-[13px] leading-relaxed text-[#737373] sm:text-[14px]">
                © {new Date().getFullYear()} TIVONIX. {rights}
              </p>
              <nav
                className="flex flex-wrap items-center gap-1.5 sm:justify-end"
                aria-label={isRu ? "Соцсети и почта" : "Social and email"}
              >
                <SocialIconLink href={CONTACTS.telegram.href} label={CONTACTS.telegram.label}>
                  <IconTelegram className="h-4 w-4" />
                </SocialIconLink>
                <SocialIconLink href={CONTACTS.instagram.href} label={CONTACTS.instagram.label}>
                  <IconInstagram className="h-4 w-4" />
                </SocialIconLink>
                <SocialIconLink href={CONTACTS.email.href} label={CONTACTS.email.label}>
                  <IconMail className="h-4 w-4" />
                </SocialIconLink>
              </nav>
            </div>
          </div>
        </div>
        </Container>
      </div>
    </footer>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.8 4.6c.2-.8-.6-1.5-1.4-1.2L3.4 10c-1 .4-1 1.8 0 2.2l4.5 1.7 1.7 4.9c.3.9 1.5 1 2 .2l2.6-4.2 4.7 3.6c.7.5 1.7.1 1.9-.8L21.8 4.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 13.8 19.6 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.55" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.55" />
      <circle cx="17.5" cy="6.5" r="1.35" fill="currentColor" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 7.5v9a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-11a2 2 0 0 0-2 2Z"
        stroke="currentColor"
        strokeWidth="1.65"
        opacity="0.95"
      />
      <path d="M6 8.5 12 12.5l6-4" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
