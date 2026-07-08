import { useMemo } from "react";

import { Check, Loader2, Search } from "lucide-react";

import type { ProcessStep } from "../../i18n/landingCopy";



function smoothstep(t: number) {

  const x = Math.min(1, Math.max(0, t));

  return x * x * (3 - 2 * x);

}



function typewriterLength(progress: number, length: number) {

  return Math.floor(smoothstep(progress) * length);

}



type Props = {

  step: ProcessStep;

  stepProgress: number;

  fade: number;

  reducedMotion: boolean;

};



function ProcessBulletRow({

  label,

  state,

}: {

  label: string;

  state: "hidden" | "done" | "active";

}) {

  return (

    <li

      className={[

        "flex items-center justify-between gap-3 rounded-lg bg-white/[0.05] px-3 py-2.5 transition-colors duration-300 ease-out",

        state === "hidden" ? "invisible" : "visible",

        state === "active" ? "bg-white/[0.08]" : "",

      ].join(" ")}

      aria-hidden={state === "hidden"}

    >

      <span className="text-[12px] font-medium text-white/90">{label}</span>

      <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-[#FF5722]/90">

        {state === "active" ? (

          <Loader2 size={11} className="animate-spin text-[#FF5722]/90" aria-hidden />

        ) : (

          <Check

            size={11}

            className={state === "done" ? "text-[#FF5722]/75" : "text-white/35"}

            aria-hidden

          />

        )}

      </span>

    </li>

  );

}



export default function ProcessStepStage({

  step,

  stepProgress,

  fade,

  reducedMotion,

}: Props) {

  const stageStyle = useMemo(() => {

    if (reducedMotion || fade <= 0 || fade >= 1) return undefined;

    return {

      opacity: 0.35 + fade * 0.65,

      transform: `translate3d(0, ${(1 - fade) * 12}px, 0)`,

    };

  }, [fade, reducedMotion]);



  const typedQuery = useMemo(() => {

    if (step.kind !== "search") return "";

    if (reducedMotion) return step.query;

    return step.query.slice(0, typewriterLength(stepProgress, step.query.length));

  }, [reducedMotion, step, stepProgress]);



  const bulletStates = useMemo(() => {

    if (step.kind !== "bullets") return [];



    if (reducedMotion) {

      return step.items.map((_, index) =>

        index === step.items.length - 1 ? ("active" as const) : ("done" as const)

      );

    }



    const visibleBullets = Math.max(1, Math.ceil(smoothstep(stepProgress) * step.items.length));



    return step.items.map((_, index) => {

      if (index >= visibleBullets) return "hidden" as const;

      if (index < visibleBullets - 1) return "done" as const;

      return "active" as const;

    });

  }, [reducedMotion, step, stepProgress]);



  return (

    <div className="process-section__stage-inner" style={stageStyle} aria-live="polite">

      {step.kind === "bullets" ? (

        <article className="w-full min-w-0 max-w-md overflow-hidden rounded-2xl bg-[#141414] p-5 text-left sm:p-6">

          <ul className="space-y-1.5">

            {step.items.map((item, index) => (

              <ProcessBulletRow key={item} label={item} state={bulletStates[index] ?? "hidden"} />

            ))}

          </ul>



          <h3 className="mt-5 font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]">

            {step.title}

          </h3>

        </article>

      ) : null}



      {step.kind === "search" ? (

        <article className="w-full min-w-0 max-w-md overflow-hidden rounded-2xl bg-[#141414] p-5 text-left sm:p-6">

          <div className="rounded-xl bg-[#262626] p-3 sm:p-3.5">

            <div className="flex items-center gap-2.5 rounded-full bg-black/25 px-3 py-2.5 sm:px-3.5">

              <Search

                className="h-4 w-4 shrink-0 text-white/55"

                strokeWidth={2.25}

                aria-hidden

              />

              <span

                className="min-w-0 flex-1 truncate text-left text-[12px] leading-snug text-white/88 sm:text-[13px]"

                aria-hidden

              >

                {typedQuery}

                {!reducedMotion && typedQuery.length < step.query.length ? (

                  <span className="pain-cursor ml-0.5 inline-block text-[#FF9A3D]">|</span>

                ) : null}

              </span>

            </div>

          </div>



          <h3 className="mt-5 font-hero text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]">

            {step.title}

          </h3>



          {step.hint ? (

            <p className="mt-2 text-[13px] leading-[1.6] text-white/48 sm:text-[14px]">{step.hint}</p>

          ) : null}

        </article>

      ) : null}

    </div>

  );

}


