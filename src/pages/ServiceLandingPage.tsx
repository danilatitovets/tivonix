import { Link, useLocation } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import SoftImg from "../components/ui/SoftImg";
import {
  WebsiteExamplesSection,
  WebsiteHeroVideoFrame,
  WebsitePageBg,
} from "../components/services/WebsiteServiceVisuals";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { ctaClass } from "../components/leads/ctaStyles";
import { useLang } from "../i18n/LangProvider";
import {
  servicePageCopy,
  servicePageIdFromPath,
  type ServicePageId,
} from "../i18n/servicePagesCopy";
import { pathForLang } from "../lib/localePaths";

type Props = { pageId?: ServicePageId };

const HERO_VISUAL: Partial<Record<ServicePageId, string>> = {
  portal: "/images/project-priew/spliton.webp",
  crm: `/images/${encodeURI("обложки")}/tivonixpanel.webp`,
  telegram: "/images/project-priew/slotty.webp",
  mvp: "/images/project-priew/neo-terminal.webp",
};

function caseHref(href: string, lang: string) {
  if (lang === "en" && href.startsWith("/") && !href.startsWith("/en")) {
    return `/en${href}`;
  }
  return href;
}

export default function ServiceLandingPage({ pageId: pageIdProp }: Props) {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const pageId = pageIdProp ?? servicePageIdFromPath(pathname);

  if (!pageId) {
    return null;
  }

  const copy = servicePageCopy(pageId, lang);
  const canonicalPath = pathname.replace(/\/+$/, "") || pathname;
  const heroVisual = HERO_VISUAL[pageId];
  const leadSource = `service_${pageId}`;
  const isRu = lang !== "en";
  const isWebsites = pageId === "websites";

  return (
    <div className="min-h-screen bg-[#070607] text-white">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath={canonicalPath}
        ogLocalePrimary={lang === "zh" ? "zh_CN" : lang === "en" ? "en_US" : "ru_RU"}
        hreflang={pageId === "websites" || pageId === "mvp" || pageId === "automation" || pageId === "portal"}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-[calc(var(--tivonix-header-spacer)+2rem)] pb-12 sm:pt-[calc(var(--tivonix-header-spacer)+2.75rem)] sm:pb-16">
          {isWebsites ? (
            <WebsitePageBg />
          ) : (
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(90% 70% at 78% 12%, rgba(252,80,0,0.22) 0%, rgba(252,80,0,0.06) 38%, transparent 68%), linear-gradient(180deg, #070607 0%, #0b0b0c 100%)",
              }}
            />
          )}
          <Container className="relative z-[1]">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
              <div className="min-w-0">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  TIVONIX · {isRu ? "Услуга" : "Service"}
                </p>
                <h1 className="mt-3 max-w-[16ch] font-sans text-[clamp(2rem,5.2vw,3.35rem)] font-[750] leading-[1.05] tracking-[-0.035em] text-balance">
                  {copy.h1}
                </h1>
                <p className="mt-5 max-w-[36rem] text-[16px] leading-7 text-white/78 sm:text-[17px]">
                  {copy.lead}
                </p>
                {!isWebsites ? (
                  <p className="mt-3 max-w-[36rem] text-[14.5px] leading-7 text-white/55 sm:text-[15px]">
                    {copy.offer}
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <LeadCTAButton
                    source={leadSource}
                    variant="primary"
                    size="lg"
                    pillIcon="plus"
                    className="min-w-[12.5rem] shadow-[0_12px_40px_rgba(255,107,44,0.28)]"
                  >
                    {copy.cta}
                  </LeadCTAButton>
                  <Link
                    to={pathForLang(isWebsites ? "/contacts" : "/projects", lang)}
                    className={
                      isWebsites
                        ? ctaClass("secondary", "lg")
                        : "inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-6 text-[14px] font-medium text-white/85 transition hover:border-white/28 hover:bg-white/[0.06]"
                    }
                  >
                    {isWebsites
                      ? isRu
                        ? "Контакты"
                        : "Contacts"
                      : isRu
                        ? "Смотреть проекты"
                        : "View projects"}
                  </Link>
                </div>
              </div>

              {isWebsites ? (
                <WebsiteHeroVideoFrame />
              ) : heroVisual ? (
                <div className="relative min-w-0">
                  <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(252,80,0,0.18),transparent_65%)] blur-2xl" aria-hidden />
                  <figure className="relative overflow-hidden rounded-[1.35rem] ring-1 ring-white/[0.1] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                    <div className="relative aspect-[16/11] w-full bg-[#121214]">
                      <SoftImg
                        src={heroVisual}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        decoding="async"
                        loading="eager"
                        fetchPriority="high"
                        fade
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                    </div>
                  </figure>
                </div>
              ) : null}
            </div>
          </Container>
        </section>

        {isWebsites ? (
          <WebsiteExamplesSection
            title={isRu ? "Примеры лендингов" : "Landing examples"}
            lead={
              isRu
                ? "Скролл-демо реальных посадочных: структура, ритм блоков и подача оффера — как это выглядит в движении."
                : "Scroll demos of real landings: structure, block rhythm and offer presentation — how it feels in motion."
            }
            demoLabel={isRu ? "Скролл-демо" : "Scroll demo"}
          />
        ) : null}

        {/* Features */}
        {copy.features?.length ? (
          <Section className="py-12 sm:py-16">
            <Container>
              <h2 className="text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em]">
                {copy.featuresTitle ?? (isRu ? "Что входит" : "What’s included")}
              </h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {copy.features.map((item, i) => (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition hover:border-white/[0.16] hover:bg-white/[0.045] sm:p-6"
                  >
                    <div className="mb-4 inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-2.5 text-[11px] font-bold text-[#ff8a4c]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/62">{item.text}</p>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b2c]/55 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </article>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        {/* Process */}
        <Section className="py-12 sm:py-16">
          <Container>
            <h2 className="text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em]">
              {copy.process.title}
            </h2>
            <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {copy.process.steps.map((step, i) => (
                <li
                  key={step}
                  className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-4 sm:p-5"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff8a4c]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[14.5px] font-medium leading-snug tracking-[-0.015em] text-white/88">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* Cases */}
        <Section className="py-12 sm:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em]">
                {copy.cases.title}
              </h2>
              <Link
                to={pathForLang("/projects", lang)}
                className="text-[13px] font-medium text-white/55 underline-offset-4 transition hover:text-white hover:underline"
              >
                {isRu ? "Все проекты" : "All projects"}
              </Link>
            </div>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.cases.items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={caseHref(item.href, lang)}
                    className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101012] transition hover:border-white/[0.18]"
                  >
                    {item.cover ? (
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#161618]">
                        <SoftImg
                          src={item.cover}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                    ) : null}
                    <div className="p-4 sm:p-5">
                      <p className="text-[16px] font-semibold tracking-[-0.02em]">{item.name}</p>
                      {item.blurb ? (
                        <p className="mt-1.5 text-[13.5px] leading-snug text-white/55">{item.blurb}</p>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Pricing */}
        <Section className="py-12 sm:py-16">
          <Container>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-white/[0.035] px-6 py-8 sm:px-10 sm:py-10">
              <div
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#fc5000]/18 blur-3xl"
                aria-hidden
              />
              <h2 className="relative text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em]">
                {copy.pricing.title}
              </h2>
              <p className="relative mt-4 max-w-3xl text-[15px] leading-7 text-white/70 sm:text-[16px]">
                {copy.pricing.body}
              </p>
              <div className="relative mt-7">
                <LeadCTAButton source={leadSource} variant="primary" size="lg">
                  {copy.cta}
                </LeadCTAButton>
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="py-12 sm:py-16">
          <Container>
            <h2 className="text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em]">FAQ</h2>
            <div className="mt-6 max-w-3xl divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {copy.faq.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none text-[15px] font-semibold tracking-[-0.015em] text-white/92 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {item.q}
                      <span className="mt-0.5 text-white/35 transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 pr-8 text-[14px] leading-7 text-white/60">{item.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <section className="pb-16 pt-4 sm:pb-20">
          <Container>
            <div className="relative overflow-hidden rounded-[1.6rem] bg-[#111113] px-6 py-10 text-center ring-1 ring-white/[0.1] sm:px-12 sm:py-14">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(70% 80% at 50% 0%, rgba(252,80,0,0.22), transparent 60%)",
                }}
              />
              <h2 className="relative mx-auto max-w-[20ch] text-[clamp(1.5rem,3.4vw,2.35rem)] font-[700] leading-[1.12] tracking-[-0.03em]">
                {copy.finalTitle ?? copy.h1}
              </h2>
              <p className="relative mx-auto mt-4 max-w-[34rem] text-[15px] leading-7 text-white/62">
                {copy.finalBody ?? copy.lead}
              </p>
              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                <LeadCTAButton source={leadSource} variant="primary" size="lg">
                  {copy.cta}
                </LeadCTAButton>
                <Link
                  to={pathForLang("/contacts", lang)}
                  className="inline-flex h-12 items-center justify-center rounded-full px-6 text-[14px] font-medium text-white/75 underline-offset-4 transition hover:text-white hover:underline"
                >
                  {isRu ? "Контакты" : "Contacts"}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
