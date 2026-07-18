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

  /* Hero — как PillNav на десктопе: без бордера, тёмный pill-бар */
  if (isHero) {
    const item = (code: Lang) => {
      const active = lang === code;
      return (
        <button
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => switchLang(code)}
          className={cx(
            "relative flex h-9 items-center justify-center rounded-full border-0 px-4 font-bold uppercase tracking-[0.12em] outline-none select-none transition duration-[260ms]",
            "text-[11px] focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
            active
              ? "bg-[#2c2c2c] text-white"
              : "bg-transparent text-white hover:bg-white/[0.06]"
          )}
        >
          <span className="leading-none">{code.toUpperCase()}</span>
        </button>
      );
    };

    return (
      <div
        className="relative inline-flex shrink-0 items-center gap-0.5 rounded-full border-0 bg-[#141414] p-1 select-none"
        role="radiogroup"
        aria-label={label}
        aria-orientation="horizontal"
      >
        {item("ru")}
        {item("en")}
      </div>
    );
  }

  const h = compact ? "h-9 w-[5.25rem]" : "h-10 w-[5.75rem]";
  const text = compact ? "text-[11px]" : "text-xs";

  return (
    <div
      className={cx(
        "relative shrink-0 select-none rounded-full border border-white/[0.08] bg-[#121212] p-1",
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
          ORANGE_PILL,
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
            lang === "ru" ? "text-[#1A202C]" : "text-white/45 hover:text-white/72"
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
            lang === "en" ? "text-[#1A202C]" : "text-white/45 hover:text-white/72"
          )}
        >
          EN
        </button>
      </div>
    </div>
  );
}
