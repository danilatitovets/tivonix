import { Suspense, lazy, type CSSProperties } from "react";

const HeroWebGLBg = lazy(() => import("./HeroWebGLBg"));

export type SmokeMaskedIllustrationProps = {
  image: string;
  imageDir: string;
  title: string;
  smokeBase: string;
  orangeLayer: string;
  /** Обёртка с высотой (как у блока «Где бизнес теряет» или выше для таймлайна) */
  frameClassName?: string;
};

const DEFAULT_FRAME =
  "relative h-[13.5rem] overflow-hidden bg-black sm:h-[15rem] lg:h-[16.5rem]";

export default function SmokeMaskedIllustration({
  image,
  imageDir,
  title,
  smokeBase,
  orangeLayer,
  frameClassName = DEFAULT_FRAME,
}: SmokeMaskedIllustrationProps) {
  const smokeMask =
    "radial-gradient(ellipse 78% 72% at 50% 50%, #fff 0%, #fff 34%, rgba(255,255,255,0.62) 52%, rgba(255,255,255,0.22) 68%, transparent 82%)";

  return (
    <div className={frameClassName}>
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={
          {
            WebkitMaskImage: smokeMask,
            maskImage: smokeMask,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          } as CSSProperties
        }
      >
        <div className="absolute inset-[-20%] opacity-[0.92]" style={{ background: smokeBase }} />

        <div className="absolute inset-[-14%] z-[1] scale-[1.08] opacity-[0.76]">
          <Suspense fallback={null}>
            <HeroWebGLBg interactive={false} quality="low" />
          </Suspense>
        </div>

        <div
          className="absolute inset-[-12%] z-[2] opacity-[0.82]"
          style={{ background: orangeLayer }}
        />

        <div className="absolute inset-0 z-[3] bg-black/10" />
      </div>

      <img
        src={encodeURI(`${imageDir}/${image}`)}
        alt={title}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="relative z-[4] h-full w-full scale-[1.08] object-contain opacity-[0.96] mix-blend-screen"
      />

      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(0,0,0,0.98)_100%)]" />
    </div>
  );
}
