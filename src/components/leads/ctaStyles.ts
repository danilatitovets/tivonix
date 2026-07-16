function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

export function ctaClass(
  variant: "primary" | "secondary" | "ghost" | "plain" | "white" | "cream" | undefined,
  size: "md" | "lg" | undefined,
  className?: string
) {
  const isSquare = variant === "plain";

  return cx(
    "inline-flex items-center justify-center font-bold tracking-[-0.015em] transition duration-200",
    isSquare ? "rounded-none shadow-none" : "rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "active:scale-[0.98]",
    size === "lg"
      ? "h-12 px-8 text-[15px] sm:h-[52px] sm:px-9 sm:text-[16px]"
      : "h-11 px-7 text-[14px] sm:px-8",
    (variant === "primary" || variant === "cream") && "tivonix-cta-primary",
    variant === "secondary" && "tivonix-cta-secondary",
    variant === "ghost" && "text-white/75 hover:text-white",
    variant === "plain" &&
      "border-0 bg-transparent font-semibold text-white/88 hover:bg-white/[0.04] hover:text-white",
    variant === "white" &&
      "border-0 bg-white font-bold text-black shadow-none hover:bg-white/92",
    className
  );
}
