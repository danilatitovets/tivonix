import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-4 text-[16px] font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/15";
  const styles =
    variant === "primary"
      ? "text-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      : "bg-white/5 text-white border border-white/10 hover:bg-white/8";

  return (
    <button
      className={[
        base,
        styles,
        variant === "primary"
          ? "bg-[var(--g)]"
          : "",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
