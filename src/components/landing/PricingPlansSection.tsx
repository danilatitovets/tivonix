import { useMemo, useState, type ReactNode } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
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
import { useLeadForm } from "../leads/useLeadForm";
import { ctaClass } from "../leads/ctaStyles";

const COMPARE_LOGO = "/images/tivonix-logo-white.webp";
const EMBER = "#fc5000";
const PLANS_IMG = `/images/${encodeURIComponent("планы")}`;

const PLAN_IMAGES: Record<PlanId, string> = {
  start: `${PLANS_IMG}/1.webp`,
  growth: `${PLANS_IMG}/2.webp`,
  product: `${PLANS_IMG}/3.webp`,
  custom: `${PLANS_IMG}/4.webp`,
};

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
      className={ctaClass(
        featured ? "primary" : "white",
        compact ? "md" : "md",
        cx("w-full", compact && "h-9 text-[12px] sm:h-10 sm:text-[13px]", className)
      )}
    >
      {children}
    </button>
  );
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
      <span className="inline-flex items-center justify-center text-[var(--color-ember)]" aria-label={labels.yes}>
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

  return (
    <span className="font-sans text-[11px] font-medium text-white/50 sm:text-[12px]">{label}</span>
  );
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
          "pricing-compare__plan-name font-hero font-normal uppercase tracking-[0.02em]",
          layout === "column" ? "text-[15px] sm:text-[16px]" : "text-[14px]",
          featured ? "text-[var(--color-ember)]" : "text-white"
        )}
      >
        {name}
      </span>
      <span
        className={cx(
          "pricing-compare__plan-original font-sans text-[11px] font-medium",
          priceOriginal ? "text-white/35 line-through" : "text-transparent"
        )}
        aria-hidden={!priceOriginal}
      >
        {priceOriginal ?? "\u00A0"}
      </span>
      <span
        className={cx(
          "pricing-compare__plan-price font-hero font-normal leading-none tracking-[0.02em] normal-case",
          layout === "column" ? "text-[14px] sm:text-[15px]" : "text-[13px]",
          isCustom ? "text-white" : "text-[var(--color-ember)]"
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
  const match = price.match(/^(от|from)\s+(.+)$/i);
  const from = match?.[1];
  const amount = match?.[2];

  return (
    <div className="pricing-plan-card__price-block">
      <div
        className={cx(
          "pricing-plan-card__price-value",
          from && amount ? "pricing-plan-card__price-value--stack" : "pricing-plan-card__price-value--solo"
        )}
      >
        <p
          className={cx(
            "pricing-plan-card__price-original",
            hasOriginal ? "is-visible" : "is-empty"
          )}
          aria-hidden={!hasOriginal}
        >
          {priceOriginal ?? "\u00A0"}
        </p>
        {from && amount ? (
          <>
            <span className="pricing-plan-card__price-from">{from}</span>
            <span className="pricing-plan-card__price-amount">{amount}</span>
          </>
        ) : (
          <span className="pricing-plan-card__price-amount pricing-plan-card__price-amount--solo">
            {price}
          </span>
        )}
      </div>
    </div>
  );
}

function CompactPlanPrice({ price, priceOriginal }: { price: string; priceOriginal?: string }) {
  if (!priceOriginal) {
    return (
      <p className="mt-4 font-hero text-[1.55rem] font-normal tracking-[0.02em] text-white normal-case">
        {price}
      </p>
    );
  }

  return (
    <div className="mt-4">
      <p className="font-sans text-[12px] font-semibold text-white/75 line-through">{priceOriginal}</p>
      <p className="mt-0.5 font-hero text-[1.55rem] font-normal tracking-[0.02em] text-white normal-case">
        {price}
      </p>
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
        "pricing-plan-card",
        highlight && "pricing-plan-card--highlight",
        planId === "growth" && "pricing-plan-card--growth",
        planId === "product" && "pricing-plan-card--product"
      )}
    >
      <div className="pricing-plan-card__media" aria-hidden>
        <img
          src={PLAN_IMAGES[planId]}
          alt=""
          className="pricing-plan-card__bg"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pricing-plan-card__veil" aria-hidden />

      <div className="pricing-plan-card__body">
        <div className="pricing-plan-card__head">
          <div className="pricing-plan-card__badge-slot">
            {badge ? (
              <span className="pricing-plan-card__badge">{badge}</span>
            ) : (
              <span className="pricing-plan-card__badge is-empty" aria-hidden>
                &nbsp;
              </span>
            )}
          </div>

          <h3
            className={cx(
              "pricing-plan-card__name"
            )}
          >
            {name}
          </h3>
          <p className="pricing-plan-card__tagline">{tagline}</p>

          <div className="pricing-plan-card__price-slot">
            <PlanPrice price={price} priceOriginal={priceOriginal} />
          </div>
        </div>

        <div className="pricing-plan-card__details">
          <p className="pricing-plan-card__desc">{desc}</p>
          <ul className="pricing-plan-card__includes-list">
            {includes.map((item) => (
              <li key={item} className="pricing-plan-card__includes-item">
                <Check
                  size={13}
                  className="pricing-plan-card__check"
                  strokeWidth={2.25}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pricing-plan-card__footer">
            <PlanCtaButton featured={planId === "growth"} onClick={onCta}>
              {cta}
            </PlanCtaButton>
          </div>
        </div>
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
      <div className="pricing-footer-card__body flex flex-col p-6 sm:p-8">
        <div className="pricing-footer-card__head">
          <h4 className="font-hero text-[1.25rem] font-normal uppercase tracking-[0.02em] text-white">
            {name}
          </h4>
          <p className="mt-1.5 font-sans text-[12.5px] font-medium leading-relaxed text-white/48">
            {shortDesc}
          </p>
          <div className="pricing-footer-card__price-slot">
            <CompactPlanPrice price={price} priceOriginal={priceOriginal} />
          </div>
        </div>
        <div className="pricing-footer-card__chips mt-auto pt-4">
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="pricing-footer-card__chip">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pricing-footer-card__footer !pt-0 p-6 sm:p-8">
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
  const { openLeadForm } = useLeadForm();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(COMPARISON_GROUPS.map((g) => [g.id, true]))
  );
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
    openLeadForm("pricing", { planId });
  };

  const handleHelpCta = () => {
    openLeadForm("pricing_help");
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
          <h1 className="font-hero text-[clamp(2rem,5vw,3.25rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white text-balance">
            {copy.title}
          </h1>
          <div className="mx-auto mt-4 flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 sm:mt-5">
            <span
              className="font-hero shrink-0 text-[clamp(1.85rem,3.8vw,2.5rem)] font-normal uppercase leading-none tracking-[0.02em]"
              style={{ color: EMBER }}
            >
              {copy.launchDiscount.percent}
            </span>
            <span className="max-w-[42ch] text-center font-sans text-[12px] font-medium leading-snug text-[var(--color-ember)]/75 sm:text-left sm:text-[13px]">
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
              <h2 className="font-hero text-[clamp(1.5rem,3vw,2.1rem)] font-normal uppercase tracking-[0.02em] text-white">
                {copy.compareTitle}
              </h2>
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
                                  <p className="pricing-compare__mobile-plan-label">
                                    {copy.plans[planId].name}
                                  </p>
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
              <h3 className="font-hero text-[clamp(1.5rem,3vw,2.25rem)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white">
                {copy.footer.valueTitle}{" "}
                <span className="pricing-value-band__highlight">{copy.footer.valueTitleHighlight}</span>
              </h3>
              <p className="mt-2 font-sans text-[12px] font-medium text-white/38">
                {copy.footer.valueAside}
              </p>
              <p className="mt-5 max-w-[38ch] font-sans text-[14px] font-medium leading-[1.65] text-white/50">
                {copy.footer.valueLead}
              </p>
            </div>
            <PricingPlanScopeGrid onPlanAction={handlePlanCta} />
          </div>
        </Reveal>

        <PricingFAQSection />

        <Reveal delay={170} className="mt-10 sm:mt-12">
          <div className="pricing-help-band">
            <button
              type="button"
              onClick={handleHelpCta}
              className="pricing-help-band__link w-full cursor-pointer border-0 bg-transparent"
            >
              {copy.footer.helpCta}
            </button>
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
    </Section>
  );
}
