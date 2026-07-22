import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { pricingCopy } from "../../i18n/pricingCopy";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function PricingFAQSection() {
  const { lang } = useLang();
  const copy = pricingCopy(lang);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Reveal delay={160} className="mt-10 sm:mt-12">
      <div className="pricing-faq">
        <div className="pricing-faq__head">
          <h3 className="font-hero text-[clamp(1.35rem,2.8vw,1.75rem)] font-normal uppercase tracking-[0.02em] text-white">
            {copy.faq.title}
          </h3>
        </div>

        <div>
          {copy.faq.items.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className={cx("pricing-faq__item", open && "pricing-faq__item--open")}
              >
                <button
                  type="button"
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                  className={cx(
                    "flex w-full items-center justify-between gap-4 px-5 text-left sm:px-8",
                    open ? "pb-3 pt-5" : "py-5"
                  )}
                  aria-expanded={open}
                >
                  <span
                    className={cx(
                      "font-sans text-[14px] font-medium sm:text-[15px]",
                      open ? "text-white" : "text-white/88"
                    )}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cx(
                      "shrink-0 transition",
                      open ? "rotate-180 text-[var(--color-ember)]" : "text-white/45"
                    )}
                    aria-hidden
                  />
                </button>
                {open ? (
                  <div className="px-5 pb-6 sm:px-8">
                    <p className="pricing-faq__answer max-w-[62ch] font-sans text-[14px] font-medium leading-[1.7] text-white/72">
                      {item.a}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
