// src/components/landing/Footer.tsx
import React, { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { useLang } from "../../i18n/LangProvider";
import { buildProjects } from "../../data/projectsCatalog";
import { TG_CHANNEL_URL } from "../../constants/links";
import { CONTACT_EMAIL } from "../../lib/leads";
import { LeadCTAButton } from "../leads/LeadCTAButton";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const LOGO_LOCKUP_PNG = "/images/tivonix-logo-lockup.webp";
const FOOTER_BG = `/images/${encodeURI("как рабоает")}/${encodeURI("футер.webp")}`;
const SELL_IMG = "/images/footer-sell.webp";

const FOOTER_PAGES = [
  { to: "/", label: { ru: "Главная", en: "Home" } },
  { to: "/plans", label: { ru: "Тарифы", en: "Pricing" } },
  { to: "/about", label: { ru: "О компании", en: "About" } },
  { to: "/contacts", label: { ru: "Контакты", en: "Contacts" } },
] as const;

const FOOTER_SERVICES = [
  { to: "/sozdanie-sajtov", label: { ru: "Создание сайтов", en: "Website development" } },
  { to: "/avtomatizaciya-biznesa", label: { ru: "Автоматизация", en: "Automation" } },
  { to: "/#ai", label: { ru: "AI в продуктах", en: "AI in products" } },
  { to: "/#process", label: { ru: "Как мы работаем", en: "How we work" } },
] as const;

const FOOTER_GMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(CONTACT_EMAIL)}` +
  `&su=${encodeURIComponent("Проект (SaaS/MVP)")}`;

const FOOTER_CONNECT = [
  { href: TG_CHANNEL_URL, label: "Telegram", kind: "tg" as const },
  { href: "https://www.instagram.com/tivonix.tech/", label: "Instagram", kind: "ig" as const },
  { href: FOOTER_GMAIL_URL, label: "Gmail", kind: "mail" as const },
] as const;

const DOCS = {
  ru: [
    {
      href: "/doc/Политика_обработки_ПД_Tivonix_RU.pdf",
      label: "Политика обработки ПД",
      aria: "Политика обработки и защиты персональных данных (PDF)",
    },
    {
      href: "/doc/Согласие_на_обработку_ПД_Tivonix_RU.pdf",
      label: "Согласие на обработку ПД",
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
  className,
}: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
  "aria-label"?: string;
  className?: string;
}) {
  const isHttp = href.startsWith("http");
  const openInNewTab = newTab ?? isHttp;

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={cx("site-footer__link", className)}
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

function SocialIconLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cx("site-footer__social-link", className)}
    >
      {children}
    </a>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.2 3.4c.55-.22 1.1.3.95.86L19.05 19.4c-.14.55-.72.82-1.2.52l-4.35-2.7-2.35 2.25c-.4.38-1.05.14-1.15-.4l-.55-4.55 9.05-8.15c.18-.16-.04-.42-.25-.3L6.9 13.05l-4.35-1.35c-.58-.18-.58-1 .02-1.15L21.2 3.4Z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.7a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Z" />
      <circle cx="17.35" cy="6.7" r="1.15" />
      <path d="M16.7 2H7.3A5.3 5.3 0 0 0 2 7.3v9.4A5.3 5.3 0 0 0 7.3 22h9.4A5.3 5.3 0 0 0 22 16.7V7.3A5.3 5.3 0 0 0 16.7 2Zm3.4 14.7a3.45 3.45 0 0 1-3.4 3.4H7.3a3.45 3.45 0 0 1-3.4-3.4V7.3A3.45 3.45 0 0 1 7.3 3.9h9.4a3.45 3.45 0 0 1 3.4 3.4v9.4Z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.2 4.5H3.8A2.3 2.3 0 0 0 1.5 6.8v10.4a2.3 2.3 0 0 0 2.3 2.3h16.4a2.3 2.3 0 0 0 2.3-2.3V6.8a2.3 2.3 0 0 0-2.3-2.3Zm.4 2.55v.2l-8.05 5.35a.95.95 0 0 1-1.1 0L3.4 7.25v-.2c0-.22.18-.4.4-.4h16.4c.22 0 .4.18.4.4Zm0 10.15c0 .22-.18.4-.4.4H3.8a.4.4 0 0 1-.4-.4V9.2l7.45 4.95a2.85 2.85 0 0 0 3.3 0L20.6 9.2v8Z" />
    </svg>
  );
}

function Footer() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const sellRef = useRef<HTMLDivElement>(null);
  const sellWordRef = useRef<HTMLParagraphElement>(null);

  const t = (v: { ru: string; en: string }) => (isRu ? v.ru : v.en);

  useEffect(() => {
    const sell = sellRef.current;
    const word = sellWordRef.current;
    if (!sell || !word) return;

    const fit = () => {
      const total = sell.clientWidth;
      if (total < 64) return;

      // Leave a little room so the last letter (x) isn’t clipped
      const maxWidth = total * 0.94;

      word.style.width = "auto";
      word.style.transform = "none";
      word.style.letterSpacing = "-0.02em";

      let lo = 20;
      let hi = Math.min(480, maxWidth * 0.52);

      for (let i = 0; i < 20; i += 1) {
        const mid = (lo + hi) / 2;
        word.style.fontSize = `${mid}px`;
        if (word.scrollWidth <= maxWidth) lo = mid;
        else hi = mid;
      }

      word.style.fontSize = `${lo * 0.97}px`;
    };

    const ro = new ResizeObserver(fit);
    ro.observe(sell);
    fit();
    void document.fonts?.ready?.then(fit);

    return () => ro.disconnect();
  }, []);

  const docs = isRu ? DOCS.ru : DOCS.en;
  const projects = buildProjects(isRu).slice(0, 5);
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="site-footer font-sans text-white antialiased selection:bg-[color:var(--accent)]/25"
    >
      <Container className="site-footer__shell">
        <div className="site-footer__panel">
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

          <div className="site-footer__content">
            <div className="site-footer__main">
              <aside className="site-footer__touch">
                <Link
                  to="/"
                  className="site-footer__logo focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg"
                  aria-label={isRu ? "На главную" : "Home"}
                >
                  <img
                    src={LOGO_LOCKUP_PNG}
                    onError={imgFallback(LOGO_LOCKUP_PNG)}
                    alt="Tivonix"
                    className="block h-8 w-auto sm:h-9"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>

                <h2 className="site-footer__touch-title">
                  {isRu ? "Связаться" : "Get in touch"}
                </h2>

                <p className="site-footer__touch-lead">
                  {isRu ? "Ваш техпартнёр по сайтам, ботам и CRM" : "Your tech partner for sites, bots and CRM"}
                </p>

                <a href={FOOTER_GMAIL_URL} target="_blank" rel="noopener noreferrer" className="site-footer__touch-row">
                  <Mail className="site-footer__touch-row-icon" strokeWidth={2} aria-hidden />
                  <span>{CONTACT_EMAIL}</span>
                </a>

                <a
                  href={TG_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__touch-row"
                >
                  <IconTelegram className="site-footer__touch-row-icon" />
                  <span>Telegram</span>
                </a>

                <div className="site-footer__actions">
                  <LeadCTAButton source="footer" variant="primary" className="site-footer__action-btn">
                    {isRu ? "Обсудить проект" : "Discuss a project"}
                  </LeadCTAButton>
                </div>

                <nav
                  className="site-footer__social"
                  aria-label={isRu ? "Соцсети и почта" : "Social and email"}
                >
                  {FOOTER_CONNECT.map((item) => (
                    <SocialIconLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      className={`site-footer__social-link--${item.kind}`}
                    >
                      {item.kind === "tg" ? (
                        <IconTelegram className="site-footer__social-icon" />
                      ) : item.kind === "ig" ? (
                        <IconInstagram className="site-footer__social-icon" />
                      ) : (
                        <IconMail className="site-footer__social-icon" />
                      )}
                    </SocialIconLink>
                  ))}
                </nav>
              </aside>

              <div className="site-footer__grid">
                <ColNav id="footer-pages" title={isRu ? "Компания" : "Company"}>
                  {FOOTER_PAGES.map((i) => (
                    <li key={i.to}>
                      <FooterLink to={i.to}>{t(i.label)}</FooterLink>
                    </li>
                  ))}
                </ColNav>

                <ColNav id="footer-services" title={isRu ? "Услуги" : "Services"}>
                  {FOOTER_SERVICES.map((i) => (
                    <li key={i.to}>
                      <FooterLink to={i.to}>{t(i.label)}</FooterLink>
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
            </div>

            <div className="site-footer__bottom">
              <div className="site-footer__bottom-start">
                <p className="site-footer__copy">
                  TIVONIX © {year}
                  <span className="site-footer__copy-sep" aria-hidden>
                    |
                  </span>
                  {isRu ? "Все права защищены" : "All rights reserved"}
                </p>
              </div>

              <nav className="site-footer__legal-nav" aria-label={isRu ? "Документы" : "Legal"}>
                {docs.map((d) => (
                  <ExternalLink key={d.href} href={d.href} newTab aria-label={d.aria}>
                    {d.label}
                  </ExternalLink>
                ))}
              </nav>
            </div>

            <div
              ref={sellRef}
              className="site-footer__sell"
              style={{
                ["--footer-sell-img" as string]: `url(${JSON.stringify(SELL_IMG)})`,
              }}
            >
              <p className="site-footer__sell-kicker">
                {isRu ? "Ваш техпартнёр" : "Your tech partner"}
              </p>
              <p className="site-footer__sell-word" ref={sellWordRef} aria-label="TIVONIX">
                tivonix
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
