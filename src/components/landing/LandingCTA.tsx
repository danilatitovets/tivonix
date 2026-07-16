import type { ReactNode } from "react";
import { TG_BOT_URL } from "../../constants/links";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  variant?: "primary" | "secondary" | "ghost" | "plain" | "white" | "cream";
  size?: "md" | "lg";
  className?: string;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function TelegramLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href = TG_BOT_URL,
  onClick,
}: Omit<Props, "type">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaClass(variant, size, className)}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export function CalcButton({
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
}: Omit<Props, "href" | "type">) {
  return (
    <button type="button" onClick={onClick} className={ctaClass(variant, size, className)}>
      {children}
    </button>
  );
}

function ctaClass(variant: Props["variant"], size: Props["size"], className?: string) {
  const isSquare = variant === "plain";

  return cx(
    "inline-flex items-center justify-center font-bold tracking-[-0.015em] transition duration-200",
    isSquare ? "rounded-none shadow-none" : "rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9A3D]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "active:scale-[0.98]",
    size === "lg" ? "h-12 px-8 text-[15px] sm:h-[52px] sm:px-9 sm:text-[16px]" : "h-11 px-7 text-[14px] sm:px-8",
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

export function MicroTrust({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("text-[12.5px] leading-relaxed text-white/48 sm:text-[13px]", className)}>
      {children}
    </p>
  );
}
