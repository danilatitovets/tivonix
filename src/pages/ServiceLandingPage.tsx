import { Link, useLocation } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import {
  AutomationExamplesSection,
  AutomationPageBg,
  MvpExamplesSection,
  PortalExamplesSection,
  PortalPageBg,
  WebsiteExamplesSection,
  WebsitePageBg,
  WebsitePricingBg,
} from "../components/services/WebsiteServiceVisuals";
import { SEO } from "../components/SEO";
import { LeadCTAButton } from "../components/leads/LeadCTAButton";
import { useLang } from "../i18n/LangProvider";
import {
  servicePageCopy,
  servicePageIdFromPath,
  type ServicePageId,
} from "../i18n/servicePagesCopy";
import { pathForLang } from "../lib/localePaths";
import type { CtaSource } from "../lib/analytics";

type Props = { pageId?: ServicePageId };

export default function ServiceLandingPage({ pageId: pageIdProp }: Props) {
  const { lang } = useLang();
  const { pathname } = useLocation();
  const pageId = pageIdProp ?? servicePageIdFromPath(pathname);

  if (!pageId) {
    return null;
  }

  const copy = servicePageCopy(pageId, lang);
  const canonicalPath = pathname.replace(/\/+$/, "") || pathname;
  const leadSource = `service_${pageId}` as CtaSource;
  const isRu = lang !== "en";
  const isWebsites = pageId === "websites";
  const isMvp = pageId === "mvp";
  const isAutomation = pageId === "automation";
  const isPortal = pageId === "portal";
  const usePageBgVideo = isWebsites || isMvp || isAutomation || isPortal;

  return (
    <div className="landing-caldera service-landing min-h-screen overflow-x-clip bg-[#070607] font-sans text-white antialiased">
      <SEO
        title={copy.seo.title}
        description={copy.seo.description}
        canonicalPath={canonicalPath}
        ogLocalePrimary={lang === "zh" ? "zh_CN" : lang === "en" ? "en_US" : "ru_RU"}
        hreflang={
          pageId === "websites" ||
          pageId === "mvp" ||
          pageId === "automation" ||
          pageId === "portal"
        }
      />
      <Header />
      <main>
        {/* Hero — same centered layout for every service page */}
        <section className="relative min-h-[min(78vh,46rem)] pb-28 pt-[calc(var(--tivonix-header-spacer)+2rem)] sm:min-h-[min(82vh,52rem)] sm:pb-36 sm:pt-[calc(var(--tivonix-header-spacer)+2.75rem)]">
          {usePageBgVideo ? (
            isAutomation ? (
              <AutomationPageBg />
            ) : isPortal ? (
              <PortalPageBg />
            ) : (
              <WebsitePageBg />
            )
          ) : (
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 18%, rgba(252,80,0,0.18) 0%, rgba(252,80,0,0.05) 40%, transparent 68%), linear-gradient(180deg, #070607 0%, #0b0b0c 100%)",
              }}
            />
          )}
          <Container className="relative z-[1] flex min-h-[inherit] items-center">
            <div className="mx-auto flex w-full max-w-[42rem] flex-col items-center py-10 text-center sm:py-14">
              <h1 className="font-hero text-[clamp(2rem,5.2vw,3.35rem)] leading-[1.05] text-balance">
                {copy.h1}
              </h1>
              <p className="mt-5 font-sans text-[16px] font-medium leading-7 text-white/78 sm:text-[17px]">
                {copy.lead}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <LeadCTAButton
                  source={leadSource}
                  variant="primary"
                  size="lg"
                  pillIcon="plus"
                  className="min-w-[12.5rem] shadow-[0_12px_40px_rgba(255,107,44,0.28)]"
                >
                  {copy.cta}
                </LeadCTAButton>
              </div>
            </div>
          </Container>
        </section>

        {isWebsites ? (
          <WebsiteExamplesSection
            title={isRu ? "Примеры лендингов" : "Landing examples"}
            lead={
              isRu
                ? "Реальные посадочные в движении: структура, ритм блоков и подача оффера."
                : "Real landings in motion: structure, block rhythm, and how the offer is presented."
            }
          />
        ) : null}

        {isMvp ? (
          <MvpExamplesSection
            title={isRu ? "Примеры MVP" : "MVP examples"}
            lead={
              isRu
                ? "Рабочие сценарии продукта: вход, кабинет, роли и ключевой путь пользователя."
                : "Working product flows: auth, portal, roles and the primary user path."
            }
          />
        ) : null}

        {isAutomation ? (
          <AutomationExamplesSection
            title={isRu ? "Примеры автоматизации" : "Automation examples"}
            lead={
              isRu
                ? "Демо из MVP и живых проектов: заявки, статусы, кабинеты и рабочий контур."
                : "Demos from MVP and live projects: leads, statuses, portals and working flows."
            }
          />
        ) : null}

        {isPortal ? (
          <PortalExamplesSection
            title={isRu ? "Примеры кабинетов" : "Portal examples"}
            lead={
              isRu
                ? "Демо кабинетов в движении: роли, статусы, документы и рабочий контур."
                : "Portal demos in motion: roles, statuses, documents and the working flow."
            }
          />
        ) : null}

        {/* Features — borderless rows (same language as process); skipped when demos replace it */}
        {!isPortal && copy.features?.length ? (
          <Section className="py-12 sm:py-16">
            <Container>
              <h2 className="font-hero text-[clamp(1.45rem,3vw,2.1rem)]">
                {copy.featuresTitle ?? (isRu ? "Что входит" : "What’s included")}
              </h2>
              <ul className="mt-8 space-y-0">
                {copy.features.map((item) => (
                  <li
                    key={item.title}
                    className="grid gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-10 sm:py-7"
                  >
                    <h3 className="font-sans text-[clamp(1.05rem,2vw,1.3rem)] font-semibold leading-snug tracking-[-0.025em] text-white">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[15px] font-medium leading-7 text-white/62 sm:text-[16px]">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        ) : null}

        {/* Process */}
        <Section className="py-12 sm:py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-hero text-[clamp(1.45rem,3vw,2.1rem)]">
                {copy.process.title}
              </h2>
              <img
                src="/images/tivonix-logo-white.webp"
                alt="TIVONIX"
                width={148}
                height={32}
                className="hidden h-8 w-auto opacity-90 sm:block"
                decoding="async"
                loading="lazy"
              />
            </div>

            <ol className="mt-10 flex gap-0 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12">
              {copy.process.steps.map((step, i) => {
                const isLast = i === copy.process.steps.length - 1;
                return (
                  <li
                    key={step.title}
                    className="relative flex min-w-[11.5rem] flex-1 flex-col sm:min-w-0"
                  >
                    <div className="relative mb-5 flex h-4 items-center" aria-hidden>
                      <span className="relative z-[1] h-3.5 w-3.5 shrink-0 rounded-full bg-[#fc5000] shadow-[0_0_0_4px_rgba(252,80,0,0.18)]" />
                      {!isLast ? (
                        <span
                          className="absolute left-[1.05rem] right-0 top-1/2 h-px -translate-y-1/2"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, rgba(255,255,255,0.42) 0 5px, transparent 5px 10px)",
                          }}
                        />
                      ) : null}
                    </div>

                    <h3 className="pr-4 font-sans text-[clamp(0.98rem,1.6vw,1.2rem)] font-semibold leading-snug tracking-[-0.025em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[16rem] pr-4 font-sans text-[13.5px] font-medium leading-6 text-white/58 sm:text-[14.5px] sm:leading-7">
                      {step.text}
                    </p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 sm:hidden" aria-hidden>
              <div className="relative mx-auto h-1 w-full max-w-[12rem] overflow-hidden rounded-full bg-white/12">
                <span className="process-scroll-hint__thumb absolute inset-y-0 left-0 w-[38%] rounded-full bg-white/50" />
              </div>
              <p className="mt-2.5 text-center text-[11px] uppercase tracking-[0.14em] text-white/40">
                {isRu ? "Листайте вбок" : "Swipe sideways"}
              </p>
            </div>
          </Container>
        </Section>

        {/* Pricing */}
        <Section className="py-12 sm:py-16">
          <Container>
            {copy.pricing.plan ? (
              <div className="service-price-aurora-frame rounded-[calc(1.5rem+4px)] p-[3px]">
                <div className="rounded-[calc(1.5rem+1px)] bg-[#070607] p-px">
                  <div className="relative overflow-hidden rounded-[1.5rem] px-6 py-10 sm:px-10 sm:py-12">
                    <WebsitePricingBg />
                    <div className="relative z-[1] flex flex-col gap-10 sm:min-h-[16rem] sm:justify-between">
                      <div className="max-w-[32rem]">
                        <p className="font-hero text-[clamp(1.55rem,3.2vw,2.25rem)] text-white">
                          {copy.pricing.title}
                        </p>
                        <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
                          {copy.pricing.plan.priceNote ? (
                            <span className="pb-2.5 font-sans text-[15px] font-medium text-black">
                              {copy.pricing.plan.priceNote}
                            </span>
                          ) : null}
                          <span className="font-hero text-[clamp(3.6rem,10vw,5.5rem)] leading-none tracking-[-0.045em] text-black">
                            {copy.pricing.plan.price}
                          </span>
                        </div>
                        <h2 className="mt-4 font-sans text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.025em] text-black">
                          {copy.pricing.plan.name}
                        </h2>
                        <p className="mt-1 font-sans text-[15px] font-medium text-black/60 sm:text-[16px]">
                          {copy.pricing.plan.tagline}
                        </p>
                        {copy.pricing.plan.includes.length ? (
                          <ul className="mt-5 space-y-2">
                            {copy.pricing.plan.includes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 font-sans text-[14px] font-medium leading-snug text-black sm:text-[15px]"
                              >
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fc5000]"
                                  aria-hidden
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-3">
                        <Link
                          to={pathForLang("/plans", lang)}
                          className="font-sans text-[14px] font-medium text-black/70 underline decoration-black/25 underline-offset-[3px] transition hover:text-black hover:decoration-black/55"
                        >
                          {isRu ? "Что входит в тариф" : "What’s included"}
                        </Link>
                        <LeadCTAButton
                          source={leadSource}
                          variant="primary"
                          size="lg"
                          pillIcon="arrow"
                          className="min-w-[12.5rem] shadow-[0_12px_40px_rgba(255,107,44,0.28)]"
                        >
                          {copy.cta}
                        </LeadCTAButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.03] px-6 py-8 sm:min-h-[14rem] sm:px-10 sm:py-10">
                <div className="relative z-[1] flex min-h-[inherit] flex-col gap-6">
                  <div className="max-w-3xl">
                    <h2 className="font-hero text-[clamp(1.45rem,3vw,2.1rem)]">
                      {copy.pricing.title}
                    </h2>
                    <p className="mt-4 font-sans text-[15px] font-medium leading-7 text-white/70 sm:text-[16px]">
                      {copy.pricing.body}
                    </p>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <LeadCTAButton
                      source={leadSource}
                      variant="primary"
                      size="lg"
                      pillIcon="arrow"
                      className="min-w-[12.5rem] shadow-[0_12px_40px_rgba(255,107,44,0.28)]"
                    >
                      {copy.cta}
                    </LeadCTAButton>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-hero text-[clamp(1.45rem,3vw,2.1rem)]">FAQ</h2>
              <div className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08] text-left">
                {copy.faq.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary className="cursor-pointer list-none font-sans text-[15px] font-semibold tracking-[-0.015em] text-white/92 marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-4 text-left">
                        {item.q}
                        <span className="mt-0.5 shrink-0 text-white/35 transition group-open:rotate-45">
                          +
                        </span>
                      </span>
                    </summary>
                    <p className="mt-3 pr-8 text-left font-sans text-[14px] font-medium leading-7 text-white/60">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
