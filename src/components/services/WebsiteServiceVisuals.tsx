import { useEffect, useState } from "react";
import BgLoopVideo from "../ui/BgLoopVideo";
import Container from "../ui/Container";
import CircularSplitRoll, {
  type CircularSplitRollItem,
} from "../ui/circular-split-roll";
import { pickLoopSrc } from "../../lib/heroMedia";
import { WEBSITE_EXAMPLES } from "../../data/websiteExamples";

const PAGE_BG_DESKTOP = "/images/services/websites/page-bg.mp4";
const PAGE_BG_MOBILE = "/images/services/websites/page-bg-mobile.mp4";
const PAGE_BG_POSTER = "/images/services/websites/page-bg-poster.webp";

/** Full-bleed muted loop behind the websites service hero. */
export function WebsitePageBg() {
  const [src, setSrc] = useState(PAGE_BG_DESKTOP);

  useEffect(() => {
    setSrc(pickLoopSrc(PAGE_BG_DESKTOP, PAGE_BG_MOBILE));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <BgLoopVideo
        variant="hero"
        src={src}
        poster={PAGE_BG_POSTER}
        className="absolute inset-0"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,6,7,0.88) 0%, rgba(7,6,7,0.72) 42%, rgba(7,6,7,0.48) 68%, rgba(7,6,7,0.58) 100%), linear-gradient(180deg, rgba(7,6,7,0.55) 0%, rgba(7,6,7,0.28) 40%, rgba(7,6,7,0.82) 100%)",
        }}
      />
    </div>
  );
}

/** Rounded frame with the same loop as the main landing hero. */
export function WebsiteHeroVideoFrame() {
  return (
    <div className="relative min-w-0">
      <div
        className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(252,80,0,0.14),transparent_65%)] blur-2xl"
        aria-hidden
      />
      <figure className="relative overflow-hidden rounded-[1.35rem] border border-white/[0.16] bg-[#0c0c0e]/70 shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08] backdrop-blur-[2px]">
        <div className="relative aspect-[16/11] w-full">
          <BgLoopVideo variant="hero" className="absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-white/[0.08]" />
        </div>
      </figure>
    </div>
  );
}

type ExamplesProps = {
  title: string;
  lead: string;
  demoLabel?: string;
};

const ROLL_ITEMS: CircularSplitRollItem[] = WEBSITE_EXAMPLES.map((item, index) => ({
  id: item.id,
  title: String(index + 1).padStart(2, "0"),
  video: item.src,
  poster: item.poster,
  image: item.poster,
  alt: `Landing scroll demo ${item.id}`,
}));

/** Circular scroll showcase of landing demos (video, no frames). */
export function WebsiteExamplesSection({ title, lead }: ExamplesProps) {
  return (
    <div className="bg-[#070607]">
      <Container className="relative z-[1] py-12 sm:py-14">
        <div className="max-w-[40rem]">
          <h2 className="text-[clamp(1.45rem,3vw,2.1rem)] font-[700] tracking-[-0.03em] text-white">
            {title}
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-white/60 sm:text-[16px]">{lead}</p>
        </div>
      </Container>

      <CircularSplitRoll
        items={ROLL_ITEMS}
        radius={460}
        cardSize={220}
        sectionHeight={90}
        background="#070607"
        titleColor="#ffffff"
        textSideScale={0.68}
        textSideOpacity={0.18}
        imageSideOpacity={0.12}
      />
    </div>
  );
}
