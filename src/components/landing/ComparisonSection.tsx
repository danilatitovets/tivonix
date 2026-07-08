import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Globe, Mail, Phone } from "lucide-react";
import type { IconType } from "react-icons";
import { SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";
import Container from "../ui/Container";
import Section from "../ui/Section";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { pricingCopy } from "../../i18n/pricingCopy";
import { PLAN_IDS, type PlanId } from "../../lib/pricingData";

const COMPARE_GLOBE = "/images/pain-bg-4.png";

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

type ChaosMessage = { channel: string; text: string; time: string };

function chaosChannelIcon(channel: string): { Icon: IconType | typeof Globe; color: string } {
  const key = channel.toLowerCase();
  if (key.includes("instagram")) return { Icon: SiInstagram, color: "#E4405F" };
  if (key.includes("telegram")) return { Icon: SiTelegram, color: "#2AABEE" };
  if (key.includes("whatsapp")) return { Icon: SiWhatsapp, color: "#25D366" };
  if (key.includes("звонок") || key.includes("call")) return { Icon: Phone, color: "#FF9A3D" };
  if (key.includes("email") || key.includes("почт")) return { Icon: Mail, color: "#93C5FD" };
  return { Icon: Globe, color: "#FFAE66" };
}
type CrmLead = {
  name: string;
  source: string;
  preview: string;
  time: string;
  status: string;
  tone: "new" | "progress" | "done" | "paid";
};
type CrmNav = { label: string; active?: boolean; count?: number };

function CompareCrmHover({
  title,
  sidebar,
  leadsTitle,
  leads,
}: {
  title: string;
  sidebar: CrmNav[];
  leadsTitle: string;
  leads: CrmLead[];
}) {
  return (
    <div className="compare-mini-crm">
      <div className="compare-mini-crm__topbar">
        <span className="compare-mini-crm__logo">{title}</span>
        <span className="compare-mini-crm__live" aria-hidden />
      </div>

      <div className="compare-mini-crm__layout">
        <nav className="compare-mini-crm__sidebar" aria-label={title}>
          {sidebar.map((item) => (
            <div
              key={item.label}
              className={`compare-mini-crm__nav${item.active ? " compare-mini-crm__nav--active" : ""}`}
            >
              <span>{item.label}</span>
              {item.count ? <span className="compare-mini-crm__nav-count">{item.count}</span> : null}
            </div>
          ))}
        </nav>

        <div className="compare-mini-crm__main">
          <div className="compare-mini-crm__main-head">
            <span>{leadsTitle}</span>
            <span className="compare-mini-crm__main-count">{leads.length}</span>
          </div>

          <div className="compare-mini-crm__leads">
            {leads.map((lead) => (
              <article key={`${lead.name}-${lead.preview}`} className="compare-mini-crm__lead">
                <div className="compare-mini-crm__lead-top">
                  <span className="compare-mini-crm__lead-name">{lead.name}</span>
                  <span className="compare-mini-crm__lead-time">{lead.time}</span>
                </div>
                <p className="compare-mini-crm__lead-preview">{lead.preview}</p>
                <div className="compare-mini-crm__lead-meta">
                  <span className="compare-mini-crm__lead-source">{lead.source}</span>
                  <span className={`compare-mini-crm__status compare-mini-crm__status--${lead.tone}`}>
                    {lead.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparePlansHover({
  title,
  plans,
  badges,
  moreLabel,
}: {
  title: string;
  plans: Record<PlanId, { name: string; tagline: string; price: string }>;
  badges: { popular: string; product: string };
  moreLabel: string;
}) {
  const highlightId: PlanId = "growth";

  return (
    <div className="compare-mini-plans">
      <p className="compare-mini-plans__title">{title}</p>

      <div className="compare-mini-plans__list">
        {PLAN_IDS.map((id) => {
          const plan = plans[id];
          const isHighlight = id === highlightId;
          const badge =
            id === "growth" ? badges.popular : id === "product" ? badges.product : null;

          return (
            <article
              key={id}
              className={`compare-mini-plans__item${isHighlight ? " compare-mini-plans__item--highlight" : ""}`}
            >
              <div className="compare-mini-plans__item-head">
                <div className="compare-mini-plans__item-names">
                  <span className="compare-mini-plans__name">{plan.name}</span>
                  {badge ? <span className="compare-mini-plans__badge">{badge}</span> : null}
                </div>
                <span className="compare-mini-plans__price">{plan.price}</span>
              </div>
              <p className="compare-mini-plans__tagline">{plan.tagline}</p>
            </article>
          );
        })}
      </div>

      <Link to="/plans" className="compare-mini-plans__more group">
        {moreLabel}
        <ArrowUpRight
          size={14}
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}

function CompareChaosMessage({ msg }: { msg: ChaosMessage }) {
  const { Icon, color } = chaosChannelIcon(msg.channel);
  return (
    <div className="compare-chaos-msg">
      <span className="compare-chaos-msg__icon" style={{ color }}>
        <Icon size={13} aria-hidden />
      </span>
      <div className="compare-chaos-msg__body">
        <div className="compare-chaos-msg__head">
          <span className="compare-chaos-msg__channel">{msg.channel}</span>
          <span className="compare-chaos-msg__time">{msg.time}</span>
        </div>
        <p className="compare-chaos-msg__text">{msg.text}</p>
      </div>
    </div>
  );
}

function CompareChaosHover({ messages, active }: { messages: ChaosMessage[]; active: boolean }) {
  const renderGroup = (suffix: string) =>
    messages.map((msg) => (
      <CompareChaosMessage key={`${suffix}-${msg.channel}-${msg.text}`} msg={msg} />
    ));

  return (
    <div
      className={`compare-chaos-stream${active ? " compare-chaos-stream--live" : ""}`}
      aria-hidden
    >
      <div className="compare-chaos-stream__track">
        <div className="compare-chaos-stream__group">{renderGroup("a")}</div>
        <div className="compare-chaos-stream__group">{renderGroup("b")}</div>
      </div>
    </div>
  );
}

export default function ComparisonSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const pricing = pricingCopy(lang);
  const crm = copy.compare.hover.crm;
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [pricingHover, setPricingHover] = useState(false);
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const globeScale = useCompareGlobeScale(centerPanelRef);

  return (
    <Section
      id="compare"
      className="compare-section-lift scroll-mt-[var(--tivonix-header-spacer)] bg-black !pb-8 !pt-6 sm:!pb-10 sm:!pt-8 lg:!pb-12 lg:!pt-10"
    >
      <Container>
        <div className="mx-auto max-w-[46rem] text-center">
          <h2 className="font-hero text-[clamp(1.65rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white text-balance">
            {copy.compare.title}
          </h2>
          {copy.compare.subtitle ? (
            <p className="mx-auto mt-3 max-w-[40rem] text-[15px] leading-[1.6] text-white/42 sm:text-[16px]">
              {copy.compare.subtitle}
            </p>
          ) : null}
        </div>

        <div className="compare-split mt-5 sm:mt-6">
          <div
            className={`compare-split__left compare-split__panel${leftHover ? " compare-split__panel--hovered" : ""}`}
            onMouseEnter={() => setLeftHover(true)}
            onMouseLeave={() => setLeftHover(false)}
            role="group"
            aria-label={copy.compare.regular.title}
          >
            <div className="compare-split__default compare-split__left-inner">
              <p className="compare-split__headline font-hero text-[clamp(1.5rem,3.2vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                {copy.compare.regular.headline}
              </p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/35">
                {copy.compare.regular.title}
              </p>

              <div className="compare-blocks-grid mt-6">
                {copy.compare.regular.items.map((item) => (
                  <div key={item} className="compare-block compare-block--muted">
                    {item}
                  </div>
                ))}
              </div>

              <div className="compare-blocks-grid mt-3">
                {copy.compare.chaosTags.map((tag) => (
                  <div key={tag} className="compare-block compare-block--warn">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="compare-split__hover compare-split__hover--chaos">
              <CompareChaosHover messages={copy.compare.hover.chaosMessages} active={leftHover} />
            </div>
          </div>

          <div
            ref={centerPanelRef}
            className={`compare-split__right compare-split__panel${rightHover ? " compare-split__panel--hovered" : ""}${globeScale > 1.12 ? " compare-split__right--zoomed" : ""}`}
            onMouseEnter={() => setRightHover(true)}
            onMouseLeave={() => setRightHover(false)}
            role="group"
            aria-label={copy.compare.tivonix.title}
          >
            <div
              className="compare-split__right-media"
              style={{ transform: `scale(${globeScale})` }}
              aria-hidden
            >
              <img
                src={COMPARE_GLOBE}
                alt=""
                className="compare-split__globe"
                loading="lazy"
                decoding="async"
              />
              <div className="compare-split__right-overlay" />
            </div>

            <div className="compare-split__default compare-split__right-inner">
              <p className="compare-split__headline font-hero text-[clamp(1.5rem,3.2vw,2.35rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                {copy.compare.tivonix.headline}
              </p>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/72">
                {copy.compare.tivonix.title}
              </p>

              <ul className="mt-6 hidden space-y-2.5 text-left sm:block">
                {copy.compare.tivonix.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[14px] text-white/92 sm:text-[15px]">
                    <Check size={14} className="mt-0.5 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="compare-split__badge mt-5 sm:mt-6">
                <Check size={14} strokeWidth={2.5} aria-hidden />
                <span className="text-pretty leading-[1.45]">{copy.compare.tivonix.badge}</span>
              </div>

              <ul className="compare-split__mobile-list mt-6 space-y-2.5 text-left sm:mt-5 sm:hidden">
                {copy.compare.tivonix.items.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-white/90">
                    <Check size={13} className="mt-0.5 shrink-0" strokeWidth={2.5} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="compare-split__hover compare-split__hover--crm">
              <CompareCrmHover
                title={crm.title}
                sidebar={crm.sidebar}
                leadsTitle={crm.leadsTitle}
                leads={crm.leads}
              />
            </div>
          </div>

          <div
            id="services"
            className={`compare-split__pricing compare-split__panel scroll-mt-[var(--tivonix-header-spacer)]${pricingHover ? " compare-split__panel--hovered" : ""}`}
            onMouseEnter={() => setPricingHover(true)}
            onMouseLeave={() => setPricingHover(false)}
            role="group"
            aria-label={copy.pricingTeaser.title}
          >
            <div className="compare-split__default compare-split__pricing-inner">
              <p className="compare-split__eyebrow">{copy.pricingTeaser.eyebrow}</p>
              <h3 className="compare-split__headline mt-3 font-hero text-[clamp(1.35rem,2.6vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                {copy.pricingTeaser.title}
              </h3>

              <ul className="compare-pricing-teaser mt-5">
                {PLAN_IDS.map((id) => (
                  <li key={id} className="compare-pricing-teaser__row">
                    <span className="compare-pricing-teaser__name">{pricing.plans[id].name}</span>
                    <span className="compare-pricing-teaser__price">{pricing.plans[id].price}</span>
                  </li>
                ))}
              </ul>

              <p className="compare-pricing-teaser__more mt-5">
                {copy.pricingTeaser.more}
                <ArrowUpRight size={15} className="inline-block" aria-hidden />
              </p>
            </div>

            <div className="compare-split__hover compare-split__hover--plans">
              <ComparePlansHover
                title={pricing.title}
                plans={pricing.plans}
                badges={pricing.badges}
                moreLabel={copy.pricingTeaser.more}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
