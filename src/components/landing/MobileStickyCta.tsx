import { useEffect, useState } from "react";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { LeadCTAButton } from "../leads/LeadCTAButton";

/** Mobile fixed CTA — hides when final contact form is in view. */
export default function MobileStickyCta() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 767px)");
    const contact = document.getElementById("contact");

    const sync = () => {
      if (!mq.matches) {
        setVisible(false);
        return;
      }
      if (!contact) {
        setVisible(true);
        return;
      }
      const rect = contact.getBoundingClientRect();
      const inContact = rect.top < window.innerHeight * 0.72 && rect.bottom > 80;
      setVisible(!inContact);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    mq.addEventListener("change", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="pointer-events-auto mx-auto max-w-md">
        <LeadCTAButton
          source="mobile_sticky"
          variant="primary"
          size="lg"
          className="w-full shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
          aria-label={copy.mobileSticky.label}
        >
          {copy.mobileSticky.label}
        </LeadCTAButton>
      </div>
    </div>
  );
}
