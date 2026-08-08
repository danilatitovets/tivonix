import type { CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLang, type Lang } from "../../i18n/LangProvider";
import { pathForLang } from "../../lib/localePaths";
import { t3 } from "../../i18n/pick";

const ORANGE_PILL =
  "bg-gradient-to-r from-[#FFD7B0] via-[#FF9A3D] to-[#FF6A1A] shadow-[0_6px_20px_rgba(255,107,44,0.2)]";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

const LANGS: Lang[] = ["ru", "en", "zh"];

function langLabel(code: Lang): string {
  if (code === "zh") return "中文";
  return code.toUpperCase();
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

  const label = t3(lang, "Выбор языка", "Language", "选择语言");
  const activeIndex = Math.max(0, LANGS.indexOf(lang));

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
            "relative flex items-center justify-center rounded-full border-0 font-bold outline-none select-none transition duration-[260ms]",
            compact
              ? "h-8 min-w-[2.35rem] px-1.5 text-[10px] tracking-[0.04em]"
              : "h-10 px-3 text-[11px] tracking-[0.08em]",
            "focus-visible:ring-2 focus-visible:ring-orange-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
            active
              ? "bg-[#2c2c2c] text-white"
              : "bg-transparent text-white hover:bg-white/[0.06]"
          )}
        >
          <span className="leading-none translate-y-[0.5px]">{langLabel(code)}</span>
        </button>
      );
    };

    return (
      <div
        className={cx(
          "relative inline-flex shrink-0 items-center rounded-full border-0 bg-[#141414] select-none",
          compact ? "gap-0 p-0.5" : "gap-0.5 p-1"
        )}
        role="radiogroup"
        aria-label={label}
        aria-orientation="horizontal"
      >
        {item("ru")}
        {item("en")}
        {item("zh")}
      </div>
    );
  }

  const h = compact ? "h-9 w-[7.75rem]" : "h-10 w-[8.5rem]";
  const text = compact ? "text-[10px]" : "text-[11px]";

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
          "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/3)] rounded-full",
          ORANGE_PILL,
          !reducedMotion && "transition-transform duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]"
        )}
        style={
          {
            transform: `translateX(${activeIndex * 100}%)`,
          } as CSSProperties
        }
      />
      <div className="relative z-10 grid h-full grid-cols-3">
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={lang === code}
            onClick={() => switchLang(code)}
            className={cx(
              "flex items-center justify-center rounded-full font-semibold tracking-wide outline-none",
              "focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              text,
              lang === code ? "text-[#1A202C]" : "text-white/45 hover:text-white/72"
            )}
          >
            {langLabel(code)}
          </button>
        ))}
      </div>
    </div>
  );
}
