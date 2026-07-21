import { useEffect, useRef, useState, type RefObject } from "react";

/** True while element intersects the viewport (with optional rootMargin). */
export function useInView(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      setInView(Boolean(entry?.isIntersecting));
    }, options ?? { root: null, rootMargin: "80px 0px", threshold: 0 });

    io.observe(el);
    return () => io.disconnect();
  }, [ref, options?.rootMargin, options?.threshold]);

  return inView;
}
