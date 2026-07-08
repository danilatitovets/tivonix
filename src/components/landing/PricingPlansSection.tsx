import { useMemo, useState, type ReactNode } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import StartModal from "./StartModal";
import PricingFAQSection from "./PricingFAQSection";
import PricingPlanScopeGrid from "./PricingPlanScopeGrid";
import { useLang } from "../../i18n/LangProvider";
import { pricingCopy } from "../../i18n/pricingCopy";
import {
  COMPARISON_GROUPS,
  PLAN_IDS,
  PLANS,
  type ComparisonCell,
  type PlanId,
} from "../../lib/pricingData";
import { buildHelpPlanTelegramUrl, buildPricingPlanTelegramUrl } from "../../constants/links";

const COMPARE_LOGO = "/images/tivonix-logo-white.webp";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function PlanCtaButton({
  featured,
  compact,
  onClick,
  children,
  className,
}: {
  featured?: boolean;
  compact?: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex w-full items-center justify-center rounded-full border-0 font-bold tracking-[-0.015em] transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "active:scale-[0.98]",
        compact ? "h-9 text-[12px] sm:h-10 sm:text-[13px]" : "h-11 px-7 text-[14px]",
        featured ? "bg-[#FF9A3D] text-black hover:bg-[#FFB05C]" : "bg-white text-black hover:bg-white/92",
        className
      )}
    >
      {children}
    </button>
  );
}

function openPlanTelegram(planId: PlanId) {
  window.open(buildPricingPlanTelegramUrl(planId), "_blank", "noopener,noreferrer");
}

function ComparisonValue({
  cell,
  labels,
  textLabels,
}: {
  cell: ComparisonCell;
  labels: { yes: string; no: string; option: string; basic: string };
  textLabels: Record<string, string>;
}) {
  if (cell.kind === "yes") {
    return (
      <span className="inline-flex items-center justify-center text-[#FF9A3D]" aria-label={labels.yes}>
        <Check size={15} strokeWidth={2.25} aria-hidden />
      </span>
    );
  }

  if (cell.kind === "no") {
    return (
      <span className="text-white/28" aria-label={labels.no}>
        <Minus size={15} strokeWidth={1.75} aria-hidden />
      </span>
    );
  }

  const label =
    cell.kind === "text" && cell.textKey
      ? textLabels[cell.textKey]
      : labels[cell.kind];

  return <span className="text-[11px] font-medium text-white/50 sm:text-[12px]">{label}</span>;
}

function ComparePlanHead({
  planId,
  name,
  price,
  priceOriginal,
  cta,
  featured,
  onAction,
  layout,
}: {
  planId: PlanId;
  name: string;
  price: string;
  priceOriginal?: string;
  cta: string;
  featured?: boolean;
  onAction: () => void;
  layout: "column" | "card";
}) {
  const isCustom = planId === "custom";

  return (
    <div
      className={cx(
        layout === "column" ? "pricing-compare__plan-head" : "pricing-compare__mobile-plan",
        featured && "pricing-compare__plan-head--featured"
      )}
    >
      <span
        className={cx(
          "pricing-compare__plan-name font-hero font-semibold tracking-[-0.02em]",
          layout === "column" ? "text-[15px] sm:text-[16px]" : "text-[14px]",
          featured ? "text-[#FF9A3D]" : "text-white"
        )}
      >
        {name}
      </span>
      <span
        className={cx(
          "pricing-compare__plan-original text-[11px] font-medium",
          priceOriginal ? "text-white/35 line-through" : "text-transparent"
        )}
        aria-hidden={!priceOriginal}
      >
        {priceOriginal ?? "\u00A0"}
      </span>
      <span
        className={cx(
          "pricing-compare__plan-price font-hero font-semibold leading-none tracking-[-0.02em]",
          layout === "column" ? "text-[14px] sm:text-[15px]" : "text-[13px]",
          isCustom ? "text-white" : "text-[#FF9A3D]"
        )}
      >
        {price}
      </span>
      <div className="pricing-compare__plan-cta">
        <PlanCtaButton compact featured={featured} onClick={onAction} className="max-w-[148px]">
          {cta}
        </PlanCtaButton>
      </div>
    </div>
  );
}

function PlanPrice({ price, priceOriginal }: { price: string; priceOriginal?: string }) {
  const hasOriginal = Boolean(priceOriginal);

  return (
    <>
      <p
        className={cx(
          "pricing-plan-card__price-original text-[13px] font-medium leading-[1.125]",
          hasOriginal ? "text-white/38 line-through" : "text-transparent"
        )}
        aria-hidden={!hasOriginal}
      >
        {priceOriginal ?? "\u00A0"}
      </p>
      <p
        className={cx(
          "pricing-plan-card__price-value mt-1 font-hero text-[clamp(1.65rem,2.2vw,2rem)] font-semibold leading-[1.05] tracking-[-0.03em]",
          hasOriginal ? "text-[#FF9A3D]" : "text-white"
        )}
      >
        {price}
      </p>
    </>
  );
}

function CompactPlanPrice({ price, priceOriginal }: { price: string; priceOriginal?: string }) {
  if (!priceOriginal) {
    return <p className="mt-4 font-hero text-[1.45rem] font-semibold tracking-[-0.03em] text-white">{price}</p>;
  }

  return (
    <div className="mt-4">
      <p className="text-[12px] font-medium text-white/38 line-through">{priceOriginal}</p>
      <p className="mt-0.5 font-hero text-[1.45rem] font-semibold tracking-[-0.03em] text-[#FF9A3D]">{price}</p>
    </div>
  );
}

function PlanCard({
  planId,
  highlight,
  badge,
  name,
  tagline,
  price,
  priceOriginal,
  desc,
  includes,
  cta,
  onCta,
}: {
  planId: PlanId;
  highlight?: boolean;
  badge?: string;
  name: string;
  tagline: string;
  price: string;
  priceOriginal?: string;
  desc: string;
  includes: string[];
  cta: string;
  onCta: () => void;
}) {
  return (
    <article
      className={cx(
        "pricing-plan-card flex h-full flex-col",
        highlight && "pricing-plan-card--highlight",
        planId === "growth" && "pricing-plan-card--growth",
        planId === "product" && "pricing-plan-card--product"
      )}
    >
      <div className="pricing-plan-card__body flex flex-col p-5 sm:p-6">
        <div className="pricing-plan-card__head">
        <div className="pricing-plan-card__badge-slot">
          {badge ? (
            <span className="inline-flex w-fit whitespace-nowrap rounded-full bg-[#FF9A3D]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FF9A3D]">
              {badge}
            </span>
          ) : null}
        </div>

        <h3
          className={cx(
            "pricing-plan-card__name font-hero text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.03em]",
            planId === "growth" ? "text-[#FF9A3D]" : "text-white"
          )}
        >
          {name}
        </h3>
        <p
          className={cx(
            "pricing-plan-card__tagline mt-1 text-[13px] leading-[1.35]",
            planId === "growth" ? "text-[#FF9A3D]/80" : "text-white/48"
          )}
        >
          {tagline}
        </p>

        <div className="pricing-plan-card__price-slot">
          <PlanPrice price={price} priceOriginal={priceOriginal} />
        </div>

        <p className="pricing-plan-card__desc mt-4 text-[13px] leading-[1.6] text-white/52">{desc}</p>
        </div>

        <div className="pricing-plan-card__includes">
          <ul className="pricing-plan-card__includes-list space-y-2">
            {includes.map((item) => (
              <li key={item} className="pricing-plan-card__includes-item flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/68">
                <Check size={13} className="mt-0.5 shrink-0 text-[#FF9A3D]" strokeWidth={2.25} aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pricing-plan-card__spacer flex-1" aria-hidden />
      </div>

      <div className="pricing-plan-card__footer border-t border-white/[0.08] p-5 sm:p-6">
        <PlanCtaButton featured={planId === "growth"} onClick={onCta}>
          {cta}
        </PlanCtaButton>
      </div>
    </article>
  );
}

function CompactPlanCard({
  planId,
  name,
  shortDesc,
  price,
  priceOriginal,
  chips,
  compactCta,
  highlight,
  onCta,
}: {
  planId: PlanId;
  name: string;
  shortDesc: string;
  price: string;
  priceOriginal?: string;
  chips: string[];
  compactCta: string;
  highlight?: boolean;
  onCta: () => void;
}) {
  return (
    <article
      className={cx(
        "pricing-footer-card flex h-full flex-col",
        highlight && "pricing-footer-card--highlight",
        planId === "growth" && "pricing-footer-card--growth"
      )}
    >
      <div className="pricing-footer-card__body flex flex-col p-5 sm:p-6">
        <div className="pricing-footer-card__head">
        <h4 className="font-hero text-[1.1rem] font-semibold tracking-[-0.02em] text-white">{name}</h4>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/48">{shortDesc}</p>
        <div className="pricing-footer-card__price-slot">
          <CompactPlanPrice price={price} priceOriginal={priceOriginal} />
        </div>
        </div>
        <div className="pricing-footer-card__chips mt-auto pt-4">
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/[0.12] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/58"
            >
              {chip}
            </span>
          ))}
        </div>
        </div>
      </div>
      <div className="pricing-footer-card__footer border-t border-white/[0.08] p-5 sm:p-6">
        <PlanCtaButton featured={planId === "growth"} compact onClick={onCta}>
          {compactCta}
        </PlanCtaButton>
      </div>
    </article>
  );
}

export default function PricingPlansSection({ className }: { className?: string }) {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(COMPARISON_GROUPS.map((g) => [g.id, true]))
  );

  const openPlanModal = (planId: PlanId) => {
    setSelectedPlanId(planId);
    setModalOpen(true);
  };

  const closePlanModal = () => {
    setModalOpen(false);
    setSelectedPlanId(null);
  };
  const allExpanded = useMemo(
    () => COMPARISON_GROUPS.every((g) => openGroups[g.id]),
    [openGroups]
  );

  const toggleAll = () => {
    const next = !allExpanded;
    setOpenGroups(Object.fromEntries(COMPARISON_GROUPS.map((g) => [g.id, next])));
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlanCta = (planId: PlanId) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (plan?.ctaAction === "modal") openPlanModal(planId);
    else openPlanTelegram(planId);
  };

  return (
    <Section
      id="pricing"
      className={cx(
        "scroll-mt-[var(--tivonix-header-spacer)] bg-black py-10 sm:py-20 lg:py-24",
        className
      )}
    >
      <Container>
        <Reveal className="mx-auto max-w-[48rem] text-center">
          <h2 className="font-hero text-[clamp(1.85rem,4.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {copy.title}
          </h2>
          <div className="mx-auto mt-3 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 sm:mt-4">
            <span className="font-hero shrink-0 text-[clamp(1.85rem,3.8vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-[#FF9A3D]">
              {copy.launchDiscount.percent}
            </span>
            <span className="max-w-[42ch] text-center text-[11px] leading-snug text-[#FF9A3D]/72 sm:text-left sm:text-[12px]">
              {copy.launchDiscount.note}
            </span>
          </div>
        </Reveal>

        <Reveal delay={80} className="pricing-plans-grid mt-10 sm:mt-12">
          {PLANS.map((plan) => {
            const planCopy = copy.plans[plan.id];
            return (
              <PlanCard
                key={plan.id}
                planId={plan.id}
                highlight={plan.highlight}
                badge={plan.badgeKey ? copy.badges[plan.badgeKey] : undefined}
                name={planCopy.name}
                tagline={planCopy.tagline}
                price={planCopy.price}
                priceOriginal={planCopy.priceOriginal}
                desc={planCopy.desc}
                includes={planCopy.includes}
                cta={planCopy.cta}
                onCta={() => handlePlanCta(plan.id)}
              />
            );
          })}
        </Reveal>

        <Reveal delay={120} className="mt-10 sm:mt-12">
          <div className="pricing-compare">
            <div className="pricing-compare__intro">
              <h3 className="font-hero text-[clamp(1.35rem,2.8vw,1.85rem)] font-semibold tracking-[-0.03em] text-white">
                {copy.compareTitle}
              </h3>
              <button
                type="button"
                onClick={toggleAll}
                className="pricing-compare__toggle lg:hidden"
              >
                {allExpanded ? copy.collapseAll : copy.expandAll}
              </button>
            </div>

            <div className="pricing-compare__mobile-plans lg:hidden">
              <div className="pricing-compare__mobile-plans-scroll">
                {PLAN_IDS.map((id) => {
                  const planCopy = copy.plans[id];
                  const plan = PLANS.find((p) => p.id === id)!;
                  return (
                    <ComparePlanHead
                      key={`mobile-head-${id}`}
                      planId={id}
                      name={planCopy.name}
                      price={planCopy.price}
                      priceOriginal={planCopy.priceOriginal}
                      cta={planCopy.compactCta}
                      featured={plan.highlight}
                      onAction={() => handlePlanCta(id)}
                      layout="card"
                    />
                  );
                })}
              </div>
            </div>

            <div className="pricing-compare__desktop hidden lg:block">
              <div className="pricing-compare__head">
                <div className="pricing-compare__feature-col pricing-compare__feature-col--head">
                  <img
                    src={COMPARE_LOGO}
                    alt="TIVONIX"
                    className="pricing-compare__logo"
                    width={176}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {PLAN_IDS.map((id) => {
                  const planCopy = copy.plans[id];
                  const plan = PLANS.find((p) => p.id === id)!;
                  return (
                    <ComparePlanHead
                      key={`head-${id}`}
                      planId={id}
                      name={planCopy.name}
                      price={planCopy.price}
                      priceOriginal={planCopy.priceOriginal}
                      cta={planCopy.compactCta}
                      featured={plan.highlight}
                      onAction={() => handlePlanCta(id)}
                      layout="column"
                    />
                  );
                })}
              </div>

              {COMPARISON_GROUPS.map((group) => (
                <div key={group.id} className="pricing-compare__group">
                  <div className="pricing-compare__group-title">
                    {copy.groups[group.id as keyof typeof copy.groups]}
                  </div>
                  {group.rows.map((row) => (
                    <div key={row.id} className="pricing-compare__row">
                      <div className="pricing-compare__feature-col">
                        {copy.features[row.id as keyof typeof copy.features]}
                      </div>
                      {PLAN_IDS.map((planId) => (
                        <div
                          key={planId}
                          className={cx(
                            "pricing-compare__plan-col",
                            planId === "growth" && "pricing-compare__plan-col--growth"
                          )}
                        >
                          <ComparisonValue
                            cell={row.values[planId]}
                            labels={copy.cell}
                            textLabels={copy.cellText}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="pricing-compare__mobile lg:hidden">
              {COMPARISON_GROUPS.map((group) => {
                const open = openGroups[group.id];
                return (
                  <div key={group.id} className="pricing-compare__mobile-group">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      className="pricing-compare__mobile-group-btn"
                    >
                      <span>{copy.groups[group.id as keyof typeof copy.groups]}</span>
                      <ChevronDown
                        size={16}
                        className={cx("text-white/45 transition", open && "rotate-180")}
                        aria-hidden
                      />
                    </button>

                    {open ? (
                      <div className="pricing-compare__mobile-rows">
                        {group.rows.map((row) => (
                          <div key={row.id} className="pricing-compare__mobile-row">
                            <p className="pricing-compare__mobile-feature">
                              {copy.features[row.id as keyof typeof copy.features]}
                            </p>
                            <div className="pricing-compare__mobile-values">
                              {PLAN_IDS.map((planId) => (
                                <div key={planId} className="pricing-compare__mobile-value">
                                  <p className="pricing-compare__mobile-plan-label">{copy.plans[planId].name}</p>
                                  <ComparisonValue
                                    cell={row.values[planId]}
                                    labels={copy.cell}
                                    textLabels={copy.cellText}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-10 sm:mt-12">
          <div className="pricing-value-band">
            <div className="pricing-value-band__copy">
              <h3 className="font-hero text-[clamp(1.35rem,2.8vw,2rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
                {copy.footer.valueTitle}{" "}
                <span className="pricing-value-band__highlight">{copy.footer.valueTitleHighlight}</span>
              </h3>
              <p className="mt-2 text-[12px] text-white/38">{copy.footer.valueAside}</p>
              <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.65] text-white/50">{copy.footer.valueLead}</p>
            </div>
            <PricingPlanScopeGrid onPlanAction={handlePlanCta} />
          </div>
        </Reveal>

        <PricingFAQSection />

        <Reveal delay={170} className="mt-10 sm:mt-12">
          <div className="pricing-help-band">
            <a
              href={buildHelpPlanTelegramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-help-band__link"
            >
              {copy.footer.helpCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={180} className="pricing-footer-grid mt-0 hidden md:grid">
          {PLANS.map((plan) => {
            const planCopy = copy.plans[plan.id];
            return (
              <CompactPlanCard
                key={`footer-${plan.id}`}
                planId={plan.id}
                name={planCopy.name}
                shortDesc={copy.footer.shortDesc[plan.id]}
                price={planCopy.price}
                priceOriginal={planCopy.priceOriginal}
                chips={copy.footer.chips[plan.id]}
                compactCta={planCopy.compactCta}
                highlight={plan.highlight}
                onCta={() => handlePlanCta(plan.id)}
              />
            );
          })}
        </Reveal>
      </Container>

      <StartModal
        open={modalOpen}
        onClose={closePlanModal}
        selectedPlanId={selectedPlanId}
      />
    </Section>
  );
}
