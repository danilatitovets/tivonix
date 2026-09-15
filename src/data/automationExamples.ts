import { MVP_EXAMPLES } from "./mvpExamples";

/** Automation demos: MVP video loops + live project covers */
export type AutomationExample = {
  id: string;
  poster: string;
  /** Optional motion clip; image-only cards omit this */
  src?: string;
};

const PROJECT_DEMOS: AutomationExample[] = [
  {
    id: "neo-terminal",
    poster: "/images/project-priew/neo-terminal.webp",
  },
  {
    id: "spliton",
    poster: "/images/project-priew/spliton.webp",
  },
  {
    id: "slotty",
    poster: "/images/project-priew/slotty.webp",
  },
  {
    id: "tivonixpanel",
    poster: "/images/project-priew/tivonixpanel/1.webp",
  },
  {
    id: "logovo",
    poster: "/images/project-priew/logovo.webp",
  },
];

export const AUTOMATION_EXAMPLES: AutomationExample[] = [
  ...MVP_EXAMPLES.map((item) => ({
    id: `mvp-${item.id}`,
    src: item.src,
    poster: item.poster,
  })),
  ...PROJECT_DEMOS,
];
