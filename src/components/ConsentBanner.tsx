import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  onConsentChange,
  setAnalyticsConsent,
} from "../lib/consent";
import { hasAnalyticsConfigured } from "../config/siteConfig";
import { initAnalyticsAfterConsent } from "../lib/analyticsAdapter";
import { useLang } from "../i18n/LangProvider";
import { t3 } from "../i18n/pick";
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasAnalyticsConfigured()) {
      setVisible(false);
      return;
    }

    const sync = () => {
      setVisible(getAnalyticsConsent() === "pending");
    };

    sync();
    if (getAnalyticsConsent() === "accepted") {
      initAnalyticsAfterConsent();
    }

    return onConsentChange((state) => {
      if (state === "accepted") initAnalyticsAfterConsent();
      setVisible(state === "pending");
    });
  }, []);

  if (!visible || leadFormOpen) return null;

  const accept = () => {
    setAnalyticsConsent("accepted");
    initAnalyticsAfterConsent();
    setVisible(false);
  };

  const decline = () => {
    setAnalyticsConsent("rejected");
    setVisible(false);
  };

  const privacyHref = lang === "ru" ? PRIVACY_RU : PRIVACY_EN;
  const policyLabel = t3(lang, "Политика cookies", "Cookie Policy", "Cookie 政策");

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-start p-4 sm:p-6"
      style={{
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        role="dialog"
        aria-label={t3(
          lang,
          "Согласие на cookies аналитики",
          "Analytics cookies consent",
          "分析类 Cookie 同意"
        )}
        className="pointer-events-auto w-full max-w-[26rem] rounded-[2rem] border border-white/[0.08] bg-[#141414] p-7 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:p-8"
      >
        <p className="text-[15px] leading-[1.55] text-white/70">
          {t3(
            lang,
            "Мы используем cookies, чтобы сайт работал лучше. ",
            "We use cookies to make this site work better. ",
            "我们使用 Cookie 以改善网站体验。"
          )}
          <a
            href={privacyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/85 underline decoration-white/35 underline-offset-[3px] transition hover:text-white hover:decoration-white/60"
          >
            {policyLabel}
          </a>
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={accept}
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[14px] font-semibold tracking-[-0.01em] text-[#111] transition hover:bg-white/92 active:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55"
          >
            {t3(lang, "Принять", "Accept", "接受")}
          </button>
          <button
            type="button"
            onClick={decline}
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-transparent px-6 text-[14px] font-semibold tracking-[-0.01em] text-white/85 transition hover:border-white/40 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/55"
          >
            {t3(lang, "Отклонить", "Reject", "拒绝")}
          </button>
        </div>
      </div>
    </div>
  );
}
