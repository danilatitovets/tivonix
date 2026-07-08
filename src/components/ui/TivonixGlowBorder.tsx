import type { ReactNode } from "react";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  className?: string;
  children: ReactNode;
};

/** Обёртка с радиусом. Свечение — внутри ai-premium-frame. */
export default function TivonixGlowBorder({ className, children }: Props) {
  return (
    <div className={cx("tivonix-glow-border", className)}>
      <div className="tivonix-glow-border__content relative min-h-0 flex-1">{children}</div>
    </div>
  );
}
