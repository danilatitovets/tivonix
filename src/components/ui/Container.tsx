import React from "react";
import { LANDING_SHELL_CLASS } from "../../lib/landingLayout";

const Container = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
  }
>(function Container({ children, className }, ref) {
  return (
    <div
      ref={ref}
      className={[LANDING_SHELL_CLASS, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
});

export default Container;
