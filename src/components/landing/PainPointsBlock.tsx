import { automationTypo } from "../../i18n/automationTypography";
import Container from "../ui/Container";
import Section from "../ui/Section";
import SmokeMaskedIllustration from "./SmokeMaskedIllustration";

export type PainPointItem = {
  title: string;
  text: string;
  image?: string;
};

type PainPointsBlockProps = {
  items?: PainPointItem[];
  imageDir?: string;
  smokeBase: string;
  orangeLayer: string;
  sectionTitle: string;
  sectionLead: string;
};

const defaultPainPoints: PainPointItem[] = [
  {
    title: "Заявки теряются между каналами",
    text: "Клиенты пишут в Telegram, WhatsApp, почту и формы, а команда не всегда видит всё вовремя.",
    image: "1.webp",
  },
  {
    title: "Команда тратит время вручную",
    text: "Менеджеры переносят данные, обновляют статусы и собирают отчёты руками вместо автоматизации.",
    image: "2.webp",
  },
  {
    title: "Нет контроля над процессами",
    text: "Руководителю сложно понять, где застряли заявки, кто отвечает и сколько денег теряется.",
    image: "3.webp",
  },
];

function PainCard({
  item,
  imageDir,
  smokeBase,
  orangeLayer,
  index,
}: {
  item: PainPointItem;
  imageDir: string;
  smokeBase: string;
  orangeLayer: string;
  index: number;
}) {
  return (
    <article className="group relative min-h-[25rem] overflow-hidden border border-white/[0.12] bg-black">
      <SmokeMaskedIllustration
        image={item.image ?? `${index + 1}.webp`}
        imageDir={imageDir}
        title={item.title}
        smokeBase={smokeBase}
        orangeLayer={orangeLayer}
      />

      <div className="relative z-10 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
        <div className="mb-4 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.06] px-2 text-[10px] font-[800] text-white">
          {String(index + 1).padStart(2, "0")}
        </div>

        <h3 className={automationTypo.h3}>{item.title}</h3>

        <p className="mt-3 max-w-[28rem] text-[13.5px] leading-[1.62] text-white sm:text-[14.5px]">
          {item.text}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff7a1a]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,122,26,0.1),transparent_46%)]" />
      </div>
    </article>
  );
}

export default function PainPointsBlock({
  items = defaultPainPoints,
  imageDir = "/images/avtomatizaciya-biznesa/Где бизнес теряет",
  smokeBase,
  orangeLayer,
  sectionTitle,
  sectionLead,
}: PainPointsBlockProps) {
  const coreItems = Array.from({ length: 3 }, (_, index) => ({
    ...defaultPainPoints[index],
    ...(items[index] ?? {}),
    image: items[index]?.image ?? defaultPainPoints[index].image,
  }));

  return (
    <Section className="relative scroll-mt-[var(--tivonix-header-spacer)] overflow-hidden bg-black py-16 sm:py-20">
      <Container>
        <div className="relative mx-auto max-w-6xl">
          <div className="relative z-10 mb-7 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className={`max-w-[44rem] ${automationTypo.h2}`}>{sectionTitle}</h2>

              <p className="mt-4 max-w-[40rem] text-[14.5px] leading-[1.7] text-white sm:text-[16px]">
                {sectionLead}
              </p>
            </div>

            <div className="shrink-0 pt-1">

            </div>
          </div>

          <div className="relative z-10 grid sm:grid-cols-3">
            {coreItems.map((item, index) => (
              <PainCard
                key={`${item.title}-${index}`}
                item={item}
                imageDir={imageDir}
                smokeBase={smokeBase}
                orangeLayer={orangeLayer}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}