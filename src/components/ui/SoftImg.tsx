import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Soft fade-in after decode to avoid empty flashes on slow mobile networks. */
  fade?: boolean;
};

/** Image with optional fade-in once loaded (helps perceived speed on mobile). */
export default function SoftImg({
  className,
  fade = true,
  onLoad,
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el?.complete && el.naturalWidth > 0) setReady(true);
  }, [rest.src]);

  return (
    <img
      {...rest}
      ref={ref}
      loading={loading}
      decoding={decoding}
      className={cx(
        className,
        fade && "transition-opacity duration-300 ease-out",
        fade && (ready ? "opacity-100" : "opacity-0")
      )}
      onLoad={(e) => {
        setReady(true);
        onLoad?.(e);
      }}
    />
  );
}
