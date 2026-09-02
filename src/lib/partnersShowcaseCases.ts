/** Featured working products on /partners — synced with projects catalog. */
export type PartnersShowcaseCase = {
  id: string;
  title: string;
  tags: string[];
  cover: string;
};

export const PARTNERS_SHOWCASE_CASES: PartnersShowcaseCase[] = [
  {
    id: "neo-terminal",
    title: "Neo Terminal",
    tags: ["AI", "Commerce", "SaaS"],
    cover: "/images/project-priew/neo-terminal.webp",
  },
  {
    id: "spliton",
    title: "Spliton",
    tags: ["Fintech", "Marketplace", "Payments"],
    cover: "/images/project-priew/spliton.webp",
  },
  {
    id: "slotty",
    title: "Slotty",
    tags: ["Booking", "SaaS", "Telegram"],
    cover: "/images/project-priew/slotty.webp",
  },
  {
    id: "logovo",
    title: "LOGOVO",
    tags: ["Website", "Booking", "B2B"],
    cover: "/images/project-priew/logovo.webp",
  },
  {
    id: "headmind",
    title: "Headmind",
    tags: ["Website", "B2B", "WordPress"],
    cover: "/images/project-priew/headmind.webp",
  },
  {
    id: "tivonixpanel",
    title: "TIVONIX Panel",
    tags: ["SaaS", "Partners", "Dashboard"],
    cover: `/images/${encodeURI("обложки")}/tivonixpanel.webp`,
  },
];

export type PartnersShowcaseCaseId = (typeof PARTNERS_SHOWCASE_CASES)[number]["id"];
