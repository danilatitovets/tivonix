import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  onConsentChange,
  setAnalyticsConsent,
} from "../lib/consent";
import { initHotjar } from "../lib/hotjar";
import { useLang } from "../i18n/LangProvider";
import { useLeadForm } from "./leads/useLeadForm";

const PRIVACY_RU = "/doc/Политика_обработки_ПД_Tivonix_RU.pdf";
const PRIVACY_EN = "/doc/Privacy_Policy_Tivonix_EN.pdf";

/**
 * Floating analytics consent card (Hotjar) — dark, pill buttons.
 * Starts hidden (matches SSR); reads consent after mount. Hidden while lead form is open.
 */
export default function ConsentBanner() {
  const { lang } = useLang();
  const { isOpen: leadFormOpen } = useLeadForm();
  const isRu = lang === "ru";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      setVisible(getAnalyticsConsent() === "pending");
    };

    sync();
    if (getAnalyticsConsent() === "accepted") {
      initHotjar();
    }

    return onConsentChange((state) => {
      if (state === "accepted") initHotjar();
      setVisible(state === "pending");
    });
  }, []);

  if (!visible || leadFormOpen) return null;

  const accept = () => {
    setAnalyticsConsent("accepted");
    initHotjar();
    setVisible(false);
  };

  const decline = () => {
    setAnalyticsConsent("rejected");
    setVisible(false);
  };

  const privacyHref = isRu ? PRIVACY_RU : PRIVACY_EN;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-start p-4 sm:p-6"
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        role="dialog"
        aria-label={isRu ? "Согласие на cookies аналитики" : "Analytics cookies consent"}
        className="pointer-events-auto w-full max-w-[26rem] rounded-[2rem] border border-white/[0.08] bg-[#141414] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:p-8"
      >
        <p className="text-[15px] leading-[1.55] text-white/70">
          {isRu ? (
            <>
              Мы используем cookies, чтобы сайт работал лучше.{" "}
              <a
                href={privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 underline decoration-white/35 underline-offset-[3px] transition hover:text-white hover:decoration-white/60"
              >
                Политика cookies
              </a>
            </>
          ) : (
            <>
              We use cookies to make this site work better.{" "}
              <a
                href={privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 underline decoration-white/35 underline-offset-[3px] transition hover:text-white hover:decoration-white/60"
              >
                Cookie Policy
              </a>
            </>
          )}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={accept}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[14px] font-semibold tracking-[-0.01em] text-[#111] transition hover:bg-white/92 active:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55"
          >
            {isRu ? "Принять" : "Accept"}
          </button>
          <button
            type="button"
            onClick={decline}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-transparent px-6 text-[14px] font-semibold tracking-[-0.01em] text-white/85 transition hover:border-white/40 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55"
          >
            {isRu ? "Отклонить" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
