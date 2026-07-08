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
  const [openId, setOpenId] = useState<string | null>(copy.faq.items[0]?.id ?? null);

  return (
    <Reveal delay={160} className="mt-10 sm:mt-12">
      <div className="pricing-faq border border-white/[0.1] bg-black">
        <div className="border-b border-white/[0.08] px-4 py-4 sm:px-5">
          <h3 className="font-hero text-[1.15rem] font-semibold tracking-[-0.02em] text-white sm:text-[1.25rem]">
            {copy.faq.title}
          </h3>
        </div>

        <div>
          {copy.faq.items.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className={cx(
                  "border-b border-white/[0.08] last:border-b-0",
                  open && "bg-white/[0.035]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                  className={cx(
                    "flex w-full items-center justify-between gap-4 px-4 text-left sm:px-5",
                    open ? "pb-3 pt-4" : "py-4"
                  )}
                  aria-expanded={open}
                >
                  <span
                    className={cx(
                      "text-[14px] font-semibold",
                      open ? "text-white" : "text-white/92"
                    )}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cx(
                      "shrink-0 transition",
                      open ? "rotate-180 text-[#FF9A3D]" : "text-white/45"
                    )}
                    aria-hidden
                  />
                </button>
                {open ? (
                  <div className="px-4 pb-5 sm:px-5">
                    <p className="max-w-[62ch] border-l-2 border-[#FF9A3D]/55 pl-3.5 text-[14px] leading-[1.7] text-white/82">
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
