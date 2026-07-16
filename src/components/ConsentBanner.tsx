import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  onConsentChange,
  setAnalyticsConsent,
} from "../lib/consent";
import { initHotjar } from "../lib/hotjar";
import { useLang } from "../i18n/LangProvider";

/**
 * Full-bleed analytics consent bar (Hotjar).
 * Primary action is accept; decline is a quiet text control only.
 */
export default function ConsentBanner() {
  const { lang } = useLang();
  const isRu = lang === "ru";
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return getAnalyticsConsent() === "pending";
  });

  useEffect(() => {
    if (getAnalyticsConsent() === "accepted") {
      initHotjar();
    }
    return onConsentChange((s) => {
      if (s === "accepted") initHotjar();
      setVisible(s === "pending");
    });
  }, []);

  if (!visible) return null;

  const accept = () => {
    setAnalyticsConsent("accepted");
    initHotjar();
    setVisible(false);
  };

  const decline = () => {
    setAnalyticsConsent("rejected");
    setVisible(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60]"
      role="dialog"
      aria-label={isRu ? "Согласие на cookies аналитики" : "Analytics cookies consent"}
    >
      <div
        className="w-full border-0 bg-[#2B2B2B]"
        style={{
          paddingBottom: "max(0.85rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* brand accent line */}
        <div
          aria-hidden
          className="h-[2px] w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,160,70,0) 0%, rgba(255,215,176,0.95) 18%, rgba(255,154,61,1) 50%, rgba(255,106,26,0.95) 82%, rgba(255,160,70,0) 100%)",
          }}
        />

        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-4 pt-3.5 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:pt-4">
          <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
            <span
              aria-hidden
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] sm:mt-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="8.25" stroke="#FF9A3D" strokeWidth="1.7" />
                <circle cx="9.2" cy="10.2" r="1.15" fill="#FF9A3D" />
                <circle cx="13.6" cy="8.8" r="0.95" fill="#FFB36A" />
                <circle cx="14.2" cy="13.4" r="1.1" fill="#FF9A3D" />
              </svg>
            </span>

            <p className="min-w-0 text-[12.5px] leading-relaxed text-white/72 sm:text-[13.5px]">
              {isRu ? (
                <>
                  Используем аналитику (Hotjar), чтобы улучшать сайт.{" "}
                  <span className="text-white/48">
                    Поля заявки в записи не попадают.
                  </span>
                </>
              ) : (
                <>
                  We use analytics (Hotjar) to improve the site.{" "}
                  <span className="text-white/48">
                    Form fields are not captured in recordings.
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={decline}
              className="order-2 text-[12px] font-medium text-white/40 underline decoration-white/15 underline-offset-4 transition hover:text-white/60 sm:order-1"
            >
              {isRu ? "Только необходимые" : "Essential only"}
            </button>

            <button
              type="button"
              onClick={accept}
              className="order-1 h-11 flex-1 rounded-full px-7 text-[14px] font-bold tracking-[-0.015em] text-black transition hover:brightness-[1.04] active:brightness-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 sm:order-2 sm:flex-none"
              style={{
                background:
                  "linear-gradient(90deg, #FFD7B0 0%, #FF9A3D 45%, #FF6A1A 100%)",
              }}
            >
              {isRu ? "Принять" : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
