import { Check } from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { homeExtraCopy } from "../../i18n/homeExtraCopy";

export default function GuaranteesSection() {
  const { lang } = useLang();
  const copy = homeExtraCopy(lang);

  return (
    <Section
      id="guarantees"
      className="scroll-mt-[var(--tivonix-header-spacer)] !py-12 sm:!py-16"
    >
      <Container>
        <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0c0c0c] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <Reveal className="mx-auto max-w-[40rem] text-center">
            <h2 className="font-hero text-[clamp(1.65rem,3.8vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white text-balance">
              {copy.guarantees.title}
            </h2>
            <p className="mx-auto mt-3 max-w-[36rem] text-[15px] leading-[1.55] text-white/48">
              {copy.guarantees.subtitle}
            </p>
          </Reveal>

          <ul className="mx-auto mt-8 grid max-w-[52rem] gap-3 sm:mt-10 sm:grid-cols-2">
            {copy.guarantees.items.map((item, i) => (
              <Reveal key={item} delay={40 + i * 40}>
                <li className="flex items-start gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6B2C]/15 text-[#FF9A3D]">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="text-[14px] leading-[1.45] text-white/70">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
