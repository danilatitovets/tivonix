import { PLAN_IDS, PLANS, type PlanId } from "../../lib/pricingData";
import { pricingCopy } from "../../i18n/pricingCopy";
import { useLang } from "../../i18n/LangProvider";

const SCOPE_LEVEL: Record<PlanId, number> = {
  start: 2,
  growth: 4,
  product: 6,
  custom: 8,
};

const SEGMENTS = 8;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function PricingPlanScopeGrid({ onPlanAction }: { onPlanAction: (planId: PlanId) => void }) {
  const { lang } = useLang();
  const copy = pricingCopy(lang);

  return (
    <div className="pricing-plan-scope">
      <p className="pricing-plan-scope__caption">{copy.footer.planScopeCaption}</p>
      <div className="pricing-plan-scope__grid">
        {PLAN_IDS.map((planId) => {
          const plan = PLANS.find((p) => p.id === planId)!;
          const planCopy = copy.plans[planId];
          const filled = SCOPE_LEVEL[planId];
          const isGrowth = plan.highlight;

          return (
            <button
              key={planId}
              type="button"
              onClick={() => onPlanAction(planId)}
              className={cx(
                "pricing-plan-scope__col",
                isGrowth && "pricing-plan-scope__col--growth"
              )}
            >
              <div className="pricing-plan-scope__head">
                <span
                  className={cx(
                    "pricing-plan-scope__name font-hero font-normal uppercase tracking-[0.02em]",
                    isGrowth ? "text-[var(--color-ember)]" : "text-white"
                  )}
                >
                  {planCopy.name}
                </span>
                <span
                  className={cx(
                    "pricing-plan-scope__price-old font-sans text-[10px] font-medium line-through",
                    planCopy.priceOriginal ? "text-white/35" : "text-transparent"
                  )}
                  aria-hidden={!planCopy.priceOriginal}
                >
                  {planCopy.priceOriginal ?? "\u00A0"}
                </span>
                <span className="pricing-plan-scope__price font-hero text-[13px] font-normal tracking-[0.02em] text-[var(--color-ember)] normal-case">
                  {planCopy.price}
                </span>
              </div>
              <div className="pricing-plan-scope__bars" aria-hidden>
                {Array.from({ length: SEGMENTS }).map((_, index) => {
                  const on = index < filled;
                  return (
                    <span
                      key={index}
                      className={cx("pricing-plan-scope__bar", on && "pricing-plan-scope__bar--on")}
                    />
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
