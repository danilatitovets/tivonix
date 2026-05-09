import type { AutomationSignItem } from "../../i18n/automationPageCopy";
import { automationTypo } from "../../i18n/automationTypography";
import Container from "../ui/Container";
import SmokeMaskedIllustration from "./SmokeMaskedIllustration";

const SIGNS_FRAME =
  "relative h-[16.5rem] overflow-hidden bg-black sm:h-[18.5rem]";

function CenterLine() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full -translate-x-1/2 md:block"
    >
      <div className="relative h-full w-px bg-[#ff7a1a]/28">
        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#ff7a1a]/45 via-[#ff7a1a]/85 to-[#ff7a1a]/45" />
      </div>
    </div>
  );
}

function TimelineDot() {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-[11.15rem] z-[5] hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[#ff7a1a] shadow-[0_0_22px_rgba(255,122,26,0.75)] md:block"
    />
  );
}

function Connector({ alignRight }: { alignRight: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute top-[11.5rem] hidden h-px w-14 bg-gradient-to-r md:block ${
        alignRight
          ? "right-full from-transparent to-[#ff7a1a]/80"
          : "left-full from-[#ff7a1a]/80 to-transparent"
      }`}
    />
  );
}

function SignCard({
  item,
  alignRight,
  imageDir,
  smokeBase,
  orangeLayer,
}: {
  item: AutomationSignItem;
  alignRight: boolean;
  imageDir: string;
  smokeBase: string;
  orangeLayer: string;
}) {
  return (
    <article
      className={`relative w-full max-w-[34rem] overflow-hidden border border-white/[0.12] bg-black ${
        alignRight ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
      }`}
    >
      <Connector alignRight={alignRight} />

      <SmokeMaskedIllustration
        image={item.image}
        imageDir={imageDir}
        title={item.title}
        smokeBase={smokeBase}
        orangeLayer={orangeLayer}
        frameClassName={SIGNS_FRAME}
      />

      <div className="px-6 pb-8 pt-5 sm:px-7 sm:pb-9">
        <div className="mb-6 inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.06] px-2 text-[11px] font-[850] text-white">
          {item.number}
        </div>

        <h3 className={automationTypo.h3Lg}>{item.title}</h3>

        <p className="mt-4 text-[16px] font-[600] leading-[1.65] text-white/86 sm:text-[18px]">
          {item.text}
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ff7a1a]/75 to-transparent"
      />
    </article>
  );
}

function SignItem({
  item,
  index,
  imageDir,
  smokeBase,
  orangeLayer,
}: {
  item: AutomationSignItem;
  index: number;
  imageDir: string;
  smokeBase: string;
  orangeLayer: string;
}) {
  const alignRight = index % 2 === 1;

  return (
    <li className="relative z-10 grid gap-6 md:grid-cols-[1fr_5rem_1fr] md:items-start md:gap-0">
      <div className={`relative ${alignRight ? "md:col-start-3" : "md:col-start-1"}`}>
        <SignCard
          item={item}
          alignRight={alignRight}
          imageDir={imageDir}
          smokeBase={smokeBase}
          orangeLayer={orangeLayer}
        />
      </div>

      <div className="relative hidden md:col-start-2 md:row-start-1 md:block">
        <TimelineDot />
      </div>
    </li>
  );
}

type AutomationSignsScrollSectionProps = {
  smokeBase: string;
  orangeLayer: string;
  imageDir: string;
  sectionTitle: string;
  sectionLead: string;
  ariaList: string;
  items: AutomationSignItem[];
};

export default function AutomationSignsScrollSection({
  smokeBase,
  orangeLayer,
  imageDir,
  sectionTitle,
  sectionLead,
  ariaList,
  items,
}: AutomationSignsScrollSectionProps) {
  return (
    <section className="relative scroll-mt-[var(--tivonix-header-spacer)] overflow-hidden bg-black">
      <div className="relative py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <h2 className={`mx-auto mt-6 max-w-[56rem] ${automationTypo.h2}`}>{sectionTitle}</h2>

            <p className="mx-auto mt-6 max-w-[47rem] text-[16px] font-[600] leading-[1.68] text-white/76 sm:text-[18px]">
              {sectionLead}
            </p>
          </div>

          <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
            <CenterLine />

            <ul
              className="relative z-10 list-none space-y-10 sm:space-y-12 md:space-y-16"
              aria-label={ariaList}
            >
              {items.map((item, index) => (
                <SignItem
                  key={item.number}
                  item={item}
                  index={index}
                  imageDir={imageDir}
                  smokeBase={smokeBase}
                  orangeLayer={orangeLayer}
                />
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}