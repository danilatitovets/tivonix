// src/components/landing/Footer.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { buildProjects } from "../../data/projectsCatalog";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.png";
const FOOTER_BG = `/images/${encodeURI("как рабоает")}/${encodeURI("футер.png")}`;
const ACCENT = "#FF6B2C";

const FOOTER_PAGES = [
  { to: "/", label: { ru: "Главная", en: "Home" } },
  { to: "/plans", label: { ru: "Тарифы", en: "Pricing" } },
  { to: "/avtomatizaciya-biznesa", label: { ru: "Автоматизация", en: "Automation" } },
  { to: "/sozdanie-sajtov", label: { ru: "Создание сайтов", en: "Website development" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } },
] as const;

const FOOTER_HOME = [
  { to: "/#pain", label: { ru: "Почему теряются заявки", en: "Why leads get lost" } },
  { to: "/#offer", label: { ru: "Что мы делаем", en: "What we build" } },
  { to: "/#ai", label: { ru: "AI в продуктах", en: "AI in products" } },
  { to: "/#compare", label: { ru: "Как работает система", en: "How the system works" } },
  { to: "/#cases", label: { ru: "Проекты", en: "Projects" } },
  { to: "/#audience", label: { ru: "Кому помогаем", en: "Who we help" } },
  { to: "/#process", label: { ru: "Как проходит работа", en: "How we work" } },
  { to: "/#faq", label: { ru: "Частые вопросы", en: "FAQ" } },
] as const;

const FOOTER_CONNECT = [
  { href: "https://t.me/TIVONIX", label: "Telegram" },
  { href: "https://www.instagram.com/tivonix.tech/", label: "Instagram" },
  {
    href:
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent("tivoonix@gmail.com")}` +
      `&su=${encodeURIComponent("Проект (SaaS/MVP)")}`,
    label: "Email",
  },
] as const;

const DOCS = {
  ru: [
    {
      href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
      label: "Политика",
      aria: "Политика обработки и защиты персональных данных (PDF)",
    },
    {
      href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
      label: "Согласие",
      aria: "Согласие на обработку персональных данных (PDF)",
    },
  ],
  en: [
    {
      href: "/doc/Privacy_Policy_Tivonix_EN.pdf",
      label: "Privacy",
      aria: "Privacy Policy (PDF)",
    },
    {
      href: "/doc/Consent_Tivonix_EN.pdf",
      label: "Consent",
      aria: "Consent to personal data processing (PDF)",
    },
  ],
} as const;

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
    <Link to={to} className="site-footer__link">
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
      className="site-footer__link"
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
    <nav aria-labelledby={id} className="site-footer__col min-w-0">
      <h2 id={id} className="site-footer__col-title">
        {title}
      </h2>
      <ul className="site-footer__col-list">{children}</ul>
    </nav>
  );
}

function Footer() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [reducedMotion, setReducedMotion] = useState(false);

  const t = (v: { ru: string; en: string }) => (isRu ? v.ru : v.en);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      setReducedMotion(!!motionMq.matches);
    };

    apply();
    motionMq.addEventListener?.("change", apply);

    return () => {
      motionMq.removeEventListener?.("change", apply);
    };
  }, []);

  const docs = isRu ? DOCS.ru : DOCS.en;
  const projects = buildProjects(isRu);

  const tagline = isRu
    ? "Сайты, боты и CRM — чтобы заявки не терялись"
    : "Websites, bots and CRM — so leads don't get lost";

  return (
    <footer
      id="site-footer"
      className="site-footer font-sans text-white antialiased selection:bg-[color:var(--accent)]/25"
      style={{ ["--accent" as string]: ACCENT }}
    >
      <div className="site-footer__bg" aria-hidden>
        <img
          src={FOOTER_BG}
          alt=""
          className="site-footer__bg-img"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="site-footer__bg-fade" />
      </div>

      <Container className="site-footer__shell">
        <div className="site-footer__panel">
          <div className="site-footer__bar">
            <Link
              to="/"
              className="site-footer__logo focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] rounded-lg"
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
          </div>

          <div className="site-footer__grid">
            <ColNav id="footer-pages" title={isRu ? "Страницы" : "Pages"}>
              {FOOTER_PAGES.map((i) => (
                <li key={i.to}>
                  <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                </li>
              ))}
            </ColNav>

            <ColNav id="footer-home" title={isRu ? "На главной" : "Homepage"}>
              {FOOTER_HOME.map((i) => (
                <li key={i.to}>
                  <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                </li>
              ))}
            </ColNav>

            <ColNav id="footer-connect" title={isRu ? "Связь" : "Connect"}>
              {FOOTER_CONNECT.map((i) => (
                <li key={i.href}>
                  <ExternalLink href={i.href}>{i.label}</ExternalLink>
                </li>
              ))}
            </ColNav>

            <ColNav id="footer-work" title={isRu ? "Кейсы" : "Cases"}>
              <li>
                <FooterLink to="/projects">{isRu ? "Все проекты" : "All projects"}</FooterLink>
              </li>
              {projects.map((p) => (
                <li key={p.id}>
                  <FooterLink to={`/projects/${p.id}`}>{p.title}</FooterLink>
                </li>
              ))}
            </ColNav>
          </div>

          <div className="site-footer__legal">
            <div className="site-footer__brand">
              <p
                className={cx(
                  "ai-premium-ai-mark__text site-footer__rainbow",
                  !reducedMotion && "ai-premium-ai-mark__text--animated"
                )}
              >
                tivonix &amp; AI
              </p>
              <p className="site-footer__tagline">{tagline}</p>
            </div>

            <nav className="site-footer__legal-nav" aria-label={isRu ? "Документы" : "Legal"}>
              {docs.map((d) => (
                <ExternalLink key={d.href} href={d.href} newTab aria-label={d.aria}>
                  {d.label}
                </ExternalLink>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
