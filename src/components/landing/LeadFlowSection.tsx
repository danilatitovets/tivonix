import { Check } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { landingCopy } from "../../i18n/landingCopy";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { FlowIllustration, type FlowVariant } from "./FlowIllustrations";

const FLOW_VARIANTS: FlowVariant[] = ["lead", "telegram", "crm", "status", "result"];

function FlowRibbonStep({
  index,
  label,
  title,
  desc,
  variant,
  isLast,
  showTag,
}: {
  index: number;
  label: string;
  title: string;
  desc: string;
  variant: FlowVariant;
  isLast: boolean;
  showTag: boolean;
}) {
  const stepNum = String(index + 1).padStart(2, "0");

  return (
    <article className="flow-ribbon__step relative flex min-w-0 flex-col bg-black">
      <div className="flow-ribbon__track px-4 pt-5 sm:px-5 sm:pt-6">
        <div className="flow-ribbon__node-row flex items-center gap-3">
          {index > 0 ? (
            <span className="flow-ribbon__line flow-ribbon__line--before hidden lg:block" aria-hidden />
          ) : null}

          <span
            className={[
              "flow-ribbon__node relative z-[1] inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold tracking-[0.06em]",
              isLast
                ? "border-[#FF9A3D]/55 bg-[#FF9A3D]/15 text-[#FF9A3D]"
                : index === 0
                  ? "border-[#FF9A3D]/35 bg-[#FF9A3D]/10 text-[#FF9A3D]"
                  : "border-white/[0.14] bg-white/[0.04] text-white/72",
            ].join(" ")}
          >
            {isLast ? <span aria-hidden>✓</span> : <span>{stepNum}</span>}
          </span>

          {!isLast ? (
            <span className="flow-ribbon__line flow-ribbon__line--after hidden flex-1 lg:block" aria-hidden />
          ) : null}
        </div>

        {showTag ? (
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FF9A3D]">
            {label}
          </p>
        ) : null}
      </div>

      <div className="flow-ribbon__art flex flex-1 items-center justify-center px-3 py-4 sm:px-4 sm:py-5">
        <FlowIllustration variant={variant} />
      </div>

      <div className="flow-ribbon__copy mt-auto border-t border-white/[0.08] px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="font-hero text-[0.98rem] font-semibold leading-[1.22] tracking-[-0.02em] text-white sm:text-[1.05rem]">
          {title}
        </h3>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-white/46 sm:text-[13px]">{desc}</p>
      </div>
    </article>
  );
}

export default function LeadFlowSection() {
  const { lang } = useLang();
  const copy = landingCopy(lang);
  const extra = homeExtraCopy(lang);
  const showTag = lang !== "ru";

  return (
    <Section
      id="flow"
      className="scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16 lg:!py-20 bg-black"
    >
      <Container>
        <Reveal className="mx-auto max-w-[44rem] text-center" delay={0}>
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            <span className="text-[#FF9A3D]" aria-hidden>
              ▲
            </span>
            {copy.flow.label}
          </p>
          <h2 className="mt-4 font-hero text-[clamp(1.85rem,4.5vw,2.85rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            {copy.flow.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[38rem] text-[clamp(0.95rem,1.8vw,1.12rem)] leading-[1.55] text-white/42">
            {copy.flow.titleMuted}
          </p>
        </Reveal>

        <Reveal delay={90} className="mt-10 sm:mt-12">
          <div className="flow-ribbon">
            {copy.flow.steps.map((step, index) => (
              <FlowRibbonStep
                key={step.label}
                index={index}
                label={step.label}
                title={step.title}
                desc={step.desc}
                variant={FLOW_VARIANTS[index] ?? "result"}
                isLast={index === copy.flow.steps.length - 1}
                showTag={showTag}
              />
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="mx-auto mt-8 flex max-w-[40rem] flex-wrap items-center justify-center gap-3 sm:mt-10"
        >
          {extra.solution.outcomes.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-[13px] text-white/70"
            >
              <Check className="h-3.5 w-3.5 text-[#FF9A3D]" aria-hidden />
              {item}
            </span>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
