import { Suspense, lazy, useEffect, useRef, useState } from "react";
import HeroLeadFlowAnimation from "./HeroLeadFlowAnimation";

const HeroWebGLBg = lazy(() => import("./HeroWebGLBg"));

const SMOKE_BASE =
  "radial-gradient(120% 90% at 55% 52%, rgba(255,154,61,0.22) 0%, rgba(255,106,26,0.12) 34%, rgba(0,0,0,0) 62%), #000000";

const ORANGE_LAYER =
  "linear-gradient(180deg,rgba(255,174,87,0.28)_0%,rgba(255,138,30,0.16)_42%,rgba(255,120,48,0.08)_72%,rgba(0,0,0,0)_100%)";

const FRAME_STYLES = `
  @keyframes smokeBlobDrift1 {
    0%, 100% { transform: translate(0%, 0%) scale(1); }
    33% { transform: translate(6%, -8%) scale(1.12); }
    66% { transform: translate(-5%, 5%) scale(0.94); }
  }
  @keyframes smokeBlobDrift2 {
    0%, 100% { transform: translate(0%, 0%) scale(1.05); }
    40% { transform: translate(-8%, 6%) scale(0.9); }
    70% { transform: translate(7%, -4%) scale(1.15); }
  }
  @keyframes smokeBlobDrift3 {
    0%, 100% { transform: translate(0%, 0%) scale(0.95); }
    50% { transform: translate(5%, 8%) scale(1.08); }
  }
  .smokeBlob1 { animation: smokeBlobDrift1 14s ease-in-out infinite; }
  .smokeBlob2 { animation: smokeBlobDrift2 18s ease-in-out infinite; }
  .smokeBlob3 { animation: smokeBlobDrift3 16s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) {
    .smokeBlob1, .smokeBlob2, .smokeBlob3 { animation: none !important; opacity: 0.7; }
  }
`;

function MeshBlobs({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="smokeBlob1 absolute -left-[12%] top-[2%] h-[58%] w-[48%] rounded-full opacity-70 blur-[72px]"
        style={{ background: "radial-gradient(circle, rgba(255,154,61,0.55) 0%, transparent 68%)" }}
      />
      <div
        className="smokeBlob2 absolute -right-[8%] top-[22%] h-[52%] w-[44%] rounded-full opacity-55 blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(255,106,26,0.5) 0%, transparent 70%)" }}
      />
      <div
        className="smokeBlob3 absolute bottom-[-18%] left-[22%] h-[50%] w-[42%] rounded-full opacity-45 blur-[76px]"
        style={{ background: "radial-gradient(circle, rgba(200,140,255,0.35) 0%, transparent 72%)" }}
      />
      <div
        className="smokeBlob2 absolute bottom-[-4%] right-[18%] h-[38%] w-[36%] rounded-full opacity-40 blur-[64px]"
        style={{ background: "radial-gradient(circle, rgba(100,200,255,0.28) 0%, transparent 70%)" }}
      />
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[4] opacity-[0.38] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        backgroundSize: "128px 128px",
      }}
      aria-hidden
    />
  );
}

function SmokeLayer({ active }: { active: boolean }) {
  if (!active) {
    return <div className="absolute inset-0 bg-black" style={{ background: SMOKE_BASE }} />;
  }

  return (
    <>
      <div className="absolute inset-0" style={{ background: SMOKE_BASE }} />
      <MeshBlobs active={active} />
      <div className="absolute inset-[-8%] scale-[1.04]">
        <Suspense fallback={null}>
          <HeroWebGLBg interactive quality="high" opaqueBuffer />
        </Suspense>
      </div>
      <div className="absolute inset-0 opacity-75" style={{ background: ORANGE_LAYER }} />
    </>
  );
}

export default function HeroSmokeFrame() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [smokeOn, setSmokeOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSmokeOn(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => setSmokeOn(!!entries[0]?.isIntersecting),
      { root: null, rootMargin: "80px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="heroSmokeFrame relative w-full overflow-hidden rounded-none bg-black">
      <style>{FRAME_STYLES}</style>

      <div className="relative aspect-[16/9] w-full">
        <div className="absolute inset-0 translate-y-[13%]">
          <SmokeLayer active={smokeOn} />
        </div>
        <GrainOverlay />

        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, transparent 32%)",
          }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[52%] min-h-[160px]"
          style={{
            background:
              "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.94) 22%, rgba(0,0,0,0.62) 48%, rgba(0,0,0,0.22) 72%, transparent 100%)",
          }}
          aria-hidden
        />

        {smokeOn && <HeroLeadFlowAnimation />}
      </div>
    </div>
  );
}
