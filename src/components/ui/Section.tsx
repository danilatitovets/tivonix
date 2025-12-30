import React from "react";

export default function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={["py-14 sm:py-20", className].filter(Boolean).join(" ")}>
      {children}
    </section>
  );
}
