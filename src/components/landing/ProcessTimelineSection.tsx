import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy, type ProcessStep } from "../../i18n/landingCopy";
import { LANDING_HEADLINE_CLASS } from "../../lib/landingLayout";

function stepDetail(step: ProcessStep): string {
  if (step.kind === "search") return step.hint ?? step.query;
  return step.items.slice(0, 2).join(" · ");
}

/** Лента времени: вертикальный рельс + шаги с деталями */
export default function ProcessTimelineSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const steps = copy.process.steps;
  const isRu = lang === "ru";

  return (
    <section
      id="process"
      className="scroll-mt-[var(--tivonix-header-spacer)] bg-black py-16 sm:py-20 lg:py-24"
      aria-labelledby="process-title"
    >
      <Container>
        <Reveal>
          <header className="mx-auto max-w-[40rem] text-center">
            <h2 id="process-title" className={`${LANDING_HEADLINE_CLASS} text-center`}>
              {copy.process.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[36rem] text-[15px] leading-[1.65] text-white/50 sm:mt-5 sm:text-[16px]">
              {isRu
                ? "От первой встречи до запуска — понятный путь без сюрпризов."
                : "From the first brief to launch — a clear path without surprises."}
            </p>
          </header>
        </Reveal>

        <ol className="relative mx-auto mt-12 max-w-[52rem] list-none sm:mt-14 lg:mt-16">
          {/* линия времени */}
          <span
            className="pointer-events-none absolute bottom-6 left-[18px] top-6 w-[2px] sm:left-[23px]"
            style={{
              background:
                "linear-gradient(180deg, #ff6b2c 0%, rgba(255,107,44,0.35) 28%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.04) 100%)",
            }}
            aria-hidden
          />

          {steps.map((step, index) => {
            const detail = stepDetail(step);
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} className={isLast ? "relative" : "relative pb-10 sm:pb-12"}>
                <Reveal delay={Math.min(index * 70, 280)}>
                  <div className="flex gap-4 sm:gap-6">
                    {/* точка */}
                    <div className="relative z-[1] flex w-9 shrink-0 flex-col items-center sm:w-12">
                      <span
                        className="grid h-9 w-9 place-items-center rounded-full bg-[#ff6b2c] font-hero text-[13px] font-bold tabular-nums text-white shadow-[0_0_0_6px_rgba(255,107,44,0.16)] sm:h-12 sm:w-12 sm:text-[15px]"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    </div>

                    {/* контент */}
                    <div className="min-w-0 flex-1 pt-1 sm:pt-2">
                      <p className="font-hero text-[clamp(1.15rem,2.4vw,1.45rem)] font-semibold leading-[1.25] tracking-[-0.025em] text-white">
                        {step.title}
                      </p>
                      {detail ? (
                        <p className="mt-2 max-w-[40rem] text-[14px] leading-[1.55] text-white/45 sm:mt-2.5 sm:text-[15px] sm:leading-[1.6]">
                          {detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
