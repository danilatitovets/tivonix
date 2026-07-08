import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
};

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { transitionDelay: `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      className={[
        className,
        visible
          ? "translate-y-0 opacity-100 motion-safe:transition-[opacity,transform] motion-safe:duration-[0.55s] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
          : "translate-y-5 opacity-0",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
