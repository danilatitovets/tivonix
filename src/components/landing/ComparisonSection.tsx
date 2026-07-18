import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { pricingCopy } from "../../i18n/pricingCopy";
import { PLAN_IDS } from "../../lib/pricingData";

const COMPARE_SYSTEM_BG = "/images/ff11.png";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function useCompareGlobeScale(panelRef: RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(1.04);

  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1.1);
      return;
    }

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height + vh * 0.5);
      const scrolled = vh * 0.8 - rect.top;
      const progress = clamp01(scrolled / total);
      setScale(1.04 + progress * 0.3);
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [panelRef]);

  return scale;
}

export default function ComparisonSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const pricing = pricingCopy(lang);
  const isRu = lang === "ru";
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const globeScale = useCompareGlobeScale(centerPanelRef);

  return (
    <Section
      id="compare"
      className="compare-section-lift scroll-mt-[var(--tivonix-header-spacer)] bg-black !pb-8 !pt-6 sm:!pb-10 sm:!pt-8 lg:!pb-12 lg:!pt-10"
    >
      <Container>
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="text-[clamp(1.65rem,4vw,2.55rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white text-balance">
            {copy.compare.title}
          </h2>
          {copy.compare.subtitle ? (
            <p className="mx-auto mt-3 max-w-[40rem] text-[15px] leading-[1.55] tracking-normal text-white/48 sm:text-[16px]">
              {copy.compare.subtitle}
            </p>
          ) : null}
        </div>

        <div className="compare-split-wrap mt-6 sm:mt-7">
          <div className="compare-split__flow" aria-hidden>
            <div className="compare-split__flow-cell">
              <span className="compare-split__flow-dot">1</span>
            </div>
            <div className="compare-split__flow-cell">
              <span className="compare-split__flow-dot">2</span>
            </div>
            <div className="compare-split__flow-cell">
              <span className="compare-split__flow-dot">3</span>
            </div>
          </div>

          <div className="compare-split">
          <article className="compare-split__left compare-split__panel" aria-label={copy.compare.regular.title}>
            <div className="compare-split__left-inner">
              <p className="compare-split__label text-white/40">{copy.compare.regular.title}</p>
              <h3 className="compare-split__headline">{copy.compare.regular.headline}</h3>

              <div className="compare-manual" aria-label={isRu ? "Хаос после формы" : "Chaos after the form"}>
                <div className="compare-manual__simple">
                  <div className="compare-manual__col">
                    <p className="compare-manual__group">{isRu ? "На сайте" : "On the site"}</p>
                    <ul className="compare-manual__list">
                      {copy.compare.regular.items.map((item) => (
                        <li key={item} className="compare-manual__item compare-manual__item--ok">
                          <span className="compare-manual__dot" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="compare-manual__divider" aria-hidden />

                  <div className="compare-manual__col">
                    <p className="compare-manual__group compare-manual__group--warn">
                      {isRu ? "После отправки" : "After submit"}
                    </p>
                    <ul className="compare-manual__list">
                      {copy.compare.chaosTags.map((tag) => (
                        <li key={tag} className="compare-manual__item compare-manual__item--warn">
                          <span className="compare-manual__x" aria-hidden>
                            ×
                          </span>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="compare-manual__chaos" aria-hidden>
                  <div className="compare-manual__wires">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M22 18 C34 14, 42 16, 48 20" />
                      <path d="M68 18 C78 22, 84 28, 88 34" />
                      <path d="M18 28 C14 40, 14 48, 18 56" />
                      <path d="M28 58 C40 62, 48 58, 54 54" />
                      <path d="M62 52 C72 56, 80 58, 86 60" />
                      <path d="M22 66 C30 74, 36 80, 42 84" />
                      <path d="M58 68 C66 76, 72 82, 78 86" />
                      <path d="M52 28 C50 36, 48 42, 50 48" />
                      <path d="M88 42 C82 52, 76 62, 72 70" />
                    </svg>
                  </div>

                  <div className="compare-manual__chips">
                    <span className="compare-manual__chip compare-manual__chip--ok compare-manual__chip--a">
                      {copy.compare.regular.items[0]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--warn compare-manual__chip--b">
                      <span className="compare-manual__x" aria-hidden>×</span>
                      {copy.compare.chaosTags[0]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--ok compare-manual__chip--c">
                      {copy.compare.regular.items[1]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--warn compare-manual__chip--d">
                      <span className="compare-manual__x" aria-hidden>×</span>
                      {copy.compare.chaosTags[1]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--ok compare-manual__chip--e">
                      {copy.compare.regular.items[2]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--warn compare-manual__chip--f">
                      <span className="compare-manual__x" aria-hidden>×</span>
                      {copy.compare.chaosTags[2]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--ok compare-manual__chip--g">
                      {copy.compare.regular.items[3]}
                    </span>
                    <span className="compare-manual__chip compare-manual__chip--warn compare-manual__chip--h">
                      <span className="compare-manual__x" aria-hidden>×</span>
                      {copy.compare.chaosTags[3]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article
            ref={centerPanelRef}
            className={`compare-split__right compare-split__panel${globeScale > 1.12 ? " compare-split__right--zoomed" : ""}`}
            aria-label={copy.compare.tivonix.title}
          >
            <div
              className="compare-split__right-media"
              style={{ transform: `scale(${globeScale})` }}
              aria-hidden
            >
              <img
                src={COMPARE_SYSTEM_BG}
                alt=""
                className="compare-split__globe"
                loading="lazy"
                decoding="async"
              />
              <div className="compare-split__right-overlay" />
            </div>

            <div className="compare-split__right-inner">
              <p className="compare-split__label text-white/75">{copy.compare.tivonix.title}</p>
              <h3 className="compare-split__headline">{copy.compare.tivonix.headline}</h3>

              <ul className="compare-system-list">
                {copy.compare.tivonix.items.map((item, index) => (
                  <li key={item}>
                    <Check size={16} className="shrink-0 text-white" strokeWidth={2.5} aria-hidden />
                    <span className="compare-system-list__text">{item}</span>
                    {index === 1 ? (
                      <span className="compare-system-list__icons" aria-hidden>
                        <img src="/images/icons/telegram.svg" alt="" className="compare-system-list__icon" />
                        <img src="/images/icons/gmail.svg" alt="" className="compare-system-list__icon" />
                      </span>
                    ) : null}
                    {index === 2 ? (
                      <span className="compare-system-list__icons" aria-hidden>
                        <img src="/images/icons/excel.svg" alt="" className="compare-system-list__icon" />
                      </span>
                    ) : null}
                    {index === 5 ? (
                      <span className="compare-system-list__icons" aria-hidden>
                        <img src="/images/icons/google-ads.svg" alt="" className="compare-system-list__icon" />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>

              <div className="compare-split__badge mt-auto pt-6">
                {copy.compare.tivonix.badge}
              </div>
            </div>
          </article>

          <article
            id="services"
            className="compare-split__pricing compare-split__panel scroll-mt-[var(--tivonix-header-spacer)]"
            aria-label={copy.pricingTeaser.title}
          >
            <div className="compare-split__pricing-inner">
              <p className="compare-split__eyebrow compare-split__label">{copy.pricingTeaser.eyebrow}</p>
              <h3 className="compare-split__headline">{copy.pricingTeaser.title}</h3>

              <div className="compare-plans-teaser mt-5">
                {PLAN_IDS.map((id) => {
                  const plan = pricing.plans[id];
                  const badge =
                    id === "growth"
                      ? pricing.badges.popular
                      : id === "product"
                        ? pricing.badges.product
                        : null;
                  return (
                    <div
                      key={id}
                      className={`compare-plans-teaser__item${
                        id === "growth"
                          ? " compare-plans-teaser__item--highlight"
                          : id === "product"
                            ? " compare-plans-teaser__item--accent"
                            : ""
                      }`}
                    >
                      <div className="compare-plans-teaser__head">
                        <div className="compare-plans-teaser__names">
                          <span className="compare-plans-teaser__name">{plan.name}</span>
                          {badge ? <span className="compare-plans-teaser__badge">{badge}</span> : null}
                        </div>
                        <span className="compare-plans-teaser__price">{plan.price}</span>
                      </div>
                      <p className="compare-plans-teaser__tagline">{plan.tagline}</p>
                    </div>
                  );
                })}
              </div>

              <Link to="/plans" className="compare-pricing-teaser__more mt-auto pt-5 group">
                {copy.pricingTeaser.more}
                <ArrowUpRight
                  size={15}
                  className="inline-block transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </article>
          </div>
        </div>
      </Container>
    </Section>
  );
}
