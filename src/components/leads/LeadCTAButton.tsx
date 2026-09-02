import { ctaClass } from "./ctaStyles";
import type { CtaSource } from "../../lib/analytics";
import { useLeadForm } from "./useLeadForm";

type Props = {
  source: CtaSource;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "plain" | "white" | "cream";
  size?: "md" | "lg";
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
  tabIndex?: number;
};

export function LeadCTAButton({
  source,
  children,
  variant = "primary",
  size = "md",
  className,
  "aria-label": ariaLabel,
  onClick,
  tabIndex,
}: Props) {
  const { openLeadForm } = useLeadForm();

  return (
    <button
      type="button"
      tabIndex={tabIndex}
      onClick={() => {
        onClick?.();
        openLeadForm(source);
      }}
      className={ctaClass(variant, size, className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
