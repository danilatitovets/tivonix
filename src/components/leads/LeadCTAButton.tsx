import { Plus } from "lucide-react";
import { ctaClass } from "./ctaStyles";
import type { CtaSource } from "../../lib/analytics";
import { useLeadForm } from "./useLeadForm";

type Props = {
  source: CtaSource;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "plain" | "white" | "cream";
  size?: "md" | "lg";
  className?: string;
  pillIcon?: "plus";
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
  pillIcon,
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
      className={ctaClass(variant, size, className, Boolean(pillIcon))}
      aria-label={ariaLabel}
    >
      {pillIcon ? (
        <>
          <span className="tivonix-cta-primary__label">{children}</span>
          <span className="tivonix-cta-primary__icon" aria-hidden="true">
            {pillIcon === "plus" ? <Plus className="tivonix-cta-primary__icon-svg" /> : null}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
