import type { CSSProperties } from "react";

type Props = {
  visible: boolean;
  label?: string;
  /** light = on dark / photo backgrounds; dark = on light backgrounds */
  variant?: "light" | "dark";
  bare?: boolean;
  onActivate?: () => void;
  className?: string;
  style?: CSSProperties;
};

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** Scroll cue: classic mouse + wheel animation (no finger). */
export default function ScrollFingerHint({
  visible,
  label,
  variant = "light",
  bare: _bare = false,
  onActivate,
  className,
  style,
}: Props) {
  const isDark = variant === "dark";
  const ink = isDark ? "#1a1a1a" : "#ffffff";
  const accent = "#ff6b2c";

  const Tag = onActivate ? "button" : "div";

  return (
    <Tag
      type={onActivate ? "button" : undefined}
      onClick={onActivate}
      className={cx(
        "scroll-finger-hint",
        visible && "scroll-finger-hint--visible",
        isDark && "scroll-finger-hint--dark",
        className
      )}
      style={style}
      aria-hidden={!visible}
      aria-label={onActivate ? label ?? "Scroll down" : undefined}
      tabIndex={onActivate && visible ? 0 : -1}
    >
      <span className="scroll-finger-hint__icon" aria-hidden>
        <svg viewBox="0 0 28 44" width="28" height="44" fill="none">
          {/* Mouse body */}
          <rect
            x="2"
            y="1"
            width="24"
            height="40"
            rx="12"
            stroke={ink}
            strokeWidth="2"
          />
          {/* Wheel track */}
          <rect x="12" y="8" width="4" height="12" rx="2" stroke={ink} strokeWidth="1.5" opacity="0.55" />
          {/* Animated wheel */}
          <circle className="scroll-finger-hint__wheel" cx="14" cy="11" r="2" fill={accent} />
        </svg>
      </span>
      {label ? <span className="scroll-finger-hint__label">{label}</span> : null}
    </Tag>
  );
}
