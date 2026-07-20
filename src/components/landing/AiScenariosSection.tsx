import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";
import { FileSearch, MessagesSquare, Route } from "lucide-react";

const ICONS = [Route, FileSearch, MessagesSquare] as const;

/** Practical AI scenarios — sits after the animated AI premium block. */
export default function AiScenariosSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);

  return (
    <Section
      id="ai-scenarios"
      className="scroll-mt-[var(--tivonix-header-spacer)] !py-10 sm:!py-14"
    >
      <Container>
        <Reveal className="mx-auto max-w-[40rem] text-center">
          <h2 className="font-hero text-[clamp(1.55rem,3.6vw,2.25rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white text-balance">
            {copy.aiScenarios.title}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.aiScenarios.items.map((item, i) => {
            const Icon = ICONS[i] ?? Route;
            return (
              <Reveal key={item.title} delay={i * 60}>
                <article className="h-full rounded-[22px] border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#FF9A3D]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-hero text-[1.05rem] font-semibold tracking-[-0.02em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.55] text-white/50">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-6 max-w-[36rem] text-center text-[13px] leading-[1.5] text-white/35">
          {copy.aiScenarios.note}
        </p>
      </Container>
    </Section>
  );
}
