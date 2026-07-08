import React from "react";
import { LANDING_SHELL_CLASS } from "../../lib/landingLayout";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={[LANDING_SHELL_CLASS, className].filter(Boolean).join(" ")}>{children}</div>;
}
