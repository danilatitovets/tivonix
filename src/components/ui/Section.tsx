import React from "react";

type SectionProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section({ id, className, style, children }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        style={style}
        className={["py-14 sm:py-20", className].filter(Boolean).join(" ")}
      >
        {children}
      </section>
    );
  }
);

export default Section;
