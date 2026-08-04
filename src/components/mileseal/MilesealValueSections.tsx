import {
  ClipboardPaste,
  Clock3,
  FileCheck2,
  MessageSquarePlus,
  MessagesSquare,
  Play,
  type LucideIcon,
} from "lucide-react";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { useLang } from "../../i18n/LangProvider";
import { milesealCopy } from "../../i18n/milesealCopy";

const PAIN_ICONS: LucideIcon[] = [MessagesSquare, Play, Clock3];
const STEP_ICONS: LucideIcon[] = [ClipboardPaste, MessageSquarePlus, FileCheck2];

const PAIN_BG = [
  "/images/mileseal/mileseal-pain-1.webp",
  "/images/mileseal/mileseal-pain-2.webp",
  "/images/mileseal/mileseal-pain-3.webp",
];

const STEP_BG = [
  "/images/mileseal/mileseal-step-1.webp",
  "/images/mileseal/mileseal-step-2.webp",
  "/images/mileseal/mileseal-step-3.webp",
];

function MediaCard({
  title,
  text,
  icon: Icon,
  bg,
  delay,
}: {
  title: string;
  text: string;
  icon: LucideIcon;
  bg: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="relative isolate flex h-full min-h-[240px] flex-col overflow-hidden rounded-[20px] bg-[#141414] sm:min-h-[280px] sm:rounded-2xl">
        <img
          src={bg}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-55"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/78 to-black/35"
          aria-hidden
        />
        <div className="relative z-[1] flex h-full flex-col p-5 sm:p-6">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,138,30,0.16)] text-[#ffae66]">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="mt-auto pt-8 font-hero text-[22px] font-semibold uppercase leading-[1.05] tracking-[-0.03em] text-white sm:text-[24px]">
            {title}
          </h3>
          <p className="mt-3 font-sans text-[15px] font-medium leading-[1.55] text-white/72">{text}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function MilesealValueSections() {
  const { lang } = useLang();
  const copy = milesealCopy(lang);

  return (
    <>
      <Section className="bg-black !py-12 sm:!py-16">
        <Container>
          <Reveal>
            <div className="max-w-[40rem]">
              <h2 className="font-hero text-[clamp(1.85rem,4.5vw,3rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white">
                {copy.pain.title}
              </h2>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {copy.pain.cards.map((card, i) => (
              <MediaCard
                key={card.title}
                title={card.title}
                text={card.text}
                icon={PAIN_ICONS[i] ?? MessagesSquare}
                bg={PAIN_BG[i] ?? PAIN_BG[0]}
                delay={i * 70}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-black !py-12 sm:!py-16">
        <Container>
          <Reveal>
            <div className="max-w-[44rem]">
              <h2 className="font-hero text-[clamp(1.85rem,4.5vw,3rem)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-white">
                {copy.steps.title}
              </h2>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {copy.steps.items.map((step, i) => (
              <MediaCard
                key={step.n}
                title={step.title}
                text={step.text}
                icon={STEP_ICONS[i] ?? FileCheck2}
                bg={STEP_BG[i] ?? STEP_BG[0]}
                delay={i * 70}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
