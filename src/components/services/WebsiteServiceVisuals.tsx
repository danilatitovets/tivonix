import { useEffect, useRef, useState } from "react";
import BgLoopVideo from "../ui/BgLoopVideo";
import Container from "../ui/Container";
import { useKeepVideoPlaying } from "../../hooks/useKeepVideoPlaying";
import { WEBSITE_EXAMPLES } from "../../data/websiteExamples";

function cx(...a: Array<string | false | null | undefined>) {
  return a.filter(Boolean).join(" ");
}

/** Rounded frame with the same loop as the main landing hero. */
export function WebsiteHeroVideoFrame() {
  return (
    <div className="relative min-w-0">
      <div
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(252,80,0,0.18),transparent_65%)] blur-2xl"
        aria-hidden
      />
      <figure className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.14] bg-[#0c0c0e] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]">
        <div className="relative aspect-[16/11] w-full">
          <BgLoopVideo variant="hero" className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-white/[0.08]" />
        </div>
      </figure>
    </div>
  );
}

function ExampleCard({
  src,
  poster,
  index,
  label,
}: {
  src: string;
  poster: string;
  index: number;
  label: string;
}) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [srcArmed, setSrcArmed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      setSrcArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const on = Boolean(entry?.isIntersecting);
        setVisible(on);
        if (on) setSrcArmed(true);
      },
      { root: null, rootMargin: "12% 0px -8% 0px", threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useKeepVideoPlaying(videoRef, visible && srcArmed);

  return (
    <article
      ref={wrapRef}
      className={cx(
        "group transition duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
      style={{ transitionDelay: visible ? `${Math.min(index % 2, 1) * 80}ms` : "0ms" }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
          {label}
        </p>
        <span className="text-[11px] font-bold tabular-nums text-[#ff8a4c]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <figure className="relative overflow-hidden rounded-[1.25rem] border border-white/[0.12] bg-[#101012] shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.05]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {srcArmed ? (
            <video
              ref={videoRef}
              className={cx(
                "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
                ready ? "opacity-100" : "opacity-0"
              )}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              onPlaying={() => setReady(true)}
              onLoadedData={() => setReady(true)}
            />
          ) : null}
          <img
            src={poster}
            alt=""
            draggable={false}
            decoding="async"
            loading="lazy"
            className={cx(
              "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
              ready ? "opacity-0" : "opacity-100"
            )}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-inset ring-white/[0.08]" />
        </div>
      </figure>
    </article>
  );
}

type ExamplesProps = {
  title: string;
  lead: string;
  demoLabel?: string;
};

/** Scroll-reveal grid of landing scroll demos. */
export function WebsiteExamplesSection({ title, lead, demoLabel = "Scroll demo" }: ExamplesProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="max-w-[40rem]">
          <h2 className="text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em]">{title}</h2>
          <p className="mt-3 text-[15px] leading-7 text-white/60 sm:text-[16px]">{lead}</p>
        </div>
        <div className="mt-9 grid gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
          {WEBSITE_EXAMPLES.map((item, index) => (
            <ExampleCard
              key={item.id}
              src={item.src}
              poster={item.poster}
              index={index}
              label={demoLabel}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
