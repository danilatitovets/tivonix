import type { CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLang, type Lang } from "../../i18n/LangProvider";
import { pathForLang } from "../../lib/localePaths";

const ORANGE_PILL =
  "bg-gradient-to-r from-[#FFD7B0] via-[#FF9A3D] to-[#FF6A1A] shadow-[0_6px_20px_rgba(255,107,44,0.2)]";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export default function LangToggle({
  compact,
  reducedMotion,
  variant = "header",
}: {
  compact?: boolean;
  reducedMotion?: boolean;
  variant?: "header" | "hero";
}) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const isHero = variant === "hero";

  const switchLang = (next: Lang) => {
    setLang(next);
    const target = pathForLang(location.pathname, next);
    if (target !== location.pathname) {
      navigate(`${target}${location.search}${location.hash}`, { replace: true });
    }
  };

  const label = lang === "ru" ? "Выбор языка" : "Language";
  const h = compact ? "h-9 w-[5.25rem]" : isHero ? "h-11 w-[6.5rem]" : "h-10 w-[5.75rem]";
  const text = compact ? "text-[11px]" : isHero ? "text-[13px]" : "text-xs";

  return (
    <div
      className={cx(
        "relative shrink-0 select-none rounded-full p-1",
        isHero
          ? "border border-white/35 bg-white/[0.10] backdrop-blur-md"
          : "border border-white/[0.08] bg-[#121212]",
        h
      )}
      role="radiogroup"
      aria-label={label}
      aria-orientation="horizontal"
    >
      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/2)] rounded-full",
          isHero ? "bg-[#FFFCF5] shadow-[0_4px_14px_rgba(0,0,0,0.18)]" : ORANGE_PILL,
          !reducedMotion && "transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]"
        )}
        style={
          {
            transform: lang === "en" ? "translateX(100%)" : "translateX(0)",
          } as CSSProperties
        }
      />
      <div className="relative z-10 grid h-full grid-cols-2">
        <button
          type="button"
          role="radio"
          aria-checked={lang === "ru"}
          onClick={() => switchLang("ru")}
          className={cx(
            "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            text,
            lang === "ru"
              ? "text-[#1A202C]"
              : isHero
                ? "text-white/70 hover:text-white/90"
                : "text-white/45 hover:text-white/72"
          )}
        >
          RU
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={lang === "en"}
          onClick={() => switchLang("en")}
          className={cx(
            "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
            "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            text,
            lang === "en"
              ? "text-[#1A202C]"
              : isHero
                ? "text-white/70 hover:text-white/90"
                : "text-white/45 hover:text-white/72"
          )}
        >
          EN
        </button>
      </div>
    </div>
  );
}
