import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type TextareaHTMLAttributes,
} from "react";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> & {
  minRows?: number;
  maxRows?: number;
  /** Visual tone — dark matches legacy MileSeal forms; light for white panels. */
  tone?: "dark" | "light";
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Auto-growing textarea — expands with content, no manual resize handle. */
export default function AutoGrowTextarea({
  minRows = 3,
  maxRows = 16,
  className,
  value,
  onChange,
  tone = "dark",
  ...rest
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const cs = window.getComputedStyle(el);
    const lineHeight = parseFloat(cs.lineHeight) || 22;
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    const minH = lineHeight * minRows + padY + borderY;
    const maxH = lineHeight * maxRows + padY + borderY;

    el.style.height = "0px";
    const next = Math.min(Math.max(el.scrollHeight, minH), maxH);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxH ? "auto" : "hidden";
  }, [minRows, maxRows]);

  useIsomorphicLayoutEffect(() => {
    resize();
  }, [value, resize]);

  useEffect(() => {
    const onWin = () => resize();
    window.addEventListener("resize", onWin);
    return () => window.removeEventListener("resize", onWin);
  }, [resize]);

  const toneClass =
    tone === "light"
      ? cx(
          "border-0 bg-[#f4f3f1] text-[#141414] placeholder:text-[#141414]/4",
          "outline-none focus:bg-[#efeeec] focus-visible:ring-2 focus-visible:ring-[#fc5000]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        )
      : cx(
          "border-0 bg-[#141414] text-white placeholder:text-white/35",
          "outline-none focus:bg-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-[#fc5000]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c]",
          "read-only:focus:bg-[#141414] read-only:focus-visible:ring-0"
        );

  return (
    <textarea
      {...rest}
      ref={ref}
      value={value}
      rows={minRows}
      onChange={(e) => {
        onChange?.(e);
        requestAnimationFrame(resize);
      }}
      className={cx(
        "block w-full resize-none overflow-hidden",
        "rounded-[16px] px-4 py-3.5",
        toneClass,
        "font-sans text-[14px] font-medium leading-[1.55] transition-[background-color]",
        className
      )}
    />
  );
}
