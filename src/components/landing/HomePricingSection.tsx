import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { pricingCopy } from "../../i18n/pricingCopy";
import type { PlanId } from "../../lib/pricingData";
import { useLeadForm } from "../leads/useLeadForm";
import { trackEvent } from "../../lib/analytics";
import { getStableViewportHeight } from "../../lib/stableViewport";
import { pathForLang } from "../../lib/localePaths";
import PlanBgVideo from "../ui/PlanBgVideo";
import type { PlanVideoId } from "../../lib/planMedia";

const GRID_PLANS: { id: PlanId; video: PlanVideoId; footRu: string; footEn: string }[] = [
  {
    id: "start",
    video: "start",
    footRu: "Быстрый старт под рекламу",
    footEn: "Fast launch for ads",
  },
  {
    id: "growth",
    video: "growth",
    footRu: "Чаще всего выбирают",
    footEn: "Most chosen plan",
  },
  {
    id: "product",
    video: "product",
    footRu: "Для веб-сервиса",
    footEn: "For a web service",
  },
  {
    id: "custom",
    video: "custom",
    footRu: "Под вашу логику",
    footEn: "Built around your logic",
  },
];

const PLAN_TAGS: Record<PlanId, { ru: string; en: string }> = {
  start: { ru: "Заявки", en: "Leads" },
  growth: { ru: "Система", en: "System" },
  product: { ru: "Продукт", en: "Product" },
  custom: { ru: "Масштаб", en: "Scale", zh: "定制" },
};

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function usePlanPhotoScale(sectionRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1.04);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1.12);
      return;
    }

    let raf = 0;
    let lastScale = 1.04;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = getStableViewportHeight();
      const total = Math.max(1, rect.height + vh * 0.45);
      const scrolled = vh * 0.75 - rect.top;
      const progress = clamp01(scrolled / total);
      const next = 1.04 + progress * 0.28;
      if (Math.abs(next - lastScale) < 0.004) return;
      lastScale = next;
      setScale(next);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
    };
  }, [sectionRef]);

  return scale;
}

function FeatureIcon() {
  return <Check className="home-plan-card__check h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />;
}

function HomePlanPrice({ price }: { price: string }) {
  const match = price.match(/^(от|from|起)\s+(.+)$/i);
  const from = match?.[1];
  const amount = match?.[2];

  return (
    <div className="home-plan-card__price-block">
      <div className="home-plan-card__price">
        {from && amount ? (
          <>
            <span className="home-plan-card__price-from">{from}</span>
            <span className="home-plan-card__price-amount">{amount}</span>
          </>
        ) : (
          <span className="home-plan-card__price-amount home-plan-card__price-amount--solo">{price}</span>
        )}
      </div>
    </div>
  );
}

export default function HomePricingSection() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const pricing = pricingCopy(lang);
  const extra = homeExtraCopy(lang);
  const { openLeadForm } = useLeadForm();
  const sectionRef = useRef<HTMLElement>(null);
  const photoScale = usePlanPhotoScale(sectionRef);

  const custom = pricing.plans.custom;
  const photoStyle = { "--plan-photo-scale": String(photoScale) } as CSSProperties;

  return (
    <Section
      id="pricing"
      ref={sectionRef}
      className="scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16 lg:!py-20"
      style={photoStyle}
    >
      <Container>
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <h2 className="font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance">
            {extra.homePricing.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[38rem] font-sans text-[14.5px] font-medium leading-[1.55] text-white/62">
            {extra.homePricing.note}
          </p>
        </Reveal>

        <div className="home-plan-grid mt-10">
          {GRID_PLANS.map(({ id, video, footRu, footEn }, i) => {
            const plan = pricing.plans[id];
            const popular = id === "growth";
            const tag = PLAN_TAGS[id][lang];
            const isCustom = id === "custom";

            return (
              <Reveal key={id} delay={i * 45} className="home-plan-grid__cell">
                <article
                  className={[
                    "home-plan-card",
                    popular ? "home-plan-card--popular" : "",
                  ].join(" ")}
                >
                  <div className="home-plan-card__media" aria-hidden>
                    <PlanBgVideo plan={video} className="home-plan-card__bg" />
                  </div>
                  <div className="home-plan-card__veil" aria-hidden />

                  <div className="home-plan-card__body">
                    <div className="home-plan-card__main">
                      <div className="home-plan-card__head">
                        <div className="home-plan-card__tag-row">
                          <span className="home-plan-card__tag">{tag}</span>
                          {popular ? (
                            <span className="home-plan-card__new">
                              {pricing.badges.popular}
                            </span>
                          ) : (
                            <span className="home-plan-card__new is-empty" aria-hidden>
                              &nbsp;
                            </span>
                          )}
                        </div>
                        <h3 className="home-plan-card__name">{plan.name}</h3>

                        <HomePlanPrice price={plan.price} />
                        <p className="home-plan-card__unit">{plan.tagline}</p>
                      </div>

                      <div className="home-plan-card__actions">
                        <Link
                          to={pathForLang("/plans", lang)}
                          className="home-plan-card__cta group"
                          onClick={() =>
                            trackEvent("pricing_cta_click", {
                              plan: id,
                              source: "home_more",
                            })
                          }
                        >
                          {extra.homePricing.more}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden
                          />
                        </Link>
                        {isCustom ? (
                          <p className="home-plan-card__fine">
                            {isRu
                              ? "Оценка после брифа"
                              : lang === "zh"
                                ? "简报后报价"
                                : "Quote after a brief"}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          className="home-plan-card__process"
                          onClick={() => {
                            trackEvent("pricing_cta_click", {
                              plan: id,
                              source: "home",
                            });
                            openLeadForm("pricing", { planId: id });
                          }}
                        >
                          {lang === "zh" ? "梳理我的流程" : isRu ? "Разобрать мой процесс" : "Map my process"}
                        </button>
                      </div>
                    </div>

                    <div className="home-plan-card__details">
                      <p className="home-plan-card__desc">{plan.desc}</p>
                      <ul className="home-plan-card__list">
                        {plan.includes.slice(0, 6).map((item) => (
                          <li key={item}>
                            <FeatureIcon />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="home-plan-card__foot">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                        {isRu ? footRu : footEn}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="mt-3">
          <article className="home-plan-enterprise">
            <div className="home-plan-enterprise__media" aria-hidden>
              <PlanBgVideo plan="enterprise" className="home-plan-enterprise__bg" />
            </div>
            <div className="home-plan-card__veil home-plan-card__veil--wide" aria-hidden />
            <div className="home-plan-enterprise__inner">
              <div className="home-plan-enterprise__copy">
                <span className="home-plan-card__tag">
                  {PLAN_TAGS.custom[lang]}
                </span>
                <h3 className="home-plan-enterprise__name">{custom.name}</h3>
                <p className="home-plan-enterprise__desc">{custom.desc}</p>
              </div>

              <ul className="home-plan-enterprise__list">
                {custom.includes.map((item) => (
                  <li key={item}>
                    <FeatureIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="home-plan-enterprise__action">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("pricing_cta_click", {
                      plan: "custom",
                      source: "home_enterprise",
                    });
                    openLeadForm("pricing", { planId: "custom" });
                  }}
                  className="home-plan-card__cta group"
                >
                  {extra.homePricing.ctas.custom}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}
